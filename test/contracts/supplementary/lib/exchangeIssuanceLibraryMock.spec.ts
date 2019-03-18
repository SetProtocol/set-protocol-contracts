require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as setProtocolUtils from 'set-protocol-utils';
import {
  Address,
} from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  ExchangeIssuanceLibraryMockContract,
  SetTokenContract,
  SetTokenFactoryContract,
  TransferProxyContract,
  VaultContract
} from '@utils/contracts';
import { ether } from '@utils/units';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';
import { ExchangeWrapper } from '@utils/wrappers/exchangeWrapper';
import { LibraryMockWrapper } from '@utils/wrappers/libraryMockWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const Core = artifacts.require('Core');
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const blockchain = new Blockchain(web3);
const { ZERO } = SetUtils.CONSTANTS;


contract('ExchangeIssuanceLibraryMock', accounts => {
  const [
    contractDeployer,
    otherAccount,
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let exchangeIssuanceLibraryMock: ExchangeIssuanceLibraryMockContract;
  let setTokenFactory: SetTokenFactoryContract;
  let setToken: SetTokenContract;

  const coreWrapper = new CoreWrapper(contractDeployer, contractDeployer);
  const erc20Wrapper = new ERC20Wrapper(contractDeployer);
  const exchangeWrapper = new ExchangeWrapper(contractDeployer);
  const libraryMockWrapper = new LibraryMockWrapper(contractDeployer);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    vault = await coreWrapper.deployVaultAsync();
    transferProxy = await coreWrapper.deployTransferProxyAsync();
    core = await coreWrapper.deployCoreAsync(transferProxy, vault);
    exchangeIssuanceLibraryMock = await libraryMockWrapper.deployExchangeIssuanceLibraryAsync();
    await coreWrapper.addModuleAsync(core, exchangeIssuanceLibraryMock.address);
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

  describe('#testValidateQuantity', async () => {
    let subjectSetAddress: Address;
    let subjectQuantity: BigNumber;

    beforeEach(async () => {
      subjectSetAddress = setToken.address;
      subjectQuantity = subjectQuantity || ether(4);
    });

    async function subject(): Promise<any> {
      return exchangeIssuanceLibraryMock.testValidateQuantity.callAsync(
        subjectSetAddress,
        subjectQuantity
      );
    }

    it('should not revert', async () => {
      await subject();
    });

    describe('when Set quantities is zero', async () => {
      beforeEach(async () => {
        subjectQuantity = ZERO;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#testValidateReceiveTokens', async () => {
    let subjectReceiveTokens: Address[];
    let subjectReceiveTokenAmounts: BigNumber[];

    beforeEach(async () => {
      subjectReceiveTokens = [otherAccount];
      subjectReceiveTokenAmounts = subjectReceiveTokenAmounts || [new BigNumber(1)];
    });

    async function subject(): Promise<any> {
      return exchangeIssuanceLibraryMock.testValidateReceiveTokens.callAsync(
        subjectReceiveTokens,
        subjectReceiveTokenAmounts
      );
    }

    it('should not revert', async () => {
      await subject();
    });

    describe('when send tokens has a duplicate', async () => {
      beforeEach(async () => {
        subjectReceiveTokens = [otherAccount, otherAccount];
        subjectReceiveTokenAmounts = [new BigNumber(1), new BigNumber(1)];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when send tokens is empty', async () => {
      beforeEach(async () => {
        subjectReceiveTokens = [];
        subjectReceiveTokenAmounts = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when send quantities quantities is zero', async () => {
      beforeEach(async () => {
        subjectReceiveTokenAmounts = [ZERO];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#testValidatePostExchangeReceiveTokenBalances', async () => {
    let subjectVault: Address;
    let subjectReceiveTokens: Address[];
    let subjectReceiveTokenAmounts: BigNumber[];
    let subjectUser: Address;

    beforeEach(async () => {
      subjectUser = otherAccount;

      // Deposit a token to the vault for the user
      const token = await erc20Wrapper.deployTokenAsync(otherAccount);

      const depositedQuantity  = new BigNumber(100);

      await erc20Wrapper.approveTransferAsync(
        token,
        transferProxy.address,
        otherAccount,
      );

      await core.deposit.sendTransactionAsync(
        token.address,
        depositedQuantity,
        { from: otherAccount }
      );

      subjectVault = vault.address;

      subjectReceiveTokens = subjectReceiveTokens || [token.address];
      subjectReceiveTokenAmounts = subjectReceiveTokenAmounts || [depositedQuantity];
    });

    async function subject(): Promise<any> {
      return exchangeIssuanceLibraryMock.testValidatePostExchangeReceiveTokenBalances.callAsync(
        subjectVault,
        subjectReceiveTokens,
        subjectReceiveTokenAmounts,
        subjectUser
      );
    }

    it('should not revert', async () => {
      await subject();
    });

    describe('when required balances does not exceed current vault balance', async () => {
      before(async () => {
        subjectReceiveTokenAmounts = [new BigNumber(1000)];
      });

      after(async () => {
       subjectReceiveTokenAmounts = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#testValidateSendTokenParams', async () => {
    let subjectCoreAddress: Address;
    let subjectSendTokenExchanges: BigNumber[];
    let subjectSendTokens: Address[];
    let subjectSendTokenAmounts: BigNumber[];

    beforeEach(async () => {
      subjectCoreAddress = core.address;

      subjectSendTokenExchanges = [new BigNumber(1)];
      subjectSendTokens = [otherAccount];
      subjectSendTokenAmounts = subjectSendTokenAmounts || [new BigNumber(1)];
    });

    async function subject(): Promise<any> {
      return exchangeIssuanceLibraryMock.testValidateSendTokenParams.callAsync(
        subjectCoreAddress,
        subjectSendTokenExchanges,
        subjectSendTokens,
        subjectSendTokenAmounts
      );
    }

    it('should not revert', async () => {
      await subject();
    });

    describe('when send tokens is empty', async () => {
      before(async () => {
        subjectSendTokenExchanges = [];
        subjectSendTokens = [];
        subjectSendTokenAmounts = [];
      });

      after(async () => {

        subjectSendTokenExchanges = undefined;
        subjectSendTokens = undefined;
        subjectSendTokenAmounts = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when send quantities quantities is zero', async () => {
      before(async () => {
        subjectSendTokenAmounts = [ZERO];
      });

      after(async () => {
       subjectSendTokenAmounts = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
