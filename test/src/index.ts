import Web3 from 'web3';
import { Order } from '@0xproject/types';

import {
  Address,
  Bytes,
  ECSig,
  ExchangeOrder,
  IssuanceOrder,
  KyberTrade,
  Log,
  ZeroExSignedFillOrder,
} from './types';
import { constants } from './constants';
import { BigNumber } from './bignumber';
import {
  bufferArrayToHex,
  concatBytes,
  numBytesFromBuffer,
  numBytesFromHex,
  paddedBufferForBigNumber,
  paddedBufferForPrimitive,
  stringToBytes,
} from './encoding';
import {
  assertLogEquivalence,
  getLogsFromTxHash
} from './logs';
import {
  generateExchangeOrderHeader,
  generateTimestamp,
  generateSalt,
  generateSerializedOrders,
  hashOrderHex,
} from './orders';
import {
  hashPriceFeedHex
} from './oracle';
import {
  generateRebalancingSetTokenCallData
} from './rebalancing';
import {
  convertSigToHex,
  parseSignatureHexAsRSV,
  signMessage,
} from './signing';
import { kyberTradesToBytes } from './kyber';
import {
  encodeAddressAsAssetData,
  extractAddressFromAssetData,
  generateZeroExExchangeWrapperOrder,
  generateZeroExOrder,
  generateZeroExSignedFillOrder,
  signZeroExOrderAsync,
  zeroExOrderToBuffer,
  zeroExSignedFillOrderToBuffer,
} from './zeroEx';
import {
  isZeroExOrder,
  isTakerWalletOrder,
  isKyberTrade,
} from './typeGuards';
import {
  Web3Utils,
} from './Web3Utils';
import {
  BN,
} from './bn';

export { BigNumber };
export { BN };
export { Web3Utils };
export {
  Address,
  Bytes,
  Constants,
  ECSig,
  ExchangeIssueParams,
  ExchangeRedemptionParams,
  ExchangeOrder,
  Exchanges,
  IssuanceOrder,
  KyberTrade,
  Log,
  SignedIssuanceOrder,
  SolidityTypes,
  TakerWalletOrder,
  UInt,
  ZeroExSignedFillOrder,
} from './types';

/**
 * The Utils class is an entry-point into the set-protocols-util.js library for reusable utility
 * methods that pertain to encoding, order generation, signing, etc.
 */
export class SetProtocolUtils {
  private web3: Web3;

  /**
   * Exposing commonly used non-mapping constants. Mapppings are defined separately,
   * see EXCHANGES and REBALANCING_STATE for examples. Constants that only apply to
   * development environments are defined as part of SetProtocolTestUtils
   */
  public static CONSTANTS = constants;

  /**
   * Enumeration of accepted exchange wrapper ids used as part of Exchange headers
   * { ZERO_EX: 1, KYBER: 2, TAKER_WALLET: 3 }
   */
  public static EXCHANGES = constants.EXCHANGES;

  /**
   * Enumeration of states of rebalancing token
   * { DEFAULT: 0, PROPOSAL: 1, REBALANCE: 2 }
   */
  public static REBALANCING_STATE = constants.REBALANCING_STATE;

  /* ============ Static SetProtocolUtils Functions ============ */

  /**
   * Generates a pseudo-random 256-bit salt
   *
   * @return  A pseudo-random 256-bit number that can be used as a salt
   */
  public static generateSalt(): BigNumber {
    return generateSalt();
  }

  /**
   * Function for clarifying the additional call data parameters that need to be sent to Core when creating
   * a new rebalancing set token
   *
   * @param  managerAddress      Address of the manager to manage the rebalancing
   * @param  proposalPeriod      Time the participants of the Set can withdraw from a rebalance
   *                               once a new Set has been proposed
   * @param  rebalanceInterval   Time between when the manager can initiate another rebalance
   * @return                     String representing call data to send to Core contracts
   */
  public static generateRebalancingSetTokenCallData(
    managerAddress: Address,
    proposalPeriod: BigNumber,
    rebalanceInterval: BigNumber,
  ): string {
    return generateRebalancingSetTokenCallData(
      managerAddress,
      proposalPeriod,
      rebalanceInterval,
    );
  }

  /**
   * Generates an EIP712 compatible issuance order hash
   *
   * @param   order   An object adhering to the IssuanceOrder interface
   * @return  Hash of Issuance Order represented as hex string
   */
  public static hashOrderHex(order: IssuanceOrder): string {
    return hashOrderHex(order);
  }

  /**
   * Generates hash for price feed update
   *
   * @param   price        Price feed update
   * @param   timestamp    Timestamp for price feed update in unix time
   * @param   identifier   Salt identifying the trading pair of the price feed
   * @return  Hash of price feed update as hex string
   */
  public static hashPriceFeedHex(price: BigNumber, timestamp: BigNumber, identifier: string = 'ETHUSD'): string {
    return hashPriceFeedHex(price, timestamp, identifier);
  }

  /**
   * Gets the length of a buffer's contents
   *
   * @param   buffer   A buffer of arbitray length
   * @return  Number of bytes in hex representation of the buffer
   */
  public static numBytesFromBuffer(buffer: Buffer[]): BigNumber {
    return numBytesFromBuffer(buffer);
  }

  /**
   * Gets the length of a hex string
   *
   * @param   hex   Hex string
   * @return  Number of bytes in hex representation of the hex
   */
  public static numBytesFromHex(hex: string): BigNumber {
    return numBytesFromHex(hex);
  }

  /**
   * Generates a buffer for a primitive value padded to 32 bytes. Use for encoding addresses (string),
   * enum, etc. Use paddedBufferForBigNumber for token amounts that need to be expressed in high numbers
   *
   * @param   value   Any primitive value (string, number) to encode
   * @return  Primitive value represented as Buffer
   */
  public static paddedBufferForPrimitive(value: any): Buffer {
    return paddedBufferForPrimitive(value);
  }

  /**
   * Generates a buffer for a BigNumber padded to 32 bytes
   *
   * Used by various
   *
   * @param   number   BigNumber to encode
   * @return  BigNumber value represented as Buffer
   */
  public static paddedBufferForBigNumber(number: BigNumber): Buffer {
    return paddedBufferForBigNumber(number);
  }

  /**
   * Parses a signature and returns its elliptic curve signature
   *
   * Used by setProtocol.js in SignatureUtils
   *
   * @param   signature   Hex signature to parse
   * @return  An object containing the Elliptic curve signature parameters
   */
  public static parseSignatureHexAsRSV(signature: string): any {
    return parseSignatureHexAsRSV(signature);
  }

  /**
   * Returns the hex string representation of a string padded with '0x'
   *
   * Used by setProtocol.js in various wrappers to convert string to bytes to match transaction parameter type
   *
   * @param   input   A string primitive
   * @return  Hex of the string which can be used as a bytes32 transaction parameter
   */
  public static stringToBytes(input: string): Bytes {
    return stringToBytes(input);
  }

  /**
   * Determines if a liquidity source is a KyberTrade
   *
   * Used by setProtocol.js OrderAssertions
   *
   * @param   trade   A liquiduity fill source object
   * @return  Boolean for whether or not fill order is a KyberTrade
   */
  public static isKyberTrade(trade: ExchangeOrder): boolean {
    return isKyberTrade(trade);
  }

  /**
   * Determines if an order is a ZeroExSignedFillOrder
   *
   * Used by setProtocol.js OrderAssertions
   *
   * @param   order   A liquiduity fill source object
   * @return  Boolean for whether or not fill order is a ZeroExOrder
   */
  public static isZeroExOrder(order: ExchangeOrder): boolean {
    return isZeroExOrder(order);
  }

  /**
   * Determines if an order is a TakerWalletOrder
   *
   * Used by setProtocol.js OrderAssertions
   *
   * @param   order   A liquiduity fill source object
   * @return  Boolean for whether or not fill order is a TakerWalletOrder
   */
  public static isTakerWalletOrder(order: ExchangeOrder): boolean {
    return isTakerWalletOrder(order);
  }

  /**
   * Encodes a ERC20 token address into a 0x ERC20 token asset data
   *
   * @param   tokenAddress   The ERC20 address to encode
   * @return  A string representing the encoded ERC20 asset details
   */
  public static encodeAddressAsAssetData(tokenAddress: Address): string {
    return encodeAddressAsAssetData(tokenAddress);
  }

  /**
   * Decodes the ERC20 token asset data to get the original address
   *
   * Used by setProtocol.js OrderAssertions
   *
   * @param   assetData   A string representing the encoded ERC20 asset details
   * @return  Original token address after decoding
   */
  public static extractAddressFromAssetData(assetData: string): string {
    return extractAddressFromAssetData(assetData);
  }

  /**
   * Initialize a Utils class
   *
   * @param web3   Web3 instance to use
   */
  public constructor(web3?: Web3) {
    this.web3 = web3 || new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  }

  /* ============ Non-Static SetProtocolUtils Functions ============ */

  /**
   * Generates a byte string representing serialized exchange orders across different exchanges
   *
   * For 0x orders, it sums the fillAmounts of all 0x order and uses the total as the makerTokenAmount
   * in the exchange header that goes in front of all 0x orders
   *
   * For Kyber trades,it sums the sourceTokenAmount all each kyber trades and uses the total as the makerTokenAmount
   * in the exchange header that goes in front of all Kyber trades
   *
   * @param  orders              Array of orders from various exchanges
   * @return                     Buffer with all exchange orders formatted and concatenated
   */
  public generateSerializedOrders(orders: ExchangeOrder[]): Bytes {
    return generateSerializedOrders(orders);
  }

  /**
   * Generates a ZeroExSignedFillOrder with signature that can be passed
   * into generateSerializedOrders to generate valid exchange orders data
   * Caller passes in the fillAmount
   *
   * @param   senderAddress           Address calling 0x Exchange contract
   * @param   makerAddress            Maker asset owner
   * @param   takerAddress            Taker assert owner
   * @param   makerFee                Fee accrused to maker
   * @param   takerFee                Fee accrued to taker
   * @param   makerAssetAmount        Amount of asset to exchange
   * @param   takerAssetAmount        Amount of asset to exchange for
   * @param   makerTokenAddress       Address of asset to exchange
   * @param   takerTokenAddress       Address of asset to exchange for
   * @param   salt                    Pseudo-random number acting as a salt
   * @param   exchangeAddress         0x Exchange contract address
   * @param   feeRecipientAddress     Address to send fee
   * @param   expirationTimeSeconds   Order expiration in unix timestamp
   * @param   fillAmount              The amount of the 0x order to fill
   * @return  Object conforming to ZeroExSignedFillOrder inteface
   */
  public async generateZeroExSignedFillOrder(
    senderAddress: Address,
    makerAddress: Address,
    takerAddress: Address,
    makerFee: BigNumber,
    takerFee: BigNumber,
    makerAssetAmount: BigNumber,
    takerAssetAmount: BigNumber,
    makerTokenAddress: Address,
    takerTokenAddress: Address,
    salt: BigNumber,
    exchangeAddress: Address,
    feeRecipientAddress: Address,
    expirationTimeSeconds: BigNumber,
    fillAmount: BigNumber,
  ): Promise<ZeroExSignedFillOrder> {
    return generateZeroExSignedFillOrder(
      senderAddress,
      makerAddress,
      takerAddress,
      makerFee,
      takerFee,
      makerAssetAmount,
      takerAssetAmount,
      makerTokenAddress,
      takerTokenAddress,
      salt,
      exchangeAddress,
      feeRecipientAddress,
      expirationTimeSeconds,
      fillAmount,
      this.web3,
    );
  }

  /**
   * Signs a message and returns it's elliptic curve signature
   *
   * @param   message   Data to sign
   * @param   address   Address to sign with
   * @return  An object containing the Elliptic curve signature parameters
   */
  public async signMessage(message: string, address: Address, addPrefix: boolean = false): Promise<ECSig> {
    return signMessage(this.web3, message, address, addPrefix);
  }

  /**
   * Convert an EC Signature into hex format
   *
   * @param   ecSig   EC Signature object
   * @return  Hex string representation of an ECDSA signature
   */
  public convertSigToHex(ecSig: ECSig): string {
    return convertSigToHex(ecSig);
  }

  /**
   * Adds correct signature '0x' and signs 0x order
   *
   * @param   order   Object conforming to 0x's Order inteface
   * @return  Hex string representation of 0x 0rder signature
   */
  public async signZeroExOrderAsync(order: Order): Promise<string> {
    return signZeroExOrderAsync(order, this.web3);
  }
}


/**
 * The TestUtils class is an entry-point into the set-protocols-util.js library for reusable utility
 * methods that pertain to testing
 */
export class SetProtocolTestUtils {
  private web3: Web3;

  /* ============ SetProtocolTestUtils Constants  ============ */

  /**
   * Address of deployed KyberNetworkProxy contract on test rpc, loaded from snapshot
   */
  public static KYBER_NETWORK_PROXY_ADDRESS = constants.KYBER_NETWORK_PROXY_ADDRESS;

  /**
   * Address of deployed token to use in Kyber swap on test rpc, loaded from snapshot on account[3]
   */
  public static KYBER_RESERVE_SOURCE_TOKEN_ADDRESS = constants.KYBER_RESERVE_SOURCE_TOKEN_ADDRESS;

  /**
   * Address of deployed token to receive in Kyber swap on test rpc, loaded from snapshot
   */
  public static KYBER_RESERVE_DESTINATION_TOKEN_ADDRESS = constants.KYBER_RESERVE_DESTINATION_TOKEN_ADDRESS;

  /**
   * Address of deployed 0x exchange address contract on test rpc, loaded from snapshot
   */
  public static ZERO_EX_EXCHANGE_ADDRESS = constants.ZERO_EX_SNAPSHOT_EXCHANGE_ADDRESS;

  /**
   * Address of deployed 0x erc20 proxy contract on test rpc, loaded from snapshot
   */
  public static ZERO_EX_ERC20_PROXY_ADDRESS = constants.ZERO_EX_SNAPSHOT_ERC20_PROXY_ADDRESS;

  /**
   * Address of deployed 0x token on test rpc, loaded from snapshot
   */
  public static ZERO_EX_TOKEN_ADDRESS = constants.ZERO_EX_TOKEN_ADDRESS;

  /* ============ Static SetProtocolTestUtils Functions ============ */

  /**
   * Asserts that an array of logs is a subject of all of another set of logs, usually
   * all the logs of a particular transaction
   *
   * @param   actual     Formatted logs retrieved via the txHash. See getLogsFromTxHash
   * @param   expected   A manually generated array of logs for a particular transaction
   */
  public static assertLogEquivalence(actual: Log[], expected: Log[]) {
    assertLogEquivalence(actual, expected);
  }

  /* ============ Non-Static SetProtocolTestUtils Functions ============ */

  /**
   * Converts an array of Buffers into Hex
   *
   * @param   bufferArray   Array of buffers
   * @return  Hex of array of buffers represented as Bytes (string)
   */
  public static bufferArrayToHex(bufferArray: Buffer[]): Bytes {
    return bufferArrayToHex(bufferArray);
  }

  /**
   * Converts an array of Bytes (each prefixed 0x) into one byte array
   *
   * @param   bytes   Array of byte strings
   * @return  A single byte string representing the array of bytes
   */
  public static concatBytes(bytes: Bytes[]): Bytes {
    return concatBytes(bytes);
  }

  /**
   * Generates an exchange order header represented as a buffer array.
   *
   * @param  exchangeId            Enum corresponding to exchange id, see constants.EXCHANGES
   * @param  orderCount            Number of exchange orders
   * @param  makerTokenAmount      Amount of tokens the maker is willing to pay
   * @param  totalOrderBodyLength  Length of order data buffer
   * @return                       Array containing all inputs as buffers
   */
  public static generateExchangeOrderHeader(
    exchangeName: string,
    orderCount: number,
    makerTokenAmount: BigNumber,
    totalOrderBodyLength: number,
  ): Buffer[] {
    return generateExchangeOrderHeader(exchangeName, orderCount, makerTokenAmount, totalOrderBodyLength);
  }

  /**
   * Generates expiration timestamp that can be used as part of IssuanceOrder
   *
   * @param   minutes   Number of minutes from now
   * @return  Expiration timestamp represented as BigNumber
   */
  public static generateTimestamp(minutes: number): BigNumber {
    return generateTimestamp(minutes);
  }

  /**
   * Generates a byte array with a valid 0x order that can be passed into ZeroExExchangeWrapper
   *
   * @param   order       Object conforming to 0x's Order inteface
   * @param   signature   Elliptic curve signature as hex string
   * @param   fillAmount  Amount of 0x order to fill
   * @return  Hex string representation of valid 0xExchangeWrapper order
   */
  public static generateZeroExExchangeWrapperOrder(order: Order, signature: Bytes, fillAmount: BigNumber): Bytes {
    return generateZeroExExchangeWrapperOrder(order, signature, fillAmount);
  }

  /**
   * Generates a 0x order. Use if exclusively generating the 0x order body. If generating
   * IssuanceOrder zeroExExchange Order interfaces, use generateZeroExSignedFillOrder
   *
   * @param   senderAddress           Address calling 0x Exchange contract
   * @param   makerAddress            Maker asset owner
   * @param   takerAddress            Taker assert owner
   * @param   makerFee                Fee accrused to maker
   * @param   takerFee                Fee accrued to taker
   * @param   makerAssetAmount        Amount of asset to exchange
   * @param   takerAssetAmount        Amount of asset to exchange for
   * @param   makerTokenAddress       Address of asset to exchange
   * @param   takerTokenAddress       Address of asset to exchange for
   * @param   salt                    Pseudo-random number acting as a salt
   * @param   exchangeAddress         0x Exchange contract address
   * @param   feeRecipientAddress     Address to send fee
   * @param   expirationTimeSeconds   Order expiration in unix timestamp
   * @return  Object conforming to 0x's Order inteface
   */
  public static generateZeroExOrder(
    senderAddress: Address,
    makerAddress: Address,
    takerAddress: Address,
    makerFee: BigNumber,
    takerFee: BigNumber,
    makerAssetAmount: BigNumber,
    takerAssetAmount: BigNumber,
    makerTokenAddress: Address,
    takerTokenAddress: Address,
    salt: BigNumber,
    exchangeAddress: Address,
    feeRecipientAddress: Address,
    expirationTimeSeconds: BigNumber
  ): Order {
    return generateZeroExOrder(
      senderAddress,
      makerAddress,
      takerAddress,
      makerFee,
      takerFee,
      makerAssetAmount,
      takerAssetAmount,
      makerTokenAddress,
      takerTokenAddress,
      salt,
      exchangeAddress,
      feeRecipientAddress,
      expirationTimeSeconds,
    );
  }

  /**
   * Generates a hex string representing a single Kyber trade without the exchange header. Used for testing
   * KyberNetworkWrapper directly. For issuance order testing flows, use generateSerializedOrders which
   * includes the exchange header that core uses for dispatching the buffer to the correct wrapper
   *
   * @param  trade         An object conforming to KyberTrade to transform into buffer
   * @return               Hex string for single Kyber trade
   */
  public static kyberTradeToBytes(trade: KyberTrade): Bytes {
    return kyberTradesToBytes(trade);
  }

  /**
   * Converts a 0x order into binary representation, often to get byte count
   *
   * @param   order   Object conforming to 0x's Order inteface
   * @return  Array of buffers representing the order
   */
  public static zeroExOrderToBuffer(order: Order): Buffer[] {
    return zeroExOrderToBuffer(order);
  }

  /**
   * Generates a buffer with a valid 0x order that can be passed into ZeroExExchangeWrapper. Used to generate the
   * orders data separately from the header to test invalid values.
   *
   * @param   orders       ZeroExSignedFillOrder objects
   * @return  Buffer representation of valid 0xExchangeWrapper order
   */
  public static zeroExSignedFillOrderToBuffer(order: ZeroExSignedFillOrder): Buffer[] {
    return zeroExSignedFillOrderToBuffer(order, order.signature, order.fillAmount);
  }

  /**
   * Initialize a TestUtils class
   * @param web3   Web3 instance to use
   */
  public constructor(web3?: Web3) {
    this.web3 = web3 || new Web3();
  }

  /**
   * Retrieves readable logs from a transaction hash
   *
   * @param   txHash   Transaction hash to retrieve logs from
   * @return  Array of logs presented as Log
   */
  public async getLogsFromTxHash(txHash: string): Promise<Log[]> {
    return getLogsFromTxHash(this.web3, txHash);
  }
}
