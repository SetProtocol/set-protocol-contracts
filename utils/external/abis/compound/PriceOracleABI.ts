export const PriceOracleABI = [
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "asset",
                "type": "address"
            }
        ],
        "name": "assetPrices",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x5e9a523c"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "contract CToken",
                "name": "cToken",
                "type": "address"
            }
        ],
        "name": "getUnderlyingPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xfc57d4df"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "isPriceOracle",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x66331bba"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "a",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "setDirectPrice",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x09a8acb0"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "contract CToken",
                "name": "cToken",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "underlyingPriceMantissa",
                "type": "uint256"
            }
        ],
        "name": "setUnderlyingPrice",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x127ffda0"
    }
]