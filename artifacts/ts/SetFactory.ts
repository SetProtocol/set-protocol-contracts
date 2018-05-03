export const SetFactory = 
{
  "contractName": "SetFactory",
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
  "source": "pragma solidity 0.4.23;\n\n\n/**\n * @title Set interface\n */\ncontract SetFactory {\n  function createSet(address[] _tokens, uint[] _units, uint _naturalUnit) public returns (address);\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/SetFactory.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/SetFactory.sol",
    "exportedSymbols": {
      "SetFactory": [
        1750
      ]
    },
    "id": 1751,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1736,
        "literals": [
          "solidity",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:7"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title Set interface",
        "fullyImplemented": false,
        "id": 1750,
        "linearizedBaseContracts": [
          1750
        ],
        "name": "SetFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 1749,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "createSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1745,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1739,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 1749,
                  "src": "101:17:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1737,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "101:7:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1738,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "101:9:7",
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
                  "id": 1742,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 1749,
                  "src": "120:13:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1740,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "120:4:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1741,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "120:6:7",
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
                  "id": 1744,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 1749,
                  "src": "135:17:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1743,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "135:4:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "100:53:7"
            },
            "payable": false,
            "returnParameters": {
              "id": 1748,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1747,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1749,
                  "src": "170:7:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1746,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "170:7:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "169:9:7"
            },
            "scope": 1750,
            "src": "82:97:7",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 1751,
        "src": "58:123:7"
      }
    ],
    "src": "0:182:7"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/SetFactory.sol",
    "exportedSymbols": {
      "SetFactory": [
        1750
      ]
    },
    "id": 1751,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1736,
        "literals": [
          "solidity",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:7"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title Set interface",
        "fullyImplemented": false,
        "id": 1750,
        "linearizedBaseContracts": [
          1750
        ],
        "name": "SetFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 1749,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "createSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1745,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1739,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 1749,
                  "src": "101:17:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1737,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "101:7:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1738,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "101:9:7",
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
                  "id": 1742,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 1749,
                  "src": "120:13:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1740,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "120:4:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1741,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "120:6:7",
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
                  "id": 1744,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 1749,
                  "src": "135:17:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1743,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "135:4:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "100:53:7"
            },
            "payable": false,
            "returnParameters": {
              "id": 1748,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1747,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1749,
                  "src": "170:7:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1746,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "170:7:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "169:9:7"
            },
            "scope": 1750,
            "src": "82:97:7",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 1751,
        "src": "58:123:7"
      }
    ],
    "src": "0:182:7"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.23+commit.124ca40d.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-05-03T07:27:32.997Z"
}