# Set Protocol Contract Deployment

## Token White List

For regulatory and technical reasons, only certain tokens are allowed to be used in the protocol. WETH and WBTC are the initial tokens.

Script should:
1. Get addresses for WBTC and WETH based on current network.
2. Deploy "WhiteList" contract with array containing addresses of approved tokens

## Core

Before deploying contracts, a few libraries are needed. They include:
  - `ERC20Wrapper` is used extensively to deal with tokens
  - `EIP712Library` for typed structure data hashing and signing
  - `OrderLibrary` for validating and hashing issuance orders (when someone has the required components in the vault and finally wants to create a set)
  - `ExchangeIssueLibrary` helps with parsing exchange issuance data. Only contains a struct atm.
  - `StandardProposeLibrary` contains all the logic when a set needs to be rebalanced. Proposal is the first stage and is required to be called by an outside. Restrictions such as whether a manager is proposing, the rebalance is at the correct time etc are all checked here.
  - `StandardStartRebalanceLibrary` once a certain time period has elapsed from the time of proposal. Rebalancing begins, issuance/withdrawals are disabled and the the dutch auction is setup. 
  - `StandardPlaceBidLibrary` allows you to place a bid in the dutch auction
  - `StandardSettleRebalanceLibrary` once the auction is finished, the set now needs to be settled.
  - `StandardFailAuctionLibrary` in case the auction fails because no one can place bids (paused tokens) the protocol will return a Set to it's default state or put it in "drawdown" which allows the underlying collateral to be redeemed. 
  - `RebalancingHelperLibrary` is used by all the rebalancing libraries as a helper.

The script for core contract deployments should:
  1. Deploy the ERC20Wrapper then link it to all the other contracts that require it
  2. Deploy the EIP712Library then link it to all the other contracts that require it
  3. Deploy the OrderLibrary then link it to all the other contracts that require it
  4. Deploy the ExchangeIssueLibrary then link it to all the other contracts that require it
  5. Deploy each Rebalancing Library then link it to the Rebalancing Helper library
  6. Link each Rebalancing Library (including helper) to the RebalancingSetTokenFactory
  7. Link each Rebalancing Library (including helper) to the RebalancingSetToken
  8. Deploy a SignatureValidator contract which decodes a signature from a hash to make sure it matches with a supplied address
  9. Deploy the Vault
  10. Deploy the TransferProxy
  11. Deploy the Core (with the transferproxy and vault's address as constructor arguments)
  12. Deploy the SetTokenFactory (with the address of core)
  13. Work out the correct values for the following constants:
    - minimumRebalanceInterval (how often the Set will rebalance eg. every 30 days)
    - minimumProposalPeriod (how long someone has to withdraw their collateral before it gets locked up)
    - minimumTimeToPivot (this is the time the price goes parabolic)
    - maximumTimeToPivot (if no bids are placed after the parabolic period has been entered something has gone wrong)
  14. RebalancingSetTokenFactory is deployed with the address of core, whitelist and the constants in step 13
  15. We now need the addresses for the following components
    - ZeroEx exchange address
    - ZeroEx transferproxy (in order to execute the trade)
    - ZeroEx token (if someone wants to fill an order and pay with the ZRX token)
    - KyberNetworkProxy (the supposed contract of kyber which does most things except some things)
  16. Deploy the ExchangeIssueModel with the address of core, transfer proxy and vault
  17. Deploy the IssuanceOrderModel with the address of core, tp, vault and signature validator (to validate signers from hashes)
  18. Deploy the Rebalancing Auction Module (contains logic once proposal period passed)
  19. Deploy the Rebalancing Token Issuance Module (a simple helper that abstracts the complexities of redeeming a rebalancing token)
  20. Deploy the Take Wallet wrapper (if you already have tokens, create your set directly rather than filling orders on exchanges) with core and transfer proxy
  21. Deploy the Kyber Network Wrapper with core, kyber proxy and transfer proxy
  22. If 0x v2, deploy ZeroExExchange Wrapper with core, exchange address, 0x transfer proxy, zero ex token address and set transfer proxy
  23. We need the address for wrapped ether, depending on the network you're on
  24. Deploy a Payable Exchange (a ETH forwarder contract that automatically creates a set by sending ETH). Requires core, tp, exchange issue module and wrapped ether address
  25. Depending on the network you're on you'll need to deploy the following price auction libraries:
    - Main: linear with DEFAULT_AUCTION_PRICE_DENOMINATOR and use starting price = true
    - Kovan: linear with DEFAULT_AUCTION_PRICE_DENOMINATOR and use starting price = true, constant with DEFAULT_AUCTION_PRICE_NUMERATOR and DEFAULT_AUCTION_PRICE_DENOMINATOR
    - Development: linear with DEFAULT_AUCTION_PRICE_DENOMINATOR and use starting price = true, constant with DEFAULT_AUCTION_PRICE_NUMERATOR and DEFAULT_AUCTION_PRICE_DENOMINATOR

*side note* the above script contains too much functionality and should be split up into linking/deploying libraries, deploying exchange/issuance modules and the core set protocol contracts.

## Authorization

Core contains the following modules:
  - CoreState
  - CoreModuleInteraction
  - CoreAccounting
  - CoreInternal
  - CoreFactory
  - CoreIssuance

Notes: 
- The most important module seems to be CoreState which has the types of variables you'd expect to be in global.
- To keep flexibility while security, some contracts contain a time lock to execute any actions on them.
- The vault and transfer proxy have quite a few contracts that allow the movement of funds

Execution of script follows the following steps:
  1. Set a time lock (time depends on network being deployed on) for the following contracts:
    - Core
    - TransferProxy
    - Vault
    - Whitelist
    - Issuance Order Module
  2. Add Authorised Addresses to Vault: core, exchange issue module, issuance order module, rebalance auction module, rebalance token issuance module
  3. Add Authorised Addresses to Transfer Proxy: core, taker wallet wrapper, exchange issue module, rebalance auction module, rebalance token issuance module
  4. Add the following Factories to core:
    - Set Token Factory: allows for creation of basic sets of tokens
    - Rebalancing Set Token Factory: allows for creation of rebalanced sets of tokens
  5. Add the following Modules to core:
    - Exchange issuance module
    - Issuance order module
    - Rebalance auction module
    - Rebalance token issuance module
  6. Add the following Exchange Wrappers to core:
    - ZeroEx (1)
    - Kyber (2)
    - TakerWallet (3)
  7. Add price libraries based on the network (outlined before)

*side note* we'll need a step that transfers ownership of ALL Contracts to a multi-sig to avoid deploying from an account where the private key is exposed in plain-text from truffle migrations

## BTCETH Rebalancing Set Token

This stage of the deployment is for the deployment of the BTCETH rebalancing manager. The role of a manager is to coordinate rebalancing a set on behalf of the holder. Since people want sets to be passive (not active), a manager is assigned on their behalf automatically for the release.

Constants needed:
  - WBTC_FULL_TOKEN_UNITS (10^8)
  - WETH_FULL_TOKEN_UNITS (10^18)
  - DEFAULT_REBALANCING_NATURAL_UNIT (10^10)
  - PRICE_PRECISION (100)
  - WBTC_PRICE (X)
  - WETH_PRICE (Y)
  - WBTC_MULTIPLIER (1)
  - WETH_MULTIPLIER (1)
  - REBALANCING_SET_USD_PRICE (100)
  - INITIAL_SET_NAME (BTCETH)
  - INITIAL_SET_SYMBOL (BTCETH)
  - REBALANCING_SET_NAME (BitEth Set)
  - REBALANCING_SET_SYMBOL (BTCETH)
  - proposalPeriod
  - rebalanceInterval
  - auctionTimeToPivot

Execution of the following steps occur:
  1. Deploy BTCETHRebalancingManager with
    - core address,
    - btc medianizer,
    - eth medianizer,
    - btc address
    - eth address
    - set token factory
    - auction library
    - auction to time pivot
    - btc multiplier
    - eth multiplier
  2. Call `create` on core with the following:
    - set token factory address
    - initial set components (btc, eth address)
    - initial set units
    - initial set natural units
    - initial set name
    - initial set symbol
    - initial set call data ***???***

