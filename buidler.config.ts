import { BuidlerConfig, usePlugin } from "@nomiclabs/buidler/config";

usePlugin("@nomiclabs/buidler-truffle5");
usePlugin("@nomiclabs/buidler-web3");

const config: BuidlerConfig = {
  solc: {
    version: "0.5.7",
	optimizer: {
	  enabled: true,
	  runs: 200
	},
    evmVersion: "byzantium"
  },
  paths: {
  	artifacts: './build/contracts',
  	tests: './transpiled/test/contracts'
  },
  networks: {
	  buidlerevm: {
	  	blockGasLimit: 20000000
	  }
  }
};

export default config; 