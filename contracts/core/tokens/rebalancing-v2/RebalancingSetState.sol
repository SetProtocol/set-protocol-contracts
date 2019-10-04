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

    // System related
    ICore public core;
    IRebalancingSetFactory public factory;
    IVault public vault;
    IWhiteList public componentWhiteList;
    ILiquidator public liquidator;
    address public manager;

    // Rebalance configuration
    uint256 public proposalPeriod;
    uint256 public rebalanceInterval;
    uint256 public rebalanceFailPeriod;

    // Current state
    ISetToken public currentSet;
    uint256 public unitShares;
    uint256 public naturalUnit;
    RebalancingLibrary.State public rebalanceState;
    uint256 public rebalanceIndex;
    uint256 public lastRebalanceTimestamp;

    // Live Rebalance State
    ISetToken public nextSet;
    uint256 public proposalStartTime;
    uint256 public rebalanceStartTime;
    bool public hasBidded;

    // To be used if token put into Drawdown State
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
