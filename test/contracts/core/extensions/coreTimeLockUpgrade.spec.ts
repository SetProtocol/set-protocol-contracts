require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';
import { Address, Bytes, Log } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { CoreTimeLockUpgradeMockContract } from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { UpgradeRegistered } from '@utils/contract_logs/core';
import { ZERO, ONE, UNLIMITED_ALLOWANCE_IN_BASE_UNITS } from '@utils/constants';
import { CoreWrapper } from '@utils/coreWrapper';
import { getWeb3 } from '@utils/web3Helper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const CoreTimeLockUpgrade = artifacts.require('CoreTimeLockUpgrade');
const { SetProtocolTestUtils: SetTestUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('CoreTimeLockUpgrade', accounts => {
  const [
    ownerAccount,
  ] = accounts;

  let coreTimeLockUpgradeMock: CoreTimeLockUpgradeMockContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);

  before(async () => {
    ABIDecoder.addABI(CoreTimeLockUpgrade.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(CoreTimeLockUpgrade.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    coreTimeLockUpgradeMock = await coreWrapper.deployCoreTimeLockUpgradeMockAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#testTimeLockUpgrade', async () => {
    const subjectTestUint: BigNumber = ONE;
    const subjectCaller: Address = ownerAccount;

    async function subject(): Promise<string> {
      return coreTimeLockUpgradeMock.testTimeLockUpgrade.sendTransactionAsync(
        subjectTestUint,
        { from: subjectCaller },
      );
    }

    describe('when the timeLockPeriod is 0', async () => {
      it('sets testUint correctly', async () => {
        await subject();

        const currentTestUint = await coreTimeLockUpgradeMock.testUint.callAsync();
        expect(currentTestUint).to.bignumber.equal(subjectTestUint);
      });
    });

    describe('when the timeLockPeriod is positive && no hash is set', async () => {
      beforeEach(async () => {
        await coreTimeLockUpgradeMock.setTimeLockPeriod.sendTransactionAsync(
          ONE,
          { from: subjectCaller },
        );
      });

      it('should register the timeLockedUpgrade with the transaction timestamp', async () => {
        const txHash = await subject();
        const { blockHash, input } = await web3.eth.getTransaction(txHash);
        const { timestamp } = await web3.eth.getBlock(blockHash);

        const upgradeHash = web3.utils.soliditySha3(input);
        const actualTimestamp = await coreTimeLockUpgradeMock.timeLockedUpgrades.callAsync(upgradeHash);
        expect(actualTimestamp).to.bignumber.equal(timestamp);
      });

      it('should not update the testUint', async () => {
        await subject();

        const currentTestUint = await coreTimeLockUpgradeMock.testUint.callAsync();
        expect(currentTestUint).to.bignumber.equal(ZERO);
      });

      it('emits a UpgradeRegistered event', async () => {
        const txHash = await subject();
        const logs = await setTestUtils.getLogsFromTxHash(txHash);

        const { blockHash, input } = await web3.eth.getTransaction(txHash);
        const { timestamp } = await web3.eth.getBlock(blockHash);

        const upgradeHash = web3.utils.soliditySha3(input);
        const expectedLogs: Log[] = [
          UpgradeRegistered(
            coreTimeLockUpgradeMock.address,
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
        await coreTimeLockUpgradeMock.setTimeLockPeriod.sendTransactionAsync(
          subjectTimeLockPeriod,
          { from: subjectCaller },
        );

        const txHash = await coreTimeLockUpgradeMock.testTimeLockUpgrade.sendTransactionAsync(
          subjectTestUint,
          { from: subjectCaller },
        );

        const { input } = await web3.eth.getTransaction(txHash);
        subjectUpgradeHash = web3.utils.soliditySha3(input);

        await blockchain.increaseTimeAsync(subjectTimeElapsedPeriod);
      });

      it('should clear the timestamp from the timeLockedUpgrade state', async () => {
        await subject();

        const actualTimestamp = await coreTimeLockUpgradeMock.timeLockedUpgrades.callAsync(subjectUpgradeHash);
        expect(actualTimestamp).to.bignumber.equal(ZERO);
      });

      it('should update the testUint', async () => {
        await subject();

        const currentTestUint = await coreTimeLockUpgradeMock.testUint.callAsync();
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
});
