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
  CoreMockContract,
  TWAPLiquidatorContract,
  SetTokenContract,
  RebalancingSetTokenV3Contract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ether, gWei } from '@utils/units';
import { AssetPairVolumeBounds } from '@utils/auction';
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
const { SetProtocolUtils: SetUtils } = setProtocolUtils;
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('RebalancingSetV3 - TWAPLiquidator', accounts => {
  const [
    deployerAccount,
    managerAccount,
    otherAccount,
    fakeTokenAccount,
    feeRecipient,
  ] = accounts;

  let rebalancingSetToken: RebalancingSetTokenV3Contract;

  let liquidator: TWAPLiquidatorContract;

  let name: string;
  let auctionPeriod: BigNumber;
  let rangeStart: BigNumber;
  let rangeEnd: BigNumber;

  let assetPairVolumeBounds: AssetPairVolumeBounds[];

  let currentSetToken: SetTokenContract;
  let nextSetToken: SetTokenContract;
  let failPeriod: BigNumber;
  let rebalancingSetQuantityToIssue: BigNumber;


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

  const scenario = new RebalanceTestSetup(deployerAccount);

  before(async () => {
    ABIDecoder.addABI(CoreMockContract.getAbi());
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMockContract.getAbi());
  });

  async function createSetAndMint(): Promise<void> {
      currentSetToken = scenario.set1;
      nextSetToken = scenario.set2;

      failPeriod = ONE_DAY_IN_SECONDS;
      const { timestamp: lastRebalanceTimestamp } = await web3.eth.getBlock('latest');
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV3Async(
        scenario.core,
        scenario.rebalancingFactory.address,
        managerAccount,
        liquidator.address,
        feeRecipient,
        scenario.fixedFeeCalculator.address,
        currentSetToken.address,
        failPeriod,
        lastRebalanceTimestamp,
      );

      await scenario.setRebalancingSet(rebalancingSetToken);

      rebalancingSetQuantityToIssue = ether(2000);
      await scenario.mintRebalancingSets(rebalancingSetQuantityToIssue);
  }

  async function getMaxBiddableQuantity(rebalancingSetTokenAddress: Address): Promise<BigNumber> {
    const remainingBids = await liquidator.remainingCurrentSets.callAsync(rebalancingSetTokenAddress);
    const minBid = await liquidator.minimumBid.callAsync(rebalancingSetTokenAddress);
    return liquidatorHelper.calculateChunkAuctionMaximumBid(remainingBids, minBid);
  }

  beforeEach(async () => {
    blockchain.saveSnapshotAsync();

    await scenario.initialize();

    auctionPeriod = ONE_HOUR_IN_SECONDS;
    rangeStart = ether(.03); // 3% above fair value
    rangeEnd = ether(.21); // 21% below fair value
    name = 'liquidator';

    assetPairVolumeBounds = [
      {
        assetOne: scenario.component1.address,
        assetTwo: scenario.component2.address,
        bounds: {lower: ZERO, upper: ether(10 ** 10)},
      },
      {
        assetOne: scenario.component2.address,
        assetTwo: scenario.component3.address,
        bounds: {lower: ZERO, upper: ether(10 ** 10)},
      },
    ];

    liquidator = await liquidatorHelper.deployTWAPLiquidatorAsync(
      scenario.core.address,
      scenario.oracleWhiteList.address,
      auctionPeriod,
      rangeStart,
      rangeEnd,
      assetPairVolumeBounds,
      name,
    );
    await coreHelper.addAddressToWhiteList(liquidator.address, scenario.liquidatorWhitelist);
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe('#startRebalance', async () => {
    let usdChunkSize: BigNumber;
    let chunkAuctionPeriod: BigNumber;

    let subjectCaller: Address;
    let subjectNextSet: Address;
    let subjectLiquidatorData: string;
    let subjectTimeFastForward: BigNumber;

    beforeEach(async () => {
      await createSetAndMint();

      usdChunkSize = ether(10 ** 5);
      chunkAuctionPeriod = ONE_HOUR_IN_SECONDS;

      subjectLiquidatorData = liquidatorHelper.generateTWAPLiquidatorCalldata(
        usdChunkSize,
        chunkAuctionPeriod,
      );

      subjectCaller = managerAccount;
      subjectNextSet = nextSetToken.address;
      subjectTimeFastForward = ONE_DAY_IN_SECONDS.add(1);
    });

    async function subject(): Promise<string> {
      await blockchain.increaseTimeAsync(subjectTimeFastForward);
      return rebalancingSetToken.startRebalance.sendTransactionAsync(
        subjectNextSet,
        subjectLiquidatorData,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when startRebalance is called from Default State', async () => {
      it('updates the rebalanceState to Rebalance', async () => {
        await subject();

        const newRebalanceState = await rebalancingSetToken.rebalanceState.callAsync();
        expect(newRebalanceState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.REBALANCE);
      });

      it('updates the rebalanceStartTime to the latest timestamp', async () => {
        await subject();

        const { timestamp } = await web3.eth.getBlock('latest');

        const rebalanceStartTime = await rebalancingSetToken.rebalanceStartTime.callAsync();
        expect(rebalanceStartTime).to.be.bignumber.equal(timestamp);
      });

      it('redeemsInVault the currentSet', async () => {
        const supply = await scenario.vault.getOwnerBalance.callAsync(
          currentSetToken.address,
          rebalancingSetToken.address
        );
        const currentSetNaturalUnit = await currentSetToken.naturalUnit.callAsync();
        const currentSetTokenBalance = await scenario.vault.balances.callAsync(
          currentSetToken.address,
          rebalancingSetToken.address
        );

        await subject();

        const expectedRedeemableCurrentSets = supply.div(currentSetNaturalUnit).round(0, 3).mul(currentSetNaturalUnit);
        const expectedCurrentSetTokenBalance = currentSetTokenBalance.sub(expectedRedeemableCurrentSets);
        const actualCurrentSetTokenBalance = await scenario.vault.balances.callAsync(
          currentSetToken.address,
          rebalancingSetToken.address
        );
        expect(actualCurrentSetTokenBalance).to.be.bignumber.equal(expectedCurrentSetTokenBalance);
      });

      describe('when one of the components in the next set is not on the whitelist', async () => {
        beforeEach(async () => {
          const nextSetComponents = await nextSetToken.getComponents.callAsync();
          await scenario.rebalancingComponentWhiteList.removeAddress.sendTransactionAsync(
            nextSetComponents[0],
            { from: deployerAccount }
          );
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when the union of currentSet and nextSet is not 2 components', async () => {
        beforeEach(async () => {
          const set3Components = [scenario.component1.address, scenario.component3.address];
          const set3Units = [gWei(1), gWei(1)];
          const set3NaturalUnit = new BigNumber(10 ** 13);
          const set3 = await coreHelper.createSetTokenAsync(
            scenario.core,
            scenario.setTokenFactory.address,
            set3Components,
            set3Units,
            set3NaturalUnit,
          );

          subjectNextSet = set3.address;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when the rebalance interval has not elapsed', async () => {
        beforeEach(async () => {
          subjectTimeFastForward = ONE_DAY_IN_SECONDS.sub(10);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when not by the token manager', async () => {
        beforeEach(async () => {
          subjectCaller = otherAccount;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when the nextSet is not approved by Core', async () => {
        beforeEach(async () => {
          subjectNextSet = fakeTokenAccount;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });
  });

  describe('#placeBid', async () => {
    let liquidatorData: string;
    let usdChunkSize: BigNumber;
    let chunkAuctionPeriod: BigNumber;

    let subjectBidQuantity: BigNumber;
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

      subjectBidQuantity = await getMaxBiddableQuantity(rebalancingSetToken.address);
      subjectCaller = managerAccount;
    });

    async function subject(): Promise<void> {
      return rebalancingHelper.placeBidAsync(
        scenario.rebalanceAuctionModule,
        rebalancingSetToken.address,
        subjectBidQuantity,
      );
    }

    describe('with 1 chunk auction', async () => {
      before(async () => {
        customChunkSize = ether(10 ** 10);
      });

      after(async () => {
        customChunkSize = undefined;
      });

      it('reduces the remainingCurrentSets', async () => {
        const startingBids = await liquidator.remainingCurrentSets.callAsync(rebalancingSetToken.address);

        await subject();

        const endingBids = await liquidator.remainingCurrentSets.callAsync(rebalancingSetToken.address);

        const expected = startingBids.minus(subjectBidQuantity);
        expect(endingBids).to.be.bignumber.equal(expected);
      });
    });

    describe('after 1 chunk auction is complete and the second has not begun', async () => {
      beforeEach(async () => {
        const firstAuctionBid = await getMaxBiddableQuantity(rebalancingSetToken.address);

        await rebalancingHelper.placeBidAsync(
          scenario.rebalanceAuctionModule,
          rebalancingSetToken.address,
          firstAuctionBid,
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('after 1 chunk auction is complete and the second has begun', async () => {
      beforeEach(async () => {
        const firstAuctionBid = await getMaxBiddableQuantity(rebalancingSetToken.address);
        await rebalancingHelper.placeBidAsync(
          scenario.rebalanceAuctionModule,
          rebalancingSetToken.address,
          firstAuctionBid,
        );

        await blockchain.increaseTimeAsync(chunkAuctionPeriod);

        await liquidator.iterateChunkAuction.sendTransactionAsync(
          rebalancingSetToken.address,
          { from: subjectCaller, gas: DEFAULT_GAS }
        );

        const remainingBids = await liquidator.remainingCurrentSets.callAsync(rebalancingSetToken.address);
        const minBid = await liquidator.minimumBid.callAsync(rebalancingSetToken.address);
        subjectBidQuantity = liquidatorHelper.calculateChunkAuctionMaximumBid(remainingBids, minBid);
      });

      it('updates the rebalanceState to Default', async () => {
        const startingBids = await liquidator.remainingCurrentSets.callAsync(rebalancingSetToken.address);

        await subject();

        const endingBids = await liquidator.remainingCurrentSets.callAsync(rebalancingSetToken.address);

        const expected = startingBids.minus(subjectBidQuantity);
        expect(endingBids).to.be.bignumber.equal(expected);
      });
    });
  });

  describe('#actualizeFee', async () => {
    let subjectCaller: Address;

    beforeEach(async () => {
      await createSetAndMint();

      // Should only be one chunk auction
      const usdChunkSize = ether(10 ** 10); // max value
      const chunkAuctionPeriod = ONE_HOUR_IN_SECONDS;

      const liquidatorData = liquidatorHelper.generateTWAPLiquidatorCalldata(
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

      subjectCaller = managerAccount;
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.actualizeFee.sendTransactionAsync(
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('should revert when in rebalance phase', async () => {
      await expectRevertError(subject());
    });
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

    describe('with 1 chunk auction and all currentSets are rebalanced', async () => {
      before(async () => {
        customChunkSize = ether(10 ** 10);
      });

      after(async () => {
        customChunkSize = undefined;
      });

      it('updates the rebalanceState to Default', async () => {
        await subject();

        const newRebalanceState = await rebalancingSetToken.rebalanceState.callAsync();
        expect(newRebalanceState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.DEFAULT);
      });
    });

    describe('with 2 chunk auctions and only 1 is complete', async () => {
      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('after 1 chunk auction is complete and the second has begun', async () => {
      beforeEach(async () => {
        await blockchain.increaseTimeAsync(chunkAuctionPeriod);
        await liquidator.iterateChunkAuction.sendTransactionAsync(
          rebalancingSetToken.address,
          { from: subjectCaller, gas: DEFAULT_GAS }
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

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

  describe('#endFailedRebalance', async () => {
    let liquidatorData: string;
    let usdChunkSize: BigNumber;
    let chunkAuctionPeriod: BigNumber;
    let subjectCaller: Address;

    beforeEach(async () => {
      await createSetAndMint();

      usdChunkSize = ether(10 ** 5); // 2 auctions to be performed
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
      subjectCaller = managerAccount;
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.endFailedRebalance.sendTransactionAsync(
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when the chunkAuctionFailPeriod has elapsed and no bids are made', async () => {
      beforeEach(async () => {
        await blockchain.increaseTimeAsync(auctionPeriod.plus(1));
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

    describe('when the failPeriod has elapsed and no bids are made', async () => {
      beforeEach(async () => {
        await blockchain.increaseTimeAsync(failPeriod.plus(1));
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

    describe('when the failPeriod has elapsed and bids are made', async () => {
      beforeEach(async () => {
        const bidQuantity = await getMaxBiddableQuantity(rebalancingSetToken.address);
        await rebalancingHelper.placeBidAsync(
          scenario.rebalanceAuctionModule,
          rebalancingSetToken.address,
          bidQuantity,
        );

        await blockchain.increaseTimeAsync(chunkAuctionPeriod);

        await liquidator.iterateChunkAuction.sendTransactionAsync(
          rebalancingSetToken.address,
          { from: subjectCaller, gas: DEFAULT_GAS }
        );

        await blockchain.increaseTimeAsync(failPeriod.plus(1));
      });

      it('updates the rebalanceState to Drawdown', async () => {
        await subject();

        const newRebalanceState = await rebalancingSetToken.rebalanceState.callAsync();
        expect(newRebalanceState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.DRAWDOWN);
      });

      it('clears the auction state', async () => {
        await subject();

        const orderSize = await liquidator.getOrderSize.callAsync(rebalancingSetToken.address);
        expect(orderSize).to.bignumber.equal(0);
      });
    });
  });

});
