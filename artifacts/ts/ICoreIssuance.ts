export const ICoreIssuance = 
{
  "contractName": "ICoreIssuance",
  "abi": [],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\n/**\n * @title ICoreIssuance\n * @author Set Protocol\n *\n * The ICoreIssuance Contract defines all the functions exposed in the CoreIssuance\n * extension.\n */\ncontract ICoreIssuance {\n\n    /* ============ Internal Functions ============ */\n\n    /**\n     * Exchanges components for Set Tokens, accepting any owner\n     *\n     * @param  _owner        Address to issue set to\n     * @param  _set          Address of set to issue\n     * @param  _quantity     Quantity of set to issue\n     */\n    function issueInternal(\n        address _owner,\n        address _set,\n        uint _quantity\n    )\n        internal;\n}",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICoreIssuance.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICoreIssuance.sol",
    "exportedSymbols": {
      "ICoreIssuance": [
        2477
      ]
    },
    "id": 2478,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2467,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:10"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ICoreIssuance\n@author Set Protocol\n * The ICoreIssuance Contract defines all the functions exposed in the CoreIssuance\nextension.",
        "fullyImplemented": false,
        "id": 2477,
        "linearizedBaseContracts": [
          2477
        ],
        "name": "ICoreIssuance",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Exchanges components for Set Tokens, accepting any owner\n     * @param  _owner        Address to issue set to\n@param  _set          Address of set to issue\n@param  _quantity     Quantity of set to issue",
            "id": 2476,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "issueInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2474,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2469,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 2476,
                  "src": "1145:14:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2468,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1145:7:10",
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
                  "id": 2471,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 2476,
                  "src": "1169:12:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2470,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1169:7:10",
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
                  "id": 2473,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2476,
                  "src": "1191:14:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2472,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1191:4:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1135:76:10"
            },
            "payable": false,
            "returnParameters": {
              "id": 2475,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1228:0:10"
            },
            "scope": 2477,
            "src": "1113:116:10",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 2478,
        "src": "780:451:10"
      }
    ],
    "src": "597:634:10"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICoreIssuance.sol",
    "exportedSymbols": {
      "ICoreIssuance": [
        2477
      ]
    },
    "id": 2478,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2467,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:10"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ICoreIssuance\n@author Set Protocol\n * The ICoreIssuance Contract defines all the functions exposed in the CoreIssuance\nextension.",
        "fullyImplemented": false,
        "id": 2477,
        "linearizedBaseContracts": [
          2477
        ],
        "name": "ICoreIssuance",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Exchanges components for Set Tokens, accepting any owner\n     * @param  _owner        Address to issue set to\n@param  _set          Address of set to issue\n@param  _quantity     Quantity of set to issue",
            "id": 2476,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "issueInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2474,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2469,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 2476,
                  "src": "1145:14:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2468,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1145:7:10",
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
                  "id": 2471,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 2476,
                  "src": "1169:12:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2470,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1169:7:10",
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
                  "id": 2473,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2476,
                  "src": "1191:14:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2472,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1191:4:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1135:76:10"
            },
            "payable": false,
            "returnParameters": {
              "id": 2475,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1228:0:10"
            },
            "scope": 2477,
            "src": "1113:116:10",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 2478,
        "src": "780:451:10"
      }
    ],
    "src": "597:634:10"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-08T05:31:02.864Z"
}