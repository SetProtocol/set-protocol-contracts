import { SetProtocolUtils, SetProtocolTestUtils } from 'set-protocol-utils';

import * as ABIDecoder from 'abi-decoder';

import {
  BitEthDeployedSetInfo,
  BTCDaiDeployedSetInfo,
  ETHDaiDeployedSetInfo,
  DeploymentStageInterface
} from '../../types/deployment_stage_interface';

import {
  getNetworkConstant,
  getContractAddress,
  getPrivateKey,
  findDependency,
  writeContractToOutputs,
} from '../utils/output-helper';
import { deployContract, TX_DEFAULTS, executeTransaction } from '../utils/blockchain';

import {
  BTCDaiRebalancingManagerContract,
  BTCETHRebalancingManagerContract,
  ETHDaiRebalancingManagerContract,
  SetTokenContract,
  CoreContract,
  RebalancingSetTokenContract
} from '../../utils/contracts';

import { BTCDaiRebalancingManager } from '../../artifacts/ts/BTCDaiRebalancingManager';
import { BTCETHRebalancingManager } from '../../artifacts/ts/BTCETHRebalancingManager';
import { Core } from '../../artifacts/ts/Core';
import { ETHDaiRebalancingManager } from '../../artifacts/ts/ETHDaiRebalancingManager';
import { LinearAuctionPriceCurve } from '../../artifacts/ts/LinearAuctionPriceCurve';
import { RebalancingSetTokenFactory } from '../../artifacts/ts/RebalancingSetTokenFactory';
import { SetTokenFactory } from '../../artifacts/ts/SetTokenFactory';

import { DEPLOYED_SETS_INFO, DEPENDENCY } from '../deployedContractParameters';
import constants from '../constants';

import {
  calculateAllocationBounds,
  calculateGeneralInitialSetUnits,
  calculateInitialSetUnits,
  calculateRebalancingSetUnitShares,
} from '../utils/rebalancing';

export class RebalancingStage implements DeploymentStageInterface {

  private _web3: any;
  private _networkConstant: string;
  private _privateKey: string;
  private _setTestUtils: any;
  private _coreContract: CoreContract;

  async deploy(web3: any): Promise<any> {
    console.log('Deploying rebalancing...');

    this._web3 = web3;
    this._privateKey = getPrivateKey();
    this._networkConstant = getNetworkConstant();
    this._setTestUtils = new SetProtocolTestUtils(this._web3);

    ABIDecoder.addABI(Core.abi);

    const coreAddress = await getContractAddress(Core.contractName);
    const deployerAccount = this._web3.eth.accounts.privateKeyToAccount(this._privateKey);
    this._web3.eth.accounts.wallet.add(deployerAccount);
    this._web3.eth.defaultAccount = deployerAccount.address;

    this._coreContract = await CoreContract.at(coreAddress, this._web3, {from: deployerAccount.address});

    // Deploy BitEth 75/25
    await this.deployBitEthStrategyEnabledToken(DEPLOYED_SETS_INFO.BITETH_BTC_DOMINANT);

    // Deploy BitEth 25/75
    await this.deployBitEthStrategyEnabledToken(DEPLOYED_SETS_INFO.BITETH_ETH_DOMINANT);

    // Deploy ETHDai Long Term BTD
    await this.deployETHDaiStrategyEnabledToken(DEPLOYED_SETS_INFO.ETHDAI_LONG_TERM_BTD);

    // // Deploy ETHDai Short Term BTD
    await this.deployETHDaiStrategyEnabledToken(DEPLOYED_SETS_INFO.ETHDAI_SHORT_TERM_BTD);

    // Deploy BTCDai Long Term BTD
    await this.deployBTCDaiStrategyEnabledToken(DEPLOYED_SETS_INFO.BTCDAI_LONG_TERM_BTD);

    // // Deploy BTCDai Short Term BTD
    await this.deployBTCDaiStrategyEnabledToken(DEPLOYED_SETS_INFO.BTCDAI_SHORT_TERM_BTD);
  }

  async deployBitEthStrategyEnabledToken(setParams: BitEthDeployedSetInfo): Promise<void> {
    await this.deployBitEthRebalancingManager(setParams);
    await this.deployBitEthInitialCollateralizedSet(setParams);
    await this.deployBitEthRebalancingSetToken(setParams);
  }

  async deployETHDaiStrategyEnabledToken(setParams: ETHDaiDeployedSetInfo): Promise<void> {
    await this.deployETHDaiRebalancingManager(setParams);
    await this.deployETHDaiInitialCollateralizedSet(setParams);
    await this.deployETHDaiRebalancingSetToken(setParams);
  }

  async deployBTCDaiStrategyEnabledToken(setParams: BTCDaiDeployedSetInfo): Promise<void> {
    await this.deployBTCDaiRebalancingManager(setParams);
    await this.deployBTCDaiInitialCollateralizedSet(setParams);
    await this.deployBTCDaiRebalancingSetToken(setParams);
  }

  async deployBitEthRebalancingManager(setParams: BitEthDeployedSetInfo): Promise<BTCETHRebalancingManagerContract> {
    const name = setParams.MANAGER_NAME;
    let address = await getContractAddress(name);

    if (address) {
      return await BTCETHRebalancingManagerContract.at(address, this._web3, TX_DEFAULTS);
    }

    const coreAddress = await getContractAddress(Core.contractName);
    const setTokenFactoryAddress = await getContractAddress(SetTokenFactory.contractName);
    const linearAuctionCurveAddress = await getContractAddress(LinearAuctionPriceCurve.contractName);
    const wbtcMedianizerAddress = await findDependency(DEPENDENCY.WBTC_MEDIANIZER);
    const wethMedianizerAddress = await findDependency(DEPENDENCY.WETH_MEDIANIZER);
    const wbtcAddress = await findDependency(DEPENDENCY.WBTC);
    const wethAddress = await findDependency(DEPENDENCY.WETH);
    const allocationBounds = calculateAllocationBounds(
      setParams.WBTC_MULTIPLIER,
      setParams.WETH_MULTIPLIER,
      setParams.ALLOCATION_LOWER_BOUND[this._networkConstant],
      setParams.ALLOCATION_UPPER_BOUND[this._networkConstant],
    );

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
        setParams.AUCTION_TIME_TO_PIVOT[this._networkConstant],
        [
          setParams.WBTC_MULTIPLIER.toString(),
          setParams.WETH_MULTIPLIER.toString(),
        ],
        allocationBounds,
      ],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await BTCETHRebalancingManagerContract.at(address, this._web3, TX_DEFAULTS);
  }

  async deployBitEthInitialCollateralizedSet(setParams: BitEthDeployedSetInfo): Promise<SetTokenContract> {
    const name = setParams.COLLATERAL_NAME;
    let address = await getContractAddress(name);

    if (address) {
      return await SetTokenContract.at(address, this._web3, TX_DEFAULTS);
    }

    const setTokenFactoryAddress = await getContractAddress(SetTokenFactory.contractName);
    const wbtcAddress = await findDependency(DEPENDENCY.WBTC);
    const wethAddress = await findDependency(DEPENDENCY.WETH);

    const initialSetParams = calculateInitialSetUnits(
      setParams.WBTC_MULTIPLIER,
      setParams.WETH_MULTIPLIER,
      setParams.PRICE_PRECISION,
    );
    const initialSetName = SetProtocolUtils.stringToBytes(setParams.COLLATERAL_NAME);
    const initialSymbol = SetProtocolUtils.stringToBytes('BTCETH');

    const data = await this._coreContract.createSet.getABIEncodedTransactionData(
      setTokenFactoryAddress,
      [wbtcAddress, wethAddress],
      initialSetParams['units'],
      initialSetParams['naturalUnit'],
      initialSetName,
      initialSymbol,
      SetProtocolUtils.stringToBytes(''),
      TX_DEFAULTS
    );

    const receipt = await executeTransaction(data, this._coreContract.address, this._web3);
    const logs = await this._setTestUtils.getLogsFromTxHash(receipt.transactionHash);
    address = logs[0].args._setTokenAddress;

    await writeContractToOutputs(name, address);
    return await SetTokenContract.at(address, this._web3, TX_DEFAULTS);
  }

  async deployBitEthRebalancingSetToken(setParams: BitEthDeployedSetInfo): Promise<RebalancingSetTokenContract> {
    const name = setParams.SET_NAME;
    let address = await getContractAddress(name);

    if (address) {
      return await RebalancingSetTokenContract.at(address, this._web3, TX_DEFAULTS);
    }

    const initialSetToken = await getContractAddress(setParams.COLLATERAL_NAME);
    const rebalancingSetFactoryAddress = await getContractAddress(RebalancingSetTokenFactory.contractName);
    const rebalancingManagerAddress = await getContractAddress(setParams.MANAGER_NAME);

    const initialSetParams = calculateInitialSetUnits(
      setParams.WBTC_MULTIPLIER,
      setParams.WETH_MULTIPLIER,
      setParams.PRICE_PRECISION,
    );
    const rebalancingSetUnitShares = calculateRebalancingSetUnitShares(
      initialSetParams['units'],
      initialSetParams['naturalUnit'],
      'WBTC',
      'WETH'
    );

    const rebalancingSetNaturalUnit = constants.DEFAULT_REBALANCING_NATURAL_UNIT;
    const rebalancingSetName = SetProtocolUtils.stringToBytes(setParams.SET_NAME);
    const rebalancingSetSymbol = SetProtocolUtils.stringToBytes(setParams.SET_SYMBOL);
    const rebalancingSetCallData = SetProtocolUtils.generateRebalancingSetTokenCallData(
      rebalancingManagerAddress,
      setParams.PROPOSAL_PERIOD[this._networkConstant],
      setParams.REBALANCE_INTERVAL[this._networkConstant]
    );

    const data = await this._coreContract.createSet.getABIEncodedTransactionData(
      rebalancingSetFactoryAddress,
      [initialSetToken],
      rebalancingSetUnitShares,
      rebalancingSetNaturalUnit,
      rebalancingSetName,
      rebalancingSetSymbol,
      rebalancingSetCallData,
      TX_DEFAULTS
    );

    const receipt = await executeTransaction(data, this._coreContract.address, this._web3);
    const logs = await this._setTestUtils.getLogsFromTxHash(receipt.transactionHash);
    address = logs[0].args._setTokenAddress;

    await writeContractToOutputs(name, address);

    return await RebalancingSetTokenContract.at(address, this._web3, TX_DEFAULTS);
  }

  async deployETHDaiRebalancingManager(setParams: ETHDaiDeployedSetInfo): Promise<ETHDaiRebalancingManagerContract> {
    const name = setParams.MANAGER_NAME;
    let address = await getContractAddress(name);

    if (address) {
      return await ETHDaiRebalancingManagerContract.at(address, this._web3, TX_DEFAULTS);
    }

    const coreAddress = await getContractAddress(Core.contractName);
    const setTokenFactoryAddress = await getContractAddress(SetTokenFactory.contractName);
    const linearAuctionCurveAddress = await getContractAddress(LinearAuctionPriceCurve.contractName);
    const wethMedianizerAddress = await findDependency(DEPENDENCY.WETH_MEDIANIZER);
    const daiAddress = await findDependency(DEPENDENCY.DAI);
    const wethAddress = await findDependency(DEPENDENCY.WETH);
    const allocationBounds = calculateAllocationBounds(
      setParams.DAI_MULTIPLIER,
      setParams.WETH_MULTIPLIER,
      setParams.ALLOCATION_LOWER_BOUND[this._networkConstant],
      setParams.ALLOCATION_UPPER_BOUND[this._networkConstant],
    );

    const data = new this._web3.eth.Contract(ETHDaiRebalancingManager.abi).deploy({
      data: ETHDaiRebalancingManager.bytecode,
      arguments: [
        coreAddress,
        wethMedianizerAddress,
        daiAddress,
        wethAddress,
        setTokenFactoryAddress,
        linearAuctionCurveAddress,
        setParams.AUCTION_TIME_TO_PIVOT[this._networkConstant],
        [
          setParams.DAI_MULTIPLIER.toString(),
          setParams.WETH_MULTIPLIER.toString(),
        ],
        allocationBounds,
      ],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await ETHDaiRebalancingManagerContract.at(address, this._web3, TX_DEFAULTS);
  }

  async deployETHDaiInitialCollateralizedSet(setParams: ETHDaiDeployedSetInfo): Promise<SetTokenContract> {
    const name = setParams.COLLATERAL_NAME;
    let address = await getContractAddress(name);

    if (address) {
      return await SetTokenContract.at(address, this._web3, TX_DEFAULTS);
    }

    const setTokenFactoryAddress = await getContractAddress(SetTokenFactory.contractName);
    const daiAddress = await findDependency(DEPENDENCY.DAI);
    const wethAddress = await findDependency(DEPENDENCY.WETH);

    const initialSetParams = calculateGeneralInitialSetUnits(
      constants.DAI.PRICE,
      constants.WETH.PRICE,
      setParams.DAI_MULTIPLIER,
      setParams.WETH_MULTIPLIER,
      constants.DAI.FULL_TOKEN_UNITS,
      constants.WETH.FULL_TOKEN_UNITS,
      setParams.PRICE_PRECISION,
    );
    const initialSetName = SetProtocolUtils.stringToBytes(setParams.COLLATERAL_NAME);
    const initialSymbol = SetProtocolUtils.stringToBytes('ETHDAI');

    const data = await this._coreContract.createSet.getABIEncodedTransactionData(
      setTokenFactoryAddress,
      [daiAddress, wethAddress],
      initialSetParams['units'],
      initialSetParams['naturalUnit'],
      initialSetName,
      initialSymbol,
      SetProtocolUtils.stringToBytes(''),
      TX_DEFAULTS
    );

    const receipt = await executeTransaction(data, this._coreContract.address, this._web3);
    const logs = await this._setTestUtils.getLogsFromTxHash(receipt.transactionHash);
    address = logs[0].args._setTokenAddress;

    await writeContractToOutputs(name, address);
    return await SetTokenContract.at(address, this._web3, TX_DEFAULTS);
  }

  async deployETHDaiRebalancingSetToken(setParams: ETHDaiDeployedSetInfo): Promise<RebalancingSetTokenContract> {
    const name = setParams.SET_NAME;
    let address = await getContractAddress(name);

    if (address) {
      return await RebalancingSetTokenContract.at(address, this._web3, TX_DEFAULTS);
    }

    const initialSetToken = await getContractAddress(setParams.COLLATERAL_NAME);
    const rebalancingSetFactoryAddress = await getContractAddress(RebalancingSetTokenFactory.contractName);
    const rebalancingManagerAddress = await getContractAddress(setParams.MANAGER_NAME);

    const initialSetParams = calculateGeneralInitialSetUnits(
      constants.DAI.PRICE,
      constants.WETH.PRICE,
      setParams.DAI_MULTIPLIER,
      setParams.WETH_MULTIPLIER,
      constants.DAI.FULL_TOKEN_UNITS,
      constants.WETH.FULL_TOKEN_UNITS,
      setParams.PRICE_PRECISION,
    );
    const rebalancingSetUnitShares = calculateRebalancingSetUnitShares(
      initialSetParams['units'],
      initialSetParams['naturalUnit'],
      'DAI',
      'WETH'
    );

    const rebalancingSetNaturalUnit = constants.DEFAULT_REBALANCING_NATURAL_UNIT;
    const rebalancingSetName = SetProtocolUtils.stringToBytes(setParams.SET_NAME);
    const rebalancingSetSymbol = SetProtocolUtils.stringToBytes(setParams.SET_SYMBOL);
    const rebalancingSetCallData = SetProtocolUtils.generateRebalancingSetTokenCallData(
      rebalancingManagerAddress,
      setParams.PROPOSAL_PERIOD[this._networkConstant],
      setParams.REBALANCE_INTERVAL[this._networkConstant]
    );

    const data = await this._coreContract.createSet.getABIEncodedTransactionData(
      rebalancingSetFactoryAddress,
      [initialSetToken],
      rebalancingSetUnitShares,
      rebalancingSetNaturalUnit,
      rebalancingSetName,
      rebalancingSetSymbol,
      rebalancingSetCallData,
      TX_DEFAULTS
    );

    const receipt = await executeTransaction(data, this._coreContract.address, this._web3);

    const logs = await this._setTestUtils.getLogsFromTxHash(receipt.transactionHash);
    address = logs[0].args._setTokenAddress;

    await writeContractToOutputs(name, address);

    return await RebalancingSetTokenContract.at(address, this._web3, TX_DEFAULTS);
  }

  async deployBTCDaiRebalancingManager(setParams: BTCDaiDeployedSetInfo): Promise<BTCDaiRebalancingManagerContract> {
    const name = setParams.MANAGER_NAME;
    let address = await getContractAddress(name);

    if (address) {
      return await BTCDaiRebalancingManagerContract.at(address, this._web3, TX_DEFAULTS);
    }

    const coreAddress = await getContractAddress(Core.contractName);
    const setTokenFactoryAddress = await getContractAddress(SetTokenFactory.contractName);
    const linearAuctionCurveAddress = await getContractAddress(LinearAuctionPriceCurve.contractName);
    const wbtcMedianizerAddress = await findDependency(DEPENDENCY.WBTC_MEDIANIZER);
    const daiAddress = await findDependency(DEPENDENCY.DAI);
    const wbtcAddress = await findDependency(DEPENDENCY.WBTC);
    const allocationBounds = calculateAllocationBounds(
      setParams.DAI_MULTIPLIER,
      setParams.WBTC_MULTIPLIER,
      setParams.ALLOCATION_LOWER_BOUND[this._networkConstant],
      setParams.ALLOCATION_UPPER_BOUND[this._networkConstant],
    );

    const data = new this._web3.eth.Contract(BTCDaiRebalancingManager.abi).deploy({
      data: BTCDaiRebalancingManager.bytecode,
      arguments: [
        coreAddress,
        wbtcMedianizerAddress,
        daiAddress,
        wbtcAddress,
        setTokenFactoryAddress,
        linearAuctionCurveAddress,
        setParams.AUCTION_TIME_TO_PIVOT[this._networkConstant],
        [
          setParams.DAI_MULTIPLIER.toString(),
          setParams.WBTC_MULTIPLIER.toString(),
        ],
        allocationBounds,
      ],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await BTCDaiRebalancingManagerContract.at(address, this._web3, TX_DEFAULTS);
  }

  async deployBTCDaiInitialCollateralizedSet(setParams: BTCDaiDeployedSetInfo): Promise<SetTokenContract> {
    const name = setParams.COLLATERAL_NAME;
    let address = await getContractAddress(name);

    if (address) {
      return await SetTokenContract.at(address, this._web3, TX_DEFAULTS);
    }

    const setTokenFactoryAddress = await getContractAddress(SetTokenFactory.contractName);
    const daiAddress = await findDependency(DEPENDENCY.DAI);
    const wbtcAddress = await findDependency(DEPENDENCY.WBTC);

    const initialSetParams = calculateGeneralInitialSetUnits(
      constants.DAI.PRICE,
      constants.WBTC.PRICE,
      setParams.DAI_MULTIPLIER,
      setParams.WBTC_MULTIPLIER,
      constants.DAI.FULL_TOKEN_UNITS,
      constants.WBTC.FULL_TOKEN_UNITS,
      setParams.PRICE_PRECISION,
    );
    const initialSetName = SetProtocolUtils.stringToBytes(setParams.COLLATERAL_NAME);
    const initialSymbol = SetProtocolUtils.stringToBytes('BTCDAI');

    const data = await this._coreContract.createSet.getABIEncodedTransactionData(
      setTokenFactoryAddress,
      [daiAddress, wbtcAddress],
      initialSetParams['units'],
      initialSetParams['naturalUnit'],
      initialSetName,
      initialSymbol,
      SetProtocolUtils.stringToBytes(''),
      TX_DEFAULTS
    );

    const receipt = await executeTransaction(data, this._coreContract.address, this._web3);
    const logs = await this._setTestUtils.getLogsFromTxHash(receipt.transactionHash);
    address = logs[0].args._setTokenAddress;

    await writeContractToOutputs(name, address);
    return await SetTokenContract.at(address, this._web3, TX_DEFAULTS);
  }

  async deployBTCDaiRebalancingSetToken(setParams: BTCDaiDeployedSetInfo): Promise<RebalancingSetTokenContract> {
    const name = setParams.SET_NAME;
    let address = await getContractAddress(name);

    if (address) {
      return await RebalancingSetTokenContract.at(address, this._web3, TX_DEFAULTS);
    }

    const initialSetToken = await getContractAddress(setParams.COLLATERAL_NAME);
    const rebalancingSetFactoryAddress = await getContractAddress(RebalancingSetTokenFactory.contractName);
    const rebalancingManagerAddress = await getContractAddress(setParams.MANAGER_NAME);

    const initialSetParams = calculateGeneralInitialSetUnits(
      constants.DAI.PRICE,
      constants.WBTC.PRICE,
      setParams.DAI_MULTIPLIER,
      setParams.WBTC_MULTIPLIER,
      constants.DAI.FULL_TOKEN_UNITS,
      constants.WBTC.FULL_TOKEN_UNITS,
      setParams.PRICE_PRECISION,
    );
    const rebalancingSetUnitShares = calculateRebalancingSetUnitShares(
      initialSetParams['units'],
      initialSetParams['naturalUnit'],
      'DAI',
      'WBTC'
    );

    const rebalancingSetNaturalUnit = constants.DEFAULT_REBALANCING_NATURAL_UNIT;
    const rebalancingSetName = SetProtocolUtils.stringToBytes(setParams.SET_NAME);
    const rebalancingSetSymbol = SetProtocolUtils.stringToBytes(setParams.SET_SYMBOL);
    const rebalancingSetCallData = SetProtocolUtils.generateRebalancingSetTokenCallData(
      rebalancingManagerAddress,
      setParams.PROPOSAL_PERIOD[this._networkConstant],
      setParams.REBALANCE_INTERVAL[this._networkConstant]
    );

    const data = await this._coreContract.createSet.getABIEncodedTransactionData(
      rebalancingSetFactoryAddress,
      [initialSetToken],
      rebalancingSetUnitShares,
      rebalancingSetNaturalUnit,
      rebalancingSetName,
      rebalancingSetSymbol,
      rebalancingSetCallData,
      TX_DEFAULTS
    );

    const receipt = await executeTransaction(data, this._coreContract.address, this._web3);

    const logs = await this._setTestUtils.getLogsFromTxHash(receipt.transactionHash);
    address = logs[0].args._setTokenAddress;

    await writeContractToOutputs(name, address);

    return await RebalancingSetTokenContract.at(address, this._web3, TX_DEFAULTS);
  }
}
