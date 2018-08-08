export const IAssetData = 
{
  "contractName": "IAssetData",
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "tokenContract",
          "type": "address"
        }
      ],
      "name": "ERC20Token",
      "outputs": [],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "tokenContract",
          "type": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "name": "receiverData",
          "type": "bytes"
        }
      ],
      "name": "ERC721Token",
      "outputs": [],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "/*\n\n  Copyright 2018 ZeroEx Intl.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity ^0.4.23;\n\n// @dev Interface of the asset proxy's assetData.\n// The asset proxies take an ABI encoded `bytes assetData` as argument.\n// This argument is ABI encoded as one of the methods of this interface.\ninterface IAssetData {\n    \n    function ERC20Token(\n        address tokenContract)\n        external pure;\n    \n    function ERC721Token(\n        address tokenContract,\n        uint256 tokenId,\n        bytes receiverData)\n        external pure;\n    \n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/AssetProxy/interfaces/IAssetData.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/AssetProxy/interfaces/IAssetData.sol",
    "exportedSymbols": {
      "IAssetData": [
        3813
      ]
    },
    "id": 3814,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3798,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:26"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": null,
        "fullyImplemented": false,
        "id": 3813,
        "linearizedBaseContracts": [
          3813
        ],
        "name": "IAssetData",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3803,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "ERC20Token",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3801,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3800,
                  "name": "tokenContract",
                  "nodeType": "VariableDeclaration",
                  "scope": 3803,
                  "src": "862:21:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3799,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "862:7:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "852:32:26"
            },
            "payable": false,
            "returnParameters": {
              "id": 3802,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "906:0:26"
            },
            "scope": 3813,
            "src": "833:74:26",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3812,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "ERC721Token",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3810,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3805,
                  "name": "tokenContract",
                  "nodeType": "VariableDeclaration",
                  "scope": 3812,
                  "src": "947:21:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3804,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "947:7:26",
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
                  "id": 3807,
                  "name": "tokenId",
                  "nodeType": "VariableDeclaration",
                  "scope": 3812,
                  "src": "978:15:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3806,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "978:7:26",
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
                  "id": 3809,
                  "name": "receiverData",
                  "nodeType": "VariableDeclaration",
                  "scope": 3812,
                  "src": "1003:18:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3808,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1003:5:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "937:85:26"
            },
            "payable": false,
            "returnParameters": {
              "id": 3811,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1044:0:26"
            },
            "scope": 3813,
            "src": "917:128:26",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3814,
        "src": "801:251:26"
      }
    ],
    "src": "580:473:26"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/AssetProxy/interfaces/IAssetData.sol",
    "exportedSymbols": {
      "IAssetData": [
        3813
      ]
    },
    "id": 3814,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3798,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:26"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": null,
        "fullyImplemented": false,
        "id": 3813,
        "linearizedBaseContracts": [
          3813
        ],
        "name": "IAssetData",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3803,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "ERC20Token",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3801,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3800,
                  "name": "tokenContract",
                  "nodeType": "VariableDeclaration",
                  "scope": 3803,
                  "src": "862:21:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3799,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "862:7:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "852:32:26"
            },
            "payable": false,
            "returnParameters": {
              "id": 3802,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "906:0:26"
            },
            "scope": 3813,
            "src": "833:74:26",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3812,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "ERC721Token",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3810,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3805,
                  "name": "tokenContract",
                  "nodeType": "VariableDeclaration",
                  "scope": 3812,
                  "src": "947:21:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3804,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "947:7:26",
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
                  "id": 3807,
                  "name": "tokenId",
                  "nodeType": "VariableDeclaration",
                  "scope": 3812,
                  "src": "978:15:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3806,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "978:7:26",
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
                  "id": 3809,
                  "name": "receiverData",
                  "nodeType": "VariableDeclaration",
                  "scope": 3812,
                  "src": "1003:18:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3808,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1003:5:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "937:85:26"
            },
            "payable": false,
            "returnParameters": {
              "id": 3811,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1044:0:26"
            },
            "scope": 3813,
            "src": "917:128:26",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3814,
        "src": "801:251:26"
      }
    ],
    "src": "580:473:26"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-06T13:39:43.011Z"
}