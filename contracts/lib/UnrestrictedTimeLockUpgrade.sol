/*
    Copyright 2020 Set Labs Inc.

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

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { TimeLockUpgrade } from "./TimeLockUpgrade.sol";


/**
 * @title UnrestrictedTimeLockUpgrade
 * @author Set Protocol
 *
 * The UnrestrictedTimeLockUpgrade contract contains a modifier for handling minimum time period updates not
 * limited to the owner of the contract. Also implements a removeTimeLockUpgrade internal function that can
 * be exposed by writing an external version into the contract it used in with the required modifiers to
 * restrict access.
 */

contract UnrestrictedTimeLockUpgrade is
    TimeLockUpgrade
{
    /* ============ Events ============ */

    event RemoveRegisteredUpgrade(
        bytes32 indexed _upgradeHash
    );

    /* ============ Internal Function ============ */

    /**
     * Removes an existing upgrade.
     *
     * @param  _upgradeHash    Keccack256 hash that uniquely identifies function called and arguments
     */
    function removeRegisteredUpgradeInternal(
        bytes32 _upgradeHash
    )
        internal
    {
        require(
            timeLockedUpgrades[_upgradeHash] != 0,
            "TimeLockUpgradeV2.removeRegisteredUpgrade: Upgrade hash must be registered"
        );

        // Reset the timestamp to 0
        timeLockedUpgrades[_upgradeHash] = 0;

        emit RemoveRegisteredUpgrade(
            _upgradeHash
        );
    }
}