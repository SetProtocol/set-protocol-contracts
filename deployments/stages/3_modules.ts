import { DeploymentStageInterface } from '../../types/deployment_stage_interface';

import { getNetworkConstant, getNetworkId, getContractAddress, findDependency } from '../utils/output-helper';
import { deployContract, TX_DEFAULTS, linkLibraries } from '../utils/blockchain';

import {
  ExchangeIssueModuleContract,
  RebalanceAuctionModuleContract,
  RebalancingTokenIssuanceModuleContract,
  KyberNetworkWrapperContract,
  ZeroExExchangeWrapperContract,
  PayableExchangeIssueContract,
  LinearAuctionPriceCurveContract,
  ConstantAuctionPriceCurveContract
} from '../../utils/contracts';

import { ExchangeIssueModule } from '../../artifacts/ts/ExchangeIssueModule';
import { RebalanceAuctionModule } from '../../artifacts/ts/RebalanceAuctionModule';
import { RebalancingTokenIssuanceModule } from '../../artifacts/ts/RebalancingTokenIssuanceModule';
import { KyberNetworkWrapper } from '../../artifacts/ts/KyberNetworkWrapper';
import { PayableExchangeIssue } from '../../artifacts/ts/PayableExchangeIssue';
import { LinearAuctionPriceCurve } from '../../artifacts/ts/LinearAuctionPriceCurve';

import constants from '../constants';
import networkConstants from '../network-constants';
import dependencies from '../dependencies';
import { ZeroExExchangeWrapper } from '../../artifacts/ts/ZeroExExchangeWrapper';

export class ModulesStage implements DeploymentStageInterface {

  private _web3: any;
  private _networkConstant: string;

  async deploy(web3: any): Promise<any> {
    console.log('Deploying modules...');

    this._web3 = web3;
    this._networkConstant = getNetworkConstant();

    await this.deployExchangeIssueModule();
    await this.deployRebalancingAuctionModule();
    await this.deployRebalanceTokenIssuanceModule();
    await this.deployPayableExchangeIssue();

    await this.deployKyberWrapper();
    await this.deployZeroExWrapper();

    await this.deployLinearAuctionPriceCurve();
  }

  private async deployExchangeIssueModule(): Promise<ExchangeIssueModuleContract> {
    const name = 'ExchangeIssueModule';
    let address = await getContractAddress(name);

    if (address) {
      return await ExchangeIssueModuleContract.at(address, this._web3, TX_DEFAULTS);
    }

    const coreAddress = await getContractAddress('Core');
    const vaultAddress = await getContractAddress('Vault');

    const data = new this._web3.eth.Contract(ExchangeIssueModule.abi).deploy({
      data: ExchangeIssueModule.bytecode,
      arguments: [
        coreAddress,
        vaultAddress,
      ],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await ExchangeIssueModuleContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployRebalancingAuctionModule(): Promise<RebalanceAuctionModuleContract> {
    const name = 'RebalanceAuctionModule';
    let address = await getContractAddress(name);

    if (address) {
      return await RebalanceAuctionModuleContract.at(address, this._web3, TX_DEFAULTS);
    }

    const coreAddress = await getContractAddress('Core');
    const vaultAddress = await getContractAddress('Vault');

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

  private async deployRebalanceTokenIssuanceModule(): Promise<RebalancingTokenIssuanceModuleContract> {
    const name = 'RebalancingTokenIssuanceModule';
    let address = await getContractAddress(name);

    if (address) {
      return await RebalancingTokenIssuanceModuleContract.at(address, this._web3, TX_DEFAULTS);
    }

    const coreAddress = await getContractAddress('Core');
    const vaultAddress = await getContractAddress('Vault');

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

  private async deployPayableExchangeIssue(): Promise<PayableExchangeIssueContract> {
    const name = 'PayableExchangeIssue';
    let address = await getContractAddress(name);

    if (address) {
      return await PayableExchangeIssueContract.at(address, this._web3, TX_DEFAULTS);
    }

    const coreAddress = await getContractAddress('Core');
    const transferProxyAddress = await getContractAddress('TransferProxy');
    const exchangeIssueAddress = await getContractAddress('ExchangeIssueModule');
    const erc20WrapperAddress = await getContractAddress('ERC20Wrapper');
    const wethAddress = await findDependency('WETH');

    const originalByteCode = PayableExchangeIssue.bytecode;
    const linkedByteCode = linkLibraries([
      { name: 'ERC20Wrapper', address: erc20WrapperAddress },
    ], originalByteCode);

    const data = new this._web3.eth.Contract(PayableExchangeIssue.abi).deploy({
      data: linkedByteCode,
      arguments: [
        coreAddress,
        transferProxyAddress,
        exchangeIssueAddress,
        wethAddress,
      ],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await PayableExchangeIssueContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployKyberWrapper(): Promise<KyberNetworkWrapperContract> {
    const name = 'KyberNetworkWrapper';
    let address = await getContractAddress(name);
    const networkId = getNetworkId();

    if (!dependencies.KYBER_PROXY[networkId]) {
      return;
    }

    if (address) {
      return await KyberNetworkWrapperContract.at(address, this._web3, TX_DEFAULTS);
    }

    const coreAddress = await getContractAddress('Core');
    const erc20WrapperAddress = await getContractAddress('ERC20Wrapper');
    const transferProxyAddress = await getContractAddress('TransferProxy');
    const kyberTransferProxyAddress = dependencies.KYBER_PROXY[networkId];

    const originalByteCode = KyberNetworkWrapper.bytecode;
    const linkedByteCode = linkLibraries([
      { name: 'ERC20Wrapper', address: erc20WrapperAddress },
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
    const name = 'ZeroExExchangeWrapper';
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

    const coreAddress = await getContractAddress('Core');
    const transferProxyAddress = await getContractAddress('TransferProxy');
    const erc20WrapperAddress = await getContractAddress('ERC20Wrapper');
    const zeroExExchangeAddress = dependencies.ZERO_EX_EXCHANGE[networkId];
    const zeroExProxyAddress = dependencies.ZERO_EX_PROXY[networkId];
    const zeroExTokenAddress = dependencies.ZERO_EX_ZRX[networkId];

    const originalByteCode = ZeroExExchangeWrapper.bytecode;
    const linkedByteCode = linkLibraries([
      { name: 'ERC20Wrapper', address: erc20WrapperAddress },
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
    const name = 'LinearAuctionPriceCurve';
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
