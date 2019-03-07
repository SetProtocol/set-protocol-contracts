import { SetProtocolUtils, SetProtocolTestUtils } from 'set-protocol-utils';

import * as ABIDecoder from 'abi-decoder';

import { DeploymentStageInterface } from '../../types/deployment_stage_interface';

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

import { DEPLOYED_TOKEN, DEPENDENCY } from '../contractNames';
import networkConstants from '../network-constants';
import constants from '../constants';

import {
  calculateInitialSetUnits,
  calculateRebalancingSetUnitShares,
  calculateGeneralInitialSetUnits,
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


    await this.deployBitEthRebalancingManager();
    await this.deployBitEthInitialCollateralizedSet();
    await this.deployBitEthRebalancingSetToken();

    await this.deployETHDaiRebalancingManager();
    await this.deployETHDaiInitialCollateralizedSet();
    await this.deployETHDaiRebalancingSetToken();

    await this.deployBTCDaiRebalancingManager();
    await this.deployBTCDaiInitialCollateralizedSet();
    await this.deployBTCDaiRebalancingSetToken();
  }

  async deployBitEthRebalancingManager(): Promise<BTCETHRebalancingManagerContract> {
    const name = BTCETHRebalancingManager.contractName;
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
        networkConstants.bitEthRebalanceManagerAuctionTimeToPivot[this._networkConstant],
        [
          constants.BITETH.WBTC_MULTIPLIER.toString(),
          constants.BITETH.WETH_MULTIPLIER.toString()],
        [
          networkConstants.bitEthRebalanceManagerAllocationLowerBound[this._networkConstant],
          networkConstants.bitEthRebalanceManagerAllocationUpperBound[this._networkConstant],
        ],
      ],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await BTCETHRebalancingManagerContract.at(address, this._web3, TX_DEFAULTS);
  }

  async deployBitEthInitialCollateralizedSet(): Promise<SetTokenContract> {
    const name = DEPLOYED_TOKEN.BitEthInitialCollateralSet;
    let address = await getContractAddress(name);

    if (address) {
      return await SetTokenContract.at(address, this._web3, TX_DEFAULTS);
    }

    const setTokenFactoryAddress = await getContractAddress(SetTokenFactory.contractName);
    const wbtcAddress = await findDependency(DEPENDENCY.WBTC);
    const wethAddress = await findDependency(DEPENDENCY.WETH);

    const initialSetParams = calculateInitialSetUnits();
    const initialSetName = SetProtocolUtils.stringToBytes('BTCETH');
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

  async deployBitEthRebalancingSetToken(): Promise<RebalancingSetTokenContract> {
    const name = DEPLOYED_TOKEN.BitEthRebalancingSetToken;
    let address = await getContractAddress(name);

    if (address) {
      return await RebalancingSetTokenContract.at(address, this._web3, TX_DEFAULTS);
    }

    const initialSetToken = await getContractAddress(DEPLOYED_TOKEN.BitEthInitialCollateralSet);
    const rebalancingSetFactoryAddress = await getContractAddress(RebalancingSetTokenFactory.contractName);
    const rebalancingManagerAddress = await getContractAddress(BTCETHRebalancingManager.contractName);

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
      networkConstants.bitEthProposalPeriod[this._networkConstant],
      networkConstants.bitEthRebalanceInterval[this._networkConstant]
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

  async deployETHDaiRebalancingManager(): Promise<ETHDaiRebalancingManagerContract> {
    const name = ETHDaiRebalancingManager.contractName;
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

    const data = new this._web3.eth.Contract(ETHDaiRebalancingManager.abi).deploy({
      data: ETHDaiRebalancingManager.bytecode,
      arguments: [
        coreAddress,
        wethMedianizerAddress,
        daiAddress,
        wethAddress,
        setTokenFactoryAddress,
        linearAuctionCurveAddress,
        networkConstants.ethDaiRebalanceManagerAuctionTimeToPivot[this._networkConstant],
        [
          constants.ETHDAI_BTD.DAI_MULTIPLIER.toString(),
          constants.ETHDAI_BTD.WETH_MULTIPLIER.toString()],
        [
          networkConstants.ethDaiRebalanceManagerAllocationLowerBound[this._networkConstant],
          networkConstants.ethDaiRebalanceManagerAllocationUpperBound[this._networkConstant],
        ],
      ],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await ETHDaiRebalancingManagerContract.at(address, this._web3, TX_DEFAULTS);
  }

  async deployETHDaiInitialCollateralizedSet(): Promise<SetTokenContract> {
    const name = DEPLOYED_TOKEN.ETHDaiInitialCollateralSet;
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
      constants.ETHDAI_BTD.DAI_MULTIPLIER,
      constants.ETHDAI_BTD.WETH_MULTIPLIER,
      constants.DAI.FULL_TOKEN_UNITS,
      constants.WETH.FULL_TOKEN_UNITS,
      constants.ETHDAI_BTD.PRICE_PRECISION,
    );
    const initialSetName = SetProtocolUtils.stringToBytes('ETHDAI');
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

  async deployETHDaiRebalancingSetToken(): Promise<RebalancingSetTokenContract> {
    const name = DEPLOYED_TOKEN.ETHDaiRebalancingSetToken;
    let address = await getContractAddress(name);

    if (address) {
      return await RebalancingSetTokenContract.at(address, this._web3, TX_DEFAULTS);
    }

    const initialSetToken = await getContractAddress(DEPLOYED_TOKEN.ETHDaiInitialCollateralSet);
    const rebalancingSetFactoryAddress = await getContractAddress(RebalancingSetTokenFactory.contractName);
    const rebalancingManagerAddress = await getContractAddress(ETHDaiRebalancingManager.contractName);

    const initialSetParams = calculateGeneralInitialSetUnits(
      constants.DAI.PRICE,
      constants.WETH.PRICE,
      constants.ETHDAI_BTD.DAI_MULTIPLIER,
      constants.ETHDAI_BTD.WETH_MULTIPLIER,
      constants.DAI.FULL_TOKEN_UNITS,
      constants.WETH.FULL_TOKEN_UNITS,
      constants.ETHDAI_BTD.PRICE_PRECISION,
    );
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
      networkConstants.ethDaiProposalPeriod[this._networkConstant],
      networkConstants.ethDaiRebalanceInterval[this._networkConstant]
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

  async deployBTCDaiRebalancingManager(): Promise<BTCDaiRebalancingManagerContract> {
    const name = BTCDaiRebalancingManager.contractName;
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

    const data = new this._web3.eth.Contract(BTCDaiRebalancingManager.abi).deploy({
      data: BTCDaiRebalancingManager.bytecode,
      arguments: [
        coreAddress,
        wbtcMedianizerAddress,
        daiAddress,
        wbtcAddress,
        setTokenFactoryAddress,
        linearAuctionCurveAddress,
        networkConstants.btcDaiRebalanceManagerAuctionTimeToPivot[this._networkConstant],
        [
          constants.BTCDAI_BTD.DAI_MULTIPLIER.toString(),
          constants.BTCDAI_BTD.WBTC_MULTIPLIER.toString()],
        [
          networkConstants.btcDaiRebalanceManagerAllocationLowerBound[this._networkConstant],
          networkConstants.btcDaiRebalanceManagerAllocationUpperBound[this._networkConstant],
        ],
      ],
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await BTCDaiRebalancingManagerContract.at(address, this._web3, TX_DEFAULTS);
  }

  async deployBTCDaiInitialCollateralizedSet(): Promise<SetTokenContract> {
    const name = DEPLOYED_TOKEN.BTCDaiInitialCollateralSet;
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
      constants.BTCDAI_BTD.DAI_MULTIPLIER,
      constants.BTCDAI_BTD.WBTC_MULTIPLIER,
      constants.DAI.FULL_TOKEN_UNITS,
      constants.WBTC.FULL_TOKEN_UNITS,
      constants.BTCDAI_BTD.PRICE_PRECISION,
    );
    const initialSetName = SetProtocolUtils.stringToBytes('BTCDAI');
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

  async deployBTCDaiRebalancingSetToken(): Promise<RebalancingSetTokenContract> {
    const name = DEPLOYED_TOKEN.BTCDaiRebalancingSetToken;
    let address = await getContractAddress(name);

    if (address) {
      return await RebalancingSetTokenContract.at(address, this._web3, TX_DEFAULTS);
    }

    const initialSetToken = await getContractAddress(DEPLOYED_TOKEN.BTCDaiInitialCollateralSet);
    const rebalancingSetFactoryAddress = await getContractAddress(RebalancingSetTokenFactory.contractName);
    const rebalancingManagerAddress = await getContractAddress(BTCDaiRebalancingManager.contractName);

    const initialSetParams = calculateGeneralInitialSetUnits(
      constants.DAI.PRICE,
      constants.WBTC.PRICE,
      constants.BTCDAI_BTD.DAI_MULTIPLIER,
      constants.BTCDAI_BTD.WBTC_MULTIPLIER,
      constants.DAI.FULL_TOKEN_UNITS,
      constants.WBTC.FULL_TOKEN_UNITS,
      constants.BTCDAI_BTD.PRICE_PRECISION,
    );
    const rebalancingSetUnitShares = calculateRebalancingSetUnitShares(
      initialSetParams['units'],
      initialSetParams['naturalUnit'],
      'DAI',
      'WBTC'
    );

    const rebalancingSetNaturalUnit = constants.DEFAULT_REBALANCING_NATURAL_UNIT;
    const rebalancingSetName = SetProtocolUtils.stringToBytes('BTD BTCDai Set');
    const rebalancingSetSymbol = SetProtocolUtils.stringToBytes('BTCDai');
    const rebalancingSetCallData = SetProtocolUtils.generateRebalancingSetTokenCallData(
      rebalancingManagerAddress,
      networkConstants.btcDaiProposalPeriod[this._networkConstant],
      networkConstants.btcDaiRebalanceInterval[this._networkConstant]
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
