export const LibFillResults = 
{
  "contractName": "LibFillResults",
  "abi": [],
  "bytecode": "0x6080604052348015600f57600080fd5b50603580601d6000396000f3006080604052600080fd00a165627a7a72305820f98680cb10e4fd9966300be7cc5871f6bbb1bc6e84906521eec20c4c9046246a0029",
  "deployedBytecode": "0x6080604052600080fd00a165627a7a72305820f98680cb10e4fd9966300be7cc5871f6bbb1bc6e84906521eec20c4c9046246a0029",
  "sourceMap": "606:799:30:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;606:799:30;;;;;;;",
  "deployedSourceMap": "606:799:30:-;;;;;",
  "source": "/*\n\n  Copyright 2018 ZeroEx Intl.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity ^0.4.24;\n\ncontract LibFillResults\n{\n    struct FillResults {\n        uint256 makerAssetFilledAmount;  // Total amount of makerAsset(s) filled.\n        uint256 takerAssetFilledAmount;  // Total amount of takerAsset(s) filled.\n        uint256 makerFeePaid;            // Total amount of ZRX paid by maker(s) to feeRecipient(s).\n        uint256 takerFeePaid;            // Total amount of ZRX paid by taker to feeRecipients(s).\n    }\n\n    struct MatchedFillResults {\n        FillResults left;                    // Amounts filled and fees paid of left order.\n        FillResults right;                   // Amounts filled and fees paid of right order.\n        uint256 leftMakerAssetSpreadAmount;  // Spread between price of left and right order, denominated in the left order's makerAsset, paid to taker.\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
    "exportedSymbols": {
      "LibFillResults": [
        4265
      ]
    },
    "id": 4266,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4248,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:30"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 4265,
        "linearizedBaseContracts": [
          4265
        ],
        "name": "LibFillResults",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "LibFillResults.FillResults",
            "id": 4257,
            "members": [
              {
                "constant": false,
                "id": 4250,
                "name": "makerAssetFilledAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4257,
                "src": "665:30:30",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4249,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "665:7:30",
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
                "id": 4252,
                "name": "takerAssetFilledAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4257,
                "src": "747:30:30",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4251,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "747:7:30",
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
                "id": 4254,
                "name": "makerFeePaid",
                "nodeType": "VariableDeclaration",
                "scope": 4257,
                "src": "829:20:30",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4253,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "829:7:30",
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
                "id": 4256,
                "name": "takerFeePaid",
                "nodeType": "VariableDeclaration",
                "scope": 4257,
                "src": "930:20:30",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4255,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "930:7:30",
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
            "scope": 4265,
            "src": "636:390:30",
            "visibility": "public"
          },
          {
            "canonicalName": "LibFillResults.MatchedFillResults",
            "id": 4264,
            "members": [
              {
                "constant": false,
                "id": 4259,
                "name": "left",
                "nodeType": "VariableDeclaration",
                "scope": 4264,
                "src": "1068:16:30",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                  "typeString": "struct LibFillResults.FillResults"
                },
                "typeName": {
                  "contractScope": null,
                  "id": 4258,
                  "name": "FillResults",
                  "nodeType": "UserDefinedTypeName",
                  "referencedDeclaration": 4257,
                  "src": "1068:11:30",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4261,
                "name": "right",
                "nodeType": "VariableDeclaration",
                "scope": 4264,
                "src": "1160:17:30",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                  "typeString": "struct LibFillResults.FillResults"
                },
                "typeName": {
                  "contractScope": null,
                  "id": 4260,
                  "name": "FillResults",
                  "nodeType": "UserDefinedTypeName",
                  "referencedDeclaration": 4257,
                  "src": "1160:11:30",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4263,
                "name": "leftMakerAssetSpreadAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4264,
                "src": "1253:34:30",
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
                  "src": "1253:7:30",
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
            "scope": 4265,
            "src": "1032:371:30",
            "visibility": "public"
          }
        ],
        "scope": 4266,
        "src": "606:799:30"
      }
    ],
    "src": "580:826:30"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
    "exportedSymbols": {
      "LibFillResults": [
        4265
      ]
    },
    "id": 4266,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4248,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:30"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 4265,
        "linearizedBaseContracts": [
          4265
        ],
        "name": "LibFillResults",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "LibFillResults.FillResults",
            "id": 4257,
            "members": [
              {
                "constant": false,
                "id": 4250,
                "name": "makerAssetFilledAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4257,
                "src": "665:30:30",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4249,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "665:7:30",
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
                "id": 4252,
                "name": "takerAssetFilledAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4257,
                "src": "747:30:30",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4251,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "747:7:30",
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
                "id": 4254,
                "name": "makerFeePaid",
                "nodeType": "VariableDeclaration",
                "scope": 4257,
                "src": "829:20:30",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4253,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "829:7:30",
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
                "id": 4256,
                "name": "takerFeePaid",
                "nodeType": "VariableDeclaration",
                "scope": 4257,
                "src": "930:20:30",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4255,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "930:7:30",
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
            "scope": 4265,
            "src": "636:390:30",
            "visibility": "public"
          },
          {
            "canonicalName": "LibFillResults.MatchedFillResults",
            "id": 4264,
            "members": [
              {
                "constant": false,
                "id": 4259,
                "name": "left",
                "nodeType": "VariableDeclaration",
                "scope": 4264,
                "src": "1068:16:30",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                  "typeString": "struct LibFillResults.FillResults"
                },
                "typeName": {
                  "contractScope": null,
                  "id": 4258,
                  "name": "FillResults",
                  "nodeType": "UserDefinedTypeName",
                  "referencedDeclaration": 4257,
                  "src": "1068:11:30",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4261,
                "name": "right",
                "nodeType": "VariableDeclaration",
                "scope": 4264,
                "src": "1160:17:30",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                  "typeString": "struct LibFillResults.FillResults"
                },
                "typeName": {
                  "contractScope": null,
                  "id": 4260,
                  "name": "FillResults",
                  "nodeType": "UserDefinedTypeName",
                  "referencedDeclaration": 4257,
                  "src": "1160:11:30",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4257_storage_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4263,
                "name": "leftMakerAssetSpreadAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4264,
                "src": "1253:34:30",
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
                  "src": "1253:7:30",
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
            "scope": 4265,
            "src": "1032:371:30",
            "visibility": "public"
          }
        ],
        "scope": 4266,
        "src": "606:799:30"
      }
    ],
    "src": "580:826:30"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-23T23:58:05.599Z"
}