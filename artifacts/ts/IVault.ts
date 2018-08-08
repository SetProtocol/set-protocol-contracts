export const IVault = 
{
  "contractName": "IVault",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_token",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "withdrawTo",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_token",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "incrementTokenOwner",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_token",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "decrementTokenOwner",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_token",
          "type": "address"
        }
      ],
      "name": "getOwnerBalance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
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
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n/**\n * @title IVault\n * @author Set Protocol\n *\n * The IVault interface provides a light-weight, structured way to interact with the Vault\n * contract from another contract.\n */\ninterface IVault {\n\n    /*\n     * Withdraws user's unassociated tokens to user account. Can only be\n     * called by authorized core contracts.\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _to             The address to transfer token to\n     * @param  _quantity       The number of tokens to transfer\n     */\n    function withdrawTo(\n        address _token,\n        address _to,\n        uint _quantity\n    )\n        external;\n\n    /*\n     * Increment quantity owned of a token for a given address. Can\n     * only be called by authorized core contracts.\n     *\n     * @param  _owner           The address of the token owner\n     * @param  _token           The address of the ERC20 token\n     * @param  _quantity        The number of tokens to attribute to owner\n     */\n    function incrementTokenOwner(\n        address _owner,\n        address _token,\n        uint _quantity\n    )\n        external;\n\n    /*\n     * Decrement quantity owned of a token for a given address. Can only\n     * be called by authorized core contracts.\n     *\n     * @param  _owner           The address of the token owner\n     * @param  _token           The address of the ERC20 token\n     * @param  _quantity        The number of tokens to deattribute to owner\n     */\n    function decrementTokenOwner(\n        address _owner,\n        address _token,\n        uint _quantity\n    )\n        external;\n\n    /*\n     * Get balance of particular contract for owner.\n     *\n     * @param  _owner    The address of the token owner\n     * @param  _token    The address of the ERC20 token\n     */\n    function getOwnerBalance(\n        address _owner,\n        address _token\n    )\n        external\n        returns (uint256);\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
    "exportedSymbols": {
      "IVault": [
        2607
      ]
    },
    "id": 2608,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2570,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:15"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title IVault\n@author Set Protocol\n * The IVault interface provides a light-weight, structured way to interact with the Vault\ncontract from another contract.",
        "fullyImplemented": false,
        "id": 2607,
        "linearizedBaseContracts": [
          2607
        ],
        "name": "IVault",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 2579,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdrawTo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2577,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2572,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 2579,
                  "src": "1182:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2571,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1182:7:15",
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
                  "id": 2574,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 2579,
                  "src": "1206:11:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2573,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1206:7:15",
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
                  "id": 2576,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2579,
                  "src": "1227:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2575,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1227:4:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1172:75:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 2578,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1264:0:15"
            },
            "scope": 2607,
            "src": "1153:112:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 2588,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "incrementTokenOwner",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2586,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2581,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 2588,
                  "src": "1652:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2580,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1652:7:15",
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
                  "id": 2583,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 2588,
                  "src": "1676:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2582,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1676:7:15",
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
                  "id": 2585,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2588,
                  "src": "1700:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2584,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1700:4:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1642:78:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 2587,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1737:0:15"
            },
            "scope": 2607,
            "src": "1614:124:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 2597,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "decrementTokenOwner",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2595,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2590,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 2597,
                  "src": "2127:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2589,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2127:7:15",
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
                  "id": 2592,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 2597,
                  "src": "2151:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2591,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2151:7:15",
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
                  "id": 2594,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2597,
                  "src": "2175:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2593,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2175:4:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2117:78:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 2596,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2212:0:15"
            },
            "scope": 2607,
            "src": "2089:124:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 2606,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getOwnerBalance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2602,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2599,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 2606,
                  "src": "2440:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2598,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2440:7:15",
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
                  "id": 2601,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 2606,
                  "src": "2464:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2600,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2464:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2430:54:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 2605,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2604,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2606,
                  "src": "2519:7:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2603,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2519:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2518:9:15"
            },
            "scope": 2607,
            "src": "2406:122:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2608,
        "src": "800:1730:15"
      }
    ],
    "src": "597:1934:15"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
    "exportedSymbols": {
      "IVault": [
        2607
      ]
    },
    "id": 2608,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2570,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:15"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title IVault\n@author Set Protocol\n * The IVault interface provides a light-weight, structured way to interact with the Vault\ncontract from another contract.",
        "fullyImplemented": false,
        "id": 2607,
        "linearizedBaseContracts": [
          2607
        ],
        "name": "IVault",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 2579,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdrawTo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2577,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2572,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 2579,
                  "src": "1182:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2571,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1182:7:15",
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
                  "id": 2574,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 2579,
                  "src": "1206:11:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2573,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1206:7:15",
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
                  "id": 2576,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2579,
                  "src": "1227:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2575,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1227:4:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1172:75:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 2578,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1264:0:15"
            },
            "scope": 2607,
            "src": "1153:112:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 2588,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "incrementTokenOwner",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2586,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2581,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 2588,
                  "src": "1652:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2580,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1652:7:15",
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
                  "id": 2583,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 2588,
                  "src": "1676:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2582,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1676:7:15",
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
                  "id": 2585,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2588,
                  "src": "1700:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2584,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1700:4:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1642:78:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 2587,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1737:0:15"
            },
            "scope": 2607,
            "src": "1614:124:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 2597,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "decrementTokenOwner",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2595,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2590,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 2597,
                  "src": "2127:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2589,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2127:7:15",
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
                  "id": 2592,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 2597,
                  "src": "2151:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2591,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2151:7:15",
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
                  "id": 2594,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2597,
                  "src": "2175:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2593,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2175:4:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2117:78:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 2596,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2212:0:15"
            },
            "scope": 2607,
            "src": "2089:124:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 2606,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getOwnerBalance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2602,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2599,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 2606,
                  "src": "2440:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2598,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2440:7:15",
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
                  "id": 2601,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 2606,
                  "src": "2464:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2600,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2464:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2430:54:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 2605,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2604,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2606,
                  "src": "2519:7:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2603,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2519:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2518:9:15"
            },
            "scope": 2607,
            "src": "2406:122:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2608,
        "src": "800:1730:15"
      }
    ],
    "src": "597:1934:15"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-08T05:31:02.862Z"
}