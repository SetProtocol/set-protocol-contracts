import * as _ from "lodash";
import * as LogUtils from "./log_utils";

import { Address, Log } from "../../types/common";


export function getExpectedAddAuthorizedLog(
  params: any[],
  contractAddress: Address,
): Log[] {
  return [{
    event: "AddressAuthorized",
    address: contractAddress,
    args: {
      authAddress: params[0],
      authorizedBy: params[1],
    },
  }];
};

export function getExpectedRemoveAuthorizedLog(
  params: any[],
  contractAddress: Address,
): Log[] {
  return [{
    event: "AuthorizedAddressRemoved",
    address: contractAddress,
    args: {
      authAddress: params[0],
      authorizedBy: params[1],
    },
  }];
};