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
pragma experimental "ABIEncoderV2";

import { ReentrancyGuard } from "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { CommonMath } from "../../lib/CommonMath.sol";
import { ExchangeIssuanceLibrary } from "./lib/ExchangeIssuanceLibrary.sol";
import { ERC20Wrapper } from "../../lib/ERC20Wrapper.sol";
import { IExchangeIssuanceModule } from "../interfaces/IExchangeIssuanceModule.sol";
import { ITransferProxy } from "../interfaces/ITransferProxy.sol";
import { ModuleCoreState } from "./lib/ModuleCoreState.sol";
import { RebalancingSetExchangeIssuance } from "./lib/RebalancingSetExchangeIssuance.sol";
import { RebalancingSetIssuance } from "./lib/RebalancingSetIssuance.sol";


/**
 * @title ERC20RebalancingSetExchangeIssuanceModule
 * @author Set Protocol
 *
 * The ERC20RebalancingSetExchangeIssuanceModule supplementary smart contract allows a user to send an ERC20 
 * and atomically issue a RebalancingSet
 */
contract ERC20RebalancingSetExchangeIssuanceModule is
    ModuleCoreState,
    RebalancingSetExchangeIssuance,
    RebalancingSetIssuance,
    ReentrancyGuard
{
    using SafeMath for uint256;

    /* ============ State Variables ============ */

    // Address and instance of Transfer Proxy contract
    address public transferProxy;

    // Address and instance of ExchangeIssuance Module contract
    IExchangeIssuanceModule public exchangeIssuanceInstance;

    /* ============ Events ============ */

    event LogERC20ExchangeIssue(
        address rebalancingSetAddress,
        address indexed callerAddress,
        address paymentToken,
        uint256 paymentTokenQuantity
    );

    event LogERC20ExchangeRedeem(
        address rebalancingSetAddress,
        address indexed callerAddress,
        uint256 rebalancingSetQuantity
    );

    /* ============ Constructor ============ */

    /**
     * Constructor function for ERC20RebalancingSetExchangeIssuanceModule
     *
     * @param _core                     The address of Core
     * @param _transferProxy            The address of the TransferProxy
     * @param _exchangeIssuanceModule   The address of ExchangeIssuanceModule
     * @param _vault                    The address of Vault
     */
    constructor(
        address _core,
        address _transferProxy,
        IExchangeIssuanceModule _exchangeIssuanceModule,
        address _vault
    )
        public
        ModuleCoreState(
            _core,
            _vault
        )
    {
        // Commit the address and instance of Transfer Proxy to state variables
        transferProxy = _transferProxy;

        // Commit the address and instance of ExchangeIssuanceModule to state variables
        exchangeIssuanceInstance = _exchangeIssuanceModule;
    }

    /* ============ Public Functions ============ */

    /**
     * Issue a Rebalancing Set using a single ERC20 token to acquire the base components of the Base Set.
     * The Payment token is the first index in sendTokens in ExchangeIssuanceParams, which should
     * only have one element.
     * The Base Set is then issued using ExchangeIssue and reissued into the Rebalancing Set.
     * This function is meant to be used with a user interface
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing Set to issue
     * @param  _exchangeIssuanceParams   Struct containing data around the base Set issuance
     * @param  _orderData                Bytecode formatted data with exchange data for acquiring base set components
     */
    function issueRebalancingSetWithERC20(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        ExchangeIssuanceLibrary.ExchangeIssuanceParams memory _exchangeIssuanceParams,
        bytes memory _orderData
    )
        public
        nonReentrant
    {
        // Validate the inputs
        validateInputs(
            _rebalancingSetAddress,
            _rebalancingSetQuantity,
            _exchangeIssuanceParams.setAddress,
            _exchangeIssuanceParams.sendTokens
        );

        address paymentToken = _exchangeIssuanceParams.sendTokens[0];
        uint256 paymentTokenAmount = _exchangeIssuanceParams.sendTokenAmounts[0];

        // Transfer ERC20 paymentToken from the user to this contract
        // Approvals must be set ahead of time to the transferProxy
        coreInstance.transferModule(
            paymentToken,
            paymentTokenAmount,
            msg.sender,
            address(this)
        );

        // Ensure paymentToken allowance to the transferProxy to allow Base Set issuance
        ERC20Wrapper.ensureAllowance(
            paymentToken,
            address(this),
            transferProxy,
            paymentTokenAmount
        );

        // Using the order data, purchase the required components using the payment token
        // Then it issues the Base Set to this contract.
        exchangeIssuanceInstance.exchangeIssue(
            _exchangeIssuanceParams,
            _orderData
        );

        address baseSetAddress = _exchangeIssuanceParams.setAddress;
        uint256 baseSetIssueQuantity = _exchangeIssuanceParams.quantity;

        // Approve base Set to transfer proxy for RebalancingSet issuance
        ERC20Wrapper.ensureAllowance(
            baseSetAddress,
            address(this),
            transferProxy,
            baseSetIssueQuantity
        );

        // Issues the RebalancingSet to the caller
        coreInstance.issueTo(
            msg.sender,
            _rebalancingSetAddress,
            _rebalancingSetQuantity
        );

        // Send excess base Set, components, and paymentToken to the user
        returnIssuanceExcessFunds(
            baseSetAddress,
            paymentToken
        );

        emit LogERC20ExchangeIssue(
            _rebalancingSetAddress,
            msg.sender,
            paymentToken,
            paymentTokenAmount
        );
    }

    /**
     * Redeems a Rebalancing Set into a specific ERC20 / receive token. The Rebalancing Set 
     * is redeemed into the Base Set, and Base Set components are traded for the ERC20 which is sent to the caller.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing Set
     * @param  _rebalancingSetQuantity   Quantity of rebalancing Set to redeem
     * @param  _exchangeIssuanceParams   Struct containing data around the base Set issuance / redemption
     * @param  _orderData                Bytecode formatted data with exchange data for acquiring/
     *                                     selling base set components
     */
    function redeemRebalancingSetIntoERC20(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        ExchangeIssuanceLibrary.ExchangeIssuanceParams memory _exchangeIssuanceParams,
        bytes memory _orderData
    )
        public
        nonReentrant
    {
        // Validate Params
        validateInputs(
            _rebalancingSetAddress,
            _rebalancingSetQuantity,
            _exchangeIssuanceParams.setAddress,
            _exchangeIssuanceParams.receiveTokens
        );

        // Redeem rebalancing Set from the user, attributed to this contract, 
        // with the underlying base Set held in the vault
        coreInstance.redeemModule(
            msg.sender,
            address(this),
            _rebalancingSetAddress,
            _rebalancingSetQuantity
        );

        // Withdraw base Set to this contract.
        coreInstance.withdrawModule(
            address(this),
            address(this),
            _exchangeIssuanceParams.setAddress,
            _exchangeIssuanceParams.quantity
        );

        // Exchange redeem Base Set into the specified receiveToken
        exchangeIssuanceInstance.exchangeRedeem(
            _exchangeIssuanceParams,
            _orderData
        );

        // Withdraw any excess receiveToken from Vault to Contracts
        // This could happen if the receiveToken is also a component of the base Set.
        uint256 paymentTokenInVault = vaultInstance.getOwnerBalance(
            _exchangeIssuanceParams.receiveTokens[0],
            address(this)
        );
        if (paymentTokenInVault > 0) {
            coreInstance.withdrawModule(
                address(this),
                address(this),
                _exchangeIssuanceParams.receiveTokens[0],
                paymentTokenInVault
            );
        }

        // Transfer receiveToken to the caller
        ERC20Wrapper.transfer(
            _exchangeIssuanceParams.receiveTokens[0],
            msg.sender,
            _exchangeIssuanceParams.receiveTokenAmounts[0]
        );

        // Non-exchanged components and baseSets are returned to the user
        returnRedemptionExcessFunds(_exchangeIssuanceParams.setAddress);

        emit LogERC20ExchangeRedeem(
            _rebalancingSetAddress,
            msg.sender,
            _rebalancingSetQuantity
        );
    }

    /* ============ Private Functions ============ */

    /**
     * Any unused paymentToken or base Set issued is returned to the caller.
     *
     * @param _baseSetAddress           The address of the base Set
     * @param _paymentTokenAddress      The address of the payment token
     */
    function returnIssuanceExcessFunds(
        address _baseSetAddress,
        address _paymentTokenAddress
    )
        private
    {
        returnIssuanceBaseSetAndComponentsExcessFunds(_baseSetAddress);

        // Return any excess payment token to the user
        // Return any excess base Set to the user not used in rebalancing set issuance
        uint256 leftoverPaymentToken = ERC20Wrapper.balanceOf(
            _paymentTokenAddress,
            address(this)
        );
        if (leftoverPaymentToken > 0) {
            ERC20Wrapper.transfer(
                _paymentTokenAddress,
                msg.sender,
                leftoverPaymentToken
            );
        }
    }
}
