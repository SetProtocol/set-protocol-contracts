import { Address, Bytes, UInt } from "./common";

export interface ZeroExOrder {
  makerAddress: Address;
  takerAddress: Address;
  feeRecipientAddress: Address;
  senderAddress: Address;
  makerAssetAmount: UInt;
  takerAssetAmount: UInt;
  makerFee: UInt;
  takerFee: UInt;
  expirationTimeSeconds: UInt;
  salt: UInt;
  makerAssetData: Bytes;
  takerAssetData: Bytes;
}