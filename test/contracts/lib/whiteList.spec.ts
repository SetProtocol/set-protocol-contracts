require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { WhiteListContract } from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const WhiteList = artifacts.require('WhiteList');
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('WhiteList', accounts => {
  const [
    ownerAccount,
    notOwnerAccount,
    firstTokenAddress,
    secondTokenAddress,
    thirdTokenAddress,
  ] = accounts;

  let whiteList: WhiteListContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);

  before(async () => {
    ABIDecoder.addABI(WhiteList.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(WhiteList.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    let subjectInitialAddresses: Address[];
    let subjectCaller: Address;

    beforeEach(async () => {
      subjectInitialAddresses = [
        firstTokenAddress,
        secondTokenAddress,
        thirdTokenAddress,
      ];
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<WhiteListContract> {
      return await coreWrapper.deployWhiteListAsync(
        subjectInitialAddresses,
        subjectCaller
      );
    }

    it('creates a whitelist with the correct addresses', async () => {
      const whiteList = await subject();

      const addresses = await whiteList.validAddresses.callAsync();
      expect(addresses).to.deep.equal(subjectInitialAddresses);

      for (const address of subjectInitialAddresses) {
        const validAddress = await whiteList.whiteList.callAsync(address);
        expect(validAddress).to.be.true;
      }
    });
  });

  describe('#addAddress', async () => {
    let subjectAddressToAdd: Address;
    let subjectCaller: Address;

    beforeEach(async () => {
      whiteList = await coreWrapper.deployWhiteListAsync([firstTokenAddress, secondTokenAddress]);

      subjectAddressToAdd = thirdTokenAddress;
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return await whiteList.addAddress.sendTransactionAsync(
        subjectAddressToAdd,
        { from: subjectCaller }
      );
    }

    it('adds the address to the addresses list', async () => {
      const existingAddresses = await whiteList.validAddresses.callAsync();

      await subject();

      const newAddresses = await whiteList.validAddresses.callAsync();
      existingAddresses.push(subjectAddressToAdd);
      expect(newAddresses).to.deep.equal(existingAddresses);
    });

    it('adds the address to the whitelist mapping as true', async () => {
      const existingAddressValidity = await whiteList.whiteList.callAsync(subjectAddressToAdd);
      expect(existingAddressValidity).to.be.false;

      await subject();

      const addressValidity = await whiteList.whiteList.callAsync(subjectAddressToAdd);
      expect(addressValidity).to.be.true;
    });

    describe('when someone other than the owner tries to add an address', async () => {
      beforeEach(async () => {
        subjectCaller = notOwnerAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the address is already whitelisted', async () => {
      beforeEach(async () => {
        await whiteList.addAddress.sendTransactionAsync(
          subjectAddressToAdd,
          { from: subjectCaller }
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#removeAddress', async () => {
    let subjectAddressToRemove: Address;
    let subjectCaller: Address;

    beforeEach(async () => {
      whiteList = await coreWrapper.deployWhiteListAsync([firstTokenAddress, secondTokenAddress, thirdTokenAddress]);

      subjectAddressToRemove = thirdTokenAddress;
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return await whiteList.removeAddress.sendTransactionAsync(
        subjectAddressToRemove,
        { from: subjectCaller }
      );
    }

    it('removes the address from the addresses list', async () => {
      await subject();

      const newAddresses = await whiteList.validAddresses.callAsync();
      const expectedAddresses = [firstTokenAddress, secondTokenAddress];
      expect(newAddresses).to.deep.equal(expectedAddresses);
    });

    it('updates the address in the whitelist mapping to false', async () => {
      const existingAddressValidity = await whiteList.whiteList.callAsync(subjectAddressToRemove);
      expect(existingAddressValidity).to.be.true;

      await subject();

      const addressValidity = await whiteList.whiteList.callAsync(subjectAddressToRemove);
      expect(addressValidity).to.be.false;
    });

    describe('when someone other than the owner tries to remove an address', async () => {
      beforeEach(async () => {
        subjectCaller = notOwnerAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the address is not currently whitelisted', async () => {
      beforeEach(async () => {
        await whiteList.removeAddress.sendTransactionAsync(
          subjectAddressToRemove,
          { from: subjectCaller }
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
