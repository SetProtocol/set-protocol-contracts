pragma solidity 0.4.25;


contract Migrations {
  address public owner;
  uint256 public lastCompletedMigration;

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  constructor() public {
    owner = msg.sender;
  }

  function setCompleted(uint256 completed) external restricted {
    lastCompletedMigration = completed;
  }

  function upgrade(address newAddress) external restricted {
    Migrations upgraded = Migrations(newAddress);
    upgraded.setCompleted(lastCompletedMigration);
  }
}
