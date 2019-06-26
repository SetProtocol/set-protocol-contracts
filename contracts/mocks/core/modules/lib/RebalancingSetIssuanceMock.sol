pragma solidity 0.5.7;

import { RebalancingSetIssuance } from "../../../../core/modules/lib/RebalancingSetIssuance.sol";
import { ModuleCoreState } from "../../../../core/modules/lib/ModuleCoreState.sol";

contract RebalancingSetIssuanceMock is
	RebalancingSetIssuance
{
    constructor(
        address _core,
        address _vault
    )
        public
        ModuleCoreState(_core, _vault)
    {}

    function validateWETHIsAComponentOfSetMock(
        address _setAddress,
        address _wrappedEtherAddress
    )
        external
    {
    	validateWETHIsAComponentOfSet(_setAddress, _wrappedEtherAddress);
    }

	function validateRebalancingSetIssuanceMock(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity
    )
    	external
	{
		validateRebalancingSetIssuance(_rebalancingSetAddress, _rebalancingSetQuantity);
	}

	function getBaseSetIssuanceRequiredQuantityMock(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity
    )
    	external
    	returns (uint256)
	{
		return getBaseSetIssuanceRequiredQuantity(_rebalancingSetAddress, _rebalancingSetQuantity);
	}
    
    function getBaseSetRedeemQuantityMock(
        address _baseSetAddress
    )
        external
        returns (uint256)
    {
    	return getBaseSetRedeemQuantity(_baseSetAddress);
    }

    function returnExcessBaseSetFromContractMock(
    	address _baseSetAddress,
    	address _transferProxyAddress,
        bool _keepChangeInVault
	)
		external
	{
		returnExcessBaseSetFromContract(_baseSetAddress, _transferProxyAddress, _keepChangeInVault);
	}

	function returnExcessBaseSetInVaultMock(
        address _baseSetAddress,
        bool _keepChangeInVault
    )
        external
    {
    	returnExcessBaseSetInVault(_baseSetAddress, _keepChangeInVault);
    }
}

