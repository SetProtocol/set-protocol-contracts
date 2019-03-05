import { BadTokenMock } from "./ts/BadTokenMock";
import { BTCETHRebalancingManager } from "./ts/BTCETHRebalancingManager";
import { ConstantAuctionPriceCurve } from "./ts/ConstantAuctionPriceCurve";
import { Core } from "./ts/Core";
import { CoreIssuanceLibrary } from "./ts/CoreIssuanceLibrary";
import { ERC20 } from "./ts/ERC20";
import { ERC20Detailed } from "./ts/ERC20Detailed";
import { ERC20Wrapper } from "./ts/ERC20Wrapper";
import { ETHDaiRebalancingManager } from "./ts/ETHDaiRebalancingManager";
import { ExchangeIssuanceModule } from "./ts/ExchangeIssuanceModule";
import { IAuctionPriceCurve } from "./ts/IAuctionPriceCurve";
import { InvalidReturnTokenMock } from "./ts/InvalidReturnTokenMock";
import { KyberNetworkWrapper } from "./ts/KyberNetworkWrapper";
import { LinearAuctionPriceCurve } from "./ts/LinearAuctionPriceCurve";
import { Median } from "./ts/Median";
import { NoDecimalTokenMock } from "./ts/NoDecimalTokenMock";
import { NoXferReturnTokenMock } from "./ts/NoXferReturnTokenMock";
import { PayableExchangeIssuance } from "./ts/PayableExchangeIssuance";
import { RebalanceAuctionModule } from "./ts/RebalanceAuctionModule";
import { RebalancingHelperLibrary } from "./ts/RebalancingHelperLibrary";
import { RebalancingSetToken } from "./ts/RebalancingSetToken";
import { RebalancingSetTokenFactory } from "./ts/RebalancingSetTokenFactory";
import { RebalancingTokenIssuanceModule } from "./ts/RebalancingTokenIssuanceModule";
import { SetToken } from "./ts/SetToken";
import { SetTokenFactory } from "./ts/SetTokenFactory";
import { StandardFailAuctionLibrary } from "./ts/StandardFailAuctionLibrary";
import { StandardPlaceBidLibrary } from "./ts/StandardPlaceBidLibrary";
import { StandardProposeLibrary } from "./ts/StandardProposeLibrary";
import { StandardSettleRebalanceLibrary } from "./ts/StandardSettleRebalanceLibrary";
import { StandardStartRebalanceLibrary } from "./ts/StandardStartRebalanceLibrary";
import { StandardTokenMock } from "./ts/StandardTokenMock";
import { StandardTokenWithFeeMock } from "./ts/StandardTokenWithFeeMock";
import { TimeLockUpgrade } from "./ts/TimeLockUpgrade";
import { TransferProxy } from "./ts/TransferProxy";
import { Vault } from "./ts/Vault";
import { WethMock } from "./ts/WethMock";
import { WhiteList } from "./ts/WhiteList";
import { ZeroExExchangeWrapper } from "./ts/ZeroExExchangeWrapper";

import { outputs } from "./outputs";

// Export abi-gen contract wrappers
export {
  AuthorizableContract,
  BadTokenMockContract,
  BaseContract,
  BTCETHRebalancingManagerContract,
  Bytes32MockContract,
  CommonMathMockContract,
  ConstantAuctionPriceCurveContract,
  CoreContract,
  CoreIssuanceLibraryContract,
  CoreMockContract,
  ERC20DetailedContract,
  ERC20WrapperMockContract,
  ETHDaiRebalancingManagerContract,
  ExchangeIssuanceModuleContract,
  IAuctionPriceCurveContract,
  InvalidReturnTokenMockContract,
  KyberNetworkWrapperContract,
  LinearAuctionPriceCurveContract,
  MedianContract,
  NoDecimalTokenMockContract,
  NoXferReturnTokenMockContract,
  PayableExchangeIssuanceContract,
  RebalanceAuctionModuleContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  RebalancingTokenIssuanceModuleContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  StandardTokenWithFeeMockContract,
  TimeLockUpgradeContract,
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
  CoreIssuanceLibrary,
  ERC20,
  ERC20Detailed,
  ERC20Wrapper,
  ETHDaiRebalancingManager,
  ExchangeIssuanceModule,
  IAuctionPriceCurve,
  InvalidReturnTokenMock,
  KyberNetworkWrapper,
  LinearAuctionPriceCurve,
  Median,
  NoDecimalTokenMock,
  NoXferReturnTokenMock,
  PayableExchangeIssuance,
  RebalanceAuctionModule,
  RebalancingHelperLibrary,
  RebalancingSetToken,
  RebalancingSetTokenFactory,
  RebalancingTokenIssuanceModule,
  SetToken,
  SetTokenFactory,
  StandardFailAuctionLibrary,
  StandardPlaceBidLibrary,
  StandardProposeLibrary,
  StandardSettleRebalanceLibrary,
  StandardStartRebalanceLibrary,
  StandardTokenMock,
  StandardTokenWithFeeMock,
  TimeLockUpgrade,
  TransferProxy,
  Vault,
  WethMock,
  WhiteList,
  ZeroExExchangeWrapper,
};

// Export the contract addresses
export {
  outputs as Deployments
};