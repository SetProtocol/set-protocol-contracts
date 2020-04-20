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

import { ScaleValidations } from "set-protocol-contract-utils/contracts/lib/ScaleValidations.sol";

import { ICore } from "../../interfaces/ICore.sol";
import { IFeeCalculator } from "../../interfaces/IFeeCalculator.sol";
import { ILiquidator } from "../../interfaces/ILiquidator.sol";
import { IRebalancingSetFactory } from "../../interfaces/IRebalancingSetFactory.sol";
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

    // WhiteList of liquidator contracts
    IWhiteList public liquidatorWhiteList;

    // Contract holding the state and logic required for rebalance liquidation
    // The Liquidator interacts closely with the Set during rebalances.
    ILiquidator public liquidator;

    // Contract responsible for calculation of rebalance fees
    IFeeCalculator public rebalanceFeeCalculator;

    // The account that is allowed to make proposals
    address public manager;

    // The account that receives any fees
    address public feeRecipient;

    // ----------------------------------------------------------------------
    // Configuration
    // ----------------------------------------------------------------------

    // Time in seconds that must elapsed from last rebalance to propose
    uint256 public rebalanceInterval;

    // Time in seconds after rebalanceStartTime before the Set believes the auction has failed
    uint256 public rebalanceFailPeriod;

    // Fee levied to feeRecipient every mint operation, paid during minting
    // Represents a decimal value scaled by 1e18 (e.g. 100% = 1e18 and 1% = 1e16)
    uint256 public entryFee;
    
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
    // Proposal is unused
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

    modifier onlyManager() {
        validateManager();
        _;
    }

    /* ============ Events ============ */

    event NewManagerAdded(
        address newManager,
        address oldManager
    );

    event NewLiquidatorAdded(
        address newLiquidator,
        address oldLiquidator
    );

    event NewEntryFee(
        uint256 newEntryFee,
        uint256 oldEntryFee
    );

    event NewFeeRecipient(
        address newFeeRecipient,
        address oldFeeRecipient
    );

    event EntryFeePaid(
        address indexed feeRecipient,
        uint256 feeQuantity
    );

    event RebalanceStarted(
        address oldSet,
        address newSet,
        uint256 rebalanceIndex,
        uint256 currentSetQuantity
    );

    event RebalanceSettled(
        address indexed feeRecipient,
        uint256 feeQuantity,
        uint256 feePercentage,
        uint256 rebalanceIndex,
        uint256 issueQuantity,
        uint256 unitShares
    );

    /* ============ Setter Functions ============ */

    /*
     * Set new manager address.
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

    function setEntryFee(
        uint256 _newEntryFee
    )
        external
        onlyManager
    {
        ScaleValidations.validateLessThanEqualOneHundredPercent(_newEntryFee);

        ScaleValidations.validateMultipleOfBasisPoint(_newEntryFee);

        emit NewEntryFee(_newEntryFee, entryFee);
        entryFee = _newEntryFee;
    }

    /*
     * Set new liquidator address. Only whitelisted addresses are valid.
     */
    function setLiquidator(
        ILiquidator _newLiquidator
    )
        external
        onlyManager
    {
        require(
            rebalanceState != RebalancingLibrary.State.Rebalance,
            "Invalid state"
        );

        require(
            liquidatorWhiteList.whiteList(address(_newLiquidator)),
            "Not whitelisted"
        );

        emit NewLiquidatorAdded(address(_newLiquidator), address(liquidator));
        liquidator = _newLiquidator;
    }

    function setFeeRecipient(
        address _newFeeRecipient
    )
        external
        onlyManager
    {
        emit NewFeeRecipient(_newFeeRecipient, feeRecipient);
        feeRecipient = _newFeeRecipient;
    }

    /* ============ Getter Functions ============ */

    /*
     * Retrieves the current expected fee from the fee calculator
     * Value is returned as a scale decimal figure.
     */
    function rebalanceFee()
        external
        view
        returns (uint256)
    {
        return rebalanceFeeCalculator.getFee();
    }

    /*
     * Function for compatability with ISetToken interface. Returns currentSet.
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
     * Returns whether the address is the current set of the RebalancingSetToken.
     * Conforms to the ISetToken Interface.
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

    /* ============ Validations ============ */
    function validateManager() internal view {
        require(
            msg.sender == manager,
            "Not manager"
        );
    }

    function validateCallerIsCore() internal view {
        require(
            msg.sender == address(core),
            "Not Core"
        );
    }

    function validateCallerIsModule() internal view {
        require(
            core.validModules(msg.sender),
            "Not approved module"
        );
    }

    function validateRebalanceStateIs(RebalancingLibrary.State _requiredState) internal view {
        require(
            rebalanceState == _requiredState,
            "Invalid state"
        );
    }

    function validateRebalanceStateIsNot(RebalancingLibrary.State _requiredState) internal view {
        require(
            rebalanceState != _requiredState,
            "Invalid state"
        );
    }
}
