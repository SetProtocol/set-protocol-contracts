export const IValidator = 
{
  "contractName": "IValidator",
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "hash",
          "type": "bytes32"
        },
        {
          "name": "signerAddress",
          "type": "address"
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
  "source": "/*\n\n  Copyright 2018 ZeroEx Intl.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity ^0.4.23;\n\ncontract IValidator {\n\n    /// @dev Verifies that a signature is valid.\n    /// @param hash Message hash that is signed.\n    /// @param signerAddress Address that should have signed the given hash.\n    /// @param signature Proof of signing.\n    /// @return Validity of order signature.\n    function isValidSignature(\n        bytes32 hash,\n        address signerAddress,\n        bytes signature\n    )\n        external\n        view\n        returns (bool isValid);\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IValidator.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IValidator.sol",
    "exportedSymbols": {
      "IValidator": [
        5030
      ]
    },
    "id": 5031,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5018,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:39"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 5030,
        "linearizedBaseContracts": [
          5030
        ],
        "name": "IValidator",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Verifies that a signature is valid.\n @param hash Message hash that is signed.\n @param signerAddress Address that should have signed the given hash.\n @param signature Proof of signing.\n @return Validity of order signature.",
            "id": 5029,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "isValidSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5025,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5020,
                  "name": "hash",
                  "nodeType": "VariableDeclaration",
                  "scope": 5029,
                  "src": "931:12:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5019,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "931:7:39",
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
                  "id": 5022,
                  "name": "signerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 5029,
                  "src": "953:21:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5021,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "953:7:39",
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
                  "id": 5024,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 5029,
                  "src": "984:15:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 5023,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "984:5:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "921:84:39"
            },
            "payable": false,
            "returnParameters": {
              "id": 5028,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5027,
                  "name": "isValid",
                  "nodeType": "VariableDeclaration",
                  "scope": 5029,
                  "src": "1053:12:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5026,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1053:4:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1052:14:39"
            },
            "scope": 5030,
            "src": "896:171:39",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 5031,
        "src": "606:463:39"
      }
    ],
    "src": "580:490:39"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IValidator.sol",
    "exportedSymbols": {
      "IValidator": [
        5030
      ]
    },
    "id": 5031,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5018,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:39"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 5030,
        "linearizedBaseContracts": [
          5030
        ],
        "name": "IValidator",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Verifies that a signature is valid.\n @param hash Message hash that is signed.\n @param signerAddress Address that should have signed the given hash.\n @param signature Proof of signing.\n @return Validity of order signature.",
            "id": 5029,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "isValidSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5025,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5020,
                  "name": "hash",
                  "nodeType": "VariableDeclaration",
                  "scope": 5029,
                  "src": "931:12:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5019,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "931:7:39",
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
                  "id": 5022,
                  "name": "signerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 5029,
                  "src": "953:21:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5021,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "953:7:39",
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
                  "id": 5024,
                  "name": "signature",
                  "nodeType": "VariableDeclaration",
                  "scope": 5029,
                  "src": "984:15:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 5023,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "984:5:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "921:84:39"
            },
            "payable": false,
            "returnParameters": {
              "id": 5028,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5027,
                  "name": "isValid",
                  "nodeType": "VariableDeclaration",
                  "scope": 5029,
                  "src": "1053:12:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5026,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1053:4:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1052:14:39"
            },
            "scope": 5030,
            "src": "896:171:39",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 5031,
        "src": "606:463:39"
      }
    ],
    "src": "580:490:39"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T08:07:49.129Z"
}