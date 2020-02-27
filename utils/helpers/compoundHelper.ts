import * as _ from 'lodash';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';


import { getContractInstance, getWeb3, importArtifactsFromSource } from '../web3Helper';
import { ether } from '../units';

import { DEFAULT_GAS, DEPLOYED_TOKEN_QUANTITY } from '../constants';

import { ComptrollerABI } from '../external/abis/compound/ComptrollerABI';
import { CErc20ABI } from '../external/abis/compound/CErc20ABI';
import { InterestRateModelABI } from '../external/abis/compound/InterestRateModelABI';

import { CONTRACTS, PERMISSIONED_ACCOUNTS, BYTECODE } from '../compoundSnapshotAddresses';

import { BadCTokenMockContract } from '../contracts';

const web3 = getWeb3();
const BadCTokenMock = importArtifactsFromSource('BadCTokenMock');

export class CompoundHelper {
  private _senderAccountAddress: Address;

  public priceOracle: Address = CONTRACTS.PriceOracle;
  public interestRateModel: Address = CONTRACTS.InterestRateModel;
  public comptroller: Address = CONTRACTS.Comptroller;
  public admin: Address = PERMISSIONED_ACCOUNTS.admin;

  constructor(senderAccountAddress: Address) {
    this._senderAccountAddress = senderAccountAddress;
  }

    /**
     * Example Usage: USDC
     *
     * const usdc: StandardTokenMockContract = await this._erc20Helper.deployTokenAsync(
     *   this._senderAccountAddress,
     *   6,
     * );
     *
     * const cUSDC = await this.deployMockCUSDC(usdc.address, this.admin);
     * await this.enableCToken(cUSDC);
     *
     *  Set the Borrow Rate
     *  await this.setBorrowRate(cUSDC, new BigNumber('1000000000000'));
     *
     * await this._erc20Helper.approveTransferAsync(
     *   usdc,
     *   cUSDC,
     *   this._senderAccountAddress
     * );
     *
     * await this.accrueInterest(cUSDC);
     *
     * const ONE_USDC = new BigNumber(10 ** 6);
     * await this.mintCToken(cUSDC, ONE_USDC);
     */

  /* ============ Compound Methods ============ */

  public async deployMockCUSDC(
    underlying: Address,
    admin: Address,
  ): Promise<string> {
    const config = {
      'name': 'Compound USD Coin',
      'symbol': 'cUSDC',
      'decimals': new BigNumber(8),
      'underlying': underlying,
      'contract': 'CErc20',
      'initial_exchange_rate_mantissa': new BigNumber('200000000000000'),
    };

    return await this.deployCToken(
      config.underlying,
      this.comptroller,
      this.interestRateModel,
      config.initial_exchange_rate_mantissa,
      config.symbol,
      config.name,
      config.decimals,
      this.admin,
    );
  }

  public async deployCTokenWithInvalidMintAndRedeemAsync(
    initialAccount: Address
  ): Promise<BadCTokenMockContract> {
    const truffleMockToken = await BadCTokenMock.new(
      initialAccount,
      DEPLOYED_TOKEN_QUANTITY,
      'Mock CToken Bad Mint Redeem',
      'BAD',
      { from: this._senderAccountAddress, gas: DEFAULT_GAS },
    );

    return new BadCTokenMockContract(
      getContractInstance(truffleMockToken),
      { from: this._senderAccountAddress },
    );
  }

  public async deployMockCDAI(
    underlying: Address,
    admin: Address,
  ): Promise<string> {
    const config = {
      'name': 'C_DAI',
      'symbol': 'cDAI',
      'decimals': new BigNumber(8),
      'underlying': underlying,
      'contract': 'CErc20',
      'initial_exchange_rate_mantissa': new BigNumber('20000000000000000'),
    };

    return await this.deployCToken(
      config.underlying,
      this.comptroller,
      this.interestRateModel,
      config.initial_exchange_rate_mantissa,
      config.symbol,
      config.name,
      config.decimals,
      this.admin,
    );
  }

  // cToken must be enabled before minting or accruing interest is allowed
  public async enableCToken(cToken: Address): Promise<void> {
    const ComptrollerContract = new web3.eth.Contract(ComptrollerABI, this.comptroller);

    const supportMarketData = ComptrollerContract.methods._supportMarket(
      cToken
    ).encodeABI();
    await web3.eth.sendTransaction({
      from: this._senderAccountAddress,
      to: this.comptroller,
      data: supportMarketData,
      gas: DEFAULT_GAS,
    });
  }

  public async disableCTokenMinting(): Promise<void> {
    const ComptrollerContract = new web3.eth.Contract(ComptrollerABI, this.comptroller);

    const setMintPausedData = ComptrollerContract.methods._setMintPaused(true).encodeABI();

    await web3.eth.sendTransaction({
      from: this.admin,
      to: this.comptroller,
      data: setMintPausedData,
      gas: DEFAULT_GAS,
    });
  }

  // Sets borrow rate on the interestRateModel
  public async setBorrowRate(cToken: Address, borrowRate: BigNumber): Promise<void> {
    const InterestRateModelContract = new web3.eth.Contract(InterestRateModelABI, this.interestRateModel);
    const setBorrowData = InterestRateModelContract.methods.setBorrowRate(
      borrowRate.toString()
    ).encodeABI();
    await web3.eth.sendTransaction({
      from: this._senderAccountAddress,
      to: this.interestRateModel,
      data: setBorrowData,
      gas: DEFAULT_GAS,
    });
  }

  public async deployCToken(
    underlying: Address,
    comptroller: Address,
    interestRateModel: Address,
    initialExchangeRate: BigNumber,
    symbol: string,
    name: string,
    decimals: BigNumber,
    admin: Address,
  ): Promise<string> {
    const instance = await new web3.eth.Contract(CErc20ABI).deploy({
      data: BYTECODE.CErc20,
      arguments: [
        underlying,
        comptroller,
        interestRateModel,
        initialExchangeRate.toString(),
        name,
        symbol,
        decimals.toString(),
        admin,
      ],
    }).send({ from: admin, gas: DEFAULT_GAS });

    return instance.options.address;
  }

  public async getExchangeRate(
    cToken: Address,
  ): Promise<BigNumber> {
    const exchangeRate: number = await this.cTokenInstance(cToken).methods.exchangeRateStored().call();
    return new BigNumber(exchangeRate);
  }

  public async getExchangeRateCurrent(
    cToken: Address,
  ): Promise<BigNumber> {
    const exchangeRate: number = await this.cTokenInstance(cToken).methods.exchangeRateCurrent().call();
    return new BigNumber(exchangeRate);
  }

  public async mintCToken(
    cToken: Address,
    underlyingQuantity: BigNumber,
    from: Address = this._senderAccountAddress,
  ): Promise<any> {
    const txnData = this.cTokenInstance(cToken).methods.mint(
      underlyingQuantity.toString()
    ).encodeABI();

    return await web3.eth.sendTransaction({ from, to: cToken, data: txnData, gas: DEFAULT_GAS });
  }

  // The redeem function transfers the underlying asset from the money market to
  // the user in exchange for previously minted cTokens. The amount of underlying
  // redeemed is the number of cTokens multiplied by the current Exchange Rate.
  public async cTokenToUnderlying(
    cToken: Address,
    cTokenQuantity: BigNumber
  ): Promise<BigNumber> {
    const exchangeRate: number = await this.cTokenInstance(cToken).methods.exchangeRateStored().call();
    let underlyingAmount = cTokenQuantity.mul(exchangeRate).div(ether(1)).round(0, BigNumber.ROUND_DOWN);

    underlyingAmount = underlyingAmount.mul(ether(1)).div(exchangeRate).gte(cTokenQuantity)
      ? underlyingAmount
      : underlyingAmount.add(1);

    return underlyingAmount;
  }

  // Retrieve # of cTokens expected from Underlying Quantity
  public async underlyingToCToken(
    cToken: Address,
    underlyingQuantity: BigNumber
  ): Promise<BigNumber> {
    const exchangeRate: number = await this.cTokenInstance(cToken).methods.exchangeRateStored().call();
    return underlyingQuantity.div(exchangeRate).mul(ether(1));
  }

  public async balanceOf(
    cToken: Address,
    account: Address
  ): Promise<BigNumber> {
    const balance = await this.cTokenInstance(cToken).methods.balanceOf(account).call();
    return new BigNumber(balance);
  }

  // Retrieves balance of underlying owned
  public async balanceOfUnderlying(
    cToken: Address,
    account: Address
  ): Promise<BigNumber> {
    const balance = await this.cTokenInstance(cToken).methods.balanceOfUnderlying(account).call();
    return new BigNumber(balance);
  }

  public async accrueInterest(
    cToken: Address,
    from: Address = this._senderAccountAddress,
  ): Promise<any> {
    const txnData = this.cTokenInstance(cToken).methods.accrueInterest().encodeABI();
    return await web3.eth.sendTransaction({ from, to: cToken, data: txnData, gas: DEFAULT_GAS });
  }

  public cTokenInstance(
    cToken: Address,
  ): any {
    return new web3.eth.Contract(CErc20ABI, cToken);
  }
}
