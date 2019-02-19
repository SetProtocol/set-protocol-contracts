import fs from 'fs-extra';
import dependencies from '../dependencies';

require('dotenv').config({ path: './.env'})

const OUTPUTS_PATH = './deployments/outputs.json'

const privateKey: string = process.env.DEPLOYMENT_PRIVATE_KEY;

const deploymentNetwork: string = process.env.DEPLOYMENT_NETWORK_NAME;
const deploymentNetworkId: number = parseInt(process.env.DEPLOYMENT_NETWORK_ID);

export async function returnOutputs(): Promise<any> {
  return fs.readJson(OUTPUTS_PATH, { throws: false }) || {};
}

export function getNetworkName(): string {
  return deploymentNetwork;
}

export function getNetworkId(): number {
  return deploymentNetworkId;
}

export function getPrivateKey(): string {
  return privateKey;
}

export async function findDependency(name: string) {
  let dependencyValue = dependencies[name][getNetworkId()];

  if (dependencyValue) {
    return dependencyValue;
  }

  return await getContractAddress(name)
}

export async function getContractAddress(name: string) {
  let outputs: any = await returnOutputs();

  if (!outputs[deploymentNetwork]) {
    return null;
  }

  return outputs[deploymentNetwork]['addresses'][name] || '';
}

export async function getContractCode(name: string, web3: any): Promise<string> {
  let vaultAddress = await getContractAddress(name);
  return await web3.eth.getCode(vaultAddress);
}

export async function writeContractToOutputs(networkName: string, name: string, value: string) {
  let outputs: any = await returnOutputs();

  if (!outputs[networkName]) {
    outputs[networkName] = {'addresses': {}, 'state': {}};
  }

  outputs[networkName]['addresses'][name] = value
  await fs.outputFile(OUTPUTS_PATH, JSON.stringify(outputs, null, 2));
}

export async function removeNetworkAddresses(name: string) {
  let outputs: any = await returnOutputs();
  outputs[name] = {'addresses': {}, 'state': {}};
  await fs.outputFile(OUTPUTS_PATH, JSON.stringify(outputs, null, 2));
}

export async function writeStateToOutputs(networkName: string, parameter: string, value: any) {
  let outputs: any = await returnOutputs();
  
  if (!outputs[networkName]) {
    outputs[networkName] = {'addresses': {}, 'state': {}};
  }

  outputs[networkName]['state'][parameter] = value;
  await fs.outputFile(OUTPUTS_PATH, JSON.stringify(outputs, null, 2));
}