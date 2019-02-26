/*
  Copyright 2018 Set Labs Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

'use strict';

import * as _ from 'lodash';
import * as ethUtil from 'ethereumjs-util';
import { hashObject, hashString } from './encoding';
import {
  Bytes,
  SolidityTypes,
} from './types';
import { constants } from './constants';
const { EIP712 } = constants;

export function getEIP712DomainSeparatorSchemaHash(): string {
  const domainSeparatorBody = [
    { value: 'EIP712Domain(', type: SolidityTypes.String },
    { value: 'string name,', type: SolidityTypes.String },
    { value: 'string version,', type: SolidityTypes.String },
    { value: ')', type: SolidityTypes.String },
  ];

  const types = _.map(domainSeparatorBody, order => order.type);
  const values = _.map(domainSeparatorBody, order => order.value);
  const domainHash: Buffer = hashObject(types, values);

  return ethUtil.bufferToHex(domainHash);
}

export function getEIP712DomainHash(): string {
  const domainSeparatorBody = [
    { value: getEIP712DomainSeparatorSchemaHash(), type: SolidityTypes.Bytes32 },
    { value: ethUtil.bufferToHex(hashString(EIP712.DOMAIN_NAME)), type: SolidityTypes.Bytes32 },
    { value: ethUtil.bufferToHex(hashString(EIP712.DOMAIN_VERSION)), type: SolidityTypes.Bytes32 },
  ];

  const types = _.map(domainSeparatorBody, order => order.type);
  const values = _.map(domainSeparatorBody, order => order.value);
  const domainHash: Buffer = hashObject(types, values);

  return ethUtil.bufferToHex(domainHash);
}

export function generateEIP712MessageHash(hashStruct: Bytes): string {
  const messageBody = [
    { value: EIP712.EIP191_HEADER, type: SolidityTypes.String },
    { value: getEIP712DomainHash(), type: SolidityTypes.Bytes32 },
    { value: hashStruct, type: SolidityTypes.Bytes32 },
  ];

  const types = _.map(messageBody, order => order.type);
  const values = _.map(messageBody, order => order.value);
  const messageHash: Buffer = hashObject(types, values);

  return ethUtil.bufferToHex(messageHash);
}
