var HDWalletProvider = require("truffle-hdwallet-provider");

var infura_apikey = process.env.INFURAKEY;
var mnemonic = process.env.MNEMONIC;

console.log("key", infura_apikey);
console.log("mnemonic", mnemonic);

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infura_apikey),
      network_id: 3,
      gas: 4000000,
    },
    coverage: {
      host: 'localhost',
      network_id: '*',
      port: 8555,
      gas: 0xfffffffffff,
      gasPrice: 0x01,
    },
  }
};
