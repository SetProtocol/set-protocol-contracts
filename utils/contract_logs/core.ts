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
/**** Core Internal Logs ****/

export function FactoryAdded(
  _coreAddress: Address,
  _factory: Address,
): Log {
  return {
    event: 'FactoryAdded',
    address: _coreAddress,
    args: {
      _factory,
    },
  };
}

export function FactoryRemoved(
  _coreAddress: Address,
  _factory: Address,
): Log {
  return {
    event: 'FactoryRemoved',
    address: _coreAddress,
    args: {
      _factory,
    },
  };
}

export function ExchangeAdded(
  _coreAddress: Address,
  _exchangeId: BigNumber,
  _exchange: Address,
): Log {
  return {
    event: 'ExchangeAdded',
    address: _coreAddress,
    args: {
      _exchangeId,
      _exchange,
    },
  };
}

export function ExchangeRemoved(
  _coreAddress: Address,
  _exchangeId: BigNumber,
): Log {
  return {
    event: 'ExchangeRemoved',
    address: _coreAddress,
    args: {
      _exchangeId,
    },
  };
}

export function ModuleAdded(
  _coreAddress: Address,
  _module: Address,
): Log {
  return {
    event: 'ModuleAdded',
    address: _coreAddress,
    args: {
      _module,
    },
  };
}

export function ModuleRemoved(
  _coreAddress: Address,
  _module: Address,
): Log {
  return {
    event: 'ModuleRemoved',
    address: _coreAddress,
    args: {
      _module,
    },
  };
}

export function SetDisabled(
  _coreAddress: Address,
  _set: Address,
): Log {
  return {
    event: 'SetDisabled',
    address: _coreAddress,
    args: {
      _set,
    },
  };
}

export function SetReenabled(
  _coreAddress: Address,
  _set: Address,
): Log {
  return {
    event: 'SetReenabled',
    address: _coreAddress,
    args: {
      _set,
    },
  };
}

export function PriceLibraryAdded(
  _coreAddress: Address,
  _priceLibrary: Address,
): Log {
  return {
    event: 'PriceLibraryAdded',
    address: _coreAddress,
    args: {
      _priceLibrary,
    },
  };
}

export function PriceLibraryRemoved(
  _coreAddress: Address,
  _priceLibrary: Address,
): Log {
  return {
    event: 'PriceLibraryRemoved',
    address: _coreAddress,
    args: {
      _priceLibrary,
    },
  };
}

export function ProtocolFeeRecipientChanged(
  _coreAddress: Address,
  _feeRecipient: Address,
): Log {
  return {
    event: 'ProtocolFeeRecipientChanged',
    address: _coreAddress,
    args: {
      _feeRecipient,
    },
  };
}

export function ProtocolFeeChanged(
  _coreAddress: Address,
  _sender: Address,
  _fee: BigNumber,
): Log {
  return {
    event: 'ProtocolFeeChanged',
    address: _coreAddress,
    args: {
      _sender,
      _fee,
    },
  };
}

export function SignatureValidatorChanged(
  _coreAddress: Address,
  _signatureValidator: Address,
): Log {
  return {
    event: 'SignatureValidatorChanged',
    address: _coreAddress,
    args: {
      _signatureValidator,
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
