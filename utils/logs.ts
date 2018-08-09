import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as BigNumber from 'bignumber.js';

import { Log } from '../types/common';
import ChaiSetup from './chaiSetup';
ChaiSetup.configure();
const { expect } = chai;

export async function getFormattedLogsFromTxHash(
  txHash: string
): Promise<Log[]> {
  const receipt = await web3.eth.getTransactionReceipt(txHash);
  const logs: ABIDecoder.DecodedLog[] = _.compact(ABIDecoder.decodeLogs(receipt.logs));
  return _.map(logs, log => formatLogEntry(log));
}

export async function assertLogEquivalence(
  actual: Log[],
  expected: Log[]
) {
  const formattedExpectedLogs = _.map(expected, log => JSON.stringify(log));
  const formattedActualLogs = _.map(actual, log => JSON.stringify(log));
  expect(formattedActualLogs).to.include.members(formattedExpectedLogs);
}

function formatLogEntry(logs: ABIDecoder.DecodedLog): Log {
  const { name, events, address } = logs;
  const args: any = {};

  // Loop through each event and add to args
  _.each(events, event => {
    const { name, type, value } = event;

    let argValue: any = value;
    switch (true) {
      case (/^(uint)\d*\[\]/.test(type)): {
        break;
       }
      case (/^(uint)\d*/.test(type)): {
        argValue = new BigNumber(value.toString());
        break;
      }
    }

    args[name] = argValue;
  });

  return {
    event: name,
    address,
    args,
  };
}
