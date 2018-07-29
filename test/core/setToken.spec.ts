import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '../../utils/chaiSetup';
import { BigNumberSetup } from '../../utils/bigNumberSetup';
import { StandardTokenMockContract, SetTokenFactoryContract, SetTokenContract } from '../../utils/contracts';
import { Address } from '../../types/common.js';
import { ether } from '../../utils/units';
import { assertTokenBalance, expectRevertError } from '../../utils/tokenAssertions';
import { NULL_ADDRESS, STANDARD_COMPONENT_UNIT, STANDARD_NATURAL_UNIT, ZERO } from '../../utils/constants';
import { CoreWrapper } from '../../utils/coreWrapper';
import { ERC20Wrapper } from '../../utils/erc20Wrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;
const SetToken = artifacts.require('SetToken');


contract('SetToken', accounts => {
  const [
    deployerAccount,
    otherAccount,
    coreAccount,
  ] = accounts;

  let components: StandardTokenMockContract[] = [];
  let setToken: SetTokenContract;
  let factory: SetTokenFactoryContract;

  const coreWrapper = new CoreWrapper(deployerAccount, deployerAccount);
  const erc20Wrapper = new ERC20Wrapper(deployerAccount);

  before(async () => {
    ABIDecoder.addABI(SetToken.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(SetToken.abi);
  });

  describe('#constructor', async () => {
    let subjectComponentAddresses: Address[];
    let subjectComponentUnits: BigNumber[];
    let subjectNaturalUnit: BigNumber;
    const subjectName: string = 'Set Token';
    const subjectSymbol: string = 'SET';
    const componentCount: number = 3;

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(componentCount, deployerAccount);
      factory = await coreWrapper.deploySetTokenFactoryAsync();
      await coreWrapper.setCoreAddress(factory, coreAccount);

      subjectComponentAddresses = _.map(components, token => token.address);
      subjectComponentUnits = _.map(components, () => ether(_.random(1, 4)));
      subjectNaturalUnit = STANDARD_NATURAL_UNIT;
    });

    async function subject(): Promise<SetTokenContract> {
      return coreWrapper.deploySetTokenAsync(
        factory.address,
        subjectComponentAddresses,
        subjectComponentUnits,
        subjectNaturalUnit,
        subjectName,
        subjectSymbol,
      );
    }

    it('creates a set with the correct name', async () => {
      setToken = await subject();

      const setTokenName = await setToken.name.callAsync();
      expect(setTokenName).to.equal(subjectName);
    });

    it('creates a set with the correct symbol', async () => {
      setToken = await subject();

      const setTokenSymbol = await setToken.symbol.callAsync();
      expect(setTokenSymbol).to.equal(subjectSymbol);
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
        const noDecimalToken = await erc20Wrapper.deployTokenWithNoDecimalAsync(deployerAccount);
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
      components = await erc20Wrapper.deployTokensAsync(3, deployerAccount);
      factory = await coreWrapper.deploySetTokenFactoryAsync();
      await coreWrapper.setCoreAddress(factory, coreAccount);

      const componentAddresses = _.map(components, token => token.address);
      const componentUnits = _.map(components, () => ether(_.random(1, 4)));
      setToken = await coreWrapper.deploySetTokenAsync(
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
      assertTokenBalance(setToken, expectedSupply, tokenReceiver);
    });

    it('updates the total supply by the correct amount', async () => {
      const existingTokenSupply = await setToken.totalSupply.callAsync();

      await subject();

      const newTokenSupply = await setToken.totalSupply.callAsync();
      expect(newTokenSupply).to.be.bignumber.equal(existingTokenSupply.add(quantityToMint));
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
      components = await erc20Wrapper.deployTokensAsync(3, deployerAccount);
      factory = await coreWrapper.deploySetTokenFactoryAsync();
      await coreWrapper.setCoreAddress(factory, coreAccount);

      const componentAddresses = _.map(components, token => token.address);
      const componentUnits = _.map(components, () => ether(_.random(1, 4)));
      setToken = await coreWrapper.deploySetTokenAsync(
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
      assertTokenBalance(setToken, expectedSupply, tokenReceiver);
    });

    it('decrements the total supply by the correct amount', async () => {
      const existingTokenSupply = await setToken.totalSupply.callAsync();

      await subject();

      const newTokenSupply = await setToken.totalSupply.callAsync();
      expect(newTokenSupply).to.be.bignumber.equal(existingTokenSupply.sub(subjectQuantityToBurn));
    });

    describe('when the caller is not authorized', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the burn amount is zero', async () => {
      beforeEach(async () => {
        subjectQuantityToBurn = ZERO;
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

  describe('#transfer', async () => {
    let subjectCaller: Address;
    let subjectTokenReceiver: Address;
    let subjectQuantityToTransfer: BigNumber;

    beforeEach(async () => {
      const quantityToMint = ether(5);
      components = await erc20Wrapper.deployTokensAsync(3, deployerAccount);
      factory = await coreWrapper.deploySetTokenFactoryAsync();
      await coreWrapper.setCoreAddress(factory, coreAccount);

      const componentAddresses = _.map(components, token => token.address);
      const componentUnits = _.map(components, () => ether(_.random(1, 4)));
      setToken = await coreWrapper.deploySetTokenAsync(
        factory.address,
        componentAddresses,
        componentUnits,
        STANDARD_NATURAL_UNIT,
      );

      await setToken.mint.sendTransactionAsync(
        deployerAccount,
        quantityToMint,
        { from: coreAccount },
      );

      subjectCaller = deployerAccount;
      subjectTokenReceiver = otherAccount;
      subjectQuantityToTransfer = STANDARD_NATURAL_UNIT;
    });

    async function subject(): Promise<string> {
      return setToken.transfer.sendTransactionAsync(
        subjectTokenReceiver,
        subjectQuantityToTransfer,
        { from: subjectCaller },
      );
    }

    it('transfers the tokens to the right receiver', async () => {
      const existingReceiverBalance = await setToken.balanceOf.callAsync(subjectTokenReceiver);

      await subject();

      const newReceiverBalance = await setToken.balanceOf.callAsync(subjectTokenReceiver);
      expect(newReceiverBalance).to.be.bignumber.equal(existingReceiverBalance.add(subjectQuantityToTransfer));
    });

    describe('when the destination is null address', async () => {
      beforeEach(async () => {
        subjectTokenReceiver = NULL_ADDRESS;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the destination is set token address', async () => {
      beforeEach(async () => {
        subjectTokenReceiver = setToken.address;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#transferFrom', async () => {
    let subjectCaller: Address;
    let subjectTokenReceiver: Address;
    let subjectTokenSender: Address;
    let subjectQuantityToTransfer: BigNumber;

    beforeEach(async () => {
      const quantityToMint = ether(5);
      components = await erc20Wrapper.deployTokensAsync(3, deployerAccount);
      factory = await coreWrapper.deploySetTokenFactoryAsync();
      await coreWrapper.setCoreAddress(factory, coreAccount);

      const componentAddresses = _.map(components, token => token.address);
      const componentUnits = _.map(components, () => ether(_.random(1, 4)));
      setToken = await coreWrapper.deploySetTokenAsync(
        factory.address,
        componentAddresses,
        componentUnits,
        STANDARD_NATURAL_UNIT,
      );

      await setToken.mint.sendTransactionAsync(
        deployerAccount,
        quantityToMint,
        { from: coreAccount },
      );

      await erc20Wrapper.approveTransferAsync(setToken, deployerAccount, deployerAccount);

      subjectCaller = deployerAccount;
      subjectTokenReceiver = otherAccount;
      subjectTokenSender = deployerAccount;
      subjectQuantityToTransfer = STANDARD_NATURAL_UNIT;
    });

    async function subject(): Promise<string> {
      return setToken.transferFrom.sendTransactionAsync(
        subjectTokenSender,
        subjectTokenReceiver,
        subjectQuantityToTransfer,
        { from: subjectCaller },
      );
    }

    it('transfers the tokens to the right receiver', async () => {
      const existingReceiverBalance = await setToken.balanceOf.callAsync(subjectTokenReceiver);

      await subject();

      const newReceiverBalance = await setToken.balanceOf.callAsync(subjectTokenReceiver);
      expect(newReceiverBalance).to.be.bignumber.equal(existingReceiverBalance.add(subjectQuantityToTransfer));
    });

    describe('when the destination is null address', async () => {
      beforeEach(async () => {
        subjectTokenReceiver = NULL_ADDRESS;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the destination is set token address', async () => {
      beforeEach(async () => {
        subjectTokenReceiver = setToken.address;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
