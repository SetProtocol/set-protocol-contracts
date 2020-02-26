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
import { getContractInstance, importArtifactsFromSource } from '../web3Helper';

const BadTokenMock = importArtifactsFromSource('BadTokenMock');
const InvalidReturnTokenMock = importArtifactsFromSource('InvalidReturnTokenMock');
const NoDecimalTokenMock = importArtifactsFromSource('NoDecimalTokenMock');
const NoXferReturnTokenMock = importArtifactsFromSource('NoXferReturnTokenMock');
const StandardTokenMock = importArtifactsFromSource('StandardTokenMock');
const StandardTokenWithFeeMock = importArtifactsFromSource('StandardTokenWithFeeMock');
const WethMock = importArtifactsFromSource('WethMock');


export class ERC20Helper {
  private _senderAccountAddress: Address;

  constructor(senderAccountAddress: Address) {
    this._senderAccountAddress = senderAccountAddress;
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
      getContractInstance(truffleMockToken),
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
          getContractInstance(standardToken),
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
      getContractInstance(truffleMockTokenWithFee),
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
      getContractInstance(truffleMockTokenNoXferReturn),
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
      getContractInstance(truffleMockTokenInvalidReturn),
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
      getContractInstance(truffleMockToken),
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
      getContractInstance(truffleMockToken),
      { from: this._senderAccountAddress },
    );
  }

  public zrxToken(): StandardTokenMockContract {
    return new StandardTokenMockContract(
      getContractInstance(StandardTokenMock, TestUtils.ZERO_EX_TOKEN_ADDRESS),
      { from: this._senderAccountAddress },
    );
  }

  public kyberReserveToken(tokenAddress: Address): StandardTokenMockContract {
    return new StandardTokenMockContract(
      getContractInstance(StandardTokenMock, tokenAddress),
      { from: this._senderAccountAddress },
    );
  }

  public async deployWrappedEtherAsync(
    initialAccount: Address,
    initialTokenAmount: BigNumber = DEPLOYED_TOKEN_QUANTITY,
  ): Promise<WethMockContract> {
    // WARNING!!!!!: Even though the intialAccount has Wrapped Ether tokens,
    // the smart contract is not collateralized by the initialTokenAmount
    const truffleMockToken = await WethMock.new(
      initialAccount,
      initialTokenAmount,
      { from: this._senderAccountAddress, gas: DEFAULT_GAS },
    );

    return new WethMockContract(
      getContractInstance(truffleMockToken),
      { from: this._senderAccountAddress },
    );
  }

  public async approveTransferAsync(
    token: StandardTokenMockContract | WethMockContract,
    to: Address,
    from: Address = this._senderAccountAddress,
  ) {
    await this.approveTransfersAsync([token], to, from);
  }

  public async approveTransfersAsync(
    tokens: (StandardTokenMockContract | WethMockContract)[],
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
    tokens: (StandardTokenMockContract | WethMockContract)[],
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

  public async getTokenSupplies(
    tokens: StandardTokenMockContract[]
  ): Promise<BigNumber[]> {
    const supplyPromises = _.map(tokens, token => token.totalSupply.callAsync());

    let supplies: BigNumber[];
    await Promise.all(supplyPromises).then(fetchedTokenSupplies => {
      supplies = fetchedTokenSupplies;
    });

    return supplies;
  }

  public async getTokenInstanceAsync(
    token: Address,
  ): Promise<StandardTokenMockContract> {
    return new StandardTokenMockContract(
      getContractInstance(StandardTokenMock, token),
      { from: this._senderAccountAddress },
    );
  }

  public async retrieveTokenInstancesAsync(
    tokens: Address[],
  ): Promise<StandardTokenMockContract[]> {
    const tokenPromises = _.map(
      tokens,
      tokenAddress => new StandardTokenMockContract(
        getContractInstance(StandardTokenMock, tokenAddress),
        { from: this._senderAccountAddress },
      )
    );

    return tokenPromises;
  }

  public async getTokensDecimalsAsync(
    tokens: Address[],
  ): Promise<BigNumber[]> {
    const tokenInstances = await this.retrieveTokenInstancesAsync(
      tokens
    );

    const tokenDecimalPromises = _.map(tokenInstances, async token => {
      return await token.decimals.callAsync();
    });
    return await Promise.all(tokenDecimalPromises);
  }
}
