import {
  DEPLOYED_TOKEN_QUANTITY,
  ZERO,
  NULL_ADDRESS,
  EXCHANGES,
} from "../../../utils/constants";

import {
  ether,
} from "../../../utils/units";

export const SCENARIOS = [
{
  description: "Base Case",
  tokenState: {
    numberOfComponents: 2,
    takerAmounts: [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY],
    makerAmounts: [ZERO, ZERO],
    vault: [ZERO, ZERO],
  },
  exchangeOrders: {
    requiredComponentWeighting: [1, 1],
    orderQuantity: ether(4),
    makerTokenAmount: ether(10),
  },
  issuanceOrderParams: {
    takerWeightsToTransfer: [1, 1],
  },
},
{
  description: "Three Set Components Case",
  tokenState: {
    numberOfComponents: 3,
    takerAmounts: [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY],
    makerAmounts: [ZERO, ZERO, ZERO],
    vault: [ZERO, ZERO, ZERO],
  },
  exchangeOrders: {
    requiredComponentWeighting: [1, 1, 1],
    orderQuantity: ether(4),
    makerTokenAmount: ether(10),
  },
  issuanceOrderParams: {
    takerWeightsToTransfer: [1, 1, 1],
  },
},
]