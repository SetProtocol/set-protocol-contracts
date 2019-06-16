import * as _ from 'lodash';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import { StandardTokenMockContract } from '@utils/contracts';

import { getWeb3 } from '../web3Helper';
import { asyncForEach } from '../array';

import { UNLIMITED_ALLOWANCE_IN_BASE_UNITS, DEFAULT_GAS } from '../constants';

import { ConversionRateABI } from '../external/abis/ConversionRateABI';
import { KyberNetworkABI } from '../external/abis/KyberNetworkABI';
import { KyberReserveABI } from '../external/abis/KyberReserveABI';

import { KYBER_CONTRACTS, KYBER_PERMISSIONED_ACCOUNTS } from '../kyberSnapshotAddresses';

const web3 = getWeb3();


export class KyberNetworkWrapper {
  constructor() {}

  /* ============ Kyber Network System Methods ============ */

  /**
   * In this function, we are enabling an ERC20 token onto a normal Kyber Reserve (not automated or orderbook).
   * We do three things:
   * 1. List the asset on a specific reserve by calling the KyberNetwork's listPairforReserveContract
   *    This can only be called by the operator of that reserve. Our standard reserve is operated by address 1
   * 2. Add the token to the ConversionRatesContract. This is the equivalent to approving the token to the Kyber System.
   *    This can only be called by the admin of the Kyber Network system. Our admin is account 0
   * 3. Set the Token Control Info 
   * 4. Enable token for trading on Kyber
   * See more about how to add tokens onto a kyber reserve here.
   * https://developer.kyber.network/docs/FedPriceReservesGuide/#adding-tokens
   **/
  public async enableTokensForReserve(
    _tokenAddress: Address,
    _minimalRecordResolution: BigNumber = new BigNumber(1000000000000000),
    _maxPerBlockImbalance: BigNumber = new BigNumber(1000000000000000),
    _maxTotalImbalance: BigNumber = UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
  ) {
    const ConversionRatesContract = new web3.eth.Contract(ConversionRateABI, KYBER_CONTRACTS.ConversionRates);
    const KyberNetworkContract = new web3.eth.Contract(KyberNetworkABI, KYBER_CONTRACTS.KyberNetwork);
    const KyberReserveContract = new web3.eth.Contract(KyberReserveABI, KYBER_CONTRACTS.KyberReserve);

    const listPairForReserveTxData = KyberNetworkContract.methods.listPairForReserve(
      KYBER_CONTRACTS.KyberReserve,
      _tokenAddress,
      true,
      true,
      true,
    ).encodeABI();

    await web3.eth.sendTransaction({
      from: KYBER_PERMISSIONED_ACCOUNTS.operator,
      to: KYBER_CONTRACTS.KyberNetwork,
      data: listPairForReserveTxData,
      gas: DEFAULT_GAS,
    });

    // Add token to conversion rate instance
    // Only argument is the token address
    // Must be called by the admin
    const addTokenTxData = ConversionRatesContract.methods.addToken(_tokenAddress).encodeABI();
    await web3.eth.sendTransaction({
      from: KYBER_PERMISSIONED_ACCOUNTS.admin,
      to: KYBER_CONTRACTS.ConversionRates,
      data: addTokenTxData,
      gas: DEFAULT_GAS,
    });

    const setTokenControlInfoTxData = ConversionRatesContract.methods.setTokenControlInfo(
      _tokenAddress,
      _minimalRecordResolution.toString(),
      _maxPerBlockImbalance.toString(),
      _maxTotalImbalance.toString(),
    ).encodeABI();
    await web3.eth.sendTransaction({
      from: KYBER_PERMISSIONED_ACCOUNTS.admin,
      to: KYBER_CONTRACTS.ConversionRates,
      data: setTokenControlInfoTxData,
      gas: DEFAULT_GAS,
    });

    const enableTokenTradeTxData = ConversionRatesContract.methods.enableTokenTrade(_tokenAddress,).encodeABI();
    await web3.eth.sendTransaction({
      from: KYBER_PERMISSIONED_ACCOUNTS.admin,
      to: KYBER_CONTRACTS.ConversionRates,
      data: enableTokenTradeTxData,
      gas: DEFAULT_GAS,
    });

    const validBaseRateTxData = ConversionRatesContract.methods.setValidRateDurationInBlocks(100000).encodeABI();
    await web3.eth.sendTransaction({
      from: KYBER_PERMISSIONED_ACCOUNTS.admin,
      to: KYBER_CONTRACTS.ConversionRates,
      data: validBaseRateTxData,
      gas: DEFAULT_GAS,
    });    

    // Set Token Wallet to the operator. This means the operator must approve its tokens
    // to the contract
    const setTokenWalletTxData = KyberReserveContract.methods.setTokenWallet(
      _tokenAddress,
      KYBER_PERMISSIONED_ACCOUNTS.operator,
    ).encodeABI();
    await web3.eth.sendTransaction({
      from: KYBER_PERMISSIONED_ACCOUNTS.admin,
      to: KYBER_CONTRACTS.KyberReserve,
      data: setTokenWalletTxData,
      gas: DEFAULT_GAS,
    });

    const approveWithdrawAddressTxData = KyberReserveContract.methods.approveWithdrawAddress(
      _tokenAddress,
      KYBER_PERMISSIONED_ACCOUNTS.operator,
      true
    ).encodeABI();
    await web3.eth.sendTransaction({
      from: KYBER_PERMISSIONED_ACCOUNTS.admin,
      to: KYBER_CONTRACTS.KyberReserve,
      data: approveWithdrawAddressTxData,
      gas: DEFAULT_GAS,
    });

  }

  public async setUpConversionRates(
    _tokenAddresses: Address[],
    _baseBuy: BigNumber[],
    _baseSell: BigNumber[],
  ) {
    const ConversionRatesContract = new web3.eth.Contract(ConversionRateABI, KYBER_CONTRACTS.ConversionRates);

    // Set Base Rate arguments
    const baseBuys = _baseBuy.map(quantity => { return quantity.toString() });
    const baseSells = _baseSell.map(quantity => { return quantity.toString()});
    const bytes14Buy = [];
    const bytes14Sell = [];
    const indices = [];
    const blockNumber = await web3.eth.getBlockNumber();

    console.log("Set step data");

    for (let i = 0; i < _tokenAddresses.length; i++) {
      const stepData = [0];
      const setQtyStepFunctionTxData = ConversionRatesContract.methods.setQtyStepFunction(
        _tokenAddresses[i],
        stepData,
        stepData,
        stepData,
        stepData,
      ).encodeABI();
      await web3.eth.sendTransaction({
        from: KYBER_PERMISSIONED_ACCOUNTS.operator,
        to: KYBER_CONTRACTS.ConversionRates,
        data: setQtyStepFunctionTxData,
        gas: DEFAULT_GAS,
      });

      const setImbalanceStepFunctionTxData = ConversionRatesContract.methods.setImbalanceStepFunction(
        _tokenAddresses[i],
        stepData,
        stepData,
        stepData,
        stepData,
      ).encodeABI();
      await web3.eth.sendTransaction({
        from: KYBER_PERMISSIONED_ACCOUNTS.operator,
        to: KYBER_CONTRACTS.ConversionRates,
        data: setImbalanceStepFunctionTxData,
        gas: DEFAULT_GAS,
      });  
    }

    console.log("setImbalanceStepFunctionTxData");

    const setBaseRateTxData = ConversionRatesContract.methods.setBaseRate(
      _tokenAddresses,
      baseBuys,
      baseSells,
      bytes14Buy,
      bytes14Sell,
      blockNumber,
      indices // Indices to apply bps adjustments to
    ).encodeABI();
    await web3.eth.sendTransaction({
      from: KYBER_PERMISSIONED_ACCOUNTS.operator,
      to: KYBER_CONTRACTS.ConversionRates,
      data: setBaseRateTxData,
      gas: DEFAULT_GAS,
    });

    console.log("Set base rate");
  }
  
  public async approveToReserve(
    _token: StandardTokenMockContract,
    _quantity: BigNumber,
    _from: Address,
  ) {
    const reserveContractAddress = KYBER_CONTRACTS.KyberReserve;

    await _token.approve.sendTransactionAsync(
      reserveContractAddress,
      _quantity,
      { from: _from, gas: 100000 },
    );
  }

  public async getKyberRate(
    _sourceToken: Address,
    _destinationToken: Address,
    _sourceQuantity: BigNumber,
  ) {
    const KyberReserveContract = new web3.eth.Contract(KyberReserveABI, KYBER_CONTRACTS.KyberReserve);
    const tradeEnabled = await KyberReserveContract.methods.tradeEnabled().call();
    console.log("Trade enabled?", tradeEnabled);

    const sourceTokenBalance = await KyberReserveContract.methods.getBalance(_sourceToken).call();
    console.log("Got source token balance", _sourceToken);
    const destinationTokenBalance = await KyberReserveContract.methods.getBalance(_destinationToken).call();

    console.log("SOurce", sourceTokenBalance);
    console.log("Destination", destinationTokenBalance);

    // Debug by calling the conversion rates contract
    const blockNumber1 = await web3.eth.getBlockNumber();
    console.log("Blocknumber", blockNumber1);

    console.log("Getting basic rate");
    const ConversionRatesContract = new web3.eth.Contract(ConversionRateABI, KYBER_CONTRACTS.ConversionRates);
    const basicRate = await ConversionRatesContract.methods.getBasicRate(
      _destinationToken,
      true,
    ).call();

    console.log("Basic rate", basicRate);
    
    const basicInfo = await ConversionRatesContract.methods.getTokenBasicData(
      _destinationToken,
    ).call();
    console.log("Get ConversionRate Data", basicInfo[0], basicInfo[1]);

    const getRate = await ConversionRatesContract.methods.getRate(
      _destinationToken,
      blockNumber1,
      true,
      '100000000000000000'
    ).call();
    console.log("Get Rate", getRate.toString());


    


    console.log("Getting rate of a specific reserve");
    
    const blockNumber = await web3.eth.getBlockNumber();
    const reserveRate = await KyberReserveContract.methods.getConversionRate(
      _sourceToken,
      _destinationToken,
      _sourceQuantity.toString(),
      blockNumber
    ).call();

    console.log("Reserve rate", reserveRate.toString());

    
    console.log("Getting Kyber Rate");

    const KyberNetworkContract = new web3.eth.Contract(KyberNetworkABI, KYBER_CONTRACTS.KyberNetwork);

    const expectedRate = await KyberNetworkContract.methods.findBestRate(
      _sourceToken,
      _destinationToken,
      _sourceQuantity.toString(),
    ).call();

    console.log("Expected rate", expectedRate.toString());
  }

  // This contract must be added during setup as it hasn't been set during the actual deployment script itself..
  // Fix the deployment so that it is set.
  public async setExpectedRateOnKyberReserve() {
    const KyberNetworkContract = new web3.eth.Contract(KyberNetworkABI, KYBER_CONTRACTS.KyberNetwork);
    const expectedRateAddress = KYBER_CONTRACTS.ExpectedRate;

    const setExpectedRateTxData = await KyberNetworkContract.methods.setExpectedRate(
      expectedRateAddress
    ).encodeABI();
    await web3.eth.sendTransaction({
      from: KYBER_PERMISSIONED_ACCOUNTS.admin,
      to: KYBER_CONTRACTS.KyberNetwork,
      data: setExpectedRateTxData,
      gas: DEFAULT_GAS,
    });
  }
}
