import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';

import {
  CoreContract,
  TakerWalletWrapperContract,
  TransferProxyContract,
  ZeroExExchangeWrapperContract,
}  from '../utils/contracts';

import { CoreWrapper } from './coreWrapper';
import { DEFAULT_GAS } from './constants';

const ERC20Wrapper = artifacts.require('ERC20Wrapper');
const TakerWalletWrapper = artifacts.require('TakerWalletWrapper');
const ZeroExExchangeWrapper = artifacts.require('ZeroExExchangeWrapper');
const { SetProtocolUtils: SetUtils } = setProtocolUtils;


export class ExchangeWrapper {
  private _contractOwnerAddress: Address;
  private _coreWrapper: CoreWrapper;

  private _truffleERC20Wrapper: any;

  constructor(contractOwnerAddress: Address) {
    this._contractOwnerAddress = contractOwnerAddress;
    this._coreWrapper = new CoreWrapper(this._contractOwnerAddress, this._contractOwnerAddress);
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

  public async deployAndAuthorizeTakerWalletExchangeWrapper(
    transferProxy: TransferProxyContract,
    core: CoreContract,
    from: Address = this._contractOwnerAddress
  ): Promise<TakerWalletWrapperContract> {
    const takerWalletWrapper = await this.deployTakerWalletExchangeWrapper(transferProxy, from);

    await this._coreWrapper.registerExchange(core, SetUtils.EXCHANGES.TAKER_WALLET, takerWalletWrapper.address);
    await this._coreWrapper.addAuthorizationAsync(takerWalletWrapper, core.address);
    await this._coreWrapper.addAuthorizationAsync(transferProxy, takerWalletWrapper.address);

    return takerWalletWrapper;
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

  public async deployAndAuthorizeZeroExExchangeWrapper(
    zeroExExchange: Address,
    zeroExProxy: Address,
    transferProxy: TransferProxyContract,
    core: CoreContract,
    from: Address = this._contractOwnerAddress
  ): Promise<ZeroExExchangeWrapperContract> {
    const zeroExExchangeWrapper = await this.deployZeroExExchangeWrapper(zeroExExchange, zeroExProxy, transferProxy);

    await this._coreWrapper.registerExchange(core, SetUtils.EXCHANGES.ZERO_EX, zeroExExchangeWrapper.address);
    await this._coreWrapper.addAuthorizationAsync(zeroExExchangeWrapper, core.address);

    return zeroExExchangeWrapper;
  }
}
