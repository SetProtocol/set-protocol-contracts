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
 * @title SignatureLibrary
 * @author Set Protocol
 *
 * The Signature Library contains functions for validating signatures
 * This has been ripped from 0x with a few modifications
 */


library SignatureLibrary {
    using LibBytes for bytes;

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
        internal
        pure
    {
        require(
            _signature.length == 65,
            "SignatureLibrary.validateSignature: Signature Length must be 65"
        );
        uint8 v = uint8(_signature[0]);
        bytes32 r = _signature.readBytes32(1);
        bytes32 s = _signature.readBytes32(33);
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

        require(
            recAddress == _signerAddress,
            "OrderLibrary.validateSignature: Recovered signature mismatch"
        );
    }
}