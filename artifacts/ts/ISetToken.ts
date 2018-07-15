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
  "sourcePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
  "ast": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
    "exportedSymbols": {
      "ISetToken": [
        3318
      ]
    },
    "id": 3319,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3286,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:19"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ISetToken\n@author Set Protocol\n * The ISetToken interface provides a light-weight, structured way to interact with the\nSetToken contract from another contract.",
        "fullyImplemented": false,
        "id": 3318,
        "linearizedBaseContracts": [
          3318
        ],
        "name": "ISetToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3291,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "naturalUnit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3287,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "855:2:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3290,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3289,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3291,
                  "src": "892:4:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3288,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "892:4:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "891:6:19"
            },
            "scope": 3318,
            "src": "835:63:19",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3297,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getComponents",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3292,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "926:2:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3296,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3295,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3297,
                  "src": "962:9:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3293,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "962:7:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3294,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "962:9:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "961:11:19"
            },
            "scope": 3318,
            "src": "904:69:19",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3303,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getUnits",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3298,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "996:2:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3302,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3301,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3303,
                  "src": "1032:6:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3299,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1032:4:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3300,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1032:6:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1031:8:19"
            },
            "scope": 3318,
            "src": "979:61:19",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3310,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "mint",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3308,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3305,
                  "name": "_issuer",
                  "nodeType": "VariableDeclaration",
                  "scope": 3310,
                  "src": "1069:15:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3304,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1069:7:19",
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
                  "id": 3307,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3310,
                  "src": "1094:14:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3306,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1094:4:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1059:55:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3309,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1131:0:19"
            },
            "scope": 3318,
            "src": "1046:86:19",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3317,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "burn",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3315,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3312,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3317,
                  "src": "1161:13:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3311,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1161:7:19",
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
                  "id": 3314,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3317,
                  "src": "1184:14:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3313,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1184:4:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1151:53:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3316,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1221:0:19"
            },
            "scope": 3318,
            "src": "1138:84:19",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3319,
        "src": "809:415:19"
      }
    ],
    "src": "597:628:19"
  },
  "legacyAST": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
    "exportedSymbols": {
      "ISetToken": [
        3318
      ]
    },
    "id": 3319,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3286,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:19"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ISetToken\n@author Set Protocol\n * The ISetToken interface provides a light-weight, structured way to interact with the\nSetToken contract from another contract.",
        "fullyImplemented": false,
        "id": 3318,
        "linearizedBaseContracts": [
          3318
        ],
        "name": "ISetToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3291,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "naturalUnit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3287,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "855:2:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3290,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3289,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3291,
                  "src": "892:4:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3288,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "892:4:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "891:6:19"
            },
            "scope": 3318,
            "src": "835:63:19",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3297,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getComponents",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3292,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "926:2:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3296,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3295,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3297,
                  "src": "962:9:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3293,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "962:7:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3294,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "962:9:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "961:11:19"
            },
            "scope": 3318,
            "src": "904:69:19",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3303,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getUnits",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3298,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "996:2:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3302,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3301,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3303,
                  "src": "1032:6:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3299,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1032:4:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3300,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1032:6:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1031:8:19"
            },
            "scope": 3318,
            "src": "979:61:19",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3310,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "mint",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3308,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3305,
                  "name": "_issuer",
                  "nodeType": "VariableDeclaration",
                  "scope": 3310,
                  "src": "1069:15:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3304,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1069:7:19",
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
                  "id": 3307,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3310,
                  "src": "1094:14:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3306,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1094:4:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1059:55:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3309,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1131:0:19"
            },
            "scope": 3318,
            "src": "1046:86:19",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3317,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "burn",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3315,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3312,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3317,
                  "src": "1161:13:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3311,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1161:7:19",
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
                  "id": 3314,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3317,
                  "src": "1184:14:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3313,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1184:4:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1151:53:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3316,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1221:0:19"
            },
            "scope": 3318,
            "src": "1138:84:19",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3319,
        "src": "809:415:19"
      }
    ],
    "src": "597:628:19"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-13T21:55:38.411Z"
}