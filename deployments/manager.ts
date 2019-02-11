const Web3 = require('web3');

import fs from 'fs-extra';

import { DeploymentStageInterface } from '../types/deployment_stage_interface';

import { CoreStage } from './stages/1_core';
import { LibrariesStage } from './stages/2_libraries';
import { ModulesStage } from './stages/3_modules';
import { RebalancingStage } from './stages/5_rebalancing';
import { AuthorizationStage } from './stages/4_authorization';

import { asyncForEach } from '../utils/array';
import { getWeb3Instance } from './utils/blockchain';

export class Manager {

  private networkName: string;
  private networkId: string;
  
  private stages: { [id: number]: DeploymentStageInterface } = {
    1: new CoreStage(),
    2: new LibrariesStage(),
    3: new ModulesStage(),
    4: new AuthorizationStage(),
    5: new RebalancingStage()
  };

  constructor(networkName: string, networkId: string) {
    this.networkName = networkName;
    this.networkId = networkId;
  }

  async deploy() {
    let toDeploy = await this.getDeploymentStages();
    let web3 = await getWeb3Instance();

    await asyncForEach(toDeploy, async (stage) => {
      console.log(`Stage: ${stage}/${Object.keys(this.stages).length}`);
      
      let currentStage = this.stages[stage]
      await currentStage.deploy(web3);
    });
  }

  async getDeploymentStages() {
    let lastStage = await this.getLastDeploymentStage();
    let stageKeys = Object.keys(this.stages);
    return stageKeys.filter((value) => parseInt(value) > lastStage).sort();
  }

  async getLastDeploymentStage(): Promise<number> {
    try {
      let output = await fs.readJson('./deployments/outputs.json')
      return output[this.networkName]['state']['last_deployment_stage']
    } catch {
      return 0;
    }
  }

}