pragma solidity 0.5.4;
pragma experimental "ABIEncoderV2";

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { ExchangeIssuanceLibrary } from "../../../core/lib/ExchangeIssuanceLibrary.sol";


// Mock class of ExchangeIssuanceLibrary
contract ExchangeIssuanceLibraryMock {
    using SafeMath for uint256;

    function testValidateQuantity(
        address _set,
        uint256 _quantity
    )
        external
        view 
    {
        ExchangeIssuanceLibrary.validateQuantity(
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
        ExchangeIssuanceLibrary.validatePostExchangeReceiveTokenBalances(
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
        ExchangeIssuanceLibrary.validateSentTokenParams(
            _core,
            _sentTokenExchangeIds,
            _sentTokens,
            _sentTokenAmounts
        );
    }
}
