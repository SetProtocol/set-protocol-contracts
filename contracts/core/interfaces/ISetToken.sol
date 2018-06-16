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

/**
 * @title ISetToken
 * @author Set Protocol
 *
 * The ISetToken interface provides a light-weight, structured way to interact with the
 * SetToken contract from another contract.
 */

interface ISetToken {
    function naturalUnit()
        external
        returns (uint);

    function getComponents()
        external
        returns(address[]);

    function getUnits()
        external
        returns(uint[]);

    function mint(
        address _issuer,
        uint _quantity
    )
        external;

    function burn(
        address _from,
        uint _quantity
    )
        external;
}
