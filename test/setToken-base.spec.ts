import * as chai from "chai";
import * as _ from "lodash";
// import * as ABIDecoder from "abi-decoder";

import { BigNumber } from "bignumber.js";
import { ether, gWei } from "./utils/units";

// Types
import { Address, UInt } from "../types/common.js";

// Contract types
// import { StandardTokenMockContract } from "../types/generated/standard_token_mock";
// import { SetTokenContract } from "../types/generated/set_token";

// Artifacts
const SetToken = artifacts.require("SetToken");
const StandardTokenMock = artifacts.require("StandardTokenMock");

// Testing Set up
import { BigNumberSetup } from "./config/bignumber_setup";
import ChaiSetup from "./config/chai_setup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;

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
  let components: any[] = [];
  let componentAddresses: Address[] = [];
  let units: BigNumber[] = [];
  let quantitiesToTransfer: BigNumber[] = [];
  let setToken: any;

  const [testAccount] = accounts;
  const initialTokens: BigNumber = ether(100000000000);
  const standardQuantityIssued: BigNumber = ether(10);

  const TX_DEFAULTS = { from: testAccount };

  const reset = () => {
    components = [];
    componentAddresses = [];
    units = [];
    quantitiesToTransfer = [];
    setToken = null;
  };

  const resetAndDeployComponents = async (numComponents: number, customUnits: BigNumber[] = []) => {
    reset();
    const componentPromises = _.times(numComponents, (index) => {
      return StandardTokenMock.new(testAccount, initialTokens, `Component ${index}`, index);
    });

    await Promise.all(componentPromises).then((componentsResolved) => {
      _.each(componentsResolved, (newComponent) => {
        components.push(newComponent);
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

    setToken = await SetToken.new(
      componentAddresses,
      units,
      TX_DEFAULTS,
    );

    const approvePromises = _.map(components, (component) =>
      component.approve(setToken.address, UNLIMITED_ALLOWANCE_IN_BASE_UNITS, TX_DEFAULTS),
    );

    await Promise.all(approvePromises);
  };

  const deployStandardSetAndIssue = async (
    numComponents: number,
    quantityToIssue: BigNumber,
    customUnits: BigNumber[] = [],
  ) => {
    await deployStandardSetAndApprove(numComponents, customUnits);
    await setToken.issue(quantityToIssue, TX_DEFAULTS);

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
        const setTokenInstance = await SetToken.new(
          _.map(components, (component) => component.address),
          units,
          TX_DEFAULTS,
        );

        expect(setTokenInstance).to.exist;

        assertTokenBalance(setTokenInstance, new BigNumber(0), testAccount);

        // Assert correctness of number of components
        const setTokenCount = await setTokenInstance.componentCount(TX_DEFAULTS);
        expect(setTokenCount).to.be.bignumber.equal(2);

        // Assert correct length of components
        const setTokens = await setTokenInstance.getComponents(TX_DEFAULTS);
        assert.strictEqual(setTokens.length, 2);

        // Assert correct length of units
        const setUnits = await setTokenInstance.getUnits(TX_DEFAULTS);
        assert.strictEqual(setUnits.length, 2);

        const [component1, component2] = components;
        const [units1, units2] = units;

        // Assert correctness of component 1
        const addressComponentA = await setTokenInstance.components(0, TX_DEFAULTS);
        assert.strictEqual(addressComponentA, component1.address);

        // Assert correctness of component 2
        const addressComponentB = await setTokenInstance.components(1, TX_DEFAULTS);
        assert.strictEqual(addressComponentB, component2.address);

        // Assert correctness of units for component A
        const componentAUnit = await setTokenInstance.units(0, TX_DEFAULTS);
        expect(componentAUnit).to.be.bignumber.equal(units1);

        // Assert correctness of units for component B
        const componentBUnit = await setTokenInstance.units(1, TX_DEFAULTS);
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
        const quantityA: BigNumber = units1.mul(standardQuantityIssued).div(gWei(1));
        const quantityB: BigNumber = units2.mul(standardQuantityIssued).div(gWei(1));

        const issuanceReceipt = await setToken.issue(standardQuantityIssued, TX_DEFAULTS);

        const issuanceLog = issuanceReceipt.logs[issuanceReceipt.logs.length - 1].args;

        // The logs should have the right sender
        assert.strictEqual(issuanceLog._sender, testAccount);

        // The logs should have the right quantity
        expect(issuanceLog._quantity).to.be.bignumber.equal(standardQuantityIssued);

        assertTokenBalance(component1, initialTokens.sub(quantityA), testAccount);
        assertTokenBalance(component2, initialTokens.sub(quantityB), testAccount);
        assertTokenBalance(setToken, standardQuantityIssued, testAccount);
      });

      it(`should throw if the transfer value overflows`, async () => {
        const hugeNumber = new BigNumber(2).pow(256).div(100);
        await expectInvalidOpcodeError(setToken.issue(hugeNumber, TX_DEFAULTS));
      });

      it(`should throw if the transfer value is 0`, async () => {
        await expectInvalidOpcodeError(setToken.issue(new BigNumber(0), TX_DEFAULTS));
      });
    });

    describe(`of Set with non-approved components`, () => {
      it(`should revert`, async () => {
        await resetAndDeployComponents(1);
        setToken = await SetToken.new(
          componentAddresses,
          units,
          TX_DEFAULTS,
        );
        await expectRevertError(setToken.issue(standardQuantityIssued, TX_DEFAULTS));
      });
    });

    // 60 is about the limit for the number of components in a Set
    // This is about ~2M Gas.
    describe("of 60 Component Set", () => {
      it(`work`, async () => {
        await deployStandardSetAndApprove(60);

        await setToken.issue(standardQuantityIssued, TX_DEFAULTS);
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

        await setToken.issue(standardQuantityIssued, TX_DEFAULTS);

        assertTokenBalance(components[0], initialTokens.sub(quantity1), testAccount);
        assertTokenBalance(setToken, standardQuantityIssued, testAccount);
      });

      it("should not work when the amount is too low", async () => {
        const lowAmount = new BigNumber(10);
        await expectInvalidOpcodeError(setToken.issue(lowAmount, TX_DEFAULTS));
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

        await expectInvalidOpcodeError(setToken.issue(quantityOverflow, TX_DEFAULTS));
      });
    });
  });

  describe("Redemption", () => {
    describe("of Standard Set", async () => {
      beforeEach(async () => {
        await deployStandardSetAndIssue(2, standardQuantityIssued);
      });

      it(`should work`, async () => {
        const redeemReceipt = await setToken.redeem(standardQuantityIssued, TX_DEFAULTS);
        const redeemLog = redeemReceipt.logs[redeemReceipt.logs.length - 1].args;

        // The logs should have the right sender
        assert.strictEqual(redeemLog._sender, testAccount);

        // The logs should have the right quantity
        expect(redeemLog._quantity).to.be.bignumber.equal(standardQuantityIssued);

        const [component1, component2] = components;
        const [units1, units2] = units;

        assertTokenBalance(component1, initialTokens, testAccount);
        assertTokenBalance(component2, initialTokens, testAccount);
        assertTokenBalance(setToken, new BigNumber(0), testAccount);
      });

      it(`should throw if the user does not have sufficient balance`, async () => {
        const largeAmount = initialTokens.mul(initialTokens);
        await expectRevertError(setToken.redeem(largeAmount, TX_DEFAULTS));
      });

      it(`should throw if the redeem quantity is 0`, async () => {
        await expectInvalidOpcodeError(setToken.redeem(new BigNumber(0), TX_DEFAULTS));
      });
    });

    describe(`60 component set`, () => {
      it(`should work`, async () => {
        await deployStandardSetAndIssue(60, standardQuantityIssued);

        await setToken.redeem(standardQuantityIssued, TX_DEFAULTS);
        assertTokenBalance(setToken, new BigNumber(0), testAccount);
      });
    });

    describe("fractional Sets", async () => {
      beforeEach(async () => {
        const halfGWeiUnits = gWei(1).div(100); // Represents 1 hundredth of a gWei
        await deployStandardSetAndIssue(1, standardQuantityIssued, [halfGWeiUnits]);
      });

      it("should work", async () => {
        await setToken.redeem(standardQuantityIssued, TX_DEFAULTS);
        const [component1] = components;
        const [units1] = units;

        assertTokenBalance(component1, initialTokens, testAccount);
        assertTokenBalance(setToken, new BigNumber(0), testAccount);
      });

      it("should throw when the amount is too low", async () => {
        await expectInvalidOpcodeError(setToken.redeem(new BigNumber(10), TX_DEFAULTS));
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

        await setToken.partialRedeem(standardQuantityIssued, [componentToExclude], TX_DEFAULTS);

        assertTokenBalance(setToken, new BigNumber(0), testAccount);
        assertTokenBalance(component1, initialTokens.sub(quantity1), testAccount);

        // The user should have balance of Token A in excluded Tokens
        const [excludedBalanceAofOwner] = await setToken.unredeemedComponents(componentToExclude, testAccount);
        expect(excludedBalanceAofOwner).to.be.bignumber.equal(quantity1);
        assertTokenBalance(component2, initialTokens, testAccount);
      });

      it("should fail with duplicate entries", async () => {
        await expectInvalidOpcodeError(setToken.partialRedeem(
          standardQuantityIssued,
          [componentToExclude, componentToExclude],
          TX_DEFAULTS,
        ));
      });

      it("should fail if there are no exclusions", async () => {
        await expectRevertError(setToken.partialRedeem(standardQuantityIssued, [], TX_DEFAULTS));
      });

      it("should fail if an excluded token is invalid", async () => {
        const INVALID_ADDRESS = "0x0000000000000000000000000000000000000001";
        await expectInvalidOpcodeError(setToken.partialRedeem(
          standardQuantityIssued,
          [componentToExclude, INVALID_ADDRESS],
          TX_DEFAULTS,
        ));
      });
    });
  });

  describe("Redeem Excluded", async () => {
    let componentExcluded: any;
    let componentAddressExcluded: Address;

    describe(`of Standard Set`, () => {
      beforeEach(async () => {
        await deployStandardSetAndIssue(3, standardQuantityIssued);
        componentExcluded = components[0];
        componentAddressExcluded = componentAddresses[0];

        await setToken.partialRedeem(standardQuantityIssued, [componentAddressExcluded], TX_DEFAULTS);
      });

      it("should work", async () => {
        await setToken.redeemExcluded(quantitiesToTransfer[0], componentAddressExcluded, TX_DEFAULTS);

        assertTokenBalance(componentExcluded, initialTokens, testAccount);

        const [excludedBalanceAofOwner] = await setToken.unredeemedComponents(componentAddressExcluded, testAccount);
        expect(excludedBalanceAofOwner).to.be.bignumber.equal(0);
      });

      it("should fail if the user doesn't have enough balance", async () => {
        const largeQuantity = new BigNumber("1000000000000000000000000000000000000");
        await expectRevertError(setToken.redeemExcluded(
          largeQuantity,
          componentAddressExcluded,
          TX_DEFAULTS,
        ));
      });
    });
  });
});
