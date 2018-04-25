import { BigNumber } from "bignumber.js";
import * as _ from "lodash";
import * as LogUtils from "./log_utils";

import { Address, Bytes32, Log } from "../../types/common";

export function LogSetTokenCreated(
  sender: Address,
  setAddress: Address,
  name: string,
  symbol: string,
  registryAddress: Address,
): Log {
  return {
    event: "SetTokenCreated",
    address: registryAddress,
    args: {
      sender,
      setAddress,
      name,
      symbol,
    },
  };
}

export function getExpectedCreateLogs(
  sender: Address,
  setAddress: Address,
  name: string,
  symbol: string,
  registryAddress: Address,
): Log[] {
  const result: Log[] = [];
  result.push(LogSetTokenCreated(
    sender,
    setAddress,
    name,
    symbol,
    registryAddress,
  ));
  return result;
}
