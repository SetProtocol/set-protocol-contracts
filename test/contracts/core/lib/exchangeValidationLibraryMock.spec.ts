require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import {
  Address,
  Bytes,
  ExchangeIssueParams,
  KyberTrade,
  ZeroExSignedFillOrder
} from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  ExchangeValidationLibraryMockContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract
} from '@utils/contracts';
import { ether } from '@utils/units';
import { assertTokenBalanceAsync, expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { DEFAULT_GAS, DEPLOYED_TOKEN_QUANTITY, KYBER_RESERVE_CONFIGURED_RATE } from '@utils/constants';
import { generateOrdersDataWithIncorrectExchange } from '@utils/orders';
import { getWeb3 } from '@utils/web3Helper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';
import { ExchangeWrapper } from '@utils/wrappers/exchangeWrapper';
import { LibraryMockWrapper } from '@utils/wrappers/libraryMockWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const Core = artifacts.require('Core');
const ExchangeIssueModule = artifacts.require('ExchangeIssueModule');
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const blockchain = new Blockchain(web3);
const setTestUtils = new SetTestUtils(web3);
const setUtils = new SetUtils(web3);
const { expect } = chai;
const { NULL_ADDRESS, ZERO } = SetUtils.CONSTANTS;


contract('ExchangeValidationLibraryMock', accounts => {
  const [
    contractDeployer,
    otherAccount,
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let exchangeValidationLibraryMock: ExchangeValidationLibraryMockContract;
  let setTokenFactory: SetTokenFactoryContract;
  let setToken: SetTokenContract;

  const coreWrapper = new CoreWrapper(contractDeployer, contractDeployer);
  const erc20Wrapper = new ERC20Wrapper(contractDeployer);
  const exchangeWrapper = new ExchangeWrapper(contractDeployer);
  const libraryMockWrapper = new LibraryMockWrapper(contractDeployer);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
    ABIDecoder.addABI(ExchangeIssueModule.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
    ABIDecoder.removeABI(ExchangeIssueModule.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    vault = await coreWrapper.deployVaultAsync();
    transferProxy = await coreWrapper.deployTransferProxyAsync();
    core = await coreWrapper.deployCoreAsync(transferProxy, vault);
    exchangeValidationLibraryMock = await libraryMockWrapper.deployExchangeValidationLibraryAsync();
    await coreWrapper.addModuleAsync(core, exchangeValidationLibraryMock.address);
    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);

    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

    const firstComponent = await erc20Wrapper.deployTokenAsync(contractDeployer);

    const componentTokens = [firstComponent];
    const setComponentUnit = ether(4);
    const componentAddresses = componentTokens.map(token => token.address);
    const componentUnits = componentTokens.map(token => setComponentUnit);
    const naturalUnit = ether(2);

    setToken = await coreWrapper.createSetTokenAsync(
      core,
      setTokenFactory.address,
      componentAddresses,
      componentUnits,
      naturalUnit,
    );

    await exchangeWrapper.deployAndAuthorizeZeroExExchangeWrapper(
      core,
      SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,
      SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
      SetTestUtils.ZERO_EX_TOKEN_ADDRESS,
      transferProxy
    );
    await exchangeWrapper.deployAndAuthorizeKyberNetworkWrapper(
      core,
      SetTestUtils.KYBER_NETWORK_PROXY_ADDRESS,
      transferProxy
    );
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#testValidateIssueQuantity', async () => {
    let subjectSetAddress: Address;
    let subjectQuantity: BigNumber;

    beforeEach(async () => {
      subjectSetAddress = setToken.address;
      subjectQuantity = subjectQuantity || ether(4);
    });

    async function subject(): Promise<any> {
      return exchangeValidationLibraryMock.testValidateIssueQuantity.callAsync(
        subjectSetAddress,
        subjectQuantity
      );
    }

    it('should not revert', async () => {
      await subject();

      expect(1).to.equal(1);
    });

    describe('when Set quantities is zero', async () => {
      before(async () => {
        subjectQuantity = ZERO;
      });

     after(async () => {
       subjectQuantity = undefined;
     });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#testValidateSentTokenParams', async () => {
    let subjectCoreAddress: Address;
    let subjectSentTokenExchanges: BigNumber[];
    let subjectSentTokens: Address[];
    let subjectSentTokenAmounts: BigNumber[];

    beforeEach(async () => {
      subjectCoreAddress = core.address;

      subjectSentTokenExchanges = subjectSentTokenExchanges || [new BigNumber(1)];
      subjectSentTokens = subjectSentTokens || [otherAccount];
      subjectSentTokenAmounts = subjectSentTokenAmounts || [new BigNumber(1)];
    });

    async function subject(): Promise<any> {
      return exchangeValidationLibraryMock.testValidateSentTokenParams.callAsync(
        subjectCoreAddress,
        subjectSentTokenExchanges,
        subjectSentTokens,
        subjectSentTokenAmounts
      );
    }

    it('should not revert', async () => {
      await subject();

      expect(1).to.equal(1);
    });

    describe('when sent quantities quantities is zero', async () => {
      before(async () => {
        subjectSentTokenAmounts = [ZERO];
      });

     after(async () => {
       subjectSentTokenAmounts = undefined;
     });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
