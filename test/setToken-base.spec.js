const assert = require('chai').assert;

const SetToken = artifacts.require('SetToken');
const StandardTokenMock = artifacts.require('StandardTokenMock');

const BigNumber = require('bignumber.js');

const expectedExceptionPromise = require('./helpers/expectedException.js');
web3.eth.getTransactionReceiptMined = require('./helpers/getTransactionReceiptMined.js');

contract('{Set}', function(ACCOUNTS) {
  let components = [];
  let units = [];

  let componentA, tokenSupplyA, unitsA;
  let componentB, tokenSupplyB, unitsB;

  unitsA = 1000000000; // 1 GWEI
  unitsB = 2000000000; // 2 GWEI

  let testAccount = ACCOUNTS[0];
  let setToken;
  let initialTokens = 100000000000000000000; // 100 ether worth of tokens

  const TX_DEFAULTS = { from : testAccount };
  const EXPECTED_FAILURE_GAS_LIMIT_DEFAULT = 3000000;

  const setName = 'TEST SET';
  const setSymbol = 'TEST';

  describe('{Set} creation', async () => {
    beforeEach(async () => {
      componentA = await StandardTokenMock.new(
        testAccount,
        initialTokens,
        'Component A',
        'A',
      );
      componentB = await StandardTokenMock.new(
        testAccount,
        initialTokens,
        'Component B',
        'B',
      );
    });

    describe('should not allow creation of a {Set} with no inputs', async () => {
      return expectedExceptionPromise(
        () => SetToken.new([], [], setName, setSymbol, TX_DEFAULTS),
        EXPECTED_FAILURE_GAS_LIMIT_DEFAULT,
      );
    });

    it('should not allow creation of a {Set} with mismatched quantity of units and tokens', async () => {
      return expectedExceptionPromise(
        () =>
          SetToken.new(
            [componentA.address, componentB.address],
            [unitsA],
            setName,
            setSymbol,
            TX_DEFAULTS,
          ),
        EXPECTED_FAILURE_GAS_LIMIT_DEFAULT,
      );
    });

    it('should not allow creation of a {Set} with units of 0 value', async () => {
      let badUnit = 0;

      return expectedExceptionPromise(
        () =>
          SetToken.new(
            [componentA.address, componentB.address],
            [unitsA, badUnit],
            setName,
            setSymbol,
            TX_DEFAULTS,
          ),
        EXPECTED_FAILURE_GAS_LIMIT_DEFAULT,
      );
    });

    it('should not allow creation of a {Set} with address of 0', async () => {
      let badUnit = 0;

      return expectedExceptionPromise(
        () =>
          SetToken.new(
            [componentA.address, null],
            [unitsA, badUnit],
            setName,
            setSymbol,
            TX_DEFAULTS,
          ),
        EXPECTED_FAILURE_GAS_LIMIT_DEFAULT,
      );
    });

    it('should allow creation of a {Set} with correct data', async () => {
      let setToken = await SetToken.new(
        [componentA.address, componentB.address],
        [unitsA, unitsB],
        setName,
        setSymbol,
        TX_DEFAULTS,
      );
      assert.exists(setToken, 'Set Token does not exist');

      // Assert correct name
      let setTokenName = await setToken.name(TX_DEFAULTS);
      assert.strictEqual(setTokenName, setName);

      // Assert correct symbol
      let setTokenSymbol = await setToken.symbol(TX_DEFAULTS);
      assert.strictEqual(setTokenSymbol, setSymbol);

      // Assert correctness of number of components
      let setTokenCount = await setToken.componentCount(TX_DEFAULTS);
      assert.strictEqual(setTokenCount.toString(), '2');

      // Assert correct length of components
      let setTokens = await setToken.getComponents(TX_DEFAULTS);
      assert.strictEqual(setTokens.length, 2);

      // Assert correct length of units
      let setUnits = await setToken.getUnits(TX_DEFAULTS);
      assert.strictEqual(setUnits.length, 2);

      // Assert correctness of component A
      let addressComponentA = await setToken.components(0, TX_DEFAULTS);
      assert.strictEqual(addressComponentA, componentA.address);

      // Assert correctness of component B
      let addressComponentB = await setToken.components(1, TX_DEFAULTS);
      assert.strictEqual(addressComponentB, componentB.address);

      // Assert correctness of units for component A
      let componentAUnit = await setToken.units(0, TX_DEFAULTS);
      assert.strictEqual(componentAUnit.toString(), unitsA.toString());

      // Assert correctness of units for component B
      let componentBUnit = await setToken.units(1, TX_DEFAULTS);
      assert.strictEqual(componentBUnit.toString(), unitsB.toString());
    });
  });

  describe('{Set} Issuance and Redemption', async () => {
    describe('of standard path', async () => {
      // Deploy an arbitrary number of ERC20 tokens and fund the first account
      beforeEach(async () => {
        testAccount = ACCOUNTS[0];

        componentA = await StandardTokenMock.new(
          testAccount,
          initialTokens,
          'Component A',
          'A',
        );
        componentB = await StandardTokenMock.new(
          testAccount,
          initialTokens,
          'Component B',
          'B',
        );

        setToken = await SetToken.new(
          [componentA.address, componentB.address],
          [unitsA, unitsB],
          setName,
          setSymbol,
          TX_DEFAULTS,
        );

        assert.exists(setToken, 'Set Token does not exist');
      });

      describe('Test the issuance and redemption of multiple tokens', async () => {
        for (var i = 1; i < 5; i++) {
          // Quantities for tokens are usually inputted in Wei
          const quantityInWei = i * Math.pow(10, 18);
          testValidIssueAndRedeem(quantityInWei);
        }
      });

      function testValidIssueAndRedeem(_quantity) {
        var quantity = _quantity;

        // Expected Quantities of tokens moved are divided by a gWei
        // to reflect the new units in set instantiation
        var quantityA = unitsA * quantity / Math.pow(10, 9);
        var quantityB = unitsB * quantity / Math.pow(10, 9);

        it(`should allow a user to issue ${
          _quantity
        } tokens from the index fund`, async () => {
          await componentA.approve(setToken.address, quantityA, {
            from: testAccount,
          });
          await componentB.approve(setToken.address, quantityB, {
            from: testAccount,
          });

          const issuanceReceipt = await setToken.issue(quantity, {
            from: testAccount,
          });
          const issuanceLog =
            issuanceReceipt.logs[issuanceReceipt.logs.length - 1].args;

          // The logs should have the right sender
          assert.strictEqual(issuanceLog._sender, testAccount);

          // The logs should have the right quantity
          assert.strictEqual(Number(issuanceLog._quantity.toString()), quantity, 'Issuance logs');

          // User should have less A token
          let postIssueBalanceAofOwner = await componentA.balanceOf(testAccount);
          assert.strictEqual(
            postIssueBalanceAofOwner.toString(),
            (initialTokens - quantityA).toString(),
            'Component A Balance',
          );

          // User should have less B token
          let postIssueBalanceBofOwner = await componentB.balanceOf(testAccount);
          assert.strictEqual(
            postIssueBalanceBofOwner.toString(),
            (initialTokens - quantityB).toString(),
            'Component B Balance',
          );

          // User should have an/multiple index tokens
          let postIssueBalanceIndexofOwner = await setToken.balanceOf(
            testAccount,
          );
          assert.strictEqual(
            postIssueBalanceIndexofOwner.toString(),
            quantity.toString(),
            'Set Component Balance',
          );
        });

        it(`should allow a user to redeem ${
          _quantity
        } token from the index fund`, async () => {
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
          const redeemLog =
            redeemReceipt.logs[redeemReceipt.logs.length - 1].args;

          // The logs should have the right sender
          assert.strictEqual(redeemLog._sender, testAccount);

          // The logs should have the right quantity
          assert.strictEqual(Number(redeemLog._quantity.toString()), quantity);

          // User should have more A token
          let postRedeemBalanceAofOwner = await componentA.balanceOf(testAccount);
          assert.strictEqual(
            postRedeemBalanceAofOwner.toString(),
            initialTokens.toString(),
          );

          // User should have more B token
          let postRedeemBalanceBofOwner = await componentB.balanceOf(testAccount);
          assert.strictEqual(
            postRedeemBalanceBofOwner.toString(),
            initialTokens.toString(),
          );

          // User should have 0 index token
          let postRedeemBalanceIndexofOwner = await setToken.balanceOf(
            testAccount,
          );
          assert.strictEqual(postRedeemBalanceIndexofOwner.toString(), '0');
        });
      }
    });
    
    describe('of Sets with fractional units', () => {
      it('should be able to issue and redeem a Set defined with a fractional unit', async () => {
        // This unit represents half a gWei
        var units = 500000000;

        // This creates a SetToken with only one backing token.
        setToken = await SetToken.new(
          [componentA.address],
          [units],
          setName,
          setSymbol,
          TX_DEFAULTS,
        );

        var quantityInWei = 1 * Math.pow(10, 18);

        // Quantity A expected to be deduced, which is 1/2 of an A token
        var quantityA = quantityInWei * units / Math.pow(10, 9);

        await componentA.approve(setToken.address, quantityA, TX_DEFAULTS);

        await setToken.issue(quantityInWei, TX_DEFAULTS);

        // User should have less A token
        let postIssueBalanceAofOwner = await componentA.balanceOf(testAccount);
        assert.strictEqual(
          postIssueBalanceAofOwner.toString(),
          (initialTokens - quantityA).toString(),
        );

        // User should have an/multiple index tokens
        let postIssueBalanceIndexofOwner = await setToken.balanceOf(
          testAccount,
        );
        assert.strictEqual(
          postIssueBalanceIndexofOwner.toString(),
          quantityInWei.toString(),
        );

        await setToken.redeem(quantityInWei, TX_DEFAULTS);

        // User should have more A token
        let postRedeemBalanceAofOwner = await componentA.balanceOf(testAccount);
        assert.strictEqual(
          postRedeemBalanceAofOwner.toString(),
          initialTokens.toString(),
        );

        // User should have 0 index token
        let postRedeemBalanceIndexofOwner = await setToken.balanceOf(
          testAccount,
        );
        assert.strictEqual(postRedeemBalanceIndexofOwner.toString(), '0');
      });

      it('should disallow issuing a Set when the amount is too low', async () => {
        // This unit represents a thousandth of a gWei
        var units = 100000;

        // This creates a SetToken with only one backing token.
        setToken = await SetToken.new(
          [componentA.address],
          [units],
          setName,
          setSymbol,
          TX_DEFAULTS,
        );

        var quantityInWei = 1000;

        // The quantity approved will be much larger than the amount
        // that we are trying to issue
        var quantityA = quantityInWei * units;

        await componentA.approve(setToken.address, quantityA, TX_DEFAULTS);

        await expectedExceptionPromise(
          () =>
            setToken.issue(quantityInWei, TX_DEFAULTS),
          EXPECTED_FAILURE_GAS_LIMIT_DEFAULT,
        );
      });

    });    

    it('should disallow issuing a quantity of tokens that would trigger an overflow', async () => {
      var units = 200000000;

      // This creates a SetToken with only one backing token.
      setToken = await SetToken.new(
        [componentB.address],
        [units],
        setName,
        setSymbol,
        TX_DEFAULTS,
      );

      var quantity = 100;
      var quantityB = quantity * units / Math.pow(10, 9);

      await componentB.approve(setToken.address, quantityB, TX_DEFAULTS);

      // Set quantity to 2^254 + 100. This quantity * 2 will overflow a
      // uint256 and equal 200.
      var overflow = new BigNumber('0x8000000000000000000000000000000000000000000000000000000000000000');
      var quantityOverflow = overflow.plus(quantity);

      await expectedExceptionPromise(
        () =>
          setToken.issue(quantityOverflow, TX_DEFAULTS),
        EXPECTED_FAILURE_GAS_LIMIT_DEFAULT,
      );
    });
  });
});
