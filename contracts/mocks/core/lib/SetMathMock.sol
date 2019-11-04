pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { SetMath } from "../../../core/lib/SetMath.sol";

contract SetMathMock {

    function setToComponent(
        uint256 _setQuantity,
        uint256 _unit,
        uint256 _naturalUnit
    )
        public
        view
        returns(uint256)
    {
        return SetMath.setToComponent(
            _setQuantity,
            _unit,
            _naturalUnit
        );
    }

    function componentToSet(
        uint256 _componentQuantity,
        uint256 _unit,
        uint256 _naturalUnit
    )
        public
        view
        returns(uint256)
    {
        return SetMath.componentToSet(
            _componentQuantity,
            _unit,
            _naturalUnit
        );
    }
}
