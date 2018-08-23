const Core = artifacts.require("Core");
const ERC20Wrapper = artifacts.require('ERC20Wrapper');
const RebalancingSetTokenFactory = artifacts.require('RebalancingSetTokenFactory');
const SetTokenFactory = artifacts.require("SetTokenFactory");
const TakerWalletWrapper = artifacts.require("TakerWalletWrapper");
const TransferProxy = artifacts.require("TransferProxy");
const Vault = artifacts.require("Vault");
const ZeroExExchangeWrapper = artifacts.require("ZeroExExchangeWrapper");

const EXCHANGES = {
  ZERO_EX: 1,
  KYBER: 2,
  TAKER_WALLET: 3,
}
const ZERO_EX_EXCHANGE_ADDRESS_KOVAN = '0xb65619b82c4d385de0c5b4005452c2fdee0f86d1';
const ZERO_EX_ERC20_PROXY_ADDRESS_KOVAN = '0x5bc0de240e1c1b211538ca077a82bb39f4179087';

module.exports = function(deployer, network, accounts) {
  if (network == "development") {
    console.log("Exiting - Network is development");
    return;      
  }

  deployer.then(() => deployContracts(deployer, network));
};

async function deployContracts(deployer, network) {
  await deployAndLinkLibraries(deployer, network);
  await deployCoreContracts(deployer, network);
  await addAuthorizations(deployer, network);
};

async function deployAndLinkLibraries(deployer, network) {
  await deployer.deploy(ERC20Wrapper);
  await Vault.link('ERC20Wrapper', ERC20Wrapper.address);
  await TransferProxy.link('ERC20Wrapper', ERC20Wrapper.address);
  await TakerWalletWrapper.link('ERC20Wrapper', ERC20Wrapper.address);
};

async function deployCoreContracts(deployer, network) {
  await Promise.all([
    deployer.deploy(Vault),
    deployer.deploy(TransferProxy)
  ]);

  await deployer.deploy(Core, TransferProxy.address, Vault.address);

  await deployer.deploy(SetTokenFactory, Core.address);
  await deployer.deploy(RebalancingSetTokenFactory, Core.address);

  await deployer.deploy(TakerWalletWrapper, TransferProxy.address);
  if (network === 'kovan' ) {
    await deployer.deploy(
      ZeroExExchangeWrapper,
      ZERO_EX_EXCHANGE_ADDRESS_KOVAN,
      ZERO_EX_ERC20_PROXY_ADDRESS_KOVAN,
      TransferProxy.address
    );
  }
};

async function addAuthorizations(deployer, network) {
  const vault = await Vault.deployed();
  await vault.addAuthorizedAddress(Core.address);

  const transferProxy = await TransferProxy.deployed();
  await transferProxy.addAuthorizedAddress(Core.address);
  await transferProxy.addAuthorizedAddress(TakerWalletWrapper.address);

  const core = await Core.deployed();
  await core.enableFactory(SetTokenFactory.address);
  await core.enableFactory(RebalancingSetTokenFactory.address);
  await core.registerExchange(EXCHANGES.TAKER_WALLET, TakerWalletWrapper.address);
  if (network === 'kovan' ) {
    await core.registerExchange(EXCHANGES.ZERO_EX, ZeroExExchangeWrapper.address);
  };

  const takerWalletWrapper = await TakerWalletWrapper.deployed();
  await takerWalletWrapper.addAuthorizedAddress(Core.address);
};
