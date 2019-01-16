const Core = artifacts.require("Core");
const LinearAuctionPriceCurve = artifacts.require('LinearAuctionPriceCurve');
const BTCETHRebalancingManager = artifacts.require('BTCETHRebalancingManager');
const SetTokenFactory = artifacts.require("SetTokenFactory");

const ONE_DAY_IN_SECONDS = 86400;

const WBTC_MEDIANIZER_ADDRESS = '';
const WETH_MEDIANIZER_ADDRESS = '';
const WBTC_ADDRESS = '';
const WETH_ADDRESS = '';

module.exports = function(deployer, network, accounts) {
  if (network == "development" || network == "coverage") {
    console.log("Exiting - Network is development");
    return;
  }

  deployer.then(() => deploySupplmentContracts(deployer, network));
};

async function deploySupplmentContracts(deployer, network) {
  // Deploy BTCETHRebalancingManager
  await deployer.deploy(
    BTCETHRebalancingManager,
    Core.address,
    WBTC_MEDIANIZER_ADDRESS,
    WETH_MEDIANIZER_ADDRESS,
    WBTC_ADDRESS,
    WETH_ADDRESS,
    SetTokenFactory.address,
    LinearAuctionPriceCurve.address,
    ONE_DAY_IN_SECONDS
  );
}