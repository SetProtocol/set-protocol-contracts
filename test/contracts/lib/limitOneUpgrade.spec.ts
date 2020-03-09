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
import { ONE, ZERO, ZERO_BYTES  } from '@utils/constants';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const UnrestrictedTimeLockUpgrade = artifacts.require('UnrestrictedTimeLockUpgrade');
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('LimitOneUpgrade', accounts => {
  const [
    ownerAccount,
    upgradeAccount,
    otherAccount,
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
    const subjectUpgradeAddress: Address = upgradeAccount;
    let subjectCaller: Address = ownerAccount;

    async function subject(): Promise<string> {
      return limitOneUpgradeMock.testLimitOneUpgrade.sendTransactionAsync(
        subjectUpgradeAddress,
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

      it('upgradeIdentifier should return the upgrade hash', async () => {
        const txHash = await subject();
        const { input } = await web3.eth.getTransaction(txHash);

        const expectedUpgradeHash = web3.utils.soliditySha3(input);

        const actualUpgradeHash = await limitOneUpgradeMock.upgradeIdentifier.callAsync(subjectUpgradeAddress);
        expect(actualUpgradeHash).to.equal(expectedUpgradeHash);
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
          subjectUpgradeAddress,
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

      it('should set upgradeIdentifier to 0', async () => {
        await subject();

        const actualUpgradeHash = await limitOneUpgradeMock.upgradeIdentifier.callAsync(subjectUpgradeAddress);
        expect(actualUpgradeHash).to.equal(ZERO_BYTES);
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

  describe('#removeRegisteredUpgrade', async () => {
    let subjectUpgradeAddress: Address;
    let subjectHash: string;
    let subjectCaller: Address;

    const subjectTestUint: BigNumber = new BigNumber(1);

    beforeEach(async () => {
      subjectUpgradeAddress = upgradeAccount;
      subjectCaller = ownerAccount;

      await limitOneUpgradeMock.setTimeLockPeriod.sendTransactionAsync(
        ONE,
        { from: subjectCaller },
      );

      const txHash = await limitOneUpgradeMock.testLimitOneUpgrade.sendTransactionAsync(
        subjectUpgradeAddress,
        subjectTestUint,
        { from: subjectCaller },
      );

      const { input } = await web3.eth.getTransaction(txHash);
      subjectHash = web3.utils.soliditySha3(input);
    });

    async function subject(): Promise<string> {
      return limitOneUpgradeMock.removeRegisteredUpgrade.sendTransactionAsync(
        subjectUpgradeAddress,
        subjectHash,
        { from: subjectCaller },
      );
    }

    it('sets the upgradeHash to 0', async () => {
      await subject();

      const actualTimestamp = await limitOneUpgradeMock.timeLockedUpgrades.callAsync(subjectHash);
      expect(actualTimestamp).to.bignumber.equal(ZERO);
    });

    it('sets the upgradeIdentifier to 0', async () => {
      await subject();

      const actualUpgradeHash = await limitOneUpgradeMock.upgradeIdentifier.callAsync(subjectUpgradeAddress);
      expect(actualUpgradeHash).to.bignumber.equal(ZERO_BYTES);
    });

    describe('when the hash specified is not registered', async () => {
      beforeEach(async () => {
        subjectHash = web3.utils.soliditySha3(5);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the hash does not match the expected one for the upgrade address', async () => {
      beforeEach(async () => {
        await limitOneUpgradeMock.testLimitOneUpgrade.sendTransactionAsync(
          otherAccount,
          subjectTestUint,
          { from: subjectCaller },
        );

        subjectUpgradeAddress = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
