import * as _ from 'lodash';
import { Address } from 'set-protocol-utils';

import {
  AddressToAddressWhiteListContract,
} from '../contracts';
import {
  DEFAULT_GAS,
} from '../constants';
import { getContractInstance } from '../web3Helper';

const AddressToAddressWhiteList = artifacts.require('AddressToAddressWhiteList');

export class UtilsHelper {
  private _tokenOwnerAddress: Address;

  constructor(tokenOwnerAddress: Address) {
    this._tokenOwnerAddress = tokenOwnerAddress;
  }

  /* ============ Deployment ============ */

  public async deployAddressToAddressWhiteListAsync(
    initialKeyTypeAddresses: Address[] = [],
    initialValueTypeAddresses: Address[] = [],
    from: Address = this._tokenOwnerAddress
  ): Promise<AddressToAddressWhiteListContract> {
    const truffleWhiteList = await AddressToAddressWhiteList.new(
      initialKeyTypeAddresses,
      initialValueTypeAddresses,
      { from },
    );

    return new AddressToAddressWhiteListContract(
      getContractInstance(truffleWhiteList),
      { from, gas: DEFAULT_GAS },
    );
  }
}
