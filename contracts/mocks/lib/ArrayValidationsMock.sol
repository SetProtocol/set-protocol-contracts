pragma solidity 0.5.4;

import { ArrayValidations } from "../../lib/ArrayValidations.sol";

contract ArrayValidationsMock {
    function testValidateNonEmpty(
        address[] memory _arr1
    )
        public
        pure
    {
        ArrayValidations.validateNonEmpty(_arr1);
    }

    function testValidateEqualLength(
        address[] memory _addressArray,
        uint256[] memory _uint256Array
    )
        public
        pure
    {
        ArrayValidations.validateEqualLength(_addressArray, _uint256Array);
    }
}
