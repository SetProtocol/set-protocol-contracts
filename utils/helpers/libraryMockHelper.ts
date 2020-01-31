import { Address } from 'set-protocol-utils';
import * as _ from 'lodash';
import {
  CommonValidationsLibraryMockContract,
  CoreContract,
  Bytes32LibraryMockContract,
  CommonMathMockContract,
  CompoundUtilsMockContract,
  CoreIssuanceLibraryMockContract,
  ERC20WrapperMockContract,
  ExchangeIssuanceLibraryMockContract,
  PlaceBidMockContract,
  RebalanceMockContract,
  RebalanceStateSetTokenMockContract,
  RebalancingSetIssuanceMockContract,
  SetMathMockContract,
  SetTokenLibraryMockContract,
  SetUSDValuationMockContract,
  TransferProxyContract,
  TokenFlushMockContract,
  VaultContract,
  ZeroExOrderLibraryMockContract
} from '../contracts';
import { BigNumber } from 'bignumber.js';
import { getContractInstance, txnFrom } from '../web3Helper';
import { ZERO } from '../constants';

const Bytes32LibraryMock = artifacts.require('Bytes32LibraryMock');
const CommonMathMock = artifacts.require('CommonMathMock');
const CommonValidationsLibrary = artifacts.require('CommonValidationsLibrary');
const CommonValidationsLibraryMock = artifacts.require('CommonValidationsLibraryMock');
const CompoundUtilsMock = artifacts.require('CompoundUtilsMock');
const CoreIssuanceLibrary = artifacts.require('CoreIssuanceLibrary');
const CoreIssuanceLibraryMock = artifacts.require('CoreIssuanceLibraryMock');
const ERC20Wrapper = artifacts.require('ERC20Wrapper');
const ERC20WrapperMock = artifacts.require('ERC20WrapperMock');
const ExchangeIssuanceLibraryMock = artifacts.require('ExchangeIssuanceLibraryMock');
const PlaceBidMock = artifacts.require('PlaceBidMock');
const RebalanceMock = artifacts.require('RebalanceMock');
const RebalancingSetIssuanceMock = artifacts.require('RebalancingSetIssuanceMock');
const SetMathMock = artifacts.require('SetMathMock');
const SetTokenLibrary = artifacts.require('SetTokenLibrary');
const SetTokenLibraryMock = artifacts.require('SetTokenLibraryMock');
const RebalanceStateSetTokenMock = artifacts.require('RebalanceStateSetTokenMock');
const SetUSDValuationMock = artifacts.require('SetUSDValuationMock');
const TokenFlushMock = artifacts.require('TokenFlushMock');
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

  public async deployCompoundUtilsLibraryMockAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<CompoundUtilsMockContract> {
    const compoundUtilsMockContract = await CompoundUtilsMock.new(txnFrom(from));

    return new CompoundUtilsMockContract(getContractInstance(compoundUtilsMockContract), txnFrom(from));
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

  public async deployRebalanceMockAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<RebalanceMockContract> {
    const rebalanceMockContract = await RebalanceMock.new(txnFrom(from));

    return new RebalanceMockContract(getContractInstance(rebalanceMockContract), txnFrom(from));
  }

  public async deployRebalanceStateSetTokenMockAsync(
    combinedTokenArray: Address[],
    inflowArray: BigNumber[],
    outflowArray: BigNumber[],
    name: string = 'Rebalancing Set Token',
    symbol: string = 'RBSET',
    decimals: BigNumber = new BigNumber(18),
    from: Address = this._contractOwnerAddress
  ): Promise<RebalanceStateSetTokenMockContract> {
    const rebalanceStateSetTokenMock = await RebalanceStateSetTokenMock.new(
      name,
      symbol,
      decimals,
      combinedTokenArray,
      inflowArray,
      outflowArray,
      txnFrom(from)
    );

    return new RebalanceStateSetTokenMockContract(getContractInstance(rebalanceStateSetTokenMock), txnFrom(from));
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

  public ceilLog10(
    value: BigNumber
  ): BigNumber {
    const valueNum = value.toNumber();
    if (valueNum == 1) return ZERO;

    let x = valueNum - 1;

    let result = 0;

    if (x >= 10000000000000000000000000000000000000000000000000000000000000000) {
      x /= 10000000000000000000000000000000000000000000000000000000000000000;
      result += 64;
    }
    if (x >= 100000000000000000000000000000000) {
      x /= 100000000000000000000000000000000;
      result += 32;
    }
    if (x >= 10000000000000000) {
      x /= 10000000000000000;
      result += 16;
    }
    if (x >= 100000000) {
      x /= 100000000;
      result += 8;
    }
    if (x >= 10000) {
      x /= 10000;
      result += 4;
    }
    if (x >= 100) {
      x /= 100;
      result += 2;
    }
    if (x >= 10) {
      x /= 10;
      result += 1;
    }

    return new BigNumber(result + 1);
  }
}
