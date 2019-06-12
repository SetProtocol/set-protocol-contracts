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
import { IRebalancingSetToken } from "../interfaces/IRebalancingSetToken.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { ITransferProxy } from "../interfaces/ITransferProxy.sol";
import { ModuleCoreState } from "./lib/ModuleCoreState.sol";


/**
 * @title ERC20RebalancingSetExchangeIssuanceModule
 * @author Set Protocol
 *
 * The ERC20RebalancingSetExchangeIssuanceModule supplementary smart contract allows a user to send Eth and atomically
 * issue a rebalancing Set
 */
contract ERC20RebalancingSetExchangeIssuanceModule is
    ModuleCoreState,
    ReentrancyGuard
{
    using SafeMath for uint256;

    /* ============ State Variables ============ */

    // Address and instance of Transfer Proxy contract
    address public transferProxy;
    ITransferProxy public transferProxyInstance;

    // Address and instance of ExchangeIssuance Module contract
    address public exchangeIssuanceModule;
    IExchangeIssuanceModule private exchangeIssuanceInstance;

    /* ============ Events ============ */

    event LogPayableExchangeIssue(
        address rebalancingSetAddress,
        address indexed callerAddress,
        uint256 etherQuantity
    );

    event LogPayableExchangeRedeem(
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
        address _exchangeIssuanceModule,
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
    function issueRebalancingSetWithERC20(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        ExchangeIssuanceLibrary.ExchangeIssuanceParams memory _exchangeIssuanceParams,
        bytes memory _orderData
    )
        public
        payable
        nonReentrant
    {
        // Validate Params
        validateInputs(
            _rebalancingSetAddress,
            _rebalancingSetQuantity,
            _exchangeIssuanceParams.setAddress,
            _exchangeIssuanceParams.sendTokens
        );

        address paymentToken = _exchangeIssuanceParams.sendTokens[0];
        uint256 paymentTokenAmount = _exchangeIssuanceParams.sendTokenAmounts[0];

        // Transfer ERC20 payment token from the user to this contract
        // Approvals must be set ahead of time
        // TODO - is there a way deposit to this account.
        // So that allowance isn't needed and extra transfers not needed?
        coreInstance.transferModule(
            paymentToken,
            paymentTokenAmount,
            msg.sender,
            address(this)
        );

        // Ensure send token allowance
        ERC20Wrapper.ensureAllowance(
            paymentToken,
            address(this),
            transferProxy,
            paymentTokenAmount
        );

        // exchange issue Base Set
        exchangeIssuanceInstance.exchangeIssue(
            _exchangeIssuanceParams,
            _orderData
        );

        address baseSetAddress = _exchangeIssuanceParams.setAddress;
        uint256 baseSetIssueQuantity = _exchangeIssuanceParams.quantity;

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
        returnIssuanceExcessFunds(baseSetAddress);

        emit LogPayableExchangeIssue(
            _rebalancingSetAddress,
            msg.sender,
            msg.value
        );
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

        // Redeem rebalancing Set from the user to this contract in the vault
        coreInstance.redeemModule(
            msg.sender,
            address(this),
            _rebalancingSetAddress,
            _rebalancingSetQuantity
        );

        // Withdraw components to this contract.
        coreInstance.withdrawModule(
            address(this),
            address(this),
            _exchangeIssuanceParams.setAddress,
            _exchangeIssuanceParams.quantity
        );

        // Exchange redeem Base Set
        exchangeIssuanceInstance.exchangeRedeem(
            _exchangeIssuanceParams,
            _orderData
        );

        coreInstance.withdrawModule(
            address(this),
            msg.sender,
            _exchangeIssuanceParams.receiveTokens[0],
            _exchangeIssuanceParams.receiveTokenAmounts[0]
        );

        // Non-exchanged components are returned to the user
        returnRedemptionExcessFunds(_exchangeIssuanceParams.setAddress);

        emit LogPayableExchangeRedeem(
            _rebalancingSetAddress,
            msg.sender,
            _rebalancingSetQuantity
        );
    }

    /* ============ Private Functions ============ */

    /**
     * Any unused Wrapped Ether or base Set issued is returned to the caller.
     *
     * @param _baseSetAddress    The address of the base Set
     */
    function returnIssuanceExcessFunds(
        address _baseSetAddress
    )
        private
    {
        // Return any excess base Set to the user not used in rebalancing set issuance
        uint256 leftoverBaseSet = ERC20Wrapper.balanceOf(
            _baseSetAddress,
            address(this)
        );
        if (leftoverBaseSet > 0) {
            ERC20Wrapper.transfer(
                _baseSetAddress,
                msg.sender,
                leftoverBaseSet
            );
        }

        // Return base Set components not used in issuance of base set
        address[] memory baseSetComponents = ISetToken(_baseSetAddress).getComponents();
        for (uint256 i = 0; i < baseSetComponents.length; i++) {
            uint256 vaultQuantity = vaultInstance.getOwnerBalance(baseSetComponents[i], address(this));
            if (vaultQuantity > 0) {
                coreInstance.withdrawModule(
                    address(this),
                    msg.sender,
                    baseSetComponents[i],
                    vaultQuantity
                );
            }
        }
    }

    /**
     * Given the issue quantity of the base Set, calculates the maximum quantity of rebalancing Set
     * issuable. Quantity should already be a multiple of the natural unit.
     *
     * @param _rebalancingSetAddress    The address of the rebalancing Set
     * @param _baseSetIssueQuantity     The quantity issued of the base Set
     * @return rbSetIssueQuantity      The quantity of rebalancing Set to issue
     */
    function calculateRebalancingSetIssueQuantity(
        address _rebalancingSetAddress,
        uint256 _baseSetIssueQuantity
    )
        private
        view
        returns (uint256)
    {
        uint256 rbSetUnitShares = IRebalancingSetToken(_rebalancingSetAddress).unitShares();
        uint256 rbSetNaturalUnit = IRebalancingSetToken(_rebalancingSetAddress).naturalUnit();

        // Calculate the possible number of Sets issuable (may not be a multiple of natural unit)
        uint256 possibleIssuableRBSetQuantity = _baseSetIssueQuantity.mul(rbSetNaturalUnit).div(rbSetUnitShares);

        // Ensure that the base Set quantity is a multiple of the rebalancing Set natural unit
        uint256 rbSetIssueQuantity = possibleIssuableRBSetQuantity.div(rbSetNaturalUnit).mul(rbSetNaturalUnit);

        return rbSetIssueQuantity;
    }

    /**
     * Validate that the redeem parameters and inputs are congruent.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing Set
     * @param  _rebalancingSetQuantity   Quantity of rebalancing Set to redeem
     * @param  _collateralSetAddress     Address of base Set in ExchangeIssueanceParams
     * @param  _collateralSetAddress     Address of base Set in ExchangeIssueanceParams
     */
    function validateInputs(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        address _collateralSetAddress,
        address[] memory _sendTokenArray
    )
        private
        view
    {
        // Expect Set to rebalance to be valid and enabled Set
        require(
            coreInstance.validSets(_rebalancingSetAddress),
            "ERC20RebalancingSetExchangeIssuanceModule.validateInputs: Invalid or disabled SetToken address"
        );

        // Require only 1 receive token in redeem and 1 send token in issue
        require(
            _sendTokenArray.length == 1,
            "ERC20RebalancingSetExchangeIssuanceModule.validateInputs: Only 1 Receive Token Allowed"
        );

        ISetToken rebalancingSet = ISetToken(_rebalancingSetAddress);

        // Validate that the base Set address matches the issuanceParams Set Address
        address baseSet = rebalancingSet.getComponents()[0];
        require(
            baseSet == _collateralSetAddress,
            "ERC20RebalancingSetExchangeIssuanceModule.validateInputs: Base Set addresses must match"
        );

        ExchangeIssuanceLibrary.validateQuantity(
            _rebalancingSetAddress,
            _rebalancingSetQuantity
        );
    }
    /**
     * Withdraw any remaining Base Set and non-exchanged components to the user
     *
     * @param  _setAddress   Address of the Base Set
     */
    function returnRedemptionExcessFunds(
        address _setAddress
    )
        private
    {
        // Return base Set if any that are in the Vault
        uint256 baseSetQuantity = vaultInstance.getOwnerBalance(_setAddress, address(this));
        if (baseSetQuantity > 0) {
            coreInstance.withdrawModule(
                address(this),
                msg.sender,
                _setAddress,
                baseSetQuantity
            );
        }

        // Return base Set components
        address[] memory baseSetComponents = ISetToken(_setAddress).getComponents();
        for (uint256 i = 0; i < baseSetComponents.length; i++) {
            uint256 withdrawQuantity = ERC20Wrapper.balanceOf(baseSetComponents[i], address(this));
            if (withdrawQuantity > 0) {
                ERC20Wrapper.transfer(
                    baseSetComponents[i],
                    msg.sender,
                    withdrawQuantity
                );
            }
        }         
    }
}
