export const IMatchOrders = 
{
  "contractName": "IMatchOrders",
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
          "name": "leftOrder",
          "type": "tuple"
        },
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
          "name": "rightOrder",
          "type": "tuple"
        },
        {
          "name": "leftSignature",
          "type": "bytes"
        },
        {
          "name": "rightSignature",
          "type": "bytes"
        }
      ],
      "name": "matchOrders",
      "outputs": [
        {
          "components": [
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
              "name": "left",
              "type": "tuple"
            },
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
              "name": "right",
              "type": "tuple"
            },
            {
              "name": "leftMakerAssetSpreadAmount",
              "type": "uint256"
            }
          ],
          "name": "matchedFillResults",
          "type": "tuple"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "/*\n\n  Copyright 2018 ZeroEx Intl.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\npragma solidity ^0.4.24;\npragma experimental ABIEncoderV2;\n\nimport \"../libs/LibOrder.sol\";\nimport \"../libs/LibFillResults.sol\";\n\ncontract IMatchOrders {\n\n    /// @dev Match two complementary orders that have a profitable spread.\n    ///      Each order is filled at their respective price point. However, the calculations are\n    ///      carried out as though the orders are both being filled at the right order's price point.\n    ///      The profit made by the left order goes to the taker (who matched the two orders).\n    /// @param leftOrder First order to match.\n    /// @param rightOrder Second order to match.\n    /// @param leftSignature Proof that order was created by the left maker.\n    /// @param rightSignature Proof that order was created by the right maker.\n    /// @return matchedFillResults Amounts filled and fees paid by maker and taker of matched orders.\n    /// TODO: Make this function external once supported by Solidity (See Solidity Issues #3199, #1603)\n    function matchOrders(\n        LibOrder.Order memory leftOrder,\n        LibOrder.Order memory rightOrder,\n        bytes memory leftSignature,\n        bytes memory rightSignature\n    )\n        public\n        returns (LibFillResults.MatchedFillResults memory matchedFillResults);\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IMatchOrders.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IMatchOrders.sol",
    "exportedSymbols": {
      "IMatchOrders": [
        4208
      ]
    },
    "id": 4209,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4191,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "579:24:29"
      },
      {
        "id": 4192,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "604:33:29"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../libs/LibOrder.sol",
        "id": 4193,
        "nodeType": "ImportDirective",
        "scope": 4209,
        "sourceUnit": 4493,
        "src": "639:30:29",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../libs/LibFillResults.sol",
        "id": 4194,
        "nodeType": "ImportDirective",
        "scope": 4209,
        "sourceUnit": 4426,
        "src": "670:36:29",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4208,
        "linearizedBaseContracts": [
          4208
        ],
        "name": "IMatchOrders",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Match two complementary orders that have a profitable spread.\n      Each order is filled at their respective price point. However, the calculations are\n      carried out as though the orders are both being filled at the right order's price point.\n      The profit made by the left order goes to the taker (who matched the two orders).\n @param leftOrder First order to match.\n @param rightOrder Second order to match.\n @param leftSignature Proof that order was created by the left maker.\n @param rightSignature Proof that order was created by the right maker.\n @return matchedFillResults Amounts filled and fees paid by maker and taker of matched orders.\n TODO: Make this function external once supported by Solidity (See Solidity Issues #3199, #1603)",
            "id": 4207,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "matchOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4203,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4196,
                  "name": "leftOrder",
                  "nodeType": "VariableDeclaration",
                  "scope": 4207,
                  "src": "1594:31:29",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4484_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4195,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4484,
                    "src": "1594:14:29",
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
                  "id": 4198,
                  "name": "rightOrder",
                  "nodeType": "VariableDeclaration",
                  "scope": 4207,
                  "src": "1635:32:29",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4484_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4197,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4484,
                    "src": "1635:14:29",
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
                  "id": 4200,
                  "name": "leftSignature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4207,
                  "src": "1677:26:29",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4199,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1677:5:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4202,
                  "name": "rightSignature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4207,
                  "src": "1713:27:29",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4201,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1713:5:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1584:162:29"
            },
            "payable": false,
            "returnParameters": {
              "id": 4206,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4205,
                  "name": "matchedFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4207,
                  "src": "1779:59:29",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_MatchedFillResults_$4424_memory_ptr",
                    "typeString": "struct LibFillResults.MatchedFillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4204,
                    "name": "LibFillResults.MatchedFillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4424,
                    "src": "1779:33:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_MatchedFillResults_$4424_storage_ptr",
                      "typeString": "struct LibFillResults.MatchedFillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1778:61:29"
            },
            "scope": 4208,
            "src": "1564:276:29",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 4209,
        "src": "708:1134:29"
      }
    ],
    "src": "579:1264:29"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IMatchOrders.sol",
    "exportedSymbols": {
      "IMatchOrders": [
        4208
      ]
    },
    "id": 4209,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4191,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "579:24:29"
      },
      {
        "id": 4192,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "604:33:29"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../libs/LibOrder.sol",
        "id": 4193,
        "nodeType": "ImportDirective",
        "scope": 4209,
        "sourceUnit": 4493,
        "src": "639:30:29",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../libs/LibFillResults.sol",
        "id": 4194,
        "nodeType": "ImportDirective",
        "scope": 4209,
        "sourceUnit": 4426,
        "src": "670:36:29",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4208,
        "linearizedBaseContracts": [
          4208
        ],
        "name": "IMatchOrders",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Match two complementary orders that have a profitable spread.\n      Each order is filled at their respective price point. However, the calculations are\n      carried out as though the orders are both being filled at the right order's price point.\n      The profit made by the left order goes to the taker (who matched the two orders).\n @param leftOrder First order to match.\n @param rightOrder Second order to match.\n @param leftSignature Proof that order was created by the left maker.\n @param rightSignature Proof that order was created by the right maker.\n @return matchedFillResults Amounts filled and fees paid by maker and taker of matched orders.\n TODO: Make this function external once supported by Solidity (See Solidity Issues #3199, #1603)",
            "id": 4207,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "matchOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4203,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4196,
                  "name": "leftOrder",
                  "nodeType": "VariableDeclaration",
                  "scope": 4207,
                  "src": "1594:31:29",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4484_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4195,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4484,
                    "src": "1594:14:29",
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
                  "id": 4198,
                  "name": "rightOrder",
                  "nodeType": "VariableDeclaration",
                  "scope": 4207,
                  "src": "1635:32:29",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4484_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4197,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4484,
                    "src": "1635:14:29",
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
                  "id": 4200,
                  "name": "leftSignature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4207,
                  "src": "1677:26:29",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4199,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1677:5:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4202,
                  "name": "rightSignature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4207,
                  "src": "1713:27:29",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4201,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1713:5:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1584:162:29"
            },
            "payable": false,
            "returnParameters": {
              "id": 4206,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4205,
                  "name": "matchedFillResults",
                  "nodeType": "VariableDeclaration",
                  "scope": 4207,
                  "src": "1779:59:29",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_MatchedFillResults_$4424_memory_ptr",
                    "typeString": "struct LibFillResults.MatchedFillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 4204,
                    "name": "LibFillResults.MatchedFillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4424,
                    "src": "1779:33:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_MatchedFillResults_$4424_storage_ptr",
                      "typeString": "struct LibFillResults.MatchedFillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1778:61:29"
            },
            "scope": 4208,
            "src": "1564:276:29",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 4209,
        "src": "708:1134:29"
      }
    ],
    "src": "579:1264:29"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-10T03:42:05.769Z"
}