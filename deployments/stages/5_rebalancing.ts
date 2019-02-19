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
    let linearAuctionCurveAddress = await getContractAddress('ConstantAuctionPriceCurve');
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

    address = await deployContract(data, this._web3, this._privateKey, name);
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

    const initialSetParams = this.calculateInitialSetUnits();
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

    let data = await this._coreContract.create.sendTransactionAsync(
      setTokenFactoryAddress,
      [wbtcAddress, wethAddress],
      initialSetParams['units'],
      initialSetParams['naturalUnit'],
      initialSetName,
      initialSymbol,
      SetProtocolUtils.stringToBytes('')
    );

    console.log(data);

    address = await deployContract(data, this._web3, this._privateKey, name);
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

    const initialSetParams = this.calculateInitialSetUnits();
    const rebalancingSetUnitShares = this.calculateRebalancingSetUnitShares(
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

    address = await deployContract(data, this._web3, this._privateKey, name);
    return await RebalancingSetTokenContract.at(address, this._web3, TX_DEFAULTS);
  }

  calculateInitialSetUnits() {
    let units = [];
    let naturalUnit: BigNumber = new BigNumber(0);

    let WBTC_PRICE = constants.WBTC_PRICE;
    let WBTC_MULTIPLIER = constants.WBTC_MULTIPLIER;
    let WETH_MULTIPLIER = constants.WETH_MULTIPLIER;
    let WETH_PRICE = constants.WETH_PRICE;
    let DECIMAL_DIFFERENCE_MULTIPLIER = constants.WETH_FULL_TOKEN_UNITS.div(constants.WBTC_FULL_TOKEN_UNITS);
    let PRICE_PRECISION = constants.PRICE_PRECISION;

    if (WBTC_PRICE.greaterThanOrEqualTo(WETH_PRICE)) {
      const ethUnits = WBTC_PRICE.mul(DECIMAL_DIFFERENCE_MULTIPLIER).div(WETH_PRICE).round(0, 3);
      units = [
        constants.DEFAULT_WBTC_UNIT.mul(WBTC_MULTIPLIER).toNumber(),
        ethUnits.mul(WETH_MULTIPLIER).toNumber()
      ];
      naturalUnit = constants.DEFAULT_REBALANCING_NATURAL_UNIT;
    } else {
      const btcUnits = WETH_PRICE.mul(PRICE_PRECISION).div(WBTC_PRICE).round(0, 3);
      const ethUnits = PRICE_PRECISION.mul(DECIMAL_DIFFERENCE_MULTIPLIER);
      units = [
        btcUnits.mul(WBTC_MULTIPLIER).toNumber(),
        ethUnits.mul(WETH_MULTIPLIER).toNumber()
      ];
      naturalUnit = constants.WETH_DOMINANT_REBALANCING_NATURAL_UNIT;
    }
  
    return {
      units,
      naturalUnit,
    };
  }

  calculateRebalancingSetUnitShares(
    initialSetUnits,
    initialSetNaturalUnit
  ) {
    const btcUnitsInFullToken = constants.SET_FULL_TOKEN_UNITS
                                  .mul(initialSetUnits[0])
                                  .div(initialSetNaturalUnit)
                                  .round(0, 3);
    const ethUnitsInFullToken = constants.SET_FULL_TOKEN_UNITS
                                  .mul(initialSetUnits[1])
                                  .div(initialSetNaturalUnit)
                                  .round(0, 3);
  
    const btcDollarAmount = constants.WBTC_PRICE.mul(btcUnitsInFullToken).div(constants.WBTC_FULL_TOKEN_UNITS).round(0, 3);
    const ethDollarAmount = constants.WETH_PRICE.mul(ethUnitsInFullToken).div(constants.WETH_FULL_TOKEN_UNITS).round(0, 3);
  
    const initialSetDollarAmount = btcDollarAmount.add(ethDollarAmount);
    return [constants.REBALANCING_SET_USD_PRICE
            .div(initialSetDollarAmount)
            .mul(constants.DEFAULT_REBALANCING_NATURAL_UNIT)
            .round(0,3)]; 
  }
  

}