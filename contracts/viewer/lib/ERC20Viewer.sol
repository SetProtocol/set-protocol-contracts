/*
    Copyright 2019 Set Labs Inc.

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


import { IERC20 } from "../../lib/IERC20.sol";


/**
 * @title ERC20Viewer
 * @author Set Protocol
 *
 * Interfaces for fetching multiple ERC20 state in a single read
 */
contract ERC20Viewer {

    /*
     * Fetches multiple balances for passed in array of ERC20 contract addresses for an owner
     *
     * @param  _tokenAddresses    Addresses of ERC20 contracts to check balance for
     * @param  _owner             Address to check balance of _tokenAddresses for
     * @return  uint256[]         Array of balances for each ERC20 contract passed in
     */
    function batchFetchBalancesOf(
        address[] calldata _tokenAddresses,
        address _owner
    )
        external
        returns (uint256[] memory)
    {
        // Cache length of addresses to fetch balances for
        uint256 _addressesCount = _tokenAddresses.length;
        
        // Instantiate output array in memory
        uint256[] memory balances = new uint256[](_addressesCount);

        // Cycle through contract addresses array and fetching the balance of each for the owner
        for (uint256 i = 0; i < _addressesCount; i++) {
            balances[i] = IERC20(_tokenAddresses[i]).balanceOf(_owner);
        }

        return balances;
    }

    /*
     * Fetches multiple supplies for passed in array of ERC20 contract addresses
     *
     * @param  _tokenAddresses    Addresses of ERC20 contracts to check supply for
     * @return  uint256[]         Array of supplies for each ERC20 contract passed in
     */
    function batchFetchSupplies(
        address[] calldata _tokenAddresses
    )
        external
        returns (uint256[] memory)
    {
        // Cache length of addresses to fetch supplies for
        uint256 _addressesCount = _tokenAddresses.length;
        
        // Instantiate output array in memory
        uint256[] memory supplies = new uint256[](_addressesCount);

        // Cycle through contract addresses array and fetching the supply of each
        for (uint256 i = 0; i < _addressesCount; i++) {
            supplies[i] = IERC20(_tokenAddresses[i]).totalSupply();
        }

        return supplies;
    }
}
