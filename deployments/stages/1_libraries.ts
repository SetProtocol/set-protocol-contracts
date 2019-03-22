import { DeploymentStageInterface } from '../../types/deployment_stage_interface';

import { getContractAddress } from '../utils/output-helper';
import { deployContract, TX_DEFAULTS, linkLibraries } from '../utils/blockchain';

import {
  CommonValidationsLibraryContract,
  CoreIssuanceLibraryContract,
  ERC20WrapperContract,
  ExchangeIssuanceLibraryContract,
  RebalancingLibraryContract,
  SetTokenLibraryContract,
  FailAuctionLibraryContract,
  PlaceBidLibraryContract,
  ProposeLibraryContract,
  SettleRebalanceLibraryContract,
  StartRebalanceLibraryContract,
} from '../../utils/contracts';

import { CommonValidationsLibrary } from '../../artifacts/ts/CommonValidationsLibrary';
import { CoreIssuanceLibrary } from '../../artifacts/ts/CoreIssuanceLibrary';
import { ERC20Wrapper } from '../../artifacts/ts/ERC20Wrapper';
import { ExchangeIssuanceLibrary } from '../../artifacts/ts/ExchangeIssuanceLibrary';
import { RebalancingLibrary } from '../../artifacts/ts/RebalancingLibrary';
import { SetTokenLibrary } from '../../artifacts/ts/SetTokenLibrary';
import { FailAuctionLibrary } from '../../artifacts/ts/FailAuctionLibrary';
import { PlaceBidLibrary } from '../../artifacts/ts/PlaceBidLibrary';
import { ProposeLibrary } from '../../artifacts/ts/ProposeLibrary';
import { SettleRebalanceLibrary } from '../../artifacts/ts/SettleRebalanceLibrary';
import { StartRebalanceLibrary } from '../../artifacts/ts/StartRebalanceLibrary';

export class LibrariesStage implements DeploymentStageInterface {

  private _web3: any;

  async deploy(web3: any): Promise<any> {
    console.log('Deploying libraries...');

    this._web3 = web3;

    await this.deployCommonValidationsLibrary();
    await this.deployERC20Wrapper();
    await this.deployCoreIssuanceLibrary();
    await this.deployExchangeIssuanceLibrary();
    await this.deployRebalancingLibrary();
    await this.deploySetTokenLibrary();

    await this.deployProposeLibrary();
    await this.deploySettleRebalanceLibrary();

    await this.deployStartRebalanceLibrary();
    await this.deployPlaceBidLibrary();
    await this.deployFailAuctionLibrary();
  }

  private async deployCommonValidationsLibrary(): Promise<CommonValidationsLibraryContract> {
    const name = CommonValidationsLibrary.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await CommonValidationsLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(CommonValidationsLibrary.bytecode, this._web3, name);
    return await CommonValidationsLibraryContract.at(address, this._web3, TX_DEFAULTS);
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

  private async deployRebalancingLibrary(): Promise<RebalancingLibraryContract> {
    const name = RebalancingLibrary.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await RebalancingLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(RebalancingLibrary.bytecode, this._web3, name);
    return await RebalancingLibraryContract.at(address, this._web3, TX_DEFAULTS);
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

  private async deployProposeLibrary(): Promise<ProposeLibraryContract> {
    const name = ProposeLibrary.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await ProposeLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(ProposeLibrary.bytecode, this._web3, name);
    return await ProposeLibraryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deploySettleRebalanceLibrary(): Promise<SettleRebalanceLibraryContract> {
    const name = SettleRebalanceLibrary.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await SettleRebalanceLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(SettleRebalanceLibrary.bytecode, this._web3, name);
    return await SettleRebalanceLibraryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployStartRebalanceLibrary(): Promise<StartRebalanceLibraryContract> {
    const name = StartRebalanceLibrary.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await StartRebalanceLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    const rebalanceHelperLibraryAddress = await getContractAddress(RebalancingLibrary.contractName);
    const originalByteCode = StartRebalanceLibrary.bytecode;
    const linkedByteCode = linkLibraries([
      { name: RebalancingLibrary.contractName, address: rebalanceHelperLibraryAddress },
    ], originalByteCode);

    address = await deployContract(linkedByteCode, this._web3, name);
    return await StartRebalanceLibraryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployPlaceBidLibrary(): Promise<PlaceBidLibraryContract> {
    const name = PlaceBidLibrary.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await PlaceBidLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    const rebalanceHelperLibraryAddress = await getContractAddress(RebalancingLibrary.contractName);
    const originalByteCode = PlaceBidLibrary.bytecode;
    const linkedByteCode = linkLibraries([
      { name: RebalancingLibrary.contractName, address: rebalanceHelperLibraryAddress },
    ], originalByteCode);

    address = await deployContract(linkedByteCode, this._web3, name);
    return await PlaceBidLibraryContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployFailAuctionLibrary(): Promise<FailAuctionLibraryContract> {
    const name = FailAuctionLibrary.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await FailAuctionLibraryContract.at(address, this._web3, TX_DEFAULTS);
    }

    address = await deployContract(FailAuctionLibrary.bytecode, this._web3, name);
    return await FailAuctionLibraryContract.at(address, this._web3, TX_DEFAULTS);
  }
}