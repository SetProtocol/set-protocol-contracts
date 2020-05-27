require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract
} from '@utils/contracts';
import { assertTokenBalanceAsync, expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { getExpectedTransferLogs } from '@utils/contract_logs/core';
import { DEFAULT_GAS, DEPLOYED_TOKEN_QUANTITY, UNLIMITED_ALLOWANCE_IN_BASE_UNITS, ZERO, ONE } from '@utils/constants';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { SetProtocolTestUtils: SetTestUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const { expect } = chai;
const blockchain = new Blockchain(web3);


contract('CoreAccounting', accounts => {
  const [
    ownerAccount,
    otherAccount,
  ] = accounts;

  let core: CoreContract;
  let mockToken: StandardTokenMockContract;
  let mockTokens: StandardTokenMockContract[] = [];
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const erc20Helper = new ERC20Helper(ownerAccount);

  before(async () => {
    ABIDecoder.addABI(StandardTokenMockContract.getAbi());
  });

  after(async () => {
    ABIDecoder.removeABI(StandardTokenMockContract.getAbi());
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    vault = await coreHelper.deployVaultAsync();
    transferProxy = await coreHelper.deployTransferProxyAsync();
    core = await coreHelper.deployCoreAsync(transferProxy, vault);
    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(core.address);
    await coreHelper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#deposit', async () => {
    const tokenOwner: Address = ownerAccount;
    const approver: Address = ownerAccount;
    let subjectToken: StandardTokenMockContract;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    beforeEach(async () => {
      subjectToken = await erc20Helper.deployTokenAsync(tokenOwner);
      await erc20Helper.approveTransferAsync(subjectToken, transferProxy.address, approver);

      subjectQuantity = DEPLOYED_TOKEN_QUANTITY;
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return core.deposit.sendTransactionAsync(
        subjectToken.address,
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it('transfers the correct amount of tokens from the caller', async () => {
      const existingOwnerTokenBalance = await subjectToken.balanceOf.callAsync(subjectCaller);

      await subject();

      const newOwnerBalance = existingOwnerTokenBalance.sub(subjectQuantity);
      await assertTokenBalanceAsync(subjectToken, newOwnerBalance, subjectCaller);
    });

    it('transfers the correct amount of tokens to the vault', async () => {
      const existingVaultTokenBalance = await subjectToken.balanceOf.callAsync(vault.address);

      await subject();

      const newVaultBalance = existingVaultTokenBalance.add(subjectQuantity);
      await assertTokenBalanceAsync(subjectToken, newVaultBalance, vault.address);
    });

    it('increments the vault balance of the token of the owner by the correct amount', async () => {
      const existingOwnerVaultBalance = await vault.balances.callAsync(subjectToken.address, subjectCaller);

      await subject();

      const newOwnerBalance = await vault.balances.callAsync(subjectToken.address, subjectCaller);
      expect(newOwnerBalance).to.be.bignumber.equal(existingOwnerVaultBalance.add(subjectQuantity));
    });

    describe('when the amount is not the full balance of the token for the owner', async () => {
      beforeEach(async () => {
        subjectQuantity = DEPLOYED_TOKEN_QUANTITY.div(2);
      });

      it('should transfer the correct amount from the vault to the withdrawer', async () => {
        const existingOwnerTokenBalance = await subjectToken.balanceOf.callAsync(subjectCaller);
        const existingVaultTokenBalance = await subjectToken.balanceOf.callAsync(vault.address);
        const existingOwnerVaultBalance = await vault.balances.callAsync(subjectToken.address, subjectCaller);

        await subject();

        const newOwnerBalance = existingOwnerTokenBalance.sub(subjectQuantity);
        await assertTokenBalanceAsync(subjectToken, newOwnerBalance, subjectCaller);

        const newVaultBalance = existingVaultTokenBalance.add(subjectQuantity);
        await assertTokenBalanceAsync(subjectToken, newVaultBalance, vault.address);

        const newOwnerVaultBalance = await vault.balances.callAsync(subjectToken.address, subjectCaller);
        expect(newOwnerVaultBalance).to.be.bignumber.equal(existingOwnerVaultBalance.add(subjectQuantity));
      });
    });

    describe('when the quantity is 0', async () => {
      beforeEach(async () => {
        subjectQuantity = ZERO;
      });

      it('should should not update the users balance', async () => {
        const existingOwnerTokenBalance = await subjectToken.balanceOf.callAsync(subjectCaller);

        await subject();

        await assertTokenBalanceAsync(subjectToken, existingOwnerTokenBalance, subjectCaller);
      });
    });

    describe('when the depositor does not have the correct balance', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the protocol is not in operational state', async () => {
      beforeEach(async () => {
        await coreHelper.setOperationStateAsync(
          core,
          ONE,
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#withdraw', async () => {
    const tokenOwner: Address = ownerAccount;
    const approver: Address = ownerAccount;
    const ownerBalanceInVault: BigNumber = DEPLOYED_TOKEN_QUANTITY;

    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    beforeEach(async () => {
      mockToken = await erc20Helper.deployTokenAsync(tokenOwner);
      await erc20Helper.approveTransferAsync(mockToken, transferProxy.address, approver);
      await coreHelper.depositFromUser(core, mockToken.address, ownerBalanceInVault);

      subjectQuantity = DEPLOYED_TOKEN_QUANTITY;
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return core.withdraw.sendTransactionAsync(
        mockToken.address,
        subjectQuantity,
        { from: subjectCaller },
      );
    }

    it('transfers the correct amount of tokens to the caller', async () => {
      const existingOwnerTokenBalance = await mockToken.balanceOf.callAsync(ownerAccount);

      await subject();

      const newOwnerBalance = existingOwnerTokenBalance.add(subjectQuantity);
      await assertTokenBalanceAsync(mockToken, newOwnerBalance, ownerAccount);
    });

    it('transfers the correct amount of tokens from the vault', async () => {
      const existingVaultTokenBalance = await mockToken.balanceOf.callAsync(vault.address);

      await subject();

      const newVaultBalance = existingVaultTokenBalance.sub(subjectQuantity);
      await assertTokenBalanceAsync(mockToken, newVaultBalance, vault.address);
    });

    it('increments the vault balance of the token of the owner by the correct amount', async () => {
      const existingOwnerVaultBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);

      await subject();

      const newOwnerBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);
      expect(newOwnerBalance).to.be.bignumber.equal(existingOwnerVaultBalance.sub(subjectQuantity));
    });

    describe('when the amount is not the full balance of the token for the owner', async () => {
      beforeEach(async () => {
        subjectQuantity = DEPLOYED_TOKEN_QUANTITY.div(2);
      });

      it('should transfer the correct amount from the vault to the subjectCaller', async () => {
        const existingOwnerTokenBalance = await mockToken.balanceOf.callAsync(ownerAccount);
        const existingVaultTokenBalance = await mockToken.balanceOf.callAsync(vault.address);
        const existingOwnerVaultBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);

        await subject();

        const newOwnerBalance = existingOwnerTokenBalance.add(subjectQuantity);
        await assertTokenBalanceAsync(mockToken, newOwnerBalance, ownerAccount);

        const newVaultBalance = existingVaultTokenBalance.sub(subjectQuantity);
        await assertTokenBalanceAsync(mockToken, newVaultBalance, vault.address);

        const newOwnerVaultBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);
        expect(newOwnerVaultBalance).to.be.bignumber.equal(existingOwnerVaultBalance.sub(subjectQuantity));
      });
    });

    describe('when the subjectCaller does not have the correct balance', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the withdraw amount is zero', async () => {
      beforeEach(async () => {
        subjectQuantity = ZERO;
      });

      it('no transfer should occur', async () => {
        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const transferAddresses: Address[] = [];
        formattedLogs.forEach( event => {
          if (event.event == 'Transfer') {
            transferAddresses.push(event.args.to);
          }
        });

        expect(transferAddresses).to.not.include(subjectCaller);
      });
    });
  });

  describe('#batchDeposit', async () => {
    const tokenOwner: Address = ownerAccount;
    let tokenCount: number = 3;
    let mockTokenAddresses: Address[];

    beforeEach(async () => {
      mockTokens = await erc20Helper.deployTokensAsync(tokenCount, tokenOwner);
      mockTokenAddresses = _.map(mockTokens, token => token.address);
      const approvePromises = _.map(mockTokens, token =>
        token.approve.sendTransactionAsync(
          transferProxy.address,
          UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
          { from: tokenOwner },
        ),
      );
      await Promise.all(approvePromises);
    });

    afterEach(async () => {
      tokenAddresses = undefined;
      amountsToDeposit = undefined;
    });

    let tokenAddresses: Address[];
    let amountsToDeposit: BigNumber[];

    async function subject(): Promise<string> {
      // Initialize addresses to deployed tokens' addresses unless tokenAddresses is overwritten in test cases
      const addresses = tokenAddresses || _.map(mockTokens, token => token.address);
      // Initialize quantities to deployed tokens' quantities unless amountsToDeposit is overwritten in test cases
      const quantities = amountsToDeposit || _.map(mockTokens, () => DEPLOYED_TOKEN_QUANTITY);

      return core.batchDeposit.sendTransactionAsync(
        addresses,
        quantities,
        { from: ownerAccount },
      );
    }

    it('transfers the correct amount of each token from the caller', async () => {
      const existingTokenBalances = await erc20Helper.getTokenBalances(mockTokens, ownerAccount);
      const expectedNewBalances = _.map(existingTokenBalances, balance =>
        balance.sub(DEPLOYED_TOKEN_QUANTITY),
      );

      await subject();

      const newTokenBalances = await await erc20Helper.getTokenBalances(mockTokens, ownerAccount);
      expect(newTokenBalances).to.eql(expectedNewBalances);
    });

    it('transfers the correct amount of each token to the vault', async () => {
      const existingTokenBalances = await erc20Helper.getTokenBalances(mockTokens, vault.address);
      const expectedNewBalances = _.map(existingTokenBalances, balance =>
        balance.add(DEPLOYED_TOKEN_QUANTITY),
      );

      await subject();

      const newTokenBalances = await erc20Helper.getTokenBalances(mockTokens, vault.address);
      expect(newTokenBalances).to.eql(expectedNewBalances);
    });

    it('increments the vault balances of the tokens of the owner by the correct amount', async () => {
      const existingOwnerVaultBalances = await coreHelper.getVaultBalancesForTokensForOwner(
        mockTokenAddresses,
        vault,
        ownerAccount,
      );
      const expectedNewOwnerVaultBalances = _.map(existingOwnerVaultBalances, balance =>
        balance.add(DEPLOYED_TOKEN_QUANTITY),
      );

      await subject();

      const newOwnerVaultBalances = await coreHelper.getVaultBalancesForTokensForOwner(
        mockTokenAddresses,
        vault,
        ownerAccount,
      );
      expect(newOwnerVaultBalances).to.eql(expectedNewOwnerVaultBalances);
    });

    describe('when the quantities array contains a zero value', async () => {
      beforeEach(async () => {
        tokenAddresses = _.map(mockTokens, token => token.address);
        amountsToDeposit = _.map(mockTokens, () => DEPLOYED_TOKEN_QUANTITY);
        amountsToDeposit[tokenCount - 2] = ZERO;
      });

      it('transfers the correct amount of each token from the caller', async () => {
        const existingTokenBalances = await erc20Helper.getTokenBalances(mockTokens, ownerAccount);
        const expectedNewBalances = _.map(existingTokenBalances, (balance, index) =>
          balance.sub(amountsToDeposit[index]),
        );

        await subject();

        const newTokenBalances = await erc20Helper.getTokenBalances(mockTokens, ownerAccount);
        expect(newTokenBalances).to.eql(expectedNewBalances);
      });

      it('transfers the correct amount of each token to the vault', async () => {
        const existingTokenBalances = await erc20Helper.getTokenBalances(mockTokens, vault.address);
        const expectedNewBalances = _.map(existingTokenBalances, (balance, index) =>
          balance.add(amountsToDeposit[index]),
        );

        await subject();

        const newTokenBalances = await erc20Helper.getTokenBalances(mockTokens, vault.address);
        expect(newTokenBalances).to.eql(expectedNewBalances);
      });

      it('increments the vault balances of the tokens of the owner by the correct amount', async () => {
        const existingOwnerVaultBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          mockTokenAddresses,
          vault,
          ownerAccount,
        );
        const expectedNewOwnerVaultBalances = _.map(existingOwnerVaultBalances, (balance, index) =>
          balance.add(amountsToDeposit[index]),
        );

        await subject();

        const newOwnerVaultBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          mockTokenAddresses,
          vault,
          ownerAccount,
        );
        expect(newOwnerVaultBalances).to.eql(expectedNewOwnerVaultBalances);
      });

      it('only executes transfers for the non-zero components', async () => {
        const txHash = await subject();
        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

        const expectedLogs = getExpectedTransferLogs(
          ownerAccount,
          vault.address,
          amountsToDeposit,
          tokenAddresses
        );

        expect(formattedLogs).to.deep.include.members(expectedLogs);
      });
    });

    describe('when the token addresses input is empty', async () => {
      beforeEach(async () => {
        tokenAddresses = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the deposit quantities input is empty', async () => {
      beforeEach(async () => {
        amountsToDeposit = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the token addresses input length does not match the deposit quantities input length', async () => {
      beforeEach(async () => {
        tokenAddresses = [_.first(mockTokens).address];
        amountsToDeposit = [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when batch is called with one token', async () => {
      beforeEach(async () => {
        tokenCount = 1;
      });

      it('increments the balance of the token of the owner by the correct amount', async () => {
        const token = _.first(mockTokens);
        const existingOwnerVaultBalance = await vault.balances.callAsync(token.address, ownerAccount);

        await subject();

        const newOwnerBalance = await vault.balances.callAsync(token.address, ownerAccount);
        expect(newOwnerBalance).to.be.bignumber.equal(existingOwnerVaultBalance.add(DEPLOYED_TOKEN_QUANTITY));
      });
    });

    describe('when the protocol is not in operational state', async () => {
      beforeEach(async () => {
        await coreHelper.setOperationStateAsync(
          core,
          ONE,
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#batchWithdraw', async () => {
    const tokenOwner: Address = ownerAccount;
    let tokenCount: number = 3;
    let mockTokenAddresses: Address[];

    beforeEach(async () => {
      mockTokens = await erc20Helper.deployTokensAsync(tokenCount, tokenOwner);
      mockTokenAddresses = _.map(mockTokens, token => token.address);
      const approvePromises = _.map(mockTokens, token =>
        token.approve.sendTransactionAsync(
          transferProxy.address,
          UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
          { from: tokenOwner },
        ),
      );
      await Promise.all(approvePromises);

      // Deposit tokens first so they can be withdrawn
      await core.batchDeposit.sendTransactionAsync(
        _.map(mockTokens, token => token.address),
        _.map(mockTokens, () => DEPLOYED_TOKEN_QUANTITY),
        { from: ownerAccount },
      );
    });

    afterEach(async () => {
      tokenAddresses = undefined;
      amountsToWithdraw = undefined;
    });

    let tokenAddresses: Address[];
    let amountsToWithdraw: BigNumber[];

    async function subject(): Promise<string> {
      // Initialize addresses to deployed tokens' addresses unless tokenAddresses is overwritten in test cases
      const addresses = tokenAddresses || _.map(mockTokens, token => token.address);
      // Initialize quantites to deployed tokens' quantities unless amountsToWithdraw is overwritten in test cases
      const quantities = amountsToWithdraw || _.map(mockTokens, () => DEPLOYED_TOKEN_QUANTITY);

      return core.batchWithdraw.sendTransactionAsync(
        addresses,
        quantities,
        { from: ownerAccount },
      );
    }

    it('transfers the correct amount of each token from the caller', async () => {
      const existingTokenBalances = await erc20Helper.getTokenBalances(mockTokens, ownerAccount);
      const expectedNewBalances = _.map(existingTokenBalances, balance =>
        balance.add(DEPLOYED_TOKEN_QUANTITY),
      );

      await subject();

      const newTokenBalances = await erc20Helper.getTokenBalances(mockTokens, ownerAccount);
      expect(newTokenBalances).to.eql(expectedNewBalances);
    });

    it('transfers the correct amount of each token to the vault', async () => {
      const existingTokenBalances = await await erc20Helper.getTokenBalances(mockTokens, vault.address);
      const expectedNewBalances = _.map(existingTokenBalances, balance =>
        balance.sub(DEPLOYED_TOKEN_QUANTITY),
      );

      await subject();

      const newTokenBalances = await erc20Helper.getTokenBalances(mockTokens, vault.address);
      expect(newTokenBalances).to.eql(expectedNewBalances);
    });

    it('decrements the vault balances of the tokens of the owner by the correct amount', async () => {
      const existingOwnerVaultBalances = await coreHelper.getVaultBalancesForTokensForOwner(
        mockTokenAddresses,
        vault,
        ownerAccount,
      );
      const expectedNewOwnerVaultBalances = _.map(existingOwnerVaultBalances, balance =>
        balance.sub(DEPLOYED_TOKEN_QUANTITY),
      );

      await subject();

      const newOwnerVaultBalances = await coreHelper.getVaultBalancesForTokensForOwner(
        mockTokenAddresses,
        vault,
        ownerAccount,
      );
      expect(newOwnerVaultBalances).to.eql(expectedNewOwnerVaultBalances);
    });

    describe('when the token addresses input is empty', async () => {
      beforeEach(async () => {
        tokenAddresses = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the withdraw quantities input is empty', async () => {
      beforeEach(async () => {
        amountsToWithdraw = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the token addresses input length does not match the withdraw quantities input length', async () => {
      beforeEach(async () => {
        tokenAddresses = [_.first(mockTokens).address];
        amountsToWithdraw = [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when batch is called with one token', async () => {
      beforeEach(async () => {
        tokenCount = 1;
      });

      it('decrements the balance of the token of the owner by the correct amount', async () => {
        const token = _.first(mockTokens);
        const existingOwnerVaultBalance = await vault.balances.callAsync(token.address, ownerAccount);

        await subject();

        const newOwnerBalance = await vault.balances.callAsync(token.address, ownerAccount);
        expect(newOwnerBalance).to.be.bignumber.equal(existingOwnerVaultBalance.sub(DEPLOYED_TOKEN_QUANTITY));
      });
    });
  });

  describe('#internalTransfer', async () => {
    const subjectSender: Address = ownerAccount;
    const subjectReceiver: Address = otherAccount;
    let subjectAmountToTransfer: BigNumber;

    beforeEach(async () => {
      mockToken = await erc20Helper.deployTokenAsync(subjectSender);
      await erc20Helper.approveTransferAsync(mockToken, transferProxy.address, subjectSender);
      await coreHelper.depositFromUser(core, mockToken.address, DEPLOYED_TOKEN_QUANTITY.div(2));
      subjectAmountToTransfer = DEPLOYED_TOKEN_QUANTITY.div(2);
    });

    async function subject(): Promise<string> {
      return core.internalTransfer.sendTransactionAsync(
        mockToken.address,
        subjectReceiver,
        subjectAmountToTransfer,
        { from: subjectSender },
      );
    }

    it('transfers the correct amount of tokens in the vault from the sender', async () => {
      const existingOwnerVaultBalance = await vault.getOwnerBalance.callAsync(
        mockToken.address,
        subjectSender
      );

      await subject();

      const expectedVaultTokenBalance = existingOwnerVaultBalance.sub(subjectAmountToTransfer);
      const newOwnerVaultBalance = await vault.getOwnerBalance.callAsync(
        mockToken.address,
        subjectSender
      );
      expect(expectedVaultTokenBalance).to.be.bignumber.equal(newOwnerVaultBalance);
    });

    it('transfers the correct amount of tokens in the vault to the receiver', async () => {
      const existingOwnerVaultBalance = await vault.getOwnerBalance.callAsync(
        mockToken.address,
        subjectReceiver
      );

      await subject();

      const expectedVaultTokenBalance = existingOwnerVaultBalance.add(subjectAmountToTransfer);
      const newOwnerVaultBalance = await vault.getOwnerBalance.callAsync(
        mockToken.address,
        subjectReceiver
      );
      expect(expectedVaultTokenBalance).to.be.bignumber.equal(newOwnerVaultBalance);
    });

    describe('when the sender does not sufficient token balance', async () => {
      beforeEach(async () => {
        subjectAmountToTransfer = DEPLOYED_TOKEN_QUANTITY;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the protocol is not in operational state', async () => {
      beforeEach(async () => {
        await coreHelper.setOperationStateAsync(
          core,
          ONE,
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
