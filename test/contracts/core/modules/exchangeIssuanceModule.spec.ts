require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import {
  Address,
  Bytes,
  ExchangeIssuanceParams,
  KyberTrade,
  ZeroExSignedFillOrder
} from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  ExchangeIssuanceModuleContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract
} from '@utils/contracts';
import { ether } from '@utils/units';
import { assertTokenBalanceAsync, expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { DEFAULT_GAS, DEPLOYED_TOKEN_QUANTITY, KYBER_RESERVE_CONFIGURED_RATE } from '@utils/constants';
import { LogExchangeIssue, LogExchangeRedeem } from '@utils/contract_logs/exchangeIssuanceModule';
import { generateOrdersDataWithIncorrectExchange } from '@utils/orders';
import { getWeb3 } from '@utils/web3Helper';

import { ExchangeWrapper } from '@utils/wrappers/exchangeWrapper';
import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const Core = artifacts.require('Core');
const ExchangeIssuanceModule = artifacts.require('ExchangeIssuanceModule');
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const blockchain = new Blockchain(web3);
const setTestUtils = new SetTestUtils(web3);
const setUtils = new SetUtils(web3);
const { expect } = chai;
const { NULL_ADDRESS, ZERO } = SetUtils.CONSTANTS;

contract('ExchangeIssuanceModule', accounts => {
  const [
    contractDeployer,
    notExchangeIssueCaller,
    zeroExOrderMaker,
    exchangeIssuanceCaller,
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let exchangeIssuanceModule: ExchangeIssuanceModuleContract;
  let setTokenFactory: SetTokenFactoryContract;

  const coreWrapper = new CoreWrapper(contractDeployer, contractDeployer);
  const erc20Wrapper = new ERC20Wrapper(contractDeployer);
  const exchangeWrapper = new ExchangeWrapper(contractDeployer);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
    ABIDecoder.addABI(ExchangeIssuanceModule.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
    ABIDecoder.removeABI(ExchangeIssuanceModule.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    vault = await coreWrapper.deployVaultAsync();
    transferProxy = await coreWrapper.deployTransferProxyAsync();
    core = await coreWrapper.deployCoreAsync(transferProxy, vault);
    exchangeIssuanceModule = await coreWrapper.deployExchangeIssuanceModuleAsync(
      core,
      vault
    );
    await coreWrapper.addModuleAsync(core, exchangeIssuanceModule.address);
    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);

    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#exchangeIssue', async () => {
    let subjectCaller: Address;
    let subjectExchangeIssuanceParams: ExchangeIssuanceParams;
    let subjectExchangeOrdersData: Bytes;

    let naturalUnit: BigNumber;
    let setToken: SetTokenContract;
    let sendToken: StandardTokenMockContract;

    let totalSendToken: BigNumber;

    let exchangeIssueSetAddress: Address;
    let exchangeIssueQuantity: BigNumber;
    let exchangeIssueSendTokenExchangeIds: BigNumber[];
    let exchangeIssueSendTokens: Address[];
    let exchangeIssueSendTokenAmounts: BigNumber[];
    let exchangeIssueReceiveTokens: Address[];
    let exchangeIssueReceiveTokenAmounts: BigNumber[];

    let zeroExOrder: ZeroExSignedFillOrder;
    let zeroExOrderMakerTokenAmount: BigNumber;
    let zeroExOrderTakerAssetAmount: BigNumber;
    let kyberTrade: KyberTrade;
    let kyberTradeMakerTokenChange: BigNumber;
    let kyberConversionRatePower: BigNumber;

    beforeEach(async () => {
      await exchangeWrapper.deployAndAuthorizeZeroExExchangeWrapper(
        core,
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        SetTestUtils.ZERO_EX_TOKEN_ADDRESS,
        transferProxy
      );
      await exchangeWrapper.deployAndAuthorizeKyberNetworkWrapper(
        core,
        SetTestUtils.KYBER_NETWORK_PROXY_ADDRESS,
        transferProxy
      );

      const firstComponent = erc20Wrapper.kyberReserveToken(SetTestUtils.KYBER_RESERVE_DESTINATION_TOKEN_ADDRESS);
      const secondComponent = await erc20Wrapper.deployTokenAsync(zeroExOrderMaker);
      sendToken = erc20Wrapper.kyberReserveToken(SetTestUtils.KYBER_RESERVE_SOURCE_TOKEN_ADDRESS);

      const componentTokens = [firstComponent, secondComponent];
      const setComponentUnit = ether(4);
      const componentAddresses = componentTokens.map(token => token.address);
      const componentUnits = componentTokens.map(token => setComponentUnit);
      naturalUnit = ether(2);

      setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      await erc20Wrapper.approveTransfersAsync(
        [sendToken],
        transferProxy.address,
        exchangeIssuanceCaller
      );
      await erc20Wrapper.approveTransfersAsync(
        [secondComponent],
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        zeroExOrderMaker
      );

      const zeroExTakerTokenQuantity = zeroExOrderTakerAssetAmount || ether(4);
      const kyberSourceTokenQuantity = ether(25);
      totalSendToken = zeroExTakerTokenQuantity.add(kyberSourceTokenQuantity);

      // Create issuance order, submitting ether(30) makerToken for ether(4) of the Set with 3 components
      exchangeIssueSetAddress = exchangeIssueSetAddress || setToken.address;

      exchangeIssueQuantity = exchangeIssueQuantity || ether(4);

      exchangeIssueSendTokenExchangeIds =
        exchangeIssueSendTokenExchangeIds || [SetUtils.EXCHANGES.KYBER, SetUtils.EXCHANGES.ZERO_EX];

      exchangeIssueSendTokens = exchangeIssueSendTokens || [sendToken.address, sendToken.address];
      exchangeIssueSendTokenAmounts =
        exchangeIssueSendTokenAmounts || [kyberSourceTokenQuantity, zeroExTakerTokenQuantity];

      exchangeIssueReceiveTokens =
        exchangeIssueReceiveTokens || [firstComponent.address, secondComponent.address];

      exchangeIssueReceiveTokenAmounts =
        exchangeIssueReceiveTokenAmounts || _.map(componentUnits, unit => unit
          .mul(exchangeIssueQuantity)
          .div(naturalUnit)
        );

      // Property:                Value                         | Property
      subjectExchangeIssuanceParams = {
        setAddress:             exchangeIssueSetAddress,            // setAddress
        sendTokenExchangeIds:   exchangeIssueSendTokenExchangeIds,  // sendTokenExchangeIds
        sendTokens:             exchangeIssueSendTokens,            // sendToken
        sendTokenAmounts:       exchangeIssueSendTokenAmounts,      // sendTokenAmount
        quantity:               exchangeIssueQuantity,              // quantity
        receiveTokens:          exchangeIssueReceiveTokens,         // requiredComponents
        receiveTokenAmounts:    exchangeIssueReceiveTokenAmounts,   // requiredComponentAmounts
      } as ExchangeIssuanceParams;

      // Create Kyber trade for the second component, using ether(25) sendToken. Conversion rate pre set on snapshot
      const maxDestinationQuantity = exchangeIssueReceiveTokenAmounts[0];
      const componentTokenDecimals = (await firstComponent.decimals.callAsync()).toNumber();
      const sourceTokenDecimals = (await sendToken.decimals.callAsync()).toNumber();
      kyberConversionRatePower = new BigNumber(10).pow(18 + sourceTokenDecimals - componentTokenDecimals);
      const minimumConversionRate = maxDestinationQuantity.div(kyberSourceTokenQuantity)
                                                          .mul(kyberConversionRatePower)
                                                          .round();
      kyberTradeMakerTokenChange = kyberSourceTokenQuantity.sub(
        maxDestinationQuantity.mul(kyberConversionRatePower).div(KYBER_RESERVE_CONFIGURED_RATE).floor());
      kyberTrade = {
        sourceToken: sendToken.address,
        destinationToken: firstComponent.address,
        sourceTokenQuantity: kyberSourceTokenQuantity,
        minimumConversionRate: minimumConversionRate,
        maxDestinationQuantity: maxDestinationQuantity,
      } as KyberTrade;

      // Create 0x order for the second component, using ether(4) sendToken as default
      zeroExOrderMakerTokenAmount = zeroExOrderMakerTokenAmount || exchangeIssueReceiveTokenAmounts[1];
      zeroExOrderTakerAssetAmount = zeroExOrderTakerAssetAmount || ether(4);
      zeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                      // senderAddress
        zeroExOrderMaker,                                  // makerAddress
        NULL_ADDRESS,                                      // takerAddress
        ZERO,                                              // makerFee
        ZERO,                                              // takerFee
        zeroExOrderMakerTokenAmount,                       // makerAssetAmount
        zeroExTakerTokenQuantity,                          // takerAssetAmount
        secondComponent.address,                           // makerAssetAddress
        sendToken.address,                                 // takerAssetAddress
        SetUtils.generateSalt(),                           // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,             // exchangeAddress
        NULL_ADDRESS,                                      // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),             // expirationTimeSeconds
        zeroExOrderTakerAssetAmount,                       // amount of zeroExOrder to fill
      );

      subjectExchangeOrdersData =
        subjectExchangeOrdersData || setUtils.generateSerializedOrders([zeroExOrder, kyberTrade]);
      subjectCaller = exchangeIssuanceCaller;
    });

    afterEach(async () => {
      exchangeIssueQuantity = undefined;
      exchangeIssueReceiveTokens = undefined;
      exchangeIssueReceiveTokenAmounts = undefined;
    });

    async function subject(): Promise<string> {
      return exchangeIssuanceModule.exchangeIssue.sendTransactionAsync(
        subjectExchangeIssuanceParams,
        subjectExchangeOrdersData,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it('mints the correct quantity of the set for the sender', async () => {
      const existingBalance = await setToken.balanceOf.callAsync(exchangeIssuanceCaller);

      await subject();

      await assertTokenBalanceAsync(setToken, existingBalance.add(exchangeIssueQuantity), exchangeIssuanceCaller);
    });

    it('transfers the maker token amount from the maker, and returns change from Kyber', async () => {
      const existingBalance = await sendToken.balanceOf.callAsync(exchangeIssuanceCaller);
      await assertTokenBalanceAsync(sendToken, DEPLOYED_TOKEN_QUANTITY, exchangeIssuanceCaller);

      await subject();

      // TODO: Change from unused kyber source token is not being calculated correctly, off by 3 * 10 ** -26
      const expectedNewBalance = existingBalance.sub(totalSendToken)
                                                .add(kyberTradeMakerTokenChange);
      const newBalance = await sendToken.balanceOf.callAsync(exchangeIssuanceCaller);

      await expect(newBalance.toPrecision(26)).to.be.bignumber.equal(expectedNewBalance.toPrecision(26));
    });

    it('transfers the maker token amount from the maker to the 0x maker', async () => {
      const zeroExMakerPaymentTokenBalance = await sendToken.balanceOf.callAsync(zeroExOrderMaker);

      await subject();

      const expectedMakerPaymentTokenBalance = zeroExMakerPaymentTokenBalance.add(zeroExOrder.takerAssetAmount);
      const actualMakerPaymentTokenBalance = await sendToken.balanceOf.callAsync(zeroExOrderMaker);
      await expect(expectedMakerPaymentTokenBalance).to.be.bignumber.equal(actualMakerPaymentTokenBalance);
    });

    it('emits correct LogExchangeIssue event', async () => {
      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = LogExchangeIssue(
        setToken.address,
        subjectCaller,
        exchangeIssueQuantity,
        exchangeIssueSendTokens,
        exchangeIssueSendTokenAmounts,
        exchangeIssuanceModule.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when a receiveToken is not a component of the Set', async () => {
      before(async () => {
        const firstComponent = erc20Wrapper.kyberReserveToken(SetTestUtils.KYBER_RESERVE_SOURCE_TOKEN_ADDRESS);
        const notComponent = await erc20Wrapper.deployTokenAsync(contractDeployer);

        exchangeIssueReceiveTokens = [firstComponent.address, notComponent.address];
      });

      after(async () => {
        exchangeIssueReceiveTokens = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when an encoded exchangeId is invalid', async () => {
      beforeEach(async () => {
        subjectExchangeOrdersData = generateOrdersDataWithIncorrectExchange();
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when quantity is zero', async () => {
      before(async () => {
        exchangeIssueQuantity = ZERO;
      });

     after(async () => {
        exchangeIssueQuantity = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the set was not created through core', async () => {
      before(async () => {
        exchangeIssueSetAddress = NULL_ADDRESS;
      });

      after(async () => {
        exchangeIssueSetAddress = undefined;
       });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the issue quantity is not a multiple of the natural unit of the set', async () => {
      before(async () => {
        exchangeIssueQuantity = ether(3); // naturalUnit = ether(2);
      });

      after(async () => {
        exchangeIssueQuantity = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the receive tokens is empty', async () => {
      before(async () => {
        exchangeIssueReceiveTokens = [];
      });

     after(async () => {
        exchangeIssueReceiveTokens = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the receive tokens is insufficient', async () => {
      before(async () => {
        zeroExOrderMakerTokenAmount = ether(1);
      });

      after(async () => {
        zeroExOrderMakerTokenAmount = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the receive tokens and amount lengths differ', async () => {
      before(async () => {
        exchangeIssueReceiveTokens = [notExchangeIssueCaller];
      });

      after(async () => {
        exchangeIssueReceiveTokens = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the send token exchange length differ from other send inputs', async () => {
      before(async () => {
        exchangeIssueSendTokenExchangeIds = [SetUtils.EXCHANGES.ZERO_EX];
      });

      after(async () => {
        exchangeIssueSendTokenExchangeIds = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the send token length differ from other send inputs', async () => {
      before(async () => {
        const sendToken = erc20Wrapper.kyberReserveToken(SetTestUtils.KYBER_RESERVE_SOURCE_TOKEN_ADDRESS);

        exchangeIssueSendTokens = [sendToken.address];
      });

      after(async () => {
        exchangeIssueSendTokens = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the send token amount length differ from other send inputs', async () => {
      before(async () => {
        exchangeIssueSendTokenAmounts = [new BigNumber(1)];
      });

      after(async () => {
        exchangeIssueSendTokenAmounts = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the send token exchange is not valid', async () => {
      before(async () => {
        exchangeIssueSendTokenExchangeIds = [SetUtils.EXCHANGES.ZERO_EX, new BigNumber(5)];
      });

      after(async () => {
        exchangeIssueSendTokenExchangeIds = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the duplicate exchange header is provided', async () => {
      beforeEach(async () => {
        const firstOrder = setUtils.generateSerializedOrders([zeroExOrder]);
        const secondOrder = setUtils.generateSerializedOrders([zeroExOrder]).slice(2);

        subjectExchangeOrdersData = firstOrder.concat(secondOrder);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when a receive token is not a member of the Set', async () => {
      before(async () => {
        const notComponent = await erc20Wrapper.deployTokenAsync(zeroExOrderMaker);
        const notComponent2 = await erc20Wrapper.deployTokenAsync(zeroExOrderMaker);
        exchangeIssueReceiveTokens = [notComponent.address, notComponent2.address];
      });

      after(async () => {
        exchangeIssueReceiveTokens = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when a receive token amount is 0', async () => {
      before(async () => {
        exchangeIssueReceiveTokenAmounts = [ZERO, ZERO];
      });

      after(async () => {
        exchangeIssueReceiveTokenAmounts = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });


    describe('when the send token amounts is 0', async () => {
      before(async () => {
        exchangeIssueSendTokenAmounts = [ZERO, ZERO];
      });

      after(async () => {
        exchangeIssueSendTokenAmounts = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#exchangeRedeem', async () => {
    let subjectCaller: Address;
    let subjectExchangeIssuanceParams: ExchangeIssuanceParams;
    let subjectExchangeOrdersData: Bytes;

    let setComponentUnit: BigNumber;
    let naturalUnit: BigNumber;
    let setToken: SetTokenContract;
    let receiveToken: StandardTokenMockContract;

    let nonExchangedComponent: StandardTokenMockContract;

    let totalReceiveToken: BigNumber;

    let exchangeRedeemSetAddress: Address;
    let exchangeRedeemQuantity: BigNumber;
    let exchangeRedeemSendTokenExchanges: BigNumber[];
    let exchangeRedeemSendTokens: Address[];
    let exchangeRedeemSendTokenAmounts: BigNumber[];
    let exchangeRedeemReceiveTokens: Address[];
    let exchangeRedeemReceiveTokenAmounts: BigNumber[];

    let zeroExOrder: ZeroExSignedFillOrder;
    let zeroExOrderMakerTokenAmount: BigNumber;
    let zeroExOrderTakerTokenAmount: BigNumber;
    let kyberTrade: KyberTrade;
    let kyberConversionRatePower: BigNumber;

    beforeEach(async () => {
      subjectCaller = exchangeIssuanceCaller;

      await exchangeWrapper.deployAndAuthorizeZeroExExchangeWrapper(
        core,
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        SetTestUtils.ZERO_EX_TOKEN_ADDRESS,
        transferProxy
      );
      await exchangeWrapper.deployAndAuthorizeKyberNetworkWrapper(
        core,
        SetTestUtils.KYBER_NETWORK_PROXY_ADDRESS,
        transferProxy
      );

      const firstComponent = erc20Wrapper.kyberReserveToken(SetTestUtils.KYBER_RESERVE_SOURCE_TOKEN_ADDRESS);
      const secondComponent = await erc20Wrapper.deployTokenAsync(contractDeployer);
      nonExchangedComponent = await erc20Wrapper.deployTokenAsync(contractDeployer);
      receiveToken = erc20Wrapper.kyberReserveToken(SetTestUtils.KYBER_RESERVE_DESTINATION_TOKEN_ADDRESS);

      const componentTokens = [firstComponent, secondComponent, nonExchangedComponent];
      setComponentUnit = ether(4);
      const componentAddresses = componentTokens.map(token => token.address);
      const componentUnits = componentTokens.map(token => setComponentUnit);
      naturalUnit = ether(2);

      setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      zeroExOrderMakerTokenAmount = zeroExOrderMakerTokenAmount || ether(4);
      const kyberDestinationTokenQuantity = ether(2.56);
      totalReceiveToken = zeroExOrderMakerTokenAmount.add(kyberDestinationTokenQuantity);

      exchangeRedeemSetAddress = exchangeRedeemSetAddress || setToken.address;
      exchangeRedeemQuantity = exchangeRedeemQuantity || ether(4);

      exchangeRedeemSendTokenExchanges =
        exchangeRedeemSendTokenExchanges || [SetUtils.EXCHANGES.KYBER, SetUtils.EXCHANGES.ZERO_EX];

      exchangeRedeemSendTokens = exchangeRedeemSendTokens || [firstComponent.address, secondComponent.address];
      exchangeRedeemSendTokenAmounts =
        exchangeRedeemSendTokenAmounts || _.map(componentUnits.slice(0, 2), unit => unit
          .mul(exchangeRedeemQuantity)
          .div(naturalUnit)
        );

      exchangeRedeemReceiveTokens =
        exchangeRedeemReceiveTokens || [receiveToken.address];

      exchangeRedeemReceiveTokenAmounts =
        exchangeRedeemReceiveTokenAmounts || [totalReceiveToken];

      // Property:                Value                         | Property
      subjectExchangeIssuanceParams = {
        setAddress:             exchangeRedeemSetAddress,          // setAddress
        sendTokenExchangeIds:     exchangeRedeemSendTokenExchanges,  // sendTokenExchangeIds
        sendTokens:             exchangeRedeemSendTokens,          // sendToken
        sendTokenAmounts:       exchangeRedeemSendTokenAmounts,    // sendTokenAmount
        quantity:               exchangeRedeemQuantity,            // quantity
        receiveTokens:          exchangeRedeemReceiveTokens,       // receiveTokens
        receiveTokenAmounts:    exchangeRedeemReceiveTokenAmounts, // receiveTokenAmounts
      } as ExchangeIssuanceParams;

      // Create Kyber trade. Conversion rate pre set on snapshot
      const sourceTokenQuantity = exchangeRedeemSendTokenAmounts[0];
      const maxDestinationQuantity = kyberDestinationTokenQuantity;
      const destinationTokenDecimals = (await receiveToken.decimals.callAsync()).toNumber();
      const sourceTokenDecimals = (await firstComponent.decimals.callAsync()).toNumber();
      kyberConversionRatePower = new BigNumber(10).pow(18 + sourceTokenDecimals - destinationTokenDecimals);

      // NOTE: Kyber Minimum Conversion rates should be < 3.2 x 10**17
      const minimumConversionRate = maxDestinationQuantity.div(sourceTokenQuantity)
                                                          .mul(kyberConversionRatePower)
                                                          .round();

      kyberTrade = {
        sourceToken: firstComponent.address,
        destinationToken: receiveToken.address,
        sourceTokenQuantity: sourceTokenQuantity,
        minimumConversionRate: minimumConversionRate,
        maxDestinationQuantity: maxDestinationQuantity,
      } as KyberTrade;

      // Create 0x order for the second component, using ether(4) sendToken as default
      zeroExOrderTakerTokenAmount = zeroExOrderTakerTokenAmount || exchangeRedeemSendTokenAmounts[1];
      zeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                      // senderAddress
        zeroExOrderMaker,                                  // makerAddress
        NULL_ADDRESS,                                      // takerAddress
        ZERO,                                              // makerFee
        ZERO,                                              // takerFee
        zeroExOrderMakerTokenAmount,                       // makerAssetAmount
        zeroExOrderTakerTokenAmount,                       // takerAssetAmount
        receiveToken.address,                              // makerAssetAddress
        secondComponent.address,                           // takerAssetAddress
        SetUtils.generateSalt(),                           // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,             // exchangeAddress
        NULL_ADDRESS,                                      // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),             // expirationTimeSeconds
        zeroExOrderTakerTokenAmount,                       // amount of zeroExOrder to fill
      );

      subjectExchangeOrdersData =
        subjectExchangeOrdersData || setUtils.generateSerializedOrders([zeroExOrder, kyberTrade]);

      // Approve the receive token to the 0x maker
      await erc20Wrapper.approveTransfersAsync(
        [receiveToken],
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        zeroExOrderMaker
      );

      // Fund the 0x maker with the receive token
      await erc20Wrapper.transferTokenAsync(
        receiveToken,
        zeroExOrderMaker,
        zeroExOrderMakerTokenAmount,
      );

      await erc20Wrapper.approveTransfersAsync(
        [firstComponent, secondComponent, nonExchangedComponent],
        transferProxy.address,
        contractDeployer
      );

      // Issue the Set and transfer to the caller
      await coreWrapper.issueSetTokenAsync(
        core,
        setToken.address,
        exchangeRedeemQuantity
      );

      await erc20Wrapper.transferTokenAsync(
        setToken,
        subjectCaller,
        exchangeRedeemQuantity
      );
    });

    afterEach(async () => {
      exchangeRedeemQuantity = undefined;
      exchangeRedeemReceiveTokens = undefined;
      exchangeRedeemReceiveTokenAmounts = undefined;
    });

    async function subject(): Promise<string> {
      return exchangeIssuanceModule.exchangeRedeem.sendTransactionAsync(
        subjectExchangeIssuanceParams,
        subjectExchangeOrdersData,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it('redeems the correct quantity of the set for the sender', async () => {
      const existingBalance = await setToken.balanceOf.callAsync(exchangeIssuanceCaller);

      await subject();

      await assertTokenBalanceAsync(setToken, existingBalance.sub(exchangeRedeemQuantity), exchangeIssuanceCaller);
    });

    it('increments the correct amount of Sent token', async () => {
      const existingBalance = await receiveToken.balanceOf.callAsync(exchangeIssuanceCaller);

      await subject();

      const expectedNewBalance = existingBalance.add(totalReceiveToken);
      const newBalance = await receiveToken.balanceOf.callAsync(exchangeIssuanceCaller);

      await expect(newBalance).to.be.bignumber.equal(expectedNewBalance);
    });

    it('returns the correct quantity of non-exchanged tokens', async () => {
      const existingBalance = await nonExchangedComponent.balanceOf.callAsync(exchangeIssuanceCaller);

      await subject();

      const incrementQuantity = setComponentUnit.mul(exchangeRedeemQuantity).div(naturalUnit);
      const expectedNewBalance = existingBalance.add(incrementQuantity);
      const newBalance = await nonExchangedComponent.balanceOf.callAsync(exchangeIssuanceCaller);

      await expect(newBalance).to.be.bignumber.equal(expectedNewBalance);
    });

    it('emits correct LogExchangeRedeem event', async () => {
      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = LogExchangeRedeem(
        setToken.address,
        subjectCaller,
        exchangeRedeemQuantity,
        exchangeRedeemReceiveTokens,
        exchangeRedeemReceiveTokenAmounts,
        exchangeIssuanceModule.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when a sendToken is not a component of the Set', async () => {
      before(async () => {
        const firstComponent = erc20Wrapper.kyberReserveToken(SetTestUtils.KYBER_RESERVE_SOURCE_TOKEN_ADDRESS);
        const notComponent = await erc20Wrapper.deployTokenAsync(contractDeployer);

        exchangeRedeemSendTokens = [firstComponent.address, notComponent.address];
      });

      after(async () => {
        exchangeRedeemSendTokens = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when quantity is zero', async () => {
      before(async () => {
        exchangeRedeemQuantity = new BigNumber(0);
      });

     after(async () => {
        exchangeRedeemQuantity = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when send quantities is zero', async () => {
      before(async () => {
        exchangeRedeemSendTokenAmounts = [ZERO, new BigNumber(0)];
      });

     after(async () => {
        exchangeRedeemSendTokenAmounts = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when there are fewer receive tokens than expected', async () => {
      before(async () => {
        exchangeRedeemReceiveTokenAmounts = [totalReceiveToken.times(2)];
      });

     after(async () => {
        exchangeRedeemReceiveTokenAmounts = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
