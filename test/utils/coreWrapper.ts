import * as _ from "lodash";

import { AuthorizableContract } from "../../types/generated/authorizable";
import { StandardTokenContract } from "../../types/generated/standard_token";
import { StandardTokenMockContract } from "../../types/generated/standard_token_mock";
import { StandardTokenWithFeeMockContract } from "../../types/generated/standard_token_with_fee_mock";
import { TransferProxyContract } from "../../types/generated/transfer_proxy";

import { BigNumber } from "bignumber.js";
import { Address } from "../../types/common.js";

import {
  DEFAULT_GAS,
  STANDARD_INITIAL_TOKENS,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
} from "../constants/constants";

// Artifacts
const TransferProxy = artifacts.require("TransferProxy");
const StandardTokenMock = artifacts.require("StandardTokenMock");
const StandardTokenWithFeeMock = artifacts.require("StandardTokenWithFeeMock");

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
    fee: BigNumber,
    initialAccount: Address,
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
}
