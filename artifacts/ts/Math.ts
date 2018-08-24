export const Math = 
{
  "contractName": "Math",
  "abi": [],
  "bytecode": "0x604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a165627a7a72305820928cde60d2d913a218c792350271556e8272b7b11e9b558b1900761c646f97660029",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a165627a7a72305820928cde60d2d913a218c792350271556e8272b7b11e9b558b1900761c646f97660029",
  "sourceMap": "83:429:41:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "83:429:41:-;;;;;;;;",
  "source": "pragma solidity ^0.4.24;\n\n\n/**\n * @title Math\n * @dev Assorted math operations\n */\nlibrary Math {\n  function max64(uint64 a, uint64 b) internal pure returns (uint64) {\n    return a >= b ? a : b;\n  }\n\n  function min64(uint64 a, uint64 b) internal pure returns (uint64) {\n    return a < b ? a : b;\n  }\n\n  function max256(uint256 a, uint256 b) internal pure returns (uint256) {\n    return a >= b ? a : b;\n  }\n\n  function min256(uint256 a, uint256 b) internal pure returns (uint256) {\n    return a < b ? a : b;\n  }\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/math/Math.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/math/Math.sol",
    "exportedSymbols": {
      "Math": [
        6369
      ]
    },
    "id": 6370,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6300,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:41"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title Math\n@dev Assorted math operations",
        "fullyImplemented": true,
        "id": 6369,
        "linearizedBaseContracts": [
          6369
        ],
        "name": "Math",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 6316,
              "nodeType": "Block",
              "src": "166:32:41",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "condition": {
                      "argumentTypes": null,
                      "commonType": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      },
                      "id": 6311,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6309,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6302,
                        "src": "179:1:41",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": ">=",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6310,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6304,
                        "src": "184:1:41",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "src": "179:6:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6313,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6304,
                      "src": "192:1:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "id": 6314,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "179:14:41",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6312,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6302,
                      "src": "188:1:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "functionReturnParameters": 6308,
                  "id": 6315,
                  "nodeType": "Return",
                  "src": "172:21:41"
                }
              ]
            },
            "documentation": null,
            "id": 6317,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "max64",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6305,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6302,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6317,
                  "src": "115:8:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6301,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "115:6:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 6304,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6317,
                  "src": "125:8:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6303,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "125:6:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "114:20:41"
            },
            "payable": false,
            "returnParameters": {
              "id": 6308,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6307,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6317,
                  "src": "158:6:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6306,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "158:6:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "157:8:41"
            },
            "scope": 6369,
            "src": "100:98:41",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6333,
              "nodeType": "Block",
              "src": "268:31:41",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "condition": {
                      "argumentTypes": null,
                      "commonType": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      },
                      "id": 6328,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6326,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6319,
                        "src": "281:1:41",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "<",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6327,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6321,
                        "src": "285:1:41",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "src": "281:5:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6330,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6321,
                      "src": "293:1:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "id": 6331,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "281:13:41",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6329,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6319,
                      "src": "289:1:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "functionReturnParameters": 6325,
                  "id": 6332,
                  "nodeType": "Return",
                  "src": "274:20:41"
                }
              ]
            },
            "documentation": null,
            "id": 6334,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "min64",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6322,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6319,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6334,
                  "src": "217:8:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6318,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "217:6:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 6321,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6334,
                  "src": "227:8:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6320,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "227:6:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "216:20:41"
            },
            "payable": false,
            "returnParameters": {
              "id": 6325,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6324,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6334,
                  "src": "260:6:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6323,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "260:6:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "259:8:41"
            },
            "scope": 6369,
            "src": "202:97:41",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6350,
              "nodeType": "Block",
              "src": "373:32:41",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "condition": {
                      "argumentTypes": null,
                      "commonType": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "id": 6345,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6343,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6336,
                        "src": "386:1:41",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": ">=",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6344,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6338,
                        "src": "391:1:41",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "386:6:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6347,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6338,
                      "src": "399:1:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 6348,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "386:14:41",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6346,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6336,
                      "src": "395:1:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 6342,
                  "id": 6349,
                  "nodeType": "Return",
                  "src": "379:21:41"
                }
              ]
            },
            "documentation": null,
            "id": 6351,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "max256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6339,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6336,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6351,
                  "src": "319:9:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6335,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "319:7:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 6338,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6351,
                  "src": "330:9:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6337,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "330:7:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "318:22:41"
            },
            "payable": false,
            "returnParameters": {
              "id": 6342,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6341,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6351,
                  "src": "364:7:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6340,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "364:7:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "363:9:41"
            },
            "scope": 6369,
            "src": "303:102:41",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6367,
              "nodeType": "Block",
              "src": "479:31:41",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "condition": {
                      "argumentTypes": null,
                      "commonType": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "id": 6362,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6360,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6353,
                        "src": "492:1:41",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "<",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6361,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6355,
                        "src": "496:1:41",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "492:5:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6364,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6355,
                      "src": "504:1:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 6365,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "492:13:41",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6363,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6353,
                      "src": "500:1:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 6359,
                  "id": 6366,
                  "nodeType": "Return",
                  "src": "485:20:41"
                }
              ]
            },
            "documentation": null,
            "id": 6368,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "min256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6356,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6353,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6368,
                  "src": "425:9:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6352,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "425:7:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 6355,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6368,
                  "src": "436:9:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6354,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "436:7:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "424:22:41"
            },
            "payable": false,
            "returnParameters": {
              "id": 6359,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6358,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6368,
                  "src": "470:7:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6357,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "470:7:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "469:9:41"
            },
            "scope": 6369,
            "src": "409:101:41",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 6370,
        "src": "83:429:41"
      }
    ],
    "src": "0:513:41"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/math/Math.sol",
    "exportedSymbols": {
      "Math": [
        6369
      ]
    },
    "id": 6370,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6300,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:41"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title Math\n@dev Assorted math operations",
        "fullyImplemented": true,
        "id": 6369,
        "linearizedBaseContracts": [
          6369
        ],
        "name": "Math",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 6316,
              "nodeType": "Block",
              "src": "166:32:41",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "condition": {
                      "argumentTypes": null,
                      "commonType": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      },
                      "id": 6311,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6309,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6302,
                        "src": "179:1:41",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": ">=",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6310,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6304,
                        "src": "184:1:41",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "src": "179:6:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6313,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6304,
                      "src": "192:1:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "id": 6314,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "179:14:41",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6312,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6302,
                      "src": "188:1:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "functionReturnParameters": 6308,
                  "id": 6315,
                  "nodeType": "Return",
                  "src": "172:21:41"
                }
              ]
            },
            "documentation": null,
            "id": 6317,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "max64",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6305,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6302,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6317,
                  "src": "115:8:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6301,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "115:6:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 6304,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6317,
                  "src": "125:8:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6303,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "125:6:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "114:20:41"
            },
            "payable": false,
            "returnParameters": {
              "id": 6308,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6307,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6317,
                  "src": "158:6:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6306,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "158:6:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "157:8:41"
            },
            "scope": 6369,
            "src": "100:98:41",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6333,
              "nodeType": "Block",
              "src": "268:31:41",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "condition": {
                      "argumentTypes": null,
                      "commonType": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      },
                      "id": 6328,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6326,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6319,
                        "src": "281:1:41",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "<",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6327,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6321,
                        "src": "285:1:41",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "src": "281:5:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6330,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6321,
                      "src": "293:1:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "id": 6331,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "281:13:41",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6329,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6319,
                      "src": "289:1:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "functionReturnParameters": 6325,
                  "id": 6332,
                  "nodeType": "Return",
                  "src": "274:20:41"
                }
              ]
            },
            "documentation": null,
            "id": 6334,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "min64",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6322,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6319,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6334,
                  "src": "217:8:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6318,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "217:6:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 6321,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6334,
                  "src": "227:8:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6320,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "227:6:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "216:20:41"
            },
            "payable": false,
            "returnParameters": {
              "id": 6325,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6324,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6334,
                  "src": "260:6:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6323,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "260:6:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "259:8:41"
            },
            "scope": 6369,
            "src": "202:97:41",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6350,
              "nodeType": "Block",
              "src": "373:32:41",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "condition": {
                      "argumentTypes": null,
                      "commonType": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "id": 6345,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6343,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6336,
                        "src": "386:1:41",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": ">=",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6344,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6338,
                        "src": "391:1:41",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "386:6:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6347,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6338,
                      "src": "399:1:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 6348,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "386:14:41",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6346,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6336,
                      "src": "395:1:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 6342,
                  "id": 6349,
                  "nodeType": "Return",
                  "src": "379:21:41"
                }
              ]
            },
            "documentation": null,
            "id": 6351,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "max256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6339,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6336,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6351,
                  "src": "319:9:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6335,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "319:7:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 6338,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6351,
                  "src": "330:9:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6337,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "330:7:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "318:22:41"
            },
            "payable": false,
            "returnParameters": {
              "id": 6342,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6341,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6351,
                  "src": "364:7:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6340,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "364:7:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "363:9:41"
            },
            "scope": 6369,
            "src": "303:102:41",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6367,
              "nodeType": "Block",
              "src": "479:31:41",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "condition": {
                      "argumentTypes": null,
                      "commonType": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "id": 6362,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6360,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6353,
                        "src": "492:1:41",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "<",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6361,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6355,
                        "src": "496:1:41",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "492:5:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6364,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6355,
                      "src": "504:1:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 6365,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "492:13:41",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6363,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6353,
                      "src": "500:1:41",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 6359,
                  "id": 6366,
                  "nodeType": "Return",
                  "src": "485:20:41"
                }
              ]
            },
            "documentation": null,
            "id": 6368,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "min256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6356,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6353,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6368,
                  "src": "425:9:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6352,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "425:7:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 6355,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6368,
                  "src": "436:9:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6354,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "436:7:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "424:22:41"
            },
            "payable": false,
            "returnParameters": {
              "id": 6359,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6358,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6368,
                  "src": "470:7:41",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6357,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "470:7:41",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "469:9:41"
            },
            "scope": 6369,
            "src": "409:101:41",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 6370,
        "src": "83:429:41"
      }
    ],
    "src": "0:513:41"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-23T23:58:05.616Z"
}