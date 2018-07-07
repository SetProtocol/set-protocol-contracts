export const ITransferProxy = 
{
  "contractName": "ITransferProxy",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_tokenAddress",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "transferToVault",
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
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n/**\n * @title ITransferProxy\n * @author Set Protocol\n *\n * The ITransferProxy interface provides a light-weight, structured way to interact with the\n * TransferProxy contract from another contract.\n */\ninterface ITransferProxy {\n\n    /**\n     * Transfers tokens from an address (that has set allowance on the proxy) to the vault.\n     * Can only be called by authorized core contracts.\n     *\n     * @param  _from           The address to transfer tokens from\n     * @param  _tokenAddress   The address of the ERC20 token\n     * @param  _quantity       The number of tokens to transfer\n     */\n    function transferToVault(\n        address _from,\n        address _tokenAddress,\n        uint _quantity\n    )\n        external;\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
    "exportedSymbols": {
      "ITransferProxy": [
        2516
      ]
    },
    "id": 2517,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2506,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:19"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ITransferProxy\n@author Set Protocol\n * The ITransferProxy interface provides a light-weight, structured way to interact with the\nTransferProxy contract from another contract.",
        "fullyImplemented": false,
        "id": 2516,
        "linearizedBaseContracts": [
          2516
        ],
        "name": "ITransferProxy",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Transfers tokens from an address (that has set allowance on the proxy) to the vault.\nCan only be called by authorized core contracts.\n     * @param  _from           The address to transfer tokens from\n@param  _tokenAddress   The address of the ERC20 token\n@param  _quantity       The number of tokens to transfer",
            "id": 2515,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferToVault",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2513,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2508,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 2515,
                  "src": "1254:13:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2507,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1254:7:19",
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
                  "id": 2510,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2515,
                  "src": "1277:21:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2509,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1277:7:19",
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
                  "id": 2512,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2515,
                  "src": "1308:14:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2511,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1308:4:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1244:84:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 2514,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1345:0:19"
            },
            "scope": 2516,
            "src": "1220:126:19",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2517,
        "src": "824:524:19"
      }
    ],
    "src": "597:752:19"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
    "exportedSymbols": {
      "ITransferProxy": [
        2516
      ]
    },
    "id": 2517,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2506,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:19"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ITransferProxy\n@author Set Protocol\n * The ITransferProxy interface provides a light-weight, structured way to interact with the\nTransferProxy contract from another contract.",
        "fullyImplemented": false,
        "id": 2516,
        "linearizedBaseContracts": [
          2516
        ],
        "name": "ITransferProxy",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Transfers tokens from an address (that has set allowance on the proxy) to the vault.\nCan only be called by authorized core contracts.\n     * @param  _from           The address to transfer tokens from\n@param  _tokenAddress   The address of the ERC20 token\n@param  _quantity       The number of tokens to transfer",
            "id": 2515,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferToVault",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2513,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2508,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 2515,
                  "src": "1254:13:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2507,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1254:7:19",
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
                  "id": 2510,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2515,
                  "src": "1277:21:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2509,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1277:7:19",
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
                  "id": 2512,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2515,
                  "src": "1308:14:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2511,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1308:4:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1244:84:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 2514,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1345:0:19"
            },
            "scope": 2516,
            "src": "1220:126:19",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2517,
        "src": "824:524:19"
      }
    ],
    "src": "597:752:19"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-07T07:45:08.904Z"
}