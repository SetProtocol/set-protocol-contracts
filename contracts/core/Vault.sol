pragma solidity 0.4.24;
pragma experimental ABIEncoderV2;


import { Authorizable } from "../lib/Authorizable.sol";
import { ERC20 } from "zeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import { SafeMath } from "zeppelin-solidity/contracts/math/SafeMath.sol";


/**
 * @title Vault
 * @author Set Protocol
 *
 * The vault contract is responsible for holding all funds and keeping track of the
 * fund state and which Sets own which funds. It can only be called by the Core Contract
 * 
 */
contract Vault is
    Authorizable
{
    using SafeMath for uint256;

    /*
     * State Variables
     */


    // Mapping of token address to map of owner address to balance.
    mapping (address => mapping (address => uint256)) public balances;

    /*
     * No Constructor
     */

    /*
     * Public Functions
     */

    /*
     * Withdraws a contract to an address.
     *
     * @param  _tokenAddress   The address of the ERC20 token
     * @param  _to             The address to transfer token to
     * @param  _quantity       The number of tokens to transfer
     */
    function withdrawTo(
        address _tokenAddress,
        address _to,
        uint _quantity
    ) 
        external
        onlyAuthorized
    {
        ERC20(_tokenAddress).transfer(
            _to,
            _quantity
        );
    }

    /*
     * Increment quantity owned of a token for a given address.
     *
     * @param  _owner           The address of the ERC20 token
     * @param  _tokenAddress    The address to transfer token to
     * @param  _quantity        The number of tokens to transfer
     */
    function incrementTokenOwner(
        address _owner,
        address _tokenAddress,
        uint _quantity
    ) 
        external
        onlyAuthorized
    {
        balances[_tokenAddress][_owner] = balances[_tokenAddress][_owner].add(_quantity);
    }

    /*
     * Decrement quantity owned of a token for a given address.
     *
     * @param  _owner           The address of the ERC20 token
     * @param  _tokenAddress    The address to transfer token to
     * @param  _quantity        The number of tokens to transfer
     */
    function decrementTokenOwner(
        address _owner,
        address _tokenAddress,
        uint _quantity
    ) 
        external
        onlyAuthorized
    {
        balances[_tokenAddress][_owner] = balances[_tokenAddress][_owner].sub(_quantity);
    }

    /*
     * Get balance of particular contract for owner.
     *
     * @param  _owner           The address of the ERC20 token
     * @param  _tokenAddress    The address to transfer token to
     */
    function getOwnerBalance(
        address _owner,
        address _tokenAddress
    ) 
        external
        view
        returns (uint256)
    {
        return balances[_tokenAddress][_owner];
    }
}
