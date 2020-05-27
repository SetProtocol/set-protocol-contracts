require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  RebalancingSetIssuanceModuleContract,
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
import { getWeb3, getGasUsageInEth } from '@utils/web3Helper';
import { expectRevertError } from '@utils/tokenAssertions';
import {
  DEFAULT_GAS,
  DEFAULT_REBALANCING_NATURAL_UNIT,
  ONE_DAY_IN_SECONDS,
} from '@utils/constants';
import { ether } from '@utils/units';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { RebalancingHelper } from '@utils/helpers/rebalancingHelper';
import { LogRebalancingSetIssue, LogRebalancingSetRedeem } from '@utils/contract_logs/rebalancingSetIssuanceModule';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);

const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const { ZERO } = SetUtils.CONSTANTS;
const setTestUtils = new SetTestUtils(web3);

contract('RebalancingSetIssuanceModule', accounts => {
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
  let rebalancingTokenIssuanceModule: RebalancingSetIssuanceModuleContract;
  let wethMock: WethMockContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const erc20Helper = new ERC20Helper(ownerAccount);
  const rebalancingHelper = new RebalancingHelper(
    ownerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );

  before(async () => {
    ABIDecoder.addABI(CoreContract.getAbi());
    ABIDecoder.addABI(RebalancingSetIssuanceModuleContract.getAbi());

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    core = await coreHelper.deployCoreAsync(transferProxy, vault);
    wethMock = await erc20Helper.deployWrappedEtherAsync(ownerAccount);

    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(core.address);

    await coreHelper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

    rebalancingSetTokenFactory = await coreHelper.deployRebalancingSetTokenFactoryAsync(core.address, whitelist);
    await coreHelper.addFactoryAsync(core, rebalancingSetTokenFactory);

    rebalancingTokenIssuanceModule = await coreHelper.deployRebalancingSetIssuanceModuleAsync(
      core,
      vault,
      transferProxy,
      wethMock,
    );
    await coreHelper.addModuleAsync(core, rebalancingTokenIssuanceModule.address);
  });

  after(async () => {
    ABIDecoder.removeABI(CoreContract.getAbi());
    ABIDecoder.removeABI(RebalancingSetIssuanceModuleContract.getAbi());
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#issueRebalancingSet', async () => {
    let subjectCaller: Address;
    let subjectRebalancingSetAddress: Address;
    let subjectRebalancingSetQuantity: BigNumber;
    let subjectKeepChangeInVault: boolean;

    let baseSetComponent: StandardTokenMockContract;
    let baseSetComponent2: StandardTokenMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;
    let baseSetComponentUnit: BigNumber;
    let baseSetIssueQuantity: BigNumber;

    let customRebalancingUnitShares: BigNumber;
    let customRebalancingSetQuantity: BigNumber;

    beforeEach(async () => {
      subjectCaller = functionCaller;

      baseSetComponent = await erc20Helper.deployTokenAsync(subjectCaller);
      await erc20Helper.approveTransferAsync(baseSetComponent, transferProxy.address, subjectCaller);

      baseSetComponent2 = await erc20Helper.deployTokenAsync(subjectCaller);
      await erc20Helper.approveTransferAsync(baseSetComponent2, transferProxy.address, subjectCaller);

      // Create the Set (1 component)
      const componentAddresses = [baseSetComponent.address, baseSetComponent2.address];
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

      // Create the Rebalancing Set
      rebalancingUnitShares = customRebalancingUnitShares || ether(1);
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        core,
        rebalancingSetTokenFactory.address,
        ownerAccount,
        baseSetToken.address,
        ONE_DAY_IN_SECONDS,
        rebalancingUnitShares,
      );

      subjectRebalancingSetAddress = rebalancingSetToken.address;

      subjectRebalancingSetQuantity = customRebalancingSetQuantity || new BigNumber(10 ** 7);
      baseSetIssueQuantity =
        subjectRebalancingSetQuantity.mul(rebalancingUnitShares).div(DEFAULT_REBALANCING_NATURAL_UNIT);

      subjectKeepChangeInVault = false;
    });

    async function subject(): Promise<string> {
      return rebalancingTokenIssuanceModule.issueRebalancingSet.sendTransactionAsync(
        subjectRebalancingSetAddress,
        subjectRebalancingSetQuantity,
        subjectKeepChangeInVault,
        {
          from: subjectCaller,
          gas: DEFAULT_GAS,
        },
      );
    }

    it('issues the rebalancing Set', async () => {
      const previousRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      const expectedRBSetTokenBalance = previousRBSetTokenBalance.add(subjectRebalancingSetQuantity);

      await subject();

      const currentRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      expect(expectedRBSetTokenBalance).to.bignumber.equal(currentRBSetTokenBalance);
    });


    it('uses the correct amount of component tokens', async () => {
      const previousComponentBalance = await baseSetComponent.balanceOf.callAsync(subjectCaller);
      const expectedComponentUsed = baseSetIssueQuantity.mul(baseSetComponentUnit).div(baseSetNaturalUnit);

      const expectedComponentBalance = previousComponentBalance.sub(expectedComponentUsed);

      await subject();

      const componentBalance = await baseSetComponent.balanceOf.callAsync(subjectCaller);
      expect(expectedComponentBalance).to.bignumber.equal(componentBalance);
    });

    it('uses the correct amount of component 2 tokens', async () => {
      const previousComponentBalance = await baseSetComponent2.balanceOf.callAsync(subjectCaller);
      const expectedComponentUsed = baseSetIssueQuantity.mul(baseSetComponentUnit).div(baseSetNaturalUnit);

      const expectedComponentBalance = previousComponentBalance.sub(expectedComponentUsed);

      await subject();

      const componentBalance = await baseSetComponent2.balanceOf.callAsync(subjectCaller);
      expect(expectedComponentBalance).to.bignumber.equal(componentBalance);
    });

    it('emits correct LogRebalancingSetIssue event', async () => {
      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = LogRebalancingSetIssue(
        subjectRebalancingSetAddress,
        subjectCaller,
        subjectRebalancingSetQuantity,
        rebalancingTokenIssuanceModule.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the rebalancing Set address is not an approved Set', async () => {
      beforeEach(async () => {
        subjectRebalancingSetAddress = ownerAccount;
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the rebalancing Set quantity is not a multiple of the natural unit', async () => {
      beforeEach(async () => {
        subjectRebalancingSetQuantity = subjectRebalancingSetQuantity.sub(1);
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the rebalancing Set quantiy results in base Set change', async () => {
      before(async () => {
        customRebalancingSetQuantity = new BigNumber(1.5).mul(10 ** 7);
        customRebalancingUnitShares = new BigNumber(10 ** 17);
      });

      after(async () => {
        customRebalancingSetQuantity = undefined;
        customRebalancingUnitShares = undefined;
      });

      it('returns the correct quantity of base Set change', async () => {
        await subject();

        const baseSetChange = baseSetIssueQuantity.mod(baseSetNaturalUnit);

        const baseSetBalance = await baseSetToken.balanceOf.callAsync(subjectCaller);
        expect(baseSetBalance).to.bignumber.equal(baseSetChange);
      });

      describe('when keepChangeInVault is true', async () => {
        beforeEach(async () => {
          subjectKeepChangeInVault = true;
        });

        it('returns the correct quantity of base Set change in the Vault', async () => {
          await subject();

          const baseSetChange = baseSetIssueQuantity.mod(baseSetNaturalUnit);

          const baseSetBalance = await vault.getOwnerBalance.callAsync(
            baseSetToken.address,
            subjectCaller,
          );
          expect(baseSetBalance).to.bignumber.equal(baseSetChange);
        });
      });
    });
  });

  describe('#issueRebalancingSetWrappingEther', async () => {
    let subjectCaller: Address;
    let subjectRebalancingSetAddress: Address;
    let subjectRebalancingSetQuantity: BigNumber;
    let subjectKeepChangeInVault: boolean;
    let subjectWethQuantity: BigNumber;

    let baseSetWethComponent: WethMockContract;
    let baseSetComponent: StandardTokenMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;
    let baseSetComponentUnit: BigNumber;
    let baseSetIssueQuantity: BigNumber;

    let customBaseIssueQuantity: BigNumber;
    let customRebalancingUnitShares: BigNumber;
    let customRebalancingSetQuantity: BigNumber;
    let customWethMock: WethMockContract;

    beforeEach(async () => {
      subjectCaller = functionCaller;

      baseSetComponent = await erc20Helper.deployTokenAsync(subjectCaller);
      await erc20Helper.approveTransferAsync(baseSetComponent, transferProxy.address, subjectCaller);

      baseSetWethComponent = customWethMock || wethMock;
      await erc20Helper.approveTransferAsync(baseSetWethComponent, transferProxy.address, subjectCaller);

      // Create the Set (2 component)
      const componentAddresses = [baseSetWethComponent.address, baseSetComponent.address];
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

      // Create the Rebalancing Set
      rebalancingUnitShares = customRebalancingUnitShares || ether(1);
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        core,
        rebalancingSetTokenFactory.address,
        ownerAccount,
        baseSetToken.address,
        ONE_DAY_IN_SECONDS,
        rebalancingUnitShares,
      );

      subjectRebalancingSetAddress = rebalancingSetToken.address;

      subjectRebalancingSetQuantity = customRebalancingSetQuantity || new BigNumber(10 ** 7);
      baseSetIssueQuantity = customBaseIssueQuantity ||
        subjectRebalancingSetQuantity.mul(rebalancingUnitShares).div(DEFAULT_REBALANCING_NATURAL_UNIT);

      subjectWethQuantity = baseSetIssueQuantity.mul(baseSetComponentUnit).div(baseSetNaturalUnit);

      subjectKeepChangeInVault = false;
    });

    async function subject(): Promise<string> {
      return rebalancingTokenIssuanceModule.issueRebalancingSetWrappingEther.sendTransactionAsync(
        subjectRebalancingSetAddress,
        subjectRebalancingSetQuantity,
        subjectKeepChangeInVault,
        {
          from: subjectCaller,
          gas: DEFAULT_GAS,
          value: subjectWethQuantity.toNumber(),
        },
      );
    }

    it('issues the rebalancing Set', async () => {
      const previousRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      const expectedRBSetTokenBalance = previousRBSetTokenBalance.add(subjectRebalancingSetQuantity);

      await subject();

      const currentRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      expect(expectedRBSetTokenBalance).to.bignumber.equal(currentRBSetTokenBalance);
    });


    it('uses the correct amount of component tokens', async () => {
      const previousComponentBalance = await baseSetComponent.balanceOf.callAsync(subjectCaller);
      const expectedComponentUsed = baseSetIssueQuantity.mul(baseSetComponentUnit).div(baseSetNaturalUnit);

      const expectedComponentBalance = previousComponentBalance.sub(expectedComponentUsed);

      await subject();

      const componentBalance = await baseSetComponent.balanceOf.callAsync(subjectCaller);
      expect(expectedComponentBalance).to.bignumber.equal(componentBalance);
    });

    it('uses the correct amount of ETH from the caller', async () => {
      const previousEthBalance: BigNumber = new BigNumber(await web3.eth.getBalance(subjectCaller));

      const txHash = await subject();
      const totalGasInEth = await getGasUsageInEth(txHash);
      const expectedEthBalance = previousEthBalance
                                  .sub(subjectWethQuantity)
                                  .sub(totalGasInEth);

      const ethBalance = new BigNumber(await web3.eth.getBalance(subjectCaller));
      expect(ethBalance).to.bignumber.equal(expectedEthBalance);
    });

    it('emits correct LogRebalancingSetIssue event', async () => {
      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = LogRebalancingSetIssue(
        subjectRebalancingSetAddress,
        subjectCaller,
        subjectRebalancingSetQuantity,
        rebalancingTokenIssuanceModule.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the base SetToken components do not include wrapped Ether', async () => {
      before(async () => {
        customWethMock = await erc20Helper.deployWrappedEtherAsync(ownerAccount);
      });

      after(async () => {
        customWethMock = undefined;
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the rebalancing Set address is not an approved Set', async () => {
      beforeEach(async () => {
        subjectRebalancingSetAddress = ownerAccount;
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the rebalancing Set quantity is not a multiple of the natural unit', async () => {
      beforeEach(async () => {
        subjectRebalancingSetQuantity = subjectRebalancingSetQuantity.sub(1);
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the eth sent is more than required', async () => {
      const extraWeth = ether(1);

      beforeEach(async () => {
        subjectWethQuantity = subjectWethQuantity.add(extraWeth);
      });

      it('returns the change back to the user', async () => {
        const previousEthBalance: BigNumber = new BigNumber(await web3.eth.getBalance(subjectCaller));

        const txHash = await subject();
        const totalGasInEth = await getGasUsageInEth(txHash);
        const expectedEthBalance = previousEthBalance
                                    .sub(subjectWethQuantity)
                                    .add(extraWeth)
                                    .sub(totalGasInEth);

        const ethBalance = new BigNumber(await web3.eth.getBalance(subjectCaller));
        expect(ethBalance).to.bignumber.equal(expectedEthBalance);
      });
    });

    describe('when the eth sent is less than required', async () => {
      const extraWeth = new BigNumber(10 ** 6);

      beforeEach(async () => {
        subjectWethQuantity = subjectWethQuantity.sub(extraWeth);
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the rebalancing Set quantiy results in base Set change', async () => {
      before(async () => {
        customRebalancingSetQuantity = new BigNumber(1.5).mul(10 ** 7);
        customRebalancingUnitShares = new BigNumber(10 ** 17);
        customBaseIssueQuantity = ether(2);
      });

      after(async () => {
        customRebalancingSetQuantity = undefined;
        customRebalancingUnitShares = undefined;
        customBaseIssueQuantity = undefined;
      });

      it('returns the correct quantity of base Set change', async () => {
        await subject();

        const expectedBaseSetChange = new BigNumber(5).mul(10 ** 17);

        const baseSetBalance = await baseSetToken.balanceOf.callAsync(subjectCaller);
        expect(baseSetBalance).to.bignumber.equal(expectedBaseSetChange);
      });

      describe('when keepChangeInVault is true', async () => {
        beforeEach(async () => {
          subjectKeepChangeInVault = true;
        });

        it('returns the correct quantity of base Set change in the Vault', async () => {
          await subject();

          const expectedBaseSetChange = new BigNumber(5).mul(10 ** 17);

          const baseSetBalance = await vault.getOwnerBalance.callAsync(
            baseSetToken.address,
            subjectCaller,
          );
          expect(baseSetBalance).to.bignumber.equal(expectedBaseSetChange);
        });
      });
    });
  });

  describe('#redeemRebalancingSet', async () => {
    let subjectCaller: Address;
    let subjectRebalancingSetAddress: Address;
    let subjectRebalancingSetQuantity: BigNumber;
    let subjectKeepChangeInVault: boolean;

    let baseSetIssueQuantity: BigNumber;
    let baseSetComponentUnit: BigNumber;

    let baseSetComponent: StandardTokenMockContract;
    let baseSetComponent2: StandardTokenMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    let customBaseIssueQuantity: BigNumber;
    let customRebalancingUnitShares: BigNumber;
    let customRedeemQuantity: BigNumber;
    let customRebalancingSetIssueQuantity: BigNumber;
    let customBaseComponentUnit: BigNumber;

    beforeEach(async () => {
      subjectCaller = functionCaller;

      baseSetComponent = await erc20Helper.deployTokenAsync(ownerAccount);
      await erc20Helper.approveTransferAsync(baseSetComponent, transferProxy.address);

      baseSetComponent2 = await erc20Helper.deployTokenAsync(ownerAccount);
      await erc20Helper.approveTransferAsync(baseSetComponent2, transferProxy.address);

      // Create the Set (2 component)
      const componentAddresses = [baseSetComponent.address, baseSetComponent2.address];
      baseSetComponentUnit = customBaseComponentUnit || ether(1);
      const componentUnits = [baseSetComponentUnit, baseSetComponentUnit];
      baseSetNaturalUnit = ether(1);
      baseSetToken = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        baseSetNaturalUnit,
      );
      await erc20Helper.approveTransferAsync(baseSetToken, transferProxy.address);

      // Create the Rebalancing Set
      rebalancingUnitShares = customRebalancingUnitShares || ether(1);
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        core,
        rebalancingSetTokenFactory.address,
        ownerAccount,
        baseSetToken.address,
        ONE_DAY_IN_SECONDS,
        rebalancingUnitShares,
      );

      subjectRebalancingSetAddress = rebalancingSetToken.address;

      subjectRebalancingSetQuantity = customRedeemQuantity || new BigNumber(10 ** 7);
      baseSetIssueQuantity = customBaseIssueQuantity ||
        subjectRebalancingSetQuantity.mul(rebalancingUnitShares).div(DEFAULT_REBALANCING_NATURAL_UNIT);

      await coreHelper.issueSetTokenAsync(
        core,
        baseSetToken.address,
        baseSetIssueQuantity,
      );

      const rebalancingSetIssueQuantity = customRebalancingSetIssueQuantity || subjectRebalancingSetQuantity;

      // Issue the rebalancing Set Token
      await core.issueTo.sendTransactionAsync(
        functionCaller,
        rebalancingSetToken.address,
        rebalancingSetIssueQuantity,
      );

      subjectKeepChangeInVault = false;
    });

    async function subject(): Promise<string> {
      return rebalancingTokenIssuanceModule.redeemRebalancingSet.sendTransactionAsync(
        subjectRebalancingSetAddress,
        subjectRebalancingSetQuantity,
        subjectKeepChangeInVault,
        {
          from: subjectCaller,
          gas: DEFAULT_GAS,
        },
      );
    }

    afterEach(async () => {
      customRedeemQuantity = undefined;
      customRebalancingUnitShares = undefined;
      customBaseIssueQuantity = undefined;
      customRebalancingSetIssueQuantity = undefined;
      customBaseComponentUnit = undefined;
    });

    it('redeems the rebalancing Set', async () => {
      const previousRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      const expectedRBSetTokenBalance = previousRBSetTokenBalance.sub(subjectRebalancingSetQuantity);

      await subject();

      const currentRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      expect(expectedRBSetTokenBalance).to.bignumber.equal(currentRBSetTokenBalance);
    });

    it('redeems the base Set', async () => {
      await subject();

      const currentSaseSetTokenBalance = await baseSetToken.balanceOf.callAsync(subjectCaller);
      expect(currentSaseSetTokenBalance).to.bignumber.equal(ZERO);
    });

    it('attributes the base Set components to the caller', async () => {
      await subject();

      const expectedBaseComponentBalance = baseSetIssueQuantity.mul(baseSetComponentUnit).div(baseSetNaturalUnit);

      const baseSetComponentBalance = await baseSetComponent.balanceOf.callAsync(subjectCaller);
      expect(baseSetComponentBalance).to.bignumber.equal(expectedBaseComponentBalance);
    });

    it('attributes the base Set components 2 to the caller', async () => {
      await subject();

      const expectedBaseComponentBalance = baseSetIssueQuantity.mul(baseSetComponentUnit).div(baseSetNaturalUnit);

      const baseSetComponentBalance = await baseSetComponent2.balanceOf.callAsync(subjectCaller);
      expect(baseSetComponentBalance).to.bignumber.equal(expectedBaseComponentBalance);
    });

    it('emits correct LogRebalancingSetRedeem event', async () => {
      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = LogRebalancingSetRedeem(
        subjectRebalancingSetAddress,
        subjectCaller,
        subjectRebalancingSetQuantity,
        rebalancingTokenIssuanceModule.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the rebalancing Set address is not an approved Set', async () => {
      beforeEach(async () => {
        subjectRebalancingSetAddress = ownerAccount;
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the rebalancing Set quantity is not a multiple of the natural unit', async () => {
      beforeEach(async () => {
        subjectRebalancingSetQuantity = subjectRebalancingSetQuantity.sub(1);
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the redeem quantity results in excess base Set', async () => {
      describe('when keep change in vault is false', async () => {
        before(async () => {
          customRebalancingUnitShares  = new BigNumber(10 ** 17);
          customRedeemQuantity = new BigNumber(1.5).mul(10 ** 7);
          customBaseIssueQuantity = ether(2);
          customRebalancingSetIssueQuantity = new BigNumber(2).mul(10 ** 7);
        });

        after(async () => {
          customRebalancingUnitShares = undefined;
          customRedeemQuantity = undefined;
          customBaseIssueQuantity = undefined;
          customRebalancingSetIssueQuantity = undefined;
        });

        // It sends the change to the user
        it('sends the correct base set quantity to the user', async () => {
          await subject();

          const expectedBalance = customRedeemQuantity
                                    .mul(rebalancingUnitShares)
                                    .div(DEFAULT_REBALANCING_NATURAL_UNIT)
                                    .mod(baseSetNaturalUnit);

          const currentBaseSetBalance = await baseSetToken.balanceOf.callAsync(subjectCaller);
          expect(currentBaseSetBalance).to.bignumber.equal(expectedBalance);
        });
      });

      describe('when keep change in vault is true', async () => {
        before(async () => {
          customRebalancingUnitShares  = new BigNumber(10 ** 17);
          customRedeemQuantity = new BigNumber(1.5).mul(10 ** 7);
          customBaseIssueQuantity = ether(2);
          customRebalancingSetIssueQuantity = new BigNumber(2).mul(10 ** 7);
        });

        after(async () => {
          customRebalancingUnitShares = undefined;
          customRedeemQuantity = undefined;
          customBaseIssueQuantity = undefined;
          customRebalancingSetIssueQuantity = undefined;
        });

        beforeEach(async () => {
          subjectKeepChangeInVault = true;
        });

        it('sends the correct base set quantity to the user in the vault', async () => {
          await subject();

          const expectedBalance = customRedeemQuantity
                                  .mul(rebalancingUnitShares)
                                  .div(DEFAULT_REBALANCING_NATURAL_UNIT)
                                  .mod(baseSetNaturalUnit);
          const currentBaseSetBalance = await vault.getOwnerBalance.callAsync(
            baseSetToken.address,
            subjectCaller,
          );
          expect(currentBaseSetBalance).to.bignumber.equal(expectedBalance);
        });
      });
    });
  });

  describe('#redeemRebalancingSetUnwrappingEther', async () => {
    let subjectCaller: Address;
    let subjectRebalancingSetAddress: Address;
    let subjectRebalancingSetQuantity: BigNumber;
    let subjectKeepChangeInVault: boolean;

    let baseSetIssueQuantity: BigNumber;
    let baseSetComponentUnit: BigNumber;

    let baseSetWethComponent: WethMockContract;
    let baseSetComponent: StandardTokenMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    let customBaseIssueQuantity: BigNumber;
    let customRebalancingUnitShares: BigNumber;
    let customRedeemQuantity: BigNumber;
    let customRebalancingSetIssueQuantity: BigNumber;
    let customWethMock: WethMockContract;

    let wethRequiredToMintSet: BigNumber;
    let baseComponentQuantity: BigNumber;

    beforeEach(async () => {
      subjectCaller = functionCaller;

      baseSetWethComponent = customWethMock || wethMock;
      await erc20Helper.approveTransferAsync(baseSetWethComponent, transferProxy.address);

      baseSetComponent = await erc20Helper.deployTokenAsync(ownerAccount);
      await erc20Helper.approveTransferAsync(baseSetComponent, transferProxy.address);

      // Create the Set (2 component)
      const componentAddresses = [baseSetWethComponent.address, baseSetComponent.address];
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
      await erc20Helper.approveTransferAsync(baseSetToken, transferProxy.address);

      // Create the Rebalancing Set
      rebalancingUnitShares = customRebalancingUnitShares || ether(1);
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        core,
        rebalancingSetTokenFactory.address,
        ownerAccount,
        baseSetToken.address,
        ONE_DAY_IN_SECONDS,
        rebalancingUnitShares,
      );

      subjectRebalancingSetAddress = rebalancingSetToken.address;

      subjectRebalancingSetQuantity = customRedeemQuantity || new BigNumber(10 ** 7);
      baseSetIssueQuantity = customBaseIssueQuantity ||
        subjectRebalancingSetQuantity.mul(rebalancingUnitShares).div(DEFAULT_REBALANCING_NATURAL_UNIT);

      baseComponentQuantity = baseSetIssueQuantity.mul(baseSetComponentUnit).div(baseSetNaturalUnit);

      // Wrap WETH
      wethRequiredToMintSet = baseSetIssueQuantity.mul(baseSetComponentUnit).div(baseSetNaturalUnit);
      await wethMock.deposit.sendTransactionAsync(
        { from: ownerAccount, gas: DEFAULT_GAS, value: wethRequiredToMintSet.toString() }
      );

      await coreHelper.issueSetTokenAsync(
        core,
        baseSetToken.address,
        baseSetIssueQuantity,
      );

      const rebalancingSetIssueQuantity = customRebalancingSetIssueQuantity || subjectRebalancingSetQuantity;

      // Issue the rebalancing Set Token
      await core.issueTo.sendTransactionAsync(
        functionCaller,
        rebalancingSetToken.address,
        rebalancingSetIssueQuantity,
      );

      subjectKeepChangeInVault = false;
    });

    async function subject(): Promise<string> {
      return rebalancingTokenIssuanceModule.redeemRebalancingSetUnwrappingEther.sendTransactionAsync(
        subjectRebalancingSetAddress,
        subjectRebalancingSetQuantity,
        subjectKeepChangeInVault,
        {
          from: subjectCaller,
          gas: DEFAULT_GAS,
        },
      );
    }

    afterEach(async () => {
      customRebalancingUnitShares = undefined;
      customBaseIssueQuantity = undefined;
      customRedeemQuantity = undefined;
      customRebalancingSetIssueQuantity = undefined;
    });

    it('redeems the rebalancing Set', async () => {
      const previousRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      const expectedRBSetTokenBalance = previousRBSetTokenBalance.sub(subjectRebalancingSetQuantity);

      await subject();

      const currentRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      expect(expectedRBSetTokenBalance).to.bignumber.equal(currentRBSetTokenBalance);
    });

    it('redeems the base Set', async () => {
      await subject();

      const currentSaseSetTokenBalance = await baseSetToken.balanceOf.callAsync(subjectCaller);
      expect(currentSaseSetTokenBalance).to.bignumber.equal(ZERO);
    });

    it('attributes the correct amount of ETH to the caller', async () => {
      const previousEthBalance: BigNumber = new BigNumber(await web3.eth.getBalance(subjectCaller));

      const txHash = await subject();
      const totalGasInEth = await getGasUsageInEth(txHash);
      const expectedEthBalance = previousEthBalance
                                  .add(wethRequiredToMintSet)
                                  .sub(totalGasInEth);

      const ethBalance = new BigNumber(await web3.eth.getBalance(subjectCaller));
      expect(ethBalance).to.bignumber.equal(expectedEthBalance);
    });

    it('attributes the base Set component to the caller', async () => {
      await subject();

      const baseSetComponentBalance = await baseSetComponent.balanceOf.callAsync(subjectCaller);
      expect(baseSetComponentBalance).to.bignumber.equal(baseComponentQuantity);
    });

    it('emits correct LogRebalancingSetRedeem event', async () => {
      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = LogRebalancingSetRedeem(
        subjectRebalancingSetAddress,
        subjectCaller,
        subjectRebalancingSetQuantity,
        rebalancingTokenIssuanceModule.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the base SetToken components do not include wrapped Ether', async () => {
      before(async () => {
        customWethMock = await erc20Helper.deployWrappedEtherAsync(ownerAccount);
      });

      after(async () => {
        customWethMock = undefined;
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the rebalancing Set address is not an approved Set', async () => {
      beforeEach(async () => {
        subjectRebalancingSetAddress = ownerAccount;
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the rebalancing Set quantity is not a multiple of the natural unit', async () => {
      beforeEach(async () => {
        subjectRebalancingSetQuantity = subjectRebalancingSetQuantity.sub(1);
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the redeem quantity results in excess base Set', async () => {
      describe('when keep change in vault is false', async () => {
        before(async () => {
          customRebalancingUnitShares  = new BigNumber(10 ** 17);
          customRedeemQuantity = new BigNumber(1.5).mul(10 ** 7);
          customBaseIssueQuantity = ether(2);
          customRebalancingSetIssueQuantity = new BigNumber(2).mul(10 ** 7);
        });

        after(async () => {
          customRebalancingUnitShares = undefined;
          customRedeemQuantity = undefined;
          customBaseIssueQuantity = undefined;
          customRebalancingSetIssueQuantity = undefined;
        });

        // It sends the change to the user
        it('sends the correct base set quantity to the user', async () => {
          await subject();

          const expectedBalance = customRedeemQuantity
                                    .mul(rebalancingUnitShares)
                                    .div(DEFAULT_REBALANCING_NATURAL_UNIT)
                                    .mod(baseSetNaturalUnit);

          const currentBaseSetBalance = await baseSetToken.balanceOf.callAsync(subjectCaller);
          expect(currentBaseSetBalance).to.bignumber.equal(expectedBalance);
        });
      });

      describe('when keep change in vault is true', async () => {
        before(async () => {
          customRebalancingUnitShares  = new BigNumber(10 ** 17);
          customRedeemQuantity = new BigNumber(1.5).mul(10 ** 7);
          customBaseIssueQuantity = ether(2);
          customRebalancingSetIssueQuantity = new BigNumber(2).mul(10 ** 7);
        });

        after(async () => {
          customRebalancingUnitShares = undefined;
          customRedeemQuantity = undefined;
          customBaseIssueQuantity = undefined;
          customRebalancingSetIssueQuantity = undefined;
        });

        beforeEach(async () => {
          subjectKeepChangeInVault = true;
        });

        it('sends the correct base set quantity to the user in the vault', async () => {
          await subject();

          const expectedBalance = customRedeemQuantity
                                  .mul(rebalancingUnitShares)
                                  .div(DEFAULT_REBALANCING_NATURAL_UNIT)
                                  .mod(baseSetNaturalUnit);
          const currentBaseSetBalance = await vault.getOwnerBalance.callAsync(
            baseSetToken.address,
            subjectCaller,
          );
          expect(currentBaseSetBalance).to.bignumber.equal(expectedBalance);
        });
      });
    });
  });
});