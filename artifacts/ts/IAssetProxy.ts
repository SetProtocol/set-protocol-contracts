export const IAssetProxy = 
{
  "contractName": "IAssetProxy",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "target",
          "type": "address"
        }
      ],
      "name": "addAuthorizedAddress",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "target",
          "type": "address"
        }
      ],
      "name": "removeAuthorizedAddress",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "target",
          "type": "address"
        },
        {
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "removeAuthorizedAddressAtIndex",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getAuthorizedAddresses",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
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
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "assetData",
          "type": "bytes"
        },
        {
          "name": "from",
          "type": "address"
        },
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getProxyId",
      "outputs": [
        {
          "name": "",
          "type": "bytes4"
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
  "source": "/*\n\n  Copyright 2018 ZeroEx Intl.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity ^0.4.24;\npragma experimental ABIEncoderV2;\n\nimport \"./IAuthorizable.sol\";\n\ncontract IAssetProxy is\n    IAuthorizable\n{\n\n    /// @dev Transfers assets. Either succeeds or throws.\n    /// @param assetData Byte array encoded for the respective asset proxy.\n    /// @param from Address to transfer asset from.\n    /// @param to Address to transfer asset to.\n    /// @param amount Amount of asset to transfer.\n    function transferFrom(\n        bytes assetData,\n        address from,\n        address to,\n        uint256 amount\n    )\n        external;\n    \n    /// @dev Gets the proxy id associated with the proxy address.\n    /// @return Proxy id.\n    function getProxyId()\n        external\n        view\n        returns (bytes4);\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/AssetProxy/interfaces/IAssetProxy.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/AssetProxy/interfaces/IAssetProxy.sol",
    "exportedSymbols": {
      "IAssetProxy": [
        4816
      ]
    },
    "id": 4817,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4795,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:30"
      },
      {
        "id": 4796,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:30"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/AssetProxy/interfaces/IAuthorizable.sol",
        "file": "./IAuthorizable.sol",
        "id": 4797,
        "nodeType": "ImportDirective",
        "scope": 4817,
        "sourceUnit": 4852,
        "src": "640:29:30",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4798,
              "name": "IAuthorizable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4851,
              "src": "699:13:30",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_IAuthorizable_$4851",
                "typeString": "contract IAuthorizable"
              }
            },
            "id": 4799,
            "nodeType": "InheritanceSpecifier",
            "src": "699:13:30"
          }
        ],
        "contractDependencies": [
          4825,
          4851
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4816,
        "linearizedBaseContracts": [
          4816,
          4851,
          4825
        ],
        "name": "IAssetProxy",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Transfers assets. Either succeeds or throws.\n @param assetData Byte array encoded for the respective asset proxy.\n @param from Address to transfer asset from.\n @param to Address to transfer asset to.\n @param amount Amount of asset to transfer.",
            "id": 4810,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4808,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4801,
                  "name": "assetData",
                  "nodeType": "VariableDeclaration",
                  "scope": 4810,
                  "src": "1036:15:30",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4800,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1036:5:30",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4803,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 4810,
                  "src": "1061:12:30",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4802,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1061:7:30",
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
                  "id": 4805,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4810,
                  "src": "1083:10:30",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4804,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1083:7:30",
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
                  "id": 4807,
                  "name": "amount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4810,
                  "src": "1103:14:30",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4806,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1103:7:30",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1026:97:30"
            },
            "payable": false,
            "returnParameters": {
              "id": 4809,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1140:0:30"
            },
            "scope": 4816,
            "src": "1005:136:30",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Gets the proxy id associated with the proxy address.\n @return Proxy id.",
            "id": 4815,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getProxyId",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4811,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1262:2:30"
            },
            "payable": false,
            "returnParameters": {
              "id": 4814,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4813,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4815,
                  "src": "1312:6:30",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes4",
                    "typeString": "bytes4"
                  },
                  "typeName": {
                    "id": 4812,
                    "name": "bytes4",
                    "nodeType": "ElementaryTypeName",
                    "src": "1312:6:30",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1311:8:30"
            },
            "scope": 4816,
            "src": "1243:77:30",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4817,
        "src": "671:651:30"
      }
    ],
    "src": "580:743:30"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/AssetProxy/interfaces/IAssetProxy.sol",
    "exportedSymbols": {
      "IAssetProxy": [
        4816
      ]
    },
    "id": 4817,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4795,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:30"
      },
      {
        "id": 4796,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:30"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/AssetProxy/interfaces/IAuthorizable.sol",
        "file": "./IAuthorizable.sol",
        "id": 4797,
        "nodeType": "ImportDirective",
        "scope": 4817,
        "sourceUnit": 4852,
        "src": "640:29:30",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4798,
              "name": "IAuthorizable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4851,
              "src": "699:13:30",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_IAuthorizable_$4851",
                "typeString": "contract IAuthorizable"
              }
            },
            "id": 4799,
            "nodeType": "InheritanceSpecifier",
            "src": "699:13:30"
          }
        ],
        "contractDependencies": [
          4825,
          4851
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4816,
        "linearizedBaseContracts": [
          4816,
          4851,
          4825
        ],
        "name": "IAssetProxy",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Transfers assets. Either succeeds or throws.\n @param assetData Byte array encoded for the respective asset proxy.\n @param from Address to transfer asset from.\n @param to Address to transfer asset to.\n @param amount Amount of asset to transfer.",
            "id": 4810,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4808,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4801,
                  "name": "assetData",
                  "nodeType": "VariableDeclaration",
                  "scope": 4810,
                  "src": "1036:15:30",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4800,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1036:5:30",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4803,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 4810,
                  "src": "1061:12:30",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4802,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1061:7:30",
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
                  "id": 4805,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4810,
                  "src": "1083:10:30",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4804,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1083:7:30",
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
                  "id": 4807,
                  "name": "amount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4810,
                  "src": "1103:14:30",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4806,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1103:7:30",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1026:97:30"
            },
            "payable": false,
            "returnParameters": {
              "id": 4809,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1140:0:30"
            },
            "scope": 4816,
            "src": "1005:136:30",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Gets the proxy id associated with the proxy address.\n @return Proxy id.",
            "id": 4815,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getProxyId",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4811,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1262:2:30"
            },
            "payable": false,
            "returnParameters": {
              "id": 4814,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4813,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4815,
                  "src": "1312:6:30",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes4",
                    "typeString": "bytes4"
                  },
                  "typeName": {
                    "id": 4812,
                    "name": "bytes4",
                    "nodeType": "ElementaryTypeName",
                    "src": "1312:6:30",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1311:8:30"
            },
            "scope": 4816,
            "src": "1243:77:30",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4817,
        "src": "671:651:30"
      }
    ],
    "src": "580:743:30"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T08:07:49.126Z"
}