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
        2720
      ]
    },
    "id": 2721,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2703,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:19"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 2720,
        "linearizedBaseContracts": [
          2720
        ],
        "name": "IAssetProxyDispatcher",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Registers an asset proxy to an asset proxy id.\n      An id can only be assigned to a single proxy at a given time.\n @param assetProxyId Id to register`newAssetProxy` under.\n @param newAssetProxy Address of new asset proxy to register, or 0x0 to unset assetProxyId.\n @param oldAssetProxy Existing asset proxy to overwrite, or 0x0 if assetProxyId is currently unused.",
            "id": 2712,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "registerAssetProxy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2710,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2705,
                  "name": "assetProxyId",
                  "nodeType": "VariableDeclaration",
                  "scope": 2712,
                  "src": "1088:19:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes4",
                    "typeString": "bytes4"
                  },
                  "typeName": {
                    "id": 2704,
                    "name": "bytes4",
                    "nodeType": "ElementaryTypeName",
                    "src": "1088:6:19",
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
                  "id": 2707,
                  "name": "newAssetProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 2712,
                  "src": "1117:21:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2706,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1117:7:19",
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
                  "id": 2709,
                  "name": "oldAssetProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 2712,
                  "src": "1148:21:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2708,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1148:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1078:97:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 2711,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1192:0:19"
            },
            "scope": 2720,
            "src": "1051:142:19",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Gets an asset proxy.\n @param assetProxyId Id of the asset proxy.\n @return The asset proxy registered to assetProxyId. Returns 0x0 if no proxy is registered.",
            "id": 2719,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getAssetProxy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2715,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2714,
                  "name": "assetProxyId",
                  "nodeType": "VariableDeclaration",
                  "scope": 2719,
                  "src": "1406:19:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes4",
                    "typeString": "bytes4"
                  },
                  "typeName": {
                    "id": 2713,
                    "name": "bytes4",
                    "nodeType": "ElementaryTypeName",
                    "src": "1406:6:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1405:21:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 2718,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2717,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2719,
                  "src": "1474:7:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2716,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1474:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1473:9:19"
            },
            "scope": 2720,
            "src": "1383:100:19",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2721,
        "src": "606:879:19"
      }
    ],
    "src": "580:906:19"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IAssetProxyDispatcher.sol",
    "exportedSymbols": {
      "IAssetProxyDispatcher": [
        2720
      ]
    },
    "id": 2721,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2703,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:19"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 2720,
        "linearizedBaseContracts": [
          2720
        ],
        "name": "IAssetProxyDispatcher",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Registers an asset proxy to an asset proxy id.\n      An id can only be assigned to a single proxy at a given time.\n @param assetProxyId Id to register`newAssetProxy` under.\n @param newAssetProxy Address of new asset proxy to register, or 0x0 to unset assetProxyId.\n @param oldAssetProxy Existing asset proxy to overwrite, or 0x0 if assetProxyId is currently unused.",
            "id": 2712,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "registerAssetProxy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2710,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2705,
                  "name": "assetProxyId",
                  "nodeType": "VariableDeclaration",
                  "scope": 2712,
                  "src": "1088:19:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes4",
                    "typeString": "bytes4"
                  },
                  "typeName": {
                    "id": 2704,
                    "name": "bytes4",
                    "nodeType": "ElementaryTypeName",
                    "src": "1088:6:19",
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
                  "id": 2707,
                  "name": "newAssetProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 2712,
                  "src": "1117:21:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2706,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1117:7:19",
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
                  "id": 2709,
                  "name": "oldAssetProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 2712,
                  "src": "1148:21:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2708,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1148:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1078:97:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 2711,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1192:0:19"
            },
            "scope": 2720,
            "src": "1051:142:19",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Gets an asset proxy.\n @param assetProxyId Id of the asset proxy.\n @return The asset proxy registered to assetProxyId. Returns 0x0 if no proxy is registered.",
            "id": 2719,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getAssetProxy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2715,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2714,
                  "name": "assetProxyId",
                  "nodeType": "VariableDeclaration",
                  "scope": 2719,
                  "src": "1406:19:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes4",
                    "typeString": "bytes4"
                  },
                  "typeName": {
                    "id": 2713,
                    "name": "bytes4",
                    "nodeType": "ElementaryTypeName",
                    "src": "1406:6:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1405:21:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 2718,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2717,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2719,
                  "src": "1474:7:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2716,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1474:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1473:9:19"
            },
            "scope": 2720,
            "src": "1383:100:19",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2721,
        "src": "606:879:19"
      }
    ],
    "src": "580:906:19"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-07T02:05:30.495Z"
}