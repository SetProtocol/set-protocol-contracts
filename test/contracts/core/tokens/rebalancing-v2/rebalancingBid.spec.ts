require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreMockContract,
  FixedFeeCalculatorContract,
  LiquidatorMockContract,
  PlaceBidMockContract,
  RebalanceAuctionModuleContract,
  RebalancingSetTokenV2Contract,
  RebalancingSetTokenV2FactoryContract,
  SetTokenContract,
  SetTokenFactoryContract,
  TransferProxyContract,
  VaultContract,
  WhiteListContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ether } from '@utils/units';
import {
  DEFAULT_GAS,
  ONE_DAY_IN_SECONDS,
  ZERO,
} from '@utils/constants';
import { expectRevertError } from '@utils/tokenAssertions';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { FeeCalculatorHelper } from '@utils/helpers/feeCalculatorHelper';
import { LibraryMockHelper } from '@utils/helpers/libraryMockHelper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';
import { OracleHelper } from 'set-protocol-oracles';
import { RebalancingSetV2Helper } from '@utils/helpers/rebalancingSetV2Helper';
import { ValuationHelper } from '@utils/helpers/valuationHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('PlaceBid', accounts => {
  const [
    deployerAccount,
    managerAccount,
    otherAccount,
    feeRecipient,
  ] = accounts;

  let rebalancingSetToken: RebalancingSetTokenV2Contract;

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let factory: SetTokenFactoryContract;
  let rebalanceAuctionModule: RebalanceAuctionModuleContract;
  let rebalancingFactory: RebalancingSetTokenV2FactoryContract;
  let rebalancingComponentWhiteList: WhiteListContract;
  let liquidatorWhitelist: WhiteListContract;
  let liquidatorMock: LiquidatorMockContract;
  let placeBidMock: PlaceBidMockContract;
  let feeCalculator: FixedFeeCalculatorContract;
  let feeCalculatorWhitelist: WhiteListContract;

  const coreHelper = new CoreHelper(deployerAccount, deployerAccount);
  const erc20Helper = new ERC20Helper(deployerAccount);
  const rebalancingHelper = new RebalancingSetV2Helper(
    deployerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );
  const oracleHelper = new OracleHelper(deployerAccount);
  const valuationHelper = new ValuationHelper(deployerAccount, coreHelper, erc20Helper, oracleHelper);
  const liquidatorHelper = new LiquidatorHelper(deployerAccount, erc20Helper, valuationHelper);
  const feeCalculatorHelper = new FeeCalculatorHelper(deployerAccount);
  const libraryMockHelper = new LibraryMockHelper(deployerAccount);

  let currentSetToken: SetTokenContract;
  let nextSetToken: SetTokenContract;
  let rebalancingSetQuantityToIssue: BigNumber;

  before(async () => {
    ABIDecoder.addABI(CoreMockContract.getAbi());
    ABIDecoder.addABI(RebalancingSetTokenV2Contract.getAbi());
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMockContract.getAbi());
    ABIDecoder.removeABI(RebalancingSetTokenV2Contract.getAbi());
  });

  beforeEach(async () => {
    blockchain.saveSnapshotAsync();

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    coreMock = await coreHelper.deployCoreMockAsync(transferProxy, vault);

    rebalanceAuctionModule = await coreHelper.deployRebalanceAuctionModuleAsync(coreMock, vault);
    await coreHelper.addModuleAsync(coreMock, rebalanceAuctionModule.address);

    factory = await coreHelper.deploySetTokenFactoryAsync(coreMock.address);
    rebalancingComponentWhiteList = await coreHelper.deployWhiteListAsync();
    liquidatorWhitelist = await coreHelper.deployWhiteListAsync();
    feeCalculatorWhitelist = await coreHelper.deployWhiteListAsync();
    rebalancingFactory = await coreHelper.deployRebalancingSetTokenV2FactoryAsync(
      coreMock.address,
      rebalancingComponentWhiteList.address,
      liquidatorWhitelist.address,
      feeCalculatorWhitelist.address
    );

    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
    await coreHelper.addFactoryAsync(coreMock, rebalancingFactory);

    liquidatorMock = await liquidatorHelper.deployLiquidatorMockAsync();
    await coreHelper.addAddressToWhiteList(liquidatorMock.address, liquidatorWhitelist);
    placeBidMock = await libraryMockHelper.deployPlaceBidMockAsync();

    feeCalculator = await feeCalculatorHelper.deployFixedFeeCalculatorAsync();
    await coreHelper.addAddressToWhiteList(feeCalculator.address, feeCalculatorWhitelist);

    const setTokensToDeploy = 2;
    const setTokens = await rebalancingHelper.createSetTokensAsync(
      coreMock,
      factory.address,
      transferProxy.address,
      setTokensToDeploy,
    );

    currentSetToken = setTokens[0];
    nextSetToken = setTokens[1];

    const nextSetTokenComponentAddresses = await nextSetToken.getComponents.callAsync();
    await coreHelper.addTokensToWhiteList(nextSetTokenComponentAddresses, rebalancingComponentWhiteList);

    const failPeriod = ONE_DAY_IN_SECONDS;
    const { timestamp: lastRebalanceTimestamp } = await web3.eth.getBlock('latest');
    rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV2Async(
      coreMock,
      rebalancingFactory.address,
      managerAccount,
      liquidatorMock.address,
      feeRecipient,
      feeCalculator.address,
      currentSetToken.address,
      failPeriod,
      new BigNumber(lastRebalanceTimestamp),
    );

    // Issue currentSetToken
    await coreMock.issue.sendTransactionAsync(
      currentSetToken.address,
      ether(8),
      {from: deployerAccount}
    );
    await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

    // Use issued currentSetToken to issue rebalancingSetToken
    rebalancingSetQuantityToIssue = ether(7);
    await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe('#PlaceBid', async () => {
    let subjectCaller: Address;
    let subjectBidQuantity: BigNumber;

    beforeEach(async () => {
      subjectBidQuantity = rebalancingSetQuantityToIssue;

      subjectCaller = managerAccount;

      // Add caller as a module
      await coreHelper.addModuleAsync(coreMock, subjectCaller);
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.placeBid.sendTransactionAsync(
        subjectBidQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when placeBid is called from Default State', async () => {
      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when placeBid is called from Rebalance State', async () => {
      beforeEach(async () => {
       await rebalancingHelper.transitionToRebalanceV2Async(
         coreMock,
         rebalancingComponentWhiteList,
         rebalancingSetToken,
         nextSetToken,
         managerAccount
       );
      });

      it('should update hasBidded to true', async () => {
        await subject();

        const hasBidded = await rebalancingSetToken.hasBidded.callAsync();
        expect(hasBidded).to.equal(true);
      });

      it('should send the correct bidQuantity to the liquidator', async () => {
        await subject();

        const liquidatorPlaceBidQuantity = await liquidatorMock.placeBidQuantity.callAsync();
        expect(liquidatorPlaceBidQuantity).to.bignumber.equal(subjectBidQuantity);
      });

      describe('when a bid has already been made', async () => {
        beforeEach(async () => {
          await rebalancingSetToken.placeBid.sendTransactionAsync(
            subjectBidQuantity.div(2),
            { from: subjectCaller, gas: DEFAULT_GAS}
          );

          subjectBidQuantity = subjectBidQuantity.div(2);
        });

        it('should not make any modifications to hasBidded', async () => {
          await subject();

          const hasBidded = await rebalancingSetToken.hasBidded.callAsync();
          expect(hasBidded).to.equal(true);
        });
      });

      describe('when the caller is not a module', async () => {
        beforeEach(async () => {
          subjectCaller = otherAccount;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when the quantity is 0', async () => {
        beforeEach(async () => {
          subjectBidQuantity = ZERO;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });

    describe('when placeBid is called from Drawdown State', async () => {
      beforeEach(async () => {
        await rebalancingHelper.transitionToDrawdownV2Async(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          rebalanceAuctionModule,
          liquidatorMock,
          nextSetToken,
          managerAccount,
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#PlaceBid from placeBidMock to retrieve function return values', async () => {
    let subjectCaller: Address;
    let subjectBidQuantity: BigNumber;

    beforeEach(async () => {
      subjectBidQuantity = rebalancingSetQuantityToIssue;

      subjectCaller = deployerAccount;

      await coreHelper.addModuleAsync(coreMock, placeBidMock.address);

     await rebalancingHelper.transitionToRebalanceV2Async(
       coreMock,
       rebalancingComponentWhiteList,
       rebalancingSetToken,
       nextSetToken,
       managerAccount
     );
    });

    async function subject(): Promise<string> {
      return placeBidMock.mockPlaceBid.sendTransactionAsync(
        rebalancingSetToken.address,
        subjectBidQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('should return the correct combinedTokenArray', async () => {
      await subject();

      const storedCombinedTokenArray = await placeBidMock.getCombinedTokenArray.callAsync();
      const liquidatorCombinedTokenArray = await liquidatorMock.getCombinedTokenArray.callAsync(
        rebalancingSetToken.address
      );
      expect(JSON.stringify(storedCombinedTokenArray)).to.equal(JSON.stringify(liquidatorCombinedTokenArray));
    });

    it('should return the correct inflow units', async () => {
      await subject();

      const returnedInflowUnits = await placeBidMock.getInflowUnits.callAsync();

      const liquidatorNextSetUnits = await liquidatorMock.getCombinedNextSetUnits.callAsync(
        rebalancingSetToken.address
      );
      const expectedInflowUnits = await liquidatorHelper.getBidPriceValues(
        nextSetToken,
        subjectBidQuantity,
        liquidatorNextSetUnits,
      );

      expect(JSON.stringify(returnedInflowUnits)).to.equal(JSON.stringify(expectedInflowUnits));
    });

    it('should return the correct outflow units', async () => {
      await subject();

      const returnedOutflow = await placeBidMock.getOutflowUnits.callAsync();

      const liquidatorCurrentUnits = await liquidatorMock.getCombinedCurrentSetUnits.callAsync(
        rebalancingSetToken.address
      );
      const expectedOutflowUnits = await liquidatorHelper.getBidPriceValues(
        currentSetToken,
        subjectBidQuantity,
        liquidatorCurrentUnits,
      );
      expect(JSON.stringify(returnedOutflow)).to.equal(JSON.stringify(expectedOutflowUnits));
    });
  });

  describe('#getBidPrice', async () => {
    let subjectCaller: Address;
    let subjectBidQuantity: BigNumber;

    beforeEach(async () => {
      subjectBidQuantity = rebalancingSetQuantityToIssue;

      subjectCaller = deployerAccount;

      await coreHelper.addModuleAsync(coreMock, placeBidMock.address);

     await rebalancingHelper.transitionToRebalanceV2Async(
       coreMock,
       rebalancingComponentWhiteList,
       rebalancingSetToken,
       nextSetToken,
       managerAccount
     );
    });

    async function subject(): Promise<any> {
      return rebalancingSetToken.getBidPrice.callAsync(
        subjectBidQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('should return the correct inflow units', async () => {
      const [inflowUnits] = await subject();

      const liquidatorNextSetUnits = await liquidatorMock.getCombinedNextSetUnits.callAsync(
        rebalancingSetToken.address
      );
      const expectedInflowUnits = await liquidatorHelper.getBidPriceValues(
        nextSetToken,
        subjectBidQuantity,
        liquidatorNextSetUnits,
      );

      expect(JSON.stringify(inflowUnits)).to.equal(JSON.stringify(expectedInflowUnits));
    });

    it('should return the correct outflow units', async () => {
      const [, outflowUnits] = await subject();

      const liquidatorCurrentUnits = await liquidatorMock.getCombinedCurrentSetUnits.callAsync(
        rebalancingSetToken.address
      );
      const expectedOutflowUnits = await liquidatorHelper.getBidPriceValues(
        currentSetToken,
        subjectBidQuantity,
        liquidatorCurrentUnits,
      );
      expect(JSON.stringify(outflowUnits)).to.equal(JSON.stringify(expectedOutflowUnits));
    });

    describe('when the quantity is 0', async () => {
      beforeEach(async () => {
        subjectBidQuantity = ZERO;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
