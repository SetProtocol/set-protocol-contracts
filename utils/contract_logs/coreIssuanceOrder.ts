import { Address, Log, Bytes } from 'set-protocol-utils';
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
  makerRelayerFeePaid: BigNumber,
  takerRelayerFeePaid: BigNumber,
  orderHash: Bytes,
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
      makerRelayerFeePaid,
      takerRelayerFeePaid,
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
  orderHash: Bytes,
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
