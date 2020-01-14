pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { IRebalancingSetToken } from "../../../core/interfaces/IRebalancingSetToken.sol";
import { Rebalance } from "../../../core/lib/Rebalance.sol";

contract RebalanceMock {
    function getTokenFlows(
        IRebalancingSetToken _rebalancingSetToken,
        uint256 _quantity
    )
        external
        view
        returns(address[] memory, uint256[] memory, uint256[] memory)
    {
        return Rebalance.getTokenFlows(
            _rebalancingSetToken,
            _quantity
        );
    }
}
