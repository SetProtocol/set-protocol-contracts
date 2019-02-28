import { Address, Log } from 'set-protocol-utils';

export interface FeedCreatedArgs {
   sender: Address;
   feed: Address;
}

export function FeedCreated(
   _factory: Address,
   sender: Address,
   feed: Address,
): Log {
  return {
    event: 'Created',
    address: _factory,
    args: {
      sender,
      feed,
    },
  };
}