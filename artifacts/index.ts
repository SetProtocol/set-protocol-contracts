import { BadTokenMock } from "./ts/BadTokenMock";
import { BasicToken } from "./ts/BasicToken";
import { Core } from "./ts/Core";
import { DetailedERC20 } from "./ts/DetailedERC20";
import { ERC20 } from "./ts/ERC20";
import { ERC20Basic } from "./ts/ERC20Basic";
import { ERC20Wrapper } from "./ts/ERC20Wrapper";
import { InvalidReturnTokenMock } from "./ts/InvalidReturnTokenMock";
import { NoDecimalTokenMock } from "./ts/NoDecimalTokenMock";
import { NoXferReturnTokenMock } from "./ts/NoXferReturnTokenMock";
import { OrderLibrary } from "./ts/OrderLibrary";
import { RebalancingSetToken } from "./ts/RebalancingSetToken";
import { RebalancingSetTokenFactory } from "./ts/RebalancingSetTokenFactory";
import { SetToken } from "./ts/SetToken";
import { SetTokenFactory } from "./ts/SetTokenFactory";
import { StandardToken } from "./ts/StandardToken";
import { StandardTokenMock } from "./ts/StandardTokenMock";
import { StandardTokenWithFeeMock } from "./ts/StandardTokenWithFeeMock";
import { TakerWalletWrapper } from "./ts/TakerWalletWrapper";
import { TransferProxy } from "./ts/TransferProxy";
import { Vault } from "./ts/Vault";
import { ZeroExExchangeWrapper } from "./ts/ZeroExExchangeWrapper";

// Export abi-gen contract wrappers
export {
  BaseContract,
  AuthorizableContract,
  BadTokenMockContract,
  Bytes32MockContract,
  CommonMathMockContract,
  CoreContract,
  CoreMockContract,
  DetailedERC20Contract,
  ERC20WrapperMockContract,
  InvalidReturnTokenMockContract,
  NoDecimalTokenMockContract,
  NoXferReturnTokenMockContract,
  OrderLibraryMockContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  StandardTokenWithFeeMockContract,
  TakerWalletWrapperContract,
  TransferProxyContract,
  VaultContract,
  ZeroExExchangeWrapperContract,
  ZeroExOrderDataHandlerMockContract,
} from "../utils/contracts";

// Export contract artifacts
export {
  BadTokenMock,
  BasicToken,
  Core,
  DetailedERC20,
  ERC20,
  ERC20Basic,
  ERC20Wrapper,
  InvalidReturnTokenMock,
  OrderLibrary,
  RebalancingSetToken,
  RebalancingSetTokenFactory,
  SetToken,
  SetTokenFactory,
  StandardToken,
  StandardTokenMock,
  StandardTokenWithFeeMock,
  TakerWalletWrapper,
  TransferProxy,
  Vault,
  ZeroExExchangeWrapper,
};

