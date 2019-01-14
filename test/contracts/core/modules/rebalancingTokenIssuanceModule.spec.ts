require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
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
  TransferProxyContract,
  VaultContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';
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

// const {
  // SetProtocolTestUtils: SetTestUtils,
//   SetProtocolUtils: SetUtils,
// } = setProtocolUtils;
// const setUtils = new SetUtils(web3);
// const { NULL_ADDRESS, ZERO } = SetUtils.CONSTANTS;

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

    // JUST IN CASE. May need access to vault or transfer proxy
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

  describe('#redeemRBSetIntoBaseComponents', async () => {
    const subjectCaller: Address = functionCaller;
    let subjectRebalancingSetAddress: Address;
    let subjectRedeemQuantity: BigNumber;

    let baseSetIssueQuantity: BigNumber;

    let baseSetToken: SetTokenContract;
    let baseSetNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    beforeEach(async () => {
      const baseSetComponent = await erc20Wrapper.deployTokenAsync(ownerAccount);
      await erc20Wrapper.approveTransferAsync(baseSetComponent, transferProxy.address);

      // Create the Set (1 component)
      const componentAddresses = [baseSetComponent.address];
      const componentUnits = [new BigNumber(10 ** 10)];
      baseSetNaturalUnit = new BigNumber(10 ** 9);
      baseSetToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        baseSetNaturalUnit,
      );
      await erc20Wrapper.approveTransferAsync(baseSetToken, transferProxy.address);

      // Create the Rebalancing Set
      rebalancingUnitShares = new BigNumber(10 ** 10);
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
      baseSetIssueQuantity = subjectRedeemQuantity.mul(rebalancingUnitShares).div(DEFAULT_REBALANCING_NATURAL_UNIT);

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

    afterEach(async () => {
    });

    async function subject(): Promise<string> {
      return rebalancingTokenIssuanceModule.redeemRBSetIntoBaseComponents.sendTransactionAsync(
        subjectRebalancingSetAddress,
        subjectRedeemQuantity,
        {
          from: subjectCaller,
          gas: DEFAULT_GAS,
        },
      );
    }

    it('issues the rebalancing Set to the caller', async () => {
      const previousRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);

      console.log('Caller rb balance', previousRBSetTokenBalance.toString());

      const expectedRBSetTokenBalance = previousRBSetTokenBalance.sub(subjectRedeemQuantity);

      await subject();

      const currentRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      expect(expectedRBSetTokenBalance).to.bignumber.equal(currentRBSetTokenBalance);
    });

    // describe('when the base Set acquired is in excess of required', async () => {
    //   const excessBaseSetIssued = new BigNumber(10 ** 9);

    //   before(async () => {
    //     customExchangeIssueQuantity = new BigNumber(10 ** 10).plus(excessBaseSetIssued);
    //   });

    //   it('refunds the user the appropriate amount of base Set', async () => {
    //     await subject();

    //     const ownerBalance = await baseSetToken.balanceOf.callAsync(subjectCaller);

    //     expect(ownerBalance).to.bignumber.equal(excessBaseSetIssued);
    //   });
    // });
  });
});
