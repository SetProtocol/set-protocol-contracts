import fs from 'fs-extra';

import { DeploymentStageInterface } from '../types/deployment_stage_interface';

import { CoreStage } from './stages/1_core';
import { LibrariesStage } from './stages/2_libraries';
import { ModulesStage } from './stages/3_modules';
import { RebalancingStage } from './stages/5_rebalancing';
import { AuthorizationStage } from './stages/4_authorization';

import { asyncForEach } from '../utils/array';

export class Manager {

  private name: string;
  private networkId: string;
  
  private stages: { [id: number]: DeploymentStageInterface } = {
    1: new CoreStage(),
    2: new LibrariesStage(),
    3: new ModulesStage(),
    4: new AuthorizationStage(),
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