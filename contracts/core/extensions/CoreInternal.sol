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

import { Ownable } from "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import { CoreTimeLockUpgrade } from "../lib/CoreTimeLockUpgrade.sol";
import { CoreState } from "../lib/CoreState.sol";
import { AddressArrayUtils } from "../../lib/AddressArrayUtils.sol";


/**
 * @title Core Internal
 * @author Set Protocol
 *
 * The CoreInternal contract contains methods to alter state of variables that track
 * Core dependency addresses.
 */
contract CoreInternal is
    Ownable,
    CoreState,
    CoreTimeLockUpgrade
{
    using AddressArrayUtils for address[];

    /* ============ External Functions ============ */

    /**
     * Add a factory from the mapping of tracked factories.
     * Can only be called by owner of Core.
     *
     * @param  _factory   Address of the factory conforming to ISetFactory
     */
    function addFactory(
        address _factory
    )
        external
        onlyOwner
    {
        state.validFactories[_factory] = true;
    }

    /**
     * Remove a factory from the mapping of tracked factories.
     * Can only be called by owner of Core.
     *
     * @param  _factory   Address of the factory conforming to ISetFactory
     */
    function removeFactory(
        address _factory
    )
        external
        onlyOwner
    {
        state.validFactories[_factory] = false;
    }

    /**
     * Add an exchange address with the mapping of tracked exchanges.
     * Can only be called by owner of Core.
     *
     * @param _exchangeId   Enumeration of exchange within the mapping
     * @param _exchange     Address of the exchange conforming to IExchangeWrapper
     */
    function addExchange(
        uint8 _exchangeId,
        address _exchange
    )
        external
        onlyOwner
    {
        state.exchanges[_exchangeId] = _exchange;
    }

    /**
     * Remove an exchange address with the mapping of tracked exchanges.
     * Can only be called by owner of Core.
     *
     * @param _exchangeId   Enumeration of exchange within the mapping
     */
    function removeExchange(
        uint8 _exchangeId
    )
        external
        onlyOwner
    {
        state.exchanges[_exchangeId] = address(0);
    }

    /**
     * Add a module address with the mapping of tracked modules.
     * Can only be called by owner of Core.
     *
     * @param _module     Address of the module
     */
    function addModule(
        address _module
    )
        external
        onlyOwner
    {
        state.validModules[_module] = true;
    }

    /**
     * Remove a module address with the mapping of tracked modules.
     * Can only be called by owner of Core.
     *
     * @param _module   Enumeration of module within the mapping
     */
    function removeModule(
        address _module
    )
        external
        onlyOwner
    {
        state.validModules[_module] = false;
    }

    /**
     * Disables a Set from the mapping and array of tracked Sets.
     * Can only be called by owner of Core.
     *
     * @param  _set       Address of the Set
     */
    function disableSet(
        address _set
    )
        external
        onlyOwner
    {
        if (state.validSets[_set]) {
            state.setTokens = state.setTokens.remove(_set);

            state.validSets[_set] = false;

            state.disabledSets[_set] = true;
        }        
    }

    /**
     * Enables a Set from the mapping and array of tracked Sets if it has been previously disabled
     * Can only be called by owner of Core.
     *
     * @param  _set       Address of the Set
     */
    function reenableSet(
        address _set
    )
        external
        onlyOwner
    {
        if (state.disabledSets[_set]) {
            state.setTokens = state.setTokens.append(_set);

            state.validSets[_set] = true;

            state.disabledSets[_set] = false;
        }
    }

    /**
     * Add a price library from the mapping of tracked price libraries.
     * Can only be called by owner of Core.
     *
     * @param  _priceLibrary   Address of the price library
     */
    function addPriceLibrary(
        address _priceLibrary
    )
        external
        onlyOwner
    {
        state.validPriceLibraries[_priceLibrary] = true;
    }

    /**
     * Remove a price library from the mapping of tracked price libraries.
     * Can only be called by owner of Core.
     *
     * @param  _priceLibrary   Address of the price library
     */
    function removePriceLibrary(
        address _priceLibrary
    )
        external
        onlyOwner
    {
        state.validPriceLibraries[_priceLibrary] = false;
    }

    /**
     * Update protocol fee.
     * Can only be called by owner of Core.
     *
     * @param  _fee   Protocol fee in basis points of manager's rebalancing fee
     */
    function setProtocolFee(
        uint256 _fee
    )
        external
        onlyOwner
    {
        state.protocolFee = _fee;
    }

    /**
     * Change address that rebalancing protocol fees accrue to.
     * Can only be called by owner of Core.
     *
     * @param  _feeRecipient   The fee recipient address
     */
    function setProtocolFeeRecipient(
        address _feeRecipient
    )
        external
        onlyOwner
    {
        state.protocolAddress = _feeRecipient;
    }

    /**
     * Change address of the Signature Validator contract
     *
     * @param  _signatureValidator   Address of the Signature Validator library
     */
    function setSignatureValidator(
        address _signatureValidator
    )
        external
        onlyOwner
    {
        state.signatureValidator = _signatureValidator;
    }

    /**
     * Change timeLockPeriod period. Can only be called once after all libraries and modules
     * have been added.
     *
     * @param  _timeLockPeriod   Time in seconds that upgrades need to be evaluated before execution
     */
    function setTimeLockPeriod(
        uint256 _timeLockPeriod
    )
        external
        onlyOwner
    {
        // Only allow setting of the timeLockPeriod the first time
        if (state.timeLockPeriod == 0) {
            state.timeLockPeriod = _timeLockPeriod;    
        }
    }
}
