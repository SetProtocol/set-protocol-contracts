export const IWrapperFunctions = 
{
  "contractName": "IWrapperFunctions",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "order",
          "type": "tuple"
        },
        {
          "name": "takerAssetFillAmount",
          "type": "uint256"
        },
        {
          "name": "signature",
          "type": "bytes"
        }
      ],
      "name": "fillOrKillOrder",
      "outputs": [
        {
          "components": [
            {
              "name": "makerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "makerFeePaid",
              "type": "uint256"
            },
            {
              "name": "takerFeePaid",
              "type": "uint256"
            }
          ],
          "name": "fillResults",
          "type": "tuple"
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
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "order",
          "type": "tuple"
        },
        {
          "name": "takerAssetFillAmount",
          "type": "uint256"
        },
        {
          "name": "signature",
          "type": "bytes"
        }
      ],
      "name": "fillOrderNoThrow",
      "outputs": [
        {
          "components": [
            {
              "name": "makerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "makerFeePaid",
              "type": "uint256"
            },
            {
              "name": "takerFeePaid",
              "type": "uint256"
            }
          ],
          "name": "fillResults",
          "type": "tuple"
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
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "orders",
          "type": "tuple[]"
        },
        {
          "name": "takerAssetFillAmounts",
          "type": "uint256[]"
        },
        {
          "name": "signatures",
          "type": "bytes[]"
        }
      ],
      "name": "batchFillOrders",
      "outputs": [
        {
          "components": [
            {
              "name": "makerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "makerFeePaid",
              "type": "uint256"
            },
            {
              "name": "takerFeePaid",
              "type": "uint256"
            }
          ],
          "name": "totalFillResults",
          "type": "tuple"
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
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "orders",
          "type": "tuple[]"
        },
        {
          "name": "takerAssetFillAmounts",
          "type": "uint256[]"
        },
        {
          "name": "signatures",
          "type": "bytes[]"
        }
      ],
      "name": "batchFillOrKillOrders",
      "outputs": [
        {
          "components": [
            {
              "name": "makerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "makerFeePaid",
              "type": "uint256"
            },
            {
              "name": "takerFeePaid",
              "type": "uint256"
            }
          ],
          "name": "totalFillResults",
          "type": "tuple"
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
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "orders",
          "type": "tuple[]"
        },
        {
          "name": "takerAssetFillAmounts",
          "type": "uint256[]"
        },
        {
          "name": "signatures",
          "type": "bytes[]"
        }
      ],
      "name": "batchFillOrdersNoThrow",
      "outputs": [
        {
          "components": [
            {
              "name": "makerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "makerFeePaid",
              "type": "uint256"
            },
            {
              "name": "takerFeePaid",
              "type": "uint256"
            }
          ],
          "name": "totalFillResults",
          "type": "tuple"
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
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "orders",
          "type": "tuple[]"
        },
        {
          "name": "takerAssetFillAmount",
          "type": "uint256"
        },
        {
          "name": "signatures",
          "type": "bytes[]"
        }
      ],
      "name": "marketSellOrders",
      "outputs": [
        {
          "components": [
            {
              "name": "makerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "makerFeePaid",
              "type": "uint256"
            },
            {
              "name": "takerFeePaid",
              "type": "uint256"
            }
          ],
          "name": "totalFillResults",
          "type": "tuple"
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
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "orders",
          "type": "tuple[]"
        },
        {
          "name": "takerAssetFillAmount",
          "type": "uint256"
        },
        {
          "name": "signatures",
          "type": "bytes[]"
        }
      ],
      "name": "marketSellOrdersNoThrow",
      "outputs": [
        {
          "components": [
            {
              "name": "makerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "makerFeePaid",
              "type": "uint256"
            },
            {
              "name": "takerFeePaid",
              "type": "uint256"
            }
          ],
          "name": "totalFillResults",
          "type": "tuple"
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
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "orders",
          "type": "tuple[]"
        },
        {
          "name": "makerAssetFillAmount",
          "type": "uint256"
        },
        {
          "name": "signatures",
          "type": "bytes[]"
        }
      ],
      "name": "marketBuyOrders",
      "outputs": [
        {
          "components": [
            {
              "name": "makerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "makerFeePaid",
              "type": "uint256"
            },
            {
              "name": "takerFeePaid",
              "type": "uint256"
            }
          ],
          "name": "totalFillResults",
          "type": "tuple"
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
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "orders",
          "type": "tuple[]"
        },
        {
          "name": "makerAssetFillAmount",
          "type": "uint256"
        },
        {
          "name": "signatures",
          "type": "bytes[]"
        }
      ],
      "name": "marketBuyOrdersNoThrow",
      "outputs": [
        {
          "components": [
            {
              "name": "makerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "makerFeePaid",
              "type": "uint256"
            },
            {
              "name": "takerFeePaid",
              "type": "uint256"
            }
          ],
          "name": "totalFillResults",
          "type": "tuple"
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
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "orders",
          "type": "tuple[]"
        }
      ],
      "name": "batchCancelOrders",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "/*\n\n  Copyright 2018 ZeroEx Intl.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity ^0.4.24;\npragma experimental ABIEncoderV2;\n\nimport \"../libs/LibOrder.sol\";\nimport \"../libs/LibFillResults.sol\";\n\ncontract IWrapperFunctions {\n    /// @dev Fills the input order. Reverts if exact takerAssetFillAmount not filled.\n    /// @param order LibOrder.Order struct containing order specifications.\n    /// @param takerAssetFillAmount Desired amount of takerAsset to sell.\n    /// @param signature Proof that order has been created by maker.\n    function fillOrKillOrder(\n        LibOrder.Order memory order,\n        uint256 takerAssetFillAmount,\n        bytes memory signature\n    )\n        public\n        returns (LibFillResults.FillResults memory fillResults);\n\n    /// @dev Fills an order with specified parameters and ECDSA signature.\n    ///      Returns false if the transaction would otherwise revert.\n    /// @param order LibOrder.Order struct containing order specifications.\n    /// @param takerAssetFillAmount Desired amount of takerAsset to sell.\n    /// @param signature Proof that order has been created by maker.\n    /// @return Amounts filled and fees paid by maker and taker.\n    function fillOrderNoThrow(\n        LibOrder.Order memory order,\n        uint256 takerAssetFillAmount,\n        bytes memory signature\n    )\n        public\n        returns (LibFillResults.FillResults memory fillResults);\n\n    /// @dev Synchronously executes multiple calls of fillOrder.\n    /// @param orders Array of order specifications.\n    /// @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n    /// @param signatures Proofs that orders have been created by makers.\n    /// @return Amounts filled and fees paid by makers and taker.\n    function batchFillOrders(\n        LibOrder.Order[] memory orders,\n        uint256[] memory takerAssetFillAmounts,\n        bytes[] memory signatures\n    )\n        public\n        returns (LibFillResults.FillResults memory totalFillResults);\n\n    /// @dev Synchronously executes multiple calls of fillOrKill.\n    /// @param orders Array of order specifications.\n    /// @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n    /// @param signatures Proofs that orders have been created by makers.\n    /// @return Amounts filled and fees paid by makers and taker.\n    function batchFillOrKillOrders(\n        LibOrder.Order[] memory orders,\n        uint256[] memory takerAssetFillAmounts,\n        bytes[] memory signatures\n    )\n        public\n        returns (LibFillResults.FillResults memory totalFillResults);\n\n    /// @dev Fills an order with specified parameters and ECDSA signature.\n    ///      Returns false if the transaction would otherwise revert.\n    /// @param orders Array of order specifications.\n    /// @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n    /// @param signatures Proofs that orders have been created by makers.\n    /// @return Amounts filled and fees paid by makers and taker.\n    function batchFillOrdersNoThrow(\n        LibOrder.Order[] memory orders,\n        uint256[] memory takerAssetFillAmounts,\n        bytes[] memory signatures\n    )\n        public\n        returns (LibFillResults.FillResults memory totalFillResults);\n\n    /// @dev Synchronously executes multiple calls of fillOrder until total amount of takerAsset is sold by taker.\n    /// @param orders Array of order specifications.\n    /// @param takerAssetFillAmount Desired amount of takerAsset to sell.\n    /// @param signatures Proofs that orders have been created by makers.\n    /// @return Amounts filled and fees paid by makers and taker.\n    function marketSellOrders(\n        LibOrder.Order[] memory orders,\n        uint256 takerAssetFillAmount,\n        bytes[] memory signatures\n    )\n        public\n        returns (LibFillResults.FillResults memory totalFillResults);\n\n    /// @dev Synchronously executes multiple calls of fillOrder until total amount of takerAsset is sold by taker.\n    ///      Returns false if the transaction would otherwise revert.\n    /// @param orders Array of order specifications.\n    /// @param takerAssetFillAmount Desired amount of takerAsset to sell.\n    /// @param signatures Proofs that orders have been signed by makers.\n    /// @return Amounts filled and fees paid by makers and taker.\n    function marketSellOrdersNoThrow(\n        LibOrder.Order[] memory orders,\n        uint256 takerAssetFillAmount,\n        bytes[] memory signatures\n    )\n        public\n        returns (LibFillResults.FillResults memory totalFillResults);\n\n    /// @dev Synchronously executes multiple calls of fillOrder until total amount of makerAsset is bought by taker.\n    /// @param orders Array of order specifications.\n    /// @param makerAssetFillAmount Desired amount of makerAsset to buy.\n    /// @param signatures Proofs that orders have been signed by makers.\n    /// @return Amounts filled and fees paid by makers and taker.\n    function marketBuyOrders(\n        LibOrder.Order[] memory orders,\n        uint256 makerAssetFillAmount,\n        bytes[] memory signatures\n    )\n        public\n        returns (LibFillResults.FillResults memory totalFillResults);\n\n    /// @dev Synchronously executes multiple fill orders in a single transaction until total amount is bought by taker.\n    ///      Returns false if the transaction would otherwise revert.\n    /// @param orders Array of order specifications.\n    /// @param makerAssetFillAmount Desired amount of makerAsset to buy.\n    /// @param signatures Proofs that orders have been signed by makers.\n    /// @return Amounts filled and fees paid by makers and taker.\n    function marketBuyOrdersNoThrow(\n        LibOrder.Order[] memory orders,\n        uint256 makerAssetFillAmount,\n        bytes[] memory signatures\n    )\n        public\n        returns (LibFillResults.FillResults memory totalFillResults);\n\n    /// @dev Synchronously cancels multiple orders in a single transaction.\n    /// @param orders Array of order specifications.\n    function batchCancelOrders(LibOrder.Order[] memory orders)\n        public;\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IWrapperFunctions.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IWrapperFunctions.sol",
    "exportedSymbols": {
      "IWrapperFunctions": [
        4220
      ]
    },
    "id": 4221,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4094,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:28"
      },
      {
        "id": 4095,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:28"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../libs/LibOrder.sol",
        "id": 4096,
        "nodeType": "ImportDirective",
        "scope": 4221,
        "sourceUnit": 4333,
        "src": "640:30:28",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../libs/LibFillResults.sol",
        "id": 4097,
        "nodeType": "ImportDirective",
        "scope": 4221,
        "sourceUnit": 4266,
        "src": "671:36:28",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4220,
        "linearizedBaseContracts": [
          4220
        ],
        "name": "IWrapperFunctions",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Fills the input order. Reverts if exact takerAssetFillAmount not filled.\n @param order LibOrder.Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.",
            "id": 4108,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrKillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4104,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4099,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4108,
                  "src": "1081:27:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4324_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4098,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4324,
                    "src": "1081:14:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4101,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4108,
                  "src": "1118:28:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4100,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1118:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4103,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4108,
                  "src": "1156:22:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4102,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1156:5:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1071:113:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4107,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4106,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4108,
                  "src": "1217:45:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4105,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4257,
                    "src": "1217:26:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1216:47:28"
            },
            "scope": 4220,
            "src": "1047:217:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Fills an order with specified parameters and ECDSA signature.\n      Returns false if the transaction would otherwise revert.\n @param order LibOrder.Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.\n @return Amounts filled and fees paid by maker and taker.",
            "id": 4119,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrderNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4115,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4110,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4119,
                  "src": "1734:27:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4324_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4109,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4324,
                    "src": "1734:14:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4112,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4119,
                  "src": "1771:28:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4111,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1771:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4114,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4119,
                  "src": "1809:22:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4113,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1809:5:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1724:113:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4118,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4117,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4119,
                  "src": "1870:45:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4116,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4257,
                    "src": "1870:26:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1869:47:28"
            },
            "scope": 4220,
            "src": "1699:218:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4133,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4129,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4122,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4133,
                  "src": "2310:30:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4324_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4120,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4324,
                      "src": "2310:14:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4121,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2310:16:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4324_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4125,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4133,
                  "src": "2350:38:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4123,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2350:7:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4124,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2350:9:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4128,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4133,
                  "src": "2398:25:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4126,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "2398:5:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4127,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2398:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2300:129:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4132,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4131,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4133,
                  "src": "2462:50:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4130,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4257,
                    "src": "2462:26:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2461:52:28"
            },
            "scope": 4220,
            "src": "2276:238:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrKill.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4147,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrKillOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4143,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4136,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4147,
                  "src": "2914:30:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4324_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4134,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4324,
                      "src": "2914:14:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4135,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2914:16:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4324_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4139,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4147,
                  "src": "2954:38:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4137,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2954:7:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4138,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2954:9:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4142,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4147,
                  "src": "3002:25:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4140,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "3002:5:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4141,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3002:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2904:129:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4146,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4145,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4147,
                  "src": "3066:50:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4144,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4257,
                    "src": "3066:26:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3065:52:28"
            },
            "scope": 4220,
            "src": "2874:244:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Fills an order with specified parameters and ECDSA signature.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4161,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4157,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4150,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4161,
                  "src": "3598:30:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4324_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4148,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4324,
                      "src": "3598:14:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4149,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3598:16:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4324_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4153,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4161,
                  "src": "3638:38:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4151,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3638:7:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4152,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3638:9:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4156,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4161,
                  "src": "3686:25:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4154,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "3686:5:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4155,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3686:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3588:129:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4160,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4159,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4161,
                  "src": "3750:50:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4158,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4257,
                    "src": "3750:26:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3749:52:28"
            },
            "scope": 4220,
            "src": "3557:245:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of takerAsset is sold by taker.\n @param orders Array of order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4174,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketSellOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4170,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4164,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4174,
                  "src": "4225:30:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4324_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4162,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4324,
                      "src": "4225:14:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4163,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4225:16:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4324_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4166,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4174,
                  "src": "4265:28:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4165,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4265:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4169,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4174,
                  "src": "4303:25:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4167,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "4303:5:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4168,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4303:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4215:119:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4173,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4172,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4174,
                  "src": "4367:50:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4171,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4257,
                    "src": "4367:26:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4366:52:28"
            },
            "scope": 4220,
            "src": "4190:229:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of takerAsset is sold by taker.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4187,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketSellOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4183,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4177,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4187,
                  "src": "4918:30:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4324_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4175,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4324,
                      "src": "4918:14:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4176,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4918:16:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4324_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4179,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4187,
                  "src": "4958:28:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4178,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4958:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4182,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4187,
                  "src": "4996:25:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4180,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "4996:5:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4181,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4996:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4908:119:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4186,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4185,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4187,
                  "src": "5060:50:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4184,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4257,
                    "src": "5060:26:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5059:52:28"
            },
            "scope": 4220,
            "src": "4876:236:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of makerAsset is bought by taker.\n @param orders Array of order specifications.\n @param makerAssetFillAmount Desired amount of makerAsset to buy.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4200,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketBuyOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4196,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4190,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4200,
                  "src": "5534:30:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4324_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4188,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4324,
                      "src": "5534:14:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4189,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5534:16:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4324_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4192,
                  "name": "makerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4200,
                  "src": "5574:28:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4191,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "5574:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4195,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4200,
                  "src": "5612:25:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4193,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "5612:5:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4194,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5612:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5524:119:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4199,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4198,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4200,
                  "src": "5676:50:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4197,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4257,
                    "src": "5676:26:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5675:52:28"
            },
            "scope": 4220,
            "src": "5500:228:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple fill orders in a single transaction until total amount is bought by taker.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param makerAssetFillAmount Desired amount of makerAsset to buy.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4213,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketBuyOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4209,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4203,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4213,
                  "src": "6230:30:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4324_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4201,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4324,
                      "src": "6230:14:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4202,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6230:16:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4324_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4205,
                  "name": "makerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4213,
                  "src": "6270:28:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4204,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6270:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4208,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4213,
                  "src": "6308:25:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4206,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "6308:5:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4207,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6308:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6220:119:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4212,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4211,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4213,
                  "src": "6372:50:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4210,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4257,
                    "src": "6372:26:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6371:52:28"
            },
            "scope": 4220,
            "src": "6189:235:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously cancels multiple orders in a single transaction.\n @param orders Array of order specifications.",
            "id": 4219,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchCancelOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4217,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4216,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4219,
                  "src": "6586:30:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4324_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4214,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4324,
                      "src": "6586:14:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4215,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6586:16:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4324_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6585:32:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4218,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6632:0:28"
            },
            "scope": 4220,
            "src": "6559:74:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 4221,
        "src": "709:5926:28"
      }
    ],
    "src": "580:6056:28"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IWrapperFunctions.sol",
    "exportedSymbols": {
      "IWrapperFunctions": [
        4220
      ]
    },
    "id": 4221,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4094,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:28"
      },
      {
        "id": 4095,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:28"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../libs/LibOrder.sol",
        "id": 4096,
        "nodeType": "ImportDirective",
        "scope": 4221,
        "sourceUnit": 4333,
        "src": "640:30:28",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../libs/LibFillResults.sol",
        "id": 4097,
        "nodeType": "ImportDirective",
        "scope": 4221,
        "sourceUnit": 4266,
        "src": "671:36:28",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4220,
        "linearizedBaseContracts": [
          4220
        ],
        "name": "IWrapperFunctions",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Fills the input order. Reverts if exact takerAssetFillAmount not filled.\n @param order LibOrder.Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.",
            "id": 4108,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrKillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4104,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4099,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4108,
                  "src": "1081:27:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4324_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4098,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4324,
                    "src": "1081:14:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4101,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4108,
                  "src": "1118:28:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4100,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1118:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4103,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4108,
                  "src": "1156:22:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4102,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1156:5:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1071:113:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4107,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4106,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4108,
                  "src": "1217:45:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4105,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4257,
                    "src": "1217:26:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1216:47:28"
            },
            "scope": 4220,
            "src": "1047:217:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Fills an order with specified parameters and ECDSA signature.\n      Returns false if the transaction would otherwise revert.\n @param order LibOrder.Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.\n @return Amounts filled and fees paid by maker and taker.",
            "id": 4119,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrderNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4115,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4110,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4119,
                  "src": "1734:27:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4324_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4109,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4324,
                    "src": "1734:14:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4112,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4119,
                  "src": "1771:28:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4111,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1771:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4114,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4119,
                  "src": "1809:22:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4113,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1809:5:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1724:113:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4118,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4117,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4119,
                  "src": "1870:45:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4116,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4257,
                    "src": "1870:26:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1869:47:28"
            },
            "scope": 4220,
            "src": "1699:218:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4133,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4129,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4122,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4133,
                  "src": "2310:30:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4324_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4120,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4324,
                      "src": "2310:14:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4121,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2310:16:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4324_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4125,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4133,
                  "src": "2350:38:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4123,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2350:7:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4124,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2350:9:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4128,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4133,
                  "src": "2398:25:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4126,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "2398:5:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4127,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2398:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2300:129:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4132,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4131,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4133,
                  "src": "2462:50:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4130,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4257,
                    "src": "2462:26:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2461:52:28"
            },
            "scope": 4220,
            "src": "2276:238:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrKill.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4147,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrKillOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4143,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4136,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4147,
                  "src": "2914:30:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4324_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4134,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4324,
                      "src": "2914:14:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4135,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2914:16:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4324_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4139,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4147,
                  "src": "2954:38:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4137,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2954:7:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4138,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2954:9:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4142,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4147,
                  "src": "3002:25:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4140,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "3002:5:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4141,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3002:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2904:129:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4146,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4145,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4147,
                  "src": "3066:50:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4144,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4257,
                    "src": "3066:26:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3065:52:28"
            },
            "scope": 4220,
            "src": "2874:244:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Fills an order with specified parameters and ECDSA signature.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4161,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4157,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4150,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4161,
                  "src": "3598:30:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4324_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4148,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4324,
                      "src": "3598:14:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4149,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3598:16:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4324_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4153,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4161,
                  "src": "3638:38:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4151,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3638:7:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4152,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3638:9:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4156,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4161,
                  "src": "3686:25:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4154,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "3686:5:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4155,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3686:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3588:129:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4160,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4159,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4161,
                  "src": "3750:50:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4158,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4257,
                    "src": "3750:26:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3749:52:28"
            },
            "scope": 4220,
            "src": "3557:245:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of takerAsset is sold by taker.\n @param orders Array of order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4174,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketSellOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4170,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4164,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4174,
                  "src": "4225:30:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4324_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4162,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4324,
                      "src": "4225:14:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4163,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4225:16:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4324_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4166,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4174,
                  "src": "4265:28:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4165,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4265:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4169,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4174,
                  "src": "4303:25:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4167,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "4303:5:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4168,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4303:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4215:119:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4173,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4172,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4174,
                  "src": "4367:50:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4171,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4257,
                    "src": "4367:26:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4366:52:28"
            },
            "scope": 4220,
            "src": "4190:229:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of takerAsset is sold by taker.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4187,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketSellOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4183,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4177,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4187,
                  "src": "4918:30:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4324_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4175,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4324,
                      "src": "4918:14:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4176,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4918:16:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4324_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4179,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4187,
                  "src": "4958:28:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4178,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4958:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4182,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4187,
                  "src": "4996:25:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4180,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "4996:5:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4181,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4996:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4908:119:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4186,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4185,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4187,
                  "src": "5060:50:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4184,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4257,
                    "src": "5060:26:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5059:52:28"
            },
            "scope": 4220,
            "src": "4876:236:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of makerAsset is bought by taker.\n @param orders Array of order specifications.\n @param makerAssetFillAmount Desired amount of makerAsset to buy.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4200,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketBuyOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4196,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4190,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4200,
                  "src": "5534:30:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4324_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4188,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4324,
                      "src": "5534:14:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4189,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5534:16:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4324_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4192,
                  "name": "makerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4200,
                  "src": "5574:28:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4191,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "5574:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4195,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4200,
                  "src": "5612:25:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4193,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "5612:5:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4194,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5612:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5524:119:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4199,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4198,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4200,
                  "src": "5676:50:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4197,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4257,
                    "src": "5676:26:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5675:52:28"
            },
            "scope": 4220,
            "src": "5500:228:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple fill orders in a single transaction until total amount is bought by taker.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param makerAssetFillAmount Desired amount of makerAsset to buy.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4213,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketBuyOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4209,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4203,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4213,
                  "src": "6230:30:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4324_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4201,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4324,
                      "src": "6230:14:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4202,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6230:16:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4324_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4205,
                  "name": "makerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4213,
                  "src": "6270:28:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4204,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6270:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4208,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4213,
                  "src": "6308:25:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4206,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "6308:5:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4207,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6308:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6220:119:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4212,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4211,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4213,
                  "src": "6372:50:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4210,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4257,
                    "src": "6372:26:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6371:52:28"
            },
            "scope": 4220,
            "src": "6189:235:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously cancels multiple orders in a single transaction.\n @param orders Array of order specifications.",
            "id": 4219,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchCancelOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4217,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4216,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4219,
                  "src": "6586:30:28",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4324_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4214,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4324,
                      "src": "6586:14:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4215,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6586:16:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4324_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6585:32:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4218,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6632:0:28"
            },
            "scope": 4220,
            "src": "6559:74:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 4221,
        "src": "709:5926:28"
      }
    ],
    "src": "580:6056:28"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-23T23:58:05.600Z"
}