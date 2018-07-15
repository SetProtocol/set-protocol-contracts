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
      "name": "setTokens",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
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
      "inputs": [],
      "name": "factories",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
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
  "bytecode": "0x608060405234801561001057600080fd5b50610498806100206000396000f3006080604052600436106100a35763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100a85780631e912bd6146100ea578063430bf08a14610114578063559ed339146101525780638ca4daf9146101b7578063a003e069146101cc578063c19d93fb146101e7578063f7213db61461022f578063fe5b38e414610247578063fef3ee731461025c575b600080fd5b3480156100b457600080fd5b506100d673ffffffffffffffffffffffffffffffffffffffff6004351661028a565b604080519115158252519081900360200190f35b3480156100f657600080fd5b506101026004356102b5565b60408051918252519081900360200190f35b34801561012057600080fd5b506101296102c7565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561015e57600080fd5b506101676102e3565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101a357818101518382015260200161018b565b505050509050019250505060405180910390f35b3480156101c357600080fd5b50610129610355565b3480156101d857600080fd5b5061012960ff60043516610371565b3480156101f357600080fd5b506101fc61039c565b6040805173ffffffffffffffffffffffffffffffffffffffff938416815291909216602082015281519081900390910190f35b34801561023b57600080fd5b506101026004356103bf565b34801561025357600080fd5b506101676103d1565b34801561026857600080fd5b506100d673ffffffffffffffffffffffffffffffffffffffff60043516610441565b73ffffffffffffffffffffffffffffffffffffffff1660009081526003602052604090205460ff1690565b60009081526008602052604090205490565b60025473ffffffffffffffffffffffffffffffffffffffff1690565b6060600060060180548060200260200160405190810160405280929190818152602001828054801561034b57602002820191906000526020600020905b815473ffffffffffffffffffffffffffffffffffffffff168152600190910190602001808311610320575b5050505050905090565b60015473ffffffffffffffffffffffffffffffffffffffff1690565b60ff1660009081526020819052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60015460025473ffffffffffffffffffffffffffffffffffffffff918216911682565b60009081526007602052604090205490565b6060600060040180548060200260200160405190810160405280929190818152602001828054801561034b5760200282019190600052602060002090815473ffffffffffffffffffffffffffffffffffffffff168152600190910190602001808311610320575050505050905090565b73ffffffffffffffffffffffffffffffffffffffff1660009081526005602052604090205460ff16905600a165627a7a723058209d31f1ea961030cb9eb3da58cb8dc2f3e13b5d1b25300d18072f3d269c01dd9f0029",
  "deployedBytecode": "0x6080604052600436106100a35763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100a85780631e912bd6146100ea578063430bf08a14610114578063559ed339146101525780638ca4daf9146101b7578063a003e069146101cc578063c19d93fb146101e7578063f7213db61461022f578063fe5b38e414610247578063fef3ee731461025c575b600080fd5b3480156100b457600080fd5b506100d673ffffffffffffffffffffffffffffffffffffffff6004351661028a565b604080519115158252519081900360200190f35b3480156100f657600080fd5b506101026004356102b5565b60408051918252519081900360200190f35b34801561012057600080fd5b506101296102c7565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561015e57600080fd5b506101676102e3565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101a357818101518382015260200161018b565b505050509050019250505060405180910390f35b3480156101c357600080fd5b50610129610355565b3480156101d857600080fd5b5061012960ff60043516610371565b3480156101f357600080fd5b506101fc61039c565b6040805173ffffffffffffffffffffffffffffffffffffffff938416815291909216602082015281519081900390910190f35b34801561023b57600080fd5b506101026004356103bf565b34801561025357600080fd5b506101676103d1565b34801561026857600080fd5b506100d673ffffffffffffffffffffffffffffffffffffffff60043516610441565b73ffffffffffffffffffffffffffffffffffffffff1660009081526003602052604090205460ff1690565b60009081526008602052604090205490565b60025473ffffffffffffffffffffffffffffffffffffffff1690565b6060600060060180548060200260200160405190810160405280929190818152602001828054801561034b57602002820191906000526020600020905b815473ffffffffffffffffffffffffffffffffffffffff168152600190910190602001808311610320575b5050505050905090565b60015473ffffffffffffffffffffffffffffffffffffffff1690565b60ff1660009081526020819052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60015460025473ffffffffffffffffffffffffffffffffffffffff918216911682565b60009081526007602052604090205490565b6060600060040180548060200260200160405190810160405280929190818152602001828054801561034b5760200282019190600052602060002090815473ffffffffffffffffffffffffffffffffffffffff168152600190910190602001808311610320575050505050905090565b73ffffffffffffffffffffffffffffffffffffffff1660009081526005602052604090205460ff16905600a165627a7a723058209d31f1ea961030cb9eb3da58cb8dc2f3e13b5d1b25300d18072f3d269c01dd9f0029",
  "sourceMap": "910:1372:22:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;910:1372:22;;;;;;;",
  "deployedSourceMap": "910:1372:22:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2228:150:23;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2228:150:23;;;;;;;;;;;;;;;;;;;;;;;;;2924;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2924:150:23;;;;;;;;;;;;;;;;;;;;;2099:123;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2099:123:23;;;;;;;;;;;;;;;;;;;;;;;2647:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2647:119:23;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;2647:119:23;;;;;;;;;;;;;;;;;1954:139;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1954:139:23;;;;1801:147;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1801:147:23;;;;;;;1724:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1724:18:23;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2772:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2772:146:23;;;;;2384:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2384:119:23;;;;2509:132;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2509:132:23;;;;;;;2228:150;2341:30;;2314:4;2341:30;;;:20;:30;;;;;;;;;2228:150::o;2924:::-;3010:4;3037:30;;;:18;:30;;;;;;;2924:150::o;2099:123::-;2197:18;;;;2099:123;:::o;2647:119::-;2712:9;2744:5;:15;;2737:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2647:119;:::o;1954:139::-;2060:26;;;;1954:139;:::o;1801:147::-;1913:28;;1883:7;1913:28;;;;;;;;;;;;;;1801:147::o;1724:18::-;;;;;;;;;;;;:::o;2772:146::-;2856:4;2883:28;;;:16;:28;;;;;;;2772:146::o;2384:119::-;2449:9;2481:5;:15;;2474:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2384:119;:::o;2509:132::-;2613:21;;2586:4;2613:21;;;:15;:21;;;;;;;;;2509:132::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { CoreState } from \"./CoreState.sol\";\nimport { ISetToken } from \"../interfaces/ISetToken.sol\";\n\n\n/**\n * @title Core Shared Modifiers\n * @author Set Protocol\n *\n * The Core Shared Modifiers library contains the modifiers that are shared across the different\n * Core extensions.\n */\ncontract CoreModifiers is\n    CoreState\n{\n\n    /* ============ Constants ============ */\n\n    string constant INVALID_QUANTITY = \"Quantity must be multiple of the natural unit of the set.\";\n    string constant ZERO_QUANTITY = \"Quantity must be greater than zero.\";\n    string constant INVALID_SET = \"Set token is disabled or does not exist.\";\n    string constant INVALID_FACTORY = \"Factory is disabled or does not exist.\";\n\n    /* ============ Modifiers ============ */\n\n    // Check that quantity submitted is greater than 0\n    modifier isPositiveQuantity(uint _quantity) {\n        require(\n            _quantity > 0,\n            ZERO_QUANTITY\n        );\n        _;\n    }\n\n    // Verify Factory is linked to Core\n    modifier isValidFactory(address _factoryAddress) {\n        require(\n            state.validFactories[_factoryAddress],\n            INVALID_FACTORY\n        );\n        _;\n    }\n\n    // Verify set was created by core and is enabled\n    modifier isValidSet(address _setAddress) {\n        require(\n            state.validSets[_setAddress],\n            INVALID_SET\n        );\n        _;\n    }\n\n    // Validate quantity is multiple of natural unit\n    modifier isNaturalUnitMultiple(uint _quantity, address _setToken) {\n        require(\n            _quantity % ISetToken(_setToken).naturalUnit() == 0,\n            INVALID_QUANTITY\n        );\n        _;\n    }\n}\n",
  "sourcePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
  "ast": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
    "exportedSymbols": {
      "CoreModifiers": [
        3454
      ]
    },
    "id": 3455,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3373,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:22"
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "./CoreState.sol",
        "id": 3375,
        "nodeType": "ImportDirective",
        "scope": 3455,
        "sourceUnit": 3594,
        "src": "622:44:22",
        "symbolAliases": [
          {
            "foreign": 3374,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
        "file": "../interfaces/ISetToken.sol",
        "id": 3377,
        "nodeType": "ImportDirective",
        "scope": 3455,
        "sourceUnit": 3319,
        "src": "667:56:22",
        "symbolAliases": [
          {
            "foreign": 3376,
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
              "id": 3378,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3593,
              "src": "940:9:22",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3593",
                "typeString": "contract CoreState"
              }
            },
            "id": 3379,
            "nodeType": "InheritanceSpecifier",
            "src": "940:9:22"
          }
        ],
        "contractDependencies": [
          3593
        ],
        "contractKind": "contract",
        "documentation": "@title Core Shared Modifiers\n@author Set Protocol\n * The Core Shared Modifiers library contains the modifiers that are shared across the different\nCore extensions.",
        "fullyImplemented": true,
        "id": 3454,
        "linearizedBaseContracts": [
          3454,
          3593
        ],
        "name": "CoreModifiers",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 3382,
            "name": "INVALID_QUANTITY",
            "nodeType": "VariableDeclaration",
            "scope": 3454,
            "src": "1004:94:22",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 3380,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1004:6:22",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e74697479206d757374206265206d756c7469706c65206f6620746865206e61747572616c20756e6974206f6620746865207365742e",
              "id": 3381,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1039:59:22",
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
            "id": 3385,
            "name": "ZERO_QUANTITY",
            "nodeType": "VariableDeclaration",
            "scope": 3454,
            "src": "1104:69:22",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 3383,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1104:6:22",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e74697479206d7573742062652067726561746572207468616e207a65726f2e",
              "id": 3384,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1136:37:22",
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
            "id": 3388,
            "name": "INVALID_SET",
            "nodeType": "VariableDeclaration",
            "scope": 3454,
            "src": "1179:72:22",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 3386,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1179:6:22",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "53657420746f6b656e2069732064697361626c6564206f7220646f6573206e6f742065786973742e",
              "id": 3387,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1209:42:22",
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
            "id": 3391,
            "name": "INVALID_FACTORY",
            "nodeType": "VariableDeclaration",
            "scope": 3454,
            "src": "1257:74:22",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 3389,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1257:6:22",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "466163746f72792069732064697361626c6564206f7220646f6573206e6f742065786973742e",
              "id": 3390,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1291:40:22",
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
              "id": 3403,
              "nodeType": "Block",
              "src": "1484:99:22",
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
                        "id": 3398,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 3396,
                          "name": "_quantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3393,
                          "src": "1515:9:22",
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
                          "id": 3397,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "1527:1:22",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "1515:13:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3399,
                        "name": "ZERO_QUANTITY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3385,
                        "src": "1542:13:22",
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
                      "id": 3395,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "1494:7:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3400,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1494:71:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3401,
                  "nodeType": "ExpressionStatement",
                  "src": "1494:71:22"
                },
                {
                  "id": 3402,
                  "nodeType": "PlaceholderStatement",
                  "src": "1575:1:22"
                }
              ]
            },
            "documentation": null,
            "id": 3404,
            "name": "isPositiveQuantity",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 3394,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3393,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3404,
                  "src": "1468:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3392,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1468:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1467:16:22"
            },
            "src": "1440:143:22",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3417,
              "nodeType": "Block",
              "src": "1678:125:22",
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
                            "id": 3409,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3489,
                            "src": "1709:5:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3487_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 3410,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validFactories",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3468,
                          "src": "1709:20:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 3412,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 3411,
                          "name": "_factoryAddress",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3406,
                          "src": "1730:15:22",
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
                        "src": "1709:37:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3413,
                        "name": "INVALID_FACTORY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3391,
                        "src": "1760:15:22",
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
                      "id": 3408,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "1688:7:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3414,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1688:97:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3415,
                  "nodeType": "ExpressionStatement",
                  "src": "1688:97:22"
                },
                {
                  "id": 3416,
                  "nodeType": "PlaceholderStatement",
                  "src": "1795:1:22"
                }
              ]
            },
            "documentation": null,
            "id": 3418,
            "name": "isValidFactory",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 3407,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3406,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3418,
                  "src": "1653:23:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3405,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1653:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1652:25:22"
            },
            "src": "1629:174:22",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3431,
              "nodeType": "Block",
              "src": "1903:112:22",
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
                            "id": 3423,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3489,
                            "src": "1934:5:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3487_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 3424,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validSets",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3475,
                          "src": "1934:15:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 3426,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 3425,
                          "name": "_setAddress",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3420,
                          "src": "1950:11:22",
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
                        "src": "1934:28:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3427,
                        "name": "INVALID_SET",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3388,
                        "src": "1976:11:22",
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
                      "id": 3422,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "1913:7:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3428,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1913:84:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3429,
                  "nodeType": "ExpressionStatement",
                  "src": "1913:84:22"
                },
                {
                  "id": 3430,
                  "nodeType": "PlaceholderStatement",
                  "src": "2007:1:22"
                }
              ]
            },
            "documentation": null,
            "id": 3432,
            "name": "isValidSet",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 3421,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3420,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3432,
                  "src": "1882:19:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3419,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1882:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1881:21:22"
            },
            "src": "1862:153:22",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3452,
              "nodeType": "Block",
              "src": "2140:140:22",
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
                        "id": 3447,
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
                          "id": 3445,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3439,
                            "name": "_quantity",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3434,
                            "src": "2171:9:22",
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
                                    "id": 3441,
                                    "name": "_setToken",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 3436,
                                    "src": "2193:9:22",
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
                                  "id": 3440,
                                  "name": "ISetToken",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 3318,
                                  "src": "2183:9:22",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_ISetToken_$3318_$",
                                    "typeString": "type(contract ISetToken)"
                                  }
                                },
                                "id": 3442,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "2183:20:22",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_contract$_ISetToken_$3318",
                                  "typeString": "contract ISetToken"
                                }
                              },
                              "id": 3443,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "naturalUnit",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3291,
                              "src": "2183:32:22",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_external_nonpayable$__$returns$_t_uint256_$",
                                "typeString": "function () external returns (uint256)"
                              }
                            },
                            "id": 3444,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "2183:34:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "2171:46:22",
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
                          "id": 3446,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "2221:1:22",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "2171:51:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3448,
                        "name": "INVALID_QUANTITY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3382,
                        "src": "2236:16:22",
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
                      "id": 3438,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "2150:7:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3449,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2150:112:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3450,
                  "nodeType": "ExpressionStatement",
                  "src": "2150:112:22"
                },
                {
                  "id": 3451,
                  "nodeType": "PlaceholderStatement",
                  "src": "2272:1:22"
                }
              ]
            },
            "documentation": null,
            "id": 3453,
            "name": "isNaturalUnitMultiple",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 3437,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3434,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3453,
                  "src": "2105:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3433,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2105:4:22",
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
                  "id": 3436,
                  "name": "_setToken",
                  "nodeType": "VariableDeclaration",
                  "scope": 3453,
                  "src": "2121:17:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3435,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2121:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2104:35:22"
            },
            "src": "2074:206:22",
            "visibility": "internal"
          }
        ],
        "scope": 3455,
        "src": "910:1372:22"
      }
    ],
    "src": "597:1686:22"
  },
  "legacyAST": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
    "exportedSymbols": {
      "CoreModifiers": [
        3454
      ]
    },
    "id": 3455,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3373,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:22"
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "./CoreState.sol",
        "id": 3375,
        "nodeType": "ImportDirective",
        "scope": 3455,
        "sourceUnit": 3594,
        "src": "622:44:22",
        "symbolAliases": [
          {
            "foreign": 3374,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
        "file": "../interfaces/ISetToken.sol",
        "id": 3377,
        "nodeType": "ImportDirective",
        "scope": 3455,
        "sourceUnit": 3319,
        "src": "667:56:22",
        "symbolAliases": [
          {
            "foreign": 3376,
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
              "id": 3378,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3593,
              "src": "940:9:22",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3593",
                "typeString": "contract CoreState"
              }
            },
            "id": 3379,
            "nodeType": "InheritanceSpecifier",
            "src": "940:9:22"
          }
        ],
        "contractDependencies": [
          3593
        ],
        "contractKind": "contract",
        "documentation": "@title Core Shared Modifiers\n@author Set Protocol\n * The Core Shared Modifiers library contains the modifiers that are shared across the different\nCore extensions.",
        "fullyImplemented": true,
        "id": 3454,
        "linearizedBaseContracts": [
          3454,
          3593
        ],
        "name": "CoreModifiers",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 3382,
            "name": "INVALID_QUANTITY",
            "nodeType": "VariableDeclaration",
            "scope": 3454,
            "src": "1004:94:22",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 3380,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1004:6:22",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e74697479206d757374206265206d756c7469706c65206f6620746865206e61747572616c20756e6974206f6620746865207365742e",
              "id": 3381,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1039:59:22",
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
            "id": 3385,
            "name": "ZERO_QUANTITY",
            "nodeType": "VariableDeclaration",
            "scope": 3454,
            "src": "1104:69:22",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 3383,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1104:6:22",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e74697479206d7573742062652067726561746572207468616e207a65726f2e",
              "id": 3384,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1136:37:22",
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
            "id": 3388,
            "name": "INVALID_SET",
            "nodeType": "VariableDeclaration",
            "scope": 3454,
            "src": "1179:72:22",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 3386,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1179:6:22",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "53657420746f6b656e2069732064697361626c6564206f7220646f6573206e6f742065786973742e",
              "id": 3387,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1209:42:22",
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
            "id": 3391,
            "name": "INVALID_FACTORY",
            "nodeType": "VariableDeclaration",
            "scope": 3454,
            "src": "1257:74:22",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 3389,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1257:6:22",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "466163746f72792069732064697361626c6564206f7220646f6573206e6f742065786973742e",
              "id": 3390,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1291:40:22",
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
              "id": 3403,
              "nodeType": "Block",
              "src": "1484:99:22",
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
                        "id": 3398,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 3396,
                          "name": "_quantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3393,
                          "src": "1515:9:22",
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
                          "id": 3397,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "1527:1:22",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "1515:13:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3399,
                        "name": "ZERO_QUANTITY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3385,
                        "src": "1542:13:22",
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
                      "id": 3395,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "1494:7:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3400,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1494:71:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3401,
                  "nodeType": "ExpressionStatement",
                  "src": "1494:71:22"
                },
                {
                  "id": 3402,
                  "nodeType": "PlaceholderStatement",
                  "src": "1575:1:22"
                }
              ]
            },
            "documentation": null,
            "id": 3404,
            "name": "isPositiveQuantity",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 3394,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3393,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3404,
                  "src": "1468:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3392,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1468:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1467:16:22"
            },
            "src": "1440:143:22",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3417,
              "nodeType": "Block",
              "src": "1678:125:22",
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
                            "id": 3409,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3489,
                            "src": "1709:5:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3487_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 3410,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validFactories",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3468,
                          "src": "1709:20:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 3412,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 3411,
                          "name": "_factoryAddress",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3406,
                          "src": "1730:15:22",
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
                        "src": "1709:37:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3413,
                        "name": "INVALID_FACTORY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3391,
                        "src": "1760:15:22",
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
                      "id": 3408,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "1688:7:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3414,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1688:97:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3415,
                  "nodeType": "ExpressionStatement",
                  "src": "1688:97:22"
                },
                {
                  "id": 3416,
                  "nodeType": "PlaceholderStatement",
                  "src": "1795:1:22"
                }
              ]
            },
            "documentation": null,
            "id": 3418,
            "name": "isValidFactory",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 3407,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3406,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3418,
                  "src": "1653:23:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3405,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1653:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1652:25:22"
            },
            "src": "1629:174:22",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3431,
              "nodeType": "Block",
              "src": "1903:112:22",
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
                            "id": 3423,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3489,
                            "src": "1934:5:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3487_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 3424,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validSets",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3475,
                          "src": "1934:15:22",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 3426,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 3425,
                          "name": "_setAddress",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3420,
                          "src": "1950:11:22",
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
                        "src": "1934:28:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3427,
                        "name": "INVALID_SET",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3388,
                        "src": "1976:11:22",
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
                      "id": 3422,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "1913:7:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3428,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1913:84:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3429,
                  "nodeType": "ExpressionStatement",
                  "src": "1913:84:22"
                },
                {
                  "id": 3430,
                  "nodeType": "PlaceholderStatement",
                  "src": "2007:1:22"
                }
              ]
            },
            "documentation": null,
            "id": 3432,
            "name": "isValidSet",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 3421,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3420,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 3432,
                  "src": "1882:19:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3419,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1882:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1881:21:22"
            },
            "src": "1862:153:22",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3452,
              "nodeType": "Block",
              "src": "2140:140:22",
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
                        "id": 3447,
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
                          "id": 3445,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 3439,
                            "name": "_quantity",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3434,
                            "src": "2171:9:22",
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
                                    "id": 3441,
                                    "name": "_setToken",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 3436,
                                    "src": "2193:9:22",
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
                                  "id": 3440,
                                  "name": "ISetToken",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 3318,
                                  "src": "2183:9:22",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_ISetToken_$3318_$",
                                    "typeString": "type(contract ISetToken)"
                                  }
                                },
                                "id": 3442,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "2183:20:22",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_contract$_ISetToken_$3318",
                                  "typeString": "contract ISetToken"
                                }
                              },
                              "id": 3443,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "naturalUnit",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3291,
                              "src": "2183:32:22",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_external_nonpayable$__$returns$_t_uint256_$",
                                "typeString": "function () external returns (uint256)"
                              }
                            },
                            "id": 3444,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "2183:34:22",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "2171:46:22",
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
                          "id": 3446,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "2221:1:22",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "2171:51:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3448,
                        "name": "INVALID_QUANTITY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3382,
                        "src": "2236:16:22",
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
                      "id": 3438,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "2150:7:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 3449,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2150:112:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3450,
                  "nodeType": "ExpressionStatement",
                  "src": "2150:112:22"
                },
                {
                  "id": 3451,
                  "nodeType": "PlaceholderStatement",
                  "src": "2272:1:22"
                }
              ]
            },
            "documentation": null,
            "id": 3453,
            "name": "isNaturalUnitMultiple",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 3437,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3434,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3453,
                  "src": "2105:14:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3433,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2105:4:22",
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
                  "id": 3436,
                  "name": "_setToken",
                  "nodeType": "VariableDeclaration",
                  "scope": 3453,
                  "src": "2121:17:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3435,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2121:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2104:35:22"
            },
            "src": "2074:206:22",
            "visibility": "internal"
          }
        ],
        "scope": 3455,
        "src": "910:1372:22"
      }
    ],
    "src": "597:1686:22"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-13T21:55:38.411Z"
}