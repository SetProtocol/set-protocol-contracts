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
// {
//   description: "Base Case",
//   tokenState: {
//     numberOfComponents: 2,
//     takerAmounts: [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY],
//     makerAmounts: [ZERO, ZERO],
//     vault: [ZERO, ZERO],
//   },
//   exchangeOrders: {
//     takerWeightsToTransfer: [1, 1],
//     subjectQuantityToIssue: ether(4),
//   },
//   issuanceOrderParams: {
//     requiredComponentWeighting: [1, 1],
//     orderQuantity: ether(4),
//     makerTokenAmount: ether(10),
//   },
// },
// {
//   description: "Three Set Components Case",
//   tokenState: {
//     numberOfComponents: 3,
//     takerAmounts: [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY],
//     makerAmounts: [ZERO, ZERO, ZERO],
//     vault: [ZERO, ZERO, ZERO],
//   },
//   exchangeOrders: {
//     takerWeightsToTransfer: [1, 1, 1],
//     subjectQuantityToIssue: ether(4),
//   },
//   issuanceOrderParams: {
//     requiredComponentWeighting: [1, 1, 1],
//     orderQuantity: ether(4),
//     makerTokenAmount: ether(10),
//   },
// },
// {
//   description: "Maker Has One Component in Wallet",
//   tokenState: {
//     numberOfComponents: 3,
//     takerAmounts: [DEPLOYED_TOKEN_QUANTITY.div(2), DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY],
//     makerAmounts: [DEPLOYED_TOKEN_QUANTITY.div(2), ZERO, ZERO],
//     vault: [ZERO, ZERO, ZERO],
//   },
//   exchangeOrders: {
//     takerWeightsToTransfer: [0, 1, 1],
//     subjectQuantityToIssue: ether(4),
//   },
//   issuanceOrderParams: {
//     requiredComponentWeighting: [0, 1, 1],
//     orderQuantity: ether(4),
//     makerTokenAmount: ether(10),
//   },
// },
// {
//   description: "Maker Has Two Components in Wallet",
//   tokenState: {
//     numberOfComponents: 3,
//     takerAmounts: [DEPLOYED_TOKEN_QUANTITY.div(2), DEPLOYED_TOKEN_QUANTITY.div(2), DEPLOYED_TOKEN_QUANTITY],
//     makerAmounts: [DEPLOYED_TOKEN_QUANTITY.div(2), DEPLOYED_TOKEN_QUANTITY.div(2), ZERO],
//     vault: [ZERO, ZERO, ZERO],
//   },
//   exchangeOrders: {
//     takerWeightsToTransfer: [0, 0, 1],
//     subjectQuantityToIssue: ether(4),
//   },
//   issuanceOrderParams: {
//     requiredComponentWeighting: [0, 0, 1],
//     orderQuantity: ether(4),
//     makerTokenAmount: ether(10),
//   },
// },
// {
//   description: "Maker Has One Component in Wallet, One in Vault",
//   tokenState: {
//     numberOfComponents: 3,
//     takerAmounts: [DEPLOYED_TOKEN_QUANTITY.div(2), DEPLOYED_TOKEN_QUANTITY.div(2), DEPLOYED_TOKEN_QUANTITY],
//     makerAmounts: [DEPLOYED_TOKEN_QUANTITY.div(2), DEPLOYED_TOKEN_QUANTITY.div(2), ZERO],
//     vault: [ZERO, DEPLOYED_TOKEN_QUANTITY.div(2), ZERO], // Must havevault amount declared in makerAmounts as well to make xfer go through
//   },
//   exchangeOrders: {
//     takerWeightsToTransfer: [0, 0, 1],
//     subjectQuantityToIssue: ether(4),
//   },
//   issuanceOrderParams: {
//     requiredComponentWeighting: [0, 0, 1],
//     orderQuantity: ether(4),
//     makerTokenAmount: ether(10),
//   },
// },
// {
//   description: "Maker Has One Component in Wallet, One in Vault, Taker takes half",
//   tokenState: {
//     numberOfComponents: 3,
//     takerAmounts: [DEPLOYED_TOKEN_QUANTITY.div(2), DEPLOYED_TOKEN_QUANTITY.div(2), DEPLOYED_TOKEN_QUANTITY],
//     makerAmounts: [DEPLOYED_TOKEN_QUANTITY.div(2), DEPLOYED_TOKEN_QUANTITY.div(2), ZERO],
//     vault: [ZERO, DEPLOYED_TOKEN_QUANTITY.div(2), ZERO], // Must havevault amount declared in makerAmounts as well to make xfer go through
//   },
//   exchangeOrders: {
//     takerWeightsToTransfer: [0, 0, .5],
//     subjectQuantityToIssue: ether(2),
//   },
//   issuanceOrderParams: {
//     requiredComponentWeighting: [0, 0, 1],
//     orderQuantity: ether(4),
//     makerTokenAmount: ether(10),
//   },
// },
{
  description: "Base Case with rounding errors",
  tokenState: {
    numberOfComponents: 2,
    takerAmounts: [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY],
    makerAmounts: [ZERO, ZERO],
    vault: [ZERO, ZERO],
  },
  exchangeOrders: {
    takerWeightsToTransfer: [1, 1],
    subjectQuantityToIssue: ether(4),
  },
  issuanceOrderParams: {
    requiredComponentWeighting: [1, 1],
    orderQuantity: ether(6),
    makerTokenAmount: ether(10),
  },
},
]
