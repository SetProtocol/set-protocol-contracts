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

import { IERC20 } from "../../lib/IERC20.sol";


/**
 * @title ERC20Wrapper
 * @author Set Protocol
 *
 * This library contains functions for interacting wtih ERC20 tokens, even those not fully compliant.
 * For all functions we will only accept tokens that return a null or true value, any other values will
 * cause the operation to revert.
 */
library ERC20Wrapper {

    // ============ Constants ============

    string constant INVALID_RETURN_TRANSFER = "Transferred token does not return null or true on successful transfer.";
    string constant INVALID_RETURN_TRANSFERFROM = "Transferred token does not return null or true on successful transferFrom.";

    // ============ Internal Functions ============

    function balanceOf(
        address _tokenAddress,
        address _ownerAddress
    )
        internal
        view
        returns (uint256)
    {
        return IERC20(_tokenAddress).balanceOf(_ownerAddress);
    }

    function transfer(
        address _tokenAddress,
        address _to,
        uint256 _quantity
    )
        internal
    {
        IERC20(_tokenAddress).transfer(_to, _quantity);

        require(
            checkSuccess(),
            INVALID_RETURN_TRANSFER
        );
    }

    function transferFrom(
        address _tokenAddress,
        address _from,
        address _to,
        uint256 _quantity
    )
        internal
    {
        IERC20(_tokenAddress).transferFrom(_from, _to, _quantity);

        require(
            checkSuccess(),
            INVALID_RETURN_TRANSFERFROM
        );
    }

    // ============ Private Functions ============

    /**
     * Checks the return value of the previous function up to 32 bytes. Returns true if the previous
     * function returned 0 bytes or 1.
     */
    function checkSuccess(
    )
        private
        pure
        returns (bool)
    {
        // default to failure
        uint256 returnValue = 0;

        assembly {
            // check number of bytes returned from last function call
            switch returndatasize

            // no bytes returned: assume success
            case 0x0 {
                returnValue := 1
            }

            // 32 bytes returned
            case 0x20 {
                // copy 32 bytes into scratch space
                returndatacopy(0x0, 0x0, 0x20)

                // load those bytes into returnValue
                returnValue := mload(0x0)
            }

            // not sure what was returned: dont mark as success
            default { }
        }

        // check if returned value is one or nothing
        return returnValue == 1;
    }
}
