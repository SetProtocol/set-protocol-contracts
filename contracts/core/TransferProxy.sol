pragma solidity 0.4.24;
pragma experimental ABIEncoderV2;


import "zeppelin-solidity/contracts/math/SafeMath.sol";
import { ERC20 } from "zeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import { Migratable } from "zos-lib/contracts/migrations/Migratable.sol";
import { Ownable } from "zeppelin-solidity/contracts/ownership/Ownable.sol";


/**
 * @title TransferProxy
 * @author Set Protocol
 *
 * The proxy contract is responsible for transferring funds from the user to the vault during Set issuance.
 * The contract is separated to allow for upgrades, particularly if new token standards emerge or upgrades are required.
 */
contract TransferProxy is
    Ownable,
    Migratable
{
    using SafeMath for uint256;

    /* ============ State Variables ============ */

    address vaultAddress;

    /* ============ Constructor ============ */

    constructor(address _vaultAddress) {
        vaultAddress = _vaultAddress;
    }

    /* ============ Public Functions ============ */

    /**
    * Transfers tokens from an address (that has set allowance on the proxy) to the vault.
    *
    * @param  _from           The address to transfer token from
    * @param  _tokenAddress   The address of the ERC20 token
    * @param  _quantity       The number of tokens to transfer
    */
    function transferToVault(
        address _from,
        address _tokenAddress,
        uint _quantity
    ) 
        external
    {
        ERC20(_tokenAddress).transferFrom(
            _from,
            vaultAddress,
            _quantity
        );
    }
}
