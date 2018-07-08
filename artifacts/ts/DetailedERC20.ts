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
  "source": "pragma solidity ^0.4.23;\n\nimport \"./ERC20.sol\";\n\n\n/**\n * @title DetailedERC20 token\n * @dev The decimals are only for visualization purposes.\n * All the operations are done using the smallest and indivisible token unit,\n * just as on Ethereum all the operations are done in wei.\n */\ncontract DetailedERC20 is ERC20 {\n  string public name;\n  string public symbol;\n  uint8 public decimals;\n\n  constructor(string _name, string _symbol, uint8 _decimals) public {\n    name = _name;\n    symbol = _symbol;\n    decimals = _decimals;\n  }\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol",
    "exportedSymbols": {
      "DetailedERC20": [
        6019
      ]
    },
    "id": 6020,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5987,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:61"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
        "file": "./ERC20.sol",
        "id": 5988,
        "nodeType": "ImportDirective",
        "scope": 6020,
        "sourceUnit": 6063,
        "src": "26:21:61",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 5989,
              "name": "ERC20",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6062,
              "src": "309:5:61",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20_$6062",
                "typeString": "contract ERC20"
              }
            },
            "id": 5990,
            "nodeType": "InheritanceSpecifier",
            "src": "309:5:61"
          }
        ],
        "contractDependencies": [
          6062,
          6094
        ],
        "contractKind": "contract",
        "documentation": "@title DetailedERC20 token\n@dev The decimals are only for visualization purposes.\nAll the operations are done using the smallest and indivisible token unit,\njust as on Ethereum all the operations are done in wei.",
        "fullyImplemented": false,
        "id": 6019,
        "linearizedBaseContracts": [
          6019,
          6062,
          6094
        ],
        "name": "DetailedERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 5992,
            "name": "name",
            "nodeType": "VariableDeclaration",
            "scope": 6019,
            "src": "319:18:61",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 5991,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "319:6:61",
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
            "id": 5994,
            "name": "symbol",
            "nodeType": "VariableDeclaration",
            "scope": 6019,
            "src": "341:20:61",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 5993,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "341:6:61",
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
            "id": 5996,
            "name": "decimals",
            "nodeType": "VariableDeclaration",
            "scope": 6019,
            "src": "365:21:61",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint8",
              "typeString": "uint8"
            },
            "typeName": {
              "id": 5995,
              "name": "uint8",
              "nodeType": "ElementaryTypeName",
              "src": "365:5:61",
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
              "id": 6017,
              "nodeType": "Block",
              "src": "457:71:61",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6007,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 6005,
                      "name": "name",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5992,
                      "src": "463:4:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 6006,
                      "name": "_name",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5998,
                      "src": "470:5:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "463:12:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 6008,
                  "nodeType": "ExpressionStatement",
                  "src": "463:12:61"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6011,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 6009,
                      "name": "symbol",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5994,
                      "src": "481:6:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 6010,
                      "name": "_symbol",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6000,
                      "src": "490:7:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "481:16:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 6012,
                  "nodeType": "ExpressionStatement",
                  "src": "481:16:61"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6015,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 6013,
                      "name": "decimals",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5996,
                      "src": "503:8:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 6014,
                      "name": "_decimals",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6002,
                      "src": "514:9:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "src": "503:20:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "id": 6016,
                  "nodeType": "ExpressionStatement",
                  "src": "503:20:61"
                }
              ]
            },
            "documentation": null,
            "id": 6018,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6003,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5998,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 6018,
                  "src": "403:12:61",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 5997,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "403:6:61",
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
                  "id": 6000,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 6018,
                  "src": "417:14:61",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 5999,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "417:6:61",
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
                  "id": 6002,
                  "name": "_decimals",
                  "nodeType": "VariableDeclaration",
                  "scope": 6018,
                  "src": "433:15:61",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 6001,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "433:5:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "402:47:61"
            },
            "payable": false,
            "returnParameters": {
              "id": 6004,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "457:0:61"
            },
            "scope": 6019,
            "src": "391:137:61",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 6020,
        "src": "283:247:61"
      }
    ],
    "src": "0:531:61"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol",
    "exportedSymbols": {
      "DetailedERC20": [
        6019
      ]
    },
    "id": 6020,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5987,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:61"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
        "file": "./ERC20.sol",
        "id": 5988,
        "nodeType": "ImportDirective",
        "scope": 6020,
        "sourceUnit": 6063,
        "src": "26:21:61",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 5989,
              "name": "ERC20",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6062,
              "src": "309:5:61",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20_$6062",
                "typeString": "contract ERC20"
              }
            },
            "id": 5990,
            "nodeType": "InheritanceSpecifier",
            "src": "309:5:61"
          }
        ],
        "contractDependencies": [
          6062,
          6094
        ],
        "contractKind": "contract",
        "documentation": "@title DetailedERC20 token\n@dev The decimals are only for visualization purposes.\nAll the operations are done using the smallest and indivisible token unit,\njust as on Ethereum all the operations are done in wei.",
        "fullyImplemented": false,
        "id": 6019,
        "linearizedBaseContracts": [
          6019,
          6062,
          6094
        ],
        "name": "DetailedERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 5992,
            "name": "name",
            "nodeType": "VariableDeclaration",
            "scope": 6019,
            "src": "319:18:61",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 5991,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "319:6:61",
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
            "id": 5994,
            "name": "symbol",
            "nodeType": "VariableDeclaration",
            "scope": 6019,
            "src": "341:20:61",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 5993,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "341:6:61",
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
            "id": 5996,
            "name": "decimals",
            "nodeType": "VariableDeclaration",
            "scope": 6019,
            "src": "365:21:61",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint8",
              "typeString": "uint8"
            },
            "typeName": {
              "id": 5995,
              "name": "uint8",
              "nodeType": "ElementaryTypeName",
              "src": "365:5:61",
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
              "id": 6017,
              "nodeType": "Block",
              "src": "457:71:61",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6007,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 6005,
                      "name": "name",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5992,
                      "src": "463:4:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 6006,
                      "name": "_name",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5998,
                      "src": "470:5:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "463:12:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 6008,
                  "nodeType": "ExpressionStatement",
                  "src": "463:12:61"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6011,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 6009,
                      "name": "symbol",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5994,
                      "src": "481:6:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 6010,
                      "name": "_symbol",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6000,
                      "src": "490:7:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "481:16:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 6012,
                  "nodeType": "ExpressionStatement",
                  "src": "481:16:61"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6015,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 6013,
                      "name": "decimals",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5996,
                      "src": "503:8:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 6014,
                      "name": "_decimals",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6002,
                      "src": "514:9:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "src": "503:20:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "id": 6016,
                  "nodeType": "ExpressionStatement",
                  "src": "503:20:61"
                }
              ]
            },
            "documentation": null,
            "id": 6018,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6003,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5998,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 6018,
                  "src": "403:12:61",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 5997,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "403:6:61",
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
                  "id": 6000,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 6018,
                  "src": "417:14:61",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 5999,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "417:6:61",
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
                  "id": 6002,
                  "name": "_decimals",
                  "nodeType": "VariableDeclaration",
                  "scope": 6018,
                  "src": "433:15:61",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 6001,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "433:5:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "402:47:61"
            },
            "payable": false,
            "returnParameters": {
              "id": 6004,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "457:0:61"
            },
            "scope": 6019,
            "src": "391:137:61",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 6020,
        "src": "283:247:61"
      }
    ],
    "src": "0:531:61"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-08T01:11:15.213Z"
}