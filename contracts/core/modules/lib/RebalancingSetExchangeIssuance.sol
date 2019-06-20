/*
    Copyright 2019 Set Labs Inc.

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

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { ERC20Wrapper } from "../../../lib/ERC20Wrapper.sol";
import { ExchangeIssuanceLibrary } from "./ExchangeIssuanceLibrary.sol";
import { IRebalancingSetToken } from "../../interfaces/IRebalancingSetToken.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { ModuleCoreState } from "./ModuleCoreState.sol";


/**
 * @title RebalancingSetExchangeIssuance
 * @author Set Protocol
 *
 * The RebalancingSetExchangeIssuance contains utility functions used in RebalancingSet 
 * exchange issuance
 */
contract RebalancingSetExchangeIssuance is 
    ModuleCoreState
{
    using SafeMath for uint256;

    // ============ Internal ============

    /**
     * Validate that the issuance parameters and inputs are congruent.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing Set
     * @param  _rebalancingSetQuantity   Quantity of rebalancing Set to issue or redeem
     * @param  _collateralSetAddress     Address of base Set in ExchangeIssueanceParams
     * @param  _transactTokenArray       List of addresses of send tokens (during issuance) and
     *                                     receive tokens (during redemption)
     */
    function validateInputs(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        address _collateralSetAddress,
        address[] memory _transactTokenArray
    )
        internal
        view
    {
        // Expect RebalancingSet to be valid and enabled Set
        require(
            coreInstance.validSets(_rebalancingSetAddress),
            "RebalancingSetExchangeIssuance.validateInputs: Invalid or disabled SetToken address"
        );

        // Require only 1 receive token in redeem and 1 send token in issue
        require(
            _transactTokenArray.length == 1,
            "RebalancingSetExchangeIssuance.validateInputs: Only 1 Receive Token Allowed"
        );

        ISetToken rebalancingSet = ISetToken(_rebalancingSetAddress);

        // Validate that the base Set address matches the issuanceParams Set Address
        address baseSet = rebalancingSet.getComponents()[0];
        require(
            baseSet == _collateralSetAddress,
            "RebalancingSetExchangeIssuance.validateInputs: Base Set addresses must match"
        );

        ExchangeIssuanceLibrary.validateQuantity(
            _rebalancingSetAddress,
            _rebalancingSetQuantity
        );
    }    
}
