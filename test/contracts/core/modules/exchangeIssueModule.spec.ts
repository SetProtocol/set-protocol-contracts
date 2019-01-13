require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import {
  Address,
  Bytes,
  ExchangeIssueParams,
  KyberTrade,
  ZeroExSignedFillOrder
} from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  ExchangeIssueModuleContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract
} from '@utils/contracts';
import { ether } from '@utils/units';
import { assertTokenBalanceAsync, expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { DEFAULT_GAS, DEPLOYED_TOKEN_QUANTITY, KYBER_RESERVE_CONFIGURED_RATE } from '@utils/constants';
import { LogExchangeIssue } from '@utils/contract_logs/exchangeIssueModule';
import { generateOrdersDataWithIncorrectExchange } from '@utils/orders';
import { getWeb3 } from '@utils/web3Helper';

import { ExchangeWrapper } from '@utils/wrappers/exchangeWrapper';
import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const Core = artifacts.require('Core');
const ExchangeIssueModule = artifacts.require('ExchangeIssueModule');
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const blockchain = new Blockchain(web3);
const setTestUtils = new SetTestUtils(web3);
const setUtils = new SetUtils(web3);
const { expect } = chai;
const { NULL_ADDRESS, ZERO } = SetUtils.CONSTANTS;

contract('ExchangeIssueModule', accounts => {
  const [
    contractDeployer,
    notExchangeIssueCaller,
    zeroExOrderMaker,
    exchangeIssueCaller,
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let exchangeIssueModule: ExchangeIssueModuleContract;
  let setTokenFactory: SetTokenFactoryContract;

  const coreWrapper = new CoreWrapper(contractDeployer, contractDeployer);
  const erc20Wrapper = new ERC20Wrapper(contractDeployer);
  const exchangeWrapper = new ExchangeWrapper(contractDeployer);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
    ABIDecoder.addABI(ExchangeIssueModule.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
    ABIDecoder.removeABI(ExchangeIssueModule.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    vault = await coreWrapper.deployVaultAsync();
    transferProxy = await coreWrapper.deployTransferProxyAsync();
    core = await coreWrapper.deployCoreAsync(transferProxy, vault);
    exchangeIssueModule = await coreWrapper.deployExchangeIssueModuleAsync(
      core,
      transferProxy,
      vault
    );
    await coreWrapper.addModuleAsync(core, exchangeIssueModule.address);
    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);

    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);
    await coreWrapper.addAuthorizationAsync(transferProxy, exchangeIssueModule.address);
    await coreWrapper.addAuthorizationAsync(vault, exchangeIssueModule.address);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#exchangeIssue', async () => {
    let subjectCaller: Address;
    let subjectExchangeIssueData: ExchangeIssueParams;
    let subjectExchangeOrdersData: Bytes;

    let naturalUnit: BigNumber;
    let setToken: SetTokenContract;
    let paymentToken: StandardTokenMockContract;

    let exchangeIssueSetAddress: Address;
    let exchangeIssueQuantity: BigNumber;
    let exchangeIssuePaymentTokenAmount: BigNumber;
    let exchangeIssueRequiredComponents: Address[];
    let exchangeIssueRequiredComponentAmounts: BigNumber[];

    let zeroExOrder: ZeroExSignedFillOrder;
    let zeroExOrderMakerTokenAmount: BigNumber;
    let zeroExOrderTakerAssetAmount: BigNumber;
    let kyberTrade: KyberTrade;
    let kyberTradeMakerTokenChange: BigNumber;
    let kyberConversionRatePower: BigNumber;

    beforeEach(async () => {
      await exchangeWrapper.deployAndAuthorizeZeroExExchangeWrapper(
        core,
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        SetTestUtils.ZERO_EX_TOKEN_ADDRESS,
        transferProxy
      );
      await exchangeWrapper.deployAndAuthorizeKyberNetworkWrapper(
        core,
        SetTestUtils.KYBER_NETWORK_PROXY_ADDRESS,
        transferProxy
      );

      const firstComponent = erc20Wrapper.kyberReserveToken(SetTestUtils.KYBER_RESERVE_DESTINATION_TOKEN_ADDRESS);
      const secondComponent = await erc20Wrapper.deployTokenAsync(zeroExOrderMaker);
      paymentToken = erc20Wrapper.kyberReserveToken(SetTestUtils.KYBER_RESERVE_SOURCE_TOKEN_ADDRESS);

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

      await erc20Wrapper.approveTransfersAsync(
        [paymentToken],
        transferProxy.address,
        exchangeIssueCaller
      );
      await erc20Wrapper.approveTransfersAsync(
        [secondComponent],
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        zeroExOrderMaker
      );

      // Create issuance order, submitting ether(30) makerToken for ether(4) of the Set with 3 components
      exchangeIssueQuantity = exchangeIssueQuantity || ether(4);
      exchangeIssueRequiredComponents =
        exchangeIssueRequiredComponents || [firstComponent.address, secondComponent.address];
      exchangeIssueRequiredComponentAmounts =
        exchangeIssueRequiredComponentAmounts || _.map(componentUnits, unit => unit
          .mul(exchangeIssueQuantity)
          .div(naturalUnit)
        );

      exchangeIssuePaymentTokenAmount = exchangeIssuePaymentTokenAmount || ether(29);

      // Property:                Value                          | Default                 | Property
      subjectExchangeIssueData = {
        setAddress:               exchangeIssueSetAddress       || setToken.address,        // setAddress
        paymentToken:             paymentToken.address,                                     // paymentToken
        paymentTokenAmount:       exchangeIssuePaymentTokenAmount,                          // paymentTokenAmount
        quantity:                 exchangeIssueQuantity,                                    // quantity
        requiredComponents:       exchangeIssueRequiredComponents,                          // requiredComponents
        requiredComponentAmounts: exchangeIssueRequiredComponentAmounts,                    // requiredComponentAmounts
      } as ExchangeIssueParams;

      // Create Kyber trade for the third component, using ether(25) makerToken. Conversion rate pre set on snapshot
      const sourceTokenQuantity = ether(25);
      const maxDestinationQuantity = exchangeIssueRequiredComponentAmounts[0];
      const componentTokenDecimals = (await firstComponent.decimals.callAsync()).toNumber();
      const sourceTokenDecimals = (await paymentToken.decimals.callAsync()).toNumber();
      kyberConversionRatePower = new BigNumber(10).pow(18 + sourceTokenDecimals - componentTokenDecimals);
      const minimumConversionRate = maxDestinationQuantity.div(sourceTokenQuantity)
                                                          .mul(kyberConversionRatePower)
                                                          .round();
      kyberTradeMakerTokenChange = sourceTokenQuantity.sub(
        maxDestinationQuantity.mul(kyberConversionRatePower).div(KYBER_RESERVE_CONFIGURED_RATE).floor());
      kyberTrade = {
        sourceToken: paymentToken.address,
        destinationToken: firstComponent.address,
        sourceTokenQuantity: sourceTokenQuantity,
        minimumConversionRate: minimumConversionRate,
        maxDestinationQuantity: maxDestinationQuantity,
      } as KyberTrade;

      // Create 0x order for the second component, using ether(4) paymentToken as default
      zeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                     // senderAddress
        zeroExOrderMaker,                                 // makerAddress
        NULL_ADDRESS,                                     // takerAddress
        ZERO,                                             // makerFee
        ZERO,                                             // takerFee
        zeroExOrderMakerTokenAmount || exchangeIssueRequiredComponentAmounts[1], // makerAssetAmount
        zeroExOrderTakerAssetAmount || ether(4),          // takerAssetAmount
        secondComponent.address,                          // makerAssetAddress
        paymentToken.address,                               // takerAssetAddress
        SetUtils.generateSalt(),                          // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,            // exchangeAddress
        NULL_ADDRESS,                                     // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),            // expirationTimeSeconds
        zeroExOrderTakerAssetAmount || ether(4),          // amount of zeroExOrder to fill
      );

      subjectExchangeOrdersData = setUtils.generateSerializedOrders([zeroExOrder, kyberTrade]);
      subjectCaller = exchangeIssueCaller;
    });

    afterEach(async () => {
      exchangeIssueQuantity = undefined;
      exchangeIssuePaymentTokenAmount = undefined;
      exchangeIssueRequiredComponents = undefined;
      exchangeIssueRequiredComponentAmounts = undefined;
    });

    async function subject(): Promise<string> {
      return exchangeIssueModule.exchangeIssue.sendTransactionAsync(
        subjectExchangeIssueData,
        subjectExchangeOrdersData,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it('mints the correct quantity of the set for the sender', async () => {
      const existingBalance = await setToken.balanceOf.callAsync(exchangeIssueCaller);

      await subject();

      await assertTokenBalanceAsync(setToken, existingBalance.add(exchangeIssueQuantity), exchangeIssueCaller);
    });

    it('transfers the maker token amount from the maker, and returns change from Kyber', async () => {
      const existingBalance = await paymentToken.balanceOf.callAsync(exchangeIssueCaller);
      await assertTokenBalanceAsync(paymentToken, DEPLOYED_TOKEN_QUANTITY, exchangeIssueCaller);

      await subject();

      // TODO: Change from unused kyber source token is not being calculated correctly, off by 3 * 10 ** -26
      const expectedNewBalance = existingBalance.sub(subjectExchangeIssueData.paymentTokenAmount)
                                                .add(kyberTradeMakerTokenChange);
      const newBalance = await paymentToken.balanceOf.callAsync(exchangeIssueCaller);
      await expect(newBalance.toPrecision(26)).to.be.bignumber.equal(expectedNewBalance.toPrecision(26));
    });

    it('transfers the maker token amount from the maker to the 0x maker', async () => {
      const zeroExMakerPaymentTokenBalance = await paymentToken.balanceOf.callAsync(zeroExOrderMaker);

      await subject();

      const expectedMakerPaymentTokenBalance = zeroExMakerPaymentTokenBalance.add(zeroExOrder.takerAssetAmount);
      const actualMakerPaymentTokenBalance = await paymentToken.balanceOf.callAsync(zeroExOrderMaker);
      await expect(expectedMakerPaymentTokenBalance).to.be.bignumber.equal(actualMakerPaymentTokenBalance);
    });

    it('emits correct LogFill event', async () => {
      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = LogExchangeIssue(
        setToken.address,
        subjectCaller,
        paymentToken.address,
        exchangeIssueQuantity,
        exchangeIssuePaymentTokenAmount,
        exchangeIssueModule.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when an encoded exchangeId is invalid', async () => {
      beforeEach(async () => {
        subjectExchangeOrdersData = generateOrdersDataWithIncorrectExchange();
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when quantity is zero', async () => {
      before(async () => {
        exchangeIssueQuantity = ZERO;
      });

     after(async () => {
        exchangeIssueQuantity = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when payment token amount is zero', async () => {
      before(async () => {
        exchangeIssuePaymentTokenAmount = ZERO;
      });

     after(async () => {
        exchangeIssuePaymentTokenAmount = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

        describe('when the set was not created through core', async () => {
      before(async () => {
        exchangeIssueSetAddress = NULL_ADDRESS;
      });

      after(async () => {
        exchangeIssueSetAddress = undefined;
       });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the issue quantity is not a multiple of the natural unit of the set', async () => {
      before(async () => {
        exchangeIssueQuantity = ether(3); // naturalUnit = ether(2);
      });

      after(async () => {
        exchangeIssueQuantity = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the required components is empty', async () => {
      before(async () => {
        exchangeIssueRequiredComponents = [];
      });

     after(async () => {
        exchangeIssueRequiredComponents = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the acquired components is insufficient', async () => {
      before(async () => {
        zeroExOrderMakerTokenAmount = ether(1);
      });

     after(async () => {
        zeroExOrderMakerTokenAmount = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when more payment token is used', async () => {
      before(async () => {
        zeroExOrderTakerAssetAmount = ether(100);
      });

     after(async () => {
        zeroExOrderTakerAssetAmount = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the required components and amount lengths differ', async () => {
      before(async () => {
        exchangeIssueRequiredComponents = [notExchangeIssueCaller];
      });

      after(async () => {
        exchangeIssueRequiredComponents = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when a required component is not a member of the setAddress', async () => {
      before(async () => {
        const notComponent = notExchangeIssueCaller;
        exchangeIssueRequiredComponents = [notComponent, notComponent];
      });

      after(async () => {
        exchangeIssueRequiredComponents = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when a required component amount is 0', async () => {
      before(async () => {
        exchangeIssueRequiredComponentAmounts = [ZERO, ZERO];
      });

      after(async () => {
        exchangeIssueRequiredComponentAmounts = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
