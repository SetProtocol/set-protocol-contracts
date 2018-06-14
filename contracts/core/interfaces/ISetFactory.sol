pragma solidity 0.4.24;


/**
 * @title Set Factory Interface
 */
interface ISetFactory {
    function core() external returns (address);

    function create(
        address[] _components,
        uint[] _units,
        uint _naturalUnit,
        string _name,
        string _symbol
    )
        external
        returns (address);
}
