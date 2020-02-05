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

import { ReentrancyGuard } from "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { CompoundUtils } from "../../lib/CompoundUtils.sol";
import { ERC20Wrapper } from "../../lib/ERC20Wrapper.sol";
import { ExchangeIssuanceLibrary } from "./lib/ExchangeIssuanceLibrary.sol";
import { ExchangeIssuanceModule } from "./ExchangeIssuanceModule.sol";
import { ICToken } from "../interfaces/ICToken.sol";
import { IAddressToAddressWhiteList } from "../interfaces/IAddressToAddressWhiteList.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { SetTokenLibrary } from "../lib/SetTokenLibrary.sol";


/**
 * @title CTokenExchangeIssuanceModule
 * @author Set Protocol
 *
 * The CTokenExchangeIssuanceModule facilitates the exchangeIssue and exchangeRedeem functions which allows
 * the issuance and redemption of Sets containing cTokens using exchange orders and Compound functions
 */
contract CTokenExchangeIssuanceModule is
    ExchangeIssuanceModule,
    ReentrancyGuard
{
    using SafeMath for uint256;

    /* ============ State Variables ============ */

    // Address of TransferProxy contract
    address public transferProxy;

    // Address and instance of AddressToAddressWhiteList contract
    IAddressToAddressWhiteList public cTokenWhitelist;

    /* ============ Constructor ============ */

    /**
     * Constructor function for CTokenExchangeIssuanceModule
     *
     * @param _core                The address of Core
     * @param _vault               The address of Vault
     * @param _transferProxy       The address of TransferProxy
     * @param _cTokenWhiteList     The instance of cTokenWhiteList contract
     */
    constructor(
        address _core,
        address _vault,
        address _transferProxy,
        IAddressToAddressWhiteList _cTokenWhiteList
    )
        public
        ExchangeIssuanceModule(
            _core,
            _vault
        )
    {
        transferProxy = _transferProxy;
        cTokenWhitelist = _cTokenWhiteList;

        address[] memory cTokenAddresses = _cTokenWhitelist.validAddresses();

        for (uint256 i = 0; i < cTokenAddresses.length; i++) {
            address cTokenAddress = cTokenAddresses[i];
            address underlyingAddress = cTokenWhitelist.getAddressValueByKey(cTokenAddress);

            // Add approvals of the underlying token to the cToken contract
            ERC20Wrapper.approve(
                underlyingAddress,
                cTokenAddress,
                CommonMath.maxUInt256()
            );

            // Add approvals of the cToken to the transferProxy contract
            ERC20Wrapper.approve(
                cTokenAddress,
                _transferProxy,
                CommonMath.maxUInt256()
            );
        }
    }

    /* ============ Public Functions ============ */

    /**
     * Performs trades via exchange wrappers to acquire components, mints cToken from underlying, and issues a Set to the caller
     *
     * @param _exchangeIssuanceParams              A Struct containing exchange issuance metadata
     * @param _orderData                           Bytes array containing the exchange orders to execute
     */
    function exchangeIssue(
        ExchangeIssuanceLibrary.ExchangeIssuanceParams memory _exchangeIssuanceParams,
        bytes memory _orderData
    )
        public
        nonReentrant
    {
        // Ensures validity of exchangeIssuanceParams
        validateExchangeIssuanceParams(_exchangeIssuanceParams);

        // Validate that all receiveTokens are components of the Set
        SetTokenLibrary.validateTokensAreComponents(
            _exchangeIssuanceParams.setAddress,
            _exchangeIssuanceParams.receiveTokens
        );

        // Transfer the send tokens to the appropriate exchanges
        transferSendTokensToExchangeWrappers(
            _exchangeIssuanceParams.sendTokenExchangeIds,
            _exchangeIssuanceParams.sendTokens,
            _exchangeIssuanceParams.sendTokenAmounts
        );

        // Execute the exchange orders using the encoded order data
        executeExchangeOrders(_orderData);

        // Mint cTokens with the underlying tokens exchanged
        mintCTokens(
            _exchangeIssuanceParams.receiveTokens,
            _exchangeIssuanceParams.receiveTokenAmounts
        );

        // Validate balances of tokens received
        validatePostExchangeReceiveTokens(_exchangeIssuanceParams);
        
        // Issue Set to the caller
        coreInstance.issueModule(
            msg.sender,
            msg.sender,
            _exchangeIssuanceParams.setAddress,
            _exchangeIssuanceParams.quantity
        );

        emit LogExchangeIssue(
            _exchangeIssuanceParams.setAddress,
            msg.sender,
            _exchangeIssuanceParams.quantity,
            _exchangeIssuanceParams.sendTokens,
            _exchangeIssuanceParams.sendTokenAmounts
        );
    }

    /**
     * Redeems a Set, redeems cToken to underlying, and performs trades via exchange wrappers for specified receive tokens. 
     * The receive tokens are attributed to the caller.
     * 
     * @param _exchangeIssuanceParams              A Struct containing exchange issuance metadata
     * @param _orderData                           Bytes array containing the exchange orders to execute
     */
    function exchangeRedeem(
        ExchangeIssuanceLibrary.ExchangeIssuanceParams memory _exchangeIssuanceParams,
        bytes memory _orderData
    )
        public
        nonReentrant
    {
        // Validate exchangeIssuanceParams
        validateExchangeIssuanceParams(_exchangeIssuanceParams);

        // Validate that all sendTokens are components of the Set
        SetTokenLibrary.validateTokensAreComponents(
            _exchangeIssuanceParams.setAddress,
            _exchangeIssuanceParams.sendTokens
        );

        // Redeem Set into the vault, attributing components to this contract
        coreInstance.redeemModule(
            msg.sender,
            address(this),
            _exchangeIssuanceParams.setAddress,
            _exchangeIssuanceParams.quantity
        );

        // Redeem cTokens into underlying to be exchanged
        redeemCTokens(
            _exchangeIssuanceParams.receiveTokens,
            _exchangeIssuanceParams.receiveTokenAmounts
        );

        // Transfer the send tokens to the appropriate exchanges
        withdrawSendTokensFromVaultToExchangeWrappers(
            _exchangeIssuanceParams.sendTokenExchangeIds,
            _exchangeIssuanceParams.sendTokens,
            _exchangeIssuanceParams.sendTokenAmounts
        );

        // Executes the exchange orders, depositing tokens into the Vault to the user
        executeExchangeOrders(_orderData);

        // Validate balances of tokens received
        validatePostExchangeReceiveTokens(_exchangeIssuanceParams);

        // Withdraw receive tokens from the Vault to the user
        coreInstance.batchWithdrawModule(
            msg.sender,
            msg.sender,
            _exchangeIssuanceParams.receiveTokens,
            _exchangeIssuanceParams.receiveTokenAmounts
        );

        // Withdraw any remaining non-exchanged components to the user
        withdrawRemainingComponentsToUser(_exchangeIssuanceParams.setAddress);

        emit LogExchangeRedeem(
            _exchangeIssuanceParams.setAddress,
            msg.sender,
            _exchangeIssuanceParams.quantity,
            _exchangeIssuanceParams.receiveTokens,
            _exchangeIssuanceParams.receiveTokenAmounts
        );
    }

    /* ============ Private Functions ============ */

    /**
     * Checks post-exchange receive balances.
     *
     * @param _exchangeIssuanceParams              A Struct containing exchange issuance metadata
     */
    function validatePostExchangeReceiveTokens(
        ExchangeIssuanceLibrary.ExchangeIssuanceParams memory _exchangeIssuanceParams,
    )
        private
    {
        // Calculate expected receive token balances after exchange orders executed
        uint256[] memory requiredBalances = calculateReceiveTokenBalances(
            _exchangeIssuanceParams
        );

        // Check that sender's receive tokens in Vault have been incremented correctly
        ExchangeIssuanceLibrary.validatePostExchangeReceiveTokenBalances(
            vault,
            _exchangeIssuanceParams.receiveTokens,
            requiredBalances,
            msg.sender
        );
    }

    /**
     * Calculate and mint required amount of cTokens
     *
     * @param _exchangeIssuanceParams              A Struct containing exchange issuance metadata
     */
    function mintCTokens(
        address[] memory _receiveTokens,
        uint256[] memory _receiveTokenAmounts
    )
        private
    {
        // Loop through the combined token addresses array and deposit inflow amounts
        for (uint256 i = 0; i < _receiveTokens.length; i++) {
            address currentTokenAddress = _receiveTokens[i];
            uint256 currentTokenAmount = _receiveTokenAmounts[i];

            // If cToken, calculate required underlying tokens, transfer to contract, 
            // ensure underlying allowance to cToken and then mint cTokens
            address underlyingAddress = cTokenWhitelist.addressToAddressWhiteList(currentTokenAddress);
            if (underlyingAddress != address(0)) {
                ICToken cTokenInstance = ICToken(currentTokenAddress);

                // Calculate required amount of underlying. Calculated as cToken quantity * exchangeRate / 10 ** 18.
                uint256 exchangeRate = cTokenInstance.exchangeRateCurrent();
                uint256 underlyingQuantity = CompoundUtils.convertCTokenToUnderlying(currentTokenAmount, exchangeRate);

                // Ensure allowance for underlying token to cToken contract
                ERC20Wrapper.ensureAllowance(
                    underlyingAddress,
                    address(this),
                    address(cTokenInstance),
                    underlyingQuantity
                );

                // Mint cToken using underlying
                uint256 mintResponse = cTokenInstance.mint(underlyingQuantity);
                require(
                    mintResponse == 0,
                    "RebalancingSetCTokenBidder.bidAndWithdraw: Error minting cToken"
                );

                // Ensure allowance for cToken to transferProxy
                ERC20Wrapper.ensureAllowance(
                    currentTokenAddress,
                    address(this),
                    transferProxy,
                    currentTokenAmount
                );
            }
        }
    }

    /**
     * Calculate and redeem required amount of cTokens
     *
     * @param _exchangeIssuanceParams              A Struct containing exchange issuance metadata
     */
    function redeemCTokens(
        address[] memory _receiveTokens,
        uint256[] memory _receiveTokenAmounts
    )
        private
    {
        // Loop through the combined token addresses array and deposit inflow amounts
        for (uint256 i = 0; i < _receiveTokens.length; i++) {
            address currentTokenAddress = _receiveTokens[i];
            uint256 currentTokenAmount = _receiveTokenAmounts[i];

            // If cToken, calculate required underlying tokens, transfer to contract, 
            // ensure underlying allowance to cToken and then mint cTokens
            address underlyingAddress = cTokenWhitelist.addressToAddressWhiteList(currentTokenAddress);
            if (underlyingAddress != address(0)) {
                ICToken cTokenInstance = ICToken(currentTokenAddress);

                // Calculate required amount of underlying. Calculated as cToken quantity * exchangeRate / 10 ** 18.
                uint256 exchangeRate = cTokenInstance.exchangeRateCurrent();
                uint256 underlyingQuantity = CompoundUtils.convertCTokenToUnderlying(currentTokenAmount, exchangeRate);

                // Ensure allowance for underlying token to cToken contract
                ERC20Wrapper.ensureAllowance(
                    underlyingAddress,
                    address(this),
                    address(cTokenInstance),
                    underlyingQuantity
                );

                // Mint cToken using underlying
                uint256 mintResponse = cTokenInstance.mint(underlyingQuantity);
                require(
                    mintResponse == 0,
                    "RebalancingSetCTokenBidder.bidAndWithdraw: Error minting cToken"
                );

                // Ensure allowance for cToken to transferProxy
                ERC20Wrapper.ensureAllowance(
                    currentTokenAddress,
                    address(this),
                    transferProxy,
                    currentTokenAmount
                );
            }
        }
    }

    /**
     * Transfers send tokens from the user to the appropriate exchange wrapper. Used in exchange
     * issue.
     *
     * @param _sendTokenExchangeIds            List of exchange wrapper enumerations corresponding to 
     *                                              the wrapper that will handle the component
     * @param _sendTokens                      Array of addresses of the payment tokens
     * @param _sendTokenAmounts                Array of amounts of payment Tokens
     */
    function transferSendTokensToExchangeWrappers(
        uint8[] memory _sendTokenExchangeIds,
        address[] memory _sendTokens,
        uint256[] memory _sendTokenAmounts
    )
        private
    {
        for (uint256 i = 0; i < _sendTokens.length; i++) {
            // Get exchange wrapper address from state mapping based on enumeration
            address exchangeWrapper = coreInstance.exchangeIds(_sendTokenExchangeIds[i]);

            // Transfer send tokens to the appropriate exchange wrapper
            coreInstance.transferModule(
                _sendTokens[i],
                _sendTokenAmounts[i],
                msg.sender,
                exchangeWrapper
            );
        }
    }

    /**
     * Transfers send tokens from the Vault to the appropriate exchange wrappers. Used in
     * exchange redeem.
     *
     * @param _sendTokenExchangeIds            List of exchange wrapper enumerations corresponding to 
     *                                              the wrapper that will handle the component
     * @param _sendTokens                      Array of addresses of the payment tokens
     * @param _sendTokenAmounts                Array of amounts of payment Tokens
     */
    function withdrawSendTokensFromVaultToExchangeWrappers(
        uint8[] memory _sendTokenExchangeIds,
        address[] memory _sendTokens,
        uint256[] memory _sendTokenAmounts
    )
        private
    {
        for (uint256 i = 0; i < _sendTokens.length; i++) {
            // Get exchange address from state mapping based on header exchange info
            address exchangeWrapper = coreInstance.exchangeIds(_sendTokenExchangeIds[i]);

            // Withdraw send tokens from vault (owned by this contract) to the appropriate exchange wrapper
            coreInstance.withdrawModule(
                address(this),
                exchangeWrapper,
                _sendTokens[i],
                _sendTokenAmounts[i]
            );
        }
    }

    /**
     * Withdraws any remaining un-exchanged components from the Vault in the posession of this contract
     * to the caller
     *
     * @param  _setAddress   Address of the Base Set
     */
    function withdrawRemainingComponentsToUser(
        address _setAddress
    )
        private
    {
        address[] memory baseSetComponents = ISetToken(_setAddress).getComponents();
        uint256[] memory baseSetWithdrawQuantities = new uint256[](baseSetComponents.length);
        for (uint256 i = 0; i < baseSetComponents.length; i++) {
            uint256 withdrawQuantity = vaultInstance.getOwnerBalance(baseSetComponents[i], address(this));
            if (withdrawQuantity > 0) {
                baseSetWithdrawQuantities[i] = withdrawQuantity;    
            }
        }

        // Return the unexchanged components to the user
        coreInstance.batchWithdrawModule(
            address(this),
            msg.sender,
            baseSetComponents,
            baseSetWithdrawQuantities
        );            
    }
}
