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

import { WETH9 } from "canonical-weth/contracts/WETH9.sol";
import { ReentrancyGuard } from "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";

import { ICore } from "../interfaces/ICore.sol";
import { IExchangeIssueModule } from "../interfaces/IExchangeIssueModule.sol";
import { ITransferProxy } from "../interfaces/ITransferProxy.sol";


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

    // Address of Core contract
    address public core;

    ICore public coreInstance;

    // Address of Transfer Proxy contract
    address public transferProxy;

    ITransferProxy public transferProxyInstance;

    address public exchangeIssueModule;

    IExchangeIssueModule public exchangeIssueInstance;

    WETH9 public wethInstance;

    /* ============ Constructor ============ */

    /**
     * Constructor function for IssuanceOrderModule
     *
     * @param _core       The address of Core
     * @param _vault       The address of Vault
     */
    constructor(
        address _core,
        address _exchangeIssueModule,
        address _wrappedEther
    )
        public
    {
        core = _core;
        coreInstance = ICore(_core);

        exchangeIssueModule = _exchangeIssueModule;
        exchangeIssueInstance = IExchangeIssueModule(_exchangeIssueModule);        

        transferProxy = coreInstance.transferProxy();
        transferProxyInstance = ITransferProxy(transferProxy);

        wethInstance = WETH9(_wrappedEther);
        wethInstance.approve(
            transferProxy,
            CommonMath.maxUInt256()
        );
    }

    /* ============ Public Functions ============ */

    /**
     * Bid on rebalancing a given quantity of sets held by a rebalancing token
     *
     * @param  _rebalancingSetToken    Address of the rebalancing token being bid on
     * @param  _quantity               Number of currentSets to rebalance
     */
    function issueRebalancingSetWithEther(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        ExchangeIssue memory _exchangeIssueData,
        bytes _orderData
    )
        external
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

        // Approve Set to transfer proxy
        ERC20Wrapper.ensureAllowance(
            baseSetAddress,
            address(this),
            _transferProxy,
            _exchangeIssueData.quantity
        );

        // issue rebalancing set
        coreInstance.issueTo(
            msg.sender,
            _rebalancingSetAddress,
            _rebalancingSetQuantity
        );

        returnExcessFunds(baseSetAddress);        
    }


    function returnExcessFunds(address _baseSetAddress) private {
        // Return any excess base Set to the user
        uint256 leftoverBaseSet = ERC20Wrapper.balanceOf(
            baseSetAddress,
            address(this)
        );
        if (leftoverBaseSet > 0) {
            ERC20Wrapper.transfer(
                baseSetAddress,
                msg.sender,
                leftoverBaseSet
            );
        }

        // unwrap any leftover WETH and send eth back to the user
        uint256 leftoverEth = WETH.balanceOf(address(this));
        if (leftoverEth > 0) {
            wethInstance.withdraw(leftoverEth);
            msg.sender.transfer(leftoverEth);
        }
    }
}
