export const Migrations = 
{
  "contractName": "Migrations",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "lastCompletedMigration",
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
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "completed",
          "type": "uint256"
        }
      ],
      "name": "setCompleted",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newAddress",
          "type": "address"
        }
      ],
      "name": "upgrade",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506102f8806100606000396000f300608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630900f010146100675780638da5cb5b146100aa578063fbdbad3c14610101578063fdacd5761461012c575b600080fd5b34801561007357600080fd5b506100a8600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610159565b005b3480156100b657600080fd5b506100bf610241565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561010d57600080fd5b50610116610266565b6040518082815260200191505060405180910390f35b34801561013857600080fd5b506101576004803603810190808035906020019092919050505061026c565b005b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561023d578190508073ffffffffffffffffffffffffffffffffffffffff1663fdacd5766001546040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b15801561022457600080fd5b505af1158015610238573d6000803e3d6000fd5b505050505b5050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60015481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156102c957806001819055505b505600a165627a7a7230582022dc6efc567e7501037ec87ecfa2d8a5380b54d06f2926041190c80a8cd7810b0029",
  "deployedBytecode": "0x608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630900f010146100675780638da5cb5b146100aa578063fbdbad3c14610101578063fdacd5761461012c575b600080fd5b34801561007357600080fd5b506100a8600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610159565b005b3480156100b657600080fd5b506100bf610241565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561010d57600080fd5b50610116610266565b6040518082815260200191505060405180910390f35b34801561013857600080fd5b506101576004803603810190808035906020019092919050505061026c565b005b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561023d578190508073ffffffffffffffffffffffffffffffffffffffff1663fdacd5766001546040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b15801561022457600080fd5b505af1158015610238573d6000803e3d6000fd5b505050505b5050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60015481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156102c957806001819055505b505600a165627a7a7230582022dc6efc567e7501037ec87ecfa2d8a5380b54d06f2926041190c80a8cd7810b0029",
  "sourceMap": "26:472:0:-;;;176:50;8:9:-1;5:2;;;30:1;27;20:12;5:2;176:50:0;211:10;203:5;;:18;;;;;;;;;;;;;;;;;;26:472;;;;;;",
  "deployedSourceMap": "26:472:0:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;335:161;;8:9:-1;5:2;;;30:1;27;20:12;5:2;335:161:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;50:20;;8:9:-1;5:2;;;30:1;27;20:12;5:2;50:20:0;;;;;;;;;;;;;;;;;;;;;;;;;;;74:34;;8:9:-1;5:2;;;30:1;27;20:12;5:2;74:34:0;;;;;;;;;;;;;;;;;;;;;;;230:101;;8:9:-1;5:2;;;30:1;27;20:12;5:2;230:101:0;;;;;;;;;;;;;;;;;;;;;;;;;;335:161;396:19;159:5;;;;;;;;;;;145:19;;:10;:19;;;141:26;;;429:10;396:44;;446:8;:21;;;468:22;;446:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;446:45:0;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;446:45:0;;;;141:26;335:161;;:::o;50:20::-;;;;;;;;;;;;;:::o;74:34::-;;;;:::o;230:101::-;159:5;;;;;;;;;;;145:19;;:10;:19;;;141:26;;;317:9;292:22;:34;;;;141:26;230:101;:::o",
  "source": "pragma solidity 0.4.24;\n\n\ncontract Migrations {\n  address public owner;\n  uint public lastCompletedMigration;\n\n  modifier restricted() {\n    if (msg.sender == owner) _;\n  }\n\n  constructor() public {\n    owner = msg.sender;\n  }\n\n  function setCompleted(uint completed) public restricted {\n    lastCompletedMigration = completed;\n  }\n\n  function upgrade(address newAddress) public restricted {\n    Migrations upgraded = Migrations(newAddress);\n    upgraded.setCompleted(lastCompletedMigration);\n  }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/Migrations.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/Migrations.sol",
    "exportedSymbols": {
      "Migrations": [
        56
      ]
    },
    "id": 57,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:0"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 56,
        "linearizedBaseContracts": [
          56
        ],
        "name": "Migrations",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 3,
            "name": "owner",
            "nodeType": "VariableDeclaration",
            "scope": 56,
            "src": "50:20:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 2,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "50:7:0",
              "typeDescriptions": {
                "typeIdentifier": "t_address",
                "typeString": "address"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 5,
            "name": "lastCompletedMigration",
            "nodeType": "VariableDeclaration",
            "scope": 56,
            "src": "74:34:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 4,
              "name": "uint",
              "nodeType": "ElementaryTypeName",
              "src": "74:4:0",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 13,
              "nodeType": "Block",
              "src": "135:37:0",
              "statements": [
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    },
                    "id": 10,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 7,
                        "name": "msg",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5397,
                        "src": "145:3:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_magic_message",
                          "typeString": "msg"
                        }
                      },
                      "id": 8,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sender",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "145:10:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 9,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3,
                      "src": "159:5:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "145:19:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": null,
                  "id": 12,
                  "nodeType": "IfStatement",
                  "src": "141:26:0",
                  "trueBody": {
                    "id": 11,
                    "nodeType": "PlaceholderStatement",
                    "src": "166:1:0"
                  }
                }
              ]
            },
            "documentation": null,
            "id": 14,
            "name": "restricted",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 6,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "132:2:0"
            },
            "src": "113:59:0",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 22,
              "nodeType": "Block",
              "src": "197:29:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 20,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 17,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3,
                      "src": "203:5:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 18,
                        "name": "msg",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5397,
                        "src": "211:3:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_magic_message",
                          "typeString": "msg"
                        }
                      },
                      "id": 19,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sender",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "211:10:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "203:18:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 21,
                  "nodeType": "ExpressionStatement",
                  "src": "203:18:0"
                }
              ]
            },
            "documentation": null,
            "id": 23,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 15,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "187:2:0"
            },
            "payable": false,
            "returnParameters": {
              "id": 16,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "197:0:0"
            },
            "scope": 56,
            "src": "176:50:0",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 34,
              "nodeType": "Block",
              "src": "286:45:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 32,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 30,
                      "name": "lastCompletedMigration",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5,
                      "src": "292:22:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 31,
                      "name": "completed",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 25,
                      "src": "317:9:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "292:34:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 33,
                  "nodeType": "ExpressionStatement",
                  "src": "292:34:0"
                }
              ]
            },
            "documentation": null,
            "id": 35,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 28,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 27,
                  "name": "restricted",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 14,
                  "src": "275:10:0",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "275:10:0"
              }
            ],
            "name": "setCompleted",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 26,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 25,
                  "name": "completed",
                  "nodeType": "VariableDeclaration",
                  "scope": 35,
                  "src": "252:14:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 24,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "252:4:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "251:16:0"
            },
            "payable": false,
            "returnParameters": {
              "id": 29,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "286:0:0"
            },
            "scope": 56,
            "src": "230:101:0",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 54,
              "nodeType": "Block",
              "src": "390:106:0",
              "statements": [
                {
                  "assignments": [
                    43
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 43,
                      "name": "upgraded",
                      "nodeType": "VariableDeclaration",
                      "scope": 55,
                      "src": "396:19:0",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Migrations_$56",
                        "typeString": "contract Migrations"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 42,
                        "name": "Migrations",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 56,
                        "src": "396:10:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_Migrations_$56",
                          "typeString": "contract Migrations"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 47,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 45,
                        "name": "newAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 37,
                        "src": "429:10:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 44,
                      "name": "Migrations",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 56,
                      "src": "418:10:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_contract$_Migrations_$56_$",
                        "typeString": "type(contract Migrations)"
                      }
                    },
                    "id": 46,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "418:22:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Migrations_$56",
                      "typeString": "contract Migrations"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "396:44:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 51,
                        "name": "lastCompletedMigration",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5,
                        "src": "468:22:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 48,
                        "name": "upgraded",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 43,
                        "src": "446:8:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_Migrations_$56",
                          "typeString": "contract Migrations"
                        }
                      },
                      "id": 50,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "setCompleted",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 35,
                      "src": "446:21:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_uint256_$returns$__$",
                        "typeString": "function (uint256) external"
                      }
                    },
                    "id": 52,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "446:45:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 53,
                  "nodeType": "ExpressionStatement",
                  "src": "446:45:0"
                }
              ]
            },
            "documentation": null,
            "id": 55,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 40,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 39,
                  "name": "restricted",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 14,
                  "src": "379:10:0",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "379:10:0"
              }
            ],
            "name": "upgrade",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 38,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 37,
                  "name": "newAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 55,
                  "src": "352:18:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 36,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "352:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "351:20:0"
            },
            "payable": false,
            "returnParameters": {
              "id": 41,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "390:0:0"
            },
            "scope": 56,
            "src": "335:161:0",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 57,
        "src": "26:472:0"
      }
    ],
    "src": "0:499:0"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/Migrations.sol",
    "exportedSymbols": {
      "Migrations": [
        56
      ]
    },
    "id": 57,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:0"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 56,
        "linearizedBaseContracts": [
          56
        ],
        "name": "Migrations",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 3,
            "name": "owner",
            "nodeType": "VariableDeclaration",
            "scope": 56,
            "src": "50:20:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 2,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "50:7:0",
              "typeDescriptions": {
                "typeIdentifier": "t_address",
                "typeString": "address"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 5,
            "name": "lastCompletedMigration",
            "nodeType": "VariableDeclaration",
            "scope": 56,
            "src": "74:34:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 4,
              "name": "uint",
              "nodeType": "ElementaryTypeName",
              "src": "74:4:0",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 13,
              "nodeType": "Block",
              "src": "135:37:0",
              "statements": [
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    },
                    "id": 10,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 7,
                        "name": "msg",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5397,
                        "src": "145:3:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_magic_message",
                          "typeString": "msg"
                        }
                      },
                      "id": 8,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sender",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "145:10:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 9,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3,
                      "src": "159:5:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "145:19:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": null,
                  "id": 12,
                  "nodeType": "IfStatement",
                  "src": "141:26:0",
                  "trueBody": {
                    "id": 11,
                    "nodeType": "PlaceholderStatement",
                    "src": "166:1:0"
                  }
                }
              ]
            },
            "documentation": null,
            "id": 14,
            "name": "restricted",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 6,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "132:2:0"
            },
            "src": "113:59:0",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 22,
              "nodeType": "Block",
              "src": "197:29:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 20,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 17,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3,
                      "src": "203:5:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 18,
                        "name": "msg",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5397,
                        "src": "211:3:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_magic_message",
                          "typeString": "msg"
                        }
                      },
                      "id": 19,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sender",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "211:10:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "203:18:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 21,
                  "nodeType": "ExpressionStatement",
                  "src": "203:18:0"
                }
              ]
            },
            "documentation": null,
            "id": 23,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 15,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "187:2:0"
            },
            "payable": false,
            "returnParameters": {
              "id": 16,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "197:0:0"
            },
            "scope": 56,
            "src": "176:50:0",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 34,
              "nodeType": "Block",
              "src": "286:45:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 32,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 30,
                      "name": "lastCompletedMigration",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5,
                      "src": "292:22:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 31,
                      "name": "completed",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 25,
                      "src": "317:9:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "292:34:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 33,
                  "nodeType": "ExpressionStatement",
                  "src": "292:34:0"
                }
              ]
            },
            "documentation": null,
            "id": 35,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 28,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 27,
                  "name": "restricted",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 14,
                  "src": "275:10:0",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "275:10:0"
              }
            ],
            "name": "setCompleted",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 26,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 25,
                  "name": "completed",
                  "nodeType": "VariableDeclaration",
                  "scope": 35,
                  "src": "252:14:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 24,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "252:4:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "251:16:0"
            },
            "payable": false,
            "returnParameters": {
              "id": 29,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "286:0:0"
            },
            "scope": 56,
            "src": "230:101:0",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 54,
              "nodeType": "Block",
              "src": "390:106:0",
              "statements": [
                {
                  "assignments": [
                    43
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 43,
                      "name": "upgraded",
                      "nodeType": "VariableDeclaration",
                      "scope": 55,
                      "src": "396:19:0",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Migrations_$56",
                        "typeString": "contract Migrations"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 42,
                        "name": "Migrations",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 56,
                        "src": "396:10:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_Migrations_$56",
                          "typeString": "contract Migrations"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 47,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 45,
                        "name": "newAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 37,
                        "src": "429:10:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 44,
                      "name": "Migrations",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 56,
                      "src": "418:10:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_contract$_Migrations_$56_$",
                        "typeString": "type(contract Migrations)"
                      }
                    },
                    "id": 46,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "418:22:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Migrations_$56",
                      "typeString": "contract Migrations"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "396:44:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 51,
                        "name": "lastCompletedMigration",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5,
                        "src": "468:22:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 48,
                        "name": "upgraded",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 43,
                        "src": "446:8:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_Migrations_$56",
                          "typeString": "contract Migrations"
                        }
                      },
                      "id": 50,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "setCompleted",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 35,
                      "src": "446:21:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_uint256_$returns$__$",
                        "typeString": "function (uint256) external"
                      }
                    },
                    "id": 52,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "446:45:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 53,
                  "nodeType": "ExpressionStatement",
                  "src": "446:45:0"
                }
              ]
            },
            "documentation": null,
            "id": 55,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 40,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 39,
                  "name": "restricted",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 14,
                  "src": "379:10:0",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "379:10:0"
              }
            ],
            "name": "upgrade",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 38,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 37,
                  "name": "newAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 55,
                  "src": "352:18:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 36,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "352:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "351:20:0"
            },
            "payable": false,
            "returnParameters": {
              "id": 41,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "390:0:0"
            },
            "scope": 56,
            "src": "335:161:0",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 57,
        "src": "26:472:0"
      }
    ],
    "src": "0:499:0"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-07T07:45:08.888Z"
}