import * as chai from "chai";
import * as _ from "lodash";
import * as ethUtil from "ethereumjs-util";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";
import { ether, gWei } from "./utils/units";

// Types
import { Address, Bytes32, Log, UInt } from "../types/common.js";

// Contract types
import { StandardTokenMockContract } from "../types/generated/standard_token_mock";
import { StandardTokenWithFeeMockContract } from "../types/generated/standard_token_with_fee_mock";
import { SetTokenContract } from "../types/generated/set_token";

// Artifacts
const SetToken = artifacts.require("SetToken");
const StandardTokenMock = artifacts.require("StandardTokenMock");
const StandardTokenWithFeeMock = artifacts.require("StandardTokenWithFeeMock");

// Testing Set up
import { BigNumberSetup } from "./config/bignumber_setup";
import ChaiSetup from "./config/chai_setup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;

import { getFormattedLogsFromTxHash } from "./logs/log_utils";

import {
  getExpectedIssueLogs,
  getExpectedPartialRedeemLogs,
  getExpectedRedeemExcludedLogs,
  getExpectedRedeemLogs,
} from "./logs/SetToken";

import {
  assertTokenBalance,
  expectInvalidOpcodeError,
  expectRevertError,
} from "./utils/tokenAssertions";
import {
  INVALID_OPCODE,
  NULL_ADDRESS,
  REVERT_ERROR,
  STANDARD_INITIAL_TOKENS,
  STANDARD_NATURAL_UNIT,
  STANDARD_QUANTITY_ISSUED,
} from "./constants/constants";

const UNLIMITED_ALLOWANCE_IN_BASE_UNITS = new BigNumber(2).pow(256).minus(1);

contract("SetToken", (accounts) => {
  let components: StandardTokenMockContract[] = [];
  let componentAddresses: Address[] = [];
  let units: BigNumber[] = [];
  let naturalUnit: BigNumber = STANDARD_NATURAL_UNIT;
  let setToken: SetTokenContract;
  let name: string = "Standard Set";
  let symbol: string = "SET";

  const [testAccount, testAccount2] = accounts;

  const TX_DEFAULTS = { from: testAccount, gas: 7000000 };

  const reset = () => {
    components = [];
    componentAddresses = [];
    units = [];
    setToken = null;
  };

  before(async () => {
    // Initialize ABI Decoders for deciphering log receipts
    ABIDecoder.addABI(SetToken.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(SetToken.abi);
  });

  const resetAndDeployComponents = async (numComponents: number, customUnits: BigNumber[] = []) => {
    reset();
    const componentPromises = _.times(numComponents, (index) => {
      return StandardTokenMock.new(testAccount, STANDARD_INITIAL_TOKENS, `Component ${index}`, index, TX_DEFAULTS);
    });

    await Promise.all(componentPromises).then((componentsResolved) => {
      _.each(componentsResolved, (newComponent) => {
        // The typings we use ingest vanilla Web3 contracts, so we convert the
        // contract instance deployed by truffle into a Web3 contract instance
        const standardTokenWeb3Contract = web3.eth
          .contract(newComponent.abi)
          .at(newComponent.address);

        components.push(new StandardTokenMockContract(standardTokenWeb3Contract, TX_DEFAULTS));
      });

      // Use custom units if provided
      if (customUnits.length) {
        units = customUnits;
      } else {
        // Generate our own units
        _.each(componentsResolved, () => {
          const randomInt = Math.ceil(Math.random() * Math.floor(4)); // Rand int <= 4
          units.push(ether(randomInt));
        });
      }

      componentAddresses = _.map(components, (component) => component.address);
    });
  };

  describe("Creation", async () => {
    let caller: Address = testAccount;
    
    async function subject(): Promise<any> {
      return SetToken.new(
        componentAddresses,
        units,
        naturalUnit,
        name,
        symbol,
        { from: caller },
      );
    }

    describe(`of Standard Set`, () => {
      beforeEach(async () => {
        await resetAndDeployComponents(2);
      });

      it("should work with the correct data", async () => {

        const setTokenTruffleInstance = await subject();

        const setTokenWeb3Instance = web3.eth
            .contract(setTokenTruffleInstance.abi)
            .at(setTokenTruffleInstance.address);

        const setTokenInstance: SetTokenContract = new SetTokenContract(setTokenWeb3Instance, TX_DEFAULTS);

        expect(setTokenInstance).to.exist;

        assertTokenBalance(setTokenInstance, new BigNumber(0), testAccount);

        const tokenBalance = await setTokenInstance.balanceOf.callAsync(testAccount);
        expect(tokenBalance).to.be.bignumber.equal(new BigNumber(0));

        // Assert correct length of components
        const setTokens = await setTokenInstance.getComponents.callAsync();
        assert.strictEqual(setTokens.length, 2);

        // Assert correct length of units
        const setUnits = await setTokenInstance.getUnits.callAsync();
        assert.strictEqual(setUnits.length, 2);

        const naturalUnit = await setTokenInstance.naturalUnit.callAsync();
        expect(naturalUnit).to.be.bignumber.equal(STANDARD_NATURAL_UNIT);

        const setName = await setTokenInstance.name.callAsync();
        expect(setName).to.equal(name);

        const setSymbol = await setTokenInstance.symbol.callAsync();
        expect(setSymbol).to.equal(symbol);

        const setDecimals = await setTokenInstance.decimals.callAsync();
        expect(setDecimals).to.be.bignumber.equal(new BigNumber(18));

        const [component1, component2] = components;
        const [units1, units2] = units;

        const componentA = await setTokenInstance.components.callAsync(new BigNumber(0));
        const componentB = await setTokenInstance.components.callAsync(new BigNumber(1));
        const [addressComponentA, componentAUnit] = componentA;
        const [addressComponentB, componentBUnit] = componentB;

        assert.strictEqual(addressComponentA, component1.address);
        assert.strictEqual(addressComponentB, component2.address);
        expect(componentAUnit).to.be.bignumber.equal(units1);
        expect(componentBUnit).to.be.bignumber.equal(units2);
      });

      it("should not work with mismatched quantity of units and tokens", async () => {
        units.pop();
        await expectRevertError(subject());
      });

      it("should not work with no inputs", async () => {
        componentAddresses = [];
        units = [];

        await expectRevertError(subject());
      });

      it("should not work with units of 0 value", async () => {
        units.pop();
        const badUnit = new BigNumber(0);
        units.push(badUnit);

        await expectRevertError(subject());
      });

      it("should not work with input component address of 0", async () => {
        componentAddresses.pop();
        componentAddresses.push(NULL_ADDRESS);
        await expectRevertError(subject());
      });
    });
  });
});
