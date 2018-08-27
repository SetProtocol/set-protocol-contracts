<p align="center"><img src="https://s3.amazonaws.com/set-core/img/assets/ts_logo%402x.png" width="64" /></p>

<p align="center">
  <a href="https://circleci.com/gh/SetProtocol/set-protocol-contracts/tree/master">
    <img src="https://img.shields.io/circleci/project/github/SetProtocol/set-protocol-contracts/master.svg" />
  </a>
  <a href='https://coveralls.io/github/SetProtocol/set-protocol-contracts'>
    <img src='https://coveralls.io/repos/github/SetProtocol/set-protocol-contracts/badge.svg?branch=master' alt='Coverage Status' />
  </a>
  <a href='https://github.com/SetProtocol/set-protocol-contracts/blob/master/LICENSE'>
    <img src='https://img.shields.io/github/license/SetProtocol/set-protocol-contracts.svg' alt='License' />
  </a>
  <a href='https://www.npmjs.com/package/set-protocol-contracts'>
    <img src='https://img.shields.io/npm/v/set-protocol-contracts.svg' alt='NPM' />
  </a>
</p>

# Set Protocol: A Specification for Token Abstraction

## Contracts
[Set Protocol](https://setprotocol.com/) is a specification for abstraction of higher order tokens on the ethereum blockchain written in the Solidity programming language. We use [Truffle](https://github.com/trufflesuite/truffle) as a development environment for compiling, testing, and deploying our contracts. See the [whitepaper](https://whitepaper.setprotocol.com) for more details about Set Protocol.

## Contributing
We are currently in the process of upgrading our smart contracts to extend [functionality](https://medium.com/set-protocol/set-protocol-looking-ahead-8c15837cb9f4). Along with our developer tools, users will be able to create, issue, redeem, and rebalance Set Tokens. Check back for updates as we roll out a revised whitepaper, deploy new contracts to test net, and publish our developer library: `setprotocol.js`. If you are interested in developing on top of Set Protocol, please ping us on [Telegram](https://t.me/joinchat/Fx8D6wyprLUlM1jMVnaRdg) for early access.

## Legacy
For legacy users, our audited V1 contracts which can be found [here](https://github.com/SetProtocol/set-protocol-contracts/releases/tag/0.2.5).


## Testing
1. Run yarn install
```
yarn install
```

2. Run an ethereum chain on a separate terminal window
```
yarn chain
```

3. Run unit tests
```
yarn test
```
