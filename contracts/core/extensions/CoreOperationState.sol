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

pragma solidity 0.4.25;

import { Ownable } from "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import { CoreState } from "../lib/CoreState.sol";


/**
 * @title Core Operation State
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

    enum OperationState { 
        Operational,
        ShutDown,
        Freeze,
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
            "CoreOperationalState.whenOperational: Function is in non-operational state."
        );
        _;
    }

    modifier whenOperationalOrShuttingDown() {
        require(
            state.operationState == uint8(OperationState.Operational) ||
            state.operationState == uint8(OperationState.ShutDown),
            "CoreOperationalState.whenOperational: Function is in frozen state."
        );
        _;
    }

    /* ============ External Functions ============ */

    /**
     * 
     * 
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
            _operationState < uint8(OperationState.InvalidState),
            "CoreOperationalState.setOperationalState: newState is not a valid operation state"
        );

        if (_operationState != state.operationState) {
            emit OperationStateChanged(
                state.operationState,
                _operationState
            );
            state.operationState = _operationState;
        }
    }

    
}
