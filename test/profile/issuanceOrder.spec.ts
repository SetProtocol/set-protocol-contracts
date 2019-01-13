require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as setProtocolUtils from 'set-protocol-utils';
import {
  Address,
  Bytes,
  IssuanceOrder,
  TakerWalletOrder,
  ZeroExSignedFillOrder
} from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  IssuanceOrderModuleContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { DEFAULT_GAS } from '@utils/constants';
import { ether } from '@utils/units';
import { getWeb3 } from '@utils/web3Helper';
import { ExchangeOrderCounts } from '@utils/orders';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ExchangeWrapper } from '@utils/wrappers/exchangeWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const Core = artifacts.require('Core');
const blockchain = new Blockchain(web3);
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setUtils = new SetUtils(web3);
const { NULL_ADDRESS, ZERO } = SetUtils.CONSTANTS;


contract('Issuance Orders', accounts => {
  const [
    contractDeployer,
    relayerAccount,
    issuanceOrderTaker,
    issuanceOrderMaker,
    zeroExOrderMaker,
  ] = accounts;

  const coreWrapper = new CoreWrapper(contractDeployer, contractDeployer);
  const erc20Wrapper = new ERC20Wrapper(contractDeployer);
  const exchangeWrapper = new ExchangeWrapper(contractDeployer);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  describe('FillOrder', async () => {
    let core: CoreContract;
    let transferProxy: TransferProxyContract;
    let issuanceOrderModule: IssuanceOrderModuleContract;
    let setTokenFactory: SetTokenFactoryContract;

    const subjectExchangeOrderCounts: ExchangeOrderCounts[] = [
      // 2 Components
      { takerWalletOrderCount: 1,   zeroExOrderCount: 1 },

      // 3 Components
      { takerWalletOrderCount: 2,   zeroExOrderCount: 1 },
      { takerWalletOrderCount: 1,   zeroExOrderCount: 2 },

      // 5 Components
      { takerWalletOrderCount: 5,   zeroExOrderCount: 0 },
      { takerWalletOrderCount: 2,   zeroExOrderCount: 3 },
      { takerWalletOrderCount: 0,   zeroExOrderCount: 5 },

      // 10 Components
      { takerWalletOrderCount: 10,  zeroExOrderCount: 0 },
      { takerWalletOrderCount: 8,   zeroExOrderCount: 2 },
      { takerWalletOrderCount: 5,   zeroExOrderCount: 5 },
      { takerWalletOrderCount: 2,   zeroExOrderCount: 8 },
      { takerWalletOrderCount: 0,   zeroExOrderCount: 10 },

      // 25 components
      { takerWalletOrderCount: 25,  zeroExOrderCount: 0 },
      { takerWalletOrderCount: 20,  zeroExOrderCount: 5 },
      { takerWalletOrderCount: 12,  zeroExOrderCount: 13 },
      { takerWalletOrderCount: 5,   zeroExOrderCount: 20 },
      { takerWalletOrderCount: 0,   zeroExOrderCount: 25 },
    ];

    let subjectIssuanceOrder: IssuanceOrder;
    let subjectQuantityToFill: BigNumber;
    let subjectSignature: Bytes;
    let subjectExchangeOrdersData: Bytes;
    let subjectCaller: Address;

    beforeEach(async () => {
      await blockchain.saveSnapshotAsync();

      const vault = await coreWrapper.deployVaultAsync();
      transferProxy = await coreWrapper.deployTransferProxyAsync();
      const signatureValidator = await coreWrapper.deploySignatureValidatorAsync();
      core = await coreWrapper.deployCoreAsync(transferProxy, vault);
      issuanceOrderModule = await coreWrapper.deployIssuanceOrderModuleAsync(
        core,
        transferProxy,
        vault,
        signatureValidator,
      );
      await coreWrapper.addModuleAsync(core, issuanceOrderModule.address);
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);

      await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);
      await coreWrapper.addAuthorizationAsync(transferProxy, issuanceOrderModule.address);
      await coreWrapper.addAuthorizationAsync(vault, issuanceOrderModule.address);

      await exchangeWrapper.deployAndAuthorizeTakerWalletExchangeWrapper(core, transferProxy);
      await exchangeWrapper.deployAndAuthorizeZeroExExchangeWrapper(
        core,
        SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,
        SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
        SetTestUtils.ZERO_EX_TOKEN_ADDRESS,
        transferProxy
      );
    });

    afterEach(async () => {
      await blockchain.revertAsync();
    });

    async function fillOrderAsync(): Promise<string> {
      return issuanceOrderModule.fillOrder.sendTransactionAsync(
        subjectIssuanceOrder,
        subjectQuantityToFill,
        subjectSignature,
        subjectExchangeOrdersData,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    subjectExchangeOrderCounts.forEach(function(exchangeOrderCounts) {
      const componentCount = exchangeOrderCounts.takerWalletOrderCount + exchangeOrderCounts.zeroExOrderCount;

      it(`Filling Issuance Order with ${componentCount} Orders`, async () => {
        // Deploy maker and relayer token to issuance order maker
        const relayerToken = await erc20Wrapper.deployTokenAsync(issuanceOrderMaker);
        const makerToken = await erc20Wrapper.deployTokenAsync(issuanceOrderMaker);
        await erc20Wrapper.approveTransfersAsync(
          [makerToken, relayerToken],
          transferProxy.address,
          issuanceOrderMaker
        );

        // Deploy taker wallet order tokens
        let takerWalletComponents: StandardTokenMockContract[] = [];
        if (exchangeOrderCounts.takerWalletOrderCount > 0) {
          takerWalletComponents = await erc20Wrapper.deployTokensAsync(
            exchangeOrderCounts.takerWalletOrderCount,
            issuanceOrderTaker
          );

          await erc20Wrapper.approveTransfersAsync(
            _.union(takerWalletComponents, [relayerToken]),
            transferProxy.address,
            issuanceOrderTaker
          );
        }

        // Deploy zeroEx order tokens
        let zeroExOrderComponents: StandardTokenMockContract[] = [];
        if (exchangeOrderCounts.zeroExOrderCount > 0) {
          zeroExOrderComponents = await erc20Wrapper.deployTokensAsync(
            exchangeOrderCounts.zeroExOrderCount,
            zeroExOrderMaker
          );

          await erc20Wrapper.approveTransfersAsync(
            zeroExOrderComponents,
            SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
            zeroExOrderMaker
          );
        }

        // Aggregate components to create Set
        const components: StandardTokenMockContract[] = _.union(takerWalletComponents, zeroExOrderComponents);
        const componentAddresses: Address[] = _.map(components, token => token.address);
        const componentUnits: BigNumber[] = _.map(components, () => ether(4));
        const naturalUnit: BigNumber = ether(2);
        const setToken = await coreWrapper.createSetTokenAsync(
          core,
          setTokenFactory.address,
          componentAddresses,
          componentUnits,
          naturalUnit
        );

        const setAddress = setToken.address;
        const makerAddress = issuanceOrderMaker;
        const makerTokenAddress = makerToken.address;
        const relayerAddress = relayerAccount;
        const relayerTokenAddress = relayerToken.address;
        const quantity = ether(4);
        const makerTokenAmount = ether(30);
        const expiration = SetTestUtils.generateTimestamp(10000);
        const makerRelayerFee = ZERO;
        const takerRelayerFee = ZERO;
        const requiredComponents = componentAddresses;
        const requiredComponentAmounts = _.map(componentUnits, unit => unit.mul(quantity).div(naturalUnit));
        const salt = SetUtils.generateSalt();

        subjectIssuanceOrder = {
          setAddress,
          makerAddress,
          makerToken: makerTokenAddress,
          relayerAddress,
          relayerToken: relayerTokenAddress,
          quantity,
          makerTokenAmount,
          expiration,
          makerRelayerFee,
          takerRelayerFee,
          requiredComponents,
          requiredComponentAmounts,
          salt,
        } as IssuanceOrder;

        const orderHash = SetUtils.hashOrderHex(subjectIssuanceOrder);
        const ecSignature = await setUtils.signMessage(orderHash, issuanceOrderMaker, false);

        // Define orders
        const exchangeOrders: (TakerWalletOrder | ZeroExSignedFillOrder)[] = [];

        // Generate Taker wallet orders
        takerWalletComponents.forEach(function(componentToken) {
          const orderForComponent = {
            takerTokenAddress: componentToken.address,
            takerTokenAmount: ether(4).mul(quantity).div(naturalUnit),
          } as TakerWalletOrder;

          exchangeOrders.push(orderForComponent);
        });

        // Generate 0x orders
        const generateZeroExOrders = async () => {
          for (const componentToken of zeroExOrderComponents) {
            const orderForComponent = await setUtils.generateZeroExSignedFillOrder(
              NULL_ADDRESS,                              // senderAddress
              zeroExOrderMaker,                          // makerAddress
              NULL_ADDRESS,                              // takerAddress
              ZERO,                                      // makerFee
              ZERO,                                      // takerFee
              ether(4).mul(quantity).div(naturalUnit),   // makerAssetAmount
              makerTokenAmount.div(componentCount),      // takerAssetAmount
              componentToken.address,                    // makerAssetAddress
              makerToken.address,                        // takerAssetAddress
              SetUtils.generateSalt(),                   // salt
              SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,     // exchangeAddress
              NULL_ADDRESS,                              // feeRecipientAddress
              SetTestUtils.generateTimestamp(10000),     // expirationTimeSeconds
              makerTokenAmount.div(componentCount),      // amount of takerAssetAmount to fill
            );

            exchangeOrders.push(orderForComponent);
          }
        };
        await generateZeroExOrders();

        subjectQuantityToFill = quantity;
        subjectSignature = setUtils.convertSigToHex(ecSignature);
        subjectExchangeOrdersData = setUtils.generateSerializedOrders(exchangeOrders);
        subjectCaller = issuanceOrderTaker;

        const fillOrderTxHash = await fillOrderAsync();
        const fillOrder = await web3.eth.getTransactionReceipt(fillOrderTxHash);

        console.log(`Fill Order with ${exchangeOrderCounts.takerWalletOrderCount} Taker Wallet
          and ${exchangeOrderCounts.zeroExOrderCount} ZeroEx Orders`);
        console.log('Gas Cost: ', fillOrder.gasUsed);
      });
    });
  });
});
