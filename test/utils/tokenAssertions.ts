import * as chai from "chai";
import { BigNumber } from "bignumber.js";

import ChaiSetup from "../config/chai_setup";
ChaiSetup.configure();
const { expect, assert } = chai;

import { INVALID_OPCODE, REVERT_ERROR } from "../constants/txn_error";

export async function assertTokenBalance(token: any, amount: BigNumber, testAccount: string) {
  const tokenBalance = await token.balanceOf(testAccount);
  expect(tokenBalance).to.be.bignumber.equal(amount);
}

export async function expectRevertError(asyncTxn: any) {
  await expect(asyncTxn).to.eventually.be.rejectedWith(REVERT_ERROR);
}

export async function expectInvalidOpcodeError(asyncTxn: any) {
  await expect(asyncTxn).to.eventually.be.rejectedWith(INVALID_OPCODE);
}
