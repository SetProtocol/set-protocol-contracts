require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as ethUtil from 'ethereumjs-util';
import * as setProtocolUtils from 'set-protocol-utils';
import {
  Address,
  Bytes,
  IssuanceOrder,
  KyberTrade,
  TakerWalletOrder,
  ZeroExSignedFillOrder
} from 'set-protocol-utils';
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
  TransferProxyContract,
  VaultContract
} from '@utils/contracts';
import { ether } from '@utils/units';
import { assertTokenBalanceAsync, expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { DEFAULT_GAS, DEPLOYED_TOKEN_QUANTITY, KYBER_RESERVE_CONFIGURED_RATE } from '@utils/constants';
import {
  getExpectedFillLog,
  getExpectedCancelLog,
  SignatureValidatorChanged,
} from '@utils/contract_logs/issuanceOrderModule';
import { generateOrdersDataWithIncorrectExchange } from '@utils/orders';
import { getWeb3 } from '@utils/web3Helper';

import { ExchangeWrapper } from '@utils/wrappers/exchangeWrapper';
import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const Core = artifacts.require('Core');
const StandardTokenMock = artifacts.require('StandardTokenMock');
const IssuanceOrderModule = artifacts.require('IssuanceOrderModule');
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const blockchain = new Blockchain(web3);
const setTestUtils = new SetTestUtils(web3);
const setUtils = new SetUtils(web3);
const { expect } = chai;
const { NULL_ADDRESS, ZERO } = SetUtils.CONSTANTS;


contract('IssuanceOrderModule', accounts => {
  const [
    contractDeployer,
    relayerAccount,
    issuanceOrderTaker,
    issuanceOrderMaker,
    zeroExOrderMaker,
    notIssuanceOrderMaker,
    notOwner,
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let issuanceOrderModule: IssuanceOrderModuleContract;
  let setTokenFactory: SetTokenFactoryContract;
  let signatureValidator: SignatureValidatorContract;

  const coreWrapper = new CoreWrapper(contractDeployer, contractDeployer);
  const erc20Wrapper = new ERC20Wrapper(contractDeployer);
  const exchangeWrapper = new ExchangeWrapper(contractDeployer);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
    ABIDecoder.addABI(IssuanceOrderModule.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
    ABIDecoder.removeABI(IssuanceOrderModule.abi);
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
      signatureValidator,
    );
    await coreWrapper.addModuleAsync(core, issuanceOrderModule.address);
    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);

    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);
    await coreWrapper.addAuthorizationAsync(transferProxy, issuanceOrderModule.address);
    await coreWrapper.addAuthorizationAsync(vault, issuanceOrderModule.address);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#fillOrder', async () => {
    let subjectCaller: Address;
    let subjectIssuanceOrder: IssuanceOrder;
    let subjectQuantityToFill: BigNumber;
    let subjectSignature: Bytes;
    let subjectExchangeOrdersData: Bytes;

    let relayerAddress: Address;
    let relayerToken: StandardTokenMockContract;
    let makerToken: StandardTokenMockContract;

    let naturalUnit: BigNumber;
    let setToken: SetTokenContract;

    let issuanceOrderSetAddress: Address;
    let issuanceOrderQuantity: BigNumber;
    let issuanceOrderMakerAddress: Address;
    let issuanceOrderMakerTokenAmount: BigNumber;
    let issuanceOrderMakerRelayerFee: BigNumber;
    let issuanceOrderTakerRelayerFee: BigNumber;
    let issuanceOrderExpiration: BigNumber;
    let issuanceOrderRequiredComponents: Address[];
    let issuanceOrderRequiredComponentAmounts: BigNumber[];
    let orderHash: string;

    let zeroExOrder: ZeroExSignedFillOrder;
    let zeroExOrderTakerAssetAmount: BigNumber;
    let takerWalletOrder: TakerWalletOrder;
    let takerWalletOrderComponentAmount: BigNumber;
    let kyberTrade: KyberTrade;
    let kyberTradeMakerTokenChange: BigNumber;
    let kyberConversionRatePower: BigNumber;

    beforeEach(async () => {
      await exchangeWrapper.deployAndAuthorizeTakerWalletExchangeWrapper(core, transferProxy);
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

      const firstComponent = await erc20Wrapper.deployTokenAsync(issuanceOrderTaker);
      const secondComponent = await erc20Wrapper.deployTokenAsync(zeroExOrderMaker);
      const thirdComponent = erc20Wrapper.kyberReserveToken(SetTestUtils.KYBER_RESERVE_DESTINATION_TOKEN_ADDRESS);
      makerToken = erc20Wrapper.kyberReserveToken(SetTestUtils.KYBER_RESERVE_SOURCE_TOKEN_ADDRESS);
      relayerToken = await erc20Wrapper.deployTokenAsync(issuanceOrderMaker);

      const componentTokens = [firstComponent, secondComponent, thirdComponent];
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
        [makerToken, relayerToken],
        transferProxy.address,
        issuanceOrderMaker
      );
      await erc20Wrapper.approveTransfersAsync(
        [firstComponent, relayerToken],
        transferProxy.address,
        issuanceOrderTaker
      );
      await erc20Wrapper.approveTransfersAsync(
        [secondComponent],
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        zeroExOrderMaker
      );

      // Create issuance order, submitting ether(30) makerToken for ether(4) of the Set with 3 components
      const quantity = issuanceOrderQuantity || ether(4);
      issuanceOrderRequiredComponents =
        issuanceOrderRequiredComponents || [firstComponent.address, secondComponent.address, thirdComponent.address];
      issuanceOrderRequiredComponentAmounts =
        issuanceOrderRequiredComponentAmounts || _.map(componentUnits, unit => unit.mul(quantity).div(naturalUnit));

      // Property:                Value                          | Default                   | Property
      subjectIssuanceOrder = {
        setAddress:               issuanceOrderSetAddress       || setToken.address,        // setAddress
        makerAddress:             issuanceOrderMakerAddress     || issuanceOrderMaker,      // makerAddress
        makerToken:               makerToken.address,                                       // makerToken
        relayerAddress:           relayerAddress                || relayerAccount,          // relayerAddress
        relayerToken:             relayerToken.address,                                     // relayerToken
        quantity:                 quantity                      || ether(4),                // quantity
        makerTokenAmount:         issuanceOrderMakerTokenAmount || ether(30),               // makerTokenAmount
        expiration:               issuanceOrderExpiration       || SetTestUtils.generateTimestamp(10000), // expiration
        makerRelayerFee:          issuanceOrderMakerRelayerFee  || ether(3),                // makerRelayerFee
        takerRelayerFee:          issuanceOrderTakerRelayerFee  || ZERO,                    // takerRelayerFee
        requiredComponents:       issuanceOrderRequiredComponents,                          // requiredComponents
        requiredComponentAmounts: issuanceOrderRequiredComponentAmounts,                    // requiredComponentAmounts
        salt:                     SetUtils.generateSalt(),                                  // salt
      } as IssuanceOrder;

      orderHash = SetUtils.hashOrderHex(subjectIssuanceOrder);
      const ecSignature = await setUtils.signMessage(orderHash, issuanceOrderMaker, false);
      const signature = setUtils.convertSigToHex(ecSignature);

      // Create Taker Wallet transfer for the first component
      takerWalletOrder = {
        takerTokenAddress: firstComponent.address,
        takerTokenAmount: takerWalletOrderComponentAmount || issuanceOrderRequiredComponentAmounts[0],
      } as TakerWalletOrder;

      // Create 0x order for the second component, using ether(4) makerToken as default
      zeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                     // senderAddress
        zeroExOrderMaker,                                 // makerAddress
        NULL_ADDRESS,                                     // takerAddress
        ZERO,                                             // makerFee
        ZERO,                                             // takerFee
        issuanceOrderRequiredComponentAmounts[1],         // makerAssetAmount
        zeroExOrderTakerAssetAmount || ether(4),          // takerAssetAmount
        secondComponent.address,                          // makerAssetAddress
        makerToken.address,                               // takerAssetAddress
        SetUtils.generateSalt(),                          // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,            // exchangeAddress
        NULL_ADDRESS,                                     // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),            // expirationTimeSeconds
        zeroExOrderTakerAssetAmount || ether(4),          // amount of zeroExOrder to fill
      );

      // Create Kyber trade for the third component, using ether(25) makerToken. Conversion rate pre set on snapshot
      const sourceTokenQuantity = ether(25);
      const maxDestinationQuantity = issuanceOrderRequiredComponentAmounts[2];
      const componentTokenDecimals = (await thirdComponent.decimals.callAsync()).toNumber();
      const sourceTokenDecimals = (await makerToken.decimals.callAsync()).toNumber();
      kyberConversionRatePower = new BigNumber(10).pow(18 + sourceTokenDecimals - componentTokenDecimals);
      const minimumConversionRate = maxDestinationQuantity.div(sourceTokenQuantity)
                                                          .mul(kyberConversionRatePower)
                                                          .round();
      kyberTradeMakerTokenChange = sourceTokenQuantity.sub(
        maxDestinationQuantity.mul(kyberConversionRatePower).div(KYBER_RESERVE_CONFIGURED_RATE).floor());
      kyberTrade = {
        sourceToken: makerToken.address,
        destinationToken: thirdComponent.address,
        sourceTokenQuantity: sourceTokenQuantity,
        minimumConversionRate: minimumConversionRate,
        maxDestinationQuantity: maxDestinationQuantity,
      } as KyberTrade;

      subjectQuantityToFill = subjectIssuanceOrder.quantity;
      subjectSignature = signature;
      subjectExchangeOrdersData = setUtils.generateSerializedOrders([zeroExOrder, takerWalletOrder, kyberTrade]);
      subjectCaller = issuanceOrderTaker;
    });

    async function subject(): Promise<string> {
      return issuanceOrderModule.fillOrder.sendTransactionAsync(
        subjectIssuanceOrder,
        subjectQuantityToFill,
        subjectSignature,
        subjectExchangeOrdersData,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it('transfers the maker token amount from the maker, and returns change from Kyber', async () => {
      const existingBalance = await makerToken.balanceOf.callAsync(issuanceOrderMaker);
      await assertTokenBalanceAsync(makerToken, DEPLOYED_TOKEN_QUANTITY, issuanceOrderMaker);

      await subject();

      // TODO: Change from unused kyber source token is not being calculated correctly, off by 3 * 10 ** -26
      const expectedNewBalance = existingBalance.sub(subjectIssuanceOrder.makerTokenAmount)
                                                .add(kyberTradeMakerTokenChange);
      const newBalance = await makerToken.balanceOf.callAsync(issuanceOrderMaker);
      await expect(newBalance.toPrecision(26)).to.be.bignumber.equal(expectedNewBalance.toPrecision(26));
    });

    it('transfers the remaining maker tokens to the taker', async () => {
      const existingBalance = await makerToken.balanceOf.callAsync(subjectCaller);
      await assertTokenBalanceAsync(makerToken, ZERO, subjectCaller);

      await subject();

      const expectedNewBalance = existingBalance.plus(subjectIssuanceOrder.makerTokenAmount)
                                                .sub(zeroExOrder.fillAmount)
                                                .sub(kyberTrade.sourceTokenQuantity);
      await assertTokenBalanceAsync(makerToken, expectedNewBalance, subjectCaller);
    });

    it('transfers the fees to the relayer', async () => {
      await assertTokenBalanceAsync(relayerToken, ZERO, subjectIssuanceOrder.relayerAddress);

      await subject();

      const expectedNewBalance = subjectIssuanceOrder.makerRelayerFee.add(subjectIssuanceOrder.takerRelayerFee);
      await assertTokenBalanceAsync(relayerToken, expectedNewBalance, subjectIssuanceOrder.relayerAddress);
    });

    it('mints the correct quantity of the set for the maker', async () => {
      const existingBalance = await setToken.balanceOf.callAsync(issuanceOrderMaker);

      await subject();

      await assertTokenBalanceAsync(setToken, existingBalance.add(subjectQuantityToFill), issuanceOrderMaker);
    });

    it('marks the correct amount as filled in orderFills mapping', async () => {
      const preFilled = await issuanceOrderModule.orderFills.callAsync(orderHash);
      expect(preFilled).to.be.bignumber.equal(ZERO);

      await subject();

      const filled = await issuanceOrderModule.orderFills.callAsync(orderHash);
      expect(filled).to.be.bignumber.equal(subjectQuantityToFill);
    });

    it('emits correct LogFill event', async () => {
      const makerTokenEarnedByOrderTaker =
        subjectIssuanceOrder.makerTokenAmount.sub(zeroExOrder.fillAmount)
                                             .sub(kyberTrade.sourceTokenQuantity);
      const relayerTokenEarnedByRelayer =
        subjectIssuanceOrder.makerRelayerFee.add(subjectIssuanceOrder.takerRelayerFee);

      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = getExpectedFillLog(
        setToken.address,                    // setAddress
        issuanceOrderMaker,                  // makerAddress
        subjectCaller,                       // takerAddress
        makerToken.address,                  // makerToken
        subjectIssuanceOrder.relayerAddress, // relayerAddress
        relayerToken.address,                // relayerToken
        subjectQuantityToFill,               // quantityFilled
        makerTokenEarnedByOrderTaker,        // makerTokenToTaker
        relayerTokenEarnedByRelayer,         // relayerTokenAmountPaid
        orderHash,                           // orderHash
        issuanceOrderModule.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the fill size is half of the order quantity', async () => {
      let zeroExOrderPartialFillAmount: BigNumber;
      let kyberTradePartialSourceQuantity: BigNumber;
      let kyberTradePartialDestinationAmount: BigNumber;

      beforeEach(async () => {
        zeroExOrderPartialFillAmount = zeroExOrder.fillAmount.div(2);
        kyberTradePartialSourceQuantity = kyberTrade.sourceTokenQuantity.div(2);
        kyberTradePartialDestinationAmount = kyberTrade.maxDestinationQuantity.div(2);

        zeroExOrder.fillAmount = zeroExOrderPartialFillAmount;
        kyberTrade.sourceTokenQuantity = kyberTradePartialSourceQuantity;
        kyberTrade.maxDestinationQuantity = kyberTradePartialDestinationAmount;
        kyberTradeMakerTokenChange = kyberTradePartialSourceQuantity.sub(
          kyberTradePartialDestinationAmount.mul(kyberConversionRatePower)
                                            .div(KYBER_RESERVE_CONFIGURED_RATE)
                                            .floor());

        subjectExchangeOrdersData = setUtils.generateSerializedOrders([zeroExOrder, takerWalletOrder, kyberTrade]);
        subjectQuantityToFill = subjectIssuanceOrder.quantity.div(2);
      });

      it('transfers the partial maker token amount from the maker', async () => {
        const existingBalance = await makerToken.balanceOf.callAsync(issuanceOrderMaker);
        await assertTokenBalanceAsync(makerToken, DEPLOYED_TOKEN_QUANTITY, issuanceOrderMaker);

        await subject();

        // TODO: Change from unused kyber source token is not being calculated correctly, off by 5 * 10 ** -27
        const expectedNewBalance = existingBalance.sub(subjectIssuanceOrder.makerTokenAmount.div(2))
                                                  .add(kyberTradeMakerTokenChange);
        const newBalance = await makerToken.balanceOf.callAsync(issuanceOrderMaker);
        await expect(newBalance.toPrecision(26)).to.be.bignumber.equal(expectedNewBalance.toPrecision(26));
      });

      it('transfers the remaining maker tokens to the taker', async () => {
        const existingBalance = await makerToken.balanceOf.callAsync(subjectCaller);
        await assertTokenBalanceAsync(makerToken, ZERO, subjectCaller);

        await subject();

        const expectedNewBalance = existingBalance.plus(subjectIssuanceOrder.makerTokenAmount.div(2))
                                                  .sub(zeroExOrderPartialFillAmount)
                                                  .sub(kyberTradePartialSourceQuantity);
        await assertTokenBalanceAsync(makerToken, expectedNewBalance, subjectCaller);
      });

      it('transfers the partial fees to the relayer', async () => {
        await assertTokenBalanceAsync(relayerToken, ZERO, subjectIssuanceOrder.relayerAddress);

        await subject();

        const expectedNewBalance = ether(3).mul(subjectQuantityToFill).div(ether(4));
        await assertTokenBalanceAsync(relayerToken, expectedNewBalance, subjectIssuanceOrder.relayerAddress);
      });

      it('mints the correct partial quantity of the set for the user', async () => {
        const existingBalance = await setToken.balanceOf.callAsync(issuanceOrderMaker);

        await subject();

        await assertTokenBalanceAsync(setToken, existingBalance.add(subjectQuantityToFill), issuanceOrderMaker);
      });

      it('marks the correct partial amount as filled in orderFills mapping', async () => {
        const preFilled = await issuanceOrderModule.orderFills.callAsync(orderHash);
        expect(preFilled).to.be.bignumber.equal(ZERO);

        await subject();

        const filled = await issuanceOrderModule.orderFills.callAsync(orderHash);
        expect(filled).to.be.bignumber.equal(subjectQuantityToFill);
      });

      it('emits correct LogFill event', async () => {
        const makerTokenEarnedByOrderTaker =
          subjectIssuanceOrder.makerTokenAmount.div(2)
                                               .sub(zeroExOrderPartialFillAmount)
                                               .sub(kyberTradePartialSourceQuantity);
        const relayerTokenEarnedByRelayer =
          subjectIssuanceOrder.makerRelayerFee.add(subjectIssuanceOrder.takerRelayerFee).div(2);

        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const expectedLogs = getExpectedFillLog(
          setToken.address,                    // setAddress
          issuanceOrderMaker,                  // makerAddress
          subjectCaller,                       // takerAddress
          makerToken.address,                  // makerToken
          subjectIssuanceOrder.relayerAddress, // relayerAddress
          relayerToken.address,                // relayerToken
          subjectQuantityToFill,               // quantityFilled
          makerTokenEarnedByOrderTaker,        // makerTokenToTaker
          relayerTokenEarnedByRelayer,         // relayerTokenAmountPaid
          orderHash,                           // orderHash
          issuanceOrderModule.address
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
      });

      describe('and half of the order is already filled', async () => {
        beforeEach(async() => {
          // Fill first half of order to trigger non-signature check
          await issuanceOrderModule.fillOrder.sendTransactionAsync(
            subjectIssuanceOrder,
            subjectQuantityToFill,
            subjectSignature,
            subjectExchangeOrdersData,
            { from: subjectCaller, gas: DEFAULT_GAS },
          );
        });

        it('mints the correct partial quantity of the set for the user', async () => {
          const existingBalance = await setToken.balanceOf.callAsync(issuanceOrderMaker);

          await subject();

          await assertTokenBalanceAsync(setToken, existingBalance.add(subjectQuantityToFill), issuanceOrderMaker);
        });
      });
    });

    describe('when the order has been partially taken but order for larger size submitted', async () => {
      let zeroExOrderPartialFillAmount: BigNumber;
      let kyberTradePartialSourceQuantity: BigNumber;
      let kyberTradePartialDestinationAmount: BigNumber;
      let actualExecutionQuantity: BigNumber;
      let executionRatio: BigNumber;

      beforeEach(async () => {
        const quantityToCancel = subjectQuantityToFill.div(2);
        actualExecutionQuantity = subjectIssuanceOrder.quantity.sub(quantityToCancel);
        executionRatio = actualExecutionQuantity.div(subjectIssuanceOrder.quantity);

        zeroExOrderPartialFillAmount = zeroExOrder.fillAmount.mul(executionRatio);
        kyberTradePartialSourceQuantity = kyberTrade.sourceTokenQuantity.mul(executionRatio);
        kyberTradePartialDestinationAmount = kyberTrade.maxDestinationQuantity.mul(executionRatio);
        kyberTradeMakerTokenChange = kyberTradePartialSourceQuantity.sub(
          kyberTradePartialDestinationAmount.mul(kyberConversionRatePower)
                                            .div(KYBER_RESERVE_CONFIGURED_RATE)
                                            .floor());

        await issuanceOrderModule.cancelOrder.sendTransactionAsync(
          subjectIssuanceOrder,
          quantityToCancel,
          { from: issuanceOrderMaker }
        );
      });

      it('transfers the partial maker token amount from the maker', async () => {
        const existingBalance = await makerToken.balanceOf.callAsync(issuanceOrderMaker);
        await assertTokenBalanceAsync(makerToken, DEPLOYED_TOKEN_QUANTITY, issuanceOrderMaker);

        await subject();

        // TODO: Change from unused kyber source token is not being calculated correctly, off by 5 * 10 ** -27
        const expectedNewBalance = existingBalance.sub(subjectIssuanceOrder.makerTokenAmount.mul(executionRatio))
                                                  .add(kyberTradeMakerTokenChange);
        const newBalance = await makerToken.balanceOf.callAsync(issuanceOrderMaker);
        await expect(newBalance.toPrecision(26)).to.be.bignumber.equal(expectedNewBalance.toPrecision(26));
      });

      it('transfers the remaining maker tokens to the taker', async () => {
        const existingBalance = await makerToken.balanceOf.callAsync(subjectCaller);
        await assertTokenBalanceAsync(makerToken, ZERO, subjectCaller);

        await subject();

        const expectedNewBalance = existingBalance.plus(subjectIssuanceOrder.makerTokenAmount.mul(executionRatio))
                                                  .sub(zeroExOrderPartialFillAmount)
                                                  .sub(kyberTradePartialSourceQuantity);
        await assertTokenBalanceAsync(makerToken, expectedNewBalance, subjectCaller);
      });

      it('transfers the partial fees to the relayer', async () => {
        await assertTokenBalanceAsync(relayerToken, ZERO, subjectIssuanceOrder.relayerAddress);

        await subject();

        const expectedNewBalance = ether(3).mul(actualExecutionQuantity).div(ether(4));
        await assertTokenBalanceAsync(relayerToken, expectedNewBalance, subjectIssuanceOrder.relayerAddress);
      });

      it('mints the correct partial quantity of the set for the user', async () => {
        const existingBalance = await setToken.balanceOf.callAsync(issuanceOrderMaker);

        await subject();

        await assertTokenBalanceAsync(setToken, existingBalance.add(actualExecutionQuantity), issuanceOrderMaker);
      });

      it('marks the correct partial amount as filled in orderFills mapping', async () => {
        const preFilled = await issuanceOrderModule.orderFills.callAsync(orderHash);
        expect(preFilled).to.be.bignumber.equal(ZERO);

        await subject();

        const filled = await issuanceOrderModule.orderFills.callAsync(orderHash);
        expect(filled).to.be.bignumber.equal(actualExecutionQuantity);
      });

      it('emits correct LogFill event', async () => {
        const makerTokenEarnedByOrderTaker =
          subjectIssuanceOrder.makerTokenAmount.mul(executionRatio)
                                               .sub(zeroExOrderPartialFillAmount)
                                               .sub(kyberTradePartialSourceQuantity);
        const relayerTokenEarnedByRelayer =
          subjectIssuanceOrder.makerRelayerFee.add(subjectIssuanceOrder.takerRelayerFee)
                                              .mul(executionRatio);

        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const expectedLogs = getExpectedFillLog(
          setToken.address,                    // setAddress
          issuanceOrderMaker,                  // makerAddress
          subjectCaller,                       // takerAddress
          makerToken.address,                  // makerToken
          subjectIssuanceOrder.relayerAddress, // relayerAddress
          relayerToken.address,                // relayerToken
          actualExecutionQuantity,             // quantityFilled
          makerTokenEarnedByOrderTaker,        // makerTokenToTaker
          relayerTokenEarnedByRelayer,         // relayerTokenAmountPaid
          orderHash,                           // orderHash
          issuanceOrderModule.address
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
      });
    });

    describe('when the relayer fees are zero', async () => {
      before(async () => {
        ABIDecoder.addABI(StandardTokenMock.abi);
        issuanceOrderMakerRelayerFee = ether(0);
        issuanceOrderTakerRelayerFee = ether(0);
      });

      after(async () => {
        ABIDecoder.removeABI(StandardTokenMock.abi);
        issuanceOrderMakerRelayerFee = undefined;
        issuanceOrderTakerRelayerFee = undefined;
      });

      it('does not execute a transfer of the relayer fees for 0 amount', async () => {
        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const transferAddresses: Address[] = [];
        formattedLogs.forEach( event => {
          if (event.event == 'Transfer') {
            transferAddresses.push(event.args.to);
          }
        });

        expect(transferAddresses).to.not.include(subjectIssuanceOrder.relayerAddress);
      });
    });

    describe('when the return amount to the taker is 0', async () => {
      before(async () => {
        ABIDecoder.addABI(StandardTokenMock.abi);
        zeroExOrderTakerAssetAmount = ether(5);
      });

      after(async () => {
        ABIDecoder.removeABI(StandardTokenMock.abi);
        zeroExOrderTakerAssetAmount = undefined;
      });

      it('does not execute a transfer of the relayer fees for 0 amount', async () => {
        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const transferAddresses: Address[] = [];
        formattedLogs.forEach( event => {
          if (event.event == 'Transfer') {
            transferAddresses.push(event.args.to);
          }
        });

        expect(transferAddresses).to.not.include(subjectCaller);
      });
    });

    describe('when there is a taker relayer fee', async () => {
      before(async () => {
        issuanceOrderTakerRelayerFee = ether(1);
      });

      after(async () => {
        issuanceOrderTakerRelayerFee = undefined;
      });

      beforeEach(async() => {
        await erc20Wrapper.transferTokenAsync(
          relayerToken,
          issuanceOrderTaker,
          DEPLOYED_TOKEN_QUANTITY.div(2),
          issuanceOrderMaker
        );
      });

      it('transfers the fees to the relayer', async () => {
        await assertTokenBalanceAsync(relayerToken, ZERO, subjectIssuanceOrder.relayerAddress);

        await subject();

        const expectedNewBalance = subjectIssuanceOrder.makerRelayerFee.add(subjectIssuanceOrder.takerRelayerFee);
        await assertTokenBalanceAsync(relayerToken, expectedNewBalance, subjectIssuanceOrder.relayerAddress);
      });
    });

    describe('when the relayer address is null', async () => {
      before(async () => {
        ABIDecoder.addABI(StandardTokenMock.abi);
        relayerAddress = NULL_ADDRESS;
      });

      after(async () => {
        ABIDecoder.removeABI(StandardTokenMock.abi);
        relayerAddress = undefined;
      });

      it('does not execute a transfer', async () => {
        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const transferAddresses: Address[] = [];
        formattedLogs.forEach( event => {
          if (event.event == 'Transfer') {
            transferAddresses.push(event.args.to);
          }
        });

        expect(transferAddresses).to.not.include(relayerAddress);
      });
    });

    describe('when the order has been taken', async () => {
      beforeEach(async () => {
        const quantityToCancel = subjectQuantityToFill;
        await issuanceOrderModule.cancelOrder.sendTransactionAsync(
          subjectIssuanceOrder,
          quantityToCancel,
          { from: issuanceOrderMaker }
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the fill size is greater than the order quantity', async () => {
      beforeEach(async () => {
        subjectQuantityToFill = subjectIssuanceOrder.quantity.add(1);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the set was not created through core', async () => {
      before(async () => {
        issuanceOrderSetAddress = NULL_ADDRESS;
      });

      after(async () => {
        issuanceOrderSetAddress = undefined;
       });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the fill quantity is not a multiple of the natural unit of the set', async () => {
      beforeEach(async () => {
        subjectQuantityToFill = naturalUnit.add(1);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the order quantity is not a multiple of the natural unit of the set', async () => {
      before(async () => {
        issuanceOrderQuantity = ether(3); // naturalUnit = ether(2);
      });

      after(async () => {
        issuanceOrderQuantity = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the order has expired', async () => {
      before(async () => {
        issuanceOrderExpiration = ZERO;
      });

     after(async () => {
        issuanceOrderExpiration = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when quantity is zero', async () => {
      before(async () => {
        issuanceOrderQuantity = ZERO;
      });

     after(async () => {
        issuanceOrderQuantity = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when maker token amount is zero', async () => {
      before(async () => {
        issuanceOrderMakerTokenAmount = ZERO;
      });

     after(async () => {
        issuanceOrderMakerTokenAmount = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the message is not signed by the maker', async () => {
      before(async () => {
        issuanceOrderMakerAddress = notIssuanceOrderMaker;
      });

     after(async () => {
        issuanceOrderMakerAddress = undefined;
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

    describe('when the taker wallet component amount is less than required component amount', async () => {
      before(async () => {
        takerWalletOrderComponentAmount = ether(1);
      });

      after(async () => {
        takerWalletOrderComponentAmount = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the 0x order uses more maker token than the signed amount', async () => {
      beforeEach(async () => {

        // We are generating separate orders because we need to manaully update the exchange header to pass
        // in an invalid makerTokenAmount. It will be greater than the amount the user signed
        const zeroExOrderTakerAssetAmount = subjectIssuanceOrder.makerTokenAmount.add(1);

        const invalidZeroExOrder: ZeroExSignedFillOrder = await setUtils.generateZeroExSignedFillOrder(
          NULL_ADDRESS,                                     // senderAddress
          zeroExOrderMaker,                                 // makerAddress
          NULL_ADDRESS,                                     // takerAddress
          ZERO,                                             // makerFee
          ZERO,                                             // takerFee
          issuanceOrderRequiredComponentAmounts[1],         // makerAssetAmount
          zeroExOrderTakerAssetAmount,                      // takerAssetAmount
          issuanceOrderRequiredComponents[1],               // makerAssetAddress
          makerToken.address,                               // takerAssetAddress
          SetUtils.generateSalt(),                          // salt
          SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,            // exchangeAddress
          NULL_ADDRESS,                                     // feeRecipientAddress
          SetTestUtils.generateTimestamp(10000),            // expirationTimeSeconds
          zeroExOrderTakerAssetAmount,                      // amount of 0x order to fill
        );
        const zeroExOrderBuffer: Buffer = Buffer.concat(
          SetTestUtils.zeroExSignedFillOrderToBuffer(invalidZeroExOrder)
        );

        const exchangeHeaderOrderCount = 1;
        const exchangeHeaderMakerTokenAmount = zeroExOrderTakerAssetAmount;
        const exchangeHeaderTotalOrderBodyLength = zeroExOrderBuffer.length;
        const zeroExOrdersExchangeHeader = Buffer.concat(
          SetTestUtils.generateExchangeOrderHeader(
            SetUtils.EXCHANGES.ZERO_EX,
            exchangeHeaderOrderCount,
            exchangeHeaderMakerTokenAmount,
            exchangeHeaderTotalOrderBodyLength,
          )
         );

        subjectExchangeOrdersData = ethUtil.bufferToHex(
          Buffer.concat([zeroExOrdersExchangeHeader, zeroExOrderBuffer])
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when rounding error is too large', async () => {
      before(async () => {
        issuanceOrderQuantity = ether(6);
        issuanceOrderMakerTokenAmount = new BigNumber(10);
      });

      beforeEach(async () => {
        subjectQuantityToFill = ether(4);
      });

      after(async () => {
        issuanceOrderQuantity = undefined;
        issuanceOrderMakerTokenAmount = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the required components is empty', async () => {
      before(async () => {
        issuanceOrderRequiredComponents = [];
      });

     after(async () => {
        issuanceOrderRequiredComponents = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the required components and amount lengths differ', async () => {
      before(async () => {
        issuanceOrderRequiredComponents = [notIssuanceOrderMaker];
      });

      after(async () => {
        issuanceOrderRequiredComponents = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when a required component is not a member of the setAddress', async () => {
      before(async () => {
        const notComponent = notIssuanceOrderMaker;
        issuanceOrderRequiredComponents = [notComponent, notComponent, notComponent];
      });

      after(async () => {
        issuanceOrderRequiredComponents = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when a required component amount is 0', async () => {
      before(async () => {
        issuanceOrderRequiredComponentAmounts = [ZERO, ZERO, ZERO];
      });

      after(async () => {
        issuanceOrderRequiredComponentAmounts = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#cancelOrder', async () => {
    let subjectCaller: Address;
    let subjectQuantityToCancel: BigNumber;
    let subjectIssuanceOrder: IssuanceOrder;

    let naturalUnit: BigNumber;
    let setToken: SetTokenContract;
    let makerToken: StandardTokenMockContract;

    let issuanceOrderQuantity: BigNumber;
    let issuanceOrderMakerTokenAmount: BigNumber;
    let issuanceOrderExpiration: BigNumber;
    let orderHash: string;

    beforeEach(async () => {
      makerToken = await erc20Wrapper.deployTokenAsync(issuanceOrderMaker);
      const firstComponent = await erc20Wrapper.deployTokenAsync(issuanceOrderTaker);
      const secondComponent = await erc20Wrapper.deployTokenAsync(zeroExOrderMaker);
      const relayerToken = await erc20Wrapper.deployTokenAsync(issuanceOrderMaker);

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

      const quantity = issuanceOrderQuantity || ether(4);
      const issuanceOrderMakerRelayerFee = ether(3);
      const issuanceOrderTakerRelayerFee = ZERO;
      const requiredComponents = [firstComponent.address, secondComponent.address];
      const requiredComponentAmounts = _.map(componentUnits, unit => unit.mul(quantity).div(naturalUnit));

      // Property:                Value                          | Default                   | Property
      subjectIssuanceOrder = {
        setAddress:               setToken.address,                                         // setAddress
        makerAddress:             issuanceOrderMaker,                                       // makerAddress
        makerToken:               makerToken.address,                                       // makerToken
        relayerAddress:           relayerAccount,                                           // relayerAddress
        relayerToken:             relayerToken.address,                                     // relayerToken
        quantity:                 quantity                      || ether(4),                // quantity
        makerTokenAmount:         issuanceOrderMakerTokenAmount || ether(10),               // makerTokenAmount
        expiration:               issuanceOrderExpiration       || SetTestUtils.generateTimestamp(10000), // expiration
        makerRelayerFee:          issuanceOrderMakerRelayerFee,                             // makerRelayerFee
        takerRelayerFee:          issuanceOrderTakerRelayerFee,                             // takerRelayerFee
        requiredComponents:       requiredComponents,                                       // requiredComponents
        requiredComponentAmounts: requiredComponentAmounts,                                 // requiredComponentAmounts
        salt:                     SetUtils.generateSalt(),                                  // salt
      };
      orderHash = SetUtils.hashOrderHex(subjectIssuanceOrder);

      subjectQuantityToCancel = subjectIssuanceOrder.quantity.div(2);
      subjectCaller = issuanceOrderMaker;
    });

    async function subject(): Promise<string> {
      return issuanceOrderModule.cancelOrder.sendTransactionAsync(
        subjectIssuanceOrder,
        subjectQuantityToCancel,
        { from: subjectCaller },
      );
    }

    it('marks the correct amount as canceled in orderCancels mapping', async () => {
      const preCanceled = await issuanceOrderModule.orderCancels.callAsync(orderHash);
      expect(preCanceled).to.be.bignumber.equal(ZERO);

      await subject();

      const canceled = await issuanceOrderModule.orderCancels.callAsync(orderHash);
      expect(canceled).to.be.bignumber.equal(subjectQuantityToCancel);
    });

    it('emits correct LogCancel event', async () => {
      const txHash = await subject();
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = getExpectedCancelLog(
        setToken.address,
        issuanceOrderMaker,
        makerToken.address,
        subjectIssuanceOrder.relayerAddress,
        subjectQuantityToCancel,
        orderHash,
        issuanceOrderModule.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the quantity to cancel is greater than the open amount', async () => {
      beforeEach(async () => {
        subjectQuantityToCancel = ether(6);
      });

      it('should mark only the remaining open amount as canceled', async () => {
        const filled = await issuanceOrderModule.orderFills.callAsync(orderHash);
        const preCanceled = await issuanceOrderModule.orderCancels.callAsync(orderHash);
        const openAmount = subjectIssuanceOrder.quantity.minus(filled).minus(preCanceled);

        await subject();

        const canceled = await issuanceOrderModule.orderCancels.callAsync(orderHash);
        expect(canceled).to.be.bignumber.equal(preCanceled.add(openAmount));
        expect(canceled).to.be.bignumber.not.equal(preCanceled.plus(subjectQuantityToCancel));
      });
    });

    describe('when the order has been taken', async () => {
      beforeEach(async () => {
        subjectQuantityToCancel = subjectIssuanceOrder.quantity;
        await issuanceOrderModule.cancelOrder.sendTransactionAsync(
          subjectIssuanceOrder,
          subjectQuantityToCancel,
          { from: subjectCaller }
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the quantity to cancel is not positive', async () => {
      beforeEach(async () => {
        subjectQuantityToCancel = ZERO;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the transaction sender is not the maker', async () => {
      beforeEach(async () => {
        subjectCaller = issuanceOrderTaker;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the order has expired', async () => {
      before(async () => {
        issuanceOrderExpiration = ZERO;
      });

      after(async () => {
        issuanceOrderExpiration = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the cancel quantity is not a multiple of the natural unit of the set', async () => {
      beforeEach(async () => {
        subjectQuantityToCancel = naturalUnit.add(1);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the order quantity is not a multiple of the natural unit of the set', async () => {
      before(async () => {
        issuanceOrderQuantity = ether(3); // naturalUnit = ether(2);
      });

      after(async () => {
        issuanceOrderQuantity = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when quantity is zero', async () => {
      before(async () => {
        issuanceOrderQuantity = ZERO;
      });

      after(async () => {
        issuanceOrderQuantity = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when maker token amount is zero', async () => {
      before(async () => {
        issuanceOrderMakerTokenAmount = ZERO;
      });

      after(async () => {
        issuanceOrderMakerTokenAmount = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#setSignatureValidator', async () => {
    let subjectCaller: Address;
    let subjectSignatureValidator: Address;

    beforeEach(async () => {
      subjectSignatureValidator = contractDeployer;
      subjectCaller = contractDeployer;
    });

    async function subject(): Promise<string> {
      return issuanceOrderModule.setSignatureValidator.sendTransactionAsync(
        subjectSignatureValidator,
        { from: subjectCaller },
      );
    }

    it('changes the signatureValidator to the correct address', async () => {
      await subject();

      const signatureValidatorAddress = await issuanceOrderModule.signatureValidator.callAsync();
      expect(signatureValidatorAddress).to.equal(subjectSignatureValidator);
    });

    it('emits the correct SignatureValidatorChanged log', async () => {
      const txHash = await subject();
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = SignatureValidatorChanged(
        issuanceOrderModule.address,
        subjectSignatureValidator,
      );
      await SetTestUtils.assertLogEquivalence(formattedLogs, [expectedLogs]);
    });

    describe('when the caller is not the owner of the contract', async () => {
      beforeEach(async () => {
        subjectCaller = notOwner;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
