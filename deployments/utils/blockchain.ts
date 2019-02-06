import fs from 'fs-extra';
import dependencies from '../dependencies';

require('dotenv').config({ path: './.env'})

const Web3 = require('web3');
const infuraApiKey: string = process.env.INFURAKEY;
const deploymentNetwork: string = process.env.TEST_DEPLOYMENT_NETWORK;

async function returnOutputs(): Promise<any> {
  return await fs.readJson('./deployments/outputs.json');
}

export function getNetworkName(): string {
  return deploymentNetwork;
}

export async function getNetworkId(): Promise<number> {
  let outputs: any = await returnOutputs();
  return outputs[deploymentNetwork].state.network_id;
}

export async function getWeb3Instance(): Promise<any> {
  let outputs: any = await returnOutputs();
  let networkId: number = outputs[deploymentNetwork].state.network_id;
  let web3 = new Web3(`${dependencies.INFURA_SUBDOMAIN[networkId]}/v3/${infuraApiKey}`);
  return web3;
}

export async function getContractAddress(name: string) {
  let outputs: any = await returnOutputs();
  return outputs[deploymentNetwork]['addresses'][name] || '';
}

export async function getContractCode(name: string, web3: any): Promise<string> {
  let vaultAddress = await getContractAddress(name);
  return await web3.eth.getCode(vaultAddress);
}