import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";
import { ether } from "../../utils/units";

// Types
import { Address, Log } from "../../../types/common.js";

// Contract types
import { CoreContract } from "../../../types/generated/core";
import { SetTokenContract } from "../../../types/generated/set_token";
import { SetTokenFactoryContract } from "../../../types/generated/set_token_factory";
import { StandardTokenMockContract } from "../../../types/generated/standard_token_mock";
import { TransferProxyContract } from "../../../types/generated/transfer_proxy";
import { VaultContract } from "../../../types/generated/vault";

// Artifacts
const Core = artifacts.require("Core");

// Core wrapper
import { CoreWrapper } from "../../utils/coreWrapper";
import { ERC20Wrapper } from "../../utils/erc20Wrapper";

// Testing Set up
import { BigNumberSetup } from "../../config/bigNumberSetup";
import ChaiSetup from "../../config/chaiSetup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;

import { getFormattedLogsFromTxHash } from "../../logs/logUtils";
import {
  extractNewSetTokenAddressFromLogs,
  IssuanceComponentDeposited,
} from "../../logs/contracts/core";

import {
  assertTokenBalance,
  expectRevertError,
} from "../../utils/tokenAssertions";

import {
  DEFAULT_GAS,
  DEPLOYED_TOKEN_QUANTITY,
  NULL_ADDRESS,
  ZERO,
} from "../../utils/constants";

import {
  assertLogEquivalence,
} from "../../logs/logAssertions";

// contract("CoreIssuance", (accounts) => {
//   const [
//     ownerAccount
//     takerAccount,
//     makerAccount,
//     unauthorizedAccount,
//   ] = accounts;

//   let core: CoreContract;
//   let transferProxy: TransferProxyContract;
//   let vault: VaultContract;
//   let setTokenFactory: SetTokenFactoryContract;

//   const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
//   const erc20Wrapper = new ERC20Wrapper(takerAccount);

//   before(async () => {
//     ABIDecoder.addABI(Core.abi);
//   });

//   after(async () => {
//     ABIDecoder.removeABI(Core.abi);
//   });

//   beforeEach(async () => {
//     core = await coreWrapper.deployCoreAsync();
//     vault = await coreWrapper.deployVaultAsync();
//     transferProxy = await coreWrapper.deployTransferProxyAsync(vault.address);
//     setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync();
//     await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);
//   });

//   describe("#fillOrder", async () => {
//     let subjectCaller: Address;
//     let subjectQuantityToIssue: BigNumber;
//     let subjectSetToIssue: Address;

//     const naturalUnit: BigNumber = ether(2);
//     let components: StandardTokenMockContract[] = [];
//     let componentUnits: BigNumber[];
//     let setToken: SetTokenContract;

//     beforeEach(async () => {
//       components = await erc20Wrapper.deployTokensAsync(2, ownerAccount);
//       await erc20Wrapper.approveTransfersAsync(components, transferProxy.address);

//       const componentAddresses = _.map(components, (token) => token.address);
//       componentUnits = _.map(components, () => ether(4)); // Multiple of naturalUnit
//       setToken = await coreWrapper.createSetTokenAsync(
//         core,
//         setTokenFactory.address,
//         componentAddresses,
//         componentUnits,
//         naturalUnit,
//       );

//       subjectCaller = ownerAccount;
//       subjectQuantityToIssue = ether(2);
//       subjectSetToIssue = setToken.address;
//     });

//     async function subject(): Promise<string> {
//       return core.fillOrder.sendTransactionAsync(
//         subjectSetToIssue,
//         subjectQuantityToIssue,
//         { from: ownerAccount },
//       );
//     }

//     it()
//   });
// });
