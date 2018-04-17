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
