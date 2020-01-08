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

import { ReentrancyGuard } from "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { CommonMath } from "../lib/CommonMath.sol";
import { IRebalanceAuctionModule } from "../core/interfaces/IRebalanceAuctionModule.sol";
import { IRebalancingSetToken } from "../core/interfaces/IRebalancingSetToken.sol";
import { ITransferProxy } from "../core/interfaces/ITransferProxy.sol";
import { ICToken } from "./interfaces/ICToken.sol";

import { ERC20Wrapper } from "../lib/ERC20Wrapper.sol";


/**
 * @title RebalancingSetCTokenBidder
 * @author Set Protocol
 *
 * A helper contract that mints a cToken from its underlying or redeems a cToken into 
 * its underlying used for bidding in the RebalanceAuctionModule.
 */
contract RebalancingSetCTokenBidder is
    ReentrancyGuard
{
    using SafeMath for uint256;
    
    // Address and instance of RebalanceAuctionModule contract
    IRebalanceAuctionModule public rebalanceAuctionModule;

    // Address and instance of TransferProxy contract
    ITransferProxy public transferProxy;

    // Address and instance of CToken contract
    ICToken public targetCToken;

    // Address of underlying of the target CToken contract
    address public underlyingAddress;

    string public dataDescription;

    // Exchange Rate values are scaled by 1e18
    uint256 internal constant scalingFactor = 10 ** 18;

    /* ============ Events ============ */

    event BidPlacedCToken(
        address indexed rebalancingSetToken,
        address indexed bidder
    );

    /* ============ Constructor ============ */

    /**
     * Constructor function for RebalancingSetCTokenBidder
     *
     * @param _rebalanceAuctionModule   The address of RebalanceAuctionModule
     * @param _transferProxy            The address of TransferProxy
     * @param _targetCToken                   The address of the target cToken
     * @param _underlyingAddress        The address of the target cToken's underlying
     * @param _dataDescription          Description of contract for Etherscan / other applications
     */
    constructor(
        IRebalanceAuctionModule _rebalanceAuctionModule,
        ITransferProxy _transferProxy,
        ICToken _targetCToken,
        address _underlyingAddress,
        string memory _dataDescription
    )
        public
    {
        // Commit the RebalanceAuctionModule instance
        rebalanceAuctionModule = _rebalanceAuctionModule;

        // Commit the TransferProxy instance
        transferProxy = _transferProxy;

        // Commit the target cToken instance
        targetCToken = _targetCToken;

        // Commit the underlying address of the cToken
        underlyingAddress = _underlyingAddress;

        // Commit the contract description
        dataDescription = _dataDescription;

        // Add approvals of the underlying token to the cToken contract
        ERC20Wrapper.approve(
            _underlyingAddress,
            address(_targetCToken),
            CommonMath.maxUInt256()
        );

        // Add approvals of the cToken to the transferProxy contract
        ERC20Wrapper.approve(
            address(_targetCToken),
            address(_transferProxy),
            CommonMath.maxUInt256()
        );
    }

    /* ============ External Functions ============ */

    /**
     * Bid on rebalancing a given quantity of sets held by a rebalancing token wrapping or unwrapping
     * a target cToken involved. The tokens are returned to the user.
     *
     * @param  _rebalancingSetToken    Instance of the rebalancing token being bid on
     * @param  _quantity               Number of currentSets to rebalance
     * @param  _allowPartialFill       Set to true if want to partially fill bid when quantity
                                       is greater than currentRemainingSets
     */

    function bidAndWithdraw(
        IRebalancingSetToken _rebalancingSetToken,
        uint256 _quantity,
        bool _allowPartialFill
    )
        external
        nonReentrant
    {
        // Get token addresses
        address[] memory combinedTokenArray = _rebalancingSetToken.getCombinedTokenArray();

        // Get inflow and outflow arrays for the given bid quantity
        uint256[] memory inflowArray;
        uint256[] memory outflowArray;
        (
            inflowArray,
            outflowArray
        ) = _rebalancingSetToken.getBidPrice(_quantity);

        // Ensure allowances and transfer auction tokens or underlying from user
        depositComponents(
            combinedTokenArray,
            inflowArray
        );

        // Bid in auction
        rebalanceAuctionModule.bidAndWithdraw(
            address(_rebalancingSetToken),
            _quantity,
            _allowPartialFill
        );

        // Withdraw auction tokens or underlying to user
        withdrawComponentsToSender(
            combinedTokenArray
        );

        // Log bid placed with Eth event
        emit BidPlacedCToken(
            address(_rebalancingSetToken),
            msg.sender
        );
    }

    /*
     * Get token inflows and outflows and combined token array denominated in underlying required
     * for bid for a given rebalancing Set token.
     *
     * @param _quantity               The amount of currentSet to be rebalanced
     * @param _rebalancingSetToken    The rebalancing Set Token instance
     * @return inflowArray            Array of amount of tokens inserted into system in bid
     * @return outflowArray           Array of amount of tokens returned from system in bid
     * @return combinedTokenArray     Array of token addresses
     */
    function getBidPriceAndAddressArray(
        uint256 _quantity,
        IRebalancingSetToken _rebalancingSetToken
    )
        public
        view
        returns (uint256[] memory, uint256[] memory, address[] memory)
    {
        // Get token addresses
        address[] memory combinedTokenArray = _rebalancingSetToken.getCombinedTokenArray();

        // Get inflow and outflow arrays for the given bid quantity
        uint256[] memory inflowArray;
        uint256[] memory outflowArray;
        (
            inflowArray,
            outflowArray
        ) = _rebalancingSetToken.getBidPrice(_quantity);

        // Loop through the combined token addresses array and replace with underlying address
        for (uint256 i = 0; i < combinedTokenArray.length; i++) {
            address currentComponent = combinedTokenArray[i];

            if (currentComponent == address(targetCToken)) {
                combinedTokenArray[i] = underlyingAddress;

                // Replace flows with required amount of inflow. Calculated as cToken quantity * exchangeRate / scalingFactor.
                // Add 1 at the end to account for rounding error
                uint256 exchangeRate = targetCToken.exchangeRateStored();
                inflowArray[i] = inflowArray[i] > 0 
                    ? inflowArray[i].mul(exchangeRate).div(scalingFactor).add(1)
                    : inflowArray[i];
                outflowArray[i] = outflowArray[i] > 0
                    ? outflowArray[i].mul(exchangeRate).div(scalingFactor).add(1)
                    : outflowArray[i];
            }
        }

        return (inflowArray, outflowArray, combinedTokenArray);
    }

    /* ============ Private Functions ============ */

    /**
     * Before bidding, calculate the required amount of inflow tokens and deposit token components
     * into this helper contract.
     *
     * @param  _combinedTokenArray            Array of token addresses
     * @param  _inflowArray                   Array of inflow token units
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

                // If the target cToken, calculate required underlying tokens, transfer to contract, 
                // ensure underlying allowance to cToken and then mint cTokens
                if (currentComponent == address(targetCToken)) {
                    // Calculate required amount of underlying. Calculated as cToken quantity * exchangeRate / scalingFactor.
                    // Add 1 at the end to account for rounding error
                    uint256 exchangeRate = targetCToken.exchangeRateCurrent();
                    uint256 underlyingAmount = 
                        currentComponentQuantity
                        .mul(exchangeRate)
                        .div(scalingFactor)
                        .add(1);

                    // Transfer underlying tokens to contract
                    ERC20Wrapper.transferFrom(
                        underlyingAddress,
                        msg.sender,
                        address(this),
                        underlyingAmount
                    );

                    // Ensure allowance for underlying token to cToken contract
                    ERC20Wrapper.ensureAllowance(
                        underlyingAddress,
                        address(this),
                        address(targetCToken),
                        underlyingAmount
                    );

                    // Mint cToken using underlying
                    targetCToken.mint(underlyingAmount);
                } else {
                    // Transfer non-cTokens to contract
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
     * After bidding, loop through token address array and redeem any cTokens 
     * and transfer token components to user
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
            if (currentComponentBalance > 0) {
                if (currentComponent == address(targetCToken)) {
                    // Redeem cToken into underlying
                    targetCToken.redeem(currentComponentBalance);

                    // Get balance of underlying in contract
                    uint256 underlyingComponentBalance = ERC20Wrapper.balanceOf(
                        underlyingAddress,
                        address(this)
                    );

                    // Withdraw underlying from the contract and send to the user
                    ERC20Wrapper.transfer(
                        underlyingAddress,
                        msg.sender,
                        underlyingComponentBalance
                    );
                } else {
                    // Withdraw non cTokens from the contract and send to the user
                    ERC20Wrapper.transfer(
                        address(currentComponent),
                        msg.sender,
                        currentComponentBalance
                    );
                }
            }
        }
    }
}