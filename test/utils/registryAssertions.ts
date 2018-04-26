import * as chai from "chai";
import { BigNumber } from "bignumber.js";

import ChaiSetup from "../config/chai_setup";
ChaiSetup.configure();
const { expect, assert } = chai;

// Types
import { Address, UInt, Log } from "../../types/common.js";

import { INVALID_OPCODE, REVERT_ERROR } from "../constants/constants";
import { SetTokenRegistryContract } from "../../types/generated/set_token_registry";

export async function assertSetCountInRegistry(registry: SetTokenRegistryContract, expectedAmount: BigNumber) {
  expect(await registry.getSetCount.callAsync()).to.bignumber.equal(new BigNumber(expectedAmount));
  const setAddresses = await registry.getSetAddresses.callAsync();
  expect(new BigNumber(setAddresses.length)).to.bignumber.equal(expectedAmount);
}

export async function assertSetMetadataInRegistry(
  registry: SetTokenRegistryContract,
  setAddress: Address,
  expectedSetAddress: Address,
  expectedSetName: string,
  expectedSetSymbol: string,
) {
  const setMetaData = await registry.getSetMetadata.callAsync(setAddress);
  assert.strictEqual(setMetaData[0], expectedSetAddress);
  assert.strictEqual(setMetaData[1], expectedSetName);
  assert.strictEqual(setMetaData[2], expectedSetSymbol);
}
