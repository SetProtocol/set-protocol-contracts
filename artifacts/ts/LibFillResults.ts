export const LibFillResults = 
{
  "contractName": "LibFillResults",
  "abi": [],
  "bytecode": "0x6080604052348015600f57600080fd5b50603580601d6000396000f3006080604052600080fd00a165627a7a72305820f98680cb10e4fd9966300be7cc5871f6bbb1bc6e84906521eec20c4c9046246a0029",
  "deployedBytecode": "0x6080604052600080fd00a165627a7a72305820f98680cb10e4fd9966300be7cc5871f6bbb1bc6e84906521eec20c4c9046246a0029",
  "sourceMap": "606:799:42:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;606:799:42;;;;;;;",
  "deployedSourceMap": "606:799:42:-;;;;;",
  "source": "/*\n\n  Copyright 2018 ZeroEx Intl.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity ^0.4.24;\n\ncontract LibFillResults\n{\n    struct FillResults {\n        uint256 makerAssetFilledAmount;  // Total amount of makerAsset(s) filled.\n        uint256 takerAssetFilledAmount;  // Total amount of takerAsset(s) filled.\n        uint256 makerFeePaid;            // Total amount of ZRX paid by maker(s) to feeRecipient(s).\n        uint256 takerFeePaid;            // Total amount of ZRX paid by taker to feeRecipients(s).\n    }\n\n    struct MatchedFillResults {\n        FillResults left;                    // Amounts filled and fees paid of left order.\n        FillResults right;                   // Amounts filled and fees paid of right order.\n        uint256 leftMakerAssetSpreadAmount;  // Spread between price of left and right order, denominated in the left order's makerAsset, paid to taker.\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
    "exportedSymbols": {
      "LibFillResults": [
        3927
      ]
    },
    "id": 3928,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3910,
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
        "id": 3927,
        "linearizedBaseContracts": [
          3927
        ],
        "name": "LibFillResults",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "LibFillResults.FillResults",
            "id": 3919,
            "members": [
              {
                "constant": false,
                "id": 3912,
                "name": "makerAssetFilledAmount",
                "nodeType": "VariableDeclaration",
                "scope": 3919,
                "src": "665:30:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3911,
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
                "id": 3914,
                "name": "takerAssetFilledAmount",
                "nodeType": "VariableDeclaration",
                "scope": 3919,
                "src": "747:30:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3913,
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
                "id": 3916,
                "name": "makerFeePaid",
                "nodeType": "VariableDeclaration",
                "scope": 3919,
                "src": "829:20:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3915,
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
                "id": 3918,
                "name": "takerFeePaid",
                "nodeType": "VariableDeclaration",
                "scope": 3919,
                "src": "930:20:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3917,
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
            "scope": 3927,
            "src": "636:390:42",
            "visibility": "public"
          },
          {
            "canonicalName": "LibFillResults.MatchedFillResults",
            "id": 3926,
            "members": [
              {
                "constant": false,
                "id": 3921,
                "name": "left",
                "nodeType": "VariableDeclaration",
                "scope": 3926,
                "src": "1068:16:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                  "typeString": "struct LibFillResults.FillResults"
                },
                "typeName": {
                  "contractScope": null,
                  "id": 3920,
                  "name": "FillResults",
                  "nodeType": "UserDefinedTypeName",
                  "referencedDeclaration": 3919,
                  "src": "1068:11:42",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 3923,
                "name": "right",
                "nodeType": "VariableDeclaration",
                "scope": 3926,
                "src": "1160:17:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                  "typeString": "struct LibFillResults.FillResults"
                },
                "typeName": {
                  "contractScope": null,
                  "id": 3922,
                  "name": "FillResults",
                  "nodeType": "UserDefinedTypeName",
                  "referencedDeclaration": 3919,
                  "src": "1160:11:42",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 3925,
                "name": "leftMakerAssetSpreadAmount",
                "nodeType": "VariableDeclaration",
                "scope": 3926,
                "src": "1253:34:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3924,
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
            "scope": 3927,
            "src": "1032:371:42",
            "visibility": "public"
          }
        ],
        "scope": 3928,
        "src": "606:799:42"
      }
    ],
    "src": "580:826:42"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
    "exportedSymbols": {
      "LibFillResults": [
        3927
      ]
    },
    "id": 3928,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3910,
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
        "id": 3927,
        "linearizedBaseContracts": [
          3927
        ],
        "name": "LibFillResults",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "LibFillResults.FillResults",
            "id": 3919,
            "members": [
              {
                "constant": false,
                "id": 3912,
                "name": "makerAssetFilledAmount",
                "nodeType": "VariableDeclaration",
                "scope": 3919,
                "src": "665:30:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3911,
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
                "id": 3914,
                "name": "takerAssetFilledAmount",
                "nodeType": "VariableDeclaration",
                "scope": 3919,
                "src": "747:30:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3913,
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
                "id": 3916,
                "name": "makerFeePaid",
                "nodeType": "VariableDeclaration",
                "scope": 3919,
                "src": "829:20:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3915,
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
                "id": 3918,
                "name": "takerFeePaid",
                "nodeType": "VariableDeclaration",
                "scope": 3919,
                "src": "930:20:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3917,
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
            "scope": 3927,
            "src": "636:390:42",
            "visibility": "public"
          },
          {
            "canonicalName": "LibFillResults.MatchedFillResults",
            "id": 3926,
            "members": [
              {
                "constant": false,
                "id": 3921,
                "name": "left",
                "nodeType": "VariableDeclaration",
                "scope": 3926,
                "src": "1068:16:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                  "typeString": "struct LibFillResults.FillResults"
                },
                "typeName": {
                  "contractScope": null,
                  "id": 3920,
                  "name": "FillResults",
                  "nodeType": "UserDefinedTypeName",
                  "referencedDeclaration": 3919,
                  "src": "1068:11:42",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 3923,
                "name": "right",
                "nodeType": "VariableDeclaration",
                "scope": 3926,
                "src": "1160:17:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                  "typeString": "struct LibFillResults.FillResults"
                },
                "typeName": {
                  "contractScope": null,
                  "id": 3922,
                  "name": "FillResults",
                  "nodeType": "UserDefinedTypeName",
                  "referencedDeclaration": 3919,
                  "src": "1160:11:42",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 3925,
                "name": "leftMakerAssetSpreadAmount",
                "nodeType": "VariableDeclaration",
                "scope": 3926,
                "src": "1253:34:42",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3924,
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
            "scope": 3927,
            "src": "1032:371:42",
            "visibility": "public"
          }
        ],
        "scope": 3928,
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
  "updatedAt": "2018-07-08T01:11:15.201Z"
}