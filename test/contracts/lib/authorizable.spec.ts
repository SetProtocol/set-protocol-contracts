require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { Address } from 'set-protocol-utils';
import * as setProtocolUtils from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { AuthorizableContract } from '@utils/contracts';
import { getExpectedAddAuthorizedLog, getExpectedRemoveAuthorizedLog } from '@utils/contract_logs/authorizable';
import { expectRevertError } from '@utils/tokenAssertions';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const Authorizable = artifacts.require('Authorizable');
const { SetProtocolTestUtils: SetTestUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const { expect } = chai;

contract('Authorizable', accounts => {
  const [
    ownerAccount,
    otherAccount,
    authorizedAccount,
    authAccount1,
    authAccount2,
  ] = accounts;

  let authorizableContract: AuthorizableContract;
  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);

  before(async () => {
    ABIDecoder.addABI(Authorizable.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Authorizable.abi);
  });

  describe('#addAuthorizedAddress', async () => {
    let caller: Address = ownerAccount;

    beforeEach(async () => {
      authorizableContract = await coreHelper.deployAuthorizableAsync();
    });

    afterEach(async () => {
      caller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return authorizableContract.addAuthorizedAddress.sendTransactionAsync(
        authorizedAccount,
        { from: caller },
      );
    }

    it('sets authorized mapping correctly', async () => {
      await subject();

      const storedAuthAddress = await authorizableContract.authorized.callAsync(
        authorizedAccount,
      );
      expect(storedAuthAddress).to.eql(true);
    });

    it('sets authorities array correctly', async () => {
      await subject();

      const authoritiesArray = await authorizableContract.getAuthorizedAddresses.callAsync();

      expect(authoritiesArray.length).to.eql(1);
      expect(authoritiesArray[0]).to.eql(authorizedAccount);
    });

    it('emits correct AddressAuthorized log', async () => {
      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = getExpectedAddAuthorizedLog(
        authorizedAccount,
        caller,
        authorizableContract.address,
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the caller is not the owner of the contract', async () => {
      beforeEach(async () => {
        caller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the passed address is already authorized', async () => {
      beforeEach(async () => {
        await authorizableContract.addAuthorizedAddress.sendTransactionAsync(
          authorizedAccount,
          { from: caller },
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#removeAuthorizedAddress', async () => {
    let caller: Address = ownerAccount;
    let addressToRemove: Address = authorizedAccount;

    beforeEach(async () => {
      authorizableContract = await coreHelper.deployAuthorizableAsync();

      const authAccountArray: Address[] = [authAccount1, authAccount2, authorizedAccount];
      for (const account of authAccountArray) {
        await coreHelper.addAuthorizationAsync(authorizableContract, account);
      }
    });

    afterEach(async () => {
      caller = ownerAccount;
      addressToRemove = authorizedAccount;
    });

    async function subject(): Promise<string> {
      return authorizableContract.removeAuthorizedAddress.sendTransactionAsync(
        addressToRemove,
        { from: caller },
      );
    }

    it('removes address from authorized mapping', async () => {
      await subject();

      const storedAuthAddress = await authorizableContract.authorized.callAsync(
        addressToRemove,
      );
      expect(storedAuthAddress).to.eql(false);
    });

    it('removes address from authorities array', async () => {
      await subject();

      const newAuthoritiesArray = await authorizableContract.getAuthorizedAddresses.callAsync();
      expect(newAuthoritiesArray).to.not.include(addressToRemove);
    });

    it('emits correct AuthorizedAddressRemoved log', async () => {
      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = getExpectedRemoveAuthorizedLog(
        addressToRemove,
        caller,
        authorizableContract.address,
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the caller is not the owner of the contract', async () => {
      beforeEach(async () => {
        caller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the passed address is not authorized', async () => {
      beforeEach(async () => {
        addressToRemove = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
