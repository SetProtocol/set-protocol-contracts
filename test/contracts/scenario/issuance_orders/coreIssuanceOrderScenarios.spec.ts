require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address, Bytes, IssuanceOrder } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  IssuanceOrderModuleContract,
  SetTokenContract,
  SetTokenFactoryContract,
  SignatureValidatorContract,
  StandardTokenMockContract,
  TakerWalletWrapperContract,
  TransferProxyContract,
  VaultContract
} from '@utils/contracts';
import { ether } from '@utils/units';
import { assertTokenBalanceAsync } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { DEPLOYED_TOKEN_QUANTITY } from '@utils/constants';
import { SCENARIOS } from './coreIssuanceOrderScenarios';
import { generateOrdersDataWithTakerOrders } from '@utils/orders';
import { getExpectedFillLog } from '@utils/contract_logs/issuanceOrderModule';
import { getWeb3 } from '@utils/web3Helper';

import { ExchangeWrapper } from '@utils/wrappers/exchangeWrapper';
import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const Core = artifacts.require('Core');
const IssuanceOrderModule = artifacts.require('IssuanceOrderModule');
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const setUtils = new SetUtils(web3);
const { expect } = chai;
const blockchain = new Blockchain(web3);


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
  let signatureValidator: SignatureValidatorContract;
  let issuanceOrderModule: IssuanceOrderModuleContract;
  let setTokenFactory: SetTokenFactoryContract;
  let takerWalletWrapper: TakerWalletWrapperContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);
  const exchangeWrapper = new ExchangeWrapper(ownerAccount);

  before(async () => {
    ABIDecoder.addABI(IssuanceOrderModule.abi);
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(IssuanceOrderModule.abi);
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    vault = await coreWrapper.deployVaultAsync();
    transferProxy = await coreWrapper.deployTransferProxyAsync();
    signatureValidator = await coreWrapper.deploySignatureValidatorAsync();
    core = await coreWrapper.deployCoreAsync(transferProxy, vault);
    issuanceOrderModule = await coreWrapper.deployIssuanceOrderModuleAsync(
      core,
      transferProxy,
      vault,
      signatureValidator
    );
    await coreWrapper.addModuleAsync(core, issuanceOrderModule.address);

    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);
    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);
    await coreWrapper.addAuthorizationAsync(transferProxy, issuanceOrderModule.address);

    takerWalletWrapper = await exchangeWrapper.deployTakerWalletExchangeWrapper(
      core.address,
      transferProxy
    );
    await coreWrapper.addAuthorizationAsync(transferProxy, takerWalletWrapper.address);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#fillOrder', async () => {
    SCENARIOS.forEach(async scenario => {
      describe(scenario.title, async () => {
        const subjectCaller: Address = takerAccount;
        const subjectQuantityToIssue: BigNumber = scenario.exchangeOrders.subjectQuantityToIssue;
        let subjectIssuanceOrder: IssuanceOrder;
        let subjectSignature: Bytes;
        let subjectExchangeOrdersData: Bytes;

        let orderHash: string;

        const makerAddress: Address = signerAccount;
        const relayerAddress: Address = relayerAccount;

        let setToken: SetTokenContract;
        let makerToken: StandardTokenMockContract;
        let relayerToken: StandardTokenMockContract;

        const makerTokenAmount: BigNumber = scenario.issuanceOrderParams.makerTokenAmount;
        const makerRelayerFee: BigNumber = ether(1);
        const takerRelayerFee: BigNumber = ether(2);
        const orderQuantity: BigNumber = scenario.issuanceOrderParams.orderQuantity;
        const fillPercentage: BigNumber = subjectQuantityToIssue.div(orderQuantity);

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
          const timeToExpiration = SetTestUtils.generateTimestamp(10000);

          subjectIssuanceOrder = {
            setAddress:               setToken.address,
            makerAddress:             makerAddress,
            makerToken:               makerToken.address,
            relayerAddress:           relayerAddress,
            relayerToken:             relayerToken.address,
            quantity:                 scenario.issuanceOrderParams.orderQuantity,
            makerTokenAmount:         scenario.issuanceOrderParams.makerTokenAmount,
            expiration:               timeToExpiration,
            makerRelayerFee:          makerRelayerFee,
            takerRelayerFee:          takerRelayerFee,
            requiredComponents:       requiredComponents,
            requiredComponentAmounts: requiredComponentAmounts,
            salt:                     SetUtils.generateSalt(),
          } as IssuanceOrder;

          orderHash = SetUtils.hashOrderHex(subjectIssuanceOrder);
          const ecSignature = await setUtils.signMessage(orderHash, makerAddress, false);
          subjectSignature = setUtils.convertSigToHex(ecSignature);

          // Register exchange with core
          await coreWrapper.addExchange(core, SetUtils.EXCHANGES.TAKER_WALLET, takerWalletWrapper.address);

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
            takerComponents,
            takerAmountsToTransfer,
          );
        });

        async function subject(): Promise<string> {
          return issuanceOrderModule.fillOrder.sendTransactionAsync(
            subjectIssuanceOrder,
            subjectQuantityToIssue,
            subjectSignature,
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
          const preFillOrderBalance = await issuanceOrderModule.orderFills.callAsync(orderHash);

          await subject();

          // Expected token balances
          const makerMakerTokenExpectedBalance = makerMakerTokenPreBalance.sub(
            (makerTokenAmount.mul(fillPercentage)).round(0, 3)
          );
          const takerMakerTokenExpectedBalance = takerMakerTokenPreBalance.add(
            (makerTokenAmount.mul(fillPercentage)).round(0, 3)
          );
          const relayerRelayerTokenExpectedBalance = relayerRelayerTokenPreBalance.add(
            (ether(2).mul(fillPercentage)).round(0, 3)
          ).add((ether(1).mul(fillPercentage)).round(0, 3));
          const makerSetTokenExpectedBalance = makerSetTokenPreBalance.add(subjectQuantityToIssue);
          const expectedFillOrderBalance = preFillOrderBalance.add(subjectQuantityToIssue);

          // Assert token balance equal what we expect
          console.log('Expected maker token amount taken from maker.');
          await assertTokenBalanceAsync(makerToken, makerMakerTokenExpectedBalance, signerAccount);
          console.log('Expected maker token amount given to taker.');
          await assertTokenBalanceAsync(makerToken, takerMakerTokenExpectedBalance, subjectCaller);
          console.log('Expected relayer token amount given to relayer.');
          await assertTokenBalanceAsync(relayerToken, relayerRelayerTokenExpectedBalance, relayerAddress);
          console.log('Expected set token amount minted for maker.');
          await assertTokenBalanceAsync(setToken, makerSetTokenExpectedBalance, signerAccount);

          const postFillOrderBalance = await issuanceOrderModule.orderFills.callAsync(orderHash);
          console.log('Expected fill amount marked in mapping.');
          expect(expectedFillOrderBalance).to.be.bignumber.equal(postFillOrderBalance);
        });

        it('emits correct LogFill event', async () => {
          const txHash = await subject();

          const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
          const expectedLogs = getExpectedFillLog(
            setToken.address,
            signerAccount,
            subjectCaller,
            makerToken.address,
            relayerAddress,
            relayerToken.address,
            subjectQuantityToIssue,
            (makerTokenAmount.mul(fillPercentage)).round(0, 3),
            (ether(2).mul(fillPercentage)).round(0, 3).add((ether(1).mul(fillPercentage)).round(0, 3)),
            orderHash,
            issuanceOrderModule.address
          );

          await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
        });
      });
    });
  });
});
