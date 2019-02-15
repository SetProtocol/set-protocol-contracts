import { DeploymentStageInterface } from '../../types/deployment_stage_interface';

import { getNetworkName, getPrivateKey, getContractAddress, linkLibraries, deployContract, writeContractToOutputs, TX_DEFAULTS } from '../utils/blockchain';

import { ExchangeIssueModuleContract, CoreContract, TransferProxyContract, VaultContract, SignatureValidatorContract } from '../../utils/contracts';
import { ExchangeIssueModule } from '../../artifacts/ts/ExchangeIssueModule';

export class ModulesStage implements DeploymentStageInterface {

  private _web3: any;
  private _networkName: string;
  private _privateKey: string;

  async deploy(web3: any): Promise<any> {
    console.log('Deploying modules...');

    this._web3 = web3;
    this._networkName = getNetworkName();
    this._privateKey = getPrivateKey();

    let exchangeIssueModuleContract = await this.deployExchangeIssueModule();
  }

  private async deployExchangeIssueModule(): Promise<ExchangeIssueModuleContract> {
    let name = 'ExchangeIssueModule';
    let address = await getContractAddress(name);

    if (address) {
      return await ExchangeIssueModuleContract.at(address, this._web3, TX_DEFAULTS);
    }

    let coreAddress = await getContractAddress('Core');
    let transferProxyAddress = await getContractAddress('TransferProxy');
    let vaultAddress = await getContractAddress('Vault');

    let data = new this._web3.eth.Contract(ExchangeIssueModule.abi).deploy({
      data: ExchangeIssueModule.bytecode,
      arguments: [
        coreAddress,
        transferProxyAddress,
        vaultAddress
      ]
    }).encodeABI();

    address = await deployContract(data, this._web3, this._privateKey);

    await writeContractToOutputs(this._networkName, name, address);
    return await ExchangeIssueModuleContract.at(address, this._web3, TX_DEFAULTS);
  }

}