export const ExpectedRateABI = [
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
      "constant": true,
      "inputs": [],
      "name": "worstCaseRateFactorInBps",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x9bc72d5f"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "quantityFactor",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xa7de9c63"
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
      "constant": true,
      "inputs": [],
      "name": "kyberNetwork",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xb78b842d"
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
      "name": "knc",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xe61387e0"
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
          "name": "_kyberNetwork",
          "type": "address"
        },
        {
          "name": "_knc",
          "type": "address"
        },
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
          "indexed": false,
          "name": "newFactor",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "oldFactor",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "QuantityFactorSet",
      "type": "event",
      "signature": "0xd0f6fc40d497232b5aab1b7a34ea00ea45886e52d2fed39ad62af798a870fae3"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "newMin",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "oldMin",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "MinSlippageFactorSet",
      "type": "event",
      "signature": "0x4357e20f1241d972328c5b3239d9ef4ac96f0f4fce8e10fd3bf9053690dad0ac"
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
          "name": "newFactor",
          "type": "uint256"
        }
      ],
      "name": "setQuantityFactor",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x7658c574"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "bps",
          "type": "uint256"
        }
      ],
      "name": "setWorstCaseRateFactor",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xdcb46e38"
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
        },
        {
          "name": "usePermissionless",
          "type": "bool"
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
      "signature": "0xd38d2bea"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "currentKncToEthRate",
          "type": "uint256"
        }
      ],
      "name": "checkKncArbitrageRate",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xe853cda3"
    }
  ];