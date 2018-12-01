require('module-alias/register');

import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import { SignatureValidatorContract } from '@utils/contracts';
import { generateFillOrderParameters } from '@utils/orders';
import { Blockchain } from '@utils/blockchain';
import { ether } from '@utils/units';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { expectRevertError, expectNoRevertError } from '@utils/tokenAssertions';
import ChaiSetup from '@utils/chaiSetup';
import { getWeb3 } from '@utils/web3Helper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const blockchain = new Blockchain(web3);


contract('SignatureValidator', accounts => {
  const [
    ownerAccount,
    makerAccount,
    takerAccount,
    signerAccount,
    relayerAccount,
    mockTokenAccount,
    mockTokenAccount2,
    mockSetTokenAccount,
  ] = accounts;

  let signatureValidator: SignatureValidatorContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    signatureValidator = await coreWrapper.deploySignatureValidatorAsync();
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
    let subjectSignature: string;

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

      subjectSignature = issuanceOrderParams.signature;
    });

    async function subject(): Promise<void> {
      return signatureValidator.validateSignature.callAsync(
        issuanceOrderParams.orderHash,
        subjectMaker,
        subjectSignature,
        { from: subjectCaller },
      );
    }

    it('should not revert', async () => {
      await expectNoRevertError(subject());
    });

    describe('when the signature length is not 65', async () => {
      beforeEach(async () => {
        subjectMaker = makerAccount;
        subjectSignature = subjectSignature + '00';
      });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
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
});
