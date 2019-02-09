const WhiteList = artifacts.require("WhiteList");
const WbtcMock = artifacts.require("StandardTokenMock");
const WethMock = artifacts.require("WethMock");

const TOKEN_WHITELIST_MAINNET = [
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
  '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'  // WBTC
];
const TOKEN_WHITELIST_ROPSTEN = [];
const TOKEN_WHITELIST_KOVAN = [
  '0x595f8DaB94b9c718cbf5c693cD539Fd00b286D3d', // WBTC
  '0x4C5E0CAbAA6B376D565cF2be865a03F43E361770', // WETH
];


module.exports = function(deployer, network, accounts) {
  if (network == "development" || network == "coverage") {
    console.log("Exiting - Network is development");
    return;
  }

  deployer.then(() => deployWhitelist(deployer, network));
};

async function deployWhitelist(deployer, network, accounts) {
  let initialTokenWhiteList;
    switch(network) {
      case 'main':
      case 'main-fork':
        initialTokenWhiteList = TOKEN_WHITELIST_MAINNET;
        break
      case 'kovan':
      case 'kovan-fork':
        initialTokenWhiteList = TOKEN_WHITELIST_KOVAN;
        break;

      case 'ropsten':
      case 'ropsten-fork':
        initialTokenWhiteList = TOKEN_WHITELIST_ROPSTEN;
        break;

      case 'development':
        const initialAccount = accounts[0];
        const initialBalance = 100000;
        await deployer.deploy(
          WbtcMock,
          initialAccount,
          initialBalance,
          "WBTC",
          "WBTC",
          8
        );

        await deployer.deploy(
          WethMock,
          initialAccount,
          initialBalance,
        );

        initialTokenWhiteList = [WbtcMock.address, WethMock.address];
        break;
    }
    
    await deployer.deploy(WhiteList, initialTokenWhiteList);
}
