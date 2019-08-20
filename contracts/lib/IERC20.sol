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
 * @title IERC20
 * @author Set Protocol
 *
 * Interface for using ERC20 Tokens. This interface is needed to interact with tokens that are not
 * fully ERC20 compliant and return something other than true on successful transfers.
 */
interface IERC20 {
    function balanceOf(
        address _owner
    )
        external
        view
        returns (uint256);

    function allowance(
        address _owner,
        address _spender
    )
        external
        view
        returns (uint256);

    function transfer(
        address _to,
        uint256 _quantity
    )
        external;

    function transferFrom(
        address _from,
        address _to,
        uint256 _quantity
    )
        external;

    function approve(
        address _spender,
        uint256 _quantity
    )
        external
        returns (bool);

    function totalSupply()
        external
        returns (uint256);
}
