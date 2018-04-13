import { BigNumber } from "bignumber.js";
import * as _ from "lodash";
import * as LogUtils from "./log_utils";

import { Address, Bytes32, UInt } from "../../types/common";

interface LogInterface {
  address: Address;
  args: any;
  event: string;
}

export function LogIssuance(
  senderAddress: Address,
  quantity: BigNumber,
  setTokenAddress: Address,
): LogInterface {
  return {
    event: "LogIssuance",
    address: setTokenAddress,
    args: {
      _sender: senderAddress,
      _quantity: quantity,
    },
  };
}

export function LogTransfer(
  from: Address,
  to: Address,
  value: BigNumber,
  tokenAddress: Address,
): LogInterface {
  return {
    event: "Transfer",
    address: tokenAddress,
    args: {
      from,
      to,
      value,
    },
  };
}

export function getExpectedIssueLogs(
  componentAddresses: Address[],
  quantityTransferred: BigNumber[],
  setTokenAddress: Address,
  quantityIssued: BigNumber,
  sender: Address,
): LogInterface[] {
  const result: LogInterface[] = [];
  // Create transfer logs from components and units
  _.each(componentAddresses, (componentAddress, index) => {
    result.push(LogTransfer(
      sender,
      setTokenAddress,
      quantityTransferred[index],
      componentAddresses[index],
    ));
  });

  // Create Issuance Log
  result.push(LogIssuance(
    sender,
    quantityIssued,
    setTokenAddress,
  ));

  return result;
}
