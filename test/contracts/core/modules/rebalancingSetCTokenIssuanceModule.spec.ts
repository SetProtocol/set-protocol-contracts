require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  AddressToAddressWhiteListContract,
  CoreContract,
  RebalancingSetCTokenIssuanceModuleContract,
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
  DEPLOYED_TOKEN_QUANTITY,
  ONE_DAY_IN_SECONDS,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS
} from '@utils/constants';
import { ether } from '@utils/units';

import { CompoundHelper } from '@utils/helpers/compoundHelper';
import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { RebalancingHelper } from '@utils/helpers/rebalancingHelper';
import { UtilsHelper } from '@utils/helpers/utilsHelper';

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
  let rebalancingCTokenIssuanceModule: RebalancingSetCTokenIssuanceModuleContract;
  let cTokenWhiteList: AddressToAddressWhiteListContract;
  let wethMock: WethMockContract;

  let cDAIInstance: StandardTokenMockContract;
  let daiInstance: StandardTokenMockContract;

  let badCDAIInstance: StandardTokenMockContract;

  const compoundHelper = new CompoundHelper(ownerAccount);
  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const erc20Helper = new ERC20Helper(ownerAccount);
  const rebalancingHelper = new RebalancingHelper(
    ownerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );
  const utilsHelper = new UtilsHelper(ownerAccount);

  before(async () => {
    ABIDecoder.addABI(CoreContract.getAbi());
    ABIDecoder.addABI(RebalancingSetCTokenIssuanceModuleContract.getAbi());
  });

  after(async () => {
    ABIDecoder.removeABI(CoreContract.getAbi());
    ABIDecoder.removeABI(RebalancingSetCTokenIssuanceModuleContract.getAbi());
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    core = await coreHelper.deployCoreAsync(transferProxy, vault);
    wethMock = await erc20Helper.deployWrappedEtherAsync(ownerAccount);

    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(core.address);

    await coreHelper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

    rebalancingSetTokenFactory = await coreHelper.deployRebalancingSetTokenFactoryAsync(core.address, whitelist);
    await coreHelper.addFactoryAsync(core, rebalancingSetTokenFactory);

    // Set up Compound DAI token
    daiInstance = await erc20Helper.deployTokenAsync(
      functionCaller,
      18,
    );
    const cDAIAddress = await compoundHelper.deployMockCDAI(daiInstance.address, ownerAccount);
    await compoundHelper.enableCToken(cDAIAddress);
    // Set the Borrow Rate
    await compoundHelper.setBorrowRate(cDAIAddress, new BigNumber('29313252165'));

    cDAIInstance = badCDAIInstance || await erc20Helper.getTokenInstanceAsync(cDAIAddress);
    cTokenWhiteList = await utilsHelper.deployAddressToAddressWhiteListAsync(
      [cDAIInstance.address],
      [daiInstance.address]
    );

    rebalancingCTokenIssuanceModule = await coreHelper.deployRebalancingSetCTokenIssuanceModuleAsync(
      core.address,
      vault.address,
      transferProxy.address,
      wethMock.address,
      cTokenWhiteList.address
    );
    await coreHelper.addModuleAsync(core, rebalancingCTokenIssuanceModule.address);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    it('should contain the correct address of the transfer proxy', async () => {
      const actualProxyAddress = await rebalancingCTokenIssuanceModule.transferProxy.callAsync();

      expect(actualProxyAddress).to.equal(transferProxy.address);
    });

    it('should have unlimited allowance for underlying to cToken contract', async () => {
      const underlyingDAIAllowance = await daiInstance.allowance.callAsync(
        rebalancingCTokenIssuanceModule.address,
        cDAIInstance.address,
      );
      const expectedUnderlyingAllowance = UNLIMITED_ALLOWANCE_IN_BASE_UNITS;

      expect(underlyingDAIAllowance).to.bignumber.equal(expectedUnderlyingAllowance);
    });

    it('should have unlimited allowance for underlying to transferProxy contract', async () => {
      const daiAllowance = await daiInstance.allowance.callAsync(
        rebalancingCTokenIssuanceModule.address,
        transferProxy.address,
      );
      const expectedCTokenAllowance = UNLIMITED_ALLOWANCE_IN_BASE_UNITS;

      expect(daiAllowance).to.bignumber.equal(expectedCTokenAllowance);
    });

    it('should have unlimited allowance for cToken to transferProxy contract', async () => {
      const cDAIAllowance = await cDAIInstance.allowance.callAsync(
        rebalancingCTokenIssuanceModule.address,
        transferProxy.address,
      );
      const expectedCTokenAllowance = UNLIMITED_ALLOWANCE_IN_BASE_UNITS;

      expect(cDAIAllowance).to.bignumber.equal(expectedCTokenAllowance);
    });
  });

  describe('#issueRebalancingSet', async () => {
    let subjectCaller: Address;
    let subjectRebalancingSetAddress: Address;
    let subjectRebalancingSetQuantity: BigNumber;
    let subjectKeepChangeInVault: boolean;

    let baseSetComponent: StandardTokenMockContract;
    let baseSetUnderlyingComponent: StandardTokenMockContract;
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

      baseSetUnderlyingComponent = daiInstance;
      baseSetComponent = cDAIInstance;
      // Create noncToken base set component 2
      baseSetComponent2 = await erc20Helper.deployTokenAsync(subjectCaller);

      // Create the Set (1 component)
      const componentAddresses = [baseSetComponent.address, baseSetComponent2.address];
      baseSetComponentUnit = ether(1);
      const componentUnits = [baseSetComponentUnit, baseSetComponentUnit];
      baseSetNaturalUnit = ether(1);

      // Approve tokens
      await erc20Helper.approveTransferAsync(baseSetUnderlyingComponent, transferProxy.address, subjectCaller);
      await erc20Helper.approveTransferAsync(baseSetComponent2, transferProxy.address, subjectCaller);

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
      return rebalancingCTokenIssuanceModule.issueRebalancingSet.sendTransactionAsync(
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


    it('uses the correct amount of underlying component tokens', async () => {
      const previousUnderlyingComponentBalance = await baseSetUnderlyingComponent.balanceOf.callAsync(subjectCaller);
      const expectedBaseComponentUsed = baseSetIssueQuantity.mul(baseSetComponentUnit).div(baseSetNaturalUnit);
      const expectedUnderlyingComponentUsed =
        await compoundHelper.cTokenToUnderlying(baseSetComponent.address, expectedBaseComponentUsed);
      const expectedComponentBalance = previousUnderlyingComponentBalance.sub(expectedUnderlyingComponentUsed);

      await subject();

      const underlyingComponentBalance = await baseSetUnderlyingComponent.balanceOf.callAsync(subjectCaller);
      expect(expectedComponentBalance).to.bignumber.equal(underlyingComponentBalance);
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
        rebalancingCTokenIssuanceModule.address
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

    describe('when minting a cToken is returning a nonzero response', async () => {
      before(async () => {
        badCDAIInstance = await compoundHelper.deployCTokenWithInvalidMintAndRedeemAsync(ownerAccount);
      });

      after(async () => {
        badCDAIInstance = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
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
    let baseSetUnderlyingComponent: StandardTokenMockContract;
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

      baseSetUnderlyingComponent = daiInstance;
      baseSetComponent = cDAIInstance;
      // Create noncToken base set component 2
      baseSetWethComponent = customWethMock || wethMock;

      // Create the Set (1 component)
      const componentAddresses = [baseSetComponent.address, baseSetWethComponent.address];
      baseSetComponentUnit = ether(1);
      const componentUnits = [baseSetComponentUnit, baseSetComponentUnit];
      baseSetNaturalUnit = ether(1);

      // Approve tokens
      await erc20Helper.approveTransferAsync(baseSetUnderlyingComponent, transferProxy.address, subjectCaller);
      await erc20Helper.approveTransferAsync(baseSetWethComponent, transferProxy.address, subjectCaller);

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
      return rebalancingCTokenIssuanceModule.issueRebalancingSetWrappingEther.sendTransactionAsync(
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
      const previousUnderlyingComponentBalance = await baseSetUnderlyingComponent.balanceOf.callAsync(subjectCaller);
      const expectedBaseComponentUsed = baseSetIssueQuantity.mul(baseSetComponentUnit).div(baseSetNaturalUnit);
      const expectedUnderlyingComponentUsed =
        await compoundHelper.cTokenToUnderlying(baseSetComponent.address, expectedBaseComponentUsed);
      const expectedComponentBalance = previousUnderlyingComponentBalance.sub(expectedUnderlyingComponentUsed);

      await subject();

      const underlyingComponentBalance = await baseSetUnderlyingComponent.balanceOf.callAsync(subjectCaller);
      expect(expectedComponentBalance).to.bignumber.equal(underlyingComponentBalance);
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
        rebalancingCTokenIssuanceModule.address
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

    describe('when minting a cToken is returning a nonzero response', async () => {
      before(async () => {
        badCDAIInstance = await compoundHelper.deployCTokenWithInvalidMintAndRedeemAsync(ownerAccount);
      });

      after(async () => {
        badCDAIInstance = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
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
    let baseSetUnderlyingComponent: StandardTokenMockContract;
    let baseSetComponent2: StandardTokenMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    let customBaseIssueQuantity: BigNumber;
    let customRebalancingUnitShares: BigNumber;
    let customRedeemQuantity: BigNumber;
    let customRebalancingSetIssueQuantity: BigNumber;

    beforeEach(async () => {
      subjectCaller = functionCaller;

      baseSetUnderlyingComponent = daiInstance;
      baseSetComponent = cDAIInstance;
      // Create noncToken base set component 2
      baseSetComponent2 = await erc20Helper.deployTokenAsync(ownerAccount);

      const componentAddresses = [baseSetComponent.address, baseSetComponent2.address];
      baseSetComponentUnit = ether(1);
      const componentUnits = [baseSetComponentUnit, baseSetComponentUnit];
      baseSetNaturalUnit = ether(1);

      // Approve tokens
      await erc20Helper.approveTransferAsync(baseSetUnderlyingComponent, transferProxy.address);
      await erc20Helper.approveTransferAsync(baseSetUnderlyingComponent, baseSetComponent.address);
      await erc20Helper.approveTransferAsync(baseSetComponent, transferProxy.address);
      await erc20Helper.approveTransferAsync(baseSetComponent2, transferProxy.address);

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

      // Mint cTokens from underlying
      const baseComponentUnits = baseSetIssueQuantity.mul(componentUnits[0]).div(baseSetNaturalUnit);
      const cTokensToMint = await compoundHelper.cTokenToUnderlying(baseSetComponent.address, baseComponentUnits);

      // Fund the owner account with underlying components to mint cToken
      await erc20Helper.transferTokenAsync(
        baseSetUnderlyingComponent,
        ownerAccount,
        DEPLOYED_TOKEN_QUANTITY,
        subjectCaller,
      );

      await compoundHelper.mintCToken(
        baseSetComponent.address,
        cTokensToMint,
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
      return rebalancingCTokenIssuanceModule.redeemRebalancingSet.sendTransactionAsync(
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

      const currentBaseSetTokenBalance = await baseSetToken.balanceOf.callAsync(subjectCaller);
      expect(currentBaseSetTokenBalance).to.bignumber.equal(ZERO);
    });

    it('attributes the underlying CToken component to the caller', async () => {
      await subject();

      const expectedBaseComponentBalance = baseSetIssueQuantity.mul(baseSetComponentUnit).div(baseSetNaturalUnit);
      const expectedUnderlyingComponentBalance =
        await compoundHelper.cTokenToUnderlying(baseSetComponent.address, expectedBaseComponentBalance);
      const baseSetUnderlyingComponentBalance = await baseSetUnderlyingComponent.balanceOf.callAsync(subjectCaller);
      expect(baseSetUnderlyingComponentBalance).to.bignumber.equal(expectedUnderlyingComponentBalance);
    });

    it('attributes the base Set component 2 to the caller', async () => {
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
        rebalancingCTokenIssuanceModule.address
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

    describe('when redeeming a cToken is returning a nonzero response', async () => {
      before(async () => {
        badCDAIInstance = await compoundHelper.deployCTokenWithInvalidMintAndRedeemAsync(ownerAccount);
      });

      after(async () => {
        badCDAIInstance = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
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
    let baseSetUnderlyingComponent: StandardTokenMockContract;
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

    beforeEach(async () => {
      subjectCaller = functionCaller;

      baseSetWethComponent = customWethMock || wethMock;

      baseSetUnderlyingComponent = daiInstance;
      baseSetComponent = cDAIInstance;

      // Approve tokens
      await erc20Helper.approveTransferAsync(baseSetWethComponent, transferProxy.address);
      await erc20Helper.approveTransferAsync(baseSetComponent, transferProxy.address);
      await erc20Helper.approveTransferAsync(baseSetUnderlyingComponent, transferProxy.address);
      await erc20Helper.approveTransferAsync(baseSetUnderlyingComponent, baseSetComponent.address);

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

      // Mint cTokens from underlying
      const baseComponentUnits = baseSetIssueQuantity.mul(componentUnits[0]).div(baseSetNaturalUnit);
      const cTokensToMint = await compoundHelper.cTokenToUnderlying(baseSetComponent.address, baseComponentUnits);

      // Fund the owner account with underlying components to mint cToken
      await erc20Helper.transferTokenAsync(
        baseSetUnderlyingComponent,
        ownerAccount,
        DEPLOYED_TOKEN_QUANTITY,
        subjectCaller,
      );

      // Mint cToken
      await compoundHelper.mintCToken(
        baseSetComponent.address,
        cTokensToMint,
      );

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
      return rebalancingCTokenIssuanceModule.redeemRebalancingSetUnwrappingEther.sendTransactionAsync(
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

      const currentBaseSetTokenBalance = await baseSetToken.balanceOf.callAsync(subjectCaller);
      expect(currentBaseSetTokenBalance).to.bignumber.equal(ZERO);
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

    it('attributes the underlying cToken component to the caller', async () => {
      await subject();

      const expectedBaseComponentBalance = baseSetIssueQuantity.mul(baseSetComponentUnit).div(baseSetNaturalUnit);
      const expectedUnderlyingComponentBalance =
        await compoundHelper.cTokenToUnderlying(baseSetComponent.address, expectedBaseComponentBalance);
      const baseSetUnderlyingComponentBalance = await baseSetUnderlyingComponent.balanceOf.callAsync(subjectCaller);
      expect(baseSetUnderlyingComponentBalance).to.bignumber.equal(expectedUnderlyingComponentBalance);
    });

    it('emits correct LogRebalancingSetRedeem event', async () => {
      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = LogRebalancingSetRedeem(
        subjectRebalancingSetAddress,
        subjectCaller,
        subjectRebalancingSetQuantity,
        rebalancingCTokenIssuanceModule.address
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

    describe('when redeeming a cToken is returning a nonzero response', async () => {
      before(async () => {
        badCDAIInstance = await compoundHelper.deployCTokenWithInvalidMintAndRedeemAsync(ownerAccount);
      });

      after(async () => {
        badCDAIInstance = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});