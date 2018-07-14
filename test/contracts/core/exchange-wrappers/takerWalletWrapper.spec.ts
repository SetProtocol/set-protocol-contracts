import * as chai from "chai";
import * as _ from "lodash";
import * as ethUtil from "ethereumjs-util";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";

// Types
import { Address, Bytes, Log, UInt } from "../../../../types/common.js";

// Contract types
import { StandardTokenMockContract } from "../../../../types/generated/standard_token_mock";
import { TakerWalletWrapperContract } from "../../../../types/generated/taker_wallet_wrapper";
import { TransferProxyContract } from "../../../../types/generated/transfer_proxy";

// Wrappers
import { CoreWrapper } from "../../../utils/coreWrapper";
import { ERC20Wrapper } from "../../../utils/erc20Wrapper";
import { ExchangeWrapper } from "../../../utils/exchangeWrapper";
import { generateTakerWalletOrders } from "../../../utils/orderWrapper";

// Testing Set up
import { BigNumberSetup } from "../../../utils/bigNumberSetup";
import ChaiSetup from "../../../utils/chaiSetup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;

import {
  DEFAULT_GAS,
  DEPLOYED_TOKEN_QUANTITY,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
  ZERO,
} from "../../../utils/constants";

import {
  assertTokenBalance,
  expectRevertError,
} from "../../../utils/tokenAssertions";


contract("TakerWalletWrapper", (accounts) => {
  const [
    deployerAccount,
    issuerAccount,
    takerAccount,
    authorizedAddress,
    unauthorizedAddress,
  ] = accounts;

  const coreWrapper = new CoreWrapper(deployerAccount, deployerAccount);
  const erc20Wrapper = new ERC20Wrapper(deployerAccount);
  const exchangeWrapper = new ExchangeWrapper(deployerAccount);

  let transferProxy: TransferProxyContract;

  let takerWalletWrapper: TakerWalletWrapperContract;
  let components: StandardTokenMockContract[] = [];
  let componentCount: number = 1;


  beforeEach(async () => {
    transferProxy = await coreWrapper.deployTransferProxyAsync();

    takerWalletWrapper = await exchangeWrapper.deployTakerWalletExchangeWrapper(transferProxy);
    await coreWrapper.addAuthorizationAsync(takerWalletWrapper, authorizedAddress);
    await coreWrapper.addAuthorizationAsync(transferProxy, takerWalletWrapper.address);

    components = await erc20Wrapper.deployTokensAsync(componentCount, takerAccount);
    await erc20Wrapper.approveTransfersAsync(components, transferProxy.address, takerAccount);
  });

  describe("#exchange", async () => {
    let subjectCaller: Address;
    let subjectOrderCount: BigNumber;
    let subjectTakerOrdersData: Bytes;

    let componentToken: StandardTokenMockContract;
    let transferAmount: BigNumber = DEPLOYED_TOKEN_QUANTITY.div(2);

    beforeEach(async () => {
      componentToken = _.first(components);
      const componentAddresses = _.map(components, (token) => token.address);
      const transferAmounts = _.map(components, (token) => transferAmount);

      subjectCaller = authorizedAddress;
      subjectOrderCount = new BigNumber(componentAddresses.length);
      subjectTakerOrdersData = generateTakerWalletOrders(componentAddresses, transferAmounts);
    });

    async function subject(): Promise<string> {
      return takerWalletWrapper.exchange.sendTransactionAsync(
        takerAccount,
        subjectOrderCount,
        subjectTakerOrdersData,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it("transfers the token from the taker", async () => {
      const existingBalance = await componentToken.balanceOf.callAsync(takerAccount);

      await subject();

      const expectedNewBalance = existingBalance.sub(transferAmount);
      const newBalance = await componentToken.balanceOf.callAsync(takerAccount);
      expect(newBalance).to.be.bignumber.equal(expectedNewBalance);
    });

    it("transfers the token to the wrapper contract", async () => {
      const existingBalance = await componentToken.balanceOf.callAsync(takerWalletWrapper.address);

      await subject();

      const expectedNewBalance = existingBalance.add(transferAmount);
      const newBalance = await componentToken.balanceOf.callAsync(takerWalletWrapper.address);
      expect(newBalance).to.be.bignumber.equal(expectedNewBalance);
    });

    it("approves the tokens for transfer to the transferProxy with unlimited allowance", async () => {
      const existingAllowance = await componentToken.allowance.callAsync(takerWalletWrapper.address, transferProxy.address);

      await subject();

      const expectedNewAllowance = existingAllowance.add(UNLIMITED_ALLOWANCE_IN_BASE_UNITS);
      const newBalance = await componentToken.allowance.callAsync(takerWalletWrapper.address, transferProxy.address);
      expect(newBalance).to.be.bignumber.equal(expectedNewAllowance);
    });

    describe("when the caller is not authorized", async () => {
      beforeEach(async () => {
        subjectCaller = unauthorizedAddress;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the ordersData contains multiple tokens to transfer", async() => {
      before(async () => {
        componentCount = 3;
      });

      it("transfers the tokens from the taker", async () => {
        const existingTokenBalances = await erc20Wrapper.getTokenBalances(components, takerAccount);

        await subject();

        const expectedNewBalances = _.map(existingTokenBalances, (balance) => balance.sub(transferAmount));
        const newTokenBalances = await erc20Wrapper.getTokenBalances(components, takerAccount);
        expect(newTokenBalances).to.eql(expectedNewBalances);
      });

      it("transfers the token to the wrapper contract", async () => {
        const existingTokenBalances = await erc20Wrapper.getTokenBalances(components, takerWalletWrapper.address);

        await subject();

        const expectedNewBalances = _.map(existingTokenBalances, (balance) => balance.add(transferAmount));
        const newTokenBalances = await erc20Wrapper.getTokenBalances(components, takerWalletWrapper.address);
        expect(newTokenBalances).to.eql(expectedNewBalances);
      });

      it("approves the tokens for transfer to the transferProxy with unlimited allowance", async () => {
        const existingAllowances = await erc20Wrapper.getTokenAllowances(components, takerWalletWrapper.address, transferProxy.address);

        await subject();

        const expectedNewAllowances = _.map(existingAllowances, (allowance) => allowance.add(UNLIMITED_ALLOWANCE_IN_BASE_UNITS));
        const newAllowances = await erc20Wrapper.getTokenAllowances(components, takerWalletWrapper.address, transferProxy.address);
        expect(newAllowances).to.eql(expectedNewAllowances);
      });
    });
  });
});
