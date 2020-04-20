pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { CommonMath } from "set-protocol-contract-utils/contracts/lib/CommonMath.sol";

import { Auction } from "../../../../core/liquidators/impl/Auction.sol";
import { LinearAuction } from "../../../../core/liquidators/impl/LinearAuction.sol";
import { IOracleWhiteList } from "../../../../core/interfaces/IOracleWhiteList.sol";
import { ISetToken } from "../../../../core/interfaces/ISetToken.sol";
import { Rebalance } from "../../../../core/lib/Rebalance.sol";
import { SetUSDValuation } from "../../../../core/liquidators/impl/SetUSDValuation.sol";

contract LinearAuctionMock is LinearAuction {
    using CommonMath for uint256;

    LinearAuction.State public auction;
    IOracleWhiteList public oracleWhiteList;

    uint256 public rangeStart; // Percentage below FairValue to begin auction at
    uint256 public rangeEnd;  // Percentage above FairValue to end auction at

    constructor(
        IOracleWhiteList _oracleWhiteList,
        uint256 _auctionPeriod,
        uint256 _rangeStart,
        uint256 _rangeEnd
    )
        public
        LinearAuction(
            _auctionPeriod
        )
    {
        oracleWhiteList = _oracleWhiteList;
        rangeStart = _rangeStart;
        rangeEnd = _rangeEnd;
    }

    function calculateStartPrice(
        Auction.Setup storage _auction,
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        internal
        view
        returns(uint256)
    {
        uint256 fairValue = calculateFairValue(_currentSet, _nextSet);
        uint256 startRange = fairValue.mul(rangeStart).div(100);
        return fairValue.sub(startRange);
    }

    function calculateEndPrice(
        Auction.Setup storage _auction,
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        internal
        view
        returns(uint256)
    {
        uint256 fairValue = calculateFairValue(_currentSet, _nextSet);
        uint256 endRange = fairValue.mul(rangeEnd).div(100);
        return fairValue.add(endRange);
    }

    /**
     * Calculates the fair value based on the USD values of the next and current Sets.
     * Returns a scaled value
     */
    function calculateFairValue(
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        internal
        view
        returns (uint256)
    {
        uint256 currentSetUSDValue = calculateUSDValueOfSet(_currentSet);
        uint256 nextSetUSDValue = calculateUSDValueOfSet(_nextSet);

        return nextSetUSDValue.scale().div(currentSetUSDValue);
    }

    function initializeLinearAuction(
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity
    )
        external
    {
        super.initializeLinearAuction(auction, _currentSet, _nextSet, _startingCurrentSetQuantity);
    }

    function reduceRemainingCurrentSets(
        uint256 _quantity
    )
        external
    {
        super.reduceRemainingCurrentSets(auction.auction, _quantity);
    }

    function hasAuctionFailed() external view returns(bool) {
        return super.hasAuctionFailed(auction);
    }

    function getPrice() external view returns(uint256) {
        return super.getPrice(auction);
    }

    function getTokenFlow(
        uint256 _quantity
    ) external view returns (Rebalance.TokenFlow memory) {
        return super.getTokenFlow(auction, _quantity);
    }

    /**
     * Calculate USD value of passed Set
     *
     * @param _set              Instance of SetToken
     * @return USDValue         USD Value of the Set Token
     */
    function calculateUSDValueOfSet(ISetToken _set) internal view returns(uint256) {
        return SetUSDValuation.calculateSetTokenDollarValue(_set, oracleWhiteList);
    }

    function calculateMinimumBid(
        Setup storage _auction,
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        internal
        view
        returns (uint256)
    {
        return Math.max(
            _currentSet.naturalUnit(),
            _nextSet.naturalUnit()
        );
    }
}

