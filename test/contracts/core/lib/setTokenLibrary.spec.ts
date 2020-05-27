require('module-alias/register');

import * as _ from 'lodash';
import * as chai from 'chai';
import * as ABIDecoder from 'abi-decoder';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  SetTokenContract,
  SetTokenFactoryContract,
  SetTokenLibraryMockContract,
  TransferProxyContract,
  VaultContract,
} from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { ether } from '@utils/units';
import { getWeb3 } from '@utils/web3Helper';

import { LibraryMockHelper } from '@utils/helpers/libraryMockHelper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);


contract('SetTokenLibraryMock', accounts => {
const [
    contractDeployer,
    nonComponentAddress,
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;

  const coreHelper = new CoreHelper(contractDeployer, contractDeployer);
  const erc20Helper = new ERC20Helper(contractDeployer);

  let setTokenLibraryMock: SetTokenLibraryMockContract;

  const libraryMockHelper = new LibraryMockHelper(contractDeployer);

  before(async () => {
    ABIDecoder.addABI(CoreContract.getAbi());
  });

  after(async () => {
    ABIDecoder.removeABI(CoreContract.getAbi());
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    vault = await coreHelper.deployVaultAsync();
    transferProxy = await coreHelper.deployTransferProxyAsync();
    core = await coreHelper.deployCoreAsync(transferProxy, vault);
    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(core.address);
    await coreHelper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

    setTokenLibraryMock = await libraryMockHelper.deploySetTokenLibraryAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#testValidateTokensAreComponents', async () => {
    let subjectSet: Address;
    let subjectTokens: Address[];

    let setToken: SetTokenContract;
    let naturalUnit: BigNumber;

    beforeEach(async () => {
      const firstComponent = await erc20Helper.deployTokenAsync(contractDeployer);
      const secondComponent = await erc20Helper.deployTokenAsync(contractDeployer);
      const componentTokens = [firstComponent, secondComponent];
      const setComponentUnit = ether(4);
      const componentAddresses = componentTokens.map(token => token.address);
      const componentUnits = componentTokens.map(token => setComponentUnit);
      naturalUnit = ether(2);

      setToken = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      subjectSet = setToken.address;
      subjectTokens = [firstComponent.address, secondComponent.address];
    });

    async function subject(): Promise<any> {
      return setTokenLibraryMock.testValidateTokensAreComponents.callAsync(
        subjectSet,
        subjectTokens,
      );
    }

    it('should not revert', async () => {
      await subject();
    });

    describe('when the inputted token is not a component', async () => {
      beforeEach(async () => {
        subjectTokens = [nonComponentAddress];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#testIsMultipleOfSetNaturalUnit', async () => {
    let subjectSet: Address;
    let subjectQuantity: BigNumber;

    let setToken: SetTokenContract;
    let naturalUnit: BigNumber;

    beforeEach(async () => {
      const firstComponent = await erc20Helper.deployTokenAsync(contractDeployer);
      const secondComponent = await erc20Helper.deployTokenAsync(contractDeployer);
      const componentTokens = [firstComponent, secondComponent];
      const setComponentUnit = ether(4);
      const componentAddresses = componentTokens.map(token => token.address);
      const componentUnits = componentTokens.map(token => setComponentUnit);
      naturalUnit = ether(2);

      setToken = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      subjectSet = setToken.address;
      subjectQuantity = naturalUnit.mul(2);
    });

    async function subject(): Promise<any> {
      return setTokenLibraryMock.testIsMultipleOfSetNaturalUnit.callAsync(
        subjectSet,
        subjectQuantity,
      );
    }

    it('should not revert', async () => {
      await subject();
    });

    describe('when the inputted quantity is not a multiple of the natural unit', async () => {
      beforeEach(async () => {
        subjectQuantity = ether(3);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#testRequireValidSet', async () => {
    let subjectSet: Address;

    let setToken: SetTokenContract;
    let naturalUnit: BigNumber;

    beforeEach(async () => {
      const firstComponent = await erc20Helper.deployTokenAsync(contractDeployer);
      const secondComponent = await erc20Helper.deployTokenAsync(contractDeployer);
      const componentTokens = [firstComponent, secondComponent];
      const setComponentUnit = ether(4);
      const componentAddresses = componentTokens.map(token => token.address);
      const componentUnits = componentTokens.map(token => setComponentUnit);
      naturalUnit = ether(2);

      setToken = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      subjectSet = setToken.address;
    });

    async function subject(): Promise<any> {
      return setTokenLibraryMock.testRequireValidSet.callAsync(
        core.address,
        subjectSet,
      );
    }

    it('should not revert', async () => {
      await subject();
    });

    describe('when the Set is not valid', async () => {
      beforeEach(async () => {
        subjectSet = nonComponentAddress;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#testGetSetDetails', async () => {
    let subjectSet: Address;

    let setToken: SetTokenContract;
    let naturalUnit: BigNumber;
    let componentAddresses: Address[];
    let componentUnits: BigNumber[];

    beforeEach(async () => {
      const firstComponent = await erc20Helper.deployTokenAsync(contractDeployer);
      const secondComponent = await erc20Helper.deployTokenAsync(contractDeployer);
      const componentTokens = [firstComponent, secondComponent];
      const setComponentUnit = ether(4);
      componentAddresses = componentTokens.map(token => token.address);
      componentUnits = componentTokens.map(token => setComponentUnit);
      naturalUnit = ether(2);

      setToken = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      subjectSet = setToken.address;
    });

    async function subject(): Promise<any> {
      return setTokenLibraryMock.testGetSetDetails.callAsync(
        subjectSet,
      );
    }

    it('should retrieve the correct natural unit', async () => {
      const [naturalUnit] = await subject();

      expect(naturalUnit).to.bignumber.equal(naturalUnit);
    });

    it('should retrieve the correct components', async () => {
      const [, components] = await subject();

      expect(JSON.stringify(components)).to.equal(JSON.stringify(componentAddresses));
    });

    it('should retrieve the correct components', async () => {
      const [, , units] = await subject();

      expect(JSON.stringify(units)).to.equal(JSON.stringify(componentUnits));
    });
  });
});
