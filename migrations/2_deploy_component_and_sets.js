const CONSTANTS = require("./migration_constants");
const _ = require("lodash");

const DummyToken = artifacts.require("./DummyToken.sol");
const SetToken = artifacts.require("./SetToken.sol");

module.exports = function(deployer, network, accounts) {
  const { SETS } = CONSTANTS;
  const [STABLE_SET] = SETS;
  const { components, naturalUnit, units, setName } = STABLE_SET;
  const [OWNER] = accounts;

  const componentAddresses = [];

  console.log("Beginning deployments...");

  deployer.then(async () => {

    const componentPromises = _.map(components, (component) => {
      console.log(`Deploying ${component.name}....`);
      return DummyToken.new(
        component.name,
        component.symbol,
        component.decimals,
        component.supply,
        { from: OWNER },
      )
    });

    const componentInstances = await Promise.all(componentPromises);

    _.each(componentInstances, (instance, index) => {
      console.log("Successfully deployed " + components[index].name + " at " + instance.address);
      componentAddresses.push(instance.address);
    });
  
    const setTokenInstance = await SetToken.new(componentAddresses, units, naturalUnit);

    console.log(`Successfully deployed ${setName} Set at ${setTokenInstance.address}`);
  });
};
