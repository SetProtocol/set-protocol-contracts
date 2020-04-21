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

import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { AddressArrayUtils } from "set-protocol-contract-utils/contracts/lib/AddressArrayUtils.sol";

import { IAuctionPriceCurve } from "../../lib/auction-price-libraries/IAuctionPriceCurve.sol";
import { ICore } from "../../interfaces/ICore.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { IVault } from "../../interfaces/IVault.sol";
import { RebalancingLibrary } from "../../lib/RebalancingLibrary.sol";
import { SetTokenLibrary } from "../../lib/SetTokenLibrary.sol";

/**
 * @title StartRebalanceLibrary
 * @author Set Protocol
 *
 * Default implementation of Rebalancing Set Token startRebalance function
 */


library StartRebalanceLibrary {
    using SafeMath for uint256;
    using AddressArrayUtils for address[];

    /* ============ Internal Functions ============ */

    /**
     * Function used to validate time passed to start a rebalance
     *
     * @param _proposalStartTime    Start time of proposal period
     * @param _proposalPeriod       Required length of proposal period
     * @param _rebalanceState       State rebalancing set token is in
     */
    function validateStartRebalance(
        uint256 _proposalStartTime,
        uint256 _proposalPeriod,
        uint8 _rebalanceState
    )
        external
    {
        // Must be in "Proposal" state before going into "Rebalance" state
        require(
            _rebalanceState == uint8(RebalancingLibrary.State.Proposal),
            "RebalancingSetToken.validateStartRebalance: State must be Proposal"
        );

        // Be sure the full proposal period has elapsed
        require(
            block.timestamp >= _proposalStartTime.add(_proposalPeriod),
            "RebalancingSetToken.validateStartRebalance: Proposal period not elapsed"
        );
    }

    /**
     * Function used to validate inputs to propose function and initialize biddingParameters struct
     *
     * @param _currentSet           Address of current Set
     * @param _nextSet              Address of next Set
     * @param _auctionLibrary       Address of auction library being used in rebalance
     * @param _coreAddress          Core address
     * @param _vaultAddress         Vault address
     * @return                      Struct containing bidding parameters
     */
    function redeemCurrentSetAndGetBiddingParameters(
        address _currentSet,
        address _nextSet,
        address _auctionLibrary,
        address _coreAddress,
        address _vaultAddress
    )
        public
        returns (RebalancingLibrary.BiddingParameters memory)
    {
        // Redeem rounded quantity of current Sets and return redeemed amount of Sets
        uint256 remainingCurrentSets = redeemCurrentSet(
            _currentSet,
            _coreAddress,
            _vaultAddress
        );

        // Create combined array data structures and calculate minimum bid needed for auction
        RebalancingLibrary.BiddingParameters memory biddingParameters = setUpBiddingParameters(
            _currentSet,
            _nextSet,
            _auctionLibrary,
            remainingCurrentSets
        );

        return biddingParameters;
    }

    /**
     * Create struct that holds array representing all components in currentSet and nextSet.
     * Calcualate unit difference between both sets relative to the largest natural
     * unit of the two sets. Calculate minimumBid.
     *
     * @param _currentSet           Address of current Set
     * @param _nextSet              Address of next Set
     * @param _auctionLibrary       Address of auction library being used in rebalance
     * @param _remainingCurrentSets Quantity of Current Sets redeemed
     * @return                      Struct containing bidding parameters
     */
    function setUpBiddingParameters(
        address _currentSet,
        address _nextSet,
        address _auctionLibrary,
        uint256 _remainingCurrentSets
    )
        public
        returns (RebalancingLibrary.BiddingParameters memory)
    {
        // Get set details for currentSet and nextSet (units, components, natural units)
        SetTokenLibrary.SetDetails memory currentSet = SetTokenLibrary.getSetDetails(_currentSet);
        SetTokenLibrary.SetDetails memory nextSet = SetTokenLibrary.getSetDetails(_nextSet);

        // Create combinedTokenArray
        address[] memory combinedTokenArray = currentSet.components.union(
            nextSet.components
        );

        // Calcualate minimumBid
        uint256 minimumBid = calculateMinimumBid(
            currentSet.naturalUnit,
            nextSet.naturalUnit,
            _auctionLibrary
        );

        // Require remainingCurrentSets to be greater than minimumBid otherwise no bidding would
        // be allowed
        require(
            _remainingCurrentSets >= minimumBid,
            "RebalancingSetToken.setUpBiddingParameters: Not enough collateral to rebalance"
        );

        // Create memory version of combinedNextSetUnits and combinedCurrentUnits to only make one
        // call to storage once arrays have been created
        uint256[] memory combinedCurrentUnits;
        uint256[] memory combinedNextSetUnits;
        (
            combinedCurrentUnits,
            combinedNextSetUnits
        ) = calculateCombinedUnitArrays(
            currentSet,
            nextSet,
            minimumBid,
            _auctionLibrary,
            combinedTokenArray
        );

        // Build Bidding Parameters struct and return
        return RebalancingLibrary.BiddingParameters({
            minimumBid: minimumBid,
            remainingCurrentSets: _remainingCurrentSets,
            combinedCurrentUnits: combinedCurrentUnits,
            combinedNextSetUnits: combinedNextSetUnits,
            combinedTokenArray: combinedTokenArray
        });
    }

    /**
     * Calculate the minimumBid allowed for the rebalance
     *
     * @param _currentSetNaturalUnit    Natural unit of currentSet
     * @param _nextSetNaturalUnit       Natural of nextSet
     * @param _auctionLibrary           Address of auction library being used in rebalance
     * @return                          Minimum bid amount
     */
    function calculateMinimumBid(
        uint256 _currentSetNaturalUnit,
        uint256 _nextSetNaturalUnit,
        address _auctionLibrary
    )
        private
        view
        returns (uint256)
    {
        // Get priceDivisor from auctionLibrary
        uint256 priceDivisor = IAuctionPriceCurve(_auctionLibrary).priceDivisor();

        return Math.max(
            _currentSetNaturalUnit.mul(priceDivisor),
            _nextSetNaturalUnit.mul(priceDivisor)
        );
    }

    /**
     * Create arrays that represent all components in currentSet and nextSet.
     * Calcualate unit difference between both sets relative to the largest natural
     * unit of the two sets.
     *
     * @param _currentSet               Information on currentSet
     * @param _nextSet                  Information on nextSet
     * @param _minimumBid               Minimum bid amount
     * @param _auctionLibrary           Address of auction library being used in rebalance
     * @param _combinedTokenArray       Array of component tokens involved in rebalance
     * @return                          Unit inflow/outflow arrays for current and next Set
     */
    function calculateCombinedUnitArrays(
        SetTokenLibrary.SetDetails memory _currentSet,
        SetTokenLibrary.SetDetails memory _nextSet,
        uint256 _minimumBid,
        address _auctionLibrary,
        address[] memory _combinedTokenArray
    )
        public
        returns (uint256[] memory, uint256[] memory)
    {
        // Create memory version of combinedNextSetUnits and combinedCurrentUnits to only make one
        // call to storage once arrays have been created
        uint256[] memory memoryCombinedCurrentUnits = new uint256[](_combinedTokenArray.length);
        uint256[] memory memoryCombinedNextSetUnits = new uint256[](_combinedTokenArray.length);

        for (uint256 i = 0; i < _combinedTokenArray.length; i++) {
            memoryCombinedCurrentUnits[i] = calculateCombinedUnit(
                _currentSet,
                _minimumBid,
                _auctionLibrary,
                _combinedTokenArray[i]
            );

            memoryCombinedNextSetUnits[i] = calculateCombinedUnit(
                _nextSet,
                _minimumBid,
                _auctionLibrary,
                _combinedTokenArray[i]
            );
        }

        return (memoryCombinedCurrentUnits, memoryCombinedNextSetUnits);
    }

    /**
     * Calculations the unit amount of Token to include in the the combined Set units.
     *
     * @param _setToken                 Information on the SetToken
     * @param _minimumBid               Minimum bid amount
     * @param _auctionLibrary           Address of auction library being used in rebalance
     * @param _currentComponent         Current component in iteration
     * @return                          Unit inflow/outflow
     */
    function calculateCombinedUnit(
        SetTokenLibrary.SetDetails memory _setToken,
        uint256 _minimumBid,
        address _auctionLibrary,
        address _currentComponent
    )
        private
        returns (uint256)
    {
        // Check if component in arrays and get index if it is
        uint256 indexCurrent;
        bool isComponent;
        (indexCurrent, isComponent) = _setToken.components.indexOf(_currentComponent);

        // Compute unit amounts of token in Set
        if (isComponent) {
            return computeTransferValue(
                _setToken.units[indexCurrent],
                _setToken.naturalUnit,
                _minimumBid,
                _auctionLibrary
            );
        }

        return 0;
    }

    /**
     * Calculates the maximum redemption quantity and redeems the Set into the vault.
     * Also updates remainingCurrentSets state variable
     *
     * @param _currentSet           Address of current Set
     * @param _coreAddress          Core address
     * @param _vaultAddress         Vault address
     * @return                      Amount of currentSets remaining
     */
    function redeemCurrentSet(
        address _currentSet,
        address _coreAddress,
        address _vaultAddress
    )
        public
        returns (uint256)
    {
        // Get remainingCurrentSets and make it divisible by currentSet natural unit
        uint256 currentSetBalance = IVault(_vaultAddress).getOwnerBalance(
            _currentSet,
            address(this)
        );

        // Calculates the set's natural unit
        uint256 currentSetNaturalUnit = ISetToken(_currentSet).naturalUnit();

        // Rounds the redemption quantity to a multiple of the current Set natural unit and sets variable
        uint256 remainingCurrentSets = currentSetBalance.div(currentSetNaturalUnit).mul(currentSetNaturalUnit);

        ICore(_coreAddress).redeemInVault(
            _currentSet,
            remainingCurrentSets
        );

        return remainingCurrentSets;
    }

   /**
     * Function to calculate the transfer value of a component given a standardized bid amount
     * (minimumBid/priceDivisor)
     *
     * @param   _unit           Units of the component token
     * @param   _naturalUnit    Natural unit of the Set token
     * @param   _minimumBid     Minimum bid amount
     * @return  uint256         Amount of tokens per standard bid amount (minimumBid/priceDivisor)
     */
    function computeTransferValue(
        uint256 _unit,
        uint256 _naturalUnit,
        uint256 _minimumBid,
        address _auctionLibrary
    )
        internal
        returns (uint256)
    {
        uint256 priceDivisor = IAuctionPriceCurve(_auctionLibrary).priceDivisor();
        return _minimumBid.mul(_unit).div(_naturalUnit).div(priceDivisor);
    }
}
