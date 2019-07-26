import * as _ from 'lodash';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import { StandardTokenMockContract } from '@utils/contracts';

import { getWeb3 } from '../web3Helper';
import { asyncForEach } from '../array';
import { ether } from '@utils/units';

import { UNLIMITED_ALLOWANCE_IN_BASE_UNITS, DEFAULT_GAS } from '../constants';

import { ConversionRateABI } from '../external/abis/ConversionRateABI';
import { ExpectedRateABI } from '../external/abis/ExpectedRateABI';
import { KyberNetworkABI } from '../external/abis/KyberNetworkABI';
import { KyberReserveABI } from '../external/abis/KyberReserveABI';
import { KyberNetworkProxyABI } from '../external/abis/KyberNetworkProxyABI';

import { KYBER_CONTRACTS, KYBER_PERMISSIONED_ACCOUNTS } from '../kyberSnapshotAddresses';

const web3 = getWeb3();


export class KyberNetworkWrapper {

  public kyberNetworkProxy: Address = KYBER_CONTRACTS.KyberNetworkProxy;
  public defaultSlippagePercentage: BigNumber = new BigNumber(3);

  constructor() {}

  /* ============ Kyber Network System Methods ============ */

  // Must be called ahead of any test
  public async setup() {
    const KyberNetworkContract = new web3.eth.Contract(KyberNetworkABI, KYBER_CONTRACTS.KyberNetwork);
    const KyberReserveContract = new web3.eth.Contract(KyberReserveABI, KYBER_CONTRACTS.KyberReserve);
    const ConversionRatesContract = new web3.eth.Contract(ConversionRateABI, KYBER_CONTRACTS.ConversionRates);
    
    // Called anywhere when setting up ConversionRatesContract
    const setReserveAddressTxData = ConversionRatesContract.methods.setReserveAddress(KYBER_CONTRACTS.KyberReserve).encodeABI();
    await web3.eth.sendTransaction({
      from: KYBER_PERMISSIONED_ACCOUNTS.admin,
      to: KYBER_CONTRACTS.ConversionRates,
      data: setReserveAddressTxData,
      gas: DEFAULT_GAS,
    });

    // Set Contracts
    const setContractsTxData = KyberReserveContract.methods.setContracts(
      KYBER_CONTRACTS.KyberNetwork,
      KYBER_CONTRACTS.ConversionRates,
      '0x0000000000000000000000000000000000000000',
    ).encodeABI();
    await web3.eth.sendTransaction({
      from: KYBER_PERMISSIONED_ACCOUNTS.admin,
      to: KYBER_CONTRACTS.KyberReserve,
      data: setContractsTxData,
      gas: DEFAULT_GAS,
    });

    // This contract must be added during setup as it hasn't been set during the actual deployment script itself..
    // Fix the deployment so that it is set.
    const setExpectedRateTxData = await KyberNetworkContract.methods.setExpectedRate(
      KYBER_CONTRACTS.ExpectedRate
    ).encodeABI();
    await web3.eth.sendTransaction({
      from: KYBER_PERMISSIONED_ACCOUNTS.admin,
      to: KYBER_CONTRACTS.KyberNetwork,
      data: setExpectedRateTxData,
      gas: DEFAULT_GAS,
    }); 
  }

  public async fundReserveWithEth(
    _from: Address,
    _quantity: BigNumber,
  ) {
    await web3.eth.sendTransaction(
      {
        to: KYBER_CONTRACTS.KyberReserve,
        from: _from,
        value: _quantity.toString(),
      }
    );
  }

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
    _maxPerBlockImbalance: BigNumber = UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
    _maxTotalImbalance: BigNumber = UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
  ) {
    const ConversionRatesContract = new web3.eth.Contract(ConversionRateABI, KYBER_CONTRACTS.ConversionRates);
    const ExpectedRateContract = new web3.eth.Contract(ExpectedRateABI, KYBER_CONTRACTS.ExpectedRate);
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

    const validBaseRateTxData = ConversionRatesContract.methods.setValidRateDurationInBlocks(1000000000).encodeABI();
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
    const bytes14Buy = ["0x0000"];
    const bytes14Sell = ["0x0000"];
    const indices = [0];
    const blockNumber = await web3.eth.getBlockNumber();

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

    const setBaseRateTxData = ConversionRatesContract.methods.setBaseRate(
      _tokenAddresses,
      baseBuys,
      baseSells,
      bytes14Buy,
      bytes14Sell,
      blockNumber,
      indices,
    ).encodeABI();
    await web3.eth.sendTransaction({
      from: KYBER_PERMISSIONED_ACCOUNTS.operator,
      to: KYBER_CONTRACTS.ConversionRates,
      data: setBaseRateTxData,
      gas: DEFAULT_GAS,
    });
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
  ): Promise<BigNumber> {
    const KyberNetworkContract = new web3.eth.Contract(KyberNetworkABI, KYBER_CONTRACTS.KyberNetwork);

    const [expectedRate] = await KyberNetworkContract.methods.getExpectedRate(
      _sourceToken,
      _destinationToken,
      _sourceQuantity.toString(),
    ).call();

    return expectedRate; 
  }

  public async performTrade(
    _sourceToken: Address,
    _sourceQuantity: BigNumber,
    _destinationToken: Address,
    _minConversionRate: BigNumber,
    _from: Address,
  ) {
    const KyberNetworkProxyContract = new web3.eth.Contract(KyberNetworkProxyABI, KYBER_CONTRACTS.KyberNetworkProxy);

    const swapTokenToTokenTxData = await KyberNetworkProxyContract.methods.swapTokenToToken(
      _sourceToken,
      _sourceQuantity.toString(),
      _destinationToken,
      _minConversionRate.toString(),
    ).encodeABI();
    await web3.eth.sendTransaction({
      from: _from,
      to: KYBER_CONTRACTS.KyberNetworkProxy,
      data: swapTokenToTokenTxData,
      gas: DEFAULT_GAS,
    });
  }
}
