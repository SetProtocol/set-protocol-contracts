import * as _ from 'lodash';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';

import {
  AuthorizableContract,
  CoreContract,
  CoreMockContract,
  ExchangeIssuanceModuleContract,
  PayableExchangeIssuanceContract,
  RebalanceAuctionModuleContract,
  RebalanceAuctionModuleMockContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  RebalancingTokenIssuanceModuleContract,
  SetTokenContract,
  SetTokenFactoryContract,
  TimeLockUpgradeMockContract,
  TransferProxyContract,
  VaultContract,
  WhiteListContract,
} from '../contracts';
import { BigNumber } from 'bignumber.js';
import {
  DEFAULT_GAS,
  DEFAULT_REBALANCING_MINIMUM_NATURAL_UNIT,
  DEFAULT_REBALANCING_MAXIMUM_NATURAL_UNIT,
  ONE_DAY_IN_SECONDS,
} from '../constants';
import { extractNewSetTokenAddressFromLogs } from '../contract_logs/core';
import { getWeb3 } from '../web3Helper';
import { getContractAddress } from '../../deployments/utils/output-helper';
import { TX_DEFAULTS } from '../../deployments/utils/blockchain';

const web3 = getWeb3();

const ArrayValidations = artifacts.require('ArrayValidations');
const Authorizable = artifacts.require('Authorizable');
const Core = artifacts.require('Core');
const CoreIssuanceLibrary = artifacts.require('CoreIssuanceLibrary');
const CoreMock = artifacts.require('CoreMock');
const ERC20Wrapper = artifacts.require('ERC20Wrapper');
const ExchangeIssuanceModule = artifacts.require('ExchangeIssuanceModule');
const PayableExchangeIssuance = artifacts.require('PayableExchangeIssuance');
const RebalanceAuctionModule = artifacts.require('RebalanceAuctionModule');
const RebalanceAuctionModuleMock = artifacts.require('RebalanceAuctionModuleMock');
const RebalancingHelperLibrary = artifacts.require('RebalancingHelperLibrary');
const RebalancingSetTokenFactory = artifacts.require('RebalancingSetTokenFactory');
const RebalancingTokenIssuanceModule = artifacts.require('RebalancingTokenIssuanceModule');
const SetToken = artifacts.require('SetToken');
const SetTokenFactory = artifacts.require('SetTokenFactory');
const SetTokenLibrary = artifacts.require('SetTokenLibrary');
const StandardFailAuctionLibrary = artifacts.require('StandardFailAuctionLibrary');
const StandardPlaceBidLibrary = artifacts.require('StandardPlaceBidLibrary');
const StandardProposeLibrary = artifacts.require('StandardProposeLibrary');
const StandardSettleRebalanceLibrary = artifacts.require('StandardSettleRebalanceLibrary');
const StandardStartRebalanceLibrary = artifacts.require('StandardStartRebalanceLibrary');
const TimeLockUpgradeMock = artifacts.require('TimeLockUpgradeMock');
const TransferProxy = artifacts.require('TransferProxy');
const Vault = artifacts.require('Vault');
const WhiteList = artifacts.require('WhiteList');

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

  /* ============ Deployed Contracts ============ */

   public async getDeployedTransferProxyAsync(): Promise<TransferProxyContract> {
    const address = await getContractAddress(TransferProxy.contractName);

     return await TransferProxyContract.at(address, web3, TX_DEFAULTS);
  }

   public async getDeployedVaultAsync(): Promise<VaultContract> {
    const address = await getContractAddress(Vault.contractName);

     return await VaultContract.at(address, web3, TX_DEFAULTS);
  }

   public async getDeployedSetTokenFactoryAsync(): Promise<SetTokenFactoryContract> {
    const address = await getContractAddress(SetTokenFactory.contractName);

     return await SetTokenFactoryContract.at(address, web3, TX_DEFAULTS);
  }

   public async getDeployedRebalancingSetTokenFactoryAsync(): Promise<RebalancingSetTokenFactoryContract> {
    const address = await getContractAddress(RebalancingSetTokenFactory.contractName);

     return await RebalancingSetTokenFactoryContract.at(address, web3, TX_DEFAULTS);
  }

   public async getDeployedCoreAsync(): Promise<CoreContract> {
    const address = await getContractAddress(Core.contractName);

     return await CoreContract.at(address, web3, TX_DEFAULTS);
  }

   public async getDeployedExchangeIssuanceModuleAsync(): Promise<ExchangeIssuanceModuleContract> {
    const address = await getContractAddress(ExchangeIssuanceModule.contractName);

     return await ExchangeIssuanceModuleContract.at(address, web3, TX_DEFAULTS);
  }

   public async getDeployedRebalancingTokenIssuanceModuleAsync(): Promise<RebalancingTokenIssuanceModuleContract> {
    const address = await getContractAddress(RebalancingTokenIssuanceModule.contractName);

     return await RebalancingTokenIssuanceModuleContract.at(address, web3, TX_DEFAULTS);
  }

   public async getDeployedWhiteList(): Promise<WhiteListContract> {
    const address = await getContractAddress(WhiteList.contractName);

     return await WhiteListContract.at(address, web3, TX_DEFAULTS);
  }

   public async getDeployedRebalanceAuctionModuleAsync(): Promise<RebalanceAuctionModuleContract> {
    const address = await getContractAddress(RebalanceAuctionModule.contractName);

     return await RebalanceAuctionModuleContract.at(address, web3, TX_DEFAULTS);
  }

   public async getDeployedPayableExchangeIssuanceModuleAsync(): Promise<PayableExchangeIssuanceContract> {
    const address = await getContractAddress(PayableExchangeIssuance.contractName);

     return await PayableExchangeIssuanceContract.at(address, web3, TX_DEFAULTS);
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
    await this.linkArrayValidationsAsync(SetTokenFactory);

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
    componentWhitelistAddress: Address,
    minimumRebalanceInterval: BigNumber = ONE_DAY_IN_SECONDS,
    minimumProposalPeriod: BigNumber = ONE_DAY_IN_SECONDS,
    minimumTimeToPivot: BigNumber = ONE_DAY_IN_SECONDS.div(4),
    maximumTimeToPivot: BigNumber = ONE_DAY_IN_SECONDS.mul(3),
    minimumNaturalUnit: BigNumber = DEFAULT_REBALANCING_MINIMUM_NATURAL_UNIT,
    maximumNaturalUnit: BigNumber = DEFAULT_REBALANCING_MAXIMUM_NATURAL_UNIT,
    from: Address = this._tokenOwnerAddress
  ): Promise<RebalancingSetTokenFactoryContract> {
    await this.linkRebalancingLibrariesAsync(RebalancingSetTokenFactory);
    const truffleTokenFactory = await RebalancingSetTokenFactory.new(
      coreAddress,
      componentWhitelistAddress,
      minimumRebalanceInterval,
      minimumProposalPeriod,
      minimumTimeToPivot,
      maximumTimeToPivot,
      minimumNaturalUnit,
      maximumNaturalUnit,
      { from },
    );

    return new RebalancingSetTokenFactoryContract(
      new web3.eth.Contract(truffleTokenFactory.abi, truffleTokenFactory.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async linkSetTokenLibraryAsync(
    contract: any,
  ): Promise<void> {
    const truffleSetTokenLibrary = await SetTokenLibrary.new(
      { from: this._tokenOwnerAddress },
    );

    await contract.link('SetTokenLibrary', truffleSetTokenLibrary.address);
  }

  public async linkRebalancingLibrariesAsync(
    contract: any,
  ): Promise<void> {
    const truffleRebalancingHelperLibrary = await RebalancingHelperLibrary.new(
      { from: this._tokenOwnerAddress },
    );

    await StandardProposeLibrary.link('RebalancingHelperLibrary', truffleRebalancingHelperLibrary.address);
    await StandardStartRebalanceLibrary.link('RebalancingHelperLibrary', truffleRebalancingHelperLibrary.address);
    await StandardPlaceBidLibrary.link('RebalancingHelperLibrary', truffleRebalancingHelperLibrary.address);
    await StandardSettleRebalanceLibrary.link('RebalancingHelperLibrary', truffleRebalancingHelperLibrary.address);
    await StandardFailAuctionLibrary.link('RebalancingHelperLibrary', truffleRebalancingHelperLibrary.address);

    const truffleStandardProposeLibrary = await StandardProposeLibrary.new(
      { from: this._tokenOwnerAddress },
    );
    const truffleStandardStartRebalanceLibrary = await StandardStartRebalanceLibrary.new(
      { from: this._tokenOwnerAddress },
    );
    const truffleStandardPlaceBidLibrary = await StandardPlaceBidLibrary.new(
      { from: this._tokenOwnerAddress },
    );
    const truffleStandardSettleRebalanceLibrary = await StandardSettleRebalanceLibrary.new(
      { from: this._tokenOwnerAddress },
    );
    const truffleStandardFailAuctionLibrary = await StandardFailAuctionLibrary.new(
      { from: this._tokenOwnerAddress },
    );

    await contract.link('RebalancingHelperLibrary', truffleRebalancingHelperLibrary.address);
    await contract.link('StandardProposeLibrary', truffleStandardProposeLibrary.address);
    await contract.link('StandardStartRebalanceLibrary', truffleStandardStartRebalanceLibrary.address);
    await contract.link('StandardPlaceBidLibrary', truffleStandardPlaceBidLibrary.address);
    await contract.link('StandardSettleRebalanceLibrary', truffleStandardSettleRebalanceLibrary.address);
    await contract.link('StandardFailAuctionLibrary', truffleStandardFailAuctionLibrary.address);
  }

  public async linkArrayValidationsAsync(
    contract: any,
  ): Promise<void> {
    const truffleArrayValidations = await ArrayValidations.new(
      { from: this._tokenOwnerAddress },
    );

    await contract.link('ArrayValidations', truffleArrayValidations.address);
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
    await this.linkArrayValidationsAsync(SetToken);

    // Creates but does not register the Set with Core as enabled
    const truffleSetToken = await SetToken.new(
      factory,
      componentAddresses,
      units,
      naturalUnit,
      name,
      symbol,
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

    const truffleCoreIssuanceLibrary = await CoreIssuanceLibrary.new(
      { from: this._tokenOwnerAddress },
    );
    await Core.link('CoreIssuanceLibrary', truffleCoreIssuanceLibrary.address);

    await this.linkArrayValidationsAsync(Core);

    const truffleCore = await Core.new(
      transferProxy.address,
      vault.address,
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
    from: Address = this._tokenOwnerAddress
  ): Promise<CoreContract> {
    const truffleCoreIssuanceLibrary = await CoreIssuanceLibrary.new(
      { from: this._tokenOwnerAddress },
    );
    await Core.link('CoreIssuanceLibrary', truffleCoreIssuanceLibrary.address);

    await this.linkArrayValidationsAsync(Core);

    const truffleCore = await Core.new(
      transferProxy.address,
      vault.address,
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
    from: Address = this._tokenOwnerAddress
  ): Promise<CoreMockContract> {
    const truffleCoreIssuanceLibrary = await CoreIssuanceLibrary.new(
      { from: this._tokenOwnerAddress },
    );
    await CoreMock.link('CoreIssuanceLibrary', truffleCoreIssuanceLibrary.address);

    await this.linkArrayValidationsAsync(CoreMock);

    const truffleCore = await CoreMock.new(
      transferProxy.address,
      vault.address,
      { from },
    );

    return new CoreMockContract(
      new web3.eth.Contract(truffleCore.abi, truffleCore.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployTimeLockUpgradeMockAsync(
    from: Address = this._tokenOwnerAddress
  ): Promise<TimeLockUpgradeMockContract> {
    const truffleTimeLockUpgradeMock = await TimeLockUpgradeMock.new(
      { from },
    );

    return new TimeLockUpgradeMockContract(
      new web3.eth.Contract(truffleTimeLockUpgradeMock.abi, truffleTimeLockUpgradeMock.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployWhiteListAsync(
    initialAddresses: Address[] = [],
    from: Address = this._tokenOwnerAddress
  ): Promise<WhiteListContract> {
    const truffleWhiteList = await WhiteList.new(
      initialAddresses,
      { from },
    );

    return new WhiteListContract(
      new web3.eth.Contract(truffleWhiteList.abi, truffleWhiteList.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployRebalanceAuctionModuleAsync(
    core: CoreLikeContract,
    vault: VaultContract,
    from: Address = this._tokenOwnerAddress
  ): Promise<RebalanceAuctionModuleContract> {

    const truffleRebalanceAuctionModule = await RebalanceAuctionModule.new(
      core.address,
      vault.address,
      { from },
    );

    return new RebalanceAuctionModuleContract(
      new web3.eth.Contract(truffleRebalanceAuctionModule.abi, truffleRebalanceAuctionModule.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployRebalanceAuctionModuleMockAsync(
    core: CoreLikeContract,
    vault: VaultContract,
    from: Address = this._tokenOwnerAddress
  ): Promise<RebalanceAuctionModuleMockContract> {

    const truffleRebalanceAuctionModuleMock = await RebalanceAuctionModuleMock.new(
      core.address,
      vault.address,
      { from },
    );

    return new RebalanceAuctionModuleMockContract(
      new web3.eth.Contract(truffleRebalanceAuctionModuleMock.abi, truffleRebalanceAuctionModuleMock.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployExchangeIssuanceModuleAsync(
    core: CoreLikeContract,
    vault: VaultContract,
    from: Address = this._tokenOwnerAddress
  ): Promise<ExchangeIssuanceModuleContract> {
    await this.linkSetTokenLibraryAsync(ExchangeIssuanceModule);

    const truffleExchangeIssuanceModule = await ExchangeIssuanceModule.new(
      core.address,
      vault.address,
      { from },
    );

    return new ExchangeIssuanceModuleContract(
      new web3.eth.Contract(truffleExchangeIssuanceModule.abi, truffleExchangeIssuanceModule.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployRebalancingTokenIssuanceModuleAsync(
    core: CoreLikeContract,
    vault: VaultContract,
    from: Address = this._tokenOwnerAddress
  ): Promise<RebalancingTokenIssuanceModuleContract> {
    const truffleModule = await RebalancingTokenIssuanceModule.new(
      core.address,
      vault.address,
      { from },
    );

    return new RebalancingTokenIssuanceModuleContract(
      new web3.eth.Contract(truffleModule.abi, truffleModule.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployPayableExchangeIssuanceAsync(
    core: Address,
    transferProxy: Address,
    exchangeIssuanceModule: Address,
    wrappedEther: Address,
    from: Address = this._contractOwnerAddress
  ): Promise<PayableExchangeIssuanceContract> {
    const erc20WrapperLibrary = await ERC20Wrapper.new(
      { from: this._contractOwnerAddress },
    );

    await PayableExchangeIssuance.link('ERC20Wrapper', erc20WrapperLibrary.address);

    const payableExchangeIssuanceContract = await PayableExchangeIssuance.new(
      core,
      transferProxy,
      exchangeIssuanceModule,
      wrappedEther,
      { from },
    );

    return new PayableExchangeIssuanceContract(
      new web3.eth.Contract(payableExchangeIssuanceContract.abi, payableExchangeIssuanceContract.address),
      { from },
    );
  }

  /* ============ CoreAdmin Extension ============ */

  public async addFactoryAsync(
    core: CoreLikeContract,
    setTokenFactory: SetTokenFactoryContract | RebalancingSetTokenFactoryContract,
    from: Address = this._contractOwnerAddress,
  ) {
    await core.addFactory.sendTransactionAsync(
      setTokenFactory.address,
      { from }
    );
  }

  public async addModuleAsync(
    core: CoreLikeContract,
    moduleAddress: Address,
    from: Address = this._contractOwnerAddress,
  ) {
    await core.addModule.sendTransactionAsync(
      moduleAddress,
      { from },
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

    await core.addFactory.sendTransactionAsync(
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

  /* ============ WhiteList ============ */

  public async addTokensToWhiteList(
    tokenAddresses: Address[],
    whiteList: WhiteListContract,
    from: Address = this._contractOwnerAddress,
  ): Promise<void> {
    const addAddressPromises = _.map(tokenAddresses, address => {
      this.addTokenToWhiteList(address, whiteList);
    });

    await Promise.all(addAddressPromises);
  }

  public async addTokenToWhiteList(
    address: Address,
    whiteList: WhiteListContract,
    from: Address = this._contractOwnerAddress,
  ): Promise<void> {
    await whiteList.addAddress.sendTransactionAsync(
      address,
      { from },
    );
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
    const txHash = await core.createSet.sendTransactionAsync(
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

  /* ============ CoreOperationState Extension ============ */

  /**
   * OperationStates
   * 0 = Operational
   * 1 = Shut Down
   */
  public async setOperationStateAsync(
    core: CoreLikeContract,
    operationState: BigNumber,
    from: Address = this._tokenOwnerAddress,
  ) {
    await core.setOperationState.sendTransactionAsync(
      operationState,
      { from }
    );
  }

  /* ============ CoreExchangeDispatcher Extension ============ */

  public async addDefaultExchanges(
     core: CoreLikeContract,
     from: Address = this._contractOwnerAddress,
  ) {
    const approvePromises = _.map(_.values(SetUtils.EXCHANGES), exchangeId =>
      this.addExchange(core, exchangeId, this._tokenOwnerAddress, from)
    );
    await Promise.all(approvePromises);
  }

   public async addExchange(
     core: CoreLikeContract,
     exchangeId: number,
     exchangeAddress: Address,
     from: Address = this._contractOwnerAddress,
  ) {
    await core.addExchange.sendTransactionAsync(
      exchangeId,
      exchangeAddress,
      { from },
    );
  }

  /* ============ Set Token Convenience function ============ */
  public async getSetInstance(
     setTokenAddress: Address,
     from: Address = this._contractOwnerAddress,
  ): Promise<SetTokenContract> {
    return new SetTokenContract(
      new web3.eth.Contract(SetToken.abi, setTokenAddress),
      { from, gas: DEFAULT_GAS },
    );
  }
}
