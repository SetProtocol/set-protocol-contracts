/*
    Copyright 2020 Set Labs Inc.

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

import { ReentrancyGuard } from "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { CommonMath } from "set-protocol-contract-utils/contracts/lib/CommonMath.sol";

import { CTokenWhiteListed } from "./lib/CTokenWhiteListed.sol";
import { ExchangeIssuanceLibrary } from "./lib/ExchangeIssuanceLibrary.sol";
import { ERC20Wrapper } from "../../lib/ERC20Wrapper.sol";
import { IAddressToAddressWhiteList } from "../interfaces/IAddressToAddressWhiteList.sol";
import { ICore } from "../interfaces/ICore.sol";
import { IExchangeIssuanceModule } from "../interfaces/IExchangeIssuanceModule.sol";
import { IRebalancingSetToken } from "../interfaces/IRebalancingSetToken.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { ITransferProxy } from "../interfaces/ITransferProxy.sol";
import { IVault } from "../interfaces/IVault.sol";
import { IWETH } from "../../lib/IWETH.sol";
import { RebalancingSetExchangeIssuanceModule } from "./RebalancingSetExchangeIssuanceModule.sol";


/**
 * @title RebalancingSetCTokenExchangeIssuanceModule
 * @author Set Protocol
 *
 * The RebalancingSetCTokenExchangeIssuanceModule supplementary smart contract allows a user to issue and redeem a Rebalancing Set
 * using a payment token or receiving a receive token atomically in a single transaction using liquidity from
 * decentralized exchanges. If cToken, the module handles redeeming cToken during redemption process
 * Note: This module is not compatible with Compound Ether (cETH).
 */
contract RebalancingSetCTokenExchangeIssuanceModule is
    RebalancingSetExchangeIssuanceModule,
    CTokenWhiteListed
{
    using SafeMath for uint256;

    /* ============ Constructor ============ */

    /**
     * Constructor function for RebalancingSetCTokenExchangeIssuanceModule
     *
     * @param _core                     The address of Core
     * @param _transferProxy            The address of the TransferProxy
     * @param _exchangeIssuanceModule   The address of ExchangeIssuanceModule
     * @param _wrappedEther             The address of wrapped ether
     * @param _vault                    The address of Vault
     */
    constructor(
        ICore _core,
        ITransferProxy _transferProxy,
        IExchangeIssuanceModule _exchangeIssuanceModule,
        IWETH _wrappedEther,
        IVault _vault,
        IAddressToAddressWhiteList _cTokenWhiteList
    )
        public
        RebalancingSetExchangeIssuanceModule(
            _core,
            _transferProxy,
            _exchangeIssuanceModule,
            _wrappedEther,
            _vault
        )
        CTokenWhiteListed(
            address(_transferProxy),
            _cTokenWhiteList
        )
    {}

    /* ============ Private Functions ============ */

    /**
     * Withdraw any base Set components to the user in the vault owned by the contract. If component is a 
     * supported cToken, calculate underlying quantity in vault and return to the caller. Note: there may be 
     * excess cTokens so we flush underlying in addition to the cToken component. 
    `*
     * This function overrides returnExcessComponentsFromVault from TokenFlush
     *
     * @param _baseSetToken               Instance of the Base SetToken
     * @param _returnAddress              The address to send excess tokens to
     */
    function returnExcessComponentsFromVault(
        ISetToken _baseSetToken,
        address _returnAddress
    )
        internal
    {
        // Return base Set components
        address[] memory baseSetComponents = _baseSetToken.getComponents();
        for (uint256 i = 0; i < baseSetComponents.length; i++) {
            address currentComponentAddress = baseSetComponents[i];

            address underlyingAddress = cTokenWhiteList.whitelist(currentComponentAddress);
            uint256 vaultQuantity = vaultInstance.getOwnerBalance(currentComponentAddress, address(this));

            // Check if component is a cToken and quantity is greater than 0
            if (underlyingAddress != address(0)) {
                // Get balance of underlying in vault
                uint256 underlyingVaultQuantity = vaultInstance.getOwnerBalance(
                    underlyingAddress,
                    address(this)
                );

                // Check if underlying token quantity greater than 0, and return underlying from vault
                if (underlyingVaultQuantity > 0) {
                    coreInstance.withdrawModule(
                        address(this),
                        _returnAddress,
                        underlyingAddress,
                        underlyingVaultQuantity
                    );
                }
            }

            // Check if base Set components in vault is greater than 0.
            if (vaultQuantity > 0) {
                // Return the unexchanged components (including cToken components) from vault to the caller
                coreInstance.withdrawModule(
                    address(this),
                    _returnAddress,
                    currentComponentAddress,
                    vaultQuantity
                );
            }
        }         
    }

    /**
     * Withdraw any base Set components to the user from the contract. If component is a supported cToken,
     * calculate underlying quantity and return to the caller
     *
     * @param _baseSetToken               Instance of the Base SetToken
     * @param _returnAddress              The address to send excess tokens to
     */
    function returnExcessComponentsFromContract(
        ISetToken _baseSetToken,
        address _returnAddress
    )
        internal
    {
        // Return base Set components
        address[] memory baseSetComponents = _baseSetToken.getComponents();
        for (uint256 i = 0; i < baseSetComponents.length; i++) {
            address currentComponentAddress = baseSetComponents[i];
            uint256 currentComponentQuantity = ERC20Wrapper.balanceOf(baseSetComponents[i], address(this));

            address underlyingAddress = cTokenWhiteList.whitelist(currentComponentAddress);
            if (underlyingAddress != address(0)) {
                // Get balance of underlying
                uint256 underlyingQuantity = ERC20Wrapper.balanceOf(
                    underlyingAddress,
                    address(this)
                );

                // Check if underlying token quantity greater than 0
                if (underlyingQuantity > 0) {
                    ERC20Wrapper.transfer(
                        underlyingAddress,
                        _returnAddress,
                        underlyingQuantity
                    ); 
                }
            } else {
                // Check if non cToken component quantity is greater than 0
                if (currentComponentQuantity > 0) {
                    // Return the unexchanged non cToken components to the caller
                    ERC20Wrapper.transfer(
                        currentComponentAddress,
                        _returnAddress,
                        currentComponentQuantity
                    ); 
                }
            }
        }         
    }


}