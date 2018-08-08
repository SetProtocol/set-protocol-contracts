export const Math = 
{
  "contractName": "Math",
  "abi": [],
  "bytecode": "0x604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a165627a7a7230582038620f41d45d0709e8ddaa39f69dc0e01ebb91f4cba2cff62e177da8da4049570029",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a165627a7a7230582038620f41d45d0709e8ddaa39f69dc0e01ebb91f4cba2cff62e177da8da4049570029",
  "sourceMap": "83:429:33:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "83:429:33:-;;;;;;;;",
  "source": "pragma solidity ^0.4.23;\n\n\n/**\n * @title Math\n * @dev Assorted math operations\n */\nlibrary Math {\n  function max64(uint64 a, uint64 b) internal pure returns (uint64) {\n    return a >= b ? a : b;\n  }\n\n  function min64(uint64 a, uint64 b) internal pure returns (uint64) {\n    return a < b ? a : b;\n  }\n\n  function max256(uint256 a, uint256 b) internal pure returns (uint256) {\n    return a >= b ? a : b;\n  }\n\n  function min256(uint256 a, uint256 b) internal pure returns (uint256) {\n    return a < b ? a : b;\n  }\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/math/Math.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/math/Math.sol",
    "exportedSymbols": {
      "Math": [
        3799
      ]
    },
    "id": 3800,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3730,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:33"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title Math\n@dev Assorted math operations",
        "fullyImplemented": true,
        "id": 3799,
        "linearizedBaseContracts": [
          3799
        ],
        "name": "Math",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 3746,
              "nodeType": "Block",
              "src": "166:32:33",
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
                      "id": 3741,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 3739,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3732,
                        "src": "179:1:33",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": ">=",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 3740,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3734,
                        "src": "184:1:33",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "src": "179:6:33",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 3743,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3734,
                      "src": "192:1:33",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "id": 3744,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "179:14:33",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 3742,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3732,
                      "src": "188:1:33",
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
                  "functionReturnParameters": 3738,
                  "id": 3745,
                  "nodeType": "Return",
                  "src": "172:21:33"
                }
              ]
            },
            "documentation": null,
            "id": 3747,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "max64",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3735,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3732,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 3747,
                  "src": "115:8:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 3731,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "115:6:33",
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
                  "id": 3734,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3747,
                  "src": "125:8:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 3733,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "125:6:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "114:20:33"
            },
            "payable": false,
            "returnParameters": {
              "id": 3738,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3737,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3747,
                  "src": "158:6:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 3736,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "158:6:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "157:8:33"
            },
            "scope": 3799,
            "src": "100:98:33",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3763,
              "nodeType": "Block",
              "src": "268:31:33",
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
                      "id": 3758,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 3756,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3749,
                        "src": "281:1:33",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "<",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 3757,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3751,
                        "src": "285:1:33",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "src": "281:5:33",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 3760,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3751,
                      "src": "293:1:33",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "id": 3761,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "281:13:33",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 3759,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3749,
                      "src": "289:1:33",
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
                  "functionReturnParameters": 3755,
                  "id": 3762,
                  "nodeType": "Return",
                  "src": "274:20:33"
                }
              ]
            },
            "documentation": null,
            "id": 3764,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "min64",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3752,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3749,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 3764,
                  "src": "217:8:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 3748,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "217:6:33",
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
                  "id": 3751,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3764,
                  "src": "227:8:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 3750,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "227:6:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "216:20:33"
            },
            "payable": false,
            "returnParameters": {
              "id": 3755,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3754,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3764,
                  "src": "260:6:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 3753,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "260:6:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "259:8:33"
            },
            "scope": 3799,
            "src": "202:97:33",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3780,
              "nodeType": "Block",
              "src": "373:32:33",
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
                      "id": 3775,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 3773,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3766,
                        "src": "386:1:33",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": ">=",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 3774,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3768,
                        "src": "391:1:33",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "386:6:33",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 3777,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3768,
                      "src": "399:1:33",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3778,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "386:14:33",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 3776,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3766,
                      "src": "395:1:33",
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
                  "functionReturnParameters": 3772,
                  "id": 3779,
                  "nodeType": "Return",
                  "src": "379:21:33"
                }
              ]
            },
            "documentation": null,
            "id": 3781,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "max256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3769,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3766,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 3781,
                  "src": "319:9:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3765,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "319:7:33",
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
                  "id": 3768,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3781,
                  "src": "330:9:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3767,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "330:7:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "318:22:33"
            },
            "payable": false,
            "returnParameters": {
              "id": 3772,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3771,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3781,
                  "src": "364:7:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3770,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "364:7:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "363:9:33"
            },
            "scope": 3799,
            "src": "303:102:33",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3797,
              "nodeType": "Block",
              "src": "479:31:33",
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
                      "id": 3792,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 3790,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3783,
                        "src": "492:1:33",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "<",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 3791,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3785,
                        "src": "496:1:33",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "492:5:33",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 3794,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3785,
                      "src": "504:1:33",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3795,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "492:13:33",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 3793,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3783,
                      "src": "500:1:33",
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
                  "functionReturnParameters": 3789,
                  "id": 3796,
                  "nodeType": "Return",
                  "src": "485:20:33"
                }
              ]
            },
            "documentation": null,
            "id": 3798,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "min256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3786,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3783,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 3798,
                  "src": "425:9:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3782,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "425:7:33",
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
                  "id": 3785,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3798,
                  "src": "436:9:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3784,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "436:7:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "424:22:33"
            },
            "payable": false,
            "returnParameters": {
              "id": 3789,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3788,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3798,
                  "src": "470:7:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3787,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "470:7:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "469:9:33"
            },
            "scope": 3799,
            "src": "409:101:33",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 3800,
        "src": "83:429:33"
      }
    ],
    "src": "0:513:33"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/math/Math.sol",
    "exportedSymbols": {
      "Math": [
        3799
      ]
    },
    "id": 3800,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3730,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:33"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title Math\n@dev Assorted math operations",
        "fullyImplemented": true,
        "id": 3799,
        "linearizedBaseContracts": [
          3799
        ],
        "name": "Math",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 3746,
              "nodeType": "Block",
              "src": "166:32:33",
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
                      "id": 3741,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 3739,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3732,
                        "src": "179:1:33",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": ">=",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 3740,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3734,
                        "src": "184:1:33",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "src": "179:6:33",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 3743,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3734,
                      "src": "192:1:33",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "id": 3744,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "179:14:33",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 3742,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3732,
                      "src": "188:1:33",
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
                  "functionReturnParameters": 3738,
                  "id": 3745,
                  "nodeType": "Return",
                  "src": "172:21:33"
                }
              ]
            },
            "documentation": null,
            "id": 3747,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "max64",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3735,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3732,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 3747,
                  "src": "115:8:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 3731,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "115:6:33",
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
                  "id": 3734,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3747,
                  "src": "125:8:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 3733,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "125:6:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "114:20:33"
            },
            "payable": false,
            "returnParameters": {
              "id": 3738,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3737,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3747,
                  "src": "158:6:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 3736,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "158:6:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "157:8:33"
            },
            "scope": 3799,
            "src": "100:98:33",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3763,
              "nodeType": "Block",
              "src": "268:31:33",
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
                      "id": 3758,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 3756,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3749,
                        "src": "281:1:33",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "<",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 3757,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3751,
                        "src": "285:1:33",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint64",
                          "typeString": "uint64"
                        }
                      },
                      "src": "281:5:33",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 3760,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3751,
                      "src": "293:1:33",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "id": 3761,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "281:13:33",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 3759,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3749,
                      "src": "289:1:33",
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
                  "functionReturnParameters": 3755,
                  "id": 3762,
                  "nodeType": "Return",
                  "src": "274:20:33"
                }
              ]
            },
            "documentation": null,
            "id": 3764,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "min64",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3752,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3749,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 3764,
                  "src": "217:8:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 3748,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "217:6:33",
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
                  "id": 3751,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3764,
                  "src": "227:8:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 3750,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "227:6:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "216:20:33"
            },
            "payable": false,
            "returnParameters": {
              "id": 3755,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3754,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3764,
                  "src": "260:6:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint64",
                    "typeString": "uint64"
                  },
                  "typeName": {
                    "id": 3753,
                    "name": "uint64",
                    "nodeType": "ElementaryTypeName",
                    "src": "260:6:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "259:8:33"
            },
            "scope": 3799,
            "src": "202:97:33",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3780,
              "nodeType": "Block",
              "src": "373:32:33",
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
                      "id": 3775,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 3773,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3766,
                        "src": "386:1:33",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": ">=",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 3774,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3768,
                        "src": "391:1:33",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "386:6:33",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 3777,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3768,
                      "src": "399:1:33",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3778,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "386:14:33",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 3776,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3766,
                      "src": "395:1:33",
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
                  "functionReturnParameters": 3772,
                  "id": 3779,
                  "nodeType": "Return",
                  "src": "379:21:33"
                }
              ]
            },
            "documentation": null,
            "id": 3781,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "max256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3769,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3766,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 3781,
                  "src": "319:9:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3765,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "319:7:33",
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
                  "id": 3768,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3781,
                  "src": "330:9:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3767,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "330:7:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "318:22:33"
            },
            "payable": false,
            "returnParameters": {
              "id": 3772,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3771,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3781,
                  "src": "364:7:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3770,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "364:7:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "363:9:33"
            },
            "scope": 3799,
            "src": "303:102:33",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3797,
              "nodeType": "Block",
              "src": "479:31:33",
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
                      "id": 3792,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 3790,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3783,
                        "src": "492:1:33",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "<",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 3791,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3785,
                        "src": "496:1:33",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "492:5:33",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "falseExpression": {
                      "argumentTypes": null,
                      "id": 3794,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3785,
                      "src": "504:1:33",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3795,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "Conditional",
                    "src": "492:13:33",
                    "trueExpression": {
                      "argumentTypes": null,
                      "id": 3793,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3783,
                      "src": "500:1:33",
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
                  "functionReturnParameters": 3789,
                  "id": 3796,
                  "nodeType": "Return",
                  "src": "485:20:33"
                }
              ]
            },
            "documentation": null,
            "id": 3798,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "min256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3786,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3783,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 3798,
                  "src": "425:9:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3782,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "425:7:33",
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
                  "id": 3785,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3798,
                  "src": "436:9:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3784,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "436:7:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "424:22:33"
            },
            "payable": false,
            "returnParameters": {
              "id": 3789,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3788,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3798,
                  "src": "470:7:33",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3787,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "470:7:33",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "469:9:33"
            },
            "scope": 3799,
            "src": "409:101:33",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 3800,
        "src": "83:429:33"
      }
    ],
    "src": "0:513:33"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-08T05:31:02.899Z"
}