require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { StandardTokenMockContract, SetTokenFactoryContract, SetTokenContract } from '@utils/contracts';
import { ether } from '@utils/units';
import { assertTokenBalanceAsync, expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { STANDARD_COMPONENT_UNIT, STANDARD_NATURAL_UNIT, ZERO } from '@utils/constants';
import { getExpectedTransferLog } from '@utils/contract_logs/setToken';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const { expect } = chai;
const blockchain = new Blockchain(web3);
const { NULL_ADDRESS } = SetUtils.CONSTANTS;


contract('SetToken', accounts => {
  const [
    deployerAccount,
    otherAccount,
    coreAccount,
  ] = accounts;

  let components: StandardTokenMockContract[] = [];
  let setToken: SetTokenContract;
  let factory: SetTokenFactoryContract;

  const coreHelper = new CoreHelper(deployerAccount, deployerAccount);
  const erc20Helper = new ERC20Helper(deployerAccount);

  before(async () => {
    ABIDecoder.addABI(SetTokenContract.getAbi());
  });

  after(async () => {
    ABIDecoder.removeABI(SetTokenContract.getAbi());
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    let subjectComponentAddresses: Address[];
    let subjectComponentUnits: BigNumber[];
    let subjectNaturalUnit: BigNumber;
    const asciiSubjectName: string = 'Set Token';
    const asciiSubjectSymbol: string = 'SET';
    const componentCount: number = 3;

    beforeEach(async () => {
      components = await erc20Helper.deployTokensAsync(componentCount, deployerAccount);
      factory = await coreHelper.deploySetTokenFactoryAsync(coreAccount);

      subjectComponentAddresses = _.map(components, token => token.address);
      subjectComponentUnits = _.map(components, () => ether(_.random(1, 4)));
      subjectNaturalUnit = STANDARD_NATURAL_UNIT;
    });

    async function subject(): Promise<SetTokenContract> {
      return coreHelper.deploySetTokenAsync(
        factory.address,
        subjectComponentAddresses,
        subjectComponentUnits,
        subjectNaturalUnit,
        asciiSubjectName,
        asciiSubjectSymbol,
      );
    }

    it('creates a set with the correct name', async () => {
      setToken = await subject();

      const setTokenName = await setToken.name.callAsync();
      expect(setTokenName).to.equal(asciiSubjectName);
    });

    it('creates a set with the correct symbol', async () => {
      setToken = await subject();

      const setTokenSymbol = await setToken.symbol.callAsync();
      expect(setTokenSymbol).to.equal(asciiSubjectSymbol);
    });

    it('creates a set with the correct components', async () => {
      setToken = await subject();

      const setTokenComponents = await setToken.getComponents.callAsync();
      expect(setTokenComponents).to.deep.equal(subjectComponentAddresses);
    });

    it('creates a set with the correct component units', async () => {
      setToken = await subject();

      const setTokenComponentUnits = await setToken.getUnits.callAsync();
      _.map(setTokenComponentUnits, (unit, idx) =>
        expect(unit).to.be.bignumber.equal(subjectComponentUnits[idx]),
      );
    });

    it('creates a set with the correct natural unit', async () => {
      setToken = await subject();

      const setTokenNaturalUnit = await setToken.naturalUnit.callAsync();
      expect(setTokenNaturalUnit).to.be.bignumber.equal(subjectNaturalUnit);
    });

    it('creates a set with the correct factory address', async () => {
      setToken = await subject();

      const setTokenFactoryAddress = await setToken.factory.callAsync();
      expect(setTokenFactoryAddress).to.eql(factory.address);
    });

    describe('when the natural unit is zero', async () => {
      beforeEach(async () => {
        subjectNaturalUnit = ZERO;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the component addresses are empty', async () => {
      beforeEach(async () => {
        subjectComponentAddresses = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the component units are empty', async () => {
      beforeEach(async () => {
        subjectComponentUnits = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the component addresses and units lengths are different', async () => {
      beforeEach(async () => {
        subjectComponentUnits.pop();
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when a component unit is zero', async () => {
      beforeEach(async () => {
        subjectComponentUnits.push(ZERO);

        // Length components must match componentUnits
        subjectComponentAddresses.push(NULL_ADDRESS);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the component addresses contains a zero address', async () => {
      beforeEach(async () => {
        subjectComponentAddresses.push(NULL_ADDRESS);

        // Length of componentUnits must match componentAddresses
        subjectComponentUnits.push(STANDARD_COMPONENT_UNIT);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the natural unit is less than the smallest component decimal', async () => {
      beforeEach(async () => {
        const decimalPromises = _.map(components, component => component.decimals.callAsync());
        const decimals = await Promise.all(decimalPromises);

        subjectNaturalUnit = _.min(decimals).sub(1);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when a component is included twice in components', async () => {
      beforeEach(async () => {
        const firstComponentAddress = _.first(components).address;
        subjectComponentAddresses.push(firstComponentAddress);

        // Length of componentUnits must match componentAddresses
        subjectComponentUnits.push(STANDARD_COMPONENT_UNIT);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when a component does not implement decimals() and natural unit lower', async () => {
      beforeEach(async () => {
        const minNaturalUnit = 10 ** 18;
        const noDecimalToken = await erc20Helper.deployTokenWithNoDecimalAsync(deployerAccount);
        subjectComponentAddresses.push(noDecimalToken.address);
        subjectComponentUnits.push(STANDARD_COMPONENT_UNIT);

        subjectNaturalUnit = new BigNumber(minNaturalUnit).sub(1);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#mint', async () => {
    const tokenReceiver: Address = deployerAccount;
    const quantityToMint: BigNumber = STANDARD_NATURAL_UNIT;
    let subjectCaller: Address = coreAccount;

    beforeEach(async () => {
      components = await erc20Helper.deployTokensAsync(3, deployerAccount);
      factory = await coreHelper.deploySetTokenFactoryAsync(coreAccount);

      const componentAddresses = _.map(components, token => token.address);
      const componentUnits = _.map(components, () => ether(_.random(1, 4)));
      setToken = await coreHelper.deploySetTokenAsync(
        factory.address,
        componentAddresses,
        componentUnits,
        STANDARD_NATURAL_UNIT,
      );
    });

    afterEach(async () => {
      subjectCaller = coreAccount;
    });

    async function subject(): Promise<string> {
      return setToken.mint.sendTransactionAsync(
        tokenReceiver,
        quantityToMint,
        { from: subjectCaller },
      );
    }

    it('increments the balance of the issuer by the correct amount', async () => {
      const existingUserBalance = await setToken.balanceOf.callAsync(tokenReceiver);

      await subject();

      const expectedSupply = existingUserBalance.add(quantityToMint);
      await assertTokenBalanceAsync(setToken, expectedSupply, tokenReceiver);
    });

    it('updates the total supply by the correct amount', async () => {
      const existingTokenSupply = await setToken.totalSupply.callAsync();

      await subject();

      const newTokenSupply = await setToken.totalSupply.callAsync();
      expect(newTokenSupply).to.be.bignumber.equal(existingTokenSupply.add(quantityToMint));
    });

    it('emits a Transfer log', async () => {
        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const expectedLogs = getExpectedTransferLog(
          NULL_ADDRESS,
          tokenReceiver,
          quantityToMint,
          setToken.address
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the caller is not authorized', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#burn', async () => {
    const tokenReceiver: Address = deployerAccount;
    const quantityToMint: BigNumber = ether(4);
    let subjectQuantityToBurn: BigNumber;
    let subjectCaller: Address;

    beforeEach(async () => {
      components = await erc20Helper.deployTokensAsync(3, deployerAccount);
      factory = await coreHelper.deploySetTokenFactoryAsync(coreAccount);

      const componentAddresses = _.map(components, token => token.address);
      const componentUnits = _.map(components, () => ether(_.random(1, 4)));
      setToken = await coreHelper.deploySetTokenAsync(
        factory.address,
        componentAddresses,
        componentUnits,
        STANDARD_NATURAL_UNIT,
      );

      await setToken.mint.sendTransactionAsync(
        tokenReceiver,
        quantityToMint,
        { from: coreAccount },
      );

      subjectCaller = coreAccount;
      subjectQuantityToBurn = STANDARD_NATURAL_UNIT;
    });

    async function subject(): Promise<string> {
      return setToken.burn.sendTransactionAsync(
        tokenReceiver,
        subjectQuantityToBurn,
        { from: subjectCaller },
      );
    }

    it('decrements the balance of the burner by the correct amount', async () => {
      const existingUserBalance = await setToken.balanceOf.callAsync(tokenReceiver);

      await subject();

      const expectedSupply = existingUserBalance.sub(subjectQuantityToBurn);
      await assertTokenBalanceAsync(setToken, expectedSupply, tokenReceiver);
    });

    it('decrements the total supply by the correct amount', async () => {
      const existingTokenSupply = await setToken.totalSupply.callAsync();

      await subject();

      const newTokenSupply = await setToken.totalSupply.callAsync();
      expect(newTokenSupply).to.be.bignumber.equal(existingTokenSupply.sub(subjectQuantityToBurn));
    });

    it('emits a Transfer log', async () => {
        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const expectedLogs = getExpectedTransferLog(
          tokenReceiver,
          NULL_ADDRESS,
          subjectQuantityToBurn,
          setToken.address
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the caller is not authorized', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the balance for user is not enough', async () => {
      beforeEach(async () => {
        subjectQuantityToBurn = ether(5);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
