require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address, Bytes, ExchangeIssuanceParams, KyberTrade, ZeroExSignedFillOrder } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  ExchangeIssuanceModuleContract,
  RebalancingSetExchangeIssuanceModuleContract,
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
  ONE_DAY_IN_SECONDS,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
} from '@utils/constants';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ExchangeHelper } from '@utils/helpers/exchangeHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { RebalancingHelper } from '@utils/helpers/rebalancingHelper';
import { KyberNetworkHelper } from '@utils/helpers/kyberNetworkHelper';

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
  let exchangeIssuanceModule: ExchangeIssuanceModuleContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let rebalancingSetTokenFactory: RebalancingSetTokenFactoryContract;
  let setTokenFactory: SetTokenFactoryContract;
  let rebalancingSetExchangeIssuanceModule: RebalancingSetExchangeIssuanceModuleContract;
  let weth: WethMockContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const erc20Helper = new ERC20Helper(ownerAccount);
  const exchangeHelper = new ExchangeHelper(ownerAccount);
  const rebalancingHelper = new RebalancingHelper(
    ownerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );
  const kyberNetworkHelper = new KyberNetworkHelper();

  before(async () => {
    ABIDecoder.addABI(CoreContract.getAbi());
    ABIDecoder.addABI(RebalancingSetExchangeIssuanceModuleContract.getAbi());

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    core = await coreHelper.deployCoreAsync(transferProxy, vault);
    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(core.address);
    await coreHelper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

    rebalancingSetTokenFactory = await coreHelper.deployRebalancingSetTokenFactoryAsync(core.address, whitelist);
    await coreHelper.addFactoryAsync(core, rebalancingSetTokenFactory);

    exchangeIssuanceModule = await coreHelper.deployExchangeIssuanceModuleAsync(core, vault);
    await coreHelper.addModuleAsync(core, exchangeIssuanceModule.address);

    weth = await erc20Helper.deployWrappedEtherAsync(ownerAccount);

    rebalancingSetExchangeIssuanceModule = await coreHelper.deployRebalancingSetExchangeIssuanceModuleAsync(
      core.address,
      transferProxy.address,
      exchangeIssuanceModule.address,
      weth.address,
      vault.address,
    );
    await coreHelper.addModuleAsync(core, rebalancingSetExchangeIssuanceModule.address);

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
    ABIDecoder.removeABI(RebalancingSetExchangeIssuanceModuleContract.getAbi());
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
    async function subject(): Promise<RebalancingSetExchangeIssuanceModuleContract> {
      return await coreHelper.deployRebalancingSetExchangeIssuanceModuleAsync(
        core.address,
        transferProxy.address,
        exchangeIssuanceModule.address,
        weth.address,
        vault.address,
      );
    }

    it('should contain the correct address of the transfer proxy', async () => {
      const rebalancingSetExchangeIssuanceModuleContract = await subject();

      const proxyAddress = await rebalancingSetExchangeIssuanceModuleContract.transferProxyInstance.callAsync();

      expect(proxyAddress).to.equal(transferProxy.address);
    });

    it('should contain the correct address of Core', async () => {
      const rebalancingSetExchangeIssuanceModuleContract = await subject();

      const coreAddress = await rebalancingSetExchangeIssuanceModuleContract.coreInstance.callAsync();

      expect(coreAddress).to.equal(core.address);
    });

    it('should contain the correct address of Vault', async () => {
      const rebalancingSetExchangeIssuanceModuleContract = await subject();

      const vaultAddress = await rebalancingSetExchangeIssuanceModuleContract.vaultInstance.callAsync();

      expect(vaultAddress).to.equal(vault.address);
    });

    it('should contain the correct address of Wrapped Ether', async () => {
      const rebalancingSetExchangeIssuanceModuleContract = await subject();

      const wethAddress = await rebalancingSetExchangeIssuanceModuleContract.wethInstance.callAsync();

      expect(wethAddress).to.equal(weth.address);
    });

    it('should contain the correct address of the exchangeIssuanceModule', async () => {
      const rebalancingSetExchangeIssuanceModuleContract = await subject();

      const exchangeIssuanceModuleAddress = await rebalancingSetExchangeIssuanceModuleContract
      .exchangeIssuanceModuleInstance.callAsync();

      expect(exchangeIssuanceModuleAddress).to.equal(exchangeIssuanceModule.address);
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
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    let customComponents: Address[];
    let customComponentUnits: BigNumber[];
    let customBaseSetComponent: StandardTokenMockContract;
    let customBaseSetComponent2: StandardTokenMockContract;

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
      baseSetComponent = customBaseSetComponent || await erc20Helper.deployTokenAsync(ownerAccount);
      baseSetComponent2 = customBaseSetComponent2 || await erc20Helper.deployTokenAsync(ownerAccount);

      // Create the Set (default is 3 components)
      const componentAddresses = customComponents || [
        baseSetComponent.address, baseSetComponent2.address, weth.address,
      ];
      const componentUnits = customComponentUnits || [
        new BigNumber(10 ** 18), new BigNumber(10 ** 18), new BigNumber(10 ** 18),
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
        baseSetIssueQuantity.mul(componentUnits[2]).div(baseSetNaturalUnit);

      // ----------------------------------------------------------------------
      // Payment / Send Token Details
      // ----------------------------------------------------------------------

      kyberSendTokenQuantity = new BigNumber(10 ** 18);
      zeroExSendTokenQuantity = customZeroExSendTokenQuantity || new BigNumber(10 ** 18);

      exchangeIssuanceSendTokenQuantity = customExchangeIssuanceSendTokenQuantity ||
        kyberSendTokenQuantity.plus(zeroExSendTokenQuantity);

      totalEther = exchangeIssuanceSendTokenQuantity.plus(wethRequiredToIssueBaseSet);

      // ----------------------------------------------------------------------
      // Exchange Issuance Set up
      // ----------------------------------------------------------------------

      // Generate exchange issue data
      exchangeIssueSetAddress = baseSetToken.address;
      exchangeIssueQuantity = customExchangeIssuanceBaseSetIssueQuantity || baseSetIssueQuantity;
      exchangeIssueSendTokenExchangeIds = [SetUtils.EXCHANGES.ZERO_EX, SetUtils.EXCHANGES.KYBER];
      exchangeIssueSendTokens = [weth.address, weth.address];
      exchangeIssueSendTokenAmounts = [zeroExSendTokenQuantity, kyberSendTokenQuantity];

      const zeroExReceiveTokenAmount = componentUnits[0].mul(exchangeIssueQuantity).div(baseSetNaturalUnit);
      const kyberReceiveTokenAmount = componentUnits[1].mul(exchangeIssueQuantity).div(baseSetNaturalUnit);

      exchangeIssueReceiveTokens = [componentAddresses[0], componentAddresses[1]];
      exchangeIssueReceiveTokenAmounts = [
        zeroExReceiveTokenAmount,
        kyberReceiveTokenAmount,
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
      // 0x Order Set up
      // ----------------------------------------------------------------------

      const makerAsset = exchangeIssueReceiveTokens[0];
      const takerAsset = exchangeIssueSendTokens[0];

      zeroExMakerAssetAmount = customZeroExReceiveTokenAmount || exchangeIssueReceiveTokenAmounts[0];
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
        [baseSetComponent],
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        zeroExOrderMaker
      );

      // Fund zero Ex Order Maker
      await erc20Helper.transferTokenAsync(
        baseSetComponent,
        zeroExOrderMaker,
        zeroExMakerAssetAmount,
        ownerAccount,
      );

      // ----------------------------------------------------------------------
      // Kyber Trade Set up
      // ----------------------------------------------------------------------
      const maxDestinationQuantity = exchangeIssueReceiveTokenAmounts[1];
      const componentTokenDecimals = (await baseSetComponent2.decimals.callAsync()).toNumber();
      const sourceTokenDecimals = (await weth.decimals.callAsync()).toNumber();
      kyberConversionRatePower = new BigNumber(10).pow(18 + sourceTokenDecimals - componentTokenDecimals);
      const minimumConversionRate = maxDestinationQuantity.div(kyberSendTokenQuantity)
                                                          .mul(kyberConversionRatePower)
                                                          .round();

      kyberTrade = {
        sourceToken: weth.address,
        destinationToken: baseSetComponent2.address,
        sourceTokenQuantity: kyberSendTokenQuantity,
        minimumConversionRate: minimumConversionRate,
        maxDestinationQuantity: maxDestinationQuantity,
      } as KyberTrade;

      await kyberNetworkHelper.approveToReserve(
        baseSetComponent2,
        UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
        kyberReserveOperator,
      );

      await kyberNetworkHelper.setConversionRates(
        weth.address,
        baseSetComponent2.address,
        kyberSendTokenQuantity,
        maxDestinationQuantity,
      );

      // Fund Kyber Reserve Operator
      await erc20Helper.transferTokenAsync(
        baseSetComponent2,
        kyberReserveOperator,
        kyberTrade.maxDestinationQuantity,
        ownerAccount,
      );

      // ----------------------------------------------------------------------
      // Subject Parameter Definitions
      // ----------------------------------------------------------------------

      subjectRebalancingSetAddress = rebalancingSetToken.address;
      subjectRebalancingSetQuantity = rebalancingSetIssueQuantity;
      subjectExchangeIssuanceParams = exchangeIssuanceParams;
      subjectExchangeOrdersData = setUtils.generateSerializedOrders([zeroExOrder, kyberTrade]);
      subjectKeepChangeInVault = false;
      subjectCaller = tokenPurchaser;
      subjectEtherValue = totalEther.toString();
    });

    afterEach(async () => {
      customExchangeIssuanceSendTokenQuantity = undefined;
      customExchangeIssuanceBaseSetIssueQuantity = undefined;
      customComponents = undefined;
      customComponentUnits = undefined;
      customWethRequiredToIssueBaseSet = undefined;
    });

    async function subject(): Promise<string> {
      return rebalancingSetExchangeIssuanceModule.issueRebalancingSetWithEther.sendTransactionAsync(
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
        rebalancingSetExchangeIssuanceModule.address,
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when more exchangeIssuance send token is sent than required by trades', async () => {
      const excessEth = new BigNumber(10 ** 10);

      describe('', async () => {
        before(async () => {
          customExchangeIssuanceSendTokenQuantity = new BigNumber(2).mul(10 ** 18).plus(excessEth);
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
          customExchangeIssuanceSendTokenQuantity = new BigNumber(2).mul(10 ** 18).plus(excessEth);
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
            rebalancingSetExchangeIssuanceModule.address,
          );

          await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
        });
      });
    });

    describe('when zeroEx sendToken amount is greater than amount needed to execute 0x trade', async () => {
      before(async () => {
        customWethUsedInZeroExTrade = new BigNumber(10 ** 18);
        customZeroExSendTokenQuantity = new BigNumber(10 ** 18).times(2);
      });

      it('refunds the unused Ether from the 0x trade', async () => {
        const previousEthBalance: BigNumber = new BigNumber(await web3.eth.getBalance(subjectCaller));

        const txHash = await subject();
        const totalGasInEth = await getGasUsageInEth(txHash);
        const expectedEthBalance = previousEthBalance
                                    .sub(customWethUsedInZeroExTrade)
                                    .sub(kyberSendTokenQuantity)
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
        customZeroExReceiveTokenAmount = ether(10);
      });

      it('returns the user the leftover receive token amount', async () => {
        const previousBalance = await baseSetComponent.balanceOf.callAsync(subjectCaller);

        await subject();

        const expectedOwnerBalance = previousBalance
                                       .add(customZeroExReceiveTokenAmount)
                                       .sub(zeroExMakerAssetAmount);
        const ownerBalance = await baseSetComponent.balanceOf.callAsync(subjectCaller);

        expect(ownerBalance).to.bignumber.equal(expectedOwnerBalance);
      });
    });

    describe('when the wrapper does not have enough allowance to transfer weth', async () => {
      beforeEach(async () => {
        await weth.changeAllowanceProxy.sendTransactionAsync(
          rebalancingSetExchangeIssuanceModule.address,
          transferProxy.address,
          new BigNumber(0),
          { gas: DEFAULT_GAS }
        );
      });

      it('resets the transferProxy allowance', async () => {
        const wethAllowance = await weth.allowance.callAsync(
          rebalancingSetExchangeIssuanceModule.address,
          transferProxy.address
        );
        expect(wethAllowance).to.bignumber.equal(ZERO);

        await subject();

        const expectedWethAllowance = UNLIMITED_ALLOWANCE_IN_BASE_UNITS;
        const newWethAllowance = await weth.allowance.callAsync(
          rebalancingSetExchangeIssuanceModule.address,
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

    describe('when the Set is only made of two components', async () => {
      before(async () => {
        customBaseSetComponent = await erc20Helper.deployTokenAsync(ownerAccount);
        customBaseSetComponent2 = await erc20Helper.deployTokenAsync(ownerAccount);

        customComponents = [customBaseSetComponent.address, customBaseSetComponent2.address];
        customComponentUnits = [new BigNumber(10 ** 18), new BigNumber(10 ** 18)];
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
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    let customComponents: Address[];
    let customComponentUnits: BigNumber[];
    let customBaseSetComponent: StandardTokenMockContract;
    let customBaseSetComponent2: StandardTokenMockContract;

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
    let totalWrappedEther: BigNumber;

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
      baseSetComponent = customBaseSetComponent || await erc20Helper.deployTokenAsync(ownerAccount);
      baseSetComponent2 = customBaseSetComponent2 || await erc20Helper.deployTokenAsync(ownerAccount);

      // Create the Set (default is 3 components)
      const componentAddresses = customComponents || [
        baseSetComponent.address, baseSetComponent2.address, weth.address,
      ];
      const componentUnits = customComponentUnits || [
        new BigNumber(10 ** 18), new BigNumber(10 ** 18), new BigNumber(10 ** 18),
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
        baseSetIssueQuantity.mul(componentUnits[2]).div(baseSetNaturalUnit);

      // ----------------------------------------------------------------------
      // Payment / Send Token Details
      // ----------------------------------------------------------------------

      kyberSendTokenQuantity = new BigNumber(10 ** 18);
      zeroExSendTokenQuantity = customZeroExSendTokenQuantity || new BigNumber(10 ** 18);

      exchangeIssuanceSendTokenQuantity = customExchangeIssuanceSendTokenQuantity ||
        kyberSendTokenQuantity.plus(zeroExSendTokenQuantity);

      totalWrappedEther = exchangeIssuanceSendTokenQuantity.plus(wethRequiredToIssueBaseSet);

      // ----------------------------------------------------------------------
      // Exchange Issuance Set up
      // ----------------------------------------------------------------------

      // Generate exchange issue data
      exchangeIssueSetAddress = baseSetToken.address;
      exchangeIssueQuantity = customExchangeIssuanceBaseSetIssueQuantity || baseSetIssueQuantity;
      exchangeIssueSendTokenExchangeIds = [SetUtils.EXCHANGES.ZERO_EX, SetUtils.EXCHANGES.KYBER];
      exchangeIssueSendTokens = [weth.address, weth.address];
      exchangeIssueSendTokenAmounts = [zeroExSendTokenQuantity, kyberSendTokenQuantity];

      const zeroExReceiveTokenAmount = componentUnits[0].mul(exchangeIssueQuantity).div(baseSetNaturalUnit);
      const kyberReceiveTokenAmount = componentUnits[1].mul(exchangeIssueQuantity).div(baseSetNaturalUnit);

      exchangeIssueReceiveTokens = [componentAddresses[0], componentAddresses[1]];
      exchangeIssueReceiveTokenAmounts = [
        zeroExReceiveTokenAmount,
        kyberReceiveTokenAmount,
      ];

      const exchangeIssuanceParams = {
        setAddress:             exchangeIssueSetAddress,
        sendTokenExchangeIds:   exchangeIssueSendTokenExchangeIds,
        sendTokens:             exchangeIssueSendTokens,
        sendTokenAmounts:       exchangeIssueSendTokenAmounts,
        quantity:               exchangeIssueQuantity,
        receiveTokens:           exchangeIssueReceiveTokens,
        receiveTokenAmounts:     exchangeIssueReceiveTokenAmounts,
      };

      // ----------------------------------------------------------------------
      // 0x Order Set up
      // ----------------------------------------------------------------------

      const makerAsset = exchangeIssueReceiveTokens[0];
      const takerAsset = exchangeIssueSendTokens[0];

      zeroExMakerAssetAmount = customZeroExReceiveTokenAmount || exchangeIssueReceiveTokenAmounts[0];
      zeroExTakerAssetAmount = customWethUsedInZeroExTrade || exchangeIssueSendTokenAmounts[0];

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
        [baseSetComponent],
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        zeroExOrderMaker
      );

      // Fund zero Ex Order Maker
      await erc20Helper.transferTokenAsync(
        baseSetComponent,
        zeroExOrderMaker,
        zeroExMakerAssetAmount,
        ownerAccount,
      );

      // ----------------------------------------------------------------------
      // Kyber Trade Set up
      // ----------------------------------------------------------------------
      const maxDestinationQuantity = exchangeIssueReceiveTokenAmounts[1];
      const componentTokenDecimals = (await baseSetComponent2.decimals.callAsync()).toNumber();
      const sourceTokenDecimals = (await weth.decimals.callAsync()).toNumber();
      kyberConversionRatePower = new BigNumber(10).pow(18 + sourceTokenDecimals - componentTokenDecimals);
      const minimumConversionRate = maxDestinationQuantity.div(kyberSendTokenQuantity)
                                                          .mul(kyberConversionRatePower)
                                                          .round();

      kyberTrade = {
        sourceToken: weth.address,
        destinationToken: baseSetComponent2.address,
        sourceTokenQuantity: kyberSendTokenQuantity,
        minimumConversionRate: minimumConversionRate,
        maxDestinationQuantity: maxDestinationQuantity,
      } as KyberTrade;

      await kyberNetworkHelper.approveToReserve(
        baseSetComponent2,
        UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
        kyberReserveOperator,
      );

      await kyberNetworkHelper.setConversionRates(
        weth.address,
        baseSetComponent2.address,
        kyberSendTokenQuantity,
        maxDestinationQuantity,
      );

      // Fund Kyber Reserve Operator
      await erc20Helper.transferTokenAsync(
        baseSetComponent2,
        kyberReserveOperator,
        kyberTrade.maxDestinationQuantity,
        ownerAccount,
      );

      // ----------------------------------------------------------------------
      // Subject Parameter Definitions
      // ----------------------------------------------------------------------

      subjectRebalancingSetAddress = rebalancingSetToken.address;
      subjectRebalancingSetQuantity = rebalancingSetIssueQuantity;
      subjectPaymentTokenAddress = weth.address;
      subjectPaymentTokenQuantity = totalWrappedEther;
      subjectExchangeIssuanceParams = exchangeIssuanceParams;
      subjectExchangeOrdersData = setUtils.generateSerializedOrders([zeroExOrder, kyberTrade]);
      subjectKeepChangeInVault = false;
      subjectCaller = tokenPurchaser;

      // ----------------------------------------------------------------------
      // Wrap eth and deposit
      // ----------------------------------------------------------------------
      await weth.deposit.sendTransactionAsync({
        from: tokenPurchaser,
        gas: DEFAULT_GAS,
        value: subjectPaymentTokenQuantity.toString(),
      });

      await erc20Helper.approveTransfersAsync(
        [weth],
        transferProxy.address,
        tokenPurchaser,
      );
    });

    afterEach(async () => {
      customExchangeIssuanceSendTokenQuantity = undefined;
      customExchangeIssuanceBaseSetIssueQuantity = undefined;
      customComponents = undefined;
      customComponentUnits = undefined;
      customWethRequiredToIssueBaseSet = undefined;
    });

    async function subject(): Promise<string> {
      return rebalancingSetExchangeIssuanceModule.issueRebalancingSetWithERC20.sendTransactionAsync(
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

    it('uses an expected amount of wrapped Eth', async () => {
      const previousWethBalance: BigNumber = await weth.balanceOf.callAsync(subjectCaller);

      await subject();
      const expectedWethBalance = previousWethBalance.sub(subjectPaymentTokenQuantity);

      const currentWethBalance = await weth.balanceOf.callAsync(subjectCaller);
      expect(expectedWethBalance).to.bignumber.equal(currentWethBalance);
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
        rebalancingSetExchangeIssuanceModule.address,
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when more exchangeIssuance send token is sent than required by trades', async () => {
      const excessEth = new BigNumber(10 ** 10);

      describe('', async () => {
        before(async () => {
          customExchangeIssuanceSendTokenQuantity = new BigNumber(2).mul(10 ** 18).plus(excessEth);
        });

        it('refunds the caller the appropriate amount of eth', async () => {
          const previousWethBalance: BigNumber = await weth.balanceOf.callAsync(subjectCaller);

          await subject();
          const expectedWethBalance = previousWethBalance
                                      .sub(subjectPaymentTokenQuantity)
                                      .add(excessEth);

          const currentWethBalance: BigNumber = await weth.balanceOf.callAsync(subjectCaller);
          expect(currentWethBalance).to.bignumber.equal(expectedWethBalance);
        });
      });

      describe('', async () => {
        before(async () => {
          customExchangeIssuanceSendTokenQuantity = new BigNumber(2).mul(10 ** 18).plus(excessEth);
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
            rebalancingSetExchangeIssuanceModule.address,
          );

          await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
        });
      });
    });

    describe('when zeroEx sendToken amount is greater than amount needed to execute 0x trade', async () => {
      before(async () => {
        customWethUsedInZeroExTrade = new BigNumber(10 ** 18);
        customZeroExSendTokenQuantity = new BigNumber(10 ** 18).times(2);
      });

      it('refunds the unused wrapped Ether from the 0x trade', async () => {
        const previousWethBalance: BigNumber = await weth.balanceOf.callAsync(subjectCaller);

        await subject();
        const expectedEthBalance = previousWethBalance
                                    .sub(customWethUsedInZeroExTrade)
                                    .sub(kyberSendTokenQuantity)
                                    .sub(wethRequiredToIssueBaseSet);

        const currentEthBalance = await weth.balanceOf.callAsync(subjectCaller);
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
        customZeroExReceiveTokenAmount = ether(10);
      });

      it('returns the user the leftover receive token amount', async () => {
        const previousBalance = await baseSetComponent.balanceOf.callAsync(subjectCaller);

        await subject();

        const expectedOwnerBalance = previousBalance
                                       .add(customZeroExReceiveTokenAmount)
                                       .sub(zeroExMakerAssetAmount);
        const ownerBalance = await baseSetComponent.balanceOf.callAsync(subjectCaller);

        expect(ownerBalance).to.bignumber.equal(expectedOwnerBalance);
      });
    });

    describe('when the wrapper does not have enough allowance to transfer weth', async () => {
      beforeEach(async () => {
        await weth.changeAllowanceProxy.sendTransactionAsync(
          rebalancingSetExchangeIssuanceModule.address,
          transferProxy.address,
          new BigNumber(0),
          { gas: DEFAULT_GAS }
        );
      });

      it('resets the transferProxy allowance', async () => {
        const wethAllowance = await weth.allowance.callAsync(
          rebalancingSetExchangeIssuanceModule.address,
          transferProxy.address
        );
        expect(wethAllowance).to.bignumber.equal(ZERO);

        await subject();

        const expectedWethAllowance = UNLIMITED_ALLOWANCE_IN_BASE_UNITS;
        const newWethAllowance = await weth.allowance.callAsync(
          rebalancingSetExchangeIssuanceModule.address,
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

    describe('when the Set is only made of two components', async () => {
      before(async () => {
        customBaseSetComponent = await erc20Helper.deployTokenAsync(ownerAccount);
        customBaseSetComponent2 = await erc20Helper.deployTokenAsync(ownerAccount);

        customComponents = [customBaseSetComponent.address, customBaseSetComponent2.address];
        customComponentUnits = [new BigNumber(10 ** 18), new BigNumber(10 ** 18)];
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

  describe('#redeemRebalancingSetIntoEther', async () => {
    let subjectRebalancingSetAddress: Address;
    let subjectRebalancingSetQuantity: BigNumber;
    let subjectExchangeIssuanceParams: ExchangeIssuanceParams;
    let subjectExchangeOrdersData: Bytes;
    let subjectKeepChangeInVault: boolean;
    let subjectCaller: Address;

    let customExchangeRedeemQuantity: BigNumber;

    let customBaseSetComponent: StandardTokenMockContract;
    let customBaseSetComponent2: StandardTokenMockContract;
    let customComponentAddresses: Address[];
    let customComponentUnits: BigNumber[];


    // ----------------------------------------------------------------------
    // Component and Rebalancing Set
    // ----------------------------------------------------------------------
    let baseSetComponent: StandardTokenMockContract;
    let baseSetComponent2: StandardTokenMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    // ----------------------------------------------------------------------
    // Issuance Details
    // ----------------------------------------------------------------------
    let rebalancingSetRedeemQuantity: BigNumber;
    let baseSetRedeemQuantity: BigNumber;

    // ----------------------------------------------------------------------
    // Payment / Send Token Details
    // ----------------------------------------------------------------------
    let wethRequiredToIssueBaseSet: BigNumber;

    let zeroExReceiveTokenQuantity: BigNumber;
    let kyberReceiveTokenQuantity: BigNumber;
    let exchangeIssuanceReceiveTokenQuantity: BigNumber;

    let zeroExSendTokenQuantity: BigNumber;
    let kyberSendTokenQuantity: BigNumber;

    let totalEtherToReceive: BigNumber;

    let customZeroExSendTokenQuantity: BigNumber;
    let customWethRequiredToIssueBaseSet: BigNumber;


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

      // Create component token
      baseSetComponent = customBaseSetComponent || await erc20Helper.deployTokenAsync(tokenPurchaser);
      baseSetComponent2 = customBaseSetComponent2 || await erc20Helper.deployTokenAsync(tokenPurchaser);

      // Create the Set (2 component where one is WETH)
      const componentAddresses = customComponentAddresses ||
        [baseSetComponent.address, baseSetComponent2.address, weth.address];
      const componentUnits = customComponentUnits ||
        [new BigNumber(10 ** 18), new BigNumber(10 ** 18), new BigNumber(10 ** 18)];
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
        componentUnits[2].mul(baseSetRedeemQuantity).div(baseSetNaturalUnit);

      // ----------------------------------------------------------------------
      // Payment / Send and Receive Token Details
      // ----------------------------------------------------------------------

      kyberReceiveTokenQuantity = ether(1);
      zeroExReceiveTokenQuantity = customZeroExSendTokenQuantity || ether(1);

      exchangeIssuanceReceiveTokenQuantity = zeroExReceiveTokenQuantity.plus(kyberReceiveTokenQuantity);

      totalEtherToReceive = exchangeIssuanceReceiveTokenQuantity.plus(wethRequiredToIssueBaseSet);

      // ----------------------------------------------------------------------
      // Exchange Issuance Set up
      // ----------------------------------------------------------------------

      // Generate exchangeRedeem data
      exchangeRedeemSetAddress = baseSetToken.address;
      exchangeRedeemQuantity = customExchangeRedeemQuantity || baseSetRedeemQuantity;
      exchangeRedeemSendTokenExchangeIds = [SetUtils.EXCHANGES.ZERO_EX, SetUtils.EXCHANGES.KYBER];
      exchangeRedeemSendTokens = [componentAddresses[0], componentAddresses[1]];

      zeroExSendTokenQuantity = customZeroExSendTokenQuantity ||
        componentUnits[0].mul(exchangeRedeemQuantity).div(baseSetNaturalUnit);
      kyberSendTokenQuantity = componentUnits[1].mul(exchangeRedeemQuantity).div(baseSetNaturalUnit);

      exchangeRedeemSendTokenAmounts = [zeroExSendTokenQuantity, kyberSendTokenQuantity];
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
      const takerAsset = exchangeRedeemSendTokens[0];

      zeroExMakerAssetAmount = customZeroExReceiveTokenAmount || zeroExReceiveTokenQuantity;
      zeroExTakerAssetAmount = exchangeRedeemSendTokenAmounts[0];

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
        zeroExMakerAssetAmount,
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

      const destinationTokenDecimals = (await weth.decimals.callAsync()).toNumber();
      const sourceTokenDecimals = (await baseSetComponent2.decimals.callAsync()).toNumber();
      kyberConversionRatePower = new BigNumber(10).pow(18 + sourceTokenDecimals - destinationTokenDecimals);
      const minimumConversionRate = maxDestinationQuantity.div(kyberSendTokenQuantity)
                                                          .mul(kyberConversionRatePower)
                                                          .round();

      kyberTrade = {
        sourceToken: baseSetComponent2.address,
        destinationToken: weth.address,
        sourceTokenQuantity: kyberSendTokenQuantity,
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
        baseSetComponent2.address,
        weth.address,
        kyberSendTokenQuantity,
        maxDestinationQuantity,
      );

      // ----------------------------------------------------------------------
      // Rebalancing Set Issuance
      // ----------------------------------------------------------------------

      // Approve base component to transfer proxy
      await erc20Helper.approveTransfersAsync(
        [baseSetComponent, baseSetComponent2],
        transferProxy.address,
        tokenPurchaser
      );

      if (wethRequiredToIssueBaseSet.gt(0)) {
        // Approve Weth to the transferProxy
        await weth.approve.sendTransactionAsync(
          transferProxy.address,
          wethRequiredToIssueBaseSet,
          { from: tokenPurchaser, gas: DEFAULT_GAS }
        );

        // Generate wrapped Ether for the caller
        await weth.deposit.sendTransactionAsync(
          { from: tokenPurchaser, value: wethRequiredToIssueBaseSet.toString(), gas: DEFAULT_GAS }
        );
      }

      // Issue the Base Set to the vault
      await core.issueInVault.sendTransactionAsync(
        baseSetToken.address,
        baseSetRedeemQuantity,
        { from: tokenPurchaser, gas: DEFAULT_GAS }
      );

      await core.issue.sendTransactionAsync(
        rebalancingSetToken.address,
        rebalancingSetRedeemQuantity,
        { from: tokenPurchaser, gas: DEFAULT_GAS }
      );

      // ----------------------------------------------------------------------
      // Subject Parameter Definitions
      // ----------------------------------------------------------------------

      subjectRebalancingSetAddress = rebalancingSetToken.address;
      subjectRebalancingSetQuantity = rebalancingSetRedeemQuantity;
      subjectExchangeIssuanceParams = exchangeIssuanceParams;
      subjectExchangeOrdersData = setUtils.generateSerializedOrders([zeroExOrder, kyberTrade]);
      subjectKeepChangeInVault = false;
      subjectCaller = tokenPurchaser;
    });

    afterEach(async () => {
      customExchangeRedeemQuantity = undefined;
    });

    async function subject(): Promise<string> {
      return rebalancingSetExchangeIssuanceModule.redeemRebalancingSetIntoEther.sendTransactionAsync(
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

    it('increases the 0x makers send token quantity properly', async () => {
      const previousTakerTokenBalance = await baseSetComponent.balanceOf.callAsync(zeroExOrderMaker);
      const expectedTakerTokenBalance = previousTakerTokenBalance.add(exchangeRedeemSendTokenAmounts[0]);

      await subject();

      const currentTakerTokenBalance = await baseSetComponent.balanceOf.callAsync(zeroExOrderMaker);
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
        rebalancingSetExchangeIssuanceModule.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the Set has a component that has not been exchanged', async () => {
      let nonExchangedNonWethComponent: StandardTokenMockContract;

      before(async () => {
        nonExchangedNonWethComponent = await erc20Helper.deployTokenAsync(tokenPurchaser);

        customBaseSetComponent = await erc20Helper.deployTokenAsync(tokenPurchaser);
        customBaseSetComponent2 = await erc20Helper.deployTokenAsync(tokenPurchaser);
        customComponentAddresses = [
          customBaseSetComponent.address,
          customBaseSetComponent2.address,
          weth.address,
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
          tokenPurchaser
        );
      });

      after(async () => {
        customBaseSetComponent = undefined;
        customComponentAddresses = undefined;
        customComponentUnits = undefined;
      });

      it('should send the extra asset to the caller', async () => {
        const previousReturnedAssetBalance = await nonExchangedNonWethComponent.balanceOf.callAsync(subjectCaller);
        const expectedReturnedAssetBalance = previousReturnedAssetBalance.add(
          customComponentUnits[2].mul(exchangeRedeemQuantity).div(baseSetNaturalUnit)
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

    describe('when the quantity of send token is less than the components redeemed', async () => {
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
        const excessNonExchangedWethQuantity = wethRequiredToIssueBaseSet.mul(2);
        excessBaseSetQuantity = exchangeRedeemQuantity.mul(2);

        // Generate wrapped Ether for the caller
        await weth.deposit.sendTransactionAsync(
          { from: tokenPurchaser, value: excessNonExchangedWethQuantity.toString(), gas: DEFAULT_GAS }
        );

        // Approve Weth to the transferProxy
        await weth.approve.sendTransactionAsync(
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

    describe('when the Set is only made of one component', async () => {
      before(async () => {
        customBaseSetComponent = await erc20Helper.deployTokenAsync(tokenPurchaser);
        customBaseSetComponent2 = await erc20Helper.deployTokenAsync(tokenPurchaser);

        customComponentAddresses = [customBaseSetComponent.address, customBaseSetComponent2.address];
        customComponentUnits = [new BigNumber(10 ** 18), new BigNumber(10 ** 18)];

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

    let customExchangeRedeemQuantity: BigNumber;

    let customBaseSetComponent: StandardTokenMockContract;
    let customBaseSetComponent2: StandardTokenMockContract;
    let customComponentAddresses: Address[];
    let customComponentUnits: BigNumber[];


    // ----------------------------------------------------------------------
    // Component and Rebalancing Set
    // ----------------------------------------------------------------------
    let baseSetComponent: StandardTokenMockContract;
    let baseSetComponent2: StandardTokenMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    // ----------------------------------------------------------------------
    // Issuance Details
    // ----------------------------------------------------------------------
    let rebalancingSetRedeemQuantity: BigNumber;
    let baseSetRedeemQuantity: BigNumber;

    // ----------------------------------------------------------------------
    // Payment / Send Token Details
    // ----------------------------------------------------------------------
    let wethRequiredToIssueBaseSet: BigNumber;

    let zeroExReceiveTokenQuantity: BigNumber;
    let kyberReceiveTokenQuantity: BigNumber;
    let exchangeIssuanceReceiveTokenQuantity: BigNumber;

    let zeroExSendTokenQuantity: BigNumber;
    let kyberSendTokenQuantity: BigNumber;

    let totalWrappedEtherToReceive: BigNumber;

    let customZeroExSendTokenQuantity: BigNumber;
    let customWethRequiredToIssueBaseSet: BigNumber;


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

      // Create component token
      baseSetComponent = customBaseSetComponent || await erc20Helper.deployTokenAsync(tokenPurchaser);
      baseSetComponent2 = customBaseSetComponent2 || await erc20Helper.deployTokenAsync(tokenPurchaser);

      // Create the Set (2 component where one is WETH)
      const componentAddresses = customComponentAddresses ||
        [baseSetComponent.address, baseSetComponent2.address, weth.address];
      const componentUnits = customComponentUnits ||
        [new BigNumber(10 ** 18), new BigNumber(10 ** 18), new BigNumber(10 ** 18)];
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
        componentUnits[2].mul(baseSetRedeemQuantity).div(baseSetNaturalUnit);

      // ----------------------------------------------------------------------
      // Payment / Send and Receive Token Details
      // ----------------------------------------------------------------------

      kyberReceiveTokenQuantity = ether(1);
      zeroExReceiveTokenQuantity = customZeroExSendTokenQuantity || ether(1);

      exchangeIssuanceReceiveTokenQuantity = zeroExReceiveTokenQuantity.plus(kyberReceiveTokenQuantity);

      totalWrappedEtherToReceive = exchangeIssuanceReceiveTokenQuantity.plus(wethRequiredToIssueBaseSet);

      // ----------------------------------------------------------------------
      // Exchange Issuance Set up
      // ----------------------------------------------------------------------

      // Generate exchangeRedeem data
      exchangeRedeemSetAddress = baseSetToken.address;
      exchangeRedeemQuantity = customExchangeRedeemQuantity || baseSetRedeemQuantity;
      exchangeRedeemSendTokenExchangeIds = [SetUtils.EXCHANGES.ZERO_EX, SetUtils.EXCHANGES.KYBER];
      exchangeRedeemSendTokens = [componentAddresses[0], componentAddresses[1]];

      zeroExSendTokenQuantity = customZeroExSendTokenQuantity ||
        componentUnits[0].mul(exchangeRedeemQuantity).div(baseSetNaturalUnit);
      kyberSendTokenQuantity = componentUnits[1].mul(exchangeRedeemQuantity).div(baseSetNaturalUnit);

      exchangeRedeemSendTokenAmounts = [zeroExSendTokenQuantity, kyberSendTokenQuantity];
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
      const takerAsset = exchangeRedeemSendTokens[0];

      zeroExMakerAssetAmount = customZeroExReceiveTokenAmount || zeroExReceiveTokenQuantity;
      zeroExTakerAssetAmount = exchangeRedeemSendTokenAmounts[0];

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
        zeroExMakerAssetAmount,
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

      const destinationTokenDecimals = (await weth.decimals.callAsync()).toNumber();
      const sourceTokenDecimals = (await baseSetComponent2.decimals.callAsync()).toNumber();
      kyberConversionRatePower = new BigNumber(10).pow(18 + sourceTokenDecimals - destinationTokenDecimals);
      const minimumConversionRate = maxDestinationQuantity.div(kyberSendTokenQuantity)
                                                          .mul(kyberConversionRatePower)
                                                          .round();

      kyberTrade = {
        sourceToken: baseSetComponent2.address,
        destinationToken: weth.address,
        sourceTokenQuantity: kyberSendTokenQuantity,
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
        baseSetComponent2.address,
        weth.address,
        kyberSendTokenQuantity,
        maxDestinationQuantity,
      );

      // ----------------------------------------------------------------------
      // Rebalancing Set Issuance
      // ----------------------------------------------------------------------

      // Approve base component to transfer proxy
      await erc20Helper.approveTransfersAsync(
        [baseSetComponent, baseSetComponent2],
        transferProxy.address,
        tokenPurchaser
      );

      if (wethRequiredToIssueBaseSet.gt(0)) {
        // Approve Weth to the transferProxy
        await weth.approve.sendTransactionAsync(
          transferProxy.address,
          wethRequiredToIssueBaseSet,
          { from: tokenPurchaser, gas: DEFAULT_GAS }
        );

        // Generate wrapped Ether for the caller
        await weth.deposit.sendTransactionAsync(
          { from: tokenPurchaser, value: wethRequiredToIssueBaseSet.toString(), gas: DEFAULT_GAS }
        );
      }

      // Issue the Base Set to the vault
      await core.issueInVault.sendTransactionAsync(
        baseSetToken.address,
        baseSetRedeemQuantity,
        { from: tokenPurchaser, gas: DEFAULT_GAS }
      );

      await core.issue.sendTransactionAsync(
        rebalancingSetToken.address,
        rebalancingSetRedeemQuantity,
        { from: tokenPurchaser, gas: DEFAULT_GAS }
      );

      // ----------------------------------------------------------------------
      // Subject Parameter Definitions
      // ----------------------------------------------------------------------

      subjectRebalancingSetAddress = rebalancingSetToken.address;
      subjectRebalancingSetQuantity = rebalancingSetRedeemQuantity;
      subjectReceiveTokenAddress = weth.address;
      subjectExchangeIssuanceParams = exchangeIssuanceParams;
      subjectExchangeOrdersData = setUtils.generateSerializedOrders([zeroExOrder, kyberTrade]);
      subjectKeepChangeInVault = false;
      subjectCaller = tokenPurchaser;
    });

    afterEach(async () => {
      customExchangeRedeemQuantity = undefined;
    });

    async function subject(): Promise<string> {
      return rebalancingSetExchangeIssuanceModule.redeemRebalancingSetIntoERC20.sendTransactionAsync(
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

    it('should increment the users weth balance by the correct quantity', async () => {
      const previousWethBalance = await weth.balanceOf.callAsync(subjectCaller);

      await subject();

      const expectedWethBalance = previousWethBalance.add(totalWrappedEtherToReceive);
      const currentWethBalance = await weth.balanceOf.callAsync(subjectCaller);

      expect(currentWethBalance).to.bignumber.equal(expectedWethBalance);
    });

    it('increases the 0x makers send token quantity properly', async () => {
      const previousTakerTokenBalance = await baseSetComponent.balanceOf.callAsync(zeroExOrderMaker);
      const expectedTakerTokenBalance = previousTakerTokenBalance.add(exchangeRedeemSendTokenAmounts[0]);

      await subject();

      const currentTakerTokenBalance = await baseSetComponent.balanceOf.callAsync(zeroExOrderMaker);
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
        totalWrappedEtherToReceive,
        rebalancingSetExchangeIssuanceModule.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the Set has a component that has not been exchanged', async () => {
      let nonExchangedNonWethComponent: StandardTokenMockContract;

      before(async () => {
        nonExchangedNonWethComponent = await erc20Helper.deployTokenAsync(tokenPurchaser);

        customBaseSetComponent = await erc20Helper.deployTokenAsync(tokenPurchaser);
        customBaseSetComponent2 = await erc20Helper.deployTokenAsync(tokenPurchaser);
        customComponentAddresses = [
          customBaseSetComponent.address,
          customBaseSetComponent2.address,
          weth.address,
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
          tokenPurchaser
        );
      });

      after(async () => {
        customBaseSetComponent = undefined;
        customComponentAddresses = undefined;
        customComponentUnits = undefined;
      });

      it('should send the extra asset to the caller', async () => {
        const previousReturnedAssetBalance = await nonExchangedNonWethComponent.balanceOf.callAsync(subjectCaller);
        const expectedReturnedAssetBalance = previousReturnedAssetBalance.add(
          customComponentUnits[2].mul(exchangeRedeemQuantity).div(baseSetNaturalUnit)
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
        const previousWethBalance = await weth.balanceOf.callAsync(subjectCaller);

        await subject();

        const expectedWethBalance = previousWethBalance
                                     .add(totalWrappedEtherToReceive)
                                     .add(customZeroExReceiveTokenAmount)
                                     .sub(zeroExReceiveTokenQuantity);
        const currentWethBalance = await weth.balanceOf.callAsync(subjectCaller);
        expect(currentWethBalance).to.bignumber.equal(expectedWethBalance);
      });
    });

    describe('when the quantity of send token is less than the components redeemed', async () => {
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
        const excessNonExchangedWethQuantity = wethRequiredToIssueBaseSet.mul(2);
        excessBaseSetQuantity = exchangeRedeemQuantity.mul(2);

        // Generate wrapped Ether for the caller
        await weth.deposit.sendTransactionAsync(
          { from: tokenPurchaser, value: excessNonExchangedWethQuantity.toString(), gas: DEFAULT_GAS }
        );

        // Approve Weth to the transferProxy
        await weth.approve.sendTransactionAsync(
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

    describe('when the Set is only made of one component', async () => {
      before(async () => {
        customBaseSetComponent = await erc20Helper.deployTokenAsync(tokenPurchaser);
        customBaseSetComponent2 = await erc20Helper.deployTokenAsync(tokenPurchaser);

        customComponentAddresses = [customBaseSetComponent.address, customBaseSetComponent2.address];
        customComponentUnits = [new BigNumber(10 ** 18), new BigNumber(10 ** 18)];

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
});
