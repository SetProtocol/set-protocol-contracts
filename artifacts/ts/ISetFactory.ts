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
  "sourcePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ISetFactory.sol",
  "ast": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ISetFactory.sol",
    "exportedSymbols": {
      "ISetFactory": [
        3284
      ]
    },
    "id": 3285,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3261,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:18"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ISetFactory\n@author Set Protocol\n * The ITransferProxy interface provides operability for authorized contracts\nto interact with SetTokenFactory",
        "fullyImplemented": false,
        "id": 3284,
        "linearizedBaseContracts": [
          3284
        ],
        "name": "ISetFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3266,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "core",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3262,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "835:2:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 3265,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3264,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3266,
                  "src": "856:7:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3263,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "856:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "855:9:18"
            },
            "scope": 3284,
            "src": "822:43:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3283,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3279,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3269,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 3283,
                  "src": "896:21:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3267,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "896:7:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3268,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "896:9:18",
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
                  "id": 3272,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 3283,
                  "src": "927:13:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3270,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "927:4:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3271,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "927:6:18",
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
                  "id": 3274,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 3283,
                  "src": "950:17:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3273,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "950:4:18",
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
                  "id": 3276,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 3283,
                  "src": "977:12:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 3275,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "977:6:18",
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
                  "id": 3278,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 3283,
                  "src": "999:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 3277,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "999:6:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "886:133:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 3282,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3281,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3283,
                  "src": "1054:7:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3280,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1054:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1053:9:18"
            },
            "scope": 3284,
            "src": "871:192:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3285,
        "src": "794:271:18"
      }
    ],
    "src": "597:469:18"
  },
  "legacyAST": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ISetFactory.sol",
    "exportedSymbols": {
      "ISetFactory": [
        3284
      ]
    },
    "id": 3285,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3261,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:18"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ISetFactory\n@author Set Protocol\n * The ITransferProxy interface provides operability for authorized contracts\nto interact with SetTokenFactory",
        "fullyImplemented": false,
        "id": 3284,
        "linearizedBaseContracts": [
          3284
        ],
        "name": "ISetFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3266,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "core",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3262,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "835:2:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 3265,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3264,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3266,
                  "src": "856:7:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3263,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "856:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "855:9:18"
            },
            "scope": 3284,
            "src": "822:43:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3283,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3279,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3269,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 3283,
                  "src": "896:21:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3267,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "896:7:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3268,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "896:9:18",
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
                  "id": 3272,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 3283,
                  "src": "927:13:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3270,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "927:4:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3271,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "927:6:18",
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
                  "id": 3274,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 3283,
                  "src": "950:17:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3273,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "950:4:18",
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
                  "id": 3276,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 3283,
                  "src": "977:12:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 3275,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "977:6:18",
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
                  "id": 3278,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 3283,
                  "src": "999:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 3277,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "999:6:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "886:133:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 3282,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3281,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3283,
                  "src": "1054:7:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3280,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1054:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1053:9:18"
            },
            "scope": 3284,
            "src": "871:192:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3285,
        "src": "794:271:18"
      }
    ],
    "src": "597:469:18"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-13T21:55:38.410Z"
}