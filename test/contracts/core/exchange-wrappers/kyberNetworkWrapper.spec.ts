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
import { DEFAULT_GAS, UNLIMITED_ALLOWANCE_IN_BASE_UNITS } from '@utils/constants';
import { expectRevertError } from '@utils/tokenAssertions';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { ExchangeHelper } from '@utils/helpers/exchangeHelper';
import { KyberNetworkHelper } from '@utils/helpers/kyberNetworkHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const { SetProtocolTestUtils: SetTestUtils } = setProtocolUtils;
const blockchain = new Blockchain(web3);

contract('KyberNetworkWrapper', accounts => {
  const [
    deployerAccount,
    kyberReserveOperator,
    unauthorizedAddress,
    issuanceOrderMakerAccount,
    callerAccount,
    deployedCoreAddress,
  ] = accounts;

  const coreHelper = new CoreHelper(deployerAccount, deployerAccount);
  const erc20Helper = new ERC20Helper(deployerAccount);
  const exchangeHelper = new ExchangeHelper(deployerAccount);
  const kyberNetworkHelper = new KyberNetworkHelper();

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;

  let kyberNetworkWrapper: KyberNetworkWrapperContract;

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    core = await coreHelper.deployCoreMockAsync(transferProxy, vault);
    await coreHelper.addModuleAsync(core, callerAccount);

    await kyberNetworkHelper.setup();
    await kyberNetworkHelper.fundReserveWithEth(
      kyberReserveOperator,
      ether(90),
    );

    kyberNetworkWrapper = await exchangeHelper.deployKyberNetworkWrapper(
      core.address,
      kyberNetworkHelper.kyberNetworkProxy,
      transferProxy
    );
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#conversionRate', async () => {
    let subjectSendTokens: Address[];
    let subjectReceiveTokens: Address[];
    let subjectQuantities: BigNumber[];
    let subjectCaller: Address;

    const token1BuyRate = ether(2);
    const token2BuyRate = ether(6);
    const token1SellRate = ether(1);
    const token2SellRate = ether(2);

    const operatorToken1SupplyQuantity = ether(1000000000);
    const operatorToken2SupplyQuantity = ether(1000000000);

    beforeEach(async () => {
      const token = await erc20Helper.deployTokenAsync(kyberReserveOperator);
      const token2 = await erc20Helper.deployTokenAsync(kyberReserveOperator);

      await kyberNetworkHelper.enableTokensForReserve(token.address);
      await kyberNetworkHelper.enableTokensForReserve(token2.address);

      await kyberNetworkHelper.setUpConversionRatesRaw(
        [token.address, token2.address],
        [token1BuyRate, token2BuyRate],
        [token1SellRate, token2SellRate],
      );

      await kyberNetworkHelper.approveToReserve(
        token,
        operatorToken1SupplyQuantity,
        kyberReserveOperator,
      );

      await kyberNetworkHelper.approveToReserve(
        token2,
        operatorToken2SupplyQuantity,
        kyberReserveOperator,
      );

      const sendTokenAddress = token.address;
      const receiveTokenAddress = token2.address;

      subjectSendTokens = [sendTokenAddress, sendTokenAddress];
      subjectReceiveTokens = [receiveTokenAddress, receiveTokenAddress];
      subjectQuantities = [new BigNumber(10000), new BigNumber(10000)];
      subjectCaller = deployedCoreAddress;
    });

    async function subject(): Promise<[BigNumber[], BigNumber[]]> {
      return await kyberNetworkWrapper.conversionRate.callAsync(
        subjectSendTokens,
        subjectReceiveTokens,
        subjectQuantities,
        { from: subjectCaller }
      );
    }

    it('returns the correct rates set on the reserve contract', async () => {
      let firstRate: BigNumber;
      let secondRate: BigNumber;
      let firstSlippage: BigNumber;
      let secondSlippage: BigNumber;
      const results = await subject();
      [[firstRate, secondRate], [firstSlippage, secondSlippage]] = results;

      const expectedRate = token2BuyRate;
      expect(firstRate).to.be.bignumber.equal(expectedRate);

      const expectedSecondRate = token2BuyRate;
      expect(secondRate).to.be.bignumber.equal(expectedSecondRate);

      const slippagePercentage = new BigNumber(100).sub(kyberNetworkHelper.defaultSlippagePercentage);
      const expectedSlippage = expectedRate.mul(slippagePercentage).div(100);
      expect(firstSlippage).to.be.bignumber.equal(expectedSlippage);

      const expectedSecondSlippage = expectedSecondRate.mul(slippagePercentage).div(100);
      expect(secondSlippage).to.be.bignumber.equal(expectedSecondSlippage);
    });
  });

  describe('#exchange', async () => {
    let subjectCaller: Address;
    let subjectTradesCount: BigNumber;
    let subjectTradesData: Bytes;

    let subjectExchangeData: ExchangeData;

    let maxDestinationQuantity: BigNumber;
    let minimumConversionRate: BigNumber;

    let sourceToken: StandardTokenMockContract;
    let sourceTokenDecimals: number;
    let sourceTokenQuantity: BigNumber;

    let componentToken: StandardTokenMockContract;
    let componentTokenDecimals: number;
    let componentTokenAmountToReceive: BigNumber;

    const componentTokenBuyRate = ether(1);
    const sourceTokenBuyRate = ether(2);
    const componentTokenSellRate = ether(1);
    const sourceTokenSellRate = ether(1).div(2);

    const componentTokenSupplyQuantity = ether(1000000000);

    beforeEach(async () => {
      sourceToken = await erc20Helper.deployTokenAsync(kyberReserveOperator);
      componentToken = await erc20Helper.deployTokenAsync(kyberReserveOperator);

      await kyberNetworkHelper.enableTokensForReserve(sourceToken.address);
      await kyberNetworkHelper.enableTokensForReserve(componentToken.address);

      await kyberNetworkHelper.setUpConversionRatesRaw(
        [componentToken.address, sourceToken.address],
        [componentTokenBuyRate, sourceTokenBuyRate],
        [componentTokenSellRate, sourceTokenSellRate],
      );

      await kyberNetworkHelper.approveToReserve(
        componentToken,
        componentTokenSupplyQuantity,
        kyberReserveOperator,
      );

      maxDestinationQuantity = componentTokenAmountToReceive || new BigNumber(1000);
      sourceTokenQuantity = new BigNumber(2000);

      await erc20Helper.transferTokenAsync(
        sourceToken,
        kyberNetworkWrapper.address,
        sourceTokenQuantity,
        kyberReserveOperator
      );

      componentTokenDecimals = (await componentToken.decimals.callAsync()).toNumber();
      sourceTokenDecimals = (await sourceToken.decimals.callAsync()).toNumber();
      const conversionRatePower = new BigNumber(10).pow(18 + sourceTokenDecimals - componentTokenDecimals);
      minimumConversionRate = maxDestinationQuantity.div(sourceTokenQuantity).mul(conversionRatePower).round();

      const kyberTrade = {
        destinationToken: componentToken.address,
        sourceToken: sourceToken.address,
        sourceTokenQuantity: sourceTokenQuantity,
        minimumConversionRate: minimumConversionRate,
        maxDestinationQuantity: maxDestinationQuantity,
      } as KyberTrade;

      subjectCaller = callerAccount;
      subjectTradesCount = new BigNumber(1);
      subjectTradesData = SetTestUtils.kyberTradeToBytes(kyberTrade);

      subjectExchangeData = {
        caller: subjectCaller,
        orderCount: subjectTradesCount,
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

    describe('when there are two Kyber trades', async () => {
      let secondTradeSourceQuantity: BigNumber;

      beforeEach(async () => {
        secondTradeSourceQuantity = sourceTokenQuantity.mul(2);

        await erc20Helper.transferTokenAsync(
          sourceToken,
          kyberNetworkWrapper.address,
          secondTradeSourceQuantity,
          kyberReserveOperator
        );

        maxDestinationQuantity = maxDestinationQuantity.div(2).round();

        const conversionRatePower = new BigNumber(10).pow(18 + sourceTokenDecimals - componentTokenDecimals);
        const minimumConversionRateOne = maxDestinationQuantity
                                          .div(sourceTokenQuantity)
                                          .mul(conversionRatePower)
                                          .round();

        const kyberTradeOne = {
          destinationToken: componentToken.address,
          sourceToken: sourceToken.address,
          sourceTokenQuantity: sourceTokenQuantity,
          minimumConversionRate: minimumConversionRateOne,
          maxDestinationQuantity: maxDestinationQuantity,
        } as KyberTrade;

        const minimumConversionRateTwo = maxDestinationQuantity
                                          .div(secondTradeSourceQuantity)
                                          .mul(conversionRatePower)
                                          .round();

        const kyberTradeTwo = {
          destinationToken: componentToken.address,
          sourceToken: sourceToken.address,
          sourceTokenQuantity: secondTradeSourceQuantity,
          minimumConversionRate: minimumConversionRateTwo,
          maxDestinationQuantity: maxDestinationQuantity,
        } as KyberTrade;

        const kyberTradeOneBytes = SetTestUtils.kyberTradeToBytes(kyberTradeOne);
        const kyberTradeTwoBytes = SetTestUtils.kyberTradeToBytes(kyberTradeTwo);

        subjectExchangeData.orderCount = new BigNumber(2);
        subjectTradesData = kyberTradeOneBytes.concat(kyberTradeTwoBytes.slice(2));
      });

      it('uses all of the available source token from the kyber wrapper', async () => {
        const existingSourceTokenBalance = await sourceToken.balanceOf.callAsync(kyberNetworkWrapper.address);

        await subject();

        const expectedNewBalance = existingSourceTokenBalance.sub(sourceTokenQuantity).sub(secondTradeSourceQuantity);
        const newSourceTokenBalance = await sourceToken.balanceOf.callAsync(kyberNetworkWrapper.address);
        expect(newSourceTokenBalance).to.be.bignumber.equal(expectedNewBalance);
      });

      it('receives correct amount of component token in return', async () => {
        const existingComponentToken = await componentToken.balanceOf.callAsync(kyberNetworkWrapper.address);

        await subject();

        const expectedNewBalance = existingComponentToken.add(maxDestinationQuantity.mul(2));
        const newComponentTokenBalance = await componentToken.balanceOf.callAsync(kyberNetworkWrapper.address);
        expect(newComponentTokenBalance).to.be.bignumber.equal(expectedNewBalance);
      });
    });
  });
});
