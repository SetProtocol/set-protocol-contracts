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
} from '@utils/contracts';
import { ether } from '@utils/units';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { ZERO } from '@utils/constants';
import { getWeb3 } from '@utils/web3Helper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';
import { RebalancingWrapper } from '@utils/wrappers/rebalancingWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const Core = artifacts.require('Core');
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

  const coreWrapper = new CoreWrapper(deployerAccount, deployerAccount);
  const erc20Wrapper = new ERC20Wrapper(deployerAccount);
  const rebalanceWrapper = new RebalancingWrapper(deployerAccount, coreWrapper, erc20Wrapper, blockchain);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    vault = await coreWrapper.deployVaultAsync();
    transferProxy = await coreWrapper.deployTransferProxyAsync();
    core = await coreWrapper.deployCoreAsync(transferProxy, vault);
    rebalanceAuctionModule = await coreWrapper.deployRebalanceAuctionModuleAsync(core, vault);
    await coreWrapper.addModuleAsync(core, rebalanceAuctionModule.address);

    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);
    await coreWrapper.addFactoryAsync(core, setTokenFactory);

    const components = await erc20Wrapper.deployTokensAsync(2, deployerAccount);
    const componentAddresses = _.map(components, token => token.address);
    const componentUnits = _.map(components, () => ether(4)); // Multiple of naturalUnit
    const naturalUnit: BigNumber = ether(2);
    setToken = await coreWrapper.createSetTokenAsync(
      core,
      setTokenFactory.address,
      componentAddresses,
      componentUnits,
      naturalUnit,
    );

    const rebalancingComponentWhiteList = await coreWrapper.deployWhiteListAsync();
    rebalancingSetTokenFactory = await coreWrapper.deployRebalancingSetTokenFactoryAsync(
      core.address,
      rebalancingComponentWhiteList.address
    );
    await coreWrapper.addFactoryAsync(core, rebalancingSetTokenFactory);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#create from core', async () => {
    let subjectComponents: Address[] = [];
    let subjectUnits: BigNumber[] = [];
    let subjectNaturalUnit: BigNumber = ZERO;
    let subjectName: Bytes;
    let subjectSymbol: Bytes;
    let subjectCallData: Bytes;

    let callDataManagerAddress: Address;
    let callDataProposalPeriod: BigNumber;
    let callDataRebalanceInterval: BigNumber;

    beforeEach(async () => {
      subjectComponents = [setToken.address];
      subjectUnits = [new BigNumber(1)];
      subjectNaturalUnit = ZERO;
      subjectName = 'My Rebalancing Set';
      subjectSymbol = 'REBAL';

      callDataManagerAddress = rebalancingTokenManagerAccount;
      callDataProposalPeriod = new BigNumber(86400);
      callDataRebalanceInterval = new BigNumber(86400);
      subjectCallData = SetUtils.generateRSetTokenCallData(
        callDataManagerAddress,
        callDataProposalPeriod,
        callDataRebalanceInterval,
      );
    });

    async function subject(): Promise<RebalancingSetTokenContract> {
      return await rebalanceWrapper.createRebalancingTokenAsync(
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
      subjectCaller = notCoreAccount;
      subjectComponents = [setToken.address];
      subjectUnits = [new BigNumber(1)];
      subjectNaturalUnit = ZERO;
      subjectName = SetUtils.stringToBytes('My Rebalancing Set');
      subjectSymbol = SetUtils.stringToBytes('REBAL');

      const managerAddress = rebalancingTokenManagerAccount;
      const proposalPeriod = new BigNumber(86400);
      const rebalanceInterval = new BigNumber(86400);
      const entranceFee = ZERO;
      const rebalanceFee = ZERO;
      subjectCallData = SetUtils.generateRebalancingSetTokenCallData(
        managerAddress,
        proposalPeriod,
        rebalanceInterval,
        entranceFee,
        rebalanceFee,
      );
    });

    async function subject(): Promise<string> {
      return rebalancingSetTokenFactory.create.sendTransactionAsync(
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
