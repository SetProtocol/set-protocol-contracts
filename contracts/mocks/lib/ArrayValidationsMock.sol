pragma solidity 0.5.4;

import { ArrayValidations } from "../../lib/ArrayValidations.sol";

contract ArrayValidationsMock {
    function testValidateNonEmpty(
        address[] calldata _arr1
    )
        external
        pure
    {
        ArrayValidations.validateNonEmpty(_arr1);
    }

    function testValidateEqualLength(
        address[] calldata _addressArray,
        uint256[] calldata _uint256Array
    )
        external
        pure
    {
        ArrayValidations.validateEqualLength(_addressArray, _uint256Array);
    }
}
