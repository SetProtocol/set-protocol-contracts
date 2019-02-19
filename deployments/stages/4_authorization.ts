import { DeploymentStageInterface } from '../../types/deployment_stage_interface';

import BigNumber from 'bignumber.js';

import { getNetworkName, getPrivateKey, getContractAddress, TX_DEFAULTS, writeStateToOutputs } from '../utils/blockchain';
import { CoreContract, VaultContract, TransferProxyContract, WhiteListContract, IssuanceOrderModuleContract } from '../../utils/contracts';
import { asyncForEach } from '../../utils/array';
import networkConstants from '../network-constants';
import constants from '../constants';

interface ExchangeMapping {
  name: string,
  key: number
}

export class AuthorizationStage implements DeploymentStageInterface {

  private _web3: any;
  private _networkName: string;
  private _deployerAccount: any;

  private _coreContract: CoreContract;
  private _vaultContract: VaultContract;
  private _transferProxyContract: TransferProxyContract;

  async deploy(web3: any): Promise<any> {
    console.log('Deploying authorizations...');

    this._web3 = web3;
    this._networkName = getNetworkName();
    this._deployerAccount = this._web3.eth.accounts.privateKeyToAccount(getPrivateKey());

    const coreAddress = await getContractAddress('Core');
    this._coreContract = await CoreContract.at(coreAddress, this._web3, {from: this._deployerAccount.address});

    const vaultAddress = await getContractAddress('Vault');
    this._vaultContract = await VaultContract.at(vaultAddress, this._web3, {from: this._deployerAccount.address});

    const transferProxyAddress = await getContractAddress('TransferProxy');
    this._transferProxyContract = await TransferProxyContract.at(transferProxyAddress, this._web3, {from: this._deployerAccount.address});

    const initialTimeLock = 0;
    const finalTimeLock = networkConstants.timeLockPeriod[this._networkName];

    await this.updateTimeLockPeriod(initialTimeLock);

    await this.addAuthorizedAddressesToVault([
      'Core',
      'ExchangeIssueModule',
      'IssuanceOrderModule',
      'RebalanceAuctionModule',
      'RebalancingTokenIssuanceModule'
    ]);

    await this.addAuthorizedAddressesToTransferProxy([
      'Core',
      'TakerWalletWrapper',
      'ExchangeIssueModule',
      'IssuanceOrderModule',
      'RebalanceAuctionModule',
      'RebalancingTokenIssuanceModule'
    ]);

    await this.registerCoreFactories([
      'SetTokenFactory',
      'RebalancingSetTokenFactory'
    ]);

    await this.registerCoreModules([
      'ExchangeIssueModule',
      'IssuanceOrderModule',
      'RebalanceAuctionModule',
      'RebalancingTokenIssuanceModule'
    ]);

    await this.registerCoreExchanges([
      { name: 'ZeroExExchangeWrapper', key: constants.EXCHANGES.ZERO_EX } as ExchangeMapping,
      { name: 'KyberNetworkWrapper', key: constants.EXCHANGES.KYBER } as ExchangeMapping,
      { name: 'TakerWalletWrapper', key: constants.EXCHANGES.TAKER_WALLET } as ExchangeMapping
    ]);

    await this.registerCorePriceCurves();

    await this.updateTimeLockPeriod(finalTimeLock);

    await writeStateToOutputs(this._networkName, 'last_deployment_stage', 4);
  }

  async addAuthorizedAddressesToVault(names: string[]) {
    const authorizedAddresses = await this._vaultContract.getAuthorizedAddresses.callAsync();
    await asyncForEach(names, async (name) => {
      const contractAddress = await getContractAddress(name);

      if (authorizedAddresses.includes(contractAddress)) {
        return;
      }

      console.log(`* Authorizing ${name} with Vault`);
      await this._vaultContract.addAuthorizedAddress.sendTransactionAsync(contractAddress);
    });
  }

  async addAuthorizedAddressesToTransferProxy(names: string[]) {
    const authorizedAddresses = await this._transferProxyContract.getAuthorizedAddresses.callAsync();
    await asyncForEach(names, async (name) => {
      const contractAddress = await getContractAddress(name);

      if (authorizedAddresses.includes(contractAddress)) {
        return;
      }

      console.log(`* Authorizing ${name} with TransferProxy`);
      await this._transferProxyContract.addAuthorizedAddress.sendTransactionAsync(contractAddress);
    });
  }

  async registerCoreFactories(names: string[]) {
    const factories = await this._coreContract.factories.callAsync();
    await asyncForEach(names, async (name) => {
      const contractAddress = await getContractAddress(name);

      if (factories.includes(contractAddress)) {
        return;
      }

      console.log(`* Register ${name} as Core Factory`);
      await this._coreContract.addFactory.sendTransactionAsync(contractAddress);
    });
  }

  async registerCoreModules(names: string[]) {
    const modules = await this._coreContract.modules.callAsync();
    await asyncForEach(names, async (name) => {
      const contractAddress = await getContractAddress(name);

      if (modules.includes(contractAddress)) {
        return;
      }

      console.log(`* Register ${name} as Core Module`);
      await this._coreContract.addModule.sendTransactionAsync(contractAddress);
    });
  }

  async registerCoreExchanges(items: ExchangeMapping[]) {
    await asyncForEach(items, async (item) => {
      const contractAddress = await getContractAddress(item.name);

      const exchanges = await this._coreContract.exchanges.callAsync();
      if (exchanges.includes(contractAddress) || !contractAddress) {
        return;
      }

      console.log(`* Register ${item.name} as Core Exchange`);
      await this._coreContract.addExchange.sendTransactionAsync(item.key, contractAddress);
    });
  }
  
  async registerCorePriceCurves() {
    const priceLibraries = await this._coreContract.priceLibraries.callAsync();
    const linearAuctionPriceCurveAddress = await getContractAddress('LinearAuctionPriceCurve');
    const constantAuctionPriceCurveAddress = await getContractAddress('ConstantAuctionPriceCurve');

    if (networkConstants.linearAuctionPriceCurve[this._networkName] && 
      !priceLibraries.includes(linearAuctionPriceCurveAddress)
    ) {
      console.log('* Adding Linear Auction Price Curve');
      await this._coreContract.addPriceLibrary.sendTransactionAsync(linearAuctionPriceCurveAddress);
    }

    if (networkConstants.constantsAuctionPriceCurve[this._networkName] &&
      !priceLibraries.includes(constantAuctionPriceCurveAddress)
    ) {
      console.log('* Adding Constant Auction Price Curve');
      await this._coreContract.addPriceLibrary.sendTransactionAsync(constantAuctionPriceCurveAddress);
    }
  }

  async updateTimeLockPeriod(period: number) {
    const bigNumberPeriod = new BigNumber(period);

    const whiteListAddress = await getContractAddress('WhiteList');
    const issuanceOrderModuleAddress = await getContractAddress('IssuanceOrderModule');

    const whiteListContract = await WhiteListContract.at(whiteListAddress, this._web3, {from: this._deployerAccount.address});
    const issuanceOrderModuleContract = await IssuanceOrderModuleContract.at(issuanceOrderModuleAddress, this._web3, {from: this._deployerAccount.address});

    console.log('* Updating WhiteList time lock');
    await whiteListContract.setTimeLockPeriod.sendTransactionAsync(bigNumberPeriod, TX_DEFAULTS);

    console.log('* Updating Issuance Order Module time lock');
    await issuanceOrderModuleContract.setTimeLockPeriod.sendTransactionAsync(bigNumberPeriod);

    console.log('* Updating Core time lock');
    await this._coreContract.setTimeLockPeriod.sendTransactionAsync(bigNumberPeriod);

    console.log('* Updating Transfer Proxy time lock');
    await this._transferProxyContract.setTimeLockPeriod.sendTransactionAsync(bigNumberPeriod);

    console.log('* Updating Vault time lock');
    await this._vaultContract.setTimeLockPeriod.sendTransactionAsync(bigNumberPeriod);
  
  }

}