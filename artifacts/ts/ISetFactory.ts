export const ISetFactory = 
{
  "contractName": "ISetFactory",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_tokens",
          "type": "address[]"
        },
        {
          "name": "_units",
          "type": "uint256[]"
        },
        {
          "name": "_naturalUnit",
          "type": "uint256"
        }
      ],
      "name": "createSet",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "pragma solidity 0.4.23;\n\n\n/**\n * @title Set Factory Interface\n */\ncontract ISetFactory {\n\tfunction createSet(\n\t\taddress[] _tokens,\n\t\tuint[] _units,\n\t\tuint _naturalUnit\n\t)\n\t\tpublic\n\t\treturns (address);\n}\n",
  "sourcePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/core/interfaces/ISetFactory.sol",
  "ast": {
    "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/core/interfaces/ISetFactory.sol",
    "exportedSymbols": {
      "ISetFactory": [
        1592
      ]
    },
    "id": 1593,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1578,
        "literals": [
          "solidity",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:4"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title Set Factory Interface",
        "fullyImplemented": false,
        "id": 1592,
        "linearizedBaseContracts": [
          1592
        ],
        "name": "ISetFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 1591,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "createSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1587,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1581,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 1591,
                  "src": "112:17:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1579,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "112:7:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1580,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "112:9:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1584,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 1591,
                  "src": "133:13:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1582,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "133:4:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1583,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "133:6:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1586,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 1591,
                  "src": "150:17:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1585,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "150:4:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "108:62:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 1590,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1589,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1591,
                  "src": "191:7:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1588,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "191:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "190:9:4"
            },
            "scope": 1592,
            "src": "90:110:4",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 1593,
        "src": "66:136:4"
      }
    ],
    "src": "0:203:4"
  },
  "legacyAST": {
    "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/core/interfaces/ISetFactory.sol",
    "exportedSymbols": {
      "ISetFactory": [
        1592
      ]
    },
    "id": 1593,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1578,
        "literals": [
          "solidity",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:4"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title Set Factory Interface",
        "fullyImplemented": false,
        "id": 1592,
        "linearizedBaseContracts": [
          1592
        ],
        "name": "ISetFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 1591,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "createSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1587,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1581,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 1591,
                  "src": "112:17:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1579,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "112:7:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1580,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "112:9:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1584,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 1591,
                  "src": "133:13:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1582,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "133:4:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1583,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "133:6:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1586,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 1591,
                  "src": "150:17:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1585,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "150:4:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "108:62:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 1590,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1589,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1591,
                  "src": "191:7:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1588,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "191:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "190:9:4"
            },
            "scope": 1592,
            "src": "90:110:4",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 1593,
        "src": "66:136:4"
      }
    ],
    "src": "0:203:4"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.23+commit.124ca40d.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-06-06T22:54:27.577Z"
}