pragma solidity 0.5.7;


/// @title Kyber Network interface
interface KyberNetworkProxyInterface {
    function getExpectedRate(
      address src,
      address dest,
      uint256 srcQty
    )
      external
      view
      returns (uint256 expectedRate, uint256 slippageRate);

    function trade(
      address src,
      uint srcAmount,
      address dest,
      address destAddress,
      uint maxDestAmount,
      uint minConversionRate,
      address walletId
    )
      external
      payable
      returns (uint);
}
