import { Address } from 'set-protocol-utils';
import * as _ from 'lodash';
import {
  CoreContract,
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
import {
  getContractInstance,
  linkLibrariesToDeploy,
  importArtifactsFromSource,
  txnFrom
} from '../web3Helper';
import { ZERO } from '../constants';

const CoreIssuanceLibrary = importArtifactsFromSource('CoreIssuanceLibrary');
const CoreIssuanceLibraryMock = importArtifactsFromSource('CoreIssuanceLibraryMock');
const ERC20Wrapper = importArtifactsFromSource('ERC20Wrapper');
const ERC20WrapperMock = importArtifactsFromSource('ERC20WrapperMock');
const ExchangeIssuanceLibraryMock = importArtifactsFromSource('ExchangeIssuanceLibraryMock');
const PlaceBidMock = importArtifactsFromSource('PlaceBidMock');
const RebalanceMock = importArtifactsFromSource('RebalanceMock');
const RebalancingSetIssuanceMock = importArtifactsFromSource('RebalancingSetIssuanceMock');
const SetMathMock = importArtifactsFromSource('SetMathMock');
const SetTokenLibrary = importArtifactsFromSource('SetTokenLibrary');
const SetTokenLibraryMock = importArtifactsFromSource('SetTokenLibraryMock');
const RebalanceStateSetTokenMock = importArtifactsFromSource('RebalanceStateSetTokenMock');
const SetUSDValuationMock = importArtifactsFromSource('SetUSDValuationMock');
const TokenFlushMock = importArtifactsFromSource('TokenFlushMock');
const ZeroExOrderLibraryMock = importArtifactsFromSource('ZeroExOrderLibraryMock');


export class LibraryMockHelper {
  private _contractOwnerAddress: Address;

  constructor(contractOwnerAddress: Address) {
    this._contractOwnerAddress = contractOwnerAddress;
  }

  /* ============ Deployment ============ */

  public async deployCoreIssuanceLibraryAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<CoreIssuanceLibraryMockContract> {
    await linkLibrariesToDeploy(CoreIssuanceLibraryMock, [CoreIssuanceLibrary], this._contractOwnerAddress);

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
    await linkLibrariesToDeploy(TokenFlushMock, [ERC20Wrapper], this._contractOwnerAddress);

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
    await linkLibrariesToDeploy(RebalancingSetIssuanceMock, [ERC20Wrapper], this._contractOwnerAddress);

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
    await linkLibrariesToDeploy(SetTokenLibraryMock, [SetTokenLibrary], this._contractOwnerAddress);

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
