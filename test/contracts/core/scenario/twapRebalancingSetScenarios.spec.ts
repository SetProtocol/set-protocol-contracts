require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  TWAPLiquidatorContract,
  SetTokenContract,
  RebalancingSetTokenV3Contract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ether, gWei } from '@utils/units';
import { AssetChunkSizeBounds } from '@utils/auction';
import {
  DEFAULT_GAS,
  ONE_DAY_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ZERO,
} from '@utils/constants';
import { expectRevertError } from '@utils/tokenAssertions';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';
import { OracleHelper } from 'set-protocol-oracles';
import { RebalancingSetV3Helper } from '@utils/helpers/rebalancingSetV3Helper';
import { ValuationHelper } from '@utils/helpers/valuationHelper';
import { RebalanceTestSetup } from '@utils/helpers/rebalanceTestSetup';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const CoreMock = artifacts.require('CoreMock');
const { SetProtocolUtils: SetUtils } = setProtocolUtils;
const { expect } = chai;
const blockchain = new Blockchain(web3);

const scenarios = [
  {
    name: 'ETH 20 MA Set Rebalances WETH to USD',
    rebalancingSet: {
      unitShares: new BigNumber(2076796),
      naturalUnit: new BigNumber(1000000),
      supply: new BigNumber('20556237207015075000000')
    },
    currentSet: {
      components: ['WETH'],
      units: [new BigNumber(1000000)],
      naturalUnit: new BigNumber(1000000),
    },
    nextSet: {
      components: ['USDC'],
      units: [new BigNumber(307)],
      naturalUnit: new BigNumber(1000000000000),
    },
    prices: {
      component1: ether(188),
      component2: ether(1),
    },
    auction: {
      chunkSize: ether(1000000),
      chunkAuctionPeriod: new BigNumber(0),
      expectedAuctions: 4,
    }
  }
];


contract('RebalancingSetV3 - TWAPLiquidator Scenarios', accounts => {
  const [
    deployerAccount,
    managerAccount,
    otherAccount,
    feeRecipient,
  ] = accounts;

  let rebalancingSetToken: RebalancingSetTokenV3Contract;

  let liquidator: TWAPLiquidatorContract;

  let name: string = 'liquidator';
  let auctionPeriod: BigNumber = ONE_HOUR_IN_SECONDS.mul(4);
  let rangeStart: BigNumber = new BigNumber(1);
  let rangeEnd: BigNumber = new BigNumber(21);

  const coreHelper = new CoreHelper(deployerAccount, deployerAccount);
  const erc20Helper = new ERC20Helper(deployerAccount);
  const rebalancingHelper = new RebalancingSetV3Helper(
    deployerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );
  const oracleHelper = new OracleHelper(deployerAccount);
  const valuationHelper = new ValuationHelper(deployerAccount, coreHelper, erc20Helper, oracleHelper);
  const liquidatorHelper = new LiquidatorHelper(deployerAccount, erc20Helper, valuationHelper);

  const setup = new RebalanceTestSetup(deployerAccount);

  before(async () => {
    ABIDecoder.addABI(CoreMock.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMock.abi);
  });

  beforeEach(async () => {
    blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe(`${scenarios[0].name}`, async () => {

    it('should successfully complete', async () => {
      await runScenario(scenarios[0]);

      const newRebalanceState = await setup.rebalancingSetToken.rebalanceState.callAsync();
      expect(newRebalanceState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.DEFAULT);
    });
  });

  async function runScenario(scenario: any): Promise<void> {
    await initializeScenario(scenario);

    const { chunkSize, expectedAuctions, chunkAuctionPeriod, rebalancingSet } = scenario.auction;

    const volume = await liquidatorHelper.calculateRebalanceVolumeAsync(
      setup.set1,
      setup.set2,
      setup.oracleWhiteList,
      scenario.rebalancingSet.supply,
    );

    console.log("Rebalance volume", volume.div(10 ** 18).toString());

    const liquidatorData = liquidatorHelper.generateTWAPLiquidatorCalldata(chunkSize, chunkAuctionPeriod);
    await rebalancingHelper.transitionToRebalanceV2Async(
      setup.core,
      setup.rebalancingComponentWhiteList,
      setup.rebalancingSetToken,
      setup.set2,
      managerAccount,
      liquidatorData,
    );
    
    // Loop through number of auctions
    for (let i = 0; i < expectedAuctions; i++) {
      console.log("Auction ", i);

      const timeToFV = ONE_HOUR_IN_SECONDS.div(6);
      await blockchain.increaseTimeAsync(timeToFV);
      await blockchain.mineBlockAsync();

      const bidQuantity = await getMaxBiddableQuantity(setup.rebalancingSetToken.address);
      await rebalancingHelper.placeBidAsync(
        setup.rebalanceAuctionModule,
        setup.rebalancingSetToken.address,
        bidQuantity,
      );

      // If not the last auction
      if (i + 1 < expectedAuctions) {
        await blockchain.increaseTimeAsync(chunkAuctionPeriod);
        await blockchain.mineBlockAsync();

        await liquidator.iterateChunkAuction.sendTransactionAsync(
          setup.rebalancingSetToken.address,
          { from: deployerAccount, gas: DEFAULT_GAS }
        );
      }
        // Wait until 1% FV then place bids
        // If not the last auction, run iterate
      // If last auction, call settle

    }

    await setup.rebalancingSetToken.settleRebalance.sendTransactionAsync(
      { from: deployerAccount, gas: DEFAULT_GAS}
    );
  }

  // Sets up assets, creates and mints rebalancing set
  async function initializeScenario(scenario: any): Promise<void> {
    await setup.initializeCore();
    await setup.initializeComponents({
      component1Price: scenario.prices.component1,
      component2Price: scenario.prices.component2
    });
    await setup.initializeBaseSets({
      set1Components: [setup.component1.address],
      set2Components: [setup.component2.address],
      set1Units: scenario.currentSet.units,
      set2Units: scenario.nextSet.units,
      set1NaturalUnit: scenario.currentSet.naturalUnit,
      set2NaturalUnit: scenario.nextSet.naturalUnit,
    });

    const assetPairHashes: string[] = [
      liquidatorHelper.generateAssetPairHashes(setup.component1.address, setup.component2.address),
    ];
    const assetPairBounds: AssetChunkSizeBounds[] = [
      {min: ZERO, max: ether(10 ** 10)},
    ];

    liquidator = await liquidatorHelper.deployTWAPLiquidatorAsync(
      setup.core.address,
      setup.oracleWhiteList.address,
      auctionPeriod,
      rangeStart,
      rangeEnd,
      assetPairHashes,
      assetPairBounds,
      name,
    );
    await coreHelper.addAddressToWhiteList(liquidator.address, setup.liquidatorWhitelist);

    const failPeriod = ONE_DAY_IN_SECONDS;
    const { timestamp: lastRebalanceTimestamp } = await web3.eth.getBlock('latest');
    rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV3Async(
      setup.core,
      setup.rebalancingFactory.address,
      managerAccount,
      liquidator.address,
      feeRecipient,
      setup.fixedFeeCalculator.address,
      setup.set1.address,
      failPeriod,
      lastRebalanceTimestamp,
      scenario.rebalancingSet.unitShares
    );

    await setup.setRebalancingSet(rebalancingSetToken);

    await setup.mintRebalancingSets(scenario.rebalancingSet.supply);    
  }

  async function getMaxBiddableQuantity(rebalancingSetTokenAddress: Address): Promise<BigNumber> {
    const remainingBids = await liquidator.remainingCurrentSets.callAsync(rebalancingSetTokenAddress);
    const minBid = await liquidator.minimumBid.callAsync(rebalancingSetTokenAddress);
    return liquidatorHelper.calculateChunkAuctionMaximumBid(remainingBids, minBid);
  }
});
