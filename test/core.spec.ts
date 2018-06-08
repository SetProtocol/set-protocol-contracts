import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";
import { ether, gWei } from "./utils/units";

// Types
import { Address, Log, UInt } from "../types/common.js";

// Contract types
import { CoreContract } from "../types/generated/core";
import { StandardTokenMockContract } from "../types/generated/standard_token_mock";
import { TransferProxyContract } from "../types/generated/transfer_proxy";
import { VaultContract } from "../types/generated/vault";

// Artifacts
const Core = artifacts.require("Core");
const StandardTokenMock = artifacts.require("StandardTokenMock");
const TransferProxy = artifacts.require("TransferProxy");
const Vault = artifacts.require("Vault");

// Testing Set up
import { BigNumberSetup } from "./config/bignumber_setup";
import ChaiSetup from "./config/chai_setup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;

import {
  assertTokenBalance,
  expectRevertError,
} from "./utils/tokenAssertions";
import {
  STANDARD_INITIAL_TOKENS,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
} from "./constants/constants";

contract("Core", (accounts) => {
  const [ownerAccount, otherAccount, unauthorizedAccount] = accounts;
  const TX_DEFAULTS = { from: ownerAccount, gas: 7000000 };

  let core: CoreContract;
  let mockToken: StandardTokenMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;

  const deployToken = async (initialAccount: Address, from: Address = ownerAccount) => {
    mockToken = null;

    const truffleMockToken = await StandardTokenMock.new(
      initialAccount,
      STANDARD_INITIAL_TOKENS,
      "Mock Token",
      "MOCK",
      { from, gas: 7000000 },
    );

    const mockTokenWeb3Contract = web3.eth
      .contract(truffleMockToken.abi)
      .at(truffleMockToken.address);

    mockToken = new StandardTokenMockContract(
      mockTokenWeb3Contract,
      { from },
    );
  };

  const deployTransferProxy = async (vaultAddress: Address, from: Address = ownerAccount) => {
    const truffleTransferProxy = await TransferProxy.new(
      vaultAddress,
      { from, gas: 7000000 },
    );

    const transferProxyWeb3Contract = web3.eth
      .contract(truffleTransferProxy.abi)
      .at(truffleTransferProxy.address);

    transferProxy = new TransferProxyContract(
      transferProxyWeb3Contract,
      { from, gas: 7000000 },
    );
  };

  const deployVault = async (from: Address = ownerAccount) => {
    const truffleVault = await Vault.new(
      { from, gas: 7000000 }
    );

    const vaultWeb3Contract = web3.eth
      .contract(truffleVault.abi)
      .at(truffleVault.address);

    vault = new VaultContract(
      vaultWeb3Contract,
      { from, gas: 7000000 },
    );
  };

  const deployCore = async (from: Address = ownerAccount) => {
    const truffleCore = await Core.new(
      { from, gas: 7000000 }
    );

    const coreWeb3Contract = web3.eth
      .contract(truffleCore.abi)
      .at(truffleCore.address);

    core = new CoreContract(
      coreWeb3Contract,
      { from, gas: 7000000 },
    );
  };

  const setCoreDependencies = async(from: Address = ownerAccount) => {
    await core.setVaultAddress.sendTransactionAsync(
        vault.address,
        { from },
    );
    await core.setTransferProxyAddress.sendTransactionAsync(
        transferProxy.address,
        { from },
    );
  };

  const approveMockTokenTransfer = async (to: Address, from: Address = ownerAccount) => {
    await mockToken.approve.sendTransactionAsync(
      to,
      UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
      { from },
    );
  };

  const addAuthorizedAddress = async (contract: any, toAuthorize: Address, from: Address = ownerAccount) => {
    await contract.addAuthorizedAddress.sendTransactionAsync(
      toAuthorize,
      { from },
    );
  };

  const incrementOwnerBalance = async (owner: Address, token: Address, quantity: BigNumber, from: Address) => {
    console.log(owner, token, quantity, from);
    await vault.incrementTokenOwner.sendTransactionAsync(
      owner,
      token,
      quantity,
      { from },
    );
  };

  before(async () => {
    ABIDecoder.addABI(TransferProxy.abi);
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(TransferProxy.abi);
    ABIDecoder.removeABI(Core.abi);
  });

  describe("#deposit", async () => {
    let tokenOwner: Address = ownerAccount;
    let approver: Address = ownerAccount;

    beforeEach(async () => {
      await deployCore();

      await deployVault();
      await addAuthorizedAddress(vault, core.address);

      await deployTransferProxy(vault.address);
      await addAuthorizedAddress(transferProxy, core.address);

      await setCoreDependencies();

      await deployToken(tokenOwner);
      await approveMockTokenTransfer(transferProxy.address, approver);
    });

    const amountToTransfer = STANDARD_INITIAL_TOKENS;

    async function subject(): Promise<string> {
      return core.deposit.sendTransactionAsync(
        mockToken.address,
        amountToTransfer,
        { from: ownerAccount },
      );
    }

    it("transfers the correct amount of tokens from the caller", async () => {
      await subject();

      assertTokenBalance(mockToken, new BigNumber(0), ownerAccount);
    });

    it("transfers the correct amount of tokens to the vault", async () => {
      await subject();

      assertTokenBalance(mockToken, amountToTransfer, vault.address);
    });

    it("increments the balance of the token of the owner by the correct amount", async () => {
      await subject();

      const ownerBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);
      expect(ownerBalance).to.be.bignumber.equal(amountToTransfer);
    });
  });

  // describe("#withdraw", async () => {
  //   let tokenOwner: Address = ownerAccount;
  //   let approver: Address = ownerAccount;
  //   const ownerBalanceInVault: BigNumber = STANDARD_INITIAL_TOKENS;
  
  //   beforeEach(async () => {
  //     await deployCore();
  
  //     await deployVault();
  //     await addAuthorizedAddress(vault, core.address);
  
  //     await deployTransferProxy(vault.address);
  //     await addAuthorizedAddress(transferProxy, core.address);
  
  //     await setCoreDependencies();
  
  //     await deployToken(vault.address);
  //     await incrementOwnerBalance(ownerAccount, mockToken.address, ownerBalanceInVault, core.address);
  //   });
  
  //   const amountToTransfer = STANDARD_INITIAL_TOKENS;
  
  //   async function subject(): Promise<string> {
  //     return core.withdraw.sendTransactionAsync(
  //       mockToken.address,
  //       amountToTransfer,
  //       { from: ownerAccount },
  //     );
  //   }
  
  //   it("transfers the correct amount of tokens to the caller", async () => {
  //     const existingOwnerAccountBalance = await mockToken.balanceOf.callAsync(
  //       ownerAccount,
  //     );
  
  //     //await subject();
  
  //     assertTokenBalance(mockToken, existingOwnerAccountBalance.add(amountToTransfer), ownerAccount);
  //   });

  //   it("transfers the correct amount of tokens to the vault", async () => {
  //     await subject();
    
  //     assertTokenBalance(mockToken, amountToTransfer, vault.address);
  //   });
    
  //   it("increments the balance of the token of the owner by the correct amount", async () => {
  //     await subject();
    
  //     const ownerBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);
  //     expect(ownerBalance).to.be.bignumber.equal(amountToTransfer);
  //   });
  // });
});
