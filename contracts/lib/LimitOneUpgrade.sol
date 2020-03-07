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

import { UnrestrictedTimeLockUpgrade } from "./UnrestrictedTimeLockUpgrade.sol";


/**
 * @title LimitOneUpgrade
 * @author Set Protocol
 *
 * For function that must be timelocked but could potentially have more than one upgrade at a time
 * this contract allows one to limit the amount of simultaneous upgrades.
 */

contract LimitOneUpgrade is
    UnrestrictedTimeLockUpgrade
{
    /* ============ State Variables ============ */

    mapping(address => bool) public upgradeInProgress;

    /* ============ Modifier ============ */

    modifier limitOneUpgrade(address _upgradeAddress) {
        if (timeLockPeriod > 0) {
            if (upgradeInProgress[_upgradeAddress]) {
                // Get upgradeHash
                bytes32 upgradeHash = keccak256(
                    abi.encodePacked(
                        msg.data
                    )
                );

                // If upgrade hash has no record then revert since must be second upgrade
                require(
                    timeLockedUpgrades[upgradeHash] != 0,
                    "Another fee update already in progress."
                );

                upgradeInProgress[_upgradeAddress] = false;
            } else {
                upgradeInProgress[_upgradeAddress] = true;
            }
        }
        _;
    }
}