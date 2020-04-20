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
import { CommonMath } from "set-protocol-contract-utils/contracts/lib/CommonMath.sol";

import { ExchangeIssuanceLibrary } from "./lib/ExchangeIssuanceLibrary.sol";
import { ERC20Wrapper } from "../../lib/ERC20Wrapper.sol";
import { ICore } from "../interfaces/ICore.sol";
import { IExchangeIssuanceModule } from "../interfaces/IExchangeIssuanceModule.sol";
import { IRebalancingSetToken } from "../interfaces/IRebalancingSetToken.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { ITransferProxy } from "../interfaces/ITransferProxy.sol";
import { IVault } from "../interfaces/IVault.sol";
import { IWETH } from "../../lib/IWETH.sol";
import { ModuleCoreStateV2 } from "./lib/ModuleCoreStateV2.sol";
import { TokenFlush } from "./lib/TokenFlush.sol";


/**
 * @title RebalancingSetExchangeIssuanceModule
 * @author Set Protocol
 *
 * The RebalancingSetExchangeIssuanceModule supplementary smart contract allows a user to issue and redeem a Rebalancing Set
 * using a payment token or receiving a receive token atomically in a single transaction using liquidity from
 * decentralized exchanges.
 */
contract RebalancingSetExchangeIssuanceModule is
    ModuleCoreStateV2,
    TokenFlush,
    ReentrancyGuard
{
    using SafeMath for uint256;

    /* ============ State Variables ============ */

    // Address and instance of ExchangeIssuance Module contract
    IExchangeIssuanceModule public exchangeIssuanceModuleInstance;

    // Address and instance of Wrapped Ether contract
    IWETH public wethInstance;

    /* ============ Events ============ */

    event LogPayableExchangeIssue(
        address indexed rebalancingSetAddress,
        address indexed callerAddress,
        address paymentTokenAddress,
        uint256 rebalancingSetQuantity,
        uint256 paymentTokenReturned
    );

    event LogPayableExchangeRedeem(
        address indexed rebalancingSetAddress,
        address indexed callerAddress,
        address outputTokenAddress,
        uint256 rebalancingSetQuantity,
        uint256 outputTokenQuantity
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
        ICore _core,
        ITransferProxy _transferProxy,
        IExchangeIssuanceModule _exchangeIssuanceModule,
        IWETH _wrappedEther,
        IVault _vault
    )
        public
        ModuleCoreStateV2(
            _core,
            _vault,
            _transferProxy
        )
    {
        // Commit the instance of ExchangeIssuanceModule to state variables
        exchangeIssuanceModuleInstance = _exchangeIssuanceModule;

        // Commit the address and instance of Wrapped Ether to state variables
        wethInstance = _wrappedEther;

        // Add approvals of Wrapped Ether to the Transfer Proxy
        ERC20Wrapper.approve(
            address(_wrappedEther),
            address(_transferProxy),
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
        require(
            msg.sender == address(wethInstance),
            "RebalancingSetExchangeIssuanceModule.fallback: Cannot receive ETH directly unless unwrapping WETH"
        );
    }

    /* ============ Public Functions ============ */

    /**
     * Issue a Rebalancing Set using Wrapped Ether to acquire the base components of the Base Set.
     * The Base Set is then issued using ExchangeIssue and reissued into the Rebalancing Set.
     * All remaining tokens / change are flushed and returned to the user.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing Set to issue
     * @param  _rebalancingSetQuantity   Quantity of the rebalancing Set
     * @param  _exchangeIssuanceParams   Struct containing data around the base Set issuance
     * @param  _orderData                Bytecode encoding exchange data for acquiring base set components
     * @param  _keepChangeInVault        Boolean signifying whether excess base SetToken is transferred to the user
     *                                     or left in the vault
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
        // Wrap all Ether; Wrapped Ether could be a component of the Set being issued.
        wethInstance.deposit.value(msg.value)();

        // Perform exchange transactions, mint the base SetToken, and issue the Rebalancing Set to the sender
        issueRebalancingSetInternal(
            _rebalancingSetAddress,
            _rebalancingSetQuantity,
            address(wethInstance),
            msg.value,
            _exchangeIssuanceParams,
            _orderData,
            _keepChangeInVault
        );

        // unwrap any leftover WETH and transfer to sender
        uint256 leftoverWeth = ERC20Wrapper.balanceOf(address(wethInstance), address(this));
        if (leftoverWeth > 0) {
            // Withdraw wrapped Ether
            wethInstance.withdraw(leftoverWeth);

            // Transfer ether to user
            msg.sender.transfer(leftoverWeth);
        }

        emit LogPayableExchangeIssue(
            _rebalancingSetAddress,
            msg.sender,
            address(wethInstance),
            _rebalancingSetQuantity,
            leftoverWeth
        );
    }

    /**
     * Issue a Rebalancing Set using a specified ERC20 payment token. The payment token is used in ExchangeIssue
     * to acquire the base SetToken components and issue the base SetToken. The base SetToken is then used to
     * issue the Rebalancing SetToken. The payment token can be utilized as a component of the base SetToken.
     * All remaining tokens / change are flushed and returned to the user.
     * Ahead of calling this function, the user must approve their paymentToken to the transferProxy.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing Set to issue
     * @param  _rebalancingSetQuantity   Quantity of the rebalancing Set
     * @param  _paymentTokenAddress      Address of the ERC20 token to pay with
     * @param  _paymentTokenQuantity     Quantity of the payment token
     * @param  _exchangeIssuanceParams   Struct containing data around the base Set issuance
     * @param  _orderData                Bytecode formatted data with exchange data for acquiring base set components
     * @param  _keepChangeInVault        Boolean signifying whether excess base SetToken is transfered to the user
     *                                     or left in the vault
     */
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
        // Deposit the erc20 to this contract. The token must be approved the caller to the transferProxy
        coreInstance.transferModule(
            _paymentTokenAddress,
            _paymentTokenQuantity,
            msg.sender,
            address(this)
        );

        // Perform exchange transactions, mint the base SetToken, and issue the Rebalancing Set to the sender
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
        uint256 leftoverPaymentTokenQuantity = ERC20Wrapper.balanceOf(_paymentTokenAddress, address(this));
        if (leftoverPaymentTokenQuantity > 0) {
            ERC20Wrapper.transfer(
                _paymentTokenAddress,
                msg.sender,
                leftoverPaymentTokenQuantity
            );
        }

        emit LogPayableExchangeIssue(
            _rebalancingSetAddress,
            msg.sender,
            _paymentTokenAddress,
            _rebalancingSetQuantity,
            leftoverPaymentTokenQuantity
        );
    }

    /**
     * Redeems a Rebalancing Set into ether. The Rebalancing Set is redeemed into the Base Set, and
     * Base Set components are traded for WETH. The WETH is then withdrawn into ETH and the ETH sent to the caller.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing Set
     * @param  _rebalancingSetQuantity   Quantity of rebalancing Set to redeem
     * @param  _exchangeIssuanceParams   Struct containing data around the base Set issuance
     * @param  _orderData                Bytecode encoding exchange data for disposing base set components
     * @param  _keepChangeInVault        Boolean signifying whether excess base SetToken is transfered to the user
     *                                     or left in the vault
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
        // Redeems the rebalancing Set into the base SetToken, redeems the base SetToken into its components,
        // and exchanges the components into wrapped ether to this contract.
        redeemRebalancingSetIntoComponentsInternal(
            _rebalancingSetAddress,
            _rebalancingSetQuantity,
            address(wethInstance),
            _exchangeIssuanceParams,
            _orderData
        );

        // In the event that exchangeIssue returns more receiveTokens or wrappedEth than
        // specified in receiveToken quantity, those tokens are also retrieved into this contract.
        // We also call this ahead of returnRedemptionChange to allow the unwrapping of the wrappedEther
        uint256 wethQuantityInVault = vaultInstance.getOwnerBalance(address(wethInstance), address(this));
        if (wethQuantityInVault > 0) {
            coreInstance.withdrawModule(
                address(this),
                address(this),
                address(wethInstance),
                wethQuantityInVault
            );
        }

        // Unwrap wrapped Ether and transfer Eth to user
        uint256 wethBalance = ERC20Wrapper.balanceOf(address(wethInstance), address(this));
        if (wethBalance > 0) {
            wethInstance.withdraw(wethBalance);
            msg.sender.transfer(wethBalance);
        }

        address baseSetAddress = _exchangeIssuanceParams.setAddress;

        // Send excess base Set to the user
        returnExcessBaseSetFromContract(
            baseSetAddress,
            msg.sender,
            _keepChangeInVault
        );

        // Return non-exchanged components to the user
        returnExcessComponentsFromContract(ISetToken(baseSetAddress), msg.sender);

        emit LogPayableExchangeRedeem(
            _rebalancingSetAddress,
            msg.sender,
            address(wethInstance),
            _rebalancingSetQuantity,
            wethBalance
        );
    }

    /**
     * Redeems a Rebalancing Set into a specified ERC20 token. The Rebalancing Set is redeemed into the Base Set, and
     * Base Set components are traded for the ERC20 and sent to the caller.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing Set
     * @param  _rebalancingSetQuantity   Quantity of rebalancing Set to redeem
     * @param  _outputTokenAddress       Address of the resulting ERC20 token sent to the user
     * @param  _exchangeIssuanceParams   Struct containing data around the base Set issuance
     * @param  _orderData                Bytecode formatted data with exchange data for disposing base set components
     * @param  _keepChangeInVault        Boolean signifying whether excess base SetToken is transfered to the user
     *                                     or left in the vault
     */
    function redeemRebalancingSetIntoERC20(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        address _outputTokenAddress,
        ExchangeIssuanceLibrary.ExchangeIssuanceParams memory _exchangeIssuanceParams,
        bytes memory _orderData,
        bool _keepChangeInVault
    )
        public
        nonReentrant
    {
        // Redeems the rebalancing Set into the base SetToken, redeems the base SetToken into its components,
        // and exchanges the components into the receiveToken to this contract.
        redeemRebalancingSetIntoComponentsInternal(
            _rebalancingSetAddress,
            _rebalancingSetQuantity,
            _outputTokenAddress,
            _exchangeIssuanceParams,
            _orderData
        );

        // In the event that exchangeIssue returns more outputTokens than
        // specified in receiveToken quantity, those tokens are also retrieved into this contract.
        uint256 outputTokenInVault = vaultInstance.getOwnerBalance(_outputTokenAddress, address(this));
        if (outputTokenInVault > 0) {
            coreInstance.withdrawModule(
                address(this),
                address(this),
                _outputTokenAddress,
                outputTokenInVault
            );
        }

        // Transfer outputToken to the caller
        uint256 outputTokenBalance = ERC20Wrapper.balanceOf(_outputTokenAddress, address(this));
        ERC20Wrapper.transfer(
            _outputTokenAddress,
            msg.sender,
            outputTokenBalance
        );

        address baseSetAddress = _exchangeIssuanceParams.setAddress;

        // Send excess base SetToken to the user
        returnExcessBaseSetFromContract(
            baseSetAddress,
            msg.sender,
            _keepChangeInVault
        );

        // Non-exchanged base SetToken components are returned to the user
        returnExcessComponentsFromContract(ISetToken(baseSetAddress), msg.sender);

        emit LogPayableExchangeRedeem(
            _rebalancingSetAddress,
            msg.sender,
            _outputTokenAddress,
            _rebalancingSetQuantity,
            outputTokenBalance
        );
    }


    /* ============ Private Functions ============ */

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
    function validateExchangeIssuanceInputs(
        address _transactTokenAddress,
        IRebalancingSetToken _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        address _baseSetAddress,
        address[] memory _transactTokenArray
    )
        private
        view
    {
        // Expect rebalancing SetToken to be valid and enabled SetToken
        require(
            coreInstance.validSets(address(_rebalancingSetAddress)),
            "RebalancingSetExchangeIssuance.validateExchangeIssuanceInputs: Invalid or disabled SetToken address"
        );

        require(
            _rebalancingSetQuantity > 0,
            "RebalancingSetExchangeIssuance.validateExchangeIssuanceInputs: Quantity must be > 0"
        );

        // Make sure Issuance quantity is multiple of the rebalancing SetToken natural unit
        require(
            _rebalancingSetQuantity.mod(_rebalancingSetAddress.naturalUnit()) == 0,
            "RebalancingSetExchangeIssuance.validateExchangeIssuanceInputs: Quantity must be multiple of natural unit"
        );

        // Multiple items are allowed on the transactTokenArray. Specifically, this allows there to be
        // multiple sendToken items that are directed to the various exchangeWrappers.
        // The receiveTokenArray is implicitly limited to a single item, as the exchangeIssuanceModuleInstance
        // checks that the receive tokens do not have duplicates
        for (uint256 i = 0; i < _transactTokenArray.length; i++) {
            // The transact token array tokens must match the transact token.
            require(
                _transactTokenAddress == _transactTokenArray[i],
                "RebalancingSetExchangeIssuance.validateExchangeIssuanceInputs: Send/Receive token must match transact token"
            );
        }

        // Validate that the base Set address matches the issuanceParams Set Address
        address baseSet = _rebalancingSetAddress.currentSet();
        require(
            baseSet == _baseSetAddress,
            "RebalancingSetExchangeIssuance.validateExchangeIssuanceInputs: Base Set addresses must match"
        );
    }

    /**
     * Issue a Rebalancing Set using a specified ERC20 payment token. The payment token is used in ExchangeIssue
     * to acquire the base SetToken components and issue the base SetToken. The base SetToken is then used to
     * issue the Rebalancing SetToken. The payment token can be utilized as a component of the base SetToken.
     * All remaining tokens / change are flushed and returned to the user.
     *
     * Note: We do not validate the rebalancing SetToken quantity and the exchangeIssuanceParams base SetToken
     * quantity. Thus there could be extra base SetToken (or change) generated.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing Set to issue
     * @param  _rebalancingSetQuantity   Quantity of the rebalancing Set
     * @param  _paymentTokenAddress      Address of the ERC20 token to pay with
     * @param  _paymentTokenQuantity     Quantity of the payment token
     * @param  _exchangeIssuanceParams   Struct containing data around the base Set issuance
     * @param  _orderData                Bytecode formatted data with exchange data for acquiring base set components
     * @param  _keepChangeInVault        Boolean signifying whether excess base SetToken is transfered to the user
     *                                     or left in the vault
     */
    function issueRebalancingSetInternal(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        address _paymentTokenAddress,
        uint256 _paymentTokenQuantity,
        ExchangeIssuanceLibrary.ExchangeIssuanceParams memory _exchangeIssuanceParams,
        bytes memory _orderData,
        bool _keepChangeInVault
    )
        private
    {
        address baseSetAddress = _exchangeIssuanceParams.setAddress;
        uint256 baseSetIssueQuantity = _exchangeIssuanceParams.quantity;

        // Validate parameters
        validateExchangeIssuanceInputs(
            _paymentTokenAddress,
            IRebalancingSetToken(_rebalancingSetAddress),
            _rebalancingSetQuantity,
            baseSetAddress,
            _exchangeIssuanceParams.sendTokens
        );

        // Ensure payment token allowance to the TransferProxy
        // Note that the paymentToken may also be used as a component to issue the Set
        // So the paymentTokenQuantity must be used vs. the exchangeIssuanceParams sendToken quantity
        ERC20Wrapper.ensureAllowance(
            _paymentTokenAddress,
            address(this),
            address(transferProxyInstance),
            _paymentTokenQuantity
        );

        // Atomically trade paymentToken for base SetToken components and mint the base SetToken
        exchangeIssuanceModuleInstance.exchangeIssue(
            _exchangeIssuanceParams,
            _orderData
        );

        // Approve base SetToken to transferProxy for minting rebalancing SetToken
        ERC20Wrapper.ensureAllowance(
            baseSetAddress,
            address(this),
            address(transferProxyInstance),
            baseSetIssueQuantity
        );

        // Issue rebalancing SetToken to the caller
        coreInstance.issueTo(
            msg.sender,
            _rebalancingSetAddress,
            _rebalancingSetQuantity
        );

        // Send excess base Set held in this contract to the user
        // If keepChangeInVault is true, the baseSetToken is held in the Vault
        // which is a UX improvement
        returnExcessBaseSetFromContract(
            baseSetAddress,
            msg.sender,
            _keepChangeInVault
        );

        // Return any extra components acquired during exchangeIssue to the user
        returnExcessComponentsFromVault(ISetToken(baseSetAddress), msg.sender);
    }

    /**
     * Redeems a Rebalancing Set into the receiveToken. The Rebalancing Set is redeemed into the Base Set, and
     * Base Set components are traded for the receiveToken located in this contract.
     *
     * Note: We do not validate the rebalancing SetToken quantity and the exchangeIssuanceParams base SetToken
     * quantity. Thus there could be extra base SetToken (or change) generated.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing Set
     * @param  _rebalancingSetQuantity   Quantity of rebalancing Set to redeem
     * @param  _receiveTokenAddress      Address of the receiveToken
     * @param  _exchangeIssuanceParams   Struct containing data around the base Set issuance
     * @param  _orderData                Bytecode formatted data with exchange data for disposing base set components
     */
    function redeemRebalancingSetIntoComponentsInternal(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        address _receiveTokenAddress,
        ExchangeIssuanceLibrary.ExchangeIssuanceParams memory _exchangeIssuanceParams,
        bytes memory _orderData
    )
        private
    {
        // Validate Params
        validateExchangeIssuanceInputs(
            _receiveTokenAddress,
            IRebalancingSetToken(_rebalancingSetAddress),
            _rebalancingSetQuantity,
            _exchangeIssuanceParams.setAddress,
            _exchangeIssuanceParams.receiveTokens
        );

        // Redeem rebalancing Set into the base SetToken from the user to this contract in the Vault
        coreInstance.redeemModule(
            msg.sender,
            address(this),
            _rebalancingSetAddress,
            _rebalancingSetQuantity
        );

        address baseSetAddress = _exchangeIssuanceParams.setAddress;
        uint256 baseSetVaultQuantity = vaultInstance.getOwnerBalance(baseSetAddress, address(this));

        // Withdraw base SetToken from Vault to this contract
        coreInstance.withdrawModule(
            address(this),
            address(this),
            baseSetAddress,
            baseSetVaultQuantity
        );

        // Redeem base SetToken into components and perform trades / exchanges
        // into the receiveToken. The receiveTokens are transferred to this contract
        // as well as the remaining non-exchanged components
        exchangeIssuanceModuleInstance.exchangeRedeem(
            _exchangeIssuanceParams,
            _orderData
        );
    }
}