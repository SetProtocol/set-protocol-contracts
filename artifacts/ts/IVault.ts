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
          "name": "_token",
          "type": "address"
        },
        {
          "name": "_owner",
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
          "name": "_token",
          "type": "address"
        },
        {
          "name": "_owner",
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
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_from",
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
      "name": "transferBalance",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_token",
          "type": "address"
        },
        {
          "name": "_owner",
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
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n/**\n * @title IVault\n * @author Set Protocol\n *\n * The IVault interface provides a light-weight, structured way to interact with the Vault\n * contract from another contract.\n */\ninterface IVault {\n\n    /*\n     * Withdraws user's unassociated tokens to user account. Can only be\n     * called by authorized core contracts.\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _to             The address to transfer token to\n     * @param  _quantity       The number of tokens to transfer\n     */\n    function withdrawTo(\n        address _token,\n        address _to,\n        uint256 _quantity\n    )\n        external;\n\n    /*\n     * Increment quantity owned of a token for a given address. Can\n     * only be called by authorized core contracts.\n     *\n     * @param  _token           The address of the ERC20 token\n     * @param  _owner           The address of the token owner\n     * @param  _quantity        The number of tokens to attribute to owner\n     */\n    function incrementTokenOwner(\n        address _token,\n        address _owner,\n        uint256 _quantity\n    )\n        external;\n\n    /*\n     * Decrement quantity owned of a token for a given address. Can only\n     * be called by authorized core contracts.\n     *\n     * @param  _token           The address of the ERC20 token\n     * @param  _owner           The address of the token owner\n     * @param  _quantity        The number of tokens to deattribute to owner\n     */\n    function decrementTokenOwner(\n        address _token,\n        address _owner,\n        uint256 _quantity\n    )\n        external;\n\n    /**\n     * Transfers tokens associated with one account to another account in the vault\n     *\n     * @param  _to             Address token being transferred to\n     * @param  _from           Address token being transferred from\n     * @param  _token          Address of token being transferred\n     * @param  _quantity       Amount of tokens being transferred\n     */\n\n    function transferBalance(\n        address _to,\n        address _from,\n        address _token,\n        uint256 _quantity\n    )\n        external;\n\n    /*\n     * Get balance of particular contract for owner.\n     *\n     * @param  _token    The address of the ERC20 token\n     * @param  _owner    The address of the token owner\n     */\n    function getOwnerBalance(\n        address _token,\n        address _owner\n    )\n        external\n        returns (uint256);\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
    "exportedSymbols": {
      "IVault": [
        3469
      ]
    },
    "id": 3470,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3421,
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
        "documentation": "@title IVault\n@author Set Protocol\n * The IVault interface provides a light-weight, structured way to interact with the Vault\ncontract from another contract.",
        "fullyImplemented": false,
        "id": 3469,
        "linearizedBaseContracts": [
          3469
        ],
        "name": "IVault",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3430,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdrawTo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3428,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3423,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3430,
                  "src": "1182:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3422,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1182:7:18",
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
                  "id": 3425,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3430,
                  "src": "1206:11:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3424,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1206:7:18",
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
                  "id": 3427,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3430,
                  "src": "1227:17:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3426,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1227:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1172:78:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 3429,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1267:0:18"
            },
            "scope": 3469,
            "src": "1153:115:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3439,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "incrementTokenOwner",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3437,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3432,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3439,
                  "src": "1655:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3431,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1655:7:18",
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
                  "id": 3434,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3439,
                  "src": "1679:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3433,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1679:7:18",
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
                  "id": 3436,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3439,
                  "src": "1703:17:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3435,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1703:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1645:81:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 3438,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1743:0:18"
            },
            "scope": 3469,
            "src": "1617:127:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3448,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "decrementTokenOwner",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3446,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3441,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3448,
                  "src": "2133:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3440,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2133:7:18",
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
                  "id": 3443,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3448,
                  "src": "2157:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3442,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2157:7:18",
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
                  "id": 3445,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3448,
                  "src": "2181:17:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3444,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2181:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2123:81:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 3447,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2221:0:18"
            },
            "scope": 3469,
            "src": "2095:127:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Transfers tokens associated with one account to another account in the vault\n     * @param  _to             Address token being transferred to\n@param  _from           Address token being transferred from\n@param  _token          Address of token being transferred\n@param  _quantity       Amount of tokens being transferred",
            "id": 3459,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferBalance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3457,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3450,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3459,
                  "src": "2636:11:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3449,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2636:7:18",
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
                  "id": 3452,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3459,
                  "src": "2657:13:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3451,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2657:7:18",
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
                  "id": 3454,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3459,
                  "src": "2680:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3453,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2680:7:18",
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
                  "id": 3456,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3459,
                  "src": "2704:17:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3455,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2704:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2626:101:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 3458,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2744:0:18"
            },
            "scope": 3469,
            "src": "2602:143:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3468,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getOwnerBalance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3464,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3461,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3468,
                  "src": "2972:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3460,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2972:7:18",
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
                  "id": 3463,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3468,
                  "src": "2996:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3462,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2996:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2962:54:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 3467,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3466,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3468,
                  "src": "3051:7:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3465,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3051:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3050:9:18"
            },
            "scope": 3469,
            "src": "2938:122:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3470,
        "src": "800:2262:18"
      }
    ],
    "src": "597:2466:18"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
    "exportedSymbols": {
      "IVault": [
        3469
      ]
    },
    "id": 3470,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3421,
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
        "documentation": "@title IVault\n@author Set Protocol\n * The IVault interface provides a light-weight, structured way to interact with the Vault\ncontract from another contract.",
        "fullyImplemented": false,
        "id": 3469,
        "linearizedBaseContracts": [
          3469
        ],
        "name": "IVault",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3430,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdrawTo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3428,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3423,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3430,
                  "src": "1182:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3422,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1182:7:18",
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
                  "id": 3425,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3430,
                  "src": "1206:11:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3424,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1206:7:18",
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
                  "id": 3427,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3430,
                  "src": "1227:17:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3426,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1227:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1172:78:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 3429,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1267:0:18"
            },
            "scope": 3469,
            "src": "1153:115:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3439,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "incrementTokenOwner",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3437,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3432,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3439,
                  "src": "1655:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3431,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1655:7:18",
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
                  "id": 3434,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3439,
                  "src": "1679:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3433,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1679:7:18",
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
                  "id": 3436,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3439,
                  "src": "1703:17:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3435,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1703:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1645:81:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 3438,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1743:0:18"
            },
            "scope": 3469,
            "src": "1617:127:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3448,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "decrementTokenOwner",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3446,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3441,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3448,
                  "src": "2133:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3440,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2133:7:18",
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
                  "id": 3443,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3448,
                  "src": "2157:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3442,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2157:7:18",
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
                  "id": 3445,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3448,
                  "src": "2181:17:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3444,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2181:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2123:81:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 3447,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2221:0:18"
            },
            "scope": 3469,
            "src": "2095:127:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Transfers tokens associated with one account to another account in the vault\n     * @param  _to             Address token being transferred to\n@param  _from           Address token being transferred from\n@param  _token          Address of token being transferred\n@param  _quantity       Amount of tokens being transferred",
            "id": 3459,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferBalance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3457,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3450,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3459,
                  "src": "2636:11:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3449,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2636:7:18",
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
                  "id": 3452,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3459,
                  "src": "2657:13:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3451,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2657:7:18",
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
                  "id": 3454,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3459,
                  "src": "2680:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3453,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2680:7:18",
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
                  "id": 3456,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3459,
                  "src": "2704:17:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3455,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2704:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2626:101:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 3458,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2744:0:18"
            },
            "scope": 3469,
            "src": "2602:143:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3468,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getOwnerBalance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3464,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3461,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3468,
                  "src": "2972:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3460,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2972:7:18",
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
                  "id": 3463,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3468,
                  "src": "2996:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3462,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2996:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2962:54:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 3467,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3466,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3468,
                  "src": "3051:7:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3465,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3051:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3050:9:18"
            },
            "scope": 3469,
            "src": "2938:122:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3470,
        "src": "800:2262:18"
      }
    ],
    "src": "597:2466:18"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T15:29:45.027Z"
}