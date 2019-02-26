import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import Web3 from 'web3';
import promisify from 'tiny-promisify';

import { BigNumber } from './bignumber';
import { Log } from './types';

const expect = chai.expect;

export function assertLogEquivalence(actual: Log[], expected: Log[]) {
  const formattedExpectedLogs = _.map(expected, log => JSON.stringify(log));
  const formattedActualLogs = _.map(actual, log => JSON.stringify(log));
  expect(formattedActualLogs).to.include.members(formattedExpectedLogs);
}

export async function getLogsFromTxHash(web3: Web3, txHash: string): Promise<Log[]> {
  const receipt = await promisify(web3.eth.getTransactionReceipt)(txHash);
  const logs: ABIDecoder.DecodedLog[] = _.compact(ABIDecoder.decodeLogs(receipt.logs));

  return _.map(logs, log => formatLogEntry(web3, log));
}

function formatLogEntry(web3: Web3, logs: ABIDecoder.DecodedLog): Log {
  const { name, events, address } = logs;
  const args: any = {};

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
    if (type === 'address' && web3.utils.isAddress(argValue)) {
      argValue = web3.utils.toChecksumAddress(argValue);
    } else if (type === 'address[]') {
      argValue = argValue.map((address: string) => web3.utils.toChecksumAddress(address));
    }
    args[name] = argValue;
  });

  return {
    event: name,
    address,
    args,
  };
}
