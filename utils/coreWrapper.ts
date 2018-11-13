import * as _ from 'lodash';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';

import {
  AuthorizableContract,
  CoreContract,
  CoreMockContract,
  EIP712LibraryMockContract,
  OrderLibraryMockContract,
  SetTokenContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  SetTokenFactoryContract,
  SignatureValidatorContract,
  TransferProxyContract,
  VaultContract
} from './contracts';
import { BigNumber } from 'bignumber.js';
import { DEFAULT_GAS, ONE_DAY_IN_SECONDS } from './constants';
import { extractNewSetTokenAddressFromLogs } from './contract_logs/core';
import {
  getWeb3,
} from './web3Helper';

const web3 = getWeb3();

const Authorizable = artifacts.require('Authorizable');
const Core = artifacts.require('Core');
const CoreMock = artifacts.require('CoreMock');
const EIP712Library = artifacts.require('EIP712Library');
const EIP712LibraryMock = artifacts.require('EIP712LibraryMock');
const ERC20Wrapper = artifacts.require('ERC20Wrapper');
const OrderLibrary = artifacts.require('OrderLibrary');
const OrderLibraryMock = artifacts.require('OrderLibraryMock');
const RebalancingSetTokenFactory = artifacts.require('RebalancingSetTokenFactory');
const SetToken = artifacts.require('SetToken');
const SetTokenFactory = artifacts.require('SetTokenFactory');
const SignatureValidator = artifacts.require('SignatureValidator');
const TransferProxy = artifacts.require('TransferProxy');
const Vault = artifacts.require('Vault');

declare type CoreLikeContract = CoreMockContract | CoreContract;
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);


export class CoreWrapper {
  private _tokenOwnerAddress: Address;
  private _contractOwnerAddress: Address;

  constructor(tokenOwnerAddress: Address, contractOwnerAddress: Address) {
    this._tokenOwnerAddress = tokenOwnerAddress;
    this._contractOwnerAddress = contractOwnerAddress;
  }

  /* ============ Deployment ============ */

  public async deployTransferProxyAsync(
    from: Address = this._tokenOwnerAddress
  ): Promise<TransferProxyContract> {
    const truffleERC20Wrapper = await ERC20Wrapper.new(
      { from: this._tokenOwnerAddress },
    );

    await TransferProxy.link('ERC20Wrapper', truffleERC20Wrapper.address);
    const truffleTransferProxy = await TransferProxy.new(
      { from, gas: DEFAULT_GAS },
    );

    const transferProxy = new TransferProxyContract(
      new web3.eth.Contract(truffleTransferProxy.abi, truffleTransferProxy.address),
      { from, gas: DEFAULT_GAS },
    );

    return transferProxy;
  }

  public async deployVaultAsync(
    from: Address = this._tokenOwnerAddress
  ): Promise<VaultContract> {
    const truffleERC20Wrapper = await ERC20Wrapper.new(
      { from: this._tokenOwnerAddress },
    );

    await Vault.link('ERC20Wrapper', truffleERC20Wrapper.address);
    const truffleVault = await Vault.new(
      { from },
    );

    return new VaultContract(
      new web3.eth.Contract(truffleVault.abi, truffleVault.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployAuthorizableAsync(
    from: Address = this._tokenOwnerAddress
  ): Promise<AuthorizableContract> {
    const truffleAuthorizable = await Authorizable.new(
      { from, gas: DEFAULT_GAS },
    );

    return new AuthorizableContract(
      new web3.eth.Contract(truffleAuthorizable.abi, truffleAuthorizable.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deploySetTokenFactoryAsync(
    coreAddress: Address,
    from: Address = this._tokenOwnerAddress
  ): Promise<SetTokenFactoryContract> {
    const truffleSetTokenFactory = await SetTokenFactory.new(
      coreAddress,
      { from },
    );

    return new SetTokenFactoryContract(
      new web3.eth.Contract(truffleSetTokenFactory.abi, truffleSetTokenFactory.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployRebalancingSetTokenFactoryAsync(
    coreAddress: Address,
    minimumRebalanceInterval: BigNumber = ONE_DAY_IN_SECONDS,
    minimumProposalPeriod: BigNumber = ONE_DAY_IN_SECONDS,
    from: Address = this._tokenOwnerAddress
  ): Promise<RebalancingSetTokenFactoryContract> {
    const truffleTokenFactory = await RebalancingSetTokenFactory.new(
      coreAddress,
      minimumRebalanceInterval,
      minimumProposalPeriod,
      { from },
    );

    return new RebalancingSetTokenFactoryContract(
      new web3.eth.Contract(truffleTokenFactory.abi, truffleTokenFactory.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployMockOrderLibAsync(
    from: Address = this._tokenOwnerAddress
  ): Promise<OrderLibraryMockContract> {
    const truffleOrderLibrary = await OrderLibrary.new(
      { from: this._tokenOwnerAddress },
    );

    await OrderLibraryMock.link('OrderLibrary', truffleOrderLibrary.address);
    const truffleOrderLibraryMock = await OrderLibraryMock.new(
      { from },
    );

    return new OrderLibraryMockContract(
      new web3.eth.Contract(truffleOrderLibraryMock.abi, truffleOrderLibraryMock.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deploySignatureValidatorAsync(
    from: Address = this._tokenOwnerAddress
  ): Promise<SignatureValidatorContract> {
    const truffleSignatureValidator = await SignatureValidator.new(
      { from: this._tokenOwnerAddress },
    );

    return new SignatureValidatorContract(
      new web3.eth.Contract(truffleSignatureValidator.abi, truffleSignatureValidator.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployMockEIP712LibAsync(
    from: Address = this._tokenOwnerAddress
  ): Promise<EIP712LibraryMockContract> {
    const truffleEIP712Library = await EIP712Library.new(
      { from: this._tokenOwnerAddress },
    );

    await EIP712LibraryMock.link('EIP712Library', truffleEIP712Library.address);
    const truffleEIP712LibraryMock = await EIP712LibraryMock.new(
      { from },
    );

    return new EIP712LibraryMockContract(
      new web3.eth.Contract(truffleEIP712LibraryMock.abi, truffleEIP712LibraryMock.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deploySetTokenAsync(
    factory: Address,
    componentAddresses: Address[],
    units: BigNumber[],
    naturalUnit: BigNumber,
    name: string = 'Set Token',
    symbol: string = 'SET',
    from: Address = this._tokenOwnerAddress
  ): Promise<SetTokenContract> {
    const encodedName = SetUtils.stringToBytes(name);
    const encodedSymbol = SetUtils.stringToBytes(symbol);

    // Creates but does not register the Set with Core as enabled
    const truffleSetToken = await SetToken.new(
      factory,
      componentAddresses,
      units,
      naturalUnit,
      encodedName,
      encodedSymbol,
      { from, gas: DEFAULT_GAS },
    );

    const setToken = new SetTokenContract(
      new web3.eth.Contract(truffleSetToken.abi, truffleSetToken.address),
      { from, gas: DEFAULT_GAS },
    );

    return setToken;
  }

  public async deployCoreAndDependenciesAsync(
    from: Address = this._tokenOwnerAddress
  ): Promise<CoreContract> {
    const transferProxy = await this.deployTransferProxyAsync();
    const vault = await this.deployVaultAsync();
    const signatureValidator = await this.deploySignatureValidatorAsync();

    await this.linkCoreLibrariesAsync();
    const truffleCore = await Core.new(
      transferProxy.address,
      vault.address,
      signatureValidator.address,
      { from },
    );

    return new CoreContract(
      new web3.eth.Contract(truffleCore.abi, truffleCore.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployCoreAsync(
    transferProxy: TransferProxyContract,
    vault: VaultContract,
    signatureValidator: SignatureValidatorContract,
    from: Address = this._tokenOwnerAddress
  ): Promise<CoreContract> {
    await this.linkCoreLibrariesAsync();

    const truffleCore = await Core.new(
      transferProxy.address,
      vault.address,
      signatureValidator.address,
      { from },
    );

    return new CoreContract(
      new web3.eth.Contract(truffleCore.abi, truffleCore.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployCoreMockAsync(
    transferProxy: TransferProxyContract,
    vault: VaultContract,
    signatureValidator: SignatureValidatorContract,
    from: Address = this._tokenOwnerAddress
  ): Promise<CoreMockContract> {
    await this.linkCoreLibrariesAsync();

    const truffleCore = await CoreMock.new(
      transferProxy.address,
      vault.address,
      signatureValidator.address,
      { from },
    );

    return new CoreMockContract(
      new web3.eth.Contract(truffleCore.abi, truffleCore.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async linkCoreLibrariesAsync(): Promise<void> {
    const truffleOrderLibrary = await OrderLibrary.new(
      { from: this._tokenOwnerAddress },
    );

    const truffleEIP712Library = await EIP712Library.new(
      { from: this._tokenOwnerAddress },
    );

    await Core.link('OrderLibrary', truffleOrderLibrary.address);
    await Core.link('EIP712Library', truffleEIP712Library.address);
  }


  /* ============ CoreInternal Extension ============ */

  public async registerFactoryAsync(
    core: CoreLikeContract,
    setTokenFactory: SetTokenFactoryContract | RebalancingSetTokenFactoryContract,
    enabled: boolean,
    from: Address = this._contractOwnerAddress,
  ) {
    await core.registerFactory.sendTransactionAsync(
      setTokenFactory.address,
      enabled,
      { from }
    );
  }

  /* ============ Authorizable ============ */

  public async setDefaultStateAndAuthorizationsAsync(
    core: CoreLikeContract,
    vault: VaultContract,
    transferProxy: TransferProxyContract,
    setTokenFactory: SetTokenFactoryContract,
    from: Address = this._tokenOwnerAddress,
  ) {
    this.addAuthorizationAsync(vault, core.address);
    this.addAuthorizationAsync(transferProxy, core.address);

    await core.registerFactory.sendTransactionAsync(
      setTokenFactory.address,
      true,
      { from },
    );
  }

  public async addAuthorizationAsync(
    contract: AuthorizableContract,
    toAuthorize: Address,
    from: Address = this._contractOwnerAddress
  ) {
    await contract.addAuthorizedAddress.sendTransactionAsync(
      toAuthorize,
      { from },
    );
  }

  /* ============ Vault ============ */

  public async incrementAccountBalanceAsync(
    vault: VaultContract,
    account: Address,
    token: Address,
    quantity: BigNumber,
    from: Address = this._contractOwnerAddress,
  ) {
    await vault.incrementTokenOwner.sendTransactionAsync(
      token,
      account,
      quantity,
      { from },
    );
  }

  public async getVaultBalancesForTokensForOwner(
    tokens: Address[],
    vault: VaultContract,
    owner: Address
  ): Promise<BigNumber[]> {
    const balancePromises = _.map(tokens, address => vault.balances.callAsync(address, owner));

    let balances: BigNumber[];
    await Promise.all(balancePromises).then(fetchedTokenBalances => {
      balances = fetchedTokenBalances;
    });

    return balances;
  }

  /* ============ CoreFactory Extension ============ */

  public async createSetTokenAsync(
    core: CoreLikeContract,
    factory: Address,
    componentAddresses: Address[],
    units: BigNumber[],
    naturalUnit: BigNumber,
    name: string = 'Set Token',
    symbol: string = 'SET',
    callData: string = '0x0',
    from: Address = this._tokenOwnerAddress,
  ): Promise<SetTokenContract> {
    const encodedName = SetUtils.stringToBytes(name);
    const encodedSymbol = SetUtils.stringToBytes(symbol);

    // Creates and registers the Set with Core as enabled
    const txHash = await core.create.sendTransactionAsync(
      factory,
      componentAddresses,
      units,
      naturalUnit,
      encodedName,
      encodedSymbol,
      callData,
      { from },
    );

    const logs = await setTestUtils.getLogsFromTxHash(txHash);
    const setAddress = extractNewSetTokenAddressFromLogs(logs);

    return await SetTokenContract.at(
      setAddress,
      web3,
      { from }
    );
  }

  /* ============ CoreAccounting Extension ============ */

  public async depositFromUser(
    core: CoreLikeContract,
    token: Address,
    quantity: BigNumber,
    from: Address = this._contractOwnerAddress,
  ) {
    await core.deposit.sendTransactionAsync(
      token,
      quantity,
      { from },
    );
  }

  /* ============ RebalancingToken Factory ============ */

  public async getRebalancingInstanceFromAddress(
    rebalancingTokenAddress: Address,
    from: Address = this._contractOwnerAddress,
  ): Promise<RebalancingSetTokenContract> {
    return await RebalancingSetTokenContract.at(
      rebalancingTokenAddress,
      web3,
      { from },
    );
  }

  /* ============ CoreIssuance Extension ============ */

  public async issueSetTokenAsync(
    core: CoreLikeContract,
    token: Address,
    quantity: BigNumber,
    from: Address = this._tokenOwnerAddress,
  ) {
    await core.issue.sendTransactionAsync(
      token,
      quantity,
      { from }
    );
  }

  public maskForAllComponents(
    numComponents: number,
  ): BigNumber {
    const allIndices = _.range(numComponents);
    return this.maskForComponentsAtIndexes(allIndices);
  }

  public maskForComponentsAtIndexes(
    indexes: number[],
  ): BigNumber {
    return new BigNumber(
      _.sum(
        _.map(
          indexes, (_, idx) => Math.pow(2, indexes[idx]))
        )
      );
  }

  /* ============ CoreExchangeDispatcher Extension ============ */

  public async registerDefaultExchanges(
     core: CoreLikeContract,
     from: Address = this._contractOwnerAddress,
  ) {
    const approvePromises = _.map(_.values(SetUtils.EXCHANGES), exchangeId =>
      this.registerExchange(core, exchangeId, this._tokenOwnerAddress, from)
    );
    await Promise.all(approvePromises);
  }

   public async registerExchange(
     core: CoreLikeContract,
     exchangeId: number,
     exchangeAddress: Address,
     from: Address = this._contractOwnerAddress,
  ) {
    await core.registerExchange.sendTransactionAsync(
      exchangeId,
      exchangeAddress,
      { from },
    );
  }
}
