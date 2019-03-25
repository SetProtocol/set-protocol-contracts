require('module-alias/register');

import * as chai from 'chai';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  ERC20WrapperMockContract,
  StandardTokenMockContract
} from '@utils/contracts';
import { ether } from '@utils/units';
import { UNLIMITED_ALLOWANCE_IN_BASE_UNITS } from '@utils/constants';

import { LibraryMockWrapper } from '@utils/wrappers/libraryMockWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';

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

  const erc20Wrapper = new ERC20Wrapper(deployerAccount);
  const libraryMockWrapper = new LibraryMockWrapper(deployerAccount);

  describe('#ensureAllowance', async () => {
    let token: StandardTokenMockContract;

    beforeEach(async () => {
      token = await erc20Wrapper.deployTokenAsync(ownerAccount);
      erc20WrapperLibrary = await libraryMockWrapper.deployERC20WrapperLibraryAsync();
    });

    async function subject(): Promise<string> {
      return erc20WrapperLibrary.testEnsureAllowance.sendTransactionAsync(
        token.address,
        ownerAccount,
        spenderAccount,
        ether(10),
        { from: ownerAccount },
      );
    }

    it('approves the spender on behalf of the calling contract', async () => {
      await subject();

      const allowance = await token.allowance.callAsync(
        erc20WrapperLibrary.address,
        spenderAccount,
        { from: ownerAccount }
      );
      expect(allowance).to.bignumber.equal(UNLIMITED_ALLOWANCE_IN_BASE_UNITS);
    });

    describe('#when the token has already been approved', async () => {

      beforeEach(async () => {
        await token.approve.sendTransactionAsync(
          spenderAccount,
          ether(11),
          { from: ownerAccount });
      });

      it('should not alter the allowance', async () => {
        await subject();

        const allowance = await token.allowance.callAsync(
          ownerAccount,
          spenderAccount,
          { from: ownerAccount }
        );
        expect(allowance).to.bignumber.equal(ether(11));
      });
    });
  });
});
