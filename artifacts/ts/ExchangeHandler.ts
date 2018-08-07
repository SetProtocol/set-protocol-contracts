export const ExchangeHandler = 
{
  "contractName": "ExchangeHandler",
  "abi": [],
  "bytecode": "0x605a602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a265627a7a7230582045a28d4647e9971310a11aa1b9ef5356b7c6d75c9003aa44eb2ec2500bab83a56c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a265627a7a7230582045a28d4647e9971310a11aa1b9ef5356b7c6d75c9003aa44eb2ec2500bab83a56c6578706572696d656e74616cf50037",
  "sourceMap": "811:1253:15:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "811:1253:15:-;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\n\n/**\n * @title ExchangeHandler\n * @author Set Protocol\n *\n * This library contains functions and structs to assist with parsing exchange orders data\n */\nlibrary ExchangeHandler {\n\n    // ============ Structs ============\n\n    struct ExchangeHeader {\n        uint8 exchange;\n        uint8 orderCount;\n        address makerTokenAddress;\n        uint256 makerTokenAmount;\n        uint256 totalOrdersLength;\n    }\n\n    // ============ Internal Functions ============\n\n    /**\n     * Function to convert bytes into ExchangeHeader\n     *\n     * @param _headerData      Bytes representing the order body information\n     * @return ExchangeHeader  Struct containing data for a batch of exchange orders\n     */\n    function parseExchangeHeader(\n        bytes _headerData\n    )\n        internal\n        pure\n        returns (ExchangeHeader memory)\n    {\n        ExchangeHeader memory header;\n\n        // Create ExchangeHeader struct\n        assembly {\n            mstore(header,          mload(add(_headerData, 32)))   // exchange\n            mstore(add(header, 32), mload(add(_headerData, 64)))   // orderCount\n            mstore(add(header, 64), mload(add(_headerData, 96)))   // makerTokenAddress\n            mstore(add(header, 96), mload(add(_headerData, 128)))  // makerTokenAmount\n            mstore(add(header, 128), mload(add(_headerData, 160))) // totalOrdersLength\n        }\n\n        return header;\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/ExchangeHandler.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/ExchangeHandler.sol",
    "exportedSymbols": {
      "ExchangeHandler": [
        2122
      ]
    },
    "id": 2123,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2095,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:15"
      },
      {
        "id": 2096,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:15"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title ExchangeHandler\n@author Set Protocol\n * This library contains functions and structs to assist with parsing exchange orders data",
        "fullyImplemented": true,
        "id": 2122,
        "linearizedBaseContracts": [
          2122
        ],
        "name": "ExchangeHandler",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "ExchangeHandler.ExchangeHeader",
            "id": 2107,
            "members": [
              {
                "constant": false,
                "id": 2098,
                "name": "exchange",
                "nodeType": "VariableDeclaration",
                "scope": 2107,
                "src": "916:14:15",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint8",
                  "typeString": "uint8"
                },
                "typeName": {
                  "id": 2097,
                  "name": "uint8",
                  "nodeType": "ElementaryTypeName",
                  "src": "916:5:15",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 2100,
                "name": "orderCount",
                "nodeType": "VariableDeclaration",
                "scope": 2107,
                "src": "940:16:15",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint8",
                  "typeString": "uint8"
                },
                "typeName": {
                  "id": 2099,
                  "name": "uint8",
                  "nodeType": "ElementaryTypeName",
                  "src": "940:5:15",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 2102,
                "name": "makerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 2107,
                "src": "966:25:15",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2101,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "966:7:15",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 2104,
                "name": "makerTokenAmount",
                "nodeType": "VariableDeclaration",
                "scope": 2107,
                "src": "1001:24:15",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2103,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1001:7:15",
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
                "id": 2106,
                "name": "totalOrdersLength",
                "nodeType": "VariableDeclaration",
                "scope": 2107,
                "src": "1035:25:15",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2105,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1035:7:15",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "ExchangeHeader",
            "nodeType": "StructDefinition",
            "scope": 2122,
            "src": "884:183:15",
            "visibility": "public"
          },
          {
            "body": {
              "id": 2120,
              "nodeType": "Block",
              "src": "1500:562:15",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2115,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 2121,
                      "src": "1510:28:15",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_ExchangeHeader_$2107_memory_ptr",
                        "typeString": "struct ExchangeHandler.ExchangeHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 2114,
                        "name": "ExchangeHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 2107,
                        "src": "1510:14:15",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_ExchangeHeader_$2107_storage_ptr",
                          "typeString": "struct ExchangeHandler.ExchangeHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2116,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "1510:28:15"
                },
                {
                  "externalReferences": [
                    {
                      "_headerData": {
                        "declaration": 2109,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1646:11:15",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 2115,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1619:6:15",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 2115,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1702:6:15",
                        "valueSize": 1
                      }
                    },
                    {
                      "_headerData": {
                        "declaration": 2109,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1725:11:15",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 2115,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1783:6:15",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 2115,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1871:6:15",
                        "valueSize": 1
                      }
                    },
                    {
                      "_headerData": {
                        "declaration": 2109,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1806:11:15",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 2115,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1958:6:15",
                        "valueSize": 1
                      }
                    },
                    {
                      "_headerData": {
                        "declaration": 2109,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1894:11:15",
                        "valueSize": 1
                      }
                    },
                    {
                      "_headerData": {
                        "declaration": 2109,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1982:11:15",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 2117,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(header, mload(add(_headerData, 32)))\n    mstore(add(header, 32), mload(add(_headerData, 64)))\n    mstore(add(header, 64), mload(add(_headerData, 96)))\n    mstore(add(header, 96), mload(add(_headerData, 128)))\n    mstore(add(header, 128), mload(add(_headerData, 160)))\n}",
                  "src": "1589:459:15"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2118,
                    "name": "header",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2115,
                    "src": "2049:6:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_ExchangeHeader_$2107_memory_ptr",
                      "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                    }
                  },
                  "functionReturnParameters": 2113,
                  "id": 2119,
                  "nodeType": "Return",
                  "src": "2042:13:15"
                }
              ]
            },
            "documentation": "Function to convert bytes into ExchangeHeader\n     * @param _headerData      Bytes representing the order body information\n@return ExchangeHeader  Struct containing data for a batch of exchange orders",
            "id": 2121,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseExchangeHeader",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2110,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2109,
                  "name": "_headerData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2121,
                  "src": "1402:17:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2108,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1402:5:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1392:33:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 2113,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2112,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2121,
                  "src": "1473:14:15",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_ExchangeHeader_$2107_memory_ptr",
                    "typeString": "struct ExchangeHandler.ExchangeHeader"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 2111,
                    "name": "ExchangeHeader",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 2107,
                    "src": "1473:14:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_ExchangeHeader_$2107_storage_ptr",
                      "typeString": "struct ExchangeHandler.ExchangeHeader"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1472:23:15"
            },
            "scope": 2122,
            "src": "1364:698:15",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 2123,
        "src": "811:1253:15"
      }
    ],
    "src": "597:1468:15"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/ExchangeHandler.sol",
    "exportedSymbols": {
      "ExchangeHandler": [
        2122
      ]
    },
    "id": 2123,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2095,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:15"
      },
      {
        "id": 2096,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:15"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title ExchangeHandler\n@author Set Protocol\n * This library contains functions and structs to assist with parsing exchange orders data",
        "fullyImplemented": true,
        "id": 2122,
        "linearizedBaseContracts": [
          2122
        ],
        "name": "ExchangeHandler",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "ExchangeHandler.ExchangeHeader",
            "id": 2107,
            "members": [
              {
                "constant": false,
                "id": 2098,
                "name": "exchange",
                "nodeType": "VariableDeclaration",
                "scope": 2107,
                "src": "916:14:15",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint8",
                  "typeString": "uint8"
                },
                "typeName": {
                  "id": 2097,
                  "name": "uint8",
                  "nodeType": "ElementaryTypeName",
                  "src": "916:5:15",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 2100,
                "name": "orderCount",
                "nodeType": "VariableDeclaration",
                "scope": 2107,
                "src": "940:16:15",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint8",
                  "typeString": "uint8"
                },
                "typeName": {
                  "id": 2099,
                  "name": "uint8",
                  "nodeType": "ElementaryTypeName",
                  "src": "940:5:15",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 2102,
                "name": "makerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 2107,
                "src": "966:25:15",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2101,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "966:7:15",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 2104,
                "name": "makerTokenAmount",
                "nodeType": "VariableDeclaration",
                "scope": 2107,
                "src": "1001:24:15",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2103,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1001:7:15",
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
                "id": 2106,
                "name": "totalOrdersLength",
                "nodeType": "VariableDeclaration",
                "scope": 2107,
                "src": "1035:25:15",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2105,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1035:7:15",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "ExchangeHeader",
            "nodeType": "StructDefinition",
            "scope": 2122,
            "src": "884:183:15",
            "visibility": "public"
          },
          {
            "body": {
              "id": 2120,
              "nodeType": "Block",
              "src": "1500:562:15",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2115,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 2121,
                      "src": "1510:28:15",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_ExchangeHeader_$2107_memory_ptr",
                        "typeString": "struct ExchangeHandler.ExchangeHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 2114,
                        "name": "ExchangeHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 2107,
                        "src": "1510:14:15",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_ExchangeHeader_$2107_storage_ptr",
                          "typeString": "struct ExchangeHandler.ExchangeHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2116,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "1510:28:15"
                },
                {
                  "externalReferences": [
                    {
                      "_headerData": {
                        "declaration": 2109,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1646:11:15",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 2115,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1619:6:15",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 2115,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1702:6:15",
                        "valueSize": 1
                      }
                    },
                    {
                      "_headerData": {
                        "declaration": 2109,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1725:11:15",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 2115,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1783:6:15",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 2115,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1871:6:15",
                        "valueSize": 1
                      }
                    },
                    {
                      "_headerData": {
                        "declaration": 2109,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1806:11:15",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 2115,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1958:6:15",
                        "valueSize": 1
                      }
                    },
                    {
                      "_headerData": {
                        "declaration": 2109,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1894:11:15",
                        "valueSize": 1
                      }
                    },
                    {
                      "_headerData": {
                        "declaration": 2109,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1982:11:15",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 2117,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(header, mload(add(_headerData, 32)))\n    mstore(add(header, 32), mload(add(_headerData, 64)))\n    mstore(add(header, 64), mload(add(_headerData, 96)))\n    mstore(add(header, 96), mload(add(_headerData, 128)))\n    mstore(add(header, 128), mload(add(_headerData, 160)))\n}",
                  "src": "1589:459:15"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2118,
                    "name": "header",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2115,
                    "src": "2049:6:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_ExchangeHeader_$2107_memory_ptr",
                      "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                    }
                  },
                  "functionReturnParameters": 2113,
                  "id": 2119,
                  "nodeType": "Return",
                  "src": "2042:13:15"
                }
              ]
            },
            "documentation": "Function to convert bytes into ExchangeHeader\n     * @param _headerData      Bytes representing the order body information\n@return ExchangeHeader  Struct containing data for a batch of exchange orders",
            "id": 2121,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseExchangeHeader",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2110,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2109,
                  "name": "_headerData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2121,
                  "src": "1402:17:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2108,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1402:5:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1392:33:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 2113,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2112,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2121,
                  "src": "1473:14:15",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_ExchangeHeader_$2107_memory_ptr",
                    "typeString": "struct ExchangeHandler.ExchangeHeader"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 2111,
                    "name": "ExchangeHeader",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 2107,
                    "src": "1473:14:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_ExchangeHeader_$2107_storage_ptr",
                      "typeString": "struct ExchangeHandler.ExchangeHeader"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1472:23:15"
            },
            "scope": 2122,
            "src": "1364:698:15",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 2123,
        "src": "811:1253:15"
      }
    ],
    "src": "597:1468:15"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-07T05:35:59.456Z"
}