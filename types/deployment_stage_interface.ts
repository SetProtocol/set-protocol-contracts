export interface DeploymentStageInterface {
  deploy(name: string, networkId: string): Promise<any>;
}