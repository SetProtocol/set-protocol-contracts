require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  SetTokenContract,
  SetTokenFactoryContract,
  TransferProxyContract,
  VaultContract
} from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { STANDARD_NATURAL_UNIT } from '@utils/constants';
import { CoreWrapper } from '@utils/coreWrapper';
import { ERC20Wrapper } from '@utils/erc20Wrapper';
import { getWeb3 } from '@utils/web3Helper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);
const Core = artifacts.require('Core');


contract('CoreInternal', accounts => {
  const [
    ownerAccount,
    otherAccount,
    nonFactoryAccount,
    nonSetAccount,
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;
  let setTokenFactory2: SetTokenFactoryContract;

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
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#enableFactory', async () => {
    let subjectCaller: Address;

    beforeEach(async () => {
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);

      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return core.enableFactory.sendTransactionAsync(
        setTokenFactory.address,
        { from: subjectCaller },
      );
    }

    it('adds setTokenFactory address to mapping correctly', async () => {
      await subject();

      const isFactoryValid = await core.validFactories.callAsync(setTokenFactory.address);
      expect(isFactoryValid).to.be.true;
    });

    it('adds setTokenFactory address to factories array correctly', async () => {
      await subject();

      const factories = await core.factories.callAsync();
      expect(factories).to.include(setTokenFactory.address);
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

  describe('#disableFactory', async () => {
    let subjectCaller: Address;
    let subjectFactory: Address;

    beforeEach(async () => {
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);
      setTokenFactory2 = await coreWrapper.deploySetTokenFactoryAsync(core.address);

      await coreWrapper.enableFactoryAsync(core, setTokenFactory);
      await coreWrapper.enableFactoryAsync(core, setTokenFactory2);

      subjectCaller = ownerAccount;
      subjectFactory = setTokenFactory2.address;
    });

    async function subject(): Promise<string> {
      return core.disableFactory.sendTransactionAsync(
        subjectFactory,
        { from: subjectCaller },
      );
    }

    it('disables setTokenFactory address correctly', async () => {
      await subject();

      const isFactoryValid = await core.validFactories.callAsync(setTokenFactory2.address);
      expect(isFactoryValid).to.be.false;
    });

    it('removes setTokenFactory address from factories array', async () => {
      await subject();

      const factories = await core.factories.callAsync();
      expect(factories).to.not.include(setTokenFactory2.address);
    });

    describe('when the caller is not the owner of the contract', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the factory is not enabled or valid', async () => {
      beforeEach(async () => {
        subjectFactory = nonFactoryAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#disableSet', async () => {
    let setToken: SetTokenContract;
    let subjectCaller: Address;
    let subjectSet: Address;

    beforeEach(async () => {
      vault = await coreWrapper.deployVaultAsync();
      transferProxy = await coreWrapper.deployTransferProxyAsync();
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);
      await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

      const components = await erc20Wrapper.deployTokensAsync(2, ownerAccount);
      const componentAddresses = _.map(components, token => token.address);
      const componentUnits = _.map(components, () => STANDARD_NATURAL_UNIT); // Multiple of naturalUnit

      // Deploy another Set for branch coverage
      await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        STANDARD_NATURAL_UNIT,
      );

      setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        STANDARD_NATURAL_UNIT,
      );

      subjectCaller = ownerAccount;
      subjectSet = setToken.address;
    });

    async function subject(): Promise<string> {
      return core.disableSet.sendTransactionAsync(
        subjectSet,
        { from: subjectCaller },
      );
    }

    it('disables set token address correctly', async () => {
      await subject();

      const isSetValid = await core.validSets.callAsync(setToken.address);
      expect(isSetValid).to.be.false;
    });

    it('removes setToken address from setTokens array', async () => {
      await subject();

      const approvedSetTokens = await core.setTokens.callAsync();
      expect(approvedSetTokens).to.not.include(setToken.address);
      expect(approvedSetTokens.length).to.equal(1);
    });

    describe('when the caller is not the owner of the contract', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the Set is not enabled or valid', async () => {
      beforeEach(async () => {
        subjectSet = nonSetAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
