/**
 *
 * The keys are numerical network ids to avoid confusion between multiple contract
 * staging environments on the same Ethereum network (main-staging, main-production)
 *
 * 1 = main net
 * 3 = ropsten
 * 42 = kovan
 * 531 = Set's test-rpc (5 = S, 3 = E, 1 = T)
 *
 */

export default {
  WBTC: {
    1: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    42: '0x595f8DaB94b9c718cbf5c693cD539Fd00b286D3d',
  },
  WETH: {
    1: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    42: '0x4C5E0CAbAA6B376D565cF2be865a03F43E361770',
  },
  ZERO_EX_EXCHANGE: {
    42: '0x35dD2932454449b14Cee11A94d3674a936d5d7b2',
    50: '0x48BaCB9266a570d521063EF5dD96e61686DbE788',
  },
  ZERO_EX_PROXY: {
    42: '0xF1eC01d6236D3CD881a0bF0130eA25fe4234003E',
    50: '0x1dC4c1cEFEF38a777b15aA20260a54E584b16C48',
  },
  ZERO_EX_ZRX: {
    42: '0x2002D3812F58e35F0EA1fFbf80A75a38c32175fA',
    50: '0x871DD7C2B4b25E1Aa18728e9D5f2Af4C4e431f5c',
  },
  KYBER_PROXY: {
    42: '0x7e6b8b9510d71bf8ef0f893902ebb9c865eef4df',
    3: '0x818e6fecd516ecc3849daf6845e3ec868087b755',
    50: '0x371b13d97f4bF77d724E78c16B7dC74099f40e84',
  },
  WBTC_MEDIANIZER: {
    1: '',
    42: '0x02186378d8e723e11643b4cd520E31655be3B0E9',
    50: '0x2002d3812F58E35F0ea1fFbF80A75a38C32173Fa',
  },
  WETH_MEDIANIZER: {
    1: '',
    42: '0x9Fe0D478D0E290d50EF8DFc08760C4ad9D2C7AE9',
    50: '0x2002d3812f58E35f0EA1Ffbf80a75A38c32174fA',
  },
<<<<<<< HEAD
}
=======
  INFURA_SUBDOMAIN: {
    1: 'https://mainnet.infura.io',
    42: 'https://kovan.infura.io',
  },
};
>>>>>>> Fix linting issues

