import { BadTokenMock } from "./ts/BadTokenMock";
import { ConstantAuctionPriceCurve } from "./ts/ConstantAuctionPriceCurve";
import { Core } from "./ts/Core";
import { ERC20 } from "./ts/ERC20";
import { ERC20Detailed } from "./ts/ERC20Detailed";
import { ERC20Wrapper } from "./ts/ERC20Wrapper";
import { IAuctionPriceCurve } from "./ts/IAuctionPriceCurve";
import { InvalidReturnTokenMock } from "./ts/InvalidReturnTokenMock";
import { IssuanceOrderModule } from "./ts/IssuanceOrderModule"
import { KyberNetworkWrapper } from "./ts/KyberNetworkWrapper";
import { LinearAuctionPriceCurve } from "./ts/LinearAuctionPriceCurve";
import { NoDecimalTokenMock } from "./ts/NoDecimalTokenMock";
import { NoXferReturnTokenMock } from "./ts/NoXferReturnTokenMock";
import { OrderLibrary } from "./ts/OrderLibrary";
import { RebalanceAuctionModule } from "./ts/RebalanceAuctionModule";
import { RebalancingSetToken } from "./ts/RebalancingSetToken";
import { RebalancingSetTokenFactory } from "./ts/RebalancingSetTokenFactory";
import { SetToken } from "./ts/SetToken";
import { SetTokenFactory } from "./ts/SetTokenFactory";
import { SignatureValidator } from "./ts/SignatureValidator";
import { StandardTokenMock } from "./ts/StandardTokenMock";
import { StandardTokenWithFeeMock } from "./ts/StandardTokenWithFeeMock";
import { TakerWalletWrapper } from "./ts/TakerWalletWrapper";
import { TimeLockUpgrade } from "./ts/TimeLockUpgrade";
import { TransferProxy } from "./ts/TransferProxy";
import { Vault } from "./ts/Vault";
import { ZeroExExchangeWrapper } from "./ts/ZeroExExchangeWrapper";

// Export abi-gen contract wrappers
export {
  AuthorizableContract,
  BadTokenMockContract,
  BaseContract,
  Bytes32MockContract,
  CommonMathMockContract,
  ConstantAuctionPriceCurveContract,
  CoreContract,
  CoreMockContract,
  ERC20DetailedContract,
  ERC20WrapperMockContract,
  IAuctionPriceCurveContract,
  InvalidReturnTokenMockContract,
  IssuanceOrderModuleContract,
  KyberNetworkWrapperContract,
  LinearAuctionPriceCurveContract,
  NoDecimalTokenMockContract,
  NoXferReturnTokenMockContract,
  OrderLibraryMockContract,
  RebalanceAuctionModuleContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  SetTokenContract,
  SetTokenFactoryContract,
  SignatureValidatorContract,
  StandardTokenMockContract,
  StandardTokenWithFeeMockContract,
  TakerWalletWrapperContract,
  TimeLockUpgradeMockContract,
  TransferProxyContract,
  VaultContract,
  ZeroExExchangeWrapperContract,
  ZeroExOrderDataHandlerMockContract,
} from "../utils/contracts";

// Export contract artifacts
export {
  BadTokenMock,
  ConstantAuctionPriceCurve,
  Core,
  ERC20,
  ERC20Detailed,
  ERC20Wrapper,
  IAuctionPriceCurve,
  InvalidReturnTokenMock,
  IssuanceOrderModule,
  KyberNetworkWrapper,
  LinearAuctionPriceCurve,
  NoDecimalTokenMock,
  NoXferReturnTokenMock,
  OrderLibrary,
  RebalanceAuctionModule,
  RebalancingSetToken,
  RebalancingSetTokenFactory,
  SetToken,
  SetTokenFactory,
  SignatureValidator,
  StandardTokenMock,
  StandardTokenWithFeeMock,
  TakerWalletWrapper,
  TimeLockUpgrade,
  TransferProxy,
  Vault,
  ZeroExExchangeWrapper,
};

