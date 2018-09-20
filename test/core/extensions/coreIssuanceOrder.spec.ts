import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import {
  Address,
  Bytes,
  IssuanceOrder,
  TakerWalletOrder,
  ZeroExSignedFillOrder
} from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '../../../utils/chaiSetup';
import { BigNumberSetup } from '../../../utils/bigNumberSetup';
import {
  CoreContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract
} from '../../../utils/contracts';
import { ether } from '../../../utils/units';
import { assertTokenBalance, expectRevertError } from '../../../utils/tokenAssertions';
import { DEFAULT_GAS, DEPLOYED_TOKEN_QUANTITY } from '../../../utils/constants';
import { getExpectedFillLog, getExpectedCancelLog } from '../../../utils/contract_logs/coreIssuanceOrder';
import { ExchangeWrapper } from '../../../utils/exchangeWrapper';
import { generateOrdersDataWithIncorrectExchange } from '../../../utils/orders';
import { CoreWrapper } from '../../../utils/coreWrapper';
import { ERC20Wrapper } from '../../../utils/erc20Wrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const Core = artifacts.require('Core');
const StandardTokenMock = artifacts.require('StandardTokenMock');
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const setUtils = new SetUtils(web3);
const { expect } = chai;
const { NULL_ADDRESS, ZERO } = SetUtils.CONSTANTS;


contract('CoreIssuanceOrder', accounts => {
  const [
    contractDeployer,
    issuanceOrderTaker,
    issuanceOrderMaker,
    relayerAccount,
    zeroExOrderMaker,
    notIssuanceOrderMaker,
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;

  const coreWrapper = new CoreWrapper(contractDeployer, contractDeployer);
  const erc20Wrapper = new ERC20Wrapper(contractDeployer);
  const exchangeWrapper = new ExchangeWrapper(contractDeployer);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    vault = await coreWrapper.deployVaultAsync();
    transferProxy = await coreWrapper.deployTransferProxyAsync();
    core = await coreWrapper.deployCoreAsync(transferProxy, vault);
    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);

    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);
  });

  describe('#fillOrder', async () => {
    let subjectCaller: Address;
    let subjectAddresses: Address[];
    let subjectValues: BigNumber[];
    let subjectRequiredComponents: Address[];
    let subjectRequiredComponentAmounts: BigNumber[];
    let subjectQuantityToFill: BigNumber;
    let subjectVSignature: BigNumber;
    let subjectSigBytes: Bytes[];
    let subjectExchangeOrdersData: Bytes;

    let relayerAddress: Address;
    let relayerToken: StandardTokenMockContract;
    let makerToken: StandardTokenMockContract;

    let naturalUnit: BigNumber;
    let setToken: SetTokenContract;

    let order: IssuanceOrder;
    let issuanceOrderSetAddress: Address;
    let issuanceOrderQuantity: BigNumber;
    let issuanceOrderMakerAddress: Address;
    let issuanceOrderMakerTokenAmount: BigNumber;
    let issuanceOrderMakerRelayerFee: BigNumber;
    let issuanceOrderTakerRelayerFee: BigNumber;
    let issuanceOrderExpiration: BigNumber;
    let orderHash: string;

    let zeroExOrder: ZeroExSignedFillOrder;
    let makerTokenAmountToUseOnZeroExOrderAsFillAmount: BigNumber;
    let makerTokenAmountToUseOnZeroExOrderOverride: BigNumber;
    let takerWalletOrder: TakerWalletOrder;
    let takerWalletOrderComponentAmount: BigNumber;

    beforeEach(async () => {
      await exchangeWrapper.deployAndAuthorizeTakerWalletExchangeWrapper(transferProxy, core);
      await exchangeWrapper.deployAndAuthorizeZeroExExchangeWrapper(
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        transferProxy,
        core
      );

      const firstComponent = await erc20Wrapper.deployTokenAsync(issuanceOrderTaker);
      const secondComponent = await erc20Wrapper.deployTokenAsync(zeroExOrderMaker);
      makerToken = await erc20Wrapper.deployTokenAsync(issuanceOrderMaker);
      relayerToken = await erc20Wrapper.deployTokenAsync(issuanceOrderMaker);

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

      const quantity = issuanceOrderQuantity || ether(4);
      const requiredComponents = [firstComponent.address, secondComponent.address];
      const requiredComponentAmounts = _.map(componentUnits, unit => unit.mul(quantity).div(naturalUnit));

      // Property:                Value                          | Default                   | Property
      order = {
        setAddress:               issuanceOrderSetAddress       || setToken.address,        // setAddress
        makerAddress:             issuanceOrderMakerAddress     || issuanceOrderMaker,      // makerAddress
        makerToken:               makerToken.address,                                       // makerToken
        relayerAddress:           relayerAddress                || relayerAccount,          // relayerAddress
        relayerToken:             relayerToken.address,                                     // relayerToken
        quantity:                 quantity                      || ether(4),                // quantity
        makerTokenAmount:         issuanceOrderMakerTokenAmount || ether(10),               // makerTokenAmount
        expiration:               issuanceOrderExpiration       || SetUtils.generateTimestamp(10000), // expiration
        makerRelayerFee:          issuanceOrderMakerRelayerFee  || ether(3),                // makerRelayerFee
        takerRelayerFee:          issuanceOrderTakerRelayerFee  || ZERO,                    // takerRelayerFee
        requiredComponents:       requiredComponents,                                       // requiredComponents
        requiredComponentAmounts: requiredComponentAmounts,                                 // requiredComponentAmounts
        salt:                     SetUtils.generateSalt(),                                  // salt
      } as IssuanceOrder;

      orderHash = SetUtils.hashOrderHex(order);
      const signature = await setUtils.signMessage(orderHash, issuanceOrderMaker, false);

      takerWalletOrder = {
        takerTokenAddress: firstComponent.address,
        takerTokenAmount: takerWalletOrderComponentAmount || requiredComponentAmounts[0],
      } as TakerWalletOrder;

      const zeroExOrderTakerAssetAmount = order.makerTokenAmount.div(4);
      makerTokenAmountToUseOnZeroExOrderAsFillAmount = zeroExOrderTakerAssetAmount;
      zeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                   // senderAddress
        zeroExOrderMaker,                               // makerAddress
        NULL_ADDRESS,                                   // takerAddress
        ZERO,                                           // makerFee
        ZERO,                                           // takerFee
        requiredComponentAmounts[1],                    // makerAssetAmount
        zeroExOrderTakerAssetAmount,                    // takerAssetAmount
        secondComponent.address,                        // makerAssetAddress
        makerToken.address,                             // takerAssetAddress
        SetUtils.generateSalt(),                        // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,          // exchangeAddress
        NULL_ADDRESS,                                   // feeRecipientAddress
        SetUtils.generateTimestamp(10000),              // expirationTimeSeconds
        makerTokenAmountToUseOnZeroExOrderAsFillAmount, // amount of zeroExOrder to fill
      );

      subjectAddresses = [
        order.setAddress,
        order.makerAddress,
        order.makerToken,
        order.relayerAddress,
        order.relayerToken,
      ];
      subjectValues = [
        order.quantity,
        order.makerTokenAmount,
        order.expiration,
        order.makerRelayerFee,
        order.takerRelayerFee,
        order.salt,
      ];
      subjectRequiredComponents = order.requiredComponents;
      subjectRequiredComponentAmounts = order.requiredComponentAmounts;
      subjectQuantityToFill = order.quantity;
      subjectVSignature = new BigNumber(signature.v);
      subjectSigBytes = [signature.r, signature.s];
      subjectExchangeOrdersData = setUtils.generateSerializedOrders(
        makerToken.address,
        makerTokenAmountToUseOnZeroExOrderOverride || makerTokenAmountToUseOnZeroExOrderAsFillAmount,
        [zeroExOrder, takerWalletOrder]
      );
      subjectCaller = issuanceOrderTaker;
    });

    async function subject(): Promise<string> {
      return core.fillOrder.sendTransactionAsync(
        subjectAddresses,
        subjectValues,
        subjectRequiredComponents,
        subjectRequiredComponentAmounts,
        subjectQuantityToFill,
        subjectVSignature,
        subjectSigBytes,
        subjectExchangeOrdersData,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it('transfers the full maker token amount from the maker', async () => {
      const existingBalance = await makerToken.balanceOf.callAsync(issuanceOrderMaker);
      await assertTokenBalance(makerToken, DEPLOYED_TOKEN_QUANTITY, issuanceOrderMaker);

      await subject();

      const fullMakerTokenAmount = order.makerTokenAmount;
      const expectedNewBalance = existingBalance.sub(fullMakerTokenAmount);
      await assertTokenBalance(makerToken, expectedNewBalance, issuanceOrderMaker);
    });

    it('transfers the remaining maker tokens to the taker', async () => {
      const existingBalance = await makerToken.balanceOf.callAsync(issuanceOrderTaker);
      await assertTokenBalance(makerToken, ZERO, issuanceOrderTaker);

      await subject();

      const netMakerToTaker = order.makerTokenAmount.sub(zeroExOrder.fillAmount);
      const expectedNewBalance = existingBalance.plus(netMakerToTaker);
      await assertTokenBalance(makerToken, expectedNewBalance, issuanceOrderTaker);
    });

    it('transfers the fees to the relayer', async () => {
      await assertTokenBalance(relayerToken, ZERO, order.relayerAddress);

      await subject();

      const expectedNewBalance = order.makerRelayerFee.add(order.takerRelayerFee);
      await assertTokenBalance(relayerToken, expectedNewBalance, order.relayerAddress);
    });

    it('mints the correct quantity of the set for the maker', async () => {
      const existingBalance = await setToken.balanceOf.callAsync(issuanceOrderMaker);

      await subject();

      await assertTokenBalance(setToken, existingBalance.add(subjectQuantityToFill), issuanceOrderMaker);
    });

    it('marks the correct amount as filled in orderFills mapping', async () => {
      const preFilled = await core.orderFills.callAsync(orderHash);
      expect(preFilled).to.be.bignumber.equal(ZERO);

      await subject();

      const filled = await core.orderFills.callAsync(orderHash);
      expect(filled).to.be.bignumber.equal(subjectQuantityToFill);
    });

    it('emits correct LogFill event', async () => {
      const makerTokenEarnedByOrderTaker = order.makerTokenAmount.sub(makerTokenAmountToUseOnZeroExOrderAsFillAmount);
      const relayerTokenEarnedByRelayer = order.makerRelayerFee.add(order.takerRelayerFee);

      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = getExpectedFillLog(
        setToken.address,              // setAddress
        issuanceOrderMaker,            // makerAddress
        subjectCaller,                 // takerAddress
        makerToken.address,            // makerToken
        order.relayerAddress,          // relayerAddress
        relayerToken.address,          // relayerToken
        subjectQuantityToFill,         // quantityFilled
        makerTokenEarnedByOrderTaker,  // makerTokenToTaker
        relayerTokenEarnedByRelayer,   // relayerTokenAmountPaid
        orderHash,                     // orderHash
        core.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the fill size is less than the order quantity', async () => {
      beforeEach(async () => {
        subjectQuantityToFill = order.quantity.div(2);
      });

      it('transfers the partial maker token amount from the maker', async () => {
        const existingBalance = await makerToken.balanceOf.callAsync(issuanceOrderMaker);
        await assertTokenBalance(makerToken, DEPLOYED_TOKEN_QUANTITY, issuanceOrderMaker);

        await subject();

        const partialMakerTokenAmount = order.makerTokenAmount.mul(subjectQuantityToFill).div(ether(4));
        const expectedNewBalance = existingBalance.sub(partialMakerTokenAmount);
        await assertTokenBalance(makerToken, expectedNewBalance, issuanceOrderMaker);
      });

      it('transfers the partial maker token amount to the taker', async () => {
        const existingBalance = await makerToken.balanceOf.callAsync(issuanceOrderTaker);
        await assertTokenBalance(makerToken, ZERO, issuanceOrderTaker);

        await subject();

        const makerTokenAmountAvailableForThisOrder = order.makerTokenAmount.div(2);
        const netMakerToTaker = makerTokenAmountAvailableForThisOrder.mul(subjectQuantityToFill).div(ether(4));
        const expectedNewBalance = existingBalance.plus(netMakerToTaker);
        await assertTokenBalance(makerToken, expectedNewBalance, issuanceOrderTaker);
      });

      it('transfers the partial fees to the relayer', async () => {
        await assertTokenBalance(relayerToken, ZERO, order.relayerAddress);

        await subject();

        const expectedNewBalance = ether(3).mul(subjectQuantityToFill).div(ether(4));
        await assertTokenBalance(relayerToken, expectedNewBalance, order.relayerAddress);
      });

      it('mints the correct partial quantity of the set for the user', async () => {
        const existingBalance = await setToken.balanceOf.callAsync(issuanceOrderMaker);

        await subject();

        await assertTokenBalance(setToken, existingBalance.add(subjectQuantityToFill), issuanceOrderMaker);
      });

      it('marks the correct partial amount as filled in orderFills mapping', async () => {
        const preFilled = await core.orderFills.callAsync(orderHash);
        expect(preFilled).to.be.bignumber.equal(ZERO);

        await subject();

        const filled = await core.orderFills.callAsync(orderHash);
        expect(filled).to.be.bignumber.equal(subjectQuantityToFill);
      });

      it('emits correct LogFill event', async () => {
        const makerTokenAmountAvailableForThisOrder = order.makerTokenAmount.div(2);
        const netMakerToTaker = makerTokenAmountAvailableForThisOrder.mul(subjectQuantityToFill).div(ether(4));
        const fullFillRelayerFee = order.makerRelayerFee.add(order.takerRelayerFee);
        const partialFillRelayerFee = fullFillRelayerFee.mul(subjectQuantityToFill).div(ether(4));

        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const expectedLogs = getExpectedFillLog(
          setToken.address,        // setAddress
          issuanceOrderMaker,      // makerAddress
          subjectCaller,           // takerAddress
          makerToken.address,      // makerToken
          order.relayerAddress,    // relayerAddress
          relayerToken.address,    // relayerToken
          subjectQuantityToFill,   // quantityFilled
          netMakerToTaker,         // makerTokenToTaker
          partialFillRelayerFee,   // relayerTokenAmountPaid
          orderHash,               // orderHash
          core.address
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

        expect(transferAddresses).to.not.include(order.relayerAddress);
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
        await assertTokenBalance(relayerToken, ZERO, order.relayerAddress);

        await subject();

        const expectedNewBalance = order.makerRelayerFee.add(order.takerRelayerFee);
        await assertTokenBalance(relayerToken, expectedNewBalance, order.relayerAddress);
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
        await core.cancelOrder.sendTransactionAsync(
          subjectAddresses,
          subjectValues,
          subjectRequiredComponents,
          subjectRequiredComponentAmounts,
          quantityToCancel,
          { from: issuanceOrderMaker }
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the order has been partially taken', async () => {
      beforeEach(async () => {
        const quantityToCancel = subjectQuantityToFill.div(2);
        await core.cancelOrder.sendTransactionAsync(
          subjectAddresses,
          subjectValues,
          subjectRequiredComponents,
          subjectRequiredComponentAmounts,
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
        subjectQuantityToFill = order.quantity.add(1);
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

    describe('when the maker token required for the 0x order is more than the signed amount', async () => {
      before(async () => {
        // makerTokenAmountToUseOnZeroExOrderAsFillAmount = ether(10).div(4);
        makerTokenAmountToUseOnZeroExOrderOverride = ether(10).div(4).sub(1);
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
  });

  describe('#cancelOrder', async () => {
    let subjectCaller: Address;
    let subjectQuantityToCancel: BigNumber;
    let subjectAddresses: Address[];
    let subjectValues: BigNumber[];
    let subjectRequiredComponents: Address[];
    let subjectRequiredComponentAmounts: BigNumber[];

    let naturalUnit: BigNumber;
    let setToken: SetTokenContract;
    let makerToken: StandardTokenMockContract;

    let order: IssuanceOrder;
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
      order = {
        setAddress:               setToken.address,                                         // setAddress
        makerAddress:             issuanceOrderMaker,                                       // makerAddress
        makerToken:               makerToken.address,                                       // makerToken
        relayerAddress:           relayerAccount,                                           // relayerAddress
        relayerToken:             relayerToken.address,                                     // relayerToken
        quantity:                 quantity                      || ether(4),                // quantity
        makerTokenAmount:         issuanceOrderMakerTokenAmount || ether(10),               // makerTokenAmount
        expiration:               issuanceOrderExpiration       || SetUtils.generateTimestamp(10000), // expiration
        makerRelayerFee:          issuanceOrderMakerRelayerFee,                             // makerRelayerFee
        takerRelayerFee:          issuanceOrderTakerRelayerFee,                             // takerRelayerFee
        requiredComponents:       requiredComponents,                                       // requiredComponents
        requiredComponentAmounts: requiredComponentAmounts,                                 // requiredComponentAmounts
        salt:                     SetUtils.generateSalt(),                                  // salt
      };
      orderHash = SetUtils.hashOrderHex(order);

      subjectAddresses = [
        order.setAddress,
        order.makerAddress,
        order.makerToken,
        order.relayerAddress,
        order.relayerToken,
      ];
      subjectValues = [
        order.quantity,
        order.makerTokenAmount,
        order.expiration,
        order.makerRelayerFee,
        order.takerRelayerFee,
        order.salt,
      ];
      subjectRequiredComponents = order.requiredComponents;
      subjectRequiredComponentAmounts = order.requiredComponentAmounts;
      subjectQuantityToCancel = order.quantity.div(2);
      subjectCaller = issuanceOrderMaker;
    });

    async function subject(): Promise<string> {
      return core.cancelOrder.sendTransactionAsync(
        subjectAddresses,
        subjectValues,
        subjectRequiredComponents,
        subjectRequiredComponentAmounts,
        subjectQuantityToCancel,
        { from: subjectCaller },
      );
    }

    it('marks the correct amount as canceled in orderCancels mapping', async () => {
      const preCanceled = await core.orderCancels.callAsync(orderHash);
      expect(preCanceled).to.be.bignumber.equal(ZERO);

      await subject();

      const canceled = await core.orderCancels.callAsync(orderHash);
      expect(canceled).to.be.bignumber.equal(subjectQuantityToCancel);
    });

    it('emits correct LogCancel event', async () => {
      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = getExpectedCancelLog(
        setToken.address,
        issuanceOrderMaker,
        makerToken.address,
        order.relayerAddress,
        subjectQuantityToCancel,
        orderHash,
        core.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

   describe('when the quantity to cancel is greater than the open amount', async () => {
      beforeEach(async () => {
        subjectQuantityToCancel = ether(6);
      });

      it('should mark only the remaining open amount as canceled', async () => {
        const filled = await core.orderFills.callAsync(orderHash);
        const preCanceled = await core.orderCancels.callAsync(orderHash);
        const openAmount = order.quantity.minus(filled).minus(preCanceled);

        await subject();

        const canceled = await core.orderCancels.callAsync(orderHash);
        expect(canceled).to.be.bignumber.equal(preCanceled.add(openAmount));
        expect(canceled).to.be.bignumber.not.equal(preCanceled.plus(subjectQuantityToCancel));
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
});
