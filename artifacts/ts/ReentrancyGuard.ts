export const ReentrancyGuard = 
{
  "contractName": "ReentrancyGuard",
  "abi": [],
  "bytecode": "0x60806040526001600055348015601457600080fd5b5060358060226000396000f3006080604052600080fd00a165627a7a723058204f1fb9b541911fa84da3edc1da54f3952504c5c9245ea6a9054b41dbebfd319a0029",
  "deployedBytecode": "0x6080604052600080fd00a165627a7a723058204f1fb9b541911fa84da3edc1da54f3952504c5c9245ea6a9054b41dbebfd319a0029",
  "sourceMap": "250:1023:40:-;;;487:1;657:51;;250:1023;8:9:-1;5:2;;;30:1;27;20:12;5:2;250:1023:40;;;;;;;",
  "deployedSourceMap": "250:1023:40:-;;;;;",
  "source": "pragma solidity ^0.4.24;\n\n\n/**\n * @title Helps contracts guard against reentrancy attacks.\n * @author Remco Bloemen <remco@2π.com>, Eenae <alexey@mixbytes.io>\n * @dev If you mark a function `nonReentrant`, you should also\n * mark it `external`.\n */\ncontract ReentrancyGuard {\n\n  /// @dev Constant for unlocked guard state - non-zero to prevent extra gas costs.\n  /// See: https://github.com/OpenZeppelin/openzeppelin-solidity/issues/1056\n  uint private constant REENTRANCY_GUARD_FREE = 1;\n\n  /// @dev Constant for locked guard state\n  uint private constant REENTRANCY_GUARD_LOCKED = 2;\n\n  /**\n   * @dev We use a single lock for the whole contract.\n   */\n  uint private reentrancyLock = REENTRANCY_GUARD_FREE;\n\n  /**\n   * @dev Prevents a contract from calling itself, directly or indirectly.\n   * If you mark a function `nonReentrant`, you should also\n   * mark it `external`. Calling one `nonReentrant` function from\n   * another is not supported. Instead, you can implement a\n   * `private` function doing the actual work, and an `external`\n   * wrapper marked as `nonReentrant`.\n   */\n  modifier nonReentrant() {\n    require(reentrancyLock == REENTRANCY_GUARD_FREE);\n    reentrancyLock = REENTRANCY_GUARD_LOCKED;\n    _;\n    reentrancyLock = REENTRANCY_GUARD_FREE;\n  }\n\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/ReentrancyGuard.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/ReentrancyGuard.sol",
    "exportedSymbols": {
      "ReentrancyGuard": [
        6352
      ]
    },
    "id": 6353,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6324,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:40"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title Helps contracts guard against reentrancy attacks.\n@author Remco Bloemen <remco@2π.com>, Eenae <alexey@mixbytes.io>\n@dev If you mark a function `nonReentrant`, you should also\nmark it `external`.",
        "fullyImplemented": true,
        "id": 6352,
        "linearizedBaseContracts": [
          6352
        ],
        "name": "ReentrancyGuard",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 6327,
            "name": "REENTRANCY_GUARD_FREE",
            "nodeType": "VariableDeclaration",
            "scope": 6352,
            "src": "441:47:40",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 6325,
              "name": "uint",
              "nodeType": "ElementaryTypeName",
              "src": "441:4:40",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "31",
              "id": 6326,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "number",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "487:1:40",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_rational_1_by_1",
                "typeString": "int_const 1"
              },
              "value": "1"
            },
            "visibility": "private"
          },
          {
            "constant": true,
            "id": 6330,
            "name": "REENTRANCY_GUARD_LOCKED",
            "nodeType": "VariableDeclaration",
            "scope": 6352,
            "src": "536:49:40",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 6328,
              "name": "uint",
              "nodeType": "ElementaryTypeName",
              "src": "536:4:40",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "32",
              "id": 6329,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "number",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "584:1:40",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_rational_2_by_1",
                "typeString": "int_const 2"
              },
              "value": "2"
            },
            "visibility": "private"
          },
          {
            "constant": false,
            "id": 6333,
            "name": "reentrancyLock",
            "nodeType": "VariableDeclaration",
            "scope": 6352,
            "src": "657:51:40",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 6331,
              "name": "uint",
              "nodeType": "ElementaryTypeName",
              "src": "657:4:40",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": {
              "argumentTypes": null,
              "id": 6332,
              "name": "REENTRANCY_GUARD_FREE",
              "nodeType": "Identifier",
              "overloadedDeclarations": [],
              "referencedDeclaration": 6327,
              "src": "687:21:40",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "visibility": "private"
          },
          {
            "body": {
              "id": 6350,
              "nodeType": "Block",
              "src": "1114:156:40",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 6338,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 6336,
                          "name": "reentrancyLock",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6333,
                          "src": "1128:14:40",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 6337,
                          "name": "REENTRANCY_GUARD_FREE",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6327,
                          "src": "1146:21:40",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "1128:39:40",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 6335,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "1120:7:40",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6339,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1120:48:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6340,
                  "nodeType": "ExpressionStatement",
                  "src": "1120:48:40"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6343,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 6341,
                      "name": "reentrancyLock",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6333,
                      "src": "1174:14:40",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 6342,
                      "name": "REENTRANCY_GUARD_LOCKED",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6330,
                      "src": "1191:23:40",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "1174:40:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 6344,
                  "nodeType": "ExpressionStatement",
                  "src": "1174:40:40"
                },
                {
                  "id": 6345,
                  "nodeType": "PlaceholderStatement",
                  "src": "1220:1:40"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6348,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 6346,
                      "name": "reentrancyLock",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6333,
                      "src": "1227:14:40",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 6347,
                      "name": "REENTRANCY_GUARD_FREE",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6327,
                      "src": "1244:21:40",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "1227:38:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 6349,
                  "nodeType": "ExpressionStatement",
                  "src": "1227:38:40"
                }
              ]
            },
            "documentation": "@dev Prevents a contract from calling itself, directly or indirectly.\nIf you mark a function `nonReentrant`, you should also\nmark it `external`. Calling one `nonReentrant` function from\nanother is not supported. Instead, you can implement a\n`private` function doing the actual work, and an `external`\nwrapper marked as `nonReentrant`.",
            "id": 6351,
            "name": "nonReentrant",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 6334,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1111:2:40"
            },
            "src": "1090:180:40",
            "visibility": "internal"
          }
        ],
        "scope": 6353,
        "src": "250:1023:40"
      }
    ],
    "src": "0:1274:40"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/ReentrancyGuard.sol",
    "exportedSymbols": {
      "ReentrancyGuard": [
        6352
      ]
    },
    "id": 6353,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6324,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:40"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title Helps contracts guard against reentrancy attacks.\n@author Remco Bloemen <remco@2π.com>, Eenae <alexey@mixbytes.io>\n@dev If you mark a function `nonReentrant`, you should also\nmark it `external`.",
        "fullyImplemented": true,
        "id": 6352,
        "linearizedBaseContracts": [
          6352
        ],
        "name": "ReentrancyGuard",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 6327,
            "name": "REENTRANCY_GUARD_FREE",
            "nodeType": "VariableDeclaration",
            "scope": 6352,
            "src": "441:47:40",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 6325,
              "name": "uint",
              "nodeType": "ElementaryTypeName",
              "src": "441:4:40",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "31",
              "id": 6326,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "number",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "487:1:40",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_rational_1_by_1",
                "typeString": "int_const 1"
              },
              "value": "1"
            },
            "visibility": "private"
          },
          {
            "constant": true,
            "id": 6330,
            "name": "REENTRANCY_GUARD_LOCKED",
            "nodeType": "VariableDeclaration",
            "scope": 6352,
            "src": "536:49:40",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 6328,
              "name": "uint",
              "nodeType": "ElementaryTypeName",
              "src": "536:4:40",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "32",
              "id": 6329,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "number",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "584:1:40",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_rational_2_by_1",
                "typeString": "int_const 2"
              },
              "value": "2"
            },
            "visibility": "private"
          },
          {
            "constant": false,
            "id": 6333,
            "name": "reentrancyLock",
            "nodeType": "VariableDeclaration",
            "scope": 6352,
            "src": "657:51:40",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 6331,
              "name": "uint",
              "nodeType": "ElementaryTypeName",
              "src": "657:4:40",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": {
              "argumentTypes": null,
              "id": 6332,
              "name": "REENTRANCY_GUARD_FREE",
              "nodeType": "Identifier",
              "overloadedDeclarations": [],
              "referencedDeclaration": 6327,
              "src": "687:21:40",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "visibility": "private"
          },
          {
            "body": {
              "id": 6350,
              "nodeType": "Block",
              "src": "1114:156:40",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 6338,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 6336,
                          "name": "reentrancyLock",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6333,
                          "src": "1128:14:40",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 6337,
                          "name": "REENTRANCY_GUARD_FREE",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6327,
                          "src": "1146:21:40",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "1128:39:40",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 6335,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "1120:7:40",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6339,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1120:48:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6340,
                  "nodeType": "ExpressionStatement",
                  "src": "1120:48:40"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6343,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 6341,
                      "name": "reentrancyLock",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6333,
                      "src": "1174:14:40",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 6342,
                      "name": "REENTRANCY_GUARD_LOCKED",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6330,
                      "src": "1191:23:40",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "1174:40:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 6344,
                  "nodeType": "ExpressionStatement",
                  "src": "1174:40:40"
                },
                {
                  "id": 6345,
                  "nodeType": "PlaceholderStatement",
                  "src": "1220:1:40"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6348,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 6346,
                      "name": "reentrancyLock",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6333,
                      "src": "1227:14:40",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 6347,
                      "name": "REENTRANCY_GUARD_FREE",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6327,
                      "src": "1244:21:40",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "1227:38:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 6349,
                  "nodeType": "ExpressionStatement",
                  "src": "1227:38:40"
                }
              ]
            },
            "documentation": "@dev Prevents a contract from calling itself, directly or indirectly.\nIf you mark a function `nonReentrant`, you should also\nmark it `external`. Calling one `nonReentrant` function from\nanother is not supported. Instead, you can implement a\n`private` function doing the actual work, and an `external`\nwrapper marked as `nonReentrant`.",
            "id": 6351,
            "name": "nonReentrant",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 6334,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1111:2:40"
            },
            "src": "1090:180:40",
            "visibility": "internal"
          }
        ],
        "scope": 6353,
        "src": "250:1023:40"
      }
    ],
    "src": "0:1274:40"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-25T17:34:39.530Z"
}