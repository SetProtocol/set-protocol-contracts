pragma solidity 0.5.4;
pragma experimental "ABIEncoderV2";

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { SetTokenLibrary } from "../../../core/lib/SetTokenLibrary.sol";


// Mock class of SetTokenLibrary
contract SetTokenLibraryMock {
    using SafeMath for uint256;

    function testValidateTokensAreComponents(
        address _set,
        address[] memory _tokens
    )
        public
        view
    {
        SetTokenLibrary.validateTokensAreComponents(
            _set,
            _tokens
        );
    }
}
