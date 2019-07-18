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
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { ModuleCoreState } from "./ModuleCoreState.sol";


/**
 * @title RebalancingSetExchangeIssuance
 * @author Set Protocol
 *
 * The RebalancingSetExchangeIssuance contains utility functions used in rebalancing SetToken
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
     * @param  _transactTokenAddress     Address of the sendToken (issue) or receiveToken (redeem)
     * @param  _rebalancingSetAddress    Address of the rebalancing SetToken
     * @param  _rebalancingSetQuantity   Quantity of rebalancing SetToken to issue or redeem
     * @param  _baseSetAddress           Address of base SetToken in ExchangeIssueanceParams
     * @param  _transactTokenArray       List of addresses of send tokens (during issuance) and
     *                                     receive tokens (during redemption)
     */
    function validateInputs(
        address _transactTokenAddress,
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        address _baseSetAddress,
        address[] memory _transactTokenArray
    )
        internal
        view
    {
        // Expect rebalancing SetToken to be valid and enabled SetToken
        require(
            coreInstance.validSets(_rebalancingSetAddress),
            "RebalancingSetExchangeIssuance.validateInputs: Invalid or disabled SetToken address"
        );

        require(
            _rebalancingSetQuantity > 0,
            "RebalancingSetExchangeIssuance.validateInputs: Quantity must be > 0"
        );
        
        // Make sure Issuance quantity is multiple of the rebalancing SetToken natural unit
        require(
            _rebalancingSetQuantity.mod(ISetToken(_rebalancingSetAddress).naturalUnit()) == 0,
            "RebalancingSetExchangeIssuance.validateInputs: Quantity must be multiple of natural unit"
        );

        // Only 1 receive token in redeem and 1 send token in issue allowed
        require(
            _transactTokenArray.length == 1,
            "RebalancingSetExchangeIssuance.validateInputs: Only 1 Send/Receive Token Allowed"
        );

        require(
            _transactTokenAddress == _transactTokenArray[0],
            "RebalancingSetExchangeIssuance.validateInputs: Send/Receive token must match required"
        );

        // Validate that the base Set address matches the issuanceParams Set Address
        address baseSet = ISetToken(_rebalancingSetAddress).getComponents()[0];
        require(
            baseSet == _baseSetAddress,
            "RebalancingSetExchangeIssuance.validateInputs: Base Set addresses must match"
        );
    } 
}
