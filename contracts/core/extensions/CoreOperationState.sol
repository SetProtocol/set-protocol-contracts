/*
    Copyright 2018 Set Labs Inc.

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

import { Ownable } from "openzeppelin-solidity/contracts/ownership/Ownable.sol";

import { CoreState } from "../lib/CoreState.sol";


/**
 * @title CoreOperationState
 * @author Set Protocol
 *
 * The CoreOperationState contract contains methods to alter state of variables that track
 * Core dependency addresses.
 */
contract CoreOperationState is
    Ownable,
    CoreState
{

    /* ============ Enum ============ */

    /**
     * Operational:
     * All Accounting and Issuance related functions are available for usage during this stage
     *
     * Shut Down:
     * Only functions which allow users to redeem and withdraw funds are allowed during this stage
     */
    enum OperationState {
        Operational,
        ShutDown,
        InvalidState
    }

    /* ============ Events ============ */

    event OperationStateChanged(
        uint8 _prevState,
        uint8 _newState
    );

    /* ============ Modifiers ============ */

    modifier whenOperational() {
        require(
            state.operationState == uint8(OperationState.Operational),
            "WhenOperational"
        );
        _;
    }

    /* ============ External Functions ============ */

    /**
     * Updates the operation state of the protocol.
     * Can only be called by owner of Core.
     *
     * @param  _operationState   Uint8 representing the current protocol operation state
     */
    function setOperationState(
        uint8 _operationState
    )
        external
        onlyOwner
    {
        require(
            _operationState < uint8(OperationState.InvalidState) &&
            _operationState != state.operationState,
            "InvalidOperationState"
        );

        emit OperationStateChanged(
            state.operationState,
            _operationState
        );

        state.operationState = _operationState;
    }
}
