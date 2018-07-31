/* tslint:disable */
import * as _ from "lodash";
import * as ABIDecoder from "abi-decoder";
import * as chai from "chai";
import * as ethUtil from "ethereumjs-util";
import { BigNumber } from "bignumber.js";

import ChaiSetup from "../../../utils/chaiSetup";
import { BigNumberSetup } from "../../../utils/bigNumberSetup";
import { ZeroExExchangeWrapperContract } from "../../../utils/contracts";
import { Address, Bytes32, Log, UInt } from "../../../types/common.js";
import { DEFAULT_GAS } from "../../../utils/constants";

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;
const ZeroExExchangeWrapper = artifacts.require("ZeroExExchangeWrapper");


contract("ZeroExExchangeWrapper", (accounts) => {
  const [ownerAccount, takerAddress, feeRecipientAddress, senderAddress] = accounts;
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

  describe("#exchange", async () => {
    // Deploy a mock 0x exchange
    // Deploy a mock 0x proxy
  });
});
