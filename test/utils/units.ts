import { BigNumber } from "bignumber.js";
import { BigNumberSetup } from "../config/bignumber_setup";
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

// =10^($C$2-floor(log(min(L2:L4))))
export function calculateIssueUnit(proposedUnits: BigNumber[]): BigNumber {
  const minimum = BigNumber.min(proposedUnits);
  const log = Math.log10(Number(minimum.toString()));
  return new BigNumber(Math.pow(10, 18 - Math.floor(log)));
}
