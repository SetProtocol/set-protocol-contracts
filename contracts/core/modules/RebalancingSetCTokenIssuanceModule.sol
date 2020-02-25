/*
    Copyright 2020 Set Labs Inc.

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

import { CommonMath } from "../../lib/CommonMath.sol";
import { CompoundUtils } from "../../lib/CompoundUtils.sol";
import { CTokenWhiteListed } from "./lib/CTokenWhiteListed.sol";
import { ICToken } from "../interfaces/ICToken.sol";
import { IRebalancingSetToken } from "../interfaces/IRebalancingSetToken.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { IWETH } from "../../lib/IWETH.sol";
import { IAddressToAddressWhiteList } from "../interfaces/IAddressToAddressWhiteList.sol";
import { ERC20Wrapper } from "../../lib/ERC20Wrapper.sol";
import { RebalancingSetIssuanceModule } from "./RebalancingSetIssuanceModule.sol";


/**
 * @title RebalancingSetCTokenIssuanceModule
 * @author Set Protocol
 *
 * A module that includes functions for issuing / redeeming rebalancing SetToken from its base components, cToken
 * underlying components, and Ether. Note: This module is not compatible with Compound Ether (cETH).
 */
contract RebalancingSetCTokenIssuanceModule is
    RebalancingSetIssuanceModule,
    CTokenWhiteListed
{
    using SafeMath for uint256;

    /* ============ Constructor ============ */

    /**
     * Constructor function for RebalancingSetCTokenIssuanceModule
     *
     * @param _core                The address of Core
     * @param _vault               The address of Vault
     * @param _transferProxy       The address of TransferProxy
     * @param _weth                Instance of Wrapped Ether
     * @param _cTokenWhiteList     Instance of whitelisted cTokens to underlying addresses
     */
    constructor(
        address _core,
        address _vault,
        address _transferProxy,
        IWETH _weth,
        IAddressToAddressWhiteList _cTokenWhiteList
    )
        public
        RebalancingSetIssuanceModule(
            _core,
            _vault,
            _transferProxy,
            _weth
        )
        CTokenWhiteListed(
            _transferProxy,
            _cTokenWhiteList
        )
    {}

    /* ============ External Functions ============ */

    /**
     * Issue a rebalancing SetToken using the base components of the base SetToken. If the base component is a supported
     * cToken, retrieve the underlying from the user and mint the cToken. The base SetToken is then issued
     * into the rebalancing SetToken. The base SetToken quantity issued is calculated by taking the rebalancing SetToken's quantity,
     * unit shares, and natural unit. If the calculated quantity is not a multiple of the natural unit of the base SetToken,
     * the quantity is rounded up to the base SetToken natural unit.
     * NOTE: Potential to receive more baseSet than expected if someone transfers some to this module.
     * Be careful with balance checks.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing SetToken to issue
     * @param  _rebalancingSetQuantity   The issuance quantity of rebalancing SetToken
     * @param  _keepChangeInVault        Boolean signifying whether excess base SetToken is transfered to the user
     *                                   or left in the vault
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

        // Deposit compoments and mint cTokens. Set false because we are not wrapping Ether
        depositComponentsHandleCTokensAndEth(
            baseSetAddress,
            requiredBaseSetQuantity,
            false
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
    }

    /**
     * Issue a rebalancing SetToken using the base components and ether of the base SetToken. If the base component
     * is a supported cToken, retrieve the underlying from the user and mint the cToken. The ether is wrapped
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

        // Deposit compoments and mint cTokens. Set true because we are wrapping Ether
        // The required ether is wrapped and approved to the transferProxy
        depositComponentsHandleCTokensAndEth(
            baseSetAddress,
            requiredBaseSetQuantity,
            true
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
     * Redeems a rebalancing SetToken into the base components of the base SetToken. If a supported cToken, then base components
     * are redeemed for the underlying and sent back to user.
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

        // Get base Set address
        address baseSetAddress = IRebalancingSetToken(_rebalancingSetAddress).currentSet();
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

        // Withdraw compoments and redeem cTokens. Set false because we are not wrapping Ether
        // Transfer tokens to sender.
        withdrawComponentsHandleCTokensAndEth(baseSetAddress, false);

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
     * Redeems a rebalancing SetToken into the base components of the base SetToken. If a supported cToken, then base components
     * are redeemed for the underlying and sent back to user. Unwraps wrapped ether and sends eth to the user.
     * If no wrapped ether in Set then will REVERT.
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

        // Withdraw compoments and redeem cTokens. Set true because we are wrapping Ether
        // Transfer tokens to sender.
        withdrawComponentsHandleCTokensAndEth(baseSetAddress, true);

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
     * During issuance, deposit the required quantity of base SetToken, handle cToken minting, wrap Ether, and deposit components
     * (excluding Ether, which is deposited during issuance) to the Vault in the name of the module.
     *
     * @param  _baseSetAddress           Address of the base SetToken token
     * @param  _baseSetQuantity          The Quantity of the base SetToken token to issue
     * @param  _wrapEth                  Boolean indicating whether to wrap Eth
     */
    function depositComponentsHandleCTokensAndEth(
        address _baseSetAddress,
        uint256 _baseSetQuantity,
        bool _wrapEth
    )
        private
    {
        ISetToken baseSet = ISetToken(_baseSetAddress);

        address[] memory baseSetComponents = baseSet.getComponents();
        uint256[] memory baseSetUnits = baseSet.getUnits();
        uint256 baseSetNaturalUnit = baseSet.naturalUnit();

        // Loop through the base SetToken components and deposit components
        for (uint256 i = 0; i < baseSetComponents.length; i++) {
            address currentComponentAddress = baseSetComponents[i];
            uint256 currentUnit = baseSetUnits[i];

            // Calculate required component quantity
            uint256 currentComponentQuantity = _baseSetQuantity.div(baseSetNaturalUnit).mul(currentUnit);

            // If cToken, calculate required underlying tokens and transfer to module
            address underlyingAddress = cTokenWhiteList.whitelist(currentComponentAddress);
            if (underlyingAddress != address(0)) {
                // Deposit underlying components and mint cToken
                depositAndMintCToken(
                    currentComponentAddress,
                    currentComponentQuantity,
                    underlyingAddress
                );
            } else if (_wrapEth && currentComponentAddress == address(weth)) {
                // If address is weth, deposit weth and transfer eth
                // Expect the ether included exceeds the required Weth quantity
                require(
                    msg.value >= currentComponentQuantity,
                    "RebalancingSetCTokenIssuanceModule.depositComponentsHandleCTokensAndEth: Not enough ether included for base SetToken"
                );

                // Wrap the required ether quantity
                // NOTE: Weth is wrapped but does not get deposited to vault. When issuing, WETH is pulled from contract to vault
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
                    currentComponentAddress,
                    currentComponentQuantity
                );
            }
        }
    }

    /**
     * This function deposits the underlying components into the module and mints cToken
     *
     * @param  _cTokenComponent             Address of the cToken to mint
     * @param  _cTokenQuantity              Quantity of the cToken required
     * @param  _underlyingComponent         Address of the underlying component
     */
    function depositAndMintCToken(
        address _cTokenComponent,
        uint256 _cTokenQuantity,
        address _underlyingComponent
    )
        private
    {
        ICToken cTokenInstance = ICToken(_cTokenComponent);

        // Calculate required amount of underlying. Calculated as cToken quantity * exchangeRate / 10 ** 18.
        uint256 exchangeRate = cTokenInstance.exchangeRateCurrent();
        uint256 underlyingQuantity = CompoundUtils.convertCTokenToUnderlying(_cTokenQuantity, exchangeRate);

        // Transfer components to this module
        coreInstance.transferModule(
            _underlyingComponent,
            underlyingQuantity,
            msg.sender,
            address(this)
        );

        // Ensure allowance for underlying token to cToken contract. This is for cases if we add a new cToken to the whitelist
        ERC20Wrapper.ensureAllowance(
            _underlyingComponent,
            address(this),
            address(cTokenInstance),
            underlyingQuantity
        );

        // Mint cToken using underlying
        uint256 mintResponse = cTokenInstance.mint(underlyingQuantity);
        require(
            mintResponse == 0,
            "CTokenExchangeIssuanceModule.exchangeIssue: Error minting cToken"
        );

        // Get balance of cTokens minted in the contract
        uint256 cTokenQuantity = ERC20Wrapper.balanceOf(
            address(_cTokenComponent),
            address(this)
        );

        // Ensure allowance for cToken to transferProxy. This is for cases if we add a new cToken to the whitelist
        ERC20Wrapper.ensureAllowance(
            _cTokenComponent,
            address(this),
            transferProxy,
            cTokenQuantity
        );

        // Deposit transformed cTokens to vault (owned by this contract)
        coreInstance.depositModule(
            address(this),
            address(this),
            _cTokenComponent,
            cTokenQuantity
        );
    }

    /**
     * During redemption, withdraw the required quantity of base SetToken, and withdraw
     * components to the sender. If _unwrapEth is true, then unwrap weth into Ether
     *
     * @param  _baseSetAddress           Address of the base SetToken
     * @param  _unwrapEth                Boolean indicating whether to withdraw to Eth
     */
    function withdrawComponentsHandleCTokensAndEth(
        address _baseSetAddress,
        bool _unwrapEth
    )
        private
    {
        address[] memory baseSetComponents = ISetToken(_baseSetAddress).getComponents();

        // Loop through the base SetToken components.
        for (uint256 i = 0; i < baseSetComponents.length; i++) {
            address currentComponentAddress = baseSetComponents[i];
            uint256 currentComponentQuantity = vaultInstance.getOwnerBalance(
                currentComponentAddress,
                address(this)
            );

            // If cToken, calculate required underlying tokens and transfer to module
            address underlyingAddress = cTokenWhiteList.whitelist(currentComponentAddress);
            if (underlyingAddress != address(0)) {
                // Redeem underlying components send to user
                redeemCTokenAndWithdraw(
                    currentComponentAddress,
                    currentComponentQuantity,
                    underlyingAddress
                );
            }
            else if (_unwrapEth && currentComponentAddress == address(weth)) {
                // If address is weth, withdraw weth and transfer eth to sender
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
                    currentComponentAddress,
                    currentComponentQuantity
                );
            }
        }
    }

    /**
     * This function redeems the cToken in the module and withdraws the underlying component to the user
     *
     * @param  _cTokenComponent             Address of the cToken to redeem
     * @param  _cTokenQuantity              Quantity of the cToken to redeem
     * @param  _underlyingComponent         Address of the underlying component
     */
    function redeemCTokenAndWithdraw(
        address _cTokenComponent,
        uint256 _cTokenQuantity,
        address _underlyingComponent
    )
        private
    {
        ICToken cTokenInstance = ICToken(_cTokenComponent);

        // Calculate required amount of underlying. Calculated as cToken quantity * exchangeRate / 10 ** 18.
        uint256 exchangeRate = cTokenInstance.exchangeRateCurrent();
        uint256 underlyingQuantity = CompoundUtils.convertCTokenToUnderlying(_cTokenQuantity, exchangeRate);

        // Transfer the cToken to this address from the Vault
        coreInstance.withdrawModule(
            address(this),
            address(this),
            _cTokenComponent,
            _cTokenQuantity
        );

        // Redeem cToken to underlying
        uint256 redeemResponse = cTokenInstance.redeem(_cTokenQuantity);
        require(
            redeemResponse == 0,
            "CTokenExchangeIssuanceModule.exchangeRedeem: Error redeeming cToken"
        );

         // Get balance of underlying after cToken redemption and override
        underlyingQuantity = ERC20Wrapper.balanceOf(
            _underlyingComponent,
            address(this)
        );

        // Transfer underlying component from the module to the user
        coreInstance.transferModule(
            _underlyingComponent,
            underlyingQuantity,
            address(this),
            msg.sender
        );
    }
}