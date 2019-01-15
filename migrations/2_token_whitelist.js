const WhiteList = artifacts.require("WhiteList")

const TOKEN_WHITELIST_MAINNET = [
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
  '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'  // WBTC
];
const TOKEN_WHITELIST_ROPSTEN = [];
const TOKEN_WHITELIST_KOVAN = [];
const TOKEN_WHITELIST_DEVELOPMENT = [];


module.exports = function(deployer, network, accounts) {
  if (network == "development" || network == "coverage") {
    console.log("Exiting - Network is development");
    return;
  }

  deployer.then(() => deployWhitelist(deployer, network));
};

async function deployWhitelist(deployer, network) {
  let initialTokenWhiteList;
    switch(network) {
      case 'kovan':
      case 'kovan-fork':
        initialTokenWhiteList = TOKEN_WHITELIST_KOVAN;
        break;

      case 'ropsten':
      case 'ropsten-fork':
        initialTokenWhiteList = TOKEN_WHITELIST_ROPSTEN;
        break;

      case 'development':
        initialTokenWhiteList = TOKEN_WHITELIST_DEVELOPMENT;
        break;
    }

    await deployer.deploy(WhiteList, initialTokenWhiteList);
}
