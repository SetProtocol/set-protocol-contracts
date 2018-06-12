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

export async function expectLogEquivalenceRemoveAuthorized(txHash: string, removedAccount: Address, caller: Address, contract: Address){
  const formattedLogs = await getFormattedLogsFromTxHash(txHash);
  const expectedLogs = getExpectedRemoveAuthorizedLog(
    removedAccount,
    caller,
    contract,
  );

  expect(JSON.stringify(formattedLogs)).to.eql(JSON.stringify(expectedLogs));
};

export async function expectLogEquivalenceAddAuthorized(txHash: string, authorizedAccount: Address, caller: Address, contract: Address){
  const formattedLogs = await getFormattedLogsFromTxHash(txHash);
  const expectedLogs = getExpectedAddAuthorizedLog(
    authorizedAccount,
    caller,
    contract,
  );

  expect(JSON.stringify(formattedLogs)).to.eql(JSON.stringify(expectedLogs));
};

