const ConstantAuctionPriceCurve = artifacts.require('ConstantAuctionPriceCurve');
const Core = artifacts.require("Core");
const EIP712Library = artifacts.require("EIP712Library");
const ERC20Wrapper = artifacts.require('ERC20Wrapper');
const ExchangeIssueLibrary = artifacts.require('ExchangeIssueLibrary');
const ExchangeIssueModule = artifacts.require('ExchangeIssueModule');
const IssuanceOrderModule = artifacts.require('IssuanceOrderModule');
const KyberNetworkWrapper = artifacts.require('KyberNetworkWrapper');
const LinearAuctionPriceCurve = artifacts.require('LinearAuctionPriceCurve');
const OrderLibrary = artifacts.require("OrderLibrary");
const PayableExchangeIssue = artifacts.require("PayableExchangeIssue");
const RebalanceAuctionModule = artifacts.require("RebalanceAuctionModule");
const RebalancingHelperLibrary = artifacts.require('RebalancingHelperLibrary');
const RebalancingSetToken = artifacts.require('RebalancingSetToken');
const RebalancingSetTokenFactory = artifacts.require('RebalancingSetTokenFactory');
const RebalancingTokenIssuanceModule = artifacts.require('RebalancingTokenIssuanceModule');
const SetTokenFactory = artifacts.require("SetTokenFactory");
const SignatureValidator = artifacts.require("SignatureValidator");
const StandardFailAuctionLibrary = artifacts.require('StandardFailAuctionLibrary');
const StandardPlaceBidLibrary = artifacts.require('StandardPlaceBidLibrary');
const StandardProposeLibrary = artifacts.require('StandardProposeLibrary');
const StandardSettleRebalanceLibrary = artifacts.require('StandardSettleRebalanceLibrary');
const StandardStartRebalanceLibrary = artifacts.require('StandardStartRebalanceLibrary');
const TakerWalletWrapper = artifacts.require("TakerWalletWrapper");
const TransferProxy = artifacts.require("TransferProxy");
const Vault = artifacts.require("Vault");
const WhiteList = artifacts.require("WhiteList");
const ZeroExExchangeWrapper = artifacts.require("ZeroExExchangeWrapper");

const dependencies = require('./dependencies');
const networkConstants = require('./network-constants');
const constants = require('./constants');

module.exports = function(deployer, network, accounts) {
  if (network == "development" || network == "coverage") {
    console.log("Exiting - Network is development");
    return;
  }

  deployer.then(() => deployContracts(deployer, network)).then((migrationsInstance) => {
    if (!tdr.isDryRunNetworkName(network)) {
      return tdr.appendInstance(migrationsInstance)
    }
  });
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
  await PayableExchangeIssue.link('ERC20Wrapper', ERC20Wrapper.address);

  await deployer.deploy(EIP712Library);
  await Core.link('EIP712Library', EIP712Library.address);
  await IssuanceOrderModule.link('EIP712Library', EIP712Library.address);

  await deployer.deploy(OrderLibrary);
  await Core.link('OrderLibrary', OrderLibrary.address);
  await IssuanceOrderModule.link('OrderLibrary', OrderLibrary.address);

  await deployer.deploy(ExchangeIssueLibrary);
  await PayableExchangeIssue.link('ExchangeIssueLibrary', ExchangeIssueLibrary.address);

  await deployRebalancingLibrariesAsync(deployer, network);
  await linkRebalancingLibrariesAsync(deployer, network, RebalancingSetTokenFactory);
  await linkRebalancingLibrariesAsync(deployer, network, RebalancingSetToken);

  await deployer.deploy(SignatureValidator);
};

async function deployRebalancingLibrariesAsync(deployer, network) {
  await deployer.deploy(RebalancingHelperLibrary);
  
  await StandardProposeLibrary.link(
    'RebalancingHelperLibrary',
    RebalancingHelperLibrary.address
  );
  await StandardStartRebalanceLibrary.link(
    'RebalancingHelperLibrary',
    RebalancingHelperLibrary.address
  );
  await StandardPlaceBidLibrary.link(
    'RebalancingHelperLibrary',
    RebalancingHelperLibrary.address
  );
  await StandardSettleRebalanceLibrary.link(
    'RebalancingHelperLibrary',
    RebalancingHelperLibrary.address
  );
  await StandardFailAuctionLibrary.link(
    'RebalancingHelperLibrary',
    RebalancingHelperLibrary.address
  );

  await deployer.deploy(StandardProposeLibrary);
  await deployer.deploy(StandardStartRebalanceLibrary);
  await deployer.deploy(StandardPlaceBidLibrary);
  await deployer.deploy(StandardSettleRebalanceLibrary);
  await deployer.deploy(StandardFailAuctionLibrary);
}

async function linkRebalancingLibrariesAsync(deployer, network, contract) {
  await contract.link(
    'RebalancingHelperLibrary',
    RebalancingHelperLibrary.address
  );
  await contract.link(
    'StandardProposeLibrary',
    StandardProposeLibrary.address
  );
  await contract.link(
    'StandardStartRebalanceLibrary',
    StandardStartRebalanceLibrary.address
  );
  await contract.link(
    'StandardPlaceBidLibrary',
    StandardPlaceBidLibrary.address
  );
  await contract.link(
    'StandardSettleRebalanceLibrary',
    StandardSettleRebalanceLibrary.address
  );
  await contract.link(
    'StandardFailAuctionLibrary',
    StandardFailAuctionLibrary.address
  );  
}

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
  let minimumRebalanceInterval = networkConstants.minimumRebalanceInterval[network];
  let minimumProposalPeriod = networkConstants.minimumProposalPeriod[network];
  let minimumTimeToPivot = networkConstants.minimumTimeToPivot[network];
  let maximumTimeToPivot = networkConstants.maximumTimeToPivot[network];

  await deployer.deploy(
    RebalancingSetTokenFactory,
    Core.address,
    WhiteList.address,
    minimumRebalanceInterval,
    minimumProposalPeriod,
    minimumTimeToPivot,
    maximumTimeToPivot
  );

  // Deploy Exchange Wrappers
  let networkId = networkConstants.networkId[network];
  let zeroExExchangeAddress = dependencies.ZERO_EX_EXCHANGE[networkId];
  let zeroExERC20ProxyAddress = dependencies.ZERO_EX_PROXY[networkId];
  let zeroExZRXAddress = dependencies.ZERO_EX_ZRX[networkId];
  let kyberNetworkProxyAddress = dependencies.KYBER_PROXY[networkId];

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

  // Deploy PayabaleExchangeIssue
  let wethAddress = dependencies.WETH[networkId];

  await deployer.deploy(
    PayableExchangeIssue,
    Core.address,
    TransferProxy.address,
    ExchangeIssueModule.address,
    wethAddress
  );

  // Deploy Rebalancing Price Auction Libraries
  if (networkConstants.linearAuctionPriceCurve[network]) {
    await deployer.deploy(LinearAuctionPriceCurve, constants.DEFAULT_AUCTION_PRICE_DENOMINATOR, true);
  }

  if (networkConstants.constantsAuctionPriceCurve[network]) {
    await deployer.deploy(ConstantAuctionPriceCurve, constants.DEFAULT_AUCTION_PRICE_NUMERATOR, constants.DEFAULT_AUCTION_PRICE_DENOMINATOR);
  }
};
