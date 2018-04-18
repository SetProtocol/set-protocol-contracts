declare module "abi-decoder" {
    import * as Web3 from "web3";

    interface DecodedLog {
        name: string;
        events: DecodedMethodParam[];
        address: string;
    }

    interface DecodedMethodParam {
        name: string;
        value: string | boolean;
        type: string;
    }

    interface DecodedMethod {
        name: string;
        params: DecodedMethodParam[];
    }

    export function addABI(abi: any[]): void;
    export function removeABI(abi: any[]): void;
    export function decodeLogs(logs: any[]): DecodedLog[];
    export function decodeMethod(data: string): DecodedMethod;
}
