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
  AddressToAddressWhiteListContract,
  CoreContract,
  CTokenExchangeIssuanceModuleContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract
} from '@utils/contracts';
import { ether } from '@utils/units';
import { assertTokenBalanceAsync, expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import {
  DEFAULT_GAS,
  DEPLOYED_TOKEN_QUANTITY,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS
} from '@utils/constants';
import { LogExchangeIssue, LogExchangeRedeem } from '@utils/contract_logs/exchangeIssuanceModule';
import { generateOrdersDataWithIncorrectExchange } from '@utils/orders';
import { getWeb3 } from '@utils/web3Helper';

import { ExchangeHelper } from '@utils/helpers/exchangeHelper';
import { CompoundHelper } from '@utils/helpers/compoundHelper';
import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { KyberNetworkHelper } from '@utils/helpers/kyberNetworkHelper';
import { UtilsHelper } from '@utils/helpers/utilsHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const blockchain = new Blockchain(web3);
const setTestUtils = new SetTestUtils(web3);
const setUtils = new SetUtils(web3);
const { expect } = chai;
const { NULL_ADDRESS, ZERO } = SetUtils.CONSTANTS;

contract('CTokenExchangeIssuanceModule', accounts => {
  const [
    contractDeployer,
    kyberReserveOperator,
    zeroExOrderMaker,
    exchangeIssuanceCaller,
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let cTokenExchangeIssuanceModule: CTokenExchangeIssuanceModuleContract;
  let setTokenFactory: SetTokenFactoryContract;
  let cTokenWhiteList: AddressToAddressWhiteListContract;

  let cUSDCInstance: StandardTokenMockContract;
  let usdcInstance: StandardTokenMockContract;
  let cDAIInstance: StandardTokenMockContract;
  let daiInstance: StandardTokenMockContract;

  let badCUSDCInstance: StandardTokenMockContract;

  const coreHelper = new CoreHelper(contractDeployer, contractDeployer);
  const erc20Helper = new ERC20Helper(contractDeployer);
  const exchangeHelper = new ExchangeHelper(contractDeployer);
  const compoundHelper = new CompoundHelper(contractDeployer);
  const kyberNetworkHelper = new KyberNetworkHelper();
  const utilsHelper = new UtilsHelper(contractDeployer);

  before(async () => {
    ABIDecoder.addABI(CoreContract.getAbi());
    ABIDecoder.addABI(CTokenExchangeIssuanceModuleContract.getAbi());
  });

  after(async () => {
    ABIDecoder.removeABI(CoreContract.getAbi());
    ABIDecoder.removeABI(CTokenExchangeIssuanceModuleContract.getAbi());
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    vault = await coreHelper.deployVaultAsync();
    transferProxy = await coreHelper.deployTransferProxyAsync();
    core = await coreHelper.deployCoreAsync(transferProxy, vault);

    // Set up Compound USDC token
    usdcInstance = await erc20Helper.deployTokenAsync(
      kyberReserveOperator,
      18,
    );
    const cUSDCAddress = await compoundHelper.deployMockCUSDC(usdcInstance.address, contractDeployer);
    await compoundHelper.enableCToken(cUSDCAddress);
    // Set the Borrow Rate
    await compoundHelper.setBorrowRate(cUSDCAddress, new BigNumber('43084603999'));

    cUSDCInstance = badCUSDCInstance || await erc20Helper.getTokenInstanceAsync(cUSDCAddress);

    // Set up Compound DAI token
    daiInstance = await erc20Helper.deployTokenAsync(
      zeroExOrderMaker,
      18,
    );
    const cDAIAddress = await compoundHelper.deployMockCDAI(daiInstance.address, contractDeployer);
    await compoundHelper.enableCToken(cDAIAddress);
    // Set the Borrow Rate
    await compoundHelper.setBorrowRate(cDAIAddress, new BigNumber('29313252165'));

    cDAIInstance = await erc20Helper.getTokenInstanceAsync(cDAIAddress);
    cTokenWhiteList = await utilsHelper.deployAddressToAddressWhiteListAsync(
      [cUSDCInstance.address, cDAIInstance.address],
      [usdcInstance.address, daiInstance.address]
    );

    cTokenExchangeIssuanceModule = await coreHelper.deployCTokenExchangeIssuanceModuleAsync(
      core.address,
      vault.address,
      transferProxy.address,
      cTokenWhiteList.address
    );

    await coreHelper.addModuleAsync(core, cTokenExchangeIssuanceModule.address);

    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(core.address);
    await coreHelper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

    await kyberNetworkHelper.setup();
    await kyberNetworkHelper.fundReserveWithEth(
      kyberReserveOperator,
      ether(90),
    );
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    it('should contain the correct address of the transfer proxy', async () => {
      const actualProxyAddress = await cTokenExchangeIssuanceModule.transferProxy.callAsync();

      expect(actualProxyAddress).to.equal(transferProxy.address);
    });

    it('should have unlimited allowance for underlying to cToken contract', async () => {
      const underlyingUSDCAllowance = await usdcInstance.allowance.callAsync(
        cTokenExchangeIssuanceModule.address,
        cUSDCInstance.address,
      );
      const underlyingDAIAllowance = await daiInstance.allowance.callAsync(
        cTokenExchangeIssuanceModule.address,
        cDAIInstance.address,
      );
      const expectedUnderlyingAllowance = UNLIMITED_ALLOWANCE_IN_BASE_UNITS;

      expect(underlyingUSDCAllowance).to.bignumber.equal(expectedUnderlyingAllowance);
      expect(underlyingDAIAllowance).to.bignumber.equal(expectedUnderlyingAllowance);
    });

    it('should have unlimited allowance for underlying to transferProxy contract', async () => {
      const usdcAllowance = await usdcInstance.allowance.callAsync(
        cTokenExchangeIssuanceModule.address,
        transferProxy.address,
      );
      const daiAllowance = await daiInstance.allowance.callAsync(
        cTokenExchangeIssuanceModule.address,
        transferProxy.address,
      );
      const expectedCTokenAllowance = UNLIMITED_ALLOWANCE_IN_BASE_UNITS;

      expect(usdcAllowance).to.bignumber.equal(expectedCTokenAllowance);
      expect(daiAllowance).to.bignumber.equal(expectedCTokenAllowance);
    });

    it('should have unlimited allowance for cToken to transferProxy contract', async () => {
      const cUSDCAllowance = await cUSDCInstance.allowance.callAsync(
        cTokenExchangeIssuanceModule.address,
        transferProxy.address,
      );
      const cDAIAllowance = await cDAIInstance.allowance.callAsync(
        cTokenExchangeIssuanceModule.address,
        transferProxy.address,
      );
      const expectedCTokenAllowance = UNLIMITED_ALLOWANCE_IN_BASE_UNITS;

      expect(cUSDCAllowance).to.bignumber.equal(expectedCTokenAllowance);
      expect(cDAIAllowance).to.bignumber.equal(expectedCTokenAllowance);
    });
  });

  describe('#exchangeIssue', async () => {
    let subjectCaller: Address;
    let subjectExchangeIssuanceParams: ExchangeIssuanceParams;
    let subjectExchangeOrdersData: Bytes;

    let naturalUnit: BigNumber;
    let setComponentUnit: BigNumber;
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
    let kyberTradeSourceTokenUtilized: BigNumber;
    let kyberTradeSourceTokenChange: BigNumber;
    let kyberConversionRatePower: BigNumber;

    let customExchangeIssueSetAddress: Address;
    let customExchangeIssueQuantity: BigNumber;
    let customExchangeIssueSendTokenExchangeIds: BigNumber[];
    let customExchangeIssueSendTokens: Address[];
    let customExchangeIssueSendTokenAmounts: BigNumber[];
    let customExchangeIssueReceiveTokens: Address[];
    let customExchangeIssueReceiveTokenAmounts: BigNumber[];
    let customSendToken: StandardTokenMockContract;
    let customSendTokenUnderlying: StandardTokenMockContract;
    let customSubjectExchangeOrdersData: Bytes;
    let customZeroExOrderMakerTokenAmount: BigNumber;

    beforeEach(async () => {
      await exchangeHelper.deployAndAuthorizeZeroExExchangeWrapper(
        core,
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        SetTestUtils.ZERO_EX_TOKEN_ADDRESS,
        transferProxy
      );
      await exchangeHelper.deployAndAuthorizeKyberNetworkWrapper(
        core,
        kyberNetworkHelper.kyberNetworkProxy,
        transferProxy
      );

      const firstComponent = cUSDCInstance;
      const secondComponent = cDAIInstance;
      const firstComponentUnderlying = usdcInstance;
      const secondComponentUnderlying = daiInstance;

      // Include order for non cToken component
      const nonCTokenComponent = await erc20Helper.deployTokenAsync(zeroExOrderMaker);

      sendToken = customSendTokenUnderlying || await erc20Helper.deployTokenAsync(exchangeIssuanceCaller);
      const sendTokenComponent = customSendToken || sendToken;

      const componentTokens = [firstComponent, secondComponent, nonCTokenComponent, sendTokenComponent];
      setComponentUnit = ether(4);
      const componentAddresses = componentTokens.map(token => token.address);
      const componentUnits = componentTokens.map(token => setComponentUnit);
      naturalUnit = ether(2);

      setToken = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      await erc20Helper.approveTransfersAsync(
        [sendToken],
        transferProxy.address,
        exchangeIssuanceCaller
      );
      await erc20Helper.approveTransfersAsync(
        [secondComponentUnderlying, nonCTokenComponent],
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        zeroExOrderMaker
      );

      kyberTradeSourceTokenUtilized = ether(25);
      kyberTradeSourceTokenChange = new BigNumber(1000000);

      const zeroExTakerTokenQuantity = zeroExOrderTakerAssetAmount || ether(4);
      const kyberSourceTokenQuantity = kyberTradeSourceTokenUtilized.add(kyberTradeSourceTokenChange);
      // 2 0x orders, 1 kyber order, 1 direct issue
      totalSendToken = zeroExTakerTokenQuantity.mul(2).add(kyberSourceTokenQuantity);

      // Create issuance order, submitting ether(30) makerToken for ether(4) of the Set with 4 components
      exchangeIssueSetAddress = customExchangeIssueSetAddress || setToken.address;

      exchangeIssueQuantity = customExchangeIssueQuantity || ether(4);

      exchangeIssueSendTokenExchangeIds = customExchangeIssueSendTokenExchangeIds ||
        [
          SetUtils.EXCHANGES.KYBER,
          SetUtils.EXCHANGES.ZERO_EX,
          SetUtils.EXCHANGES.ZERO_EX,
        ];

      exchangeIssueSendTokens =
        customExchangeIssueSendTokens || [sendToken.address, sendToken.address, sendToken.address];
      exchangeIssueSendTokenAmounts = customExchangeIssueSendTokenAmounts ||
        [
          kyberSourceTokenQuantity,
          zeroExTakerTokenQuantity,
          zeroExTakerTokenQuantity,
        ];

      exchangeIssueReceiveTokens = customExchangeIssueReceiveTokens ||
        [
          firstComponent.address,
          secondComponent.address,
          nonCTokenComponent.address,
        ];

      exchangeIssueReceiveTokenAmounts =
        customExchangeIssueReceiveTokenAmounts || _.map(componentUnits.slice(0, 3), unit => unit
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

      // Create Kyber trade for the first component, using ether(25) sendToken. Conversion rate pre set on snapshot
      const maxDestinationQuantity = await compoundHelper.cTokenToUnderlying(
        exchangeIssueReceiveTokens[0],
        exchangeIssueReceiveTokenAmounts[0]
      );
      const componentTokenDecimals = (await firstComponentUnderlying.decimals.callAsync()).toNumber();
      const sourceTokenDecimals = (await sendToken.decimals.callAsync()).toNumber();
      kyberConversionRatePower = new BigNumber(10).pow(18 + sourceTokenDecimals - componentTokenDecimals);
      const minimumConversionRate = maxDestinationQuantity.div(kyberTradeSourceTokenUtilized)
                                                          .mul(kyberConversionRatePower)
                                                          .round();

      kyberTrade = {
        sourceToken: sendToken.address,
        destinationToken: firstComponentUnderlying.address,
        sourceTokenQuantity: kyberSourceTokenQuantity,
        minimumConversionRate: minimumConversionRate,
        maxDestinationQuantity: maxDestinationQuantity,
      } as KyberTrade;

      await kyberNetworkHelper.approveToReserve(
        firstComponentUnderlying,
        UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
        kyberReserveOperator,
      );

      await kyberNetworkHelper.setConversionRates(
        sendToken.address,
        firstComponentUnderlying.address,
        kyberTradeSourceTokenUtilized,
        maxDestinationQuantity,
      );

      // Create 0x order for the second component, using ether(4) sendToken as default
      zeroExOrderMakerTokenAmount = customZeroExOrderMakerTokenAmount ||
        await compoundHelper.cTokenToUnderlying(
          exchangeIssueReceiveTokens[1],
          exchangeIssueReceiveTokenAmounts[1]
        );
      zeroExOrderTakerAssetAmount = ether(4);
      zeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                      // senderAddress
        zeroExOrderMaker,                                  // makerAddress
        NULL_ADDRESS,                                      // takerAddress
        ZERO,                                              // makerFee
        ZERO,                                              // takerFee
        zeroExOrderMakerTokenAmount,                       // makerAssetAmount
        zeroExTakerTokenQuantity,                          // takerAssetAmount
        secondComponentUnderlying.address,                 // makerAssetAddress
        sendToken.address,                                 // takerAssetAddress
        SetUtils.generateSalt(),                           // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,             // exchangeAddress
        NULL_ADDRESS,                                      // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),             // expirationTimeSeconds
        zeroExOrderTakerAssetAmount,                       // amount of zeroExOrder to fill
      );

      // Create 0x order for the non cToken component, using ether(4) sendToken as default
      const nonCTokenZeroExOrderMakerTokenAmount = exchangeIssueReceiveTokenAmounts[2];
      const nonCTokenZeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                      // senderAddress
        zeroExOrderMaker,                                  // makerAddress
        NULL_ADDRESS,                                      // takerAddress
        ZERO,                                              // makerFee
        ZERO,                                              // takerFee
        nonCTokenZeroExOrderMakerTokenAmount,              // makerAssetAmount
        zeroExTakerTokenQuantity,                          // takerAssetAmount
        nonCTokenComponent.address,                        // makerAssetAddress
        sendToken.address,                                 // takerAssetAddress
        SetUtils.generateSalt(),                           // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,             // exchangeAddress
        NULL_ADDRESS,                                      // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),             // expirationTimeSeconds
        zeroExOrderTakerAssetAmount,                       // amount of zeroExOrder to fill
      );

      subjectExchangeOrdersData = customSubjectExchangeOrdersData ||
        setUtils.generateSerializedOrders(
          [zeroExOrder, kyberTrade, nonCTokenZeroExOrder]
        );
      subjectCaller = exchangeIssuanceCaller;
    });

    afterEach(async () => {
      exchangeIssueQuantity = undefined;
      exchangeIssueReceiveTokens = undefined;
      exchangeIssueReceiveTokenAmounts = undefined;
    });

    async function subject(): Promise<string> {
      return cTokenExchangeIssuanceModule.exchangeIssue.sendTransactionAsync(
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

    it('transfers the source token amount from the caller, and returns change from Kyber', async () => {
      const existingBalance = await sendToken.balanceOf.callAsync(exchangeIssuanceCaller);

      await subject();
      const nonExchangedSendToken = setComponentUnit.mul(exchangeIssueQuantity).div(naturalUnit);
      const expectedNewBalance = existingBalance.sub(totalSendToken)
                                                .sub(nonExchangedSendToken)
                                                .add(kyberTradeSourceTokenChange);
      const newBalance = await sendToken.balanceOf.callAsync(exchangeIssuanceCaller);

      await expect(newBalance).to.be.bignumber.equal(expectedNewBalance);
    });

    it('transfers the maker token amount from the maker to the 0x maker', async () => {
      const zeroExMakerPaymentTokenBalance = await sendToken.balanceOf.callAsync(zeroExOrderMaker);

      await subject();

      // Add both 0x order amounts to maker balance
      const expectedMakerPaymentTokenBalance =
        zeroExMakerPaymentTokenBalance.add(zeroExOrder.takerAssetAmount).add(zeroExOrder.takerAssetAmount);
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
        cTokenExchangeIssuanceModule.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when a non exchanged component is underlying of a cToken', async () => {
      before(async () => {
        customSendTokenUnderlying = await erc20Helper.deployTokenAsync(
          exchangeIssuanceCaller,
          18,
        );
        const nonExchangedComponentAddress =
          await compoundHelper.deployMockCDAI(customSendTokenUnderlying.address, contractDeployer);
        await compoundHelper.enableCToken(nonExchangedComponentAddress);
        await compoundHelper.setBorrowRate(nonExchangedComponentAddress, new BigNumber('29313252165'));
        customSendToken = await erc20Helper.getTokenInstanceAsync(nonExchangedComponentAddress);
      });

      beforeEach(async () => {
        await cTokenWhiteList.addPair.sendTransactionAsync(
          customSendToken.address,
          customSendTokenUnderlying.address,
          { gas: DEFAULT_GAS }
        );
      });

      after(async () => {
        customSendToken = undefined;
        customSendTokenUnderlying = undefined;
      });

      it('mints the correct quantity of the set for the sender', async () => {
        const existingBalance = await setToken.balanceOf.callAsync(exchangeIssuanceCaller);

        await subject();

        await assertTokenBalanceAsync(setToken, existingBalance.add(exchangeIssueQuantity), exchangeIssuanceCaller);
      });
    });

    describe('when a receiveToken is not a component of the Set', async () => {
      before(async () => {
        const firstComponentUnderlying = await erc20Helper.deployTokenAsync(
          contractDeployer,
          18,
        );
        const firstComponentAddress =
          await compoundHelper.deployMockCUSDC(firstComponentUnderlying.address, contractDeployer);
        await compoundHelper.enableCToken(firstComponentAddress);
        const firstComponent = await erc20Helper.getTokenInstanceAsync(firstComponentAddress);

        const secondComponentUnderlying = await erc20Helper.deployTokenAsync(
          contractDeployer,
          18,
        );
        const secondComponentAddress =
          await compoundHelper.deployMockCDAI(secondComponentUnderlying.address, contractDeployer);
        await compoundHelper.enableCToken(secondComponentAddress);
        const secondComponent = await erc20Helper.getTokenInstanceAsync(secondComponentAddress);

        const thirdComponent = await erc20Helper.deployTokenAsync(
          contractDeployer,
          18,
        );
        customExchangeIssueReceiveTokens = [
          firstComponent.address,
          secondComponent.address,
          thirdComponent.address,
        ];
      });

      after(async () => {
        customExchangeIssueReceiveTokens = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when an encoded exchangeId is invalid', async () => {
      before(async () => {
        customSubjectExchangeOrdersData = generateOrdersDataWithIncorrectExchange();
      });

      after(async () => {
        customSubjectExchangeOrdersData = generateOrdersDataWithIncorrectExchange();
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when quantity is zero', async () => {
      before(async () => {
        customExchangeIssueQuantity = ZERO;
      });

     after(async () => {
        customExchangeIssueQuantity = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the set was not created through core', async () => {
      before(async () => {
        customExchangeIssueSetAddress = NULL_ADDRESS;
      });

      after(async () => {
        customExchangeIssueSetAddress = undefined;
       });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the issue quantity is not a multiple of the natural unit of the set', async () => {
      before(async () => {
        customExchangeIssueQuantity = ether(3); // naturalUnit = ether(2);
      });

      after(async () => {
        customExchangeIssueQuantity = undefined;
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
        customZeroExOrderMakerTokenAmount = ether(1);
      });

      after(async () => {
        customZeroExOrderMakerTokenAmount = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the receive tokens and amount lengths differ', async () => {
      before(async () => {
        const firstComponentUnderlying = await erc20Helper.deployTokenAsync(
          contractDeployer,
          18,
        );
        const firstComponentAddress =
          await compoundHelper.deployMockCUSDC(firstComponentUnderlying.address, contractDeployer);
        await compoundHelper.enableCToken(firstComponentAddress);
        const firstComponent = await erc20Helper.getTokenInstanceAsync(firstComponentAddress);

        customExchangeIssueReceiveTokens = [firstComponent.address];
        customZeroExOrderMakerTokenAmount = ether(0.16);
      });

      after(async () => {
        customExchangeIssueReceiveTokens = undefined;
        customZeroExOrderMakerTokenAmount = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the send token exchange length differ from other send inputs', async () => {
      before(async () => {
        customExchangeIssueSendTokenExchangeIds = [SetUtils.EXCHANGES.ZERO_EX];
      });

      after(async () => {
        customExchangeIssueSendTokenExchangeIds = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the send token length differ from other send inputs', async () => {
      before(async () => {
        const sendToken = await erc20Helper.deployTokenAsync(zeroExOrderMaker);

        customExchangeIssueSendTokens = [sendToken.address];
      });

      after(async () => {
        customExchangeIssueSendTokens = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the send token amount length differ from other send inputs', async () => {
      before(async () => {
        customExchangeIssueSendTokenAmounts = [new BigNumber(1)];
      });

      after(async () => {
        customExchangeIssueSendTokenAmounts = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the send token exchange is not valid', async () => {
      before(async () => {
        customExchangeIssueSendTokenExchangeIds = [SetUtils.EXCHANGES.ZERO_EX, new BigNumber(5), new BigNumber(5)];
      });

      after(async () => {
        customExchangeIssueSendTokenExchangeIds = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the duplicate exchange header is provided', async () => {
      before(async () => {
        const firstOrder = setUtils.generateSerializedOrders([zeroExOrder]);
        const secondOrder = setUtils.generateSerializedOrders([zeroExOrder]).slice(2);

        customSubjectExchangeOrdersData = firstOrder.concat(secondOrder);
      });

      after(async () => {
        customSubjectExchangeOrdersData = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when a receive token amount is 0', async () => {
      before(async () => {
        customExchangeIssueReceiveTokenAmounts = [ZERO, ZERO, ZERO];
      });

      after(async () => {
        customExchangeIssueReceiveTokenAmounts = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the send token amounts is 0', async () => {
      before(async () => {
        customExchangeIssueSendTokenAmounts = [ZERO, ZERO];
      });

      after(async () => {
        customExchangeIssueSendTokenAmounts = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when minting a cToken is returning a nonzero response', async () => {
      before(async () => {
        badCUSDCInstance = await compoundHelper.deployCTokenWithInvalidMintAndRedeemAsync(contractDeployer);
      });

      after(async () => {
        badCUSDCInstance = undefined;
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
    let customNonExchangedComponent: StandardTokenMockContract;
    let customNonExchangedComponentUnderlying: StandardTokenMockContract;

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

    let customExchangeRedeemQuantity: BigNumber;
    let customExchangeRedeemSendTokens: Address[];
    let customExchangeRedeemSendTokenAmounts: BigNumber[];
    let customExchangeRedeemReceiveTokenAmounts: BigNumber[];
    let customSubjectExchangeOrdersData: Bytes;
    let customSourceTokenRateCalculationQuantity: BigNumber;
    let customMinimumConversionRate: BigNumber;
    let customZeroExOrderTakerTokenAmount: BigNumber;

    beforeEach(async () => {
      subjectCaller = exchangeIssuanceCaller;

      await exchangeHelper.deployAndAuthorizeZeroExExchangeWrapper(
        core,
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        SetTestUtils.ZERO_EX_TOKEN_ADDRESS,
        transferProxy
      );
      await exchangeHelper.deployAndAuthorizeKyberNetworkWrapper(
        core,
        kyberNetworkHelper.kyberNetworkProxy,
        transferProxy
      );

      const firstComponent = cUSDCInstance;
      const secondComponent = cDAIInstance;
      const firstComponentUnderlying = usdcInstance;
      const secondComponentUnderlying = daiInstance;

      const nonCTokenComponent = await erc20Helper.deployTokenAsync(contractDeployer);
      nonExchangedComponent = customNonExchangedComponent || await erc20Helper.deployTokenAsync(contractDeployer);
      receiveToken = await erc20Helper.deployTokenAsync(kyberReserveOperator);

      const componentTokens = [firstComponent, secondComponent, nonCTokenComponent, nonExchangedComponent];
      setComponentUnit = ether(4);
      const componentAddresses = componentTokens.map(token => token.address);
      const componentUnits = componentTokens.map(token => setComponentUnit);
      naturalUnit = ether(2);

      setToken = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      zeroExOrderMakerTokenAmount = ether(4);
      const kyberDestinationTokenQuantity = ether(3);
      // Total all 3 order amounts
      totalReceiveToken = zeroExOrderMakerTokenAmount.mul(2).add(kyberDestinationTokenQuantity);

      exchangeRedeemSetAddress = setToken.address;
      exchangeRedeemQuantity = customExchangeRedeemQuantity || ether(4);

      exchangeRedeemSendTokenExchanges =
        [SetUtils.EXCHANGES.KYBER, SetUtils.EXCHANGES.ZERO_EX, SetUtils.EXCHANGES.ZERO_EX];

      exchangeRedeemSendTokens =
        customExchangeRedeemSendTokens || [firstComponent.address, secondComponent.address, nonCTokenComponent.address];
      exchangeRedeemSendTokenAmounts =
        customExchangeRedeemSendTokenAmounts || _.map(componentUnits.slice(0, 3), unit => unit
          .mul(exchangeRedeemQuantity)
          .div(naturalUnit)
        );

      exchangeRedeemReceiveTokens = [receiveToken.address];

      exchangeRedeemReceiveTokenAmounts =
        customExchangeRedeemReceiveTokenAmounts || [totalReceiveToken];

      // Property:                Value                         | Property
      subjectExchangeIssuanceParams = {
        setAddress:             exchangeRedeemSetAddress,          // setAddress
        sendTokenExchangeIds:   exchangeRedeemSendTokenExchanges,  // sendTokenExchangeIds
        sendTokens:             exchangeRedeemSendTokens,          // sendToken
        sendTokenAmounts:       exchangeRedeemSendTokenAmounts,    // sendTokenAmount
        quantity:               exchangeRedeemQuantity,            // quantity
        receiveTokens:          exchangeRedeemReceiveTokens,       // receiveTokens
        receiveTokenAmounts:    exchangeRedeemReceiveTokenAmounts, // receiveTokenAmounts
      } as ExchangeIssuanceParams;

      // Create Kyber trade. Conversion rate pre set on snapshot
      const sourceTokenQuantity =
        await compoundHelper.cTokenToUnderlying(exchangeRedeemSendTokens[0], exchangeRedeemSendTokenAmounts[0]);
      const maxDestinationQuantity = kyberDestinationTokenQuantity;
      const destinationTokenDecimals = (await receiveToken.decimals.callAsync()).toNumber();
      const sourceTokenDecimals = (await firstComponentUnderlying.decimals.callAsync()).toNumber();
      kyberConversionRatePower = new BigNumber(10).pow(18 + sourceTokenDecimals - destinationTokenDecimals);

      const minimumConversionRate = customMinimumConversionRate || maxDestinationQuantity.div(sourceTokenQuantity)
                                                          .mul(kyberConversionRatePower)
                                                          .round();

      kyberTrade = {
        sourceToken: firstComponentUnderlying.address,
        destinationToken: receiveToken.address,
        sourceTokenQuantity: sourceTokenQuantity,
        minimumConversionRate: minimumConversionRate,
        maxDestinationQuantity: maxDestinationQuantity,
      } as KyberTrade;

      await kyberNetworkHelper.approveToReserve(
        receiveToken,
        UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
        kyberReserveOperator,
      );

      const sourceTokenRateQuantity = customSourceTokenRateCalculationQuantity || sourceTokenQuantity;

      await kyberNetworkHelper.setConversionRates(
        firstComponentUnderlying.address,
        receiveToken.address,
        sourceTokenRateQuantity,
        maxDestinationQuantity,
      );

      // Create 0x order for the second component, using ether(4) sendToken as default
      zeroExOrderTakerTokenAmount =
        await compoundHelper.cTokenToUnderlying(exchangeRedeemSendTokens[1], exchangeRedeemSendTokenAmounts[1]);
      zeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                      // senderAddress
        zeroExOrderMaker,                                  // makerAddress
        NULL_ADDRESS,                                      // takerAddress
        ZERO,                                              // makerFee
        ZERO,                                              // takerFee
        zeroExOrderMakerTokenAmount,                       // makerAssetAmount
        zeroExOrderTakerTokenAmount,                       // takerAssetAmount
        receiveToken.address,                              // makerAssetAddress
        secondComponentUnderlying.address,                 // takerAssetAddress
        SetUtils.generateSalt(),                           // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,             // exchangeAddress
        NULL_ADDRESS,                                      // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),             // expirationTimeSeconds
        zeroExOrderTakerTokenAmount,                       // amount of zeroExOrder to fill
      );

      // Create 0x order for the non cToken component, using ether(4) sendToken as default
      const nonCTokenZeroExOrderTakerTokenAmount = exchangeRedeemSendTokenAmounts[2];
      const nonCTokenZeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                      // senderAddress
        zeroExOrderMaker,                                  // makerAddress
        NULL_ADDRESS,                                      // takerAddress
        ZERO,                                              // makerFee
        ZERO,                                              // takerFee
        zeroExOrderMakerTokenAmount,                       // makerAssetAmount
        nonCTokenZeroExOrderTakerTokenAmount,              // takerAssetAmount
        receiveToken.address,                              // makerAssetAddress
        nonCTokenComponent.address,                        // takerAssetAddress
        SetUtils.generateSalt(),                           // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,             // exchangeAddress
        NULL_ADDRESS,                                      // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),             // expirationTimeSeconds
        nonCTokenZeroExOrderTakerTokenAmount,              // amount of zeroExOrder to fill
      );

      subjectExchangeOrdersData = customSubjectExchangeOrdersData
        || setUtils.generateSerializedOrders([zeroExOrder, kyberTrade, nonCTokenZeroExOrder]);

      // Approve the receive token to the 0x maker
      await erc20Helper.approveTransfersAsync(
        [receiveToken],
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        zeroExOrderMaker
      );

      // Fund the 0x maker with the receive token
      await erc20Helper.transferTokenAsync(
        receiveToken,
        zeroExOrderMaker,
        zeroExOrderMakerTokenAmount.mul(2),
        kyberReserveOperator,
      );

      // Fund the subject caller with the underlying of the send token
      await erc20Helper.transferTokenAsync(
        firstComponentUnderlying,
        contractDeployer,
        sourceTokenRateQuantity,
        kyberReserveOperator,
      );

      const zeroExComponentQuantity = customZeroExOrderTakerTokenAmount || zeroExOrderTakerTokenAmount;

      // Fund the subject caller with the underlying of the send token
      await erc20Helper.transferTokenAsync(
        secondComponentUnderlying,
        contractDeployer,
        zeroExComponentQuantity,
        zeroExOrderMaker,
      );

      // Mint cTokens from underlying for the send tokens
      await erc20Helper.approveTransfersAsync([firstComponentUnderlying], firstComponent.address);
      await erc20Helper.approveTransfersAsync([secondComponentUnderlying], secondComponent.address);
      await compoundHelper.mintCToken(
        firstComponent.address,
        sourceTokenRateQuantity
      );
      await compoundHelper.mintCToken(
        secondComponent.address,
        zeroExComponentQuantity
      );

      await erc20Helper.approveTransfersAsync(
        [firstComponent, secondComponent, nonCTokenComponent, nonExchangedComponent],
        transferProxy.address,
        contractDeployer
      );

      // Issue the Set and transfer to the caller
      await coreHelper.issueSetTokenAsync(
        core,
        setToken.address,
        exchangeRedeemQuantity
      );

      await erc20Helper.transferTokenAsync(
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
      return cTokenExchangeIssuanceModule.exchangeRedeem.sendTransactionAsync(
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

    it('increments the correct amount of received token', async () => {
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
        cTokenExchangeIssuanceModule.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when a non exchanged component is underlying of a cToken', async () => {
      before(async () => {
        customNonExchangedComponentUnderlying = await erc20Helper.deployTokenAsync(
          contractDeployer,
          18,
        );
        const nonExchangedComponentAddress =
          await compoundHelper.deployMockCDAI(customNonExchangedComponentUnderlying.address, contractDeployer);
        await compoundHelper.enableCToken(nonExchangedComponentAddress);
        await compoundHelper.setBorrowRate(nonExchangedComponentAddress, new BigNumber('29313252165'));
        customNonExchangedComponent = await erc20Helper.getTokenInstanceAsync(nonExchangedComponentAddress);

        await erc20Helper.approveTransfersAsync(
          [customNonExchangedComponentUnderlying],
          customNonExchangedComponent.address
        );
        await compoundHelper.mintCToken(
          customNonExchangedComponent.address,
          DEPLOYED_TOKEN_QUANTITY,
        );
      });

      beforeEach(async () => {
        await cTokenWhiteList.addPair.sendTransactionAsync(
          customNonExchangedComponent.address,
          customNonExchangedComponentUnderlying.address,
          { gas: DEFAULT_GAS }
        );
      });

      after(async () => {
        customNonExchangedComponent = undefined;
        customNonExchangedComponentUnderlying = undefined;
      });

      it('returns the correct quantity of non-exchanged underlying tokens', async () => {
        const existingBalance = await customNonExchangedComponentUnderlying.balanceOf.callAsync(exchangeIssuanceCaller);
        await subject();

        const incrementQuantity = setComponentUnit.mul(exchangeRedeemQuantity).div(naturalUnit);
        const underlyingIncrementQuantity =
          await compoundHelper.cTokenToUnderlying(nonExchangedComponent.address, incrementQuantity);
        const expectedNewBalance = existingBalance.add(underlyingIncrementQuantity);
        const newBalance = await customNonExchangedComponentUnderlying.balanceOf.callAsync(exchangeIssuanceCaller);

        await expect(newBalance).to.be.bignumber.equal(expectedNewBalance);
      });
    });

    describe('when a sendToken is not a component of the Set', async () => {
      before(async () => {
        const firstComponentUnderlying = await erc20Helper.deployTokenAsync(
          contractDeployer,
          18,
        );
        const firstComponentAddress =
          await compoundHelper.deployMockCUSDC(firstComponentUnderlying.address, contractDeployer);
        await compoundHelper.enableCToken(firstComponentAddress);
        const firstComponent = await erc20Helper.getTokenInstanceAsync(firstComponentAddress);

        const secondComponentUnderlying = await erc20Helper.deployTokenAsync(
          contractDeployer,
          18,
        );
        const secondComponentAddress =
          await compoundHelper.deployMockCDAI(secondComponentUnderlying.address, contractDeployer);
        await compoundHelper.enableCToken(secondComponentAddress);
        const secondComponent = await erc20Helper.getTokenInstanceAsync(secondComponentAddress);

        const thirdComponent = await erc20Helper.deployTokenAsync(
          contractDeployer,
          18,
        );

        customExchangeRedeemSendTokens = [firstComponent.address, secondComponent.address, thirdComponent.address];
      });

      after(async () => {
        customExchangeRedeemSendTokens = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when an encoded exchangeId is invalid', async () => {
      before(async () => {
        customSubjectExchangeOrdersData = generateOrdersDataWithIncorrectExchange();
      });

      after(async () => {
        customSubjectExchangeOrdersData = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when quantity is zero', async () => {
      before(async () => {
        customExchangeRedeemQuantity = new BigNumber(0);
        customSourceTokenRateCalculationQuantity = ether(1);
        customMinimumConversionRate = ether(1);
      });

     after(async () => {
        customExchangeRedeemQuantity = undefined;
        customSourceTokenRateCalculationQuantity = undefined;
        customMinimumConversionRate = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when send quantities is zero', async () => {
      before(async () => {
        customExchangeRedeemSendTokenAmounts = [ZERO, ZERO, ZERO];
        customSourceTokenRateCalculationQuantity = ether(1);
        customZeroExOrderTakerTokenAmount = ether(1);
        customMinimumConversionRate = ether(1);
      });

     after(async () => {
        customExchangeRedeemSendTokenAmounts = undefined;
        customSourceTokenRateCalculationQuantity = undefined;
        customZeroExOrderTakerTokenAmount = undefined;
        customMinimumConversionRate = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when there are fewer receive tokens than expected', async () => {
      before(async () => {
        customExchangeRedeemReceiveTokenAmounts = [totalReceiveToken.times(3)];
      });

     after(async () => {
        customExchangeRedeemReceiveTokenAmounts = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when redeeming a cToken is returning a nonzero response', async () => {
      before(async () => {
        badCUSDCInstance = await compoundHelper.deployCTokenWithInvalidMintAndRedeemAsync(contractDeployer);
      });

      after(async () => {
        badCUSDCInstance = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
