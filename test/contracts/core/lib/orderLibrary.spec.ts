require('module-alias/register');

import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import { OrderLibraryMockContract } from '@utils/contracts';
import { CoreWrapper } from '@utils/coreWrapper';
import { generateFillOrderParameters } from '@utils/orders';
import { Blockchain } from '@utils/blockchain';
import { ether } from '@utils/units';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { expectRevertError } from '@utils/tokenAssertions';
import ChaiSetup from '@utils/chaiSetup';
import { getWeb3 } from '@utils/web3Helper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);


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
    await blockchain.saveSnapshotAsync();

    orderLib = await coreWrapper.deployMockOrderLibAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
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

      const makerRelayerFee = ether(1);
      const takerRelayerFee = ether(2);

      issuanceOrderParams = await generateFillOrderParameters(
        mockSetTokenAccount,
        signerAddress,
        signerAddress,
        requiredComponents,
        requiredComponentAmounts,
        mockTokenAccount,
        relayerAddress,
        mockTokenAccount2,
        makerRelayerFee,
        takerRelayerFee,
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

        it('should revert', async () => {
          await expectRevertError(subject());
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

      const makerRelayerFee = ether(1);
      const takerRelayerFee = ether(2);

      issuanceOrderParams = await generateFillOrderParameters(
        mockSetTokenAccount,
        signerAddress,
        signerAddress,
        requiredComponents,
        requiredComponentAmounts,
        mockTokenAccount,
        relayerAddress,
        mockTokenAccount2,
        makerRelayerFee,
        takerRelayerFee,
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

  describe('getPartialAmount', async () => {
    let subjectPrincipal: BigNumber;
    let subjectNumerator: BigNumber;
    let subjectDenominator: BigNumber;

    beforeEach(async () => {
      subjectPrincipal = new BigNumber(1000);
      subjectNumerator = new BigNumber(400);
      subjectDenominator = new BigNumber(500);
    });

    async function subject(): Promise<BigNumber> {
      return orderLib.getPartialAmount.callAsync(
        subjectPrincipal,
        subjectNumerator,
        subjectDenominator,
      );
    }

    it('calculates the partial amount correctly', async () => {
      const partialAmount = await subject();

      const expectedPartialAmount = subjectPrincipal.mul(subjectNumerator).div(subjectDenominator);
      expect(partialAmount).to.be.bignumber.equal(expectedPartialAmount);
    });

    describe('when there is slippage due to rounding', async () => {
      beforeEach(async () => {
        subjectPrincipal = ether(10);
        subjectNumerator = ether(4);
        subjectDenominator = ether(6);
      });

      it('should revert', async () => {
        const partialAmount = await subject();

        const expectedAmount = new BigNumber('6666666666666666666');
        expect(partialAmount).to.be.bignumber.equal(expectedAmount);
      });

      describe('when the rounding error is too large', async () => {
        beforeEach(async () => {
          subjectPrincipal = new BigNumber(10);
          subjectNumerator = new BigNumber(4);
          subjectDenominator = new BigNumber(6);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });
  });
});
