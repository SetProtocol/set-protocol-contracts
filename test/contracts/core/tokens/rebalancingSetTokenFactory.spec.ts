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
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
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
import { RebalancingHelper } from '@utils/helpers/rebalancingHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { SetProtocolUtils: SetUtils } = setProtocolUtils;
const { expect } = chai;
const blockchain = new Blockchain(web3);


contract('RebalancingSetTokenFactory', accounts => {
  const [
    deployerAccount,
    rebalancingTokenManagerAccount,
    notCoreAccount,
    notSetTokenCreatedByCore,
  ] = accounts;

  let rebalancingSetTokenFactory: RebalancingSetTokenFactoryContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let core: CoreContract;
  let rebalanceAuctionModule: RebalanceAuctionModuleContract;
  let setToken: SetTokenContract;
  let setTokenFactory: SetTokenFactoryContract;
  let rebalancingComponentWhiteList: WhiteListContract;

  const coreHelper = new CoreHelper(deployerAccount, deployerAccount);
  const erc20Helper = new ERC20Helper(deployerAccount);
  const rebalanceHelper = new RebalancingHelper(deployerAccount, coreHelper, erc20Helper, blockchain);

  before(async () => {
    ABIDecoder.addABI(CoreContract.getAbi());
  });

  after(async () => {
    ABIDecoder.removeABI(CoreContract.getAbi());
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
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    let subjectCoreAddress: Address;
    let subjectWhiteListAddress: Address;
    let subjectMinimumRebalanceInterval: BigNumber;
    let subjectMinimumProposalPeriod: BigNumber;
    let subjectMinimumTimeToPivot: BigNumber;
    let subjectMaximumTimeToPivot: BigNumber;
    let subjectMinimumNaturalUnit: BigNumber;
    let subjectMaximumNaturalUnit: BigNumber;

    beforeEach(async () => {
      subjectCoreAddress = core.address;
      subjectWhiteListAddress = rebalancingComponentWhiteList.address;
      subjectMinimumRebalanceInterval = ONE_DAY_IN_SECONDS;
      subjectMinimumProposalPeriod = ONE_DAY_IN_SECONDS;
      subjectMinimumTimeToPivot = ONE_DAY_IN_SECONDS.div(4);
      subjectMaximumTimeToPivot = ONE_DAY_IN_SECONDS.mul(3);
      subjectMinimumNaturalUnit = DEFAULT_REBALANCING_MINIMUM_NATURAL_UNIT;
      subjectMaximumNaturalUnit = DEFAULT_REBALANCING_MAXIMUM_NATURAL_UNIT;
    });

    async function subject(): Promise<RebalancingSetTokenFactoryContract> {
      return await coreHelper.deployRebalancingSetTokenFactoryAsync(
        subjectCoreAddress,
        subjectWhiteListAddress,
        subjectMinimumRebalanceInterval,
        subjectMinimumProposalPeriod,
        subjectMinimumTimeToPivot,
        subjectMaximumTimeToPivot,
        subjectMinimumNaturalUnit,
        subjectMaximumNaturalUnit,
      );
    }

    it('should have the correct core address', async () => {
      const rebalancingTokenFactory = await subject();

      const coreAddress = await rebalancingTokenFactory.core.callAsync();
      expect(coreAddress).to.equal(subjectCoreAddress);
    });

    it('should have the correct whitelist address', async () => {
      const rebalancingTokenFactory = await subject();

      const whiteListAddress = await rebalancingTokenFactory.rebalanceComponentWhitelist.callAsync();
      expect(whiteListAddress).to.equal(subjectWhiteListAddress);
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

    it('should have the correct minimum time to pivot', async () => {
      const rebalancingTokenFactory = await subject();

      const minimumTimeToPivot = await rebalancingTokenFactory.minimumTimeToPivot.callAsync();
      expect(minimumTimeToPivot).to.bignumber.equal(subjectMinimumTimeToPivot);
    });

    it('should have the correct maximum time to pivot', async () => {
      const rebalancingTokenFactory = await subject();

      const maximumTimeToPivot = await rebalancingTokenFactory.maximumTimeToPivot.callAsync();
      expect(maximumTimeToPivot).to.bignumber.equal(subjectMaximumTimeToPivot);
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
    let callDataProposalPeriod: BigNumber;
    let callDataRebalanceInterval: BigNumber;

    beforeEach(async () => {
      rebalancingSetTokenFactory = await coreHelper.deployRebalancingSetTokenFactoryAsync(
        core.address,
        rebalancingComponentWhiteList.address
      );
      await coreHelper.addFactoryAsync(core, rebalancingSetTokenFactory);

      subjectComponents = [setToken.address];
      subjectUnits = [new BigNumber(1)];
      subjectNaturalUnit = new BigNumber(10 ** 10);
      subjectName = 'My Rebalancing Set';
      subjectSymbol = 'REBAL';

      callDataManagerAddress = rebalancingTokenManagerAccount;
      callDataProposalPeriod = new BigNumber(86400);
      callDataRebalanceInterval = new BigNumber(86400).mul(2);
      subjectCallData = SetUtils.generateRebalancingSetTokenCallData(
        callDataManagerAddress,
        callDataProposalPeriod,
        callDataRebalanceInterval,
      );
    });

    async function subject(): Promise<RebalancingSetTokenContract> {
      return await rebalanceHelper.createRebalancingTokenAsync(
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
      it('should have the correct name', async () => {
        const rebalancingToken = await subject();

        const resultName = await rebalancingToken.name.callAsync();
        expect(resultName).to.equal(subjectName);
      });

      it('should have the correct name', async () => {
        const rebalancingToken = await subject();

        const resultSymbol = await rebalancingToken.symbol.callAsync();
        expect(resultSymbol).to.equal(subjectSymbol);
      });

      it('should have the correct manager address', async () => {
        const rebalancingToken = await subject();

        const managerAddress = await rebalancingToken.manager.callAsync();
        expect(managerAddress).to.equal(callDataManagerAddress);
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

      it('should have the correct natural unit', async () => {
        const rebalancingToken = await subject();

        const naturalUnit = await rebalancingToken.naturalUnit.callAsync();
        expect(naturalUnit).to.bignumber.equal(subjectNaturalUnit);
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
      rebalancingSetTokenFactory = await coreHelper.deployRebalancingSetTokenFactoryAsync(
        core.address,
        rebalancingComponentWhiteList.address
      );
      await coreHelper.addFactoryAsync(core, rebalancingSetTokenFactory);

      subjectCaller = notCoreAccount;
      subjectComponents = [setToken.address];
      subjectUnits = [new BigNumber(1)];
      subjectNaturalUnit = new BigNumber(10 ** 10);
      subjectName = SetUtils.stringToBytes('My Rebalancing Set');
      subjectSymbol = SetUtils.stringToBytes('REBAL');

      const managerAddress = rebalancingTokenManagerAccount;
      const proposalPeriod = new BigNumber(86400);
      const rebalanceInterval = new BigNumber(86400).mul(2);
      subjectCallData = SetUtils.generateRebalancingSetTokenCallData(
        managerAddress,
        proposalPeriod,
        rebalanceInterval,
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
