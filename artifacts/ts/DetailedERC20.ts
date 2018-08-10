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
        5660
      ]
    },
    "id": 5661,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5628,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:47"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
        "file": "./ERC20.sol",
        "id": 5629,
        "nodeType": "ImportDirective",
        "scope": 5661,
        "sourceUnit": 5704,
        "src": "26:21:47",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 5630,
              "name": "ERC20",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5703,
              "src": "309:5:47",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20_$5703",
                "typeString": "contract ERC20"
              }
            },
            "id": 5631,
            "nodeType": "InheritanceSpecifier",
            "src": "309:5:47"
          }
        ],
        "contractDependencies": [
          5703,
          5735
        ],
        "contractKind": "contract",
        "documentation": "@title DetailedERC20 token\n@dev The decimals are only for visualization purposes.\nAll the operations are done using the smallest and indivisible token unit,\njust as on Ethereum all the operations are done in wei.",
        "fullyImplemented": false,
        "id": 5660,
        "linearizedBaseContracts": [
          5660,
          5703,
          5735
        ],
        "name": "DetailedERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 5633,
            "name": "name",
            "nodeType": "VariableDeclaration",
            "scope": 5660,
            "src": "319:18:47",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 5632,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "319:6:47",
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
            "id": 5635,
            "name": "symbol",
            "nodeType": "VariableDeclaration",
            "scope": 5660,
            "src": "341:20:47",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 5634,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "341:6:47",
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
            "id": 5637,
            "name": "decimals",
            "nodeType": "VariableDeclaration",
            "scope": 5660,
            "src": "365:21:47",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint8",
              "typeString": "uint8"
            },
            "typeName": {
              "id": 5636,
              "name": "uint8",
              "nodeType": "ElementaryTypeName",
              "src": "365:5:47",
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
              "id": 5658,
              "nodeType": "Block",
              "src": "457:71:47",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5648,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5646,
                      "name": "name",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5633,
                      "src": "463:4:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 5647,
                      "name": "_name",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5639,
                      "src": "470:5:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "463:12:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 5649,
                  "nodeType": "ExpressionStatement",
                  "src": "463:12:47"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5652,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5650,
                      "name": "symbol",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5635,
                      "src": "481:6:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 5651,
                      "name": "_symbol",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5641,
                      "src": "490:7:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "481:16:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 5653,
                  "nodeType": "ExpressionStatement",
                  "src": "481:16:47"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5656,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5654,
                      "name": "decimals",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5637,
                      "src": "503:8:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 5655,
                      "name": "_decimals",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5643,
                      "src": "514:9:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "src": "503:20:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "id": 5657,
                  "nodeType": "ExpressionStatement",
                  "src": "503:20:47"
                }
              ]
            },
            "documentation": null,
            "id": 5659,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5644,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5639,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 5659,
                  "src": "403:12:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 5638,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "403:6:47",
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
                  "id": 5641,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 5659,
                  "src": "417:14:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 5640,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "417:6:47",
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
                  "id": 5643,
                  "name": "_decimals",
                  "nodeType": "VariableDeclaration",
                  "scope": 5659,
                  "src": "433:15:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 5642,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "433:5:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "402:47:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 5645,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "457:0:47"
            },
            "scope": 5660,
            "src": "391:137:47",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 5661,
        "src": "283:247:47"
      }
    ],
    "src": "0:531:47"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol",
    "exportedSymbols": {
      "DetailedERC20": [
        5660
      ]
    },
    "id": 5661,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5628,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:47"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
        "file": "./ERC20.sol",
        "id": 5629,
        "nodeType": "ImportDirective",
        "scope": 5661,
        "sourceUnit": 5704,
        "src": "26:21:47",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 5630,
              "name": "ERC20",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5703,
              "src": "309:5:47",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20_$5703",
                "typeString": "contract ERC20"
              }
            },
            "id": 5631,
            "nodeType": "InheritanceSpecifier",
            "src": "309:5:47"
          }
        ],
        "contractDependencies": [
          5703,
          5735
        ],
        "contractKind": "contract",
        "documentation": "@title DetailedERC20 token\n@dev The decimals are only for visualization purposes.\nAll the operations are done using the smallest and indivisible token unit,\njust as on Ethereum all the operations are done in wei.",
        "fullyImplemented": false,
        "id": 5660,
        "linearizedBaseContracts": [
          5660,
          5703,
          5735
        ],
        "name": "DetailedERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 5633,
            "name": "name",
            "nodeType": "VariableDeclaration",
            "scope": 5660,
            "src": "319:18:47",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 5632,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "319:6:47",
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
            "id": 5635,
            "name": "symbol",
            "nodeType": "VariableDeclaration",
            "scope": 5660,
            "src": "341:20:47",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 5634,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "341:6:47",
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
            "id": 5637,
            "name": "decimals",
            "nodeType": "VariableDeclaration",
            "scope": 5660,
            "src": "365:21:47",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint8",
              "typeString": "uint8"
            },
            "typeName": {
              "id": 5636,
              "name": "uint8",
              "nodeType": "ElementaryTypeName",
              "src": "365:5:47",
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
              "id": 5658,
              "nodeType": "Block",
              "src": "457:71:47",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5648,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5646,
                      "name": "name",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5633,
                      "src": "463:4:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 5647,
                      "name": "_name",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5639,
                      "src": "470:5:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "463:12:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 5649,
                  "nodeType": "ExpressionStatement",
                  "src": "463:12:47"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5652,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5650,
                      "name": "symbol",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5635,
                      "src": "481:6:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 5651,
                      "name": "_symbol",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5641,
                      "src": "490:7:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "481:16:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 5653,
                  "nodeType": "ExpressionStatement",
                  "src": "481:16:47"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5656,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5654,
                      "name": "decimals",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5637,
                      "src": "503:8:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 5655,
                      "name": "_decimals",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5643,
                      "src": "514:9:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "src": "503:20:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "id": 5657,
                  "nodeType": "ExpressionStatement",
                  "src": "503:20:47"
                }
              ]
            },
            "documentation": null,
            "id": 5659,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5644,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5639,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 5659,
                  "src": "403:12:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 5638,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "403:6:47",
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
                  "id": 5641,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 5659,
                  "src": "417:14:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 5640,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "417:6:47",
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
                  "id": 5643,
                  "name": "_decimals",
                  "nodeType": "VariableDeclaration",
                  "scope": 5659,
                  "src": "433:15:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 5642,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "433:5:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "402:47:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 5645,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "457:0:47"
            },
            "scope": 5660,
            "src": "391:137:47",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 5661,
        "src": "283:247:47"
      }
    ],
    "src": "0:531:47"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-10T03:42:05.786Z"
}