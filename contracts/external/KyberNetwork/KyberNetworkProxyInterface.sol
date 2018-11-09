pragma solidity 0.4.25;


/// @title Kyber Network interface
interface KyberNetworkProxyInterface {
    function getExpectedRate(
      address src,
      address dest,
      uint srcQty
    )
      public
      view
      returns (uint expectedRate, uint slippageRate);

    function trade(
      address src,
      uint srcAmount,
      address dest,
      address destAddress,
      uint maxDestAmount,
      uint minConversionRate,
      address walletId
    )
      public
      payable
      returns(uint);
}
