require('dotenv').config();

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
      port: 8545,
      gas: 0xfffffffffff,
      gasPrice: 0x01,
    },
  },
  compilers: {
    solc: {
      version: "0.5.4",
      docker: true,
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
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