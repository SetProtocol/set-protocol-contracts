require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address, Bytes } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  RebalanceAuctionModuleContract,
  RebalancingSetTokenV2Contract,
  RebalancingSetTokenV2FactoryContract,
  SetTokenContract,
  SetTokenFactoryContract,
  TransferProxyContract,
  VaultContract,
  WhiteListContract,
} from '@utils/contracts';
import { ether } from '@utils/units';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import {
  ZERO,
  DEFAULT_REBALANCING_MINIMUM_NATURAL_UNIT,
  DEFAULT_REBALANCING_MAXIMUM_NATURAL_UNIT,
  ONE_DAY_IN_SECONDS,
 } from '@utils/constants';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { RebalancingSetV2Helper } from '@utils/helpers/rebalancingSetV2Helper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const Core = artifacts.require('Core');
const { SetProtocolUtils: SetUtils } = setProtocolUtils;
const { expect } = chai;
const blockchain = new Blockchain(web3);
const { NULL_ADDRESS } = SetUtils.CONSTANTS;


contract('RebalancingSetTokenV2Factory', accounts => {
  const [
    deployerAccount,
    rebalancingTokenManagerAccount,
    notCoreAccount,
    notSetTokenCreatedByCore,
    liquidatorAccount,
    nonApprovedLiquidator,
  ] = accounts;

  let rebalancingSetTokenFactory: RebalancingSetTokenV2FactoryContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let core: CoreContract;
  let rebalanceAuctionModule: RebalanceAuctionModuleContract;
  let setToken: SetTokenContract;
  let setTokenFactory: SetTokenFactoryContract;
  let rebalancingComponentWhiteList: WhiteListContract;
  let liquidatorWhiteList: WhiteListContract;

  const coreHelper = new CoreHelper(deployerAccount, deployerAccount);
  const erc20Helper = new ERC20Helper(deployerAccount);
  const rebalanceHelper = new RebalancingSetV2Helper(deployerAccount, coreHelper, erc20Helper, blockchain);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    vault = await coreHelper.deployVaultAsync();
    transferProxy = await coreHelper.deployTransferProxyAsync();
    core = await coreHelper.deployCoreAsync(transferProxy, vault);
    rebalanceAuctionModule = await coreHelper.deployRebalanceAuctionModuleAsync(core, vault);
    await coreHelper.addModuleAsync(core, rebalanceAuctionModule.address);

    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(core.address);
    await coreHelper.addFactoryAsync(core, setTokenFactory);

    const components = await erc20Helper.deployTokensAsync(2, deployerAccount);
    const componentAddresses = _.map(components, token => token.address);
    const componentUnits = _.map(components, () => ether(4)); // Multiple of naturalUnit
    const naturalUnit: BigNumber = ether(2);
    setToken = await coreHelper.createSetTokenAsync(
      core,
      setTokenFactory.address,
      componentAddresses,
      componentUnits,
      naturalUnit,
    );

    rebalancingComponentWhiteList = await coreHelper.deployWhiteListAsync();
    liquidatorWhiteList = await coreHelper.deployWhiteListAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    let subjectCoreAddress: Address;
    let subjectComponentWhitelist: Address;
    let subjectLiquidatorWhitelist: Address;
    let subjectMinimumRebalanceInterval: BigNumber;
    let subjectMinimumProposalPeriod: BigNumber;
    let subjectMinimumFailRebalancePeriod: BigNumber;
    let subjectMaximumFailRebalancePeriod: BigNumber;
    let subjectMinimumNaturalUnit: BigNumber;
    let subjectMaximumNaturalUnit: BigNumber;

    beforeEach(async () => {
      subjectCoreAddress = core.address;
      subjectComponentWhitelist = rebalancingComponentWhiteList.address;
      subjectLiquidatorWhitelist = liquidatorWhiteList.address;
      subjectMinimumRebalanceInterval = ONE_DAY_IN_SECONDS;
      subjectMinimumProposalPeriod = ONE_DAY_IN_SECONDS;
      subjectMinimumFailRebalancePeriod = ONE_DAY_IN_SECONDS;
      subjectMaximumFailRebalancePeriod = ONE_DAY_IN_SECONDS.mul(30);
      subjectMinimumNaturalUnit = DEFAULT_REBALANCING_MINIMUM_NATURAL_UNIT;
      subjectMaximumNaturalUnit = DEFAULT_REBALANCING_MAXIMUM_NATURAL_UNIT;
    });

    async function subject(): Promise<RebalancingSetTokenV2FactoryContract> {
      return await coreHelper.deployRebalancingSetTokenV2FactoryAsync(
        subjectCoreAddress,
        subjectComponentWhitelist,
        subjectLiquidatorWhitelist,
        subjectMinimumRebalanceInterval,
        subjectMinimumProposalPeriod,
        subjectMinimumFailRebalancePeriod,
        subjectMaximumFailRebalancePeriod,
        subjectMinimumNaturalUnit,
        subjectMaximumNaturalUnit,
      );
    }

    it('should have the correct core address', async () => {
      const rebalancingTokenFactory = await subject();

      const coreAddress = await rebalancingTokenFactory.core.callAsync();
      expect(coreAddress).to.equal(subjectCoreAddress);
    });

    it('should have the correct component whitelist address', async () => {
      const rebalancingTokenFactory = await subject();

      const whiteListAddress = await rebalancingTokenFactory.rebalanceComponentWhitelist.callAsync();
      expect(whiteListAddress).to.equal(subjectComponentWhitelist);
    });

    it('should have the correct liquidator whitelist address', async () => {
      const rebalancingTokenFactory = await subject();

      const liquidatorWhiteList = await rebalancingTokenFactory.liquidatorWhitelist.callAsync();
      expect(liquidatorWhiteList).to.equal(subjectLiquidatorWhitelist);
    });

    it('should have the correct minimum rebalance interval', async () => {
      const rebalancingTokenFactory = await subject();

      const rebalanceInterval = await rebalancingTokenFactory.minimumRebalanceInterval.callAsync();
      expect(rebalanceInterval).to.be.bignumber.equal(subjectMinimumRebalanceInterval);
    });

    it('should have the correct minimum proposal period', async () => {
      const rebalancingTokenFactory = await subject();

      const proposalPeriod = await rebalancingTokenFactory.minimumProposalPeriod.callAsync();
      expect(proposalPeriod).to.bignumber.equal(subjectMinimumProposalPeriod);
    });

    it('should have the correct minimum fail rebalance period', async () => {
      const rebalancingTokenFactory = await subject();

      const failPeriod = await rebalancingTokenFactory.minimumFailRebalancePeriod.callAsync();
      expect(failPeriod).to.bignumber.equal(subjectMinimumFailRebalancePeriod);
    });

    it('should have the correct minimum natural unit', async () => {
      const rebalancingTokenFactory = await subject();

      const minimumNaturalUnit = await rebalancingTokenFactory.minimumNaturalUnit.callAsync();
      expect(minimumNaturalUnit).to.bignumber.equal(subjectMinimumNaturalUnit);
    });

    it('should have the correct maximum natural unit', async () => {
      const rebalancingTokenFactory = await subject();

      const maximumNaturalUnit = await rebalancingTokenFactory.maximumNaturalUnit.callAsync();
      expect(maximumNaturalUnit).to.bignumber.equal(subjectMaximumNaturalUnit);
    });
  });

  describe('#create from core', async () => {
    let subjectComponents: Address[] = [];
    let subjectUnits: BigNumber[] = [];
    let subjectNaturalUnit: BigNumber = new BigNumber(10 ** 10);
    let subjectName: Bytes;
    let subjectSymbol: Bytes;
    let subjectCallData: Bytes;

    let callDataManagerAddress: Address;
    let callDataLiquidator: Address;
    let callDataProposalPeriod: BigNumber;
    let callDataRebalanceInterval: BigNumber;
    let callDataFailAuctionPeriod: BigNumber;
    let callDataLastRebalanceTimestamp: BigNumber;

    beforeEach(async () => {
      rebalancingSetTokenFactory = await coreHelper.deployRebalancingSetTokenV2FactoryAsync(
        core.address,
        rebalancingComponentWhiteList.address,
        liquidatorWhiteList.address,
      );
      await coreHelper.addFactoryAsync(core, rebalancingSetTokenFactory);
      await coreHelper.addAddressToWhiteList(liquidatorAccount, liquidatorWhiteList);

      subjectComponents = [setToken.address];
      subjectUnits = [new BigNumber(1)];
      subjectNaturalUnit = new BigNumber(10 ** 10);
      subjectName = 'My Rebalancing Set';
      subjectSymbol = 'REBAL';

      callDataManagerAddress = rebalancingTokenManagerAccount;
      callDataLiquidator = liquidatorAccount;
      callDataProposalPeriod = new BigNumber(86400);
      callDataRebalanceInterval = new BigNumber(86400).mul(2);
      callDataFailAuctionPeriod = new BigNumber(86400).mul(3);
      const { timestamp } = await web3.eth.getBlock('latest');
      callDataLastRebalanceTimestamp = timestamp;
      subjectCallData = SetUtils.generateRebalancingSetTokenV2CallData(
        callDataManagerAddress,
        callDataLiquidator,
        callDataProposalPeriod,
        callDataRebalanceInterval,
        callDataFailAuctionPeriod,
        callDataLastRebalanceTimestamp,
      );
    });

    async function subject(): Promise<RebalancingSetTokenV2Contract> {
      return await rebalanceHelper.createRebalancingTokenV2Async(
        core,
        rebalancingSetTokenFactory.address,
        subjectComponents,
        subjectUnits,
        subjectNaturalUnit,
        subjectCallData,
        subjectName,
        subjectSymbol,
      );
    }

    describe('when it successfully creates a rebalancing token', async () => {
      it('should have the correct core address', async () => {
        const rebalancingToken = await subject();

        const resultName = await rebalancingToken.core.callAsync();
        expect(resultName).to.equal(core.address);
      });

      it('should have the correct vault address', async () => {
        const rebalancingToken = await subject();

        const resultName = await rebalancingToken.vault.callAsync();
        expect(resultName).to.equal(vault.address);
      });

      it('should have the correct componentWhiteList address', async () => {
        const rebalancingToken = await subject();

        const resultName = await rebalancingToken.componentWhiteList.callAsync();
        expect(resultName).to.equal(rebalancingComponentWhiteList.address);
      });

      it('should have the correct liquidatorWhiteList address', async () => {
        const rebalancingToken = await subject();

        const resultName = await rebalancingToken.liquidatorWhiteList.callAsync();
        expect(resultName).to.equal(liquidatorWhiteList.address);
      });

      it('should have the correct name', async () => {
        const rebalancingToken = await subject();

        const resultName = await rebalancingToken.name.callAsync();
        expect(resultName).to.equal(subjectName);
      });

      it('should have the correct symbol', async () => {
        const rebalancingToken = await subject();

        const resultSymbol = await rebalancingToken.symbol.callAsync();
        expect(resultSymbol).to.equal(subjectSymbol);
      });

      it('should have the correct manager address', async () => {
        const rebalancingToken = await subject();

        const managerAddress = await rebalancingToken.manager.callAsync();
        expect(managerAddress).to.equal(callDataManagerAddress);
      });

      it('should have the correct liquidator address', async () => {
        const rebalancingToken = await subject();

        const liquidatorAddress = await rebalancingToken.liquidator.callAsync();
        expect(liquidatorAddress).to.equal(callDataLiquidator);
      });

      it('should have the correct proposal period', async () => {
        const rebalancingToken = await subject();

        const proposalPeriod = await rebalancingToken.proposalPeriod.callAsync();
        expect(proposalPeriod).to.bignumber.equal(callDataProposalPeriod);
      });

      it('should have the correct rebalance interval', async () => {
        const rebalancingToken = await subject();

        const rebalanceInterval = await rebalancingToken.rebalanceInterval.callAsync();
        expect(rebalanceInterval).to.bignumber.equal(callDataRebalanceInterval);
      });

      it('should have the correct unitShares', async () => {
        const rebalancingToken = await subject();

        const unitShares = await rebalancingToken.unitShares.callAsync();
        expect(unitShares).to.bignumber.equal(subjectUnits[0]);
      });

      it('should have the correct natural unit', async () => {
        const rebalancingToken = await subject();

        const naturalUnit = await rebalancingToken.naturalUnit.callAsync();
        expect(naturalUnit).to.bignumber.equal(subjectNaturalUnit);
      });

      it('should have the correct fail auction period', async () => {
        const rebalancingToken = await subject();

        const failPeriod = await rebalancingToken.rebalanceFailPeriod.callAsync();
        expect(failPeriod).to.bignumber.equal(callDataFailAuctionPeriod);
      });
    });

    describe('when the components length is not 1', async () => {
      beforeEach(async () => {
        subjectComponents = [setToken.address, notSetTokenCreatedByCore];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the units length is not 1', async () => {
      beforeEach(async () => {
        subjectUnits = [new BigNumber(1), new BigNumber(1)];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the unitShares is 0', async () => {
      beforeEach(async () => {
        subjectUnits = [ZERO];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the set was not created through core', async () => {
      beforeEach(async () => {
        subjectComponents = [notSetTokenCreatedByCore];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

   describe('when the initial natural unit is less than the minimum', async () => {
      beforeEach(async () => {
        subjectNaturalUnit = ZERO;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

   describe('when the initial natural unit is greater than the maximum', async () => {
      beforeEach(async () => {
        subjectNaturalUnit = new BigNumber(10 ** 15);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the manager address is null', async () => {
      beforeEach(async () => {
        callDataManagerAddress = NULL_ADDRESS;

        subjectCallData = SetUtils.generateRebalancingSetTokenV2CallData(
          callDataManagerAddress,
          callDataLiquidator,
          callDataProposalPeriod,
          callDataRebalanceInterval,
          callDataFailAuctionPeriod,
          callDataLastRebalanceTimestamp,
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the liquidator address is null', async () => {
      beforeEach(async () => {
        callDataLiquidator = NULL_ADDRESS;

        subjectCallData = SetUtils.generateRebalancingSetTokenV2CallData(
          callDataManagerAddress,
          callDataLiquidator,
          callDataProposalPeriod,
          callDataRebalanceInterval,
          callDataFailAuctionPeriod,
          callDataLastRebalanceTimestamp,
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the liquidator address is not whitelisted', async () => {
      beforeEach(async () => {
        callDataLiquidator = nonApprovedLiquidator;

        subjectCallData = SetUtils.generateRebalancingSetTokenV2CallData(
          callDataManagerAddress,
          callDataLiquidator,
          callDataProposalPeriod,
          callDataRebalanceInterval,
          callDataFailAuctionPeriod,
          callDataLastRebalanceTimestamp,
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the proposalPeriod is less than the minimum', async () => {
      beforeEach(async () => {
        callDataProposalPeriod = new BigNumber(5000);

        subjectCallData = SetUtils.generateRebalancingSetTokenV2CallData(
          callDataManagerAddress,
          callDataLiquidator,
          callDataProposalPeriod,
          callDataRebalanceInterval,
          callDataFailAuctionPeriod,
          callDataLastRebalanceTimestamp,
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the rebalanceInterval is less than the minimum', async () => {
      beforeEach(async () => {
        callDataRebalanceInterval = new BigNumber(5000);

        subjectCallData = SetUtils.generateRebalancingSetTokenV2CallData(
          callDataManagerAddress,
          callDataLiquidator,
          callDataProposalPeriod,
          callDataRebalanceInterval,
          callDataFailAuctionPeriod,
          callDataLastRebalanceTimestamp,
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the fail auction period is less than the minimum', async () => {
      beforeEach(async () => {
        callDataFailAuctionPeriod = new BigNumber(5000);

        subjectCallData = SetUtils.generateRebalancingSetTokenV2CallData(
          callDataManagerAddress,
          callDataLiquidator,
          callDataProposalPeriod,
          callDataRebalanceInterval,
          callDataFailAuctionPeriod,
          callDataLastRebalanceTimestamp,
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the fail auction period is more than the maximum', async () => {
      beforeEach(async () => {
        callDataFailAuctionPeriod = ONE_DAY_IN_SECONDS.mul(60);

        subjectCallData = SetUtils.generateRebalancingSetTokenV2CallData(
          callDataManagerAddress,
          callDataLiquidator,
          callDataProposalPeriod,
          callDataRebalanceInterval,
          callDataFailAuctionPeriod,
          callDataLastRebalanceTimestamp,
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the lastRebalanceTimestamp is in the future', async () => {
      beforeEach(async () => {
        const { timestamp: lastRebalanceTimestamp } = await web3.eth.getBlock('latest');
        callDataLastRebalanceTimestamp = new BigNumber(lastRebalanceTimestamp).mul(2);

        subjectCallData = SetUtils.generateRebalancingSetTokenV2CallData(
          callDataManagerAddress,
          callDataLiquidator,
          callDataProposalPeriod,
          callDataRebalanceInterval,
          callDataFailAuctionPeriod,
          callDataLastRebalanceTimestamp,
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#create not from core', async () => {
    let subjectCaller: Address;
    let subjectComponents: Address[] = [];
    let subjectUnits: BigNumber[] = [];
    let subjectNaturalUnit: BigNumber = ZERO;
    let subjectName: Bytes;
    let subjectSymbol: Bytes;
    let subjectCallData: Bytes;

    beforeEach(async () => {
      rebalancingSetTokenFactory = await coreHelper.deployRebalancingSetTokenV2FactoryAsync(
        core.address,
        rebalancingComponentWhiteList.address,
        liquidatorWhiteList.address,
      );
      await coreHelper.addFactoryAsync(core, rebalancingSetTokenFactory);

      subjectCaller = notCoreAccount;
      subjectComponents = [setToken.address];
      subjectUnits = [new BigNumber(1)];
      subjectNaturalUnit = new BigNumber(10 ** 10);
      subjectName = SetUtils.stringToBytes('My Rebalancing Set');
      subjectSymbol = SetUtils.stringToBytes('REBAL');

      const managerAddress = rebalancingTokenManagerAccount;
      const liquidator = liquidatorWhiteList.address;
      const proposalPeriod = new BigNumber(86400);
      const rebalanceInterval = new BigNumber(86400).mul(2);
      const failAuctionPeriod = new BigNumber(86400).mul(3);
      const { timestamp: lastRebalanceTimestamp } = await web3.eth.getBlock('latest');
      subjectCallData = SetUtils.generateRebalancingSetTokenV2CallData(
        managerAddress,
        liquidator,
        proposalPeriod,
        rebalanceInterval,
        failAuctionPeriod,
        lastRebalanceTimestamp,
      );
    });

    async function subject(): Promise<string> {
      return rebalancingSetTokenFactory.createSet.sendTransactionAsync(
        subjectComponents,
        subjectUnits,
        subjectNaturalUnit,
        subjectName,
        subjectSymbol,
        subjectCallData,
        { from: subjectCaller },
      );
    }

    describe('when the caller is not core', async () => {
      beforeEach(async () => {
        subjectCaller = notCoreAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
