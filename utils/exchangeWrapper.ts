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
    core: Address,
    kyberNetworkProxy: Address,
    transferProxy: TransferProxyContract,
    from: Address = this._contractOwnerAddress
  ): Promise<KyberNetworkWrapperContract> {
    const truffleERC20Wrapper = await ERC20Wrapper.new(
      { from },
    );

    await KyberNetworkWrapper.link('ERC20Wrapper', truffleERC20Wrapper.address);
    const kyberNetworkWrapperInstance = await KyberNetworkWrapper.new(
      core,
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
    core: CoreContract,
    kyberNetworkProxy: Address,
    transferProxy: TransferProxyContract,
    from: Address = this._contractOwnerAddress
  ): Promise<KyberNetworkWrapperContract> {
    const kyberNetworkWrapper = await this.deployKyberNetworkWrapper(core.address, kyberNetworkProxy, transferProxy);

    await this._coreWrapper.registerExchange(core, SetUtils.EXCHANGES.KYBER, kyberNetworkWrapper.address);

    return kyberNetworkWrapper;
  }

  public async deployTakerWalletExchangeWrapper(
    core: Address,
    transferProxy: TransferProxyContract,
    from: Address = this._contractOwnerAddress
  ): Promise<TakerWalletWrapperContract> {
    const truffleERC20Wrapper = await ERC20Wrapper.new(
      { from },
    );

    await TakerWalletWrapper.link('ERC20Wrapper', truffleERC20Wrapper.address);
    const takerWalletWrapperInstance = await TakerWalletWrapper.new(
      core,
      transferProxy.address,
      { from, gas: DEFAULT_GAS },
    );

    return new TakerWalletWrapperContract(
      web3.eth.contract(takerWalletWrapperInstance.abi).at(takerWalletWrapperInstance.address),
      { from },
    );
  }

  public async deployAndAuthorizeTakerWalletExchangeWrapper(
    core: CoreContract,
    transferProxy: TransferProxyContract,
    from: Address = this._contractOwnerAddress
  ): Promise<TakerWalletWrapperContract> {
    const takerWalletWrapper = await this.deployTakerWalletExchangeWrapper(core.address, transferProxy, from);

    await this._coreWrapper.registerExchange(core, SetUtils.EXCHANGES.TAKER_WALLET, takerWalletWrapper.address);
    await this._coreWrapper.addAuthorizationAsync(transferProxy, takerWalletWrapper.address);

    return takerWalletWrapper;
  }

  public async deployZeroExExchangeWrapper(
    core: Address,
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
      core,
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
    core: CoreContract,
    zeroExExchange: Address,
    zeroExProxy: Address,
    zeroExTokenAddress: Address,
    transferProxy: TransferProxyContract,
    from: Address = this._contractOwnerAddress
  ): Promise<ZeroExExchangeWrapperContract> {
    const zeroExExchangeWrapper = await this.deployZeroExExchangeWrapper(
      core.address,
      zeroExExchange,
      zeroExProxy,
      zeroExTokenAddress,
      transferProxy,
      from
    );

    await this._coreWrapper.registerExchange(core, SetUtils.EXCHANGES.ZERO_EX, zeroExExchangeWrapper.address);

    return zeroExExchangeWrapper;
  }
}
