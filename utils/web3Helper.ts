const Web3 = require('web3'); // import web3 v1.0 constructor
const BigNumber = require('bignumber.js');

// use globally injected web3 to find the currentProvider and wrap with web3 v1.0
export const getWeb3 = () => {
  const myWeb3 = new Web3(web3.currentProvider);
  return myWeb3;
};

// assumes passed-in web3 is v1.0 and creates a function to receive contract name
export const getContractInstance = contractName => {
  const web3 = getWeb3();
  const artifact = artifacts.require(contractName); // globally injected artifacts helper
  const deployedAddress = artifact.networks[artifact.network_id].address;
  const instance = new web3.eth.Contract(artifact.abi, deployedAddress);
  return instance;
};

export const getGasUsageInEth = async txHash => {
  const web3 = getWeb3();
  const txReceipt = await web3.eth.getTransactionReceipt(txHash);
    const txn = await web3.eth.getTransaction(txHash);
    const { gasPrice } = txn;
    const { gasUsed } = txReceipt;

    return new BigNumber(gasPrice).mul(gasUsed);
};