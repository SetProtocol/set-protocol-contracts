require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as _ from 'lodash';
import * as chai from 'chai';
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
  RebalancingSetTokenV3Contract,
  RebalancingSetTokenV3FactoryContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract,
  WhiteListContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';
import { ether } from '@utils/units';
import {
  DEFAULT_GAS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO
} from '@utils/constants';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { FeeCalculatorHelper } from '@utils/helpers/feeCalculatorHelper';
import { OracleHelper } from 'set-protocol-oracles';
import { RebalancingSetV3Helper } from '@utils/helpers/rebalancingSetV3Helper';
import { ValuationHelper } from '@utils/helpers/valuationHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('PerformanceFeeCalculator Integration Test', accounts => {
  const [
    ownerAccount,
    feeAccount,
    liquidatorAddress,
  ] = accounts;

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let setTokenFactory: SetTokenFactoryContract;
  let rebalancingSetFactory: RebalancingSetTokenV3FactoryContract;
  let vault: VaultContract;
  let ethOracleWhiteList: OracleWhiteListContract;
  let usdOracleWhiteList: OracleWhiteListContract;
  let rebalancingComponentWhiteList: WhiteListContract;
  let liquidatorWhiteList: WhiteListContract;
  let feeCalculatorWhitelist: WhiteListContract;
  let ethFeeCalculator: PerformanceFeeCalculatorContract;
  let usdFeeCalculator: PerformanceFeeCalculatorContract;
  let collateralSet: SetTokenContract;
  let rebalancingSetToken: RebalancingSetTokenV3Contract;

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
  const rebalancingSetV3Helper = new RebalancingSetV3Helper(ownerAccount, coreHelper, erc20Helper, blockchain);

  before(async () => {
    ABIDecoder.addABI(CoreMockContract.getAbi());
    ABIDecoder.addABI(PerformanceFeeCalculatorContract.getAbi());

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    coreMock = await coreHelper.deployCoreMockAsync(transferProxy, vault);

    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(coreMock.address);

    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, setTokenFactory);

    rebalancingComponentWhiteList = await coreHelper.deployWhiteListAsync();
    liquidatorWhiteList = await coreHelper.deployWhiteListAsync([liquidatorAddress]);
    feeCalculatorWhitelist = await coreHelper.deployWhiteListAsync();

    rebalancingSetFactory = await coreHelper.deployRebalancingSetTokenV3FactoryAsync(
      coreMock.address,
      rebalancingComponentWhiteList.address,
      liquidatorWhiteList.address,
      feeCalculatorWhitelist.address,
    );

    await coreHelper.addFactoryAsync(coreMock, rebalancingSetFactory);
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

    await erc20Helper.approveTransfersAsync([wrappedETH, wrappedBTC, dai, usdc], transferProxy.address);

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

    const maxProfitFeePercentage = ether(.5);
    const maxStreamingFeePercentage = ether(.1);
    ethFeeCalculator = await feeCalculatorHelper.deployPerformanceFeeCalculatorAsync(
      coreMock.address,
      ethOracleWhiteList.address,
      maxProfitFeePercentage,
      maxStreamingFeePercentage
    );
    await coreHelper.addAddressToWhiteList(ethFeeCalculator.address, feeCalculatorWhitelist);

    usdFeeCalculator = await feeCalculatorHelper.deployPerformanceFeeCalculatorAsync(
      coreMock.address,
      usdOracleWhiteList.address,
      maxProfitFeePercentage,
      maxStreamingFeePercentage
    );
    await coreHelper.addAddressToWhiteList(usdFeeCalculator.address, feeCalculatorWhitelist);

    const collateralSetComponents = [wrappedETH.address, wrappedBTC.address];
    const collateralSetUnits = [wrappedBTCPrice.div(wrappedETHPrice).mul(10 ** 12), new BigNumber(100)];
    const collateralSetNaturalUnit = new BigNumber(10 ** 12);
    collateralSet = await coreHelper.createSetTokenAsync(
      coreMock,
      setTokenFactory.address,
      collateralSetComponents,
      collateralSetUnits,
      collateralSetNaturalUnit,
    );

    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#updateAndGetFee and adjustFee: USD Denominated', async () => {
    let updatedBTCPrice: BigNumber;
    let updatedETHPrice: BigNumber;
    let chainTimeIncrease: BigNumber;

    let feeType: BigNumber;
    let newFeePercentage: BigNumber;
    let subjectNewFeeData: string;

    let customProfitFeePercentage: BigNumber;
    let customChainTimeIncrease: BigNumber;

    before(async () => {
      updatedBTCPrice = ether(8000);
      updatedETHPrice = ether(140);
    });

    beforeEach(async () => {
      chainTimeIncrease = customChainTimeIncrease || ONE_YEAR_IN_SECONDS;

      const calculatorData = feeCalculatorHelper.generatePerformanceFeeCallDataBuffer(
        ONE_DAY_IN_SECONDS.mul(30),
        ONE_YEAR_IN_SECONDS,
        customProfitFeePercentage || ether(.2),
        ether(.02)
      );

      const naturalUnit = new BigNumber(10 ** 8);
      const set1Value = await valuationHelper.calculateSetTokenValueAsync(collateralSet, usdOracleWhiteList);
      const units = new BigNumber(100).mul(naturalUnit).mul(10 ** 18).div(set1Value).round(0, 3);
      const callData = rebalancingSetV3Helper.generateRebalancingSetTokenV3CallData(
        ownerAccount,
        liquidatorAddress,
        feeAccount,
        usdFeeCalculator.address,
        ONE_DAY_IN_SECONDS,
        ONE_DAY_IN_SECONDS.mul(2),
        ZERO,
        ZERO,
        calculatorData
      );

      rebalancingSetToken = await rebalancingSetV3Helper.createRebalancingTokenV3Async(
        coreMock,
        rebalancingSetFactory.address,
        [collateralSet.address],
        [units],
        naturalUnit,
        callData
      );

      await usdWrappedBTCOracle.updatePrice.sendTransactionAsync(updatedBTCPrice);
      await usdWrappedETHOracle.updatePrice.sendTransactionAsync(updatedETHPrice);

      // Issue currentSetToken
      const currentSetIssueQuantity = ether(8);
      await coreMock.issue.sendTransactionAsync(
        collateralSet.address,
        currentSetIssueQuantity,
        {from: ownerAccount}
      );
      await erc20Helper.approveTransfersAsync([collateralSet], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      const rebalancingSetQuantityToIssue = ether(7);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

      await blockchain.increaseTimeAsync(chainTimeIncrease);
      await blockchain.mineBlockAsync();
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.actualizeFee.sendTransactionAsync();
    }

    async function adjustFeeSubject(): Promise<string> {
      subjectNewFeeData = feeCalculatorHelper.generateAdjustFeeCallData(
        feeType,
        newFeePercentage
      );

      return rebalancingSetToken.adjustFee.sendTransactionAsync(
        subjectNewFeeData,
        { from: ownerAccount, gas: DEFAULT_GAS }
      );
    }

    it('mints the correct Rebalancing Set to the feeRecipient', async () => {
      const preFeeState: any = await usdFeeCalculator.feeState.callAsync(rebalancingSetToken.address);
      const previousSupply = await rebalancingSetToken.totalSupply.callAsync();
      const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
        rebalancingSetToken,
        usdOracleWhiteList,
      );

      await subject();

      const lastBlock = await web3.eth.getBlock('latest');

      const expectedFeePercentage = await feeCalculatorHelper.calculateAccruedFeesAsync(
        preFeeState,
        rebalancingSetValue,
        new BigNumber(lastBlock.timestamp)
      );

      const rebalanceFeeInflation = await rebalancingSetV3Helper.calculateRebalanceFeeInflation(
        expectedFeePercentage,
        previousSupply
      );

      const feeRecipientBalance = await rebalancingSetToken.balanceOf.callAsync(feeAccount);
      expect(feeRecipientBalance).to.bignumber.equal(rebalanceFeeInflation);
    });

    it('increments the totalSupply properly', async () => {
      const preFeeState: any = await usdFeeCalculator.feeState.callAsync(rebalancingSetToken.address);
      const previousSupply = await rebalancingSetToken.totalSupply.callAsync();
      const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
        rebalancingSetToken,
        usdOracleWhiteList,
      );

      await subject();

      const lastBlock = await web3.eth.getBlock('latest');

      const expectedFeePercentage = await feeCalculatorHelper.calculateAccruedFeesAsync(
        preFeeState,
        rebalancingSetValue,
        new BigNumber(lastBlock.timestamp)
      );

      const rebalanceFeeInflation = await rebalancingSetV3Helper.calculateRebalanceFeeInflation(
        expectedFeePercentage,
        previousSupply
      );

      const newSupply = await rebalancingSetToken.totalSupply.callAsync(feeAccount);
      expect(newSupply).to.bignumber.equal(previousSupply.add(rebalanceFeeInflation));
    });

    it('updates the unitShares amount correctly', async () => {
      await subject();

      const unitShares = await rebalancingSetV3Helper.getExpectedIncentiveFeeUnitShares(
        rebalancingSetToken,
        collateralSet,
        vault
      );
      const newUnitShares = await rebalancingSetToken.unitShares.callAsync();
      expect(newUnitShares).to.be.bignumber.equal(unitShares);
    });

    it('sets the correct lastStreamingFeeTimestamp', async () => {
      await subject();

      const lastBlock = await web3.eth.getBlock('latest');

      const feeState: any = await usdFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

      expect(feeState.lastStreamingFeeTimestamp).to.bignumber.equal(lastBlock.timestamp);
    });

    it('sets the correct lastProfitFeeTimestamp', async () => {
      await subject();

      const lastBlock = await web3.eth.getBlock('latest');

      const feeState: any = await usdFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

      expect(feeState.lastProfitFeeTimestamp).to.bignumber.equal(lastBlock.timestamp);
    });

    it('sets the correct highWatermark', async () => {
      const preFeeState: any = await usdFeeCalculator.feeState.callAsync(rebalancingSetToken.address);
      const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
        rebalancingSetToken,
        usdOracleWhiteList,
      );

      await subject();

      const lastBlock = await web3.eth.getBlock('latest');

      const expectedHighWatermark: any = await feeCalculatorHelper.calculateNewHighWatermarkAsync(
        preFeeState,
        rebalancingSetValue,
        new BigNumber(lastBlock.timestamp)
      );

      const postFeeState: any = await usdFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

      expect(postFeeState.highWatermark).to.bignumber.equal(expectedHighWatermark);
    });

    describe('when time since last profit fee does not exceed fee frequency', async () => {
      before(async () => {
        customChainTimeIncrease = ONE_DAY_IN_SECONDS.mul(15);
      });

      after(async () => {
        customChainTimeIncrease = undefined;
      });

      it('mints the correct Rebalancing Set to the feeRecipient', async () => {
        const preFeeState: any = await usdFeeCalculator.feeState.callAsync(rebalancingSetToken.address);
        const previousSupply = await rebalancingSetToken.totalSupply.callAsync();
        const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          usdOracleWhiteList,
        );

        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const expectedFeePercentage = await feeCalculatorHelper.calculateAccruedFeesAsync(
          preFeeState,
          rebalancingSetValue,
          new BigNumber(lastBlock.timestamp)
        );

        const rebalanceFeeInflation = await rebalancingSetV3Helper.calculateRebalanceFeeInflation(
          expectedFeePercentage,
          previousSupply
        );

        const feeRecipientBalance = await rebalancingSetToken.balanceOf.callAsync(feeAccount);
        expect(feeRecipientBalance).to.bignumber.equal(rebalanceFeeInflation);
      });

      it('increments the totalSupply properly', async () => {
        const preFeeState: any = await usdFeeCalculator.feeState.callAsync(rebalancingSetToken.address);
        const previousSupply = await rebalancingSetToken.totalSupply.callAsync();
        const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          usdOracleWhiteList,
        );

        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const expectedFeePercentage = await feeCalculatorHelper.calculateAccruedFeesAsync(
          preFeeState,
          rebalancingSetValue,
          new BigNumber(lastBlock.timestamp)
        );

        const rebalanceFeeInflation = await rebalancingSetV3Helper.calculateRebalanceFeeInflation(
          expectedFeePercentage,
          previousSupply
        );

        const newSupply = await rebalancingSetToken.totalSupply.callAsync(feeAccount);
        expect(newSupply).to.bignumber.equal(previousSupply.add(rebalanceFeeInflation));
      });

      it('updates the unitShares amount correctly', async () => {
        await subject();

        const unitShares = await rebalancingSetV3Helper.getExpectedIncentiveFeeUnitShares(
          rebalancingSetToken,
          collateralSet,
          vault
        );
        const newUnitShares = await rebalancingSetToken.unitShares.callAsync();
        expect(newUnitShares).to.be.bignumber.equal(unitShares);
      });

      it('sets the correct lastStreamingFeeTimestamp', async () => {
        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const feeState: any = await usdFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

        expect(feeState.lastStreamingFeeTimestamp).to.bignumber.equal(lastBlock.timestamp);
      });

      it('sets the correct lastProfitFeeTimestamp', async () => {
        const preFeeState: any = await usdFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

        await subject();

        const feeState: any = await usdFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

        expect(feeState.lastProfitFeeTimestamp).to.bignumber.equal(preFeeState.lastProfitFeeTimestamp);
      });

      it('sets the correct highWatermark', async () => {
        const preFeeState: any = await usdFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

        await subject();

        const postFeeState: any = await usdFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

        expect(postFeeState.highWatermark).to.bignumber.equal(preFeeState.highWatermark);
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

      it('mints the correct Rebalancing Set to the feeRecipient', async () => {
        const preFeeState: any = await usdFeeCalculator.feeState.callAsync(rebalancingSetToken.address);
        const previousSupply = await rebalancingSetToken.totalSupply.callAsync();
        const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          usdOracleWhiteList,
        );

        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const expectedFeePercentage = await feeCalculatorHelper.calculateAccruedFeesAsync(
          preFeeState,
          rebalancingSetValue,
          new BigNumber(lastBlock.timestamp)
        );

        const rebalanceFeeInflation = await rebalancingSetV3Helper.calculateRebalanceFeeInflation(
          expectedFeePercentage,
          previousSupply
        );

        const feeRecipientBalance = await rebalancingSetToken.balanceOf.callAsync(feeAccount);
        expect(feeRecipientBalance).to.bignumber.equal(rebalanceFeeInflation);
      });

      it('increments the totalSupply properly', async () => {
        const preFeeState: any = await usdFeeCalculator.feeState.callAsync(rebalancingSetToken.address);
        const previousSupply = await rebalancingSetToken.totalSupply.callAsync();
        const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          usdOracleWhiteList,
        );

        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const expectedFeePercentage = await feeCalculatorHelper.calculateAccruedFeesAsync(
          preFeeState,
          rebalancingSetValue,
          new BigNumber(lastBlock.timestamp)
        );

        const rebalanceFeeInflation = await rebalancingSetV3Helper.calculateRebalanceFeeInflation(
          expectedFeePercentage,
          previousSupply
        );

        const newSupply = await rebalancingSetToken.totalSupply.callAsync(feeAccount);
        expect(newSupply).to.bignumber.equal(previousSupply.add(rebalanceFeeInflation));
      });

      it('updates the unitShares amount correctly', async () => {
        await subject();

        const unitShares = await rebalancingSetV3Helper.getExpectedIncentiveFeeUnitShares(
          rebalancingSetToken,
          collateralSet,
          vault
        );
        const newUnitShares = await rebalancingSetToken.unitShares.callAsync();
        expect(newUnitShares).to.be.bignumber.equal(unitShares);
      });

      it('sets the correct lastStreamingFeeTimestamp', async () => {
        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const feeState: any = await usdFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

        expect(feeState.lastStreamingFeeTimestamp).to.bignumber.equal(lastBlock.timestamp);
      });

      it('sets the correct lastProfitFeeTimestamp', async () => {
        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const feeState: any = await usdFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

        expect(feeState.lastProfitFeeTimestamp).to.bignumber.equal(lastBlock.timestamp);
      });

      it('sets the correct highWatermark', async () => {
        const preFeeState: any = await usdFeeCalculator.feeState.callAsync(rebalancingSetToken.address);
        const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          usdOracleWhiteList,
        );

        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const expectedHighWatermark: any = await feeCalculatorHelper.calculateNewHighWatermarkAsync(
          preFeeState,
          rebalancingSetValue,
          new BigNumber(lastBlock.timestamp)
        );

        const postFeeState: any = await usdFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

        expect(postFeeState.highWatermark).to.bignumber.equal(expectedHighWatermark);
      });
    });

    describe('when the initial profit fee is 0, there is a profit, and the fees change', async () => {
      before(async () => {
        customProfitFeePercentage = ether(0);
        customChainTimeIncrease = ONE_YEAR_IN_SECONDS.div(2);
      });

      after(async () => {
        customProfitFeePercentage = undefined;
        customChainTimeIncrease = undefined;
      });

      beforeEach(async () => {
        feeType = new BigNumber(1);
        newFeePercentage = ether(0.1);
      });

      it('resets the highWatermark to the current RebalancingSet value', async () => {
        await adjustFeeSubject();

        const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          usdOracleWhiteList,
        );

        const postFeeState: any = await usdFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

        expect(postFeeState.highWatermark).to.bignumber.equal(rebalancingSetValue);
      });

      it('sets the correct fee', async () => {
        await adjustFeeSubject();

        const postFeeState: any = await usdFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

        expect(postFeeState.profitFeePercentage).to.bignumber.equal(newFeePercentage);
      });

    });
  });

  describe('#updateAndGetFee: ETH Denominated', async () => {
    let updatedBTCPrice: BigNumber;
    let updatedETHPrice: BigNumber;
    let chainTimeIncrease: BigNumber;

    before(async () => {
      chainTimeIncrease = ONE_YEAR_IN_SECONDS;
      updatedBTCPrice = ether(8000);
      updatedETHPrice = ether(128);
    });

    beforeEach(async () => {
      const calculatorData = feeCalculatorHelper.generatePerformanceFeeCallDataBuffer(
        ONE_DAY_IN_SECONDS.mul(30),
        ONE_YEAR_IN_SECONDS,
        ether(.2),
        ether(.02)
      );

      const naturalUnit = new BigNumber(10 ** 8);
      const set1Value = await valuationHelper.calculateSetTokenValueAsync(collateralSet, usdOracleWhiteList);
      const units = new BigNumber(100).mul(naturalUnit).mul(10 ** 18).div(set1Value).round(0, 3);
      const callData = rebalancingSetV3Helper.generateRebalancingSetTokenV3CallData(
        ownerAccount,
        liquidatorAddress,
        feeAccount,
        ethFeeCalculator.address,
        ONE_DAY_IN_SECONDS,
        ONE_DAY_IN_SECONDS.mul(2),
        ZERO,
        ZERO,
        calculatorData
      );

      rebalancingSetToken = await rebalancingSetV3Helper.createRebalancingTokenV3Async(
        coreMock,
        rebalancingSetFactory.address,
        [collateralSet.address],
        [units],
        naturalUnit,
        callData
      );

      await ethWrappedBTCOracle.updatePrice.sendTransactionAsync(
        updatedBTCPrice.mul(ether(1)).div(updatedETHPrice).round(0, 3)
      );
      await ethWrappedETHOracle.updatePrice.sendTransactionAsync(
        updatedETHPrice.mul(ether(1)).div(updatedETHPrice).round(0, 3)
      );

      // Issue currentSetToken
      const currentSetIssueQuantity = ether(8);
      await coreMock.issue.sendTransactionAsync(
        collateralSet.address,
        currentSetIssueQuantity,
        {from: ownerAccount}
      );
      await erc20Helper.approveTransfersAsync([collateralSet], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      const rebalancingSetQuantityToIssue = ether(7);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

      await blockchain.increaseTimeAsync(chainTimeIncrease);
      await blockchain.mineBlockAsync();
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.actualizeFee.sendTransactionAsync();
    }

    it('mints the correct Rebalancing Set to the feeRecipient', async () => {
      const preFeeState: any = await ethFeeCalculator.feeState.callAsync(rebalancingSetToken.address);
      const previousSupply = await rebalancingSetToken.totalSupply.callAsync();
      const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
        rebalancingSetToken,
        ethOracleWhiteList,
      );

      await subject();

      const lastBlock = await web3.eth.getBlock('latest');

      const expectedFeePercentage = await feeCalculatorHelper.calculateAccruedFeesAsync(
        preFeeState,
        rebalancingSetValue,
        new BigNumber(lastBlock.timestamp)
      );

      const rebalanceFeeInflation = await rebalancingSetV3Helper.calculateRebalanceFeeInflation(
        expectedFeePercentage,
        previousSupply
      );

      const feeRecipientBalance = await rebalancingSetToken.balanceOf.callAsync(feeAccount);
      expect(feeRecipientBalance).to.bignumber.equal(rebalanceFeeInflation);
    });

    it('increments the totalSupply properly', async () => {
      const preFeeState: any = await ethFeeCalculator.feeState.callAsync(rebalancingSetToken.address);
      const previousSupply = await rebalancingSetToken.totalSupply.callAsync();
      const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
        rebalancingSetToken,
        ethOracleWhiteList,
      );

      await subject();

      const lastBlock = await web3.eth.getBlock('latest');

      const expectedFeePercentage = await feeCalculatorHelper.calculateAccruedFeesAsync(
        preFeeState,
        rebalancingSetValue,
        new BigNumber(lastBlock.timestamp)
      );


      const rebalanceFeeInflation = await rebalancingSetV3Helper.calculateRebalanceFeeInflation(
        expectedFeePercentage,
        previousSupply
      );

      const newSupply = await rebalancingSetToken.totalSupply.callAsync(feeAccount);
      expect(newSupply).to.bignumber.equal(previousSupply.add(rebalanceFeeInflation));
    });

    it('updates the unitShares amount correctly', async () => {
      await subject();

      const unitShares = await rebalancingSetV3Helper.getExpectedIncentiveFeeUnitShares(
        rebalancingSetToken,
        collateralSet,
        vault
      );
      const newUnitShares = await rebalancingSetToken.unitShares.callAsync();
      expect(newUnitShares).to.be.bignumber.equal(unitShares);
    });

    it('sets the correct lastStreamingFeeTimestamp', async () => {
      await subject();

      const lastBlock = await web3.eth.getBlock('latest');

      const feeState: any = await ethFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

      expect(feeState.lastStreamingFeeTimestamp).to.bignumber.equal(lastBlock.timestamp);
    });

    it('sets the correct lastProfitFeeTimestamp', async () => {
      await subject();

      const lastBlock = await web3.eth.getBlock('latest');

      const feeState: any = await ethFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

      expect(feeState.lastProfitFeeTimestamp).to.bignumber.equal(lastBlock.timestamp);
    });

    it('sets the correct highWatermark', async () => {
      const preFeeState: any = await ethFeeCalculator.feeState.callAsync(rebalancingSetToken.address);
      const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
        rebalancingSetToken,
        ethOracleWhiteList,
      );

      await subject();

      const lastBlock = await web3.eth.getBlock('latest');

      const expectedHighWatermark: any = await feeCalculatorHelper.calculateNewHighWatermarkAsync(
        preFeeState,
        rebalancingSetValue,
        new BigNumber(lastBlock.timestamp)
      );

      const postFeeState: any = await ethFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

      expect(postFeeState.highWatermark).to.bignumber.equal(expectedHighWatermark);
    });

    describe('when time since last profit fee does not exceed fee frequency', async () => {
      before(async () => {
        chainTimeIncrease = ONE_DAY_IN_SECONDS.mul(15);
      });

      after(async () => {
        chainTimeIncrease = ONE_YEAR_IN_SECONDS;
      });

      it('mints the correct Rebalancing Set to the feeRecipient', async () => {
        const preFeeState: any = await ethFeeCalculator.feeState.callAsync(rebalancingSetToken.address);
        const previousSupply = await rebalancingSetToken.totalSupply.callAsync();
        const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          ethOracleWhiteList,
        );

        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const expectedFeePercentage = await feeCalculatorHelper.calculateAccruedFeesAsync(
          preFeeState,
          rebalancingSetValue,
          new BigNumber(lastBlock.timestamp)
        );

        const rebalanceFeeInflation = await rebalancingSetV3Helper.calculateRebalanceFeeInflation(
          expectedFeePercentage,
          previousSupply
        );

        const feeRecipientBalance = await rebalancingSetToken.balanceOf.callAsync(feeAccount);
        expect(feeRecipientBalance).to.bignumber.equal(rebalanceFeeInflation);
      });

      it('increments the totalSupply properly', async () => {
        const preFeeState: any = await ethFeeCalculator.feeState.callAsync(rebalancingSetToken.address);
        const previousSupply = await rebalancingSetToken.totalSupply.callAsync();
        const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          ethOracleWhiteList,
        );

        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const expectedFeePercentage = await feeCalculatorHelper.calculateAccruedFeesAsync(
          preFeeState,
          rebalancingSetValue,
          new BigNumber(lastBlock.timestamp)
        );


        const rebalanceFeeInflation = await rebalancingSetV3Helper.calculateRebalanceFeeInflation(
          expectedFeePercentage,
          previousSupply
        );

        const newSupply = await rebalancingSetToken.totalSupply.callAsync(feeAccount);
        expect(newSupply).to.bignumber.equal(previousSupply.add(rebalanceFeeInflation));
      });

      it('updates the unitShares amount correctly', async () => {
        await subject();

        const unitShares = await rebalancingSetV3Helper.getExpectedIncentiveFeeUnitShares(
          rebalancingSetToken,
          collateralSet,
          vault
        );
        const newUnitShares = await rebalancingSetToken.unitShares.callAsync();
        expect(newUnitShares).to.be.bignumber.equal(unitShares);
      });

      it('sets the correct lastStreamingFeeTimestamp', async () => {
        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const feeState: any = await ethFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

        expect(feeState.lastStreamingFeeTimestamp).to.bignumber.equal(lastBlock.timestamp);
      });

      it('sets the correct lastProfitFeeTimestamp', async () => {
        const preFeeState: any = await ethFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

        await subject();

        const feeState: any = await ethFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

        expect(feeState.lastProfitFeeTimestamp).to.bignumber.equal(preFeeState.lastProfitFeeTimestamp);
      });

      it('sets the correct highWatermark', async () => {
        const preFeeState: any = await ethFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

        await subject();

        const postFeeState: any = await ethFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

        expect(postFeeState.highWatermark).to.bignumber.equal(preFeeState.highWatermark);
      });
    });

    describe('when current value does not exceed highWatermark but highWatermark reset has occured', async () => {
      before(async () => {
        updatedBTCPrice = ether(8000);
        updatedETHPrice = ether(140);
      });

      after(async () => {
        updatedBTCPrice = ether(8000);
        updatedETHPrice = ether(128);
      });

      it('mints the correct Rebalancing Set to the feeRecipient', async () => {
        const preFeeState: any = await ethFeeCalculator.feeState.callAsync(rebalancingSetToken.address);
        const previousSupply = await rebalancingSetToken.totalSupply.callAsync();
        const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          ethOracleWhiteList,
        );

        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const expectedFeePercentage = await feeCalculatorHelper.calculateAccruedFeesAsync(
          preFeeState,
          rebalancingSetValue,
          new BigNumber(lastBlock.timestamp)
        );

        const rebalanceFeeInflation = await rebalancingSetV3Helper.calculateRebalanceFeeInflation(
          expectedFeePercentage,
          previousSupply
        );

        const feeRecipientBalance = await rebalancingSetToken.balanceOf.callAsync(feeAccount);
        expect(feeRecipientBalance).to.bignumber.equal(rebalanceFeeInflation);
      });

      it('increments the totalSupply properly', async () => {
        const preFeeState: any = await ethFeeCalculator.feeState.callAsync(rebalancingSetToken.address);
        const previousSupply = await rebalancingSetToken.totalSupply.callAsync();
        const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          ethOracleWhiteList,
        );

        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const expectedFeePercentage = await feeCalculatorHelper.calculateAccruedFeesAsync(
          preFeeState,
          rebalancingSetValue,
          new BigNumber(lastBlock.timestamp)
        );

        const rebalanceFeeInflation = await rebalancingSetV3Helper.calculateRebalanceFeeInflation(
          expectedFeePercentage,
          previousSupply
        );

        const newSupply = await rebalancingSetToken.totalSupply.callAsync(feeAccount);
        expect(newSupply).to.bignumber.equal(previousSupply.add(rebalanceFeeInflation));
      });

      it('updates the unitShares amount correctly', async () => {
        await subject();

        const unitShares = await rebalancingSetV3Helper.getExpectedIncentiveFeeUnitShares(
          rebalancingSetToken,
          collateralSet,
          vault
        );
        const newUnitShares = await rebalancingSetToken.unitShares.callAsync();
        expect(newUnitShares).to.be.bignumber.equal(unitShares);
      });

      it('sets the correct lastStreamingFeeTimestamp', async () => {
        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const feeState: any = await ethFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

        expect(feeState.lastStreamingFeeTimestamp).to.bignumber.equal(lastBlock.timestamp);
      });

      it('sets the correct lastProfitFeeTimestamp', async () => {
        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const feeState: any = await ethFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

        expect(feeState.lastProfitFeeTimestamp).to.bignumber.equal(lastBlock.timestamp);
      });

      it('sets the correct highWatermark', async () => {
        const preFeeState: any = await ethFeeCalculator.feeState.callAsync(rebalancingSetToken.address);
        const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
          rebalancingSetToken,
          ethOracleWhiteList,
        );

        await subject();

        const lastBlock = await web3.eth.getBlock('latest');

        const expectedHighWatermark: any = await feeCalculatorHelper.calculateNewHighWatermarkAsync(
          preFeeState,
          rebalancingSetValue,
          new BigNumber(lastBlock.timestamp)
        );

        const postFeeState: any = await ethFeeCalculator.feeState.callAsync(rebalancingSetToken.address);

        expect(postFeeState.highWatermark).to.bignumber.equal(expectedHighWatermark);
      });
    });
  });
});