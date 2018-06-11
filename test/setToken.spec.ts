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
  let quantitiesToTransfer: BigNumber[] = [];
  let setToken: SetTokenContract;

  const [testAccount, testAccount2] = accounts;

  const TX_DEFAULTS = { from: testAccount, gas: 7000000 };

  const reset = () => {
    components = [];
    componentAddresses = [];
    units = [];
    quantitiesToTransfer = [];
    setToken = null;
  };

  before(async () => {
    // Initialize ABI Decoders for deciphering log receipts
    ABIDecoder.addABI(SetToken.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(SetToken.abi);
  });

  const bufferForNumber = (numberToConvert: number): Bytes32 =>
    ethUtil.bufferToHex(ethUtil.setLengthLeft(ethUtil.toBuffer(numberToConvert), 32));

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

  const deployStandardSetAndApprove = async (numComponents: number, customUnits: BigNumber[] = []) => {
    await resetAndDeployComponents(numComponents, customUnits);

    const setTokenTruffle = await SetToken.new(
      componentAddresses,
      units,
      STANDARD_NATURAL_UNIT,
      TX_DEFAULTS,
    );

    const setTokenWeb3Contract = web3.eth
      .contract(setTokenTruffle.abi)
      .at(setTokenTruffle.address);

    setToken = new SetTokenContract(setTokenWeb3Contract, TX_DEFAULTS);

    const approvePromises = _.map(components, (component) =>
      component.approve.sendTransactionAsync(setToken.address, UNLIMITED_ALLOWANCE_IN_BASE_UNITS, TX_DEFAULTS),
    );

    await Promise.all(approvePromises);
  };

  const deployStandardSetAndIssue = async (
    numComponents: number,
    quantityToIssue: BigNumber,
    customUnits: BigNumber[] = [],
  ) => {
    await deployStandardSetAndApprove(numComponents, customUnits);
    await setToken.issue.sendTransactionAsync(quantityToIssue, TX_DEFAULTS);

    // Expected Quantities of tokens moved are divided by a gWei
    // to reflect the new units in set instantiation
    quantitiesToTransfer = _.map(units, (unit) => unit.mul(quantityToIssue).div(STANDARD_NATURAL_UNIT));
  };

  describe("Creation", async () => {
    describe(`of Standard Set`, () => {
      beforeEach(async () => {
        await resetAndDeployComponents(2);
      });

      it("should work with the correct data", async () => {
        const setTokenTruffleInstance = await SetToken.new(
          _.map(components, (component) => component.address),
          units,
          STANDARD_NATURAL_UNIT,
          TX_DEFAULTS,
        );

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
        await expectRevertError(SetToken.new(componentAddresses, units, STANDARD_NATURAL_UNIT, TX_DEFAULTS));
      });

      it("should not work with no inputs", async () => {
        await expectRevertError(SetToken.new([], [], STANDARD_NATURAL_UNIT, TX_DEFAULTS));
      });

      it("should not work with units of 0 value", async () => {
        units.pop();
        const badUnit = new BigNumber(0);
        units.push(badUnit);
        await expectRevertError(SetToken.new(componentAddresses, units, STANDARD_NATURAL_UNIT, TX_DEFAULTS));
      });

      it("should not work with input component address of 0", async () => {
        componentAddresses.pop();
        componentAddresses.push(NULL_ADDRESS);
        await expectRevertError(SetToken.new(componentAddresses, units, STANDARD_NATURAL_UNIT, TX_DEFAULTS));
      });
    });
  });

  describe("Issuance", async () => {
    describe("of Standard Set", () => {
      beforeEach(async () => {
        await deployStandardSetAndApprove(2);
      });

      it(`should work`, async () => {
        const [component1, component2] = components;
        const [units1, units2] = units;

        // Expected Quantities of tokens moved are divided by a gWei
        // to reflect the new units in set instantiation
        quantitiesToTransfer = _.map(units, (unit) => unit.mul(STANDARD_QUANTITY_ISSUED).div(STANDARD_NATURAL_UNIT));

        const txHash = await setToken.issue.sendTransactionAsync(STANDARD_QUANTITY_ISSUED, TX_DEFAULTS);
        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedIssueLogs(
          componentAddresses,
          quantitiesToTransfer,
          setToken.address,
          STANDARD_QUANTITY_ISSUED,
          testAccount,
        );

        expect(JSON.stringify(formattedLogs)).to.equal(JSON.stringify(expectedLogs));

        assertTokenBalance(component1, STANDARD_INITIAL_TOKENS.sub(quantitiesToTransfer[0]), testAccount);
        assertTokenBalance(component2, STANDARD_INITIAL_TOKENS.sub(quantitiesToTransfer[1]), testAccount);
        assertTokenBalance(setToken, STANDARD_QUANTITY_ISSUED, testAccount);
      });

      it(`should throw if the quantity is 0`, async () => {
        await expectRevertError(setToken.issue.sendTransactionAsync(new BigNumber(0), TX_DEFAULTS));
      });

      it(`should throw if the quantity is not a multiple of natural unit`, async () => {
        const invalidQuantity = STANDARD_NATURAL_UNIT.mul(3).div(2);
        await expectRevertError(setToken.issue.sendTransactionAsync(invalidQuantity, TX_DEFAULTS));
      });

      it(`should throw if the quantity is not larger than the natural unit`, async () => {
        const invalidNaturalUnit = STANDARD_NATURAL_UNIT.div(2);
        await expectRevertError(setToken.issue.sendTransactionAsync(invalidNaturalUnit, TX_DEFAULTS));
      });
    });

    describe(`of Set with component with fee`, () => {
      it(`should revert`, async () => {
        // Should create a fee component
        const fee: UInt = new BigNumber(100);
        reset();
        const standardTokenWithFeeWeb3Contract = await StandardTokenWithFeeMock.new(
          testAccount,
          STANDARD_INITIAL_TOKENS,
          `ComponentWithFee`,
          `FEE`,
          fee,
          TX_DEFAULTS,
        );
        const setComponentWithFeeContract = new StandardTokenWithFeeMockContract(
          standardTokenWithFeeWeb3Contract,
          TX_DEFAULTS,
        );
        const randomInt = Math.ceil(Math.random() * Math.floor(4)); // Rand int <= 4
        units.push(ether(randomInt));
        componentAddresses = [setComponentWithFeeContract.address];

        // Create a set with that fee component
        const setTokenTruffle = await SetToken.new(
          componentAddresses,
          units,
          STANDARD_NATURAL_UNIT,
          TX_DEFAULTS,
        );

        const setTokenWeb3Contract = web3.eth
          .contract(setTokenTruffle.abi)
          .at(setTokenTruffle.address);

        setToken = new SetTokenContract(setTokenWeb3Contract, TX_DEFAULTS);

        await standardTokenWithFeeWeb3Contract.approve(
          setToken.address,
          UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
          TX_DEFAULTS,
        );

        await expectInvalidOpcodeError(setToken.issue.sendTransactionAsync(ether(1), TX_DEFAULTS));
      });
    });

    describe(`of Set with non-approved components`, () => {
      it(`should revert`, async () => {
        await resetAndDeployComponents(1);

        const setTokenTruffle = await SetToken.new(
          componentAddresses,
          units,
          STANDARD_NATURAL_UNIT,
          TX_DEFAULTS,
        );

        const setTokenWeb3Contract = web3.eth
          .contract(setTokenTruffle.abi)
          .at(setTokenTruffle.address);

        setToken = new SetTokenContract(setTokenWeb3Contract, TX_DEFAULTS);
        await expectRevertError(setToken.issue.sendTransactionAsync(STANDARD_QUANTITY_ISSUED, TX_DEFAULTS));
      });
    });

    // It cost about 6.3M gas to deploy a Set of 48
    // 60 is about the limit for the number of components in a Set
    // This is about ~2M Gas.
    describe("of 40 Component Set", () => {
      it(`should work`, async () => {
        await deployStandardSetAndApprove(40);

        quantitiesToTransfer = _.map(units, (unit) => unit.mul(STANDARD_QUANTITY_ISSUED).div(STANDARD_NATURAL_UNIT));

        const txHash = await setToken.issue.sendTransactionAsync(STANDARD_QUANTITY_ISSUED, TX_DEFAULTS);
        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedIssueLogs(
          componentAddresses,
          quantitiesToTransfer,
          setToken.address,
          STANDARD_QUANTITY_ISSUED,
          testAccount,
        );
        expect(JSON.stringify(formattedLogs)).to.equal(JSON.stringify(expectedLogs));
        assertTokenBalance(setToken, STANDARD_QUANTITY_ISSUED, testAccount);
      });
    });

    describe("of Sets with fractional units", () => {
      const thousandthEther = ether(1).div(1000); // Represents 1/1000 a ether

      beforeEach(async () => {
        await deployStandardSetAndApprove(1, [thousandthEther]);
      });

      it("should work", async () => {
        // Quantity A expected to be deduced, which is 1/2 of an A token
        const quantity1 = STANDARD_QUANTITY_ISSUED.div(STANDARD_NATURAL_UNIT).mul(thousandthEther);

        const txHash = await setToken.issue.sendTransactionAsync(STANDARD_QUANTITY_ISSUED, TX_DEFAULTS);
        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedIssueLogs(
          componentAddresses,
          [quantity1],
          setToken.address,
          STANDARD_QUANTITY_ISSUED,
          testAccount,
        );

        expect(JSON.stringify(formattedLogs)).to.equal(JSON.stringify(expectedLogs));

        assertTokenBalance(components[0], STANDARD_INITIAL_TOKENS.sub(quantity1), testAccount);
        assertTokenBalance(setToken, STANDARD_QUANTITY_ISSUED, testAccount);
      });

      it("should not work when the amount is too low", async () => {
        const lowAmount = new BigNumber(10);
        await expectRevertError(setToken.issue.sendTransactionAsync(lowAmount, TX_DEFAULTS));
      });
    });
  });

  describe("Redemption", () => {
    describe("of Standard Set", async () => {
      beforeEach(async () => {
        await deployStandardSetAndIssue(2, STANDARD_QUANTITY_ISSUED);
      });

      it(`should work`, async () => {
        const txHash = await setToken.redeem.sendTransactionAsync(STANDARD_QUANTITY_ISSUED, TX_DEFAULTS);
        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedRedeemLogs(
          componentAddresses,
          quantitiesToTransfer,
          setToken.address,
          STANDARD_QUANTITY_ISSUED,
          testAccount,
        );

        expect(JSON.stringify(formattedLogs)).to.equal(JSON.stringify(expectedLogs));

        const [component1, component2] = components;
        const [units1, units2] = units;

        assertTokenBalance(component1, STANDARD_INITIAL_TOKENS, testAccount);
        assertTokenBalance(component2, STANDARD_INITIAL_TOKENS, testAccount);
        assertTokenBalance(setToken, new BigNumber(0), testAccount);
      });

      it(`should work with sequential redeems`, async () => {
        const halfAmount = STANDARD_QUANTITY_ISSUED.div(new BigNumber(2));
        await setToken.redeem.sendTransactionAsync(halfAmount, TX_DEFAULTS);

        const [component1, component2] = components;
        const [quantity1, quantity2] = quantitiesToTransfer;

        assertTokenBalance(component1, STANDARD_INITIAL_TOKENS.sub(quantity1.div(2)), testAccount);
        assertTokenBalance(component2, STANDARD_INITIAL_TOKENS.sub(quantity2.div(2)), testAccount);
        assertTokenBalance(setToken, STANDARD_QUANTITY_ISSUED.div(2), testAccount);

        await setToken.redeem.sendTransactionAsync(halfAmount, TX_DEFAULTS);

        assertTokenBalance(component1, STANDARD_INITIAL_TOKENS, testAccount);
        assertTokenBalance(component2, STANDARD_INITIAL_TOKENS, testAccount);
        assertTokenBalance(setToken, new BigNumber(0), testAccount);
      });

      it(`should throw if the user does not have sufficient balance`, async () => {
        const largeAmount = STANDARD_INITIAL_TOKENS.mul(STANDARD_INITIAL_TOKENS);
        await expectRevertError(setToken.redeem.sendTransactionAsync(largeAmount, TX_DEFAULTS));
      });

      it(`should throw if the redeem quantity is 0`, async () => {
        await expectRevertError(setToken.redeem.sendTransactionAsync(new BigNumber(0), TX_DEFAULTS));
      });

      it(`should allow a separate user who did not issue to redeem the Set`, async () => {
        await setToken.transfer.sendTransactionAsync(testAccount2, STANDARD_QUANTITY_ISSUED, TX_DEFAULTS);
        const txHash = await setToken.redeem.sendTransactionAsync(
          STANDARD_QUANTITY_ISSUED,
          { from: testAccount2 },
        );

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedRedeemLogs(
          componentAddresses,
          quantitiesToTransfer,
          setToken.address,
          STANDARD_QUANTITY_ISSUED,
          testAccount2,
        );

        expect(JSON.stringify(formattedLogs)).to.equal(JSON.stringify(expectedLogs));
      });
    });

    describe(`40 component set`, () => {
      it(`should work`, async () => {
        await deployStandardSetAndIssue(40, STANDARD_QUANTITY_ISSUED);

        const txHash = await setToken.redeem.sendTransactionAsync(STANDARD_QUANTITY_ISSUED, TX_DEFAULTS);
        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedRedeemLogs(
          componentAddresses,
          quantitiesToTransfer,
          setToken.address,
          STANDARD_QUANTITY_ISSUED,
          testAccount,
        );

        expect(JSON.stringify(formattedLogs)).to.equal(JSON.stringify(expectedLogs));
        assertTokenBalance(setToken, new BigNumber(0), testAccount);
      });
    });

    describe("fractional Sets", async () => {
      beforeEach(async () => {
        const halfEtherUnits = ether(1).div(100); // Represents 1 hundredth of a ether
        await deployStandardSetAndIssue(1, STANDARD_QUANTITY_ISSUED, [halfEtherUnits]);
      });

      it("should work", async () => {
        const txHash = await setToken.redeem.sendTransactionAsync(STANDARD_QUANTITY_ISSUED, TX_DEFAULTS);
        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedRedeemLogs(
          componentAddresses,
          quantitiesToTransfer,
          setToken.address,
          STANDARD_QUANTITY_ISSUED,
          testAccount,
        );

        expect(JSON.stringify(formattedLogs)).to.equal(JSON.stringify(expectedLogs));

        const [component1] = components;
        const [units1] = units;

        assertTokenBalance(component1, STANDARD_INITIAL_TOKENS, testAccount);
        assertTokenBalance(setToken, new BigNumber(0), testAccount);
      });

      it("should throw when the amount is too low", async () => {
        await expectRevertError(setToken.redeem.sendTransactionAsync(new BigNumber(10), TX_DEFAULTS));
      });
    });

    describe(`of Set with component with fee`, () => {
      it(`should revert`, async () => {
        const fee: UInt = new BigNumber(100);
        reset();

        // Initially set fee to 0
        const standardTokenWithFeeWeb3Contract = await StandardTokenWithFeeMock.new(
          testAccount,
          STANDARD_INITIAL_TOKENS,
          `ComponentWithFee`,
          `FEE`,
          new BigNumber(0),
          TX_DEFAULTS,
        );
        const setComponentWithFeeContract = new StandardTokenWithFeeMockContract(
          standardTokenWithFeeWeb3Contract,
          TX_DEFAULTS,
        );
        const randomInt = Math.ceil(Math.random() * Math.floor(4)); // Rand int <= 4
        units.push(ether(randomInt));
        componentAddresses = [setComponentWithFeeContract.address];

        // Create a set with that fee component
        const setTokenTruffle = await SetToken.new(
          componentAddresses,
          units,
          STANDARD_NATURAL_UNIT,
          TX_DEFAULTS,
        );

        const setTokenWeb3Contract = web3.eth
          .contract(setTokenTruffle.abi)
          .at(setTokenTruffle.address);

        setToken = new SetTokenContract(setTokenWeb3Contract, TX_DEFAULTS);

        await standardTokenWithFeeWeb3Contract.approve(
          setToken.address,
          UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
          TX_DEFAULTS,
        );

        await setToken.issue.sendTransactionAsync(ether(1), TX_DEFAULTS);

        await standardTokenWithFeeWeb3Contract.setFee(fee, TX_DEFAULTS);

        await expectRevertError(setToken.redeem.sendTransactionAsync(ether(0.5), TX_DEFAULTS));
      });
    });
  });

  describe("Partial Redemption", async () => {
    describe(`of Standard Set`, () => {
      let componentToExcludeInHex: Bytes32;
      let componentToExcludeAddress: Address;

      beforeEach(async () => {
        await deployStandardSetAndIssue(3, STANDARD_QUANTITY_ISSUED);

        componentToExcludeAddress = componentAddresses[0];
        componentToExcludeInHex = bufferForNumber(1);
      });

      it("should work", async () => {
        const [component1, component2] = components;
        const [units1, units2, units3] = units;
        const [quantity1, quantity2, quantity3] = quantitiesToTransfer;

        const txHash = await setToken.partialRedeem.sendTransactionAsync(
          STANDARD_QUANTITY_ISSUED,
          componentToExcludeInHex,
          TX_DEFAULTS,
        );

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedPartialRedeemLogs(
          componentAddresses,
          [componentToExcludeAddress],
          quantitiesToTransfer,
          setToken.address,
          STANDARD_QUANTITY_ISSUED,
          testAccount,
          componentToExcludeInHex,
        );

        expect(JSON.stringify(formattedLogs)).to.equal(JSON.stringify(expectedLogs));

        assertTokenBalance(setToken, new BigNumber(0), testAccount);
        assertTokenBalance(component1, STANDARD_INITIAL_TOKENS.sub(quantity1), testAccount);

        // The user should have balance of Token A in excluded Tokens
        const excludedBalanceAofOwner = await setToken.getUnredeemedBalance.callAsync(
          componentToExcludeAddress,
          testAccount,
        );

        expect(excludedBalanceAofOwner).to.be.bignumber.equal(quantity1);
        assertTokenBalance(component2, STANDARD_INITIAL_TOKENS, testAccount);
      });

      describe("when there are no exclusions", async () => {
        beforeEach(async () => {
          componentToExcludeInHex = bufferForNumber(0);
        });

        it("should revert", async () => {
          await expectRevertError(setToken.partialRedeem.sendTransactionAsync(
            STANDARD_QUANTITY_ISSUED,
            componentToExcludeInHex,
            TX_DEFAULTS,
          ));
        });
      });
    });
  });

  describe("Redeem Excluded", async () => {
    let componentAddressesToRedeemHex: Bytes32;

    describe(`of Standard Set with a single component partial redeemed`, () => {
      let componentExcluded: any;
      let componentAddressesExcluded: Address[];

      beforeEach(async () => {
        await deployStandardSetAndIssue(3, STANDARD_QUANTITY_ISSUED);
        componentExcluded = components[0];
        componentAddressesExcluded = [componentAddresses[0]];
        componentAddressesToRedeemHex = bufferForNumber(1);

        await setToken.partialRedeem.sendTransactionAsync(
          STANDARD_QUANTITY_ISSUED,
          componentAddressesToRedeemHex,
          TX_DEFAULTS,
        );
      });

      it("should work", async () => {
        const txHash = await setToken.redeemExcluded.sendTransactionAsync(
          componentAddressesToRedeemHex,
          TX_DEFAULTS,
        );

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedRedeemExcludedLogs(
          componentAddressesExcluded,
          [quantitiesToTransfer[0]],
          setToken.address,
          testAccount,
          componentAddressesToRedeemHex,
        );

        expect(JSON.stringify(formattedLogs)).to.equal(JSON.stringify(expectedLogs));

        assertTokenBalance(componentExcluded, STANDARD_INITIAL_TOKENS, testAccount);

        const excludedBalanceAofOwner = await setToken.getUnredeemedBalance.callAsync(
          componentAddressesExcluded[0],
          testAccount,
        );
        expect(excludedBalanceAofOwner).to.be.bignumber.equal(0);
      });
    });

    describe(`of Standard Set with a multiple components partial redeemed`, () => {
      let componentsExcluded: any;
      let componentAddressesExcluded: Address[];

      beforeEach(async () => {
        await deployStandardSetAndIssue(3, STANDARD_QUANTITY_ISSUED);
        componentsExcluded = [components[0], components[1]];
        componentAddressesExcluded = [componentAddresses[0], componentAddresses[1]];
        componentAddressesToRedeemHex = bufferForNumber(3);

        await setToken.partialRedeem.sendTransactionAsync(
          STANDARD_QUANTITY_ISSUED,
          componentAddressesToRedeemHex,
          TX_DEFAULTS,
        );
      });

      it("should work when redeem excluding multiple tokens", async () => {
        const txHash = await setToken.redeemExcluded.sendTransactionAsync(
          componentAddressesToRedeemHex,
          TX_DEFAULTS,
        );

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedRedeemExcludedLogs(
          componentAddressesExcluded,
          [quantitiesToTransfer[0], quantitiesToTransfer[1]],
          setToken.address,
          testAccount,
          componentAddressesToRedeemHex,
        );

        expect(JSON.stringify(formattedLogs)).to.equal(JSON.stringify(expectedLogs));
        const excludedBalance1ofOwner = await setToken.getUnredeemedBalance.callAsync(
          componentAddressesExcluded[0],
          testAccount,
        );
        expect(excludedBalance1ofOwner).to.be.bignumber.equal(0);
        assertTokenBalance(componentsExcluded[0], STANDARD_INITIAL_TOKENS, testAccount);

        const excludedBalance2ofOwner = await setToken.getUnredeemedBalance.callAsync(
          componentAddressesExcluded[1],
          testAccount,
        );
        expect(excludedBalance2ofOwner).to.be.bignumber.equal(0);
        assertTokenBalance(componentsExcluded[1], STANDARD_INITIAL_TOKENS, testAccount);
      });
    });
  });
});
