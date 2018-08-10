export const LibBytes = 
{
  "contractName": "LibBytes",
  "abi": [],
  "bytecode": "0x604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a165627a7a723058209edf53f6ee82a0453e070a88f4be5143ae3f6bf5f0bd4173cf5fb49d00b709ff0029",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a165627a7a723058209edf53f6ee82a0453e070a88f4be5143ae3f6bf5f0bd4173cf5fb49d00b709ff0029",
  "sourceMap": "601:7445:44:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "601:7445:44:-;;;;;;;;",
  "source": "/*\n  Copyright 2018 ZeroEx Intl.\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n    http://www.apache.org/licenses/LICENSE-2.0\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n*/\n\npragma solidity ^0.4.24;\n\nlibrary LibBytes {\n\n    using LibBytes for bytes;\n\n    /// @dev Gets the memory address for the contents of a byte array.\n    /// @param input Byte array to lookup.\n    /// @return memoryAddress Memory address of the contents of the byte array.\n    function contentAddress(bytes memory input)\n        internal\n        pure\n        returns (uint256 memoryAddress)\n    {\n        assembly {\n            memoryAddress := add(input, 32)\n        }\n        return memoryAddress;\n    }\n\n    /// @dev Reads an unpadded bytes4 value from a position in a byte array.\n    /// @param b Byte array containing a bytes4 value.\n    /// @param index Index in byte array of bytes4 value.\n    /// @return bytes4 value from byte array.\n    function readBytes4(\n        bytes memory b,\n        uint256 index)\n        internal\n        pure\n        returns (bytes4 result)\n    {\n        require(\n            b.length >= index + 4,\n            \"GREATER_OR_EQUAL_TO_4_LENGTH_REQUIRED\"\n        );\n        assembly {\n            result := mload(add(b, 32))\n            // Solidity does not require us to clean the trailing bytes.\n            // We do it anyway\n            result := and(result, 0xFFFFFFFF00000000000000000000000000000000000000000000000000000000)\n        }\n        return result;\n    }\n\n\n    /// @dev Reads a bytes32 value from a position in a byte array.\n    /// @param b Byte array containing a bytes32 value.\n    /// @param index Index in byte array of bytes32 value.\n    /// @return bytes32 value from byte array.\n    function readBytes32(\n        bytes memory b,\n        uint256 index\n    )\n        internal\n        pure\n        returns (bytes32 result)\n    {\n        require(\n            b.length >= index + 32,\n            \"GREATER_OR_EQUAL_TO_32_LENGTH_REQUIRED\"\n        );\n\n        // Arrays are prefixed by a 256 bit length parameter\n        index += 32;\n\n        // Read the bytes32 from array memory\n        assembly {\n            result := mload(add(b, index))\n        }\n        return result;\n    }\n\n    /// @dev Copies `length` bytes from memory location `source` to `dest`.\n    /// @param dest memory address to copy bytes to.\n    /// @param source memory address to copy bytes from.\n    /// @param length number of bytes to copy.\n    function memCopy(\n        uint256 dest,\n        uint256 source,\n        uint256 length\n    )\n        internal\n        pure\n    {\n        if (length < 32) {\n            // Handle a partial word by reading destination and masking\n            // off the bits we are interested in.\n            // This correctly handles overlap, zero lengths and source == dest\n            assembly {\n                let mask := sub(exp(256, sub(32, length)), 1)\n                let s := and(mload(source), not(mask))\n                let d := and(mload(dest), mask)\n                mstore(dest, or(s, d))\n            }\n        } else {\n            // Skip the O(length) loop when source == dest.\n            if (source == dest) {\n                return;\n            }\n\n            // For large copies we copy whole words at a time. The final\n            // word is aligned to the end of the range (instead of after the\n            // previous) to handle partial words. So a copy will look like this:\n            //\n            //  ####\n            //      ####\n            //          ####\n            //            ####\n            //\n            // We handle overlap in the source and destination range by\n            // changing the copying direction. This prevents us from\n            // overwriting parts of source that we still need to copy.\n            //\n            // This correctly handles source == dest\n            //\n            if (source > dest) {\n                assembly {\n                    // We subtract 32 from `sEnd` and `dEnd` because it\n                    // is easier to compare with in the loop, and these\n                    // are also the addresses we need for copying the\n                    // last bytes.\n                    length := sub(length, 32)\n                    let sEnd := add(source, length)\n                    let dEnd := add(dest, length)\n\n                    // Remember the last 32 bytes of source\n                    // This needs to be done here and not after the loop\n                    // because we may have overwritten the last bytes in\n                    // source already due to overlap.\n                    let last := mload(sEnd)\n\n                    // Copy whole words front to back\n                    // Note: the first check is always true,\n                    // this could have been a do-while loop.\n                    for {} lt(source, sEnd) {} {\n                        mstore(dest, mload(source))\n                        source := add(source, 32)\n                        dest := add(dest, 32)\n                    }\n                    \n                    // Write the last 32 bytes\n                    mstore(dEnd, last)\n                }\n            } else {\n                assembly {\n                    // We subtract 32 from `sEnd` and `dEnd` because those\n                    // are the starting points when copying a word at the end.\n                    length := sub(length, 32)\n                    let sEnd := add(source, length)\n                    let dEnd := add(dest, length)\n\n                    // Remember the first 32 bytes of source\n                    // This needs to be done here and not after the loop\n                    // because we may have overwritten the first bytes in\n                    // source already due to overlap.\n                    let first := mload(source)\n\n                    // Copy whole words back to front\n                    // We use a signed comparisson here to allow dEnd to become\n                    // negative (happens when source and dest < 32). Valid\n                    // addresses in local memory will never be larger than\n                    // 2**255, so they can be safely re-interpreted as signed.\n                    // Note: the first check is always true,\n                    // this could have been a do-while loop.\n                    for {} slt(dest, dEnd) {} {\n                        mstore(dEnd, mload(sEnd))\n                        sEnd := sub(sEnd, 32)\n                        dEnd := sub(dEnd, 32)\n                    }\n                    \n                    // Write the first 32 bytes\n                    mstore(dest, first)\n                }\n            }\n        }\n    }\n    \n    /// @dev Returns a slices from a byte array.\n    /// @param b The byte array to take a slice from.\n    /// @param from The starting index for the slice (inclusive).\n    /// @param to The final index for the slice (exclusive).\n    /// @return result The slice containing bytes at indices [from, to)\n    function slice(bytes memory b, uint256 from, uint256 to)\n        internal\n        pure\n        returns (bytes memory result)\n    {\n        require(\n            from <= to,\n            \"FROM_LESS_THAN_TO_REQUIRED\"\n        );\n        require(\n            // NOTE: Set Protocol changed from `to < b.length` so that the last byte can be sliced off\n            to <= b.length,\n            \"TO_LESS_THAN_LENGTH_REQUIRED\"\n        );\n        \n        // Create a new bytes structure and copy contents\n        result = new bytes(to - from);\n        memCopy(\n            result.contentAddress(),\n            b.contentAddress() + from,\n            result.length);\n        return result;\n    }    \n}",
  "sourcePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
  "ast": {
    "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
    "exportedSymbols": {
      "LibBytes": [
        4853
      ]
    },
    "id": 4854,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4706,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "575:24:44"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": null,
        "fullyImplemented": true,
        "id": 4853,
        "linearizedBaseContracts": [
          4853
        ],
        "name": "LibBytes",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 4709,
            "libraryName": {
              "contractScope": null,
              "id": 4707,
              "name": "LibBytes",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4853,
              "src": "631:8:44",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibBytes_$4853",
                "typeString": "library LibBytes"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "625:25:44",
            "typeName": {
              "id": 4708,
              "name": "bytes",
              "nodeType": "ElementaryTypeName",
              "src": "644:5:44",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes_storage_ptr",
                "typeString": "bytes"
              }
            }
          },
          {
            "body": {
              "id": 4719,
              "nodeType": "Block",
              "src": "968:110:44",
              "statements": [
                {
                  "externalReferences": [
                    {
                      "memoryAddress": {
                        "declaration": 4714,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1001:13:44",
                        "valueSize": 1
                      }
                    },
                    {
                      "input": {
                        "declaration": 4711,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1022:5:44",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 4716,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    memoryAddress := add(input, 32)\n}",
                  "src": "978:79:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4717,
                    "name": "memoryAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 4714,
                    "src": "1058:13:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 4715,
                  "id": 4718,
                  "nodeType": "Return",
                  "src": "1051:20:44"
                }
              ]
            },
            "documentation": "@dev Gets the memory address for the contents of a byte array.\n @param input Byte array to lookup.\n @return memoryAddress Memory address of the contents of the byte array.",
            "id": 4720,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "contentAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4712,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4711,
                  "name": "input",
                  "nodeType": "VariableDeclaration",
                  "scope": 4720,
                  "src": "874:18:44",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4710,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "874:5:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "873:20:44"
            },
            "payable": false,
            "returnParameters": {
              "id": 4715,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4714,
                  "name": "memoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4720,
                  "src": "941:21:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4713,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "941:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "940:23:44"
            },
            "scope": 4853,
            "src": "850:228:44",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4742,
              "nodeType": "Block",
              "src": "1454:420:44",
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
                        "id": 4735,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 4730,
                            "name": "b",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4722,
                            "src": "1485:1:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 4731,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "1485:8:44",
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
                          "id": 4734,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 4732,
                            "name": "index",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4724,
                            "src": "1497:5:44",
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
                            "id": 4733,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "1505:1:44",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_4_by_1",
                              "typeString": "int_const 4"
                            },
                            "value": "4"
                          },
                          "src": "1497:9:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "1485:21:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "475245415445525f4f525f455155414c5f544f5f345f4c454e4754485f5245515549524544",
                        "id": 4736,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1520:39:44",
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
                      "id": 4729,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7302,
                      "src": "1464:7:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4737,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1464:105:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4738,
                  "nodeType": "ExpressionStatement",
                  "src": "1464:105:44"
                },
                {
                  "externalReferences": [
                    {
                      "result": {
                        "declaration": 4727,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1746:6:44",
                        "valueSize": 1
                      }
                    },
                    {
                      "result": {
                        "declaration": 4727,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1602:6:44",
                        "valueSize": 1
                      }
                    },
                    {
                      "b": {
                        "declaration": 4722,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1622:1:44",
                        "valueSize": 1
                      }
                    },
                    {
                      "result": {
                        "declaration": 4727,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1760:6:44",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 4739,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    result := mload(add(b, 32))\n    result := and(result, 0xFFFFFFFF00000000000000000000000000000000000000000000000000000000)\n}",
                  "src": "1579:281:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4740,
                    "name": "result",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 4727,
                    "src": "1861:6:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "functionReturnParameters": 4728,
                  "id": 4741,
                  "nodeType": "Return",
                  "src": "1854:13:44"
                }
              ]
            },
            "documentation": "@dev Reads an unpadded bytes4 value from a position in a byte array.\n @param b Byte array containing a bytes4 value.\n @param index Index in byte array of bytes4 value.\n @return bytes4 value from byte array.",
            "id": 4743,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "readBytes4",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4725,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4722,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 4743,
                  "src": "1349:14:44",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4721,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1349:5:44",
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
                  "id": 4724,
                  "name": "index",
                  "nodeType": "VariableDeclaration",
                  "scope": 4743,
                  "src": "1373:13:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4723,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1373:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1339:48:44"
            },
            "payable": false,
            "returnParameters": {
              "id": 4728,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4727,
                  "name": "result",
                  "nodeType": "VariableDeclaration",
                  "scope": 4743,
                  "src": "1435:13:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes4",
                    "typeString": "bytes4"
                  },
                  "typeName": {
                    "id": 4726,
                    "name": "bytes4",
                    "nodeType": "ElementaryTypeName",
                    "src": "1435:6:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1434:15:44"
            },
            "scope": 4853,
            "src": "1320:554:44",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4769,
              "nodeType": "Block",
              "src": "2252:349:44",
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
                        "id": 4758,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 4753,
                            "name": "b",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4745,
                            "src": "2283:1:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 4754,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2283:8:44",
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
                          "id": 4757,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 4755,
                            "name": "index",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4747,
                            "src": "2295:5:44",
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
                            "id": 4756,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "2303:2:44",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_32_by_1",
                              "typeString": "int_const 32"
                            },
                            "value": "32"
                          },
                          "src": "2295:10:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "2283:22:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "475245415445525f4f525f455155414c5f544f5f33325f4c454e4754485f5245515549524544",
                        "id": 4759,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "2319:40:44",
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
                      "id": 4752,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7302,
                      "src": "2262:7:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4760,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2262:107:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4761,
                  "nodeType": "ExpressionStatement",
                  "src": "2262:107:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4764,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 4762,
                      "name": "index",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4747,
                      "src": "2441:5:44",
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
                      "id": 4763,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2450:2:44",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_32_by_1",
                        "typeString": "int_const 32"
                      },
                      "value": "32"
                    },
                    "src": "2441:11:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 4765,
                  "nodeType": "ExpressionStatement",
                  "src": "2441:11:44"
                },
                {
                  "externalReferences": [
                    {
                      "result": {
                        "declaration": 4750,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "2532:6:44",
                        "valueSize": 1
                      }
                    },
                    {
                      "b": {
                        "declaration": 4745,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "2552:1:44",
                        "valueSize": 1
                      }
                    },
                    {
                      "index": {
                        "declaration": 4747,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "2555:5:44",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 4766,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    result := mload(add(b, index))\n}",
                  "src": "2509:78:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4767,
                    "name": "result",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 4750,
                    "src": "2588:6:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 4751,
                  "id": 4768,
                  "nodeType": "Return",
                  "src": "2581:13:44"
                }
              ]
            },
            "documentation": "@dev Reads a bytes32 value from a position in a byte array.\n @param b Byte array containing a bytes32 value.\n @param index Index in byte array of bytes32 value.\n @return bytes32 value from byte array.",
            "id": 4770,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "readBytes32",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4748,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4745,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 4770,
                  "src": "2141:14:44",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4744,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2141:5:44",
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
                  "id": 4747,
                  "name": "index",
                  "nodeType": "VariableDeclaration",
                  "scope": 4770,
                  "src": "2165:13:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4746,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2165:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2131:53:44"
            },
            "payable": false,
            "returnParameters": {
              "id": 4751,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4750,
                  "name": "result",
                  "nodeType": "VariableDeclaration",
                  "scope": 4770,
                  "src": "2232:14:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4749,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2232:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2231:16:44"
            },
            "scope": 4853,
            "src": "2111:490:44",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4800,
              "nodeType": "Block",
              "src": "2967:4080:44",
              "statements": [
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 4781,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 4779,
                      "name": "length",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4776,
                      "src": "2981:6:44",
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
                      "id": 4780,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2990:2:44",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_32_by_1",
                        "typeString": "int_const 32"
                      },
                      "value": "32"
                    },
                    "src": "2981:11:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": {
                    "id": 4798,
                    "nodeType": "Block",
                    "src": "3453:3588:44",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 4786,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 4784,
                            "name": "source",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4774,
                            "src": "3531:6:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 4785,
                            "name": "dest",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4772,
                            "src": "3541:4:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "3531:14:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 4789,
                        "nodeType": "IfStatement",
                        "src": "3527:59:44",
                        "trueBody": {
                          "id": 4788,
                          "nodeType": "Block",
                          "src": "3547:39:44",
                          "statements": [
                            {
                              "expression": null,
                              "functionReturnParameters": 4778,
                              "id": 4787,
                              "nodeType": "Return",
                              "src": "3565:7:44"
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
                          "id": 4792,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 4790,
                            "name": "source",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4774,
                            "src": "4266:6:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": ">",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 4791,
                            "name": "dest",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4772,
                            "src": "4275:4:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "4266:13:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": {
                          "id": 4796,
                          "nodeType": "Block",
                          "src": "5552:1479:44",
                          "statements": [
                            {
                              "externalReferences": [
                                {
                                  "length": {
                                    "declaration": 4776,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5769:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 4776,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5755:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 4774,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5817:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 4776,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5825:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 4774,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "6185:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 4772,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5869:4:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 4776,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5875:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 4772,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "6710:4:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 4772,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "6987:4:44",
                                    "valueSize": 1
                                  }
                                }
                              ],
                              "id": 4795,
                              "nodeType": "InlineAssembly",
                              "operations": "{\n    length := sub(length, 32)\n    let sEnd := add(source, length)\n    let dEnd := add(dest, length)\n    let first := mload(source)\n    for {\n    }\n    slt(dest, dEnd)\n    {\n    }\n    {\n        mstore(dEnd, mload(sEnd))\n        sEnd := sub(sEnd, 32)\n        dEnd := sub(dEnd, 32)\n    }\n    mstore(dest, first)\n}",
                              "src": "5570:1461:44"
                            }
                          ]
                        },
                        "id": 4797,
                        "nodeType": "IfStatement",
                        "src": "4262:2769:44",
                        "trueBody": {
                          "id": 4794,
                          "nodeType": "Block",
                          "src": "4281:1265:44",
                          "statements": [
                            {
                              "externalReferences": [
                                {
                                  "length": {
                                    "declaration": 4776,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4579:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 4776,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4593:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 4774,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4641:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 4776,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4649:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 4774,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5219:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 4772,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4693:4:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 4776,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4699:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 4772,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5269:4:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 4774,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5281:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 4774,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5314:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 4772,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5364:4:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 4774,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5328:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 4772,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5376:4:44",
                                    "valueSize": 1
                                  }
                                }
                              ],
                              "id": 4793,
                              "nodeType": "InlineAssembly",
                              "operations": "{\n    length := sub(length, 32)\n    let sEnd := add(source, length)\n    let dEnd := add(dest, length)\n    let last := mload(sEnd)\n    for {\n    }\n    lt(source, sEnd)\n    {\n    }\n    {\n        mstore(dest, mload(source))\n        source := add(source, 32)\n        dest := add(dest, 32)\n    }\n    mstore(dEnd, last)\n}",
                              "src": "4299:1247:44"
                            }
                          ]
                        }
                      }
                    ]
                  },
                  "id": 4799,
                  "nodeType": "IfStatement",
                  "src": "2977:4064:44",
                  "trueBody": {
                    "id": 4783,
                    "nodeType": "Block",
                    "src": "2994:453:44",
                    "statements": [
                      {
                        "externalReferences": [
                          {
                            "length": {
                              "declaration": 4776,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3269:6:44",
                              "valueSize": 1
                            }
                          },
                          {
                            "dest": {
                              "declaration": 4772,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3372:4:44",
                              "valueSize": 1
                            }
                          },
                          {
                            "source": {
                              "declaration": 4774,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3317:6:44",
                              "valueSize": 1
                            }
                          },
                          {
                            "dest": {
                              "declaration": 4772,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3408:4:44",
                              "valueSize": 1
                            }
                          }
                        ],
                        "id": 4782,
                        "nodeType": "InlineAssembly",
                        "operations": "{\n    let mask := sub(exp(256, sub(32, length)), 1)\n    let s := and(mload(source), not(mask))\n    let d := and(mload(dest), mask)\n    mstore(dest, or(s, d))\n}",
                        "src": "3209:238:44"
                      }
                    ]
                  }
                }
              ]
            },
            "documentation": "@dev Copies `length` bytes from memory location `source` to `dest`.\n @param dest memory address to copy bytes to.\n @param source memory address to copy bytes from.\n @param length number of bytes to copy.",
            "id": 4801,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "memCopy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4777,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4772,
                  "name": "dest",
                  "nodeType": "VariableDeclaration",
                  "scope": 4801,
                  "src": "2866:12:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4771,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2866:7:44",
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
                  "id": 4774,
                  "name": "source",
                  "nodeType": "VariableDeclaration",
                  "scope": 4801,
                  "src": "2888:14:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4773,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2888:7:44",
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
                  "id": 4776,
                  "name": "length",
                  "nodeType": "VariableDeclaration",
                  "scope": 4801,
                  "src": "2912:14:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4775,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2912:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2856:76:44"
            },
            "payable": false,
            "returnParameters": {
              "id": 4778,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2967:0:44"
            },
            "scope": 4853,
            "src": "2840:4207:44",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4851,
              "nodeType": "Block",
              "src": "7488:552:44",
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
                        "id": 4815,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 4813,
                          "name": "from",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4805,
                          "src": "7519:4:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 4814,
                          "name": "to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4807,
                          "src": "7527:2:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "7519:10:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "46524f4d5f4c4553535f5448414e5f544f5f5245515549524544",
                        "id": 4816,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "7543:28:44",
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
                      "id": 4812,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7302,
                      "src": "7498:7:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4817,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7498:83:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4818,
                  "nodeType": "ExpressionStatement",
                  "src": "7498:83:44"
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
                        "id": 4823,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 4820,
                          "name": "to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4807,
                          "src": "7715:2:44",
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
                            "id": 4821,
                            "name": "b",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4803,
                            "src": "7721:1:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 4822,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "7721:8:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "7715:14:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "544f5f4c4553535f5448414e5f4c454e4754485f5245515549524544",
                        "id": 4824,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "7743:30:44",
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
                      "id": 4819,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7302,
                      "src": "7591:7:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4825,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7591:192:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4826,
                  "nodeType": "ExpressionStatement",
                  "src": "7591:192:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4834,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 4827,
                      "name": "result",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4810,
                      "src": "7860:6:44",
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
                          "id": 4832,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 4830,
                            "name": "to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4807,
                            "src": "7879:2:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "-",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 4831,
                            "name": "from",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4805,
                            "src": "7884:4:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "7879:9:44",
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
                        "id": 4829,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "lValueRequested": false,
                        "nodeType": "NewExpression",
                        "src": "7869:9:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_bytes_memory_$",
                          "typeString": "function (uint256) pure returns (bytes memory)"
                        },
                        "typeName": {
                          "id": 4828,
                          "name": "bytes",
                          "nodeType": "ElementaryTypeName",
                          "src": "7873:5:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_storage_ptr",
                            "typeString": "bytes"
                          }
                        }
                      },
                      "id": 4833,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7869:20:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7860:29:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 4835,
                  "nodeType": "ExpressionStatement",
                  "src": "7860:29:44"
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
                            "id": 4837,
                            "name": "result",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4810,
                            "src": "7920:6:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 4838,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "contentAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4720,
                          "src": "7920:21:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) pure returns (uint256)"
                          }
                        },
                        "id": 4839,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "7920:23:44",
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
                        "id": 4844,
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
                              "id": 4840,
                              "name": "b",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4803,
                              "src": "7957:1:44",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            "id": 4841,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "contentAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 4720,
                            "src": "7957:16:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory) pure returns (uint256)"
                            }
                          },
                          "id": 4842,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7957:18:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "+",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 4843,
                          "name": "from",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4805,
                          "src": "7978:4:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "7957:25:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 4845,
                          "name": "result",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4810,
                          "src": "7996:6:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 4846,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "length",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "7996:13:44",
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
                      "id": 4836,
                      "name": "memCopy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4801,
                      "src": "7899:7:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$_t_uint256_$returns$__$",
                        "typeString": "function (uint256,uint256,uint256) pure"
                      }
                    },
                    "id": 4847,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7899:111:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4848,
                  "nodeType": "ExpressionStatement",
                  "src": "7899:111:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4849,
                    "name": "result",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 4810,
                    "src": "8027:6:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 4811,
                  "id": 4850,
                  "nodeType": "Return",
                  "src": "8020:13:44"
                }
              ]
            },
            "documentation": "@dev Returns a slices from a byte array.\n @param b The byte array to take a slice from.\n @param from The starting index for the slice (inclusive).\n @param to The final index for the slice (exclusive).\n @return result The slice containing bytes at indices [from, to)",
            "id": 4852,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "slice",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4808,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4803,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 4852,
                  "src": "7374:14:44",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4802,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "7374:5:44",
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
                  "id": 4805,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 4852,
                  "src": "7390:12:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4804,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "7390:7:44",
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
                  "id": 4807,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4852,
                  "src": "7404:10:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4806,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "7404:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7373:42:44"
            },
            "payable": false,
            "returnParameters": {
              "id": 4811,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4810,
                  "name": "result",
                  "nodeType": "VariableDeclaration",
                  "scope": 4852,
                  "src": "7463:19:44",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4809,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "7463:5:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7462:21:44"
            },
            "scope": 4853,
            "src": "7359:681:44",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 4854,
        "src": "601:7445:44"
      }
    ],
    "src": "575:7471:44"
  },
  "legacyAST": {
    "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
    "exportedSymbols": {
      "LibBytes": [
        4853
      ]
    },
    "id": 4854,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4706,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "575:24:44"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": null,
        "fullyImplemented": true,
        "id": 4853,
        "linearizedBaseContracts": [
          4853
        ],
        "name": "LibBytes",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 4709,
            "libraryName": {
              "contractScope": null,
              "id": 4707,
              "name": "LibBytes",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4853,
              "src": "631:8:44",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibBytes_$4853",
                "typeString": "library LibBytes"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "625:25:44",
            "typeName": {
              "id": 4708,
              "name": "bytes",
              "nodeType": "ElementaryTypeName",
              "src": "644:5:44",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes_storage_ptr",
                "typeString": "bytes"
              }
            }
          },
          {
            "body": {
              "id": 4719,
              "nodeType": "Block",
              "src": "968:110:44",
              "statements": [
                {
                  "externalReferences": [
                    {
                      "memoryAddress": {
                        "declaration": 4714,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1001:13:44",
                        "valueSize": 1
                      }
                    },
                    {
                      "input": {
                        "declaration": 4711,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1022:5:44",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 4716,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    memoryAddress := add(input, 32)\n}",
                  "src": "978:79:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4717,
                    "name": "memoryAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 4714,
                    "src": "1058:13:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 4715,
                  "id": 4718,
                  "nodeType": "Return",
                  "src": "1051:20:44"
                }
              ]
            },
            "documentation": "@dev Gets the memory address for the contents of a byte array.\n @param input Byte array to lookup.\n @return memoryAddress Memory address of the contents of the byte array.",
            "id": 4720,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "contentAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4712,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4711,
                  "name": "input",
                  "nodeType": "VariableDeclaration",
                  "scope": 4720,
                  "src": "874:18:44",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4710,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "874:5:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "873:20:44"
            },
            "payable": false,
            "returnParameters": {
              "id": 4715,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4714,
                  "name": "memoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4720,
                  "src": "941:21:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4713,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "941:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "940:23:44"
            },
            "scope": 4853,
            "src": "850:228:44",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4742,
              "nodeType": "Block",
              "src": "1454:420:44",
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
                        "id": 4735,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 4730,
                            "name": "b",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4722,
                            "src": "1485:1:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 4731,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "1485:8:44",
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
                          "id": 4734,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 4732,
                            "name": "index",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4724,
                            "src": "1497:5:44",
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
                            "id": 4733,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "1505:1:44",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_4_by_1",
                              "typeString": "int_const 4"
                            },
                            "value": "4"
                          },
                          "src": "1497:9:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "1485:21:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "475245415445525f4f525f455155414c5f544f5f345f4c454e4754485f5245515549524544",
                        "id": 4736,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1520:39:44",
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
                      "id": 4729,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7302,
                      "src": "1464:7:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4737,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1464:105:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4738,
                  "nodeType": "ExpressionStatement",
                  "src": "1464:105:44"
                },
                {
                  "externalReferences": [
                    {
                      "result": {
                        "declaration": 4727,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1746:6:44",
                        "valueSize": 1
                      }
                    },
                    {
                      "result": {
                        "declaration": 4727,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1602:6:44",
                        "valueSize": 1
                      }
                    },
                    {
                      "b": {
                        "declaration": 4722,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1622:1:44",
                        "valueSize": 1
                      }
                    },
                    {
                      "result": {
                        "declaration": 4727,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1760:6:44",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 4739,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    result := mload(add(b, 32))\n    result := and(result, 0xFFFFFFFF00000000000000000000000000000000000000000000000000000000)\n}",
                  "src": "1579:281:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4740,
                    "name": "result",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 4727,
                    "src": "1861:6:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "functionReturnParameters": 4728,
                  "id": 4741,
                  "nodeType": "Return",
                  "src": "1854:13:44"
                }
              ]
            },
            "documentation": "@dev Reads an unpadded bytes4 value from a position in a byte array.\n @param b Byte array containing a bytes4 value.\n @param index Index in byte array of bytes4 value.\n @return bytes4 value from byte array.",
            "id": 4743,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "readBytes4",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4725,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4722,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 4743,
                  "src": "1349:14:44",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4721,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1349:5:44",
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
                  "id": 4724,
                  "name": "index",
                  "nodeType": "VariableDeclaration",
                  "scope": 4743,
                  "src": "1373:13:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4723,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1373:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1339:48:44"
            },
            "payable": false,
            "returnParameters": {
              "id": 4728,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4727,
                  "name": "result",
                  "nodeType": "VariableDeclaration",
                  "scope": 4743,
                  "src": "1435:13:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes4",
                    "typeString": "bytes4"
                  },
                  "typeName": {
                    "id": 4726,
                    "name": "bytes4",
                    "nodeType": "ElementaryTypeName",
                    "src": "1435:6:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1434:15:44"
            },
            "scope": 4853,
            "src": "1320:554:44",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4769,
              "nodeType": "Block",
              "src": "2252:349:44",
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
                        "id": 4758,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 4753,
                            "name": "b",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4745,
                            "src": "2283:1:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 4754,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2283:8:44",
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
                          "id": 4757,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 4755,
                            "name": "index",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4747,
                            "src": "2295:5:44",
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
                            "id": 4756,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "2303:2:44",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_32_by_1",
                              "typeString": "int_const 32"
                            },
                            "value": "32"
                          },
                          "src": "2295:10:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "2283:22:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "475245415445525f4f525f455155414c5f544f5f33325f4c454e4754485f5245515549524544",
                        "id": 4759,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "2319:40:44",
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
                      "id": 4752,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7302,
                      "src": "2262:7:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4760,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2262:107:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4761,
                  "nodeType": "ExpressionStatement",
                  "src": "2262:107:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4764,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 4762,
                      "name": "index",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4747,
                      "src": "2441:5:44",
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
                      "id": 4763,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2450:2:44",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_32_by_1",
                        "typeString": "int_const 32"
                      },
                      "value": "32"
                    },
                    "src": "2441:11:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 4765,
                  "nodeType": "ExpressionStatement",
                  "src": "2441:11:44"
                },
                {
                  "externalReferences": [
                    {
                      "result": {
                        "declaration": 4750,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "2532:6:44",
                        "valueSize": 1
                      }
                    },
                    {
                      "b": {
                        "declaration": 4745,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "2552:1:44",
                        "valueSize": 1
                      }
                    },
                    {
                      "index": {
                        "declaration": 4747,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "2555:5:44",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 4766,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    result := mload(add(b, index))\n}",
                  "src": "2509:78:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4767,
                    "name": "result",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 4750,
                    "src": "2588:6:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 4751,
                  "id": 4768,
                  "nodeType": "Return",
                  "src": "2581:13:44"
                }
              ]
            },
            "documentation": "@dev Reads a bytes32 value from a position in a byte array.\n @param b Byte array containing a bytes32 value.\n @param index Index in byte array of bytes32 value.\n @return bytes32 value from byte array.",
            "id": 4770,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "readBytes32",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4748,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4745,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 4770,
                  "src": "2141:14:44",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4744,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2141:5:44",
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
                  "id": 4747,
                  "name": "index",
                  "nodeType": "VariableDeclaration",
                  "scope": 4770,
                  "src": "2165:13:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4746,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2165:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2131:53:44"
            },
            "payable": false,
            "returnParameters": {
              "id": 4751,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4750,
                  "name": "result",
                  "nodeType": "VariableDeclaration",
                  "scope": 4770,
                  "src": "2232:14:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4749,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2232:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2231:16:44"
            },
            "scope": 4853,
            "src": "2111:490:44",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4800,
              "nodeType": "Block",
              "src": "2967:4080:44",
              "statements": [
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 4781,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 4779,
                      "name": "length",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4776,
                      "src": "2981:6:44",
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
                      "id": 4780,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2990:2:44",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_32_by_1",
                        "typeString": "int_const 32"
                      },
                      "value": "32"
                    },
                    "src": "2981:11:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": {
                    "id": 4798,
                    "nodeType": "Block",
                    "src": "3453:3588:44",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 4786,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 4784,
                            "name": "source",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4774,
                            "src": "3531:6:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 4785,
                            "name": "dest",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4772,
                            "src": "3541:4:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "3531:14:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 4789,
                        "nodeType": "IfStatement",
                        "src": "3527:59:44",
                        "trueBody": {
                          "id": 4788,
                          "nodeType": "Block",
                          "src": "3547:39:44",
                          "statements": [
                            {
                              "expression": null,
                              "functionReturnParameters": 4778,
                              "id": 4787,
                              "nodeType": "Return",
                              "src": "3565:7:44"
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
                          "id": 4792,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 4790,
                            "name": "source",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4774,
                            "src": "4266:6:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": ">",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 4791,
                            "name": "dest",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4772,
                            "src": "4275:4:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "4266:13:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": {
                          "id": 4796,
                          "nodeType": "Block",
                          "src": "5552:1479:44",
                          "statements": [
                            {
                              "externalReferences": [
                                {
                                  "length": {
                                    "declaration": 4776,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5769:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 4776,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5755:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 4774,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5817:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 4776,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5825:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 4774,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "6185:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 4772,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5869:4:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 4776,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5875:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 4772,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "6710:4:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 4772,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "6987:4:44",
                                    "valueSize": 1
                                  }
                                }
                              ],
                              "id": 4795,
                              "nodeType": "InlineAssembly",
                              "operations": "{\n    length := sub(length, 32)\n    let sEnd := add(source, length)\n    let dEnd := add(dest, length)\n    let first := mload(source)\n    for {\n    }\n    slt(dest, dEnd)\n    {\n    }\n    {\n        mstore(dEnd, mload(sEnd))\n        sEnd := sub(sEnd, 32)\n        dEnd := sub(dEnd, 32)\n    }\n    mstore(dest, first)\n}",
                              "src": "5570:1461:44"
                            }
                          ]
                        },
                        "id": 4797,
                        "nodeType": "IfStatement",
                        "src": "4262:2769:44",
                        "trueBody": {
                          "id": 4794,
                          "nodeType": "Block",
                          "src": "4281:1265:44",
                          "statements": [
                            {
                              "externalReferences": [
                                {
                                  "length": {
                                    "declaration": 4776,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4579:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 4776,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4593:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 4774,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4641:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 4776,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4649:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 4774,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5219:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 4772,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4693:4:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 4776,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4699:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 4772,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5269:4:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 4774,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5281:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 4774,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5314:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 4772,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5364:4:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 4774,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5328:6:44",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 4772,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5376:4:44",
                                    "valueSize": 1
                                  }
                                }
                              ],
                              "id": 4793,
                              "nodeType": "InlineAssembly",
                              "operations": "{\n    length := sub(length, 32)\n    let sEnd := add(source, length)\n    let dEnd := add(dest, length)\n    let last := mload(sEnd)\n    for {\n    }\n    lt(source, sEnd)\n    {\n    }\n    {\n        mstore(dest, mload(source))\n        source := add(source, 32)\n        dest := add(dest, 32)\n    }\n    mstore(dEnd, last)\n}",
                              "src": "4299:1247:44"
                            }
                          ]
                        }
                      }
                    ]
                  },
                  "id": 4799,
                  "nodeType": "IfStatement",
                  "src": "2977:4064:44",
                  "trueBody": {
                    "id": 4783,
                    "nodeType": "Block",
                    "src": "2994:453:44",
                    "statements": [
                      {
                        "externalReferences": [
                          {
                            "length": {
                              "declaration": 4776,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3269:6:44",
                              "valueSize": 1
                            }
                          },
                          {
                            "dest": {
                              "declaration": 4772,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3372:4:44",
                              "valueSize": 1
                            }
                          },
                          {
                            "source": {
                              "declaration": 4774,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3317:6:44",
                              "valueSize": 1
                            }
                          },
                          {
                            "dest": {
                              "declaration": 4772,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3408:4:44",
                              "valueSize": 1
                            }
                          }
                        ],
                        "id": 4782,
                        "nodeType": "InlineAssembly",
                        "operations": "{\n    let mask := sub(exp(256, sub(32, length)), 1)\n    let s := and(mload(source), not(mask))\n    let d := and(mload(dest), mask)\n    mstore(dest, or(s, d))\n}",
                        "src": "3209:238:44"
                      }
                    ]
                  }
                }
              ]
            },
            "documentation": "@dev Copies `length` bytes from memory location `source` to `dest`.\n @param dest memory address to copy bytes to.\n @param source memory address to copy bytes from.\n @param length number of bytes to copy.",
            "id": 4801,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "memCopy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4777,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4772,
                  "name": "dest",
                  "nodeType": "VariableDeclaration",
                  "scope": 4801,
                  "src": "2866:12:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4771,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2866:7:44",
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
                  "id": 4774,
                  "name": "source",
                  "nodeType": "VariableDeclaration",
                  "scope": 4801,
                  "src": "2888:14:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4773,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2888:7:44",
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
                  "id": 4776,
                  "name": "length",
                  "nodeType": "VariableDeclaration",
                  "scope": 4801,
                  "src": "2912:14:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4775,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2912:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2856:76:44"
            },
            "payable": false,
            "returnParameters": {
              "id": 4778,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2967:0:44"
            },
            "scope": 4853,
            "src": "2840:4207:44",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4851,
              "nodeType": "Block",
              "src": "7488:552:44",
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
                        "id": 4815,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 4813,
                          "name": "from",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4805,
                          "src": "7519:4:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 4814,
                          "name": "to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4807,
                          "src": "7527:2:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "7519:10:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "46524f4d5f4c4553535f5448414e5f544f5f5245515549524544",
                        "id": 4816,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "7543:28:44",
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
                      "id": 4812,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7302,
                      "src": "7498:7:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4817,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7498:83:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4818,
                  "nodeType": "ExpressionStatement",
                  "src": "7498:83:44"
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
                        "id": 4823,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 4820,
                          "name": "to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4807,
                          "src": "7715:2:44",
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
                            "id": 4821,
                            "name": "b",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4803,
                            "src": "7721:1:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 4822,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "7721:8:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "7715:14:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "544f5f4c4553535f5448414e5f4c454e4754485f5245515549524544",
                        "id": 4824,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "7743:30:44",
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
                      "id": 4819,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7302,
                      "src": "7591:7:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4825,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7591:192:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4826,
                  "nodeType": "ExpressionStatement",
                  "src": "7591:192:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4834,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 4827,
                      "name": "result",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4810,
                      "src": "7860:6:44",
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
                          "id": 4832,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 4830,
                            "name": "to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4807,
                            "src": "7879:2:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "-",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 4831,
                            "name": "from",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4805,
                            "src": "7884:4:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "7879:9:44",
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
                        "id": 4829,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "lValueRequested": false,
                        "nodeType": "NewExpression",
                        "src": "7869:9:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_bytes_memory_$",
                          "typeString": "function (uint256) pure returns (bytes memory)"
                        },
                        "typeName": {
                          "id": 4828,
                          "name": "bytes",
                          "nodeType": "ElementaryTypeName",
                          "src": "7873:5:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_storage_ptr",
                            "typeString": "bytes"
                          }
                        }
                      },
                      "id": 4833,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7869:20:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7860:29:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 4835,
                  "nodeType": "ExpressionStatement",
                  "src": "7860:29:44"
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
                            "id": 4837,
                            "name": "result",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4810,
                            "src": "7920:6:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 4838,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "contentAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4720,
                          "src": "7920:21:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) pure returns (uint256)"
                          }
                        },
                        "id": 4839,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "7920:23:44",
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
                        "id": 4844,
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
                              "id": 4840,
                              "name": "b",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4803,
                              "src": "7957:1:44",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            "id": 4841,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "contentAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 4720,
                            "src": "7957:16:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory) pure returns (uint256)"
                            }
                          },
                          "id": 4842,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7957:18:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "+",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 4843,
                          "name": "from",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4805,
                          "src": "7978:4:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "7957:25:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 4845,
                          "name": "result",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4810,
                          "src": "7996:6:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 4846,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "length",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "7996:13:44",
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
                      "id": 4836,
                      "name": "memCopy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4801,
                      "src": "7899:7:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$_t_uint256_$returns$__$",
                        "typeString": "function (uint256,uint256,uint256) pure"
                      }
                    },
                    "id": 4847,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7899:111:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4848,
                  "nodeType": "ExpressionStatement",
                  "src": "7899:111:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4849,
                    "name": "result",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 4810,
                    "src": "8027:6:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 4811,
                  "id": 4850,
                  "nodeType": "Return",
                  "src": "8020:13:44"
                }
              ]
            },
            "documentation": "@dev Returns a slices from a byte array.\n @param b The byte array to take a slice from.\n @param from The starting index for the slice (inclusive).\n @param to The final index for the slice (exclusive).\n @return result The slice containing bytes at indices [from, to)",
            "id": 4852,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "slice",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4808,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4803,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 4852,
                  "src": "7374:14:44",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4802,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "7374:5:44",
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
                  "id": 4805,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 4852,
                  "src": "7390:12:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4804,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "7390:7:44",
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
                  "id": 4807,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4852,
                  "src": "7404:10:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4806,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "7404:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7373:42:44"
            },
            "payable": false,
            "returnParameters": {
              "id": 4811,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4810,
                  "name": "result",
                  "nodeType": "VariableDeclaration",
                  "scope": 4852,
                  "src": "7463:19:44",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4809,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "7463:5:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7462:21:44"
            },
            "scope": 4853,
            "src": "7359:681:44",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 4854,
        "src": "601:7445:44"
      }
    ],
    "src": "575:7471:44"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-10T21:21:49.384Z"
}