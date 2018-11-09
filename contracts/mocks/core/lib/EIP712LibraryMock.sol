pragma solidity 0.4.25;
pragma experimental "ABIEncoderV2";

import { EIP712Library } from "../../../core/lib/EIP712Library.sol";

// Mock contract implementation of EIP712Library functions
contract EIP712LibraryMock {
    function testGetEIP712DomainHash()
    	public
    	view
    	returns (bytes32)
	{
        return EIP712Library.getEIP712DomainHash();
    }

    function testGetEIP712DomainSeparatorSchemaHash()
    	public
    	view
    	returns (bytes32)
	{
        return EIP712Library.getEIP712DomainSeparatorSchemaHash();
    }

    function testHashEIP712Message(
    	bytes32 hashStruct
	)
		public
		view
		returns (bytes32)
	{
        return EIP712Library.hashEIP712Message(hashStruct);
    }
}
