import * as chai from "chai";
import * as _ from "lodash";
import * as ethUtil from "ethereumjs-util";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";

// Types
import { Address, Bytes32, Log } from "../../../types/common.js";

// Contract types
import { MockExchangeOrderHandlerLibraryContract } from "../../../types/generated/mock_exchange_order_handler_library";

// Artifacts
const MockExchangeOrderHandlerLibrary = artifacts.require("MockExchangeOrderHandlerLibrary");

import {
  generateExchangeOrdersHeader,
  generateExchangeOrdersBody
} from "../../utils/orderWrapper";

// Testing Set up
import { BigNumberSetup } from "../../config/bigNumberSetup";
import ChaiSetup from "../../config/chaiSetup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;

import {
  DEFAULT_GAS,
} from "../../utils/constants";

contract("orderHandler", (accounts) => {
  const [ownerAccount] = accounts;
  let orderHandlerLibrary: MockExchangeOrderHandlerLibraryContract;

  beforeEach(async () => {
    const orderHandlerInstance = await MockExchangeOrderHandlerLibrary.new(
      { from: ownerAccount, gas: DEFAULT_GAS },
    );

    orderHandlerLibrary = new MockExchangeOrderHandlerLibraryContract(
      web3.eth.contract(orderHandlerInstance.abi).at(orderHandlerInstance.address),
      { from: ownerAccount },
    );
  });

  describe("#testParseExchangeOrdersHeader", async () => {
    const subjectOrderData: Bytes32 = generateExchangeOrdersHeader(3);

    it("works", async () => {
      const result = await orderHandlerLibrary.testExchangeOrdersHeader.callAsync(subjectOrderData);
      expect(result).to.be.bignumber.equal(3);
    });
  });

  describe("#testParseExchangeOrdersBodyExchange", async () => {
    const subjectExchangeOrdersBody: Bytes32 = generateExchangeOrdersBody(0, 64);

    it("works", async () => {
      const result = await orderHandlerLibrary.testExchangeOrdersBodyExchange.callAsync(subjectExchangeOrdersBody);
      expect(result).to.be.bignumber.equal(0);
    });
  });

  describe("#testParseExchangeOrdersBodyOrderLength", async () => {
    const subjectExchangeOrdersBody: Bytes32 = generateExchangeOrdersBody(0, 64);

    it("works", async () => {
      const result = await orderHandlerLibrary.testExchangeOrdersBodyOrderLength.callAsync(subjectExchangeOrdersBody);
      expect(result).to.be.bignumber.equal(64);
    });
  });
});
