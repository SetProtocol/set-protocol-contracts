const CONSTANTS = require("./migration_constants");
const _ = require("lodash");

const DummyToken = artifacts.require("./DummyToken.sol");
const SetToken = artifacts.require("./SetToken.sol");
const SetTokenFactory = artifacts.require("./SetTokenFactory.sol");
const SetTokenRegistry = artifacts.require("./SetTokenRegistry.sol");

module.exports = function(deployer, network, accounts) {
  // const { SETS } = CONSTANTS;
  // const [OWNER] = accounts;
  // console.log("Owner is ", OWNER);
  // console.log("Beginning deployments...");

  // deployer.then(async () => {
  //   await deployer.deploy(SetTokenFactory);
  //   await deployer.deploy(SetTokenRegistry, SetTokenFactory.address);

  //   for (let i = 0; i < SETS.length; i++) {
  //     const { components, naturalUnit, units, setName, setSymbol } = SETS[i];

  //     const componentAddresses = [];

  //     for (let j = 0; j < components.length; j++) {
  //       const currentComponent = components[j];
  //       console.log(`Deploying ${currentComponent.name}....`);
  //       await deployer.deploy(
  //         DummyToken,
  //         currentComponent.name,
  //         currentComponent.symbol,
  //         currentComponent.decimals,
  //         currentComponent.supply,
  //         { from: OWNER },
  //       );

  //       console.log("Successfully deployed " + currentComponent.name + " at " + DummyToken.address);
  //       componentAddresses.push(DummyToken.address);
  //     }

  //     const setRegistryInstance = await SetTokenRegistry.deployed();
  //     const txnReceipt = await setRegistryInstance.create(
  //       componentAddresses,
  //       units,
  //       naturalUnit,
  //       setName,
  //       setSymbol
  //     );

  //     console.log(`Successfully deployed ${setName} Set at ${txnReceipt.logs[0].args.setAddress}`);
  //   }
  // });
};
