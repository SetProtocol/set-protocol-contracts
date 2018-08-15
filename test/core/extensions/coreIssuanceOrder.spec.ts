import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as ethUtil from 'ethereumjs-util';
import { BigNumber } from 'bignumber.js';
import { Order as ZeroExOrder } from '@0xproject/types';
import { SetProtocolTestUtils as TestUtils }  from 'set-protocol-utils';
import { SetProtocolUtils as Utils }  from 'set-protocol-utils';
import { Address, Bytes } from 'set-protocol-utils';

import ChaiSetup from '../../../utils/chaiSetup';
import { BigNumberSetup } from '../../../utils/bigNumberSetup';
import {
  CoreContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TakerWalletWrapperContract,
  TransferProxyContract,
  VaultContract
} from '../../../utils/contracts';
import { ether } from '../../../utils/units';
import { assertTokenBalance, expectRevertError } from '../../../utils/tokenAssertions';
import { DEFAULT_GAS, DEPLOYED_TOKEN_QUANTITY, NULL_ADDRESS, ZERO } from '../../../utils/constants';
import { assertLogEquivalence, getFormattedLogsFromTxHash } from '../../../utils/logs';
import { getExpectedFillLog, getExpectedCancelLog } from '../../../utils/contract_logs/coreIssuanceOrder';
import { ExchangeWrapper } from '../../../utils/exchangeWrapper';
import {
  generateFillOrderParameters,
  generateOrdersDataWithIncorrectExchange,
  generateOrdersDataWithTakerOrders
} from '../../../utils/orders';
import { CoreWrapper } from '../../../utils/coreWrapper';
import { ERC20Wrapper } from '../../../utils/erc20Wrapper';

import { injectInTruffle } from 'sol-trace-set';
injectInTruffle(web3, artifacts);

BigNumberSetup.configure();
ChaiSetup.configure();
const utils = new Utils(web3);
const { expect } = chai;
const Core = artifacts.require('Core');
const StandardTokenMock = artifacts.require('StandardTokenMock');


contract('CoreIssuanceOrder', accounts => {
  const [
    contractDeployerAccount,
    takerAccount,
    makerAccount,
    signerAccount,
    relayerAccount,
    zeroExOrderMakerAccount,
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;
  let takerWalletWrapper: TakerWalletWrapperContract;

  const coreWrapper = new CoreWrapper(contractDeployerAccount, contractDeployerAccount);
  const erc20Wrapper = new ERC20Wrapper(contractDeployerAccount);
  const exchangeWrapper = new ExchangeWrapper(contractDeployerAccount);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    core = await coreWrapper.deployCoreAsync();
    vault = await coreWrapper.deployVaultAsync();
    transferProxy = await coreWrapper.deployTransferProxyAsync();
    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync();
    takerWalletWrapper = await exchangeWrapper.deployTakerWalletExchangeWrapper(transferProxy);

    // TODO: Move these authorizations into setDefaultStateAndAuthrorizations
    await coreWrapper.addAuthorizationAsync(takerWalletWrapper, core.address);
    await coreWrapper.addAuthorizationAsync(transferProxy, takerWalletWrapper.address);

    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

    // Register taker wallet wrapper
    await coreWrapper.registerExchange(core, Utils.EXCHANGES.TAKER_WALLET, takerWalletWrapper.address);
  });

  describe('#fillOrder', async () => {
    let subjectCaller: Address;
    let subjectAddresses: Address[];
    let subjectValues: BigNumber[];
    let subjectRequiredComponents: Address[];
    let subjectRequiredComponentAmounts: BigNumber[];
    let subjectQuantityToIssue: BigNumber;
    let subjectVSignature: BigNumber;
    let subjectSigBytes: Bytes[];
    let subjectExchangeOrdersData: Bytes;

    const naturalUnit: BigNumber = ether(2);
    let deployedTokens: StandardTokenMockContract[] = [];
    let componentTokens: StandardTokenMockContract[] = [];
    let componentUnits: BigNumber[];
    let setToken: SetTokenContract;

    let setAddress: Address;
    let makerAddress: Address;
    let relayerAddress: Address;
    let componentAddresses: Address[];
    let defaultComponentAmounts: BigNumber[];
    let orderQuantity: BigNumber;
    let makerToken: StandardTokenMockContract;
    let relayerToken: StandardTokenMockContract;
    let makerTokenAmount: BigNumber;
    let makerRelayerFee: BigNumber;
    let takerRelayerFee: BigNumber;
    let timeToExpiration: number;

    let takerAmountsToTransfer: BigNumber[];

    let issuanceOrderParams: any;

    beforeEach(async () => {
      // Deploy 4 tokens to arbitrary user, then transfer the correct quantites to each person in issuance scheme
      deployedTokens = await erc20Wrapper.deployTokensAsync(4, contractDeployerAccount);
      componentTokens = deployedTokens.slice(0, 2);
      makerToken = deployedTokens[2];
      relayerToken = deployedTokens[3];

      // Approve transfer
      await erc20Wrapper.approveTransfersAsync(deployedTokens, transferProxy.address, contractDeployerAccount);

      // Make sure maker and taker have approved all tokens for transfer
      await erc20Wrapper.approveTransfersAsync(deployedTokens, transferProxy.address, signerAccount);
      await erc20Wrapper.approveTransfersAsync(deployedTokens, transferProxy.address, takerAccount);

      // Give taker half of each of the tokens [componentOne, componentTwo, relayerToken, makerToken]
      await erc20Wrapper.transferTokensAsync(
        deployedTokens,
        takerAccount,
        DEPLOYED_TOKEN_QUANTITY.div(2),
        contractDeployerAccount
      );

      // Give maker half of only relayer and maker tokens [relayerToken, makerToken]
      await erc20Wrapper.transferTokensAsync(
        [relayerToken, makerToken],
        signerAccount,
        DEPLOYED_TOKEN_QUANTITY.div(2),
        contractDeployerAccount
      );

      // Create Set with component tokens
      componentAddresses = _.map(componentTokens, token => token.address);
      componentUnits = _.map(componentTokens, () => ether(4)); // Multiple of naturalUnit
      setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      // Assume maker has none of the components and requires the full amount of each
      defaultComponentAmounts = _.map(componentUnits, unit => unit.mul(orderQuantity || ether(4)).div(naturalUnit));

      // Generate valid issuance order signature and get params to pass to subject
      issuanceOrderParams = await generateFillOrderParameters(
        setAddress || setToken.address,
        signerAccount,
        makerAddress || signerAccount,
        componentAddresses,
        defaultComponentAmounts,
        makerToken.address,
        relayerAddress || relayerAccount,
        relayerToken.address,
        makerRelayerFee || ether(1),
        takerRelayerFee || ether(2),
        orderQuantity || ether(4),
        makerTokenAmount || ether(10),
        timeToExpiration || 10,
      );

      subjectCaller = takerAccount;
      subjectAddresses = issuanceOrderParams.addresses;
      subjectValues = issuanceOrderParams.values;
      subjectRequiredComponents = issuanceOrderParams.requiredComponents;
      subjectRequiredComponentAmounts = issuanceOrderParams.requiredComponentAmounts;
      subjectQuantityToIssue = ether(4);
      subjectVSignature = issuanceOrderParams.signature.v;
      subjectSigBytes = [issuanceOrderParams.signature.r, issuanceOrderParams.signature.s];

      // Default taker to contribute the full amounts of each component for issuing
      const defaultTakerAmountsToTransfer = _.map(componentUnits, unit => ether(4).div(naturalUnit).mul(unit));
      subjectExchangeOrdersData = generateOrdersDataWithTakerOrders(
        makerToken.address,
        componentAddresses,
        takerAmountsToTransfer || defaultTakerAmountsToTransfer,
      );
    });

    async function subject(): Promise<string> {
      return core.fillOrder.sendTransactionAsync(
        subjectAddresses,
        subjectValues,
        subjectRequiredComponents,
        subjectRequiredComponentAmounts,
        subjectQuantityToIssue,
        subjectVSignature,
        subjectSigBytes,
        subjectExchangeOrdersData,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it('transfers the full maker token amount from the maker', async () => {
      const existingBalance = await makerToken.balanceOf.callAsync(signerAccount);
      await assertTokenBalance(makerToken, DEPLOYED_TOKEN_QUANTITY.div(2), signerAccount);

      await subject();

      const fullMakerTokenAmount = ether(10);
      const expectedNewBalance = existingBalance.sub(fullMakerTokenAmount);
      await assertTokenBalance(makerToken, expectedNewBalance, signerAccount);
    });

    it('transfers the remaining maker tokens to the taker', async () => {
      const existingBalance = await makerToken.balanceOf.callAsync(subjectCaller);
      await assertTokenBalance(makerToken, DEPLOYED_TOKEN_QUANTITY.div(2), subjectCaller);

      await subject();

      const netMakerToTaker = ether(10);
      const expectedNewBalance = existingBalance.plus(netMakerToTaker);
      await assertTokenBalance(makerToken, expectedNewBalance, subjectCaller);
    });

    it('transfers the fees to the relayer', async () => {
      await assertTokenBalance(relayerToken, ZERO, relayerAccount);

      await subject();

      const expectedNewBalance = ether(3);
      await assertTokenBalance(relayerToken, expectedNewBalance, relayerAccount);
    });

    it('mints the correct quantity of the set for the maker', async () => {
      const existingBalance = await setToken.balanceOf.callAsync(signerAccount);

      await subject();

      await assertTokenBalance(setToken, existingBalance.add(subjectQuantityToIssue), signerAccount);
    });

    it('marks the correct amount as filled in orderFills mapping', async () => {
      const preFilled = await core.orderFills.callAsync(issuanceOrderParams.orderHash);
      expect(preFilled).to.be.bignumber.equal(ZERO);

      await subject();

      const filled = await core.orderFills.callAsync(issuanceOrderParams.orderHash);
      expect(filled).to.be.bignumber.equal(subjectQuantityToIssue);
    });

    it('emits correct LogFill event', async () => {
      const txHash = await subject();

      const formattedLogs = await getFormattedLogsFromTxHash(txHash);
      const expectedLogs = getExpectedFillLog(
        setToken.address,              // setAddress
        signerAccount,                 // makerAddress
        subjectCaller,                 // takerAddress
        makerToken.address,            // makerToken
        relayerAccount,                // relayerAddress
        relayerToken.address,          // relayerToken
        subjectQuantityToIssue,        // quantityFilled
        ether(10),                     // makerTokenToTaker
        ether(3),                      // relayerTokenAmountPaid
        issuanceOrderParams.orderHash, // orderHash
        core.address
      );

      await assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when there are 0x orders as part of the orders data', async () => {
      let zeroExOrderTakerTokenAmount: BigNumber;
      let headerMakerTokenAmountForZeroExOrders: BigNumber;

      beforeEach(async () => {
        // Deploy and register 0x wrapper
        const zeroExExchangeWrapper = await exchangeWrapper.deployZeroExExchangeWrapper(
          TestUtils.ZERO_EX_EXCHANGE_ADDRESS,
          TestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
          transferProxy,
        );
        await coreWrapper.registerExchange(core, Utils.EXCHANGES.ZERO_EX, zeroExExchangeWrapper.address);

        // Give 0x order maker the component tokens
        await erc20Wrapper.transferTokensAsync(
          componentTokens,
          zeroExOrderMakerAccount,
          DEPLOYED_TOKEN_QUANTITY.div(2),
          contractDeployerAccount
        );

        // Make sure 0x order maker has approved 0x to transfer them
        await erc20Wrapper.approveTransfersAsync(
          componentTokens,
          TestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
          zeroExOrderMakerAccount
        );

        // ether(10) = makerTokenAmount
        const defaultZeroExOrderTakerTokenAmount = zeroExOrderTakerTokenAmount || ether(10).div(2);

        // Standard 0x order without fees, see zeroExExchangeWrapper.spec.ts for clarity on body
        const zeroExOrder: ZeroExOrder = Utils.generateZeroExOrder(
          NULL_ADDRESS,                       // senderAddress
          zeroExOrderMakerAccount,            // makerAddress
          NULL_ADDRESS,                       // takerAddress
          ZERO,                               // makerFee
          ZERO,                               // takerFee
          defaultComponentAmounts[0],         // makerAssetAmount, full amount of first component needed for issuance
          defaultZeroExOrderTakerTokenAmount, // takerAssetAmount
          componentTokens[0].address,         // makerAssetAddress
          makerToken.address,                 // takerAssetAddress
          Utils.generateSalt(),               // salt
          TestUtils.ZERO_EX_EXCHANGE_ADDRESS, // exchangeAddress
          NULL_ADDRESS,                       // feeRecipientAddress
          Utils.generateTimestamp(10)         // expirationTimeSeconds
        );

        const zeroExOrderFillAmount = defaultZeroExOrderTakerTokenAmount;
        const zeroExOrderSignature = await utils.signZeroExOrderAsync(zeroExOrder);
        const zeroExOrdersBytes = Utils.generateZeroExExchangeWrapperOrder(
          zeroExOrder,
          zeroExOrderSignature,
          zeroExOrderFillAmount
        );

        // Second 0x order
        const secondZeroExOrderTakerTokenAmount = ether(10).div(2); // ether(10) = makerTokenAmount
        const secondZeroExOrder: ZeroExOrder = Utils.generateZeroExOrder(
          NULL_ADDRESS,                       // senderAddress
          zeroExOrderMakerAccount,            // makerAddress
          NULL_ADDRESS,                       // takerAddress
          ZERO,                               // makerFee
          ZERO,                               // takerFee
          defaultComponentAmounts[1],         // makerAssetAmount, full amount of second component needed for issuance
          secondZeroExOrderTakerTokenAmount,  // takerAssetAmount
          componentTokens[1].address,         // makerAssetAddress
          makerToken.address,                 // takerAssetAddress
          Utils.generateSalt(),               // salt
          TestUtils.ZERO_EX_EXCHANGE_ADDRESS, // exchangeAddress
          NULL_ADDRESS,                       // feeRecipientAddress
          Utils.generateTimestamp(10)         // expirationTimeSeconds
        );

        const secondZeroExOrderFillAmount = secondZeroExOrderTakerTokenAmount;
        const secondZeroExOrderSignature = await utils.signZeroExOrderAsync(secondZeroExOrder);
        const secondZeroExOrdersBytes = Utils.generateZeroExExchangeWrapperOrder(
          secondZeroExOrder,
          secondZeroExOrderSignature,
          secondZeroExOrderFillAmount
        );

        // Build exchange header for all 0x orders
        const exchangeOrderDatum: Buffer[] = [
          Utils.paddedBufferForPrimitive(Utils.EXCHANGES.ZERO_EX),
          Utils.paddedBufferForPrimitive(2),                       // orderCount
          Utils.paddedBufferForPrimitive(makerToken.address),
          Utils.paddedBufferForBigNumber(headerMakerTokenAmountForZeroExOrders || ether(10)), // All makerTokenAmount
        ];
        const numBytesFirstOrder = Utils.numBytesFromHex(zeroExOrdersBytes);
        const numBytesSecondOrder = Utils.numBytesFromHex(secondZeroExOrdersBytes);
        exchangeOrderDatum.push(Utils.paddedBufferForBigNumber(numBytesFirstOrder.add(numBytesSecondOrder)));
        const exchangeHeader: Bytes = ethUtil.bufferToHex(Buffer.concat(exchangeOrderDatum));

        // Update ordersData to pass into transaction
        subjectExchangeOrdersData = Utils.concatBytes([exchangeHeader, zeroExOrdersBytes, secondZeroExOrdersBytes]);
      });

      it('transfers the full maker token amount from the maker', async () => {
        const existingBalance = await makerToken.balanceOf.callAsync(signerAccount);
        await assertTokenBalance(makerToken, DEPLOYED_TOKEN_QUANTITY.div(2), signerAccount);

        await subject();

        const fullMakerTokenAmount = ether(10);
        const expectedNewBalance = existingBalance.sub(fullMakerTokenAmount);
        await assertTokenBalance(makerToken, expectedNewBalance, signerAccount);
      });

      it('transfers the remaining maker tokens to the taker', async () => {
        const existingBalance = await makerToken.balanceOf.callAsync(subjectCaller);
        await assertTokenBalance(makerToken, DEPLOYED_TOKEN_QUANTITY.div(2), subjectCaller);

        await subject();

        const netMakerToTaker = ZERO; // Currently 0 because all maker token is being used
        const expectedNewBalance = existingBalance.plus(netMakerToTaker);
        await assertTokenBalance(makerToken, expectedNewBalance, subjectCaller);
      });

      it('transfers the fees to the relayer', async () => {
        await assertTokenBalance(relayerToken, ZERO, relayerAccount);

        await subject();

        const expectedNewBalance = ether(3);
        await assertTokenBalance(relayerToken, expectedNewBalance, relayerAccount);
      });

      it('mints the correct quantity of the set for the maker', async () => {
        const existingBalance = await setToken.balanceOf.callAsync(signerAccount);

        await subject();

        await assertTokenBalance(setToken, existingBalance.add(subjectQuantityToIssue), signerAccount);
      });

      it('marks the correct amount as filled in orderFills mapping', async () => {
        const preFilled = await core.orderFills.callAsync(issuanceOrderParams.orderHash);
        expect(preFilled).to.be.bignumber.equal(ZERO);

        await subject();

        const filled = await core.orderFills.callAsync(issuanceOrderParams.orderHash);
        expect(filled).to.be.bignumber.equal(subjectQuantityToIssue);
      });

      it('emits correct LogFill event', async () => {
        const txHash = await subject();

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedFillLog(
          setToken.address,              // setAddress
          signerAccount,                 // makerAddress
          subjectCaller,                 // takerAddress
          makerToken.address,            // makerToken
          relayerAccount,                // relayerAddress
          relayerToken.address,          // relayerToken
          subjectQuantityToIssue,        // quantityFilled
          ZERO,                          // makerTokenToTaker
          ether(3),                      // relayerTokenAmountPaid
          issuanceOrderParams.orderHash, // orderHash
          core.address
        );

        await assertLogEquivalence(formattedLogs, expectedLogs);
      });

      describe('when the total makerToken required for the 0x orders is more than the signed amount', async () => {
        before(async () => {
          zeroExOrderTakerTokenAmount = ether(6); // ether(6) + ether(5) > ether(10)
          headerMakerTokenAmountForZeroExOrders = ether(11);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });

    describe('when the fill size is less than the order quantity', async () => {
      beforeEach(async () => {
        subjectQuantityToIssue = ether(2);
      });

      it('transfers the partial maker token amount from the maker', async () => {
        const existingBalance = await makerToken.balanceOf.callAsync(signerAccount);
        await assertTokenBalance(makerToken, DEPLOYED_TOKEN_QUANTITY.div(2), signerAccount);

        await subject();

        const partialMakerTokenAmount = ether(10).mul(subjectQuantityToIssue).div(ether(4));
        const expectedNewBalance = existingBalance.sub(partialMakerTokenAmount);
        await assertTokenBalance(makerToken, expectedNewBalance, signerAccount);
      });

      it('transfers the remaining maker tokens to the taker', async () => {
        const existingBalance = await makerToken.balanceOf.callAsync(subjectCaller);
        await assertTokenBalance(makerToken, DEPLOYED_TOKEN_QUANTITY.div(2), subjectCaller);

        await subject();

        const netMakerToTaker = ether(10).mul(subjectQuantityToIssue).div(ether(4));
        const expectedNewBalance = existingBalance.plus(netMakerToTaker);
        await assertTokenBalance(makerToken, expectedNewBalance, subjectCaller);
      });

      it('transfers the partial fees to the relayer', async () => {
        await assertTokenBalance(relayerToken, ZERO, relayerAccount);

        await subject();

        const expectedNewBalance = ether(3).mul(subjectQuantityToIssue).div(ether(4));
        await assertTokenBalance(relayerToken, expectedNewBalance, relayerAccount);
      });

      it('mints the correct quantity of the set for the user', async () => {
        const existingBalance = await setToken.balanceOf.callAsync(signerAccount);

        await subject();

        await assertTokenBalance(setToken, existingBalance.add(subjectQuantityToIssue), signerAccount);
      });

      it('marks the correct amount as filled in orderFills mapping', async () => {
        const preFilled = await core.orderFills.callAsync(issuanceOrderParams.orderHash);
        expect(preFilled).to.be.bignumber.equal(ZERO);

        await subject();

        const filled = await core.orderFills.callAsync(issuanceOrderParams.orderHash);
        expect(filled).to.be.bignumber.equal(subjectQuantityToIssue);
      });

      it('emits correct LogFill event', async () => {
        const txHash = await subject();

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedFillLog(
          setToken.address,
          signerAccount,
          subjectCaller,
          makerToken.address,
          relayerAccount,
          relayerToken.address,
          subjectQuantityToIssue,
          ether(5),
          ether(3).mul(subjectQuantityToIssue).div(ether(4)),
          issuanceOrderParams.orderHash,
          core.address
        );

        await assertLogEquivalence(formattedLogs, expectedLogs);
      });
    });

    describe('when the relayer fees are zero', async () => {
      before(async () => {
        ABIDecoder.addABI(StandardTokenMock.abi);
        makerRelayerFee = ether(0);
        takerRelayerFee = ether(0);
      });

      after(async () => {
        ABIDecoder.removeABI(StandardTokenMock.abi);
        makerRelayerFee = undefined;
        takerRelayerFee = undefined;
      });

      it('does not execute a transfer of the relayer fees for 0 amount', async () => {
        const txHash = await subject();

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const transferAddresses: Address[] = [];
        formattedLogs.forEach( event => {
          if (event.event == 'Transfer') {
            transferAddresses.push(event.args.to);
          }
        });

        expect(transferAddresses).to.not.include(relayerAddress);
      });
    });

    describe('when the relayer address is null', async () => {
      before(async () => {
        ABIDecoder.addABI(StandardTokenMock.abi);
        relayerAddress = NULL_ADDRESS;
      });

      after(async () => {
        ABIDecoder.removeABI(StandardTokenMock.abi);
        relayerAddress = undefined;
      });

      it('does not execute a transfer of the relayer fees for 0 amount', async () => {
        const txHash = await subject();

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const transferAddresses: Address[] = [];
        formattedLogs.forEach( event => {
          if (event.event == 'Transfer') {
            transferAddresses.push(event.args.to);
          }
        });

        expect(transferAddresses).to.not.include(relayerAddress);
      });
    });

    describe('when the full fill size has been taken', async () => {
      beforeEach(async () => {
        const quantityToCancel = ether(4);
        await core.cancelOrder.sendTransactionAsync(
          issuanceOrderParams.addresses,
          issuanceOrderParams.values,
          issuanceOrderParams.requiredComponents,
          issuanceOrderParams.requiredComponentAmounts,
          quantityToCancel,
          { from: signerAccount }
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the partial fill size has been taken', async () => {
      beforeEach(async () => {
        const quantityToCancel = ether(2);
        await core.cancelOrder.sendTransactionAsync(
          issuanceOrderParams.addresses,
          issuanceOrderParams.values,
          issuanceOrderParams.requiredComponents,
          issuanceOrderParams.requiredComponentAmounts,
          quantityToCancel,
          { from: signerAccount }
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the fill size is greater than the order quantity', async () => {
      beforeEach(async () => {
        subjectQuantityToIssue = ether(6);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the set was not created through core', async () => {
      before(async () => {
        setAddress = NULL_ADDRESS;
      });

      after(async () => {
        setAddress = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the fill quantity is not a multiple of the natural unit of the set', async () => {
      beforeEach(async () => {
        subjectQuantityToIssue = ether(3);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the order quantity is not a multiple of the natural unit of the set', async () => {
      before(async () => {
        orderQuantity = ether(5);
      });

      after(async () => {
        orderQuantity = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the order has expired', async () => {
      before(async () => {
        timeToExpiration = -1;
      });

     after(async () => {
        timeToExpiration = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when Set Token quantity in Issuance Order equals 0', async () => {
      before(async () => {
        orderQuantity = ZERO;
      });

     after(async () => {
        orderQuantity = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when makerTokenAmount in Issuance Order equals 0', async () => {
      before(async () => {
        makerTokenAmount = ZERO;
      });

     after(async () => {
        makerTokenAmount = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the message is not signed by the maker', async () => {
      before(async () => {
        makerAddress = makerAccount;
      });

     after(async () => {
        makerAddress = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when an encoded exchangeId is invalid', async () => {
      beforeEach(async () => {
        subjectExchangeOrdersData = generateOrdersDataWithIncorrectExchange();
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when takerAmountsToTransfer is less than requiredTokenAmounts', async () => {
      before(async () => {
        takerAmountsToTransfer = [ether(1), ether(1)];
      });

      after(async () => {
        takerAmountsToTransfer = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when rounding error is too large', async () => {
      before(async () => {
        orderQuantity = ether(6);
        makerTokenAmount = new BigNumber(10);
      });

      beforeEach(async () => {
        subjectQuantityToIssue = ether(4);
      });

      after(async () => {
        orderQuantity = undefined;
        makerTokenAmount = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#cancelOrder', async () => {
    let subjectCaller: Address;
    let subjectQuantityToCancel: BigNumber;

    let setToken: SetTokenContract;
    let relayerAddress: Address;
    let componentAddresses: Address[];
    let defaultComponentAmounts: BigNumber[];
    let orderQuantity: BigNumber;
    let makerTokenAmount: BigNumber;
    let makerToken: StandardTokenMockContract;
    let relayerToken: StandardTokenMockContract;
    const makerRelayerFee: BigNumber = ether(1);
    const takerRelayerFee: BigNumber = ether(2);
    let timeToExpiration: number;

    let issuanceOrderParams: any;

    beforeEach(async () => {
      const naturalUnit = ether(2);
      relayerAddress = relayerAccount;

      // For current purposes issue to maker/signer
      const components = await erc20Wrapper.deployTokensAsync(4, signerAccount);
      await erc20Wrapper.approveTransfersAsync(components, transferProxy.address, signerAccount);

      componentAddresses = _.map(components, token => token.address);
      const componentUnits = _.map(components, () => ether(4)); // Multiple of naturalUnit
      setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      // ether(4) for now but will be orderQuantity
      defaultComponentAmounts = _.map(componentUnits, unit => unit.mul(ether(4)));
      await coreWrapper.registerDefaultExchanges(core);

      makerToken = components[2];
      relayerToken = components[3];

      subjectCaller = signerAccount;
      subjectQuantityToCancel = ether(2);
      issuanceOrderParams = await generateFillOrderParameters(
        setToken.address,
        signerAccount,
        signerAccount,
        componentAddresses,
        defaultComponentAmounts,
        makerToken.address,
        relayerAddress,
        relayerToken.address,
        makerRelayerFee,
        takerRelayerFee,
        orderQuantity || ether(4),
        makerTokenAmount || ether(10),
        timeToExpiration || 10,
      );
    });

    async function subject(): Promise<string> {
      return core.cancelOrder.sendTransactionAsync(
        issuanceOrderParams.addresses,
        issuanceOrderParams.values,
        issuanceOrderParams.requiredComponents,
        issuanceOrderParams.requiredComponentAmounts,
        subjectQuantityToCancel,
        { from: subjectCaller },
      );
    }

    it('marks the correct amount as canceled in orderCancels mapping', async () => {
      const preCanceled = await core.orderCancels.callAsync(issuanceOrderParams.orderHash);
      expect(preCanceled).to.be.bignumber.equal(ZERO);

      await subject();

      const canceled = await core.orderCancels.callAsync(issuanceOrderParams.orderHash);
      expect(canceled).to.be.bignumber.equal(subjectQuantityToCancel);
    });

    it('emits correct LogCancel event', async () => {
      const txHash = await subject();

      const formattedLogs = await getFormattedLogsFromTxHash(txHash);
      const expectedLogs = getExpectedCancelLog(
        setToken.address,
        signerAccount,
        makerToken.address,
        relayerAddress,
        subjectQuantityToCancel,
        issuanceOrderParams.orderHash,
        core.address
      );

      await assertLogEquivalence(formattedLogs, expectedLogs);
    });

   describe('when the quantity to cancel is greater than the open amount', async () => {
      beforeEach(async () => {
        subjectQuantityToCancel = ether(6);
      });

      it('should mark only the remaining open amount as canceled', async () => {
        const filled = await core.orderFills.callAsync(issuanceOrderParams.orderHash);
        const preCanceled = await core.orderCancels.callAsync(issuanceOrderParams.orderHash);
        const openAmount = issuanceOrderParams.values[0].minus(filled).minus(preCanceled);

        await subject();

        const canceled = await core.orderCancels.callAsync(issuanceOrderParams.orderHash);
        expect(canceled).to.be.bignumber.equal(preCanceled + openAmount);
        expect(canceled).to.be.bignumber.not.equal(preCanceled.plus(subjectQuantityToCancel));
      });
    });

    describe('when the quantity to cancel is not positive', async () => {
      beforeEach(async () => {
        subjectQuantityToCancel = ZERO;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the transaction sender is not the maker', async () => {
      beforeEach(async () => {
        subjectCaller = takerAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the order has expired', async () => {
      before(async () => {
        timeToExpiration = -1;
      });

      after(async () => {
        timeToExpiration = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the cancel quantity is not a multiple of the natural unit of the set', async () => {
      beforeEach(async () => {
        subjectQuantityToCancel = ether(3);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when Set Token quantity in IssuanceOrder not a multiple of natural unit of set', async () => {
      before(async () => {
        orderQuantity = ether(5);
      });

      after(async () => {
        orderQuantity = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when Set Token quantity in Issuance Order equals 0', async () => {
      before(async () => {
        orderQuantity = ZERO;
      });

      after(async () => {
        orderQuantity = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when makerTokenAmount in Issuance Order equals 0', async () => {
      before(async () => {
        makerTokenAmount = ZERO;
      });

      after(async () => {
        makerTokenAmount = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
