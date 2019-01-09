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
import { ISetToken } from "../core/interfaces/ISetToken.sol";
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

    // Address of Core contract
    address public core;

    ICore public coreInstance;

    // Address of Transfer Proxy contract
    address public transferProxy;

    ITransferProxy public transferProxyInstance;

    address public exchangeIssueModule;

    IExchangeIssueModule public exchangeIssueInstance;

    address public weth;

    IWETH public wethInstance;

    /* ============ Constructor ============ */

    /**
     * Constructor function for IssuanceOrderModule
     *
     * @param _core       The address of Core
     */
    constructor(
        address _core,
        address _transferProxy,
        address _exchangeIssueModule,
        address _wrappedEther
    )
        public
    {
        core = _core;
        coreInstance = ICore(_core);

        exchangeIssueModule = _exchangeIssueModule;
        exchangeIssueInstance = IExchangeIssueModule(_exchangeIssueModule);        

        transferProxy = _transferProxy;
        transferProxyInstance = ITransferProxy(transferProxy);

        weth = _wrappedEther;

        wethInstance = IWETH(_wrappedEther);

        ERC20Wrapper.approve(
            _wrappedEther,
            _transferProxy,
            CommonMath.maxUInt256()
        );
    }

    /* ============ Public Functions ============ */

    /**
     * Bid on rebalancing a given quantity of sets held by a rebalancing token
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing token being bid on
     */
    function issueRebalancingSetWithEther(
        address _rebalancingSetAddress,
        ExchangeIssueLibrary.ExchangeIssue memory _exchangeIssueData,
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

        // Approve Set to transfer proxy
        ERC20Wrapper.ensureAllowance(
            baseSetAddress,
            address(this),
            transferProxy,
            baseSetIssueQuantity
        );

        uint256 rebalancingSetNaturalUnit = ISetToken(_rebalancingSetAddress).naturalUnit();
        uint256 rebalancingSetIssueQuantity = baseSetIssueQuantity.div(rebalancingSetNaturalUnit);

        // issue rebalancing set
        coreInstance.issueTo(
            msg.sender,
            _rebalancingSetAddress,
            rebalancingSetIssueQuantity
        );

        returnExcessFunds(baseSetAddress);        
    }


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
}
