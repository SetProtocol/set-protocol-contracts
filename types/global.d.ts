import Web3 from "web3";
import { Address, UInt } from "set-protocol-utils";

declare type ContractTest = (accounts: Address[]) => void;
declare type ExecutionBlock = () => void;
declare type AsyncExecutionBlock = (done: () => void) => void;

interface Artifacts {
    require(name: string): any;
}

declare global {
    function contract(name: string, test: ContractTest): void;

    var artifacts: Artifacts;
    var web3: Web3;

    var chaiIsConfigured: boolean;
}
