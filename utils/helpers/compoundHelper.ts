import * as _ from 'lodash';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import { StandardTokenMockContract } from '../contracts';

import { getWeb3 } from '../web3Helper';
import { ether } from '../units';

import { UNLIMITED_ALLOWANCE_IN_BASE_UNITS, DEFAULT_GAS } from '../constants';

import { ComptrollerABI } from '../external/abis/compound/ComptrollerABI';
import { InterestRateModelABI } from '../external/abis/compound/InterestRateModelABI';
import { PriceOracleABI } from '../external/abis/compound/PriceOracleABI';

import { CONTRACTS, PERMISSIONED_ACCOUNTS } from '../compoundSnapshotAddresses';

const web3 = getWeb3();


export class CompoundHelper {

  public priceOracle: Address = CONTRACTS.PriceOracle;
  public interestRateModel: Address = CONTRACTS.InterestRateModel;
  public comptroller: Address = CONTRACTS.Comptroller;

  constructor() {}

  /* ============ Kyber Network System Methods ============ */

  public async setup() {
    // const PriceOracleContract = new web3.eth.Contract(PriceOracleABI, this.priceOracle);
    const InterestRateModelContract = new web3.eth.Contract(InterestRateModelABI, this.interestRateModel);
    const ComptrollerContract = new web3.eth.Contract(ComptrollerABI, this.comptroller);

    // const isPriceOracle = await PriceOracleContract.methods.isPriceOracle().call();
    // console.log("IsPriceOracle", isPriceOracle);

    const admin = await ComptrollerContract.methods.admin().call();
    console.log("Comptroller Admin", admin);

    await new web3.eth.Contract(PriceOracleABI).deploy();
  }
}
