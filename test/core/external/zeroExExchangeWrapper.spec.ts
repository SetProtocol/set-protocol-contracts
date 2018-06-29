import * as chai from "chai";
import * as _ from "lodash";
import * as ethUtil from "ethereumjs-util";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";

// Types
import { Address, Bytes32, Log } from "../../../types/common.js";

// Contract types
import { ZeroExExchangeWrapperContract } from "../../../types/generated/zero_ex_exchange_wrapper";

// Artifacts
const ZeroExExchangeWrapper = artifacts.require("ZeroExExchangeWrapper");

import {
  generateZeroExExchangeOrdersHeader,
} from "../../utils/zeroExExchangeWrapper";

// Testing Set up
import { BigNumberSetup } from "../../config/bigNumberSetup";
import ChaiSetup from "../../config/chaiSetup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;

import {
  DEFAULT_GAS,
} from "../../utils/constants";

contract("ZeroExExchangeWrapper", (accounts) => {
  const [ownerAccount] = accounts;
  let zeroExExchangeWrapper: ZeroExExchangeWrapperContract;

  beforeEach(async () => {
    const zeroExExchangeWrapperInstance = await ZeroExExchangeWrapper.new(
      { from: ownerAccount, gas: DEFAULT_GAS },
    );

    zeroExExchangeWrapper = new ZeroExExchangeWrapperContract(
      web3.eth.contract(zeroExExchangeWrapperInstance.abi).at(zeroExExchangeWrapperInstance.address),
      { from: ownerAccount },
    );
  });

  describe("#getSumFromOrderDataHeader", async () => {
    const subjectOrderData: Bytes32 = generateZeroExExchangeOrdersHeader(1, 2, 3, 4);

    it("works", async () => {
      const result = await zeroExExchangeWrapper.getSumFromOrderDataHeader.callAsync(subjectOrderData);
      expect(result).to.be.bignumber.equal(10);
    });
  });

  describe.only("#getFillAmount", async () => {
    const fillAmount = 5;

    const subjectOrderData: Bytes32 = generateZeroExExchangeOrdersHeader(1, 2, 3, 4, fillAmount);

    it("works", async () => {
      const result = await zeroExExchangeWrapper.getFillAmount.callAsync(subjectOrderData);
      expect(result).to.be.bignumber.equal(fillAmount);
    });
  });
});
