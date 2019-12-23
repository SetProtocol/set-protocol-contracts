import { Address } from 'set-protocol-utils';
import {
  ERC20ViewerContract,
  ProtocolViewerContract,
  RebalancingSetTokenViewerContract,
  SocialTradingManagerMockContract,
  TradingPoolViewerContract,
} from '../contracts';
import { getContractInstance, txnFrom } from '../web3Helper';

const ERC20Viewer = artifacts.require('ERC20Viewer');
const ProtocolViewer = artifacts.require('ProtocolViewer');
const RebalancingSetTokenViewer = artifacts.require('RebalancingSetTokenViewer');
const SocialTradingManagerMock = artifacts.require('SocialTradingManagerMock');
const TradingPoolViewer = artifacts.require('TradingPoolViewer');


export class ProtocolViewerHelper {
  private _contractOwnerAddress: Address;

  constructor(contractOwnerAddress: Address) {
    this._contractOwnerAddress = contractOwnerAddress;
  }

  /* ============ Deployment ============ */

  public async deployERC20ViewerContract(
    from: Address = this._contractOwnerAddress
  ): Promise<ERC20ViewerContract> {
    const erc20ViewerContract = await ERC20Viewer.new(txnFrom(from));

    return new ERC20ViewerContract(
      getContractInstance(erc20ViewerContract),
      txnFrom(from),
    );
  }

  public async deployProtocolViewerAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<ProtocolViewerContract> {
    const protocolViewerContract = await ProtocolViewer.new(txnFrom(from));

    return new ProtocolViewerContract(
      getContractInstance(protocolViewerContract),
      txnFrom(from),
    );
  }

  public async deployRebalancingSetTokenViewerAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<RebalancingSetTokenViewerContract> {
    const rebalancingSetTokenViewer = await RebalancingSetTokenViewer.new(txnFrom(from));

    return new RebalancingSetTokenViewerContract(
      getContractInstance(rebalancingSetTokenViewer),
      txnFrom(from),
    );
  }

  public async deployTradingPoolViewerAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<TradingPoolViewerContract> {
    const
    tradingPoolViewer = await TradingPoolViewer.new(
      txnFrom(from)
    );

    return new TradingPoolViewerContract(
      getContractInstance(tradingPoolViewer),
      txnFrom(from),
    );
  }

  public async deploySocialTradingManagerMockAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<SocialTradingManagerMockContract> {
    const
    socialManager = await SocialTradingManagerMock.new(
      txnFrom(from)
    );

    return new SocialTradingManagerMockContract(
      getContractInstance(socialManager),
      txnFrom(from),
    );
  }
}
