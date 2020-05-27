require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  RebalancingSetIssuanceMockContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
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

contract('RebalancingSetIssuance', accounts => {
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
  let rebalancingTokenIssuanceMock: RebalancingSetIssuanceMockContract;

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
    ABIDecoder.addABI(CoreContract.getAbi());
    ABIDecoder.addABI(RebalancingSetIssuanceMockContract.getAbi());

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    core = await coreHelper.deployCoreAsync(transferProxy, vault);

    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(core.address);

    await coreHelper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

    rebalancingSetTokenFactory = await coreHelper.deployRebalancingSetTokenFactoryAsync(core.address, whitelist);
    await coreHelper.addFactoryAsync(core, rebalancingSetTokenFactory);

    rebalancingTokenIssuanceMock = await libraryHelper.deployRebalancingSetIssuanceMockAsync(
      core,
      vault,
    );
    await coreHelper.addModuleAsync(core, rebalancingTokenIssuanceMock.address);

  });

  after(async () => {
    ABIDecoder.removeABI(CoreContract.getAbi());
    ABIDecoder.removeABI(RebalancingSetIssuanceMockContract.getAbi());
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#validateWETHIsAComponentOfSet', async () => {
    let subjectCaller: Address;
    let subjectSetAddress: Address;
    let subjectWrappedEtherAddress: Address;

    let baseSetComponent: StandardTokenMockContract;
    let wethComponent: WethMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let baseSetComponentUnit: BigNumber;

    beforeEach(async () => {
      subjectCaller = functionCaller;

      baseSetComponent = await erc20Helper.deployTokenAsync(subjectCaller);
      await erc20Helper.approveTransferAsync(baseSetComponent, transferProxy.address, subjectCaller);

      wethComponent = await erc20Helper.deployWrappedEtherAsync(subjectCaller);
      await erc20Helper.approveTransferAsync(wethComponent, transferProxy.address, subjectCaller);

      // Create the Set (2 component)
      const componentAddresses = [baseSetComponent.address, wethComponent.address];
      baseSetComponentUnit = ether(1);
      const componentUnits = [baseSetComponentUnit, baseSetComponentUnit];
      baseSetNaturalUnit = ether(1);
      baseSetToken = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        baseSetNaturalUnit,
      );

      subjectSetAddress = baseSetToken.address;
      subjectWrappedEtherAddress = wethComponent.address;
    });

    async function subject(): Promise<string> {
      return rebalancingTokenIssuanceMock.validateWETHIsAComponentOfSetMock.sendTransactionAsync(
        subjectSetAddress,
        subjectWrappedEtherAddress,
        {
          from: subjectCaller,
          gas: DEFAULT_GAS,
        },
      );
    }

    it('should not revert', async () => {
      await subject();
    });

    describe('when the components do not contain wrapped Ether', async () => {
      beforeEach(async () => {
        subjectWrappedEtherAddress = ownerAccount;
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#validateRebalancingSetIssuance', async () => {
    let subjectCaller: Address;
    let subjectRebalancingSetAddress: Address;
    let subjectRebalancingSetQuantity: BigNumber;

    let baseSetComponent: StandardTokenMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let baseSetComponentUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    beforeEach(async () => {
      subjectCaller = functionCaller;

      baseSetComponent = await erc20Helper.deployTokenAsync(subjectCaller);
      await erc20Helper.approveTransferAsync(baseSetComponent, transferProxy.address, subjectCaller);

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

      // Create the Rebalancing Set
      rebalancingUnitShares = ether(1);
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        core,
        rebalancingSetTokenFactory.address,
        ownerAccount,
        baseSetToken.address,
        ONE_DAY_IN_SECONDS,
        rebalancingUnitShares,
      );

      subjectRebalancingSetAddress = rebalancingSetToken.address;

      subjectRebalancingSetQuantity = new BigNumber(10 ** 7);
    });

    async function subject(): Promise<string> {
      return rebalancingTokenIssuanceMock.validateRebalancingSetIssuanceMock.sendTransactionAsync(
        subjectRebalancingSetAddress,
        subjectRebalancingSetQuantity,
        {
          from: subjectCaller,
          gas: DEFAULT_GAS,
        },
      );
    }

    it('should not revert', async () => {
      await subject();
    });

    describe('when the Rebalancing Set is not a valid Set', async () => {
      beforeEach(async () => {
        subjectRebalancingSetAddress = ownerAccount;
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the issuance quantity is not a multiple of the natural unit', async () => {
      beforeEach(async () => {
        subjectRebalancingSetQuantity = new BigNumber(10 ** 7).plus(1);
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#validateRebalancingSetIssuance', async () => {
    let subjectCaller: Address;
    let subjectRebalancingSetAddress: Address;
    let subjectRebalancingSetQuantity: BigNumber;

    let baseSetComponent: StandardTokenMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let baseSetComponentUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    beforeEach(async () => {
      subjectCaller = functionCaller;

      baseSetComponent = await erc20Helper.deployTokenAsync(subjectCaller);
      await erc20Helper.approveTransferAsync(baseSetComponent, transferProxy.address, subjectCaller);

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

      // Create the Rebalancing Set
      rebalancingUnitShares = ether(1).div(10);
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        core,
        rebalancingSetTokenFactory.address,
        ownerAccount,
        baseSetToken.address,
        ONE_DAY_IN_SECONDS,
        rebalancingUnitShares,
      );

      subjectRebalancingSetAddress = rebalancingSetToken.address;

      subjectRebalancingSetQuantity = new BigNumber(10 ** 7);
    });

    async function subject(): Promise<BigNumber> {
      return rebalancingTokenIssuanceMock.getBaseSetIssuanceRequiredQuantityMock.callAsync(
        subjectRebalancingSetAddress,
        subjectRebalancingSetQuantity,
        {
          from: subjectCaller,
          gas: DEFAULT_GAS,
        },
      );
    }

    it('should return the correct base SetToken value', async () => {
      const requiredBaseSetQuantity = await subject();

      const expectedBaseSetQuantity = subjectRebalancingSetQuantity
                                        .mul(rebalancingUnitShares)
                                        .div(DEFAULT_REBALANCING_NATURAL_UNIT);

      expect(requiredBaseSetQuantity).to.bignumber.equal(expectedBaseSetQuantity);
    });

    describe('when the implied base Set quantity is not a multiple of the base Set natural unit', async () => {
      beforeEach(async () => {
        subjectRebalancingSetQuantity = new BigNumber(1.5).mul(10 ** 6);
      });

      it('should return the correct rounded up base SetToken value', async () => {
        const receivedQuantity = await subject();

        const requireBaseSetQuantity = subjectRebalancingSetQuantity
                                          .mul(rebalancingUnitShares)
                                          .div(DEFAULT_REBALANCING_NATURAL_UNIT);

        const baseSetModulo = requireBaseSetQuantity.mod(baseSetNaturalUnit);

        const expectedBaseSetQuantity = requireBaseSetQuantity.sub(baseSetModulo).plus(baseSetNaturalUnit);

        expect(receivedQuantity).to.bignumber.equal(expectedBaseSetQuantity);
      });
    });
  });

  describe('#getBaseSetRedeemQuantity', async () => {
    let subjectCaller: Address;
    let subjectSetAddress: Address;

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
        rebalancingTokenIssuanceMock.address,
        issueQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS }
      );
    });

    async function subject(): Promise<BigNumber> {
      return rebalancingTokenIssuanceMock.getBaseSetRedeemQuantityMock.callAsync(
        subjectSetAddress,
        {
          from: subjectCaller,
          gas: DEFAULT_GAS,
        },
      );
    }

    it('should calculate the correct redeem quantity', async () => {
      const redeemQuantity = await subject();

      const expectedRedeemQuantity = issueQuantity.div(baseSetNaturalUnit).mul(baseSetNaturalUnit);

      expect(redeemQuantity).to.bignumber.equal(expectedRedeemQuantity);
    });

    describe('when the redeem quantity needs to be rounded down', async () => {
      beforeEach(async () => {
        await core.issueInVault.sendTransactionAsync(
          baseSetToken.address,
          issueQuantity,
          { from: subjectCaller, gas: DEFAULT_GAS }
        );

        // Transfer half a natural units worth
        await core.internalTransfer.sendTransactionAsync(
          baseSetToken.address,
          rebalancingTokenIssuanceMock.address,
          issueQuantity.div(2),
          { from: subjectCaller, gas: DEFAULT_GAS }
        );
      });

      it('should calculate the correct redeem quantity by rounding to the natural unit', async () => {
        const redeemQuantity = await subject();

        const expectedRedeemQuantity = issueQuantity.div(baseSetNaturalUnit).mul(baseSetNaturalUnit);

        expect(redeemQuantity).to.bignumber.equal(expectedRedeemQuantity);
      });
    });
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
        rebalancingTokenIssuanceMock.address,
        baseSetToken.address,
        issueQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS }
      );

      subjectKeepChangeInVault = true;
    });

    async function subject(): Promise<string> {
      return rebalancingTokenIssuanceMock.returnExcessBaseSetFromContractMock.sendTransactionAsync(
        subjectSetAddress,
        transferProxy.address,
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
        rebalancingTokenIssuanceMock.address,
        issueQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS }
      );

      subjectKeepChangeInVault = true;
    });

    async function subject(): Promise<string> {
      return rebalancingTokenIssuanceMock.returnExcessBaseSetInVaultMock.sendTransactionAsync(
        subjectSetAddress,
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