export const ITransactions = 
{
  "contractName": "ITransactions",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "salt",
          "type": "uint256"
        },
        {
          "name": "signerAddress",
          "type": "address"
        },
        {
          "name": "data",
          "type": "bytes"
        },
        {
          "name": "signature",
          "type": "bytes"
        }
      ],
      "name": "executeTransaction",
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
  "source": "/*\n\n  Copyright 2018 ZeroEx Intl.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\npragma solidity ^0.4.24;\n\ncontract ITransactions {\n\n    /// @dev Executes an exchange method call in the context of signer.\n    /// @param salt Arbitrary number to ensure uniqueness of transaction hash.\n    /// @param signerAddress Address of transaction signer.\n    /// @param data AbiV2 encoded calldata.\n    /// @param signature Proof of signer transaction by signer.\n    function executeTransaction(\n        uint256 salt,\n        address signerAddress,\n        bytes data,\n        bytes signature\n    )\n        external;\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/ITransactions.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/ITransactions.sol",
    "exportedSymbols": {
      "ITransactions": [
        3645
      ]
    },
    "id": 3646,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3633,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "579:24:35"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 3645,
        "linearizedBaseContracts": [
          3645
        ],
        "name": "ITransactions",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Executes an exchange method call in the context of signer.\n @param salt Arbitrary number to ensure uniqueness of transaction hash.\n @param signerAddress Address of transaction signer.\n @param data AbiV2 encoded calldata.\n @param signature Proof of signer transaction by signer.",
            "id": 3644,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "executeTransaction",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3642,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3635,
                  "name": "salt",
                  "nodeType": "VariableDeclaration",
                  "scope": 3644,
                  "src": "991:12:35",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3634,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "991:7:35",
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
                  "id": 3637,
                  "name": "signerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3644,
                  "src": "1013:21:35",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3636,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1013:7:35",
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
                  "id": 3639,
                  "name": "data",
                  "nodeType": "VariableDeclaration",
                  "scope": 3644,
                  "src": "1044:10:35",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3638,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1044:5:35",
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
                  "id": 3641,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 3644,
                  "src": "1064:15:35",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3640,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1064:5:35",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "981:104:35"
            },
            "payable": false,
            "returnParameters": {
              "id": 3643,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1102:0:35"
            },
            "scope": 3645,
            "src": "954:149:35",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3646,
        "src": "605:500:35"
      }
    ],
    "src": "579:527:35"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/ITransactions.sol",
    "exportedSymbols": {
      "ITransactions": [
        3645
      ]
    },
    "id": 3646,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3633,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "579:24:35"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 3645,
        "linearizedBaseContracts": [
          3645
        ],
        "name": "ITransactions",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Executes an exchange method call in the context of signer.\n @param salt Arbitrary number to ensure uniqueness of transaction hash.\n @param signerAddress Address of transaction signer.\n @param data AbiV2 encoded calldata.\n @param signature Proof of signer transaction by signer.",
            "id": 3644,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "executeTransaction",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3642,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3635,
                  "name": "salt",
                  "nodeType": "VariableDeclaration",
                  "scope": 3644,
                  "src": "991:12:35",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3634,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "991:7:35",
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
                  "id": 3637,
                  "name": "signerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3644,
                  "src": "1013:21:35",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3636,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1013:7:35",
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
                  "id": 3639,
                  "name": "data",
                  "nodeType": "VariableDeclaration",
                  "scope": 3644,
                  "src": "1044:10:35",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3638,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1044:5:35",
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
                  "id": 3641,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 3644,
                  "src": "1064:15:35",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3640,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1064:5:35",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "981:104:35"
            },
            "payable": false,
            "returnParameters": {
              "id": 3643,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1102:0:35"
            },
            "scope": 3645,
            "src": "954:149:35",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3646,
        "src": "605:500:35"
      }
    ],
    "src": "579:527:35"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-08T01:11:15.200Z"
}