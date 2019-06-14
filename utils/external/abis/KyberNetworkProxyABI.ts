export const KyberNetworkProxyABI = [
{
  "constant": false,
  "inputs": [
    {
      "name": "alerter",
      "type": "address"
    }
  ],
  "name": "removeAlerter",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0x01a12fd3"
},
{
  "constant": true,
  "inputs": [],
  "name": "pendingAdmin",
  "outputs": [
    {
      "name": "",
      "type": "address"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x26782247"
},
{
  "constant": true,
  "inputs": [],
  "name": "getOperators",
  "outputs": [
    {
      "name": "",
      "type": "address[]"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x27a099d8"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "token",
      "type": "address"
    },
    {
      "name": "amount",
      "type": "uint256"
    },
    {
      "name": "sendTo",
      "type": "address"
    }
  ],
  "name": "withdrawToken",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0x3ccdbb28"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "newAlerter",
      "type": "address"
    }
  ],
  "name": "addAlerter",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0x408ee7fe"
},
{
  "constant": true,
  "inputs": [],
  "name": "kyberNetworkContract",
  "outputs": [
    {
      "name": "",
      "type": "address"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x4f61ff8b"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "newAdmin",
      "type": "address"
    }
  ],
  "name": "transferAdmin",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0x75829def"
},
{
  "constant": false,
  "inputs": [],
  "name": "claimAdmin",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0x77f50f97"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "newAdmin",
      "type": "address"
    }
  ],
  "name": "transferAdminQuickly",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0x7acc8678"
},
{
  "constant": true,
  "inputs": [],
  "name": "getAlerters",
  "outputs": [
    {
      "name": "",
      "type": "address[]"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x7c423f54"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "newOperator",
      "type": "address"
    }
  ],
  "name": "addOperator",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0x9870d7fe"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "operator",
      "type": "address"
    }
  ],
  "name": "removeOperator",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0xac8a584a"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "amount",
      "type": "uint256"
    },
    {
      "name": "sendTo",
      "type": "address"
    }
  ],
  "name": "withdrawEther",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0xce56c454"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "token",
      "type": "address"
    },
    {
      "name": "user",
      "type": "address"
    }
  ],
  "name": "getBalance",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0xd4fac45d"
},
{
  "constant": true,
  "inputs": [],
  "name": "admin",
  "outputs": [
    {
      "name": "",
      "type": "address"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0xf851a440"
},
{
  "inputs": [
    {
      "name": "_admin",
      "type": "address"
    }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "constructor",
  "signature": "constructor"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "name": "trader",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "src",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "dest",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "actualSrcAmount",
      "type": "uint256"
    },
    {
      "indexed": false,
      "name": "actualDestAmount",
      "type": "uint256"
    }
  ],
  "name": "ExecuteTrade",
  "type": "event",
  "signature": "0x1849bd6a030a1bca28b83437fd3de96f3d27a5d172fa7e9c78e7b61468928a39"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "name": "newNetworkContract",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "oldNetworkContract",
      "type": "address"
    }
  ],
  "name": "KyberNetworkSet",
  "type": "event",
  "signature": "0x8936e1f096bf0a8c9df862b3d1d5b82774cad78116200175f00b5b7ba3010b02"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "name": "token",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "amount",
      "type": "uint256"
    },
    {
      "indexed": false,
      "name": "sendTo",
      "type": "address"
    }
  ],
  "name": "TokenWithdraw",
  "type": "event",
  "signature": "0x72cb8a894ddb372ceec3d2a7648d86f17d5a15caae0e986c53109b8a9a9385e6"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "name": "amount",
      "type": "uint256"
    },
    {
      "indexed": false,
      "name": "sendTo",
      "type": "address"
    }
  ],
  "name": "EtherWithdraw",
  "type": "event",
  "signature": "0xec47e7ed86c86774d1a72c19f35c639911393fe7c1a34031fdbd260890da90de"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "name": "pendingAdmin",
      "type": "address"
    }
  ],
  "name": "TransferAdminPending",
  "type": "event",
  "signature": "0x3b81caf78fa51ecbc8acb482fd7012a277b428d9b80f9d156e8a54107496cc40"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "name": "newAdmin",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "previousAdmin",
      "type": "address"
    }
  ],
  "name": "AdminClaimed",
  "type": "event",
  "signature": "0x65da1cfc2c2e81576ad96afb24a581f8e109b7a403b35cbd3243a1c99efdb9ed"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "name": "newAlerter",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "isAdd",
      "type": "bool"
    }
  ],
  "name": "AlerterAdded",
  "type": "event",
  "signature": "0x5611bf3e417d124f97bf2c788843ea8bb502b66079fbee02158ef30b172cb762"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "name": "newOperator",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "isAdd",
      "type": "bool"
    }
  ],
  "name": "OperatorAdded",
  "type": "event",
  "signature": "0x091a7a4b85135fdd7e8dbc18b12fabe5cc191ea867aa3c2e1a24a102af61d58b"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "src",
      "type": "address"
    },
    {
      "name": "srcAmount",
      "type": "uint256"
    },
    {
      "name": "dest",
      "type": "address"
    },
    {
      "name": "destAddress",
      "type": "address"
    },
    {
      "name": "maxDestAmount",
      "type": "uint256"
    },
    {
      "name": "minConversionRate",
      "type": "uint256"
    },
    {
      "name": "walletId",
      "type": "address"
    }
  ],
  "name": "trade",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": true,
  "stateMutability": "payable",
  "type": "function",
  "signature": "0xcb3c28c7"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "src",
      "type": "address"
    },
    {
      "name": "srcAmount",
      "type": "uint256"
    },
    {
      "name": "dest",
      "type": "address"
    },
    {
      "name": "minConversionRate",
      "type": "uint256"
    }
  ],
  "name": "swapTokenToToken",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0x7409e2eb"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "token",
      "type": "address"
    },
    {
      "name": "minConversionRate",
      "type": "uint256"
    }
  ],
  "name": "swapEtherToToken",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": true,
  "stateMutability": "payable",
  "type": "function",
  "signature": "0x7a2a0456"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "token",
      "type": "address"
    },
    {
      "name": "srcAmount",
      "type": "uint256"
    },
    {
      "name": "minConversionRate",
      "type": "uint256"
    }
  ],
  "name": "swapTokenToEther",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0x3bba21dc"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "src",
      "type": "address"
    },
    {
      "name": "srcAmount",
      "type": "uint256"
    },
    {
      "name": "dest",
      "type": "address"
    },
    {
      "name": "destAddress",
      "type": "address"
    },
    {
      "name": "maxDestAmount",
      "type": "uint256"
    },
    {
      "name": "minConversionRate",
      "type": "uint256"
    },
    {
      "name": "walletId",
      "type": "address"
    },
    {
      "name": "hint",
      "type": "bytes"
    }
  ],
  "name": "tradeWithHint",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": true,
  "stateMutability": "payable",
  "type": "function",
  "signature": "0x29589f61"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "_kyberNetworkContract",
      "type": "address"
    }
  ],
  "name": "setKyberNetworkContract",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0xabd188a8"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "src",
      "type": "address"
    },
    {
      "name": "dest",
      "type": "address"
    },
    {
      "name": "srcQty",
      "type": "uint256"
    }
  ],
  "name": "getExpectedRate",
  "outputs": [
    {
      "name": "expectedRate",
      "type": "uint256"
    },
    {
      "name": "slippageRate",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x809a9e55"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "user",
      "type": "address"
    }
  ],
  "name": "getUserCapInWei",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x6432679f"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "user",
      "type": "address"
    },
    {
      "name": "token",
      "type": "address"
    }
  ],
  "name": "getUserCapInTokenWei",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x8eaaeecf"
},
{
  "constant": true,
  "inputs": [],
  "name": "maxGasPrice",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x3de39c11"
},
{
  "constant": true,
  "inputs": [],
  "name": "enabled",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x238dafe0"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "field",
      "type": "bytes32"
    }
  ],
  "name": "info",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0xb64a097e"
}
];