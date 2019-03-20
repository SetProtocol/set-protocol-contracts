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

pragma solidity 0.5.4;
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
import { IWETH } from "../../lib/IWETH.sol";
import { ModuleCoreState } from "./lib/ModuleCoreState.sol";


/**
 * @title RebalancingSetExchangeIssuanceModule
 * @author Set Protocol
 *
 * The RebalancingSetExchangeIssuanceModule supplementary smart contract allows a user to send Eth and atomically
 * issue a rebalancing Set
 */
contract RebalancingSetExchangeIssuanceModule is
    ModuleCoreState,
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
        uint256 etherQuantity
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
        ExchangeIssuanceLibrary.ExchangeIssuanceParams memory _exchangeIssuanceParams,
        bytes memory _orderData
    )
        public
        payable
        nonReentrant
    {
        // wrap all eth
        wethInstance.deposit.value(msg.value)();

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

        // Calculate the rebalancing Set issue Quantity
        uint256 rebalancingSetIssueQuantity = calculateRebalancingSetIssueQuantity(
            _rebalancingSetAddress,
            baseSetIssueQuantity
        );

        // Issue rebalancing set to the caller
        coreInstance.issueTo(
            msg.sender,
            _rebalancingSetAddress,
            rebalancingSetIssueQuantity
        );

        // Send excess base Set and ether to the user
        returnExcessFunds(baseSetAddress);

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
    function redeemRebalancingSetIntoEther(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        ExchangeIssuanceLibrary.ExchangeIssuanceParams memory _exchangeIssuanceParams,
        bytes memory _orderData
    )
        public
        nonReentrant
    {
        // Validate Params
        validateRedeemInputs(
            _rebalancingSetAddress,
            _rebalancingSetQuantity,
            _exchangeIssuanceParams
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

        // Withdraw eth from WETH
        uint256 wethBalance = ERC20Wrapper.balanceOf(
            weth,
            address(this)
        );
        wethInstance.withdraw(wethBalance);

        // Send eth to user
        msg.sender.transfer(wethBalance);

        // Non-exchanged components are returned to the user
        returnExcessBaseSetComponents(_exchangeIssuanceParams.setAddress);

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
    function returnExcessFunds(
        address _baseSetAddress
    )
        private
    {
        // Return any excess base Set to the user
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

        // unwrap any leftover WETH and send eth back to the user
        uint256 leftoverEth = ERC20Wrapper.balanceOf(
            weth,
            address(this)
        );
        if (leftoverEth > 0) {
            wethInstance.withdraw(leftoverEth);
            msg.sender.transfer(leftoverEth);
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
     * @param  _exchangeIssuanceParams   Struct containing data around the base Set issuance
     */
    function validateRedeemInputs(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        ExchangeIssuanceLibrary.ExchangeIssuanceParams memory _exchangeIssuanceParams
    )
        private
        view
    {
        // Require only 1 receive token
        require(
            _exchangeIssuanceParams.receiveTokens.length == 1,
            "RebalancingSetExchangeIssuanceModule.validateRedeemInputs: Only 1 Receive Token Allowed"
        );

        // Require receive token is weth
        require(
            weth == _exchangeIssuanceParams.receiveTokens[0],
            "RebalancingSetExchangeIssuanceModule.validateRedeemInputs: Receive token must be Weth"
        );

        ISetToken rebalancingSet = ISetToken(_rebalancingSetAddress);

        // Validate that the base Set address matches the issuanceParams Set Address
        address baseSet = rebalancingSet.getComponents()[0];
        require(
            baseSet == _exchangeIssuanceParams.setAddress,
            "RebalancingSetExchangeIssuanceModule.validateRedeemInputs: Base Set addresses must match"
        );

        // Quantity of base Set must be the same as in exchange issuance params
        uint256 baseSetUnit = rebalancingSet.getUnits()[0];
        uint256 rebalancingSetNaturalUnit = rebalancingSet.naturalUnit();
        uint256 impliedBaseSetQuantity = _rebalancingSetQuantity
            .mul(baseSetUnit)
            .div(rebalancingSetNaturalUnit);
        require(
            impliedBaseSetQuantity == _exchangeIssuanceParams.quantity,
            "RebalancingSetExchangeIssuanceModule.validateRedeemInputs: Base Set quantities must match"
        );
    }
    /**
     * Withdraw any non-exchanged components to the user
     *
     * @param  _setAddress   Address of the Base Set
     */
    function returnExcessBaseSetComponents(
        address _setAddress
    )
        private
    {
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
