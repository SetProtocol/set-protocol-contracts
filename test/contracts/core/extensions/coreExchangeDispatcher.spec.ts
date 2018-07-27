import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { SetProtocolUtils as Utils }  from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

// Types
import { Address, Log } from '../../../../types/common.js';

// Contract types
import { CoreContract } from '../../../../types/generated/core';

// Artifacts
const Core = artifacts.require('Core');

// Core wrapper
import { CoreWrapper } from '../../../../utils/coreWrapper';

// Testing Set up
import { BigNumberSetup } from '../../../../utils/bigNumberSetup';
import ChaiSetup from '../../../../utils/chaiSetup';
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;

import {
  expectRevertError,
} from '../../../../utils/tokenAssertions';

import {
  assertLogEquivalence,
  getFormattedLogsFromTxHash
} from '../../../../utils/logs';
import { ExchangeRegistered } from '../../../../utils/contract_logs/core';

contract('CoreExchangeDispatcher', accounts => {
  const [
    ownerAccount,
    notOwnerAccount,
    zeroExWrapperAddress,
  ] = accounts;

  let core: CoreContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    core = await coreWrapper.deployCoreAsync();
  });

  describe('#registerExchange', async () => {
    let subjectCaller: Address;
    let subjectExchangeId: BigNumber;
    let subjectExchangeAddress: Address;

    beforeEach(async () => {
      subjectCaller = ownerAccount;
      subjectExchangeId = new BigNumber(Utils.EXCHANGES.ZERO_EX);
      subjectExchangeAddress = zeroExWrapperAddress;
    });

    async function subject(): Promise<string> {
      return core.registerExchange.sendTransactionAsync(
        subjectExchangeId,
        subjectExchangeAddress,
        { from: subjectCaller },
      );
    }

    it('sets exchange address correctly', async () => {
      await subject();

      const exchangeAddress = await core.exchanges.callAsync(subjectExchangeId);
      expect(exchangeAddress).to.eql(subjectExchangeAddress);
    });

    it('emits a IssuanceComponentDeposited even for each component deposited', async () => {
      const txHash = await subject();
      const formattedLogs = await getFormattedLogsFromTxHash(txHash);

      const expectedLogs: Log[] = [
        ExchangeRegistered(
          core.address,
          subjectExchangeId,
          subjectExchangeAddress,
        ),
      ];

      await assertLogEquivalence(expectedLogs, formattedLogs);
    });

    describe('when the caller is not the owner of the contract', async () => {
      beforeEach(async () => {
        subjectCaller = notOwnerAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
