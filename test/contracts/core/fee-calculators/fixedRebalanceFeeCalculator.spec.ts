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
  FeeCalculatorMockContract,
  FixedRebalanceFeeCalculatorContract,
  SetTokenFactoryContract,
  TransferProxyContract,
  VaultContract,
} from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { getWeb3, txnFrom } from '@utils/web3Helper';
import { ether } from '@utils/units';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { FeeCalculatorHelper } from '@utils/helpers/feeCalculatorHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);
const Core = artifacts.require('Core');
const FixedRebalanceFeeCalculator = artifacts.require('FixedRebalanceFeeCalculator');

contract('FixedRebalanceFeeCalculator', accounts => {
  const [
    ownerAccount,
  ] = accounts;

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let setTokenFactory: SetTokenFactoryContract;
  let vault: VaultContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const feeCalculatorHelper = new FeeCalculatorHelper(ownerAccount);

  let feeCalculator: FixedRebalanceFeeCalculatorContract;
  let feeCalculatorMock: FeeCalculatorMockContract;

  before(async () => {
    ABIDecoder.addABI(Core.abi);
    ABIDecoder.addABI(FixedRebalanceFeeCalculator.abi);

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    coreMock = await coreHelper.deployCoreMockAsync(transferProxy, vault);

    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(coreMock.address);

    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, setTokenFactory);

    feeCalculator = await feeCalculatorHelper.deployFixedRebalanceFeeCalculatorAsync(coreMock.address);
    feeCalculatorMock = await feeCalculatorHelper.deployFeeCalculatorMockAsync();
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

    let feeQuantity: BigNumber;
    let customFeeQuantity: BigNumber;

    beforeEach(async () => {
      subjectCaller = ownerAccount;

      await coreMock.addSet.sendTransactionAsync(ownerAccount, txnFrom(ownerAccount));

      feeQuantity = customFeeQuantity || ether(1);
      subjectCalculatorData = feeCalculatorHelper.generateFixedRebalanceFeeCallData(feeQuantity);
    });

    async function subject(): Promise<any> {
      return feeCalculator.initialize.sendTransactionAsync(subjectCalculatorData, txnFrom(subjectCaller));
    }

    it('sets the rebalance fee correctly', async () => {
      await subject();

      const feeValue = await feeCalculator.fees.callAsync(ownerAccount);
      expect(feeValue).to.bignumber.equal(ether(1));
    });

    describe('when the fee is greater than 100%', async () => {
      before(async () => {
        customFeeQuantity = ether(2);
      });

      after(async () => {
        customFeeQuantity = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the fee is not a multiple of 0.1%', async () => {
      before(async () => {
        const ONE_TENTH_BASIS_POINT = new BigNumber(10 ** 13);

        customFeeQuantity = ether(1).div(100).plus(ONE_TENTH_BASIS_POINT);
      });

      after(async () => {
        customFeeQuantity = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#getFee', async () => {
    let feeQuantity: BigNumber;

    beforeEach(async () => {
      await coreMock.addSet.sendTransactionAsync(feeCalculatorMock.address, txnFrom(ownerAccount));

      feeQuantity = ether(1);
      const feeData = feeCalculatorHelper.generateFixedRebalanceFeeCallData(feeQuantity);
      await feeCalculatorMock.testInitialize.sendTransactionAsync(
        feeCalculator.address,
        feeData,
        txnFrom(ownerAccount)
      );
    });

    async function subject(): Promise<BigNumber> {
      return feeCalculatorMock.testGetFee.callAsync(feeCalculator.address);
    }

    it('returns the correct fee', async () => {
      const fee = await subject();

      expect(fee).to.bignumber.equal(feeQuantity);
    });

    describe('when the caller is not a valid Set', async () => {
      beforeEach(async () => {
        await coreMock.disableSet.sendTransactionAsync(feeCalculatorMock.address, txnFrom(ownerAccount));
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});