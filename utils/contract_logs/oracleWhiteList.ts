import { Address, Log } from 'set-protocol-utils';


export function TokenOraclePairAdded(
  _contractAddress: Address,
  _tokenAddress: Address,
  _oracleAddress: Address,
): Log[] {
  return [{
    event: 'TokenOraclePairAdded',
    address: _contractAddress,
    args: {
      _tokenAddress,
      _oracleAddress,
    },
  }];
}
export function TokenOraclePairRemoved(
  _contractAddress: Address,
  _tokenAddress: Address,
  _oracleAddress: Address,
): Log[] {
  return [{
    event: 'TokenOraclePairRemoved',
    address: _contractAddress,
    args: {
      _tokenAddress,
      _oracleAddress,
    },
  }];
}