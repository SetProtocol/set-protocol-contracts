import { SignatureType } from '@0xproject/types';
import * as ethUtil from 'ethereumjs-util';
import { BigNumber } from '@0xproject/utils';

import { Address, Bytes32, Log, UInt, Bytes } from "../../types/common";

/**
 * Takes a hex message, signs it with the local private key
 * NOTE: For zeroEx orders, the bytes is suffixed with the signature Type
 */
export async function signMessageAsync(
    hexMsg: Bytes,
    address: Address,
    sigType: SignatureType,
  ): Promise<string> {
    const normalSigner = String(address).toLowerCase();

    const sig = web3.eth.sign(address, hexMsg);
    const rpcSig = ethUtil.fromRpcSig(sig);
    const signature = Buffer.concat([
        ethUtil.toBuffer(rpcSig.v),
        rpcSig.r,
        rpcSig.s,
        ethUtil.toBuffer(sigType),
    ]);
    return `0x${signature.toString('hex')}`;
}
