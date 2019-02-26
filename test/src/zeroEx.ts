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
import Web3 from 'web3';
import promisify from 'tiny-promisify';
import { assetDataUtils, orderHashUtils } from '@0xproject/order-utils';
import { SignatureType, Order } from '@0xproject/types';

import { BigNumber } from './bignumber';
import { constants } from './constants';
import { generateExchangeOrderHeader, generateExchangeRedemptionOrderHeader } from './orders';
import { Address, Bytes, ZeroExSignedFillOrder } from './types';
import {
  bufferArrayToHex,
  numBytesFromHex,
  paddedBufferForPrimitive,
  paddedBufferForBigNumber,
} from './encoding';


export function generateZeroExOrdersBuffer(
  orders: ZeroExSignedFillOrder[],
): Buffer {
  let totalMakerTokenAmount: BigNumber = constants.ZERO;
  const zeroExOrdersAsBuffers: Buffer[] = [];

  _.map(orders, order => {
    totalMakerTokenAmount = totalMakerTokenAmount.add(order.fillAmount);

    const zeroExOrderHex = generateZeroExExchangeWrapperOrder(order, order.signature, order.fillAmount);
    zeroExOrdersAsBuffers.push(ethUtil.toBuffer(zeroExOrderHex));
  });
  const zeroExOrderBodyBuffer: Buffer = Buffer.concat(zeroExOrdersAsBuffers);

  const zeroExOrderHeader: Buffer[] = generateExchangeOrderHeader(
    constants.EXCHANGES.ZERO_EX,
    orders.length,
    totalMakerTokenAmount,
    zeroExOrderBodyBuffer.length,
  );

  return Buffer.concat([
    Buffer.concat(zeroExOrderHeader),
    zeroExOrderBodyBuffer,
  ]);
}

export function generateZeroExRedemptionOrdersBuffer(
  orders: ZeroExSignedFillOrder[],
): Buffer {
  let totalMakerTokenAmount: BigNumber = constants.ZERO;
  const zeroExOrdersAsBuffers: Buffer[] = [];

  let takerComponentsAddresses: Address[] = [];
  let takerComponentsAmounts: BigNumber[] = [];

  _.map(orders, order => {
    totalMakerTokenAmount = totalMakerTokenAmount.add(order.fillAmount);

    let takerAssetIndex = _.findIndex(takerComponentsAddresses, order.takerAddress);
    if (takerAssetIndex >= 0) {
      // Increment the taker asset amount rather than pushing another element
      takerComponentsAmounts[takerAssetIndex] = takerComponentsAmounts[takerAssetIndex].add(order.takerAssetAmount);
    } else {
      // Wasn't found
      takerComponentsAddresses.push(order.takerAddress)
      takerComponentsAmounts.push(order.takerAssetAmount);
    }

    const zeroExOrderHex = generateZeroExExchangeWrapperOrder(order, order.signature, order.fillAmount);
    zeroExOrdersAsBuffers.push(ethUtil.toBuffer(zeroExOrderHex));
  });
  const zeroExOrderBodyBuffer: Buffer = Buffer.concat(zeroExOrdersAsBuffers);

  const zeroExOrderHeader: Buffer[] = generateExchangeRedemptionOrderHeader(
    constants.EXCHANGES.ZERO_EX,
    orders.length,
    totalMakerTokenAmount,
    zeroExOrderBodyBuffer.length,
    takerComponentsAddresses.length,
    takerComponentsAddresses,
    takerComponentsAmounts
  );

  return Buffer.concat([
    Buffer.concat(zeroExOrderHeader),
    zeroExOrderBodyBuffer,
  ]);
}

export function zeroExOrderToBuffer(order: Order): Buffer[] {
  return [
    paddedBufferForPrimitive(order.makerAddress),
    paddedBufferForPrimitive(order.takerAddress),
    paddedBufferForPrimitive(order.feeRecipientAddress),
    paddedBufferForPrimitive(order.senderAddress),
    paddedBufferForBigNumber(order.makerAssetAmount),
    paddedBufferForBigNumber(order.takerAssetAmount),
    paddedBufferForBigNumber(order.makerFee),
    paddedBufferForBigNumber(order.takerFee),
    paddedBufferForBigNumber(order.expirationTimeSeconds),
    paddedBufferForBigNumber(order.salt),
  ];
}

export function generateZeroExExchangeWrapperOrder(zeroExOrder: Order, signature: Bytes, fillAmount: BigNumber): Bytes {
  const zeroExOrderBuffer: Buffer[] = zeroExSignedFillOrderToBuffer(zeroExOrder, signature, fillAmount);

  return bufferArrayToHex(zeroExOrderBuffer);
}

export function zeroExSignedFillOrderToBuffer(zeroExOrder: Order, signature: Bytes, fillAmount: BigNumber): Buffer[] {
  const { makerAssetData } = zeroExOrder;

  const signatureLength: BigNumber = numBytesFromHex(signature);
  const makerTokenAddress: Address = extractAddressFromAssetData(makerAssetData);
  const orderHeader: Buffer[] = [
    paddedBufferForBigNumber(signatureLength),
    paddedBufferForBigNumber(fillAmount),
    paddedBufferForPrimitive(makerTokenAddress),
  ];

  const zeroExOrderBuffer = zeroExOrderToBuffer(zeroExOrder);

  return orderHeader.concat([ethUtil.toBuffer(signature)]).concat(zeroExOrderBuffer);
}

export function generateZeroExOrder(
  senderAddress: Address,
  makerAddress: Address,
  takerAddress: Address,
  makerFee: BigNumber,
  takerFee: BigNumber,
  makerAssetAmount: BigNumber,
  takerAssetAmount: BigNumber,
  makerTokenAddress: Address,
  takerTokenAddress: Address,
  salt: BigNumber,
  exchangeAddress: Address,
  feeRecipientAddress: Address,
  expirationTimeSeconds: BigNumber
): Order {
  return {
    senderAddress,
    makerAddress,
    takerAddress,
    makerFee,
    takerFee,
    makerAssetAmount,
    takerAssetAmount,
    makerAssetData: assetDataUtils.encodeERC20AssetData(makerTokenAddress),
    takerAssetData: assetDataUtils.encodeERC20AssetData(takerTokenAddress),
    salt,
    exchangeAddress,
    feeRecipientAddress,
    expirationTimeSeconds,
  } as Order;
}

export function extractAddressFromAssetData(assetData: string) {
  return assetDataUtils.decodeERC20AssetData(assetData).tokenAddress;
}

export function encodeAddressAsAssetData(tokenAddress: Address) {
  return assetDataUtils.encodeERC20AssetData(tokenAddress);
}

export async function generateZeroExSignedFillOrder(
  senderAddress: Address,
  makerAddress: Address,
  takerAddress: Address,
  makerFee: BigNumber,
  takerFee: BigNumber,
  makerAssetAmount: BigNumber,
  takerAssetAmount: BigNumber,
  makerTokenAddress: Address,
  takerTokenAddress: Address,
  salt: BigNumber,
  exchangeAddress: Address,
  feeRecipientAddress: Address,
  expirationTimeSeconds: BigNumber,
  fillAmount: BigNumber,
  web3: Web3,
): Promise<ZeroExSignedFillOrder> {
  const zeroExOrder = {
    senderAddress,
    makerAddress,
    takerAddress,
    makerFee,
    takerFee,
    makerAssetAmount,
    takerAssetAmount,
    makerAssetData: assetDataUtils.encodeERC20AssetData(makerTokenAddress),
    takerAssetData: assetDataUtils.encodeERC20AssetData(takerTokenAddress),
    salt,
    exchangeAddress,
    feeRecipientAddress,
    expirationTimeSeconds,
  } as Order;

  const signature = await signZeroExOrderAsync(zeroExOrder, web3);
  const fillOrder = zeroExOrder as ZeroExSignedFillOrder;
  fillOrder.signature = signature;
  fillOrder.fillAmount = fillAmount;

  return fillOrder;
}

export async function signZeroExOrderAsync(order: Order, web3: Web3): Promise<string> {
  const orderHashBuffer = orderHashUtils.getOrderHashBuffer(order);
  const orderHashHex = `0x${orderHashBuffer.toString('hex')}`;
  const maker = order.makerAddress;

  return await signMessageAsync(orderHashHex, maker, SignatureType.EthSign, web3);
}

async function signMessageAsync(hexMsg: Bytes, address: Address, sigType: SignatureType, web3: Web3): Promise<string> {
  const sig = await promisify(web3.eth.sign)(hexMsg, web3.utils.toChecksumAddress(address));
  const rpcSig = ethUtil.fromRpcSig(sig);
  const signature = Buffer.concat([
    ethUtil.toBuffer(rpcSig.v),
    rpcSig.r,
    rpcSig.s,
    ethUtil.toBuffer(sigType),
  ]);

  return `0x${signature.toString('hex')}`;
}
