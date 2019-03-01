pragma solidity 0.5.4;
pragma experimental "ABIEncoderV2";

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { ExchangeValidationLibrary } from "../../../core/lib/ExchangeValidationLibrary.sol";


// Mock class of ExchangeValidationLIbrary
contract ExchangeValidationLibraryMock {
    using SafeMath for uint256;

    function testValidateIssueQuantity(
        address _set,
        uint256 _quantity
    )
        external
        view 
    {
        ExchangeValidationLibrary.validateIssueQuantity(
            _set,
            _quantity
        );
    }

    function testValidateReceiveTokenBalances(
        address _vault,
        address[] memory _receiveTokens,
        uint256[] memory _requiredBalances,
        address _userToCheck
    )
        public
        view
    {
        ExchangeValidationLibrary.validateReceiveTokenBalances(
            _vault,
            _receiveTokens,
            _requiredBalances,
            _userToCheck
        );
    }

    function testValidateSentTokenParams(
        address _core,
        uint8[] memory _sentTokenExchanges,
        address[] memory _sentTokens,
        uint256[] memory _sentTokenAmounts
    )
        public
        view 
    {
        ExchangeValidationLibrary.validateSentTokenParams(
            _core,
            _sentTokenExchanges,
            _sentTokens,
            _sentTokenAmounts
        );
    }
}
