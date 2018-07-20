import * as ethUtil from "ethereumjs-util";
import { BigNumber } from "bignumber.js";
import { Address, Bytes, Bytes32, UInt, IssuanceOrder, SolidityTypes } from "../types/common.js";
import { bufferAndLPad32BigNumber } from "./encoding.js";

var ABI = function () {
}

// Convert from short to canonical names
// FIXME: optimise or make this nicer?
function elementaryName (
  name: string,
): string {
  if (name.startsWith('int[')) {
    return 'int256' + name.slice(3)
  } else if (name === 'int') {
    return 'int256'
  } else if (name.startsWith('uint[')) {
    return 'uint256' + name.slice(4)
  } else if (name === 'uint') {
    return 'uint256'
  }
  return name
}

// Parse N from type<N>
function parseTypeN (
  type: string,
): number {
  //Figure out how to mirror parseInt in typescript
  return parseInt(/^\D+(\d+)$/.exec(type)[1], 10)
}

function parseNumber (
  arg: any,
): any {
  var type = typeof arg
  if (type === 'number') {
    return new BigNumber(arg)
  } else if (type === 'object') {
    // assume this is a BigNumber for the moment, replace with BN.isBN soon
    return arg
  } else {
    throw new Error('Argument is not a supported type')
  }
}

export function solidityPack (
  types: string[],
  values: any[],
  ): Buffer {
  if (types.length !== values.length) {
    throw new Error('Number of types are not matching the values')
  }

  let size: number;
  let num: BigNumber;
  let ret: Buffer[] = [];
  let j: number;

  for (var i = 0; i < types.length; i++) {
    const type = elementaryName(types[i]);
    const value = values[i];

    if (type === 'bytes') {
      ret.push(value);
    } else if (Array.isArray(values[i])) {
        const typeArray = type.split('[')[0];

        if(typeArray=='address') {
          for(j=0;j<value.length;j++) {
            ret.push(ethUtil.setLengthLeft(value[j], 32));
          };
        }else if(typeArray=='bool') {
          for(j=0;j<value.length;j++) {
            ret.push(ethUtil.setLengthLeft(new Buffer(value[j] ? 1 : 0), 32));
          };
        } else if (typeArray.startsWith('bytes') && (parseTypeN(typeArray) >= 1 || parseTypeN(typeArray) <= 32)) {
          for(j=0;j<value.length;j++) {
            ret.push(ethUtil.setLengthRight(value[j], 32));
          };
        } else if (typeArray.startsWith('uint')) {
          size = parseTypeN(typeArray)
          if ((size % 8) || (size < 8) || (size > 256)) {
            throw new Error('Invalid uint<N> width: ' + size)
          }
          for(j=0;j<value.length;j++) {
            num = parseNumber(!value[j]?0:value[j]);

            ret.push(bufferAndLPad32BigNumber(num))
          }
        }  else {
          throw new Error('Unsupported or invalid type array: ' + typeArray)
        }
    } else if (type === 'string') {
      ret.push(new Buffer(value, 'utf8'))
    } else if (type === 'bool') {
      ret.push(new Buffer(value ? '01' : '00', 'hex'))
    } else if (type === 'address') {
      ret.push(ethUtil.setLengthLeft(value, 20))
    } else if (type.startsWith('bytes')) {
      size = parseTypeN(type)
      if (size < 1 || size > 32) {
        throw new Error('Invalid bytes<N> width: ' + size)
      }

      ret.push(ethUtil.setLengthRight(value, size))
    } else if (type.startsWith('uint')) {
      size = parseTypeN(type)
      if ((size % 8) || (size < 8) || (size > 256)) {
        throw new Error('Invalid uint<N> width: ' + size)
      }

      num = parseNumber(value)
      ret.push(bufferAndLPad32BigNumber(num))
    } else if (type.startsWith('int')) {
      size = parseTypeN(type)
      if ((size % 8) || (size < 8) || (size > 256)) {
        throw new Error('Invalid int<N> width: ' + size)
      }

      num = parseNumber(value)
      ret.push(bufferAndLPad32BigNumber(num))
    } else {
      // FIXME: support all other types
      throw new Error('Unsupported or invalid type: ' + type)
    }
  }
  return Buffer.concat(ret)
}

export function soliditySHA3 (
  types: string[],
  values: any[],
): Buffer {
  return ethUtil.sha3(solidityPack(types, values))
}
