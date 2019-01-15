const ConstantAuctionPriceCurve = artifacts.require('ConstantAuctionPriceCurve');
const Core = artifacts.require("Core");
const ExchangeIssueModule = artifacts.require('ExchangeIssueModule');
const IssuanceOrderModule = artifacts.require('IssuanceOrderModule');
const KyberNetworkWrapper = artifacts.require('KyberNetworkWrapper');
const LinearAuctionPriceCurve = artifacts.require('LinearAuctionPriceCurve');
const RebalanceAuctionModule = artifacts.require("RebalanceAuctionModule");
const RebalancingSetTokenFactory = artifacts.require('RebalancingSetTokenFactory');
const RebalancingTokenIssuanceModule = artifacts.require('RebalancingTokenIssuanceModule');
const SetTokenFactory = artifacts.require("SetTokenFactory");
const TakerWalletWrapper = artifacts.require("TakerWalletWrapper");
const TransferProxy = artifacts.require("TransferProxy");
const Vault = artifacts.require("Vault");
const WhiteList = artifacts.require("WhiteList")
const ZeroExExchangeWrapper = artifacts.require("ZeroExExchangeWrapper");

const EXCHANGES = {
  ZERO_EX: 1,
  KYBER: 2,
  TAKER_WALLET: 3,
}

const TIMELOCK_PERIOD_DEPLOYMENT = 0;
const TIMELOCK_PERIOD_MAINNET = 604800;
const TIMELOCK_PERIOD_TESTNET = 60;
const TIMELOCK_PERIOD_DEVELOPMENT = 60;


module.exports = function(deployer, network, accounts) {
  if (network == "development" || network == "coverage") {
    console.log("Exiting - Network is development");
    return;
  }

  deployer.then(() => addAuthorizations(deployer, network));
};

async function addAuthorizations(deployer, network) {
  // Set timelock period to 0 for adding initial deployment authorizations
  await setTimeLockPeriodForDeployment(deployer, network);

  // Add authorizations, factories, modules, exchange wrappers, and price libraries
  await addAuthorizations(deployer, network);

  // Enable timelock period
  await enableTimeLockMinimumTime(deployer, network);
};

/*
 * This is provided purely for transparency to show that the initial timelock period is 0 to allow the system
 * to be deployed without having to wait the time lock period. After `addAuthorizations` adds the factories, modules,
 * exchange wrappers, and price libraries, the timelock is set to TIMELOCK_PERIOD_MAINNET in `enableTimeLockMinimumTime`
 *
 */
async function setTimeLockPeriodForDeployment(deployer, network) {
  await updateTimeLockOnRequiredContracts(TIMELOCK_PERIOD_DEPLOYMENT);
};

async function addAuthorizations(deployer, network) {
  // Add authorized addresses to Vault
  console.log('Adding authorized addresses to \'Vault\': ', Vault.address)
  const vault = await Vault.deployed();
  await addAuthorizedAddressToContract(vault, 'Core', Core.address);
  await addAuthorizedAddressToContract(vault, 'ExchangeIssueModule', ExchangeIssueModule.address);
  await addAuthorizedAddressToContract(vault, 'IssuanceOrderModule', IssuanceOrderModule.address);
  await addAuthorizedAddressToContract(vault, 'RebalanceAuctionModule', RebalanceAuctionModule.address);
  await addAuthorizedAddressToContract(vault, 'RebalancingTokenIssuanceModule', RebalancingTokenIssuanceModule.address);
  console.log('Successfully added authorized addresses to \'Vault\'\n');

  // Add authorized addresses to TransferProxy
  console.log('Adding authorized addresses to \'TransferProxy\': ', TransferProxy.address)
  const transferProxy = await TransferProxy.deployed();
  await addAuthorizedAddressToContract(transferProxy, 'Core', Core.address);
  await addAuthorizedAddressToContract(transferProxy, 'TakerWalletWrapper', TakerWalletWrapper.address);
  await addAuthorizedAddressToContract(transferProxy, 'ExchangeIssueModule', ExchangeIssueModule.address);
  await addAuthorizedAddressToContract(transferProxy, 'IssuanceOrderModule', IssuanceOrderModule.address);
  await addAuthorizedAddressToContract(transferProxy, 'RebalanceAuctionModule', RebalanceAuctionModule.address);
  await addAuthorizedAddressToContract(transferProxy, 'RebalancingTokenIssuanceModule', RebalancingTokenIssuanceModule.address);
  console.log('Successfully added authorized addresses to \'TransferProxy\'\n');

  // Register Factories
  console.log('Adding factories to \'Core\': ', Core.address)
  await addFactoryToCore('SetTokenFactory', SetTokenFactory.address);
  await addFactoryToCore('RebalancingSetTokenFactory', RebalancingSetTokenFactory.address);
  console.log('Successfully added factories to \'Core\'\n');

  // Register Modules
  console.log('Adding modules to \'Core\': ', Core.address)
  await addModuleToCore('ExchangeIssueModule', ExchangeIssueModule.address);
  await addModuleToCore('IssuanceOrderModule', IssuanceOrderModule.address);
  await addModuleToCore('RebalanceAuctionModule', RebalanceAuctionModule.address);
  await addModuleToCore('RebalancingTokenIssuanceModule', RebalancingTokenIssuanceModule.address);
  console.log('Successfully added modules to \'Core\'\n');

  // Register Exchanges
  console.log('Adding exchange wrappers to \'Core\': ', Core.address)
  if (network === 'kovan' || network === 'kovan-fork' || network === 'development') {
    await addExchangeWrapperToCore('ZeroExExchangeWrapper', EXCHANGES.ZERO_EX, ZeroExExchangeWrapper.address);
  };
  await addExchangeWrapperToCore('KyberNetworkWrapper', EXCHANGES.KYBER, KyberNetworkWrapper.address);
  await addExchangeWrapperToCore('TakerWalletWrapper', EXCHANGES.TAKER_WALLET, TakerWalletWrapper.address);
  console.log('Successfully added exchange wrappers to \'Core\'\n');

  // Register Price Libraries
  console.log('Adding price libraries to \'Core\': ', Core.address)
  await addPriceLibraryToCore('ConstantAuctionPriceCurve', ConstantAuctionPriceCurve.address);
  await addPriceLibraryToCore('LinearAuctionPriceCurve', LinearAuctionPriceCurve.address);
  console.log('Successfully added price libraries to \'Core\'\n');
};

async function enableTimeLockMinimumTime(deployer, network) {
  let timeLockPeriod;
  switch(network) {
    case 'main':
      timeLockPeriod = TIMELOCK_PERIOD_MAINNET;
      break;

    case 'kovan':
    case 'kovan-fork':
    case 'ropsten':
    case 'ropsten-fork':
      timeLockPeriod = TIMELOCK_PERIOD_TESTNET;
      break;

    case 'development':
      timeLockPeriod = TIMELOCK_PERIOD_DEVELOPMENT;
      break;
  }

  await updateTimeLockOnRequiredContracts(timeLockPeriod);
};

/* ============ Helpers ============ */

async function addAuthorizedAddressToContract(contract, contractName, contractAddress) {
  console.log(`Authorizing \'${contractName}\': ${contractAddress}`)

  await contract.addAuthorizedAddress(contractAddress);
}

async function addFactoryToCore(contractName, contractAddress) {
  console.log(`Adding \'${contractName}\': ${contractAddress}`)

  const core = await Core.deployed();
  await core.addFactory(contractAddress);
}

async function addModuleToCore(contractName, contractAddress) {
  console.log(`Adding \'${contractName}\': ${contractAddress}`)

  const core = await Core.deployed();
  await core.addModule(contractAddress);
}

async function addExchangeWrapperToCore(contractName, exchangeWrapperKey, contractAddress) {
  console.log(`Adding \'${contractName}\': ${contractAddress}`)

  const core = await Core.deployed();
  await core.addExchange(exchangeWrapperKey, contractAddress);
}

async function addPriceLibraryToCore(contractName, contractAddress) {
  console.log(`Adding \'${contractName}\': ${contractAddress}`)

  const core = await Core.deployed();
  await core.addPriceLibrary(contractAddress);
}

async function updateTimeLockOnRequiredContracts(timeLockPeriod) {
  const core = await Core.deployed();
  await core.setTimeLockPeriod(timeLockPeriod);

  const transferProxy = await TransferProxy.deployed();
  await transferProxy.setTimeLockPeriod(timeLockPeriod);

  const vault = await Vault.deployed();
  await vault.setTimeLockPeriod(timeLockPeriod);

  const whitelist = await WhiteList.deployed();
  await whitelist.setTimeLockPeriod(timeLockPeriod);

  const issuanceOrderModule = await IssuanceOrderModule.deployed();
  await issuanceOrderModule.setTimeLockPeriod(timeLockPeriod);
}
