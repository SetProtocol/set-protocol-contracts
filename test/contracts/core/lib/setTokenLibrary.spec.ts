require('module-alias/register');

import * as _ from 'lodash';
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

import { LibraryMockWrapper } from '@utils/wrappers/libraryMockWrapper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const Core = artifacts.require('Core');
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

  const coreWrapper = new CoreWrapper(contractDeployer, contractDeployer);
  const erc20Wrapper = new ERC20Wrapper(contractDeployer);

  let setTokenLibraryMock: SetTokenLibraryMockContract;

  const libraryMockWrapper = new LibraryMockWrapper(contractDeployer);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    vault = await coreWrapper.deployVaultAsync();
    transferProxy = await coreWrapper.deployTransferProxyAsync();
    core = await coreWrapper.deployCoreAsync(transferProxy, vault);
    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);
    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

    setTokenLibraryMock = await libraryMockWrapper.deploySetTokenLibraryAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#testValidateReceiveTokens', async () => {
    let subjectSet: Address;
    let subjectTokens: Address[];

    let setToken: SetTokenContract;
    let naturalUnit: BigNumber;

    beforeEach(async () => {
      const firstComponent = await erc20Wrapper.deployTokenAsync(contractDeployer);
      const secondComponent = await erc20Wrapper.deployTokenAsync(contractDeployer);
      const componentTokens = [firstComponent, secondComponent];
      const setComponentUnit = ether(4);
      const componentAddresses = componentTokens.map(token => token.address);
      const componentUnits = componentTokens.map(token => setComponentUnit);
      naturalUnit = ether(2);

      setToken = await coreWrapper.createSetTokenAsync(
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

    describe('when the quantity is not a multiple of the natural unit', async () => {
      beforeEach(async () => {
        subjectTokens = [nonComponentAddress];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
