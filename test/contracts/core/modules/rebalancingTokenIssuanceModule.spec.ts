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
  RebalancingTokenIssuanceModuleContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';
import { expectRevertError } from '@utils/tokenAssertions';
import {
  DEFAULT_GAS,
  DEFAULT_REBALANCING_NATURAL_UNIT,
  ONE_DAY_IN_SECONDS,
} from '@utils/constants';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';
import { RebalancingWrapper } from '@utils/wrappers/rebalancingWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);
const Core = artifacts.require('Core');
const RebalancingTokenIssuanceModule = artifacts.require('RebalancingTokenIssuanceModule');

const { SetProtocolUtils: SetUtils } = setProtocolUtils;
const { ZERO } = SetUtils.CONSTANTS;

contract('RebalancingTokenIssuanceModule', accounts => {
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
  let rebalancingTokenIssuanceModule: RebalancingTokenIssuanceModuleContract;

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
    ABIDecoder.addABI(RebalancingTokenIssuanceModule.abi);

    transferProxy = await coreWrapper.deployTransferProxyAsync();
    vault = await coreWrapper.deployVaultAsync();
    core = await coreWrapper.deployCoreAsync(transferProxy, vault);

    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);

    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

    rebalancingSetTokenFactory = await coreWrapper.deployRebalancingSetTokenFactoryAsync(core.address, whitelist);
    await coreWrapper.addFactoryAsync(core, rebalancingSetTokenFactory);

    rebalancingTokenIssuanceModule = await coreWrapper.deployRebalancingTokenIssuanceModuleAsync(
      core,
      transferProxy,
      vault
    );
    await coreWrapper.addModuleAsync(core, rebalancingTokenIssuanceModule.address);

  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
    ABIDecoder.removeABI(RebalancingTokenIssuanceModule.abi);
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
    let subjectComponentsToExclude: BigNumber;

    let baseSetIssueQuantity: BigNumber;
    let baseSetComponentUnit: BigNumber;

    let baseSetComponent: StandardTokenMockContract;
    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    let customBaseIssueQuantity: BigNumber;
    let customRebalancingUnitShares: BigNumber;

    beforeEach(async () => {
      subjectCaller = functionCaller;
      subjectComponentsToExclude = ZERO;

      baseSetComponent = await erc20Wrapper.deployTokenAsync(ownerAccount);
      await erc20Wrapper.approveTransferAsync(baseSetComponent, transferProxy.address);

      // Create the Set (1 component)
      const componentAddresses = [baseSetComponent.address];
      baseSetComponentUnit = new BigNumber(10 ** 10);
      const componentUnits = [baseSetComponentUnit];
      baseSetNaturalUnit = new BigNumber(10 ** 10);
      baseSetToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        baseSetNaturalUnit,
      );
      await erc20Wrapper.approveTransferAsync(baseSetToken, transferProxy.address);

      // Create the Rebalancing Set
      rebalancingUnitShares = customRebalancingUnitShares || new BigNumber(10 ** 10);
      rebalancingSetToken = await rebalancingWrapper.createDefaultRebalancingSetTokenAsync(
        core,
        rebalancingSetTokenFactory.address,
        ownerAccount,
        baseSetToken.address,
        ONE_DAY_IN_SECONDS,
        rebalancingUnitShares,
      );

      subjectRebalancingSetAddress = rebalancingSetToken.address;

      subjectRedeemQuantity = new BigNumber(10 ** 10);
      baseSetIssueQuantity = customBaseIssueQuantity ||
        subjectRedeemQuantity.mul(rebalancingUnitShares).div(DEFAULT_REBALANCING_NATURAL_UNIT);

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
    });

    async function subject(): Promise<string> {
      return rebalancingTokenIssuanceModule.redeemRebalancingSetIntoBaseComponents.sendTransactionAsync(
        subjectRebalancingSetAddress,
        subjectRedeemQuantity,
        subjectComponentsToExclude,
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

    it('attributes the base Set components to the caller', async () => {
      await subject();

      const expectedBaseComponentBalance = baseSetIssueQuantity.mul(baseSetComponentUnit).div(baseSetNaturalUnit);

      const baseSetComponentBalance = await baseSetComponent.balanceOf.callAsync(subjectCaller);
      expect(baseSetComponentBalance).to.bignumber.equal(expectedBaseComponentBalance);
    });

    describe('when the redeem quantity of the rebalancing Set in an invalid base set redeem quantity', async () => {
      before(async () => {
        customBaseIssueQuantity = new BigNumber(10 ** 10);
        customRebalancingUnitShares = new BigNumber(1);
      });

      it('should reverts', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
