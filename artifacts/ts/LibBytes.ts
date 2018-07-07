export const LibBytes = 
{
  "contractName": "LibBytes",
  "abi": [],
  "bytecode": "0x604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a165627a7a723058206cb9a05f48382d6e69ab5a59af18a419ff3ba1f4cf32b4f00a74ad1facb9b30e0029",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a165627a7a723058206cb9a05f48382d6e69ab5a59af18a419ff3ba1f4cf32b4f00a74ad1facb9b30e0029",
  "sourceMap": "601:6649:26:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "601:6649:26:-;;;;;;;;",
  "source": "/*\n  Copyright 2018 ZeroEx Intl.\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n    http://www.apache.org/licenses/LICENSE-2.0\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n*/\n\npragma solidity ^0.4.24;\n\nlibrary LibBytes {\n\n    using LibBytes for bytes;\n\n    /// @dev Gets the memory address for the contents of a byte array.\n    /// @param input Byte array to lookup.\n    /// @return memoryAddress Memory address of the contents of the byte array.\n    function contentAddress(bytes memory input)\n        internal\n        pure\n        returns (uint256 memoryAddress)\n    {\n        assembly {\n            memoryAddress := add(input, 32)\n        }\n        return memoryAddress;\n    }\n\n\n    /// @dev Reads a bytes32 value from a position in a byte array.\n    /// @param b Byte array containing a bytes32 value.\n    /// @param index Index in byte array of bytes32 value.\n    /// @return bytes32 value from byte array.\n    function readBytes32(\n        bytes memory b,\n        uint256 index\n    )\n        internal\n        pure\n        returns (bytes32 result)\n    {\n        require(\n            b.length >= index + 32,\n            \"GREATER_OR_EQUAL_TO_32_LENGTH_REQUIRED\"\n        );\n\n        // Arrays are prefixed by a 256 bit length parameter\n        index += 32;\n\n        // Read the bytes32 from array memory\n        assembly {\n            result := mload(add(b, index))\n        }\n        return result;\n    }\n\n    /// @dev Copies `length` bytes from memory location `source` to `dest`.\n    /// @param dest memory address to copy bytes to.\n    /// @param source memory address to copy bytes from.\n    /// @param length number of bytes to copy.\n    function memCopy(\n        uint256 dest,\n        uint256 source,\n        uint256 length\n    )\n        internal\n        pure\n    {\n        if (length < 32) {\n            // Handle a partial word by reading destination and masking\n            // off the bits we are interested in.\n            // This correctly handles overlap, zero lengths and source == dest\n            assembly {\n                let mask := sub(exp(256, sub(32, length)), 1)\n                let s := and(mload(source), not(mask))\n                let d := and(mload(dest), mask)\n                mstore(dest, or(s, d))\n            }\n        } else {\n            // Skip the O(length) loop when source == dest.\n            if (source == dest) {\n                return;\n            }\n\n            // For large copies we copy whole words at a time. The final\n            // word is aligned to the end of the range (instead of after the\n            // previous) to handle partial words. So a copy will look like this:\n            //\n            //  ####\n            //      ####\n            //          ####\n            //            ####\n            //\n            // We handle overlap in the source and destination range by\n            // changing the copying direction. This prevents us from\n            // overwriting parts of source that we still need to copy.\n            //\n            // This correctly handles source == dest\n            //\n            if (source > dest) {\n                assembly {\n                    // We subtract 32 from `sEnd` and `dEnd` because it\n                    // is easier to compare with in the loop, and these\n                    // are also the addresses we need for copying the\n                    // last bytes.\n                    length := sub(length, 32)\n                    let sEnd := add(source, length)\n                    let dEnd := add(dest, length)\n\n                    // Remember the last 32 bytes of source\n                    // This needs to be done here and not after the loop\n                    // because we may have overwritten the last bytes in\n                    // source already due to overlap.\n                    let last := mload(sEnd)\n\n                    // Copy whole words front to back\n                    // Note: the first check is always true,\n                    // this could have been a do-while loop.\n                    for {} lt(source, sEnd) {} {\n                        mstore(dest, mload(source))\n                        source := add(source, 32)\n                        dest := add(dest, 32)\n                    }\n                    \n                    // Write the last 32 bytes\n                    mstore(dEnd, last)\n                }\n            } else {\n                assembly {\n                    // We subtract 32 from `sEnd` and `dEnd` because those\n                    // are the starting points when copying a word at the end.\n                    length := sub(length, 32)\n                    let sEnd := add(source, length)\n                    let dEnd := add(dest, length)\n\n                    // Remember the first 32 bytes of source\n                    // This needs to be done here and not after the loop\n                    // because we may have overwritten the first bytes in\n                    // source already due to overlap.\n                    let first := mload(source)\n\n                    // Copy whole words back to front\n                    // We use a signed comparisson here to allow dEnd to become\n                    // negative (happens when source and dest < 32). Valid\n                    // addresses in local memory will never be larger than\n                    // 2**255, so they can be safely re-interpreted as signed.\n                    // Note: the first check is always true,\n                    // this could have been a do-while loop.\n                    for {} slt(dest, dEnd) {} {\n                        mstore(dEnd, mload(sEnd))\n                        sEnd := sub(sEnd, 32)\n                        dEnd := sub(dEnd, 32)\n                    }\n                    \n                    // Write the first 32 bytes\n                    mstore(dest, first)\n                }\n            }\n        }\n    }\n    \n    /// @dev Returns a slices from a byte array.\n    /// @param b The byte array to take a slice from.\n    /// @param from The starting index for the slice (inclusive).\n    /// @param to The final index for the slice (exclusive).\n    /// @return result The slice containing bytes at indices [from, to)\n    function slice(bytes memory b, uint256 from, uint256 to)\n        internal\n        pure\n        returns (bytes memory result)\n    {\n        require(\n            from <= to,\n            \"FROM_LESS_THAN_TO_REQUIRED\"\n        );\n        require(\n            // NOTE: Set Protocol changed from `to < b.length` so that the last byte can be sliced off\n            to <= b.length,\n            \"TO_LESS_THAN_LENGTH_REQUIRED\"\n        );\n        \n        // Create a new bytes structure and copy contents\n        result = new bytes(to - from);\n        memCopy(\n            result.contentAddress(),\n            b.contentAddress() + from,\n            result.length);\n        return result;\n    }    \n}",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/LibBytes.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/LibBytes.sol",
    "exportedSymbols": {
      "LibBytes": [
        3107
      ]
    },
    "id": 3108,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2983,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "575:24:26"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": null,
        "fullyImplemented": true,
        "id": 3107,
        "linearizedBaseContracts": [
          3107
        ],
        "name": "LibBytes",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 2986,
            "libraryName": {
              "contractScope": null,
              "id": 2984,
              "name": "LibBytes",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3107,
              "src": "631:8:26",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibBytes_$3107",
                "typeString": "library LibBytes"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "625:25:26",
            "typeName": {
              "id": 2985,
              "name": "bytes",
              "nodeType": "ElementaryTypeName",
              "src": "644:5:26",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes_storage_ptr",
                "typeString": "bytes"
              }
            }
          },
          {
            "body": {
              "id": 2996,
              "nodeType": "Block",
              "src": "968:110:26",
              "statements": [
                {
                  "externalReferences": [
                    {
                      "memoryAddress": {
                        "declaration": 2991,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1001:13:26",
                        "valueSize": 1
                      }
                    },
                    {
                      "input": {
                        "declaration": 2988,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1022:5:26",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 2993,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    memoryAddress := add(input, 32)\n}",
                  "src": "978:79:26"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2994,
                    "name": "memoryAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2991,
                    "src": "1058:13:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 2992,
                  "id": 2995,
                  "nodeType": "Return",
                  "src": "1051:20:26"
                }
              ]
            },
            "documentation": "@dev Gets the memory address for the contents of a byte array.\n @param input Byte array to lookup.\n @return memoryAddress Memory address of the contents of the byte array.",
            "id": 2997,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "contentAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2989,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2988,
                  "name": "input",
                  "nodeType": "VariableDeclaration",
                  "scope": 2997,
                  "src": "874:18:26",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2987,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "874:5:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "873:20:26"
            },
            "payable": false,
            "returnParameters": {
              "id": 2992,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2991,
                  "name": "memoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2997,
                  "src": "941:21:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2990,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "941:7:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "940:23:26"
            },
            "scope": 3107,
            "src": "850:228:26",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3023,
              "nodeType": "Block",
              "src": "1456:349:26",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 3012,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 3007,
                            "name": "b",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2999,
                            "src": "1487:1:26",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 3008,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "1487:8:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 3011,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3009,
                            "name": "index",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3001,
                            "src": "1499:5:26",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "+",
                          "rightExpression": {
                            "argumentTypes": null,
                            "hexValue": "3332",
                            "id": 3010,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "1507:2:26",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_32_by_1",
                              "typeString": "int_const 32"
                            },
                            "value": "32"
                          },
                          "src": "1499:10:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "1487:22:26",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "475245415445525f4f525f455155414c5f544f5f33325f4c454e4754485f5245515549524544",
                        "id": 3013,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1523:40:26",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_41046b31734c52276370384fb83a6ed9556edf77c382e1949fa233dc03b3aa40",
                          "typeString": "literal_string \"GREATER_OR_EQUAL_TO_32_LENGTH_REQUIRED\""
                        },
                        "value": "GREATER_OR_EQUAL_TO_32_LENGTH_REQUIRED"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_41046b31734c52276370384fb83a6ed9556edf77c382e1949fa233dc03b3aa40",
                          "typeString": "literal_string \"GREATER_OR_EQUAL_TO_32_LENGTH_REQUIRED\""
                        }
                      ],
                      "id": 3006,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "1466:7:26",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3014,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1466:107:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3015,
                  "nodeType": "ExpressionStatement",
                  "src": "1466:107:26"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3018,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 3016,
                      "name": "index",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3001,
                      "src": "1645:5:26",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "+=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "3332",
                      "id": 3017,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1654:2:26",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_32_by_1",
                        "typeString": "int_const 32"
                      },
                      "value": "32"
                    },
                    "src": "1645:11:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 3019,
                  "nodeType": "ExpressionStatement",
                  "src": "1645:11:26"
                },
                {
                  "externalReferences": [
                    {
                      "result": {
                        "declaration": 3004,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1736:6:26",
                        "valueSize": 1
                      }
                    },
                    {
                      "b": {
                        "declaration": 2999,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1756:1:26",
                        "valueSize": 1
                      }
                    },
                    {
                      "index": {
                        "declaration": 3001,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1759:5:26",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 3020,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    result := mload(add(b, index))\n}",
                  "src": "1713:78:26"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3021,
                    "name": "result",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3004,
                    "src": "1792:6:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 3005,
                  "id": 3022,
                  "nodeType": "Return",
                  "src": "1785:13:26"
                }
              ]
            },
            "documentation": "@dev Reads a bytes32 value from a position in a byte array.\n @param b Byte array containing a bytes32 value.\n @param index Index in byte array of bytes32 value.\n @return bytes32 value from byte array.",
            "id": 3024,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "readBytes32",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3002,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2999,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3024,
                  "src": "1345:14:26",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2998,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1345:5:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3001,
                  "name": "index",
                  "nodeType": "VariableDeclaration",
                  "scope": 3024,
                  "src": "1369:13:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3000,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1369:7:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1335:53:26"
            },
            "payable": false,
            "returnParameters": {
              "id": 3005,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3004,
                  "name": "result",
                  "nodeType": "VariableDeclaration",
                  "scope": 3024,
                  "src": "1436:14:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3003,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1436:7:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1435:16:26"
            },
            "scope": 3107,
            "src": "1315:490:26",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3054,
              "nodeType": "Block",
              "src": "2171:4080:26",
              "statements": [
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3035,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3033,
                      "name": "length",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3030,
                      "src": "2185:6:26",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "hexValue": "3332",
                      "id": 3034,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2194:2:26",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_32_by_1",
                        "typeString": "int_const 32"
                      },
                      "value": "32"
                    },
                    "src": "2185:11:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": {
                    "id": 3052,
                    "nodeType": "Block",
                    "src": "2657:3588:26",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 3040,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3038,
                            "name": "source",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3028,
                            "src": "2735:6:26",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 3039,
                            "name": "dest",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3026,
                            "src": "2745:4:26",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "2735:14:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 3043,
                        "nodeType": "IfStatement",
                        "src": "2731:59:26",
                        "trueBody": {
                          "id": 3042,
                          "nodeType": "Block",
                          "src": "2751:39:26",
                          "statements": [
                            {
                              "expression": null,
                              "functionReturnParameters": 3032,
                              "id": 3041,
                              "nodeType": "Return",
                              "src": "2769:7:26"
                            }
                          ]
                        }
                      },
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 3046,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3044,
                            "name": "source",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3028,
                            "src": "3470:6:26",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": ">",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 3045,
                            "name": "dest",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3026,
                            "src": "3479:4:26",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "3470:13:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": {
                          "id": 3050,
                          "nodeType": "Block",
                          "src": "4756:1479:26",
                          "statements": [
                            {
                              "externalReferences": [
                                {
                                  "length": {
                                    "declaration": 3030,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4973:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3030,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4959:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3028,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5021:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3030,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5029:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3028,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5389:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3026,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5073:4:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3030,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5079:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3026,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5914:4:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3026,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "6191:4:26",
                                    "valueSize": 1
                                  }
                                }
                              ],
                              "id": 3049,
                              "nodeType": "InlineAssembly",
                              "operations": "{\n    length := sub(length, 32)\n    let sEnd := add(source, length)\n    let dEnd := add(dest, length)\n    let first := mload(source)\n    for {\n    }\n    slt(dest, dEnd)\n    {\n    }\n    {\n        mstore(dEnd, mload(sEnd))\n        sEnd := sub(sEnd, 32)\n        dEnd := sub(dEnd, 32)\n    }\n    mstore(dest, first)\n}",
                              "src": "4774:1461:26"
                            }
                          ]
                        },
                        "id": 3051,
                        "nodeType": "IfStatement",
                        "src": "3466:2769:26",
                        "trueBody": {
                          "id": 3048,
                          "nodeType": "Block",
                          "src": "3485:1265:26",
                          "statements": [
                            {
                              "externalReferences": [
                                {
                                  "length": {
                                    "declaration": 3030,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "3783:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3030,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "3797:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3028,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "3845:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3030,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "3853:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3028,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4423:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3026,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "3897:4:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3030,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "3903:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3026,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4473:4:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3028,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4485:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3028,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4518:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3026,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4568:4:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3028,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4532:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3026,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4580:4:26",
                                    "valueSize": 1
                                  }
                                }
                              ],
                              "id": 3047,
                              "nodeType": "InlineAssembly",
                              "operations": "{\n    length := sub(length, 32)\n    let sEnd := add(source, length)\n    let dEnd := add(dest, length)\n    let last := mload(sEnd)\n    for {\n    }\n    lt(source, sEnd)\n    {\n    }\n    {\n        mstore(dest, mload(source))\n        source := add(source, 32)\n        dest := add(dest, 32)\n    }\n    mstore(dEnd, last)\n}",
                              "src": "3503:1247:26"
                            }
                          ]
                        }
                      }
                    ]
                  },
                  "id": 3053,
                  "nodeType": "IfStatement",
                  "src": "2181:4064:26",
                  "trueBody": {
                    "id": 3037,
                    "nodeType": "Block",
                    "src": "2198:453:26",
                    "statements": [
                      {
                        "externalReferences": [
                          {
                            "length": {
                              "declaration": 3030,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "2473:6:26",
                              "valueSize": 1
                            }
                          },
                          {
                            "dest": {
                              "declaration": 3026,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "2576:4:26",
                              "valueSize": 1
                            }
                          },
                          {
                            "source": {
                              "declaration": 3028,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "2521:6:26",
                              "valueSize": 1
                            }
                          },
                          {
                            "dest": {
                              "declaration": 3026,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "2612:4:26",
                              "valueSize": 1
                            }
                          }
                        ],
                        "id": 3036,
                        "nodeType": "InlineAssembly",
                        "operations": "{\n    let mask := sub(exp(256, sub(32, length)), 1)\n    let s := and(mload(source), not(mask))\n    let d := and(mload(dest), mask)\n    mstore(dest, or(s, d))\n}",
                        "src": "2413:238:26"
                      }
                    ]
                  }
                }
              ]
            },
            "documentation": "@dev Copies `length` bytes from memory location `source` to `dest`.\n @param dest memory address to copy bytes to.\n @param source memory address to copy bytes from.\n @param length number of bytes to copy.",
            "id": 3055,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "memCopy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3031,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3026,
                  "name": "dest",
                  "nodeType": "VariableDeclaration",
                  "scope": 3055,
                  "src": "2070:12:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3025,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2070:7:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3028,
                  "name": "source",
                  "nodeType": "VariableDeclaration",
                  "scope": 3055,
                  "src": "2092:14:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3027,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2092:7:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3030,
                  "name": "length",
                  "nodeType": "VariableDeclaration",
                  "scope": 3055,
                  "src": "2116:14:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3029,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2116:7:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2060:76:26"
            },
            "payable": false,
            "returnParameters": {
              "id": 3032,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2171:0:26"
            },
            "scope": 3107,
            "src": "2044:4207:26",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3105,
              "nodeType": "Block",
              "src": "6692:552:26",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 3069,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 3067,
                          "name": "from",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3059,
                          "src": "6723:4:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 3068,
                          "name": "to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3061,
                          "src": "6731:2:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "6723:10:26",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "46524f4d5f4c4553535f5448414e5f544f5f5245515549524544",
                        "id": 3070,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "6747:28:26",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_1b95cec571d66445cedbd96155c82949976c614b261f1c5fe27223590583fd4f",
                          "typeString": "literal_string \"FROM_LESS_THAN_TO_REQUIRED\""
                        },
                        "value": "FROM_LESS_THAN_TO_REQUIRED"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_1b95cec571d66445cedbd96155c82949976c614b261f1c5fe27223590583fd4f",
                          "typeString": "literal_string \"FROM_LESS_THAN_TO_REQUIRED\""
                        }
                      ],
                      "id": 3066,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "6702:7:26",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3071,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6702:83:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3072,
                  "nodeType": "ExpressionStatement",
                  "src": "6702:83:26"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 3077,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 3074,
                          "name": "to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3061,
                          "src": "6919:2:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 3075,
                            "name": "b",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3057,
                            "src": "6925:1:26",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 3076,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "6925:8:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "6919:14:26",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "544f5f4c4553535f5448414e5f4c454e4754485f5245515549524544",
                        "id": 3078,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "6947:30:26",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_22dab502afcaac39972ef428907ba5ff6a51956bfa1c4002b6aa8a752256c29a",
                          "typeString": "literal_string \"TO_LESS_THAN_LENGTH_REQUIRED\""
                        },
                        "value": "TO_LESS_THAN_LENGTH_REQUIRED"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_22dab502afcaac39972ef428907ba5ff6a51956bfa1c4002b6aa8a752256c29a",
                          "typeString": "literal_string \"TO_LESS_THAN_LENGTH_REQUIRED\""
                        }
                      ],
                      "id": 3073,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "6795:7:26",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3079,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6795:192:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3080,
                  "nodeType": "ExpressionStatement",
                  "src": "6795:192:26"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3088,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 3081,
                      "name": "result",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3064,
                      "src": "7064:6:26",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 3086,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3084,
                            "name": "to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3061,
                            "src": "7083:2:26",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "-",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 3085,
                            "name": "from",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3059,
                            "src": "7088:4:26",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "7083:9:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        ],
                        "id": 3083,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "lValueRequested": false,
                        "nodeType": "NewExpression",
                        "src": "7073:9:26",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_bytes_memory_$",
                          "typeString": "function (uint256) pure returns (bytes memory)"
                        },
                        "typeName": {
                          "id": 3082,
                          "name": "bytes",
                          "nodeType": "ElementaryTypeName",
                          "src": "7077:5:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_storage_ptr",
                            "typeString": "bytes"
                          }
                        }
                      },
                      "id": 3087,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7073:20:26",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7064:29:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 3089,
                  "nodeType": "ExpressionStatement",
                  "src": "7064:29:26"
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
                          "expression": {
                            "argumentTypes": null,
                            "id": 3091,
                            "name": "result",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3064,
                            "src": "7124:6:26",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 3092,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "contentAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2997,
                          "src": "7124:21:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) pure returns (uint256)"
                          }
                        },
                        "id": 3093,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "7124:23:26",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 3098,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "arguments": [],
                          "expression": {
                            "argumentTypes": [],
                            "expression": {
                              "argumentTypes": null,
                              "id": 3094,
                              "name": "b",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3057,
                              "src": "7161:1:26",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            "id": 3095,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "contentAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2997,
                            "src": "7161:16:26",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory) pure returns (uint256)"
                            }
                          },
                          "id": 3096,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7161:18:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "+",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 3097,
                          "name": "from",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3059,
                          "src": "7182:4:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "7161:25:26",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 3099,
                          "name": "result",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3064,
                          "src": "7200:6:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 3100,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "length",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "7200:13:26",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 3090,
                      "name": "memCopy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3055,
                      "src": "7103:7:26",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$_t_uint256_$returns$__$",
                        "typeString": "function (uint256,uint256,uint256) pure"
                      }
                    },
                    "id": 3101,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7103:111:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3102,
                  "nodeType": "ExpressionStatement",
                  "src": "7103:111:26"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3103,
                    "name": "result",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3064,
                    "src": "7231:6:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 3065,
                  "id": 3104,
                  "nodeType": "Return",
                  "src": "7224:13:26"
                }
              ]
            },
            "documentation": "@dev Returns a slices from a byte array.\n @param b The byte array to take a slice from.\n @param from The starting index for the slice (inclusive).\n @param to The final index for the slice (exclusive).\n @return result The slice containing bytes at indices [from, to)",
            "id": 3106,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "slice",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3062,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3057,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3106,
                  "src": "6578:14:26",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3056,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "6578:5:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3059,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3106,
                  "src": "6594:12:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3058,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6594:7:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3061,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3106,
                  "src": "6608:10:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3060,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6608:7:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6577:42:26"
            },
            "payable": false,
            "returnParameters": {
              "id": 3065,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3064,
                  "name": "result",
                  "nodeType": "VariableDeclaration",
                  "scope": 3106,
                  "src": "6667:19:26",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3063,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "6667:5:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6666:21:26"
            },
            "scope": 3107,
            "src": "6563:681:26",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 3108,
        "src": "601:6649:26"
      }
    ],
    "src": "575:6675:26"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/LibBytes.sol",
    "exportedSymbols": {
      "LibBytes": [
        3107
      ]
    },
    "id": 3108,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2983,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "575:24:26"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": null,
        "fullyImplemented": true,
        "id": 3107,
        "linearizedBaseContracts": [
          3107
        ],
        "name": "LibBytes",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 2986,
            "libraryName": {
              "contractScope": null,
              "id": 2984,
              "name": "LibBytes",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3107,
              "src": "631:8:26",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibBytes_$3107",
                "typeString": "library LibBytes"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "625:25:26",
            "typeName": {
              "id": 2985,
              "name": "bytes",
              "nodeType": "ElementaryTypeName",
              "src": "644:5:26",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes_storage_ptr",
                "typeString": "bytes"
              }
            }
          },
          {
            "body": {
              "id": 2996,
              "nodeType": "Block",
              "src": "968:110:26",
              "statements": [
                {
                  "externalReferences": [
                    {
                      "memoryAddress": {
                        "declaration": 2991,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1001:13:26",
                        "valueSize": 1
                      }
                    },
                    {
                      "input": {
                        "declaration": 2988,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1022:5:26",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 2993,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    memoryAddress := add(input, 32)\n}",
                  "src": "978:79:26"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2994,
                    "name": "memoryAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2991,
                    "src": "1058:13:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 2992,
                  "id": 2995,
                  "nodeType": "Return",
                  "src": "1051:20:26"
                }
              ]
            },
            "documentation": "@dev Gets the memory address for the contents of a byte array.\n @param input Byte array to lookup.\n @return memoryAddress Memory address of the contents of the byte array.",
            "id": 2997,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "contentAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2989,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2988,
                  "name": "input",
                  "nodeType": "VariableDeclaration",
                  "scope": 2997,
                  "src": "874:18:26",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2987,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "874:5:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "873:20:26"
            },
            "payable": false,
            "returnParameters": {
              "id": 2992,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2991,
                  "name": "memoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2997,
                  "src": "941:21:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2990,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "941:7:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "940:23:26"
            },
            "scope": 3107,
            "src": "850:228:26",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3023,
              "nodeType": "Block",
              "src": "1456:349:26",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 3012,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 3007,
                            "name": "b",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2999,
                            "src": "1487:1:26",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 3008,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "1487:8:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 3011,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3009,
                            "name": "index",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3001,
                            "src": "1499:5:26",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "+",
                          "rightExpression": {
                            "argumentTypes": null,
                            "hexValue": "3332",
                            "id": 3010,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "1507:2:26",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_32_by_1",
                              "typeString": "int_const 32"
                            },
                            "value": "32"
                          },
                          "src": "1499:10:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "1487:22:26",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "475245415445525f4f525f455155414c5f544f5f33325f4c454e4754485f5245515549524544",
                        "id": 3013,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1523:40:26",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_41046b31734c52276370384fb83a6ed9556edf77c382e1949fa233dc03b3aa40",
                          "typeString": "literal_string \"GREATER_OR_EQUAL_TO_32_LENGTH_REQUIRED\""
                        },
                        "value": "GREATER_OR_EQUAL_TO_32_LENGTH_REQUIRED"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_41046b31734c52276370384fb83a6ed9556edf77c382e1949fa233dc03b3aa40",
                          "typeString": "literal_string \"GREATER_OR_EQUAL_TO_32_LENGTH_REQUIRED\""
                        }
                      ],
                      "id": 3006,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "1466:7:26",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3014,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1466:107:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3015,
                  "nodeType": "ExpressionStatement",
                  "src": "1466:107:26"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3018,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 3016,
                      "name": "index",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3001,
                      "src": "1645:5:26",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "+=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "3332",
                      "id": 3017,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1654:2:26",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_32_by_1",
                        "typeString": "int_const 32"
                      },
                      "value": "32"
                    },
                    "src": "1645:11:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 3019,
                  "nodeType": "ExpressionStatement",
                  "src": "1645:11:26"
                },
                {
                  "externalReferences": [
                    {
                      "result": {
                        "declaration": 3004,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1736:6:26",
                        "valueSize": 1
                      }
                    },
                    {
                      "b": {
                        "declaration": 2999,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1756:1:26",
                        "valueSize": 1
                      }
                    },
                    {
                      "index": {
                        "declaration": 3001,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1759:5:26",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 3020,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    result := mload(add(b, index))\n}",
                  "src": "1713:78:26"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3021,
                    "name": "result",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3004,
                    "src": "1792:6:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 3005,
                  "id": 3022,
                  "nodeType": "Return",
                  "src": "1785:13:26"
                }
              ]
            },
            "documentation": "@dev Reads a bytes32 value from a position in a byte array.\n @param b Byte array containing a bytes32 value.\n @param index Index in byte array of bytes32 value.\n @return bytes32 value from byte array.",
            "id": 3024,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "readBytes32",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3002,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2999,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3024,
                  "src": "1345:14:26",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2998,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1345:5:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3001,
                  "name": "index",
                  "nodeType": "VariableDeclaration",
                  "scope": 3024,
                  "src": "1369:13:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3000,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1369:7:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1335:53:26"
            },
            "payable": false,
            "returnParameters": {
              "id": 3005,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3004,
                  "name": "result",
                  "nodeType": "VariableDeclaration",
                  "scope": 3024,
                  "src": "1436:14:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3003,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1436:7:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1435:16:26"
            },
            "scope": 3107,
            "src": "1315:490:26",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3054,
              "nodeType": "Block",
              "src": "2171:4080:26",
              "statements": [
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3035,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3033,
                      "name": "length",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3030,
                      "src": "2185:6:26",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "hexValue": "3332",
                      "id": 3034,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2194:2:26",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_32_by_1",
                        "typeString": "int_const 32"
                      },
                      "value": "32"
                    },
                    "src": "2185:11:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": {
                    "id": 3052,
                    "nodeType": "Block",
                    "src": "2657:3588:26",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 3040,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3038,
                            "name": "source",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3028,
                            "src": "2735:6:26",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 3039,
                            "name": "dest",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3026,
                            "src": "2745:4:26",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "2735:14:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 3043,
                        "nodeType": "IfStatement",
                        "src": "2731:59:26",
                        "trueBody": {
                          "id": 3042,
                          "nodeType": "Block",
                          "src": "2751:39:26",
                          "statements": [
                            {
                              "expression": null,
                              "functionReturnParameters": 3032,
                              "id": 3041,
                              "nodeType": "Return",
                              "src": "2769:7:26"
                            }
                          ]
                        }
                      },
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 3046,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3044,
                            "name": "source",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3028,
                            "src": "3470:6:26",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": ">",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 3045,
                            "name": "dest",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3026,
                            "src": "3479:4:26",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "3470:13:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": {
                          "id": 3050,
                          "nodeType": "Block",
                          "src": "4756:1479:26",
                          "statements": [
                            {
                              "externalReferences": [
                                {
                                  "length": {
                                    "declaration": 3030,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4973:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3030,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4959:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3028,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5021:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3030,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5029:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3028,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5389:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3026,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5073:4:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3030,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5079:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3026,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5914:4:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3026,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "6191:4:26",
                                    "valueSize": 1
                                  }
                                }
                              ],
                              "id": 3049,
                              "nodeType": "InlineAssembly",
                              "operations": "{\n    length := sub(length, 32)\n    let sEnd := add(source, length)\n    let dEnd := add(dest, length)\n    let first := mload(source)\n    for {\n    }\n    slt(dest, dEnd)\n    {\n    }\n    {\n        mstore(dEnd, mload(sEnd))\n        sEnd := sub(sEnd, 32)\n        dEnd := sub(dEnd, 32)\n    }\n    mstore(dest, first)\n}",
                              "src": "4774:1461:26"
                            }
                          ]
                        },
                        "id": 3051,
                        "nodeType": "IfStatement",
                        "src": "3466:2769:26",
                        "trueBody": {
                          "id": 3048,
                          "nodeType": "Block",
                          "src": "3485:1265:26",
                          "statements": [
                            {
                              "externalReferences": [
                                {
                                  "length": {
                                    "declaration": 3030,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "3783:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3030,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "3797:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3028,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "3845:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3030,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "3853:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3028,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4423:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3026,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "3897:4:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3030,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "3903:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3026,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4473:4:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3028,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4485:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3028,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4518:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3026,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4568:4:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3028,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4532:6:26",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3026,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4580:4:26",
                                    "valueSize": 1
                                  }
                                }
                              ],
                              "id": 3047,
                              "nodeType": "InlineAssembly",
                              "operations": "{\n    length := sub(length, 32)\n    let sEnd := add(source, length)\n    let dEnd := add(dest, length)\n    let last := mload(sEnd)\n    for {\n    }\n    lt(source, sEnd)\n    {\n    }\n    {\n        mstore(dest, mload(source))\n        source := add(source, 32)\n        dest := add(dest, 32)\n    }\n    mstore(dEnd, last)\n}",
                              "src": "3503:1247:26"
                            }
                          ]
                        }
                      }
                    ]
                  },
                  "id": 3053,
                  "nodeType": "IfStatement",
                  "src": "2181:4064:26",
                  "trueBody": {
                    "id": 3037,
                    "nodeType": "Block",
                    "src": "2198:453:26",
                    "statements": [
                      {
                        "externalReferences": [
                          {
                            "length": {
                              "declaration": 3030,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "2473:6:26",
                              "valueSize": 1
                            }
                          },
                          {
                            "dest": {
                              "declaration": 3026,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "2576:4:26",
                              "valueSize": 1
                            }
                          },
                          {
                            "source": {
                              "declaration": 3028,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "2521:6:26",
                              "valueSize": 1
                            }
                          },
                          {
                            "dest": {
                              "declaration": 3026,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "2612:4:26",
                              "valueSize": 1
                            }
                          }
                        ],
                        "id": 3036,
                        "nodeType": "InlineAssembly",
                        "operations": "{\n    let mask := sub(exp(256, sub(32, length)), 1)\n    let s := and(mload(source), not(mask))\n    let d := and(mload(dest), mask)\n    mstore(dest, or(s, d))\n}",
                        "src": "2413:238:26"
                      }
                    ]
                  }
                }
              ]
            },
            "documentation": "@dev Copies `length` bytes from memory location `source` to `dest`.\n @param dest memory address to copy bytes to.\n @param source memory address to copy bytes from.\n @param length number of bytes to copy.",
            "id": 3055,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "memCopy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3031,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3026,
                  "name": "dest",
                  "nodeType": "VariableDeclaration",
                  "scope": 3055,
                  "src": "2070:12:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3025,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2070:7:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3028,
                  "name": "source",
                  "nodeType": "VariableDeclaration",
                  "scope": 3055,
                  "src": "2092:14:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3027,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2092:7:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3030,
                  "name": "length",
                  "nodeType": "VariableDeclaration",
                  "scope": 3055,
                  "src": "2116:14:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3029,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2116:7:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2060:76:26"
            },
            "payable": false,
            "returnParameters": {
              "id": 3032,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2171:0:26"
            },
            "scope": 3107,
            "src": "2044:4207:26",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3105,
              "nodeType": "Block",
              "src": "6692:552:26",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 3069,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 3067,
                          "name": "from",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3059,
                          "src": "6723:4:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 3068,
                          "name": "to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3061,
                          "src": "6731:2:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "6723:10:26",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "46524f4d5f4c4553535f5448414e5f544f5f5245515549524544",
                        "id": 3070,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "6747:28:26",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_1b95cec571d66445cedbd96155c82949976c614b261f1c5fe27223590583fd4f",
                          "typeString": "literal_string \"FROM_LESS_THAN_TO_REQUIRED\""
                        },
                        "value": "FROM_LESS_THAN_TO_REQUIRED"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_1b95cec571d66445cedbd96155c82949976c614b261f1c5fe27223590583fd4f",
                          "typeString": "literal_string \"FROM_LESS_THAN_TO_REQUIRED\""
                        }
                      ],
                      "id": 3066,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "6702:7:26",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3071,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6702:83:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3072,
                  "nodeType": "ExpressionStatement",
                  "src": "6702:83:26"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 3077,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 3074,
                          "name": "to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3061,
                          "src": "6919:2:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 3075,
                            "name": "b",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3057,
                            "src": "6925:1:26",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 3076,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "6925:8:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "6919:14:26",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "544f5f4c4553535f5448414e5f4c454e4754485f5245515549524544",
                        "id": 3078,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "6947:30:26",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_22dab502afcaac39972ef428907ba5ff6a51956bfa1c4002b6aa8a752256c29a",
                          "typeString": "literal_string \"TO_LESS_THAN_LENGTH_REQUIRED\""
                        },
                        "value": "TO_LESS_THAN_LENGTH_REQUIRED"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_22dab502afcaac39972ef428907ba5ff6a51956bfa1c4002b6aa8a752256c29a",
                          "typeString": "literal_string \"TO_LESS_THAN_LENGTH_REQUIRED\""
                        }
                      ],
                      "id": 3073,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "6795:7:26",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3079,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6795:192:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3080,
                  "nodeType": "ExpressionStatement",
                  "src": "6795:192:26"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3088,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 3081,
                      "name": "result",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3064,
                      "src": "7064:6:26",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 3086,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3084,
                            "name": "to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3061,
                            "src": "7083:2:26",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "-",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 3085,
                            "name": "from",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3059,
                            "src": "7088:4:26",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "7083:9:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        ],
                        "id": 3083,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "lValueRequested": false,
                        "nodeType": "NewExpression",
                        "src": "7073:9:26",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_bytes_memory_$",
                          "typeString": "function (uint256) pure returns (bytes memory)"
                        },
                        "typeName": {
                          "id": 3082,
                          "name": "bytes",
                          "nodeType": "ElementaryTypeName",
                          "src": "7077:5:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_storage_ptr",
                            "typeString": "bytes"
                          }
                        }
                      },
                      "id": 3087,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7073:20:26",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7064:29:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 3089,
                  "nodeType": "ExpressionStatement",
                  "src": "7064:29:26"
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
                          "expression": {
                            "argumentTypes": null,
                            "id": 3091,
                            "name": "result",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3064,
                            "src": "7124:6:26",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 3092,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "contentAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2997,
                          "src": "7124:21:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) pure returns (uint256)"
                          }
                        },
                        "id": 3093,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "7124:23:26",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 3098,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "arguments": [],
                          "expression": {
                            "argumentTypes": [],
                            "expression": {
                              "argumentTypes": null,
                              "id": 3094,
                              "name": "b",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3057,
                              "src": "7161:1:26",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            "id": 3095,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "contentAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2997,
                            "src": "7161:16:26",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory) pure returns (uint256)"
                            }
                          },
                          "id": 3096,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7161:18:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "+",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 3097,
                          "name": "from",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3059,
                          "src": "7182:4:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "7161:25:26",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 3099,
                          "name": "result",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3064,
                          "src": "7200:6:26",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 3100,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "length",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "7200:13:26",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 3090,
                      "name": "memCopy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3055,
                      "src": "7103:7:26",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$_t_uint256_$returns$__$",
                        "typeString": "function (uint256,uint256,uint256) pure"
                      }
                    },
                    "id": 3101,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7103:111:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3102,
                  "nodeType": "ExpressionStatement",
                  "src": "7103:111:26"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3103,
                    "name": "result",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3064,
                    "src": "7231:6:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 3065,
                  "id": 3104,
                  "nodeType": "Return",
                  "src": "7224:13:26"
                }
              ]
            },
            "documentation": "@dev Returns a slices from a byte array.\n @param b The byte array to take a slice from.\n @param from The starting index for the slice (inclusive).\n @param to The final index for the slice (exclusive).\n @return result The slice containing bytes at indices [from, to)",
            "id": 3106,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "slice",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3062,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3057,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3106,
                  "src": "6578:14:26",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3056,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "6578:5:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3059,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3106,
                  "src": "6594:12:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3058,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6594:7:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3061,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3106,
                  "src": "6608:10:26",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3060,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6608:7:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6577:42:26"
            },
            "payable": false,
            "returnParameters": {
              "id": 3065,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3064,
                  "name": "result",
                  "nodeType": "VariableDeclaration",
                  "scope": 3106,
                  "src": "6667:19:26",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3063,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "6667:5:26",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6666:21:26"
            },
            "scope": 3107,
            "src": "6563:681:26",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 3108,
        "src": "601:6649:26"
      }
    ],
    "src": "575:6675:26"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-07T07:45:08.906Z"
}