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

pragma solidity 0.4.25;
pragma experimental "ABIEncoderV2";

import { Ownable } from "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { ERC20Wrapper } from "../../lib/ERC20Wrapper.sol";
import { ICore } from "../interfaces/ICore.sol";
import { ITransferProxy } from "../interfaces/ITransferProxy.sol";
import { LibBytes } from "../../external/0x/LibBytes.sol";


/**
 * @title TakerWalletWrapper
 * @author Set Protocol
 *
 * The TakerWalletWrapper contract wrapper to transfer tokens directly from order taker
 */
contract TakerWalletWrapper is 
    Ownable
{
    using LibBytes for bytes;
    using SafeMath for uint256;

    /* ============ State Variables ============ */

    address public core;
    address public transferProxy;

    /* ============ Constructor ============ */

    /**
     * Sets the transferProxy and Core address for the contract
     *
     * @param _core                 Deployed Core contract
     * @param _transferProxy        Address of current transferProxy
     */
    constructor(
        address _core,
        address _transferProxy
    )
        public
    {
        core = _core;
        transferProxy = _transferProxy;
    }

    /* ============ Public Functions ============ */

    /**
     * IExchange interface delegate method.
     * Parses taker wallet orders and transfers tokens from taker's wallet.
     *
     * -- Unused address of issuance order signer to conform to IExchangeWrapper --
     * @param  _taker            Taker wallet to transfer components from
     * -- Unused address of maker token used in exchange orders --
     * -- Unused amount of issuance order maker token to use on this exchange --
     * @param  _orderCount       Amount of orders in exchange request
     * @param  _transfersData    Encoded taker wallet order data
     * @return address[]         Array of token addresses executed in orders
     * @return uint256[]         Array of token amounts executed in orders
     */
    function exchange(
        address,
        address _taker,
        address,
        uint256,
        uint256 _orderCount,
        bytes _transfersData
    )
        external
        returns(address[], uint256[])
    {
        require(
            ICore(core).validModules(msg.sender),
            "TakerWalletWrapper.exchange: Sender must be approved module"
        );

        address[] memory takerTokens = new address[](_orderCount);
        uint256[] memory takerTokenAmounts = new uint256[](_orderCount);

        uint256 scannedBytes = 0;
        while (scannedBytes < _transfersData.length) {
            // Record taker token and amount to return values
            uint256 orderCount = scannedBytes >> 6;

            // Transfer the tokens from the taker
            (takerTokens[orderCount], takerTokenAmounts[orderCount]) = transferFromTaker(
                _taker,
                scannedBytes,
                _transfersData
            );

            // Update scanned bytes with length of each transfer request (64)
            scannedBytes = scannedBytes.add(64);
        }

        return (takerTokens, takerTokenAmounts);
    }

    /* ============ Private ============ */

    /**
     * Parses and executes transfer from the issuance order taker's wallet
     *
     * @param  _taker            Taker wallet to transfer components from
     * @param  _offset           Offset to start scanning for current transfer
     * @param  _transfersData    Byte array of (multiple) taker wallet transfers
     * @return address           Address of token transferred
     * @return uint256           Amount of the token transferred
     */
    function transferFromTaker(
        address _taker,
        uint256 _offset,
        bytes _transfersData
    )
        private
        returns (address, uint256)
    {
        uint256 transferDataStart = _offset.add(32);

        // Read the next transfer
        address takerToken;
        uint256 takerTokenAmount;
        assembly {
            takerToken := mload(add(_transfersData, transferDataStart))
            takerTokenAmount := mload(add(_transfersData, add(transferDataStart, 32)))
        }

        // Transfer from taker's wallet to this wrapper
        ITransferProxy(transferProxy).transfer(
            takerToken,
            takerTokenAmount,
            _taker,
            address(this)
        );

        // Ensure the component token is allowed to be transferred by Set TransferProxy
        ERC20Wrapper.ensureAllowance(
            takerToken,
            address(this),
            transferProxy,
            takerTokenAmount
        );

        return (takerToken, takerTokenAmount);
    }
}
