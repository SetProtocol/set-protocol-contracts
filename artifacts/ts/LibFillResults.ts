export const LibFillResults = 
{
  "contractName": "LibFillResults",
  "abi": [],
  "bytecode": "0x6080604052348015600f57600080fd5b50603580601d6000396000f3006080604052600080fd00a165627a7a72305820f98680cb10e4fd9966300be7cc5871f6bbb1bc6e84906521eec20c4c9046246a0029",
  "deployedBytecode": "0x6080604052600080fd00a165627a7a72305820f98680cb10e4fd9966300be7cc5871f6bbb1bc6e84906521eec20c4c9046246a0029",
  "sourceMap": "606:799:45:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;606:799:45;;;;;;;",
  "deployedSourceMap": "606:799:45:-;;;;;",
  "source": "/*\n\n  Copyright 2018 ZeroEx Intl.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity ^0.4.24;\n\ncontract LibFillResults\n{\n    struct FillResults {\n        uint256 makerAssetFilledAmount;  // Total amount of makerAsset(s) filled.\n        uint256 takerAssetFilledAmount;  // Total amount of takerAsset(s) filled.\n        uint256 makerFeePaid;            // Total amount of ZRX paid by maker(s) to feeRecipient(s).\n        uint256 takerFeePaid;            // Total amount of ZRX paid by taker to feeRecipients(s).\n    }\n\n    struct MatchedFillResults {\n        FillResults left;                    // Amounts filled and fees paid of left order.\n        FillResults right;                   // Amounts filled and fees paid of right order.\n        uint256 leftMakerAssetSpreadAmount;  // Spread between price of left and right order, denominated in the left order's makerAsset, paid to taker.\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
    "exportedSymbols": {
      "LibFillResults": [
        5298
      ]
    },
    "id": 5299,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5281,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:45"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 5298,
        "linearizedBaseContracts": [
          5298
        ],
        "name": "LibFillResults",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "LibFillResults.FillResults",
            "id": 5290,
            "members": [
              {
                "constant": false,
                "id": 5283,
                "name": "makerAssetFilledAmount",
                "nodeType": "VariableDeclaration",
                "scope": 5290,
                "src": "665:30:45",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 5282,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "665:7:45",
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
                "id": 5285,
                "name": "takerAssetFilledAmount",
                "nodeType": "VariableDeclaration",
                "scope": 5290,
                "src": "747:30:45",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 5284,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "747:7:45",
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
                "id": 5287,
                "name": "makerFeePaid",
                "nodeType": "VariableDeclaration",
                "scope": 5290,
                "src": "829:20:45",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 5286,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "829:7:45",
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
                "id": 5289,
                "name": "takerFeePaid",
                "nodeType": "VariableDeclaration",
                "scope": 5290,
                "src": "930:20:45",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 5288,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "930:7:45",
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
            "scope": 5298,
            "src": "636:390:45",
            "visibility": "public"
          },
          {
            "canonicalName": "LibFillResults.MatchedFillResults",
            "id": 5297,
            "members": [
              {
                "constant": false,
                "id": 5292,
                "name": "left",
                "nodeType": "VariableDeclaration",
                "scope": 5297,
                "src": "1068:16:45",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_struct$_FillResults_$5290_storage_ptr",
                  "typeString": "struct LibFillResults.FillResults"
                },
                "typeName": {
                  "contractScope": null,
                  "id": 5291,
                  "name": "FillResults",
                  "nodeType": "UserDefinedTypeName",
                  "referencedDeclaration": 5290,
                  "src": "1068:11:45",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$5290_storage_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 5294,
                "name": "right",
                "nodeType": "VariableDeclaration",
                "scope": 5297,
                "src": "1160:17:45",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_struct$_FillResults_$5290_storage_ptr",
                  "typeString": "struct LibFillResults.FillResults"
                },
                "typeName": {
                  "contractScope": null,
                  "id": 5293,
                  "name": "FillResults",
                  "nodeType": "UserDefinedTypeName",
                  "referencedDeclaration": 5290,
                  "src": "1160:11:45",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$5290_storage_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 5296,
                "name": "leftMakerAssetSpreadAmount",
                "nodeType": "VariableDeclaration",
                "scope": 5297,
                "src": "1253:34:45",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 5295,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1253:7:45",
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
            "scope": 5298,
            "src": "1032:371:45",
            "visibility": "public"
          }
        ],
        "scope": 5299,
        "src": "606:799:45"
      }
    ],
    "src": "580:826:45"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
    "exportedSymbols": {
      "LibFillResults": [
        5298
      ]
    },
    "id": 5299,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5281,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:45"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 5298,
        "linearizedBaseContracts": [
          5298
        ],
        "name": "LibFillResults",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "LibFillResults.FillResults",
            "id": 5290,
            "members": [
              {
                "constant": false,
                "id": 5283,
                "name": "makerAssetFilledAmount",
                "nodeType": "VariableDeclaration",
                "scope": 5290,
                "src": "665:30:45",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 5282,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "665:7:45",
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
                "id": 5285,
                "name": "takerAssetFilledAmount",
                "nodeType": "VariableDeclaration",
                "scope": 5290,
                "src": "747:30:45",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 5284,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "747:7:45",
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
                "id": 5287,
                "name": "makerFeePaid",
                "nodeType": "VariableDeclaration",
                "scope": 5290,
                "src": "829:20:45",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 5286,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "829:7:45",
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
                "id": 5289,
                "name": "takerFeePaid",
                "nodeType": "VariableDeclaration",
                "scope": 5290,
                "src": "930:20:45",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 5288,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "930:7:45",
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
            "scope": 5298,
            "src": "636:390:45",
            "visibility": "public"
          },
          {
            "canonicalName": "LibFillResults.MatchedFillResults",
            "id": 5297,
            "members": [
              {
                "constant": false,
                "id": 5292,
                "name": "left",
                "nodeType": "VariableDeclaration",
                "scope": 5297,
                "src": "1068:16:45",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_struct$_FillResults_$5290_storage_ptr",
                  "typeString": "struct LibFillResults.FillResults"
                },
                "typeName": {
                  "contractScope": null,
                  "id": 5291,
                  "name": "FillResults",
                  "nodeType": "UserDefinedTypeName",
                  "referencedDeclaration": 5290,
                  "src": "1068:11:45",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$5290_storage_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 5294,
                "name": "right",
                "nodeType": "VariableDeclaration",
                "scope": 5297,
                "src": "1160:17:45",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_struct$_FillResults_$5290_storage_ptr",
                  "typeString": "struct LibFillResults.FillResults"
                },
                "typeName": {
                  "contractScope": null,
                  "id": 5293,
                  "name": "FillResults",
                  "nodeType": "UserDefinedTypeName",
                  "referencedDeclaration": 5290,
                  "src": "1160:11:45",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$5290_storage_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 5296,
                "name": "leftMakerAssetSpreadAmount",
                "nodeType": "VariableDeclaration",
                "scope": 5297,
                "src": "1253:34:45",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 5295,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1253:7:45",
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
            "scope": 5298,
            "src": "1032:371:45",
            "visibility": "public"
          }
        ],
        "scope": 5299,
        "src": "606:799:45"
      }
    ],
    "src": "580:826:45"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T08:07:49.131Z"
}