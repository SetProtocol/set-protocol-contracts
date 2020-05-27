require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreMockContract,
  PerformanceFeeCalculatorContract,
  RebalancingSetTokenV3Contract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ether } from '@utils/units';
import {
  DEFAULT_GAS,
  ONE_DAY_IN_SECONDS,
  ONE_MONTH_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO,
} from '@utils/constants';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { OracleHelper } from 'set-protocol-oracles';
import { RebalancingSetV3Helper } from '@utils/helpers/rebalancingSetV3Helper';
import { FeeCalculatorHelper } from '@utils/helpers/feeCalculatorHelper';
import { ValuationHelper } from '@utils/helpers/valuationHelper';
import { RebalanceTestSetup, PriceUpdate } from '@utils/helpers/rebalanceTestSetup';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);

interface RebalancingSetDetails {
  unitShares: BigNumber;
  naturalUnit: BigNumber;
  supply: BigNumber;
}

interface SetDetails {
  components: string[];
  units: BigNumber[];
  naturalUnit: BigNumber;
}

interface ComponentSettings {
  component1Price: BigNumber;
  component2Price: BigNumber;
  component1Decimals: number;
  component2Decimals: number;
}

interface ScenarioAssertions {
  profitFeeHasChanged: boolean;
  highWaterMarkHasChanged: boolean;
  lastProfitFeeTimestampHasChanged: boolean;
}

interface PerfFeeScenarios {
  name: string;
  rebalancingSet: RebalancingSetDetails;
  currentSet: SetDetails;
  components: ComponentSettings;
  highWatermarkResetPeriod: BigNumber;
  profitFee: BigNumber;
  t1: {
    timeElapsed: BigNumber;
    prices: PriceUpdate;
    newProfitFee: BigNumber;
  };
  asserts: ScenarioAssertions;
}

interface CheckPoint {
  rebalancingSetValue: BigNumber;
  highWatermark: BigNumber;
  profitFeePercentage: BigNumber;
  lastProfitFeeTimestamp: BigNumber;
  unitShares: BigNumber;
  totalSupply: BigNumber;
  feeRecipientShares: BigNumber;
}


// ETH/BTC 50%/50% Set
const standardRebalancingSet: RebalancingSetDetails = {
  unitShares: new BigNumber(800000),
  naturalUnit: new BigNumber(100000000),
  supply: new BigNumber('14256596210800000000000'),
};

const standardCurrentSet: SetDetails = {
  components: ['component1', 'component2'], // ETH and WBTC
  units: [new BigNumber(500000000000000), new BigNumber(1000)],
  naturalUnit: new BigNumber(10000000000000),
};

const standardComponentSetup: ComponentSettings = {
  component1Price: ether(200),
  component2Price: ether(10000),
  component1Decimals: 18,
  component2Decimals: 8,
};

const scenarios: PerfFeeScenarios[] = [
  {
    name: 'Scenario 1',
    rebalancingSet: standardRebalancingSet,
    currentSet: standardCurrentSet,
    components: standardComponentSetup,
    profitFee: ether(0.1),
    highWatermarkResetPeriod: ONE_YEAR_IN_SECONDS,
    t1: {
      timeElapsed: ONE_YEAR_IN_SECONDS,
      prices: {
        component2Price: ether(9000),
      },
      newProfitFee: ether(0.2),
    },
    asserts: {
      profitFeeHasChanged: true,
      highWaterMarkHasChanged: true,
      lastProfitFeeTimestampHasChanged: true,
    },
  },
  {
    name: 'Scenario 2',
    rebalancingSet: standardRebalancingSet,
    currentSet: standardCurrentSet,
    components: standardComponentSetup,
    profitFee: ether(0.05),
    highWatermarkResetPeriod: ONE_YEAR_IN_SECONDS,
    t1: {
      timeElapsed: ONE_YEAR_IN_SECONDS,
      prices: {
        component2Price: ether(9000),
      },
      newProfitFee: ether(0.1),
    },
    asserts: {
      profitFeeHasChanged: true,
      highWaterMarkHasChanged: true,
      lastProfitFeeTimestampHasChanged: true,
    },
  },
  {
    name: 'Scenario 3',
    rebalancingSet: standardRebalancingSet,
    currentSet: standardCurrentSet,
    components: standardComponentSetup,
    profitFee: ether(0),
    highWatermarkResetPeriod: ONE_YEAR_IN_SECONDS,
    t1: {
      timeElapsed: ONE_MONTH_IN_SECONDS.mul(2),
      prices: {
        component2Price: ether(9000),
      },
      newProfitFee: ether(0.1),
    },
    asserts: {
      profitFeeHasChanged: true,
      highWaterMarkHasChanged: false,
      lastProfitFeeTimestampHasChanged: false,
    },
  },
  {
    name: 'Scenario 4',
    rebalancingSet: standardRebalancingSet,
    currentSet: standardCurrentSet,
    components: standardComponentSetup,
    profitFee: ether(0.05),
    highWatermarkResetPeriod: ONE_YEAR_IN_SECONDS,
    t1: {
      timeElapsed: ONE_MONTH_IN_SECONDS.mul(2),
      prices: {
        component2Price: ether(9000),
      },
      newProfitFee: ether(0.1),
    },
    asserts: {
      profitFeeHasChanged: true,
      highWaterMarkHasChanged: false,
      lastProfitFeeTimestampHasChanged: false,
    },
  },
  {
    name: 'Scenario 5',
    rebalancingSet: standardRebalancingSet,
    currentSet: standardCurrentSet,
    components: standardComponentSetup,
    profitFee: ether(0),
    highWatermarkResetPeriod: ONE_YEAR_IN_SECONDS,
    t1: {
      timeElapsed: ONE_YEAR_IN_SECONDS,
      prices: {
        component2Price: ether(11000),
      },
      newProfitFee: ether(0.1),
    },
    asserts: {
      profitFeeHasChanged: true,
      highWaterMarkHasChanged: true,
      lastProfitFeeTimestampHasChanged: true,
    },
  },
  {
    name: 'Scenario 6',
    rebalancingSet: standardRebalancingSet,
    currentSet: standardCurrentSet,
    components: standardComponentSetup,
    profitFee: ether(0),
    highWatermarkResetPeriod: ONE_YEAR_IN_SECONDS,
    t1: {
      timeElapsed: ONE_MONTH_IN_SECONDS.mul(2),
      prices: {
        component2Price: ether(11000),
      },
      newProfitFee: ether(0.1),
    },
    asserts: {
      profitFeeHasChanged: true,
      highWaterMarkHasChanged: true,
      lastProfitFeeTimestampHasChanged: true,
    },
  },
  {
    name: 'Scenario 7',
    rebalancingSet: standardRebalancingSet,
    currentSet: standardCurrentSet,
    components: standardComponentSetup,
    profitFee: ether(0.05),
    highWatermarkResetPeriod: ONE_YEAR_IN_SECONDS,
    t1: {
      timeElapsed: ONE_MONTH_IN_SECONDS.mul(2),
      prices: {
        component2Price: ether(11000),
      },
      newProfitFee: ether(0.1),
    },
    asserts: {
      profitFeeHasChanged: true,
      highWaterMarkHasChanged: true,
      lastProfitFeeTimestampHasChanged: true,
    },
  },
  {
    name: 'Scenario 8',
    rebalancingSet: standardRebalancingSet,
    currentSet: standardCurrentSet,
    components: standardComponentSetup,
    highWatermarkResetPeriod: ONE_YEAR_IN_SECONDS,
    profitFee: ether(0.00),
    t1: {
      timeElapsed: ZERO,
      prices: {
        component2Price: ether(9000),
      },
      newProfitFee: ether(0.1),
    },
    asserts: {
      profitFeeHasChanged: true,
      highWaterMarkHasChanged: false,
      lastProfitFeeTimestampHasChanged: false,
    },
  },
  {
    name: 'Scenario 9',
    rebalancingSet: standardRebalancingSet,
    currentSet: standardCurrentSet,
    components: standardComponentSetup,
    highWatermarkResetPeriod: ONE_YEAR_IN_SECONDS,
    profitFee: ether(0.05),
    t1: {
      timeElapsed: ZERO,
      prices: {
        component2Price: ether(9000),
      },
      newProfitFee: ether(0.1),
    },
    asserts: {
      profitFeeHasChanged: true,
      highWaterMarkHasChanged: false,
      lastProfitFeeTimestampHasChanged: false,
    },
  },
];

contract('PerformanceFeeCalculator Scenarios', accounts => {
  const [
    deployerAccount,
    managerAccount,
    feeRecipient,
  ] = accounts;

  let rebalancingSetToken: RebalancingSetTokenV3Contract;

  let performanceFeeCalculator: PerformanceFeeCalculatorContract;

  const maxStreamingFee = ether(0.05); // 5%
  const maxProfitFee = ether(0.4); // 40%
  const defaultProfitFeePeriod = ONE_MONTH_IN_SECONDS;
  const defaultStreamingFeePercentage = ZERO;

  let setup: RebalanceTestSetup;
  let checkPoints: CheckPoint[];

  const coreHelper = new CoreHelper(deployerAccount, deployerAccount);
  const erc20Helper = new ERC20Helper(deployerAccount);
  const rebalancingHelper = new RebalancingSetV3Helper(
    deployerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );
  const oracleHelper = new OracleHelper(deployerAccount);
  const valuationHelper = new ValuationHelper(deployerAccount, coreHelper, erc20Helper, oracleHelper);
  const feeCalculatorHelper = new FeeCalculatorHelper(deployerAccount);

  before(async () => {
    ABIDecoder.addABI(CoreMockContract.getAbi());
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMockContract.getAbi());
  });

  beforeEach(async () => {
    blockchain.saveSnapshotAsync();

    setup = new RebalanceTestSetup(deployerAccount);
    checkPoints = [];
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe(`Running Scenarios`, async () => {
    it('should successfully complete 0', async () => {
        await runScenario(scenarios[0]);
    });
    it('should successfully complete 1', async () => {
        await runScenario(scenarios[1]);
    });
    it('should successfully complete 2', async () => {
        await runScenario(scenarios[2]);
    });
    it('should successfully complete 3', async () => {
        await runScenario(scenarios[3]);
    });
    it('should successfully complete 4', async () => {
        await runScenario(scenarios[4]);
    });
    it('should successfully complete 5', async () => {
        await runScenario(scenarios[5]);
    });
    it('should successfully complete 6', async () => {
        await runScenario(scenarios[6]);
    });
    it('should successfully complete 7', async () => {
        await runScenario(scenarios[7]);
    });
    it('should successfully complete 8', async () => {
        await runScenario(scenarios[8]);
    });
  });

  async function runScenario(scenario: PerfFeeScenarios): Promise<void> {
    console.log(`Running: ${scenario.name}`);

    await initialize(scenario);

    await checkPoint(0);

    await setup.jumpTimeAndUpdateOracles(
      scenario.t1.timeElapsed,
      scenario.t1.prices
    );

    // Adjust some fees
    await rebalancingSetToken.adjustFee.sendTransactionAsync(
      feeCalculatorHelper.generateAdjustFeeCallData(new BigNumber(1), scenario.t1.newProfitFee),
      { from: managerAccount, gas: DEFAULT_GAS }
    );

    await checkPoint(1);

    await printResults();

    await runAssertions(scenario);
  }

  async function checkPoint(num: number): Promise<void> {
    const rebalancingSetValue = await valuationHelper.calculateRebalancingSetTokenValueAsync(
      setup.rebalancingSetToken,
      setup.oracleWhiteList,
    );
    const feeState = await performanceFeeCalculator.feeState.callAsync(setup.rebalancingSetToken.address);
    const unitShares = await setup.rebalancingSetToken.unitShares.callAsync();
    const totalSupply = await setup.rebalancingSetToken.totalSupply.callAsync();
    const feeRecipientShares = await setup.rebalancingSetToken.balanceOf.callAsync(feeRecipient);

    checkPoints[num] = {
      rebalancingSetValue,
      highWatermark: new BigNumber(feeState['highWatermark']),
      profitFeePercentage: new BigNumber(feeState['profitFeePercentage']),
      lastProfitFeeTimestamp: new BigNumber(feeState['lastProfitFeeTimestamp']),
      unitShares,
      totalSupply,
      feeRecipientShares,
    };
  }

  async function printResults(): Promise<void> {
    const t0 = checkPoints[0];
    const tN = checkPoints[checkPoints.length - 1];

    console.log(`RebalancingSet Value Before: ${deScale(t0.rebalancingSetValue).toString()}`);
    console.log(`RebalancingSet Value After: ${deScale(tN.rebalancingSetValue).toString()}`);

    console.log(`Watermark Before: ${deScale(t0.highWatermark)}`);
    console.log(`Watermark After: ${deScale(tN.highWatermark)}`);

    console.log(`profitFeePercentage Before: ${deScale(t0.profitFeePercentage)}`);
    console.log(`profitFeePercentage After: ${deScale(tN.profitFeePercentage)}`);

    console.log(`lastProfitFeeTimestamp Before: ${t0.lastProfitFeeTimestamp}`);
    console.log(`lastProfitFeeTimestamp After: ${tN.lastProfitFeeTimestamp}`);

    console.log(`unitShares Before: ${t0.unitShares}`);
    console.log(`unitShares After: ${tN.unitShares}`);

    console.log(`totalSupply Before: ${deScale(t0.totalSupply)}`);
    console.log(`totalSupply After: ${deScale(tN.totalSupply)}`);

    console.log(`feeRecipientShares Before: ${deScale(t0.feeRecipientShares)}`);
    console.log(`feeRecipientShares After: ${deScale(tN.feeRecipientShares)}`);

    console.log(`======================== Results ==========================`);
    console.log('Profit Fee Delta: ', tN.profitFeePercentage.sub(t0.profitFeePercentage).toString());
    console.log('High Watermark Delta: ', tN.highWatermark.sub(t0.highWatermark).toString());
    console.log('lastProfitFeeTS Delta: ', tN.lastProfitFeeTimestamp.sub(t0.lastProfitFeeTimestamp).toString());
    console.log(`==================================================`);
  }

  function deScale(v1: BigNumber): BigNumber {
    return new BigNumber(v1).div(ether(1)).round(2, 3);
  }

  async function runAssertions(scenario: PerfFeeScenarios): Promise<void> {
    const t0 = checkPoints[0];
    const tN = checkPoints[checkPoints.length - 1];

    const {
      profitFeeHasChanged,
      highWaterMarkHasChanged,
      lastProfitFeeTimestampHasChanged,
    } = scenario.asserts;

    expectDelta(profitFeeHasChanged, tN.profitFeePercentage, t0.profitFeePercentage);
    expectDelta(highWaterMarkHasChanged, tN.highWatermark, t0.highWatermark);
    expectDelta(lastProfitFeeTimestampHasChanged, tN.lastProfitFeeTimestamp, t0.lastProfitFeeTimestamp);
  }

  function expectDelta(expectDelta: boolean, end: BigNumber, begin: BigNumber): void {
    const delta = end.sub(begin).absoluteValue();
    if (expectDelta) {
      expect(delta).to.bignumber.be.gt(0);
    } else {
      expect(delta).to.bignumber.equal(0);
    }
  }

  // Sets up assets, creates and mints rebalancing set
  async function initialize(scenario: any): Promise<void> {
    await setup.initializeCore();
    await setup.initializeComponents(scenario.components);
    await setup.initializeBaseSets({
      set1Components: _.map(scenario.currentSet.components, component => setup[component].address),
      set1Units: scenario.currentSet.units,
      set1NaturalUnit: scenario.currentSet.naturalUnit,
    });

    performanceFeeCalculator = await feeCalculatorHelper.deployPerformanceFeeCalculatorAsync(
      setup.core.address,
      setup.oracleWhiteList.address,
      maxProfitFee,
      maxStreamingFee,
    );
    await coreHelper.addAddressToWhiteList(performanceFeeCalculator.address, setup.feeCalculatorWhitelist);

    const failPeriod = ONE_DAY_IN_SECONDS;
    const { timestamp: lastRebalanceTimestamp } = await web3.eth.getBlock('latest');
    const performanceFeeSettings = feeCalculatorHelper.generatePerformanceFeeCallDataBuffer(
      defaultProfitFeePeriod,
      scenario.highWatermarkResetPeriod,
      scenario.profitFee,
      defaultStreamingFeePercentage
    );

    const callData = rebalancingHelper.generateRebalancingSetTokenV3CallData(
      managerAccount,
      setup.linearAuctionLiquidator.address,
      feeRecipient,
      performanceFeeCalculator.address,
      ONE_DAY_IN_SECONDS,
      failPeriod,
      lastRebalanceTimestamp,
      ZERO,
      performanceFeeSettings,
    );

    rebalancingSetToken = await rebalancingHelper.createRebalancingTokenV3Async(
      setup.core,
      setup.rebalancingFactory.address,
      [setup.set1.address],
      [scenario.rebalancingSet.unitShares],
      scenario.rebalancingSet.naturalUnit,
      callData
    );

    await setup.setRebalancingSet(rebalancingSetToken);

    await setup.mintRebalancingSets(scenario.rebalancingSet.supply);
  }
});
