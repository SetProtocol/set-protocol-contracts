pragma solidity 0.4.25;
pragma experimental "ABIEncoderV2";

import { EIP712Library } from "../../../core/lib/EIP712Library.sol";

// Mock contract implementation of EIP712Library functions
contract EIP712LibraryMock {
    function testGetEIP712DomainHash()
    	external
    	pure
    	returns (bytes32)
	{
        return EIP712Library.getEIP712DomainHash();
    }

    function testHashEIP712Message(
    	bytes32 hashStruct
	)
		external
		pure
		returns (bytes32)
	{
        return EIP712Library.hashEIP712Message(hashStruct);
    }
}
