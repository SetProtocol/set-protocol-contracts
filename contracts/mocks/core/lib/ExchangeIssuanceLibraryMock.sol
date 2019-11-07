pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { ExchangeIssuanceLibrary } from "../../../core/modules/lib/ExchangeIssuanceLibrary.sol";


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

    function testValidateReceiveTokens(
        address[] memory _receiveTokens,
        uint256[] memory _receiveTokenAmounts
    )
        public
        view 
    {
        ExchangeIssuanceLibrary.validateReceiveTokens(
            _receiveTokens,
            _receiveTokenAmounts
        );
    }

    function testValidateSendTokenParams(
        address _core,
        uint8[] memory _sendTokenExchangeIds,
        address[] memory _sendTokens,
        uint256[] memory _sendTokenAmounts
    )
        public
        view 
    {
        ExchangeIssuanceLibrary.validateSendTokenParams(
            _core,
            _sendTokenExchangeIds,
            _sendTokens,
            _sendTokenAmounts
        );
    }
}
