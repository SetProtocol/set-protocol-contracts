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

    mapping(address => bytes32) public upgradeIdentifier;

    /* ============ Modifier ============ */

    /**
     * This modifier must be used in conjunction with timeLockUpgrade AND must be called before
     * timeLockUpgrade is called. UpgradeAddress must also be part of the msg.data.
     */
    modifier limitOneUpgrade(address _upgradeAddress) {
        if (timeLockPeriod > 0) {
            // Get upgradeHash
            bytes32 upgradeHash = keccak256(msg.data);
            
            if (upgradeIdentifier[_upgradeAddress] != 0) {
                // If upgrade hash has no record then revert since must be second upgrade
                require(
                    upgradeIdentifier[_upgradeAddress] == upgradeHash,
                    "Another update already in progress."
                );

                upgradeIdentifier[_upgradeAddress] = 0;

            } else {
                upgradeIdentifier[_upgradeAddress] = upgradeHash;
            }
        }
        _;
    }

    /**
     * Verifies that upgrade address matches with hash of upgrade. Removes upgrade from timelockUpgrades
     * and sets upgradeIdentifier to 0 for passed upgradeAddress, allowing for another upgrade.
     *
     * @param _upgradeAddress       The address of the trading pool being updated
     * @param _upgradeHash          Keccack256 hash that uniquely identifies function called and arguments
     */
    function removeRegisteredUpgradeInternal(
        address _upgradeAddress,
        bytes32 _upgradeHash
    )
        internal
    {
        require(
            upgradeIdentifier[_upgradeAddress] == _upgradeHash,
            "Passed upgrade hash does not match upgrade address."
        );

        UnrestrictedTimeLockUpgrade.removeRegisteredUpgradeInternal(_upgradeHash);

        upgradeIdentifier[_upgradeAddress] = 0;
    }
}