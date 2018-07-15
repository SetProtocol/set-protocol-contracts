export const LibFillResults = 
{
  "contractName": "LibFillResults",
  "abi": [],
  "bytecode": "0x6080604052348015600f57600080fd5b50603580601d6000396000f3006080604052600080fd00a165627a7a72305820d887f6436b05c57576c4db5532b095c6cce1933df08bad373fee5faf0f7137120029",
  "deployedBytecode": "0x6080604052600080fd00a165627a7a72305820d887f6436b05c57576c4db5532b095c6cce1933df08bad373fee5faf0f7137120029",
  "sourceMap": "606:799:42:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;606:799:42;;;;;;;",
  "deployedSourceMap": "606:799:42:-;;;;;",
  "source": "/*\n\n  Copyright 2018 ZeroEx Intl.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity ^0.4.24;\n\ncontract LibFillResults\n{\n    struct FillResults {\n        uint256 makerAssetFilledAmount;  // Total amount of makerAsset(s) filled.\n        uint256 takerAssetFilledAmount;  // Total amount of takerAsset(s) filled.\n        uint256 makerFeePaid;            // Total amount of ZRX paid by maker(s) to feeRecipient(s).\n        uint256 takerFeePaid;            // Total amount of ZRX paid by taker to feeRecipients(s).\n    }\n\n    struct MatchedFillResults {\n        FillResults left;                    // Amounts filled and fees paid of left order.\n        FillResults right;                   // Amounts filled and fees paid of right order.\n        uint256 leftMakerAssetSpreadAmount;  // Spread between price of left and right order, denominated in the left order's makerAsset, paid to taker.\n    }\n}\n",
  "sourcePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
  "ast": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
    "exportedSymbols": {
      "LibFillResults": [
        4274
      ]
    },
    "id": 4275,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4257,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:42"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 4274,
        "linearizedBaseContracts": [
          4274
        ],
        "name": "LibFillResults",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "LibFillResults.FillResults",
            "id": 4266,
            "members": [
              {
                "constant": false,
                "id": 4259,
                "name": "makerAssetFilledAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4266,
                "src": "665:30:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4258,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "665:7:42",
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
                "id": 4261,
                "name": "takerAssetFilledAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4266,
                "src": "747:30:42",
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
                  "src": "747:7:42",
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
                "name": "makerFeePaid",
                "nodeType": "VariableDeclaration",
                "scope": 4266,
                "src": "829:20:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4262,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "829:7:42",
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
                "id": 4265,
                "name": "takerFeePaid",
                "nodeType": "VariableDeclaration",
                "scope": 4266,
                "src": "930:20:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4264,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "930:7:42",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "FillResults",
            "nodeType": "StructDefinition",
            "scope": 4274,
            "src": "636:390:42",
            "visibility": "public"
          },
          {
            "canonicalName": "LibFillResults.MatchedFillResults",
            "id": 4273,
            "members": [
              {
                "constant": false,
                "id": 4268,
                "name": "left",
                "nodeType": "VariableDeclaration",
                "scope": 4273,
                "src": "1068:16:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                  "typeString": "struct LibFillResults.FillResults"
                },
                "typeName": {
                  "contractScope": null,
                  "id": 4267,
                  "name": "FillResults",
                  "nodeType": "UserDefinedTypeName",
                  "referencedDeclaration": 4266,
                  "src": "1068:11:42",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4270,
                "name": "right",
                "nodeType": "VariableDeclaration",
                "scope": 4273,
                "src": "1160:17:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                  "typeString": "struct LibFillResults.FillResults"
                },
                "typeName": {
                  "contractScope": null,
                  "id": 4269,
                  "name": "FillResults",
                  "nodeType": "UserDefinedTypeName",
                  "referencedDeclaration": 4266,
                  "src": "1160:11:42",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4272,
                "name": "leftMakerAssetSpreadAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4273,
                "src": "1253:34:42",
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
                  "src": "1253:7:42",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "MatchedFillResults",
            "nodeType": "StructDefinition",
            "scope": 4274,
            "src": "1032:371:42",
            "visibility": "public"
          }
        ],
        "scope": 4275,
        "src": "606:799:42"
      }
    ],
    "src": "580:826:42"
  },
  "legacyAST": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
    "exportedSymbols": {
      "LibFillResults": [
        4274
      ]
    },
    "id": 4275,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4257,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:42"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 4274,
        "linearizedBaseContracts": [
          4274
        ],
        "name": "LibFillResults",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "LibFillResults.FillResults",
            "id": 4266,
            "members": [
              {
                "constant": false,
                "id": 4259,
                "name": "makerAssetFilledAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4266,
                "src": "665:30:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4258,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "665:7:42",
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
                "id": 4261,
                "name": "takerAssetFilledAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4266,
                "src": "747:30:42",
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
                  "src": "747:7:42",
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
                "name": "makerFeePaid",
                "nodeType": "VariableDeclaration",
                "scope": 4266,
                "src": "829:20:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4262,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "829:7:42",
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
                "id": 4265,
                "name": "takerFeePaid",
                "nodeType": "VariableDeclaration",
                "scope": 4266,
                "src": "930:20:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4264,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "930:7:42",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "FillResults",
            "nodeType": "StructDefinition",
            "scope": 4274,
            "src": "636:390:42",
            "visibility": "public"
          },
          {
            "canonicalName": "LibFillResults.MatchedFillResults",
            "id": 4273,
            "members": [
              {
                "constant": false,
                "id": 4268,
                "name": "left",
                "nodeType": "VariableDeclaration",
                "scope": 4273,
                "src": "1068:16:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                  "typeString": "struct LibFillResults.FillResults"
                },
                "typeName": {
                  "contractScope": null,
                  "id": 4267,
                  "name": "FillResults",
                  "nodeType": "UserDefinedTypeName",
                  "referencedDeclaration": 4266,
                  "src": "1068:11:42",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4270,
                "name": "right",
                "nodeType": "VariableDeclaration",
                "scope": 4273,
                "src": "1160:17:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                  "typeString": "struct LibFillResults.FillResults"
                },
                "typeName": {
                  "contractScope": null,
                  "id": 4269,
                  "name": "FillResults",
                  "nodeType": "UserDefinedTypeName",
                  "referencedDeclaration": 4266,
                  "src": "1160:11:42",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4272,
                "name": "leftMakerAssetSpreadAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4273,
                "src": "1253:34:42",
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
                  "src": "1253:7:42",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "MatchedFillResults",
            "nodeType": "StructDefinition",
            "scope": 4274,
            "src": "1032:371:42",
            "visibility": "public"
          }
        ],
        "scope": 4275,
        "src": "606:799:42"
      }
    ],
    "src": "580:826:42"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-13T21:55:38.419Z"
}