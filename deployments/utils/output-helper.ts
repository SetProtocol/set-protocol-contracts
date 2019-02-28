import fs from 'fs-extra';
import dependencies from '../dependencies';

require('dotenv').config({ path: './.env'});

const OUTPUTS_PATH = './deployments/outputs.json';

const privateKey: string = process.env.DEPLOYMENT_PRIVATE_KEY;

const deploymentConstants: string = process.env.DEPLOYMENT_CONSTANT;
const deploymentNetworkId: number = parseInt(process.env.DEPLOYMENT_NETWORK_ID);

export function getDeploymentNetworkKey(): string {
  return `${deploymentNetworkId}-${deploymentConstants}`;
}

export async function returnOutputs(): Promise<any> {
  return fs.readJson(OUTPUTS_PATH, { throws: false }) || {};
}

export function getNetworkConstant(): string {
  return deploymentConstants;
}

export function getNetworkId(): number {
  return deploymentNetworkId;
}

export function getPrivateKey(): string {
  return privateKey;
}

export async function sortOutputs() {
  const unorderedOutputs = await returnOutputs();
  const orderedOutputs = {};

  Object.keys(unorderedOutputs).sort().forEach(function(key) {
    orderedOutputs[key] = unorderedOutputs[key];
  });

  await fs.outputFile(OUTPUTS_PATH, JSON.stringify(orderedOutputs, undefined, 2));
}

export async function findDependency(name: string) {
  const dependencyValue = dependencies[name][getNetworkId()];

  if (dependencyValue) {
    return dependencyValue;
  }

  return await getContractAddress(name);
}

export async function getContractAddress(name: string) {
  const outputs: any = await returnOutputs();
  const deploymentKey = getDeploymentNetworkKey();

  if (!outputs[deploymentKey]) {
    return undefined;
  }

  return outputs[deploymentKey]['addresses'][name] || '';
}

export async function getContractCode(name: string, web3: any): Promise<string> {
  const vaultAddress = await getContractAddress(name);
  return await web3.eth.getCode(vaultAddress);
}

export async function writeContractToOutputs(name: string, value: string) {
  const outputs: any = await returnOutputs();
  const deploymentKey = getDeploymentNetworkKey();

  if (!outputs[deploymentKey]) {
    outputs[deploymentKey] = returnEmptyNetworkValue();
  }

  outputs[deploymentKey]['addresses'][name] = value;
  await fs.outputFile(OUTPUTS_PATH, JSON.stringify(outputs, undefined, 2));
}

export async function removeNetwork(name: string) {
  const outputs: any = await returnOutputs();
  outputs[name] = undefined;
  await fs.outputFile(OUTPUTS_PATH, JSON.stringify(outputs, undefined, 2));
}

export async function writeStateToOutputs(parameter: string, value: any) {
  const outputs: any = await returnOutputs();
  const deploymentKey = getDeploymentNetworkKey();

  if (!outputs[deploymentKey]) {
    outputs[deploymentKey] = returnEmptyNetworkValue();
  }

  outputs[deploymentKey]['state'][parameter] = value;
  await fs.outputFile(OUTPUTS_PATH, JSON.stringify(outputs, undefined, 2));
}

function returnEmptyNetworkValue(): any {
  const networkName = dependencies.HUMAN_FRIENDLY_NAMES[deploymentNetworkId];
  const humanFriendlyName = `${networkName}-${deploymentConstants}`;
  return {
    'human_friendly_name': humanFriendlyName,
    'addresses': {},
    'state': {
      'network_id': deploymentNetworkId,
    },
  };
}

export async function getLastDeploymentStage(): Promise<number> {
  try {
    const output = await returnOutputs();
    const networkKey = await getDeploymentNetworkKey();

    return output[networkKey]['state']['last_deployment_stage'] || 0;
  } catch {
    return 0;
  }
}

export async function isCorrectNetworkId(): Promise<boolean> {
  try {
    const output = await returnOutputs();
    const networkKey = await getDeploymentNetworkKey();
    const existingId = output[networkKey]['state']['network_id'];

    if (!existingId) {
      await writeStateToOutputs('network_id', deploymentNetworkId);
      return true;
    }

    return existingId == deploymentNetworkId;
  } catch {
    return true;
  }
}