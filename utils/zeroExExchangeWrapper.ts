import * as ethUtil from 'ethereumjs-util';
import { SetProtocolUtils }  from 'set-protocol-utils';

import { BigNumber } from 'bignumber.js';
import { Address, Bytes } from '../types/common.js';
import { ZeroExOrder } from '../types/zeroEx';


export function createZeroExOrder(
  makerAddress: Address,
  takerAddress: Address,
  feeRecipientAddress: Address,
  senderAddress: Address,
  makerAssetAmount: BigNumber,
  takerAssetAmount: BigNumber,
  makerFee: BigNumber,
  takerFee: BigNumber,
  expirationTimeSeconds: BigNumber,
  salt: BigNumber,
  makerAssetData: Bytes,
  takerAssetData: Bytes,
): ZeroExOrder {
  return {
    makerAddress,
    takerAddress,
    feeRecipientAddress,
    senderAddress,
    makerAssetAmount,
    takerAssetAmount,
    makerFee,
    takerFee,
    expirationTimeSeconds,
    salt,
    makerAssetData,
    takerAssetData,
  };
}

export function generateStandardZeroExOrderBytesArray(
    zeroExOrder: ZeroExOrder,
    signature: Bytes,
    fillAmount: BigNumber,
): Bytes {
  const { makerAssetData } = zeroExOrder;

  const makerAssetDataLength = SetProtocolUtils.numBytesFromHex(makerAssetData);
  const takerAssetDataLength = SetProtocolUtils.numBytesFromHex(makerAssetData);

  // Get signature length
  const signatureLength: BigNumber = SetProtocolUtils.numBytesFromHex(signature);

  // Get order length
  const zeroExOrderBuffer = bufferZeroExOrder(zeroExOrder);
  const zeroExOrderLength = SetProtocolUtils.numBytesFromBuffer(zeroExOrderBuffer);

  // Generate the standard byte array
  return SetProtocolUtils.bufferArrayToHex(
    bufferOrderHeader(
      signatureLength,
      zeroExOrderLength,
      makerAssetDataLength,
      takerAssetDataLength,
    )
    .concat([SetProtocolUtils.paddedBufferForBigNumber(fillAmount)])
    .concat([ethUtil.toBuffer(signature)])
    .concat(zeroExOrderBuffer)
  );
}

export function bufferZeroExOrder(
  order: ZeroExOrder,
): Buffer[] {
  return [
      SetProtocolUtils.paddedBufferForPrimitive(order.makerAddress),
      SetProtocolUtils.paddedBufferForPrimitive(order.takerAddress),
      SetProtocolUtils.paddedBufferForPrimitive(order.feeRecipientAddress),
      SetProtocolUtils.paddedBufferForPrimitive(order.senderAddress),
      SetProtocolUtils.paddedBufferForBigNumber(order.makerAssetAmount),
      SetProtocolUtils.paddedBufferForBigNumber(order.takerAssetAmount),
      SetProtocolUtils.paddedBufferForBigNumber(order.makerFee),
      SetProtocolUtils.paddedBufferForBigNumber(order.takerFee),
      SetProtocolUtils.paddedBufferForBigNumber(order.expirationTimeSeconds),
      SetProtocolUtils.paddedBufferForBigNumber(order.salt),
      ethUtil.toBuffer(order.makerAssetData),
      ethUtil.toBuffer(order.takerAssetData),
  ];
}

export function generateERC20TokenAssetData(
  tokenAddress: Address,
): string {
  // The ERC20 asset data is always prefixed with 0xf47261b0
  // bytes4 ERC20_SELECTOR = bytes4(keccak256("ERC20Token(address)"));
  const erc20AssetSelector = '0xf47261b0';

  // Remove hex prefix and left pad to 32 bytes
  const moddedTokenAddress = tokenAddress.slice(2).padStart(64, '0');
  return erc20AssetSelector.concat(moddedTokenAddress);
}

function bufferOrderHeader(
  signatureLength: BigNumber,
  orderLength: BigNumber,
  makerAssetDataLength: BigNumber,
  takerAssetDataLength: BigNumber,
): Buffer[] {
    return [
      SetProtocolUtils.paddedBufferForBigNumber(signatureLength),
      SetProtocolUtils.paddedBufferForBigNumber(orderLength),
      SetProtocolUtils.paddedBufferForBigNumber(makerAssetDataLength),
      SetProtocolUtils.paddedBufferForBigNumber(takerAssetDataLength),
    ];
}
