require('module-alias/register');

import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';
import { Address, Bytes, KyberTrade } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  KyberNetworkWrapperContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract,
} from '@utils/contracts';
import { ether } from '@utils/units';
import { ExchangeData } from '@utils/orders';
import { Blockchain } from '@utils/blockchain';
import { DEFAULT_GAS, KYBER_RESERVE_CONFIGURED_RATE, UNLIMITED_ALLOWANCE_IN_BASE_UNITS } from '@utils/constants';
import { expectRevertError } from '@utils/tokenAssertions';
import { getWeb3 } from '@utils/web3Helper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';
import { ExchangeWrapper } from '@utils/wrappers/exchangeWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const { SetProtocolTestUtils: SetTestUtils } = setProtocolUtils;
const blockchain = new Blockchain(web3);


contract('KyberNetworkWrapper', accounts => {
  const [
    deployerAccount,
    deployedCoreAddress,
    unauthorizedAddress,
    issuanceOrderMakerAccount,
    takerAccount,
    issuanceOrderModuleAccount,
  ] = accounts;

  const coreWrapper = new CoreWrapper(deployerAccount, deployerAccount);
  const erc20Wrapper = new ERC20Wrapper(deployerAccount);
  const exchangeWrapper = new ExchangeWrapper(deployerAccount);

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;

  let kyberNetworkWrapper: KyberNetworkWrapperContract;

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    transferProxy = await coreWrapper.deployTransferProxyAsync();
    vault = await coreWrapper.deployVaultAsync();
    core = await coreWrapper.deployCoreMockAsync(transferProxy, vault);
    await coreWrapper.addModuleAsync(core, issuanceOrderModuleAccount);

    kyberNetworkWrapper = await exchangeWrapper.deployKyberNetworkWrapper(
      core.address,
      SetTestUtils.KYBER_NETWORK_PROXY_ADDRESS,
      transferProxy
    );
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#conversionRate', async () => {
    let subjectCaller: Address;
    let subjectMakerToken: Address;
    let subjectComponentToken: Address;
    let subjectQuantity: BigNumber;

    let makerToken: StandardTokenMockContract;
    let componentToken: StandardTokenMockContract;

    beforeEach(async () => {
      makerToken = erc20Wrapper.kyberReserveToken(SetTestUtils.KYBER_RESERVE_SOURCE_TOKEN_ADDRESS);
      componentToken = erc20Wrapper.kyberReserveToken(SetTestUtils.KYBER_RESERVE_DESTINATION_TOKEN_ADDRESS);

      subjectCaller = deployedCoreAddress;
      subjectMakerToken = makerToken.address;
      subjectComponentToken = componentToken.address;
      subjectQuantity = ether(5);
    });

    async function subject(): Promise<BigNumber[]> {
      return await kyberNetworkWrapper.conversionRate.callAsync(
        subjectMakerToken,
        subjectComponentToken,
        subjectQuantity,
        { from: subjectCaller }
      );
    }

    it('returns the correct rate set on the reserve contract for the given quantity', async () => {
      let rate: BigNumber;
      let slippage: BigNumber;
      [rate, slippage] = await subject();

      const expectedRate = KYBER_RESERVE_CONFIGURED_RATE;
      expect(rate).to.be.bignumber.equal(expectedRate);

      const expectedSlippage = new BigNumber('319948544369999997');
      expect(slippage).to.be.bignumber.equal(expectedSlippage);
    });
  });

  describe('#exchange', async () => {
    let subjectCaller: Address;
    let subjectMaker: Address;
    let subjectTaker: Address;
    let subjectMakerTokenAddress: Address;
    let subjectMakerTokenAmount: BigNumber;
    let subjectTradesCount: BigNumber;
    let subjectFillQuantity: BigNumber;
    let subjectAttemptedFillQuantity: BigNumber;
    let subjectTradesData: Bytes;

    let subjectExchangeData: ExchangeData;

    let maxDestinationQuantity: BigNumber;

    let sourceToken: StandardTokenMockContract;
    let sourceTokenDecimals: number;
    let sourceTokenQuantity: BigNumber;

    let componentToken: StandardTokenMockContract;
    let componentTokenDecimals: number;
    let componentTokenAmountToReceive: BigNumber;

    beforeEach(async () => {
      componentToken = erc20Wrapper.kyberReserveToken(SetTestUtils.KYBER_RESERVE_DESTINATION_TOKEN_ADDRESS);
      maxDestinationQuantity = componentTokenAmountToReceive || new BigNumber(651);

      sourceToken = erc20Wrapper.kyberReserveToken(SetTestUtils.KYBER_RESERVE_SOURCE_TOKEN_ADDRESS);
      sourceTokenQuantity = new BigNumber(1450);

      await erc20Wrapper.transferTokenAsync(
        sourceToken,
        kyberNetworkWrapper.address,
        sourceTokenQuantity,
        issuanceOrderMakerAccount
      );

      componentTokenDecimals = (await componentToken.decimals.callAsync()).toNumber();
      sourceTokenDecimals = (await sourceToken.decimals.callAsync()).toNumber();
      const conversionRatePower = new BigNumber(10).pow(18 + sourceTokenDecimals - componentTokenDecimals);
      const minimumConversionRate = maxDestinationQuantity.div(sourceTokenQuantity).mul(conversionRatePower).round();

      const kyberTrade = {
        destinationToken: componentToken.address,
        sourceTokenQuantity: sourceTokenQuantity,
        minimumConversionRate: minimumConversionRate,
        maxDestinationQuantity: maxDestinationQuantity,
      } as KyberTrade;

      subjectCaller = issuanceOrderModuleAccount;
      subjectMaker = issuanceOrderMakerAccount;
      subjectTaker = takerAccount;
      subjectMakerTokenAddress = sourceToken.address;
      subjectMakerTokenAmount = sourceTokenQuantity;
      subjectTradesCount = new BigNumber(1);
      subjectFillQuantity = new BigNumber(1);
      subjectAttemptedFillQuantity = new BigNumber(1);
      subjectTradesData = SetTestUtils.kyberTradeToBytes(kyberTrade);

      subjectExchangeData = {
        maker: subjectMaker,
        taker: subjectTaker,
        makerToken: subjectMakerTokenAddress,
        makerAssetAmount: subjectMakerTokenAmount,
        orderCount: subjectTradesCount,
        fillQuantity: subjectFillQuantity,
        attemptedFillQuantity: subjectAttemptedFillQuantity,
      };
    });

    async function subject(): Promise<string> {
      return kyberNetworkWrapper.exchange.sendTransactionAsync(
        subjectExchangeData,
        subjectTradesData,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it('uses all of the available source token from the kyber wrapper', async () => {
      const existingSourceTokenBalance = await sourceToken.balanceOf.callAsync(kyberNetworkWrapper.address);

      await subject();

      const expectedNewBalance = existingSourceTokenBalance.sub(sourceTokenQuantity);
      const newSourceTokenBalance = await sourceToken.balanceOf.callAsync(kyberNetworkWrapper.address);
      expect(newSourceTokenBalance).to.be.bignumber.equal(expectedNewBalance);
    });

    it('receives correct amount of component token in return', async () => {
      const existingComponentToken = await componentToken.balanceOf.callAsync(kyberNetworkWrapper.address);

      await subject();

      const expectedNewBalance = existingComponentToken.add(maxDestinationQuantity);
      const newComponentTokenBalance = await componentToken.balanceOf.callAsync(kyberNetworkWrapper.address);
      expect(newComponentTokenBalance).to.be.bignumber.equal(expectedNewBalance);
    });

    it('approves the token for transfer to the transferProxy with unlimited allowance', async () => {
      const existingAllowance =
        await componentToken.allowance.callAsync(kyberNetworkWrapper.address, transferProxy.address);

      await subject();

      const expectedNewAllowance = existingAllowance.add(UNLIMITED_ALLOWANCE_IN_BASE_UNITS);
      const newBalance =
        await componentToken.allowance.callAsync(kyberNetworkWrapper.address, transferProxy.address);
      expect(newBalance).to.be.bignumber.equal(expectedNewAllowance);
    });

    describe('when the caller is not the initialized core address', async () => {
      beforeEach(async () => {
        subjectCaller = unauthorizedAddress;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when there is remainder source token as a result of the trade parameters', async () => {
      before(async () => {
        componentTokenAmountToReceive = new BigNumber(50);
      });

      after(async () => {
        componentTokenAmountToReceive = undefined;
      });

      it('only trades up to the specified amount to receive', async () => {
        const existingComponentToken = await componentToken.balanceOf.callAsync(kyberNetworkWrapper.address);

        await subject();

        const expectedNewBalance = existingComponentToken.add(componentTokenAmountToReceive);
        const newComponentTokenBalance = await componentToken.balanceOf.callAsync(kyberNetworkWrapper.address);
        expect(newComponentTokenBalance).to.be.bignumber.equal(expectedNewBalance);
      });

      it('transfers the remainder back to the maker', async () => {
        const existingUserSourceTokenBalance = await sourceToken.balanceOf.callAsync(issuanceOrderMakerAccount);

        await subject();

        const newUserSourceTokenBalance = await sourceToken.balanceOf.callAsync(issuanceOrderMakerAccount);
        const receivedComponentTokenAmount = await componentToken.balanceOf.callAsync(kyberNetworkWrapper.address);

        const sourceTokenUsed = sourceTokenQuantity.sub(newUserSourceTokenBalance.sub(existingUserSourceTokenBalance));
        const conversionRate = receivedComponentTokenAmount.div(sourceTokenUsed);
        const expectedTokenAmountToReceive = sourceTokenUsed.mul(conversionRate).round();
        expect(componentTokenAmountToReceive).to.be.bignumber.equal(expectedTokenAmountToReceive);
      });
    });
  });
});
