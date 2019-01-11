require('module-alias/register');

import * as _ from 'lodash';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';
import { Order as ZeroExOrder } from '@0xproject/types';
import { Address, Bytes } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract,
  ZeroExExchangeWrapperContract
} from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { ExchangeData } from '@utils/orders';
import { DEFAULT_GAS, UNLIMITED_ALLOWANCE_IN_BASE_UNITS, ZERO } from '@utils/constants';
import { ether } from '@utils/units';
import { getWeb3 } from '@utils/web3Helper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';
import { ExchangeWrapper } from '@utils/wrappers/exchangeWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setUtils = new SetUtils(web3);
const { expect } = chai;
const blockchain = new Blockchain(web3);
const { NULL_ADDRESS } = SetUtils.CONSTANTS;


contract('ZeroExExchangeWrapper', accounts => {
  const [
    zrxTokenOwnerAccount,
    deployerAccount,
    zeroExOrderMakerAccount,
    issuanceOrderMakerAccount,
    issuanceOrderAndZeroExOrderTakerAccount,
    secondZeroExOrderMakerAccount,
    feeRecipientAccount,
    unauthorizedAddress,
    issuanceOrderModuleAccount,
  ] = accounts;

  const coreWrapper = new CoreWrapper(deployerAccount, deployerAccount);
  const erc20Wrapper = new ERC20Wrapper(deployerAccount);
  const exchangeWrapper = new ExchangeWrapper(deployerAccount);

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;

  let zeroExExchangeWrapper: ZeroExExchangeWrapperContract;

  let zrxToken: StandardTokenMockContract;
  let zeroExOrderMakerToken: StandardTokenMockContract;
  let zeroExOrderTakerToken: StandardTokenMockContract;

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    transferProxy = await coreWrapper.deployTransferProxyAsync();
    vault = await coreWrapper.deployVaultAsync();
    core = await coreWrapper.deployCoreMockAsync(transferProxy, vault);
    await coreWrapper.addModuleAsync(core, issuanceOrderModuleAccount);

    zeroExExchangeWrapper = await exchangeWrapper.deployZeroExExchangeWrapper(
      core.address,
      SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,
      SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
      SetTestUtils.ZERO_EX_TOKEN_ADDRESS,
      transferProxy,
    );

    // ZRX token is already deployed to zrxTokenOwnerAccount via the test snapshot
    zrxToken = erc20Wrapper.zrxToken();
    const orderTakerZRXBalanceForFees = ether(1000);
    await erc20Wrapper.transferTokenAsync(
      zrxToken,
      issuanceOrderAndZeroExOrderTakerAccount,
      orderTakerZRXBalanceForFees,
      zrxTokenOwnerAccount
    );
    await erc20Wrapper.transferTokenAsync(
      zrxToken,
      zeroExOrderMakerAccount,
      orderTakerZRXBalanceForFees,
      zrxTokenOwnerAccount
    );

    zeroExOrderMakerToken = await erc20Wrapper.deployTokenAsync(zeroExOrderMakerAccount);
    zeroExOrderTakerToken = await erc20Wrapper.deployTokenAsync(zeroExExchangeWrapper.address);

    await erc20Wrapper.approveTransferAsync(
      zeroExOrderMakerToken,
      SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
      zeroExOrderMakerAccount
    );
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#exchange', async () => {
    let subjectMakerAccount: Address;
    let subjectTakerAccount: Address;
    let subjectMakerTokenAddress: Address;
    let subjectMakerTokenAmount: BigNumber;
    let subjectOrderCount: BigNumber;
    let subjectFillQuantity: BigNumber;
    let subjectAttemptedFillQuantity: BigNumber;
    let subjectOrderData: Bytes;
    let subjectCaller: Address;

    let subjectExchangeData: ExchangeData;

    let zeroExOrder: ZeroExOrder;
    let senderAddress: Address;
    let makerAddress: Address;
    let takerAddress: Address;
    let makerAssetAmount: BigNumber;
    let takerAssetAmount: BigNumber;
    let makerFee: BigNumber;
    let takerFee: BigNumber;
    let salt: BigNumber;
    let feeRecipientAddress: Address;
    let expirationTimeSeconds: BigNumber;

    let zeroExExchangeWrapperOrder: Bytes;

    beforeEach(async () => {
      senderAddress = senderAddress || NULL_ADDRESS;
      makerAddress = makerAddress || zeroExOrderMakerAccount;
      takerAddress = takerAddress || NULL_ADDRESS;
      makerFee = makerFee || ZERO;
      takerFee = takerFee || ZERO;
      makerAssetAmount = makerAssetAmount || ether(100);
      takerAssetAmount = takerAssetAmount || ether(10);
      salt = salt || SetUtils.generateSalt();
      feeRecipientAddress = feeRecipientAddress || NULL_ADDRESS;
      expirationTimeSeconds = expirationTimeSeconds || SetTestUtils.generateTimestamp(10);

      zeroExOrder = SetTestUtils.generateZeroExOrder(
        senderAddress,
        makerAddress,
        takerAddress,
        makerFee,
        takerFee,
        makerAssetAmount,
        takerAssetAmount,
        zeroExOrderMakerToken.address,
        zeroExOrderTakerToken.address,
        salt,
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,
        feeRecipientAddress,
        expirationTimeSeconds,
      );

      const zeroExOrderFillAmount = takerAssetAmount;
      const zeroExOrderSignature = await setUtils.signZeroExOrderAsync(zeroExOrder);
      zeroExExchangeWrapperOrder = SetTestUtils.generateZeroExExchangeWrapperOrder(
        zeroExOrder,
        zeroExOrderSignature,
        zeroExOrderFillAmount
      );

      subjectMakerAccount = issuanceOrderMakerAccount;
      subjectTakerAccount = issuanceOrderAndZeroExOrderTakerAccount;
      subjectMakerTokenAddress = zeroExOrderTakerToken.address;
      subjectMakerTokenAmount = takerAssetAmount;
      subjectOrderCount = new BigNumber(1);
      subjectFillQuantity = new BigNumber(1);
      subjectAttemptedFillQuantity = new BigNumber(1);
      subjectOrderData = zeroExExchangeWrapperOrder;
      subjectCaller = issuanceOrderModuleAccount;

      subjectExchangeData = {
        maker: subjectMakerAccount,
        taker: subjectTakerAccount,
        makerToken: subjectMakerTokenAddress,
        makerAssetAmount: subjectMakerTokenAmount,
        orderCount: subjectOrderCount,
        fillQuantity: subjectFillQuantity,
        attemptedFillQuantity: subjectAttemptedFillQuantity,
      };
    });

    async function subject(): Promise<any> {
      return zeroExExchangeWrapper.exchange.sendTransactionAsync(
        subjectExchangeData,
        subjectOrderData,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it('should receive the correct amount of taker token from the ZeroEx order', async () => {
      await subject();

      const takerTokenBalance = await zeroExOrderMakerToken.balanceOf.callAsync(zeroExExchangeWrapper.address);
      expect(takerTokenBalance).to.bignumber.equal(makerAssetAmount);
    });

    it('should have the correct taker token allowances to the ZeroEx erc20 proxy', async () => {
      await subject();

      const zeroExOrderTakerTokenAllowance = await zeroExOrderTakerToken.allowance.callAsync(
        zeroExExchangeWrapper.address,
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS
      );
      const expectedTakerTokenAllowance = UNLIMITED_ALLOWANCE_IN_BASE_UNITS.sub(takerAssetAmount);
      expect(zeroExOrderTakerTokenAllowance).to.bignumber.equal(expectedTakerTokenAllowance);
    });

    it('should have the correct maker token allowances to the Set Proxy', async () => {
      await subject();

      const zeroExMakerTokenAllowance = await zeroExOrderMakerToken.allowance.callAsync(
        zeroExExchangeWrapper.address,
        transferProxy.address
      );
      expect(zeroExMakerTokenAllowance).to.bignumber.equal(UNLIMITED_ALLOWANCE_IN_BASE_UNITS);
    });

    describe('when the 0x order has a taker fee', async () => {
      before(async () => {
        feeRecipientAddress = feeRecipientAccount;
        takerFee = ether(1);
      });

      beforeEach(async () => {
        await erc20Wrapper.approveTransferAsync(
          zrxToken,
          zeroExExchangeWrapper.address,
          issuanceOrderAndZeroExOrderTakerAccount
        );
      });

      after(async () => {
        feeRecipientAddress = undefined;
        takerFee = undefined;
      });

      it('transfers the fee from the issuance order filler', async () => {
        const existingZRXBalance = await zrxToken.balanceOf.callAsync(issuanceOrderAndZeroExOrderTakerAccount);

        await subject();

        const expectedZRXBalance = existingZRXBalance.sub(takerFee);
        const newZRXBalance = await zrxToken.balanceOf.callAsync(issuanceOrderAndZeroExOrderTakerAccount);
        expect(newZRXBalance).to.bignumber.equal(expectedZRXBalance);
      });

      it('transfers the fee to the fee recipient', async () => {
        const existingZRXBalance = await zrxToken.balanceOf.callAsync(feeRecipientAddress);

        await subject();

        const expectedZRXBalance = existingZRXBalance.add(takerFee);
        const newZRXBalance = await zrxToken.balanceOf.callAsync(feeRecipientAddress);
        expect(newZRXBalance).to.bignumber.equal(expectedZRXBalance);
      });
    });

    describe('when the 0x order has a maker fee', async () => {
      before(async () => {
        feeRecipientAddress = feeRecipientAccount;
        makerFee = ether(1);
      });

      beforeEach(async () => {
        await erc20Wrapper.approveTransferAsync(
          zrxToken,
          SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
          zeroExOrderMakerAccount
        );
      });

      after(async () => {
        feeRecipientAddress = undefined;
        makerFee = undefined;
      });

      it('transfers the fee from the zero ex order maker', async () => {
        const existingZRXBalance = await zrxToken.balanceOf.callAsync(zeroExOrderMakerAccount);

        await subject();

        const expectedZRXBalance = existingZRXBalance.sub(makerFee);
        const newZRXBalance = await zrxToken.balanceOf.callAsync(zeroExOrderMakerAccount);
        expect(newZRXBalance).to.bignumber.equal(expectedZRXBalance);
      });

      it('transfers the fee to the fee recipient', async () => {
        const existingZRXBalance = await zrxToken.balanceOf.callAsync(feeRecipientAddress);

        await subject();

        const expectedZRXBalance = existingZRXBalance.add(makerFee);
        const newZRXBalance = await zrxToken.balanceOf.callAsync(feeRecipientAddress);
        expect(newZRXBalance).to.bignumber.equal(expectedZRXBalance);
      });
    });

    describe('when the caller is not the initialized core address', async () => {
      beforeEach(async () => {
        subjectCaller = unauthorizedAddress;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the order is already expired', async() => {
      before(async () => {
        expirationTimeSeconds = SetTestUtils.generateTimestamp(0);
      });

      after(async () => {
        expirationTimeSeconds = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the order signature is invalid', async() => {
      beforeEach(async () => {
        const differentZeroExOrder = Object.assign({}, zeroExOrder);
        differentZeroExOrder.salt = SetUtils.generateSalt();

        const zeroExOrderFillAmount = takerAssetAmount;
        const zeroExOrderSignature = await setUtils.signZeroExOrderAsync(differentZeroExOrder);
        subjectOrderData = SetTestUtils.generateZeroExExchangeWrapperOrder(
          zeroExOrder,
          zeroExOrderSignature,
          zeroExOrderFillAmount
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the fill order amount is greater than the taker amount of the ZeroEx order', async () => {
      beforeEach(async () => {
        const zeroExOrderFillAmount = takerAssetAmount.add(ether(1));
        const zeroExOrderSignature = await setUtils.signZeroExOrderAsync(zeroExOrder);
        subjectOrderData = SetTestUtils.generateZeroExExchangeWrapperOrder(
          zeroExOrder,
          zeroExOrderSignature,
          zeroExOrderFillAmount
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when there are two ZeroEx orders', async () => {
      let secondZeroExOrderMakerToken: StandardTokenMockContract;
      let secondZeroExOrder: ZeroExOrder;
      let secondZeroExOrderMakerAssetAmount: BigNumber;
      let secondZeroExOrderTakerAssetAmount: BigNumber;

      beforeEach(async () => {
        subjectOrderCount = new BigNumber(2);
        subjectExchangeData.orderCount = subjectOrderCount;

        secondZeroExOrderMakerToken = await erc20Wrapper.deployTokenAsync(secondZeroExOrderMakerAccount);
        await erc20Wrapper.approveTransferAsync(
          secondZeroExOrderMakerToken,
          SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
          secondZeroExOrderMakerAccount
        );

        secondZeroExOrderMakerAssetAmount = ether(100);
        secondZeroExOrderTakerAssetAmount = ether(20);
        secondZeroExOrder = SetTestUtils.generateZeroExOrder(
          NULL_ADDRESS,
          secondZeroExOrderMakerAccount,
          NULL_ADDRESS,
          ZERO,
          ZERO,
          secondZeroExOrderMakerAssetAmount,
          secondZeroExOrderTakerAssetAmount,
          secondZeroExOrderMakerToken.address,
          zeroExOrderTakerToken.address,
          SetUtils.generateSalt(),
          SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,
          NULL_ADDRESS,
          SetTestUtils.generateTimestamp(10),
        );

        const zeroExOrderFillAmount = secondZeroExOrderTakerAssetAmount;
        const zeroExOrderSignature = await setUtils.signZeroExOrderAsync(secondZeroExOrder);
        const secondZeroExExchangeWrapperOrder = SetTestUtils.generateZeroExExchangeWrapperOrder(
          secondZeroExOrder,
          zeroExOrderSignature,
          zeroExOrderFillAmount
        );
        subjectOrderData = SetTestUtils.concatBytes([zeroExExchangeWrapperOrder, secondZeroExExchangeWrapperOrder]);
      });

      it('should receipt the correct amounts of taker tokens and set allowances on ZeroEx/Set proxies', async () => {
        await subject();

        // First maker token
        const firstTakerTokenBalance = await zeroExOrderMakerToken.balanceOf.callAsync(zeroExExchangeWrapper.address);
        expect(firstTakerTokenBalance).to.bignumber.equal(makerAssetAmount);
        const zeroExMakerTokenAllowance = await zeroExOrderMakerToken.allowance.callAsync(
          zeroExExchangeWrapper.address,
          transferProxy.address
        );
        expect(zeroExMakerTokenAllowance).to.bignumber.equal(UNLIMITED_ALLOWANCE_IN_BASE_UNITS);

        // Second maker token
        const secondTakerTokenBalance = await secondZeroExOrderMakerToken.balanceOf.callAsync(
          zeroExExchangeWrapper.address
        );
        expect(secondTakerTokenBalance).to.bignumber.equal(secondZeroExOrderMakerAssetAmount);
        const secondZeroExMakerTokenAllowance = await secondZeroExOrderMakerToken.allowance.callAsync(
          zeroExExchangeWrapper.address,
          transferProxy.address
        );
        expect(secondZeroExMakerTokenAllowance).to.bignumber.equal(UNLIMITED_ALLOWANCE_IN_BASE_UNITS);

        // Remaining taker token allowance after two orders
        const zeroExOrderTakerTokenAllowance = await zeroExOrderTakerToken.allowance.callAsync(
          zeroExExchangeWrapper.address,
          SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS
        );
        const totalTakerAmountTransferred = takerAssetAmount.add(secondZeroExOrderTakerAssetAmount);
        const expectedTakerTokenAllowance = UNLIMITED_ALLOWANCE_IN_BASE_UNITS.sub(totalTakerAmountTransferred);
        expect(zeroExOrderTakerTokenAllowance).to.bignumber.equal(expectedTakerTokenAllowance);
      });
    });

    describe('when checking the return value', async () => {
      async function subject(): Promise<any> {
        return zeroExExchangeWrapper.exchange.callAsync(
          subjectExchangeData,
          subjectOrderData,
          { from: subjectCaller, gas: DEFAULT_GAS },
        );
      }

      it('should correctly return the fill Results', async () => {
        const [tokens, fillAmounts] = await subject();

        expect(_.first(tokens)).to.equal(zeroExOrderMakerToken.address);
        expect(_.first(fillAmounts)).to.bignumber.equal(makerAssetAmount);
      });
    });
  });
});
