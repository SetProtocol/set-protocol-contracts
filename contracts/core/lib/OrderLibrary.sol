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
 * @title OrderLibrary
 * @author Set Protocol
 *
 * The Order Library contains functions for checking validation and hashing of Orders.
 *
 */

library OrderLibrary {

    /* ============ Structs ============ */

    struct IssuanceOrder {
        address setAddress;             // _addresses[0]
        uint256 quantity;               // _values[0]
        address makerAddress;           // _addresses[1]
        address makerToken;             // _addresses[2]
        uint256 makerTokenAmount;       // _values[1]
        uint256 expiration;             // _values[2]
        address relayerToken;           // _addresses[3]
        uint256 relayerTokenAmount;     // _values[3]
        uint256 salt;                   // _values[4]
        bytes32 orderHash;
    }

    /* ============ Internal Functions ============ */

    /**
     * Create hash of order parameters
     *
     * @param  _addresses       [setAddress, makerAddress, makerToken, relayerToken]
     * @param  _values          [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]
     */
    function generateOrderHash(
        address[4] _addresses,
        uint[5] _values
    )
        internal
        pure
        returns(bytes32)
    {
        // Hash the order parameters
        return keccak256(
            abi.encodePacked(
                _addresses[0], // setAddress
                _addresses[1], // makerAddress
                _addresses[2], // makerToken
                _addresses[3], // relayerToken
                _values[0],    // quantity
                _values[1],    // makerTokenAmount
                _values[2],    // expiration
                _values[3],    // relayerTokenAmount
                _values[4]     // salt
            )
        );
    }

    /**
     * Validate order signature
     *
     * @param  _orderHash       Hash of issuance order
     * @param  _signerAddress   Address of Issuance Order signer
     * @param  _v               v element of ECDSA signature
     * @param  _r               r element of ECDSA signature
     * @param  _s               s element of ECDSA signature
     */
    function validateSignature(
        bytes32 _orderHash,
        address _signerAddress,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    )
        internal
        pure
        returns(bool)
    {
        // Public address returned by ecrecover function
        address recAddress;

        // Ethereum msg prefix
        bytes memory msgPrefix = "\x19Ethereum Signed Message:\n32";

        // Find what address signed the order
        recAddress = ecrecover(
            keccak256(abi.encodePacked(msgPrefix, _orderHash)),
            _v,
            _r,
            _s
        );

        return recAddress == _signerAddress;
    }

}
