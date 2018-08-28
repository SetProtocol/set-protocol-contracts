import * as _ from 'lodash';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';

import {
  AuthorizableContract,
  CoreContract,
  CoreMockContract,
  OrderLibraryMockContract,
  SetTokenContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  SetTokenFactoryContract,
  TransferProxyContract,
  VaultContract
} from './contracts';
import { BigNumber } from 'bignumber.js';
import { DEFAULT_GAS } from './constants';
import { extractNewSetTokenAddressFromLogs } from './contract_logs/core';

const Authorizable = artifacts.require('Authorizable');
const Core = artifacts.require('Core');
const CoreMock = artifacts.require('CoreMock');
const ERC20Wrapper = artifacts.require('ERC20Wrapper');
const OrderLibrary = artifacts.require('OrderLibrary');
const OrderLibraryMock = artifacts.require('OrderLibraryMock');
const RebalancingSetToken = artifacts.require('RebalancingSetToken');
const RebalancingSetTokenFactory = artifacts.require('RebalancingSetTokenFactory');
const SetToken = artifacts.require('SetToken');
const SetTokenFactory = artifacts.require('SetTokenFactory');
const TransferProxy = artifacts.require('TransferProxy');
const Vault = artifacts.require('Vault');

declare type CoreLikeContract = CoreMockContract | CoreContract;
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);


export class CoreWrapper {
  private _tokenOwnerAddress: Address;
  private _contractOwnerAddress: Address;
  private _truffleOrderLibrary: any;
  private _truffleERC20Wrapper: any;
  private _defaultGracePeriod = new BigNumber(2419200); // 4 Weeks

  constructor(tokenOwnerAddress: Address, contractOwnerAddress: Address) {
    this._tokenOwnerAddress = tokenOwnerAddress;
    this._contractOwnerAddress = contractOwnerAddress;
  }

  /* ============ Deployment ============ */

  public async deployTransferProxyAsync(
    from: Address = this._tokenOwnerAddress
  ): Promise<TransferProxyContract> {
    if (!this._truffleERC20Wrapper) {
      this._truffleERC20Wrapper = await ERC20Wrapper.new(
        { from: this._tokenOwnerAddress },
      );
    }

    await TransferProxy.link('ERC20Wrapper', this._truffleERC20Wrapper.address);
    const truffleTransferProxy = await TransferProxy.new(
      { from, gas: DEFAULT_GAS },
    );

    const transferProxy = new TransferProxyContract(
      web3.eth.contract(truffleTransferProxy.abi).at(truffleTransferProxy.address),
      { from, gas: DEFAULT_GAS },
    );

    return transferProxy;
  }

  public async deployVaultAsync(
    from: Address = this._tokenOwnerAddress
  ): Promise<VaultContract> {
    if (!this._truffleERC20Wrapper) {
      this._truffleERC20Wrapper = await ERC20Wrapper.new(
        { from: this._tokenOwnerAddress },
      );
    }

    await Vault.link('ERC20Wrapper', this._truffleERC20Wrapper.address);
    const truffleVault = await Vault.new(
      { from },
    );

    return new VaultContract(
      web3.eth.contract(truffleVault.abi).at(truffleVault.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployAuthorizableAsync(
    gracePeriod: BigNumber = this._defaultGracePeriod,
    from: Address = this._tokenOwnerAddress
  ): Promise<AuthorizableContract> {
    const truffleAuthorizable = await Authorizable.new(
      gracePeriod,
      { from, gas: DEFAULT_GAS },
    );

    return new AuthorizableContract(
      web3.eth.contract(truffleAuthorizable.abi).at(truffleAuthorizable.address),
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
      web3.eth.contract(truffleSetTokenFactory.abi).at(truffleSetTokenFactory.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployRebalancingSetTokenFactoryAsync(
    coreAddress: Address,
    from: Address = this._tokenOwnerAddress
  ): Promise<RebalancingSetTokenFactoryContract> {
    const truffleTokenFactory = await RebalancingSetTokenFactory.new(
      coreAddress,
      { from },
    );

    return new RebalancingSetTokenFactoryContract(
      web3.eth.contract(truffleTokenFactory.abi).at(truffleTokenFactory.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployMockOrderLibAsync(
    from: Address = this._tokenOwnerAddress
  ): Promise<OrderLibraryMockContract> {
    if (!this._truffleOrderLibrary) {
      this._truffleOrderLibrary = await OrderLibrary.new(
        { from: this._tokenOwnerAddress },
      );
    }

    await OrderLibraryMock.link('OrderLibrary', this._truffleOrderLibrary.address);
    const truffleOrderLibraryMock = await OrderLibraryMock.new(
      { from },
    );

    return new OrderLibraryMockContract(
      web3.eth.contract(truffleOrderLibraryMock.abi).at(truffleOrderLibraryMock.address),
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
      web3.eth.contract(truffleSetToken.abi).at(truffleSetToken.address),
      { from, gas: DEFAULT_GAS },
    );

    return setToken;
  }

  public async deployRebalancingSetTokenAsync(
    factory: Address,
    tokenManager: Address,
    initialSet: Address,
    initialShareRatio: BigNumber,
    proposalPeriod: BigNumber,
    rebalanceCoolOffPeriod: BigNumber,
    name: string = 'Rebalancing Set',
    symbol: string = 'RBSET',
    from: Address = this._tokenOwnerAddress
  ): Promise<RebalancingSetTokenContract> {
    const encodedName = SetUtils.stringToBytes(name);
    const encodedSymbol = SetUtils.stringToBytes(symbol);

    const truffleRebalancingToken = await RebalancingSetToken.new(
      factory,
      tokenManager,
      initialSet,
      initialShareRatio,
      proposalPeriod,
      rebalanceCoolOffPeriod,
      encodedName,
      encodedSymbol,
      { from, gas: DEFAULT_GAS },
    );

    const rebalancingToken = new RebalancingSetTokenContract(
      web3.eth.contract(truffleRebalancingToken.abi).at(truffleRebalancingToken.address),
      { from, gas: DEFAULT_GAS },
    );

    return rebalancingToken;
  }

  public async deployCoreAndDependenciesAsync(
    from: Address = this._tokenOwnerAddress
  ): Promise<CoreContract> {
    if (!this._truffleOrderLibrary) {
      this._truffleOrderLibrary = await OrderLibrary.new(
        { from: this._tokenOwnerAddress },
      );
    }

    const transferProxy = await this.deployTransferProxyAsync();
    const vault = await this.deployTransferProxyAsync();

    await Core.link('OrderLibrary', this._truffleOrderLibrary.address);
    const truffleCore = await Core.new(
      transferProxy.address,
      vault.address,
      { from },
    );

    return new CoreContract(
      web3.eth.contract(truffleCore.abi).at(truffleCore.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployCoreAsync(
    transferProxy: TransferProxyContract,
    vault: VaultContract,
    from: Address = this._tokenOwnerAddress
  ): Promise<CoreContract> {
    if (!this._truffleOrderLibrary) {
      this._truffleOrderLibrary = await OrderLibrary.new(
        { from: this._tokenOwnerAddress },
      );
    }

    await Core.link('OrderLibrary', this._truffleOrderLibrary.address);
    const truffleCore = await Core.new(
      transferProxy.address,
      vault.address,
      { from },
    );

    return new CoreContract(
      web3.eth.contract(truffleCore.abi).at(truffleCore.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployCoreMockAsync(
    transferProxy: TransferProxyContract,
    vault: VaultContract,
    from: Address = this._tokenOwnerAddress
  ): Promise<CoreMockContract> {
    if (!this._truffleOrderLibrary) {
      this._truffleOrderLibrary = await OrderLibrary.new(
        { from: this._tokenOwnerAddress },
      );
    }

    await Core.link('OrderLibrary', this._truffleOrderLibrary.address);
    const truffleCore = await CoreMock.new(
      transferProxy.address,
      vault.address,
      { from },
    );

    return new CoreMockContract(
      web3.eth.contract(truffleCore.abi).at(truffleCore.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  /* ============ CoreInternal Extension ============ */

  public async enableFactoryAsync(
    core: CoreLikeContract,
    setTokenFactory: SetTokenFactoryContract | RebalancingSetTokenFactoryContract,
    from: Address = this._contractOwnerAddress,
  ) {
    await core.enableFactory.sendTransactionAsync(
      setTokenFactory.address,
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

    await core.enableFactory.sendTransactionAsync(
      setTokenFactory.address,
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
    callData: string = '',
    from: Address = this._tokenOwnerAddress,
  ): Promise<SetTokenContract> {
    const encodedName = SetUtils.stringToBytes(name);
    const encodedSymbol = SetUtils.stringToBytes(symbol);

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

  public async createRebalancingTokenAsync(
    core: CoreLikeContract,
    factory: Address,
    componentAddresses: Address[],
    units: BigNumber[],
    naturalUnit: BigNumber,
    callData: string = '',
    name: string = 'Rebalancing Set Token',
    symbol: string = 'RBSET',
    from: Address = this._tokenOwnerAddress,
  ): Promise<RebalancingSetTokenContract> {
    const encodedName = SetUtils.stringToBytes(name);
    const encodedSymbol = SetUtils.stringToBytes(symbol);

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

    return await RebalancingSetTokenContract.at(
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
