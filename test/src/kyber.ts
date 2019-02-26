/*
  Copyright 2018 Set Labs Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

'use strict';

import * as _ from 'lodash';
import * as ethUtil from 'ethereumjs-util';

import { BigNumber } from './bignumber';
import { constants } from './constants';
import { paddedBufferForPrimitive, paddedBufferForBigNumber } from './encoding';
import { generateExchangeOrderHeader, generateExchangeRedemptionOrderHeader } from './orders';
import { Bytes, KyberTrade, Address } from './types';

/* ============ Kyber Trades Functions ============ */

/**
 * Takes Kyber trades and generates a buffer representing all trades
 *
 * @param  trades              Array of KyberTrade interface
 * @return                     Entire kyber trades data as a buffer
 */

export function generateKyberTradesBuffer(
  trades: KyberTrade[],
): Buffer {
  let totalMakerTokenAmount: BigNumber = constants.ZERO;
  const kyberTradesAsBuffers: Buffer[] = [];

  // Turn all Kyber trades to buffer
  _.map(trades, trade => {
    totalMakerTokenAmount = totalMakerTokenAmount.add(trade.sourceTokenQuantity);
    kyberTradesAsBuffers.push(kyberTradeToBuffer(trade));
  });
  const kyberTradesBuffer: Buffer = Buffer.concat(kyberTradesAsBuffers);

  // Generate header for Kyber trades
  const kyberTradesHeader: Buffer = Buffer.concat(
    generateExchangeOrderHeader(
      constants.EXCHANGES.KYBER,
      trades.length,
      totalMakerTokenAmount,
      kyberTradesBuffer.length,
    )
  );

  return Buffer.concat([kyberTradesHeader, kyberTradesBuffer]);
}

export function generateKyberRedemptionTradesBuffer(
  trades: KyberTrade[],
): Buffer {
  let totalMakerTokenAmount: BigNumber = constants.ZERO;
  const kyberTradesAsBuffers: Buffer[] = [];

  let takerComponentsAddresses: Address[] = [];
  let takerComponentsAmounts: BigNumber[] = [];

  // Turn all Kyber trades to buffer
  _.map(trades, trade => {
    totalMakerTokenAmount = totalMakerTokenAmount.add(trade.sourceTokenQuantity);
    kyberTradesAsBuffers.push(kyberTradeToBuffer(trade));

    let takerAssetIndex = _.findIndex(takerComponentsAddresses, trade.sourceToken);
    if (takerAssetIndex >= 0) {
      // Increment the taker asset amount rather than pushing another element
      takerComponentsAmounts[takerAssetIndex] = takerComponentsAmounts[takerAssetIndex].add(trade.sourceTokenQuantity);
    } else {
      // Wasn't found
      takerComponentsAddresses.push(trade.sourceToken)
      takerComponentsAmounts.push(trade.sourceTokenQuantity);
    }
  });
  const kyberTradesBuffer: Buffer = Buffer.concat(kyberTradesAsBuffers);

  // Generate header for Kyber trades
  const kyberTradesHeader: Buffer = Buffer.concat(
    generateExchangeRedemptionOrderHeader(
      constants.EXCHANGES.KYBER,
      trades.length,
      totalMakerTokenAmount,
      kyberTradesBuffer.length,
      takerComponentsAddresses.length,
      takerComponentsAddresses,
      takerComponentsAmounts
    )
  );

  return Buffer.concat([kyberTradesHeader, kyberTradesBuffer]);
}

/**
 * Takes a Kyber trade object and turns it in hex form. Used to test KyberNetworkWrapper where
 * exchange header is not necessary
 *
 * @param  trade   Object conforming to Kyber trade
 * @return         Kyber trade as a hex string
 */
export function kyberTradesToBytes(
  trade: KyberTrade
): Bytes {
  return ethUtil.bufferToHex(kyberTradeToBuffer(trade));
}

/**
 * Takes a Kyber trade object and turns it into a buffer
 *
 * @param  trade   Object conforming to Kyber trade
 * @return         Kyber trade as a buffer
 */
function kyberTradeToBuffer(
  trade: KyberTrade
): Buffer {
  const kyberSwapBuffer: Buffer[] = [];
  kyberSwapBuffer.push(paddedBufferForPrimitive(trade.destinationToken));
  kyberSwapBuffer.push(paddedBufferForBigNumber(trade.sourceTokenQuantity));
  kyberSwapBuffer.push(paddedBufferForBigNumber(trade.minimumConversionRate));
  kyberSwapBuffer.push(paddedBufferForBigNumber(trade.maxDestinationQuantity));
  return Buffer.concat(kyberSwapBuffer);
}
