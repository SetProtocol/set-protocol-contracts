import { BigNumber } from 'bignumber.js';
import { Address, Log } from 'set-protocol-utils';

export function getExpectedIncentiveFeePaidLog(
  feeRecipient: Address,
  feeQuantity: BigNumber,
  feePercentage: BigNumber,
  newUnitShares: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'IncentiveFeePaid',
    address: contractAddress,
    args: {
      feeRecipient,
      feeQuantity,
      feePercentage,
      newUnitShares,
    },
  }];
}
