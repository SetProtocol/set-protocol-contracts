import { DeploymentStageInterface } from '../../types/deployment_stage_interface';

export class CoreStage implements DeploymentStageInterface {

  async deploy(name: string, networkId: string): Promise<any> {
    console.log('Deploying core...');
  }

}