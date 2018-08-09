import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { SetProtocolUtils as Utils }  from 'set-protocol-utils';
import { Address, Bytes } from 'set-protocol-utils';

import ChaiSetup from '../../../utils/chaiSetup';
import { BigNumberSetup } from '../../../utils/bigNumberSetup';
import {
  CoreContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TakerWalletWrapperContract,
  TransferProxyContract,
  VaultContract
} from '../../../utils/contracts';
import { ether } from '../../../utils/units';
import { assertTokenBalance } from '../../../utils/tokenAssertions';
import { DEPLOYED_TOKEN_QUANTITY } from '../../../utils/constants';
import { SCENARIOS } from './coreIssuanceOrderScenarios';
import { ExchangeWrapper } from '../../../utils/exchangeWrapper';
import { generateFillOrderParameters, generateOrdersDataWithTakerOrders } from '../../../utils/orders';
import { assertLogEquivalence, getFormattedLogsFromTxHash } from '../../../utils/logs';
import { getExpectedFillLog } from '../../../utils/contract_logs/coreIssuanceOrder';
import { CoreWrapper } from '../../../utils/coreWrapper';
import { ERC20Wrapper } from '../../../utils/erc20Wrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;
const Core = artifacts.require('Core');


contract('CoreIssuanceOrder::Scenarios', accounts => {
  const [
    ownerAccount,
    takerAccount,
    signerAccount,
    relayerAccount,
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;
  let takerWalletWrapper: TakerWalletWrapperContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);
  const exchangeWrapper = new ExchangeWrapper(ownerAccount);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    core = await coreWrapper.deployCoreAsync();
    vault = await coreWrapper.deployVaultAsync();
    transferProxy = await coreWrapper.deployTransferProxyAsync();
    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync();
    takerWalletWrapper = await exchangeWrapper.deployTakerWalletExchangeWrapper(transferProxy);

    // TODO: Move these authorizations into setDefaultStateAndAuthorizations
    await coreWrapper.addAuthorizationAsync(takerWalletWrapper, core.address);
    await coreWrapper.addAuthorizationAsync(transferProxy, takerWalletWrapper.address);

    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);
  });

  describe('#fillOrder', async () => {
    SCENARIOS.forEach(async scenario => {
      describe(scenario.title, async () => {
        const subjectCaller: Address = takerAccount;
        const subjectQuantityToIssue: BigNumber = scenario.exchangeOrders.subjectQuantityToIssue;
        let subjectExchangeOrdersData: Bytes;

        const makerAddress: Address = signerAccount;
        const relayerAddress: Address = relayerAccount;

        let setToken: SetTokenContract;
        let makerToken: StandardTokenMockContract;
        let relayerToken: StandardTokenMockContract;

        const makerTokenAmount: BigNumber = scenario.issuanceOrderParams.makerTokenAmount;
        const makerRelayerFee: BigNumber = ether(1);
        const takerRelayerFee: BigNumber = ether(1);
        const orderQuantity: BigNumber = scenario.issuanceOrderParams.orderQuantity;
        const fillPercentage: BigNumber = subjectQuantityToIssue.div(orderQuantity);

        let issuanceOrderParams: any;

        beforeEach(async () => {
          const deployedTokens = await erc20Wrapper.deployTokensAsync(
            scenario.tokenState.numberOfComponents + 2,
            ownerAccount
          );
          await erc20Wrapper.approveTransfersAsync(deployedTokens, transferProxy.address, ownerAccount);
          await erc20Wrapper.approveTransfersAsync(deployedTokens, transferProxy.address, signerAccount);
          await erc20Wrapper.approveTransfersAsync(deployedTokens, transferProxy.address, takerAccount);

          // Give taker its Set component tokens
          scenario.tokenState.takerAmounts.forEach(async (amount, idx) => {
            await erc20Wrapper.transferTokenAsync(deployedTokens[idx], takerAccount, amount, ownerAccount);
          });

          // Give maker its Set component tokens
          scenario.tokenState.makerAmounts.forEach(async (amount, idx) => {
            await erc20Wrapper.transferTokenAsync(deployedTokens[idx], signerAccount, amount, ownerAccount);
          });

          // Deposit maker tokens in Vault
          scenario.tokenState.vault.forEach(async (amount, idx) => {
            if (amount.greaterThan(new BigNumber(0))) {
              await core.deposit.sendTransactionAsync(
                deployedTokens[idx].address,
                amount,
                { from: signerAccount },
              );
            }
          });

          // Give maker and taker their maker and relayer tokens
          await erc20Wrapper.transferTokensAsync(
            deployedTokens.slice(-2),
            signerAccount,
            DEPLOYED_TOKEN_QUANTITY.div(2),
            ownerAccount
          );
          await erc20Wrapper.transferTokensAsync(
            deployedTokens.slice(-2),
            takerAccount,
            DEPLOYED_TOKEN_QUANTITY.div(2),
            ownerAccount
          );

          // Set up and create SetToken
          const componentTokens = deployedTokens.slice(0, scenario.tokenState.numberOfComponents);
          const componentAddresses = _.map(componentTokens, token => token.address);
          const componentUnits = _.map(componentTokens, () => scenario.componentUnit); // Multiple of naturalUnit
          setToken = await coreWrapper.createSetTokenAsync(
            core,
            setTokenFactory.address,
            componentAddresses,
            componentUnits,
            scenario.naturalUnit,
          );

          // Define other tokens in test
          makerToken = deployedTokens.slice(-2, -1)[0];
          relayerToken = deployedTokens.slice(-1)[0];

          // Define rest of params for issuanceOrder and create issuanceOrder object
          const requiredComponentAmounts: BigNumber[] = [];
          const requiredComponents: Address[] = [];
          scenario.issuanceOrderParams.requiredComponentWeighting.forEach((weight, idx) => {
            if (weight != 0) {
              requiredComponents.push(componentAddresses[idx]);
              const requiredAmount = orderQuantity.mul(weight).mul(componentUnits[idx]).div(scenario.naturalUnit);
              requiredComponentAmounts.push(requiredAmount);
            }
          });
          const timeToExpiration = 10;

          issuanceOrderParams = await generateFillOrderParameters(
            setToken.address,
            signerAccount,
            makerAddress,
            requiredComponents,
            requiredComponentAmounts,
            makerToken.address,
            relayerAddress,
            relayerToken.address,
            scenario.issuanceOrderParams.orderQuantity,
            scenario.issuanceOrderParams.makerTokenAmount,
            timeToExpiration,
          );

          // Register exchange with core
          await coreWrapper.registerExchange(core, Utils.EXCHANGES.TAKER_WALLET, takerWalletWrapper.address);

          // Create parameters for exchange orders and generate exchange order data
          const takerAmountsToTransfer: BigNumber[] = [];
          const takerComponents: Address[] = [];
          scenario.exchangeOrders.takerWeightsToTransfer.forEach((weight, idx) => {
            if (weight != 0) {
              takerComponents.push(componentAddresses[idx]);
              const takerAmount = orderQuantity.mul(weight).mul(componentUnits[idx]).div(scenario.naturalUnit);
              takerAmountsToTransfer.push(takerAmount);
            }
          });

          subjectExchangeOrdersData = generateOrdersDataWithTakerOrders(
            makerToken.address,
            takerComponents,
            takerAmountsToTransfer,
          );
        });

        async function subject(): Promise<string> {
          return core.fillOrder.sendTransactionAsync(
            issuanceOrderParams.addresses,
            issuanceOrderParams.values,
            issuanceOrderParams.requiredComponents,
            issuanceOrderParams.requiredComponentAmounts,
            subjectQuantityToIssue,
            issuanceOrderParams.signature.v,
            [issuanceOrderParams.signature.r, issuanceOrderParams.signature.s],
            subjectExchangeOrdersData,
            { from: subjectCaller },
          );
        }

        it('transfers the full maker token amount from the maker', async () => {
          console.log(scenario.description);

          // Get pre-run balances
          const makerMakerTokenPreBalance = await makerToken.balanceOf.callAsync(signerAccount);
          const takerMakerTokenPreBalance = await makerToken.balanceOf.callAsync(subjectCaller);
          const relayerRelayerTokenPreBalance = await relayerToken.balanceOf.callAsync(relayerAddress);
          const makerSetTokenPreBalance = await setToken.balanceOf.callAsync(signerAccount);
          const preFillOrderBalance = await core.orderFills.callAsync(issuanceOrderParams.orderHash);

          await subject();

          // Expected token balances
          const makerMakerTokenExpectedBalance = makerMakerTokenPreBalance.sub(
            (makerTokenAmount.mul(fillPercentage)).round(0, 3)
          );
          const takerMakerTokenExpectedBalance = takerMakerTokenPreBalance.add(
            (makerTokenAmount.mul(fillPercentage)).round(0, 3)
          );
          const relayerRelayerTokenExpectedBalance = relayerRelayerTokenPreBalance.add(
            ((makerRelayerFee.plus(takerRelayerFee)).mul(fillPercentage)).round(0, 3).mul(2)
          );
          const makerSetTokenExpectedBalance = makerSetTokenPreBalance.add(subjectQuantityToIssue);
          const expectedFillOrderBalance = preFillOrderBalance.add(subjectQuantityToIssue);

          // Assert token balance equal what we expect
          console.log('Expected maker token amount taken from maker.');
          await assertTokenBalance(makerToken, makerMakerTokenExpectedBalance, signerAccount);
          console.log('Expected maker token amount given to taker.');
          await assertTokenBalance(makerToken, takerMakerTokenExpectedBalance, subjectCaller);
          console.log('Expected relayer token amount given to relayer.');
          await assertTokenBalance(relayerToken, relayerRelayerTokenExpectedBalance, relayerAddress);
          console.log('Expected set token amount minted for maker.');
          await assertTokenBalance(setToken, makerSetTokenExpectedBalance, signerAccount);

          const postFillOrderBalance = await core.orderFills.callAsync(issuanceOrderParams.orderHash);
          console.log('Expected fill amount marked in mapping.');
          expect(expectedFillOrderBalance).to.be.bignumber.equal(postFillOrderBalance);
        });

        it('emits correct LogFill event', async () => {
          const txHash = await subject();

          const formattedLogs = await getFormattedLogsFromTxHash(txHash);
          const expectedLogs = getExpectedFillLog(
            setToken.address,
            signerAccount,
            subjectCaller,
            makerToken.address,
            relayerAddress,
            relayerToken.address,
            subjectQuantityToIssue,
            (makerTokenAmount.mul(fillPercentage)).round(0, 3),
            (makerRelayerFee.mul(fillPercentage)).round(0, 3),
            (takerRelayerFee.mul(fillPercentage)).round(0, 3),
            issuanceOrderParams.orderHash,
            core.address
          );

          await assertLogEquivalence(expectedLogs, [formattedLogs[0]]);
        });
      });
    });
  });
});
