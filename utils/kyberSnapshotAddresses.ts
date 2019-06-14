/*

Kyber System Configuration

Permissions
==================



(admin) 0x5409ED021D9299bf6814279A6A1411A7e866A631
(operator) 0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb
(alerter) 0xE36Ea790bc9d7AB70C55260C66D52b1eca985f84


Wallets
==================
(user) 0x78dc5D2D739606d31509C31d654056A45185ECb6
(reserve) 0xA8dDa8d7F5310E4A9E24F8eBA77E091Ac264f872
(tax) 0x06cEf8E666768cC40Cc78CF93d9611019dDcB628
(bob) 0x4404ac8bd8F9618D27Ad2f1485AA1B2cFD82482D
(alice) 0x7457d5E02197480Db681D3fdF256c7acA21bDc12


Tokens
==================
(KNC) 0xDc688D29394a3f1E6f1E5100862776691afAf3d2
(OMG) 0x6000EcA38b8B5Bba64986182Fe2a69c57f6b5414
(SALT) 0x32EeCaF51DFEA9618e9Bc94e9fBFDdB1bBdcbA15
(ZIL) 0x7e3f4E1deB8D3A05d9d2DA87d9521268D0Ec3239
(MANA) 0x04B5dAdd2c0D6a261bfafBc964E0cAc48585dEF3
(POLY) 0x8726C7414ac023D23348326B47AF3205185Fd035
(SNT) 0x4112f5fc3f737e813ca8cC1A48D1da3dc8719435
*/

export const KYBER_PERMISSIONED_ACCOUNTS = {
	admin: '0x5409ED021D9299bf6814279A6A1411A7e866A631',
	operator: '0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb',
};

export const KYBER_CONTRACTS = {
	KyberNetwork: '0xAA86dDA78E9434acA114b6676Fc742A18d15a1CC',
	KyberNetworkProxy: '0x4D3d5c850Dd5bD9D6F4AdDA3DD039a3C8054CA29',
	ConversionRates: '0xA31E64EA55B9B6Bbb9d6A676738e9A5b23149f84',
	LiquidityConversionRates: '0x8D42e38980cE74736C21c059B2240DF09958d3C8',
	SanityRates: '0x8Ea76477CfACa8F7Ea06477fD3c09a740ac6012a',
	KyberReserve: '0x038F9B392Fb9A9676DbAddF78EA5fdbf6C7d9710',
	KyberAutomatedReserve: '0x371b13d97f4bF77d724E78c16B7dC74099f40e84',
	KyberOrderbookeserve: '0x1941ff73d1154774d87521d2D0AaAD5d19C8Df60',
	PermissionlessOrderbookReserveLister: '0x0D8b0Dd11f5D34Ed41D556Def5f841900d5B1c6B',
	FeeBurner: '0x74341e87b1c4dB7D5ED95F92b37509F2525A7A90',
	WhiteList: '0x38ef19fDf8E8415f18c307Ed71967e19Aac28Ba1',
	ExpectedRate: '0xC4Df27466183c0Fe2A5924D6Ea56e334Deff146A',
	SwapEtherToToken: '0xF23276778860e420aCFc18ebeEBF7E829b06965c',
	SwapTokenToEther: '0x8A063452f7dF2614Db1bCa3A85eF35DA40cF0835',
	SwapTokenToToken: '0x59adefa01843C627BA5d6Aa350292b4B7cCAE67a',
	Trade: '0xF96b018E8dE3A229DbaCed8439DF9e3034e263c1',
};