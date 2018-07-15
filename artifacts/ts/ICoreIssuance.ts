export const ICoreIssuance = 
{
  "contractName": "ICoreIssuance",
  "abi": [],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\n/**\n * @title ICoreIssuance\n * @author Set Protocol\n *\n * The ICoreIssuance Contract defines all the functions exposed in the CoreIssuance\n * extension.\n */\ncontract ICoreIssuance {\n\n    /**\n     * Issue internally. Can define who to issue to.\n     *\n     * @param _owner         Address to issue set to\n     * @param  _setAddress   Address of set to issue\n     * @param  _quantity     Quantity of set to issue\n     */\n    function issueInternal(\n        address _owner,\n        address _setAddress,\n        uint _quantity\n    )\n        internal;\n}",
  "sourcePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ICoreIssuance.sol",
  "ast": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ICoreIssuance.sol",
    "exportedSymbols": {
      "ICoreIssuance": [
        3249
      ]
    },
    "id": 3250,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3239,
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
        "id": 3249,
        "linearizedBaseContracts": [
          3249
        ],
        "name": "ICoreIssuance",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Issue internally. Can define who to issue to.\n     * @param _owner         Address to issue set to\n@param  _setAddress   Address of set to issue\n@param  _quantity     Quantity of set to issue",
            "id": 3248,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "issueInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3246,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3241,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3248,
                  "src": "1078:14:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3240,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1078:7:16",
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
                  "id": 3243,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3248,
                  "src": "1102:19:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3242,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1102:7:16",
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
                  "id": 3245,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3248,
                  "src": "1131:14:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3244,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1131:4:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1068:83:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 3247,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1168:0:16"
            },
            "scope": 3249,
            "src": "1046:123:16",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 3250,
        "src": "780:391:16"
      }
    ],
    "src": "597:574:16"
  },
  "legacyAST": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ICoreIssuance.sol",
    "exportedSymbols": {
      "ICoreIssuance": [
        3249
      ]
    },
    "id": 3250,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3239,
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
        "id": 3249,
        "linearizedBaseContracts": [
          3249
        ],
        "name": "ICoreIssuance",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Issue internally. Can define who to issue to.\n     * @param _owner         Address to issue set to\n@param  _setAddress   Address of set to issue\n@param  _quantity     Quantity of set to issue",
            "id": 3248,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "issueInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3246,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3241,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3248,
                  "src": "1078:14:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3240,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1078:7:16",
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
                  "id": 3243,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3248,
                  "src": "1102:19:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3242,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1102:7:16",
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
                  "id": 3245,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3248,
                  "src": "1131:14:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3244,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1131:4:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1068:83:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 3247,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1168:0:16"
            },
            "scope": 3249,
            "src": "1046:123:16",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 3250,
        "src": "780:391:16"
      }
    ],
    "src": "597:574:16"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-13T21:55:38.403Z"
}