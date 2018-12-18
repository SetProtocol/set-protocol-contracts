require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  SetTokenContract,
  SetTokenFactoryContract,
  SignatureValidatorContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract
} from '@utils/contracts';
import { ether } from '@utils/units';
import { assertTokenBalanceAsync, expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import {
  DEFAULT_GAS,
  DEPLOYED_TOKEN_QUANTITY,
  ZERO,
  ONE,
  DEFAULT_UNIT_SHARES,
  DEFAULT_REBALANCING_NATURAL_UNIT,
  ONE_DAY_IN_SECONDS
} from '@utils/constants';
import { getWeb3 } from '@utils/web3Helper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';
import { RebalancingWrapper } from '@utils/wrappers/rebalancingWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const Core = artifacts.require('Core');
const { SetProtocolUtils: SetUtils } = setProtocolUtils;
const { expect } = chai;
const blockchain = new Blockchain(web3);
const { NULL_ADDRESS } =  SetUtils.CONSTANTS;


contract('CoreIssuance', accounts => {
  const [
    ownerAccount,
    otherAccount,
    managerAccount,
    protocolAccount,
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;
  let rebalancingTokenFactory: RebalancingSetTokenFactoryContract;
  let signatureValidator: SignatureValidatorContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);
  const rebalancingTokenWrapper = new RebalancingWrapper(
    ownerAccount,
    coreWrapper,
    erc20Wrapper,
    blockchain
  );

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    transferProxy = await coreWrapper.deployTransferProxyAsync();
    vault = await coreWrapper.deployVaultAsync();
    signatureValidator = await coreWrapper.deploySignatureValidatorAsync();
    core = await coreWrapper.deployCoreAsync(transferProxy, vault, signatureValidator);
    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);
    rebalancingTokenFactory = await coreWrapper.deployRebalancingSetTokenFactoryAsync(
      core.address,
    );
    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);
    await coreWrapper.addFactoryAsync(core, rebalancingTokenFactory);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#issue: SetToken', async () => {
    let subjectCaller: Address;
    let subjectQuantityToIssue: BigNumber;
    let subjectSetToIssue: Address;

    const naturalUnit: BigNumber = ether(2);
    let components: StandardTokenMockContract[] = [];
    let componentAddresses: Address[];
    let componentUnits: BigNumber[];
    let setToken: SetTokenContract;

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(2, ownerAccount);
      await erc20Wrapper.approveTransfersAsync(components, transferProxy.address);

      componentAddresses = _.map(components, token => token.address);
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
      await assertTokenBalanceAsync(component, DEPLOYED_TOKEN_QUANTITY, ownerAccount);

      await subject();

      const newBalance = await component.balanceOf.callAsync(ownerAccount);
      const expectedNewBalance = existingBalance.sub(subjectQuantityToIssue.div(naturalUnit).mul(unit));
      expect(newBalance).to.be.bignumber.equal(expectedNewBalance);
    });

    it('updates the balances of the components in the vault to belong to the set token', async () => {
      const existingBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
        componentAddresses,
        vault,
        setToken.address,
      );

      await subject();

      const expectedNewBalances = _.map(existingBalances, (balance, idx) => {
        const units = componentUnits[idx];
        return balance.add(subjectQuantityToIssue.div(naturalUnit).mul(units));
      });
      const newBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
        componentAddresses,
        vault,
        setToken.address
      );
      expect(newBalances).to.be.bignumber.eql(expectedNewBalances);
    });

    it('does not change balances of the components in the vault for the user', async () => {
      const existingBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
        componentAddresses,
        vault,
        ownerAccount
      );

      await subject();

      const newBalances = await coreWrapper.getVaultBalancesForTokensForOwner(componentAddresses, vault, ownerAccount);
      expect(newBalances).to.be.bignumber.eql(existingBalances);
    });

    it('mints the correct quantity of the set for the user', async () => {
      const existingBalance = await setToken.balanceOf.callAsync(ownerAccount);

      await subject();

      await assertTokenBalanceAsync(setToken, existingBalance.add(subjectQuantityToIssue), ownerAccount);
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

        await assertTokenBalanceAsync(setToken, existingBalance.add(subjectQuantityToIssue), ownerAccount);
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
        await assertTokenBalanceAsync(alreadyDepositedComponent, expectedExistingBalance, ownerAccount);

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

        await assertTokenBalanceAsync(setToken, existingBalance.add(subjectQuantityToIssue), ownerAccount);
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

        await assertTokenBalanceAsync(setToken, existingBalance.add(subjectQuantityToIssue), ownerAccount);
      });
    });

    describe('when the protocol is not in operational state', async () => {
      beforeEach(async () => {
        await coreWrapper.setOperationStateAsync(
          core,
          ONE,
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#issue: RebalancingToken', async () => {
    let subjectCaller: Address;
    let subjectQuantityToIssue: BigNumber;
    let subjectSetToIssue: Address;

    let vanillaQuantityToIssue: BigNumber;
    let vanillaSetToIssue: Address;

    let initialShareRatio: BigNumber;
    let rebalancingNaturalUnit: BigNumber;
    const entranceFee: BigNumber = new BigNumber(11);

    let setToken: SetTokenContract;
    let rebalancingSetToken: RebalancingSetTokenContract;

    beforeEach(async () => {
      const setTokens = await rebalancingTokenWrapper.createSetTokensAsync(
        core,
        setTokenFactory.address,
        transferProxy.address,
        1
      );
      setToken = setTokens[0];

      rebalancingNaturalUnit = DEFAULT_REBALANCING_NATURAL_UNIT;
      initialShareRatio = DEFAULT_UNIT_SHARES;
      rebalancingSetToken = await rebalancingTokenWrapper.createDefaultRebalancingSetTokenAsync(
        core,
        rebalancingTokenFactory.address,
        managerAccount,
        setToken.address,
        ONE_DAY_IN_SECONDS,
        entranceFee
      );

      vanillaQuantityToIssue = ether(2);
      vanillaSetToIssue = setToken.address;
      await coreWrapper.issueSetTokenAsync(core, vanillaSetToIssue, vanillaQuantityToIssue);
      await erc20Wrapper.approveTransfersAsync([setToken], transferProxy.address);

      subjectCaller = ownerAccount;
      subjectQuantityToIssue = ether(1);
      subjectSetToIssue = rebalancingSetToken.address;
    });

    async function subject(): Promise<string> {
      return core.issue.sendTransactionAsync(
        subjectSetToIssue,
        subjectQuantityToIssue,
        { from: subjectCaller },
      );
    }

    it('transfers the required tokens from the user', async () => {
      const existingBalance = await setToken.balanceOf.callAsync(ownerAccount);
      await assertTokenBalanceAsync(setToken, vanillaQuantityToIssue, ownerAccount);

      await subject();

      const newBalance = await setToken.balanceOf.callAsync(ownerAccount);
      const expectedNewBalance = existingBalance.sub(subjectQuantityToIssue);
      expect(newBalance).to.be.bignumber.equal(expectedNewBalance);
    });

    it('updates the balances of the components in the vault to belong to the set token', async () => {
      const existingBalance = await vault.balances.callAsync(setToken.address, rebalancingSetToken.address);

      await subject();

      const expectedNewBalance = existingBalance.add(
        subjectQuantityToIssue.div(rebalancingNaturalUnit).mul(initialShareRatio)
      );
      const newBalance = await vault.balances.callAsync(setToken.address, rebalancingSetToken.address);
      expect(newBalance).to.be.bignumber.eql(expectedNewBalance);
    });

    it('does not change balances of the components in the vault for the user', async () => {
      const existingBalances = await vault.balances.callAsync(setToken.address, ownerAccount);

      await subject();

      const newBalances = await vault.balances.callAsync(setToken.address, ownerAccount);
      expect(newBalances).to.be.bignumber.equal(existingBalances);
    });

    it('mints the correct quantity of the set for the user and manager', async () => {
      const issuerExistingBalance = await rebalancingSetToken.balanceOf.callAsync(ownerAccount);
      const managerExistingBalance = await rebalancingSetToken.balanceOf.callAsync(managerAccount);
      const managerFee = subjectQuantityToIssue.mul(entranceFee).div(10000).round(0, 3);

      await subject();

      await assertTokenBalanceAsync(
        rebalancingSetToken,
        issuerExistingBalance.add(subjectQuantityToIssue).sub(managerFee),
        ownerAccount
      );
      await assertTokenBalanceAsync(rebalancingSetToken, managerExistingBalance.add(managerFee), managerAccount);
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
        await setToken.transfer.sendTransactionAsync(
          otherAccount,
          ether(2),
          { from: ownerAccount, gas: DEFAULT_GAS },
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the required set component quantity is in the vault for the user', async () => {
      let alreadyDepositedQuantity: BigNumber;

      beforeEach(async () => {
        alreadyDepositedQuantity = vanillaQuantityToIssue;
        await coreWrapper.depositFromUser(core, setToken.address, alreadyDepositedQuantity);
      });

      it('updates the vault balance of the component for the user by the correct amount', async () => {
        const existingVaultBalance = await vault.balances.callAsync(setToken.address, ownerAccount);
        const componentUnit = await rebalancingSetToken.unitShares.callAsync();

        await subject();

        const requiredQuantityToIssue = subjectQuantityToIssue.div(rebalancingNaturalUnit).mul(componentUnit);
        const expectedNewBalance = existingVaultBalance.sub(requiredQuantityToIssue);
        const newVaultBalance = await vault.balances.callAsync(setToken.address, ownerAccount);
        expect(newVaultBalance).to.be.bignumber.equal(expectedNewBalance);
      });

      it('mints the correct quantity of the set for the user and manager', async () => {
        const issuerExistingBalance = await rebalancingSetToken.balanceOf.callAsync(ownerAccount);
        const managerExistingBalance = await rebalancingSetToken.balanceOf.callAsync(managerAccount);
        const managerFee = subjectQuantityToIssue.mul(entranceFee).div(10000).round(0, 3);

        await subject();

        await assertTokenBalanceAsync(
          rebalancingSetToken,
          issuerExistingBalance.add(subjectQuantityToIssue).sub(managerFee),
          ownerAccount
        );
        await assertTokenBalanceAsync(rebalancingSetToken, managerExistingBalance.add(managerFee), managerAccount);
      });
    });

    describe('when half of the required set component quantity is in the vault for the user', async () => {
      let alreadyDepositedQuantity: BigNumber;
      let quantityToTransfer: BigNumber;

      beforeEach(async () => {
        alreadyDepositedQuantity = subjectQuantityToIssue.div(rebalancingNaturalUnit).mul(initialShareRatio).div(2);
        await coreWrapper.depositFromUser(core, setToken.address, alreadyDepositedQuantity);

        quantityToTransfer = subjectQuantityToIssue.div(rebalancingNaturalUnit).mul(initialShareRatio)
        .sub(alreadyDepositedQuantity);
      });

      it('transfers the correct amount from the user', async () => {
        const existingBalance = await setToken.balanceOf.callAsync(ownerAccount);
        const expectedExistingBalance = vanillaQuantityToIssue.sub(alreadyDepositedQuantity);
        await assertTokenBalanceAsync(setToken, expectedExistingBalance, ownerAccount);

        await subject();

        const expectedNewBalance = existingBalance.sub(quantityToTransfer);
        const newBalance = await setToken.balanceOf.callAsync(ownerAccount);
        expect(newBalance).to.be.bignumber.equal(expectedNewBalance);
      });

      it('updates the vault balance of the component for the user by the correct amount', async () => {
        const existingVaultBalance = await vault.balances.callAsync(setToken.address, ownerAccount);

        await subject();

        const expectedNewBalance = await existingVaultBalance.sub(alreadyDepositedQuantity);
        const newVaultBalance = await vault.balances.callAsync(setToken.address, ownerAccount);
        expect(newVaultBalance).to.be.bignumber.eql(expectedNewBalance);
      });

      it('mints the correct quantity of the set for the user and manager', async () => {
        const issuerExistingBalance = await rebalancingSetToken.balanceOf.callAsync(ownerAccount);
        const managerExistingBalance = await rebalancingSetToken.balanceOf.callAsync(managerAccount);
        const managerFee = subjectQuantityToIssue.mul(entranceFee).div(10000).round(0, 3);

        await subject();

        await assertTokenBalanceAsync(
          rebalancingSetToken,
          issuerExistingBalance.add(subjectQuantityToIssue).sub(managerFee),
          ownerAccount
        );
        await assertTokenBalanceAsync(rebalancingSetToken, managerExistingBalance.add(managerFee), managerAccount);
      });
    });

    describe('when protocol fees are enabled', async () => {
      let protocolFeeBasisPoints: BigNumber;

      beforeEach(async () => {
        protocolFeeBasisPoints = new BigNumber(100);
        rebalancingTokenWrapper.setProtocolAddressAndFees(
          core,
          protocolAccount,
          protocolFeeBasisPoints,
        );
      });

      it('mints the correct quantity of the set for the user, manager and, protocol', async () => {
        const issuerExistingBalance = await rebalancingSetToken.balanceOf.callAsync(ownerAccount);
        const managerExistingBalance = await rebalancingSetToken.balanceOf.callAsync(managerAccount);
        const protocolExistingBalance = await rebalancingSetToken.balanceOf.callAsync(protocolAccount);

        const tempManagerFee = subjectQuantityToIssue.mul(entranceFee).div(10000).round(0, 3);
        const protocolFee = tempManagerFee.mul(protocolFeeBasisPoints).div(10000).round(0, 3);
        const managerFee = tempManagerFee.sub(protocolFee);

        await subject();

        await assertTokenBalanceAsync(
          rebalancingSetToken,
          issuerExistingBalance.add(subjectQuantityToIssue).sub(tempManagerFee),
          ownerAccount
        );
        await assertTokenBalanceAsync(rebalancingSetToken, managerExistingBalance.add(managerFee), managerAccount);
        await assertTokenBalanceAsync(rebalancingSetToken, protocolExistingBalance.add(protocolFee), protocolAccount);
      });
    });
  });

  describe('#issueInVault', async () => {
    let subjectCaller: Address;
    let subjectQuantityToIssue: BigNumber;
    let subjectSetToIssue: Address;

    const naturalUnit: BigNumber = ether(2);
    let components: StandardTokenMockContract[] = [];
    let componentAddresses: Address[];
    let componentUnits: BigNumber[];
    let setToken: SetTokenContract;

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(2, ownerAccount);
      await erc20Wrapper.approveTransfersAsync(components, transferProxy.address);

      componentAddresses = _.map(components, token => token.address);
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
      return core.issueInVault.sendTransactionAsync(
        subjectSetToIssue,
        subjectQuantityToIssue,
        { from: subjectCaller },
      );
    }

    it('transfers the required tokens from the caller', async () => {
      const component: StandardTokenMockContract = _.first(components);
      const unit: BigNumber = _.first(componentUnits);

      const existingBalance = await component.balanceOf.callAsync(ownerAccount);
      await assertTokenBalanceAsync(component, DEPLOYED_TOKEN_QUANTITY, ownerAccount);

      await subject();

      const newBalance = await component.balanceOf.callAsync(ownerAccount);
      const expectedNewBalance = existingBalance.sub(subjectQuantityToIssue.div(naturalUnit).mul(unit));
      expect(newBalance).to.be.bignumber.equal(expectedNewBalance);
    });

    it('updates the balances of the components in the vault to belong to the set token', async () => {
      const existingBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
        componentAddresses,
        vault,
        setToken.address,
      );

      await subject();

      const expectedNewBalances = _.map(existingBalances, (balance, idx) => {
        const units = componentUnits[idx];
        return balance.add(subjectQuantityToIssue.div(naturalUnit).mul(units));
      });
      const newBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
        componentAddresses,
        vault,
        setToken.address
      );
      expect(newBalances).to.be.bignumber.eql(expectedNewBalances);
    });

    it('mints the correct quantity of the set for the vault', async () => {
      const existingBalance = await setToken.balanceOf.callAsync(subjectCaller);

      await subject();

      await assertTokenBalanceAsync(setToken, existingBalance.add(subjectQuantityToIssue), vault.address);
    });

    it('vault attributes Set to caller', async () => {
      const existingBalance = await vault.getOwnerBalance.callAsync(setToken.address, subjectCaller);

      await subject();

      const callerVaultBalance = await vault.getOwnerBalance.callAsync(setToken.address, subjectCaller);
      expect(callerVaultBalance).to.be.bignumber.eql(subjectQuantityToIssue.add(existingBalance));
    });
  });

  describe('#issueTo', async () => {
    let subjectCaller: Address;
    let subjectQuantityToIssue: BigNumber;
    let subjectSetToIssue: Address;
    let subjectRecipient: Address;

    const naturalUnit: BigNumber = ether(2);
    let components: StandardTokenMockContract[] = [];
    let componentAddresses: Address[];
    let componentUnits: BigNumber[];
    let setToken: SetTokenContract;

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(2, ownerAccount);
      await erc20Wrapper.approveTransfersAsync(components, transferProxy.address);

      componentAddresses = _.map(components, token => token.address);
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
      subjectRecipient = otherAccount;
    });

    async function subject(): Promise<string> {
      return core.issueTo.sendTransactionAsync(
        subjectRecipient,
        subjectSetToIssue,
        subjectQuantityToIssue,
        { from: subjectCaller },
      );
    }

    it('transfers the required tokens from the caller', async () => {
      const component: StandardTokenMockContract = _.first(components);
      const unit: BigNumber = _.first(componentUnits);

      const existingBalance = await component.balanceOf.callAsync(ownerAccount);
      await assertTokenBalanceAsync(component, DEPLOYED_TOKEN_QUANTITY, ownerAccount);

      await subject();

      const newBalance = await component.balanceOf.callAsync(ownerAccount);
      const expectedNewBalance = existingBalance.sub(subjectQuantityToIssue.div(naturalUnit).mul(unit));
      expect(newBalance).to.be.bignumber.equal(expectedNewBalance);
    });

    it('updates the balances of the components in the vault to belong to the set token', async () => {
      const existingBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
        componentAddresses,
        vault,
        setToken.address,
      );

      await subject();

      const expectedNewBalances = _.map(existingBalances, (balance, idx) => {
        const units = componentUnits[idx];
        return balance.add(subjectQuantityToIssue.div(naturalUnit).mul(units));
      });
      const newBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
        componentAddresses,
        vault,
        setToken.address
      );
      expect(newBalances).to.be.bignumber.eql(expectedNewBalances);
    });

    it('mints the correct quantity of the set for the recipient', async () => {
      const existingBalance = await setToken.balanceOf.callAsync(subjectRecipient);

      await subject();

      await assertTokenBalanceAsync(setToken, existingBalance.add(subjectQuantityToIssue), subjectRecipient);
    });
  });

  describe('#redeem: SetToken', async () => {
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

  describe('#redeem: RebalancingToken', async () => {
    let subjectCaller: Address;
    let subjectQuantityToRedeem: BigNumber;
    let subjectSetToRedeem: Address;

    let vanillaQuantityToIssue: BigNumber;
    let vanillaSetToIssue: Address;

    let initialShareRatio: BigNumber;
    let rebalancingNaturalUnit: BigNumber;
    const entranceFee: BigNumber = new BigNumber(11);

    let rebalancingQuantityToIssue: BigNumber;
    let rebalancingTokenToIssue: Address;

    let setToken: SetTokenContract;
    let rebalancingToken: RebalancingSetTokenContract;

    beforeEach(async () => {
      const setTokens = await rebalancingTokenWrapper.createSetTokensAsync(
        core,
        setTokenFactory.address,
        transferProxy.address,
        1
      );
      setToken = setTokens[0];


      rebalancingNaturalUnit = DEFAULT_REBALANCING_NATURAL_UNIT;
      initialShareRatio = DEFAULT_UNIT_SHARES;
      rebalancingToken = await rebalancingTokenWrapper.createDefaultRebalancingSetTokenAsync(
        core,
        rebalancingTokenFactory.address,
        managerAccount,
        setToken.address,
        ONE_DAY_IN_SECONDS
      );

      vanillaQuantityToIssue = ether(2);
      vanillaSetToIssue = setToken.address;
      await coreWrapper.issueSetTokenAsync(core, vanillaSetToIssue, vanillaQuantityToIssue);
      await erc20Wrapper.approveTransfersAsync([setToken], transferProxy.address);

      rebalancingTokenToIssue = rebalancingToken.address;
      rebalancingQuantityToIssue = ether(1);
      await coreWrapper.issueSetTokenAsync(core, rebalancingTokenToIssue, rebalancingQuantityToIssue);

      const totalFees = rebalancingQuantityToIssue.mul(entranceFee).div(10000).round(0, 3);

      subjectCaller = ownerAccount;
      subjectQuantityToRedeem = rebalancingQuantityToIssue.sub(totalFees);
      subjectSetToRedeem = rebalancingToken.address;
    });

    async function subject(): Promise<string> {
      return core.redeem.sendTransactionAsync(
        subjectSetToRedeem,
        subjectQuantityToRedeem,
        { from: subjectCaller },
      );
    }

    it('increments the balances of the tokens back to the user in vault', async () => {
      const existingVaultBalance = await vault.balances.callAsync(setToken.address, ownerAccount);

      await subject();

      const requiredQuantityToRedeem = subjectQuantityToRedeem.div(rebalancingNaturalUnit).mul(initialShareRatio);
      const expectedVaultBalances = existingVaultBalance.add(requiredQuantityToRedeem);

      const newVaultBalances = await vault.balances.callAsync(setToken.address, ownerAccount);
      expect(newVaultBalances).to.be.bignumber.equal(expectedVaultBalances);
    });

    it('decrements the balance of the tokens owned by set in vault', async () => {
      const existingVaultBalance = await vault.balances.callAsync(setToken.address, rebalancingToken.address);

      await subject();

      const requiredQuantityToRedeem = subjectQuantityToRedeem.div(rebalancingNaturalUnit).mul(initialShareRatio);
      const expectedVaultBalances = existingVaultBalance.sub(requiredQuantityToRedeem);

      const newVaultBalances = await vault.balances.callAsync(setToken.address, rebalancingToken.address);
      expect(newVaultBalances).to.be.bignumber.equal(expectedVaultBalances);
    });

    it('decrements the balance of the set tokens owned by owner', async () => {
      const existingSetBalance = await rebalancingToken.balanceOf.callAsync(ownerAccount);

      await subject();

      const expectedSetBalance = existingSetBalance.sub(subjectQuantityToRedeem);
      const newSetBalance = await rebalancingToken.balanceOf.callAsync(ownerAccount);
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
  });

  describe('#redeemAndWithdraw', async () => {
    let subjectCaller: Address;
    let subjectQuantityToRedeem: BigNumber;
    let subjectSetToRedeem: Address;
    let subjectComponentsToExcludeMask: BigNumber;

    const naturalUnit: BigNumber = ether(2);
    const numComponents: number = 3;
    let components: StandardTokenMockContract[] = [];
    let componentAddresses: Address[];
    let componentUnits: BigNumber[];
    let setToken: SetTokenContract;

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(numComponents, ownerAccount);
      await erc20Wrapper.approveTransfersAsync(components, transferProxy.address);

      componentAddresses = _.map(components, token => token.address);
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
      subjectComponentsToExcludeMask = ZERO;
    });

    async function subject(): Promise<string> {
      return core.redeemAndWithdraw.sendTransactionAsync(
        subjectSetToRedeem,
        subjectQuantityToRedeem,
        subjectComponentsToExcludeMask,
        { from: subjectCaller },
      );
    }

    it('decrements the balance of the tokens owned by set in vault', async () => {
      const existingVaultBalances =
        await coreWrapper.getVaultBalancesForTokensForOwner(componentAddresses, vault, subjectSetToRedeem);

      await subject();

      const expectedVaultBalances = _.map(components, (component, idx) => {
        const requiredQuantityToRedeem = subjectQuantityToRedeem.div(naturalUnit).mul(componentUnits[idx]);
        return existingVaultBalances[idx].sub(requiredQuantityToRedeem);
      });
      const newVaultBalances =
        await coreWrapper.getVaultBalancesForTokensForOwner(componentAddresses, vault, subjectSetToRedeem);
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

    describe('when the exclude mask includes two of three components', async () => {
      const componentIndicesToExclude: number[] = [1, 2];

      beforeEach(async () => {
        subjectComponentsToExcludeMask = coreWrapper.maskForComponentsAtIndexes(componentIndicesToExclude);
      });

      it('transfers the first component back to the user', async () => {
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
        const remainingComponentAddresses = _.map(remainingComponents, token => token.address);
        const existingBalances =
          await coreWrapper.getVaultBalancesForTokensForOwner(remainingComponentAddresses, vault, subjectSetToRedeem);

        await subject();

        const expectedVaultBalances = _.map(remainingComponents, (component, idx) => {
          const requiredQuantityToRedeem = subjectQuantityToRedeem.div(naturalUnit).mul(componentUnits[idx]);
          return existingBalances[idx].sub(requiredQuantityToRedeem);
        });
        const newVaultBalances =
          await coreWrapper.getVaultBalancesForTokensForOwner(remainingComponentAddresses, vault, subjectSetToRedeem);
        expect(newVaultBalances).to.eql(expectedVaultBalances);
      });
    });

    describe('when the exclude mask includes all of the components', async () => {
      beforeEach(async () => {
        subjectComponentsToExcludeMask = coreWrapper.maskForAllComponents(numComponents);
      });

      it('increments the balances of the tokens back to the user in vault', async () => {
        const existingVaultBalances =
          await coreWrapper.getVaultBalancesForTokensForOwner(componentAddresses, vault, ownerAccount);

        await subject();

        const expectedVaultBalances = _.map(components, (component, idx) => {
          const requiredQuantityToRedeem = subjectQuantityToRedeem.div(naturalUnit).mul(componentUnits[idx]);
          return existingVaultBalances[idx].add(requiredQuantityToRedeem);
        });
        const newVaultBalances =
          await coreWrapper.getVaultBalancesForTokensForOwner(componentAddresses, vault, ownerAccount);
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

  describe('#redeemInVault', async () => {
    let subjectCaller: Address;
    let subjectQuantityToRedeem: BigNumber;
    let subjectSetToRedeem: Address;

    const naturalUnit: BigNumber = ether(2);
    const numComponents: number = 3;
    let components: StandardTokenMockContract[] = [];
    let componentAddresses: Address[];
    let componentUnits: BigNumber[];
    let setToken: SetTokenContract;

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(numComponents, ownerAccount);
      await erc20Wrapper.approveTransfersAsync(components, transferProxy.address);

      componentAddresses = _.map(components, token => token.address);
      componentUnits = _.map(components, () => naturalUnit.mul(2)); // Multiple of naturalUnit
      setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      await coreWrapper.issueSetTokenAsync(core, setToken.address, naturalUnit);
      await erc20Wrapper.approveTransferAsync(setToken, transferProxy.address);
      await coreWrapper.depositFromUser(core, setToken.address, naturalUnit);

      subjectCaller = ownerAccount;
      subjectQuantityToRedeem = naturalUnit;
      subjectSetToRedeem = setToken.address;
    });

    async function subject(): Promise<string> {
      return core.redeemInVault.sendTransactionAsync(
        subjectSetToRedeem,
        subjectQuantityToRedeem,
        { from: subjectCaller },
      );
    }

    it('decrements the balance of the tokens owned by set in vault', async () => {
      const existingVaultBalances =
        await coreWrapper.getVaultBalancesForTokensForOwner(componentAddresses, vault, subjectSetToRedeem);

      await subject();

      const expectedVaultBalances = _.map(components, (component, idx) => {
        const requiredQuantityToRedeem = subjectQuantityToRedeem.div(naturalUnit).mul(componentUnits[idx]);
        return existingVaultBalances[idx].sub(requiredQuantityToRedeem);
      });
      const newVaultBalances =
        await coreWrapper.getVaultBalancesForTokensForOwner(componentAddresses, vault, subjectSetToRedeem);
      expect(newVaultBalances).to.eql(expectedVaultBalances);
    });

    it('decrements the balance of the set owned by the owner in vault', async () => {
      const existingVaultBalance = await vault.getOwnerBalance.callAsync(
        setToken.address,
        subjectCaller
      );

      await subject();

      const expectedVaultBalance = existingVaultBalance.sub(subjectQuantityToRedeem);
      const newVaultBalance = await vault.getOwnerBalance.callAsync(
        setToken.address,
        subjectCaller
      );
      expect(newVaultBalance).to.eql(expectedVaultBalance);
    });

    it('decrements the balance of the set tokens held by the vault', async () => {
      const existingSetBalance = await setToken.balanceOf.callAsync(vault.address);

      await subject();

      const expectedSetBalance = existingSetBalance.sub(subjectQuantityToRedeem);
      const newSetBalance = await setToken.balanceOf.callAsync(vault.address);
      expect(newSetBalance).to.be.bignumber.equal(expectedSetBalance);
    });

    it('increments all of the component tokens to the user in the vault', async () => {
      const existingVaultBalances =
        await coreWrapper.getVaultBalancesForTokensForOwner(componentAddresses, vault, subjectCaller);

      await subject();

      const expectedVaultBalances = _.map(components, (component, idx) => {
        const requiredQuantityToRedeem = subjectQuantityToRedeem.div(naturalUnit).mul(componentUnits[idx]);
        return existingVaultBalances[idx].add(requiredQuantityToRedeem);
      });
      const newVaultBalances =
        await coreWrapper.getVaultBalancesForTokensForOwner(componentAddresses, vault, subjectCaller);
      expect(newVaultBalances).to.eql(expectedVaultBalances);
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

  describe('#redeemTo', async () => {
    let subjectCaller: Address;
    let subjectRecipient: Address;
    let subjectQuantityToRedeem: BigNumber;
    let subjectSetToRedeem: Address;

    const naturalUnit: BigNumber = ether(2);
    const numComponents: number = 3;
    let components: StandardTokenMockContract[] = [];
    let componentAddresses: Address[];
    let componentUnits: BigNumber[];
    let setToken: SetTokenContract;

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(numComponents, ownerAccount);
      await erc20Wrapper.approveTransfersAsync(components, transferProxy.address);

      componentAddresses = _.map(components, token => token.address);
      componentUnits = _.map(components, () => naturalUnit.mul(2)); // Multiple of naturalUnit
      setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      await coreWrapper.issueSetTokenAsync(core, setToken.address, naturalUnit);

      subjectRecipient = otherAccount;
      subjectQuantityToRedeem = naturalUnit;
      subjectSetToRedeem = setToken.address;
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return core.redeemTo.sendTransactionAsync(
        subjectRecipient,
        subjectSetToRedeem,
        subjectQuantityToRedeem,
        { from: subjectCaller },
      );
    }

    it('decrements the balance of the tokens owned by set in vault', async () => {
      const existingVaultBalances =
        await coreWrapper.getVaultBalancesForTokensForOwner(componentAddresses, vault, subjectSetToRedeem);

      await subject();

      const expectedVaultBalances = _.map(components, (component, idx) => {
        const requiredQuantityToRedeem = subjectQuantityToRedeem.div(naturalUnit).mul(componentUnits[idx]);
        return existingVaultBalances[idx].sub(requiredQuantityToRedeem);
      });
      const newVaultBalances =
        await coreWrapper.getVaultBalancesForTokensForOwner(componentAddresses, vault, subjectSetToRedeem);
      expect(newVaultBalances).to.eql(expectedVaultBalances);
    });

    it('decrements the balance of the set owned by the owner', async () => {
      const existingBalance = await setToken.balanceOf.callAsync(subjectCaller);

      await subject();

      const expectedBalance = existingBalance.sub(subjectQuantityToRedeem);
      const newVaultBalance = await setToken.balanceOf.callAsync(subjectCaller);
      expect(newVaultBalance).to.eql(expectedBalance);
    });

    it('increments all of the component tokens to the recipient in the vault', async () => {
      const existingVaultBalances =
        await coreWrapper.getVaultBalancesForTokensForOwner(componentAddresses, vault, subjectRecipient);

      await subject();

      const expectedVaultBalances = _.map(components, (component, idx) => {
        const requiredQuantityToRedeem = subjectQuantityToRedeem.div(naturalUnit).mul(componentUnits[idx]);
        return existingVaultBalances[idx].add(requiredQuantityToRedeem);
      });
      const newVaultBalances =
        await coreWrapper.getVaultBalancesForTokensForOwner(componentAddresses, vault, subjectRecipient);
      expect(newVaultBalances).to.eql(expectedVaultBalances);
    });
  });
});
