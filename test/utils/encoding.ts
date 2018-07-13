import * as _ from "lodash";
import * as ethUtil from "ethereumjs-util";
import * as Web3 from "web3";
const web3 = new Web3();

import { BigNumber } from "bignumber.js";

import { Address, Bytes32, Bytes, UInt } from "../../types/common.js";

/**
 * Returns a buffer padded to 32 bytes
 * @param {any} any input to buffer
 * @return {Buffer}
 */
export function bufferAndLPad32(input: any): Buffer {
  return ethUtil.setLengthLeft(ethUtil.toBuffer(input), 32);
}

export function bufferArrayToHex(
  bufferArr: Buffer[]
): Bytes32 {
    const buffer = Buffer.concat(bufferArr);
    return ethUtil.bufferToHex(buffer);
}

export function bufferAndLPad32BigNumber(bigNum: BigNumber): Buffer {
	return bufferAndLPad32(web3.toHex(bigNum));
}

export function concatBytes(
  inputs: Bytes[]
): Bytes {
  if (inputs.length === 0) {
    throw new Error("No errors in concat Orders");
  }

  let bytes: Bytes = '';

  _.each(inputs, (input) => {
    bytes = bytes.concat(removeHexPrefix(input));
  });

  return addHexPrefix(bytes);
}

/**
 * Returns a big int of the num of bytes in the hex string
 * @param {String} bytestring the string in bytes
 * @return {String|Optional} a string by pass if necessary
 */
export function getNumBytesFromHex(hexString: string): BigNumber {
	if (!isHexPrefixed(hexString)) {
		throw new Error(`${hexString} is not a hex string. It must be Hex-Prefixed`);
	}

	return new BigNumber(removeHexPrefix(hexString).length).div(2);
}

export function getNumBytesFromBuffer(
    buff: Buffer[],
): BigNumber {
    const hex = bufferArrayToHex(buff);
    return getNumBytesFromHex(hex);
}


/**
 * Taken from: https://github.com/SilentCicero/strip-hex-prefix/blob/master/src/index.js
 * Removes '0x' from a given `String` if present
 * @param {String} str the string value
 * @return {String|Optional} a string by pass if necessary
 */
export function removeHexPrefix(input: any): string {
  if (typeof input !== 'string') {
    return input;
  }

  return isHexPrefixed(input) ? input.slice(2) : input;
}

/**
 * Adds '0x' from a given `String` if not present
 * @param {String} str the string value
 * @return {String|Optional} a string by pass if necessary
 */
export function addHexPrefix(input: any): string {
if (typeof input !== 'string') {
    return input;
  }

  return !isHexPrefixed(input) ? `0x${input}` : input;
}


/**
 * Taken from: https://github.com/SilentCicero/is-hex-prefixed/blob/master/src/index.js
 * Returns a `Boolean` on whether or not the a `String` starts with '0x'
 * @param {String} str the string input value
 * @return {Boolean} a boolean if it is or is not hex prefixed
 * @throws if the str input is not a string
 */
export function isHexPrefixed(str: any): boolean {
  if (typeof str !== 'string') {
    throw new Error("[is-hex-prefixed] value must be type 'string', is currently type " + (typeof str) + ", while checking isHexPrefixed.");
  }

  return str.slice(0, 2) === '0x';
}