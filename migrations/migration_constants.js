const DUMMY_TOKEN_SUPPLY = 10 ** 27;

const STABLE_SET = {
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
    5 * 10 ** 17,
    5 * 10 ** 17,
  ],
  naturalUnit: 10 ** 9,
};

module.exports = {
  STABLE_SET,
};
