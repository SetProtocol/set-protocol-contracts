pragma solidity 0.4.24;


/**
 * @title Set Factory Interface
 */
interface ISetFactory {
    function create(
        address[] _tokens,
        uint[] _units,
        uint _naturalUnit,
        string _name,
        string _symbol
    )
        public
        returns (address);
}
