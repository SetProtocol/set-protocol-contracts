import { Address } from 'set-protocol-utils';
import {
  ERC20ViewerContract,
  ProtocolViewerContract,
  RebalancingSetTokenViewerContract
} from '../contracts';
import { getWeb3 } from '../web3Helper';

const web3 = getWeb3();
const ERC20Viewer = artifacts.require('ERC20Viewer');
const ProtocolViewer = artifacts.require('ProtocolViewer');
const RebalancingSetTokenViewer = artifacts.require('RebalancingSetTokenViewer');


export class ProtocolViewerHelper {
  private _contractOwnerAddress: Address;

  constructor(contractOwnerAddress: Address) {
    this._contractOwnerAddress = contractOwnerAddress;
  }

  /* ============ Deployment ============ */

  public async deployERC20ViewerContract(
    from: Address = this._contractOwnerAddress
  ): Promise<ERC20ViewerContract> {
    const erc20ViewerContract = await ERC20Viewer.new(
      { from },
    );

    return new ERC20ViewerContract(
      new web3.eth.Contract(erc20ViewerContract.abi, erc20ViewerContract.address),
      { from },
    );
  }

  public async deployProtocolViewerAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<ProtocolViewerContract> {
    const protocolViewerContract = await ProtocolViewer.new(
      { from },
    );

    return new ProtocolViewerContract(
      new web3.eth.Contract(protocolViewerContract.abi, protocolViewerContract.address),
      { from },
    );
  }

  public async deployRebalancingSetTokenViewerAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<RebalancingSetTokenViewerContract> {
    const rebalancingSetTokenViewer = await RebalancingSetTokenViewer.new(
      { from },
    );

    return new RebalancingSetTokenViewerContract(
      new web3.eth.Contract(rebalancingSetTokenViewer.abi, rebalancingSetTokenViewer.address),
      { from },
    );
  }
}
