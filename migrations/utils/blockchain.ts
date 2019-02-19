import fs from 'fs-extra';
import dependencies from '../../migrations/dependencies';

require('dotenv').config({ path: './.env'})

const Web3 = require('web3');
const infuraApiKey: string = process.env.INFURAKEY;
const privateKey: string = process.env.PRIVATE_KEY;

const deploymentNetwork: string = process.env.TEST_DEPLOYMENT_NETWORK_NAME;
const deploymentNetworkId: number = parseInt(process.env.TEST_DEPLOYMENT_NETWORK_ID);

const OUTPUTS_PATH = './deployments/outputs.json'

export async function returnOutputs(): Promise<any> {
  return fs.readJson(OUTPUTS_PATH, { throws: false }) || {};
}

export async function writeContractToOutputs(networkName: string, name: string, value: string) {
  let outputs: any = await returnOutputs();

  if (!outputs[networkName]) {
    outputs[networkName] = {'addresses': {}, 'state': {}};
  }

  outputs[networkName]['addresses'][name] = value
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

  let outputs: any = await returnOutputs();
  return await getContractAddress(name)
}

export async function getWeb3Instance(): Promise<any> {
  let networkId: number = getNetworkId();
  let infuraDomain = dependencies.INFURA_SUBDOMAIN[networkId];
  
  if (infuraDomain) {
    return new Web3(`${infuraDomain}/v3/${infuraApiKey}`);
  }

  return new Web3('http://127.0.0.1:8545');
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

export let TX_DEFAULTS = {
  gas: 6700000, // 6.7M 
  gasPrice: 10000000 // 10 gWei 
}

export async function deployContract(bytecode, web3, privateKey, contractName): Promise<string> {
  console.log(`* Deploying ${contractName}`);

  if (!privateKey) {
    console.log('Please provide a valid private key');
  }

  if (!contractName) {
    console.log('Please provide a valid contract name');
  }

  if (!web3) {
    console.log('Please provide a valid web3 instance');
  }

  if (!web3) {
    console.log('Please provide bytecode/data');
  }

  let deployerAccount = web3.eth.accounts.privateKeyToAccount(privateKey);

  const deployTx = {
    gasPrice: 10000000000,
    gasLimit: 6700000,
    data: bytecode,
    from: deployerAccount.address,
  };

  let receipt;

  try {
    let signedTx = await web3.eth.accounts.signTransaction(deployTx, deployerAccount.privateKey)
    
    receipt = await new Promise((resolve, reject) => {
      web3.eth.sendSignedTransaction(signedTx.rawTransaction)
      // .on('transactionHash', (hash) => {
      //   console.log(`*** Tx Hash: ${hash}`);
      // })
      .on('receipt', result => { 
        resolve(result);
      }).on('error', error => {
        console.log(error);
        reject(error);
      });
    });
  } catch (error) {
    console.log('General deploy error ->', error)
    return error;
  }

  console.log(`*** ${receipt.contractAddress}`);

  let networkName = await getNetworkName();
  await writeContractToOutputs(networkName, contractName, receipt.contractAddress);

  return receipt.contractAddress;

}

export function linkLibraries(array, bytecode) {
  let finalByteCode = bytecode;
  array.forEach((item) => {
    finalByteCode = finalByteCode.replace(
      new RegExp(`_+${item.name}_+`, 'g'),
      item.address.replace("0x", "")
    );
  })
  return finalByteCode;
}