pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { ICore } from "../../../core/interfaces/ICore.sol";
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

    function testIsMultipleOfSetNaturalUnit(
        address _set,
        uint256 _quantity
    )
        external
        view
    {
        SetTokenLibrary.isMultipleOfSetNaturalUnit(
            _set,
            _quantity
        );
    }

    function testRequireValidSet(
        ICore _core,
        address _set
    )
        external
        view
    {
        SetTokenLibrary.requireValidSet(
            _core,
            _set
        );
    }

    function testGetSetDetails(
        address _set
    )
        public
        view
        returns (
            uint256, /* naturalUnit */
            address[] memory, /* components */
            uint256[] memory /* units */
        )
    {
        SetTokenLibrary.SetDetails memory setToken = SetTokenLibrary.getSetDetails(_set);

        return (
            setToken.naturalUnit,
            setToken.components,
            setToken.units
        );
    }
}
