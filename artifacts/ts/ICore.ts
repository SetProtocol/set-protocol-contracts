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
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICore.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICore.sol",
    "exportedSymbols": {
      "ICore": [
        2758
      ]
    },
    "id": 2759,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2667,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:14"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ICore\n@author Set Protocol\n * The ICore Contract defines all the functions exposed in the Core through its\nvarious extensions and is a light weight way to interact with the contract.",
        "fullyImplemented": false,
        "id": 2758,
        "linearizedBaseContracts": [
          2758
        ],
        "name": "ICore",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vaultAddress   The address of the Vault",
            "id": 2672,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2670,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2669,
                  "name": "_vaultAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2672,
                  "src": "1028:21:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2668,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1028:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1018:37:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2671,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1072:0:14"
            },
            "scope": 2758,
            "src": "994:79:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxyAddress   The address of the TransferProxy",
            "id": 2677,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2675,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2674,
                  "name": "_transferProxyAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2677,
                  "src": "1283:29:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2673,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1283:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1273:45:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2676,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1335:0:14"
            },
            "scope": 2758,
            "src": "1241:95:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Add a factory to the mapping of tracked factories.\n     * @param  _factoryAddress   The address of the SetTokenFactory to enable",
            "id": 2682,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2680,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2679,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2682,
                  "src": "1533:23:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2678,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1533:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1523:39:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2681,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1579:0:14"
            },
            "scope": 2758,
            "src": "1501:79:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a factory in the mapping of tracked factories.\n     * @param  _factoryAddress   The address of the SetTokenFactory to disable",
            "id": 2687,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2685,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2684,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2687,
                  "src": "1783:23:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2683,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1783:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1773:39:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2686,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1829:0:14"
            },
            "scope": 2758,
            "src": "1750:80:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a set token in the mapping of tracked set tokens.\n     * @param  _setAddress   The address of the SetToken to remove",
            "id": 2692,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2690,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2689,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2692,
                  "src": "2020:19:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2688,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2020:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2010:35:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2691,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2062:0:14"
            },
            "scope": 2758,
            "src": "1991:72:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Issue\n     * @param  _setAddress   Address of set to issue\n@param  _quantity     Quantity of set to issue. Should be multiple of natural unit.",
            "id": 2699,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "issue",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2697,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2694,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2699,
                  "src": "2273:19:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2693,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2273:7:14",
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
                  "id": 2696,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2699,
                  "src": "2302:14:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2695,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2302:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2263:59:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2698,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2339:0:14"
            },
            "scope": 2758,
            "src": "2249:91:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Function to convert Set Tokens into underlying components\n     * @param _setAddress   The address of the Set token\n@param _quantity     The number of tokens to redeem. Should be multiple of natural unit.",
            "id": 2706,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "redeem",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2704,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2701,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2706,
                  "src": "2612:19:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2700,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2612:7:14",
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
                  "id": 2703,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2706,
                  "src": "2641:14:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2702,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2641:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2602:59:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2705,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2678:0:14"
            },
            "scope": 2758,
            "src": "2587:92:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _tokenAddresses   Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 2715,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDeposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2713,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2709,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 2715,
                  "src": "3023:25:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2707,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3023:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2708,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3023:9:14",
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
                  "id": 2712,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 2715,
                  "src": "3058:18:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2710,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3058:4:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2711,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3058:6:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3013:69:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2714,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3099:0:14"
            },
            "scope": 2758,
            "src": "2992:108:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokenAddresses    Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 2724,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchWithdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2722,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2718,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 2724,
                  "src": "3451:25:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2716,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3451:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2717,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3451:9:14",
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
                  "id": 2721,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 2724,
                  "src": "3486:18:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2719,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3486:4:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2720,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3486:6:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3441:69:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2723,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3527:0:14"
            },
            "scope": 2758,
            "src": "3419:109:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _tokenAddress    The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 2731,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "deposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2729,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2726,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2731,
                  "src": "3764:21:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2725,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3764:7:14",
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
                  "id": 2728,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2731,
                  "src": "3795:14:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2727,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "3795:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3754:61:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2730,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3830:0:14"
            },
            "scope": 2758,
            "src": "3738:93:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _tokenAddress    The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 2738,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2736,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2733,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2738,
                  "src": "4068:21:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2732,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4068:7:14",
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
                  "id": 2735,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2738,
                  "src": "4099:14:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2734,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4099:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4058:61:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2737,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4134:0:14"
            },
            "scope": 2758,
            "src": "4041:94:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _factoryAddress  address       The address of the Factory to create from\n@param  _components      address[]     The address of component tokens\n@param  _units           uint[]        The units of each component token\n@param  _naturalUnit     uint          The minimum unit to be issued or redeemed\n@param  _name            string        The name of the new Set\n@param  _symbol          string        The symbol of the new Set\n@return setTokenAddress address        The address of the new Set",
            "id": 2757,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2753,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2740,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2757,
                  "src": "4812:23:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2739,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4812:7:14",
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
                  "id": 2743,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 2757,
                  "src": "4845:21:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2741,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "4845:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2742,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4845:9:14",
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
                  "id": 2746,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 2757,
                  "src": "4876:13:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2744,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "4876:4:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2745,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4876:6:14",
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
                  "id": 2748,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 2757,
                  "src": "4899:17:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2747,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4899:4:14",
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
                  "id": 2750,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 2757,
                  "src": "4926:12:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 2749,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "4926:6:14",
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
                  "id": 2752,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 2757,
                  "src": "4948:14:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 2751,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "4948:6:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4802:166:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2756,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2755,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2757,
                  "src": "5002:7:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2754,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5002:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5001:9:14"
            },
            "scope": 2758,
            "src": "4787:224:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2759,
        "src": "833:4180:14"
      }
    ],
    "src": "597:4417:14"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICore.sol",
    "exportedSymbols": {
      "ICore": [
        2758
      ]
    },
    "id": 2759,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2667,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:14"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ICore\n@author Set Protocol\n * The ICore Contract defines all the functions exposed in the Core through its\nvarious extensions and is a light weight way to interact with the contract.",
        "fullyImplemented": false,
        "id": 2758,
        "linearizedBaseContracts": [
          2758
        ],
        "name": "ICore",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vaultAddress   The address of the Vault",
            "id": 2672,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2670,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2669,
                  "name": "_vaultAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2672,
                  "src": "1028:21:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2668,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1028:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1018:37:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2671,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1072:0:14"
            },
            "scope": 2758,
            "src": "994:79:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxyAddress   The address of the TransferProxy",
            "id": 2677,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2675,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2674,
                  "name": "_transferProxyAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2677,
                  "src": "1283:29:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2673,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1283:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1273:45:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2676,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1335:0:14"
            },
            "scope": 2758,
            "src": "1241:95:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Add a factory to the mapping of tracked factories.\n     * @param  _factoryAddress   The address of the SetTokenFactory to enable",
            "id": 2682,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2680,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2679,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2682,
                  "src": "1533:23:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2678,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1533:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1523:39:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2681,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1579:0:14"
            },
            "scope": 2758,
            "src": "1501:79:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a factory in the mapping of tracked factories.\n     * @param  _factoryAddress   The address of the SetTokenFactory to disable",
            "id": 2687,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2685,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2684,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2687,
                  "src": "1783:23:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2683,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1783:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1773:39:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2686,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1829:0:14"
            },
            "scope": 2758,
            "src": "1750:80:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a set token in the mapping of tracked set tokens.\n     * @param  _setAddress   The address of the SetToken to remove",
            "id": 2692,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2690,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2689,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2692,
                  "src": "2020:19:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2688,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2020:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2010:35:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2691,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2062:0:14"
            },
            "scope": 2758,
            "src": "1991:72:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Issue\n     * @param  _setAddress   Address of set to issue\n@param  _quantity     Quantity of set to issue. Should be multiple of natural unit.",
            "id": 2699,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "issue",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2697,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2694,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2699,
                  "src": "2273:19:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2693,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2273:7:14",
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
                  "id": 2696,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2699,
                  "src": "2302:14:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2695,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2302:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2263:59:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2698,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2339:0:14"
            },
            "scope": 2758,
            "src": "2249:91:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Function to convert Set Tokens into underlying components\n     * @param _setAddress   The address of the Set token\n@param _quantity     The number of tokens to redeem. Should be multiple of natural unit.",
            "id": 2706,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "redeem",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2704,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2701,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2706,
                  "src": "2612:19:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2700,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2612:7:14",
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
                  "id": 2703,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2706,
                  "src": "2641:14:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2702,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2641:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2602:59:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2705,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2678:0:14"
            },
            "scope": 2758,
            "src": "2587:92:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _tokenAddresses   Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 2715,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDeposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2713,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2709,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 2715,
                  "src": "3023:25:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2707,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3023:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2708,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3023:9:14",
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
                  "id": 2712,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 2715,
                  "src": "3058:18:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2710,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3058:4:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2711,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3058:6:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3013:69:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2714,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3099:0:14"
            },
            "scope": 2758,
            "src": "2992:108:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokenAddresses    Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 2724,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchWithdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2722,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2718,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 2724,
                  "src": "3451:25:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2716,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3451:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2717,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3451:9:14",
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
                  "id": 2721,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 2724,
                  "src": "3486:18:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2719,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3486:4:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2720,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3486:6:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3441:69:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2723,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3527:0:14"
            },
            "scope": 2758,
            "src": "3419:109:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _tokenAddress    The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 2731,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "deposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2729,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2726,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2731,
                  "src": "3764:21:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2725,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3764:7:14",
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
                  "id": 2728,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2731,
                  "src": "3795:14:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2727,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "3795:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3754:61:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2730,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3830:0:14"
            },
            "scope": 2758,
            "src": "3738:93:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _tokenAddress    The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 2738,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2736,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2733,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2738,
                  "src": "4068:21:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2732,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4068:7:14",
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
                  "id": 2735,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2738,
                  "src": "4099:14:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2734,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4099:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4058:61:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2737,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4134:0:14"
            },
            "scope": 2758,
            "src": "4041:94:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _factoryAddress  address       The address of the Factory to create from\n@param  _components      address[]     The address of component tokens\n@param  _units           uint[]        The units of each component token\n@param  _naturalUnit     uint          The minimum unit to be issued or redeemed\n@param  _name            string        The name of the new Set\n@param  _symbol          string        The symbol of the new Set\n@return setTokenAddress address        The address of the new Set",
            "id": 2757,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2753,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2740,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2757,
                  "src": "4812:23:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2739,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4812:7:14",
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
                  "id": 2743,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 2757,
                  "src": "4845:21:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2741,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "4845:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2742,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4845:9:14",
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
                  "id": 2746,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 2757,
                  "src": "4876:13:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2744,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "4876:4:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2745,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4876:6:14",
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
                  "id": 2748,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 2757,
                  "src": "4899:17:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2747,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4899:4:14",
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
                  "id": 2750,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 2757,
                  "src": "4926:12:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 2749,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "4926:6:14",
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
                  "id": 2752,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 2757,
                  "src": "4948:14:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 2751,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "4948:6:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4802:166:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2756,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2755,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2757,
                  "src": "5002:7:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2754,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5002:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5001:9:14"
            },
            "scope": 2758,
            "src": "4787:224:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2759,
        "src": "833:4180:14"
      }
    ],
    "src": "597:4417:14"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-08T01:11:15.196Z"
}