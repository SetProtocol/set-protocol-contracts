import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';

import {
  CoreContract,
  KyberNetworkWrapperContract,
  TakerWalletWrapperContract,
  TransferProxyContract,
  ZeroExExchangeWrapperContract,
}  from '../contracts';

import { DEFAULT_GAS } from '../constants';
import {
  getWeb3,
} from '../web3Helper';

import { CoreWrapper } from './coreWrapper';

const web3 = getWeb3();
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
      new web3.eth.Contract(kyberNetworkWrapperInstance.abi, kyberNetworkWrapperInstance.address),
      { from },
    );
  }

  public async deployAndAuthorizeKyberNetworkWrapper(
    core: CoreContract,
    kyberNetworkProxy: Address,
    transferProxy: TransferProxyContract,
    from: Address = this._contractOwnerAddress
  ): Promise<KyberNetworkWrapperContract> {
    const kyberNetworkWrapper = await this.deployKyberNetworkWrapper(
      core.address,
      kyberNetworkProxy,
      transferProxy
    );

    await this._coreWrapper.addExchange(core, SetUtils.EXCHANGES.KYBER, kyberNetworkWrapper.address);

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
      new web3.eth.Contract(takerWalletWrapperInstance.abi, takerWalletWrapperInstance.address),
      { from },
    );
  }

  public async deployAndAuthorizeTakerWalletExchangeWrapper(
    core: CoreContract,
    transferProxy: TransferProxyContract,
    from: Address = this._contractOwnerAddress
  ): Promise<TakerWalletWrapperContract> {
    const takerWalletWrapper = await this.deployTakerWalletExchangeWrapper(
      core.address,
      transferProxy,
      from
    );

    await this._coreWrapper.addExchange(core, SetUtils.EXCHANGES.TAKER_WALLET, takerWalletWrapper.address);
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
      new web3.eth.Contract(zeroExExchangeWrapperInstance.abi, zeroExExchangeWrapperInstance.address),
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

    await this._coreWrapper.addExchange(core, SetUtils.EXCHANGES.ZERO_EX, zeroExExchangeWrapper.address);

    return zeroExExchangeWrapper;
  }
}
