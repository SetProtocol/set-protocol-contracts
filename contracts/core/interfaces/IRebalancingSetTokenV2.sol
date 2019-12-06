/*
    Copyright 2019 Set Labs Inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { RebalancingLibrary } from "../lib/RebalancingLibrary.sol";
import { ILiquidator } from "./ILiquidator.sol";
import { ISetToken } from "./ISetToken.sol";

/**
 * @title IRebalancingSetTokenV2
 * @author Set Protocol
 *
 * The IRebalancingSetTokenV2 interface provides a light-weight, structured way to interact with the
 * RebalancingSetTokenV2 contract from another contract.
 */

interface IRebalancingSetTokenV2 {

    /*
     * Get totalSupply of Rebalancing Set
     *
     * @return  totalSupply
     */
    function totalSupply()
        external
        view
        returns (uint256);

    /**
     * Returns liquidator instance
     *
     * @return  ILiquidator    Liquidator instance
     */
    function liquidator()
        external
        view
        returns (ILiquidator);

    /*
     * Get lastRebalanceTimestamp of Rebalancing Set
     *
     * @return  lastRebalanceTimestamp
     */
    function lastRebalanceTimestamp()
        external
        view
        returns (uint256);

    /*
     * Get rebalanceStartTime of Rebalancing Set
     *
     * @return  rebalanceStartTime
     */
    function rebalanceStartTime()
        external
        view
        returns (uint256);

    /*
     * Get rebalanceInterval of Rebalancing Set
     *
     * @return  rebalanceInterval
     */
    function rebalanceInterval()
        external
        view
        returns (uint256);

    /*
     * Get rebalanceState of Rebalancing Set
     *
     * @return RebalancingLibrary.State    Current rebalance state of the RebalancingSetTokenV2
     */
    function rebalanceState()
        external
        view
        returns (RebalancingLibrary.State);

    /**
     * Gets the balance of the specified address.
     *
     * @param owner      The address to query the balance of.
     * @return           A uint256 representing the amount owned by the passed address.
     */
    function balanceOf(
        address owner
    )
        external
        view
        returns (uint256);

    /*
     * Get entryFee of Rebalancing Set
     *
     * @return  entryFee
     */
    function entryFee()
        external
        view
        returns (uint256);

    /*
     * Get rebalanceFee of Rebalancing Set
     *
     * @return  rebalanceFee
     */
    function rebalanceFee()
        external
        view
        returns (uint256);

    /*
     * Initiates the rebalance in coordination with the Liquidator contract. 
     * In this step, we redeem the currentSet and pass relevant information
     * to the liquidator.
     *
     * @param _nextSet                      The Set to rebalance into
     *
     * Can only be called if the rebalance interval has elapsed.
     * Can only be called by manager.
     */
    function startRebalance(
        address _nextSet
    )
        external;

    /*
     * After a successful rebalance, the new Set is issued. If there is a rebalance fee,
     * the fee is paid via inflation of the Rebalancing Set to the feeRecipient.
     * Full issuance functionality is now returned to set owners.
     *
     * Anyone can call this function.
     */
    function settleRebalance()
        external;

    /*
     * Get natural unit of Set
     *
     * @return  uint256       Natural unit of Set
     */
    function naturalUnit()
        external
        view
        returns (uint256);

    /**
     * Returns the address of the current base SetToken with the current allocation
     *
     * @return           A address representing the base SetToken
     */
    function currentSet()
        external
        view
        returns (ISetToken);

    /**
     * Returns the address of the next base SetToken with the post auction allocation
     *
     * @return  address    Address representing the base SetToken
     */
    function nextSet()
        external
        view
        returns (ISetToken);

    /*
     * Get the unit shares of the rebalancing Set
     *
     * @return  unitShares       Unit Shares of the base Set
     */
    function unitShares()
        external
        view
        returns (uint256);

    /*
     * Place bid during rebalance auction. Can only be called by Core.
     *
     * @param _quantity                 The amount of currentSet to be rebalanced
     * @return combinedTokenArray       Array of token addresses invovled in rebalancing
     * @return inflowUnitArray          Array of amount of tokens inserted into system in bid
     * @return outflowUnitArray         Array of amount of tokens taken out of system in bid
     */
    function placeBid(
        uint256 _quantity
    )
        external
        returns (address[] memory, uint256[] memory, uint256[] memory);

    /*
     * Get token inflows and outflows required for bid. Also the amount of Rebalancing
     * Sets that would be generated.
     *
     * @param _quantity               The amount of currentSet to be rebalanced
     * @return inflowUnitArray        Array of amount of tokens inserted into system in bid
     * @return outflowUnitArray       Array of amount of tokens taken out of system in bid
     */
    function getBidPrice(
        uint256 _quantity
    )
        external
        view
        returns (uint256[] memory, uint256[] memory);

}
