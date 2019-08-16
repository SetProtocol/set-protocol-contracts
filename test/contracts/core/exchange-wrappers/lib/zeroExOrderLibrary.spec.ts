require('module-alias/register');

import * as _ from 'lodash';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address, Bytes } from 'set-protocol-utils';
import { assetDataUtils } from '@0xproject/order-utils';
import { BigNumber } from 'bignumber.js';
import { Order as ZeroExOrder } from '@0xproject/types';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { ZeroExOrderLibraryMockContract } from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ether } from '@utils/units';
import { getWeb3 } from '@utils/web3Helper';

import { LibraryMockHelper } from '@utils/helpers/libraryMockHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const blockchain = new Blockchain(web3);


contract('ZeroExOrderLibrary', accounts => {
  const [
    ownerAccount,
    takerAccount,
    feeRecipientAddress,
    senderAccount,
    makerTokenAddress,
    takerTokenAddress,
  ] = accounts;

  const libraryMockHelper: LibraryMockHelper = new LibraryMockHelper(ownerAccount);
  let zeroExExchangeWrapper: ZeroExOrderLibraryMockContract;

  let zeroExOrder: ZeroExOrder;
  let senderAddress: Address;
  let makerAddress: Address;
  let takerAddress: Address;
  let makerFee: BigNumber;
  let takerFee: BigNumber;
  let makerAssetAmount: BigNumber;
  let takerAssetAmount: BigNumber;
  let makerAssetData: Bytes;
  let takerAssetData: Bytes;
  let expirationTimeSeconds: BigNumber;
  let salt: BigNumber;

  let signature: Bytes;
  let fillAmount: BigNumber;

  let zeroExWrapperOrderData: Bytes;

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    zeroExExchangeWrapper = await libraryMockHelper.deployZeroExOrderLibraryAsync();
    zeroExOrder = SetTestUtils.generateZeroExOrder(
      senderAddress || senderAccount,
      makerAddress || ownerAccount,
      takerAddress || takerAccount,
      makerFee || ether(1),
      takerFee || ether(1),
      makerAssetAmount || ether(1),
      takerAssetAmount || ether(1),
      makerTokenAddress,
      takerTokenAddress,
      salt || SetUtils.generateSalt(),
      SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,
      feeRecipientAddress,
      expirationTimeSeconds || SetTestUtils.generateTimestamp(10),
    );

    makerAssetData = assetDataUtils.encodeERC20AssetData(makerTokenAddress);
    takerAssetData = assetDataUtils.encodeERC20AssetData(takerTokenAddress);

    signature = '0x0012034334393842';
    fillAmount = ether(1);

    zeroExWrapperOrderData = SetTestUtils.generateZeroExExchangeWrapperOrder(zeroExOrder, signature, fillAmount);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#parseOrderDataHeader', async () => {
    let subjectZeroExWrapperOrderData: Bytes;
    let subjectOffset: BigNumber;

    beforeEach(async () => {
      subjectZeroExWrapperOrderData = zeroExWrapperOrderData;
      subjectOffset = new BigNumber(0);
    });

    async function subject(): Promise<any> {
      return zeroExExchangeWrapper.parseOrderHeader.callAsync(
        subjectZeroExWrapperOrderData,
        subjectOffset
      );
    }

    it('correctly parses the signature length', async () => {
      const [parsedSignatureLength] = await subject();

      const expectedLength = SetUtils.numBytesFromHex(signature);
      expect(parsedSignatureLength).to.bignumber.equal(expectedLength);
    });

    it('correctly parses the fill amount', async () => {
      const [, parsedFillAmount] = await subject();

      expect(parsedFillAmount).to.bignumber.equal(fillAmount);
    });
  });

  describe('#parseZeroExOrderData', async () => {
    let subjectZeroExWrapperOrderData: Bytes;
    let subjectOffset: BigNumber;

    before(async () => {
      senderAddress = senderAccount;
      makerAddress = ownerAccount;
      takerAddress = takerAccount;
      makerFee = ether(1);
      takerFee = ether(1);
      makerAssetAmount = ether(1);
      takerAssetAmount = ether(1);
      expirationTimeSeconds = SetTestUtils.generateTimestamp(10);
      salt = SetUtils.generateSalt();
    });

    beforeEach(async () => {
      subjectZeroExWrapperOrderData = zeroExWrapperOrderData;
      subjectOffset = new BigNumber(0);
    });

    async function subject(): Promise<any> {
      return zeroExExchangeWrapper.parseZeroExOrder.callAsync(
        subjectZeroExWrapperOrderData,
        subjectOffset
      );
    }

    it('should correctly parse the maker address', async () => {
      const [addresses] = await subject();
      const [parsedMakerAddress] = addresses;

      expect(parsedMakerAddress).to.equal(makerAddress);
    });

    it('should correctly parse the taker address', async () => {
      const [addresses] = await subject();
      const [, parsedTakerAddress] = addresses;

      expect(parsedTakerAddress).to.equal(takerAddress);
    });

    it('should correctly parse the fee recipient address', async () => {
      const [addresses] = await subject();
      const [, , parsedFeeRecipientAddress] = addresses;

      expect(parsedFeeRecipientAddress).to.equal(feeRecipientAddress);
    });

    it('should correctly parse the sender address', async () => {
      const [addresses] = await subject();
      const [, , , parsedSenderAddress] = addresses;

      expect(parsedSenderAddress).to.equal(senderAddress);
    });

    it('should correctly parse the maker asset amount', async () => {
      const [, uints] = await subject();
      const [parsedMakerAssetAmount] = uints;

      expect(parsedMakerAssetAmount).to.be.bignumber.equal(makerAssetAmount);
    });

    it('should correctly parse the taker asset amount', async () => {
      const [, uints] = await subject();
      const [, parsedTakerAssetAmount] = uints;

      expect(parsedTakerAssetAmount).to.be.bignumber.equal(takerAssetAmount);
    });

    it('should correctly parse the maker fee', async () => {
      const [, uints] = await subject();
      const [, , parsedMakerFee] = uints;

      expect(parsedMakerFee).to.be.bignumber.equal(makerFee);
    });

    it('should correctly parse the taker fee', async () => {
      const [, uints] = await subject();
      const [, , , parsedTakerFee] = uints;

      expect(parsedTakerFee).to.be.bignumber.equal(takerFee);
    });

    it('should correctly parse the expiration time', async () => {
      const [, uints] = await subject();
      const [, , , , parsedExpirationTime] = uints;

      expect(parsedExpirationTime).to.be.bignumber.equal(expirationTimeSeconds);
    });

    it('should correctly parse the salt', async () => {
      const [, uints] = await subject();
      const [, , , , , parsedSalt] = uints;

      expect(parsedSalt).to.be.bignumber.equal(salt);
    });

    it('should correctly parse the maker asset data', async () => {
      const [, , parsedMakerAssetData] = await subject();

      expect(parsedMakerAssetData).to.equal(makerAssetData);
    });

    it('should correctly parse the taker asset data', async () => {
      const [, , , parsedTakerAssetData] = await subject();

      expect(parsedTakerAssetData).to.equal(takerAssetData);
    });
  });
});
