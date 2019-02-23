require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as setProtocolUtils from 'set-protocol-utils';
import {
  Address,
  Bytes,
  KyberTrade,
  ZeroExSignedFillOrder
} from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';

import {
  CoreContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract,
  ExchangeRedemptionModuleContract
} from '@utils/contracts';

import { ether } from '@utils/units';
import { assertTokenBalanceAsync, expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { DEFAULT_GAS } from '@utils/constants';
import { LogExchangeRedemption } from '@utils/contract_logs/exchangeRedemptionModule';
import { generateOrdersDataWithIncorrectExchange } from '@utils/orders';
import { getWeb3 } from '@utils/web3Helper';

import { ExchangeWrapper } from '@utils/wrappers/exchangeWrapper';
import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';


BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const Core = artifacts.require('Core');
const ExchangeRedemptionModule = artifacts.require('ExchangeRedemptionModule');
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const blockchain = new Blockchain(web3);
const setTestUtils = new SetTestUtils(web3);
const setUtils = new SetUtils(web3);
const { NULL_ADDRESS, ZERO } = SetUtils.CONSTANTS;

interface ExchangeRedemptionParams {
  setAddress: string;
  redemptionToken: string;
  redemptionTokenAmount: BigNumber;
  quantity: BigNumber;
  requiredComponents: string[];
  requiredComponentAmounts: BigNumber[];
}

contract('ExchangeRedemptionModule', accounts => {
  const [
    contractDeployer,
    notExchangeRedemptionCaller,
    zeroExOrderMaker,
    exchangeRedemptionCaller,
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let exchangeRedemptionModule: ExchangeRedemptionModuleContract;
  let setTokenFactory: SetTokenFactoryContract;

  const coreWrapper = new CoreWrapper(contractDeployer, contractDeployer);
  const erc20Wrapper = new ERC20Wrapper(contractDeployer);

  const exchangeWrapper = new ExchangeWrapper(contractDeployer);


  const asciiSubjectName: string = 'Set Token';
  const asciiSubjectSymbol: string = 'SET';

  before(async () => {
    ABIDecoder.addABI(Core.abi);
    ABIDecoder.addABI(ExchangeRedemptionModule.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
    ABIDecoder.removeABI(ExchangeRedemptionModule.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    vault = await coreWrapper.deployVaultAsync();
    transferProxy = await coreWrapper.deployTransferProxyAsync();
    core = await coreWrapper.deployCoreAsync(transferProxy, vault);
    exchangeRedemptionModule = await coreWrapper.deployExchangeRedemptionModuleAsync(
      core,
      transferProxy,
      vault
      );
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);

      await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);
    });

    afterEach(async () => {
      await blockchain.revertAsync();
    });

    describe('#exchangeRedemption', async () => {
      let subjectCaller: Address = exchangeRedemptionCaller;
      // TODO: Updates set-protocol-utils to include exchange redemption params
      let subjectExchangeRedemptionData: ExchangeRedemptionParams;
      let subjectExchangeOrdersData: Bytes;

      let redemptionToken: StandardTokenMockContract;
      let firstComponent: StandardTokenMockContract;
      let secondComponent: StandardTokenMockContract;
      let naturalUnit: BigNumber;
      let setToken: SetTokenContract;

      let exchangeRedemptionSetAddress: Address;
      let exchangeRedemptionQuantity: BigNumber;
      let exchangeRedemptionTokenAmount: BigNumber;
      let exchangeRedemptionRequiredComponents: Address[];
      let exchangeRedemptionRequiredComponentAmounts: BigNumber[];

      let zeroExOrder: ZeroExSignedFillOrder;
      let zeroExOrderMakerTokenAmount: BigNumber;
      let zeroExOrderTakerAssetAmount: BigNumber;
      let kyberTrade: KyberTrade;
      let kyberConversionRatePower: BigNumber;

      beforeEach(async () => {
        // Setup the exchanges
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

        // Deploy tokens
        firstComponent = erc20Wrapper.kyberReserveToken(SetTestUtils.KYBER_RESERVE_SOURCE_TOKEN_ADDRESS);
        secondComponent = await erc20Wrapper.deployTokenAsync(contractDeployer);
        redemptionToken = erc20Wrapper.kyberReserveToken(SetTestUtils.KYBER_RESERVE_DESTINATION_TOKEN_ADDRESS);

         // Give some tokens to the zero ex maker in order to be able to fill the order
         await redemptionToken.transfer.sendTransactionAsync(zeroExOrderMaker, ether(100), {from: contractDeployer});

        // Create new set
        naturalUnit = ether(2);
        exchangeRedemptionQuantity = exchangeRedemptionQuantity || ether(4);

        const setComponentUnit = ether(4);

        const componentTokens = [firstComponent, secondComponent];
        const componentAddresses = componentTokens.map(token => token.address);
        const componentUnits = componentTokens.map(token => setComponentUnit);

        setToken = await coreWrapper.createSetTokenAsync(
          core,
          setTokenFactory.address,
          componentAddresses,
          componentUnits,
          naturalUnit,
          asciiSubjectName,
          asciiSubjectSymbol,
          contractDeployer
        );

        // Give token approvals
        await erc20Wrapper.approveTransfersAsync(
          [firstComponent, secondComponent],
          transferProxy.address,
          contractDeployer
        );

        await erc20Wrapper.approveTransfersAsync(
          [secondComponent],
          transferProxy.address,
          exchangeRedemptionCaller
        );

        await erc20Wrapper.approveTransfersAsync(
          [redemptionToken],
          SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
          zeroExOrderMaker
        );

        // Issue a new set from the deployer account
        await core.issue.sendTransactionAsync(
          setToken.address,
          exchangeRedemptionQuantity,
          { from: contractDeployer },
        );

        // Transfer the newly minted token to the redemption account
        await setToken.transfer.sendTransactionAsync(
          subjectCaller,
          exchangeRedemptionQuantity,
          { from: contractDeployer }
        );

        // Create redemption order
        exchangeRedemptionRequiredComponents =
          exchangeRedemptionRequiredComponents || [firstComponent.address, secondComponent.address];

        if (!exchangeRedemptionRequiredComponentAmounts) {
          exchangeRedemptionRequiredComponentAmounts = _.map(componentUnits, unit => {
            return unit.mul(exchangeRedemptionQuantity).div(naturalUnit);
          });
        }

        exchangeRedemptionTokenAmount = exchangeRedemptionTokenAmount || ether(20);

        // Property:                Value                        | Default             | Property
        subjectExchangeRedemptionData = {
          setAddress:               exchangeRedemptionSetAddress || setToken.address,  // setAddress
          redemptionToken:          redemptionToken.address,                           // redemptionToken
          redemptionTokenAmount:    exchangeRedemptionTokenAmount,                     // redemptionTokenTokenAmount
          quantity:                 exchangeRedemptionQuantity,                        // quantity
          requiredComponents:       exchangeRedemptionRequiredComponents,              // requiredComponents
          requiredComponentAmounts: exchangeRedemptionRequiredComponentAmounts,        // requiredComponentAmounts
        } as ExchangeRedemptionParams;

        // Create Kyber trade

        // First component you have in the set and want to sell
        const sourceToken = firstComponent.address;
        // Amount of first component you'd like to sell (units * (amountOfSet / naturalUnits))
        const sourceTokenQuantity = exchangeRedemptionRequiredComponentAmounts[0];
        const sourceTokenDecimals = (await firstComponent.decimals.callAsync()).toNumber();

        // Token you'd like to sell for
        const destinationToken = redemptionToken.address;
        // Amount of destination/redemption token you'd like
        const destinationTokenMaximum = ether(20);
        const destinationTokenDecimals = (await redemptionToken.decimals.callAsync()).toNumber();

        kyberConversionRatePower = new BigNumber(10).pow(18 + sourceTokenDecimals - destinationTokenDecimals);

        let minimumConversionRate = destinationTokenMaximum.div(sourceTokenQuantity)
        .mul(kyberConversionRatePower)
        .round();

        if (minimumConversionRate.toNumber() == Infinity) {
          minimumConversionRate = new BigNumber(0);
        }

        // console.log('Required component amounts: ' + exchangeRedemptionRequiredComponentAmounts);
        // console.log('Source token decimals: ' + sourceTokenDecimals);
        // console.log('Destination token decimals: ' + destinationTokenDecimals);
        // console.log('Destination token maximum: ' + destinationTokenMaximum);
        // console.log('Source token quantity: ' + sourceTokenQuantity);
        // console.log('Minimum conversion rate: ' + minimumConversionRate);
        // console.log('Kyber conversion rate power: ' + kyberConversionRatePower);

        kyberTrade = {
          sourceToken: sourceToken,
          destinationToken: destinationToken,
          sourceTokenQuantity: sourceTokenQuantity,
          minimumConversionRate: minimumConversionRate,
          maxDestinationQuantity: destinationTokenMaximum,
        } as KyberTrade;

        const zeroExTakerAmount = zeroExOrderTakerAssetAmount || exchangeRedemptionRequiredComponentAmounts[1];

        // Create 0x order for the second component

        // console.log(zeroExOrderMaker);
        // console.log(exchangeRedemptionTokenAmount);
        // console.log(zeroExOrderMakerTokenAmount);
        // console.log(zeroExTakerAmount);

        zeroExOrder = await setUtils.generateZeroExSignedFillOrder(
          NULL_ADDRESS,                                     // senderAddress
          zeroExOrderMaker,                                 // makerAddress
          NULL_ADDRESS,                                     // takerAddress
          ZERO,                                             // makerFee
          ZERO,                                             // takerFee
          zeroExOrderMakerTokenAmount || exchangeRedemptionTokenAmount, // makerAssetAmount
          zeroExTakerAmount,                                // takerAssetAmount
          redemptionToken.address,                          // makerAssetAddress
          secondComponent.address,                          // takerAssetAddress
          SetUtils.generateSalt(),                          // salt
          SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,            // exchangeAddress
          NULL_ADDRESS,                                     // feeRecipientAddress
          SetTestUtils.generateTimestamp(10000),            // expirationTimeSeconds
          zeroExTakerAmount,                                // amount of zeroExOrder to fill
        );

        // console.log(zeroExOrder);
        // console.log(kyberTrade);
        subjectExchangeOrdersData = setUtils.generateSerializedOrders([zeroExOrder, kyberTrade]);
        subjectCaller = exchangeRedemptionCaller;

      });

      afterEach(async () => {
        exchangeRedemptionQuantity = undefined;
        exchangeRedemptionTokenAmount = undefined;
        exchangeRedemptionRequiredComponents = undefined;
        exchangeRedemptionRequiredComponentAmounts = undefined;
      });

      async function subject(): Promise<string> {
        // TODO: Simplify when ExchangeRedemptionParams is available in set-protocol-utils
        return exchangeRedemptionModule.exchangeRedemption.sendTransactionAsync(
          subjectExchangeRedemptionData,
          subjectExchangeOrdersData,
          { from: subjectCaller, gas: DEFAULT_GAS },
        );
      }

      it('redeems the correct quantity of the set for the owner', async () => {
        const existingBalance = await setToken.balanceOf.callAsync(exchangeRedemptionCaller);
        await subject();
        await assertTokenBalanceAsync(
          setToken, existingBalance.sub(exchangeRedemptionQuantity), exchangeRedemptionCaller
        );
      });

      it('sells the set and transfers the correct amount of the redemption token', async () => {
        const existingBalance = await redemptionToken.balanceOf.callAsync(exchangeRedemptionCaller);
        await subject();
        await assertTokenBalanceAsync(
          redemptionToken, existingBalance.add(exchangeRedemptionTokenAmount), exchangeRedemptionCaller
        );
      });

      it('transfers the redemption token amount from the 0x maker', async () => {
        const existingBalance = await redemptionToken.balanceOf.callAsync(zeroExOrderMaker);
        await subject();
        await assertTokenBalanceAsync(
          redemptionToken, existingBalance.sub(exchangeRedemptionTokenAmount), exchangeRedemptionCaller
        );
      });

      it('transfers the second component token amount to the 0x maker', async () => {
        const existingBalance = await secondComponent.balanceOf.callAsync(zeroExOrderMaker);
        await subject();
        await assertTokenBalanceAsync(secondComponent,
          existingBalance.sub(exchangeRedemptionRequiredComponents[1]), exchangeRedemptionCaller
        );
      });

      it('emits the correct LogFill event', async () => {
        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const expectedLogs = LogExchangeRedemption(
          setToken.address,
          subjectCaller,
          redemptionToken.address,
          exchangeRedemptionQuantity,
          exchangeRedemptionTokenAmount,
          exchangeRedemptionModule.address
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
          exchangeRedemptionQuantity = ZERO;
        });

       after(async () => {
        exchangeRedemptionQuantity = undefined;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when the redemption token amount is zero', async () => {
        before(async () => {
          exchangeRedemptionTokenAmount = ZERO;
        });

       after(async () => {
        exchangeRedemptionTokenAmount = undefined;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when the set was not created through core', async () => {
        before(async () => {
          exchangeRedemptionSetAddress = NULL_ADDRESS;
        });

        after(async () => {
          exchangeRedemptionSetAddress = undefined;
         });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      // TODO: Figure out how to structure tests to make this work
      // describe('when the redeem quantity is not a multiple of the natural unit of the set', async () => {
      //   before(async () => {
      //     exchangeRedemptionQuantity = ether(5);
      //   });

      //   after(async () => {
      //     exchangeRedemptionQuantity = undefined;
      //   });

      //   it('should revert', async () => {
      //     await expectRevertError(subject());
      //   });
      // });

      describe('the the required components is empty', async () => {
        before(async () => {
          exchangeRedemptionRequiredComponents = [];
        });

       after(async () => {
        exchangeRedemptionRequiredComponents = undefined;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when the redemption token amount is insufficient', async () => {
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

      describe('when less of the source components is given', async () => {
        before(async () => {
          zeroExOrderTakerAssetAmount = ether(10);
        });

       after(async () => {
          zeroExOrderTakerAssetAmount = undefined;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when the source components and amount lengths differ', async () => {
        before(async () => {
          exchangeRedemptionRequiredComponents = [notExchangeRedemptionCaller];
        });

        after(async () => {
          exchangeRedemptionRequiredComponents = undefined;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when a required component is not a member of the setAddress', async () => {
        before(async () => {
          const notComponent = notExchangeRedemptionCaller;
          exchangeRedemptionRequiredComponents = [notComponent, notComponent];
        });

        after(async () => {
          exchangeRedemptionRequiredComponents = undefined;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when a source component amount is zero', async () => {
        before(async () => {
          exchangeRedemptionRequiredComponentAmounts = [ZERO, ZERO];
        });

        after(async () => {
          exchangeRedemptionRequiredComponentAmounts = undefined;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

    });

  });