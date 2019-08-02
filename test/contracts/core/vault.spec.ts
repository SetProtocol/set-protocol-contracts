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
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
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
  let mockToken2: StandardTokenMockContract;
  let vault: VaultContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const erc20Helper = new ERC20Helper(ownerAccount);

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#withdrawTo', async () => {
    let subjectAmountToWithdraw: BigNumber;
    let subjectCaller: Address;
    let subjectTokenAddress: Address;
    let subjectReceiver: Address;
    const ownerExistingBalanceInVault: BigNumber = DEPLOYED_TOKEN_QUANTITY;

    beforeEach(async () => {
      vault = await coreHelper.deployVaultAsync();
      await coreHelper.addAuthorizationAsync(vault, authorizedAccount);

      mockToken = await erc20Helper.deployTokenAsync(vault.address);
      await coreHelper.incrementAccountBalanceAsync(
        vault,
        ownerAccount,
        mockToken.address,
        ownerExistingBalanceInVault,
        authorizedAccount,
      );

      subjectAmountToWithdraw = DEPLOYED_TOKEN_QUANTITY;
      subjectReceiver = ownerAccount;
      subjectTokenAddress = subjectTokenAddress || mockToken.address;
      subjectCaller = authorizedAccount;
    });

    async function subject(): Promise<string> {
      return vault.withdrawTo.sendTransactionAsync(
        subjectTokenAddress,
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
        mockToken = await erc20Helper.deployTokenWithInvalidBalancesAsync(vault.address);
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
        mockTokenWithFee = await erc20Helper.deployTokenWithFeeAsync(ownerAccount);
        subjectTokenAddress = mockTokenWithFee.address;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the token doesn't return a value on transfer", async () => {
      let noXferReturnToken: NoXferReturnTokenMockContract;

      beforeEach(async () => {
        noXferReturnToken = await erc20Helper.deployTokenNoXferReturnAsync(vault.address);
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
        invalidReturnToken = await erc20Helper.deployTokenInvalidReturnAsync(vault.address);
        subjectTokenAddress = invalidReturnToken.address;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the quantity is 0', async () => {
      beforeEach(async () => {
        subjectAmountToWithdraw = ZERO;
      });

      it('should not change any state', async () => {
        const previousToBalance = await vault.balances.callAsync(subjectTokenAddress, subjectReceiver);

        await subject();

        const currentToBalance = await vault.balances.callAsync(subjectTokenAddress, subjectReceiver);
        expect(currentToBalance).to.be.bignumber.equal(previousToBalance);
      });
    });
  });

  describe('#incrementTokenOwner', async () => {
    const tokenAddress: Address = NULL_ADDRESS;
    const authorized: Address = authorizedAccount;
    let subjectCaller: Address;
    let subjectAmountToIncrement: BigNumber;

    beforeEach(async () => {
      vault = await coreHelper.deployVaultAsync();
      await coreHelper.addAuthorizationAsync(vault, authorized);

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

    describe('when the quantity is 0', async () => {
      beforeEach(async () => {
        subjectAmountToIncrement = ZERO;
      });

      it('should not change any state', async () => {
        const previousOwnerBalance = await vault.balances.callAsync(tokenAddress, ownerAccount);

        await subject();

        const currentOwnerBalance = await vault.balances.callAsync(tokenAddress, ownerAccount);
        expect(currentOwnerBalance).to.be.bignumber.equal(previousOwnerBalance);
      });
    });
  });

  describe('#decrementTokenOwner', async () => {
    const amountToIncrement: BigNumber = DEPLOYED_TOKEN_QUANTITY;
    const tokenAddress: Address = NULL_ADDRESS;
    let subjectAmountToDecrement: BigNumber = DEPLOYED_TOKEN_QUANTITY;
    let subjectCaller: Address = authorizedAccount;

    beforeEach(async () => {
      vault = await coreHelper.deployVaultAsync();
      await coreHelper.addAuthorizationAsync(vault, authorizedAccount);
      await coreHelper.incrementAccountBalanceAsync(
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

    describe('when the quantity is 0', async () => {
      beforeEach(async () => {
        subjectAmountToDecrement = ZERO;
      });

      it('should not change any state', async () => {
        const previousOwnerBalance = await vault.balances.callAsync(tokenAddress, ownerAccount);

        await subject();

        const currentOwnerBalance = await vault.balances.callAsync(tokenAddress, ownerAccount);
        expect(currentOwnerBalance).to.be.bignumber.equal(previousOwnerBalance);
      });
    });
  });

  describe('#transferBalance', async () => {
    let subjectTokenAddress: Address;
    let subjectFromAddress: Address;
    let subjectToAddress: Address;
    let subjectAmountToTransfer: BigNumber;
    let subjectCaller: Address;

    let token: StandardTokenMockContract;
    const amountToIncrement: BigNumber = DEPLOYED_TOKEN_QUANTITY;

    beforeEach(async () => {
      vault = await coreHelper.deployVaultAsync();
      await coreHelper.addAuthorizationAsync(vault, authorizedAccount);

      token = await erc20Helper.deployTokenAsync(ownerAccount);
      await coreHelper.incrementAccountBalanceAsync(
        vault,
        ownerAccount,
        token.address,
        amountToIncrement,
        authorizedAccount,
      );

      subjectAmountToTransfer = amountToIncrement;
      subjectFromAddress = ownerAccount;
      subjectToAddress = otherAccount;
      subjectTokenAddress = token.address;
      subjectCaller = authorizedAccount;
    });

    async function subject(): Promise<string> {
      return vault.transferBalance.sendTransactionAsync(
        subjectTokenAddress,
        subjectFromAddress,
        subjectToAddress,
        subjectAmountToTransfer,
        { from: subjectCaller },
      );
    }

    it('should decrement the balance of the sender by the correct amount', async () => {
      const oldSenderBalance = await vault.balances.callAsync(subjectTokenAddress, ownerAccount);

      await subject();

      const newSenderBalance = await vault.balances.callAsync(subjectTokenAddress, ownerAccount);
      const expectedSenderBalance = oldSenderBalance.sub(subjectAmountToTransfer);
      expect(newSenderBalance).to.be.bignumber.equal(expectedSenderBalance);
    });

    it('should increment the balance of the receiver by the correct amount', async () => {
      const oldReceiverBalance = await vault.balances.callAsync(subjectTokenAddress, otherAccount);

      await subject();

      const newReceiverBalance = await vault.balances.callAsync(subjectTokenAddress, otherAccount);
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

    describe('when the quantity is 0', async () => {
      beforeEach(async () => {
        subjectAmountToTransfer = ZERO;
      });

      it('should not change the from accounts balance', async () => {
        const previousOwnerBalance = await vault.balances.callAsync(subjectTokenAddress, subjectFromAddress);

        await subject();

        const currentOwnerBalance = await vault.balances.callAsync(subjectTokenAddress, subjectFromAddress);
        expect(currentOwnerBalance).to.be.bignumber.equal(previousOwnerBalance);
      });

      it('should not change the to accounts balance', async () => {
        const previousOwnerBalance = await vault.balances.callAsync(subjectTokenAddress, subjectToAddress);

        await subject();

        const currentOwnerBalance = await vault.balances.callAsync(subjectTokenAddress, subjectToAddress);
        expect(currentOwnerBalance).to.be.bignumber.equal(previousOwnerBalance);
      });
    });
  });

  describe('#batchWithdrawTo', async () => {
    let subjectTokenAddresses: Address[] = undefined;
    const authorized: Address = authorizedAccount;
    let subjectCaller: Address = authorizedAccount;
    let subjectToAccount: Address;
    let subjectAmountsToWithdraw: BigNumber[] = [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY];

    beforeEach(async () => {
      vault = await coreHelper.deployVaultAsync();
      await coreHelper.addAuthorizationAsync(vault, authorized);

      mockToken = await erc20Helper.deployTokenAsync(vault.address);
      mockToken2 = await erc20Helper.deployTokenAsync(vault.address);

      subjectTokenAddresses = [mockToken.address, mockToken2.address];

      await coreHelper.incrementAccountBalanceAsync(
        vault,
        ownerAccount,
        subjectTokenAddresses[0],
        subjectAmountsToWithdraw[0],
        authorizedAccount,
      );

      await coreHelper.incrementAccountBalanceAsync(
        vault,
        ownerAccount,
        subjectTokenAddresses[1],
        subjectAmountsToWithdraw[1],
        authorizedAccount,
      );

      subjectToAccount = otherAccount;
    });

    afterEach(async () => {
      subjectCaller = authorizedAccount;
      subjectAmountsToWithdraw = [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY];
    });

    async function subject(): Promise<string> {
      return vault.batchWithdrawTo.sendTransactionAsync(
        subjectTokenAddresses,
        subjectToAccount,
        subjectAmountsToWithdraw,
        { from: subjectCaller },
      );
    }

    it('should decrement the balance of the user by the correct amount', async () => {
      await subject();

      await assertTokenBalanceAsync(mockToken, ZERO, vault.address);
      await assertTokenBalanceAsync(mockToken2, ZERO, vault.address);
    });

    it('should increment the balance of the user by the correct amount', async () => {
      await subject();

      await assertTokenBalanceAsync(mockToken, DEPLOYED_TOKEN_QUANTITY, subjectToAccount);
      await assertTokenBalanceAsync(mockToken2, DEPLOYED_TOKEN_QUANTITY, subjectToAccount);
    });

    describe('when the quantities are zero', async () => {
      beforeEach(async () => {
        subjectAmountsToWithdraw = [ZERO, ZERO];
      });

      it('should not increment the balance of the receiver', async () => {
        const oldReceiverBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          subjectTokenAddresses,
          vault,
          subjectToAccount
        );

        await subject();

        const newReceiverBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          subjectTokenAddresses,
          vault,
          subjectToAccount
        );
        expect(JSON.stringify(newReceiverBalances)).to.equal(JSON.stringify(oldReceiverBalances));
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
        subjectTokenAddresses = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the _tokens and _quantities arrays are different lengths', async () => {
      beforeEach(async () => {
        subjectAmountsToWithdraw = [DEPLOYED_TOKEN_QUANTITY];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#batchIncrementTokenOwner', async () => {
    let subjectTokenAddresses: Address[] = [NULL_ADDRESS, randomTokenAddress];
    const authorized: Address = authorizedAccount;
    let subjectCaller: Address = authorizedAccount;
    let subjectOwner: Address;
    let subjectAmountsToIncrement: BigNumber[] = [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY];

    beforeEach(async () => {
      subjectOwner = ownerAccount;

      vault = await coreHelper.deployVaultAsync();
      await coreHelper.addAuthorizationAsync(vault, authorized);
    });

    afterEach(async () => {
      subjectCaller = authorizedAccount;
      subjectTokenAddresses = [NULL_ADDRESS, randomTokenAddress];
      subjectAmountsToIncrement = [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY];
    });

    async function subject(): Promise<string> {
      return vault.batchIncrementTokenOwner.sendTransactionAsync(
        subjectTokenAddresses,
        subjectOwner,
        subjectAmountsToIncrement,
        { from: subjectCaller },
      );
    }

    it('should increment the balance of the user by the correct amount', async () => {
      const oldSenderBalances = await coreHelper.getVaultBalancesForTokensForOwner(
        subjectTokenAddresses,
        vault,
        subjectOwner
      );

      await subject();

      const newSenderBalances = await coreHelper.getVaultBalancesForTokensForOwner(
        subjectTokenAddresses,
        vault,
        subjectOwner
      );
      const expectedSenderBalances = _.map(oldSenderBalances, (balance, index) =>
        balance.add(subjectAmountsToIncrement[index])
      );
      expect(JSON.stringify(newSenderBalances)).to.equal(JSON.stringify(expectedSenderBalances));
    });

    describe('when the quantities are zero', async () => {
      beforeEach(async () => {
        subjectAmountsToIncrement = [ZERO, ZERO];
      });

      it('should not increment the balance of the receiver', async () => {
        const oldReceiverBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          subjectTokenAddresses,
          vault,
          subjectOwner
        );

        await subject();

        const newReceiverBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          subjectTokenAddresses,
          vault,
          subjectOwner
        );
        expect(JSON.stringify(newReceiverBalances)).to.equal(JSON.stringify(oldReceiverBalances));
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
        subjectTokenAddresses = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the _tokens and _quantities arrays are different lengths', async () => {
      beforeEach(async () => {
        subjectAmountsToIncrement = [DEPLOYED_TOKEN_QUANTITY];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#batchDecrementTokenOwner', async () => {
    let subjectTokenAddresses: Address[] = [NULL_ADDRESS, randomTokenAddress];
    const authorized: Address = authorizedAccount;
    let subjectCaller: Address = authorizedAccount;
    let subjectOwner: Address;
    let subjectAmountsToDecrement: BigNumber[] = [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY];

    beforeEach(async () => {
      subjectOwner = ownerAccount;

      vault = await coreHelper.deployVaultAsync();
      await coreHelper.addAuthorizationAsync(vault, authorized);

      await coreHelper.incrementAccountBalanceAsync(
        vault,
        subjectOwner,
        subjectTokenAddresses[0],
        subjectAmountsToDecrement[0],
        authorizedAccount,
      );

      await coreHelper.incrementAccountBalanceAsync(
        vault,
        subjectOwner,
        subjectTokenAddresses[1],
        subjectAmountsToDecrement[1],
        authorizedAccount,
      );
    });

    afterEach(async () => {
      subjectCaller = authorizedAccount;
      subjectTokenAddresses = [NULL_ADDRESS, randomTokenAddress];
      subjectAmountsToDecrement = [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY];
    });

    async function subject(): Promise<string> {
      return vault.batchDecrementTokenOwner.sendTransactionAsync(
        subjectTokenAddresses,
        subjectOwner,
        subjectAmountsToDecrement,
        { from: subjectCaller },
      );
    }

    it('should decrement the balance of the user by the correct amount', async () => {
      const oldSenderBalances = await coreHelper.getVaultBalancesForTokensForOwner(
        subjectTokenAddresses,
        vault,
        subjectOwner
      );

      await subject();

      const newSenderBalances = await coreHelper.getVaultBalancesForTokensForOwner(
        subjectTokenAddresses,
        vault,
        subjectOwner
      );
      const expectedSenderBalances = _.map(oldSenderBalances, (balance, index) =>
        balance.sub(subjectAmountsToDecrement[index])
      );
      expect(JSON.stringify(newSenderBalances)).to.equal(JSON.stringify(expectedSenderBalances));
    });

    describe('when the quantity is zero', async () => {
      beforeEach(async () => {
        subjectAmountsToDecrement = [ZERO, ZERO];
      });

      it('should not increment the balance of the receiver', async () => {
        const oldReceiverBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          subjectTokenAddresses,
          vault,
          subjectOwner
        );

        await subject();

        const newReceiverBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          subjectTokenAddresses,
          vault,
          subjectOwner
        );
        expect(JSON.stringify(newReceiverBalances)).to.equal(JSON.stringify(oldReceiverBalances));
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

    describe('when the _tokens array is empty', async () => {
      beforeEach(async () => {
        subjectTokenAddresses = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the _tokens and _quantities arrays are different lengths', async () => {
      beforeEach(async () => {
        subjectAmountsToDecrement = [];
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
    let subjectFromAddress: Address;
    let subjectToAddress: Address;
    let subjectCaller: Address;

    beforeEach(async () => {
      vault = await coreHelper.deployVaultAsync();
      await coreHelper.addAuthorizationAsync(vault, authorizedAccount);
      subjectTokenAddresses = [NULL_ADDRESS, randomTokenAddress];

      await coreHelper.incrementAccountBalanceAsync(
        vault,
        ownerAccount,
        subjectTokenAddresses[0],
        amountToIncrement,
        authorizedAccount,
      );

      await coreHelper.incrementAccountBalanceAsync(
        vault,
        ownerAccount,
        subjectTokenAddresses[1],
        amountToIncrement,
        authorizedAccount,
      );

      subjectAmountsToTransfer = [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY];
      subjectFromAddress = ownerAccount;
      subjectToAddress = otherAccount;
      subjectCaller = authorizedAccount;
    });

    afterEach(async () => {
      subjectAmountsToTransfer = [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY];
      subjectCaller = authorizedAccount;
    });

    async function subject(): Promise<string> {
      return vault.batchTransferBalance.sendTransactionAsync(
        subjectTokenAddresses,
        subjectFromAddress,
        subjectToAddress,
        subjectAmountsToTransfer,
        { from: subjectCaller },
      );
    }

    it('should decrement the balance of the sender by the correct amount', async () => {
      const oldSenderBalances = await coreHelper.getVaultBalancesForTokensForOwner(
        subjectTokenAddresses,
        vault,
        subjectFromAddress
      );

      await subject();

      const newSenderBalances = await coreHelper.getVaultBalancesForTokensForOwner(
        subjectTokenAddresses,
        vault,
        subjectFromAddress
      );
      const expectedSenderBalances = _.map(oldSenderBalances, (balance, index) =>
        balance.sub(subjectAmountsToTransfer[index])
      );
      expect(JSON.stringify(newSenderBalances)).to.equal(JSON.stringify(expectedSenderBalances));
    });

    it('should increment the balance of the receiver by the correct amount', async () => {
      const oldReceiverBalances = await coreHelper.getVaultBalancesForTokensForOwner(
        subjectTokenAddresses,
        vault,
        subjectToAddress
      );

      await subject();

      const newReceiverBalances = await coreHelper.getVaultBalancesForTokensForOwner(
        subjectTokenAddresses,
        vault,
        subjectToAddress
      );
      const expectedReceiverBalances = _.map(oldReceiverBalances, (balance, index) =>
        balance.add(subjectAmountsToTransfer[index])
      );
      expect(JSON.stringify(newReceiverBalances)).to.equal(JSON.stringify(expectedReceiverBalances));
    });

    describe('when the quantity is zero', async () => {
      beforeEach(async () => {
        subjectAmountsToTransfer = [ZERO, ZERO];
      });

      afterEach(async () => {
        subjectAmountsToTransfer = [ZERO, ZERO];
      });

      it('should not decrement the balance of the sender', async () => {
        const oldSenderBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          subjectTokenAddresses,
          vault,
          subjectFromAddress
        );

        await subject();

        const newSenderBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          subjectTokenAddresses,
          vault,
          subjectFromAddress
        );
        expect(JSON.stringify(newSenderBalances)).to.equal(JSON.stringify(oldSenderBalances));
      });

      it('should not increment the balance of the receiver', async () => {
        const oldReceiverBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          subjectTokenAddresses,
          vault,
          subjectToAddress
        );

        await subject();

        const newReceiverBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          subjectTokenAddresses,
          vault,
          subjectToAddress
        );
        expect(JSON.stringify(newReceiverBalances)).to.equal(JSON.stringify(oldReceiverBalances));
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
      vault = await coreHelper.deployVaultAsync();
      await coreHelper.addAuthorizationAsync(vault, authorizedAccount);

      mockToken = await erc20Helper.deployTokenAsync(vault.address);
      await coreHelper.incrementAccountBalanceAsync(
        vault,
        ownerAccount,
        mockToken.address,
        balance,
        authorizedAccount,
      );

      subjectTokenAddress = mockToken.address;
    });

    afterEach(async () => {
      subjectCaller = ownerAccount;
      subjectTokenAddress = undefined;
    });

    async function subject(): Promise<BigNumber> {
      return vault.getOwnerBalance.callAsync(
        subjectTokenAddress,
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
