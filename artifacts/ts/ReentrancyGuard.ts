export const ReentrancyGuard = 
{
  "contractName": "ReentrancyGuard",
  "abi": [],
  "bytecode": "0x60806040526000805460ff19169055348015601957600080fd5b5060358060276000396000f3006080604052600080fd00a165627a7a723058207dd4e9be2e3559d9172d0b5a25f0f995ed5c451d815dc82d17039f95fbeed6bd0029",
  "deployedBytecode": "0x6080604052600080fd00a165627a7a723058207dd4e9be2e3559d9172d0b5a25f0f995ed5c451d815dc82d17039f95fbeed6bd0029",
  "sourceMap": "224:643:40:-;;;351:5;321:35;;-1:-1:-1;;321:35:40;;;224:643;5:2:-1;;;;30:1;27;20:12;5:2;224:643:40;;;;;;;",
  "deployedSourceMap": "224:643:40:-;;;;;",
  "source": "pragma solidity ^0.4.24;\n\n\n/**\n * @title Helps contracts guard agains reentrancy attacks.\n * @author Remco Bloemen <remco@2π.com>\n * @notice If you mark a function `nonReentrant`, you should also\n * mark it `external`.\n */\ncontract ReentrancyGuard {\n\n  /**\n   * @dev We use a single lock for the whole contract.\n   */\n  bool private reentrancyLock = false;\n\n  /**\n   * @dev Prevents a contract from calling itself, directly or indirectly.\n   * @notice If you mark a function `nonReentrant`, you should also\n   * mark it `external`. Calling one nonReentrant function from\n   * another is not supported. Instead, you can implement a\n   * `private` function doing the actual work, and a `external`\n   * wrapper marked as `nonReentrant`.\n   */\n  modifier nonReentrant() {\n    require(!reentrancyLock);\n    reentrancyLock = true;\n    _;\n    reentrancyLock = false;\n  }\n\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/ReentrancyGuard.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/ReentrancyGuard.sol",
    "exportedSymbols": {
      "ReentrancyGuard": [
        6298
      ]
    },
    "id": 6299,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6277,
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
        "documentation": "@title Helps contracts guard agains reentrancy attacks.\n@author Remco Bloemen <remco@2π.com>\n@notice If you mark a function `nonReentrant`, you should also\nmark it `external`.",
        "fullyImplemented": true,
        "id": 6298,
        "linearizedBaseContracts": [
          6298
        ],
        "name": "ReentrancyGuard",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 6280,
            "name": "reentrancyLock",
            "nodeType": "VariableDeclaration",
            "scope": 6298,
            "src": "321:35:40",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bool",
              "typeString": "bool"
            },
            "typeName": {
              "id": 6278,
              "name": "bool",
              "nodeType": "ElementaryTypeName",
              "src": "321:4:40",
              "typeDescriptions": {
                "typeIdentifier": "t_bool",
                "typeString": "bool"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "66616c7365",
              "id": 6279,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "bool",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "351:5:40",
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
              "id": 6296,
              "nodeType": "Block",
              "src": "767:97:40",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 6284,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "UnaryOperation",
                        "operator": "!",
                        "prefix": true,
                        "src": "781:15:40",
                        "subExpression": {
                          "argumentTypes": null,
                          "id": 6283,
                          "name": "reentrancyLock",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6280,
                          "src": "782:14:40",
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
                      "id": 6282,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "773:7:40",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6285,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "773:24:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6286,
                  "nodeType": "ExpressionStatement",
                  "src": "773:24:40"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6289,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 6287,
                      "name": "reentrancyLock",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6280,
                      "src": "803:14:40",
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
                      "id": 6288,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "820:4:40",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "803:21:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 6290,
                  "nodeType": "ExpressionStatement",
                  "src": "803:21:40"
                },
                {
                  "id": 6291,
                  "nodeType": "PlaceholderStatement",
                  "src": "830:1:40"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6294,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 6292,
                      "name": "reentrancyLock",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6280,
                      "src": "837:14:40",
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
                      "id": 6293,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "854:5:40",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "837:22:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 6295,
                  "nodeType": "ExpressionStatement",
                  "src": "837:22:40"
                }
              ]
            },
            "documentation": "@dev Prevents a contract from calling itself, directly or indirectly.\n@notice If you mark a function `nonReentrant`, you should also\nmark it `external`. Calling one nonReentrant function from\nanother is not supported. Instead, you can implement a\n`private` function doing the actual work, and a `external`\nwrapper marked as `nonReentrant`.",
            "id": 6297,
            "name": "nonReentrant",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 6281,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "764:2:40"
            },
            "src": "743:121:40",
            "visibility": "internal"
          }
        ],
        "scope": 6299,
        "src": "224:643:40"
      }
    ],
    "src": "0:868:40"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/ReentrancyGuard.sol",
    "exportedSymbols": {
      "ReentrancyGuard": [
        6298
      ]
    },
    "id": 6299,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6277,
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
        "documentation": "@title Helps contracts guard agains reentrancy attacks.\n@author Remco Bloemen <remco@2π.com>\n@notice If you mark a function `nonReentrant`, you should also\nmark it `external`.",
        "fullyImplemented": true,
        "id": 6298,
        "linearizedBaseContracts": [
          6298
        ],
        "name": "ReentrancyGuard",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 6280,
            "name": "reentrancyLock",
            "nodeType": "VariableDeclaration",
            "scope": 6298,
            "src": "321:35:40",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bool",
              "typeString": "bool"
            },
            "typeName": {
              "id": 6278,
              "name": "bool",
              "nodeType": "ElementaryTypeName",
              "src": "321:4:40",
              "typeDescriptions": {
                "typeIdentifier": "t_bool",
                "typeString": "bool"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "66616c7365",
              "id": 6279,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "bool",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "351:5:40",
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
              "id": 6296,
              "nodeType": "Block",
              "src": "767:97:40",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 6284,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "UnaryOperation",
                        "operator": "!",
                        "prefix": true,
                        "src": "781:15:40",
                        "subExpression": {
                          "argumentTypes": null,
                          "id": 6283,
                          "name": "reentrancyLock",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6280,
                          "src": "782:14:40",
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
                      "id": 6282,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "773:7:40",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6285,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "773:24:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6286,
                  "nodeType": "ExpressionStatement",
                  "src": "773:24:40"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6289,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 6287,
                      "name": "reentrancyLock",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6280,
                      "src": "803:14:40",
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
                      "id": 6288,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "820:4:40",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "803:21:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 6290,
                  "nodeType": "ExpressionStatement",
                  "src": "803:21:40"
                },
                {
                  "id": 6291,
                  "nodeType": "PlaceholderStatement",
                  "src": "830:1:40"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6294,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 6292,
                      "name": "reentrancyLock",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6280,
                      "src": "837:14:40",
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
                      "id": 6293,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "854:5:40",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "837:22:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 6295,
                  "nodeType": "ExpressionStatement",
                  "src": "837:22:40"
                }
              ]
            },
            "documentation": "@dev Prevents a contract from calling itself, directly or indirectly.\n@notice If you mark a function `nonReentrant`, you should also\nmark it `external`. Calling one nonReentrant function from\nanother is not supported. Instead, you can implement a\n`private` function doing the actual work, and a `external`\nwrapper marked as `nonReentrant`.",
            "id": 6297,
            "name": "nonReentrant",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 6281,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "764:2:40"
            },
            "src": "743:121:40",
            "visibility": "internal"
          }
        ],
        "scope": 6299,
        "src": "224:643:40"
      }
    ],
    "src": "0:868:40"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-23T23:58:05.616Z"
}