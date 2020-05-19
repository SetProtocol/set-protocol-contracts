require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  TWAPLiquidatorContract,
  SetTokenContract,
  RebalancingSetTokenV3Contract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ether, gWei } from '@utils/units';
import { AssetChunkSizeBounds } from '@utils/auction';
import {
  DEFAULT_GAS,
  ONE_DAY_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ZERO,
} from '@utils/constants';
import { expectRevertError } from '@utils/tokenAssertions';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { OracleHelper } from 'set-protocol-oracles';
import { RebalancingSetV3Helper } from '@utils/helpers/rebalancingSetV3Helper';
import { FeeCalculatorHelper } from '@utils/helpers/feeCalculatorHelper';
import { ValuationHelper } from '@utils/helpers/valuationHelper';
import { RebalanceTestSetup } from '@utils/helpers/rebalanceTestSetup';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const CoreMock = artifacts.require('CoreMock');
const { SetProtocolUtils: SetUtils } = setProtocolUtils;
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

interface TWAPScenario {
  name: string;
  rebalancingSet: RebalancingSetDetails;
  currentSet: SetDetails;
  nextSet: SetDetails;
  components: ComponentSettings;
  profitFee: BigNumber;
  t1: {
    component1Price: BigNumber;
    component2Price: BigNumber;
    profitFee: BigNumber;
  }
}


const scenarios: TWAPScenario[] = [
  {
    name: 'ETH 20 MA Set Rebalances 100% WETH to 100% USD',
    rebalancingSet: {
      unitShares: new BigNumber(2076796),
      naturalUnit: new BigNumber(1000000),
      supply: new BigNumber('20556237207015075000000')
    },
    currentSet: {
      components: ['component1'], // ETH
      units: [new BigNumber(1000000)],
      naturalUnit: new BigNumber(1000000),
    },
    nextSet: {
      components: ['component2'], // USDC
      units: [new BigNumber(307)],
      naturalUnit: new BigNumber(1000000000000),
    },
    components: {
      component1Price: ether(188),
      component2Price: ether(1),
      component1Decimals: 18,
      component2Decimals: 6,
    },
    profitFee: ether(0.1),
    t1: {
      component1Price: ether(200),
      component2Price: ether(1),
      profitFee: ether(0.2)
    }
  },
];


contract('PerformanceFeeCalculator Scenarios', accounts => {
  const [
    deployerAccount,
    managerAccount,
    otherAccount,
    feeRecipient,
  ] = accounts;

  let rebalancingSetToken: RebalancingSetTokenV3Contract;

  let liquidator: TWAPLiquidatorContract;

  let name: string = 'liquidator';
  let auctionPeriod: BigNumber = ONE_HOUR_IN_SECONDS.mul(4);
  let rangeStart: BigNumber = new BigNumber(1);
  let rangeEnd: BigNumber = new BigNumber(21);

  let setup: RebalanceTestSetup;

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
    ABIDecoder.addABI(CoreMock.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMock.abi);
  });

  beforeEach(async () => {
    blockchain.saveSnapshotAsync();

    setup = new RebalanceTestSetup(deployerAccount);
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  // Things to test
    // watermarks, unitShares, profitFee state
  describe(`${scenarios[0].name}`, async () => {
    it('should successfully complete', async () => {
      await runScenario(scenarios[0]);

      const newRebalanceState = await setup.rebalancingSetToken.rebalanceState.callAsync();
      expect(newRebalanceState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.DEFAULT);
    });
  });

  async function runScenario(scenario: TWAPScenario): Promise<void> {
    await initializeScenario(scenario);

    // Deploy Fee Calculator

    // Adjust some timestamps

    // Adjust some prices

    // Adjust some fees

    // What are things we want to do / test?
  }

  // Sets up assets, creates and mints rebalancing set
  async function initializeScenario(scenario: any): Promise<void> {
    await setup.initializeCore();
    await setup.initializeComponents(scenario.components);
    await setup.initializeBaseSets({
      set1Components: _.map(scenario.currentSet.components, component => setup[component].address),
      set1Units: scenario.currentSet.units,
      set1NaturalUnit: scenario.currentSet.naturalUnit,
    });

    const failPeriod = ONE_DAY_IN_SECONDS;
    const { timestamp: lastRebalanceTimestamp } = await web3.eth.getBlock('latest');
    rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV3Async(
      setup.core,
      setup.rebalancingFactory.address,
      managerAccount,
      setup.linearAuctionLiquidator.address,
      feeRecipient,
      setup.fixedFeeCalculator.address,
      setup.set1.address,
      failPeriod,
      lastRebalanceTimestamp,
      ZERO, // entry fee
      ZERO, // rebalance fee
    );

    await setup.setRebalancingSet(rebalancingSetToken);

    await setup.mintRebalancingSets(scenario.rebalancingSet.supply);    
  }
});
