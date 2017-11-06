const assert = require('chai').assert;

const SetToken = artifacts.require("./SetToken.sol");
const StandardTokenMock = artifacts.require("./helpers/StandardTokenMock.sol");

const expectedExceptionPromise = require("./helpers/expectedException.js");
web3.eth.getTransactionReceiptMined = require("./helpers/getTransactionReceiptMined.js");

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
    it('should not allow creation of a {Set} with no inputs', async () => {
      testAccount = accounts[0];

      return expectedExceptionPromise(
        () => SetToken.new([], [], { from: testAccount }),
        3000000);
    });

    it('should not allow creation of a {Set} with duplicate token addresses', async () => {
      testAccount = accounts[0];

      tokenA = await StandardTokenMock.new(testAccount, initialTokens);
      tokenB = tokenA;

      return expectedExceptionPromise(
        () => SetToken.new([tokenA.address, tokenB.address], [unitsA, unitsB], { from: testAccount }),
        3000000);
    });

    it('should not allow creation of a {Set} with mismatched quantity of units and tokens', async () => {
      testAccount = accounts[0];

      tokenA = await StandardTokenMock.new(testAccount, initialTokens);
      tokenB = await StandardTokenMock.new(testAccount, initialTokens);

      return expectedExceptionPromise(
        () => SetToken.new([tokenA.address, tokenB.address], [unitsA], { from: testAccount }),
        3000000);
    });
  });

  describe('{Set} Issuance and Redemption', async () => {
    // Deploy an arbitrary number of ERC20 tokens and fund the first account
    beforeEach(async () => {
      testAccount = accounts[0];

      tokenA = await StandardTokenMock.new(testAccount, initialTokens);
      tokenB = await StandardTokenMock.new(testAccount, initialTokens);

      tokenSupplyA = await tokenA.totalSupply();
      assert.equal(tokenSupplyA, initialTokens);

      var ownerTokensA = await tokenA.balanceOf(testAccount);
      assert.equal(ownerTokensA, initialTokens);

      setToken = await SetToken.new([tokenA.address, tokenB.address], [unitsA, unitsB], { from: testAccount });

      assert.exists(setToken, 'Set Token does not exist');
    });

    for (var i = 1; i < 5; i++) {
      testValidIssueAndRedeem(i);  
    }

    function testValidIssueAndRedeem(_quantity) {
      var quantity = _quantity;
      var quantityA = unitsA * quantity;
      var quantityB = unitsB * quantity;

      it(`should allow a user to issue ${_quantity} tokens from the index fund`, async () => {
        await tokenA.approve(setToken.address, quantityA, { from: testAccount });
        await tokenB.approve(setToken.address, quantityB, { from: testAccount });

        await setToken.issue(quantity, { from: testAccount });

        // User should have less A token
        let postIssueBalanceAofOwner = await tokenA.balanceOf(testAccount);
        assert.strictEqual(postIssueBalanceAofOwner.toString(), (initialTokens - quantityA).toString());

        // User should have less B token
        let postIssueBalanceBofOwner = await tokenB.balanceOf(testAccount);
        assert.strictEqual(postIssueBalanceBofOwner.toString(), (initialTokens - quantityB).toString());

        // User should have an/multiple index tokens
        let postIssueBalanceIndexofOwner = await setToken.balanceOf(testAccount);
        assert.strictEqual(postIssueBalanceIndexofOwner.toString(), quantity.toString());
      });

      it(`should allow a user to redeem ${_quantity} token from the index fund`, async () => {
        await tokenA.approve(setToken.address, quantityA, { from: testAccount });
        await tokenB.approve(setToken.address, quantityB, { from: testAccount });

        await setToken.issue(quantity, { from: testAccount });

        await setToken.redeem(quantity, { from: testAccount });

        // User should have more A token
        let postIssueBalanceAofOwner = await tokenA.balanceOf(testAccount);
        assert.strictEqual(postIssueBalanceAofOwner.toString(), initialTokens.toString());

        // User should have more B token
        let postIssueBalanceBofOwner = await tokenB.balanceOf(testAccount);
        assert.strictEqual(postIssueBalanceBofOwner.toString(), initialTokens.toString());    

        // User should have 0 index token
        let postIssueBalanceIndexofOwner = await setToken.balanceOf(testAccount);
        assert.strictEqual(postIssueBalanceIndexofOwner.toString(), "0");
      });    
    }

      // TODO- Test contract inability to issue more sets than possible
      // TODO- Test contract inability to redeem more sets than possible
  });
});
