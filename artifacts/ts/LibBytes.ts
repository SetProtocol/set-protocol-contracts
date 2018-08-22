export const LibBytes = 
{
  "contractName": "LibBytes",
  "abi": [],
  "bytecode": "0x604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a165627a7a723058204fceda415b37b1c3620f0d22b53aabe81398966fe1d2c14802fecf1a76c488910029",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a165627a7a723058204fceda415b37b1c3620f0d22b53aabe81398966fe1d2c14802fecf1a76c488910029",
  "sourceMap": "601:7445:22:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "601:7445:22:-;;;;;;;;",
  "source": "/*\n  Copyright 2018 ZeroEx Intl.\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n    http://www.apache.org/licenses/LICENSE-2.0\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n*/\n\npragma solidity ^0.4.24;\n\nlibrary LibBytes {\n\n    using LibBytes for bytes;\n\n    /// @dev Gets the memory address for the contents of a byte array.\n    /// @param input Byte array to lookup.\n    /// @return memoryAddress Memory address of the contents of the byte array.\n    function contentAddress(bytes memory input)\n        internal\n        pure\n        returns (uint256 memoryAddress)\n    {\n        assembly {\n            memoryAddress := add(input, 32)\n        }\n        return memoryAddress;\n    }\n\n    /// @dev Reads an unpadded bytes4 value from a position in a byte array.\n    /// @param b Byte array containing a bytes4 value.\n    /// @param index Index in byte array of bytes4 value.\n    /// @return bytes4 value from byte array.\n    function readBytes4(\n        bytes memory b,\n        uint256 index)\n        internal\n        pure\n        returns (bytes4 result)\n    {\n        require(\n            b.length >= index + 4,\n            \"GREATER_OR_EQUAL_TO_4_LENGTH_REQUIRED\"\n        );\n        assembly {\n            result := mload(add(b, 32))\n            // Solidity does not require us to clean the trailing bytes.\n            // We do it anyway\n            result := and(result, 0xFFFFFFFF00000000000000000000000000000000000000000000000000000000)\n        }\n        return result;\n    }\n\n\n    /// @dev Reads a bytes32 value from a position in a byte array.\n    /// @param b Byte array containing a bytes32 value.\n    /// @param index Index in byte array of bytes32 value.\n    /// @return bytes32 value from byte array.\n    function readBytes32(\n        bytes memory b,\n        uint256 index\n    )\n        internal\n        pure\n        returns (bytes32 result)\n    {\n        require(\n            b.length >= index + 32,\n            \"GREATER_OR_EQUAL_TO_32_LENGTH_REQUIRED\"\n        );\n\n        // Arrays are prefixed by a 256 bit length parameter\n        index += 32;\n\n        // Read the bytes32 from array memory\n        assembly {\n            result := mload(add(b, index))\n        }\n        return result;\n    }\n\n    /// @dev Copies `length` bytes from memory location `source` to `dest`.\n    /// @param dest memory address to copy bytes to.\n    /// @param source memory address to copy bytes from.\n    /// @param length number of bytes to copy.\n    function memCopy(\n        uint256 dest,\n        uint256 source,\n        uint256 length\n    )\n        internal\n        pure\n    {\n        if (length < 32) {\n            // Handle a partial word by reading destination and masking\n            // off the bits we are interested in.\n            // This correctly handles overlap, zero lengths and source == dest\n            assembly {\n                let mask := sub(exp(256, sub(32, length)), 1)\n                let s := and(mload(source), not(mask))\n                let d := and(mload(dest), mask)\n                mstore(dest, or(s, d))\n            }\n        } else {\n            // Skip the O(length) loop when source == dest.\n            if (source == dest) {\n                return;\n            }\n\n            // For large copies we copy whole words at a time. The final\n            // word is aligned to the end of the range (instead of after the\n            // previous) to handle partial words. So a copy will look like this:\n            //\n            //  ####\n            //      ####\n            //          ####\n            //            ####\n            //\n            // We handle overlap in the source and destination range by\n            // changing the copying direction. This prevents us from\n            // overwriting parts of source that we still need to copy.\n            //\n            // This correctly handles source == dest\n            //\n            if (source > dest) {\n                assembly {\n                    // We subtract 32 from `sEnd` and `dEnd` because it\n                    // is easier to compare with in the loop, and these\n                    // are also the addresses we need for copying the\n                    // last bytes.\n                    length := sub(length, 32)\n                    let sEnd := add(source, length)\n                    let dEnd := add(dest, length)\n\n                    // Remember the last 32 bytes of source\n                    // This needs to be done here and not after the loop\n                    // because we may have overwritten the last bytes in\n                    // source already due to overlap.\n                    let last := mload(sEnd)\n\n                    // Copy whole words front to back\n                    // Note: the first check is always true,\n                    // this could have been a do-while loop.\n                    for {} lt(source, sEnd) {} {\n                        mstore(dest, mload(source))\n                        source := add(source, 32)\n                        dest := add(dest, 32)\n                    }\n                    \n                    // Write the last 32 bytes\n                    mstore(dEnd, last)\n                }\n            } else {\n                assembly {\n                    // We subtract 32 from `sEnd` and `dEnd` because those\n                    // are the starting points when copying a word at the end.\n                    length := sub(length, 32)\n                    let sEnd := add(source, length)\n                    let dEnd := add(dest, length)\n\n                    // Remember the first 32 bytes of source\n                    // This needs to be done here and not after the loop\n                    // because we may have overwritten the first bytes in\n                    // source already due to overlap.\n                    let first := mload(source)\n\n                    // Copy whole words back to front\n                    // We use a signed comparisson here to allow dEnd to become\n                    // negative (happens when source and dest < 32). Valid\n                    // addresses in local memory will never be larger than\n                    // 2**255, so they can be safely re-interpreted as signed.\n                    // Note: the first check is always true,\n                    // this could have been a do-while loop.\n                    for {} slt(dest, dEnd) {} {\n                        mstore(dEnd, mload(sEnd))\n                        sEnd := sub(sEnd, 32)\n                        dEnd := sub(dEnd, 32)\n                    }\n                    \n                    // Write the first 32 bytes\n                    mstore(dest, first)\n                }\n            }\n        }\n    }\n    \n    /// @dev Returns a slices from a byte array.\n    /// @param b The byte array to take a slice from.\n    /// @param from The starting index for the slice (inclusive).\n    /// @param to The final index for the slice (exclusive).\n    /// @return result The slice containing bytes at indices [from, to)\n    function slice(bytes memory b, uint256 from, uint256 to)\n        internal\n        pure\n        returns (bytes memory result)\n    {\n        require(\n            from <= to,\n            \"FROM_LESS_THAN_TO_REQUIRED\"\n        );\n        require(\n            // NOTE: Set Protocol changed from `to < b.length` so that the last byte can be sliced off\n            to <= b.length,\n            \"TO_LESS_THAN_LENGTH_REQUIRED\"\n        );\n        \n        // Create a new bytes structure and copy contents\n        result = new bytes(to - from);\n        memCopy(\n            result.contentAddress(),\n            b.contentAddress() + from,\n            result.length);\n        return result;\n    }    \n}",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
    "exportedSymbols": {
      "LibBytes": [
        4009
      ]
    },
    "id": 4010,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3862,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "575:24:22"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": null,
        "fullyImplemented": true,
        "id": 4009,
        "linearizedBaseContracts": [
          4009
        ],
        "name": "LibBytes",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 3865,
            "libraryName": {
              "contractScope": null,
              "id": 3863,
              "name": "LibBytes",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4009,
              "src": "631:8:22",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibBytes_$4009",
                "typeString": "library LibBytes"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "625:25:22",
            "typeName": {
              "id": 3864,
              "name": "bytes",
              "nodeType": "ElementaryTypeName",
              "src": "644:5:22",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes_storage_ptr",
                "typeString": "bytes"
              }
            }
          },
          {
            "body": {
              "id": 3875,
              "nodeType": "Block",
              "src": "968:110:22",
              "statements": [
                {
                  "externalReferences": [
                    {
                      "memoryAddress": {
                        "declaration": 3870,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1001:13:22",
                        "valueSize": 1
                      }
                    },
                    {
                      "input": {
                        "declaration": 3867,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1022:5:22",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 3872,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    memoryAddress := add(input, 32)\n}",
                  "src": "978:79:22"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3873,
                    "name": "memoryAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3870,
                    "src": "1058:13:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3871,
                  "id": 3874,
                  "nodeType": "Return",
                  "src": "1051:20:22"
                }
              ]
            },
            "documentation": "@dev Gets the memory address for the contents of a byte array.\n @param input Byte array to lookup.\n @return memoryAddress Memory address of the contents of the byte array.",
            "id": 3876,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "contentAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3868,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3867,
                  "name": "input",
                  "nodeType": "VariableDeclaration",
                  "scope": 3876,
                  "src": "874:18:22",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3866,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "874:5:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "873:20:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3871,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3870,
                  "name": "memoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3876,
                  "src": "941:21:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3869,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "941:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "940:23:22"
            },
            "scope": 4009,
            "src": "850:228:22",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3898,
              "nodeType": "Block",
              "src": "1454:420:22",
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
                        "id": 3891,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 3886,
                            "name": "b",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3878,
                            "src": "1485:1:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 3887,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "1485:8:22",
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
                          "id": 3890,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3888,
                            "name": "index",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3880,
                            "src": "1497:5:22",
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
                            "id": 3889,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "1505:1:22",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_4_by_1",
                              "typeString": "int_const 4"
                            },
                            "value": "4"
                          },
                          "src": "1497:9:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "1485:21:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "475245415445525f4f525f455155414c5f544f5f345f4c454e4754485f5245515549524544",
                        "id": 3892,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1520:39:22",
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
                      "id": 3885,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6040,
                        6041
                      ],
                      "referencedDeclaration": 6041,
                      "src": "1464:7:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3893,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1464:105:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3894,
                  "nodeType": "ExpressionStatement",
                  "src": "1464:105:22"
                },
                {
                  "externalReferences": [
                    {
                      "result": {
                        "declaration": 3883,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1746:6:22",
                        "valueSize": 1
                      }
                    },
                    {
                      "result": {
                        "declaration": 3883,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1602:6:22",
                        "valueSize": 1
                      }
                    },
                    {
                      "b": {
                        "declaration": 3878,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1622:1:22",
                        "valueSize": 1
                      }
                    },
                    {
                      "result": {
                        "declaration": 3883,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1760:6:22",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 3895,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    result := mload(add(b, 32))\n    result := and(result, 0xFFFFFFFF00000000000000000000000000000000000000000000000000000000)\n}",
                  "src": "1579:281:22"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3896,
                    "name": "result",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3883,
                    "src": "1861:6:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "functionReturnParameters": 3884,
                  "id": 3897,
                  "nodeType": "Return",
                  "src": "1854:13:22"
                }
              ]
            },
            "documentation": "@dev Reads an unpadded bytes4 value from a position in a byte array.\n @param b Byte array containing a bytes4 value.\n @param index Index in byte array of bytes4 value.\n @return bytes4 value from byte array.",
            "id": 3899,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "readBytes4",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3881,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3878,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3899,
                  "src": "1349:14:22",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3877,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1349:5:22",
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
                  "id": 3880,
                  "name": "index",
                  "nodeType": "VariableDeclaration",
                  "scope": 3899,
                  "src": "1373:13:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3879,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1373:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1339:48:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3884,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3883,
                  "name": "result",
                  "nodeType": "VariableDeclaration",
                  "scope": 3899,
                  "src": "1435:13:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes4",
                    "typeString": "bytes4"
                  },
                  "typeName": {
                    "id": 3882,
                    "name": "bytes4",
                    "nodeType": "ElementaryTypeName",
                    "src": "1435:6:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1434:15:22"
            },
            "scope": 4009,
            "src": "1320:554:22",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3925,
              "nodeType": "Block",
              "src": "2252:349:22",
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
                        "id": 3914,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 3909,
                            "name": "b",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3901,
                            "src": "2283:1:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 3910,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2283:8:22",
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
                          "id": 3913,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3911,
                            "name": "index",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3903,
                            "src": "2295:5:22",
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
                            "id": 3912,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "2303:2:22",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_32_by_1",
                              "typeString": "int_const 32"
                            },
                            "value": "32"
                          },
                          "src": "2295:10:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "2283:22:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "475245415445525f4f525f455155414c5f544f5f33325f4c454e4754485f5245515549524544",
                        "id": 3915,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "2319:40:22",
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
                      "id": 3908,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6040,
                        6041
                      ],
                      "referencedDeclaration": 6041,
                      "src": "2262:7:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3916,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2262:107:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3917,
                  "nodeType": "ExpressionStatement",
                  "src": "2262:107:22"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3920,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 3918,
                      "name": "index",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3903,
                      "src": "2441:5:22",
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
                      "id": 3919,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2450:2:22",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_32_by_1",
                        "typeString": "int_const 32"
                      },
                      "value": "32"
                    },
                    "src": "2441:11:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 3921,
                  "nodeType": "ExpressionStatement",
                  "src": "2441:11:22"
                },
                {
                  "externalReferences": [
                    {
                      "result": {
                        "declaration": 3906,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "2532:6:22",
                        "valueSize": 1
                      }
                    },
                    {
                      "b": {
                        "declaration": 3901,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "2552:1:22",
                        "valueSize": 1
                      }
                    },
                    {
                      "index": {
                        "declaration": 3903,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "2555:5:22",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 3922,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    result := mload(add(b, index))\n}",
                  "src": "2509:78:22"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3923,
                    "name": "result",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3906,
                    "src": "2588:6:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 3907,
                  "id": 3924,
                  "nodeType": "Return",
                  "src": "2581:13:22"
                }
              ]
            },
            "documentation": "@dev Reads a bytes32 value from a position in a byte array.\n @param b Byte array containing a bytes32 value.\n @param index Index in byte array of bytes32 value.\n @return bytes32 value from byte array.",
            "id": 3926,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "readBytes32",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3904,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3901,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3926,
                  "src": "2141:14:22",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3900,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2141:5:22",
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
                  "id": 3903,
                  "name": "index",
                  "nodeType": "VariableDeclaration",
                  "scope": 3926,
                  "src": "2165:13:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3902,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2165:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2131:53:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3907,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3906,
                  "name": "result",
                  "nodeType": "VariableDeclaration",
                  "scope": 3926,
                  "src": "2232:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3905,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2232:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2231:16:22"
            },
            "scope": 4009,
            "src": "2111:490:22",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3956,
              "nodeType": "Block",
              "src": "2967:4080:22",
              "statements": [
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3937,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3935,
                      "name": "length",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3932,
                      "src": "2981:6:22",
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
                      "id": 3936,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2990:2:22",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_32_by_1",
                        "typeString": "int_const 32"
                      },
                      "value": "32"
                    },
                    "src": "2981:11:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": {
                    "id": 3954,
                    "nodeType": "Block",
                    "src": "3453:3588:22",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 3942,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3940,
                            "name": "source",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3930,
                            "src": "3531:6:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 3941,
                            "name": "dest",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3928,
                            "src": "3541:4:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "3531:14:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 3945,
                        "nodeType": "IfStatement",
                        "src": "3527:59:22",
                        "trueBody": {
                          "id": 3944,
                          "nodeType": "Block",
                          "src": "3547:39:22",
                          "statements": [
                            {
                              "expression": null,
                              "functionReturnParameters": 3934,
                              "id": 3943,
                              "nodeType": "Return",
                              "src": "3565:7:22"
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
                          "id": 3948,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3946,
                            "name": "source",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3930,
                            "src": "4266:6:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": ">",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 3947,
                            "name": "dest",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3928,
                            "src": "4275:4:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "4266:13:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": {
                          "id": 3952,
                          "nodeType": "Block",
                          "src": "5552:1479:22",
                          "statements": [
                            {
                              "externalReferences": [
                                {
                                  "length": {
                                    "declaration": 3932,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5769:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3932,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5755:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3930,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5817:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3932,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5825:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3930,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "6185:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3928,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5869:4:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3932,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5875:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3928,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "6710:4:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3928,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "6987:4:22",
                                    "valueSize": 1
                                  }
                                }
                              ],
                              "id": 3951,
                              "nodeType": "InlineAssembly",
                              "operations": "{\n    length := sub(length, 32)\n    let sEnd := add(source, length)\n    let dEnd := add(dest, length)\n    let first := mload(source)\n    for {\n    }\n    slt(dest, dEnd)\n    {\n    }\n    {\n        mstore(dEnd, mload(sEnd))\n        sEnd := sub(sEnd, 32)\n        dEnd := sub(dEnd, 32)\n    }\n    mstore(dest, first)\n}",
                              "src": "5570:1461:22"
                            }
                          ]
                        },
                        "id": 3953,
                        "nodeType": "IfStatement",
                        "src": "4262:2769:22",
                        "trueBody": {
                          "id": 3950,
                          "nodeType": "Block",
                          "src": "4281:1265:22",
                          "statements": [
                            {
                              "externalReferences": [
                                {
                                  "length": {
                                    "declaration": 3932,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4579:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3932,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4593:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3930,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4641:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3932,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4649:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3930,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5219:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3928,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4693:4:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3932,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4699:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3928,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5269:4:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3930,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5281:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3930,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5314:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3928,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5364:4:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3930,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5328:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3928,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5376:4:22",
                                    "valueSize": 1
                                  }
                                }
                              ],
                              "id": 3949,
                              "nodeType": "InlineAssembly",
                              "operations": "{\n    length := sub(length, 32)\n    let sEnd := add(source, length)\n    let dEnd := add(dest, length)\n    let last := mload(sEnd)\n    for {\n    }\n    lt(source, sEnd)\n    {\n    }\n    {\n        mstore(dest, mload(source))\n        source := add(source, 32)\n        dest := add(dest, 32)\n    }\n    mstore(dEnd, last)\n}",
                              "src": "4299:1247:22"
                            }
                          ]
                        }
                      }
                    ]
                  },
                  "id": 3955,
                  "nodeType": "IfStatement",
                  "src": "2977:4064:22",
                  "trueBody": {
                    "id": 3939,
                    "nodeType": "Block",
                    "src": "2994:453:22",
                    "statements": [
                      {
                        "externalReferences": [
                          {
                            "length": {
                              "declaration": 3932,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3269:6:22",
                              "valueSize": 1
                            }
                          },
                          {
                            "dest": {
                              "declaration": 3928,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3372:4:22",
                              "valueSize": 1
                            }
                          },
                          {
                            "source": {
                              "declaration": 3930,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3317:6:22",
                              "valueSize": 1
                            }
                          },
                          {
                            "dest": {
                              "declaration": 3928,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3408:4:22",
                              "valueSize": 1
                            }
                          }
                        ],
                        "id": 3938,
                        "nodeType": "InlineAssembly",
                        "operations": "{\n    let mask := sub(exp(256, sub(32, length)), 1)\n    let s := and(mload(source), not(mask))\n    let d := and(mload(dest), mask)\n    mstore(dest, or(s, d))\n}",
                        "src": "3209:238:22"
                      }
                    ]
                  }
                }
              ]
            },
            "documentation": "@dev Copies `length` bytes from memory location `source` to `dest`.\n @param dest memory address to copy bytes to.\n @param source memory address to copy bytes from.\n @param length number of bytes to copy.",
            "id": 3957,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "memCopy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3933,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3928,
                  "name": "dest",
                  "nodeType": "VariableDeclaration",
                  "scope": 3957,
                  "src": "2866:12:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3927,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2866:7:22",
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
                  "id": 3930,
                  "name": "source",
                  "nodeType": "VariableDeclaration",
                  "scope": 3957,
                  "src": "2888:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3929,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2888:7:22",
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
                  "id": 3932,
                  "name": "length",
                  "nodeType": "VariableDeclaration",
                  "scope": 3957,
                  "src": "2912:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3931,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2912:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2856:76:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3934,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2967:0:22"
            },
            "scope": 4009,
            "src": "2840:4207:22",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4007,
              "nodeType": "Block",
              "src": "7488:552:22",
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
                        "id": 3971,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 3969,
                          "name": "from",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3961,
                          "src": "7519:4:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 3970,
                          "name": "to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3963,
                          "src": "7527:2:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "7519:10:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "46524f4d5f4c4553535f5448414e5f544f5f5245515549524544",
                        "id": 3972,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "7543:28:22",
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
                      "id": 3968,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6040,
                        6041
                      ],
                      "referencedDeclaration": 6041,
                      "src": "7498:7:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3973,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7498:83:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3974,
                  "nodeType": "ExpressionStatement",
                  "src": "7498:83:22"
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
                        "id": 3979,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 3976,
                          "name": "to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3963,
                          "src": "7715:2:22",
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
                            "id": 3977,
                            "name": "b",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3959,
                            "src": "7721:1:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 3978,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "7721:8:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "7715:14:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "544f5f4c4553535f5448414e5f4c454e4754485f5245515549524544",
                        "id": 3980,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "7743:30:22",
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
                      "id": 3975,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6040,
                        6041
                      ],
                      "referencedDeclaration": 6041,
                      "src": "7591:7:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3981,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7591:192:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3982,
                  "nodeType": "ExpressionStatement",
                  "src": "7591:192:22"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3990,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 3983,
                      "name": "result",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3966,
                      "src": "7860:6:22",
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
                          "id": 3988,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3986,
                            "name": "to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3963,
                            "src": "7879:2:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "-",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 3987,
                            "name": "from",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3961,
                            "src": "7884:4:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "7879:9:22",
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
                        "id": 3985,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "lValueRequested": false,
                        "nodeType": "NewExpression",
                        "src": "7869:9:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_bytes_memory_$",
                          "typeString": "function (uint256) pure returns (bytes memory)"
                        },
                        "typeName": {
                          "id": 3984,
                          "name": "bytes",
                          "nodeType": "ElementaryTypeName",
                          "src": "7873:5:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_storage_ptr",
                            "typeString": "bytes"
                          }
                        }
                      },
                      "id": 3989,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7869:20:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7860:29:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 3991,
                  "nodeType": "ExpressionStatement",
                  "src": "7860:29:22"
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
                            "id": 3993,
                            "name": "result",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3966,
                            "src": "7920:6:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 3994,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "contentAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3876,
                          "src": "7920:21:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) pure returns (uint256)"
                          }
                        },
                        "id": 3995,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "7920:23:22",
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
                        "id": 4000,
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
                              "id": 3996,
                              "name": "b",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3959,
                              "src": "7957:1:22",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            "id": 3997,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "contentAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3876,
                            "src": "7957:16:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory) pure returns (uint256)"
                            }
                          },
                          "id": 3998,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7957:18:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "+",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 3999,
                          "name": "from",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3961,
                          "src": "7978:4:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "7957:25:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 4001,
                          "name": "result",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3966,
                          "src": "7996:6:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 4002,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "length",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "7996:13:22",
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
                      "id": 3992,
                      "name": "memCopy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3957,
                      "src": "7899:7:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$_t_uint256_$returns$__$",
                        "typeString": "function (uint256,uint256,uint256) pure"
                      }
                    },
                    "id": 4003,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7899:111:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4004,
                  "nodeType": "ExpressionStatement",
                  "src": "7899:111:22"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4005,
                    "name": "result",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3966,
                    "src": "8027:6:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 3967,
                  "id": 4006,
                  "nodeType": "Return",
                  "src": "8020:13:22"
                }
              ]
            },
            "documentation": "@dev Returns a slices from a byte array.\n @param b The byte array to take a slice from.\n @param from The starting index for the slice (inclusive).\n @param to The final index for the slice (exclusive).\n @return result The slice containing bytes at indices [from, to)",
            "id": 4008,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "slice",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3964,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3959,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 4008,
                  "src": "7374:14:22",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3958,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "7374:5:22",
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
                  "id": 3961,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 4008,
                  "src": "7390:12:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3960,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "7390:7:22",
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
                  "id": 3963,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4008,
                  "src": "7404:10:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3962,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "7404:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7373:42:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3967,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3966,
                  "name": "result",
                  "nodeType": "VariableDeclaration",
                  "scope": 4008,
                  "src": "7463:19:22",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3965,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "7463:5:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7462:21:22"
            },
            "scope": 4009,
            "src": "7359:681:22",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 4010,
        "src": "601:7445:22"
      }
    ],
    "src": "575:7471:22"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
    "exportedSymbols": {
      "LibBytes": [
        4009
      ]
    },
    "id": 4010,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3862,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "575:24:22"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": null,
        "fullyImplemented": true,
        "id": 4009,
        "linearizedBaseContracts": [
          4009
        ],
        "name": "LibBytes",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 3865,
            "libraryName": {
              "contractScope": null,
              "id": 3863,
              "name": "LibBytes",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4009,
              "src": "631:8:22",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibBytes_$4009",
                "typeString": "library LibBytes"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "625:25:22",
            "typeName": {
              "id": 3864,
              "name": "bytes",
              "nodeType": "ElementaryTypeName",
              "src": "644:5:22",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes_storage_ptr",
                "typeString": "bytes"
              }
            }
          },
          {
            "body": {
              "id": 3875,
              "nodeType": "Block",
              "src": "968:110:22",
              "statements": [
                {
                  "externalReferences": [
                    {
                      "memoryAddress": {
                        "declaration": 3870,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1001:13:22",
                        "valueSize": 1
                      }
                    },
                    {
                      "input": {
                        "declaration": 3867,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1022:5:22",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 3872,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    memoryAddress := add(input, 32)\n}",
                  "src": "978:79:22"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3873,
                    "name": "memoryAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3870,
                    "src": "1058:13:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3871,
                  "id": 3874,
                  "nodeType": "Return",
                  "src": "1051:20:22"
                }
              ]
            },
            "documentation": "@dev Gets the memory address for the contents of a byte array.\n @param input Byte array to lookup.\n @return memoryAddress Memory address of the contents of the byte array.",
            "id": 3876,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "contentAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3868,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3867,
                  "name": "input",
                  "nodeType": "VariableDeclaration",
                  "scope": 3876,
                  "src": "874:18:22",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3866,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "874:5:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "873:20:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3871,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3870,
                  "name": "memoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3876,
                  "src": "941:21:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3869,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "941:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "940:23:22"
            },
            "scope": 4009,
            "src": "850:228:22",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3898,
              "nodeType": "Block",
              "src": "1454:420:22",
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
                        "id": 3891,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 3886,
                            "name": "b",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3878,
                            "src": "1485:1:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 3887,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "1485:8:22",
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
                          "id": 3890,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3888,
                            "name": "index",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3880,
                            "src": "1497:5:22",
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
                            "id": 3889,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "1505:1:22",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_4_by_1",
                              "typeString": "int_const 4"
                            },
                            "value": "4"
                          },
                          "src": "1497:9:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "1485:21:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "475245415445525f4f525f455155414c5f544f5f345f4c454e4754485f5245515549524544",
                        "id": 3892,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1520:39:22",
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
                      "id": 3885,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6040,
                        6041
                      ],
                      "referencedDeclaration": 6041,
                      "src": "1464:7:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3893,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1464:105:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3894,
                  "nodeType": "ExpressionStatement",
                  "src": "1464:105:22"
                },
                {
                  "externalReferences": [
                    {
                      "result": {
                        "declaration": 3883,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1746:6:22",
                        "valueSize": 1
                      }
                    },
                    {
                      "result": {
                        "declaration": 3883,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1602:6:22",
                        "valueSize": 1
                      }
                    },
                    {
                      "b": {
                        "declaration": 3878,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1622:1:22",
                        "valueSize": 1
                      }
                    },
                    {
                      "result": {
                        "declaration": 3883,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "1760:6:22",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 3895,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    result := mload(add(b, 32))\n    result := and(result, 0xFFFFFFFF00000000000000000000000000000000000000000000000000000000)\n}",
                  "src": "1579:281:22"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3896,
                    "name": "result",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3883,
                    "src": "1861:6:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "functionReturnParameters": 3884,
                  "id": 3897,
                  "nodeType": "Return",
                  "src": "1854:13:22"
                }
              ]
            },
            "documentation": "@dev Reads an unpadded bytes4 value from a position in a byte array.\n @param b Byte array containing a bytes4 value.\n @param index Index in byte array of bytes4 value.\n @return bytes4 value from byte array.",
            "id": 3899,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "readBytes4",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3881,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3878,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3899,
                  "src": "1349:14:22",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3877,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1349:5:22",
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
                  "id": 3880,
                  "name": "index",
                  "nodeType": "VariableDeclaration",
                  "scope": 3899,
                  "src": "1373:13:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3879,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1373:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1339:48:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3884,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3883,
                  "name": "result",
                  "nodeType": "VariableDeclaration",
                  "scope": 3899,
                  "src": "1435:13:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes4",
                    "typeString": "bytes4"
                  },
                  "typeName": {
                    "id": 3882,
                    "name": "bytes4",
                    "nodeType": "ElementaryTypeName",
                    "src": "1435:6:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1434:15:22"
            },
            "scope": 4009,
            "src": "1320:554:22",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3925,
              "nodeType": "Block",
              "src": "2252:349:22",
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
                        "id": 3914,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 3909,
                            "name": "b",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3901,
                            "src": "2283:1:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 3910,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2283:8:22",
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
                          "id": 3913,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3911,
                            "name": "index",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3903,
                            "src": "2295:5:22",
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
                            "id": 3912,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "2303:2:22",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_32_by_1",
                              "typeString": "int_const 32"
                            },
                            "value": "32"
                          },
                          "src": "2295:10:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "2283:22:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "475245415445525f4f525f455155414c5f544f5f33325f4c454e4754485f5245515549524544",
                        "id": 3915,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "2319:40:22",
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
                      "id": 3908,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6040,
                        6041
                      ],
                      "referencedDeclaration": 6041,
                      "src": "2262:7:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3916,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2262:107:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3917,
                  "nodeType": "ExpressionStatement",
                  "src": "2262:107:22"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3920,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 3918,
                      "name": "index",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3903,
                      "src": "2441:5:22",
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
                      "id": 3919,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2450:2:22",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_32_by_1",
                        "typeString": "int_const 32"
                      },
                      "value": "32"
                    },
                    "src": "2441:11:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 3921,
                  "nodeType": "ExpressionStatement",
                  "src": "2441:11:22"
                },
                {
                  "externalReferences": [
                    {
                      "result": {
                        "declaration": 3906,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "2532:6:22",
                        "valueSize": 1
                      }
                    },
                    {
                      "b": {
                        "declaration": 3901,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "2552:1:22",
                        "valueSize": 1
                      }
                    },
                    {
                      "index": {
                        "declaration": 3903,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "2555:5:22",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 3922,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    result := mload(add(b, index))\n}",
                  "src": "2509:78:22"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3923,
                    "name": "result",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3906,
                    "src": "2588:6:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 3907,
                  "id": 3924,
                  "nodeType": "Return",
                  "src": "2581:13:22"
                }
              ]
            },
            "documentation": "@dev Reads a bytes32 value from a position in a byte array.\n @param b Byte array containing a bytes32 value.\n @param index Index in byte array of bytes32 value.\n @return bytes32 value from byte array.",
            "id": 3926,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "readBytes32",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3904,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3901,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 3926,
                  "src": "2141:14:22",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3900,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2141:5:22",
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
                  "id": 3903,
                  "name": "index",
                  "nodeType": "VariableDeclaration",
                  "scope": 3926,
                  "src": "2165:13:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3902,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2165:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2131:53:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3907,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3906,
                  "name": "result",
                  "nodeType": "VariableDeclaration",
                  "scope": 3926,
                  "src": "2232:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3905,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2232:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2231:16:22"
            },
            "scope": 4009,
            "src": "2111:490:22",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3956,
              "nodeType": "Block",
              "src": "2967:4080:22",
              "statements": [
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3937,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3935,
                      "name": "length",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3932,
                      "src": "2981:6:22",
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
                      "id": 3936,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2990:2:22",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_32_by_1",
                        "typeString": "int_const 32"
                      },
                      "value": "32"
                    },
                    "src": "2981:11:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": {
                    "id": 3954,
                    "nodeType": "Block",
                    "src": "3453:3588:22",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 3942,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3940,
                            "name": "source",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3930,
                            "src": "3531:6:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 3941,
                            "name": "dest",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3928,
                            "src": "3541:4:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "3531:14:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 3945,
                        "nodeType": "IfStatement",
                        "src": "3527:59:22",
                        "trueBody": {
                          "id": 3944,
                          "nodeType": "Block",
                          "src": "3547:39:22",
                          "statements": [
                            {
                              "expression": null,
                              "functionReturnParameters": 3934,
                              "id": 3943,
                              "nodeType": "Return",
                              "src": "3565:7:22"
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
                          "id": 3948,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3946,
                            "name": "source",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3930,
                            "src": "4266:6:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": ">",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 3947,
                            "name": "dest",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3928,
                            "src": "4275:4:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "4266:13:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": {
                          "id": 3952,
                          "nodeType": "Block",
                          "src": "5552:1479:22",
                          "statements": [
                            {
                              "externalReferences": [
                                {
                                  "length": {
                                    "declaration": 3932,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5769:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3932,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5755:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3930,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5817:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3932,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5825:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3930,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "6185:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3928,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5869:4:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3932,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5875:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3928,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "6710:4:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3928,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "6987:4:22",
                                    "valueSize": 1
                                  }
                                }
                              ],
                              "id": 3951,
                              "nodeType": "InlineAssembly",
                              "operations": "{\n    length := sub(length, 32)\n    let sEnd := add(source, length)\n    let dEnd := add(dest, length)\n    let first := mload(source)\n    for {\n    }\n    slt(dest, dEnd)\n    {\n    }\n    {\n        mstore(dEnd, mload(sEnd))\n        sEnd := sub(sEnd, 32)\n        dEnd := sub(dEnd, 32)\n    }\n    mstore(dest, first)\n}",
                              "src": "5570:1461:22"
                            }
                          ]
                        },
                        "id": 3953,
                        "nodeType": "IfStatement",
                        "src": "4262:2769:22",
                        "trueBody": {
                          "id": 3950,
                          "nodeType": "Block",
                          "src": "4281:1265:22",
                          "statements": [
                            {
                              "externalReferences": [
                                {
                                  "length": {
                                    "declaration": 3932,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4579:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3932,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4593:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3930,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4641:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3932,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4649:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3930,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5219:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3928,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4693:4:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "length": {
                                    "declaration": 3932,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "4699:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3928,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5269:4:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3930,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5281:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3930,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5314:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3928,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5364:4:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "source": {
                                    "declaration": 3930,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5328:6:22",
                                    "valueSize": 1
                                  }
                                },
                                {
                                  "dest": {
                                    "declaration": 3928,
                                    "isOffset": false,
                                    "isSlot": false,
                                    "src": "5376:4:22",
                                    "valueSize": 1
                                  }
                                }
                              ],
                              "id": 3949,
                              "nodeType": "InlineAssembly",
                              "operations": "{\n    length := sub(length, 32)\n    let sEnd := add(source, length)\n    let dEnd := add(dest, length)\n    let last := mload(sEnd)\n    for {\n    }\n    lt(source, sEnd)\n    {\n    }\n    {\n        mstore(dest, mload(source))\n        source := add(source, 32)\n        dest := add(dest, 32)\n    }\n    mstore(dEnd, last)\n}",
                              "src": "4299:1247:22"
                            }
                          ]
                        }
                      }
                    ]
                  },
                  "id": 3955,
                  "nodeType": "IfStatement",
                  "src": "2977:4064:22",
                  "trueBody": {
                    "id": 3939,
                    "nodeType": "Block",
                    "src": "2994:453:22",
                    "statements": [
                      {
                        "externalReferences": [
                          {
                            "length": {
                              "declaration": 3932,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3269:6:22",
                              "valueSize": 1
                            }
                          },
                          {
                            "dest": {
                              "declaration": 3928,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3372:4:22",
                              "valueSize": 1
                            }
                          },
                          {
                            "source": {
                              "declaration": 3930,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3317:6:22",
                              "valueSize": 1
                            }
                          },
                          {
                            "dest": {
                              "declaration": 3928,
                              "isOffset": false,
                              "isSlot": false,
                              "src": "3408:4:22",
                              "valueSize": 1
                            }
                          }
                        ],
                        "id": 3938,
                        "nodeType": "InlineAssembly",
                        "operations": "{\n    let mask := sub(exp(256, sub(32, length)), 1)\n    let s := and(mload(source), not(mask))\n    let d := and(mload(dest), mask)\n    mstore(dest, or(s, d))\n}",
                        "src": "3209:238:22"
                      }
                    ]
                  }
                }
              ]
            },
            "documentation": "@dev Copies `length` bytes from memory location `source` to `dest`.\n @param dest memory address to copy bytes to.\n @param source memory address to copy bytes from.\n @param length number of bytes to copy.",
            "id": 3957,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "memCopy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3933,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3928,
                  "name": "dest",
                  "nodeType": "VariableDeclaration",
                  "scope": 3957,
                  "src": "2866:12:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3927,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2866:7:22",
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
                  "id": 3930,
                  "name": "source",
                  "nodeType": "VariableDeclaration",
                  "scope": 3957,
                  "src": "2888:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3929,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2888:7:22",
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
                  "id": 3932,
                  "name": "length",
                  "nodeType": "VariableDeclaration",
                  "scope": 3957,
                  "src": "2912:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3931,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2912:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2856:76:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3934,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2967:0:22"
            },
            "scope": 4009,
            "src": "2840:4207:22",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4007,
              "nodeType": "Block",
              "src": "7488:552:22",
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
                        "id": 3971,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 3969,
                          "name": "from",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3961,
                          "src": "7519:4:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 3970,
                          "name": "to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3963,
                          "src": "7527:2:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "7519:10:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "46524f4d5f4c4553535f5448414e5f544f5f5245515549524544",
                        "id": 3972,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "7543:28:22",
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
                      "id": 3968,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6040,
                        6041
                      ],
                      "referencedDeclaration": 6041,
                      "src": "7498:7:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3973,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7498:83:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3974,
                  "nodeType": "ExpressionStatement",
                  "src": "7498:83:22"
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
                        "id": 3979,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 3976,
                          "name": "to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3963,
                          "src": "7715:2:22",
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
                            "id": 3977,
                            "name": "b",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3959,
                            "src": "7721:1:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 3978,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "7721:8:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "7715:14:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "544f5f4c4553535f5448414e5f4c454e4754485f5245515549524544",
                        "id": 3980,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "7743:30:22",
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
                      "id": 3975,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6040,
                        6041
                      ],
                      "referencedDeclaration": 6041,
                      "src": "7591:7:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3981,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7591:192:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3982,
                  "nodeType": "ExpressionStatement",
                  "src": "7591:192:22"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3990,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 3983,
                      "name": "result",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3966,
                      "src": "7860:6:22",
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
                          "id": 3988,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3986,
                            "name": "to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3963,
                            "src": "7879:2:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "-",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 3987,
                            "name": "from",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3961,
                            "src": "7884:4:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "7879:9:22",
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
                        "id": 3985,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "lValueRequested": false,
                        "nodeType": "NewExpression",
                        "src": "7869:9:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_bytes_memory_$",
                          "typeString": "function (uint256) pure returns (bytes memory)"
                        },
                        "typeName": {
                          "id": 3984,
                          "name": "bytes",
                          "nodeType": "ElementaryTypeName",
                          "src": "7873:5:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_storage_ptr",
                            "typeString": "bytes"
                          }
                        }
                      },
                      "id": 3989,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7869:20:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7860:29:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 3991,
                  "nodeType": "ExpressionStatement",
                  "src": "7860:29:22"
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
                            "id": 3993,
                            "name": "result",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3966,
                            "src": "7920:6:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 3994,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "contentAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3876,
                          "src": "7920:21:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) pure returns (uint256)"
                          }
                        },
                        "id": 3995,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "7920:23:22",
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
                        "id": 4000,
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
                              "id": 3996,
                              "name": "b",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3959,
                              "src": "7957:1:22",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            "id": 3997,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "contentAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3876,
                            "src": "7957:16:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory) pure returns (uint256)"
                            }
                          },
                          "id": 3998,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7957:18:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "+",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 3999,
                          "name": "from",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3961,
                          "src": "7978:4:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "7957:25:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 4001,
                          "name": "result",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3966,
                          "src": "7996:6:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 4002,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "length",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "7996:13:22",
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
                      "id": 3992,
                      "name": "memCopy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3957,
                      "src": "7899:7:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$_t_uint256_$returns$__$",
                        "typeString": "function (uint256,uint256,uint256) pure"
                      }
                    },
                    "id": 4003,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7899:111:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4004,
                  "nodeType": "ExpressionStatement",
                  "src": "7899:111:22"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4005,
                    "name": "result",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3966,
                    "src": "8027:6:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 3967,
                  "id": 4006,
                  "nodeType": "Return",
                  "src": "8020:13:22"
                }
              ]
            },
            "documentation": "@dev Returns a slices from a byte array.\n @param b The byte array to take a slice from.\n @param from The starting index for the slice (inclusive).\n @param to The final index for the slice (exclusive).\n @return result The slice containing bytes at indices [from, to)",
            "id": 4008,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "slice",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3964,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3959,
                  "name": "b",
                  "nodeType": "VariableDeclaration",
                  "scope": 4008,
                  "src": "7374:14:22",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3958,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "7374:5:22",
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
                  "id": 3961,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 4008,
                  "src": "7390:12:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3960,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "7390:7:22",
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
                  "id": 3963,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4008,
                  "src": "7404:10:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3962,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "7404:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7373:42:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3967,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3966,
                  "name": "result",
                  "nodeType": "VariableDeclaration",
                  "scope": 4008,
                  "src": "7463:19:22",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3965,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "7463:5:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7462:21:22"
            },
            "scope": 4009,
            "src": "7359:681:22",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 4010,
        "src": "601:7445:22"
      }
    ],
    "src": "575:7471:22"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T15:29:45.030Z"
}