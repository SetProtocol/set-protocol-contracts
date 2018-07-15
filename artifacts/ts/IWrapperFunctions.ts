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
  "sourcePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IWrapperFunctions.sol",
  "ast": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IWrapperFunctions.sol",
    "exportedSymbols": {
      "IWrapperFunctions": [
        4146
      ]
    },
    "id": 4147,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4020,
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
        "id": 4021,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:38"
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../libs/LibOrder.sol",
        "id": 4022,
        "nodeType": "ImportDirective",
        "scope": 4147,
        "sourceUnit": 4342,
        "src": "640:30:38",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../libs/LibFillResults.sol",
        "id": 4023,
        "nodeType": "ImportDirective",
        "scope": 4147,
        "sourceUnit": 4275,
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
        "id": 4146,
        "linearizedBaseContracts": [
          4146
        ],
        "name": "IWrapperFunctions",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Fills the input order. Reverts if exact takerAssetFillAmount not filled.\n @param order LibOrder.Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.",
            "id": 4034,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrKillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4030,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4025,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4034,
                  "src": "1081:27:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4333_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4024,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4333,
                    "src": "1081:14:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4027,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4034,
                  "src": "1118:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4026,
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
                  "id": 4029,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4034,
                  "src": "1156:22:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4028,
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
              "id": 4033,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4032,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4034,
                  "src": "1217:45:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4031,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4266,
                    "src": "1217:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1216:47:38"
            },
            "scope": 4146,
            "src": "1047:217:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Fills an order with specified parameters and ECDSA signature.\n      Returns false if the transaction would otherwise revert.\n @param order LibOrder.Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.\n @return Amounts filled and fees paid by maker and taker.",
            "id": 4045,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrderNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4041,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4036,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4045,
                  "src": "1734:27:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4333_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4035,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4333,
                    "src": "1734:14:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4038,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4045,
                  "src": "1771:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4037,
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
                  "id": 4040,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4045,
                  "src": "1809:22:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4039,
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
              "id": 4044,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4043,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4045,
                  "src": "1870:45:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4042,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4266,
                    "src": "1870:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1869:47:38"
            },
            "scope": 4146,
            "src": "1699:218:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4059,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4055,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4048,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4059,
                  "src": "2310:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4333_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4046,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4333,
                      "src": "2310:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4047,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2310:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4333_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4051,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4059,
                  "src": "2350:38:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4049,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2350:7:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4050,
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
                  "id": 4054,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4059,
                  "src": "2398:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4052,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "2398:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4053,
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
              "id": 4058,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4057,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4059,
                  "src": "2462:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4056,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4266,
                    "src": "2462:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2461:52:38"
            },
            "scope": 4146,
            "src": "2276:238:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrKill.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4073,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrKillOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4069,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4062,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4073,
                  "src": "2914:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4333_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4060,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4333,
                      "src": "2914:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4061,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2914:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4333_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4065,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4073,
                  "src": "2954:38:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4063,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2954:7:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4064,
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
                  "id": 4068,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4073,
                  "src": "3002:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4066,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "3002:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4067,
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
              "id": 4072,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4071,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4073,
                  "src": "3066:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4070,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4266,
                    "src": "3066:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3065:52:38"
            },
            "scope": 4146,
            "src": "2874:244:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Fills an order with specified parameters and ECDSA signature.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4087,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4083,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4076,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4087,
                  "src": "3598:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4333_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4074,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4333,
                      "src": "3598:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4075,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3598:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4333_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4079,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4087,
                  "src": "3638:38:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4077,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3638:7:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4078,
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
                  "id": 4082,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4087,
                  "src": "3686:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4080,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "3686:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4081,
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
              "id": 4086,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4085,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4087,
                  "src": "3750:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4084,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4266,
                    "src": "3750:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3749:52:38"
            },
            "scope": 4146,
            "src": "3557:245:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of takerAsset is sold by taker.\n @param orders Array of order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4100,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketSellOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4096,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4090,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4100,
                  "src": "4225:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4333_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4088,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4333,
                      "src": "4225:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4089,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4225:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4333_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4092,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4100,
                  "src": "4265:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4091,
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
                  "id": 4095,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4100,
                  "src": "4303:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4093,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "4303:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4094,
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
              "id": 4099,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4098,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4100,
                  "src": "4367:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4097,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4266,
                    "src": "4367:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4366:52:38"
            },
            "scope": 4146,
            "src": "4190:229:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of takerAsset is sold by taker.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4113,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketSellOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4109,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4103,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4113,
                  "src": "4918:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4333_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4101,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4333,
                      "src": "4918:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4102,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4918:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4333_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4105,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4113,
                  "src": "4958:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4104,
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
                  "id": 4108,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4113,
                  "src": "4996:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4106,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "4996:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4107,
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
              "id": 4112,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4111,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4113,
                  "src": "5060:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4110,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4266,
                    "src": "5060:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5059:52:38"
            },
            "scope": 4146,
            "src": "4876:236:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of makerAsset is bought by taker.\n @param orders Array of order specifications.\n @param makerAssetFillAmount Desired amount of makerAsset to buy.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4126,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketBuyOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4122,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4116,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4126,
                  "src": "5534:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4333_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4114,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4333,
                      "src": "5534:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4115,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5534:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4333_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4118,
                  "name": "makerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4126,
                  "src": "5574:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4117,
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
                  "id": 4121,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4126,
                  "src": "5612:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4119,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "5612:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4120,
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
              "id": 4125,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4124,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4126,
                  "src": "5676:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4123,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4266,
                    "src": "5676:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5675:52:38"
            },
            "scope": 4146,
            "src": "5500:228:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple fill orders in a single transaction until total amount is bought by taker.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param makerAssetFillAmount Desired amount of makerAsset to buy.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4139,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketBuyOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4135,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4129,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4139,
                  "src": "6230:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4333_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4127,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4333,
                      "src": "6230:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4128,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6230:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4333_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4131,
                  "name": "makerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4139,
                  "src": "6270:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4130,
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
                  "id": 4134,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4139,
                  "src": "6308:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4132,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "6308:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4133,
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
              "id": 4138,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4137,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4139,
                  "src": "6372:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4136,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4266,
                    "src": "6372:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6371:52:38"
            },
            "scope": 4146,
            "src": "6189:235:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously cancels multiple orders in a single transaction.\n @param orders Array of order specifications.",
            "id": 4145,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchCancelOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4143,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4142,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4145,
                  "src": "6586:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4333_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4140,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4333,
                      "src": "6586:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4141,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6586:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4333_storage_$dyn_storage_ptr",
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
              "id": 4144,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6632:0:38"
            },
            "scope": 4146,
            "src": "6559:74:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 4147,
        "src": "709:5926:38"
      }
    ],
    "src": "580:6056:38"
  },
  "legacyAST": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IWrapperFunctions.sol",
    "exportedSymbols": {
      "IWrapperFunctions": [
        4146
      ]
    },
    "id": 4147,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4020,
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
        "id": 4021,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:38"
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../libs/LibOrder.sol",
        "id": 4022,
        "nodeType": "ImportDirective",
        "scope": 4147,
        "sourceUnit": 4342,
        "src": "640:30:38",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../libs/LibFillResults.sol",
        "id": 4023,
        "nodeType": "ImportDirective",
        "scope": 4147,
        "sourceUnit": 4275,
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
        "id": 4146,
        "linearizedBaseContracts": [
          4146
        ],
        "name": "IWrapperFunctions",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Fills the input order. Reverts if exact takerAssetFillAmount not filled.\n @param order LibOrder.Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.",
            "id": 4034,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrKillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4030,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4025,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4034,
                  "src": "1081:27:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4333_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4024,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4333,
                    "src": "1081:14:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4027,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4034,
                  "src": "1118:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4026,
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
                  "id": 4029,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4034,
                  "src": "1156:22:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4028,
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
              "id": 4033,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4032,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4034,
                  "src": "1217:45:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4031,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4266,
                    "src": "1217:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1216:47:38"
            },
            "scope": 4146,
            "src": "1047:217:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Fills an order with specified parameters and ECDSA signature.\n      Returns false if the transaction would otherwise revert.\n @param order LibOrder.Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.\n @return Amounts filled and fees paid by maker and taker.",
            "id": 4045,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrderNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4041,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4036,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4045,
                  "src": "1734:27:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4333_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4035,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4333,
                    "src": "1734:14:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4038,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4045,
                  "src": "1771:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4037,
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
                  "id": 4040,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4045,
                  "src": "1809:22:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4039,
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
              "id": 4044,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4043,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4045,
                  "src": "1870:45:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4042,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4266,
                    "src": "1870:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1869:47:38"
            },
            "scope": 4146,
            "src": "1699:218:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4059,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4055,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4048,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4059,
                  "src": "2310:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4333_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4046,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4333,
                      "src": "2310:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4047,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2310:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4333_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4051,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4059,
                  "src": "2350:38:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4049,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2350:7:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4050,
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
                  "id": 4054,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4059,
                  "src": "2398:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4052,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "2398:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4053,
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
              "id": 4058,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4057,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4059,
                  "src": "2462:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4056,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4266,
                    "src": "2462:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2461:52:38"
            },
            "scope": 4146,
            "src": "2276:238:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrKill.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4073,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrKillOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4069,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4062,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4073,
                  "src": "2914:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4333_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4060,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4333,
                      "src": "2914:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4061,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2914:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4333_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4065,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4073,
                  "src": "2954:38:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4063,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2954:7:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4064,
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
                  "id": 4068,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4073,
                  "src": "3002:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4066,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "3002:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4067,
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
              "id": 4072,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4071,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4073,
                  "src": "3066:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4070,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4266,
                    "src": "3066:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3065:52:38"
            },
            "scope": 4146,
            "src": "2874:244:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Fills an order with specified parameters and ECDSA signature.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param takerAssetFillAmounts Array of desired amounts of takerAsset to sell in orders.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4087,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchFillOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4083,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4076,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4087,
                  "src": "3598:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4333_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4074,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4333,
                      "src": "3598:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4075,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3598:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4333_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4079,
                  "name": "takerAssetFillAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4087,
                  "src": "3638:38:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4077,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3638:7:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4078,
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
                  "id": 4082,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4087,
                  "src": "3686:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4080,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "3686:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4081,
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
              "id": 4086,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4085,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4087,
                  "src": "3750:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4084,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4266,
                    "src": "3750:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3749:52:38"
            },
            "scope": 4146,
            "src": "3557:245:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of takerAsset is sold by taker.\n @param orders Array of order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signatures Proofs that orders have been created by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4100,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketSellOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4096,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4090,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4100,
                  "src": "4225:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4333_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4088,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4333,
                      "src": "4225:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4089,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4225:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4333_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4092,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4100,
                  "src": "4265:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4091,
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
                  "id": 4095,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4100,
                  "src": "4303:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4093,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "4303:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4094,
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
              "id": 4099,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4098,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4100,
                  "src": "4367:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4097,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4266,
                    "src": "4367:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4366:52:38"
            },
            "scope": 4146,
            "src": "4190:229:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of takerAsset is sold by taker.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4113,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketSellOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4109,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4103,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4113,
                  "src": "4918:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4333_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4101,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4333,
                      "src": "4918:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4102,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4918:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4333_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4105,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4113,
                  "src": "4958:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4104,
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
                  "id": 4108,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4113,
                  "src": "4996:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4106,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "4996:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4107,
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
              "id": 4112,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4111,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4113,
                  "src": "5060:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4110,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4266,
                    "src": "5060:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5059:52:38"
            },
            "scope": 4146,
            "src": "4876:236:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple calls of fillOrder until total amount of makerAsset is bought by taker.\n @param orders Array of order specifications.\n @param makerAssetFillAmount Desired amount of makerAsset to buy.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4126,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketBuyOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4122,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4116,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4126,
                  "src": "5534:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4333_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4114,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4333,
                      "src": "5534:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4115,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5534:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4333_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4118,
                  "name": "makerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4126,
                  "src": "5574:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4117,
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
                  "id": 4121,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4126,
                  "src": "5612:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4119,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "5612:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4120,
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
              "id": 4125,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4124,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4126,
                  "src": "5676:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4123,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4266,
                    "src": "5676:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5675:52:38"
            },
            "scope": 4146,
            "src": "5500:228:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously executes multiple fill orders in a single transaction until total amount is bought by taker.\n      Returns false if the transaction would otherwise revert.\n @param orders Array of order specifications.\n @param makerAssetFillAmount Desired amount of makerAsset to buy.\n @param signatures Proofs that orders have been signed by makers.\n @return Amounts filled and fees paid by makers and taker.",
            "id": 4139,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "marketBuyOrdersNoThrow",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4135,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4129,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4139,
                  "src": "6230:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4333_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4127,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4333,
                      "src": "6230:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4128,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6230:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4333_storage_$dyn_storage_ptr",
                      "typeString": "struct LibOrder.Order[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4131,
                  "name": "makerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4139,
                  "src": "6270:28:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4130,
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
                  "id": 4134,
                  "name": "signatures",
                  "nodeType": "VariableDeclaration",
                  "scope": 4139,
                  "src": "6308:25:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes_memory_$dyn_memory_ptr",
                    "typeString": "bytes[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4132,
                      "name": "bytes",
                      "nodeType": "ElementaryTypeName",
                      "src": "6308:5:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_storage_ptr",
                        "typeString": "bytes"
                      }
                    },
                    "id": 4133,
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
              "id": 4138,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4137,
                  "name": "totalFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4139,
                  "src": "6372:50:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4136,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4266,
                    "src": "6372:26:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6371:52:38"
            },
            "scope": 4146,
            "src": "6189:235:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Synchronously cancels multiple orders in a single transaction.\n @param orders Array of order specifications.",
            "id": 4145,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchCancelOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4143,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4142,
                  "name": "orders",
                  "nodeType": "VariableDeclaration",
                  "scope": 4145,
                  "src": "6586:30:38",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_struct$_Order_$4333_memory_$dyn_memory_ptr",
                    "typeString": "struct LibOrder.Order[]"
                  },
                  "typeName": {
                    "baseType": {
                      "contractScope": null,
                      "id": 4140,
                      "name": "LibOrder.Order",
                      "nodeType": "UserDefinedTypeName",
                      "referencedDeclaration": 4333,
                      "src": "6586:14:38",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                        "typeString": "struct LibOrder.Order"
                      }
                    },
                    "id": 4141,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6586:16:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Order_$4333_storage_$dyn_storage_ptr",
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
              "id": 4144,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6632:0:38"
            },
            "scope": 4146,
            "src": "6559:74:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 4147,
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
  "updatedAt": "2018-07-13T21:55:38.417Z"
}