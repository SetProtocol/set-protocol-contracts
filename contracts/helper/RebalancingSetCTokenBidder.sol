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

    // Mapping of cToken address to underlying address
    mapping (address => address) public cTokenToUnderlying;

    string public dataDescription;

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
     * @param _cTokenArray              The address array of the target cToken
     * @param _underlyingArray          The address array of the target cToken's underlying
     * @param _dataDescription          Description of contract for Etherscan / other applications
     */
    constructor(
        IRebalanceAuctionModule _rebalanceAuctionModule,
        ITransferProxy _transferProxy,
        address[] memory _cTokenArray,
        address[] memory _underlyingArray,
        string memory _dataDescription
    )
        public
    {
        rebalanceAuctionModule = _rebalanceAuctionModule;

        transferProxy = _transferProxy;

        dataDescription = _dataDescription;

        for (uint256 i = 0; i < _cTokenArray.length; i++) {
            address cTokenAddress = _cTokenArray[i];
            address underlyingAddress = _underlyingArray[i];

            // Initialize mapping of cToken to underlying
            cTokenToUnderlying[cTokenAddress] = underlyingAddress;

            // Add approvals of the underlying token to the cToken contract
            ERC20Wrapper.approve(
                underlyingAddress,
                cTokenAddress,
                CommonMath.maxUInt256()
            );

            // Add approvals of the cToken to the transferProxy contract
            ERC20Wrapper.approve(
                cTokenAddress,
                address(_transferProxy),
                CommonMath.maxUInt256()
            );
        }
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

            if (cTokenToUnderlying[currentComponent] != address(0)) {
                combinedTokenArray[i] = cTokenToUnderlying[currentComponent];

                // Replace inflow and outflow with required amount of underlying. 
                // Calculated as cToken quantity * exchangeRate / 10 ** 18.
                uint256 exchangeRate = ICToken(currentComponent).exchangeRateStored();
                uint256 currentInflowQuantity = inflowArray[i];
                uint256 currentOutflowQuantity = outflowArray[i];

                inflowArray[i] = currentInflowQuantity.mul(exchangeRate).div(CommonMath.scaleFactor());
                outflowArray[i] = currentOutflowQuantity.mul(exchangeRate).div(CommonMath.scaleFactor());

                // Check for rounding error and add 1 if needed
                inflowArray[i] = inflowArray[i].mul(CommonMath.scaleFactor()).div(exchangeRate) >= currentInflowQuantity
                    ? inflowArray[i]
                    : inflowArray[i].add(1);

                outflowArray[i] = outflowArray[i].mul(CommonMath.scaleFactor()).div(exchangeRate) >= currentOutflowQuantity
                    ? outflowArray[i]
                    : outflowArray[i].add(1);
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

                // If cToken, calculate required underlying tokens, transfer to contract, 
                // ensure underlying allowance to cToken and then mint cTokens
                if (cTokenToUnderlying[currentComponent] != address(0)) {
                    address underlyingAddress = cTokenToUnderlying[currentComponent];

                    // Calculate required amount of underlying. Calculated as cToken quantity * exchangeRate / 10 ** 18.
                    uint256 exchangeRate = ICToken(currentComponent).exchangeRateCurrent();
                    uint256 underlyingAmount = 
                        currentComponentQuantity
                        .mul(exchangeRate)
                        .div(CommonMath.scaleFactor());

                    // Check for rounding error and add 1 if needed
                    underlyingAmount = 
                        underlyingAmount.mul(CommonMath.scaleFactor()).div(exchangeRate) >= currentComponentQuantity
                        ? underlyingAmount
                        : underlyingAmount.add(1);

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
                        address(currentComponent),
                        underlyingAmount
                    );

                    // Mint cToken using underlying
                    ICToken(currentComponent).mint(underlyingAmount);
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
                // Check if cToken
                if (cTokenToUnderlying[currentComponent] != address(0)) {
                    address underlyingAddress = cTokenToUnderlying[currentComponent];
                    // Redeem cToken into underlying
                    ICToken(currentComponent).redeem(currentComponentBalance);

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