export const ICoreAccounting = 
{
  "contractName": "ICoreAccounting",
  "abi": [],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\n/**\n * @title ICoreIssuance\n * @author Set Protocol\n *\n * The ICoreIssuance Contract defines all the functions exposed in the CoreIssuance\n * extension.\n */\ncontract ICoreAccounting {\n\n    /* ============ Internal Functions ============ */\n\n    /**\n     * Deposit multiple tokens to the vault. Quantities should be in the\n     * order of the addresses of the tokens being deposited.\n     *\n     * @param  _from            Address depositing tokens\n     * @param  _to              Address to credit for deposits\n     * @param  _tokens          Addresses of tokens being deposited\n     * @param  _quantities      The quantities of tokens to deposit\n     */\n    function batchDepositInternal(\n        address _from,\n        address _to,\n        address[] _tokens,\n        uint[] _quantities\n    )\n        internal;\n}",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICoreAccounting.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICoreAccounting.sol",
    "exportedSymbols": {
      "ICoreAccounting": [
        1812
      ]
    },
    "id": 1813,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1798,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:7"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ICoreIssuance\n@author Set Protocol\n * The ICoreIssuance Contract defines all the functions exposed in the CoreIssuance\nextension.",
        "fullyImplemented": false,
        "id": 1812,
        "linearizedBaseContracts": [
          1812
        ],
        "name": "ICoreAccounting",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _from            Address depositing tokens\n@param  _to              Address to credit for deposits\n@param  _tokens          Addresses of tokens being deposited\n@param  _quantities      The quantities of tokens to deposit",
            "id": 1811,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDepositInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1809,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1800,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 1811,
                  "src": "1321:13:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1799,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1321:7:7",
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
                  "id": 1802,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1811,
                  "src": "1344:11:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1801,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1344:7:7",
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
                  "id": 1805,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 1811,
                  "src": "1365:17:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1803,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1365:7:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1804,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1365:9:7",
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
                  "id": 1808,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1811,
                  "src": "1392:18:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1806,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1392:4:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1807,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1392:6:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1311:105:7"
            },
            "payable": false,
            "returnParameters": {
              "id": 1810,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1433:0:7"
            },
            "scope": 1812,
            "src": "1282:152:7",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 1813,
        "src": "780:656:7"
      }
    ],
    "src": "597:839:7"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICoreAccounting.sol",
    "exportedSymbols": {
      "ICoreAccounting": [
        1812
      ]
    },
    "id": 1813,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1798,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:7"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ICoreIssuance\n@author Set Protocol\n * The ICoreIssuance Contract defines all the functions exposed in the CoreIssuance\nextension.",
        "fullyImplemented": false,
        "id": 1812,
        "linearizedBaseContracts": [
          1812
        ],
        "name": "ICoreAccounting",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _from            Address depositing tokens\n@param  _to              Address to credit for deposits\n@param  _tokens          Addresses of tokens being deposited\n@param  _quantities      The quantities of tokens to deposit",
            "id": 1811,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDepositInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1809,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1800,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 1811,
                  "src": "1321:13:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1799,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1321:7:7",
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
                  "id": 1802,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1811,
                  "src": "1344:11:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1801,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1344:7:7",
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
                  "id": 1805,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 1811,
                  "src": "1365:17:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1803,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1365:7:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1804,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1365:9:7",
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
                  "id": 1808,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1811,
                  "src": "1392:18:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1806,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1392:4:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1807,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1392:6:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1311:105:7"
            },
            "payable": false,
            "returnParameters": {
              "id": 1810,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1433:0:7"
            },
            "scope": 1812,
            "src": "1282:152:7",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 1813,
        "src": "780:656:7"
      }
    ],
    "src": "597:839:7"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-07T05:35:59.438Z"
}