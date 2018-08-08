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
        3242
      ]
    },
    "id": 3243,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3116,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:25"
      },
      {
        "id": 3117,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:25"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../libs/LibOrder.sol",
        "id": 3118,
        "nodeType": "ImportDirective",
        "scope": 3243,
        "sourceUnit": 3355,
        "src": "640:30:25",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../libs/LibFillResults.sol",
        "id": 3119,
        "nodeType": "ImportDirective",
        "scope": 3243,
        "sourceUnit": 3288,
        "src": "671:36:25",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 3242,
        "linearizedBaseContracts": [
          3242
        ],
        "name": "IWrapperFunctions",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Fills the input order. Reverts if exact takerAssetFillAmount not filled.\n @param order LibOrder.Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.",
            "id": 3130,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrKillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3126,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3121,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 3130,
                  "src": "1081:27:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3120,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3346,
                    "src": "1081:14:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3123,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3130,
                  "src": "1118:28:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3122,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1118:7:25",
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
                  "id": 3125,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 3130,
                  "src": "1156:22:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3124,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1156:5:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1071:113:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3129,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3128,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3130,
                  "src": "1217:45:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3279_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3127,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3279,
                    "src": "1217:26:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3279_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1216:47:25"
            },
            "scope": 3242,
            "src": "1047:217:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Fills an order with specified parameters and ECDSA signature.\n      Returns false if the transaction would otherwise revert.\n @param order LibOrder.Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.\n @return Amounts filled and fees paid by maker and taker.",
            "id": 3141,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrderNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3137,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3132,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 3141,
                  "src": "1734:27:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3131,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3346,
                    "src": "1734:14:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3134,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3141,
                  "src": "1771:28:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3133,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1771:7:25",
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
                  "id": 3136,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 3141,
                  "src": "1809:22:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3135,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1809:5:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1724:113:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3140,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3139,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3141,
                  "src": "1870:45:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3279_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3138,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3279,
                    "src": "1870:26:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3279_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1869:47:25"
            },
            "scope": 3242,
            "src": "1699:218:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3155,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3151,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3144,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3155,
                  "src": "2310:30:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3346_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3142,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3346,
                      "src": "2310:14:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3143,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2310:16:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3346_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3147,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 3155,
                  "src": "2350:38:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3145,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2350:7:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3146,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2350:9:25",
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
                  "id": 3150,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3155,
                  "src": "2398:25:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3148,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "2398:5:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3149,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2398:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2300:129:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3154,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3153,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3155,
                  "src": "2462:50:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3279_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3152,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3279,
                    "src": "2462:26:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3279_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2461:52:25"
            },
            "scope": 3242,
            "src": "2276:238:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrKill.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3169,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrKillOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3165,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3158,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3169,
                  "src": "2914:30:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3346_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3156,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3346,
                      "src": "2914:14:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3157,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2914:16:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3346_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3161,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 3169,
                  "src": "2954:38:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3159,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2954:7:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3160,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2954:9:25",
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
                  "id": 3164,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3169,
                  "src": "3002:25:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3162,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "3002:5:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3163,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3002:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2904:129:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3168,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3167,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3169,
                  "src": "3066:50:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3279_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3166,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3279,
                    "src": "3066:26:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3279_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3065:52:25"
            },
            "scope": 3242,
            "src": "2874:244:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Fills an order with specified parameters and ECDSA signature.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3183,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3179,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3172,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3183,
                  "src": "3598:30:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3346_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3170,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3346,
                      "src": "3598:14:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3171,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3598:16:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3346_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3175,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 3183,
                  "src": "3638:38:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3173,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3638:7:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3174,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3638:9:25",
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
                  "id": 3178,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3183,
                  "src": "3686:25:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3176,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "3686:5:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3177,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3686:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3588:129:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3182,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3181,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3183,
                  "src": "3750:50:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3279_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3180,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3279,
                    "src": "3750:26:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3279_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3749:52:25"
            },
            "scope": 3242,
            "src": "3557:245:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of takerAsset is sold by taker.\n @param orders Array of order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3196,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketSellOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3192,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3186,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3196,
                  "src": "4225:30:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3346_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3184,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3346,
                      "src": "4225:14:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3185,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4225:16:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3346_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3188,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3196,
                  "src": "4265:28:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3187,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4265:7:25",
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
                  "id": 3191,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3196,
                  "src": "4303:25:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3189,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "4303:5:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3190,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4303:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4215:119:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3195,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3194,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3196,
                  "src": "4367:50:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3279_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3193,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3279,
                    "src": "4367:26:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3279_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4366:52:25"
            },
            "scope": 3242,
            "src": "4190:229:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of takerAsset is sold by taker.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3209,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketSellOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3205,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3199,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3209,
                  "src": "4918:30:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3346_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3197,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3346,
                      "src": "4918:14:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3198,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4918:16:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3346_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3201,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3209,
                  "src": "4958:28:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3200,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4958:7:25",
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
                  "id": 3204,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3209,
                  "src": "4996:25:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3202,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "4996:5:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3203,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4996:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4908:119:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3208,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3207,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3209,
                  "src": "5060:50:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3279_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3206,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3279,
                    "src": "5060:26:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3279_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5059:52:25"
            },
            "scope": 3242,
            "src": "4876:236:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of makerAsset is bought by taker.\n @param orders Array of order specifications.\n @param makerAssetFillAmount Desired amount of makerAsset to buy.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3222,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketBuyOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3218,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3212,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3222,
                  "src": "5534:30:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3346_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3210,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3346,
                      "src": "5534:14:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3211,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5534:16:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3346_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3214,
                  "name": "makerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3222,
                  "src": "5574:28:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3213,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "5574:7:25",
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
                  "id": 3217,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3222,
                  "src": "5612:25:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3215,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "5612:5:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3216,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5612:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5524:119:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3221,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3220,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3222,
                  "src": "5676:50:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3279_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3219,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3279,
                    "src": "5676:26:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3279_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5675:52:25"
            },
            "scope": 3242,
            "src": "5500:228:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple fill orders in a single transaction until total amount is bought by taker.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param makerAssetFillAmount Desired amount of makerAsset to buy.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3235,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketBuyOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3231,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3225,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3235,
                  "src": "6230:30:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3346_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3223,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3346,
                      "src": "6230:14:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3224,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6230:16:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3346_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3227,
                  "name": "makerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3235,
                  "src": "6270:28:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3226,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6270:7:25",
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
                  "id": 3230,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3235,
                  "src": "6308:25:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3228,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "6308:5:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3229,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6308:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6220:119:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3234,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3233,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3235,
                  "src": "6372:50:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3279_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3232,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3279,
                    "src": "6372:26:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3279_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6371:52:25"
            },
            "scope": 3242,
            "src": "6189:235:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously cancels multiple orders in a single transaction.\n @param orders Array of order specifications.",
            "id": 3241,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchCancelOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3239,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3238,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3241,
                  "src": "6586:30:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3346_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3236,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3346,
                      "src": "6586:14:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3237,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6586:16:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3346_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6585:32:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3240,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6632:0:25"
            },
            "scope": 3242,
            "src": "6559:74:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 3243,
        "src": "709:5926:25"
      }
    ],
    "src": "580:6056:25"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IWrapperFunctions.sol",
    "exportedSymbols": {
      "IWrapperFunctions": [
        3242
      ]
    },
    "id": 3243,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3116,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:25"
      },
      {
        "id": 3117,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:25"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../libs/LibOrder.sol",
        "id": 3118,
        "nodeType": "ImportDirective",
        "scope": 3243,
        "sourceUnit": 3355,
        "src": "640:30:25",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../libs/LibFillResults.sol",
        "id": 3119,
        "nodeType": "ImportDirective",
        "scope": 3243,
        "sourceUnit": 3288,
        "src": "671:36:25",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 3242,
        "linearizedBaseContracts": [
          3242
        ],
        "name": "IWrapperFunctions",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Fills the input order. Reverts if exact takerAssetFillAmount not filled.\n @param order LibOrder.Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.",
            "id": 3130,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrKillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3126,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3121,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 3130,
                  "src": "1081:27:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3120,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3346,
                    "src": "1081:14:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3123,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3130,
                  "src": "1118:28:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3122,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1118:7:25",
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
                  "id": 3125,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 3130,
                  "src": "1156:22:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3124,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1156:5:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1071:113:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3129,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3128,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3130,
                  "src": "1217:45:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3279_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3127,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3279,
                    "src": "1217:26:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3279_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1216:47:25"
            },
            "scope": 3242,
            "src": "1047:217:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Fills an order with specified parameters and ECDSA signature.\n      Returns false if the transaction would otherwise revert.\n @param order LibOrder.Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.\n @return Amounts filled and fees paid by maker and taker.",
            "id": 3141,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrderNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3137,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3132,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 3141,
                  "src": "1734:27:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3131,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3346,
                    "src": "1734:14:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3134,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3141,
                  "src": "1771:28:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3133,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1771:7:25",
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
                  "id": 3136,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 3141,
                  "src": "1809:22:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3135,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1809:5:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1724:113:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3140,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3139,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3141,
                  "src": "1870:45:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3279_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3138,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3279,
                    "src": "1870:26:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3279_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1869:47:25"
            },
            "scope": 3242,
            "src": "1699:218:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3155,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3151,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3144,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3155,
                  "src": "2310:30:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3346_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3142,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3346,
                      "src": "2310:14:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3143,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2310:16:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3346_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3147,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 3155,
                  "src": "2350:38:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3145,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2350:7:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3146,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2350:9:25",
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
                  "id": 3150,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3155,
                  "src": "2398:25:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3148,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "2398:5:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3149,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2398:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2300:129:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3154,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3153,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3155,
                  "src": "2462:50:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3279_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3152,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3279,
                    "src": "2462:26:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3279_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2461:52:25"
            },
            "scope": 3242,
            "src": "2276:238:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrKill.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3169,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrKillOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3165,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3158,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3169,
                  "src": "2914:30:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3346_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3156,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3346,
                      "src": "2914:14:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3157,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2914:16:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3346_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3161,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 3169,
                  "src": "2954:38:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3159,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2954:7:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3160,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2954:9:25",
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
                  "id": 3164,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3169,
                  "src": "3002:25:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3162,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "3002:5:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3163,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3002:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2904:129:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3168,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3167,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3169,
                  "src": "3066:50:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3279_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3166,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3279,
                    "src": "3066:26:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3279_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3065:52:25"
            },
            "scope": 3242,
            "src": "2874:244:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Fills an order with specified parameters and ECDSA signature.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3183,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3179,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3172,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3183,
                  "src": "3598:30:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3346_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3170,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3346,
                      "src": "3598:14:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3171,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3598:16:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3346_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3175,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 3183,
                  "src": "3638:38:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3173,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3638:7:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3174,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3638:9:25",
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
                  "id": 3178,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3183,
                  "src": "3686:25:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3176,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "3686:5:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3177,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3686:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3588:129:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3182,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3181,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3183,
                  "src": "3750:50:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3279_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3180,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3279,
                    "src": "3750:26:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3279_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3749:52:25"
            },
            "scope": 3242,
            "src": "3557:245:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of takerAsset is sold by taker.\n @param orders Array of order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3196,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketSellOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3192,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3186,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3196,
                  "src": "4225:30:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3346_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3184,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3346,
                      "src": "4225:14:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3185,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4225:16:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3346_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3188,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3196,
                  "src": "4265:28:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3187,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4265:7:25",
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
                  "id": 3191,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3196,
                  "src": "4303:25:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3189,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "4303:5:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3190,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4303:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4215:119:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3195,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3194,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3196,
                  "src": "4367:50:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3279_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3193,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3279,
                    "src": "4367:26:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3279_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4366:52:25"
            },
            "scope": 3242,
            "src": "4190:229:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of takerAsset is sold by taker.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3209,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketSellOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3205,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3199,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3209,
                  "src": "4918:30:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3346_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3197,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3346,
                      "src": "4918:14:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3198,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4918:16:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3346_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3201,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3209,
                  "src": "4958:28:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3200,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4958:7:25",
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
                  "id": 3204,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3209,
                  "src": "4996:25:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3202,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "4996:5:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3203,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4996:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4908:119:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3208,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3207,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3209,
                  "src": "5060:50:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3279_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3206,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3279,
                    "src": "5060:26:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3279_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5059:52:25"
            },
            "scope": 3242,
            "src": "4876:236:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of makerAsset is bought by taker.\n @param orders Array of order specifications.\n @param makerAssetFillAmount Desired amount of makerAsset to buy.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3222,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketBuyOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3218,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3212,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3222,
                  "src": "5534:30:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3346_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3210,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3346,
                      "src": "5534:14:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3211,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5534:16:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3346_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3214,
                  "name": "makerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3222,
                  "src": "5574:28:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3213,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "5574:7:25",
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
                  "id": 3217,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3222,
                  "src": "5612:25:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3215,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "5612:5:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3216,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5612:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5524:119:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3221,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3220,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3222,
                  "src": "5676:50:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3279_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3219,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3279,
                    "src": "5676:26:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3279_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5675:52:25"
            },
            "scope": 3242,
            "src": "5500:228:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple fill orders in a single transaction until total amount is bought by taker.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param makerAssetFillAmount Desired amount of makerAsset to buy.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3235,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketBuyOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3231,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3225,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3235,
                  "src": "6230:30:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3346_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3223,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3346,
                      "src": "6230:14:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3224,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6230:16:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3346_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3227,
                  "name": "makerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3235,
                  "src": "6270:28:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3226,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6270:7:25",
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
                  "id": 3230,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3235,
                  "src": "6308:25:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3228,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "6308:5:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3229,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6308:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6220:119:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3234,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3233,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3235,
                  "src": "6372:50:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3279_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3232,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3279,
                    "src": "6372:26:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3279_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6371:52:25"
            },
            "scope": 3242,
            "src": "6189:235:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously cancels multiple orders in a single transaction.\n @param orders Array of order specifications.",
            "id": 3241,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchCancelOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3239,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3238,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3241,
                  "src": "6586:30:25",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3346_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3236,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3346,
                      "src": "6586:14:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3237,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6586:16:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3346_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6585:32:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3240,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6632:0:25"
            },
            "scope": 3242,
            "src": "6559:74:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 3243,
        "src": "709:5926:25"
      }
    ],
    "src": "580:6056:25"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-08T05:31:02.893Z"
}