import { DeploymentStageInterface } from '../../types/deployment_stage_interface';

import { Vault } from '../../artifacts/ts/Vault';

import { getWeb3Instance, getContractAddress, getContractCode, getNetworkId, getNetworkName, TX_DEFAULTS, writeContractToOutputs, linkLibraries, deployContract, getPrivateKey, writeStateToOutputs } from "../utils/blockchain";
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
  private _erc20WrapperAddress: string;
  private _privateKey: string;

  async deploy(web3: any): Promise<any> {
    console.log('Deploying core...');

    this._web3 = web3;
    this._networkName = getNetworkName();
    this._networkId = getNetworkId();
    this._privateKey = getPrivateKey();
    
    this._erc20WrapperAddress = await getContractAddress('ERC20Wrapper');

    let vaultContract = await this.deployVault();
    let transferProxyContract = await this.deployTransferProxy();
    let coreContract = await this.deployCoreContract(transferProxyContract, vaultContract);
    let setTokenFactoryContract = await this.deploySetTokenFactory(coreContract);
    let whiteListContract = await this.deployWhiteList();
    let rebalancingTokenFactoryContract = await this.deployRebalancingTokenFactoryContract(coreContract, whiteListContract);

    await writeStateToOutputs(this._networkName, 'last_deployment_stage', 2);
  }

  private async deployVault(): Promise<VaultContract> {
    let name = 'Vault';
    let address = await getContractAddress(name);

    if (address) {
      return await VaultContract.at(address, this._web3, TX_DEFAULTS);
    }

    let originalByteCode = Vault.bytecode;
    let linkedByteCode = linkLibraries([
      { name: 'ERC20Wrapper', address: this._erc20WrapperAddress }
    ], originalByteCode);

    address = await deployContract(linkedByteCode, this._web3, this._privateKey);

    await writeContractToOutputs(this._networkName, name, address);
    return await VaultContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployTransferProxy(): Promise<TransferProxyContract> {
    let name = 'TransferProxy';
    let address = await getContractAddress(name);

    if (address) {
      return await TransferProxyContract.at(address, this._web3, TX_DEFAULTS);
    }

    let originalByteCode = TransferProxy.bytecode;
    let linkedByteCode = linkLibraries([
      { name: 'ERC20Wrapper', address: this._erc20WrapperAddress }
    ], originalByteCode);

    address = await deployContract(linkedByteCode, this._web3, this._privateKey);

    await writeContractToOutputs(this._networkName, name, address);
    return await TransferProxyContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployCoreContract(
    transferProxy: TransferProxyContract,
    vault: VaultContract
  ): Promise<CoreContract> {
    let name = 'Core';
    let address = await getContractAddress(name);

    if (address) {
      return await CoreContract.at(address, this._web3, TX_DEFAULTS);
    }

    let originalByteCode = Core.bytecode;
    let linkedByteCode = linkLibraries([
      { name: 'ERC20Wrapper', address: this._erc20WrapperAddress }
    ], originalByteCode);

    let data = new this._web3.eth.Contract(Core.abi).deploy({
      data: linkedByteCode,
      arguments: [transferProxy.address, vault.address]
    }).encodeABI();

    address = await deployContract(data, this._web3, this._privateKey);

    await writeContractToOutputs(this._networkName, name, address);
    return await CoreContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deploySetTokenFactory(
    core: CoreContract
  ): Promise<SetTokenFactoryContract> {
    let name = 'SetTokenFactory';
    let address = await getContractAddress(name);

    if (address) {
      return await SetTokenFactoryContract.at(address, this._web3, TX_DEFAULTS);
    }

    let data = new this._web3.eth.Contract(SetTokenFactory.abi).deploy({
      data: Core.bytecode,
      arguments: [core.address]
    }).encodeABI();

    address = await deployContract(data, this._web3, this._privateKey);

    await writeContractToOutputs(this._networkName, name, address);
    return await SetTokenFactoryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployWhiteList(): Promise<WhiteListContract> {
    let name = 'WhiteList';
    let address = await getContractAddress(name);

    if (address) {
      return await WhiteListContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(WhiteList.bytecode, this._web3, this._privateKey);

    await writeContractToOutputs(this._networkName, name, address);
    return await WhiteListContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployRebalancingTokenFactoryContract(
    core: CoreContract,
    whiteList: WhiteListContract
  ): Promise<RebalancingSetTokenFactoryContract> {
    let name = 'RebalancingSetTokenFactory';
    let address = await getContractAddress(name);

    if (address) {
      return await RebalancingSetTokenFactoryContract.at(address, this._web3, TX_DEFAULTS);
    }

    let standardStartRebalanceLibrary = await getContractAddress('StandardStartRebalanceLibrary');
    let standardFailAuctionLibrary = await getContractAddress('StandardFailAuctionLibrary');
    let standardProposeLibrary = await getContractAddress('StandardProposeLibrary');
    let standardPlaceBidLibrary = await getContractAddress('StandardPlaceBidLibrary');
    let standardSettleRebalanceLibrary = await getContractAddress('StandardSettleRebalanceLibrary');
    let rebalancingHelperLibrary = await getContractAddress('RebalancingHelperLibrary');

    let originalByteCode = RebalancingSetTokenFactory.bytecode;
    let linkedByteCode = linkLibraries([
      { name: 'StandardStartRebalanceLibrary', address: standardStartRebalanceLibrary },
      { name: 'StandardFailAuctionLibrary', address: standardFailAuctionLibrary },
      { name: 'StandardProposeLibrary', address: standardProposeLibrary },
      { name: 'StandardPlaceBidLibrary', address: standardPlaceBidLibrary },
      { name: 'StandardSettleRebalanceLibrary', address: standardSettleRebalanceLibrary },
      { name: 'RebalancingHelperLibrary', address: rebalancingHelperLibrary }
    ], originalByteCode);

    let data = new this._web3.eth.Contract(RebalancingSetTokenFactory.abi).deploy({
      data: linkedByteCode,
      arguments: [
        core.address, 
        whiteList.address,
        networkConstants.minimumRebalanceInterval[this._networkName],
        networkConstants.minimumProposalPeriod[this._networkName],
        networkConstants.minimumTimeToPivot[this._networkName],
        networkConstants.maximumTimeToPivot[this._networkName]
      ]
    }).encodeABI();

    address = await deployContract(data, this._web3, this._privateKey);

    await writeContractToOutputs(this._networkName, name, address);
    return await RebalancingSetTokenFactoryContract.at(address, this._web3, TX_DEFAULTS);
  }

}