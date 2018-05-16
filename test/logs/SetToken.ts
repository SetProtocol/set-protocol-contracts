import { BigNumber } from "bignumber.js";
import * as _ from "lodash";
import * as LogUtils from "./log_utils";

import { Address, Bytes32, Log } from "../../types/common";

const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

export function LogTransfer(
  from: Address,
  to: Address,
  value: BigNumber,
  tokenAddress: Address,
): Log {
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
): Log {
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
): Log {
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
): Log {
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
): Log {
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
): Log[] {
  const result: Log[] = [];
  // Create transfer logs from components and units
  _.each(componentAddresses, (componentAddress, index) => {
    result.push(LogTransfer(
      sender,
      setTokenAddress,
      quantityTransferred[index],
      componentAddresses[index],
    ));
  });

  // Add mint transfer Log
  result.push(LogTransfer(
    NULL_ADDRESS,
    sender,
    quantityIssued,
    setTokenAddress,
  ));

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
): Log[] {
  const result: Log[] = [];

  // Add burn transfer Log
  result.push(LogTransfer(
    sender,
    NULL_ADDRESS,
    quantityRedeemed,
    setTokenAddress,
  ));

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
): Log[] {
  const result: Log[] = [];

  // Add burn transfer Log
  result.push(LogTransfer(
    sender,
    NULL_ADDRESS,
    quantityRedeemed,
    setTokenAddress,
  ));

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
): Log[] {
  const result: Log[] = [];
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
