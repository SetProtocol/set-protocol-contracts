require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { ExchangeHeaderLibraryMockContract, StandardTokenMockContract } from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';
import { BigNumber } from 'bignumber.js';

import { ExchangeHeaderLibrary } from 'artifacts/ts/ExchangeHeaderLibrary';
import { LibraryMockWrapper } from '@utils/wrappers/libraryMockWrapper';

import * as setProtocolUtils from 'set-protocol-utils';
import { ether } from '@utils/units';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';

import { generateSerializedRedemptionOrders } from 'test/src/orders';
import { KyberTrade, Address } from 'test/src';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);
const Core = artifacts.require('Core');

const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;

const setTestUtils = new SetTestUtils(web3);
const setUtils = new SetUtils(web3);
const { NULL_ADDRESS, ZERO } = SetUtils.CONSTANTS;

contract('ExchangeHeaderLibrary', accounts => {
  const [
    ownerAccount
  ] = accounts;

  let exchangeHeaderLibrary: ExchangeHeaderLibraryMockContract;

  const exchangeLibraryWrapper = new LibraryMockWrapper(ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);

  before(async () => {
    ABIDecoder.addABI(ExchangeHeaderLibrary.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(ExchangeHeaderLibrary.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync;
  });

  describe('#parseExchangeHeader', async () => {
    const subjectCaller: Address = ownerAccount;

    let parseExchangeHeaderData: string;
    let parseExchangeHeaderOffset: BigNumber;

    let firstToken: StandardTokenMockContract;
    let secondToken: StandardTokenMockContract;

    let subjectExchangeOrdersData: string;

    let zeroExOrder: setProtocolUtils.ZeroExSignedFillOrder;
    let kyberTrade: KyberTrade;

    beforeEach(async () => {
      exchangeHeaderLibrary = await exchangeLibraryWrapper.deployExchangeHeaderLibraryAsync();

      firstToken = await erc20Wrapper.deployTokenAsync(ownerAccount);
      secondToken = await erc20Wrapper.deployTokenAsync(ownerAccount);

      zeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                     // senderAddress
        ownerAccount,                                     // makerAddress
        NULL_ADDRESS,                                     // takerAddress
        ZERO,                                             // makerFee
        ZERO,                                             // takerFee
        ether(20),                                        // makerAssetAmount
        ether(4),                                         // takerAssetAmount
        firstToken.address,                               // makerAssetAddress
        secondToken.address,                              // takerAssetAddress
        SetUtils.generateSalt(),                          // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,            // exchangeAddress
        NULL_ADDRESS,                                     // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),            // expirationTimeSeconds
        ether(1),                                         // amount of zeroExOrder to fill
      );

      kyberTrade = {
        sourceToken: firstToken.address,
        destinationToken: secondToken.address,
        sourceTokenQuantity: ether(4),
        minimumConversionRate: ether(1),
        maxDestinationQuantity: ether(1),
      } as KyberTrade;

      subjectExchangeOrdersData = generateSerializedRedemptionOrders([zeroExOrder, kyberTrade]);

    });

    async function subject(): Promise<any> {
      return exchangeHeaderLibrary.testParseExchangeHeader.callAsync(
        parseExchangeHeaderData,
        parseExchangeHeaderOffset
      );
    }

    afterEach(async () => {
      parseExchangeHeaderData = undefined;
      parseExchangeHeaderOffset = undefined;
    });

    it('should be able to parse')
    
  });

});