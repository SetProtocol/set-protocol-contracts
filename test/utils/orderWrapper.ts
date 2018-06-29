import * as _ from "lodash";
import * as ethUtil from "ethereumjs-util";

import { BigNumber } from "bignumber.js";
import { Address, Bytes32, UInt } from "../../types/common.js";
import {
  ORDER_TYPE,
} from "../utils/constants";

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
