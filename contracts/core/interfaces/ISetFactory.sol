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
 * @title ISetFactory
 * @author Set Protocol
 *
 * The ISetFactory interface provides operability for authorized contracts
 * to interact with SetTokenFactory
 */
interface ISetFactory {

    /* ============ External Functions ============ */

    /**
     * Return core address
     *
     * @return address        core address
     */
    function core() external returns (address);

    /**
     * Deploys a new Set Token and adds it to the valid list of SetTokens
     *
     * @param  _components           The address of component tokens
     * @param  _units                The units of each component token
     * @param  _naturalUnit          The minimum unit to be issued or redeemed
     * @param  _name                 The name of the new Set
     * @param  _symbol               The symbol of the new Set
     * @return setTokenAddress       The address of the new Set
     */
    function create(
        address[] _components,
        uint[] _units,
        uint _naturalUnit,
        string _name,
        string _symbol
    )
        external
        returns (address);
}
