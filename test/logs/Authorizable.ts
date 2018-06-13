import * as _ from "lodash";
import * as LogUtils from "./log_utils";

import { Address, Log } from "../../types/common";


export function getExpectedAddAuthorizedLog(
  authAddress: Address,
  authorizedBy: Address,
  contractAddress: Address,
): Log[] {
  return [{
    event: "AddressAuthorized",
    address: contractAddress,
    args: {
      authAddress,
      authorizedBy,
    },
  }];
};

export function getExpectedRemoveAuthorizedLog(
  authAddress: Address,
  authorizedBy: Address,
  contractAddress: Address,
): Log[] {
  return [{
    event: "AuthorizedAddressRemoved",
    address: contractAddress,
    args: {
      authAddress,
      authorizedBy,
    },
  }];
};