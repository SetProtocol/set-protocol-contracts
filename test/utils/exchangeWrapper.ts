import * as _ from "lodash";

import { TakerWalletWrapperContract } from "../../types/generated/taker_wallet_wrapper";
import { TransferProxyContract } from "../../types/generated/transfer_proxy";
import { VaultContract } from "../../types/generated/vault";

import { BigNumber } from "bignumber.js";
import { Address } from "../../types/common.js";
import { DEFAULT_GAS } from "../utils/constants";

const TakerWalletWrapper = artifacts.require("TakerWalletWrapper");


export class ExchangeWrapper {
  private _contractOwnerAddress: Address;

  constructor(contractOwnerAddress: Address) {
    this._contractOwnerAddress = contractOwnerAddress;
  }

  /* ============ Deployment ============ */

  public async deployTakerWalletExchangeWrapper(
    vault: VaultContract,
    transferProxy: TransferProxyContract,
    from: Address = this._contractOwnerAddress
  ): Promise<TakerWalletWrapperContract> {
    const takerWalletWrapperInstance = await TakerWalletWrapper.new(
      transferProxy.address,
      vault.address,
      { from, gas: DEFAULT_GAS },
    );

    return new TakerWalletWrapperContract(
      web3.eth.contract(takerWalletWrapperInstance.abi).at(takerWalletWrapperInstance.address),
      { from },
    );
  }
}
