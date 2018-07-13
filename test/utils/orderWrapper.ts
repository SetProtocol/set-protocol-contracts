import * as _ from "lodash";
import * as ethUtil from "ethereumjs-util";
import * as ethABI from 'ethereumjs-abi';

import { soliditySHA3 } from './ethereum-abi-arrays';
import { BigNumber } from "bignumber.js";
import BN = require('bn.js');

import { Address, Bytes32, UInt, IssuanceOrder, SolidityTypes } from "../../types/common.js";
import {
  EXCHANGES,
  MAX_DIGITS_IN_UNSIGNED_256_INT,
} from "../utils/constants";

import { ether } from "./units";
import { bufferAndLPad32BigNumber } from "./encoding"


function bigNumberToBN(value: BigNumber) {
    return new BN(value.toString(), 10);
}

function parseSigHexAsRSV(sigHex: string): any {
  const { v,r,s } = ethUtil.fromRpcSig(sigHex);

  const ecSig = {
    v,
    r: ethUtil.bufferToHex(r),
    s: ethUtil.bufferToHex(s),
  };
  return ecSig
}

export function generateOrdersDataForOrderCount(
  orderCount: number,
  makerTokenAddress: Address,
  makerTokenAmounts: number[],
): Bytes32 {
  const exchangeOrderDatum: Buffer[] = [];
  _.times(orderCount, (index) => {
    const exchange = _.sample(EXCHANGES);
    exchangeOrderDatum.push(paddedBufferForData(exchange));

    exchangeOrderDatum.push(paddedBufferForData(makerTokenAddress));

    exchangeOrderDatum.push(bufferAndLPad32BigNumber(ether(makerTokenAmounts[index])));

    const totalOrdersLength = _.random(200, 250);
    exchangeOrderDatum.push(paddedBufferForData(totalOrdersLength));
    exchangeOrderDatum.push(randomBufferOfLength(totalOrdersLength));
  });

  return ethUtil.bufferToHex(Buffer.concat(exchangeOrderDatum));
}

export function generateTakerWalletOrders(
  takerTokenAddress: Address[],
  takerTokenAmount: BigNumber[],
): Bytes32 {
  const takerWalletOrders: Buffer[] = [];
  _.each(takerTokenAmount, (amount, idx) => {
    takerWalletOrders.push(paddedBufferForData(takerTokenAddress[idx]));
    takerWalletOrders.push(paddedBufferForData(web3.toHex(amount)));
  });

  return ethUtil.bufferToHex(Buffer.concat(takerWalletOrders));
}

export function generateOrdersDataWithIncorrectExchange(): Bytes32 {
  const invalidExchangeId = 4;
  const orderLength = _.random(120, 160);

  const exchangeOrderDatum: Buffer[] = [
    paddedBufferForData(invalidExchangeId),
    paddedBufferForData(orderLength),
    randomBufferOfLength(orderLength),
  ];

  return ethUtil.bufferToHex(Buffer.concat(exchangeOrderDatum));
}

function paddedBufferForData(
  data: any
): Buffer {
  return ethUtil.setLengthLeft(ethUtil.toBuffer(data), 32);
}

function randomBufferOfLength(
  length: number
): Buffer {
  return ethUtil.setLengthLeft(ethUtil.toBuffer(0), length);
}

export function generateSalt(): BigNumber {
  const randomNumber = BigNumber.random(MAX_DIGITS_IN_UNSIGNED_256_INT);
  const factor = new BigNumber(10).pow(MAX_DIGITS_IN_UNSIGNED_256_INT-1);
  const salt = randomNumber.times(factor).round();
  return salt;
}

export function generateTimeStamp(
  min: number,
): BigNumber {
  const timeToExpiration = min * 60 * 1000;
  const expiration = new BigNumber(Math.floor((Date.now() + timeToExpiration)/1000));
  return expiration;
}

export function hashOrderHex(
  order: IssuanceOrder,
): string {
  const orderParts = [
    {value: order.setAddress, type: SolidityTypes.Address},
    {value: order.makerAddress, type: SolidityTypes.Address},
    {value: order.makerToken, type: SolidityTypes.Address},
    {value: order.relayerAddress, type: SolidityTypes.Address},
    {value: order.relayerToken, type: SolidityTypes.Address},
    {value: order.quantity, type: SolidityTypes.Uint256},
    {value: order.makerTokenAmount, type: SolidityTypes.Uint256},
    {value: order.expiration, type: SolidityTypes.Uint256},
    {value: order.relayerTokenAmount, type: SolidityTypes.Uint256},
    {value: order.salt, type: SolidityTypes.Uint256},
    {value: order.requiredComponents, type: SolidityTypes.AddressArray},
    {value: order.requiredComponentAmounts, type: SolidityTypes.UintArray},
  ]

  const types = _.map(orderParts, o => o.type);
  const values = _.map(orderParts, o => o.value);
  const hashBuff = soliditySHA3(types, values);
  const hashHex = ethUtil.bufferToHex(hashBuff);
  return hashHex;
}

export async function signMessage(
  msg: string,
  address: Address
): Promise<string> {
  const normalSigner = String(address).toLowerCase();

  const sig = web3.eth.sign(address, msg);
  const ecSig = parseSigHexAsRSV(sig);
  return ecSig;
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
    expiration: generateTimeStamp(timeToExpiration),
    relayerTokenAmount: ether(1),
    salt: generateSalt(),
    requiredComponents,
    requiredComponentAmounts,
  } as IssuanceOrder;

  const addresses = [order.setAddress, order.makerAddress, order.makerToken, order.relayerAddress, order.relayerToken];
  const values = [order.quantity, order.makerTokenAmount, order.expiration, order.relayerTokenAmount, order.salt];

  const orderHash = hashOrderHex(order);
  const signature = await signMessage(orderHash, signerAddress);
  return {
    addresses,
    values,
    orderHash,
    signature,
    requiredComponents,
    requiredComponentAmounts
  };
}
