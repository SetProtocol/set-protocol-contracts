import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address, Log } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '../../../utils/chaiSetup';
import { BigNumberSetup } from '../../../utils/bigNumberSetup';
import { CoreContract } from '../../../utils/contracts';
import { expectRevertError } from '../../../utils/tokenAssertions';
import { Blockchain } from '../../../utils/blockchain';
import { ExchangeRegistered } from '../../../utils/contract_logs/core';
import { CoreWrapper } from '../../../utils/coreWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const Core = artifacts.require('Core');
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const { expect } = chai;
const blockchain = new Blockchain(web3);


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
    await blockchain.saveSnapshotAsync();

    core = await coreWrapper.deployCoreAndDependenciesAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#registerExchange', async () => {
    let subjectCaller: Address;
    let subjectExchangeId: BigNumber;
    let subjectExchangeAddress: Address;

    beforeEach(async () => {
      subjectCaller = ownerAccount;
      subjectExchangeId = new BigNumber(SetUtils.EXCHANGES.ZERO_EX);
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
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

      const expectedLogs: Log[] = [
        ExchangeRegistered(
          core.address,
          subjectExchangeId,
          subjectExchangeAddress,
        ),
      ];

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
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
