import * as _ from "lodash";

import { AuthorizableContract } from "../../types/generated/authorizable";
import { CoreContract } from "../../types/generated/core";
import { MockOrderLibraryContract } from "../../types/generated/mock_order_library";
import { SetTokenContract } from "../../types/generated/set_token";
import { SetTokenFactoryContract } from "../../types/generated/set_token_factory";
import { StandardTokenMockContract } from "../../types/generated/standard_token_mock";
import { TransferProxyContract } from "../../types/generated/transfer_proxy";
import { VaultContract } from "../../types/generated/vault";

import { BigNumber } from "bignumber.js";
import { Address } from "../../types/common.js";
import { DEFAULT_GAS } from "../utils/constants";
import { getFormattedLogsFromTxHash } from "../logs/logUtils";
import { extractNewSetTokenAddressFromLogs } from "../logs/contracts/core";

const Authorizable = artifacts.require("Authorizable");
const Core = artifacts.require("Core");
const MockOrderLibrary = artifacts.require("MockOrderLibrary");
const TransferProxy = artifacts.require("TransferProxy");
const SetTokenFactory = artifacts.require("SetTokenFactory");
const Vault = artifacts.require("Vault");
const SetToken = artifacts.require("SetToken");


export class CoreWrapper {
  private _tokenOwnerAddress: Address;
  private _contractOwnerAddress: Address;

  constructor(tokenOwnerAddress: Address, contractOwnerAddress: Address) {
    this._tokenOwnerAddress = tokenOwnerAddress;
    this._contractOwnerAddress = contractOwnerAddress;
  }

  public async deployTransferProxyAsync(
    vaultAddress: Address,
    from: Address = this._tokenOwnerAddress
  ): Promise<TransferProxyContract> {
    const truffleTransferProxy = await TransferProxy.new(
      { from, gas: DEFAULT_GAS },
    );

    const transferProxy = new TransferProxyContract(
      web3.eth.contract(truffleTransferProxy.abi).at(truffleTransferProxy.address),
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

    return new VaultContract(
      web3.eth.contract(truffleVault.abi).at(truffleVault.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployAuthorizableAsync(
    from: Address = this._tokenOwnerAddress
  ): Promise<AuthorizableContract> {
    const truffleAuthorizable = await Authorizable.new(
      { from, gas: DEFAULT_GAS },
    );

    return new AuthorizableContract(
      web3.eth.contract(truffleAuthorizable.abi).at(truffleAuthorizable.address),
      { from, gas: DEFAULT_GAS },
    );
  };

  public async deploySetTokenFactoryAsync(
    from: Address = this._tokenOwnerAddress
  ): Promise<SetTokenFactoryContract> {
    const truffleSetTokenFactory = await SetTokenFactory.new(
      { from },
    );

    return new SetTokenFactoryContract(
      web3.eth.contract(truffleSetTokenFactory.abi).at(truffleSetTokenFactory.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployMockOrderLibAsync(
    from: Address = this._tokenOwnerAddress
  ): Promise<MockOrderLibraryContract> {
    const truffleMockOrderLibrary = await MockOrderLibrary.new(
      { from },
    );

    return new MockOrderLibraryContract(
      web3.eth.contract(truffleMockOrderLibrary.abi).at(truffleMockOrderLibrary.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deploySetTokenAsync(
    factory: Address,
    componentAddresses: Address[],
    units: BigNumber[],
    naturalUnit: BigNumber,
    name: string = "Set Token",
    symbol: string = "SET",
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

    const setToken = new SetTokenContract(
      web3.eth.contract(truffleSetToken.abi).at(truffleSetToken.address),
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

    return new CoreContract(
      web3.eth.contract(truffleCore.abi).at(truffleCore.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  // Internal

  public async enableFactoryAsync(
    core: CoreContract,
    setTokenFactory: SetTokenFactoryContract,
    from: Address = this._contractOwnerAddress,
  ) {
    await core.enableFactory.sendTransactionAsync(
      setTokenFactory.address,
      { from }
    );
  }

  // Authorizable

  public async setDefaultStateAndAuthorizationsAsync(
    core: CoreContract,
    vault: VaultContract,
    transferProxy: TransferProxyContract,
    setTokenFactory: SetTokenFactoryContract,
    from: Address = this._tokenOwnerAddress,
  ) {
    this.addAuthorizationAsync(vault, core.address);
    this.addAuthorizationAsync(transferProxy, core.address);
    this.addAuthorizationAsync(setTokenFactory, core.address);
    this.setCoreAddress(setTokenFactory, core.address);

    await core.setVaultAddress.sendTransactionAsync(
        vault.address,
        { from },
    );
    await core.setTransferProxyAddress.sendTransactionAsync(
        transferProxy.address,
        { from },
    );

    await core.enableFactory.sendTransactionAsync(
      setTokenFactory.address,
      { from },
    );
  }

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
    tokens: StandardTokenMockContract[],
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

  public async createSetTokenAsync(
    core: CoreContract,
    factory: Address,
    componentAddresses: Address[],
    units: BigNumber[],
    naturalUnit: BigNumber,
    name: string = "Set Token",
    symbol: string = "SET",
    from: Address = this._tokenOwnerAddress,
  ): Promise<SetTokenContract> {
    const txHash = await core.create.sendTransactionAsync(
      factory,
      componentAddresses,
      units,
      naturalUnit,
      name,
      symbol,
      { from },
    );

    const logs = await getFormattedLogsFromTxHash(txHash);
    const setAddress = extractNewSetTokenAddressFromLogs(logs);

    return await SetTokenContract.at(
      setAddress,
      web3,
      { from }
    );
  }

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
