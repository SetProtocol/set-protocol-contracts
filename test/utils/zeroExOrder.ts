import * as _ from "lodash";
import * as ethUtil from "ethereumjs-util";
import * as Web3 from "web3";
const web3 = new Web3();

import { Order } from '@0xproject/types';

import { BigNumber } from "bignumber.js";
import { Address, Bytes32, Bytes, UInt } from "../../types/common.js";

import { assetProxyUtils, generatePseudoRandomSalt } from '@0xProject/order-utils';

import {
  EXCHANGE_ADDRESS,
} from "./zeroExConstants";

import {
  DEFAULT_GAS,
  NULL_ADDRESS,
  ZERO,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
} from "./constants";

import { 
  bufferAndLPad32,
  getNumBytesFromHex,
  getNumBytesFromBuffer,
  bufferArrayToHex,
  bufferAndLPad32BigNumber,
} from "./encoding";

export function generateStandardZeroExOrder(
    makerAddress: Address,
    makerToken: Address,
    takerToken: Address,
    makerAssetAmount: BigNumber,
    takerAssetAmount: BigNumber,
): Order {
  const tenMinutes = 10 * 60 * 1000;
  const randomExpiration = new BigNumber(Date.now() + tenMinutes);

  const makerAssetData = assetProxyUtils.encodeERC20AssetData(makerToken);
  const takerAssetData = assetProxyUtils.encodeERC20AssetData(takerToken);

  const order = {
    exchangeAddress: EXCHANGE_ADDRESS,
    makerAddress,
    takerAddress: NULL_ADDRESS,
    senderAddress: NULL_ADDRESS,
    feeRecipientAddress: NULL_ADDRESS,
    expirationTimeSeconds: randomExpiration,
    salt: generatePseudoRandomSalt(),
    makerAssetAmount,
    takerAssetAmount,
    makerAssetData,
    takerAssetData,
    makerFee: ZERO,
    takerFee: ZERO,
  } as Order;

  return order;
}
