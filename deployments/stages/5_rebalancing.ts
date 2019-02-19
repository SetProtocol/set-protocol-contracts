import { SetProtocolUtils } from 'set-protocol-utils';
import BigNumber from 'bignumber.js';

import { DeploymentStageInterface } from '../../types/deployment_stage_interface';

import { getContractAddress, deployContract, TX_DEFAULTS, getNetworkId, getNetworkName, findDependency, getPrivateKey } from '../utils/blockchain';
import { BTCETHRebalancingManagerContract, SetTokenContract, CoreContract, RebalancingSetTokenContract } from '../../utils/contracts';
import { BTCETHRebalancingManager } from '../../artifacts/ts/BTCETHRebalancingManager';

import networkConstants from '../network-constants';
import dependencies from '../dependencies';
import constants from '../constants';
import { RebalancingSetToken } from '../../artifacts/ts/RebalancingSetToken';
import { calculateInitialSetUnits, calculateRebalancingSetUnitShares } from '../utils/rebalancing';

export class RebalancingStage implements DeploymentStageInterface {

  private _web3: any;
  private _networkName: string;
  private _privateKey: string;
  private _coreContract: CoreContract;

  async deploy(web3: any): Promise<any> {
    console.log('Deploying rebalancing...');

    this._web3 = web3;
    this._privateKey = getPrivateKey();
    this._networkName = getNetworkName();

    let coreAddress = await getContractAddress('Core');
    let deployerAccount = this._web3.eth.accounts.privateKeyToAccount(this._privateKey);
    this._coreContract = await CoreContract.at(coreAddress, this._web3, {from: deployerAccount.address});

    let rebalancingManager = await this.deployBitEthRebalancingManager();
    let initialSet = await this.deployInitialCollateralizedSet();
    let rebalancingSet = await this.deployBitEthRebalancingSetToken();
  }

  async deployBitEthRebalancingManager(): Promise<BTCETHRebalancingManagerContract> {
    let name = 'BitEthRebalanceManager';
    let address = await getContractAddress(name);

    if (address) {
      return await BTCETHRebalancingManagerContract.at(address, this._web3, TX_DEFAULTS);
    }

    let coreAddress = await getContractAddress('Core');
    let setTokenFactoryAddress = await getContractAddress('SetTokenFactory');
    let linearAuctionCurveAddress = await getContractAddress('LinearAuctionPriceCurve');
    let wbtcMedianizerAddress = await findDependency('WBTC_MEDIANIZER');
    let wethMedianizerAddress = await findDependency('WETH_MEDIANIZER');
    let wbtcAddress = await findDependency('WBTC');
    let wethAddress = await findDependency('WETH');

    let data = new this._web3.eth.Contract(BTCETHRebalancingManager.abi).deploy({
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
        constants.WBTC_MULTIPLIER.toString(),
        constants.WETH_MULTIPLIER.toString()
      ]
    }).encodeABI();

    address = await deployContract(data, this._web3, name);
    return await BTCETHRebalancingManagerContract.at(address, this._web3, TX_DEFAULTS);
  }

  async deployInitialCollateralizedSet(): Promise<SetTokenContract> {
    let name = 'InitialCollateralSet';
    let address = await getContractAddress(name);

    if (address) {
      return await SetTokenContract.at(address, this._web3, TX_DEFAULTS);
    }

    let setTokenFactoryAddress = await getContractAddress('SetTokenFactory');
    let wbtcAddress = await findDependency('WBTC');
    let wethAddress = await findDependency('WETH');

    const initialSetParams = calculateInitialSetUnits();
    const initialSetName = SetProtocolUtils.stringToBytes('BTCETH');
    const initialSymbol = SetProtocolUtils.stringToBytes('BTCETH');

    console.log(setTokenFactoryAddress);
    console.log(wbtcAddress);
    console.log(wethAddress);
    console.log(this._coreContract.address);
    console.log(initialSetParams);
    console.log([wbtcAddress, wethAddress]);

    console.log(initialSetParams['units']);
    console.log(initialSetParams['naturalUnit']);
    console.log(SetProtocolUtils.stringToBytes(''));

    let data = await this._coreContract.create.getABIEncodedTransactionData(
      setTokenFactoryAddress,
      [wbtcAddress, wethAddress],
      initialSetParams['units'],
      initialSetParams['naturalUnit'],
      initialSetName,
      initialSymbol,
      SetProtocolUtils.stringToBytes('')
    );

    console.log(data);

    address = await deployContract(data, this._web3, name);
    return await SetTokenContract.at(address, this._web3, TX_DEFAULTS);
  }

  async deployBitEthRebalancingSetToken(): Promise<RebalancingSetTokenContract> {
    let name = 'BitEthRebalancingSetToken';
    let address = await getContractAddress(name);

    if (address) {
      return await RebalancingSetTokenContract.at(address, this._web3, TX_DEFAULTS);
    }

    let initialSetToken = await getContractAddress('InitialCollateralSet');
    let rebalancingSetFactoryAddress = await getContractAddress('RebalancingSetTokenFactory');
    let rebalancingManagerAddress = await getContractAddress('BitEthRebalanceManager');

    const initialSetParams = calculateInitialSetUnits();
    const rebalancingSetUnitShares = calculateRebalancingSetUnitShares(
      initialSetParams['units'],
      initialSetParams['naturalUnit'],
    );

    const rebalancingSetNaturalUnit = constants.DEFAULT_REBALANCING_NATURAL_UNIT;
    const rebalancingSetName = SetProtocolUtils.stringToBytes('BitEth Set');
    const rebalancingSetSymbol = SetProtocolUtils.stringToBytes('BTCETH');
    const rebalancingSetCallData = SetProtocolUtils.generateRSetTokenCallData(
      rebalancingManagerAddress,
      networkConstants.bitEthRebalanceManagerProposalPeriod[this._networkName],
      networkConstants.bitEthRebalanceManagerRebalanceInterval[this._networkName]
    );

    let data = this._coreContract.create.getABIEncodedTransactionData(
      rebalancingSetFactoryAddress,
      [initialSetToken],
      rebalancingSetUnitShares,
      rebalancingSetNaturalUnit,
      rebalancingSetName,
      rebalancingSetSymbol,
      rebalancingSetCallData,
      TX_DEFAULTS
    );

    address = await deployContract(data, this._web3, name);
    return await RebalancingSetTokenContract.at(address, this._web3, TX_DEFAULTS);
  }

}