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

import { CommonMath } from "../lib/CommonMath.sol";
import { IRebalanceAuctionModule } from "../core/interfaces/IRebalanceAuctionModule.sol";
import { IRebalancingSetToken } from "../core/interfaces/IRebalancingSetToken.sol";
import { ITransferProxy } from "../core/interfaces/ITransferProxy.sol";
import { IWETH } from "../lib/IWETH.sol";

import { ERC20Wrapper } from "../lib/ERC20Wrapper.sol";


/**
 * @title RebalancingSetEthBidder
 * @author Set Protocol
 *
 * A helper contract that wraps your ETH into WETH for bidding in the RebalanceAuctionModule.
 */
contract RebalancingSetEthBidder is
    ReentrancyGuard
{
    using SafeMath for uint256;
    
    // Address and instance of RebalanceAuctionModule contract
    IRebalanceAuctionModule public rebalanceAuctionModule;

    // Address and instance of RebalanceAuctionModule contract
    ITransferProxy public transferProxy;

    // Address and instance of Wrapped Ether contract
    IWETH public weth;

    /* ============ Constructor ============ */

    /**
     * Constructor function for RebalancingSetEthBidder
     *
     * @param _rebalanceAuctionModule   The address of RebalanceAuctionModule
     * @param _transferProxy            The address of TransferProxy
     * @param _weth                     The address of Wrapped Ether
     */
    constructor(
        IRebalanceAuctionModule _rebalanceAuctionModule,
        ITransferProxy _transferProxy,
        IWETH _weth
    )
        public
    {
        // Commit the RebalanceAuctionModule instance
        rebalanceAuctionModule = _rebalanceAuctionModule;

        // Commit the TransferProxy instance
        transferProxy = _transferProxy;

        // Commit the WETH instance
        weth = _weth;

        // Add approvals of Wrapped Ether to the Transfer Proxy
        ERC20Wrapper.approve(
            address(_weth),
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
            msg.sender == address(weth),
            "RebalancingSetEthBidder.fallback: Cannot receive ETH directly unless unwrapping WETH"
        );
    }

    /* ============ External Functions ============ */

    /**
     * Bid on rebalancing a given quantity of sets held by a rebalancing token wrapping or unwrapping
     * any ETH involved. The tokens are returned to the user.
     *
     * @param  _rebalancingSetToken    Address of the rebalancing token being bid on
     * @param  _quantity               Number of currentSets to rebalance
     * @param  _allowPartialFill       Set to true if want to partially fill bid when quantity
                                       is greater than currentRemainingSets
     */

    function bidAndWithdrawWithEther(
        address _rebalancingSetToken,
        uint256 _quantity,
        bool _allowPartialFill
    )
        external
        payable
        nonReentrant
    {
        // Get token addresses
        address[] memory combinedTokenArray = IRebalancingSetToken(_rebalancingSetToken).getCombinedTokenArray();

        // Wrap all ETH sent to the contract
        weth.deposit.value(msg.value)();

        // Get inflow and outflow arrays for the given bid quantity
        uint256[] memory inflowArray;
        uint256[] memory outflowArray;
        (
            inflowArray,
            outflowArray
        ) = IRebalancingSetToken(_rebalancingSetToken).getBidPrice(_quantity);

        // Ensure allowances and transfer non-weth tokens
        depositComponents(
            combinedTokenArray,
            inflowArray
        );

        // Bid in auction
        rebalanceAuctionModule.bidAndWithdraw(
            _rebalancingSetToken,
            _quantity,
            _allowPartialFill
        );

        // Withdraw returned tokens
        withdrawComponentsToSender(
            combinedTokenArray
        );

        // Unwrap wrapped Ether and transfer Eth to user
        uint256 wethBalance = ERC20Wrapper.balanceOf(address(weth), address(this));
        if (wethBalance > 0) {
            weth.withdraw(wethBalance);
            msg.sender.transfer(wethBalance);            
        }
    }

    /* ============ Private Functions ============ */

    /**
     * Before bidding, calculate the required amount of inflow tokens, wrap Ether, and deposit components
     * into this helper contract.
     *
     * @param  _combinedTokenArray            Array of token addresses
     * @param  _inflowArray                   Address of the rebalancing Set token
     */
    function depositComponents(
        address[] memory _combinedTokenArray,
        uint256[] memory _inflowArray
    )
        private
    {
        // Loop through the combined token addresses array and deposit inflow amounts
        for (uint256 i = 0; i < _combinedTokenArray.length; i++) {
            address currentComponent = _combinedTokenArray[i];
            uint256 currentComponentQuantity = _inflowArray[i];

            // Check component inflow is greater than 0
            if (currentComponentQuantity > 0) {
                // Ensure allowance for components to transferProxy
                ERC20Wrapper.ensureAllowance(
                    address(currentComponent),
                    address(this),
                    address(transferProxy),
                    currentComponentQuantity
                );

                // If not WETH transfer tokens from user to contract
                if (currentComponent != address(weth)) {
                    // Transfer tokens to contract
                    ERC20Wrapper.transferFrom(
                        address(currentComponent),
                        msg.sender,
                        address(this),
                        currentComponentQuantity
                    );
                }
            }
        }
    }

     /**
     * After bidding, loop through token address array, unwrap Ether, and withdraw
     * components to the sender
     *
     * @param  _combinedTokenArray           Array of token addresses
     */
    function withdrawComponentsToSender(
        address[] memory _combinedTokenArray
    )
        private
    {
        // Loop through the combined token addresses array and withdraw leftover amounts
        for (uint256 i = 0; i < _combinedTokenArray.length; i++) {
            address currentComponent = _combinedTokenArray[i];
            
            // Get balance of tokens in contract
            uint256 currentComponentBalance = ERC20Wrapper.balanceOf(
                currentComponent,
                address(this)
            );

            // Check component balance is greater than 0
            if (currentComponentBalance > 0 && currentComponent != address(weth)) {
                // Withdraw tokens from the contract and send to the user
                ERC20Wrapper.transfer(
                    address(currentComponent),
                    msg.sender,
                    currentComponentBalance
                );
            }
        }
    }
}