require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address, Bytes, ExchangeIssuanceParams, KyberTrade, ZeroExSignedFillOrder } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  AddressToAddressWhiteListContract,
  CoreContract,
  CTokenExchangeIssuanceModuleContract,
  RebalancingSetCTokenExchangeIssuanceModuleContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract,
  WethMockContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ether } from '@utils/units';
import {
  LogPayableExchangeIssue,
  LogPayableExchangeRedeem,
} from '@utils/contract_logs/rebalancingSetExchangeIssuanceModule';
import { expectRevertError } from '@utils/tokenAssertions';
import { getWeb3, getGasUsageInEth } from '@utils/web3Helper';
import {
  DEFAULT_GAS,
  DEFAULT_REBALANCING_NATURAL_UNIT,
  DEFAULT_UNIT_SHARES,
  DEPLOYED_TOKEN_QUANTITY,
  ONE_DAY_IN_SECONDS,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
} from '@utils/constants';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { CompoundHelper } from '@utils/helpers/compoundHelper';
import { ExchangeHelper } from '@utils/helpers/exchangeHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { RebalancingHelper } from '@utils/helpers/rebalancingHelper';
import { KyberNetworkHelper } from '@utils/helpers/kyberNetworkHelper';
import { UtilsHelper } from '@utils/helpers/utilsHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);

const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const setUtils = new SetUtils(web3);
const { NULL_ADDRESS, ZERO } = SetUtils.CONSTANTS;

contract('RebalancingSetExchangeIssuanceModule', accounts => {
  const [
    ownerAccount,
    kyberReserveOperator,
    tokenPurchaser,
    zeroExOrderMaker,
    whitelist,
  ] = accounts;

  let core: CoreContract;
  let cTokenExchangeIssuanceModule: CTokenExchangeIssuanceModuleContract;
  let cTokenWhiteList: AddressToAddressWhiteListContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let rebalancingSetTokenFactory: RebalancingSetTokenFactoryContract;
  let setTokenFactory: SetTokenFactoryContract;
  let rebalancingSetCTokenExchangeIssuanceModule: RebalancingSetCTokenExchangeIssuanceModuleContract;

  let cUSDCInstance: StandardTokenMockContract;
  let usdcInstance: StandardTokenMockContract;
  let cDAIInstance: StandardTokenMockContract;
  let daiInstance: StandardTokenMockContract;
  let weth: WethMockContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const compoundHelper = new CompoundHelper(ownerAccount);
  const erc20Helper = new ERC20Helper(ownerAccount);
  const exchangeHelper = new ExchangeHelper(ownerAccount);
  const rebalancingHelper = new RebalancingHelper(
    ownerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );
  const kyberNetworkHelper = new KyberNetworkHelper();
  const utilsHelper = new UtilsHelper(ownerAccount);

  before(async () => {
    ABIDecoder.addABI(CoreContract.getAbi());
    ABIDecoder.addABI(RebalancingSetCTokenExchangeIssuanceModuleContract.getAbi());

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    core = await coreHelper.deployCoreAsync(transferProxy, vault);
    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(core.address);
    await coreHelper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

    rebalancingSetTokenFactory = await coreHelper.deployRebalancingSetTokenFactoryAsync(core.address, whitelist);
    await coreHelper.addFactoryAsync(core, rebalancingSetTokenFactory);

    // Set up Compound USDC token
    usdcInstance = await erc20Helper.deployTokenAsync(
      ownerAccount,
      18,
    );
    const cUSDCAddress = await compoundHelper.deployMockCUSDC(usdcInstance.address, ownerAccount);
    await compoundHelper.enableCToken(cUSDCAddress);
    // Set the Borrow Rate
    await compoundHelper.setBorrowRate(cUSDCAddress, new BigNumber('43084603999'));

    cUSDCInstance = await erc20Helper.getTokenInstanceAsync(cUSDCAddress);

    // Set up Compound DAI token
    daiInstance = await erc20Helper.deployTokenAsync(
      ownerAccount,
      18,
    );
    const cDAIAddress = await compoundHelper.deployMockCDAI(daiInstance.address, ownerAccount);
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

    weth = await erc20Helper.deployWrappedEtherAsync(ownerAccount);

    rebalancingSetCTokenExchangeIssuanceModule = await coreHelper.deployRebalancingSetCTokenExchangeIssuanceModuleAsync(
      core.address,
      transferProxy.address,
      cTokenExchangeIssuanceModule.address,
      weth.address,
      vault.address,
      cTokenWhiteList.address,
    );
    await coreHelper.addModuleAsync(core, rebalancingSetCTokenExchangeIssuanceModule.address);

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
  });

  after(async () => {
    ABIDecoder.removeABI(CoreContract.getAbi());
    ABIDecoder.removeABI(RebalancingSetCTokenExchangeIssuanceModuleContract.getAbi());
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    await kyberNetworkHelper.setup();
    await kyberNetworkHelper.fundReserveWithEth(
      whitelist,
      ether(90),
    );
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    async function subject(): Promise<RebalancingSetCTokenExchangeIssuanceModuleContract> {
      return await coreHelper.deployRebalancingSetCTokenExchangeIssuanceModuleAsync(
        core.address,
        transferProxy.address,
        cTokenExchangeIssuanceModule.address,
        weth.address,
        vault.address,
        cTokenWhiteList.address,
      );
    }

    it('should contain the correct address of the transfer proxy', async () => {
      const rebalancingSetCTokenExchangeIssuanceModuleContract = await subject();

      const proxyAddress = await rebalancingSetCTokenExchangeIssuanceModuleContract.transferProxyInstance.callAsync();

      expect(proxyAddress).to.equal(transferProxy.address);
    });

    it('should contain the correct address of Core', async () => {
      const rebalancingSetCTokenExchangeIssuanceModuleContract = await subject();

      const coreAddress = await rebalancingSetCTokenExchangeIssuanceModuleContract.coreInstance.callAsync();

      expect(coreAddress).to.equal(core.address);
    });

    it('should contain the correct address of Vault', async () => {
      const rebalancingSetCTokenExchangeIssuanceModuleContract = await subject();

      const vaultAddress = await rebalancingSetCTokenExchangeIssuanceModuleContract.vaultInstance.callAsync();

      expect(vaultAddress).to.equal(vault.address);
    });

    it('should contain the correct address of Wrapped Ether', async () => {
      const rebalancingSetCTokenExchangeIssuanceModuleContract = await subject();

      const wethAddress = await rebalancingSetCTokenExchangeIssuanceModuleContract.wethInstance.callAsync();

      expect(wethAddress).to.equal(weth.address);
    });

    it('should contain the correct address of the cTokenExchangeIssuanceModule', async () => {
      const rebalancingSetCTokenExchangeIssuanceModuleContract = await subject();

      const cTokenExchangeIssuanceModuleAddress =
        await rebalancingSetCTokenExchangeIssuanceModuleContract.exchangeIssuanceModuleInstance.callAsync();

      expect(cTokenExchangeIssuanceModuleAddress).to.equal(cTokenExchangeIssuanceModule.address);
    });

    it('should contain the correct address of the cToken WhiteList', async () => {
      const rebalancingSetCTokenExchangeIssuanceModuleContract = await subject();

      const cTokenWhiteListAddress =
        await rebalancingSetCTokenExchangeIssuanceModuleContract.cTokenWhiteList.callAsync();

      expect(cTokenWhiteListAddress).to.equal(cTokenWhiteList.address);
    });
  });

  describe('#issueRebalancingSetWithEther', async () => {
    let subjectRebalancingSetAddress: Address;
    let subjectRebalancingSetQuantity: BigNumber;
    let subjectExchangeIssuanceParams: ExchangeIssuanceParams;
    let subjectExchangeOrdersData: Bytes;
    let subjectKeepChangeInVault: boolean;
    let subjectEtherValue: string;
    let subjectCaller: Address;

    // ----------------------------------------------------------------------
    // Component and Rebalancing Set
    // ----------------------------------------------------------------------
    let baseSetComponent: StandardTokenMockContract;
    let baseSetComponent2: StandardTokenMockContract;
    let baseSetComponent3: StandardTokenMockContract;
    let baseSetUnderlyingComponent: StandardTokenMockContract;
    let baseSetUnderlyingComponent2: StandardTokenMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    let customComponents: Address[];
    let customComponentUnits: BigNumber[];
    let customBaseSetComponent: StandardTokenMockContract;
    let customBaseSetComponent2: StandardTokenMockContract;
    let customBaseSetComponent3: StandardTokenMockContract;
    let customBaseSetUnderlying: StandardTokenMockContract;
    let customBaseSetUnderlying2: StandardTokenMockContract;

    // ----------------------------------------------------------------------
    // Issuance Details
    // ----------------------------------------------------------------------
    let rebalancingSetIssueQuantity: BigNumber;
    let baseSetIssueQuantity: BigNumber;

    let wethRequiredToIssueBaseSet: BigNumber;

    let customWethRequiredToIssueBaseSet: BigNumber;
    let customRebalancingSetIssueQuantity: BigNumber;

    // ----------------------------------------------------------------------
    // Payment / Send Token Details
    // ----------------------------------------------------------------------
    let totalEther: BigNumber;

    let zeroExSendTokenQuantity: BigNumber;
    let kyberSendTokenQuantity: BigNumber;
    let exchangeIssuanceSendTokenQuantity: BigNumber;

    let customExchangeIssuanceSendTokenQuantity: BigNumber;
    let customWethUsedInZeroExTrade: BigNumber;
    let customZeroExSendTokenQuantity: BigNumber;

    // ----------------------------------------------------------------------
    // Exchange Issuance Variables
    // ----------------------------------------------------------------------
    let exchangeIssueSetAddress: Address;
    let exchangeIssueQuantity: BigNumber;
    let exchangeIssueSendTokenExchangeIds: BigNumber[];
    let exchangeIssueSendTokens: Address[];
    let exchangeIssueSendTokenAmounts: BigNumber[];
    let exchangeIssueReceiveTokens: Address[];
    let exchangeIssueReceiveTokenAmounts: BigNumber[];

    let customExchangeIssuanceBaseSetIssueQuantity: BigNumber;

    // ----------------------------------------------------------------------
    // 0x Order Variables
    // ----------------------------------------------------------------------
    let zeroExOrder: ZeroExSignedFillOrder;
    let zeroExMakerAssetAmount: BigNumber;
    let zeroExTakerAssetAmount: BigNumber;

    let customZeroExReceiveTokenAmount: BigNumber;

    // ----------------------------------------------------------------------
    // Kyber Trade Variables
    // ----------------------------------------------------------------------
    let kyberTrade: KyberTrade;
    let kyberConversionRatePower: BigNumber;

    beforeEach(async () => {

      // ----------------------------------------------------------------------
      // Component and Rebalancing Set Deployment
      // ----------------------------------------------------------------------

      // Create non-wrapped Ether component tokens
      baseSetComponent = customBaseSetComponent || cUSDCInstance;
      baseSetUnderlyingComponent = customBaseSetUnderlying || usdcInstance;
      baseSetComponent2 = customBaseSetComponent2 || cDAIInstance;
      baseSetUnderlyingComponent2 = customBaseSetUnderlying2 || daiInstance;
      baseSetComponent3 = customBaseSetComponent3 || await erc20Helper.deployTokenAsync(ownerAccount);

      // Create the Set (default is 4 components)
      const componentAddresses = customComponents || [
        baseSetComponent.address, baseSetComponent2.address, baseSetComponent3.address, weth.address,
      ];
      const componentUnits = customComponentUnits || [
        new BigNumber(10 ** 18), new BigNumber(10 ** 18), new BigNumber(10 ** 18), new BigNumber(10 ** 18),
      ];
      baseSetNaturalUnit = new BigNumber(10 ** 17);
      baseSetToken = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        baseSetNaturalUnit,
      );

      // Create the Rebalancing Set
      rebalancingUnitShares = new BigNumber(10 ** 18);
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        core,
        rebalancingSetTokenFactory.address,
        ownerAccount,
        baseSetToken.address,
        ONE_DAY_IN_SECONDS,
        rebalancingUnitShares,
      );

      // ----------------------------------------------------------------------
      // Issuance Details
      // ----------------------------------------------------------------------

      baseSetIssueQuantity = new BigNumber(10 ** 18);

      const impliedRebalancingSetQuantityFromBaseSet = baseSetIssueQuantity
        .mul(DEFAULT_REBALANCING_NATURAL_UNIT)
        .div(rebalancingUnitShares);

      rebalancingSetIssueQuantity = customRebalancingSetIssueQuantity || impliedRebalancingSetQuantityFromBaseSet;

      wethRequiredToIssueBaseSet = customWethRequiredToIssueBaseSet ||
        baseSetIssueQuantity.mul(componentUnits[3]).div(baseSetNaturalUnit);

      // ----------------------------------------------------------------------
      // Payment / Send Token Details
      // ----------------------------------------------------------------------

      kyberSendTokenQuantity = new BigNumber(10 ** 18);
      zeroExSendTokenQuantity = customZeroExSendTokenQuantity || new BigNumber(10 ** 18);

      // 2 0x orders and 1 Kyber order
      exchangeIssuanceSendTokenQuantity = customExchangeIssuanceSendTokenQuantity ||
        kyberSendTokenQuantity.plus(zeroExSendTokenQuantity).plus(zeroExSendTokenQuantity);

      totalEther = exchangeIssuanceSendTokenQuantity.plus(wethRequiredToIssueBaseSet);

      // ----------------------------------------------------------------------
      // Exchange Issuance Set up
      // ----------------------------------------------------------------------

      // Generate exchange issue data
      exchangeIssueSetAddress = baseSetToken.address;
      exchangeIssueQuantity = customExchangeIssuanceBaseSetIssueQuantity || baseSetIssueQuantity;
      exchangeIssueSendTokenExchangeIds =
        [SetUtils.EXCHANGES.ZERO_EX, SetUtils.EXCHANGES.KYBER, SetUtils.EXCHANGES.ZERO_EX];
      exchangeIssueSendTokens = [weth.address, weth.address, weth.address];
      exchangeIssueSendTokenAmounts = [zeroExSendTokenQuantity, kyberSendTokenQuantity, zeroExSendTokenQuantity];

      const zeroExReceiveTokenAmount = componentUnits[0].mul(exchangeIssueQuantity).div(baseSetNaturalUnit);
      const kyberReceiveTokenAmount = componentUnits[1].mul(exchangeIssueQuantity).div(baseSetNaturalUnit);
      const nonCTokenZeroExReceiveTokenAmount = componentUnits[2].mul(exchangeIssueQuantity).div(baseSetNaturalUnit);

      exchangeIssueReceiveTokens = [
        componentAddresses[0],
        componentAddresses[1],
        componentAddresses[2],
      ];
      exchangeIssueReceiveTokenAmounts = [
        zeroExReceiveTokenAmount,
        kyberReceiveTokenAmount,
        nonCTokenZeroExReceiveTokenAmount,
      ];

      const exchangeIssuanceParams = {
        setAddress: 			      exchangeIssueSetAddress,
        sendTokenExchangeIds:   exchangeIssueSendTokenExchangeIds,
        sendTokens:             exchangeIssueSendTokens,
        sendTokenAmounts:       exchangeIssueSendTokenAmounts,
        quantity:               exchangeIssueQuantity,
        receiveTokens:       	  exchangeIssueReceiveTokens,
        receiveTokenAmounts: 	  exchangeIssueReceiveTokenAmounts,
      };

      // ----------------------------------------------------------------------
      // cToken 0x Order Set up
      // ----------------------------------------------------------------------

      const makerAsset = baseSetUnderlyingComponent.address;
      const takerAsset = exchangeIssueSendTokens[0];

      zeroExMakerAssetAmount = customZeroExReceiveTokenAmount ||
        await compoundHelper.cTokenToUnderlying(
          exchangeIssueReceiveTokens[0],
          exchangeIssueReceiveTokenAmounts[0]
        );
      zeroExTakerAssetAmount = customWethUsedInZeroExTrade || exchangeIssueSendTokenAmounts[0];

      zeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                                         // senderAddress
        zeroExOrderMaker,                                                     // makerAddress
        NULL_ADDRESS,                                                         // takerAddress
        ZERO,                                                                 // makerFee
        ZERO,                                                                 // takerFee
        zeroExMakerAssetAmount,                                               // makerAssetAmount
        zeroExTakerAssetAmount,                                               // takerAssetAmount
        makerAsset,               	                                          // makerAssetAddress
        takerAsset,                                                           // takerAssetAddress
        SetUtils.generateSalt(),                                              // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,                                // exchangeAddress
        NULL_ADDRESS,                                                         // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),                                // expirationTimeSeconds
        zeroExTakerAssetAmount,                                               // amount of zeroExOrder to fill
      );

      await erc20Helper.approveTransfersAsync(
        [baseSetUnderlyingComponent],
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        zeroExOrderMaker
      );

      // Fund zero Ex Order Maker
      await erc20Helper.transferTokenAsync(
        baseSetUnderlyingComponent,
        zeroExOrderMaker,
        zeroExMakerAssetAmount,
        ownerAccount,
      );

      // ----------------------------------------------------------------------
      // Kyber Trade Set up
      // ----------------------------------------------------------------------
      const maxDestinationQuantity = await compoundHelper.cTokenToUnderlying(
        exchangeIssueReceiveTokens[1],
        exchangeIssueReceiveTokenAmounts[1]
      );
      const componentTokenDecimals = (await baseSetUnderlyingComponent2.decimals.callAsync()).toNumber();
      const sourceTokenDecimals = (await weth.decimals.callAsync()).toNumber();
      kyberConversionRatePower = new BigNumber(10).pow(18 + sourceTokenDecimals - componentTokenDecimals);
      const minimumConversionRate = maxDestinationQuantity.div(kyberSendTokenQuantity)
                                                          .mul(kyberConversionRatePower)
                                                          .round();

      kyberTrade = {
        sourceToken: weth.address,
        destinationToken: baseSetUnderlyingComponent2.address,
        sourceTokenQuantity: kyberSendTokenQuantity,
        minimumConversionRate: minimumConversionRate,
        maxDestinationQuantity: maxDestinationQuantity,
      } as KyberTrade;

      await kyberNetworkHelper.approveToReserve(
        baseSetUnderlyingComponent2,
        UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
        kyberReserveOperator,
      );

      await kyberNetworkHelper.setConversionRates(
        weth.address,
        baseSetUnderlyingComponent2.address,
        kyberSendTokenQuantity,
        maxDestinationQuantity,
      );

      // Fund Kyber Reserve Operator
      await erc20Helper.transferTokenAsync(
        baseSetUnderlyingComponent2,
        kyberReserveOperator,
        kyberTrade.maxDestinationQuantity,
        ownerAccount,
      );

      // ----------------------------------------------------------------------
      // Non cToken 0x Order Set up
      // ----------------------------------------------------------------------

      const nonCTokenMakerAsset = exchangeIssueReceiveTokens[2];
      const nonCTokenTakerAsset = exchangeIssueSendTokens[2];

      const nonCTokenZeroExMakerAssetAmount = customZeroExReceiveTokenAmount || exchangeIssueReceiveTokenAmounts[2];
      const nonCTokenZeroExTakerAssetAmount = exchangeIssueSendTokenAmounts[2];

      const nonCTokenZeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                                         // senderAddress
        zeroExOrderMaker,                                                     // makerAddress
        NULL_ADDRESS,                                                         // takerAddress
        ZERO,                                                                 // makerFee
        ZERO,                                                                 // takerFee
        nonCTokenZeroExMakerAssetAmount,                                      // makerAssetAmount
        nonCTokenZeroExTakerAssetAmount,                                      // takerAssetAmount
        nonCTokenMakerAsset,                                                  // makerAssetAddress
        nonCTokenTakerAsset,                                                  // takerAssetAddress
        SetUtils.generateSalt(),                                              // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,                                // exchangeAddress
        NULL_ADDRESS,                                                         // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),                                // expirationTimeSeconds
        nonCTokenZeroExTakerAssetAmount,                                      // amount of zeroExOrder to fill
      );

      await erc20Helper.approveTransfersAsync(
        [baseSetComponent3],
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        zeroExOrderMaker
      );

      // Fund zero Ex Order Maker
      await erc20Helper.transferTokenAsync(
        baseSetComponent3,
        zeroExOrderMaker,
        nonCTokenZeroExMakerAssetAmount,
        ownerAccount,
      );

      // ----------------------------------------------------------------------
      // Subject Parameter Definitions
      // ----------------------------------------------------------------------

      subjectRebalancingSetAddress = rebalancingSetToken.address;
      subjectRebalancingSetQuantity = rebalancingSetIssueQuantity;
      subjectExchangeIssuanceParams = exchangeIssuanceParams;
      subjectExchangeOrdersData = setUtils.generateSerializedOrders([zeroExOrder, kyberTrade, nonCTokenZeroExOrder]);
      subjectKeepChangeInVault = false;
      subjectCaller = tokenPurchaser;
      subjectEtherValue = totalEther.toString();
    });

    afterEach(async () => {
      customExchangeIssuanceSendTokenQuantity = undefined;
      customExchangeIssuanceBaseSetIssueQuantity = undefined;
      customComponents = undefined;
      customComponentUnits = undefined;
    });

    async function subject(): Promise<string> {
      return rebalancingSetCTokenExchangeIssuanceModule.issueRebalancingSetWithEther.sendTransactionAsync(
        subjectRebalancingSetAddress,
        subjectRebalancingSetQuantity,
        subjectExchangeIssuanceParams,
        subjectExchangeOrdersData,
        subjectKeepChangeInVault,
        { from: subjectCaller, gas: DEFAULT_GAS, value: subjectEtherValue },
      );
    }

    it('issues the rebalancing Set to the caller', async () => {
      const previousRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      const expectedRBSetTokenBalance = previousRBSetTokenBalance.add(rebalancingSetIssueQuantity);

      await subject();

      const currentRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      expect(expectedRBSetTokenBalance).to.bignumber.equal(currentRBSetTokenBalance);
    });

    it('reduces the callers Ether balance by the expected amount', async () => {
      const previousEthBalance: BigNumber = new BigNumber(await web3.eth.getBalance(subjectCaller));

      const txHash = await subject();
      const totalGasInEth = await getGasUsageInEth(txHash);
      const expectedEthBalance = previousEthBalance
                                  .sub(exchangeIssuanceSendTokenQuantity)
                                  .sub(wethRequiredToIssueBaseSet)
                                  .sub(totalGasInEth);

      const currentEthBalance = await web3.eth.getBalance(subjectCaller);
      expect(expectedEthBalance).to.bignumber.equal(currentEthBalance);
    });

    it('emits correct LogPayableExchangeIssue event', async () => {
      const expectedReturnedEth = new BigNumber(0);

      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = LogPayableExchangeIssue(
        subjectRebalancingSetAddress,
        subjectCaller,
        weth.address,
        subjectRebalancingSetQuantity,
        expectedReturnedEth,
        rebalancingSetCTokenExchangeIssuanceModule.address,
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when more exchangeIssuance send token is sent than required by trades', async () => {
      const excessEth = new BigNumber(10 ** 10);

      describe('', async () => {
        before(async () => {
          customExchangeIssuanceSendTokenQuantity = new BigNumber(3).mul(10 ** 18).plus(excessEth);
        });

        it('refunds the caller the appropriate amount of eth', async () => {
          const previousEthBalance: BigNumber = new BigNumber(await web3.eth.getBalance(subjectCaller));

          const txHash = await subject();
          const totalGasInEth = await getGasUsageInEth(txHash);
          const expectedEthBalance = previousEthBalance
                                      .sub(exchangeIssuanceSendTokenQuantity)
                                      .add(excessEth)
                                      .sub(wethRequiredToIssueBaseSet)
                                      .sub(totalGasInEth);

          const currentEthBalance = await web3.eth.getBalance(subjectCaller);
          expect(currentEthBalance).to.bignumber.equal(expectedEthBalance);
        });
      });

      describe('', async () => {
        before(async () => {
          customExchangeIssuanceSendTokenQuantity = new BigNumber(3).mul(10 ** 18).plus(excessEth);
        });

        it('emits log with correct refund quantity', async () => {
          const txHash = await subject();
          const expectedEthBalance = excessEth;

          const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
          const expectedLogs = LogPayableExchangeIssue(
            subjectRebalancingSetAddress,
            subjectCaller,
            weth.address,
            subjectRebalancingSetQuantity,
            expectedEthBalance,
            rebalancingSetCTokenExchangeIssuanceModule.address,
          );

          await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
        });
      });
    });

    describe('when zeroEx sendToken amount is greater than amount needed to execute 0x trade', async () => {
      before(async () => {
        customWethUsedInZeroExTrade = new BigNumber(10 ** 18);
        customZeroExSendTokenQuantity = new BigNumber(10 ** 18).times(3);
      });

      it('refunds the unused Ether from the 0x trade', async () => {
        const previousEthBalance: BigNumber = new BigNumber(await web3.eth.getBalance(subjectCaller));

        const txHash = await subject();
        const totalGasInEth = await getGasUsageInEth(txHash);
        const expectedEthBalance = previousEthBalance
                                    .sub(customWethUsedInZeroExTrade)
                                    .sub(kyberSendTokenQuantity)
                                    .sub(zeroExSendTokenQuantity)
                                    .sub(wethRequiredToIssueBaseSet)
                                    .sub(totalGasInEth);

        const currentEthBalance = await web3.eth.getBalance(subjectCaller);
        expect(currentEthBalance).to.bignumber.equal(expectedEthBalance);
      });
    });

    describe('when the base Set quantity minted is greater than required for Rebalancing Set issuance', async () => {
      const excessBaseSetIssued = new BigNumber(10 ** 17);

      describe('and keepChangeInVault is false', async () => {
        before(async () => {
          customRebalancingSetIssueQuantity = DEFAULT_REBALANCING_NATURAL_UNIT;
          customExchangeIssuanceBaseSetIssueQuantity = new BigNumber(10 ** 18).plus(excessBaseSetIssued);
        });

        it('refunds the caller the excess base Set', async () => {
          await subject();

          const ownerBalance = await baseSetToken.balanceOf.callAsync(subjectCaller);

          expect(ownerBalance).to.bignumber.equal(excessBaseSetIssued);
        });
      });

      describe('and keepChangeInVault is true', async () => {
        beforeEach(async () => {
          subjectKeepChangeInVault = true;
        });

        before(async () => {
          customRebalancingSetIssueQuantity = DEFAULT_REBALANCING_NATURAL_UNIT;
          customExchangeIssuanceBaseSetIssueQuantity = new BigNumber(10 ** 18).plus(excessBaseSetIssued);
        });

        it('sends to the Vault the excess base Set with ownership attributed to the caller', async () => {
          await subject();

          const ownerBalance = await vault.getOwnerBalance.callAsync(
            baseSetToken.address,
            subjectCaller
          );

          expect(ownerBalance).to.bignumber.equal(excessBaseSetIssued);
        });
      });
    });

    describe('when the amount of receive token from trade exceeds receive token amount', async () => {
      before(async () => {
        // Amount exceeds any calculable quantity of component token
        customZeroExReceiveTokenAmount = ether(11);
      });

      it('returns the user the leftover underlying token amount', async () => {
        const previousBalance = await baseSetUnderlyingComponent.balanceOf.callAsync(subjectCaller);
        await subject();

        const underlyingMakerAssetAmount = await compoundHelper.cTokenToUnderlying(
          baseSetComponent.address,
          exchangeIssueReceiveTokenAmounts[0]
        );
        const expectedOwnerBalance = previousBalance
                                       .add(customZeroExReceiveTokenAmount)
                                       .sub(underlyingMakerAssetAmount);
        const ownerBalance = await baseSetUnderlyingComponent.balanceOf.callAsync(subjectCaller);

        expect(ownerBalance).to.bignumber.equal(expectedOwnerBalance);
      });

      it('returns the user the leftover base component token amount', async () => {
        const previousBalance = await baseSetComponent3.balanceOf.callAsync(subjectCaller);
        await subject();

        const expectedOwnerBalance = previousBalance
                                       .add(customZeroExReceiveTokenAmount)
                                       .sub(exchangeIssueReceiveTokenAmounts[2]);
        const ownerBalance = await baseSetComponent3.balanceOf.callAsync(subjectCaller);

        expect(ownerBalance).to.bignumber.equal(expectedOwnerBalance);
      });
    });

    describe('when the wrapper does not have enough allowance to transfer weth', async () => {
      beforeEach(async () => {
        await weth.changeAllowanceProxy.sendTransactionAsync(
          rebalancingSetCTokenExchangeIssuanceModule.address,
          transferProxy.address,
          new BigNumber(0),
          { gas: DEFAULT_GAS }
        );
      });

      it('resets the transferProxy allowance', async () => {
        const wethAllowance = await weth.allowance.callAsync(
          rebalancingSetCTokenExchangeIssuanceModule.address,
          transferProxy.address
        );
        expect(wethAllowance).to.bignumber.equal(ZERO);

        await subject();

        const expectedWethAllowance = UNLIMITED_ALLOWANCE_IN_BASE_UNITS;
        const newWethAllowance = await weth.allowance.callAsync(
          rebalancingSetCTokenExchangeIssuanceModule.address,
          transferProxy.address
        );
        expect(newWethAllowance).to.bignumber.equal(expectedWethAllowance);
      });
    });

    describe('when a send token address is not wrapped ether', async () => {
      beforeEach(async () => {
        const baseSetComponent = await erc20Helper.deployTokenAsync(zeroExOrderMaker);
        subjectExchangeIssuanceParams.sendTokens = [baseSetComponent.address, weth.address];
        subjectExchangeIssuanceParams.sendTokenAmounts = [new BigNumber(1), new BigNumber(1)];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the exchangeIssuanceParams setAddress is not the Rebalancing Sets currentSet', async () => {
      beforeEach(async () => {
        subjectExchangeIssuanceParams.setAddress = weth.address;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the eth sent is insufficient', async () => {
      before(async () => {
        customWethRequiredToIssueBaseSet = new BigNumber(0);
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
        const unTrackedSetToken = await rebalancingHelper.deployRebalancingSetTokenAsync(
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

    describe('when the Set is only made of three components', async () => {
      before(async () => {
        customBaseSetUnderlying = await erc20Helper.deployTokenAsync(
          ownerAccount,
          18,
        );
        const customComponentAddress =
          await compoundHelper.deployMockCUSDC(customBaseSetUnderlying.address, ownerAccount);
        await compoundHelper.enableCToken(customComponentAddress);
        customBaseSetComponent = await erc20Helper.getTokenInstanceAsync(customComponentAddress);

        customBaseSetUnderlying2 = await erc20Helper.deployTokenAsync(
          ownerAccount,
          18,
        );
        const customComponentAddress2 =
          await compoundHelper.deployMockCDAI(customBaseSetUnderlying2.address, ownerAccount);
        await compoundHelper.enableCToken(customComponentAddress2);
        customBaseSetComponent2 = await erc20Helper.getTokenInstanceAsync(customComponentAddress2);

        await cTokenWhiteList.addPair.sendTransactionAsync(
          customBaseSetComponent.address,
          customBaseSetUnderlying.address,
          { gas: DEFAULT_GAS }
        );
        await cTokenWhiteList.addPair.sendTransactionAsync(
          customBaseSetComponent2.address,
          customBaseSetUnderlying2.address,
          { gas: DEFAULT_GAS }
        );

        customBaseSetComponent3 = await erc20Helper.deployTokenAsync(ownerAccount, 18);

        customComponents =
          [customBaseSetComponent.address, customBaseSetComponent2.address, customBaseSetComponent3.address];
        customComponentUnits = [new BigNumber(10 ** 18), new BigNumber(10 ** 18), new BigNumber(10 ** 18)];
        customWethRequiredToIssueBaseSet = new BigNumber(0);
      });

      it('issues the rebalancing Set to the caller', async () => {
        const previousRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
        const expectedRBSetTokenBalance = previousRBSetTokenBalance.add(rebalancingSetIssueQuantity);

        await subject();

        const currentRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
        expect(expectedRBSetTokenBalance).to.bignumber.equal(currentRBSetTokenBalance);
      });
    });
  });

  describe('#issueRebalancingSetWithERC20', async () => {
    let subjectRebalancingSetAddress: Address;
    let subjectRebalancingSetQuantity: BigNumber;
    let subjectPaymentTokenAddress: Address;
    let subjectPaymentTokenQuantity: BigNumber;
    let subjectExchangeIssuanceParams: ExchangeIssuanceParams;
    let subjectExchangeOrdersData: Bytes;
    let subjectKeepChangeInVault: boolean;
    let subjectCaller: Address;

    // ----------------------------------------------------------------------
    // Component and Rebalancing Set
    // ----------------------------------------------------------------------
    let baseSetComponent: StandardTokenMockContract;
    let baseSetComponent2: StandardTokenMockContract;
    let baseSetComponent3: StandardTokenMockContract;
    let baseSetUnderlyingComponent: StandardTokenMockContract;
    let baseSetUnderlyingComponent2: StandardTokenMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    let customComponents: Address[];
    let customComponentUnits: BigNumber[];
    let customBaseSetComponent: StandardTokenMockContract;
    let customBaseSetComponent2: StandardTokenMockContract;
    let customBaseSetComponent3: StandardTokenMockContract;
    let customBaseSetUnderlying: StandardTokenMockContract;
    let customBaseSetUnderlying2: StandardTokenMockContract;

    // ----------------------------------------------------------------------
    // Issuance Details
    // ----------------------------------------------------------------------
    let rebalancingSetIssueQuantity: BigNumber;
    let baseSetIssueQuantity: BigNumber;

    let sendTokenRequiredToIssueBaseSet: BigNumber;

    let customSendTokenRequiredToIssueBaseSet: BigNumber;
    let customRebalancingSetIssueQuantity: BigNumber;

    // ----------------------------------------------------------------------
    // Payment / Send Token Details
    // ----------------------------------------------------------------------
    let totalSendToken: BigNumber;

    let zeroExSendTokenQuantity: BigNumber;
    let kyberSendTokenQuantity: BigNumber;
    let exchangeIssuanceSendTokenQuantity: BigNumber;
    let sendToken: StandardTokenMockContract;

    let customExchangeIssuanceSendTokenQuantity: BigNumber;
    let customSendTokenUsedInZeroExTrade: BigNumber;
    let customZeroExSendTokenQuantity: BigNumber;
    let customSendToken: StandardTokenMockContract;

    // ----------------------------------------------------------------------
    // Exchange Issuance Variables
    // ----------------------------------------------------------------------
    let exchangeIssueSetAddress: Address;
    let exchangeIssueQuantity: BigNumber;
    let exchangeIssueSendTokenExchangeIds: BigNumber[];
    let exchangeIssueSendTokens: Address[];
    let exchangeIssueSendTokenAmounts: BigNumber[];
    let exchangeIssueReceiveTokens: Address[];
    let exchangeIssueReceiveTokenAmounts: BigNumber[];

    let customExchangeIssuanceBaseSetIssueQuantity: BigNumber;


    // ----------------------------------------------------------------------
    // 0x Order Variables
    // ----------------------------------------------------------------------
    let zeroExOrder: ZeroExSignedFillOrder;
    let zeroExMakerAssetAmount: BigNumber;
    let zeroExTakerAssetAmount: BigNumber;

    let customZeroExReceiveTokenAmount: BigNumber;

    // ----------------------------------------------------------------------
    // Kyber Trade Variables
    // ----------------------------------------------------------------------
    let kyberTrade: KyberTrade;
    let kyberConversionRatePower: BigNumber;

    beforeEach(async () => {

      // ----------------------------------------------------------------------
      // Component and Rebalancing Set Deployment
      // ----------------------------------------------------------------------

      // Create non-wrapped Ether component tokens
      baseSetComponent = customBaseSetComponent || cUSDCInstance;
      baseSetUnderlyingComponent = customBaseSetUnderlying || usdcInstance;
      baseSetComponent2 = customBaseSetComponent2 || cDAIInstance;
      baseSetUnderlyingComponent2 = customBaseSetUnderlying2 || daiInstance;
      baseSetComponent3 = customBaseSetComponent3 || await erc20Helper.deployTokenAsync(ownerAccount);

      // Create cToken underlying send token
      sendToken = customSendToken || await erc20Helper.deployTokenAsync(tokenPurchaser, 18);
      const nonExchangedComponentAddress =
        await compoundHelper.deployMockCDAI(sendToken.address, ownerAccount);
      await compoundHelper.enableCToken(nonExchangedComponentAddress);
      await compoundHelper.setBorrowRate(nonExchangedComponentAddress, new BigNumber('29313252165'));
      const sendTokenComponent = await erc20Helper.getTokenInstanceAsync(nonExchangedComponentAddress);
      await cTokenWhiteList.addPair.sendTransactionAsync(
        sendTokenComponent.address,
        sendToken.address,
        { gas: DEFAULT_GAS }
      );
      // Create the Set (default is 4 components)
      const componentAddresses = customComponents || [
        baseSetComponent.address, baseSetComponent2.address, baseSetComponent3.address, sendTokenComponent.address,
      ];
      const componentUnits = customComponentUnits || [
        new BigNumber(10 ** 18), new BigNumber(10 ** 18), new BigNumber(10 ** 18), new BigNumber(10 ** 18),
      ];
      baseSetNaturalUnit = new BigNumber(10 ** 17);
      baseSetToken = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        baseSetNaturalUnit,
      );

      // Create the Rebalancing Set
      rebalancingUnitShares = new BigNumber(10 ** 18);
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        core,
        rebalancingSetTokenFactory.address,
        ownerAccount,
        baseSetToken.address,
        ONE_DAY_IN_SECONDS,
        rebalancingUnitShares,
      );

      // ----------------------------------------------------------------------
      // Issuance Details
      // ----------------------------------------------------------------------

      baseSetIssueQuantity = new BigNumber(10 ** 18);

      const impliedRebalancingSetQuantityFromBaseSet = baseSetIssueQuantity
        .mul(DEFAULT_REBALANCING_NATURAL_UNIT)
        .div(rebalancingUnitShares);

      rebalancingSetIssueQuantity = customRebalancingSetIssueQuantity || impliedRebalancingSetQuantityFromBaseSet;

      sendTokenRequiredToIssueBaseSet = customSendTokenRequiredToIssueBaseSet ||
        baseSetIssueQuantity
        .mul(await compoundHelper.cTokenToUnderlying(componentAddresses[3], componentUnits[3]))
        .div(baseSetNaturalUnit);

      // ----------------------------------------------------------------------
      // Payment / Send Token Details
      // ----------------------------------------------------------------------

      kyberSendTokenQuantity = new BigNumber(10 ** 18);
      zeroExSendTokenQuantity = customZeroExSendTokenQuantity || new BigNumber(10 ** 18);

      // 2 0x order 1 Kyber order
      exchangeIssuanceSendTokenQuantity = customExchangeIssuanceSendTokenQuantity ||
        kyberSendTokenQuantity.plus(zeroExSendTokenQuantity).plus(zeroExSendTokenQuantity);

      totalSendToken = exchangeIssuanceSendTokenQuantity.plus(sendTokenRequiredToIssueBaseSet);

      await erc20Helper.approveTransfersAsync(
        [sendToken],
        transferProxy.address,
        tokenPurchaser
      );

      // ----------------------------------------------------------------------
      // Exchange Issuance Set up
      // ----------------------------------------------------------------------

      // Generate exchange issue data
      exchangeIssueSetAddress = baseSetToken.address;
      exchangeIssueQuantity = customExchangeIssuanceBaseSetIssueQuantity || baseSetIssueQuantity;
      exchangeIssueSendTokenExchangeIds =
        [SetUtils.EXCHANGES.ZERO_EX, SetUtils.EXCHANGES.KYBER, SetUtils.EXCHANGES.ZERO_EX];
      exchangeIssueSendTokens = [sendToken.address, sendToken.address, sendToken.address];
      exchangeIssueSendTokenAmounts = [zeroExSendTokenQuantity, kyberSendTokenQuantity, zeroExSendTokenQuantity];

      const zeroExReceiveTokenAmount = componentUnits[0].mul(exchangeIssueQuantity).div(baseSetNaturalUnit);
      const kyberReceiveTokenAmount = componentUnits[1].mul(exchangeIssueQuantity).div(baseSetNaturalUnit);
      const nonCTokenZeroExReceiveTokenAmount = componentUnits[2].mul(exchangeIssueQuantity).div(baseSetNaturalUnit);

      exchangeIssueReceiveTokens = [
        componentAddresses[0],
        componentAddresses[1],
        componentAddresses[2],
      ];
      exchangeIssueReceiveTokenAmounts = [
        zeroExReceiveTokenAmount,
        kyberReceiveTokenAmount,
        nonCTokenZeroExReceiveTokenAmount,
      ];

      const exchangeIssuanceParams = {
        setAddress:             exchangeIssueSetAddress,
        sendTokenExchangeIds:   exchangeIssueSendTokenExchangeIds,
        sendTokens:             exchangeIssueSendTokens,
        sendTokenAmounts:       exchangeIssueSendTokenAmounts,
        quantity:               exchangeIssueQuantity,
        receiveTokens:          exchangeIssueReceiveTokens,
        receiveTokenAmounts:    exchangeIssueReceiveTokenAmounts,
      };

      // ----------------------------------------------------------------------
      // cToken 0x Order Set up
      // ----------------------------------------------------------------------

      const makerAsset = baseSetUnderlyingComponent.address;
      const takerAsset = exchangeIssueSendTokens[0];

      zeroExMakerAssetAmount = customZeroExReceiveTokenAmount ||
        await compoundHelper.cTokenToUnderlying(
          exchangeIssueReceiveTokens[0],
          exchangeIssueReceiveTokenAmounts[0]
        );
      zeroExTakerAssetAmount = customSendTokenUsedInZeroExTrade || exchangeIssueSendTokenAmounts[0];

      zeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                                         // senderAddress
        zeroExOrderMaker,                                                     // makerAddress
        NULL_ADDRESS,                                                         // takerAddress
        ZERO,                                                                 // makerFee
        ZERO,                                                                 // takerFee
        zeroExMakerAssetAmount,                                               // makerAssetAmount
        zeroExTakerAssetAmount,                                               // takerAssetAmount
        makerAsset,                                                           // makerAssetAddress
        takerAsset,                                                           // takerAssetAddress
        SetUtils.generateSalt(),                                              // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,                                // exchangeAddress
        NULL_ADDRESS,                                                         // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),                                // expirationTimeSeconds
        zeroExTakerAssetAmount,                                               // amount of zeroExOrder to fill
      );

      await erc20Helper.approveTransfersAsync(
        [baseSetUnderlyingComponent],
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        zeroExOrderMaker
      );

      // Fund zero Ex Order Maker
      await erc20Helper.transferTokenAsync(
        baseSetUnderlyingComponent,
        zeroExOrderMaker,
        zeroExMakerAssetAmount,
        ownerAccount,
      );

      // ----------------------------------------------------------------------
      // Kyber Trade Set up
      // ----------------------------------------------------------------------
      const maxDestinationQuantity = await compoundHelper.cTokenToUnderlying(
        exchangeIssueReceiveTokens[1],
        exchangeIssueReceiveTokenAmounts[1]
      );
      const componentTokenDecimals = (await baseSetUnderlyingComponent2.decimals.callAsync()).toNumber();
      const sourceTokenDecimals = (await sendToken.decimals.callAsync()).toNumber();
      kyberConversionRatePower = new BigNumber(10).pow(18 + sourceTokenDecimals - componentTokenDecimals);
      const minimumConversionRate = maxDestinationQuantity.div(kyberSendTokenQuantity)
                                                          .mul(kyberConversionRatePower)
                                                          .round();

      kyberTrade = {
        sourceToken: sendToken.address,
        destinationToken: baseSetUnderlyingComponent2.address,
        sourceTokenQuantity: kyberSendTokenQuantity,
        minimumConversionRate: minimumConversionRate,
        maxDestinationQuantity: maxDestinationQuantity,
      } as KyberTrade;

      await kyberNetworkHelper.approveToReserve(
        baseSetUnderlyingComponent2,
        UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
        kyberReserveOperator,
      );

      await kyberNetworkHelper.setConversionRates(
        sendToken.address,
        baseSetUnderlyingComponent2.address,
        kyberSendTokenQuantity,
        maxDestinationQuantity,
      );

      // Fund Kyber Reserve Operator
      await erc20Helper.transferTokenAsync(
        baseSetUnderlyingComponent2,
        kyberReserveOperator,
        kyberTrade.maxDestinationQuantity,
        ownerAccount,
      );

      // ----------------------------------------------------------------------
      // Non cToken 0x Order Set up
      // ----------------------------------------------------------------------

      const nonCTokenMakerAsset = exchangeIssueReceiveTokens[2];
      const nonCTokenTakerAsset = exchangeIssueSendTokens[2];

      const nonCTokenZeroExMakerAssetAmount = customZeroExReceiveTokenAmount || exchangeIssueReceiveTokenAmounts[2];
      const nonCTokenZeroExTakerAssetAmount = exchangeIssueSendTokenAmounts[2];

      const nonCTokenZeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                                         // senderAddress
        zeroExOrderMaker,                                                     // makerAddress
        NULL_ADDRESS,                                                         // takerAddress
        ZERO,                                                                 // makerFee
        ZERO,                                                                 // takerFee
        nonCTokenZeroExMakerAssetAmount,                                      // makerAssetAmount
        nonCTokenZeroExTakerAssetAmount,                                      // takerAssetAmount
        nonCTokenMakerAsset,                                                  // makerAssetAddress
        nonCTokenTakerAsset,                                                  // takerAssetAddress
        SetUtils.generateSalt(),                                              // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,                                // exchangeAddress
        NULL_ADDRESS,                                                         // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),                                // expirationTimeSeconds
        nonCTokenZeroExTakerAssetAmount,                                      // amount of zeroExOrder to fill
      );

      await erc20Helper.approveTransfersAsync(
        [baseSetComponent3],
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        zeroExOrderMaker
      );

      // Fund zero Ex Order Maker
      await erc20Helper.transferTokenAsync(
        baseSetComponent3,
        zeroExOrderMaker,
        nonCTokenZeroExMakerAssetAmount,
        ownerAccount,
      );

      // ----------------------------------------------------------------------
      // Subject Parameter Definitions
      // ----------------------------------------------------------------------

      subjectRebalancingSetAddress = rebalancingSetToken.address;
      subjectRebalancingSetQuantity = rebalancingSetIssueQuantity;
      subjectPaymentTokenAddress = sendToken.address;
      subjectPaymentTokenQuantity = totalSendToken;
      subjectExchangeIssuanceParams = exchangeIssuanceParams;
      subjectExchangeOrdersData = setUtils.generateSerializedOrders([zeroExOrder, kyberTrade, nonCTokenZeroExOrder]);
      subjectKeepChangeInVault = false;
      subjectCaller = tokenPurchaser;
    });

    afterEach(async () => {
      customExchangeIssuanceSendTokenQuantity = undefined;
      customExchangeIssuanceBaseSetIssueQuantity = undefined;
      customComponents = undefined;
      customComponentUnits = undefined;
      customSendTokenRequiredToIssueBaseSet = undefined;
      customSendToken = undefined;
      customRebalancingSetIssueQuantity = undefined;
    });

    async function subject(): Promise<string> {
      return rebalancingSetCTokenExchangeIssuanceModule.issueRebalancingSetWithERC20.sendTransactionAsync(
        subjectRebalancingSetAddress,
        subjectRebalancingSetQuantity,
        subjectPaymentTokenAddress,
        subjectPaymentTokenQuantity,
        subjectExchangeIssuanceParams,
        subjectExchangeOrdersData,
        subjectKeepChangeInVault,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it('issues the rebalancing Set to the caller', async () => {
      const previousRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      const expectedRBSetTokenBalance = previousRBSetTokenBalance.add(rebalancingSetIssueQuantity);

      await subject();

      const currentRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      expect(expectedRBSetTokenBalance).to.bignumber.equal(currentRBSetTokenBalance);
    });

    it('uses an expected amount of send token', async () => {
      const previousSendTokenBalance: BigNumber = await sendToken.balanceOf.callAsync(subjectCaller);

      await subject();
      const expectedSendTokenBalance = previousSendTokenBalance.sub(subjectPaymentTokenQuantity);

      const currentSendTokenBalance = await sendToken.balanceOf.callAsync(subjectCaller);
      expect(expectedSendTokenBalance).to.bignumber.equal(currentSendTokenBalance);
    });

    it('emits correct LogPayableExchangeIssue event', async () => {
      const expectedReturnedToken = new BigNumber(0);

      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = LogPayableExchangeIssue(
        subjectRebalancingSetAddress,
        subjectCaller,
        sendToken.address,
        subjectRebalancingSetQuantity,
        expectedReturnedToken,
        rebalancingSetCTokenExchangeIssuanceModule.address,
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when more exchangeIssuance send token is sent than required by trades', async () => {
      const excessSendToken = new BigNumber(10 ** 10);

      describe('', async () => {
        before(async () => {
          customExchangeIssuanceSendTokenQuantity = new BigNumber(3).mul(10 ** 18).plus(excessSendToken);
        });

        it('refunds the caller the appropriate amount of send token', async () => {
          const previousSendTokenBalance: BigNumber = await sendToken.balanceOf.callAsync(subjectCaller);

          await subject();
          const expectedSentTokenBalance = previousSendTokenBalance
                                      .sub(subjectPaymentTokenQuantity)
                                      .add(excessSendToken);

          const currentSendTokenBalance: BigNumber = await sendToken.balanceOf.callAsync(subjectCaller);
          expect(currentSendTokenBalance).to.bignumber.equal(expectedSentTokenBalance);
        });
      });

      describe('', async () => {
        before(async () => {
          customExchangeIssuanceSendTokenQuantity = new BigNumber(3).mul(10 ** 18).plus(excessSendToken);
        });

        it('emits log with correct refund quantity', async () => {
          const txHash = await subject();
          const expectedSendTokenBalance = excessSendToken;

          const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
          const expectedLogs = LogPayableExchangeIssue(
            subjectRebalancingSetAddress,
            subjectCaller,
            sendToken.address,
            subjectRebalancingSetQuantity,
            expectedSendTokenBalance,
            rebalancingSetCTokenExchangeIssuanceModule.address,
          );

          await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
        });
      });
    });

    describe('when zeroEx sendToken amount is greater than amount needed to execute 0x trade', async () => {
      before(async () => {
        customSendTokenUsedInZeroExTrade = new BigNumber(10 ** 18);
        customZeroExSendTokenQuantity = new BigNumber(10 ** 18).times(3);
      });

      it('refunds the unused send token from the 0x trade', async () => {
        const previousSendTokenBalance: BigNumber = await sendToken.balanceOf.callAsync(subjectCaller);

        await subject();
        const expectedEthBalance = previousSendTokenBalance
                                    .sub(customSendTokenUsedInZeroExTrade)
                                    .sub(kyberSendTokenQuantity)
                                    .sub(zeroExSendTokenQuantity)
                                    .sub(sendTokenRequiredToIssueBaseSet);

        const currentEthBalance = await sendToken.balanceOf.callAsync(subjectCaller);
        expect(currentEthBalance).to.bignumber.equal(expectedEthBalance);
      });
    });

    describe('when the base Set quantity minted is greater than required for Rebalancing Set issuance', async () => {
      const excessBaseSetIssued = new BigNumber(10 ** 17);

      describe('and keepChangeInVault is false', async () => {
        before(async () => {
          customRebalancingSetIssueQuantity = DEFAULT_REBALANCING_NATURAL_UNIT;
          customExchangeIssuanceBaseSetIssueQuantity = new BigNumber(10 ** 18).plus(excessBaseSetIssued);
        });

        it('refunds the caller the excess base Set', async () => {
          await subject();

          const ownerBalance = await baseSetToken.balanceOf.callAsync(subjectCaller);

          expect(ownerBalance).to.bignumber.equal(excessBaseSetIssued);
        });
      });

      describe('and keepChangeInVault is true', async () => {
        beforeEach(async () => {
          subjectKeepChangeInVault = true;
        });

        before(async () => {
          customRebalancingSetIssueQuantity = DEFAULT_REBALANCING_NATURAL_UNIT;
          customExchangeIssuanceBaseSetIssueQuantity = new BigNumber(10 ** 18).plus(excessBaseSetIssued);
        });

        it('sends to the Vault the excess base Set with ownership attributed to the caller', async () => {
          await subject();

          const ownerBalance = await vault.getOwnerBalance.callAsync(
            baseSetToken.address,
            subjectCaller
          );

          expect(ownerBalance).to.bignumber.equal(excessBaseSetIssued);
        });
      });
    });

    describe('when the amount of receive token from trade exceeds receive token amount', async () => {
      before(async () => {
        // Amount exceeds any calculable quantity of component token
        customZeroExReceiveTokenAmount = ether(11);
      });

      it('returns the user the leftover underlying token amount', async () => {
        const previousBalance = await baseSetUnderlyingComponent.balanceOf.callAsync(subjectCaller);
        await subject();

        const underlyingMakerAssetAmount = await compoundHelper.cTokenToUnderlying(
          baseSetComponent.address,
          exchangeIssueReceiveTokenAmounts[0]
        );
        const expectedOwnerBalance = previousBalance
                                       .add(customZeroExReceiveTokenAmount)
                                       .sub(underlyingMakerAssetAmount);
        const ownerBalance = await baseSetUnderlyingComponent.balanceOf.callAsync(subjectCaller);

        expect(ownerBalance).to.bignumber.equal(expectedOwnerBalance);
      });

      it('returns the user the leftover base component token amount', async () => {
        const previousBalance = await baseSetComponent3.balanceOf.callAsync(subjectCaller);
        await subject();

        const expectedOwnerBalance = previousBalance
                                       .add(customZeroExReceiveTokenAmount)
                                       .sub(exchangeIssueReceiveTokenAmounts[2]);
        const ownerBalance = await baseSetComponent3.balanceOf.callAsync(subjectCaller);

        expect(ownerBalance).to.bignumber.equal(expectedOwnerBalance);
      });
    });

    describe('when a send token address is not the payment token', async () => {
      beforeEach(async () => {
        const baseSetComponent = await erc20Helper.deployTokenAsync(zeroExOrderMaker);
        subjectExchangeIssuanceParams.sendTokens = [baseSetComponent.address, sendToken.address];
        subjectExchangeIssuanceParams.sendTokenAmounts = [new BigNumber(1), new BigNumber(1)];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the exchangeIssuanceParams setAddress is not the Rebalancing Sets currentSet', async () => {
      beforeEach(async () => {
        subjectExchangeIssuanceParams.setAddress = sendToken.address;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the send token is insufficient', async () => {
      before(async () => {
        customSendTokenRequiredToIssueBaseSet = new BigNumber(0);
        customExchangeIssuanceSendTokenQuantity = new BigNumber(0);
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
        const unTrackedSetToken = await rebalancingHelper.deployRebalancingSetTokenAsync(
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

    describe('when the Set is only made of three components', async () => {
      before(async () => {
        customBaseSetUnderlying = await erc20Helper.deployTokenAsync(
          ownerAccount,
          18,
        );
        const customComponentAddress =
          await compoundHelper.deployMockCUSDC(customBaseSetUnderlying.address, ownerAccount);
        await compoundHelper.enableCToken(customComponentAddress);
        customBaseSetComponent = await erc20Helper.getTokenInstanceAsync(customComponentAddress);

        customBaseSetUnderlying2 = await erc20Helper.deployTokenAsync(
          ownerAccount,
          18,
        );
        const customComponentAddress2 =
          await compoundHelper.deployMockCDAI(customBaseSetUnderlying2.address, ownerAccount);
        await compoundHelper.enableCToken(customComponentAddress2);
        customBaseSetComponent2 = await erc20Helper.getTokenInstanceAsync(customComponentAddress2);

        await cTokenWhiteList.addPair.sendTransactionAsync(
          customBaseSetComponent.address,
          customBaseSetUnderlying.address,
          { gas: DEFAULT_GAS }
        );
        await cTokenWhiteList.addPair.sendTransactionAsync(
          customBaseSetComponent2.address,
          customBaseSetUnderlying2.address,
          { gas: DEFAULT_GAS }
        );
        customSendToken = await erc20Helper.deployTokenAsync(
          tokenPurchaser,
          18,
        );
        customBaseSetComponent3 = await erc20Helper.deployTokenAsync(ownerAccount, 18);

        customComponents = [
          customBaseSetComponent.address,
          customBaseSetComponent2.address,
          customBaseSetComponent3.address,
        ];
        customComponentUnits = [new BigNumber(10 ** 18), new BigNumber(10 ** 18), new BigNumber(10 ** 18)];
        customSendTokenRequiredToIssueBaseSet = new BigNumber(0);
      });

      it('issues the rebalancing Set to the caller', async () => {
        const previousRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
        const expectedRBSetTokenBalance = previousRBSetTokenBalance.add(rebalancingSetIssueQuantity);

        await subject();

        const currentRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
        expect(expectedRBSetTokenBalance).to.bignumber.equal(currentRBSetTokenBalance);
      });
    });
  });

  describe('#redeemRebalancingSetIntoEther', async () => {
    let subjectRebalancingSetAddress: Address;
    let subjectRebalancingSetQuantity: BigNumber;
    let subjectExchangeIssuanceParams: ExchangeIssuanceParams;
    let subjectExchangeOrdersData: Bytes;
    let subjectKeepChangeInVault: boolean;
    let subjectCaller: Address;

    // ----------------------------------------------------------------------
    // Component and Rebalancing Set
    // ----------------------------------------------------------------------
    let baseSetComponent: StandardTokenMockContract;
    let baseSetUnderlyingComponent: StandardTokenMockContract;
    let baseSetUnderlyingComponent2: StandardTokenMockContract;
    let baseSetComponent2: StandardTokenMockContract;
    let baseSetComponent3: StandardTokenMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    let customExchangeRedeemQuantity: BigNumber;

    let customComponentAddresses: Address[];
    let customComponentUnits: BigNumber[];
    let customBaseSetComponent: StandardTokenMockContract;
    let customBaseSetComponent2: StandardTokenMockContract;
    let customBaseSetComponent3: StandardTokenMockContract;
    let customBaseSetUnderlying: StandardTokenMockContract;
    let customBaseSetUnderlying2: StandardTokenMockContract;

    // ----------------------------------------------------------------------
    // Issuance Details
    // ----------------------------------------------------------------------
    let rebalancingSetRedeemQuantity: BigNumber;
    let baseSetRedeemQuantity: BigNumber;

    let customWethRequiredToIssueBaseSet: BigNumber;

    // ----------------------------------------------------------------------
    // Payment / Send Token Details
    // ----------------------------------------------------------------------
    let wethRequiredToIssueBaseSet: BigNumber;

    let zeroExReceiveTokenQuantity: BigNumber;
    let kyberReceiveTokenQuantity: BigNumber;
    let nonCTokenZeroExReceiveTokenQuantity: BigNumber;
    let exchangeIssuanceReceiveTokenQuantity: BigNumber;

    let zeroExSendTokenQuantity: BigNumber;
    let kyberSendTokenQuantity: BigNumber;

    let totalEtherToReceive: BigNumber;

    let customZeroExSendTokenQuantity: BigNumber;

    // ----------------------------------------------------------------------
    // Exchange Issuance Variables
    // ----------------------------------------------------------------------
    let exchangeRedeemSetAddress: Address;
    let exchangeRedeemQuantity: BigNumber;
    let exchangeRedeemSendTokenExchangeIds: BigNumber[];
    let exchangeRedeemSendTokens: Address[];
    let exchangeRedeemSendTokenAmounts: BigNumber[];
    let exchangeRedeemReceiveTokens: Address[];
    let exchangeRedeemReceiveTokenAmounts: BigNumber[];

    // ----------------------------------------------------------------------
    // 0x Order Variables
    // ----------------------------------------------------------------------
    let zeroExOrder: ZeroExSignedFillOrder;
    let zeroExMakerAssetAmount: BigNumber;
    let zeroExTakerAssetAmount: BigNumber;

    let customZeroExReceiveTokenAmount: BigNumber;

    // ----------------------------------------------------------------------
    // Kyber Trade Variables
    // ----------------------------------------------------------------------
    let kyberTrade: KyberTrade;
    let kyberConversionRatePower: BigNumber;

    beforeEach(async () => {
      // ----------------------------------------------------------------------
      // Component and Rebalancing Set Deployment
      // ----------------------------------------------------------------------

      // Create non-wrapped Ether component tokens
      baseSetComponent = customBaseSetComponent || cUSDCInstance;
      baseSetUnderlyingComponent = customBaseSetUnderlying || usdcInstance;
      baseSetComponent2 = customBaseSetComponent2 || cDAIInstance;
      baseSetUnderlyingComponent2 = customBaseSetUnderlying2 || daiInstance;
      baseSetComponent3 = customBaseSetComponent3 || await erc20Helper.deployTokenAsync(ownerAccount);

      // Create the Set (default is 4 components)
      const componentAddresses = customComponentAddresses || [
        baseSetComponent.address, baseSetComponent2.address, baseSetComponent3.address, weth.address,
      ];
      const componentUnits = customComponentUnits || [
        new BigNumber(10 ** 18), new BigNumber(10 ** 18), new BigNumber(10 ** 18), new BigNumber(10 ** 18),
      ];
      baseSetNaturalUnit = new BigNumber(10 ** 17);
      baseSetToken = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        baseSetNaturalUnit,
      );

      // Create the Rebalancing Set
      rebalancingUnitShares = new BigNumber(10 ** 18);
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        core,
        rebalancingSetTokenFactory.address,
        ownerAccount,
        baseSetToken.address,
        ONE_DAY_IN_SECONDS,
        rebalancingUnitShares,
      );

      // ----------------------------------------------------------------------
      // Issuance Details
      // ----------------------------------------------------------------------
      baseSetRedeemQuantity = new BigNumber(10 ** 18);

      rebalancingSetRedeemQuantity = baseSetRedeemQuantity
                                       .mul(DEFAULT_REBALANCING_NATURAL_UNIT)
                                       .div(rebalancingUnitShares);

      wethRequiredToIssueBaseSet = customWethRequiredToIssueBaseSet ||
        componentUnits[3].mul(baseSetRedeemQuantity).div(baseSetNaturalUnit);

      // ----------------------------------------------------------------------
      // Payment / Send and Receive Token Details
      // ----------------------------------------------------------------------

      kyberReceiveTokenQuantity = ether(1);
      zeroExReceiveTokenQuantity = customZeroExSendTokenQuantity || ether(1);
      nonCTokenZeroExReceiveTokenQuantity = ether(1);

      exchangeIssuanceReceiveTokenQuantity =
        zeroExReceiveTokenQuantity.plus(nonCTokenZeroExReceiveTokenQuantity).plus(kyberReceiveTokenQuantity);

      totalEtherToReceive = exchangeIssuanceReceiveTokenQuantity.plus(wethRequiredToIssueBaseSet);

      // ----------------------------------------------------------------------
      // Exchange Issuance Set up
      // ----------------------------------------------------------------------

      // Generate exchangeRedeem data
      exchangeRedeemSetAddress = baseSetToken.address;
      exchangeRedeemQuantity = customExchangeRedeemQuantity || baseSetRedeemQuantity;
      exchangeRedeemSendTokenExchangeIds =
        [SetUtils.EXCHANGES.ZERO_EX, SetUtils.EXCHANGES.KYBER, SetUtils.EXCHANGES.ZERO_EX];
      exchangeRedeemSendTokens = [componentAddresses[0], componentAddresses[1], componentAddresses[2]];

      zeroExSendTokenQuantity = customZeroExSendTokenQuantity ||
        componentUnits[0].mul(exchangeRedeemQuantity).div(baseSetNaturalUnit);
      kyberSendTokenQuantity = componentUnits[1].mul(exchangeRedeemQuantity).div(baseSetNaturalUnit);
      const nonCTokenZeroExSendTokenQuantity = componentUnits[2].mul(exchangeRedeemQuantity).div(baseSetNaturalUnit);

      exchangeRedeemSendTokenAmounts =
        [zeroExSendTokenQuantity, kyberSendTokenQuantity, nonCTokenZeroExSendTokenQuantity];
      exchangeRedeemReceiveTokens = [weth.address];
      exchangeRedeemReceiveTokenAmounts = [exchangeIssuanceReceiveTokenQuantity];

      const exchangeIssuanceParams = {
        setAddress:             exchangeRedeemSetAddress,
        sendTokenExchangeIds:   exchangeRedeemSendTokenExchangeIds,
        sendTokens:             exchangeRedeemSendTokens,
        sendTokenAmounts:       exchangeRedeemSendTokenAmounts,
        quantity:               exchangeRedeemQuantity,
        receiveTokens:          exchangeRedeemReceiveTokens,
        receiveTokenAmounts:    exchangeRedeemReceiveTokenAmounts,
      };

      // ----------------------------------------------------------------------
      // 0x Order Set up
      // ----------------------------------------------------------------------

      const makerAsset = exchangeRedeemReceiveTokens[0];
      const takerAsset = baseSetUnderlyingComponent.address;

      zeroExMakerAssetAmount = customZeroExReceiveTokenAmount || zeroExReceiveTokenQuantity;
      // Taker is transacting in cToken underlying
      zeroExTakerAssetAmount = await compoundHelper.cTokenToUnderlying(
        exchangeRedeemSendTokens[0],
        exchangeRedeemSendTokenAmounts[0]
      );

      zeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                                         // senderAddress
        zeroExOrderMaker,                                                     // makerAddress
        NULL_ADDRESS,                                                         // takerAddress
        ZERO,                                                                 // makerFee
        ZERO,                                                                 // takerFee
        zeroExMakerAssetAmount,                                               // makerAssetAmount
        zeroExTakerAssetAmount,                                               // takerAssetAmount
        makerAsset,                                                           // makerAssetAddress
        takerAsset,                                                           // takerAssetAddress
        SetUtils.generateSalt(),                                              // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,                                // exchangeAddress
        NULL_ADDRESS,                                                         // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),                                // expirationTimeSeconds
        zeroExTakerAssetAmount,                                               // amount of zeroExOrder to fill
      );

      // Approve weth to the transfer proxy
      await weth.approve.sendTransactionAsync(
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
        { from: zeroExOrderMaker, gas: DEFAULT_GAS }
      );

      // Deposit weth
      await weth.deposit.sendTransactionAsync(
        { from: zeroExOrderMaker, value: zeroExMakerAssetAmount.toString(), gas: DEFAULT_GAS }
      );

      // ----------------------------------------------------------------------
      // Kyber Trade Set up
      // ----------------------------------------------------------------------
      const maxDestinationQuantity = kyberReceiveTokenQuantity;
      const sourceTokenQuantity =
        await compoundHelper.cTokenToUnderlying(exchangeRedeemSendTokens[1], exchangeRedeemSendTokenAmounts[1]);
      const destinationTokenDecimals = (await weth.decimals.callAsync()).toNumber();
      const sourceTokenDecimals = (await baseSetUnderlyingComponent2.decimals.callAsync()).toNumber();
      kyberConversionRatePower = new BigNumber(10).pow(18 + sourceTokenDecimals - destinationTokenDecimals);
      const minimumConversionRate = maxDestinationQuantity.div(sourceTokenQuantity)
                                                          .mul(kyberConversionRatePower)
                                                          .round();

      kyberTrade = {
        sourceToken: baseSetUnderlyingComponent2.address,
        destinationToken: weth.address,
        sourceTokenQuantity: sourceTokenQuantity,
        minimumConversionRate: minimumConversionRate,
        maxDestinationQuantity: maxDestinationQuantity,
      } as KyberTrade;

      await weth.approve.sendTransactionAsync(
        kyberNetworkHelper.kyberReserve,
        UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
        { from: kyberReserveOperator, gas: DEFAULT_GAS }
      );

      // Deposit weth
      await weth.deposit.sendTransactionAsync(
        { from: kyberReserveOperator, value: maxDestinationQuantity.toString(), gas: DEFAULT_GAS }
      );

      await kyberNetworkHelper.setConversionRates(
        baseSetUnderlyingComponent2.address,
        weth.address,
        sourceTokenQuantity,
        maxDestinationQuantity,
      );

      // ----------------------------------------------------------------------
      // Non cToken 0x Order Set up
      // ----------------------------------------------------------------------

      const nonCTokenMakerAsset = exchangeRedeemReceiveTokens[0];
      const nonCTokenTakerAsset = baseSetComponent3.address;

      const nonCTokenZeroExMakerAssetAmount = nonCTokenZeroExReceiveTokenQuantity;
      // Taker is transacting in cToken underlying
      const nonCTokenZeroExTakerAssetAmount = exchangeRedeemSendTokenAmounts[2];

      const nonZeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                                         // senderAddress
        zeroExOrderMaker,                                                     // makerAddress
        NULL_ADDRESS,                                                         // takerAddress
        ZERO,                                                                 // makerFee
        ZERO,                                                                 // takerFee
        nonCTokenZeroExMakerAssetAmount,                                      // makerAssetAmount
        nonCTokenZeroExTakerAssetAmount,                                      // takerAssetAmount
        nonCTokenMakerAsset,                                                  // makerAssetAddress
        nonCTokenTakerAsset,                                                  // takerAssetAddress
        SetUtils.generateSalt(),                                              // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,                                // exchangeAddress
        NULL_ADDRESS,                                                         // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),                                // expirationTimeSeconds
        nonCTokenZeroExTakerAssetAmount,                                      // amount of zeroExOrder to fill
      );

      // Deposit weth for nonCToken 0x order
      await weth.deposit.sendTransactionAsync(
        { from: zeroExOrderMaker, value: nonCTokenZeroExMakerAssetAmount.toString(), gas: DEFAULT_GAS }
      );

      // ----------------------------------------------------------------------
      // Rebalancing Set Issuance
      // ----------------------------------------------------------------------

      // Mint cTokens from underlying for the send tokens
      await erc20Helper.approveTransfersAsync([baseSetUnderlyingComponent], baseSetComponent.address);
      await erc20Helper.approveTransfersAsync([baseSetUnderlyingComponent2], baseSetComponent2.address);
      await compoundHelper.mintCToken(
        baseSetComponent.address,
        DEPLOYED_TOKEN_QUANTITY
      );
      await compoundHelper.mintCToken(
        baseSetComponent2.address,
        DEPLOYED_TOKEN_QUANTITY
      );

      // Approve base components to transfer proxy
      await erc20Helper.approveTransfersAsync(
        [baseSetComponent, baseSetComponent2, baseSetComponent3],
        transferProxy.address,
        ownerAccount
      );

      if (wethRequiredToIssueBaseSet.gt(0)) {
        // Approve Weth to the transferProxy
        await weth.approve.sendTransactionAsync(
          transferProxy.address,
          wethRequiredToIssueBaseSet,
          { gas: DEFAULT_GAS }
        );

        // Generate wrapped Ether for the caller
        await weth.deposit.sendTransactionAsync(
          { value: wethRequiredToIssueBaseSet.toString(), gas: DEFAULT_GAS }
        );
      }

      // Issue the Base Set to the vault under ownerAccount
      await core.issueInVault.sendTransactionAsync(
        baseSetToken.address,
        baseSetRedeemQuantity,
        { gas: DEFAULT_GAS }
      );

      // Issue the RB Set under ownerAccount
      await core.issue.sendTransactionAsync(
        rebalancingSetToken.address,
        rebalancingSetRedeemQuantity,
        { gas: DEFAULT_GAS }
      );

      // Transfer RB Set to tokenPurchaser
      await erc20Helper.transferTokenAsync(
        rebalancingSetToken,
        tokenPurchaser,
        rebalancingSetRedeemQuantity
      );

      // ----------------------------------------------------------------------
      // Subject Parameter Definitions
      // ----------------------------------------------------------------------

      subjectRebalancingSetAddress = rebalancingSetToken.address;
      subjectRebalancingSetQuantity = rebalancingSetRedeemQuantity;
      subjectExchangeIssuanceParams = exchangeIssuanceParams;
      subjectExchangeOrdersData = setUtils.generateSerializedOrders([zeroExOrder, kyberTrade, nonZeroExOrder]);
      subjectKeepChangeInVault = false;
      subjectCaller = tokenPurchaser;
    });

    afterEach(async () => {
      customExchangeRedeemQuantity = undefined;
    });

    async function subject(): Promise<string> {
      return rebalancingSetCTokenExchangeIssuanceModule.redeemRebalancingSetIntoEther.sendTransactionAsync(
        subjectRebalancingSetAddress,
        subjectRebalancingSetQuantity,
        subjectExchangeIssuanceParams,
        subjectExchangeOrdersData,
        subjectKeepChangeInVault,
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

    it('should increment the users eth balance by the correct quantity', async () => {
      const previousEthBalance = new BigNumber(await web3.eth.getBalance(subjectCaller));

      const txHash = await subject();
      const totalGasInEth = await getGasUsageInEth(txHash);

      const expectedEthBalance = previousEthBalance
                                   .add(totalEtherToReceive)
                                   .sub(totalGasInEth);
      const currentEthBalance =  await web3.eth.getBalance(subjectCaller);

      expect(currentEthBalance).to.bignumber.equal(expectedEthBalance);
    });

    it('increases the 0x makers underlying send token quantity properly', async () => {
      const previousTakerTokenBalance = await baseSetUnderlyingComponent.balanceOf.callAsync(zeroExOrderMaker);
      const underlyingSendTokenAmount = await compoundHelper.cTokenToUnderlying(
        exchangeRedeemSendTokens[0],
        exchangeRedeemSendTokenAmounts[0]
      );
      const expectedTakerTokenBalance = previousTakerTokenBalance.add(underlyingSendTokenAmount);

      await subject();

      const currentTakerTokenBalance = await baseSetUnderlyingComponent.balanceOf.callAsync(zeroExOrderMaker);
      expect(expectedTakerTokenBalance).to.bignumber.equal(currentTakerTokenBalance);
    });

    it('increases the 0x makers non cToken send token quantity properly', async () => {
      const previousTakerTokenBalance = await baseSetComponent3.balanceOf.callAsync(zeroExOrderMaker);
      const underlyingSendTokenAmount = exchangeRedeemSendTokenAmounts[2];
      const expectedTakerTokenBalance = previousTakerTokenBalance.add(underlyingSendTokenAmount);

      await subject();

      const currentTakerTokenBalance = await baseSetComponent3.balanceOf.callAsync(zeroExOrderMaker);
      expect(expectedTakerTokenBalance).to.bignumber.equal(currentTakerTokenBalance);
    });

    it('emits correct LogPayableExchangeRedeem event', async () => {
      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = LogPayableExchangeRedeem(
        subjectRebalancingSetAddress,
        subjectCaller,
        weth.address,
        subjectRebalancingSetQuantity,
        totalEtherToReceive,
        rebalancingSetCTokenExchangeIssuanceModule.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the Set has a component that has not been exchanged', async () => {
      let nonExchangedNonWethComponent: StandardTokenMockContract;

      before(async () => {
        customBaseSetUnderlying = await erc20Helper.deployTokenAsync(
          ownerAccount,
          18,
        );
        const customComponentAddress =
          await compoundHelper.deployMockCUSDC(customBaseSetUnderlying.address, ownerAccount);
        await compoundHelper.enableCToken(customComponentAddress);
        customBaseSetComponent = await erc20Helper.getTokenInstanceAsync(customComponentAddress);

        customBaseSetUnderlying2 = await erc20Helper.deployTokenAsync(
          ownerAccount,
          18,
        );
        const customComponentAddress2 =
          await compoundHelper.deployMockCDAI(customBaseSetUnderlying2.address, ownerAccount);
        await compoundHelper.enableCToken(customComponentAddress2);
        customBaseSetComponent2 = await erc20Helper.getTokenInstanceAsync(customComponentAddress2);

        await cTokenWhiteList.addPair.sendTransactionAsync(
          customBaseSetComponent.address,
          customBaseSetUnderlying.address,
          { gas: DEFAULT_GAS }
        );
        await cTokenWhiteList.addPair.sendTransactionAsync(
          customBaseSetComponent2.address,
          customBaseSetUnderlying2.address,
          { gas: DEFAULT_GAS }
        );

        customBaseSetComponent3 = await erc20Helper.deployTokenAsync(ownerAccount);

        nonExchangedNonWethComponent = await erc20Helper.deployTokenAsync(ownerAccount);

        customComponentAddresses = [
          customBaseSetComponent.address,
          customBaseSetComponent2.address,
          customBaseSetComponent3.address,
          weth.address,
          nonExchangedNonWethComponent.address,
        ];
        customComponentUnits = [
          new BigNumber(10 ** 18),
          new BigNumber(10 ** 18),
          new BigNumber(10 ** 18),
          new BigNumber(10 ** 18),
          new BigNumber(10 ** 18),
        ];

        await erc20Helper.approveTransfersAsync(
          [nonExchangedNonWethComponent],
          transferProxy.address,
          ownerAccount
        );
      });

      after(async () => {
        customBaseSetComponent = undefined;
        customBaseSetComponent2 = undefined;
        customBaseSetComponent3 = undefined;
        customBaseSetUnderlying = undefined;
        customBaseSetUnderlying2 = undefined;
        customComponentAddresses = undefined;
        customComponentUnits = undefined;
      });

      it('should send the extra asset to the caller', async () => {
        const previousReturnedAssetBalance = await nonExchangedNonWethComponent.balanceOf.callAsync(subjectCaller);
        const expectedReturnedAssetBalance = previousReturnedAssetBalance.add(
          customComponentUnits[3].mul(exchangeRedeemQuantity).div(baseSetNaturalUnit)
        );

        await subject();

        const currentReturnedAssetBalance = await nonExchangedNonWethComponent.balanceOf.callAsync(subjectCaller);
        expect(expectedReturnedAssetBalance).to.bignumber.equal(currentReturnedAssetBalance);
      });
    });

    describe('when the 0x order receiveToken quantity is greater than specified', async () => {
      before(async () => {
        customZeroExReceiveTokenAmount = ether(2);
      });

      after(async () => {
        customZeroExReceiveTokenAmount = undefined;
      });

      it('should increment the users eth balance by the correct quantity', async () => {
        const previousEthBalance = new BigNumber(await web3.eth.getBalance(subjectCaller));

        const txHash = await subject();
        const totalGasInEth = await getGasUsageInEth(txHash);

        const expectedEthBalance = previousEthBalance
                                     .add(totalEtherToReceive)
                                     .add(customZeroExReceiveTokenAmount)
                                     .sub(zeroExReceiveTokenQuantity)
                                     .sub(totalGasInEth);
        const currentEthBalance =  await web3.eth.getBalance(subjectCaller);
        expect(currentEthBalance).to.bignumber.equal(expectedEthBalance);
      });
    });

    describe('when the quantity of underlying send token is less than the components redeemed', async () => {
      let halfBaseComponentQuantity: BigNumber;

      before(async () => {
        const componentUnit = new BigNumber(10 ** 18);
        const naturalUnit = new BigNumber(10 ** 17);
        const redeemQuantity = new BigNumber(10 ** 18);

        halfBaseComponentQuantity =  componentUnit.mul(redeemQuantity).div(naturalUnit).div(2);

        customZeroExSendTokenQuantity = halfBaseComponentQuantity;
      });

      after(async () => {
        customZeroExSendTokenQuantity = undefined;
      });

      it('should send the unsold components to the caller', async () => {
        const previousReturnedAssetBalance = await baseSetUnderlyingComponent.balanceOf.callAsync(subjectCaller);
        const halfBaseUnderlyingQuantity =
          await compoundHelper.cTokenToUnderlying(baseSetComponent.address, halfBaseComponentQuantity);
        const expectedReturnedAssetBalance = previousReturnedAssetBalance.add(halfBaseUnderlyingQuantity);
        await subject();
        const currentReturnedAssetBalance = await baseSetUnderlyingComponent.balanceOf.callAsync(subjectCaller);
        expect(expectedReturnedAssetBalance).to.bignumber.equal(currentReturnedAssetBalance);
      });
    });

    describe('when the implied base Set quantity is greater than the issuance params base Set quantity', async () => {
      let excessBaseSetQuantity: BigNumber;

      beforeEach(async () => {
        const excessNonExchangedWethQuantity = wethRequiredToIssueBaseSet.mul(2);
        excessBaseSetQuantity = exchangeRedeemQuantity.mul(2);

        // Generate wrapped Ether for the caller
        await weth.deposit.sendTransactionAsync(
          { from: ownerAccount, value: excessNonExchangedWethQuantity.toString(), gas: DEFAULT_GAS }
        );

        // Approve Weth to the transferProxy
        await weth.approve.sendTransactionAsync(
          transferProxy.address,
          UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
          { from: ownerAccount, gas: DEFAULT_GAS }
        );

        // Issue the Base Set to the vault
        await core.issueInVault.sendTransactionAsync(
          baseSetToken.address,
          excessBaseSetQuantity,
          { from: ownerAccount, gas: DEFAULT_GAS }
        );

        // Issue the Rebalancing Set
        const excessRebalancingSetQuantity = excessBaseSetQuantity
                                         .mul(DEFAULT_REBALANCING_NATURAL_UNIT)
                                         .div(rebalancingUnitShares);
        await core.issue.sendTransactionAsync(
          rebalancingSetToken.address,
          excessRebalancingSetQuantity,
          { from: ownerAccount, gas: DEFAULT_GAS }
        );

        // Transfer RB Set to tokenPurchaser
        await erc20Helper.transferTokenAsync(
          rebalancingSetToken,
          tokenPurchaser,
          excessRebalancingSetQuantity
        );

        subjectRebalancingSetQuantity = subjectRebalancingSetQuantity.add(excessRebalancingSetQuantity);
      });

      it('should return the excess base Set to the caller', async () => {
        const previousReturnedAssetBalance = await baseSetToken.balanceOf.callAsync(subjectCaller);
        const expectedReturnedAssetBalance = previousReturnedAssetBalance.add(excessBaseSetQuantity);

        await subject();

        const currentReturnedAssetBalance = await baseSetToken.balanceOf.callAsync(subjectCaller);
        expect(currentReturnedAssetBalance).to.bignumber.equal(expectedReturnedAssetBalance);
      });

      describe('and keepChangeInVault is true', async () => {
        beforeEach(async () => {
          subjectKeepChangeInVault = true;
        });

        it('refunds the user the appropriate amount of base Set to the Vault', async () => {
          const previousReturnedAssetBalance = await vault.getOwnerBalance.callAsync(
            baseSetToken.address,
            subjectCaller
          );
          const expectedReturnedAssetBalance = previousReturnedAssetBalance.add(excessBaseSetQuantity);

          await subject();

          const currentReturnedAssetBalance = await vault.getOwnerBalance.callAsync(
            baseSetToken.address,
            subjectCaller
          );
          expect(currentReturnedAssetBalance).to.bignumber.equal(expectedReturnedAssetBalance);
        });
      });
    });

    describe('when the receive tokens length is greater than 1 and there are duplicates', async () => {
      beforeEach(async () => {
        subjectExchangeIssuanceParams.receiveTokens = [weth.address, weth.address];
        subjectExchangeIssuanceParams.receiveTokenAmounts = [new BigNumber(1), new BigNumber(1)];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the receive token is not wrapped ether', async () => {
      beforeEach(async () => {
        const baseSetComponent = await erc20Helper.deployTokenAsync(zeroExOrderMaker);
        subjectExchangeIssuanceParams.receiveTokens = [baseSetComponent.address];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the base Set of the rebalancing Set is not the issuance params Set', async () => {
      beforeEach(async () => {
        subjectExchangeIssuanceParams.setAddress = weth.address;
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

    describe('when the rebalancingSetAddress is not tracked by Core', async () => {
      beforeEach(async () => {
        const proposalPeriod = ONE_DAY_IN_SECONDS;
        const rebalanceInterval = ONE_DAY_IN_SECONDS;
        const unTrackedSetToken = await rebalancingHelper.deployRebalancingSetTokenAsync(
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

    describe('when the Set is only made of three components', async () => {
      before(async () => {
        customBaseSetUnderlying = await erc20Helper.deployTokenAsync(
          ownerAccount,
          18,
        );
        const customComponentAddress =
          await compoundHelper.deployMockCUSDC(customBaseSetUnderlying.address, ownerAccount);
        await compoundHelper.enableCToken(customComponentAddress);
        customBaseSetComponent = await erc20Helper.getTokenInstanceAsync(customComponentAddress);

        customBaseSetUnderlying2 = await erc20Helper.deployTokenAsync(
          ownerAccount,
          18,
        );
        const customComponentAddress2 =
          await compoundHelper.deployMockCDAI(customBaseSetUnderlying2.address, ownerAccount);
        await compoundHelper.enableCToken(customComponentAddress2);
        customBaseSetComponent2 = await erc20Helper.getTokenInstanceAsync(customComponentAddress2);

        await cTokenWhiteList.addPair.sendTransactionAsync(
          customBaseSetComponent.address,
          customBaseSetUnderlying.address,
          { gas: DEFAULT_GAS }
        );
        await cTokenWhiteList.addPair.sendTransactionAsync(
          customBaseSetComponent2.address,
          customBaseSetUnderlying2.address,
          { gas: DEFAULT_GAS }
        );

        customBaseSetComponent3 = await erc20Helper.deployTokenAsync(ownerAccount, 18);

        customComponentAddresses =
          [customBaseSetComponent.address, customBaseSetComponent2.address, customBaseSetComponent3.address];
        customComponentUnits = [new BigNumber(10 ** 18), new BigNumber(10 ** 18), new BigNumber(10 ** 18)];
        customWethRequiredToIssueBaseSet = new BigNumber(0);
      });

      it('redeems the rebalancing Set', async () => {
        const previousRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
        const expectedRBSetTokenBalance = previousRBSetTokenBalance.sub(subjectRebalancingSetQuantity);

        await subject();

        const currentRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
        expect(expectedRBSetTokenBalance).to.bignumber.equal(currentRBSetTokenBalance);
      });
    });
  });

  describe('#redeemRebalancingSetIntoERC20', async () => {
    let subjectRebalancingSetAddress: Address;
    let subjectRebalancingSetQuantity: BigNumber;
    let subjectReceiveTokenAddress: Address;
    let subjectExchangeIssuanceParams: ExchangeIssuanceParams;
    let subjectExchangeOrdersData: Bytes;
    let subjectKeepChangeInVault: boolean;
    let subjectCaller: Address;

    // ----------------------------------------------------------------------
    // Component and Rebalancing Set
    // ----------------------------------------------------------------------
    let baseSetComponent: StandardTokenMockContract;
    let baseSetUnderlyingComponent: StandardTokenMockContract;
    let baseSetUnderlyingComponent2: StandardTokenMockContract;
    let baseSetComponent2: StandardTokenMockContract;
    let baseSetComponent3: StandardTokenMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    let customExchangeRedeemQuantity: BigNumber;

    let customComponentAddresses: Address[];
    let customComponentUnits: BigNumber[];
    let customBaseSetComponent: StandardTokenMockContract;
    let customBaseSetComponent2: StandardTokenMockContract;
    let customBaseSetComponent3: StandardTokenMockContract;
    let customBaseSetUnderlying: StandardTokenMockContract;
    let customBaseSetUnderlying2: StandardTokenMockContract;

    // ----------------------------------------------------------------------
    // Issuance Details
    // ----------------------------------------------------------------------
    let rebalancingSetRedeemQuantity: BigNumber;
    let baseSetRedeemQuantity: BigNumber;

    let customReceiveTokenRequiredToIssueBaseSet: BigNumber;

    // ----------------------------------------------------------------------
    // Payment / Send Token Details
    // ----------------------------------------------------------------------
    let receiveTokenRequiredToIssueBaseSet: BigNumber;

    let zeroExReceiveTokenQuantity: BigNumber;
    let kyberReceiveTokenQuantity: BigNumber;
    let nonCTokenZeroExReceiveTokenQuantity: BigNumber;
    let exchangeIssuanceReceiveTokenQuantity: BigNumber;

    let zeroExSendTokenQuantity: BigNumber;
    let kyberSendTokenQuantity: BigNumber;

    let totalReceiveAmount: BigNumber;
    let receiveToken: StandardTokenMockContract;
    let receiveTokenComponent: StandardTokenMockContract;

    let customZeroExSendTokenQuantity: BigNumber;

    // ----------------------------------------------------------------------
    // Exchange Issuance Variables
    // ----------------------------------------------------------------------
    let exchangeRedeemSetAddress: Address;
    let exchangeRedeemQuantity: BigNumber;
    let exchangeRedeemSendTokenExchangeIds: BigNumber[];
    let exchangeRedeemSendTokens: Address[];
    let exchangeRedeemSendTokenAmounts: BigNumber[];
    let exchangeRedeemReceiveTokens: Address[];
    let exchangeRedeemReceiveTokenAmounts: BigNumber[];

    // ----------------------------------------------------------------------
    // 0x Order Variables
    // ----------------------------------------------------------------------
    let zeroExOrder: ZeroExSignedFillOrder;
    let zeroExMakerAssetAmount: BigNumber;
    let zeroExTakerAssetAmount: BigNumber;

    let customZeroExReceiveTokenAmount: BigNumber;

    // ----------------------------------------------------------------------
    // Kyber Trade Variables
    // ----------------------------------------------------------------------
    let kyberTrade: KyberTrade;
    let kyberConversionRatePower: BigNumber;

    beforeEach(async () => {
      // ----------------------------------------------------------------------
      // Component and Rebalancing Set Deployment
      // ----------------------------------------------------------------------

      // Create non-wrapped Ether component tokens
      baseSetComponent = customBaseSetComponent || cUSDCInstance;
      baseSetUnderlyingComponent = customBaseSetUnderlying || usdcInstance;
      baseSetComponent2 = customBaseSetComponent2 || cDAIInstance;
      baseSetUnderlyingComponent2 = customBaseSetUnderlying2 || daiInstance;
      baseSetComponent3 = customBaseSetComponent3 || await erc20Helper.deployTokenAsync(ownerAccount);

      receiveToken = await erc20Helper.deployTokenAsync(ownerAccount, 18);
      const nonExchangedComponentAddress =
        await compoundHelper.deployMockCDAI(receiveToken.address, ownerAccount);
      await compoundHelper.enableCToken(nonExchangedComponentAddress);
      await compoundHelper.setBorrowRate(nonExchangedComponentAddress, new BigNumber('29313252165'));
      receiveTokenComponent = await erc20Helper.getTokenInstanceAsync(nonExchangedComponentAddress);
      await cTokenWhiteList.addPair.sendTransactionAsync(
        receiveTokenComponent.address,
        receiveToken.address,
        { gas: DEFAULT_GAS }
      );

      // Create the Set (default is 4 components)
      const componentAddresses = customComponentAddresses || [
        baseSetComponent.address, baseSetComponent2.address, baseSetComponent3.address, receiveTokenComponent.address,
      ];
      const componentUnits = customComponentUnits || [
        new BigNumber(10 ** 18), new BigNumber(10 ** 18), new BigNumber(10 ** 18), new BigNumber(10 ** 18),
      ];
      baseSetNaturalUnit = new BigNumber(10 ** 17);
      baseSetToken = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        baseSetNaturalUnit,
      );

      // Create the Rebalancing Set
      rebalancingUnitShares = new BigNumber(10 ** 18);
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        core,
        rebalancingSetTokenFactory.address,
        ownerAccount,
        baseSetToken.address,
        ONE_DAY_IN_SECONDS,
        rebalancingUnitShares,
      );

      // ----------------------------------------------------------------------
      // Issuance Details
      // ----------------------------------------------------------------------
      baseSetRedeemQuantity = new BigNumber(10 ** 18);

      rebalancingSetRedeemQuantity = baseSetRedeemQuantity
                                       .mul(DEFAULT_REBALANCING_NATURAL_UNIT)
                                       .div(rebalancingUnitShares);

      const receiveTokenBaseComponent = customReceiveTokenRequiredToIssueBaseSet ||
        componentUnits[3].mul(baseSetRedeemQuantity).div(baseSetNaturalUnit);

      receiveTokenRequiredToIssueBaseSet = await compoundHelper.cTokenToUnderlying(
        receiveTokenComponent.address,
        receiveTokenBaseComponent
      );

      // ----------------------------------------------------------------------
      // Payment / Send and Receive Token Details
      // ----------------------------------------------------------------------

      kyberReceiveTokenQuantity = ether(1);
      zeroExReceiveTokenQuantity = customZeroExSendTokenQuantity || ether(1);
      nonCTokenZeroExReceiveTokenQuantity = ether(1);

      exchangeIssuanceReceiveTokenQuantity =
        zeroExReceiveTokenQuantity.plus(nonCTokenZeroExReceiveTokenQuantity).plus(kyberReceiveTokenQuantity);

      totalReceiveAmount = exchangeIssuanceReceiveTokenQuantity.plus(receiveTokenRequiredToIssueBaseSet);

      // ----------------------------------------------------------------------
      // Exchange Issuance Set up
      // ----------------------------------------------------------------------

      // Generate exchangeRedeem data
      exchangeRedeemSetAddress = baseSetToken.address;
      exchangeRedeemQuantity = customExchangeRedeemQuantity || baseSetRedeemQuantity;
      exchangeRedeemSendTokenExchangeIds =
        [SetUtils.EXCHANGES.ZERO_EX, SetUtils.EXCHANGES.KYBER, SetUtils.EXCHANGES.ZERO_EX];
      exchangeRedeemSendTokens = [componentAddresses[0], componentAddresses[1], componentAddresses[2]];

      zeroExSendTokenQuantity = customZeroExSendTokenQuantity ||
        componentUnits[0].mul(exchangeRedeemQuantity).div(baseSetNaturalUnit);
      kyberSendTokenQuantity = componentUnits[1].mul(exchangeRedeemQuantity).div(baseSetNaturalUnit);
      const nonCTokenZeroExSendTokenQuantity = componentUnits[2].mul(exchangeRedeemQuantity).div(baseSetNaturalUnit);

      exchangeRedeemSendTokenAmounts =
        [zeroExSendTokenQuantity, kyberSendTokenQuantity, nonCTokenZeroExSendTokenQuantity];
      exchangeRedeemReceiveTokens = [receiveToken.address];
      exchangeRedeemReceiveTokenAmounts = [exchangeIssuanceReceiveTokenQuantity];

      const exchangeIssuanceParams = {
        setAddress:             exchangeRedeemSetAddress,
        sendTokenExchangeIds:   exchangeRedeemSendTokenExchangeIds,
        sendTokens:             exchangeRedeemSendTokens,
        sendTokenAmounts:       exchangeRedeemSendTokenAmounts,
        quantity:               exchangeRedeemQuantity,
        receiveTokens:          exchangeRedeemReceiveTokens,
        receiveTokenAmounts:    exchangeRedeemReceiveTokenAmounts,
      };

      // ----------------------------------------------------------------------
      // 0x Order Set up
      // ----------------------------------------------------------------------

      const makerAsset = exchangeRedeemReceiveTokens[0];
      const takerAsset = baseSetUnderlyingComponent.address;

      zeroExMakerAssetAmount = customZeroExReceiveTokenAmount || zeroExReceiveTokenQuantity;
      // Taker is transacting in cToken underlying
      zeroExTakerAssetAmount = await compoundHelper.cTokenToUnderlying(
        exchangeRedeemSendTokens[0],
        exchangeRedeemSendTokenAmounts[0]
      );

      zeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                                         // senderAddress
        zeroExOrderMaker,                                                     // makerAddress
        NULL_ADDRESS,                                                         // takerAddress
        ZERO,                                                                 // makerFee
        ZERO,                                                                 // takerFee
        zeroExMakerAssetAmount,                                               // makerAssetAmount
        zeroExTakerAssetAmount,                                               // takerAssetAmount
        makerAsset,                                                           // makerAssetAddress
        takerAsset,                                                           // takerAssetAddress
        SetUtils.generateSalt(),                                              // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,                                // exchangeAddress
        NULL_ADDRESS,                                                         // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),                                // expirationTimeSeconds
        zeroExTakerAssetAmount,                                               // amount of zeroExOrder to fill
      );

      // Approve weth to the transfer proxy
      await erc20Helper.approveTransfersAsync(
        [receiveToken],
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        zeroExOrderMaker
      );

      // Fund zero Ex Order Maker
      await erc20Helper.transferTokenAsync(
        receiveToken,
        zeroExOrderMaker,
        zeroExMakerAssetAmount,
        ownerAccount,
      );

      // ----------------------------------------------------------------------
      // Kyber Trade Set up
      // ----------------------------------------------------------------------
      const maxDestinationQuantity = kyberReceiveTokenQuantity;
      const sourceTokenQuantity =
        await compoundHelper.cTokenToUnderlying(exchangeRedeemSendTokens[1], exchangeRedeemSendTokenAmounts[1]);
      const destinationTokenDecimals = (await weth.decimals.callAsync()).toNumber();
      const sourceTokenDecimals = (await baseSetUnderlyingComponent2.decimals.callAsync()).toNumber();
      kyberConversionRatePower = new BigNumber(10).pow(18 + sourceTokenDecimals - destinationTokenDecimals);
      const minimumConversionRate = maxDestinationQuantity.div(sourceTokenQuantity)
                                                          .mul(kyberConversionRatePower)
                                                          .round();

      kyberTrade = {
        sourceToken: baseSetUnderlyingComponent2.address,
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

      await kyberNetworkHelper.setConversionRates(
        baseSetUnderlyingComponent2.address,
        receiveToken.address,
        sourceTokenQuantity,
        maxDestinationQuantity,
      );

      // Fund Kyber Reserve Operator
      await erc20Helper.transferTokenAsync(
        receiveToken,
        kyberReserveOperator,
        kyberTrade.maxDestinationQuantity,
        ownerAccount,
      );

      // ----------------------------------------------------------------------
      // Non cToken 0x Order Set up
      // ----------------------------------------------------------------------

      const nonCTokenMakerAsset = exchangeRedeemReceiveTokens[0];
      const nonCTokenTakerAsset = baseSetComponent3.address;

      const nonCTokenZeroExMakerAssetAmount = nonCTokenZeroExReceiveTokenQuantity;
      // Taker is transacting in cToken underlying
      const nonCTokenZeroExTakerAssetAmount = exchangeRedeemSendTokenAmounts[2];

      const nonZeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                                         // senderAddress
        zeroExOrderMaker,                                                     // makerAddress
        NULL_ADDRESS,                                                         // takerAddress
        ZERO,                                                                 // makerFee
        ZERO,                                                                 // takerFee
        nonCTokenZeroExMakerAssetAmount,                                      // makerAssetAmount
        nonCTokenZeroExTakerAssetAmount,                                      // takerAssetAmount
        nonCTokenMakerAsset,                                                  // makerAssetAddress
        nonCTokenTakerAsset,                                                  // takerAssetAddress
        SetUtils.generateSalt(),                                              // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,                                // exchangeAddress
        NULL_ADDRESS,                                                         // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),                                // expirationTimeSeconds
        nonCTokenZeroExTakerAssetAmount,                                      // amount of zeroExOrder to fill
      );


      // Approve receive token
      await erc20Helper.approveTransfersAsync(
        [receiveToken],
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        zeroExOrderMaker
      );

      // Fund zero Ex Order Maker
      await erc20Helper.transferTokenAsync(
        receiveToken,
        zeroExOrderMaker,
        nonCTokenZeroExMakerAssetAmount,
        ownerAccount,
      );

      // ----------------------------------------------------------------------
      // Rebalancing Set Issuance
      // ----------------------------------------------------------------------

      // Mint cTokens from underlying for the send tokens
      await erc20Helper.approveTransfersAsync([baseSetUnderlyingComponent], baseSetComponent.address);
      await erc20Helper.approveTransfersAsync([baseSetUnderlyingComponent2], baseSetComponent2.address);
      await erc20Helper.approveTransfersAsync([receiveToken], receiveTokenComponent.address);

      await compoundHelper.mintCToken(
        baseSetComponent.address,
        DEPLOYED_TOKEN_QUANTITY
      );
      await compoundHelper.mintCToken(
        baseSetComponent2.address,
        DEPLOYED_TOKEN_QUANTITY
      );
      await compoundHelper.mintCToken(
        receiveTokenComponent.address,
        receiveTokenRequiredToIssueBaseSet
      );

      // Approve base components to transfer proxy
      await erc20Helper.approveTransfersAsync(
        [baseSetComponent, baseSetComponent2, baseSetComponent3, receiveTokenComponent],
        transferProxy.address,
        ownerAccount
      );

      // Issue the Base Set to the vault under ownerAccount
      await core.issueInVault.sendTransactionAsync(
        baseSetToken.address,
        baseSetRedeemQuantity,
        { gas: DEFAULT_GAS }
      );

      // Issue the RB Set under ownerAccount
      await core.issue.sendTransactionAsync(
        rebalancingSetToken.address,
        rebalancingSetRedeemQuantity,
        { gas: DEFAULT_GAS }
      );

      // Transfer RB Set to tokenPurchaser
      await erc20Helper.transferTokenAsync(
        rebalancingSetToken,
        tokenPurchaser,
        rebalancingSetRedeemQuantity
      );

      // ----------------------------------------------------------------------
      // Subject Parameter Definitions
      // ----------------------------------------------------------------------

      subjectRebalancingSetAddress = rebalancingSetToken.address;
      subjectRebalancingSetQuantity = rebalancingSetRedeemQuantity;
      subjectReceiveTokenAddress = receiveToken.address;
      subjectExchangeIssuanceParams = exchangeIssuanceParams;
      subjectExchangeOrdersData = setUtils.generateSerializedOrders([zeroExOrder, kyberTrade, nonZeroExOrder]);
      subjectKeepChangeInVault = false;
      subjectCaller = tokenPurchaser;
    });

    afterEach(async () => {
      customExchangeRedeemQuantity = undefined;
    });

    async function subject(): Promise<string> {
      return rebalancingSetCTokenExchangeIssuanceModule.redeemRebalancingSetIntoERC20.sendTransactionAsync(
        subjectRebalancingSetAddress,
        subjectRebalancingSetQuantity,
        subjectReceiveTokenAddress,
        subjectExchangeIssuanceParams,
        subjectExchangeOrdersData,
        subjectKeepChangeInVault,
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

    it('should increment the users receive balance by the correct quantity', async () => {
      const previousReceiveBalance = await receiveToken.balanceOf.callAsync(subjectCaller);

      await subject();
      const expectedReceiveBalance = previousReceiveBalance.add(totalReceiveAmount);
      const currentReceiveBalance = await receiveToken.balanceOf.callAsync(subjectCaller);

      expect(currentReceiveBalance).to.bignumber.equal(expectedReceiveBalance);
    });

    it('increases the 0x makers send token quantity properly', async () => {
      const previousTakerTokenBalance = await baseSetUnderlyingComponent.balanceOf.callAsync(zeroExOrderMaker);
      const underlyingReceiveTokenAmount = await compoundHelper.cTokenToUnderlying(
        exchangeRedeemSendTokens[0],
        exchangeRedeemSendTokenAmounts[0]
      );
      const expectedTakerTokenBalance = previousTakerTokenBalance.add(underlyingReceiveTokenAmount);

      await subject();

      const currentTakerTokenBalance = await baseSetUnderlyingComponent.balanceOf.callAsync(zeroExOrderMaker);
      expect(expectedTakerTokenBalance).to.bignumber.equal(currentTakerTokenBalance);
    });

    it('emits correct LogPayableExchangeRedeem event', async () => {
      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = LogPayableExchangeRedeem(
        subjectRebalancingSetAddress,
        subjectCaller,
        receiveToken.address,
        subjectRebalancingSetQuantity,
        totalReceiveAmount,
        rebalancingSetCTokenExchangeIssuanceModule.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the Set has a component that has not been exchanged', async () => {
      let nonExchangedNonWethComponent: StandardTokenMockContract;

      before(async () => {
        customBaseSetUnderlying = await erc20Helper.deployTokenAsync(
          ownerAccount,
          18,
        );
        const customComponentAddress =
          await compoundHelper.deployMockCUSDC(customBaseSetUnderlying.address, ownerAccount);
        await compoundHelper.enableCToken(customComponentAddress);
        customBaseSetComponent = await erc20Helper.getTokenInstanceAsync(customComponentAddress);

        customBaseSetUnderlying2 = await erc20Helper.deployTokenAsync(
          ownerAccount,
          18,
        );
        const customComponentAddress2 =
          await compoundHelper.deployMockCDAI(customBaseSetUnderlying2.address, ownerAccount);
        await compoundHelper.enableCToken(customComponentAddress2);
        customBaseSetComponent2 = await erc20Helper.getTokenInstanceAsync(customComponentAddress2);

        await cTokenWhiteList.addPair.sendTransactionAsync(
          customBaseSetComponent.address,
          customBaseSetUnderlying.address,
          { gas: DEFAULT_GAS }
        );
        await cTokenWhiteList.addPair.sendTransactionAsync(
          customBaseSetComponent2.address,
          customBaseSetUnderlying2.address,
          { gas: DEFAULT_GAS }
        );

        customBaseSetComponent3 = await erc20Helper.deployTokenAsync(ownerAccount);

        nonExchangedNonWethComponent = await erc20Helper.deployTokenAsync(ownerAccount);

        customComponentAddresses = [
          customBaseSetComponent.address,
          customBaseSetComponent2.address,
          customBaseSetComponent3.address,
          nonExchangedNonWethComponent.address,
        ];
        customComponentUnits = [
          new BigNumber(10 ** 18),
          new BigNumber(10 ** 18),
          new BigNumber(10 ** 18),
          new BigNumber(10 ** 18),
        ];

        await erc20Helper.approveTransfersAsync(
          [nonExchangedNonWethComponent],
          transferProxy.address,
          ownerAccount
        );
      });

      after(async () => {
        customBaseSetComponent = undefined;
        customBaseSetComponent2 = undefined;
        customBaseSetComponent3 = undefined;
        customBaseSetUnderlying = undefined;
        customBaseSetUnderlying2 = undefined;
        customComponentAddresses = undefined;
        customComponentUnits = undefined;
      });

      it('should send the extra asset to the caller', async () => {
        const previousReturnedAssetBalance = await nonExchangedNonWethComponent.balanceOf.callAsync(subjectCaller);
        const expectedReturnedAssetBalance = previousReturnedAssetBalance.add(
          customComponentUnits[3].mul(exchangeRedeemQuantity).div(baseSetNaturalUnit)
        );

        await subject();

        const currentReturnedAssetBalance = await nonExchangedNonWethComponent.balanceOf.callAsync(subjectCaller);
        expect(expectedReturnedAssetBalance).to.bignumber.equal(currentReturnedAssetBalance);
      });
    });

    describe('when the 0x order receiveToken quantity is greater than specified', async () => {
      before(async () => {
        customZeroExReceiveTokenAmount = ether(2);
      });

      after(async () => {
        customZeroExReceiveTokenAmount = undefined;
      });

      it('should increment the users eth balance by the correct quantity', async () => {
        const previousReceiveBalance = await receiveToken.balanceOf.callAsync(subjectCaller);

        await subject();

        const expectedReceiveBalance = previousReceiveBalance
                                     .add(totalReceiveAmount)
                                     .add(customZeroExReceiveTokenAmount)
                                     .sub(zeroExReceiveTokenQuantity);
        const currentReceiveBalance = await receiveToken.balanceOf.callAsync(subjectCaller);
        expect(currentReceiveBalance).to.bignumber.equal(expectedReceiveBalance);
      });
    });

    describe('when the quantity of underlying send token is less than the components redeemed', async () => {
      let halfBaseComponentQuantity: BigNumber;

      before(async () => {
        const componentUnit = new BigNumber(10 ** 18);
        const naturalUnit = new BigNumber(10 ** 17);
        const redeemQuantity = new BigNumber(10 ** 18);

        halfBaseComponentQuantity =  componentUnit.mul(redeemQuantity).div(naturalUnit).div(2);

        customZeroExSendTokenQuantity = halfBaseComponentQuantity;
      });

      after(async () => {
        customZeroExSendTokenQuantity = undefined;
      });

      it('should send the unsold components to the caller', async () => {
        const previousReturnedAssetBalance = await baseSetUnderlyingComponent.balanceOf.callAsync(subjectCaller);
        const halfBaseUnderlyingQuantity =
          await compoundHelper.cTokenToUnderlying(baseSetComponent.address, halfBaseComponentQuantity);
        const expectedReturnedAssetBalance = previousReturnedAssetBalance.add(halfBaseUnderlyingQuantity);
        await subject();
        const currentReturnedAssetBalance = await baseSetUnderlyingComponent.balanceOf.callAsync(subjectCaller);
        expect(expectedReturnedAssetBalance).to.bignumber.equal(currentReturnedAssetBalance);
      });
    });

    describe('when the implied base Set quantity is greater than the issuance params base Set quantity', async () => {
      let excessBaseSetQuantity: BigNumber;

      beforeEach(async () => {
        const excessNonExchangedQuantity = receiveTokenRequiredToIssueBaseSet.mul(2);
        excessBaseSetQuantity = exchangeRedeemQuantity.mul(2);

        // Approve and mint cToken from receive token underlying
        await compoundHelper.mintCToken(
          receiveTokenComponent.address,
          excessNonExchangedQuantity,
        );

        // Issue the Base Set to the vault
        await core.issueInVault.sendTransactionAsync(
          baseSetToken.address,
          excessBaseSetQuantity,
          { from: ownerAccount, gas: DEFAULT_GAS }
        );

        // Issue the Rebalancing Set
        const excessRebalancingSetQuantity = excessBaseSetQuantity
                                         .mul(DEFAULT_REBALANCING_NATURAL_UNIT)
                                         .div(rebalancingUnitShares);
        await core.issue.sendTransactionAsync(
          rebalancingSetToken.address,
          excessRebalancingSetQuantity,
          { from: ownerAccount, gas: DEFAULT_GAS }
        );

        // Transfer RB Set to caller
        await erc20Helper.transferTokenAsync(
          rebalancingSetToken,
          tokenPurchaser,
          excessRebalancingSetQuantity,
          ownerAccount,
        );

        subjectRebalancingSetQuantity = subjectRebalancingSetQuantity.add(excessRebalancingSetQuantity);
      });

      it('should return the excess base Set to the caller', async () => {
        const previousReturnedAssetBalance = await baseSetToken.balanceOf.callAsync(subjectCaller);
        const expectedReturnedAssetBalance = previousReturnedAssetBalance.add(excessBaseSetQuantity);

        await subject();

        const currentReturnedAssetBalance = await baseSetToken.balanceOf.callAsync(subjectCaller);
        expect(currentReturnedAssetBalance).to.bignumber.equal(expectedReturnedAssetBalance);
      });

      describe('and keepChangeInVault is true', async () => {
        beforeEach(async () => {
          subjectKeepChangeInVault = true;
        });

        it('refunds the user the appropriate amount of base Set to the Vault', async () => {
          const previousReturnedAssetBalance = await vault.getOwnerBalance.callAsync(
            baseSetToken.address,
            subjectCaller
          );
          const expectedReturnedAssetBalance = previousReturnedAssetBalance.add(excessBaseSetQuantity);

          await subject();

          const currentReturnedAssetBalance = await vault.getOwnerBalance.callAsync(
            baseSetToken.address,
            subjectCaller
          );
          expect(currentReturnedAssetBalance).to.bignumber.equal(expectedReturnedAssetBalance);
        });
      });
    });

    describe('when the receive tokens length is greater than 1 and there are duplicates', async () => {
      beforeEach(async () => {
        subjectExchangeIssuanceParams.receiveTokens = [receiveToken.address, receiveToken.address];
        subjectExchangeIssuanceParams.receiveTokenAmounts = [new BigNumber(1), new BigNumber(1)];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the receive token is not correct', async () => {
      beforeEach(async () => {
        const baseSetComponent = await erc20Helper.deployTokenAsync(zeroExOrderMaker);
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

    describe('when the rebalancingSetQuantity is zero', async () => {
      beforeEach(async () => {
        subjectRebalancingSetQuantity = ZERO;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the rebalancingSetAddress is not tracked by Core', async () => {
      beforeEach(async () => {
        const proposalPeriod = ONE_DAY_IN_SECONDS;
        const rebalanceInterval = ONE_DAY_IN_SECONDS;
        const unTrackedSetToken = await rebalancingHelper.deployRebalancingSetTokenAsync(
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

    describe('when the Set is only made of three components', async () => {
      before(async () => {
        customBaseSetUnderlying = await erc20Helper.deployTokenAsync(
          ownerAccount,
          18,
        );
        const customComponentAddress =
          await compoundHelper.deployMockCUSDC(customBaseSetUnderlying.address, ownerAccount);
        await compoundHelper.enableCToken(customComponentAddress);
        customBaseSetComponent = await erc20Helper.getTokenInstanceAsync(customComponentAddress);

        customBaseSetUnderlying2 = await erc20Helper.deployTokenAsync(
          ownerAccount,
          18,
        );
        const customComponentAddress2 =
          await compoundHelper.deployMockCDAI(customBaseSetUnderlying2.address, ownerAccount);
        await compoundHelper.enableCToken(customComponentAddress2);
        customBaseSetComponent2 = await erc20Helper.getTokenInstanceAsync(customComponentAddress2);

        await cTokenWhiteList.addPair.sendTransactionAsync(
          customBaseSetComponent.address,
          customBaseSetUnderlying.address,
          { gas: DEFAULT_GAS }
        );
        await cTokenWhiteList.addPair.sendTransactionAsync(
          customBaseSetComponent2.address,
          customBaseSetUnderlying2.address,
          { gas: DEFAULT_GAS }
        );

        customBaseSetComponent3 = await erc20Helper.deployTokenAsync(ownerAccount, 18);

        customComponentAddresses =
          [customBaseSetComponent.address, customBaseSetComponent2.address, customBaseSetComponent3.address];
        customComponentUnits = [new BigNumber(10 ** 18), new BigNumber(10 ** 18), new BigNumber(10 ** 18)];
        customReceiveTokenRequiredToIssueBaseSet = new BigNumber(0);
      });

      it('redeems the rebalancing Set', async () => {
        const previousRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
        const expectedRBSetTokenBalance = previousRBSetTokenBalance.sub(subjectRebalancingSetQuantity);

        await subject();

        const currentRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
        expect(expectedRBSetTokenBalance).to.bignumber.equal(currentRBSetTokenBalance);
      });
    });
  });
});
