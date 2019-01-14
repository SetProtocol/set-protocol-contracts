require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address, Bytes, ExchangeIssueParams, ZeroExSignedFillOrder } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  ExchangeIssueModuleContract,
  PayableExchangeIssueContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  SetTokenContract,
  SetTokenFactoryContract,
  TransferProxyContract,
  VaultContract,
  WethMockContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { getWeb3, getGasUsageInEth } from '@utils/web3Helper';
import {
  DEFAULT_GAS,
  DEFAULT_REBALANCING_NATURAL_UNIT,
  ONE_DAY_IN_SECONDS,
} from '@utils/constants';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ExchangeWrapper } from '@utils/wrappers/exchangeWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';
import { PayableExchangeIssueWrapper } from '@utils/wrappers/payableExchangeIssueWrapper';
import { RebalancingWrapper } from '@utils/wrappers/rebalancingWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);
const Core = artifacts.require('Core');
const PayableExchangeIssue = artifacts.require('PayableExchangeIssue');

const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setUtils = new SetUtils(web3);
const { NULL_ADDRESS, ZERO } = SetUtils.CONSTANTS;

contract('PayableExchangeIssue', accounts => {
  const [
    ownerAccount,
    tokenPurchaser,
    zeroExOrderMaker,
    whitelist,
  ] = accounts;

  let core: CoreContract;
  let exchangeIssueModule: ExchangeIssueModuleContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let rebalancingSetTokenFactory: RebalancingSetTokenFactoryContract;
  let setTokenFactory: SetTokenFactoryContract;
  let payableExchangeIssue: PayableExchangeIssueContract;
  let weth: WethMockContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);
  const payableExchangeIssueWrapper = new PayableExchangeIssueWrapper(ownerAccount);
  const exchangeWrapper = new ExchangeWrapper(ownerAccount);
  const rebalancingWrapper = new RebalancingWrapper(
    ownerAccount,
    coreWrapper,
    erc20Wrapper,
    blockchain
  );

  before(async () => {
    ABIDecoder.addABI(Core.abi);
    ABIDecoder.addABI(PayableExchangeIssue.abi);

    transferProxy = await coreWrapper.deployTransferProxyAsync();
    vault = await coreWrapper.deployVaultAsync();
    core = await coreWrapper.deployCoreAsync(transferProxy, vault);

    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);

    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

    rebalancingSetTokenFactory = await coreWrapper.deployRebalancingSetTokenFactoryAsync(core.address, whitelist);
    await coreWrapper.addFactoryAsync(core, rebalancingSetTokenFactory);

    exchangeIssueModule = await coreWrapper.deployExchangeIssueModuleAsync(core, transferProxy, vault);
    await coreWrapper.addModuleAsync(core, exchangeIssueModule.address);
    await coreWrapper.addAuthorizationAsync(transferProxy, exchangeIssueModule.address);
    await coreWrapper.addAuthorizationAsync(vault, exchangeIssueModule.address);

    weth = await erc20Wrapper.deployWrappedEtherAsync(ownerAccount);

    payableExchangeIssue = await payableExchangeIssueWrapper.deployPayableExchangeIssueAsync(
      core.address,
      transferProxy.address,
      exchangeIssueModule.address,
      weth.address,
    );

    await exchangeWrapper.deployAndAuthorizeZeroExExchangeWrapper(
      core,
      SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,
      SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
      SetTestUtils.ZERO_EX_TOKEN_ADDRESS,
      transferProxy
    );
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
    ABIDecoder.removeABI(PayableExchangeIssue.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    const subjectCaller: Address = ownerAccount;

    async function subject(): Promise<PayableExchangeIssueContract> {
      return await payableExchangeIssueWrapper.deployPayableExchangeIssueAsync(
        core.address,
        transferProxy.address,
        exchangeIssueModule.address,
        weth.address,
        subjectCaller,
      );
    }

    it('should contain the correct address of the transfer proxy', async () => {
      const payableExchangeIssueContract = await subject();

      const proxyAddress = await payableExchangeIssueContract.transferProxy.callAsync();

      expect(proxyAddress).to.equal(transferProxy.address);
    });

    it('should contain the correct address of Core', async () => {
      const payableExchangeIssueContract = await subject();

      const coreAddress = await payableExchangeIssueContract.core.callAsync();

      expect(coreAddress).to.equal(core.address);
    });

    it('should contain the correct address of the exchangeIssueModule', async () => {
      const payableExchangeIssueContract = await subject();

      const exchangeIssueModuleAddress = await payableExchangeIssueContract.exchangeIssueModule.callAsync();

      expect(exchangeIssueModuleAddress).to.equal(exchangeIssueModule.address);
    });
  });

  describe('#issueRebalancingSetWithEther', async () => {
    const subjectCaller: Address = tokenPurchaser;
    let subjectRebalancingSetAddress: Address;
    let subjectExchangeIssueData: ExchangeIssueParams;
    let subjectExchangeOrdersData: Bytes;
    let subjectEther: BigNumber;

    let rebalancingSetQuantity: BigNumber;

    let customSubjectEther: BigNumber;
    let customIssuePaymentTokenAmount: BigNumber;
    let customExchangeIssueQuantity: BigNumber;

    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    let exchangeIssueSetAddress: Address;
    let exchangeIssueQuantity: BigNumber;
    let exchangeIssuePaymentToken: Address;
    let exchangeIssuePaymentTokenAmount: BigNumber;
    let exchangeIssueRequiredComponents: Address[];
    let exchangeIssueRequiredComponentAmounts: BigNumber[];

    let zeroExOrder: ZeroExSignedFillOrder;

    beforeEach(async () => {
      // Create component token (owned by 0x order maker)
      const baseSetComponent = await erc20Wrapper.deployTokenAsync(zeroExOrderMaker);

      // Create the Set (1 component)
      const componentAddresses = [baseSetComponent.address];
      const componentUnits = [new BigNumber(10 ** 10)];
      baseSetNaturalUnit = new BigNumber(10 ** 9);
      baseSetToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        baseSetNaturalUnit,
      );

      // Create the Rebalancing Set
      rebalancingUnitShares = new BigNumber(10 ** 10);
      rebalancingSetToken = await rebalancingWrapper.createDefaultRebalancingSetTokenAsync(
        core,
        rebalancingSetTokenFactory.address,
        ownerAccount,
        baseSetToken.address,
        ONE_DAY_IN_SECONDS,
        rebalancingUnitShares,
      );

      subjectEther = customSubjectEther || new BigNumber(10 ** 10);

      // Generate exchange issue data
      exchangeIssueSetAddress = baseSetToken.address;
      exchangeIssueQuantity = customExchangeIssueQuantity || new BigNumber(10 ** 10);
      exchangeIssuePaymentToken = weth.address;
      exchangeIssuePaymentTokenAmount = customIssuePaymentTokenAmount || subjectEther;
      exchangeIssueRequiredComponents = componentAddresses;
      exchangeIssueRequiredComponentAmounts = componentUnits.map(
        unit => unit.mul(exchangeIssueQuantity).div(baseSetNaturalUnit)
      );

      subjectExchangeIssueData = {
        setAddress: exchangeIssueSetAddress,
        paymentToken: exchangeIssuePaymentToken,
        paymentTokenAmount: exchangeIssuePaymentTokenAmount,
        quantity: exchangeIssueQuantity,
        requiredComponents: exchangeIssueRequiredComponents,
        requiredComponentAmounts: exchangeIssueRequiredComponentAmounts,
      };

      await erc20Wrapper.approveTransfersAsync(
        [baseSetComponent],
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        zeroExOrderMaker
      );

      // Create 0x order for the component, using weth(4) paymentToken as default
      zeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                     // senderAddress
        zeroExOrderMaker,                                 // makerAddress
        NULL_ADDRESS,                                     // takerAddress
        ZERO,                                             // makerFee
        ZERO,                                             // takerFee
        subjectExchangeIssueData.requiredComponentAmounts[0],         // makerAssetAmount
        exchangeIssuePaymentTokenAmount,                  // takerAssetAmount
        exchangeIssueRequiredComponents[0],               // makerAssetAddress
        exchangeIssuePaymentToken,                        // takerAssetAddress
        SetUtils.generateSalt(),                          // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,            // exchangeAddress
        NULL_ADDRESS,                                     // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),            // expirationTimeSeconds
        exchangeIssuePaymentTokenAmount,                  // amount of zeroExOrder to fill
      );

      subjectExchangeOrdersData = setUtils.generateSerializedOrders([zeroExOrder]);
      subjectRebalancingSetAddress = rebalancingSetToken.address;
      rebalancingSetQuantity = exchangeIssueQuantity.mul(DEFAULT_REBALANCING_NATURAL_UNIT).div(rebalancingUnitShares);
    });

    afterEach(async () => {
      customSubjectEther = undefined;
      customIssuePaymentTokenAmount = undefined;
      customExchangeIssueQuantity = undefined;
    });

    async function subject(): Promise<string> {
      return payableExchangeIssue.issueRebalancingSetWithEther.sendTransactionAsync(
        subjectRebalancingSetAddress,
        subjectExchangeIssueData,
        subjectExchangeOrdersData,
        {
          from: subjectCaller,
          gas: DEFAULT_GAS,
          value: subjectEther.toString(),
        },
      );
    }

    it('issues the rebalancing Set to the caller', async () => {
      const previousRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      const expectedRBSetTokenBalance = previousRBSetTokenBalance.add(rebalancingSetQuantity);

      await subject();

      const currentRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      expect(expectedRBSetTokenBalance).to.bignumber.equal(currentRBSetTokenBalance);
    });

    it('uses an expected amount of Eth', async () => {
      const previousEthBalance: BigNumber = new BigNumber(await web3.eth.getBalance(subjectCaller));

      const txHash = await subject();
      const totalGasInEth = await getGasUsageInEth(txHash);
      const expectedEthBalance = previousEthBalance
                                  .sub(exchangeIssuePaymentTokenAmount)
                                  .sub(totalGasInEth);

      const currentEthBalance = await web3.eth.getBalance(subjectCaller);
      expect(expectedEthBalance).to.bignumber.equal(currentEthBalance);
    });

    describe('when the eth transferred is in excess of required', async () => {
      before(async () => {
        customSubjectEther = new BigNumber(10 ** 10).times(2);
        customIssuePaymentTokenAmount = new BigNumber(10 ** 10);
      });

      it('refunds the user the appropriate amount of eth', async () => {
        const previousEthBalance: BigNumber = new BigNumber(await web3.eth.getBalance(subjectCaller));

        const txHash = await subject();
        const totalGasInEth = await getGasUsageInEth(txHash);
        const expectedEthBalance = previousEthBalance
                                    .sub(exchangeIssuePaymentTokenAmount)
                                    .sub(totalGasInEth);

        const currentEthBalance = await web3.eth.getBalance(subjectCaller);
        expect(expectedEthBalance).to.bignumber.equal(currentEthBalance);
      });
    });

    describe('when the base Set acquired is in excess of required', async () => {
      const excessBaseSetIssued = new BigNumber(10 ** 9);

      before(async () => {
        customExchangeIssueQuantity = new BigNumber(10 ** 10).plus(excessBaseSetIssued);
      });

      it('refunds the user the appropriate amount of base Set', async () => {
        await subject();

        const ownerBalance = await baseSetToken.balanceOf.callAsync(subjectCaller);

        expect(ownerBalance).to.bignumber.equal(excessBaseSetIssued);
      });
    });
  });
});
