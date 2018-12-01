require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  ERC20DetailedContract,
  InvalidReturnTokenMockContract,
  NoXferReturnTokenMockContract,
  StandardTokenMockContract,
  StandardTokenWithFeeMockContract,
  TransferProxyContract
} from '@utils/contracts';
import {
  assertTokenBalanceAsync,
  expectRevertError,
  getTokenBalancesAsync,
} from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { DEPLOYED_TOKEN_QUANTITY, UNLIMITED_ALLOWANCE_IN_BASE_UNITS, ZERO } from '@utils/constants';
import { getWeb3 } from '@utils/web3Helper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);
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
  let mockToken2: StandardTokenMockContract;
  let transferProxy: TransferProxyContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);

  before(async () => {
    ABIDecoder.addABI(TransferProxy.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(TransferProxy.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#transfer', async () => {
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

      await assertTokenBalanceAsync(mockToken, new BigNumber(0), ownerAccount);
    });

    it('should increment the balance of the vault', async () => {
      await subject();

      await assertTokenBalanceAsync(mockToken, amountToTransfer, vaultAccount);
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

  describe('#batchTransfer', async () => {
    let approver: Address = ownerAccount;
    let authorizedContract: Address = authorizedAccount;
    let subjectCaller: Address = ownerAccount;
    let subjectAmountsToTransfer: BigNumber[] = [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY];
    let subjectTokenAddresses: Address[];
    let subjectTokens: ERC20DetailedContract[];

    beforeEach(async () => {
      transferProxy = await coreWrapper.deployTransferProxyAsync();
      await coreWrapper.addAuthorizationAsync(transferProxy, authorizedContract);
      mockToken = await erc20Wrapper.deployTokenAsync(ownerAccount);
      mockToken2 = await erc20Wrapper.deployTokenAsync(ownerAccount);
      subjectTokens = [mockToken, mockToken2];
      await erc20Wrapper.approveTransferAsync(mockToken, transferProxy.address, approver);
      await erc20Wrapper.approveTransferAsync(mockToken2, transferProxy.address, approver);
    });

    afterEach(async () => {
      approver = ownerAccount;
      authorizedContract = authorizedAccount;
      subjectCaller = ownerAccount;
      subjectAmountsToTransfer = [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY];
      subjectTokenAddresses = undefined;
      subjectTokens = [];
    });

    async function subject(): Promise<string> {
      // Initialize tokenToTransfer to deployed token's address unless subjectTokenAddresses is overwritten
      const subjectTokensToTransfer = subjectTokenAddresses || [mockToken.address, mockToken2.address];

      return transferProxy.batchTransfer.sendTransactionAsync(
        subjectTokensToTransfer,
        subjectAmountsToTransfer,
        subjectCaller,
        vaultAccount,
        { from: authorizedContract },
      );
    }

    it('should decrement the balance of the sender by the correct amount', async () => {
      const oldSenderBalances = await getTokenBalancesAsync(subjectTokens, subjectCaller);

      await subject();

      const newSenderBalances = await getTokenBalancesAsync(subjectTokens, subjectCaller);
      const expectedSenderBalances = _.map(oldSenderBalances, (balance, index) =>
        balance.sub(subjectAmountsToTransfer[index])
      );
      expect(JSON.stringify(newSenderBalances)).to.equal(JSON.stringify(expectedSenderBalances));
    });

    it('should increment the balance of the receiver by the correct amount', async () => {
      const oldReceiverBalances = await getTokenBalancesAsync(subjectTokens, vaultAccount);

      await subject();

      const newReceiverBalances = await getTokenBalancesAsync(subjectTokens, vaultAccount);
      const expectedReceiverBalances = _.map(oldReceiverBalances, (balance, index) =>
        balance.add(subjectAmountsToTransfer[index])
      );
      expect(JSON.stringify(newReceiverBalances)).to.equal(JSON.stringify(expectedReceiverBalances));
    });

    describe('when the quantity is zero', async () => {
      beforeEach(async () => {
        subjectAmountsToTransfer = [ZERO, ZERO];
      });

      it('should not decrement the balance of the sender', async () => {
        const oldSenderBalances = await getTokenBalancesAsync(subjectTokens, subjectCaller);

        await subject();

        const newSenderBalances = await getTokenBalancesAsync(subjectTokens, subjectCaller);
        expect(JSON.stringify(newSenderBalances)).to.equal(JSON.stringify(oldSenderBalances));
      });

      it('should not increment the balance of the receiver', async () => {
        const oldReceiverBalances = await getTokenBalancesAsync(subjectTokens, vaultAccount);

        await subject();

        const newReceiverBalances = await getTokenBalancesAsync(subjectTokens, vaultAccount);
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
});
