import { Address } from 'set-protocol-utils';
import {
  PayableExchangeIssuanceContract
} from '../contracts';
import {
  getWeb3,
} from '../web3Helper';

const web3 = getWeb3();
const ERC20Wrapper = artifacts.require('ERC20Wrapper');
const PayableExchangeIssuance = artifacts.require('PayableExchangeIssuance');


export class PayableExchangeIssuanceWrapper {
  private _contractOwnerAddress: Address;

  constructor(contractOwnerAddress: Address) {
    this._contractOwnerAddress = contractOwnerAddress;
  }

  /* ============ Deployment ============ */

  public async deployPayableExchangeIssuanceAsync(
    core: Address,
    transferProxy: Address,
    exchangeIssuanceModule: Address,
    wrappedEther: Address,
    from: Address = this._contractOwnerAddress
  ): Promise<PayableExchangeIssuanceContract> {
    const erc20WrapperLibrary = await ERC20Wrapper.new(
      { from: this._contractOwnerAddress },
    );

    await PayableExchangeIssuance.link('ERC20Wrapper', erc20WrapperLibrary.address);

    const payableExchangeIssuanceContract = await PayableExchangeIssuance.new(
      core,
      transferProxy,
      exchangeIssuanceModule,
      wrappedEther,
      { from },
    );

    return new PayableExchangeIssuanceContract(
      new web3.eth.Contract(payableExchangeIssuanceContract.abi, payableExchangeIssuanceContract.address),
      { from },
    );
  }
}
