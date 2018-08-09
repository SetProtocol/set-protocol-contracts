import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { SetProtocolUtils as Utils }  from 'set-protocol-utils';

import ChaiSetup from '../../../utils/chaiSetup';
import { BigNumberSetup } from '../../../utils/bigNumberSetup';
import {
  CoreContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TakerWalletWrapperContract,
  TransferProxyContract,
  VaultContract
} from '../../../utils/contracts';
import { Address, Bytes32 } from '../../../types/common.js';
import { ether } from '../../../utils/units';
import { assertTokenBalance, expectRevertError } from '../../../utils/tokenAssertions';
import { DEPLOYED_TOKEN_QUANTITY, ZERO, NULL_ADDRESS } from '../../../utils/constants';
import { assertLogEquivalence, getFormattedLogsFromTxHash } from '../../../utils/logs';
import { getExpectedFillLog, getExpectedCancelLog } from '../../../utils/contract_logs/coreIssuanceOrder';
import { ExchangeWrapper } from '../../../utils/exchangeWrapper';
import {
  generateFillOrderParameters,
  generateOrdersDataWithIncorrectExchange,
  generateOrdersDataWithTakerOrders
} from '../../../utils/orders';
import { CoreWrapper } from '../../../utils/coreWrapper';
import { ERC20Wrapper } from '../../../utils/erc20Wrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;
const Core = artifacts.require('Core');
const StandardTokenMock = artifacts.require('StandardTokenMock');


contract('CoreIssuanceOrder', accounts => {
  const [
    ownerAccount,
    takerAccount,
    makerAccount,
    signerAccount,
    relayerAccount,
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;
  let takerWalletWrapper: TakerWalletWrapperContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);
  const exchangeWrapper = new ExchangeWrapper(ownerAccount);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    core = await coreWrapper.deployCoreAsync();
    vault = await coreWrapper.deployVaultAsync();
    transferProxy = await coreWrapper.deployTransferProxyAsync();
    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync();
    takerWalletWrapper = await exchangeWrapper.deployTakerWalletExchangeWrapper(transferProxy);

    // TODO: Move these authorizations into setDefaultStateAndAuthrorizations
    await coreWrapper.addAuthorizationAsync(takerWalletWrapper, core.address);
    await coreWrapper.addAuthorizationAsync(transferProxy, takerWalletWrapper.address);

    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);
  });

  describe('#fillOrder', async () => {
    let subjectCaller: Address;
    let subjectQuantityToIssue: BigNumber;
    let subjectExchangeOrdersData: Bytes32;

    const naturalUnit: BigNumber = ether(2);
    let deployedTokens: StandardTokenMockContract[] = [];
    let componentUnits: BigNumber[];
    let setToken: SetTokenContract;

    let setAddress: Address;
    let makerAddress: Address;
    let relayerAddress: Address;
    let componentAddresses: Address[];
    let defaultComponentAmounts: BigNumber[];
    let orderQuantity: BigNumber;
    let makerToken: StandardTokenMockContract;
    let relayerToken: StandardTokenMockContract;
    let makerTokenAmount: BigNumber;
    let makerRelayerFee: BigNumber;
    let takerRelayerFee: BigNumber;
    let timeToExpiration: number;

    let takerAmountsToTransfer: BigNumber[];

    let issuanceOrderParams: any;

    beforeEach(async () => {
      deployedTokens = await erc20Wrapper.deployTokensAsync(4, ownerAccount); // Taker Account
      await erc20Wrapper.approveTransfersAsync(deployedTokens, transferProxy.address, ownerAccount);
      await erc20Wrapper.approveTransfersAsync(deployedTokens, transferProxy.address, signerAccount);
      await erc20Wrapper.approveTransfersAsync(deployedTokens, transferProxy.address, takerAccount);

      // Give taker all tokens
      await erc20Wrapper.transferTokensAsync(
        deployedTokens,
        takerAccount,
        DEPLOYED_TOKEN_QUANTITY.div(2),
        ownerAccount
      );
      // Give maker their maker and relayer tokens
      await erc20Wrapper.transferTokensAsync(
        deployedTokens.slice(2, 4),
        signerAccount,
        DEPLOYED_TOKEN_QUANTITY.div(2),
        ownerAccount
      );

      const componentTokens = deployedTokens.slice(0, 2);
      componentAddresses = _.map(componentTokens, token => token.address);
      componentUnits = _.map(componentTokens, () => ether(4)); // Multiple of naturalUnit
      setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      defaultComponentAmounts = _.map(componentUnits, unit => unit.mul(orderQuantity || ether(4)).div(naturalUnit));

      await coreWrapper.registerExchange(core, Utils.EXCHANGES.TAKER_WALLET, takerWalletWrapper.address);
      makerToken = deployedTokens[2];
      relayerToken = deployedTokens[3];

      issuanceOrderParams = await generateFillOrderParameters(
        setAddress || setToken.address,
        signerAccount,
        makerAddress || signerAccount,
        componentAddresses,
        defaultComponentAmounts,
        makerToken.address,
        relayerAddress || relayerAccount,
        relayerToken.address,
        makerRelayerFee || ether(1),
        takerRelayerFee || ether(2),
        orderQuantity || ether(4),
        makerTokenAmount || ether(10),
        timeToExpiration || 10,
      );

      const defaultTakerAmountsToTransfer = _.map(componentTokens, (balance, idx) => {
        const units = componentUnits[idx];
        return ether(4).div(naturalUnit).mul(units);
      });

      subjectExchangeOrdersData = generateOrdersDataWithTakerOrders(
        makerToken.address,
        componentAddresses,
        takerAmountsToTransfer || defaultTakerAmountsToTransfer,
      );

      subjectCaller = takerAccount;
      subjectQuantityToIssue = ether(4);
    });

    async function subject(): Promise<string> {
      return core.fillOrder.sendTransactionAsync(
        issuanceOrderParams.addresses,
        issuanceOrderParams.values,
        issuanceOrderParams.requiredComponents,
        issuanceOrderParams.requiredComponentAmounts,
        subjectQuantityToIssue,
        issuanceOrderParams.signature.v,
        [issuanceOrderParams.signature.r, issuanceOrderParams.signature.s],
        subjectExchangeOrdersData,
        { from: subjectCaller },
      );
    }

    it('transfers the full maker token amount from the maker', async () => {
      const existingBalance = await makerToken.balanceOf.callAsync(signerAccount);
      await assertTokenBalance(makerToken, DEPLOYED_TOKEN_QUANTITY.div(2), signerAccount);

      await subject();

      const fullMakerTokenAmount = ether(10);
      const expectedNewBalance = existingBalance.sub(fullMakerTokenAmount);
      await assertTokenBalance(makerToken, expectedNewBalance, signerAccount);
    });

    it('transfers the remaining maker tokens to the taker', async () => {
      const existingBalance = await makerToken.balanceOf.callAsync(subjectCaller);
      await assertTokenBalance(makerToken, DEPLOYED_TOKEN_QUANTITY.div(2), subjectCaller);

      await subject();

      const netMakerToTaker = ether(10);
      const expectedNewBalance = existingBalance.plus(netMakerToTaker);
      await assertTokenBalance(makerToken, expectedNewBalance, subjectCaller);
    });

    it('transfers the fees to the relayer', async () => {
      await assertTokenBalance(relayerToken, ZERO, relayerAccount);

      await subject();

      const expectedNewBalance = ether(3);
      await assertTokenBalance(relayerToken, expectedNewBalance, relayerAccount);
    });

    it('mints the correct quantity of the set for the maker', async () => {
      const existingBalance = await setToken.balanceOf.callAsync(signerAccount);

      await subject();

      await assertTokenBalance(setToken, existingBalance.add(subjectQuantityToIssue), signerAccount);
    });

    it('marks the correct amount as filled in orderFills mapping', async () => {
      const preFilled = await core.orderFills.callAsync(issuanceOrderParams.orderHash);
      expect(preFilled).to.be.bignumber.equal(ZERO);

      await subject();

      const filled = await core.orderFills.callAsync(issuanceOrderParams.orderHash);
      expect(filled).to.be.bignumber.equal(subjectQuantityToIssue);
    });

    it('emits correct LogFill event', async () => {
      const txHash = await subject();

      const formattedLogs = await getFormattedLogsFromTxHash(txHash);
      const expectedLogs = getExpectedFillLog(
        setToken.address,
        signerAccount,
        subjectCaller,
        makerToken.address,
        relayerAccount,
        relayerToken.address,
        subjectQuantityToIssue,
        ether(10),
        ether(3),
        issuanceOrderParams.orderHash,
        core.address
      );

      await assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the fill size is less than the order quantity', async () => {
      beforeEach(async () => {
        subjectQuantityToIssue = ether(2);
      });

      it('transfers the partial maker token amount from the maker', async () => {
        const existingBalance = await makerToken.balanceOf.callAsync(signerAccount);
        await assertTokenBalance(makerToken, DEPLOYED_TOKEN_QUANTITY.div(2), signerAccount);

        await subject();

        const partialMakerTokenAmount = ether(10).mul(subjectQuantityToIssue).div(ether(4));
        const expectedNewBalance = existingBalance.sub(partialMakerTokenAmount);
        await assertTokenBalance(makerToken, expectedNewBalance, signerAccount);
      });

      it('transfers the remaining maker tokens to the taker', async () => {
        const existingBalance = await makerToken.balanceOf.callAsync(subjectCaller);
        await assertTokenBalance(makerToken, DEPLOYED_TOKEN_QUANTITY.div(2), subjectCaller);

        await subject();

        const netMakerToTaker = ether(10).mul(subjectQuantityToIssue).div(ether(4));
        const expectedNewBalance = existingBalance.plus(netMakerToTaker);
        await assertTokenBalance(makerToken, expectedNewBalance, subjectCaller);
      });

      it('transfers the partial fees to the relayer', async () => {
        await assertTokenBalance(relayerToken, ZERO, relayerAccount);

        await subject();

        const expectedNewBalance = ether(3).mul(subjectQuantityToIssue).div(ether(4));
        await assertTokenBalance(relayerToken, expectedNewBalance, relayerAccount);
      });

      it('mints the correct quantity of the set for the user', async () => {
        const existingBalance = await setToken.balanceOf.callAsync(signerAccount);

        await subject();

        await assertTokenBalance(setToken, existingBalance.add(subjectQuantityToIssue), signerAccount);
      });

      it('marks the correct amount as filled in orderFills mapping', async () => {
        const preFilled = await core.orderFills.callAsync(issuanceOrderParams.orderHash);
        expect(preFilled).to.be.bignumber.equal(ZERO);

        await subject();

        const filled = await core.orderFills.callAsync(issuanceOrderParams.orderHash);
        expect(filled).to.be.bignumber.equal(subjectQuantityToIssue);
      });

      it('emits correct LogFill event', async () => {
        const txHash = await subject();

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedFillLog(
          setToken.address,
          signerAccount,
          subjectCaller,
          makerToken.address,
          relayerAccount,
          relayerToken.address,
          subjectQuantityToIssue,
          ether(5),
          ether(3).mul(subjectQuantityToIssue).div(ether(4)),
          issuanceOrderParams.orderHash,
          core.address
        );

        await assertLogEquivalence(formattedLogs, expectedLogs);
      });
    });

    describe('when the relayer fees are zero', async () => {
      before(async () => {
        ABIDecoder.addABI(StandardTokenMock.abi);
        makerRelayerFee = ether(0);
        takerRelayerFee = ether(0);
      });

      after(async () => {
        ABIDecoder.removeABI(StandardTokenMock.abi);
        makerRelayerFee = undefined;
        takerRelayerFee = undefined;
      });

      it('does not execute a transfer of the relayer fees for 0 amount', async () => {
        const txHash = await subject();

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const transferAddresses: Address[] = [];
        formattedLogs.forEach( event => {
          if (event.event == 'Transfer') {
            transferAddresses.push(event.args.to);
          }
        });

        expect(transferAddresses).to.not.include(relayerAddress);
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

      it('does not execute a transfer of the relayer fees for 0 amount', async () => {
        const txHash = await subject();

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const transferAddresses: Address[] = [];
        formattedLogs.forEach( event => {
          if (event.event == 'Transfer') {
            transferAddresses.push(event.args.to);
          }
        });

        expect(transferAddresses).to.not.include(relayerAddress);
      });
    });

    describe('when the full fill size has been taken', async () => {
      beforeEach(async () => {
        const quantityToCancel = ether(4);
        await core.cancelOrder.sendTransactionAsync(
          issuanceOrderParams.addresses,
          issuanceOrderParams.values,
          issuanceOrderParams.requiredComponents,
          issuanceOrderParams.requiredComponentAmounts,
          quantityToCancel,
          { from: signerAccount }
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the partial fill size has been taken', async () => {
      beforeEach(async () => {
        const quantityToCancel = ether(2);
        await core.cancelOrder.sendTransactionAsync(
          issuanceOrderParams.addresses,
          issuanceOrderParams.values,
          issuanceOrderParams.requiredComponents,
          issuanceOrderParams.requiredComponentAmounts,
          quantityToCancel,
          { from: signerAccount }
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the fill size is greater than the order quantity', async () => {
      beforeEach(async () => {
        subjectQuantityToIssue = ether(6);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the set was not created through core', async () => {
      before(async () => {
        setAddress = NULL_ADDRESS;
      });

      after(async () => {
        setAddress = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the fill quantity is not a multiple of the natural unit of the set', async () => {
      beforeEach(async () => {
        subjectQuantityToIssue = ether(3);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the order quantity is not a multiple of the natural unit of the set', async () => {
      before(async () => {
        orderQuantity = ether(5);
      });

      after(async () => {
        orderQuantity = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the order has expired', async () => {
      before(async () => {
        timeToExpiration = -1;
      });

     after(async () => {
        timeToExpiration = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when Set Token quantity in Issuance Order equals 0', async () => {
      before(async () => {
        orderQuantity = ZERO;
      });

     after(async () => {
        orderQuantity = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when makerTokenAmount in Issuance Order equals 0', async () => {
      before(async () => {
        makerTokenAmount = ZERO;
      });

     after(async () => {
        makerTokenAmount = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the message is not signed by the maker', async () => {
      before(async () => {
        makerAddress = makerAccount;
      });

     after(async () => {
        makerAddress = undefined;
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

    describe('when takerAmountsToTransfer is less than requiredTokenAmounts', async () => {
      before(async () => {
        takerAmountsToTransfer = [ether(1), ether(1)];
      });

      after(async () => {
        takerAmountsToTransfer = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when rounding error is too large', async () => {
      before(async () => {
        orderQuantity = ether(6);
        makerTokenAmount = new BigNumber(10);
      });

      beforeEach(async () => {
        subjectQuantityToIssue = ether(4);
      });

      after(async () => {
        orderQuantity = undefined;
        makerTokenAmount = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#cancelOrder', async () => {
    let subjectCaller: Address;
    let subjectQuantityToCancel: BigNumber;

    let setToken: SetTokenContract;
    let relayerAddress: Address;
    let componentAddresses: Address[];
    let defaultComponentAmounts: BigNumber[];
    let orderQuantity: BigNumber;
    let makerTokenAmount: BigNumber;
    let makerToken: StandardTokenMockContract;
    let relayerToken: StandardTokenMockContract;
    const makerRelayerFee: BigNumber = ether(1);
    const takerRelayerFee: BigNumber = ether(2);
    let timeToExpiration: number;

    let issuanceOrderParams: any;

    beforeEach(async () => {
      const naturalUnit = ether(2);
      relayerAddress = relayerAccount;

      // For current purposes issue to maker/signer
      const components = await erc20Wrapper.deployTokensAsync(4, signerAccount);
      await erc20Wrapper.approveTransfersAsync(components, transferProxy.address, signerAccount);

      componentAddresses = _.map(components, token => token.address);
      const componentUnits = _.map(components, () => ether(4)); // Multiple of naturalUnit
      setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      // ether(4) for now but will be orderQuantity
      defaultComponentAmounts = _.map(componentUnits, unit => unit.mul(ether(4)));
      await coreWrapper.registerDefaultExchanges(core);

      makerToken = components[2];
      relayerToken = components[3];

      subjectCaller = signerAccount;
      subjectQuantityToCancel = ether(2);
      issuanceOrderParams = await generateFillOrderParameters(
        setToken.address,
        signerAccount,
        signerAccount,
        componentAddresses,
        defaultComponentAmounts,
        makerToken.address,
        relayerAddress,
        relayerToken.address,
        makerRelayerFee,
        takerRelayerFee,
        orderQuantity || ether(4),
        makerTokenAmount || ether(10),
        timeToExpiration || 10,
      );
    });

    async function subject(): Promise<string> {
      return core.cancelOrder.sendTransactionAsync(
        issuanceOrderParams.addresses,
        issuanceOrderParams.values,
        issuanceOrderParams.requiredComponents,
        issuanceOrderParams.requiredComponentAmounts,
        subjectQuantityToCancel,
        { from: subjectCaller },
      );
    }

    it('marks the correct amount as canceled in orderCancels mapping', async () => {
      const preCanceled = await core.orderCancels.callAsync(issuanceOrderParams.orderHash);
      expect(preCanceled).to.be.bignumber.equal(ZERO);

      await subject();

      const canceled = await core.orderCancels.callAsync(issuanceOrderParams.orderHash);
      expect(canceled).to.be.bignumber.equal(subjectQuantityToCancel);
    });

    it('emits correct LogCancel event', async () => {
      const txHash = await subject();

      const formattedLogs = await getFormattedLogsFromTxHash(txHash);
      const expectedLogs = getExpectedCancelLog(
        setToken.address,
        signerAccount,
        makerToken.address,
        relayerAddress,
        subjectQuantityToCancel,
        issuanceOrderParams.orderHash,
        core.address
      );

      await assertLogEquivalence(formattedLogs, expectedLogs);
    });

   describe('when the quantity to cancel is greater than the open amount', async () => {
      beforeEach(async () => {
        subjectQuantityToCancel = ether(6);
      });

      it('should mark only the remaining open amount as canceled', async () => {
        const filled = await core.orderFills.callAsync(issuanceOrderParams.orderHash);
        const preCanceled = await core.orderCancels.callAsync(issuanceOrderParams.orderHash);
        const openAmount = issuanceOrderParams.values[0].minus(filled).minus(preCanceled);

        await subject();

        const canceled = await core.orderCancels.callAsync(issuanceOrderParams.orderHash);
        expect(canceled).to.be.bignumber.equal(preCanceled + openAmount);
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
        subjectCaller = takerAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the order has expired', async () => {
      before(async () => {
        timeToExpiration = -1;
      });

      after(async () => {
        timeToExpiration = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the cancel quantity is not a multiple of the natural unit of the set', async () => {
      beforeEach(async () => {
        subjectQuantityToCancel = ether(3);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when Set Token quantity in IssuanceOrder not a multiple of natural unit of set', async () => {
      before(async () => {
        orderQuantity = ether(5);
      });

      after(async () => {
        orderQuantity = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when Set Token quantity in Issuance Order equals 0', async () => {
      before(async () => {
        orderQuantity = ZERO;
      });

      after(async () => {
        orderQuantity = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when makerTokenAmount in Issuance Order equals 0', async () => {
      before(async () => {
        makerTokenAmount = ZERO;
      });

      after(async () => {
        makerTokenAmount = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
