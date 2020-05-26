import { BuidlerConfig, usePlugin, internalTask } from "@nomiclabs/buidler/config";
import { TASK_COMPILE_RUN_COMPILER } from "@nomiclabs/buidler/builtin-tasks/task-names";
import { execSync } from "child_process";

usePlugin("@nomiclabs/buidler-truffle5");
usePlugin("@nomiclabs/buidler-web3");


//
// Register alias
//
const moduleAlias = require('module-alias');
moduleAlias.addAlias('@utils', __dirname + '/utils');

internalTask(TASK_COMPILE_RUN_COMPILER).setAction(async ({ input }, { config }, runSuper) => {
  let solcVersionOutput = "";
  try {
    solcVersionOutput = execSync(`solc --version`).toString();
  } catch (error) {
    // Probably failed because solc wasn't installed. We do nothing here.
  }

  console.log("Output", solcVersionOutput);

  if (!solcVersionOutput.includes(config.solc.version)) {
    console.log(`Using solcjs`);
    return runSuper();
  }

  console.log(`Using native solc`);
  const output = execSync(`solc --standard-json`, {
    input: JSON.stringify(input, undefined, 2),
  });

  return JSON.parse(output.toString(`utf8`));
});

const config: BuidlerConfig = {
  solc: {
    version: "0.5.7",
    optimizer: {
      enabled: true,
      runs: 200,
    },
    evmVersion: "byzantium",
  },
  paths: {
    artifacts: "./build/contracts",
    tests: "./transpiled/test/contracts",
  },
  networks: {
    buidlerevm: {
      blockGasLimit: 20000000,
    },
  },
};

export default config;