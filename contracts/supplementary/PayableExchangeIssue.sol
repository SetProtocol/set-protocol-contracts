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

pragma solidity 0.4.25;
pragma experimental "ABIEncoderV2";

import { ReentrancyGuard } from "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { CommonMath } from "../lib/CommonMath.sol";
import { ExchangeIssueLibrary } from "../core/lib/ExchangeIssueLibrary.sol";
import { ERC20Wrapper } from "../lib/ERC20Wrapper.sol";
import { ICore } from "../core/interfaces/ICore.sol";
import { IExchangeIssueModule } from "../core/interfaces/IExchangeIssueModule.sol";
import { IRebalancingSetToken } from "../core/interfaces/IRebalancingSetToken.sol";
import { ITransferProxy } from "../core/interfaces/ITransferProxy.sol";
import { IWETH } from "../lib/IWETH.sol";


/**
 * @title Payable Exchange Issue
 * @author Set Protocol
 *
 * The PayableExchangeIssue supplementary smart contract allows a user to send Eth and atomically
 * issue a rebalancing Set
 */
contract PayableExchangeIssue is
    ReentrancyGuard
{
    using SafeMath for uint256;

    /* ============ State Variables ============ */

    // Address and instance of Core contract
    address public core;
    ICore private coreInstance;

    // Address and instance of Transfer Proxy contract
    address public transferProxy;
    ITransferProxy private transferProxyInstance;

    // Address and instance of Exchange Issue Module contract
    address public exchangeIssueModule;
    IExchangeIssueModule private exchangeIssueInstance;

    // Address and instance of Wrapped Ether contract
    address public weth;
    IWETH private wethInstance;

    /* ============ Constructor ============ */

    /**
     * Constructor function for IssuanceOrderModule
     *
     * @param _core                The address of Core
     * @param _transferProxy       The address of the transfer proxy
     * @param _exchangeIssueModule The address of exchange issue module
     * @param _wrappedEther        The address of wrapped ether
     */
    constructor(
        address _core,
        address _transferProxy,
        address _exchangeIssueModule,
        address _wrappedEther
    )
        public
    {
        // Commit the address and instance of Core to state variables
        core = _core;
        coreInstance = ICore(_core);

        // Commit the address and instance of Transfer Proxy to state variables
        transferProxy = _transferProxy;
        transferProxyInstance = ITransferProxy(transferProxy);

        // Commit the address and instance of Exchange Issue Module to state variables
        exchangeIssueModule = _exchangeIssueModule;
        exchangeIssueInstance = IExchangeIssueModule(_exchangeIssueModule);        

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
            "PayableExchangeIssue.fallback: Cannot recieve ETH directly unless unwrapping WETH"
        );
    }

    /* ============ Public Functions ============ */

    /**
     * Issue a Rebalancing Set using Wrapped Ether to acquire the base components of the Base Set.
     * The Base Set is then issued using Exchange Issue and reissued into the Rebalancing Set.
     * This function is meant to be used with a user interface 
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing Set to issue
     * @param  _exchangeIssueData        Struct containing data around the base Set issuance
     * @param  _orderData                Bytecode formatted data with exchange data for acquiring base set components
     */
    function issueRebalancingSetWithEther(
        address _rebalancingSetAddress,
        ExchangeIssueLibrary.ExchangeIssueParams memory _exchangeIssueData,
        bytes _orderData
    )
        public
        payable
        nonReentrant
    {
        // wrap all eth
        wethInstance.deposit.value(msg.value)();

        // exchange issue Base Set
        exchangeIssueInstance.exchangeIssue(
            _exchangeIssueData,
            _orderData
        );

        address baseSetAddress = _exchangeIssueData.setAddress;
        uint256 baseSetIssueQuantity = _exchangeIssueData.quantity;

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

        // issue rebalancing set to the caller
        coreInstance.issueTo(
            msg.sender,
            _rebalancingSetAddress,
            rebalancingSetIssueQuantity
        );

        returnExcessFunds(baseSetAddress);        
    }

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
     * issuable.
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
}
