require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TokenFlushMockContract,
  TransferProxyContract,
  VaultContract,
  WethMockContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';
import { expectRevertError } from '@utils/tokenAssertions';
import {
  DEFAULT_GAS,
  DEFAULT_REBALANCING_NATURAL_UNIT,
  ONE_DAY_IN_SECONDS,
} from '@utils/constants';
import { ether } from '@utils/units';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { LibraryMockHelper } from '@utils/helpers/libraryMockHelper';
import { RebalancingHelper } from '@utils/helpers/rebalancingHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);
const Core = artifacts.require('Core');
const TokenFlushMock = artifacts.require('TokenFlushMock');

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
  const rebalancingHelper = new RebalancingHelper(
    ownerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );

  before(async () => {
    ABIDecoder.addABI(Core.abi);
    ABIDecoder.addABI(TokenFlushMock.abi);

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
    ABIDecoder.removeABI(Core.abi);
    ABIDecoder.removeABI(TokenFlushMock.abi);
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
    let subjectKeepChangeInVault: boolean;

    let baseSetComponent: StandardTokenMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let baseSetComponentUnit: BigNumber;

    let issueQuantity: BigNumber;

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

      issueQuantity = ether(1);

      subjectSetAddress = baseSetToken.address;

      await core.issueTo.sendTransactionAsync(
        tokenFlushMock.address,
        baseSetToken.address,
        issueQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS }
      );

      subjectKeepChangeInVault = true;
    });

    async function subject(): Promise<string> {
      return tokenFlushMock.returnExcessBaseSetFromContractMock.sendTransactionAsync(
        subjectSetAddress,
        subjectCaller,
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
    let subjectKeepChangeInVault: boolean;

    let baseSetComponent: StandardTokenMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let baseSetComponentUnit: BigNumber;

    let issueQuantity: BigNumber;

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

      issueQuantity = ether(1);

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
    });

    async function subject(): Promise<string> {
      return tokenFlushMock.returnExcessBaseSetInVaultMock.sendTransactionAsync(
        subjectSetAddress,
        subjectCaller,
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
});