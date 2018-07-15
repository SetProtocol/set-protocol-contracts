export const Math = 
{
  "contractName": "Math",
  "abi": [],
  "bytecode": "0x604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a165627a7a723058207836fda790e406aa3ce47fbbfb576277e2cfd1a455a32878124728186a1fe0400029",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a165627a7a723058207836fda790e406aa3ce47fbbfb576277e2cfd1a455a32878124728186a1fe0400029",
  "sourceMap": "83:429:59:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "83:429:59:-;;;;;;;;",
  "source": "pragma solidity ^0.4.23;\n\n\n/**\n * @title Math\n * @dev Assorted math operations\n */\nlibrary Math {\n  function max64(uint64 a, uint64 b) internal pure returns (uint64) {\n    return a >= b ? a : b;\n  }\n\n  function min64(uint64 a, uint64 b) internal pure returns (uint64) {\n    return a < b ? a : b;\n  }\n\n  function max256(uint256 a, uint256 b) internal pure returns (uint256) {\n    return a >= b ? a : b;\n  }\n\n  function min256(uint256 a, uint256 b) internal pure returns (uint256) {\n    return a < b ? a : b;\n  }\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/math/Math.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/math/Math.sol",
    "exportedSymbols": {
      "Math": [
        6252
      ]
    },
    "id": 6253,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6183,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:59"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title Math\n@dev Assorted math operations",
        "fullyImplemented": true,
        "id": 6252,
        "linearizedBaseContracts": [
          6252
        ],
        "name": "Math",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 6199,
              "nodeType": "Block",
              "src": "166:32:59",
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
                      "id": 6194,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6192,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6185,
                        "src": "179:1:59",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": ">=",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6193,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6187,
                        "src": "184:1:59",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "src": "179:6:59",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6196,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6187,
                      "src": "192:1:59",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "id": 6197,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "179:14:59",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6195,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6185,
                      "src": "188:1:59",
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
                  "functionReturnParameters": 6191,
                  "id": 6198,
                  "nodeType": "Return",
                  "src": "172:21:59"
                }
              ]
            },
            "documentation": null,
            "id": 6200,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "max64",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6188,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6185,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6200,
                  "src": "115:8:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6184,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "115:6:59",
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
                  "id": 6187,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6200,
                  "src": "125:8:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6186,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "125:6:59",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "114:20:59"
            },
            "payable": false,
            "returnParameters": {
              "id": 6191,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6190,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6200,
                  "src": "158:6:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6189,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "158:6:59",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "157:8:59"
            },
            "scope": 6252,
            "src": "100:98:59",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6216,
              "nodeType": "Block",
              "src": "268:31:59",
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
                      "id": 6211,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6209,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6202,
                        "src": "281:1:59",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "<",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6210,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6204,
                        "src": "285:1:59",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "src": "281:5:59",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6213,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6204,
                      "src": "293:1:59",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "id": 6214,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "281:13:59",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6212,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6202,
                      "src": "289:1:59",
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
                  "functionReturnParameters": 6208,
                  "id": 6215,
                  "nodeType": "Return",
                  "src": "274:20:59"
                }
              ]
            },
            "documentation": null,
            "id": 6217,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "min64",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6205,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6202,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6217,
                  "src": "217:8:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6201,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "217:6:59",
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
                  "id": 6204,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6217,
                  "src": "227:8:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6203,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "227:6:59",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "216:20:59"
            },
            "payable": false,
            "returnParameters": {
              "id": 6208,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6207,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6217,
                  "src": "260:6:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6206,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "260:6:59",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "259:8:59"
            },
            "scope": 6252,
            "src": "202:97:59",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6233,
              "nodeType": "Block",
              "src": "373:32:59",
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
                      "id": 6228,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6226,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6219,
                        "src": "386:1:59",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": ">=",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6227,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6221,
                        "src": "391:1:59",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "386:6:59",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6230,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6221,
                      "src": "399:1:59",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 6231,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "386:14:59",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6229,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6219,
                      "src": "395:1:59",
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
                  "functionReturnParameters": 6225,
                  "id": 6232,
                  "nodeType": "Return",
                  "src": "379:21:59"
                }
              ]
            },
            "documentation": null,
            "id": 6234,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "max256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6222,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6219,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6234,
                  "src": "319:9:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6218,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "319:7:59",
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
                  "id": 6221,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6234,
                  "src": "330:9:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6220,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "330:7:59",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "318:22:59"
            },
            "payable": false,
            "returnParameters": {
              "id": 6225,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6224,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6234,
                  "src": "364:7:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6223,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "364:7:59",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "363:9:59"
            },
            "scope": 6252,
            "src": "303:102:59",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6250,
              "nodeType": "Block",
              "src": "479:31:59",
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
                      "id": 6245,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6243,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6236,
                        "src": "492:1:59",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "<",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6244,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6238,
                        "src": "496:1:59",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "492:5:59",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6247,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6238,
                      "src": "504:1:59",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 6248,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "492:13:59",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6246,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6236,
                      "src": "500:1:59",
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
                  "functionReturnParameters": 6242,
                  "id": 6249,
                  "nodeType": "Return",
                  "src": "485:20:59"
                }
              ]
            },
            "documentation": null,
            "id": 6251,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "min256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6239,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6236,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6251,
                  "src": "425:9:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6235,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "425:7:59",
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
                  "id": 6238,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6251,
                  "src": "436:9:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6237,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "436:7:59",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "424:22:59"
            },
            "payable": false,
            "returnParameters": {
              "id": 6242,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6241,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6251,
                  "src": "470:7:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6240,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "470:7:59",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "469:9:59"
            },
            "scope": 6252,
            "src": "409:101:59",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 6253,
        "src": "83:429:59"
      }
    ],
    "src": "0:513:59"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/math/Math.sol",
    "exportedSymbols": {
      "Math": [
        6252
      ]
    },
    "id": 6253,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6183,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:59"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title Math\n@dev Assorted math operations",
        "fullyImplemented": true,
        "id": 6252,
        "linearizedBaseContracts": [
          6252
        ],
        "name": "Math",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 6199,
              "nodeType": "Block",
              "src": "166:32:59",
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
                      "id": 6194,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6192,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6185,
                        "src": "179:1:59",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": ">=",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6193,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6187,
                        "src": "184:1:59",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "src": "179:6:59",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6196,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6187,
                      "src": "192:1:59",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "id": 6197,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "179:14:59",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6195,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6185,
                      "src": "188:1:59",
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
                  "functionReturnParameters": 6191,
                  "id": 6198,
                  "nodeType": "Return",
                  "src": "172:21:59"
                }
              ]
            },
            "documentation": null,
            "id": 6200,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "max64",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6188,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6185,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6200,
                  "src": "115:8:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6184,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "115:6:59",
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
                  "id": 6187,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6200,
                  "src": "125:8:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6186,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "125:6:59",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "114:20:59"
            },
            "payable": false,
            "returnParameters": {
              "id": 6191,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6190,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6200,
                  "src": "158:6:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6189,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "158:6:59",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "157:8:59"
            },
            "scope": 6252,
            "src": "100:98:59",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6216,
              "nodeType": "Block",
              "src": "268:31:59",
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
                      "id": 6211,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6209,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6202,
                        "src": "281:1:59",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "<",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6210,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6204,
                        "src": "285:1:59",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "src": "281:5:59",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6213,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6204,
                      "src": "293:1:59",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "id": 6214,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "281:13:59",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6212,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6202,
                      "src": "289:1:59",
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
                  "functionReturnParameters": 6208,
                  "id": 6215,
                  "nodeType": "Return",
                  "src": "274:20:59"
                }
              ]
            },
            "documentation": null,
            "id": 6217,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "min64",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6205,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6202,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6217,
                  "src": "217:8:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6201,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "217:6:59",
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
                  "id": 6204,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6217,
                  "src": "227:8:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6203,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "227:6:59",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "216:20:59"
            },
            "payable": false,
            "returnParameters": {
              "id": 6208,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6207,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6217,
                  "src": "260:6:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6206,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "260:6:59",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "259:8:59"
            },
            "scope": 6252,
            "src": "202:97:59",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6233,
              "nodeType": "Block",
              "src": "373:32:59",
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
                      "id": 6228,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6226,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6219,
                        "src": "386:1:59",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": ">=",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6227,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6221,
                        "src": "391:1:59",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "386:6:59",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6230,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6221,
                      "src": "399:1:59",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 6231,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "386:14:59",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6229,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6219,
                      "src": "395:1:59",
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
                  "functionReturnParameters": 6225,
                  "id": 6232,
                  "nodeType": "Return",
                  "src": "379:21:59"
                }
              ]
            },
            "documentation": null,
            "id": 6234,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "max256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6222,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6219,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6234,
                  "src": "319:9:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6218,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "319:7:59",
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
                  "id": 6221,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6234,
                  "src": "330:9:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6220,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "330:7:59",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "318:22:59"
            },
            "payable": false,
            "returnParameters": {
              "id": 6225,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6224,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6234,
                  "src": "364:7:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6223,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "364:7:59",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "363:9:59"
            },
            "scope": 6252,
            "src": "303:102:59",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6250,
              "nodeType": "Block",
              "src": "479:31:59",
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
                      "id": 6245,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6243,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6236,
                        "src": "492:1:59",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "<",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6244,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6238,
                        "src": "496:1:59",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "492:5:59",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6247,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6238,
                      "src": "504:1:59",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 6248,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "492:13:59",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6246,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6236,
                      "src": "500:1:59",
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
                  "functionReturnParameters": 6242,
                  "id": 6249,
                  "nodeType": "Return",
                  "src": "485:20:59"
                }
              ]
            },
            "documentation": null,
            "id": 6251,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "min256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6239,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6236,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6251,
                  "src": "425:9:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6235,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "425:7:59",
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
                  "id": 6238,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6251,
                  "src": "436:9:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6237,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "436:7:59",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "424:22:59"
            },
            "payable": false,
            "returnParameters": {
              "id": 6242,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6241,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6251,
                  "src": "470:7:59",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6240,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "470:7:59",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "469:9:59"
            },
            "scope": 6252,
            "src": "409:101:59",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 6253,
        "src": "83:429:59"
      }
    ],
    "src": "0:513:59"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-13T21:55:38.440Z"
}