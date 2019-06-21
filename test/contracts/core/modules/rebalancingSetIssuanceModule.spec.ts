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

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';
import { RebalancingWrapper } from '@utils/wrappers/rebalancingWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);
const Core = artifacts.require('Core');
const RebalancingSetIssuanceModule = artifacts.require('RebalancingSetIssuanceModule');

const { SetProtocolUtils: SetUtils } = setProtocolUtils;
const { ZERO } = SetUtils.CONSTANTS;

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

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);
  const rebalancingWrapper = new RebalancingWrapper(
    ownerAccount,
    coreWrapper,
    erc20Wrapper,
    blockchain
  );

  before(async () => {
    ABIDecoder.addABI(Core.abi);
    ABIDecoder.addABI(RebalancingSetIssuanceModule.abi);

    transferProxy = await coreWrapper.deployTransferProxyAsync();
    vault = await coreWrapper.deployVaultAsync();
    core = await coreWrapper.deployCoreAsync(transferProxy, vault);
    wethMock = await erc20Wrapper.deployWrappedEtherAsync(ownerAccount);

    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);

    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

    rebalancingSetTokenFactory = await coreWrapper.deployRebalancingSetTokenFactoryAsync(core.address, whitelist);
    await coreWrapper.addFactoryAsync(core, rebalancingSetTokenFactory);

    rebalancingTokenIssuanceModule = await coreWrapper.deployRebalancingSetIssuanceModuleAsync(
      core,
      vault,
      wethMock,
    );
    await coreWrapper.addModuleAsync(core, rebalancingTokenIssuanceModule.address);

  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
    ABIDecoder.removeABI(RebalancingSetIssuanceModule.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#redeemRebalancingSetIntoBaseComponents', async () => {
    let subjectCaller: Address;
    let subjectRebalancingSetAddress: Address;
    let subjectRedeemQuantity: BigNumber;
    let subjectKeepChangeInVault: boolean;

    let baseSetIssueQuantity: BigNumber;
    let baseSetComponentUnit: BigNumber;

    let baseSetComponent: StandardTokenMockContract;
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

      baseSetComponent = await erc20Wrapper.deployTokenAsync(ownerAccount);
      await erc20Wrapper.approveTransferAsync(baseSetComponent, transferProxy.address);

      // Create the Set (1 component)
      const componentAddresses = [baseSetComponent.address];
      baseSetComponentUnit = customBaseComponentUnit || ether(1);
      const componentUnits = [baseSetComponentUnit];
      baseSetNaturalUnit = ether(1);
      baseSetToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        baseSetNaturalUnit,
      );
      await erc20Wrapper.approveTransferAsync(baseSetToken, transferProxy.address);

      // Create the Rebalancing Set
      rebalancingUnitShares = customRebalancingUnitShares || ether(1);
      rebalancingSetToken = await rebalancingWrapper.createDefaultRebalancingSetTokenAsync(
        core,
        rebalancingSetTokenFactory.address,
        ownerAccount,
        baseSetToken.address,
        ONE_DAY_IN_SECONDS,
        rebalancingUnitShares,
      );

      subjectRebalancingSetAddress = rebalancingSetToken.address;

      subjectRedeemQuantity = customRedeemQuantity || new BigNumber(10 ** 7);
      baseSetIssueQuantity = customBaseIssueQuantity ||
        subjectRedeemQuantity.mul(rebalancingUnitShares).div(DEFAULT_REBALANCING_NATURAL_UNIT);

      await coreWrapper.issueSetTokenAsync(
        core,
        baseSetToken.address,
        baseSetIssueQuantity,
      );

      const rebalancingSetIssueQuantity = customRebalancingSetIssueQuantity || subjectRedeemQuantity;

      // Issue the rebalancing Set Token
      await core.issueTo.sendTransactionAsync(
        functionCaller,
        rebalancingSetToken.address,
        rebalancingSetIssueQuantity,
      );

      subjectKeepChangeInVault = false;
    });

    async function subject(): Promise<string> {
      return rebalancingTokenIssuanceModule.redeemRebalancingSetIntoBaseComponents.sendTransactionAsync(
        subjectRebalancingSetAddress,
        subjectRedeemQuantity,
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
      const expectedRBSetTokenBalance = previousRBSetTokenBalance.sub(subjectRedeemQuantity);

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

    // Test logs

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

  describe('#redeemRebalancingSetIntoComponentsAndEther', async () => {
    let subjectCaller: Address;
    let subjectRebalancingSetAddress: Address;
    let subjectRedeemQuantity: BigNumber;
    let subjectKeepChangeInVault: boolean;

    let baseSetIssueQuantity: BigNumber;
    let baseSetComponentUnit: BigNumber;

    let baseSetComponent: WethMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    let customBaseIssueQuantity: BigNumber;
    let customRebalancingUnitShares: BigNumber;

    let wethRequiredToMintSet: BigNumber;

    beforeEach(async () => {
      subjectCaller = functionCaller;

      baseSetComponent = wethMock;
      await erc20Wrapper.approveTransferAsync(baseSetComponent, transferProxy.address);

      // Create the Set (1 component)
      const componentAddresses = [baseSetComponent.address];
      baseSetComponentUnit = ether(1);
      const componentUnits = [baseSetComponentUnit];
      baseSetNaturalUnit = ether(1);
      baseSetToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        baseSetNaturalUnit,
      );
      await erc20Wrapper.approveTransferAsync(baseSetToken, transferProxy.address);

      // Create the Rebalancing Set
      rebalancingUnitShares = customRebalancingUnitShares || ether(1);
      rebalancingSetToken = await rebalancingWrapper.createDefaultRebalancingSetTokenAsync(
        core,
        rebalancingSetTokenFactory.address,
        ownerAccount,
        baseSetToken.address,
        ONE_DAY_IN_SECONDS,
        rebalancingUnitShares,
      );

      subjectRebalancingSetAddress = rebalancingSetToken.address;

      subjectRedeemQuantity = new BigNumber(10 ** 7);
      baseSetIssueQuantity = customBaseIssueQuantity ||
        subjectRedeemQuantity.mul(rebalancingUnitShares).div(DEFAULT_REBALANCING_NATURAL_UNIT);

      // Wrap WETH
      wethRequiredToMintSet = baseSetIssueQuantity.mul(baseSetComponentUnit).div(baseSetNaturalUnit);
      await wethMock.deposit.sendTransactionAsync(
        { from: ownerAccount, gas: DEFAULT_GAS, value: wethRequiredToMintSet.toString() }
      );

      await coreWrapper.issueSetTokenAsync(
        core,
        baseSetToken.address,
        baseSetIssueQuantity,
      );

      // Issue the rebalancing Set Token
      await core.issueTo.sendTransactionAsync(
        functionCaller,
        rebalancingSetToken.address,
        subjectRedeemQuantity,
      );

      subjectKeepChangeInVault = false;
    });

    async function subject(): Promise<string> {
      return rebalancingTokenIssuanceModule.redeemRebalancingSetIntoComponentsAndEther.sendTransactionAsync(
        subjectRebalancingSetAddress,
        subjectRedeemQuantity,
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
    });

    it('redeems the rebalancing Set', async () => {
      const previousRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      const expectedRBSetTokenBalance = previousRBSetTokenBalance.sub(subjectRedeemQuantity);

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
  });
});