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

pragma solidity 0.4.24;

import { CoreState } from "../lib/CoreState.sol";

/**
 * @title Core Shared Modifiers
 * @author Set Protocol
 *
 * The Core Shared Modifiers library contains the modifiers that are shared across the different
 * Core extensions.
 */

contract CoreModifiers is
    CoreState
{

    /* ============ Constants ============ */

    string constant ZERO_QUANTITY = "Quantity must be greater than zero.";
    string constant INVALID_SET = "Set token is disabled or does not exist.";
    string constant INVALID_FACTORY = "Factory is disabled or does not exist.";

    /* ============ Modifiers ============ */

    // Check that quantity submitted is greater than 0
    modifier isPositiveQuantity(uint _quantity) {
        require(
            _quantity > 0,
            ZERO_QUANTITY
        );
        _;
    }

    // Verify Factory is linked to Core
    modifier isValidFactory(address _factoryAddress) {
        require(
            state.validFactories[_factoryAddress],
            INVALID_FACTORY
        );
        _;
    }

    // Verify set was created by core and is enabled
    modifier isValidSet(address _setAddress) {
        require(
            state.validSets[_setAddress],
            INVALID_SET
        );
        _;
    }
}
