import * as chai from "chai";
import * as _ from "lodash";

// Types
import { Address, Log } from "../../types/common.js";

import ChaiSetup from "../config/chai_setup";
ChaiSetup.configure();
const { expect, assert } = chai;

export async function assertLogEquivalence(expected: Log[], actual: Log[]) {
  console.log(JSON.stringify(expected));
  console.log(JSON.stringify(actual));
  expect(5).to.equal(6);
  expect(JSON.stringify(expected)).to.eql(JSON.stringify(actual));
}
