import { Address } from 'set-protocol-utils';

import { TakerWalletWrapperContract } from '../types/generated/taker_wallet_wrapper';
import { TransferProxyContract } from '../types/generated/transfer_proxy';
import { ZeroExExchangeWrapperContract } from '../types/generated/zero_ex_exchange_wrapper';

import { DEFAULT_GAS } from './constants';

const ERC20Wrapper = artifacts.require('ERC20Wrapper');
const TakerWalletWrapper = artifacts.require('TakerWalletWrapper');
const ZeroExExchangeWrapper = artifacts.require('ZeroExExchangeWrapper');


export class ExchangeWrapper {
  private _contractOwnerAddress: Address;
  private _truffleERC20Wrapper: any;

  constructor(contractOwnerAddress: Address) {
    this._contractOwnerAddress = contractOwnerAddress;
  }

  /* ============ Deployment ============ */

  public async deployTakerWalletExchangeWrapper(
    transferProxy: TransferProxyContract,
    from: Address = this._contractOwnerAddress
  ): Promise<TakerWalletWrapperContract> {
    if (!this._truffleERC20Wrapper) {
      this._truffleERC20Wrapper = await ERC20Wrapper.new(
        { from },
      );
    }

    await TakerWalletWrapper.link('ERC20Wrapper', this._truffleERC20Wrapper.address);
    const takerWalletWrapperInstance = await TakerWalletWrapper.new(
      transferProxy.address,
      { from, gas: DEFAULT_GAS },
    );

    return new TakerWalletWrapperContract(
      web3.eth.contract(takerWalletWrapperInstance.abi).at(takerWalletWrapperInstance.address),
      { from },
    );
  }

  public async deployZeroExExchangeWrapper(
    zeroExExchange: Address,
    zeroExProxy: Address,
    transferProxy: TransferProxyContract,
    from: Address = this._contractOwnerAddress
  ): Promise<ZeroExExchangeWrapperContract> {
    const zeroExExchangeWrapperInstance = await ZeroExExchangeWrapper.new(
      zeroExExchange,
      zeroExProxy,
      transferProxy.address,
      { from, gas: DEFAULT_GAS },
    );

    return new ZeroExExchangeWrapperContract(
      web3.eth.contract(zeroExExchangeWrapperInstance.abi).at(zeroExExchangeWrapperInstance.address),
      { from },
    );
  }
}
