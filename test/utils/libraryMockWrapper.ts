import * as _ from "lodash";

import { CommonMathMockContract } from "../../types/generated/common_math_mock";
import { ERC20WrapperMockContract } from "../../types/generated/e_r_c20_wrapper_mock";

import { BigNumber } from "bignumber.js";
import { Address } from "../../types/common.js";
import { DEFAULT_GAS } from "../utils/constants";

const ERC20WrapperMock = artifacts.require("ERC20WrapperMock");
const CommonMathMock = artifacts.require("CommonMathMock");


export class LibraryMockWrapper {
  private _contractOwnerAddress: Address;

  constructor(contractOwnerAddress: Address) {
    this._contractOwnerAddress = contractOwnerAddress;
  }

  /* ============ Deployment ============ */

  public async deployCommonMathLibraryAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<CommonMathMockContract> {
    const truffleCommonMathLibrary = await CommonMathMock.new(
      { from },
    );

    return new CommonMathMockContract(
      web3.eth.contract(truffleCommonMathLibrary.abi).at(truffleCommonMathLibrary.address),
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
      web3.eth.contract(erc20WrapperMockContract.abi).at(erc20WrapperMockContract.address),
      { from },
    );
  }
}
