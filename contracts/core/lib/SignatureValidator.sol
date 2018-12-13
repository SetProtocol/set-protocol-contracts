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

import { LibBytes } from "../../external/0x/LibBytes.sol";

/**
 * @title SignatureValidator
 * @author Set Protocol
 *
 * The Signature Validator contains functions for validating signatures
 * This has been ripped from 0x with a few modifications
 */


contract SignatureValidator {
    using LibBytes for bytes;

    uint256 public constant STANDARD_RSV_SIG_LENGTH = 65;

    /**
     * Validate order signature
     *
     * @param  _orderHash       Hash of issuance order
     * @param  _signerAddress   Address of Issuance Order signer
     * @param  _signature       Signature in bytes
     */
    function validateSignature(
        bytes32 _orderHash,
        address _signerAddress,
        bytes _signature
    )
        external
        pure
    {
        // The signature byte string must be length of 65.
        // v = 1 byte, r = 32 bytes, s = 32 bytes
        require(
            _signature.length == STANDARD_RSV_SIG_LENGTH,
            "SignatureValidator.validateSignature: Signature Length must be 65"
        );

        /**
         * The signature is encoded as follows
         *
         * | Data        | Offset   | Length       
         * |-------------|----------|---------
         * | v           | 0        | 1  
         * | r           | 1        | 32   
         * | s           | 33       | 32  
         */
        uint8 v = uint8(_signature[0]);
        bytes32 r = _signature.readBytes32(1);
        bytes32 s = _signature.readBytes32(33);
        
        // Recover address from the signature
        address recAddress = ecrecover(
            keccak256(
                abi.encodePacked(
                    "\x19Ethereum Signed Message:\n32",
                    _orderHash
                )
            ),
            v,
            r,
            s
        );

        // Ensure the signer address matches the recovered address
        require(
            recAddress == _signerAddress,
            "SignatureValidator.validateSignature: Recovered signature mismatch"
        );
    }
}