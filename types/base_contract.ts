import * as _ from "lodash";
import * as Web3 from "web3";
import { TxData, TxDataPayable } from "./common";

export const CONTRACT_WRAPPER_ERRORS = {
  CONTRACT_NOT_FOUND_ON_NETWORK: (contractName: string, networkId: number) =>
    `Unable to find address for contract ${contractName} on network with id ${networkId}`,
};

export class BaseContract {
    public address: string;
    public abi: any[];
    // public abi: Web3.AbiDefinition[];

    public web3ContractInstance: Web3.ContractInstance;

    protected defaults: Partial<TxData>;

    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>) {
        this.web3ContractInstance = web3ContractInstance;
        this.address = web3ContractInstance.address;
        this.abi = web3ContractInstance.abi;
        this.defaults = defaults;
    }

    protected async applyDefaultsToTxDataAsync<T extends TxData | TxDataPayable>(
        txData: T,
        estimateGasAsync?: (txData: T) => Promise<number>,
    ): Promise<TxData> {
        // Gas amount sourced with the following priorities:
        // 1. Optional param passed in to public method call
        // 2. Global config passed in at library instantiation
        // 3. Gas estimate calculation + safety margin
        const removeUndefinedProperties = _.pickBy;
        const txDataWithDefaults = {
            ...removeUndefinedProperties(this.defaults),
            ...removeUndefinedProperties(txData as any),
            // HACK: TS can't prove that T is spreadable.
            // Awaiting https://github.com/Microsoft/TypeScript/pull/13288 to be merged
        };
        if (_.isUndefined(txDataWithDefaults.gas) && !_.isUndefined(estimateGasAsync)) {
            const estimatedGas = await estimateGasAsync(txData);
            txDataWithDefaults.gas = estimatedGas;
        }
        return txDataWithDefaults;
    }
}
