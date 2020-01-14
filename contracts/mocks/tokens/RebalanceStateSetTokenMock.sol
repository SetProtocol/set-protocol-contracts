pragma solidity 0.5.7;


import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

// Mock Rebalancing Set in Rebalance State
contract RebalanceStateSetTokenMock is ERC20 {
    uint256 public decimals;
    string public name;
    string public symbol;
    address[] public combinedTokenArray;
    uint256[] public inflowArray;
    uint256[] public outflowArray;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _decimals,
        address[] memory _combinedTokenArray,
        uint256[] memory _inflowArray,
        uint256[] memory _outflowArray
    )
        public
    {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        combinedTokenArray = _combinedTokenArray;
        inflowArray = _inflowArray;
        outflowArray = _outflowArray;
    }
    function getCombinedTokenArray()
        external
        view
        returns (address[] memory)
    {
        return combinedTokenArray;
    }
    function getBidPrice(uint256 _quantity)
        external
        view
        returns (uint256[] memory, uint256[] memory)
    {
        return (inflowArray, outflowArray);
    }
}
