require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address, Bytes, ExchangeIssuanceParams, ZeroExSignedFillOrder } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  PayableExchangeIssuanceContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  SetTokenContract,
  SetTokenFactoryContract,
  WethMockContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';
import {
  DEFAULT_GAS,
  DEFAULT_REBALANCING_NATURAL_UNIT,
  ONE_DAY_IN_SECONDS,
} from '@utils/constants';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';
import { RebalancingWrapper } from '@utils/wrappers/rebalancingWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);
const Core = artifacts.require('Core');
const PayableExchangeIssuance = artifacts.require('PayableExchangeIssuance');

const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setUtils = new SetUtils(web3);
const { NULL_ADDRESS, ZERO } = SetUtils.CONSTANTS;

contract('PayableExchangeIssuance::Scenarios', accounts => {
  const [
    ownerAccount,
    tokenPurchaser,
    zeroExOrderMaker,
  ] = accounts;

  let core: CoreContract;
  let rebalancingSetTokenFactory: RebalancingSetTokenFactoryContract;
  let setTokenFactory: SetTokenFactoryContract;
  let payableExchangeIssuance: PayableExchangeIssuanceContract;
  let weth: WethMockContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);
  const rebalancingWrapper = new RebalancingWrapper(
    ownerAccount,
    coreWrapper,
    erc20Wrapper,
    blockchain
  );

  before(async () => {
    ABIDecoder.addABI(Core.abi);
    ABIDecoder.addABI(PayableExchangeIssuance.abi);

    core = await coreWrapper.getDeployedCoreAsync();
    setTokenFactory = await coreWrapper.getDeployedSetTokenFactoryAsync();
    rebalancingSetTokenFactory = await coreWrapper.getDeployedRebalancingSetTokenFactoryAsync();

    weth = await erc20Wrapper.getDeployedWETHAsync();
    payableExchangeIssuance = await coreWrapper.getDeployedPayableExchangeIssuanceModuleAsync();
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
    ABIDecoder.removeABI(PayableExchangeIssuance.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#issueRebalancingSetWithEther: RB 50/50 BTCETH priced at $1', async () => {
    let subjectCaller: Address;
    let subjectRebalancingSetAddress: Address;
    let subjectExchangeIssuanceParams: ExchangeIssuanceParams;
    let subjectExchangeOrdersData: Bytes;
    let subjectEther: BigNumber;

    const BTC_USD_PRICE: BigNumber = new BigNumber(3711);
    const ETH_USD_PRICE: BigNumber = new BigNumber(128);

    const BTC_DECIMALS: number = 8;
    const WETH_DECIMALS: number = 18;

    const WETH_COMPONENT_UNITS = BTC_USD_PRICE
                                  .div(ETH_USD_PRICE)
                                  .mul(new BigNumber(10).pow(WETH_DECIMALS - BTC_DECIMALS));

    let bitcoinEtherIssueQuantity: BigNumber;
    let rebalancingSetQuantity: BigNumber;

    let bitcoinEtherSet: SetTokenContract;
    let bitcoinEtherNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    let exchangeIssueSetAddress: Address;
    let exchangeIssueQuantity: BigNumber;
    let exchangeIssueSendTokenExchangeIds: BigNumber[];
    let exchangeIssueSendTokens: Address[];
    let exchangeIssueSendTokenAmounts: BigNumber[];
    let exchangeIssueReceiveTokens: Address[];
    let exchangeIssueReceiveTokenAmounts: BigNumber[];

    let zeroExOrder: ZeroExSignedFillOrder;

    beforeEach(async () => {
      subjectCaller = tokenPurchaser;

      // Create wrapped Bitcoin (owned by 0x order maker)
      const wrappedBitcoin = await erc20Wrapper.deployTokenAsync(zeroExOrderMaker, 8);

      // Create the Set with BTC and WETH in realistic quantities
      const componentAddresses = [wrappedBitcoin.address, weth.address];
      const componentUnits = [new BigNumber(1), WETH_COMPONENT_UNITS];
      bitcoinEtherNaturalUnit = new BigNumber(10 ** 10);
      bitcoinEtherSet = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        bitcoinEtherNaturalUnit,
      );

      // Create the Rebalancing Set
      rebalancingUnitShares = new BigNumber(1350000); // Unit shares required for each RB Set to be $1
      rebalancingSetToken = await rebalancingWrapper.createDefaultRebalancingSetTokenAsync(
        core,
        rebalancingSetTokenFactory.address,
        ownerAccount,
        bitcoinEtherSet.address,
        ONE_DAY_IN_SECONDS,
        rebalancingUnitShares,
      );

      bitcoinEtherIssueQuantity = new BigNumber(135000000000000);
      subjectEther = bitcoinEtherIssueQuantity
                      .mul(WETH_COMPONENT_UNITS)
                      .div(bitcoinEtherNaturalUnit)
                      .mul(2);

      // Generate exchange issue data
      exchangeIssueSetAddress = bitcoinEtherSet.address;
      exchangeIssueQuantity = bitcoinEtherIssueQuantity; // 1.35 * 10^14 or $1 worth
      exchangeIssueSendTokenExchangeIds = [SetUtils.EXCHANGES.ZERO_EX];
      exchangeIssueSendTokens = [weth.address];
      exchangeIssueSendTokenAmounts = [subjectEther.div(2)]; // Half of ether is used to buy Bitcoin
      exchangeIssueReceiveTokens = [wrappedBitcoin.address]; // Only need to acquire Bitcoin
      exchangeIssueReceiveTokenAmounts = [
        exchangeIssueQuantity.mul(componentUnits[0]).div(bitcoinEtherNaturalUnit),
      ];

      subjectExchangeIssuanceParams = {
        setAddress: 			          exchangeIssueSetAddress,
        sendTokenExchangeIds:     	exchangeIssueSendTokenExchangeIds,
        sendTokens:             		exchangeIssueSendTokens,
        sendTokenAmounts:         	exchangeIssueSendTokenAmounts,
        quantity:               		exchangeIssueQuantity,
        receiveTokens:       	  		exchangeIssueReceiveTokens,
        receiveTokenAmounts: 	  		exchangeIssueReceiveTokenAmounts,
      };

      await erc20Wrapper.approveTransfersAsync(
        [wrappedBitcoin],
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        zeroExOrderMaker
      );

      // Create 0x order for the component, using weth(4) paymentToken as default
      zeroExOrder = await setUtils.generateZeroExSignedFillOrder(
        NULL_ADDRESS,                                   // senderAddress
        zeroExOrderMaker,                               // makerAddress
        NULL_ADDRESS,                                   // takerAddress
        ZERO,                                           // makerFee
        ZERO,                                           // takerFee
        exchangeIssueReceiveTokenAmounts[0],            // makerAssetAmount
        exchangeIssueSendTokenAmounts[0],               // takerAssetAmount
        exchangeIssueReceiveTokens[0],               	  // makerAssetAddress
        exchangeIssueSendTokens[0],                     // takerAssetAddress
        SetUtils.generateSalt(),                        // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,          // exchangeAddress
        NULL_ADDRESS,                                   // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),          // expirationTimeSeconds
        exchangeIssueSendTokenAmounts[0],               // amount of zeroExOrder to fill
      );

      subjectExchangeOrdersData = setUtils.generateSerializedOrders([zeroExOrder]);
      subjectRebalancingSetAddress = rebalancingSetToken.address;
      rebalancingSetQuantity = exchangeIssueQuantity.mul(DEFAULT_REBALANCING_NATURAL_UNIT).div(rebalancingUnitShares);
    });

    async function subject(): Promise<string> {
      return payableExchangeIssuance.issueRebalancingSetWithEther.sendTransactionAsync(
        subjectRebalancingSetAddress,
        subjectExchangeIssuanceParams,
        subjectExchangeOrdersData,
        {
          from: subjectCaller,
          gas: DEFAULT_GAS,
          value: subjectEther.toString(),
        },
      );
    }

    it('issues the rebalancing Set to the caller', async () => {
      const previousRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      const expectedRBSetTokenBalance = previousRBSetTokenBalance.add(rebalancingSetQuantity);

      await subject();

      const currentRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      expect(expectedRBSetTokenBalance).to.bignumber.equal(currentRBSetTokenBalance);
    });
  });
});
