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

pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { ICore} from "../interfaces/ICore.sol";
import { ISetToken} from "../interfaces/ISetToken.sol";


library SetTokenLibrary {
    using SafeMath for uint256;

    struct SetDetails {
        uint256 naturalUnit;
        address[] components;
        uint256[] units;
    }

    /**
     * Validates that passed in tokens are all components of the Set
     *
     * @param _set                      Address of the Set
     * @param _tokens                   List of tokens to check
     */
    function validateTokensAreComponents(
        address _set,
        address[] calldata _tokens
    )
        external
        view
    {
        for (uint256 i = 0; i < _tokens.length; i++) {
            // Make sure all tokens are members of the Set
            require(
                ISetToken(_set).tokenIsComponent(_tokens[i]),
                "SetTokenLibrary.validateTokensAreComponents: Component must be a member of Set"
            );

        }
    }

    /**
     * Validates that passed in quantity is a multiple of the natural unit of the Set.
     *
     * @param _set                      Address of the Set
     * @param _quantity                 Quantity to validate
     */
    function isMultipleOfSetNaturalUnit(
        address _set,
        uint256 _quantity
    )
        external
        view
    {
        require(
            _quantity.mod(ISetToken(_set).naturalUnit()) == 0,
            "SetTokenLibrary.isMultipleOfSetNaturalUnit: Quantity is not a multiple of nat unit"
        );
    }

    /**
     * Validates that passed in quantity is a multiple of the natural unit of the Set.
     *
     * @param _core                     Address of Core
     * @param _set                      Address of the Set
     */
    function requireValidSet(
        ICore _core,
        address _set
    )
        internal
        view
    {
        require(
            _core.validSets(_set),
            "SetTokenLibrary: Must be an approved SetToken address"
        );
    }

    /**
     * Retrieves the Set's natural unit, components, and units.
     *
     * @param _set                      Address of the Set
     * @return SetDetails               Struct containing the natural unit, components, and units
     */
    function getSetDetails(
        address _set
    )
        internal
        view
        returns (SetDetails memory)
    {
        // Declare interface variables
        ISetToken setToken = ISetToken(_set);

        // Fetch set token properties
        uint256 naturalUnit = setToken.naturalUnit();
        address[] memory components = setToken.getComponents();
        uint256[] memory units = setToken.getUnits();

        return SetDetails({
            naturalUnit: naturalUnit,
            components: components,
            units: units
        });
    }
}