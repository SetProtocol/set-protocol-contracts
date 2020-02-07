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

import { CommonMath } from "../../lib/CommonMath.sol";
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
    ExchangeIssuanceModule
{
    using SafeMath for uint256;

    /* ============ State Variables ============ */

    // Address of TransferProxy contract
    address public transferProxy;

    // Address and instance of AddressToAddressWhiteList contract
    IAddressToAddressWhiteList public cTokenWhiteList;

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
        cTokenWhiteList = _cTokenWhiteList;

        address[] memory cTokenAddresses = _cTokenWhiteList.validAddresses();

        for (uint256 i = 0; i < cTokenAddresses.length; i++) {
            address cTokenAddress = cTokenAddresses[i];
            address underlyingAddress = cTokenWhiteList.getAddressValueByKey(cTokenAddress);

            // Add approvals of the underlying token to the cToken contract
            ERC20Wrapper.approve(
                underlyingAddress,
                cTokenAddress,
                CommonMath.maxUInt256()
            );

            // Add approvals of the underlying token to the transferProxy contract
            ERC20Wrapper.approve(
                underlyingAddress,
                _transferProxy,
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

        // Calculate expected receive token balances
        uint256[] memory requiredBalances = calculateReceiveTokenBalances(
            _exchangeIssuanceParams
        );

        // Execute the exchange orders using the encoded order data and deposits tokens in vault
        executeExchangeOrders(_orderData);

        // Withdraw underlying tokens required, mint cTokens in the module, and return to vault under sender address
        mintCTokens(
            _exchangeIssuanceParams.receiveTokens,
            _exchangeIssuanceParams.receiveTokenAmounts
        );

        // Check that sender's receive tokens in Vault have been incremented correctly
        ExchangeIssuanceLibrary.validatePostExchangeReceiveTokenBalances(
            vault,
            _exchangeIssuanceParams.receiveTokens,
            requiredBalances,
            msg.sender
        );
        
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

        // Calculate expected receive token balances
        uint256[] memory requiredBalances = calculateReceiveTokenBalances(
            _exchangeIssuanceParams
        );

        // Withdraw underlying tokens required, redeem cTokens in the module, and send to exchange wrapper
        redeemCTokensAndTransferSendTokensToExchangeWrappers(
            _exchangeIssuanceParams.sendTokenExchangeIds,
            _exchangeIssuanceParams.sendTokens,
            _exchangeIssuanceParams.sendTokenAmounts
        );

        // Execute the exchange orders using the encoded order data and deposits tokens in vault
        executeExchangeOrders(_orderData);

        // Check that sender's receive tokens in Vault have been incremented correctly
        ExchangeIssuanceLibrary.validatePostExchangeReceiveTokenBalances(
            vault,
            _exchangeIssuanceParams.receiveTokens,
            requiredBalances,
            msg.sender
        );

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
     * Withdraw required underlying from vault, mint required amount of cTokens, and deposit back into vault
     *
     * @param _receiveTokens              A Struct containing exchange issuance metadata
     * @param _receiveTokenAmounts        A Struct containing exchange issuance metadata
     */
    function mintCTokens(
        address[] memory _receiveTokens,
        uint256[] memory _receiveTokenAmounts
    )
        private
    {
        for (uint256 i = 0; i < _receiveTokens.length; i++) {
            address currentComponentAddress = _receiveTokens[i];
            uint256 currentComponentQuantity = _receiveTokenAmounts[i];

            // If cToken, calculate required underlying tokens and transfer to module
            address underlyingAddress = cTokenWhiteList.addressToAddressWhiteList(currentComponentAddress);
            if (underlyingAddress != address(0)) {
                ICToken cTokenInstance = ICToken(currentComponentAddress);

                // Calculate required amount of underlying. Calculated as cToken quantity * exchangeRate / 10 ** 18.
                uint256 exchangeRate = cTokenInstance.exchangeRateCurrent();
                uint256 underlyingQuantity = CompoundUtils.convertCTokenToUnderlying(currentComponentQuantity, exchangeRate);
                
                // Withdraw send tokens from vault (owned by order sender) to the module
                coreInstance.withdrawModule(
                    msg.sender,
                    address(this),
                    underlyingAddress,
                    underlyingQuantity
                );

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
                    "CTokenExchangeIssuanceModule.exchangeIssue: Error minting cToken"
                );

                // Ensure allowance for cToken to transferProxy
                ERC20Wrapper.ensureAllowance(
                    currentComponentAddress,
                    address(this),
                    transferProxy,
                    currentComponentQuantity
                );

                // Deposit transformed cTokens to vault (owned by order sender)
                coreInstance.depositModule(
                    address(this),
                    msg.sender,
                    currentComponentAddress,
                    currentComponentQuantity
                );
            }
        }
    }

    /**
     * Withdraw required underlying from vault, redeem required amount of cTokens, and transfer to exchange wrappers
     *
     * @param _sendTokenExchangeIds    List of exchange wrapper enumerations corresponding to 
     * @param _sendTokens              A Struct containing exchange issuance metadata
     * @param _sendTokenAmounts        A Struct containing exchange issuance metadata
     */
    function redeemCTokensAndTransferSendTokensToExchangeWrappers(
        uint8[] memory _sendTokenExchangeIds,
        address[] memory _sendTokens,
        uint256[] memory _sendTokenAmounts
    )
        private
    {
        for (uint256 i = 0; i < _sendTokens.length; i++) {
            address currentComponentAddress = _sendTokens[i];
            uint256 currentComponentQuantity = _sendTokenAmounts[i];

            // Withdraw send tokens from vault (owned by this contract) to the module
            coreInstance.withdrawModule(
                address(this),
                address(this),
                currentComponentAddress,
                currentComponentQuantity
            );

            // If cToken redeem cToken and replace send token and amounts with underlying
            address underlyingAddress = cTokenWhiteList.addressToAddressWhiteList(currentComponentAddress);
            if (underlyingAddress != address(0)) {

                ICToken cTokenInstance = ICToken(currentComponentAddress);

                // Redeem cToken to underlying
                uint256 redeemResponse = cTokenInstance.redeem(currentComponentQuantity);
                require(
                    redeemResponse == 0,
                    "CTokenExchangeIssuanceModule.exchangeRedeem: Error redeeming cToken"
                );

                // Calculate required amount of underlying. Calculated as cToken quantity * exchangeRate / 10 ** 18.
                uint256 exchangeRate = cTokenInstance.exchangeRateCurrent();
                uint256 underlyingQuantity = CompoundUtils.convertCTokenToUnderlying(currentComponentQuantity, exchangeRate);
                
                // Replace current token address and amounts with underlying address and amounts
                currentComponentAddress = underlyingAddress;
                currentComponentQuantity = underlyingQuantity;
            }

            // Get exchange address from state mapping based on header exchange info
            address exchangeWrapper = coreInstance.exchangeIds(_sendTokenExchangeIds[i]);

            // Transfer send tokens to the appropriate exchange wrapper
            coreInstance.transferModule(
                currentComponentAddress,
                currentComponentQuantity,
                address(this),
                exchangeWrapper
            );
        }
    }

    /**
     * Transfers send tokens from the user to the appropriate exchange wrapper. Used in exchange issue
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
            // Get exchange address from state mapping based on header exchange info
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