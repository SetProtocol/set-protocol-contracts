/*
    Copyright 2019 Set Labs Inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

pragma solidity 0.5.7;

import { ReentrancyGuard } from "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { IRebalancingSetToken } from "../interfaces/IRebalancingSetToken.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { IWETH } from "../../lib/IWETH.sol";
import { ERC20Wrapper } from "../../lib/ERC20Wrapper.sol";
import { ModuleCoreState } from "./lib/ModuleCoreState.sol";
import { RebalancingSetIssuance } from "./lib/RebalancingSetIssuance.sol";


/**
 * @title RebalancingSetIssuanceModule
 * @author Set Protocol
 *
 * A module that includes functions for issuing / redeeming rebalancing SetToken to/from its base components and ether.
 */
contract RebalancingSetIssuanceModule is
    ModuleCoreState,
    RebalancingSetIssuance,
    ReentrancyGuard
{
    using SafeMath for uint256;

    // Address and instance of TransferProxy contract
    address public transferProxy;

    // Address and instance of Wrapped Ether contract
    IWETH public weth;

    /* ============ Events ============ */

    event LogRebalancingSetIssue(
        address indexed rebalancingSetAddress,
        address indexed callerAddress,
        uint256 rebalancingSetQuantity
    );

    event LogRebalancingSetRedeem(
        address indexed rebalancingSetAddress,
        address indexed callerAddress,
        uint256 rebalancingSetQuantity
    );

    /* ============ Constructor ============ */

    /**
     * Constructor function for RebalancingSetIssuanceModule
     *
     * @param _core                The address of Core
     * @param _vault               The address of Vault
     * @param _transferProxy       The address of TransferProxy
     * @param _weth                The address of Wrapped Ether
     */
    constructor(
        address _core,
        address _vault,
        address _transferProxy,
        IWETH _weth
    )
        public
        ModuleCoreState(
            _core,
            _vault
        )
    {
        // Commit the WETH instance
        weth = _weth;

        // Commit the transferProxy instance
        transferProxy = _transferProxy;
    }

    /**
     * Fallback function. Disallows ether to be sent to this contract without data except when
     * unwrapping WETH.
     */
    function ()
        external
        payable
    {
        require(
            msg.sender == address(weth),
            "RebalancingSetIssuanceModule.fallback: Cannot receive ETH directly unless unwrapping WETH"
        );
    }

    /* ============ External Functions ============ */

    /**
     * Issue a rebalancing SetToken using the base components of the base SetToken.
     * The base SetToken is then issued into the rebalancing SetToken. The base SetToken quantity issued is calculated
     * by taking the rebalancing SetToken's quantity, unit shares, and natural unit. If the calculated quantity is not
     * a multiple of the natural unit of the base SetToken, the quantity is rounded up to the base SetToken natural unit.
     * NOTE: Potential to receive more baseSet than expected if someone transfers some to this module.
     * Be careful with balance checks.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing SetToken to issue
     * @param  _rebalancingSetQuantity   The issuance quantity of rebalancing SetToken
     * @param  _keepChangeInVault        Boolean signifying whether excess base SetToken is transfered to the user 
     *                                     or left in the vault
     */
    function issueRebalancingSet(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        bool _keepChangeInVault
    )
        external
        nonReentrant
    {
        // Get baseSet address and quantity required for issuance of Rebalancing Set
        (
            address baseSetAddress,
            uint256 requiredBaseSetQuantity
        ) = getBaseSetAddressAndQuantity(_rebalancingSetAddress, _rebalancingSetQuantity);

        // Issue base SetToken to this contract, held in this contract
        coreInstance.issueModule(
            msg.sender,
            address(this),
            baseSetAddress,
            requiredBaseSetQuantity
        );

        // Ensure base SetToken allowance to the transferProxy
        ERC20Wrapper.ensureAllowance(
            baseSetAddress,
            address(this),
            transferProxy,
            requiredBaseSetQuantity
        );

        // Issue rebalancing SetToken to the sender and return any excess base to sender
        issueRebalancingSetAndReturnExcessBase(
            _rebalancingSetAddress,
            baseSetAddress,
            _rebalancingSetQuantity,
            _keepChangeInVault
        );
    }

    /**
     * Issue a rebalancing SetToken using the base components and ether of the base SetToken. The ether is wrapped 
     * into wrapped Ether and utilized in issuance.
     * The base SetToken is then issued and reissued into the rebalancing SetToken. Read more about base SetToken quantity
     * in the issueRebalancingSet function.
     * NOTE: Potential to receive more baseSet and ether dust than expected if someone transfers some to this module.
     * Be careful with balance checks.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing SetToken to issue
     * @param  _rebalancingSetQuantity   The issuance quantity of rebalancing SetToken
     * @param  _keepChangeInVault        Boolean signifying whether excess base SetToken is transfered to the user 
     *                                     or left in the vault
     */
    function issueRebalancingSetWrappingEther(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        bool _keepChangeInVault
    )
        external
        payable
        nonReentrant
    {
        // Get baseSet address and quantity required for issuance of Rebalancing Set
        (
            address baseSetAddress,
            uint256 requiredBaseSetQuantity
        ) = getBaseSetAddressAndQuantity(_rebalancingSetAddress, _rebalancingSetQuantity);

        // Validate that WETH is a component of baseSet
        validateWETHIsAComponentOfSet(baseSetAddress, address(weth));

        // Deposit all the required non-weth components to the vault under the name of this contract
        // The required ether is wrapped and approved to the transferProxy
        depositComponentsAndHandleEth(
            baseSetAddress,
            requiredBaseSetQuantity
        );

        // Issue base SetToken to this contract, with the base SetToken held in the Vault
        coreInstance.issueInVault(
            baseSetAddress,
            requiredBaseSetQuantity
        );

        // Note: Don't need to set allowance of the base SetToken as the base SetToken is already in the vault

        // Issue rebalancing SetToken to the sender and return any excess base to sender
        issueRebalancingSetAndReturnExcessBase(
            _rebalancingSetAddress,
            baseSetAddress,
            _rebalancingSetQuantity,
            _keepChangeInVault
        );

        // Any eth that is not wrapped is sent back to the user
        // Only the amount required for the base SetToken issuance is wrapped.
        uint256 leftoverEth = address(this).balance;
        if (leftoverEth > 0) {
            msg.sender.transfer(leftoverEth);
        }
    }

    /**
     * Redeems a rebalancing SetToken into the base components of the base SetToken.
     * NOTE: Potential to receive more baseSet than expected if someone transfers some to this module.
     * Be careful with balance checks.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing SetToken to redeem
     * @param  _rebalancingSetQuantity   The Quantity of the rebalancing SetToken to redeem
     * @param  _keepChangeInVault        Boolean signifying whether excess base SetToken is transfered to the user 
     *                                     or left in the vault
     */
    function redeemRebalancingSet(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        bool _keepChangeInVault
    )
        external
        nonReentrant
    {
        // Validate the rebalancing SetToken is valid and the quantity is a multiple of the natural unit
        validateRebalancingSetIssuance(_rebalancingSetAddress, _rebalancingSetQuantity);

        // Redeem RB Set to the vault attributed to this contract
        coreInstance.redeemModule(
            msg.sender,
            address(this),
            _rebalancingSetAddress,
            _rebalancingSetQuantity
        );

        // Calculate the base SetToken Redeem quantity
        address baseSetAddress = IRebalancingSetToken(_rebalancingSetAddress).currentSet();
        uint256 baseSetRedeemQuantity = getBaseSetRedeemQuantity(baseSetAddress);

        // Withdraw base SetToken to this contract
        coreInstance.withdraw(
            baseSetAddress,
            baseSetRedeemQuantity
        );

        // Redeem base SetToken and send components to the the user
        // Set exclude to 0, as tokens in rebalancing SetToken are already whitelisted
        coreInstance.redeemAndWithdrawTo(
            baseSetAddress,
            msg.sender,
            baseSetRedeemQuantity,
            0
        );

        // Transfer any change of the base SetToken to the end user
        returnExcessBaseSet(baseSetAddress, transferProxy, _keepChangeInVault);

        // Log RebalancingSetRedeem
        emit LogRebalancingSetRedeem(
            _rebalancingSetAddress,
            msg.sender,
            _rebalancingSetQuantity
        );
    }

    /**
     * Redeems a rebalancing SetToken into the base components of the base SetToken. Unwraps
     * wrapped ether and sends eth to the user. If no wrapped ether in Set then will REVERT.
     * NOTE: Potential to receive more baseSet and ether dust than expected if someone transfers some to this module.
     * Be careful with balance checks.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing SetToken to redeem
     * @param  _rebalancingSetQuantity   The Quantity of the rebalancing SetToken to redeem
     * @param  _keepChangeInVault        Boolean signifying whether excess base SetToken is transferred to the user 
     *                                   or left in the vault
     */
    function redeemRebalancingSetUnwrappingEther(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        bool _keepChangeInVault
    )
        external
        nonReentrant
    {
        // Validate the rebalancing SetToken is valid and the quantity is a multiple of the natural unit
        validateRebalancingSetIssuance(_rebalancingSetAddress, _rebalancingSetQuantity);

        address baseSetAddress = IRebalancingSetToken(_rebalancingSetAddress).currentSet();

        validateWETHIsAComponentOfSet(baseSetAddress, address(weth));

        // Redeem rebalancing SetToken to the vault attributed to this contract
        coreInstance.redeemModule(
            msg.sender,
            address(this),
            _rebalancingSetAddress,
            _rebalancingSetQuantity
        );

        // Calculate the base SetToken Redeem quantity
        uint256 baseSetRedeemQuantity = getBaseSetRedeemQuantity(baseSetAddress);

        // Withdraw base SetToken to this contract
        coreInstance.withdraw(
            baseSetAddress,
            baseSetRedeemQuantity
        );

        // Redeem the base SetToken. The components stay in the vault
        coreInstance.redeem(
            baseSetAddress,
            baseSetRedeemQuantity
        );

        // Loop through the base SetToken components and transfer to sender.
        withdrawComponentsToSenderWithEther(baseSetAddress);

        // Transfer any change of the base SetToken to the end user
        returnExcessBaseSet(baseSetAddress, transferProxy, _keepChangeInVault);

        // Log RebalancingSetRedeem
        emit LogRebalancingSetRedeem(
            _rebalancingSetAddress,
            msg.sender,
            _rebalancingSetQuantity
        );
    }

    /* ============ Private Functions ============ */

    /**
     * Gets base set address from rebalancing set token and calculates amount of base set needed
     * for issuance.
     *
     * @param  _rebalancingSetAddress    Address of the RebalancingSetToken to issue
     * @param  _rebalancingSetQuantity   The Quantity of the rebalancing SetToken to issue
     * @return baseSetAddress            The address of RebalancingSet's base SetToken
     * @return requiredBaseSetQuantity   The quantity of base SetToken to issue
     */
    function getBaseSetAddressAndQuantity(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity
    )
        internal
        view
        returns (address, uint256)
    {
        // Validate the rebalancing SetToken is valid and the quantity is a multiple of the natural unit
        validateRebalancingSetIssuance(_rebalancingSetAddress, _rebalancingSetQuantity);

        address baseSetAddress = IRebalancingSetToken(_rebalancingSetAddress).currentSet();

        // Calculate required base SetToken quantity
        uint256 requiredBaseSetQuantity = getBaseSetIssuanceRequiredQuantity(
            _rebalancingSetAddress,
            _rebalancingSetQuantity
        );

        return (baseSetAddress, requiredBaseSetQuantity);        
    }

    /**
     * Issues the rebalancing set token to sender and returns any excess baseSet.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing SetToken to issue
     * @param  _baseSetAddress           Address of the rebalancing SetToken's base set
     * @param  _rebalancingSetQuantity   The Quantity of the rebalancing SetToken to redeem
     * @param  _keepChangeInVault        Boolean signifying whether excess base SetToken is transferred to the user 
     *                                   or left in the vault
     */
    function issueRebalancingSetAndReturnExcessBase(
        address _rebalancingSetAddress,
        address _baseSetAddress,
        uint256 _rebalancingSetQuantity,
        bool _keepChangeInVault
    )
        internal
    {
        // Issue rebalancing SetToken to the sender
        coreInstance.issueTo(
            msg.sender,
            _rebalancingSetAddress,
            _rebalancingSetQuantity
        );

        // Return any excess base SetToken token to the sender
        returnExcessBaseSet(_baseSetAddress, transferProxy, _keepChangeInVault);

        // Log RebalancingSetIssue
        emit LogRebalancingSetIssue(
            _rebalancingSetAddress,
            msg.sender,
            _rebalancingSetQuantity
        );       
    }

    /**
     * During issuance, deposit the required quantity of base SetToken, wrap Ether, and deposit components
     * (excluding Ether, which is deposited during issuance) to the Vault in the name of the module.
     *
     * @param  _baseSetAddress           Address of the base SetToken token
     * @param  _baseSetQuantity          The Quantity of the base SetToken token to issue
     */
    function depositComponentsAndHandleEth(
        address _baseSetAddress,
        uint256 _baseSetQuantity
    )
        private
    {
        ISetToken baseSet = ISetToken(_baseSetAddress);

        address[] memory baseSetComponents = baseSet.getComponents();
        uint256[] memory baseSetUnits = baseSet.getUnits();
        uint256 baseSetNaturalUnit = baseSet.naturalUnit();

       // Loop through the base SetToken components and deposit components 
        for (uint256 i = 0; i < baseSetComponents.length; i++) {
            address currentComponent = baseSetComponents[i];
            uint256 currentUnit = baseSetUnits[i];

            // Calculate required component quantity
            uint256 currentComponentQuantity = _baseSetQuantity.div(baseSetNaturalUnit).mul(currentUnit);

            // If address is weth, deposit weth and transfer eth
            if (currentComponent == address(weth)) {
                // Expect the ether included exceeds the required Weth quantity
                require(
                    msg.value >= currentComponentQuantity,
                    "RebalancingSetIssuanceModule.depositComponentsAndHandleEth: Not enough ether included for base SetToken"
                );

                // wrap the required ether quantity
                weth.deposit.value(currentComponentQuantity)();

                // Ensure weth allowance
                ERC20Wrapper.ensureAllowance(
                    address(weth),
                    address(this),
                    transferProxy,
                    currentComponentQuantity
                );
            } else {
                // Deposit components to the vault in the name of the contract
                coreInstance.depositModule(
                    msg.sender,
                    address(this),
                    currentComponent,
                    currentComponentQuantity
                );                
            }
        }
    }

    /**
     * During redemption, withdraw the required quantity of base SetToken, unwrapping Ether, and withdraw
     * components to the sender
     *
     * @param  _baseSetAddress           Address of the base SetToken
     */
    function withdrawComponentsToSenderWithEther(
        address _baseSetAddress
    )
        private
    {
        address[] memory baseSetComponents = ISetToken(_baseSetAddress).getComponents();

        // Loop through the base SetToken components.
        for (uint256 i = 0; i < baseSetComponents.length; i++) {
            address currentComponent = baseSetComponents[i];
            uint256 currentComponentQuantity = vaultInstance.getOwnerBalance(
                currentComponent,
                address(this)
            );

            // If address is weth, withdraw weth and transfer eth to sender
            if (currentComponent == address(weth)) {
                // Transfer the wrapped ether to this address from the Vault
                coreInstance.withdrawModule(
                    address(this),
                    address(this),
                    address(weth),
                    currentComponentQuantity
                );

                // Unwrap wrapped ether
                weth.withdraw(currentComponentQuantity);

                // Transfer to recipient
                msg.sender.transfer(currentComponentQuantity);
            } else {
                // Withdraw component from the Vault and send to the user
                coreInstance.withdrawModule(
                    address(this),
                    msg.sender,
                    currentComponent,
                    currentComponentQuantity
                );
            }
        }
    }
}