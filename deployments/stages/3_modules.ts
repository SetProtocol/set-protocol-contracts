import { DeploymentStageInterface } from '../../types/deployment_stage_interface';

import { getNetworkConstant, getNetworkId, getContractAddress, findDependency } from '../utils/output-helper';
import { deployContract, TX_DEFAULTS, linkLibraries } from '../utils/blockchain';

import {
  ExchangeIssuanceModuleContract,
  KyberNetworkWrapperContract,
  LinearAuctionPriceCurveContract,
  PayableExchangeIssuanceContract,
  RebalanceAuctionModuleContract,
  RebalancingTokenIssuanceModuleContract,
  ZeroExExchangeWrapperContract,
} from '../../utils/contracts';


import { Core } from '../../artifacts/ts/Core';
import { ERC20Wrapper } from '../../artifacts/ts/ERC20Wrapper';
import { ExchangeIssuanceModule } from '../../artifacts/ts/ExchangeIssuanceModule';
import { KyberNetworkWrapper } from '../../artifacts/ts/KyberNetworkWrapper';
import { LinearAuctionPriceCurve } from '../../artifacts/ts/LinearAuctionPriceCurve';
import { PayableExchangeIssuance } from '../../artifacts/ts/PayableExchangeIssuance';
import { RebalanceAuctionModule } from '../../artifacts/ts/RebalanceAuctionModule';
import { RebalancingTokenIssuanceModule } from '../../artifacts/ts/RebalancingTokenIssuanceModule';
import { TransferProxy } from '../../artifacts/ts/TransferProxy';
import { Vault } from '../../artifacts/ts/Vault';
import { ZeroExExchangeWrapper } from '../../artifacts/ts/ZeroExExchangeWrapper';

import { DEPENDENCY } from '../deployedContractParameters';
import constants from '../constants';
import networkConstants from '../network-constants';
import dependencies from '../dependencies';


export class ModulesStage implements DeploymentStageInterface {

  private _web3: any;
  private _networkConstant: string;

  async deploy(web3: any): Promise<any> {
    console.log('Deploying modules...');

    this._web3 = web3;
    this._networkConstant = getNetworkConstant();

    await this.deployExchangeIssuanceModule();
    await this.deployRebalancingTokenIssuanceModule();
    await this.deployRebalancingAuctionModule();

    await this.deployKyberWrapper();
    await this.deployZeroExWrapper();

    await this.deployLinearAuctionPriceCurve();

    await this.deployPayableExchangeIssuance();
  }

  private async deployExchangeIssuanceModule(): Promise<ExchangeIssuanceModuleContract> {
    const name = ExchangeIssuanceModule.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await ExchangeIssuanceModuleContract.at(address, this._web3, TX_DEFAULTS);
    }

    const coreAddress = await getContractAddress(Core.contractName);
    const vaultAddress = await getContractAddress(Vault.contractName);

    const data = new this._web3.eth.Contract(ExchangeIssuanceModule.abi).deploy({
      data: ExchangeIssuanceModule.bytecode,
      arguments: [
        coreAddress,
        vaultAddress,
      ],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await ExchangeIssuanceModuleContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployRebalancingAuctionModule(): Promise<RebalanceAuctionModuleContract> {
    const name = RebalanceAuctionModule.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await RebalanceAuctionModuleContract.at(address, this._web3, TX_DEFAULTS);
    }

    const coreAddress = await getContractAddress(Core.contractName);
    const vaultAddress = await getContractAddress(Vault.contractName);

    const data = new this._web3.eth.Contract(RebalanceAuctionModule.abi).deploy({
      data: RebalanceAuctionModule.bytecode,
      arguments: [
        coreAddress,
        vaultAddress,
      ],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await RebalanceAuctionModuleContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployRebalancingTokenIssuanceModule(): Promise<RebalancingTokenIssuanceModuleContract> {
    const name = RebalancingTokenIssuanceModule.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await RebalancingTokenIssuanceModuleContract.at(address, this._web3, TX_DEFAULTS);
    }

    const coreAddress = await getContractAddress(Core.contractName);
    const vaultAddress = await getContractAddress(Vault.contractName);

    const data = new this._web3.eth.Contract(RebalancingTokenIssuanceModule.abi).deploy({
      data: RebalancingTokenIssuanceModule.bytecode,
      arguments: [
        coreAddress,
        vaultAddress,
      ],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await RebalancingTokenIssuanceModuleContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployPayableExchangeIssuance(): Promise<PayableExchangeIssuanceContract> {
    const name = PayableExchangeIssuance.contractName;
    let address = await getContractAddress(name);

    if (address) {
      return await PayableExchangeIssuanceContract.at(address, this._web3, TX_DEFAULTS);
    }

    const coreAddress = await getContractAddress(Core.contractName);
    const transferProxyAddress = await getContractAddress(TransferProxy.contractName);
    const exchangeIssuanceAddress = await getContractAddress(ExchangeIssuanceModule.contractName);
    const erc20WrapperAddress = await getContractAddress(ERC20Wrapper.contractName);
    const wethAddress = await findDependency(DEPENDENCY.WETH);

    const originalByteCode = PayableExchangeIssuance.bytecode;
    const linkedByteCode = linkLibraries([
      { name: ERC20Wrapper.contractName, address: erc20WrapperAddress },
    ], originalByteCode);

    const data = new this._web3.eth.Contract(PayableExchangeIssuance.abi).deploy({
      data: linkedByteCode,
      arguments: [
        coreAddress,
        transferProxyAddress,
        exchangeIssuanceAddress,
        wethAddress,
      ],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await PayableExchangeIssuanceContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployKyberWrapper(): Promise<KyberNetworkWrapperContract> {
    const name = KyberNetworkWrapper.contractName;
    let address = await getContractAddress(name);
    const networkId = getNetworkId();

    if (!dependencies.KYBER_PROXY[networkId]) {
      return;
    }

    if (address) {
      return await KyberNetworkWrapperContract.at(address, this._web3, TX_DEFAULTS);
    }

    const coreAddress = await getContractAddress(Core.contractName);
    const erc20WrapperAddress = await getContractAddress(ERC20Wrapper.contractName);
    const transferProxyAddress = await getContractAddress(TransferProxy.contractName);
    const kyberTransferProxyAddress = dependencies.KYBER_PROXY[networkId];

    const originalByteCode = KyberNetworkWrapper.bytecode;
    const linkedByteCode = linkLibraries([
      { name: ERC20Wrapper.contractName, address: erc20WrapperAddress },
    ], originalByteCode);

    const data = new this._web3.eth.Contract(KyberNetworkWrapper.abi).deploy({
      data: linkedByteCode,
      arguments: [
        coreAddress,
        kyberTransferProxyAddress,
        transferProxyAddress,
      ],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await KyberNetworkWrapperContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployZeroExWrapper(): Promise<ZeroExExchangeWrapperContract> {
    const name = ZeroExExchangeWrapper.contractName;
    let address = await getContractAddress(name);
    const networkId = getNetworkId();

    if (
      !dependencies.ZERO_EX_EXCHANGE[networkId] ||
      !dependencies.ZERO_EX_PROXY[networkId] ||
      !dependencies.ZERO_EX_ZRX[networkId]
    ) {
      return;
    }

    if (address) {
      return await ZeroExExchangeWrapperContract.at(address, this._web3, TX_DEFAULTS);
    }

    const coreAddress = await getContractAddress(Core.contractName);
    const transferProxyAddress = await getContractAddress(TransferProxy.contractName);
    const erc20WrapperAddress = await getContractAddress(ERC20Wrapper.contractName);
    const zeroExExchangeAddress = dependencies.ZERO_EX_EXCHANGE[networkId];
    const zeroExProxyAddress = dependencies.ZERO_EX_PROXY[networkId];
    const zeroExTokenAddress = dependencies.ZERO_EX_ZRX[networkId];

    const originalByteCode = ZeroExExchangeWrapper.bytecode;
    const linkedByteCode = linkLibraries([
      { name: ERC20Wrapper.contractName, address: erc20WrapperAddress },
    ], originalByteCode);

    const data = new this._web3.eth.Contract(ZeroExExchangeWrapper.abi).deploy({
      data: linkedByteCode,
      arguments: [
        coreAddress,
        zeroExExchangeAddress,
        zeroExProxyAddress,
        zeroExTokenAddress,
        transferProxyAddress,
      ],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await ZeroExExchangeWrapperContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployLinearAuctionPriceCurve(): Promise<LinearAuctionPriceCurveContract> {
    const name = LinearAuctionPriceCurve.contractName;
    let address = await getContractAddress(name);

    if (networkConstants.linearAuctionPriceCurve[this._networkConstant] !== true) {
      return;
    }

    if (address) {
      return await LinearAuctionPriceCurveContract.at(address, this._web3, TX_DEFAULTS);
    }

    const data = new this._web3.eth.Contract(LinearAuctionPriceCurve.abi).deploy({
      data: LinearAuctionPriceCurve.bytecode,
      arguments: [
        constants.DEFAULT_AUCTION_PRICE_DENOMINATOR,
        true,
      ],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await LinearAuctionPriceCurveContract.at(address, this._web3, TX_DEFAULTS);
  }
}
