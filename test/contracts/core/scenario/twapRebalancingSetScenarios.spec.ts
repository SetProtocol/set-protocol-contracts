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
    name: 'ETH 20 MA Set Rebalances 100% WETH to 100% USD',
    rebalancingSet: {
      unitShares: new BigNumber(2076796),
      naturalUnit: new BigNumber(1000000),
      supply: new BigNumber('20556237207015075000000')
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
    prices: {
      component1Price: ether(188),
      component2Price: ether(1),
      component1Decimals: 18,
      component2Decimals: 6,
    },
    auction: {
      chunkSize: ether(1000000),
      chunkAuctionPeriod: new BigNumber(0),
      expectedAuctions: 3,
    }
  },
{
    name: 'ETHBTC Set Rebalances 100% WETH to 50% WETH/WBTC',
    rebalancingSet: {
      unitShares: new BigNumber(799797),
      naturalUnit: new BigNumber(100000000),
      supply: new BigNumber('14256596210800000000000')
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
      expectedAuctions: 2,
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

  let setup: RebalanceTestSetup;

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
    ABIDecoder.addABI(CoreMock.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMock.abi);
  });

  beforeEach(async () => {
    blockchain.saveSnapshotAsync();

    setup = new RebalanceTestSetup(deployerAccount);
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

    console.log("Rebalance volume", volume.div(10 ** 18).round(0, 3).toString());

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

      // If not the last auction, then iterate to next auction
      if (i + 1 < expectedAuctions) {
        await blockchain.increaseTimeAsync(chunkAuctionPeriod);
        await blockchain.mineBlockAsync();

        await liquidator.iterateChunkAuction.sendTransactionAsync(
          setup.rebalancingSetToken.address,
          { from: deployerAccount, gas: DEFAULT_GAS }
        );
      }
    }

    await setup.rebalancingSetToken.settleRebalance.sendTransactionAsync(
      { from: deployerAccount, gas: DEFAULT_GAS}
    );
  }

  // Sets up assets, creates and mints rebalancing set
  async function initializeScenario(scenario: any): Promise<void> {
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
