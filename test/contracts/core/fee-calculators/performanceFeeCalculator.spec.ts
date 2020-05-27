require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as _ from 'lodash';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  UpdatableOracleMockContract
} from 'set-protocol-oracles';
import {
  CoreMockContract,
  OracleWhiteListContract,
  PerformanceFeeCalculatorContract,
  RebalancingSetFeeMockContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract,
} from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { getWeb3, txnFrom } from '@utils/web3Helper';
import { ether } from '@utils/units';
import {
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO
} from '@utils/constants';
import {
  getExpectedFeeActualizationLog,
  getExpectedFeeAdjustmentLog,
  getExpectedFeeInitializationLog
} from '@utils/contract_logs/performanceFeeCalculator';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { FeeCalculatorHelper } from '@utils/helpers/feeCalculatorHelper';
import { OracleHelper } from 'set-protocol-oracles';
import { ValuationHelper } from '@utils/helpers/valuationHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);
const { SetProtocolTestUtils: SetTestUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);

contract('PerformanceFeeCalculator', accounts => {
  const [
    ownerAccount,
  ] = accounts;

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let setTokenFactory: SetTokenFactoryContract;
  let vault: VaultContract;
  let ethOracleWhiteList: OracleWhiteListContract;
  let usdOracleWhiteList: OracleWhiteListContract;

  let wrappedETH: StandardTokenMockContract;
  let wrappedBTC: StandardTokenMockContract;
  let usdc: StandardTokenMockContract;
  let dai: StandardTokenMockContract;

  let wrappedETHPrice: BigNumber;
  let wrappedBTCPrice: BigNumber;
  let usdcPrice: BigNumber;
  let daiPrice: BigNumber;

  let usdWrappedETHOracle: UpdatableOracleMockContract;
  let usdWrappedBTCOracle: UpdatableOracleMockContract;
  let usdUSDCOracle: UpdatableOracleMockContract;
  let usdDaiOracle: UpdatableOracleMockContract;

  let ethWrappedETHOracle: UpdatableOracleMockContract;
  let ethWrappedBTCOracle: UpdatableOracleMockContract;
  let ethUSDCOracle: UpdatableOracleMockContract;
  let ethDaiOracle: UpdatableOracleMockContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const erc20Helper = new ERC20Helper(ownerAccount);
  const oracleHelper = new OracleHelper(ownerAccount);
  const valuationHelper = new ValuationHelper(ownerAccount, coreHelper, erc20Helper, oracleHelper);
  const feeCalculatorHelper = new FeeCalculatorHelper(ownerAccount);

  let feeCalculator: PerformanceFeeCalculatorContract;

  before(async () => {
    ABIDecoder.addABI(CoreMockContract.getAbi());
    ABIDecoder.addABI(PerformanceFeeCalculatorContract.getAbi());

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    coreMock = await coreHelper.deployCoreMockAsync(transferProxy, vault);

    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(coreMock.address);

    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, setTokenFactory);
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMockContract.getAbi());
    ABIDecoder.removeABI(PerformanceFeeCalculatorContract.getAbi());
  });

  beforeEach(async () => {
    wrappedETH = await erc20Helper.deployTokenAsync(ownerAccount, 18);
    wrappedBTC = await erc20Helper.deployTokenAsync(ownerAccount, 8);
    usdc = await erc20Helper.deployTokenAsync(ownerAccount, 6);
    dai = await erc20Helper.deployTokenAsync(ownerAccount, 18);

    wrappedETHPrice = ether(128);
    wrappedBTCPrice = ether(7500);
    usdcPrice = ether(1);
    daiPrice = ether(1);

    usdWrappedETHOracle = await oracleHelper.deployUpdatableOracleMockAsync(wrappedETHPrice);
    usdWrappedBTCOracle = await oracleHelper.deployUpdatableOracleMockAsync(wrappedBTCPrice);
    usdUSDCOracle = await oracleHelper.deployUpdatableOracleMockAsync(usdcPrice);
    usdDaiOracle = await oracleHelper.deployUpdatableOracleMockAsync(daiPrice);

    usdOracleWhiteList = await coreHelper.deployOracleWhiteListAsync(
      [wrappedETH.address, wrappedBTC.address, usdc.address, dai.address],
      [usdWrappedETHOracle.address, usdWrappedBTCOracle.address, usdUSDCOracle.address, usdDaiOracle.address],
    );

    ethWrappedETHOracle = await oracleHelper.deployUpdatableOracleMockAsync(
      wrappedETHPrice.mul(ether(1)).div(wrappedETHPrice).round(0, 3)
    );
    ethWrappedBTCOracle = await oracleHelper.deployUpdatableOracleMockAsync(
      wrappedBTCPrice.mul(ether(1)).div(wrappedETHPrice).round(0, 3)
    );
    ethUSDCOracle = await oracleHelper.deployUpdatableOracleMockAsync(
      usdcPrice.mul(ether(1)).div(wrappedETHPrice).round(0, 3)
    );
    ethDaiOracle = await oracleHelper.deployUpdatableOracleMockAsync(
      daiPrice.mul(ether(1)).div(wrappedETHPrice).round(0, 3)
    );

    ethOracleWhiteList = await coreHelper.deployOracleWhiteListAsync(
      [wrappedETH.address, wrappedBTC.address, usdc.address, dai.address],
      [ethWrappedETHOracle.address, ethWrappedBTCOracle.address, ethUSDCOracle.address, ethDaiOracle.address],
    );

    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    let subjectCore: Address;
    let subjectOracleWhiteList: Address;
    let subjectMaxProfitFeePercentage: BigNumber;
    let subjectMaxStreamingFeePercentage: BigNumber;

    beforeEach(async () => {
      subjectCore = coreMock.address;
      subjectOracleWhiteList = usdOracleWhiteList.address;
      subjectMaxProfitFeePercentage = ether(.5);
      subjectMaxStreamingFeePercentage = ether(.1);
    });

    async function subject(): Promise<PerformanceFeeCalculatorContract> {
      return await feeCalculatorHelper.deployPerformanceFeeCalculatorAsync(
        subjectCore,
        subjectOracleWhiteList,
        subjectMaxProfitFeePercentage,
        subjectMaxStreamingFeePercentage
      );
    }

    it('sets the correct Core', async () => {
      feeCalculator = await subject();

      const actualCore = await feeCalculator.core.callAsync();

      expect(actualCore).to.equal(subjectCore);
    });

    it('sets the correct OracleWhiteList', async () => {
      feeCalculator = await subject();

      const actualOracleWhiteList = await feeCalculator.oracleWhiteList.callAsync();

      expect(actualOracleWhiteList).to.equal(subjectOracleWhiteList);
    });

    it('sets the correct maximumProfitFeePercentage', async () => {
      feeCalculator = await subject();

      const actualmaximumProfitFeePercentage = await feeCalculator.maximumProfitFeePercentage.callAsync();

      expect(actualmaximumProfitFeePercentage).to.be.bignumber.equal(subjectMaxProfitFeePercentage);
    });

    it('sets the correct maximumStreamingFeePercentage', async () => {
      feeCalculator = await subject();

      const actualmaximumStreamingFeePercentage = await feeCalculator.maximumStreamingFeePercentage.callAsync();

      expect(actualmaximumStreamingFeePercentage).to.be.bignumber.equal(subjectMaxStreamingFeePercentage);
    });
  });

  describe('#initialize', async () => {
    let subjectCalculatorData: string;

    let rebalancingSetToken: RebalancingSetFeeMockContract;
    let usdDenominated: boolean;
    let addValidSet: boolean;
    let profitFeePeriod: BigNumber;
    let highWatermarkResetPeriod: BigNumber;
    let profitFeePercentage: BigNumber;
    let streamingFeePercentage: BigNumber;

    before(async () => {
      usdDenominated = true;
      addValidSet = true;

      profitFeePeriod = ONE_DAY_IN_SECONDS.mul(30);
      highWatermarkResetPeriod = ONE_DAY_IN_SECONDS.mul(365);
      profitFeePercentage = ether(.2);
      streamingFeePercentage = ether(.02);
    });

    beforeEach(async () => {
      const maxProfitFeePercentage = ether(.5);
      const maxStreamingFeePercentage = ether(.1);
      const oracleWhiteList = usdDenominated ? usdOracleWhiteList.address : ethOracleWhiteList.address;
      feeCalculator = await feeCalculatorHelper.deployPerformanceFeeCalculatorAsync(
        coreMock.address,
        oracleWhiteList,
        maxProfitFeePercentage,
        maxStreamingFeePercentage
      );

      const set1Components = [wrappedETH.address, wrappedBTC.address];
      const set1Units = [wrappedBTCPrice.div(wrappedETHPrice).mul(10 ** 12), new BigNumber(100)];
      const set1NaturalUnit = new BigNumber(10 ** 12);
      const set1 = await coreHelper.createSetTokenAsync(
        coreMock,
        setTokenFactory.address,
        set1Components,
        set1Units,
        set1NaturalUnit,
      );

      rebalancingSetToken = await feeCalculatorHelper.deployRebalancingSetFeeMockAsync(
        new BigNumber(1e6),
        new BigNumber(1e6),
        set1.address,
        feeCalculator.address
      );

      if (addValidSet) {
        await coreMock.addSet.sendTransactionAsync(rebalancingSetToken.address, txnFrom(ownerAccount));
      }

      subjectCalculatorData = feeCalculatorHelper.generatePerformanceFeeCallData(
        profitFeePeriod,
        highWatermarkResetPeriod,
        profitFeePercentage,
        streamingFeePercentage
      );
    });

    async function subject(): Promise<any> {
      return rebalancingSetToken.initialize.sendTransactionAsync(subjectCalculatorData);
    }

    it('sets the profit fee period correctly', async () => {
      await subject();

      const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);
      expect(feeState.profitFeePeriod).to.be.bignumber.equal(profitFeePeriod);
    });

    it('sets the high watermark reset period correctly', async () => {
      await subject();

      const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);
      expect(feeState.highWatermarkResetPeriod).to.be.bignumber.equal(highWatermarkResetPeriod);
    });

    it('sets the profit fee percentage correctly', async () => {
      await subject();

      const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);
      expect(feeState.profitFeePercentage).to.be.bignumber.equal(profitFeePercentage);
    });

    it('sets the streaming fee percentage correctly', async () => {
      await subject();

      const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);
      expect(feeState.streamingFeePercentage).to.be.bignumber.equal(streamingFeePercentage);
    });

    it('sets the last profit fee timestamp correctly', async () => {
      await subject();

      const lastBlock = await web3.eth.getBlock('latest');

      const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);
      expect(feeState.lastProfitFeeTimestamp).to.be.bignumber.equal(lastBlock.timestamp);
    });

    it('sets the last streaming fee timestamp correctly', async () => {
      await subject();

      const lastBlock = await web3.eth.getBlock('latest');

      const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);
      expect(feeState.lastStreamingFeeTimestamp).to.be.bignumber.equal(lastBlock.timestamp);
    });

    it('sets the high watermark correctly', async () => {
      await subject();

      const expectedHighWatermark = await valuationHelper.calculateRebalancingSetTokenValueAsync(
        rebalancingSetToken,
        usdOracleWhiteList
      );

      const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);
      expect(feeState.highWatermark).to.be.bignumber.equal(expectedHighWatermark);
    });

    it('emits the correct FeeInitialization log', async () => {
      const txHash = await subject();

      const lastBlock = await web3.eth.getBlock('latest');

      const expectedHighWatermark = await valuationHelper.calculateRebalancingSetTokenValueAsync(
        rebalancingSetToken,
        usdOracleWhiteList
      );
      const expectedLogs = getExpectedFeeInitializationLog(
        rebalancingSetToken.address,
        profitFeePeriod,
        highWatermarkResetPeriod,
        profitFeePercentage,
        streamingFeePercentage,
        expectedHighWatermark,
        new BigNumber(lastBlock.timestamp),
        new BigNumber(lastBlock.timestamp),
        feeCalculator.address
      );

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when eth denominated oracles are used', async () => {
      before(async () => {
        usdDenominated = false;
      });

      after(async () => {
        usdDenominated = true;
      });

      it('still sets correct high watermark', async () => {
        await subject();

        const expectedHighWatermark = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          ethOracleWhiteList
        );

        const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);
        expect(feeState.highWatermark).to.be.bignumber.equal(expectedHighWatermark);
      });
    });

    describe('when the profit fee is greater than maximumProfitFeePercentage', async () => {
      before(async () => {
        profitFeePercentage = ether(.7);
      });

      after(async () => {
        profitFeePercentage = ether(.2);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the streaming fee is greater than maximumStreamingFeePercentage', async () => {
      before(async () => {
        streamingFeePercentage = ether(.2);
      });

      after(async () => {
        streamingFeePercentage = ether(.02);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the profit fee is not a multiple of a basis point', async () => {
      before(async () => {
        profitFeePercentage = ether(.20001);
      });

      after(async () => {
        profitFeePercentage = ether(.2);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the streaming fee is not a multiple of a basis point', async () => {
      before(async () => {
        streamingFeePercentage = ether(.02001);
      });

      after(async () => {
        streamingFeePercentage = ether(.02);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the profit fee period is less than high watermark reset period', async () => {
      before(async () => {
        highWatermarkResetPeriod = ONE_DAY_IN_SECONDS;
      });

      after(async () => {
        highWatermarkResetPeriod = ONE_DAY_IN_SECONDS.mul(365);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#adjustFee', async () => {
    let subjectNewFeeData: string;

    let rebalancingSetToken: RebalancingSetFeeMockContract;
    let addValidSet: boolean;

    let feeType: BigNumber;
    let newFeePercentage: BigNumber;

    let customInitialFeePercentage: BigNumber;

    before(async () => {
      addValidSet = true;

      feeType = ZERO;
      newFeePercentage = ether(.03);
    });

    beforeEach(async () => {
      const maxProfitFeePercentage = ether(.5);
      const maxStreamingFeePercentage = ether(.1);
      const oracleWhiteList = usdOracleWhiteList.address;
      feeCalculator = await feeCalculatorHelper.deployPerformanceFeeCalculatorAsync(
        coreMock.address,
        oracleWhiteList,
        maxProfitFeePercentage,
        maxStreamingFeePercentage
      );

      const set1Components = [wrappedETH.address, wrappedBTC.address];
      const set1Units = [wrappedBTCPrice.div(wrappedETHPrice).mul(10 ** 12), new BigNumber(100)];
      const set1NaturalUnit = new BigNumber(10 ** 12);
      const set1 = await coreHelper.createSetTokenAsync(
        coreMock,
        setTokenFactory.address,
        set1Components,
        set1Units,
        set1NaturalUnit,
      );

      rebalancingSetToken = await feeCalculatorHelper.deployRebalancingSetFeeMockAsync(
        new BigNumber(1e6),
        new BigNumber(1e6),
        set1.address,
        feeCalculator.address
      );

      if (addValidSet) {
        await coreMock.addSet.sendTransactionAsync(rebalancingSetToken.address, txnFrom(ownerAccount));
      }

      const profitFeePeriod = ONE_DAY_IN_SECONDS.mul(30);
      const highWatermarkResetPeriod = ONE_DAY_IN_SECONDS.mul(365);
      const profitFeePercentage = customInitialFeePercentage || ether(.2);
      const streamingFeePercentage = ether(.02);

      const feeCalculatorData = feeCalculatorHelper.generatePerformanceFeeCallData(
        profitFeePeriod,
        highWatermarkResetPeriod,
        profitFeePercentage,
        streamingFeePercentage
      );

      await rebalancingSetToken.initialize.sendTransactionAsync(feeCalculatorData);

      subjectNewFeeData = feeCalculatorHelper.generateAdjustFeeCallData(
        feeType,
        newFeePercentage
      );
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.adjustFee.sendTransactionAsync(subjectNewFeeData);
    }

    it('sets the streaming fee percentage correctly', async () => {
      await subject();

      const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);
      expect(feeState.streamingFeePercentage).to.be.bignumber.equal(newFeePercentage);
    });

    it('emits the correct FeeAdjustment log', async () => {
      const txHash = await subject();

      const expectedLogs = getExpectedFeeAdjustmentLog(
        rebalancingSetToken.address,
        feeType,
        newFeePercentage,
        feeCalculator.address
      );

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the change is to the profitFee', async () => {
      before(async () => {
        feeType = new BigNumber(1);
      });

      after(async () => {
        feeType = ZERO;
      });

      it('sets the profit fee percentage correctly', async () => {
        await subject();

        const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);
        expect(feeState.profitFeePercentage).to.be.bignumber.equal(newFeePercentage);
      });

      describe('when profit fee is initially 0', async () => {
        let updatedBTCPrice: BigNumber;
        let updatedETHPrice: BigNumber;

        let timeElapsed: BigNumber;
        let customTimeElapsed: BigNumber;

        before(async () => {
          customInitialFeePercentage = ether(0);
        });

        after(async () => {
          customInitialFeePercentage = undefined;
        });

        beforeEach(async () => {
          await usdWrappedBTCOracle.updatePrice.sendTransactionAsync(updatedBTCPrice);
          await ethWrappedBTCOracle.updatePrice.sendTransactionAsync(
            updatedBTCPrice.mul(ether(1)).div(updatedETHPrice).round(0, 3)
          );

          await usdWrappedETHOracle.updatePrice.sendTransactionAsync(updatedETHPrice);
          await ethWrappedETHOracle.updatePrice.sendTransactionAsync(
            updatedETHPrice.mul(ether(1)).div(updatedETHPrice).round(0, 3)
          );

          timeElapsed = customTimeElapsed || ONE_YEAR_IN_SECONDS;

          await blockchain.increaseTimeAsync(timeElapsed);
          await blockchain.mineBlockAsync();
        });

        describe('and there is a profit', async () => {
          before(async () => {
            updatedBTCPrice = ether(8000);
            updatedETHPrice = ether(140);
          });

          after(async () => {
            updatedBTCPrice = undefined;
            updatedETHPrice = undefined;
          });

          it('properly sets the fee', async () => {
            await subject();
            const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);
            expect(feeState.profitFeePercentage).to.be.bignumber.equal(newFeePercentage);
          });

          it('properly resets the watermark', async () => {
            await subject();

            const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
              rebalancingSetToken,
              usdOracleWhiteList,
            );

            const postFeeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

            expect(postFeeState.highWatermark).to.bignumber.equal(rebalancingSetValue);
          });

          it('sets the last profit fee timestamp correctly', async () => {
            await subject();

            const lastBlock = await web3.eth.getBlock('latest');

            const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);
            expect(feeState.lastProfitFeeTimestamp).to.be.bignumber.equal(lastBlock.timestamp);
          });

          describe('when the profitFeePeriod has not elapsed', async () => {
            before(async () => {
              customTimeElapsed = ONE_DAY_IN_SECONDS;
            });

            after(async () => {
              customTimeElapsed = undefined;
            });

            it('should revert', async () => {
              await expectRevertError(subject());
            });
          });
        });

        describe('when there is no profit', async () => {
          before(async () => {
            updatedBTCPrice = ether(7000);
            updatedETHPrice = ether(100);
          });

          after(async () => {
            updatedBTCPrice = undefined;
            updatedETHPrice = undefined;
          });

          it('does not reset the watermark', async () => {
            const preFeeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

            await subject();

            const postFeeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

            expect(postFeeState.highWatermark).to.bignumber.equal(preFeeState.highWatermark);
          });
        });
      });

      describe('when the profit fee is greater than maximumProfitFeePercentage', async () => {
        before(async () => {
          newFeePercentage = ether(.6);
        });

        after(async () => {
          newFeePercentage = ether(.2);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when the profit fee is not a multiple of a basis point', async () => {
        before(async () => {
          newFeePercentage = ether(.20001);
        });

        after(async () => {
          newFeePercentage = ether(.2);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });

    describe('when the streaming fee is greater than maximumStreamingFeePercentage', async () => {
      before(async () => {
        newFeePercentage = ether(.2);
      });

      after(async () => {
        newFeePercentage = ether(.02);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the streaming fee is not a multiple of a basis point', async () => {
      before(async () => {
        newFeePercentage = ether(.02001);
      });

      after(async () => {
        newFeePercentage = ether(.02);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the passed feeType is not valid', async () => {
      before(async () => {
        feeType = new BigNumber(3);
      });

      after(async () => {
        feeType = ZERO;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#getFee', async () => {
    let subjectIncreaseChainTime: BigNumber;

    let rebalancingSetToken: RebalancingSetFeeMockContract;
    let usdDenominated: boolean;
    let updatedBTCPrice: BigNumber;
    let updatedETHPrice: BigNumber;

    let profitFeePeriod: BigNumber;
    let highWatermarkResetPeriod: BigNumber;
    let profitFeePercentage: BigNumber;
    let streamingFeePercentage: BigNumber;

    before(async () => {
      usdDenominated = true;
      updatedBTCPrice = ether(8000);
      updatedETHPrice = ether(140);

      profitFeePeriod = ONE_DAY_IN_SECONDS.mul(30);
      highWatermarkResetPeriod = ONE_YEAR_IN_SECONDS;
      profitFeePercentage = ether(.2);
      streamingFeePercentage = ether(.02);
    });

    beforeEach(async () => {
      const maxProfitFeePercentage = ether(.5);
      const maxStreamingFeePercentage = ether(.1);
      const oracleWhiteList = usdDenominated ? usdOracleWhiteList.address : ethOracleWhiteList.address;
      feeCalculator = await feeCalculatorHelper.deployPerformanceFeeCalculatorAsync(
        coreMock.address,
        oracleWhiteList,
        maxProfitFeePercentage,
        maxStreamingFeePercentage
      );

      const set1Components = [wrappedETH.address, wrappedBTC.address];
      const set1Units = [wrappedBTCPrice.div(wrappedETHPrice).mul(10 ** 12), new BigNumber(100)];
      const set1NaturalUnit = new BigNumber(10 ** 12);
      const set1 = await coreHelper.createSetTokenAsync(
        coreMock,
        setTokenFactory.address,
        set1Components,
        set1Units,
        set1NaturalUnit,
      );

      rebalancingSetToken = await feeCalculatorHelper.deployRebalancingSetFeeMockAsync(
        new BigNumber(1e6),
        new BigNumber(1e6),
        set1.address,
        feeCalculator.address
      );

      await coreMock.addSet.sendTransactionAsync(rebalancingSetToken.address, txnFrom(ownerAccount));

      const calculatorData = feeCalculatorHelper.generatePerformanceFeeCallData(
        profitFeePeriod,
        highWatermarkResetPeriod,
        profitFeePercentage,
        streamingFeePercentage
      );

      await rebalancingSetToken.initialize.sendTransactionAsync(calculatorData);

      await usdWrappedBTCOracle.updatePrice.sendTransactionAsync(updatedBTCPrice);
      await ethWrappedBTCOracle.updatePrice.sendTransactionAsync(
        updatedBTCPrice.mul(ether(1)).div(updatedETHPrice).round(0, 3)
      );

      await usdWrappedETHOracle.updatePrice.sendTransactionAsync(updatedETHPrice);
      await ethWrappedETHOracle.updatePrice.sendTransactionAsync(
        updatedETHPrice.mul(ether(1)).div(updatedETHPrice).round(0, 3)
      );

      subjectIncreaseChainTime = ONE_YEAR_IN_SECONDS;
    });

    async function subject(): Promise<BigNumber> {
      await blockchain.increaseTimeAsync(subjectIncreaseChainTime);
      await blockchain.mineBlockAsync();
      return rebalancingSetToken.getFee.callAsync();
    }

    it('returns the correct fee', async () => {
      const feeState = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

      const accruedFee = await subject();

      const lastBlock = await web3.eth.getBlock('latest');

      const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
        rebalancingSetToken,
        usdOracleWhiteList,
      );
      const expectedFee = await feeCalculatorHelper.calculateAccruedFeesAsync(
        feeState,
        rebalancingSetValue,
        new BigNumber(lastBlock.timestamp)
      );

      expect(accruedFee).to.bignumber.equal(expectedFee);
    });

    describe('when time since last profit fee does not exceed fee period', async () => {
      beforeEach(async () => {
        subjectIncreaseChainTime = ONE_DAY_IN_SECONDS.mul(15);
      });

      it('should return the correct fee', async () => {
        const feeState = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

        const accruedFee = await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          usdOracleWhiteList,
        );
        const expectedFee = await feeCalculatorHelper.calculateAccruedFeesAsync(
          feeState,
          rebalancingSetValue,
          new BigNumber(lastBlock.timestamp)
        );

        expect(accruedFee).to.bignumber.equal(expectedFee);
      });
    });

    describe('when current value does not exceed highWatermark', async () => {
      before(async () => {
        updatedBTCPrice = ether(6000);
        updatedETHPrice = ether(128);
      });

      after(async () => {
        updatedBTCPrice = ether(8000);
        updatedETHPrice = ether(128);
      });

      it('should return the correct fee', async () => {
        const feeState = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

        const accruedFee = await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          usdOracleWhiteList,
        );
        const expectedFee = await feeCalculatorHelper.calculateAccruedFeesAsync(
          feeState,
          rebalancingSetValue,
          new BigNumber(lastBlock.timestamp)
        );

        expect(accruedFee).to.bignumber.equal(expectedFee);
      });
    });

    describe('when value denominated in ETH', async () => {
      before(async () => {
        usdDenominated = false;
      });

      after(async () => {
        usdDenominated = true;
      });

      it('should return the correct fee', async () => {
        const feeState = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

        const accruedFee = await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          ethOracleWhiteList,
        );
        const expectedFee = await feeCalculatorHelper.calculateAccruedFeesAsync(
          feeState,
          rebalancingSetValue,
          new BigNumber(lastBlock.timestamp)
        );

        expect(accruedFee).to.bignumber.equal(expectedFee);
      });
    });

    describe('when caller is not enabled Set', async () => {
      beforeEach(async () => {
        coreMock.disableSet.sendTransactionAsync(rebalancingSetToken.address, txnFrom(ownerAccount));
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#getCalculatedFees', async () => {
    let subjectIncreaseChainTime: BigNumber;

    let rebalancingSetToken: RebalancingSetFeeMockContract;
    let usdDenominated: boolean;
    let updatedBTCPrice: BigNumber;
    let updatedETHPrice: BigNumber;

    let profitFeePeriod: BigNumber;
    let highWatermarkResetPeriod: BigNumber;
    let profitFeePercentage: BigNumber;
    let streamingFeePercentage: BigNumber;

    before(async () => {
      usdDenominated = true;
      updatedBTCPrice = ether(8000);
      updatedETHPrice = ether(140);

      profitFeePeriod = ONE_DAY_IN_SECONDS.mul(30);
      highWatermarkResetPeriod = ONE_YEAR_IN_SECONDS;
      profitFeePercentage = ether(.2);
      streamingFeePercentage = ether(.02);
    });

    beforeEach(async () => {
      const maxProfitFeePercentage = ether(.5);
      const maxStreamingFeePercentage = ether(.1);
      const oracleWhiteList = usdDenominated ? usdOracleWhiteList.address : ethOracleWhiteList.address;
      feeCalculator = await feeCalculatorHelper.deployPerformanceFeeCalculatorAsync(
        coreMock.address,
        oracleWhiteList,
        maxProfitFeePercentage,
        maxStreamingFeePercentage
      );

      const set1Components = [wrappedETH.address, wrappedBTC.address];
      const set1Units = [wrappedBTCPrice.div(wrappedETHPrice).mul(10 ** 12), new BigNumber(100)];
      const set1NaturalUnit = new BigNumber(10 ** 12);
      const set1 = await coreHelper.createSetTokenAsync(
        coreMock,
        setTokenFactory.address,
        set1Components,
        set1Units,
        set1NaturalUnit,
      );

      rebalancingSetToken = await feeCalculatorHelper.deployRebalancingSetFeeMockAsync(
        new BigNumber(1e6),
        new BigNumber(1e6),
        set1.address,
        feeCalculator.address
      );

      await coreMock.addSet.sendTransactionAsync(rebalancingSetToken.address, txnFrom(ownerAccount));

      const calculatorData = feeCalculatorHelper.generatePerformanceFeeCallData(
        profitFeePeriod,
        highWatermarkResetPeriod,
        profitFeePercentage,
        streamingFeePercentage
      );

      await rebalancingSetToken.initialize.sendTransactionAsync(calculatorData);

      await usdWrappedBTCOracle.updatePrice.sendTransactionAsync(updatedBTCPrice);
      await ethWrappedBTCOracle.updatePrice.sendTransactionAsync(
        updatedBTCPrice.mul(ether(1)).div(updatedETHPrice).round(0, 3)
      );

      await usdWrappedETHOracle.updatePrice.sendTransactionAsync(updatedETHPrice);
      await ethWrappedETHOracle.updatePrice.sendTransactionAsync(
        updatedETHPrice.mul(ether(1)).div(updatedETHPrice).round(0, 3)
      );

      subjectIncreaseChainTime = ONE_YEAR_IN_SECONDS;
    });

    async function subject(): Promise<BigNumber[]> {
      await blockchain.increaseTimeAsync(subjectIncreaseChainTime);
      await blockchain.mineBlockAsync();
      return feeCalculator.getCalculatedFees.callAsync(rebalancingSetToken.address);
    }

    it('returns the correct fees', async () => {
      const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

      const [
        actualStreamingFee,
        actualProfitFee,
      ] = await subject();

      const lastBlock = await web3.eth.getBlock('latest');

      const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
        rebalancingSetToken,
        usdOracleWhiteList,
      );
      const expectedStreamingFee = feeCalculatorHelper.calculateAccruedStreamingFee(
        feeState.streamingFeePercentage,
        new BigNumber(lastBlock.timestamp).sub(feeState.lastStreamingFeeTimestamp)
      );
      const expectedProfitFee = feeCalculatorHelper.calculateAccruedProfitFeeAsync(
        feeState,
        rebalancingSetValue,
        expectedStreamingFee
      );

      expect(actualStreamingFee).to.bignumber.equal(expectedStreamingFee);
      expect(actualProfitFee).to.bignumber.equal(expectedProfitFee);
    });

    describe('when time since last profit fee does not exceed fee period', async () => {
      beforeEach(async () => {
        subjectIncreaseChainTime = ONE_DAY_IN_SECONDS.mul(15);
      });

      it('should return the correct fee', async () => {
        const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

        const [
          actualStreamingFee,
          actualProfitFee,
        ] = await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const expectedStreamingFee = feeCalculatorHelper.calculateAccruedStreamingFee(
          feeState.streamingFeePercentage,
          new BigNumber(lastBlock.timestamp).sub(feeState.lastStreamingFeeTimestamp)
        );
        const expectedProfitFee = ZERO;

        expect(actualStreamingFee).to.bignumber.equal(expectedStreamingFee);
        expect(actualProfitFee).to.bignumber.equal(expectedProfitFee);
      });
    });

    describe('when current value does not exceed highWatermark', async () => {
      before(async () => {
        updatedBTCPrice = ether(6000);
        updatedETHPrice = ether(128);
      });

      after(async () => {
        updatedBTCPrice = ether(8000);
        updatedETHPrice = ether(128);
      });

      it('should return the correct fee', async () => {
        const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

        const [
          actualStreamingFee,
          actualProfitFee,
        ] = await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          usdOracleWhiteList,
        );
        const expectedStreamingFee = feeCalculatorHelper.calculateAccruedStreamingFee(
          feeState.streamingFeePercentage,
          new BigNumber(lastBlock.timestamp).sub(feeState.lastStreamingFeeTimestamp)
        );
        const expectedProfitFee = feeCalculatorHelper.calculateAccruedProfitFeeAsync(
          feeState,
          rebalancingSetValue,
          expectedStreamingFee
        );

        expect(actualStreamingFee).to.bignumber.equal(expectedStreamingFee);
        expect(actualProfitFee).to.bignumber.equal(expectedProfitFee);
      });
    });

    describe('when value denominated in ETH', async () => {
      before(async () => {
        usdDenominated = false;
      });

      after(async () => {
        usdDenominated = true;
      });

      it('should return the correct fee', async () => {
        const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

        const [
          actualStreamingFee,
          actualProfitFee,
        ] = await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          ethOracleWhiteList,
        );
        const expectedStreamingFee = feeCalculatorHelper.calculateAccruedStreamingFee(
          feeState.streamingFeePercentage,
          new BigNumber(lastBlock.timestamp).sub(feeState.lastStreamingFeeTimestamp)
        );
        const expectedProfitFee = feeCalculatorHelper.calculateAccruedProfitFeeAsync(
          feeState,
          rebalancingSetValue,
          expectedStreamingFee
        );

        expect(actualStreamingFee).to.bignumber.equal(expectedStreamingFee);
        expect(actualProfitFee).to.bignumber.equal(expectedProfitFee);
      });
    });

    describe('when caller is not enabled Set', async () => {
      beforeEach(async () => {
        coreMock.disableSet.sendTransactionAsync(rebalancingSetToken.address, txnFrom(ownerAccount));
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#updateAndGetFee', async () => {
    let subjectIncreaseChainTime: BigNumber;

    let rebalancingSetToken: RebalancingSetFeeMockContract;
    let usdDenominated: boolean;
    let updatedBTCPrice: BigNumber;
    let updatedETHPrice: BigNumber;

    let profitFeePeriod: BigNumber;
    let highWatermarkResetPeriod: BigNumber;
    let profitFeePercentage: BigNumber;
    let streamingFeePercentage: BigNumber;

    before(async () => {
      usdDenominated = true;
      updatedBTCPrice = ether(8000);
      updatedETHPrice = ether(140);

      profitFeePeriod = ONE_DAY_IN_SECONDS.mul(30);
      highWatermarkResetPeriod = ONE_YEAR_IN_SECONDS;
      profitFeePercentage = ether(.2);
      streamingFeePercentage = ether(.02);
    });

    beforeEach(async () => {
      const maxProfitFeePercentage = ether(.5);
      const maxStreamingFeePercentage = ether(.1);
      const oracleWhiteList = usdDenominated ? usdOracleWhiteList.address : ethOracleWhiteList.address;
      feeCalculator = await feeCalculatorHelper.deployPerformanceFeeCalculatorAsync(
        coreMock.address,
        oracleWhiteList,
        maxProfitFeePercentage,
        maxStreamingFeePercentage
      );

      const set1Components = [wrappedETH.address, wrappedBTC.address];
      const set1Units = [wrappedBTCPrice.div(wrappedETHPrice).mul(10 ** 12), new BigNumber(100)];
      const set1NaturalUnit = new BigNumber(10 ** 12);
      const set1 = await coreHelper.createSetTokenAsync(
        coreMock,
        setTokenFactory.address,
        set1Components,
        set1Units,
        set1NaturalUnit,
      );

      rebalancingSetToken = await feeCalculatorHelper.deployRebalancingSetFeeMockAsync(
        new BigNumber(1e6),
        new BigNumber(1e6),
        set1.address,
        feeCalculator.address
      );

      await coreMock.addSet.sendTransactionAsync(rebalancingSetToken.address, txnFrom(ownerAccount));

      const calculatorData = feeCalculatorHelper.generatePerformanceFeeCallData(
        profitFeePeriod,
        highWatermarkResetPeriod,
        profitFeePercentage,
        streamingFeePercentage
      );

      await rebalancingSetToken.initialize.sendTransactionAsync(calculatorData);

      await usdWrappedBTCOracle.updatePrice.sendTransactionAsync(updatedBTCPrice);
      await ethWrappedBTCOracle.updatePrice.sendTransactionAsync(
        updatedBTCPrice.mul(ether(1)).div(updatedETHPrice).round(0, 3)
      );

      await usdWrappedETHOracle.updatePrice.sendTransactionAsync(updatedETHPrice);
      await ethWrappedETHOracle.updatePrice.sendTransactionAsync(
        updatedETHPrice.mul(ether(1)).div(updatedETHPrice).round(0, 3)
      );

      subjectIncreaseChainTime = ONE_YEAR_IN_SECONDS;
    });

    async function subject(): Promise<string> {
      await blockchain.increaseTimeAsync(subjectIncreaseChainTime);
      return rebalancingSetToken.updateAndGetFee.sendTransactionAsync();
    }

    it('returns the correct fee', async () => {
      const feeState = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

      await subject();

      const lastBlock = await web3.eth.getBlock('latest');

      const accruedFee = await rebalancingSetToken.fee.callAsync();

      const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
        rebalancingSetToken,
        usdOracleWhiteList,
      );
      const expectedFee = await feeCalculatorHelper.calculateAccruedFeesAsync(
        feeState,
        rebalancingSetValue,
        new BigNumber(lastBlock.timestamp)
      );

      expect(accruedFee).to.bignumber.equal(expectedFee);
    });

    it('sets the correct lastStreamingFeeTimestamp', async () => {
      await subject();

      const lastBlock = await web3.eth.getBlock('latest');

      const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

      expect(feeState.lastStreamingFeeTimestamp).to.bignumber.equal(lastBlock.timestamp);
    });

    it('sets the correct lastProfitFeeTimestamp', async () => {
      await subject();

      const lastBlock = await web3.eth.getBlock('latest');

      const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

      expect(feeState.lastProfitFeeTimestamp).to.bignumber.equal(lastBlock.timestamp);
    });

    it('sets the correct highWatermark', async () => {
      const preFeeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

      await subject();

      const lastBlock = await web3.eth.getBlock('latest');

      const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
        rebalancingSetToken,
        usdOracleWhiteList,
      );
      const expectedHighWatermark = await feeCalculatorHelper.calculateNewHighWatermarkAsync(
        preFeeState,
        rebalancingSetValue,
        new BigNumber(lastBlock.timestamp)
      );

      const postFeeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

      expect(postFeeState.highWatermark).to.bignumber.equal(expectedHighWatermark);
    });

    it('emits the correct FeeActualization log', async () => {
      const preFeeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

      const txHash = await subject();

      const lastBlock = await web3.eth.getBlock('latest');

      const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
        rebalancingSetToken,
        usdOracleWhiteList,
      );
      const expectedHighWatermark = await feeCalculatorHelper.calculateNewHighWatermarkAsync(
        preFeeState,
        rebalancingSetValue,
        new BigNumber(lastBlock.timestamp)
      );
      const expectedStreamingFee = await feeCalculatorHelper.calculateAccruedStreamingFee(
        preFeeState.streamingFeePercentage,
        new BigNumber(lastBlock.timestamp).sub(preFeeState.lastStreamingFeeTimestamp)
      );
      const expectedProfitFee = await feeCalculatorHelper.calculateAccruedProfitFeeAsync(
        preFeeState,
        rebalancingSetValue,
        expectedStreamingFee
      );

      const expectedLogs = getExpectedFeeActualizationLog(
        rebalancingSetToken.address,
        expectedHighWatermark,
        expectedProfitFee,
        expectedStreamingFee,
        feeCalculator.address
      );

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when time since last profit fee does not exceed fee period', async () => {
      beforeEach(async () => {
        subjectIncreaseChainTime = ONE_DAY_IN_SECONDS.mul(15);
      });

      it('returns the correct fee', async () => {
        const feeState = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const accruedFee = await rebalancingSetToken.fee.callAsync();

        const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          usdOracleWhiteList,
        );
        const expectedFee = await feeCalculatorHelper.calculateAccruedFeesAsync(
          feeState,
          rebalancingSetValue,
          new BigNumber(lastBlock.timestamp)
        );

        expect(accruedFee).to.bignumber.equal(expectedFee);
      });

      it('sets the correct lastStreamingFeeTimestamp', async () => {
        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

        expect(feeState.lastStreamingFeeTimestamp).to.bignumber.equal(lastBlock.timestamp);
      });

      it('does not reset lastProfitFeeTimestamp', async () => {
        const preFeeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

        await subject();

        const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

        expect(feeState.lastProfitFeeTimestamp).to.bignumber.equal(preFeeState.lastProfitFeeTimestamp);
      });

      it('does not reset highWatermark', async () => {
        const preFeeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

        await subject();

        const postFeeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

        expect(postFeeState.highWatermark).to.bignumber.equal(preFeeState.highWatermark);
      });

      it('emits the correct FeeActualization log', async () => {
        const preFeeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

        const txHash = await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const expectedStreamingFee = await feeCalculatorHelper.calculateAccruedStreamingFee(
          preFeeState.streamingFeePercentage,
          new BigNumber(lastBlock.timestamp).sub(preFeeState.lastStreamingFeeTimestamp)
        );

        const expectedLogs = getExpectedFeeActualizationLog(
          rebalancingSetToken.address,
          preFeeState.highWatermark,
          ZERO,
          expectedStreamingFee,
          feeCalculator.address
        );

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
      });
    });

    describe('when current value does not exceed highWatermark but highWatermark reset has occured', async () => {
      before(async () => {
        updatedBTCPrice = ether(6000);
        updatedETHPrice = ether(120);
      });

      after(async () => {
        updatedBTCPrice = ether(8000);
        updatedETHPrice = ether(128);
      });

      it('returns the correct fee', async () => {
        const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const accruedFee = await rebalancingSetToken.fee.callAsync();

        const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          usdOracleWhiteList,
        );
        const expectedFee = await feeCalculatorHelper.calculateAccruedFeesAsync(
          feeState,
          rebalancingSetValue,
          new BigNumber(lastBlock.timestamp)
        );
        expect(accruedFee).to.bignumber.equal(expectedFee);
      });

      it('sets the correct lastStreamingFeeTimestamp', async () => {
        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

        expect(feeState.lastStreamingFeeTimestamp).to.bignumber.equal(lastBlock.timestamp);
      });

      it('does not reset lastProfitFeeTimestamp', async () => {
        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

        expect(feeState.lastProfitFeeTimestamp).to.bignumber.equal(lastBlock.timestamp);
      });

      it('does reset the highWatermark', async () => {
        const preFeeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          usdOracleWhiteList,
        );
        const expectedHighWatermark = await feeCalculatorHelper.calculateNewHighWatermarkAsync(
          preFeeState,
          rebalancingSetValue,
          new BigNumber(lastBlock.timestamp)
        );

        const postFeeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);
        expect(postFeeState.highWatermark).to.bignumber.equal(expectedHighWatermark);
      });

      it('emits the correct FeeActualization log', async () => {
        const preFeeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

        const txHash = await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          usdOracleWhiteList,
        );
        const expectedHighWatermark = await feeCalculatorHelper.calculateNewHighWatermarkAsync(
          preFeeState,
          rebalancingSetValue,
          new BigNumber(lastBlock.timestamp)
        );
        const expectedStreamingFee = await feeCalculatorHelper.calculateAccruedStreamingFee(
          preFeeState.streamingFeePercentage,
          new BigNumber(lastBlock.timestamp).sub(preFeeState.lastStreamingFeeTimestamp)
        );
        const expectedProfitFee = await feeCalculatorHelper.calculateAccruedProfitFeeAsync(
          preFeeState,
          rebalancingSetValue,
          expectedStreamingFee
        );

        const expectedLogs = getExpectedFeeActualizationLog(
          rebalancingSetToken.address,
          expectedHighWatermark,
          expectedProfitFee,
          expectedStreamingFee,
          feeCalculator.address
        );

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
      });
    });

    describe('when value denominated in ETH', async () => {
      before(async () => {
        usdDenominated = false;
        updatedETHPrice = ether(128);
      });

      after(async () => {
        usdDenominated = true;
        updatedETHPrice = ether(140);
      });

      it('returns the correct fee', async () => {
        const feeState = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const accruedFee = await rebalancingSetToken.fee.callAsync();

        const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          ethOracleWhiteList,
        );
        const expectedFee = await feeCalculatorHelper.calculateAccruedFeesAsync(
          feeState,
          rebalancingSetValue,
          new BigNumber(lastBlock.timestamp)
        );
        expect(accruedFee).to.bignumber.equal(expectedFee);
      });

      it('sets the correct lastStreamingFeeTimestamp', async () => {
        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

        expect(feeState.lastStreamingFeeTimestamp).to.bignumber.equal(lastBlock.timestamp);
      });

      it('sets the correct lastProfitFeeTimestamp', async () => {
        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const feeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

        expect(feeState.lastProfitFeeTimestamp).to.bignumber.equal(lastBlock.timestamp);
      });

      it('sets the correct highWatermark', async () => {
        const preFeeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          ethOracleWhiteList,
        );
        const expectedHighWatermark = await feeCalculatorHelper.calculateNewHighWatermarkAsync(
          preFeeState,
          rebalancingSetValue,
          new BigNumber(lastBlock.timestamp)
        );

        const postFeeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);
        expect(postFeeState.highWatermark).to.bignumber.equal(expectedHighWatermark);
      });

      it('emits the correct FeeActualization log', async () => {
        const preFeeState: any = await feeCalculator.feeState.callAsync(rebalancingSetToken.address);

        const txHash = await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          ethOracleWhiteList,
        );

        const expectedHighWatermark = await feeCalculatorHelper.calculateNewHighWatermarkAsync(
          preFeeState,
          rebalancingSetValue,
          new BigNumber(lastBlock.timestamp)
        );
        const expectedStreamingFee = await feeCalculatorHelper.calculateAccruedStreamingFee(
          preFeeState.streamingFeePercentage,
          new BigNumber(lastBlock.timestamp).sub(preFeeState.lastStreamingFeeTimestamp)
        );
        const expectedProfitFee = await feeCalculatorHelper.calculateAccruedProfitFeeAsync(
          preFeeState,
          rebalancingSetValue,
          expectedStreamingFee
        );

        const expectedLogs = getExpectedFeeActualizationLog(
          rebalancingSetToken.address,
          expectedHighWatermark,
          expectedProfitFee,
          expectedStreamingFee,
          feeCalculator.address
        );

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
      });
    });

    describe('when caller is not enabled Set', async () => {
      beforeEach(async () => {
        coreMock.disableSet.sendTransactionAsync(rebalancingSetToken.address, txnFrom(ownerAccount));
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});