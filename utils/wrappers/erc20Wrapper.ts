import * as _ from 'lodash';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';
import { SetProtocolTestUtils as TestUtils }  from 'set-protocol-utils';

import {
  BadTokenMockContract,
  InvalidReturnTokenMockContract,
  NoXferReturnTokenMockContract,
  StandardTokenMockContract,
  StandardTokenWithFeeMockContract,
  NoDecimalTokenMockContract,
  WethMockContract,
} from '../contracts';

import {
  DEFAULT_GAS,
  DEFAULT_MOCK_TOKEN_DECIMALS,
  DEPLOYED_TOKEN_QUANTITY,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
} from '../constants';
import {
  getWeb3,
} from '../web3Helper';
import { getContractAddress } from '../../deployments/utils/output-helper';
import { TX_DEFAULTS } from '../../deployments/utils/blockchain';

const web3 = getWeb3();

const BadTokenMock = artifacts.require('BadTokenMock');
const InvalidReturnTokenMock = artifacts.require('InvalidReturnTokenMock');
const NoDecimalTokenMock = artifacts.require('NoDecimalTokenMock');
const NoXferReturnTokenMock = artifacts.require('NoXferReturnTokenMock');
const StandardTokenMock = artifacts.require('StandardTokenMock');
const StandardTokenWithFeeMock = artifacts.require('StandardTokenWithFeeMock');
const WethMock = artifacts.require('WethMock');


export class ERC20Wrapper {
  private _senderAccountAddress: Address;

  constructor(senderAccountAddress: Address) {
    this._senderAccountAddress = senderAccountAddress;
  }

  /* ============ Deployed Contracts ============ */

  public async getDeployedWrappedBTCAsync(): Promise<StandardTokenMockContract> {
    const address = await getContractAddress('WBTC');

    return await StandardTokenMockContract.at(address, web3, TX_DEFAULTS);
  }

  public async getDeployedWETHAsync(): Promise<WethMockContract> {
    const address = await getContractAddress('WETH');

    return await WethMockContract.at(address, web3, TX_DEFAULTS);
  }

  /* ============ Deployment ============ */

  public async deployTokenAsync(
    initialAccount: Address,
    decimals: number = DEFAULT_MOCK_TOKEN_DECIMALS,
    initialTokenAmount: BigNumber = DEPLOYED_TOKEN_QUANTITY,
  ): Promise<StandardTokenMockContract> {
    const truffleMockToken = await StandardTokenMock.new(
      initialAccount,
      initialTokenAmount,
      'Mock Token',
      'MOCK',
      decimals,
      { from: this._senderAccountAddress, gas: DEFAULT_GAS },
    );

    return new StandardTokenMockContract(
      new web3.eth.Contract(truffleMockToken.abi, truffleMockToken.address),
      { from: this._senderAccountAddress },
    );
  }

  public async deployTokensAsync(
    tokenCount: number,
    initialAccount: Address,
  ): Promise<StandardTokenMockContract[]> {
    const mockTokens: StandardTokenMockContract[] = [];
    const mockTokenPromises = _.times(tokenCount, async index => {
      return await StandardTokenMock.new(
        initialAccount,
        DEPLOYED_TOKEN_QUANTITY,
        `Component ${index}`,
        index.toString(),
        _.random(4, 18),
        { from: this._senderAccountAddress, gas: DEFAULT_GAS },
      );
    });

    await Promise.all(mockTokenPromises).then(tokenMocks => {
      _.each(tokenMocks, standardToken => {
        mockTokens.push(new StandardTokenMockContract(
          new web3.eth.Contract(standardToken.abi, standardToken.address),
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
      new web3.eth.Contract(truffleMockTokenWithFee.abi, truffleMockTokenWithFee.address),
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
      new web3.eth.Contract(truffleMockTokenNoXferReturn.abi, truffleMockTokenNoXferReturn.address),
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
      new web3.eth.Contract(truffleMockTokenInvalidReturn.abi, truffleMockTokenInvalidReturn.address),
      { from: this._senderAccountAddress },
    );
  }

  public async deployTokenWithNoDecimalAsync(
    initialAccount: Address,
  ): Promise<NoDecimalTokenMockContract> {
    const truffleMockToken = await NoDecimalTokenMock.new(
      initialAccount,
      DEPLOYED_TOKEN_QUANTITY,
      'No Decimal Token',
      'NDT',
      { from: this._senderAccountAddress, gas: DEFAULT_GAS },
    );

    return new NoDecimalTokenMockContract(
      new web3.eth.Contract(truffleMockToken.abi, truffleMockToken.address),
      { from: this._senderAccountAddress },
    );
  }

  public async deployTokenWithInvalidBalancesAsync(
    initialAccount: Address
  ): Promise<BadTokenMockContract> {
    const truffleMockToken = await BadTokenMock.new(
      initialAccount,
      DEPLOYED_TOKEN_QUANTITY,
      'Mock Token Bad Balances',
      'BAD',
      { from: this._senderAccountAddress, gas: DEFAULT_GAS },
    );

    return new BadTokenMockContract(
      new web3.eth.Contract(truffleMockToken.abi, truffleMockToken.address),
      { from: this._senderAccountAddress },
    );
  }

  public zrxToken(): StandardTokenMockContract {
    return new StandardTokenMockContract(
      new web3.eth.Contract(StandardTokenMock.abi, TestUtils.ZERO_EX_TOKEN_ADDRESS),
      { from: this._senderAccountAddress },
    );
  }

  public kyberReserveToken(tokenAddress: Address): StandardTokenMockContract {
    return new StandardTokenMockContract(
      new web3.eth.Contract(StandardTokenMock.abi, tokenAddress),
      { from: this._senderAccountAddress },
    );
  }

  public async deployWrappedEtherAsync(
    initialAccount: Address,
    initialTokenAmount: BigNumber = DEPLOYED_TOKEN_QUANTITY,
  ): Promise<WethMockContract> {
    const truffleMockToken = await WethMock.new(
      initialAccount,
      initialTokenAmount,
      { from: this._senderAccountAddress, gas: DEFAULT_GAS },
    );

    return new WethMockContract(
      new web3.eth.Contract(truffleMockToken.abi, truffleMockToken.address),
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
    const approvePromises = _.map(tokens, token =>
      token.approve.sendTransactionAsync(
        to,
        UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
        { from },
      ),
    );
    await Promise.all(approvePromises);
  }

  public async transferTokenAsync(
    token: StandardTokenMockContract,
    to: Address,
    quantity: BigNumber,
    from: Address = this._senderAccountAddress,
  ) {
    await this.transferTokensAsync([token], to, quantity, from);
  }

  public async transferTokensAsync(
    tokens: StandardTokenMockContract[],
    to: Address,
    amount: BigNumber,
    from: Address = this._senderAccountAddress,
  ) {
    const transferPromises = _.map(tokens, token =>
      token.transfer.sendTransactionAsync(
        to,
        amount,
        { from, gas: 100000 },
      ),
    );
    await Promise.all(transferPromises);
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
    const approvePromises = _.map(tokens, token =>
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
    const balancePromises = _.map(tokens, token => token.balanceOf.callAsync(owner));

    let balances: BigNumber[];
    await Promise.all(balancePromises).then(fetchedTokenBalances => {
      balances = fetchedTokenBalances;
    });

    return balances;
  }

  public async getTokenAllowances(
    tokens: StandardTokenMockContract[],
    owner: Address,
    spender: Address,
  ): Promise<BigNumber[]> {
    const allowancePromises = _.map(tokens, token => token.allowance.callAsync(owner, spender));

    let allowances: BigNumber[];
    await Promise.all(allowancePromises).then(fetchedAllowances => {
      allowances = fetchedAllowances;
    });

    return allowances;
  }

  public async retrieveTokenInstancesAsync(
    tokens: Address[],
  ): Promise<StandardTokenMockContract[]> {
    const tokenPromises = _.map(
      tokens,
      tokenAddress => new StandardTokenMockContract(
        new web3.eth.Contract(StandardTokenMock.abi, tokenAddress),
        { from: this._senderAccountAddress },
      )
    );

    return tokenPromises;
  }
}
