import { ExchangeOrder } from './types';

export function isZeroExOrder(object: ExchangeOrder): boolean {
  return (
    'exchangeAddress' in object &&
    'makerAddress' in object &&
    'takerAddress' in object &&
    'senderAddress' in object &&
    'feeRecipientAddress' in object &&
    'expirationTimeSeconds' in object &&
    'salt' in object &&
    'makerAssetAmount' in object &&
    'takerAssetAmount' in object &&
    'makerAssetData' in object &&
    'takerAssetData' in object &&
    'makerFee' in object &&
    'takerFee' in object
  );
}

export function isTakerWalletOrder(object: ExchangeOrder): boolean {
  return (
    'takerTokenAddress' in object &&
    'takerTokenAmount' in object
  );
}

export function isKyberTrade(object: ExchangeOrder): boolean {
  return (
    'destinationToken' in object &&
    'sourceTokenQuantity' in object &&
    'minimumConversionRate' in object &&
    'maxDestinationQuantity' in object
  );
}
