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
        3602
      ]
    },
    "id": 3603,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3565,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:22"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title IVault\n@author Set Protocol\n * The IVault interface provides a light-weight, structured way to interact with the Vault\ncontract from another contract.",
        "fullyImplemented": false,
        "id": 3602,
        "linearizedBaseContracts": [
          3602
        ],
        "name": "IVault",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3574,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdrawTo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3572,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3567,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3574,
                  "src": "1182:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3566,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1182:7:22",
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
                  "id": 3569,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3574,
                  "src": "1206:11:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3568,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1206:7:22",
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
                  "id": 3571,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3574,
                  "src": "1227:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3570,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1227:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1172:75:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3573,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1264:0:22"
            },
            "scope": 3602,
            "src": "1153:112:22",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3583,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "incrementTokenOwner",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3581,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3576,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3583,
                  "src": "1652:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3575,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1652:7:22",
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
                  "id": 3578,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3583,
                  "src": "1676:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3577,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1676:7:22",
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
                  "id": 3580,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3583,
                  "src": "1700:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3579,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1700:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1642:78:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3582,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1737:0:22"
            },
            "scope": 3602,
            "src": "1614:124:22",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3592,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "decrementTokenOwner",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3590,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3585,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3592,
                  "src": "2127:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3584,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2127:7:22",
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
                  "id": 3587,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3592,
                  "src": "2151:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3586,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2151:7:22",
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
                  "id": 3589,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3592,
                  "src": "2175:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3588,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2175:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2117:78:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3591,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2212:0:22"
            },
            "scope": 3602,
            "src": "2089:124:22",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3601,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getOwnerBalance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3597,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3594,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3601,
                  "src": "2440:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3593,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2440:7:22",
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
                  "id": 3596,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3601,
                  "src": "2464:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3595,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2464:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2430:54:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3600,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3599,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3601,
                  "src": "2519:7:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3598,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2519:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2518:9:22"
            },
            "scope": 3602,
            "src": "2406:122:22",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3603,
        "src": "800:1730:22"
      }
    ],
    "src": "597:1934:22"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
    "exportedSymbols": {
      "IVault": [
        3602
      ]
    },
    "id": 3603,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3565,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:22"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title IVault\n@author Set Protocol\n * The IVault interface provides a light-weight, structured way to interact with the Vault\ncontract from another contract.",
        "fullyImplemented": false,
        "id": 3602,
        "linearizedBaseContracts": [
          3602
        ],
        "name": "IVault",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3574,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdrawTo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3572,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3567,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3574,
                  "src": "1182:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3566,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1182:7:22",
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
                  "id": 3569,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3574,
                  "src": "1206:11:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3568,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1206:7:22",
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
                  "id": 3571,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3574,
                  "src": "1227:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3570,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1227:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1172:75:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3573,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1264:0:22"
            },
            "scope": 3602,
            "src": "1153:112:22",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3583,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "incrementTokenOwner",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3581,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3576,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3583,
                  "src": "1652:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3575,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1652:7:22",
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
                  "id": 3578,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3583,
                  "src": "1676:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3577,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1676:7:22",
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
                  "id": 3580,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3583,
                  "src": "1700:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3579,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1700:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1642:78:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3582,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1737:0:22"
            },
            "scope": 3602,
            "src": "1614:124:22",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3592,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "decrementTokenOwner",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3590,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3585,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3592,
                  "src": "2127:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3584,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2127:7:22",
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
                  "id": 3587,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3592,
                  "src": "2151:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3586,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2151:7:22",
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
                  "id": 3589,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3592,
                  "src": "2175:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3588,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2175:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2117:78:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3591,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2212:0:22"
            },
            "scope": 3602,
            "src": "2089:124:22",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3601,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getOwnerBalance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3597,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3594,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3601,
                  "src": "2440:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3593,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2440:7:22",
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
                  "id": 3596,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3601,
                  "src": "2464:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3595,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2464:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2430:54:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3600,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3599,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3601,
                  "src": "2519:7:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3598,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2519:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2518:9:22"
            },
            "scope": 3602,
            "src": "2406:122:22",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3603,
        "src": "800:1730:22"
      }
    ],
    "src": "597:1934:22"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-27T04:20:39.822Z"
}