export const BasicToken = 
{
  "contractName": "BasicToken",
  "abi": [
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
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
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
          "name": "_owner",
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
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b5061027c806100206000396000f3006080604052600436106100565763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166318160ddd811461005b57806370a0823114610082578063a9059cbb146100b0575b600080fd5b34801561006757600080fd5b506100706100f5565b60408051918252519081900360200190f35b34801561008e57600080fd5b5061007073ffffffffffffffffffffffffffffffffffffffff600435166100fb565b3480156100bc57600080fd5b506100e173ffffffffffffffffffffffffffffffffffffffff60043516602435610123565b604080519115158252519081900360200190f35b60015490565b73ffffffffffffffffffffffffffffffffffffffff1660009081526020819052604090205490565b600073ffffffffffffffffffffffffffffffffffffffff8316151561014757600080fd5b3360009081526020819052604090205482111561016357600080fd5b33600090815260208190526040902054610183908363ffffffff61022b16565b336000908152602081905260408082209290925573ffffffffffffffffffffffffffffffffffffffff8516815220546101c2908363ffffffff61023d16565b73ffffffffffffffffffffffffffffffffffffffff8416600081815260208181526040918290209390935580518581529051919233927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a350600192915050565b60008282111561023757fe5b50900390565b8181018281101561024a57fe5b929150505600a165627a7a7230582015763cdc3d867309a9b7df23dd927a0c15ece63c904975d283406357c8ed664a0029",
  "deployedBytecode": "0x6080604052600436106100565763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166318160ddd811461005b57806370a0823114610082578063a9059cbb146100b0575b600080fd5b34801561006757600080fd5b506100706100f5565b60408051918252519081900360200190f35b34801561008e57600080fd5b5061007073ffffffffffffffffffffffffffffffffffffffff600435166100fb565b3480156100bc57600080fd5b506100e173ffffffffffffffffffffffffffffffffffffffff60043516602435610123565b604080519115158252519081900360200190f35b60015490565b73ffffffffffffffffffffffffffffffffffffffff1660009081526020819052604090205490565b600073ffffffffffffffffffffffffffffffffffffffff8316151561014757600080fd5b3360009081526020819052604090205482111561016357600080fd5b33600090815260208190526040902054610183908363ffffffff61022b16565b336000908152602081905260408082209290925573ffffffffffffffffffffffffffffffffffffffff8516815220546101c2908363ffffffff61023d16565b73ffffffffffffffffffffffffffffffffffffffff8416600081815260208181526040918290209390935580518581529051919233927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a350600192915050565b60008282111561023757fe5b50900390565b8181018281101561024a57fe5b929150505600a165627a7a7230582015763cdc3d867309a9b7df23dd927a0c15ece63c904975d283406357c8ed664a0029",
  "sourceMap": "180:1053:62:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;180:1053:62;;;;;;;",
  "deployedSourceMap": "180:1053:62:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;371:83;;8:9:-1;5:2;;;30:1;27;20:12;5:2;371:83:62;;;;;;;;;;;;;;;;;;;;1131:99;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1131:99:62;;;;;;;608:321;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;608:321:62;;;;;;;;;;;;;;;;;;;;;;;;;;;371:83;437:12;;371:83;:::o;1131:99::-;1209:16;;1187:7;1209:16;;;;;;;;;;;;1131:99::o;608:321::-;671:4;691:17;;;;;683:26;;;;;;742:10;733:8;:20;;;;;;;;;;;723:30;;;715:39;;;;;;793:10;784:8;:20;;;;;;;;;;;:32;;809:6;784:32;:24;:32;:::i;:::-;770:10;761:8;:20;;;;;;;;;;;:55;;;;:20;838:13;;;;;;:25;;856:6;838:25;:17;:25;:::i;:::-;822:13;;;:8;:13;;;;;;;;;;;;:41;;;;874:33;;;;;;;822:13;;883:10;;874:33;;;;;;;;;;-1:-1:-1;920:4:62;608:321;;;;:::o;1042:110:60:-;1100:7;1122:6;;;;1115:14;;;;-1:-1:-1;1142:5:60;;;1042:110::o;1214:123::-;1293:5;;;1311:6;;;;1304:14;;;;1214:123;;;;:::o",
  "source": "pragma solidity ^0.4.23;\n\n\nimport \"./ERC20Basic.sol\";\nimport \"../../math/SafeMath.sol\";\n\n\n/**\n * @title Basic token\n * @dev Basic version of StandardToken, with no allowances.\n */\ncontract BasicToken is ERC20Basic {\n  using SafeMath for uint256;\n\n  mapping(address => uint256) balances;\n\n  uint256 totalSupply_;\n\n  /**\n  * @dev total number of tokens in existence\n  */\n  function totalSupply() public view returns (uint256) {\n    return totalSupply_;\n  }\n\n  /**\n  * @dev transfer token for a specified address\n  * @param _to The address to transfer to.\n  * @param _value The amount to be transferred.\n  */\n  function transfer(address _to, uint256 _value) public returns (bool) {\n    require(_to != address(0));\n    require(_value <= balances[msg.sender]);\n\n    balances[msg.sender] = balances[msg.sender].sub(_value);\n    balances[_to] = balances[_to].add(_value);\n    emit Transfer(msg.sender, _to, _value);\n    return true;\n  }\n\n  /**\n  * @dev Gets the balance of the specified address.\n  * @param _owner The address to query the the balance of.\n  * @return An uint256 representing the amount owned by the passed address.\n  */\n  function balanceOf(address _owner) public view returns (uint256) {\n    return balances[_owner];\n  }\n\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/token/ERC20/BasicToken.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/BasicToken.sol",
    "exportedSymbols": {
      "BasicToken": [
        6927
      ]
    },
    "id": 6928,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6833,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:62"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
        "file": "./ERC20Basic.sol",
        "id": 6834,
        "nodeType": "ImportDirective",
        "scope": 6928,
        "sourceUnit": 7037,
        "src": "27:26:62",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "../../math/SafeMath.sol",
        "id": 6835,
        "nodeType": "ImportDirective",
        "scope": 6928,
        "sourceUnit": 6746,
        "src": "54:33:62",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 6836,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 7036,
              "src": "203:10:62",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$7036",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 6837,
            "nodeType": "InheritanceSpecifier",
            "src": "203:10:62"
          }
        ],
        "contractDependencies": [
          7036
        ],
        "contractKind": "contract",
        "documentation": "@title Basic token\n@dev Basic version of StandardToken, with no allowances.",
        "fullyImplemented": true,
        "id": 6927,
        "linearizedBaseContracts": [
          6927,
          7036
        ],
        "name": "BasicToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 6840,
            "libraryName": {
              "contractScope": null,
              "id": 6838,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6745,
              "src": "224:8:62",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6745",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "218:27:62",
            "typeName": {
              "id": 6839,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "237:7:62",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": false,
            "id": 6844,
            "name": "balances",
            "nodeType": "VariableDeclaration",
            "scope": 6927,
            "src": "249:36:62",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
              "typeString": "mapping(address => uint256)"
            },
            "typeName": {
              "id": 6843,
              "keyType": {
                "id": 6841,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "257:7:62",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "nodeType": "Mapping",
              "src": "249:27:62",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                "typeString": "mapping(address => uint256)"
              },
              "valueType": {
                "id": 6842,
                "name": "uint256",
                "nodeType": "ElementaryTypeName",
                "src": "268:7:62",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                }
              }
            },
            "value": null,
            "visibility": "internal"
          },
          {
            "constant": false,
            "id": 6846,
            "name": "totalSupply_",
            "nodeType": "VariableDeclaration",
            "scope": 6927,
            "src": "290:20:62",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 6845,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "290:7:62",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6853,
              "nodeType": "Block",
              "src": "424:30:62",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6851,
                    "name": "totalSupply_",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 6846,
                    "src": "437:12:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 6850,
                  "id": 6852,
                  "nodeType": "Return",
                  "src": "430:19:62"
                }
              ]
            },
            "documentation": "@dev total number of tokens in existence",
            "id": 6854,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6847,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "391:2:62"
            },
            "payable": false,
            "returnParameters": {
              "id": 6850,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6849,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6854,
                  "src": "415:7:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6848,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "415:7:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "414:9:62"
            },
            "scope": 6927,
            "src": "371:83:62",
            "stateMutability": "view",
            "superFunction": 7011,
            "visibility": "public"
          },
          {
            "body": {
              "id": 6913,
              "nodeType": "Block",
              "src": "677:252:62",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 6868,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 6864,
                          "name": "_to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6856,
                          "src": "691:3:62",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 6866,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "706:1:62",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 6865,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "698:7:62",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 6867,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "698:10:62",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "691:17:62",
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
                      "id": 6863,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7301,
                      "src": "683:7:62",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6869,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "683:26:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6870,
                  "nodeType": "ExpressionStatement",
                  "src": "683:26:62"
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
                        "id": 6877,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 6872,
                          "name": "_value",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6858,
                          "src": "723:6:62",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 6873,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6844,
                            "src": "733:8:62",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 6876,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 6874,
                              "name": "msg",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7298,
                              "src": "742:3:62",
                              "typeDescriptions": {
                                "typeIdentifier": "t_magic_message",
                                "typeString": "msg"
                              }
                            },
                            "id": 6875,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "sender",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": null,
                            "src": "742:10:62",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "733:20:62",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "723:30:62",
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
                      "id": 6871,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7301,
                      "src": "715:7:62",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6878,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "715:39:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6879,
                  "nodeType": "ExpressionStatement",
                  "src": "715:39:62"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6891,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 6880,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6844,
                        "src": "761:8:62",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 6883,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 6881,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7298,
                          "src": "770:3:62",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 6882,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "770:10:62",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "761:20:62",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 6889,
                          "name": "_value",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6858,
                          "src": "809:6:62",
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
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 6884,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6844,
                            "src": "784:8:62",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 6887,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 6885,
                              "name": "msg",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7298,
                              "src": "793:3:62",
                              "typeDescriptions": {
                                "typeIdentifier": "t_magic_message",
                                "typeString": "msg"
                              }
                            },
                            "id": 6886,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "sender",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": null,
                            "src": "793:10:62",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "784:20:62",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 6888,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sub",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6720,
                        "src": "784:24:62",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 6890,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "784:32:62",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "761:55:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 6892,
                  "nodeType": "ExpressionStatement",
                  "src": "761:55:62"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6902,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 6893,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6844,
                        "src": "822:8:62",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 6895,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 6894,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6856,
                        "src": "831:3:62",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "822:13:62",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 6900,
                          "name": "_value",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6858,
                          "src": "856:6:62",
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
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 6896,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6844,
                            "src": "838:8:62",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 6898,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 6897,
                            "name": "_to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6856,
                            "src": "847:3:62",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "838:13:62",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 6899,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6744,
                        "src": "838:17:62",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 6901,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "838:25:62",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "822:41:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 6903,
                  "nodeType": "ExpressionStatement",
                  "src": "822:41:62"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 6905,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7298,
                          "src": "883:3:62",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 6906,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "883:10:62",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6907,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6856,
                        "src": "895:3:62",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6908,
                        "name": "_value",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6858,
                        "src": "900:6:62",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 6904,
                      "name": "Transfer",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 7035,
                      "src": "874:8:62",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 6909,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "874:33:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6910,
                  "nodeType": "EmitStatement",
                  "src": "869:38:62"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "hexValue": "74727565",
                    "id": 6911,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "bool",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "920:4:62",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    },
                    "value": "true"
                  },
                  "functionReturnParameters": 6862,
                  "id": 6912,
                  "nodeType": "Return",
                  "src": "913:11:62"
                }
              ]
            },
            "documentation": "@dev transfer token for a specified address\n@param _to The address to transfer to.\n@param _value The amount to be transferred.",
            "id": 6914,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6859,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6856,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6914,
                  "src": "626:11:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6855,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "626:7:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 6858,
                  "name": "_value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6914,
                  "src": "639:14:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6857,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "639:7:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "625:29:62"
            },
            "payable": false,
            "returnParameters": {
              "id": 6862,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6861,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6914,
                  "src": "671:4:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6860,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "671:4:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "670:6:62"
            },
            "scope": 6927,
            "src": "608:321:62",
            "stateMutability": "nonpayable",
            "superFunction": 7027,
            "visibility": "public"
          },
          {
            "body": {
              "id": 6925,
              "nodeType": "Block",
              "src": "1196:34:62",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "id": 6921,
                      "name": "balances",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6844,
                      "src": "1209:8:62",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                        "typeString": "mapping(address => uint256)"
                      }
                    },
                    "id": 6923,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 6922,
                      "name": "_owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6916,
                      "src": "1218:6:62",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "IndexAccess",
                    "src": "1209:16:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 6920,
                  "id": 6924,
                  "nodeType": "Return",
                  "src": "1202:23:62"
                }
              ]
            },
            "documentation": "@dev Gets the balance of the specified address.\n@param _owner The address to query the the balance of.\n@return An uint256 representing the amount owned by the passed address.",
            "id": 6926,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6917,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6916,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6926,
                  "src": "1150:14:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6915,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1150:7:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1149:16:62"
            },
            "payable": false,
            "returnParameters": {
              "id": 6920,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6919,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6926,
                  "src": "1187:7:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6918,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1187:7:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1186:9:62"
            },
            "scope": 6927,
            "src": "1131:99:62",
            "stateMutability": "view",
            "superFunction": 7018,
            "visibility": "public"
          }
        ],
        "scope": 6928,
        "src": "180:1053:62"
      }
    ],
    "src": "0:1234:62"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/BasicToken.sol",
    "exportedSymbols": {
      "BasicToken": [
        6927
      ]
    },
    "id": 6928,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6833,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:62"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
        "file": "./ERC20Basic.sol",
        "id": 6834,
        "nodeType": "ImportDirective",
        "scope": 6928,
        "sourceUnit": 7037,
        "src": "27:26:62",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "../../math/SafeMath.sol",
        "id": 6835,
        "nodeType": "ImportDirective",
        "scope": 6928,
        "sourceUnit": 6746,
        "src": "54:33:62",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 6836,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 7036,
              "src": "203:10:62",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$7036",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 6837,
            "nodeType": "InheritanceSpecifier",
            "src": "203:10:62"
          }
        ],
        "contractDependencies": [
          7036
        ],
        "contractKind": "contract",
        "documentation": "@title Basic token\n@dev Basic version of StandardToken, with no allowances.",
        "fullyImplemented": true,
        "id": 6927,
        "linearizedBaseContracts": [
          6927,
          7036
        ],
        "name": "BasicToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 6840,
            "libraryName": {
              "contractScope": null,
              "id": 6838,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6745,
              "src": "224:8:62",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6745",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "218:27:62",
            "typeName": {
              "id": 6839,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "237:7:62",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": false,
            "id": 6844,
            "name": "balances",
            "nodeType": "VariableDeclaration",
            "scope": 6927,
            "src": "249:36:62",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
              "typeString": "mapping(address => uint256)"
            },
            "typeName": {
              "id": 6843,
              "keyType": {
                "id": 6841,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "257:7:62",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "nodeType": "Mapping",
              "src": "249:27:62",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                "typeString": "mapping(address => uint256)"
              },
              "valueType": {
                "id": 6842,
                "name": "uint256",
                "nodeType": "ElementaryTypeName",
                "src": "268:7:62",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                }
              }
            },
            "value": null,
            "visibility": "internal"
          },
          {
            "constant": false,
            "id": 6846,
            "name": "totalSupply_",
            "nodeType": "VariableDeclaration",
            "scope": 6927,
            "src": "290:20:62",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 6845,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "290:7:62",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6853,
              "nodeType": "Block",
              "src": "424:30:62",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6851,
                    "name": "totalSupply_",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 6846,
                    "src": "437:12:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 6850,
                  "id": 6852,
                  "nodeType": "Return",
                  "src": "430:19:62"
                }
              ]
            },
            "documentation": "@dev total number of tokens in existence",
            "id": 6854,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6847,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "391:2:62"
            },
            "payable": false,
            "returnParameters": {
              "id": 6850,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6849,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6854,
                  "src": "415:7:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6848,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "415:7:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "414:9:62"
            },
            "scope": 6927,
            "src": "371:83:62",
            "stateMutability": "view",
            "superFunction": 7011,
            "visibility": "public"
          },
          {
            "body": {
              "id": 6913,
              "nodeType": "Block",
              "src": "677:252:62",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 6868,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 6864,
                          "name": "_to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6856,
                          "src": "691:3:62",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 6866,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "706:1:62",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 6865,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "698:7:62",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 6867,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "698:10:62",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "691:17:62",
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
                      "id": 6863,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7301,
                      "src": "683:7:62",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6869,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "683:26:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6870,
                  "nodeType": "ExpressionStatement",
                  "src": "683:26:62"
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
                        "id": 6877,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 6872,
                          "name": "_value",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6858,
                          "src": "723:6:62",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 6873,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6844,
                            "src": "733:8:62",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 6876,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 6874,
                              "name": "msg",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7298,
                              "src": "742:3:62",
                              "typeDescriptions": {
                                "typeIdentifier": "t_magic_message",
                                "typeString": "msg"
                              }
                            },
                            "id": 6875,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "sender",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": null,
                            "src": "742:10:62",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "733:20:62",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "723:30:62",
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
                      "id": 6871,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7301,
                      "src": "715:7:62",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6878,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "715:39:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6879,
                  "nodeType": "ExpressionStatement",
                  "src": "715:39:62"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6891,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 6880,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6844,
                        "src": "761:8:62",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 6883,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 6881,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7298,
                          "src": "770:3:62",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 6882,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "770:10:62",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "761:20:62",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 6889,
                          "name": "_value",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6858,
                          "src": "809:6:62",
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
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 6884,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6844,
                            "src": "784:8:62",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 6887,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 6885,
                              "name": "msg",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7298,
                              "src": "793:3:62",
                              "typeDescriptions": {
                                "typeIdentifier": "t_magic_message",
                                "typeString": "msg"
                              }
                            },
                            "id": 6886,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "sender",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": null,
                            "src": "793:10:62",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "784:20:62",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 6888,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sub",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6720,
                        "src": "784:24:62",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 6890,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "784:32:62",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "761:55:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 6892,
                  "nodeType": "ExpressionStatement",
                  "src": "761:55:62"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6902,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 6893,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6844,
                        "src": "822:8:62",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 6895,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 6894,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6856,
                        "src": "831:3:62",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "822:13:62",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 6900,
                          "name": "_value",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6858,
                          "src": "856:6:62",
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
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 6896,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6844,
                            "src": "838:8:62",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 6898,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 6897,
                            "name": "_to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6856,
                            "src": "847:3:62",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "838:13:62",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 6899,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6744,
                        "src": "838:17:62",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 6901,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "838:25:62",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "822:41:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 6903,
                  "nodeType": "ExpressionStatement",
                  "src": "822:41:62"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 6905,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7298,
                          "src": "883:3:62",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 6906,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "883:10:62",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6907,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6856,
                        "src": "895:3:62",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6908,
                        "name": "_value",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6858,
                        "src": "900:6:62",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 6904,
                      "name": "Transfer",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 7035,
                      "src": "874:8:62",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 6909,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "874:33:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6910,
                  "nodeType": "EmitStatement",
                  "src": "869:38:62"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "hexValue": "74727565",
                    "id": 6911,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "bool",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "920:4:62",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    },
                    "value": "true"
                  },
                  "functionReturnParameters": 6862,
                  "id": 6912,
                  "nodeType": "Return",
                  "src": "913:11:62"
                }
              ]
            },
            "documentation": "@dev transfer token for a specified address\n@param _to The address to transfer to.\n@param _value The amount to be transferred.",
            "id": 6914,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6859,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6856,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6914,
                  "src": "626:11:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6855,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "626:7:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 6858,
                  "name": "_value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6914,
                  "src": "639:14:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6857,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "639:7:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "625:29:62"
            },
            "payable": false,
            "returnParameters": {
              "id": 6862,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6861,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6914,
                  "src": "671:4:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6860,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "671:4:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "670:6:62"
            },
            "scope": 6927,
            "src": "608:321:62",
            "stateMutability": "nonpayable",
            "superFunction": 7027,
            "visibility": "public"
          },
          {
            "body": {
              "id": 6925,
              "nodeType": "Block",
              "src": "1196:34:62",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "id": 6921,
                      "name": "balances",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6844,
                      "src": "1209:8:62",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                        "typeString": "mapping(address => uint256)"
                      }
                    },
                    "id": 6923,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 6922,
                      "name": "_owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6916,
                      "src": "1218:6:62",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "IndexAccess",
                    "src": "1209:16:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 6920,
                  "id": 6924,
                  "nodeType": "Return",
                  "src": "1202:23:62"
                }
              ]
            },
            "documentation": "@dev Gets the balance of the specified address.\n@param _owner The address to query the the balance of.\n@return An uint256 representing the amount owned by the passed address.",
            "id": 6926,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6917,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6916,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6926,
                  "src": "1150:14:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6915,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1150:7:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1149:16:62"
            },
            "payable": false,
            "returnParameters": {
              "id": 6920,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6919,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6926,
                  "src": "1187:7:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6918,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1187:7:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1186:9:62"
            },
            "scope": 6927,
            "src": "1131:99:62",
            "stateMutability": "view",
            "superFunction": 7018,
            "visibility": "public"
          }
        ],
        "scope": 6928,
        "src": "180:1053:62"
      }
    ],
    "src": "0:1234:62"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-10T21:21:49.424Z"
}