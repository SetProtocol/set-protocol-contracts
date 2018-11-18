import { BigNumber } from 'bignumber.js';

import { Address, Log, Bytes } from 'set-protocol-utils';

interface CreateLogArgs {
   _setTokenAddress: Address;
   _factoryAddress: Address;
   _components: Address[];
   _units: BigNumber[];
   _naturalUnit: BigNumber;
   _name: string;
   _symbol: string;
}

export function SetTokenCreated(
   _coreAddress: Address,
   _setTokenAddress: Address,
   _factory: Address,
   _components: Address[],
   _units: BigNumber[],
   _naturalUnit: BigNumber,
   _name: string,
   _symbol: string,
): Log {
  return {
    event: 'SetTokenCreated',
    address: _coreAddress,
    args: {
      _setTokenAddress,
     _factory,
     _components,
     _units,
     _naturalUnit,
     _name,
     _symbol,
    },
  };
}

export function IssuanceComponentDeposited(
  _coreAddress: Address,
  _setToken: Address,
  _component: Address,
  _quantity: BigNumber,
): Log {
  return {
    event: 'IssuanceComponentDeposited',
    address: _coreAddress,
    args: {
      _setToken,
      _component,
      _quantity,
    },
  };
}

export function OperationStateChanged(
  _coreAddress: Address,
  _prevState: BigNumber,
  _newState: BigNumber,
): Log {
  return {
    event: 'OperationStateChanged',
    address: _coreAddress,
    args: {
      _prevState,
      _newState,
    },
  };
}

export function UpgradeRegistered(
  _coreAddress: Address,
  _upgradeHash: Bytes,
  _timestamp: string,
): Log {
  return {
    event: 'UpgradeRegistered',
    address: _coreAddress,
    args: {
      _upgradeHash,
      _timestamp,
    },
  };
}

/********** Other Log Utilities **********/

export function extractNewSetTokenAddressFromLogs(
  logs: Log[],
): Address {
  const createLog = logs[logs.length - 1];
  const args: CreateLogArgs = createLog.args;
  return args._setTokenAddress;
}

export function getExpectedTransferLogs(
  from: Address,
  to: Address,
  values: BigNumber[],
  contractAddresses: Address[],
): Log[] {
  const logs: Log[] = [];
  let i: number;

  for (i = 0; i < contractAddresses.length; i++) {
    if (values[i].greaterThan(new BigNumber(0))) {
      logs.push({
        event: 'Transfer',
        address: contractAddresses[i],
        args: {
          from,
          to,
          value: values[i],
        },
      });
    }
  }
  return logs;
}
