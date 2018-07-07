export const ISetFactory = 
{
  "contractName": "ISetFactory",
  "abi": [
    {
      "constant": false,
      "inputs": [],
      "name": "core",
      "outputs": [
        {
          "name": "",
          "type": "address"
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
          "name": "_components",
          "type": "address[]"
        },
        {
          "name": "_units",
          "type": "uint256[]"
        },
        {
          "name": "_naturalUnit",
          "type": "uint256"
        },
        {
          "name": "_name",
          "type": "string"
        },
        {
          "name": "_symbol",
          "type": "string"
        }
      ],
      "name": "create",
      "outputs": [
        {
          "name": "",
          "type": "address"
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
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\n/**\n * @title ISetFactory\n * @author Set Protocol\n *\n * The ITransferProxy interface provides operability for authorized contracts\n * to interact with SetTokenFactory\n */\ninterface ISetFactory {\n    function core() external returns (address);\n\n    function create(\n        address[] _components,\n        uint[] _units,\n        uint _naturalUnit,\n        string _name,\n        string _symbol\n    )\n        external\n        returns (address);\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetFactory.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetFactory.sol",
    "exportedSymbols": {
      "ISetFactory": [
        574
      ]
    },
    "id": 575,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 551,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:2"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ISetFactory\n@author Set Protocol\n * The ITransferProxy interface provides operability for authorized contracts\nto interact with SetTokenFactory",
        "fullyImplemented": false,
        "id": 574,
        "linearizedBaseContracts": [
          574
        ],
        "name": "ISetFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 556,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "core",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 552,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "835:2:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 555,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 554,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 556,
                  "src": "856:7:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 553,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "856:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "855:9:2"
            },
            "scope": 574,
            "src": "822:43:2",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 573,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 569,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 559,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 573,
                  "src": "896:21:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 557,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "896:7:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 558,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "896:9:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 562,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 573,
                  "src": "927:13:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 560,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "927:4:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 561,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "927:6:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 564,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 573,
                  "src": "950:17:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 563,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "950:4:2",
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
                  "id": 566,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 573,
                  "src": "977:12:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 565,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "977:6:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 568,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 573,
                  "src": "999:14:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 567,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "999:6:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "886:133:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 572,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 571,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 573,
                  "src": "1054:7:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 570,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1054:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1053:9:2"
            },
            "scope": 574,
            "src": "871:192:2",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 575,
        "src": "794:271:2"
      }
    ],
    "src": "597:469:2"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetFactory.sol",
    "exportedSymbols": {
      "ISetFactory": [
        574
      ]
    },
    "id": 575,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 551,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:2"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ISetFactory\n@author Set Protocol\n * The ITransferProxy interface provides operability for authorized contracts\nto interact with SetTokenFactory",
        "fullyImplemented": false,
        "id": 574,
        "linearizedBaseContracts": [
          574
        ],
        "name": "ISetFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 556,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "core",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 552,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "835:2:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 555,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 554,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 556,
                  "src": "856:7:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 553,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "856:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "855:9:2"
            },
            "scope": 574,
            "src": "822:43:2",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 573,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 569,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 559,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 573,
                  "src": "896:21:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 557,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "896:7:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 558,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "896:9:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 562,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 573,
                  "src": "927:13:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 560,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "927:4:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 561,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "927:6:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 564,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 573,
                  "src": "950:17:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 563,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "950:4:2",
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
                  "id": 566,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 573,
                  "src": "977:12:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 565,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "977:6:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 568,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 573,
                  "src": "999:14:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 567,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "999:6:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "886:133:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 572,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 571,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 573,
                  "src": "1054:7:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 570,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1054:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1053:9:2"
            },
            "scope": 574,
            "src": "871:192:2",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 575,
        "src": "794:271:2"
      }
    ],
    "src": "597:469:2"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-07T15:28:53.725Z"
}