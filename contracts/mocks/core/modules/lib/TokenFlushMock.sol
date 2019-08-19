pragma solidity 0.5.7;

import { ICore } from "../../../../core/interfaces/ICore.sol";
import { ISetToken } from "../../../../core/interfaces/ISetToken.sol";
import { ITransferProxy } from "../../../../core/interfaces/ITransferProxy.sol";
import { IVault } from "../../../../core/interfaces/IVault.sol";
import { TokenFlush } from "../../../../core/modules/lib/TokenFlush.sol";
import { ModuleCoreStateV2 } from "../../../../core/modules/lib/ModuleCoreStateV2.sol";

contract TokenFlushMock is
    ModuleCoreStateV2,
    TokenFlush
{
    constructor(
        ICore _core,
        IVault _vault,
        ITransferProxy _transferProxy
    )
        public
        ModuleCoreStateV2(_core, _vault, _transferProxy)
    {}

    function returnExcessBaseSetFromContractMock(
    	address _baseSetAddress,
    	address _returnAddress,
        bool _keepChangeInVault
	)
		external
	{
		returnExcessBaseSetFromContract(_baseSetAddress, _returnAddress, _keepChangeInVault);
	}

	function returnExcessBaseSetInVaultMock(
        address _baseSetAddress,
        address _returnAddress,
        bool _keepChangeInVault
    )
        external
    {
    	returnExcessBaseSetInVault(_baseSetAddress, _returnAddress, _keepChangeInVault);
    }

    function returnExcessComponentsFromContractMock(
        ISetToken _baseSetToken,
        address _returnAddress
    )
        external
    {
        returnExcessComponentsFromContract(_baseSetToken, _returnAddress);
    }

    function returnExcessComponentsFromVaultMock(
        ISetToken _baseSetToken,
        address _returnAddress
    )
        external
    {
        returnExcessComponentsFromVault(_baseSetToken, _returnAddress);
    }
}

