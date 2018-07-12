import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";
import { ether } from "../../../utils/units";

// Types
import { Address, Bytes32, IssuanceOrder } from "../../../../types/common.js";

// Contract types
import { CoreContract } from "../../../../types/generated/core";
import { SetTokenContract } from "../../../../types/generated/set_token";
import { SetTokenFactoryContract } from "../../../../types/generated/set_token_factory";
import { StandardTokenMockContract } from "../../../../types/generated/standard_token_mock";
import { TakerWalletWrapperContract } from "../../../../types/generated/taker_wallet_wrapper";
import { TransferProxyContract } from "../../../../types/generated/transfer_proxy";
import { VaultContract } from "../../../../types/generated/vault";

// Artifacts
const Core = artifacts.require("Core");

// Core wrapper
import { CoreWrapper } from "../../../utils/coreWrapper";
import { ERC20Wrapper } from "../../../utils/erc20Wrapper";
import { ExchangeWrapper } from "../../../utils/exchangeWrapper";
import {
  generateFillOrderParameters,
  generateOrdersDataForOrderCount,
  generateOrdersDataWithIncorrectExchange,
  generateOrdersDataWithTakerOrders,
} from "../../../utils/orderWrapper";

// Log Testing Tools
import {
  assertLogEquivalence,
  getFormattedLogsFromTxHash
} from "../../../utils/logs";

import {
  getExpectedFillLog,
  getExpectedCancelLog,
} from "../../../utils/contract_logs/coreIssuanceOrder";

// Testing Set up
import { BigNumberSetup } from "../../../utils/bigNumberSetup";
import ChaiSetup from "../../../utils/chaiSetup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;

import {
  IssuanceComponentDeposited,
} from "../../../utils/contract_logs/core";

import {
  assertTokenBalance,
  expectRevertError,
} from "../../../utils/tokenAssertions";

import {
  DEPLOYED_TOKEN_QUANTITY,
  ZERO,
  NULL_ADDRESS,
  DEFAULT_GAS,
} from "../../../utils/constants";


contract("CoreIssuanceOrder", (accounts) => {
  const [
    ownerAccount,
    takerAccount,
    makerAccount,
    signerAccount,
    relayerAccount,
    mockSetTokenAccount,
    mockTokenAccount
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
    takerWalletWrapper = await exchangeWrapper.deployTakerWalletExchangeWrapper(vault, transferProxy);

    // TODO: Move these authorizations into setDefaultStateAndAuthrorizations
    await coreWrapper.addAuthorizationAsync(takerWalletWrapper, core.address);
    await coreWrapper.addAuthorizationAsync(vault, takerWalletWrapper.address);
    await coreWrapper.addAuthorizationAsync(transferProxy, takerWalletWrapper.address);

    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);
  });

  describe("#fillOrder", async () => {
    let subjectCaller: Address;
    let subjectQuantityToIssue: BigNumber;
    let subjectExchangeOrdersData: Bytes32;

    const naturalUnit: BigNumber = ether(2);
    let deployedTokens: StandardTokenMockContract[] = [];
    let componentUnits: BigNumber[];
    let setToken: SetTokenContract;

    let setAddress: Address;
    let makerAddress: Address;
    let signerAddress: Address;
    let relayerAddress: Address;
    let componentAddresses: Address[];
    let defaultComponentAmounts: BigNumber[];
    let requiredComponents: Address[];
    let requiredComponentAmounts: BigNumber[];
    let orderQuantity: BigNumber;
    let makerToken: StandardTokenMockContract;
    let relayerToken: StandardTokenMockContract;
    let makerTokenAmount: BigNumber;
    let relayerTokenAmount: BigNumber = ether(1);
    let timeToExpiration: number;

    let orderCount: number;
    let orderMakerTokenAmounts: number[];

    let issuanceOrderParams: any;

    beforeEach(async () => {
      deployedTokens = await erc20Wrapper.deployTokensAsync(4, ownerAccount); // Taker Account
      await erc20Wrapper.approveTransfersAsync(deployedTokens, transferProxy.address, ownerAccount);
      await erc20Wrapper.approveTransfersAsync(deployedTokens, transferProxy.address, signerAccount);
      await erc20Wrapper.approveTransfersAsync(deployedTokens, transferProxy.address, takerAccount);

      // Give taker all tokens
      await erc20Wrapper.transferTokensAsync(deployedTokens, takerAccount, DEPLOYED_TOKEN_QUANTITY.div(2), ownerAccount);
      // Give maker their maker and relayer tokens
      await erc20Wrapper.transferTokensAsync(deployedTokens.slice(2,4), signerAccount, DEPLOYED_TOKEN_QUANTITY.div(2), ownerAccount);

      const componentTokens = deployedTokens.slice(0, 2);
      componentAddresses = _.map(componentTokens, (token) => token.address);
      componentUnits = _.map(componentTokens, () => ether(4)); // Multiple of naturalUnit
      setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      defaultComponentAmounts = _.map(componentUnits, (unit) => unit.mul(orderQuantity || ether(4)));

      await coreWrapper.registerDefaultExchanges(core);
      relayerAddress = relayerAccount;
      makerToken = deployedTokens[2];
      relayerToken = deployedTokens[3];

      issuanceOrderParams = await generateFillOrderParameters(
        setAddress || setToken.address,
        signerAddress || signerAccount,
        makerAddress || signerAccount,
        requiredComponents || componentAddresses,
        requiredComponentAmounts || defaultComponentAmounts,
        makerToken.address,
        relayerAddress,
        relayerToken.address,
        orderQuantity || ether(4),
        makerTokenAmount || ether(10),
        timeToExpiration || 10,
      );

      const takerAmountsToTransfer = _.map(componentTokens, (balance, idx) => {
        const units = componentUnits[idx];
        return ether(4).div(naturalUnit).mul(units);
      });

      subjectExchangeOrdersData = generateOrdersDataWithTakerOrders(
        makerToken.address,
        componentAddresses,
        takerAmountsToTransfer,
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
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it("transfers the full maker token amount from the maker", async () => {
      const existingBalance = await makerToken.balanceOf.callAsync(signerAccount);
      assertTokenBalance(makerToken, DEPLOYED_TOKEN_QUANTITY.div(2), signerAccount);

      await subject();

      const fullMakerTokenAmount = ether(10);
      const newBalance = await makerToken.balanceOf.callAsync(signerAccount);
      const expectedNewBalance = existingBalance.sub(fullMakerTokenAmount);
      assertTokenBalance(makerToken, expectedNewBalance, signerAccount);
    });

    it("transfers the remaining maker tokens to the taker", async () => {
      const existingBalance = await makerToken.balanceOf.callAsync(subjectCaller);
      assertTokenBalance(makerToken, DEPLOYED_TOKEN_QUANTITY.div(2), subjectCaller);

      await subject();

      const testMakerTokenAmount = ether(10); // makerTokenAmount
      const sumTestOrderMakerTokenAmounts = ether(9); // Sum orderMakerTokenAmounts

      const netMakerToTaker = testMakerTokenAmount.sub(sumTestOrderMakerTokenAmounts);
      const expectedNewBalance = existingBalance.plus(netMakerToTaker);
      assertTokenBalance(makerToken, expectedNewBalance, subjectCaller);
    });

    it("transfers the fees to the relayer", async () => {
      const existingBalance = await relayerToken.balanceOf.callAsync(relayerAddress);
      assertTokenBalance(relayerToken, ZERO, relayerAddress);

      await subject();

      const expectedNewBalance = relayerTokenAmount.mul(2);
      assertTokenBalance(relayerToken, expectedNewBalance, relayerAddress);
    });

    it.only("mints the correct quantity of the set for the maker", async () => {
      const existingBalance = await setToken.balanceOf.callAsync(signerAccount);

      await subject();

      assertTokenBalance(setToken, existingBalance.add(subjectQuantityToIssue), signerAccount);
    });

    it("marks the correct amount as filled in orderFills mapping", async () => {
      const preFilled = await core.orderFills.callAsync(issuanceOrderParams.orderHash);
      expect(preFilled).to.be.bignumber.equal(ZERO);

      await subject();

      const filled = await core.orderFills.callAsync(issuanceOrderParams.orderHash);
      expect(filled).to.be.bignumber.equal(subjectQuantityToIssue);
    });

    it("emits correct LogFill event", async () => {
      const txHash = await subject();

      const formattedLogs = await getFormattedLogsFromTxHash(txHash);
      const expectedLogs = getExpectedFillLog(
        setToken.address,
        signerAccount,
        subjectCaller,
        makerToken.address,
        relayerAddress,
        relayerToken.address,
        subjectQuantityToIssue,
        ether(1),
        ether(2),
        issuanceOrderParams.orderHash,
        core.address
      );

      await assertLogEquivalence(expectedLogs, formattedLogs);
    });

    describe("when the fill size is less than the order quantity", async () => {
      before(async () => {
        orderMakerTokenAmounts = [1, 1, 1];
      });

      beforeEach(async () => {
        subjectQuantityToIssue = ether(2);
      });

      after(async () => {
        orderMakerTokenAmounts = undefined;
      });

      it("transfers the partial maker token amount from the maker", async () => {
        const existingBalance = await makerToken.balanceOf.callAsync(signerAccount);
        assertTokenBalance(makerToken, DEPLOYED_TOKEN_QUANTITY.div(2), signerAccount);

        await subject();

        const partialMakerTokenAmount = ether(10).mul(subjectQuantityToIssue).div(ether(4));
        const newBalance = await makerToken.balanceOf.callAsync(signerAccount);
        const expectedNewBalance = existingBalance.sub(partialMakerTokenAmount);
        assertTokenBalance(makerToken, expectedNewBalance, signerAccount);
      });

      it("transfers the remaining maker tokens to the taker", async () => {
        const existingBalance = await makerToken.balanceOf.callAsync(subjectCaller);
        assertTokenBalance(makerToken, DEPLOYED_TOKEN_QUANTITY.div(2), subjectCaller);

        await subject();

        const testMakerTokenAmount = ether(10); // MakerTokenAmount
        const sumTestOrderMakerTokenAmounts = ether(3); // Sum orderMakerTokenAmounts

        const partialMakerTokenAmount = testMakerTokenAmount.mul(subjectQuantityToIssue).div(ether(4))
        const netMakerToTaker = partialMakerTokenAmount.sub(sumTestOrderMakerTokenAmounts);
        const expectedNewBalance = existingBalance.plus(netMakerToTaker);
        assertTokenBalance(makerToken, expectedNewBalance, subjectCaller);
      });

      it("transfers the partial fees to the relayer", async () => {
        const existingBalance = await relayerToken.balanceOf.callAsync(relayerAddress);
        assertTokenBalance(relayerToken, ZERO, relayerAddress);

        await subject();

        const expectedNewBalance = relayerTokenAmount.mul(2).mul(subjectQuantityToIssue).div(ether(4));
        assertTokenBalance(relayerToken, expectedNewBalance, relayerAddress);
      });

      // it("mints the correct quantity of the set for the user", async () => {
      //   const existingBalance = await setToken.balanceOf.callAsync(signerAccount);

      //   await subject();

      //   assertTokenBalance(setToken, existingBalance.add(subjectQuantityToIssue), signerAccount);
      // });

      it("marks the correct amount as filled in orderFills mapping", async () => {
        const preFilled = await core.orderFills.callAsync(issuanceOrderParams.orderHash);
        expect(preFilled).to.be.bignumber.equal(ZERO);

        await subject();

        const filled = await core.orderFills.callAsync(issuanceOrderParams.orderHash);
        expect(filled).to.be.bignumber.equal(subjectQuantityToIssue);
      });

      it("emits correct LogFill event", async () => {
        const txHash = await subject();

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedFillLog(
          setToken.address,
          signerAccount,
          subjectCaller,
          makerToken.address,
          relayerAddress,
          relayerToken.address,
          subjectQuantityToIssue,
          ether(2),
          ether(1),
          issuanceOrderParams.orderHash,
          core.address
        );

        await assertLogEquivalence(expectedLogs, formattedLogs);
      });
    });

    describe("when submitted exchange orders use more maker tokens than alloted for trades", async () => {
      beforeEach(async () => {
        subjectQuantityToIssue = ether(2);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the full fill size has been taken", async () => {
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

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the partial fill size has been taken", async () => {
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

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the fill size is greater than the order quantity", async () => {
      beforeEach(async () => {
        subjectQuantityToIssue = ether(6);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the quantity to issue is not positive", async () => {
      beforeEach(async () => {
        subjectQuantityToIssue = ZERO;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the set was not created through core", async () => {
      before(async () => {
        setAddress = NULL_ADDRESS;
      });

      after(async () => {
        setAddress = undefined;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the fill quantity is not a multiple of the natural unit of the set", async () => {
      beforeEach(async () => {
        subjectQuantityToIssue = ether(3);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the order quantity is not a multiple of the natural unit of the set", async () => {
      before(async () => {
        orderQuantity = ether(5);
      });

      after(async () => {
        orderQuantity = undefined;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the order has expired", async () => {
      before(async () => {
        timeToExpiration = -1;
      });

     after(async () => {
        timeToExpiration = undefined;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when Set Token quantity in Issuance Order equals 0", async () => {
      before(async () => {
        orderQuantity = ZERO;
      });

     after(async () => {
        orderQuantity = undefined;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when makerTokenAmount in Issuance Order equals 0", async () => {
      before(async () => {
        makerTokenAmount = ZERO;
      });

     after(async () => {
        makerTokenAmount = undefined;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the message is not signed by the maker", async () => {
      before(async () => {
        makerAddress = makerAccount;
      });

     after(async () => {
        makerAddress = undefined;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when an encoded exchangeId is invalid", async () => {
      beforeEach(async () => {
        subjectExchangeOrdersData = generateOrdersDataWithIncorrectExchange();
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe("#cancelOrder", async () => {
    let subjectCaller: Address;
    let subjectQuantityToCancel: BigNumber;
    let subjectExchangeOrdersData: Bytes32;

    let setToken: SetTokenContract;
    let setAddress: Address;
    let makerAddress: Address;
    let signerAddress: Address;
    let relayerAddress: Address;
    let componentAddresses: Address[];
    let defaultComponentAmounts: BigNumber[];
    let requiredComponents: Address[];
    let requiredComponentAmounts: BigNumber[];
    let orderQuantity: BigNumber;
    let makerTokenAmount: BigNumber;
    let makerToken: StandardTokenMockContract;
    let relayerToken: StandardTokenMockContract;
    let timeToExpiration: number;

    let issuanceOrderParams: any;

    beforeEach(async () => {
      const naturalUnit = ether(2);
      signerAddress = signerAccount;
      relayerAddress = relayerAccount;

      const components = await erc20Wrapper.deployTokensAsync(4, signerAddress); //For current purposes issue to maker/signer
      await erc20Wrapper.approveTransfersAsync(components, transferProxy.address, signerAddress);

      componentAddresses = _.map(components, (token) => token.address);
      const componentUnits = _.map(components, () => ether(4)); // Multiple of naturalUnit
      setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      defaultComponentAmounts = _.map(componentUnits, (unit) => unit.mul(ether(4))); //ether(4) for now but will be orderQuantity
      await coreWrapper.registerDefaultExchanges(core);

      makerToken = components[2];
      relayerToken = components[3];

      subjectCaller = signerAccount;
      subjectQuantityToCancel = ether(2);
      issuanceOrderParams = await generateFillOrderParameters(
        setAddress || setToken.address,
        signerAddress || signerAccount,
        makerAddress || signerAccount,
        requiredComponents || componentAddresses,
        requiredComponentAmounts || defaultComponentAmounts,
        makerToken.address,
        relayerAddress,
        relayerToken.address,
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

    it("marks the correct amount as canceled in orderCancels mapping", async () => {
      const preCanceled = await core.orderCancels.callAsync(issuanceOrderParams.orderHash);
      expect(preCanceled).to.be.bignumber.equal(ZERO);

      await subject();

      const canceled = await core.orderCancels.callAsync(issuanceOrderParams.orderHash);
      expect(canceled).to.be.bignumber.equal(subjectQuantityToCancel);
    });

    it("emits correct LogCancel event", async () => {
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

      await assertLogEquivalence(expectedLogs, formattedLogs);
    });

   describe("when the quantity to cancel is greater than the open amount", async () => {
      beforeEach(async () => {
        subjectQuantityToCancel = ether(6);
      });

      it("should mark only the remaining open amount as canceled", async () => {
        const filled = await core.orderFills.callAsync(issuanceOrderParams.orderHash);
        const preCanceled = await core.orderCancels.callAsync(issuanceOrderParams.orderHash);
        const openAmount = issuanceOrderParams.values[0].minus(filled).minus(preCanceled);

        await subject();

        const canceled = await core.orderCancels.callAsync(issuanceOrderParams.orderHash);
        expect(canceled).to.be.bignumber.equal(preCanceled + openAmount);
        expect(canceled).to.be.bignumber.not.equal(preCanceled.plus(subjectQuantityToCancel));
      });
    });

    describe("when the quantity to cancel is not positive", async () => {
      beforeEach(async () => {
        subjectQuantityToCancel = ZERO;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the transaction sender is not the maker", async () => {
      beforeEach(async () => {
        subjectCaller = takerAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the order has expired", async () => {
      before(async () => {
        timeToExpiration = -1;
      });

      after(async () => {
        timeToExpiration = undefined;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the cancel quantity is not a multiple of the natural unit of the set", async () => {
      beforeEach(async () => {
        subjectQuantityToCancel = ether(3);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the Set Token quantity in Issuance Order is not a multiple of the natural unit of the set", async () => {
      before(async () => {
        orderQuantity = ether(5);
      });

      after(async () => {
        orderQuantity = undefined;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when Set Token quantity in Issuance Order equals 0", async () => {
      before(async () => {
        orderQuantity = ZERO;
      });

      after(async () => {
        orderQuantity = undefined;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when makerTokenAmount in Issuance Order equals 0", async () => {
      before(async () => {
        makerTokenAmount = ZERO;
      });

      after(async () => {
        makerTokenAmount = undefined;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });
});
