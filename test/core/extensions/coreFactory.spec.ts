import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address, Log } from 'set-protocol-utils';

import ChaiSetup from '../../../utils/chaiSetup';
import { BigNumberSetup } from '../../../utils/bigNumberSetup';
import { CoreContract, SetTokenFactoryContract, StandardTokenMockContract } from '../../../utils/contracts';
import { expectRevertError } from '../../../utils/tokenAssertions';
import { extractNewSetTokenAddressFromLogs, SetTokenCreated } from '../../../utils/contract_logs/core';
import { assertLogEquivalence, getFormattedLogsFromTxHash } from '../../../utils/logs';
import { NULL_ADDRESS, ONE } from '../../../utils/constants';
import { CoreWrapper } from '../../../utils/coreWrapper';
import { ERC20Wrapper } from '../../../utils/erc20Wrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;
const Core = artifacts.require('Core');


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
    core = await coreWrapper.deployCoreAndDependenciesAsync();
    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync();
    await coreWrapper.addAuthorizationAsync(setTokenFactory, core.address);
    await coreWrapper.setCoreAddress(setTokenFactory, core.address);
    await coreWrapper.enableFactoryAsync(core, setTokenFactory);
  });

  describe('#create', async () => {
    let factoryAddress: Address;
    let components: Address[];
    let mockToken: StandardTokenMockContract;
    const units: BigNumber[] = [ONE];
    const naturalUnit: BigNumber = ONE;
    const name = 'New Set';
    const symbol = 'SET';

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
        name,
        symbol,
        { from: ownerAccount },
      );
    }

    it('creates a new SetToken and tracks it in mapping', async () => {
      const txHash = await subject();

      const logs = await getFormattedLogsFromTxHash(txHash);
      const newSetTokenAddress = extractNewSetTokenAddressFromLogs(logs);

      const isSetTokenValid = await core.validSets.callAsync(newSetTokenAddress);
      expect(isSetTokenValid).to.be.true;
    });

    it('creates a new SetToken and adds to setTokens array', async () => {
      const txHash = await subject();

      const logs = await getFormattedLogsFromTxHash(txHash);
      const newSetTokenAddress = extractNewSetTokenAddressFromLogs(logs);

      const setTokens = await core.setTokens.callAsync();
      expect(setTokens).to.include(newSetTokenAddress);
    });

    it('emits a SetTokenCreated event', async () => {
      const txHash = await subject();
      const logs = await getFormattedLogsFromTxHash(txHash);
      const newSetTokenAddress = extractNewSetTokenAddressFromLogs(logs);

      const expectedLogs: Log[] = [
        SetTokenCreated(
          core.address,
          newSetTokenAddress,
          factoryAddress,
          components,
          units,
          naturalUnit,
          name,
          symbol,
        ),
      ];

      await assertLogEquivalence(logs, expectedLogs);
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
