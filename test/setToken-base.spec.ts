import * as chai from "chai";
const { expect, assert } = chai;

import { BigNumber } from "bignumber.js";

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

import { INVALID_OPCODE, REVERT_ERROR } from "./constants/txn_error";

contract("{Set}", (accounts) => {
  const components = [];
  const units = [];

  let componentA: any;
  let unitsA: number;
  let componentB: any;
  let unitsB: number;

  unitsA = 1000000000; // 1 GWEI
  unitsB = 2000000000; // 2 GWEI

  let testAccount = accounts[0];
  let setToken: any;
  const initialTokens = 100000000000000000000; // 100 ether worth of tokens

  const TX_DEFAULTS = { from: testAccount };
  const EXPECTED_FAILURE_GAS_LIMIT_DEFAULT = 3000000;

  const setName = "TEST SET";
  const setSymbol = "TEST";

  describe("{Set} creation", async () => {
    beforeEach(async () => {
      componentA = await StandardTokenMock.new(testAccount, initialTokens, "Component A", "A");
      componentB = await StandardTokenMock.new(testAccount, initialTokens, "Component B", "B");
    });

    it("should allow creation of a {Set} with correct data", async () => {
      const setTokenInstance = await SetToken.new(
        [componentA.address, componentB.address],
        [unitsA, unitsB],
        setName,
        setSymbol,
        TX_DEFAULTS,
      );
      // assert.exists(setTokenInstance, 'Set Token does not exist');
      expect(setTokenInstance).to.exist;

      // // Assert correct name
      const setTokenName = await setTokenInstance.name(TX_DEFAULTS);
      assert.strictEqual(setTokenName, setName);

      // Assert correct symbol
      const setTokenSymbol = await setTokenInstance.symbol(TX_DEFAULTS);
      assert.strictEqual(setTokenSymbol, setSymbol);

      // Assert correctness of number of components
      const setTokenCount = await setTokenInstance.componentCount(TX_DEFAULTS);
      assert.strictEqual(setTokenCount.toString(), "2");

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
      assert.strictEqual(componentAUnit.toString(), unitsA.toString());

      // Assert correctness of units for component B
      const componentBUnit = await setTokenInstance.units(1, TX_DEFAULTS);
      assert.strictEqual(componentBUnit.toString(), unitsB.toString());
    });

    it("should not allow creation of a {Set} with mismatched quantity of units and tokens", async () => {
      await expect(
        SetToken.new(
          [componentA.address, componentB.address],
          [unitsA],
          setName,
          setSymbol,
          TX_DEFAULTS,
        ),
      ).to.eventually.be.rejectedWith(REVERT_ERROR);
    });

    describe("should not allow creation of a {Set} with no inputs", async () => {
      await expect(
        SetToken.new([], [], setName, setSymbol, TX_DEFAULTS),
      ).to.eventually.be.rejectedWith(REVERT_ERROR);
    });

    it("should not allow creation of a {Set} with units of 0 value", async () => {
      const badUnit = 0;

      await expect(
        SetToken.new(
          [componentA.address, componentB.address],
          [unitsA, badUnit],
          setName,
          setSymbol,
          TX_DEFAULTS,
        ),
      ).to.eventually.be.rejectedWith(REVERT_ERROR);
    });

    it("should not allow creation of a {Set} with address of 0", async () => {
      await expect(
        SetToken.new([componentA.address, null], [unitsA, unitsB], setName, setSymbol, TX_DEFAULTS),
      ).to.eventually.be.rejectedWith(REVERT_ERROR);
    });

    describe("{Set} Issuance and Redemption", async () => {
      describe("of standard path", async () => {
        // Deploy an arbitrary number of ERC20 tokens and fund the first account
        beforeEach(async () => {
          testAccount = accounts[0];

          componentA = await StandardTokenMock.new(testAccount, initialTokens, "Component A", "A");
          componentB = await StandardTokenMock.new(testAccount, initialTokens, "Component B", "B");

          setToken = await SetToken.new(
            [componentA.address, componentB.address],
            [unitsA, unitsB],
            setName,
            setSymbol,
            TX_DEFAULTS,
          );

          expect(setToken).to.exist;
        });

        describe("Test the issuance and redemption of multiple tokens", async () => {
          for (let i = 1; i < 5; i++) {
            // Quantities for tokens are usually inputted in Wei
            const quantityInWei = i * Math.pow(10, 18);
            testValidIssueAndRedeem(quantityInWei);
          }
        });

        function testValidIssueAndRedeem(quantity: number) {
          // Expected Quantities of tokens moved are divided by a gWei
          // to reflect the new units in set instantiation
          const quantityA: number = unitsA * quantity / Math.pow(10, 9);
          const quantityB: number = unitsB * quantity / Math.pow(10, 9);

          it(`should allow a user to issue ${quantity} tokens from the index fund`, async () => {
            await componentA.approve(setToken.address, quantityA, {
              from: testAccount,
            });
            await componentB.approve(setToken.address, quantityB, {
              from: testAccount,
            });

            const issuanceReceipt = await setToken.issue(quantity, {
              from: testAccount,
            });
            const issuanceLog = issuanceReceipt.logs[issuanceReceipt.logs.length - 1].args;

            // The logs should have the right sender
            assert.strictEqual(issuanceLog._sender, testAccount);

            // The logs should have the right quantity
            assert.strictEqual(Number(issuanceLog._quantity.toString()), quantity, "Issuance logs");

            // User should have less A token
            const postIssueBalanceAofOwner = await componentA.balanceOf(testAccount);
            assert.strictEqual(
              postIssueBalanceAofOwner.toString(),
              (initialTokens - quantityA).toString(),
              "Component A Balance",
            );

            // User should have less B token
            const postIssueBalanceBofOwner = await componentB.balanceOf(testAccount);
            assert.strictEqual(
              postIssueBalanceBofOwner.toString(),
              (initialTokens - quantityB).toString(),
              "Component B Balance",
            );

            // User should have an/multiple index tokens
            const postIssueBalanceIndexofOwner = await setToken.balanceOf(testAccount);
            assert.strictEqual(
              postIssueBalanceIndexofOwner.toString(),
              quantity.toString(),
              "Set Component Balance",
            );
          });

          it(`should allow a user to redeem ${quantity} token from the index fund`, async () => {
            await componentA.approve(setToken.address, quantityA, {
              from: testAccount,
            });
            await componentB.approve(setToken.address, quantityB, {
              from: testAccount,
            });

            await setToken.issue(quantity, TX_DEFAULTS);

            const redeemReceipt = await setToken.redeem(quantity, {
              from: testAccount,
            });
            const redeemLog = redeemReceipt.logs[redeemReceipt.logs.length - 1].args;

            // The logs should have the right sender
            assert.strictEqual(redeemLog._sender, testAccount);

            // The logs should have the right quantity
            assert.strictEqual(Number(redeemLog._quantity.toString()), quantity);

            // User should have more A token
            const postRedeemBalanceAofOwner = await componentA.balanceOf(testAccount);
            assert.strictEqual(postRedeemBalanceAofOwner.toString(), initialTokens.toString());

            // User should have more B token
            const postRedeemBalanceBofOwner = await componentB.balanceOf(testAccount);
            assert.strictEqual(postRedeemBalanceBofOwner.toString(), initialTokens.toString());

            // User should have 0 index token
            const postRedeemBalanceIndexofOwner = await setToken.balanceOf(testAccount);
            assert.strictEqual(postRedeemBalanceIndexofOwner.toString(), "0");
          });
        }
      });

      describe("of Sets with fractional units", () => {
        it("should be able to issue and redeem a Set defined with a fractional unit", async () => {
          // This unit represents half a gWei
          const halfGWeiUnits = 500000000;

          // This creates a SetToken with only one backing token.
          setToken = await SetToken.new(
            [componentA.address],
            [halfGWeiUnits],
            setName,
            setSymbol,
            TX_DEFAULTS,
          );

          const quantityInWei = 1 * Math.pow(10, 18);

          // Quantity A expected to be deduced, which is 1/2 of an A token
          const quantityA = quantityInWei * halfGWeiUnits / Math.pow(10, 9);

          await componentA.approve(setToken.address, quantityA, TX_DEFAULTS);

          await setToken.issue(quantityInWei, TX_DEFAULTS);

          // User should have less A token
          const postIssueBalanceAofOwner = await componentA.balanceOf(testAccount);
          assert.strictEqual(
            postIssueBalanceAofOwner.toString(),
            (initialTokens - quantityA).toString(),
          );

          // User should have an/multiple index tokens
          const postIssueBalanceIndexofOwner = await setToken.balanceOf(testAccount);
          assert.strictEqual(postIssueBalanceIndexofOwner.toString(), quantityInWei.toString());

          await setToken.redeem(quantityInWei, TX_DEFAULTS);

          // User should have more A token
          const postRedeemBalanceAofOwner = await componentA.balanceOf(testAccount);
          assert.strictEqual(postRedeemBalanceAofOwner.toString(), initialTokens.toString());

          // User should have 0 index token
          const postRedeemBalanceIndexofOwner = await setToken.balanceOf(testAccount);
          assert.strictEqual(postRedeemBalanceIndexofOwner.toString(), "0");
        });

        it("should disallow issuing a Set when the amount is too low", async () => {
          // This unit represents a thousandth of a gWei
          const gWeiUnits = 100000;

          // This creates a SetToken with only one backing token.
          setToken = await SetToken.new(
            [componentA.address],
            [gWeiUnits],
            setName,
            setSymbol,
            TX_DEFAULTS,
          );

          const quantityInWei = 1000;

          // The quantity approved will be much larger than the amount
          // that we are trying to issue
          const quantityA = quantityInWei * gWeiUnits;

          await componentA.approve(setToken.address, quantityA, TX_DEFAULTS);

          await expect(setToken.issue(quantityInWei, TX_DEFAULTS)).to.eventually.be.rejectedWith(
            INVALID_OPCODE,
          );
        });

        it("should disallow issuing a quantity of tokens that would trigger an overflow", async () => {
          const overflowUnits = 200000000;

          // This creates a SetToken with only one backing token.
          setToken = await SetToken.new(
            [componentB.address],
            [overflowUnits],
            setName,
            setSymbol,
            TX_DEFAULTS,
          );

          const quantity = 100;
          const quantityB = quantity * overflowUnits / Math.pow(10, 9);

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
  });
});
