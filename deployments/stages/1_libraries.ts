import { DeploymentStageInterface } from '../../types/deployment_stage_interface';

import { getContractAddress } from '../utils/output-helper';
import { deployContract, TX_DEFAULTS, linkLibraries } from '../utils/blockchain';

import {
  ArrayValidationsContract,
  CoreIssuanceLibraryContract,
  ERC20WrapperContract,
  ExchangeIssuanceLibraryContract,
  RebalancingHelperLibraryContract,
  SetTokenLibraryContract,
  StandardFailAuctionLibraryContract,
  StandardPlaceBidLibraryContract,
  StandardProposeLibraryContract,
  StandardSettleRebalanceLibraryContract,
  StandardStartRebalanceLibraryContract,
} from '../../utils/contracts';

import { ArrayValidations } from '../../artifacts/ts/ArrayValidations';
import { CoreIssuanceLibrary } from '../../artifacts/ts/CoreIssuanceLibrary';
import { ERC20Wrapper } from '../../artifacts/ts/ERC20Wrapper';
import { ExchangeIssuanceLibrary } from '../../artifacts/ts/ExchangeIssuanceLibrary';
import { RebalancingHelperLibrary } from '../../artifacts/ts/RebalancingHelperLibrary';
import { SetTokenLibrary } from '../../artifacts/ts/SetTokenLibrary';
import { StandardFailAuctionLibrary } from '../../artifacts/ts/StandardFailAuctionLibrary';
import { StandardPlaceBidLibrary } from '../../artifacts/ts/StandardPlaceBidLibrary';
import { StandardProposeLibrary } from '../../artifacts/ts/StandardProposeLibrary';
import { StandardSettleRebalanceLibrary } from '../../artifacts/ts/StandardSettleRebalanceLibrary';
import { StandardStartRebalanceLibrary } from '../../artifacts/ts/StandardStartRebalanceLibrary';

export class LibrariesStage implements DeploymentStageInterface {

  private _web3: any;

  async deploy(web3: any): Promise<any> {
    console.log('Deploying libraries...');

    this._web3 = web3;

    await this.deployArrayValidations();
    await this.deployERC20Wrapper();
    await this.deployCoreIssuanceLibrary();
    await this.deployExchangeIssuanceLibrary();
    await this.deployRebalancingHelperLibrary();
    await this.deploySetTokenLibrary();

    await this.deployStandardProposeLibrary();
    await this.deployStandardSettleRebalanceLibrary();

    await this.deployStandardStartRebalanceLibrary();
    await this.deployStandardPlaceBidLibrary();
    await this.deployStandardFailAuctionLibrary();
  }

  private async deployArrayValidations(): Promise<ArrayValidationsContract> {
    const name = ArrayValidations.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await ArrayValidationsContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(ArrayValidations.bytecode, this._web3, name);
    return await ArrayValidationsContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployERC20Wrapper(): Promise<ERC20WrapperContract> {
    const name = ERC20Wrapper.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await ERC20WrapperContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(ERC20Wrapper.bytecode, this._web3, name);
    return await ERC20WrapperContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployExchangeIssuanceLibrary(): Promise<ExchangeIssuanceLibraryContract> {
    const name = ExchangeIssuanceLibrary.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await ExchangeIssuanceLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(ExchangeIssuanceLibrary.bytecode, this._web3, name);
    return await ExchangeIssuanceLibraryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployCoreIssuanceLibrary(): Promise<CoreIssuanceLibraryContract> {
    const name = CoreIssuanceLibrary.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await CoreIssuanceLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(CoreIssuanceLibrary.bytecode, this._web3, name);
    return await CoreIssuanceLibraryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployRebalancingHelperLibrary(): Promise<RebalancingHelperLibraryContract> {
    const name = RebalancingHelperLibrary.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await RebalancingHelperLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(RebalancingHelperLibrary.bytecode, this._web3, name);
    return await RebalancingHelperLibraryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deploySetTokenLibrary(): Promise<SetTokenLibraryContract> {
    const name = SetTokenLibrary.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await SetTokenLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(SetTokenLibrary.bytecode, this._web3, name);
    return await SetTokenLibraryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployStandardProposeLibrary(): Promise<StandardProposeLibraryContract> {
    const name = StandardProposeLibrary.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await StandardProposeLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(StandardProposeLibrary.bytecode, this._web3, name);
    return await StandardProposeLibraryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployStandardSettleRebalanceLibrary(): Promise<StandardSettleRebalanceLibraryContract> {
    const name = StandardSettleRebalanceLibrary.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await StandardSettleRebalanceLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(StandardSettleRebalanceLibrary.bytecode, this._web3, name);
    return await StandardSettleRebalanceLibraryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployStandardStartRebalanceLibrary(): Promise<StandardStartRebalanceLibraryContract> {
    const name = StandardStartRebalanceLibrary.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await StandardStartRebalanceLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    const rebalanceHelperLibraryAddress = await getContractAddress(RebalancingHelperLibrary.contractName);
    const originalByteCode = StandardStartRebalanceLibrary.bytecode;
    const linkedByteCode = linkLibraries([
      { name: RebalancingHelperLibrary.contractName, address: rebalanceHelperLibraryAddress },
    ], originalByteCode);

    address = await deployContract(linkedByteCode, this._web3, name);
    return await StandardStartRebalanceLibraryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployStandardPlaceBidLibrary(): Promise<StandardPlaceBidLibraryContract> {
    const name = StandardPlaceBidLibrary.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await StandardPlaceBidLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    const rebalanceHelperLibraryAddress = await getContractAddress(RebalancingHelperLibrary.contractName);
    const originalByteCode = StandardPlaceBidLibrary.bytecode;
    const linkedByteCode = linkLibraries([
      { name: RebalancingHelperLibrary.contractName, address: rebalanceHelperLibraryAddress },
    ], originalByteCode);

    address = await deployContract(linkedByteCode, this._web3, name);
    return await StandardPlaceBidLibraryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployStandardFailAuctionLibrary(): Promise<StandardFailAuctionLibraryContract> {
    const name = StandardFailAuctionLibrary.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await StandardFailAuctionLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(StandardFailAuctionLibrary.bytecode, this._web3, name);
    return await StandardFailAuctionLibraryContract.at(address, this._web3, TX_DEFAULTS);
  }
}