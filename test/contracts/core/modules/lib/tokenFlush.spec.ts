require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  RebalancingSetTokenFactoryContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TokenFlushMockContract,
  TransferProxyContract,
  VaultContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';
import {
  DEFAULT_GAS,
  ZERO,
} from '@utils/constants';
import { ether } from '@utils/units';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { LibraryMockHelper } from '@utils/helpers/libraryMockHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('TokenFlush', accounts => {
  const [
    ownerAccount,
    functionCaller,
    whitelist,
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let rebalancingSetTokenFactory: RebalancingSetTokenFactoryContract;
  let setTokenFactory: SetTokenFactoryContract;
  let tokenFlushMock: TokenFlushMockContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const erc20Helper = new ERC20Helper(ownerAccount);
  const libraryHelper = new LibraryMockHelper(ownerAccount);

  before(async () => {
    ABIDecoder.addABI(CoreContract.getAbi());
    ABIDecoder.addABI(TokenFlushMockContract.getAbi());

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    core = await coreHelper.deployCoreAsync(transferProxy, vault);

    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(core.address);

    await coreHelper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

    rebalancingSetTokenFactory = await coreHelper.deployRebalancingSetTokenFactoryAsync(core.address, whitelist);
    await coreHelper.addFactoryAsync(core, rebalancingSetTokenFactory);

    tokenFlushMock = await libraryHelper.deployTokenFlushMockAsync(
      core,
      vault,
      transferProxy,
    );
    await coreHelper.addModuleAsync(core, tokenFlushMock.address);

  });

  after(async () => {
    ABIDecoder.removeABI(CoreContract.getAbi());
    ABIDecoder.removeABI(TokenFlushMockContract.getAbi());
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#returnExcessBaseSetFromContract', async () => {
    let subjectCaller: Address;
    let subjectSetAddress: Address;
    let subjectReturnAddress: Address;
    let subjectKeepChangeInVault: boolean;

    let baseSetComponent: StandardTokenMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let baseSetComponentUnit: BigNumber;

    let issueQuantity: BigNumber;
    let customIssueQuantity: BigNumber;

    beforeEach(async () => {
      subjectCaller = functionCaller;

      baseSetComponent = await erc20Helper.deployTokenAsync(subjectCaller);
      await erc20Helper.approveTransferAsync(baseSetComponent, transferProxy.address, subjectCaller);

      // Create the Set
      const componentAddresses = [baseSetComponent.address];
      baseSetComponentUnit = ether(1);
      const componentUnits = [baseSetComponentUnit];
      baseSetNaturalUnit = ether(1);
      baseSetToken = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        baseSetNaturalUnit,
      );

      issueQuantity = customIssueQuantity || ether(1);

      subjectSetAddress = baseSetToken.address;

      await core.issueTo.sendTransactionAsync(
        tokenFlushMock.address,
        baseSetToken.address,
        issueQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS }
      );

      subjectKeepChangeInVault = true;
      subjectReturnAddress = subjectCaller;
    });

    after(async () => {
      customIssueQuantity = undefined;
    });

    async function subject(): Promise<string> {
      return tokenFlushMock.returnExcessBaseSetFromContractMock.sendTransactionAsync(
        subjectSetAddress,
        subjectReturnAddress,
        subjectKeepChangeInVault,
        {
          from: subjectCaller,
          gas: DEFAULT_GAS,
        },
      );
    }

    it('sends the correct quantity to the user in the Vault', async () => {
      await subject();

      const userVaultBalance = await vault.getOwnerBalance.callAsync(subjectSetAddress, subjectCaller);

      expect(userVaultBalance).to.bignumber.equal(issueQuantity);
    });

    describe('when the issue value is 0', async () => {
      before(async () => {
        customIssueQuantity = ZERO;
      });

      it('should not change the users balance', async () => {
        await subject();

        const [userBalance] = await erc20Helper.getTokenBalances([baseSetToken], subjectCaller);

        expect(userBalance).to.bignumber.equal(issueQuantity);
      });
    });

    describe('when the keepChangeInVault flag is false', async () => {
      beforeEach(async () => {
        subjectKeepChangeInVault = false;
      });

      it('should send the Set to the user', async () => {
        await subject();

        const [userBalance] = await erc20Helper.getTokenBalances([baseSetToken], subjectCaller);

        expect(userBalance).to.bignumber.equal(issueQuantity);
      });
    });
  });

  describe('#returnExcessBaseSetInVault', async () => {
    let subjectCaller: Address;
    let subjectSetAddress: Address;
    let subjectReturnAddress: Address;
    let subjectKeepChangeInVault: boolean;

    let baseSetComponent: StandardTokenMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let baseSetComponentUnit: BigNumber;

    let issueQuantity: BigNumber;
    let customIssueQuantity: BigNumber;

    beforeEach(async () => {
      subjectCaller = functionCaller;

      baseSetComponent = await erc20Helper.deployTokenAsync(subjectCaller);
      await erc20Helper.approveTransferAsync(baseSetComponent, transferProxy.address, subjectCaller);

      // Create the Set
      const componentAddresses = [baseSetComponent.address];
      baseSetComponentUnit = ether(1);
      const componentUnits = [baseSetComponentUnit];
      baseSetNaturalUnit = ether(1);
      baseSetToken = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        baseSetNaturalUnit,
      );

      issueQuantity = customIssueQuantity || ether(1);

      subjectSetAddress = baseSetToken.address;

      await core.issueInVault.sendTransactionAsync(
        baseSetToken.address,
        issueQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS }
      );

      await core.internalTransfer.sendTransactionAsync(
        baseSetToken.address,
        tokenFlushMock.address,
        issueQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS }
      );

      subjectKeepChangeInVault = true;
      subjectReturnAddress = subjectCaller;
    });

    after(async () => {
      customIssueQuantity = undefined;
    });

    async function subject(): Promise<string> {
      return tokenFlushMock.returnExcessBaseSetInVaultMock.sendTransactionAsync(
        subjectSetAddress,
        subjectReturnAddress,
        subjectKeepChangeInVault,
        {
          from: subjectCaller,
          gas: DEFAULT_GAS,
        },
      );
    }

    it('sends the correct quantity to the user in the Vault', async () => {
      await subject();

      const userVaultBalance = await vault.getOwnerBalance.callAsync(subjectSetAddress, subjectCaller);

      expect(userVaultBalance).to.bignumber.equal(issueQuantity);
    });

    describe('when the issue value is 0', async () => {
      before(async () => {
        customIssueQuantity = ZERO;
      });

      after(async () => {
        customIssueQuantity = undefined;
      });

      it('should not change the users balance', async () => {
        await subject();

        const [userBalance] = await erc20Helper.getTokenBalances([baseSetToken], subjectCaller);

        expect(userBalance).to.bignumber.equal(issueQuantity);
      });
    });

    describe('when the keepChangeInVault flag is false', async () => {
      beforeEach(async () => {
        subjectKeepChangeInVault = false;
      });

      it('should send the Set to the user', async () => {
        await subject();

        const [userBalance] = await erc20Helper.getTokenBalances([baseSetToken], subjectCaller);

        expect(userBalance).to.bignumber.equal(issueQuantity);
      });
    });
  });

  describe('#returnExcessComponentsFromContract', async () => {
    let subjectCaller: Address;
    let subjectSetAddress: Address;
    let subjectReturnAddress: Address;

    let returnQuantity: BigNumber;

    let baseSetComponent: StandardTokenMockContract;
    let baseSetComponent2: StandardTokenMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let baseSetComponentUnit: BigNumber;

    beforeEach(async () => {
      subjectCaller = functionCaller;

      baseSetComponent = await erc20Helper.deployTokenAsync(ownerAccount);
      baseSetComponent2 = await erc20Helper.deployTokenAsync(ownerAccount);

      // Create the Set
      const componentAddresses = [baseSetComponent.address, baseSetComponent2.address];
      baseSetComponentUnit = ether(1);
      const componentUnits = [baseSetComponentUnit, ether(1)];
      baseSetNaturalUnit = ether(1);
      baseSetToken = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        baseSetNaturalUnit,
      );

      returnQuantity = ether(1);

      // Send base component to contract
      await erc20Helper.transferTokensAsync(
        [baseSetComponent, baseSetComponent2],
        tokenFlushMock.address,
        returnQuantity,
        ownerAccount,
      );

      subjectSetAddress = baseSetToken.address;
      subjectReturnAddress = subjectCaller;
    });

    async function subject(): Promise<string> {
      return tokenFlushMock.returnExcessComponentsFromContractMock.sendTransactionAsync(
        subjectSetAddress,
        subjectReturnAddress,
        {
          from: subjectCaller,
          gas: DEFAULT_GAS,
        },
      );
    }

    it('returns the correct quantity of component 1 to the user', async () => {
      await subject();

      const userComponent1Balance = await baseSetComponent.balanceOf.callAsync(subjectReturnAddress);

      expect(userComponent1Balance).to.bignumber.equal(returnQuantity);
    });

    it('returns the correct quantity of component 2 to the user', async () => {
      await subject();

      const userComponent2Balance = await baseSetComponent2.balanceOf.callAsync(subjectReturnAddress);

      expect(userComponent2Balance).to.bignumber.equal(returnQuantity);
    });
  });

  describe('#returnExcessComponentsFromVault', async () => {
    let subjectCaller: Address;
    let subjectSetAddress: Address;
    let subjectReturnAddress: Address;

    let returnQuantity: BigNumber;

    let baseSetComponent: StandardTokenMockContract;
    let baseSetComponent2: StandardTokenMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let baseSetComponentUnit: BigNumber;

    beforeEach(async () => {
      subjectCaller = functionCaller;

      baseSetComponent = await erc20Helper.deployTokenAsync(ownerAccount);
      baseSetComponent2 = await erc20Helper.deployTokenAsync(ownerAccount);
      await erc20Helper.approveTransferAsync(baseSetComponent, transferProxy.address, ownerAccount);
      await erc20Helper.approveTransferAsync(baseSetComponent2, transferProxy.address, ownerAccount);

      // Create the Set
      const componentAddresses = [baseSetComponent.address, baseSetComponent2.address];
      baseSetComponentUnit = ether(1);
      const componentUnits = [baseSetComponentUnit, ether(1)];
      baseSetNaturalUnit = ether(1);
      baseSetToken = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        baseSetNaturalUnit,
      );

      returnQuantity = ether(1);

      // Send base component to contract
      await coreHelper.depositTo(
        core,
        tokenFlushMock.address,
        baseSetComponent.address,
        returnQuantity,
        ownerAccount,
      );

      await coreHelper.depositTo(
        core,
        tokenFlushMock.address,
        baseSetComponent2.address,
        returnQuantity,
        ownerAccount,
      );

      subjectSetAddress = baseSetToken.address;
      subjectReturnAddress = subjectCaller;
    });

    async function subject(): Promise<string> {
      return tokenFlushMock.returnExcessComponentsFromVaultMock.sendTransactionAsync(
        subjectSetAddress,
        subjectReturnAddress,
        {
          from: subjectCaller,
          gas: DEFAULT_GAS,
        },
      );
    }

    it('returns the correct quantity of component 1 to the user', async () => {
      await subject();

      const userComponent1Balance = await baseSetComponent.balanceOf.callAsync(subjectReturnAddress);

      expect(userComponent1Balance).to.bignumber.equal(returnQuantity);
    });

    it('returns the correct quantity of component 2 to the user', async () => {
      await subject();

      const userComponent2Balance = await baseSetComponent2.balanceOf.callAsync(subjectReturnAddress);

      expect(userComponent2Balance).to.bignumber.equal(returnQuantity);
    });
  });
});