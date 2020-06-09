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
import { CommonMath } from "set-protocol-contract-utils/contracts/lib/CommonMath.sol";
import { CompoundUtils } from "set-protocol-contract-utils/contracts/lib/CompoundUtils.sol";

import { ERC20Wrapper } from "../lib/ERC20Wrapper.sol";
import { ICToken } from "../core/interfaces/ICToken.sol";
import { IRebalanceAuctionModule } from "../core/interfaces/IRebalanceAuctionModule.sol";
import { IRebalancingSetToken } from "../core/interfaces/IRebalancingSetToken.sol";
import { IRebalancingSetTokenV3 } from "../core/interfaces/IRebalancingSetTokenV3.sol";
import { ITransferProxy } from "../core/interfaces/ITransferProxy.sol";
import { ITWAPAuctionGetters } from "../core/interfaces/ITWAPAuctionGetters.sol";
import { Rebalance } from "../core/lib/Rebalance.sol";


/**
 * @title RebalancingSetCTokenBidder
 * @author Set Protocol
 *
 * A helper contract that mints a cToken from its underlying or redeems a cToken into 
 * its underlying used for bidding in the RebalanceAuctionModule.
 * 
 * CHANGELOG 6/8/2020:
 * - Remove reentrant modifier on bidAndWithdraw. This modifier is already used in RebalanceAuctionModule
 * - Add bidAndWithdrawTWAP function to check that bids can only succeed for the current auction chunk
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
        address indexed bidder,
        uint256 quantity
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

        require(
            _cTokenArray.length == _underlyingArray.length,
            "RebalancingSetCTokenBidder.constructor: cToken array and underlying array must be same length"
        );

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
        public
    {
        // Get token flow arrays for the given bid quantity
        (
            address[] memory combinedTokenArray,
            uint256[] memory inflowUnitsArray,
            uint256[] memory outflowUnitsArray
        ) = Rebalance.getTokenFlows(_rebalancingSetToken, _quantity);

        // Ensure allowances and transfer auction tokens or underlying from user
        depositComponents(
            combinedTokenArray,
            inflowUnitsArray
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
            msg.sender,
            _quantity
        );
    }

    /**
     * Bid on rebalancing a given quantity of sets held by a rebalancing token wrapping or unwrapping
     * a target cToken involved. The tokens are returned to the user. This function is only compatible with
     * Rebalancing Set Tokens that use TWAP liquidators
     *
     * During a TWAP chunk auction, there is an adverse scenario where a bidder submits a chunk auction bid
     * with a low gas price and iterateChunkAuction is called before that transaction is mined. When the bidder’s
     * transaction gets mined, it may execute at an unintended price. To combat this, he BidAndWithdrawTWAP
     * function checks that a new chunk auction has not been initiated from the point of bidding. 
     * The intended use case is that the bidder would retrieve the Rebalancing SetToken’s lastChunkAuctionEnd
     * variable off-chain and submit it as part of the bid.
     *
     * @param  _rebalancingSetToken    Instance of the rebalancing token being bid on
     * @param  _quantity               Number of currentSets to rebalance
     * @param  _lastChunkTimestamp     Timestamp of end of previous chunk auction used to identify which
                                       chunk the bidder wants to bid on
     * @param  _allowPartialFill       Set to true if want to partially fill bid when quantity
                                       is greater than currentRemainingSets
     */

    function bidAndWithdrawTWAP(
        IRebalancingSetTokenV3 _rebalancingSetToken,
        uint256 _quantity,
        uint256 _lastChunkTimestamp,
        bool _allowPartialFill
    )
        external
    {
        address liquidatorAddress = address(_rebalancingSetToken.liquidator());
        address rebalancingSetTokenAddress = address(_rebalancingSetToken);

        uint256 lastChunkAuctionEnd = ITWAPAuctionGetters(liquidatorAddress).getLastChunkAuctionEnd(rebalancingSetTokenAddress);

        require(
            lastChunkAuctionEnd == _lastChunkTimestamp,
            "RebalancingSetCTokenBidder.bidAndWithdrawTWAP: Bid must be for intended chunk"
        );

        bidAndWithdraw(
            IRebalancingSetToken(rebalancingSetTokenAddress),
            _quantity,
            _allowPartialFill
        );
    }

    /*
     * Get token inflows and outflows and combined token array denominated in underlying required
     * for bid for a given rebalancing Set token.
     *
     * @param _rebalancingSetToken    The rebalancing Set Token instance
     * @param _quantity               The amount of currentSet to be rebalanced
     * @return combinedTokenArray     Array of token addresses
     * @return inflowUnitsArray       Array of amount of tokens inserted into system in bid
     * @return outflowUnitsArray      Array of amount of tokens returned from system in bid
     */
    function getAddressAndBidPriceArray(
        IRebalancingSetToken _rebalancingSetToken,
        uint256 _quantity
    )
        external
        view
        returns (address[] memory, uint256[] memory, uint256[] memory)
    {
        // Get token flow arrays for the given bid quantity
        (
            address[] memory combinedTokenArray,
            uint256[] memory inflowUnitsArray,
            uint256[] memory outflowUnitsArray
        ) = Rebalance.getTokenFlows(_rebalancingSetToken, _quantity);

        // Loop through the combined token addresses array and replace with underlying address
        for (uint256 i = 0; i < combinedTokenArray.length; i++) {
            address currentComponentAddress = combinedTokenArray[i];

            // Check if current component address is a cToken
            address underlyingAddress = cTokenToUnderlying[currentComponentAddress];
            if (underlyingAddress != address(0)) {
                combinedTokenArray[i] = underlyingAddress;

                // Replace inflow and outflow with required amount of underlying. 
                // Calculated as cToken quantity * exchangeRate / 10 ** 18.
                uint256 exchangeRate = ICToken(currentComponentAddress).exchangeRateStored();
                uint256 currentInflowQuantity = inflowUnitsArray[i];
                uint256 currentOutflowQuantity = outflowUnitsArray[i];

                inflowUnitsArray[i] = CompoundUtils.convertCTokenToUnderlying(currentInflowQuantity, exchangeRate);
                outflowUnitsArray[i] = CompoundUtils.convertCTokenToUnderlying(currentOutflowQuantity, exchangeRate);
            }
        }

        return (combinedTokenArray, inflowUnitsArray, outflowUnitsArray);
    }

    /* ============ Private Functions ============ */

    /**
     * Before bidding, calculate the required amount of inflow tokens and deposit token components
     * into this helper contract.
     *
     * @param  _combinedTokenArray            Array of token addresses
     * @param  _inflowUnitsArray              Array of inflow token units
     */
    function depositComponents(
        address[] memory _combinedTokenArray,
        uint256[] memory _inflowUnitsArray
    )
        private
    {
        // Loop through the combined token addresses array and deposit inflow amounts
        for (uint256 i = 0; i < _combinedTokenArray.length; i++) {
            address currentComponentAddress = _combinedTokenArray[i];
            uint256 currentComponentQuantity = _inflowUnitsArray[i];

            // Check component inflow is greater than 0
            if (currentComponentQuantity > 0) {
                // Ensure allowance for components to transferProxy
                ERC20Wrapper.ensureAllowance(
                    currentComponentAddress,
                    address(this),
                    address(transferProxy),
                    currentComponentQuantity
                );

                // If cToken, calculate required underlying tokens, transfer to contract, 
                // ensure underlying allowance to cToken and then mint cTokens
                address underlyingAddress = cTokenToUnderlying[currentComponentAddress];
                if (underlyingAddress != address(0)) {
                    ICToken cTokenInstance = ICToken(currentComponentAddress);

                    // Calculate required amount of underlying. Calculated as cToken quantity * exchangeRate / 10 ** 18.
                    uint256 exchangeRate = cTokenInstance.exchangeRateCurrent();
                    uint256 underlyingQuantity = CompoundUtils.convertCTokenToUnderlying(currentComponentQuantity, exchangeRate);

                    // Transfer underlying tokens to contract
                    ERC20Wrapper.transferFrom(
                        underlyingAddress,
                        msg.sender,
                        address(this),
                        underlyingQuantity
                    );

                    // Ensure allowance for underlying token to cToken contract
                    ERC20Wrapper.ensureAllowance(
                        underlyingAddress,
                        address(this),
                        address(cTokenInstance),
                        underlyingQuantity
                    );

                    // Mint cToken using underlying
                    uint256 mintResponse = cTokenInstance.mint(underlyingQuantity);
                    require(
                        mintResponse == 0,
                        "RebalancingSetCTokenBidder.bidAndWithdraw: Error minting cToken"
                    );
                } else {
                    // Transfer non-cTokens to contract
                    ERC20Wrapper.transferFrom(
                        currentComponentAddress,
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
            address currentComponentAddress = _combinedTokenArray[i];
            
            // Get balance of tokens in contract
            uint256 currentComponentBalance = ERC20Wrapper.balanceOf(
                currentComponentAddress,
                address(this)
            );

            // Check component balance is greater than 0
            if (currentComponentBalance > 0) {
                // Check if cToken
                address underlyingAddress = cTokenToUnderlying[currentComponentAddress];
                if (underlyingAddress != address(0)) {
                    // Redeem cToken into underlying
                    uint256 mintResponse = ICToken(currentComponentAddress).redeem(currentComponentBalance);
                    require(
                        mintResponse == 0,
                        "RebalancingSetCTokenBidder.bidAndWithdraw: Erroring redeeming cToken"
                    );

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
                        currentComponentAddress,
                        msg.sender,
                        currentComponentBalance
                    );
                }
            }
        }
    }
}