require('dotenv').config();

var HDWalletProvider = require("truffle-hdwallet-provider");
var HDWalletProviderPrivateKey = require("truffle-hdwallet-provider-privkey");

const NonceTrackerSubprovider = require("web3-provider-engine/subproviders/nonce-tracker")

var infura_apikey = process.env.INFURAKEY;
var private_key = process.env.PRIVATE_KEY;

var mnemonic = process.env.MNEMONIC ||
  'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat';

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 7512390,
      gasPrice: 1,
    },
    main: {
      provider: () => returnWallet("https://mainnet.infura.io/" + infura_apikey),
      network_id: 1,
      gas: 7500000,
      gasPrice: 3000000000
    },
    ropsten: {
      provider: () => returnWallet("https://ropsten.infura.io/" + infura_apikey),
      network_id: 3,
      gas: 7500000,
    },
    kovan: {
      provider: () => returnWallet("https://kovan.infura.io/" + infura_apikey),
      network_id: 42,
      gas: 6700000,
      gasPrice: 5000000000,
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

function returnWallet(url) {
  let wallet;
  if (private_key) {
    wallet = new HDWalletProviderPrivateKey([private_key], url);
  } else {
    wallet = new HDWalletProvider(mnemonic, url);
  }

  let nonceTracker = new NonceTrackerSubprovider()
  wallet.engine._providers.unshift(nonceTracker)
  nonceTracker.setEngine(wallet.engine)

  return wallet;
}
