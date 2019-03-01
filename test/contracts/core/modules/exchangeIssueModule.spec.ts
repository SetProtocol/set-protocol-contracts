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
      vault
    );
    await coreWrapper.addModuleAsync(core, exchangeIssueModule.address);
    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);

    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);
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
    let sentToken: StandardTokenMockContract;

    let totalSentToken: BigNumber;

    let exchangeIssueSetAddress: Address;
    let exchangeIssueQuantity: BigNumber;
    let exchangeIssueSentTokenExchanges: BigNumber[];
    let exchangeIssueSentTokens: Address[];
    let exchangeIssueSentTokenAmounts: BigNumber[];
    let exchangeIssueReceiveTokens: Address[];
    let exchangeIssueReceiveTokenAmounts: BigNumber[];

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
      sentToken = erc20Wrapper.kyberReserveToken(SetTestUtils.KYBER_RESERVE_SOURCE_TOKEN_ADDRESS);

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
        [sentToken],
        transferProxy.address,
        exchangeIssueCaller
      );
      await erc20Wrapper.approveTransfersAsync(
        [secondComponent],
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        zeroExOrderMaker
      );

      const zeroExTakerTokenQuantity = zeroExOrderTakerAssetAmount || ether(4);
      const kyberSourceTokenQuantity = ether(25);
      totalSentToken = zeroExTakerTokenQuantity.add(kyberSourceTokenQuantity);

      // Create issuance order, submitting ether(30) makerToken for ether(4) of the Set with 3 components
      exchangeIssueSetAddress = exchangeIssueSetAddress || setToken.address;

      exchangeIssueQuantity = exchangeIssueQuantity || ether(4);

      exchangeIssueSentTokenExchanges =
        exchangeIssueSentTokenExchanges || [SetUtils.EXCHANGES.KYBER, SetUtils.EXCHANGES.ZERO_EX];

      exchangeIssueSentTokens = exchangeIssueSentTokens || [sentToken.address, sentToken.address];
      exchangeIssueSentTokenAmounts =
        exchangeIssueSentTokenAmounts || [kyberSourceTokenQuantity, zeroExTakerTokenQuantity];

      exchangeIssueReceiveTokens =
        exchangeIssueReceiveTokens || [firstComponent.address, secondComponent.address];

      exchangeIssueReceiveTokenAmounts =
        exchangeIssueReceiveTokenAmounts || _.map(componentUnits, unit => unit
          .mul(exchangeIssueQuantity)
          .div(naturalUnit)
        );

      // Property:                Value                         | Property
      subjectExchangeIssueData = {
        setAddress:             exchangeIssueSetAddress,          // setAddress
        sentTokenExchanges:     exchangeIssueSentTokenExchanges,  // sentTokenExchanges
        sentTokens:             exchangeIssueSentTokens,          // sentToken
        sentTokenAmounts:       exchangeIssueSentTokenAmounts,    // sentTokenAmount
        quantity:               exchangeIssueQuantity,            // quantity
        receiveTokens:          exchangeIssueReceiveTokens,       // requiredComponents
        receiveTokenAmounts:    exchangeIssueReceiveTokenAmounts, // requiredComponentAmounts
      } as ExchangeIssueParams;

      // Create Kyber trade for the second component, using ether(25) sentToken. Conversion rate pre set on snapshot
      const maxDestinationQuantity = exchangeIssueReceiveTokenAmounts[0];
      const componentTokenDecimals = (await firstComponent.decimals.callAsync()).toNumber();
      const sourceTokenDecimals = (await sentToken.decimals.callAsync()).toNumber();
      kyberConversionRatePower = new BigNumber(10).pow(18 + sourceTokenDecimals - componentTokenDecimals);
      const minimumConversionRate = maxDestinationQuantity.div(kyberSourceTokenQuantity)
                                                          .mul(kyberConversionRatePower)
                                                          .round();
      kyberTradeMakerTokenChange = kyberSourceTokenQuantity.sub(
        maxDestinationQuantity.mul(kyberConversionRatePower).div(KYBER_RESERVE_CONFIGURED_RATE).floor());
      kyberTrade = {
        sourceToken: sentToken.address,
        destinationToken: firstComponent.address,
        sourceTokenQuantity: kyberSourceTokenQuantity,
        minimumConversionRate: minimumConversionRate,
        maxDestinationQuantity: maxDestinationQuantity,
      } as KyberTrade;

      // Create 0x order for the second component, using ether(4) sentToken as default
      zeroExOrderMakerTokenAmount = zeroExOrderMakerTokenAmount || exchangeIssueReceiveTokenAmounts[1];
      zeroExOrderTakerAssetAmount = zeroExOrderTakerAssetAmount || ether(4);
      zeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                      // senderAddress
        zeroExOrderMaker,                                  // makerAddress
        NULL_ADDRESS,                                      // takerAddress
        ZERO,                                              // makerFee
        ZERO,                                              // takerFee
        zeroExOrderMakerTokenAmount,                       // makerAssetAmount
        zeroExTakerTokenQuantity,                          // takerAssetAmount
        secondComponent.address,                           // makerAssetAddress
        sentToken.address,                                 // takerAssetAddress
        SetUtils.generateSalt(),                           // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,             // exchangeAddress
        NULL_ADDRESS,                                      // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),             // expirationTimeSeconds
        zeroExOrderTakerAssetAmount,                       // amount of zeroExOrder to fill
      );

      subjectExchangeOrdersData =
        subjectExchangeOrdersData || setUtils.generateSerializedOrders([zeroExOrder, kyberTrade]);
      subjectCaller = exchangeIssueCaller;
    });

    afterEach(async () => {
      exchangeIssueQuantity = undefined;
      exchangeIssueReceiveTokens = undefined;
      exchangeIssueReceiveTokenAmounts = undefined;
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
      const existingBalance = await sentToken.balanceOf.callAsync(exchangeIssueCaller);
      await assertTokenBalanceAsync(sentToken, DEPLOYED_TOKEN_QUANTITY, exchangeIssueCaller);

      await subject();

      // TODO: Change from unused kyber source token is not being calculated correctly, off by 3 * 10 ** -26
      const expectedNewBalance = existingBalance.sub(totalSentToken)
                                                .add(kyberTradeMakerTokenChange);
      const newBalance = await sentToken.balanceOf.callAsync(exchangeIssueCaller);

      await expect(newBalance.toPrecision(26)).to.be.bignumber.equal(expectedNewBalance.toPrecision(26));
    });

    it('transfers the maker token amount from the maker to the 0x maker', async () => {
      const zeroExMakerPaymentTokenBalance = await sentToken.balanceOf.callAsync(zeroExOrderMaker);

      await subject();

      const expectedMakerPaymentTokenBalance = zeroExMakerPaymentTokenBalance.add(zeroExOrder.takerAssetAmount);
      const actualMakerPaymentTokenBalance = await sentToken.balanceOf.callAsync(zeroExOrderMaker);
      await expect(expectedMakerPaymentTokenBalance).to.be.bignumber.equal(actualMakerPaymentTokenBalance);
    });

    it('emits correct LogExchangeIssue event', async () => {
      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = LogExchangeIssue(
        setToken.address,
        subjectCaller,
        exchangeIssueQuantity,
        exchangeIssueSentTokens,
        exchangeIssueSentTokenAmounts,
        exchangeIssueModule.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when a receiveToken is not a component of the Set', async () => {
      before(async () => {
        const firstComponent = erc20Wrapper.kyberReserveToken(SetTestUtils.KYBER_RESERVE_SOURCE_TOKEN_ADDRESS);
        const notComponent = await erc20Wrapper.deployTokenAsync(contractDeployer);

        exchangeIssueReceiveTokens = [firstComponent.address, notComponent.address];
      });

      after(async () => {
        exchangeIssueReceiveTokens = undefined;
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

    describe('when the receive tokens is empty', async () => {
      before(async () => {
        exchangeIssueReceiveTokens = [];
      });

     after(async () => {
        exchangeIssueReceiveTokens = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the receive tokens is insufficient', async () => {
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

    describe('when the receive tokens and amount lengths differ', async () => {
      before(async () => {
        exchangeIssueReceiveTokens = [notExchangeIssueCaller];
      });

      after(async () => {
        exchangeIssueReceiveTokens = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the sent token exchange length differ from other sent inputs', async () => {
      before(async () => {
        exchangeIssueSentTokenExchanges = [SetUtils.EXCHANGES.ZERO_EX];
      });

      after(async () => {
        exchangeIssueSentTokenExchanges = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the sent token length differ from other sent inputs', async () => {
      before(async () => {
        const sentToken = erc20Wrapper.kyberReserveToken(SetTestUtils.KYBER_RESERVE_SOURCE_TOKEN_ADDRESS);

        exchangeIssueSentTokens = [sentToken.address];
      });

      after(async () => {
        exchangeIssueSentTokens = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the sent token amount length differ from other sent inputs', async () => {
      before(async () => {
        exchangeIssueSentTokenAmounts = [new BigNumber(1)];
      });

      after(async () => {
        exchangeIssueSentTokenAmounts = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the sent token exchange is not valid', async () => {
      before(async () => {
        exchangeIssueSentTokenExchanges = [SetUtils.EXCHANGES.ZERO_EX, new BigNumber(5)];
      });

      after(async () => {
        exchangeIssueSentTokenExchanges = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the duplicate exchange header is provided', async () => {
      beforeEach(async () => {
        const firstOrder = setUtils.generateSerializedOrders([zeroExOrder]);
        const secondOrder = setUtils.generateSerializedOrders([zeroExOrder]).slice(2);

        subjectExchangeOrdersData = firstOrder.concat(secondOrder);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when a required component is not a member of the setAddress', async () => {
      before(async () => {
        const notComponent = notExchangeIssueCaller;
        exchangeIssueReceiveTokens = [notComponent, notComponent];
      });

      after(async () => {
        exchangeIssueReceiveTokens = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when a receive token amount is 0', async () => {
      before(async () => {
        exchangeIssueReceiveTokenAmounts = [ZERO, ZERO];
      });

      after(async () => {
        exchangeIssueReceiveTokenAmounts = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
