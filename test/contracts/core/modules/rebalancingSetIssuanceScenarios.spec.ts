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
import {
  DEFAULT_GAS,
  DEFAULT_REBALANCING_NATURAL_UNIT,
  ONE_DAY_IN_SECONDS,
} from '@utils/constants';
import { ether } from '@utils/units';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { RebalancingHelper } from '@utils/helpers/rebalancingHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);

const { SetProtocolUtils: SetUtils } = setProtocolUtils;
const { ZERO } = SetUtils.CONSTANTS;

contract('RebalancingSetIssuanceModule:Scenarios', accounts => {
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

  describe('Issue ETH Simulated MACO Rebalancing Set with Ether', async () => {
    let subjectCaller: Address;
    let subjectRebalancingSetAddress: Address;
    let subjectRebalancingSetQuantity: BigNumber;
    let subjectKeepChangeInVault: boolean;
    let subjectWethQuantity: BigNumber;

    let baseSetWethComponent: WethMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;
    let baseSetComponentUnit: BigNumber;
    let baseSetIssueQuantity: BigNumber;

    beforeEach(async () => {
      subjectCaller = functionCaller;

      baseSetWethComponent = wethMock;

      // Create the Set (1 component)
      const componentAddresses = [baseSetWethComponent.address];
      baseSetComponentUnit = new BigNumber(10 ** 6);
      const componentUnits = [baseSetComponentUnit];
      baseSetNaturalUnit = new BigNumber(10 ** 6);
      baseSetToken = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        baseSetNaturalUnit,
      );

      // Create the Rebalancing Set
      rebalancingUnitShares = new BigNumber(10 ** 6);
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        core,
        rebalancingSetTokenFactory.address,
        ownerAccount,
        baseSetToken.address,
        ONE_DAY_IN_SECONDS,
        rebalancingUnitShares,
      );

      subjectRebalancingSetAddress = rebalancingSetToken.address;

      subjectRebalancingSetQuantity = new BigNumber(10 ** 6);
      baseSetIssueQuantity =
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
  });

  describe('#Issue USDC Simulated MACO Rebalancing Set with USDC', async () => {
    let subjectCaller: Address;
    let subjectRebalancingSetAddress: Address;
    let subjectRebalancingSetQuantity: BigNumber;
    let subjectKeepChangeInVault: boolean;

    let usdcComponent: StandardTokenMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;
    let usdcComponentUnit: BigNumber;
    let baseSetIssueQuantity: BigNumber;

    beforeEach(async () => {
      subjectCaller = functionCaller;

      usdcComponent = await erc20Helper.deployTokenAsync(subjectCaller, 6);
      await erc20Helper.approveTransferAsync(usdcComponent, transferProxy.address, subjectCaller);

      // Create the Set (1 component)
      const componentAddresses = [usdcComponent.address];
      usdcComponentUnit = new BigNumber(300); // Price of ETH
      const componentUnits = [usdcComponentUnit];
      baseSetNaturalUnit = new BigNumber(10 ** 12);
      baseSetToken = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        baseSetNaturalUnit,
      );

      // Create the Rebalancing Set
      rebalancingUnitShares = new BigNumber(10 ** 6);
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        core,
        rebalancingSetTokenFactory.address,
        ownerAccount,
        baseSetToken.address,
        ONE_DAY_IN_SECONDS,
        rebalancingUnitShares,
      );

      subjectRebalancingSetAddress = rebalancingSetToken.address;

      subjectRebalancingSetQuantity = ether(1);
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
      const previousComponentBalance = await usdcComponent.balanceOf.callAsync(subjectCaller);
      const expectedComponentUsed = baseSetIssueQuantity.mul(usdcComponentUnit).div(baseSetNaturalUnit);

      const expectedComponentBalance = previousComponentBalance.sub(expectedComponentUsed);

      await subject();

      const componentBalance = await usdcComponent.balanceOf.callAsync(subjectCaller);
      expect(expectedComponentBalance).to.bignumber.equal(componentBalance);
    });
  });

  describe('Redeem ETH Simulated MACO Rebalancing Set into Ether', async () => {
    let subjectCaller: Address;
    let subjectRebalancingSetAddress: Address;
    let subjectRebalancingSetQuantity: BigNumber;
    let subjectKeepChangeInVault: boolean;

    let baseSetIssueQuantity: BigNumber;
    let baseSetComponentUnit: BigNumber;

    let baseSetWethComponent: WethMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    let wethRequiredToMintSet: BigNumber;

    beforeEach(async () => {
      subjectCaller = functionCaller;

      baseSetWethComponent = wethMock;
      await erc20Helper.approveTransferAsync(baseSetWethComponent, transferProxy.address);

      // Create the Set (1 component)
      const componentAddresses = [baseSetWethComponent.address];
      baseSetComponentUnit = new BigNumber(10 ** 6);
      const componentUnits = [baseSetComponentUnit];
      baseSetNaturalUnit = new BigNumber(10 ** 6);
      baseSetToken = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        baseSetNaturalUnit,
      );
      await erc20Helper.approveTransferAsync(baseSetToken, transferProxy.address);

      // Create the Rebalancing Set
      rebalancingUnitShares = new BigNumber(10 ** 6);
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        core,
        rebalancingSetTokenFactory.address,
        ownerAccount,
        baseSetToken.address,
        ONE_DAY_IN_SECONDS,
        rebalancingUnitShares,
      );

      subjectRebalancingSetAddress = rebalancingSetToken.address;

      subjectRebalancingSetQuantity = new BigNumber(10 ** 6);
      baseSetIssueQuantity =
        subjectRebalancingSetQuantity.mul(rebalancingUnitShares).div(DEFAULT_REBALANCING_NATURAL_UNIT);

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

      const rebalancingSetIssueQuantity = subjectRebalancingSetQuantity;

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

    it('redeems the rebalancing Set', async () => {
      const previousRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      const expectedRBSetTokenBalance = previousRBSetTokenBalance.sub(subjectRebalancingSetQuantity);

      await subject();

      const currentRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      expect(expectedRBSetTokenBalance).to.bignumber.equal(currentRBSetTokenBalance);
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
  });

  describe('Redeem USDC Simulated MACO Rebalancing Set into USDC', async () => {
    let subjectCaller: Address;
    let subjectRebalancingSetAddress: Address;
    let subjectRebalancingSetQuantity: BigNumber;
    let subjectKeepChangeInVault: boolean;

    let baseSetIssueQuantity: BigNumber;
    let usdcUnit: BigNumber;

    let usdc: StandardTokenMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    beforeEach(async () => {
      subjectCaller = functionCaller;

      usdc = await erc20Helper.deployTokenAsync(ownerAccount, 6);
      await erc20Helper.approveTransferAsync(usdc, transferProxy.address);

      // Create the Set (1 component)
      const componentAddresses = [usdc.address];
      usdcUnit = new BigNumber(300); // Price of Eth
      const componentUnits = [usdcUnit];
      baseSetNaturalUnit = new BigNumber(10 ** 12);
      baseSetToken = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        baseSetNaturalUnit,
      );
      await erc20Helper.approveTransferAsync(baseSetToken, transferProxy.address);

      // Create the Rebalancing Set
      rebalancingUnitShares = new BigNumber(10 ** 6);
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        core,
        rebalancingSetTokenFactory.address,
        ownerAccount,
        baseSetToken.address,
        ONE_DAY_IN_SECONDS,
        rebalancingUnitShares,
      );

      subjectRebalancingSetAddress = rebalancingSetToken.address;

      subjectRebalancingSetQuantity = ether(1);
      baseSetIssueQuantity =
        subjectRebalancingSetQuantity.mul(rebalancingUnitShares).div(DEFAULT_REBALANCING_NATURAL_UNIT);

      await coreHelper.issueSetTokenAsync(
        core,
        baseSetToken.address,
        baseSetIssueQuantity,
      );

      const rebalancingSetIssueQuantity = subjectRebalancingSetQuantity;

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
  });
});