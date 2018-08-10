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
  "bytecode": "0x608060405234801561001057600080fd5b5060d88061001f6000396000f300608060405260043610603e5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416635c39ea8681146043575b600080fd5b348015604e57600080fd5b5060556069565b604051606091906089565b60405180910390f35b600060716076565b905090565b60001990565b608381609b565b82525050565b6020810160958284607c565b92915050565b905600a265627a7a723058205352a38e21a698e6bd15d7b301c54f3ff7370a0afee489e49d883d5b378183d66c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x608060405260043610603e5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416635c39ea8681146043575b600080fd5b348015604e57600080fd5b5060556069565b604051606091906089565b60405180910390f35b600060716076565b905090565b60001990565b608381609b565b82525050565b6020810160958284607c565b92915050565b905600a265627a7a723058205352a38e21a698e6bd15d7b301c54f3ff7370a0afee489e49d883d5b378183d66c6578706572696d656e74616cf50037",
  "sourceMap": "175:162:51:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;175:162:51;;;;;;;",
  "deployedSourceMap": "175:162:51:-;;;;;;;;;;;;;;;;;;;;;;;205:130;;8:9:-1;5:2;;;30:1;27;20:12;5:2;205:130:51;;;;;;;;;;;;;;;;;;;;;275:7;305:23;:21;:23::i;:::-;298:30;;205:130;:::o;779:118:46:-;-1:-1:-1;;779:118:46;:::o;5:110:-1:-;78:31;103:5;78:31;;;73:3;66:44;60:55;;;122:193;230:2;215:18;;244:61;219:9;278:6;244:61;;;201:114;;;;;322:79;391:5;374:27",
  "source": "pragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\nimport { CommonMath } from \"../../lib/CommonMath.sol\";\n\n// Mock contract implementation of OrderLibrary functions\ncontract CommonMathMock {\n    function testMaxUInt256()\n        public\n        pure\n        returns(uint256)\n    {\n        return CommonMath.maxUInt256();\n    }\n}\n",
  "sourcePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/mocks/lib/CommonMathMock.sol",
  "ast": {
    "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/mocks/lib/CommonMathMock.sol",
    "exportedSymbols": {
      "CommonMathMock": [
        5502
      ]
    },
    "id": 5503,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5488,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:51"
      },
      {
        "id": 5489,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "24:35:51"
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/lib/CommonMath.sol",
        "file": "../../lib/CommonMath.sol",
        "id": 5491,
        "nodeType": "ImportDirective",
        "scope": 5503,
        "sourceUnit": 5079,
        "src": "61:54:51",
        "symbolAliases": [
          {
            "foreign": 5490,
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
        "id": 5502,
        "linearizedBaseContracts": [
          5502
        ],
        "name": "CommonMathMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 5500,
              "nodeType": "Block",
              "src": "288:47:51",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 5496,
                        "name": "CommonMath",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5078,
                        "src": "305:10:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_CommonMath_$5078_$",
                          "typeString": "type(library CommonMath)"
                        }
                      },
                      "id": 5497,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "maxUInt256",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5077,
                      "src": "305:21:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$__$returns$_t_uint256_$",
                        "typeString": "function () pure returns (uint256)"
                      }
                    },
                    "id": 5498,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "305:23:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 5495,
                  "id": 5499,
                  "nodeType": "Return",
                  "src": "298:30:51"
                }
              ]
            },
            "documentation": null,
            "id": 5501,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testMaxUInt256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5492,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "228:2:51"
            },
            "payable": false,
            "returnParameters": {
              "id": 5495,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5494,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5501,
                  "src": "275:7:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5493,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "275:7:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "274:9:51"
            },
            "scope": 5502,
            "src": "205:130:51",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 5503,
        "src": "175:162:51"
      }
    ],
    "src": "0:338:51"
  },
  "legacyAST": {
    "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/mocks/lib/CommonMathMock.sol",
    "exportedSymbols": {
      "CommonMathMock": [
        5502
      ]
    },
    "id": 5503,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5488,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:51"
      },
      {
        "id": 5489,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "24:35:51"
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/lib/CommonMath.sol",
        "file": "../../lib/CommonMath.sol",
        "id": 5491,
        "nodeType": "ImportDirective",
        "scope": 5503,
        "sourceUnit": 5079,
        "src": "61:54:51",
        "symbolAliases": [
          {
            "foreign": 5490,
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
        "id": 5502,
        "linearizedBaseContracts": [
          5502
        ],
        "name": "CommonMathMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 5500,
              "nodeType": "Block",
              "src": "288:47:51",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 5496,
                        "name": "CommonMath",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5078,
                        "src": "305:10:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_CommonMath_$5078_$",
                          "typeString": "type(library CommonMath)"
                        }
                      },
                      "id": 5497,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "maxUInt256",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5077,
                      "src": "305:21:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$__$returns$_t_uint256_$",
                        "typeString": "function () pure returns (uint256)"
                      }
                    },
                    "id": 5498,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "305:23:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 5495,
                  "id": 5499,
                  "nodeType": "Return",
                  "src": "298:30:51"
                }
              ]
            },
            "documentation": null,
            "id": 5501,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testMaxUInt256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5492,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "228:2:51"
            },
            "payable": false,
            "returnParameters": {
              "id": 5495,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5494,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5501,
                  "src": "275:7:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5493,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "275:7:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "274:9:51"
            },
            "scope": 5502,
            "src": "205:130:51",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 5503,
        "src": "175:162:51"
      }
    ],
    "src": "0:338:51"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-10T21:21:49.389Z"
}