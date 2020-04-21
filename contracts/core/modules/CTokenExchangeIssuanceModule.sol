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

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { CommonMath } from "set-protocol-contract-utils/contracts/lib/CommonMath.sol";
import { CompoundUtils } from "set-protocol-contract-utils/contracts/lib/CompoundUtils.sol";

import { CTokenWhiteListed } from "./lib/CTokenWhiteListed.sol";
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
 * the issuance and redemption of Sets containing cTokens using exchange orders and Compound functions. 
 * Note: This module is not compatible with Compound Ether (cETH).
 */
contract CTokenExchangeIssuanceModule is
    ExchangeIssuanceModule,
    CTokenWhiteListed
{
    using SafeMath for uint256;

    /* ============ State Variables ============ */

    // Address of transferProxy
    address public transferProxy;

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
        CTokenWhiteListed(
            _transferProxy,
            _cTokenWhiteList
        )
    {
        transferProxy = _transferProxy;
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
        // Validate the issuance quantity, send token and receive token data
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

        // Withdraw underlying tokens required from vault, mint cTokens in the module, and return to vault under sender address
        mintCTokensFromExchangedComponents(
            _exchangeIssuanceParams.receiveTokens,
            _exchangeIssuanceParams.receiveTokenAmounts
        );

        // Check that sender's receive token balances in Vault are correct
        ExchangeIssuanceLibrary.validatePostExchangeReceiveTokenBalances(
            vault,
            _exchangeIssuanceParams.receiveTokens,
            requiredBalances,
            msg.sender
        );

        // Transfer remaining required underlying components from caller to module, mint cTokens and deposit in vault to caller
        mintCTokensFromCaller(
            _exchangeIssuanceParams.setAddress,
            _exchangeIssuanceParams.quantity
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
        redeemCTokensAndTransferToExchangeWrappers(
            _exchangeIssuanceParams.sendTokenExchangeIds,
            _exchangeIssuanceParams.sendTokens,
            _exchangeIssuanceParams.sendTokenAmounts
        );

        // Execute the exchange orders using the encoded order data and deposits tokens in vault
        executeExchangeOrders(_orderData);

        // Check that sender's receive token balances in Vault are correct
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
     * @param _receiveTokens              Array of SetToken component addresses to receive
     * @param _receiveTokenAmounts        Array of SetToken component required quantities to receive
     */
    function mintCTokensFromExchangedComponents(
        address[] memory _receiveTokens,
        uint256[] memory _receiveTokenAmounts
    )
        private
    {
        for (uint256 i = 0; i < _receiveTokens.length; i++) {
            address currentComponentAddress = _receiveTokens[i];
            uint256 currentComponentQuantity = _receiveTokenAmounts[i];

            // If cToken, calculate required underlying tokens and transfer to module
            address underlyingAddress = cTokenWhiteList.whitelist(currentComponentAddress);
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

                // Mint cToken and deposit to vault under sender
                mintCToken(cTokenInstance, underlyingAddress, underlyingQuantity);
            }
        }
    }

    /**
     * Transfer non-exchanged underlying tokens from caller, mint cTokens and deposit to the Vault under sender
     * to the caller
     *
     * @param  _setAddress   Address of the Set
     * @param  _quantity     Quantity of the Set to issue
     */
    function mintCTokensFromCaller(
        address _setAddress,
        uint256 _quantity
    )
        private
    {
        // Get SetToken details
        ISetToken baseSet = ISetToken(_setAddress);

        address[] memory baseSetComponents = baseSet.getComponents();
        uint256[] memory baseSetUnits = baseSet.getUnits();
        uint256 baseSetNaturalUnit = baseSet.naturalUnit();

        // Calculate the number of natural units required. Note: validateExchangeIssuanceParams ensures quantity is a
        // multiple of natural unit
        uint256 quantityOfNaturalUnits = _quantity.div(baseSetNaturalUnit);

        for (uint256 i = 0; i < baseSetComponents.length; i++) {
            address currentComponentAddress = baseSetComponents[i];
            // Get existing component quantity in the vault
            uint256 currentComponentQuantity = vaultInstance.getOwnerBalance(currentComponentAddress, msg.sender);

            // Calculate required quantity for component
            uint256 requiredQuantity = quantityOfNaturalUnits.mul(baseSetUnits[i]);

            // If cToken and balance of cToken in vault is less than required for issuing the Set
            // transfer difference from user and mint cToken
            address underlyingAddress = cTokenWhiteList.whitelist(currentComponentAddress);
            if (underlyingAddress != address(0) && currentComponentQuantity < requiredQuantity) {
                // Calculate amount of remaining cTokens needed to issue Set
                uint256 quantityToMint = requiredQuantity - currentComponentQuantity;

                ICToken cTokenInstance = ICToken(currentComponentAddress);

                // Calculate required amount of underlying. Calculated as cToken quantity * exchangeRate / 10 ** 18.
                uint256 exchangeRate = cTokenInstance.exchangeRateCurrent();
                uint256 underlyingQuantity = CompoundUtils.convertCTokenToUnderlying(quantityToMint, exchangeRate);

                // Transfer underlying from caller to module
                coreInstance.transferModule(
                    underlyingAddress,
                    underlyingQuantity,
                    msg.sender,
                    address(this)
                );

                // Mint cToken and deposit to vault under sender
                mintCToken(cTokenInstance, underlyingAddress, underlyingQuantity);
            }
        }
    }

    /**
     * Withdraw required underlying from vault, redeem required amount of cTokens, and transfer to exchange wrappers
     *
     * @param _sendTokenExchangeIds    List of exchange wrapper enumerations corresponding to
     * @param _sendTokens              Array of SetToken component addresses to send
     * @param _sendTokenAmounts        Array of SetToken component required quantities to send
     */
    function redeemCTokensAndTransferToExchangeWrappers(
        uint8[] memory _sendTokenExchangeIds,
        address[] memory _sendTokens,
        uint256[] memory _sendTokenAmounts
    )
        private
    {
        for (uint256 i = 0; i < _sendTokens.length; i++) {
            address exchangeWrapper = coreInstance.exchangeIds(_sendTokenExchangeIds[i]);
            address currentComponentAddress = _sendTokens[i];
            uint256 currentComponentQuantity = _sendTokenAmounts[i];

            // If cToken redeem cToken and replace send token and amounts with underlying
            address underlyingAddress = cTokenWhiteList.whitelist(currentComponentAddress);
            if (underlyingAddress != address(0)) {
                // Withdraw cToken send tokens from vault (owned by this contract) to the module and redeem cToken
                redeemCToken(
                    ICToken(currentComponentAddress),
                    currentComponentQuantity
                );

                // Get balance of underlying in the contract after cToken redemption to ensure tokens are flushed
                uint256 underlyingQuantity = ERC20Wrapper.balanceOf(
                    underlyingAddress,
                    address(this)
                );

                // Ensure unlimited allowance for underlying component to transferProxy.
                ERC20Wrapper.ensureAllowance(
                    underlyingAddress,  // Token
                    address(this),      // Owner
                    transferProxy,      // Spender
                    underlyingQuantity  // Set unlimited if allowance less than quantity
                );

                // Transfer send tokens to the appropriate exchange wrapper
                coreInstance.transferModule(
                    underlyingAddress,  // Token
                    underlyingQuantity, // Quantity
                    address(this),      // From address
                    exchangeWrapper     // To address
                );
            } else {
                // Withdraw non cToken send tokens from vault (owned by this contract) to the appropriate exchange wrapper
                coreInstance.withdrawModule(
                    address(this),              // From address in vault
                    exchangeWrapper,            // To address
                    currentComponentAddress,    // Token address
                    currentComponentQuantity    // Token quantity
                );
            }
        }
    }

    /**
     * Mint cToken and deposit in vault under sender
     *
     * @param _cToken                Instance of cToken component to mint
     * @param _underlyingAddress     Underlying component address
     * @param _underlyingQuantity    Quantity of underlying to mint
     */
    function mintCToken(
        ICToken _cToken,
        address _underlyingAddress,
        uint256 _underlyingQuantity
    )
        private
    {
        // Ensure unlimited allowance for underlying token to cToken contract.
        ERC20Wrapper.ensureAllowance(
            _underlyingAddress,
            address(this),
            address(_cToken),
            _underlyingQuantity
        );

        // Mint cToken using underlying
        uint256 mintResponse = _cToken.mint(_underlyingQuantity);
        require(
            mintResponse == 0,
            "CTokenExchangeIssuanceModule.mintCToken: Error minting cToken"
        );

        // Get balance of cTokens minted in the contract to ensure tokens are flushed at the end
        uint256 cTokenQuantity = ERC20Wrapper.balanceOf(
            address(_cToken),
            address(this)
        );

        // Ensure unlimited allowance for cToken to transferProxy. This is for the case if we add a new cToken to the whitelist
        ERC20Wrapper.ensureAllowance(
            address(_cToken),
            address(this),
            transferProxy,
            cTokenQuantity
        );

        // Deposit transformed cTokens to vault (owned by order sender)
        coreInstance.depositModule(
            address(this),
            msg.sender,
            address(_cToken),
            cTokenQuantity
        );
    }

    /**
     * Withdraw cToken from vault, and redeem cToken in module
     *
     * @param _cToken                Instance of cToken component to redeem
     * @param _cTokenQuantity        Quantity of cToken to redeem
     */
    function redeemCToken(
        ICToken _cToken,
        uint256 _cTokenQuantity
    )
        private
    {
        // Withdraw cToken send tokens from vault (owned by this contract) to the module
        coreInstance.withdrawModule(
            address(this), // From address in vault
            address(this), // To address
            address(_cToken), // Token address
            _cTokenQuantity // Token quantity
        );

        // Redeem cToken to underlying
        uint256 redeemResponse = _cToken.redeem(_cTokenQuantity);
        require(
            redeemResponse == 0,
            "CTokenExchangeIssuanceModule.redeemCToken: Error redeeming cToken"
        );
    }

    /**
     * Transfers send tokens from the user to the appropriate exchange wrapper. Used in exchange issue
     *
     * @param _sendTokenExchangeIds            List of exchange wrapper enumerations corresponding to
     *                                         the wrapper that will handle the component
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
     * Withdraws any remaining un-exchanged cToken and non cToken components from the Vault in the possession of this contract
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
        for (uint256 i = 0; i < baseSetComponents.length; i++) {
            address currentComponentAddress = baseSetComponents[i];
            uint256 currentComponentQuantity = vaultInstance.getOwnerBalance(currentComponentAddress, address(this));

            // Remaining cTokens are redeemed to underlying and all tokens are sent to the caller
            if (currentComponentQuantity > 0) {
                address underlyingAddress = cTokenWhiteList.whitelist(currentComponentAddress);
                if (underlyingAddress != address(0)) {
                    // Withdraw cToken send tokens from vault (owned by this contract) to the module and redeem
                    redeemCToken(
                        ICToken(currentComponentAddress),
                        currentComponentQuantity
                    );

                    // Get balance of underlying after cToken redemption.
                    uint256 underlyingQuantity = ERC20Wrapper.balanceOf(
                        underlyingAddress,
                        address(this)
                    );

                    // Ensure allowance for underlying component to transferProxy.
                    ERC20Wrapper.ensureAllowance(
                        underlyingAddress,
                        address(this),
                        transferProxy,
                        underlyingQuantity
                    );

                    // Transfer underlying components to caller
                    coreInstance.transferModule(
                        underlyingAddress,
                        underlyingQuantity,
                        address(this),
                        msg.sender
                    );
                } else {
                    // Return the unexchanged non cToken components to the caller
                    coreInstance.withdrawModule(
                        address(this),
                        msg.sender,
                        currentComponentAddress,
                        currentComponentQuantity
                    );
                }
            }
        }
    }
}