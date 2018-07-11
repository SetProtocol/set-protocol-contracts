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

import { SafeMath } from "zeppelin-solidity/contracts/math/SafeMath.sol";
import { Authorizable } from "../../lib/Authorizable.sol";
import { LibBytes } from "../../external/0x/LibBytes.sol";
import { ITransferProxy } from "../interfaces/ITransferProxy.sol";
import { IVault } from "../interfaces/IVault.sol";


/**
 * @title TakerWalletWrapper
 * @author Set Protocol
 *
 * The TakerWalletWrapper contract wrapper to transfer tokens directly from order taker
 */
contract TakerWalletWrapper is
    Authorizable
{
    using SafeMath for uint256;

    /* ============ State Variables ============ */

    address public transferProxy;
    address public vault;

    /* ============ Constants ============ */

    uint256 constant TRANSFER_REQUEST_LENGTH = 64;

    /* ============ Constructor ============ */

    constructor(
        address _transferProxy,
        address _vault
    )
        public
    {
        transferProxy = _transferProxy;
        vault = _vault;
    }

    /* ============ Public Functions ============ */

    function exchange(
        address _tradeOriginator,
        address _taker,
        bytes _orderData
    )
        public
        onlyAuthorized
    {
        uint256 scannedBytes = 32;
        while (scannedBytes < _orderData.length) {

            // Read the next transfer order
            address takerToken;
            uint256 takerTokenAmount;
            assembly {
                takerToken := mload(add(_orderData, scannedBytes))
                takerTokenAmount := mload(add(_orderData, add(scannedBytes, 32)))
            }

            executeTransfer(
                _taker,
                _tradeOriginator,
                takerToken,
                takerTokenAmount
            );

            // Update scanned bytes with header and body lengths
            scannedBytes = scannedBytes.add(TRANSFER_REQUEST_LENGTH);
        }
    }

    /* ============ Private ============ */
    
    function executeTransfer(
        address _taker,
        address _tradeOriginator,
        address _takerToken,
        uint256 _takerTokenAmount
    )
        private
    {
        ITransferProxy(transferProxy).transfer(
            _takerToken,
            _takerTokenAmount,
            _taker,
            vault
        );

        IVault(vault).incrementTokenOwner(
            _tradeOriginator,
            _takerToken,
            _takerTokenAmount
        );
    }
}
