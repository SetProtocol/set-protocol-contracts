import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '../../../utils/chaiSetup';
import { BigNumberSetup } from '../../../utils/bigNumberSetup';
import {
  CoreContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract
} from '../../../utils/contracts';
import { Address, Log } from '../../../types/common.js';
import { ether } from '../../../utils/units';
import { assertLogEquivalence, getFormattedLogsFromTxHash } from '../../../utils/logs';
import { IssuanceComponentDeposited } from '../../../utils/contract_logs/core';
import { assertTokenBalance, expectRevertError } from '../../../utils/tokenAssertions';
import { DEFAULT_GAS, DEPLOYED_TOKEN_QUANTITY, NULL_ADDRESS, ZERO } from '../../../utils/constants';
import { CoreWrapper } from '../../../utils/coreWrapper';
import { ERC20Wrapper } from '../../../utils/erc20Wrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;
const Core = artifacts.require('Core');


contract('CoreIssuance', accounts => {
  const [
    ownerAccount,
    otherAccount,
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    core = await coreWrapper.deployCoreAsync();
    vault = await coreWrapper.deployVaultAsync();
    transferProxy = await coreWrapper.deployTransferProxyAsync();
    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync();
    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);
  });

  describe('#issue', async () => {
    let subjectCaller: Address;
    let subjectQuantityToIssue: BigNumber;
    let subjectSetToIssue: Address;

    const naturalUnit: BigNumber = ether(2);
    let components: StandardTokenMockContract[] = [];
    let componentUnits: BigNumber[];
    let setToken: SetTokenContract;

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(2, ownerAccount);
      await erc20Wrapper.approveTransfersAsync(components, transferProxy.address);

      const componentAddresses = _.map(components, token => token.address);
      componentUnits = _.map(components, () => ether(4)); // Multiple of naturalUnit
      setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      subjectCaller = ownerAccount;
      subjectQuantityToIssue = ether(2);
      subjectSetToIssue = setToken.address;
    });

    async function subject(): Promise<string> {
      return core.issue.sendTransactionAsync(
        subjectSetToIssue,
        subjectQuantityToIssue,
        { from: subjectCaller },
      );
    }

    it('transfers the required tokens from the user', async () => {
      const component: StandardTokenMockContract = _.first(components);
      const unit: BigNumber = _.first(componentUnits);

      const existingBalance = await component.balanceOf.callAsync(ownerAccount);
      assertTokenBalance(component, DEPLOYED_TOKEN_QUANTITY, ownerAccount);

      await subject();

      const newBalance = await component.balanceOf.callAsync(ownerAccount);
      const expectedNewBalance = existingBalance.sub(subjectQuantityToIssue.div(naturalUnit).mul(unit));
      expect(newBalance).to.be.bignumber.equal(expectedNewBalance);
    });

    it('emits a IssuanceComponentDeposited even for each component deposited', async () => {
      const txHash = await subject();
      const formattedLogs = await getFormattedLogsFromTxHash(txHash);

      const expectedLogs: Log[] = _.map(components, (component, idx) => {
        const requiredQuantityToIssue = subjectQuantityToIssue.div(naturalUnit).mul(componentUnits[idx]);
        return IssuanceComponentDeposited(
          core.address,
          setToken.address,
          component.address,
          requiredQuantityToIssue,
        );
      });

      await assertLogEquivalence(expectedLogs, formattedLogs);
    });

    it('updates the balances of the components in the vault to belong to the set token', async () => {
      const existingBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
        components,
        vault,
        setToken.address,
      );

      await subject();

      const expectedNewBalances = _.map(existingBalances, (balance, idx) => {
        const units = componentUnits[idx];
        return balance.add(subjectQuantityToIssue.div(naturalUnit).mul(units));
      });
      const newBalances = await coreWrapper.getVaultBalancesForTokensForOwner(components, vault, setToken.address);
      expect(newBalances).to.be.bignumber.eql(expectedNewBalances);
    });

    it('does not change balances of the components in the vault for the user', async () => {
      const existingBalances = await coreWrapper.getVaultBalancesForTokensForOwner(components, vault, ownerAccount);

      await subject();

      const newBalances = await coreWrapper.getVaultBalancesForTokensForOwner(components, vault, ownerAccount);
      expect(newBalances).to.be.bignumber.eql(existingBalances);
    });

    it('mints the correct quantity of the set for the user', async () => {
      const existingBalance = await setToken.balanceOf.callAsync(ownerAccount);

      await subject();

      assertTokenBalance(setToken, existingBalance.add(subjectQuantityToIssue), ownerAccount);
    });

    describe('when the set was not created through core', async () => {
      beforeEach(async () => {
        subjectSetToIssue = NULL_ADDRESS;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the user does not have enough of a component', async () => {
      beforeEach(async () => {
        await _.first(components).transfer.sendTransactionAsync(
          otherAccount,
          DEPLOYED_TOKEN_QUANTITY,
          { from: ownerAccount, gas: DEFAULT_GAS },
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the quantity is not a multiple of the natural unit of the set', async () => {
      beforeEach(async () => {
        subjectQuantityToIssue = ether(3);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when a required component quantity is in the vault for the user', async () => {
      let alreadyDepositedComponent: StandardTokenMockContract;
      const alreadyDepositedQuantity: BigNumber = DEPLOYED_TOKEN_QUANTITY;
      let componentUnit: BigNumber;

      beforeEach(async () => {
        alreadyDepositedComponent = _.first(components);
        componentUnit = _.first(componentUnits);
        await coreWrapper.depositFromUser(core, alreadyDepositedComponent.address, alreadyDepositedQuantity);
      });

      it('updates the vault balance of the component for the user by the correct amount', async () => {
        await subject();

        const requiredQuantityToIssue = subjectQuantityToIssue.div(naturalUnit).mul(componentUnit);
        const expectedNewBalance = alreadyDepositedQuantity.sub(requiredQuantityToIssue);
        const newVaultBalance = await vault.balances.callAsync(alreadyDepositedComponent.address, ownerAccount);
        expect(newVaultBalance).to.be.bignumber.equal(expectedNewBalance);
      });

      it('mints the correct quantity of the set for the user', async () => {
        const existingBalance = await setToken.balanceOf.callAsync(ownerAccount);

        await subject();

        assertTokenBalance(setToken, existingBalance.add(subjectQuantityToIssue), ownerAccount);
      });
    });

    describe('when half of a required component quantity is in the vault for the user', async () => {
      let alreadyDepositedComponent: StandardTokenMockContract;
      let alreadyDepositedQuantity: BigNumber;
      let componentUnit: BigNumber;
      let quantityToTransfer: BigNumber;

      beforeEach(async () => {
        alreadyDepositedComponent = _.first(components);
        componentUnit = _.first(componentUnits);

        alreadyDepositedQuantity = subjectQuantityToIssue.div(naturalUnit).mul(componentUnit).div(2);
        await coreWrapper.depositFromUser(core, alreadyDepositedComponent.address, alreadyDepositedQuantity);

        quantityToTransfer = subjectQuantityToIssue.div(naturalUnit).mul(componentUnit).sub(alreadyDepositedQuantity);
      });

      it('transfers the correct amount from the user', async () => {
        const existingBalance = await alreadyDepositedComponent.balanceOf.callAsync(ownerAccount);
        const expectedExistingBalance = DEPLOYED_TOKEN_QUANTITY.sub(alreadyDepositedQuantity);
        assertTokenBalance(alreadyDepositedComponent, expectedExistingBalance, ownerAccount);

        await subject();

        const expectedNewBalance = existingBalance.sub(quantityToTransfer);
        const newBalance = await alreadyDepositedComponent.balanceOf.callAsync(ownerAccount);
        expect(newBalance).to.be.bignumber.equal(expectedNewBalance);
      });

      it('updates the vault balance of the component for the user by the correct amount', async () => {
        const existingVaultBalance = await vault.balances.callAsync(alreadyDepositedComponent.address, ownerAccount);

        await subject();

        const expectedNewBalance = await existingVaultBalance.sub(alreadyDepositedQuantity);
        const newVaultBalance = await vault.balances.callAsync(alreadyDepositedComponent.address, ownerAccount);
        expect(newVaultBalance).to.be.bignumber.eql(expectedNewBalance);
      });

      it('mints the correct quantity of the set for the user', async () => {
        const existingBalance = await setToken.balanceOf.callAsync(ownerAccount);

        await subject();

        assertTokenBalance(setToken, existingBalance.add(subjectQuantityToIssue), ownerAccount);
      });
    });

    describe('when all of the required component quantites are in the vault for the user', async () => {
      const alreadyDepositedQuantity: BigNumber = DEPLOYED_TOKEN_QUANTITY;

      beforeEach(async () => {
        const depositPromises = _.map(components, component =>
          coreWrapper.depositFromUser(core, component.address, alreadyDepositedQuantity),
        );
        await Promise.all(depositPromises);
      });

      it('updates the vault balance of the component for the user by the correct amount', async () => {
        const existingVaultBalancePromises = _.map(components, component =>
          vault.balances.callAsync(component.address, ownerAccount),
        );
        const existingVaultBalances = await Promise.all(existingVaultBalancePromises);

        await subject();

        const expectedVaultBalances = _.map(components, (component, idx) => {
          const requiredQuantityToIssue = subjectQuantityToIssue.div(naturalUnit).mul(componentUnits[idx]);
          return existingVaultBalances[idx].sub(requiredQuantityToIssue);
        });

        const newVaultBalancesPromises = _.map(components, component =>
          vault.balances.callAsync(component.address, ownerAccount),
        );
        const newVaultBalances = await Promise.all(newVaultBalancesPromises);

        _.map(components, (component, idx) =>
          expect(newVaultBalances[idx]).to.be.bignumber.equal(expectedVaultBalances[idx]),
        );
      });

      it('mints the correct quantity of the set for the user', async () => {
        const existingBalance = await setToken.balanceOf.callAsync(ownerAccount);

        await subject();

        assertTokenBalance(setToken, existingBalance.add(subjectQuantityToIssue), ownerAccount);
      });
    });
  });

  describe('#redeem', async () => {
    let subjectCaller: Address;
    let subjectQuantityToRedeem: BigNumber;
    let subjectSetToRedeem: Address;

    const naturalUnit: BigNumber = ether(2);
    let components: StandardTokenMockContract[] = [];
    let componentUnits: BigNumber[];
    let setToken: SetTokenContract;

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(2, ownerAccount);
      await erc20Wrapper.approveTransfersAsync(components, transferProxy.address);

      const componentAddresses = _.map(components, token => token.address);
      componentUnits = _.map(components, () => naturalUnit.mul(2)); // Multiple of naturalUnit
      setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      await coreWrapper.issueSetTokenAsync(core, setToken.address, naturalUnit);

      subjectCaller = ownerAccount;
      subjectQuantityToRedeem = naturalUnit;
      subjectSetToRedeem = setToken.address;
    });

    async function subject(): Promise<string> {
      return core.redeem.sendTransactionAsync(
        subjectSetToRedeem,
        subjectQuantityToRedeem,
        { from: subjectCaller },
      );
    }

    it('increments the balances of the tokens back to the user in vault', async () => {
      const existingVaultBalancePromises = _.map(components, component =>
        vault.balances.callAsync(component.address, ownerAccount),
      );
      const existingVaultBalances = await Promise.all(existingVaultBalancePromises);

      await subject();

      const expectedVaultBalances = _.map(components, (component, idx) => {
        const requiredQuantityToRedeem = subjectQuantityToRedeem.div(naturalUnit).mul(componentUnits[idx]);
        return existingVaultBalances[idx].add(requiredQuantityToRedeem);
      });

      const newVaultBalancesPromises = _.map(components, component =>
        vault.balances.callAsync(component.address, ownerAccount),
      );
      const newVaultBalances = await Promise.all(newVaultBalancesPromises);

      _.map(components, (component, idx) =>
        expect(newVaultBalances[idx]).to.be.bignumber.equal(expectedVaultBalances[idx]),
      );
    });

    it('decrements the balance of the tokens owned by set in vault', async () => {
      const existingVaultBalancePromises = _.map(components, component =>
        vault.balances.callAsync(component.address, subjectSetToRedeem),
      );
      const existingVaultBalances = await Promise.all(existingVaultBalancePromises);

      await subject();

      const expectedVaultBalances = _.map(components, (component, idx) => {
        const requiredQuantityToRedeem = subjectQuantityToRedeem.div(naturalUnit).mul(componentUnits[idx]);
        return existingVaultBalances[idx].sub(requiredQuantityToRedeem);
      });

      const newVaultBalancesPromises = _.map(components, component =>
        vault.balances.callAsync(component.address, subjectSetToRedeem),
      );
      const newVaultBalances = await Promise.all(newVaultBalancesPromises);

      _.map(components, (component, idx) =>
        expect(newVaultBalances[idx]).to.be.bignumber.equal(expectedVaultBalances[idx]),
      );
    });

    it('decrements the balance of the set tokens owned by owner', async () => {
      const existingSetBalance = await setToken.balanceOf.callAsync(ownerAccount);

      await subject();

      const expectedSetBalance = existingSetBalance.sub(subjectQuantityToRedeem);
      const newSetBalance = await setToken.balanceOf.callAsync(ownerAccount);
      expect(newSetBalance).to.be.bignumber.equal(expectedSetBalance);
    });

    describe('when the set was not created through core', async () => {
      beforeEach(async () => {
        subjectSetToRedeem = NULL_ADDRESS;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the user does not have enough of a set', async () => {
      beforeEach(async () => {
        subjectQuantityToRedeem = ether(3);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the quantity is not a multiple of the natural unit of the set', async () => {
      beforeEach(async () => {
        subjectQuantityToRedeem = ether(1.5);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#redeemAndWithdraw', async () => {
    let subjectCaller: Address;
    let subjectQuantityToRedeem: BigNumber;
    let subjectSetToRedeem: Address;
    let subjectComponentsToWithdrawMask: BigNumber;

    const naturalUnit: BigNumber = ether(2);
    const numComponents: number = 3;
    let components: StandardTokenMockContract[] = [];
    let componentUnits: BigNumber[];
    let setToken: SetTokenContract;

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(numComponents, ownerAccount);
      await erc20Wrapper.approveTransfersAsync(components, transferProxy.address);

      const componentAddresses = _.map(components, token => token.address);
      componentUnits = _.map(components, () => naturalUnit.mul(2)); // Multiple of naturalUnit
      setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      await coreWrapper.issueSetTokenAsync(core, setToken.address, naturalUnit);

      subjectCaller = ownerAccount;
      subjectQuantityToRedeem = naturalUnit;
      subjectSetToRedeem = setToken.address;
      subjectComponentsToWithdrawMask = coreWrapper.maskForAllComponents(numComponents);
    });

    async function subject(): Promise<string> {
      return core.redeemAndWithdraw.sendTransactionAsync(
        subjectSetToRedeem,
        subjectQuantityToRedeem,
        subjectComponentsToWithdrawMask,
        { from: subjectCaller },
      );
    }

    it('decrements the balance of the tokens owned by set in vault', async () => {
      const existingVaultBalances =
        await coreWrapper.getVaultBalancesForTokensForOwner(components, vault, subjectSetToRedeem);

      await subject();

      const expectedVaultBalances = _.map(components, (component, idx) => {
        const requiredQuantityToRedeem = subjectQuantityToRedeem.div(naturalUnit).mul(componentUnits[idx]);
        return existingVaultBalances[idx].sub(requiredQuantityToRedeem);
      });
      const newVaultBalances =
        await coreWrapper.getVaultBalancesForTokensForOwner(components, vault, subjectSetToRedeem);
      expect(newVaultBalances).to.eql(expectedVaultBalances);
    });

    it('decrements the balance of the set tokens owned by owner', async () => {
      const existingSetBalance = await setToken.balanceOf.callAsync(ownerAccount);

      await subject();

      const expectedSetBalance = existingSetBalance.sub(subjectQuantityToRedeem);
      const newSetBalance = await setToken.balanceOf.callAsync(ownerAccount);
      expect(newSetBalance).to.be.bignumber.equal(expectedSetBalance);
    });

    it('transfers all of the component tokens back to the user', async () => {
      const existingTokenBalances = await erc20Wrapper.getTokenBalances(components, ownerAccount);

      await subject();

      const expectedNewBalances = _.map(existingTokenBalances, (balance, idx) => {
        const quantityToRedeem = subjectQuantityToRedeem.div(naturalUnit).mul(componentUnits[idx]);
        return balance.add(quantityToRedeem);
      });
      const newTokenBalances = await erc20Wrapper.getTokenBalances(components, ownerAccount);
      expect(newTokenBalances).to.eql(expectedNewBalances);
    });

    describe('when the withdraw mask includes one component', async () => {
      const componentIndicesToWithdraw: number[] = [0];

      beforeEach(async () => {
        subjectComponentsToWithdrawMask = coreWrapper.maskForComponentsAtIndexes(componentIndicesToWithdraw);
      });

      it('transfers the component back to the user', async () => {
        const componentToWithdraw = _.first(components);
        const existingComponentBalance = await componentToWithdraw.balanceOf.callAsync(ownerAccount);

        await subject();

        const componentQuantityToRedeem = subjectQuantityToRedeem.div(naturalUnit).mul(_.first(componentUnits));
        const expectedComponentBalance = existingComponentBalance.add(componentQuantityToRedeem);
        const newTokenBalances = await componentToWithdraw.balanceOf.callAsync(ownerAccount);
        expect(newTokenBalances).to.eql(expectedComponentBalance);
      });

      it('increments the balances of the remaining tokens back to the user in vault', async () => {
        const remainingComponents = _.tail(components);
        const existingBalances =
          await coreWrapper.getVaultBalancesForTokensForOwner(remainingComponents, vault, subjectSetToRedeem);

        await subject();

        const expectedVaultBalances = _.map(remainingComponents, (component, idx) => {
          const requiredQuantityToRedeem = subjectQuantityToRedeem.div(naturalUnit).mul(componentUnits[idx]);
          return existingBalances[idx].sub(requiredQuantityToRedeem);
        });
        const newVaultBalances =
          await coreWrapper.getVaultBalancesForTokensForOwner(remainingComponents, vault, subjectSetToRedeem);
        expect(newVaultBalances).to.eql(expectedVaultBalances);
      });
    });

    describe('when the withdraw mask does not include any of the components', async () => {
      beforeEach(async () => {
        subjectComponentsToWithdrawMask = ZERO;
      });

      it('increments the balances of the tokens back to the user in vault', async () => {
        const existingVaultBalances =
          await coreWrapper.getVaultBalancesForTokensForOwner(components, vault, ownerAccount);

        await subject();

        const expectedVaultBalances = _.map(components, (component, idx) => {
          const requiredQuantityToRedeem = subjectQuantityToRedeem.div(naturalUnit).mul(componentUnits[idx]);
          return existingVaultBalances[idx].add(requiredQuantityToRedeem);
        });
        const newVaultBalances =
          await coreWrapper.getVaultBalancesForTokensForOwner(components, vault, ownerAccount);
        expect(newVaultBalances).to.eql(expectedVaultBalances);
      });
    });

    describe('when the set was not created through core', async () => {
      beforeEach(async () => {
        subjectSetToRedeem = NULL_ADDRESS;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the user does not have enough of a set', async () => {
      beforeEach(async () => {
        subjectQuantityToRedeem = ether(3);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the quantity is not a multiple of the natural unit of the set', async () => {
      beforeEach(async () => {
        subjectQuantityToRedeem = ether(1.5);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
