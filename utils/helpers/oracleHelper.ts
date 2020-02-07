import * as _ from 'lodash';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import {
  FeedFactoryContract,
  MedianContract,
  OracleWhiteListContract,
  PriceFeedContract,
  UpdatableOracleMockContract
} from '../contracts';
import { getWeb3, getContractInstance, txnFrom } from '../web3Helper';
import { DEFAULT_GAS } from '../constants';
import { FeedCreatedArgs } from '../contract_logs/oracle';

const web3 = getWeb3();
const FeedFactory = artifacts.require('FeedFactory');
const Median = artifacts.require('Median');
const UpdatableOracleMock = artifacts.require('UpdatableOracleMock');

const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const setUtils = new SetUtils(web3);


export class OracleHelper {
  private _contractOwnerAddress: Address;

  constructor(contractOwnerAddress: Address) {
    this._contractOwnerAddress = contractOwnerAddress;
  }

  /* ============ Deployment ============ */

  public async deployFeedFactoryAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<FeedFactoryContract> {
    const feedFactory = await FeedFactory.new(txnFrom(from));

    return new FeedFactoryContract(
      getContractInstance(feedFactory),
      txnFrom(from),
    );
  }

  public async deployPriceFeedAsync(
    feedFactory: FeedFactoryContract,
    from: Address = this._contractOwnerAddress
  ): Promise<PriceFeedContract> {
    const txHash = await feedFactory.create.sendTransactionAsync(
      txnFrom(from),
    );

    const logs = await setTestUtils.getLogsFromTxHash(txHash);
    const createLog = logs[logs.length - 1];
    const args: FeedCreatedArgs = createLog.args;

    return await PriceFeedContract.at(
      args.feed,
      web3,
      txnFrom(from)
    );
  }

  public async deployMedianizerAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<MedianContract> {
    const medianizer = await Median.new(txnFrom(from));

    return new MedianContract(
      getContractInstance(medianizer),
      txnFrom(from),
    );
  }

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

  /* ============ Transactions ============ */

  public async addPriceFeedOwnerToMedianizer(
    medianizer: MedianContract,
    priceFeedSigner: Address,
    from: Address = this._contractOwnerAddress
  ): Promise<string> {
    return await medianizer.lift.sendTransactionAsync(
      priceFeedSigner,
      txnFrom(from),
    );
  }

  public async setMedianizerMinimumQuorumAsync(
    medianizer: MedianContract,
    minimum: number,
    from: Address = this._contractOwnerAddress
  ): Promise<string> {
    return await medianizer.setMin.sendTransactionAsync(
      new BigNumber(minimum),
      txnFrom(from),
    );
  }

  public async updatePriceFeedAsync(
    priceFeed: PriceFeedContract,
    price: BigNumber,
    timeStamp: BigNumber,
    from: Address = this._contractOwnerAddress
  ): Promise<string> {
    return await priceFeed.poke.sendTransactionAsync(
      price,
      timeStamp,
      txnFrom(from),
    );
  }

  /*
    This is disconnected from the v1 system where price feeds are updated first and then
    the medianizer reads from each price feed to determine the median. In the new system,
    The oracles are off chain, sign their price updates, and then send them all to the medianizer
    which now expects N (new prices, timestamps, signatures)

    Makes a number of assumptions:
    1. Price update is signed by ownerAccount
    2. Only one price is used to update the price
    3. Only one timestmap is used to update the timestamp
    4. Quorum on price feed is 1
    4. OwnerAccount is added as approved oracle on medianizer
  */
  public async updateMedianizerPriceAsync(
    medianizer: MedianContract,
    price: BigNumber,
    timestamp: BigNumber,
    from: Address = this._contractOwnerAddress
  ): Promise<string> {
    const standardSignature = SetUtils.hashPriceFeedHex(price, timestamp);
    const ecSignature = await setUtils.signMessage(standardSignature, from);

    return await medianizer.poke.sendTransactionAsync(
      [price],
      [timestamp],
      [new BigNumber(ecSignature.v)],
      [ecSignature.r],
      [ecSignature.s],
      txnFrom(from)
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
