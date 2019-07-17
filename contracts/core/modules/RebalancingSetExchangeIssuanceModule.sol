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

import { CommonMath } from "../../lib/CommonMath.sol";
import { ExchangeIssuanceLibrary } from "./lib/ExchangeIssuanceLibrary.sol";
import { ERC20Wrapper } from "../../lib/ERC20Wrapper.sol";
import { ICore } from "../interfaces/ICore.sol";
import { IExchangeIssuanceModule } from "../interfaces/IExchangeIssuanceModule.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { ITransferProxy } from "../interfaces/ITransferProxy.sol";
import { IWETH } from "../../lib/IWETH.sol";
import { ModuleCoreState } from "./lib/ModuleCoreState.sol";
import { RebalancingSetExchangeIssuance } from "./lib/RebalancingSetExchangeIssuance.sol";
import { RebalancingSetIssuance } from "./lib/RebalancingSetIssuance.sol";

/**
 * @title RebalancingSetExchangeIssuanceModule
 * @author Set Protocol
 *
 * The RebalancingSetExchangeIssuanceModule supplementary smart contract allows a user to send Eth and atomically
 * issue a rebalancing Set
 */
contract RebalancingSetExchangeIssuanceModule is
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
    address public exchangeIssuanceModule;
    IExchangeIssuanceModule private exchangeIssuanceInstance;

    // Address and instance of Wrapped Ether contract
    address public weth;
    IWETH private wethInstance;

    /* ============ Events ============ */

    event LogPayableExchangeIssue(
        address rebalancingSetAddress,
        address indexed callerAddress,
        address paymentToken,
        uint256 paymentTokenQuantity
    );

    event LogPayableExchangeRedeem(
        address rebalancingSetAddress,
        address indexed callerAddress,
        uint256 rebalancingSetQuantity
    );

    /* ============ Constructor ============ */

    /**
     * Constructor function for RebalancingSetExchangeIssuanceModule
     *
     * @param _core                     The address of Core
     * @param _transferProxy            The address of the TransferProxy
     * @param _exchangeIssuanceModule   The address of ExchangeIssuanceModule
     * @param _wrappedEther             The address of wrapped ether
     * @param _vault                    The address of Vault
     */
    constructor(
        address _core,
        address _transferProxy,
        address _exchangeIssuanceModule,
        address _wrappedEther,
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
        exchangeIssuanceModule = _exchangeIssuanceModule;
        exchangeIssuanceInstance = IExchangeIssuanceModule(_exchangeIssuanceModule);

        // Commit the address and instance of Wrapped Ether to state variables
        weth = _wrappedEther;
        wethInstance = IWETH(_wrappedEther);

        // Add approvals of Wrapped Ether to the Transfer Proxy
        ERC20Wrapper.approve(
            _wrappedEther,
            _transferProxy,
            CommonMath.maxUInt256()
        );
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
            msg.sender == weth,
            "RebalancingSetExchangeIssuanceModule.fallback: Cannot receive ETH directly unless unwrapping WETH"
        );
    }

    /* ============ Public Functions ============ */

    /**
     * Issue a Rebalancing Set using Wrapped Ether to acquire the base components of the Base Set.
     * The Base Set is then issued using ExchangeIssue and reissued into the Rebalancing Set.
     * This function is meant to be used with a user interface
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing Set to issue
     * @param  _exchangeIssuanceParams   Struct containing data around the base Set issuance
     * @param  _orderData                Bytecode formatted data with exchange data for acquiring base set components
     */
    function issueRebalancingSetWithEther(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        ExchangeIssuanceLibrary.ExchangeIssuanceParams memory _exchangeIssuanceParams,
        bytes memory _orderData,
        bool _keepChangeInVault
    )
        public
        payable
        nonReentrant
    {
        // wrap all eth, since weth could be a component in the Set
        wethInstance.deposit.value(msg.value)();

        issueRebalancingSetInternal(
            _rebalancingSetAddress,
            _rebalancingSetQuantity,
            weth,
            msg.value,
            _exchangeIssuanceParams,
            _orderData,
            _keepChangeInVault
        );

        // unwrap any leftover WETH and transfer to sender
        uint256 leftoverWeth = ERC20Wrapper.balanceOf(
            weth,
            address(this)
        );
        if (leftoverWeth > 0) {
            // Withdraw wrapped Ether
            wethInstance.withdraw(leftoverWeth);

            // Transfer ether to user
            msg.sender.transfer(leftoverWeth);
        }
    }

    function issueRebalancingSetWithERC20(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        address _paymentTokenAddress,
        uint256 _paymentTokenQuantity,
        ExchangeIssuanceLibrary.ExchangeIssuanceParams memory _exchangeIssuanceParams,
        bytes memory _orderData,
        bool _keepChangeInVault
    )
        public
        nonReentrant
    {
        // Deposit the erc20 to this contract
        // The quantity can be higher than the exchangeIssuance payment token quantity
        // as the component may also be used as the underlying component during issuance
        coreInstance.transferModule(
            _paymentTokenAddress,
            _paymentTokenQuantity,
            msg.sender,
            address(this)
        );

        issueRebalancingSetInternal(
            _rebalancingSetAddress,
            _rebalancingSetQuantity,
            _paymentTokenAddress,
            _paymentTokenQuantity,
            _exchangeIssuanceParams,
            _orderData,
            _keepChangeInVault
        );

        // Send back any unused payment token
        uint256 leftoverPaymentTokenQuantity = ERC20Wrapper.balanceOf(
            _paymentTokenAddress,
            address(this)
        );
        if (leftoverPaymentTokenQuantity > 0) {
            ERC20Wrapper.transfer(
                _paymentTokenAddress,
                msg.sender,
                leftoverPaymentTokenQuantity
            );
        }
    }

    /**
     * Redeems a Rebalancing Set into Wrapped Ether. The Rebalancing Set is redeemed into the Base Set, and
     * Base Set components are traded for WETH. The WETH is then withdrawn into ETH and the ETH sent to the caller.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing Set
     * @param  _rebalancingSetQuantity   Quantity of rebalancing Set to redeem
     * @param  _exchangeIssuanceParams   Struct containing data around the base Set issuance
     * @param  _orderData                Bytecode formatted data with exchange data for acquiring base set components
     */
    function redeemRebalancingSetIntoEther(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        ExchangeIssuanceLibrary.ExchangeIssuanceParams memory _exchangeIssuanceParams,
        bytes memory _orderData,
        bool _keepChangeInVault
    )
        public
        nonReentrant
    {
        redeemRebalancingSetIntoComponentsInternal(
            _rebalancingSetAddress,
            _rebalancingSetQuantity,
            weth,
            _exchangeIssuanceParams,
            _orderData
        );

        // Withdraw any excess traded for eth from vault to contract
        // We call these ahead of time to allow unwrapping of Weth
        uint256 wethInVault = vaultInstance.getOwnerBalance(weth, address(this));
        if (wethInVault > 0) {
            coreInstance.withdrawModule(
                address(this),
                address(this),
                weth,
                wethInVault
            );
        }

        // Withdraw eth from WETH
        uint256 wethBalance = ERC20Wrapper.balanceOf(
            weth,
            address(this)
        );
        wethInstance.withdraw(wethBalance);

        // Send eth to user
        msg.sender.transfer(wethBalance);

        returnRedemptionChange(
            _exchangeIssuanceParams.setAddress,
            _keepChangeInVault     
        );
    }

    function redeemRebalancingSetIntoERC20(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        address _receiveTokenAddress,
        ExchangeIssuanceLibrary.ExchangeIssuanceParams memory _exchangeIssuanceParams,
        bytes memory _orderData,
        bool _keepChangeInVault
    )
        public
        nonReentrant
    {
        redeemRebalancingSetIntoComponentsInternal(
            _rebalancingSetAddress,
            _rebalancingSetQuantity,
            _receiveTokenAddress,
            _exchangeIssuanceParams,
            _orderData
        );

        // Withdraw any excess traded for receiveToken from vault to contract
        // We call these ahead of time to allow unwrapping of Weth
        uint256 receiveTokenInVault = vaultInstance.getOwnerBalance(_receiveTokenAddress, address(this));
        if (receiveTokenInVault > 0) {
            coreInstance.withdrawModule(
                address(this),
                address(this),
                _receiveTokenAddress,
                receiveTokenInVault
            );
        }

        uint256 receiveTokenBalance = ERC20Wrapper.balanceOf(_receiveTokenAddress, address(this));

        // Transfer receiveToken to the caller
        ERC20Wrapper.transfer(
            _receiveTokenAddress,
            msg.sender,
            receiveTokenBalance
        );

        returnRedemptionChange(
            _exchangeIssuanceParams.setAddress,
            _keepChangeInVault     
        );
    }


    /* ============ Private Functions ============ */

    function issueRebalancingSetInternal(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        address _paymentToken,
        uint256 _paymentTokenQuantity,
        ExchangeIssuanceLibrary.ExchangeIssuanceParams memory _exchangeIssuanceParams,
        bytes memory _orderData,
        bool _keepChangeInVault
    )
        private
    {
        address baseSetAddress = _exchangeIssuanceParams.setAddress;
        uint256 baseSetIssueQuantity = _exchangeIssuanceParams.quantity;

        // Validate Inputs
        validateInputs(
            _paymentToken,
            _rebalancingSetAddress,
            _rebalancingSetQuantity,
            baseSetAddress,
            _exchangeIssuanceParams.sendTokens
        );

        // Ensure payment token allowance
        ERC20Wrapper.ensureAllowance(
            _paymentToken,
            address(this),
            transferProxy,
            _paymentTokenQuantity
        );

        // exchange issue Base Set
        exchangeIssuanceInstance.exchangeIssue(
            _exchangeIssuanceParams,
            _orderData
        );

        // Approve base Set to transfer proxy
        ERC20Wrapper.ensureAllowance(
            baseSetAddress,
            address(this),
            transferProxy,
            baseSetIssueQuantity
        );

        // Issue rebalancing set to the caller
        coreInstance.issueTo(
            msg.sender,
            _rebalancingSetAddress,
            _rebalancingSetQuantity
        );

        // Send excess base Set and ether to the user
        returnExcessBaseSetFromContract(
            baseSetAddress,
            transferProxy,
            _keepChangeInVault
        );

        // Return Excess Components in Vault from exchangeIssuance
        returnExcessComponentsFromVault(baseSetAddress);

        // Note paymentTokenQuantity could be spoofed
        emit LogPayableExchangeIssue(
            _rebalancingSetAddress,
            msg.sender,
            _paymentToken,
            _paymentTokenQuantity
        );
    }

    function redeemRebalancingSetIntoComponentsInternal(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        address _receiveToken,
        ExchangeIssuanceLibrary.ExchangeIssuanceParams memory _exchangeIssuanceParams,
        bytes memory _orderData
    )
        private
    {
        // Validate Params
        validateInputs(
            _receiveToken,
            _rebalancingSetAddress,
            _rebalancingSetQuantity,
            _exchangeIssuanceParams.setAddress,
            _exchangeIssuanceParams.receiveTokens
        );

        // Redeem rebalancing Set from the user to this contract in the vault
        coreInstance.redeemModule(
            msg.sender,
            address(this),
            _rebalancingSetAddress,
            _rebalancingSetQuantity
        );

        address baseSetAddress = _exchangeIssuanceParams.setAddress;
        uint256 baseSetVaultQuantity = vaultInstance.getOwnerBalance(baseSetAddress, address(this));

        // Withdraw Base Set from Vault to this contract.
        coreInstance.withdrawModule(
            address(this),
            address(this),
            baseSetAddress,
            baseSetVaultQuantity
        );

        // Exchange redeem Base Set
        // To investigate: Could there ever be a case where there is an issue
        exchangeIssuanceInstance.exchangeRedeem(
            _exchangeIssuanceParams,
            _orderData
        );

        emit LogPayableExchangeRedeem(
            _rebalancingSetAddress,
            msg.sender,
            _rebalancingSetQuantity
        );        
    }

    function returnRedemptionChange(
        address _baseSetAddress,
        bool _keepChangeInVault
    )
        private
    {
        // Send excess base Set and ether to the user
        returnExcessBaseSetFromContract(
            _baseSetAddress,
            transferProxy,
            _keepChangeInVault
        );

        // Non-exchanged components are returned to the user
        returnExcessComponentsFromContract(_baseSetAddress);
    }
}