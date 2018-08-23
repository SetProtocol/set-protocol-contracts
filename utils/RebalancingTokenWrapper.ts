import * as _ from 'lodash';
import { SetProtocolUtils, Address } from 'set-protocol-utils';

import {
  CoreContract,
  CoreMockContract,
  SetTokenContract,
  RebalancingSetTokenContract
} from './contracts';
import { BigNumber } from 'bignumber.js';

import { ether } from './units';
import {
  DEFAULT_GAS,
  DEFAULT_PERIOD_INTERVAL,
  DEFAULT_UNIT_SHARES,
  DEFAULT_REBALANCING_NATURAL_UNIT,
  DEFAULT_TIME_FAST_FORWARD
} from './constants';

import { CoreWrapper } from './coreWrapper';
import { ERC20Wrapper } from './erc20Wrapper';
import { Blockchain } from './blockchain';

declare type CoreLikeContract = CoreMockContract | CoreContract;

export class RebalancingTokenWrapper {
  private _tokenOwnerAddress: Address;
  private _coreWrapper: CoreWrapper;
  private _erc20Wrapper: ERC20Wrapper;
  private _blockchain: Blockchain;

  constructor(
    tokenOwnerAddress: Address,
    coreWrapper: CoreWrapper,
    erc20Wrapper: ERC20Wrapper,
    blockchain: Blockchain,
  ) {
    this._tokenOwnerAddress = tokenOwnerAddress;

    this._coreWrapper = coreWrapper;
    this._erc20Wrapper = erc20Wrapper;
    this._blockchain = blockchain;
  }

  public async createSetTokens(
    core: CoreLikeContract,
    factory: Address,
    transferProxy: Address,
    from: Address = this._tokenOwnerAddress,
  ): Promise<SetTokenContract[]> {
    const naturalUnit = ether(2);
    const components = await this._erc20Wrapper.deployTokensAsync(3, this._tokenOwnerAddress);
    await this._erc20Wrapper.approveTransfersAsync(components, transferProxy);

    const set1Components = components.slice(0, 2);
    const set1ComponentAddresses = _.map(set1Components, token => token.address);
    const set1ComponentUnits = _.map(set1Components, () => naturalUnit.mul(2)); // Multiple of naturalUnit
    const setToken1 = await this._coreWrapper.createSetTokenAsync(
      core,
      factory,
      set1ComponentAddresses,
      set1ComponentUnits,
      naturalUnit,
    );

    const set2Components = components.slice(1, 3);
    const set2ComponentAddresses = _.map(set2Components, token => token.address);
    const set2ComponentUnits = _.map(set2Components, () => naturalUnit.mul(1)); // Multiple of naturalUnit
    const setToken2 = await this._coreWrapper.createSetTokenAsync(
      core,
      factory,
      set2ComponentAddresses,
      set2ComponentUnits,
      naturalUnit,
    );
    return [setToken1, setToken2];
  }

  public async createDefaultRebalancingSetToken(
    core: CoreLikeContract,
    factory: Address,
    manager: Address,
    initialSet: Address,
    proposalPeriod: BigNumber,
  ): Promise<RebalancingSetTokenContract> {
    const initialUnitShares = DEFAULT_UNIT_SHARES;
    const rebalanceInterval = DEFAULT_PERIOD_INTERVAL;
    const callData = SetProtocolUtils.bufferArrayToHex([
      SetProtocolUtils.paddedBufferForPrimitive(manager),
      SetProtocolUtils.paddedBufferForBigNumber(proposalPeriod),
      SetProtocolUtils.paddedBufferForBigNumber(rebalanceInterval),
    ]);

    return await this._coreWrapper.createRebalancingTokenAsync(
      core,
      factory,
      [initialSet],
      [initialUnitShares],
      DEFAULT_REBALANCING_NATURAL_UNIT,
      callData,
    );
  }

  public async defaultTransitionToPropose(
    rebalancingSetToken: RebalancingSetTokenContract,
    newRebalancingSetToken: Address,
    auctionLibrary: Address,
    caller: Address
  ): Promise<void> {
    const curveCoefficient = ether(1);
    const auctionStartPrice = ether(5);
    const auctionPriceDivisor = ether(10);

    await this._blockchain.increaseTimeAsync(DEFAULT_TIME_FAST_FORWARD);
    await rebalancingSetToken.propose.sendTransactionAsync(
      newRebalancingSetToken,
      auctionLibrary,
      curveCoefficient,
      auctionStartPrice,
      auctionPriceDivisor,
      { from: caller, gas: DEFAULT_GAS}
    );
  }

  public async defaultTransitionToRebalance(
    rebalancingSetToken: RebalancingSetTokenContract,
    newRebalancingSetToken: Address,
    auctionLibrary: Address,
    caller: Address
  ): Promise<void> {
    await this.defaultTransitionToPropose(
      rebalancingSetToken,
      newRebalancingSetToken,
      auctionLibrary,
      caller
    );

    await this._blockchain.increaseTimeAsync(DEFAULT_TIME_FAST_FORWARD);
    await rebalancingSetToken.rebalance.sendTransactionAsync(
      { from: caller, gas: DEFAULT_GAS }
    );
  }

  public async constructCombinedUnitArray(
    rebalancingSetToken: RebalancingSetTokenContract,
    setToken: SetTokenContract,
  ): Promise<BigNumber[]> {
    const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();
    const setTokenComponents = await setToken.getComponents.callAsync();
    const setTokenUnits = await setToken.getUnits.callAsync();
    const setNaturalUnit = await setToken.naturalUnit.callAsync();

    const combinedSetTokenUnits: BigNumber[] = [];
    combinedTokenArray.forEach(address => {
      const index = setTokenComponents.indexOf(address);
      if (index != -1) {
        const totalTokenAmount = setTokenUnits[index].mul(new BigNumber(10 ** 18)).div(setNaturalUnit);
        combinedSetTokenUnits.push(totalTokenAmount);
      } else {
        combinedSetTokenUnits.push(new BigNumber(0));
      }
    });
    return combinedSetTokenUnits;
  }
}
