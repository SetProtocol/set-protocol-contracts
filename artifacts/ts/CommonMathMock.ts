export const CommonMathMock = 
{
  "contractName": "CommonMathMock",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "testMaxUInt256",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b5060d88061001f6000396000f300608060405260043610603e5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416635c39ea8681146043575b600080fd5b348015604e57600080fd5b5060556069565b604051606091906089565b60405180910390f35b600060716076565b905090565b60001990565b608381609b565b82525050565b6020810160958284607c565b92915050565b905600a265627a7a72305820e3d4219f42a4a68fbf34707caa8588138935b91e4be579e3a0f2ef17c91cf6956c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x608060405260043610603e5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416635c39ea8681146043575b600080fd5b348015604e57600080fd5b5060556069565b604051606091906089565b60405180910390f35b600060716076565b905090565b60001990565b608381609b565b82525050565b6020810160958284607c565b92915050565b905600a265627a7a72305820e3d4219f42a4a68fbf34707caa8588138935b91e4be579e3a0f2ef17c91cf6956c6578706572696d656e74616cf50037",
  "sourceMap": "175:162:57:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;175:162:57;;;;;;;",
  "deployedSourceMap": "175:162:57:-;;;;;;;;;;;;;;;;;;;;;;;205:130;;8:9:-1;5:2;;;30:1;27;20:12;5:2;205:130:57;;;;;;;;;;;;;;;;;;;;;275:7;305:23;:21;:23::i;:::-;298:30;;205:130;:::o;779:118:51:-;-1:-1:-1;;779:118:51;:::o;5:110:-1:-;78:31;103:5;78:31;;;73:3;66:44;60:55;;;122:193;230:2;215:18;;244:61;219:9;278:6;244:61;;;201:114;;;;;322:79;391:5;374:27",
  "source": "pragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\nimport { CommonMath } from \"../../lib/CommonMath.sol\";\n\n// Mock contract implementation of OrderLibrary functions\ncontract CommonMathMock {\n    function testMaxUInt256()\n        public\n        pure\n        returns(uint256)\n    {\n        return CommonMath.maxUInt256();\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/lib/CommonMathMock.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/lib/CommonMathMock.sol",
    "exportedSymbols": {
      "CommonMathMock": [
        7488
      ]
    },
    "id": 7489,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 7474,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:57"
      },
      {
        "id": 7475,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "24:35:57"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/CommonMath.sol",
        "file": "../../lib/CommonMath.sol",
        "id": 7477,
        "nodeType": "ImportDirective",
        "scope": 7489,
        "sourceUnit": 7034,
        "src": "61:54:57",
        "symbolAliases": [
          {
            "foreign": 7476,
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
        "id": 7488,
        "linearizedBaseContracts": [
          7488
        ],
        "name": "CommonMathMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 7486,
              "nodeType": "Block",
              "src": "288:47:57",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 7482,
                        "name": "CommonMath",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7033,
                        "src": "305:10:57",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_CommonMath_$7033_$",
                          "typeString": "type(library CommonMath)"
                        }
                      },
                      "id": 7483,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "maxUInt256",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 7032,
                      "src": "305:21:57",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$__$returns$_t_uint256_$",
                        "typeString": "function () pure returns (uint256)"
                      }
                    },
                    "id": 7484,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "305:23:57",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 7481,
                  "id": 7485,
                  "nodeType": "Return",
                  "src": "298:30:57"
                }
              ]
            },
            "documentation": null,
            "id": 7487,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testMaxUInt256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 7478,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "228:2:57"
            },
            "payable": false,
            "returnParameters": {
              "id": 7481,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7480,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 7487,
                  "src": "275:7:57",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 7479,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "275:7:57",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "274:9:57"
            },
            "scope": 7488,
            "src": "205:130:57",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 7489,
        "src": "175:162:57"
      }
    ],
    "src": "0:338:57"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/lib/CommonMathMock.sol",
    "exportedSymbols": {
      "CommonMathMock": [
        7488
      ]
    },
    "id": 7489,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 7474,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:57"
      },
      {
        "id": 7475,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "24:35:57"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/CommonMath.sol",
        "file": "../../lib/CommonMath.sol",
        "id": 7477,
        "nodeType": "ImportDirective",
        "scope": 7489,
        "sourceUnit": 7034,
        "src": "61:54:57",
        "symbolAliases": [
          {
            "foreign": 7476,
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
        "id": 7488,
        "linearizedBaseContracts": [
          7488
        ],
        "name": "CommonMathMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 7486,
              "nodeType": "Block",
              "src": "288:47:57",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 7482,
                        "name": "CommonMath",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7033,
                        "src": "305:10:57",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_CommonMath_$7033_$",
                          "typeString": "type(library CommonMath)"
                        }
                      },
                      "id": 7483,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "maxUInt256",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 7032,
                      "src": "305:21:57",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$__$returns$_t_uint256_$",
                        "typeString": "function () pure returns (uint256)"
                      }
                    },
                    "id": 7484,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "305:23:57",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 7481,
                  "id": 7485,
                  "nodeType": "Return",
                  "src": "298:30:57"
                }
              ]
            },
            "documentation": null,
            "id": 7487,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testMaxUInt256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 7478,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "228:2:57"
            },
            "payable": false,
            "returnParameters": {
              "id": 7481,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7480,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 7487,
                  "src": "275:7:57",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 7479,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "275:7:57",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "274:9:57"
            },
            "scope": 7488,
            "src": "205:130:57",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 7489,
        "src": "175:162:57"
      }
    ],
    "src": "0:338:57"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T08:07:49.209Z"
}