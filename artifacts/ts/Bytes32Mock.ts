export const Bytes32Mock = 
{
  "contractName": "Bytes32Mock",
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "data",
          "type": "bytes32"
        }
      ],
      "name": "testBytes32ToBytes",
      "outputs": [
        {
          "name": "",
          "type": "bytes"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "data",
          "type": "bytes32"
        }
      ],
      "name": "testBytes32ToString",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b506102e3806100206000396000f30060806040526004361061004b5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630a21ef958114610050578063c76ecf99146100dd575b600080fd5b34801561005c57600080fd5b506100686004356100f5565b6040805160208082528351818301528351919283929083019185019080838360005b838110156100a257818101518382015260200161008a565b50505050905090810190601f1680156100cf5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156100e957600080fd5b50610068600435610106565b606061010082610111565b92915050565b60606101008261018e565b60608061011d8361018e565b9050806040516020018082805190602001908083835b602083106101525780518252601f199092019160209182019101610133565b6001836020036101000a038019825116818451168082178552505050505050905001915050604051602081830303815290604052915050919050565b60606000815b6020821080156101be57508382602081106101ab57fe5b1a60f860020a0260f860020a9004600014155b156101ce57816001019150610194565b816040519080825280601f01601f1916602001820160405280156101fc578160200160208202803883390190505b509050600091505b60208210801561024f575083826020811061021b57fe5b1a60f860020a027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916600060f860020a0214155b156102b05783826020811061026057fe5b1a60f860020a02818381518110151561027557fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350816001019150610204565b93925050505600a165627a7a7230582031b84f7ca9714455e8f5c63408a84000546f276a8b722d13df5fc5176639d8690029",
  "deployedBytecode": "0x60806040526004361061004b5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630a21ef958114610050578063c76ecf99146100dd575b600080fd5b34801561005c57600080fd5b506100686004356100f5565b6040805160208082528351818301528351919283929083019185019080838360005b838110156100a257818101518382015260200161008a565b50505050905090810190601f1680156100cf5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156100e957600080fd5b50610068600435610106565b606061010082610111565b92915050565b60606101008261018e565b60608061011d8361018e565b9050806040516020018082805190602001908083835b602083106101525780518252601f199092019160209182019101610133565b6001836020036101000a038019825116818451168082178552505050505050905001915050604051602081830303815290604052915050919050565b60606000815b6020821080156101be57508382602081106101ab57fe5b1a60f860020a0260f860020a9004600014155b156101ce57816001019150610194565b816040519080825280601f01601f1916602001820160405280156101fc578160200160208202803883390190505b509050600091505b60208210801561024f575083826020811061021b57fe5b1a60f860020a027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916600060f860020a0214155b156102b05783826020811061026057fe5b1a60f860020a02818381518110151561027557fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350816001019150610204565b93925050505600a165627a7a7230582031b84f7ca9714455e8f5c63408a84000546f276a8b722d13df5fc5176639d8690029",
  "sourceMap": "75:336:56:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;75:336:56;;;;;;;",
  "deployedSourceMap": "75:336:56:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;257:152;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;257:152:56;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;257:152:56;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;102:149;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;102:149:56;;;;;257:152;344:6;373:29;397:4;373:23;:29::i;:::-;366:36;257:152;-1:-1:-1;;257:152:56:o;102:149::-;188:5;216:28;239:4;216:22;:28::i;1036:217:50:-;1121:6;1143:25;1171:20;1186:4;1171:14;:20::i;:::-;1143:48;;1232:12;1215:30;;;;;;;;;;;;;;;36:153:-1;66:2;58:11;;36:153;;176:10;;164:23;;-1:-1;;139:12;;;;98:2;89:12;;;;114;36:153;;;274:1;267:3;263:2;259:12;254:3;250:22;246:30;315:4;311:9;305:3;299:10;295:26;356:4;350:3;344:10;340:21;389:7;380;377:20;372:3;365:33;3:399;;;1215:30:50;;;;;;;;;;;49:4:-1;39:7;30;26:21;22:32;13:7;6:49;1215:30:50;;;1201:45;;1036:217;;;;:::o;645:380::-;730:5;751:6;730:5;771:65;782:2;778:1;:6;:28;;;;-1:-1:-1;793:4:50;798:1;793:7;;;;;;;;-1:-1:-1;;;793:7:50;-1:-1:-1;;;788:13:50;;805:1;788:18;;778:28;771:65;;;822:3;;;;;771:65;;;877:1;867:12;;;;;;;;;;;;;;;;;;;;;;;;;29:2:-1;21:6;17:15;117:4;105:10;97:6;88:34;136:17;;-1:-1;867:12:50;;845:34;;893:1;889:5;;904:92;915:2;911:1;:6;:22;;;;-1:-1:-1;921:4:50;926:1;921:7;;;;;;;;-1:-1:-1;;;921:7:50;:12;;;932:1;-1:-1:-1;;;921:12:50;;;911:22;904:92;;;961:4;966:1;961:7;;;;;;;;-1:-1:-1;;;961:7:50;949:6;956:1;949:9;;;;;;;;;;;;;;:19;;;;;;;;;;;982:3;;;;;904:92;;;1012:6;645:380;-1:-1:-1;;;645:380:50:o",
  "source": "pragma solidity 0.4.24;\n\nimport { Bytes32 } from \"../../lib/Bytes32.sol\";\n\ncontract Bytes32Mock {\n    function testBytes32ToBytes(bytes32 data)\n        public\n        pure\n        returns(bytes)\n    {\n        return Bytes32.bytes32ToBytes(data);\n    }\n\n    function testBytes32ToString(bytes32 data)\n        public\n        pure\n        returns(string)\n    {\n        return Bytes32.bytes32ToString(data);\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/lib/Bytes32Mock.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/lib/Bytes32Mock.sol",
    "exportedSymbols": {
      "Bytes32Mock": [
        7472
      ]
    },
    "id": 7473,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 7443,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:56"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/Bytes32.sol",
        "file": "../../lib/Bytes32.sol",
        "id": 7445,
        "nodeType": "ImportDirective",
        "scope": 7473,
        "sourceUnit": 7019,
        "src": "25:48:56",
        "symbolAliases": [
          {
            "foreign": 7444,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 7472,
        "linearizedBaseContracts": [
          7472
        ],
        "name": "Bytes32Mock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 7457,
              "nodeType": "Block",
              "src": "199:52:56",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 7454,
                        "name": "data",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7447,
                        "src": "239:4:56",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 7452,
                        "name": "Bytes32",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7018,
                        "src": "216:7:56",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_Bytes32_$7018_$",
                          "typeString": "type(library Bytes32)"
                        }
                      },
                      "id": 7453,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "bytes32ToBytes",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6996,
                      "src": "216:22:56",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes32_$returns$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes32) pure returns (bytes memory)"
                      }
                    },
                    "id": 7455,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "216:28:56",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 7451,
                  "id": 7456,
                  "nodeType": "Return",
                  "src": "209:35:56"
                }
              ]
            },
            "documentation": null,
            "id": 7458,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testBytes32ToBytes",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 7448,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7447,
                  "name": "data",
                  "nodeType": "VariableDeclaration",
                  "scope": 7458,
                  "src": "130:12:56",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 7446,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "130:7:56",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "129:14:56"
            },
            "payable": false,
            "returnParameters": {
              "id": 7451,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7450,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 7458,
                  "src": "188:5:56",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 7449,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "188:5:56",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "187:7:56"
            },
            "scope": 7472,
            "src": "102:149:56",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 7470,
              "nodeType": "Block",
              "src": "356:53:56",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 7467,
                        "name": "data",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7460,
                        "src": "397:4:56",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 7465,
                        "name": "Bytes32",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7018,
                        "src": "373:7:56",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_Bytes32_$7018_$",
                          "typeString": "type(library Bytes32)"
                        }
                      },
                      "id": 7466,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "bytes32ToString",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 7017,
                      "src": "373:23:56",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes32_$returns$_t_string_memory_ptr_$",
                        "typeString": "function (bytes32) pure returns (string memory)"
                      }
                    },
                    "id": 7468,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "373:29:56",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_memory_ptr",
                      "typeString": "string memory"
                    }
                  },
                  "functionReturnParameters": 7464,
                  "id": 7469,
                  "nodeType": "Return",
                  "src": "366:36:56"
                }
              ]
            },
            "documentation": null,
            "id": 7471,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testBytes32ToString",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 7461,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7460,
                  "name": "data",
                  "nodeType": "VariableDeclaration",
                  "scope": 7471,
                  "src": "286:12:56",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 7459,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "286:7:56",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "285:14:56"
            },
            "payable": false,
            "returnParameters": {
              "id": 7464,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7463,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 7471,
                  "src": "344:6:56",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 7462,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "344:6:56",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "343:8:56"
            },
            "scope": 7472,
            "src": "257:152:56",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 7473,
        "src": "75:336:56"
      }
    ],
    "src": "0:412:56"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/lib/Bytes32Mock.sol",
    "exportedSymbols": {
      "Bytes32Mock": [
        7472
      ]
    },
    "id": 7473,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 7443,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:56"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/Bytes32.sol",
        "file": "../../lib/Bytes32.sol",
        "id": 7445,
        "nodeType": "ImportDirective",
        "scope": 7473,
        "sourceUnit": 7019,
        "src": "25:48:56",
        "symbolAliases": [
          {
            "foreign": 7444,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 7472,
        "linearizedBaseContracts": [
          7472
        ],
        "name": "Bytes32Mock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 7457,
              "nodeType": "Block",
              "src": "199:52:56",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 7454,
                        "name": "data",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7447,
                        "src": "239:4:56",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 7452,
                        "name": "Bytes32",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7018,
                        "src": "216:7:56",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_Bytes32_$7018_$",
                          "typeString": "type(library Bytes32)"
                        }
                      },
                      "id": 7453,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "bytes32ToBytes",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6996,
                      "src": "216:22:56",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes32_$returns$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes32) pure returns (bytes memory)"
                      }
                    },
                    "id": 7455,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "216:28:56",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 7451,
                  "id": 7456,
                  "nodeType": "Return",
                  "src": "209:35:56"
                }
              ]
            },
            "documentation": null,
            "id": 7458,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testBytes32ToBytes",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 7448,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7447,
                  "name": "data",
                  "nodeType": "VariableDeclaration",
                  "scope": 7458,
                  "src": "130:12:56",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 7446,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "130:7:56",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "129:14:56"
            },
            "payable": false,
            "returnParameters": {
              "id": 7451,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7450,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 7458,
                  "src": "188:5:56",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 7449,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "188:5:56",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "187:7:56"
            },
            "scope": 7472,
            "src": "102:149:56",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 7470,
              "nodeType": "Block",
              "src": "356:53:56",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 7467,
                        "name": "data",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7460,
                        "src": "397:4:56",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 7465,
                        "name": "Bytes32",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7018,
                        "src": "373:7:56",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_Bytes32_$7018_$",
                          "typeString": "type(library Bytes32)"
                        }
                      },
                      "id": 7466,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "bytes32ToString",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 7017,
                      "src": "373:23:56",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes32_$returns$_t_string_memory_ptr_$",
                        "typeString": "function (bytes32) pure returns (string memory)"
                      }
                    },
                    "id": 7468,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "373:29:56",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_memory_ptr",
                      "typeString": "string memory"
                    }
                  },
                  "functionReturnParameters": 7464,
                  "id": 7469,
                  "nodeType": "Return",
                  "src": "366:36:56"
                }
              ]
            },
            "documentation": null,
            "id": 7471,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testBytes32ToString",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 7461,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7460,
                  "name": "data",
                  "nodeType": "VariableDeclaration",
                  "scope": 7471,
                  "src": "286:12:56",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 7459,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "286:7:56",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "285:14:56"
            },
            "payable": false,
            "returnParameters": {
              "id": 7464,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7463,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 7471,
                  "src": "344:6:56",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 7462,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "344:6:56",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "343:8:56"
            },
            "scope": 7472,
            "src": "257:152:56",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 7473,
        "src": "75:336:56"
      }
    ],
    "src": "0:412:56"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T08:07:49.031Z"
}