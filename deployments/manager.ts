const Web3 = require('web3');

import fs from 'fs-extra';

import { DeploymentStageInterface } from '../types/deployment_stage_interface';

import { LibrariesStage } from './stages/1_libraries';
import { CoreStage } from './stages/2_core';
import { ModulesStage } from './stages/3_modules';
import { RebalancingStage } from './stages/5_rebalancing';
import { AuthorizationStage } from './stages/4_authorization';

import { asyncForEach } from '../utils/array';
import { getNetworkName, getNetworkId, returnOutputs, writeStateToOutputs, getContractAddress, removeNetwork, getContractCode } from './utils/output-helper';
import { getWeb3Instance } from './utils/blockchain';

export class Manager {

  private _networkName: string;
  private _networkId: number;

  private _stages: { [id: number]: DeploymentStageInterface } = {
    1: new LibrariesStage(),
    2: new CoreStage(),
    3: new ModulesStage(),
    4: new AuthorizationStage(),
    5: new RebalancingStage()
  };

  constructor() {
    this._networkName = getNetworkName();
    this._networkId = getNetworkId();
  }

  async deploy() {
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
    await this.configureIfDevelopment();

>>>>>>> Improve UX of deployment script
    let toDeploy = await this.getDeploymentStages();
    let web3 = await getWeb3Instance();
    let correctNetworkId = await this.isCorrectNetworkId();

    if (!correctNetworkId) {
      throw Error('ENV variable `DEPLOYMENT_NETWORK_ID` does not match `network_id` in outputs.json');
    }

    await asyncForEach(toDeploy, async (stage) => {
      console.log(`Stage: ${stage}/${Object.keys(this._stages).length}`);

      let currentStage = this._stages[stage]

      await currentStage.deploy(web3);
      await writeStateToOutputs(this._networkName, 'last_deployment_stage', stage);
    });
  }

  async getDeploymentStages() {
    let lastStage = await this.getLastDeploymentStage();
    let stageKeys = Object.keys(this._stages);
    return stageKeys.filter((value) => parseInt(value) > lastStage).sort();
  }
>>>>>>> Update names + enforce check on network id

  async getLastDeploymentStage(): Promise<number> {
    try {
      const output = await returnOutputs();
      return output[this._networkName]['state']['last_deployment_stage'] || 0;
    } catch {
      return 0;
    }
  }

  async isCorrectNetworkId(): Promise<boolean> {
    try {
      const output = await returnOutputs();
      const existingId = output[this._networkName]['state']['network_id'];
      if (!existingId) {
        await writeStateToOutputs(this._networkName, 'network_id', this._networkId);
        return true;
      }
      return existingId == this._networkId;
    } catch {
      return true;
    }
  }

  async configureIfDevelopment() {
    try {
      const web3 = await getWeb3Instance();
      const code = await getContractCode('Core', web3);
      if (this._networkId == 50 && code.length <= 3) {
        console.log(`\n*** Clearing all addresses for ${this._networkName} ***\n`);
        await removeNetwork(this._networkName);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
