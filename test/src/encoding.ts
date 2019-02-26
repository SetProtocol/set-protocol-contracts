import * as _ from 'lodash';
import * as ethUtil from 'ethereumjs-util';
import Web3 from 'web3';
import { BigNumber } from './bignumber';
import { BN } from './bn';

import { Bytes } from './types';

const web3 = new Web3();


export function concatBytes(inputs: Bytes[]): Bytes {
  if (inputs.length === 0) {
    throw new Error('No errors in concat Orders');
  }

  let bytes: Bytes = '';
  _.each(inputs, input => {
    bytes = bytes.concat(removeHexPrefix(input));
  });

  return addHexPrefix(bytes);
}

export function bufferArrayToHex(bufferArray: Buffer[]): Bytes {
  const buffer = Buffer.concat(bufferArray);

  return ethUtil.bufferToHex(buffer);
}

export function hashObject(types: string[], values: any[]): Buffer {
  return ethUtil.sha3(solidityPack(types, values));
}

export function hashString(value: string): Buffer {
  return ethUtil.sha3(value);
}

export function numBytesFromBuffer(buffer: Buffer[]): BigNumber {
    const hex = bufferArrayToHex(buffer);

    return numBytesFromHex(hex);
}

export function numBytesFromHex(hex: string): BigNumber {
  if (!isHexPrefixed(hex)) {
    throw new Error(`${hex} is not a hex string. It must be Hex-Prefixed`);
  }

  return new BigNumber(removeHexPrefix(hex).length).div(2);
}

export function paddedBufferForPrimitive(input: any): Buffer {
  return ethUtil.setLengthLeft(ethUtil.toBuffer(input), 32);
}

export function paddedBufferForBigNumber(number: BigNumber): Buffer {
  return paddedBufferForPrimitive(web3.utils.toHex(number));
}

export function paddedBufferForBN(number: BN): Buffer {
  return paddedBufferForPrimitive(web3.utils.toHex(number));
}

export function stringToBytes(input: string): Bytes {
  // Padding 66 to include the '0x' prefix
  return web3.utils.fromAscii(input).padEnd(66, '0');
}

function elementaryName (
  name: string,
): string {
  if (name.startsWith('int[')) {
    return 'int256' + name.slice(3);
  } else if (name === 'int') {
    return 'int256';
  } else if (name.startsWith('uint[')) {
    return 'uint256' + name.slice(4);
  } else if (name === 'uint') {
    return 'uint256';
  }
  return name;
}

function isHexPrefixed(str: any): boolean {
  if (typeof str !== 'string') {
    throw new Error("Must be type 'string', is currently type " + (typeof str) + ', while checking isHexPrefixed.');
  }

  return str.slice(0, 2) === '0x';
}

// Parse N from type<N>
function parseTypeN (
  type: string,
): number {
  // Figure out how to mirror parseInt in typescript
  return parseInt(/^\D+(\d+)$/.exec(type)[1], 10);
}

function parseNumber (
  arg: any,
): any {
  const type = typeof arg;
  if (type === 'number') {
    return new BigNumber(arg);
  } else if (type === 'object') {
    // Assume this is a BigNumber for the moment, replace with BN.isBN soon
    return arg;
  } else {
    throw new Error('Argument is not a supported type');
  }
}

function removeHexPrefix(input: any): string {
  if (typeof input !== 'string') {
    return input;
  }

  return isHexPrefixed(input) ? input.slice(2) : input;
}

function addHexPrefix(input: any): string {
if (typeof input !== 'string') {
    return input;
  }

  return !isHexPrefixed(input) ? `0x${input}` : input;
}

function solidityPack (
  types: string[],
  values: any[],
  ): Buffer {
  if (types.length !== values.length) {
    throw new Error('Number of types are not matching the values');
  }

  let size: number;
  let num: BigNumber;
  const ret: Buffer[] = [];
  let j: number;

  for (let i = 0; i < types.length; i++) {
    const type = elementaryName(types[i]);
    const value = values[i];

    if (type === 'bytes') {
      ret.push(value);
    } else if (Array.isArray(values[i])) {
        const typeArray = type.split('[')[0];

        if (typeArray == 'address') {
          for (j = 0; j < value.length; j++) {
            ret.push(ethUtil.setLengthLeft(value[j], 32));
          }
        } else if (typeArray == 'bool') {
          for (j = 0; j < value.length; j++) {
            ret.push(ethUtil.setLengthLeft(new Buffer(value[j] ? 1 : 0), 32));
          }
        } else if (typeArray.startsWith('bytes') && (parseTypeN(typeArray) >= 1 || parseTypeN(typeArray) <= 32)) {
          for (j = 0; j < value.length; j++) {
            ret.push(ethUtil.setLengthRight(value[j], 32));
          }
        } else if (typeArray.startsWith('uint')) {
          size = parseTypeN(typeArray);
          if ((size % 8) || (size < 8) || (size > 256)) {
            throw new Error('Invalid uint<N> width: ' + size);
          }
          for (j = 0; j < value.length; j++) {
            num = parseNumber(!value[j] ? 0 : value[j]);

            ret.push(paddedBufferForBigNumber(num));
          }
        }  else {
          throw new Error('Unsupported or invalid type array: ' + typeArray);
        }
    } else if (type === 'string') {
      ret.push(new Buffer(value, 'utf8'));
    } else if (type === 'bool') {
      ret.push(new Buffer(value ? '01' : '00', 'hex'));
    } else if (type === 'address') {
      ret.push(ethUtil.setLengthLeft(value, 20));
    } else if (type.startsWith('bytes')) {
      size = parseTypeN(type);
      if (size < 1 || size > 32) {
        throw new Error('Invalid bytes<N> width: ' + size);
      }

      ret.push(ethUtil.setLengthRight(value, size));
    } else if (type.startsWith('uint')) {
      size = parseTypeN(type);
      if ((size % 8) || (size < 8) || (size > 256)) {
        throw new Error('Invalid uint<N> width: ' + size);
      }

      num = parseNumber(value);
      ret.push(paddedBufferForBigNumber(num));
    } else if (type.startsWith('int')) {
      size = parseTypeN(type);
      if ((size % 8) || (size < 8) || (size > 256)) {
        throw new Error('Invalid int<N> width: ' + size);
      }

      num = parseNumber(value);
      ret.push(paddedBufferForBigNumber(num));
    } else {
      // FIXME: support all other types
      throw new Error('Unsupported or invalid type: ' + type);
    }
  }
  return Buffer.concat(ret);
}
