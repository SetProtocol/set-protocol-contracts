<p align="center"><img src="https://s3-us-west-1.amazonaws.com/set-protocol/set-logo.svg" width="64" /></p>

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

More details about our contract architecture and deployed contracts can also be found in our [wiki](https://docs.setprotocol.com/contracts).

## Contributing
We highly encourage participation from the community to help shape the development of Set. If you are interested in developing on top of Set Protocol or have any questions, please ping us on [Telegram](https://t.me/joinchat/Fx8D6wyprLUlM1jMVnaRdg).

## Legacy
For legacy users, our audited V1 contracts which can be found [here](https://github.com/SetProtocol/set-protocol-contracts/releases/tag/0.2.5).




## Testing
0. Docker Set up
Firstly, you need to install Docker. The easiest way is to follow the Instructions on https://docs.docker.com/install/#supported-platforms

You need to pull the docker image that you want to use by using the following command:

```
docker pull ethereum/solc:0.5.7
```

If you wish not to set up docker, you can turn off the `docker: true` flag in truffle.js

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
