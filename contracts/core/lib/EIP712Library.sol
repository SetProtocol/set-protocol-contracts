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


/**
 * @title EIP712Library
 * @author Set Protocol
 *
 * The EIP712 Library contains functions for hashing EIP712 Messages
 *
 */
library EIP712Library {
    /* ============ Constants ============ */

    /**
      * The EIP712 Domain hash for Set Protocol. It is hard coded for gas efficiency.
      * Learn more about the standard here: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md
      * The EIP Domain hash is calculated using the following code:
      * 
      * string EIP712_DOMAIN_NAME = "Set Protocol";
      * string EIP712_DOMAIN_VERSION = "1";
      * bytes32 EIP712_DOMAIN_SEPARATOR_SCHEMA_HASH = keccak256(
      *     abi.encodePacked(
      *         "EIP712Domain(",
      *         "string name,",
      *         "string version,",
      *         ")"
      *     )
      * );
      * bytes32 constant internal EIP712_DOMAIN_HASH = keccak256(
      *      abi.encodePacked(
      *          EIP712_DOMAIN_SEPARATOR_SCHEMA_HASH,
      *          keccak256(bytes(EIP712_DOMAIN_NAME)),
      *          keccak256(bytes(EIP712_DOMAIN_VERSION))
      *      )
      *  );
      */
    bytes32 constant internal EIP712_DOMAIN_HASH = 0xa8dcc602486c63f3c678c9b3c5d615c4d6ab4b7d51868af6881272b5d8bb31ff;

    /* ============ Internal Functions ============ */

    /**
     * Calculates    EIP712 encoding for a hash struct in this EIP712 Domain.
     * @param        hashStruct The EIP712 hash struct.
     * @return       EIP712 hash applied to this EIP712 Domain.
     */
    function hashEIP712Message(
        bytes32 hashStruct
    )
        internal
        pure
        returns (bytes32)
    {
        bytes32 eip712DomainHash = EIP712_DOMAIN_HASH;
        
        bytes32 result;

        assembly {
            // Load free memory pointer
            let memPtr := mload(64)

            mstore(memPtr, 0x1901000000000000000000000000000000000000000000000000000000000000)  // EIP191 header equivalent of \x19\x01
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
    function getEIP712DomainHash()
        internal
        pure
        returns (bytes32)
    {
        return EIP712_DOMAIN_HASH;
    }
}
