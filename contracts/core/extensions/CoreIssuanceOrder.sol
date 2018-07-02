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
import { LibBytes } from "../../external/LibBytes.sol";


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
    using LibBytes for bytes;

    string constant INVALID_SIGNATURE = "Invalid order signature.";

    struct IssuanceOrder {
        address setAddress;
        uint256 quantity;
        address makerAddress;
        address makerToken;
        uint256 makerTokenAmount;
        uint256 expiration;
        address relayerToken;
        uint256 relayerTokenAmount;
        uint256 salt;
        bytes32 orderHash;
    }

    function fillOrder(
        address[4] _addresses,
        uint[5] _values,
        uint _fillQuantity,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    )
        public
        isValidSet(_addresses[0])
        isPositiveQuantity(_fillQuantity)
        isNaturalUnitMultiple(_fillQuantity, _addresses[0])
    {

        IssuanceOrder memory order = IssuanceOrder({
            setAddress: _addresses[0],
            quantity: _values[0],
            makerAddress: _addresses[1],
            makerToken: _addresses[2],
            makerTokenAmount: _values[1],
            expiration: _values[2],
            relayerToken: _addresses[3],
            relayerTokenAmount: _values[3],
            salt: _values[4],
            orderHash: generateOrderHash(
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
            validateSignature(
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

    function generateOrderHash(
        address[4] _addresses,
        uint[5] _values
    )
        public
        returns(bytes32)
    {
        return keccak256(
            abi.encodePacked(
                _addresses[0], //setAddress
                _addresses[1], //makerAddress
                _addresses[2], //makerToken
                _addresses[3], //relayerToken
                _values[0],    //quantity
                _values[1],    //makerTokenAmount
                _values[2],    //expiration
                _values[3],    //relayerTokenAmount
                _values[4]     //salt
            )
        );
    }

    function validateOrder(
        IssuanceOrder _order,
        uint _fillQuantity
    )
        internal
    {
        require(_order.makerTokenAmount > 0 && _order.quantity > 0);
        require(block.timestamp <= _order.expiration);
        // Check to see if filled
    }

    function validateSignature(
        bytes32 _orderHash,
        address _signerAddress,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    )
        public
        returns(bool)
    {
        address recAddress;

        bytes memory msgPrefix = "\x19Ethereum Signed Message:\n32";

        recAddress = ecrecover(
            keccak256(abi.encodePacked(msgPrefix, _orderHash)),
            _v,
            _r,
            _s
        );

        return recAddress == _signerAddress;
    }
}
