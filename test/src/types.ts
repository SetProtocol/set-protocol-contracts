import { BigNumber } from './bignumber';

export type Address = string;
export type Bytes = string;
export type UInt = number | BigNumber;
export type ExchangeOrder = ZeroExSignedFillOrder | TakerWalletOrder | KyberTrade;

export interface Constants {
  [constantId: string]: any;
}

export interface Log {
  event: string;
  address: Address;
  args: any;
}

export enum SolidityTypes {
  Address = 'address',
  Bytes32 = 'bytes32',
  Uint256 = 'uint256',
  Uint8 = 'uint8',
  Uint = 'uint',
  AddressArray = 'address[]',
  UintArray = 'uint256[]',
  String = 'string',
}

export interface ECSig {
  v: UInt;
  r: string;
  s: string;
}

export interface Exchanges {
  [exchangeId: string]: TakerWalletOrder[];
}

export interface IssuanceOrder {
  setAddress: Address;
  makerAddress: Address;
  makerToken: Address;
  relayerAddress: Address;
  relayerToken: Address;
  quantity: BigNumber;
  makerTokenAmount: BigNumber;
  expiration: BigNumber;
  makerRelayerFee: BigNumber;
  takerRelayerFee: BigNumber;
  salt: BigNumber;
  requiredComponents: Address[];
  requiredComponentAmounts: BigNumber[];
}

export interface ExchangeIssueParams {
  setAddress: Address;
  paymentToken: Address;
  paymentTokenAmount: BigNumber;
  quantity: BigNumber;
  requiredComponents: Address[];
  requiredComponentAmounts: BigNumber[];
}

export interface ExchangeRedemptionParams {
  setAddress: Address;
  redemptionToken: Address;
  redemptionTokenAmount: BigNumber;
  quantity: BigNumber;
  requiredComponents: Address[];
  requiredComponentAmounts: BigNumber[];
}

export interface SignedIssuanceOrder extends IssuanceOrder {
  signature: ECSig;
}

export interface KyberTrade {
  destinationToken: Address;
  sourceToken: Address,
  sourceTokenQuantity: BigNumber;
  minimumConversionRate: BigNumber;
  maxDestinationQuantity: BigNumber;
}

export interface TakerWalletOrder {
  takerTokenAddress: Address;
  takerTokenAmount: BigNumber;
}

export interface ZeroExSignedFillOrder {
  senderAddress: Address;
  makerAddress: Address;
  takerAddress: Address;
  makerFee: BigNumber;
  takerFee: BigNumber;
  makerAssetAmount: BigNumber;
  takerAssetAmount: BigNumber;
  makerAssetData: string;
  takerAssetData: string;
  salt: BigNumber;
  exchangeAddress: Address;
  feeRecipientAddress: Address;
  expirationTimeSeconds: BigNumber;
  signature: string;
  fillAmount: BigNumber;
}
