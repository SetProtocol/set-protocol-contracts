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
        2805
      ]
    },
    "id": 2806,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2782,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:17"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ISetFactory\n@author Set Protocol\n * The ITransferProxy interface provides operability for authorized contracts\nto interact with SetTokenFactory",
        "fullyImplemented": false,
        "id": 2805,
        "linearizedBaseContracts": [
          2805
        ],
        "name": "ISetFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 2787,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "core",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2783,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "835:2:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 2786,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2785,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2787,
                  "src": "856:7:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2784,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "856:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "855:9:17"
            },
            "scope": 2805,
            "src": "822:43:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 2804,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2800,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2790,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 2804,
                  "src": "896:21:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2788,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "896:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2789,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "896:9:17",
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
                  "id": 2793,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 2804,
                  "src": "927:13:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2791,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "927:4:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2792,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "927:6:17",
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
                  "id": 2795,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 2804,
                  "src": "950:17:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2794,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "950:4:17",
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
                  "id": 2797,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 2804,
                  "src": "977:12:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 2796,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "977:6:17",
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
                  "id": 2799,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 2804,
                  "src": "999:14:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 2798,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "999:6:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "886:133:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 2803,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2802,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2804,
                  "src": "1054:7:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2801,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1054:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1053:9:17"
            },
            "scope": 2805,
            "src": "871:192:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2806,
        "src": "794:271:17"
      }
    ],
    "src": "597:469:17"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetFactory.sol",
    "exportedSymbols": {
      "ISetFactory": [
        2805
      ]
    },
    "id": 2806,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2782,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:17"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ISetFactory\n@author Set Protocol\n * The ITransferProxy interface provides operability for authorized contracts\nto interact with SetTokenFactory",
        "fullyImplemented": false,
        "id": 2805,
        "linearizedBaseContracts": [
          2805
        ],
        "name": "ISetFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 2787,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "core",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2783,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "835:2:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 2786,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2785,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2787,
                  "src": "856:7:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2784,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "856:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "855:9:17"
            },
            "scope": 2805,
            "src": "822:43:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 2804,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2800,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2790,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 2804,
                  "src": "896:21:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2788,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "896:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2789,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "896:9:17",
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
                  "id": 2793,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 2804,
                  "src": "927:13:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2791,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "927:4:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2792,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "927:6:17",
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
                  "id": 2795,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 2804,
                  "src": "950:17:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2794,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "950:4:17",
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
                  "id": 2797,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 2804,
                  "src": "977:12:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 2796,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "977:6:17",
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
                  "id": 2799,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 2804,
                  "src": "999:14:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 2798,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "999:6:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "886:133:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 2803,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2802,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2804,
                  "src": "1054:7:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2801,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1054:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1053:9:17"
            },
            "scope": 2805,
            "src": "871:192:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2806,
        "src": "794:271:17"
      }
    ],
    "src": "597:469:17"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-08T01:11:15.196Z"
}