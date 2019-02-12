const WhiteList = artifacts.require("WhiteList");
const WbtcMock = artifacts.require("StandardTokenMock");
const WethMock = artifacts.require("WethMock");

const dependencies = require('./dependencies');
const networkConstants = require('./network-constants');

module.exports = function(deployer, network, accounts) {
  if (network == "development" || network == "coverage") {
    console.log("Exiting - Network is development");
    return;
  }

  deployer.then(() => deployWhitelist(deployer, network));
};

async function deployWhitelist(deployer, network, accounts) {
  let initialTokenWhiteList

  if (network == 'development') {
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
    } else {
      let networkId = networkConstants[network];
      initialTokenWhiteList = [
        dependencies.WETH[networkId],
        dependencies.WBTC[networkId],
      ];
    }
    
    await deployer.deploy(WhiteList, initialTokenWhiteList);
}
