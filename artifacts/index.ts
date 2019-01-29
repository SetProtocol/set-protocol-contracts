import { BadTokenMock } from "./ts/BadTokenMock";
import { BTCETHRebalancingManager } from "./ts/BTCETHRebalancingManager";
import { ConstantAuctionPriceCurve } from "./ts/ConstantAuctionPriceCurve";
import { Core } from "./ts/Core";
import { ERC20 } from "./ts/ERC20";
import { ERC20Detailed } from "./ts/ERC20Detailed";
import { ERC20Wrapper } from "./ts/ERC20Wrapper";
import { ExchangeIssueModule } from "./ts/ExchangeIssueModule";
import { IAuctionPriceCurve } from "./ts/IAuctionPriceCurve";
import { InvalidReturnTokenMock } from "./ts/InvalidReturnTokenMock";
import { IssuanceOrderModule } from "./ts/IssuanceOrderModule"
import { KyberNetworkWrapper } from "./ts/KyberNetworkWrapper";
import { LinearAuctionPriceCurve } from "./ts/LinearAuctionPriceCurve";
import { NoDecimalTokenMock } from "./ts/NoDecimalTokenMock";
import { NoXferReturnTokenMock } from "./ts/NoXferReturnTokenMock";
import { OrderLibrary } from "./ts/OrderLibrary";
import { PayableExchangeIssue } from "./ts/PayableExchangeIssue";
import { RebalanceAuctionModule } from "./ts/RebalanceAuctionModule";
import { RebalancingSetToken } from "./ts/RebalancingSetToken";
import { RebalancingSetTokenFactory } from "./ts/RebalancingSetTokenFactory";
import { RebalancingTokenIssuanceModule } from "./ts/RebalancingTokenIssuanceModule";
import { SetToken } from "./ts/SetToken";
import { SetTokenFactory } from "./ts/SetTokenFactory";
import { SignatureValidator } from "./ts/SignatureValidator";
import { StandardTokenMock } from "./ts/StandardTokenMock";
import { StandardTokenWithFeeMock } from "./ts/StandardTokenWithFeeMock";
import { TakerWalletWrapper } from "./ts/TakerWalletWrapper";
import { TimeLockUpgrade } from "./ts/TimeLockUpgrade";
import { TransferProxy } from "./ts/TransferProxy";
import { WethMock } from "./ts/WethMock";
import { WhiteList } from "./ts/WhiteList";
import { Vault } from "./ts/Vault";
import { ZeroExExchangeWrapper } from "./ts/ZeroExExchangeWrapper";

// Export abi-gen contract wrappers
export {
  AuthorizableContract,
  BadTokenMockContract,
  BaseContract,
  Bytes32MockContract,
  BTCETHRebalancingManagerContract,
  CommonMathMockContract,
  ConstantAuctionPriceCurveContract,
  CoreContract,
  CoreMockContract,
  ERC20DetailedContract,
  ERC20WrapperMockContract,
  ExchangeIssueModuleContract,
  IAuctionPriceCurveContract,
  InvalidReturnTokenMockContract,
  IssuanceOrderModuleContract,
  KyberNetworkWrapperContract,
  LinearAuctionPriceCurveContract,
  NoDecimalTokenMockContract,
  NoXferReturnTokenMockContract,
  OrderLibraryMockContract,
  PayableExchangeIssueContract,
  RebalanceAuctionModuleContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  RebalancingTokenIssuanceModuleContract,
  SetTokenContract,
  SetTokenFactoryContract,
  SignatureValidatorContract,
  StandardTokenMockContract,
  StandardTokenWithFeeMockContract,
  TakerWalletWrapperContract,
  TimeLockUpgradeMockContract,
  TransferProxyContract,
  VaultContract,
  WethMockContract,
  WhiteListContract,
  ZeroExExchangeWrapperContract,
  ZeroExOrderDataHandlerMockContract,
} from "../utils/contracts";

// Export contract artifacts
export {
  BadTokenMock,
  BTCETHRebalancingManager,
  ConstantAuctionPriceCurve,
  Core,
  ERC20,
  ERC20Detailed,
  ERC20Wrapper,
  ExchangeIssueModule,
  IAuctionPriceCurve,
  InvalidReturnTokenMock,
  IssuanceOrderModule,
  KyberNetworkWrapper,
  LinearAuctionPriceCurve,
  NoDecimalTokenMock,
  NoXferReturnTokenMock,
  OrderLibrary,
  PayableExchangeIssue,
  RebalanceAuctionModule,
  RebalancingSetToken,
  RebalancingSetTokenFactory,
  RebalancingTokenIssuanceModule,
  SetToken,
  SetTokenFactory,
  SignatureValidator,
  StandardTokenMock,
  StandardTokenWithFeeMock,
  TakerWalletWrapper,
  TimeLockUpgrade,
  TransferProxy,
  Vault,
  WethMock,
  WhiteList,
  ZeroExExchangeWrapper,
};

