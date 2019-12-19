require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as _ from 'lodash';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreMockContract,
  FixedRebalanceFeeCalculatorContract,
  SetTokenFactoryContract,
  TransferProxyContract,
  VaultContract,
} from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { getWeb3, txnFrom } from '@utils/web3Helper';
import {
  DEFAULT_GAS,
} from '@utils/constants';
import { ether, gWei } from '@utils/units';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { FeeCalculatorHelper } from '@utils/helpers/feeCalculatorHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);
const Core = artifacts.require('Core');
const FixedRebalanceFeeCalculator = artifacts.require('FixedRebalanceFeeCalculator');

contract('Auction', accounts => {
  const [
    ownerAccount,
    functionCaller,
  ] = accounts;

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let setTokenFactory: SetTokenFactoryContract;
  let vault: VaultContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const feeCalculatorHelper = new FeeCalculatorHelper(ownerAccount);

  let feeCalculator: FixedRebalanceFeeCalculatorContract;

  before(async () => {
    ABIDecoder.addABI(Core.abi);
    ABIDecoder.addABI(FixedRebalanceFeeCalculator.abi);

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    coreMock = await coreHelper.deployCoreMockAsync(transferProxy, vault);

    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(coreMock.address);

    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, setTokenFactory);

    feeCalculator = await feeCalculatorHelper.deployFixedRebalanceFeeCalculatorAsync(coreMock.address);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
    ABIDecoder.removeABI(FixedRebalanceFeeCalculator.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    let feeCalculatorDeployed: FixedRebalanceFeeCalculatorContract;

    let subjectCore: Address;

    beforeEach(async () => {
      subjectCore = coreMock.address;
    });

    async function subject(): Promise<any> {
      return feeCalculatorHelper.deployFixedRebalanceFeeCalculatorAsync(subjectCore);
    }

    it('sets the correct core', async () => {
      feeCalculatorDeployed = await subject();

      const actualOracleWhiteList = await feeCalculatorDeployed.core.callAsync();
      expect(actualOracleWhiteList).to.bignumber.equal(coreMock.address);
    });
  });

  describe('#initialize', async () => {
    let subjectCaller: Address;
    let subjectCalculatorData: string;

    beforeEach(async () => {
      subjectCaller = ownerAccount;

      await coreMock.addSet.sendTransactionAsync(ownerAccount, txnFrom(ownerAccount));

      const valueEncodedBytes = web3.utils.padLeft(web3.utils.numberToHex(ether(1).toString()), 64);

      subjectCalculatorData = valueEncodedBytes;
    });

    async function subject(): Promise<any> {
      return feeCalculator.initialize.sendTransactionAsync(subjectCalculatorData, txnFrom(subjectCaller));
    }

    it('sets the rebalance fee correctly', async () => {
      await subject();

      const feeValue = await feeCalculator.fees.callAsync(ownerAccount);
      expect(feeValue).to.bignumber.equal(ether(1));
    });
  });



});