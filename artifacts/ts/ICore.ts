export const ICore = 
{
  "contractName": "ICore",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_vault",
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
          "name": "_transferProxy",
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
          "name": "_factory",
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
          "name": "_factory",
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
          "name": "_set",
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
          "name": "_set",
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
          "name": "_set",
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
          "name": "_tokens",
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
          "name": "_tokens",
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
          "name": "_token",
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
          "name": "_token",
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
          "name": "_factory",
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
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\n/**\n * @title ICore\n * @author Set Protocol\n *\n * The ICore Contract defines all the functions exposed in the Core through its\n * various extensions and is a light weight way to interact with the contract.\n */\ninterface ICore {\n\n    /**\n     * Set vaultAddress. Can only be set by owner of Core.\n     *\n     * @param  _vault   The address of the Vault\n     */\n    function setVaultAddress(\n        address _vault\n    )\n        external;\n\n    /**\n     * Set transferProxyAddress. Can only be set by owner of Core.\n     *\n     * @param  _transferProxy   The address of the TransferProxy\n     */\n    function setTransferProxyAddress(\n        address _transferProxy\n    )\n        external;\n\n    /**\n     * Add a factory to the mapping of tracked factories.\n     *\n     * @param  _factory   The address of the SetTokenFactory to enable\n     */\n    function enableFactory(\n        address _factory\n    )\n        external;\n\n    /**\n     * Disable a factory in the mapping of tracked factories.\n     *\n     * @param  _factory   The address of the SetTokenFactory to disable\n     */\n    function disableFactory(\n        address _factory\n    )\n        external;\n\n    /**\n     * Disable a set token in the mapping of tracked set tokens.\n     *\n     * @param  _set   The address of the SetToken to remove\n     */\n    function disableSet(\n        address _set\n    )\n        external;\n\n    /**\n     * Exchanges components for Set Tokens\n     *\n     * @param  _set          Address of set to issue\n     * @param  _quantity     Quantity of set to issue\n     */\n    function issue(\n        address _set,\n        uint _quantity\n    )\n        external;\n\n    /**\n     * Function to convert Set Tokens into underlying components\n     *\n     * @param _set          The address of the Set token\n     * @param _quantity     The number of tokens to redeem. Should be multiple of natural unit.\n     */\n    function redeem(\n        address _set,\n        uint _quantity\n    )\n        external;\n\n    /**\n     * Deposit multiple tokens to the vault. Quantities should be in the\n     * order of the addresses of the tokens being deposited.\n     *\n     * @param  _tokens           Array of the addresses of the ERC20 tokens\n     * @param  _quantities       Array of the number of tokens to deposit\n     */\n    function batchDeposit(\n        address[] _tokens,\n        uint[] _quantities\n    )\n        external;\n\n    /**\n     * Withdraw multiple tokens from the vault. Quantities should be in the\n     * order of the addresses of the tokens being withdrawn.\n     *\n     * @param  _tokens            Array of the addresses of the ERC20 tokens\n     * @param  _quantities        Array of the number of tokens to withdraw\n     */\n    function batchWithdraw(\n        address[] _tokens,\n        uint[] _quantities\n    )\n        external;\n\n    /**\n     * Deposit any quantity of tokens into the vault.\n     *\n     * @param  _token           The address of the ERC20 token\n     * @param  _quantity        The number of tokens to deposit\n     */\n    function deposit(\n        address _token,\n        uint _quantity\n    )\n        external;\n\n    /**\n     * Withdraw a quantity of tokens from the vault.\n     *\n     * @param  _token           The address of the ERC20 token\n     * @param  _quantity        The number of tokens to withdraw\n     */\n    function withdraw(\n        address _token,\n        uint _quantity\n    )\n        public;\n\n    /**\n     * Deploys a new Set Token and adds it to the valid list of SetTokens\n     *\n     * @param  _factory              The address of the Factory to create from\n     * @param  _components           The address of component tokens\n     * @param  _units                The units of each component token\n     * @param  _naturalUnit          The minimum unit to be issued or redeemed\n     * @param  _name                 The name of the new Set\n     * @param  _symbol               The symbol of the new Set\n     * @return setTokenAddress       The address of the new Set\n     */\n    function create(\n        address _factory,\n        address[] _components,\n        uint[] _units,\n        uint _naturalUnit,\n        string _name,\n        string _symbol\n    )\n        external\n        returns(address);\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICore.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICore.sol",
    "exportedSymbols": {
      "ICore": [
        3444
      ]
    },
    "id": 3445,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3353,
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
        "id": 3444,
        "linearizedBaseContracts": [
          3444
        ],
        "name": "ICore",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vault   The address of the Vault",
            "id": 3358,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3356,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3355,
                  "name": "_vault",
                  "nodeType": "VariableDeclaration",
                  "scope": 3358,
                  "src": "1021:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3354,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1021:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1011:30:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3357,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1058:0:15"
            },
            "scope": 3444,
            "src": "987:72:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxy   The address of the TransferProxy",
            "id": 3363,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3361,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3360,
                  "name": "_transferProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 3363,
                  "src": "1262:22:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3359,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1262:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1252:38:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3362,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1307:0:15"
            },
            "scope": 3444,
            "src": "1220:88:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Add a factory to the mapping of tracked factories.\n     * @param  _factory   The address of the SetTokenFactory to enable",
            "id": 3368,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3366,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3365,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3368,
                  "src": "1498:16:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3364,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1498:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1488:32:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3367,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1537:0:15"
            },
            "scope": 3444,
            "src": "1466:72:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a factory in the mapping of tracked factories.\n     * @param  _factory   The address of the SetTokenFactory to disable",
            "id": 3373,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3371,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3370,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3373,
                  "src": "1734:16:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3369,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1734:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1724:32:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3372,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1773:0:15"
            },
            "scope": 3444,
            "src": "1701:73:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a set token in the mapping of tracked set tokens.\n     * @param  _set   The address of the SetToken to remove",
            "id": 3378,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3376,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3375,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3378,
                  "src": "1957:12:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3374,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1957:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1947:28:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3377,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1992:0:15"
            },
            "scope": 3444,
            "src": "1928:65:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Exchanges components for Set Tokens\n     * @param  _set          Address of set to issue\n@param  _quantity     Quantity of set to issue",
            "id": 3385,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "issue",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3383,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3380,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3385,
                  "src": "2196:12:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3379,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2196:7:15",
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
                  "id": 3382,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3385,
                  "src": "2218:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3381,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2218:4:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2186:52:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3384,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2255:0:15"
            },
            "scope": 3444,
            "src": "2172:84:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Function to convert Set Tokens into underlying components\n     * @param _set          The address of the Set token\n@param _quantity     The number of tokens to redeem. Should be multiple of natural unit.",
            "id": 3392,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "redeem",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3390,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3387,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3392,
                  "src": "2528:12:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3386,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2528:7:15",
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
                  "id": 3389,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3392,
                  "src": "2550:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3388,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2550:4:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2518:52:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3391,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2587:0:15"
            },
            "scope": 3444,
            "src": "2503:85:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _tokens           Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 3401,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDeposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3399,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3395,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 3401,
                  "src": "2932:17:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3393,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2932:7:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3394,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2932:9:15",
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
                  "id": 3398,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 3401,
                  "src": "2959:18:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3396,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2959:4:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3397,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2959:6:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2922:61:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3400,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3000:0:15"
            },
            "scope": 3444,
            "src": "2901:100:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokens            Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 3410,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchWithdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3408,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3404,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 3410,
                  "src": "3352:17:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3402,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3352:7:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3403,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3352:9:15",
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
                  "id": 3407,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 3410,
                  "src": "3379:18:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3405,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3379:4:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3406,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3379:6:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3342:61:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3409,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3420:0:15"
            },
            "scope": 3444,
            "src": "3320:101:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 3417,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "deposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3415,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3412,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3417,
                  "src": "3657:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3411,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3657:7:15",
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
                  "id": 3414,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3417,
                  "src": "3681:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3413,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "3681:4:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3647:54:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3416,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3718:0:15"
            },
            "scope": 3444,
            "src": "3631:88:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 3424,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3422,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3419,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3424,
                  "src": "3956:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3418,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3956:7:15",
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
                  "id": 3421,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3424,
                  "src": "3980:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3420,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "3980:4:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3946:54:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3423,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4015:0:15"
            },
            "scope": 3444,
            "src": "3929:87:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _factory              The address of the Factory to create from\n@param  _components           The address of component tokens\n@param  _units                The units of each component token\n@param  _naturalUnit          The minimum unit to be issued or redeemed\n@param  _name                 The name of the new Set\n@param  _symbol               The symbol of the new Set\n@return setTokenAddress       The address of the new Set",
            "id": 3443,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3439,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3426,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3443,
                  "src": "4630:16:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3425,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4630:7:15",
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
                  "id": 3429,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 3443,
                  "src": "4656:21:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3427,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "4656:7:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3428,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4656:9:15",
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
                  "id": 3432,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 3443,
                  "src": "4687:13:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3430,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "4687:4:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3431,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4687:6:15",
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
                  "id": 3434,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 3443,
                  "src": "4710:17:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3433,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4710:4:15",
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
                  "id": 3436,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 3443,
                  "src": "4737:12:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 3435,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "4737:6:15",
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
                  "id": 3438,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 3443,
                  "src": "4759:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 3437,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "4759:6:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4620:159:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3442,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3441,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3443,
                  "src": "4813:7:15",
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
                    "src": "4813:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4812:9:15"
            },
            "scope": 3444,
            "src": "4605:217:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3445,
        "src": "833:3991:15"
      }
    ],
    "src": "597:4228:15"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICore.sol",
    "exportedSymbols": {
      "ICore": [
        3444
      ]
    },
    "id": 3445,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3353,
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
        "id": 3444,
        "linearizedBaseContracts": [
          3444
        ],
        "name": "ICore",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vault   The address of the Vault",
            "id": 3358,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3356,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3355,
                  "name": "_vault",
                  "nodeType": "VariableDeclaration",
                  "scope": 3358,
                  "src": "1021:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3354,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1021:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1011:30:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3357,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1058:0:15"
            },
            "scope": 3444,
            "src": "987:72:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxy   The address of the TransferProxy",
            "id": 3363,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3361,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3360,
                  "name": "_transferProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 3363,
                  "src": "1262:22:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3359,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1262:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1252:38:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3362,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1307:0:15"
            },
            "scope": 3444,
            "src": "1220:88:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Add a factory to the mapping of tracked factories.\n     * @param  _factory   The address of the SetTokenFactory to enable",
            "id": 3368,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3366,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3365,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3368,
                  "src": "1498:16:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3364,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1498:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1488:32:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3367,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1537:0:15"
            },
            "scope": 3444,
            "src": "1466:72:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a factory in the mapping of tracked factories.\n     * @param  _factory   The address of the SetTokenFactory to disable",
            "id": 3373,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3371,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3370,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3373,
                  "src": "1734:16:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3369,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1734:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1724:32:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3372,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1773:0:15"
            },
            "scope": 3444,
            "src": "1701:73:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a set token in the mapping of tracked set tokens.\n     * @param  _set   The address of the SetToken to remove",
            "id": 3378,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3376,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3375,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3378,
                  "src": "1957:12:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3374,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1957:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1947:28:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3377,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1992:0:15"
            },
            "scope": 3444,
            "src": "1928:65:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Exchanges components for Set Tokens\n     * @param  _set          Address of set to issue\n@param  _quantity     Quantity of set to issue",
            "id": 3385,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "issue",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3383,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3380,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3385,
                  "src": "2196:12:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3379,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2196:7:15",
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
                  "id": 3382,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3385,
                  "src": "2218:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3381,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2218:4:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2186:52:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3384,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2255:0:15"
            },
            "scope": 3444,
            "src": "2172:84:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Function to convert Set Tokens into underlying components\n     * @param _set          The address of the Set token\n@param _quantity     The number of tokens to redeem. Should be multiple of natural unit.",
            "id": 3392,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "redeem",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3390,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3387,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3392,
                  "src": "2528:12:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3386,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2528:7:15",
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
                  "id": 3389,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3392,
                  "src": "2550:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3388,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2550:4:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2518:52:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3391,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2587:0:15"
            },
            "scope": 3444,
            "src": "2503:85:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _tokens           Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 3401,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDeposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3399,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3395,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 3401,
                  "src": "2932:17:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3393,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2932:7:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3394,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2932:9:15",
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
                  "id": 3398,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 3401,
                  "src": "2959:18:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3396,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2959:4:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3397,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2959:6:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2922:61:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3400,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3000:0:15"
            },
            "scope": 3444,
            "src": "2901:100:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokens            Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 3410,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchWithdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3408,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3404,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 3410,
                  "src": "3352:17:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3402,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3352:7:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3403,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3352:9:15",
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
                  "id": 3407,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 3410,
                  "src": "3379:18:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3405,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3379:4:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3406,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3379:6:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3342:61:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3409,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3420:0:15"
            },
            "scope": 3444,
            "src": "3320:101:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 3417,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "deposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3415,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3412,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3417,
                  "src": "3657:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3411,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3657:7:15",
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
                  "id": 3414,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3417,
                  "src": "3681:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3413,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "3681:4:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3647:54:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3416,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3718:0:15"
            },
            "scope": 3444,
            "src": "3631:88:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 3424,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3422,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3419,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3424,
                  "src": "3956:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3418,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3956:7:15",
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
                  "id": 3421,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3424,
                  "src": "3980:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3420,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "3980:4:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3946:54:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3423,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4015:0:15"
            },
            "scope": 3444,
            "src": "3929:87:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _factory              The address of the Factory to create from\n@param  _components           The address of component tokens\n@param  _units                The units of each component token\n@param  _naturalUnit          The minimum unit to be issued or redeemed\n@param  _name                 The name of the new Set\n@param  _symbol               The symbol of the new Set\n@return setTokenAddress       The address of the new Set",
            "id": 3443,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3439,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3426,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3443,
                  "src": "4630:16:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3425,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4630:7:15",
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
                  "id": 3429,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 3443,
                  "src": "4656:21:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3427,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "4656:7:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3428,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4656:9:15",
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
                  "id": 3432,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 3443,
                  "src": "4687:13:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3430,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "4687:4:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3431,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4687:6:15",
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
                  "id": 3434,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 3443,
                  "src": "4710:17:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3433,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4710:4:15",
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
                  "id": 3436,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 3443,
                  "src": "4737:12:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 3435,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "4737:6:15",
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
                  "id": 3438,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 3443,
                  "src": "4759:14:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 3437,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "4759:6:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4620:159:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3442,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3441,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3443,
                  "src": "4813:7:15",
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
                    "src": "4813:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4812:9:15"
            },
            "scope": 3444,
            "src": "4605:217:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3445,
        "src": "833:3991:15"
      }
    ],
    "src": "597:4228:15"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-27T04:20:39.810Z"
}