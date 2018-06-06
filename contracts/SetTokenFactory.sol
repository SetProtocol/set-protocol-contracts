pragma solidity 0.4.23;

import "./SetToken.sol";


contract SetTokenFactory {
    function createSet(
        address[] _tokens,
        uint[] _units,
        uint _naturalUnit
    ) 
        public
        returns
        (address) 
    {
        return new SetToken(_tokens, _units, _naturalUnit);
    }
}
