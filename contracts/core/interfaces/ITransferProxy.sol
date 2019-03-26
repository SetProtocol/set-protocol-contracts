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

/**
 * @title ITransferProxy
 * @author Set Protocol
 *
 * The ITransferProxy interface provides a light-weight, structured way to interact with the
 * TransferProxy contract from another contract.
 */
interface ITransferProxy {

    /* ============ External Functions ============ */

    /**
     * Transfers tokens from an address (that has set allowance on the proxy).
     * Can only be called by authorized core contracts.
     *
     * @param  _token          The address of the ERC20 token
     * @param  _quantity       The number of tokens to transfer
     * @param  _from           The address to transfer from
     * @param  _to             The address to transfer to
     */
    function transfer(
        address _token,
        uint256 _quantity,
        address _from,
        address _to
    )
        external;

    /**
     * Transfers tokens from an address (that has set allowance on the proxy).
     * Can only be called by authorized core contracts.
     *
     * @param  _tokens         The addresses of the ERC20 token
     * @param  _quantities     The numbers of tokens to transfer
     * @param  _from           The address to transfer from
     * @param  _to             The address to transfer to
     */
    function batchTransfer(
        address[] calldata _tokens,
        uint256[] calldata _quantities,
        address _from,
        address _to
    )
        external;
}
