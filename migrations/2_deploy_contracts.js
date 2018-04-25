var SetRegistry = artifacts.require("./SetTokenRegistry.sol");

module.exports = function(deployer) {
  deployer.deploy(SetRegistry);
};
