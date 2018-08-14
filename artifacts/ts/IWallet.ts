export const IWallet = 
{
  "contractName": "IWallet",
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "hash",
          "type": "bytes32"
        },
        {
          "name": "signature",
          "type": "bytes"
        }
      ],
      "name": "isValidSignature",
      "outputs": [
        {
          "name": "isValid",
          "type": "bool"
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
  "source": "/*\n\n  Copyright 2018 ZeroEx Intl.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity ^0.4.24;\n\ncontract IWallet {\n\n    /// @dev Verifies that a signature is valid.\n    /// @param hash Message hash that is signed.\n    /// @param signature Proof of signing.\n    /// @return Validity of order signature.\n    function isValidSignature(\n        bytes32 hash,\n        bytes signature\n    )\n        external\n        view\n        returns (bool isValid);\n}\n",
  "sourcePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IWallet.sol",
  "ast": {
    "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IWallet.sol",
    "exportedSymbols": {
      "IWallet": [
        4381
      ]
    },
    "id": 4382,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4371,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:37"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4381,
        "linearizedBaseContracts": [
          4381
        ],
        "name": "IWallet",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Verifies that a signature is valid.\n @param hash Message hash that is signed.\n @param signature Proof of signing.\n @return Validity of order signature.",
            "id": 4380,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "isValidSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4376,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4373,
                  "name": "hash",
                  "nodeType": "VariableDeclaration",
                  "scope": 4380,
                  "src": "851:12:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4372,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "851:7:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4375,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4380,
                  "src": "873:15:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4374,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "873:5:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "841:53:37"
            },
            "payable": false,
            "returnParameters": {
              "id": 4379,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4378,
                  "name": "isValid",
                  "nodeType": "VariableDeclaration",
                  "scope": 4380,
                  "src": "942:12:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 4377,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "942:4:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "941:14:37"
            },
            "scope": 4381,
            "src": "816:140:37",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4382,
        "src": "606:352:37"
      }
    ],
    "src": "580:379:37"
  },
  "legacyAST": {
    "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IWallet.sol",
    "exportedSymbols": {
      "IWallet": [
        4381
      ]
    },
    "id": 4382,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4371,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:37"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4381,
        "linearizedBaseContracts": [
          4381
        ],
        "name": "IWallet",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Verifies that a signature is valid.\n @param hash Message hash that is signed.\n @param signature Proof of signing.\n @return Validity of order signature.",
            "id": 4380,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "isValidSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4376,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4373,
                  "name": "hash",
                  "nodeType": "VariableDeclaration",
                  "scope": 4380,
                  "src": "851:12:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4372,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "851:7:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4375,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4380,
                  "src": "873:15:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4374,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "873:5:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "841:53:37"
            },
            "payable": false,
            "returnParameters": {
              "id": 4379,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4378,
                  "name": "isValid",
                  "nodeType": "VariableDeclaration",
                  "scope": 4380,
                  "src": "942:12:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 4377,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "942:4:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "941:14:37"
            },
            "scope": 4381,
            "src": "816:140:37",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4382,
        "src": "606:352:37"
      }
    ],
    "src": "580:379:37"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-10T21:21:49.375Z"
}