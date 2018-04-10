import * as chai from "chai";
import * as _ from "lodash";

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

import { INVALID_OPCODE, REVERT_ERROR } from "./constants/txn_error";

contract("{Set}", (accounts) => {
  let componentA: any;
  const unitsA: BigNumber = gWei(1);
  let componentB: any;
  const unitsB: BigNumber = gWei(2);

  const [testAccount] = accounts;
  let setToken: any;
  const initialTokens: BigNumber = ether(100);

  const TX_DEFAULTS = { from: testAccount };

  describe("Creation", async () => {
    beforeEach(async () => {
      componentA = await StandardTokenMock.new(testAccount, initialTokens, "Component A", "A");
      componentB = await StandardTokenMock.new(testAccount, initialTokens, "Component B", "B");
    });

    it("should allow creation of a {Set} with correct data", async () => {
      const setTokenInstance = await SetToken.new(
        [componentA.address, componentB.address],
        [unitsA, unitsB],
        TX_DEFAULTS,
      );
      expect(setTokenInstance).to.exist;

      // Assert correctness of number of components
      const setTokenCount = await setTokenInstance.componentCount(TX_DEFAULTS);
      expect(setTokenCount).to.be.bignumber.equal(2);

      // Assert correct length of components
      const setTokens = await setTokenInstance.getComponents(TX_DEFAULTS);
      assert.strictEqual(setTokens.length, 2);

      // Assert correct length of units
      const setUnits = await setTokenInstance.getUnits(TX_DEFAULTS);
      assert.strictEqual(setUnits.length, 2);

      // Assert correctness of component A
      const addressComponentA = await setTokenInstance.components(0, TX_DEFAULTS);
      assert.strictEqual(addressComponentA, componentA.address);

      // Assert correctness of component B
      const addressComponentB = await setTokenInstance.components(1, TX_DEFAULTS);
      assert.strictEqual(addressComponentB, componentB.address);

      // Assert correctness of units for component A
      const componentAUnit = await setTokenInstance.units(0, TX_DEFAULTS);
      expect(componentAUnit).to.be.bignumber.equal(unitsA);

      // Assert correctness of units for component B
      const componentBUnit = await setTokenInstance.units(1, TX_DEFAULTS);
      expect(componentBUnit).to.be.bignumber.equal(unitsB);
    });

    it("should not allow creation of a {Set} with mismatched quantity of units and tokens", async () => {
      await expect(
        SetToken.new(
          [componentA.address, componentB.address],
          [unitsA],
          TX_DEFAULTS,
        ),
      ).to.eventually.be.rejectedWith(REVERT_ERROR);
    });

    it("should not allow creation of a {Set} with no inputs", async () => {
      await expect(
        SetToken.new([], [], TX_DEFAULTS),
      ).to.eventually.be.rejectedWith(REVERT_ERROR);
    });

    it("should not allow creation of a {Set} with units of 0 value", async () => {
      const badUnit = 0;

      await expect(
        SetToken.new(
          [componentA.address, componentB.address],
          [unitsA, badUnit],
          TX_DEFAULTS,
        ),
      ).to.eventually.be.rejectedWith(REVERT_ERROR);
    });

    it("should not allow creation of a {Set} with address of 0", async () => {
      await expect(
        SetToken.new([componentA.address, null], [unitsA, unitsB], TX_DEFAULTS),
      ).to.eventually.be.rejectedWith(REVERT_ERROR);
    });
  });

  describe("Issuance and Redemption", async () => {
    describe("of multiple standard tokens", async () => {
      beforeEach(async () => {
        componentA = await StandardTokenMock.new(testAccount, initialTokens, "Component A", "A");
        componentB = await StandardTokenMock.new(testAccount, initialTokens, "Component B", "B");

        setToken = await SetToken.new(
          [componentA.address, componentB.address],
          [unitsA, unitsB],
          TX_DEFAULTS,
        );
      });

      for (let i = 1; i < 5; i++) {
        testValidIssueAndRedeem(ether(i));
      }

      function testValidIssueAndRedeem(quantity: BigNumber) {
        // Expected Quantities of tokens moved are divided by a gWei
        // to reflect the new units in set instantiation
        const quantityA: BigNumber = unitsA.mul(quantity).div(gWei(1));
        const quantityB: BigNumber = unitsB.mul(quantity).div(gWei(1));

        it(`should allow a user to issue ${quantity} tokens from the index fund`, async () => {
          await componentA.approve(setToken.address, quantityA, TX_DEFAULTS);
          await componentB.approve(setToken.address, quantityB, TX_DEFAULTS);

          const issuanceReceipt = await setToken.issue(quantity, TX_DEFAULTS);
          const issuanceLog = issuanceReceipt.logs[issuanceReceipt.logs.length - 1].args;

          // The logs should have the right sender
          assert.strictEqual(issuanceLog._sender, testAccount);

          // The logs should have the right quantity
          expect(issuanceLog._quantity).to.be.bignumber.equal(quantity);

          // User should have less A token
          const postIssueBalanceAofOwner = await componentA.balanceOf(testAccount);
          expect(postIssueBalanceAofOwner).to.be.bignumber.equal(
            initialTokens.sub(quantityA),
            "Component A Balance",
          );

          // User should have less B token
          const postIssueBalanceBofOwner = await componentB.balanceOf(testAccount);
          expect(postIssueBalanceBofOwner).to.be.bignumber.equal(
            initialTokens.sub(quantityB),
            "Component B Balance",
          );

          // User should have an/multiple Set tokens
          const postIssueBalanceIndexofOwner = await setToken.balanceOf(testAccount);
          expect(postIssueBalanceIndexofOwner).to.be.bignumber.equal(
            quantity,
            "Set Component Balance",
          );
        });

        it(`should allow a user to redeem ${quantity} token from the index fund`, async () => {
          await componentA.approve(setToken.address, quantityA, TX_DEFAULTS);
          await componentB.approve(setToken.address, quantityB, TX_DEFAULTS);

          await setToken.issue(quantity, TX_DEFAULTS);

          const redeemReceipt = await setToken.redeem(quantity, TX_DEFAULTS);
          const redeemLog = redeemReceipt.logs[redeemReceipt.logs.length - 1].args;

          // The logs should have the right sender
          assert.strictEqual(redeemLog._sender, testAccount);

          // The logs should have the right quantity
          expect(redeemLog._quantity).to.be.bignumber.equal(quantity);

          // User should have more A token
          const postRedeemBalanceAofOwner = await componentA.balanceOf(testAccount);
          expect(postRedeemBalanceAofOwner).to.be.bignumber.equal(initialTokens);

          // User should have more B token
          const postRedeemBalanceBofOwner = await componentB.balanceOf(testAccount);
          expect(postRedeemBalanceBofOwner).to.be.bignumber.equal(initialTokens);

          // User should have 0 Set token
          const postRedeemBalanceIndexofOwner = await setToken.balanceOf(testAccount);
          expect(postRedeemBalanceIndexofOwner).to.be.bignumber.equal(0);
        });
      }
    });

    describe("of Sets with fractional units", () => {
      it("should be able to issue and redeem a Set defined with a fractional unit", async () => {
        const halfGWeiUnits = gWei(1).div(2); // Represents half a gWei

        // This creates a SetToken with only one backing token.
        setToken = await SetToken.new(
          [componentA.address],
          [halfGWeiUnits],
          TX_DEFAULTS,
        );

        const quantityInWei = ether(1);

        // Quantity A expected to be deduced, which is 1/2 of an A token
        const quantityA = quantityInWei.mul(halfGWeiUnits).div(gWei(1));

        await componentA.approve(setToken.address, quantityA, TX_DEFAULTS);

        await setToken.issue(quantityInWei, TX_DEFAULTS);

        // User should have less A token
        const postIssueBalanceAofOwner = await componentA.balanceOf(testAccount);
        expect(postIssueBalanceAofOwner).to.be.bignumber.equal(initialTokens.sub(quantityA));

        // User should have an/multiple Set tokens
        const postIssueBalanceIndexofOwner = await setToken.balanceOf(testAccount);
        expect(postIssueBalanceIndexofOwner).to.be.bignumber.equal(quantityInWei);

        await setToken.redeem(quantityInWei, TX_DEFAULTS);

        // User should have more A token
        const postRedeemBalanceAofOwner = await componentA.balanceOf(testAccount);
        expect(postRedeemBalanceAofOwner).to.be.bignumber.equal(initialTokens);

        // User should have 0 Set token
        const postRedeemBalanceIndexofOwner = await setToken.balanceOf(testAccount);
        expect(postRedeemBalanceIndexofOwner).to.be.bignumber.equal(0);
      });

      it("should disallow issuing a Set when the amount is too low", async () => {
        const gWeiUnits = gWei(1).div(10000); // Represents a ten-thousandth of a gWei

        setToken = await SetToken.new(
          [componentA.address],
          [gWeiUnits],
          TX_DEFAULTS,
        );

        const quantityInWei = new BigNumber(1000);

        // The quantity approved will be much larger than the amount
        // that we are trying to issue
        const quantityA: BigNumber = quantityInWei.mul(gWeiUnits);

        await componentA.approve(setToken.address, quantityA, TX_DEFAULTS);

        await expect(setToken.issue(quantityInWei, TX_DEFAULTS)).to.eventually.be.rejectedWith(
          INVALID_OPCODE,
        );
      });
    });
    
    describe("of overflow units", async () => {
      it("should disallow issuing a quantity of tokens that would trigger an overflow", async () => {
        const overflowUnits = gWei(2).div(5);

        // This creates a SetToken with only one backing token.
        setToken = await SetToken.new(
          [componentB.address],
          [overflowUnits],
          TX_DEFAULTS,
        );

        const quantity = new BigNumber(100);
        const quantityB = quantity.mul(overflowUnits).div(gWei(1));

        await componentB.approve(setToken.address, quantityB, TX_DEFAULTS);

        // Set quantity to 2^254 + 100. This quantity * 2 will overflow a
        // uint256 and equal 200.
        const overflow = new BigNumber(
          "0x8000000000000000000000000000000000000000000000000000000000000000",
        );
        const quantityOverflow = overflow.plus(quantity);

        await expect(setToken.issue(quantityOverflow, TX_DEFAULTS)).to.eventually.be.rejectedWith(
          INVALID_OPCODE,
        );
      });
    });
  });

  describe("Partial Redemption", async () => {
    const quantityIssued = new BigNumber(10);
    let quantityA: BigNumber;
    let quantityB: BigNumber;

    // Create a Set two components with set tokens issued
    beforeEach(async () => {
      componentA = await StandardTokenMock.new(testAccount, initialTokens, "Component A", "A");
      componentB = await StandardTokenMock.new(testAccount, initialTokens, "Component B", "B");

      setToken = await SetToken.new(
        [componentA.address, componentB.address],
        [unitsA, unitsB],
        TX_DEFAULTS,
      );

      // Expected Quantities of tokens moved are divided by a gWei
      // to reflect the new units in set instantiation
      quantityA = unitsA.mul(quantityIssued).div(gWei(1));
      quantityB = unitsB.mul(quantityIssued).div(gWei(1));

      await componentA.approve(setToken.address, quantityA, TX_DEFAULTS);
      await componentB.approve(setToken.address, quantityB, TX_DEFAULTS);

      await setToken.issue(quantityIssued, TX_DEFAULTS);
    });

    it("should successfully partial redeem a standard Set", async () => {
      await setToken.partialRedeem(quantityIssued, [componentA.address], TX_DEFAULTS);

      // User should have 0 Set token
      const postRedeemBalanceIndexofOwner = await setToken.balanceOf(testAccount);
      expect(postRedeemBalanceIndexofOwner).to.be.bignumber.equal(0, "Post Balance Set");

      // The user should have 0 of TokenA
      const postRedeemBalanceAofOwner = await componentA.balanceOf(testAccount);
      expect(postRedeemBalanceAofOwner).to.be.bignumber.equal(
        initialTokens.sub(quantityA));

      // The user should have balance of Token A in excluded Tokens
      const [excludedBalanceAofOwner] = await setToken.unredeemedComponents(componentA.address, testAccount);
      expect(excludedBalanceAofOwner).to.be.bignumber.equal(
        quantityA);

      // The user should have 10 token B
      const postRedeemBalanceBofOwner = await componentB.balanceOf(testAccount);
      expect(postRedeemBalanceBofOwner).to.be.bignumber.equal(initialTokens, "Post Balance B");
    });
  });
});
