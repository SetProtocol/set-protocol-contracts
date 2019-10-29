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
import { getWeb3, getContractInstance } from '../web3Helper';
import { DEFAULT_GAS } from '@utils/constants';

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

    const commonValidationsMockContract = await CommonValidationsLibraryMock.new(
      { from },
    );

    return new CommonValidationsLibraryMockContract(
      getContractInstance(commonValidationsMockContract),
      { from },
    );
  }

  public async deployBytes32LibraryAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<Bytes32LibraryMockContract> {
    const bytes32MockContract = await Bytes32LibraryMock.new(
      { from },
    );

    return new Bytes32LibraryMockContract(
      getContractInstance(bytes32MockContract),
      { from },
    );
  }

  public async deployCommonMathLibraryAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<CommonMathMockContract> {
    const truffleCommonMathLibrary = await CommonMathMock.new(
      { from },
    );

    return new CommonMathMockContract(
      getContractInstance(truffleCommonMathLibrary),
      { from },
    );
  }

  public async deployCoreIssuanceLibraryAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<CoreIssuanceLibraryMockContract> {
    const truffleCoreIssuanceLibrary = await CoreIssuanceLibrary.new(
      { from: this._contractOwnerAddress },
    );

    await CoreIssuanceLibraryMock.link('CoreIssuanceLibrary', truffleCoreIssuanceLibrary.address);

    const truffleCoreIssuanceLibraryMock = await CoreIssuanceLibraryMock.new(
      { from },
    );

    return new CoreIssuanceLibraryMockContract(
      getContractInstance(truffleCoreIssuanceLibraryMock),
      { from },
    );
  }

  public async deployExchangeIssuanceLibraryAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<ExchangeIssuanceLibraryMockContract> {
    const exchangeIssuanceMockContract = await ExchangeIssuanceLibraryMock.new(
      { from },
    );

    return new ExchangeIssuanceLibraryMockContract(
      getContractInstance(exchangeIssuanceMockContract),
      { from },
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
      { from },
    );

    return new TokenFlushMockContract(
      getContractInstance(tokenFlushMockContract),
      { from },
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
      { from },
    );

    return new RebalancingSetIssuanceMockContract(
      getContractInstance(rebalancingSetIssuanceMockContract),
      { from },
    );
  }

  public async deployERC20WrapperLibraryAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<ERC20WrapperMockContract> {
    const erc20WrapperMockContract = await ERC20WrapperMock.new(
      { from },
    );

    return new ERC20WrapperMockContract(
      getContractInstance(erc20WrapperMockContract),
      { from },
    );
  }

  public async deploySetMathAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<SetMathMockContract> {
    const setMathMockContract = await SetMathMock.new({ from });

    return new SetMathMockContract(
      getContractInstance(setMathMockContract),
      { from },
    );
  }

  public async deploySetTokenLibraryAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<SetTokenLibraryMockContract> {
    const truffleSetTokenLibrary = await SetTokenLibrary.new(
      { from: this._contractOwnerAddress },
    );

    await SetTokenLibraryMock.link('SetTokenLibrary', truffleSetTokenLibrary.address);

    const setTokenLibraryMockContract = await SetTokenLibraryMock.new(
      { from },
    );

    return new SetTokenLibraryMockContract(
      getContractInstance(setTokenLibraryMockContract),
      { from },
    );
  }

  public async deploySetUSDValuationMockAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<SetUSDValuationMockContract> {
    const setValuationMockContract = await SetUSDValuationMock.new({ from });

    return new SetUSDValuationMockContract(
      getContractInstance(setValuationMockContract),
      { from },
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
        { from }
      );
    });

    await Promise.all(oraclePromises).then(oracles => {
      _.each(oracles, oracleMock => {
        mockOracles.push(new UpdatableOracleMockContract(
          new web3.eth.Contract(oracleMock.abi, oracleMock.address),
          { from }
        ));
      });
    });

    return mockOracles;
  }

  public async deployUpdatableOracleMockAsync(
    price: BigNumber,
    from: Address = this._contractOwnerAddress
  ): Promise<UpdatableOracleMockContract> {
    const oracleMock = await UpdatableOracleMock.new(price, { from });

    return new UpdatableOracleMockContract(
      getContractInstance(oracleMock),
      { from }
    );
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
    const zeroExExchangeWrapperInstance = await ZeroExOrderLibraryMock.new(
      { from },
    );

    return new ZeroExOrderLibraryMockContract(
      getContractInstance(zeroExExchangeWrapperInstance),
      { from },
    );
  }

  public async deployPlaceBidMockAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<PlaceBidMockContract> {
    const placeBidMockContract = await PlaceBidMock.new(
      { from },
    );

    return new PlaceBidMockContract(
      getContractInstance(placeBidMockContract),
      { from },
    );
  }
}
