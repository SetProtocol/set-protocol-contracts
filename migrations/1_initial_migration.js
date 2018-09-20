var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer, network, accounts) {
  if (network == "development") {
    console.log("Exiting - Network is development");
    return;
  }
  
  deployer.deploy(Migrations);
};