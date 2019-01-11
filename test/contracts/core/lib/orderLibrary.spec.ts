require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address, Bytes, IssuanceOrder } from 'set-protocol-utils';
import * as setProtocolUtils from 'set-protocol-utils';

import {
  CoreContract,
  OrderLibraryMockContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ether } from '@utils/units';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { expectRevertError } from '@utils/tokenAssertions';
import ChaiSetup from '@utils/chaiSetup';
import { getWeb3 } from '@utils/web3Helper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const Core = artifacts.require('Core');
const { expect } = chai;
const blockchain = new Blockchain(web3);

const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const { NULL_ADDRESS, ZERO } = SetUtils.CONSTANTS;

contract('OrderLibrary', accounts => {
  const [
    ownerAccount,
    makerAccount,
    takerAccount,
    relayerAccount,
    mockSetTokenAccount,
    mockMakerTokenAddress,
    mockRelayerTokenAddress,
    mockTokenAccount,
    mockTokenAccount2,
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;
  let orderLib: OrderLibraryMockContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    vault = await coreWrapper.deployVaultAsync();
    transferProxy = await coreWrapper.deployTransferProxyAsync();
    core = await coreWrapper.deployCoreMockAsync(transferProxy, vault);
    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);
    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

    orderLib = await coreWrapper.deployMockOrderLibAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#getEIP712OrderSchemaHash', async () => {
    const expectedEIP712Hash: Bytes = '0x4afd830c587fce611387a38350e760b2d2fb1b2b469a292353fe64b76cb4f3c4';

    async function subject(): Promise<string> {
      return orderLib.testGetEIP712OrderSchemaHash.callAsync();
    }

    it('should return the correct hash', async () => {
      const eip712Hash = await subject();
      expect(eip712Hash).to.equal(expectedEIP712Hash);
    });
  });

  describe('#generateOrderHash', async () => {
    let subjectCaller: Address;
    let subjectIssuanceOrder: IssuanceOrder;

    let orderHash: string;

    beforeEach(async () => {
      const setTokenAddress = mockSetTokenAccount;
      const makerAddress = makerAccount;
      const makerTokenAddress = mockMakerTokenAddress;
      const relayerTokenAddress = mockRelayerTokenAddress;
      const relayerAddress = relayerAccount;
      const orderQuantity = ether(4);
      const makerTokenAmount = ether(10);
      const timeToExpiration = new BigNumber(10);
      const makerRelayerFee = ether(1);
      const takerRelayerFee = ether(2);
      const requiredComponents = [mockTokenAccount, mockTokenAccount2];
      const requiredComponentAmounts = [ether(2), ether(2)];
      const salt = SetUtils.generateSalt();

      subjectIssuanceOrder = {
        setAddress:               setTokenAddress,
        makerAddress:             makerAddress,
        makerToken:               makerTokenAddress,
        relayerAddress:           relayerAddress,
        relayerToken:             relayerTokenAddress,
        quantity:                 orderQuantity,
        makerTokenAmount:         makerTokenAmount,
        expiration:               timeToExpiration,
        makerRelayerFee:          makerRelayerFee,
        takerRelayerFee:          takerRelayerFee,
        requiredComponents:       requiredComponents,
        requiredComponentAmounts: requiredComponentAmounts,
        salt:                     salt,
      } as IssuanceOrder;
      orderHash = SetUtils.hashOrderHex(subjectIssuanceOrder);

      subjectCaller = takerAccount;
    });

    async function subject(): Promise<string> {
      return orderLib.testGenerateOrderHash.callAsync(
        subjectIssuanceOrder,
        { from: subjectCaller },
      );
    }

    it('off and on-chain orderHashes should match', async () => {
      const contractOrderHash = await subject();

      expect(contractOrderHash).to.equal(orderHash);
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

  describe('validateOrder', async () => {
    let naturalUnit: BigNumber;
    let setToken: SetTokenContract;
    let makerToken: StandardTokenMockContract;

    let issuanceOrderSetAddress: Address;
    let issuanceOrderQuantity: BigNumber;
    let issuanceOrderMakerTokenAmount: BigNumber;
    let issuanceOrderRequiredComponents: Address[];
    let issuanceOrderRequiredComponentAmounts: BigNumber[];

    const subjectCaller: Address = ownerAccount;
    let subjectIssuanceOrder: IssuanceOrder;

    beforeEach(async () => {
      const firstComponent = await erc20Wrapper.deployTokenAsync(subjectCaller);
      const secondComponent = await erc20Wrapper.deployTokenAsync(subjectCaller);
      makerToken = await erc20Wrapper.deployTokenAsync(subjectCaller);

      const componentTokens = [firstComponent, secondComponent];
      const setComponentUnit = ether(4);
      const componentAddresses = componentTokens.map(token => token.address);
      const componentUnits = componentTokens.map(token => setComponentUnit);
      naturalUnit = ether(2);
      setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

       // Create issuance order, submitting ether(30) makerToken for ether(4) of the Set with 2 components
      const quantity = issuanceOrderQuantity || ether(4);
      issuanceOrderRequiredComponents =
        issuanceOrderRequiredComponents || [firstComponent.address, secondComponent.address];
      issuanceOrderRequiredComponentAmounts =
        issuanceOrderRequiredComponentAmounts || _.map(componentUnits, unit => unit.mul(quantity).div(naturalUnit));

      // Property:                Value                          | Default                   | Property
      subjectIssuanceOrder = {
        setAddress:               issuanceOrderSetAddress       || setToken.address,        // setAddress
        makerAddress:             subjectCaller,                                            // makerAddress
        makerToken:               makerToken.address,                                       // makerToken
        relayerAddress:           NULL_ADDRESS,                                             // relayerAddress
        relayerToken:             NULL_ADDRESS,                                             // relayerToken
        quantity:                 quantity                      || ether(4),                // quantity
        makerTokenAmount:         issuanceOrderMakerTokenAmount || ether(30),               // makerTokenAmount
        expiration:               SetTestUtils.generateTimestamp(10000),                    // expiration
        makerRelayerFee:          ether(3),                                                 // makerRelayerFee
        takerRelayerFee:          ZERO,                                                     // takerRelayerFee
        requiredComponents:       issuanceOrderRequiredComponents,                          // requiredComponents
        requiredComponentAmounts: issuanceOrderRequiredComponentAmounts,                    // requiredComponentAmounts
        salt:                     SetUtils.generateSalt(),                                  // salt
      } as IssuanceOrder;
    });

    async function subject(): Promise<void> {
      return orderLib.validateOrder.callAsync(
        subjectIssuanceOrder,
        core.address,
        { from: subjectCaller },
      );
    }

    it('should execute properly without reverting', async () => {
      await subject();

      expect(1).to.equal(1);
    });

    describe('when maker token amount is zero', async () => {
      before(async () => {
        issuanceOrderMakerTokenAmount = ZERO;
      });

     after(async () => {
        issuanceOrderMakerTokenAmount = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the set was not created through core', async () => {
      before(async () => {
        issuanceOrderSetAddress = NULL_ADDRESS;
      });

      after(async () => {
        issuanceOrderSetAddress = undefined;
       });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the order quantity is not a multiple of the natural unit of the set', async () => {
      before(async () => {
        issuanceOrderQuantity = ether(3); // naturalUnit = ether(2);
      });

      after(async () => {
        issuanceOrderQuantity = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the order quantity is 0', async () => {
      before(async () => {
        issuanceOrderQuantity = ZERO;
      });

      after(async () => {
        issuanceOrderQuantity = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
