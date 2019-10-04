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

import { ICore } from "../../interfaces/ICore.sol";
import { IRebalancingSetFactory } from "../../interfaces/IRebalancingSetFactory.sol";
import { ILiquidator } from "../../interfaces/ILiquidator.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { IVault } from "../../interfaces/IVault.sol";
import { IWhiteList } from "../../interfaces/IWhiteList.sol";
import { RebalancingLibrary } from "../../lib/RebalancingLibrary.sol";


/**
 * @title RebalancingSetState
 * @author Set Protocol
 *
 */
contract RebalancingSetState {

    /* ============ State Variables ============ */

    // ----------------------------------------------------------------------
    // System Related
    // ----------------------------------------------------------------------

    // Set Protocol's Core Contract
    ICore public core;

    // The Factory that created this Set
    IRebalancingSetFactory public factory;

    // Set Protocol's Vault contract
    IVault public vault;

    // The token whitelist that components are checked against during proposals
    IWhiteList public componentWhiteList;

    // Contract holding the state and logic required for rebalance liquidation
    // The Liquidator interacts closely with the Set during rebalances.
    ILiquidator public liquidator;

    // The account that is allowed to make proposals
    address public manager;

    // ----------------------------------------------------------------------
    // Rebalance configuration
    // ----------------------------------------------------------------------

    // Time in seconds that must elapsed from last rebalance to propose
    uint256 public rebalanceInterval;

    // Time in seconds that must elapse after proposal before rebalance can be initiated
    uint256 public proposalPeriod;

    // Time in seconds after rebalanceStartTime before the Set believes the auction has failed
    uint256 public rebalanceFailPeriod;

    // ----------------------------------------------------------------------
    // Current State
    // ----------------------------------------------------------------------

    // The Set currently collateralizing the Rebalancing Set
    ISetToken public currentSet;

    // The number of currentSet per naturalUnit of the Rebalancing Set
    uint256 public unitShares;

    // The minimum issuable value of a Set
    uint256 public naturalUnit;

    // The current state of the Set (e.g. Default, Proposal, Rebalance, Drawdown)
    RebalancingLibrary.State public rebalanceState;

    // The number of rebalances in the Set's history; starts at index 0
    uint256 public rebalanceIndex;

    // The timestamp of the last completed rebalance
    uint256 public lastRebalanceTimestamp;

    // ----------------------------------------------------------------------
    // Live Rebalance State
    // ----------------------------------------------------------------------

    // The proposal's SetToken to rebalance into
    ISetToken public nextSet;

    // The timestamp of the last valid proposal
    uint256 public proposalStartTime;

    // The timestamp of the last rebalance was initiated at
    uint256 public rebalanceStartTime;

    // Whether a successful bid has been made during the rebalance.
    // In the case that the rebalance has failed, hasBidded is used
    // to determine whether the Set should be put into Drawdown or Default state.
    bool public hasBidded;

    // In the event a Set is put into the Drawdown state, these components
    // that can be withdrawn by users
    address[] internal failedRebalanceComponents;

    /* ============ Modifier ============ */

    /**
     * Throws if called by any account other than the manager.
     */
    modifier onlyManager() {
        require(
            msg.sender == manager,
            "Propose: Sender must be manager"
        );
        _;
    }

    /* ============ Events ============ */

    event NewManagerAdded(
        address newManager,
        address oldManager
    );

    /* ============ Setter Functions ============ */

    /*
     * Set new manager address
     *
     * @param  _newManager       The address of the new manager account
     */
    function setManager(
        address _newManager
    )
        external
        onlyManager
    {
        emit NewManagerAdded(_newManager, manager);
        manager = _newManager;
    }

    /* ============ Getter Functions ============ */

    /*
     * Function for compatability with ISetToken interface. Returns currentSet.
     *
     * @return  componentAddresses       Array of currentSet
     */
    function getComponents()
        external
        view
        returns (address[] memory)
    {
        address[] memory components = new address[](1);
        components[0] = address(currentSet);
        return components;
    }

    /*
     * Function for compatability with ISetToken interface. Returns unitShares.
     *
     * @return  units       Array of component unit
     */
    function getUnits()
        external
        view
        returns (uint256[] memory)
    {
        uint256[] memory units = new uint256[](1);
        units[0] = unitShares;
        return units;
    }

    /*
     * Checks to make sure address is the current set of the RebalancingSetToken.
     * Conforms to the ISetToken Interface.
     *
     * @param  _tokenAddress     Address of token being checked
     * @return  bool             True if token is the current Set
     */
    function tokenIsComponent(
        address _tokenAddress
    )
        external
        view
        returns (bool)
    {
        return _tokenAddress == address(currentSet);
    }

    /*
     * Get array version of failedAuctionWithdrawComponents
     *
     * @return  failedRebalanceComponents
     */
    function getFailedRebalanceComponents()
        external
        view
        returns (address[] memory)
    {
        return failedRebalanceComponents;
    }
}
