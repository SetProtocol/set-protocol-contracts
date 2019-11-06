import * as _ from 'lodash';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';
import * as setProtocolUtils from 'set-protocol-utils';

import { StandardTokenMockContract } from '../contracts';

import { getWeb3 } from '../web3Helper';
import { ether } from '../units';

import { UNLIMITED_ALLOWANCE_IN_BASE_UNITS, DEFAULT_GAS } from '../constants';

import { ComptrollerABI } from '../external/abis/compound/ComptrollerABI';
import { CErc20ABI } from '../external/abis/compound/CErc20ABI';
import { InterestRateModelABI } from '../external/abis/compound/InterestRateModelABI';
import { PriceOracleABI } from '../external/abis/compound/PriceOracleABI';

import { CONTRACTS, PERMISSIONED_ACCOUNTS, BYTECODE } from '../compoundSnapshotAddresses';

import { ERC20Helper } from './erc20Helper';

const web3 = getWeb3();


export class CompoundHelper {
  private _senderAccountAddress: Address;

  public priceOracle: Address = CONTRACTS.PriceOracle;
  public interestRateModel: Address = CONTRACTS.InterestRateModel;
  public comptroller: Address = CONTRACTS.Comptroller;

  constructor(senderAccountAddress: Address) {
    this._senderAccountAddress = senderAccountAddress;
  }

  /* ============ Kyber Network System Methods ============ */

  public async setup(): Promise<any> {
    const erc20Helper = new ERC20Helper(this._senderAccountAddress);


    // const PriceOracleContract = new web3.eth.Contract(PriceOracleABI, this.priceOracle);
    const InterestRateModelContract = new web3.eth.Contract(InterestRateModelABI, this.interestRateModel);
    const ComptrollerContract = new web3.eth.Contract(ComptrollerABI, this.comptroller);

    const erc20 = await erc20Helper.deployTokenAsync(this._senderAccountAddress);

    const cTokenAddress = await this.deployCToken(
      erc20.address,
      this.comptroller,
      this.interestRateModel,
      new BigNumber(10 ** 18),
      "Test",
      "Test A",
      new BigNumber(18),
      this._senderAccountAddress,
    );
    console.log("CToken Address", cTokenAddress);

    // Add Market
    const supportMarketData = ComptrollerContract.methods._supportMarket(
      cTokenAddress
    ).encodeABI();
    await web3.eth.sendTransaction({
      from: this._senderAccountAddress,
      to: this.comptroller,
      data: supportMarketData,
      gas: DEFAULT_GAS,
    });    

    const exchangeRate = await this.getExchangeRate(cTokenAddress);
    console.log("Exchange Rate", exchangeRate);

    const setBorrowData = InterestRateModelContract.methods.setBorrowRate(
      '1000000000000'
    ).encodeABI();
    await web3.eth.sendTransaction({
      from: this._senderAccountAddress,
      to: this.interestRateModel,
      data: setBorrowData,
      gas: DEFAULT_GAS,
    });

    const [, currentInterestRate] = await InterestRateModelContract.methods.getBorrowRate(
      0, 0, 0
    ).call();
    console.log("Borrow Rate", currentInterestRate);

    console.log("Max mantissa", new BigNumber(0.0005e16).toString());

    // Approve tokens to cToken
    await erc20Helper.approveTransferAsync(
      erc20,
      cTokenAddress,
      this._senderAccountAddress
    );

    await this.accrueInterest(cTokenAddress);

    const thing = await this.mintCToken(cTokenAddress, ether(1));

    const CTokenContract = await new web3.eth.Contract(CErc20ABI, cTokenAddress);
    const totalSupply = await CTokenContract.methods.totalSupply().call();
    console.log("Total Supply", totalSupply);

    const totalReserves = await CTokenContract.methods.totalReserves().call();
    console.log("Total Reserves", totalReserves);

    return thing;
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
        admin
      ]
    }).send({ from: admin, gas: DEFAULT_GAS });

    return instance.options.address;
  }

  public async getExchangeRate(
    cToken: Address,
  ): Promise<BigNumber> {    
    const instance = await new web3.eth.Contract(CErc20ABI, cToken);
    const exchangeRate: number = await instance.methods.exchangeRateStored().call();
    return new BigNumber(exchangeRate);
  }

  public async mintCToken(
    cToken: Address,
    quantity: BigNumber,
    from: Address = this._senderAccountAddress,
  ): Promise<any> {    
    const CTokenContract = await new web3.eth.Contract(CErc20ABI, cToken);
    const txnData = CTokenContract.methods.mint(
      quantity.toString()
    ).encodeABI();

    return await web3.eth.sendTransaction({
      from,
      to: cToken,
      data: txnData,
      gas: DEFAULT_GAS,
    });
  }

  public async accrueInterest(
    cToken: Address,
    from: Address = this._senderAccountAddress,
  ): Promise<any> {    
    const CTokenContract = await new web3.eth.Contract(CErc20ABI, cToken);
    const txnData = CTokenContract.methods.accrueInterest().encodeABI();

    return await web3.eth.sendTransaction({
      from,
      to: cToken,
      data: txnData,
      gas: DEFAULT_GAS,
    });
  }


}
