pragma solidity 0.4.24;


/// @title Kyber Network interface
interface KyberNetworkProxyInterface {
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
