import { Address, Log } from 'set-protocol-utils';


export function AddressToAddressPairAdded(
  _contractAddress: Address,
  _keyTypeAddress: Address,
  _valueTypeAddress: Address,
): Log[] {
  return [{
    event: 'AddressToAddressPairAdded',
    address: _contractAddress,
    args: {
      _keyTypeAddress,
      _valueTypeAddress,
    },
  }];
}
export function AddressToAddressPairRemoved(
  _contractAddress: Address,
  _keyTypeAddress: Address,
  _valueTypeAddress: Address,
): Log[] {
  return [{
    event: 'AddressToAddressPairRemoved',
    address: _contractAddress,
    args: {
      _keyTypeAddress,
      _valueTypeAddress,
    },
  }];
}