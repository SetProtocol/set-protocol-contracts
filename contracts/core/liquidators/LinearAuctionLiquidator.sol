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

import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { ICore } from "../interfaces/ICore.sol";
import { ILiquidator } from "../interfaces/ILiquidator.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";


/**
 * @title LinearAuctionLiquidator
 * @author Set Protocol
 *
 * Contract that holds all the state and functionality required for setting up, returning prices, and tearing
 * down linear auction rebalances for RebalancingSetTokens.
 */
contract LinearAuctionLiquidator is 
    ILiquidator
{
    using SafeMath for uint256;

    /* ============ Structs ============ */
    struct AuctionDetails {
        uint256 startTime;
        uint256 timeToPivot;
        uint256 startPrice;
        uint256 pivotPrice;
        uint256 minimumBid;
        uint256 startingCurrentSets;
        uint256 remainingCurrentSets;
        uint256[] combinedCurrentSetUnits;
        uint256[] combinedNextSetUnits;
        address[] combinedTokenArray;
    }

    /* ============ State Variables ============ */
    ICore public coreInstance;
    string public name;

    uint256 public priceDivisor;
    uint256 public auctionTimeToPivot;
    uint256 public auctionSpeed;
    mapping(address => AuctionDetails) public auctionDetails;

    constructor(
        ICore _coreInstance,
        uint256 _priceDivisor,
        uint256 _auctionTimeToPivot,
        uint256 _auctionSpeed,
        string memory _name
    )
        public
    {
        coreInstance = _coreInstance;
        priceDivisor = _priceDivisor;
        auctionTimeToPivot = _auctionTimeToPivot;
        auctionSpeed = _auctionSpeed;
        name = _name;
    }

    function processProposal(
        address _currentSet,
        address _nextSet
    )
        external
    {
        // Check that calling address is a valid set
        require(
            coreInstance.validSets(msg.sender),
            "ProposeLibrary.validateProposal: Invalid or disabled proposed SetToken address"
        );
    }

    function placeBid(
        uint256 _quantity
    )
        external
        returns (address[] memory, uint256[] memory, uint256[] memory)
    {}

    function getBidPrice(
        uint256 _quantity
    )
        external
        returns (address[] memory, uint256[] memory, uint256[] memory)
    {}

    function startRebalance(
        address _currentSet,
        address _nextSet,
        uint256 _startingCurrentSet
    )
        external
    {}

    function settleRebalance()
        external
    {}

    function endFailedRebalance()
        external
    {}
}