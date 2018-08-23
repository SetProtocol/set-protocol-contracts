import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from './chaiSetup';
ChaiSetup.configure();
const { expect } = chai;

import { DetailedERC20Contract } from '../types/generated/detailed_erc20';

export async function assertTokenBalance(token: DetailedERC20Contract, amount: BigNumber, testAccount: string) {
  const tokenBalance = await token.balanceOf.callAsync(testAccount);
  await expect(tokenBalance).to.be.bignumber.equal(amount);
}

// For solidity function calls that violate require()
export async function expectRevertError(asyncTxn: any) {
  try {
    await asyncTxn;
    throw new Error('Did not throw');
  } catch (e) {
    assertCertainError(e, 'revert');
  }
}

// For solidity function calls that violate assert()
export async function expectInvalidOpcodeError(asyncTxn: any) {
  try {
    await asyncTxn;
    throw new Error('Did not throw');
  } catch (e) {
    assertCertainError(e, 'invalid opcode');
  }
}

// Helper function
function assertCertainError(error: Error, expected_error_msg: string) {
  // This complication is so that the actual error will appear in truffle test output
  const message = error.message;
  const matchedIndex = message.search(expected_error_msg);
  let matchedString = message;
  if (matchedIndex >= 0) {
    matchedString = message.substring(matchedIndex, matchedIndex + expected_error_msg.length);
  }
  expect(matchedString).to.equal(expected_error_msg);
}
