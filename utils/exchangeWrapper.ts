import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';

import {
  CoreContract,
  KyberNetworkWrapperContract,
  TakerWalletWrapperContract,
  TransferProxyContract,
  ZeroExExchangeWrapperContract,
}  from '../utils/contracts';

import { CoreWrapper } from './coreWrapper';
import { DEFAULT_GAS } from './constants';

const ERC20Wrapper = artifacts.require('ERC20Wrapper');
const KyberNetworkWrapper = artifacts.require('KyberNetworkWrapper');
const TakerWalletWrapper = artifacts.require('TakerWalletWrapper');
const ZeroExExchangeWrapper = artifacts.require('ZeroExExchangeWrapper');
const { SetProtocolUtils: SetUtils } = setProtocolUtils;


export class ExchangeWrapper {
  private _contractOwnerAddress: Address;
  private _coreWrapper: CoreWrapper;

  constructor(contractOwnerAddress: Address) {
    this._contractOwnerAddress = contractOwnerAddress;
    this._coreWrapper = new CoreWrapper(this._contractOwnerAddress, this._contractOwnerAddress);
  }

  /* ============ Deployment ============ */

  public async deployKyberNetworkWrapper(
    kyberNetworkProxy: Address,
    transferProxy: TransferProxyContract,
    from: Address = this._contractOwnerAddress
  ): Promise<KyberNetworkWrapperContract> {
    const truffleERC20Wrapper = await ERC20Wrapper.new(
      { from },
    );

    await KyberNetworkWrapper.link('ERC20Wrapper', truffleERC20Wrapper.address);
    const kyberNetworkWrapperInstance = await KyberNetworkWrapper.new(
      kyberNetworkProxy,
      transferProxy.address,
      { from, gas: DEFAULT_GAS },
    );

    return new KyberNetworkWrapperContract(
      web3.eth.contract(kyberNetworkWrapperInstance.abi).at(kyberNetworkWrapperInstance.address),
      { from },
    );
  }

  public async deployAndAuthorizeKyberNetworkWrapper(
    kyberNetworkProxy: Address,
    transferProxy: TransferProxyContract,
    core: CoreContract,
    from: Address = this._contractOwnerAddress
  ): Promise<KyberNetworkWrapperContract> {
    const kyberNetworkWrapper = await this.deployKyberNetworkWrapper(kyberNetworkProxy, transferProxy);

    await this._coreWrapper.registerExchange(core, SetUtils.EXCHANGES.KYBER, kyberNetworkWrapper.address);
    await this._coreWrapper.addAuthorizationAsync(kyberNetworkWrapper, core.address);

    return kyberNetworkWrapper;
  }

  public async deployTakerWalletExchangeWrapper(
    transferProxy: TransferProxyContract,
    from: Address = this._contractOwnerAddress
  ): Promise<TakerWalletWrapperContract> {
    const truffleERC20Wrapper = await ERC20Wrapper.new(
      { from },
    );

    await TakerWalletWrapper.link('ERC20Wrapper', truffleERC20Wrapper.address);
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
    zeroExTokenAddress: Address,
    transferProxy: TransferProxyContract,
    from: Address = this._contractOwnerAddress
  ): Promise<ZeroExExchangeWrapperContract> {
    const truffleERC20Wrapper = await ERC20Wrapper.new(
      { from },
    );

    await ZeroExExchangeWrapper.link('ERC20Wrapper', truffleERC20Wrapper.address);
    const zeroExExchangeWrapperInstance = await ZeroExExchangeWrapper.new(
      zeroExExchange,
      zeroExProxy,
      zeroExTokenAddress,
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
    zeroExTokenAddress: Address,
    transferProxy: TransferProxyContract,
    core: CoreContract,
    from: Address = this._contractOwnerAddress
  ): Promise<ZeroExExchangeWrapperContract> {
    const zeroExExchangeWrapper = await this.deployZeroExExchangeWrapper(
      zeroExExchange,
      zeroExProxy,
      zeroExTokenAddress,
      transferProxy
    );

    await this._coreWrapper.registerExchange(core, SetUtils.EXCHANGES.ZERO_EX, zeroExExchangeWrapper.address);
    await this._coreWrapper.addAuthorizationAsync(zeroExExchangeWrapper, core.address);

    return zeroExExchangeWrapper;
  }
}
