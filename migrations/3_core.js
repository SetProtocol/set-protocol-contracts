const ConstantAuctionPriceCurve = artifacts.require('ConstantAuctionPriceCurve');
const Core = artifacts.require("Core");
const EIP712Library = artifacts.require("EIP712Library");
const ERC20Wrapper = artifacts.require('ERC20Wrapper');
const ExchangeIssueModule = artifacts.require('ExchangeIssueModule');
const IssuanceOrderModule = artifacts.require('IssuanceOrderModule');
const KyberNetworkWrapper = artifacts.require('KyberNetworkWrapper');
const LinearAuctionPriceCurve = artifacts.require('LinearAuctionPriceCurve');
const OrderLibrary = artifacts.require("OrderLibrary");
const RebalanceAuctionModule = artifacts.require("RebalanceAuctionModule");
const RebalancingSetTokenFactory = artifacts.require('RebalancingSetTokenFactory');
const RebalancingTokenIssuanceModule = artifacts.require('RebalancingTokenIssuanceModule');
const SetTokenFactory = artifacts.require("SetTokenFactory");
const SignatureValidator = artifacts.require("SignatureValidator");
const TakerWalletWrapper = artifacts.require("TakerWalletWrapper");
const TransferProxy = artifacts.require("TransferProxy");
const Vault = artifacts.require("Vault");
const WhiteList = artifacts.require("WhiteList")
const ZeroExExchangeWrapper = artifacts.require("ZeroExExchangeWrapper");

const ZERO_EX_EXCHANGE_ADDRESS_KOVAN = '0x35dd2932454449b14cee11a94d3674a936d5d7b2';
const ZERO_EX_ERC20_PROXY_ADDRESS_KOVAN = '0xf1ec01d6236d3cd881a0bf0130ea25fe4234003e';
const ZERO_EX_ZRX_ADDRESS_KOVAN = '0x2002d3812f58e35f0ea1ffbf80a75a38c32175fa';

const ZERO_EX_EXCHANGE_ADDRESS_TESTRPC = '0x48bacb9266a570d521063ef5dd96e61686dbe788';
const ZERO_EX_ERC20_PROXY_ADDRESS_TESTRPC = '0x1dc4c1cefef38a777b15aa20260a54e584b16c48';
const ZERO_EX_ZRX_ADDRESS_TESTRPC = '0x871dd7c2b4b25e1aa18728e9d5f2af4c4e431f5c';

const KYBER_NETWORK_PROXY_ADDRESS_KOVAN = '0x7e6b8b9510d71bf8ef0f893902ebb9c865eef4df';
const KYBER_NETWORK_PROXY_ADDRESS_ROPSTEN = '0x818e6fecd516ecc3849daf6845e3ec868087b755';
const KYBER_NETOWRK_PROXY_ADDRESS_TESTRPC = '0x371b13d97f4bf77d724e78c16b7dc74099f40e84';

const DEFAULT_AUCTION_PRICE_NUMERATOR = 1374;
const DEFAULT_AUCTION_PRICE_DENOMINATOR = 1000;

const ONE_DAY_IN_SECONDS = 86400;
const ONE_MINUTE_IN_SECONDS = 60;


module.exports = function(deployer, network, accounts) {
  if (network == "development" || network == "coverage") {
    console.log("Exiting - Network is development");
    return;
  }

  deployer.then(() => deployContracts(deployer, network));
};

async function deployContracts(deployer, network) {
  // Link external libraries that are dependencies of our contracts
  await deployAndLinkLibraries(deployer, network);

  // Deploy Core contracts and its authorized dependents
  await deployCoreContracts(deployer, network);
};

async function deployAndLinkLibraries(deployer, network) {
  await deployer.deploy(ERC20Wrapper);
  await Vault.link('ERC20Wrapper', ERC20Wrapper.address);
  await TransferProxy.link('ERC20Wrapper', ERC20Wrapper.address);
  await TakerWalletWrapper.link('ERC20Wrapper', ERC20Wrapper.address);
  await KyberNetworkWrapper.link('ERC20Wrapper', ERC20Wrapper.address);
  await ZeroExExchangeWrapper.link('ERC20Wrapper', ERC20Wrapper.address);

  await deployer.deploy(EIP712Library);
  await Core.link('EIP712Library', EIP712Library.address);
  await IssuanceOrderModule.link('EIP712Library', EIP712Library.address);

  await deployer.deploy(OrderLibrary);
  await Core.link('OrderLibrary', OrderLibrary.address);
  await IssuanceOrderModule.link('OrderLibrary', OrderLibrary.address);

  await deployer.deploy(SignatureValidator);
};

async function deployCoreContracts(deployer, network) {
  // Deploy Vault and TransferProxy
  await deployer.deploy(Vault);
  await deployer.deploy(TransferProxy);

  // Deploy Core
  await deployer.deploy(
    Core,
    TransferProxy.address,
    Vault.address
  );

  // Deploy SetToken Factory
  await deployer.deploy(
    SetTokenFactory,
    Core.address
  );

  // Deploy RebalancingSetToken Factory
  let minimumReblanaceInterval;
  let minimumProposalPeriod;
  switch(network) {
    case 'main':
      minimumReblanaceInterval = ONE_DAY_IN_SECONDS;
      minimumProposalPeriod = ONE_DAY_IN_SECONDS;
      break;

    case 'kovan':
    case 'kovan-fork':
    case 'ropsten':
    case 'ropsten-fork':
    case 'development':
      minimumReblanaceInterval = ONE_MINUTE_IN_SECONDS;
      minimumProposalPeriod = ONE_MINUTE_IN_SECONDS;
      break;
  }

  await deployer.deploy(
    RebalancingSetTokenFactory,
    Core.address,
    WhiteList.address,
    minimumReblanaceInterval,
    minimumProposalPeriod
  );

  // Deploy Exchange Wrappers
  let zeroExExchangeAddress;
  let zeroExERC20ProxyAddress;
  let zeroExZRXAddress;
  let kyberNetworkProxyAddress;

  switch(network) {
    case 'kovan':
    case 'kovan-fork':
      zeroExExchangeAddress = ZERO_EX_EXCHANGE_ADDRESS_KOVAN;
      zeroExERC20ProxyAddress = ZERO_EX_ERC20_PROXY_ADDRESS_KOVAN;
      zeroExZRXAddress = ZERO_EX_ZRX_ADDRESS_KOVAN;
      kyberNetworkProxyAddress = KYBER_NETWORK_PROXY_ADDRESS_KOVAN;
      break;

    case 'ropsten':
    case 'ropsten-fork':
      kyberNetworkProxyAddress = KYBER_NETWORK_PROXY_ADDRESS_ROPSTEN;
      break;

    case 'development':
      zeroExExchangeAddress = ZERO_EX_EXCHANGE_ADDRESS_TESTRPC;
      zeroExERC20ProxyAddress = ZERO_EX_ERC20_PROXY_ADDRESS_TESTRPC;
      zeroExZRXAddress = ZERO_EX_ZRX_ADDRESS_TESTRPC;
      kyberNetworkProxyAddress = KYBER_NETOWRK_PROXY_ADDRESS_TESTRPC;
      break;
  }

  // Deploy Exchange Issue Module
  await deployer.deploy(
    ExchangeIssueModule,
    Core.address,
    TransferProxy.address,
    Vault.address
  );

  // Deploy Issuance Order Module
  await deployer.deploy(
    IssuanceOrderModule,
    Core.address,
    TransferProxy.address,
    Vault.address,
    SignatureValidator.address
  );

  // Deploy Rebalancing Auction Module
  await deployer.deploy(
    RebalanceAuctionModule,
    Core.address,
    Vault.address
  );

  // Deploy Rebalancing Token Issuance Module
  await deployer.deploy(
    RebalancingTokenIssuanceModule,
    Core.address,
    TransferProxy.address,
    Vault.address
  );

  // Taker Wallet Wrapper
  await deployer.deploy(
    TakerWalletWrapper,
    Core.address,
    TransferProxy.address
  );

  // Kyber Wrapper
  if (kyberNetworkProxyAddress) {
    await deployer.deploy(
      KyberNetworkWrapper,
      Core.address,
      kyberNetworkProxyAddress,
      TransferProxy.address
    );
  }

  // 0x V2 Wrapper
  if (zeroExExchangeAddress && zeroExERC20ProxyAddress && zeroExZRXAddress) {
    await deployer.deploy(
      ZeroExExchangeWrapper,
      Core.address,
      zeroExExchangeAddress,
      zeroExERC20ProxyAddress,
      zeroExZRXAddress,
      TransferProxy.address
    );
  }

  // Deploy Rebalancing Price Auction Libraries
  await deployer.deploy(ConstantAuctionPriceCurve, DEFAULT_AUCTION_PRICE_NUMERATOR, DEFAULT_AUCTION_PRICE_DENOMINATOR);
  await deployer.deploy(LinearAuctionPriceCurve, DEFAULT_AUCTION_PRICE_DENOMINATOR);
};
