import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '../../utils/chaiSetup';
import { BigNumberSetup } from '../../utils/bigNumberSetup';
import {
  InvalidReturnTokenMockContract,
  NoXferReturnTokenMockContract,
  StandardTokenMockContract,
  StandardTokenWithFeeMockContract,
  TransferProxyContract
} from '../../utils/contracts';
import { Address } from '../../types/common.js';
import { assertTokenBalance, expectRevertError } from '../../utils/tokenAssertions';
import { DEPLOYED_TOKEN_QUANTITY, UNLIMITED_ALLOWANCE_IN_BASE_UNITS } from '../../utils/constants';
import { CoreWrapper } from '../../utils/coreWrapper';
import { ERC20Wrapper } from '../../utils/erc20Wrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;
const TransferProxy = artifacts.require('TransferProxy');


contract('TransferProxy', accounts => {
  const [
    ownerAccount,
    authorizedAccount,
    vaultAccount,
    otherAccount,
    unauthorizedAccount,
  ] = accounts;

  let mockToken: StandardTokenMockContract;
  let transferProxy: TransferProxyContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);

  before(async () => {
    ABIDecoder.addABI(TransferProxy.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(TransferProxy.abi);
  });

  describe('#transfer', async () => {
    // Setup
    let approver: Address = ownerAccount;
    let authorizedContract: Address = authorizedAccount;
    let subjectCaller: Address = ownerAccount;
    let amountToTransfer: BigNumber = DEPLOYED_TOKEN_QUANTITY;
    let tokenAddress: Address;

    beforeEach(async () => {
      transferProxy = await coreWrapper.deployTransferProxyAsync();
      await coreWrapper.addAuthorizationAsync(transferProxy, authorizedContract);
      mockToken = await erc20Wrapper.deployTokenAsync(ownerAccount);
      await erc20Wrapper.approveTransferAsync(mockToken, transferProxy.address, approver);
    });

    afterEach(async () => {
      approver = ownerAccount;
      authorizedContract = authorizedAccount;
      subjectCaller = ownerAccount;
      amountToTransfer = DEPLOYED_TOKEN_QUANTITY;
    });

    async function subject(): Promise<string> {
      // Initialize tokenToTransfer to deployed token's address unless tokenAddress is overwritten in test cases
      const tokenToTransfer = tokenAddress || mockToken.address;

      return transferProxy.transfer.sendTransactionAsync(
        tokenToTransfer,
        amountToTransfer,
        subjectCaller,
        vaultAccount,
        { from: authorizedContract },
      );
    }

    it('should decrement the balance of the user', async () => {
      await subject();

      assertTokenBalance(mockToken, new BigNumber(0), ownerAccount);
    });

    it('should increment the balance of the vault', async () => {
      await subject();

      assertTokenBalance(mockToken, amountToTransfer, vaultAccount);
    });

    describe('when the owner of the token is not the user', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the caller is not authorized', async () => {
      beforeEach(async () => {
        authorizedContract = unauthorizedAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the token is not approved for transfer', async () => {
      before(async () => {
        approver = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the token has a transfer fee', async () => {
      let mockTokenWithFee: StandardTokenWithFeeMockContract;

      beforeEach(async () => {
        mockTokenWithFee = await erc20Wrapper.deployTokenWithFeeAsync(ownerAccount);
        tokenAddress = mockTokenWithFee.address;

        await erc20Wrapper.approveTransferAsync(mockTokenWithFee, transferProxy.address, ownerAccount);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the token doesn't return a value on transfer", async () => {
      let noXferReturnToken: NoXferReturnTokenMockContract;

      beforeEach(async () => {
        noXferReturnToken = await erc20Wrapper.deployTokenNoXferReturnAsync(ownerAccount);
        tokenAddress = noXferReturnToken.address;

        await noXferReturnToken.approve.sendTransactionAsync(
          transferProxy.address,
          UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
          { from: ownerAccount },
        );
      });

      it('should still work', async () => {
        await subject();

        const tokenBalance = await noXferReturnToken.balanceOf.callAsync(vaultAccount);
        await expect(tokenBalance).to.be.bignumber.equal(amountToTransfer);
      });
    });

    describe('when the token returns an invalid value', async () => {
      let invalidReturnToken: InvalidReturnTokenMockContract;

      beforeEach(async () => {
        invalidReturnToken = await erc20Wrapper.deployTokenInvalidReturnAsync(ownerAccount);
        tokenAddress = invalidReturnToken.address;

        await erc20Wrapper.approveInvalidTransferAsync(invalidReturnToken, transferProxy.address, ownerAccount);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
