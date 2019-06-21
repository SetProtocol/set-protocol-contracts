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

import { ReentrancyGuard } from "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { IRebalancingSetToken } from "../interfaces/IRebalancingSetToken.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { IWETH } from "../../lib/IWETH.sol";
import { ERC20Wrapper } from "../../lib/ERC20Wrapper.sol";
import { ModuleCoreState } from "./lib/ModuleCoreState.sol";
import { RebalancingSetIssuance } from "./lib/RebalancingSetIssuance.sol";


/**
 * @title RebalancingSetIssuanceModule
 * @author Set Protocol
 *
 * A module that includes a convenience function for redeeming a rebalancing set into components efficiently.
 */
contract RebalancingSetIssuanceModule is
    ModuleCoreState,
    RebalancingSetIssuance,
    ReentrancyGuard
{
    using SafeMath for uint256;

    // Address and instance of Wrapped Ether contract
    IWETH public weth;

    /* ============ Events ============ */

    event LogRebalancingSetRedeem(
        address rebalancingSetAddress,
        address indexed callerAddress,
        uint256 rebalancingSetQuantity
    );

    /* ============ Constructor ============ */

    /**
     * Constructor function for RebalancingSetIssuanceModule
     *
     * @param _core                The address of Core
     * @param _vault               The address of Vault
     * @param _weth                The address of Wrapped Ether
     */
    constructor(
        address _core,
        address _vault,
        IWETH _weth
    )
        public
        ModuleCoreState(
            _core,
            _vault
        )
    {
        // Commit the WETH instance
        weth = _weth;
    }

    /**
     * Fallback function. Disallows ether to be sent to this contract without data except when
     * unwrapping WETH.
     */
    function ()
        external
        payable
    {
        require( // coverage-disable-line
            msg.sender == address(weth),
            "RebalancingSetIssuanceModule.fallback: Cannot receive ETH directly unless unwrapping WETH"
        );
    }

    /* ============ Public Functions ============ */

    /**
     * Redeems a Rebalancing Set into the base components of the Base Set.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing Set to redeem
     * @param  _redeemQuantity           The Quantity of the rebalancing Set to redeem
     */
    function redeemRebalancingSetIntoBaseComponents(
        address _rebalancingSetAddress,
        uint256 _redeemQuantity,
        bool _keepChangeInVault
    )
        external
        nonReentrant
    {
        redeemRebalancingSetAndWithdraw(_rebalancingSetAddress, _redeemQuantity);

        // Calculate the Base Set Redeem quantity
        address baseSetAddress = IRebalancingSetToken(_rebalancingSetAddress).currentSet();
        uint256 baseSetRedeemQuantity = ERC20Wrapper.balanceOf(baseSetAddress, address(this));

        // Redeem Base Set and send components to the the user
        // If you exclude, do the tokens get stuck with the contract?
        // Yes they need to be handled separately if they do.
        coreInstance.redeemAndWithdrawTo(
            baseSetAddress,
            msg.sender,
            baseSetRedeemQuantity,
            0
        );

        // Transfer any change of the base Set to the end user
        returnExcessBaseSet(baseSetAddress, _keepChangeInVault);

        // Log RebalancingSetRedeem
        emit LogRebalancingSetRedeem(
            _rebalancingSetAddress,
            msg.sender,
            _redeemQuantity
        );
    }

    function redeemRebalancingSetIntoComponentsAndEther(
        address _rebalancingSetAddress,
        uint256 _redeemQuantity,
        bool _keepChangeInVault
    )
        external
        nonReentrant
    {
        redeemRebalancingSetAndWithdraw(_rebalancingSetAddress, _redeemQuantity);

        // Calculate the Base Set Redeem quantity
        address baseSetAddress = IRebalancingSetToken(_rebalancingSetAddress).currentSet();
        uint256 baseSetRedeemQuantity = ERC20Wrapper.balanceOf(baseSetAddress, address(this));

        // Redeem. The components stay in the vault
        coreInstance.redeem(
            baseSetAddress,
            baseSetRedeemQuantity
        );

        // Loop through the base Set components.
        withdrawComponentsToSenderWithEther(baseSetAddress);

        // Transfer any change of the base Set to the end user
        returnExcessBaseSet(baseSetAddress, _keepChangeInVault);

        // Log RebalancingSetRedeem
        emit LogRebalancingSetRedeem(
            _rebalancingSetAddress,
            msg.sender,
            _redeemQuantity
        );
    }

    /* ============ Private Functions ============ */

    function withdrawComponentsToSenderWithEther(
        address _baseSetAddress
    )
        internal
    {
        // Loop through the base Set components.
        address[] memory baseSetComponents = ISetToken(_baseSetAddress).getComponents();
        for (uint256 i = 0; i < baseSetComponents.length; i++) {
            address currentComponent = baseSetComponents[i];
            uint256 currentComponentQuantity = vaultInstance.getOwnerBalance(
                currentComponent,
                address(this)
            );

            // If address is weth, withdraw weth and transfer eth
            if (currentComponent == address(weth)) {
                processWrappedEtherDuringRedemption(currentComponentQuantity);
                continue;
            }

            coreInstance.withdrawModule(
                address(this),
                msg.sender,
                currentComponent,
                currentComponentQuantity
            );
        }
    }

    // TODO: To move this to its own library
    // TODO: rename function
    function processWrappedEtherDuringRedemption(
        uint256 _wethQuantity
    )
        internal 
    {
        coreInstance.withdrawModule(
            address(this),
            address(this),
            address(weth),
            _wethQuantity
        );

        weth.withdraw(_wethQuantity);

        msg.sender.transfer(_wethQuantity);
    }
}