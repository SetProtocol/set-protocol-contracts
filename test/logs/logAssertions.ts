import * as chai from "chai";
import { getFormattedLogsFromTxHash } from "./log_utils";
import { 
  getExpectedRemoveAuthorizedLog,
  getExpectedAddAuthorizedLog,
} from "./Authorizable";

// Types
import { Address } from "../../types/common.js";

import ChaiSetup from "../config/chai_setup";
ChaiSetup.configure();
const { expect, assert } = chai;

export async function expectLogEquivalenceRemoveAuthorized(txHash: string, params: any[], contract: Address){
  const formattedLogs = await getFormattedLogsFromTxHash(txHash);
  const expectedLogs = getExpectedRemoveAuthorizedLog(
    params,
    contract,
  );

  expect(JSON.stringify(formattedLogs)).to.eql(JSON.stringify(expectedLogs));
};

export async function expectLogEquivalenceAddAuthorized(txHash: string, params: any[], contract: Address){
  const formattedLogs = await getFormattedLogsFromTxHash(txHash);
  const expectedLogs = getExpectedAddAuthorizedLog(
    params,
    contract,
  );

  expect(JSON.stringify(formattedLogs)).to.eql(JSON.stringify(expectedLogs));
};

