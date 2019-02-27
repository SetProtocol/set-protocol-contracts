import { SetProtocolUtils, SetProtocolTestUtils } from 'set-protocol-utils';

import * as ABIDecoder from 'abi-decoder';

import { DeploymentStageInterface } from '../../types/deployment_stage_interface';

import {
  getNetworkName,
  getContractAddress,
  getPrivateKey,
  findDependency,
  writeContractToOutputs,
} from '../utils/output-helper';
import { deployContract, TX_DEFAULTS } from '../utils/blockchain';

import {
  BTCETHRebalancingManagerContract,
  ETHDaiRebalancingManagerContract,
  SetTokenContract,
  CoreContract,
  RebalancingSetTokenContract
} from '../../utils/contracts';

import { BTCETHRebalancingManager } from '../../artifacts/ts/BTCETHRebalancingManager';
import { ETHDaiRebalancingManager } from '../../artifacts/ts/ETHDaiRebalancingManager';
import { Core } from '../../artifacts/ts/Core';

import networkConstants from '../network-constants';
import constants from '../constants';

import { calculateInitialSetUnits, calculateRebalancingSetUnitShares, calculateETHDaiInitialSetUnits } from '../utils/rebalancing';

export class RebalancingStage implements DeploymentStageInterface {

  private _web3: any;
  private _networkName: string;
  private _privateKey: string;
  private _setTestUtils: any;
  private _coreContract: CoreContract;

  async deploy(web3: any): Promise<any> {
    console.log('Deploying rebalancing...');

    this._web3 = web3;
    this._privateKey = getPrivateKey();
    this._networkName = getNetworkName();
    this._setTestUtils = new SetProtocolTestUtils(this._web3);

    ABIDecoder.addABI(Core.abi);

    const coreAddress = await getContractAddress('Core');
    const deployerAccount = this._web3.eth.accounts.privateKeyToAccount(this._privateKey);
    this._coreContract = await CoreContract.at(coreAddress, this._web3, {from: deployerAccount.address});

    await this.deployBitEthRebalancingManager();
    await this.deployBitEthInitialCollateralizedSet();
    await this.deployBitEthRebalancingSetToken();

    await this.deployETHDaiRebalancingManager();
    await this.deployETHDaiInitialCollateralizedSet();
    await this.deployETHDaiRebalancingSetToken();
  }

  async deployBitEthRebalancingManager(): Promise<BTCETHRebalancingManagerContract> {
    const name = 'BitEthRebalanceManager';
    let address = await getContractAddress(name);

    if (address) {
      return await BTCETHRebalancingManagerContract.at(address, this._web3, TX_DEFAULTS);
    }

    const coreAddress = await getContractAddress('Core');
    const setTokenFactoryAddress = await getContractAddress('SetTokenFactory');
    const linearAuctionCurveAddress = await getContractAddress('LinearAuctionPriceCurve');
    const wbtcMedianizerAddress = await findDependency('WBTC_MEDIANIZER');
    const wethMedianizerAddress = await findDependency('WETH_MEDIANIZER');
    const wbtcAddress = await findDependency('WBTC');
    const wethAddress = await findDependency('WETH');

    const data = new this._web3.eth.Contract(BTCETHRebalancingManager.abi).deploy({
      data: BTCETHRebalancingManager.bytecode,
      arguments: [
        coreAddress,
        wbtcMedianizerAddress,
        wethMedianizerAddress,
        wbtcAddress,
        wethAddress,
        setTokenFactoryAddress,
        linearAuctionCurveAddress,
        networkConstants.bitEthRebalanceManagerAuctionTimeToPivot[this._networkName],
        [
          constants.WBTC.MULTIPLIER.toString(),
          constants.WETH.MULTIPLIER.toString()],
        [
          networkConstants.bitEthRebalanceManagerAllocationLowerBound[this._networkName],
          networkConstants.bitEthRebalanceManagerAllocationUpperBound[this._networkName],
        ],
      ],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await BTCETHRebalancingManagerContract.at(address, this._web3, TX_DEFAULTS);
  }

  async deployBitEthInitialCollateralizedSet(): Promise<SetTokenContract> {
    const name = 'BitEthInitialCollateralSet';
    let address = await getContractAddress(name);

    if (address) {
      return await SetTokenContract.at(address, this._web3, TX_DEFAULTS);
    }

    const setTokenFactoryAddress = await getContractAddress('SetTokenFactory');
    const wbtcAddress = await findDependency('WBTC');
    const wethAddress = await findDependency('WETH');

    const initialSetParams = calculateInitialSetUnits();
    const initialSetName = SetProtocolUtils.stringToBytes('BTCETH');
    const initialSymbol = SetProtocolUtils.stringToBytes('BTCETH');

    const txHash = await this._coreContract.createSet.sendTransactionAsync(
      setTokenFactoryAddress,
      [wbtcAddress, wethAddress],
      initialSetParams['units'],
      initialSetParams['naturalUnit'],
      initialSetName,
      initialSymbol,
      SetProtocolUtils.stringToBytes(''),
      TX_DEFAULTS
    );

    const logs = await this._setTestUtils.getLogsFromTxHash(txHash);
    address = logs[0].args._setTokenAddress;

    await writeContractToOutputs(this._networkName, name, address);
    return await SetTokenContract.at(address, this._web3, TX_DEFAULTS);
  }

  async deployBitEthRebalancingSetToken(): Promise<RebalancingSetTokenContract> {
    const name = 'BitEthRebalancingSetToken';
    let address = await getContractAddress(name);

    if (address) {
      return await RebalancingSetTokenContract.at(address, this._web3, TX_DEFAULTS);
    }

    const initialSetToken = await getContractAddress('BitEthInitialCollateralSet');
    const rebalancingSetFactoryAddress = await getContractAddress('RebalancingSetTokenFactory');
    const rebalancingManagerAddress = await getContractAddress('BitEthRebalanceManager');

    const initialSetParams = calculateInitialSetUnits();
    const rebalancingSetUnitShares = calculateRebalancingSetUnitShares(
      initialSetParams['units'],
      initialSetParams['naturalUnit'],
      'WBTC',
      'WETH'
    );

    const rebalancingSetNaturalUnit = constants.DEFAULT_REBALANCING_NATURAL_UNIT;
    const rebalancingSetName = SetProtocolUtils.stringToBytes('BitEth Set');
    const rebalancingSetSymbol = SetProtocolUtils.stringToBytes('BTCETH');
    const rebalancingSetCallData = SetProtocolUtils.generateRebalancingSetTokenCallData(
      rebalancingManagerAddress,
      networkConstants.bitEthProposalPeriod[this._networkName],
      networkConstants.bitEthRebalanceInterval[this._networkName]
    );

    const txHash = await this._coreContract.createSet.sendTransactionAsync(
      rebalancingSetFactoryAddress,
      [initialSetToken],
      rebalancingSetUnitShares,
      rebalancingSetNaturalUnit,
      rebalancingSetName,
      rebalancingSetSymbol,
      rebalancingSetCallData,
      TX_DEFAULTS
    );

    const logs = await this._setTestUtils.getLogsFromTxHash(txHash);
    address = logs[0].args._setTokenAddress;

    await writeContractToOutputs(this._networkName, name, address);

    return await RebalancingSetTokenContract.at(address, this._web3, TX_DEFAULTS);
  }

  async deployETHDaiRebalancingManager(): Promise<ETHDaiRebalancingManagerContract> {
    const name = 'ETHDaiRebalanceManager';
    let address = await getContractAddress(name);

    if (address) {
      return await ETHDaiRebalancingManagerContract.at(address, this._web3, TX_DEFAULTS);
    }

    const coreAddress = await getContractAddress('Core');
    const setTokenFactoryAddress = await getContractAddress('SetTokenFactory');
    const linearAuctionCurveAddress = await getContractAddress('LinearAuctionPriceCurve');
    const wethMedianizerAddress = await findDependency('WETH_MEDIANIZER');
    const daiAddress = await findDependency('DAI');
    const wethAddress = await findDependency('WETH');

    const data = new this._web3.eth.Contract(ETHDaiRebalancingManager.abi).deploy({
      data: ETHDaiRebalancingManager.bytecode,
      arguments: [
        coreAddress,
        wethMedianizerAddress,
        daiAddress,
        wethAddress,
        setTokenFactoryAddress,
        linearAuctionCurveAddress,
        networkConstants.ethDaiRebalanceManagerAuctionTimeToPivot[this._networkName],
        [
          constants.DAI.MULTIPLIER.toString(),
          constants.WETH.MULTIPLIER.toString()],
        [
          networkConstants.ethDaiRebalanceManagerAllocationLowerBound[this._networkName],
          networkConstants.ethDaiRebalanceManagerAllocationUpperBound[this._networkName],
        ],
      ],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await ETHDaiRebalancingManagerContract.at(address, this._web3, TX_DEFAULTS);
  }

  async deployETHDaiInitialCollateralizedSet(): Promise<SetTokenContract> {
    const name = 'ETHDaiInitialCollateralSet';
    let address = await getContractAddress(name);

    if (address) {
      return await SetTokenContract.at(address, this._web3, TX_DEFAULTS);
    }

    const setTokenFactoryAddress = await getContractAddress('SetTokenFactory');
    const daiAddress = await findDependency('DAI');
    const wethAddress = await findDependency('WETH');

    const initialSetParams = calculateETHDaiInitialSetUnits();
    const initialSetName = SetProtocolUtils.stringToBytes('ETHDAI');
    const initialSymbol = SetProtocolUtils.stringToBytes('ETHDAI');
    
    const txHash = await this._coreContract.createSet.sendTransactionAsync(
      setTokenFactoryAddress,
      [daiAddress, wethAddress],
      initialSetParams['units'],
      initialSetParams['naturalUnit'],
      initialSetName,
      initialSymbol,
      SetProtocolUtils.stringToBytes(''),
      TX_DEFAULTS
    );

    const logs = await this._setTestUtils.getLogsFromTxHash(txHash);
    address = logs[0].args._setTokenAddress;

    await writeContractToOutputs(this._networkName, name, address);
    return await SetTokenContract.at(address, this._web3, TX_DEFAULTS);
  }

  async deployETHDaiRebalancingSetToken(): Promise<RebalancingSetTokenContract> {
    const name = 'ETHDaiRebalancingSetToken';
    let address = await getContractAddress(name);

    if (address) {
      return await RebalancingSetTokenContract.at(address, this._web3, TX_DEFAULTS);
    }

    const initialSetToken = await getContractAddress('ETHDaiInitialCollateralSet');
    const rebalancingSetFactoryAddress = await getContractAddress('RebalancingSetTokenFactory');
    const rebalancingManagerAddress = await getContractAddress('ETHDaiRebalanceManager');

    const initialSetParams = calculateETHDaiInitialSetUnits();
    const rebalancingSetUnitShares = calculateRebalancingSetUnitShares(
      initialSetParams['units'],
      initialSetParams['naturalUnit'],
      'DAI',
      'WETH'
    );

    const rebalancingSetNaturalUnit = constants.DEFAULT_REBALANCING_NATURAL_UNIT;
    const rebalancingSetName = SetProtocolUtils.stringToBytes('BTD ETHDai Set');
    const rebalancingSetSymbol = SetProtocolUtils.stringToBytes('ETHDai');
    const rebalancingSetCallData = SetProtocolUtils.generateRebalancingSetTokenCallData(
      rebalancingManagerAddress,
      networkConstants.ethDaiProposalPeriod[this._networkName],
      networkConstants.ethDaiRebalanceInterval[this._networkName]
    );

    const txHash = await this._coreContract.createSet.sendTransactionAsync(
      rebalancingSetFactoryAddress,
      [initialSetToken],
      rebalancingSetUnitShares,
      rebalancingSetNaturalUnit,
      rebalancingSetName,
      rebalancingSetSymbol,
      rebalancingSetCallData,
      TX_DEFAULTS
    );

    const logs = await this._setTestUtils.getLogsFromTxHash(txHash);
    address = logs[0].args._setTokenAddress;

    await writeContractToOutputs(this._networkName, name, address);

    return await RebalancingSetTokenContract.at(address, this._web3, TX_DEFAULTS);
  }
}
