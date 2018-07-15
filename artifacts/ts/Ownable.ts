export const Ownable = 
{
  "contractName": "Ownable",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipRenounced",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b5060008054600160a060020a03191633179055610296806100326000396000f3006080604052600436106100565763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663715018a6811461005b5780638da5cb5b14610072578063f2fde38b146100b0575b600080fd5b34801561006757600080fd5b506100706100de565b005b34801561007e57600080fd5b5061008761016f565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b3480156100bc57600080fd5b5061007073ffffffffffffffffffffffffffffffffffffffff6004351661018b565b60005473ffffffffffffffffffffffffffffffffffffffff16331461010257600080fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a2600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60005473ffffffffffffffffffffffffffffffffffffffff1633146101af57600080fd5b6101b8816101bb565b50565b73ffffffffffffffffffffffffffffffffffffffff811615156101dd57600080fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff929092169190911790555600a165627a7a72305820bf05b3bd3ee2f57185e27c079bc97c9d23804f4843ed4c631d702101c5ca13510029",
  "deployedBytecode": "0x6080604052600436106100565763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663715018a6811461005b5780638da5cb5b14610072578063f2fde38b146100b0575b600080fd5b34801561006757600080fd5b506100706100de565b005b34801561007e57600080fd5b5061008761016f565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b3480156100bc57600080fd5b5061007073ffffffffffffffffffffffffffffffffffffffff6004351661018b565b60005473ffffffffffffffffffffffffffffffffffffffff16331461010257600080fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a2600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60005473ffffffffffffffffffffffffffffffffffffffff1633146101af57600080fd5b6101b8816101bb565b50565b73ffffffffffffffffffffffffffffffffffffffff811615156101dd57600080fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff929092169190911790555600a165627a7a72305820bf05b3bd3ee2f57185e27c079bc97c9d23804f4843ed4c631d702101c5ca13510029",
  "sourceMap": "217:1294:61:-;;;540:50;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;567:5:61;:18;;-1:-1:-1;;;;;;567:18:61;575:10;567:18;;;217:1294;;;;;;",
  "deployedSourceMap": "217:1294:61:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;827:111;;8:9:-1;5:2;;;30:1;27;20:12;5:2;827:111:61;;;;;;238:20;;8:9:-1;5:2;;;30:1;27;20:12;5:2;238:20:61;;;;;;;;;;;;;;;;;;;;;;;1100:103;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1100:103:61;;;;;;;827:111;719:5;;;;705:10;:19;697:28;;;;;;903:5;;;884:25;;903:5;;;;;884:25;;;931:1;915:18;;;;;;827:111::o;238:20::-;;;;;;:::o;1100:103::-;719:5;;;;705:10;:19;697:28;;;;;;1169:29;1188:9;1169:18;:29::i;:::-;1100:103;:::o;1338:171::-;1408:23;;;;;1400:32;;;;;;1464:5;;;1443:38;;;;;;;1464:5;;;1443:38;;;1487:5;:17;;;;;;;;;;;;;;;1338:171::o",
  "source": "pragma solidity ^0.4.23;\n\n\n/**\n * @title Ownable\n * @dev The Ownable contract has an owner address, and provides basic authorization control\n * functions, this simplifies the implementation of \"user permissions\".\n */\ncontract Ownable {\n  address public owner;\n\n\n  event OwnershipRenounced(address indexed previousOwner);\n  event OwnershipTransferred(\n    address indexed previousOwner,\n    address indexed newOwner\n  );\n\n\n  /**\n   * @dev The Ownable constructor sets the original `owner` of the contract to the sender\n   * account.\n   */\n  constructor() public {\n    owner = msg.sender;\n  }\n\n  /**\n   * @dev Throws if called by any account other than the owner.\n   */\n  modifier onlyOwner() {\n    require(msg.sender == owner);\n    _;\n  }\n\n  /**\n   * @dev Allows the current owner to relinquish control of the contract.\n   */\n  function renounceOwnership() public onlyOwner {\n    emit OwnershipRenounced(owner);\n    owner = address(0);\n  }\n\n  /**\n   * @dev Allows the current owner to transfer control of the contract to a newOwner.\n   * @param _newOwner The address to transfer ownership to.\n   */\n  function transferOwnership(address _newOwner) public onlyOwner {\n    _transferOwnership(_newOwner);\n  }\n\n  /**\n   * @dev Transfers control of the contract to a newOwner.\n   * @param _newOwner The address to transfer ownership to.\n   */\n  function _transferOwnership(address _newOwner) internal {\n    require(_newOwner != address(0));\n    emit OwnershipTransferred(owner, _newOwner);\n    owner = _newOwner;\n  }\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
    "exportedSymbols": {
      "Ownable": [
        6432
      ]
    },
    "id": 6433,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6348,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:61"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title Ownable\n@dev The Ownable contract has an owner address, and provides basic authorization control\nfunctions, this simplifies the implementation of \"user permissions\".",
        "fullyImplemented": true,
        "id": 6432,
        "linearizedBaseContracts": [
          6432
        ],
        "name": "Ownable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 6350,
            "name": "owner",
            "nodeType": "VariableDeclaration",
            "scope": 6432,
            "src": "238:20:61",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 6349,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "238:7:61",
              "typeDescriptions": {
                "typeIdentifier": "t_address",
                "typeString": "address"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6354,
            "name": "OwnershipRenounced",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6353,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6352,
                  "indexed": true,
                  "name": "previousOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6354,
                  "src": "289:29:61",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6351,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "289:7:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "288:31:61"
            },
            "src": "264:56:61"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6360,
            "name": "OwnershipTransferred",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6359,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6356,
                  "indexed": true,
                  "name": "previousOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6360,
                  "src": "355:29:61",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6355,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "355:7:61",
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
                  "id": 6358,
                  "indexed": true,
                  "name": "newOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6360,
                  "src": "390:24:61",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6357,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "390:7:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "349:69:61"
            },
            "src": "323:96:61"
          },
          {
            "body": {
              "id": 6368,
              "nodeType": "Block",
              "src": "561:29:61",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6366,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 6363,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6350,
                      "src": "567:5:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 6364,
                        "name": "msg",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6899,
                        "src": "575:3:61",
                        "typeDescriptions": {
                          "typeIdentifier": "t_magic_message",
                          "typeString": "msg"
                        }
                      },
                      "id": 6365,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sender",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "575:10:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "567:18:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 6367,
                  "nodeType": "ExpressionStatement",
                  "src": "567:18:61"
                }
              ]
            },
            "documentation": "@dev The Ownable constructor sets the original `owner` of the contract to the sender\naccount.",
            "id": 6369,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6361,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "551:2:61"
            },
            "payable": false,
            "returnParameters": {
              "id": 6362,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "561:0:61"
            },
            "scope": 6432,
            "src": "540:50:61",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 6379,
              "nodeType": "Block",
              "src": "691:46:61",
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
                        "id": 6375,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 6372,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6899,
                            "src": "705:3:61",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 6373,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "705:10:61",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 6374,
                          "name": "owner",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6350,
                          "src": "719:5:61",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "705:19:61",
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
                      "id": 6371,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6902,
                      "src": "697:7:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6376,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "697:28:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6377,
                  "nodeType": "ExpressionStatement",
                  "src": "697:28:61"
                },
                {
                  "id": 6378,
                  "nodeType": "PlaceholderStatement",
                  "src": "731:1:61"
                }
              ]
            },
            "documentation": "@dev Throws if called by any account other than the owner.",
            "id": 6380,
            "name": "onlyOwner",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 6370,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "688:2:61"
            },
            "src": "670:67:61",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6395,
              "nodeType": "Block",
              "src": "873:65:61",
              "statements": [
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 6386,
                        "name": "owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6350,
                        "src": "903:5:61",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 6385,
                      "name": "OwnershipRenounced",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6354,
                      "src": "884:18:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$returns$__$",
                        "typeString": "function (address)"
                      }
                    },
                    "id": 6387,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "884:25:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6388,
                  "nodeType": "EmitStatement",
                  "src": "879:30:61"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6393,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 6389,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6350,
                      "src": "915:5:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 6391,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "931:1:61",
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
                        "id": 6390,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "lValueRequested": false,
                        "nodeType": "ElementaryTypeNameExpression",
                        "src": "923:7:61",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_address_$",
                          "typeString": "type(address)"
                        },
                        "typeName": "address"
                      },
                      "id": 6392,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "typeConversion",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "923:10:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "915:18:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 6394,
                  "nodeType": "ExpressionStatement",
                  "src": "915:18:61"
                }
              ]
            },
            "documentation": "@dev Allows the current owner to relinquish control of the contract.",
            "id": 6396,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 6383,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 6382,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6380,
                  "src": "863:9:61",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "863:9:61"
              }
            ],
            "name": "renounceOwnership",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6381,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "853:2:61"
            },
            "payable": false,
            "returnParameters": {
              "id": 6384,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "873:0:61"
            },
            "scope": 6432,
            "src": "827:111:61",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 6407,
              "nodeType": "Block",
              "src": "1163:40:61",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 6404,
                        "name": "_newOwner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6398,
                        "src": "1188:9:61",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 6403,
                      "name": "_transferOwnership",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6431,
                      "src": "1169:18:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$returns$__$",
                        "typeString": "function (address)"
                      }
                    },
                    "id": 6405,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1169:29:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6406,
                  "nodeType": "ExpressionStatement",
                  "src": "1169:29:61"
                }
              ]
            },
            "documentation": "@dev Allows the current owner to transfer control of the contract to a newOwner.\n@param _newOwner The address to transfer ownership to.",
            "id": 6408,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 6401,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 6400,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6380,
                  "src": "1153:9:61",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1153:9:61"
              }
            ],
            "name": "transferOwnership",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6399,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6398,
                  "name": "_newOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6408,
                  "src": "1127:17:61",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6397,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1127:7:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1126:19:61"
            },
            "payable": false,
            "returnParameters": {
              "id": 6402,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1163:0:61"
            },
            "scope": 6432,
            "src": "1100:103:61",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 6430,
              "nodeType": "Block",
              "src": "1394:115:61",
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
                        "id": 6418,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 6414,
                          "name": "_newOwner",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6410,
                          "src": "1408:9:61",
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
                              "id": 6416,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "1429:1:61",
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
                            "id": 6415,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1421:7:61",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 6417,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1421:10:61",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "1408:23:61",
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
                      "id": 6413,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6902,
                      "src": "1400:7:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6419,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1400:32:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6420,
                  "nodeType": "ExpressionStatement",
                  "src": "1400:32:61"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 6422,
                        "name": "owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6350,
                        "src": "1464:5:61",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6423,
                        "name": "_newOwner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6410,
                        "src": "1471:9:61",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
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
                        }
                      ],
                      "id": 6421,
                      "name": "OwnershipTransferred",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6360,
                      "src": "1443:20:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,address)"
                      }
                    },
                    "id": 6424,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1443:38:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6425,
                  "nodeType": "EmitStatement",
                  "src": "1438:43:61"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6428,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 6426,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6350,
                      "src": "1487:5:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 6427,
                      "name": "_newOwner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6410,
                      "src": "1495:9:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1487:17:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 6429,
                  "nodeType": "ExpressionStatement",
                  "src": "1487:17:61"
                }
              ]
            },
            "documentation": "@dev Transfers control of the contract to a newOwner.\n@param _newOwner The address to transfer ownership to.",
            "id": 6431,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "_transferOwnership",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6411,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6410,
                  "name": "_newOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6431,
                  "src": "1366:17:61",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6409,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1366:7:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1365:19:61"
            },
            "payable": false,
            "returnParameters": {
              "id": 6412,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1394:0:61"
            },
            "scope": 6432,
            "src": "1338:171:61",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 6433,
        "src": "217:1294:61"
      }
    ],
    "src": "0:1512:61"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
    "exportedSymbols": {
      "Ownable": [
        6432
      ]
    },
    "id": 6433,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6348,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:61"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title Ownable\n@dev The Ownable contract has an owner address, and provides basic authorization control\nfunctions, this simplifies the implementation of \"user permissions\".",
        "fullyImplemented": true,
        "id": 6432,
        "linearizedBaseContracts": [
          6432
        ],
        "name": "Ownable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 6350,
            "name": "owner",
            "nodeType": "VariableDeclaration",
            "scope": 6432,
            "src": "238:20:61",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 6349,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "238:7:61",
              "typeDescriptions": {
                "typeIdentifier": "t_address",
                "typeString": "address"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6354,
            "name": "OwnershipRenounced",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6353,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6352,
                  "indexed": true,
                  "name": "previousOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6354,
                  "src": "289:29:61",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6351,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "289:7:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "288:31:61"
            },
            "src": "264:56:61"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6360,
            "name": "OwnershipTransferred",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6359,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6356,
                  "indexed": true,
                  "name": "previousOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6360,
                  "src": "355:29:61",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6355,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "355:7:61",
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
                  "id": 6358,
                  "indexed": true,
                  "name": "newOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6360,
                  "src": "390:24:61",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6357,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "390:7:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "349:69:61"
            },
            "src": "323:96:61"
          },
          {
            "body": {
              "id": 6368,
              "nodeType": "Block",
              "src": "561:29:61",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6366,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 6363,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6350,
                      "src": "567:5:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 6364,
                        "name": "msg",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6899,
                        "src": "575:3:61",
                        "typeDescriptions": {
                          "typeIdentifier": "t_magic_message",
                          "typeString": "msg"
                        }
                      },
                      "id": 6365,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sender",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "575:10:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "567:18:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 6367,
                  "nodeType": "ExpressionStatement",
                  "src": "567:18:61"
                }
              ]
            },
            "documentation": "@dev The Ownable constructor sets the original `owner` of the contract to the sender\naccount.",
            "id": 6369,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6361,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "551:2:61"
            },
            "payable": false,
            "returnParameters": {
              "id": 6362,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "561:0:61"
            },
            "scope": 6432,
            "src": "540:50:61",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 6379,
              "nodeType": "Block",
              "src": "691:46:61",
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
                        "id": 6375,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 6372,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6899,
                            "src": "705:3:61",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 6373,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "705:10:61",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 6374,
                          "name": "owner",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6350,
                          "src": "719:5:61",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "705:19:61",
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
                      "id": 6371,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6902,
                      "src": "697:7:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6376,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "697:28:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6377,
                  "nodeType": "ExpressionStatement",
                  "src": "697:28:61"
                },
                {
                  "id": 6378,
                  "nodeType": "PlaceholderStatement",
                  "src": "731:1:61"
                }
              ]
            },
            "documentation": "@dev Throws if called by any account other than the owner.",
            "id": 6380,
            "name": "onlyOwner",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 6370,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "688:2:61"
            },
            "src": "670:67:61",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6395,
              "nodeType": "Block",
              "src": "873:65:61",
              "statements": [
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 6386,
                        "name": "owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6350,
                        "src": "903:5:61",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 6385,
                      "name": "OwnershipRenounced",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6354,
                      "src": "884:18:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$returns$__$",
                        "typeString": "function (address)"
                      }
                    },
                    "id": 6387,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "884:25:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6388,
                  "nodeType": "EmitStatement",
                  "src": "879:30:61"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6393,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 6389,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6350,
                      "src": "915:5:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 6391,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "931:1:61",
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
                        "id": 6390,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "lValueRequested": false,
                        "nodeType": "ElementaryTypeNameExpression",
                        "src": "923:7:61",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_address_$",
                          "typeString": "type(address)"
                        },
                        "typeName": "address"
                      },
                      "id": 6392,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "typeConversion",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "923:10:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "915:18:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 6394,
                  "nodeType": "ExpressionStatement",
                  "src": "915:18:61"
                }
              ]
            },
            "documentation": "@dev Allows the current owner to relinquish control of the contract.",
            "id": 6396,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 6383,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 6382,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6380,
                  "src": "863:9:61",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "863:9:61"
              }
            ],
            "name": "renounceOwnership",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6381,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "853:2:61"
            },
            "payable": false,
            "returnParameters": {
              "id": 6384,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "873:0:61"
            },
            "scope": 6432,
            "src": "827:111:61",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 6407,
              "nodeType": "Block",
              "src": "1163:40:61",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 6404,
                        "name": "_newOwner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6398,
                        "src": "1188:9:61",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 6403,
                      "name": "_transferOwnership",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6431,
                      "src": "1169:18:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$returns$__$",
                        "typeString": "function (address)"
                      }
                    },
                    "id": 6405,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1169:29:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6406,
                  "nodeType": "ExpressionStatement",
                  "src": "1169:29:61"
                }
              ]
            },
            "documentation": "@dev Allows the current owner to transfer control of the contract to a newOwner.\n@param _newOwner The address to transfer ownership to.",
            "id": 6408,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 6401,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 6400,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6380,
                  "src": "1153:9:61",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1153:9:61"
              }
            ],
            "name": "transferOwnership",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6399,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6398,
                  "name": "_newOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6408,
                  "src": "1127:17:61",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6397,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1127:7:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1126:19:61"
            },
            "payable": false,
            "returnParameters": {
              "id": 6402,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1163:0:61"
            },
            "scope": 6432,
            "src": "1100:103:61",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 6430,
              "nodeType": "Block",
              "src": "1394:115:61",
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
                        "id": 6418,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 6414,
                          "name": "_newOwner",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6410,
                          "src": "1408:9:61",
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
                              "id": 6416,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "1429:1:61",
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
                            "id": 6415,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1421:7:61",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 6417,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1421:10:61",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "1408:23:61",
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
                      "id": 6413,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6902,
                      "src": "1400:7:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6419,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1400:32:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6420,
                  "nodeType": "ExpressionStatement",
                  "src": "1400:32:61"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 6422,
                        "name": "owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6350,
                        "src": "1464:5:61",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6423,
                        "name": "_newOwner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6410,
                        "src": "1471:9:61",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
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
                        }
                      ],
                      "id": 6421,
                      "name": "OwnershipTransferred",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6360,
                      "src": "1443:20:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,address)"
                      }
                    },
                    "id": 6424,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1443:38:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6425,
                  "nodeType": "EmitStatement",
                  "src": "1438:43:61"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 6428,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 6426,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6350,
                      "src": "1487:5:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 6427,
                      "name": "_newOwner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6410,
                      "src": "1495:9:61",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1487:17:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 6429,
                  "nodeType": "ExpressionStatement",
                  "src": "1487:17:61"
                }
              ]
            },
            "documentation": "@dev Transfers control of the contract to a newOwner.\n@param _newOwner The address to transfer ownership to.",
            "id": 6431,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "_transferOwnership",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6411,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6410,
                  "name": "_newOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6431,
                  "src": "1366:17:61",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6409,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1366:7:61",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1365:19:61"
            },
            "payable": false,
            "returnParameters": {
              "id": 6412,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1394:0:61"
            },
            "scope": 6432,
            "src": "1338:171:61",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 6433,
        "src": "217:1294:61"
      }
    ],
    "src": "0:1512:61"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-13T21:55:38.441Z"
}