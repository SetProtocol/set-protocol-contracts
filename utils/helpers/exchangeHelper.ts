import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';

import {
  CoreContract,
  KyberNetworkWrapperContract,
  TransferProxyContract,
  ZeroExExchangeWrapperContract,
}  from '../contracts';

import { DEFAULT_GAS } from '../constants';
import { getContractInstance, linkLibrariesToDeploy } from '../web3Helper';

import { CoreHelper } from './coreHelper';

const ERC20Wrapper = artifacts.require('ERC20Wrapper');
const KyberNetworkWrapper = artifacts.require('KyberNetworkWrapper');
const ZeroExExchangeWrapper = artifacts.require('ZeroExExchangeWrapper');
const { SetProtocolUtils: SetUtils } = setProtocolUtils;


export class ExchangeHelper {
  private _contractOwnerAddress: Address;
  private _coreHelper: CoreHelper;

  constructor(contractOwnerAddress: Address) {
    this._contractOwnerAddress = contractOwnerAddress;
    this._coreHelper = new CoreHelper(this._contractOwnerAddress, this._contractOwnerAddress);
  }

  /* ============ Deployment ============ */

  public async deployKyberNetworkWrapper(
    core: Address,
    kyberNetworkProxy: Address,
    transferProxy: TransferProxyContract,
    from: Address = this._contractOwnerAddress
  ): Promise<KyberNetworkWrapperContract> {
    await linkLibrariesToDeploy(KyberNetworkWrapper, [ERC20Wrapper], this._contractOwnerAddress);

    const kyberNetworkWrapperInstance = await KyberNetworkWrapper.new(
      core,
      kyberNetworkProxy,
      transferProxy.address,
      { from, gas: DEFAULT_GAS },
    );

    return new KyberNetworkWrapperContract(
      getContractInstance(kyberNetworkWrapperInstance),
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

    await this._coreHelper.addExchange(core, SetUtils.EXCHANGES.KYBER, kyberNetworkWrapper.address);

    return kyberNetworkWrapper;
  }

  public async deployZeroExExchangeWrapper(
    core: Address,
    zeroExExchange: Address,
    zeroExProxy: Address,
    zeroExTokenAddress: Address,
    transferProxy: TransferProxyContract,
    from: Address = this._contractOwnerAddress
  ): Promise<ZeroExExchangeWrapperContract> {
    await linkLibrariesToDeploy(ZeroExExchangeWrapper, [ERC20Wrapper], this._contractOwnerAddress);

    const zeroExExchangeWrapperInstance = await ZeroExExchangeWrapper.new(
      core,
      zeroExExchange,
      zeroExProxy,
      zeroExTokenAddress,
      transferProxy.address,
      { from, gas: DEFAULT_GAS },
    );

    return new ZeroExExchangeWrapperContract(
      getContractInstance(zeroExExchangeWrapperInstance),
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

    await this._coreHelper.addExchange(core, SetUtils.EXCHANGES.ZERO_EX, zeroExExchangeWrapper.address);

    return zeroExExchangeWrapper;
  }
}
