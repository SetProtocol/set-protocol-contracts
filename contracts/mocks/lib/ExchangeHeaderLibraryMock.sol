pragma solidity 0.4.25;
pragma experimental "ABIEncoderV2";

import { ExchangeHeaderLibrary } from "../../core/lib/ExchangeHeaderLibrary.sol";

contract ExchangeHeaderLibraryMock {
    function testParseExchangeHeader(
        bytes _orderData, 
        uint256 _offset
    )
        external
        pure
        returns(ExchangeHeaderLibrary.ExchangeHeader memory)
    {
        return ExchangeHeaderLibrary.parseExchangeHeader(
            _orderData,
            _offset
        );
    }
}
