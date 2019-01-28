var HDWalletProvider = require("truffle-hdwallet-provider");
const NonceTrackerSubprovider = require("web3-provider-engine/subproviders/nonce-tracker")

var infura_apikey = process.env.INFURAKEY;
var mnemonic = process.env.MNEMONIC ||
  'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat';

console.log("key", infura_apikey);
console.log("mnemonic", mnemonic);

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 6712390,
      gasPrice: 1,
    },
    ropsten: {
      provider: () => {
          let wallet = new HDWalletProvider(mnemonic, "https://ropsten.infura.io/" + infura_apikey);
          let nonceTracker = new NonceTrackerSubprovider()
          wallet.engine._providers.unshift(nonceTracker)
          nonceTracker.setEngine(wallet.engine)
          return wallet
      },
      network_id: 3,
      gas: 6700000,
    },
    kovan: {
      provider: () => {
          let wallet = new HDWalletProvider(mnemonic, "https://kovan.infura.io/" + infura_apikey);
          let nonceTracker = new NonceTrackerSubprovider()
          wallet.engine._providers.unshift(nonceTracker)
          nonceTracker.setEngine(wallet.engine)
          return wallet
      },
      network_id: 42,
      gas: 6700000,
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
      version: "0.4.25",
      docker: true,
      settings: {
        optimizer: {
          enabled: true
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
