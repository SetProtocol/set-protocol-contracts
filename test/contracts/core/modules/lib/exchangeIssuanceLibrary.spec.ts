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

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { ExchangeHelper } from '@utils/helpers/exchangeHelper';
import { LibraryMockHelper } from '@utils/helpers/libraryMockHelper';
import { KyberNetworkHelper } from '@utils/helpers/kyberNetworkHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const blockchain = new Blockchain(web3);
const { ZERO } = SetUtils.CONSTANTS;


contract('ExchangeIssuanceLibrary', accounts => {
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

  const coreHelper = new CoreHelper(contractDeployer, contractDeployer);
  const erc20Helper = new ERC20Helper(contractDeployer);
  const exchangeHelper = new ExchangeHelper(contractDeployer);
  const libraryMockHelper = new LibraryMockHelper(contractDeployer);
  const kyberNetworkHelper = new KyberNetworkHelper();

  before(async () => {
    ABIDecoder.addABI(CoreContract.getAbi());
  });

  after(async () => {
    ABIDecoder.removeABI(CoreContract.getAbi());
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    vault = await coreHelper.deployVaultAsync();
    transferProxy = await coreHelper.deployTransferProxyAsync();
    core = await coreHelper.deployCoreAsync(transferProxy, vault);
    exchangeIssuanceLibraryMock = await libraryMockHelper.deployExchangeIssuanceLibraryAsync();
    await coreHelper.addModuleAsync(core, exchangeIssuanceLibraryMock.address);
    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(core.address);

    await coreHelper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

    const firstComponent = await erc20Helper.deployTokenAsync(contractDeployer);

    const componentTokens = [firstComponent];
    const setComponentUnit = ether(4);
    const componentAddresses = componentTokens.map(token => token.address);
    const componentUnits = componentTokens.map(token => setComponentUnit);
    const naturalUnit = ether(2);

    setToken = await coreHelper.createSetTokenAsync(
      core,
      setTokenFactory.address,
      componentAddresses,
      componentUnits,
      naturalUnit,
    );

    await exchangeHelper.deployAndAuthorizeZeroExExchangeWrapper(
      core,
      SetTestUtils.ZERO_EX_EXCHANGE_ADDRESS,
      SetTestUtils.ZERO_EX_ERC20_PROXY_ADDRESS,
      SetTestUtils.ZERO_EX_TOKEN_ADDRESS,
      transferProxy
    );
    await exchangeHelper.deployAndAuthorizeKyberNetworkWrapper(
      core,
      kyberNetworkHelper.kyberNetworkProxy,
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

    describe('when the quantity is not a multiple of the natural unit', async () => {
      beforeEach(async () => {
        subjectQuantity = ether(3);
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

    describe('when receive tokens has a duplicate', async () => {
      beforeEach(async () => {
        subjectReceiveTokens = [otherAccount, otherAccount];
        subjectReceiveTokenAmounts = [new BigNumber(1), new BigNumber(1)];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when receive tokens is empty', async () => {
      beforeEach(async () => {
        subjectReceiveTokens = [];
        subjectReceiveTokenAmounts = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when receive quantities quantities is zero', async () => {
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
      const token = await erc20Helper.deployTokenAsync(otherAccount);

      const depositedQuantity  = new BigNumber(100);

      await erc20Helper.approveTransferAsync(
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
      beforeEach(async () => {
        subjectReceiveTokenAmounts = [new BigNumber(1000)];
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

      subjectSendTokenExchanges = [new BigNumber(1), new BigNumber(2)];
      subjectSendTokens = [otherAccount, otherAccount];
      subjectSendTokenAmounts = [new BigNumber(1), new BigNumber(1)];
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
      beforeEach(async () => {
        subjectSendTokenExchanges = [];
        subjectSendTokens = [];
        subjectSendTokenAmounts = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when send token amounts is uneven', async () => {
      beforeEach(async () => {
        subjectSendTokenAmounts = [new BigNumber(1)];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when send token exchange ids length is uneven', async () => {
      beforeEach(async () => {
        subjectSendTokenExchanges = [new BigNumber(1)];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when send token exchange id is invalid', async () => {
      beforeEach(async () => {
        subjectSendTokenExchanges = [new BigNumber(1), new BigNumber(4)];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when send token quantities is zero', async () => {
      beforeEach(async () => {
        subjectSendTokenAmounts = [new BigNumber(1), ZERO];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
