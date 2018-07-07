export const ERC20Wrapper = 
{
  "contractName": "ERC20Wrapper",
  "abi": [],
  "bytecode": "0x604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a165627a7a72305820cef480ec71070fcc1f210a6f6e9313951521ccd61304c0368bf1bd6f7fc4f26c0029",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a165627a7a72305820cef480ec71070fcc1f210a6f6e9313951521ccd61304c0368bf1bd6f7fc4f26c0029",
  "sourceMap": "969:2273:23:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "969:2273:23:-;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { IERC20 } from \"../../lib/IERC20.sol\";\n\n\n/**\n * @title ERC20Wrapper\n * @author Set Protocol\n *\n * This library contains functions for interacting wtih ERC20 tokens, even those not fully compliant.\n * For all functions we will only accept tokens that return a null or true value, any other values will\n * cause the operation to revert.\n */\nlibrary ERC20Wrapper {\n\n    // ============ Constants ============\n\n    string constant INVALID_RETURN_TRANSFER = \"Transferred token does not return null or true on successful transfer.\";\n    string constant INVALID_RETURN_TRANSFERFROM = \"Transferred token does not return null or true on successful transferFrom.\";\n\n    // ============ Internal Functions ============\n\n    function balanceOf(\n        address _tokenAddress,\n        address _ownerAddress\n    )\n        internal\n        view\n        returns (uint256)\n    {\n        return IERC20(_tokenAddress).balanceOf(_ownerAddress);\n    }\n\n    function transfer(\n        address _tokenAddress,\n        address _to,\n        uint256 _quantity\n    )\n        internal\n    {\n        IERC20(_tokenAddress).transfer(_to, _quantity);\n\n        require(\n            checkSuccess(),\n            INVALID_RETURN_TRANSFER\n        );\n    }\n\n    function transferFrom(\n        address _tokenAddress,\n        address _from,\n        address _to,\n        uint256 _quantity\n    )\n        internal\n    {\n        IERC20(_tokenAddress).transferFrom(_from, _to, _quantity);\n\n        require(\n            checkSuccess(),\n            INVALID_RETURN_TRANSFERFROM\n        );\n    }\n\n    // ============ Private Functions ============\n\n    /**\n     * Checks the return value of the previous function up to 32 bytes. Returns true if the previous\n     * function returned 0 bytes or 1.\n     */\n    function checkSuccess(\n    )\n        private\n        pure\n        returns (bool)\n    {\n        // default to failure\n        uint256 returnValue = 0;\n\n        assembly {\n            // check number of bytes returned from last function call\n            switch returndatasize\n\n            // no bytes returned: assume success\n            case 0x0 {\n                returnValue := 1\n            }\n\n            // 32 bytes returned\n            case 0x20 {\n                // copy 32 bytes into scratch space\n                returndatacopy(0x0, 0x0, 0x20)\n\n                // load those bytes into returnValue\n                returnValue := mload(0x0)\n            }\n\n            // not sure what was returned: dont mark as success\n            default { }\n        }\n\n        // check if returned value is one or nothing\n        return returnValue == 1;\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/ERC20Wrapper.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/ERC20Wrapper.sol",
    "exportedSymbols": {
      "ERC20Wrapper": [
        2845
      ]
    },
    "id": 2846,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2753,
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
        "id": 2755,
        "nodeType": "ImportDirective",
        "scope": 2846,
        "sourceUnit": 3349,
        "src": "622:46:23",
        "symbolAliases": [
          {
            "foreign": 2754,
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
        "id": 2845,
        "linearizedBaseContracts": [
          2845
        ],
        "name": "ERC20Wrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 2758,
            "name": "INVALID_RETURN_TRANSFER",
            "nodeType": "VariableDeclaration",
            "scope": 2845,
            "src": "1041:114:23",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2756,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1041:6:23",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5472616e7366657272656420746f6b656e20646f6573206e6f742072657475726e206e756c6c206f722074727565206f6e207375636365737366756c207472616e736665722e",
              "id": 2757,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1083:72:23",
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
            "id": 2761,
            "name": "INVALID_RETURN_TRANSFERFROM",
            "nodeType": "VariableDeclaration",
            "scope": 2845,
            "src": "1161:122:23",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2759,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1161:6:23",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5472616e7366657272656420746f6b656e20646f6573206e6f742072657475726e206e756c6c206f722074727565206f6e207375636365737366756c207472616e7366657246726f6d2e",
              "id": 2760,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1207:76:23",
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
            "body": {
              "id": 2777,
              "nodeType": "Block",
              "src": "1490:70:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2774,
                        "name": "_ownerAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2765,
                        "src": "1539:13:23",
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
                            "id": 2771,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2763,
                            "src": "1514:13:23",
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
                          "id": 2770,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3348,
                          "src": "1507:6:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$3348_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 2772,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1507:21:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$3348",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 2773,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3331,
                      "src": "1507:31:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) view external returns (uint256)"
                      }
                    },
                    "id": 2775,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1507:46:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 2769,
                  "id": 2776,
                  "nodeType": "Return",
                  "src": "1500:53:23"
                }
              ]
            },
            "documentation": null,
            "id": 2778,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2766,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2763,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2778,
                  "src": "1371:21:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2762,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1371:7:23",
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
                  "id": 2765,
                  "name": "_ownerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2778,
                  "src": "1402:21:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2764,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1402:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1361:68:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 2769,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2768,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2778,
                  "src": "1477:7:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2767,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1477:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1476:9:23"
            },
            "scope": 2845,
            "src": "1343:217:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2801,
              "nodeType": "Block",
              "src": "1690:156:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2791,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2782,
                        "src": "1731:3:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2792,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2784,
                        "src": "1736:9:23",
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
                            "id": 2788,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2780,
                            "src": "1707:13:23",
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
                          "id": 2787,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3348,
                          "src": "1700:6:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$3348_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 2789,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1700:21:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$3348",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 2790,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3338,
                      "src": "1700:30:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256) external"
                      }
                    },
                    "id": 2793,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1700:46:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2794,
                  "nodeType": "ExpressionStatement",
                  "src": "1700:46:23"
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
                          "id": 2796,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2844,
                          "src": "1778:12:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 2797,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1778:14:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2798,
                        "name": "INVALID_RETURN_TRANSFER",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2758,
                        "src": "1806:23:23",
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
                      "id": 2795,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "1757:7:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2799,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1757:82:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2800,
                  "nodeType": "ExpressionStatement",
                  "src": "1757:82:23"
                }
              ]
            },
            "documentation": null,
            "id": 2802,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2785,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2780,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2802,
                  "src": "1593:21:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2779,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1593:7:23",
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
                  "id": 2782,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 2802,
                  "src": "1624:11:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2781,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1624:7:23",
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
                  "id": 2784,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2802,
                  "src": "1645:17:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2783,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1645:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1583:85:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 2786,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1690:0:23"
            },
            "scope": 2845,
            "src": "1566:280:23",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2828,
              "nodeType": "Block",
              "src": "2003:171:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2817,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2806,
                        "src": "2048:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2818,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2808,
                        "src": "2055:3:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2819,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2810,
                        "src": "2060:9:23",
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
                            "id": 2814,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2804,
                            "src": "2020:13:23",
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
                          "id": 2813,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3348,
                          "src": "2013:6:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$3348_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 2815,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2013:21:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$3348",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 2816,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferFrom",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3347,
                      "src": "2013:34:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 2820,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2013:57:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2821,
                  "nodeType": "ExpressionStatement",
                  "src": "2013:57:23"
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
                          "id": 2823,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2844,
                          "src": "2102:12:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 2824,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2102:14:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2825,
                        "name": "INVALID_RETURN_TRANSFERFROM",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2761,
                        "src": "2130:27:23",
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
                      "id": 2822,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "2081:7:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2826,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2081:86:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2827,
                  "nodeType": "ExpressionStatement",
                  "src": "2081:86:23"
                }
              ]
            },
            "documentation": null,
            "id": 2829,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2811,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2804,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2829,
                  "src": "1883:21:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2803,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1883:7:23",
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
                  "id": 2806,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 2829,
                  "src": "1914:13:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2805,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1914:7:23",
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
                  "id": 2808,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 2829,
                  "src": "1937:11:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2807,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1937:7:23",
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
                  "id": 2810,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2829,
                  "src": "1958:17:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2809,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1958:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1873:108:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 2812,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2003:0:23"
            },
            "scope": 2845,
            "src": "1852:322:23",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2843,
              "nodeType": "Block",
              "src": "2473:767:23",
              "statements": [
                {
                  "assignments": [
                    2835
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2835,
                      "name": "returnValue",
                      "nodeType": "VariableDeclaration",
                      "scope": 2844,
                      "src": "2513:19:23",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2834,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "2513:7:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2837,
                  "initialValue": {
                    "argumentTypes": null,
                    "hexValue": "30",
                    "id": 2836,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "number",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "2535:1:23",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_rational_0_by_1",
                      "typeString": "int_const 0"
                    },
                    "value": "0"
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2513:23:23"
                },
                {
                  "externalReferences": [
                    {
                      "returnValue": {
                        "declaration": 2835,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3009:11:23",
                        "valueSize": 1
                      }
                    },
                    {
                      "returnValue": {
                        "declaration": 2835,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "2751:11:23",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 2838,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    switch returndatasize()\n    case 0x0 {\n        returnValue := 1\n    }\n    case 0x20 {\n        returndatacopy(0x0, 0x0, 0x20)\n        returnValue := mload(0x0)\n    }\n    default {\n    }\n}",
                  "src": "2547:669:23"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 2841,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 2839,
                      "name": "returnValue",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2835,
                      "src": "3217:11:23",
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
                      "id": 2840,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3232:1:23",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_1_by_1",
                        "typeString": "int_const 1"
                      },
                      "value": "1"
                    },
                    "src": "3217:16:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 2833,
                  "id": 2842,
                  "nodeType": "Return",
                  "src": "3210:23:23"
                }
              ]
            },
            "documentation": "Checks the return value of the previous function up to 32 bytes. Returns true if the previous\nfunction returned 0 bytes or 1.",
            "id": 2844,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "checkSuccess",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2830,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2409:7:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 2833,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2832,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2844,
                  "src": "2463:4:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 2831,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "2463:4:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2462:6:23"
            },
            "scope": 2845,
            "src": "2388:852:23",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 2846,
        "src": "969:2273:23"
      }
    ],
    "src": "597:2646:23"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/ERC20Wrapper.sol",
    "exportedSymbols": {
      "ERC20Wrapper": [
        2845
      ]
    },
    "id": 2846,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2753,
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
        "id": 2755,
        "nodeType": "ImportDirective",
        "scope": 2846,
        "sourceUnit": 3349,
        "src": "622:46:23",
        "symbolAliases": [
          {
            "foreign": 2754,
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
        "id": 2845,
        "linearizedBaseContracts": [
          2845
        ],
        "name": "ERC20Wrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 2758,
            "name": "INVALID_RETURN_TRANSFER",
            "nodeType": "VariableDeclaration",
            "scope": 2845,
            "src": "1041:114:23",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2756,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1041:6:23",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5472616e7366657272656420746f6b656e20646f6573206e6f742072657475726e206e756c6c206f722074727565206f6e207375636365737366756c207472616e736665722e",
              "id": 2757,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1083:72:23",
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
            "id": 2761,
            "name": "INVALID_RETURN_TRANSFERFROM",
            "nodeType": "VariableDeclaration",
            "scope": 2845,
            "src": "1161:122:23",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2759,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1161:6:23",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5472616e7366657272656420746f6b656e20646f6573206e6f742072657475726e206e756c6c206f722074727565206f6e207375636365737366756c207472616e7366657246726f6d2e",
              "id": 2760,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1207:76:23",
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
            "body": {
              "id": 2777,
              "nodeType": "Block",
              "src": "1490:70:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2774,
                        "name": "_ownerAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2765,
                        "src": "1539:13:23",
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
                            "id": 2771,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2763,
                            "src": "1514:13:23",
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
                          "id": 2770,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3348,
                          "src": "1507:6:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$3348_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 2772,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1507:21:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$3348",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 2773,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3331,
                      "src": "1507:31:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) view external returns (uint256)"
                      }
                    },
                    "id": 2775,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1507:46:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 2769,
                  "id": 2776,
                  "nodeType": "Return",
                  "src": "1500:53:23"
                }
              ]
            },
            "documentation": null,
            "id": 2778,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2766,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2763,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2778,
                  "src": "1371:21:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2762,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1371:7:23",
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
                  "id": 2765,
                  "name": "_ownerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2778,
                  "src": "1402:21:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2764,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1402:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1361:68:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 2769,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2768,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2778,
                  "src": "1477:7:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2767,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1477:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1476:9:23"
            },
            "scope": 2845,
            "src": "1343:217:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2801,
              "nodeType": "Block",
              "src": "1690:156:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2791,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2782,
                        "src": "1731:3:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2792,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2784,
                        "src": "1736:9:23",
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
                            "id": 2788,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2780,
                            "src": "1707:13:23",
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
                          "id": 2787,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3348,
                          "src": "1700:6:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$3348_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 2789,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1700:21:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$3348",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 2790,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3338,
                      "src": "1700:30:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256) external"
                      }
                    },
                    "id": 2793,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1700:46:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2794,
                  "nodeType": "ExpressionStatement",
                  "src": "1700:46:23"
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
                          "id": 2796,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2844,
                          "src": "1778:12:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 2797,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1778:14:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2798,
                        "name": "INVALID_RETURN_TRANSFER",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2758,
                        "src": "1806:23:23",
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
                      "id": 2795,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "1757:7:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2799,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1757:82:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2800,
                  "nodeType": "ExpressionStatement",
                  "src": "1757:82:23"
                }
              ]
            },
            "documentation": null,
            "id": 2802,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2785,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2780,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2802,
                  "src": "1593:21:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2779,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1593:7:23",
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
                  "id": 2782,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 2802,
                  "src": "1624:11:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2781,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1624:7:23",
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
                  "id": 2784,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2802,
                  "src": "1645:17:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2783,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1645:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1583:85:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 2786,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1690:0:23"
            },
            "scope": 2845,
            "src": "1566:280:23",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2828,
              "nodeType": "Block",
              "src": "2003:171:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2817,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2806,
                        "src": "2048:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2818,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2808,
                        "src": "2055:3:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2819,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2810,
                        "src": "2060:9:23",
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
                            "id": 2814,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2804,
                            "src": "2020:13:23",
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
                          "id": 2813,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3348,
                          "src": "2013:6:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$3348_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 2815,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2013:21:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$3348",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 2816,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferFrom",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3347,
                      "src": "2013:34:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 2820,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2013:57:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2821,
                  "nodeType": "ExpressionStatement",
                  "src": "2013:57:23"
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
                          "id": 2823,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2844,
                          "src": "2102:12:23",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 2824,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2102:14:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2825,
                        "name": "INVALID_RETURN_TRANSFERFROM",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2761,
                        "src": "2130:27:23",
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
                      "id": 2822,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "2081:7:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2826,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2081:86:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2827,
                  "nodeType": "ExpressionStatement",
                  "src": "2081:86:23"
                }
              ]
            },
            "documentation": null,
            "id": 2829,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2811,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2804,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2829,
                  "src": "1883:21:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2803,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1883:7:23",
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
                  "id": 2806,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 2829,
                  "src": "1914:13:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2805,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1914:7:23",
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
                  "id": 2808,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 2829,
                  "src": "1937:11:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2807,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1937:7:23",
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
                  "id": 2810,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2829,
                  "src": "1958:17:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2809,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1958:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1873:108:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 2812,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2003:0:23"
            },
            "scope": 2845,
            "src": "1852:322:23",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2843,
              "nodeType": "Block",
              "src": "2473:767:23",
              "statements": [
                {
                  "assignments": [
                    2835
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2835,
                      "name": "returnValue",
                      "nodeType": "VariableDeclaration",
                      "scope": 2844,
                      "src": "2513:19:23",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2834,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "2513:7:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2837,
                  "initialValue": {
                    "argumentTypes": null,
                    "hexValue": "30",
                    "id": 2836,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "number",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "2535:1:23",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_rational_0_by_1",
                      "typeString": "int_const 0"
                    },
                    "value": "0"
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2513:23:23"
                },
                {
                  "externalReferences": [
                    {
                      "returnValue": {
                        "declaration": 2835,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3009:11:23",
                        "valueSize": 1
                      }
                    },
                    {
                      "returnValue": {
                        "declaration": 2835,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "2751:11:23",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 2838,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    switch returndatasize()\n    case 0x0 {\n        returnValue := 1\n    }\n    case 0x20 {\n        returndatacopy(0x0, 0x0, 0x20)\n        returnValue := mload(0x0)\n    }\n    default {\n    }\n}",
                  "src": "2547:669:23"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 2841,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 2839,
                      "name": "returnValue",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2835,
                      "src": "3217:11:23",
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
                      "id": 2840,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3232:1:23",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_1_by_1",
                        "typeString": "int_const 1"
                      },
                      "value": "1"
                    },
                    "src": "3217:16:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 2833,
                  "id": 2842,
                  "nodeType": "Return",
                  "src": "3210:23:23"
                }
              ]
            },
            "documentation": "Checks the return value of the previous function up to 32 bytes. Returns true if the previous\nfunction returned 0 bytes or 1.",
            "id": 2844,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "checkSuccess",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2830,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2409:7:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 2833,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2832,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2844,
                  "src": "2463:4:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 2831,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "2463:4:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2462:6:23"
            },
            "scope": 2845,
            "src": "2388:852:23",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 2846,
        "src": "969:2273:23"
      }
    ],
    "src": "597:2646:23"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-07T07:45:08.905Z"
}