export const ITransferProxy = 
{
  "contractName": "ITransferProxy",
  "abi": [
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
        },
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        }
      ],
      "name": "transfer",
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
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n/**\n * @title ITransferProxy\n * @author Set Protocol\n *\n * The ITransferProxy interface provides a light-weight, structured way to interact with the\n * TransferProxy contract from another contract.\n */\ninterface ITransferProxy {\n\n    /**\n     * Transfers tokens from an address (that has set allowance on the proxy).\n     * Can only be called by authorized core contracts.\n     *\n     * @param  _tokenAddress   The address of the ERC20 token\n     * @param  _quantity       The number of tokens to transfer\n     * @param  _from           The address to transfer from\n     * @param  _to             The address to transfer to\n     */\n    function transfer(\n        address _tokenAddress,\n        uint _quantity,\n        address _from,\n        address _to\n    )\n        external;\n}\n",
  "sourcePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
  "ast": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
    "exportedSymbols": {
      "ITransferProxy": [
        3332
      ]
    },
    "id": 3333,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3320,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:20"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ITransferProxy\n@author Set Protocol\n * The ITransferProxy interface provides a light-weight, structured way to interact with the\nTransferProxy contract from another contract.",
        "fullyImplemented": false,
        "id": 3332,
        "linearizedBaseContracts": [
          3332
        ],
        "name": "ITransferProxy",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Transfers tokens from an address (that has set allowance on the proxy).\nCan only be called by authorized core contracts.\n     * @param  _tokenAddress   The address of the ERC20 token\n@param  _quantity       The number of tokens to transfer\n@param  _from           The address to transfer from\n@param  _to             The address to transfer to",
            "id": 3331,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3329,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3322,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3331,
                  "src": "1285:21:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3321,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1285:7:20",
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
                  "id": 3324,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3331,
                  "src": "1316:14:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3323,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1316:4:20",
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
                  "id": 3326,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3331,
                  "src": "1340:13:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3325,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1340:7:20",
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
                  "id": 3328,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3331,
                  "src": "1363:11:20",
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
                    "src": "1363:7:20",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1275:105:20"
            },
            "payable": false,
            "returnParameters": {
              "id": 3330,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1397:0:20"
            },
            "scope": 3332,
            "src": "1258:140:20",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3333,
        "src": "824:576:20"
      }
    ],
    "src": "597:804:20"
  },
  "legacyAST": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
    "exportedSymbols": {
      "ITransferProxy": [
        3332
      ]
    },
    "id": 3333,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3320,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:20"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ITransferProxy\n@author Set Protocol\n * The ITransferProxy interface provides a light-weight, structured way to interact with the\nTransferProxy contract from another contract.",
        "fullyImplemented": false,
        "id": 3332,
        "linearizedBaseContracts": [
          3332
        ],
        "name": "ITransferProxy",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Transfers tokens from an address (that has set allowance on the proxy).\nCan only be called by authorized core contracts.\n     * @param  _tokenAddress   The address of the ERC20 token\n@param  _quantity       The number of tokens to transfer\n@param  _from           The address to transfer from\n@param  _to             The address to transfer to",
            "id": 3331,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3329,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3322,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3331,
                  "src": "1285:21:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3321,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1285:7:20",
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
                  "id": 3324,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3331,
                  "src": "1316:14:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3323,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1316:4:20",
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
                  "id": 3326,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3331,
                  "src": "1340:13:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3325,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1340:7:20",
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
                  "id": 3328,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3331,
                  "src": "1363:11:20",
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
                    "src": "1363:7:20",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1275:105:20"
            },
            "payable": false,
            "returnParameters": {
              "id": 3330,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1397:0:20"
            },
            "scope": 3332,
            "src": "1258:140:20",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3333,
        "src": "824:576:20"
      }
    ],
    "src": "597:804:20"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-13T21:55:38.411Z"
}