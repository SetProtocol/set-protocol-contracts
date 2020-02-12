import * as _ from 'lodash';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import {
  OracleWhiteListContract,
} from '../contracts';
import {
  UpdatableOracleMockContract
} from 'set-protocol-oracles';

import { getWeb3, getContractInstance, importFromOracles, txnFrom } from '../web3Helper';
import { DEFAULT_GAS } from '../constants';

const web3 = getWeb3();

const UpdatableOracleMock = importFromOracles('UpdatableOracleMock');

export class OracleHelper {
  private _contractOwnerAddress: Address;

  constructor(contractOwnerAddress: Address) {
    this._contractOwnerAddress = contractOwnerAddress;
  }

  /* ============ Deployment ============ */

  public async deployUpdatableOracleMocksAsync(
    startingPrices: BigNumber[],
    from: Address = this._contractOwnerAddress
  ): Promise<UpdatableOracleMockContract[]> {
    const mockOracles: UpdatableOracleMockContract[] = [];
    const oraclePromises = _.map(startingPrices, async price => {
      return await UpdatableOracleMock.new(
        price,
        txnFrom(from)
      );
    });

    await Promise.all(oraclePromises).then(oracles => {
      _.each(oracles, oracleMock => {
        mockOracles.push(new UpdatableOracleMockContract(
          new web3.eth.Contract(oracleMock.abi, oracleMock.address),
          txnFrom(from)
        ));
      });
    });

    return mockOracles;
  }

  public async deployUpdatableOracleMockAsync(
    price: BigNumber,
    from: Address = this._contractOwnerAddress
  ): Promise<UpdatableOracleMockContract> {
    const oracleMock = await UpdatableOracleMock.new(price, txnFrom(from));

    return new UpdatableOracleMockContract(getContractInstance(oracleMock), txnFrom(from));
  }

  public getUpdatableOracleMockInstance(
     oracleAddress: Address,
     from: Address = this._contractOwnerAddress,
  ): UpdatableOracleMockContract {
    return new UpdatableOracleMockContract(
      getContractInstance(UpdatableOracleMock, oracleAddress),
      { from, gas: DEFAULT_GAS },
    );
  }

  /* ============ Getters ============ */

  public async getComponentPricesAsync(
    components: Address[],
    oracleWhiteList: OracleWhiteListContract,
    from: Address = this._contractOwnerAddress
  ): Promise<BigNumber[]> {
    const componentOracles = await oracleWhiteList.getOracleAddressesByToken.callAsync(components);

    const oracleInstances = _.map(componentOracles, address => {
      return this.getUpdatableOracleMockInstance(address);
    });

    const oraclePricePromises = _.map(oracleInstances, async oracle => {
      return await oracle.read.callAsync();
    });
    return await Promise.all(oraclePricePromises);
  }
}
