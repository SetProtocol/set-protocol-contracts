import { DeploymentStageInterface } from '../../types/deployment_stage_interface';

import { getNetworkName, getPrivateKey, getContractAddress, linkLibraries, deployContract, writeContractToOutputs, TX_DEFAULTS, getNetworkId, findDependency, writeStateToOutputs } from '../utils/blockchain';

import { 
  ExchangeIssueModuleContract, 
  IssuanceOrderModuleContract, 
  RebalanceAuctionModuleContract, 
  RebalancingTokenIssuanceModuleContract, 
  TakerWalletWrapperContract, 
  KyberNetworkWrapperContract, 
  ZeroExExchangeWrapperContract, 
  PayableExchangeIssueContract, 
  LinearAuctionPriceCurveContract, 
  ConstantAuctionPriceCurveContract
} from '../../utils/contracts';

import { ExchangeIssueModule } from '../../artifacts/ts/ExchangeIssueModule';
import { IssuanceOrderModule } from '../../artifacts/ts/IssuanceOrderModule';
import { RebalanceAuctionModule } from '../../artifacts/ts/RebalanceAuctionModule';
import { RebalancingTokenIssuanceModule } from '../../artifacts/ts/RebalancingTokenIssuanceModule';
import { TakerWalletWrapper } from '../../artifacts/ts/TakerWalletWrapper';
import { KyberNetworkWrapper } from '../../artifacts/ts/KyberNetworkWrapper';
import { PayableExchangeIssue } from '../../artifacts/ts/PayableExchangeIssue';
import { LinearAuctionPriceCurve } from '../../artifacts/ts/LinearAuctionPriceCurve';
import { ConstantAuctionPriceCurve } from '../../artifacts/ts/ConstantAuctionPriceCurve';

import constants from '../constants';
import networkConstants from '../network-constants';
import dependencies from '../dependencies';

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
    let issuanceOrderModuleContract = await this.deployIssuanceOrderModule();
    let rebalanceAuctionModuleContract = await this.deployRebalancingAuctionModule();
    let tokenRebalanceTokenIssuanceModuleContract = await this.deployRebalanceTokenIssuanceModule();
    let payableExchangeIssueContract = await this.deployPayableExchangeIssue();

    let takerWalletContract = await this.deployTakerWalletWrapper();
    let kyberWrapperContract = await this.deployKyberWrapper();
    let zeroExWrapperContract = await this.deployZeroExWrapper();

    await this.deployLinearAuctionPriceCurve();
    await this.deployConstantAuctionPriceCurve();

    await writeStateToOutputs(this._networkName, 'last_deployment_stage', 3);
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

    address = await deployContract(data, this._web3, this._privateKey, name);
    return await ExchangeIssueModuleContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployIssuanceOrderModule(): Promise<IssuanceOrderModuleContract> {
    let name = 'IssuanceOrderModule';
    let address = await getContractAddress(name);

    if (address) {
      return await IssuanceOrderModuleContract.at(address, this._web3, TX_DEFAULTS);
    }

    let coreAddress = await getContractAddress('Core');
    let transferProxyAddress = await getContractAddress('TransferProxy');
    let vaultAddress = await getContractAddress('Vault');
    let signatureValidatorAddress = await getContractAddress('SignatureValidator');
    let orderLibraryAddress = await getContractAddress('OrderLibrary');

    let originalByteCode = IssuanceOrderModule.bytecode;
    let linkedByteCode = linkLibraries([
      { name: 'OrderLibrary', address: orderLibraryAddress }
    ], originalByteCode);

    let data = new this._web3.eth.Contract(IssuanceOrderModule.abi).deploy({
      data: linkedByteCode,
      arguments: [
        coreAddress,
        transferProxyAddress,
        vaultAddress,
        signatureValidatorAddress
      ]
    }).encodeABI();

    address = await deployContract(data, this._web3, this._privateKey, name);
    return await IssuanceOrderModuleContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployRebalancingAuctionModule(): Promise<RebalanceAuctionModuleContract> {
    let name = 'RebalanceAuctionModule';
    let address = await getContractAddress(name);

    if (address) {
      return await RebalanceAuctionModuleContract.at(address, this._web3, TX_DEFAULTS);
    }

    let coreAddress = await getContractAddress('Core');
    let vaultAddress = await getContractAddress('Vault');

    let data = new this._web3.eth.Contract(RebalanceAuctionModule.abi).deploy({
      data: RebalanceAuctionModule.bytecode,
      arguments: [
        coreAddress,
        vaultAddress
      ]
    }).encodeABI();

    address = await deployContract(data, this._web3, this._privateKey, name);
    return await RebalanceAuctionModuleContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployRebalanceTokenIssuanceModule(): Promise<RebalancingTokenIssuanceModuleContract> {
    let name = 'RebalancingTokenIssuanceModule';
    let address = await getContractAddress(name);

    if (address) {
      return await RebalancingTokenIssuanceModuleContract.at(address, this._web3, TX_DEFAULTS);
    }

    let coreAddress = await getContractAddress('Core');
    let transferProxyAddress = await getContractAddress('TransferProxy');
    let vaultAddress = await getContractAddress('Vault');

    let data = new this._web3.eth.Contract(RebalancingTokenIssuanceModule.abi).deploy({
      data: RebalancingTokenIssuanceModule.bytecode,
      arguments: [
        coreAddress,
        transferProxyAddress,
        vaultAddress
      ]
    }).encodeABI();

    address = await deployContract(data, this._web3, this._privateKey, name);
    return await RebalancingTokenIssuanceModuleContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployPayableExchangeIssue(): Promise<PayableExchangeIssueContract> {
    let name = 'PayableExchangeIssue';
    let address = await getContractAddress(name);

    if (address) {
      return await PayableExchangeIssueContract.at(address, this._web3, TX_DEFAULTS);
    }

    let coreAddress = await getContractAddress('Core');
    let transferProxyAddress = await getContractAddress('TransferProxy');
    let exchangeIssueAddress = await getContractAddress('ExchangeIssueModule');
    let erc20WrapperAddress = await getContractAddress('ERC20Wrapper');
    let wethAddress = await findDependency('WETH');

    let originalByteCode = PayableExchangeIssue.bytecode;
    let linkedByteCode = linkLibraries([
      { name: 'ERC20Wrapper', address: erc20WrapperAddress }
    ], originalByteCode);

    let data = new this._web3.eth.Contract(PayableExchangeIssue.abi).deploy({
      data: linkedByteCode,
      arguments: [
        coreAddress,
        transferProxyAddress,
        exchangeIssueAddress,
        wethAddress
      ]
    }).encodeABI();

    address = await deployContract(data, this._web3, this._privateKey, name);
    return await PayableExchangeIssueContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployTakerWalletWrapper(): Promise<TakerWalletWrapperContract> {
    let name = 'TakerWalletWrapper';
    let address = await getContractAddress(name);

    if (address) {
      return await TakerWalletWrapperContract.at(address, this._web3, TX_DEFAULTS);
    }

    let coreAddress = await getContractAddress('Core');
    let transferProxyAddress = await getContractAddress('TransferProxy');

    let data = new this._web3.eth.Contract(TakerWalletWrapper.abi).deploy({
      data: TakerWalletWrapper.bytecode,
      arguments: [
        coreAddress,
        transferProxyAddress
      ]
    }).encodeABI();

    address = await deployContract(data, this._web3, this._privateKey, name);
    return await TakerWalletWrapperContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployKyberWrapper(): Promise<KyberNetworkWrapperContract> {
    let name = 'KyberNetworkWrapper';
    let address = await getContractAddress(name);
    let networkId = getNetworkId();

    if (!dependencies.KYBER_PROXY[networkId]) {
      return;
    }

    if (address) {
      return await KyberNetworkWrapperContract.at(address, this._web3, TX_DEFAULTS);
    }

    let coreAddress = await getContractAddress('Core');
    let transferProxyAddress = await getContractAddress('TransferProxy');
    let kyberTransferProxyAddress = dependencies.KYBER_PROXY[networkId];

    let data = new this._web3.eth.Contract(KyberNetworkWrapper.abi).deploy({
      data: KyberNetworkWrapper.bytecode,
      arguments: [
        coreAddress,
        kyberTransferProxyAddress,
        transferProxyAddress
      ]
    }).encodeABI();

    address = await deployContract(data, this._web3, this._privateKey, name);
    return await KyberNetworkWrapperContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployZeroExWrapper(): Promise<ZeroExExchangeWrapperContract> {
    let name = 'ZeroExExchangeWrapper';
    let address = await getContractAddress(name);
    let networkId = getNetworkId();

    if (!dependencies.ZERO_EX_EXCHANGE[networkId] || !dependencies.ZERO_EX_PROXY[networkId] || !dependencies.ZERO_EX_ZRX[networkId]) {
      return;
    }

    if (address) {
      return await ZeroExExchangeWrapperContract.at(address, this._web3, TX_DEFAULTS);
    }

    let coreAddress = await getContractAddress('Core');
    let transferProxyAddress = await getContractAddress('TransferProxy');
    let zeroExExchangeAddress = dependencies.ZERO_EX_EXCHANGE[networkId];
    let zeroExProxyAddress = dependencies.ZERO_EX_PROXY[networkId];
    let zeroExTokenAddress = dependencies.ZERO_EX_ZRX[networkId];

    let data = new this._web3.eth.Contract(KyberNetworkWrapper.abi).deploy({
      data: KyberNetworkWrapper.bytecode,
      arguments: [
        coreAddress,
        zeroExExchangeAddress,
        zeroExProxyAddress,
        zeroExTokenAddress,
        transferProxyAddress
      ]
    }).encodeABI();

    address = await deployContract(data, this._web3, this._privateKey, name);
    return await ZeroExExchangeWrapperContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployLinearAuctionPriceCurve(): Promise<LinearAuctionPriceCurveContract> {
    let name = 'LinearAuctionPriceCurve';
    let address = await getContractAddress(name);

    if (networkConstants.linearAuctionPriceCurve[this._networkName] !== true) {
      return;
    } 

    if (address) {
      return await LinearAuctionPriceCurveContract.at(address, this._web3, TX_DEFAULTS);
    }

    let data = new this._web3.eth.Contract(LinearAuctionPriceCurve.abi).deploy({
      data: LinearAuctionPriceCurve.bytecode,
      arguments: [
        constants.DEFAULT_AUCTION_PRICE_DENOMINATOR,
        true
      ]
    }).encodeABI();

    address = await deployContract(data, this._web3, this._privateKey, name);
    return await LinearAuctionPriceCurveContract.at(address, this._web3, TX_DEFAULTS);
  }

  private async deployConstantAuctionPriceCurve(): Promise<ConstantAuctionPriceCurveContract> {
    let name = 'ConstantAuctionPriceCurve';
    let address = await getContractAddress(name);

    if (networkConstants.constantsAuctionPriceCurve[this._networkName] !== true) {
      return;
    } 

    if (address) {
      return await ConstantAuctionPriceCurveContract.at(address, this._web3, TX_DEFAULTS);
    }

    let data = new this._web3.eth.Contract(ConstantAuctionPriceCurve.abi).deploy({
      data: ConstantAuctionPriceCurve.bytecode,
      arguments: [
        constants.DEFAULT_AUCTION_PRICE_NUMERATOR,
        constants.DEFAULT_AUCTION_PRICE_DENOMINATOR,
      ]
    }).encodeABI();

    address = await deployContract(data, this._web3, this._privateKey, name);
    return await ConstantAuctionPriceCurveContract.at(address, this._web3, TX_DEFAULTS);
  }

}