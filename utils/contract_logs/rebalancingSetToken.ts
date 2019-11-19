import { BigNumber } from 'bignumber.js';
import { Address, Log } from 'set-protocol-utils';


export function getExpectedTransferLog(
  from: Address,
  to: Address,
  value: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'Transfer',
    address: contractAddress,
    args: {
      from,
      to,
      value,
    },
  }];
}

export function getExpectedNewManagerAddedLog(
  newManager: Address,
  oldManager: Address,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'NewManagerAdded',
    address: contractAddress,
    args: {
      newManager,
      oldManager,
    },
  }];
}

export function getExpectedRebalanceProposedLog(
  nextSet: Address,
  auctionLibrary: Address,
  proposalPeriodEndTime: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'RebalanceProposed',
    address: contractAddress,
    args: {
      nextSet,
      auctionLibrary,
      proposalPeriodEndTime,
    },
  }];
}

export function getExpectedRebalanceStartedLog(
  oldSet: Address,
  newSet: Address,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'RebalanceStarted',
    address: contractAddress,
    args: {
      oldSet,
      newSet,
    },
  }];
}
