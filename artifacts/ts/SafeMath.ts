export const SafeMath = 
{
  "contractName": "SafeMath",
  "abi": [],
  "bytecode": "0x604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a165627a7a723058207cb2a90748e76ab87e423c4e8deefa7d9452b5a7abd320b777457d318687e3440029",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a165627a7a723058207cb2a90748e76ab87e423c4e8deefa7d9452b5a7abd320b777457d318687e3440029",
  "sourceMap": "117:1222:34:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "117:1222:34:-;;;;;;;;",
  "source": "pragma solidity ^0.4.23;\n\n\n/**\n * @title SafeMath\n * @dev Math operations with safety checks that throw on error\n */\nlibrary SafeMath {\n\n  /**\n  * @dev Multiplies two numbers, throws on overflow.\n  */\n  function mul(uint256 a, uint256 b) internal pure returns (uint256 c) {\n    // Gas optimization: this is cheaper than asserting 'a' not being zero, but the\n    // benefit is lost if 'b' is also tested.\n    // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522\n    if (a == 0) {\n      return 0;\n    }\n\n    c = a * b;\n    assert(c / a == b);\n    return c;\n  }\n\n  /**\n  * @dev Integer division of two numbers, truncating the quotient.\n  */\n  function div(uint256 a, uint256 b) internal pure returns (uint256) {\n    // assert(b > 0); // Solidity automatically throws when dividing by 0\n    // uint256 c = a / b;\n    // assert(a == b * c + a % b); // There is no case in which this doesn't hold\n    return a / b;\n  }\n\n  /**\n  * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).\n  */\n  function sub(uint256 a, uint256 b) internal pure returns (uint256) {\n    assert(b <= a);\n    return a - b;\n  }\n\n  /**\n  * @dev Adds two numbers, throws on overflow.\n  */\n  function add(uint256 a, uint256 b) internal pure returns (uint256 c) {\n    c = a + b;\n    assert(c >= a);\n    return c;\n  }\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
    "exportedSymbols": {
      "SafeMath": [
        3893
      ]
    },
    "id": 3894,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3801,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:34"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title SafeMath\n@dev Math operations with safety checks that throw on error",
        "fullyImplemented": true,
        "id": 3893,
        "linearizedBaseContracts": [
          3893
        ],
        "name": "SafeMath",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 3833,
              "nodeType": "Block",
              "src": "272:304:34",
              "statements": [
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3812,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3810,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3803,
                      "src": "487:1:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 3811,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "492:1:34",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "src": "487:6:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": null,
                  "id": 3816,
                  "nodeType": "IfStatement",
                  "src": "483:35:34",
                  "trueBody": {
                    "id": 3815,
                    "nodeType": "Block",
                    "src": "495:23:34",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 3813,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "510:1:34",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "functionReturnParameters": 3809,
                        "id": 3814,
                        "nodeType": "Return",
                        "src": "503:8:34"
                      }
                    ]
                  }
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3821,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 3817,
                      "name": "c",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3808,
                      "src": "524:1:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "commonType": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "id": 3820,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 3818,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3803,
                        "src": "528:1:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "*",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 3819,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3805,
                        "src": "532:1:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "528:5:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "524:9:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 3822,
                  "nodeType": "ExpressionStatement",
                  "src": "524:9:34"
                },
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
                        "id": 3828,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 3826,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3824,
                            "name": "c",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3808,
                            "src": "546:1:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "/",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 3825,
                            "name": "a",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3803,
                            "src": "550:1:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "546:5:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 3827,
                          "name": "b",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3805,
                          "src": "555:1:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "546:10:34",
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
                      "id": 3823,
                      "name": "assert",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3983,
                      "src": "539:6:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_assert_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 3829,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "539:18:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3830,
                  "nodeType": "ExpressionStatement",
                  "src": "539:18:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3831,
                    "name": "c",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3808,
                    "src": "570:1:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3809,
                  "id": 3832,
                  "nodeType": "Return",
                  "src": "563:8:34"
                }
              ]
            },
            "documentation": "@dev Multiplies two numbers, throws on overflow.",
            "id": 3834,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "mul",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3806,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3803,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 3834,
                  "src": "216:9:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3802,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "216:7:34",
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
                  "id": 3805,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3834,
                  "src": "227:9:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3804,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "227:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "215:22:34"
            },
            "payable": false,
            "returnParameters": {
              "id": 3809,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3808,
                  "name": "c",
                  "nodeType": "VariableDeclaration",
                  "scope": 3834,
                  "src": "261:9:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3807,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "261:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "260:11:34"
            },
            "scope": 3893,
            "src": "203:373:34",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3847,
              "nodeType": "Block",
              "src": "725:205:34",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3845,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3843,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3836,
                      "src": "920:1:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "/",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 3844,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3838,
                      "src": "924:1:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "920:5:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3842,
                  "id": 3846,
                  "nodeType": "Return",
                  "src": "913:12:34"
                }
              ]
            },
            "documentation": "@dev Integer division of two numbers, truncating the quotient.",
            "id": 3848,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "div",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3839,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3836,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 3848,
                  "src": "671:9:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3835,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "671:7:34",
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
                  "id": 3838,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3848,
                  "src": "682:9:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3837,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "682:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "670:22:34"
            },
            "payable": false,
            "returnParameters": {
              "id": 3842,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3841,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3848,
                  "src": "716:7:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3840,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "716:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "715:9:34"
            },
            "scope": 3893,
            "src": "658:272:34",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3867,
              "nodeType": "Block",
              "src": "1109:43:34",
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
                        "id": 3860,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 3858,
                          "name": "b",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3852,
                          "src": "1122:1:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 3859,
                          "name": "a",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3850,
                          "src": "1127:1:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "1122:6:34",
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
                      "id": 3857,
                      "name": "assert",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3983,
                      "src": "1115:6:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_assert_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 3861,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1115:14:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3862,
                  "nodeType": "ExpressionStatement",
                  "src": "1115:14:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3865,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3863,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3850,
                      "src": "1142:1:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "-",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 3864,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3852,
                      "src": "1146:1:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "1142:5:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3856,
                  "id": 3866,
                  "nodeType": "Return",
                  "src": "1135:12:34"
                }
              ]
            },
            "documentation": "@dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).",
            "id": 3868,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "sub",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3853,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3850,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 3868,
                  "src": "1055:9:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3849,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1055:7:34",
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
                  "id": 3852,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3868,
                  "src": "1066:9:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3851,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1066:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1054:22:34"
            },
            "payable": false,
            "returnParameters": {
              "id": 3856,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3855,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3868,
                  "src": "1100:7:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3854,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1100:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1099:9:34"
            },
            "scope": 3893,
            "src": "1042:110:34",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3891,
              "nodeType": "Block",
              "src": "1283:54:34",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3881,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 3877,
                      "name": "c",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3875,
                      "src": "1289:1:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "commonType": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "id": 3880,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 3878,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3870,
                        "src": "1293:1:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "+",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 3879,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3872,
                        "src": "1297:1:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "1293:5:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "1289:9:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 3882,
                  "nodeType": "ExpressionStatement",
                  "src": "1289:9:34"
                },
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
                        "id": 3886,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 3884,
                          "name": "c",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3875,
                          "src": "1311:1:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 3885,
                          "name": "a",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3870,
                          "src": "1316:1:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "1311:6:34",
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
                      "id": 3883,
                      "name": "assert",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3983,
                      "src": "1304:6:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_assert_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 3887,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1304:14:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3888,
                  "nodeType": "ExpressionStatement",
                  "src": "1304:14:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3889,
                    "name": "c",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3875,
                    "src": "1331:1:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3876,
                  "id": 3890,
                  "nodeType": "Return",
                  "src": "1324:8:34"
                }
              ]
            },
            "documentation": "@dev Adds two numbers, throws on overflow.",
            "id": 3892,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "add",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3873,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3870,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 3892,
                  "src": "1227:9:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3869,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1227:7:34",
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
                  "id": 3872,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3892,
                  "src": "1238:9:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3871,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1238:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1226:22:34"
            },
            "payable": false,
            "returnParameters": {
              "id": 3876,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3875,
                  "name": "c",
                  "nodeType": "VariableDeclaration",
                  "scope": 3892,
                  "src": "1272:9:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3874,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1272:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1271:11:34"
            },
            "scope": 3893,
            "src": "1214:123:34",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 3894,
        "src": "117:1222:34"
      }
    ],
    "src": "0:1340:34"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
    "exportedSymbols": {
      "SafeMath": [
        3893
      ]
    },
    "id": 3894,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3801,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:34"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title SafeMath\n@dev Math operations with safety checks that throw on error",
        "fullyImplemented": true,
        "id": 3893,
        "linearizedBaseContracts": [
          3893
        ],
        "name": "SafeMath",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 3833,
              "nodeType": "Block",
              "src": "272:304:34",
              "statements": [
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3812,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3810,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3803,
                      "src": "487:1:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 3811,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "492:1:34",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "src": "487:6:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": null,
                  "id": 3816,
                  "nodeType": "IfStatement",
                  "src": "483:35:34",
                  "trueBody": {
                    "id": 3815,
                    "nodeType": "Block",
                    "src": "495:23:34",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 3813,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "510:1:34",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "functionReturnParameters": 3809,
                        "id": 3814,
                        "nodeType": "Return",
                        "src": "503:8:34"
                      }
                    ]
                  }
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3821,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 3817,
                      "name": "c",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3808,
                      "src": "524:1:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "commonType": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "id": 3820,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 3818,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3803,
                        "src": "528:1:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "*",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 3819,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3805,
                        "src": "532:1:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "528:5:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "524:9:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 3822,
                  "nodeType": "ExpressionStatement",
                  "src": "524:9:34"
                },
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
                        "id": 3828,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 3826,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3824,
                            "name": "c",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3808,
                            "src": "546:1:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "/",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 3825,
                            "name": "a",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3803,
                            "src": "550:1:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "546:5:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 3827,
                          "name": "b",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3805,
                          "src": "555:1:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "546:10:34",
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
                      "id": 3823,
                      "name": "assert",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3983,
                      "src": "539:6:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_assert_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 3829,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "539:18:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3830,
                  "nodeType": "ExpressionStatement",
                  "src": "539:18:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3831,
                    "name": "c",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3808,
                    "src": "570:1:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3809,
                  "id": 3832,
                  "nodeType": "Return",
                  "src": "563:8:34"
                }
              ]
            },
            "documentation": "@dev Multiplies two numbers, throws on overflow.",
            "id": 3834,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "mul",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3806,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3803,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 3834,
                  "src": "216:9:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3802,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "216:7:34",
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
                  "id": 3805,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3834,
                  "src": "227:9:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3804,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "227:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "215:22:34"
            },
            "payable": false,
            "returnParameters": {
              "id": 3809,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3808,
                  "name": "c",
                  "nodeType": "VariableDeclaration",
                  "scope": 3834,
                  "src": "261:9:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3807,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "261:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "260:11:34"
            },
            "scope": 3893,
            "src": "203:373:34",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3847,
              "nodeType": "Block",
              "src": "725:205:34",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3845,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3843,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3836,
                      "src": "920:1:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "/",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 3844,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3838,
                      "src": "924:1:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "920:5:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3842,
                  "id": 3846,
                  "nodeType": "Return",
                  "src": "913:12:34"
                }
              ]
            },
            "documentation": "@dev Integer division of two numbers, truncating the quotient.",
            "id": 3848,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "div",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3839,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3836,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 3848,
                  "src": "671:9:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3835,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "671:7:34",
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
                  "id": 3838,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3848,
                  "src": "682:9:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3837,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "682:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "670:22:34"
            },
            "payable": false,
            "returnParameters": {
              "id": 3842,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3841,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3848,
                  "src": "716:7:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3840,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "716:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "715:9:34"
            },
            "scope": 3893,
            "src": "658:272:34",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3867,
              "nodeType": "Block",
              "src": "1109:43:34",
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
                        "id": 3860,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 3858,
                          "name": "b",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3852,
                          "src": "1122:1:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 3859,
                          "name": "a",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3850,
                          "src": "1127:1:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "1122:6:34",
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
                      "id": 3857,
                      "name": "assert",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3983,
                      "src": "1115:6:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_assert_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 3861,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1115:14:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3862,
                  "nodeType": "ExpressionStatement",
                  "src": "1115:14:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3865,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3863,
                      "name": "a",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3850,
                      "src": "1142:1:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "-",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 3864,
                      "name": "b",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3852,
                      "src": "1146:1:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "1142:5:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3856,
                  "id": 3866,
                  "nodeType": "Return",
                  "src": "1135:12:34"
                }
              ]
            },
            "documentation": "@dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).",
            "id": 3868,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "sub",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3853,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3850,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 3868,
                  "src": "1055:9:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3849,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1055:7:34",
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
                  "id": 3852,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3868,
                  "src": "1066:9:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3851,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1066:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1054:22:34"
            },
            "payable": false,
            "returnParameters": {
              "id": 3856,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3855,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3868,
                  "src": "1100:7:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3854,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1100:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1099:9:34"
            },
            "scope": 3893,
            "src": "1042:110:34",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3891,
              "nodeType": "Block",
              "src": "1283:54:34",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3881,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 3877,
                      "name": "c",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3875,
                      "src": "1289:1:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "commonType": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "id": 3880,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "id": 3878,
                        "name": "a",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3870,
                        "src": "1293:1:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "+",
                      "rightExpression": {
                        "argumentTypes": null,
                        "id": 3879,
                        "name": "b",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3872,
                        "src": "1297:1:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "src": "1293:5:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "1289:9:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 3882,
                  "nodeType": "ExpressionStatement",
                  "src": "1289:9:34"
                },
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
                        "id": 3886,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 3884,
                          "name": "c",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3875,
                          "src": "1311:1:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 3885,
                          "name": "a",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3870,
                          "src": "1316:1:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "1311:6:34",
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
                      "id": 3883,
                      "name": "assert",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3983,
                      "src": "1304:6:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_assert_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 3887,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1304:14:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3888,
                  "nodeType": "ExpressionStatement",
                  "src": "1304:14:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3889,
                    "name": "c",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3875,
                    "src": "1331:1:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3876,
                  "id": 3890,
                  "nodeType": "Return",
                  "src": "1324:8:34"
                }
              ]
            },
            "documentation": "@dev Adds two numbers, throws on overflow.",
            "id": 3892,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "add",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3873,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3870,
                  "name": "a",
                  "nodeType": "VariableDeclaration",
                  "scope": 3892,
                  "src": "1227:9:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3869,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1227:7:34",
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
                  "id": 3872,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3892,
                  "src": "1238:9:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3871,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1238:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1226:22:34"
            },
            "payable": false,
            "returnParameters": {
              "id": 3876,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3875,
                  "name": "c",
                  "nodeType": "VariableDeclaration",
                  "scope": 3892,
                  "src": "1272:9:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3874,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1272:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1271:11:34"
            },
            "scope": 3893,
            "src": "1214:123:34",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 3894,
        "src": "117:1222:34"
      }
    ],
    "src": "0:1340:34"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-08T05:31:02.900Z"
}