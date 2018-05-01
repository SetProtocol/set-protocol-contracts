const DUMMY_TOKEN_SUPPLY = 10 ** 27;

const SETS = [
  {
    setName: "StableSet",
    setSymbol: "STBL",
    targetPriceinUSD: 1.00,
    components: [
      {
        name: "TrueUSD",
        symbol: "TUSD",
        decimals: 18,
        price: 1.00,
        supply: 12013114 * 10 ** 18
      },
      {
        name: "Dai",
        symbol: "Dai",
        decimals: 18,
        price: 1.00,
        supply: 29028274 * 10 ** 18
      },
    ],
    units: [
      5,
      5,
    ],
    naturalUnit: 10,
  },
  {
    setName: "Decentralized Exchange",
    setSymbol: "DEX",
    targetPriceinUSD: 100.00,
    components: [
      {
        name: "0x Protocol",
        symbol: "ZRX",
        decimals: 18,
        price: 1.16,
        supply: 1000000000 * 10 ** 18
      },
      {
        name: "Kyber Network",
        symbol: "KNC",
        decimals: 18,
        price: 2.58,
        supply: 215617232938864872334407431,
      },
      {
        name: "Airswap",
        symbol: "AST",
        decimals: 4,
        price: 0.54,
        supply: 500000000 * 10 ** 4
      },
    ],
    units: [
      505823196193389,
      129066795398825,
      1,
    ],
    naturalUnit: 10 ** 13,
  },
  // {
  //   setName: "ExthereumX",
  //   setSymbol: "E5",
  //   targetPriceinUSD: 100.00,
  //   components: [
  //     {
  //       name: "0x Protocol",
  //       symbol: "ZRX",
  //       decimals: 18,
  //       price: 1.16,
  //       supply: 1000000000 * 10 ** 18
  //     },
  //     {
  //       name: "Kyber Network",
  //       symbol: "KNC",
  //       decimals: 18,
  //       price: 2.58,
  //       supply: 215617232938864872334407431,
  //     },
  //     {
  //       name: "Airswap",
  //       symbol: "AST",
  //       decimals: 4,
  //       price: 0.54,
  //       supply: 500000000 * 10 ** 4
  //     },
  //   ],
  //   units: [
  //     505823196193389,
  //     129066795398825,
  //     1,
  //   ],
  //   naturalUnit: 10 ** 13,
  // },
];

module.exports = {
  SETS,
};
