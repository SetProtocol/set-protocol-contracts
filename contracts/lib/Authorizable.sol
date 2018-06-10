pragma solidity ^0.4.24;
pragma experimental "ABIEncoderV2";

import { Ownable } from "zeppelin-solidity/contracts/ownership/Ownable.sol";


contract Authorizable is
    Ownable
{
    // Revert reasons
    string constant SENDER_NOT_AUTHORIZED = "Sender not authorized to call this method.";
    string constant TARGET_NOT_AUTHORIZED = "Target address must be authorized.";
    string constant TARGET_ALREADY_AUTHORIZED = "Target must not already be authorized.";
    string constant INDEX_OUT_OF_BOUNDS = "Specified array index is out of bounds.";
    string constant INDEX_ADDRESS_MISMATCH = "Address found at index does not match target.";

    /// @dev Only authorized addresses can invoke functions with this modifier.
    modifier onlyAuthorized {
        require(
            authorized[msg.sender],
            SENDER_NOT_AUTHORIZED
        );
        _;
    }

    mapping (address => bool) public authorized;
    address[] public authorities;

    /// @dev Authorizes an address.
    /// @param target Address to authorize.
    function addAuthorizedAddress(address target)
        external
        onlyOwner
    {
        require(
            !authorized[target],
            TARGET_ALREADY_AUTHORIZED
        );

        authorized[target] = true;
        authorities.push(target);
    }

    /// @dev Removes authorizion of an address.
    /// @param target Address to remove authorization from.
    function removeAuthorizedAddress(address target)
        external
        onlyOwner
    {
        require(
            authorized[target],
            TARGET_NOT_AUTHORIZED
        );

        delete authorized[target];
        for (uint i = 0; i < authorities.length; i++) {
            if (authorities[i] == target) {
                authorities[i] = authorities[authorities.length - 1];
                authorities.length -= 1;
                break;
            }
        }
    }

    /// @dev Removes authorizion of an address.
    /// @param target Address to remove authorization from.
    /// @param index Index of target in authorities array.
    function removeAuthorizedAddressAtIndex(
        address target,
        uint256 index
    )
        external
    {
        require(
            index < authorities.length,
            INDEX_OUT_OF_BOUNDS
        );
        require(
            authorities[index] == target,
            INDEX_ADDRESS_MISMATCH
        );

        delete authorized[target];
        authorities[index] = authorities[authorities.length - 1];
        authorities.length -= 1;
    }

    /// @dev Gets all authorized addresses.
    /// @return Array of authorized addresses.
    function getAuthorizedAddresses()
        external
        view
        returns (address[] memory)
    {
        return authorities;
    }
}
