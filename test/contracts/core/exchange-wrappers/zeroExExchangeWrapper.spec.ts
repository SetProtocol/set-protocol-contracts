import * as chai from "chai";
import * as _ from "lodash";
import * as ethUtil from "ethereumjs-util";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";

import { OrderWithoutExchangeAddress, Order, SignatureType } from '@0xproject/types';
import { assetProxyUtils, generatePseudoRandomSalt } from '@0xProject/order-utils';

// import { injectInTruffle } from "sol-trace-set";
// injectInTruffle(web3, artifacts);

// Types
import { Address, Bytes32, Log, UInt, Bytes } from "../../../../types/common.js";
import { ZeroExOrderHeader } from "../../../../types/zeroEx";

// Contract types
import { CoreContract } from "../../../../types/generated/core";
import { StandardTokenMockContract } from "../../../../types/generated/standard_token_mock";
import { VaultContract } from "../../../../types/generated/vault";
import { TransferProxyContract } from "../../../../types/generated/transfer_proxy";
import { ZeroExExchangeWrapperContract } from "../../../../types/generated/zero_ex_exchange_wrapper";

// Artifacts
const ZeroExExchangeWrapper = artifacts.require("ZeroExExchangeWrapper");

// Core wrapper
import { CoreWrapper } from "../../../utils/coreWrapper";
import { ERC20Wrapper } from "../../../utils/erc20Wrapper";

import {
  bufferZeroExOrder,
  generateStandardZeroExOrderBytesArray,
  generateNumOrderBytesArray,
} from "../../../utils/zeroExEncoding";

import {
  EXCHANGE_ADDRESS,
  ERC20_PROXY_ADDRESS,
} from "../../../utils/zeroExConstants";

import { 
  signZeroExOrerAsync,
} from "../../../utils/zeroExSigning";

import { 
  generateStandardZeroExOrder,
} from "../../../utils/zeroExOrder";

import {
  getNumBytesFromHex,
  getNumBytesFromBuffer,
  removeHexPrefix,
  concatBytes,
} from "../../../utils/encoding";

import {
  DEFAULT_GAS,
  NULL_ADDRESS,
  ZERO,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
} from "../../../utils/constants";

// Testing Set up
import { BigNumberSetup } from "../../../utils/bigNumberSetup";
import ChaiSetup from "../../../utils/chaiSetup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;
 
contract("ZeroExExchangeWrapper", (accounts) => {
  const [ownerAccount, takerAddress, feeRecipientAddress, senderAddress] = accounts;
  
  let zeroExExchangeWrapper: ZeroExExchangeWrapperContract;
  let core: CoreContract;
  let vault: VaultContract;
  let transferProxy: TransferProxyContract;
  let makerToken: StandardTokenMockContract;
  let takerToken: StandardTokenMockContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);

  beforeEach(async () => {
    transferProxy = await coreWrapper.deployTransferProxyAsync();

    const zeroExExchangeWrapperInstance = await ZeroExExchangeWrapper.new(
      EXCHANGE_ADDRESS,
      ERC20_PROXY_ADDRESS,
      transferProxy.address,
      { from: ownerAccount, gas: DEFAULT_GAS },
    );

    zeroExExchangeWrapper = new ZeroExExchangeWrapperContract(
      web3.eth.contract(zeroExExchangeWrapperInstance.abi).at(zeroExExchangeWrapperInstance.address),
      { from: ownerAccount },
    );

    makerToken = await erc20Wrapper.deployTokenAsync(ownerAccount);
    takerToken = await erc20Wrapper.deployTokenAsync(zeroExExchangeWrapper.address);

    // Approve maker Token from owner to proxy
    await erc20Wrapper.approveTransferAsync(makerToken, ERC20_PROXY_ADDRESS, ownerAccount);
  });

  describe("#exchange", async () => {
    let orderData: Bytes;
    let maker: Address;
    let numOrders: BigNumber;

    let makerAssetAmount1: BigNumber;
    let takerAssetAmount1: BigNumber;
    let makerAssetAmount2: BigNumber;
    let takerAssetAmount2: BigNumber;

    beforeEach(async () => {
      maker = accounts[0];

      numOrders = new BigNumber(2);

      makerAssetAmount1 = new BigNumber(100);
      makerAssetAmount2 = new BigNumber(50);
      takerAssetAmount1 = new BigNumber(10);
      takerAssetAmount2 = new BigNumber(5);

      const order1: Order = generateStandardZeroExOrder(
        maker,
        makerToken.address,
        takerToken.address,
        makerAssetAmount1,
        takerAssetAmount1,
      );

      const order2: Order = generateStandardZeroExOrder(
        maker,
        makerToken.address,
        takerToken.address,
        makerAssetAmount2,
        takerAssetAmount2,
      );

      const fillAmount1 = new BigNumber(10);
      const fillAmount2 = new BigNumber(5);

      const signature1 = await signZeroExOrerAsync(order1);
      const signature2 = await signZeroExOrerAsync(order2);

      const orderDataHeader = generateNumOrderBytesArray(numOrders);

      const orderData1 = generateStandardZeroExOrderBytesArray(
        order1,
        signature1,
        fillAmount1,
      );

      const orderData2 = generateStandardZeroExOrderBytesArray(
        order2,
        signature2,
        fillAmount2,
      );

      orderData = concatBytes([orderDataHeader, orderData1, orderData2]);
    });

    

    describe("when not checking return values", async () => {
      async function subject(): Promise<any> {
        return zeroExExchangeWrapper.exchange.sendTransactionAsync(maker, orderData, { from: maker, gas: DEFAULT_GAS });
      }

      it("should have the correct taker token allowances to the 0x erc20 proxy", async () => {
        await subject();
        const takerTokenAllowance = await takerToken.allowance.callAsync(zeroExExchangeWrapper.address, ERC20_PROXY_ADDRESS);
        expect(takerTokenAllowance).to.bignumber.gt(new BigNumber(2**255));
      });

      it("should correctly fill a 0x order", async () => {
        await subject();
        
        const takerTokenMakerBalance = await makerToken.balanceOf.callAsync(zeroExExchangeWrapper.address);
        const makerTokenTakerBalance = await takerToken.balanceOf.callAsync(maker);

        const expectedMakerAssetAmount = makerAssetAmount1.add(makerAssetAmount2);
        const expectedTakerAssetAmount = takerAssetAmount1.add(takerAssetAmount2);

        expect(takerTokenMakerBalance).to.bignumber.equal(expectedMakerAssetAmount);
        expect(makerTokenTakerBalance).to.bignumber.equal(expectedTakerAssetAmount);
      });

      it("should have the correct maker token allowances to the Set Proxy", async () => {
        await subject();
        const makerTokenAllowance = await makerToken.allowance.callAsync(zeroExExchangeWrapper.address, transferProxy.address);
        expect(makerTokenAllowance).to.bignumber.gt(new BigNumber(2**255));
      });
    });

    describe("when checking return values", async () => {
      async function subject(): Promise<any> {
        return zeroExExchangeWrapper.exchange.callAsync(maker, orderData);
      }

      it("should correctly return the fill Results", async () => {
        const [takerTokens, takerAmounts] = await subject();

        expect(takerTokens[0]).to.equal(takerToken.address);
        expect(takerTokens[1]).to.equal(takerToken.address);

        expect(takerAmounts[0]).to.bignumber.equal(takerAssetAmount1);
        expect(takerAmounts[1]).to.bignumber.equal(takerAssetAmount2);
      });
    });
  });
});
