require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreMockContract,
  RebalanceAuctionModuleContract,
  TWAPLiquidatorContract,
  RebalancingSetTokenV3Contract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ether } from '@utils/units';
import {
  DEFAULT_GAS,
  ONE,
  ONE_DAY_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ZERO,
} from '@utils/constants';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';
import { OracleHelper } from 'set-protocol-oracles';
import { RebalancingSetV3Helper } from '@utils/helpers/rebalancingSetV3Helper';
import { ValuationHelper } from '@utils/helpers/valuationHelper';
import { RebalanceTestSetup, PriceUpdate } from '@utils/helpers/rebalanceTestSetup';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { SetProtocolUtils: SetUtils } = setProtocolUtils;
const { expect } = chai;
const blockchain = new Blockchain(web3);

interface RebalancingSetDetails {
  unitShares: BigNumber;
  naturalUnit: BigNumber;
  supply: BigNumber;
}

interface SetDetails {
  components: string[];
  units: BigNumber[];
  naturalUnit: BigNumber;
}

interface ComponentSettings {
  component1Price: BigNumber;
  component2Price: BigNumber;
  component1Decimals: number;
  component2Decimals: number;
}

interface AuctionSettings {
  chunkSize: BigNumber;
  chunkAuctionPeriod: BigNumber;
  component1PriceChange: BigNumber;
  component2PriceChange: BigNumber;
}

interface ScenarioAssertions {
  expectedAuctions: number;
}

interface TWAPScenario {
  name: string;
  rebalancingSet: RebalancingSetDetails;
  currentSet: SetDetails;
  nextSet: SetDetails;
  components: ComponentSettings;
  auction: AuctionSettings;
  asserts: ScenarioAssertions;
}

interface CheckPoint {
  setMarketCap: BigNumber;
  setValue: BigNumber;
  unitShares: BigNumber;
  auctionCounter: number;
  timestamp: BigNumber;
}

const scenarios: TWAPScenario[] = [
  {
    name: 'ETH 20 MA Set Rebalances 100% WETH to 100% USD',
    rebalancingSet: {
      unitShares: new BigNumber(2076796),
      naturalUnit: new BigNumber(1000000),
      supply: new BigNumber('20556237207015075000000'),
    },
    currentSet: {
      components: ['component1'], // ETH
      units: [new BigNumber(1000000)],
      naturalUnit: new BigNumber(1000000),
    },
    nextSet: {
      components: ['component2'], // USDC
      units: [new BigNumber(307)],
      naturalUnit: new BigNumber(1000000000000),
    },
    components: {
      component1Price: ether(188),
      component2Price: ether(1),
      component1Decimals: 18,
      component2Decimals: 6,
    },
    auction: {
      chunkSize: ether(2000000),
      chunkAuctionPeriod: new BigNumber(3600), // 1 hour
      component1PriceChange: new BigNumber(0.02), // 2% increase in price 1
      component2PriceChange: ZERO,
    },
    asserts: {
      expectedAuctions: 5,
    },
  },
  {
    name: 'ETHBTC Set Rebalances 100% WETH to 50% WETH/WBTC',
    rebalancingSet: {
      unitShares: new BigNumber(799797),
      naturalUnit: new BigNumber(100000000),
      supply: new BigNumber('14256596210800000000000'),
    },
    currentSet: {
      components: ['component1'], // WETH
      units: [new BigNumber(1000000)],
      naturalUnit: new BigNumber(1000000),
    },
    nextSet: {
      components: ['component1', 'component2'], // WETH, WBTC
      units: [new BigNumber(484880000000000), new BigNumber(1000)],
      naturalUnit: new BigNumber(10000000000000),
    },
    components: {
      component1Price: ether(188),
      component2Price: ether(9000),
      component1Decimals: 18,
      component2Decimals: 8,
    },
    auction: {
      chunkSize: ether(1000000),
      chunkAuctionPeriod: new BigNumber(0),
      component1PriceChange: new BigNumber(-0.02), // 2% decrease in ETH
      component2PriceChange: new BigNumber(-0.01), // 1% decrease in BTC
    },
    asserts: {
      expectedAuctions: 2,
    },
  },
  {
    name: 'ETH RSI Yield 100% ETH to 100% cUSDC $5M - 5/13/2020',
    rebalancingSet: {
      unitShares: new BigNumber(557211),
      naturalUnit: new BigNumber(1000000),
      supply: new BigNumber('21753937919075000000000'),
    },
    currentSet: {
      components: ['component1'], // WETH
      units: [new BigNumber(2097152)],
      naturalUnit: new BigNumber(1000000),
    },
    nextSet: {
      components: ['component2'], // cUSDc
      units: [new BigNumber(16384)],
      naturalUnit: new BigNumber(10000000000),
    },
    components: {
      component1Price: ether(200),
      component2Price: ether(0.021),
      component1Decimals: 18,
      component2Decimals: 8,
    },
    auction: {
      chunkSize: ether(1000000),
      chunkAuctionPeriod: new BigNumber(0),
      component1PriceChange: ZERO,
      component2PriceChange: ZERO,
    },
    asserts: {
      expectedAuctions: 6,
    },
  },
  {
    name: '100% cUSDC to 50/50% wBTC/cUSDC #706',
    rebalancingSet: {
      unitShares: new BigNumber(296562),
      naturalUnit: new BigNumber(100000000),
      supply: new BigNumber('37566900000000000000'),
    },
    currentSet: {
      components: ['component1'], // cUSDC
      units: [new BigNumber(166187652)],
      naturalUnit: new BigNumber(1000000000000),
    },
    nextSet: {
      components: ['component1', 'component2'], // cUSDC, WBTC
      units: [new BigNumber(41946670), new BigNumber(100)],
      naturalUnit: new BigNumber(1000000000000),
    },
    components: {
      component1Price: ether(0.021),
      component2Price: ether(9000),
      component1Decimals: 8,
      component2Decimals: 8,
    },
    auction: {
      chunkSize: ether(1000000),
      chunkAuctionPeriod: new BigNumber(0),
      component1PriceChange: ZERO,
      component2PriceChange: ZERO,
    },
    asserts: {
      expectedAuctions: 1,
    },
  },
];


contract('RebalancingSetV3 - TWAPLiquidator Scenarios', accounts => {
  const [
    deployerAccount,
    managerAccount,
    feeRecipient,
  ] = accounts;

  let rebalancingSetToken: RebalancingSetTokenV3Contract;

  let liquidator: TWAPLiquidatorContract;

  const name: string = 'liquidator';
  const auctionPeriod: BigNumber = ONE_HOUR_IN_SECONDS.mul(4);
  const rangeStart: BigNumber = ether(.01);
  const rangeEnd: BigNumber = ether(.21);

  let setup: RebalanceTestSetup;
  let scenario: TWAPScenario;
  let checkPoints: CheckPoint[];
  let auctionCounter: number;

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

  before(async () => {
    ABIDecoder.addABI(CoreMockContract.getAbi());
    ABIDecoder.addABI(RebalanceAuctionModuleContract.getAbi());
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMockContract.getAbi());
    ABIDecoder.removeABI(RebalanceAuctionModuleContract.getAbi());
  });

  beforeEach(async () => {
    blockchain.saveSnapshotAsync();

    setup = new RebalanceTestSetup(deployerAccount);
    checkPoints = [];
    auctionCounter = 1;
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

  describe(`${scenarios[1].name}`, async () => {
    it('should successfully complete', async () => {
      await runScenario(scenarios[1]);
    });
  });

  describe(`${scenarios[2].name}`, async () => {
    it('should successfully complete', async () => {
      await runScenario(scenarios[2]);
    });
  });

  describe(`${scenarios[3].name}`, async () => {
    it('should successfully complete', async () => {
      await runScenario(scenarios[3]);
    });
  });

  async function runScenario(currentScenario: TWAPScenario): Promise<void> {
    scenario = currentScenario;

    await initialize();

    await printContext();

    await checkPoint(0);

    await startRebalance();
    await printRebalanceDetails();

    await runChunkAuctions();

    await setup.rebalancingSetToken.settleRebalance.sendTransactionAsync(
      { from: deployerAccount, gas: DEFAULT_GAS}
    );

    await checkPoint(1);

    await printResults();

    await runAssertions();
  }

  async function printContext(): Promise<void> {
    const { component1Price, component2Price } = scenario.components;

    const { set1, set2, oracleWhiteList, component1, component2 } = setup;

    const set1Component1Value = await valuationHelper.calculateAllocationValueAsync(
      set1,
      oracleWhiteList,
      component1.address,
    );
    const set1Component2Value = await valuationHelper.calculateAllocationValueAsync(
      set1,
      oracleWhiteList,
      component2.address,
    );
    const set2Component1Value = await valuationHelper.calculateAllocationValueAsync(
      set2,
      oracleWhiteList,
      component1.address,
    );
    const set2Component2Value = await valuationHelper.calculateAllocationValueAsync(
      set2,
      oracleWhiteList,
      component2.address,
    );

    const set1Value = set1Component1Value.plus(set1Component2Value);
    const set2Value = set2Component1Value.plus(set2Component2Value);

    const set1Component1Percent = set1Component1Value.div(set1Value).round(2, 3).mul(100);
    const set1Component2Percent = set1Component2Value.div(set1Value).round(2, 3).mul(100);
    const set2Component1Percent = set2Component1Value.div(set2Value).round(2, 3).mul(100);
    const set2Component2Percent = set2Component2Value.div(set2Value).round(2, 3).mul(100);

    const component1PercentageChange = set2Component1Percent.sub(set1Component1Percent);
    const component2PercentageChange = set2Component2Percent.sub(set1Component2Percent);

    console.log(`======================== Context ==========================`);

    console.log(`Component 1 Initial Price: ${deScale(component1Price).toString()}`);
    console.log(`Component 2 Initial Price: ${deScale(component2Price).toString()}`);

    console.log(`CurrentSet Value: ${deScale(set1Value).toString()}`);
    console.log(`CurrentSet Component 1 Percentage: ${set1Component1Percent.toString()}%`);
    console.log(`CurrentSet Component 2 Percentage: ${set1Component2Percent.toString()}%`);

    console.log(`NextSet Value: ${deScale(set2Value).toString()}`);
    console.log(`NextSet Component 1 Percentage: ${set2Component1Percent.toString()}%`);
    console.log(`NextSet Component 2 Percentage: ${set2Component2Percent.toString()}%`);

    console.log(`Component 1 % Change: ${component1PercentageChange}%`);
    console.log(`Component 2 % Change: ${component2PercentageChange}%`);
  }

  async function printRebalanceDetails(): Promise<void> {
    const { chunkSize } = scenario.auction;
    const unitShares = await setup.rebalancingSetToken.unitShares.callAsync();
    const naturalUnit = await setup.rebalancingSetToken.naturalUnit.callAsync();
    const currentSetQuantity = scenario.rebalancingSet.supply
                        .mul(unitShares)
                        .div(naturalUnit);
    const volume = await liquidatorHelper.calculateRebalanceVolumeAsync(
      setup.set1,
      setup.set2,
      setup.oracleWhiteList,
      currentSetQuantity,
    );
    const orderSize = await liquidator.getOrderSize.callAsync(setup.rebalancingSetToken.address);
    const minimumBid = await liquidator.minimumBid.callAsync(setup.rebalancingSetToken.address);
    const chunkSizeCS = await liquidator.getChunkSize.callAsync(setup.rebalancingSetToken.address);

    console.log(`Rebalance Volume: ${deScale(volume)}`);
    console.log(`Rebalance $ Chunk Size: ${deScale(chunkSize)}`);
    console.log(`Order Size: ${orderSize}`);
    console.log(`Chunk Size: ${chunkSizeCS}`);
    console.log(`Minimum Bid: ${minimumBid}`);
  }

  async function checkPoint(num: number): Promise<void> {
    const setValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
      setup.rebalancingSetToken,
      setup.oracleWhiteList
    );

    const unitShares = await setup.rebalancingSetToken.unitShares.callAsync();
    const totalSupply = await setup.rebalancingSetToken.totalSupply.callAsync();
    const setMarketCap = setValue.mul(totalSupply).div(10 ** 18).round(0, 3);
    const { timestamp } = await web3.eth.getBlock('latest');

    checkPoints[num] = {
      setMarketCap,
      setValue,
      unitShares,
      auctionCounter,
      timestamp,
    };
  }

  async function printResults(): Promise<void> {
    const t0 = checkPoints[0];
    const tN = checkPoints[checkPoints.length - 1];

    console.log(`======================== Results ==========================`);
    console.log(`Chunk Auctions Completed: ${auctionCounter}`);

    console.log(`RebalancingSet Value Before: ${deScale(t0.setValue).toString()}`);
    console.log(`RebalancingSet Value After: ${deScale(tN.setValue).toString()}`);

    console.log(`RebalancingSet MarketCap Before: ${deScale(t0.setMarketCap).toString()}`);
    console.log(`RebalancingSet MarketCap After: ${deScale(tN.setMarketCap).toString()}`);

    console.log(`unitShares Before: ${t0.unitShares}`);
    console.log(`unitShares After: ${tN.unitShares}`);
    console.log(`==================================================`);
  }

  function deScale(v1: BigNumber): BigNumber {
    return new BigNumber(v1).div(ether(1)).round(2, 3);
  }

  async function runAssertions(): Promise<void> {
    const rebalanceState = await setup.rebalancingSetToken.rebalanceState.callAsync();

    expect(rebalanceState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.DEFAULT);
    expect(auctionCounter).to.equal(scenario.asserts.expectedAuctions);
  }

  // Sets up assets, creates and mints rebalancing set
  async function initialize(): Promise<void> {
    await setup.initializeCore();
    await setup.initializeComponents(scenario.components);
    await setup.initializeBaseSets({
      set1Components: _.map(scenario.currentSet.components, component => setup[component].address),
      set2Components: _.map(scenario.nextSet.components, component => setup[component].address),
      set1Units: scenario.currentSet.units,
      set2Units: scenario.nextSet.units,
      set1NaturalUnit: scenario.currentSet.naturalUnit,
      set2NaturalUnit: scenario.nextSet.naturalUnit,
    });

    const assetPairVolumeBounds = [
      {
        assetOne: setup.component1.address,
        assetTwo: setup.component2.address,
        bounds: {lower: ether(10 ** 4), upper: ether(10 ** 7)},
      },
      {
        assetOne: setup.component2.address,
        assetTwo: setup.component3.address,
        bounds: {lower: ZERO, upper: ether(10 ** 6)},
      },
    ];

    liquidator = await liquidatorHelper.deployTWAPLiquidatorAsync(
      setup.core.address,
      setup.oracleWhiteList.address,
      auctionPeriod,
      rangeStart,
      rangeEnd,
      assetPairVolumeBounds,
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
      ZERO, // entry fee
      ZERO, // rebalance fee
      scenario.rebalancingSet.unitShares
    );

    await setup.setRebalancingSet(rebalancingSetToken);

    await setup.mintRebalancingSets(scenario.rebalancingSet.supply);

  }

  async function startRebalance(): Promise<void> {
    const { chunkSize, chunkAuctionPeriod } = scenario.auction;

    const liquidatorData = liquidatorHelper.generateTWAPLiquidatorCalldata(chunkSize, chunkAuctionPeriod);
    await rebalancingHelper.transitionToRebalanceV2Async(
      setup.core,
      setup.rebalancingComponentWhiteList,
      setup.rebalancingSetToken,
      setup.set2,
      managerAccount,
      liquidatorData,
    );
  }

  async function runChunkAuctions(): Promise<void> {
    const {chunkAuctionPeriod } = scenario.auction;

    while (await hasNextAuction()) {
      console.log(`==================================================`);
      console.log('Auction ', auctionCounter);

      const timeToFV = ONE_HOUR_IN_SECONDS.div(6);
      await blockchain.increaseTimeAsync(timeToFV);
      await blockchain.mineBlockAsync();

      const deployerComponent1 = await setup.component1.balanceOf.callAsync(deployerAccount);
      const deployerComponent2 = await setup.component2.balanceOf.callAsync(deployerAccount);

      // Bid the entire quantity
      const remainingBids = await liquidator.remainingCurrentSets.callAsync(setup.rebalancingSetToken.address);
      await rebalancingHelper.bidAndWithdrawAsync(
        setup.rebalanceAuctionModule,
        setup.rebalancingSetToken.address,
        remainingBids,
      );

      await printAuction(deployerComponent1, deployerComponent2);

      // If not the last auction, then iterate to next auction
      if (await hasNextAuction()) {
        await blockchain.increaseTimeAsync(chunkAuctionPeriod);

        await updatePrices();

        await blockchain.mineBlockAsync();

        await liquidator.iterateChunkAuction.sendTransactionAsync(
          setup.rebalancingSetToken.address,
          { from: deployerAccount, gas: DEFAULT_GAS }
        );

        auctionCounter++;
      }
    }

    async function hasNextAuction(): Promise<boolean> {
      const totalRemaining = await liquidator.getTotalSetsRemaining.callAsync(setup.rebalancingSetToken.address);
      const minBid = await liquidator.minimumBid.callAsync(setup.rebalancingSetToken.address);

      return totalRemaining.gte(minBid);
    }

    async function updatePrices(): Promise<void> {
      const { component1PriceChange, component2PriceChange, } = scenario.auction;
      const priceUpdate: PriceUpdate = {};

      if (!component1PriceChange.isZero()) {
        const existingComponent1Price = await setup.component1Oracle.read.callAsync();
        priceUpdate.component1Price = existingComponent1Price.mul(ONE.plus(component1PriceChange));
      }

      if (!component2PriceChange.isZero()) {
        const existingComponent2Price = await setup.component2Oracle.read.callAsync();
        priceUpdate.component2Price = existingComponent2Price.mul(ONE.plus(component2PriceChange));
      }

      await setup.jumpTimeAndUpdateOracles(ZERO, priceUpdate);
    }
  }

  async function printAuction(deployerComponent1: BigNumber, deployerComponent2: BigNumber): Promise<void> {
    const totalRemaining = await liquidator.getTotalSetsRemaining.callAsync(setup.rebalancingSetToken.address);
    const timestamp = await liquidator.getLastChunkAuctionEnd.callAsync(setup.rebalancingSetToken.address);
    const remainingCurrentSets = await liquidator.remainingCurrentSets.callAsync(setup.rebalancingSetToken.address);

    const deployerComponent1Post = await setup.component1.balanceOf.callAsync(deployerAccount);
    const deployerComponent2Post = await setup.component2.balanceOf.callAsync(deployerAccount);

    const existingComponent1Price = await setup.component1Oracle.read.callAsync();
    const existingComponent2Price = await setup.component2Oracle.read.callAsync();

    const component1ChangeUSD = await valuationHelper.computeTokenDollarAmount(
      existingComponent1Price,
      deployerComponent1Post.sub(deployerComponent1),
      new BigNumber(scenario.components.component1Decimals),
    );
    const component2ChangeUSD = await valuationHelper.computeTokenDollarAmount(
      existingComponent2Price,
      deployerComponent2Post.sub(deployerComponent2),
      new BigNumber(scenario.components.component2Decimals),
    );

    console.log('Component 1 Price: ', deScale(existingComponent1Price).toString());
    console.log('Component 2 Price: ', deScale(existingComponent2Price).toString());

    console.log('Component 1 Bidder $ Delta: ', deScale(component1ChangeUSD).toString());
    console.log('Component 2 Bidder $ Delta: ', deScale(component2ChangeUSD).toString());

    console.log(`Total Order Remaining: ${totalRemaining}`);
    console.log(`Auction Remaining Sets: ${remainingCurrentSets}`);
    console.log(`Completion Timestamp: ${timestamp}`);
  }
});
