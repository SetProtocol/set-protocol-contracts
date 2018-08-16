import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '../../utils/chaiSetup';
import { BigNumberSetup } from '../../utils/bigNumberSetup';
import {
  RebalancingTokenContract,
  StandardTokenMockContract,
} from '../../utils/contracts';
import { ether } from '../../utils/units';
import { ZERO } from '../../utils/constants';
import { expectRevertError } from '../../utils/tokenAssertions';
import { CoreWrapper } from '../../utils/coreWrapper';
import { ERC20Wrapper } from '../../utils/erc20Wrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;
const RebalancingToken = artifacts.require('RebalancingToken');

contract('RebalancingSet', accounts => {
  const [
    deployerAccount,
    managerAccount,
    factoryAccount,
  ] = accounts;

  let rebalancingToken: RebalancingTokenContract;
  let components: StandardTokenMockContract[] = [];

  const coreWrapper = new CoreWrapper(deployerAccount, deployerAccount);
  const erc20Wrapper = new ERC20Wrapper(deployerAccount);

  before(async () => {
    ABIDecoder.addABI(RebalancingToken.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(RebalancingToken.abi);
  });

  describe('#constructor', async () => {
    let subjectFactory: Address;
    let subjectManager: Address;
    let subjectInitialSet: Address;
    let subjectInitialUnitShares: BigNumber;
    let subjectProposalPeriod: BigNumber;
    let subjectRebalanceInterval: BigNumber;
    const subjectName: string = 'Rebalancing Set';
    const subjectSymbol: string = 'RBSET';

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(1, deployerAccount);

      subjectFactory = factoryAccount;
      subjectManager = managerAccount;
      subjectInitialSet = components[0].address,
      subjectInitialUnitShares = ether(1);
      subjectProposalPeriod = new BigNumber(100000);
      subjectRebalanceInterval = new BigNumber(100000);
    });

    async function subject(): Promise<RebalancingTokenContract> {
      return coreWrapper.deployRebalancingTokenAsync(
        subjectFactory,
        subjectManager,
        subjectInitialSet,
        subjectInitialUnitShares,
        subjectProposalPeriod,
        subjectRebalanceInterval,
        subjectName,
        subjectSymbol,
      );
    }

    it('creates a set with the correct name', async () => {
      rebalancingToken = await subject();

      const rebalancingTokenName = await rebalancingToken.name.callAsync();
      expect(rebalancingTokenName).to.equal(subjectName);
    });

    it('creates a set with the correct symbol', async () => {
      rebalancingToken = await subject();

      const rebalancingTokenSymbol = await rebalancingToken.symbol.callAsync();
      expect(rebalancingTokenSymbol).to.equal(subjectSymbol);
    });

    it('creates a set with the correct factory', async () => {
      rebalancingToken = await subject();

      const rebalancingTokenFactory = await rebalancingToken.factory.callAsync();
      expect(rebalancingTokenFactory).to.equal(subjectFactory);
    });

    it('creates a set with the correct manager', async () => {
      rebalancingToken = await subject();

      const rebalancingTokenManager = await rebalancingToken.manager.callAsync();
      expect(rebalancingTokenManager).to.equal(subjectManager);
    });

    it('creates a set with the correct initialSet', async () => {
      rebalancingToken = await subject();

      const rebalancingTokenInitialSet = await rebalancingToken.currentSet.callAsync();
      expect(rebalancingTokenInitialSet).to.equal(subjectInitialSet);
    });

    it('creates a set with the correct initialUnitShares', async () => {
      rebalancingToken = await subject();

      const rebalancingTokenInitialUnitShares = await rebalancingToken.unitShares.callAsync();
      expect(rebalancingTokenInitialUnitShares).to.be.bignumber.equal(subjectInitialUnitShares);
    });

    it('creates a set with the correct proposalPeriod', async () => {
      rebalancingToken = await subject();

      const rebalancingTokenProposalPeriod = await rebalancingToken.proposalPeriod.callAsync();
      expect(rebalancingTokenProposalPeriod).to.be.bignumber.equal(subjectProposalPeriod);
    });

    it('creates a set with the correct rebalanceInterval', async () => {
      rebalancingToken = await subject();

      const rebalancingInterval = await rebalancingToken.rebalanceInterval.callAsync();
      expect(rebalancingInterval).to.be.bignumber.equal(subjectRebalanceInterval);
    });

    it('sets the rebalancingToken state to Default (0)', async () => {
      rebalancingToken = await subject();

      const rebalancingTokenState = await rebalancingToken.rebalanceState.callAsync();
      const expectedState = ZERO;
      expect(rebalancingTokenState).to.be.bignumber.equal(expectedState);
    });

    describe('when the proposal period is too low', async () => {
      beforeEach(async () => {
        subjectProposalPeriod = new BigNumber(5000);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
    describe('when the rebalanceInterval is too low', async () => {
      beforeEach(async () => {
        subjectRebalanceInterval = new BigNumber(5000);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
