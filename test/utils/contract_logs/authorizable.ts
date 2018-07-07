import * as _ from "lodash";
import * as LogUtils from "../logs";

import { Address, Log } from "../../../types/common";


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
  addressRemoved: Address,
  authorizedBy: Address,
  contractAddress: Address,
): Log[] {
  return [{
    event: "AuthorizedAddressRemoved",
    address: contractAddress,
    args: {
      addressRemoved,
      authorizedBy,
    },
  }];
};