export const CoreModifiers = 
{
  "contractName": "CoreModifiers",
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "_factory",
          "type": "address"
        }
      ],
      "name": "validFactories",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_orderHash",
          "type": "bytes32"
        }
      ],
      "name": "orderCancels",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "vaultAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "transferProxyAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_exchangeId",
          "type": "uint8"
        }
      ],
      "name": "exchanges",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "state",
      "outputs": [
        {
          "name": "transferProxyAddress",
          "type": "address"
        },
        {
          "name": "vaultAddress",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_orderHash",
          "type": "bytes32"
        }
      ],
      "name": "orderFills",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_set",
          "type": "address"
        }
      ],
      "name": "validSets",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b506102a4806100206000396000f30060806040526004361061008d5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100925780631e912bd6146100c7578063430bf08a146100f15780638ca4daf914610122578063a003e06914610137578063c19d93fb14610152578063f7213db61461018d578063fef3ee73146101a5575b600080fd5b34801561009e57600080fd5b506100b3600160a060020a03600435166101c6565b604080519115158252519081900360200190f35b3480156100d357600080fd5b506100df6004356101e4565b60408051918252519081900360200190f35b3480156100fd57600080fd5b506101066101f6565b60408051600160a060020a039092168252519081900360200190f35b34801561012e57600080fd5b50610106610205565b34801561014357600080fd5b5061010660ff60043516610214565b34801561015e57600080fd5b50610167610232565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b34801561019957600080fd5b506100df600435610248565b3480156101b157600080fd5b506100b3600160a060020a036004351661025a565b600160a060020a031660009081526003602052604090205460ff1690565b60009081526006602052604090205490565b600254600160a060020a031690565b600154600160a060020a031690565b60ff16600090815260208190526040902054600160a060020a031690565b600154600254600160a060020a03918216911682565b60009081526005602052604090205490565b600160a060020a031660009081526004602052604090205460ff16905600a165627a7a72305820438c40988f6d1b1707847376992fa028f2cd9b47ee2c97db0cabf0e084e9b4ef0029",
  "deployedBytecode": "0x60806040526004361061008d5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100925780631e912bd6146100c7578063430bf08a146100f15780638ca4daf914610122578063a003e06914610137578063c19d93fb14610152578063f7213db61461018d578063fef3ee73146101a5575b600080fd5b34801561009e57600080fd5b506100b3600160a060020a03600435166101c6565b604080519115158252519081900360200190f35b3480156100d357600080fd5b506100df6004356101e4565b60408051918252519081900360200190f35b3480156100fd57600080fd5b506101066101f6565b60408051600160a060020a039092168252519081900360200190f35b34801561012e57600080fd5b50610106610205565b34801561014357600080fd5b5061010660ff60043516610214565b34801561015e57600080fd5b50610167610232565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b34801561019957600080fd5b506100df600435610248565b3480156101b157600080fd5b506100b3600160a060020a036004351661025a565b600160a060020a031660009081526003602052604090205460ff1690565b60009081526006602052604090205490565b600254600160a060020a031690565b600154600160a060020a031690565b60ff16600090815260208190526040902054600160a060020a031690565b600154600254600160a060020a03918216911682565b60009081526005602052604090205490565b600160a060020a031660009081526004602052604090205460ff16905600a165627a7a72305820438c40988f6d1b1707847376992fa028f2cd9b47ee2c97db0cabf0e084e9b4ef0029",
  "sourceMap": "910:1372:21:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;910:1372:21;;;;;;;",
  "deployedSourceMap": "910:1372:21:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2083:150:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2083:150:22;-1:-1:-1;;;;;2083:150:22;;;;;;;;;;;;;;;;;;;;;;;2529;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2529:150:22;;;;;;;;;;;;;;;;;;;;;1954:123;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1954:123:22;;;;;;;;-1:-1:-1;;;;;1954:123:22;;;;;;;;;;;;;;1809:139;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1809:139:22;;;;1656:147;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1656:147:22;;;;;;;1579:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1579:18:22;;;;;;;;-1:-1:-1;;;;;1579:18:22;;;;;;;;;;;;;;;;;;;;;;;;2377:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2377:146:22;;;;;2239:132;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2239:132:22;-1:-1:-1;;;;;2239:132:22;;;;;2083:150;-1:-1:-1;;;;;2196:30:22;2169:4;2196:30;;;:20;:30;;;;;;;;;2083:150::o;2529:::-;2615:4;2642:30;;;:18;:30;;;;;;;2529:150::o;1954:123::-;2052:18;;-1:-1:-1;;;;;2052:18:22;1954:123;:::o;1809:139::-;1915:26;;-1:-1:-1;;;;;1915:26:22;1809:139;:::o;1656:147::-;1768:28;;1738:7;1768:28;;;;;;;;;;;-1:-1:-1;;;;;1768:28:22;;1656:147::o;1579:18::-;;;;;-1:-1:-1;;;;;1579:18:22;;;;;;:::o;2377:146::-;2461:4;2488:28;;;:16;:28;;;;;;;2377:146::o;2239:132::-;-1:-1:-1;;;;;2343:21:22;2316:4;2343:21;;;:15;:21;;;;;;;;;2239:132::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { CoreState } from \"./CoreState.sol\";\nimport { ISetToken } from \"../interfaces/ISetToken.sol\";\n\n\n/**\n * @title Core Shared Modifiers\n * @author Set Protocol\n *\n * The Core Shared Modifiers library contains the modifiers that are shared across the different\n * Core extensions.\n */\ncontract CoreModifiers is\n    CoreState\n{\n\n    /* ============ Constants ============ */\n\n    string constant INVALID_QUANTITY = \"Quantity must be multiple of the natural unit of the set.\";\n    string constant ZERO_QUANTITY = \"Quantity must be greater than zero.\";\n    string constant INVALID_SET = \"Set token is disabled or does not exist.\";\n    string constant INVALID_FACTORY = \"Factory is disabled or does not exist.\";\n\n    /* ============ Modifiers ============ */\n\n    // Check that quantity submitted is greater than 0\n    modifier isPositiveQuantity(uint _quantity) {\n        require(\n            _quantity > 0,\n            ZERO_QUANTITY\n        );\n        _;\n    }\n\n    // Verify Factory is linked to Core\n    modifier isValidFactory(address _factoryAddress) {\n        require(\n            state.validFactories[_factoryAddress],\n            INVALID_FACTORY\n        );\n        _;\n    }\n\n    // Verify set was created by core and is enabled\n    modifier isValidSet(address _setAddress) {\n        require(\n            state.validSets[_setAddress],\n            INVALID_SET\n        );\n        _;\n    }\n\n    // Validate quantity is multiple of natural unit\n    modifier isNaturalUnitMultiple(uint _quantity, address _setToken) {\n        require(\n            _quantity % ISetToken(_setToken).naturalUnit() == 0,\n            INVALID_QUANTITY\n        );\n        _;\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
    "exportedSymbols": {
      "CoreModifiers": [
        2975
      ]
    },
    "id": 2976,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2894,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:21"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "./CoreState.sol",
        "id": 2896,
        "nodeType": "ImportDirective",
        "scope": 2976,
        "sourceUnit": 3089,
        "src": "622:44:21",
        "symbolAliases": [
          {
            "foreign": 2895,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
        "file": "../interfaces/ISetToken.sol",
        "id": 2898,
        "nodeType": "ImportDirective",
        "scope": 2976,
        "sourceUnit": 2840,
        "src": "667:56:21",
        "symbolAliases": [
          {
            "foreign": 2897,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 2899,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3088,
              "src": "940:9:21",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3088",
                "typeString": "contract CoreState"
              }
            },
            "id": 2900,
            "nodeType": "InheritanceSpecifier",
            "src": "940:9:21"
          }
        ],
        "contractDependencies": [
          3088
        ],
        "contractKind": "contract",
        "documentation": "@title Core Shared Modifiers\n@author Set Protocol\n * The Core Shared Modifiers library contains the modifiers that are shared across the different\nCore extensions.",
        "fullyImplemented": true,
        "id": 2975,
        "linearizedBaseContracts": [
          2975,
          3088
        ],
        "name": "CoreModifiers",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 2903,
            "name": "INVALID_QUANTITY",
            "nodeType": "VariableDeclaration",
            "scope": 2975,
            "src": "1004:94:21",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2901,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1004:6:21",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e74697479206d757374206265206d756c7469706c65206f6620746865206e61747572616c20756e6974206f6620746865207365742e",
              "id": 2902,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1039:59:21",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_d07f06b1dbcd0a898f7012f6e92da489627e9127773658e2348a0db0797b8933",
                "typeString": "literal_string \"Quantity must be multiple of the natural unit of the set.\""
              },
              "value": "Quantity must be multiple of the natural unit of the set."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 2906,
            "name": "ZERO_QUANTITY",
            "nodeType": "VariableDeclaration",
            "scope": 2975,
            "src": "1104:69:21",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2904,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1104:6:21",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e74697479206d7573742062652067726561746572207468616e207a65726f2e",
              "id": 2905,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1136:37:21",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_3da6978e12ad268e4eb66f4a79840b60e48f93e78540f7911187ddd7f0f6f2c7",
                "typeString": "literal_string \"Quantity must be greater than zero.\""
              },
              "value": "Quantity must be greater than zero."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 2909,
            "name": "INVALID_SET",
            "nodeType": "VariableDeclaration",
            "scope": 2975,
            "src": "1179:72:21",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2907,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1179:6:21",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "53657420746f6b656e2069732064697361626c6564206f7220646f6573206e6f742065786973742e",
              "id": 2908,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1209:42:21",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_c419cd4a3f97d6566703fad16a031bef670efd2b05b54195c4db43ccea0a7e7e",
                "typeString": "literal_string \"Set token is disabled or does not exist.\""
              },
              "value": "Set token is disabled or does not exist."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 2912,
            "name": "INVALID_FACTORY",
            "nodeType": "VariableDeclaration",
            "scope": 2975,
            "src": "1257:74:21",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2910,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1257:6:21",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "466163746f72792069732064697361626c6564206f7220646f6573206e6f742065786973742e",
              "id": 2911,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1291:40:21",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_ff40c07bf4b1e4d2220e3a6d57631493105b5007aba10b5d8cf1630effb33df5",
                "typeString": "literal_string \"Factory is disabled or does not exist.\""
              },
              "value": "Factory is disabled or does not exist."
            },
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2924,
              "nodeType": "Block",
              "src": "1484:99:21",
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
                        "id": 2919,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 2917,
                          "name": "_quantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2914,
                          "src": "1515:9:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 2918,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "1527:1:21",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "1515:13:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2920,
                        "name": "ZERO_QUANTITY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2906,
                        "src": "1542:13:21",
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
                      "id": 2916,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "1494:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2921,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1494:71:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2922,
                  "nodeType": "ExpressionStatement",
                  "src": "1494:71:21"
                },
                {
                  "id": 2923,
                  "nodeType": "PlaceholderStatement",
                  "src": "1575:1:21"
                }
              ]
            },
            "documentation": null,
            "id": 2925,
            "name": "isPositiveQuantity",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 2915,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2914,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2925,
                  "src": "1468:14:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2913,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1468:4:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1467:16:21"
            },
            "src": "1440:143:21",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2938,
              "nodeType": "Block",
              "src": "1678:125:21",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2930,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3004,
                            "src": "1709:5:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3002_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2931,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validFactories",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2989,
                          "src": "1709:20:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 2933,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 2932,
                          "name": "_factoryAddress",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2927,
                          "src": "1730:15:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "1709:37:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2934,
                        "name": "INVALID_FACTORY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2912,
                        "src": "1760:15:21",
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
                      "id": 2929,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "1688:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2935,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1688:97:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2936,
                  "nodeType": "ExpressionStatement",
                  "src": "1688:97:21"
                },
                {
                  "id": 2937,
                  "nodeType": "PlaceholderStatement",
                  "src": "1795:1:21"
                }
              ]
            },
            "documentation": null,
            "id": 2939,
            "name": "isValidFactory",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 2928,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2927,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2939,
                  "src": "1653:23:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2926,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1653:7:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1652:25:21"
            },
            "src": "1629:174:21",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2952,
              "nodeType": "Block",
              "src": "1903:112:21",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2944,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3004,
                            "src": "1934:5:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3002_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2945,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validSets",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2993,
                          "src": "1934:15:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 2947,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 2946,
                          "name": "_setAddress",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2941,
                          "src": "1950:11:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "1934:28:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2948,
                        "name": "INVALID_SET",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2909,
                        "src": "1976:11:21",
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
                      "id": 2943,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "1913:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2949,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1913:84:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2950,
                  "nodeType": "ExpressionStatement",
                  "src": "1913:84:21"
                },
                {
                  "id": 2951,
                  "nodeType": "PlaceholderStatement",
                  "src": "2007:1:21"
                }
              ]
            },
            "documentation": null,
            "id": 2953,
            "name": "isValidSet",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 2942,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2941,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2953,
                  "src": "1882:19:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2940,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1882:7:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1881:21:21"
            },
            "src": "1862:153:21",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2973,
              "nodeType": "Block",
              "src": "2140:140:21",
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
                        "id": 2968,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 2966,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 2960,
                            "name": "_quantity",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2955,
                            "src": "2171:9:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "%",
                          "rightExpression": {
                            "argumentTypes": null,
                            "arguments": [],
                            "expression": {
                              "argumentTypes": [],
                              "expression": {
                                "argumentTypes": null,
                                "arguments": [
                                  {
                                    "argumentTypes": null,
                                    "id": 2962,
                                    "name": "_setToken",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 2957,
                                    "src": "2193:9:21",
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
                                  "id": 2961,
                                  "name": "ISetToken",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2839,
                                  "src": "2183:9:21",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_ISetToken_$2839_$",
                                    "typeString": "type(contract ISetToken)"
                                  }
                                },
                                "id": 2963,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "2183:20:21",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_contract$_ISetToken_$2839",
                                  "typeString": "contract ISetToken"
                                }
                              },
                              "id": 2964,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "naturalUnit",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 2812,
                              "src": "2183:32:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_external_nonpayable$__$returns$_t_uint256_$",
                                "typeString": "function () external returns (uint256)"
                              }
                            },
                            "id": 2965,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "2183:34:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "2171:46:21",
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
                          "id": 2967,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "2221:1:21",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "2171:51:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2969,
                        "name": "INVALID_QUANTITY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2903,
                        "src": "2236:16:21",
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
                      "id": 2959,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "2150:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2970,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2150:112:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2971,
                  "nodeType": "ExpressionStatement",
                  "src": "2150:112:21"
                },
                {
                  "id": 2972,
                  "nodeType": "PlaceholderStatement",
                  "src": "2272:1:21"
                }
              ]
            },
            "documentation": null,
            "id": 2974,
            "name": "isNaturalUnitMultiple",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 2958,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2955,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2974,
                  "src": "2105:14:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2954,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2105:4:21",
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
                  "id": 2957,
                  "name": "_setToken",
                  "nodeType": "VariableDeclaration",
                  "scope": 2974,
                  "src": "2121:17:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2956,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2121:7:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2104:35:21"
            },
            "src": "2074:206:21",
            "visibility": "internal"
          }
        ],
        "scope": 2976,
        "src": "910:1372:21"
      }
    ],
    "src": "597:1686:21"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
    "exportedSymbols": {
      "CoreModifiers": [
        2975
      ]
    },
    "id": 2976,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2894,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:21"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "./CoreState.sol",
        "id": 2896,
        "nodeType": "ImportDirective",
        "scope": 2976,
        "sourceUnit": 3089,
        "src": "622:44:21",
        "symbolAliases": [
          {
            "foreign": 2895,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
        "file": "../interfaces/ISetToken.sol",
        "id": 2898,
        "nodeType": "ImportDirective",
        "scope": 2976,
        "sourceUnit": 2840,
        "src": "667:56:21",
        "symbolAliases": [
          {
            "foreign": 2897,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 2899,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3088,
              "src": "940:9:21",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3088",
                "typeString": "contract CoreState"
              }
            },
            "id": 2900,
            "nodeType": "InheritanceSpecifier",
            "src": "940:9:21"
          }
        ],
        "contractDependencies": [
          3088
        ],
        "contractKind": "contract",
        "documentation": "@title Core Shared Modifiers\n@author Set Protocol\n * The Core Shared Modifiers library contains the modifiers that are shared across the different\nCore extensions.",
        "fullyImplemented": true,
        "id": 2975,
        "linearizedBaseContracts": [
          2975,
          3088
        ],
        "name": "CoreModifiers",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 2903,
            "name": "INVALID_QUANTITY",
            "nodeType": "VariableDeclaration",
            "scope": 2975,
            "src": "1004:94:21",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2901,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1004:6:21",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e74697479206d757374206265206d756c7469706c65206f6620746865206e61747572616c20756e6974206f6620746865207365742e",
              "id": 2902,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1039:59:21",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_d07f06b1dbcd0a898f7012f6e92da489627e9127773658e2348a0db0797b8933",
                "typeString": "literal_string \"Quantity must be multiple of the natural unit of the set.\""
              },
              "value": "Quantity must be multiple of the natural unit of the set."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 2906,
            "name": "ZERO_QUANTITY",
            "nodeType": "VariableDeclaration",
            "scope": 2975,
            "src": "1104:69:21",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2904,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1104:6:21",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e74697479206d7573742062652067726561746572207468616e207a65726f2e",
              "id": 2905,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1136:37:21",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_3da6978e12ad268e4eb66f4a79840b60e48f93e78540f7911187ddd7f0f6f2c7",
                "typeString": "literal_string \"Quantity must be greater than zero.\""
              },
              "value": "Quantity must be greater than zero."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 2909,
            "name": "INVALID_SET",
            "nodeType": "VariableDeclaration",
            "scope": 2975,
            "src": "1179:72:21",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2907,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1179:6:21",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "53657420746f6b656e2069732064697361626c6564206f7220646f6573206e6f742065786973742e",
              "id": 2908,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1209:42:21",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_c419cd4a3f97d6566703fad16a031bef670efd2b05b54195c4db43ccea0a7e7e",
                "typeString": "literal_string \"Set token is disabled or does not exist.\""
              },
              "value": "Set token is disabled or does not exist."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 2912,
            "name": "INVALID_FACTORY",
            "nodeType": "VariableDeclaration",
            "scope": 2975,
            "src": "1257:74:21",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2910,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1257:6:21",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "466163746f72792069732064697361626c6564206f7220646f6573206e6f742065786973742e",
              "id": 2911,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1291:40:21",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_ff40c07bf4b1e4d2220e3a6d57631493105b5007aba10b5d8cf1630effb33df5",
                "typeString": "literal_string \"Factory is disabled or does not exist.\""
              },
              "value": "Factory is disabled or does not exist."
            },
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2924,
              "nodeType": "Block",
              "src": "1484:99:21",
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
                        "id": 2919,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 2917,
                          "name": "_quantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2914,
                          "src": "1515:9:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 2918,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "1527:1:21",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "1515:13:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2920,
                        "name": "ZERO_QUANTITY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2906,
                        "src": "1542:13:21",
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
                      "id": 2916,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "1494:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2921,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1494:71:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2922,
                  "nodeType": "ExpressionStatement",
                  "src": "1494:71:21"
                },
                {
                  "id": 2923,
                  "nodeType": "PlaceholderStatement",
                  "src": "1575:1:21"
                }
              ]
            },
            "documentation": null,
            "id": 2925,
            "name": "isPositiveQuantity",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 2915,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2914,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2925,
                  "src": "1468:14:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2913,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1468:4:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1467:16:21"
            },
            "src": "1440:143:21",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2938,
              "nodeType": "Block",
              "src": "1678:125:21",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2930,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3004,
                            "src": "1709:5:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3002_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2931,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validFactories",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2989,
                          "src": "1709:20:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 2933,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 2932,
                          "name": "_factoryAddress",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2927,
                          "src": "1730:15:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "1709:37:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2934,
                        "name": "INVALID_FACTORY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2912,
                        "src": "1760:15:21",
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
                      "id": 2929,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "1688:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2935,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1688:97:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2936,
                  "nodeType": "ExpressionStatement",
                  "src": "1688:97:21"
                },
                {
                  "id": 2937,
                  "nodeType": "PlaceholderStatement",
                  "src": "1795:1:21"
                }
              ]
            },
            "documentation": null,
            "id": 2939,
            "name": "isValidFactory",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 2928,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2927,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2939,
                  "src": "1653:23:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2926,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1653:7:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1652:25:21"
            },
            "src": "1629:174:21",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2952,
              "nodeType": "Block",
              "src": "1903:112:21",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2944,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3004,
                            "src": "1934:5:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3002_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2945,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validSets",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2993,
                          "src": "1934:15:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 2947,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 2946,
                          "name": "_setAddress",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2941,
                          "src": "1950:11:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "1934:28:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2948,
                        "name": "INVALID_SET",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2909,
                        "src": "1976:11:21",
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
                      "id": 2943,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "1913:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2949,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1913:84:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2950,
                  "nodeType": "ExpressionStatement",
                  "src": "1913:84:21"
                },
                {
                  "id": 2951,
                  "nodeType": "PlaceholderStatement",
                  "src": "2007:1:21"
                }
              ]
            },
            "documentation": null,
            "id": 2953,
            "name": "isValidSet",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 2942,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2941,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2953,
                  "src": "1882:19:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2940,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1882:7:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1881:21:21"
            },
            "src": "1862:153:21",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2973,
              "nodeType": "Block",
              "src": "2140:140:21",
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
                        "id": 2968,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 2966,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 2960,
                            "name": "_quantity",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2955,
                            "src": "2171:9:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "%",
                          "rightExpression": {
                            "argumentTypes": null,
                            "arguments": [],
                            "expression": {
                              "argumentTypes": [],
                              "expression": {
                                "argumentTypes": null,
                                "arguments": [
                                  {
                                    "argumentTypes": null,
                                    "id": 2962,
                                    "name": "_setToken",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 2957,
                                    "src": "2193:9:21",
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
                                  "id": 2961,
                                  "name": "ISetToken",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2839,
                                  "src": "2183:9:21",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_ISetToken_$2839_$",
                                    "typeString": "type(contract ISetToken)"
                                  }
                                },
                                "id": 2963,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "2183:20:21",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_contract$_ISetToken_$2839",
                                  "typeString": "contract ISetToken"
                                }
                              },
                              "id": 2964,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "naturalUnit",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 2812,
                              "src": "2183:32:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_external_nonpayable$__$returns$_t_uint256_$",
                                "typeString": "function () external returns (uint256)"
                              }
                            },
                            "id": 2965,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "2183:34:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "2171:46:21",
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
                          "id": 2967,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "2221:1:21",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "2171:51:21",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2969,
                        "name": "INVALID_QUANTITY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2903,
                        "src": "2236:16:21",
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
                      "id": 2959,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "2150:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2970,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2150:112:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2971,
                  "nodeType": "ExpressionStatement",
                  "src": "2150:112:21"
                },
                {
                  "id": 2972,
                  "nodeType": "PlaceholderStatement",
                  "src": "2272:1:21"
                }
              ]
            },
            "documentation": null,
            "id": 2974,
            "name": "isNaturalUnitMultiple",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 2958,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2955,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2974,
                  "src": "2105:14:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2954,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2105:4:21",
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
                  "id": 2957,
                  "name": "_setToken",
                  "nodeType": "VariableDeclaration",
                  "scope": 2974,
                  "src": "2121:17:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2956,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2121:7:21",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2104:35:21"
            },
            "src": "2074:206:21",
            "visibility": "internal"
          }
        ],
        "scope": 2976,
        "src": "910:1372:21"
      }
    ],
    "src": "597:1686:21"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-08T01:11:15.197Z"
}