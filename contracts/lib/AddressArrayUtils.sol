pragma solidity 0.4.23;

/**
 * @title AddressArrayUtil
 */
library AddressArrayUtils {
  function removeByIndex(address[] storage a, uint256 index) internal returns (uint256) {
    a[index] = a[a.length - 1];
    a.length -= 1;
  }
}