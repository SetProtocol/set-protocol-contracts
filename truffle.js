require('dotenv').config();

//
// Register alias
//
const moduleAlias = require('module-alias')
moduleAlias.addAlias('@utils', __dirname + '/transpiled/utils')

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 7512390,
      gasPrice: 1,
    },
    coverage: {
      host: 'localhost',
      network_id: '*',
      port: 8555,
      gas: 0xfffffffffff,
      gasPrice: 0x01,
    },
  },
  compilers: {
    solc: {
      version: "0.5.7",
      docker: true,
      parser: "solcjs",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "byzantium"
      }
    }
  }
  // mocha: {
  //   reporter: 'eth-gas-reporter',
  //   reporterOptions : {
  //     currency: 'USD',
  //     gasPrice: 5,
  //     onlyCalledMethods: true
  //   }
  // }
};