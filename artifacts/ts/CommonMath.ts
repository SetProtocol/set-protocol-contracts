export const CommonMath = 
{
  "contractName": "CommonMath",
  "abi": [],
  "bytecode": "0x604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a165627a7a72305820fc1bf1c8918b7dc58ba5afcc93c65b824223f62209425b84c1c126fa2ea60eb00029",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a165627a7a72305820fc1bf1c8918b7dc58ba5afcc93c65b824223f62209425b84c1c126fa2ea60eb00029",
  "sourceMap": "623:276:36:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "623:276:36:-;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\nlibrary CommonMath {\n    /**\n     * Calculates and returns the maximum value for a uint256\n     *\n     * @return  The maximum value for uint256\n     */\n    function maxUInt256()\n        internal\n        pure\n        returns (uint256)\n    {\n        return 2 ** 256 - 1;\n    }\n}\n    ",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/CommonMath.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/CommonMath.sol",
    "exportedSymbols": {
      "CommonMath": [
        6000
      ]
    },
    "id": 6001,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5987,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:36"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": null,
        "fullyImplemented": true,
        "id": 6000,
        "linearizedBaseContracts": [
          6000
        ],
        "name": "CommonMath",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 5998,
              "nodeType": "Block",
              "src": "861:36:36",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_rational_115792089237316195423570985008687907853269984665640564039457584007913129639935_by_1",
                      "typeString": "int_const 1157...(70 digits omitted)...9935"
                    },
                    "id": 5996,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "commonType": {
                        "typeIdentifier": "t_rational_115792089237316195423570985008687907853269984665640564039457584007913129639936_by_1",
                        "typeString": "int_const 1157...(70 digits omitted)...9936"
                      },
                      "id": 5994,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 5992,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "878:1:36",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "**",
                      "rightExpression": {
                        "argumentTypes": null,
                        "hexValue": "323536",
                        "id": 5993,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "883:3:36",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_256_by_1",
                          "typeString": "int_const 256"
                        },
                        "value": "256"
                      },
                      "src": "878:8:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_115792089237316195423570985008687907853269984665640564039457584007913129639936_by_1",
                        "typeString": "int_const 1157...(70 digits omitted)...9936"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "-",
                    "rightExpression": {
                      "argumentTypes": null,
                      "hexValue": "31",
                      "id": 5995,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "889:1:36",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_1_by_1",
                        "typeString": "int_const 1"
                      },
                      "value": "1"
                    },
                    "src": "878:12:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_rational_115792089237316195423570985008687907853269984665640564039457584007913129639935_by_1",
                      "typeString": "int_const 1157...(70 digits omitted)...9935"
                    }
                  },
                  "functionReturnParameters": 5991,
                  "id": 5997,
                  "nodeType": "Return",
                  "src": "871:19:36"
                }
              ]
            },
            "documentation": "Calculates and returns the maximum value for a uint256\n     * @return  The maximum value for uint256",
            "id": 5999,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "maxUInt256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5988,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "798:2:36"
            },
            "payable": false,
            "returnParameters": {
              "id": 5991,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5990,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5999,
                  "src": "848:7:36",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5989,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "848:7:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "847:9:36"
            },
            "scope": 6000,
            "src": "779:118:36",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 6001,
        "src": "623:276:36"
      }
    ],
    "src": "597:307:36"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/CommonMath.sol",
    "exportedSymbols": {
      "CommonMath": [
        6000
      ]
    },
    "id": 6001,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5987,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:36"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": null,
        "fullyImplemented": true,
        "id": 6000,
        "linearizedBaseContracts": [
          6000
        ],
        "name": "CommonMath",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 5998,
              "nodeType": "Block",
              "src": "861:36:36",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_rational_115792089237316195423570985008687907853269984665640564039457584007913129639935_by_1",
                      "typeString": "int_const 1157...(70 digits omitted)...9935"
                    },
                    "id": 5996,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "commonType": {
                        "typeIdentifier": "t_rational_115792089237316195423570985008687907853269984665640564039457584007913129639936_by_1",
                        "typeString": "int_const 1157...(70 digits omitted)...9936"
                      },
                      "id": 5994,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 5992,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "878:1:36",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "**",
                      "rightExpression": {
                        "argumentTypes": null,
                        "hexValue": "323536",
                        "id": 5993,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "883:3:36",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_256_by_1",
                          "typeString": "int_const 256"
                        },
                        "value": "256"
                      },
                      "src": "878:8:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_115792089237316195423570985008687907853269984665640564039457584007913129639936_by_1",
                        "typeString": "int_const 1157...(70 digits omitted)...9936"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "-",
                    "rightExpression": {
                      "argumentTypes": null,
                      "hexValue": "31",
                      "id": 5995,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "889:1:36",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_1_by_1",
                        "typeString": "int_const 1"
                      },
                      "value": "1"
                    },
                    "src": "878:12:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_rational_115792089237316195423570985008687907853269984665640564039457584007913129639935_by_1",
                      "typeString": "int_const 1157...(70 digits omitted)...9935"
                    }
                  },
                  "functionReturnParameters": 5991,
                  "id": 5997,
                  "nodeType": "Return",
                  "src": "871:19:36"
                }
              ]
            },
            "documentation": "Calculates and returns the maximum value for a uint256\n     * @return  The maximum value for uint256",
            "id": 5999,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "maxUInt256",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5988,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "798:2:36"
            },
            "payable": false,
            "returnParameters": {
              "id": 5991,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5990,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5999,
                  "src": "848:7:36",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5989,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "848:7:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "847:9:36"
            },
            "scope": 6000,
            "src": "779:118:36",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 6001,
        "src": "623:276:36"
      }
    ],
    "src": "597:307:36"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-23T23:58:05.606Z"
}