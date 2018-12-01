require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';
import { Address, Log, Bytes } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { CoreContract, SetTokenFactoryContract, StandardTokenMockContract } from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { extractNewSetTokenAddressFromLogs, SetTokenCreated } from '@utils/contract_logs/core';
import { ONE } from '@utils/constants';
import { getWeb3 } from '@utils/web3Helper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const Core = artifacts.require('Core');
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const { expect } = chai;
const blockchain = new Blockchain(web3);
const { NULL_ADDRESS } = SetUtils.CONSTANTS;


contract('CoreFactory', accounts => {
  const [
    ownerAccount,
  ] = accounts;

  let core: CoreContract;
  let setTokenFactory: SetTokenFactoryContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    core = await coreWrapper.deployCoreAndDependenciesAsync();
    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);
    await coreWrapper.addFactoryAsync(core, setTokenFactory);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#create', async () => {
    let factoryAddress: Address;
    let components: Address[];
    let mockToken: StandardTokenMockContract;
    const units: BigNumber[] = [ONE];
    const naturalUnit: BigNumber = ONE;
    const asciiSubjectName: string = 'Set Token';
    const asciiSubjectSymbol: string = 'SET';
    const subjectName: Bytes = SetUtils.stringToBytes(asciiSubjectName);
    const subjectSymbol: Bytes = SetUtils.stringToBytes(asciiSubjectSymbol);
    const subjectCallData: Bytes = '0x0';

    beforeEach(async () => {
      mockToken = await erc20Wrapper.deployTokenAsync(ownerAccount);

      factoryAddress = setTokenFactory.address;
      components = [mockToken.address];
    });

    async function subject(): Promise<string> {
      return core.create.sendTransactionAsync(
        factoryAddress,
        components,
        units,
        naturalUnit,
        subjectName,
        subjectSymbol,
        subjectCallData,
        { from: ownerAccount },
      );
    }

    it('creates a new SetToken and tracks it in mapping', async () => {
      const txHash = await subject();

      const logs = await setTestUtils.getLogsFromTxHash(txHash);
      const newSetTokenAddress = extractNewSetTokenAddressFromLogs(logs);

      const isSetTokenValid = await core.validSets.callAsync(newSetTokenAddress);
      expect(isSetTokenValid).to.be.true;
    });

    it('creates a new SetToken and adds to setTokens array', async () => {
      const txHash = await subject();

      const logs = await setTestUtils.getLogsFromTxHash(txHash);
      const newSetTokenAddress = extractNewSetTokenAddressFromLogs(logs);

      const setTokens = await core.setTokens.callAsync();
      expect(setTokens).to.include(newSetTokenAddress);
    });

    it('emits a SetTokenCreated event', async () => {
      const txHash = await subject();
      const logs = await setTestUtils.getLogsFromTxHash(txHash);
      const newSetTokenAddress = extractNewSetTokenAddressFromLogs(logs);

      const expectedLogs: Log[] = [
        SetTokenCreated(
          core.address,
          newSetTokenAddress,
          factoryAddress,
          components,
          units,
          naturalUnit,
          subjectName,
          subjectSymbol,
        ),
      ];

      await SetTestUtils.assertLogEquivalence(logs, expectedLogs);
    });

    describe('when the factory is not valid', async () => {
      beforeEach(async () => {
        factoryAddress = NULL_ADDRESS;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
