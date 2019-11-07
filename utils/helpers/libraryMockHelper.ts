import { Address } from 'set-protocol-utils';
import * as _ from 'lodash';
import {
  CommonValidationsLibraryMockContract,
  CoreContract,
  Bytes32LibraryMockContract,
  CommonMathMockContract,
  CoreIssuanceLibraryMockContract,
  ERC20WrapperMockContract,
  ExchangeIssuanceLibraryMockContract,
  PlaceBidMockContract,
  RebalancingSetIssuanceMockContract,
  SetMathMockContract,
  SetTokenLibraryMockContract,
  SetUSDValuationMockContract,
  TransferProxyContract,
  TokenFlushMockContract,
  UpdatableOracleMockContract,
  VaultContract,
  ZeroExOrderLibraryMockContract
} from '../contracts';
import { BigNumber } from 'bignumber.js';
import { getWeb3, getContractInstance, txnFrom } from '../web3Helper';
import { DEFAULT_GAS } from '../constants';

const web3 = getWeb3();
const Bytes32LibraryMock = artifacts.require('Bytes32LibraryMock');
const CommonMathMock = artifacts.require('CommonMathMock');
const CommonValidationsLibrary = artifacts.require('CommonValidationsLibrary');
const CommonValidationsLibraryMock = artifacts.require('CommonValidationsLibraryMock');
const CoreIssuanceLibrary = artifacts.require('CoreIssuanceLibrary');
const CoreIssuanceLibraryMock = artifacts.require('CoreIssuanceLibraryMock');
const ERC20Wrapper = artifacts.require('ERC20Wrapper');
const ERC20WrapperMock = artifacts.require('ERC20WrapperMock');
const ExchangeIssuanceLibraryMock = artifacts.require('ExchangeIssuanceLibraryMock');
const PlaceBidMock = artifacts.require('PlaceBidMock');
const RebalancingSetIssuanceMock = artifacts.require('RebalancingSetIssuanceMock');
const SetMathMock = artifacts.require('SetMathMock');
const SetTokenLibrary = artifacts.require('SetTokenLibrary');
const SetTokenLibraryMock = artifacts.require('SetTokenLibraryMock');
const SetUSDValuationMock = artifacts.require('SetUSDValuationMock');
const TokenFlushMock = artifacts.require('TokenFlushMock');
const UpdatableOracleMock = artifacts.require('UpdatableOracleMock');
const ZeroExOrderLibraryMock = artifacts.require('ZeroExOrderLibraryMock');


export class LibraryMockHelper {
  private _contractOwnerAddress: Address;

  constructor(contractOwnerAddress: Address) {
    this._contractOwnerAddress = contractOwnerAddress;
  }

  /* ============ Deployment ============ */

  public async deployCommonValidationsLibraryAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<CommonValidationsLibraryMockContract> {
    const truffleCommonValidationsLibrary = await CommonValidationsLibrary.new(
      { from: this._contractOwnerAddress },
    );

    await CommonValidationsLibraryMock.link('CommonValidationsLibrary', truffleCommonValidationsLibrary.address);

    const commonValidationsMockContract = await CommonValidationsLibraryMock.new(txnFrom(from));

    return new CommonValidationsLibraryMockContract(
      getContractInstance(commonValidationsMockContract),
      txnFrom(from),
    );
  }

  public async deployBytes32LibraryAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<Bytes32LibraryMockContract> {
    const bytes32MockContract = await Bytes32LibraryMock.new(txnFrom(from));

    return new Bytes32LibraryMockContract(getContractInstance(bytes32MockContract), txnFrom(from));
  }

  public async deployCommonMathLibraryAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<CommonMathMockContract> {
    const truffleCommonMathLibrary = await CommonMathMock.new(txnFrom(from));

    return new CommonMathMockContract(
      getContractInstance(truffleCommonMathLibrary),
      txnFrom(from),
    );
  }

  public async deployCoreIssuanceLibraryAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<CoreIssuanceLibraryMockContract> {
    const truffleCoreIssuanceLibrary = await CoreIssuanceLibrary.new(
      { from: this._contractOwnerAddress },
    );

    await CoreIssuanceLibraryMock.link('CoreIssuanceLibrary', truffleCoreIssuanceLibrary.address);

    const truffleCoreIssuanceLibraryMock = await CoreIssuanceLibraryMock.new(txnFrom(from));

    return new CoreIssuanceLibraryMockContract(
      getContractInstance(truffleCoreIssuanceLibraryMock),
      txnFrom(from),
    );
  }

  public async deployExchangeIssuanceLibraryAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<ExchangeIssuanceLibraryMockContract> {
    const exchangeIssuanceMockContract = await ExchangeIssuanceLibraryMock.new(txnFrom(from));

    return new ExchangeIssuanceLibraryMockContract(
      getContractInstance(exchangeIssuanceMockContract),
      txnFrom(from),
    );
  }

  public async deployTokenFlushMockAsync(
    core: CoreContract,
    vault: VaultContract,
    transferProxy: TransferProxyContract,
    from: Address = this._contractOwnerAddress
  ): Promise<TokenFlushMockContract> {
   const truffleERC20Wrapper = await ERC20Wrapper.new({ from: this._contractOwnerAddress });

    await TokenFlushMock.link('ERC20Wrapper', truffleERC20Wrapper.address);

    const tokenFlushMockContract = await TokenFlushMock.new(
      core.address,
      vault.address,
      transferProxy.address,
      txnFrom(from),
    );

    return new TokenFlushMockContract(
      getContractInstance(tokenFlushMockContract),
      txnFrom(from),
    );
  }

  public async deployRebalancingSetIssuanceMockAsync(
    core: CoreContract,
    vault: VaultContract,
    from: Address = this._contractOwnerAddress
  ): Promise<RebalancingSetIssuanceMockContract> {
    const truffleERC20Wrapper = await ERC20Wrapper.new(
      { from: this._contractOwnerAddress },
    );

    await RebalancingSetIssuanceMock.link('ERC20Wrapper', truffleERC20Wrapper.address);

    const rebalancingSetIssuanceMockContract = await RebalancingSetIssuanceMock.new(
      core.address,
      vault.address,
      txnFrom(from),
    );

    return new RebalancingSetIssuanceMockContract(
      getContractInstance(rebalancingSetIssuanceMockContract),
      txnFrom(from),
    );
  }

  public async deployERC20WrapperLibraryAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<ERC20WrapperMockContract> {
    const erc20WrapperMockContract = await ERC20WrapperMock.new(txnFrom(from));

    return new ERC20WrapperMockContract(
      getContractInstance(erc20WrapperMockContract),
      txnFrom(from),
    );
  }

  public async deploySetMathAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<SetMathMockContract> {
    const setMathMockContract = await SetMathMock.new(txnFrom(from));

    return new SetMathMockContract(
      getContractInstance(setMathMockContract),
      txnFrom(from),
    );
  }

  public async deploySetTokenLibraryAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<SetTokenLibraryMockContract> {
    const truffleSetTokenLibrary = await SetTokenLibrary.new(txnFrom(from));

    await SetTokenLibraryMock.link('SetTokenLibrary', truffleSetTokenLibrary.address);

    const setTokenLibraryMockContract = await SetTokenLibraryMock.new(txnFrom(from));

    return new SetTokenLibraryMockContract(
      getContractInstance(setTokenLibraryMockContract),
      txnFrom(from),
    );
  }

  public async deploySetUSDValuationMockAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<SetUSDValuationMockContract> {
    const setValuationMockContract = await SetUSDValuationMock.new(txnFrom(from));

    return new SetUSDValuationMockContract(
      getContractInstance(setValuationMockContract),
      txnFrom(from),
    );
  }

  public async deployUpdatableOracleMocksAsync(
    startingPrices: BigNumber[],
    from: Address = this._contractOwnerAddress
  ): Promise<UpdatableOracleMockContract[]> {
    const mockOracles: UpdatableOracleMockContract[] = [];
    const oraclePromises = _.map(startingPrices, async price => {
      return await UpdatableOracleMock.new(
        price,
        txnFrom(from)
      );
    });

    await Promise.all(oraclePromises).then(oracles => {
      _.each(oracles, oracleMock => {
        mockOracles.push(new UpdatableOracleMockContract(
          new web3.eth.Contract(oracleMock.abi, oracleMock.address),
          txnFrom(from)
        ));
      });
    });

    return mockOracles;
  }

  public async deployUpdatableOracleMockAsync(
    price: BigNumber,
    from: Address = this._contractOwnerAddress
  ): Promise<UpdatableOracleMockContract> {
    const oracleMock = await UpdatableOracleMock.new(price, txnFrom(from));

    return new UpdatableOracleMockContract(getContractInstance(oracleMock), txnFrom(from));
  }

  public getUpdatableOracleMockInstance(
     oracleAddress: Address,
     from: Address = this._contractOwnerAddress,
  ): UpdatableOracleMockContract {
    return new UpdatableOracleMockContract(
      getContractInstance(UpdatableOracleMock, oracleAddress),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployZeroExOrderLibraryAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<ZeroExOrderLibraryMockContract> {
    const zeroExExchangeWrapperInstance = await ZeroExOrderLibraryMock.new(txnFrom(from));

    return new ZeroExOrderLibraryMockContract(
      getContractInstance(zeroExExchangeWrapperInstance),
      txnFrom(from),
    );
  }

  public async deployPlaceBidMockAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<PlaceBidMockContract> {
    const placeBidMockContract = await PlaceBidMock.new(txnFrom(from));

    return new PlaceBidMockContract(getContractInstance(placeBidMockContract), txnFrom(from));
  }
}
