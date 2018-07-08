export const ERC20Wrapper = 
{
  "contractName": "ERC20Wrapper",
  "abi": [],
  "bytecode": "0x604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a165627a7a723058208c98191cf0fc4e8db97b8fc9e60f5d696242e31ffd0e9919fcab3245b989690b0029",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a165627a7a723058208c98191cf0fc4e8db97b8fc9e60f5d696242e31ffd0e9919fcab3245b989690b0029",
  "sourceMap": "1024:3304:23:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "1024:3304:23:-;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { IERC20 } from \"../../lib/IERC20.sol\";\nimport { CommonMath } from \"../../lib/CommonMath.sol\";\n\n\n/**\n * @title ERC20Wrapper\n * @author Set Protocol\n *\n * This library contains functions for interacting wtih ERC20 tokens, even those not fully compliant.\n * For all functions we will only accept tokens that return a null or true value, any other values will\n * cause the operation to revert.\n */\nlibrary ERC20Wrapper {\n\n    // ============ Constants ============\n\n    string constant INVALID_RETURN_TRANSFER = \"Transferred token does not return null or true on successful transfer.\";\n    string constant INVALID_RETURN_TRANSFERFROM = \"Transferred token does not return null or true on successful transferFrom.\";\n    string constant INVALID_RETURN_APPROVE = \"Approved token does not return null or true on successful approve.\";\n\n    // ============ Internal Functions ============\n\n    function balanceOf(\n        address _tokenAddress,\n        address _ownerAddress\n    )\n        internal\n        view\n        returns (uint256)\n    {\n        return IERC20(_tokenAddress).balanceOf(_ownerAddress);\n    }\n\n    function allowance(\n        address _tokenAddress,\n        address _tokenOwner,\n        address _spender\n    )\n        internal\n        view\n        returns (uint256)\n    {\n        return IERC20(_tokenAddress).allowance(_tokenOwner, _spender);\n    }\n\n    function transfer(\n        address _tokenAddress,\n        address _to,\n        uint256 _quantity\n    )\n        internal\n    {\n        IERC20(_tokenAddress).transfer(_to, _quantity);\n\n        require(\n            checkSuccess(),\n            INVALID_RETURN_TRANSFER\n        );\n    }\n\n    function transferFrom(\n        address _tokenAddress,\n        address _from,\n        address _to,\n        uint256 _quantity\n    )\n        internal\n    {\n        IERC20(_tokenAddress).transferFrom(_from, _to, _quantity);\n\n        require(\n            checkSuccess(),\n            INVALID_RETURN_TRANSFERFROM\n        );\n    }\n\n    function approve(\n        address _tokenAddress,\n        address _spender,\n        uint256 _quantity\n    )\n        internal\n    {\n        IERC20(_tokenAddress).approve(_spender, _quantity);\n    \n        require(\n            checkSuccess(),\n            INVALID_RETURN_APPROVE\n        );\n    }\n\n    function ensureAllowance(\n        address _token,\n        address _owner,\n        address _spender,\n        uint256 _quantity\n    )\n        private\n    {\n        if (allowance(_token, _owner, _spender) < _quantity) {\n            approve(\n                _token,\n                _spender,\n                CommonMath.maxUInt256()\n            );\n        }\n    }\n\n    // ============ Private Functions ============\n\n    /**\n     * Checks the return value of the previous function up to 32 bytes. Returns true if the previous\n     * function returned 0 bytes or 1.\n     */\n    function checkSuccess(\n    )\n        private\n        pure\n        returns (bool)\n    {\n        // default to failure\n        uint256 returnValue = 0;\n\n        assembly {\n            // check number of bytes returned from last function call\n            switch returndatasize\n\n            // no bytes returned: assume success\n            case 0x0 {\n                returnValue := 1\n            }\n\n            // 32 bytes returned\n            case 0x20 {\n                // copy 32 bytes into scratch space\n                returndatacopy(0x0, 0x0, 0x20)\n\n                // load those bytes into returnValue\n                returnValue := mload(0x0)\n            }\n\n            // not sure what was returned: dont mark as success\n            default { }\n        }\n\n        // check if returned value is one or nothing\n        return returnValue == 1;\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/ERC20Wrapper.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/ERC20Wrapper.sol",
    "exportedSymbols": {
      "ERC20Wrapper": [
        3260
      ]
    },
    "id": 3261,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3090,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:23"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/IERC20.sol",
        "file": "../../lib/IERC20.sol",
        "id": 3092,
        "nodeType": "ImportDirective",
        "scope": 3261,
        "sourceUnit": 4418,
        "src": "622:46:23",
        "symbolAliases": [
          {
            "foreign": 3091,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/CommonMath.sol",
        "file": "../../lib/CommonMath.sol",
        "id": 3094,
        "nodeType": "ImportDirective",
        "scope": 3261,
        "sourceUnit": 4376,
        "src": "669:54:23",
        "symbolAliases": [
          {
            "foreign": 3093,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title ERC20Wrapper\n@author Set Protocol\n * This library contains functions for interacting wtih ERC20 tokens, even those not fully compliant.\nFor all functions we will only accept tokens that return a null or true value, any other values will\ncause the operation to revert.",
        "fullyImplemented": true,
        "id": 3260,
        "linearizedBaseContracts": [
          3260
        ],
        "name": "ERC20Wrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 3097,
            "name": "INVALID_RETURN_TRANSFER",
            "nodeType": "VariableDeclaration",
            "scope": 3260,
            "src": "1096:114:23",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 3095,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1096:6:23",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5472616e7366657272656420746f6b656e20646f6573206e6f742072657475726e206e756c6c206f722074727565206f6e207375636365737366756c207472616e736665722e",
              "id": 3096,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1138:72:23",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_6a28e8cd70cea460f64d888906c14b1e15dd90824bd08d495b1878c7147754b3",
                "typeString": "literal_string \"Transferred token does not return null or true on successful transfer.\""
              },
              "value": "Transferred token does not return null or true on successful transfer."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 3100,
            "name": "INVALID_RETURN_TRANSFERFROM",
            "nodeType": "VariableDeclaration",
            "scope": 3260,
            "src": "1216:122:23",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 3098,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1216:6:23",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5472616e7366657272656420746f6b656e20646f6573206e6f742072657475726e206e756c6c206f722074727565206f6e207375636365737366756c207472616e7366657246726f6d2e",
              "id": 3099,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1262:76:23",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_4aa4f2ff21e6312a79f309b1750981deb687adeae13f742ac475b55c58e95666",
                "typeString": "literal_string \"Transferred token does not return null or true on successful transferFrom.\""
              },
              "value": "Transferred token does not return null or true on successful transferFrom."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 3103,
            "name": "INVALID_RETURN_APPROVE",
            "nodeType": "VariableDeclaration",
            "scope": 3260,
            "src": "1344:109:23",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 3101,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1344:6:23",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "417070726f76656420746f6b656e20646f6573206e6f742072657475726e206e756c6c206f722074727565206f6e207375636365737366756c20617070726f76652e",
              "id": 3102,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1385:68:23",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_99d0dda7a6d81737bc992be9cf35fe1c1e8501bdd21bd0dfe88583241e132c2f",
                "typeString": "literal_string \"Approved token does not return null or true on successful approve.\""
              },
              "value": "Approved token does not return null or true on successful approve."
            },
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3119,
              "nodeType": "Block",
              "src": "1660:70:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3116,
                        "name": "_ownerAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3107,
                        "src": "1709:13:23",
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
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 3113,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3105,
                            "src": "1684:13:23",
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
                          "id": 3112,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4417,
                          "src": "1677:6:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$4417_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 3114,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1677:21:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$4417",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 3115,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4384,
                      "src": "1677:31:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) view external returns (uint256)"
                      }
                    },
                    "id": 3117,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1677:46:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3111,
                  "id": 3118,
                  "nodeType": "Return",
                  "src": "1670:53:23"
                }
              ]
            },
            "documentation": null,
            "id": 3120,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3108,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3105,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3120,
                  "src": "1541:21:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3104,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1541:7:23",
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
                  "id": 3107,
                  "name": "_ownerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3120,
                  "src": "1572:21:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3106,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1572:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1531:68:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3111,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3110,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3120,
                  "src": "1647:7:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3109,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1647:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1646:9:23"
            },
            "scope": 3260,
            "src": "1513:217:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3139,
              "nodeType": "Block",
              "src": "1907:78:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3135,
                        "name": "_tokenOwner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3124,
                        "src": "1956:11:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3136,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3126,
                        "src": "1969:8:23",
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
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 3132,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3122,
                            "src": "1931:13:23",
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
                          "id": 3131,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4417,
                          "src": "1924:6:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$4417_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 3133,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1924:21:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$4417",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 3134,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "allowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4393,
                      "src": "1924:31:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view external returns (uint256)"
                      }
                    },
                    "id": 3137,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1924:54:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3130,
                  "id": 3138,
                  "nodeType": "Return",
                  "src": "1917:61:23"
                }
              ]
            },
            "documentation": null,
            "id": 3140,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3127,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3122,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3140,
                  "src": "1764:21:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3121,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1764:7:23",
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
                  "id": 3124,
                  "name": "_tokenOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3140,
                  "src": "1795:19:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3123,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1795:7:23",
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
                  "id": 3126,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 3140,
                  "src": "1824:16:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3125,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1824:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1754:92:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3130,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3129,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3140,
                  "src": "1894:7:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3128,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1894:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1893:9:23"
            },
            "scope": 3260,
            "src": "1736:249:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3163,
              "nodeType": "Block",
              "src": "2115:156:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3153,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3144,
                        "src": "2156:3:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3154,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3146,
                        "src": "2161:9:23",
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
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 3150,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3142,
                            "src": "2132:13:23",
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
                          "id": 3149,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4417,
                          "src": "2125:6:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$4417_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 3151,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2125:21:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$4417",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 3152,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4400,
                      "src": "2125:30:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256) external"
                      }
                    },
                    "id": 3155,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2125:46:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3156,
                  "nodeType": "ExpressionStatement",
                  "src": "2125:46:23"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [],
                        "expression": {
                          "argumentTypes": [],
                          "id": 3158,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3259,
                          "src": "2203:12:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 3159,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2203:14:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3160,
                        "name": "INVALID_RETURN_TRANSFER",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3097,
                        "src": "2231:23:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 3157,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "2182:7:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3161,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2182:82:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3162,
                  "nodeType": "ExpressionStatement",
                  "src": "2182:82:23"
                }
              ]
            },
            "documentation": null,
            "id": 3164,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3147,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3142,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3164,
                  "src": "2018:21:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3141,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2018:7:23",
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
                  "id": 3144,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3164,
                  "src": "2049:11:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3143,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2049:7:23",
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
                  "id": 3146,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3164,
                  "src": "2070:17:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3145,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2070:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2008:85:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3148,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2115:0:23"
            },
            "scope": 3260,
            "src": "1991:280:23",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3190,
              "nodeType": "Block",
              "src": "2428:171:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3179,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3168,
                        "src": "2473:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3180,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3170,
                        "src": "2480:3:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3181,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3172,
                        "src": "2485:9:23",
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
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 3176,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3166,
                            "src": "2445:13:23",
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
                          "id": 3175,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4417,
                          "src": "2438:6:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$4417_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 3177,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2438:21:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$4417",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 3178,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferFrom",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4409,
                      "src": "2438:34:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 3182,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2438:57:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3183,
                  "nodeType": "ExpressionStatement",
                  "src": "2438:57:23"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [],
                        "expression": {
                          "argumentTypes": [],
                          "id": 3185,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3259,
                          "src": "2527:12:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 3186,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2527:14:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3187,
                        "name": "INVALID_RETURN_TRANSFERFROM",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3100,
                        "src": "2555:27:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 3184,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "2506:7:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3188,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2506:86:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3189,
                  "nodeType": "ExpressionStatement",
                  "src": "2506:86:23"
                }
              ]
            },
            "documentation": null,
            "id": 3191,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3173,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3166,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3191,
                  "src": "2308:21:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3165,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2308:7:23",
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
                  "id": 3168,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3191,
                  "src": "2339:13:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3167,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2339:7:23",
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
                  "id": 3170,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3191,
                  "src": "2362:11:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3169,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2362:7:23",
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
                  "id": 3172,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3191,
                  "src": "2383:17:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3171,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2383:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2298:108:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3174,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2428:0:23"
            },
            "scope": 3260,
            "src": "2277:322:23",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3214,
              "nodeType": "Block",
              "src": "2733:163:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3204,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3195,
                        "src": "2773:8:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3205,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3197,
                        "src": "2783:9:23",
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
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 3201,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3193,
                            "src": "2750:13:23",
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
                          "id": 3200,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4417,
                          "src": "2743:6:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$4417_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 3202,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2743:21:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$4417",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 3203,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "approve",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4416,
                      "src": "2743:29:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256) external"
                      }
                    },
                    "id": 3206,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2743:50:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3207,
                  "nodeType": "ExpressionStatement",
                  "src": "2743:50:23"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [],
                        "expression": {
                          "argumentTypes": [],
                          "id": 3209,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3259,
                          "src": "2829:12:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 3210,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2829:14:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3211,
                        "name": "INVALID_RETURN_APPROVE",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3103,
                        "src": "2857:22:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 3208,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "2808:7:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3212,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2808:81:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3213,
                  "nodeType": "ExpressionStatement",
                  "src": "2808:81:23"
                }
              ]
            },
            "documentation": null,
            "id": 3215,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3198,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3193,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3215,
                  "src": "2631:21:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3192,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2631:7:23",
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
                  "id": 3195,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 3215,
                  "src": "2662:16:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3194,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2662:7:23",
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
                  "id": 3197,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3215,
                  "src": "2688:17:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3196,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2688:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2621:90:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3199,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2733:0:23"
            },
            "scope": 3260,
            "src": "2605:291:23",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3243,
              "nodeType": "Block",
              "src": "3054:206:23",
              "statements": [
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3232,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 3227,
                          "name": "_token",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3217,
                          "src": "3078:6:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 3228,
                          "name": "_owner",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3219,
                          "src": "3086:6:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 3229,
                          "name": "_spender",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3221,
                          "src": "3094:8:23",
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
                          },
                          {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        ],
                        "id": 3226,
                        "name": "allowance",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3140,
                        "src": "3068:9:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_view$_t_address_$_t_address_$_t_address_$returns$_t_uint256_$",
                          "typeString": "function (address,address,address) view returns (uint256)"
                        }
                      },
                      "id": 3230,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "3068:35:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 3231,
                      "name": "_quantity",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3223,
                      "src": "3106:9:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3068:47:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": null,
                  "id": 3242,
                  "nodeType": "IfStatement",
                  "src": "3064:190:23",
                  "trueBody": {
                    "id": 3241,
                    "nodeType": "Block",
                    "src": "3117:137:23",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 3234,
                              "name": "_token",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3217,
                              "src": "3156:6:23",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 3235,
                              "name": "_spender",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3221,
                              "src": "3180:8:23",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "arguments": [],
                              "expression": {
                                "argumentTypes": [],
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 3236,
                                  "name": "CommonMath",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 4375,
                                  "src": "3206:10:23",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_CommonMath_$4375_$",
                                    "typeString": "type(library CommonMath)"
                                  }
                                },
                                "id": 3237,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "maxUInt256",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 4374,
                                "src": "3206:21:23",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$__$returns$_t_uint256_$",
                                  "typeString": "function () pure returns (uint256)"
                                }
                              },
                              "id": 3238,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "3206:23:23",
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
                            "id": 3233,
                            "name": "approve",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3215,
                            "src": "3131:7:23",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,address,uint256)"
                            }
                          },
                          "id": 3239,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3131:112:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 3240,
                        "nodeType": "ExpressionStatement",
                        "src": "3131:112:23"
                      }
                    ]
                  }
                }
              ]
            },
            "documentation": null,
            "id": 3244,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "ensureAllowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3224,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3217,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3244,
                  "src": "2936:14:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3216,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2936:7:23",
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
                  "id": 3219,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3244,
                  "src": "2960:14:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3218,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2960:7:23",
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
                  "id": 3221,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 3244,
                  "src": "2984:16:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3220,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2984:7:23",
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
                  "id": 3223,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3244,
                  "src": "3010:17:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3222,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3010:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2926:107:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3225,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3054:0:23"
            },
            "scope": 3260,
            "src": "2902:358:23",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          },
          {
            "body": {
              "id": 3258,
              "nodeType": "Block",
              "src": "3559:767:23",
              "statements": [
                {
                  "assignments": [
                    3250
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3250,
                      "name": "returnValue",
                      "nodeType": "VariableDeclaration",
                      "scope": 3259,
                      "src": "3599:19:23",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 3249,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "3599:7:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3252,
                  "initialValue": {
                    "argumentTypes": null,
                    "hexValue": "30",
                    "id": 3251,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "number",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "3621:1:23",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_rational_0_by_1",
                      "typeString": "int_const 0"
                    },
                    "value": "0"
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3599:23:23"
                },
                {
                  "externalReferences": [
                    {
                      "returnValue": {
                        "declaration": 3250,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4095:11:23",
                        "valueSize": 1
                      }
                    },
                    {
                      "returnValue": {
                        "declaration": 3250,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3837:11:23",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 3253,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    switch returndatasize()\n    case 0x0 {\n        returnValue := 1\n    }\n    case 0x20 {\n        returndatacopy(0x0, 0x0, 0x20)\n        returnValue := mload(0x0)\n    }\n    default {\n    }\n}",
                  "src": "3633:669:23"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3256,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3254,
                      "name": "returnValue",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3250,
                      "src": "4303:11:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "hexValue": "31",
                      "id": 3255,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "4318:1:23",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_1_by_1",
                        "typeString": "int_const 1"
                      },
                      "value": "1"
                    },
                    "src": "4303:16:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 3248,
                  "id": 3257,
                  "nodeType": "Return",
                  "src": "4296:23:23"
                }
              ]
            },
            "documentation": "Checks the return value of the previous function up to 32 bytes. Returns true if the previous\nfunction returned 0 bytes or 1.",
            "id": 3259,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "checkSuccess",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3245,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3495:7:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3248,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3247,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3259,
                  "src": "3549:4:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3246,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "3549:4:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3548:6:23"
            },
            "scope": 3260,
            "src": "3474:852:23",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 3261,
        "src": "1024:3304:23"
      }
    ],
    "src": "597:3732:23"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/ERC20Wrapper.sol",
    "exportedSymbols": {
      "ERC20Wrapper": [
        3260
      ]
    },
    "id": 3261,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3090,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:23"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/IERC20.sol",
        "file": "../../lib/IERC20.sol",
        "id": 3092,
        "nodeType": "ImportDirective",
        "scope": 3261,
        "sourceUnit": 4418,
        "src": "622:46:23",
        "symbolAliases": [
          {
            "foreign": 3091,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/CommonMath.sol",
        "file": "../../lib/CommonMath.sol",
        "id": 3094,
        "nodeType": "ImportDirective",
        "scope": 3261,
        "sourceUnit": 4376,
        "src": "669:54:23",
        "symbolAliases": [
          {
            "foreign": 3093,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title ERC20Wrapper\n@author Set Protocol\n * This library contains functions for interacting wtih ERC20 tokens, even those not fully compliant.\nFor all functions we will only accept tokens that return a null or true value, any other values will\ncause the operation to revert.",
        "fullyImplemented": true,
        "id": 3260,
        "linearizedBaseContracts": [
          3260
        ],
        "name": "ERC20Wrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 3097,
            "name": "INVALID_RETURN_TRANSFER",
            "nodeType": "VariableDeclaration",
            "scope": 3260,
            "src": "1096:114:23",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 3095,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1096:6:23",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5472616e7366657272656420746f6b656e20646f6573206e6f742072657475726e206e756c6c206f722074727565206f6e207375636365737366756c207472616e736665722e",
              "id": 3096,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1138:72:23",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_6a28e8cd70cea460f64d888906c14b1e15dd90824bd08d495b1878c7147754b3",
                "typeString": "literal_string \"Transferred token does not return null or true on successful transfer.\""
              },
              "value": "Transferred token does not return null or true on successful transfer."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 3100,
            "name": "INVALID_RETURN_TRANSFERFROM",
            "nodeType": "VariableDeclaration",
            "scope": 3260,
            "src": "1216:122:23",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 3098,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1216:6:23",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5472616e7366657272656420746f6b656e20646f6573206e6f742072657475726e206e756c6c206f722074727565206f6e207375636365737366756c207472616e7366657246726f6d2e",
              "id": 3099,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1262:76:23",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_4aa4f2ff21e6312a79f309b1750981deb687adeae13f742ac475b55c58e95666",
                "typeString": "literal_string \"Transferred token does not return null or true on successful transferFrom.\""
              },
              "value": "Transferred token does not return null or true on successful transferFrom."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 3103,
            "name": "INVALID_RETURN_APPROVE",
            "nodeType": "VariableDeclaration",
            "scope": 3260,
            "src": "1344:109:23",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 3101,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1344:6:23",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "417070726f76656420746f6b656e20646f6573206e6f742072657475726e206e756c6c206f722074727565206f6e207375636365737366756c20617070726f76652e",
              "id": 3102,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1385:68:23",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_99d0dda7a6d81737bc992be9cf35fe1c1e8501bdd21bd0dfe88583241e132c2f",
                "typeString": "literal_string \"Approved token does not return null or true on successful approve.\""
              },
              "value": "Approved token does not return null or true on successful approve."
            },
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3119,
              "nodeType": "Block",
              "src": "1660:70:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3116,
                        "name": "_ownerAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3107,
                        "src": "1709:13:23",
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
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 3113,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3105,
                            "src": "1684:13:23",
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
                          "id": 3112,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4417,
                          "src": "1677:6:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$4417_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 3114,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1677:21:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$4417",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 3115,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4384,
                      "src": "1677:31:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) view external returns (uint256)"
                      }
                    },
                    "id": 3117,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1677:46:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3111,
                  "id": 3118,
                  "nodeType": "Return",
                  "src": "1670:53:23"
                }
              ]
            },
            "documentation": null,
            "id": 3120,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3108,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3105,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3120,
                  "src": "1541:21:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3104,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1541:7:23",
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
                  "id": 3107,
                  "name": "_ownerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3120,
                  "src": "1572:21:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3106,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1572:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1531:68:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3111,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3110,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3120,
                  "src": "1647:7:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3109,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1647:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1646:9:23"
            },
            "scope": 3260,
            "src": "1513:217:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3139,
              "nodeType": "Block",
              "src": "1907:78:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3135,
                        "name": "_tokenOwner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3124,
                        "src": "1956:11:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3136,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3126,
                        "src": "1969:8:23",
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
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 3132,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3122,
                            "src": "1931:13:23",
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
                          "id": 3131,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4417,
                          "src": "1924:6:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$4417_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 3133,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1924:21:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$4417",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 3134,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "allowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4393,
                      "src": "1924:31:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view external returns (uint256)"
                      }
                    },
                    "id": 3137,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1924:54:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3130,
                  "id": 3138,
                  "nodeType": "Return",
                  "src": "1917:61:23"
                }
              ]
            },
            "documentation": null,
            "id": 3140,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3127,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3122,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3140,
                  "src": "1764:21:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3121,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1764:7:23",
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
                  "id": 3124,
                  "name": "_tokenOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3140,
                  "src": "1795:19:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3123,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1795:7:23",
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
                  "id": 3126,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 3140,
                  "src": "1824:16:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3125,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1824:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1754:92:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3130,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3129,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3140,
                  "src": "1894:7:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3128,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1894:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1893:9:23"
            },
            "scope": 3260,
            "src": "1736:249:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3163,
              "nodeType": "Block",
              "src": "2115:156:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3153,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3144,
                        "src": "2156:3:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3154,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3146,
                        "src": "2161:9:23",
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
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 3150,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3142,
                            "src": "2132:13:23",
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
                          "id": 3149,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4417,
                          "src": "2125:6:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$4417_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 3151,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2125:21:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$4417",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 3152,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4400,
                      "src": "2125:30:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256) external"
                      }
                    },
                    "id": 3155,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2125:46:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3156,
                  "nodeType": "ExpressionStatement",
                  "src": "2125:46:23"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [],
                        "expression": {
                          "argumentTypes": [],
                          "id": 3158,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3259,
                          "src": "2203:12:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 3159,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2203:14:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3160,
                        "name": "INVALID_RETURN_TRANSFER",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3097,
                        "src": "2231:23:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 3157,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "2182:7:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3161,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2182:82:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3162,
                  "nodeType": "ExpressionStatement",
                  "src": "2182:82:23"
                }
              ]
            },
            "documentation": null,
            "id": 3164,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3147,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3142,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3164,
                  "src": "2018:21:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3141,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2018:7:23",
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
                  "id": 3144,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3164,
                  "src": "2049:11:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3143,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2049:7:23",
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
                  "id": 3146,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3164,
                  "src": "2070:17:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3145,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2070:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2008:85:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3148,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2115:0:23"
            },
            "scope": 3260,
            "src": "1991:280:23",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3190,
              "nodeType": "Block",
              "src": "2428:171:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3179,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3168,
                        "src": "2473:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3180,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3170,
                        "src": "2480:3:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3181,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3172,
                        "src": "2485:9:23",
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
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 3176,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3166,
                            "src": "2445:13:23",
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
                          "id": 3175,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4417,
                          "src": "2438:6:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$4417_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 3177,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2438:21:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$4417",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 3178,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferFrom",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4409,
                      "src": "2438:34:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 3182,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2438:57:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3183,
                  "nodeType": "ExpressionStatement",
                  "src": "2438:57:23"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [],
                        "expression": {
                          "argumentTypes": [],
                          "id": 3185,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3259,
                          "src": "2527:12:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 3186,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2527:14:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3187,
                        "name": "INVALID_RETURN_TRANSFERFROM",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3100,
                        "src": "2555:27:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 3184,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "2506:7:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3188,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2506:86:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3189,
                  "nodeType": "ExpressionStatement",
                  "src": "2506:86:23"
                }
              ]
            },
            "documentation": null,
            "id": 3191,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3173,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3166,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3191,
                  "src": "2308:21:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3165,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2308:7:23",
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
                  "id": 3168,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3191,
                  "src": "2339:13:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3167,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2339:7:23",
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
                  "id": 3170,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3191,
                  "src": "2362:11:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3169,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2362:7:23",
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
                  "id": 3172,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3191,
                  "src": "2383:17:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3171,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2383:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2298:108:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3174,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2428:0:23"
            },
            "scope": 3260,
            "src": "2277:322:23",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3214,
              "nodeType": "Block",
              "src": "2733:163:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3204,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3195,
                        "src": "2773:8:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3205,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3197,
                        "src": "2783:9:23",
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
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 3201,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3193,
                            "src": "2750:13:23",
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
                          "id": 3200,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4417,
                          "src": "2743:6:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$4417_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 3202,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2743:21:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$4417",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 3203,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "approve",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4416,
                      "src": "2743:29:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256) external"
                      }
                    },
                    "id": 3206,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2743:50:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3207,
                  "nodeType": "ExpressionStatement",
                  "src": "2743:50:23"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [],
                        "expression": {
                          "argumentTypes": [],
                          "id": 3209,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3259,
                          "src": "2829:12:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 3210,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2829:14:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3211,
                        "name": "INVALID_RETURN_APPROVE",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3103,
                        "src": "2857:22:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 3208,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "2808:7:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3212,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2808:81:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3213,
                  "nodeType": "ExpressionStatement",
                  "src": "2808:81:23"
                }
              ]
            },
            "documentation": null,
            "id": 3215,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3198,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3193,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3215,
                  "src": "2631:21:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3192,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2631:7:23",
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
                  "id": 3195,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 3215,
                  "src": "2662:16:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3194,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2662:7:23",
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
                  "id": 3197,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3215,
                  "src": "2688:17:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3196,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2688:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2621:90:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3199,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2733:0:23"
            },
            "scope": 3260,
            "src": "2605:291:23",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3243,
              "nodeType": "Block",
              "src": "3054:206:23",
              "statements": [
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3232,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 3227,
                          "name": "_token",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3217,
                          "src": "3078:6:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 3228,
                          "name": "_owner",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3219,
                          "src": "3086:6:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 3229,
                          "name": "_spender",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3221,
                          "src": "3094:8:23",
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
                          },
                          {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        ],
                        "id": 3226,
                        "name": "allowance",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3140,
                        "src": "3068:9:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_view$_t_address_$_t_address_$_t_address_$returns$_t_uint256_$",
                          "typeString": "function (address,address,address) view returns (uint256)"
                        }
                      },
                      "id": 3230,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "3068:35:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 3231,
                      "name": "_quantity",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3223,
                      "src": "3106:9:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3068:47:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": null,
                  "id": 3242,
                  "nodeType": "IfStatement",
                  "src": "3064:190:23",
                  "trueBody": {
                    "id": 3241,
                    "nodeType": "Block",
                    "src": "3117:137:23",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 3234,
                              "name": "_token",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3217,
                              "src": "3156:6:23",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 3235,
                              "name": "_spender",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3221,
                              "src": "3180:8:23",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "arguments": [],
                              "expression": {
                                "argumentTypes": [],
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 3236,
                                  "name": "CommonMath",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 4375,
                                  "src": "3206:10:23",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_CommonMath_$4375_$",
                                    "typeString": "type(library CommonMath)"
                                  }
                                },
                                "id": 3237,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "maxUInt256",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 4374,
                                "src": "3206:21:23",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$__$returns$_t_uint256_$",
                                  "typeString": "function () pure returns (uint256)"
                                }
                              },
                              "id": 3238,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "3206:23:23",
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
                            "id": 3233,
                            "name": "approve",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3215,
                            "src": "3131:7:23",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,address,uint256)"
                            }
                          },
                          "id": 3239,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3131:112:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 3240,
                        "nodeType": "ExpressionStatement",
                        "src": "3131:112:23"
                      }
                    ]
                  }
                }
              ]
            },
            "documentation": null,
            "id": 3244,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "ensureAllowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3224,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3217,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3244,
                  "src": "2936:14:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3216,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2936:7:23",
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
                  "id": 3219,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3244,
                  "src": "2960:14:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3218,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2960:7:23",
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
                  "id": 3221,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 3244,
                  "src": "2984:16:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3220,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2984:7:23",
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
                  "id": 3223,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3244,
                  "src": "3010:17:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3222,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3010:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2926:107:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3225,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3054:0:23"
            },
            "scope": 3260,
            "src": "2902:358:23",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          },
          {
            "body": {
              "id": 3258,
              "nodeType": "Block",
              "src": "3559:767:23",
              "statements": [
                {
                  "assignments": [
                    3250
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3250,
                      "name": "returnValue",
                      "nodeType": "VariableDeclaration",
                      "scope": 3259,
                      "src": "3599:19:23",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 3249,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "3599:7:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3252,
                  "initialValue": {
                    "argumentTypes": null,
                    "hexValue": "30",
                    "id": 3251,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "number",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "3621:1:23",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_rational_0_by_1",
                      "typeString": "int_const 0"
                    },
                    "value": "0"
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3599:23:23"
                },
                {
                  "externalReferences": [
                    {
                      "returnValue": {
                        "declaration": 3250,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4095:11:23",
                        "valueSize": 1
                      }
                    },
                    {
                      "returnValue": {
                        "declaration": 3250,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3837:11:23",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 3253,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    switch returndatasize()\n    case 0x0 {\n        returnValue := 1\n    }\n    case 0x20 {\n        returndatacopy(0x0, 0x0, 0x20)\n        returnValue := mload(0x0)\n    }\n    default {\n    }\n}",
                  "src": "3633:669:23"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3256,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3254,
                      "name": "returnValue",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3250,
                      "src": "4303:11:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "hexValue": "31",
                      "id": 3255,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "4318:1:23",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_1_by_1",
                        "typeString": "int_const 1"
                      },
                      "value": "1"
                    },
                    "src": "4303:16:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 3248,
                  "id": 3257,
                  "nodeType": "Return",
                  "src": "4296:23:23"
                }
              ]
            },
            "documentation": "Checks the return value of the previous function up to 32 bytes. Returns true if the previous\nfunction returned 0 bytes or 1.",
            "id": 3259,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "checkSuccess",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3245,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3495:7:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3248,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3247,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3259,
                  "src": "3549:4:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3246,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "3549:4:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3548:6:23"
            },
            "scope": 3260,
            "src": "3474:852:23",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 3261,
        "src": "1024:3304:23"
      }
    ],
    "src": "597:3732:23"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-08T01:11:15.197Z"
}