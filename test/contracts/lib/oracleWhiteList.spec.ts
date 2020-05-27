require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address, Log } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { TokenOraclePairAdded, TokenOraclePairRemoved } from '@utils/contract_logs/oracleWhiteList';
import { OracleWhiteListContract } from '@utils/contracts';
import {
  NULL_ADDRESS
} from '@utils/constants';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { SetProtocolTestUtils: SetTestUtils } = setProtocolUtils;
const { expect } = chai;
const setTestUtils = new SetTestUtils(web3);
const blockchain = new Blockchain(web3);

contract('OracleWhiteList', accounts => {
  const [
    ownerAccount,
    notOwnerAccount,
    firstTokenAddress,
    secondTokenAddress,
    thirdTokenAddress,
    fourthTokenAddress,
    firstOracleAddress,
    secondOracleAddress,
    thirdOracleAddress,
  ] = accounts;

  let oracleWhiteList: OracleWhiteListContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);

  before(async () => {
    ABIDecoder.addABI(OracleWhiteListContract.getAbi());
  });

  after(async () => {
    ABIDecoder.removeABI(OracleWhiteListContract.getAbi());
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    let subjectInitialTokenAddresses: Address[];
    let subjectInitialOracleAddresses: Address[];
    let subjectCaller: Address;

    beforeEach(async () => {
      subjectInitialTokenAddresses = [
        firstTokenAddress,
        secondTokenAddress,
        thirdTokenAddress,
      ];
      subjectInitialOracleAddresses = [
        firstOracleAddress,
        secondOracleAddress,
        thirdOracleAddress,
      ];
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<OracleWhiteListContract> {
      return await coreHelper.deployOracleWhiteListAsync(
        subjectInitialTokenAddresses,
        subjectInitialOracleAddresses,
        subjectCaller
      );
    }

    it('creates a whitelist with the correct addresses', async () => {
      const oracleWhiteList = await subject();

      const addresses = await oracleWhiteList.validAddresses.callAsync();
      expect(addresses).to.deep.equal(subjectInitialTokenAddresses);

      subjectInitialTokenAddresses.forEach(async (address, index) => {
        const oracleAddress = await oracleWhiteList.oracleWhiteList.callAsync(address);
        expect(oracleAddress).to.equal(subjectInitialOracleAddresses[index]);
      });
    });

    describe('when the token and oracle arrays are different lengths', async () => {
      beforeEach(async () => {
        subjectInitialTokenAddresses = [
          firstTokenAddress,
          secondTokenAddress,
          thirdTokenAddress,
          fourthTokenAddress,
        ];
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#addTokenOraclePair', async () => {
    let subjectTokenToAdd: Address;
    let subjectOracleToAdd: Address;
    let subjectCaller: Address;

    beforeEach(async () => {
      oracleWhiteList = await coreHelper.deployOracleWhiteListAsync(
        [firstTokenAddress, secondTokenAddress],
        [firstOracleAddress, secondOracleAddress]
      );

      subjectTokenToAdd = thirdTokenAddress;
      subjectOracleToAdd = thirdOracleAddress;
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return await oracleWhiteList.addTokenOraclePair.sendTransactionAsync(
        subjectTokenToAdd,
        subjectOracleToAdd,
        { from: subjectCaller }
      );
    }

    it('adds the address to the addresses list', async () => {
      const existingAddresses = await oracleWhiteList.validAddresses.callAsync();

      await subject();

      const newAddresses = await oracleWhiteList.validAddresses.callAsync();
      existingAddresses.push(subjectTokenToAdd);
      expect(newAddresses).to.deep.equal(existingAddresses);
    });

    it('adds the token address to the whitelist mapping with correct oracle address', async () => {
      const existingOracleAddress = await oracleWhiteList.oracleWhiteList.callAsync(subjectTokenToAdd);
      expect(existingOracleAddress).to.equal(NULL_ADDRESS);

      await subject();

      const oracleAddress = await oracleWhiteList.oracleWhiteList.callAsync(subjectTokenToAdd);
      expect(oracleAddress).to.equal(subjectOracleToAdd);
    });

    it('emits a TokenOraclePairAdded event', async () => {
      const txHash = await subject();
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs: Log[] = TokenOraclePairAdded(
        oracleWhiteList.address,
        subjectTokenToAdd,
        subjectOracleToAdd
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
        subjectTokenToAdd = firstTokenAddress;
        subjectOracleToAdd = firstOracleAddress;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#removeTokenOraclePair', async () => {
    let subjectTokenToRemove: Address;
    let subjectCaller: Address;

    beforeEach(async () => {
      oracleWhiteList = await coreHelper.deployOracleWhiteListAsync(
        [firstTokenAddress, secondTokenAddress, thirdTokenAddress],
        [firstOracleAddress, secondOracleAddress, thirdOracleAddress]
      );

      subjectTokenToRemove = thirdTokenAddress;
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return await oracleWhiteList.removeTokenOraclePair.sendTransactionAsync(
        subjectTokenToRemove,
        { from: subjectCaller }
      );
    }

    it('removes the address from the addresses list', async () => {
      await subject();

      const newAddresses = await oracleWhiteList.validAddresses.callAsync();
      const expectedAddresses = [firstTokenAddress, secondTokenAddress];
      expect(newAddresses).to.deep.equal(expectedAddresses);
    });

    it('updates the address in the whitelist mapping to null address', async () => {
      const existingOracleAddress = await oracleWhiteList.oracleWhiteList.callAsync(subjectTokenToRemove);
      expect(existingOracleAddress).to.equal(thirdOracleAddress);

      await subject();

      const oracleAddress = await oracleWhiteList.oracleWhiteList.callAsync(subjectTokenToRemove);
      expect(oracleAddress).to.equal(NULL_ADDRESS);
    });

    it('emits a TokenOraclePairRemoved event', async () => {
      const txHash = await subject();
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs: Log[] = TokenOraclePairRemoved(
        oracleWhiteList.address,
        subjectTokenToRemove,
        thirdOracleAddress
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
        subjectTokenToRemove = fourthTokenAddress;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#editTokenOraclePair', async () => {
    let subjectTokenToAdd: Address;
    let subjectOracleToAdd: Address;
    let subjectCaller: Address;

    beforeEach(async () => {
      oracleWhiteList = await coreHelper.deployOracleWhiteListAsync(
        [firstTokenAddress, secondTokenAddress],
        [firstOracleAddress, secondOracleAddress]
      );

      subjectTokenToAdd = secondTokenAddress;
      subjectOracleToAdd = thirdOracleAddress;
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return await oracleWhiteList.editTokenOraclePair.sendTransactionAsync(
        subjectTokenToAdd,
        subjectOracleToAdd,
        { from: subjectCaller }
      );
    }

    it('does not add a new address to the addresses list', async () => {
      const existingAddresses = await oracleWhiteList.validAddresses.callAsync();

      await subject();

      const newAddresses = await oracleWhiteList.validAddresses.callAsync();
      expect(newAddresses).to.deep.equal(existingAddresses);
    });

    it('adds the token address to the whitelist mapping with correct oracle address', async () => {
      const existingOracleAddress = await oracleWhiteList.oracleWhiteList.callAsync(subjectTokenToAdd);
      expect(existingOracleAddress).to.equal(secondOracleAddress);

      await subject();

      const oracleAddress = await oracleWhiteList.oracleWhiteList.callAsync(subjectTokenToAdd);
      expect(oracleAddress).to.equal(subjectOracleToAdd);
    });

    it('emits a TokenOraclePairAdded event', async () => {
      const txHash = await subject();
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs: Log[] = TokenOraclePairAdded(
        oracleWhiteList.address,
        subjectTokenToAdd,
        subjectOracleToAdd
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
        subjectTokenToAdd = thirdTokenAddress;
        subjectOracleToAdd = thirdOracleAddress;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#areValidAddresses', async () => {
    let subjectAddressesToVerify: Address[];

    beforeEach(async () => {
      oracleWhiteList = await coreHelper.deployOracleWhiteListAsync(
        [firstTokenAddress, secondTokenAddress, thirdTokenAddress],
        [firstOracleAddress, secondOracleAddress, thirdOracleAddress]
      );

      subjectAddressesToVerify = [firstTokenAddress, secondTokenAddress, thirdTokenAddress];
    });

    async function subject(): Promise<Boolean> {
      return await oracleWhiteList.areValidAddresses.callAsync(subjectAddressesToVerify);
    }

    it('returns true', async () => {
      const validity = await subject();

      expect(validity).to.be.true;
    });

    describe('when one of the tokens is not whitelisted', async () => {
      beforeEach(async () => {
        subjectAddressesToVerify = [firstTokenAddress, secondTokenAddress, thirdTokenAddress, fourthTokenAddress];
      });

      it('returns false', async () => {
        const validity = await subject();

        expect(validity).to.be.false;
      });
    });

    describe('when passed array has no addresses', async () => {
      beforeEach(async () => {
        subjectAddressesToVerify = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#getOracleAddressByToken', async () => {
    let subjectTokenAddress: Address;

    beforeEach(async () => {
      oracleWhiteList = await coreHelper.deployOracleWhiteListAsync(
        [firstTokenAddress],
        [firstOracleAddress]
      );

      subjectTokenAddress = firstTokenAddress;
    });

    async function subject(): Promise<Address> {
      return await oracleWhiteList.getOracleAddressByToken.callAsync(subjectTokenAddress);
    }

    it('returns array of oracle address', async () => {
      const actualOracleAddresses = await subject();
      const expectedOracleAddresses = firstOracleAddress;
      expect(actualOracleAddresses).to.equal(expectedOracleAddresses);
    });

    describe('when one of the tokens is not whitelisted', async () => {
      beforeEach(async () => {
        subjectTokenAddress = fourthTokenAddress;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#getOracleAddressesByToken', async () => {
    let subjectTokenAddresses: Address[];

    beforeEach(async () => {
      oracleWhiteList = await coreHelper.deployOracleWhiteListAsync(
        [firstTokenAddress, secondTokenAddress, thirdTokenAddress],
        [firstOracleAddress, secondOracleAddress, thirdOracleAddress]
      );

      subjectTokenAddresses = [firstTokenAddress, secondTokenAddress, thirdTokenAddress];
    });

    async function subject(): Promise<Address[]> {
      return await oracleWhiteList.getOracleAddressesByToken.callAsync(subjectTokenAddresses);
    }

    it('returns array of oracle addresses', async () => {
      const actualOracleAddresses = await subject();
      const expectedOracleAddresses = [firstOracleAddress, secondOracleAddress, thirdOracleAddress];
      expect(actualOracleAddresses).to.deep.equal(expectedOracleAddresses);
    });

    describe('when one of the tokens is not whitelisted', async () => {
      beforeEach(async () => {
        subjectTokenAddresses = [firstTokenAddress, secondTokenAddress, thirdTokenAddress, fourthTokenAddress];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when passed array has no addresses', async () => {
      beforeEach(async () => {
        subjectTokenAddresses = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});