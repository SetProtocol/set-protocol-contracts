import { BigNumber } from 'bignumber.js';
import { BigNumberSetup } from './bigNumberSetup';
BigNumberSetup.configure();
import Web3 from 'web3';
const web3 = new Web3();

export function ether(amount: number): BigNumber {
  const weiString = web3.utils.toWei(amount.toString(), 'ether');
  return new BigNumber(weiString);
}

export function gWei(amount: number): BigNumber {
  const weiString = web3.utils.toWei(amount.toString(), 'gwei');
  return new BigNumber(weiString);
}
