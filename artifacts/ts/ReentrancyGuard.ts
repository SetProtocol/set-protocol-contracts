export const ReentrancyGuard = 
{
  "contractName": "ReentrancyGuard",
  "abi": [],
  "bytecode": "0x60806040526000805460ff19169055348015601957600080fd5b5060358060276000396000f3006080604052600080fd00a165627a7a723058207dd4e9be2e3559d9172d0b5a25f0f995ed5c451d815dc82d17039f95fbeed6bd0029",
  "deployedBytecode": "0x6080604052600080fd00a165627a7a723058207dd4e9be2e3559d9172d0b5a25f0f995ed5c451d815dc82d17039f95fbeed6bd0029",
  "sourceMap": "224:643:65:-;;;351:5;321:35;;-1:-1:-1;;321:35:65;;;224:643;5:2:-1;;;;30:1;27;20:12;5:2;224:643:65;;;;;;;",
  "deployedSourceMap": "224:643:65:-;;;;;",
  "source": "pragma solidity ^0.4.24;\n\n\n/**\n * @title Helps contracts guard agains reentrancy attacks.\n * @author Remco Bloemen <remco@2π.com>\n * @notice If you mark a function `nonReentrant`, you should also\n * mark it `external`.\n */\ncontract ReentrancyGuard {\n\n  /**\n   * @dev We use a single lock for the whole contract.\n   */\n  bool private reentrancyLock = false;\n\n  /**\n   * @dev Prevents a contract from calling itself, directly or indirectly.\n   * @notice If you mark a function `nonReentrant`, you should also\n   * mark it `external`. Calling one nonReentrant function from\n   * another is not supported. Instead, you can implement a\n   * `private` function doing the actual work, and a `external`\n   * wrapper marked as `nonReentrant`.\n   */\n  modifier nonReentrant() {\n    require(!reentrancyLock);\n    reentrancyLock = true;\n    _;\n    reentrancyLock = false;\n  }\n\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/ReentrancyGuard.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/ReentrancyGuard.sol",
    "exportedSymbols": {
      "ReentrancyGuard": [
        8589
      ]
    },
    "id": 8590,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 8568,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:65"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title Helps contracts guard agains reentrancy attacks.\n@author Remco Bloemen <remco@2π.com>\n@notice If you mark a function `nonReentrant`, you should also\nmark it `external`.",
        "fullyImplemented": true,
        "id": 8589,
        "linearizedBaseContracts": [
          8589
        ],
        "name": "ReentrancyGuard",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 8571,
            "name": "reentrancyLock",
            "nodeType": "VariableDeclaration",
            "scope": 8589,
            "src": "321:35:65",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bool",
              "typeString": "bool"
            },
            "typeName": {
              "id": 8569,
              "name": "bool",
              "nodeType": "ElementaryTypeName",
              "src": "321:4:65",
              "typeDescriptions": {
                "typeIdentifier": "t_bool",
                "typeString": "bool"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "66616c7365",
              "id": 8570,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "bool",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "351:5:65",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_bool",
                "typeString": "bool"
              },
              "value": "false"
            },
            "visibility": "private"
          },
          {
            "body": {
              "id": 8587,
              "nodeType": "Block",
              "src": "767:97:65",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 8575,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "UnaryOperation",
                        "operator": "!",
                        "prefix": true,
                        "src": "781:15:65",
                        "subExpression": {
                          "argumentTypes": null,
                          "id": 8574,
                          "name": "reentrancyLock",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 8571,
                          "src": "782:14:65",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
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
                      "id": 8573,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        9310,
                        9311
                      ],
                      "referencedDeclaration": 9310,
                      "src": "773:7:65",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 8576,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "773:24:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 8577,
                  "nodeType": "ExpressionStatement",
                  "src": "773:24:65"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8580,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8578,
                      "name": "reentrancyLock",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8571,
                      "src": "803:14:65",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "74727565",
                      "id": 8579,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "820:4:65",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "803:21:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 8581,
                  "nodeType": "ExpressionStatement",
                  "src": "803:21:65"
                },
                {
                  "id": 8582,
                  "nodeType": "PlaceholderStatement",
                  "src": "830:1:65"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8585,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8583,
                      "name": "reentrancyLock",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8571,
                      "src": "837:14:65",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "66616c7365",
                      "id": 8584,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "854:5:65",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "837:22:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 8586,
                  "nodeType": "ExpressionStatement",
                  "src": "837:22:65"
                }
              ]
            },
            "documentation": "@dev Prevents a contract from calling itself, directly or indirectly.\n@notice If you mark a function `nonReentrant`, you should also\nmark it `external`. Calling one nonReentrant function from\nanother is not supported. Instead, you can implement a\n`private` function doing the actual work, and a `external`\nwrapper marked as `nonReentrant`.",
            "id": 8588,
            "name": "nonReentrant",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 8572,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "764:2:65"
            },
            "src": "743:121:65",
            "visibility": "internal"
          }
        ],
        "scope": 8590,
        "src": "224:643:65"
      }
    ],
    "src": "0:868:65"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/ReentrancyGuard.sol",
    "exportedSymbols": {
      "ReentrancyGuard": [
        8589
      ]
    },
    "id": 8590,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 8568,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:65"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title Helps contracts guard agains reentrancy attacks.\n@author Remco Bloemen <remco@2π.com>\n@notice If you mark a function `nonReentrant`, you should also\nmark it `external`.",
        "fullyImplemented": true,
        "id": 8589,
        "linearizedBaseContracts": [
          8589
        ],
        "name": "ReentrancyGuard",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 8571,
            "name": "reentrancyLock",
            "nodeType": "VariableDeclaration",
            "scope": 8589,
            "src": "321:35:65",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bool",
              "typeString": "bool"
            },
            "typeName": {
              "id": 8569,
              "name": "bool",
              "nodeType": "ElementaryTypeName",
              "src": "321:4:65",
              "typeDescriptions": {
                "typeIdentifier": "t_bool",
                "typeString": "bool"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "66616c7365",
              "id": 8570,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "bool",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "351:5:65",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_bool",
                "typeString": "bool"
              },
              "value": "false"
            },
            "visibility": "private"
          },
          {
            "body": {
              "id": 8587,
              "nodeType": "Block",
              "src": "767:97:65",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 8575,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "UnaryOperation",
                        "operator": "!",
                        "prefix": true,
                        "src": "781:15:65",
                        "subExpression": {
                          "argumentTypes": null,
                          "id": 8574,
                          "name": "reentrancyLock",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 8571,
                          "src": "782:14:65",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
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
                      "id": 8573,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        9310,
                        9311
                      ],
                      "referencedDeclaration": 9310,
                      "src": "773:7:65",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 8576,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "773:24:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 8577,
                  "nodeType": "ExpressionStatement",
                  "src": "773:24:65"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8580,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8578,
                      "name": "reentrancyLock",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8571,
                      "src": "803:14:65",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "74727565",
                      "id": 8579,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "820:4:65",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "803:21:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 8581,
                  "nodeType": "ExpressionStatement",
                  "src": "803:21:65"
                },
                {
                  "id": 8582,
                  "nodeType": "PlaceholderStatement",
                  "src": "830:1:65"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8585,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8583,
                      "name": "reentrancyLock",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8571,
                      "src": "837:14:65",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "66616c7365",
                      "id": 8584,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "854:5:65",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "837:22:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 8586,
                  "nodeType": "ExpressionStatement",
                  "src": "837:22:65"
                }
              ]
            },
            "documentation": "@dev Prevents a contract from calling itself, directly or indirectly.\n@notice If you mark a function `nonReentrant`, you should also\nmark it `external`. Calling one nonReentrant function from\nanother is not supported. Instead, you can implement a\n`private` function doing the actual work, and a `external`\nwrapper marked as `nonReentrant`.",
            "id": 8588,
            "name": "nonReentrant",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 8572,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "764:2:65"
            },
            "src": "743:121:65",
            "visibility": "internal"
          }
        ],
        "scope": 8590,
        "src": "224:643:65"
      }
    ],
    "src": "0:868:65"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T08:07:49.032Z"
}