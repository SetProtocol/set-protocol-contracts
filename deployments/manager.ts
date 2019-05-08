import { DeploymentStageInterface } from '../types/deployment_stage_interface';

import { LibrariesStage } from './stages/1_libraries';
import { CoreStage } from './stages/2_core';
import { ModulesStage } from './stages/3_modules';
import { RebalancingStage } from './stages/5_rebalancing';
import { AuthorizationStage } from './stages/4_authorization';

import { asyncForEach } from '../utils/array';
import { getWeb3Instance, getInfuraKey } from './utils/blockchain';

import {
  getNetworkConstant,
  getNetworkId,
  writeStateToOutputs,
  removeNetwork,
  getContractCode,
  getPrivateKey,
  isCorrectNetworkId,
  getLastDeploymentStage,
  sortOutputs
} from './utils/output-helper';

export class Manager {

  private _networkConstant: string;
  private _networkId: number;

  private _stages: { [id: number]: DeploymentStageInterface } = {
    1: new LibrariesStage(),
    2: new CoreStage(),
    3: new ModulesStage(),
    4: new AuthorizationStage(),
    // 5: new RebalancingStage(),
  };

  constructor() {
    this._networkConstant = getNetworkConstant();
    this._networkId = getNetworkId();
  }

  async deploy() {
    await this.checkInputParameters() 

    let toDeploy = await this.getDeploymentStages();
    let web3 = await getWeb3Instance();

    await asyncForEach(toDeploy, async stage => {
      console.log(`Stage: ${stage}/${Object.keys(this._stages).length}`);

      const currentStage = this._stages[stage];

      await currentStage.deploy(web3);
      await writeStateToOutputs('last_deployment_stage', parseInt(stage));
    });

    await sortOutputs();
  }

  async checkInputParameters() {
    await this.configureIfDevelopment();

    const correctNetworkId = await isCorrectNetworkId();
    const infuraKey = getInfuraKey() || '';
    const privateKey = getPrivateKey() || '';
    const networkId = getNetworkId() || 0;
    const networkConstant = getNetworkConstant() || '';
    
    if (!privateKey) {
      throw Error('.env variable DEPLOYMENT_PRIVATE_KEY is missing');
    }

    if (!networkId) {
      throw Error('.env variable DEPLOYMENT_NETWORK_ID is missing');
    }

    if (!networkConstant) {
      throw Error('.env variable DEPLOYMENT_CONSTANT is missing');
    }

    if (!correctNetworkId) {
      throw Error('.env variable DEPLOYMENT_NETWORK_ID does not match `network_id` in outputs.json');
    }

    if (privateKey.substring(0,2) != '0x') {
      throw Error('Please make sure the private key is appended with 0x');
    }

    if ((!infuraKey || infuraKey.length == 0) && (networkId != 50)) {
      throw Error('.env variable INFURA_KEY is missing');
    } 
  }

 async getDeploymentStages() {
    const lastStage = await getLastDeploymentStage();
    const stageKeys = Object.keys(this._stages);
    return stageKeys.filter(value => parseInt(value) > lastStage).sort();
  }

  async configureIfDevelopment() {
    try {
      const web3 = await getWeb3Instance();
      const code = await getContractCode('Core', web3);
      if (this._networkId == 50 && code.length <= 3) {
        console.log(`\n*** Clearing all addresses for ${this._networkConstant} ***\n`);
        await removeNetwork(this._networkConstant);
      }
    } catch (error) {
      console.log('*** No addresses to wipe *** ');
    }
  }
}
