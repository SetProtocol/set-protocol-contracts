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
        4231
      ]
    },
    "id": 4232,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4199,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:33"
      },
      {
        "id": 4200,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:33"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../libs/LibOrder.sol",
        "id": 4201,
        "nodeType": "ImportDirective",
        "scope": 4232,
        "sourceUnit": 4644,
        "src": "640:30:33",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../libs/LibFillResults.sol",
        "id": 4202,
        "nodeType": "ImportDirective",
        "scope": 4232,
        "sourceUnit": 4577,
        "src": "671:36:33",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4231,
        "linearizedBaseContracts": [
          4231
        ],
        "name": "IExchangeCore",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Cancels all orders created by makerAddress with a salt less than or equal to the targetOrderEpoch\n      and senderAddress equal to msg.sender (or null address if msg.sender == makerAddress).\n @param targetOrderEpoch Orders created with a salt less or equal to this value will be cancelled.",
            "id": 4207,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrdersUpTo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4205,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4204,
                  "name": "targetOrderEpoch",
                  "nodeType": "VariableDeclaration",
                  "scope": 4207,
                  "src": "1082:24:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4203,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1082:7:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1081:26:33"
            },
            "payable": false,
            "returnParameters": {
              "id": 4206,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1124:0:33"
            },
            "scope": 4231,
            "src": "1056:69:33",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Fills the input order.\n @param order Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.\n @return Amounts filled and fees paid by maker and taker.",
            "id": 4218,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4214,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4209,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4218,
                  "src": "1470:27:33",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4208,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4635,
                    "src": "1470:14:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4635_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4211,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4218,
                  "src": "1507:28:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4210,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1507:7:33",
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
                  "id": 4213,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4218,
                  "src": "1545:22:33",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4212,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1545:5:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1460:113:33"
            },
            "payable": false,
            "returnParameters": {
              "id": 4217,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4216,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4218,
                  "src": "1606:45:33",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4568_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4215,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4568,
                    "src": "1606:26:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4568_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1605:47:33"
            },
            "scope": 4231,
            "src": "1442:211:33",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev After calling, the order can not be filled anymore.\n @param order Order struct containing order specifications.",
            "id": 4223,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4221,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4220,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4223,
                  "src": "1812:27:33",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4219,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4635,
                    "src": "1812:14:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4635_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1811:29:33"
            },
            "payable": false,
            "returnParameters": {
              "id": 4222,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1855:0:33"
            },
            "scope": 4231,
            "src": "1791:65:33",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Gets information about an order: status, hash, and amount filled.\n @param order Order to gather information on.\n @return OrderInfo Information about the order and its state.\n                   See LibOrder.OrderInfo for a complete description.",
            "id": 4230,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getOrderInfo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4226,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4225,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4230,
                  "src": "2162:27:33",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4224,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4635,
                    "src": "2162:14:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4635_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2161:29:33"
            },
            "payable": false,
            "returnParameters": {
              "id": 4229,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4228,
                  "name": "orderInfo",
                  "nodeType": "VariableDeclaration",
                  "scope": 4230,
                  "src": "2236:35:33",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderInfo_$4642_memory_ptr",
                    "typeString": "struct LibOrder.OrderInfo"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4227,
                    "name": "LibOrder.OrderInfo",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4642,
                    "src": "2236:18:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderInfo_$4642_storage_ptr",
                      "typeString": "struct LibOrder.OrderInfo"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2235:37:33"
            },
            "scope": 4231,
            "src": "2140:133:33",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 4232,
        "src": "709:1566:33"
      }
    ],
    "src": "580:1696:33"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchangeCore.sol",
    "exportedSymbols": {
      "IExchangeCore": [
        4231
      ]
    },
    "id": 4232,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4199,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:33"
      },
      {
        "id": 4200,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:33"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../libs/LibOrder.sol",
        "id": 4201,
        "nodeType": "ImportDirective",
        "scope": 4232,
        "sourceUnit": 4644,
        "src": "640:30:33",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../libs/LibFillResults.sol",
        "id": 4202,
        "nodeType": "ImportDirective",
        "scope": 4232,
        "sourceUnit": 4577,
        "src": "671:36:33",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4231,
        "linearizedBaseContracts": [
          4231
        ],
        "name": "IExchangeCore",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Cancels all orders created by makerAddress with a salt less than or equal to the targetOrderEpoch\n      and senderAddress equal to msg.sender (or null address if msg.sender == makerAddress).\n @param targetOrderEpoch Orders created with a salt less or equal to this value will be cancelled.",
            "id": 4207,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrdersUpTo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4205,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4204,
                  "name": "targetOrderEpoch",
                  "nodeType": "VariableDeclaration",
                  "scope": 4207,
                  "src": "1082:24:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4203,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1082:7:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1081:26:33"
            },
            "payable": false,
            "returnParameters": {
              "id": 4206,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1124:0:33"
            },
            "scope": 4231,
            "src": "1056:69:33",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Fills the input order.\n @param order Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.\n @return Amounts filled and fees paid by maker and taker.",
            "id": 4218,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4214,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4209,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4218,
                  "src": "1470:27:33",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4208,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4635,
                    "src": "1470:14:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4635_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4211,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4218,
                  "src": "1507:28:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4210,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1507:7:33",
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
                  "id": 4213,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4218,
                  "src": "1545:22:33",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4212,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1545:5:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1460:113:33"
            },
            "payable": false,
            "returnParameters": {
              "id": 4217,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4216,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4218,
                  "src": "1606:45:33",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4568_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4215,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4568,
                    "src": "1606:26:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4568_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1605:47:33"
            },
            "scope": 4231,
            "src": "1442:211:33",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev After calling, the order can not be filled anymore.\n @param order Order struct containing order specifications.",
            "id": 4223,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4221,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4220,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4223,
                  "src": "1812:27:33",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4219,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4635,
                    "src": "1812:14:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4635_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1811:29:33"
            },
            "payable": false,
            "returnParameters": {
              "id": 4222,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1855:0:33"
            },
            "scope": 4231,
            "src": "1791:65:33",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Gets information about an order: status, hash, and amount filled.\n @param order Order to gather information on.\n @return OrderInfo Information about the order and its state.\n                   See LibOrder.OrderInfo for a complete description.",
            "id": 4230,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getOrderInfo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4226,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4225,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 4230,
                  "src": "2162:27:33",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4224,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4635,
                    "src": "2162:14:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4635_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2161:29:33"
            },
            "payable": false,
            "returnParameters": {
              "id": 4229,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4228,
                  "name": "orderInfo",
                  "nodeType": "VariableDeclaration",
                  "scope": 4230,
                  "src": "2236:35:33",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderInfo_$4642_memory_ptr",
                    "typeString": "struct LibOrder.OrderInfo"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4227,
                    "name": "LibOrder.OrderInfo",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4642,
                    "src": "2236:18:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderInfo_$4642_storage_ptr",
                      "typeString": "struct LibOrder.OrderInfo"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2235:37:33"
            },
            "scope": 4231,
            "src": "2140:133:33",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 4232,
        "src": "709:1566:33"
      }
    ],
    "src": "580:1696:33"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-27T04:20:39.826Z"
}