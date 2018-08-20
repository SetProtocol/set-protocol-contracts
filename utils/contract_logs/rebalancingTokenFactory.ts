import { Address, Log } from 'set-protocol-utils';

export function getRebalancingSetTokenAddressFromLogs(
  logs: Log[]
): Address {
  return logs[0].args._setTokenAddress;
}
