/*
  Copyright 2018 Set Labs Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

'use strict';

import * as _ from 'lodash';
import * as ethUtil from 'ethereumjs-util';
import { BigNumber } from './bignumber';

import { constants } from './constants';
import { hashObject, paddedBufferForBigNumber, paddedBufferForPrimitive } from './encoding';
import { generateEIP712MessageHash } from './eip712';
import { generateKyberTradesBuffer, generateKyberRedemptionTradesBuffer } from './kyber';
import { generateTakerWalletOrdersBuffer, generateTakerWalletRedemptionOrdersBuffer } from './takerWallet';
import { generateZeroExOrdersBuffer, generateZeroExRedemptionOrdersBuffer } from './zeroEx';
import {
  Bytes,
  Exchanges,
  ExchangeOrder,
  IssuanceOrder,
  SolidityTypes,
  Address,
} from './types';
import { isTakerWalletOrder, isZeroExOrder, isKyberTrade } from './typeGuards';


export function generateTimestamp(minutes: number): BigNumber {
  const timeToExpiration = minutes * 60 * 1000;

  return new BigNumber(Math.floor((Date.now() + timeToExpiration) / 1000));
}

export function generateSalt(): BigNumber {
  const randomNumber = BigNumber.random(constants.MAX_DIGITS_IN_UNSIGNED_256_INT);
  const factor = new BigNumber(10).pow(constants.MAX_DIGITS_IN_UNSIGNED_256_INT - 1);

  return randomNumber.times(factor).round();
}

export function generateEIP712IssuanceOrderHash(): string {
  // Hash for the EIP712 Order Schema
  // bytes32 constant EIP712_ORDER_SCHEMA_HASH = keccak256(abi.encodePacked(
  //     "IssuanceOrder(",
  //     "address setAddress",
  //     "address makerAddress",
  //     "address makerToken",
  //     "address relayerAddress",
  //     "address relayerToken",
  //     "uint256 quantity",
  //     "uint256 makerTokenAmount",
  //     "uint256 expiration",
  //     "uint256 makerRelayerFee",
  //     "uint256 takerRelayerFee",
  //     "uint256 salt",
  //     "address[] requiredComponents",
  //     "uint256[] requiredComponentAmounts",
  //     ")"
  // ));
  const schemaBody = [
    { value: 'IssuanceOrder(', type: SolidityTypes.String },
    { value: 'address setAddress', type: SolidityTypes.String },
    { value: 'address makerAddress', type: SolidityTypes.String },
    { value: 'address makerToken', type: SolidityTypes.String },
    { value: 'address relayerAddress', type: SolidityTypes.String },
    { value: 'address relayerToken', type: SolidityTypes.String },
    { value: 'uint256 quantity', type: SolidityTypes.String },
    { value: 'uint256 makerTokenAmount', type: SolidityTypes.String },
    { value: 'uint256 expiration', type: SolidityTypes.String },
    { value: 'uint256 makerRelayerFee', type: SolidityTypes.String },
    { value: 'uint256 takerRelayerFee', type: SolidityTypes.String },
    { value: 'uint256 salt', type: SolidityTypes.String },
    { value: 'address[] requiredComponents', type: SolidityTypes.String },
    { value: 'uint256[] requiredComponentAmounts', type: SolidityTypes.String },
    { value: ')', type: SolidityTypes.String },
  ];

  const types = _.map(schemaBody, order => order.type);
  const values = _.map(schemaBody, order => order.value);
  const orderHash: Buffer = hashObject(types, values);

  return ethUtil.bufferToHex(orderHash);
}

export function hashOrderHex(order: IssuanceOrder): string {
  const orderBody = [
    { value: generateEIP712IssuanceOrderHash(), type: SolidityTypes.Bytes32 },
    { value: order.setAddress, type: SolidityTypes.Address },
    { value: order.makerAddress, type: SolidityTypes.Address },
    { value: order.makerToken, type: SolidityTypes.Address },
    { value: order.relayerAddress, type: SolidityTypes.Address },
    { value: order.relayerToken, type: SolidityTypes.Address },
    { value: order.quantity, type: SolidityTypes.Uint256 },
    { value: order.makerTokenAmount, type: SolidityTypes.Uint256 },
    { value: order.expiration, type: SolidityTypes.Uint256 },
    { value: order.makerRelayerFee, type: SolidityTypes.Uint256 },
    { value: order.takerRelayerFee, type: SolidityTypes.Uint256 },
    { value: order.salt, type: SolidityTypes.Uint256 },
    { value: order.requiredComponents, type: SolidityTypes.AddressArray },
    { value: order.requiredComponentAmounts, type: SolidityTypes.UintArray },
  ];

  const types = _.map(orderBody, order => order.type);
  const values = _.map(orderBody, order => order.value);
  const orderHash: Buffer = hashObject(types, values);

  const orderHashHex = ethUtil.bufferToHex(orderHash);

  return generateEIP712MessageHash(orderHashHex);
}

/* ============ Order Data Serialization ============ */

/**
 * Generates a byte string representing serialized exchange orders across different exchanges.
 *
 * @param  fillAmount          Amount of Set being filled
 * @param  orders              Array of order objects from various exchanges
 * @param  web3                web3 instance instantiated with `new Web3(provider);`
 * @return                     Buffer with all exchange orders formatted and concatenated
 */

export function generateSerializedOrders(orders: ExchangeOrder[]): Bytes {
  const orderBuffer: Buffer[] = [];
  const exchanges: Exchanges = {
    'ZERO_EX': [],
    'KYBER': [],
    'TAKER_WALLET': [],
  };

  // Sort exchange orders by exchange
  _.forEach(orders, (order: ExchangeOrder) => {
    let exchangeOrders: any;
    if (isZeroExOrder(order)) {
      exchangeOrders = exchanges.ZERO_EX;
    } else if (isTakerWalletOrder(order)) {
      exchangeOrders = exchanges.TAKER_WALLET;
     } else if (isKyberTrade(order)) {
       exchangeOrders = exchanges.KYBER;
     }

    if (exchangeOrders) exchangeOrders.push(order);
  });

  // Loop through all exchange orders and create buffers
  _.forEach(exchanges, (exchangeOrders: any[], key: string) => {
    if (exchangeOrders.length === 0) return;

    if (key === 'ZERO_EX') {
      orderBuffer.push(generateZeroExOrdersBuffer(exchangeOrders));
    } else if (key === 'KYBER') {
      orderBuffer.push(generateKyberTradesBuffer(exchangeOrders));
    } else if (key === 'TAKER_WALLET') {
      orderBuffer.push(generateTakerWalletOrdersBuffer(exchangeOrders));
    }
  });
  return ethUtil.bufferToHex(Buffer.concat(orderBuffer));
}

export function generateSerializedRedemptionOrders(orders: ExchangeOrder[]) {
  const orderBuffer: Buffer[] = [];
  const exchanges: Exchanges = {
    'ZERO_EX': [],
    'KYBER': [],
    'TAKER_WALLET': [],
  };

  // Sort exchange orders by exchange
  _.forEach(orders, (order: ExchangeOrder) => {
    let exchangeOrders: any;
    if (isZeroExOrder(order)) {
      exchangeOrders = exchanges.ZERO_EX;
    } else if (isTakerWalletOrder(order)) {
      exchangeOrders = exchanges.TAKER_WALLET;
     } else if (isKyberTrade(order)) {
       exchangeOrders = exchanges.KYBER;
     }

    if (exchangeOrders) exchangeOrders.push(order);
  });

  // Loop through all exchange orders and create buffers
  _.forEach(exchanges, (exchangeOrders: any[], key: string) => {
    if (exchangeOrders.length === 0) return;

    if (key === 'ZERO_EX') {
      orderBuffer.push(generateZeroExRedemptionOrdersBuffer(exchangeOrders));
    } else if (key === 'KYBER') {
      orderBuffer.push(generateKyberRedemptionTradesBuffer(exchangeOrders));
    } else if (key === 'TAKER_WALLET') {
      orderBuffer.push(generateTakerWalletRedemptionOrdersBuffer(exchangeOrders));
    }
  });
  return ethUtil.bufferToHex(Buffer.concat(orderBuffer)); 
}

/**
 * Generates an exchange order header represented as a buffer array.
 *
 * @param  exchangeId            Enum corresponding to exchange id, see constants.EXCHANGES
 * @param  orderCount            Number of exchange orders
 * @param  makerTokenAmount      Amount of tokens the maker is willing to pay
 * @param  totalOrderBodyLength  Length of order data buffer
 * @return                       Array containing all inputs as buffers
 */
export function generateExchangeOrderHeader(
  exchangeId: string,
  orderCount: number,
  makerTokenAmount: BigNumber,
  totalOrderBodyLength: number,
): Buffer[] {
  return [
    paddedBufferForPrimitive(exchangeId),
    paddedBufferForPrimitive(orderCount),
    paddedBufferForBigNumber(makerTokenAmount),
    paddedBufferForPrimitive(totalOrderBodyLength),
  ];
}

export function generateExchangeRedemptionOrderHeader(
  exchangeId: string,
  orderCount: number,
  makerTokenAmount: BigNumber,
  totalOrderBodyLength: number,
  takerComponentsCount: number,
  takerComponentsAddresses: Address[],
  takerComponentsAmounts: BigNumber[]
): Buffer[] {
  let base = [
    paddedBufferForPrimitive(exchangeId),
    paddedBufferForPrimitive(orderCount),
    paddedBufferForBigNumber(makerTokenAmount),
    paddedBufferForPrimitive(totalOrderBodyLength),
    paddedBufferForPrimitive(takerComponentsCount)
  ];

  takerComponentsAddresses.forEach((item) => {
    base.push(paddedBufferForPrimitive(item));
  });

  takerComponentsAmounts.forEach((item) => {
    base.push(paddedBufferForPrimitive(item));
  });

  return base;
}

