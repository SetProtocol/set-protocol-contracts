import { BigNumber } from "bignumber.js";

export const SET_TOKEN_REAL_WORLD_SCENARIOS = [
  {
    description: "$1 Stable Set with TrueUSD and Dai",
    setName: "StableSet",
    setSymbol: "STBL",
    targetPriceinUSD: 1.00,
    components: [
      {
        name: "TrueUSD",
        symbol: "TUSD",
        decimals: 18,
        price: 1.00,
        supply: new BigNumber('12013114')
      },
      {
        name: "TrueUSD",
        symbol: "TUSD",
        decimals: 18,
        price: 1.00,
        supply: new BigNumber('29028274')
      },
    ],
    minimumExpectedIssueQuantityInWei: 1,
  },
];
