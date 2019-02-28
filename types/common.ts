import { BigNumber } from "bignumber.js";
import { UInt } from 'set-protocol-utils';
import * as _ from "lodash";

export const classUtils = {
    // This is useful for classes that have nested methods. Nested methods don't get bound out of the box.
    bindAll(self: any, exclude: string[] = ["contructor"], thisArg?: any): void {
        for (const key of Object.getOwnPropertyNames(self)) {
            const val = self[key];
            if (!_.includes(exclude, key)) {
                if (_.isFunction(val)) {
                    self[key] = val.bind(thisArg || self);
                } else if (_.isObject(val)) {
                    classUtils.bindAll(val, exclude, self);
                }
            }
        }
        return self;
    },
};

export enum SolidityTypes {
    Address = 'address',
    Uint256 = 'uint256',
    Uint8 = 'uint8',
    Uint = 'uint',
    AddressArray = 'address[]',
    UintArray = 'uint256[]'
}
