import * as chai from "chai";
import { BigNumber } from "bignumber.js";

import ChaiSetup from "../config/chai_setup";
ChaiSetup.configure();
const { expect, assert } = chai;

import { INVALID_OPCODE, REVERT_ERROR } from "../constants/constants";
import { DetailedERC20Contract } from "../../types/generated/detailed_erc20";

export async function assertTokenBalance(token: DetailedERC20Contract, amount: BigNumber, testAccount: string) {
  const tokenBalance = await token.balanceOf.callAsync(testAccount);
  expect(tokenBalance).to.be.bignumber.equal(amount);
}

export function expectRevertError(asyncTxn: any) {
  expect(asyncTxn).to.eventually.be.rejectedWith(REVERT_ERROR);
}

export function expectInvalidOpcodeError(asyncTxn: any) {
  expect(asyncTxn).to.eventually.be.rejectedWith(INVALID_OPCODE);
}
