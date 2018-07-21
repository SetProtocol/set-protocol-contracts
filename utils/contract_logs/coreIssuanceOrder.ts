import { Address, Log, Bytes32 } from '../../types/common';
import { BigNumber } from 'bignumber.js';

export function getExpectedFillLog(
  setAddress: Address,
  makerAddress: Address,
  takerAddress: Address,
  makerToken: Address,
  relayerAddress: Address,
  relayerToken: Address,
  quantityFilled: BigNumber,
  makerTokenToTaker: BigNumber,
  relayerTokenAmountPaid: BigNumber,
  orderHash: Bytes32,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'LogFill',
    address: contractAddress,
    args: {
      setAddress,
      makerAddress,
      takerAddress,
      makerToken,
      relayerAddress,
      relayerToken,
      quantityFilled,
      makerTokenToTaker,
      relayerTokenAmountPaid,
      orderHash,
    },
  }];
}

export function getExpectedCancelLog(
  setAddress: Address,
  makerAddress: Address,
  makerToken: Address,
  relayerAddress: Address,
  quantityCanceled: BigNumber,
  orderHash: Bytes32,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'LogCancel',
    address: contractAddress,
    args: {
      setAddress,
      makerAddress,
      makerToken,
      relayerAddress,
      quantityCanceled,
      orderHash,
    },
  }];
}
