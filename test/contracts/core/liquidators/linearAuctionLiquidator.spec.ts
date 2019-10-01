require('module-alias/register');

import * as _ from 'lodash';
import * as chai from 'chai';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreMockContract,
  LinearAuctionLiquidatorContract,
  RebalancingSetTokenFactoryContract,
  SetTokenFactoryContract,
  TransferProxyContract,
  VaultContract,
  WhiteListContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import {
  DEFAULT_AUCTION_PRICE_DIVISOR,
  ONE_HOUR_IN_SECONDS,
} from '@utils/constants';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { RebalancingHelper } from '@utils/helpers/rebalancingHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
// const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
// const setTestUtils = new SetTestUtils(web3);
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('LinearAuctionLiquidator', accounts => {
  const [
    deployerAccount,
  ] = accounts;

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let factory: SetTokenFactoryContract;
  let rebalancingFactory: RebalancingSetTokenFactoryContract;
  let rebalancingComponentWhiteList: WhiteListContract;
  let linearAuctionLiquidator: LinearAuctionLiquidatorContract;

  const coreHelper = new CoreHelper(deployerAccount, deployerAccount);
  const erc20Helper = new ERC20Helper(deployerAccount);
  const rebalancingHelper = new RebalancingHelper(
    deployerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );

  before(async () => {
  });

  after(async () => {
  });

  beforeEach(async () => {
    blockchain.saveSnapshotAsync();

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    coreMock = await coreHelper.deployCoreMockAsync(transferProxy, vault);

    factory = await coreHelper.deploySetTokenFactoryAsync(coreMock.address);
    rebalancingComponentWhiteList = await coreHelper.deployWhiteListAsync();
    rebalancingFactory = await coreHelper.deployRebalancingSetTokenFactoryAsync(
      coreMock.address,
      rebalancingComponentWhiteList.address,
    );

    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
    await coreHelper.addFactoryAsync(coreMock, rebalancingFactory);
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    let subjectCoreInstance: Address;
    let subjectPriceDivisor: BigNumber;
    let subjectAuctionTimeToPivot: BigNumber;
    let subjectAuctionSpeed: BigNumber;
    let subjectName: string;

    beforeEach(async () => {
      subjectCoreInstance = coreMock.address;
      subjectPriceDivisor = DEFAULT_AUCTION_PRICE_DIVISOR;
      subjectAuctionTimeToPivot = ONE_HOUR_IN_SECONDS.mul(4);
      subjectAuctionSpeed = ONE_HOUR_IN_SECONDS.div(3);
      subjectName = 'LinearAuctionLiquidator';
    });

    async function subject(): Promise<LinearAuctionLiquidatorContract> {
      return rebalancingHelper.deployLinearAuctionLiquidatorAsync(
        subjectCoreInstance,
        subjectPriceDivisor,
        subjectAuctionTimeToPivot,
        subjectAuctionSpeed,
        subjectName
      );
    }

    it('creates a liquidator with the correct core instance', async () => {
      linearAuctionLiquidator = await subject();

      const actualCoreInstance = await linearAuctionLiquidator.coreInstance.callAsync();
      expect(actualCoreInstance).to.equal(subjectCoreInstance);
    });

    it('creates a liquidator with the correct price divisor', async () => {
      linearAuctionLiquidator = await subject();

      const actualPriceDivisor = await linearAuctionLiquidator.priceDivisor.callAsync();
      expect(actualPriceDivisor).to.be.bignumber.equal(subjectPriceDivisor);
    });

    it('creates a liquidator with the correct auction time to pivot', async () => {
      linearAuctionLiquidator = await subject();

      const actualAuctionTimeToPivot = await linearAuctionLiquidator.auctionTimeToPivot.callAsync();
      expect(actualAuctionTimeToPivot).to.be.bignumber.equal(subjectAuctionTimeToPivot);
    });

    it('creates a liquidator with the correct auction speed', async () => {
      linearAuctionLiquidator = await subject();

      const actualAuctionSpeed = await linearAuctionLiquidator.auctionSpeed.callAsync();
      expect(actualAuctionSpeed).to.be.bignumber.equal(subjectAuctionSpeed);
    });

    it('creates a liquidator with the correct name', async () => {
      linearAuctionLiquidator = await subject();

      const actualName = await linearAuctionLiquidator.name.callAsync();
      expect(actualName).to.equal(subjectName);
    });
  });

  // describe('#processProposal', async () => {
  //   let subjectCurrentSet: Address;
  //   let subjectNextSet: Address;

  //   let auctionTimeToPivot: BigNumber;
  //   let auctionSpeed: BigNumber;

  //   beforeEach(async () => {
  //     auctionTimeToPivot = ONE_HOUR_IN_SECONDS.mul(4);
  //     auctionSpeed = ONE_HOUR_IN_SECONDS.div(3);
  //     const name = "LinearAuctionLiquidator";
  //     linearAuctionLiquidator = await rebalancingHelper.deployLinearAuctionLiquidatorAsync(
  //       coreMock.address,
  //       DEFAULT_AUCTION_PRICE_DIVISOR,
  //       auctionTimeToPivot,
  //       auctionSpeed,
  //       name
  //     );
  //   });

  //   async function subject(): Promise<LinearAuctionLiquidatorContract> {
  //     return linearAuctionLiquidator.processProposal.sendTransaction(
  //       subjectCurrentSet,
  //       subjectNextSet
  //     );
  //   }

  //   it('creates a liquidator with the correct core instance', async () => {
  //     linearAuctionLiquidator = await subject();

  //     const actualCoreInstance = await linearAuctionLiquidator.coreInstance.callAsync();
  //     expect(actualCoreInstance).to.equal(subjectCoreInstance);
  //   });
  // });
});