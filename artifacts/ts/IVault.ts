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
        4385
      ]
    },
    "id": 4386,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4337,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:25"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title IVault\n@author Set Protocol\n * The IVault interface provides a light-weight, structured way to interact with the Vault\ncontract from another contract.",
        "fullyImplemented": false,
        "id": 4385,
        "linearizedBaseContracts": [
          4385
        ],
        "name": "IVault",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 4346,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdrawTo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4344,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4339,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4346,
                  "src": "1182:14:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4338,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1182:7:25",
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
                  "id": 4341,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4346,
                  "src": "1206:11:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4340,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1206:7:25",
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
                  "id": 4343,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4346,
                  "src": "1227:17:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4342,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1227:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1172:78:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 4345,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1267:0:25"
            },
            "scope": 4385,
            "src": "1153:115:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 4355,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "incrementTokenOwner",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4353,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4348,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4355,
                  "src": "1655:14:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4347,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1655:7:25",
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
                  "id": 4350,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 4355,
                  "src": "1679:14:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4349,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1679:7:25",
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
                  "id": 4352,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4355,
                  "src": "1703:17:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4351,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1703:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1645:81:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 4354,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1743:0:25"
            },
            "scope": 4385,
            "src": "1617:127:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 4364,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "decrementTokenOwner",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4362,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4357,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4364,
                  "src": "2133:14:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4356,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2133:7:25",
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
                  "id": 4359,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 4364,
                  "src": "2157:14:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4358,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2157:7:25",
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
                  "id": 4361,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4364,
                  "src": "2181:17:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4360,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2181:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2123:81:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 4363,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2221:0:25"
            },
            "scope": 4385,
            "src": "2095:127:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Transfers tokens associated with one account to another account in the vault\n     * @param  _to             Address token being transferred to\n@param  _from           Address token being transferred from\n@param  _token          Address of token being transferred\n@param  _quantity       Amount of tokens being transferred",
            "id": 4375,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferBalance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4373,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4366,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4375,
                  "src": "2636:11:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4365,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2636:7:25",
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
                  "id": 4368,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 4375,
                  "src": "2657:13:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4367,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2657:7:25",
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
                  "id": 4370,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4375,
                  "src": "2680:14:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4369,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2680:7:25",
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
                  "id": 4372,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4375,
                  "src": "2704:17:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4371,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2704:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2626:101:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 4374,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2744:0:25"
            },
            "scope": 4385,
            "src": "2602:143:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 4384,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getOwnerBalance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4380,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4377,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4384,
                  "src": "2972:14:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4376,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2972:7:25",
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
                  "id": 4379,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 4384,
                  "src": "2996:14:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4378,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2996:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2962:54:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 4383,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4382,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4384,
                  "src": "3051:7:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4381,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3051:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3050:9:25"
            },
            "scope": 4385,
            "src": "2938:122:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4386,
        "src": "800:2262:25"
      }
    ],
    "src": "597:2466:25"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
    "exportedSymbols": {
      "IVault": [
        4385
      ]
    },
    "id": 4386,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4337,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:25"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title IVault\n@author Set Protocol\n * The IVault interface provides a light-weight, structured way to interact with the Vault\ncontract from another contract.",
        "fullyImplemented": false,
        "id": 4385,
        "linearizedBaseContracts": [
          4385
        ],
        "name": "IVault",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 4346,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdrawTo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4344,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4339,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4346,
                  "src": "1182:14:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4338,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1182:7:25",
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
                  "id": 4341,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4346,
                  "src": "1206:11:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4340,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1206:7:25",
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
                  "id": 4343,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4346,
                  "src": "1227:17:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4342,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1227:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1172:78:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 4345,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1267:0:25"
            },
            "scope": 4385,
            "src": "1153:115:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 4355,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "incrementTokenOwner",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4353,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4348,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4355,
                  "src": "1655:14:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4347,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1655:7:25",
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
                  "id": 4350,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 4355,
                  "src": "1679:14:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4349,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1679:7:25",
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
                  "id": 4352,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4355,
                  "src": "1703:17:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4351,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1703:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1645:81:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 4354,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1743:0:25"
            },
            "scope": 4385,
            "src": "1617:127:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 4364,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "decrementTokenOwner",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4362,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4357,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4364,
                  "src": "2133:14:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4356,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2133:7:25",
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
                  "id": 4359,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 4364,
                  "src": "2157:14:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4358,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2157:7:25",
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
                  "id": 4361,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4364,
                  "src": "2181:17:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4360,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2181:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2123:81:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 4363,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2221:0:25"
            },
            "scope": 4385,
            "src": "2095:127:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Transfers tokens associated with one account to another account in the vault\n     * @param  _to             Address token being transferred to\n@param  _from           Address token being transferred from\n@param  _token          Address of token being transferred\n@param  _quantity       Amount of tokens being transferred",
            "id": 4375,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferBalance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4373,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4366,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4375,
                  "src": "2636:11:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4365,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2636:7:25",
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
                  "id": 4368,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 4375,
                  "src": "2657:13:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4367,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2657:7:25",
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
                  "id": 4370,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4375,
                  "src": "2680:14:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4369,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2680:7:25",
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
                  "id": 4372,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4375,
                  "src": "2704:17:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4371,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2704:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2626:101:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 4374,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2744:0:25"
            },
            "scope": 4385,
            "src": "2602:143:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 4384,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getOwnerBalance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4380,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4377,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4384,
                  "src": "2972:14:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4376,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2972:7:25",
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
                  "id": 4379,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 4384,
                  "src": "2996:14:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4378,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2996:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2962:54:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 4383,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4382,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4384,
                  "src": "3051:7:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4381,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3051:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3050:9:25"
            },
            "scope": 4385,
            "src": "2938:122:25",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4386,
        "src": "800:2262:25"
      }
    ],
    "src": "597:2466:25"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T08:07:49.121Z"
}