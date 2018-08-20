import { Bytes } from 'set-protocol-utils';
import { BigNumberSetup } from './bigNumberSetup';
BigNumberSetup.configure();
import * as Web3 from 'web3';
const web3 = new Web3();

export function stringToBytes32(str: string): Bytes {
  // Padding 66 to include the '0x' prefix
  return web3.fromAscii(str).padEnd(66, '0');
}
