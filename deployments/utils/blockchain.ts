import fs from 'fs-extra';
import dependencies from '../dependencies';

require('dotenv').config({ path: './.env'})

const Web3 = require('web3');
const infuraApiKey: string = process.env.INFURAKEY;
const deploymentNetwork: string = process.env.TEST_DEPLOYMENT_NETWORK;
const OUTPUTS_PATH = './deployments/outputs.json'

async function returnOutputs(): Promise<any> {
  return await fs.readJson(OUTPUTS_PATH);
}

export async function writeContractToOutputs(networkName: string, name: string, value: string) {
  let outputs = fs.readJsonSync(OUTPUTS_PATH, { throws: false }) || {};
  outputs[networkName]['addresses'][name] = value;
  await fs.outputJSON(OUTPUTS_PATH, outputs);
}

export async function writeStateToOutputs(networkName: string, parameter: string, value: any) {
  let outputs = fs.readJsonSync(OUTPUTS_PATH, { throws: false }) || {};
  outputs[networkName]['state'][parameter] = value;
  await fs.outputJSON(OUTPUTS_PATH, outputs);
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

export let TX_DEFAULTS = {
  gas: 6700000, // 6.7M 
  gasPrice: 10000000 // 10 gWei 
}