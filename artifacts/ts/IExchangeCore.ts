export const IExchangeCore = 
{
  "contractName": "IExchangeCore",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "targetOrderEpoch",
          "type": "uint256"
        }
      ],
      "name": "cancelOrdersUpTo",
      "outputs": [],
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
      "name": "fillOrder",
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
        }
      ],
      "name": "cancelOrder",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
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
        }
      ],
      "name": "getOrderInfo",
      "outputs": [
        {
          "components": [
            {
              "name": "orderStatus",
              "type": "uint8"
            },
            {
              "name": "orderHash",
              "type": "bytes32"
            },
            {
              "name": "orderTakerAssetFilledAmount",
              "type": "uint256"
            }
          ],
          "name": "orderInfo",
          "type": "tuple"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "/*\n\n  Copyright 2018 ZeroEx Intl.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity ^0.4.24;\npragma experimental ABIEncoderV2;\n\nimport \"../libs/LibOrder.sol\";\nimport \"../libs/LibFillResults.sol\";\n\ncontract IExchangeCore {\n\n    /// @dev Cancels all orders created by makerAddress with a salt less than or equal to the targetOrderEpoch\n    ///      and senderAddress equal to msg.sender (or null address if msg.sender == makerAddress).\n    /// @param targetOrderEpoch Orders created with a salt less or equal to this value will be cancelled.\n    function cancelOrdersUpTo(uint256 targetOrderEpoch)\n        external;\n\n    /// @dev Fills the input order.\n    /// @param order Order struct containing order specifications.\n    /// @param takerAssetFillAmount Desired amount of takerAsset to sell.\n    /// @param signature Proof that order has been created by maker.\n    /// @return Amounts filled and fees paid by maker and taker.\n    function fillOrder(\n        LibOrder.Order memory order,\n        uint256 takerAssetFillAmount,\n        bytes memory signature\n    )\n        public\n        returns (LibFillResults.FillResults memory fillResults);\n\n    /// @dev After calling, the order can not be filled anymore.\n    /// @param order Order struct containing order specifications.\n    function cancelOrder(LibOrder.Order memory order)\n        public;\n\n    /// @dev Gets information about an order: status, hash, and amount filled.\n    /// @param order Order to gather information on.\n    /// @return OrderInfo Information about the order and its state.\n    ///                   See LibOrder.OrderInfo for a complete description.\n    function getOrderInfo(LibOrder.Order memory order)\n        public\n        view\n        returns (LibOrder.OrderInfo memory orderInfo);\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchangeCore.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchangeCore.sol",
    "exportedSymbols": {
      "IExchangeCore": [
        3051
      ]
    },
    "id": 3052,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3019,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:21"
      },
      {
        "id": 3020,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:21"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../libs/LibOrder.sol",
        "id": 3021,
        "nodeType": "ImportDirective",
        "scope": 3052,
        "sourceUnit": 3355,
        "src": "640:30:21",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../libs/LibFillResults.sol",
        "id": 3022,
        "nodeType": "ImportDirective",
        "scope": 3052,
        "sourceUnit": 3288,
        "src": "671:36:21",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 3051,
        "linearizedBaseContracts": [
          3051
        ],
        "name": "IExchangeCore",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Cancels all orders created by makerAddress with a salt less than or equal to the targetOrderEpoch\n      and senderAddress equal to msg.sender (or null address if msg.sender == makerAddress).\n @param targetOrderEpoch Orders created with a salt less or equal to this value will be cancelled.",
            "id": 3027,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrdersUpTo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3025,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3024,
                  "name": "targetOrderEpoch",
                  "nodeType": "VariableDeclaration",
                  "scope": 3027,
                  "src": "1082:24:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3023,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1082:7:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1081:26:21"
            },
            "payable": false,
            "returnParameters": {
              "id": 3026,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1124:0:21"
            },
            "scope": 3051,
            "src": "1056:69:21",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Fills the input order.\n @param order Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.\n @return Amounts filled and fees paid by maker and taker.",
            "id": 3038,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3034,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3029,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 3038,
                  "src": "1470:27:21",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3028,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3346,
                    "src": "1470:14:21",
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
                  "id": 3031,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3038,
                  "src": "1507:28:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3030,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1507:7:21",
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
                  "id": 3033,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 3038,
                  "src": "1545:22:21",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3032,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1545:5:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1460:113:21"
            },
            "payable": false,
            "returnParameters": {
              "id": 3037,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3036,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3038,
                  "src": "1606:45:21",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3279_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3035,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3279,
                    "src": "1606:26:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3279_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1605:47:21"
            },
            "scope": 3051,
            "src": "1442:211:21",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev After calling, the order can not be filled anymore.\n @param order Order struct containing order specifications.",
            "id": 3043,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3041,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3040,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 3043,
                  "src": "1812:27:21",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3039,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3346,
                    "src": "1812:14:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1811:29:21"
            },
            "payable": false,
            "returnParameters": {
              "id": 3042,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1855:0:21"
            },
            "scope": 3051,
            "src": "1791:65:21",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Gets information about an order: status, hash, and amount filled.\n @param order Order to gather information on.\n @return OrderInfo Information about the order and its state.\n                   See LibOrder.OrderInfo for a complete description.",
            "id": 3050,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getOrderInfo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3046,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3045,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 3050,
                  "src": "2162:27:21",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3044,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3346,
                    "src": "2162:14:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2161:29:21"
            },
            "payable": false,
            "returnParameters": {
              "id": 3049,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3048,
                  "name": "orderInfo",
                  "nodeType": "VariableDeclaration",
                  "scope": 3050,
                  "src": "2236:35:21",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderInfo_$3353_memory_ptr",
                    "typeString": "struct LibOrder.OrderInfo"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3047,
                    "name": "LibOrder.OrderInfo",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3353,
                    "src": "2236:18:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderInfo_$3353_storage_ptr",
                      "typeString": "struct LibOrder.OrderInfo"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2235:37:21"
            },
            "scope": 3051,
            "src": "2140:133:21",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 3052,
        "src": "709:1566:21"
      }
    ],
    "src": "580:1696:21"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchangeCore.sol",
    "exportedSymbols": {
      "IExchangeCore": [
        3051
      ]
    },
    "id": 3052,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3019,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:21"
      },
      {
        "id": 3020,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:21"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../libs/LibOrder.sol",
        "id": 3021,
        "nodeType": "ImportDirective",
        "scope": 3052,
        "sourceUnit": 3355,
        "src": "640:30:21",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../libs/LibFillResults.sol",
        "id": 3022,
        "nodeType": "ImportDirective",
        "scope": 3052,
        "sourceUnit": 3288,
        "src": "671:36:21",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 3051,
        "linearizedBaseContracts": [
          3051
        ],
        "name": "IExchangeCore",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Cancels all orders created by makerAddress with a salt less than or equal to the targetOrderEpoch\n      and senderAddress equal to msg.sender (or null address if msg.sender == makerAddress).\n @param targetOrderEpoch Orders created with a salt less or equal to this value will be cancelled.",
            "id": 3027,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrdersUpTo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3025,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3024,
                  "name": "targetOrderEpoch",
                  "nodeType": "VariableDeclaration",
                  "scope": 3027,
                  "src": "1082:24:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3023,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1082:7:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1081:26:21"
            },
            "payable": false,
            "returnParameters": {
              "id": 3026,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1124:0:21"
            },
            "scope": 3051,
            "src": "1056:69:21",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Fills the input order.\n @param order Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.\n @return Amounts filled and fees paid by maker and taker.",
            "id": 3038,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3034,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3029,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 3038,
                  "src": "1470:27:21",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3028,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3346,
                    "src": "1470:14:21",
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
                  "id": 3031,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3038,
                  "src": "1507:28:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3030,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1507:7:21",
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
                  "id": 3033,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 3038,
                  "src": "1545:22:21",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3032,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1545:5:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1460:113:21"
            },
            "payable": false,
            "returnParameters": {
              "id": 3037,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3036,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3038,
                  "src": "1606:45:21",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3279_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3035,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3279,
                    "src": "1606:26:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3279_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1605:47:21"
            },
            "scope": 3051,
            "src": "1442:211:21",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev After calling, the order can not be filled anymore.\n @param order Order struct containing order specifications.",
            "id": 3043,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3041,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3040,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 3043,
                  "src": "1812:27:21",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3039,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3346,
                    "src": "1812:14:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1811:29:21"
            },
            "payable": false,
            "returnParameters": {
              "id": 3042,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1855:0:21"
            },
            "scope": 3051,
            "src": "1791:65:21",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Gets information about an order: status, hash, and amount filled.\n @param order Order to gather information on.\n @return OrderInfo Information about the order and its state.\n                   See LibOrder.OrderInfo for a complete description.",
            "id": 3050,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getOrderInfo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3046,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3045,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 3050,
                  "src": "2162:27:21",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3044,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3346,
                    "src": "2162:14:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2161:29:21"
            },
            "payable": false,
            "returnParameters": {
              "id": 3049,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3048,
                  "name": "orderInfo",
                  "nodeType": "VariableDeclaration",
                  "scope": 3050,
                  "src": "2236:35:21",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderInfo_$3353_memory_ptr",
                    "typeString": "struct LibOrder.OrderInfo"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3047,
                    "name": "LibOrder.OrderInfo",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3353,
                    "src": "2236:18:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderInfo_$3353_storage_ptr",
                      "typeString": "struct LibOrder.OrderInfo"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2235:37:21"
            },
            "scope": 3051,
            "src": "2140:133:21",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 3052,
        "src": "709:1566:21"
      }
    ],
    "src": "580:1696:21"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-08T05:31:02.866Z"
}