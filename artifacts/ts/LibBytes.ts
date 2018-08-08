export const LibBytes = 
{
  "contractName": "LibBytes",
  "abi": [],
  "bytecode": "0x604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a165627a7a723058204fceda415b37b1c3620f0d22b53aabe81398966fe1d2c14802fecf1a76c488910029",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a165627a7a723058204fceda415b37b1c3620f0d22b53aabe81398966fe1d2c14802fecf1a76c488910029",
  "sourceMap": "601:7445:29:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "601:7445:29:-;;;;;;;;",
  "source": "/*\n  Copyright 2018 ZeroEx Intl.\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n    http://www.apache.org/licenses/LICENSE-2.0\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n*/\n\npragma solidity ^0.4.24;\n\nlibrary LibBytes {\n\n    using LibBytes for bytes;\n\n    /// @dev Gets the memory address for the contents of a byte array.\n    /// @param input Byte array to lookup.\n    /// @return memoryAddress Memory address of the contents of the byte array.\n    function contentAddress(bytes memory input)\n        internal\n        pure\n        returns (uint256 memoryAddress)\n    {\n        assembly {\n            memoryAddress := add(input, 32)\n        }\n        return memoryAddress;\n    }\n\n    /// @dev Reads an unpadded bytes4 value from a position in a byte array.\n    /// @param b Byte array containing a bytes4 value.\n    /// @param index Index in byte array of bytes4 value.\n    /// @return bytes4 value from byte array.\n    function readBytes4(\n        bytes memory b,\n        uint256 index)\n        internal\n        pure\n        returns (bytes4 result)\n    {\n        require(\n            b.length >= index + 4,\n            \"GREATER_OR_EQUAL_TO_4_LENGTH_REQUIRED\"\n        );\n        assembly {\n            result := mload(add(b, 32))\n            // Solidity does not require us to clean the trailing bytes.\n            // We do it anyway\n            result := and(result, 0xFFFFFFFF00000000000000000000000000000000000000000000000000000000)\n        }\n        return result;\n    }\n\n\n    /// @dev Reads a bytes32 value from a position in a byte array.\n    /// @param b Byte array containing a bytes32 value.\n    /// @param index Index in byte array of bytes32 value.\n    /// @return bytes32 value from byte array.\n    function readBytes32(\n        bytes memory b,\n        uint256 index\n    )\n        internal\n        pure\n        returns (bytes32 result)\n    {\n        require(\n            b.length >= index + 32,\n            \"GREATER_OR_EQUAL_TO_32_LENGTH_REQUIRED\"\n        );\n\n        // Arrays are prefixed by a 256 bit length parameter\n        index += 32;\n\n        // Read the bytes32 from array memory\n        assembly {\n            result := mload(add(b, index))\n        }\n        return result;\n    }\n\n    /// @dev Copies `length` bytes from memory location `source` to `dest`.\n    /// @param dest memory address to copy bytes to.\n    /// @param source memory address to copy bytes from.\n    /// @param length number of bytes to copy.\n    function memCopy(\n        uint256 dest,\n        uint256 source,\n        uint256 length\n    )\n        internal\n        pure\n    {\n        if (length < 32) {\n            // Handle a partial word by reading destination and masking\n            // off the bits we are interested in.\n            // This correctly handles overlap, zero lengths and source == dest\n            assembly {\n                let mask := sub(exp(256, sub(32, length)), 1)\n                let s := and(mload(source), not(mask))\n                let d := and(mload(dest), mask)\n                mstore(dest, or(s, d))\n            }\n        } else {\n            // Skip the O(length) loop when source == dest.\n            if (source == dest) {\n                return;\n            }\n\n            // For large copies we copy whole words at a time. The final\n            // word is aligned to the end of the range (instead of after the\n            // previous) to handle partial words. So a copy will look like this:\n            //\n            //  ####\n            //      ####\n            //          ####\n            //            ####\n            //\n            // We handle overlap in the source and destination range by\n            // changing the copying direction. This prevents us from\n            // overwriting parts of source that we still need to copy.\n            //\n            // This correctly handles source == dest\n            //\n            if (source > dest) {\n                assembly {\n                    // We subtract 32 from `sEnd` and `dEnd` because it\n                    // is easier to compare with in the loop, and these\n                    // are also the addresses we need for copying the\n                    // last bytes.\n                    length := sub(length, 32)\n                    let sEnd := add(source, length)\n                    let dEnd := add(dest, length)\n\n                    // Remember the last 32 bytes of source\n                    // This needs to be done here and not after the loop\n                    // because we may have overwritten the last bytes in\n                    // source already due to overlap.\n                    let last := mload(sEnd)\n\n                    // Copy whole words front to back\n                    // Note: the first check is always true,\n                    // this could have been a do-while loop.\n                    for {} lt(source, sEnd) {} {\n                        mstore(dest, mload(source))\n                        source := add(source, 32)\n                        dest := add(dest, 32)\n                    }\n                    \n                    // Write the last 32 bytes\n                    mstore(dEnd, last)\n                }\n            } else {\n                assembly {\n                    // We subtract 32 from `sEnd` and `dEnd` because those\n                    // are the starting points when copying a word at the end.\n                    length := sub(length, 32)\n                    let sEnd := add(source, length)\n                    let dEnd := add(dest, length)\n\n                    // Remember the first 32 bytes of source\n                    // This needs to be done here and not after the loop\n                    // because we may have overwritten the first bytes in\n                    // source already due to overlap.\n                    let first := mload(source)\n\n                    // Copy whole words back to front\n                    // We use a signed comparisson here to allow dEnd to become\n                    // negative (happens when source and dest < 32). Valid\n                    // addresses in local memory will never be larger than\n                    // 2**255, so they can be safely re-interpreted as signed.\n                    // Note: the first check is always true,\n                    // this could have been a do-while loop.\n                    for {} slt(dest, dEnd) {} {\n                        mstore(dEnd, mload(sEnd))\n                        sEnd := sub(sEnd, 32)\n                        dEnd := sub(dEnd, 32)\n                    }\n                    \n                    // Write the first 32 bytes\n                    mstore(dest, first)\n                }\n            }\n        }\n    }\n    \n    /// @dev Returns a slices from a byte array.\n    /// @param b The byte array to take a slice from.\n    /// @param from The starting index for the slice (inclusive).\n    /// @param to The final index for the slice (exclusive).\n    /// @return result The slice containing bytes at indices [from, to)\n    function slice(bytes memory b, uint256 from, uint256 to)\n        internal\n        pure\n        returns (bytes memory result)\n    {\n        require(\n            from <= to,\n            \"FROM_LESS_THAN_TO_REQUIRED\"\n        );\n        require(\n            // NOTE: Set Protocol changed from `to < b.length` so that the last byte can be sliced off\n            to <= b.length,\n            \"TO_LESS_THAN_LENGTH_REQUIRED\"\n        );\n        \n        // Create a new bytes structure and copy contents\n        result = new bytes(to - from);\n        memCopy(\n            result.contentAddress(),\n            b.contentAddress() + from,\n            result.length);\n        return result;\n    }    \n}",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
    "exportedSymbols": {
      "LibBytes": [
        3503
      ]
    },
    "id": 3504,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3356,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "575:24:29"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": null,
        "fullyImplemented": true,
        "id": 3503,
        "linearizedBaseContracts": [
          3503
        ],
        "name": "LibBytes",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 3359,
            "libraryName": {
              "contractScope": null,
              "id": 3357,
              "name": "LibBytes",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3503,
              "src": "631:8:29",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibBytes_$3503",
                "typeString": "library LibBytes"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "625:25:29",
            "typeName": {
              "id": 3358,
              "name": "bytes",
              "nodeType": "ElementaryTypeName",
              "src": "644:5:29",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes_storage_ptr",
                "typeString": "bytes"
              }
            }
          },
          {
            "body": {
              "id": 3369,
              "nodeType": "Block",
              "src": "968:110:29",
              "statements": [
                {
                  "externalReferences": [
                    {
                      "memoryAddress": {
                        "declaration": 3364,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1001:13:29",
                        "valueSize": 1
                      }
                    },
                    {
                      "input": {
                        "declaration": 3361,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1022:5:29",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 3366,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    memoryAddress := add(input, 32)\n}",
                  "src": "978:79:29"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3367,
                    "name": "memoryAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3364,
                    "src": "1058:13:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3365,
                  "id": 3368,
                  "nodeType": "Return",
                  "src": "1051:20:29"
                }
              ]
            },
            "documentation": "@dev Gets the memory address for the contents of a byte array.\n @param input Byte array to lookup.\n @return memoryAddress Memory address of the contents of the byte array.",
            "id": 3370,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "contentAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3362,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3361,
                  "name": "input",
                  "nodeType": "VariableDeclaration",
                  "scope": 3370,
                  "src": "874:18:29",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3360,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "874:5:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "873:20:29"
            },
            "payable": false,
            "returnParameters": {
              "id": 3365,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3364,
                  "name": "memoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3370,
                  "src": "941:21:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3363,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "941:7:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "940:23:29"
            },
            "scope": 3503,
            "src": "850:228:29",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3392,
              "nodeType": "Block",
              "src": "1454:420:29",
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
                        "id": 3385,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 3380,
                            "name": "b",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3372,
                            "src": "1485:1:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 3381,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "1485:8:29",
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
                          "id": 3384,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3382,
                            "name": "index",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3374,
                            "src": "1497:5:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "+",
                          "rightExpression": {
                            "argumentTypes": null,
                            "hexValue": "34",
                            "id": 3383,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "1505:1:29",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_4_by_1",
                              "typeString": "int_const 4"
                            },
                            "value": "4"
                          },
                          "src": "1497:9:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "1485:21:29",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "475245415445525f4f525f455155414c5f544f5f345f4c454e4754485f5245515549524544",
                        "id": 3386,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1520:39:29",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_e0eb74a17abed9b98211de36d035fbde4a6a5e52a39f50b60a39158103e500c2",
                          "typeString": "literal_string \"GREATER_OR_EQUAL_TO_4_LENGTH_REQUIRED\""
                        },
                        "value": "GREATER_OR_EQUAL_TO_4_LENGTH_REQUIRED"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_e0eb74a17abed9b98211de36d035fbde4a6a5e52a39f50b60a39158103e500c2",
                          "typeString": "literal_string \"GREATER_OR_EQUAL_TO_4_LENGTH_REQUIRED\""
                        }
                      ],
                      "id": 3379,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3998,
                      "src": "1464:7:29",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3387,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1464:105:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3388,
                  "nodeType": "ExpressionStatement",
                  "src": "1464:105:29"
                },
                {
                  "externalReferences": [
                    {
                      "result": {
                        "declaration": 3377,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1746:6:29",
                        "valueSize": 1
                      }
                    },
                    {
                      "result": {
                        "declaration": 3377,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1602:6:29",
                        "valueSize": 1
                      }
                    },
                    {
                      "b": {
                        "declaration": 3372,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1622:1:29",
                        "valueSize": 1
                      }
                    },
                    {
                      "result": {
                        "declaration": 3377,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1760:6:29",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 3389,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    result := mload(add(b, 32))\n    result := and(result, 0xFFFFFFFF00000000000000000000000000000000000000000000000000000000)\n}",
                  "src": "1579:281:29"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3390,
                    "name": "result",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3377,
                    "src": "1861:6:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "functionReturnParameters": 3378,
                  "id": 3391,
                  "nodeType": "Return",
                  "src": "1854:13:29"
                }
              ]
            },
            "documentation": "@dev Reads an unpadded bytes4 value from a position in a byte array.\n @param b Byte array containing a bytes4 value.\n @param index Index in byte array of bytes4 value.\n @return bytes4 value from byte array.",
            "id": 3393,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "readBytes4",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3375,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3372,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "1349:14:29",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3371,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1349:5:29",
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
                  "id": 3374,
                  "name": "index",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "1373:13:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3373,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1373:7:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1339:48:29"
            },
            "payable": false,
            "returnParameters": {
              "id": 3378,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3377,
                  "name": "result",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "1435:13:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes4",
                    "typeString": "bytes4"
                  },
                  "typeName": {
                    "id": 3376,
                    "name": "bytes4",
                    "nodeType": "ElementaryTypeName",
                    "src": "1435:6:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1434:15:29"
            },
            "scope": 3503,
            "src": "1320:554:29",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3419,
              "nodeType": "Block",
              "src": "2252:349:29",
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
                        "id": 3408,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 3403,
                            "name": "b",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3395,
                            "src": "2283:1:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 3404,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2283:8:29",
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
                          "id": 3407,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3405,
                            "name": "index",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3397,
                            "src": "2295:5:29",
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
                            "id": 3406,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "2303:2:29",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_32_by_1",
                              "typeString": "int_const 32"
                            },
                            "value": "32"
                          },
                          "src": "2295:10:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "2283:22:29",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "475245415445525f4f525f455155414c5f544f5f33325f4c454e4754485f5245515549524544",
                        "id": 3409,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "2319:40:29",
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
                      "id": 3402,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3998,
                      "src": "2262:7:29",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3410,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2262:107:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3411,
                  "nodeType": "ExpressionStatement",
                  "src": "2262:107:29"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3414,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 3412,
                      "name": "index",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3397,
                      "src": "2441:5:29",
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
                      "id": 3413,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2450:2:29",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_32_by_1",
                        "typeString": "int_const 32"
                      },
                      "value": "32"
                    },
                    "src": "2441:11:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 3415,
                  "nodeType": "ExpressionStatement",
                  "src": "2441:11:29"
                },
                {
                  "externalReferences": [
                    {
                      "result": {
                        "declaration": 3400,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "2532:6:29",
                        "valueSize": 1
                      }
                    },
                    {
                      "b": {
                        "declaration": 3395,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "2552:1:29",
                        "valueSize": 1
                      }
                    },
                    {
                      "index": {
                        "declaration": 3397,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "2555:5:29",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 3416,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    result := mload(add(b, index))\n}",
                  "src": "2509:78:29"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3417,
                    "name": "result",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3400,
                    "src": "2588:6:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 3401,
                  "id": 3418,
                  "nodeType": "Return",
                  "src": "2581:13:29"
                }
              ]
            },
            "documentation": "@dev Reads a bytes32 value from a position in a byte array.\n @param b Byte array containing a bytes32 value.\n @param index Index in byte array of bytes32 value.\n @return bytes32 value from byte array.",
            "id": 3420,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "readBytes32",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3398,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3395,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3420,
                  "src": "2141:14:29",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3394,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2141:5:29",
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
                  "id": 3397,
                  "name": "index",
                  "nodeType": "VariableDeclaration",
                  "scope": 3420,
                  "src": "2165:13:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3396,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2165:7:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2131:53:29"
            },
            "payable": false,
            "returnParameters": {
              "id": 3401,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3400,
                  "name": "result",
                  "nodeType": "VariableDeclaration",
                  "scope": 3420,
                  "src": "2232:14:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3399,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2232:7:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2231:16:29"
            },
            "scope": 3503,
            "src": "2111:490:29",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3450,
              "nodeType": "Block",
              "src": "2967:4080:29",
              "statements": [
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3431,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3429,
                      "name": "length",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3426,
                      "src": "2981:6:29",
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
                      "id": 3430,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2990:2:29",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_32_by_1",
                        "typeString": "int_const 32"
                      },
                      "value": "32"
                    },
                    "src": "2981:11:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": {
                    "id": 3448,
                    "nodeType": "Block",
                    "src": "3453:3588:29",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 3436,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3434,
                            "name": "source",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3424,
                            "src": "3531:6:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 3435,
                            "name": "dest",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3422,
                            "src": "3541:4:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "3531:14:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 3439,
                        "nodeType": "IfStatement",
                        "src": "3527:59:29",
                        "trueBody": {
                          "id": 3438,
                          "nodeType": "Block",
                          "src": "3547:39:29",
                          "statements": [
                            {
                              "expression": null,
                              "functionReturnParameters": 3428,
                              "id": 3437,
                              "nodeType": "Return",
                              "src": "3565:7:29"
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
                          "id": 3442,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3440,
                            "name": "source",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3424,
                            "src": "4266:6:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": ">",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 3441,
                            "name": "dest",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3422,
                            "src": "4275:4:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "4266:13:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": {
                          "id": 3446,
                          "nodeType": "Block",
                          "src": "5552:1479:29",
                          "statements": [
                            {
                              "externalReferences": [
                                {
                                  "length": {
                                    "declaration": 3426,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5769:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3426,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5755:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3424,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5817:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3426,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5825:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3424,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "6185:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3422,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5869:4:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3426,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5875:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3422,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "6710:4:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3422,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "6987:4:29",
                                    "valueSize": 1
                                  }
                                }
                              ],
                              "id": 3445,
                              "nodeType": "InlineAssembly",
                              "operations": "{\n    length := sub(length, 32)\n    let sEnd := add(source, length)\n    let dEnd := add(dest, length)\n    let first := mload(source)\n    for {\n    }\n    slt(dest, dEnd)\n    {\n    }\n    {\n        mstore(dEnd, mload(sEnd))\n        sEnd := sub(sEnd, 32)\n        dEnd := sub(dEnd, 32)\n    }\n    mstore(dest, first)\n}",
                              "src": "5570:1461:29"
                            }
                          ]
                        },
                        "id": 3447,
                        "nodeType": "IfStatement",
                        "src": "4262:2769:29",
                        "trueBody": {
                          "id": 3444,
                          "nodeType": "Block",
                          "src": "4281:1265:29",
                          "statements": [
                            {
                              "externalReferences": [
                                {
                                  "length": {
                                    "declaration": 3426,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4579:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3426,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4593:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3424,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4641:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3426,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4649:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3424,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5219:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3422,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4693:4:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3426,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4699:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3422,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5269:4:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3424,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5281:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3424,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5314:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3422,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5364:4:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3424,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5328:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3422,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5376:4:29",
                                    "valueSize": 1
                                  }
                                }
                              ],
                              "id": 3443,
                              "nodeType": "InlineAssembly",
                              "operations": "{\n    length := sub(length, 32)\n    let sEnd := add(source, length)\n    let dEnd := add(dest, length)\n    let last := mload(sEnd)\n    for {\n    }\n    lt(source, sEnd)\n    {\n    }\n    {\n        mstore(dest, mload(source))\n        source := add(source, 32)\n        dest := add(dest, 32)\n    }\n    mstore(dEnd, last)\n}",
                              "src": "4299:1247:29"
                            }
                          ]
                        }
                      }
                    ]
                  },
                  "id": 3449,
                  "nodeType": "IfStatement",
                  "src": "2977:4064:29",
                  "trueBody": {
                    "id": 3433,
                    "nodeType": "Block",
                    "src": "2994:453:29",
                    "statements": [
                      {
                        "externalReferences": [
                          {
                            "length": {
                              "declaration": 3426,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3269:6:29",
                              "valueSize": 1
                            }
                          },
                          {
                            "dest": {
                              "declaration": 3422,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3372:4:29",
                              "valueSize": 1
                            }
                          },
                          {
                            "source": {
                              "declaration": 3424,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3317:6:29",
                              "valueSize": 1
                            }
                          },
                          {
                            "dest": {
                              "declaration": 3422,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3408:4:29",
                              "valueSize": 1
                            }
                          }
                        ],
                        "id": 3432,
                        "nodeType": "InlineAssembly",
                        "operations": "{\n    let mask := sub(exp(256, sub(32, length)), 1)\n    let s := and(mload(source), not(mask))\n    let d := and(mload(dest), mask)\n    mstore(dest, or(s, d))\n}",
                        "src": "3209:238:29"
                      }
                    ]
                  }
                }
              ]
            },
            "documentation": "@dev Copies `length` bytes from memory location `source` to `dest`.\n @param dest memory address to copy bytes to.\n @param source memory address to copy bytes from.\n @param length number of bytes to copy.",
            "id": 3451,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "memCopy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3427,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3422,
                  "name": "dest",
                  "nodeType": "VariableDeclaration",
                  "scope": 3451,
                  "src": "2866:12:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3421,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2866:7:29",
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
                  "id": 3424,
                  "name": "source",
                  "nodeType": "VariableDeclaration",
                  "scope": 3451,
                  "src": "2888:14:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3423,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2888:7:29",
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
                  "id": 3426,
                  "name": "length",
                  "nodeType": "VariableDeclaration",
                  "scope": 3451,
                  "src": "2912:14:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3425,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2912:7:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2856:76:29"
            },
            "payable": false,
            "returnParameters": {
              "id": 3428,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2967:0:29"
            },
            "scope": 3503,
            "src": "2840:4207:29",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3501,
              "nodeType": "Block",
              "src": "7488:552:29",
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
                        "id": 3465,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 3463,
                          "name": "from",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3455,
                          "src": "7519:4:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 3464,
                          "name": "to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3457,
                          "src": "7527:2:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "7519:10:29",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "46524f4d5f4c4553535f5448414e5f544f5f5245515549524544",
                        "id": 3466,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "7543:28:29",
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
                      "id": 3462,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3998,
                      "src": "7498:7:29",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3467,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7498:83:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3468,
                  "nodeType": "ExpressionStatement",
                  "src": "7498:83:29"
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
                        "id": 3473,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 3470,
                          "name": "to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3457,
                          "src": "7715:2:29",
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
                            "id": 3471,
                            "name": "b",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3453,
                            "src": "7721:1:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 3472,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "7721:8:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "7715:14:29",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "544f5f4c4553535f5448414e5f4c454e4754485f5245515549524544",
                        "id": 3474,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "7743:30:29",
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
                      "id": 3469,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3998,
                      "src": "7591:7:29",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3475,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7591:192:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3476,
                  "nodeType": "ExpressionStatement",
                  "src": "7591:192:29"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3484,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 3477,
                      "name": "result",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3460,
                      "src": "7860:6:29",
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
                          "id": 3482,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3480,
                            "name": "to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3457,
                            "src": "7879:2:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "-",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 3481,
                            "name": "from",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3455,
                            "src": "7884:4:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "7879:9:29",
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
                        "id": 3479,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "lValueRequested": false,
                        "nodeType": "NewExpression",
                        "src": "7869:9:29",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_bytes_memory_$",
                          "typeString": "function (uint256) pure returns (bytes memory)"
                        },
                        "typeName": {
                          "id": 3478,
                          "name": "bytes",
                          "nodeType": "ElementaryTypeName",
                          "src": "7873:5:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_storage_ptr",
                            "typeString": "bytes"
                          }
                        }
                      },
                      "id": 3483,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7869:20:29",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7860:29:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 3485,
                  "nodeType": "ExpressionStatement",
                  "src": "7860:29:29"
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
                            "id": 3487,
                            "name": "result",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3460,
                            "src": "7920:6:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 3488,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "contentAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3370,
                          "src": "7920:21:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) pure returns (uint256)"
                          }
                        },
                        "id": 3489,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "7920:23:29",
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
                        "id": 3494,
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
                              "id": 3490,
                              "name": "b",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3453,
                              "src": "7957:1:29",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            "id": 3491,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "contentAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3370,
                            "src": "7957:16:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory) pure returns (uint256)"
                            }
                          },
                          "id": 3492,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7957:18:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "+",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 3493,
                          "name": "from",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3455,
                          "src": "7978:4:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "7957:25:29",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 3495,
                          "name": "result",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3460,
                          "src": "7996:6:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 3496,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "length",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "7996:13:29",
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
                      "id": 3486,
                      "name": "memCopy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3451,
                      "src": "7899:7:29",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$_t_uint256_$returns$__$",
                        "typeString": "function (uint256,uint256,uint256) pure"
                      }
                    },
                    "id": 3497,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7899:111:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3498,
                  "nodeType": "ExpressionStatement",
                  "src": "7899:111:29"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3499,
                    "name": "result",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3460,
                    "src": "8027:6:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 3461,
                  "id": 3500,
                  "nodeType": "Return",
                  "src": "8020:13:29"
                }
              ]
            },
            "documentation": "@dev Returns a slices from a byte array.\n @param b The byte array to take a slice from.\n @param from The starting index for the slice (inclusive).\n @param to The final index for the slice (exclusive).\n @return result The slice containing bytes at indices [from, to)",
            "id": 3502,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "slice",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3458,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3453,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3502,
                  "src": "7374:14:29",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3452,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "7374:5:29",
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
                  "id": 3455,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3502,
                  "src": "7390:12:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3454,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "7390:7:29",
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
                  "id": 3457,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3502,
                  "src": "7404:10:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3456,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "7404:7:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7373:42:29"
            },
            "payable": false,
            "returnParameters": {
              "id": 3461,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3460,
                  "name": "result",
                  "nodeType": "VariableDeclaration",
                  "scope": 3502,
                  "src": "7463:19:29",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3459,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "7463:5:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7462:21:29"
            },
            "scope": 3503,
            "src": "7359:681:29",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 3504,
        "src": "601:7445:29"
      }
    ],
    "src": "575:7471:29"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
    "exportedSymbols": {
      "LibBytes": [
        3503
      ]
    },
    "id": 3504,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3356,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "575:24:29"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": null,
        "fullyImplemented": true,
        "id": 3503,
        "linearizedBaseContracts": [
          3503
        ],
        "name": "LibBytes",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 3359,
            "libraryName": {
              "contractScope": null,
              "id": 3357,
              "name": "LibBytes",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3503,
              "src": "631:8:29",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibBytes_$3503",
                "typeString": "library LibBytes"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "625:25:29",
            "typeName": {
              "id": 3358,
              "name": "bytes",
              "nodeType": "ElementaryTypeName",
              "src": "644:5:29",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes_storage_ptr",
                "typeString": "bytes"
              }
            }
          },
          {
            "body": {
              "id": 3369,
              "nodeType": "Block",
              "src": "968:110:29",
              "statements": [
                {
                  "externalReferences": [
                    {
                      "memoryAddress": {
                        "declaration": 3364,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1001:13:29",
                        "valueSize": 1
                      }
                    },
                    {
                      "input": {
                        "declaration": 3361,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1022:5:29",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 3366,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    memoryAddress := add(input, 32)\n}",
                  "src": "978:79:29"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3367,
                    "name": "memoryAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3364,
                    "src": "1058:13:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3365,
                  "id": 3368,
                  "nodeType": "Return",
                  "src": "1051:20:29"
                }
              ]
            },
            "documentation": "@dev Gets the memory address for the contents of a byte array.\n @param input Byte array to lookup.\n @return memoryAddress Memory address of the contents of the byte array.",
            "id": 3370,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "contentAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3362,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3361,
                  "name": "input",
                  "nodeType": "VariableDeclaration",
                  "scope": 3370,
                  "src": "874:18:29",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3360,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "874:5:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "873:20:29"
            },
            "payable": false,
            "returnParameters": {
              "id": 3365,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3364,
                  "name": "memoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3370,
                  "src": "941:21:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3363,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "941:7:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "940:23:29"
            },
            "scope": 3503,
            "src": "850:228:29",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3392,
              "nodeType": "Block",
              "src": "1454:420:29",
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
                        "id": 3385,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 3380,
                            "name": "b",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3372,
                            "src": "1485:1:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 3381,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "1485:8:29",
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
                          "id": 3384,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3382,
                            "name": "index",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3374,
                            "src": "1497:5:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "+",
                          "rightExpression": {
                            "argumentTypes": null,
                            "hexValue": "34",
                            "id": 3383,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "1505:1:29",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_4_by_1",
                              "typeString": "int_const 4"
                            },
                            "value": "4"
                          },
                          "src": "1497:9:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "1485:21:29",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "475245415445525f4f525f455155414c5f544f5f345f4c454e4754485f5245515549524544",
                        "id": 3386,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1520:39:29",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_e0eb74a17abed9b98211de36d035fbde4a6a5e52a39f50b60a39158103e500c2",
                          "typeString": "literal_string \"GREATER_OR_EQUAL_TO_4_LENGTH_REQUIRED\""
                        },
                        "value": "GREATER_OR_EQUAL_TO_4_LENGTH_REQUIRED"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_e0eb74a17abed9b98211de36d035fbde4a6a5e52a39f50b60a39158103e500c2",
                          "typeString": "literal_string \"GREATER_OR_EQUAL_TO_4_LENGTH_REQUIRED\""
                        }
                      ],
                      "id": 3379,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3998,
                      "src": "1464:7:29",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3387,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1464:105:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3388,
                  "nodeType": "ExpressionStatement",
                  "src": "1464:105:29"
                },
                {
                  "externalReferences": [
                    {
                      "result": {
                        "declaration": 3377,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1746:6:29",
                        "valueSize": 1
                      }
                    },
                    {
                      "result": {
                        "declaration": 3377,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1602:6:29",
                        "valueSize": 1
                      }
                    },
                    {
                      "b": {
                        "declaration": 3372,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1622:1:29",
                        "valueSize": 1
                      }
                    },
                    {
                      "result": {
                        "declaration": 3377,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1760:6:29",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 3389,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    result := mload(add(b, 32))\n    result := and(result, 0xFFFFFFFF00000000000000000000000000000000000000000000000000000000)\n}",
                  "src": "1579:281:29"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3390,
                    "name": "result",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3377,
                    "src": "1861:6:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "functionReturnParameters": 3378,
                  "id": 3391,
                  "nodeType": "Return",
                  "src": "1854:13:29"
                }
              ]
            },
            "documentation": "@dev Reads an unpadded bytes4 value from a position in a byte array.\n @param b Byte array containing a bytes4 value.\n @param index Index in byte array of bytes4 value.\n @return bytes4 value from byte array.",
            "id": 3393,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "readBytes4",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3375,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3372,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "1349:14:29",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3371,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1349:5:29",
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
                  "id": 3374,
                  "name": "index",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "1373:13:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3373,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1373:7:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1339:48:29"
            },
            "payable": false,
            "returnParameters": {
              "id": 3378,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3377,
                  "name": "result",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "1435:13:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes4",
                    "typeString": "bytes4"
                  },
                  "typeName": {
                    "id": 3376,
                    "name": "bytes4",
                    "nodeType": "ElementaryTypeName",
                    "src": "1435:6:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1434:15:29"
            },
            "scope": 3503,
            "src": "1320:554:29",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3419,
              "nodeType": "Block",
              "src": "2252:349:29",
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
                        "id": 3408,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 3403,
                            "name": "b",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3395,
                            "src": "2283:1:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 3404,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2283:8:29",
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
                          "id": 3407,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3405,
                            "name": "index",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3397,
                            "src": "2295:5:29",
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
                            "id": 3406,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "2303:2:29",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_32_by_1",
                              "typeString": "int_const 32"
                            },
                            "value": "32"
                          },
                          "src": "2295:10:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "2283:22:29",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "475245415445525f4f525f455155414c5f544f5f33325f4c454e4754485f5245515549524544",
                        "id": 3409,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "2319:40:29",
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
                      "id": 3402,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3998,
                      "src": "2262:7:29",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3410,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2262:107:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3411,
                  "nodeType": "ExpressionStatement",
                  "src": "2262:107:29"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3414,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 3412,
                      "name": "index",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3397,
                      "src": "2441:5:29",
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
                      "id": 3413,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2450:2:29",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_32_by_1",
                        "typeString": "int_const 32"
                      },
                      "value": "32"
                    },
                    "src": "2441:11:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 3415,
                  "nodeType": "ExpressionStatement",
                  "src": "2441:11:29"
                },
                {
                  "externalReferences": [
                    {
                      "result": {
                        "declaration": 3400,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "2532:6:29",
                        "valueSize": 1
                      }
                    },
                    {
                      "b": {
                        "declaration": 3395,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "2552:1:29",
                        "valueSize": 1
                      }
                    },
                    {
                      "index": {
                        "declaration": 3397,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "2555:5:29",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 3416,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    result := mload(add(b, index))\n}",
                  "src": "2509:78:29"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3417,
                    "name": "result",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3400,
                    "src": "2588:6:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 3401,
                  "id": 3418,
                  "nodeType": "Return",
                  "src": "2581:13:29"
                }
              ]
            },
            "documentation": "@dev Reads a bytes32 value from a position in a byte array.\n @param b Byte array containing a bytes32 value.\n @param index Index in byte array of bytes32 value.\n @return bytes32 value from byte array.",
            "id": 3420,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "readBytes32",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3398,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3395,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3420,
                  "src": "2141:14:29",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3394,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2141:5:29",
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
                  "id": 3397,
                  "name": "index",
                  "nodeType": "VariableDeclaration",
                  "scope": 3420,
                  "src": "2165:13:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3396,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2165:7:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2131:53:29"
            },
            "payable": false,
            "returnParameters": {
              "id": 3401,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3400,
                  "name": "result",
                  "nodeType": "VariableDeclaration",
                  "scope": 3420,
                  "src": "2232:14:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3399,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2232:7:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2231:16:29"
            },
            "scope": 3503,
            "src": "2111:490:29",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3450,
              "nodeType": "Block",
              "src": "2967:4080:29",
              "statements": [
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3431,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3429,
                      "name": "length",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3426,
                      "src": "2981:6:29",
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
                      "id": 3430,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2990:2:29",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_32_by_1",
                        "typeString": "int_const 32"
                      },
                      "value": "32"
                    },
                    "src": "2981:11:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": {
                    "id": 3448,
                    "nodeType": "Block",
                    "src": "3453:3588:29",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 3436,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3434,
                            "name": "source",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3424,
                            "src": "3531:6:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 3435,
                            "name": "dest",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3422,
                            "src": "3541:4:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "3531:14:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 3439,
                        "nodeType": "IfStatement",
                        "src": "3527:59:29",
                        "trueBody": {
                          "id": 3438,
                          "nodeType": "Block",
                          "src": "3547:39:29",
                          "statements": [
                            {
                              "expression": null,
                              "functionReturnParameters": 3428,
                              "id": 3437,
                              "nodeType": "Return",
                              "src": "3565:7:29"
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
                          "id": 3442,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3440,
                            "name": "source",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3424,
                            "src": "4266:6:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": ">",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 3441,
                            "name": "dest",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3422,
                            "src": "4275:4:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "4266:13:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": {
                          "id": 3446,
                          "nodeType": "Block",
                          "src": "5552:1479:29",
                          "statements": [
                            {
                              "externalReferences": [
                                {
                                  "length": {
                                    "declaration": 3426,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5769:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3426,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5755:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3424,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5817:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3426,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5825:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3424,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "6185:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3422,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5869:4:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3426,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5875:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3422,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "6710:4:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3422,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "6987:4:29",
                                    "valueSize": 1
                                  }
                                }
                              ],
                              "id": 3445,
                              "nodeType": "InlineAssembly",
                              "operations": "{\n    length := sub(length, 32)\n    let sEnd := add(source, length)\n    let dEnd := add(dest, length)\n    let first := mload(source)\n    for {\n    }\n    slt(dest, dEnd)\n    {\n    }\n    {\n        mstore(dEnd, mload(sEnd))\n        sEnd := sub(sEnd, 32)\n        dEnd := sub(dEnd, 32)\n    }\n    mstore(dest, first)\n}",
                              "src": "5570:1461:29"
                            }
                          ]
                        },
                        "id": 3447,
                        "nodeType": "IfStatement",
                        "src": "4262:2769:29",
                        "trueBody": {
                          "id": 3444,
                          "nodeType": "Block",
                          "src": "4281:1265:29",
                          "statements": [
                            {
                              "externalReferences": [
                                {
                                  "length": {
                                    "declaration": 3426,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4579:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3426,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4593:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3424,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4641:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3426,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4649:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3424,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5219:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3422,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4693:4:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3426,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4699:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3422,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5269:4:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3424,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5281:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3424,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5314:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3422,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5364:4:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3424,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5328:6:29",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3422,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5376:4:29",
                                    "valueSize": 1
                                  }
                                }
                              ],
                              "id": 3443,
                              "nodeType": "InlineAssembly",
                              "operations": "{\n    length := sub(length, 32)\n    let sEnd := add(source, length)\n    let dEnd := add(dest, length)\n    let last := mload(sEnd)\n    for {\n    }\n    lt(source, sEnd)\n    {\n    }\n    {\n        mstore(dest, mload(source))\n        source := add(source, 32)\n        dest := add(dest, 32)\n    }\n    mstore(dEnd, last)\n}",
                              "src": "4299:1247:29"
                            }
                          ]
                        }
                      }
                    ]
                  },
                  "id": 3449,
                  "nodeType": "IfStatement",
                  "src": "2977:4064:29",
                  "trueBody": {
                    "id": 3433,
                    "nodeType": "Block",
                    "src": "2994:453:29",
                    "statements": [
                      {
                        "externalReferences": [
                          {
                            "length": {
                              "declaration": 3426,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3269:6:29",
                              "valueSize": 1
                            }
                          },
                          {
                            "dest": {
                              "declaration": 3422,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3372:4:29",
                              "valueSize": 1
                            }
                          },
                          {
                            "source": {
                              "declaration": 3424,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3317:6:29",
                              "valueSize": 1
                            }
                          },
                          {
                            "dest": {
                              "declaration": 3422,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3408:4:29",
                              "valueSize": 1
                            }
                          }
                        ],
                        "id": 3432,
                        "nodeType": "InlineAssembly",
                        "operations": "{\n    let mask := sub(exp(256, sub(32, length)), 1)\n    let s := and(mload(source), not(mask))\n    let d := and(mload(dest), mask)\n    mstore(dest, or(s, d))\n}",
                        "src": "3209:238:29"
                      }
                    ]
                  }
                }
              ]
            },
            "documentation": "@dev Copies `length` bytes from memory location `source` to `dest`.\n @param dest memory address to copy bytes to.\n @param source memory address to copy bytes from.\n @param length number of bytes to copy.",
            "id": 3451,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "memCopy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3427,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3422,
                  "name": "dest",
                  "nodeType": "VariableDeclaration",
                  "scope": 3451,
                  "src": "2866:12:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3421,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2866:7:29",
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
                  "id": 3424,
                  "name": "source",
                  "nodeType": "VariableDeclaration",
                  "scope": 3451,
                  "src": "2888:14:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3423,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2888:7:29",
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
                  "id": 3426,
                  "name": "length",
                  "nodeType": "VariableDeclaration",
                  "scope": 3451,
                  "src": "2912:14:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3425,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2912:7:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2856:76:29"
            },
            "payable": false,
            "returnParameters": {
              "id": 3428,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2967:0:29"
            },
            "scope": 3503,
            "src": "2840:4207:29",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3501,
              "nodeType": "Block",
              "src": "7488:552:29",
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
                        "id": 3465,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 3463,
                          "name": "from",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3455,
                          "src": "7519:4:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 3464,
                          "name": "to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3457,
                          "src": "7527:2:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "7519:10:29",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "46524f4d5f4c4553535f5448414e5f544f5f5245515549524544",
                        "id": 3466,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "7543:28:29",
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
                      "id": 3462,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3998,
                      "src": "7498:7:29",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3467,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7498:83:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3468,
                  "nodeType": "ExpressionStatement",
                  "src": "7498:83:29"
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
                        "id": 3473,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 3470,
                          "name": "to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3457,
                          "src": "7715:2:29",
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
                            "id": 3471,
                            "name": "b",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3453,
                            "src": "7721:1:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 3472,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "7721:8:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "7715:14:29",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "544f5f4c4553535f5448414e5f4c454e4754485f5245515549524544",
                        "id": 3474,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "7743:30:29",
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
                      "id": 3469,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3998,
                      "src": "7591:7:29",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3475,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7591:192:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3476,
                  "nodeType": "ExpressionStatement",
                  "src": "7591:192:29"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3484,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 3477,
                      "name": "result",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3460,
                      "src": "7860:6:29",
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
                          "id": 3482,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3480,
                            "name": "to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3457,
                            "src": "7879:2:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "-",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 3481,
                            "name": "from",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3455,
                            "src": "7884:4:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "7879:9:29",
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
                        "id": 3479,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "lValueRequested": false,
                        "nodeType": "NewExpression",
                        "src": "7869:9:29",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_bytes_memory_$",
                          "typeString": "function (uint256) pure returns (bytes memory)"
                        },
                        "typeName": {
                          "id": 3478,
                          "name": "bytes",
                          "nodeType": "ElementaryTypeName",
                          "src": "7873:5:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_storage_ptr",
                            "typeString": "bytes"
                          }
                        }
                      },
                      "id": 3483,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7869:20:29",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7860:29:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 3485,
                  "nodeType": "ExpressionStatement",
                  "src": "7860:29:29"
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
                            "id": 3487,
                            "name": "result",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3460,
                            "src": "7920:6:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 3488,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "contentAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3370,
                          "src": "7920:21:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) pure returns (uint256)"
                          }
                        },
                        "id": 3489,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "7920:23:29",
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
                        "id": 3494,
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
                              "id": 3490,
                              "name": "b",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3453,
                              "src": "7957:1:29",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            "id": 3491,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "contentAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3370,
                            "src": "7957:16:29",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory) pure returns (uint256)"
                            }
                          },
                          "id": 3492,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7957:18:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "+",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 3493,
                          "name": "from",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3455,
                          "src": "7978:4:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "7957:25:29",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 3495,
                          "name": "result",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3460,
                          "src": "7996:6:29",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 3496,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "length",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "7996:13:29",
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
                      "id": 3486,
                      "name": "memCopy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3451,
                      "src": "7899:7:29",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$_t_uint256_$returns$__$",
                        "typeString": "function (uint256,uint256,uint256) pure"
                      }
                    },
                    "id": 3497,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7899:111:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3498,
                  "nodeType": "ExpressionStatement",
                  "src": "7899:111:29"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3499,
                    "name": "result",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3460,
                    "src": "8027:6:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 3461,
                  "id": 3500,
                  "nodeType": "Return",
                  "src": "8020:13:29"
                }
              ]
            },
            "documentation": "@dev Returns a slices from a byte array.\n @param b The byte array to take a slice from.\n @param from The starting index for the slice (inclusive).\n @param to The final index for the slice (exclusive).\n @return result The slice containing bytes at indices [from, to)",
            "id": 3502,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "slice",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3458,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3453,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3502,
                  "src": "7374:14:29",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3452,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "7374:5:29",
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
                  "id": 3455,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3502,
                  "src": "7390:12:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3454,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "7390:7:29",
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
                  "id": 3457,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3502,
                  "src": "7404:10:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3456,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "7404:7:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7373:42:29"
            },
            "payable": false,
            "returnParameters": {
              "id": 3461,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3460,
                  "name": "result",
                  "nodeType": "VariableDeclaration",
                  "scope": 3502,
                  "src": "7463:19:29",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3459,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "7463:5:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7462:21:29"
            },
            "scope": 3503,
            "src": "7359:681:29",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 3504,
        "src": "601:7445:29"
      }
    ],
    "src": "575:7471:29"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-08T05:31:02.898Z"
}