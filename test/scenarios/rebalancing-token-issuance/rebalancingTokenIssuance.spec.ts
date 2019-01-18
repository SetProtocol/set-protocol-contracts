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
  WethMockContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';
import {
  DEFAULT_GAS,
  DEFAULT_REBALANCING_NATURAL_UNIT,
  ONE_DAY_IN_SECONDS,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
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

contract('RebalancingTokenIssuanceModule::Scenarios', accounts => {
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
  let wrappedEther: WethMockContract;

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

    wrappedEther = await erc20Wrapper.deployWrappedEtherAsync(ownerAccount);
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

  describe('#redeemRebalancingSetIntoBaseComponents: Redeem 50/50 BTCETH into WBTC and WETH', async () => {
    let subjectCaller: Address;
    let subjectRebalancingSetAddress: Address;
    let subjectRedeemQuantity: BigNumber;
    let subjectComponentsToExclude: BigNumber;

    const BTC_USD_PRICE: BigNumber = new BigNumber(3711);
    const ETH_USD_PRICE: BigNumber = new BigNumber(128);

    const BTC_DECIMALS: number = 8;
    const WETH_DECIMALS: number = 18;

    const BTC_COMPONENT_UNITS = new BigNumber(1);
    const WETH_COMPONENT_UNITS = BTC_USD_PRICE
                                  .div(ETH_USD_PRICE)
                                  .mul(new BigNumber(10).pow(WETH_DECIMALS - BTC_DECIMALS));

    let bitcoinEtherSetIssueQuantity: BigNumber;

    let wrappedBitcoin: StandardTokenMockContract;
    let bitcoinEtherSet: SetTokenContract;
    let bitcoinEtherNaturalUnit: BigNumber;
    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    beforeEach(async () => {
      subjectCaller = functionCaller;
      subjectComponentsToExclude = ZERO;

      wrappedBitcoin = await erc20Wrapper.deployTokenAsync(ownerAccount, 8);
      await erc20Wrapper.approveTransferAsync(wrappedBitcoin, transferProxy.address);

      await wrappedEther.approve.sendTransactionAsync(
        transferProxy.address,
        UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
      );

      // Create the Set with BTC and WETH in realistic quantities
      const componentAddresses = [wrappedBitcoin.address, wrappedEther.address];
      const componentUnits = [BTC_COMPONENT_UNITS, WETH_COMPONENT_UNITS];
      bitcoinEtherNaturalUnit = new BigNumber(10 ** 10);
      bitcoinEtherSet = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        bitcoinEtherNaturalUnit,
      );
      await erc20Wrapper.approveTransferAsync(bitcoinEtherSet, transferProxy.address);

      // Create the Rebalancing Set
      rebalancingUnitShares = new BigNumber(1350000); // Unit shares required for each RB Set to be $1
      rebalancingSetToken = await rebalancingWrapper.createDefaultRebalancingSetTokenAsync(
        core,
        rebalancingSetTokenFactory.address,
        ownerAccount,
        bitcoinEtherSet.address,
        ONE_DAY_IN_SECONDS,
        rebalancingUnitShares,
      );

      subjectRebalancingSetAddress = rebalancingSetToken.address;

      subjectRedeemQuantity = new BigNumber(10 ** 18);
      bitcoinEtherSetIssueQuantity = subjectRedeemQuantity
                                      .mul(rebalancingUnitShares)
                                      .div(DEFAULT_REBALANCING_NATURAL_UNIT);

      await coreWrapper.issueSetTokenAsync(
        core,
        bitcoinEtherSet.address,
        bitcoinEtherSetIssueQuantity,
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

    it('redeems the rebalancing Set', async () => {
      const previousRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      const expectedRBSetTokenBalance = previousRBSetTokenBalance.sub(subjectRedeemQuantity);

      await subject();

      const currentRBSetTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
      expect(expectedRBSetTokenBalance).to.bignumber.equal(currentRBSetTokenBalance);
    });

    it('redeems the base Set', async () => {
      await subject();

      const currentSaseSetTokenBalance = await bitcoinEtherSet.balanceOf.callAsync(subjectCaller);
      expect(currentSaseSetTokenBalance).to.bignumber.equal(ZERO);
    });

    it('attributes WBTC to the caller', async () => {
      await subject();

      const expectedWrappedBitcoinBalance = bitcoinEtherSetIssueQuantity
                                            .mul(BTC_COMPONENT_UNITS)
                                            .div(bitcoinEtherNaturalUnit);

      const wrappedBitcoinBalance = await wrappedBitcoin.balanceOf.callAsync(subjectCaller);
      expect(wrappedBitcoinBalance).to.bignumber.equal(expectedWrappedBitcoinBalance);
    });

    it('attributes WETH to the caller', async () => {
      await subject();

      const expectedWrappedEtherBalance = bitcoinEtherSetIssueQuantity
                                            .mul(WETH_COMPONENT_UNITS)
                                            .div(bitcoinEtherNaturalUnit);

      const wrappedEtherBalance = await wrappedEther.balanceOf.callAsync(subjectCaller);
      expect(wrappedEtherBalance).to.bignumber.equal(expectedWrappedEtherBalance);
    });
  });
});
