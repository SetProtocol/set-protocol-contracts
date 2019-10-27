pragma solidity 0.5.7;

import { Core } from "../../core/Core.sol";
import { ISetToken } from "../../core/interfaces/ISetToken.sol";

// Mock contract implementation of Core with extra functions for testing
contract CoreMock is Core {
    constructor(
        address _transferProxy,
        address _vault
    )
        public
        Core(_transferProxy, _vault)
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
        ISetToken(_set).mint(
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
        ISetToken(_set).burn(
            _from,
            _quantity
        );
    }

    function addSet(
        address _set
    )
        external
    {
        state.setTokens = state.setTokens.append(_set);

        state.validSets[_set] = true;
    }
}

