require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';
import { Address, Log } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { CoreContract } from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { OperationStateChanged } from '@utils/contract_logs/core';
import { ZERO, ONE } from '@utils/constants';
import { CoreHelper } from '@utils/helpers/coreHelper';
import { getWeb3 } from '@utils/web3Helper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { SetProtocolTestUtils: SetTestUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('CoreOperationState', accounts => {
  const [
    ownerAccount,
    notOwnerAccount,
  ] = accounts;

  let core: CoreContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);

  before(async () => {
    ABIDecoder.addABI(CoreContract.getAbi());
  });

  after(async () => {
    ABIDecoder.removeABI(CoreContract.getAbi());
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    core = await coreHelper.deployCoreAndDependenciesAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#setOperationState', async () => {
    let subjectOperationState: BigNumber;
    let subjectCaller: Address;

    beforeEach(async () => {
      subjectOperationState = ONE;
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return core.setOperationState.sendTransactionAsync(
        subjectOperationState,
        { from: subjectCaller },
      );
    }

    it('sets the operation state correctly', async () => {
      await subject();

      const currentOperationState = await core.operationState.callAsync();
      expect(currentOperationState).to.bignumber.equal(subjectOperationState);
    });

    it('emits a OperationStateChanged event', async () => {
      const txHash = await subject();
      const logs = await setTestUtils.getLogsFromTxHash(txHash);

      const expectedLogs: Log[] = [
        OperationStateChanged(
          core.address,
          ZERO,
          subjectOperationState,
        ),
      ];

      await SetTestUtils.assertLogEquivalence(logs, expectedLogs);
    });

    describe('when the operation state input is Zero', async () => {
      beforeEach(async () => {
        await core.setOperationState.sendTransactionAsync(
          ONE,
          { from: subjectCaller },
        );

        subjectOperationState = ZERO;
      });

      it('sets the operation state correctly', async () => {
        await subject();

        const currentOperationState = await core.operationState.callAsync();
        expect(currentOperationState).to.bignumber.equal(subjectOperationState);
      });
    });

    describe('when the caller is not the owner', async () => {
      beforeEach(async () => {
        subjectCaller = notOwnerAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the input operation state is the invalid state', async () => {
      beforeEach(async () => {
        subjectOperationState = new BigNumber(2);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the new operation state is the same as the existing state', async () => {
      beforeEach(async () => {
        await core.setOperationState.sendTransactionAsync(
          subjectOperationState,
          { from: subjectCaller },
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
