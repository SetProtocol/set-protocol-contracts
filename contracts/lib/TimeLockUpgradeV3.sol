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

import { TimeLockUpgradeV2 } from "./TimeLockUpgradeV2.sol";


/**
 * @title TimeLockUpgradeV3
 * @author Set Protocol
 *
 * The TimeLockUpgradeV3 contract contains a modifier for handling minimum time period updates
 *
 * CHANGELOG:
 * - Requires that the caller is the owner
 * - New function to allow deletion of existing timelocks
 * - Added upgradeData to UpgradeRegistered event
 */
contract TimeLockUpgradeV3 is
    TimeLockUpgradeV2
{
    using SafeMath for uint256;

    /* ============ Modifiers ============ */

    modifier timeLockUpgradeV3(
        address _validator,
        function(address) internal returns (bool) _check
    ) {
        require(
            _check(_validator),
            "TimeLockUpgradeV3: Caller criteria must be met."
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
                "TimeLockUpgradeV3: Time lock period must have elapsed."
            );

            // Reset the timestamp to 0
            timeLockedUpgrades[upgradeHash] = 0;

        }

        // Run the rest of the upgrades
        _;
    }
}