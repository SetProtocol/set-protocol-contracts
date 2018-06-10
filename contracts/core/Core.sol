pragma solidity 0.4.24;
pragma experimental "ABIEncoderV2";


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
    /*
     * Constants
     */
    
    string constant ADDRESSES_MISSING = "Addresses must not be empty.";
    string constant QUANTITES_MISSING = "Quantities must not be empty.";
    string constant BATCH_INPUT_MISMATCH = "Addresses and quantities must be the same length.";

    /* ============ State Variables ============ */

    // Address of the TransferProxy contract
    address public transferProxyAddress;

    // Address of the Vault contract
    address public vaultAddress;

    /*
     * Modifiers
     */

    modifier isValidBatchTransaction(address[] _tokenAddresses, uint[] _quantities) {
        require(
            _tokenAddresses.length > 0,
            ADDRESSES_MISSING
        );
        require(
            _quantities.length > 0,
            QUANTITES_MISSING
        );
        require(
            _tokenAddresses.length == _quantities.length,
            BATCH_INPUT_MISMATCH
        );
        _;
    }

    /* ============ No Constructor ============ */

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

    /* ============ Public Functions ============ */

    /**
     * Deposit multiple tokens to the vault. Quantities should be in the
     * order of the addresses of the tokens being deposited.
     *
     * @param  _tokenAddresses   Array of the addresses of the ERC20 tokens
     * @param  _quantities       Array of the number of tokens to transfer
     */
    function batchDeposit(
        address[] _tokenAddresses,
        uint[] _quantities
    )
        public
        isValidBatchTransaction(_tokenAddresses, _quantities)
    {
        for (uint i = 0; i < _tokenAddresses.length; i++) {
            deposit(
                _tokenAddresses[i],
                _quantities[i]
            );
        }
    }

    /**
     * Withdraw multiple tokens from the vault. Quantities should be in the
     * order of the addresses of the tokens being withdrawn.
     *
     * @param  _tokenAddresses    Array of the addresses of the ERC20 tokens
     * @param  _quantities        Array of the number of tokens to transfer
     */
    function batchWithdraw(
        address[] _tokenAddresses,
        uint[] _quantities
    )
        public
        isValidBatchTransaction(_tokenAddresses, _quantities)
    {
        for (uint i = 0; i < _tokenAddresses.length; i++) {
            withdraw(
                _tokenAddresses[i],
                _quantities[i]
            );
        }
    }

    /**
     * Deposit any quantity of tokens into the vault.
     *
     * @param  _tokenAddress    The address of the ERC20 token
     * @param  _quantity        The number of tokens to transfer
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
     *
     * @param  _tokenAddress    The address of the ERC20 token
     * @param  _quantity        The number of tokens to transfer
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
