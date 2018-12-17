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

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { EIP712Library } from "./EIP712Library.sol";
import { ExchangeValidationLibrary } from "./ExchangeValidationLibrary.sol";
import { ICore } from "../interfaces/ICore.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";


/**
 * @title OrderLibrary
 * @author Set Protocol
 *
 * The Order Library contains functions for checking validation and hashing of Issuance Orders.
 *
 */

library OrderLibrary {
    using SafeMath for uint256;

    /* ============ Constants ============ */

    // Hash for the EIP712 Order Schema
    bytes32 constant public EIP712_ORDER_SCHEMA_HASH = keccak256(
        abi.encodePacked(
            "IssuanceOrder(",
            "address setAddress",
            "address makerAddress",
            "address makerToken",
            "address relayerAddress",
            "address relayerToken",
            "uint256 quantity",
            "uint256 makerTokenAmount",
            "uint256 expiration",
            "uint256 makerRelayerFee",
            "uint256 takerRelayerFee",
            "uint256 salt",
            "address[] requiredComponents",
            "uint256[] requiredComponentAmounts",
            ")"
        )
    );

    /* ============ Structs ============ */

    /**
     * Struct containing all parameters for the issuance order
     *
     * @param  setAddress                   Set the maker wants to mint
     * @param  makerAddress                 Address of maker of the Issuance Order
     * @param  makerToken                   Address of token maker wants to exchange for filling issuance order
     * @param  relayerAddress               Address of relayer
     * @param  relayerToken                 Token relayer wants to be compensated in
     * @param  quantity                     Amount of Sets maker is looking to mint
     * @param  makerTokenAmount             Amount of makerToken to be used to fill the order
     * @param  expiration                   Timestamp marking when the order expires
     * @param  makerRelayerFee              Amount of relayer tokens maker must pay for execution
     * @param  takerRelayerFee              Amount of relayer tokens taker must pay for execution
     * @param  salt                         Random number used to create unique orderHash
     * @param  requiredComponents           Components to be acquired by taker's exchange orders
     * @param  requiredComponentAmounts     Amounts of each component to be acquired by exchange order
     */
    struct IssuanceOrder {
        address setAddress;
        address makerAddress;
        address makerToken;
        address relayerAddress;
        address relayerToken;
        uint256 quantity;
        uint256 makerTokenAmount;
        uint256 expiration;
        uint256 makerRelayerFee;
        uint256 takerRelayerFee;
        uint256 salt;
        address[] requiredComponents;
        uint256[] requiredComponentAmounts;
    }

    /**
     * Struct containing the metadata around the fraction of the fillQuantity that is
     * completed
     *
     * @param  filled                    Quantity of Set to be filled in the issuance order
     * @param  attempted                 Quantity of Set intended to fill
     */
    struct FractionFilled {
        uint256 filled;
        uint256 attempted;
    }

    /* ============ Internal Functions ============ */

    /**
      * Calculates Keccak-256 hash of the order with the EIP712 Domain and an EIP712 hash of order parameters
      *  
      * @param  _order             Struct conforming to IssuanceOrder interface
      * @return bytes32            EIP712 Hash of IssuanceOrder applied to the EIP712 Domain
      */
    function generateOrderHash(
        OrderLibrary.IssuanceOrder memory _order
    )
        internal
        pure
        returns (bytes32)
    {
        return EIP712Library.hashEIP712Message(
          keccak256(
            abi.encodePacked(
                EIP712_ORDER_SCHEMA_HASH,
                _order.setAddress,
                _order.makerAddress,
                _order.makerToken,
                _order.relayerAddress,
                _order.relayerToken,
                _order.quantity,
                _order.makerTokenAmount,
                _order.expiration,
                _order.makerRelayerFee,
                _order.takerRelayerFee,
                _order.salt,
                _order.requiredComponents,
                _order.requiredComponentAmounts
            )
          )
        );
    }

    /**
     * Validate order params are still valid and return amount that can still be
     * executed (after previous fills and cancels accounted for)
     *
     * @param  _order              IssuanceOrder object containing order params
     * @param  _core               Address of the Set Protocol Core contract
     */
    function validateOrder(
        OrderLibrary.IssuanceOrder _order,
        address _core
    )
        public
        view
    {
        // Verify Set was created by Core and is enabled
        require(
            ICore(_core).validSets(_order.setAddress),
            "OrderLibrary.validateOrder: Invalid or disabled SetToken address"
        );

        // Make sure makerTokenAmount is greater than 0
        require(
            _order.makerTokenAmount > 0,
            "OrderLibrary.validateOrder: Maker token amount must be positive"
        );

        // Make sure the order hasn't expired
        require(
            block.timestamp <= _order.expiration,
            "OrderLibrary.validateOrder: Order expired"
        );

        // Declare set interface variable   
        ISetToken set = ISetToken(_order.setAddress);

        // Validate the issue quantity    
        ExchangeValidationLibrary.validateIssueQuantity(   
            set,   
            _order.quantity    
        ); 
 
        // Validate validity of required component fields and amounts 
        ExchangeValidationLibrary.validateRequiredComponents(  
            set, 
           _order.requiredComponents,   
           _order.requiredComponentAmounts  
        );
    }

    /**
     * Checks for rounding errors and returns value of potential partial amounts of a principal
     *
     * @param  _principal       Number fractional amount is derived from
     * @param  _numerator       Numerator of fraction
     * @param  _denominator     Denominator of fraction
     * @return uint256          Fractional amount of principal calculated
     */
    function getPartialAmount(
        uint256 _principal,
        uint256 _numerator,
        uint256 _denominator
    )
        internal
        pure
        returns (uint256)
    {
        // Get remainder of partial amount (if 0 not a partial amount)
        uint256 remainder = mulmod(_principal, _numerator, _denominator);

        // Return if not a partial amount
        if (remainder == 0) {
            return _principal.mul(_numerator).div(_denominator);
        }

        // Calculate error percentage
        uint256 errPercentageTimes1000000 = remainder.mul(1000000).div(_numerator.mul(_principal));

        // Require error percentage is less than 0.1%.
        require(
            errPercentageTimes1000000 < 1000,
            "OrderLibrary.getPartialAmount: Rounding error exceeds bounds"
        );

        return _principal.mul(_numerator).div(_denominator);
    }

    /**
     * Returns the EIP712 Issuance Order Schema Hash
     *
     * @return bytes32          Hash of the Issuance Order Schema
     */
    function getEIP712OrderSchemaHash()
        internal
        pure
        returns (bytes32)
    {
        return EIP712_ORDER_SCHEMA_HASH;
    }
}
