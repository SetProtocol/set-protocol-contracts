import * as _ from 'lodash';
import * as ethUtil from 'ethereumjs-util';
import { BigNumber } from 'bignumber.js';
import {
  SetProtocolUtils,
  SetProtocolTestUtils,
  Address,
  Bytes,
  IssuanceOrder,
}  from 'set-protocol-utils';

const setUtils = new SetProtocolUtils(web3);

export interface ExchangeOrderCounts {
  takerWalletOrderCount: number;
  zeroExOrderCount: number;
}

export interface ExchangeData {
  maker: Address;
  taker: Address;
  makerToken: Address;
  makerAssetAmount: BigNumber;
  orderCount: BigNumber;
  fillQuantity: BigNumber;
  attemptedFillQuantity: BigNumber;
}

export async function generateFillOrderParameters(
  setAddress: Address,
  signerAddress: Address,
  makerAddress: Address,
  requiredComponents: Address[],
  requiredComponentAmounts: BigNumber[],
  makerToken: Address,
  relayerAddress: Address,
  relayerToken: Address,
  makerRelayerFee: BigNumber,
  takerRelayerFee: BigNumber,
  quantity: BigNumber,
  makerTokenAmount: BigNumber,
  timeToExpiration: number,
): Promise<any> {
  const order = {
    setAddress,
    makerAddress,
    makerToken,
    relayerAddress,
    relayerToken,
    quantity,
    makerTokenAmount,
    expiration: SetProtocolTestUtils.generateTimestamp(timeToExpiration),
    makerRelayerFee,
    takerRelayerFee,
    salt: SetProtocolUtils.generateSalt(),
    requiredComponents,
    requiredComponentAmounts,
  } as IssuanceOrder;

  const addresses = [
    order.setAddress,
    order.makerAddress,
    order.makerToken,
    order.relayerAddress,
    order.relayerToken,
  ];

  const values = [
    order.quantity,
    order.makerTokenAmount,
    order.expiration,
    order.makerRelayerFee,
    order.takerRelayerFee,
    order.salt,
  ];

  const orderHash = SetProtocolUtils.hashOrderHex(order);
  const ecSignature = await setUtils.signMessage(orderHash, signerAddress);
  const signature = setUtils.convertSigToHex(ecSignature);

  return {
    addresses,
    values,
    orderHash,
    signature,
    requiredComponents,
    requiredComponentAmounts,
  };
}

export function generateOrdersDataWithTakerOrders(
  takerTokenAddresses: Address[],
  takerTokenAmounts: BigNumber[],
): Bytes {
  // Header for entire ordersData
  const exchangeOrderDatum: Buffer[] = [
    SetProtocolUtils.paddedBufferForPrimitive(SetProtocolUtils.EXCHANGES.TAKER_WALLET),
    SetProtocolUtils.paddedBufferForPrimitive(takerTokenAddresses.length), // Include the number of orders
    SetProtocolUtils.paddedBufferForPrimitive(0), // Taker wallet orders do not take any maker token to execute
  ];

  // Body for takers orders
  const takerOrdersData: Buffer[] = [];
  _.each(takerTokenAmounts, (amount, idx) => {
    takerOrdersData.push(SetProtocolUtils.paddedBufferForPrimitive(takerTokenAddresses[idx]));
    takerOrdersData.push(SetProtocolUtils.paddedBufferForPrimitive(web3.utils.toHex(amount)));
  });
  const ordersBuffer = Buffer.concat(takerOrdersData);

  exchangeOrderDatum.push(SetProtocolUtils.paddedBufferForPrimitive(ordersBuffer.length));
  exchangeOrderDatum.push(ordersBuffer);

  return ethUtil.bufferToHex(Buffer.concat(exchangeOrderDatum));
}

export function generateTakerWalletOrders(
  takerTokenAddress: Address[],
  takerTokenAmount: BigNumber[],
): Bytes {
  const takerWalletOrders: Buffer[] = [];
  _.each(takerTokenAmount, (amount, idx) => {
    takerWalletOrders.push(SetProtocolUtils.paddedBufferForPrimitive(takerTokenAddress[idx]));
    takerWalletOrders.push(SetProtocolUtils.paddedBufferForPrimitive(web3.utils.toHex(amount)));
  });

  return ethUtil.bufferToHex(Buffer.concat(takerWalletOrders));
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
