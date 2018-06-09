pragma solidity 0.4.24;
pragma experimental ABIEncoderV2;


import { Ownable } from "zeppelin-solidity/contracts/ownership/Ownable.sol";
import { TransferProxy } from "./TransferProxy.sol";
import { Vault } from "./Vault.sol";


/**
 * @title TransferProxy
 * @author Set Protocol
 *
 * The proxy contract is responsible for transferring funds from the user to the vault during Set issuance.
 * The contract is separated to allow for upgrades, particularly if new token standards emerge or upgrades are required.
 */
contract Core is
    Ownable
{
    /* ============ State Variables ============ */

    address transferProxyAddress;
    address vaultAddress;

    /* ============ No Constructor ============ */

    /* ============ Public Functions ============ */

    /**
     * Deposit any quantity of multiple tokens to the vault.
     *
     * @param  _tokenAddresses   Array of the addresses of the ERC20 tokens
     * @param  _quantities       Array of the number of tokens to transfer
     */
    function batchDeposit(
        address[] _tokenAddresses,
        uint[] _quantities
    )
        external
    {
        for (uint i=0; i<_tokenAddresses.length; i++) {
            deposit(
                _tokenAddresses[i],
                _quantities[i]
            );
        }
    }

    /**
     * Withdraw quantities of multiple tokens from the vault.
     * Tokens must be Unassociated with a Set Token.
     *
     * @param  _tokenAddresses   Array of the addresses of the ERC20 tokens
     * @param  _quantities       Array of the number of tokens to transfer
     */
    function batchWithdraw(
        address[] _tokenAddresses,
        uint[] _quantities
    )
        external
    {
        for (uint i=0; i<_tokenAddresses.length; i++) {
            withdraw(
                _tokenAddresses[i],
                _quantities[i]
            );
        }
    }

    /* ============ Setter Functions ============ */

    /**
     * Set vaultAddress.
     *
     * @param  _vaultAddress   The address of the Vault
     */

    function setVaultAddress(
        address _vaultAddress
    )
        external
        onlyOwner
    {
        vaultAddress = _vaultAddress;
    }

    /**
     * Set transferProxyAddress.
     *
     * @param  _transferProxyAddress   The address of the TransferProxy
     */

    function setTransferProxyAddress(
        address _transferProxyAddress
    )
        external
        onlyOwner
    {
        transferProxyAddress = _transferProxyAddress;
    }

        /**
     * Deposit any quantity of tokens into the vault.
     *
     * @param  _tokenAddress   The address of the ERC20 token
     * @param  _quantity       The number of tokens to transfer
     */
    function deposit(
        address _tokenAddress,
        uint _quantity
    )
        public
    {
        TransferProxy(transferProxyAddress).transferToVault(
            msg.sender,
            _tokenAddress,
            _quantity
        );

        Vault(vaultAddress).incrementTokenOwner(
            msg.sender,
            _tokenAddress,
            _quantity
        );
    }

    /**
     * Withdraw a quantity of tokens from the vault.
     * Token must be unassociated with a Set Token.
     *
     * @param  _tokenAddress   The address of the ERC20 token
     * @param  _quantity       The number of tokens to transfer
     */
    function withdraw(
        address _tokenAddress,
        uint _quantity
    )
        public
    {
        Vault(vaultAddress).decrementTokenOwner(
            msg.sender,
            _tokenAddress,
            _quantity
        );

        Vault(vaultAddress).withdrawTo(
            _tokenAddress,
            msg.sender,
            _quantity
        );
    }
}
