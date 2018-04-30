const CONSTANTS = require("./migration_constants");

const DummyToken = artifacts.require("./DummyToken.sol");
const SetToken = artifacts.require("./SetToken.sol");

module.exports = function(deployer, network, accounts) {
  const { STABLE_SET } = CONSTANTS;
  const { components, naturalUnit, units } = STABLE_SET;
  const [OWNER] = accounts;

  const trueUSD = components[0];
  const Dai = components[1]; 

  const componentAddresses = [];

  deployer.then(async () => {
    const trueUSDInstance = await DummyToken.new(
      trueUSD.name,
      trueUSD.symbol,
      trueUSD.decimals,
      trueUSD.supply,
      { from: OWNER },
    );

    console.log("Successfully deployed " + trueUSD.name + " at " + trueUSDInstance.address);

    componentAddresses.push(trueUSDInstance.address);

    const daiInstance = await DummyToken.new(
      Dai.name,
      Dai.symbol,
      Dai.decimals,
      Dai.supply,
      { from: OWNER },
    );

    console.log("Successfully deployed " + Dai.name + " at " + daiInstance.address);

    componentAddresses.push(daiInstance.address);

  
    const setTokenInstance = await SetToken.new(componentAddresses, units, naturalUnit);

    console.log("Successfully deployed Set at " + setTokenInstance.address);
  });
};
