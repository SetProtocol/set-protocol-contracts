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

import { Ownable } from "zeppelin-solidity/contracts/ownership/Ownable.sol";
import { SafeMath } from "zeppelin-solidity/contracts/math/SafeMath.sol";
import { AddressArrayUtils } from "cryptofin-solidity/contracts/array-utils/AddressArrayUtils.sol";


/**
 * @title Authorizable
 * @author Set Protocol
 *
 * The Authorizable contract is an inherited contract that sets permissions on certain function calls
 * through the onlyAuthorized modifier. Permissions can be managed only by the Owner of the contract.
 */
contract Authorizable is
    Ownable
{
    using SafeMath for uint256;
    using AddressArrayUtils for address[];

    /* ============ State Variables ============ */

    // Time in which authorized addresses can no longer be changed
    uint256 public gracePeriodEnd;

    // Mapping of addresses to bool indicator of authorization
    mapping (address => bool) public authorized;

    // Array of authorized addresses
    address[] public authorities;

    /* ============ Modifiers ============ */

    // Only authorized addresses can invoke functions with this modifier.
    modifier onlyAuthorized {
        require(authorized[msg.sender], "SENDER_NOT_AUTHORIZED");
        _;
    }

    /* ============ Events ============ */

    // Event emitted when new address is authorized.
    event AddressAuthorized (
        address indexed authAddress,
        address authorizedBy
    );

    // Event emitted when address is deauthorized.
    event AuthorizedAddressRemoved (
        address indexed addressRemoved,
        address authorizedBy
    );

    /* ============ Constructor ============ */

    /**
     * @param  _gracePeriod   Time period in which authorizations can be added or removed
     */
    constructor
    (
        uint256 _gracePeriod
    )
        public
    {
        gracePeriodEnd = block.timestamp.add(_gracePeriod);
    }

    /* ============ Setters ============ */

    /**
     * Add authorized address to contract. Can only be set by owner.
     *
     * @param  _authTarget   The address of the new authorized contract
     */

    function addAuthorizedAddress(address _authTarget)
        external
        onlyOwner
    {
        // Require that timestamp is before grace period
        require(block.timestamp < gracePeriodEnd, "GRACE_PERIOD_PASSED");

        // Require that address is not already authorized
        require(!authorized[_authTarget], "ALREADY_AUTHORIZED");

        // Set address authority to true
        authorized[_authTarget] = true;

        // Add address to authorities array
        authorities.push(_authTarget);

        // Emit authorized address event
        emit AddressAuthorized(
            _authTarget,
            msg.sender
        );
    }

    /**
     * Remove authorized address from contract. Can only be set by owner.
     *
     * @param  _authTarget   The address to be de-permissioned
     */

    function removeAuthorizedAddress(address _authTarget)
        external
        onlyOwner
    {
        // Require that timestamp is before grace period
        require(block.timestamp < gracePeriodEnd, "GRACE_PERIOD_PASSED");

        // Require address is authorized
        require(authorized[_authTarget], "ALREADY_AUTHORIZED"); // Target address must be authorized.

        // Delete address from authorized mapping
        delete authorized[_authTarget];

        authorities = authorities.remove(_authTarget);

        // Emit AuthorizedAddressRemoved event.
        emit AuthorizedAddressRemoved(
            _authTarget,
            msg.sender
        );
    }

    /**
     * More efficiently remove authorized address from contract. Can only be set by owner.
     *
     * @param  _authTarget   The address to be de-permissioned
     * @param _index           The index of the _authTarget address in authorities
     */

    function removeAuthorizedAddressAtIndex(
        address _authTarget,
        uint256 _index
    )
        external
        onlyOwner
    {
        // Require that timestamp is before grace period
        require(block.timestamp < gracePeriodEnd, "GRACE_PERIOD_PASSED");

        // Require index is less than length of authorities
        require(_index < authorities.length, "INDEX_TOO_LARGE");

        // Require address at index of authorities matches target address
        require(authorities[_index] == _authTarget, "MISMATCHED_TARGET_ADDRESS");

        // Delete address from authorized mapping
        delete authorized[_authTarget];

        // Replace address at index with address at end of array
        authorities[_index] = authorities[authorities.length.sub(1)];

        // Remove last address from array
        authorities.length = authorities.length.sub(1);

        // Emit AuthorizedAddressRemoved event.
        emit AuthorizedAddressRemoved(
            _authTarget,
            msg.sender
        );
    }

    /* ============ Getters ============ */

    /**
     * Get array of authorized addresses.
     *
     * @return address[]   Array of authorized addresses
     */
    function getAuthorizedAddresses()
        external
        view
        returns (address[] memory)
    {
        // Return array of authorized addresses
        return authorities;
    }
}
