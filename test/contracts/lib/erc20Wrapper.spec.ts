require('module-alias/register');

import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  InvalidReturnTokenMockContract,
  ERC20WrapperMockContract,
  StandardTokenMockContract
} from '@utils/contracts';
import { ether } from '@utils/units';
import { expectRevertError } from '@utils/tokenAssertions';
import { UNLIMITED_ALLOWANCE_IN_BASE_UNITS, ZERO } from '@utils/constants';

import { LibraryMockHelper } from '@utils/helpers/libraryMockHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;


contract('ERC20WrapperMock', accounts => {
  const [
    deployerAccount,
    ownerAccount,
    spenderAccount,
  ] = accounts;

  let erc20WrapperLibrary: ERC20WrapperMockContract;

  const erc20Helper = new ERC20Helper(deployerAccount);
  const libraryMockHelper = new LibraryMockHelper(deployerAccount);

  describe('#approve', async () => {
    const subjectTransferAllowance: BigNumber = UNLIMITED_ALLOWANCE_IN_BASE_UNITS;
    let subjectTokenAddress: Address;
    let token: StandardTokenMockContract;
    const caller: Address = ownerAccount;

    beforeEach(async () => {
      token = await erc20Helper.deployTokenAsync(ownerAccount);
      subjectTokenAddress = token.address;

      erc20WrapperLibrary = await libraryMockHelper.deployERC20WrapperLibraryAsync();
    });

    async function subject(): Promise<string> {
      return erc20WrapperLibrary.approve.sendTransactionAsync(
        subjectTokenAddress,
        spenderAccount,
        subjectTransferAllowance,
        { from: caller },
      );
    }

    it('approves the spender on behalf of the calling contract', async () => {
      const existingAllowance = await token.allowance.callAsync(
        erc20WrapperLibrary.address,
        spenderAccount
      );

      await subject();

      const expectedNewAllowance = existingAllowance.add(subjectTransferAllowance);
      const newSpenderAllowance = await token.allowance.callAsync(
        erc20WrapperLibrary.address,
        spenderAccount
      );
      expect(newSpenderAllowance).to.bignumber.equal(expectedNewAllowance);
    });

    describe('#when the token has an invalid return', async () => {
      let invalidReturnToken: InvalidReturnTokenMockContract;

      beforeEach(async () => {
        invalidReturnToken = await erc20Helper.deployTokenInvalidReturnAsync(ownerAccount);
        subjectTokenAddress = invalidReturnToken.address;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#allowance', async () => {
    let token: StandardTokenMockContract;
    const caller: Address = ownerAccount;

    beforeEach(async () => {
      token = await erc20Helper.deployTokenAsync(ownerAccount);
      erc20WrapperLibrary = await libraryMockHelper.deployERC20WrapperLibraryAsync();
    });

    async function subject(): Promise<BigNumber> {
      return erc20WrapperLibrary.allowance.callAsync(
        token.address,
        ownerAccount,
        spenderAccount,
        { from: caller },
      );
    }

    it('returns the allowance of the spending contract', async () => {
      const allowance = await subject();
      expect(allowance).to.bignumber.equal(ZERO);
    });
  });

  describe('#ensureAllowance', async () => {
    let token: StandardTokenMockContract;

    beforeEach(async () => {
      token = await erc20Helper.deployTokenAsync(ownerAccount);
      erc20WrapperLibrary = await libraryMockHelper.deployERC20WrapperLibraryAsync();
    });

    async function subject(): Promise<string> {
      return erc20WrapperLibrary.ensureAllowance.sendTransactionAsync(
        token.address,
        erc20WrapperLibrary.address,
        spenderAccount,
        ether(10),
        { from: ownerAccount },
      );
    }

    it('approves the spender on behalf of the calling contract', async () => {
      await subject();

      const allowance =
        await erc20WrapperLibrary.allowance.callAsync(
          token.address,
          erc20WrapperLibrary.address,
          spenderAccount,
          { from: ownerAccount }
        );
      expect(allowance).to.bignumber.equal(UNLIMITED_ALLOWANCE_IN_BASE_UNITS);
    });

    describe('#when the token has already been approved', async () => {

      beforeEach(async () => {
        await erc20WrapperLibrary.approve.sendTransactionAsync(
          token.address,
          spenderAccount,
          ether(11),
          { from: ownerAccount });
      });

      it('should not alter the allowance', async () => {
        await subject();

        const allowance =
          await erc20WrapperLibrary.allowance.callAsync(
            token.address,
            erc20WrapperLibrary.address,
            spenderAccount,
            { from: ownerAccount }
          );
        expect(allowance).to.bignumber.equal(ether(11));
      });
    });
  });
});
