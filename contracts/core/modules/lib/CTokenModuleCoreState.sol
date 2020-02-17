/*
    Copyright 2020 Set Labs Inc.

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

import { CommonMath } from "../../../lib/CommonMath.sol";
import { ERC20Wrapper } from "../../../lib/ERC20Wrapper.sol";
import { IAddressToAddressWhiteList } from "../../interfaces/IAddressToAddressWhiteList.sol";


/**
 * @title CTokenModuleCoreState
 * @author Set Protocol
 *
 * The CTokenModuleCoreState library maintains Core-related state for modules that interact with cTokens.
 *
 */
contract CTokenModuleCoreState {

    /* ============ State Variables ============ */

    // Address of transferProxy contract
    address public transferProxy;

    // Address and instance of AddressToAddressWhiteList contract
    IAddressToAddressWhiteList public cTokenWhiteList; 

    /* ============ Public Getters ============ */

    /**
     * Constructor function for CTokenModuleCoreState
     *
     * @param _transferProxy       The address of TransferProxy
     * @param _cTokenWhiteList     The instance of cTokenWhiteList contract
     */
    constructor(
        address _transferProxy,
        IAddressToAddressWhiteList _cTokenWhiteList
    )
        public
    {
        transferProxy = _transferProxy;
        cTokenWhiteList = _cTokenWhiteList;

        address[] memory cTokenAddresses = _cTokenWhiteList.validAddresses();

        for (uint256 i = 0; i < cTokenAddresses.length; i++) {
            address cTokenAddress = cTokenAddresses[i];
            address underlyingAddress = cTokenWhiteList.getValue(cTokenAddress);

            // Add approvals of the underlying token to the cToken contract
            ERC20Wrapper.approve(
                underlyingAddress,
                cTokenAddress,
                CommonMath.maxUInt256()
            );

            // Add approvals of the underlying token to the transferProxy contract
            ERC20Wrapper.approve(
                underlyingAddress,
                _transferProxy,
                CommonMath.maxUInt256()
            );

            // Add approvals of the cToken to the transferProxy contract
            ERC20Wrapper.approve(
                cTokenAddress,
                _transferProxy,
                CommonMath.maxUInt256()
            );
        }
    }
}
