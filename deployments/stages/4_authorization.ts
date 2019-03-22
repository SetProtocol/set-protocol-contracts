import { DeploymentStageInterface } from '../../types/deployment_stage_interface';

import BigNumber from 'bignumber.js';

import { getNetworkConstant, getContractAddress, getPrivateKey } from '../utils/output-helper';
import { TX_DEFAULTS, executeTransaction } from '../utils/blockchain';

import {
  CoreContract,
  VaultContract,
  TransferProxyContract,
  WhiteListContract,
} from '../../utils/contracts';

import { Core } from '../../artifacts/ts/Core';
import { ExchangeIssuanceModule } from '../../artifacts/ts/ExchangeIssuanceModule';
import { KyberNetworkWrapper } from '../../artifacts/ts/KyberNetworkWrapper';
import { LinearAuctionPriceCurve } from '../../artifacts/ts/LinearAuctionPriceCurve';
import { RebalancingSetExchangeIssuanceModule } from '../../artifacts/ts/RebalancingSetExchangeIssuanceModule';
import { RebalanceAuctionModule } from '../../artifacts/ts/RebalanceAuctionModule';
import { RebalancingSetTokenFactory } from '../../artifacts/ts/RebalancingSetTokenFactory';
import { RebalancingTokenIssuanceModule } from '../../artifacts/ts/RebalancingTokenIssuanceModule';
import { SetTokenFactory } from '../../artifacts/ts/SetTokenFactory';
import { TransferProxy } from '../../artifacts/ts/TransferProxy';
import { Vault } from '../../artifacts/ts/Vault';
import { ZeroExExchangeWrapper } from '../../artifacts/ts/ZeroExExchangeWrapper';
import { WhiteList } from '../../artifacts/ts/WhiteList';

import { asyncForEach } from '../../utils/array';
import networkConstants from '../network-constants';
import constants from '../constants';

interface ExchangeMapping {
  name: string;
  key: number;
}

export class AuthorizationStage implements DeploymentStageInterface {

  private _web3: any;
  private _networkConstant: string;
  private _deployerAccount: any;

  private _coreContract: CoreContract;
  private _vaultContract: VaultContract;
  private _transferProxyContract: TransferProxyContract;

  async deploy(web3: any): Promise<any> {
    console.log('Deploying authorizations...');

    this._web3 = web3;
    this._networkConstant = getNetworkConstant();
    this._deployerAccount = this._web3.eth.accounts.privateKeyToAccount(getPrivateKey());

    this._web3.eth.accounts.wallet.add(this._deployerAccount);
    this._web3.eth.defaultAccount = this._deployerAccount.address;

    const coreAddress = await getContractAddress(Core.contractName);
    this._coreContract = await CoreContract.at(
      coreAddress,
      this._web3,
      {from: this._deployerAccount.address}
    );

    const vaultAddress = await getContractAddress(Vault.contractName);
    this._vaultContract = await VaultContract.at(
      vaultAddress, this._web3, {from: this._deployerAccount.address}
    );

    const transferProxyAddress = await getContractAddress(TransferProxy.contractName);
    this._transferProxyContract = await TransferProxyContract.at(
      transferProxyAddress,
      this._web3,
      {from: this._deployerAccount.address}
    );

    const finalTimeLock = networkConstants.generalTimeLockPeriod[this._networkConstant];

    await this.addAuthorizedAddressesToVault([Core.contractName]);
    await this.addAuthorizedAddressesToTransferProxy([Core.contractName]);

    await this.registerCoreFactories([
      SetTokenFactory.contractName,
      RebalancingSetTokenFactory.contractName,
    ]);

    await this.registerCoreModules([
      ExchangeIssuanceModule.contractName,
      RebalancingSetExchangeIssuanceModule.contractName,
      RebalanceAuctionModule.contractName,
      RebalancingTokenIssuanceModule.contractName,
    ]);

    await this.registerCoreExchanges([
      { name: ZeroExExchangeWrapper.contractName, key: constants.EXCHANGES.ZERO_EX } as ExchangeMapping,
      { name: KyberNetworkWrapper.contractName, key: constants.EXCHANGES.KYBER } as ExchangeMapping,
    ]);

    await this.registerCorePriceCurves();

    await this.updateTimeLockPeriod(finalTimeLock);
  }

  async addAuthorizedAddressesToVault(names: string[]) {
    const authorizedAddresses = await this._vaultContract.getAuthorizedAddresses.callAsync();
    await asyncForEach(names, async name => {
      const contractAddress = await getContractAddress(name);

      if (authorizedAddresses.includes(contractAddress)) {
        return;
      }

      console.log(`* Authorizing ${name} with Vault`);
      const data = this._vaultContract.addAuthorizedAddress.getABIEncodedTransactionData(contractAddress);
      await executeTransaction(data, this._vaultContract.address, this._web3);
    });

    console.log('* Updating Vault time lock');
    const period = networkConstants.vaultTimeLockPeriod[this._networkConstant];
    const bigNumberPeriod = new BigNumber(period);
    const vaultData =  this._vaultContract
                        .setTimeLockPeriod
                        .getABIEncodedTransactionData(bigNumberPeriod);

    await executeTransaction(vaultData, this._vaultContract.address, this._web3);    
  }

  async addAuthorizedAddressesToTransferProxy(names: string[]) {
    const authorizedAddresses = await this._transferProxyContract.getAuthorizedAddresses.callAsync();
    await asyncForEach(names, async name => {
      const contractAddress = await getContractAddress(name);

      if (authorizedAddresses.includes(contractAddress)) {
        return;
      }

      console.log(`* Authorizing ${name} with TransferProxy`);
      const data = this._transferProxyContract.addAuthorizedAddress.getABIEncodedTransactionData(contractAddress);
      await executeTransaction(data, this._transferProxyContract.address, this._web3);
    });

    console.log('* Updating Transfer Proxy time lock');
    const period = networkConstants.transferProxyTimeLockPeriod[this._networkConstant];
    const bigNumberPeriod = new BigNumber(period);
    const transferProxyData = this._transferProxyContract
                              .setTimeLockPeriod
                              .getABIEncodedTransactionData(bigNumberPeriod);

    await executeTransaction(transferProxyData, this._transferProxyContract.address, this._web3);
  }

  async registerCoreFactories(names: string[]) {
    const factories = await this._coreContract.factories.callAsync();
    await asyncForEach(names, async name => {
      const contractAddress = await getContractAddress(name);

      if (factories.includes(contractAddress)) {
        return;
      }

      console.log(`* Register ${name} as Core Factory`);
      const data = this._coreContract.addFactory.getABIEncodedTransactionData(contractAddress);
      await executeTransaction(data, this._coreContract.address, this._web3);
    });
  }

  async registerCoreModules(names: string[]) {
    const modules = await this._coreContract.modules.callAsync();
    await asyncForEach(names, async name => {
      const contractAddress = await getContractAddress(name);

      if (modules.includes(contractAddress)) {
        return;
      }

      console.log(`* Register ${name} as Core Module`);
      const data = this._coreContract.addModule.getABIEncodedTransactionData(contractAddress);
      await executeTransaction(data, this._coreContract.address, this._web3);
    });
  }

  async registerCoreExchanges(items: ExchangeMapping[]) {
    await asyncForEach(items, async item => {
      const contractAddress = await getContractAddress(item.name);

      const exchanges = await this._coreContract.exchanges.callAsync();
      if (exchanges.includes(contractAddress) || !contractAddress) {
        return;
      }

      console.log(`* Register ${item.name} as Core Exchange`);
      const data = this._coreContract.addExchange.getABIEncodedTransactionData(item.key, contractAddress);
      await executeTransaction(data, this._coreContract.address, this._web3);
    });
  }

  async registerCorePriceCurves() {
    const priceLibraries = await this._coreContract.priceLibraries.callAsync();
    const linearAuctionPriceCurveAddress = await getContractAddress(LinearAuctionPriceCurve.contractName);

    if (networkConstants.linearAuctionPriceCurve[this._networkConstant] &&
      !priceLibraries.includes(linearAuctionPriceCurveAddress)
    ) {
      console.log('* Adding Linear Auction Price Curve');
      const data = this._coreContract.addPriceLibrary.getABIEncodedTransactionData(linearAuctionPriceCurveAddress);
      await executeTransaction(data, this._coreContract.address, this._web3);
    }
  }

  async updateTimeLockPeriod(period: number) {
    const bigNumberPeriod = new BigNumber(period);

    const whiteListAddress = await getContractAddress(WhiteList.contractName);

    const whiteListContract = await WhiteListContract.at(
      whiteListAddress,
      this._web3,
      {from: this._deployerAccount.address}
    );

    console.log('* Updating WhiteList time lock');
    const whiteListData = whiteListContract
                          .setTimeLockPeriod
                          .getABIEncodedTransactionData(bigNumberPeriod, TX_DEFAULTS);

    await executeTransaction(whiteListData, whiteListAddress, this._web3);

    console.log('* Updating Core time lock');
    const coreContractData = this._coreContract
                              .setTimeLockPeriod
                              .getABIEncodedTransactionData(bigNumberPeriod);

    await executeTransaction(coreContractData, this._coreContract.address, this._web3);
  }
}