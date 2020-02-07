import * as _ from 'lodash';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';

import {
  AuthorizableContract,
  CoreContract,
  CoreMockContract,
  CTokenExchangeIssuanceModuleContract,
  ExchangeIssuanceModuleContract,
  OracleWhiteListContract,
  RebalancingSetExchangeIssuanceModuleContract,
  RebalancingSetIssuanceModuleContract,
  RebalanceAuctionModuleContract,
  RebalanceAuctionModuleMockContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  RebalancingSetTokenV2FactoryContract,
  RebalancingSetTokenV3FactoryContract,
  SetTokenContract,
  SetTokenFactoryContract,
  TimeLockUpgradeMockContract,
  TimeLockUpgradeV2MockContract,
  TransferProxyContract,
  VaultContract,
  WethMockContract,
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
import { getWeb3, getContractInstance } from '../web3Helper';

const web3 = getWeb3();

const CommonValidationsLibrary = artifacts.require('CommonValidationsLibrary');
const Authorizable = artifacts.require('Authorizable');
const Core = artifacts.require('Core');
const CoreIssuanceLibrary = artifacts.require('CoreIssuanceLibrary');
const CoreMock = artifacts.require('CoreMock');
const CTokenExchangeIssuanceModule = artifacts.require('CTokenExchangeIssuanceModule');
const ERC20Wrapper = artifacts.require('ERC20Wrapper');
const ExchangeIssuanceModule = artifacts.require('ExchangeIssuanceModule');
const FactoryUtilsLibrary = artifacts.require('FactoryUtilsLibrary');
const OracleWhiteList = artifacts.require('OracleWhiteList');
const RebalancingSetExchangeIssuanceModule = artifacts.require('RebalancingSetExchangeIssuanceModule');
const RebalancingSetIssuanceModule = artifacts.require('RebalancingSetIssuanceModule');
const RebalanceAuctionModule = artifacts.require('RebalanceAuctionModule');
const RebalanceAuctionModuleMock = artifacts.require('RebalanceAuctionModuleMock');
const RebalancingSetTokenFactory = artifacts.require('RebalancingSetTokenFactory');
const RebalancingSetTokenV2Factory = artifacts.require('RebalancingSetTokenV2Factory');
const RebalancingSetTokenV3Factory = artifacts.require('RebalancingSetTokenV3Factory');
const SetToken = artifacts.require('SetToken');
const SetTokenFactory = artifacts.require('SetTokenFactory');
const SetTokenLibrary = artifacts.require('SetTokenLibrary');
const FailAuctionLibrary = artifacts.require('FailAuctionLibrary');
const PlaceBidLibrary = artifacts.require('PlaceBidLibrary');
const ProposeLibrary = artifacts.require('ProposeLibrary');
const SettleRebalanceLibrary = artifacts.require('SettleRebalanceLibrary');
const StartRebalanceLibrary = artifacts.require('StartRebalanceLibrary');
const TimeLockUpgradeMock = artifacts.require('TimeLockUpgradeMock');
const TimeLockUpgradeV2Mock = artifacts.require('TimeLockUpgradeV2Mock');
const TransferProxy = artifacts.require('TransferProxy');
const Vault = artifacts.require('Vault');
const WhiteList = artifacts.require('WhiteList');

declare type CoreLikeContract = CoreMockContract | CoreContract;
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);


export class CoreHelper {
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

    return new TransferProxyContract(
      getContractInstance(truffleTransferProxy),
      { from, gas: DEFAULT_GAS },
    );
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
      getContractInstance(truffleVault),
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
      getContractInstance(truffleAuthorizable),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deploySetTokenFactoryAsync(
    coreAddress: Address,
    from: Address = this._tokenOwnerAddress
  ): Promise<SetTokenFactoryContract> {
    await this.linkCommonValidationsLibraryAsync(SetTokenFactory);

    const truffleSetTokenFactory = await SetTokenFactory.new(
      coreAddress,
      { from },
    );

    return new SetTokenFactoryContract(
      getContractInstance(truffleSetTokenFactory),
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
      getContractInstance(truffleTokenFactory),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployRebalancingSetTokenV2FactoryAsync(
    coreAddress: Address,
    componentWhitelistAddress: Address,
    liquidatorWhitelistAddress: Address,
    feeCalculatorWhitelistAddress: Address,
    minimumRebalanceInterval: BigNumber = ONE_DAY_IN_SECONDS,
    minimumFailRebalancePeriod: BigNumber = ONE_DAY_IN_SECONDS,
    maximumFailRebalancePeriod: BigNumber = ONE_DAY_IN_SECONDS.mul(30),
    minimumNaturalUnit: BigNumber = DEFAULT_REBALANCING_MINIMUM_NATURAL_UNIT,
    maximumNaturalUnit: BigNumber = DEFAULT_REBALANCING_MAXIMUM_NATURAL_UNIT,
    from: Address = this._tokenOwnerAddress
  ): Promise<RebalancingSetTokenV2FactoryContract> {
    await this.linkRebalancingLibrariesAsync(RebalancingSetTokenV2Factory);
    const truffleTokenFactory = await RebalancingSetTokenV2Factory.new(
      coreAddress,
      componentWhitelistAddress,
      liquidatorWhitelistAddress,
      feeCalculatorWhitelistAddress,
      minimumRebalanceInterval,
      minimumFailRebalancePeriod,
      maximumFailRebalancePeriod,
      minimumNaturalUnit,
      maximumNaturalUnit,
      { from },
    );

    return new RebalancingSetTokenV2FactoryContract(
      getContractInstance(truffleTokenFactory),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployRebalancingSetTokenV3FactoryAsync(
    coreAddress: Address,
    componentWhitelistAddress: Address,
    liquidatorWhitelistAddress: Address,
    feeCalculatorWhitelistAddress: Address,
    minimumRebalanceInterval: BigNumber = ONE_DAY_IN_SECONDS,
    minimumFailRebalancePeriod: BigNumber = ONE_DAY_IN_SECONDS,
    maximumFailRebalancePeriod: BigNumber = ONE_DAY_IN_SECONDS.mul(30),
    minimumNaturalUnit: BigNumber = DEFAULT_REBALANCING_MINIMUM_NATURAL_UNIT,
    maximumNaturalUnit: BigNumber = DEFAULT_REBALANCING_MAXIMUM_NATURAL_UNIT,
    from: Address = this._tokenOwnerAddress
  ): Promise<RebalancingSetTokenV3FactoryContract> {
    const factoryUtilsLibrary = await FactoryUtilsLibrary.new(
      { from: this._contractOwnerAddress },
    );

    await RebalancingSetTokenV3Factory.link('FactoryUtilsLibrary', factoryUtilsLibrary.address);

    const truffleTokenFactory = await RebalancingSetTokenV3Factory.new(
      coreAddress,
      componentWhitelistAddress,
      liquidatorWhitelistAddress,
      feeCalculatorWhitelistAddress,
      minimumRebalanceInterval,
      minimumFailRebalancePeriod,
      maximumFailRebalancePeriod,
      minimumNaturalUnit,
      maximumNaturalUnit,
      { from },
    );

    return new RebalancingSetTokenV3FactoryContract(
      getContractInstance(truffleTokenFactory),
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
    const truffleProposeLibrary = await ProposeLibrary.new(
      { from: this._tokenOwnerAddress },
    );
    const truffleStartRebalanceLibrary = await StartRebalanceLibrary.new(
      { from: this._tokenOwnerAddress },
    );
    const trufflePlaceBidLibrary = await PlaceBidLibrary.new(
      { from: this._tokenOwnerAddress },
    );
    const truffleSettleRebalanceLibrary = await SettleRebalanceLibrary.new(
      { from: this._tokenOwnerAddress },
    );
    const truffleFailAuctionLibrary = await FailAuctionLibrary.new(
      { from: this._tokenOwnerAddress },
    );

    await contract.link('ProposeLibrary', truffleProposeLibrary.address);
    await contract.link('StartRebalanceLibrary', truffleStartRebalanceLibrary.address);
    await contract.link('PlaceBidLibrary', trufflePlaceBidLibrary.address);
    await contract.link('SettleRebalanceLibrary', truffleSettleRebalanceLibrary.address);
    await contract.link('FailAuctionLibrary', truffleFailAuctionLibrary.address);
  }

  public async linkCommonValidationsLibraryAsync(
    contract: any,
  ): Promise<void> {
    const truffleCommonValidationsLibrary = await CommonValidationsLibrary.new(
      { from: this._tokenOwnerAddress },
    );

    await contract.link('CommonValidationsLibrary', truffleCommonValidationsLibrary.address);
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
    await this.linkCommonValidationsLibraryAsync(SetToken);

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
      getContractInstance(truffleSetToken),
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

    await this.linkCommonValidationsLibraryAsync(Core);
    await this.linkSetTokenLibraryAsync(Core);

    const truffleCore = await Core.new(
      transferProxy.address,
      vault.address,
      { from },
    );

    return new CoreContract(
      getContractInstance(truffleCore),
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

    await this.linkCommonValidationsLibraryAsync(Core);
    await this.linkSetTokenLibraryAsync(Core);

    const truffleCore = await Core.new(
      transferProxy.address,
      vault.address,
      { from },
    );

    return new CoreContract(
      getContractInstance(truffleCore),
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

    await this.linkCommonValidationsLibraryAsync(CoreMock);
    await this.linkSetTokenLibraryAsync(CoreMock);

    const truffleCore = await CoreMock.new(
      transferProxy.address,
      vault.address,
      { from },
    );

    return new CoreMockContract(
      getContractInstance(truffleCore),
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
      getContractInstance(truffleTimeLockUpgradeMock),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployTimeLockUpgradeV2MockAsync(
    from: Address = this._tokenOwnerAddress
  ): Promise<TimeLockUpgradeV2MockContract> {
    const truffleTimeLockUpgradeV2Mock = await TimeLockUpgradeV2Mock.new(
      { from },
    );

    return new TimeLockUpgradeV2MockContract(
      getContractInstance(truffleTimeLockUpgradeV2Mock),
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
      getContractInstance(truffleWhiteList),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployOracleWhiteListAsync(
    initialTokenAddresses: Address[] = [],
    initialOracleAddresses: Address[] = [],
    from: Address = this._tokenOwnerAddress
  ): Promise<OracleWhiteListContract> {
    const truffleWhiteList = await OracleWhiteList.new(
      initialTokenAddresses,
      initialOracleAddresses,
      { from },
    );

    return new OracleWhiteListContract(
      getContractInstance(truffleWhiteList),
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
      getContractInstance(truffleRebalanceAuctionModule),
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
      getContractInstance(truffleRebalanceAuctionModuleMock),
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
      getContractInstance(truffleExchangeIssuanceModule),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployCTokenExchangeIssuanceModuleAsync(
    core: Address,
    vault: Address,
    transferProxy: Address,
    cTokenWhiteList: Address,
    from: Address = this._tokenOwnerAddress
  ): Promise<CTokenExchangeIssuanceModuleContract> {
    await this.linkSetTokenLibraryAsync(CTokenExchangeIssuanceModule);

    const erc20WrapperLibrary = await ERC20Wrapper.new(
      { from: this._contractOwnerAddress },
    );
    await CTokenExchangeIssuanceModule.link('ERC20Wrapper', erc20WrapperLibrary.address);

    const truffleCTokenExchangeIssuanceModule = await CTokenExchangeIssuanceModule.new(
      core,
      vault,
      transferProxy,
      cTokenWhiteList,
      { from },
    );

    return new CTokenExchangeIssuanceModuleContract(
      getContractInstance(truffleCTokenExchangeIssuanceModule),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployRebalancingSetExchangeIssuanceModuleAsync(
    core: Address,
    transferProxy: Address,
    exchangeIssuanceModule: Address,
    wrappedEther: Address,
    vault: Address,
    from: Address = this._contractOwnerAddress
  ): Promise<RebalancingSetExchangeIssuanceModuleContract> {
    const erc20WrapperLibrary = await ERC20Wrapper.new(
      { from: this._contractOwnerAddress },
    );

    await RebalancingSetExchangeIssuanceModule.link('ERC20Wrapper', erc20WrapperLibrary.address);

    const payableExchangeIssuanceContract = await RebalancingSetExchangeIssuanceModule.new(
      core,
      transferProxy,
      exchangeIssuanceModule,
      wrappedEther,
      vault,
      { from },
    );

    return new RebalancingSetExchangeIssuanceModuleContract(
      getContractInstance(payableExchangeIssuanceContract),
      { from },
    );
  }

  public async deployRebalancingSetIssuanceModuleAsync(
    core: CoreLikeContract,
    vault: VaultContract,
    transferProxy: TransferProxyContract,
    weth: WethMockContract,
    from: Address = this._tokenOwnerAddress
  ): Promise<RebalancingSetIssuanceModuleContract> {
    const erc20WrapperLibrary = await ERC20Wrapper.new(
      { from: this._contractOwnerAddress },
    );

    await RebalancingSetIssuanceModule.link('ERC20Wrapper', erc20WrapperLibrary.address);

    const truffleModule = await RebalancingSetIssuanceModule.new(
      core.address,
      vault.address,
      transferProxy.address,
      weth.address,
      { from },
    );

    return new RebalancingSetIssuanceModuleContract(
      getContractInstance(truffleModule),
      { from, gas: DEFAULT_GAS },
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
    for (let i = 0; i < tokenAddresses.length; i++) {
      await this.addTokenToWhiteList(tokenAddresses[i], whiteList);
    }
  }

  public async addTokenToWhiteList(
    address: Address,
    whiteList: WhiteListContract,
    from: Address = this._contractOwnerAddress,
  ): Promise<void> {
    const isWhiteListed = await whiteList.whiteList.callAsync(address);

    if (!isWhiteListed) {
      await whiteList.addAddress.sendTransactionAsync(
        address,
        { from },
      );
    }
  }

  public async addAddressToWhiteList(
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

  public async depositTo(
    core: CoreLikeContract,
    to: Address,
    token: Address,
    quantity: BigNumber,
    from: Address = this._contractOwnerAddress,
  ) {
    await core.deposit.sendTransactionAsync(
      token,
      quantity,
      { from },
    );

    await core.internalTransfer.sendTransactionAsync(
      token,
      to,
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
    await core.setOperationState.sendTransactionAsync(operationState, { from });
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
    return new SetTokenContract(getContractInstance(SetToken, setTokenAddress), { from, gas: DEFAULT_GAS });
  }
}
