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
  "sourcePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchangeCore.sol",
  "ast": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchangeCore.sol",
    "exportedSymbols": {
      "IExchangeCore": [
        3929
      ]
    },
    "id": 3930,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3897,
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
        "id": 3898,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:32"
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../libs/LibOrder.sol",
        "id": 3899,
        "nodeType": "ImportDirective",
        "scope": 3930,
        "sourceUnit": 4342,
        "src": "640:30:32",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../libs/LibFillResults.sol",
        "id": 3900,
        "nodeType": "ImportDirective",
        "scope": 3930,
        "sourceUnit": 4275,
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
        "id": 3929,
        "linearizedBaseContracts": [
          3929
        ],
        "name": "IExchangeCore",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Cancels all orders created by makerAddress with a salt less than or equal to the targetOrderEpoch\n      and senderAddress equal to msg.sender (or null address if msg.sender == makerAddress).\n @param targetOrderEpoch Orders created with a salt less or equal to this value will be cancelled.",
            "id": 3905,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrdersUpTo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3903,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3902,
                  "name": "targetOrderEpoch",
                  "nodeType": "VariableDeclaration",
                  "scope": 3905,
                  "src": "1082:24:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3901,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1082:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1081:26:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 3904,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1124:0:32"
            },
            "scope": 3929,
            "src": "1056:69:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Fills the input order.\n @param order Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.\n @return Amounts filled and fees paid by maker and taker.",
            "id": 3916,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3912,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3907,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 3916,
                  "src": "1470:27:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4333_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3906,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4333,
                    "src": "1470:14:32",
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
                  "id": 3909,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3916,
                  "src": "1507:28:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3908,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1507:7:32",
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
                  "id": 3911,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 3916,
                  "src": "1545:22:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3910,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1545:5:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1460:113:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 3915,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3914,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3916,
                  "src": "1606:45:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3913,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4266,
                    "src": "1606:26:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1605:47:32"
            },
            "scope": 3929,
            "src": "1442:211:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev After calling, the order can not be filled anymore.\n @param order Order struct containing order specifications.",
            "id": 3921,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3919,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3918,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 3921,
                  "src": "1812:27:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4333_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3917,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4333,
                    "src": "1812:14:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1811:29:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 3920,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1855:0:32"
            },
            "scope": 3929,
            "src": "1791:65:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Gets information about an order: status, hash, and amount filled.\n @param order Order to gather information on.\n @return OrderInfo Information about the order and its state.\n                   See LibOrder.OrderInfo for a complete description.",
            "id": 3928,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getOrderInfo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3924,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3923,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 3928,
                  "src": "2162:27:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4333_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3922,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4333,
                    "src": "2162:14:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2161:29:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 3927,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3926,
                  "name": "orderInfo",
                  "nodeType": "VariableDeclaration",
                  "scope": 3928,
                  "src": "2236:35:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderInfo_$4340_memory_ptr",
                    "typeString": "struct LibOrder.OrderInfo"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3925,
                    "name": "LibOrder.OrderInfo",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4340,
                    "src": "2236:18:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderInfo_$4340_storage_ptr",
                      "typeString": "struct LibOrder.OrderInfo"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2235:37:32"
            },
            "scope": 3929,
            "src": "2140:133:32",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 3930,
        "src": "709:1566:32"
      }
    ],
    "src": "580:1696:32"
  },
  "legacyAST": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchangeCore.sol",
    "exportedSymbols": {
      "IExchangeCore": [
        3929
      ]
    },
    "id": 3930,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3897,
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
        "id": 3898,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:32"
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../libs/LibOrder.sol",
        "id": 3899,
        "nodeType": "ImportDirective",
        "scope": 3930,
        "sourceUnit": 4342,
        "src": "640:30:32",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../libs/LibFillResults.sol",
        "id": 3900,
        "nodeType": "ImportDirective",
        "scope": 3930,
        "sourceUnit": 4275,
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
        "id": 3929,
        "linearizedBaseContracts": [
          3929
        ],
        "name": "IExchangeCore",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Cancels all orders created by makerAddress with a salt less than or equal to the targetOrderEpoch\n      and senderAddress equal to msg.sender (or null address if msg.sender == makerAddress).\n @param targetOrderEpoch Orders created with a salt less or equal to this value will be cancelled.",
            "id": 3905,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrdersUpTo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3903,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3902,
                  "name": "targetOrderEpoch",
                  "nodeType": "VariableDeclaration",
                  "scope": 3905,
                  "src": "1082:24:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3901,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1082:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1081:26:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 3904,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1124:0:32"
            },
            "scope": 3929,
            "src": "1056:69:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Fills the input order.\n @param order Order struct containing order specifications.\n @param takerAssetFillAmount Desired amount of takerAsset to sell.\n @param signature Proof that order has been created by maker.\n @return Amounts filled and fees paid by maker and taker.",
            "id": 3916,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3912,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3907,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 3916,
                  "src": "1470:27:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4333_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3906,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4333,
                    "src": "1470:14:32",
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
                  "id": 3909,
                  "name": "takerAssetFillAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3916,
                  "src": "1507:28:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3908,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1507:7:32",
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
                  "id": 3911,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 3916,
                  "src": "1545:22:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3910,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1545:5:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1460:113:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 3915,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3914,
                  "name": "fillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 3916,
                  "src": "1606:45:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3913,
                    "name": "LibFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4266,
                    "src": "1606:26:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1605:47:32"
            },
            "scope": 3929,
            "src": "1442:211:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev After calling, the order can not be filled anymore.\n @param order Order struct containing order specifications.",
            "id": 3921,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3919,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3918,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 3921,
                  "src": "1812:27:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4333_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3917,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4333,
                    "src": "1812:14:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1811:29:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 3920,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1855:0:32"
            },
            "scope": 3929,
            "src": "1791:65:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Gets information about an order: status, hash, and amount filled.\n @param order Order to gather information on.\n @return OrderInfo Information about the order and its state.\n                   See LibOrder.OrderInfo for a complete description.",
            "id": 3928,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getOrderInfo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3924,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3923,
                  "name": "order",
                  "nodeType": "VariableDeclaration",
                  "scope": 3928,
                  "src": "2162:27:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4333_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3922,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4333,
                    "src": "2162:14:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2161:29:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 3927,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3926,
                  "name": "orderInfo",
                  "nodeType": "VariableDeclaration",
                  "scope": 3928,
                  "src": "2236:35:32",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderInfo_$4340_memory_ptr",
                    "typeString": "struct LibOrder.OrderInfo"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 3925,
                    "name": "LibOrder.OrderInfo",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4340,
                    "src": "2236:18:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderInfo_$4340_storage_ptr",
                      "typeString": "struct LibOrder.OrderInfo"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2235:37:32"
            },
            "scope": 3929,
            "src": "2140:133:32",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 3930,
        "src": "709:1566:32"
      }
    ],
    "src": "580:1696:32"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-13T21:55:38.416Z"
}