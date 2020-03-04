require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';
import { Address, Bytes, Log } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { UnrestrictedTimeLockUpgradeMockContract } from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { UpgradeRegistered, RemoveRegisteredUpgrade } from '@utils/contract_logs/core';
import { ZERO, ONE, UNLIMITED_ALLOWANCE_IN_BASE_UNITS } from '@utils/constants';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const UnrestrictedTimeLockUpgrade = artifacts.require('UnrestrictedTimeLockUpgrade');
const { SetProtocolTestUtils: SetTestUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('UnrestrictedTimeLockUpgrade', accounts => {
  const [
    ownerAccount,
    otherAccount,
  ] = accounts;

  let timeLockUpgradeMock: UnrestrictedTimeLockUpgradeMockContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);

  before(async () => {
    ABIDecoder.addABI(UnrestrictedTimeLockUpgrade.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(UnrestrictedTimeLockUpgrade.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    timeLockUpgradeMock = await coreHelper.deployUnrestrictedTimeLockUpgradeMockAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#setTimeLockPeriod', async () => {
    let subjectCaller: Address;
    const subjectTimeLockPeriod: BigNumber = new BigNumber(86400);

    beforeEach(async () => {
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return timeLockUpgradeMock.setTimeLockPeriod.sendTransactionAsync(
        subjectTimeLockPeriod,
        { from: subjectCaller },
      );
    }

    it('updates the timelock', async () => {
      await subject();

      const timeLockPeriod = await timeLockUpgradeMock.timeLockPeriod.callAsync();
      expect(timeLockPeriod).to.bignumber.equal(subjectTimeLockPeriod);
    });

    describe('when the timelock is not greater than the existing', async () => {
      const previouslyTimeLock = subjectTimeLockPeriod.mul(2);

      beforeEach(async () => {
        await timeLockUpgradeMock.setTimeLockPeriod.sendTransactionAsync(
          previouslyTimeLock,
          { from: subjectCaller },
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the timelock is greater than existing', async () => {
      const previouslyTimeLock = subjectTimeLockPeriod.div(2);

      beforeEach(async () => {
        await timeLockUpgradeMock.setTimeLockPeriod.sendTransactionAsync(
          previouslyTimeLock,
          { from: subjectCaller },
        );
      });

      it('should update the timelock', async () => {
        await subject();

        const expectedTimeLock = await timeLockUpgradeMock.timeLockPeriod.callAsync();
        expect(expectedTimeLock).to.bignumber.equal(subjectTimeLockPeriod);
      });
    });

    describe('when the caller is not the owner of the contract', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#testTimeLockUpgrade', async () => {
    const subjectTestUint: BigNumber = ONE;
    let subjectCaller: Address = ownerAccount;

    async function subject(): Promise<string> {
      return timeLockUpgradeMock.testTimeLockUpgrade.sendTransactionAsync(
        subjectTestUint,
        { from: subjectCaller },
      );
    }

    describe('when the timeLockPeriod is 0', async () => {
      it('sets testUint correctly', async () => {
        await subject();

        const currentTestUint = await timeLockUpgradeMock.testUint.callAsync();
        expect(currentTestUint).to.bignumber.equal(subjectTestUint);
      });
    });

    describe('when the timeLockPeriod is positive && no hash is set', async () => {
      beforeEach(async () => {
        await timeLockUpgradeMock.setTimeLockPeriod.sendTransactionAsync(
          ONE,
          { from: subjectCaller },
        );
      });

      it('should register the timeLockedUpgrade with the transaction timestamp', async () => {
        const txHash = await subject();
        const { blockHash, input } = await web3.eth.getTransaction(txHash);
        const { timestamp } = await web3.eth.getBlock(blockHash);

        const upgradeHash = web3.utils.soliditySha3(input);
        const actualTimestamp = await timeLockUpgradeMock.timeLockedUpgrades.callAsync(upgradeHash);
        expect(actualTimestamp).to.bignumber.equal(timestamp);
      });

      it('should not update the testUint', async () => {
        await subject();

        const currentTestUint = await timeLockUpgradeMock.testUint.callAsync();
        expect(currentTestUint).to.bignumber.equal(ZERO);
      });

      it('emits a UpgradeRegisteredV2 event', async () => {
        const txHash = await subject();
        const logs = await setTestUtils.getLogsFromTxHash(txHash);

        const { blockHash, input } = await web3.eth.getTransaction(txHash);
        const { timestamp } = await web3.eth.getBlock(blockHash);

        const upgradeHash = web3.utils.soliditySha3(input);
        const expectedLogs: Log[] = [
          UpgradeRegistered(
            timeLockUpgradeMock.address,
            upgradeHash,
            timestamp.toString(),
          ),
        ];

        await SetTestUtils.assertLogEquivalence(logs, expectedLogs);
      });
    });

    describe('when the timeLockPeriod is positive && a hash is set', async () => {
      let subjectUpgradeHash: Bytes;
      let subjectTimeLockPeriod = ONE;
      let subjectTimeElapsedPeriod = subjectTimeLockPeriod;

      beforeEach(async () => {
        subjectCaller = ownerAccount;

        await timeLockUpgradeMock.setTimeLockPeriod.sendTransactionAsync(
          subjectTimeLockPeriod,
          { from: subjectCaller },
        );

        const txHash = await timeLockUpgradeMock.testTimeLockUpgrade.sendTransactionAsync(
          subjectTestUint,
          { from: subjectCaller },
        );

        const { input } = await web3.eth.getTransaction(txHash);
        subjectUpgradeHash = web3.utils.soliditySha3(input);

        await blockchain.increaseTimeAsync(subjectTimeElapsedPeriod);
      });

      it('should clear the timestamp from the timeLockedUpgrade state', async () => {
        await subject();

        const actualTimestamp = await timeLockUpgradeMock.timeLockedUpgrades.callAsync(subjectUpgradeHash);
        expect(actualTimestamp).to.bignumber.equal(ZERO);
      });

      it('should update the testUint', async () => {
        await subject();

        const currentTestUint = await timeLockUpgradeMock.testUint.callAsync();
        expect(currentTestUint).to.bignumber.equal(subjectTestUint);
      });

      describe('when the time lock period has not elapsed', async () => {
        before(async () => {
          subjectTimeLockPeriod = UNLIMITED_ALLOWANCE_IN_BASE_UNITS.div(2).ceil();
          subjectTimeElapsedPeriod = ZERO;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });
  });

  describe('#removeRegisteredUpgrade', async () => {
    let subjectHash: string;
    let subjectCaller: Address;

    const subjectTestUint: BigNumber = new BigNumber(1);

    beforeEach(async () => {
      subjectCaller = ownerAccount;

      await timeLockUpgradeMock.setTimeLockPeriod.sendTransactionAsync(
        ONE,
        { from: subjectCaller },
      );

      const txHash = await timeLockUpgradeMock.testTimeLockUpgrade.sendTransactionAsync(
        subjectTestUint,
        { from: subjectCaller },
      );

      const { input } = await web3.eth.getTransaction(txHash);
      subjectHash = web3.utils.soliditySha3(input);

    });

    async function subject(): Promise<string> {
      return timeLockUpgradeMock.removeRegisteredUpgrade.sendTransactionAsync(
        subjectHash,
        { from: subjectCaller },
      );
    }

    it('sets the upgradeHash to 0', async () => {
      await subject();

      const actualTimestamp = await timeLockUpgradeMock.timeLockedUpgrades.callAsync(subjectHash);
      expect(actualTimestamp).to.bignumber.equal(ZERO);
    });

    it('emits a RemoveRegisteredUpgrade event', async () => {
      const txHash = await subject();
      const logs = await setTestUtils.getLogsFromTxHash(txHash);

      const expectedLogs: Log[] = [
        RemoveRegisteredUpgrade(
          timeLockUpgradeMock.address,
          subjectHash,
        ),
      ];

      await SetTestUtils.assertLogEquivalence(logs, expectedLogs);
    });

    describe('when the hash specified is not registered', async () => {
      beforeEach(async () => {
        subjectHash = web3.utils.soliditySha3(5);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the caller is not the owner of the contract', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
