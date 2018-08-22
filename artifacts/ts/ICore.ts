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
        4187
      ]
    },
    "id": 4188,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4042,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:17"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ICore\n@author Set Protocol\n * The ICore Contract defines all the functions exposed in the Core through its\nvarious extensions and is a light weight way to interact with the contract.",
        "fullyImplemented": false,
        "id": 4187,
        "linearizedBaseContracts": [
          4187
        ],
        "name": "ICore",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 4049,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validSets",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4045,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4044,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4049,
                  "src": "977:7:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4043,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "977:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "976:9:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4048,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4047,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4049,
                  "src": "1033:4:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 4046,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1033:4:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1032:6:17"
            },
            "scope": 4187,
            "src": "958:81:17",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vault   The address of the Vault",
            "id": 4054,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4052,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4051,
                  "name": "_vault",
                  "nodeType": "VariableDeclaration",
                  "scope": 4054,
                  "src": "1210:14:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4050,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1210:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1200:30:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4053,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1247:0:17"
            },
            "scope": 4187,
            "src": "1176:72:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxy   The address of the TransferProxy",
            "id": 4059,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4057,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4056,
                  "name": "_transferProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 4059,
                  "src": "1451:22:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4055,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1451:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1441:38:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4058,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1496:0:17"
            },
            "scope": 4187,
            "src": "1409:88:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Add a factory to the mapping of tracked factories.\n     * @param  _factory   The address of the SetTokenFactory to enable",
            "id": 4064,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4062,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4061,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 4064,
                  "src": "1687:16:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4060,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1687:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1677:32:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4063,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1726:0:17"
            },
            "scope": 4187,
            "src": "1655:72:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a factory in the mapping of tracked factories.\n     * @param  _factory   The address of the SetTokenFactory to disable",
            "id": 4069,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4067,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4066,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 4069,
                  "src": "1923:16:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4065,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1923:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1913:32:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4068,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1962:0:17"
            },
            "scope": 4187,
            "src": "1890:73:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a set token in the mapping of tracked set tokens.\n     * @param  _set   The address of the SetToken to remove",
            "id": 4074,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4072,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4071,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 4074,
                  "src": "2146:12:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4070,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2146:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2136:28:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4073,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2181:0:17"
            },
            "scope": 4187,
            "src": "2117:65:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Exchanges components for Set Tokens\n     * @param  _set          Address of set to issue\n@param  _quantity     Quantity of set to issue",
            "id": 4081,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "issue",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4079,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4076,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 4081,
                  "src": "2385:12:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4075,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2385:7:17",
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
                  "id": 4078,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4081,
                  "src": "2407:17:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4077,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2407:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2375:55:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4080,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2447:0:17"
            },
            "scope": 4187,
            "src": "2361:87:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Function to convert Set Tokens into underlying components\n     * @param _set          The address of the Set token\n@param _quantity     The number of tokens to redeem. Should be multiple of natural unit.",
            "id": 4088,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "redeem",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4086,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4083,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 4088,
                  "src": "2720:12:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4082,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2720:7:17",
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
                  "id": 4085,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4088,
                  "src": "2742:17:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4084,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2742:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2710:55:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4087,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2782:0:17"
            },
            "scope": 4187,
            "src": "2695:88:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _tokens           Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 4097,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDeposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4095,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4091,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 4097,
                  "src": "3127:17:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4089,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3127:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4090,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3127:9:17",
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
                  "id": 4094,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 4097,
                  "src": "3154:21:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4092,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3154:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4093,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3154:9:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3117:64:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4096,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3198:0:17"
            },
            "scope": 4187,
            "src": "3096:103:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokens            Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 4106,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchWithdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4104,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4100,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 4106,
                  "src": "3550:17:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4098,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3550:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4099,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3550:9:17",
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
                  "id": 4103,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 4106,
                  "src": "3577:21:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4101,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3577:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4102,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3577:9:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3540:64:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4105,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3621:0:17"
            },
            "scope": 4187,
            "src": "3518:104:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 4113,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "deposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4111,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4108,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4113,
                  "src": "3858:14:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4107,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3858:7:17",
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
                  "id": 4110,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4113,
                  "src": "3882:17:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4109,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3882:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3848:57:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4112,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3922:0:17"
            },
            "scope": 4187,
            "src": "3832:91:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 4120,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4118,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4115,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4120,
                  "src": "4160:14:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4114,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4160:7:17",
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
                  "id": 4117,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4120,
                  "src": "4184:17:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4116,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4184:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4150:57:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4119,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4222:0:17"
            },
            "scope": 4187,
            "src": "4133:90:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _factory              The address of the Factory to create from\n@param  _components           The address of component tokens\n@param  _units                The units of each component token\n@param  _naturalUnit          The minimum unit to be issued or redeemed\n@param  _name                 The bytes32 encoded name of the new Set\n@param  _symbol               The bytes32 encoded symbol of the new Set\n@param  _callData             Byte string containing additional call parameters\n@return setTokenAddress       The address of the new Set",
            "id": 4141,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4137,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4122,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 4141,
                  "src": "4956:16:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4121,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4956:7:17",
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
                  "id": 4125,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 4141,
                  "src": "4982:21:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4123,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "4982:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4124,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4982:9:17",
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
                  "id": 4128,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 4141,
                  "src": "5013:16:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4126,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "5013:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4127,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5013:9:17",
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
                  "id": 4130,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 4141,
                  "src": "5039:20:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4129,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "5039:7:17",
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
                  "id": 4132,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 4141,
                  "src": "5069:12:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 4131,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "5069:6:17",
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
                  "id": 4134,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 4141,
                  "src": "5091:14:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 4133,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "5091:6:17",
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
                  "id": 4136,
                  "name": "_callData",
                  "nodeType": "VariableDeclaration",
                  "scope": 4141,
                  "src": "5115:15:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4135,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "5115:5:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4946:190:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4140,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4139,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4141,
                  "src": "5170:7:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4138,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5170:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5169:9:17"
            },
            "scope": 4187,
            "src": "4931:248:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Fill an issuance order\n     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _requiredComponents        Components required for the issuance order\n@param  _requiredComponentAmounts  Component amounts required for the issuance order\n@param  _fillQuantity              Quantity of set to be filled\n@param  _v                         v element of ECDSA signature\n@param  sigBytes                   Array with r and s segments of ECDSA signature\n@param _orderData                  Bytes array containing the exchange orders to execute",
            "id": 4167,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4165,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4145,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 4167,
                  "src": "5990:21:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4142,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5990:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4144,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 4143,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5998:1:17",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "5990:10:17",
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
                  "id": 4149,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 4167,
                  "src": "6021:15:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4146,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "6021:4:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4148,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 4147,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6026:1:17",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "6021:7:17",
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
                  "id": 4152,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 4167,
                  "src": "6046:29:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4150,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "6046:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4151,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6046:9:17",
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
                  "id": 4155,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4167,
                  "src": "6085:32:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4153,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "6085:4:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4154,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6085:6:17",
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
                  "id": 4157,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4167,
                  "src": "6127:18:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4156,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "6127:4:17",
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
                  "id": 4159,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 4167,
                  "src": "6155:8:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 4158,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "6155:5:17",
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
                  "id": 4162,
                  "name": "sigBytes",
                  "nodeType": "VariableDeclaration",
                  "scope": 4167,
                  "src": "6173:18:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                    "typeString": "bytes32[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4160,
                      "name": "bytes32",
                      "nodeType": "ElementaryTypeName",
                      "src": "6173:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "id": 4161,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6173:9:17",
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
                  "id": 4164,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 4167,
                  "src": "6201:16:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4163,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "6201:5:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5980:243:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4166,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6240:0:17"
            },
            "scope": 4187,
            "src": "5962:279:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Cancel an issuance order\n     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _requiredComponents        Components required for the issuance order\n@param  _requiredComponentAmounts  Component amounts required for the issuance order\n@param  _cancelQuantity            Quantity of set to be canceled",
            "id": 4186,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4184,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4171,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 4186,
                  "src": "6802:21:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4168,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "6802:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4170,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 4169,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6810:1:17",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "6802:10:17",
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
                  "id": 4175,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 4186,
                  "src": "6833:15:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4172,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "6833:4:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4174,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 4173,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6838:1:17",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "6833:7:17",
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
                  "id": 4178,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 4186,
                  "src": "6858:29:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4176,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "6858:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4177,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6858:9:17",
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
                  "id": 4181,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4186,
                  "src": "6897:32:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4179,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "6897:4:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4180,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6897:6:17",
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
                  "id": 4183,
                  "name": "_cancelQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4186,
                  "src": "6939:20:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4182,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "6939:4:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6792:173:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4185,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6982:0:17"
            },
            "scope": 4187,
            "src": "6772:211:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4188,
        "src": "833:6152:17"
      }
    ],
    "src": "597:6389:17"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICore.sol",
    "exportedSymbols": {
      "ICore": [
        4187
      ]
    },
    "id": 4188,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4042,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:17"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ICore\n@author Set Protocol\n * The ICore Contract defines all the functions exposed in the Core through its\nvarious extensions and is a light weight way to interact with the contract.",
        "fullyImplemented": false,
        "id": 4187,
        "linearizedBaseContracts": [
          4187
        ],
        "name": "ICore",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 4049,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validSets",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4045,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4044,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4049,
                  "src": "977:7:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4043,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "977:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "976:9:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4048,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4047,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4049,
                  "src": "1033:4:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 4046,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1033:4:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1032:6:17"
            },
            "scope": 4187,
            "src": "958:81:17",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vault   The address of the Vault",
            "id": 4054,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4052,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4051,
                  "name": "_vault",
                  "nodeType": "VariableDeclaration",
                  "scope": 4054,
                  "src": "1210:14:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4050,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1210:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1200:30:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4053,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1247:0:17"
            },
            "scope": 4187,
            "src": "1176:72:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxy   The address of the TransferProxy",
            "id": 4059,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4057,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4056,
                  "name": "_transferProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 4059,
                  "src": "1451:22:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4055,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1451:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1441:38:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4058,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1496:0:17"
            },
            "scope": 4187,
            "src": "1409:88:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Add a factory to the mapping of tracked factories.\n     * @param  _factory   The address of the SetTokenFactory to enable",
            "id": 4064,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4062,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4061,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 4064,
                  "src": "1687:16:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4060,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1687:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1677:32:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4063,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1726:0:17"
            },
            "scope": 4187,
            "src": "1655:72:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a factory in the mapping of tracked factories.\n     * @param  _factory   The address of the SetTokenFactory to disable",
            "id": 4069,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4067,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4066,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 4069,
                  "src": "1923:16:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4065,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1923:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1913:32:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4068,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1962:0:17"
            },
            "scope": 4187,
            "src": "1890:73:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Disable a set token in the mapping of tracked set tokens.\n     * @param  _set   The address of the SetToken to remove",
            "id": 4074,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4072,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4071,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 4074,
                  "src": "2146:12:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4070,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2146:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2136:28:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4073,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2181:0:17"
            },
            "scope": 4187,
            "src": "2117:65:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Exchanges components for Set Tokens\n     * @param  _set          Address of set to issue\n@param  _quantity     Quantity of set to issue",
            "id": 4081,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "issue",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4079,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4076,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 4081,
                  "src": "2385:12:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4075,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2385:7:17",
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
                  "id": 4078,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4081,
                  "src": "2407:17:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4077,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2407:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2375:55:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4080,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2447:0:17"
            },
            "scope": 4187,
            "src": "2361:87:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Function to convert Set Tokens into underlying components\n     * @param _set          The address of the Set token\n@param _quantity     The number of tokens to redeem. Should be multiple of natural unit.",
            "id": 4088,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "redeem",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4086,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4083,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 4088,
                  "src": "2720:12:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4082,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2720:7:17",
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
                  "id": 4085,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4088,
                  "src": "2742:17:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4084,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2742:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2710:55:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4087,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2782:0:17"
            },
            "scope": 4187,
            "src": "2695:88:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _tokens           Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 4097,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDeposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4095,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4091,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 4097,
                  "src": "3127:17:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4089,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3127:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4090,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3127:9:17",
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
                  "id": 4094,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 4097,
                  "src": "3154:21:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4092,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3154:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4093,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3154:9:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3117:64:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4096,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3198:0:17"
            },
            "scope": 4187,
            "src": "3096:103:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokens            Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 4106,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchWithdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4104,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4100,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 4106,
                  "src": "3550:17:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4098,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3550:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4099,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3550:9:17",
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
                  "id": 4103,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 4106,
                  "src": "3577:21:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4101,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3577:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4102,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3577:9:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3540:64:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4105,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3621:0:17"
            },
            "scope": 4187,
            "src": "3518:104:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 4113,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "deposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4111,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4108,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4113,
                  "src": "3858:14:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4107,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3858:7:17",
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
                  "id": 4110,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4113,
                  "src": "3882:17:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4109,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3882:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3848:57:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4112,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3922:0:17"
            },
            "scope": 4187,
            "src": "3832:91:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 4120,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4118,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4115,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4120,
                  "src": "4160:14:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4114,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4160:7:17",
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
                  "id": 4117,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4120,
                  "src": "4184:17:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4116,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4184:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4150:57:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4119,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4222:0:17"
            },
            "scope": 4187,
            "src": "4133:90:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _factory              The address of the Factory to create from\n@param  _components           The address of component tokens\n@param  _units                The units of each component token\n@param  _naturalUnit          The minimum unit to be issued or redeemed\n@param  _name                 The bytes32 encoded name of the new Set\n@param  _symbol               The bytes32 encoded symbol of the new Set\n@param  _callData             Byte string containing additional call parameters\n@return setTokenAddress       The address of the new Set",
            "id": 4141,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4137,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4122,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 4141,
                  "src": "4956:16:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4121,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4956:7:17",
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
                  "id": 4125,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 4141,
                  "src": "4982:21:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4123,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "4982:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4124,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "4982:9:17",
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
                  "id": 4128,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 4141,
                  "src": "5013:16:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4126,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "5013:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4127,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5013:9:17",
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
                  "id": 4130,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 4141,
                  "src": "5039:20:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4129,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "5039:7:17",
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
                  "id": 4132,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 4141,
                  "src": "5069:12:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 4131,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "5069:6:17",
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
                  "id": 4134,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 4141,
                  "src": "5091:14:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 4133,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "5091:6:17",
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
                  "id": 4136,
                  "name": "_callData",
                  "nodeType": "VariableDeclaration",
                  "scope": 4141,
                  "src": "5115:15:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4135,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "5115:5:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4946:190:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4140,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4139,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4141,
                  "src": "5170:7:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4138,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5170:7:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5169:9:17"
            },
            "scope": 4187,
            "src": "4931:248:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Fill an issuance order\n     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _requiredComponents        Components required for the issuance order\n@param  _requiredComponentAmounts  Component amounts required for the issuance order\n@param  _fillQuantity              Quantity of set to be filled\n@param  _v                         v element of ECDSA signature\n@param  sigBytes                   Array with r and s segments of ECDSA signature\n@param _orderData                  Bytes array containing the exchange orders to execute",
            "id": 4167,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4165,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4145,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 4167,
                  "src": "5990:21:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4142,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5990:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4144,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 4143,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5998:1:17",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "5990:10:17",
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
                  "id": 4149,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 4167,
                  "src": "6021:15:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4146,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "6021:4:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4148,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 4147,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6026:1:17",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "6021:7:17",
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
                  "id": 4152,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 4167,
                  "src": "6046:29:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4150,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "6046:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4151,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6046:9:17",
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
                  "id": 4155,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4167,
                  "src": "6085:32:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4153,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "6085:4:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4154,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6085:6:17",
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
                  "id": 4157,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4167,
                  "src": "6127:18:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4156,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "6127:4:17",
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
                  "id": 4159,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 4167,
                  "src": "6155:8:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 4158,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "6155:5:17",
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
                  "id": 4162,
                  "name": "sigBytes",
                  "nodeType": "VariableDeclaration",
                  "scope": 4167,
                  "src": "6173:18:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                    "typeString": "bytes32[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4160,
                      "name": "bytes32",
                      "nodeType": "ElementaryTypeName",
                      "src": "6173:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "id": 4161,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6173:9:17",
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
                  "id": 4164,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 4167,
                  "src": "6201:16:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4163,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "6201:5:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5980:243:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4166,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6240:0:17"
            },
            "scope": 4187,
            "src": "5962:279:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Cancel an issuance order\n     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _requiredComponents        Components required for the issuance order\n@param  _requiredComponentAmounts  Component amounts required for the issuance order\n@param  _cancelQuantity            Quantity of set to be canceled",
            "id": 4186,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4184,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4171,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 4186,
                  "src": "6802:21:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4168,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "6802:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4170,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 4169,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6810:1:17",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "6802:10:17",
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
                  "id": 4175,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 4186,
                  "src": "6833:15:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4172,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "6833:4:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4174,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 4173,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6838:1:17",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "6833:7:17",
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
                  "id": 4178,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 4186,
                  "src": "6858:29:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4176,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "6858:7:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4177,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6858:9:17",
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
                  "id": 4181,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4186,
                  "src": "6897:32:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4179,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "6897:4:17",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4180,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6897:6:17",
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
                  "id": 4183,
                  "name": "_cancelQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4186,
                  "src": "6939:20:17",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4182,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "6939:4:17",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6792:173:17"
            },
            "payable": false,
            "returnParameters": {
              "id": 4185,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6982:0:17"
            },
            "scope": 4187,
            "src": "6772:211:17",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4188,
        "src": "833:6152:17"
      }
    ],
    "src": "597:6389:17"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T08:07:49.118Z"
}