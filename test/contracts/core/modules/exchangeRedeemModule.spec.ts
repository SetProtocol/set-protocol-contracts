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
  ExchangeRedeemModuleContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract
} from '@utils/contracts';
import { ether } from '@utils/units';
import { assertTokenBalanceAsync } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { DEFAULT_GAS } from '@utils/constants';
import { LogExchangeRedeem } from '@utils/contract_logs/exchangeRedeemModule';
import { getWeb3 } from '@utils/web3Helper';

import { ExchangeWrapper } from '@utils/wrappers/exchangeWrapper';
import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const Core = artifacts.require('Core');
const ExchangeRedeemModule = artifacts.require('ExchangeRedeemModule');
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const blockchain = new Blockchain(web3);
const setTestUtils = new SetTestUtils(web3);
const setUtils = new SetUtils(web3);
const { expect } = chai;
const { NULL_ADDRESS, ZERO } = SetUtils.CONSTANTS;

contract('ExchangeRedeemModule', accounts => {
  const [
    contractDeployer,
    zeroExOrderMaker,
    exchangeRedeemCaller,
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let exchangeRedeemModule: ExchangeRedeemModuleContract;
  let setTokenFactory: SetTokenFactoryContract;

  const coreWrapper = new CoreWrapper(contractDeployer, contractDeployer);
  const erc20Wrapper = new ERC20Wrapper(contractDeployer);
  const exchangeWrapper = new ExchangeWrapper(contractDeployer);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
    ABIDecoder.addABI(ExchangeRedeemModule.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
    ABIDecoder.removeABI(ExchangeRedeemModule.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    vault = await coreWrapper.deployVaultAsync();
    transferProxy = await coreWrapper.deployTransferProxyAsync();
    core = await coreWrapper.deployCoreAsync(transferProxy, vault);
    exchangeRedeemModule = await coreWrapper.deployExchangeRedeemModuleAsync(
      core,
      vault
    );
    await coreWrapper.addModuleAsync(core, exchangeRedeemModule.address);
    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);

    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#exchangeRedeem', async () => {
    let subjectCaller: Address;
    let subjectExchangeIssueData: ExchangeIssueParams;
    let subjectExchangeOrdersData: Bytes;

    let naturalUnit: BigNumber;
    let setToken: SetTokenContract;
    let receiveToken: StandardTokenMockContract;

    let totalReceiveToken: BigNumber;

    let exchangeRedeemSetAddress: Address;
    let exchangeRedeemQuantity: BigNumber;
    let exchangeRedeemSentTokenExchanges: BigNumber[];
    let exchangeRedeemSentTokens: Address[];
    let exchangeRedeemSentTokenAmounts: BigNumber[];
    let exchangeRedeemReceiveTokens: Address[];
    let exchangeRedeemReceiveTokenAmounts: BigNumber[];

    let zeroExOrder: ZeroExSignedFillOrder;
    let zeroExOrderMakerTokenAmount: BigNumber;
    let zeroExOrderTakerTokenAmount: BigNumber;
    let kyberTrade: KyberTrade;
    let kyberConversionRatePower: BigNumber;

    beforeEach(async () => {
      subjectCaller = exchangeRedeemCaller;

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

      const firstComponent = erc20Wrapper.kyberReserveToken(SetTestUtils.KYBER_RESERVE_SOURCE_TOKEN_ADDRESS);
      const secondComponent = await erc20Wrapper.deployTokenAsync(contractDeployer);
      receiveToken = erc20Wrapper.kyberReserveToken(SetTestUtils.KYBER_RESERVE_DESTINATION_TOKEN_ADDRESS);

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

      zeroExOrderMakerTokenAmount = zeroExOrderMakerTokenAmount || ether(4);
      const kyberDestinationTokenQuantity = ether(2.56);
      totalReceiveToken = zeroExOrderMakerTokenAmount.add(kyberDestinationTokenQuantity);

      exchangeRedeemSetAddress = exchangeRedeemSetAddress || setToken.address;
      exchangeRedeemQuantity = exchangeRedeemQuantity || ether(4);

      exchangeRedeemSentTokenExchanges =
        exchangeRedeemSentTokenExchanges || [SetUtils.EXCHANGES.KYBER, SetUtils.EXCHANGES.ZERO_EX];

      exchangeRedeemSentTokens = exchangeRedeemSentTokens || [firstComponent.address, secondComponent.address];
      exchangeRedeemSentTokenAmounts =
        exchangeRedeemSentTokenAmounts || _.map(componentUnits, unit => unit
          .mul(exchangeRedeemQuantity)
          .div(naturalUnit)
        );

      exchangeRedeemReceiveTokens =
        exchangeRedeemReceiveTokens || [receiveToken.address];

      exchangeRedeemReceiveTokenAmounts =
        exchangeRedeemReceiveTokenAmounts || [totalReceiveToken];

      // Property:                Value                         | Property
      subjectExchangeIssueData = {
        setAddress:             exchangeRedeemSetAddress,          // setAddress
        sentTokenExchanges:     exchangeRedeemSentTokenExchanges,  // sentTokenExchanges
        sentTokens:             exchangeRedeemSentTokens,          // sentToken
        sentTokenAmounts:       exchangeRedeemSentTokenAmounts,    // sentTokenAmount
        quantity:               exchangeRedeemQuantity,            // quantity
        receiveTokens:          exchangeRedeemReceiveTokens,       // receiveTokens
        receiveTokenAmounts:    exchangeRedeemReceiveTokenAmounts, // receiveTokenAmounts
      } as ExchangeIssueParams;

      // Create Kyber trade. Conversion rate pre set on snapshot
      const sourceTokenQuantity = exchangeRedeemSentTokenAmounts[0];
      const maxDestinationQuantity = kyberDestinationTokenQuantity;
      const destinationTokenDecimals = (await receiveToken.decimals.callAsync()).toNumber();
      const sourceTokenDecimals = (await firstComponent.decimals.callAsync()).toNumber();
      kyberConversionRatePower = new BigNumber(10).pow(18 + sourceTokenDecimals - destinationTokenDecimals);

      // NOTE: Kyber Minimum Conversion rates should be < 3.2 x 10**17
      const minimumConversionRate = maxDestinationQuantity.div(sourceTokenQuantity)
                                                          .mul(kyberConversionRatePower)
                                                          .round();

      kyberTrade = {
        sourceToken: firstComponent.address,
        destinationToken: receiveToken.address,
        sourceTokenQuantity: sourceTokenQuantity,
        minimumConversionRate: minimumConversionRate,
        maxDestinationQuantity: maxDestinationQuantity,
      } as KyberTrade;

      // Create 0x order for the second component, using ether(4) sentToken as default
      zeroExOrderTakerTokenAmount = zeroExOrderTakerTokenAmount || exchangeRedeemSentTokenAmounts[1];
      zeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                      // senderAddress
        zeroExOrderMaker,                                  // makerAddress
        NULL_ADDRESS,                                      // takerAddress
        ZERO,                                              // makerFee
        ZERO,                                              // takerFee
        zeroExOrderMakerTokenAmount,                       // makerAssetAmount
        zeroExOrderTakerTokenAmount,                       // takerAssetAmount
        receiveToken.address,                              // makerAssetAddress
        secondComponent.address,                           // takerAssetAddress
        SetUtils.generateSalt(),                           // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,             // exchangeAddress
        NULL_ADDRESS,                                      // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),             // expirationTimeSeconds
        zeroExOrderTakerTokenAmount,                       // amount of zeroExOrder to fill
      );

      subjectExchangeOrdersData =
        subjectExchangeOrdersData || setUtils.generateSerializedOrders([zeroExOrder, kyberTrade]);

      // Approve the receive token to the 0x maker
      await erc20Wrapper.approveTransfersAsync(
        [receiveToken],
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        zeroExOrderMaker
      );

      // Fund the 0x maker with the receive token
      await erc20Wrapper.transferTokenAsync(
        receiveToken,
        zeroExOrderMaker,
        zeroExOrderMakerTokenAmount,
      );

      await erc20Wrapper.approveTransfersAsync(
        [firstComponent, secondComponent],
        transferProxy.address,
        contractDeployer
      );

      // Issue the Set and transfer to the caller
      await coreWrapper.issueSetTokenAsync(
        core,
        setToken.address,
        exchangeRedeemQuantity
      );

      await erc20Wrapper.transferTokenAsync(
        setToken,
        subjectCaller,
        exchangeRedeemQuantity
      );
    });

    afterEach(async () => {
      exchangeRedeemQuantity = undefined;
      exchangeRedeemReceiveTokens = undefined;
      exchangeRedeemReceiveTokenAmounts = undefined;
    });

    async function subject(): Promise<string> {
      return exchangeRedeemModule.exchangeRedeem.sendTransactionAsync(
        subjectExchangeIssueData,
        subjectExchangeOrdersData,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it('redeems the correct quantity of the set for the sender', async () => {
      const existingBalance = await setToken.balanceOf.callAsync(exchangeRedeemCaller);

      await subject();

      await assertTokenBalanceAsync(setToken, existingBalance.sub(exchangeRedeemQuantity), exchangeRedeemCaller);
    });

    it('increments the correct amount of Sent token', async () => {
      const existingBalance = await receiveToken.balanceOf.callAsync(exchangeRedeemCaller);

      await subject();

      const expectedNewBalance = existingBalance.add(totalReceiveToken);
      const newBalance = await receiveToken.balanceOf.callAsync(exchangeRedeemCaller);

      await expect(newBalance).to.be.bignumber.equal(expectedNewBalance);
    });

    it('emits correct LogExchangeRedeem event', async () => {
      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = LogExchangeRedeem(
        setToken.address,
        subjectCaller,
        exchangeRedeemQuantity,
        exchangeRedeemReceiveTokens,
        exchangeRedeemReceiveTokenAmounts,
        exchangeRedeemModule.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });
  });
});
