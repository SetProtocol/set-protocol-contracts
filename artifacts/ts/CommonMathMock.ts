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
  "bytecode": "0x608060405234801561001057600080fd5b5060d88061001f6000396000f300608060405260043610603e5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416635c39ea8681146043575b600080fd5b348015604e57600080fd5b5060556069565b604051606091906089565b60405180910390f35b600060716076565b905090565b60001990565b608381609b565b82525050565b6020810160958284607c565b92915050565b905600a265627a7a7230582063c4c418a51cbf68f71b582f64c61adfaad282ba7283d5bb305ef8dc9878ad9a6c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x608060405260043610603e5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416635c39ea8681146043575b600080fd5b348015604e57600080fd5b5060556069565b604051606091906089565b60405180910390f35b600060716076565b905090565b60001990565b608381609b565b82525050565b6020810160958284607c565b92915050565b905600a265627a7a7230582063c4c418a51cbf68f71b582f64c61adfaad282ba7283d5bb305ef8dc9878ad9a6c6578706572696d656e74616cf50037",
  "sourceMap": "175:162:52:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;175:162:52;;;;;;;",
  "deployedSourceMap": "175:162:52:-;;;;;;;;;;;;;;;;;;;;;;;205:130;;8:9:-1;5:2;;;30:1;27;20:12;5:2;205:130:52;;;;;;;;;;;;;;;;;;;;;275:7;305:23;:21;:23::i;:::-;298:30;;205:130;:::o;854:118:47:-;-1:-1:-1;;854:118:47;:::o;5:110:-1:-;78:31;103:5;78:31;;;73:3;66:44;60:55;;;122:193;230:2;215:18;;244:61;219:9;278:6;244:61;;;201:114;;;;;322:79;391:5;374:27",
  "source": "pragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\nimport { CommonMath } from \"../../lib/CommonMath.sol\";\n\n// Mock contract implementation of OrderLibrary functions\ncontract CommonMathMock {\n    function testMaxUInt256()\n        public\n        pure\n        returns(uint256)\n    {\n        return CommonMath.maxUInt256();\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/lib/CommonMathMock.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/lib/CommonMathMock.sol",
    "exportedSymbols": {
      "CommonMathMock": [
        5459
      ]
    },
    "id": 5460,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5445,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:52"
      },
      {
        "id": 5446,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "24:35:52"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/CommonMath.sol",
        "file": "../../lib/CommonMath.sol",
        "id": 5448,
        "nodeType": "ImportDirective",
        "scope": 5460,
        "sourceUnit": 5025,
        "src": "61:54:52",
        "symbolAliases": [
          {
            "foreign": 5447,
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
        "id": 5459,
        "linearizedBaseContracts": [
          5459
        ],
        "name": "CommonMathMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 5457,
              "nodeType": "Block",
              "src": "288:47:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 5453,
                        "name": "CommonMath",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5024,
                        "src": "305:10:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_CommonMath_$5024_$",
                          "typeString": "type(library CommonMath)"
                        }
                      },
                      "id": 5454,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "maxUInt256",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5023,
                      "src": "305:21:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$__$returns$_t_uint256_$",
                        "typeString": "function () pure returns (uint256)"
                      }
                    },
                    "id": 5455,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "305:23:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 5452,
                  "id": 5456,
                  "nodeType": "Return",
                  "src": "298:30:52"
                }
              ]
            },
            "documentation": null,
            "id": 5458,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testMaxUInt256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5449,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "228:2:52"
            },
            "payable": false,
            "returnParameters": {
              "id": 5452,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5451,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5458,
                  "src": "275:7:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5450,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "275:7:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "274:9:52"
            },
            "scope": 5459,
            "src": "205:130:52",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 5460,
        "src": "175:162:52"
      }
    ],
    "src": "0:338:52"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/lib/CommonMathMock.sol",
    "exportedSymbols": {
      "CommonMathMock": [
        5459
      ]
    },
    "id": 5460,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5445,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:52"
      },
      {
        "id": 5446,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "24:35:52"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/CommonMath.sol",
        "file": "../../lib/CommonMath.sol",
        "id": 5448,
        "nodeType": "ImportDirective",
        "scope": 5460,
        "sourceUnit": 5025,
        "src": "61:54:52",
        "symbolAliases": [
          {
            "foreign": 5447,
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
        "id": 5459,
        "linearizedBaseContracts": [
          5459
        ],
        "name": "CommonMathMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 5457,
              "nodeType": "Block",
              "src": "288:47:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 5453,
                        "name": "CommonMath",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5024,
                        "src": "305:10:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_CommonMath_$5024_$",
                          "typeString": "type(library CommonMath)"
                        }
                      },
                      "id": 5454,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "maxUInt256",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5023,
                      "src": "305:21:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$__$returns$_t_uint256_$",
                        "typeString": "function () pure returns (uint256)"
                      }
                    },
                    "id": 5455,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "305:23:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 5452,
                  "id": 5456,
                  "nodeType": "Return",
                  "src": "298:30:52"
                }
              ]
            },
            "documentation": null,
            "id": 5458,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testMaxUInt256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5449,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "228:2:52"
            },
            "payable": false,
            "returnParameters": {
              "id": 5452,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5451,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5458,
                  "src": "275:7:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5450,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "275:7:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "274:9:52"
            },
            "scope": 5459,
            "src": "205:130:52",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 5460,
        "src": "175:162:52"
      }
    ],
    "src": "0:338:52"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-27T04:20:39.844Z"
}