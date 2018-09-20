var HDWalletProvider = require("truffle-hdwallet-provider");

var infura_apikey = process.env.INFURAKEY;
var mnemonic = process.env.MNEMONIC;

console.log("key", infura_apikey);
console.log("mnemonic", mnemonic);

module.exports = {
  solc: {
    optimizer: {
      enabled: true
    }
  },
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 6712390,
      gasPrice: 1,
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/" + infura_apikey),
      network_id: 3,
      gas: 4612388,
    },
    kovan: {
      host: "127.0.0.1",
      port: 8545,
      network_id: 42,
      gas: 4700000,
    },
    coverage: {
      host: 'localhost',
      network_id: '*',
      port: 8555,
      gas: 0xfffffffffff,
      gasPrice: 0x01,
    },
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
