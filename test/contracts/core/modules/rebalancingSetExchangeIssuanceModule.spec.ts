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
const RebalancingSetExchangeIssuanceModule = artifacts.require('RebalancingSetExchangeIssuanceModule');

const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const setUtils = new SetUtils(web3);
const { NULL_ADDRESS, ZERO } = SetUtils.CONSTANTS;

contract('RebalancingSetExchangeIssuanceModule', accounts => {
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
  let rebalancingSetExchangeIssuanceModule: RebalancingSetExchangeIssuanceModuleContract;
  let weth: WethMockContract;

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
    ABIDecoder.addABI(RebalancingSetExchangeIssuanceModule.abi);

    transferProxy = await coreWrapper.deployTransferProxyAsync();
    vault = await coreWrapper.deployVaultAsync();
    core = await coreWrapper.deployCoreAsync(transferProxy, vault);
    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);
    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

    rebalancingSetTokenFactory = await coreWrapper.deployRebalancingSetTokenFactoryAsync(core.address, whitelist);
    await coreWrapper.addFactoryAsync(core, rebalancingSetTokenFactory);

    exchangeIssuanceModule = await coreWrapper.deployExchangeIssuanceModuleAsync(core, vault);
    await coreWrapper.addModuleAsync(core, exchangeIssuanceModule.address);

    weth = await erc20Wrapper.deployWrappedEtherAsync(ownerAccount);

    rebalancingSetExchangeIssuanceModule = await coreWrapper.deployRebalancingSetExchangeIssuanceModuleAsync(
      core.address,
      transferProxy.address,
      exchangeIssuanceModule.address,
      weth.address,
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
    ABIDecoder.removeABI(RebalancingSetExchangeIssuanceModule.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    const subjectCaller: Address = ownerAccount;

    async function subject(): Promise<RebalancingSetExchangeIssuanceModuleContract> {
      return await coreWrapper.deployRebalancingSetExchangeIssuanceModuleAsync(
        core.address,
        transferProxy.address,
        exchangeIssuanceModule.address,
        weth.address,
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
      .exchangeIssuanceModule.callAsync();

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

    let rebalancingSetQuantityToIssue: BigNumber;

    let requiredPaymentEth: BigNumber;
    let requiredComponentEth: BigNumber;

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

    let customComponents: Address[];
    let customComponentUnits: BigNumber[];
    let customRequiredComponentEth: BigNumber;
    let customBaseSetComponent: StandardTokenMockContract;

    let customRequiredPaymentETH: BigNumber;
    let customIssuePaymentTokenAmount: BigNumber;
    let customTradeOutputAmount: BigNumber;
    let customExchangeIssueQuantity: BigNumber;
    let customWethUsedInTrade: BigNumber;

    beforeEach(async () => {
      // Create component token (owned by 0x order maker)
      baseSetComponent = customBaseSetComponent || await erc20Wrapper.deployTokenAsync(zeroExOrderMaker);

      // Create the Set (default is 2 components)
      const componentAddresses = customComponents || [baseSetComponent.address, weth.address];
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

      requiredPaymentEth = customRequiredPaymentETH || new BigNumber(10 ** 10);

      // Generate exchange issue data
      exchangeIssueSetAddress = baseSetToken.address;
      exchangeIssueQuantity = customExchangeIssueQuantity || new BigNumber(10 ** 10);
      exchangeIssueSendTokenExchangeIds = [SetUtils.EXCHANGES.ZERO_EX];
      exchangeIssueSendTokens = [weth.address];
      exchangeIssueSendTokenAmounts = [customIssuePaymentTokenAmount || requiredPaymentEth];

      // Only the base set component is exchangeIssued
      exchangeIssueReceiveTokens = [componentAddresses[0]];
      exchangeIssueReceiveTokenAmounts = [componentUnits[0].mul(exchangeIssueQuantity).div(baseSetNaturalUnit)];

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
        customWethUsedInTrade || exchangeIssueSendTokenAmounts[0],            // takerAssetAmount
        exchangeIssueReceiveTokens[0],               	                        // makerAssetAddress
        exchangeIssueSendTokens[0],                                           // takerAssetAddress
        SetUtils.generateSalt(),                                              // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,                                // exchangeAddress
        NULL_ADDRESS,                                                         // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),                                // expirationTimeSeconds
        customWethUsedInTrade || exchangeIssueSendTokenAmounts[0],            // amount of zeroExOrder to fill
      );

      rebalancingSetQuantityToIssue = exchangeIssueQuantity.mul(DEFAULT_REBALANCING_NATURAL_UNIT)
                                                          .div(rebalancingUnitShares);

      // Modify for 1 component
      requiredComponentEth = customRequiredComponentEth ||
        exchangeIssueQuantity.mul(componentUnits[1]).div(baseSetNaturalUnit);

      subjectRebalancingSetAddress = rebalancingSetToken.address;
      subjectRebalancingSetQuantity = DEFAULT_REBALANCING_NATURAL_UNIT;
      subjectExchangeIssuanceParams = exchangeIssuanceParams;
      subjectExchangeOrdersData = setUtils.generateSerializedOrders([zeroExOrder]);
      subjectKeepChangeInVault = false;
      subjectCaller = tokenPurchaser;
      subjectEtherValue = requiredPaymentEth.plus(requiredComponentEth).toString();
    });

    afterEach(async () => {
      customRequiredPaymentETH = undefined;
      customIssuePaymentTokenAmount = undefined;
      customExchangeIssueQuantity = undefined;
      customComponents = undefined;
      customComponentUnits = undefined;
      customRequiredComponentEth = undefined;
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
      const expectedRBSetTokenBalance = previousRBSetTokenBalance.add(rebalancingSetQuantityToIssue);

      await subject();

      const currentRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      expect(expectedRBSetTokenBalance).to.bignumber.equal(currentRBSetTokenBalance);
    });

    it('uses an expected amount of Eth', async () => {
      const previousEthBalance: BigNumber = new BigNumber(await web3.eth.getBalance(subjectCaller));

      const txHash = await subject();
      const totalGasInEth = await getGasUsageInEth(txHash);
      const totalSendToken = exchangeIssueSendTokenAmounts[0];
      const expectedEthBalance = previousEthBalance
                                  .sub(totalSendToken)
                                  .sub(requiredComponentEth)
                                  .sub(totalGasInEth);

      const currentEthBalance = await web3.eth.getBalance(subjectCaller);
      expect(expectedEthBalance).to.bignumber.equal(currentEthBalance);
    });

    it('emits correct LogPayableExchangeIssue event', async () => {
      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = LogPayableExchangeIssue(
        subjectRebalancingSetAddress,
        subjectCaller,
        subjectRebalancingSetQuantity,
        rebalancingSetExchangeIssuanceModule.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the eth transferred is in excess of required', async () => {
      before(async () => {
        customRequiredPaymentETH = new BigNumber(10 ** 10).times(2);
        customIssuePaymentTokenAmount = new BigNumber(10 ** 10);
      });

      it('refunds the user the appropriate amount of eth', async () => {
        const previousEthBalance: BigNumber = new BigNumber(await web3.eth.getBalance(subjectCaller));

        const txHash = await subject();
        const totalGasInEth = await getGasUsageInEth(txHash);
        const totalSendToken = exchangeIssueSendTokenAmounts[0];
        const expectedEthBalance = previousEthBalance
                                    .sub(totalSendToken)
                                    .sub(requiredComponentEth)
                                    .sub(totalGasInEth);

        const currentEthBalance = await web3.eth.getBalance(subjectCaller);
        expect(currentEthBalance).to.bignumber.equal(expectedEthBalance);
      });
    });

    describe('when sendToken amount is greater than amount needed to execute trades', async () => {
      before(async () => {
        customRequiredPaymentETH = new BigNumber(10 ** 10).times(2);
        customWethUsedInTrade = new BigNumber(10 ** 10);
      });

      it('refunds the user the appropriate amount of eth', async () => {
        const previousEthBalance: BigNumber = new BigNumber(await web3.eth.getBalance(subjectCaller));

        const txHash = await subject();
        const totalGasInEth = await getGasUsageInEth(txHash);
        const expectedEthBalance = previousEthBalance
                                    .sub(customWethUsedInTrade)
                                    .sub(requiredComponentEth)
                                    .sub(totalGasInEth);

        const currentEthBalance = await web3.eth.getBalance(subjectCaller);
        expect(currentEthBalance).to.bignumber.equal(expectedEthBalance);
      });
    });

    describe('when the base Set acquired is in excess of required', async () => {
      const excessBaseSetIssued = new BigNumber(10 ** 9);

      describe('and keepChangeInVault is false', async () => {
        before(async () => {
          customExchangeIssueQuantity = new BigNumber(10 ** 10).plus(excessBaseSetIssued);
        });

        it('refunds the user the appropriate amount of base Set', async () => {
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
          customExchangeIssueQuantity = new BigNumber(10 ** 10).plus(excessBaseSetIssued);
        });

        it('refunds the user the appropriate amount of base Set to the Vault', async () => {
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

    describe('but the wrapper does not have enough allowance to transfer weth', async () => {
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

    describe('when the send tokens length is greater than 1', async () => {
      beforeEach(async () => {
        subjectExchangeIssuanceParams.sendTokens = [weth.address, weth.address];
        subjectExchangeIssuanceParams.sendTokenAmounts = [new BigNumber(1), new BigNumber(1)];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the send token is not wrapped ether', async () => {
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
        subjectExchangeIssuanceParams.setAddress = weth.address;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the eth sent is insufficient', async () => {
      before(async () => {
        customRequiredComponentEth = new BigNumber(0);
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

    describe('when the Set is only made of one component', async () => {
      before(async () => {
        customBaseSetComponent = await erc20Wrapper.deployTokenAsync(zeroExOrderMaker);

        customComponents = [customBaseSetComponent.address];
        customComponentUnits = [new BigNumber(10 ** 10)];
        customRequiredComponentEth = new BigNumber(0);
      });

      it('issues the rebalancing Set to the caller', async () => {
        const previousRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
        const expectedRBSetTokenBalance = previousRBSetTokenBalance.add(rebalancingSetQuantityToIssue);

        await subject();

        const currentRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
        expect(expectedRBSetTokenBalance).to.bignumber.equal(currentRBSetTokenBalance);
      });
    });
  });

  describe('#issueRebalancingSetWithERC20', async () => {
    let subjectRebalancingSetAddress: Address;
    let subjectRebalancingSetQuantity: BigNumber;
    let subjectExchangeIssuanceParams: ExchangeIssuanceParams;
    let subjectExchangeOrdersData: Bytes;
    let subjectPaymentTokenAddress: Address;
    let subjectPaymentTokenQuantity: BigNumber;
    let subjectKeepChangeInVault: boolean;
    let subjectCaller: Address;

    let rebalancingSetQuantityToIssue: BigNumber;

    let requiredPaymentEth: BigNumber;
    let requiredComponentEth: BigNumber;

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

    let customComponents: Address[];
    let customComponentUnits: BigNumber[];
    let customRequiredComponentEth: BigNumber;
    let customBaseSetComponent: StandardTokenMockContract;

    let customRequiredPaymentETH: BigNumber;
    let customIssuePaymentTokenAmount: BigNumber;
    let customExchangeIssueQuantity: BigNumber;
    let customTradeOutputAmount: BigNumber;
    let customWethUsedInTrade: BigNumber;

    beforeEach(async () => {
      // Create component token (owned by 0x order maker)
      baseSetComponent = customBaseSetComponent || await erc20Wrapper.deployTokenAsync(zeroExOrderMaker);

      // Create the Set (1 component)
      const componentAddresses = customComponents || [baseSetComponent.address, weth.address];
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

      requiredPaymentEth = customRequiredPaymentETH || new BigNumber(10 ** 10);

      // Generate exchange issue data
      exchangeIssueSetAddress = baseSetToken.address;
      exchangeIssueQuantity = customExchangeIssueQuantity || new BigNumber(10 ** 10);
      exchangeIssueSendTokenExchangeIds = [SetUtils.EXCHANGES.ZERO_EX];
      exchangeIssueSendTokens = [weth.address];
      exchangeIssueSendTokenAmounts = [customIssuePaymentTokenAmount || requiredPaymentEth];
      exchangeIssueReceiveTokens = componentAddresses;
      exchangeIssueReceiveTokens = [componentAddresses[0]];
      exchangeIssueReceiveTokenAmounts = [componentUnits[0].mul(exchangeIssueQuantity).div(baseSetNaturalUnit)];

      const exchangeIssuanceParams = {
        setAddress:             exchangeIssueSetAddress,
        sendTokenExchangeIds:   exchangeIssueSendTokenExchangeIds,
        sendTokens:             exchangeIssueSendTokens,
        sendTokenAmounts:       exchangeIssueSendTokenAmounts,
        quantity:               exchangeIssueQuantity,
        receiveTokens:           exchangeIssueReceiveTokens,
        receiveTokenAmounts:     exchangeIssueReceiveTokenAmounts,
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
        customWethUsedInTrade || exchangeIssueSendTokenAmounts[0],            // takerAssetAmount
        exchangeIssueReceiveTokens[0],                                         // makerAssetAddress
        exchangeIssueSendTokens[0],                                           // takerAssetAddress
        SetUtils.generateSalt(),                                              // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,                                // exchangeAddress
        NULL_ADDRESS,                                                         // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),                                // expirationTimeSeconds
        customWethUsedInTrade || exchangeIssueSendTokenAmounts[0],            // amount of zeroExOrder to fill
      );

      rebalancingSetQuantityToIssue = exchangeIssueQuantity.mul(DEFAULT_REBALANCING_NATURAL_UNIT)
                                                           .div(rebalancingUnitShares);
      requiredComponentEth = customRequiredComponentEth ||
        exchangeIssueQuantity.mul(componentUnits[1]).div(baseSetNaturalUnit);

      subjectRebalancingSetAddress = rebalancingSetToken.address;
      subjectRebalancingSetQuantity = DEFAULT_REBALANCING_NATURAL_UNIT;
      subjectExchangeIssuanceParams = exchangeIssuanceParams;
      subjectExchangeOrdersData = setUtils.generateSerializedOrders([zeroExOrder]);
      subjectCaller = tokenPurchaser;
      subjectPaymentTokenAddress = weth.address;
      subjectPaymentTokenQuantity = requiredPaymentEth.plus(requiredComponentEth);
      subjectKeepChangeInVault = false;

      await weth.deposit.sendTransactionAsync({
        from: tokenPurchaser,
        gas: DEFAULT_GAS,
        value: subjectPaymentTokenQuantity.toString(),
      });

      await erc20Wrapper.approveTransfersAsync(
        [weth],
        transferProxy.address,
        tokenPurchaser,
      );
    });

    afterEach(async () => {
      customRequiredPaymentETH = undefined;
      customIssuePaymentTokenAmount = undefined;
      customExchangeIssueQuantity = undefined;
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
      const expectedRBSetTokenBalance = previousRBSetTokenBalance.add(rebalancingSetQuantityToIssue);

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
      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = LogPayableExchangeIssue(
        subjectRebalancingSetAddress,
        subjectCaller,
        subjectRebalancingSetQuantity,
        rebalancingSetExchangeIssuanceModule.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the wrapped eth transferred is in excess of required', async () => {
      before(async () => {
        customRequiredPaymentETH = new BigNumber(10 ** 10).times(2);
        customIssuePaymentTokenAmount = new BigNumber(10 ** 10);
      });

      it('refunds the user the appropriate amount of weth', async () => {
        const previousWethBalance: BigNumber = await weth.balanceOf.callAsync(subjectCaller);

        await subject();
        const totalSendToken = exchangeIssueSendTokenAmounts[0];
        const expectedWethBalance = previousWethBalance
                                    .sub(totalSendToken)
                                    .sub(requiredComponentEth);

        const currentWethBalance: BigNumber = await weth.balanceOf.callAsync(subjectCaller);
        expect(currentWethBalance).to.bignumber.equal(expectedWethBalance);
      });
    });

    describe('when sendToken amount is greater than amount needed to execute trades and issue', async () => {
      before(async () => {
        customRequiredPaymentETH = new BigNumber(10 ** 10).times(2);
        customWethUsedInTrade = new BigNumber(10 ** 10);
      });

      it('refunds the user the appropriate amount of weth', async () => {
        const previousWethBalance: BigNumber = await weth.balanceOf.callAsync(subjectCaller);

        await subject();
        const expectedEthBalance = previousWethBalance
                                    .sub(customWethUsedInTrade)
                                    .sub(requiredComponentEth);

        const currentEthBalance = await weth.balanceOf.callAsync(subjectCaller);
        expect(currentEthBalance).to.bignumber.equal(expectedEthBalance);
      });
    });

    describe('when the base Set acquired is in excess of required', async () => {
      const excessBaseSetIssued = new BigNumber(10 ** 9);

      describe('and keepChangeInVault is false', async () => {
        before(async () => {
          customExchangeIssueQuantity = new BigNumber(10 ** 10).plus(excessBaseSetIssued);
        });

        it('refunds the user the appropriate amount of base Set', async () => {
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
          customExchangeIssueQuantity = new BigNumber(10 ** 10).plus(excessBaseSetIssued);
        });

        it('refunds the user the appropriate amount of base Set to the Vault', async () => {
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

    describe('when the weth sent is insufficient', async () => {
      before(async () => {
        customRequiredComponentEth = new BigNumber(0);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the send tokens length is greater than 1', async () => {
      beforeEach(async () => {
        subjectExchangeIssuanceParams.sendTokens = [weth.address, weth.address];
        subjectExchangeIssuanceParams.sendTokenAmounts = [new BigNumber(1), new BigNumber(1)];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the send token is not the paymentToken', async () => {
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

    describe('when the Set is only made of one component', async () => {
      before(async () => {
        customBaseSetComponent = await erc20Wrapper.deployTokenAsync(zeroExOrderMaker);

        customComponents = [customBaseSetComponent.address];
        customComponentUnits = [new BigNumber(10 ** 10)];
        customRequiredComponentEth = new BigNumber(0);
      });

      it('issues the rebalancing Set to the caller', async () => {
        const previousRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
        const expectedRBSetTokenBalance = previousRBSetTokenBalance.add(rebalancingSetQuantityToIssue);

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
    let customExchangeRedeemSendTokenAmounts: BigNumber[];
    let customBaseSetComponent: StandardTokenMockContract;
    let customComponentAddresses: Address[];
    let customComponentUnits: BigNumber[];
    let customNonExchangedWeth: BigNumber;

    let baseSetComponent: StandardTokenMockContract;
    let nonExchangedWethQuantity: BigNumber;

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

    let etherQuantityToReceive: BigNumber;
    let etherTradedFor: BigNumber;

    let zeroExOrder: ZeroExSignedFillOrder;

    beforeEach(async () => {
      etherQuantityToReceive = ether(2);

      // Create component token
      baseSetComponent = customBaseSetComponent || await erc20Wrapper.deployTokenAsync(tokenPurchaser);

      // Create the Set (2 component where one is WETH)
      const componentAddresses = customComponentAddresses || [baseSetComponent.address, weth.address];
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
      exchangeRedeemReceiveTokens = [weth.address];
      exchangeRedeemReceiveTokenAmounts = [etherQuantityToReceive];

      const exchangeIssuanceParams = {
        setAddress:             exchangeRedeemSetAddress,
        sendTokenExchangeIds:   exchangeRedeemSendTokenExchangeIds,
        sendTokens:             exchangeRedeemSendTokens,
        sendTokenAmounts:       exchangeRedeemSendTokenAmounts,
        quantity:               exchangeRedeemQuantity,
        receiveTokens:          exchangeRedeemReceiveTokens,
        receiveTokenAmounts:    exchangeRedeemReceiveTokenAmounts,
      };

      // Approve weth to the transfer proxy
      const requiredEthForExchangeOrder = etherTradedFor || exchangeRedeemReceiveTokenAmounts[0];
      await weth.approve.sendTransactionAsync(
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        requiredEthForExchangeOrder,
        { from: zeroExOrderMaker, gas: DEFAULT_GAS }
      );

      // Deposit weth
      const requiredEthForExchangeOrderValue = requiredEthForExchangeOrder.toString();
      await weth.deposit.sendTransactionAsync(
        { from: zeroExOrderMaker, value: requiredEthForExchangeOrderValue, gas: DEFAULT_GAS }
      );

      // Create 0x order for the component
      zeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                               // senderAddress
        zeroExOrderMaker,                                           // makerAddress
        NULL_ADDRESS,                                               // takerAddress
        ZERO,                                                       // makerFee
        ZERO,                                                       // takerFee
        etherTradedFor || exchangeRedeemReceiveTokenAmounts[0],     // makerAssetAmount
        exchangeRedeemSendTokenAmounts[0],                          // takerAssetAmount
        exchangeRedeemReceiveTokens[0],                             // makerAssetAddress
        exchangeRedeemSendTokens[0],                                // takerAssetAddress
        SetUtils.generateSalt(),                                    // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,                      // exchangeAddress
        NULL_ADDRESS,                                               // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),                      // expirationTimeSeconds
        exchangeRedeemSendTokenAmounts[0],                          // amount of zeroExOrder to fill
      );

      // Approve base component to transfer proxy
      await erc20Wrapper.approveTransfersAsync(
        [baseSetComponent],
        transferProxy.address,
        tokenPurchaser
      );

      nonExchangedWethQuantity = customNonExchangedWeth ||
        componentUnits[1].mul(exchangeRedeemQuantity).div(baseSetNaturalUnit);

      if (nonExchangedWethQuantity.gt(0)) {
        // Approve Weth to the transferProxy
        await weth.approve.sendTransactionAsync(
          transferProxy.address,
          nonExchangedWethQuantity,
          { from: tokenPurchaser, gas: DEFAULT_GAS }
        );

        // Generate wrapped Ether for the caller
        await weth.deposit.sendTransactionAsync(
          { from: tokenPurchaser, value: nonExchangedWethQuantity.toString(), gas: DEFAULT_GAS }
        );
      }

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
                                   .add(etherQuantityToReceive)
                                   .add(nonExchangedWethQuantity)
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
        subjectRebalancingSetQuantity,
        rebalancingSetExchangeIssuanceModule.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the Set has a component that has not been exchanged', async () => {
      let nonExchangedNonWethComponent: StandardTokenMockContract;

      before(async () => {
        nonExchangedNonWethComponent = await erc20Wrapper.deployTokenAsync(tokenPurchaser);

        customBaseSetComponent = await erc20Wrapper.deployTokenAsync(tokenPurchaser);
        customComponentAddresses = [
          customBaseSetComponent.address,
          weth.address,
          nonExchangedNonWethComponent.address,
        ];
        customComponentUnits = [new BigNumber(10 ** 10), new BigNumber(10 ** 10), new BigNumber(10 ** 10)];

        await erc20Wrapper.approveTransfersAsync(
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

    describe('when the quantity of weth in receive tokens is less than the amount traded for', async () => {
      before(async () => {
        etherTradedFor = ether(3);
      });

      after(async () => {
        etherTradedFor = undefined;
      });

      it('should increment the users eth balance by the correct quantity', async () => {
        const previousEthBalance = new BigNumber(await web3.eth.getBalance(subjectCaller));

        const txHash = await subject();
        const totalGasInEth = await getGasUsageInEth(txHash);

        const expectedEthBalance = previousEthBalance
                                     .add(etherTradedFor)
                                     .add(nonExchangedWethQuantity)
                                     .sub(totalGasInEth);
        const currentEthBalance =  await web3.eth.getBalance(subjectCaller);
        expect(currentEthBalance).to.bignumber.equal(expectedEthBalance);
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
        const excessNonExchangedWethQuantity = nonExchangedWethQuantity.mul(2);
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

    describe('when the receive tokens length is greater than 1', async () => {
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
        const baseSetComponent = await erc20Wrapper.deployTokenAsync(zeroExOrderMaker);
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

    describe('when the Set is only made of one component', async () => {
      before(async () => {
        customBaseSetComponent = await erc20Wrapper.deployTokenAsync(tokenPurchaser);

        customComponentAddresses = [customBaseSetComponent.address];
        customComponentUnits = [new BigNumber(10 ** 10)];

        customNonExchangedWeth = new BigNumber(0);
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
    let customExchangeRedeemSendTokenAmounts: BigNumber[];
    let customBaseSetComponent: StandardTokenMockContract;
    let customComponentAddresses: Address[];
    let customComponentUnits: BigNumber[];
    let customNonExchangedWeth: BigNumber;

    let baseSetComponent: StandardTokenMockContract;
    let nonExchangedWethQuantity: BigNumber;

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

    let wethQuantityToReceive: BigNumber;
    let etherTradedFor: BigNumber;

    let zeroExOrder: ZeroExSignedFillOrder;

    beforeEach(async () => {
      wethQuantityToReceive = ether(2);

      // Create component token
      baseSetComponent = customBaseSetComponent || await erc20Wrapper.deployTokenAsync(tokenPurchaser);

      // Create the Set (2 component where one is WETH)
      const componentAddresses = customComponentAddresses || [baseSetComponent.address, weth.address];
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
      exchangeRedeemReceiveTokens = [weth.address];
      exchangeRedeemReceiveTokenAmounts = [wethQuantityToReceive];

      const exchangeIssuanceParams = {
        setAddress:             exchangeRedeemSetAddress,
        sendTokenExchangeIds:   exchangeRedeemSendTokenExchangeIds,
        sendTokens:             exchangeRedeemSendTokens,
        sendTokenAmounts:       exchangeRedeemSendTokenAmounts,
        quantity:               exchangeRedeemQuantity,
        receiveTokens:          exchangeRedeemReceiveTokens,
        receiveTokenAmounts:    exchangeRedeemReceiveTokenAmounts,
      };

      // Approve weth to the transfer proxy
      const requiredEthForExchangeOrder = etherTradedFor || exchangeRedeemReceiveTokenAmounts[0];
      await weth.approve.sendTransactionAsync(
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        requiredEthForExchangeOrder,
        { from: zeroExOrderMaker, gas: DEFAULT_GAS }
      );

      // Deposit weth
      const requiredEthForExchangeOrderValue = requiredEthForExchangeOrder.toString();
      await weth.deposit.sendTransactionAsync(
        { from: zeroExOrderMaker, value: requiredEthForExchangeOrderValue, gas: DEFAULT_GAS }
      );

      // Create 0x order for the component
      zeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                               // senderAddress
        zeroExOrderMaker,                                           // makerAddress
        NULL_ADDRESS,                                               // takerAddress
        ZERO,                                                       // makerFee
        ZERO,                                                       // takerFee
        etherTradedFor || exchangeRedeemReceiveTokenAmounts[0],     // makerAssetAmount
        exchangeRedeemSendTokenAmounts[0],                          // takerAssetAmount
        exchangeRedeemReceiveTokens[0],                             // makerAssetAddress
        exchangeRedeemSendTokens[0],                                // takerAssetAddress
        SetUtils.generateSalt(),                                    // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,                      // exchangeAddress
        NULL_ADDRESS,                                               // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),                      // expirationTimeSeconds
        exchangeRedeemSendTokenAmounts[0],                          // amount of zeroExOrder to fill
      );

      // Approve base component to transfer proxy
      await erc20Wrapper.approveTransfersAsync(
        [baseSetComponent],
        transferProxy.address,
        tokenPurchaser
      );

      nonExchangedWethQuantity = customNonExchangedWeth ||
        componentUnits[1].mul(exchangeRedeemQuantity).div(baseSetNaturalUnit);

      if (nonExchangedWethQuantity.gt(0)) {
        // Approve Weth to the transferProxy
        await weth.approve.sendTransactionAsync(
          transferProxy.address,
          nonExchangedWethQuantity,
          { from: tokenPurchaser, gas: DEFAULT_GAS }
        );

        // Generate wrapped Ether for the caller
        await weth.deposit.sendTransactionAsync(
          { from: tokenPurchaser, value: nonExchangedWethQuantity.toString(), gas: DEFAULT_GAS }
        );
      }

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
      subjectReceiveTokenAddress = weth.address;
      subjectExchangeIssuanceParams = exchangeIssuanceParams;
      subjectExchangeOrdersData = setUtils.generateSerializedOrders([zeroExOrder]);
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

      const expectedWethBalance = previousWethBalance
                                   .add(wethQuantityToReceive)
                                   .add(nonExchangedWethQuantity);
      const currentWethBalance =  await weth.balanceOf.callAsync(subjectCaller);

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
        subjectRebalancingSetQuantity,
        rebalancingSetExchangeIssuanceModule.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the Set has a component that has not been exchanged', async () => {
      let nonExchangedNonWethComponent: StandardTokenMockContract;

      before(async () => {
        nonExchangedNonWethComponent = await erc20Wrapper.deployTokenAsync(tokenPurchaser);

        customBaseSetComponent = await erc20Wrapper.deployTokenAsync(tokenPurchaser);
        customComponentAddresses = [
          customBaseSetComponent.address,
          weth.address,
          nonExchangedNonWethComponent.address,
        ];
        customComponentUnits = [new BigNumber(10 ** 10), new BigNumber(10 ** 10), new BigNumber(10 ** 10)];

        await erc20Wrapper.approveTransfersAsync(
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

    describe('when the quantity of weth in receive tokens is less than the amount traded for', async () => {
      before(async () => {
        etherTradedFor = ether(3);
      });

      after(async () => {
        etherTradedFor = undefined;
      });

      it('should increment the users eth balance by the correct quantity', async () => {
        const previousEthBalance = await weth.balanceOf.callAsync(subjectCaller);

        await subject();

        const expectedEthBalance = previousEthBalance
                                     .add(etherTradedFor)
                                     .add(nonExchangedWethQuantity);
        const currentEthBalance =  await weth.balanceOf.callAsync(subjectCaller);
        expect(currentEthBalance).to.bignumber.equal(expectedEthBalance);
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
        const excessNonExchangedWethQuantity = nonExchangedWethQuantity.mul(2);
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

    describe('when the receive tokens length is greater than 1', async () => {
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
        const baseSetComponent = await erc20Wrapper.deployTokenAsync(zeroExOrderMaker);
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

    describe('when the Set is only made of one component', async () => {
      before(async () => {
        customBaseSetComponent = await erc20Wrapper.deployTokenAsync(tokenPurchaser);

        customComponentAddresses = [customBaseSetComponent.address];
        customComponentUnits = [new BigNumber(10 ** 10)];

        customNonExchangedWeth = new BigNumber(0);
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
