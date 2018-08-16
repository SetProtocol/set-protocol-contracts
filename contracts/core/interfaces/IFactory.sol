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
 * @title IFactory
 * @author Set Protocol
 *
 * The IFactory interface provides operability for authorized contracts
 * to interact with SetTokenFactory
 */
interface IFactory {

    /* ============ External Functions ============ */

    /**
     * Return core address
     *
     * @return address        core address
     */
    function core()
        external
        returns (address);

    /*
     * Get all SetTokens created by this factory
     *
     * @return  address[]    Array of SetTokens
     */
    function setTokens()
        external
        returns(address[]);

    /**
     * Deploys a new Set Token and adds it to the valid list of SetTokens
     *
     * @param  _components           The address of component tokens
     * @param  _units                The units of each component token
     * @param  _naturalUnit          The minimum unit to be issued or redeemed
     * @param  _name                 The name of the new Set
     * @param  _symbol               The symbol of the new Set
     * @param  _callData             Byte string containing additional call parameters
     * @return setTokenAddress       The address of the new Set
     */
    function create(
        address[] _components,
        uint[] _units,
        uint256 _naturalUnit,
        string _name,
        string _symbol,
        bytes _callData
    )
        external
        returns (address);

    /**
     * Disable a set token in the mapping of tracked set tokens. Can only be called by Core
     *
     * @param  _set   The address of the SetToken to disable
     */
    function disableSet(
        address _set
    )
        external;

    /**
     * Check mapping for Set validity
     *
     * @param  _set   The address of the SetToken to verify
     */
    function isSetValid(
        address _set
    )
        external
        view
        returns (bool);
}
