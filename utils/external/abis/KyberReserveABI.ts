export const KyberReserveABI = [
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
      "name": "sanityRatesContract",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x47e6924f"
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
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "tokenWallet",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xa80cbac6"
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
      "inputs": [],
      "name": "conversionRatesContract",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xd5847d33"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "tradeEnabled",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xd621e813"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "approvedWithdrawAddresses",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xd7b7024d"
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
          "name": "_ratesContract",
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
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
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
        }
      ],
      "name": "DepositToken",
      "type": "event",
      "signature": "0x2d0c0a8842b9944ece1495eb61121621b5e36bd6af3bba0318c695f525aef79f"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "origin",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "src",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "srcAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "destToken",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "destAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "destAddress",
          "type": "address"
        }
      ],
      "name": "TradeExecute",
      "type": "event",
      "signature": "0xea9415385bae08fe9f6dc457b02577166790cde83bb18cc340aac6cb81b824de"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "enable",
          "type": "bool"
        }
      ],
      "name": "TradeEnabled",
      "type": "event",
      "signature": "0x7d7f00509dd73ac4449f698ae75ccc797895eff5fa9d446d3df387598a26e735"
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
          "name": "addr",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "approve",
          "type": "bool"
        }
      ],
      "name": "WithdrawAddressApproved",
      "type": "event",
      "signature": "0xd5fd5351efae1f4bb760079da9f0ff9589e2c3e216337ca9d39cdff573b245c4"
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
          "name": "wallet",
          "type": "address"
        }
      ],
      "name": "NewTokenWallet",
      "type": "event",
      "signature": "0x81995c7b922889ac0a81e41866106d4046268ea3a9abaae9f9e080a6ce36ee7d"
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
          "name": "destination",
          "type": "address"
        }
      ],
      "name": "WithdrawFunds",
      "type": "event",
      "signature": "0xb67719fc33c1f17d31bf3a698690d62066b1e0bae28fcd3c56cf2c015c2863d6"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "network",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "rate",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "sanity",
          "type": "address"
        }
      ],
      "name": "SetContractAddresses",
      "type": "event",
      "signature": "0x7a85322644a4462d8ff5482d2a841a4d231f8cfb3c9f4a50f66f8b2bd568c31c"
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
          "name": "srcToken",
          "type": "address"
        },
        {
          "name": "srcAmount",
          "type": "uint256"
        },
        {
          "name": "destToken",
          "type": "address"
        },
        {
          "name": "destAddress",
          "type": "address"
        },
        {
          "name": "conversionRate",
          "type": "uint256"
        },
        {
          "name": "validate",
          "type": "bool"
        }
      ],
      "name": "trade",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": true,
      "stateMutability": "payable",
      "type": "function",
      "signature": "0x6cf69811"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "enableTrade",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x0099d386"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "disableTrade",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x6940030f"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "token",
          "type": "address"
        },
        {
          "name": "addr",
          "type": "address"
        },
        {
          "name": "approve",
          "type": "bool"
        }
      ],
      "name": "approveWithdrawAddress",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x546dc71c"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "token",
          "type": "address"
        },
        {
          "name": "wallet",
          "type": "address"
        }
      ],
      "name": "setTokenWallet",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x1bc7bfec"
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
          "name": "destination",
          "type": "address"
        }
      ],
      "name": "withdraw",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x69328dec"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_kyberNetwork",
          "type": "address"
        },
        {
          "name": "_conversionRates",
          "type": "address"
        },
        {
          "name": "_sanityRates",
          "type": "address"
        }
      ],
      "name": "setContracts",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xb3066d49"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "token",
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
      "signature": "0xf8b2cb4f"
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
          "name": "rate",
          "type": "uint256"
        }
      ],
      "name": "getDestQty",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xfa64dffa"
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
          "name": "dstQty",
          "type": "uint256"
        },
        {
          "name": "rate",
          "type": "uint256"
        }
      ],
      "name": "getSrcQty",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xa7fca953"
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
          "name": "blockNumber",
          "type": "uint256"
        }
      ],
      "name": "getConversionRate",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x7cd44272"
    }
];