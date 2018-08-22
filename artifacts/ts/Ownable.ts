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
  "bytecode": "0x608060405234801561001057600080fd5b5060008054600160a060020a0319163317905561020b806100326000396000f3006080604052600436106100565763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663715018a6811461005b5780638da5cb5b14610072578063f2fde38b146100a3575b600080fd5b34801561006757600080fd5b506100706100c4565b005b34801561007e57600080fd5b50610087610130565b60408051600160a060020a039092168252519081900360200190f35b3480156100af57600080fd5b50610070600160a060020a036004351661013f565b600054600160a060020a031633146100db57600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b600054600160a060020a031681565b600054600160a060020a0316331461015657600080fd5b61015f81610162565b50565b600160a060020a038116151561017757600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790555600a165627a7a72305820f1c58dca1f6c12ae4235b4425b0c7f7b887fccf38f35218945a4f1dff7ac6c1a0029",
  "deployedBytecode": "0x6080604052600436106100565763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663715018a6811461005b5780638da5cb5b14610072578063f2fde38b146100a3575b600080fd5b34801561006757600080fd5b506100706100c4565b005b34801561007e57600080fd5b50610087610130565b60408051600160a060020a039092168252519081900360200190f35b3480156100af57600080fd5b50610070600160a060020a036004351661013f565b600054600160a060020a031633146100db57600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b600054600160a060020a031681565b600054600160a060020a0316331461015657600080fd5b61015f81610162565b50565b600160a060020a038116151561017757600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790555600a165627a7a72305820f1c58dca1f6c12ae4235b4425b0c7f7b887fccf38f35218945a4f1dff7ac6c1a0029",
  "sourceMap": "217:1468:68:-;;;540:50;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;567:5:68;:18;;-1:-1:-1;;;;;;567:18:68;575:10;567:18;;;217:1468;;;;;;",
  "deployedSourceMap": "217:1468:68:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1001:111;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1001:111:68;;;;;;238:20;;8:9:-1;5:2;;;30:1;27;20:12;5:2;238:20:68;;;;;;;;-1:-1:-1;;;;;238:20:68;;;;;;;;;;;;;;1274:103;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1274:103:68;-1:-1:-1;;;;;1274:103:68;;;;;1001:111;719:5;;-1:-1:-1;;;;;719:5:68;705:10;:19;697:28;;;;;;1077:5;;;1058:25;;-1:-1:-1;;;;;1077:5:68;;;;1058:25;;;1105:1;1089:18;;-1:-1:-1;;1089:18:68;;;1001:111::o;238:20::-;;;-1:-1:-1;;;;;238:20:68;;:::o;1274:103::-;719:5;;-1:-1:-1;;;;;719:5:68;705:10;:19;697:28;;;;;;1343:29;1362:9;1343:18;:29::i;:::-;1274:103;:::o;1512:171::-;-1:-1:-1;;;;;1582:23:68;;;;1574:32;;;;;;1638:5;;;1617:38;;-1:-1:-1;;;;;1617:38:68;;;;1638:5;;;1617:38;;;1661:5;:17;;-1:-1:-1;;1661:17:68;-1:-1:-1;;;;;1661:17:68;;;;;;;;;;1512:171::o",
  "source": "pragma solidity ^0.4.24;\n\n\n/**\n * @title Ownable\n * @dev The Ownable contract has an owner address, and provides basic authorization control\n * functions, this simplifies the implementation of \"user permissions\".\n */\ncontract Ownable {\n  address public owner;\n\n\n  event OwnershipRenounced(address indexed previousOwner);\n  event OwnershipTransferred(\n    address indexed previousOwner,\n    address indexed newOwner\n  );\n\n\n  /**\n   * @dev The Ownable constructor sets the original `owner` of the contract to the sender\n   * account.\n   */\n  constructor() public {\n    owner = msg.sender;\n  }\n\n  /**\n   * @dev Throws if called by any account other than the owner.\n   */\n  modifier onlyOwner() {\n    require(msg.sender == owner);\n    _;\n  }\n\n  /**\n   * @dev Allows the current owner to relinquish control of the contract.\n   * @notice Renouncing to ownership will leave the contract without an owner.\n   * It will not be possible to call the functions with the `onlyOwner`\n   * modifier anymore.\n   */\n  function renounceOwnership() public onlyOwner {\n    emit OwnershipRenounced(owner);\n    owner = address(0);\n  }\n\n  /**\n   * @dev Allows the current owner to transfer control of the contract to a newOwner.\n   * @param _newOwner The address to transfer ownership to.\n   */\n  function transferOwnership(address _newOwner) public onlyOwner {\n    _transferOwnership(_newOwner);\n  }\n\n  /**\n   * @dev Transfers control of the contract to a newOwner.\n   * @param _newOwner The address to transfer ownership to.\n   */\n  function _transferOwnership(address _newOwner) internal {\n    require(_newOwner != address(0));\n    emit OwnershipTransferred(owner, _newOwner);\n    owner = _newOwner;\n  }\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
    "exportedSymbols": {
      "Ownable": [
        8840
      ]
    },
    "id": 8841,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 8756,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:68"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title Ownable\n@dev The Ownable contract has an owner address, and provides basic authorization control\nfunctions, this simplifies the implementation of \"user permissions\".",
        "fullyImplemented": true,
        "id": 8840,
        "linearizedBaseContracts": [
          8840
        ],
        "name": "Ownable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 8758,
            "name": "owner",
            "nodeType": "VariableDeclaration",
            "scope": 8840,
            "src": "238:20:68",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 8757,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "238:7:68",
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
            "id": 8762,
            "name": "OwnershipRenounced",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 8761,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 8760,
                  "indexed": true,
                  "name": "previousOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 8762,
                  "src": "289:29:68",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 8759,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "289:7:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "288:31:68"
            },
            "src": "264:56:68"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 8768,
            "name": "OwnershipTransferred",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 8767,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 8764,
                  "indexed": true,
                  "name": "previousOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 8768,
                  "src": "355:29:68",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 8763,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "355:7:68",
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
                  "id": 8766,
                  "indexed": true,
                  "name": "newOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 8768,
                  "src": "390:24:68",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 8765,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "390:7:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "349:69:68"
            },
            "src": "323:96:68"
          },
          {
            "body": {
              "id": 8776,
              "nodeType": "Block",
              "src": "561:29:68",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8774,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8771,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8758,
                      "src": "567:5:68",
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
                        "id": 8772,
                        "name": "msg",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 9307,
                        "src": "575:3:68",
                        "typeDescriptions": {
                          "typeIdentifier": "t_magic_message",
                          "typeString": "msg"
                        }
                      },
                      "id": 8773,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sender",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "575:10:68",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "567:18:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 8775,
                  "nodeType": "ExpressionStatement",
                  "src": "567:18:68"
                }
              ]
            },
            "documentation": "@dev The Ownable constructor sets the original `owner` of the contract to the sender\naccount.",
            "id": 8777,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 8769,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "551:2:68"
            },
            "payable": false,
            "returnParameters": {
              "id": 8770,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "561:0:68"
            },
            "scope": 8840,
            "src": "540:50:68",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 8787,
              "nodeType": "Block",
              "src": "691:46:68",
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
                        "id": 8783,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 8780,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 9307,
                            "src": "705:3:68",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 8781,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "705:10:68",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 8782,
                          "name": "owner",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 8758,
                          "src": "719:5:68",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "705:19:68",
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
                      "id": 8779,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        9310,
                        9311
                      ],
                      "referencedDeclaration": 9310,
                      "src": "697:7:68",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 8784,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "697:28:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 8785,
                  "nodeType": "ExpressionStatement",
                  "src": "697:28:68"
                },
                {
                  "id": 8786,
                  "nodeType": "PlaceholderStatement",
                  "src": "731:1:68"
                }
              ]
            },
            "documentation": "@dev Throws if called by any account other than the owner.",
            "id": 8788,
            "name": "onlyOwner",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 8778,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "688:2:68"
            },
            "src": "670:67:68",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 8803,
              "nodeType": "Block",
              "src": "1047:65:68",
              "statements": [
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 8794,
                        "name": "owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 8758,
                        "src": "1077:5:68",
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
                      "id": 8793,
                      "name": "OwnershipRenounced",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8762,
                      "src": "1058:18:68",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$returns$__$",
                        "typeString": "function (address)"
                      }
                    },
                    "id": 8795,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1058:25:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 8796,
                  "nodeType": "EmitStatement",
                  "src": "1053:30:68"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8801,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8797,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8758,
                      "src": "1089:5:68",
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
                          "id": 8799,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "1105:1:68",
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
                        "id": 8798,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "lValueRequested": false,
                        "nodeType": "ElementaryTypeNameExpression",
                        "src": "1097:7:68",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_address_$",
                          "typeString": "type(address)"
                        },
                        "typeName": "address"
                      },
                      "id": 8800,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "typeConversion",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "1097:10:68",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1089:18:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 8802,
                  "nodeType": "ExpressionStatement",
                  "src": "1089:18:68"
                }
              ]
            },
            "documentation": "@dev Allows the current owner to relinquish control of the contract.\n@notice Renouncing to ownership will leave the contract without an owner.\nIt will not be possible to call the functions with the `onlyOwner`\nmodifier anymore.",
            "id": 8804,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 8791,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 8790,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 8788,
                  "src": "1037:9:68",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1037:9:68"
              }
            ],
            "name": "renounceOwnership",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 8789,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1027:2:68"
            },
            "payable": false,
            "returnParameters": {
              "id": 8792,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1047:0:68"
            },
            "scope": 8840,
            "src": "1001:111:68",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 8815,
              "nodeType": "Block",
              "src": "1337:40:68",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 8812,
                        "name": "_newOwner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 8806,
                        "src": "1362:9:68",
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
                      "id": 8811,
                      "name": "_transferOwnership",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8839,
                      "src": "1343:18:68",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$returns$__$",
                        "typeString": "function (address)"
                      }
                    },
                    "id": 8813,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1343:29:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 8814,
                  "nodeType": "ExpressionStatement",
                  "src": "1343:29:68"
                }
              ]
            },
            "documentation": "@dev Allows the current owner to transfer control of the contract to a newOwner.\n@param _newOwner The address to transfer ownership to.",
            "id": 8816,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 8809,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 8808,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 8788,
                  "src": "1327:9:68",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1327:9:68"
              }
            ],
            "name": "transferOwnership",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 8807,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 8806,
                  "name": "_newOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 8816,
                  "src": "1301:17:68",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 8805,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1301:7:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1300:19:68"
            },
            "payable": false,
            "returnParameters": {
              "id": 8810,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1337:0:68"
            },
            "scope": 8840,
            "src": "1274:103:68",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 8838,
              "nodeType": "Block",
              "src": "1568:115:68",
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
                        "id": 8826,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 8822,
                          "name": "_newOwner",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 8818,
                          "src": "1582:9:68",
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
                              "id": 8824,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "1603:1:68",
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
                            "id": 8823,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1595:7:68",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 8825,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1595:10:68",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "1582:23:68",
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
                      "id": 8821,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        9310,
                        9311
                      ],
                      "referencedDeclaration": 9310,
                      "src": "1574:7:68",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 8827,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1574:32:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 8828,
                  "nodeType": "ExpressionStatement",
                  "src": "1574:32:68"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 8830,
                        "name": "owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 8758,
                        "src": "1638:5:68",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 8831,
                        "name": "_newOwner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 8818,
                        "src": "1645:9:68",
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
                      "id": 8829,
                      "name": "OwnershipTransferred",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8768,
                      "src": "1617:20:68",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,address)"
                      }
                    },
                    "id": 8832,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1617:38:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 8833,
                  "nodeType": "EmitStatement",
                  "src": "1612:43:68"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8836,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8834,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8758,
                      "src": "1661:5:68",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 8835,
                      "name": "_newOwner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8818,
                      "src": "1669:9:68",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1661:17:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 8837,
                  "nodeType": "ExpressionStatement",
                  "src": "1661:17:68"
                }
              ]
            },
            "documentation": "@dev Transfers control of the contract to a newOwner.\n@param _newOwner The address to transfer ownership to.",
            "id": 8839,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "_transferOwnership",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 8819,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 8818,
                  "name": "_newOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 8839,
                  "src": "1540:17:68",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 8817,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1540:7:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1539:19:68"
            },
            "payable": false,
            "returnParameters": {
              "id": 8820,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1568:0:68"
            },
            "scope": 8840,
            "src": "1512:171:68",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 8841,
        "src": "217:1468:68"
      }
    ],
    "src": "0:1686:68"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
    "exportedSymbols": {
      "Ownable": [
        8840
      ]
    },
    "id": 8841,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 8756,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:68"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title Ownable\n@dev The Ownable contract has an owner address, and provides basic authorization control\nfunctions, this simplifies the implementation of \"user permissions\".",
        "fullyImplemented": true,
        "id": 8840,
        "linearizedBaseContracts": [
          8840
        ],
        "name": "Ownable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 8758,
            "name": "owner",
            "nodeType": "VariableDeclaration",
            "scope": 8840,
            "src": "238:20:68",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 8757,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "238:7:68",
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
            "id": 8762,
            "name": "OwnershipRenounced",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 8761,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 8760,
                  "indexed": true,
                  "name": "previousOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 8762,
                  "src": "289:29:68",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 8759,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "289:7:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "288:31:68"
            },
            "src": "264:56:68"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 8768,
            "name": "OwnershipTransferred",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 8767,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 8764,
                  "indexed": true,
                  "name": "previousOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 8768,
                  "src": "355:29:68",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 8763,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "355:7:68",
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
                  "id": 8766,
                  "indexed": true,
                  "name": "newOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 8768,
                  "src": "390:24:68",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 8765,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "390:7:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "349:69:68"
            },
            "src": "323:96:68"
          },
          {
            "body": {
              "id": 8776,
              "nodeType": "Block",
              "src": "561:29:68",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8774,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8771,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8758,
                      "src": "567:5:68",
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
                        "id": 8772,
                        "name": "msg",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 9307,
                        "src": "575:3:68",
                        "typeDescriptions": {
                          "typeIdentifier": "t_magic_message",
                          "typeString": "msg"
                        }
                      },
                      "id": 8773,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sender",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "575:10:68",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "567:18:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 8775,
                  "nodeType": "ExpressionStatement",
                  "src": "567:18:68"
                }
              ]
            },
            "documentation": "@dev The Ownable constructor sets the original `owner` of the contract to the sender\naccount.",
            "id": 8777,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 8769,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "551:2:68"
            },
            "payable": false,
            "returnParameters": {
              "id": 8770,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "561:0:68"
            },
            "scope": 8840,
            "src": "540:50:68",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 8787,
              "nodeType": "Block",
              "src": "691:46:68",
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
                        "id": 8783,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 8780,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 9307,
                            "src": "705:3:68",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 8781,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "705:10:68",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 8782,
                          "name": "owner",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 8758,
                          "src": "719:5:68",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "705:19:68",
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
                      "id": 8779,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        9310,
                        9311
                      ],
                      "referencedDeclaration": 9310,
                      "src": "697:7:68",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 8784,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "697:28:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 8785,
                  "nodeType": "ExpressionStatement",
                  "src": "697:28:68"
                },
                {
                  "id": 8786,
                  "nodeType": "PlaceholderStatement",
                  "src": "731:1:68"
                }
              ]
            },
            "documentation": "@dev Throws if called by any account other than the owner.",
            "id": 8788,
            "name": "onlyOwner",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 8778,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "688:2:68"
            },
            "src": "670:67:68",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 8803,
              "nodeType": "Block",
              "src": "1047:65:68",
              "statements": [
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 8794,
                        "name": "owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 8758,
                        "src": "1077:5:68",
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
                      "id": 8793,
                      "name": "OwnershipRenounced",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8762,
                      "src": "1058:18:68",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$returns$__$",
                        "typeString": "function (address)"
                      }
                    },
                    "id": 8795,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1058:25:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 8796,
                  "nodeType": "EmitStatement",
                  "src": "1053:30:68"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8801,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8797,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8758,
                      "src": "1089:5:68",
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
                          "id": 8799,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "1105:1:68",
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
                        "id": 8798,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "lValueRequested": false,
                        "nodeType": "ElementaryTypeNameExpression",
                        "src": "1097:7:68",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_address_$",
                          "typeString": "type(address)"
                        },
                        "typeName": "address"
                      },
                      "id": 8800,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "typeConversion",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "1097:10:68",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1089:18:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 8802,
                  "nodeType": "ExpressionStatement",
                  "src": "1089:18:68"
                }
              ]
            },
            "documentation": "@dev Allows the current owner to relinquish control of the contract.\n@notice Renouncing to ownership will leave the contract without an owner.\nIt will not be possible to call the functions with the `onlyOwner`\nmodifier anymore.",
            "id": 8804,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 8791,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 8790,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 8788,
                  "src": "1037:9:68",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1037:9:68"
              }
            ],
            "name": "renounceOwnership",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 8789,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1027:2:68"
            },
            "payable": false,
            "returnParameters": {
              "id": 8792,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1047:0:68"
            },
            "scope": 8840,
            "src": "1001:111:68",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 8815,
              "nodeType": "Block",
              "src": "1337:40:68",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 8812,
                        "name": "_newOwner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 8806,
                        "src": "1362:9:68",
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
                      "id": 8811,
                      "name": "_transferOwnership",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8839,
                      "src": "1343:18:68",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$returns$__$",
                        "typeString": "function (address)"
                      }
                    },
                    "id": 8813,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1343:29:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 8814,
                  "nodeType": "ExpressionStatement",
                  "src": "1343:29:68"
                }
              ]
            },
            "documentation": "@dev Allows the current owner to transfer control of the contract to a newOwner.\n@param _newOwner The address to transfer ownership to.",
            "id": 8816,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 8809,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 8808,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 8788,
                  "src": "1327:9:68",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1327:9:68"
              }
            ],
            "name": "transferOwnership",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 8807,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 8806,
                  "name": "_newOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 8816,
                  "src": "1301:17:68",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 8805,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1301:7:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1300:19:68"
            },
            "payable": false,
            "returnParameters": {
              "id": 8810,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1337:0:68"
            },
            "scope": 8840,
            "src": "1274:103:68",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 8838,
              "nodeType": "Block",
              "src": "1568:115:68",
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
                        "id": 8826,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 8822,
                          "name": "_newOwner",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 8818,
                          "src": "1582:9:68",
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
                              "id": 8824,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "1603:1:68",
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
                            "id": 8823,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1595:7:68",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 8825,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1595:10:68",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "1582:23:68",
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
                      "id": 8821,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        9310,
                        9311
                      ],
                      "referencedDeclaration": 9310,
                      "src": "1574:7:68",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 8827,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1574:32:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 8828,
                  "nodeType": "ExpressionStatement",
                  "src": "1574:32:68"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 8830,
                        "name": "owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 8758,
                        "src": "1638:5:68",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 8831,
                        "name": "_newOwner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 8818,
                        "src": "1645:9:68",
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
                      "id": 8829,
                      "name": "OwnershipTransferred",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8768,
                      "src": "1617:20:68",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,address)"
                      }
                    },
                    "id": 8832,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1617:38:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 8833,
                  "nodeType": "EmitStatement",
                  "src": "1612:43:68"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8836,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8834,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8758,
                      "src": "1661:5:68",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 8835,
                      "name": "_newOwner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8818,
                      "src": "1669:9:68",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1661:17:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 8837,
                  "nodeType": "ExpressionStatement",
                  "src": "1661:17:68"
                }
              ]
            },
            "documentation": "@dev Transfers control of the contract to a newOwner.\n@param _newOwner The address to transfer ownership to.",
            "id": 8839,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "_transferOwnership",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 8819,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 8818,
                  "name": "_newOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 8839,
                  "src": "1540:17:68",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 8817,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1540:7:68",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1539:19:68"
            },
            "payable": false,
            "returnParameters": {
              "id": 8820,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1568:0:68"
            },
            "scope": 8840,
            "src": "1512:171:68",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 8841,
        "src": "217:1468:68"
      }
    ],
    "src": "0:1686:68"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T08:07:49.226Z"
}