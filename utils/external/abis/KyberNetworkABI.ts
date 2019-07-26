export const KyberNetworkABI = [
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
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "trader",
        "type": "address"
      },
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
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getReserves",
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
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
        "name": "srcAmount",
        "type": "uint256"
      },
      {
        "name": "usePermissionless",
        "type": "bool"
      }
    ],
    "name": "searchBestRate",
    "outputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "infoFields",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "feeBurner",
        "type": "address"
      }
    ],
    "name": "setFeeBurner",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
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
        "name": "srcAmount",
        "type": "uint256"
      }
    ],
    "name": "findBestRateOnlyPermission",
    "outputs": [
      {
        "name": "obsolete",
        "type": "uint256"
      },
      {
        "name": "rate",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
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
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "reserve",
        "type": "address"
      },
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "removeReserve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
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
    "type": "function"
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
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "reservesPerTokenSrc",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "whiteList",
        "type": "address"
      }
    ],
    "name": "setWhiteList",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
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
    "type": "function"
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
    "type": "function"
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
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "negligibleRateDiff",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "feeBurnerContract",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "expectedRate",
        "type": "address"
      }
    ],
    "name": "setExpectedRate",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "expectedRateContract",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "whiteListContract",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "field",
        "type": "bytes32"
      },
      {
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "setInfo",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
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
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "isEnabled",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "reserveType",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
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
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_enable",
        "type": "bool"
      }
    ],
    "name": "setEnable",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "claimAdmin",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "kyberNetworkProxyContract",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
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
    "type": "function"
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
    "type": "function"
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
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "reserves",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
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
    "name": "getExpectedRateOnlyPermission",
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
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "PERM_HINT",
    "outputs": [
      {
        "name": "",
        "type": "bytes"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
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
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "reservesPerTokenDest",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
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
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "reserve",
        "type": "address"
      },
      {
        "name": "isPermissionless",
        "type": "bool"
      }
    ],
    "name": "addReserve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
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
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "maxGasPriceValue",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
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
    "type": "function"
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
        "name": "srcAmount",
        "type": "uint256"
      }
    ],
    "name": "findBestRate",
    "outputs": [
      {
        "name": "obsolete",
        "type": "uint256"
      },
      {
        "name": "rate",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_maxGasPrice",
        "type": "uint256"
      },
      {
        "name": "_negligibleRateDiff",
        "type": "uint256"
      }
    ],
    "name": "setParams",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "PERM_HINT_GET_RATE",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "networkProxy",
        "type": "address"
      }
    ],
    "name": "setKyberProxy",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
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
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getNumReserves",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
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
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "reserve",
        "type": "address"
      },
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "ethToToken",
        "type": "bool"
      },
      {
        "name": "tokenToEth",
        "type": "bool"
      },
      {
        "name": "add",
        "type": "bool"
      }
    ],
    "name": "listPairForReserve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
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
    "type": "function"
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
    "type": "constructor"
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
        "indexed": true,
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "EtherReceival",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "add",
        "type": "bool"
      },
      {
        "indexed": false,
        "name": "isPermissionless",
        "type": "bool"
      }
    ],
    "name": "AddReserveToNetwork",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "reserve",
        "type": "address"
      }
    ],
    "name": "RemoveReserveFromNetwork",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "reserve",
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
        "name": "add",
        "type": "bool"
      }
    ],
    "name": "ListReservePairs",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "newContract",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "currentContract",
        "type": "address"
      }
    ],
    "name": "WhiteListContractSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "newContract",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "currentContract",
        "type": "address"
      }
    ],
    "name": "ExpectedRateContractSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "newContract",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "currentContract",
        "type": "address"
      }
    ],
    "name": "FeeBurnerContractSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "maxGasPrice",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "negligibleRateDiff",
        "type": "uint256"
      }
    ],
    "name": "KyberNetwrokParamsSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "isEnabled",
        "type": "bool"
      }
    ],
    "name": "KyberNetworkSetEnable",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "proxy",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "KyberProxySet",
    "type": "event"
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
        "name": "srcAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "dstAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "destAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "ethWeiValue",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "reserve1",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "reserve2",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "hint",
        "type": "bytes"
      }
    ],
    "name": "KyberTrade",
    "type": "event"
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
    "type": "event"
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
    "type": "event"
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
    "type": "event"
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
    "type": "event"
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
    "type": "event"
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
    "type": "event"
  }
]