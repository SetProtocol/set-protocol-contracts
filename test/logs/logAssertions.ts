import * as chai from "chai";

// Types
import { Address, Log } from "../../types/common.js";

import ChaiSetup from "../config/chai_setup";
ChaiSetup.configure();
const { expect } = chai;

export async function assertLogEquivalence(expected: Log[], actual: Log[]) {
  expect(JSON.stringify(expected)).to.deep.equal(JSON.stringify(actual));
}
