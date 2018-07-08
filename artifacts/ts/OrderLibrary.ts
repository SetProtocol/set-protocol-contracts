export const OrderLibrary = 
{
  "contractName": "OrderLibrary",
  "abi": [],
  "bytecode": "0x604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a165627a7a72305820dc38d811cede3dd71f8da609be69708448fafa098a323a2e43bcac4237d6fcb80029",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a165627a7a72305820dc38d811cede3dd71f8da609be69708448fafa098a323a2e43bcac4237d6fcb80029",
  "sourceMap": "772:2758:25:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "772:2758:25:-;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\n/**\n * @title OrderLibrary\n * @author Set Protocol\n *\n * The Order Library contains functions for checking validation and hashing of Orders.\n *\n */\n\nlibrary OrderLibrary {\n\n    /* ============ Structs ============ */\n\n    struct IssuanceOrder {\n        address setAddress;             // _addresses[0]\n        uint256 quantity;               // _values[0]\n        address makerAddress;           // _addresses[1]\n        address makerToken;             // _addresses[2]\n        uint256 makerTokenAmount;       // _values[1]\n        uint256 expiration;             // _values[2]\n        address relayerAddress;         // _addresses[3]\n        address relayerToken;           // _addresses[4]\n        uint256 relayerTokenAmount;     // _values[3]\n        uint256 salt;                   // _values[4]\n        bytes32 orderHash;\n    }\n\n    /* ============ Internal Functions ============ */\n\n    /**\n     * Create hash of order parameters\n     *\n     * @param  _addresses       [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n     * @param  _values          [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n     */\n    function generateOrderHash(\n        address[5] _addresses,\n        uint[5] _values\n    )\n        internal\n        pure\n        returns(bytes32)\n    {\n        // Hash the order parameters\n        return keccak256(\n            abi.encodePacked(\n                _addresses[0], // setAddress\n                _addresses[1], // makerAddress\n                _addresses[2], // makerToken\n                _addresses[3], // relayerAddress\n                _addresses[4], // relayerToken\n                _values[0],    // quantity\n                _values[1],    // makerTokenAmount\n                _values[2],    // expiration\n                _values[3],    // relayerTokenAmount\n                _values[4]     // salt\n            )\n        );\n    }\n\n    /**\n     * Validate order signature\n     *\n     * @param  _orderHash       Hash of issuance order\n     * @param  _signerAddress   Address of Issuance Order signer\n     * @param  _v               v element of ECDSA signature\n     * @param  _r               r element of ECDSA signature\n     * @param  _s               s element of ECDSA signature\n     */\n    function validateSignature(\n        bytes32 _orderHash,\n        address _signerAddress,\n        uint8 _v,\n        bytes32 _r,\n        bytes32 _s\n    )\n        internal\n        pure\n        returns(bool)\n    {\n        // Public address returned by ecrecover function\n        address recAddress;\n\n        // Ethereum msg prefix\n        bytes memory msgPrefix = \"\\x19Ethereum Signed Message:\\n32\";\n\n        // Find what address signed the order\n        recAddress = ecrecover(\n            keccak256(abi.encodePacked(msgPrefix, _orderHash)),\n            _v,\n            _r,\n            _s\n        );\n\n        return recAddress == _signerAddress;\n    }\n\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
    "exportedSymbols": {
      "OrderLibrary": [
        3405
      ]
    },
    "id": 3406,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3289,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:25"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title OrderLibrary\n@author Set Protocol\n * The Order Library contains functions for checking validation and hashing of Orders.\n ",
        "fullyImplemented": true,
        "id": 3405,
        "linearizedBaseContracts": [
          3405
        ],
        "name": "OrderLibrary",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "OrderLibrary.IssuanceOrder",
            "id": 3312,
            "members": [
              {
                "constant": false,
                "id": 3291,
                "name": "setAddress",
                "nodeType": "VariableDeclaration",
                "scope": 3312,
                "src": "876:18:25",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3290,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "876:7:25",
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
                "id": 3293,
                "name": "quantity",
                "nodeType": "VariableDeclaration",
                "scope": 3312,
                "src": "933:16:25",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3292,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "933:7:25",
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
                "id": 3295,
                "name": "makerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 3312,
                "src": "987:20:25",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3294,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "987:7:25",
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
                "id": 3297,
                "name": "makerToken",
                "nodeType": "VariableDeclaration",
                "scope": 3312,
                "src": "1044:18:25",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3296,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1044:7:25",
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
                "id": 3299,
                "name": "makerTokenAmount",
                "nodeType": "VariableDeclaration",
                "scope": 3312,
                "src": "1101:24:25",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3298,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1101:7:25",
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
                "id": 3301,
                "name": "expiration",
                "nodeType": "VariableDeclaration",
                "scope": 3312,
                "src": "1155:18:25",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3300,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1155:7:25",
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
                "id": 3303,
                "name": "relayerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 3312,
                "src": "1209:22:25",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3302,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1209:7:25",
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
                "id": 3305,
                "name": "relayerToken",
                "nodeType": "VariableDeclaration",
                "scope": 3312,
                "src": "1266:20:25",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3304,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1266:7:25",
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
                "id": 3307,
                "name": "relayerTokenAmount",
                "nodeType": "VariableDeclaration",
                "scope": 3312,
                "src": "1323:26:25",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3306,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1323:7:25",
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
                "id": 3309,
                "name": "salt",
                "nodeType": "VariableDeclaration",
                "scope": 3312,
                "src": "1377:12:25",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3308,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1377:7:25",
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
                "id": 3311,
                "name": "orderHash",
                "nodeType": "VariableDeclaration",
                "scope": 3312,
                "src": "1431:17:25",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes32",
                  "typeString": "bytes32"
                },
                "typeName": {
                  "id": 3310,
                  "name": "bytes32",
                  "nodeType": "ElementaryTypeName",
                  "src": "1431:7:25",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "IssuanceOrder",
            "nodeType": "StructDefinition",
            "scope": 3405,
            "src": "845:610:25",
            "visibility": "public"
          },
          {
            "body": {
              "id": 3361,
              "nodeType": "Block",
              "src": "1927:589:25",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3328,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3316,
                              "src": "2038:10:25",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 3330,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 3329,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2049:1:25",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "2038:13:25",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3331,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3316,
                              "src": "2083:10:25",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 3333,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 3332,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2094:1:25",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_1_by_1",
                                "typeString": "int_const 1"
                              },
                              "value": "1"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "2083:13:25",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3334,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3316,
                              "src": "2130:10:25",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 3336,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "32",
                              "id": 3335,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2141:1:25",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_2_by_1",
                                "typeString": "int_const 2"
                              },
                              "value": "2"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "2130:13:25",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3337,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3316,
                              "src": "2175:10:25",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 3339,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "33",
                              "id": 3338,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2186:1:25",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_3_by_1",
                                "typeString": "int_const 3"
                              },
                              "value": "3"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "2175:13:25",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3340,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3316,
                              "src": "2224:10:25",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 3342,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "34",
                              "id": 3341,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2235:1:25",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_4_by_1",
                                "typeString": "int_const 4"
                              },
                              "value": "4"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "2224:13:25",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3343,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3320,
                              "src": "2271:7:25",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                                "typeString": "uint256[5] memory"
                              }
                            },
                            "id": 3345,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 3344,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2279:1:25",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "2271:10:25",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3346,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3320,
                              "src": "2314:7:25",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                                "typeString": "uint256[5] memory"
                              }
                            },
                            "id": 3348,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 3347,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2322:1:25",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_1_by_1",
                                "typeString": "int_const 1"
                              },
                              "value": "1"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "2314:10:25",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3349,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3320,
                              "src": "2365:7:25",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                                "typeString": "uint256[5] memory"
                              }
                            },
                            "id": 3351,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "32",
                              "id": 3350,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2373:1:25",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_2_by_1",
                                "typeString": "int_const 2"
                              },
                              "value": "2"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "2365:10:25",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3352,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3320,
                              "src": "2410:7:25",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                                "typeString": "uint256[5] memory"
                              }
                            },
                            "id": 3354,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "33",
                              "id": 3353,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2418:1:25",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_3_by_1",
                                "typeString": "int_const 3"
                              },
                              "value": "3"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "2410:10:25",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3355,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3320,
                              "src": "2463:7:25",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                                "typeString": "uint256[5] memory"
                              }
                            },
                            "id": 3357,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "34",
                              "id": 3356,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2471:1:25",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_4_by_1",
                                "typeString": "int_const 4"
                              },
                              "value": "4"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "2463:10:25",
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
                            },
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
                          "expression": {
                            "argumentTypes": null,
                            "id": 3326,
                            "name": "abi",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6343,
                            "src": "2004:3:25",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_abi",
                              "typeString": "abi"
                            }
                          },
                          "id": 3327,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "memberName": "encodePacked",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2004:16:25",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                            "typeString": "function () pure returns (bytes memory)"
                          }
                        },
                        "id": 3358,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2004:495:25",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      ],
                      "id": 3325,
                      "name": "keccak256",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6350,
                      "src": "1981:9:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                        "typeString": "function () pure returns (bytes32)"
                      }
                    },
                    "id": 3359,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1981:528:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 3324,
                  "id": 3360,
                  "nodeType": "Return",
                  "src": "1974:535:25"
                }
              ]
            },
            "documentation": "Create hash of order parameters\n     * @param  _addresses       [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values          [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]",
            "id": 3362,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "generateOrderHash",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3321,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3316,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 3362,
                  "src": "1815:21:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3313,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1815:7:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3315,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 3314,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1823:1:25",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "1815:10:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$5_storage_ptr",
                      "typeString": "address[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3320,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 3362,
                  "src": "1846:15:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3317,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1846:4:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3319,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 3318,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1851:1:25",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "1846:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$5_storage_ptr",
                      "typeString": "uint256[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1805:62:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3324,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3323,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3362,
                  "src": "1914:7:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3322,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1914:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1913:9:25"
            },
            "scope": 3405,
            "src": "1779:737:25",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3403,
              "nodeType": "Block",
              "src": "3087:440:25",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3378,
                      "name": "recAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 3404,
                      "src": "3154:18:25",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 3377,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "3154:7:25",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3379,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3154:18:25"
                },
                {
                  "assignments": [
                    3381
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3381,
                      "name": "msgPrefix",
                      "nodeType": "VariableDeclaration",
                      "scope": 3404,
                      "src": "3214:22:25",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 3380,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "3214:5:25",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3383,
                  "initialValue": {
                    "argumentTypes": null,
                    "hexValue": "19457468657265756d205369676e6564204d6573736167653a0a3332",
                    "id": 3382,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "string",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "3239:34:25",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_stringliteral_178a2411ab6fbc1ba11064408972259c558d0e82fd48b0aba3ad81d14f065e73",
                      "typeString": "literal_string \"\u0019Ethereum Signed Message:\n32\""
                    },
                    "value": "\u0019Ethereum Signed Message:\n32"
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3214:59:25"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3397,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 3384,
                      "name": "recAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3378,
                      "src": "3330:10:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "arguments": [
                                {
                                  "argumentTypes": null,
                                  "id": 3389,
                                  "name": "msgPrefix",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 3381,
                                  "src": "3393:9:25",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bytes_memory_ptr",
                                    "typeString": "bytes memory"
                                  }
                                },
                                {
                                  "argumentTypes": null,
                                  "id": 3390,
                                  "name": "_orderHash",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 3364,
                                  "src": "3404:10:25",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bytes32",
                                    "typeString": "bytes32"
                                  }
                                }
                              ],
                              "expression": {
                                "argumentTypes": [
                                  {
                                    "typeIdentifier": "t_bytes_memory_ptr",
                                    "typeString": "bytes memory"
                                  },
                                  {
                                    "typeIdentifier": "t_bytes32",
                                    "typeString": "bytes32"
                                  }
                                ],
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 3387,
                                  "name": "abi",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 6343,
                                  "src": "3376:3:25",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_magic_abi",
                                    "typeString": "abi"
                                  }
                                },
                                "id": 3388,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "lValueRequested": false,
                                "memberName": "encodePacked",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": null,
                                "src": "3376:16:25",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                                  "typeString": "function () pure returns (bytes memory)"
                                }
                              },
                              "id": 3391,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "3376:39:25",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            ],
                            "id": 3386,
                            "name": "keccak256",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6350,
                            "src": "3366:9:25",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                              "typeString": "function () pure returns (bytes32)"
                            }
                          },
                          "id": 3392,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3366:50:25",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 3393,
                          "name": "_v",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3368,
                          "src": "3430:2:25",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint8",
                            "typeString": "uint8"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 3394,
                          "name": "_r",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3370,
                          "src": "3446:2:25",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 3395,
                          "name": "_s",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3372,
                          "src": "3462:2:25",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          },
                          {
                            "typeIdentifier": "t_uint8",
                            "typeString": "uint8"
                          },
                          {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          },
                          {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        ],
                        "id": 3385,
                        "name": "ecrecover",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6348,
                        "src": "3343:9:25",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_ecrecover_pure$_t_bytes32_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_address_$",
                          "typeString": "function (bytes32,uint8,bytes32,bytes32) pure returns (address)"
                        }
                      },
                      "id": 3396,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "3343:131:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "3330:144:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 3398,
                  "nodeType": "ExpressionStatement",
                  "src": "3330:144:25"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    },
                    "id": 3401,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3399,
                      "name": "recAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3378,
                      "src": "3492:10:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 3400,
                      "name": "_signerAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3366,
                      "src": "3506:14:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "3492:28:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 3376,
                  "id": 3402,
                  "nodeType": "Return",
                  "src": "3485:35:25"
                }
              ]
            },
            "documentation": "Validate order signature\n     * @param  _orderHash       Hash of issuance order\n@param  _signerAddress   Address of Issuance Order signer\n@param  _v               v element of ECDSA signature\n@param  _r               r element of ECDSA signature\n@param  _s               s element of ECDSA signature",
            "id": 3404,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validateSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3373,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3364,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 3404,
                  "src": "2916:18:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3363,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2916:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3366,
                  "name": "_signerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3404,
                  "src": "2944:22:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3365,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2944:7:25",
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
                  "id": 3368,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 3404,
                  "src": "2976:8:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 3367,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "2976:5:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3370,
                  "name": "_r",
                  "nodeType": "VariableDeclaration",
                  "scope": 3404,
                  "src": "2994:10:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3369,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2994:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3372,
                  "name": "_s",
                  "nodeType": "VariableDeclaration",
                  "scope": 3404,
                  "src": "3014:10:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3371,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "3014:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2906:124:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3376,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3375,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3404,
                  "src": "3077:4:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3374,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "3077:4:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3076:6:25"
            },
            "scope": 3405,
            "src": "2880:647:25",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 3406,
        "src": "772:2758:25"
      }
    ],
    "src": "597:2934:25"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
    "exportedSymbols": {
      "OrderLibrary": [
        3405
      ]
    },
    "id": 3406,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3289,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:25"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title OrderLibrary\n@author Set Protocol\n * The Order Library contains functions for checking validation and hashing of Orders.\n ",
        "fullyImplemented": true,
        "id": 3405,
        "linearizedBaseContracts": [
          3405
        ],
        "name": "OrderLibrary",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "OrderLibrary.IssuanceOrder",
            "id": 3312,
            "members": [
              {
                "constant": false,
                "id": 3291,
                "name": "setAddress",
                "nodeType": "VariableDeclaration",
                "scope": 3312,
                "src": "876:18:25",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3290,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "876:7:25",
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
                "id": 3293,
                "name": "quantity",
                "nodeType": "VariableDeclaration",
                "scope": 3312,
                "src": "933:16:25",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3292,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "933:7:25",
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
                "id": 3295,
                "name": "makerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 3312,
                "src": "987:20:25",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3294,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "987:7:25",
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
                "id": 3297,
                "name": "makerToken",
                "nodeType": "VariableDeclaration",
                "scope": 3312,
                "src": "1044:18:25",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3296,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1044:7:25",
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
                "id": 3299,
                "name": "makerTokenAmount",
                "nodeType": "VariableDeclaration",
                "scope": 3312,
                "src": "1101:24:25",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3298,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1101:7:25",
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
                "id": 3301,
                "name": "expiration",
                "nodeType": "VariableDeclaration",
                "scope": 3312,
                "src": "1155:18:25",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3300,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1155:7:25",
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
                "id": 3303,
                "name": "relayerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 3312,
                "src": "1209:22:25",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3302,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1209:7:25",
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
                "id": 3305,
                "name": "relayerToken",
                "nodeType": "VariableDeclaration",
                "scope": 3312,
                "src": "1266:20:25",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3304,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1266:7:25",
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
                "id": 3307,
                "name": "relayerTokenAmount",
                "nodeType": "VariableDeclaration",
                "scope": 3312,
                "src": "1323:26:25",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3306,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1323:7:25",
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
                "id": 3309,
                "name": "salt",
                "nodeType": "VariableDeclaration",
                "scope": 3312,
                "src": "1377:12:25",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3308,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1377:7:25",
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
                "id": 3311,
                "name": "orderHash",
                "nodeType": "VariableDeclaration",
                "scope": 3312,
                "src": "1431:17:25",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes32",
                  "typeString": "bytes32"
                },
                "typeName": {
                  "id": 3310,
                  "name": "bytes32",
                  "nodeType": "ElementaryTypeName",
                  "src": "1431:7:25",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "IssuanceOrder",
            "nodeType": "StructDefinition",
            "scope": 3405,
            "src": "845:610:25",
            "visibility": "public"
          },
          {
            "body": {
              "id": 3361,
              "nodeType": "Block",
              "src": "1927:589:25",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3328,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3316,
                              "src": "2038:10:25",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 3330,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 3329,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2049:1:25",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "2038:13:25",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3331,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3316,
                              "src": "2083:10:25",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 3333,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 3332,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2094:1:25",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_1_by_1",
                                "typeString": "int_const 1"
                              },
                              "value": "1"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "2083:13:25",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3334,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3316,
                              "src": "2130:10:25",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 3336,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "32",
                              "id": 3335,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2141:1:25",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_2_by_1",
                                "typeString": "int_const 2"
                              },
                              "value": "2"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "2130:13:25",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3337,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3316,
                              "src": "2175:10:25",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 3339,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "33",
                              "id": 3338,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2186:1:25",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_3_by_1",
                                "typeString": "int_const 3"
                              },
                              "value": "3"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "2175:13:25",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3340,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3316,
                              "src": "2224:10:25",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 3342,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "34",
                              "id": 3341,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2235:1:25",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_4_by_1",
                                "typeString": "int_const 4"
                              },
                              "value": "4"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "2224:13:25",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3343,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3320,
                              "src": "2271:7:25",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                                "typeString": "uint256[5] memory"
                              }
                            },
                            "id": 3345,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 3344,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2279:1:25",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "2271:10:25",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3346,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3320,
                              "src": "2314:7:25",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                                "typeString": "uint256[5] memory"
                              }
                            },
                            "id": 3348,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 3347,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2322:1:25",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_1_by_1",
                                "typeString": "int_const 1"
                              },
                              "value": "1"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "2314:10:25",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3349,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3320,
                              "src": "2365:7:25",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                                "typeString": "uint256[5] memory"
                              }
                            },
                            "id": 3351,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "32",
                              "id": 3350,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2373:1:25",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_2_by_1",
                                "typeString": "int_const 2"
                              },
                              "value": "2"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "2365:10:25",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3352,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3320,
                              "src": "2410:7:25",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                                "typeString": "uint256[5] memory"
                              }
                            },
                            "id": 3354,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "33",
                              "id": 3353,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2418:1:25",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_3_by_1",
                                "typeString": "int_const 3"
                              },
                              "value": "3"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "2410:10:25",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3355,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3320,
                              "src": "2463:7:25",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                                "typeString": "uint256[5] memory"
                              }
                            },
                            "id": 3357,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "34",
                              "id": 3356,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2471:1:25",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_4_by_1",
                                "typeString": "int_const 4"
                              },
                              "value": "4"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "2463:10:25",
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
                            },
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
                          "expression": {
                            "argumentTypes": null,
                            "id": 3326,
                            "name": "abi",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6343,
                            "src": "2004:3:25",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_abi",
                              "typeString": "abi"
                            }
                          },
                          "id": 3327,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "memberName": "encodePacked",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2004:16:25",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                            "typeString": "function () pure returns (bytes memory)"
                          }
                        },
                        "id": 3358,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2004:495:25",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      ],
                      "id": 3325,
                      "name": "keccak256",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6350,
                      "src": "1981:9:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                        "typeString": "function () pure returns (bytes32)"
                      }
                    },
                    "id": 3359,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1981:528:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 3324,
                  "id": 3360,
                  "nodeType": "Return",
                  "src": "1974:535:25"
                }
              ]
            },
            "documentation": "Create hash of order parameters\n     * @param  _addresses       [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values          [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]",
            "id": 3362,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "generateOrderHash",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3321,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3316,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 3362,
                  "src": "1815:21:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3313,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1815:7:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3315,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 3314,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1823:1:25",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "1815:10:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$5_storage_ptr",
                      "typeString": "address[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3320,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 3362,
                  "src": "1846:15:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3317,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1846:4:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3319,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 3318,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1851:1:25",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "1846:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$5_storage_ptr",
                      "typeString": "uint256[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1805:62:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3324,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3323,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3362,
                  "src": "1914:7:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3322,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1914:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1913:9:25"
            },
            "scope": 3405,
            "src": "1779:737:25",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3403,
              "nodeType": "Block",
              "src": "3087:440:25",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3378,
                      "name": "recAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 3404,
                      "src": "3154:18:25",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 3377,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "3154:7:25",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3379,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3154:18:25"
                },
                {
                  "assignments": [
                    3381
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3381,
                      "name": "msgPrefix",
                      "nodeType": "VariableDeclaration",
                      "scope": 3404,
                      "src": "3214:22:25",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 3380,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "3214:5:25",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3383,
                  "initialValue": {
                    "argumentTypes": null,
                    "hexValue": "19457468657265756d205369676e6564204d6573736167653a0a3332",
                    "id": 3382,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "string",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "3239:34:25",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_stringliteral_178a2411ab6fbc1ba11064408972259c558d0e82fd48b0aba3ad81d14f065e73",
                      "typeString": "literal_string \"\u0019Ethereum Signed Message:\n32\""
                    },
                    "value": "\u0019Ethereum Signed Message:\n32"
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3214:59:25"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3397,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 3384,
                      "name": "recAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3378,
                      "src": "3330:10:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "arguments": [
                                {
                                  "argumentTypes": null,
                                  "id": 3389,
                                  "name": "msgPrefix",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 3381,
                                  "src": "3393:9:25",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bytes_memory_ptr",
                                    "typeString": "bytes memory"
                                  }
                                },
                                {
                                  "argumentTypes": null,
                                  "id": 3390,
                                  "name": "_orderHash",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 3364,
                                  "src": "3404:10:25",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bytes32",
                                    "typeString": "bytes32"
                                  }
                                }
                              ],
                              "expression": {
                                "argumentTypes": [
                                  {
                                    "typeIdentifier": "t_bytes_memory_ptr",
                                    "typeString": "bytes memory"
                                  },
                                  {
                                    "typeIdentifier": "t_bytes32",
                                    "typeString": "bytes32"
                                  }
                                ],
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 3387,
                                  "name": "abi",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 6343,
                                  "src": "3376:3:25",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_magic_abi",
                                    "typeString": "abi"
                                  }
                                },
                                "id": 3388,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "lValueRequested": false,
                                "memberName": "encodePacked",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": null,
                                "src": "3376:16:25",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                                  "typeString": "function () pure returns (bytes memory)"
                                }
                              },
                              "id": 3391,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "3376:39:25",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            ],
                            "id": 3386,
                            "name": "keccak256",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6350,
                            "src": "3366:9:25",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                              "typeString": "function () pure returns (bytes32)"
                            }
                          },
                          "id": 3392,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3366:50:25",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 3393,
                          "name": "_v",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3368,
                          "src": "3430:2:25",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint8",
                            "typeString": "uint8"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 3394,
                          "name": "_r",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3370,
                          "src": "3446:2:25",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 3395,
                          "name": "_s",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3372,
                          "src": "3462:2:25",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          },
                          {
                            "typeIdentifier": "t_uint8",
                            "typeString": "uint8"
                          },
                          {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          },
                          {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        ],
                        "id": 3385,
                        "name": "ecrecover",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6348,
                        "src": "3343:9:25",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_ecrecover_pure$_t_bytes32_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_address_$",
                          "typeString": "function (bytes32,uint8,bytes32,bytes32) pure returns (address)"
                        }
                      },
                      "id": 3396,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "3343:131:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "3330:144:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 3398,
                  "nodeType": "ExpressionStatement",
                  "src": "3330:144:25"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    },
                    "id": 3401,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3399,
                      "name": "recAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3378,
                      "src": "3492:10:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 3400,
                      "name": "_signerAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3366,
                      "src": "3506:14:25",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "3492:28:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 3376,
                  "id": 3402,
                  "nodeType": "Return",
                  "src": "3485:35:25"
                }
              ]
            },
            "documentation": "Validate order signature\n     * @param  _orderHash       Hash of issuance order\n@param  _signerAddress   Address of Issuance Order signer\n@param  _v               v element of ECDSA signature\n@param  _r               r element of ECDSA signature\n@param  _s               s element of ECDSA signature",
            "id": 3404,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validateSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3373,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3364,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 3404,
                  "src": "2916:18:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3363,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2916:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3366,
                  "name": "_signerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3404,
                  "src": "2944:22:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3365,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2944:7:25",
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
                  "id": 3368,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 3404,
                  "src": "2976:8:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 3367,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "2976:5:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3370,
                  "name": "_r",
                  "nodeType": "VariableDeclaration",
                  "scope": 3404,
                  "src": "2994:10:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3369,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2994:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3372,
                  "name": "_s",
                  "nodeType": "VariableDeclaration",
                  "scope": 3404,
                  "src": "3014:10:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3371,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "3014:7:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2906:124:25"
            },
            "payable": false,
            "returnParameters": {
              "id": 3376,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3375,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3404,
                  "src": "3077:4:25",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3374,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "3077:4:25",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3076:6:25"
            },
            "scope": 3405,
            "src": "2880:647:25",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 3406,
        "src": "772:2758:25"
      }
    ],
    "src": "597:2934:25"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-08T01:11:15.198Z"
}