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
  ONE_DAY_IN_SECONDS,
  DEFAULT_UNIT_SHARES,
  DEFAULT_REBALANCING_NATURAL_UNIT,
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

  public async createSetTokensAsync(
    core: CoreLikeContract,
    factory: Address,
    transferProxy: Address,
    tokenCount: number,
    from: Address = this._tokenOwnerAddress,
  ): Promise<SetTokenContract[]> {
    const naturalUnit = ether(2);
    const setTokenArray: SetTokenContract[] = [];

    const components = await this._erc20Wrapper.deployTokensAsync(tokenCount + 1, this._tokenOwnerAddress);
    await this._erc20Wrapper.approveTransfersAsync(components, transferProxy);

    const indexArray = _.times(tokenCount, Number);
    for (const index in indexArray) {
      const idx = Number(index);
      const setComponents = components.slice(idx, idx + 2);
      const setComponentAddresses = _.map(setComponents, token => token.address);
      const setComponentUnits = _.map(setComponents, () => naturalUnit.mul(idx + 1)); // Multiple of naturalUnit
      const setToken = await this._coreWrapper.createSetTokenAsync(
        core,
        factory,
        setComponentAddresses,
        setComponentUnits,
        naturalUnit,
      );
      setTokenArray.push(setToken);
    }

    return setTokenArray;
  }

  public async createDefaultRebalancingSetTokenAsync(
    core: CoreLikeContract,
    factory: Address,
    manager: Address,
    initialSet: Address,
    proposalPeriod: BigNumber,
  ): Promise<RebalancingSetTokenContract> {
    const initialUnitShares = DEFAULT_UNIT_SHARES;
    const rebalanceInterval = ONE_DAY_IN_SECONDS;
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

  public async defaultTransitionToProposeAsync(
    rebalancingSetToken: RebalancingSetTokenContract,
    newRebalancingSetToken: Address,
    auctionLibrary: Address,
    caller: Address
  ): Promise<void> {
    const curveCoefficient = ether(1);
    const auctionStartPrice = ether(5);
    const auctionPriceDivisor = ether(10);

    await this._blockchain.increaseTimeAsync(ONE_DAY_IN_SECONDS.add(1));
    await rebalancingSetToken.propose.sendTransactionAsync(
      newRebalancingSetToken,
      auctionLibrary,
      curveCoefficient,
      auctionStartPrice,
      auctionPriceDivisor,
      { from: caller, gas: DEFAULT_GAS}
    );
  }

  public async defaultTransitionToRebalanceAsync(
    rebalancingSetToken: RebalancingSetTokenContract,
    newRebalancingSetToken: Address,
    auctionLibrary: Address,
    caller: Address
  ): Promise<void> {
    await this.defaultTransitionToProposeAsync(
      rebalancingSetToken,
      newRebalancingSetToken,
      auctionLibrary,
      caller
    );

    await this._blockchain.increaseTimeAsync(ONE_DAY_IN_SECONDS.add(1));
    await rebalancingSetToken.rebalance.sendTransactionAsync(
      { from: caller, gas: DEFAULT_GAS }
    );
  }

  // Used to construct expected comined unit arrays made during propose calls
  public async constructCombinedUnitArrayAsync(
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
