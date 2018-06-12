<p align="center"><img src="https://s3.amazonaws.com/set-core/img/assets/ts_logo%402x.png" width="64" /></p>

<p align="center">
  <a href="https://circleci.com/gh/SetProtocol/set-protocol-contracts/tree/master">
    <img src="https://img.shields.io/circleci/project/github/SetProtocol/set-protocol-contracts.svg" />
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

# {Set} Protocol: A Specification for Token Abstraction
```
Author: Felix Feng <felix2feng@gmail.com>
```

## Welcome to {Set}
{Set} is a specification for abstract or higher order tokens on the ethereum blockchain - written in the Solidity programming language. This repo has the `SetToken` smart contract with a suite of unit tests for the {Set} token specification. The contracts are held inside the `contracts` directory.

See the {Set} [whitepaper](https://whitepaper.setprotocol.com) for more about {Set}.

PLEASE NOTE that these contracts have not been extensively audited yet and are not deployed to mainnet. Until contracts have been thoroughly vetted and fully productionized, we do not recommend using for valuable transactions yet.


## Install and run the unit tests

1. Run yarn install
```
yarn install
```

2. Install [truffle](http://truffleframework.com/) and [test-rpc](https://github.com/ethereumjs/testrpc) globally
```
yarn global add ethereumjs-testrpc
yarn global add truffle
```

3. Run unit tests
```
yarn run test
```
