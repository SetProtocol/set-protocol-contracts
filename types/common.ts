import BN = require("bn.js");

export interface TxData {
    from?: string;
    gas?: number;
    gasPrice?: BN;
    nonce?: number;
}

export interface TxDataPayable extends TxData {
    value?: BN;
}

export interface Log {
    event: string;
    args: object;
}

export type Address = string;
export type UInt = number | BN;
export type Bytes32 = string;
