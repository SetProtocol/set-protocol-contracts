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


import { SafeMath } from "zeppelin-solidity/contracts/math/SafeMath.sol";
import { CoreModifiers } from "../lib/CoreSharedModifiers.sol";
import { ICoreIssuance } from "../interfaces/ICoreIssuance.sol";
import { OrderLibrary } from "../lib/OrderLibrary.sol";


/**
 * @title CoreIssuanceOrder
 * @author Set Protocol
 *
 * The Core Issuance Order extension houses all functions related to the filling and
 * canceling issuance orders.
 *
 */
contract CoreIssuanceOrder is
    CoreModifiers,
    ICoreIssuance
{
    using SafeMath for uint256;

    /* ============ Constants ============ */

    string constant INVALID_SIGNATURE = "Invalid order signature.";
    string constant INVALID_TOKEN_AMOUNTS = "Quantity and makerTokenAmount should be greater than 0.";
    string constant ORDER_EXPIRED = "This order has expired.";

    /* ============ External Functions ============ */

    /**
     * Fill an issuance order
     *
     * @param  _addresses       [setAddress, makerAddress, makerToken, relayerToken]
     * @param  _values          [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]
     * @param  _fillQuantity    Quantity of set to be filled
     * @param  _v               v element of ECDSA signature
     * @param  _r               r element of ECDSA signature
     * @param  _s               s element of ECDSA signature
     */
    function fillOrder(
        address[4] _addresses,
        uint[5] _values,
        uint _fillQuantity,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    )
        external
        isValidSet(_addresses[0])
        isPositiveQuantity(_fillQuantity)
        isNaturalUnitMultiple(_fillQuantity, _addresses[0])
    {

        OrderLibrary.IssuanceOrder memory order = OrderLibrary.IssuanceOrder({
            setAddress: _addresses[0],
            quantity: _values[0],
            makerAddress: _addresses[1],
            makerToken: _addresses[2],
            makerTokenAmount: _values[1],
            expiration: _values[2],
            relayerToken: _addresses[3],
            relayerTokenAmount: _values[3],
            salt: _values[4],
            orderHash: OrderLibrary.generateOrderHash(
                _addresses,
                _values
            )
        });

        // Verify order is valid
        validateOrder(
            order,
            _fillQuantity
        );

        // Verify signature is authentic
        require(
            OrderLibrary.validateSignature(
                order.orderHash,
                order.makerAddress,
                _v,
                _r,
                _s
            ),
            INVALID_SIGNATURE
        );

        //Issue Set
        issueInternal(
            order.makerAddress,
            order.setAddress,
            _fillQuantity
        );
    }

    /* ============ Internal Functions ============ */

    /**
     * Validate order params are still valid
     *
     * @param  _order           IssuanceOrder object containing order params
     * @param  _fillQuantity    Quantity of Set to be filled
     */
    function validateOrder(
        OrderLibrary.IssuanceOrder _order,
        uint _fillQuantity
    )
        internal
        view
    {
        // Make sure makerTokenAmount and Set Token to issue is greater than 0.
        require(
            _order.makerTokenAmount > 0 && _order.quantity > 0,
            INVALID_TOKEN_AMOUNTS
        );
        // Make sure the order hasn't expired
        require(
            block.timestamp <= _order.expiration,
            ORDER_EXPIRED
        );
        // TO DO: Check to see if filled
    }
}
