import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';

import { Address } from '../../../types/common.js';
import { OrderLibraryMockContract } from '../../../utils/contracts';
import { CoreWrapper } from '../../../utils/coreWrapper';
import { generateFillOrderParameters } from '../../../utils/orders';
import { ether } from '../../../utils/units';

import { BigNumberSetup } from '../../../utils/bigNumberSetup';
import ChaiSetup from '../../../utils/chaiSetup';
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;


contract('OrderLibrary', accounts => {
  const [
    ownerAccount,
    takerAccount,
    makerAccount,
    signerAccount,
    relayerAccount,
    mockSetTokenAccount,
    mockTokenAccount,
    mockTokenAccount2,
  ] = accounts;

  let orderLib: OrderLibraryMockContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);

  beforeEach(async () => {
    orderLib = await coreWrapper.deployMockOrderLibAsync();
  });

  describe('#validateSignature', async () => {
    let subjectCaller: Address;
    let subjectMaker: Address;
    let signerAddress: Address;
    let relayerAddress: Address;
    let orderQuantity: BigNumber;
    let makerTokenAmount: BigNumber;
    let requiredComponents: Address[];
    let requiredComponentAmounts: BigNumber[];
    let timeToExpiration: number;
    let issuanceOrderParams: any;

    beforeEach(async () => {
      subjectCaller = takerAccount;
      subjectMaker = signerAccount;

      signerAddress = signerAccount;
      relayerAddress = relayerAccount;
      orderQuantity = ether(4);
      makerTokenAmount = ether(10);
      timeToExpiration = 10;
      requiredComponents = [mockTokenAccount, mockTokenAccount2];
      requiredComponentAmounts = [ether(2), ether(2)];

      issuanceOrderParams = await generateFillOrderParameters(
        mockSetTokenAccount,
        signerAddress,
        signerAddress,
        requiredComponents,
        requiredComponentAmounts,
        mockTokenAccount,
        relayerAddress,
        mockTokenAccount2,
        orderQuantity,
        makerTokenAmount,
        timeToExpiration,
      );
    });

    async function subject(): Promise<boolean> {
      return orderLib.testValidateSignature.callAsync(
        issuanceOrderParams.orderHash,
        subjectMaker,
        issuanceOrderParams.signature.v,
        issuanceOrderParams.signature.r,
        issuanceOrderParams.signature.s,
        { from: subjectCaller },
      );
    }

    it('should return true', async () => {
      const validSig = await subject();

      expect(validSig).to.equal(true);
    });
    describe('when the message is not signed by the maker', async () => {
      beforeEach(async () => {
        subjectMaker = makerAccount;
      });

      it('should return false', async () => {
        const validSig = await subject();

        expect(validSig).to.equal(false);
      });
    });
  });
  describe('#generateOrderHash', async () => {
    let subjectCaller: Address;

    let signerAddress: Address;
    let relayerAddress: Address;
    let orderQuantity: BigNumber;
    let makerTokenAmount: BigNumber;
    let requiredComponents: Address[];
    let requiredComponentAmounts: BigNumber[];
    let timeToExpiration: number;
    let issuanceOrderParams: any;

    beforeEach(async () => {
      subjectCaller = takerAccount;

      signerAddress = signerAccount;
      relayerAddress = relayerAccount;
      orderQuantity = ether(4);
      makerTokenAmount = ether(10);
      timeToExpiration = 10;
      requiredComponents = [mockTokenAccount, mockTokenAccount2];
      requiredComponentAmounts = [ether(2), ether(2)];

      issuanceOrderParams = await generateFillOrderParameters(
        mockSetTokenAccount,
        signerAddress,
        signerAddress,
        requiredComponents,
        requiredComponentAmounts,
        mockTokenAccount,
        relayerAddress,
        mockTokenAccount2,
        orderQuantity,
        makerTokenAmount,
        timeToExpiration,
      );
    });

    async function subject(): Promise<string> {
      return orderLib.testGenerateOrderHash.callAsync(
        issuanceOrderParams.addresses,
        issuanceOrderParams.values,
        issuanceOrderParams.requiredComponents,
        issuanceOrderParams.requiredComponentAmounts,
        { from: subjectCaller },
      );
    }

    it('off and on-chain orderHashes should match', async () => {
      const contractOrderHash = await subject();

      expect(contractOrderHash).to.equal(issuanceOrderParams.orderHash);
    });
  });
});
