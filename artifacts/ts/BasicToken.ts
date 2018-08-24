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
  "bytecode": "0x608060405234801561001057600080fd5b5061027c806100206000396000f3006080604052600436106100565763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166318160ddd811461005b57806370a0823114610082578063a9059cbb146100b0575b600080fd5b34801561006757600080fd5b506100706100f5565b60408051918252519081900360200190f35b34801561008e57600080fd5b5061007073ffffffffffffffffffffffffffffffffffffffff600435166100fb565b3480156100bc57600080fd5b506100e173ffffffffffffffffffffffffffffffffffffffff60043516602435610123565b604080519115158252519081900360200190f35b60015490565b73ffffffffffffffffffffffffffffffffffffffff1660009081526020819052604090205490565b600073ffffffffffffffffffffffffffffffffffffffff8316151561014757600080fd5b3360009081526020819052604090205482111561016357600080fd5b33600090815260208190526040902054610183908363ffffffff61022b16565b336000908152602081905260408082209290925573ffffffffffffffffffffffffffffffffffffffff8516815220546101c2908363ffffffff61023d16565b73ffffffffffffffffffffffffffffffffffffffff8416600081815260208181526040918290209390935580518581529051919233927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a350600192915050565b60008282111561023757fe5b50900390565b8181018281101561024a57fe5b929150505600a165627a7a72305820f304e8b8e6385d39c3f224f2efe8a0e6be62ad870f090a6b4ac68a65cf7af50e0029",
  "deployedBytecode": "0x6080604052600436106100565763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166318160ddd811461005b57806370a0823114610082578063a9059cbb146100b0575b600080fd5b34801561006757600080fd5b506100706100f5565b60408051918252519081900360200190f35b34801561008e57600080fd5b5061007073ffffffffffffffffffffffffffffffffffffffff600435166100fb565b3480156100bc57600080fd5b506100e173ffffffffffffffffffffffffffffffffffffffff60043516602435610123565b604080519115158252519081900360200190f35b60015490565b73ffffffffffffffffffffffffffffffffffffffff1660009081526020819052604090205490565b600073ffffffffffffffffffffffffffffffffffffffff8316151561014757600080fd5b3360009081526020819052604090205482111561016357600080fd5b33600090815260208190526040902054610183908363ffffffff61022b16565b336000908152602081905260408082209290925573ffffffffffffffffffffffffffffffffffffffff8516815220546101c2908363ffffffff61023d16565b73ffffffffffffffffffffffffffffffffffffffff8416600081815260208181526040918290209390935580518581529051919233927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a350600192915050565b60008282111561023757fe5b50900390565b8181018281101561024a57fe5b929150505600a165627a7a72305820f304e8b8e6385d39c3f224f2efe8a0e6be62ad870f090a6b4ac68a65cf7af50e0029",
  "sourceMap": "180:1053:44:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;180:1053:44;;;;;;;",
  "deployedSourceMap": "180:1053:44:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;371:83;;8:9:-1;5:2;;;30:1;27;20:12;5:2;371:83:44;;;;;;;;;;;;;;;;;;;;1131:99;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1131:99:44;;;;;;;608:321;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;608:321:44;;;;;;;;;;;;;;;;;;;;;;;;;;;371:83;437:12;;371:83;:::o;1131:99::-;1209:16;;1187:7;1209:16;;;;;;;;;;;;1131:99::o;608:321::-;671:4;691:17;;;;;683:26;;;;;;742:10;733:8;:20;;;;;;;;;;;723:30;;;715:39;;;;;;793:10;784:8;:20;;;;;;;;;;;:32;;809:6;784:32;:24;:32;:::i;:::-;770:10;761:8;:20;;;;;;;;;;;:55;;;;:20;838:13;;;;;;:25;;856:6;838:25;:17;:25;:::i;:::-;822:13;;;:8;:13;;;;;;;;;;;;:41;;;;874:33;;;;;;;822:13;;883:10;;874:33;;;;;;;;;;-1:-1:-1;920:4:44;608:321;;;;:::o;1042:110:42:-;1100:7;1122:6;;;;1115:14;;;;-1:-1:-1;1142:5:42;;;1042:110::o;1214:123::-;1293:5;;;1311:6;;;;1304:14;;;;1214:123;;;;:::o",
  "source": "pragma solidity ^0.4.24;\n\n\nimport \"./ERC20Basic.sol\";\nimport \"../../math/SafeMath.sol\";\n\n\n/**\n * @title Basic token\n * @dev Basic version of StandardToken, with no allowances.\n */\ncontract BasicToken is ERC20Basic {\n  using SafeMath for uint256;\n\n  mapping(address => uint256) balances;\n\n  uint256 totalSupply_;\n\n  /**\n  * @dev Total number of tokens in existence\n  */\n  function totalSupply() public view returns (uint256) {\n    return totalSupply_;\n  }\n\n  /**\n  * @dev Transfer token for a specified address\n  * @param _to The address to transfer to.\n  * @param _value The amount to be transferred.\n  */\n  function transfer(address _to, uint256 _value) public returns (bool) {\n    require(_to != address(0));\n    require(_value <= balances[msg.sender]);\n\n    balances[msg.sender] = balances[msg.sender].sub(_value);\n    balances[_to] = balances[_to].add(_value);\n    emit Transfer(msg.sender, _to, _value);\n    return true;\n  }\n\n  /**\n  * @dev Gets the balance of the specified address.\n  * @param _owner The address to query the the balance of.\n  * @return An uint256 representing the amount owned by the passed address.\n  */\n  function balanceOf(address _owner) public view returns (uint256) {\n    return balances[_owner];\n  }\n\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/token/ERC20/BasicToken.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/BasicToken.sol",
    "exportedSymbols": {
      "BasicToken": [
        6645
      ]
    },
    "id": 6646,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6551,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:44"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
        "file": "./ERC20Basic.sol",
        "id": 6552,
        "nodeType": "ImportDirective",
        "scope": 6646,
        "sourceUnit": 6755,
        "src": "27:26:44",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "../../math/SafeMath.sol",
        "id": 6553,
        "nodeType": "ImportDirective",
        "scope": 6646,
        "sourceUnit": 6464,
        "src": "54:33:44",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 6554,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6754,
              "src": "203:10:44",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$6754",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 6555,
            "nodeType": "InheritanceSpecifier",
            "src": "203:10:44"
          }
        ],
        "contractDependencies": [
          6754
        ],
        "contractKind": "contract",
        "documentation": "@title Basic token\n@dev Basic version of StandardToken, with no allowances.",
        "fullyImplemented": true,
        "id": 6645,
        "linearizedBaseContracts": [
          6645,
          6754
        ],
        "name": "BasicToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 6558,
            "libraryName": {
              "contractScope": null,
              "id": 6556,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6463,
              "src": "224:8:44",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6463",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "218:27:44",
            "typeName": {
              "id": 6557,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "237:7:44",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": false,
            "id": 6562,
            "name": "balances",
            "nodeType": "VariableDeclaration",
            "scope": 6645,
            "src": "249:36:44",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
              "typeString": "mapping(address => uint256)"
            },
            "typeName": {
              "id": 6561,
              "keyType": {
                "id": 6559,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "257:7:44",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "nodeType": "Mapping",
              "src": "249:27:44",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                "typeString": "mapping(address => uint256)"
              },
              "valueType": {
                "id": 6560,
                "name": "uint256",
                "nodeType": "ElementaryTypeName",
                "src": "268:7:44",
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
            "id": 6564,
            "name": "totalSupply_",
            "nodeType": "VariableDeclaration",
            "scope": 6645,
            "src": "290:20:44",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 6563,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "290:7:44",
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
              "id": 6571,
              "nodeType": "Block",
              "src": "424:30:44",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6569,
                    "name": "totalSupply_",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 6564,
                    "src": "437:12:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 6568,
                  "id": 6570,
                  "nodeType": "Return",
                  "src": "430:19:44"
                }
              ]
            },
            "documentation": "@dev Total number of tokens in existence",
            "id": 6572,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6565,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "391:2:44"
            },
            "payable": false,
            "returnParameters": {
              "id": 6568,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6567,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6572,
                  "src": "415:7:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6566,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "415:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "414:9:44"
            },
            "scope": 6645,
            "src": "371:83:44",
            "stateMutability": "view",
            "superFunction": 6729,
            "visibility": "public"
          },
          {
            "body": {
              "id": 6631,
              "nodeType": "Block",
              "src": "677:252:44",
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
                        "id": 6586,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 6582,
                          "name": "_to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6574,
                          "src": "691:3:44",
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
                              "id": 6584,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "706:1:44",
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
                            "id": 6583,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "698:7:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 6585,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "698:10:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "691:17:44",
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
                      "id": 6581,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "683:7:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6587,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "683:26:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6588,
                  "nodeType": "ExpressionStatement",
                  "src": "683:26:44"
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
                        "id": 6595,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 6590,
                          "name": "_value",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6576,
                          "src": "723:6:44",
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
                            "id": 6591,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6562,
                            "src": "733:8:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 6594,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 6592,
                              "name": "msg",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7016,
                              "src": "742:3:44",
                              "typeDescriptions": {
                                "typeIdentifier": "t_magic_message",
                                "typeString": "msg"
                              }
                            },
                            "id": 6593,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "sender",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": null,
                            "src": "742:10:44",
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
                          "src": "733:20:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "723:30:44",
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
                      "id": 6589,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "715:7:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6596,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "715:39:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6597,
                  "nodeType": "ExpressionStatement",
                  "src": "715:39:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6609,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 6598,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6562,
                        "src": "761:8:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 6601,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 6599,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7016,
                          "src": "770:3:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 6600,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "770:10:44",
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
                      "src": "761:20:44",
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
                          "id": 6607,
                          "name": "_value",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6576,
                          "src": "809:6:44",
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
                            "id": 6602,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6562,
                            "src": "784:8:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 6605,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 6603,
                              "name": "msg",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7016,
                              "src": "793:3:44",
                              "typeDescriptions": {
                                "typeIdentifier": "t_magic_message",
                                "typeString": "msg"
                              }
                            },
                            "id": 6604,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "sender",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": null,
                            "src": "793:10:44",
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
                          "src": "784:20:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 6606,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sub",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6438,
                        "src": "784:24:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 6608,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "784:32:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "761:55:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 6610,
                  "nodeType": "ExpressionStatement",
                  "src": "761:55:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6620,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 6611,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6562,
                        "src": "822:8:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 6613,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 6612,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6574,
                        "src": "831:3:44",
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
                      "src": "822:13:44",
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
                          "id": 6618,
                          "name": "_value",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6576,
                          "src": "856:6:44",
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
                            "id": 6614,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6562,
                            "src": "838:8:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 6616,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 6615,
                            "name": "_to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6574,
                            "src": "847:3:44",
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
                          "src": "838:13:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 6617,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6462,
                        "src": "838:17:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 6619,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "838:25:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "822:41:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 6621,
                  "nodeType": "ExpressionStatement",
                  "src": "822:41:44"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 6623,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7016,
                          "src": "883:3:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 6624,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "883:10:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6625,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6574,
                        "src": "895:3:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6626,
                        "name": "_value",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6576,
                        "src": "900:6:44",
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
                      "id": 6622,
                      "name": "Transfer",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6753,
                      "src": "874:8:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 6627,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "874:33:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6628,
                  "nodeType": "EmitStatement",
                  "src": "869:38:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "hexValue": "74727565",
                    "id": 6629,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "bool",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "920:4:44",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    },
                    "value": "true"
                  },
                  "functionReturnParameters": 6580,
                  "id": 6630,
                  "nodeType": "Return",
                  "src": "913:11:44"
                }
              ]
            },
            "documentation": "@dev Transfer token for a specified address\n@param _to The address to transfer to.\n@param _value The amount to be transferred.",
            "id": 6632,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6577,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6574,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6632,
                  "src": "626:11:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6573,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "626:7:44",
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
                  "id": 6576,
                  "name": "_value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6632,
                  "src": "639:14:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6575,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "639:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "625:29:44"
            },
            "payable": false,
            "returnParameters": {
              "id": 6580,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6579,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6632,
                  "src": "671:4:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6578,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "671:4:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "670:6:44"
            },
            "scope": 6645,
            "src": "608:321:44",
            "stateMutability": "nonpayable",
            "superFunction": 6745,
            "visibility": "public"
          },
          {
            "body": {
              "id": 6643,
              "nodeType": "Block",
              "src": "1196:34:44",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "id": 6639,
                      "name": "balances",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6562,
                      "src": "1209:8:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                        "typeString": "mapping(address => uint256)"
                      }
                    },
                    "id": 6641,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 6640,
                      "name": "_owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6634,
                      "src": "1218:6:44",
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
                    "src": "1209:16:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 6638,
                  "id": 6642,
                  "nodeType": "Return",
                  "src": "1202:23:44"
                }
              ]
            },
            "documentation": "@dev Gets the balance of the specified address.\n@param _owner The address to query the the balance of.\n@return An uint256 representing the amount owned by the passed address.",
            "id": 6644,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6635,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6634,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6644,
                  "src": "1150:14:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6633,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1150:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1149:16:44"
            },
            "payable": false,
            "returnParameters": {
              "id": 6638,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6637,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6644,
                  "src": "1187:7:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6636,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1187:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1186:9:44"
            },
            "scope": 6645,
            "src": "1131:99:44",
            "stateMutability": "view",
            "superFunction": 6736,
            "visibility": "public"
          }
        ],
        "scope": 6646,
        "src": "180:1053:44"
      }
    ],
    "src": "0:1234:44"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/BasicToken.sol",
    "exportedSymbols": {
      "BasicToken": [
        6645
      ]
    },
    "id": 6646,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6551,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:44"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
        "file": "./ERC20Basic.sol",
        "id": 6552,
        "nodeType": "ImportDirective",
        "scope": 6646,
        "sourceUnit": 6755,
        "src": "27:26:44",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "../../math/SafeMath.sol",
        "id": 6553,
        "nodeType": "ImportDirective",
        "scope": 6646,
        "sourceUnit": 6464,
        "src": "54:33:44",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 6554,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6754,
              "src": "203:10:44",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$6754",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 6555,
            "nodeType": "InheritanceSpecifier",
            "src": "203:10:44"
          }
        ],
        "contractDependencies": [
          6754
        ],
        "contractKind": "contract",
        "documentation": "@title Basic token\n@dev Basic version of StandardToken, with no allowances.",
        "fullyImplemented": true,
        "id": 6645,
        "linearizedBaseContracts": [
          6645,
          6754
        ],
        "name": "BasicToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 6558,
            "libraryName": {
              "contractScope": null,
              "id": 6556,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6463,
              "src": "224:8:44",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6463",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "218:27:44",
            "typeName": {
              "id": 6557,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "237:7:44",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": false,
            "id": 6562,
            "name": "balances",
            "nodeType": "VariableDeclaration",
            "scope": 6645,
            "src": "249:36:44",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
              "typeString": "mapping(address => uint256)"
            },
            "typeName": {
              "id": 6561,
              "keyType": {
                "id": 6559,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "257:7:44",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "nodeType": "Mapping",
              "src": "249:27:44",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                "typeString": "mapping(address => uint256)"
              },
              "valueType": {
                "id": 6560,
                "name": "uint256",
                "nodeType": "ElementaryTypeName",
                "src": "268:7:44",
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
            "id": 6564,
            "name": "totalSupply_",
            "nodeType": "VariableDeclaration",
            "scope": 6645,
            "src": "290:20:44",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 6563,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "290:7:44",
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
              "id": 6571,
              "nodeType": "Block",
              "src": "424:30:44",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6569,
                    "name": "totalSupply_",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 6564,
                    "src": "437:12:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 6568,
                  "id": 6570,
                  "nodeType": "Return",
                  "src": "430:19:44"
                }
              ]
            },
            "documentation": "@dev Total number of tokens in existence",
            "id": 6572,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6565,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "391:2:44"
            },
            "payable": false,
            "returnParameters": {
              "id": 6568,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6567,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6572,
                  "src": "415:7:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6566,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "415:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "414:9:44"
            },
            "scope": 6645,
            "src": "371:83:44",
            "stateMutability": "view",
            "superFunction": 6729,
            "visibility": "public"
          },
          {
            "body": {
              "id": 6631,
              "nodeType": "Block",
              "src": "677:252:44",
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
                        "id": 6586,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 6582,
                          "name": "_to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6574,
                          "src": "691:3:44",
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
                              "id": 6584,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "706:1:44",
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
                            "id": 6583,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "698:7:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 6585,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "698:10:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "691:17:44",
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
                      "id": 6581,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "683:7:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6587,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "683:26:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6588,
                  "nodeType": "ExpressionStatement",
                  "src": "683:26:44"
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
                        "id": 6595,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 6590,
                          "name": "_value",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6576,
                          "src": "723:6:44",
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
                            "id": 6591,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6562,
                            "src": "733:8:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 6594,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 6592,
                              "name": "msg",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7016,
                              "src": "742:3:44",
                              "typeDescriptions": {
                                "typeIdentifier": "t_magic_message",
                                "typeString": "msg"
                              }
                            },
                            "id": 6593,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "sender",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": null,
                            "src": "742:10:44",
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
                          "src": "733:20:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "723:30:44",
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
                      "id": 6589,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "715:7:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6596,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "715:39:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6597,
                  "nodeType": "ExpressionStatement",
                  "src": "715:39:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6609,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 6598,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6562,
                        "src": "761:8:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 6601,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 6599,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7016,
                          "src": "770:3:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 6600,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "770:10:44",
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
                      "src": "761:20:44",
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
                          "id": 6607,
                          "name": "_value",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6576,
                          "src": "809:6:44",
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
                            "id": 6602,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6562,
                            "src": "784:8:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 6605,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 6603,
                              "name": "msg",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7016,
                              "src": "793:3:44",
                              "typeDescriptions": {
                                "typeIdentifier": "t_magic_message",
                                "typeString": "msg"
                              }
                            },
                            "id": 6604,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "sender",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": null,
                            "src": "793:10:44",
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
                          "src": "784:20:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 6606,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sub",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6438,
                        "src": "784:24:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 6608,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "784:32:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "761:55:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 6610,
                  "nodeType": "ExpressionStatement",
                  "src": "761:55:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6620,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 6611,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6562,
                        "src": "822:8:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 6613,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 6612,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6574,
                        "src": "831:3:44",
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
                      "src": "822:13:44",
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
                          "id": 6618,
                          "name": "_value",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6576,
                          "src": "856:6:44",
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
                            "id": 6614,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6562,
                            "src": "838:8:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 6616,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 6615,
                            "name": "_to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6574,
                            "src": "847:3:44",
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
                          "src": "838:13:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 6617,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6462,
                        "src": "838:17:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 6619,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "838:25:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "822:41:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 6621,
                  "nodeType": "ExpressionStatement",
                  "src": "822:41:44"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 6623,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7016,
                          "src": "883:3:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 6624,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "883:10:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6625,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6574,
                        "src": "895:3:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6626,
                        "name": "_value",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6576,
                        "src": "900:6:44",
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
                      "id": 6622,
                      "name": "Transfer",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6753,
                      "src": "874:8:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 6627,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "874:33:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6628,
                  "nodeType": "EmitStatement",
                  "src": "869:38:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "hexValue": "74727565",
                    "id": 6629,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "bool",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "920:4:44",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    },
                    "value": "true"
                  },
                  "functionReturnParameters": 6580,
                  "id": 6630,
                  "nodeType": "Return",
                  "src": "913:11:44"
                }
              ]
            },
            "documentation": "@dev Transfer token for a specified address\n@param _to The address to transfer to.\n@param _value The amount to be transferred.",
            "id": 6632,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6577,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6574,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6632,
                  "src": "626:11:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6573,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "626:7:44",
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
                  "id": 6576,
                  "name": "_value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6632,
                  "src": "639:14:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6575,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "639:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "625:29:44"
            },
            "payable": false,
            "returnParameters": {
              "id": 6580,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6579,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6632,
                  "src": "671:4:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6578,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "671:4:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "670:6:44"
            },
            "scope": 6645,
            "src": "608:321:44",
            "stateMutability": "nonpayable",
            "superFunction": 6745,
            "visibility": "public"
          },
          {
            "body": {
              "id": 6643,
              "nodeType": "Block",
              "src": "1196:34:44",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "id": 6639,
                      "name": "balances",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6562,
                      "src": "1209:8:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                        "typeString": "mapping(address => uint256)"
                      }
                    },
                    "id": 6641,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 6640,
                      "name": "_owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6634,
                      "src": "1218:6:44",
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
                    "src": "1209:16:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 6638,
                  "id": 6642,
                  "nodeType": "Return",
                  "src": "1202:23:44"
                }
              ]
            },
            "documentation": "@dev Gets the balance of the specified address.\n@param _owner The address to query the the balance of.\n@return An uint256 representing the amount owned by the passed address.",
            "id": 6644,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6635,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6634,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6644,
                  "src": "1150:14:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6633,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1150:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1149:16:44"
            },
            "payable": false,
            "returnParameters": {
              "id": 6638,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6637,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6644,
                  "src": "1187:7:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6636,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1187:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1186:9:44"
            },
            "scope": 6645,
            "src": "1131:99:44",
            "stateMutability": "view",
            "superFunction": 6736,
            "visibility": "public"
          }
        ],
        "scope": 6646,
        "src": "180:1053:44"
      }
    ],
    "src": "0:1234:44"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-23T23:58:05.619Z"
}