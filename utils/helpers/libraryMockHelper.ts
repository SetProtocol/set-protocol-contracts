import { Address } from 'set-protocol-utils';
import {
  CommonValidationsLibraryMockContract,
  CoreContract,
  Bytes32LibraryMockContract,
  CommonMathMockContract,
  CoreIssuanceLibraryMockContract,
  ERC20WrapperMockContract,
  ExchangeIssuanceLibraryMockContract,
  RebalancingSetIssuanceMockContract,
  SetTokenLibraryMockContract,
  TransferProxyContract,
  TokenFlushMockContract,
  VaultContract,
  ZeroExOrderLibraryMockContract
} from '../contracts';
import {
  getWeb3,
} from '../web3Helper';

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
const RebalancingSetIssuanceMock = artifacts.require('RebalancingSetIssuanceMock');
const SetTokenLibrary = artifacts.require('SetTokenLibrary');
const SetTokenLibraryMock = artifacts.require('SetTokenLibraryMock');
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

    const commonValidationsMockContract = await CommonValidationsLibraryMock.new(
      { from },
    );

    return new CommonValidationsLibraryMockContract(
      new web3.eth.Contract(commonValidationsMockContract.abi, commonValidationsMockContract.address),
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
      new web3.eth.Contract(bytes32MockContract.abi, bytes32MockContract.address),
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
      new web3.eth.Contract(truffleCommonMathLibrary.abi, truffleCommonMathLibrary.address),
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
      new web3.eth.Contract(truffleCoreIssuanceLibraryMock.abi, truffleCoreIssuanceLibraryMock.address),
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
      new web3.eth.Contract(exchangeIssuanceMockContract.abi, exchangeIssuanceMockContract.address),
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
      new web3.eth.Contract(tokenFlushMockContract.abi, tokenFlushMockContract.address),
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
      new web3.eth.Contract(rebalancingSetIssuanceMockContract.abi, rebalancingSetIssuanceMockContract.address),
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
      new web3.eth.Contract(erc20WrapperMockContract.abi, erc20WrapperMockContract.address),
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
      new web3.eth.Contract(setTokenLibraryMockContract.abi, setTokenLibraryMockContract.address),
      { from },
    );
  }

  public async deployZeroExOrderLibraryAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<ZeroExOrderLibraryMockContract> {
    const zeroExExchangeWrapperInstance = await ZeroExOrderLibraryMock.new(
      { from },
    );

    return new ZeroExOrderLibraryMockContract(
      new web3.eth.Contract(zeroExExchangeWrapperInstance.abi, zeroExExchangeWrapperInstance.address),
      { from },
    );
  }
}
