export const OrderLibrary = 
{
  "contractName": "OrderLibrary",
  "abi": [],
  "bytecode": "0x604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a165627a7a72305820013a512bd9b396c272b8e38267165aecf5b2ad37713775df5aa8c31eb4e62f170029",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a165627a7a72305820013a512bd9b396c272b8e38267165aecf5b2ad37713775df5aa8c31eb4e62f170029",
  "sourceMap": "856:6213:21:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "856:6213:21:-;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\n\n\n/**\n * @title OrderLibrary\n * @author Set Protocol\n *\n * The Order Library contains functions for checking validation and hashing of Issuance Orders.\n *\n */\n\nlibrary OrderLibrary {\n    using SafeMath for uint256;\n\n    /* ============ Structs ============ */\n\n    /**\n     * Struct containing all parameters for the issuance order\n     *\n     * @param  setAddress                   Set the maker wants to mint\n     * @param  makerAddress                 Address of maker of the Issuance Order\n     * @param  makerToken                   Address of token maker wants to exchange for filling issuance order\n     * @param  relayerAddress               Address of relayer\n     * @param  relayerToken                 Token relayer wants to be compensated in\n     * @param  quantity                     Amount of Sets maker is looking to mint\n     * @param  makerTokenAmount             Amount of makerToken to be used to fill the order\n     * @param  expiration                   Timestamp marking when the order expires\n     * @param  makerRelayerFee              Amount of relayer tokens maker must pay for execution\n     * @param  takerRelayerFee              Amount of relayer tokens taker must pay for execution\n     * @param  salt                         Random number used to create unique orderHash\n     * @param  requiredComponents           Components to be acquired by taker's exchange orders\n     * @param  requiredComponentAmounts     Amounts of each component to be acquired by exchange order\n     * @param  orderHash                    Unique order identifier used to log information about the order in the protocol\n     */\n    struct IssuanceOrder {\n        address setAddress;                 // _addresses[0]\n        address makerAddress;               // _addresses[1]\n        address makerToken;                 // _addresses[2]\n        address relayerAddress;             // _addresses[3]\n        address relayerToken;               // _addresses[4]\n        uint256 quantity;                   // _values[0]\n        uint256 makerTokenAmount;           // _values[1]\n        uint256 expiration;                 // _values[2]\n        uint256 makerRelayerFee;            // _values[3]\n        uint256 takerRelayerFee;            // _values[4]\n        uint256 salt;                       // _values[5]\n        address[] requiredComponents;       // _requiredComponents\n        uint256[] requiredComponentAmounts;    // _requiredComponentAmounts\n        bytes32 orderHash;\n    }\n\n    /* ============ Internal Functions ============ */\n\n    /**\n     * Create hash of order parameters\n     *\n     * @param  _addresses                   [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n     * @param  _values                      [quantity, makerTokenAmount, expiration, makerRelayerFee, takerRelayerFee, salt]\n     * @param  _requiredComponents          Components to be acquired by exchange order\n     * @param  _requiredComponentAmounts    Amounts of each component to be acquired by exchange order\n     */\n    function generateOrderHash(\n        address[5] _addresses,\n        uint256[6] _values,\n        address[] _requiredComponents,\n        uint256[] _requiredComponentAmounts\n    )\n        internal\n        pure\n        returns(bytes32)\n    {\n        // Hash the order parameters\n        return keccak256(\n            abi.encodePacked(\n                _addresses[0],              // setAddress\n                _addresses[1],              // makerAddress\n                _addresses[2],              // makerToken\n                _addresses[3],              // relayerAddress\n                _addresses[4],              // relayerToken\n                _values[0],                 // quantity\n                _values[1],                 // makerTokenAmount\n                _values[2],                 // expiration\n                _values[3],                 // makerRelayerFee\n                _values[4],                 // takerRelayerFee\n                _values[5],                 // salt\n                _requiredComponents,        // _requiredComponents\n                _requiredComponentAmounts   // _requiredComponentAmounts\n            )\n        );\n    }\n\n    /**\n     * Validate order signature\n     *\n     * @param  _orderHash       Hash of issuance order\n     * @param  _signerAddress   Address of Issuance Order signer\n     * @param  _v               v element of ECDSA signature\n     * @param  _r               r element of ECDSA signature\n     * @param  _s               s element of ECDSA signature\n     */\n    function validateSignature(\n        bytes32 _orderHash,\n        address _signerAddress,\n        uint8 _v,\n        bytes32 _r,\n        bytes32 _s\n    )\n        internal\n        pure\n        returns(bool)\n    {\n        // Public address returned by ecrecover function\n        address recAddress;\n\n        // Ethereum msg prefix\n        bytes memory msgPrefix = \"\\x19Ethereum Signed Message:\\n32\";\n\n        // Find what address signed the order\n        recAddress = ecrecover(\n            keccak256(abi.encodePacked(msgPrefix, _orderHash)),\n            _v,\n            _r,\n            _s\n        );\n\n        return recAddress == _signerAddress;\n    }\n\n    /**\n     * Checks for rounding errors and returns value of potential partial amounts of a principal\n     *\n     * @param  _principal       Number fractional amount is derived from\n     * @param  _numerator       Numerator of fraction\n     * @param  _denominator     Denominator of fraction\n     * @return uint256          Fractional amount of principal calculated\n     */\n    function getPartialAmount(\n        uint256 _principal,\n        uint256 _numerator,\n        uint256 _denominator\n    )\n        internal\n        returns (uint256)\n    {\n        // Get remainder of partial amount (if 0 not a partial amount)\n        uint256 remainder = mulmod(_principal, _numerator, _denominator);\n\n        // Return if not a partial amount\n        if (remainder == 0) {\n            return _principal.mul(_numerator).div(_denominator);\n        }\n\n        // Calculate error percentage\n        uint256 errPercentageTimes1000000 = remainder.mul(1000000).div(_numerator.mul(_principal));\n\n        // Require error percentage is less than 0.1%.\n        require(errPercentageTimes1000000 < 1000);\n        \n        return _principal.mul(_numerator).div(_denominator);\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
    "exportedSymbols": {
      "OrderLibrary": [
        3954
      ]
    },
    "id": 3955,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3754,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:21"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 3756,
        "nodeType": "ImportDirective",
        "scope": 3955,
        "sourceUnit": 6464,
        "src": "622:73:21",
        "symbolAliases": [
          {
            "foreign": 3755,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title OrderLibrary\n@author Set Protocol\n * The Order Library contains functions for checking validation and hashing of Issuance Orders.\n ",
        "fullyImplemented": true,
        "id": 3954,
        "linearizedBaseContracts": [
          3954
        ],
        "name": "OrderLibrary",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 3759,
            "libraryName": {
              "contractScope": null,
              "id": 3757,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6463,
              "src": "889:8:21",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6463",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "883:27:21",
            "typeName": {
              "id": 3758,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "902:7:21",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "canonicalName": "OrderLibrary.IssuanceOrder",
            "id": 3790,
            "members": [
              {
                "constant": false,
                "id": 3761,
                "name": "setAddress",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "2366:18:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3760,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2366:7:21",
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
                "id": 3763,
                "name": "makerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "2427:20:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3762,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2427:7:21",
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
                "id": 3765,
                "name": "makerToken",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "2488:18:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3764,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2488:7:21",
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
                "id": 3767,
                "name": "relayerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "2549:22:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3766,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2549:7:21",
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
                "id": 3769,
                "name": "relayerToken",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "2610:20:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3768,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2610:7:21",
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
                "id": 3771,
                "name": "quantity",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "2671:16:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3770,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2671:7:21",
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
                "id": 3773,
                "name": "makerTokenAmount",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "2729:24:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3772,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2729:7:21",
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
                "id": 3775,
                "name": "expiration",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "2787:18:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3774,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2787:7:21",
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
                "id": 3777,
                "name": "makerRelayerFee",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "2845:23:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3776,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2845:7:21",
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
                "id": 3779,
                "name": "takerRelayerFee",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "2903:23:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3778,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2903:7:21",
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
                "id": 3781,
                "name": "salt",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "2961:12:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3780,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2961:7:21",
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
                "id": 3784,
                "name": "requiredComponents",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "3019:28:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 3782,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3019:7:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 3783,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "3019:9:21",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                    "typeString": "address[]"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 3787,
                "name": "requiredComponentAmounts",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "3086:34:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                  "typeString": "uint256[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 3785,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3086:7:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 3786,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "3086:9:21",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                    "typeString": "uint256[]"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 3789,
                "name": "orderHash",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "3162:17:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes32",
                  "typeString": "bytes32"
                },
                "typeName": {
                  "id": 3788,
                  "name": "bytes32",
                  "nodeType": "ElementaryTypeName",
                  "src": "3162:7:21",
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
            "scope": 3954,
            "src": "2335:851:21",
            "visibility": "public"
          },
          {
            "body": {
              "id": 3850,
              "nodeType": "Block",
              "src": "3974:919:21",
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
                              "id": 3812,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3794,
                              "src": "4085:10:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 3814,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 3813,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4096:1:21",
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
                            "src": "4085:13:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3815,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3794,
                              "src": "4143:10:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 3817,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 3816,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4154:1:21",
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
                            "src": "4143:13:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3818,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3794,
                              "src": "4203:10:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 3820,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "32",
                              "id": 3819,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4214:1:21",
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
                            "src": "4203:13:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3821,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3794,
                              "src": "4261:10:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 3823,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "33",
                              "id": 3822,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4272:1:21",
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
                            "src": "4261:13:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3824,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3794,
                              "src": "4323:10:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 3826,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "34",
                              "id": 3825,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4334:1:21",
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
                            "src": "4323:13:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3827,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3798,
                              "src": "4383:7:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 3829,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 3828,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4391:1:21",
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
                            "src": "4383:10:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3830,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3798,
                              "src": "4439:7:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 3832,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 3831,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4447:1:21",
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
                            "src": "4439:10:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3833,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3798,
                              "src": "4503:7:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 3835,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "32",
                              "id": 3834,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4511:1:21",
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
                            "src": "4503:10:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3836,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3798,
                              "src": "4561:7:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 3838,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "33",
                              "id": 3837,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4569:1:21",
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
                            "src": "4561:10:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3839,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3798,
                              "src": "4624:7:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 3841,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "34",
                              "id": 3840,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4632:1:21",
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
                            "src": "4624:10:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3842,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3798,
                              "src": "4687:7:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 3844,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "35",
                              "id": 3843,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4695:1:21",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_5_by_1",
                                "typeString": "int_const 5"
                              },
                              "value": "5"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4687:10:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 3845,
                            "name": "_requiredComponents",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3801,
                            "src": "4739:19:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 3846,
                            "name": "_requiredComponentAmounts",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3804,
                            "src": "4806:25:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
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
                            },
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            },
                            {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 3810,
                            "name": "abi",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 7003,
                            "src": "4051:3:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_abi",
                              "typeString": "abi"
                            }
                          },
                          "id": 3811,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "memberName": "encodePacked",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "4051:16:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                            "typeString": "function () pure returns (bytes memory)"
                          }
                        },
                        "id": 3847,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4051:825:21",
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
                      "id": 3809,
                      "name": "keccak256",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 7010,
                      "src": "4028:9:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                        "typeString": "function () pure returns (bytes32)"
                      }
                    },
                    "id": 3848,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4028:858:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 3808,
                  "id": 3849,
                  "nodeType": "Return",
                  "src": "4021:865:21"
                }
              ]
            },
            "documentation": "Create hash of order parameters\n     * @param  _addresses                   [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values                      [quantity, makerTokenAmount, expiration, makerRelayerFee, takerRelayerFee, salt]\n@param  _requiredComponents          Components to be acquired by exchange order\n@param  _requiredComponentAmounts    Amounts of each component to be acquired by exchange order",
            "id": 3851,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "generateOrderHash",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3805,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3794,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 3851,
                  "src": "3775:21:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3791,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3775:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3793,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 3792,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3783:1:21",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "3775:10:21",
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
                  "id": 3798,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 3851,
                  "src": "3806:18:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                    "typeString": "uint256[6]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3795,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3806:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3797,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "36",
                      "id": 3796,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3814:1:21",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "6"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "3806:10:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$6_storage_ptr",
                      "typeString": "uint256[6]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3801,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 3851,
                  "src": "3834:29:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3799,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3834:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3800,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3834:9:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3804,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 3851,
                  "src": "3873:35:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3802,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3873:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3803,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3873:9:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3765:149:21"
            },
            "payable": false,
            "returnParameters": {
              "id": 3808,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3807,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3851,
                  "src": "3961:7:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3806,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "3961:7:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3960:9:21"
            },
            "scope": 3954,
            "src": "3739:1154:21",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3892,
              "nodeType": "Block",
              "src": "5464:440:21",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3867,
                      "name": "recAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 3893,
                      "src": "5531:18:21",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 3866,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "5531:7:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3868,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5531:18:21"
                },
                {
                  "assignments": [
                    3870
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3870,
                      "name": "msgPrefix",
                      "nodeType": "VariableDeclaration",
                      "scope": 3893,
                      "src": "5591:22:21",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 3869,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "5591:5:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3872,
                  "initialValue": {
                    "argumentTypes": null,
                    "hexValue": "19457468657265756d205369676e6564204d6573736167653a0a3332",
                    "id": 3871,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "string",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "5616:34:21",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_stringliteral_178a2411ab6fbc1ba11064408972259c558d0e82fd48b0aba3ad81d14f065e73",
                      "typeString": "literal_string \"\u0019Ethereum Signed Message:\n32\""
                    },
                    "value": "\u0019Ethereum Signed Message:\n32"
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5591:59:21"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3886,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 3873,
                      "name": "recAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3867,
                      "src": "5707:10:21",
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
                                  "id": 3878,
                                  "name": "msgPrefix",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 3870,
                                  "src": "5770:9:21",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bytes_memory_ptr",
                                    "typeString": "bytes memory"
                                  }
                                },
                                {
                                  "argumentTypes": null,
                                  "id": 3879,
                                  "name": "_orderHash",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 3853,
                                  "src": "5781:10:21",
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
                                  "id": 3876,
                                  "name": "abi",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 7003,
                                  "src": "5753:3:21",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_magic_abi",
                                    "typeString": "abi"
                                  }
                                },
                                "id": 3877,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "lValueRequested": false,
                                "memberName": "encodePacked",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": null,
                                "src": "5753:16:21",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                                  "typeString": "function () pure returns (bytes memory)"
                                }
                              },
                              "id": 3880,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "5753:39:21",
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
                            "id": 3875,
                            "name": "keccak256",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 7010,
                            "src": "5743:9:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                              "typeString": "function () pure returns (bytes32)"
                            }
                          },
                          "id": 3881,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "5743:50:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 3882,
                          "name": "_v",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3857,
                          "src": "5807:2:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint8",
                            "typeString": "uint8"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 3883,
                          "name": "_r",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3859,
                          "src": "5823:2:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 3884,
                          "name": "_s",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3861,
                          "src": "5839:2:21",
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
                        "id": 3874,
                        "name": "ecrecover",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7008,
                        "src": "5720:9:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_ecrecover_pure$_t_bytes32_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_address_$",
                          "typeString": "function (bytes32,uint8,bytes32,bytes32) pure returns (address)"
                        }
                      },
                      "id": 3885,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "5720:131:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "5707:144:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 3887,
                  "nodeType": "ExpressionStatement",
                  "src": "5707:144:21"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    },
                    "id": 3890,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3888,
                      "name": "recAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3867,
                      "src": "5869:10:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 3889,
                      "name": "_signerAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3855,
                      "src": "5883:14:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "5869:28:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 3865,
                  "id": 3891,
                  "nodeType": "Return",
                  "src": "5862:35:21"
                }
              ]
            },
            "documentation": "Validate order signature\n     * @param  _orderHash       Hash of issuance order\n@param  _signerAddress   Address of Issuance Order signer\n@param  _v               v element of ECDSA signature\n@param  _r               r element of ECDSA signature\n@param  _s               s element of ECDSA signature",
            "id": 3893,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validateSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3862,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3853,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 3893,
                  "src": "5293:18:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3852,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "5293:7:21",
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
                  "id": 3855,
                  "name": "_signerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3893,
                  "src": "5321:22:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3854,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5321:7:21",
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
                  "id": 3857,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 3893,
                  "src": "5353:8:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 3856,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "5353:5:21",
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
                  "id": 3859,
                  "name": "_r",
                  "nodeType": "VariableDeclaration",
                  "scope": 3893,
                  "src": "5371:10:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3858,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "5371:7:21",
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
                  "id": 3861,
                  "name": "_s",
                  "nodeType": "VariableDeclaration",
                  "scope": 3893,
                  "src": "5391:10:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3860,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "5391:7:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5283:124:21"
            },
            "payable": false,
            "returnParameters": {
              "id": 3865,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3864,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3893,
                  "src": "5454:4:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3863,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "5454:4:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5453:6:21"
            },
            "scope": 3954,
            "src": "5257:647:21",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3952,
              "nodeType": "Block",
              "src": "6451:616:21",
              "statements": [
                {
                  "assignments": [
                    3905
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3905,
                      "name": "remainder",
                      "nodeType": "VariableDeclaration",
                      "scope": 3953,
                      "src": "6532:17:21",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 3904,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "6532:7:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3911,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3907,
                        "name": "_principal",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3895,
                        "src": "6559:10:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3908,
                        "name": "_numerator",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3897,
                        "src": "6571:10:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3909,
                        "name": "_denominator",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3899,
                        "src": "6583:12:21",
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
                      "id": 3906,
                      "name": "mulmod",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 7017,
                      "src": "6552:6:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_mulmod_pure$_t_uint256_$_t_uint256_$_t_uint256_$returns$_t_uint256_$",
                        "typeString": "function (uint256,uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 3910,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6552:44:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6532:64:21"
                },
                {
                  "condition": {
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
                      "id": 3912,
                      "name": "remainder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3905,
                      "src": "6653:9:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 3913,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6666:1:21",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "src": "6653:14:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": null,
                  "id": 3924,
                  "nodeType": "IfStatement",
                  "src": "6649:96:21",
                  "trueBody": {
                    "id": 3923,
                    "nodeType": "Block",
                    "src": "6669:76:21",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 3920,
                              "name": "_denominator",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3899,
                              "src": "6721:12:21",
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
                            "expression": {
                              "argumentTypes": null,
                              "arguments": [
                                {
                                  "argumentTypes": null,
                                  "id": 3917,
                                  "name": "_numerator",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 3897,
                                  "src": "6705:10:21",
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
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 3915,
                                  "name": "_principal",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 3895,
                                  "src": "6690:10:21",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 3916,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "mul",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 6404,
                                "src": "6690:14:21",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 3918,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "6690:26:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 3919,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "div",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6418,
                            "src": "6690:30:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 3921,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "6690:44:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "functionReturnParameters": 3903,
                        "id": 3922,
                        "nodeType": "Return",
                        "src": "6683:51:21"
                      }
                    ]
                  }
                },
                {
                  "assignments": [
                    3926
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3926,
                      "name": "errPercentageTimes1000000",
                      "nodeType": "VariableDeclaration",
                      "scope": 3953,
                      "src": "6793:33:21",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 3925,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "6793:7:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3937,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 3934,
                            "name": "_principal",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3895,
                            "src": "6871:10:21",
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
                          "expression": {
                            "argumentTypes": null,
                            "id": 3932,
                            "name": "_numerator",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3897,
                            "src": "6856:10:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 3933,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 6404,
                          "src": "6856:14:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 3935,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6856:26:21",
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
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "hexValue": "31303030303030",
                            "id": 3929,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "6843:7:21",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_1000000_by_1",
                              "typeString": "int_const 1000000"
                            },
                            "value": "1000000"
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_rational_1000000_by_1",
                              "typeString": "int_const 1000000"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 3927,
                            "name": "remainder",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3905,
                            "src": "6829:9:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 3928,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 6404,
                          "src": "6829:13:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 3930,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6829:22:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 3931,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "div",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6418,
                      "src": "6829:26:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 3936,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6829:54:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6793:90:21"
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
                        "id": 3941,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 3939,
                          "name": "errPercentageTimes1000000",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3926,
                          "src": "6957:25:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "31303030",
                          "id": 3940,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6985:4:21",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_1000_by_1",
                            "typeString": "int_const 1000"
                          },
                          "value": "1000"
                        },
                        "src": "6957:32:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 3938,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "6949:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 3942,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6949:41:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3943,
                  "nodeType": "ExpressionStatement",
                  "src": "6949:41:21"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3949,
                        "name": "_denominator",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3899,
                        "src": "7047:12:21",
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
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 3946,
                            "name": "_numerator",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3897,
                            "src": "7031:10:21",
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
                          "expression": {
                            "argumentTypes": null,
                            "id": 3944,
                            "name": "_principal",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3895,
                            "src": "7016:10:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 3945,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 6404,
                          "src": "7016:14:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 3947,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "7016:26:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 3948,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "div",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6418,
                      "src": "7016:30:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 3950,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7016:44:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3903,
                  "id": 3951,
                  "nodeType": "Return",
                  "src": "7009:51:21"
                }
              ]
            },
            "documentation": "Checks for rounding errors and returns value of potential partial amounts of a principal\n     * @param  _principal       Number fractional amount is derived from\n@param  _numerator       Numerator of fraction\n@param  _denominator     Denominator of fraction\n@return uint256          Fractional amount of principal calculated",
            "id": 3953,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getPartialAmount",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3900,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3895,
                  "name": "_principal",
                  "nodeType": "VariableDeclaration",
                  "scope": 3953,
                  "src": "6321:18:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3894,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6321:7:21",
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
                  "id": 3897,
                  "name": "_numerator",
                  "nodeType": "VariableDeclaration",
                  "scope": 3953,
                  "src": "6349:18:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3896,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6349:7:21",
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
                  "id": 3899,
                  "name": "_denominator",
                  "nodeType": "VariableDeclaration",
                  "scope": 3953,
                  "src": "6377:20:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3898,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6377:7:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6311:92:21"
            },
            "payable": false,
            "returnParameters": {
              "id": 3903,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3902,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3953,
                  "src": "6438:7:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3901,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6438:7:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6437:9:21"
            },
            "scope": 3954,
            "src": "6286:781:21",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 3955,
        "src": "856:6213:21"
      }
    ],
    "src": "597:6473:21"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
    "exportedSymbols": {
      "OrderLibrary": [
        3954
      ]
    },
    "id": 3955,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3754,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:21"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 3756,
        "nodeType": "ImportDirective",
        "scope": 3955,
        "sourceUnit": 6464,
        "src": "622:73:21",
        "symbolAliases": [
          {
            "foreign": 3755,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title OrderLibrary\n@author Set Protocol\n * The Order Library contains functions for checking validation and hashing of Issuance Orders.\n ",
        "fullyImplemented": true,
        "id": 3954,
        "linearizedBaseContracts": [
          3954
        ],
        "name": "OrderLibrary",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 3759,
            "libraryName": {
              "contractScope": null,
              "id": 3757,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6463,
              "src": "889:8:21",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6463",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "883:27:21",
            "typeName": {
              "id": 3758,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "902:7:21",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "canonicalName": "OrderLibrary.IssuanceOrder",
            "id": 3790,
            "members": [
              {
                "constant": false,
                "id": 3761,
                "name": "setAddress",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "2366:18:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3760,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2366:7:21",
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
                "id": 3763,
                "name": "makerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "2427:20:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3762,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2427:7:21",
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
                "id": 3765,
                "name": "makerToken",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "2488:18:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3764,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2488:7:21",
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
                "id": 3767,
                "name": "relayerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "2549:22:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3766,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2549:7:21",
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
                "id": 3769,
                "name": "relayerToken",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "2610:20:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3768,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2610:7:21",
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
                "id": 3771,
                "name": "quantity",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "2671:16:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3770,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2671:7:21",
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
                "id": 3773,
                "name": "makerTokenAmount",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "2729:24:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3772,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2729:7:21",
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
                "id": 3775,
                "name": "expiration",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "2787:18:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3774,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2787:7:21",
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
                "id": 3777,
                "name": "makerRelayerFee",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "2845:23:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3776,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2845:7:21",
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
                "id": 3779,
                "name": "takerRelayerFee",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "2903:23:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3778,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2903:7:21",
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
                "id": 3781,
                "name": "salt",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "2961:12:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 3780,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2961:7:21",
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
                "id": 3784,
                "name": "requiredComponents",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "3019:28:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 3782,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3019:7:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 3783,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "3019:9:21",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                    "typeString": "address[]"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 3787,
                "name": "requiredComponentAmounts",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "3086:34:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                  "typeString": "uint256[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 3785,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3086:7:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 3786,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "3086:9:21",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                    "typeString": "uint256[]"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 3789,
                "name": "orderHash",
                "nodeType": "VariableDeclaration",
                "scope": 3790,
                "src": "3162:17:21",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes32",
                  "typeString": "bytes32"
                },
                "typeName": {
                  "id": 3788,
                  "name": "bytes32",
                  "nodeType": "ElementaryTypeName",
                  "src": "3162:7:21",
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
            "scope": 3954,
            "src": "2335:851:21",
            "visibility": "public"
          },
          {
            "body": {
              "id": 3850,
              "nodeType": "Block",
              "src": "3974:919:21",
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
                              "id": 3812,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3794,
                              "src": "4085:10:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 3814,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 3813,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4096:1:21",
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
                            "src": "4085:13:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3815,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3794,
                              "src": "4143:10:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 3817,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 3816,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4154:1:21",
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
                            "src": "4143:13:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3818,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3794,
                              "src": "4203:10:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 3820,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "32",
                              "id": 3819,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4214:1:21",
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
                            "src": "4203:13:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3821,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3794,
                              "src": "4261:10:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 3823,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "33",
                              "id": 3822,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4272:1:21",
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
                            "src": "4261:13:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3824,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3794,
                              "src": "4323:10:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 3826,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "34",
                              "id": 3825,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4334:1:21",
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
                            "src": "4323:13:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3827,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3798,
                              "src": "4383:7:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 3829,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 3828,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4391:1:21",
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
                            "src": "4383:10:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3830,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3798,
                              "src": "4439:7:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 3832,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 3831,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4447:1:21",
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
                            "src": "4439:10:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3833,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3798,
                              "src": "4503:7:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 3835,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "32",
                              "id": 3834,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4511:1:21",
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
                            "src": "4503:10:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3836,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3798,
                              "src": "4561:7:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 3838,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "33",
                              "id": 3837,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4569:1:21",
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
                            "src": "4561:10:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3839,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3798,
                              "src": "4624:7:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 3841,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "34",
                              "id": 3840,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4632:1:21",
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
                            "src": "4624:10:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3842,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3798,
                              "src": "4687:7:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 3844,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "35",
                              "id": 3843,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4695:1:21",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_5_by_1",
                                "typeString": "int_const 5"
                              },
                              "value": "5"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4687:10:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 3845,
                            "name": "_requiredComponents",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3801,
                            "src": "4739:19:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 3846,
                            "name": "_requiredComponentAmounts",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3804,
                            "src": "4806:25:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
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
                            },
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            },
                            {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 3810,
                            "name": "abi",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 7003,
                            "src": "4051:3:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_abi",
                              "typeString": "abi"
                            }
                          },
                          "id": 3811,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "memberName": "encodePacked",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "4051:16:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                            "typeString": "function () pure returns (bytes memory)"
                          }
                        },
                        "id": 3847,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4051:825:21",
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
                      "id": 3809,
                      "name": "keccak256",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 7010,
                      "src": "4028:9:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                        "typeString": "function () pure returns (bytes32)"
                      }
                    },
                    "id": 3848,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4028:858:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 3808,
                  "id": 3849,
                  "nodeType": "Return",
                  "src": "4021:865:21"
                }
              ]
            },
            "documentation": "Create hash of order parameters\n     * @param  _addresses                   [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values                      [quantity, makerTokenAmount, expiration, makerRelayerFee, takerRelayerFee, salt]\n@param  _requiredComponents          Components to be acquired by exchange order\n@param  _requiredComponentAmounts    Amounts of each component to be acquired by exchange order",
            "id": 3851,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "generateOrderHash",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3805,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3794,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 3851,
                  "src": "3775:21:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3791,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3775:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3793,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 3792,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3783:1:21",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "3775:10:21",
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
                  "id": 3798,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 3851,
                  "src": "3806:18:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                    "typeString": "uint256[6]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3795,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3806:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3797,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "36",
                      "id": 3796,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3814:1:21",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "6"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "3806:10:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$6_storage_ptr",
                      "typeString": "uint256[6]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3801,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 3851,
                  "src": "3834:29:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3799,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3834:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3800,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3834:9:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3804,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 3851,
                  "src": "3873:35:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3802,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3873:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3803,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3873:9:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3765:149:21"
            },
            "payable": false,
            "returnParameters": {
              "id": 3808,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3807,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3851,
                  "src": "3961:7:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3806,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "3961:7:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3960:9:21"
            },
            "scope": 3954,
            "src": "3739:1154:21",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3892,
              "nodeType": "Block",
              "src": "5464:440:21",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3867,
                      "name": "recAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 3893,
                      "src": "5531:18:21",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 3866,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "5531:7:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3868,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5531:18:21"
                },
                {
                  "assignments": [
                    3870
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3870,
                      "name": "msgPrefix",
                      "nodeType": "VariableDeclaration",
                      "scope": 3893,
                      "src": "5591:22:21",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 3869,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "5591:5:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3872,
                  "initialValue": {
                    "argumentTypes": null,
                    "hexValue": "19457468657265756d205369676e6564204d6573736167653a0a3332",
                    "id": 3871,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "string",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "5616:34:21",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_stringliteral_178a2411ab6fbc1ba11064408972259c558d0e82fd48b0aba3ad81d14f065e73",
                      "typeString": "literal_string \"\u0019Ethereum Signed Message:\n32\""
                    },
                    "value": "\u0019Ethereum Signed Message:\n32"
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5591:59:21"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3886,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 3873,
                      "name": "recAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3867,
                      "src": "5707:10:21",
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
                                  "id": 3878,
                                  "name": "msgPrefix",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 3870,
                                  "src": "5770:9:21",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bytes_memory_ptr",
                                    "typeString": "bytes memory"
                                  }
                                },
                                {
                                  "argumentTypes": null,
                                  "id": 3879,
                                  "name": "_orderHash",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 3853,
                                  "src": "5781:10:21",
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
                                  "id": 3876,
                                  "name": "abi",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 7003,
                                  "src": "5753:3:21",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_magic_abi",
                                    "typeString": "abi"
                                  }
                                },
                                "id": 3877,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "lValueRequested": false,
                                "memberName": "encodePacked",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": null,
                                "src": "5753:16:21",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                                  "typeString": "function () pure returns (bytes memory)"
                                }
                              },
                              "id": 3880,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "5753:39:21",
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
                            "id": 3875,
                            "name": "keccak256",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 7010,
                            "src": "5743:9:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                              "typeString": "function () pure returns (bytes32)"
                            }
                          },
                          "id": 3881,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "5743:50:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 3882,
                          "name": "_v",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3857,
                          "src": "5807:2:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint8",
                            "typeString": "uint8"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 3883,
                          "name": "_r",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3859,
                          "src": "5823:2:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 3884,
                          "name": "_s",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3861,
                          "src": "5839:2:21",
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
                        "id": 3874,
                        "name": "ecrecover",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7008,
                        "src": "5720:9:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_ecrecover_pure$_t_bytes32_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_address_$",
                          "typeString": "function (bytes32,uint8,bytes32,bytes32) pure returns (address)"
                        }
                      },
                      "id": 3885,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "5720:131:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "5707:144:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 3887,
                  "nodeType": "ExpressionStatement",
                  "src": "5707:144:21"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    },
                    "id": 3890,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3888,
                      "name": "recAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3867,
                      "src": "5869:10:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 3889,
                      "name": "_signerAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3855,
                      "src": "5883:14:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "5869:28:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 3865,
                  "id": 3891,
                  "nodeType": "Return",
                  "src": "5862:35:21"
                }
              ]
            },
            "documentation": "Validate order signature\n     * @param  _orderHash       Hash of issuance order\n@param  _signerAddress   Address of Issuance Order signer\n@param  _v               v element of ECDSA signature\n@param  _r               r element of ECDSA signature\n@param  _s               s element of ECDSA signature",
            "id": 3893,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validateSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3862,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3853,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 3893,
                  "src": "5293:18:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3852,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "5293:7:21",
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
                  "id": 3855,
                  "name": "_signerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3893,
                  "src": "5321:22:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3854,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5321:7:21",
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
                  "id": 3857,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 3893,
                  "src": "5353:8:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 3856,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "5353:5:21",
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
                  "id": 3859,
                  "name": "_r",
                  "nodeType": "VariableDeclaration",
                  "scope": 3893,
                  "src": "5371:10:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3858,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "5371:7:21",
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
                  "id": 3861,
                  "name": "_s",
                  "nodeType": "VariableDeclaration",
                  "scope": 3893,
                  "src": "5391:10:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3860,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "5391:7:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5283:124:21"
            },
            "payable": false,
            "returnParameters": {
              "id": 3865,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3864,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3893,
                  "src": "5454:4:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3863,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "5454:4:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5453:6:21"
            },
            "scope": 3954,
            "src": "5257:647:21",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3952,
              "nodeType": "Block",
              "src": "6451:616:21",
              "statements": [
                {
                  "assignments": [
                    3905
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3905,
                      "name": "remainder",
                      "nodeType": "VariableDeclaration",
                      "scope": 3953,
                      "src": "6532:17:21",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 3904,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "6532:7:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3911,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3907,
                        "name": "_principal",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3895,
                        "src": "6559:10:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3908,
                        "name": "_numerator",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3897,
                        "src": "6571:10:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3909,
                        "name": "_denominator",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3899,
                        "src": "6583:12:21",
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
                      "id": 3906,
                      "name": "mulmod",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 7017,
                      "src": "6552:6:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_mulmod_pure$_t_uint256_$_t_uint256_$_t_uint256_$returns$_t_uint256_$",
                        "typeString": "function (uint256,uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 3910,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6552:44:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6532:64:21"
                },
                {
                  "condition": {
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
                      "id": 3912,
                      "name": "remainder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3905,
                      "src": "6653:9:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 3913,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6666:1:21",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "src": "6653:14:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": null,
                  "id": 3924,
                  "nodeType": "IfStatement",
                  "src": "6649:96:21",
                  "trueBody": {
                    "id": 3923,
                    "nodeType": "Block",
                    "src": "6669:76:21",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 3920,
                              "name": "_denominator",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3899,
                              "src": "6721:12:21",
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
                            "expression": {
                              "argumentTypes": null,
                              "arguments": [
                                {
                                  "argumentTypes": null,
                                  "id": 3917,
                                  "name": "_numerator",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 3897,
                                  "src": "6705:10:21",
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
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 3915,
                                  "name": "_principal",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 3895,
                                  "src": "6690:10:21",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 3916,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "mul",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 6404,
                                "src": "6690:14:21",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 3918,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "6690:26:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 3919,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "div",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6418,
                            "src": "6690:30:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 3921,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "6690:44:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "functionReturnParameters": 3903,
                        "id": 3922,
                        "nodeType": "Return",
                        "src": "6683:51:21"
                      }
                    ]
                  }
                },
                {
                  "assignments": [
                    3926
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3926,
                      "name": "errPercentageTimes1000000",
                      "nodeType": "VariableDeclaration",
                      "scope": 3953,
                      "src": "6793:33:21",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 3925,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "6793:7:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3937,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 3934,
                            "name": "_principal",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3895,
                            "src": "6871:10:21",
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
                          "expression": {
                            "argumentTypes": null,
                            "id": 3932,
                            "name": "_numerator",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3897,
                            "src": "6856:10:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 3933,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 6404,
                          "src": "6856:14:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 3935,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6856:26:21",
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
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "hexValue": "31303030303030",
                            "id": 3929,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "6843:7:21",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_1000000_by_1",
                              "typeString": "int_const 1000000"
                            },
                            "value": "1000000"
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_rational_1000000_by_1",
                              "typeString": "int_const 1000000"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 3927,
                            "name": "remainder",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3905,
                            "src": "6829:9:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 3928,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 6404,
                          "src": "6829:13:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 3930,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6829:22:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 3931,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "div",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6418,
                      "src": "6829:26:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 3936,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6829:54:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6793:90:21"
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
                        "id": 3941,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 3939,
                          "name": "errPercentageTimes1000000",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3926,
                          "src": "6957:25:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "31303030",
                          "id": 3940,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6985:4:21",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_1000_by_1",
                            "typeString": "int_const 1000"
                          },
                          "value": "1000"
                        },
                        "src": "6957:32:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 3938,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "6949:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 3942,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6949:41:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3943,
                  "nodeType": "ExpressionStatement",
                  "src": "6949:41:21"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3949,
                        "name": "_denominator",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3899,
                        "src": "7047:12:21",
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
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 3946,
                            "name": "_numerator",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3897,
                            "src": "7031:10:21",
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
                          "expression": {
                            "argumentTypes": null,
                            "id": 3944,
                            "name": "_principal",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3895,
                            "src": "7016:10:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 3945,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 6404,
                          "src": "7016:14:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 3947,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "7016:26:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 3948,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "div",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6418,
                      "src": "7016:30:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 3950,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7016:44:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3903,
                  "id": 3951,
                  "nodeType": "Return",
                  "src": "7009:51:21"
                }
              ]
            },
            "documentation": "Checks for rounding errors and returns value of potential partial amounts of a principal\n     * @param  _principal       Number fractional amount is derived from\n@param  _numerator       Numerator of fraction\n@param  _denominator     Denominator of fraction\n@return uint256          Fractional amount of principal calculated",
            "id": 3953,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getPartialAmount",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3900,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3895,
                  "name": "_principal",
                  "nodeType": "VariableDeclaration",
                  "scope": 3953,
                  "src": "6321:18:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3894,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6321:7:21",
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
                  "id": 3897,
                  "name": "_numerator",
                  "nodeType": "VariableDeclaration",
                  "scope": 3953,
                  "src": "6349:18:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3896,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6349:7:21",
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
                  "id": 3899,
                  "name": "_denominator",
                  "nodeType": "VariableDeclaration",
                  "scope": 3953,
                  "src": "6377:20:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3898,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6377:7:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6311:92:21"
            },
            "payable": false,
            "returnParameters": {
              "id": 3903,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3902,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3953,
                  "src": "6438:7:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3901,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6438:7:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6437:9:21"
            },
            "scope": 3954,
            "src": "6286:781:21",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 3955,
        "src": "856:6213:21"
      }
    ],
    "src": "597:6473:21"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-23T23:58:05.596Z"
}