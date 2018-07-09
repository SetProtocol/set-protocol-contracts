import { BigNumber } from "bignumber.js";
import { Address, Bytes, UInt } from "./common";

export interface ZeroExOrderHeader {
  signatureLength: UInt;
  orderLength: UInt;
  makerAssetDataLength: UInt;
  takerAssetDataLength: UInt;
}
