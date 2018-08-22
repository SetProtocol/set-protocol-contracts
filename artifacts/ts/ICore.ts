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
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\n/**\n * @title ICore\n * @author Set Protocol\n *\n * The ICore Contract defines all the functions exposed in the Core through its\n * various extensions and is a light weight way to interact with the contract.\n */\ninterface ICore {\n    /*\n     * Get natural unit of Set\n     *\n     * @return  uint256       Natural unit of Set\n     */\n    function validSets(address)\n        external\n        view\n        returns (bool);\n\n    /**\n     * Set vaultAddress. Can only be set by owner of Core.\n     *\n     * @param  _vault   The address of the Vault\n     */\n    function setVaultAddress(\n        address _vault\n    )\n        external;\n\n    /**\n     * Set transferProxyAddress. Can only be set by owner of Core.\n     *\n     * @param  _transferProxy   The address of the TransferProxy\n     */\n    function setTransferProxyAddress(\n        address _transferProxy\n    )\n        external;\n\n    /**\n     * Add a factory to the mapping of tracked factories.\n     *\n     * @param  _factory   The address of the SetTokenFactory to enable\n     */\n    function enableFactory(\n        address _factory\n    )\n        external;\n\n    /**\n     * Disable a factory in the mapping of tracked factories.\n     *\n     * @param  _factory   The address of the SetTokenFactory to disable\n     */\n    function disableFactory(\n        address _factory\n    )\n        external;\n\n    /**\n     * Disable a set token in the mapping of tracked set tokens.\n     *\n     * @param  _set   The address of the SetToken to remove\n     */\n    function disableSet(\n        address _set\n    )\n        external;\n\n    /**\n     * Exchanges components for Set Tokens\n     *\n     * @param  _set          Address of set to issue\n     * @param  _quantity     Quantity of set to issue\n     */\n    function issue(\n        address _set,\n        uint256 _quantity\n    )\n        external;\n\n    /**\n     * Function to convert Set Tokens into underlying components\n     *\n     * @param _set          The address of the Set token\n     * @param _quantity     The number of tokens to redeem. Should be multiple of natural unit.\n     */\n    function redeem(\n        address _set,\n        uint256 _quantity\n    )\n        external;\n\n    /**\n     * Deposit multiple tokens to the vault. Quantities should be in the\n     * order of the addresses of the tokens being deposited.\n     *\n     * @param  _tokens           Array of the addresses of the ERC20 tokens\n     * @param  _quantities       Array of the number of tokens to deposit\n     */\n    function batchDeposit(\n        address[] _tokens,\n        uint256[] _quantities\n    )\n        external;\n\n    /**\n     * Withdraw multiple tokens from the vault. Quantities should be in the\n     * order of the addresses of the tokens being withdrawn.\n     *\n     * @param  _tokens            Array of the addresses of the ERC20 tokens\n     * @param  _quantities        Array of the number of tokens to withdraw\n     */\n    function batchWithdraw(\n        address[] _tokens,\n        uint256[] _quantities\n    )\n        external;\n\n    /**\n     * Deposit any quantity of tokens into the vault.\n     *\n     * @param  _token           The address of the ERC20 token\n     * @param  _quantity        The number of tokens to deposit\n     */\n    function deposit(\n        address _token,\n        uint256 _quantity\n    )\n        external;\n\n    /**\n     * Withdraw a quantity of tokens from the vault.\n     *\n     * @param  _token           The address of the ERC20 token\n     * @param  _quantity        The number of tokens to withdraw\n     */\n    function withdraw(\n        address _token,\n        uint256 _quantity\n    )\n        public;\n\n    /**\n     * Deploys a new Set Token and adds it to the valid list of SetTokens\n     *\n     * @param  _factory              The address of the Factory to create from\n     * @param  _components           The address of component tokens\n     * @param  _units                The units of each component token\n     * @param  _naturalUnit          The minimum unit to be issued or redeemed\n     * @param  _name                 The bytes32 encoded name of the new Set\n     * @param  _symbol               The bytes32 encoded symbol of the new Set\n     * @param  _callData             Byte string containing additional call parameters\n     * @return setTokenAddress       The address of the new Set\n     */\n    function create(\n        address _factory,\n        address[] _components,\n        uint256[] _units,\n        uint256 _naturalUnit,\n        string _name,\n        string _symbol,\n        bytes _callData\n    )\n        external\n        returns(address);\n\n    /**\n     * Fill an issuance order\n     *\n     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n     * @param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n     * @param  _requiredComponents        Components required for the issuance order\n     * @param  _requiredComponentAmounts  Component amounts required for the issuance order\n     * @param  _fillQuantity              Quantity of set to be filled\n     * @param  _v                         v element of ECDSA signature\n     * @param  sigBytes                   Array with r and s segments of ECDSA signature\n     * @param _orderData                  Bytes array containing the exchange orders to execute\n     */\n    function fillOrder(\n        address[5] _addresses,\n        uint[5] _values,\n        address[] _requiredComponents,\n        uint[] _requiredComponentAmounts,\n        uint _fillQuantity,\n        uint8 _v,\n        bytes32[] sigBytes,\n        bytes _orderData\n    )\n        external;\n\n    /**\n     * Cancel an issuance order\n     *\n     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n     * @param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n     * @param  _requiredComponents        Components required for the issuance order\n     * @param  _requiredComponentAmounts  Component amounts required for the issuance order\n     * @param  _cancelQuantity            Quantity of set to be canceled\n     */\n    function cancelOrder(\n        address[5] _addresses,\n        uint[5] _values,\n        address[] _requiredComponents,\n        uint[] _requiredComponentAmounts,\n        uint _cancelQuantity\n    )\n        external;\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICore.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICore.sol",
    "exportedSymbols": {
      "ICore": [
        3298
      ]
    },
    "id": 3299,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3153,
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
        "id": 3298,
        "linearizedBaseContracts": [
          3298
        ],
        "name": "ICore",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3160,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validSets",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3156,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3155,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3160,
                  "src": "977:7:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3154,
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
              "id": 3159,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3158,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3160,
                  "src": "1033:4:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3157,
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
            "scope": 3298,
            "src": "958:81:11",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vault   The address of the Vault",
            "id": 3165,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3163,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3162,
                  "name": "_vault",
                  "nodeType": "VariableDeclaration",
                  "scope": 3165,
                  "src": "1210:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3161,
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
              "id": 3164,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1247:0:11"
            },
            "scope": 3298,
            "src": "1176:72:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxy   The address of the TransferProxy",
            "id": 3170,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3168,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3167,
                  "name": "_transferProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 3170,
                  "src": "1451:22:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3166,
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
              "id": 3169,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1496:0:11"
            },
            "scope": 3298,
            "src": "1409:88:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Add a factory to the mapping of tracked factories.\n     * @param  _factory   The address of the SetTokenFactory to enable",
            "id": 3175,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3173,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3172,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3175,
                  "src": "1687:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3171,
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
              "id": 3174,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1726:0:11"
            },
            "scope": 3298,
            "src": "1655:72:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a factory in the mapping of tracked factories.\n     * @param  _factory   The address of the SetTokenFactory to disable",
            "id": 3180,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3178,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3177,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3180,
                  "src": "1923:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3176,
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
              "id": 3179,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1962:0:11"
            },
            "scope": 3298,
            "src": "1890:73:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a set token in the mapping of tracked set tokens.\n     * @param  _set   The address of the SetToken to remove",
            "id": 3185,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3183,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3182,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3185,
                  "src": "2146:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3181,
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
              "id": 3184,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2181:0:11"
            },
            "scope": 3298,
            "src": "2117:65:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Exchanges components for Set Tokens\n     * @param  _set          Address of set to issue\n@param  _quantity     Quantity of set to issue",
            "id": 3192,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "issue",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3190,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3187,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3192,
                  "src": "2385:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3186,
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
                  "id": 3189,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3192,
                  "src": "2407:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3188,
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
              "id": 3191,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2447:0:11"
            },
            "scope": 3298,
            "src": "2361:87:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Function to convert Set Tokens into underlying components\n     * @param _set          The address of the Set token\n@param _quantity     The number of tokens to redeem. Should be multiple of natural unit.",
            "id": 3199,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "redeem",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3197,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3194,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3199,
                  "src": "2720:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3193,
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
                  "id": 3196,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3199,
                  "src": "2742:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3195,
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
              "id": 3198,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2782:0:11"
            },
            "scope": 3298,
            "src": "2695:88:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _tokens           Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 3208,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDeposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3206,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3202,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 3208,
                  "src": "3127:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3200,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3127:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3201,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3127:9:11",
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
                  "id": 3205,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 3208,
                  "src": "3154:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3203,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3154:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3204,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3154:9:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3117:64:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3207,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3198:0:11"
            },
            "scope": 3298,
            "src": "3096:103:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokens            Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 3217,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchWithdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3215,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3211,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 3217,
                  "src": "3550:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3209,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3550:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3210,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3550:9:11",
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
                  "id": 3214,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 3217,
                  "src": "3577:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3212,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3577:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3213,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3577:9:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3540:64:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3216,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3621:0:11"
            },
            "scope": 3298,
            "src": "3518:104:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 3224,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "deposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3222,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3219,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3224,
                  "src": "3858:14:11",
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
                    "src": "3858:7:11",
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
                  "id": 3221,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3224,
                  "src": "3882:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3220,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3882:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3848:57:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3223,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3922:0:11"
            },
            "scope": 3298,
            "src": "3832:91:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 3231,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3229,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3226,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3231,
                  "src": "4160:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3225,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4160:7:11",
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
                  "id": 3228,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3231,
                  "src": "4184:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3227,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4184:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4150:57:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3230,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4222:0:11"
            },
            "scope": 3298,
            "src": "4133:90:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _factory              The address of the Factory to create from\n@param  _components           The address of component tokens\n@param  _units                The units of each component token\n@param  _naturalUnit          The minimum unit to be issued or redeemed\n@param  _name                 The bytes32 encoded name of the new Set\n@param  _symbol               The bytes32 encoded symbol of the new Set\n@param  _callData             Byte string containing additional call parameters\n@return setTokenAddress       The address of the new Set",
            "id": 3252,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3248,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3233,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3252,
                  "src": "4956:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3232,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4956:7:11",
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
                  "id": 3236,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 3252,
                  "src": "4982:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3234,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "4982:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3235,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4982:9:11",
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
                  "id": 3239,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 3252,
                  "src": "5013:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3237,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "5013:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3238,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5013:9:11",
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
                  "id": 3241,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 3252,
                  "src": "5039:20:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3240,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "5039:7:11",
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
                  "id": 3243,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 3252,
                  "src": "5069:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 3242,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "5069:6:11",
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
                  "id": 3245,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 3252,
                  "src": "5091:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 3244,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "5091:6:11",
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
                  "id": 3247,
                  "name": "_callData",
                  "nodeType": "VariableDeclaration",
                  "scope": 3252,
                  "src": "5115:15:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3246,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "5115:5:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4946:190:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3251,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3250,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3252,
                  "src": "5170:7:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3249,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5170:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5169:9:11"
            },
            "scope": 3298,
            "src": "4931:248:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Fill an issuance order\n     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _requiredComponents        Components required for the issuance order\n@param  _requiredComponentAmounts  Component amounts required for the issuance order\n@param  _fillQuantity              Quantity of set to be filled\n@param  _v                         v element of ECDSA signature\n@param  sigBytes                   Array with r and s segments of ECDSA signature\n@param _orderData                  Bytes array containing the exchange orders to execute",
            "id": 3278,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3276,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3256,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 3278,
                  "src": "5990:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3253,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5990:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3255,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 3254,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5998:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "5990:10:11",
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
                  "id": 3260,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 3278,
                  "src": "6021:15:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3257,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "6021:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3259,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 3258,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6026:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "6021:7:11",
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
                  "id": 3263,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 3278,
                  "src": "6046:29:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3261,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "6046:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3262,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6046:9:11",
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
                  "id": 3266,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 3278,
                  "src": "6085:32:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3264,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "6085:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3265,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6085:6:11",
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
                  "id": 3268,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3278,
                  "src": "6127:18:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3267,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "6127:4:11",
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
                  "id": 3270,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 3278,
                  "src": "6155:8:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 3269,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "6155:5:11",
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
                  "id": 3273,
                  "name": "sigBytes",
                  "nodeType": "VariableDeclaration",
                  "scope": 3278,
                  "src": "6173:18:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                    "typeString": "bytes32[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3271,
                      "name": "bytes32",
                      "nodeType": "ElementaryTypeName",
                      "src": "6173:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "id": 3272,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6173:9:11",
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
                  "id": 3275,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 3278,
                  "src": "6201:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3274,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "6201:5:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5980:243:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3277,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6240:0:11"
            },
            "scope": 3298,
            "src": "5962:279:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Cancel an issuance order\n     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _requiredComponents        Components required for the issuance order\n@param  _requiredComponentAmounts  Component amounts required for the issuance order\n@param  _cancelQuantity            Quantity of set to be canceled",
            "id": 3297,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3295,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3282,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 3297,
                  "src": "6802:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3279,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "6802:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3281,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 3280,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6810:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "6802:10:11",
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
                  "id": 3286,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 3297,
                  "src": "6833:15:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3283,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "6833:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3285,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 3284,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6838:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "6833:7:11",
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
                  "id": 3289,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 3297,
                  "src": "6858:29:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3287,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "6858:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3288,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6858:9:11",
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
                  "id": 3292,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 3297,
                  "src": "6897:32:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3290,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "6897:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3291,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6897:6:11",
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
                  "id": 3294,
                  "name": "_cancelQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3297,
                  "src": "6939:20:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3293,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "6939:4:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6792:173:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3296,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6982:0:11"
            },
            "scope": 3298,
            "src": "6772:211:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3299,
        "src": "833:6152:11"
      }
    ],
    "src": "597:6389:11"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICore.sol",
    "exportedSymbols": {
      "ICore": [
        3298
      ]
    },
    "id": 3299,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3153,
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
        "id": 3298,
        "linearizedBaseContracts": [
          3298
        ],
        "name": "ICore",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3160,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validSets",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3156,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3155,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3160,
                  "src": "977:7:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3154,
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
              "id": 3159,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3158,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3160,
                  "src": "1033:4:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3157,
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
            "scope": 3298,
            "src": "958:81:11",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vault   The address of the Vault",
            "id": 3165,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3163,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3162,
                  "name": "_vault",
                  "nodeType": "VariableDeclaration",
                  "scope": 3165,
                  "src": "1210:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3161,
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
              "id": 3164,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1247:0:11"
            },
            "scope": 3298,
            "src": "1176:72:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxy   The address of the TransferProxy",
            "id": 3170,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3168,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3167,
                  "name": "_transferProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 3170,
                  "src": "1451:22:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3166,
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
              "id": 3169,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1496:0:11"
            },
            "scope": 3298,
            "src": "1409:88:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Add a factory to the mapping of tracked factories.\n     * @param  _factory   The address of the SetTokenFactory to enable",
            "id": 3175,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3173,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3172,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3175,
                  "src": "1687:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3171,
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
              "id": 3174,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1726:0:11"
            },
            "scope": 3298,
            "src": "1655:72:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a factory in the mapping of tracked factories.\n     * @param  _factory   The address of the SetTokenFactory to disable",
            "id": 3180,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3178,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3177,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3180,
                  "src": "1923:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3176,
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
              "id": 3179,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1962:0:11"
            },
            "scope": 3298,
            "src": "1890:73:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a set token in the mapping of tracked set tokens.\n     * @param  _set   The address of the SetToken to remove",
            "id": 3185,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3183,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3182,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3185,
                  "src": "2146:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3181,
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
              "id": 3184,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2181:0:11"
            },
            "scope": 3298,
            "src": "2117:65:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Exchanges components for Set Tokens\n     * @param  _set          Address of set to issue\n@param  _quantity     Quantity of set to issue",
            "id": 3192,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "issue",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3190,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3187,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3192,
                  "src": "2385:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3186,
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
                  "id": 3189,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3192,
                  "src": "2407:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3188,
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
              "id": 3191,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2447:0:11"
            },
            "scope": 3298,
            "src": "2361:87:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Function to convert Set Tokens into underlying components\n     * @param _set          The address of the Set token\n@param _quantity     The number of tokens to redeem. Should be multiple of natural unit.",
            "id": 3199,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "redeem",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3197,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3194,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3199,
                  "src": "2720:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3193,
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
                  "id": 3196,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3199,
                  "src": "2742:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3195,
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
              "id": 3198,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2782:0:11"
            },
            "scope": 3298,
            "src": "2695:88:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _tokens           Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 3208,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDeposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3206,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3202,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 3208,
                  "src": "3127:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3200,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3127:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3201,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3127:9:11",
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
                  "id": 3205,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 3208,
                  "src": "3154:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3203,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3154:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3204,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3154:9:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3117:64:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3207,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3198:0:11"
            },
            "scope": 3298,
            "src": "3096:103:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokens            Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 3217,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchWithdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3215,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3211,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 3217,
                  "src": "3550:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3209,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3550:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3210,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3550:9:11",
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
                  "id": 3214,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 3217,
                  "src": "3577:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3212,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3577:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3213,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3577:9:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3540:64:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3216,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3621:0:11"
            },
            "scope": 3298,
            "src": "3518:104:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 3224,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "deposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3222,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3219,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3224,
                  "src": "3858:14:11",
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
                    "src": "3858:7:11",
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
                  "id": 3221,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3224,
                  "src": "3882:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3220,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3882:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3848:57:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3223,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3922:0:11"
            },
            "scope": 3298,
            "src": "3832:91:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 3231,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3229,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3226,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3231,
                  "src": "4160:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3225,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4160:7:11",
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
                  "id": 3228,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3231,
                  "src": "4184:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3227,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4184:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4150:57:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3230,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4222:0:11"
            },
            "scope": 3298,
            "src": "4133:90:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _factory              The address of the Factory to create from\n@param  _components           The address of component tokens\n@param  _units                The units of each component token\n@param  _naturalUnit          The minimum unit to be issued or redeemed\n@param  _name                 The bytes32 encoded name of the new Set\n@param  _symbol               The bytes32 encoded symbol of the new Set\n@param  _callData             Byte string containing additional call parameters\n@return setTokenAddress       The address of the new Set",
            "id": 3252,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3248,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3233,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3252,
                  "src": "4956:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3232,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4956:7:11",
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
                  "id": 3236,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 3252,
                  "src": "4982:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3234,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "4982:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3235,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4982:9:11",
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
                  "id": 3239,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 3252,
                  "src": "5013:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3237,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "5013:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3238,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5013:9:11",
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
                  "id": 3241,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 3252,
                  "src": "5039:20:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3240,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "5039:7:11",
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
                  "id": 3243,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 3252,
                  "src": "5069:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 3242,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "5069:6:11",
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
                  "id": 3245,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 3252,
                  "src": "5091:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 3244,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "5091:6:11",
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
                  "id": 3247,
                  "name": "_callData",
                  "nodeType": "VariableDeclaration",
                  "scope": 3252,
                  "src": "5115:15:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3246,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "5115:5:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4946:190:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3251,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3250,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3252,
                  "src": "5170:7:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3249,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5170:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5169:9:11"
            },
            "scope": 3298,
            "src": "4931:248:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Fill an issuance order\n     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _requiredComponents        Components required for the issuance order\n@param  _requiredComponentAmounts  Component amounts required for the issuance order\n@param  _fillQuantity              Quantity of set to be filled\n@param  _v                         v element of ECDSA signature\n@param  sigBytes                   Array with r and s segments of ECDSA signature\n@param _orderData                  Bytes array containing the exchange orders to execute",
            "id": 3278,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3276,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3256,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 3278,
                  "src": "5990:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3253,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5990:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3255,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 3254,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5998:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "5990:10:11",
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
                  "id": 3260,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 3278,
                  "src": "6021:15:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3257,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "6021:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3259,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 3258,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6026:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "6021:7:11",
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
                  "id": 3263,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 3278,
                  "src": "6046:29:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3261,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "6046:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3262,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6046:9:11",
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
                  "id": 3266,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 3278,
                  "src": "6085:32:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3264,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "6085:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3265,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6085:6:11",
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
                  "id": 3268,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3278,
                  "src": "6127:18:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3267,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "6127:4:11",
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
                  "id": 3270,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 3278,
                  "src": "6155:8:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 3269,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "6155:5:11",
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
                  "id": 3273,
                  "name": "sigBytes",
                  "nodeType": "VariableDeclaration",
                  "scope": 3278,
                  "src": "6173:18:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                    "typeString": "bytes32[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3271,
                      "name": "bytes32",
                      "nodeType": "ElementaryTypeName",
                      "src": "6173:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "id": 3272,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6173:9:11",
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
                  "id": 3275,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 3278,
                  "src": "6201:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3274,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "6201:5:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5980:243:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3277,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6240:0:11"
            },
            "scope": 3298,
            "src": "5962:279:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Cancel an issuance order\n     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _requiredComponents        Components required for the issuance order\n@param  _requiredComponentAmounts  Component amounts required for the issuance order\n@param  _cancelQuantity            Quantity of set to be canceled",
            "id": 3297,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3295,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3282,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 3297,
                  "src": "6802:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3279,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "6802:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3281,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 3280,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6810:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "6802:10:11",
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
                  "id": 3286,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 3297,
                  "src": "6833:15:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3283,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "6833:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3285,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 3284,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6838:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "6833:7:11",
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
                  "id": 3289,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 3297,
                  "src": "6858:29:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3287,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "6858:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3288,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6858:9:11",
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
                  "id": 3292,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 3297,
                  "src": "6897:32:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3290,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "6897:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3291,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6897:6:11",
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
                  "id": 3294,
                  "name": "_cancelQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3297,
                  "src": "6939:20:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3293,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "6939:4:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6792:173:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 3296,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6982:0:11"
            },
            "scope": 3298,
            "src": "6772:211:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3299,
        "src": "833:6152:11"
      }
    ],
    "src": "597:6389:11"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T15:29:45.016Z"
}