import { DeploymentStageInterface } from '../../types/deployment_stage_interface';

import { getNetworkName, getNetworkId, getContractAddress, writeStateToOutputs } from '../utils/output-helper';
import { deployContract, TX_DEFAULTS, linkLibraries } from '../utils/blockchain';

import { ERC20WrapperContract, EIP712LibraryContract, OrderLibraryContract, ExchangeIssueLibraryContract, StandardProposeLibraryContract, StandardSettleRebalanceLibraryContract, StandardStartRebalanceLibraryContract, StandardPlaceBidLibraryContract, StandardFailAuctionLibraryContract } from '../../utils/contracts';
import { ERC20Wrapper } from '../../artifacts/ts/ERC20Wrapper';
import { EIP712Library } from '../../artifacts/ts/EIP712Library';
import { ExchangeIssueLibrary } from '../../artifacts/ts/ExchangeIssueLibrary';
import { RebalancingHelperLibraryContract } from '../../types/generated/rebalancing_helper_library';
import { RebalancingHelperLibrary } from '../../artifacts/ts/RebalancingHelperLibrary';
import { StandardProposeLibrary } from '../../artifacts/ts/StandardProposeLibrary';
import { StandardSettleRebalanceLibrary } from '../../artifacts/ts/StandardSettleRebalanceLibrary';
import { StandardStartRebalanceLibrary } from '../../artifacts/ts/StandardStartRebalanceLibrary';
import { StandardPlaceBidLibrary } from '../../artifacts/ts/StandardPlaceBidLibrary';
import { StandardFailAuctionLibrary } from '../../artifacts/ts/StandardFailAuctionLibrary';

export class LibrariesStage implements DeploymentStageInterface {

  private _web3: any;
  private _networkName: string;
  private _networkId: number;

  async deploy(web3: any): Promise<any> {
    console.log('Deploying libraries...');

    this._web3 = web3;
    this._networkName = getNetworkName();
    this._networkId = getNetworkId();

    await this.deployERC20Wrapper();
    await this.deployEIP712Library();
    await this.deployOrderLibrary();
    await this.deployExchangeIssueLibrary();
    await this.deployRebalancingHelperLibrary();

    await this.deployStandardProposeLibrary();
    await this.deployStandardSettleRebalanceLibrary();

    await this.deployStandardStartRebalanceLibrary();
    await this.deployStandardPlaceBidLibrary();
    await this.deployStandardFailAuctionLibrary();
  }

  private async deployERC20Wrapper(): Promise<ERC20WrapperContract> {
    const name = 'ERC20Wrapper';
    let address = await getContractAddress(name);

    if (address) {
      return await ERC20WrapperContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(ERC20Wrapper.bytecode, this._web3, name);
    return await ERC20WrapperContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployEIP712Library(): Promise<EIP712LibraryContract> {
    const name = 'EIP712Library';
    let address = await getContractAddress(name);

    if (address) {
      return await EIP712LibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(EIP712Library.bytecode, this._web3, name);
    return await EIP712LibraryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployOrderLibrary(): Promise<OrderLibraryContract> {
    const name = 'OrderLibrary';
    let address = await getContractAddress(name);

    if (address) {
      return await OrderLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(EIP712Library.bytecode, this._web3, name);
    return await OrderLibraryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployExchangeIssueLibrary(): Promise<ExchangeIssueLibraryContract> {
    const name = 'ExchangeIssueLibrary';
    let address = await getContractAddress(name);

    if (address) {
      return await ExchangeIssueLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(ExchangeIssueLibrary.bytecode, this._web3, name);
    return await ExchangeIssueLibraryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployRebalancingHelperLibrary(): Promise<RebalancingHelperLibraryContract> {
    const name = 'RebalancingHelperLibrary';
    let address = await getContractAddress(name);

    if (address) {
      return await RebalancingHelperLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(RebalancingHelperLibrary.bytecode, this._web3, name);
    return await RebalancingHelperLibraryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployStandardProposeLibrary(): Promise<StandardProposeLibraryContract> {
    const name = 'StandardProposeLibrary';
    let address = await getContractAddress(name);

    if (address) {
      return await StandardProposeLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(StandardProposeLibrary.bytecode, this._web3, name);
    return await StandardProposeLibraryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployStandardSettleRebalanceLibrary(): Promise<StandardSettleRebalanceLibraryContract> {
    const name = 'StandardSettleRebalanceLibrary';
    let address = await getContractAddress(name);

    if (address) {
      return await StandardSettleRebalanceLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(StandardProposeLibrary.bytecode, this._web3, name);
    return await StandardSettleRebalanceLibraryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployStandardStartRebalanceLibrary(): Promise<StandardStartRebalanceLibraryContract> {
    const name = 'StandardStartRebalanceLibrary';
    let address = await getContractAddress(name);

    if (address) {
      return await StandardStartRebalanceLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    const rebalanceHelperLibraryAddress = await getContractAddress('RebalancingHelperLibrary');
    const originalByteCode = StandardStartRebalanceLibrary.bytecode;
    const linkedByteCode = linkLibraries([
      { name: 'RebalancingHelperLibrary', address: rebalanceHelperLibraryAddress }
    ], originalByteCode);

    address = await deployContract(linkedByteCode, this._web3, name);
    return await StandardStartRebalanceLibraryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployStandardPlaceBidLibrary(): Promise<StandardPlaceBidLibraryContract> {
    const name = 'StandardPlaceBidLibrary';
    let address = await getContractAddress(name);

    if (address) {
      return await StandardPlaceBidLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    const rebalanceHelperLibraryAddress = await getContractAddress('RebalancingHelperLibrary');
    const originalByteCode = StandardPlaceBidLibrary.bytecode;
    const linkedByteCode = linkLibraries([
      { name: 'RebalancingHelperLibrary', address: rebalanceHelperLibraryAddress }
    ], originalByteCode);

    address = await deployContract(linkedByteCode, this._web3, name);
    return await StandardPlaceBidLibraryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployStandardFailAuctionLibrary(): Promise<StandardFailAuctionLibraryContract> {
    const name = 'StandardFailAuctionLibrary';
    let address = await getContractAddress(name);

    if (address) {
      return await StandardFailAuctionLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(StandardFailAuctionLibrary.bytecode, this._web3, name);
    return await StandardFailAuctionLibraryContract.at(address, this._web3, TX_DEFAULTS);
  }

}