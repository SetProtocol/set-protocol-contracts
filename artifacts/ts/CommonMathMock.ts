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
  "bytecode": "0x608060405234801561001057600080fd5b5060f68061001f6000396000f300608060405260043610603e5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416635c39ea8681146043575b600080fd5b348015604e57600080fd5b5060556069565b6040516060919060a7565b60405180910390f35b600060716076565b905090565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90565b60a18160b9565b82525050565b6020810160b38284609a565b92915050565b905600a265627a7a723058205c878fc9c8cf4c455e96a93c47a4881bb5203d7a97192a4ce32424cd496a9b966c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x608060405260043610603e5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416635c39ea8681146043575b600080fd5b348015604e57600080fd5b5060556069565b6040516060919060a7565b60405180910390f35b600060716076565b905090565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90565b60a18160b9565b82525050565b6020810160b38284609a565b92915050565b905600a265627a7a723058205c878fc9c8cf4c455e96a93c47a4881bb5203d7a97192a4ce32424cd496a9b966c6578706572696d656e74616cf50037",
  "sourceMap": "175:162:51:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;175:162:51;;;;;;;",
  "deployedSourceMap": "175:162:51:-;;;;;;;;;;;;;;;;;;;;;;;205:130;;8:9:-1;5:2;;;30:1;27;20:12;5:2;205:130:51;;;;;;;;;;;;;;;;;;;;;275:7;305:23;:21;:23::i;:::-;298:30;;205:130;:::o;854:118:46:-;953:12;854:118;:::o;5:110:-1:-;78:31;103:5;78:31;;;73:3;66:44;60:55;;;122:193;230:2;215:18;;244:61;219:9;278:6;244:61;;;201:114;;;;;322:79;391:5;374:27",
  "source": "pragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\nimport { CommonMath } from \"../../lib/CommonMath.sol\";\n\n// Mock contract implementation of OrderLibrary functions\ncontract CommonMathMock {\n    function testMaxUInt256()\n        public\n        pure\n        returns(uint256)\n    {\n        return CommonMath.maxUInt256();\n    }\n}\n",
  "sourcePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/mocks/lib/CommonMathMock.sol",
  "ast": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/mocks/lib/CommonMathMock.sol",
    "exportedSymbols": {
      "CommonMathMock": [
        5124
      ]
    },
    "id": 5125,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5110,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:51"
      },
      {
        "id": 5111,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "24:35:51"
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/lib/CommonMath.sol",
        "file": "../../lib/CommonMath.sol",
        "id": 5113,
        "nodeType": "ImportDirective",
        "scope": 5125,
        "sourceUnit": 4723,
        "src": "61:54:51",
        "symbolAliases": [
          {
            "foreign": 5112,
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
        "id": 5124,
        "linearizedBaseContracts": [
          5124
        ],
        "name": "CommonMathMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 5122,
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
                        "id": 5118,
                        "name": "CommonMath",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4722,
                        "src": "305:10:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_CommonMath_$4722_$",
                          "typeString": "type(library CommonMath)"
                        }
                      },
                      "id": 5119,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "maxUInt256",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4721,
                      "src": "305:21:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$__$returns$_t_uint256_$",
                        "typeString": "function () pure returns (uint256)"
                      }
                    },
                    "id": 5120,
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
                  "functionReturnParameters": 5117,
                  "id": 5121,
                  "nodeType": "Return",
                  "src": "298:30:51"
                }
              ]
            },
            "documentation": null,
            "id": 5123,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testMaxUInt256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5114,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "228:2:51"
            },
            "payable": false,
            "returnParameters": {
              "id": 5117,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5116,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5123,
                  "src": "275:7:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5115,
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
            "scope": 5124,
            "src": "205:130:51",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 5125,
        "src": "175:162:51"
      }
    ],
    "src": "0:338:51"
  },
  "legacyAST": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/mocks/lib/CommonMathMock.sol",
    "exportedSymbols": {
      "CommonMathMock": [
        5124
      ]
    },
    "id": 5125,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5110,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:51"
      },
      {
        "id": 5111,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "24:35:51"
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/lib/CommonMath.sol",
        "file": "../../lib/CommonMath.sol",
        "id": 5113,
        "nodeType": "ImportDirective",
        "scope": 5125,
        "sourceUnit": 4723,
        "src": "61:54:51",
        "symbolAliases": [
          {
            "foreign": 5112,
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
        "id": 5124,
        "linearizedBaseContracts": [
          5124
        ],
        "name": "CommonMathMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 5122,
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
                        "id": 5118,
                        "name": "CommonMath",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4722,
                        "src": "305:10:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_CommonMath_$4722_$",
                          "typeString": "type(library CommonMath)"
                        }
                      },
                      "id": 5119,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "maxUInt256",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4721,
                      "src": "305:21:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$__$returns$_t_uint256_$",
                        "typeString": "function () pure returns (uint256)"
                      }
                    },
                    "id": 5120,
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
                  "functionReturnParameters": 5117,
                  "id": 5121,
                  "nodeType": "Return",
                  "src": "298:30:51"
                }
              ]
            },
            "documentation": null,
            "id": 5123,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testMaxUInt256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5114,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "228:2:51"
            },
            "payable": false,
            "returnParameters": {
              "id": 5117,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5116,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5123,
                  "src": "275:7:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5115,
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
            "scope": 5124,
            "src": "205:130:51",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 5125,
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
  "updatedAt": "2018-07-13T21:55:38.432Z"
}