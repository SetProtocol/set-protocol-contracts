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
        4092
      ]
    },
    "id": 4093,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4080,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "579:24:27"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4092,
        "linearizedBaseContracts": [
          4092
        ],
        "name": "ITransactions",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Executes an exchange method call in the context of signer.\n @param salt Arbitrary number to ensure uniqueness of transaction hash.\n @param signerAddress Address of transaction signer.\n @param data AbiV2 encoded calldata.\n @param signature Proof of signer transaction by signer.",
            "id": 4091,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "executeTransaction",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4089,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4082,
                  "name": "salt",
                  "nodeType": "VariableDeclaration",
                  "scope": 4091,
                  "src": "991:12:27",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4081,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "991:7:27",
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
                  "id": 4084,
                  "name": "signerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4091,
                  "src": "1013:21:27",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4083,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1013:7:27",
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
                  "id": 4086,
                  "name": "data",
                  "nodeType": "VariableDeclaration",
                  "scope": 4091,
                  "src": "1044:10:27",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4085,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1044:5:27",
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
                  "id": 4088,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4091,
                  "src": "1064:15:27",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4087,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1064:5:27",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "981:104:27"
            },
            "payable": false,
            "returnParameters": {
              "id": 4090,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1102:0:27"
            },
            "scope": 4092,
            "src": "954:149:27",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4093,
        "src": "605:500:27"
      }
    ],
    "src": "579:527:27"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/ITransactions.sol",
    "exportedSymbols": {
      "ITransactions": [
        4092
      ]
    },
    "id": 4093,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4080,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "579:24:27"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4092,
        "linearizedBaseContracts": [
          4092
        ],
        "name": "ITransactions",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Executes an exchange method call in the context of signer.\n @param salt Arbitrary number to ensure uniqueness of transaction hash.\n @param signerAddress Address of transaction signer.\n @param data AbiV2 encoded calldata.\n @param signature Proof of signer transaction by signer.",
            "id": 4091,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "executeTransaction",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4089,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4082,
                  "name": "salt",
                  "nodeType": "VariableDeclaration",
                  "scope": 4091,
                  "src": "991:12:27",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4081,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "991:7:27",
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
                  "id": 4084,
                  "name": "signerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4091,
                  "src": "1013:21:27",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4083,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1013:7:27",
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
                  "id": 4086,
                  "name": "data",
                  "nodeType": "VariableDeclaration",
                  "scope": 4091,
                  "src": "1044:10:27",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4085,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1044:5:27",
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
                  "id": 4088,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 4091,
                  "src": "1064:15:27",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4087,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1064:5:27",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "981:104:27"
            },
            "payable": false,
            "returnParameters": {
              "id": 4090,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1102:0:27"
            },
            "scope": 4092,
            "src": "954:149:27",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4093,
        "src": "605:500:27"
      }
    ],
    "src": "579:527:27"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-23T23:58:05.599Z"
}