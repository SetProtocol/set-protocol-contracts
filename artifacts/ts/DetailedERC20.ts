export const DetailedERC20 = 
{
  "contractName": "DetailedERC20",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
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
          "name": "spender",
          "type": "address"
        },
        {
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
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
          "name": "from",
          "type": "address"
        },
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "who",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
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
          "name": "to",
          "type": "address"
        },
        {
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "owner",
          "type": "address"
        },
        {
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_name",
          "type": "string"
        },
        {
          "name": "_symbol",
          "type": "string"
        },
        {
          "name": "_decimals",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "pragma solidity ^0.4.24;\n\nimport \"./ERC20.sol\";\n\n\n/**\n * @title DetailedERC20 token\n * @dev The decimals are only for visualization purposes.\n * All the operations are done using the smallest and indivisible token unit,\n * just as on Ethereum all the operations are done in wei.\n */\ncontract DetailedERC20 is ERC20 {\n  string public name;\n  string public symbol;\n  uint8 public decimals;\n\n  constructor(string _name, string _symbol, uint8 _decimals) public {\n    name = _name;\n    symbol = _symbol;\n    decimals = _decimals;\n  }\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol",
    "exportedSymbols": {
      "DetailedERC20": [
        8970
      ]
    },
    "id": 8971,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 8938,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:70"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
        "file": "./ERC20.sol",
        "id": 8939,
        "nodeType": "ImportDirective",
        "scope": 8971,
        "sourceUnit": 9014,
        "src": "26:21:70",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 8940,
              "name": "ERC20",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 9013,
              "src": "309:5:70",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20_$9013",
                "typeString": "contract ERC20"
              }
            },
            "id": 8941,
            "nodeType": "InheritanceSpecifier",
            "src": "309:5:70"
          }
        ],
        "contractDependencies": [
          9013,
          9045
        ],
        "contractKind": "contract",
        "documentation": "@title DetailedERC20 token\n@dev The decimals are only for visualization purposes.\nAll the operations are done using the smallest and indivisible token unit,\njust as on Ethereum all the operations are done in wei.",
        "fullyImplemented": false,
        "id": 8970,
        "linearizedBaseContracts": [
          8970,
          9013,
          9045
        ],
        "name": "DetailedERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 8943,
            "name": "name",
            "nodeType": "VariableDeclaration",
            "scope": 8970,
            "src": "319:18:70",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 8942,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "319:6:70",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 8945,
            "name": "symbol",
            "nodeType": "VariableDeclaration",
            "scope": 8970,
            "src": "341:20:70",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 8944,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "341:6:70",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 8947,
            "name": "decimals",
            "nodeType": "VariableDeclaration",
            "scope": 8970,
            "src": "365:21:70",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint8",
              "typeString": "uint8"
            },
            "typeName": {
              "id": 8946,
              "name": "uint8",
              "nodeType": "ElementaryTypeName",
              "src": "365:5:70",
              "typeDescriptions": {
                "typeIdentifier": "t_uint8",
                "typeString": "uint8"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 8968,
              "nodeType": "Block",
              "src": "457:71:70",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8958,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8956,
                      "name": "name",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8943,
                      "src": "463:4:70",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 8957,
                      "name": "_name",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8949,
                      "src": "470:5:70",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "463:12:70",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 8959,
                  "nodeType": "ExpressionStatement",
                  "src": "463:12:70"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8962,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8960,
                      "name": "symbol",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8945,
                      "src": "481:6:70",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 8961,
                      "name": "_symbol",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8951,
                      "src": "490:7:70",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "481:16:70",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 8963,
                  "nodeType": "ExpressionStatement",
                  "src": "481:16:70"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8966,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8964,
                      "name": "decimals",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8947,
                      "src": "503:8:70",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 8965,
                      "name": "_decimals",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8953,
                      "src": "514:9:70",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "src": "503:20:70",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "id": 8967,
                  "nodeType": "ExpressionStatement",
                  "src": "503:20:70"
                }
              ]
            },
            "documentation": null,
            "id": 8969,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 8954,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 8949,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 8969,
                  "src": "403:12:70",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 8948,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "403:6:70",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 8951,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 8969,
                  "src": "417:14:70",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 8950,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "417:6:70",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 8953,
                  "name": "_decimals",
                  "nodeType": "VariableDeclaration",
                  "scope": 8969,
                  "src": "433:15:70",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 8952,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "433:5:70",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "402:47:70"
            },
            "payable": false,
            "returnParameters": {
              "id": 8955,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "457:0:70"
            },
            "scope": 8970,
            "src": "391:137:70",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 8971,
        "src": "283:247:70"
      }
    ],
    "src": "0:531:70"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol",
    "exportedSymbols": {
      "DetailedERC20": [
        8970
      ]
    },
    "id": 8971,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 8938,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:70"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
        "file": "./ERC20.sol",
        "id": 8939,
        "nodeType": "ImportDirective",
        "scope": 8971,
        "sourceUnit": 9014,
        "src": "26:21:70",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 8940,
              "name": "ERC20",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 9013,
              "src": "309:5:70",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20_$9013",
                "typeString": "contract ERC20"
              }
            },
            "id": 8941,
            "nodeType": "InheritanceSpecifier",
            "src": "309:5:70"
          }
        ],
        "contractDependencies": [
          9013,
          9045
        ],
        "contractKind": "contract",
        "documentation": "@title DetailedERC20 token\n@dev The decimals are only for visualization purposes.\nAll the operations are done using the smallest and indivisible token unit,\njust as on Ethereum all the operations are done in wei.",
        "fullyImplemented": false,
        "id": 8970,
        "linearizedBaseContracts": [
          8970,
          9013,
          9045
        ],
        "name": "DetailedERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 8943,
            "name": "name",
            "nodeType": "VariableDeclaration",
            "scope": 8970,
            "src": "319:18:70",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 8942,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "319:6:70",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 8945,
            "name": "symbol",
            "nodeType": "VariableDeclaration",
            "scope": 8970,
            "src": "341:20:70",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 8944,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "341:6:70",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 8947,
            "name": "decimals",
            "nodeType": "VariableDeclaration",
            "scope": 8970,
            "src": "365:21:70",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint8",
              "typeString": "uint8"
            },
            "typeName": {
              "id": 8946,
              "name": "uint8",
              "nodeType": "ElementaryTypeName",
              "src": "365:5:70",
              "typeDescriptions": {
                "typeIdentifier": "t_uint8",
                "typeString": "uint8"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 8968,
              "nodeType": "Block",
              "src": "457:71:70",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8958,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8956,
                      "name": "name",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8943,
                      "src": "463:4:70",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 8957,
                      "name": "_name",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8949,
                      "src": "470:5:70",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "463:12:70",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 8959,
                  "nodeType": "ExpressionStatement",
                  "src": "463:12:70"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8962,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8960,
                      "name": "symbol",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8945,
                      "src": "481:6:70",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 8961,
                      "name": "_symbol",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8951,
                      "src": "490:7:70",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "481:16:70",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 8963,
                  "nodeType": "ExpressionStatement",
                  "src": "481:16:70"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8966,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8964,
                      "name": "decimals",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8947,
                      "src": "503:8:70",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 8965,
                      "name": "_decimals",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8953,
                      "src": "514:9:70",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "src": "503:20:70",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "id": 8967,
                  "nodeType": "ExpressionStatement",
                  "src": "503:20:70"
                }
              ]
            },
            "documentation": null,
            "id": 8969,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 8954,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 8949,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 8969,
                  "src": "403:12:70",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 8948,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "403:6:70",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 8951,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 8969,
                  "src": "417:14:70",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 8950,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "417:6:70",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 8953,
                  "name": "_decimals",
                  "nodeType": "VariableDeclaration",
                  "scope": 8969,
                  "src": "433:15:70",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 8952,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "433:5:70",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "402:47:70"
            },
            "payable": false,
            "returnParameters": {
              "id": 8955,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "457:0:70"
            },
            "scope": 8970,
            "src": "391:137:70",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 8971,
        "src": "283:247:70"
      }
    ],
    "src": "0:531:70"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T08:07:49.224Z"
}