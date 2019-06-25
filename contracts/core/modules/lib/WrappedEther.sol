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

import { IWETH } from "../../../lib/IWETH.sol";


/**
 * @title WrappedEther
 * @author Set Protocol
 *
 * The WrappedEther library maintains wrapped Ether related functionality
 */
contract WrappedEther {

    /* ============ Internal Functions ============ */

    /**
     * Utility function to unwrap the desired quantity of Wrapped Ether and transfer
     * to the recipient.
     *
     * @param _weth         The instance of Wrapped Ether
     * @param _recipient    The address to send the (unwrapped) ether to
     * @param _quantity     The amount of wrapped ether to unwrap and transfer
     */
    function withdrawWrappedEtherAndTransfer(
        IWETH _weth,
        address payable _recipient,
        uint256 _quantity
    )
        internal
    {
        _weth.withdraw(_quantity);

        _recipient.transfer(_quantity);
    }

}
