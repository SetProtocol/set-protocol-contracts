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
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";


/**
 * @title TimeLockUpgradeV2
 * @author Set Protocol
 *
 * The TimeLockUpgradeV2 contract contains a modifier for handling minimum time period updates
 *
 * CHANGELOG:
 * - Requires that the caller is the owner
 * - New function to allow deletion of existing timelocks
 * - Added upgradeData to UpgradeRegistered event
 */
contract TimeLockUpgradeV2 is
    Ownable
{
    using SafeMath for uint256;

    /* ============ State Variables ============ */

    // Timelock Upgrade Period in seconds
    uint256 public timeLockPeriod;

    // Mapping of maps hash of registered upgrade to its registration timestam
    mapping(bytes32 => uint256) public timeLockedUpgrades;

    /* ============ Events ============ */

    event UpgradeRegistered(
        bytes32 indexed _upgradeHash,
        uint256 _timestamp,
        bytes _upgradeData
    );

    event RemoveRegisteredUpgrade(
        bytes32 indexed _upgradeHash
    );

    /* ============ Modifiers ============ */

    modifier timeLockUpgrade() {
        require(
            isOwner(),
            "TimeLockUpgradeV2: The caller must be the owner"
        );

        // If the time lock period is 0, then allow non-timebound upgrades.
        // This is useful for initialization of the protocol and for testing.
        if (timeLockPeriod > 0) {
            // The upgrade hash is defined by the hash of the transaction call data,
            // which uniquely identifies the function as well as the passed in arguments.
            bytes32 upgradeHash = keccak256(
                abi.encodePacked(
                    msg.data
                )
            );

            uint256 registrationTime = timeLockedUpgrades[upgradeHash];

            // If the upgrade hasn't been registered, register with the current time.
            if (registrationTime == 0) {
                timeLockedUpgrades[upgradeHash] = block.timestamp;

                emit UpgradeRegistered(
                    upgradeHash,
                    block.timestamp,
                    msg.data
                );

                return;
            }

            require(
                block.timestamp >= registrationTime.add(timeLockPeriod),
                "TimeLockUpgradeV2: Time lock period must have elapsed."
            );

            // Reset the timestamp to 0
            timeLockedUpgrades[upgradeHash] = 0;

        }

        // Run the rest of the upgrades
        _;
    }

    /* ============ Function ============ */

    /**
     * Removes an existing upgrade.
     *
     * @param  _upgradeHash    Keccack256 hash that uniquely identifies function called and arguments 
     */
    function removeRegisteredUpgrade(
        bytes32 _upgradeHash 
    )
        external
        onlyOwner
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

    /**
     * Change timeLockPeriod period. Generally called after initially settings have been set up.
     *
     * @param  _timeLockPeriod   Time in seconds that upgrades need to be evaluated before execution
     */
    function setTimeLockPeriod(
        uint256 _timeLockPeriod
    )
        external
        onlyOwner
    {
        // Only allow setting of the timeLockPeriod if the period is greater than the existing
        require(
            _timeLockPeriod > timeLockPeriod,
            "TimeLockUpgradeV2: New period must be greater than existing"
        );

        timeLockPeriod = _timeLockPeriod;
    }
}
