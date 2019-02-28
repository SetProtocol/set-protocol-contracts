import { Address, Log } from 'set-protocol-utils';


export function AddressAdded(
  _contractAddress: Address,
  _address: Address,
): Log[] {
  return [{
    event: 'AddressAdded',
    address: _contractAddress,
    args: {
      _address,
    },
  }];
}

export function AddressRemoved(
  _contractAddress: Address,
  _address: Address,
): Log[] {
  return [{
    event: 'AddressRemoved',
    address: _contractAddress,
    args: {
      _address,
    },
  }];
}