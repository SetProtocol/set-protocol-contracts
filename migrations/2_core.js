const ConstantAuctionPriceCurve = artifacts.require('ConstantAuctionPriceCurve');
const Core = artifacts.require("Core");
const ERC20Wrapper = artifacts.require('ERC20Wrapper');
const KyberNetworkWrapper = artifacts.require('KyberNetworkWrapper');
const LinearAuctionPriceCurve = artifacts.require('LinearAuctionPriceCurve');
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
const ZERO_EX_EXCHANGE_ADDRESS_KOVAN = '0x35dd2932454449b14cee11a94d3674a936d5d7b2';
const ZERO_EX_ERC20_PROXY_ADDRESS_KOVAN = '0xf1ec01d6236d3cd881a0bf0130ea25fe4234003e';
const ZERO_EX_EXCHANGE_ADDRESS_TESTRPC = '0x48bacb9266a570d521063ef5dd96e61686dbe788';
const ZERO_EX_ERC20_PROXY_ADDRESS_TESTRPC = '0x1dc4c1cefef38a777b15aa20260a54e584b16c48';

const KYBER_NETWORK_PROXY_ADDRESS_KOVAN = '0x7e6b8b9510d71bf8ef0f893902ebb9c865eef4df';
const KYBER_NETWORK_PROXY_ADDRESS_ROPSTEN = '0x818e6fecd516ecc3849daf6845e3ec868087b755';
const KYBER_NETOWRK_PROXY_ADDRESS_TESTRPC = '0x371b13d97f4bf77d724e78c16b7dc74099f40e84';


module.exports = function(deployer, network, accounts) {
  if (network == "development" || network == "coverage") {
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
  await KyberNetworkWrapper.link('ERC20Wrapper', ERC20Wrapper.address);
};

async function deployCoreContracts(deployer, network) {
  // Deploy Vault and TransferProxy
  await Promise.all([
    deployer.deploy(Vault),
    deployer.deploy(TransferProxy)
  ]);

  // Deploy Core
  await deployer.deploy(Core, TransferProxy.address, Vault.address);

  // Deploy Factories
  await deployer.deploy(SetTokenFactory, Core.address);
  await deployer.deploy(RebalancingSetTokenFactory, Core.address);

  // Deploy Exchange Wrappers
  let zeroExExchangeAddress;
  let zeroExERC20ProxyAddress;
  let kyberNetworkProxyAddress;

  switch(network) {
    case 'kovan':
      zeroExExchangeAddress = ZERO_EX_EXCHANGE_ADDRESS_KOVAN;
      zeroExERC20ProxyAddress = ZERO_EX_ERC20_PROXY_ADDRESS_KOVAN;
      kyberNetworkProxyAddress = KYBER_NETWORK_PROXY_ADDRESS_KOVAN;
      break;

    case 'ropsten':
      kyberNetworkProxyAddress = KYBER_NETWORK_PROXY_ADDRESS_ROPSTEN;
      break;

    case 'development':
      zeroExExchangeAddress = ZERO_EX_EXCHANGE_ADDRESS_TESTRPC;
      zeroExERC20ProxyAddress = ZERO_EX_ERC20_PROXY_ADDRESS_TESTRPC;
      kyberNetworkProxyAddress = KYBER_NETOWRK_PROXY_ADDRESS_TESTRPC;
      break;
  }

  // Taker Wallet Wrapper
  await deployer.deploy(TakerWalletWrapper, TransferProxy.address);

  // Kyber Wrapper
  if (kyberNetworkProxyAddress) {
    await deployer.deploy(
      KyberNetworkWrapper,
      kyberNetworkProxyAddress,
      TransferProxy.address
    );
  }

  // 0x V2 Wrapper
  if (zeroExExchangeAddress && zeroExERC20ProxyAddress) {
    await deployer.deploy(
      ZeroExExchangeWrapper,
      zeroExExchangeAddress,
      zeroExERC20ProxyAddress,
      TransferProxy.address
    );
  }

  // Deploy Rebalancing Price Auction Libraries
  await Promise.all([
    deployer.deploy(ConstantAuctionPriceCurve),
    deployer.deploy(LinearAuctionPriceCurve)
  ]);
};

async function addAuthorizations(deployer, network) {
  // Approve Core to Vault
  const vault = await Vault.deployed();
  await vault.addAuthorizedAddress(Core.address);

  // Approve Core and Vault to TransferProxy
  const transferProxy = await TransferProxy.deployed();
  await transferProxy.addAuthorizedAddress(Core.address);
  await transferProxy.addAuthorizedAddress(TakerWalletWrapper.address);

  // Register Factories
  const core = await Core.deployed();
  await core.enableFactory(SetTokenFactory.address);
  await core.enableFactory(RebalancingSetTokenFactory.address);

  // Register Exchanges
  if (network === 'kovan' || network === 'development') {
    await core.registerExchange(EXCHANGES.ZERO_EX, ZeroExExchangeWrapper.address);
    const zeroExExchangeWrapper = await ZeroExExchangeWrapper.deployed();
    await zeroExExchangeWrapper.addAuthorizedAddress(Core.address);
  };

  await core.registerExchange(EXCHANGES.KYBER, KyberNetworkWrapper.address);
  const kyberNetworkWrapper = await KyberNetworkWrapper.deployed();  
  await kyberNetworkWrapper.addAuthorizedAddress(Core.address);

  await core.registerExchange(EXCHANGES.TAKER_WALLET, TakerWalletWrapper.address);
  const takerWalletWrapper = await TakerWalletWrapper.deployed();
  await takerWalletWrapper.addAuthorizedAddress(Core.address);
};
