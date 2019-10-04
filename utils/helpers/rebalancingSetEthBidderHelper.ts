import { Address } from 'set-protocol-utils';
import {
  RebalancingSetEthBidderContract,
} from '../contracts';
import { getWeb3 } from '../web3Helper';

const web3 = getWeb3();

const ERC20Wrapper = artifacts.require('ERC20Wrapper');
const RebalancingSetEthBidder = artifacts.require('RebalancingSetEthBidder');


export class RebalancingSetEthBidderHelper {
  private _contractOwnerAddress: Address;

  constructor(contractOwnerAddress: Address) {
    this._contractOwnerAddress = contractOwnerAddress;
  }

  /* ============ Deployment ============ */

  public async deployRebalancingSetEthBidderAsync(
    rebalanceAuctionModuleAddress: Address,
    transferProxyAddress: Address,
    wethAddress: Address,
    from: Address = this._contractOwnerAddress
  ): Promise<RebalancingSetEthBidderContract> {
    const erc20WrapperLibrary = await ERC20Wrapper.new(
      { from: this._contractOwnerAddress },
    );

    await RebalancingSetEthBidder.link('ERC20Wrapper', erc20WrapperLibrary.address);

    const rebalancingSetEthBidderContract = await RebalancingSetEthBidder.new(
      rebalanceAuctionModuleAddress,
      transferProxyAddress,
      wethAddress,
      { from },
    );

    return new RebalancingSetEthBidderContract(
      new web3.eth.Contract(rebalancingSetEthBidderContract.abi, rebalancingSetEthBidderContract.address),
      { from },
    );
  }
}
