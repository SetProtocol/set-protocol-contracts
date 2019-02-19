const Web3 = require('web3');

import fs from 'fs-extra';

import { DeploymentStageInterface } from '../types/deployment_stage_interface';

import { LibrariesStage } from './stages/1_libraries';
import { CoreStage } from './stages/2_core';
import { ModulesStage } from './stages/3_modules';
import { RebalancingStage } from './stages/5_rebalancing';
import { AuthorizationStage } from './stages/4_authorization';

import { asyncForEach } from '../utils/array';
import { getNetworkName, getNetworkId, returnOutputs } from './utils/output-helper';
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

  async getLastDeploymentStage(): Promise<number> {
    try {
      let output = await returnOutputs();
      return output[this._networkName]['state']['last_deployment_stage'] || 0;
    } catch {
      return 0;
    }
  }

}