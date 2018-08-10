export const ICoreAccounting = 
{
  "contractName": "ICoreAccounting",
  "abi": [],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\n/**\n * @title ICoreIssuance\n * @author Set Protocol\n *\n * The ICoreIssuance Contract defines all the functions exposed in the CoreIssuance\n * extension.\n */\ncontract ICoreAccounting {\n\n    /* ============ Internal Functions ============ */\n\n    /**\n     * Deposit multiple tokens to the vault. Quantities should be in the\n     * order of the addresses of the tokens being deposited.\n     *\n     * @param  _from            Address depositing tokens\n     * @param  _to              Address to credit for deposits\n     * @param  _tokens          Addresses of tokens being deposited\n     * @param  _quantities      The quantities of tokens to deposit\n     */\n    function batchDepositInternal(\n        address _from,\n        address _to,\n        address[] _tokens,\n        uint[] _quantities\n    )\n        internal;\n}",
  "sourcePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/core/interfaces/ICoreAccounting.sol",
  "ast": {
    "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/core/interfaces/ICoreAccounting.sol",
    "exportedSymbols": {
      "ICoreAccounting": [
        3571
      ]
    },
    "id": 3572,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3557,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:16"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ICoreIssuance\n@author Set Protocol\n * The ICoreIssuance Contract defines all the functions exposed in the CoreIssuance\nextension.",
        "fullyImplemented": false,
        "id": 3571,
        "linearizedBaseContracts": [
          3571
        ],
        "name": "ICoreAccounting",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _from            Address depositing tokens\n@param  _to              Address to credit for deposits\n@param  _tokens          Addresses of tokens being deposited\n@param  _quantities      The quantities of tokens to deposit",
            "id": 3570,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDepositInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3568,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3559,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3570,
                  "src": "1321:13:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3558,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1321:7:16",
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
                  "id": 3561,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3570,
                  "src": "1344:11:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3560,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1344:7:16",
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
                  "id": 3564,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 3570,
                  "src": "1365:17:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3562,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1365:7:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3563,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1365:9:16",
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
                  "id": 3567,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 3570,
                  "src": "1392:18:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3565,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1392:4:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3566,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1392:6:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1311:105:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 3569,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1433:0:16"
            },
            "scope": 3571,
            "src": "1282:152:16",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 3572,
        "src": "780:656:16"
      }
    ],
    "src": "597:839:16"
  },
  "legacyAST": {
    "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/core/interfaces/ICoreAccounting.sol",
    "exportedSymbols": {
      "ICoreAccounting": [
        3571
      ]
    },
    "id": 3572,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3557,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:16"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ICoreIssuance\n@author Set Protocol\n * The ICoreIssuance Contract defines all the functions exposed in the CoreIssuance\nextension.",
        "fullyImplemented": false,
        "id": 3571,
        "linearizedBaseContracts": [
          3571
        ],
        "name": "ICoreAccounting",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _from            Address depositing tokens\n@param  _to              Address to credit for deposits\n@param  _tokens          Addresses of tokens being deposited\n@param  _quantities      The quantities of tokens to deposit",
            "id": 3570,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDepositInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3568,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3559,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3570,
                  "src": "1321:13:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3558,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1321:7:16",
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
                  "id": 3561,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3570,
                  "src": "1344:11:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3560,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1344:7:16",
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
                  "id": 3564,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 3570,
                  "src": "1365:17:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3562,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1365:7:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3563,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1365:9:16",
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
                  "id": 3567,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 3570,
                  "src": "1392:18:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3565,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1392:4:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3566,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1392:6:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1311:105:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 3569,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1433:0:16"
            },
            "scope": 3571,
            "src": "1282:152:16",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 3572,
        "src": "780:656:16"
      }
    ],
    "src": "597:839:16"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-10T21:21:49.356Z"
}