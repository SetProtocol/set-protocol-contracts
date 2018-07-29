import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { SetProtocolUtils }  from 'set-protocol-utils';

import ChaiSetup from '../../../../utils/chaiSetup';
import { BigNumberSetup } from '../../../../utils/bigNumberSetup';
import { ZeroExOrderDataHandlerMockContract } from '../../../../utils/contracts';
import {
  bufferZeroExOrder,
  createZeroExOrder,
  generateStandardZeroExOrderBytesArray,
  generateERC20TokenAssetData
} from '../../../../utils/zeroExExchangeWrapper';
import { expectRevertError } from '../../../../utils/tokenAssertions';
import { Bytes32, Bytes } from '../../../../types/common.js';
import { ZeroExOrder } from '../../../../types/zeroEx';
import { LibraryMockWrapper } from '../../../../utils/libraryMockWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;


contract('ZeroExOrderDataHandlerMock', accounts => {
  const [
    ownerAccount,
    takerAddress,
    feeRecipientAddress,
    senderAddress,
    makerTokenAddress,
    takerTokenAddress,
  ] = accounts;

  const libraryMockWrapper: LibraryMockWrapper = new LibraryMockWrapper(ownerAccount);
  let zeroExExchangeWrapper: ZeroExOrderDataHandlerMockContract;

  // Signature
  const signature: Bytes = '0x0012034334393842';

  // 0x Order Subject Data
  const fillAmount = new BigNumber(5);

  const makerAssetAmount = new BigNumber(1);
  const takerAssetAmount = new BigNumber(2);
  const makerFee = new BigNumber(3);
  const takerFee = new BigNumber(4);
  const expirationTimeSeconds = new BigNumber(5);
  const salt = new BigNumber(6);

  const makerAssetData = generateERC20TokenAssetData(makerTokenAddress);
  const takerAssetData = generateERC20TokenAssetData(takerTokenAddress);

  const zeroExOrder: ZeroExOrder = createZeroExOrder(
    ownerAccount,
    takerAddress,
    feeRecipientAddress,
    senderAddress,
    makerAssetAmount,
    takerAssetAmount,
    makerFee,
    takerFee,
    expirationTimeSeconds,
    salt,
    makerAssetData,
    takerAssetData,
  );

  beforeEach(async () => {
    zeroExExchangeWrapper = await libraryMockWrapper.deployZeroExOrderDataHandlerLibraryAsync();
  });

  describe('#parseOrderDataHeader', async () => {
    // Header Subject Data
    let signatureLength: BigNumber;
    let zeroExOrderLength: BigNumber;
    let makerAssetDataLength: BigNumber;
    let takerAssetDataLength: BigNumber;

    let subjectOrderData: Bytes32;

    beforeEach(async () => {
      subjectOrderData = generateStandardZeroExOrderBytesArray(
        zeroExOrder,
        signature,
        fillAmount,
      );

      const zeroExOrderBuffer = bufferZeroExOrder(zeroExOrder);
      zeroExOrderLength = SetProtocolUtils.numBytesFromBuffer(zeroExOrderBuffer);

      signatureLength = SetProtocolUtils.numBytesFromHex(signature);
      makerAssetDataLength = SetProtocolUtils.numBytesFromHex(makerAssetData);
      takerAssetDataLength = SetProtocolUtils.numBytesFromHex(takerAssetData);
    });

    async function subject(): Promise<any> {
      return zeroExExchangeWrapper.parseOrderDataHeader.callAsync(subjectOrderData);
    }

    it('should correctly parse the order data header', async () => {
      const [sigLen, zeroExOrderLen, makerAssetDataLen, takerAssetDataLen ] = await subject();

      expect(sigLen).to.bignumber.equal(signatureLength);
      expect(zeroExOrderLen).to.bignumber.equal(zeroExOrderLength);
      expect(makerAssetDataLen).to.bignumber.equal(makerAssetDataLength);
      expect(takerAssetDataLen).to.bignumber.equal(takerAssetDataLength);
    });
  });

  describe('#parseFillAmount', async () => {
    let subjectOrderData: Bytes32;

    beforeEach(async () => {
      subjectOrderData = generateStandardZeroExOrderBytesArray(
        zeroExOrder,
        signature,
        fillAmount,
      );
    });

    async function subject(): Promise<any> {
      return zeroExExchangeWrapper.parseFillAmount.callAsync(subjectOrderData);
    }

    it('correctly parse the fill amount', async () => {
      const fillAmountResult = await subject();
      expect(fillAmountResult).to.be.bignumber.equal(fillAmount);
    });
  });

  describe('#parseSignature', async () => {
    let subjectOrderData: Bytes32;

    beforeEach(async () => {
      subjectOrderData = generateStandardZeroExOrderBytesArray(
        zeroExOrder,
        signature,
        fillAmount,
      );
    });

    async function subject(): Promise<any> {
      return zeroExExchangeWrapper.parseSignature.callAsync(subjectOrderData);
    }

    it('should correctly parse the signature', async () => {
      const signatureResult = await subject();
      expect(signatureResult).to.equal(signature);
    });
  });

  describe('#parseZeroExOrderData', async () => {
    let subjectOrderData: Bytes32;

    beforeEach(async () => {
      subjectOrderData = generateStandardZeroExOrderBytesArray(
        zeroExOrder,
        signature,
        fillAmount,
      );
    });

    async function subject(): Promise<any> {
      return zeroExExchangeWrapper.parseZeroExOrderData.callAsync(subjectOrderData);
    }

    it('should correctly parse the zeroEx order', async () => {
      const [addresses, uints, makerAssetDataResult, takerAssetDataResult] = await subject();

      const [makerResult, takerResult, feeRecipientResult, senderResult] = addresses;
      const [
        makerAssetAmountResult,
        takerAssetAmountResult,
        makerFeeResult,
        takerFeeResult,
        expirationResult,
        saltResult,
      ] = uints;

      expect(ownerAccount).to.equal(makerResult);
      expect(takerAddress).to.equal(takerResult);
      expect(feeRecipientAddress).to.equal(feeRecipientResult);
      expect(senderAddress).to.equal(senderResult);
      expect(makerAssetAmount).to.be.bignumber.equal(makerAssetAmountResult);
      expect(takerAssetAmount).to.be.bignumber.equal(takerAssetAmountResult);
      expect(makerFee).to.be.bignumber.equal(makerFeeResult);
      expect(takerFee).to.be.bignumber.equal(takerFeeResult);
      expect(expirationTimeSeconds).to.be.bignumber.equal(expirationResult);
      expect(salt).to.be.bignumber.equal(saltResult);
      expect(makerAssetData).to.equal(makerAssetDataResult);
      expect(takerAssetData).to.equal(takerAssetDataResult);
    });
  });

  describe('#parseERC20TokenAddress', async () => {
    let subjectAssetData: Bytes32;

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

    describe('when the asset type for the token is not ERC20', async () => {
      beforeEach(async () => {
        subjectAssetData = '0xInvalidAssetSelector';
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
