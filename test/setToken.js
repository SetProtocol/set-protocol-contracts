const assert = require('chai').assert;

const SetToken = artifacts.require('SetToken');
const StandardTokenMock = artifacts.require('StandardTokenMock');

const BigNumber = require('bignumber.js');

const expectedExceptionPromise = require('./helpers/expectedException.js');
web3.eth.getTransactionReceiptMined = require('./helpers/getTransactionReceiptMined.js');

contract('{Set}', function(accounts) {
  let tokens = [];
  let units = [];

  let tokenA, tokenSupplyA, unitsA;
  let tokenB, tokenSupplyB, unitsB;

  unitsA = 1;
  unitsB = 2;

  let testAccount, setToken;
  let initialTokens = 10000000;

  describe('{Set} creation', async () => {
    let name = 'AB Set';
    let symbol = 'AB';
    beforeEach(async () => {
      testAccount = accounts[0];

      tokenA = await StandardTokenMock.new(
        testAccount,
        initialTokens,
        'Token A',
        'A',
      );
      tokenB = await StandardTokenMock.new(
        testAccount,
        initialTokens,
        'Token B',
        'B',
      );
    });

    it('should not allow creation of a {Set} with no inputs', async () => {
      return expectedExceptionPromise(
        () => SetToken.new([], [], name, symbol, { from: testAccount }),
        3000000,
      );
    });

    it('should not allow creation of a {Set} with mismatched quantity of units and tokens', async () => {
      return expectedExceptionPromise(
        () =>
          SetToken.new(
            [tokenA.address, tokenB.address],
            [unitsA],
            name,
            symbol,
            { from: testAccount },
          ),
        3000000,
      );
    });

    it('should not allow creation of a {Set} with units of 0 value', async () => {
      let badUnit = 0;

      return expectedExceptionPromise(
        () =>
          SetToken.new(
            [tokenA.address, tokenB.address],
            [unitsA, badUnit],
            name,
            symbol,
            { from: testAccount },
          ),
        3000000,
      );
    });

    it('should not allow creation of a {Set} with address of 0', async () => {
      let badUnit = 0;

      return expectedExceptionPromise(
        () =>
          SetToken.new(
            [tokenA.address, null],
            [unitsA, badUnit],
            name,
            symbol,
            { from: testAccount },
          ),
        3000000,
      );
    });

    it('should allow creation of a {Set} with correct data', async () => {
      let setToken = await SetToken.new(
        [tokenA.address, tokenB.address],
        [unitsA, unitsB],
        name,
        symbol,
        { from: testAccount },
      );
      assert.exists(setToken, 'Set Token does not exist');
    });
  });

  describe('{Set} Issuance and Redemption', async () => {
    let setName = 'Test Set A';
    let setSymbol = 'SETA';

    // Deploy an arbitrary number of ERC20 tokens and fund the first account
    beforeEach(async () => {
      testAccount = accounts[0];

      tokenA = await StandardTokenMock.new(
        testAccount,
        initialTokens,
        'Token A',
        'A',
      );
      tokenB = await StandardTokenMock.new(
        testAccount,
        initialTokens,
        'Token B',
        'B',
      );

      tokenSupplyA = await tokenA.totalSupply();
      assert.equal(Number(tokenSupplyA.toString()), initialTokens);

      var ownerTokensA = await tokenA.balanceOf(testAccount);
      assert.equal(Number(ownerTokensA.toString()), initialTokens);

      setToken = await SetToken.new(
        [tokenA.address, tokenB.address],
        [unitsA, unitsB],
        setName,
        setSymbol,
        { from: testAccount },
      );

      assert.exists(setToken, 'Set Token does not exist');
    });
    it('should have the basic information correct', async () => {
      // Assert correct name
      let setTokenName = await setToken.name({ from: testAccount });
      assert.strictEqual(setTokenName, setName);

      // Assert correct symbol
      let setTokenSymbol = await setToken.symbol({ from: testAccount });
      assert.strictEqual(setTokenSymbol, setSymbol);

      // Assert correctness of number of tokens
      let setTokenCount = await setToken.tokenCount({ from: testAccount });
      assert.strictEqual(setTokenCount.toString(), '2');

      // Assert correct length of tokens
      let setTokens = await setToken.getTokens({ from: testAccount });
      assert.strictEqual(setTokens.length, 2);

      // Assert correct length of units
      let setUnits = await setToken.getUnits({ from: testAccount });
      assert.strictEqual(setUnits.length, 2);

      // Assert correctness of token A
      let addressComponentA = await setToken.tokens(0, { from: testAccount });
      assert.strictEqual(addressComponentA, tokenA.address);

      // Assert correctness of token B
      let addressComponentB = await setToken.tokens(1, { from: testAccount });
      assert.strictEqual(addressComponentB, tokenB.address);

      // Assert correctness of units for token A
      let componentAUnit = await setToken.units(0, { from: testAccount });
      assert.strictEqual(componentAUnit.toString(), unitsA.toString());

      // Assert correctness of units for token B
      let componentBUnit = await setToken.units(1, { from: testAccount });
      assert.strictEqual(componentBUnit.toString(), unitsB.toString());
    });

    for (var i = 1; i < 5; i++) {
      testValidIssueAndRedeem(i);
    }

    function testValidIssueAndRedeem(_quantity) {
      var quantity = _quantity;
      var quantityA = unitsA * quantity;
      var quantityB = unitsB * quantity;

      it(`should allow a user to issue ${
        _quantity
      } tokens from the index fund`, async () => {
        await tokenA.approve(setToken.address, quantityA, {
          from: testAccount,
        });
        await tokenB.approve(setToken.address, quantityB, {
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
        assert.strictEqual(Number(issuanceLog._quantity.toString()), quantity);

        // User should have less A token
        let postIssueBalanceAofOwner = await tokenA.balanceOf(testAccount);
        assert.strictEqual(
          postIssueBalanceAofOwner.toString(),
          (initialTokens - quantityA).toString(),
        );

        // User should have less B token
        let postIssueBalanceBofOwner = await tokenB.balanceOf(testAccount);
        assert.strictEqual(
          postIssueBalanceBofOwner.toString(),
          (initialTokens - quantityB).toString(),
        );

        // User should have an/multiple index tokens
        let postIssueBalanceIndexofOwner = await setToken.balanceOf(
          testAccount,
        );
        assert.strictEqual(
          postIssueBalanceIndexofOwner.toString(),
          quantity.toString(),
        );
      });

      it(`should allow a user to redeem ${
        _quantity
      } token from the index fund`, async () => {
        await tokenA.approve(setToken.address, quantityA, {
          from: testAccount,
        });
        await tokenB.approve(setToken.address, quantityB, {
          from: testAccount,
        });

        await setToken.issue(quantity, { from: testAccount });

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
        let postIssueBalanceAofOwner = await tokenA.balanceOf(testAccount);
        assert.strictEqual(
          postIssueBalanceAofOwner.toString(),
          initialTokens.toString(),
        );

        // User should have more B token
        let postIssueBalanceBofOwner = await tokenB.balanceOf(testAccount);
        assert.strictEqual(
          postIssueBalanceBofOwner.toString(),
          initialTokens.toString(),
        );

        // User should have 0 index token
        let postIssueBalanceIndexofOwner = await setToken.balanceOf(
          testAccount,
        );
        assert.strictEqual(postIssueBalanceIndexofOwner.toString(), '0');
      });
    }

    it('should disallow issuing a quantity of tokens that would trigger an overflow', async () => {
      var units = 2;

      // This creates a SetToken with only one backing token.
      setToken = await SetToken.new(
        [tokenB.address],
        [units],
        setName,
        setSymbol,
        { from: testAccount },
      );

      var quantity = 100;
      var quantityB = quantity * units;

      await tokenB.approve(setToken.address, quantityB, {
        from: testAccount,
      });

      // Set quantity to 2^254 + 100. This quantity * 2 will overflow a
      // uint256 and equal 200.
      var overflow = new BigNumber('0x8000000000000000000000000000000000000000000000000000000000000000');
      var quantityOverflow = overflow.plus(quantity);

      await expectedExceptionPromise(
        () =>
          setToken.issue(quantityOverflow, {
            from: testAccount,
          }),
        3000000,
      );
    });
  });
});
