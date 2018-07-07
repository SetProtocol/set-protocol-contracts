export const ISetToken = 
{
  "contractName": "ISetToken",
  "abi": [
    {
      "constant": false,
      "inputs": [],
      "name": "naturalUnit",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "getComponents",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "getUnits",
      "outputs": [
        {
          "name": "",
          "type": "uint256[]"
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
          "name": "_issuer",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n/**\n * @title ISetToken\n * @author Set Protocol\n *\n * The ISetToken interface provides a light-weight, structured way to interact with the\n * SetToken contract from another contract.\n */\ninterface ISetToken {\n    function naturalUnit()\n        external\n        returns (uint);\n\n    function getComponents()\n        external\n        returns(address[]);\n\n    function getUnits()\n        external\n        returns(uint[]);\n\n    function mint(\n        address _issuer,\n        uint _quantity\n    )\n        external;\n\n    function burn(\n        address _from,\n        uint _quantity\n    )\n        external;\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
    "exportedSymbols": {
      "ISetToken": [
        2504
      ]
    },
    "id": 2505,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2472,
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
        "documentation": "@title ISetToken\n@author Set Protocol\n * The ISetToken interface provides a light-weight, structured way to interact with the\nSetToken contract from another contract.",
        "fullyImplemented": false,
        "id": 2504,
        "linearizedBaseContracts": [
          2504
        ],
        "name": "ISetToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 2477,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "naturalUnit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2473,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "855:2:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 2476,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2475,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2477,
                  "src": "892:4:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2474,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "892:4:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "891:6:18"
            },
            "scope": 2504,
            "src": "835:63:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 2483,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getComponents",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2478,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "926:2:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 2482,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2481,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2483,
                  "src": "962:9:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2479,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "962:7:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2480,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "962:9:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "961:11:18"
            },
            "scope": 2504,
            "src": "904:69:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 2489,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getUnits",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2484,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "996:2:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 2488,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2487,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2489,
                  "src": "1032:6:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2485,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1032:4:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2486,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1032:6:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1031:8:18"
            },
            "scope": 2504,
            "src": "979:61:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 2496,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "mint",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2494,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2491,
                  "name": "_issuer",
                  "nodeType": "VariableDeclaration",
                  "scope": 2496,
                  "src": "1069:15:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2490,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1069:7:18",
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
                  "id": 2493,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2496,
                  "src": "1094:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2492,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1094:4:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1059:55:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 2495,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1131:0:18"
            },
            "scope": 2504,
            "src": "1046:86:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 2503,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "burn",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2501,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2498,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 2503,
                  "src": "1161:13:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2497,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1161:7:18",
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
                  "id": 2500,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2503,
                  "src": "1184:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2499,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1184:4:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1151:53:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 2502,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1221:0:18"
            },
            "scope": 2504,
            "src": "1138:84:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2505,
        "src": "809:415:18"
      }
    ],
    "src": "597:628:18"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
    "exportedSymbols": {
      "ISetToken": [
        2504
      ]
    },
    "id": 2505,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2472,
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
        "documentation": "@title ISetToken\n@author Set Protocol\n * The ISetToken interface provides a light-weight, structured way to interact with the\nSetToken contract from another contract.",
        "fullyImplemented": false,
        "id": 2504,
        "linearizedBaseContracts": [
          2504
        ],
        "name": "ISetToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 2477,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "naturalUnit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2473,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "855:2:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 2476,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2475,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2477,
                  "src": "892:4:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2474,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "892:4:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "891:6:18"
            },
            "scope": 2504,
            "src": "835:63:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 2483,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getComponents",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2478,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "926:2:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 2482,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2481,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2483,
                  "src": "962:9:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2479,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "962:7:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2480,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "962:9:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "961:11:18"
            },
            "scope": 2504,
            "src": "904:69:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 2489,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getUnits",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2484,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "996:2:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 2488,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2487,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2489,
                  "src": "1032:6:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2485,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1032:4:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2486,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1032:6:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1031:8:18"
            },
            "scope": 2504,
            "src": "979:61:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 2496,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "mint",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2494,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2491,
                  "name": "_issuer",
                  "nodeType": "VariableDeclaration",
                  "scope": 2496,
                  "src": "1069:15:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2490,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1069:7:18",
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
                  "id": 2493,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2496,
                  "src": "1094:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2492,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1094:4:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1059:55:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 2495,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1131:0:18"
            },
            "scope": 2504,
            "src": "1046:86:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 2503,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "burn",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2501,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2498,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 2503,
                  "src": "1161:13:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2497,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1161:7:18",
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
                  "id": 2500,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2503,
                  "src": "1184:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2499,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1184:4:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1151:53:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 2502,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1221:0:18"
            },
            "scope": 2504,
            "src": "1138:84:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2505,
        "src": "809:415:18"
      }
    ],
    "src": "597:628:18"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-07T07:45:08.904Z"
}