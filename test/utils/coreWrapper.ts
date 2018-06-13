import * as _ from "lodash";

import { AuthorizableContract } from "../../types/generated/authorizable";
import { BadTokenMockContract } from "../../types/generated/bad_token_mock";
import { StandardTokenContract } from "../../types/generated/standard_token";
import { StandardTokenMockContract } from "../../types/generated/standard_token_mock";
import { StandardTokenWithFeeMockContract } from "../../types/generated/standard_token_with_fee_mock";
import { TransferProxyContract } from "../../types/generated/transfer_proxy";

import { VaultContract } from "../../types/generated/vault";
import { SetTokenContract } from "../../types/generated/set_token";
import { SetTokenFactoryContract } from "../../types/generated/set_token_factory";

import { BigNumber } from "bignumber.js";
import { Address } from "../../types/common.js";

import {
  DEFAULT_GAS,
  STANDARD_INITIAL_TOKENS,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
} from "../constants/constants";

// Artifacts
const Authorizable = artifacts.require("Authorizable");
const BadTokenMock = artifacts.require("BadTokenMock");
const TransferProxy = artifacts.require("TransferProxy");
const SetTokenFactory = artifacts.require("SetTokenFactory");
const StandardTokenMock = artifacts.require("StandardTokenMock");
const StandardTokenWithFeeMock = artifacts.require("StandardTokenWithFeeMock");
const Vault = artifacts.require("Vault");
const SetToken = artifacts.require("SetToken");


export class CoreWrapper {
  private _tokenOwnerAddress: Address;
  private _contractOwnerAddress: Address;

  constructor(tokenOwnerAddress: Address, contractOwnerAddress: Address) {
    this._tokenOwnerAddress = tokenOwnerAddress;
    this._contractOwnerAddress = contractOwnerAddress;
  }

  // Deploying Contracts

  public async deployTokenAsync(
    initialAccount: Address,
    from: Address = this._tokenOwnerAddress
  ): Promise<StandardTokenMockContract> {
    const truffleMockToken = await StandardTokenMock.new(
      initialAccount,
      STANDARD_INITIAL_TOKENS,
      "Mock Token",
      "MOCK",
      { from, gas: DEFAULT_GAS },
    );

    const mockTokenWeb3Contract = web3.eth
      .contract(truffleMockToken.abi)
      .at(truffleMockToken.address);

    return new StandardTokenMockContract(
      mockTokenWeb3Contract,
      { from },
    );
  }

  public async deployTokenWithFeeAsync(
    initialAccount: Address,
    fee: BigNumber = new BigNumber(100),
    from: Address = this._tokenOwnerAddress
  ): Promise<StandardTokenWithFeeMockContract> {
    const truffleMockTokenWithFee = await StandardTokenWithFeeMock.new(
      initialAccount,
      STANDARD_INITIAL_TOKENS,
      `Mock Token With Fee`,
      `FEE`,
      fee,
      { from, gas: DEFAULT_GAS },
    );

    const mockTokenWithFeeWeb3Contract = web3.eth
      .contract(truffleMockTokenWithFee.abi)
      .at(truffleMockTokenWithFee.address);

    return new StandardTokenWithFeeMockContract(
      mockTokenWithFeeWeb3Contract,
      { from },
    );
  }

  public async deployTokenWithInvalidBalancesAsync(
    initialAccount: Address,
    from: Address = this._tokenOwnerAddress
  ): Promise<BadTokenMockContract> {
    const truffleMockToken = await BadTokenMock.new(
      initialAccount,
      STANDARD_INITIAL_TOKENS,
      "Mock Token Bad Balances",
      "BAD",
      { from, gas: DEFAULT_GAS },
    );

    const mockTokenWeb3Contract = web3.eth
      .contract(truffleMockToken.abi)
      .at(truffleMockToken.address);

    return new StandardTokenMockContract(
      mockTokenWeb3Contract,
      { from },
    );
  }

  public async deployTransferProxyAsync(
    vaultAddress: Address,
    from: Address = this._tokenOwnerAddress
  ): Promise<TransferProxyContract> {
    const truffleTransferProxy = await TransferProxy.new(
      { from, gas: DEFAULT_GAS },
    );

    const transferProxyWeb3Contract = web3.eth
      .contract(truffleTransferProxy.abi)
      .at(truffleTransferProxy.address);

    const transferProxy = new TransferProxyContract(
      transferProxyWeb3Contract,
      { from, gas: DEFAULT_GAS },
    );

    // Set TransferProxy dependencies
    await transferProxy.setVaultAddress.sendTransactionAsync(
      vaultAddress,
      { from },
    );

    return transferProxy;
  }

  public async deployVaultAsync(
    from: Address = this._tokenOwnerAddress
  ): Promise<VaultContract> {
    const truffleVault = await Vault.new(
      { from, gas: DEFAULT_GAS },
    );

    const vaultWeb3Contract = web3.eth
      .contract(truffleVault.abi)
      .at(truffleVault.address);

    return new VaultContract(
      vaultWeb3Contract,
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployAuthorizableAsync(
    from: Address = this._tokenOwnerAddress
  ): Promise<AuthorizableContract> {
    const truffleAuthorizable = await Authorizable.new(
      { from, gas: 7000000 },
    );

    const authorizableWeb3Contract = web3.eth
      .contract(truffleAuthorizable.abi)
      .at(truffleAuthorizable.address);

    return new AuthorizableContract(
      authorizableWeb3Contract,
      { from, gas: 7000000 },
    );
  };

  public async deploySetTokenFactoryAsync(
    from: Address = this._tokenOwnerAddress
  ): Promise<SetTokenFactoryContract> {
    const truffleSetTokenFactory = await SetTokenFactory.new(
      { from, gas: DEFAULT_GAS },
    );

    const setTokenFactoryWeb3Contract = web3.eth
      .contract(truffleSetTokenFactory.abi)
      .at(truffleSetTokenFactory.address);

    const setTokenFactory = new SetTokenFactoryContract(
      setTokenFactoryWeb3Contract,
      { from, gas: DEFAULT_GAS },
    );

    return setTokenFactory;
  }

  public async deploySetTokenAsync(
    componentAddresses: Address[],
    units: BigNumber[],
    naturalUnit: BigNumber,
    name: string,
    symbol: string,
    from: Address = this._tokenOwnerAddress
  ): Promise<SetTokenContract> {
    const truffleSetToken = await SetToken.new(
      componentAddresses,
      units,
      naturalUnit,
      name,
      symbol,
      { from, gas: DEFAULT_GAS },
    );

    const setTokenWeb3Contract = web3.eth
      .contract(truffleSetToken.abi)
      .at(truffleSetToken.address);

    const setToken = new SetTokenContract(
      setTokenWeb3Contract,
      { from, gas: DEFAULT_GAS },
    );

    return setToken;
  }  

  // ERC20 Transactions

  public async approveTransferAsync(
    token: StandardTokenContract,
    to: Address,
    from: Address = this._tokenOwnerAddress
  ) {
    await token.approve.sendTransactionAsync(
      to,
      UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
      { from },
    );
  }

  // Authorizable

  public async addAuthorizationAsync(
    contract: AuthorizableContract,
    toAuthorize: Address,
    from: Address = this._contractOwnerAddress
  ) {
    await contract.addAuthorizedAddress.sendTransactionAsync(
      toAuthorize,
      { from },
    );
  }

  // Vault

  public async incrementAccountBalanceAsync(
    vault: VaultContract,
    account: Address,
    token: Address,
    quantity: BigNumber,
    from: Address = this._contractOwnerAddress,
  ) {
    await vault.incrementTokenOwner.sendTransactionAsync(
        account,
        token,
        quantity,
        { from },
      );
  }
}
