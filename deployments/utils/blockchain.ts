import dependencies from '../dependencies';
import { getNetworkId, getPrivateKey, writeContractToOutputs } from './output-helper';

require('dotenv').config({ path: './.env'});

const Web3 = require('web3');
const infuraApiKey: string = process.env.INFURA_KEY;

export async function getWeb3Instance(): Promise<any> {
  const networkId: number = getNetworkId();
  const infuraDomain = dependencies.INFURA_SUBDOMAIN[networkId];

  if (infuraDomain) {
    return new Web3(`${infuraDomain}/v3/${getInfuraKey()}`);
  }

  return new Web3('http://127.0.0.1:8545');
}

export function getInfuraKey(): string {
  return infuraApiKey;
}

export let TX_DEFAULTS = {
  gas: 6700000, // 6.7M
  gasPrice: 4000000000, // 4 gWei
};

export async function deployContract(bytecode, web3, contractName): Promise<string> {
  console.log(`* Deploying ${contractName}`);

  if (!contractName) {
    console.log('Please provide a valid contract name');
  }

  if (!web3) {
    console.log('Please provide a valid web3 instance');
  }

  if (!bytecode) {
    console.log('Please provide bytecode/data');
  }

  const deployerAccount = web3.eth.accounts.privateKeyToAccount(getPrivateKey());

  const deployTx = {
    ...TX_DEFAULTS,
    data: bytecode,
    from: deployerAccount.address,
  };

  let receipt;

  try {
    const signedTx = await web3.eth.accounts.signTransaction(deployTx, deployerAccount.privateKey);

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
    console.log('General deploy error ->', error);
    return error;
  }

  console.log(`*** ${receipt.contractAddress}`);

  await writeContractToOutputs(contractName, receipt.contractAddress);

  return receipt.contractAddress;

}

export async function executeTransaction(bytecode, to, web3): Promise<any> {

  if (!web3) {
    console.log('Please provide a valid web3 instance');
  }

  if (!web3) {
    console.log('Please provide bytecode/data');
  }

  const deployerAccount = web3.eth.accounts.privateKeyToAccount(getPrivateKey());

  const tx = {
    ...TX_DEFAULTS,
    data: bytecode,
    from: deployerAccount.address,
    to: to,
  };

  let receipt;

  try {
    const signedTx = await web3.eth.accounts.signTransaction(tx, deployerAccount.privateKey);

    receipt = await new Promise((resolve, reject) => {
      web3.eth.sendSignedTransaction(signedTx.rawTransaction)
      .on('receipt', result => {
        resolve(result);
      }).on('error', error => {
        console.log(error);
        reject(error);
      });
    });
  } catch (error) {
    console.log('General deploy error ->', error);
    return error;
  }

  return receipt;

}

export function linkLibraries(array, bytecode) {
  let finalByteCode = bytecode;

  array.forEach(item => {
    finalByteCode = finalByteCode.replace(
      new RegExp(`_+${item.name}_+`, 'g'),
      item.address.replace('0x', '')
    );
  });

  return finalByteCode;
}