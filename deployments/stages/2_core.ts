import { DeploymentStageInterface } from '../../types/deployment_stage_interface';

import {
  getNetworkConstant,
  getNetworkId,
  getContractAddress,
  getPrivateKey,
  findDependency
} from '../utils/output-helper';

import { deployContract, TX_DEFAULTS, linkLibraries } from '../utils/blockchain';

import BigNumber from 'bignumber.js';

import {
  VaultContract,
  TransferProxyContract,
  CoreContract,
  SetTokenFactoryContract,
  WhiteListContract,
  RebalancingSetTokenFactoryContract,
  StandardTokenMockContract
} from '../../utils/contracts';

import { TransferProxy } from '../../artifacts/ts/TransferProxy';
import { Core } from '../../artifacts/ts/Core';
import { SetTokenFactory } from '../../artifacts/ts/SetTokenFactory';
import { WhiteList } from '../../artifacts/ts/WhiteList';
import { Vault } from '../../artifacts/ts/Vault';
import { RebalancingSetTokenFactory } from '../../artifacts/ts/RebalancingSetTokenFactory';

import dependencies from '../dependencies';
import networkConstants from '../network-constants';
import constants from '../constants';

import { StandardTokenMock } from '../../artifacts/ts/StandardTokenMock';

export class CoreStage implements DeploymentStageInterface {

  private _web3: any;
  private _networkConstant: string;
  private _erc20WrapperAddress: string;
  private _privateKey: string;

  async deploy(web3: any): Promise<any> {
    console.log('Deploying core...');

    this._web3 = web3;
    this._networkConstant = getNetworkConstant();
    this._privateKey = getPrivateKey();

    this._erc20WrapperAddress = await getContractAddress('ERC20Wrapper');

    const networkId = getNetworkId();

    if (!dependencies.WBTC[networkId]) {
      await this.deployDummyToken('WBTC', 8);
    }

    if (!dependencies.WETH[networkId]) {
      await this.deployDummyToken('WETH', 18);
    }

    if (!dependencies.WETH[networkId]) {
      await this.deployDummyToken('DAI', 18);
    }

    await this.deployVault();
    await this.deployTransferProxy();
    await this.deployCoreContract();
    await this.deploySetTokenFactory();
    await this.deployWhiteList();
    await this.deployRebalancingTokenFactory();
  }

  private async deployVault(): Promise<VaultContract> {
    const name = 'Vault';
    let address = await getContractAddress(name);

    if (address) {
      return await VaultContract.at(address, this._web3, TX_DEFAULTS);
    }

    const originalByteCode = Vault.bytecode;
    const linkedByteCode = linkLibraries([
      { name: 'ERC20Wrapper', address: this._erc20WrapperAddress },
    ], originalByteCode);

    address = await deployContract(linkedByteCode, this._web3, name);
    return await VaultContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployTransferProxy(): Promise<TransferProxyContract> {
    const name = 'TransferProxy';
    let address = await getContractAddress(name);

    if (address) {
      return await TransferProxyContract.at(address, this._web3, TX_DEFAULTS);
    }

    const originalByteCode = TransferProxy.bytecode;
    const linkedByteCode = linkLibraries([
      { name: 'ERC20Wrapper', address: this._erc20WrapperAddress },
    ], originalByteCode);

    address = await deployContract(linkedByteCode, this._web3, name);
    return await TransferProxyContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployCoreContract(): Promise<CoreContract> {
    const name = 'Core';
    let address = await getContractAddress(name);

    if (address) {
      return await CoreContract.at(address, this._web3, TX_DEFAULTS);
    }

    const transferProxyAddress = await getContractAddress('TransferProxy');
    const vaultAddress = await getContractAddress('Vault');

    const originalByteCode = Core.bytecode;

    const issuanceLibrary = await getContractAddress('IssuanceLibrary');
    const linkedByteCode = linkLibraries([
      { name: 'ERC20Wrapper', address: this._erc20WrapperAddress },
      { name: 'IssuanceLibrary', address: issuanceLibrary },
    ], originalByteCode);

    const data = new this._web3.eth.Contract(Core.abi).deploy({
      data: linkedByteCode,
      arguments: [
        transferProxyAddress,
        vaultAddress,
      ],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await CoreContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deploySetTokenFactory(): Promise<SetTokenFactoryContract> {
    const name = 'SetTokenFactory';
    let address = await getContractAddress(name);

    if (address) {
      return await SetTokenFactoryContract.at(address, this._web3, TX_DEFAULTS);
    }

    const coreAddress = await getContractAddress('Core');

    const data = new this._web3.eth.Contract(SetTokenFactory.abi).deploy({
      data: SetTokenFactory.bytecode,
      arguments: [coreAddress],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await SetTokenFactoryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployWhiteList(): Promise<WhiteListContract> {
    const name = 'WhiteList';
    let address = await getContractAddress(name);

    if (address) {
      return await WhiteListContract.at(address, this._web3, TX_DEFAULTS);
    }

    const wbtc = await findDependency('WBTC');
    const weth = await findDependency('WETH');
    const dai = await findDependency('DAI');

    const data = new this._web3.eth.Contract(WhiteList.abi).deploy({
      data: WhiteList.bytecode,
      arguments: [
        [wbtc, weth, dai],
      ],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await WhiteListContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployRebalancingTokenFactory(): Promise<RebalancingSetTokenFactoryContract> {
    const name = 'RebalancingSetTokenFactory';
    let address = await getContractAddress(name);

    if (address) {
      return await RebalancingSetTokenFactoryContract.at(address, this._web3, TX_DEFAULTS);
    }

    const coreAddress = await getContractAddress('Core');
    const whiteListAddress = await getContractAddress('WhiteList');

    const standardStartRebalanceLibrary = await getContractAddress('StandardStartRebalanceLibrary');
    const standardFailAuctionLibrary = await getContractAddress('StandardFailAuctionLibrary');
    const standardProposeLibrary = await getContractAddress('StandardProposeLibrary');
    const standardPlaceBidLibrary = await getContractAddress('StandardPlaceBidLibrary');
    const standardSettleRebalanceLibrary = await getContractAddress('StandardSettleRebalanceLibrary');
    const rebalancingHelperLibrary = await getContractAddress('RebalancingHelperLibrary');

    const originalByteCode = RebalancingSetTokenFactory.bytecode;
    const linkedByteCode = linkLibraries([
      { name: 'StandardStartRebalanceLibrary', address: standardStartRebalanceLibrary },
      { name: 'StandardFailAuctionLibrary', address: standardFailAuctionLibrary },
      { name: 'StandardProposeLibrary', address: standardProposeLibrary },
      { name: 'StandardPlaceBidLibrary', address: standardPlaceBidLibrary },
      { name: 'StandardSettleRebalanceLibrary', address: standardSettleRebalanceLibrary },
      { name: 'RebalancingHelperLibrary', address: rebalancingHelperLibrary },
    ], originalByteCode);

    const data = new this._web3.eth.Contract(RebalancingSetTokenFactory.abi).deploy({
      data: linkedByteCode,
      arguments: [
        coreAddress,
        whiteListAddress,
        networkConstants.minimumRebalanceInterval[this._networkConstant],
        networkConstants.minimumRebalanceProposalPeriod[this._networkConstant],
        networkConstants.minimumRebalanceTimeToPivot[this._networkConstant],
        networkConstants.maximumRebalanceTimeToPivot[this._networkConstant],
        constants.MINIMUM_REBALANCING_NATURAL_UNIT,
        constants.MAXIMUM_REBALANCING_NATURAL_UNIT,
      ],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await RebalancingSetTokenFactoryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployDummyToken(name: string, decimals: number): Promise<StandardTokenMockContract> {
    let address = await getContractAddress(name);

    if (address) {
      return await StandardTokenMockContract.at(address, this._web3, TX_DEFAULTS);
    }

    const data = new this._web3.eth.Contract(StandardTokenMock.abi).deploy({
      data: StandardTokenMock.bytecode,
      arguments: [
        this._web3.eth.accounts.privateKeyToAccount(this._privateKey).address,
        new BigNumber(10000).pow(18).toString(),
        name,
        name,
        decimals,
      ],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await StandardTokenMockContract.at(address, this._web3, TX_DEFAULTS);
  }

}