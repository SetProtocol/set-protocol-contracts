import * as _ from "lodash";
import Web3 from "web3";
import { BigNumber } from "bignumber.js";
import Contract from "web3/eth/contract";
import { ABIDefinition } from "web3/eth/abi";
import { Tx } from "web3/eth/types";

export const CONTRACT_WRAPPER_ERRORS = {
  CONTRACT_NOT_FOUND_ON_NETWORK: (contractName: string, networkId: number) =>
  `Unable to find address for contract ${contractName} on network with id ${networkId}`,
};

export class BaseContract {
  public address: string;
  public abi: ABIDefinition[];

  public web3ContractInstance: Contract;

  protected defaults: Tx;

  constructor(web3ContractInstance: Contract, defaults: Tx) {
    this.web3ContractInstance = web3ContractInstance;
    this.address = web3ContractInstance.options.address;
    this.abi = web3ContractInstance.options.jsonInterface;
    this.defaults = defaults;
  }

  protected formatABIDataItem(type: string, components: any, value: any): any {
    const trailingArrayRegex = /\[\d*\]$/;
    if (type.match(trailingArrayRegex)) {
      const arrayItemType = type.replace(trailingArrayRegex, '');
      return _.map(value, val => (
        this.formatABIDataItem(arrayItemType, components, val)
      ));
    } else if (type === 'tuple') {
      const formattedTuple: { [componentName: string]: any } = {};
      _.forEach(components, componentABI => {
        formattedTuple[componentABI.name] = this.formatABIDataItem(
          componentABI.type,
          componentABI.components,
          value[componentABI.name],
        );
      });
      return formattedTuple;
    } else {
      return type.match(/^u?int\d*$/) ? value.toString() : value;
    }
  }

  protected async applyDefaultsToTxDataAsync<T extends Tx>(
    txData: T,
    estimateGasAsync?: (txData: T) => Promise<number>,
  ): Promise<Tx> {
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
      txDataWithDefaults.gas = new BigNumber(estimatedGas).toNumber();
    }
    return txDataWithDefaults;
  }
}
