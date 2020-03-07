import { Address, Log } from 'set-protocol-utils';


export function PairAdded(
  _contractAddress: Address,
  _key: Address,
  _value: Address,
): Log[] {
  return [{
    event: 'PairAdded',
    address: _contractAddress,
    args: {
      key: _key,
      value: _value,
    },
  }];
}
export function PairRemoved(
  _contractAddress: Address,
  _key: Address,
  _value: Address,
): Log[] {
  return [{
    event: 'PairRemoved',
    address: _contractAddress,
    args: {
      key: _key,
      value: _value,
    },
  }];
}