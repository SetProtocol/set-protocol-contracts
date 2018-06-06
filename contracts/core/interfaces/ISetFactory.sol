pragma solidity 0.4.23;


/**
 * @title Set Factory Interface
 */
contract ISetFactory {
    function createSet(
        address[] _tokens,
        uint[] _units,
        uint _naturalUnit
    )
        public
        returns (address);
}
