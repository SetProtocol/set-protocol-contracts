require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';
import { Address, Bytes } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  StandardTokenMockContract,
  SetTokenFactoryContract,
  SetTokenContract,
  TransferProxyContract,
  VaultContract,
} from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { ZERO, STANDARD_NATURAL_UNIT } from '@utils/constants';
import { getWeb3 } from '@utils/web3Helper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);
const Core = artifacts.require('Core');
const SetTokenFactory = artifacts.require('SetTokenFactory');
const { SetProtocolUtils: SetUtils } = setProtocolUtils;

contract('SetTokenFactory', accounts => {
  const [
    deployerAccount,
    authorizedAccount,
    nonAuthorizedAccount,
    notSetTokenCreatedByCore,
  ] = accounts;

  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let core: CoreContract;
  let setTokenFactory: SetTokenFactoryContract;

  const coreWrapper = new CoreWrapper(deployerAccount, deployerAccount);
  const erc20Wrapper = new ERC20Wrapper(deployerAccount);

  before(async () => {
    ABIDecoder.addABI(SetTokenFactory.abi);
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(SetTokenFactory.abi);
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    vault = await coreWrapper.deployVaultAsync();
    transferProxy = await coreWrapper.deployTransferProxyAsync();
    core = await coreWrapper.deployCoreAsync(transferProxy, vault);

    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);
    await coreWrapper.addFactoryAsync(core, setTokenFactory);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#create from core', async () => {
    let subjectFactory: Address;
    let subjectComponents: Address[] = [];
    let subjectUnits: BigNumber[] = [];
    let subjectNaturalUnit: BigNumber = ZERO;
    let subjectName: Bytes;
    let subjectSymbol: Bytes;
    const subjectCallData: Bytes = '0x0';

    beforeEach(async () => {
      const components = await erc20Wrapper.deployTokensAsync(1, deployerAccount);

      subjectFactory = setTokenFactory.address;
      subjectComponents = [components[0].address];
      subjectUnits = [new BigNumber(1)];
      subjectNaturalUnit = STANDARD_NATURAL_UNIT;
      subjectName = 'My Set';
      subjectSymbol = 'SET';
    });

    async function subject(): Promise<SetTokenContract> {
      return await coreWrapper.createSetTokenAsync(
        core,
        subjectFactory,
        subjectComponents,
        subjectUnits,
        subjectNaturalUnit,
        subjectName,
        subjectSymbol,
        subjectCallData,
      );
    }

    describe('when it successfully creates a set token', async () => {
      it('should have the correct name', async () => {
        const rebalancingToken = await subject();

        const resultName = await rebalancingToken.name.callAsync();
        expect(resultName).to.equal(subjectName);
      });

      it('should have the correct name', async () => {
        const rebalancingToken = await subject();

        const resultSymbol = await rebalancingToken.symbol.callAsync();
        expect(resultSymbol).to.equal(subjectSymbol);
      });
    });

    describe('when the set was not created through core', async () => {
      beforeEach(async () => {
        subjectComponents = [notSetTokenCreatedByCore];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#created not from core', async () => {
    let components: Address[] = [];
    let units: BigNumber[] = [];
    let naturalUnit: BigNumber = STANDARD_NATURAL_UNIT;
    const asciiSubjectName: string = 'Set Token';
    const asciiSubjectSymbol: string = 'SET';
    const subjectName: Bytes = SetUtils.stringToBytes(asciiSubjectName);
    const subjectSymbol: Bytes = SetUtils.stringToBytes(asciiSubjectSymbol);
    const subjectCallData: Bytes = '0x0';
    let subjectCaller: Address = authorizedAccount;

    beforeEach(async () => {
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(authorizedAccount);
    });

    async function subject(): Promise<string> {
      return setTokenFactory.create.sendTransactionAsync(
        components,
        units,
        naturalUnit,
        subjectName,
        subjectSymbol,
        subjectCallData,
        { from: subjectCaller },
      );
    }

    describe('when there is one component', async () => {
      beforeEach(async () => {
        const deployedComponent: StandardTokenMockContract = await erc20Wrapper.deployTokenAsync(deployerAccount);

        components = [deployedComponent.address];
        units = [new BigNumber(1)];
        naturalUnit = STANDARD_NATURAL_UNIT;
      });

      it('should create a SetToken correctly', async () => {
        const txHash = await subject();

        expect(txHash).to.not.be.null;
      });

      describe('when the subjectCaller is not authorized', async () => {
        beforeEach(async () => {
          subjectCaller = nonAuthorizedAccount;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });
  });
});
