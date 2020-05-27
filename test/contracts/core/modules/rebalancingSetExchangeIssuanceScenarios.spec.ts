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
  ExchangeIssuanceModuleContract,
  RebalancingSetExchangeIssuanceModuleContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  SetTokenContract,
  SetTokenFactoryContract,
  TransferProxyContract,
  VaultContract,
  WethMockContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';
import { DEFAULT_GAS, DEFAULT_REBALANCING_NATURAL_UNIT, ONE_DAY_IN_SECONDS } from '@utils/constants';
import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { ExchangeHelper } from '@utils/helpers/exchangeHelper';
import { RebalancingHelper } from '@utils/helpers/rebalancingHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);

const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setUtils = new SetUtils(web3);
const { NULL_ADDRESS, ZERO } = SetUtils.CONSTANTS;


contract('RebalancingSetExchangeIssuanceModule::Scenarios', accounts => {
  const [
    ownerAccount,
    tokenPurchaser,
    zeroExOrderMaker,
    whitelist,
  ] = accounts;

  let core: CoreContract;
  let exchangeIssuanceModule: ExchangeIssuanceModuleContract;
  let rebalancingSetTokenFactory: RebalancingSetTokenFactoryContract;
  let setTokenFactory: SetTokenFactoryContract;
  let rebalancingSetExchangeIssuanceModule: RebalancingSetExchangeIssuanceModuleContract;
  let vault: VaultContract;
  let transferProxy: TransferProxyContract;
  let weth: WethMockContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const erc20Helper = new ERC20Helper(ownerAccount);
  const exchangeHelper = new ExchangeHelper(ownerAccount);
  const rebalancingHelper = new RebalancingHelper(
    ownerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );

  before(async () => {
    ABIDecoder.addABI(CoreContract.getAbi());
    ABIDecoder.addABI(RebalancingSetExchangeIssuanceModuleContract.getAbi());

    vault = await coreHelper.deployVaultAsync();
    transferProxy = await coreHelper.deployTransferProxyAsync();
    core = await coreHelper.deployCoreAsync(transferProxy, vault);
    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(core.address);
    await coreHelper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

    rebalancingSetTokenFactory = await coreHelper.deployRebalancingSetTokenFactoryAsync(
      core.address,
      whitelist,
    );
    await coreHelper.addFactoryAsync(core, rebalancingSetTokenFactory);

    exchangeIssuanceModule = await coreHelper.deployExchangeIssuanceModuleAsync(core, vault);
    await coreHelper.addModuleAsync(core, exchangeIssuanceModule.address);

    weth = await erc20Helper.deployWrappedEtherAsync(ownerAccount);

    rebalancingSetExchangeIssuanceModule = await coreHelper.deployRebalancingSetExchangeIssuanceModuleAsync(
      core.address,
      transferProxy.address,
      exchangeIssuanceModule.address,
      weth.address,
      vault.address,
    );
    await coreHelper.addModuleAsync(core, rebalancingSetExchangeIssuanceModule.address);

    await exchangeHelper.deployAndAuthorizeZeroExExchangeWrapper(
      core,
      SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,
      SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
      SetTestUtils.ZERO_EX_TOKEN_ADDRESS,
      transferProxy
    );
  });

  after(async () => {
    ABIDecoder.removeABI(CoreContract.getAbi());
    ABIDecoder.removeABI(RebalancingSetExchangeIssuanceModuleContract.getAbi());
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
    let subjectRebalancingSetQuantity: BigNumber;
    let subjectExchangeIssuanceParams: ExchangeIssuanceParams;
    let subjectExchangeOrdersData: Bytes;
    let subjectKeepChangeInVault: boolean;
    let subjectEther: BigNumber;

    const BTC_USD_PRICE: BigNumber = new BigNumber(3711);
    const ETH_USD_PRICE: BigNumber = new BigNumber(128);

    const BTC_DECIMALS: number = 8;
    const WETH_DECIMALS: number = 18;

    const WETH_COMPONENT_UNITS = BTC_USD_PRICE.div(ETH_USD_PRICE)
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
      const wrappedBitcoin = await erc20Helper.deployTokenAsync(zeroExOrderMaker, 8);

      // Create the Set with BTC and WETH in realistic quantities
      const componentAddresses = [wrappedBitcoin.address, weth.address];
      const componentUnits = [new BigNumber(1), WETH_COMPONENT_UNITS];
      bitcoinEtherNaturalUnit = new BigNumber(10 ** 10);
      bitcoinEtherSet = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        bitcoinEtherNaturalUnit,
      );

      // Create the Rebalancing Set
      rebalancingUnitShares = new BigNumber(1350000); // Unit shares required for each RB Set to be $1
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        core,
        rebalancingSetTokenFactory.address,
        ownerAccount,
        bitcoinEtherSet.address,
        ONE_DAY_IN_SECONDS,
        rebalancingUnitShares,
      );

      bitcoinEtherIssueQuantity = new BigNumber(135000000000000);
      subjectEther = bitcoinEtherIssueQuantity.mul(WETH_COMPONENT_UNITS)
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
        setAddress:           exchangeIssueSetAddress,
        sendTokenExchangeIds: exchangeIssueSendTokenExchangeIds,
        sendTokens:           exchangeIssueSendTokens,
        sendTokenAmounts:     exchangeIssueSendTokenAmounts,
        quantity:             exchangeIssueQuantity,
        receiveTokens:        exchangeIssueReceiveTokens,
        receiveTokenAmounts:  exchangeIssueReceiveTokenAmounts,
      };

      await erc20Helper.approveTransfersAsync(
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
        exchangeIssueReceiveTokens[0],                  // makerAssetAddress
        exchangeIssueSendTokens[0],                     // takerAssetAddress
        SetUtils.generateSalt(),                        // salt
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,          // exchangeAddress
        NULL_ADDRESS,                                   // feeRecipientAddress
        SetTestUtils.generateTimestamp(10000),          // expirationTimeSeconds
        exchangeIssueSendTokenAmounts[0],               // amount of zeroExOrder to fill
      );

      subjectExchangeOrdersData = setUtils.generateSerializedOrders([zeroExOrder]);
      subjectRebalancingSetAddress = rebalancingSetToken.address;
      subjectRebalancingSetQuantity = exchangeIssueQuantity.div(rebalancingUnitShares)
                                                           .mul(DEFAULT_REBALANCING_NATURAL_UNIT);
      rebalancingSetQuantity = exchangeIssueQuantity.mul(DEFAULT_REBALANCING_NATURAL_UNIT).div(rebalancingUnitShares);
      subjectKeepChangeInVault = false;
    });

    async function subject(): Promise<string> {
      return rebalancingSetExchangeIssuanceModule.issueRebalancingSetWithEther.sendTransactionAsync(
        subjectRebalancingSetAddress,
        subjectRebalancingSetQuantity,
        subjectExchangeIssuanceParams,
        subjectExchangeOrdersData,
        subjectKeepChangeInVault,
        { from: subjectCaller, gas: DEFAULT_GAS, value: subjectEther.toString() },
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