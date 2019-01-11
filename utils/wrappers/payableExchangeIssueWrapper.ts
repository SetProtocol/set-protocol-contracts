import { Address } from 'set-protocol-utils';
import {
  PayableExchangeIssueContract
} from '../contracts';
import {
  getWeb3,
} from '../web3Helper';

const web3 = getWeb3();
const ERC20Wrapper = artifacts.require('ERC20Wrapper');
const PayableExchangeIssue = artifacts.require('PayableExchangeIssue');


export class PayableExchangeIssueWrapper {
  private _contractOwnerAddress: Address;

  constructor(contractOwnerAddress: Address) {
    this._contractOwnerAddress = contractOwnerAddress;
  }

  /* ============ Deployment ============ */

  public async deployPayableExchangeIssueAsync(
    core: Address,
    transferProxy: Address,
    exchangeIssueModule: Address,
    wrappedEther: Address,
    from: Address = this._contractOwnerAddress
  ): Promise<PayableExchangeIssueContract> {
    const erc20WrapperLibrary = await ERC20Wrapper.new(
      { from: this._contractOwnerAddress },
    );

    await PayableExchangeIssue.link('ERC20Wrapper', erc20WrapperLibrary.address);

    const payableExchangeIssueContract = await PayableExchangeIssue.new(
      core,
      transferProxy,
      exchangeIssueModule,
      wrappedEther,
      { from },
    );

    return new PayableExchangeIssueContract(
      new web3.eth.Contract(payableExchangeIssueContract.abi, payableExchangeIssueContract.address),
      { from },
    );
  }
}
