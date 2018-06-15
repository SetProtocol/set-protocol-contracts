import * as _ from "lodash";
import * as LogUtils from "./log_utils";
import { BigNumber } from "bignumber.js";

import { Address, Log } from "../../types/common";

interface CreateLogArgs {
   _setTokenAddress: Address;
   _factoryAddress: Address;
   _components: Address[];
   _units: BigNumber[];
   _naturalUnit: BigNumber;
   _name: string;
   _symbol: string;
}

export function LogCreate(
   _coreAddress: Address,
   _setTokenAddress: Address,
   _factoryAddress: Address,
   _components: Address[],
   _units: BigNumber[],
   _naturalUnit: BigNumber,
   _name: string,
   _symbol: string,
): Log {
  return {
    event: "LogCreate",
    address: _coreAddress,
    args: {
      _setTokenAddress,
     _factoryAddress,
     _components,
     _units,
     _naturalUnit,
     _name,
     _symbol,
    },
  };
}

export function getExpectedCreateLogs(
  _coreAddress: Address,
  _setTokenAddress: Address,
  _factoryAddress: Address,
  _components: Address[],
  _units: BigNumber[],
  _naturalUnit: BigNumber,
  _name: string,
  _symbol: string,
): Log[] {
  const result: Log[] = [];

  result.push(LogCreate(
    _coreAddress,
    _setTokenAddress,
    _factoryAddress,
    _components,
    _units,
    _naturalUnit,
    _name,
    _symbol,
  ));

  return result;
}

export function extractNewSetTokenAddressFromLogs(
  logs: Log[],
): Address {
  const createLog = logs[logs.length - 1];
  const args: CreateLogArgs = createLog.args;
  return args._setTokenAddress;
};
