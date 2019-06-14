require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address, Bytes, ExchangeIssuanceParams, ZeroExSignedFillOrder } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  ExchangeIssuanceModuleContract,
  ERC20RebalancingSetExchangeIssuanceModuleContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ether } from '@utils/units';
import {
  LogERC20ExchangeIssue,
  LogERC20ExchangeRedeem,
} from '@utils/contract_logs/erc20RebalancingSetExchangeIssuanceModule';
import { expectRevertError } from '@utils/tokenAssertions';
import { getWeb3 } from '@utils/web3Helper';
import {
  DEFAULT_GAS,
  DEFAULT_REBALANCING_NATURAL_UNIT,
  DEFAULT_UNIT_SHARES,
  ONE_DAY_IN_SECONDS,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
} from '@utils/constants';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ExchangeWrapper } from '@utils/wrappers/exchangeWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';
import { RebalancingWrapper } from '@utils/wrappers/rebalancingWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);
const Core = artifacts.require('Core');
const ERC20RebalancingSetExchangeIssuanceModule = artifacts.require('ERC20RebalancingSetExchangeIssuanceModule');

const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const setUtils = new SetUtils(web3);
const { NULL_ADDRESS, ZERO } = SetUtils.CONSTANTS;

contract('ERC20RebalancingSetExchangeIssuanceModule', accounts => {
  const [
    ownerAccount,
    tokenPurchaser,
    zeroExOrderMaker,
    whitelist,
  ] = accounts;

  let core: CoreContract;
  let exchangeIssuanceModule: ExchangeIssuanceModuleContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let rebalancingSetTokenFactory: RebalancingSetTokenFactoryContract;
  let setTokenFactory: SetTokenFactoryContract;
  let rebalancingSetExchangeIssuanceModule: ERC20RebalancingSetExchangeIssuanceModuleContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);
  const exchangeWrapper = new ExchangeWrapper(ownerAccount);
  const rebalancingWrapper = new RebalancingWrapper(
    ownerAccount,
    coreWrapper,
    erc20Wrapper,
    blockchain
  );

  before(async () => {
    ABIDecoder.addABI(Core.abi);
    ABIDecoder.addABI(ERC20RebalancingSetExchangeIssuanceModule.abi);

    transferProxy = await coreWrapper.deployTransferProxyAsync();
    vault = await coreWrapper.deployVaultAsync();
    core = await coreWrapper.deployCoreAsync(transferProxy, vault);
    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);
    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

    rebalancingSetTokenFactory = await coreWrapper.deployRebalancingSetTokenFactoryAsync(core.address, whitelist);
    await coreWrapper.addFactoryAsync(core, rebalancingSetTokenFactory);

    exchangeIssuanceModule = await coreWrapper.deployExchangeIssuanceModuleAsync(core, vault);
    await coreWrapper.addModuleAsync(core, exchangeIssuanceModule.address);

    rebalancingSetExchangeIssuanceModule = await coreWrapper.deployERC20RebalancingSetExchangeIssuanceModuleAsync(
      core.address,
      transferProxy.address,
      exchangeIssuanceModule.address,
      vault.address,
    );
    await coreWrapper.addModuleAsync(core, rebalancingSetExchangeIssuanceModule.address);

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
    ABIDecoder.removeABI(ERC20RebalancingSetExchangeIssuanceModule.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    const subjectCaller: Address = ownerAccount;

    async function subject(): Promise<ERC20RebalancingSetExchangeIssuanceModuleContract> {
      return await coreWrapper.deployERC20RebalancingSetExchangeIssuanceModuleAsync(
        core.address,
        transferProxy.address,
        exchangeIssuanceModule.address,
        subjectCaller,
      );
    }

    it('should contain the correct address of the transfer proxy', async () => {
      const rebalancingSetExchangeIssuanceModuleContract = await subject();

      const proxyAddress = await rebalancingSetExchangeIssuanceModuleContract.transferProxy.callAsync();

      expect(proxyAddress).to.equal(transferProxy.address);
    });

    it('should contain the correct address of Core', async () => {
      const rebalancingSetExchangeIssuanceModuleContract = await subject();

      const coreAddress = await rebalancingSetExchangeIssuanceModuleContract.core.callAsync();

      expect(coreAddress).to.equal(core.address);
    });

    it('should contain the correct address of the exchangeIssuanceModule', async () => {
      const rebalancingSetExchangeIssuanceModuleContract = await subject();

      const exchangeIssuanceModuleAddress = await rebalancingSetExchangeIssuanceModuleContract
      .exchangeIssuanceInstance.callAsync();

      expect(exchangeIssuanceModuleAddress).to.equal(exchangeIssuanceModule.address);
    });
  });

  describe('#issueRebalancingSetWithERC20', async () => {
    let subjectRebalancingSetAddress: Address;
    let subjectRebalancingSetQuantity: BigNumber;
    let subjectExchangeIssuanceParams: ExchangeIssuanceParams;
    let subjectExchangeOrdersData: Bytes;
    let subjectPaymentToken: Address;
    let subjectPaymentTokenAmount: BigNumber;
    let subjectCaller: Address;

    let rebalancingSetQuantityToIssue: BigNumber;
    let paymentToken: StandardTokenMockContract;

    let customRequiredPaymentToken: BigNumber;
    let customIssuePaymentTokenAmount: BigNumber;
    let customTradeOutputAmount: BigNumber;
    let customExchangeIssueQuantity: BigNumber;
    let customPaymentTokenUsedInTrade: BigNumber;

    let baseSetComponent: StandardTokenMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    let exchangeIssueSetAddress: Address;
    let exchangeIssueQuantity: BigNumber;
    let exchangeIssueSendTokenExchangeIds: BigNumber[];
    let exchangeIssueSendTokens: Address[];
    let exchangeIssueSendTokenAmounts: BigNumber[];
    let exchangeIssueReceiveTokens: Address[];
    let exchangeIssueReceiveTokenAmounts: BigNumber[];

    let zeroExOrder: ZeroExSignedFillOrder;

    beforeEach(async () => {
      // Create component token (owned by 0x order maker)
      baseSetComponent = await erc20Wrapper.deployTokenAsync(zeroExOrderMaker);

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

      paymentToken = await erc20Wrapper.deployTokenAsync(tokenPurchaser);
      subjectPaymentToken = paymentToken.address;

      await erc20Wrapper.approveTransfersAsync(
        [paymentToken],
        transferProxy.address,
        tokenPurchaser
      );

      subjectPaymentTokenAmount = customRequiredPaymentToken || new BigNumber(10 ** 10);

      // Generate exchange issue data
      exchangeIssueSetAddress = baseSetToken.address;
      exchangeIssueQuantity = customExchangeIssueQuantity || new BigNumber(10 ** 10);
      exchangeIssueSendTokenExchangeIds = [SetUtils.EXCHANGES.ZERO_EX];
      exchangeIssueSendTokens = [subjectPaymentToken];
      exchangeIssueSendTokenAmounts = [customIssuePaymentTokenAmount || subjectPaymentTokenAmount];
      exchangeIssueReceiveTokens = componentAddresses;
      exchangeIssueReceiveTokenAmounts = componentUnits.map(
        unit => unit.mul(exchangeIssueQuantity).div(baseSetNaturalUnit)
      );

      const exchangeIssuanceParams = {
        setAddress: 			      exchangeIssueSetAddress,
        sendTokenExchangeIds:   exchangeIssueSendTokenExchangeIds,
        sendTokens:             exchangeIssueSendTokens,
        sendTokenAmounts:       exchangeIssueSendTokenAmounts,
        quantity:               exchangeIssueQuantity,
        receiveTokens:       	  exchangeIssueReceiveTokens,
        receiveTokenAmounts: 	  exchangeIssueReceiveTokenAmounts,
      };

      await erc20Wrapper.approveTransfersAsync(
        [baseSetComponent],
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        zeroExOrderMaker
      );

      // Create 0x order for the component, using weth(4) paymentToken as default
      zeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                                         // senderAddress
        zeroExOrderMaker,                                                     // makerAddress
        NULL_ADDRESS,                                                         // takerAddress
        ZERO,                                                                 // makerFee
        ZERO,                                                                 // takerFee
        customTradeOutputAmount || exchangeIssueReceiveTokenAmounts[0],       // makerAssetAmount
        customPaymentTokenUsedInTrade || exchangeIssueSendTokenAmounts[0],    // takerAssetAmount
        exchangeIssueReceiveTokens[0],               	                        // makerAssetAddress
        exchangeIssueSendTokens[0],                                           // takerAssetAddress
        SetUtils.generateSalt(),                                              // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,                                // exchangeAddress
        NULL_ADDRESS,                                                         // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),                                // expirationTimeSeconds
        customPaymentTokenUsedInTrade || exchangeIssueSendTokenAmounts[0],    // amount of zeroExOrder to fill
      );

      rebalancingSetQuantityToIssue = exchangeIssueQuantity.mul(DEFAULT_REBALANCING_NATURAL_UNIT)
                                                           .div(rebalancingUnitShares);

      subjectRebalancingSetAddress = rebalancingSetToken.address;
      subjectRebalancingSetQuantity = DEFAULT_REBALANCING_NATURAL_UNIT;
      subjectExchangeIssuanceParams = exchangeIssuanceParams;
      subjectExchangeOrdersData = setUtils.generateSerializedOrders([zeroExOrder]);
      subjectCaller = tokenPurchaser;
    });

    afterEach(async () => {
      customRequiredPaymentToken = undefined;
      customIssuePaymentTokenAmount = undefined;
      customExchangeIssueQuantity = undefined;
    });

    async function subject(): Promise<string> {
      return rebalancingSetExchangeIssuanceModule.issueRebalancingSetWithERC20.sendTransactionAsync(
        subjectRebalancingSetAddress,
        subjectRebalancingSetQuantity,
        subjectExchangeIssuanceParams,
        subjectExchangeOrdersData,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it('issues the rebalancing Set to the caller', async () => {
      const previousRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      const expectedRBSetTokenBalance = previousRBSetTokenBalance.add(rebalancingSetQuantityToIssue);

      await subject();

      const currentRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      expect(expectedRBSetTokenBalance).to.bignumber.equal(currentRBSetTokenBalance);
    });

    it('uses an expected amount of the payment token', async () => {
      const previousBalance: BigNumber = await paymentToken.balanceOf.callAsync(subjectCaller);

      await subject();
      const totalSendToken = exchangeIssueSendTokenAmounts[0];
      const expectedBalance = previousBalance.sub(totalSendToken);

      const currentBalance: BigNumber = await paymentToken.balanceOf.callAsync(subjectCaller);
      expect(expectedBalance).to.bignumber.equal(currentBalance);
    });

    it('emits correct LogERC20ExchangeIssue event', async () => {
      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = LogERC20ExchangeIssue(
        subjectRebalancingSetAddress,
        subjectCaller,
        subjectPaymentToken,
        subjectPaymentTokenAmount,
        rebalancingSetExchangeIssuanceModule.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the payment token transferred is in excess of required', async () => {
      before(async () => {
        customRequiredPaymentToken = new BigNumber(10 ** 10).times(2);
        customIssuePaymentTokenAmount = new BigNumber(10 ** 10);
      });

      it('refunds the user the appropriate amount of payment token', async () => {
        const previousBalance: BigNumber = await paymentToken.balanceOf.callAsync(subjectCaller);

        await subject();
        const totalSendToken = exchangeIssueSendTokenAmounts[0];
        const expectedBalance = previousBalance.sub(totalSendToken);

        const currentBalance: BigNumber = await paymentToken.balanceOf.callAsync(subjectCaller);
        expect(currentBalance).to.bignumber.equal(expectedBalance);
      });
    });

    describe('when sendToken amount is greater than amount needed to execute trades', async () => {
      before(async () => {
        customRequiredPaymentToken = new BigNumber(10 ** 10).times(2);
        customPaymentTokenUsedInTrade = new BigNumber(10 ** 10);
      });

      it('refunds the user the appropriate amount of eth', async () => {
        const previousBalance: BigNumber = await paymentToken.balanceOf.callAsync(subjectCaller);

        await subject();
        const expectedBalance = previousBalance.sub(customPaymentTokenUsedInTrade);

        const currentBalance = await paymentToken.balanceOf.callAsync(subjectCaller);
        expect(currentBalance).to.bignumber.equal(expectedBalance);
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

    describe('when the amount of receive token from trade exceeds receive token amount', async () => {
      before(async () => {
        // Amount exceeds any calculable quantity of component token
        customTradeOutputAmount = ether(1);
      });

      it('returns the user the leftover receive token amount', async () => {
        const previousBalance = await baseSetComponent.balanceOf.callAsync(subjectCaller);

        await subject();

        const expectedOwnerBalance = previousBalance
                                       .add(customTradeOutputAmount)
                                       .sub(exchangeIssueReceiveTokenAmounts[0]);
        const ownerBalance = await baseSetComponent.balanceOf.callAsync(subjectCaller);

        expect(ownerBalance).to.bignumber.equal(expectedOwnerBalance);
      });
    });

    describe('when the receive tokens length is greater than 1', async () => {
      beforeEach(async () => {
        subjectExchangeIssuanceParams.sendTokens = [paymentToken.address, paymentToken.address];
        subjectExchangeIssuanceParams.sendTokenAmounts = [new BigNumber(1), new BigNumber(1)];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the receive token is not wrapped ether', async () => {
      beforeEach(async () => {
        const baseSetComponent = await erc20Wrapper.deployTokenAsync(zeroExOrderMaker);
        subjectExchangeIssuanceParams.sendTokens = [baseSetComponent.address];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the base Set of the rebalancing Set is not the issuance params Set', async () => {
      beforeEach(async () => {
        subjectExchangeIssuanceParams.setAddress = paymentToken.address;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the rebalancingSetQuantity is zero', async () => {
      beforeEach(async () => {
        subjectRebalancingSetQuantity = ZERO;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the rebalancingSetQuantity is not a multiple of the natural unit', async () => {
      beforeEach(async () => {
        subjectRebalancingSetQuantity = DEFAULT_REBALANCING_NATURAL_UNIT.mul(1.5);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the rebalancingSetAddress is not tracked by Core', async () => {
      beforeEach(async () => {
        const proposalPeriod = ONE_DAY_IN_SECONDS;
        const rebalanceInterval = ONE_DAY_IN_SECONDS;
        const unTrackedSetToken = await rebalancingWrapper.deployRebalancingSetTokenAsync(
          rebalancingSetTokenFactory.address,
          ownerAccount,
          baseSetToken.address,
          DEFAULT_UNIT_SHARES,
          DEFAULT_REBALANCING_NATURAL_UNIT,
          proposalPeriod,
          rebalanceInterval,
          whitelist,
        );
        subjectRebalancingSetAddress = unTrackedSetToken.address;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#redeemRebalancingSetIntoERC20', async () => {
    let subjectRebalancingSetAddress: Address;
    let subjectRebalancingSetQuantity: BigNumber;
    let subjectExchangeIssuanceParams: ExchangeIssuanceParams;
    let subjectExchangeOrdersData: Bytes;
    let subjectCaller: Address;

    let customExchangeRedeemQuantity: BigNumber;
    let customExchangeRedeemSendTokenAmounts: BigNumber[];
    let customBaseSetComponent: StandardTokenMockContract;
    let customComponentAddresses: Address[];
    let customComponentUnits: BigNumber[];
    let customPaymentToken: StandardTokenMockContract;

    let receiveToken: StandardTokenMockContract;
    let baseSetComponent: StandardTokenMockContract;
    let nonExchangedPaymentTokenQuantity: BigNumber;

    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    let exchangeRedeemSetAddress: Address;
    let exchangeRedeemQuantity: BigNumber;
    let exchangeRedeemSendTokenExchangeIds: BigNumber[];
    let exchangeRedeemSendTokens: Address[];
    let exchangeRedeemSendTokenAmounts: BigNumber[];
    let exchangeRedeemReceiveTokens: Address[];
    let exchangeRedeemReceiveTokenAmounts: BigNumber[];

    let receiveTokenQuantityToReceive: BigNumber;
    let receiveTokenTradedFor: BigNumber;

    let zeroExOrder: ZeroExSignedFillOrder;

    beforeEach(async () => {
      receiveTokenQuantityToReceive = ether(2);

      // Create component token
      baseSetComponent = customBaseSetComponent || await erc20Wrapper.deployTokenAsync(tokenPurchaser);

      // Create payment token
      receiveToken = customPaymentToken || await erc20Wrapper.deployTokenAsync(zeroExOrderMaker);

      // Create the Set (2 component where one is payment token)
      const componentAddresses = customComponentAddresses || [baseSetComponent.address, receiveToken.address];
      const componentUnits = customComponentUnits || [new BigNumber(10 ** 10), new BigNumber(10 ** 10)];
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

      // Generate exchangeRedeem data
      exchangeRedeemSetAddress = baseSetToken.address;
      exchangeRedeemQuantity = customExchangeRedeemQuantity || new BigNumber(10 ** 10);
      exchangeRedeemSendTokenExchangeIds = [SetUtils.EXCHANGES.ZERO_EX];
      exchangeRedeemSendTokens = [componentAddresses[0]];
      exchangeRedeemSendTokenAmounts = customExchangeRedeemSendTokenAmounts ||
        [componentUnits[0].mul(exchangeRedeemQuantity).div(baseSetNaturalUnit)];
      exchangeRedeemReceiveTokens = [receiveToken.address];
      exchangeRedeemReceiveTokenAmounts = [receiveTokenQuantityToReceive];

      const exchangeIssuanceParams = {
        setAddress:             exchangeRedeemSetAddress,
        sendTokenExchangeIds:   exchangeRedeemSendTokenExchangeIds,
        sendTokens:             exchangeRedeemSendTokens,
        sendTokenAmounts:       exchangeRedeemSendTokenAmounts,
        quantity:               exchangeRedeemQuantity,
        receiveTokens:          exchangeRedeemReceiveTokens,
        receiveTokenAmounts:    exchangeRedeemReceiveTokenAmounts,
      };

      const requiredExchangePaymentToken = receiveTokenTradedFor || exchangeRedeemReceiveTokenAmounts[0];
      await receiveToken.approve.sendTransactionAsync(
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        requiredExchangePaymentToken,
        { from: zeroExOrderMaker, gas: DEFAULT_GAS }
      );

      // Create 0x order for the component
      zeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                                      // senderAddress
        zeroExOrderMaker,                                                  // makerAddress
        NULL_ADDRESS,                                                      // takerAddress
        ZERO,                                                              // makerFee
        ZERO,                                                              // takerFee
        receiveTokenTradedFor || exchangeRedeemReceiveTokenAmounts[0],     // makerAssetAmount
        exchangeRedeemSendTokenAmounts[0],                                 // takerAssetAmount
        exchangeRedeemReceiveTokens[0],                                    // makerAssetAddress
        exchangeRedeemSendTokens[0],                                       // takerAssetAddress
        SetUtils.generateSalt(),                                           // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,                             // exchangeAddress
        NULL_ADDRESS,                                                      // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),                             // expirationTimeSeconds
        exchangeRedeemSendTokenAmounts[0],                                 // amount of zeroExOrder to fill
      );

      // Approve base component to transfer proxy
      await erc20Wrapper.approveTransfersAsync(
        [baseSetComponent],
        transferProxy.address,
        tokenPurchaser
      );

      nonExchangedPaymentTokenQuantity = componentUnits[1].mul(exchangeRedeemQuantity).div(baseSetNaturalUnit);

      // Transfer some of the payment token to the purchaser
      await receiveToken.transfer.sendTransactionAsync(
        tokenPurchaser,
        nonExchangedPaymentTokenQuantity,
        { from: zeroExOrderMaker, gas: DEFAULT_GAS }
      );

      // Approve Payment token to the transferProxy
      await receiveToken.approve.sendTransactionAsync(
        transferProxy.address,
        nonExchangedPaymentTokenQuantity,
        { from: tokenPurchaser, gas: DEFAULT_GAS }
      );

      // Issue the Base Set to the vault
      await core.issueInVault.sendTransactionAsync(
        baseSetToken.address,
        exchangeRedeemQuantity,
        { from: tokenPurchaser, gas: DEFAULT_GAS }
      );

      // Issue the Rebalancing Set
      const rebalancingSetQuantity = exchangeRedeemQuantity
                                       .mul(DEFAULT_REBALANCING_NATURAL_UNIT)
                                       .div(rebalancingUnitShares);
      await core.issue.sendTransactionAsync(
        rebalancingSetToken.address,
        rebalancingSetQuantity,
        { from: tokenPurchaser, gas: DEFAULT_GAS }
      );

      subjectRebalancingSetAddress = rebalancingSetToken.address;
      subjectRebalancingSetQuantity = rebalancingSetQuantity;
      subjectExchangeIssuanceParams = exchangeIssuanceParams;
      subjectExchangeOrdersData = setUtils.generateSerializedOrders([zeroExOrder]);
      subjectCaller = tokenPurchaser;
    });

    afterEach(async () => {
      customExchangeRedeemQuantity = undefined;
    });

    async function subject(): Promise<string> {
      return rebalancingSetExchangeIssuanceModule.redeemRebalancingSetIntoERC20.sendTransactionAsync(
        subjectRebalancingSetAddress,
        subjectRebalancingSetQuantity,
        subjectExchangeIssuanceParams,
        subjectExchangeOrdersData,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it('redeems the rebalancing Set', async () => {
      const previousRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      const expectedRBSetTokenBalance = previousRBSetTokenBalance.sub(subjectRebalancingSetQuantity);

      await subject();

      const currentRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      expect(expectedRBSetTokenBalance).to.bignumber.equal(currentRBSetTokenBalance);
    });

    it('should increment the users payment token balance by the correct quantity', async () => {
      const previousPaymentTokenBalance = await receiveToken.balanceOf.callAsync(subjectCaller);

      await subject();

      const expectedEthBalance = previousPaymentTokenBalance
                                   .add(receiveTokenQuantityToReceive)
                                   .add(nonExchangedPaymentTokenQuantity);
      const currentBalance = await receiveToken.balanceOf.callAsync(subjectCaller);

      expect(currentBalance).to.bignumber.equal(expectedEthBalance);
    });

    it('increases the 0x makers send token quantity properly', async () => {
      const previousTakerTokenBalance = await baseSetComponent.balanceOf.callAsync(zeroExOrderMaker);
      const expectedTakerTokenBalance = previousTakerTokenBalance.add(exchangeRedeemSendTokenAmounts[0]);

      await subject();

      const currentTakerTokenBalance = await baseSetComponent.balanceOf.callAsync(zeroExOrderMaker);
      expect(expectedTakerTokenBalance).to.bignumber.equal(currentTakerTokenBalance);
    });

    it('emits correct LogERC20ExchangeRedeem event', async () => {
      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = LogERC20ExchangeRedeem(
        subjectRebalancingSetAddress,
        subjectCaller,
        subjectRebalancingSetQuantity,
        rebalancingSetExchangeIssuanceModule.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the Set has a component that has not been exchanged', async () => {
      let nonExchangedNonPaymentComponent: StandardTokenMockContract;

      before(async () => {
        nonExchangedNonPaymentComponent = await erc20Wrapper.deployTokenAsync(tokenPurchaser);

        customPaymentToken = await erc20Wrapper.deployTokenAsync(zeroExOrderMaker);

        customBaseSetComponent = await erc20Wrapper.deployTokenAsync(tokenPurchaser);
        customComponentAddresses = [
          customBaseSetComponent.address,
          customPaymentToken.address,
          nonExchangedNonPaymentComponent.address,
        ];
        customComponentUnits = [new BigNumber(10 ** 10), new BigNumber(10 ** 10), new BigNumber(10 ** 10)];

        await erc20Wrapper.approveTransfersAsync(
          [nonExchangedNonPaymentComponent],
          transferProxy.address,
          tokenPurchaser
        );
      });

      after(async () => {
        customBaseSetComponent = undefined;
        customPaymentToken = undefined;
        customComponentAddresses = undefined;
        customComponentUnits = undefined;
      });

      it('should send the extra asset to the caller', async () => {
        const previousReturnedAssetBalance = await nonExchangedNonPaymentComponent.balanceOf.callAsync(subjectCaller);
        const expectedReturnedAssetBalance = previousReturnedAssetBalance.add(
          customComponentUnits[2].mul(exchangeRedeemQuantity).div(baseSetNaturalUnit)
        );

        await subject();

        const currentReturnedAssetBalance = await nonExchangedNonPaymentComponent.balanceOf.callAsync(subjectCaller);
        expect(expectedReturnedAssetBalance).to.bignumber.equal(currentReturnedAssetBalance);
      });
    });

    describe('when the quantity of receiveToken in receive tokens is less than the amount traded for', async () => {
      before(async () => {
        receiveTokenTradedFor = ether(3);
      });

      after(async () => {
        receiveTokenTradedFor = undefined;
      });

      it('should increment the users eth balance by the correct quantity', async () => {
        const previousBalance = await receiveToken.balanceOf.callAsync(subjectCaller);

        await subject();

        const expectedBalance = previousBalance
                                     .add(receiveTokenTradedFor)
                                     .add(nonExchangedPaymentTokenQuantity);
        const currentBalance = await receiveToken.balanceOf.callAsync(subjectCaller);
        expect(currentBalance).to.bignumber.equal(expectedBalance);
      });
    });

    describe('when the quantity of send token is less than the components redeemed', async () => {
      let halfBaseComponentQuantity: BigNumber;

      before(async () => {
        const componentUnit = new BigNumber(10 ** 10);
        const naturalUnit = new BigNumber(10 ** 9);
        const redeemQuantity = new BigNumber(10 ** 10);

        halfBaseComponentQuantity =  componentUnit.mul(redeemQuantity).div(naturalUnit).div(2);

        customExchangeRedeemSendTokenAmounts = [halfBaseComponentQuantity];
      });

      after(async () => {
        customExchangeRedeemSendTokenAmounts = undefined;
      });

      it('should send the unsold components to the caller', async () => {
        const previousReturnedAssetBalance = await baseSetComponent.balanceOf.callAsync(subjectCaller);
        const expectedReturnedAssetBalance = previousReturnedAssetBalance.add(halfBaseComponentQuantity);

        await subject();

        const currentReturnedAssetBalance = await baseSetComponent.balanceOf.callAsync(subjectCaller);
        expect(expectedReturnedAssetBalance).to.bignumber.equal(currentReturnedAssetBalance);
      });
    });

    describe('when the implied base Set quantity is greater than the issuance params base Set quantity', async () => {
      let excessBaseSetQuantity: BigNumber;

      beforeEach(async () => {
        const excessNonExchangedPaymentTokenQuantity = nonExchangedPaymentTokenQuantity.mul(2);
        excessBaseSetQuantity = exchangeRedeemQuantity.mul(2);

        // Transfer additional payment token to the purchaser
        await receiveToken.transfer.sendTransactionAsync(
          tokenPurchaser,
          excessNonExchangedPaymentTokenQuantity,
          { from: zeroExOrderMaker, gas: DEFAULT_GAS }
        );

        // Approve payment token to the transferProxy
        await receiveToken.approve.sendTransactionAsync(
          transferProxy.address,
          UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
          { from: tokenPurchaser, gas: DEFAULT_GAS }
        );

        // Issue the Base Set to the vault
        await core.issueInVault.sendTransactionAsync(
          baseSetToken.address,
          excessBaseSetQuantity,
          { from: tokenPurchaser, gas: DEFAULT_GAS }
        );

        // Issue the Rebalancing Set
        const excessRebalancingSetQuantity = excessBaseSetQuantity
                                         .mul(DEFAULT_REBALANCING_NATURAL_UNIT)
                                         .div(rebalancingUnitShares);
        await core.issue.sendTransactionAsync(
          rebalancingSetToken.address,
          excessRebalancingSetQuantity,
          { from: tokenPurchaser, gas: DEFAULT_GAS }
        );

        subjectRebalancingSetQuantity = subjectRebalancingSetQuantity.add(excessRebalancingSetQuantity);
      });

      it('should return the excess base Set to the caller', async () => {
        const previousReturnedAssetBalance = await baseSetToken.balanceOf.callAsync(subjectCaller);
        const expectedReturnedAssetBalance = previousReturnedAssetBalance.add(excessBaseSetQuantity);

        await subject();

        const currentReturnedAssetBalance = await baseSetToken.balanceOf.callAsync(subjectCaller);
        expect(expectedReturnedAssetBalance).to.bignumber.equal(currentReturnedAssetBalance);
      });
    });

    describe('when the receive tokens length is greater than 1', async () => {
      beforeEach(async () => {
        subjectExchangeIssuanceParams.receiveTokens = [receiveToken.address, receiveToken.address];
        subjectExchangeIssuanceParams.receiveTokenAmounts = [new BigNumber(1), new BigNumber(1)];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the receive token is not wrapped ether', async () => {
      beforeEach(async () => {
        const baseSetComponent = await erc20Wrapper.deployTokenAsync(zeroExOrderMaker);
        subjectExchangeIssuanceParams.receiveTokens = [baseSetComponent.address];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the base Set of the rebalancing Set is not the issuance params Set', async () => {
      beforeEach(async () => {
        subjectExchangeIssuanceParams.setAddress = receiveToken.address;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the rebalancingSetAddress is not tracked by Core', async () => {
      beforeEach(async () => {
        const proposalPeriod = ONE_DAY_IN_SECONDS;
        const rebalanceInterval = ONE_DAY_IN_SECONDS;
        const unTrackedSetToken = await rebalancingWrapper.deployRebalancingSetTokenAsync(
          rebalancingSetTokenFactory.address,
          ownerAccount,
          baseSetToken.address,
          DEFAULT_UNIT_SHARES,
          DEFAULT_REBALANCING_NATURAL_UNIT,
          proposalPeriod,
          rebalanceInterval,
          whitelist,
        );
        subjectRebalancingSetAddress = unTrackedSetToken.address;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
