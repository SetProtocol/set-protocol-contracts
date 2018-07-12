import * as chai from "chai";
import * as _ from "lodash";
import * as ethUtil from "ethereumjs-util";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";

import { OrderWithoutExchangeAddress, Order, SignatureType } from '@0xproject/types';
import { assetProxyUtils, generatePseudoRandomSalt, orderHashUtils } from '@0xProject/order-utils';

import { injectInTruffle } from "sol-trace-set";
injectInTruffle(web3, artifacts);

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
} from "../../../utils/zeroExEncoding";

import {
  EXCHANGE_ADDRESS,
  ERC20_PROXY_ADDRESS,
} from "../../../utils/zeroExConstants";

import { 
  signMessageAsync,
} from "../../../utils/zeroExSigning";

import {
  getNumBytesFromHex,
  getNumBytesFromBuffer
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

    let makerAssetAmount: BigNumber;
    let takerAssetAmount: BigNumber;

    beforeEach(async () => {
      maker = accounts[0];

      // the amount the maker is selling in maker asset
      makerAssetAmount = new BigNumber(100);
      // the amount the maker is wanting in taker asset
      takerAssetAmount = new BigNumber(10);

      const makerAssetData = assetProxyUtils.encodeERC20AssetData(makerToken.address);
      const takerAssetData = assetProxyUtils.encodeERC20AssetData(takerToken.address);

      const tenMinutes = 10 * 60 * 1000;
      const randomExpiration = new BigNumber(Date.now() + tenMinutes);

      const order = {
        exchangeAddress: EXCHANGE_ADDRESS,
        makerAddress: maker,
        takerAddress: NULL_ADDRESS,
        senderAddress: NULL_ADDRESS,
        feeRecipientAddress: NULL_ADDRESS,
        expirationTimeSeconds: randomExpiration,
        salt: generatePseudoRandomSalt(),
        makerAssetAmount,
        takerAssetAmount,
        makerAssetData,
        takerAssetData,
        makerFee: ZERO,
        takerFee: ZERO,
      } as Order;

      const fillAmount = new BigNumber(10);

      const orderHashBuffer = orderHashUtils.getOrderHashBuffer(order);
      const orderHashHex = `0x${orderHashBuffer.toString('hex')}`;

      const signature = await signMessageAsync(orderHashHex, maker, SignatureType.EthSign);

      orderData = generateStandardZeroExOrderBytesArray(
        order,
        signature,
        fillAmount,
      );
    });

    async function subject(): Promise<any> {
      return zeroExExchangeWrapper.exchange.sendTransactionAsync(maker, orderData, { from: maker, gas: DEFAULT_GAS });
      // return zeroExExchangeWrapper.exchange.callAsync(maker, orderData);
    }

    it.only("should correctly parse the first order", async () => {
      await subject();
    });

    it("should have the correct taker token allowances to the 0x erc20 proxy", async () => {
      await subject();
      const takerTokenAllowance = await takerToken.allowance.callAsync(zeroExExchangeWrapper.address, ERC20_PROXY_ADDRESS);
      expect(takerTokenAllowance).to.bignumber.gt(new BigNumber(2**255));
    });

    it("should correctly fill a 0x order", async () => {
      await subject();
      
      const takerTokenMakerBalance = await makerToken.balanceOf.callAsync(zeroExExchangeWrapper.address);
      const makerTokenTakerBalance = await takerToken.balanceOf.callAsync(maker);

      expect(takerTokenMakerBalance).to.bignumber.equal(makerAssetAmount);
      expect(makerTokenTakerBalance).to.bignumber.equal(takerAssetAmount);
    });

    it("should have the correct maker token allowances to the Set Proxy", async () => {
      await subject();
      const makerTokenAllowance = await makerToken.allowance.callAsync(zeroExExchangeWrapper.address, transferProxy.address);
      expect(makerTokenAllowance).to.bignumber.gt(new BigNumber(2**255));
    });
  });
});
