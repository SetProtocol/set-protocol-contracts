require('module-alias/register');

import { DEPLOYED_TOKEN_QUANTITY, ZERO } from '@utils/constants';
import { ether } from '@utils/units';


export const SCENARIOS = [
  {
    title: 'Base Case',
    description: 'Maker pays for all components in the Set and receives Set in return.\
     Taker receives maker tokens and gives up component units.',
    naturalUnit: ether(2),
    componentUnit: ether(4),
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
      orderQuantity: ether(4),
      makerTokenAmount: ether(10),
    },
  },
  {
    title: 'Three Set Components Case',
    description: 'Maker pays for all components in the Set and receives Set in return.\
     Taker receives maker tokens and gives up component units.',
    naturalUnit: ether(2),
    componentUnit: ether(4),
    tokenState: {
      numberOfComponents: 3,
      takerAmounts: [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY],
      makerAmounts: [ZERO, ZERO, ZERO],
      vault: [ZERO, ZERO, ZERO],
    },
    exchangeOrders: {
      takerWeightsToTransfer: [1, 1, 1],
      subjectQuantityToIssue: ether(4),
    },
    issuanceOrderParams: {
      requiredComponentWeighting: [1, 1, 1],
      orderQuantity: ether(4),
      makerTokenAmount: ether(10),
    },
  },
  {
    title: 'Maker Has One Component in Wallet',
    description: 'Maker pays for two components in the Set and uses one of their own tokens to mint Set.\
     Taker receives maker tokens and gives up two component units.',
    naturalUnit: ether(2),
    componentUnit: ether(4),
    tokenState: {
      numberOfComponents: 3,
      takerAmounts: [DEPLOYED_TOKEN_QUANTITY.div(2), DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY],
      makerAmounts: [DEPLOYED_TOKEN_QUANTITY.div(2), ZERO, ZERO],
      vault: [ZERO, ZERO, ZERO],
    },
    exchangeOrders: {
      takerWeightsToTransfer: [0, 1, 1],
      subjectQuantityToIssue: ether(4),
    },
    issuanceOrderParams: {
      requiredComponentWeighting: [0, 1, 1],
      orderQuantity: ether(4),
      makerTokenAmount: ether(10),
    },
  },
  {
    title: 'Maker Has Two Components in Wallet',
    description: 'Maker pays for one component in the Set and uses two of their own tokens to mint Set.\
     Taker receives maker tokens and gives up one component unit.',
    naturalUnit: ether(2),
    componentUnit: ether(4),
    tokenState: {
      numberOfComponents: 3,
      takerAmounts: [DEPLOYED_TOKEN_QUANTITY.div(2), DEPLOYED_TOKEN_QUANTITY.div(2), DEPLOYED_TOKEN_QUANTITY],
      makerAmounts: [DEPLOYED_TOKEN_QUANTITY.div(2), DEPLOYED_TOKEN_QUANTITY.div(2), ZERO],
      vault: [ZERO, ZERO, ZERO],
    },
    exchangeOrders: {
      takerWeightsToTransfer: [0, 0, 1],
      subjectQuantityToIssue: ether(4),
    },
    issuanceOrderParams: {
      requiredComponentWeighting: [0, 0, 1],
      orderQuantity: ether(4),
      makerTokenAmount: ether(10),
    },
  },
  {
    title: 'Maker Has One Component in Wallet, One in Vault',
    description: 'Maker pays for one component in the Set and uses two of their own tokens to mint Set\
     (one in wallet and one in Vault). Taker receives maker tokens and gives up one component unit.',
    naturalUnit: ether(2),
    componentUnit: ether(4),
    tokenState: {
      numberOfComponents: 3,
      takerAmounts: [DEPLOYED_TOKEN_QUANTITY.div(2), DEPLOYED_TOKEN_QUANTITY.div(2), DEPLOYED_TOKEN_QUANTITY],
      makerAmounts: [DEPLOYED_TOKEN_QUANTITY.div(2), DEPLOYED_TOKEN_QUANTITY.div(2), ZERO],
      // Must have Vault amount declared in makerAmounts as well to make transfer go through
      vault: [ZERO, DEPLOYED_TOKEN_QUANTITY.div(2), ZERO],
    },
    exchangeOrders: {
      takerWeightsToTransfer: [0, 0, 1],
      subjectQuantityToIssue: ether(4),
    },
    issuanceOrderParams: {
      requiredComponentWeighting: [0, 0, 1],
      orderQuantity: ether(4),
      makerTokenAmount: ether(10),
    },
  },
  {
    title: 'Maker Has One Component in Wallet, One in Vault, Taker takes half',
    description: 'Maker pays for one component in the Set and uses two of their own tokens to mint Set\
     (one in wallet and one in Vault). Taker receives maker tokens and gives up one component unit. Only\
     half of order is filled.',
    naturalUnit: ether(2),
    componentUnit: ether(4),
    tokenState: {
      numberOfComponents: 3,
      takerAmounts: [DEPLOYED_TOKEN_QUANTITY.div(2), DEPLOYED_TOKEN_QUANTITY.div(2), DEPLOYED_TOKEN_QUANTITY],
      makerAmounts: [DEPLOYED_TOKEN_QUANTITY.div(2), DEPLOYED_TOKEN_QUANTITY.div(2), ZERO],
      // Must have Vault amount declared in makerAmounts as well to make transfer go through
      vault: [ZERO, DEPLOYED_TOKEN_QUANTITY.div(2), ZERO],
    },
    exchangeOrders: {
      takerWeightsToTransfer: [0, 0, .5],
      subjectQuantityToIssue: ether(2),
    },
    issuanceOrderParams: {
      requiredComponentWeighting: [0, 0, 1],
      orderQuantity: ether(4),
      makerTokenAmount: ether(10),
    },
  },
  {
    title: 'Base Case with rounding errors',
    description: 'Maker pays for all components in the Set and receives Set in return.\
     Taker receives maker tokens and gives up component units. Due to rounding errors amounts\
     received are not exact.',
    naturalUnit: ether(2),
    componentUnit: ether(4),
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
];
