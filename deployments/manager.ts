import fs from 'fs-extra';

import { WhitelistStage } from './stages/1_whitelist';
import { CoreStage } from './stages/2_core';
import { LibrariesStage } from './stages/3_libraries';
import { ModulesStage } from './stages/4_modules';
import { RebalancingStage } from './stages/5_rebalancing';

import { asyncForEach } from '../utils/array';
import { DeploymentStageInterface } from '../types/deployment_stage_interface';

export class Manager {

  private name: string;
  private networkId: string;
  
  private stages: { [id: number]: DeploymentStageInterface } = {
    1: new WhitelistStage(),
    2: new CoreStage(),
    3: new LibrariesStage(),
    4: new ModulesStage(),
    5: new RebalancingStage()
  };

  constructor(name: string, networkId: string) {
    this.name = name;
    this.networkId = networkId;
  }

  async deploy() {
    let toDeploy = await this.getDeploymentStages();

    await asyncForEach(toDeploy, async (stage) => {
      console.log(`Stage: ${stage}/${Object.keys(this.stages).length}`);
      
      let currentStage = this.stages[stage]
      await currentStage.deploy(this.name, this.networkId);
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
      return output[this.name]['state']['last_deployment_stage']
    } catch {
      return 0;
    }
  }

}