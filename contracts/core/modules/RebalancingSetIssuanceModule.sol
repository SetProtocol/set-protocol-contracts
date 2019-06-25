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
 * A module that includes functions for issuing / redeeming Rebalancing Sets to/from its base components and ether.
 */
contract RebalancingSetIssuanceModule is
    ModuleCoreState,
    RebalancingSetIssuance,
    ReentrancyGuard
{
    using SafeMath for uint256;

    // Address and instance of Transfer Proxy contract
    address public transferProxy;

    // Address and instance of Wrapped Ether contract
    IWETH public weth;

    /* ============ Events ============ */

    event LogRebalancingSetIssue(
        address rebalancingSetAddress,
        address indexed callerAddress,
        uint256 rebalancingSetQuantity
    );

    event LogRebalancingSetRedeem(
        address rebalancingSetAddress,
        address indexed callerAddress,
        uint256 rebalancingSetQuantity
    );

    /* ============ Constructor ============ */

    /**
     * Constructor function for RebalancingSetIssuanceModule
     *
     * @param _core                The address of Core
     * @param _vault               The address of Vault
     * @param _transferProxy       The address of Transfer Proxy
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
        require( // coverage-disable-line
            msg.sender == address(weth),
            "RebalancingSetIssuanceModule.fallback: Cannot receive ETH directly unless unwrapping WETH"
        );
    }

    /* ============ External Functions ============ */

    /**
     * Issue a Rebalancing Set using the base components of the Base Set.
     * The Base Set is then issued and reissued into the Rebalancing Set. The Base Set quantity issued is calculated
     * by taking the Rebalancing Set's quantity, unit shares, and natural unit. If the calculated quantity is not
     * a multiple of the natural unit of the base Set, the quantity is rounded up to the base Set natural unit.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing Set to issue
     * @param  _rebalancingSetQuantity   The issuance quantity of Rebalancing Set
     * @param  _keepChangeInVault        Boolean signifying whether excess base Set is transfered to the user 
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
        address baseSetAddress = IRebalancingSetToken(_rebalancingSetAddress).currentSet();

        // Calculate required base Set quantity to issue Rebalancing Set
        uint256 requiredBaseSetQuantity = getBaseSetIssuanceRequiredQuantity(
            _rebalancingSetAddress,
            _rebalancingSetQuantity
        );

        // Issue base Set to this contract, held in this contract
        coreInstance.issueModule(
            msg.sender,
            address(this),
            baseSetAddress,
            requiredBaseSetQuantity
        );

        // Ensure base Set allowance to the transferProxy
        ERC20Wrapper.ensureAllowance(
            baseSetAddress,
            address(this),
            transferProxy,
            requiredBaseSetQuantity
        );

        // Issue rebalancing Set to the sender
        coreInstance.issueTo(
            msg.sender,
            _rebalancingSetAddress,
            _rebalancingSetQuantity
        );

        // Return any excess base Set token to the sender
        returnExcessBaseSet(baseSetAddress, _keepChangeInVault);

        // Log RebalancingSetIssue
        emit LogRebalancingSetIssue(
            _rebalancingSetAddress,
            msg.sender,
            _rebalancingSetQuantity
        );
    }

    /**
     * Issue a Rebalancing Set using the base components and ether of the Base Set. The ether is wrapped 
     * into wrapped Ether and utilized in issuance.
     * The Base Set is then issued and reissued into the Rebalancing Set. Read more about base Set quantity
     * in the issueRebalancingSet function.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing Set to issue
     * @param  _rebalancingSetQuantity   The issuance quantity of Rebalancing Set
     * @param  _keepChangeInVault        Boolean signifying whether excess base Set is transfered to the user 
     *                                     or left in the vault
     */
    function issueRebalancingSetWithEther(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        bool _keepChangeInVault
    )
        external
        payable
        nonReentrant
    {
        address baseSetAddress = IRebalancingSetToken(_rebalancingSetAddress).currentSet();

        // Calculate required base Set quantity
        uint256 requiredBaseSetQuantity = getBaseSetIssuanceRequiredQuantity(
            _rebalancingSetAddress,
            _rebalancingSetQuantity
        );

        // Deposit all the required non-weth components to the vault under the name of this contract
        // The required ether is wrapped and approved to the transferProxy
        depositComponentsAndHandleEth(
            baseSetAddress,
            requiredBaseSetQuantity
        );

        // Issue Base Set to this contract, with the baseSet held in the Vault
        coreInstance.issueInVault(
            baseSetAddress,
            requiredBaseSetQuantity
        );

        // Note: Don't need to set allowance of the BaseSet as the BaseSet is already in the vault

        // Issue Rebalancing Set to the sender
        coreInstance.issueTo(
            msg.sender,
            _rebalancingSetAddress,
            _rebalancingSetQuantity
        );

        // Return any excess base Set token to the sender
        returnExcessBaseSet(baseSetAddress, _keepChangeInVault);

        // Log RebalancingSetIssue
        emit LogRebalancingSetIssue(
            _rebalancingSetAddress,
            msg.sender,
            _rebalancingSetQuantity
        );

        // Send excess eth back to the user
        uint256 leftoverEth = address(this).balance;
        if (leftoverEth > 0) {
            msg.sender.transfer(leftoverEth);
        }
    }

    /**
     * Redeems a Rebalancing Set into the base components of the Base Set.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing Set to redeem
     * @param  _rebalancingSetQuantity   The Quantity of the rebalancing Set to redeem
     * @param  _keepChangeInVault        Boolean signifying whether excess base Set is transfered to the user 
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
        // Redeem RB Set to the vault attributed to this contract
        coreInstance.redeemModule(
            msg.sender,
            address(this),
            _rebalancingSetAddress,
            _rebalancingSetQuantity
        );

        // Calculate the Base Set Redeem quantity
        address baseSetAddress = IRebalancingSetToken(_rebalancingSetAddress).currentSet();
        uint256 baseSetRedeemQuantity = getBaseSetRedeemQuantity(baseSetAddress);

        // Withdraw base Set to this contract
        coreInstance.withdraw(
            baseSetAddress,
            baseSetRedeemQuantity
        );

        // Redeem Base Set and send components to the the user
        // Set exclude to 0, as tokens in Rebalancing Sets are already whitelisted
        coreInstance.redeemAndWithdrawTo(
            baseSetAddress,
            msg.sender,
            baseSetRedeemQuantity,
            0
        );

        // Transfer any change of the base Set to the end user
        returnExcessBaseSet(baseSetAddress, _keepChangeInVault);

        // Log RebalancingSetRedeem
        emit LogRebalancingSetRedeem(
            _rebalancingSetAddress,
            msg.sender,
            _rebalancingSetQuantity
        );
    }

    /**
     * Redeems a Rebalancing Set into the base components of the Base Set. Unwraps
     * any wrapped ether and sends eth to the user.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing Set to redeem
     * @param  _rebalancingSetQuantity   The Quantity of the rebalancing Set to redeem
     * @param  _keepChangeInVault        Boolean signifying whether excess base Set is transfered to the user 
     *                                     or left in the vault
     */
    function redeemRebalancingSetWithEther(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity,
        bool _keepChangeInVault
    )
        external
        nonReentrant
    {
        // Redeem RB Set to the vault attributed to this contract
        coreInstance.redeemModule(
            msg.sender,
            address(this),
            _rebalancingSetAddress,
            _rebalancingSetQuantity
        );

        // Calculate the Base Set Redeem quantity
        address baseSetAddress = IRebalancingSetToken(_rebalancingSetAddress).currentSet();
        uint256 baseSetRedeemQuantity = getBaseSetRedeemQuantity(baseSetAddress);

        // Withdraw base Set to this contract
        coreInstance.withdraw(
            baseSetAddress,
            baseSetRedeemQuantity
        );

        // Redeem the base Set. The components stay in the vault
        coreInstance.redeem(
            baseSetAddress,
            baseSetRedeemQuantity
        );

        // Loop through the base Set components and transfer to sender.
        withdrawComponentsToSenderWithEther(baseSetAddress);

        // Transfer any change of the base Set to the end user
        returnExcessBaseSet(baseSetAddress, _keepChangeInVault);

        // Log RebalancingSetRedeem
        emit LogRebalancingSetRedeem(
            _rebalancingSetAddress,
            msg.sender,
            _rebalancingSetQuantity
        );
    }

    /* ============ Private Functions ============ */

    /**
     * During issuance, deposit the required quantity of Base Set, wrap Ether, and deposit components
     * (excluding Ether) to the Vault in the name of the module.
     *
     * @param  _baseSetAddress           Address of the base Set token
     * @param  _baseSetQuantity          The Quantity of the base Set token to issue
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

       // Loop through the base Set components and deposit components 
        for (uint256 i = 0; i < baseSetComponents.length; i++) {
            address currentComponent = baseSetComponents[i];
            uint256 currentUnit = baseSetUnits[i];

            // Calculate required component quantity
            uint256 currentComponentQuantity = _baseSetQuantity.mul(currentUnit).div(baseSetNaturalUnit);

            // If address is weth, deposit weth and transfer eth
            if (currentComponent == address(weth)) {
                // Expect the ether included exceeds the required Weth quantity
                require(
                    msg.value >= currentComponentQuantity,
                    "RebalancingSetIssuanceMOdule.depositNonWethComponents: Not enough ether included for base Set"
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

                continue;
            }

            // Deposit components to the vault in the name of the contract
            coreInstance.depositModule(
                msg.sender,
                address(this),
                currentComponent,
                currentComponentQuantity
            );
        }
    }

    /**
     * During redemption, withdraw the required quantity of Base Set, unwrapwrap Ether, and withdraw
     * components to the sender
     *
     * @param  _baseSetAddress           Address of the base Set token
     */
    function withdrawComponentsToSenderWithEther(
        address _baseSetAddress
    )
        private
    {
        address[] memory baseSetComponents = ISetToken(_baseSetAddress).getComponents();

        // Loop through the base Set components.
        for (uint256 i = 0; i < baseSetComponents.length; i++) {
            address currentComponent = baseSetComponents[i];
            uint256 currentComponentQuantity = vaultInstance.getOwnerBalance(
                currentComponent,
                address(this)
            );

            // If address is weth, withdraw weth and transfer eth to sender
            if (currentComponent == address(weth)) {
                // Trasfer the wrapped ether to this address from the Vault
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

                continue;
            }

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