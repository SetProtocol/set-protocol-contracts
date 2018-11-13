pragma solidity 0.4.25;

import { Core } from "../../core/Core.sol";
import { IRebalancingSetToken } from "../../core/interfaces/IRebalancingSetToken.sol";
import { ISetToken } from "../../core/interfaces/ISetToken.sol";

// Mock contract implementation of Core with extra functions for testing
contract CoreMock is Core {
    constructor(
        address _transferProxy,
        address _vault,
        address _signatureValidator
    )
        public
        Core(_transferProxy, _vault, _signatureValidator)
    {}

    /*
     * Mint set token for given address.
     * Can only be called by authorized contracts.
     *
     * @param  _set         The address of the Set to mint
     * @param  _issuer      The address of the issuing account
     * @param  _quantity    The number of sets to attribute to issuer
     */
    function mint(
        address _set,
        address _issuer,
        uint256 _quantity
    )
        external
    {
        ISetToken setToken = ISetToken(_set);

        // Issue set token
        setToken.mint(
            _issuer,
            _quantity
        );
    }

    /*
     * Burn set token for given address.
     * Can only be called by authorized contracts.
     *
     * @param  _set         The address of the Set to burn
     * @param  _from        The address of the redeeming account
     * @param  _quantity    The number of sets to burn from redeemer
     */
    function burn(
        address _set,
        address _from,
        uint256 _quantity
    )
        external
    {
        ISetToken setToken = ISetToken(_set);

        // Issue set token
        setToken.burn(
            _from,
            _quantity
        );
    }

    function placeBid(
        address _set,
        uint256 _quantity
    )
        external
    {
        IRebalancingSetToken rebalancingSetToken = IRebalancingSetToken(_set);

        // Issue set token
        rebalancingSetToken.placeBid(
            _quantity
        );
    }
}

