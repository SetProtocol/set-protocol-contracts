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
        3799
      ]
    },
    "id": 3800,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3673,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:38"
      },
      {
        "id": 3674,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:38"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../libs/LibOrder.sol",
        "id": 3675,
        "nodeType": "ImportDirective",
        "scope": 3800,
        "sourceUnit": 3995,
        "src": "640:30:38",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../libs/LibFillResults.sol",
        "id": 3676,
        "nodeType": "ImportDirective",
        "scope": 3800,
        "sourceUnit": 3928,
        "src": "671:36:38",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 3799,
        "linearizedBaseContracts": [
          3799
        ],
        "name": "IWrapperFunctions",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Fills the input order. Reverts if exact takerAssetFillAmount not filled.\n @param order LibOrder.Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.",
            "id": 3687,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrKillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3683,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3678,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 3687,
                  "src": "1081:27:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$3986_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3677,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3986,
                    "src": "1081:14:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3986_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3680,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3687,
                  "src": "1118:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3679,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1118:7:38",
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
                  "id": 3682,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 3687,
                  "src": "1156:22:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3681,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1156:5:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1071:113:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 3686,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3685,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3687,
                  "src": "1217:45:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3684,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3919,
                    "src": "1217:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1216:47:38"
            },
            "scope": 3799,
            "src": "1047:217:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Fills an order with specified parameters and ECDSA signature.\n      Returns false if the transaction would otherwise revert.\n @param order LibOrder.Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.\n @return Amounts filled and fees paid by maker and taker.",
            "id": 3698,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrderNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3694,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3689,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 3698,
                  "src": "1734:27:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$3986_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3688,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3986,
                    "src": "1734:14:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3986_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3691,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3698,
                  "src": "1771:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3690,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1771:7:38",
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
                  "id": 3693,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 3698,
                  "src": "1809:22:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3692,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1809:5:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1724:113:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 3697,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3696,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3698,
                  "src": "1870:45:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3695,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3919,
                    "src": "1870:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1869:47:38"
            },
            "scope": 3799,
            "src": "1699:218:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3712,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3708,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3701,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3712,
                  "src": "2310:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3986_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3699,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3986,
                      "src": "2310:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3986_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3700,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2310:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3986_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3704,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 3712,
                  "src": "2350:38:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3702,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2350:7:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3703,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2350:9:38",
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
                  "id": 3707,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3712,
                  "src": "2398:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3705,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "2398:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3706,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2398:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2300:129:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 3711,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3710,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3712,
                  "src": "2462:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3709,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3919,
                    "src": "2462:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2461:52:38"
            },
            "scope": 3799,
            "src": "2276:238:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrKill.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3726,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrKillOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3722,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3715,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3726,
                  "src": "2914:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3986_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3713,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3986,
                      "src": "2914:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3986_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3714,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2914:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3986_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3718,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 3726,
                  "src": "2954:38:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3716,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2954:7:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3717,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2954:9:38",
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
                  "id": 3721,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3726,
                  "src": "3002:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3719,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "3002:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3720,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3002:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2904:129:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 3725,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3724,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3726,
                  "src": "3066:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3723,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3919,
                    "src": "3066:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3065:52:38"
            },
            "scope": 3799,
            "src": "2874:244:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Fills an order with specified parameters and ECDSA signature.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3740,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3736,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3729,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3740,
                  "src": "3598:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3986_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3727,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3986,
                      "src": "3598:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3986_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3728,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3598:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3986_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3732,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 3740,
                  "src": "3638:38:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3730,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3638:7:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3731,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3638:9:38",
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
                  "id": 3735,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3740,
                  "src": "3686:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3733,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "3686:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3734,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3686:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3588:129:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 3739,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3738,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3740,
                  "src": "3750:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3737,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3919,
                    "src": "3750:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3749:52:38"
            },
            "scope": 3799,
            "src": "3557:245:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of takerAsset is sold by taker.\n @param orders Array of order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3753,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketSellOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3749,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3743,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3753,
                  "src": "4225:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3986_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3741,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3986,
                      "src": "4225:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3986_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3742,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4225:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3986_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3745,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3753,
                  "src": "4265:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3744,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4265:7:38",
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
                  "id": 3748,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3753,
                  "src": "4303:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3746,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "4303:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3747,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4303:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4215:119:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 3752,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3751,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3753,
                  "src": "4367:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3750,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3919,
                    "src": "4367:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4366:52:38"
            },
            "scope": 3799,
            "src": "4190:229:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of takerAsset is sold by taker.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3766,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketSellOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3762,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3756,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3766,
                  "src": "4918:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3986_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3754,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3986,
                      "src": "4918:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3986_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3755,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4918:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3986_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3758,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3766,
                  "src": "4958:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3757,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4958:7:38",
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
                  "id": 3761,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3766,
                  "src": "4996:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3759,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "4996:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3760,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4996:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4908:119:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 3765,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3764,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3766,
                  "src": "5060:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3763,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3919,
                    "src": "5060:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5059:52:38"
            },
            "scope": 3799,
            "src": "4876:236:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of makerAsset is bought by taker.\n @param orders Array of order specifications.\n @param makerAssetFillAmount Desired amount of makerAsset to buy.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3779,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketBuyOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3775,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3769,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3779,
                  "src": "5534:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3986_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3767,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3986,
                      "src": "5534:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3986_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3768,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5534:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3986_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3771,
                  "name": "makerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3779,
                  "src": "5574:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3770,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "5574:7:38",
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
                  "id": 3774,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3779,
                  "src": "5612:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3772,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "5612:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3773,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5612:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5524:119:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 3778,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3777,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3779,
                  "src": "5676:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3776,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3919,
                    "src": "5676:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5675:52:38"
            },
            "scope": 3799,
            "src": "5500:228:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple fill orders in a single transaction until total amount is bought by taker.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param makerAssetFillAmount Desired amount of makerAsset to buy.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3792,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketBuyOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3788,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3782,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3792,
                  "src": "6230:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3986_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3780,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3986,
                      "src": "6230:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3986_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3781,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6230:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3986_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3784,
                  "name": "makerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3792,
                  "src": "6270:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3783,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6270:7:38",
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
                  "id": 3787,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3792,
                  "src": "6308:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3785,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "6308:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3786,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6308:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6220:119:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 3791,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3790,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3792,
                  "src": "6372:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3789,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3919,
                    "src": "6372:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6371:52:38"
            },
            "scope": 3799,
            "src": "6189:235:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously cancels multiple orders in a single transaction.\n @param orders Array of order specifications.",
            "id": 3798,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchCancelOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3796,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3795,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3798,
                  "src": "6586:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3986_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3793,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3986,
                      "src": "6586:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3986_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3794,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6586:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3986_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6585:32:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 3797,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6632:0:38"
            },
            "scope": 3799,
            "src": "6559:74:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 3800,
        "src": "709:5926:38"
      }
    ],
    "src": "580:6056:38"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IWrapperFunctions.sol",
    "exportedSymbols": {
      "IWrapperFunctions": [
        3799
      ]
    },
    "id": 3800,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3673,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:38"
      },
      {
        "id": 3674,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:38"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../libs/LibOrder.sol",
        "id": 3675,
        "nodeType": "ImportDirective",
        "scope": 3800,
        "sourceUnit": 3995,
        "src": "640:30:38",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../libs/LibFillResults.sol",
        "id": 3676,
        "nodeType": "ImportDirective",
        "scope": 3800,
        "sourceUnit": 3928,
        "src": "671:36:38",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 3799,
        "linearizedBaseContracts": [
          3799
        ],
        "name": "IWrapperFunctions",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Fills the input order. Reverts if exact takerAssetFillAmount not filled.\n @param order LibOrder.Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.",
            "id": 3687,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrKillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3683,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3678,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 3687,
                  "src": "1081:27:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$3986_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3677,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3986,
                    "src": "1081:14:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3986_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3680,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3687,
                  "src": "1118:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3679,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1118:7:38",
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
                  "id": 3682,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 3687,
                  "src": "1156:22:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3681,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1156:5:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1071:113:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 3686,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3685,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3687,
                  "src": "1217:45:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3684,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3919,
                    "src": "1217:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1216:47:38"
            },
            "scope": 3799,
            "src": "1047:217:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Fills an order with specified parameters and ECDSA signature.\n      Returns false if the transaction would otherwise revert.\n @param order LibOrder.Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.\n @return Amounts filled and fees paid by maker and taker.",
            "id": 3698,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrderNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3694,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3689,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 3698,
                  "src": "1734:27:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$3986_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3688,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3986,
                    "src": "1734:14:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3986_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3691,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3698,
                  "src": "1771:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3690,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1771:7:38",
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
                  "id": 3693,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 3698,
                  "src": "1809:22:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3692,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1809:5:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1724:113:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 3697,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3696,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3698,
                  "src": "1870:45:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3695,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3919,
                    "src": "1870:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1869:47:38"
            },
            "scope": 3799,
            "src": "1699:218:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3712,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3708,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3701,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3712,
                  "src": "2310:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3986_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3699,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3986,
                      "src": "2310:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3986_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3700,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2310:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3986_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3704,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 3712,
                  "src": "2350:38:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3702,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2350:7:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3703,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2350:9:38",
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
                  "id": 3707,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3712,
                  "src": "2398:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3705,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "2398:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3706,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2398:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2300:129:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 3711,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3710,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3712,
                  "src": "2462:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3709,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3919,
                    "src": "2462:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2461:52:38"
            },
            "scope": 3799,
            "src": "2276:238:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrKill.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3726,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrKillOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3722,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3715,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3726,
                  "src": "2914:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3986_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3713,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3986,
                      "src": "2914:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3986_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3714,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2914:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3986_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3718,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 3726,
                  "src": "2954:38:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3716,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2954:7:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3717,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2954:9:38",
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
                  "id": 3721,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3726,
                  "src": "3002:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3719,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "3002:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3720,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3002:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2904:129:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 3725,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3724,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3726,
                  "src": "3066:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3723,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3919,
                    "src": "3066:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3065:52:38"
            },
            "scope": 3799,
            "src": "2874:244:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Fills an order with specified parameters and ECDSA signature.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3740,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3736,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3729,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3740,
                  "src": "3598:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3986_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3727,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3986,
                      "src": "3598:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3986_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3728,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3598:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3986_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3732,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 3740,
                  "src": "3638:38:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3730,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3638:7:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3731,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3638:9:38",
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
                  "id": 3735,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3740,
                  "src": "3686:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3733,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "3686:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3734,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3686:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3588:129:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 3739,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3738,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3740,
                  "src": "3750:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3737,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3919,
                    "src": "3750:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3749:52:38"
            },
            "scope": 3799,
            "src": "3557:245:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of takerAsset is sold by taker.\n @param orders Array of order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3753,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketSellOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3749,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3743,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3753,
                  "src": "4225:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3986_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3741,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3986,
                      "src": "4225:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3986_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3742,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4225:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3986_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3745,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3753,
                  "src": "4265:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3744,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4265:7:38",
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
                  "id": 3748,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3753,
                  "src": "4303:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3746,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "4303:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3747,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4303:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4215:119:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 3752,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3751,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3753,
                  "src": "4367:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3750,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3919,
                    "src": "4367:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4366:52:38"
            },
            "scope": 3799,
            "src": "4190:229:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of takerAsset is sold by taker.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3766,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketSellOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3762,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3756,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3766,
                  "src": "4918:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3986_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3754,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3986,
                      "src": "4918:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3986_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3755,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4918:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3986_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3758,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3766,
                  "src": "4958:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3757,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4958:7:38",
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
                  "id": 3761,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3766,
                  "src": "4996:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3759,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "4996:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3760,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4996:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4908:119:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 3765,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3764,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3766,
                  "src": "5060:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3763,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3919,
                    "src": "5060:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5059:52:38"
            },
            "scope": 3799,
            "src": "4876:236:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of makerAsset is bought by taker.\n @param orders Array of order specifications.\n @param makerAssetFillAmount Desired amount of makerAsset to buy.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3779,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketBuyOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3775,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3769,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3779,
                  "src": "5534:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3986_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3767,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3986,
                      "src": "5534:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3986_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3768,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5534:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3986_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3771,
                  "name": "makerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3779,
                  "src": "5574:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3770,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "5574:7:38",
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
                  "id": 3774,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3779,
                  "src": "5612:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3772,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "5612:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3773,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5612:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5524:119:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 3778,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3777,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3779,
                  "src": "5676:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3776,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3919,
                    "src": "5676:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5675:52:38"
            },
            "scope": 3799,
            "src": "5500:228:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple fill orders in a single transaction until total amount is bought by taker.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param makerAssetFillAmount Desired amount of makerAsset to buy.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 3792,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketBuyOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3788,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3782,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3792,
                  "src": "6230:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3986_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3780,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3986,
                      "src": "6230:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3986_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3781,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6230:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3986_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3784,
                  "name": "makerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3792,
                  "src": "6270:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3783,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6270:7:38",
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
                  "id": 3787,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 3792,
                  "src": "6308:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3785,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "6308:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 3786,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6308:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes_storage_$dyn_storage_ptr",
                      "typeString": "bytes[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6220:119:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 3791,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3790,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3792,
                  "src": "6372:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3789,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3919,
                    "src": "6372:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6371:52:38"
            },
            "scope": 3799,
            "src": "6189:235:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously cancels multiple orders in a single transaction.\n @param orders Array of order specifications.",
            "id": 3798,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchCancelOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3796,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3795,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 3798,
                  "src": "6586:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$3986_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 3793,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 3986,
                      "src": "6586:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3986_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 3794,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6586:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$3986_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6585:32:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 3797,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6632:0:38"
            },
            "scope": 3799,
            "src": "6559:74:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 3800,
        "src": "709:5926:38"
      }
    ],
    "src": "580:6056:38"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-08T01:11:15.200Z"
}