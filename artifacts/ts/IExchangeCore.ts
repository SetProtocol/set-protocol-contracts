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
        4029
      ]
    },
    "id": 4030,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3997,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:24"
      },
      {
        "id": 3998,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:24"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../libs/LibOrder.sol",
        "id": 3999,
        "nodeType": "ImportDirective",
        "scope": 4030,
        "sourceUnit": 4333,
        "src": "640:30:24",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../libs/LibFillResults.sol",
        "id": 4000,
        "nodeType": "ImportDirective",
        "scope": 4030,
        "sourceUnit": 4266,
        "src": "671:36:24",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4029,
        "linearizedBaseContracts": [
          4029
        ],
        "name": "IExchangeCore",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Cancels all orders created by makerAddress with a salt less than or equal to the targetOrderEpoch\n      and senderAddress equal to msg.sender (or null address if msg.sender == makerAddress).\n @param targetOrderEpoch Orders created with a salt less or equal to this value will be cancelled.",
            "id": 4005,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrdersUpTo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4003,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4002,
                  "name": "targetOrderEpoch",
                  "nodeType": "VariableDeclaration",
                  "scope": 4005,
                  "src": "1082:24:24",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4001,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1082:7:24",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1081:26:24"
            },
            "payable": false,
            "returnParameters": {
              "id": 4004,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1124:0:24"
            },
            "scope": 4029,
            "src": "1056:69:24",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Fills the input order.\n @param order Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.\n @return Amounts filled and fees paid by maker and taker.",
            "id": 4016,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4012,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4007,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4016,
                  "src": "1470:27:24",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4324_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4006,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4324,
                    "src": "1470:14:24",
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
                  "id": 4009,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4016,
                  "src": "1507:28:24",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4008,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1507:7:24",
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
                  "id": 4011,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4016,
                  "src": "1545:22:24",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4010,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1545:5:24",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1460:113:24"
            },
            "payable": false,
            "returnParameters": {
              "id": 4015,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4014,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4016,
                  "src": "1606:45:24",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4013,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4257,
                    "src": "1606:26:24",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1605:47:24"
            },
            "scope": 4029,
            "src": "1442:211:24",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev After calling, the order can not be filled anymore.\n @param order Order struct containing order specifications.",
            "id": 4021,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4019,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4018,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4021,
                  "src": "1812:27:24",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4324_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4017,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4324,
                    "src": "1812:14:24",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1811:29:24"
            },
            "payable": false,
            "returnParameters": {
              "id": 4020,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1855:0:24"
            },
            "scope": 4029,
            "src": "1791:65:24",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Gets information about an order: status, hash, and amount filled.\n @param order Order to gather information on.\n @return OrderInfo Information about the order and its state.\n                   See LibOrder.OrderInfo for a complete description.",
            "id": 4028,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getOrderInfo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4024,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4023,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4028,
                  "src": "2162:27:24",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4324_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4022,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4324,
                    "src": "2162:14:24",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2161:29:24"
            },
            "payable": false,
            "returnParameters": {
              "id": 4027,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4026,
                  "name": "orderInfo",
                  "nodeType": "VariableDeclaration",
                  "scope": 4028,
                  "src": "2236:35:24",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderInfo_$4331_memory_ptr",
                    "typeString": "struct LibOrder.OrderInfo"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4025,
                    "name": "LibOrder.OrderInfo",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4331,
                    "src": "2236:18:24",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderInfo_$4331_storage_ptr",
                      "typeString": "struct LibOrder.OrderInfo"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2235:37:24"
            },
            "scope": 4029,
            "src": "2140:133:24",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 4030,
        "src": "709:1566:24"
      }
    ],
    "src": "580:1696:24"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchangeCore.sol",
    "exportedSymbols": {
      "IExchangeCore": [
        4029
      ]
    },
    "id": 4030,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3997,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:24"
      },
      {
        "id": 3998,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:24"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../libs/LibOrder.sol",
        "id": 3999,
        "nodeType": "ImportDirective",
        "scope": 4030,
        "sourceUnit": 4333,
        "src": "640:30:24",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../libs/LibFillResults.sol",
        "id": 4000,
        "nodeType": "ImportDirective",
        "scope": 4030,
        "sourceUnit": 4266,
        "src": "671:36:24",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4029,
        "linearizedBaseContracts": [
          4029
        ],
        "name": "IExchangeCore",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Cancels all orders created by makerAddress with a salt less than or equal to the targetOrderEpoch\n      and senderAddress equal to msg.sender (or null address if msg.sender == makerAddress).\n @param targetOrderEpoch Orders created with a salt less or equal to this value will be cancelled.",
            "id": 4005,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrdersUpTo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4003,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4002,
                  "name": "targetOrderEpoch",
                  "nodeType": "VariableDeclaration",
                  "scope": 4005,
                  "src": "1082:24:24",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4001,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1082:7:24",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1081:26:24"
            },
            "payable": false,
            "returnParameters": {
              "id": 4004,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1124:0:24"
            },
            "scope": 4029,
            "src": "1056:69:24",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Fills the input order.\n @param order Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.\n @return Amounts filled and fees paid by maker and taker.",
            "id": 4016,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4012,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4007,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4016,
                  "src": "1470:27:24",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4324_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4006,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4324,
                    "src": "1470:14:24",
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
                  "id": 4009,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4016,
                  "src": "1507:28:24",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4008,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1507:7:24",
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
                  "id": 4011,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4016,
                  "src": "1545:22:24",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4010,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1545:5:24",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1460:113:24"
            },
            "payable": false,
            "returnParameters": {
              "id": 4015,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4014,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4016,
                  "src": "1606:45:24",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4013,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4257,
                    "src": "1606:26:24",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1605:47:24"
            },
            "scope": 4029,
            "src": "1442:211:24",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev After calling, the order can not be filled anymore.\n @param order Order struct containing order specifications.",
            "id": 4021,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4019,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4018,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4021,
                  "src": "1812:27:24",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4324_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4017,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4324,
                    "src": "1812:14:24",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1811:29:24"
            },
            "payable": false,
            "returnParameters": {
              "id": 4020,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1855:0:24"
            },
            "scope": 4029,
            "src": "1791:65:24",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Gets information about an order: status, hash, and amount filled.\n @param order Order to gather information on.\n @return OrderInfo Information about the order and its state.\n                   See LibOrder.OrderInfo for a complete description.",
            "id": 4028,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getOrderInfo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4024,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4023,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4028,
                  "src": "2162:27:24",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4324_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4022,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4324,
                    "src": "2162:14:24",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4324_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2161:29:24"
            },
            "payable": false,
            "returnParameters": {
              "id": 4027,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4026,
                  "name": "orderInfo",
                  "nodeType": "VariableDeclaration",
                  "scope": 4028,
                  "src": "2236:35:24",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderInfo_$4331_memory_ptr",
                    "typeString": "struct LibOrder.OrderInfo"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4025,
                    "name": "LibOrder.OrderInfo",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4331,
                    "src": "2236:18:24",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderInfo_$4331_storage_ptr",
                      "typeString": "struct LibOrder.OrderInfo"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2235:37:24"
            },
            "scope": 4029,
            "src": "2140:133:24",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 4030,
        "src": "709:1566:24"
      }
    ],
    "src": "580:1696:24"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-23T23:58:05.598Z"
}