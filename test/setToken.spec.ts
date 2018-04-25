import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";
import { ether, gWei } from "./utils/units";

// Types
import { Address, UInt, Log } from "../types/common.js";

// Contract types
import { StandardTokenMockContract } from "../types/generated/standard_token_mock";
import { SetTokenContract } from "../types/generated/set_token";

// Artifacts
const SetToken = artifacts.require("SetToken");
const StandardTokenMock = artifacts.require("StandardTokenMock");

// Testing Set up
import { BigNumberSetup } from "./config/bignumber_setup";
import ChaiSetup from "./config/chai_setup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;

import { getFormattedLogsFromTxHash } from "./logs/log_utils";

import {
  getExpectedIssueLogs,
  getExpectedRedeemLogs,
  getExpectedPartialRedeemLogs,
  getExpectedRedeemExcludedLogs,
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
} from "./constants/constants";

const UNLIMITED_ALLOWANCE_IN_BASE_UNITS = new BigNumber(2).pow(256).minus(1);

contract("{Set}", (accounts) => {
  let components: StandardTokenMockContract[] = [];
  let componentAddresses: Address[] = [];
  let units: BigNumber[] = [];
  let quantitiesToTransfer: BigNumber[] = [];
  let setToken: SetTokenContract;

  const [testAccount, testAccount2] = accounts;
  const initialTokens: BigNumber = ether(100000000000);
  const standardQuantityIssued: BigNumber = ether(10);

  const TX_DEFAULTS = { from: testAccount, gas: 70000000 };

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

  const resetAndDeployComponents = async (numComponents: number, customUnits: BigNumber[] = []) => {
    reset();
    const componentPromises = _.times(numComponents, (index) => {
      return StandardTokenMock.new(testAccount, initialTokens, `Component ${index}`, index, TX_DEFAULTS);
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
          units.push(gWei(randomInt));
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
    quantitiesToTransfer = _.map(units, (unit) => unit.mul(quantityToIssue).div(gWei(1)));
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

        const [component1, component2] = components;
        const [units1, units2] = units;

        // Assert correctness of component 1
        const addressComponentA = await setTokenInstance.components.callAsync(new BigNumber(0));
        assert.strictEqual(addressComponentA, component1.address);

        // Assert correctness of component 2
        const addressComponentB = await setTokenInstance.components.callAsync(new BigNumber(1));
        assert.strictEqual(addressComponentB, component2.address);

        // Assert correctness of units for component A
        const componentAUnit = await setTokenInstance.units.callAsync(new BigNumber(0));
        expect(componentAUnit).to.be.bignumber.equal(units1);

        // Assert correctness of units for component B
        const componentBUnit = await setTokenInstance.units.callAsync(new BigNumber(1));
        expect(componentBUnit).to.be.bignumber.equal(units2);
      });

      it("should not work with mismatched quantity of units and tokens", async () => {
        units.pop();
        await expectRevertError(SetToken.new(componentAddresses, units, TX_DEFAULTS));
      });

      it("should not work with no inputs", async () => {
        await expectRevertError(SetToken.new([], [], TX_DEFAULTS));
      });

      it("should not work with units of 0 value", async () => {
        units.pop();
        const badUnit = new BigNumber(0);
        units.push(badUnit);
        await expectRevertError(SetToken.new(componentAddresses, units, TX_DEFAULTS));
      });

      it("should not work with input component address of 0", async () => {
        componentAddresses.pop();
        componentAddresses.push(NULL_ADDRESS);
        await expectRevertError(SetToken.new(componentAddresses, units, TX_DEFAULTS));
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
        quantitiesToTransfer = _.map(units, (unit) => unit.mul(standardQuantityIssued).div(gWei(1)));

        const txHash = await setToken.issue.sendTransactionAsync(standardQuantityIssued, TX_DEFAULTS);
        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedIssueLogs(
          componentAddresses,
          quantitiesToTransfer,
          setToken.address,
          standardQuantityIssued,
          testAccount,
        );

        expect(JSON.stringify(formattedLogs)).to.equal(JSON.stringify(expectedLogs));

        assertTokenBalance(component1, initialTokens.sub(quantitiesToTransfer[0]), testAccount);
        assertTokenBalance(component2, initialTokens.sub(quantitiesToTransfer[1]), testAccount);
        assertTokenBalance(setToken, standardQuantityIssued, testAccount);
      });

      it(`should throw if the transfer value overflows`, async () => {
        const hugeNumber = new BigNumber(2).pow(256).div(100);
        await expectInvalidOpcodeError(setToken.issue.sendTransactionAsync(hugeNumber, TX_DEFAULTS));
      });

      it(`should throw if the transfer value is 0`, async () => {
        await expectInvalidOpcodeError(setToken.issue.sendTransactionAsync(new BigNumber(0), TX_DEFAULTS));
      });
    });

    describe(`of Set with non-approved components`, () => {
      it(`should revert`, async () => {
        await resetAndDeployComponents(1);

        const setTokenTruffle = await SetToken.new(
          componentAddresses,
          units,
          TX_DEFAULTS,
        );

        const setTokenWeb3Contract = web3.eth
          .contract(setTokenTruffle.abi)
          .at(setTokenTruffle.address);

        setToken = new SetTokenContract(setTokenWeb3Contract, TX_DEFAULTS);
        await expectRevertError(setToken.issue.sendTransactionAsync(standardQuantityIssued, TX_DEFAULTS));
      });
    });

    // It cost about 6.3M gas to deploy a Set of 50
    // 60 is about the limit for the number of components in a Set
    // This is about ~2M Gas.
    describe("of 50 Component Set", () => {
      it(`should work`, async () => {
        await deployStandardSetAndApprove(50);

        quantitiesToTransfer = _.map(units, (unit) => unit.mul(standardQuantityIssued).div(gWei(1)));

        const txHash = await setToken.issue.sendTransactionAsync(standardQuantityIssued, TX_DEFAULTS);
        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedIssueLogs(
          componentAddresses,
          quantitiesToTransfer,
          setToken.address,
          standardQuantityIssued,
          testAccount,
        );
        expect(JSON.stringify(formattedLogs)).to.equal(JSON.stringify(expectedLogs));
        assertTokenBalance(setToken, standardQuantityIssued, testAccount);
      });
    });

    describe("of Sets with fractional units", () => {
      const thousandthGwei = gWei(1).div(1000); // Represents 1/1000 a gWei

      beforeEach(async () => {
        await deployStandardSetAndApprove(1, [thousandthGwei]);
      });

      it("should work", async () => {
        // Quantity A expected to be deduced, which is 1/2 of an A token
        const quantity1 = standardQuantityIssued.mul(thousandthGwei).div(gWei(1));

        const txHash = await setToken.issue.sendTransactionAsync(standardQuantityIssued, TX_DEFAULTS);
        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedIssueLogs(
          componentAddresses,
          [quantity1],
          setToken.address,
          standardQuantityIssued,
          testAccount,
        );

        expect(JSON.stringify(formattedLogs)).to.equal(JSON.stringify(expectedLogs));

        assertTokenBalance(components[0], initialTokens.sub(quantity1), testAccount);
        assertTokenBalance(setToken, standardQuantityIssued, testAccount);
      });

      it("should not work when the amount is too low", async () => {
        const lowAmount = new BigNumber(10);
        await expectInvalidOpcodeError(setToken.issue.sendTransactionAsync(lowAmount, TX_DEFAULTS));
      });
    });

    describe("of Set with overflow units", async () => {
      it("should not work when there is a quantity of tokens that would trigger an overflow", async () => {
        const overflowUnits = gWei(2);
        await deployStandardSetAndApprove(1, [overflowUnits]);

        // Set quantity to 2^254 + 100. This quantity * 2 will overflow a
        // uint256 and equal 200.
        const overflow = new BigNumber(
          "0x8000000000000000000000000000000000000000000000000000000000000000",
        );
        const quantityOverflow = overflow.plus(new BigNumber(100));

        await expectInvalidOpcodeError(setToken.issue.sendTransactionAsync(quantityOverflow, TX_DEFAULTS));
      });
    });
  });

  describe("Redemption", () => {
    describe("of Standard Set", async () => {
      beforeEach(async () => {
        await deployStandardSetAndIssue(2, standardQuantityIssued);
      });

      it(`should work`, async () => {
        const txHash = await setToken.redeem.sendTransactionAsync(standardQuantityIssued, TX_DEFAULTS);
        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedRedeemLogs(
          componentAddresses,
          quantitiesToTransfer,
          setToken.address,
          standardQuantityIssued,
          testAccount,
        );

        expect(JSON.stringify(formattedLogs)).to.equal(JSON.stringify(expectedLogs));

        const [component1, component2] = components;
        const [units1, units2] = units;

        assertTokenBalance(component1, initialTokens, testAccount);
        assertTokenBalance(component2, initialTokens, testAccount);
        assertTokenBalance(setToken, new BigNumber(0), testAccount);
      });

      it(`should work with sequential redeems`, async () => {
        const halfAmount = standardQuantityIssued.div(new BigNumber(2));
        await setToken.redeem.sendTransactionAsync(halfAmount, TX_DEFAULTS);

        const [component1, component2] = components;
        const [quantity1, quantity2] = quantitiesToTransfer;

        assertTokenBalance(component1, initialTokens.sub(quantity1.div(2)), testAccount);
        assertTokenBalance(component2, initialTokens.sub(quantity2.div(2)), testAccount);
        assertTokenBalance(setToken, standardQuantityIssued.div(2), testAccount);

        await setToken.redeem.sendTransactionAsync(halfAmount, TX_DEFAULTS);

        assertTokenBalance(component1, initialTokens, testAccount);
        assertTokenBalance(component2, initialTokens, testAccount);
        assertTokenBalance(setToken, new BigNumber(0), testAccount);
      });

      it(`should throw if the user does not have sufficient balance`, async () => {
        const largeAmount = initialTokens.mul(initialTokens);
        await expectRevertError(setToken.redeem.sendTransactionAsync(largeAmount, TX_DEFAULTS));
      });

      it(`should throw if the redeem quantity is 0`, async () => {
        await expectInvalidOpcodeError(setToken.redeem.sendTransactionAsync(new BigNumber(0), TX_DEFAULTS));
      });

      it(`should allow a separate user who did not issue to redeem the Set`, async () => {
        await setToken.transfer.sendTransactionAsync(testAccount2, standardQuantityIssued, TX_DEFAULTS);
        const txHash = await setToken.redeem.sendTransactionAsync(
          standardQuantityIssued,
          { from: testAccount2 }
        );

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedRedeemLogs(
          componentAddresses,
          quantitiesToTransfer,
          setToken.address,
          standardQuantityIssued,
          testAccount2,
        );

        expect(JSON.stringify(formattedLogs)).to.equal(JSON.stringify(expectedLogs));
      });
    });

    describe(`50 component set`, () => {
      it(`should work`, async () => {
        await deployStandardSetAndIssue(50, standardQuantityIssued);

        const txHash = await setToken.redeem.sendTransactionAsync(standardQuantityIssued, TX_DEFAULTS);
        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedRedeemLogs(
          componentAddresses,
          quantitiesToTransfer,
          setToken.address,
          standardQuantityIssued,
          testAccount,
        );

        expect(JSON.stringify(formattedLogs)).to.equal(JSON.stringify(expectedLogs));
        assertTokenBalance(setToken, new BigNumber(0), testAccount);
      });
    });

    describe("fractional Sets", async () => {
      beforeEach(async () => {
        const halfGWeiUnits = gWei(1).div(100); // Represents 1 hundredth of a gWei
        await deployStandardSetAndIssue(1, standardQuantityIssued, [halfGWeiUnits]);
      });

      it("should work", async () => {
        const txHash = await setToken.redeem.sendTransactionAsync(standardQuantityIssued, TX_DEFAULTS);
        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedRedeemLogs(
          componentAddresses,
          quantitiesToTransfer,
          setToken.address,
          standardQuantityIssued,
          testAccount,
        );

        expect(JSON.stringify(formattedLogs)).to.equal(JSON.stringify(expectedLogs));

        const [component1] = components;
        const [units1] = units;

        assertTokenBalance(component1, initialTokens, testAccount);
        assertTokenBalance(setToken, new BigNumber(0), testAccount);
      });

      it("should throw when the amount is too low", async () => {
        await expectInvalidOpcodeError(setToken.redeem.sendTransactionAsync(new BigNumber(10), TX_DEFAULTS));
      });
    });
  });

  describe("Partial Redemption", async () => {
    describe(`of Standard Set`, () => {
      let componentToExclude: Address;

      beforeEach(async () => {
        await deployStandardSetAndIssue(3, standardQuantityIssued);

        componentToExclude = componentAddresses[0];
      });

      it("should work", async () => {
        const [component1, component2] = components;
        const [units1, units2, units3] = units;
        const [quantity1, quantity2, quantity3] = quantitiesToTransfer;

        const txHash = await setToken.partialRedeem.sendTransactionAsync(
          standardQuantityIssued,
          [componentToExclude],
          TX_DEFAULTS,
        );

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedPartialRedeemLogs(
          componentAddresses,
          [componentToExclude],
          quantitiesToTransfer,
          setToken.address,
          standardQuantityIssued,
          testAccount,
        );

        expect(JSON.stringify(formattedLogs)).to.equal(JSON.stringify(expectedLogs));

        assertTokenBalance(setToken, new BigNumber(0), testAccount);
        assertTokenBalance(component1, initialTokens.sub(quantity1), testAccount);

        // The user should have balance of Token A in excluded Tokens
        const [excludedBalanceAofOwner] = await setToken.unredeemedComponents.callAsync(
          componentToExclude,
          testAccount,
        );
        expect(excludedBalanceAofOwner).to.be.bignumber.equal(quantity1);
        assertTokenBalance(component2, initialTokens, testAccount);
      });

      it("should fail with duplicate entries", async () => {
        await expectInvalidOpcodeError(setToken.partialRedeem.sendTransactionAsync(
          standardQuantityIssued,
          [componentToExclude, componentToExclude],
          TX_DEFAULTS,
        ));
      });

      it("should fail if there are no exclusions", async () => {
        await expectRevertError(setToken.partialRedeem.sendTransactionAsync(standardQuantityIssued, [], TX_DEFAULTS));
      });

      it("should fail if an excluded token is invalid", async () => {
        const INVALID_ADDRESS = "0x0000000000000000000000000000000000000001";
        await expectInvalidOpcodeError(setToken.partialRedeem.sendTransactionAsync(
          standardQuantityIssued,
          [componentToExclude, INVALID_ADDRESS],
          TX_DEFAULTS,
        ));
      });
    });
  });

  describe("Redeem Excluded", async () => {
    describe(`of Standard Set with a single component partial redeemed`, () => {
      let componentExcluded: any;
      let componentAddressesExcluded: Address[];

      beforeEach(async () => {
        await deployStandardSetAndIssue(3, standardQuantityIssued);
        componentExcluded = components[0];
        componentAddressesExcluded = [componentAddresses[0]];

        await setToken.partialRedeem.sendTransactionAsync(
          standardQuantityIssued,
          componentAddressesExcluded,
          TX_DEFAULTS,
        );
      });

      it("should work", async () => {
        const txHash = await setToken.redeemExcluded.sendTransactionAsync(
          componentAddressesExcluded,
          [quantitiesToTransfer[0]],
          TX_DEFAULTS,
        );

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedRedeemExcludedLogs(
          componentAddressesExcluded,
          [quantitiesToTransfer[0]],
          setToken.address,
          testAccount,
        );

        expect(JSON.stringify(formattedLogs)).to.equal(JSON.stringify(expectedLogs));

        assertTokenBalance(componentExcluded, initialTokens, testAccount);

        const [excludedBalanceAofOwner] = await setToken.unredeemedComponents.callAsync(
          componentAddressesExcluded[0],
          testAccount,
        );
        expect(excludedBalanceAofOwner).to.be.bignumber.equal(0);
      });

      it("should fail if the user doesn't have enough balance", async () => {
        const largeQuantity = new BigNumber("1000000000000000000000000000000000000");
        await expectRevertError(setToken.redeemExcluded.sendTransactionAsync(
          componentAddressesExcluded,
          [largeQuantity],
          TX_DEFAULTS,
        ));
      });
    });

    describe(`of Standard Set with a multiple components partial redeemed`, () => {
      let componentsExcluded: any[];
      let componentAddressesExcluded: Address[];

      beforeEach(async () => {
        await deployStandardSetAndIssue(3, standardQuantityIssued);
        componentsExcluded = [components[0], components[1]];
        componentAddressesExcluded = [componentAddresses[0], componentAddresses[1]];

        await setToken.partialRedeem.sendTransactionAsync(
          standardQuantityIssued,
          componentAddressesExcluded,
          TX_DEFAULTS,
        );
      });

      it("should work when redeem excluding multiple tokens", async () => {
        const txHash = await setToken.redeemExcluded.sendTransactionAsync(
          componentAddressesExcluded,
          [quantitiesToTransfer[0], quantitiesToTransfer[1]],
          TX_DEFAULTS,
        );

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedRedeemExcludedLogs(
          componentAddressesExcluded,
          [quantitiesToTransfer[0], quantitiesToTransfer[1]],
          setToken.address,
          testAccount,
        );

        expect(JSON.stringify(formattedLogs)).to.equal(JSON.stringify(expectedLogs));
        const [excludedBalance1ofOwner] = await setToken.unredeemedComponents.callAsync(
          componentAddressesExcluded[0],
          testAccount,
        );
        expect(excludedBalance1ofOwner).to.be.bignumber.equal(0);
        assertTokenBalance(componentsExcluded[0], initialTokens, testAccount);

        const [excludedBalance2ofOwner] = await setToken.unredeemedComponents.callAsync(
          componentAddressesExcluded[1],
          testAccount,
        );
        expect(excludedBalance2ofOwner).to.be.bignumber.equal(0);
        assertTokenBalance(componentsExcluded[1], initialTokens, testAccount);
      });
    });
  });
});
