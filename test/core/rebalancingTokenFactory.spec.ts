import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { Address, Bytes } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';
import { SetProtocolUtils as Utils }  from 'set-protocol-utils';

import ChaiSetup from '../../utils/chaiSetup';
import { BigNumberSetup } from '../../utils/bigNumberSetup';
import {
  CoreContract,
  RebalancingTokenFactoryContract,
  SetTokenContract,
  SetTokenFactoryContract
} from '../../utils/contracts';
import { ether } from '../../utils/units';
import { expectRevertError } from '../../utils/tokenAssertions';
import { ZERO } from '../../utils/constants';
import { CoreWrapper } from '../../utils/coreWrapper';
import { ERC20Wrapper } from '../../utils/erc20Wrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;
const Core = artifacts.require('Core');


contract('RebalancingTokenFactory', accounts => {
  const [
    deployerAccount,
    rebalancingTokenManagerAccount,
    notCoreAccount,
    notSetTokenCreatedByCore,
  ] = accounts;

  let rebalancingTokenFactory: RebalancingTokenFactoryContract;
  let core: CoreContract;
  let setToken: SetTokenContract;
  let setTokenFactory: SetTokenFactoryContract;

  const coreWrapper = new CoreWrapper(deployerAccount, deployerAccount);
  const erc20Wrapper = new ERC20Wrapper(deployerAccount);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    core = await coreWrapper.deployCoreAsync();
    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync();
    await coreWrapper.setCoreAddress(setTokenFactory, core.address);
    await coreWrapper.addAuthorizationAsync(setTokenFactory, core.address);
    await coreWrapper.enableFactoryAsync(core, setTokenFactory);

    const components = await erc20Wrapper.deployTokensAsync(2, deployerAccount);
    const componentAddresses = _.map(components, token => token.address);
    const componentUnits = _.map(components, () => ether(4)); // Multiple of naturalUnit
    const naturalUnit: BigNumber = ether(2);
    setToken = await coreWrapper.createSetTokenAsync(
      core,
      setTokenFactory.address,
      componentAddresses,
      componentUnits,
      naturalUnit,
    );

    console.log(setToken.address);
    const validSets = await core.validSets.callAsync(setToken.address);
    console.log(validSets);

    rebalancingTokenFactory = await coreWrapper.deployRebalancingTokenFactoryAsync(core.address);
  });

  describe('#create', async () => {
    let subjectCaller: Address;
    let subjectComponents: Address[] = [];
    let subjectUnits: BigNumber[] = [];
    let subjectNaturalUnit: BigNumber = ZERO;
    let subjectName: string;
    let subjectSymbol: string;
    let subjectCallData: Bytes;

    let managerAddress: Address;
    let proposalPeriod: BigNumber;
    let rebalanceInterval: BigNumber;

    beforeEach(async () => {
      managerAddress = rebalancingTokenManagerAccount;
      proposalPeriod = new BigNumber(86400);
      rebalanceInterval = new BigNumber(86400);

      subjectCaller = core.address;
      subjectComponents = [core.address];
      subjectUnits = [new BigNumber(1)];
      subjectNaturalUnit = ZERO;
      subjectName = 'My Rebalancing Set';
      subjectSymbol = 'REBAL';
      subjectCallData = Utils.bufferArrayToHex([
        Utils.paddedBufferForPrimitive(managerAddress),
        Utils.paddedBufferForBigNumber(proposalPeriod),
        Utils.paddedBufferForBigNumber(rebalanceInterval),
      ]);
    });

    async function subject(): Promise<string> {
      // TODO: This needs to be tested via core
      return rebalancingTokenFactory.create.sendTransactionAsync(
        subjectComponents,
        subjectUnits,
        subjectNaturalUnit,
        subjectName,
        subjectSymbol,
        subjectCallData,
        { from: subjectCaller },
      );
    }

    it('should successfully create a RebalancingToken', async () => {
      const txHash = await subject();

      expect(txHash).to.not.be.null;
    });

    describe('when the set was not created through core', async () => {
      beforeEach(async () => {
        subjectComponents = [notSetTokenCreatedByCore];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the caller is not core', async () => {
      beforeEach(async () => {
        subjectCaller = notCoreAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
