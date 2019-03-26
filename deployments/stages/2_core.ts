import { DeploymentStageInterface } from '../../types/deployment_stage_interface';

import {
  getNetworkConstant,
  getNetworkId,
  getContractAddress,
  getPrivateKey,
  findDependency
} from '../utils/output-helper';

import { DEPENDENCY } from '../deployedContractParameters';

import { deployContract, TX_DEFAULTS, linkLibraries } from '../utils/blockchain';

import BigNumber from 'bignumber.js';

import {
  CoreContract,
  MedianContract,
  RebalancingSetTokenFactoryContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract,
  WethMockContract,
  WhiteListContract,
} from '../../utils/contracts';

import { CommonValidationsLibrary } from '../../artifacts/ts/CommonValidationsLibrary';
import { Core } from '../../artifacts/ts/Core';
import { CoreIssuanceLibrary } from '../../artifacts/ts/CoreIssuanceLibrary';
import { ERC20Wrapper } from '../../artifacts/ts/ERC20Wrapper';
import { Median } from '../../artifacts/ts/Median';
import { RebalancingLibrary } from '../../artifacts/ts/RebalancingLibrary';
import { RebalancingSetTokenFactory } from '../../artifacts/ts/RebalancingSetTokenFactory';
import { SetTokenFactory } from '../../artifacts/ts/SetTokenFactory';
import { SetTokenLibrary } from '../../artifacts/ts/SetTokenLibrary';
import { FailAuctionLibrary } from '../../artifacts/ts/FailAuctionLibrary';
import { PlaceBidLibrary } from '../../artifacts/ts/PlaceBidLibrary';
import { ProposeLibrary } from '../../artifacts/ts/ProposeLibrary';
import { SettleRebalanceLibrary } from '../../artifacts/ts/SettleRebalanceLibrary';
import { StartRebalanceLibrary } from '../../artifacts/ts/StartRebalanceLibrary';
import { TransferProxy } from '../../artifacts/ts/TransferProxy';
import { Vault } from '../../artifacts/ts/Vault';
import { WethMock } from '../../artifacts/ts/WethMock';
import { WhiteList } from '../../artifacts/ts/WhiteList';

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

    this._erc20WrapperAddress = await getContractAddress(ERC20Wrapper.contractName);

    const networkId = getNetworkId();

    if (!dependencies.WBTC[networkId]) {
      await this.deployDummyToken(DEPENDENCY.WBTC, 8);
    }

    if (!dependencies.WETH[networkId]) {
      await this.deployDummyWETH(DEPENDENCY.WETH);
    }

    if (!dependencies.WETH[networkId]) {
      await this.deployDummyToken(DEPENDENCY.DAI, 18);
    }

    if (!dependencies.WBTC_MEDIANIZER[networkId]) {
      await this.deployMedianizer(DEPENDENCY.WBTC_MEDIANIZER);
    }

    if (!dependencies.WETH_MEDIANIZER[networkId]) {
      await this.deployMedianizer(DEPENDENCY.WETH_MEDIANIZER);
    }

    await this.deployVault();
    await this.deployTransferProxy();
    await this.deployCoreContract();
    await this.deploySetTokenFactory();
    await this.deployWhiteList();
    await this.deployRebalancingTokenFactory();
  }

  private async deployVault(): Promise<VaultContract> {
    const name = Vault.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await VaultContract.at(address, this._web3, TX_DEFAULTS);
    }

    const originalByteCode = Vault.bytecode;
    const linkedByteCode = linkLibraries([
      { name: ERC20Wrapper.contractName, address: this._erc20WrapperAddress },
    ], originalByteCode);

    address = await deployContract(linkedByteCode, this._web3, name);
    return await VaultContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployTransferProxy(): Promise<TransferProxyContract> {
    const name = TransferProxy.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await TransferProxyContract.at(address, this._web3, TX_DEFAULTS);
    }

    const originalByteCode = TransferProxy.bytecode;
    const linkedByteCode = linkLibraries([
      { name: ERC20Wrapper.contractName, address: this._erc20WrapperAddress },
    ], originalByteCode);

    address = await deployContract(linkedByteCode, this._web3, name);
    return await TransferProxyContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployCoreContract(): Promise<CoreContract> {
    const name = Core.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await CoreContract.at(address, this._web3, TX_DEFAULTS);
    }

    const transferProxyAddress = await getContractAddress(TransferProxy.contractName);
    const vaultAddress = await getContractAddress(Vault.contractName);

    const originalByteCode = Core.bytecode;

    const coreIssuanceLibrary = await getContractAddress(CoreIssuanceLibrary.contractName);
    const commonValidations = await getContractAddress(CommonValidationsLibrary.contractName);
    const setTokenLibrary = await getContractAddress(SetTokenLibrary.contractName);
    const linkedByteCode = linkLibraries([
      { name: ERC20Wrapper.contractName, address: this._erc20WrapperAddress },
      { name: CoreIssuanceLibrary.contractName, address: coreIssuanceLibrary },
      { name: CommonValidationsLibrary.contractName, address: commonValidations },
      { name: SetTokenLibrary.contractName, address: setTokenLibrary },
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
    const name = SetTokenFactory.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await SetTokenFactoryContract.at(address, this._web3, TX_DEFAULTS);
    }

    const coreAddress = await getContractAddress(Core.contractName);

    const originalByteCode = SetTokenFactory.bytecode;
    const commonValidations = await getContractAddress(CommonValidationsLibrary.contractName);
    const linkedByteCode = linkLibraries([
      { name: CommonValidationsLibrary.contractName, address: commonValidations },
    ], originalByteCode);

    const data = new this._web3.eth.Contract(SetTokenFactory.abi).deploy({
      data: linkedByteCode,
      arguments: [coreAddress],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await SetTokenFactoryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployWhiteList(): Promise<WhiteListContract> {
    const name = WhiteList.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await WhiteListContract.at(address, this._web3, TX_DEFAULTS);
    }

    const wbtc = await findDependency(DEPENDENCY.WBTC);
    const weth = await findDependency(DEPENDENCY.WETH);
    const dai = await findDependency(DEPENDENCY.DAI);

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
    const name = RebalancingSetTokenFactory.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await RebalancingSetTokenFactoryContract.at(address, this._web3, TX_DEFAULTS);
    }

    const coreAddress = await getContractAddress(Core.contractName);
    const whiteListAddress = await getContractAddress(WhiteList.contractName);

    const startRebalanceLibrary = await getContractAddress(StartRebalanceLibrary.contractName);
    const failAuctionLibrary = await getContractAddress(FailAuctionLibrary.contractName);
    const proposeLibrary = await getContractAddress(ProposeLibrary.contractName);
    const placeBidLibrary = await getContractAddress(PlaceBidLibrary.contractName);
    const settleRebalanceLibrary = await getContractAddress(SettleRebalanceLibrary.contractName);
    const rebalancingLibrary = await getContractAddress(RebalancingLibrary.contractName);

    const originalByteCode = RebalancingSetTokenFactory.bytecode;
    const linkedByteCode = linkLibraries([
      { name: StartRebalanceLibrary.contractName, address: startRebalanceLibrary },
      { name: FailAuctionLibrary.contractName, address: failAuctionLibrary },
      { name: ProposeLibrary.contractName, address: proposeLibrary },
      { name: PlaceBidLibrary.contractName, address: placeBidLibrary },
      { name: SettleRebalanceLibrary.contractName, address: settleRebalanceLibrary },
      { name: RebalancingLibrary.contractName, address: rebalancingLibrary },
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

  private async deployDummyWETH(name: string): Promise<WethMockContract> {
    let address = await getContractAddress(name);

    if (address) {
      return await WethMockContract.at(address, this._web3, TX_DEFAULTS);
    }

    const data = new this._web3.eth.Contract(WethMock.abi).deploy({
      data: WethMock.bytecode,
      arguments: [
        this._web3.eth.accounts.privateKeyToAccount(this._privateKey).address,
        new BigNumber(10000).pow(18).toString(),
      ],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await WethMockContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployMedianizer(name: string): Promise<MedianContract> {
    let address = await getContractAddress(name);

    if (address) {
      return await MedianContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(Median.bytecode, this._web3, name);
    return await MedianContract.at(address, this._web3, TX_DEFAULTS);
  }
}
