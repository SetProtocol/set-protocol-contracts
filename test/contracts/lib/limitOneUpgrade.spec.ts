require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { LimitOneUpgradeMockContract } from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { ZERO, ONE } from '@utils/constants';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const UnrestrictedTimeLockUpgrade = artifacts.require('UnrestrictedTimeLockUpgrade');
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('UnrestrictedTimeLockUpgrade', accounts => {
  const [
    ownerAccount,
  ] = accounts;

  let limitOneUpgradeMock: LimitOneUpgradeMockContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);

  before(async () => {
    ABIDecoder.addABI(UnrestrictedTimeLockUpgrade.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(UnrestrictedTimeLockUpgrade.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    limitOneUpgradeMock = await coreHelper.deployLimitOneUpgradeMockAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#testLimitOneUpgrade', async () => {
    let subjectTestUint: BigNumber = ONE;
    let subjectCaller: Address = ownerAccount;

    async function subject(): Promise<string> {
      return limitOneUpgradeMock.testLimitOneUpgrade.sendTransactionAsync(
        subjectTestUint,
        { from: subjectCaller },
      );
    }

    describe('when the timeLockPeriod is 0', async () => {
      it('sets testUint correctly', async () => {
        await subject();

        const currentTestUint = await limitOneUpgradeMock.testUint.callAsync();
        expect(currentTestUint).to.bignumber.equal(subjectTestUint);
      });
    });

    describe('when the timeLockPeriod is positive && no hash is set', async () => {
      beforeEach(async () => {
        await limitOneUpgradeMock.setTimeLockPeriod.sendTransactionAsync(
          ONE,
          { from: subjectCaller },
        );
      });

      it('should set upgradeInProgress to true', async () => {
        await subject();

        const isBeingUpgraded = await limitOneUpgradeMock.upgradeInProgress.callAsync(subjectCaller);
        expect(isBeingUpgraded).to.be.true;
      });

      it('should not update the testUint', async () => {
        await subject();

        const currentTestUint = await limitOneUpgradeMock.testUint.callAsync();
        expect(currentTestUint).to.bignumber.equal(ZERO);
      });
    });

    describe('when the timeLockPeriod is positive && a hash is set', async () => {
      const subjectTimeLockPeriod = ONE;
      const subjectTimeElapsedPeriod = subjectTimeLockPeriod;

      beforeEach(async () => {
        subjectCaller = ownerAccount;

        await limitOneUpgradeMock.setTimeLockPeriod.sendTransactionAsync(
          subjectTimeLockPeriod,
          { from: subjectCaller },
        );

        await limitOneUpgradeMock.testLimitOneUpgrade.sendTransactionAsync(
          subjectTestUint,
          { from: subjectCaller },
        );

        await blockchain.increaseTimeAsync(subjectTimeElapsedPeriod);
      });

      it('should update the testUint', async () => {
        await subject();

        const currentTestUint = await limitOneUpgradeMock.testUint.callAsync();
        expect(currentTestUint).to.bignumber.equal(subjectTestUint);
      });

      it('should set upgradeInProgress to false', async () => {
        await subject();

        const isBeingUpgraded = await limitOneUpgradeMock.upgradeInProgress.callAsync(subjectCaller);
        expect(isBeingUpgraded).to.be.false;
      });

      describe('when the passed parameters are different', async () => {
        beforeEach(async () => {
          subjectTestUint = new BigNumber(2);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });
  });
});
