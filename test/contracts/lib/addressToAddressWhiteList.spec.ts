require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address, Log } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { PairAdded, PairRemoved } from '@utils/contract_logs/addressToAddressWhiteList';
import { AddressToAddressWhiteListContract } from '@utils/contracts';
import {
  NULL_ADDRESS
} from '@utils/constants';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';

import { UtilsHelper } from '@utils/helpers/utilsHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { SetProtocolTestUtils: SetTestUtils } = setProtocolUtils;
const { expect } = chai;
const setTestUtils = new SetTestUtils(web3);
const blockchain = new Blockchain(web3);

contract('AddressToAddressWhiteList', accounts => {
  const [
    ownerAccount,
    notOwnerAccount,
    firstKeyTypeAddress,
    secondKeyTypeAddress,
    thirdKeyTypeAddress,
    fourthKeyTypeAddress,
    firstValueTypeAddress,
    secondValueTypeAddress,
    thirdValueTypeAddress,
  ] = accounts;

  let addressToAddressWhiteList: AddressToAddressWhiteListContract;

  const utilsHelper = new UtilsHelper(ownerAccount);

  before(async () => {
    ABIDecoder.addABI(AddressToAddressWhiteListContract.getAbi());
  });

  after(async () => {
    ABIDecoder.removeABI(AddressToAddressWhiteListContract.getAbi());
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    let subjectInitialKeyTypeAddresses: Address[];
    let subjectInitialValueTypeAddresses: Address[];
    let subjectCaller: Address;

    beforeEach(async () => {
      subjectInitialKeyTypeAddresses = [
        firstKeyTypeAddress,
        secondKeyTypeAddress,
        thirdKeyTypeAddress,
      ];
      subjectInitialValueTypeAddresses = [
        firstValueTypeAddress,
        secondValueTypeAddress,
        thirdValueTypeAddress,
      ];
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<AddressToAddressWhiteListContract> {
      return await utilsHelper.deployAddressToAddressWhiteListAsync(
        subjectInitialKeyTypeAddresses,
        subjectInitialValueTypeAddresses,
        subjectCaller
      );
    }

    it('creates a whitelist with the correct addresses', async () => {
      const addressToAddressWhiteList = await subject();

      const addresses = await addressToAddressWhiteList.validAddresses.callAsync();
      expect(addresses).to.deep.equal(subjectInitialKeyTypeAddresses);

      subjectInitialKeyTypeAddresses.forEach(async (address, index) => {
        const valueTypeAddress = await addressToAddressWhiteList.whitelist.callAsync(address);
        expect(valueTypeAddress).to.equal(subjectInitialValueTypeAddresses[index]);
      });
    });

    describe('when the key and value address arrays are different lengths', async () => {
      beforeEach(async () => {
        subjectInitialKeyTypeAddresses = [
          firstKeyTypeAddress,
          secondKeyTypeAddress,
          thirdKeyTypeAddress,
          fourthKeyTypeAddress,
        ];
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the keys are not unique', async () => {
      beforeEach(async () => {
        subjectInitialKeyTypeAddresses = [
          firstKeyTypeAddress,
          firstKeyTypeAddress,
          thirdKeyTypeAddress,
        ];
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when a value is zero', async () => {
      beforeEach(async () => {
        subjectInitialValueTypeAddresses = [
          firstKeyTypeAddress,
          NULL_ADDRESS,
          thirdKeyTypeAddress,
        ];
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#addPair', async () => {
    let subjectKeyTypeToAdd: Address;
    let subjectValueTypeToAdd: Address;
    let subjectCaller: Address;

    beforeEach(async () => {
      addressToAddressWhiteList = await utilsHelper.deployAddressToAddressWhiteListAsync(
        [firstKeyTypeAddress, secondKeyTypeAddress],
        [firstValueTypeAddress, secondValueTypeAddress]
      );

      subjectKeyTypeToAdd = thirdKeyTypeAddress;
      subjectValueTypeToAdd = thirdValueTypeAddress;
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return await addressToAddressWhiteList.addPair.sendTransactionAsync(
        subjectKeyTypeToAdd,
        subjectValueTypeToAdd,
        { from: subjectCaller }
      );
    }

    it('adds the address to the addresses list', async () => {
      const existingAddresses = await addressToAddressWhiteList.validAddresses.callAsync();

      await subject();

      const newAddresses = await addressToAddressWhiteList.validAddresses.callAsync();
      existingAddresses.push(subjectKeyTypeToAdd);
      expect(newAddresses).to.deep.equal(existingAddresses);
    });

    it('adds the token address to the whitelist mapping with correct value type address', async () => {
      const existingValueTypeAddress =
        await addressToAddressWhiteList.whitelist.callAsync(subjectKeyTypeToAdd);
      expect(existingValueTypeAddress).to.equal(NULL_ADDRESS);

      await subject();

      const valueTypeAddress = await addressToAddressWhiteList.whitelist.callAsync(subjectKeyTypeToAdd);
      expect(valueTypeAddress).to.equal(subjectValueTypeToAdd);
    });

    it('emits a PairAdded event', async () => {
      const txHash = await subject();
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs: Log[] = PairAdded(
        addressToAddressWhiteList.address,
        subjectKeyTypeToAdd,
        subjectValueTypeToAdd
      );
      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
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
        subjectKeyTypeToAdd = firstKeyTypeAddress;
        subjectValueTypeToAdd = firstValueTypeAddress;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when a value is zero', async () => {
      beforeEach(async () => {
        subjectValueTypeToAdd = NULL_ADDRESS;
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#removePair', async () => {
    let subjectKeyToRemove: Address;
    let subjectCaller: Address;

    beforeEach(async () => {
      addressToAddressWhiteList = await utilsHelper.deployAddressToAddressWhiteListAsync(
        [firstKeyTypeAddress, secondKeyTypeAddress, thirdKeyTypeAddress],
        [firstValueTypeAddress, secondValueTypeAddress, thirdValueTypeAddress]
      );

      subjectKeyToRemove = thirdKeyTypeAddress;
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return await addressToAddressWhiteList.removePair.sendTransactionAsync(
        subjectKeyToRemove,
        { from: subjectCaller }
      );
    }

    it('removes the address from the addresses list', async () => {
      await subject();

      const newAddresses = await addressToAddressWhiteList.validAddresses.callAsync();
      const expectedAddresses = [firstKeyTypeAddress, secondKeyTypeAddress];
      expect(newAddresses).to.deep.equal(expectedAddresses);
    });

    it('updates the address in the whitelist mapping to null address', async () => {
      const existingValueTypeAddress =
        await addressToAddressWhiteList.whitelist.callAsync(subjectKeyToRemove);
      expect(existingValueTypeAddress).to.equal(thirdValueTypeAddress);

      await subject();

      const valueTypeAddress = await addressToAddressWhiteList.whitelist.callAsync(subjectKeyToRemove);
      expect(valueTypeAddress).to.equal(NULL_ADDRESS);
    });

    it('emits a PairRemoved event', async () => {
      const txHash = await subject();
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs: Log[] = PairRemoved(
        addressToAddressWhiteList.address,
        subjectKeyToRemove,
        thirdValueTypeAddress
      );
      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
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
        subjectKeyToRemove = fourthKeyTypeAddress;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#editPair', async () => {
    let subjectKeyTypeToAdd: Address;
    let subjectValueTypeToAdd: Address;
    let subjectCaller: Address;

    beforeEach(async () => {
      addressToAddressWhiteList = await utilsHelper.deployAddressToAddressWhiteListAsync(
        [firstKeyTypeAddress, secondKeyTypeAddress],
        [firstValueTypeAddress, secondValueTypeAddress]
      );

      subjectKeyTypeToAdd = secondKeyTypeAddress;
      subjectValueTypeToAdd = thirdValueTypeAddress;
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return await addressToAddressWhiteList.editPair.sendTransactionAsync(
        subjectKeyTypeToAdd,
        subjectValueTypeToAdd,
        { from: subjectCaller }
      );
    }

    it('does not add a new address to the addresses list', async () => {
      const existingAddresses = await addressToAddressWhiteList.validAddresses.callAsync();

      await subject();

      const newAddresses = await addressToAddressWhiteList.validAddresses.callAsync();
      expect(newAddresses).to.deep.equal(existingAddresses);
    });

    it('adds the token address to the whitelist mapping with correct value type address', async () => {
      const existingValueTypeAddress =
        await addressToAddressWhiteList.whitelist.callAsync(subjectKeyTypeToAdd);
      expect(existingValueTypeAddress).to.equal(secondValueTypeAddress);

      await subject();

      const valueTypeAddress = await addressToAddressWhiteList.whitelist.callAsync(subjectKeyTypeToAdd);
      expect(valueTypeAddress).to.equal(subjectValueTypeToAdd);
    });

    it('emits a PairRemoved event', async () => {
      const previousValueType = await addressToAddressWhiteList.whitelist.callAsync(subjectKeyTypeToAdd);
      const txHash = await subject();
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs: Log[] = PairRemoved(
        addressToAddressWhiteList.address,
        subjectKeyTypeToAdd,
        previousValueType
      );
      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    it('emits a PairAdded event', async () => {
      const txHash = await subject();
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs: Log[] = PairAdded(
        addressToAddressWhiteList.address,
        subjectKeyTypeToAdd,
        subjectValueTypeToAdd
      );
      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when someone other than the owner tries to add an address', async () => {
      beforeEach(async () => {
        subjectCaller = notOwnerAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the address is not already whitelisted', async () => {
      beforeEach(async () => {
        subjectKeyTypeToAdd = thirdKeyTypeAddress;
        subjectValueTypeToAdd = thirdValueTypeAddress;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when a value is zero', async () => {
      beforeEach(async () => {
        subjectValueTypeToAdd = NULL_ADDRESS;
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#areValidAddresses', async () => {
    let subjectAddressesToVerify: Address[];

    beforeEach(async () => {
      addressToAddressWhiteList = await utilsHelper.deployAddressToAddressWhiteListAsync(
        [firstKeyTypeAddress, secondKeyTypeAddress, thirdKeyTypeAddress],
        [firstValueTypeAddress, secondValueTypeAddress, thirdValueTypeAddress]
      );

      subjectAddressesToVerify = [firstKeyTypeAddress, secondKeyTypeAddress, thirdKeyTypeAddress];
    });

    async function subject(): Promise<Boolean> {
      return await addressToAddressWhiteList.areValidAddresses.callAsync(subjectAddressesToVerify);
    }

    it('returns true', async () => {
      const validity = await subject();

      expect(validity).to.be.true;
    });

    describe('when one of the key type addresses is not whitelisted', async () => {
      beforeEach(async () => {
        subjectAddressesToVerify = [
          firstKeyTypeAddress,
          secondKeyTypeAddress,
          thirdKeyTypeAddress,
          fourthKeyTypeAddress,
        ];
      });

      it('returns false', async () => {
        const validity = await subject();

        expect(validity).to.be.false;
      });
    });
  });

  describe('#getValue', async () => {
    let subjectKeyTypeAddress: Address;

    beforeEach(async () => {
      addressToAddressWhiteList = await utilsHelper.deployAddressToAddressWhiteListAsync(
        [firstKeyTypeAddress],
        [firstValueTypeAddress]
      );

      subjectKeyTypeAddress = firstKeyTypeAddress;
    });

    async function subject(): Promise<Address> {
      return await addressToAddressWhiteList.getValue.callAsync(subjectKeyTypeAddress);
    }

    it('returns array of value type addresses', async () => {
      const actualValueTypeAddresses = await subject();
      const expectedValueTypeAddresses = firstValueTypeAddress;
      expect(actualValueTypeAddresses).to.equal(expectedValueTypeAddresses);
    });

    describe('when one of the key addresses is not whitelisted', async () => {
      beforeEach(async () => {
        subjectKeyTypeAddress = fourthKeyTypeAddress;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#getValues', async () => {
    let subjectKeyTypeAddresses: Address[];

    beforeEach(async () => {
      addressToAddressWhiteList = await utilsHelper.deployAddressToAddressWhiteListAsync(
        [firstKeyTypeAddress, secondKeyTypeAddress, thirdKeyTypeAddress],
        [firstValueTypeAddress, secondValueTypeAddress, thirdValueTypeAddress]
      );

      subjectKeyTypeAddresses = [firstKeyTypeAddress, secondKeyTypeAddress, thirdKeyTypeAddress];
    });

    async function subject(): Promise<Address[]> {
      return await addressToAddressWhiteList.getValues.callAsync(subjectKeyTypeAddresses);
    }

    it('returns array of value type addresses', async () => {
      const actualValueTypeAddresses = await subject();
      const expectedValueTypeAddresses = [firstValueTypeAddress, secondValueTypeAddress, thirdValueTypeAddress];
      expect(actualValueTypeAddresses).to.deep.equal(expectedValueTypeAddresses);
    });

    describe('when one of the key type addresses is not whitelisted', async () => {
      beforeEach(async () => {
        subjectKeyTypeAddresses = [
          firstKeyTypeAddress,
          secondKeyTypeAddress,
          thirdKeyTypeAddress,
          fourthKeyTypeAddress,
        ];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});