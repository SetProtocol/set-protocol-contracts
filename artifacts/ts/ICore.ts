export const ICore = 
{
  "contractName": "ICore",
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "validSets",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
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
          "name": "_set",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "redeemInVault",
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
        },
        {
          "name": "_callData",
          "type": "bytes"
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
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_addresses",
          "type": "address[5]"
        },
        {
          "name": "_values",
          "type": "uint256[5]"
        },
        {
          "name": "_requiredComponents",
          "type": "address[]"
        },
        {
          "name": "_requiredComponentAmounts",
          "type": "uint256[]"
        },
        {
          "name": "_fillQuantity",
          "type": "uint256"
        },
        {
          "name": "_v",
          "type": "uint8"
        },
        {
          "name": "sigBytes",
          "type": "bytes32[]"
        },
        {
          "name": "_orderData",
          "type": "bytes"
        }
      ],
      "name": "fillOrder",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_addresses",
          "type": "address[5]"
        },
        {
          "name": "_values",
          "type": "uint256[5]"
        },
        {
          "name": "_requiredComponents",
          "type": "address[]"
        },
        {
          "name": "_requiredComponentAmounts",
          "type": "uint256[]"
        },
        {
          "name": "_cancelQuantity",
          "type": "uint256"
        }
      ],
      "name": "cancelOrder",
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
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\n/**\n * @title ICore\n * @author Set Protocol\n *\n * The ICore Contract defines all the functions exposed in the Core through its\n * various extensions and is a light weight way to interact with the contract.\n */\ninterface ICore {\n    /*\n     * Get natural unit of Set\n     *\n     * @return  uint256       Natural unit of Set\n     */\n    function validSets(address)\n        external\n        view\n        returns (bool);\n\n    /**\n     * Set vaultAddress. Can only be set by owner of Core.\n     *\n     * @param  _vault   The address of the Vault\n     */\n    function setVaultAddress(\n        address _vault\n    )\n        external;\n\n    /**\n     * Set transferProxyAddress. Can only be set by owner of Core.\n     *\n     * @param  _transferProxy   The address of the TransferProxy\n     */\n    function setTransferProxyAddress(\n        address _transferProxy\n    )\n        external;\n\n    /**\n     * Add a factory to the mapping of tracked factories.\n     *\n     * @param  _factory   The address of the SetTokenFactory to enable\n     */\n    function enableFactory(\n        address _factory\n    )\n        external;\n\n    /**\n     * Disable a factory in the mapping of tracked factories.\n     *\n     * @param  _factory   The address of the SetTokenFactory to disable\n     */\n    function disableFactory(\n        address _factory\n    )\n        external;\n\n    /**\n     * Disable a set token in the mapping of tracked set tokens.\n     *\n     * @param  _set   The address of the SetToken to remove\n     */\n    function disableSet(\n        address _set\n    )\n        external;\n\n    /**\n     * Exchanges components for Set Tokens\n     *\n     * @param  _set          Address of set to issue\n     * @param  _quantity     Quantity of set to issue\n     */\n    function issue(\n        address _set,\n        uint256 _quantity\n    )\n        external;\n\n    /**\n     * Function to convert Set Tokens into underlying components\n     *\n     * @param _set          The address of the Set token\n     * @param _quantity     The number of tokens to redeem. Should be multiple of natural unit.\n     */\n    function redeem(\n        address _set,\n        uint256 _quantity\n    )\n        external;\n\n    /**\n     * Function to convert Set Tokens held in vault into underlying components\n     *\n     * @param _set          The address of the Set token\n     * @param _quantity     The number of tokens to redeem. Should be multiple of natural unit.\n     */\n    function redeemInVault(\n        address _set,\n        uint256 _quantity\n    )\n        external;\n\n    /**\n     * Deposit multiple tokens to the vault. Quantities should be in the\n     * order of the addresses of the tokens being deposited.\n     *\n     * @param  _tokens           Array of the addresses of the ERC20 tokens\n     * @param  _quantities       Array of the number of tokens to deposit\n     */\n    function batchDeposit(\n        address[] _tokens,\n        uint256[] _quantities\n    )\n        external;\n\n    /**\n     * Withdraw multiple tokens from the vault. Quantities should be in the\n     * order of the addresses of the tokens being withdrawn.\n     *\n     * @param  _tokens            Array of the addresses of the ERC20 tokens\n     * @param  _quantities        Array of the number of tokens to withdraw\n     */\n    function batchWithdraw(\n        address[] _tokens,\n        uint256[] _quantities\n    )\n        external;\n\n    /**\n     * Deposit any quantity of tokens into the vault.\n     *\n     * @param  _token           The address of the ERC20 token\n     * @param  _quantity        The number of tokens to deposit\n     */\n    function deposit(\n        address _token,\n        uint256 _quantity\n    )\n        external;\n\n    /**\n     * Withdraw a quantity of tokens from the vault.\n     *\n     * @param  _token           The address of the ERC20 token\n     * @param  _quantity        The number of tokens to withdraw\n     */\n    function withdraw(\n        address _token,\n        uint256 _quantity\n    )\n        public;\n\n    /**\n     * Deploys a new Set Token and adds it to the valid list of SetTokens\n     *\n     * @param  _factory              The address of the Factory to create from\n     * @param  _components           The address of component tokens\n     * @param  _units                The units of each component token\n     * @param  _naturalUnit          The minimum unit to be issued or redeemed\n     * @param  _name                 The bytes32 encoded name of the new Set\n     * @param  _symbol               The bytes32 encoded symbol of the new Set\n     * @param  _callData             Byte string containing additional call parameters\n     * @return setTokenAddress       The address of the new Set\n     */\n    function create(\n        address _factory,\n        address[] _components,\n        uint256[] _units,\n        uint256 _naturalUnit,\n        string _name,\n        string _symbol,\n        bytes _callData\n    )\n        external\n        returns(address);\n\n    /**\n     * Fill an issuance order\n     *\n     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n     * @param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n     * @param  _requiredComponents        Components required for the issuance order\n     * @param  _requiredComponentAmounts  Component amounts required for the issuance order\n     * @param  _fillQuantity              Quantity of set to be filled\n     * @param  _v                         v element of ECDSA signature\n     * @param  sigBytes                   Array with r and s segments of ECDSA signature\n     * @param _orderData                  Bytes array containing the exchange orders to execute\n     */\n    function fillOrder(\n        address[5] _addresses,\n        uint[5] _values,\n        address[] _requiredComponents,\n        uint[] _requiredComponentAmounts,\n        uint _fillQuantity,\n        uint8 _v,\n        bytes32[] sigBytes,\n        bytes _orderData\n    )\n        external;\n\n    /**\n     * Cancel an issuance order\n     *\n     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n     * @param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n     * @param  _requiredComponents        Components required for the issuance order\n     * @param  _requiredComponentAmounts  Component amounts required for the issuance order\n     * @param  _cancelQuantity            Quantity of set to be canceled\n     */\n    function cancelOrder(\n        address[5] _addresses,\n        uint[5] _values,\n        address[] _requiredComponents,\n        uint[] _requiredComponentAmounts,\n        uint _cancelQuantity\n    )\n        external;\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICore.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICore.sol",
    "exportedSymbols": {
      "ICore": [
        3439
      ]
    },
    "id": 3440,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3287,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:11"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ICore\n@author Set Protocol\n * The ICore Contract defines all the functions exposed in the Core through its\nvarious extensions and is a light weight way to interact with the contract.",
        "fullyImplemented": false,
        "id": 3439,
        "linearizedBaseContracts": [
          3439
        ],
        "name": "ICore",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3294,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validSets",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3290,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3289,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3294,
                  "src": "977:7:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3288,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "977:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "976:9:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3293,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3292,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3294,
                  "src": "1033:4:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3291,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1033:4:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1032:6:11"
            },
            "scope": 3439,
            "src": "958:81:11",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vault   The address of the Vault",
            "id": 3299,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3297,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3296,
                  "name": "_vault",
                  "nodeType": "VariableDeclaration",
                  "scope": 3299,
                  "src": "1210:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3295,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1210:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1200:30:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3298,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1247:0:11"
            },
            "scope": 3439,
            "src": "1176:72:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxy   The address of the TransferProxy",
            "id": 3304,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3302,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3301,
                  "name": "_transferProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 3304,
                  "src": "1451:22:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3300,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1451:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1441:38:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3303,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1496:0:11"
            },
            "scope": 3439,
            "src": "1409:88:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Add a factory to the mapping of tracked factories.\n     * @param  _factory   The address of the SetTokenFactory to enable",
            "id": 3309,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3307,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3306,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3309,
                  "src": "1687:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3305,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1687:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1677:32:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3308,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1726:0:11"
            },
            "scope": 3439,
            "src": "1655:72:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a factory in the mapping of tracked factories.\n     * @param  _factory   The address of the SetTokenFactory to disable",
            "id": 3314,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3312,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3311,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3314,
                  "src": "1923:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3310,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1923:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1913:32:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3313,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1962:0:11"
            },
            "scope": 3439,
            "src": "1890:73:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a set token in the mapping of tracked set tokens.\n     * @param  _set   The address of the SetToken to remove",
            "id": 3319,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3317,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3316,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3319,
                  "src": "2146:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3315,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2146:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2136:28:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3318,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2181:0:11"
            },
            "scope": 3439,
            "src": "2117:65:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Exchanges components for Set Tokens\n     * @param  _set          Address of set to issue\n@param  _quantity     Quantity of set to issue",
            "id": 3326,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "issue",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3324,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3321,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3326,
                  "src": "2385:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3320,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2385:7:11",
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
                  "id": 3323,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3326,
                  "src": "2407:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3322,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2407:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2375:55:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3325,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2447:0:11"
            },
            "scope": 3439,
            "src": "2361:87:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Function to convert Set Tokens into underlying components\n     * @param _set          The address of the Set token\n@param _quantity     The number of tokens to redeem. Should be multiple of natural unit.",
            "id": 3333,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "redeem",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3331,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3328,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3333,
                  "src": "2720:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3327,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2720:7:11",
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
                  "id": 3330,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3333,
                  "src": "2742:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3329,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2742:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2710:55:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3332,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2782:0:11"
            },
            "scope": 3439,
            "src": "2695:88:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Function to convert Set Tokens held in vault into underlying components\n     * @param _set          The address of the Set token\n@param _quantity     The number of tokens to redeem. Should be multiple of natural unit.",
            "id": 3340,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "redeemInVault",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3338,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3335,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3340,
                  "src": "3076:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3334,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3076:7:11",
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
                  "id": 3337,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3340,
                  "src": "3098:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3336,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3098:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3066:55:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3339,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3138:0:11"
            },
            "scope": 3439,
            "src": "3044:95:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _tokens           Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 3349,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDeposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3347,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3343,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 3349,
                  "src": "3483:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3341,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3483:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3342,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3483:9:11",
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
                  "id": 3346,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 3349,
                  "src": "3510:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3344,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3510:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3345,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3510:9:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3473:64:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3348,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3554:0:11"
            },
            "scope": 3439,
            "src": "3452:103:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokens            Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 3358,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchWithdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3356,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3352,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 3358,
                  "src": "3906:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3350,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3906:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3351,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3906:9:11",
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
                  "id": 3355,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 3358,
                  "src": "3933:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3353,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3933:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3354,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3933:9:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3896:64:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3357,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3977:0:11"
            },
            "scope": 3439,
            "src": "3874:104:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 3365,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "deposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3363,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3360,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3365,
                  "src": "4214:14:11",
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
                    "src": "4214:7:11",
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
                  "id": 3362,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3365,
                  "src": "4238:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3361,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4238:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4204:57:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3364,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4278:0:11"
            },
            "scope": 3439,
            "src": "4188:91:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 3372,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3370,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3367,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3372,
                  "src": "4516:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3366,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4516:7:11",
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
                  "id": 3369,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3372,
                  "src": "4540:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3368,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4540:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4506:57:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3371,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4578:0:11"
            },
            "scope": 3439,
            "src": "4489:90:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _factory              The address of the Factory to create from\n@param  _components           The address of component tokens\n@param  _units                The units of each component token\n@param  _naturalUnit          The minimum unit to be issued or redeemed\n@param  _name                 The bytes32 encoded name of the new Set\n@param  _symbol               The bytes32 encoded symbol of the new Set\n@param  _callData             Byte string containing additional call parameters\n@return setTokenAddress       The address of the new Set",
            "id": 3393,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3389,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3374,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "5312:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3373,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5312:7:11",
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
                  "id": 3377,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "5338:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3375,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5338:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3376,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5338:9:11",
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
                  "id": 3380,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "5369:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3378,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "5369:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3379,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5369:9:11",
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
                  "id": 3382,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "5395:20:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3381,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "5395:7:11",
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
                  "id": 3384,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "5425:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 3383,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "5425:6:11",
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
                  "id": 3386,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "5447:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 3385,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "5447:6:11",
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
                  "id": 3388,
                  "name": "_callData",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "5471:15:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3387,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "5471:5:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5302:190:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3392,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3391,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "5526:7:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3390,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5526:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5525:9:11"
            },
            "scope": 3439,
            "src": "5287:248:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Fill an issuance order\n     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _requiredComponents        Components required for the issuance order\n@param  _requiredComponentAmounts  Component amounts required for the issuance order\n@param  _fillQuantity              Quantity of set to be filled\n@param  _v                         v element of ECDSA signature\n@param  sigBytes                   Array with r and s segments of ECDSA signature\n@param _orderData                  Bytes array containing the exchange orders to execute",
            "id": 3419,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3417,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3397,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 3419,
                  "src": "6346:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3394,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "6346:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3396,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 3395,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6354:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "6346:10:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$5_storage_ptr",
                      "typeString": "address[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3401,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 3419,
                  "src": "6377:15:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3398,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "6377:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3400,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 3399,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6382:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "6377:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$5_storage_ptr",
                      "typeString": "uint256[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3404,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 3419,
                  "src": "6402:29:11",
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
                      "src": "6402:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3403,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6402:9:11",
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
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 3419,
                  "src": "6441:32:11",
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
                      "src": "6441:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3406,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6441:6:11",
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
                  "id": 3409,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3419,
                  "src": "6483:18:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3408,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "6483:4:11",
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
                  "id": 3411,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 3419,
                  "src": "6511:8:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 3410,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "6511:5:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3414,
                  "name": "sigBytes",
                  "nodeType": "VariableDeclaration",
                  "scope": 3419,
                  "src": "6529:18:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                    "typeString": "bytes32[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3412,
                      "name": "bytes32",
                      "nodeType": "ElementaryTypeName",
                      "src": "6529:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "id": 3413,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6529:9:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes32_$dyn_storage_ptr",
                      "typeString": "bytes32[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3416,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 3419,
                  "src": "6557:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3415,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "6557:5:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6336:243:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3418,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6596:0:11"
            },
            "scope": 3439,
            "src": "6318:279:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Cancel an issuance order\n     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _requiredComponents        Components required for the issuance order\n@param  _requiredComponentAmounts  Component amounts required for the issuance order\n@param  _cancelQuantity            Quantity of set to be canceled",
            "id": 3438,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3436,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3423,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 3438,
                  "src": "7158:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3420,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "7158:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3422,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 3421,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "7166:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "7158:10:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$5_storage_ptr",
                      "typeString": "address[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3427,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 3438,
                  "src": "7189:15:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3424,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "7189:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3426,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 3425,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "7194:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "7189:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$5_storage_ptr",
                      "typeString": "uint256[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3430,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 3438,
                  "src": "7214:29:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3428,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "7214:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3429,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "7214:9:11",
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
                  "id": 3433,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 3438,
                  "src": "7253:32:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3431,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "7253:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3432,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "7253:6:11",
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
                  "id": 3435,
                  "name": "_cancelQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3438,
                  "src": "7295:20:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3434,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "7295:4:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7148:173:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3437,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "7338:0:11"
            },
            "scope": 3439,
            "src": "7128:211:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3440,
        "src": "833:6508:11"
      }
    ],
    "src": "597:6745:11"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICore.sol",
    "exportedSymbols": {
      "ICore": [
        3439
      ]
    },
    "id": 3440,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3287,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:11"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ICore\n@author Set Protocol\n * The ICore Contract defines all the functions exposed in the Core through its\nvarious extensions and is a light weight way to interact with the contract.",
        "fullyImplemented": false,
        "id": 3439,
        "linearizedBaseContracts": [
          3439
        ],
        "name": "ICore",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3294,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validSets",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3290,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3289,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3294,
                  "src": "977:7:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3288,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "977:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "976:9:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3293,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3292,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3294,
                  "src": "1033:4:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3291,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1033:4:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1032:6:11"
            },
            "scope": 3439,
            "src": "958:81:11",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vault   The address of the Vault",
            "id": 3299,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3297,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3296,
                  "name": "_vault",
                  "nodeType": "VariableDeclaration",
                  "scope": 3299,
                  "src": "1210:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3295,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1210:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1200:30:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3298,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1247:0:11"
            },
            "scope": 3439,
            "src": "1176:72:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxy   The address of the TransferProxy",
            "id": 3304,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3302,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3301,
                  "name": "_transferProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 3304,
                  "src": "1451:22:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3300,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1451:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1441:38:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3303,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1496:0:11"
            },
            "scope": 3439,
            "src": "1409:88:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Add a factory to the mapping of tracked factories.\n     * @param  _factory   The address of the SetTokenFactory to enable",
            "id": 3309,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3307,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3306,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3309,
                  "src": "1687:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3305,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1687:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1677:32:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3308,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1726:0:11"
            },
            "scope": 3439,
            "src": "1655:72:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a factory in the mapping of tracked factories.\n     * @param  _factory   The address of the SetTokenFactory to disable",
            "id": 3314,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3312,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3311,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3314,
                  "src": "1923:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3310,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1923:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1913:32:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3313,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1962:0:11"
            },
            "scope": 3439,
            "src": "1890:73:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a set token in the mapping of tracked set tokens.\n     * @param  _set   The address of the SetToken to remove",
            "id": 3319,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3317,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3316,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3319,
                  "src": "2146:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3315,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2146:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2136:28:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3318,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2181:0:11"
            },
            "scope": 3439,
            "src": "2117:65:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Exchanges components for Set Tokens\n     * @param  _set          Address of set to issue\n@param  _quantity     Quantity of set to issue",
            "id": 3326,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "issue",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3324,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3321,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3326,
                  "src": "2385:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3320,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2385:7:11",
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
                  "id": 3323,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3326,
                  "src": "2407:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3322,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2407:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2375:55:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3325,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2447:0:11"
            },
            "scope": 3439,
            "src": "2361:87:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Function to convert Set Tokens into underlying components\n     * @param _set          The address of the Set token\n@param _quantity     The number of tokens to redeem. Should be multiple of natural unit.",
            "id": 3333,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "redeem",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3331,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3328,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3333,
                  "src": "2720:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3327,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2720:7:11",
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
                  "id": 3330,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3333,
                  "src": "2742:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3329,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2742:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2710:55:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3332,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2782:0:11"
            },
            "scope": 3439,
            "src": "2695:88:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Function to convert Set Tokens held in vault into underlying components\n     * @param _set          The address of the Set token\n@param _quantity     The number of tokens to redeem. Should be multiple of natural unit.",
            "id": 3340,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "redeemInVault",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3338,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3335,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3340,
                  "src": "3076:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3334,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3076:7:11",
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
                  "id": 3337,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3340,
                  "src": "3098:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3336,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3098:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3066:55:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3339,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3138:0:11"
            },
            "scope": 3439,
            "src": "3044:95:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _tokens           Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 3349,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDeposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3347,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3343,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 3349,
                  "src": "3483:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3341,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3483:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3342,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3483:9:11",
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
                  "id": 3346,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 3349,
                  "src": "3510:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3344,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3510:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3345,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3510:9:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3473:64:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3348,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3554:0:11"
            },
            "scope": 3439,
            "src": "3452:103:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokens            Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 3358,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchWithdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3356,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3352,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 3358,
                  "src": "3906:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3350,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3906:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3351,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3906:9:11",
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
                  "id": 3355,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 3358,
                  "src": "3933:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3353,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3933:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3354,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3933:9:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3896:64:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3357,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3977:0:11"
            },
            "scope": 3439,
            "src": "3874:104:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 3365,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "deposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3363,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3360,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3365,
                  "src": "4214:14:11",
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
                    "src": "4214:7:11",
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
                  "id": 3362,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3365,
                  "src": "4238:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3361,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4238:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4204:57:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3364,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4278:0:11"
            },
            "scope": 3439,
            "src": "4188:91:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 3372,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3370,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3367,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3372,
                  "src": "4516:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3366,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4516:7:11",
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
                  "id": 3369,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3372,
                  "src": "4540:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3368,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4540:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4506:57:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3371,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4578:0:11"
            },
            "scope": 3439,
            "src": "4489:90:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _factory              The address of the Factory to create from\n@param  _components           The address of component tokens\n@param  _units                The units of each component token\n@param  _naturalUnit          The minimum unit to be issued or redeemed\n@param  _name                 The bytes32 encoded name of the new Set\n@param  _symbol               The bytes32 encoded symbol of the new Set\n@param  _callData             Byte string containing additional call parameters\n@return setTokenAddress       The address of the new Set",
            "id": 3393,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3389,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3374,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "5312:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3373,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5312:7:11",
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
                  "id": 3377,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "5338:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3375,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5338:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3376,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5338:9:11",
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
                  "id": 3380,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "5369:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3378,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "5369:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3379,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5369:9:11",
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
                  "id": 3382,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "5395:20:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3381,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "5395:7:11",
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
                  "id": 3384,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "5425:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 3383,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "5425:6:11",
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
                  "id": 3386,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "5447:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 3385,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "5447:6:11",
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
                  "id": 3388,
                  "name": "_callData",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "5471:15:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3387,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "5471:5:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5302:190:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3392,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3391,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "5526:7:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3390,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5526:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5525:9:11"
            },
            "scope": 3439,
            "src": "5287:248:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Fill an issuance order\n     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _requiredComponents        Components required for the issuance order\n@param  _requiredComponentAmounts  Component amounts required for the issuance order\n@param  _fillQuantity              Quantity of set to be filled\n@param  _v                         v element of ECDSA signature\n@param  sigBytes                   Array with r and s segments of ECDSA signature\n@param _orderData                  Bytes array containing the exchange orders to execute",
            "id": 3419,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3417,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3397,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 3419,
                  "src": "6346:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3394,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "6346:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3396,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 3395,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6354:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "6346:10:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$5_storage_ptr",
                      "typeString": "address[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3401,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 3419,
                  "src": "6377:15:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3398,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "6377:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3400,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 3399,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6382:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "6377:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$5_storage_ptr",
                      "typeString": "uint256[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3404,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 3419,
                  "src": "6402:29:11",
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
                      "src": "6402:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3403,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6402:9:11",
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
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 3419,
                  "src": "6441:32:11",
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
                      "src": "6441:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3406,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6441:6:11",
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
                  "id": 3409,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3419,
                  "src": "6483:18:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3408,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "6483:4:11",
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
                  "id": 3411,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 3419,
                  "src": "6511:8:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 3410,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "6511:5:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3414,
                  "name": "sigBytes",
                  "nodeType": "VariableDeclaration",
                  "scope": 3419,
                  "src": "6529:18:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                    "typeString": "bytes32[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3412,
                      "name": "bytes32",
                      "nodeType": "ElementaryTypeName",
                      "src": "6529:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "id": 3413,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6529:9:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes32_$dyn_storage_ptr",
                      "typeString": "bytes32[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3416,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 3419,
                  "src": "6557:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3415,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "6557:5:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6336:243:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3418,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6596:0:11"
            },
            "scope": 3439,
            "src": "6318:279:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Cancel an issuance order\n     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _requiredComponents        Components required for the issuance order\n@param  _requiredComponentAmounts  Component amounts required for the issuance order\n@param  _cancelQuantity            Quantity of set to be canceled",
            "id": 3438,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3436,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3423,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 3438,
                  "src": "7158:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3420,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "7158:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3422,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 3421,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "7166:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "7158:10:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$5_storage_ptr",
                      "typeString": "address[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3427,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 3438,
                  "src": "7189:15:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3424,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "7189:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3426,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 3425,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "7194:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "7189:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$5_storage_ptr",
                      "typeString": "uint256[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3430,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 3438,
                  "src": "7214:29:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3428,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "7214:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3429,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "7214:9:11",
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
                  "id": 3433,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 3438,
                  "src": "7253:32:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3431,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "7253:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3432,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "7253:6:11",
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
                  "id": 3435,
                  "name": "_cancelQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3438,
                  "src": "7295:20:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3434,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "7295:4:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7148:173:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3437,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "7338:0:11"
            },
            "scope": 3439,
            "src": "7128:211:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3440,
        "src": "833:6508:11"
      }
    ],
    "src": "597:6745:11"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-25T17:34:39.487Z"
}