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
pragma experimental "ABIEncoderV2";


import { Authorizable } from "../lib/Authorizable.sol";
import { ERC20 } from "zeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import { SafeMath } from "zeppelin-solidity/contracts/math/SafeMath.sol";


/**
 * @title TransferProxy
 * @author Set Protocol
 *
 * The proxy contract is responsible for transferring funds from the user to the vault during Set issuance.
 * The contract is separated to allow for upgrades, particularly if new token standards emerge or upgrades are required.
 */
 
contract TransferProxy is
    Authorizable
{
    // Use SafeMath library for all uint256 arithmetic
    using SafeMath for uint256;

    /* ============ State Variables ============ */

    // Address of the Vault contract
    address public vaultAddress;

    /* ============ No Constructor ============ */

    /* ============ Setter Functions ============ */

    /**
     * Set vaultAddress. Can only be set by owner of TransferProxy.
     *
     * @param  _vaultAddress   The address of the Vault
     */

    function setVaultAddress(
        address _vaultAddress
    )
        external
        onlyOwner
    {
        // Commit passed address to vaultAddress state variable
        vaultAddress = _vaultAddress;
    }

    /* ============ Public Functions ============ */

    /**
     * Transfers tokens from an address (that has set allowance on the proxy) to the vault.
     * Can only be called by authorized core contracts.
     *
     * @param  _from           The address to transfer tokens from
     * @param  _tokenAddress   The address of the ERC20 token
     * @param  _quantity       The number of tokens to transfer
     */
    function transferToVault(
        address _from,
        address _tokenAddress,
        uint _quantity
    )
        external
        onlyAuthorized
    {
        // Retrieve current balance of token for the vault
        uint existingVaultBalance = ERC20(_tokenAddress).balanceOf(vaultAddress);

        // Call specified ERC20 contract to transfer tokens from user to Vault (via proxy). 
        ERC20(_tokenAddress).transferFrom(
            _from,
            vaultAddress,
            _quantity
        );

        // Verify transfer quantity is reflected in balance
        uint newVaultBalance = ERC20(_tokenAddress).balanceOf(vaultAddress);
        require(newVaultBalance == existingVaultBalance.add(_quantity));
    }
}
