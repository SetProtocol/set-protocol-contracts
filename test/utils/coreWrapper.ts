import * as _ from "lodash";

import { AuthorizableContract } from "../../types/generated/authorizable";
import { BadTokenMockContract } from "../../types/generated/bad_token_mock";
import { CoreContract } from "../../types/generated/core";
import { StandardTokenContract } from "../../types/generated/standard_token";
import { StandardTokenMockContract } from "../../types/generated/standard_token_mock";
import { StandardTokenWithFeeMockContract } from "../../types/generated/standard_token_with_fee_mock";
import { NoDecimalTokenMockContract } from "../../types/generated/no_decimal_token_mock";
import { TransferProxyContract } from "../../types/generated/transfer_proxy";

import { VaultContract } from "../../types/generated/vault";
import { SetTokenContract } from "../../types/generated/set_token";
import { SetTokenFactoryContract } from "../../types/generated/set_token_factory";

import { BigNumber } from "bignumber.js";
import { Address } from "../../types/common.js";

import {
  DEFAULT_GAS,
  DEFAULT_MOCK_TOKEN_DECIMALS,
  DEPLOYED_TOKEN_QUANTITY,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
} from "../utils/constants";

import { randomIntegerLessThan } from "../utils/math";

// Artifacts
const Authorizable = artifacts.require("Authorizable");
const BadTokenMock = artifacts.require("BadTokenMock");
const Core = artifacts.require("Core");
const TransferProxy = artifacts.require("TransferProxy");
const SetTokenFactory = artifacts.require("SetTokenFactory");
const StandardTokenMock = artifacts.require("StandardTokenMock");
const StandardTokenWithFeeMock = artifacts.require("StandardTokenWithFeeMock");
const NoDecimalTokenMock = artifacts.require("NoDecimalTokenMock");
const Vault = artifacts.require("Vault");
const SetToken = artifacts.require("SetToken");

import { getFormattedLogsFromTxHash } from "../logs/logUtils";
import { extractNewSetTokenAddressFromLogs } from "../logs/contracts/core";


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
      DEPLOYED_TOKEN_QUANTITY,
      "Mock Token",
      "MOCK",
      DEFAULT_MOCK_TOKEN_DECIMALS,
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
      DEPLOYED_TOKEN_QUANTITY,
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

  public async deployTokenWithNoDecimalAsync(
    initialAccount: Address,
    from: Address = this._tokenOwnerAddress
  ): Promise<NoDecimalTokenMockContract> {
    const truffleMockToken = await NoDecimalTokenMock.new(
      initialAccount,
      DEPLOYED_TOKEN_QUANTITY,
      "No Decimal Token",
      "NDT",
      { from, gas: DEFAULT_GAS },
    );

    const mockTokenWeb3Contract = web3.eth
      .contract(truffleMockToken.abi)
      .at(truffleMockToken.address);

    return new NoDecimalTokenMockContract(
      mockTokenWeb3Contract,
      { from },
    );
  }

  public async deployTokensAsync(
    tokenCount: number,
    initialAccount: Address,
    from: Address = this._tokenOwnerAddress,
  ): Promise<StandardTokenMockContract[]> {
    const mockTokens: StandardTokenMockContract[] = [];

    const mockTokenPromises = _.times(tokenCount, (index) => {
      return StandardTokenMock.new(
        initialAccount,
        DEPLOYED_TOKEN_QUANTITY,
        `Component ${index}`,
        index,
        randomIntegerLessThan(18, 4),
        { from, gas: DEFAULT_GAS },
      );
    });

    await Promise.all(mockTokenPromises).then((tokenMock) => {
      _.each(tokenMock, (standardToken) => {
        const tokenWeb3Contract = web3.eth
          .contract(standardToken.abi)
          .at(standardToken.address);

        mockTokens.push(new StandardTokenMockContract(
          tokenWeb3Contract,
          { from }
        ));
      });
    });

    return mockTokens;
  }

  public async deployTokenWithInvalidBalancesAsync(
    initialAccount: Address,
    from: Address = this._tokenOwnerAddress
  ): Promise<BadTokenMockContract> {
    const truffleMockToken = await BadTokenMock.new(
      initialAccount,
      DEPLOYED_TOKEN_QUANTITY,
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
      { from },
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
      { from, gas: DEFAULT_GAS },
    );

    const authorizableWeb3Contract = web3.eth
      .contract(truffleAuthorizable.abi)
      .at(truffleAuthorizable.address);

    return new AuthorizableContract(
      authorizableWeb3Contract,
      { from, gas: DEFAULT_GAS },
    );
  };

  public async deploySetTokenFactoryAsync(
    from: Address = this._tokenOwnerAddress
  ): Promise<SetTokenFactoryContract> {
    const truffleSetTokenFactory = await SetTokenFactory.new(
      { from }, // TODO: investigate how to set limit when not run with coveralls
    );

    const setTokenFactoryWeb3Contract = web3.eth
      .contract(truffleSetTokenFactory.abi)
      .at(truffleSetTokenFactory.address);

    return new SetTokenFactoryContract(
      setTokenFactoryWeb3Contract,
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deploySetTokenAsync(
    factory: Address,
    componentAddresses: Address[],
    units: BigNumber[],
    naturalUnit: BigNumber,
    name: string,
    symbol: string,
    from: Address = this._tokenOwnerAddress
  ): Promise<SetTokenContract> {
    const truffleSetToken = await SetToken.new(
      factory,
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

  public async deployCoreAsync(
    from: Address = this._tokenOwnerAddress
  ): Promise<CoreContract> {
    const truffleCore = await Core.new(
      { from },
    );

    const coreWeb3Contract = web3.eth
      .contract(truffleCore.abi)
      .at(truffleCore.address);

    return new CoreContract(
      coreWeb3Contract,
      { from, gas: DEFAULT_GAS },
    );
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

  public async approveTransfersAsync(
    tokens: StandardTokenMockContract[],
    to: Address,
    from: Address = this._tokenOwnerAddress,
  ) {
    const approvePromises = _.map(tokens, (token) =>
      token.approve.sendTransactionAsync(
        to,
        UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
        { from: from },
      ),
    );
    await Promise.all(approvePromises);
  }

  public async getTokenBalances(
    tokens: StandardTokenContract[],
    owner: Address,
  ): Promise<BigNumber[]> {
    const balancePromises = _.map(tokens, (token) => token.balanceOf.callAsync(owner));

    let balances: BigNumber[];
    await Promise.all(balancePromises).then((fetchedTokenBalances) => {
      balances = fetchedTokenBalances;
    });

    return balances;
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

  public async getVaultBalancesForTokensForOwner(
    tokens: StandardTokenContract[],
    vault: VaultContract,
    owner: Address
  ): Promise<BigNumber[]> {
    const balancePromises = _.map(tokens, (token) => vault.balances.callAsync(token.address, owner));

    let balances: BigNumber[];
    await Promise.all(balancePromises).then((fetchedTokenBalances) => {
      balances = fetchedTokenBalances;
    });

    return balances;
  }

  // Core

  public async depositFromUser(
    core: CoreContract,
    token: Address,
    quantity: BigNumber,
    from: Address = this._contractOwnerAddress,
  ) {
    await core.deposit.sendTransactionAsync(
      token,
      quantity,
      { from },
    );
  }

  public async createSetTokenAsync(
    core: CoreContract,
    factory: Address,
    componentAddresses: Address[],
    units: BigNumber[],
    naturalUnit: BigNumber,
    name: string,
    symbol: string,
    from: Address = this._tokenOwnerAddress,
  ): Promise<SetTokenContract> {
    const txHash = await core.create.sendTransactionAsync(
      factory,
      componentAddresses,
      units,
      naturalUnit,
      name,
      symbol,
      { from }, // TODO: investigate how to set limit when not run with coveralls
    );

    const logs = await getFormattedLogsFromTxHash(txHash);
    const setAddress = extractNewSetTokenAddressFromLogs(logs);

    return await SetTokenContract.at(
      setAddress,
      web3,
      { from }
    );
  }

  public async issueSetTokenAsync(
    core: CoreContract,
    token: Address,
    quantity: BigNumber,
    from: Address = this._tokenOwnerAddress,
  ) {
    await core.issue.sendTransactionAsync(
      token,
      quantity,
      { from }
    );
  }

  // SetTokenFactory

  public async setCoreAddress(
    factory: SetTokenFactoryContract,
    coreAddress: Address,
    from: Address = this._contractOwnerAddress,
  ) {
    await factory.setCoreAddress.sendTransactionAsync(
      coreAddress,
      { from },
    );
  }
}
