import * as _ from 'lodash';
import * as ethUtil from 'ethereumjs-util';
import { BigNumber } from 'bignumber.js';
import { SetProtocolUtils, Address, Bytes, IssuanceOrder }  from 'set-protocol-utils';

import { ether } from './units';

const setUtils = new SetProtocolUtils(web3);


export async function generateFillOrderParameters(
  setAddress: Address,
  signerAddress: Address,
  makerAddress: Address,
  requiredComponents: Address[],
  requiredComponentAmounts: BigNumber[],
  makerToken: Address,
  relayerAddress: Address,
  relayerToken: Address,
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
    expiration: SetProtocolUtils.generateTimestamp(timeToExpiration),
    makerRelayerFee: ether(1),
    takerRelayerFee: ether(1),
    salt: SetProtocolUtils.generateSalt(),
    requiredComponents,
    requiredComponentAmounts,
  } as IssuanceOrder;

  const addresses = [order.setAddress, order.makerAddress, order.makerToken, order.relayerAddress, order.relayerToken];
  const values = [
    order.quantity,
    order.makerTokenAmount,
    order.expiration,
    order.makerRelayerFee,
    order.takerRelayerFee,
    order.salt,
  ];

  const orderHash = SetProtocolUtils.hashOrderHex(order);
  const signature = await setUtils.signMessage(orderHash, signerAddress);
  return {
    addresses,
    values,
    orderHash,
    signature,
    requiredComponents,
    requiredComponentAmounts,
  };
}

export function generateOrdersDataForOrderCount(
  orderCount: number,
  makerTokenAddress: Address,
  makerTokenAmounts: number[],
): Bytes {
  const exchangeOrderDatum: Buffer[] = [];
  _.times(orderCount, index => {
    const exchange = _.sample(setUtils.EXCHANGES);
    exchangeOrderDatum.push(setUtils.paddedBufferForPrimitive(exchange));
    exchangeOrderDatum.push(setUtils.paddedBufferForPrimitive(makerTokenAddress));
    exchangeOrderDatum.push(setUtils.paddedBufferForBigNumber(ether(makerTokenAmounts[index])));

    const totalOrdersLength = _.random(200, 250); // Fake order data
    exchangeOrderDatum.push(setUtils.paddedBufferForPrimitive(totalOrdersLength));
    exchangeOrderDatum.push(randomBufferOfLength(totalOrdersLength));
  });

  return ethUtil.bufferToHex(Buffer.concat(exchangeOrderDatum));
}

export function generateOrdersDataWithTakerOrders(
  makerTokenAddress: Address,
  takerTokenAddresses: Address[],
  takerTokenAmounts: BigNumber[],
): Bytes {
  // Header for entire ordersData
  const exchangeOrderDatum: Buffer[] = [
    SetProtocolUtils.paddedBufferForPrimitive(SetProtocolUtils.EXCHANGES.TAKER_WALLET),
    SetProtocolUtils.paddedBufferForPrimitive(takerTokenAddresses.length), // Include the number of orders
    SetProtocolUtils.paddedBufferForPrimitive(makerTokenAddress),
    SetProtocolUtils.paddedBufferForPrimitive(0), // Taker wallet orders do not take any maker token to execute
  ];

  // Body for takers orders
  const takerOrdersData: Buffer[] = [];
  _.each(takerTokenAmounts, (amount, idx) => {
    takerOrdersData.push(SetProtocolUtils.paddedBufferForPrimitive(takerTokenAddresses[idx]));
    takerOrdersData.push(SetProtocolUtils.paddedBufferForPrimitive(web3.toHex(amount)));
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
    takerWalletOrders.push(SetProtocolUtils.paddedBufferForPrimitive(web3.toHex(amount)));
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
