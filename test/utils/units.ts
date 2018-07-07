import { BigNumber } from "bignumber.js";
import { BigNumberSetup } from "../utils/bigNumberSetup";
BigNumberSetup.configure();
import * as Web3 from "web3";
const web3 = new Web3();

export function ether(amount: number): BigNumber {
  const weiString = web3.toWei(amount, "ether");
  return new BigNumber(weiString);
}

export function gWei(amount: number): BigNumber {
  const weiString = web3.toWei(amount, "gwei");
  return new BigNumber(weiString);
}
