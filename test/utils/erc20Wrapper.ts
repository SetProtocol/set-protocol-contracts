import * as _ from "lodash";

import { BadTokenMockContract } from "../../types/generated/bad_token_mock";
import { InvalidReturnTokenMockContract } from "../../types/generated/invalid_return_token_mock";
import { NoXferReturnTokenMockContract } from "../../types/generated/no_xfer_return_token_mock";
import { StandardTokenMockContract } from "../../types/generated/standard_token_mock";
import { StandardTokenWithFeeMockContract } from "../../types/generated/standard_token_with_fee_mock";
import { NoDecimalTokenMockContract } from "../../types/generated/no_decimal_token_mock";

import { BigNumber } from "bignumber.js";
import { Address } from "../../types/common.js";
import {
  DEFAULT_GAS,
  DEFAULT_MOCK_TOKEN_DECIMALS,
  DEPLOYED_TOKEN_QUANTITY,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
} from "../utils/constants";

const BadTokenMock = artifacts.require("BadTokenMock");
const InvalidReturnTokenMock = artifacts.require("InvalidReturnTokenMock");
const NoXferReturnTokenMock = artifacts.require("NoXferReturnTokenMock");
const StandardTokenMock = artifacts.require("StandardTokenMock");
const StandardTokenWithFeeMock = artifacts.require("StandardTokenWithFeeMock");
const NoDecimalTokenMock = artifacts.require("NoDecimalTokenMock");


export class ERC20Wrapper {
  private _senderAccountAddress: Address;

  constructor(senderAccountAddress: Address) {
    this._senderAccountAddress = senderAccountAddress;
  }

  public async deployTokenAsync(
    initialAccount: Address
  ): Promise<StandardTokenMockContract> {
    const truffleMockToken = await StandardTokenMock.new(
      initialAccount,
      DEPLOYED_TOKEN_QUANTITY,
      "Mock Token",
      "MOCK",
      DEFAULT_MOCK_TOKEN_DECIMALS,
      { from: this._senderAccountAddress, gas: DEFAULT_GAS },
    );

    return new StandardTokenMockContract(
      web3.eth.contract(truffleMockToken.abi).at(truffleMockToken.address),
      { from: this._senderAccountAddress },
    );
  }

  public async deployTokensAsync(
    tokenCount: number,
    initialAccount: Address,
  ): Promise<StandardTokenMockContract[]> {
    const mockTokens: StandardTokenMockContract[] = [];

    const mockTokenPromises = _.times(tokenCount, (index) => {
      return StandardTokenMock.new(
        initialAccount,
        DEPLOYED_TOKEN_QUANTITY,
        `Component ${index}`,
        index,
        _.random(4, 18),
        { from: this._senderAccountAddress, gas: DEFAULT_GAS },
      );
    });

    await Promise.all(mockTokenPromises).then((tokenMock) => {
      _.each(tokenMock, (standardToken) => {
        mockTokens.push(new StandardTokenMockContract(
          web3.eth.contract(standardToken.abi).at(standardToken.address),
          { from: this._senderAccountAddress }
        ));
      });
    });

    return mockTokens;
  }

  public async deployTokenWithFeeAsync(
    initialAccount: Address,
    fee: BigNumber = new BigNumber(100)
  ): Promise<StandardTokenWithFeeMockContract> {
    const truffleMockTokenWithFee = await StandardTokenWithFeeMock.new(
      initialAccount,
      DEPLOYED_TOKEN_QUANTITY,
      `Mock Token With Fee`,
      `FEE`,
      fee,
      { from: this._senderAccountAddress, gas: DEFAULT_GAS },
    );

    return new StandardTokenWithFeeMockContract(
      web3.eth.contract(truffleMockTokenWithFee.abi).at(truffleMockTokenWithFee.address),
      { from: this._senderAccountAddress },
    );
  }

  public async deployTokenNoXferReturnAsync(
    initialAccount: Address,
    fee: BigNumber = new BigNumber(100)
  ): Promise<NoXferReturnTokenMockContract> {
    const truffleMockTokenNoXferReturn = await NoXferReturnTokenMock.new(
      initialAccount,
      DEPLOYED_TOKEN_QUANTITY,
      `Mock Token No Transfer Return Value`,
      `NULL`,
      DEFAULT_MOCK_TOKEN_DECIMALS,
      { from: this._senderAccountAddress, gas: DEFAULT_GAS },
    );

    return new NoXferReturnTokenMockContract(
      web3.eth.contract(truffleMockTokenNoXferReturn.abi).at(truffleMockTokenNoXferReturn.address),
      { from: this._senderAccountAddress },
    );
  }

  public async deployTokenInvalidReturnAsync(
    initialAccount: Address,
    fee: BigNumber = new BigNumber(100)
  ): Promise<InvalidReturnTokenMockContract> {
    const truffleMockTokenInvalidReturn = await InvalidReturnTokenMock.new(
      initialAccount,
      DEPLOYED_TOKEN_QUANTITY,
      `Mock Token Invalid Return Value`,
      `OOPS`,
      DEFAULT_MOCK_TOKEN_DECIMALS,
      { from: this._senderAccountAddress, gas: DEFAULT_GAS },
    );

    return new InvalidReturnTokenMockContract(
      web3.eth.contract(truffleMockTokenInvalidReturn.abi).at(truffleMockTokenInvalidReturn.address),
      { from: this._senderAccountAddress },
    );
  }

  public async deployTokenWithNoDecimalAsync(
    initialAccount: Address,
  ): Promise<NoDecimalTokenMockContract> {
    const truffleMockToken = await NoDecimalTokenMock.new(
      initialAccount,
      DEPLOYED_TOKEN_QUANTITY,
      "No Decimal Token",
      "NDT",
      { from: this._senderAccountAddress, gas: DEFAULT_GAS },
    );

    return new NoDecimalTokenMockContract(
      web3.eth.contract(truffleMockToken.abi).at(truffleMockToken.address),
      { from: this._senderAccountAddress },
    );
  }

  public async deployTokenWithInvalidBalancesAsync(
    initialAccount: Address
  ): Promise<BadTokenMockContract> {
    const truffleMockToken = await BadTokenMock.new(
      initialAccount,
      DEPLOYED_TOKEN_QUANTITY,
      "Mock Token Bad Balances",
      "BAD",
      { from: this._senderAccountAddress, gas: DEFAULT_GAS },
    );

    return new BadTokenMockContract(
      web3.eth.contract(truffleMockToken.abi).at(truffleMockToken.address),
      { from: this._senderAccountAddress },
    );
  }

  public async approveTransferAsync(
    token: StandardTokenMockContract,
    to: Address,
    from: Address = this._senderAccountAddress,
  ) {
    await this.approveTransfersAsync([token], to, from);
  }

  public async approveTransfersAsync(
    tokens: StandardTokenMockContract[],
    to: Address,
    from: Address = this._senderAccountAddress,
  ) {
    const approvePromises = _.map(tokens, (token) =>
      token.approve.sendTransactionAsync(
        to,
        UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
        { from },
      ),
    );
    await Promise.all(approvePromises);
  }

  public async approveInvalidTransferAsync(
    token: InvalidReturnTokenMockContract,
    to: Address,
    from: Address = this._senderAccountAddress,
  ) {
    await this.approveInvalidTransfersAsync([token], to, from);
  }

  public async approveInvalidTransfersAsync(
    tokens: InvalidReturnTokenMockContract[],
    to: Address,
    from: Address = this._senderAccountAddress,
  ) {
    const approvePromises = _.map(tokens, (token) =>
      token.approve.sendTransactionAsync(
        to,
        UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
        { from },
      ),
    );
    await Promise.all(approvePromises);
  }

  public async getTokenBalances(
    tokens: StandardTokenMockContract[],
    owner: Address,
  ): Promise<BigNumber[]> {
    const balancePromises = _.map(tokens, (token) => token.balanceOf.callAsync(owner));

    let balances: BigNumber[];
    await Promise.all(balancePromises).then((fetchedTokenBalances) => {
      balances = fetchedTokenBalances;
    });

    return balances;
  }
}
