export const IAssetProxyDispatcher = 
{
  "contractName": "IAssetProxyDispatcher",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "assetProxyId",
          "type": "bytes4"
        },
        {
          "name": "newAssetProxy",
          "type": "address"
        },
        {
          "name": "oldAssetProxy",
          "type": "address"
        }
      ],
      "name": "registerAssetProxy",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "assetProxyId",
          "type": "bytes4"
        }
      ],
      "name": "getAssetProxy",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "/*\n\n  Copyright 2018 ZeroEx Intl.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity ^0.4.24;\n\ncontract IAssetProxyDispatcher {\n\n    /// @dev Registers an asset proxy to an asset proxy id.\n    ///      An id can only be assigned to a single proxy at a given time.\n    /// @param assetProxyId Id to register`newAssetProxy` under.\n    /// @param newAssetProxy Address of new asset proxy to register, or 0x0 to unset assetProxyId.\n    /// @param oldAssetProxy Existing asset proxy to overwrite, or 0x0 if assetProxyId is currently unused.\n    function registerAssetProxy(\n        bytes4 assetProxyId,\n        address newAssetProxy,\n        address oldAssetProxy\n    )\n        external;\n\n    /// @dev Gets an asset proxy.\n    /// @param assetProxyId Id of the asset proxy.\n    /// @return The asset proxy registered to assetProxyId. Returns 0x0 if no proxy is registered.\n    function getAssetProxy(bytes4 assetProxyId)\n        external\n        view\n        returns (address);\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IAssetProxyDispatcher.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IAssetProxyDispatcher.sol",
    "exportedSymbols": {
      "IAssetProxyDispatcher": [
        3973
      ]
    },
    "id": 3974,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3956,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:22"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 3973,
        "linearizedBaseContracts": [
          3973
        ],
        "name": "IAssetProxyDispatcher",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Registers an asset proxy to an asset proxy id.\n      An id can only be assigned to a single proxy at a given time.\n @param assetProxyId Id to register`newAssetProxy` under.\n @param newAssetProxy Address of new asset proxy to register, or 0x0 to unset assetProxyId.\n @param oldAssetProxy Existing asset proxy to overwrite, or 0x0 if assetProxyId is currently unused.",
            "id": 3965,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "registerAssetProxy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3963,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3958,
                  "name": "assetProxyId",
                  "nodeType": "VariableDeclaration",
                  "scope": 3965,
                  "src": "1088:19:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes4",
                    "typeString": "bytes4"
                  },
                  "typeName": {
                    "id": 3957,
                    "name": "bytes4",
                    "nodeType": "ElementaryTypeName",
                    "src": "1088:6:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3960,
                  "name": "newAssetProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 3965,
                  "src": "1117:21:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3959,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1117:7:22",
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
                  "id": 3962,
                  "name": "oldAssetProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 3965,
                  "src": "1148:21:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3961,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1148:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1078:97:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3964,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1192:0:22"
            },
            "scope": 3973,
            "src": "1051:142:22",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Gets an asset proxy.\n @param assetProxyId Id of the asset proxy.\n @return The asset proxy registered to assetProxyId. Returns 0x0 if no proxy is registered.",
            "id": 3972,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getAssetProxy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3968,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3967,
                  "name": "assetProxyId",
                  "nodeType": "VariableDeclaration",
                  "scope": 3972,
                  "src": "1406:19:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes4",
                    "typeString": "bytes4"
                  },
                  "typeName": {
                    "id": 3966,
                    "name": "bytes4",
                    "nodeType": "ElementaryTypeName",
                    "src": "1406:6:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1405:21:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3971,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3970,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3972,
                  "src": "1474:7:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3969,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1474:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1473:9:22"
            },
            "scope": 3973,
            "src": "1383:100:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3974,
        "src": "606:879:22"
      }
    ],
    "src": "580:906:22"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IAssetProxyDispatcher.sol",
    "exportedSymbols": {
      "IAssetProxyDispatcher": [
        3973
      ]
    },
    "id": 3974,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3956,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:22"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 3973,
        "linearizedBaseContracts": [
          3973
        ],
        "name": "IAssetProxyDispatcher",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Registers an asset proxy to an asset proxy id.\n      An id can only be assigned to a single proxy at a given time.\n @param assetProxyId Id to register`newAssetProxy` under.\n @param newAssetProxy Address of new asset proxy to register, or 0x0 to unset assetProxyId.\n @param oldAssetProxy Existing asset proxy to overwrite, or 0x0 if assetProxyId is currently unused.",
            "id": 3965,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "registerAssetProxy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3963,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3958,
                  "name": "assetProxyId",
                  "nodeType": "VariableDeclaration",
                  "scope": 3965,
                  "src": "1088:19:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes4",
                    "typeString": "bytes4"
                  },
                  "typeName": {
                    "id": 3957,
                    "name": "bytes4",
                    "nodeType": "ElementaryTypeName",
                    "src": "1088:6:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3960,
                  "name": "newAssetProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 3965,
                  "src": "1117:21:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3959,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1117:7:22",
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
                  "id": 3962,
                  "name": "oldAssetProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 3965,
                  "src": "1148:21:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3961,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1148:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1078:97:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3964,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1192:0:22"
            },
            "scope": 3973,
            "src": "1051:142:22",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Gets an asset proxy.\n @param assetProxyId Id of the asset proxy.\n @return The asset proxy registered to assetProxyId. Returns 0x0 if no proxy is registered.",
            "id": 3972,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getAssetProxy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3968,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3967,
                  "name": "assetProxyId",
                  "nodeType": "VariableDeclaration",
                  "scope": 3972,
                  "src": "1406:19:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes4",
                    "typeString": "bytes4"
                  },
                  "typeName": {
                    "id": 3966,
                    "name": "bytes4",
                    "nodeType": "ElementaryTypeName",
                    "src": "1406:6:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1405:21:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3971,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3970,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3972,
                  "src": "1474:7:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3969,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1474:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1473:9:22"
            },
            "scope": 3973,
            "src": "1383:100:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3974,
        "src": "606:879:22"
      }
    ],
    "src": "580:906:22"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-23T23:58:05.597Z"
}