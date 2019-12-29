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

export function getExpectedNewEntryFeeLog(
  newEntryFee: BigNumber,
  oldEntryFee: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'NewEntryFee',
    address: contractAddress,
    args: {
      newEntryFee,
      oldEntryFee,
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

export function getExpectedNewLiquidatorAddedLog(
  newLiquidator: Address,
  oldLiquidator: Address,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'NewLiquidatorAdded',
    address: contractAddress,
    args: {
      newLiquidator,
      oldLiquidator,
    },
  }];
}

export function getExpectedEntryFeePaidLog(
  feeRecipient: Address,
  feeQuantity: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'EntryFeePaid',
    address: contractAddress,
    args: {
      feeRecipient,
      feeQuantity,
    },
  }];
}

export function getExpectedNewFeeRecipientAddedLog(
  newFeeRecipient: Address,
  oldFeeRecipient: Address,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'NewFeeRecipient',
    address: contractAddress,
    args: {
      newFeeRecipient,
      oldFeeRecipient,
    },
  }];
}

export function getExpectedRebalanceStartedLog(
  oldSet: Address,
  newSet: Address,
  rebalanceIndex: BigNumber,
  currentSetQuantity: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'RebalanceStarted',
    address: contractAddress,
    args: {
      oldSet,
      newSet,
      rebalanceIndex,
      currentSetQuantity,
    },
  }];
}

export function getExpectedRebalanceSettledLog(
  feeRecipient: Address,
  feeQuantity: BigNumber,
  feePercentage: BigNumber,
  rebalanceIndex: BigNumber,
  issueQuantity: BigNumber,
  unitShares: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'RebalanceSettled',
    address: contractAddress,
    args: {
      feeRecipient,
      feeQuantity,
      feePercentage,
      rebalanceIndex,
      issueQuantity,
      unitShares,
    },
  }];
}
