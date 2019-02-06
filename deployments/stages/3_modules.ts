import { DeploymentStageInterface } from '../../types/deployment_stage_interface';

export class ModulesStage implements DeploymentStageInterface {

  async deploy(name: string, networkId: string): Promise<any> {
    console.log('Deploying modules...');
  }

}