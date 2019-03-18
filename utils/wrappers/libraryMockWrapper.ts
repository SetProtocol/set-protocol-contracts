import { Address } from 'set-protocol-utils';
import {
  Bytes32MockContract,
  CommonMathMockContract,
  CoreIssuanceLibraryMockContract,
  ERC20WrapperMockContract,
  ExchangeIssuanceLibraryMockContract,
  ZeroExOrderLibraryMockContract
} from '../contracts';
import {
  getWeb3,
} from '../web3Helper';

const web3 = getWeb3();
const CoreIssuanceLibrary = artifacts.require('CoreIssuanceLibrary');
const CoreIssuanceLibraryMock = artifacts.require('CoreIssuanceLibraryMock');
const ERC20WrapperMock = artifacts.require('ERC20WrapperMock');
const Bytes32Mock = artifacts.require('Bytes32Mock');
const CommonMathMock = artifacts.require('CommonMathMock');
const ExchangeIssuanceLibraryMock = artifacts.require('ExchangeIssuanceLibraryMock');
const ZeroExOrderLibraryMock = artifacts.require('ZeroExOrderLibraryMock');


export class LibraryMockWrapper {
  private _contractOwnerAddress: Address;

  constructor(contractOwnerAddress: Address) {
    this._contractOwnerAddress = contractOwnerAddress;
  }

  /* ============ Deployment ============ */

  public async deployBytes32LibraryAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<Bytes32MockContract> {
    const bytes32MockContract = await Bytes32Mock.new(
      { from },
    );

    return new Bytes32MockContract(
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
