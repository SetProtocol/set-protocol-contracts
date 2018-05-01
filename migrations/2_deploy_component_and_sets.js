const CONSTANTS = require("./migration_constants");
const _ = require("lodash");

const DummyToken = artifacts.require("./DummyToken.sol");
const SetToken = artifacts.require("./SetToken.sol");

module.exports = function(deployer, network, accounts) {
  const { SETS } = CONSTANTS;
  const [OWNER] = accounts;

  console.log("Beginning deployments...");

  deployer.then(async () => {
    const setDeploymentPromises = _.map(SETS, (set) => {
      return deploySet(set, OWNER);
    });
    
    await Promise.all(setDeploymentPromises);
  });
};

async function deploySet(set, OWNER) {
  const { components, naturalUnit, units, setName } = set;

  const componentAddresses = [];

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
}