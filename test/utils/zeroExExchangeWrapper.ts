import * as _ from "lodash";
import * as ethUtil from "ethereumjs-util";

import { BigNumber } from "bignumber.js";
import { Address, Bytes32, UInt } from "../../types/common.js";
import {
  
} from "../utils/constants";

function bufferAndLPad32(input: any): Buffer {
  return ethUtil.setLengthLeft(ethUtil.toBuffer(input), 32);
}



export function generateZeroExExchangeOrdersHeader(
  signatureLength: UInt,
  orderLength: UInt,
  makerAssetDataLength: UInt,
  takerAssetDataLength: UInt,
  fillAmount: UInt = 0,
): Bytes32 {
  const buffer = Buffer.concat(
    [
      bufferAndLPad32(signatureLength),
      bufferAndLPad32(orderLength),
      bufferAndLPad32(makerAssetDataLength),
      bufferAndLPad32(takerAssetDataLength),
      bufferAndLPad32(fillAmount),
    ]
  );

  return ethUtil.bufferToHex(buffer);
}
