import * as _ from "lodash";
import * as ethUtil from "ethereumjs-util";
import * as ethABI from 'ethereumjs-abi';

import { BigNumber } from "bignumber.js";
import BN = require('bn.js');

import { Address, Bytes32, UInt, IssuanceOrder, SolidityTypes } from "../../types/common.js";
import {
  ORDER_TYPE,
  MAX_DIGITS_IN_UNSIGNED_256_INT,
} from "../utils/constants";

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

export function generateExchangeOrdersHeader(
  orderCount: UInt
): Bytes32 {
  return ethUtil.bufferToHex(
    ethUtil.setLengthLeft(
      ethUtil.toBuffer(orderCount), 32)
    );
}

export function generateExchangeOrdersBody(
  exchange: UInt,
  orderLength: UInt,
): Bytes32 {

  const buffer = Buffer.concat(
    [
      ethUtil.setLengthLeft(ethUtil.toBuffer(exchange), 32),
      ethUtil.setLengthLeft(ethUtil.toBuffer(orderLength), 32),
    ]
  );

  return ethUtil.bufferToHex(buffer);
}

export function generateExchangeOrdersData(
  orderCount: UInt,
  exchange: UInt,
  orderLength: UInt,
): Bytes32 {

  const buffer = Buffer.concat(
    [
      ethUtil.setLengthLeft(ethUtil.toBuffer(orderCount), 32),
      ethUtil.setLengthLeft(ethUtil.toBuffer(exchange), 32),
      ethUtil.setLengthLeft(ethUtil.toBuffer(orderLength), 32),
    ]
  );

  return ethUtil.bufferToHex(buffer);
}

export function generateSalt(): BigNumber {
  const randomNumber = BigNumber.random(MAX_DIGITS_IN_UNSIGNED_256_INT);
  const factor = new BigNumber(10).pow(MAX_DIGITS_IN_UNSIGNED_256_INT-1);
  const salt = randomNumber.times(factor).round();
  return salt;
}

export function generateTimeStamp(): BigNumber {
  const tenMinutes = 10 * 60 * 1000;
  const expiration = new BigNumber(Date.now() + tenMinutes);
  return expiration;
}

export function hashOrderHex(
  order: IssuanceOrder,
): string {
  const orderParts = [
    {value: order.setAddress, type: SolidityTypes.Address},
    {value: order.makerAddress, type: SolidityTypes.Address},
    {value: order.makerToken, type: SolidityTypes.Address},
    {value: order.relayerToken, type: SolidityTypes.Address},
    {value: bigNumberToBN(order.quantity), type: SolidityTypes.Uint256},
    {value: bigNumberToBN(order.makerTokenAmount), type: SolidityTypes.Uint256},
    {value: bigNumberToBN(order.expiration), type: SolidityTypes.Uint256},
    {value: bigNumberToBN(order.relayerTokenAmount), type: SolidityTypes.Uint256},
    {value: bigNumberToBN(order.salt), type: SolidityTypes.Uint256}
  ]

  const types = _.map(orderParts, o => o.type);
  const values = _.map(orderParts, o => o.value);
  const hashBuff = ethABI.soliditySHA3(types, values);
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
