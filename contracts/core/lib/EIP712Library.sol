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
 * @title EIP712Library
 * @author Set Protocol
 *
 * The EIP712 Library contains functions for hashing EIP712 Messages
 *
 */
library EIP712Library {
    /* ============ Constants ============ */

    // EIP191 header for EIP712 prefix
    string constant internal EIP191_HEADER = "\x19\x01";

    // EIP712 Domain Name value
    string constant internal EIP712_DOMAIN_NAME = "Set Protocol";

    // EIP712 Domain Version value
    string constant internal EIP712_DOMAIN_VERSION = "1";

    // Hash of the EIP712 Domain Separator Schema
    bytes32 constant internal EIP712_DOMAIN_SEPARATOR_SCHEMA_HASH = keccak256(
        abi.encodePacked(
            "EIP712Domain(",
            "string name,",
            "string version,",
            ")"
        )
    );

    bytes32 constant internal EIP712_DOMAIN_HASH = keccak256(
        abi.encodePacked(
            EIP712_DOMAIN_SEPARATOR_SCHEMA_HASH,
            keccak256(
                bytes(EIP712_DOMAIN_NAME)
            ),
            keccak256(
                bytes(EIP712_DOMAIN_VERSION)
            )
        )
    );

    /* ============ Internal Functions ============ */

    /**
     * Calculates    EIP712 encoding for a hash struct in this EIP712 Domain.
     * @param        hashStruct The EIP712 hash struct.
     * @return       EIP712 hash applied to this EIP712 Domain.
     */
    function hashEIP712Message(bytes32 hashStruct)
        internal
        pure
        returns (bytes32)
    {
        bytes32 eip712DomainHash = EIP712_DOMAIN_HASH;

        // Assembly for more efficient computing:
        // keccak256(abi.encodePacked(
        //     EIP191_HEADER,
        //     EIP712_DOMAIN_HASH,
        //     hashStruct    
        // ));

        bytes32 result;

        assembly {
            // Load free memory pointer
            let memPtr := mload(64)

            mstore(memPtr, 0x1901000000000000000000000000000000000000000000000000000000000000)  // EIP191 header
            mstore(add(memPtr, 2), eip712DomainHash)                                            // EIP712 domain hash
            mstore(add(memPtr, 34), hashStruct)                                                 // Hash of struct

            // Compute hash
            result := keccak256(memPtr, 66)
        }
        return result;
    }

    /**
     * Returns the EIP712 Domain Hash
     *
     * @return bytes32          Hash of the EIP712 Set Protocol Domain
     */
    function getEIP712DomainHash() internal view returns (bytes32) {
        return EIP712_DOMAIN_HASH;
    }
    /**
     * Returns the EIP712 Domain Separator Schema Hash
     *
     * @return bytes32          Hash of the EIP712 Domain Separator Schema
     */
    function getEIP712DomainSeparatorSchemaHash() internal view returns (bytes32) {
        return EIP712_DOMAIN_SEPARATOR_SCHEMA_HASH;
    }
}
