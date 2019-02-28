declare module "abi-decoder" {
    import Web3 from "web3";

    export interface DecodedLog {
        name: string;
        events: DecodedMethodParam[];
        address: string;
    }

    export interface DecodedMethodParam {
        name: string;
        value: string | boolean;
        type: string;
    }

    export interface DecodedMethod {
        name: string;
        params: DecodedMethodParam[];
    }

    export function addABI(abi: any[]): void;
    export function removeABI(abi: any[]): void;
    export function decodeLogs(logs: any[]): DecodedLog[];
    export function decodeMethod(data: string): DecodedMethod;
}
declare module "sol-trace-set";
