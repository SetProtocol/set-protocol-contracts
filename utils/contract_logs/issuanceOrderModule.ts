import { Address, Bytes, Log } from 'set-protocol-utils';
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
