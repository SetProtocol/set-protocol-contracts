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
        4380
      ]
    },
    "id": 4381,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4254,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:32"
      },
      {
        "id": 4255,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:32"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../libs/LibOrder.sol",
        "id": 4256,
        "nodeType": "ImportDirective",
        "scope": 4381,
        "sourceUnit": 4493,
        "src": "640:30:32",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../libs/LibFillResults.sol",
        "id": 4257,
        "nodeType": "ImportDirective",
        "scope": 4381,
        "sourceUnit": 4426,
        "src": "671:36:32",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4380,
        "linearizedBaseContracts": [
          4380
        ],
        "name": "IWrapperFunctions",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Fills the input order. Reverts if exact takerAssetFillAmount not filled.\n @param order LibOrder.Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.",
            "id": 4268,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrKillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4264,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4259,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4268,
                  "src": "1081:27:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4484_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4258,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4484,
                    "src": "1081:14:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4484_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4261,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4268,
                  "src": "1118:28:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4260,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1118:7:32",
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
                  "id": 4263,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4268,
                  "src": "1156:22:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4262,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1156:5:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1071:113:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 4267,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4266,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4268,
                  "src": "1217:45:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4417_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4265,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4417,
                    "src": "1217:26:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4417_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1216:47:32"
            },
            "scope": 4380,
            "src": "1047:217:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Fills an order with specified parameters and ECDSA signature.\n      Returns false if the transaction would otherwise revert.\n @param order LibOrder.Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.\n @return Amounts filled and fees paid by maker and taker.",
            "id": 4279,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrderNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4275,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4270,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4279,
                  "src": "1734:27:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4484_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4269,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4484,
                    "src": "1734:14:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4484_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4272,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4279,
                  "src": "1771:28:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4271,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1771:7:32",
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
                  "id": 4274,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4279,
                  "src": "1809:22:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4273,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1809:5:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1724:113:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 4278,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4277,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4279,
                  "src": "1870:45:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4417_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4276,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4417,
                    "src": "1870:26:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4417_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1869:47:32"
            },
            "scope": 4380,
            "src": "1699:218:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4293,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4289,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4282,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4293,
                  "src": "2310:30:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4484_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4280,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4484,
                      "src": "2310:14:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4484_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4281,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2310:16:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4484_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4285,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4293,
                  "src": "2350:38:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4283,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2350:7:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4284,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2350:9:32",
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
                  "id": 4288,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4293,
                  "src": "2398:25:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4286,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "2398:5:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4287,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2398:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2300:129:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 4292,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4291,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4293,
                  "src": "2462:50:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4417_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4290,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4417,
                    "src": "2462:26:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4417_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2461:52:32"
            },
            "scope": 4380,
            "src": "2276:238:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrKill.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4307,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrKillOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4303,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4296,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4307,
                  "src": "2914:30:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4484_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4294,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4484,
                      "src": "2914:14:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4484_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4295,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2914:16:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4484_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4299,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4307,
                  "src": "2954:38:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4297,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2954:7:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4298,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2954:9:32",
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
                  "id": 4302,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4307,
                  "src": "3002:25:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4300,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "3002:5:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4301,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3002:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2904:129:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 4306,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4305,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4307,
                  "src": "3066:50:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4417_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4304,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4417,
                    "src": "3066:26:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4417_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3065:52:32"
            },
            "scope": 4380,
            "src": "2874:244:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Fills an order with specified parameters and ECDSA signature.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4321,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4317,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4310,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4321,
                  "src": "3598:30:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4484_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4308,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4484,
                      "src": "3598:14:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4484_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4309,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3598:16:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4484_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4313,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4321,
                  "src": "3638:38:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4311,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3638:7:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4312,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3638:9:32",
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
                  "id": 4316,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4321,
                  "src": "3686:25:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4314,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "3686:5:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4315,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3686:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3588:129:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 4320,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4319,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4321,
                  "src": "3750:50:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4417_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4318,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4417,
                    "src": "3750:26:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4417_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3749:52:32"
            },
            "scope": 4380,
            "src": "3557:245:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of takerAsset is sold by taker.\n @param orders Array of order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4334,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketSellOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4330,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4324,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4334,
                  "src": "4225:30:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4484_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4322,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4484,
                      "src": "4225:14:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4484_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4323,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4225:16:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4484_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4326,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4334,
                  "src": "4265:28:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4325,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4265:7:32",
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
                  "id": 4329,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4334,
                  "src": "4303:25:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4327,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "4303:5:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4328,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4303:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4215:119:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 4333,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4332,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4334,
                  "src": "4367:50:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4417_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4331,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4417,
                    "src": "4367:26:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4417_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4366:52:32"
            },
            "scope": 4380,
            "src": "4190:229:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of takerAsset is sold by taker.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4347,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketSellOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4343,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4337,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4347,
                  "src": "4918:30:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4484_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4335,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4484,
                      "src": "4918:14:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4484_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4336,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4918:16:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4484_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4339,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4347,
                  "src": "4958:28:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4338,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4958:7:32",
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
                  "id": 4342,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4347,
                  "src": "4996:25:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4340,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "4996:5:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4341,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4996:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4908:119:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 4346,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4345,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4347,
                  "src": "5060:50:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4417_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4344,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4417,
                    "src": "5060:26:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4417_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5059:52:32"
            },
            "scope": 4380,
            "src": "4876:236:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of makerAsset is bought by taker.\n @param orders Array of order specifications.\n @param makerAssetFillAmount Desired amount of makerAsset to buy.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4360,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketBuyOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4356,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4350,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4360,
                  "src": "5534:30:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4484_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4348,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4484,
                      "src": "5534:14:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4484_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4349,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5534:16:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4484_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4352,
                  "name": "makerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4360,
                  "src": "5574:28:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4351,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "5574:7:32",
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
                  "id": 4355,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4360,
                  "src": "5612:25:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4353,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "5612:5:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4354,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5612:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5524:119:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 4359,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4358,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4360,
                  "src": "5676:50:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4417_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4357,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4417,
                    "src": "5676:26:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4417_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5675:52:32"
            },
            "scope": 4380,
            "src": "5500:228:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple fill orders in a single transaction until total amount is bought by taker.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param makerAssetFillAmount Desired amount of makerAsset to buy.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4373,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketBuyOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4369,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4363,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4373,
                  "src": "6230:30:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4484_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4361,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4484,
                      "src": "6230:14:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4484_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4362,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6230:16:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4484_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4365,
                  "name": "makerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4373,
                  "src": "6270:28:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4364,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6270:7:32",
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
                  "id": 4368,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4373,
                  "src": "6308:25:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4366,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "6308:5:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4367,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6308:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6220:119:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 4372,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4371,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4373,
                  "src": "6372:50:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4417_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4370,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4417,
                    "src": "6372:26:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4417_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6371:52:32"
            },
            "scope": 4380,
            "src": "6189:235:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously cancels multiple orders in a single transaction.\n @param orders Array of order specifications.",
            "id": 4379,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchCancelOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4377,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4376,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4379,
                  "src": "6586:30:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4484_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4374,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4484,
                      "src": "6586:14:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4484_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4375,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6586:16:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4484_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6585:32:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 4378,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6632:0:32"
            },
            "scope": 4380,
            "src": "6559:74:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 4381,
        "src": "709:5926:32"
      }
    ],
    "src": "580:6056:32"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IWrapperFunctions.sol",
    "exportedSymbols": {
      "IWrapperFunctions": [
        4380
      ]
    },
    "id": 4381,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4254,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:32"
      },
      {
        "id": 4255,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:32"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../libs/LibOrder.sol",
        "id": 4256,
        "nodeType": "ImportDirective",
        "scope": 4381,
        "sourceUnit": 4493,
        "src": "640:30:32",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../libs/LibFillResults.sol",
        "id": 4257,
        "nodeType": "ImportDirective",
        "scope": 4381,
        "sourceUnit": 4426,
        "src": "671:36:32",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4380,
        "linearizedBaseContracts": [
          4380
        ],
        "name": "IWrapperFunctions",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Fills the input order. Reverts if exact takerAssetFillAmount not filled.\n @param order LibOrder.Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.",
            "id": 4268,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrKillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4264,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4259,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4268,
                  "src": "1081:27:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4484_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4258,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4484,
                    "src": "1081:14:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4484_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4261,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4268,
                  "src": "1118:28:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4260,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1118:7:32",
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
                  "id": 4263,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4268,
                  "src": "1156:22:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4262,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1156:5:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1071:113:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 4267,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4266,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4268,
                  "src": "1217:45:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4417_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4265,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4417,
                    "src": "1217:26:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4417_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1216:47:32"
            },
            "scope": 4380,
            "src": "1047:217:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Fills an order with specified parameters and ECDSA signature.\n      Returns false if the transaction would otherwise revert.\n @param order LibOrder.Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.\n @return Amounts filled and fees paid by maker and taker.",
            "id": 4279,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrderNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4275,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4270,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4279,
                  "src": "1734:27:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4484_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4269,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4484,
                    "src": "1734:14:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4484_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4272,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4279,
                  "src": "1771:28:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4271,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1771:7:32",
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
                  "id": 4274,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4279,
                  "src": "1809:22:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4273,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1809:5:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1724:113:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 4278,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4277,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4279,
                  "src": "1870:45:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4417_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4276,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4417,
                    "src": "1870:26:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4417_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1869:47:32"
            },
            "scope": 4380,
            "src": "1699:218:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4293,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4289,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4282,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4293,
                  "src": "2310:30:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4484_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4280,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4484,
                      "src": "2310:14:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4484_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4281,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2310:16:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4484_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4285,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4293,
                  "src": "2350:38:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4283,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2350:7:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4284,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2350:9:32",
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
                  "id": 4288,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4293,
                  "src": "2398:25:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4286,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "2398:5:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4287,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2398:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2300:129:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 4292,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4291,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4293,
                  "src": "2462:50:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4417_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4290,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4417,
                    "src": "2462:26:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4417_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2461:52:32"
            },
            "scope": 4380,
            "src": "2276:238:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrKill.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4307,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrKillOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4303,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4296,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4307,
                  "src": "2914:30:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4484_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4294,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4484,
                      "src": "2914:14:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4484_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4295,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2914:16:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4484_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4299,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4307,
                  "src": "2954:38:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4297,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2954:7:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4298,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2954:9:32",
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
                  "id": 4302,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4307,
                  "src": "3002:25:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4300,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "3002:5:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4301,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3002:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2904:129:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 4306,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4305,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4307,
                  "src": "3066:50:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4417_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4304,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4417,
                    "src": "3066:26:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4417_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3065:52:32"
            },
            "scope": 4380,
            "src": "2874:244:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Fills an order with specified parameters and ECDSA signature.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4321,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4317,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4310,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4321,
                  "src": "3598:30:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4484_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4308,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4484,
                      "src": "3598:14:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4484_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4309,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3598:16:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4484_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4313,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4321,
                  "src": "3638:38:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4311,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3638:7:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4312,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3638:9:32",
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
                  "id": 4316,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4321,
                  "src": "3686:25:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4314,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "3686:5:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4315,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3686:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3588:129:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 4320,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4319,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4321,
                  "src": "3750:50:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4417_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4318,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4417,
                    "src": "3750:26:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4417_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3749:52:32"
            },
            "scope": 4380,
            "src": "3557:245:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of takerAsset is sold by taker.\n @param orders Array of order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4334,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketSellOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4330,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4324,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4334,
                  "src": "4225:30:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4484_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4322,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4484,
                      "src": "4225:14:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4484_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4323,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4225:16:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4484_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4326,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4334,
                  "src": "4265:28:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4325,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4265:7:32",
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
                  "id": 4329,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4334,
                  "src": "4303:25:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4327,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "4303:5:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4328,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4303:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4215:119:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 4333,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4332,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4334,
                  "src": "4367:50:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4417_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4331,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4417,
                    "src": "4367:26:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4417_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4366:52:32"
            },
            "scope": 4380,
            "src": "4190:229:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of takerAsset is sold by taker.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4347,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketSellOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4343,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4337,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4347,
                  "src": "4918:30:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4484_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4335,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4484,
                      "src": "4918:14:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4484_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4336,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4918:16:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4484_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4339,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4347,
                  "src": "4958:28:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4338,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4958:7:32",
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
                  "id": 4342,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4347,
                  "src": "4996:25:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4340,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "4996:5:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4341,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4996:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4908:119:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 4346,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4345,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4347,
                  "src": "5060:50:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4417_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4344,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4417,
                    "src": "5060:26:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4417_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5059:52:32"
            },
            "scope": 4380,
            "src": "4876:236:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of makerAsset is bought by taker.\n @param orders Array of order specifications.\n @param makerAssetFillAmount Desired amount of makerAsset to buy.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4360,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketBuyOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4356,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4350,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4360,
                  "src": "5534:30:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4484_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4348,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4484,
                      "src": "5534:14:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4484_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4349,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5534:16:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4484_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4352,
                  "name": "makerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4360,
                  "src": "5574:28:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4351,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "5574:7:32",
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
                  "id": 4355,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4360,
                  "src": "5612:25:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4353,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "5612:5:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4354,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5612:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5524:119:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 4359,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4358,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4360,
                  "src": "5676:50:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4417_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4357,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4417,
                    "src": "5676:26:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4417_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5675:52:32"
            },
            "scope": 4380,
            "src": "5500:228:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple fill orders in a single transaction until total amount is bought by taker.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param makerAssetFillAmount Desired amount of makerAsset to buy.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4373,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketBuyOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4369,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4363,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4373,
                  "src": "6230:30:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4484_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4361,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4484,
                      "src": "6230:14:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4484_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4362,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6230:16:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4484_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4365,
                  "name": "makerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4373,
                  "src": "6270:28:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4364,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6270:7:32",
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
                  "id": 4368,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4373,
                  "src": "6308:25:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4366,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "6308:5:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4367,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6308:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6220:119:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 4372,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4371,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4373,
                  "src": "6372:50:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4417_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4370,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4417,
                    "src": "6372:26:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4417_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6371:52:32"
            },
            "scope": 4380,
            "src": "6189:235:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously cancels multiple orders in a single transaction.\n @param orders Array of order specifications.",
            "id": 4379,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchCancelOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4377,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4376,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4379,
                  "src": "6586:30:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4484_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4374,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4484,
                      "src": "6586:14:32",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4484_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4375,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6586:16:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4484_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6585:32:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 4378,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6632:0:32"
            },
            "scope": 4380,
            "src": "6559:74:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 4381,
        "src": "709:5926:32"
      }
    ],
    "src": "580:6056:32"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-10T03:42:05.770Z"
}