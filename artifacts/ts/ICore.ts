export const ICore = 
{
  "contractName": "ICore",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_vaultAddress",
          "type": "address"
        }
      ],
      "name": "setVaultAddress",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_transferProxyAddress",
          "type": "address"
        }
      ],
      "name": "setTransferProxyAddress",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_factoryAddress",
          "type": "address"
        }
      ],
      "name": "enableFactory",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_factoryAddress",
          "type": "address"
        }
      ],
      "name": "disableFactory",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_setAddress",
          "type": "address"
        }
      ],
      "name": "disableSet",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_setAddress",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "issue",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_setAddress",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "redeem",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_tokenAddresses",
          "type": "address[]"
        },
        {
          "name": "_quantities",
          "type": "uint256[]"
        }
      ],
      "name": "batchDeposit",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_tokenAddresses",
          "type": "address[]"
        },
        {
          "name": "_quantities",
          "type": "uint256[]"
        }
      ],
      "name": "batchWithdraw",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_tokenAddress",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "deposit",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_tokenAddress",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_factoryAddress",
          "type": "address"
        },
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
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\n/**\n * @title ICore\n * @author Set Protocol\n *\n * The ICore Contract defines all the functions exposed in the Core through its\n * various extensions and is a light weight way to interact with the contract.\n */\ninterface ICore {\n\n    /**\n     * Set vaultAddress. Can only be set by owner of Core.\n     *\n     * @param  _vaultAddress   The address of the Vault\n     */\n    function setVaultAddress(\n        address _vaultAddress\n    )\n        external;\n\n    /**\n     * Set transferProxyAddress. Can only be set by owner of Core.\n     *\n     * @param  _transferProxyAddress   The address of the TransferProxy\n     */\n    function setTransferProxyAddress(\n        address _transferProxyAddress\n    )\n        external;\n\n    /**\n     * Add a factory to the mapping of tracked factories.\n     *\n     * @param  _factoryAddress   The address of the SetTokenFactory to enable\n     */\n    function enableFactory(\n        address _factoryAddress\n    )\n        external;\n\n    /**\n     * Disable a factory in the mapping of tracked factories.\n     *\n     * @param  _factoryAddress   The address of the SetTokenFactory to disable\n     */\n    function disableFactory(\n        address _factoryAddress\n    )\n        external;\n\n    /**\n     * Disable a set token in the mapping of tracked set tokens.\n     *\n     * @param  _setAddress   The address of the SetToken to remove\n     */\n    function disableSet(\n        address _setAddress\n    )\n        external;\n\n    /**\n     * Issue\n     *\n     * @param  _setAddress   Address of set to issue\n     * @param  _quantity     Quantity of set to issue. Should be multiple of natural unit.\n     */\n    function issue(\n        address _setAddress,\n        uint _quantity\n    )\n        external;\n\n    /**\n     * Function to convert Set Tokens into underlying components\n     *\n     * @param _setAddress   The address of the Set token\n     * @param _quantity     The number of tokens to redeem. Should be multiple of natural unit.\n     */\n    function redeem(\n        address _setAddress,\n        uint _quantity\n    )\n        external;\n\n    /**\n     * Deposit multiple tokens to the vault. Quantities should be in the\n     * order of the addresses of the tokens being deposited.\n     *\n     * @param  _tokenAddresses   Array of the addresses of the ERC20 tokens\n     * @param  _quantities       Array of the number of tokens to deposit\n     */\n    function batchDeposit(\n        address[] _tokenAddresses,\n        uint[] _quantities\n    )\n        external;\n\n    /**\n     * Withdraw multiple tokens from the vault. Quantities should be in the\n     * order of the addresses of the tokens being withdrawn.\n     *\n     * @param  _tokenAddresses    Array of the addresses of the ERC20 tokens\n     * @param  _quantities        Array of the number of tokens to withdraw\n     */\n    function batchWithdraw(\n        address[] _tokenAddresses,\n        uint[] _quantities\n    )\n        external;\n\n    /**\n     * Deposit any quantity of tokens into the vault.\n     *\n     * @param  _tokenAddress    The address of the ERC20 token\n     * @param  _quantity        The number of tokens to deposit\n     */\n    function deposit(\n        address _tokenAddress,\n        uint _quantity\n    )\n        public;\n\n    /**\n     * Withdraw a quantity of tokens from the vault.\n     *\n     * @param  _tokenAddress    The address of the ERC20 token\n     * @param  _quantity        The number of tokens to withdraw\n     */\n    function withdraw(\n        address _tokenAddress,\n        uint _quantity\n    )\n        public;\n\n    /**\n     * Deploys a new Set Token and adds it to the valid list of SetTokens\n     *\n     * @param  _factoryAddress  address       The address of the Factory to create from\n     * @param  _components      address[]     The address of component tokens\n     * @param  _units           uint[]        The units of each component token\n     * @param  _naturalUnit     uint          The minimum unit to be issued or redeemed\n     * @param  _name            string        The name of the new Set\n     * @param  _symbol          string        The symbol of the new Set\n     * @return setTokenAddress address        The address of the new Set\n     */\n    function create(\n        address _factoryAddress,\n        address[] _components,\n        uint[] _units,\n        uint _naturalUnit,\n        string _name,\n        string _symbol\n    )\n        external\n        returns(address);\n}\n",
  "sourcePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ICore.sol",
  "ast": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ICore.sol",
    "exportedSymbols": {
      "ICore": [
        3237
      ]
    },
    "id": 3238,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3146,
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
        "documentation": "@title ICore\n@author Set Protocol\n * The ICore Contract defines all the functions exposed in the Core through its\nvarious extensions and is a light weight way to interact with the contract.",
        "fullyImplemented": false,
        "id": 3237,
        "linearizedBaseContracts": [
          3237
        ],
        "name": "ICore",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vaultAddress   The address of the Vault",
            "id": 3151,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3149,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3148,
                  "name": "_vaultAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3151,
                  "src": "1028:21:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3147,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1028:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1018:37:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3150,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1072:0:15"
            },
            "scope": 3237,
            "src": "994:79:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxyAddress   The address of the TransferProxy",
            "id": 3156,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3154,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3153,
                  "name": "_transferProxyAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3156,
                  "src": "1283:29:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3152,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1283:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1273:45:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3155,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1335:0:15"
            },
            "scope": 3237,
            "src": "1241:95:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Add a factory to the mapping of tracked factories.\n     * @param  _factoryAddress   The address of the SetTokenFactory to enable",
            "id": 3161,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3159,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3158,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3161,
                  "src": "1533:23:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3157,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1533:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1523:39:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3160,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1579:0:15"
            },
            "scope": 3237,
            "src": "1501:79:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a factory in the mapping of tracked factories.\n     * @param  _factoryAddress   The address of the SetTokenFactory to disable",
            "id": 3166,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3164,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3163,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3166,
                  "src": "1783:23:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3162,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1783:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1773:39:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3165,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1829:0:15"
            },
            "scope": 3237,
            "src": "1750:80:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a set token in the mapping of tracked set tokens.\n     * @param  _setAddress   The address of the SetToken to remove",
            "id": 3171,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3169,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3168,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3171,
                  "src": "2020:19:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3167,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2020:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2010:35:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3170,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2062:0:15"
            },
            "scope": 3237,
            "src": "1991:72:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Issue\n     * @param  _setAddress   Address of set to issue\n@param  _quantity     Quantity of set to issue. Should be multiple of natural unit.",
            "id": 3178,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "issue",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3176,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3173,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3178,
                  "src": "2273:19:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3172,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2273:7:15",
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
                  "id": 3175,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3178,
                  "src": "2302:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3174,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2302:4:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2263:59:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3177,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2339:0:15"
            },
            "scope": 3237,
            "src": "2249:91:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Function to convert Set Tokens into underlying components\n     * @param _setAddress   The address of the Set token\n@param _quantity     The number of tokens to redeem. Should be multiple of natural unit.",
            "id": 3185,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "redeem",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3183,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3180,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3185,
                  "src": "2612:19:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3179,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2612:7:15",
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
                  "id": 3182,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3185,
                  "src": "2641:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3181,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2641:4:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2602:59:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3184,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2678:0:15"
            },
            "scope": 3237,
            "src": "2587:92:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _tokenAddresses   Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 3194,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDeposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3192,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3188,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 3194,
                  "src": "3023:25:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3186,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3023:7:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3187,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3023:9:15",
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
                  "id": 3191,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 3194,
                  "src": "3058:18:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3189,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3058:4:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3190,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3058:6:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3013:69:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3193,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3099:0:15"
            },
            "scope": 3237,
            "src": "2992:108:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokenAddresses    Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 3203,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchWithdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3201,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3197,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 3203,
                  "src": "3451:25:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3195,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3451:7:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3196,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3451:9:15",
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
                  "id": 3200,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 3203,
                  "src": "3486:18:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3198,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3486:4:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3199,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3486:6:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3441:69:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3202,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3527:0:15"
            },
            "scope": 3237,
            "src": "3419:109:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _tokenAddress    The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 3210,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "deposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3208,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3205,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3210,
                  "src": "3764:21:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3204,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3764:7:15",
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
                  "id": 3207,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3210,
                  "src": "3795:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3206,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "3795:4:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3754:61:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3209,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3830:0:15"
            },
            "scope": 3237,
            "src": "3738:93:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _tokenAddress    The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 3217,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3215,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3212,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3217,
                  "src": "4068:21:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3211,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4068:7:15",
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
                  "id": 3214,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3217,
                  "src": "4099:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3213,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4099:4:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4058:61:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3216,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4134:0:15"
            },
            "scope": 3237,
            "src": "4041:94:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _factoryAddress  address       The address of the Factory to create from\n@param  _components      address[]     The address of component tokens\n@param  _units           uint[]        The units of each component token\n@param  _naturalUnit     uint          The minimum unit to be issued or redeemed\n@param  _name            string        The name of the new Set\n@param  _symbol          string        The symbol of the new Set\n@return setTokenAddress address        The address of the new Set",
            "id": 3236,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3232,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3219,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3236,
                  "src": "4812:23:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3218,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4812:7:15",
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
                  "id": 3222,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 3236,
                  "src": "4845:21:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3220,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "4845:7:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3221,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4845:9:15",
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
                  "id": 3225,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 3236,
                  "src": "4876:13:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3223,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "4876:4:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3224,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4876:6:15",
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
                  "id": 3227,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 3236,
                  "src": "4899:17:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3226,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4899:4:15",
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
                  "id": 3229,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 3236,
                  "src": "4926:12:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 3228,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "4926:6:15",
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
                  "id": 3231,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 3236,
                  "src": "4948:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 3230,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "4948:6:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4802:166:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3235,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3234,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3236,
                  "src": "5002:7:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3233,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5002:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5001:9:15"
            },
            "scope": 3237,
            "src": "4787:224:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3238,
        "src": "833:4180:15"
      }
    ],
    "src": "597:4417:15"
  },
  "legacyAST": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ICore.sol",
    "exportedSymbols": {
      "ICore": [
        3237
      ]
    },
    "id": 3238,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3146,
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
        "documentation": "@title ICore\n@author Set Protocol\n * The ICore Contract defines all the functions exposed in the Core through its\nvarious extensions and is a light weight way to interact with the contract.",
        "fullyImplemented": false,
        "id": 3237,
        "linearizedBaseContracts": [
          3237
        ],
        "name": "ICore",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vaultAddress   The address of the Vault",
            "id": 3151,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3149,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3148,
                  "name": "_vaultAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3151,
                  "src": "1028:21:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3147,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1028:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1018:37:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3150,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1072:0:15"
            },
            "scope": 3237,
            "src": "994:79:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxyAddress   The address of the TransferProxy",
            "id": 3156,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3154,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3153,
                  "name": "_transferProxyAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3156,
                  "src": "1283:29:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3152,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1283:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1273:45:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3155,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1335:0:15"
            },
            "scope": 3237,
            "src": "1241:95:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Add a factory to the mapping of tracked factories.\n     * @param  _factoryAddress   The address of the SetTokenFactory to enable",
            "id": 3161,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3159,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3158,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3161,
                  "src": "1533:23:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3157,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1533:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1523:39:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3160,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1579:0:15"
            },
            "scope": 3237,
            "src": "1501:79:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a factory in the mapping of tracked factories.\n     * @param  _factoryAddress   The address of the SetTokenFactory to disable",
            "id": 3166,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3164,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3163,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3166,
                  "src": "1783:23:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3162,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1783:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1773:39:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3165,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1829:0:15"
            },
            "scope": 3237,
            "src": "1750:80:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a set token in the mapping of tracked set tokens.\n     * @param  _setAddress   The address of the SetToken to remove",
            "id": 3171,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3169,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3168,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3171,
                  "src": "2020:19:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3167,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2020:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2010:35:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3170,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2062:0:15"
            },
            "scope": 3237,
            "src": "1991:72:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Issue\n     * @param  _setAddress   Address of set to issue\n@param  _quantity     Quantity of set to issue. Should be multiple of natural unit.",
            "id": 3178,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "issue",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3176,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3173,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3178,
                  "src": "2273:19:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3172,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2273:7:15",
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
                  "id": 3175,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3178,
                  "src": "2302:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3174,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2302:4:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2263:59:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3177,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2339:0:15"
            },
            "scope": 3237,
            "src": "2249:91:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Function to convert Set Tokens into underlying components\n     * @param _setAddress   The address of the Set token\n@param _quantity     The number of tokens to redeem. Should be multiple of natural unit.",
            "id": 3185,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "redeem",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3183,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3180,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3185,
                  "src": "2612:19:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3179,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2612:7:15",
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
                  "id": 3182,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3185,
                  "src": "2641:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3181,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2641:4:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2602:59:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3184,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2678:0:15"
            },
            "scope": 3237,
            "src": "2587:92:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _tokenAddresses   Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 3194,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDeposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3192,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3188,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 3194,
                  "src": "3023:25:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3186,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3023:7:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3187,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3023:9:15",
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
                  "id": 3191,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 3194,
                  "src": "3058:18:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3189,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3058:4:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3190,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3058:6:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3013:69:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3193,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3099:0:15"
            },
            "scope": 3237,
            "src": "2992:108:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokenAddresses    Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 3203,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchWithdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3201,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3197,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 3203,
                  "src": "3451:25:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3195,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3451:7:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3196,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3451:9:15",
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
                  "id": 3200,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 3203,
                  "src": "3486:18:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3198,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3486:4:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3199,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3486:6:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3441:69:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3202,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3527:0:15"
            },
            "scope": 3237,
            "src": "3419:109:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _tokenAddress    The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 3210,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "deposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3208,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3205,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3210,
                  "src": "3764:21:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3204,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3764:7:15",
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
                  "id": 3207,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3210,
                  "src": "3795:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3206,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "3795:4:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3754:61:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3209,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3830:0:15"
            },
            "scope": 3237,
            "src": "3738:93:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _tokenAddress    The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 3217,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3215,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3212,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3217,
                  "src": "4068:21:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3211,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4068:7:15",
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
                  "id": 3214,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3217,
                  "src": "4099:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3213,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4099:4:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4058:61:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3216,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4134:0:15"
            },
            "scope": 3237,
            "src": "4041:94:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _factoryAddress  address       The address of the Factory to create from\n@param  _components      address[]     The address of component tokens\n@param  _units           uint[]        The units of each component token\n@param  _naturalUnit     uint          The minimum unit to be issued or redeemed\n@param  _name            string        The name of the new Set\n@param  _symbol          string        The symbol of the new Set\n@return setTokenAddress address        The address of the new Set",
            "id": 3236,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3232,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3219,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3236,
                  "src": "4812:23:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3218,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4812:7:15",
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
                  "id": 3222,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 3236,
                  "src": "4845:21:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3220,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "4845:7:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3221,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4845:9:15",
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
                  "id": 3225,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 3236,
                  "src": "4876:13:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3223,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "4876:4:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3224,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4876:6:15",
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
                  "id": 3227,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 3236,
                  "src": "4899:17:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3226,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4899:4:15",
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
                  "id": 3229,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 3236,
                  "src": "4926:12:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 3228,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "4926:6:15",
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
                  "id": 3231,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 3236,
                  "src": "4948:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 3230,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "4948:6:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4802:166:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3235,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3234,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3236,
                  "src": "5002:7:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3233,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5002:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5001:9:15"
            },
            "scope": 3237,
            "src": "4787:224:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3238,
        "src": "833:4180:15"
      }
    ],
    "src": "597:4417:15"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-13T21:55:38.402Z"
}