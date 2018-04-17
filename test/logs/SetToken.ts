import { BigNumber } from "bignumber.js";
import * as _ from "lodash";
import * as LogUtils from "./log_utils";

import { Address, Bytes32, UInt } from "../../types/common";

interface LogInterface {
  address: Address;
  args: any;
  event: string;
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

export function LogRedemption(
  senderAddress: Address,
  quantity: BigNumber,
  setTokenAddress: Address,
): LogInterface {
  return {
    event: "LogRedemption",
    address: setTokenAddress,
    args: {
      _sender: senderAddress,
      _quantity: quantity,
    },
  };
}

export function LogPartialRedemption(
  senderAddress: Address,
  quantity: BigNumber,
  setTokenAddress: Address,
  excludedComponents: Address[],
): LogInterface {
  return {
    event: "LogPartialRedemption",
    address: setTokenAddress,
    args: {
      _sender: senderAddress,
      _quantity: quantity,
      _excludedComponents: excludedComponents,
    },
  };
}

export function LogRedeemExcluded(
  senderAddress: Address,
  setTokenAddress: Address,
  components: Address[],
): LogInterface {
  return {
    event: "LogRedeemExcluded",
    address: setTokenAddress,
    args: {
      _sender: senderAddress,
      _components: components,
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

export function getExpectedRedeemLogs(
  componentAddresses: Address[],
  quantityTransferred: BigNumber[],
  setTokenAddress: Address,
  quantityRedeemed: BigNumber,
  sender: Address,
): LogInterface[] {
  const result: LogInterface[] = [];
  // Create transfer logs from components and units
  _.each(componentAddresses, (componentAddress, index) => {
    result.push(LogTransfer(
      setTokenAddress,
      sender,
      quantityTransferred[index],
      componentAddresses[index],
    ));
  });

  // Create Redemption Log
  result.push(LogRedemption(
    sender,
    quantityRedeemed,
    setTokenAddress,
  ));

  return result;
}

export function getExpectedPartialRedeemLogs(
  componentAddresses: Address[],
  excludedComponents: Address[],
  quantityTransferred: BigNumber[],
  setTokenAddress: Address,
  quantityRedeemed: BigNumber,
  sender: Address,
): LogInterface[] {
  const result: LogInterface[] = [];
  // Create transfer logs from transferred components and units
  _.each(componentAddresses, (componentAddress, index) => {
    if (_.indexOf(excludedComponents, componentAddress) < 0) {
      result.push(LogTransfer(
        setTokenAddress,
        sender,
        quantityTransferred[index],
        componentAddresses[index],
      ));
    }
  });

  // Create Partial Redemption Log
  result.push(LogPartialRedemption(
    sender,
    quantityRedeemed,
    setTokenAddress,
    excludedComponents,
  ));

  return result;
}

export function getExpectedRedeemExcludedLogs(
  componentAddresses: Address[],
  quantitiesTransferred: BigNumber[],
  setTokenAddress: Address,
  sender: Address,
): LogInterface[] {
  const result: LogInterface[] = [];
  // Create transfer logs from transferred components and units
  _.each(componentAddresses, (componentAddress, index) => {
    result.push(LogTransfer(
      setTokenAddress,
      sender,
      quantitiesTransferred[index],
      componentAddresses[index],
    ));
  });

  // Create Redeem Excluded Log
  result.push(LogRedeemExcluded(
    sender,
    setTokenAddress,
    componentAddresses,
  ));

  return result;
}
