require('module-alias/register');

import * as _ from 'lodash';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  InvalidReturnTokenMockContract,
  NoXferReturnTokenMockContract,
  StandardTokenMockContract,
  StandardTokenWithFeeMockContract,
  VaultContract
} from '@utils/contracts';
import { assertTokenBalanceAsync, expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { DEPLOYED_TOKEN_QUANTITY, ZERO } from '@utils/constants';
import { CoreWrapper } from '@utils/coreWrapper';
import { ERC20Wrapper } from '@utils/erc20Wrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;
const blockchain = new Blockchain(web3);
const { NULL_ADDRESS } = setProtocolUtils.SetProtocolUtils.CONSTANTS;


contract('Vault', accounts => {
  const [
    ownerAccount,
    authorizedAccount,
    unauthorizedAccount,
    otherAccount,
    randomTokenAddress,
  ] = accounts;

  let mockToken: StandardTokenMockContract;
  let vault: VaultContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#withdrawTo', async () => {
    let subjectAmountToWithdraw: BigNumber = DEPLOYED_TOKEN_QUANTITY;
    let subjectCaller: Address = authorizedAccount;
    let subjectTokenAddress: Address;
    let subjectReceiver: Address = ownerAccount;
    const ownerExistingBalanceInVault: BigNumber = DEPLOYED_TOKEN_QUANTITY;

    beforeEach(async () => {
      vault = await coreWrapper.deployVaultAsync();
      await coreWrapper.addAuthorizationAsync(vault, authorizedAccount);

      mockToken = await erc20Wrapper.deployTokenAsync(vault.address);
      await coreWrapper.incrementAccountBalanceAsync(
        vault,
        ownerAccount,
        mockToken.address,
        ownerExistingBalanceInVault,
        authorizedAccount,
      );
    });

    afterEach(async () => {
      subjectAmountToWithdraw = DEPLOYED_TOKEN_QUANTITY;
      subjectCaller = authorizedAccount;
      subjectReceiver = ownerAccount;
      subjectTokenAddress = undefined;
    });

    async function subject(): Promise<string> {
      // Initialize tokenAddress to deployed token's address unless subjectTokenAddress is overwritten in test cases
      const tokenAddress = subjectTokenAddress || mockToken.address;

      return vault.withdrawTo.sendTransactionAsync(
        tokenAddress,
        subjectReceiver,
        subjectAmountToWithdraw,
        { from: subjectCaller },
      );
    }

    it('should decrement the mock token balance of the vault by the correct amount', async () => {
      await subject();

      await assertTokenBalanceAsync(mockToken, ZERO, vault.address);
    });

    it('should increment the mock token balance of the receiver by the correct amount', async () => {
      await subject();

      await assertTokenBalanceAsync(mockToken, subjectAmountToWithdraw, subjectReceiver);
    });

    it('should not update the balances mapping', async () => {
      const existingOwnerBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);

      await subject();

      const ownerBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);
      expect(ownerBalance).to.be.bignumber.equal(existingOwnerBalance);
    });

    describe('when working with a bad ERC20 token', async () => {
      beforeEach(async () => {
        mockToken = await erc20Wrapper.deployTokenWithInvalidBalancesAsync(vault.address);
        subjectTokenAddress = mockToken.address;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the caller is not authorized', async () => {
      beforeEach(async () => {
        subjectCaller = unauthorizedAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the current balances are not as expected', async () => {
      beforeEach(async () => {
        subjectReceiver = vault.address;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the token has a transfer fee', async () => {
      let mockTokenWithFee: StandardTokenWithFeeMockContract;

      beforeEach(async () => {
        mockTokenWithFee = await erc20Wrapper.deployTokenWithFeeAsync(ownerAccount);
        subjectTokenAddress = mockTokenWithFee.address;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the token doesn't return a value on transfer", async () => {
      let noXferReturnToken: NoXferReturnTokenMockContract;

      beforeEach(async () => {
        noXferReturnToken = await erc20Wrapper.deployTokenNoXferReturnAsync(vault.address);
        subjectTokenAddress = noXferReturnToken.address;
      });

      it('should still work', async () => {
        await subject();

        const tokenBalance = await noXferReturnToken.balanceOf.callAsync(subjectReceiver);
        await expect(tokenBalance).to.be.bignumber.equal(subjectAmountToWithdraw);
      });
    });

    describe('when the token returns an invalid value', async () => {
      let invalidReturnToken: InvalidReturnTokenMockContract;

      beforeEach(async () => {
        invalidReturnToken = await erc20Wrapper.deployTokenInvalidReturnAsync(vault.address);
        subjectTokenAddress = invalidReturnToken.address;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#incrementTokenOwner', async () => {
    const tokenAddress: Address = NULL_ADDRESS;
    const authorized: Address = authorizedAccount;
    let subjectCaller: Address = authorizedAccount;
    let subjectAmountToIncrement: BigNumber = DEPLOYED_TOKEN_QUANTITY;

    beforeEach(async () => {
      vault = await coreWrapper.deployVaultAsync();
      await coreWrapper.addAuthorizationAsync(vault, authorized);
    });

    afterEach(async () => {
      subjectCaller = authorizedAccount;
      subjectAmountToIncrement = DEPLOYED_TOKEN_QUANTITY;
    });

    async function subject(): Promise<string> {
      return vault.incrementTokenOwner.sendTransactionAsync(
        tokenAddress,
        ownerAccount,
        subjectAmountToIncrement,
        { from: subjectCaller },
      );
    }

    it('should increment the balance of the user by the correct amount', async () => {
      await subject();

      const ownerBalance = await vault.balances.callAsync(tokenAddress, ownerAccount);
      expect(ownerBalance).to.be.bignumber.equal(subjectAmountToIncrement);
    });

    describe('when the caller is not authorized', async () => {
      beforeEach(async () => {
        subjectCaller = unauthorizedAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#decrementTokenOwner', async () => {
    const amountToIncrement: BigNumber = DEPLOYED_TOKEN_QUANTITY;
    const tokenAddress: Address = NULL_ADDRESS;
    let subjectAmountToDecrement: BigNumber = DEPLOYED_TOKEN_QUANTITY;
    let subjectCaller: Address = authorizedAccount;

    beforeEach(async () => {
      vault = await coreWrapper.deployVaultAsync();
      await coreWrapper.addAuthorizationAsync(vault, authorizedAccount);
      await coreWrapper.incrementAccountBalanceAsync(
        vault,
        ownerAccount,
        tokenAddress,
        amountToIncrement,
        authorizedAccount,
      );
    });

    afterEach(async () => {
      subjectAmountToDecrement = DEPLOYED_TOKEN_QUANTITY;
      subjectCaller = authorizedAccount;
    });

    async function subject(): Promise<string> {
      return vault.decrementTokenOwner.sendTransactionAsync(
        tokenAddress,
        ownerAccount,
        subjectAmountToDecrement,
        { from: subjectCaller },
      );
    }

    it('should decrement the balance of the user by the correct amount', async () => {
      await subject();

      const ownerBalance = await vault.balances.callAsync(tokenAddress, ownerAccount);
      expect(ownerBalance).to.be.bignumber.equal(ZERO);
    });

    describe('when the caller is not authorized', async () => {
      beforeEach(async () => {
        subjectCaller = unauthorizedAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the decrementAmount is larger than balance', async () => {
      beforeEach(async () => {
        subjectAmountToDecrement = DEPLOYED_TOKEN_QUANTITY.add(1);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#transferBalance', async () => {
    const amountToIncrement: BigNumber = DEPLOYED_TOKEN_QUANTITY;
    const tokenAddress: Address = NULL_ADDRESS;
    let subjectAmountToTransfer: BigNumber = DEPLOYED_TOKEN_QUANTITY;
    let subjectCaller: Address = authorizedAccount;

    beforeEach(async () => {
      vault = await coreWrapper.deployVaultAsync();
      await coreWrapper.addAuthorizationAsync(vault, authorizedAccount);
      await coreWrapper.incrementAccountBalanceAsync(
        vault,
        ownerAccount,
        tokenAddress,
        amountToIncrement,
        authorizedAccount,
      );
    });

    afterEach(async () => {
      subjectAmountToTransfer = DEPLOYED_TOKEN_QUANTITY;
      subjectCaller = authorizedAccount;
    });

    async function subject(): Promise<string> {
      return vault.transferBalance.sendTransactionAsync(
        ownerAccount,
        otherAccount,
        tokenAddress,
        subjectAmountToTransfer,
        { from: subjectCaller },
      );
    }

    it('should decrement the balance of the sender by the correct amount', async () => {
      const oldSenderBalance = await vault.balances.callAsync(tokenAddress, ownerAccount);

      await subject();

      const newSenderBalance = await vault.balances.callAsync(tokenAddress, ownerAccount);
      const expectedSenderBalance = oldSenderBalance.sub(subjectAmountToTransfer);
      expect(newSenderBalance).to.be.bignumber.equal(expectedSenderBalance);
    });

    it('should increment the balance of the receiver by the correct amount', async () => {
      const oldReceiverBalance = await vault.balances.callAsync(tokenAddress, otherAccount);

      await subject();

      const newReceiverBalance = await vault.balances.callAsync(tokenAddress, otherAccount);
      const expectedReceiverBalance = oldReceiverBalance.add(subjectAmountToTransfer);
      expect(newReceiverBalance).to.be.bignumber.equal(expectedReceiverBalance);
    });

    describe('when the caller is not authorized', async () => {
      beforeEach(async () => {
        subjectCaller = unauthorizedAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the sender tries to send a balance larger than they have', async () => {
      beforeEach(async () => {
        subjectAmountToTransfer = DEPLOYED_TOKEN_QUANTITY.add(1);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#batchTransferBalance', async () => {
    const amountToIncrement: BigNumber = DEPLOYED_TOKEN_QUANTITY;
    let subjectTokenAddresses: Address[];
    let subjectAmountsToTransfer: BigNumber[];
    let subjectCaller: Address;

    beforeEach(async () => {
      vault = await coreWrapper.deployVaultAsync();
      await coreWrapper.addAuthorizationAsync(vault, authorizedAccount);
      subjectTokenAddresses = [NULL_ADDRESS, randomTokenAddress];

      await coreWrapper.incrementAccountBalanceAsync(
        vault,
        ownerAccount,
        subjectTokenAddresses[0],
        amountToIncrement,
        authorizedAccount,
      );
      await coreWrapper.incrementAccountBalanceAsync(
        vault,
        ownerAccount,
        subjectTokenAddresses[1],
        amountToIncrement,
        authorizedAccount,
      );

      subjectAmountsToTransfer = [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY];
      subjectCaller = authorizedAccount;
    });

    afterEach(async () => {
      subjectAmountsToTransfer = [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY];
      subjectCaller = authorizedAccount;
    });

    async function subject(): Promise<string> {
      return vault.batchTransferBalance.sendTransactionAsync(
        ownerAccount,
        otherAccount,
        subjectTokenAddresses,
        subjectAmountsToTransfer,
        { from: subjectCaller },
      );
    }

    it('should decrement the balance of the sender by the correct amount', async () => {
      const oldSenderBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
        subjectTokenAddresses,
        vault,
        ownerAccount
      );

      await subject();

      const newSenderBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
        subjectTokenAddresses,
        vault,
        ownerAccount
      );
      const expectedSenderBalances = _.map(oldSenderBalances, (balance, index) =>
        balance.sub(subjectAmountsToTransfer[index])
      );
      expect(JSON.stringify(newSenderBalances)).to.equal(JSON.stringify(expectedSenderBalances));
    });

    it('should increment the balance of the receiver by the correct amount', async () => {
      const oldReceiverBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
        subjectTokenAddresses,
        vault,
        otherAccount
      );

      await subject();

      const newReceiverBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
        subjectTokenAddresses,
        vault,
        otherAccount
      );
      const expectedReceiverBalances = _.map(oldReceiverBalances, (balance, index) =>
        balance.add(subjectAmountsToTransfer[index])
      );
      expect(JSON.stringify(newReceiverBalances)).to.equal(JSON.stringify(expectedReceiverBalances));
    });

    describe('when the caller is not authorized', async () => {
      beforeEach(async () => {
        subjectCaller = unauthorizedAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the sender tries to send a balance larger than they have', async () => {
      beforeEach(async () => {
        subjectAmountsToTransfer = [DEPLOYED_TOKEN_QUANTITY.add(1), DEPLOYED_TOKEN_QUANTITY];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the _tokens array is empty', async () => {
      beforeEach(async () => {
        subjectTokenAddresses = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the _quantities array is empty', async () => {
      beforeEach(async () => {
        subjectAmountsToTransfer = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the _tokens and _quantities arrays are different lengths', async () => {
      beforeEach(async () => {
        subjectAmountsToTransfer = [DEPLOYED_TOKEN_QUANTITY];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#getOwnerBalance', async () => {
    const balance: BigNumber = DEPLOYED_TOKEN_QUANTITY;
    let subjectCaller: Address = ownerAccount;
    let subjectTokenAddress: Address;

    beforeEach(async () => {
      vault = await coreWrapper.deployVaultAsync();
      await coreWrapper.addAuthorizationAsync(vault, authorizedAccount);

      mockToken = await erc20Wrapper.deployTokenAsync(vault.address);
      await coreWrapper.incrementAccountBalanceAsync(
        vault,
        ownerAccount,
        mockToken.address,
        balance,
        authorizedAccount,
      );
    });

    afterEach(async () => {
      subjectCaller = ownerAccount;
      subjectTokenAddress = undefined;
    });

    async function subject(): Promise<BigNumber> {
      // Initialize tokenAddress to deployed token's address unless subjectTokenAddress is overwritten in test cases
      const tokenAddress = subjectTokenAddress || mockToken.address;

      return vault.getOwnerBalance.callAsync(
        tokenAddress,
        ownerAccount,
        { from: subjectCaller },
      );
    }

    it('should return the correct balance for the owner', async () => {
      const ownerBalance = await subject();

      expect(ownerBalance).to.be.bignumber.equal(balance);
    });

    describe('when the caller is not the owner', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should still return the correct balance for the owner', async () => {
        const ownerBalance = await subject();

        expect(ownerBalance).to.be.bignumber.equal(balance);
      });
    });

    describe('when the token address has no balances', async () => {
      beforeEach(async () => {
        subjectTokenAddress = NULL_ADDRESS;
      });

      it('should return zero', async () => {
        const ownerBalance = await subject();

        expect(ownerBalance).to.be.bignumber.equal(0);
      });
    });
  });
});
