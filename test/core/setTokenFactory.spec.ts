require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';
import { Address, Bytes } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { StandardTokenMockContract, SetTokenFactoryContract } from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { ZERO } from '@utils/constants';
import { CoreWrapper } from '@utils/coreWrapper';
import { ERC20Wrapper } from '@utils/erc20Wrapper';
import {
  getWeb3,
} from '@utils/web3Helper';

const web3 = getWeb3();
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;
const blockchain = new Blockchain(web3);
const SetTokenFactory = artifacts.require('SetTokenFactory');
const { SetProtocolUtils: SetUtils } = setProtocolUtils;


contract('SetTokenFactory', accounts => {
  const [
    deployerAccount,
    authorizedAccount,
    nonAuthorizedAccount,
  ] = accounts;

  let setTokenFactory: SetTokenFactoryContract;

  const coreWrapper = new CoreWrapper(deployerAccount, deployerAccount);
  const erc20Wrapper = new ERC20Wrapper(deployerAccount);

  before(async () => {
    ABIDecoder.addABI(SetTokenFactory.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(SetTokenFactory.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(authorizedAccount);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#create', async () => {
    let caller: Address = authorizedAccount;
    let components: Address[] = [];
    let units: BigNumber[] = [];
    let naturalUnit: BigNumber = ZERO;
    const asciiSubjectName: string = 'Set Token';
    const asciiSubjectSymbol: string = 'SET';
    const subjectName: Bytes = SetUtils.stringToBytes(asciiSubjectName);
    const subjectSymbol: Bytes = SetUtils.stringToBytes(asciiSubjectSymbol);
    const subjectCallData: Bytes = '';

    async function subject(): Promise<string> {
      return setTokenFactory.create.sendTransactionAsync(
        components,
        units,
        naturalUnit,
        subjectName,
        subjectSymbol,
        subjectCallData,
        { from: caller },
      );
    }

    describe('when there is one component', async () => {
      beforeEach(async () => {
        const deployedComponent: StandardTokenMockContract = await erc20Wrapper.deployTokenAsync(deployerAccount);

        components = [deployedComponent.address];
        units = [new BigNumber(1)];
        naturalUnit = new BigNumber(1);
      });

      it('should create a SetToken correctly', async () => {
        const txHash = await subject();

        expect(txHash).to.not.be.null;
      });

      describe('when the caller is not authorized', async () => {
        beforeEach(async () => {
          caller = nonAuthorizedAccount;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });
  });
});
