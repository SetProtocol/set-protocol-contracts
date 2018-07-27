export const LibExchangeErrors = 
{
  "contractName": "LibExchangeErrors",
  "abi": [],
  "bytecode": "0x6080604052348015600f57600080fd5b50603580601d6000396000f3006080604052600080fd00a165627a7a723058209239897d41bd55e15872cb4223a242f2dfe18cd2677fa161d448af5cdd0ba6cc0029",
  "deployedBytecode": "0x6080604052600080fd00a165627a7a723058209239897d41bd55e15872cb4223a242f2dfe18cd2677fa161d448af5cdd0ba6cc0029",
  "sourceMap": "793:3648:42:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;793:3648:42;;;;;;;",
  "deployedSourceMap": "793:3648:42:-;;;;;",
  "source": "/*\n\n  Copyright 2018 ZeroEx Intl.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity ^0.4.24;\n\n/// @dev This contract documents the revert reasons used in the Exchange contract.\n/// This contract is intended to serve as a reference, but is not actually used for efficiency reasons.\ncontract LibExchangeErrors {\n\n    /// Order validation errors ///\n    string constant ORDER_UNFILLABLE = \"ORDER_UNFILLABLE\";                              // Order cannot be filled.\n    string constant INVALID_MAKER = \"INVALID_MAKER\";                                    // Invalid makerAddress.\n    string constant INVALID_TAKER = \"INVALID_TAKER\";                                    // Invalid takerAddress.\n    string constant INVALID_SENDER = \"INVALID_SENDER\";                                  // Invalid `msg.sender`.\n    string constant INVALID_ORDER_SIGNATURE = \"INVALID_ORDER_SIGNATURE\";                // Signature validation failed. \n    \n    /// fillOrder validation errors ///\n    string constant INVALID_TAKER_AMOUNT = \"INVALID_TAKER_AMOUNT\";                      // takerAssetFillAmount cannot equal 0.\n    string constant ROUNDING_ERROR = \"ROUNDING_ERROR\";                                  // Rounding error greater than 0.1% of takerAssetFillAmount. \n    \n    /// Signature validation errors ///\n    string constant INVALID_SIGNATURE = \"INVALID_SIGNATURE\";                            // Signature validation failed. \n    string constant SIGNATURE_ILLEGAL = \"SIGNATURE_ILLEGAL\";                            // Signature type is illegal.\n    string constant SIGNATURE_UNSUPPORTED = \"SIGNATURE_UNSUPPORTED\";                    // Signature type unsupported.\n    \n    /// cancelOrdersUptTo errors ///\n    string constant INVALID_NEW_ORDER_EPOCH = \"INVALID_NEW_ORDER_EPOCH\";                // Specified salt must be greater than or equal to existing orderEpoch.\n\n    /// fillOrKillOrder errors ///\n    string constant COMPLETE_FILL_FAILED = \"COMPLETE_FILL_FAILED\";                      // Desired takerAssetFillAmount could not be completely filled. \n\n    /// matchOrders errors ///\n    string constant NEGATIVE_SPREAD_REQUIRED = \"NEGATIVE_SPREAD_REQUIRED\";              // Matched orders must have a negative spread.\n\n    /// Transaction errors ///\n    string constant REENTRANCY_ILLEGAL = \"REENTRANCY_ILLEGAL\";                          // Recursive reentrancy is not allowed. \n    string constant INVALID_TX_HASH = \"INVALID_TX_HASH\";                                // Transaction has already been executed. \n    string constant INVALID_TX_SIGNATURE = \"INVALID_TX_SIGNATURE\";                      // Signature validation failed. \n    string constant FAILED_EXECUTION = \"FAILED_EXECUTION\";                              // Transaction execution failed. \n    \n    /// registerAssetProxy errors ///\n    string constant ASSET_PROXY_MISMATCH = \"ASSET_PROXY_MISMATCH\";                      // oldAssetProxy proxy does not match currentAssetProxy. \n    string constant ASSET_PROXY_ID_MISMATCH = \"ASSET_PROXY_ID_MISMATCH\";                // newAssetProxyId does not match given assetProxyId.\n\n    /// dispatchTransferFrom errors ///\n    string constant ASSET_PROXY_DOES_NOT_EXIST = \"ASSET_PROXY_DOES_NOT_EXIST\";          // No assetProxy registered at given id.\n    string constant TRANSFER_FAILED = \"TRANSFER_FAILED\";                                // Asset transfer unsuccesful.\n\n    /// Length validation errors ///\n    string constant LENGTH_GREATER_THAN_0_REQUIRED = \"LENGTH_GREATER_THAN_0_REQUIRED\";  // Byte array must have a length greater than 0.\n    string constant LENGTH_GREATER_THAN_3_REQUIRED = \"LENGTH_GREATER_THAN_3_REQUIRED\";  // Byte array must have a length greater than 3.\n    string constant LENGTH_0_REQUIRED = \"LENGTH_0_REQUIRED\";                            // Byte array must have a length of 0.\n    string constant LENGTH_65_REQUIRED = \"LENGTH_65_REQUIRED\";                          // Byte array must have a length of 65.\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibExchangeErrors.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibExchangeErrors.sol",
    "exportedSymbols": {
      "LibExchangeErrors": [
        4557
      ]
    },
    "id": 4558,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4481,
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
        "documentation": "@dev This contract documents the revert reasons used in the Exchange contract.\n This contract is intended to serve as a reference, but is not actually used for efficiency reasons.",
        "fullyImplemented": true,
        "id": 4557,
        "linearizedBaseContracts": [
          4557
        ],
        "name": "LibExchangeErrors",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 4484,
            "name": "ORDER_UNFILLABLE",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "863:53:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4482,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "863:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4f524445525f554e46494c4c41424c45",
              "id": 4483,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "898:18:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_d90d4a6d9e1cdf8691e05370c75bf5d279d6ef5170cab16718a8a3780d2d3519",
                "typeString": "literal_string \"ORDER_UNFILLABLE\""
              },
              "value": "ORDER_UNFILLABLE"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4487,
            "name": "INVALID_MAKER",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "978:47:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4485,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "978:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "494e56414c49445f4d414b4552",
              "id": 4486,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1010:15:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_484de75c7828c5b2a0283b1ac1380b81ce21dc59d4ce114b8a3a2805f796541d",
                "typeString": "literal_string \"INVALID_MAKER\""
              },
              "value": "INVALID_MAKER"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4490,
            "name": "INVALID_TAKER",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "1091:47:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4488,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1091:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "494e56414c49445f54414b4552",
              "id": 4489,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1123:15:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_0470440bcb373dec6c0254d24cca76721332fa381f59694f26c3803750ea739d",
                "typeString": "literal_string \"INVALID_TAKER\""
              },
              "value": "INVALID_TAKER"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4493,
            "name": "INVALID_SENDER",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "1204:49:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4491,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1204:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "494e56414c49445f53454e444552",
              "id": 4492,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1237:16:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_db738cfea6a49ef4e8f6a59c278add0dfddfdb2462adac18e44f8df0bef7fd64",
                "typeString": "literal_string \"INVALID_SENDER\""
              },
              "value": "INVALID_SENDER"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4496,
            "name": "INVALID_ORDER_SIGNATURE",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "1317:67:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4494,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1317:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "494e56414c49445f4f524445525f5349474e4154555245",
              "id": 4495,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1359:25:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_475edbb345a078805cddf3c6e244556950bcf7225edf6d1d01faa4f525052416",
                "typeString": "literal_string \"INVALID_ORDER_SIGNATURE\""
              },
              "value": "INVALID_ORDER_SIGNATURE"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4499,
            "name": "INVALID_TAKER_AMOUNT",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "1483:61:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4497,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1483:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "494e56414c49445f54414b45525f414d4f554e54",
              "id": 4498,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1522:22:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_87db88fa5d54b3f57463d24931dbc67d52793e7388ebb39345ffd20c50f9c8cf",
                "typeString": "literal_string \"INVALID_TAKER_AMOUNT\""
              },
              "value": "INVALID_TAKER_AMOUNT"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4502,
            "name": "ROUNDING_ERROR",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "1611:49:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4500,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1611:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "524f554e44494e475f4552524f52",
              "id": 4501,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1644:16:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_699a220d5c2b4f42cb6f437aca492dc62f74bd3dd2c4a750ace6999c42611da4",
                "typeString": "literal_string \"ROUNDING_ERROR\""
              },
              "value": "ROUNDING_ERROR"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4505,
            "name": "INVALID_SIGNATURE",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "1806:55:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4503,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1806:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "494e56414c49445f5349474e4154555245",
              "id": 4504,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1842:19:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_5e2e9eaa2d734966dea0900deacd15b20129fbce05255d633a3ce5ebca181b88",
                "typeString": "literal_string \"INVALID_SIGNATURE\""
              },
              "value": "INVALID_SIGNATURE"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4508,
            "name": "SIGNATURE_ILLEGAL",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "1927:55:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4506,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1927:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5349474e41545552455f494c4c4547414c",
              "id": 4507,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1963:19:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_9e7fd33730616c7b653bdf6549e7d25c6f645a06dac269b0c8ba8a373dbf0e1a",
                "typeString": "literal_string \"SIGNATURE_ILLEGAL\""
              },
              "value": "SIGNATURE_ILLEGAL"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4511,
            "name": "SIGNATURE_UNSUPPORTED",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "2045:63:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4509,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2045:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5349474e41545552455f554e535550504f52544544",
              "id": 4510,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2085:23:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_4281b2a9da20e5d4d555b4eda991baf53af17019e46fcdd9b9a209fcdc5d6419",
                "typeString": "literal_string \"SIGNATURE_UNSUPPORTED\""
              },
              "value": "SIGNATURE_UNSUPPORTED"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4514,
            "name": "INVALID_NEW_ORDER_EPOCH",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "2206:67:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4512,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2206:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "494e56414c49445f4e45575f4f524445525f45504f4348",
              "id": 4513,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2248:25:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_a2aaa461e482bb76f8026d4c09a37de4bc92c715d5bd92a6f736a189ab2fa72f",
                "typeString": "literal_string \"INVALID_NEW_ORDER_EPOCH\""
              },
              "value": "INVALID_NEW_ORDER_EPOCH"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4517,
            "name": "COMPLETE_FILL_FAILED",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "2402:61:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4515,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2402:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "434f4d504c4554455f46494c4c5f4641494c4544",
              "id": 4516,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2441:22:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_aae5a7eb3098e0a0dc774ac77440ee5ebf5d476a59bb53a7158952be939063b6",
                "typeString": "literal_string \"COMPLETE_FILL_FAILED\""
              },
              "value": "COMPLETE_FILL_FAILED"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4520,
            "name": "NEGATIVE_SPREAD_REQUIRED",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "2587:69:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4518,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2587:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4e454741544956455f5350524541445f5245515549524544",
              "id": 4519,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2630:26:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_e0db31cb75e1f46617004a546363550683c2dbcd2ce361c8922c89ce66a8b7c6",
                "typeString": "literal_string \"NEGATIVE_SPREAD_REQUIRED\""
              },
              "value": "NEGATIVE_SPREAD_REQUIRED"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4523,
            "name": "REENTRANCY_ILLEGAL",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "2754:57:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4521,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2754:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5245454e5452414e43595f494c4c4547414c",
              "id": 4522,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2791:20:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_adc5a435f597dc53b867636504fa90da5707dedb5941f76aa8a56bad68e5f488",
                "typeString": "literal_string \"REENTRANCY_ILLEGAL\""
              },
              "value": "REENTRANCY_ILLEGAL"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4526,
            "name": "INVALID_TX_HASH",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "2883:51:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4524,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2883:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "494e56414c49445f54585f48415348",
              "id": 4525,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2917:17:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_59998e182c427c9805c4ea40648eff844c627c970462399cef943e9e7a63a5ff",
                "typeString": "literal_string \"INVALID_TX_HASH\""
              },
              "value": "INVALID_TX_HASH"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4529,
            "name": "INVALID_TX_SIGNATURE",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "3014:61:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4527,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "3014:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "494e56414c49445f54585f5349474e4154555245",
              "id": 4528,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "3053:22:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_e8f019b13afc6ac26558c101400136b0165f21222829d5f6267b68811a10c0eb",
                "typeString": "literal_string \"INVALID_TX_SIGNATURE\""
              },
              "value": "INVALID_TX_SIGNATURE"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4532,
            "name": "FAILED_EXECUTION",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "3135:53:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4530,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "3135:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4641494c45445f455845435554494f4e",
              "id": 4531,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "3170:18:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_70f302eef0ae353d76f2308ebb33d6c99d06dd010511b1c2f33597c7370ba3ea",
                "typeString": "literal_string \"FAILED_EXECUTION\""
              },
              "value": "FAILED_EXECUTION"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4535,
            "name": "ASSET_PROXY_MISMATCH",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "3300:61:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4533,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "3300:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "41535345545f50524f58595f4d49534d41544348",
              "id": 4534,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "3339:22:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_d64ad48279560f12fd52e6ed69551adef180cc2870b9a8fcbfec67a59c034f53",
                "typeString": "literal_string \"ASSET_PROXY_MISMATCH\""
              },
              "value": "ASSET_PROXY_MISMATCH"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4538,
            "name": "ASSET_PROXY_ID_MISMATCH",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "3446:67:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4536,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "3446:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "41535345545f50524f58595f49445f4d49534d41544348",
              "id": 4537,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "3488:25:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_9140808a9c8afce261c632b8ce6a06bd7636fa5d55c16638cfdaa240b2ca5e13",
                "typeString": "literal_string \"ASSET_PROXY_ID_MISMATCH\""
              },
              "value": "ASSET_PROXY_ID_MISMATCH"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4541,
            "name": "ASSET_PROXY_DOES_NOT_EXIST",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "3629:73:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4539,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "3629:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "41535345545f50524f58595f444f45535f4e4f545f4558495354",
              "id": 4540,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "3674:28:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_90a778b5450aef58eaf48b56b8b8fc790627aa8c44ea2181cf6625d1a869e674",
                "typeString": "literal_string \"ASSET_PROXY_DOES_NOT_EXIST\""
              },
              "value": "ASSET_PROXY_DOES_NOT_EXIST"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4544,
            "name": "TRANSFER_FAILED",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "3758:51:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4542,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "3758:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5452414e534645525f4641494c4544",
              "id": 4543,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "3792:17:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_8bf8f0d780f13740660fe63233b17f96cb1813889e7dce4121e55b817b367b72",
                "typeString": "literal_string \"TRANSFER_FAILED\""
              },
              "value": "TRANSFER_FAILED"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4547,
            "name": "LENGTH_GREATER_THAN_0_REQUIRED",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "3915:81:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4545,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "3915:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4c454e4754485f475245415445525f5448414e5f305f5245515549524544",
              "id": 4546,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "3964:32:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_a12ad54bc506b95b2d8a3458ddc764e6a10b57fc7d38babb8d4e6ad29d14c95e",
                "typeString": "literal_string \"LENGTH_GREATER_THAN_0_REQUIRED\""
              },
              "value": "LENGTH_GREATER_THAN_0_REQUIRED"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4550,
            "name": "LENGTH_GREATER_THAN_3_REQUIRED",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "4052:81:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4548,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "4052:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4c454e4754485f475245415445525f5448414e5f335f5245515549524544",
              "id": 4549,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "4101:32:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_a7ed0eb3e35c926c4fb00f35b540637f18fba6a7ba50a758df7c755e33983c63",
                "typeString": "literal_string \"LENGTH_GREATER_THAN_3_REQUIRED\""
              },
              "value": "LENGTH_GREATER_THAN_3_REQUIRED"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4553,
            "name": "LENGTH_0_REQUIRED",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "4189:55:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4551,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "4189:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4c454e4754485f305f5245515549524544",
              "id": 4552,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "4225:19:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_fee80b21b92985c8cc9822ac4cc146da911f767c7482f287a279b8bfbcfb3237",
                "typeString": "literal_string \"LENGTH_0_REQUIRED\""
              },
              "value": "LENGTH_0_REQUIRED"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4556,
            "name": "LENGTH_65_REQUIRED",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "4316:57:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4554,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "4316:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4c454e4754485f36355f5245515549524544",
              "id": 4555,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "4353:20:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_024a7a66bc4464a7341baebd243328b46def44f6001996c320f7f7ea41913014",
                "typeString": "literal_string \"LENGTH_65_REQUIRED\""
              },
              "value": "LENGTH_65_REQUIRED"
            },
            "visibility": "internal"
          }
        ],
        "scope": 4558,
        "src": "793:3648:42"
      }
    ],
    "src": "580:3862:42"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibExchangeErrors.sol",
    "exportedSymbols": {
      "LibExchangeErrors": [
        4557
      ]
    },
    "id": 4558,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4481,
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
        "documentation": "@dev This contract documents the revert reasons used in the Exchange contract.\n This contract is intended to serve as a reference, but is not actually used for efficiency reasons.",
        "fullyImplemented": true,
        "id": 4557,
        "linearizedBaseContracts": [
          4557
        ],
        "name": "LibExchangeErrors",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 4484,
            "name": "ORDER_UNFILLABLE",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "863:53:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4482,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "863:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4f524445525f554e46494c4c41424c45",
              "id": 4483,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "898:18:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_d90d4a6d9e1cdf8691e05370c75bf5d279d6ef5170cab16718a8a3780d2d3519",
                "typeString": "literal_string \"ORDER_UNFILLABLE\""
              },
              "value": "ORDER_UNFILLABLE"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4487,
            "name": "INVALID_MAKER",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "978:47:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4485,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "978:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "494e56414c49445f4d414b4552",
              "id": 4486,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1010:15:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_484de75c7828c5b2a0283b1ac1380b81ce21dc59d4ce114b8a3a2805f796541d",
                "typeString": "literal_string \"INVALID_MAKER\""
              },
              "value": "INVALID_MAKER"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4490,
            "name": "INVALID_TAKER",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "1091:47:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4488,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1091:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "494e56414c49445f54414b4552",
              "id": 4489,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1123:15:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_0470440bcb373dec6c0254d24cca76721332fa381f59694f26c3803750ea739d",
                "typeString": "literal_string \"INVALID_TAKER\""
              },
              "value": "INVALID_TAKER"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4493,
            "name": "INVALID_SENDER",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "1204:49:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4491,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1204:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "494e56414c49445f53454e444552",
              "id": 4492,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1237:16:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_db738cfea6a49ef4e8f6a59c278add0dfddfdb2462adac18e44f8df0bef7fd64",
                "typeString": "literal_string \"INVALID_SENDER\""
              },
              "value": "INVALID_SENDER"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4496,
            "name": "INVALID_ORDER_SIGNATURE",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "1317:67:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4494,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1317:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "494e56414c49445f4f524445525f5349474e4154555245",
              "id": 4495,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1359:25:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_475edbb345a078805cddf3c6e244556950bcf7225edf6d1d01faa4f525052416",
                "typeString": "literal_string \"INVALID_ORDER_SIGNATURE\""
              },
              "value": "INVALID_ORDER_SIGNATURE"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4499,
            "name": "INVALID_TAKER_AMOUNT",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "1483:61:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4497,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1483:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "494e56414c49445f54414b45525f414d4f554e54",
              "id": 4498,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1522:22:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_87db88fa5d54b3f57463d24931dbc67d52793e7388ebb39345ffd20c50f9c8cf",
                "typeString": "literal_string \"INVALID_TAKER_AMOUNT\""
              },
              "value": "INVALID_TAKER_AMOUNT"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4502,
            "name": "ROUNDING_ERROR",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "1611:49:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4500,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1611:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "524f554e44494e475f4552524f52",
              "id": 4501,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1644:16:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_699a220d5c2b4f42cb6f437aca492dc62f74bd3dd2c4a750ace6999c42611da4",
                "typeString": "literal_string \"ROUNDING_ERROR\""
              },
              "value": "ROUNDING_ERROR"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4505,
            "name": "INVALID_SIGNATURE",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "1806:55:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4503,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1806:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "494e56414c49445f5349474e4154555245",
              "id": 4504,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1842:19:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_5e2e9eaa2d734966dea0900deacd15b20129fbce05255d633a3ce5ebca181b88",
                "typeString": "literal_string \"INVALID_SIGNATURE\""
              },
              "value": "INVALID_SIGNATURE"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4508,
            "name": "SIGNATURE_ILLEGAL",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "1927:55:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4506,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1927:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5349474e41545552455f494c4c4547414c",
              "id": 4507,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1963:19:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_9e7fd33730616c7b653bdf6549e7d25c6f645a06dac269b0c8ba8a373dbf0e1a",
                "typeString": "literal_string \"SIGNATURE_ILLEGAL\""
              },
              "value": "SIGNATURE_ILLEGAL"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4511,
            "name": "SIGNATURE_UNSUPPORTED",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "2045:63:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4509,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2045:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5349474e41545552455f554e535550504f52544544",
              "id": 4510,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2085:23:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_4281b2a9da20e5d4d555b4eda991baf53af17019e46fcdd9b9a209fcdc5d6419",
                "typeString": "literal_string \"SIGNATURE_UNSUPPORTED\""
              },
              "value": "SIGNATURE_UNSUPPORTED"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4514,
            "name": "INVALID_NEW_ORDER_EPOCH",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "2206:67:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4512,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2206:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "494e56414c49445f4e45575f4f524445525f45504f4348",
              "id": 4513,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2248:25:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_a2aaa461e482bb76f8026d4c09a37de4bc92c715d5bd92a6f736a189ab2fa72f",
                "typeString": "literal_string \"INVALID_NEW_ORDER_EPOCH\""
              },
              "value": "INVALID_NEW_ORDER_EPOCH"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4517,
            "name": "COMPLETE_FILL_FAILED",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "2402:61:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4515,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2402:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "434f4d504c4554455f46494c4c5f4641494c4544",
              "id": 4516,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2441:22:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_aae5a7eb3098e0a0dc774ac77440ee5ebf5d476a59bb53a7158952be939063b6",
                "typeString": "literal_string \"COMPLETE_FILL_FAILED\""
              },
              "value": "COMPLETE_FILL_FAILED"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4520,
            "name": "NEGATIVE_SPREAD_REQUIRED",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "2587:69:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4518,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2587:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4e454741544956455f5350524541445f5245515549524544",
              "id": 4519,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2630:26:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_e0db31cb75e1f46617004a546363550683c2dbcd2ce361c8922c89ce66a8b7c6",
                "typeString": "literal_string \"NEGATIVE_SPREAD_REQUIRED\""
              },
              "value": "NEGATIVE_SPREAD_REQUIRED"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4523,
            "name": "REENTRANCY_ILLEGAL",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "2754:57:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4521,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2754:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5245454e5452414e43595f494c4c4547414c",
              "id": 4522,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2791:20:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_adc5a435f597dc53b867636504fa90da5707dedb5941f76aa8a56bad68e5f488",
                "typeString": "literal_string \"REENTRANCY_ILLEGAL\""
              },
              "value": "REENTRANCY_ILLEGAL"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4526,
            "name": "INVALID_TX_HASH",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "2883:51:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4524,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2883:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "494e56414c49445f54585f48415348",
              "id": 4525,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2917:17:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_59998e182c427c9805c4ea40648eff844c627c970462399cef943e9e7a63a5ff",
                "typeString": "literal_string \"INVALID_TX_HASH\""
              },
              "value": "INVALID_TX_HASH"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4529,
            "name": "INVALID_TX_SIGNATURE",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "3014:61:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4527,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "3014:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "494e56414c49445f54585f5349474e4154555245",
              "id": 4528,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "3053:22:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_e8f019b13afc6ac26558c101400136b0165f21222829d5f6267b68811a10c0eb",
                "typeString": "literal_string \"INVALID_TX_SIGNATURE\""
              },
              "value": "INVALID_TX_SIGNATURE"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4532,
            "name": "FAILED_EXECUTION",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "3135:53:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4530,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "3135:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4641494c45445f455845435554494f4e",
              "id": 4531,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "3170:18:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_70f302eef0ae353d76f2308ebb33d6c99d06dd010511b1c2f33597c7370ba3ea",
                "typeString": "literal_string \"FAILED_EXECUTION\""
              },
              "value": "FAILED_EXECUTION"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4535,
            "name": "ASSET_PROXY_MISMATCH",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "3300:61:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4533,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "3300:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "41535345545f50524f58595f4d49534d41544348",
              "id": 4534,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "3339:22:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_d64ad48279560f12fd52e6ed69551adef180cc2870b9a8fcbfec67a59c034f53",
                "typeString": "literal_string \"ASSET_PROXY_MISMATCH\""
              },
              "value": "ASSET_PROXY_MISMATCH"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4538,
            "name": "ASSET_PROXY_ID_MISMATCH",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "3446:67:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4536,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "3446:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "41535345545f50524f58595f49445f4d49534d41544348",
              "id": 4537,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "3488:25:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_9140808a9c8afce261c632b8ce6a06bd7636fa5d55c16638cfdaa240b2ca5e13",
                "typeString": "literal_string \"ASSET_PROXY_ID_MISMATCH\""
              },
              "value": "ASSET_PROXY_ID_MISMATCH"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4541,
            "name": "ASSET_PROXY_DOES_NOT_EXIST",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "3629:73:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4539,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "3629:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "41535345545f50524f58595f444f45535f4e4f545f4558495354",
              "id": 4540,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "3674:28:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_90a778b5450aef58eaf48b56b8b8fc790627aa8c44ea2181cf6625d1a869e674",
                "typeString": "literal_string \"ASSET_PROXY_DOES_NOT_EXIST\""
              },
              "value": "ASSET_PROXY_DOES_NOT_EXIST"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4544,
            "name": "TRANSFER_FAILED",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "3758:51:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4542,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "3758:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5452414e534645525f4641494c4544",
              "id": 4543,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "3792:17:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_8bf8f0d780f13740660fe63233b17f96cb1813889e7dce4121e55b817b367b72",
                "typeString": "literal_string \"TRANSFER_FAILED\""
              },
              "value": "TRANSFER_FAILED"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4547,
            "name": "LENGTH_GREATER_THAN_0_REQUIRED",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "3915:81:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4545,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "3915:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4c454e4754485f475245415445525f5448414e5f305f5245515549524544",
              "id": 4546,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "3964:32:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_a12ad54bc506b95b2d8a3458ddc764e6a10b57fc7d38babb8d4e6ad29d14c95e",
                "typeString": "literal_string \"LENGTH_GREATER_THAN_0_REQUIRED\""
              },
              "value": "LENGTH_GREATER_THAN_0_REQUIRED"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4550,
            "name": "LENGTH_GREATER_THAN_3_REQUIRED",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "4052:81:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4548,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "4052:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4c454e4754485f475245415445525f5448414e5f335f5245515549524544",
              "id": 4549,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "4101:32:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_a7ed0eb3e35c926c4fb00f35b540637f18fba6a7ba50a758df7c755e33983c63",
                "typeString": "literal_string \"LENGTH_GREATER_THAN_3_REQUIRED\""
              },
              "value": "LENGTH_GREATER_THAN_3_REQUIRED"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4553,
            "name": "LENGTH_0_REQUIRED",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "4189:55:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4551,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "4189:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4c454e4754485f305f5245515549524544",
              "id": 4552,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "4225:19:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_fee80b21b92985c8cc9822ac4cc146da911f767c7482f287a279b8bfbcfb3237",
                "typeString": "literal_string \"LENGTH_0_REQUIRED\""
              },
              "value": "LENGTH_0_REQUIRED"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4556,
            "name": "LENGTH_65_REQUIRED",
            "nodeType": "VariableDeclaration",
            "scope": 4557,
            "src": "4316:57:42",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4554,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "4316:6:42",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4c454e4754485f36355f5245515549524544",
              "id": 4555,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "4353:20:42",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_024a7a66bc4464a7341baebd243328b46def44f6001996c320f7f7ea41913014",
                "typeString": "literal_string \"LENGTH_65_REQUIRED\""
              },
              "value": "LENGTH_65_REQUIRED"
            },
            "visibility": "internal"
          }
        ],
        "scope": 4558,
        "src": "793:3648:42"
      }
    ],
    "src": "580:3862:42"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-27T04:20:39.830Z"
}