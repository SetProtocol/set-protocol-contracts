<<<<<<< HEAD:migrations/utils/blockchain.ts
import fs from 'fs-extra';
import dependencies from '../../migrations/dependencies';
=======
import dependencies from '../dependencies';
import { getNetworkId, getPrivateKey, writeContractToOutputs, getNetworkName } from './output-helper';
>>>>>>> Split up blockchain.ts helper:deployments/utils/blockchain.ts

require('dotenv').config({ path: './.env'})

const Web3 = require('web3');
const infuraApiKey: string = process.env.INFURAKEY;

export async function getWeb3Instance(): Promise<any> {
  let networkId: number = getNetworkId();
  let infuraDomain = dependencies.INFURA_SUBDOMAIN[networkId];
  
  if (infuraDomain) {
    return new Web3(`${infuraDomain}/v3/${infuraApiKey}`);
  }

  return new Web3('http://127.0.0.1:8545');
}

export let TX_DEFAULTS = {
  gas: 6700000, // 6.7M 
  gasPrice: 10000000 // 10 gWei 
}

export async function deployContract(bytecode, web3, contractName): Promise<string> {
  console.log(`* Deploying ${contractName}`);

  if (!contractName) {
    console.log('Please provide a valid contract name');
  }

  if (!web3) {
    console.log('Please provide a valid web3 instance');
  }

  if (!web3) {
    console.log('Please provide bytecode/data');
  }

  let deployerAccount = web3.eth.accounts.privateKeyToAccount(getPrivateKey());

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