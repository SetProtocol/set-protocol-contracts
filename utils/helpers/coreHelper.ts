import * as _ from 'lodash';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';

import {
  CoreContract,
  CoreMockContract,
  CTokenExchangeIssuanceModuleContract,
  ExchangeIssuanceModuleContract,
  OracleWhiteListContract,
  RebalancingSetCTokenExchangeIssuanceModuleContract,
  RebalancingSetCTokenIssuanceModuleContract,
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
import { getWeb3, getContractInstance, importArtifactsFromSource, linkLibrariesToDeploy } from '../web3Helper';

const web3 = getWeb3();

const Bytes32Library = importArtifactsFromSource('Bytes32Library');
const CommonValidationsLibrary = importArtifactsFromSource('CommonValidationsLibrary');
const Core = importArtifactsFromSource('Core');
const CoreIssuanceLibrary = importArtifactsFromSource('CoreIssuanceLibrary');
const CoreMock = importArtifactsFromSource('CoreMock');
const CTokenExchangeIssuanceModule = importArtifactsFromSource('CTokenExchangeIssuanceModule');
const ERC20Wrapper = importArtifactsFromSource('ERC20Wrapper');
const ExchangeIssuanceModule = importArtifactsFromSource('ExchangeIssuanceModule');
const FactoryUtilsLibrary = importArtifactsFromSource('FactoryUtilsLibrary');
const OracleWhiteList = importArtifactsFromSource('OracleWhiteList');
const RebalancingSetCTokenExchangeIssuanceModule = importArtifactsFromSource(
  'RebalancingSetCTokenExchangeIssuanceModule'
);
const RebalancingSetCTokenIssuanceModule = importArtifactsFromSource('RebalancingSetCTokenIssuanceModule');
const RebalancingSetExchangeIssuanceModule = importArtifactsFromSource('RebalancingSetExchangeIssuanceModule');
const RebalancingSetIssuanceModule = importArtifactsFromSource('RebalancingSetIssuanceModule');
const RebalanceAuctionModule = importArtifactsFromSource('RebalanceAuctionModule');
const RebalanceAuctionModuleMock = importArtifactsFromSource('RebalanceAuctionModuleMock');
const RebalancingSetTokenFactory = importArtifactsFromSource('RebalancingSetTokenFactory');
const RebalancingSetTokenV2Factory = importArtifactsFromSource('RebalancingSetTokenV2Factory');
const RebalancingSetTokenV3Factory = importArtifactsFromSource('RebalancingSetTokenV3Factory');
const SetToken = importArtifactsFromSource('SetToken');
const SetTokenFactory = importArtifactsFromSource('SetTokenFactory');
const SetTokenLibrary = importArtifactsFromSource('SetTokenLibrary');
const FailAuctionLibrary = importArtifactsFromSource('FailAuctionLibrary');
const PlaceBidLibrary = importArtifactsFromSource('PlaceBidLibrary');
const ProposeLibrary = importArtifactsFromSource('ProposeLibrary');
const SettleRebalanceLibrary = importArtifactsFromSource('SettleRebalanceLibrary');
const StartRebalanceLibrary = importArtifactsFromSource('StartRebalanceLibrary');
const TransferProxy = importArtifactsFromSource('TransferProxy');
const Vault = importArtifactsFromSource('Vault');
const WhiteList = importArtifactsFromSource('WhiteList');

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
    await linkLibrariesToDeploy(TransferProxy, [ERC20Wrapper], this._tokenOwnerAddress);

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
    await linkLibrariesToDeploy(Vault, [ERC20Wrapper], this._tokenOwnerAddress);

    const truffleVault = await Vault.new(
      { from },
    );

    return new VaultContract(
      getContractInstance(truffleVault),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deploySetTokenFactoryAsync(
    coreAddress: Address,
    from: Address = this._tokenOwnerAddress
  ): Promise<SetTokenFactoryContract> {
     await linkLibrariesToDeploy(SetTokenFactory, [CommonValidationsLibrary, Bytes32Library], this._tokenOwnerAddress);

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
    await linkLibrariesToDeploy(
      RebalancingSetTokenV3Factory,
      [FactoryUtilsLibrary, Bytes32Library],
      this._tokenOwnerAddress
    );

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

  public async deploySetTokenAsync(
    factory: Address,
    componentAddresses: Address[],
    units: BigNumber[],
    naturalUnit: BigNumber,
    name: string = 'Set Token',
    symbol: string = 'SET',
    from: Address = this._tokenOwnerAddress
  ): Promise<SetTokenContract> {
    await linkLibrariesToDeploy(SetToken, [CommonValidationsLibrary], this._tokenOwnerAddress);

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

    return this.deployCoreAsync(transferProxy, vault, from);
  }

  public async deployCoreAsync(
    transferProxy: TransferProxyContract,
    vault: VaultContract,
    from: Address = this._tokenOwnerAddress
  ): Promise<CoreContract> {
    const libraries = [CoreIssuanceLibrary, CommonValidationsLibrary, SetTokenLibrary];
    await linkLibrariesToDeploy(Core, libraries, this._tokenOwnerAddress);

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
    const libraries = [CoreIssuanceLibrary, CommonValidationsLibrary, SetTokenLibrary];
    await linkLibrariesToDeploy(CoreMock, libraries, this._tokenOwnerAddress);

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
    await linkLibrariesToDeploy(ExchangeIssuanceModule, [SetTokenLibrary], this._tokenOwnerAddress);

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
    await linkLibrariesToDeploy(CTokenExchangeIssuanceModule, [ERC20Wrapper, SetTokenLibrary], this._tokenOwnerAddress);

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

  public async deployRebalancingSetCTokenExchangeIssuanceModuleAsync(
    core: Address,
    transferProxy: Address,
    exchangeIssuanceModule: Address,
    wrappedEther: Address,
    vault: Address,
    cTokenWhiteList: Address,
    from: Address = this._tokenOwnerAddress
  ): Promise<RebalancingSetCTokenExchangeIssuanceModuleContract> {
    await linkLibrariesToDeploy(RebalancingSetCTokenExchangeIssuanceModule, [ERC20Wrapper], this._tokenOwnerAddress);

    const truffleModule = await RebalancingSetCTokenExchangeIssuanceModule.new(
      core,
      transferProxy,
      exchangeIssuanceModule,
      wrappedEther,
      vault,
      cTokenWhiteList,
      { from },
    );

    return new RebalancingSetCTokenExchangeIssuanceModuleContract(
      getContractInstance(truffleModule),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployRebalancingSetCTokenIssuanceModuleAsync(
    core: Address,
    vault: Address,
    transferProxy: Address,
    weth: Address,
    cTokenWhiteList: Address,
    from: Address = this._tokenOwnerAddress
  ): Promise<RebalancingSetCTokenIssuanceModuleContract> {
    await linkLibrariesToDeploy(RebalancingSetCTokenIssuanceModule, [ERC20Wrapper], this._tokenOwnerAddress);

    const truffleModule = await RebalancingSetCTokenIssuanceModule.new(
      core,
      vault,
      transferProxy,
      weth,
      cTokenWhiteList,
      { from },
    );

    return new RebalancingSetCTokenIssuanceModuleContract(
      getContractInstance(truffleModule),
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
    await linkLibrariesToDeploy(RebalancingSetExchangeIssuanceModule, [ERC20Wrapper], this._tokenOwnerAddress);

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
    await linkLibrariesToDeploy(RebalancingSetIssuanceModule, [ERC20Wrapper], this._tokenOwnerAddress);

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

  public async linkRebalancingLibrariesAsync(
    contract: any,
  ): Promise<void> {
    const libraries = [
      ProposeLibrary,
      StartRebalanceLibrary,
      PlaceBidLibrary,
      SettleRebalanceLibrary,
      FailAuctionLibrary,
      Bytes32Library,
    ];
    await linkLibrariesToDeploy(contract, libraries, this._tokenOwnerAddress);
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
    contract: any,
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
