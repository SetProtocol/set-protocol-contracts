require('module-alias/register');

import * as _ from 'lodash';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';
import { Address, Bytes } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  StandardTokenMockContract,
  TakerWalletWrapperContract,
  TransferProxyContract,
  VaultContract,
} from '@utils/contracts';
import { ExchangeData } from '@utils/orders';
import { Blockchain } from '@utils/blockchain';
import { generateTakerWalletOrders } from '@utils/orders';
import { DEFAULT_GAS, DEPLOYED_TOKEN_QUANTITY, UNLIMITED_ALLOWANCE_IN_BASE_UNITS } from '@utils/constants';
import { expectRevertError } from '@utils/tokenAssertions';
import { getWeb3 } from '@utils/web3Helper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';
import { ExchangeWrapper } from '@utils/wrappers/exchangeWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { SetProtocolUtils: SetUtils } = setProtocolUtils;
const { expect } = chai;
const blockchain = new Blockchain(web3);
const { ZERO } = SetUtils.CONSTANTS;


contract('TakerWalletWrapper', accounts => {
  const [
    deployerAccount,
    makerAccount,
    takerAccount,
    unauthorizedAddress,
    issuanceOrderModuleAccount,
  ] = accounts;

  const coreWrapper = new CoreWrapper(deployerAccount, deployerAccount);
  const erc20Wrapper = new ERC20Wrapper(deployerAccount);
  const exchangeWrapper = new ExchangeWrapper(deployerAccount);

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;

  let takerWalletWrapper: TakerWalletWrapperContract;
  let components: StandardTokenMockContract[] = [];
  let componentCount: number = 1;


  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    transferProxy = await coreWrapper.deployTransferProxyAsync();
    vault = await coreWrapper.deployVaultAsync();
    core = await coreWrapper.deployCoreMockAsync(transferProxy, vault);
    await coreWrapper.addModuleAsync(core, issuanceOrderModuleAccount);

    takerWalletWrapper = await exchangeWrapper.deployTakerWalletExchangeWrapper(core.address, transferProxy);
    await coreWrapper.addAuthorizationAsync(transferProxy, takerWalletWrapper.address);

    components = await erc20Wrapper.deployTokensAsync(componentCount, takerAccount);
    await erc20Wrapper.approveTransfersAsync(components, transferProxy.address, takerAccount);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#exchange', async () => {
    let subjectCaller: Address;
    let subjectMakerAccount: Address;
    let subjectTakerAccount: Address;
    let subjectMakerTokenAddress: Address;
    let subjectMakerTokenAmount: BigNumber;
    let subjectOrderCount: BigNumber;
    let subjectFillQuantity: BigNumber;
    let subjectAttemptedFillQuantity: BigNumber;
    let subjectTakerOrdersData: Bytes;

    let subjectExchangeData: ExchangeData;

    let componentToken: StandardTokenMockContract;
    const transferAmount: BigNumber = DEPLOYED_TOKEN_QUANTITY.div(2);

    beforeEach(async () => {
      componentToken = _.first(components);
      const componentAddresses = _.map(components, token => token.address);
      const transferAmounts = _.map(components, token => transferAmount);

      subjectCaller = issuanceOrderModuleAccount;
      subjectMakerAccount = makerAccount;
      subjectTakerAccount = takerAccount;
      subjectMakerTokenAddress = componentToken.address;
      subjectMakerTokenAmount = ZERO;
      subjectOrderCount = new BigNumber(componentAddresses.length);
      subjectFillQuantity = new BigNumber(1);
      subjectAttemptedFillQuantity = new BigNumber(1);
      subjectTakerOrdersData = generateTakerWalletOrders(componentAddresses, transferAmounts);

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

    async function subject(): Promise<string> {
      return takerWalletWrapper.exchange.sendTransactionAsync(
        subjectExchangeData,
        subjectTakerOrdersData,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it('transfers the token from the taker', async () => {
      const existingBalance = await componentToken.balanceOf.callAsync(takerAccount);

      await subject();

      const expectedNewBalance = existingBalance.sub(transferAmount);
      const newBalance = await componentToken.balanceOf.callAsync(takerAccount);
      expect(newBalance).to.be.bignumber.equal(expectedNewBalance);
    });

    it('transfers the token to the wrapper contract', async () => {
      const existingBalance = await componentToken.balanceOf.callAsync(takerWalletWrapper.address);

      await subject();

      const expectedNewBalance = existingBalance.add(transferAmount);
      const newBalance = await componentToken.balanceOf.callAsync(takerWalletWrapper.address);
      expect(newBalance).to.be.bignumber.equal(expectedNewBalance);
    });

    it('approves the tokens for transfer to the transferProxy with unlimited allowance', async () => {
      const existingAllowance =
        await componentToken.allowance.callAsync(takerWalletWrapper.address, transferProxy.address);

      await subject();

      const expectedNewAllowance = existingAllowance.add(UNLIMITED_ALLOWANCE_IN_BASE_UNITS);
      const newBalance =
        await componentToken.allowance.callAsync(takerWalletWrapper.address, transferProxy.address);
      expect(newBalance).to.be.bignumber.equal(expectedNewAllowance);
    });

    describe('when the caller is not the deployed core address', async () => {
      beforeEach(async () => {
        subjectCaller = unauthorizedAddress;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the ordersData contains multiple tokens to transfer', async() => {
      before(async () => {
        componentCount = 3;
      });

      it('transfers the tokens from the taker', async () => {
        const existingTokenBalances = await erc20Wrapper.getTokenBalances(components, takerAccount);

        await subject();

        const expectedNewBalances = _.map(existingTokenBalances, balance => balance.sub(transferAmount));
        const newTokenBalances = await erc20Wrapper.getTokenBalances(components, takerAccount);
        expect(newTokenBalances).to.eql(expectedNewBalances);
      });

      it('transfers the token to the wrapper contract', async () => {
        const existingTokenBalances = await erc20Wrapper.getTokenBalances(components, takerWalletWrapper.address);

        await subject();

        const expectedNewBalances = _.map(existingTokenBalances, balance => balance.add(transferAmount));
        const newTokenBalances = await erc20Wrapper.getTokenBalances(components, takerWalletWrapper.address);
        expect(newTokenBalances).to.eql(expectedNewBalances);
      });

      it('approves the tokens for transfer to the transferProxy with unlimited allowance', async () => {
        const existingAllowances =
          await erc20Wrapper.getTokenAllowances(components, takerWalletWrapper.address, transferProxy.address);

        await subject();

        const expectedNewAllowances =
          _.map(existingAllowances, allowance => allowance.add(UNLIMITED_ALLOWANCE_IN_BASE_UNITS));
        const newAllowances =
          await erc20Wrapper.getTokenAllowances(components, takerWalletWrapper.address, transferProxy.address);
        expect(newAllowances).to.eql(expectedNewAllowances);
      });
    });
  });
});
