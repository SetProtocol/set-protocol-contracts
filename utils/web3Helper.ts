const Web3 = require('web3'); // import web3 v1.0 constructor
const BigNumber = require('bignumber.js');
require('dotenv').config({ path: './.env'});
import { version } from '../package.json';
import { DEFAULT_GAS, NULL_ADDRESS } from './constants';
import { Address } from 'set-protocol-utils';

const contract = require('@truffle/contract');

// use globally injected web3 to find the currentProvider and wrap with web3 v1.0
export const getWeb3 = () => {
  let myWeb3;
  if (typeof web3 !== 'undefined') {
    myWeb3 = new Web3(web3.currentProvider);
  } else {
    myWeb3 = new Web3( new Web3.providers.HttpProvider('http://localhost:8545'));
  }
  return myWeb3;
};

// assumes passed-in web3 is v1.0 and creates a function to receive contract name
export const getContractInstance = (artifact: any, contractAddress: string = artifact.address) => {
  const web3 = getWeb3();
  return new web3.eth.Contract(artifact.abi, contractAddress);
};

export const getGasUsageInEth = async txHash => {
  const web3 = getWeb3();
  const txReceipt = await web3.eth.getTransactionReceipt(txHash);
    const txn = await web3.eth.getTransaction(txHash);
    const { gasPrice } = txn;
    const { gasUsed } = txReceipt;

    return new BigNumber(gasPrice).mul(gasUsed);
};

export const txnFrom = (from: string) => {
  return { from, gas: DEFAULT_GAS };
};

export const blankTxn = async (from: string) => {
  const web3 = getWeb3();
  await web3.eth.sendTransaction({
    from,
    to: NULL_ADDRESS,
    value: '1',
  });
};

export const linkLibrariesToDeploy = async (contract: any, libraries: any[], from: Address) => {
  contract.setNetwork(50);

  await Promise.all(libraries.map(async library => {
    const truffleLibrary = await library.new(
      { from },
    );

    if (process.env.IS_BUIDLER === 'true') {
      try {
        await contract.link(truffleLibrary);
      } finally {
        return;
      }
    } else {
      await contract.link(library.contractName, truffleLibrary.address);
    }
  }));
};

export const coerceStructBNValuesToString = (struct: any) => {
  const newObject = {};

  const keys = Object.keys(struct);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    newObject[key] = struct[key] instanceof BigNumber ? struct[key].toString() : struct[key];
    if (struct[key] instanceof BigNumber) {
      newObject[key] = struct[key].toString();
    } else if (struct[key] instanceof Object) {
      newObject[key] = coerceStructBNValuesToString(struct[key]);
    } else {
      newObject[key] = struct[key];
    }
  }

  return newObject;
};

export const importArtifactsFromSource = (contractName: string) => {
  const web3 = getWeb3();
  let instance;
  try {
    instance = artifacts.require(contractName);
    return instance;
  } catch (e) {}

  try {
    const data = require('set-protocol-contracts/dist/artifacts/ts/' + contractName)[contractName];
    instance = contract(data);
    instance.setProvider(web3.currentProvider);

    return instance;
  } catch (e) {}

  try {
    const filePath = 'set-protocol-contracts-' + version + '/dist/artifacts/ts/' + contractName;
    const data = require(filePath)[contractName];
    instance = contract(data);
    instance.setProvider(web3.currentProvider);

    return instance;
  } catch (e) {}
};
