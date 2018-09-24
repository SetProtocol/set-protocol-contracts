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
import { ZeroExOrderDataHandlerMockContract } from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { LibraryMockWrapper } from '@utils/libraryMockWrapper';
import { Blockchain } from '@utils/blockchain';
import { ether } from '@utils/units';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const blockchain = new Blockchain(web3);


contract('ZeroExOrderDataHandlerMock', accounts => {
  const [
    ownerAccount,
    takerAccount,
    feeRecipientAddress,
    senderAccount,
    makerTokenAddress,
    takerTokenAddress,
  ] = accounts;

  const libraryMockWrapper: LibraryMockWrapper = new LibraryMockWrapper(ownerAccount);
  let zeroExExchangeWrapper: ZeroExOrderDataHandlerMockContract;

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

    zeroExExchangeWrapper = await libraryMockWrapper.deployZeroExOrderDataHandlerLibraryAsync();
    zeroExOrder = SetUtils.generateZeroExOrder(
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
      expirationTimeSeconds || SetUtils.generateTimestamp(10),
    );

    makerAssetData = assetDataUtils.encodeERC20AssetData(makerTokenAddress);
    takerAssetData = assetDataUtils.encodeERC20AssetData(takerTokenAddress);

    signature = '0x0012034334393842';
    fillAmount = ether(1);

    zeroExWrapperOrderData = SetUtils.generateZeroExExchangeWrapperOrder(zeroExOrder, signature, fillAmount);
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

    it('correctly parses the zeroEx order length', async () => {
      const [, parsedOrderLength] = await subject();

      const expectedLength = SetUtils.numBytesFromBuffer(SetUtils.zeroExOrderToBuffer(zeroExOrder));
      expect(parsedOrderLength).to.bignumber.equal(expectedLength);
    });

    it('correctly parses the makerAssetData length', async () => {
      const [, , parsedMakerAssetDataLength] = await subject();

      const expectedLength = SetUtils.numBytesFromHex(makerAssetData);
      expect(parsedMakerAssetDataLength).to.bignumber.equal(expectedLength);
    });

    it('correctly parses the takerAssetData length', async () => {
      const [, , , parsedTakerAssetDataLength] = await subject();

      const expectedLength = SetUtils.numBytesFromHex(takerAssetData);
      expect(parsedTakerAssetDataLength).to.bignumber.equal(expectedLength);
    });

    it('correctly parses the fillAmount', async () => {
      const [, , , , parsedFillAmount] = await subject();

      expect(parsedFillAmount).to.bignumber.equal(fillAmount);
    });
  });

  describe('#parseERC20TokenAddress', async () => {
    let subjectAssetData: Bytes;

    beforeEach(async () => {
      subjectAssetData = makerAssetData;
    });

    async function subject(): Promise<any> {
      return zeroExExchangeWrapper.parseERC20TokenAddress.callAsync(subjectAssetData);
    }

    it('should correctly parse the maker token address', async () => {
      const makerTokenAddressResult = await subject();
      expect(makerTokenAddressResult).to.equal(makerTokenAddress);
    });

    describe('when the encoded asset type is not ERC20', async () => {
      beforeEach(async () => {
        const randomERC721AssetID = new BigNumber(_.random(10));
        subjectAssetData = assetDataUtils.encodeERC721AssetData(makerTokenAddress, randomERC721AssetID);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
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
      expirationTimeSeconds = SetUtils.generateTimestamp(10);
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
