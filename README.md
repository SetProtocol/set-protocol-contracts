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

# {Set} Protocol: A Specification for Token Abstraction
```
Author: Felix Feng <felix2feng@gmail.com>
```

## Welcome to {Set}
{Set} is a specification for abstract or higher order tokens on the ethereum blockchain - written in the Solidity programming language. This repo has the `SetToken` smart contract with a suite of unit tests for the {Set} token specification. The contracts are held inside the `contracts` directory.

See the {Set} [whitepaper](https://whitepaper.setprotocol.com) for more about {Set}.

PLEASE NOTE that we are currently working on V2 of our smart contracts along with a new white paper (to be released shortly) to extend functionality. Details for our V1 contracts which have been audited and deployed to MainNet can be found [here](https://github.com/SetProtocol/set-protocol-contracts/releases/tag/0.2.5). If you have any questions or would like to follow along with our development, please ping us on [Telegram](https://t.me/joinchat/Fx8D6wyprLUlM1jMVnaRdg).


## Install and run the unit tests

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
yarn run test
```

## To develop using 0x V2 dependencies

Clone the 0x-monorepo locally, checkout to the v2-prototype branch, install dependencies and build packages.

```
git clone git@github.com:0xProject/0x-monorepo.git
cd 0x-monorepo
git checkout v2-prototype
yarn install
yarn build
```

Once built, run yarn link in the following directories inside the 0x-monorepo under packages:

```
cd packages
cd types && yarn link && cd ../
cd order-utils && yarn link && cd ../
cd abi-gen && yarn link && cd ../
cd base-contract && yarn link && cd ../
cd web3-wrapper && yarn link && cd ../
```

In this project, install dependencies then link the projects the 0x-monorepo packages from the previous step:

```
yarn install
yarn link "@0xproject/types" "@0xproject/order-utils" "@0xproject/abi-gen" "@0xproject/base-contract" "@0xproject/web3-wrapper" "@0xproject/order-utils"
```

Then, in a separate terminal, run the following command
```
yarn chain
```

