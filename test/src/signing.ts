import * as ethUtil from 'ethereumjs-util';
import Web3 from 'web3';
import promisify from 'tiny-promisify';

import { Address, ECSig } from './types';


export function parseSignatureHexAsRSV(signatureHex: string): ECSig {
  const { v, r, s } = ethUtil.fromRpcSig(signatureHex);

  return {
    v,
    r: ethUtil.bufferToHex(r),
    s: ethUtil.bufferToHex(s),
  };
}

export async function signMessage(
  web3: Web3,
  message: string,
  address: Address,
  addPrefix: boolean = false,
): Promise<ECSig> {
  let msgBuff;
  let prefixedMsgBuff;
  let prefixedMsgHex;
  let messageToSign;

  // By default we don't need to add prefix because eth.sign will do it. However, some providers like
  // Metamask incorrectly implements eth_sign and does not prefix the message as per the spec.
  // https://github.com/MetaMask/metamask-extension/commit/a9d36860bec424dcee8db043d3e7da6a5ff5672e
  if (addPrefix) {
    msgBuff = ethUtil.toBuffer(message);
    prefixedMsgBuff = ethUtil.hashPersonalMessage(msgBuff);
    prefixedMsgHex = ethUtil.bufferToHex(prefixedMsgBuff);
  }

  messageToSign = addPrefix ? prefixedMsgHex : message;

  const signature = await promisify(web3.eth.sign)(messageToSign, web3.utils.toChecksumAddress(address));

  return parseSignatureHexAsRSV(signature);
}

export function convertSigToHex(ecSignature: ECSig): string {
  const signatureBuffer = Buffer.concat([
    ethUtil.toBuffer(ecSignature.v),
    ethUtil.toBuffer(ecSignature.r),
    ethUtil.toBuffer(ecSignature.s),
  ]);

  return ethUtil.bufferToHex(signatureBuffer);
}
