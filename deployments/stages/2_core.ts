import { DeploymentStageInterface } from '../../types/deployment_stage_interface';

import { Vault } from '../../artifacts/ts/Vault';

import { getWeb3Instance, getContractAddress, getContractCode, getNetworkId, getNetworkName, TX_DEFAULTS, writeContractToOutputs } from "../utils/blockchain";
import { VaultContract, TransferProxyContract, CoreContract, SetTokenFactoryContract, WhiteListContract, RebalancingSetTokenFactoryContract } from '../../utils/contracts';
import { TransferProxy } from '../../artifacts/ts/TransferProxy';
import { Core } from '../../artifacts/ts/Core';
import { SetTokenFactory } from '../../artifacts/ts/SetTokenFactory';
import { WhiteList } from '../../artifacts/ts/WhiteList';
import { RebalancingSetTokenFactory } from '../../artifacts/ts/RebalancingSetTokenFactory';

import dependencies from '../dependencies';
import networkConstants from '../network-constants';

export class CoreStage implements DeploymentStageInterface {

  private _web3: any;
  private _networkName: string;
  private _networkId: number;

  async deploy(web3: any): Promise<any> {
    console.log('Deploying core...');

    this._web3 = web3;
    this._networkName = getNetworkName();
    this._networkId = getNetworkId();

    // let vaultContract = await this.deployVault();
    // let transferProxyContract = await this.deployTransferProxy();
    // let coreContract = await this.deployCoreContract(transferProxyContract, vaultContract);
    // let setTokenFactoryContract = await this.deploySetTokenFactory(coreContract);
    // let whiteListContract = await this.deployWhiteList();
    // let rebalancingTokenFactoryContract = await this.deployRebalancingTokenFactoryContract(coreContract, whiteListContract);
  }

  // private async deployVault(): Promise<VaultContract> {
  //   let vaultAddress = await getContractAddress('Vault');
  //   let vaultContract = new VaultContract(this._web3, TX_DEFAULTS);

  //   if (vaultAddress) {
  //     return await VaultContract.at(vaultAddress, this._web3, TX_DEFAULTS);
  //   }

  //   let result = await vaultContract.deploy(Vault.bytecode, []);

  //   await writeContractToOutputs(this._networkName, 'Vault', result.options.address);
  //   return result;
  // }

  // private async deployTransferProxy(): Promise<TransferProxyContract> {
  //   let transferProxyAddress = await getContractAddress('TransferProxy');
  //   let transferProxyContract = await this._web3.eth.Contract(TransferProxy.abi);

  //   if (transferProxyAddress) {
  //     return new this._web3.eth.Contract(TransferProxy.abi, transferProxyAddress);
  //   }

  //   let result = await transferProxyContract.deploy({
  //     arguments: []
  //   }).send(TX_DEFAULTS);

  //   await writeContractToOutputs(this._networkName, 'TransferProxy', result.options.address);
  //   return result;
  // }

  // private async deployCoreContract(
  //   transferProxy: TransferProxyContract,
  //   vault: VaultContract
  // ): Promise<CoreContract> {
  //   let coreAddress = await getContractAddress('Core');
  //   let coreContract = new this._web3.eth.Contract(Core.abi);

  //   if (coreAddress) {
  //     return new this._web3.eth.Contract(Core.abi, coreAddress);
  //   }

  //   let result = await this._coreWrapper.deployCoreAsync(
  //     transferProxy,
  //     vault
  //   );

  //   await writeContractToOutputs(this._networkName, 'Core', result.address);
  //   return result;
  // }

  // private async deploySetTokenFactory(
  //   core: CoreContract
  // ): Promise<SetTokenFactoryContract> {
  //   let setTokenFactoryAddress = await getContractAddress('SetTokenFactory');

  //   if (setTokenFactoryAddress) {
  //     return new this._web3.eth.Contract(SetTokenFactory.abi, setTokenFactoryAddress);
  //   }

  //   let result = await this._coreWrapper.deploySetTokenFactoryAsync(
  //     core.address
  //   );

  //   await writeContractToOutputs(this._networkName, 'SetTokenFactory', result.address);
  //   return result;
  // }

  // private async deployWhiteList(): Promise<WhiteListContract> {
  //   let whiteListAddress = await getContractAddress('WhiteList');

  //   if (whiteListAddress) {
  //     return new this._web3.eth.Contract(WhiteList.abi, whiteListAddress);
  //   }

  //   let wBTCAddress = dependencies.WBTC[this._networkId];
  //   let wETHAddress = dependencies.WETH[this._networkId];

  //   let result = await this._coreWrapper.deployWhiteListAsync([wBTCAddress, wETHAddress]);

  //   await writeContractToOutputs(this._networkName, 'WhiteList', result.address);
  //   return result;
  // }

  // private async deployRebalancingTokenFactoryContract(
  //   core: CoreContract,
  //   whiteList: WhiteListContract
  // ): Promise<RebalancingSetTokenFactoryContract> {
  //   let rebalancingTokenFactoryAddress = await getContractAddress('RebalancingSetTokenFactory');

  //   if (rebalancingTokenFactoryAddress) {
  //     return new this._web3.eth.Contract(RebalancingSetTokenFactory.abi, rebalancingTokenFactoryAddress);
  //   }

  //   let result = await this._coreWrapper.deployRebalancingSetTokenFactoryAsync(
  //     core.address,
  //     whiteList.address,
  //     networkConstants.minimumRebalanceInterval[this._networkName],
  //     networkConstants.minimumProposalPeriod[this._networkName],
  //     networkConstants.minimumTimeToPivot[this._networkName],
  //     networkConstants.maximumTimeToPivot[this._networkName]
  //   );

  //   await writeContractToOutputs(this._networkName, 'RebalancingSetTokenFactory', result.address);
  //   return result
  // }

}