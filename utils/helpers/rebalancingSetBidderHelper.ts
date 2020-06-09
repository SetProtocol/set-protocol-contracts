import * as _ from 'lodash';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';
import {
  RebalancingSetEthBidderContract,
  RebalancingSetCTokenBidderContract,
} from '../contracts';
import { getContractInstance, importArtifactsFromSource, linkLibrariesToDeploy, txnFrom } from '../web3Helper';

const ERC20Wrapper = importArtifactsFromSource('ERC20Wrapper');
const RebalancingSetEthBidder = importArtifactsFromSource('RebalancingSetEthBidder');
const RebalancingSetCTokenBidder = importArtifactsFromSource('RebalancingSetCTokenBidder');


export class RebalancingSetBidderHelper {
  private _contractOwnerAddress: Address;

  constructor(contractOwnerAddress: Address) {
    this._contractOwnerAddress = contractOwnerAddress;
  }

  /* ============ Deployment ============ */

  public async deployRebalancingSetEthBidderAsync(
    rebalanceAuctionModuleAddress: Address,
    transferProxyAddress: Address,
    wethAddress: Address,
    from: Address = this._contractOwnerAddress
  ): Promise<RebalancingSetEthBidderContract> {
    await linkLibrariesToDeploy(RebalancingSetEthBidder, [ERC20Wrapper], this._contractOwnerAddress);

    const rebalancingSetEthBidderContract = await RebalancingSetEthBidder.new(
      rebalanceAuctionModuleAddress,
      transferProxyAddress,
      wethAddress,
      txnFrom(from)
    );

    return new RebalancingSetEthBidderContract(
      getContractInstance(rebalancingSetEthBidderContract),
      txnFrom(from)
    );
  }

  public async deployRebalancingSetCTokenBidderAsync(
    rebalanceAuctionModuleAddress: Address,
    transferProxyAddress: Address,
    cTokenAddressesArray: Address[],
    underlyingAddressesArray: Address[],
    dataDescription: string,
    from: Address = this._contractOwnerAddress
  ): Promise<RebalancingSetCTokenBidderContract> {
    await linkLibrariesToDeploy(RebalancingSetCTokenBidder, [ERC20Wrapper], this._contractOwnerAddress);

    const rebalancingSetCTokenBidderContract = await RebalancingSetCTokenBidder.new(
      rebalanceAuctionModuleAddress,
      transferProxyAddress,
      cTokenAddressesArray,
      underlyingAddressesArray,
      dataDescription,
      txnFrom(from)
    );

    return new RebalancingSetCTokenBidderContract(
      getContractInstance(rebalancingSetCTokenBidderContract),
      txnFrom(from)
    );
  }

  public replaceFlowsWithCTokenUnderlyingAsync(
    expectedTokenFlows: any,
    combinedTokenArray: Address[],
    cTokenAddressesArray: Address[],
    underlyingAddressesArray: Address[],
    cTokenExchangeRateArray: BigNumber[],
  ): any {
    const inflowArray: BigNumber[] = [];
    const outflowArray: BigNumber[] = [];

    const cTokenToUnderlyingObject = this.constructObjectFromArray(
      cTokenAddressesArray,
      underlyingAddressesArray
    );

    const cTokenToExchangeRateObject = this.constructObjectFromArray(
      cTokenAddressesArray,
      cTokenExchangeRateArray
    );

    for (let i = 0; i < combinedTokenArray.length; i++) {
      // Check if address is cToken
      if (cTokenToUnderlyingObject[combinedTokenArray[i]]) {
        const cTokenConversion = cTokenToExchangeRateObject[combinedTokenArray[i]].div(10 ** 18);
        let newInflow = expectedTokenFlows['inflowArray'][i]
            .mul(cTokenConversion)
            .round(0, BigNumber.ROUND_DOWN);

        newInflow = newInflow.div(cTokenConversion).gte(expectedTokenFlows['inflowArray'][i])
          ? newInflow
          : newInflow.add(1);

        let newOutflow = expectedTokenFlows['outflowArray'][i]
            .mul(cTokenConversion)
            .round(0, BigNumber.ROUND_DOWN);

        newOutflow = newOutflow.div(cTokenConversion).gte(expectedTokenFlows['outflowArray'][i])
          ? newOutflow
          : newOutflow.add(1);

        inflowArray.push(newInflow);
        outflowArray.push(newOutflow);
      } else {
        inflowArray.push(expectedTokenFlows['inflowArray'][i]);
        outflowArray.push(expectedTokenFlows['outflowArray'][i]);
      }
    }

    return { inflowArray, outflowArray };
  }

  public constructObjectFromArray(
    array1: any[],
    array2: any[],
  ): any {
    return array1.reduce((accumulator: object, currentValue: any, index: number) => {
      return {
        ...accumulator,
        [currentValue]: array2[index],
      };
    }, {});
  }
}
