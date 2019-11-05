export const InterestRateModelABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "borrowRate_",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor",
        "signature": "constructor"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "borrowRate",
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
        "signature": "0xc914b437"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "failBorrowRate",
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
        "signature": "0xc4fd6b2d"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_cash",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_borrows",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_reserves",
                "type": "uint256"
            }
        ],
        "name": "getBorrowRate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x15f24053"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "isInterestRateModel",
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
        "signature": "0x2191f92a"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "opaqueBorrowFailureCode",
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
        "signature": "0x7ddeded1"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "borrowRate_",
                "type": "uint256"
            }
        ],
        "name": "setBorrowRate",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xdd3eaf04"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "bool",
                "name": "failBorrowRate_",
                "type": "bool"
            }
        ],
        "name": "setFailBorrowRate",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x1f64eb4e"
    }
]