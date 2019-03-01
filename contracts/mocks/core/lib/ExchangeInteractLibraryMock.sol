pragma solidity 0.5.4;
pragma experimental "ABIEncoderV2";

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { ExchangeInteractLibrary } from "../../../core/lib/ExchangeInteractLibrary.sol";


// Mock class of ExchangeValidationLIbrary
contract ExchangeInteractLibraryMock {
    using SafeMath for uint256;

    function testValidateQuantity(
        address _set,
        uint256 _quantity
    )
        external
        view 
    {
        ExchangeInteractLibrary.validateQuantity(
            _set,
            _quantity
        );
    }

    function testValidatePostExchangeReceiveTokenBalances(
        address _vault,
        address[] memory _receiveTokens,
        uint256[] memory _requiredBalances,
        address _userToCheck
    )
        public
        view
    {
        ExchangeInteractLibrary.validatePostExchangeReceiveTokenBalances(
            _vault,
            _receiveTokens,
            _requiredBalances,
            _userToCheck
        );
    }

    function testValidateSentTokenParams(
        address _core,
        uint8[] memory _sentTokenExchangeIds,
        address[] memory _sentTokens,
        uint256[] memory _sentTokenAmounts
    )
        public
        view 
    {
        ExchangeInteractLibrary.validateSentTokenParams(
            _core,
            _sentTokenExchangeIds,
            _sentTokens,
            _sentTokenAmounts
        );
    }
}
