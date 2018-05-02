const CONSTANTS = require("./migration_constants");
const _ = require("lodash");

const DummyToken = artifacts.require("./DummyToken.sol");
const SetToken = artifacts.require("./SetToken.sol");

module.exports = function(deployer, network, accounts) {
  const { SETS } = CONSTANTS;
  const [OWNER] = accounts;
  console.log("Owner is ", OWNER);
  console.log("Beginning deployments...");

  deployer.then(async () => {
    for (let i = 0; i < SETS.length; i++) {
      const { components, naturalUnit, units, setName } = SETS[i];

      const componentAddresses = [];

      for (let j = 0; j < components.length; j++) {
        const currentComponent = components[j];
        console.log(`Deploying ${currentComponent.name}....`);
        const componentInstance = await DummyToken.new(
          currentComponent.name,
          currentComponent.symbol,
          currentComponent.decimals,
          currentComponent.supply,
          { from: OWNER },
        );

        console.log("Successfully deployed " + currentComponent.name + " at " + componentInstance.address);
        componentAddresses.push(componentInstance.address);
      }

      const setTokenInstance = await SetToken.new(componentAddresses, units, naturalUnit);

      console.log(`Successfully deployed ${setName} Set at ${setTokenInstance.address}`);  
    }
  });
};
