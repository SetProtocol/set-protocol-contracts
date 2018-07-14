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
import { ERC20Wrapper } from "../../lib/ERC20Wrapper.sol";


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

    /* ============ Constants ============ */

    uint256 constant TRANSFER_REQUEST_LENGTH = 64;

    /* ============ Constructor ============ */

    constructor(
        address _transferProxy
    )
        public
    {
        transferProxy = _transferProxy;
    }

    /* ============ Public Functions ============ */

    function exchange(
        address _taker,
        uint _orderCount,
        bytes _orderData
    )
        public
        onlyAuthorized
        returns(address[], uint256[])
    {
        address[] memory takerTokens = new address[](_orderCount);
        uint256[] memory takerTokenAmounts = new uint256[](_orderCount);

        uint256 scannedBytes = 32;
        while (scannedBytes < _orderData.length) {

            // Read the next transfer order
            address takerToken;
            uint256 takerTokenAmount;
            assembly {
                takerToken := mload(add(_orderData, scannedBytes))
                takerTokenAmount := mload(add(_orderData, add(scannedBytes, 32)))
            }

            // Transfer from taker's wallet to this wrapper
            ITransferProxy(transferProxy).transfer(
                takerToken,
                takerTokenAmount,
                _taker,
                address(this)
            );

            // Ensure allowance of transfer from this wrapper to TransferProxy
            ERC20Wrapper.ensureAllowance(
                takerToken,
                address(this),
                transferProxy,
                takerTokenAmount
            );

            // Record taker token and amount to return values
            uint256 orderCount = scannedBytes >> 6;
            takerTokens[orderCount] = takerToken;
            takerTokenAmounts[orderCount] = takerTokenAmount;

            // Update scanned bytes with header and body lengths
            scannedBytes = scannedBytes.add(TRANSFER_REQUEST_LENGTH);
        }

        return (takerTokens, takerTokenAmounts);
    }
}
