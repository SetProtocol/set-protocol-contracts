import * as chai from "chai";
import { getFormattedLogsFromTxHash } from "./log_utils";
import { 
  getExpectedRemoveAuthorizedLog,
  getExpectedAddAuthorizedLog,
} from "./Authorizable";

// Types
import { Address, Log } from "../../types/common.js";

import ChaiSetup from "../config/chai_setup";
ChaiSetup.configure();
const { expect, assert } = chai;

export async function assertLogEquivalence(expected: Log[], actual: Log[]) {
  expect(JSON.stringify(expected)).to.eql(JSON.stringify(actual));
}
