pragma solidity 0.4.24;
pragma experimental "ABIEncoderV2";

import { ExchangeOrderHandler } from "../../core/lib/ExchangeOrderHandler.sol";


// Mock class implementing internal OrderHandler methods
contract MockExchangeOrderHandlerLibrary {
    function testExchangeOrdersHeader(
        bytes _data
    )
        public
        pure
        returns (uint8)
    {
        ExchangeOrderHandler.ExchangeOrdersHeader memory order;
        order = ExchangeOrderHandler.parseExchangeOrdersHeader(_data);
        return order.orderCount;
    }

    function testExchangeOrdersBodyExchange(
        bytes _body
    )
        public
        pure
        returns (uint8)
    {
        ExchangeOrderHandler.ExchangeOrderBody memory order;
        order = ExchangeOrderHandler.parseExchangeOrderBody(_body);
        return order.exchange;
    }

    function testExchangeOrdersBodyOrderLength(
        bytes _body
    )
        public
        pure
        returns (uint8)
    {
        ExchangeOrderHandler.ExchangeOrderBody memory order;
        order = ExchangeOrderHandler.parseExchangeOrderBody(_body);
        return order.orderLength;
    }
}
