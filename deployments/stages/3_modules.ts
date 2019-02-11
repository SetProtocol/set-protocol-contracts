import { DeploymentStageInterface } from '../../types/deployment_stage_interface';

export class ModulesStage implements DeploymentStageInterface {

  async deploy(web3: any): Promise<any> {
    console.log('Deploying modules...');
  }

}