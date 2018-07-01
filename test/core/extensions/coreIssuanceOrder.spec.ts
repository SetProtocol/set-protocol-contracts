import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";
import { ether } from "../../utils/units";

// Types
import { Address, IssuanceOrder } from "../../../types/common.js";

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
import {
  generateSalt,
  generateTimeStamp,
  hashOrderHex,
  signMessage
} from "../../utils/orderWrapper";

// Testing Set up
import { BigNumberSetup } from "../../config/bigNumberSetup";
import ChaiSetup from "../../config/chaiSetup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;

import {
  IssuanceComponentDeposited,
} from "../../logs/contracts/core";

import {
  assertTokenBalance,
  expectRevertError,
} from "../../utils/tokenAssertions";

import {
  DEPLOYED_TOKEN_QUANTITY,
  PRIVATE_KEYS,
} from "../../utils/constants";

contract("CoreIssuance", (accounts) => {
  const [
    ownerAccount,
    takerAccount,
    makerAccount,
    signerAccount,
    mockSetTokenAccount,
    mockTokenAccount
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    core = await coreWrapper.deployCoreAsync();
    vault = await coreWrapper.deployVaultAsync();
    transferProxy = await coreWrapper.deployTransferProxyAsync(vault.address);
    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync();
    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);
  });

  describe.only("#fillOrder", async () => {
    let subjectCaller: Address;
    let subjectQuantityToIssue: BigNumber;

    const naturalUnit: BigNumber = ether(2);
    let components: StandardTokenMockContract[] = [];
    let componentUnits: BigNumber[];
    let setToken: SetTokenContract;
    let signerAddress: Address;

    let addresses: Address[];
    let values: BigNumber[];
    let signature: any;

    beforeEach(async () => {
      signerAddress = signerAccount;

      components = await erc20Wrapper.deployTokensAsync(2, signerAddress); //For current purposes issue to maker/signer
      await erc20Wrapper.approveTransfersAsync(components, transferProxy.address, signerAddress);

      const componentAddresses = _.map(components, (token) => token.address);
      componentUnits = _.map(components, () => ether(4)); // Multiple of naturalUnit
      setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      subjectCaller = takerAccount;
      subjectQuantityToIssue = ether(2);

      const order = {
        setAddress: setToken.address,
        quantity: ether(4),
        makerAddress: signerAddress,
        makerToken: componentAddresses[0],
        makerTokenAmount: ether(10),
        expiration: generateTimeStamp(),
        relayerToken: componentAddresses[0],
        relayerTokenAmount: ether(1),
        salt: generateSalt()
      } as IssuanceOrder;

      addresses = [order.setAddress, order.makerAddress, order.makerToken, order.relayerToken];
      values = [order.quantity, order.makerTokenAmount, order.expiration, order.relayerTokenAmount, order.salt];

      const orderHash = hashOrderHex(order);
      signature = await signMessage(orderHash, signerAddress);
    });

    async function subject(): Promise<string> {
      return core.fillOrder.sendTransactionAsync(
        addresses,
        values,
        subjectQuantityToIssue,
        signature.v,
        signature.r,
        signature.s,
        { from: subjectCaller },
      );
    }

    it("transfers the required tokens from the user", async () => {
      const component: StandardTokenMockContract = _.first(components);
      const unit: BigNumber = _.first(componentUnits);

      const existingBalance = await component.balanceOf.callAsync(signerAddress);
      assertTokenBalance(component, DEPLOYED_TOKEN_QUANTITY, signerAddress);
      await subject();

      const newBalance = await component.balanceOf.callAsync(signerAddress);
      const expectedNewBalance = existingBalance.sub(subjectQuantityToIssue.div(naturalUnit).mul(unit));
      expect(newBalance).to.be.bignumber.equal(expectedNewBalance);
    });
  });
  describe("#validateSignature", async () => {
    let subjectCaller: Address;
    let subjectMaker: Address;
    let signerAddress: Address;

    let orderHash: string;
    let signature: any;

    beforeEach(async () => {

      subjectCaller = takerAccount;
      subjectMaker = signerAccount;
      signerAddress = signerAccount;

      const order = {
        setAddress: mockSetTokenAccount,
        quantity: ether(2),
        makerAddress: subjectMaker,
        makerToken: mockTokenAccount,
        makerTokenAmount: ether(10),
        expiration: generateTimeStamp(),
        relayerToken: mockTokenAccount,
        relayerTokenAmount: ether(1),
        salt: generateSalt()
      } as IssuanceOrder;

      orderHash = hashOrderHex(order);
      signature = await signMessage(orderHash, signerAddress);
    });

    async function subject(): Promise<boolean> {
      return core.validateSignature.callAsync(
        orderHash,
        subjectMaker,
        signature.v,
        signature.r,
        signature.s,
        { from: subjectCaller },
      );
    }

    it("should return true", async () => {
      const validSig = await subject();

      expect(validSig).to.equal(true);
    });
    describe("when the message is not signed by the maker", async () => {
      beforeEach(async () => {
        subjectMaker = makerAccount;
      });

      it("should return false", async () => {
        const validSig = await subject();

        expect(validSig).to.equal(false);
      });
    });
  });
  describe("#generateOrderHash", async () => {
    let subjectCaller: Address;

    let addresses: Address[];
    let values: BigNumber[];
    let orderHash: string;

    beforeEach(async () => {

      subjectCaller = takerAccount;

      const order = {
        setAddress: mockSetTokenAccount,
        quantity: ether(2),
        makerAddress: makerAccount,
        makerToken: mockTokenAccount,
        makerTokenAmount: ether(10),
        expiration: generateTimeStamp(),
        relayerToken: mockTokenAccount,
        relayerTokenAmount: ether(1),
        salt: generateSalt(),
      } as IssuanceOrder;

      orderHash = hashOrderHex(order);

      addresses = [order.setAddress, order.makerAddress, order.makerToken, order.relayerToken];
      values = [order.quantity, order.makerTokenAmount, order.expiration, order.relayerTokenAmount, order.salt];
    });

    async function subject(): Promise<string> {
      return core.generateOrderHash.callAsync(
        addresses,
        values,
        { from: subjectCaller },
      );
    }

    it("should return true", async () => {
      const contractOrderHash = await subject();

      expect(contractOrderHash).to.equal(orderHash);
    });
  });
});
