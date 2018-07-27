export const Math = 
{
  "contractName": "Math",
  "abi": [],
  "bytecode": "0x604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a165627a7a7230582038620f41d45d0709e8ddaa39f69dc0e01ebb91f4cba2cff62e177da8da4049570029",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a165627a7a7230582038620f41d45d0709e8ddaa39f69dc0e01ebb91f4cba2cff62e177da8da4049570029",
  "sourceMap": "83:429:60:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "83:429:60:-;;;;;;;;",
  "source": "pragma solidity ^0.4.23;\n\n\n/**\n * @title Math\n * @dev Assorted math operations\n */\nlibrary Math {\n  function max64(uint64 a, uint64 b) internal pure returns (uint64) {\n    return a >= b ? a : b;\n  }\n\n  function min64(uint64 a, uint64 b) internal pure returns (uint64) {\n    return a < b ? a : b;\n  }\n\n  function max256(uint256 a, uint256 b) internal pure returns (uint256) {\n    return a >= b ? a : b;\n  }\n\n  function min256(uint256 a, uint256 b) internal pure returns (uint256) {\n    return a < b ? a : b;\n  }\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/math/Math.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/math/Math.sol",
    "exportedSymbols": {
      "Math": [
        6608
      ]
    },
    "id": 6609,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6539,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:60"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title Math\n@dev Assorted math operations",
        "fullyImplemented": true,
        "id": 6608,
        "linearizedBaseContracts": [
          6608
        ],
        "name": "Math",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 6555,
              "nodeType": "Block",
              "src": "166:32:60",
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
                      "id": 6550,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6548,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6541,
                        "src": "179:1:60",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": ">=",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6549,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6543,
                        "src": "184:1:60",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "src": "179:6:60",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6552,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6543,
                      "src": "192:1:60",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "id": 6553,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "179:14:60",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6551,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6541,
                      "src": "188:1:60",
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
                  "functionReturnParameters": 6547,
                  "id": 6554,
                  "nodeType": "Return",
                  "src": "172:21:60"
                }
              ]
            },
            "documentation": null,
            "id": 6556,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "max64",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6544,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6541,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6556,
                  "src": "115:8:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6540,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "115:6:60",
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
                  "id": 6543,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6556,
                  "src": "125:8:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6542,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "125:6:60",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "114:20:60"
            },
            "payable": false,
            "returnParameters": {
              "id": 6547,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6546,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6556,
                  "src": "158:6:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6545,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "158:6:60",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "157:8:60"
            },
            "scope": 6608,
            "src": "100:98:60",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6572,
              "nodeType": "Block",
              "src": "268:31:60",
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
                      "id": 6567,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6565,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6558,
                        "src": "281:1:60",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "<",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6566,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6560,
                        "src": "285:1:60",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "src": "281:5:60",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6569,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6560,
                      "src": "293:1:60",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "id": 6570,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "281:13:60",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6568,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6558,
                      "src": "289:1:60",
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
                  "functionReturnParameters": 6564,
                  "id": 6571,
                  "nodeType": "Return",
                  "src": "274:20:60"
                }
              ]
            },
            "documentation": null,
            "id": 6573,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "min64",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6561,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6558,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6573,
                  "src": "217:8:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6557,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "217:6:60",
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
                  "id": 6560,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6573,
                  "src": "227:8:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6559,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "227:6:60",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "216:20:60"
            },
            "payable": false,
            "returnParameters": {
              "id": 6564,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6563,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6573,
                  "src": "260:6:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6562,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "260:6:60",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "259:8:60"
            },
            "scope": 6608,
            "src": "202:97:60",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6589,
              "nodeType": "Block",
              "src": "373:32:60",
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
                      "id": 6584,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6582,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6575,
                        "src": "386:1:60",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": ">=",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6583,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6577,
                        "src": "391:1:60",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "386:6:60",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6586,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6577,
                      "src": "399:1:60",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 6587,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "386:14:60",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6585,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6575,
                      "src": "395:1:60",
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
                  "functionReturnParameters": 6581,
                  "id": 6588,
                  "nodeType": "Return",
                  "src": "379:21:60"
                }
              ]
            },
            "documentation": null,
            "id": 6590,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "max256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6578,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6575,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6590,
                  "src": "319:9:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6574,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "319:7:60",
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
                  "id": 6577,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6590,
                  "src": "330:9:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6576,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "330:7:60",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "318:22:60"
            },
            "payable": false,
            "returnParameters": {
              "id": 6581,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6580,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6590,
                  "src": "364:7:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6579,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "364:7:60",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "363:9:60"
            },
            "scope": 6608,
            "src": "303:102:60",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6606,
              "nodeType": "Block",
              "src": "479:31:60",
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
                      "id": 6601,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6599,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6592,
                        "src": "492:1:60",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "<",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6600,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6594,
                        "src": "496:1:60",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "492:5:60",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6603,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6594,
                      "src": "504:1:60",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 6604,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "492:13:60",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6602,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6592,
                      "src": "500:1:60",
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
                  "functionReturnParameters": 6598,
                  "id": 6605,
                  "nodeType": "Return",
                  "src": "485:20:60"
                }
              ]
            },
            "documentation": null,
            "id": 6607,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "min256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6595,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6592,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6607,
                  "src": "425:9:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6591,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "425:7:60",
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
                  "id": 6594,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6607,
                  "src": "436:9:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6593,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "436:7:60",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "424:22:60"
            },
            "payable": false,
            "returnParameters": {
              "id": 6598,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6597,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6607,
                  "src": "470:7:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6596,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "470:7:60",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "469:9:60"
            },
            "scope": 6608,
            "src": "409:101:60",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 6609,
        "src": "83:429:60"
      }
    ],
    "src": "0:513:60"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/math/Math.sol",
    "exportedSymbols": {
      "Math": [
        6608
      ]
    },
    "id": 6609,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6539,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:60"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title Math\n@dev Assorted math operations",
        "fullyImplemented": true,
        "id": 6608,
        "linearizedBaseContracts": [
          6608
        ],
        "name": "Math",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 6555,
              "nodeType": "Block",
              "src": "166:32:60",
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
                      "id": 6550,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6548,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6541,
                        "src": "179:1:60",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": ">=",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6549,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6543,
                        "src": "184:1:60",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "src": "179:6:60",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6552,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6543,
                      "src": "192:1:60",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "id": 6553,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "179:14:60",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6551,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6541,
                      "src": "188:1:60",
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
                  "functionReturnParameters": 6547,
                  "id": 6554,
                  "nodeType": "Return",
                  "src": "172:21:60"
                }
              ]
            },
            "documentation": null,
            "id": 6556,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "max64",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6544,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6541,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6556,
                  "src": "115:8:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6540,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "115:6:60",
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
                  "id": 6543,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6556,
                  "src": "125:8:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6542,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "125:6:60",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "114:20:60"
            },
            "payable": false,
            "returnParameters": {
              "id": 6547,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6546,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6556,
                  "src": "158:6:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6545,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "158:6:60",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "157:8:60"
            },
            "scope": 6608,
            "src": "100:98:60",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6572,
              "nodeType": "Block",
              "src": "268:31:60",
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
                      "id": 6567,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6565,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6558,
                        "src": "281:1:60",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "<",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6566,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6560,
                        "src": "285:1:60",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "src": "281:5:60",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6569,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6560,
                      "src": "293:1:60",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "id": 6570,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "281:13:60",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6568,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6558,
                      "src": "289:1:60",
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
                  "functionReturnParameters": 6564,
                  "id": 6571,
                  "nodeType": "Return",
                  "src": "274:20:60"
                }
              ]
            },
            "documentation": null,
            "id": 6573,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "min64",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6561,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6558,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6573,
                  "src": "217:8:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6557,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "217:6:60",
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
                  "id": 6560,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6573,
                  "src": "227:8:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6559,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "227:6:60",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "216:20:60"
            },
            "payable": false,
            "returnParameters": {
              "id": 6564,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6563,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6573,
                  "src": "260:6:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 6562,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "260:6:60",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "259:8:60"
            },
            "scope": 6608,
            "src": "202:97:60",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6589,
              "nodeType": "Block",
              "src": "373:32:60",
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
                      "id": 6584,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6582,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6575,
                        "src": "386:1:60",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": ">=",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6583,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6577,
                        "src": "391:1:60",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "386:6:60",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6586,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6577,
                      "src": "399:1:60",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 6587,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "386:14:60",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6585,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6575,
                      "src": "395:1:60",
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
                  "functionReturnParameters": 6581,
                  "id": 6588,
                  "nodeType": "Return",
                  "src": "379:21:60"
                }
              ]
            },
            "documentation": null,
            "id": 6590,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "max256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6578,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6575,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6590,
                  "src": "319:9:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6574,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "319:7:60",
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
                  "id": 6577,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6590,
                  "src": "330:9:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6576,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "330:7:60",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "318:22:60"
            },
            "payable": false,
            "returnParameters": {
              "id": 6581,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6580,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6590,
                  "src": "364:7:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6579,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "364:7:60",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "363:9:60"
            },
            "scope": 6608,
            "src": "303:102:60",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6606,
              "nodeType": "Block",
              "src": "479:31:60",
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
                      "id": 6601,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 6599,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6592,
                        "src": "492:1:60",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "<",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 6600,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6594,
                        "src": "496:1:60",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "492:5:60",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 6603,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6594,
                      "src": "504:1:60",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 6604,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "492:13:60",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 6602,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6592,
                      "src": "500:1:60",
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
                  "functionReturnParameters": 6598,
                  "id": 6605,
                  "nodeType": "Return",
                  "src": "485:20:60"
                }
              ]
            },
            "documentation": null,
            "id": 6607,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "min256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6595,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6592,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 6607,
                  "src": "425:9:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6591,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "425:7:60",
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
                  "id": 6594,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 6607,
                  "src": "436:9:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6593,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "436:7:60",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "424:22:60"
            },
            "payable": false,
            "returnParameters": {
              "id": 6598,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6597,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6607,
                  "src": "470:7:60",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6596,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "470:7:60",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "469:9:60"
            },
            "scope": 6608,
            "src": "409:101:60",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 6609,
        "src": "83:429:60"
      }
    ],
    "src": "0:513:60"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-27T04:20:39.850Z"
}