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
      supply: new BigNumber('2193805828851612000000')
    },
    currentSet: {
      components: ['WETH'],
      units: [new BigNumber(1000000)],
      naturalUnit: new BigNumber(0),
    },
    nextSet: {
      components: ['USDC'],
      units: [new BigNumber(307)],
      naturalUnit: new BigNumber(0),
    },
    prices: {
      component1: ether(188),
      component2: ether(1),
    },
    auction: {
      chunkSize: ether(1000000),
      chunkAuctionPeriod: new Bignumber(0),
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
  let auctionPeriod: BigNumber = ONE_HOUR_IN_SECONDS;
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
    // Set up scenario

    // Run scenario
      // StartRebalance
      // Loop through number of auctions
        // Wait until 1% FV then place bids
        // If not the last auction, run iterate
      // If last auction, call settle
  });

  describe('#settleRebalance', async () => {
    let liquidatorData: string;
    let usdChunkSize: BigNumber;
    let chunkAuctionPeriod: BigNumber;
    let subjectCaller: Address;

    let customChunkSize: BigNumber;

    beforeEach(async () => {
      await createSetAndMint();

      usdChunkSize = customChunkSize || ether(10 ** 5); // 2 auctions to be performed
      chunkAuctionPeriod = ONE_HOUR_IN_SECONDS;

      liquidatorData = liquidatorHelper.generateTWAPLiquidatorCalldata(
        usdChunkSize,
        chunkAuctionPeriod,
      );

      await rebalancingHelper.transitionToRebalanceV2Async(
        scenario.core,
        scenario.rebalancingComponentWhiteList,
        rebalancingSetToken,
        nextSetToken,
        managerAccount,
        liquidatorData,
      );

      const bidQuantity = await getMaxBiddableQuantity(rebalancingSetToken.address);
      await rebalancingHelper.placeBidAsync(
        scenario.rebalanceAuctionModule,
        rebalancingSetToken.address,
        bidQuantity,
      );
      subjectCaller = managerAccount;
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.settleRebalance.sendTransactionAsync(
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('after 1 chunk auction is complete and the second has begun', async () => {
      beforeEach(async () => {
        await blockchain.increaseTimeAsync(chunkAuctionPeriod);

        await liquidator.iterateChunkAuction.sendTransactionAsync(
          rebalancingSetToken.address,
          { from: subjectCaller, gas: DEFAULT_GAS }
        );

        const bidQuantity = await getMaxBiddableQuantity(rebalancingSetToken.address);
        await rebalancingHelper.placeBidAsync(
          scenario.rebalanceAuctionModule,
          rebalancingSetToken.address,
          bidQuantity,
        );
      });

      it('updates the rebalanceState to Default', async () => {
        await subject();

        const newRebalanceState = await rebalancingSetToken.rebalanceState.callAsync();
        expect(newRebalanceState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.DEFAULT);
      });

      it('clears the auction state', async () => {
        await subject();

        const orderSize = await liquidator.getOrderSize.callAsync(rebalancingSetToken.address);
        expect(orderSize).to.bignumber.equal(0);
      });
    });
  });

  async function runScenario(scenario: any): Promise<void> {
    await initializeScenario(scenario);

    // StartRebalance
    // Loop through number of auctions
      // Wait until 1% FV then place bids
      // If not the last auction, run iterate
    // If last auction, call settle
  }

  async function initializeScenario(scenario: any): Promise<void> {
    await setup.initializeCore();
    await setup.initializeComponents({
      component1Price: setup.prices.component1,
      component2Price: setup.prices.component2
    });
    await setup.initializeBaseSets({
      set1Components: [scenario.component1.address],
      set2Components: [scenario.component2.address],
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
