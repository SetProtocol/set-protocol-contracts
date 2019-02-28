import * as _ from 'lodash';
import * as ethUtil from 'ethereumjs-util';
import { BigNumber } from 'bignumber.js';
import {
  SetProtocolUtils,
  Address,
  Bytes,
}  from 'set-protocol-utils';

export interface ExchangeOrderCounts {
  zeroExOrderCount: number;
}

export interface ExchangeData {
  caller: Address;
  orderCount: BigNumber;
}

export function generateOrdersDataWithIncorrectExchange(): Bytes {
  const invalidExchangeId = 4;
  const orderLength = _.random(120, 160);

  const exchangeOrderDatum: Buffer[] = [
    SetProtocolUtils.paddedBufferForPrimitive(invalidExchangeId),
    SetProtocolUtils.paddedBufferForPrimitive(orderLength),
    randomBufferOfLength(orderLength),
  ];

  return ethUtil.bufferToHex(Buffer.concat(exchangeOrderDatum));
}

function randomBufferOfLength(
  length: number
): Buffer {
  return ethUtil.setLengthLeft(ethUtil.toBuffer(0), length);
}
