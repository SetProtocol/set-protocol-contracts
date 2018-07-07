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
  "bytecode": "0x608060405234801561001057600080fd5b50610594806100206000396000f30060806040526004361061008e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630e4355d4146100935780631e912bd6146100ee578063430bf08a146101335780638ca4daf91461018a578063a003e069146101e1578063c19d93fb14610251578063f7213db6146102db578063fef3ee7314610320575b600080fd5b34801561009f57600080fd5b506100d4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061037b565b604051808215151515815260200191505060405180910390f35b3480156100fa57600080fd5b5061011d60048036038101908080356000191690602001909291905050506103d3565b6040518082815260200191505060405180910390f35b34801561013f57600080fd5b506101486103fa565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561019657600080fd5b5061019f610426565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156101ed57600080fd5b5061020f600480360381019080803560ff169060200190929190505050610452565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561025d57600080fd5b50610266610497565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390f35b3480156102e757600080fd5b5061030a60048036038101908080356000191690602001909291905050506104e9565b6040518082815260200191505060405180910390f35b34801561032c57600080fd5b50610361600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610510565b604051808215151515815260200191505060405180910390f35b60008060030160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b60008060060160008360001916600019168152602001908152602001600020549050919050565b60008060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060000160008360ff1660ff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60008060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905082565b60008060050160008360001916600019168152602001908152602001600020549050919050565b60008060040160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1690509190505600a165627a7a723058208eb1107700fbaf0e1492bb05c25ec440a1cf01a2699c21bd5220b067c0e7adb80029",
  "deployedBytecode": "0x60806040526004361061008e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630e4355d4146100935780631e912bd6146100ee578063430bf08a146101335780638ca4daf91461018a578063a003e069146101e1578063c19d93fb14610251578063f7213db6146102db578063fef3ee7314610320575b600080fd5b34801561009f57600080fd5b506100d4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061037b565b604051808215151515815260200191505060405180910390f35b3480156100fa57600080fd5b5061011d60048036038101908080356000191690602001909291905050506103d3565b6040518082815260200191505060405180910390f35b34801561013f57600080fd5b506101486103fa565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561019657600080fd5b5061019f610426565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156101ed57600080fd5b5061020f600480360381019080803560ff169060200190929190505050610452565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561025d57600080fd5b50610266610497565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390f35b3480156102e757600080fd5b5061030a60048036038101908080356000191690602001909291905050506104e9565b6040518082815260200191505060405180910390f35b34801561032c57600080fd5b50610361600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610510565b604051808215151515815260200191505060405180910390f35b60008060030160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b60008060060160008360001916600019168152602001908152602001600020549050919050565b60008060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060000160008360ff1660ff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60008060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905082565b60008060050160008360001916600019168152602001908152602001600020549050919050565b60008060040160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1690509190505600a165627a7a723058208eb1107700fbaf0e1492bb05c25ec440a1cf01a2699c21bd5220b067c0e7adb80029",
  "sourceMap": "910:1372:21:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;910:1372:21;;;;;;;",
  "deployedSourceMap": "910:1372:21:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2083:150:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2083:150:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2529;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2529:150:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1954:123;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1954:123:22;;;;;;;;;;;;;;;;;;;;;;;;;;;1809:139;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1809:139:22;;;;;;;;;;;;;;;;;;;;;;;;;;;1656:147;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1656:147:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1579:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1579:18:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2377:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2377:146:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2239:132;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2239:132:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2083:150;2169:4;2196:5;:20;;:30;2217:8;2196:30;;;;;;;;;;;;;;;;;;;;;;;;;2189:37;;2083:150;;;:::o;2529:::-;2615:4;2642:5;:18;;:30;2661:10;2642:30;;;;;;;;;;;;;;;;;;2635:37;;2529:150;;;:::o;1954:123::-;2022:7;2052:5;:18;;;;;;;;;;;;2045:25;;1954:123;:::o;1809:139::-;1885:7;1915:5;:26;;;;;;;;;;;;1908:33;;1809:139;:::o;1656:147::-;1738:7;1768:5;:15;;:28;1784:11;1768:28;;;;;;;;;;;;;;;;;;;;;;;;;1761:35;;1656:147;;;:::o;1579:18::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;2377:146::-;2461:4;2488:5;:16;;:28;2505:10;2488:28;;;;;;;;;;;;;;;;;;2481:35;;2377:146;;;:::o;2239:132::-;2316:4;2343:5;:15;;:21;2359:4;2343:21;;;;;;;;;;;;;;;;;;;;;;;;;2336:28;;2239:132;;;:::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { CoreState } from \"./CoreState.sol\";\nimport { ISetToken } from \"../interfaces/ISetToken.sol\";\n\n\n/**\n * @title Core Shared Modifiers\n * @author Set Protocol\n *\n * The Core Shared Modifiers library contains the modifiers that are shared across the different\n * Core extensions.\n */\ncontract CoreModifiers is\n    CoreState\n{\n\n    /* ============ Constants ============ */\n\n    string constant INVALID_QUANTITY = \"Quantity must be multiple of the natural unit of the set.\";\n    string constant ZERO_QUANTITY = \"Quantity must be greater than zero.\";\n    string constant INVALID_SET = \"Set token is disabled or does not exist.\";\n    string constant INVALID_FACTORY = \"Factory is disabled or does not exist.\";\n\n    /* ============ Modifiers ============ */\n\n    // Check that quantity submitted is greater than 0\n    modifier isPositiveQuantity(uint _quantity) {\n        require(\n            _quantity > 0,\n            ZERO_QUANTITY\n        );\n        _;\n    }\n\n    // Verify Factory is linked to Core\n    modifier isValidFactory(address _factoryAddress) {\n        require(\n            state.validFactories[_factoryAddress],\n            INVALID_FACTORY\n        );\n        _;\n    }\n\n    // Verify set was created by core and is enabled\n    modifier isValidSet(address _setAddress) {\n        require(\n            state.validSets[_setAddress],\n            INVALID_SET\n        );\n        _;\n    }\n\n    // Validate quantity is multiple of natural unit\n    modifier isNaturalUnitMultiple(uint _quantity, address _setToken) {\n        require(\n            _quantity % ISetToken(_setToken).naturalUnit() == 0,\n            INVALID_QUANTITY\n        );\n        _;\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
    "exportedSymbols": {
      "CoreModifiers": [
        2638
      ]
    },
    "id": 2639,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2557,
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
        "id": 2559,
        "nodeType": "ImportDirective",
        "scope": 2639,
        "sourceUnit": 2752,
        "src": "622:44:21",
        "symbolAliases": [
          {
            "foreign": 2558,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
        "file": "../interfaces/ISetToken.sol",
        "id": 2561,
        "nodeType": "ImportDirective",
        "scope": 2639,
        "sourceUnit": 2505,
        "src": "667:56:21",
        "symbolAliases": [
          {
            "foreign": 2560,
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
              "id": 2562,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2751,
              "src": "940:9:21",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$2751",
                "typeString": "contract CoreState"
              }
            },
            "id": 2563,
            "nodeType": "InheritanceSpecifier",
            "src": "940:9:21"
          }
        ],
        "contractDependencies": [
          2751
        ],
        "contractKind": "contract",
        "documentation": "@title Core Shared Modifiers\n@author Set Protocol\n * The Core Shared Modifiers library contains the modifiers that are shared across the different\nCore extensions.",
        "fullyImplemented": true,
        "id": 2638,
        "linearizedBaseContracts": [
          2638,
          2751
        ],
        "name": "CoreModifiers",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 2566,
            "name": "INVALID_QUANTITY",
            "nodeType": "VariableDeclaration",
            "scope": 2638,
            "src": "1004:94:21",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2564,
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
              "id": 2565,
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
            "id": 2569,
            "name": "ZERO_QUANTITY",
            "nodeType": "VariableDeclaration",
            "scope": 2638,
            "src": "1104:69:21",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2567,
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
              "id": 2568,
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
            "id": 2572,
            "name": "INVALID_SET",
            "nodeType": "VariableDeclaration",
            "scope": 2638,
            "src": "1179:72:21",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2570,
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
              "id": 2571,
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
            "id": 2575,
            "name": "INVALID_FACTORY",
            "nodeType": "VariableDeclaration",
            "scope": 2638,
            "src": "1257:74:21",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2573,
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
              "id": 2574,
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
              "id": 2587,
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
                        "id": 2582,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 2580,
                          "name": "_quantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2577,
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
                          "id": 2581,
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
                        "id": 2583,
                        "name": "ZERO_QUANTITY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2569,
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
                      "id": 2579,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "1494:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2584,
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
                  "id": 2585,
                  "nodeType": "ExpressionStatement",
                  "src": "1494:71:21"
                },
                {
                  "id": 2586,
                  "nodeType": "PlaceholderStatement",
                  "src": "1575:1:21"
                }
              ]
            },
            "documentation": null,
            "id": 2588,
            "name": "isPositiveQuantity",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 2578,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2577,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2588,
                  "src": "1468:14:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2576,
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
              "id": 2601,
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
                            "id": 2593,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2667,
                            "src": "1709:5:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$2665_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2594,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validFactories",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2652,
                          "src": "1709:20:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 2596,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 2595,
                          "name": "_factoryAddress",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2590,
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
                        "id": 2597,
                        "name": "INVALID_FACTORY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2575,
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
                      "id": 2592,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "1688:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2598,
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
                  "id": 2599,
                  "nodeType": "ExpressionStatement",
                  "src": "1688:97:21"
                },
                {
                  "id": 2600,
                  "nodeType": "PlaceholderStatement",
                  "src": "1795:1:21"
                }
              ]
            },
            "documentation": null,
            "id": 2602,
            "name": "isValidFactory",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 2591,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2590,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2602,
                  "src": "1653:23:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2589,
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
              "id": 2615,
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
                            "id": 2607,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2667,
                            "src": "1934:5:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$2665_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2608,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validSets",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2656,
                          "src": "1934:15:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 2610,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 2609,
                          "name": "_setAddress",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2604,
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
                        "id": 2611,
                        "name": "INVALID_SET",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2572,
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
                      "id": 2606,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "1913:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2612,
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
                  "id": 2613,
                  "nodeType": "ExpressionStatement",
                  "src": "1913:84:21"
                },
                {
                  "id": 2614,
                  "nodeType": "PlaceholderStatement",
                  "src": "2007:1:21"
                }
              ]
            },
            "documentation": null,
            "id": 2616,
            "name": "isValidSet",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 2605,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2604,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2616,
                  "src": "1882:19:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2603,
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
              "id": 2636,
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
                        "id": 2631,
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
                          "id": 2629,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 2623,
                            "name": "_quantity",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2618,
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
                                    "id": 2625,
                                    "name": "_setToken",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 2620,
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
                                  "id": 2624,
                                  "name": "ISetToken",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2504,
                                  "src": "2183:9:21",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_ISetToken_$2504_$",
                                    "typeString": "type(contract ISetToken)"
                                  }
                                },
                                "id": 2626,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "2183:20:21",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_contract$_ISetToken_$2504",
                                  "typeString": "contract ISetToken"
                                }
                              },
                              "id": 2627,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "naturalUnit",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 2477,
                              "src": "2183:32:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_external_nonpayable$__$returns$_t_uint256_$",
                                "typeString": "function () external returns (uint256)"
                              }
                            },
                            "id": 2628,
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
                          "id": 2630,
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
                        "id": 2632,
                        "name": "INVALID_QUANTITY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2566,
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
                      "id": 2622,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "2150:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2633,
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
                  "id": 2634,
                  "nodeType": "ExpressionStatement",
                  "src": "2150:112:21"
                },
                {
                  "id": 2635,
                  "nodeType": "PlaceholderStatement",
                  "src": "2272:1:21"
                }
              ]
            },
            "documentation": null,
            "id": 2637,
            "name": "isNaturalUnitMultiple",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 2621,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2618,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2637,
                  "src": "2105:14:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2617,
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
                  "id": 2620,
                  "name": "_setToken",
                  "nodeType": "VariableDeclaration",
                  "scope": 2637,
                  "src": "2121:17:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2619,
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
        "scope": 2639,
        "src": "910:1372:21"
      }
    ],
    "src": "597:1686:21"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
    "exportedSymbols": {
      "CoreModifiers": [
        2638
      ]
    },
    "id": 2639,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2557,
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
        "id": 2559,
        "nodeType": "ImportDirective",
        "scope": 2639,
        "sourceUnit": 2752,
        "src": "622:44:21",
        "symbolAliases": [
          {
            "foreign": 2558,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
        "file": "../interfaces/ISetToken.sol",
        "id": 2561,
        "nodeType": "ImportDirective",
        "scope": 2639,
        "sourceUnit": 2505,
        "src": "667:56:21",
        "symbolAliases": [
          {
            "foreign": 2560,
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
              "id": 2562,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2751,
              "src": "940:9:21",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$2751",
                "typeString": "contract CoreState"
              }
            },
            "id": 2563,
            "nodeType": "InheritanceSpecifier",
            "src": "940:9:21"
          }
        ],
        "contractDependencies": [
          2751
        ],
        "contractKind": "contract",
        "documentation": "@title Core Shared Modifiers\n@author Set Protocol\n * The Core Shared Modifiers library contains the modifiers that are shared across the different\nCore extensions.",
        "fullyImplemented": true,
        "id": 2638,
        "linearizedBaseContracts": [
          2638,
          2751
        ],
        "name": "CoreModifiers",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 2566,
            "name": "INVALID_QUANTITY",
            "nodeType": "VariableDeclaration",
            "scope": 2638,
            "src": "1004:94:21",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2564,
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
              "id": 2565,
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
            "id": 2569,
            "name": "ZERO_QUANTITY",
            "nodeType": "VariableDeclaration",
            "scope": 2638,
            "src": "1104:69:21",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2567,
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
              "id": 2568,
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
            "id": 2572,
            "name": "INVALID_SET",
            "nodeType": "VariableDeclaration",
            "scope": 2638,
            "src": "1179:72:21",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2570,
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
              "id": 2571,
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
            "id": 2575,
            "name": "INVALID_FACTORY",
            "nodeType": "VariableDeclaration",
            "scope": 2638,
            "src": "1257:74:21",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2573,
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
              "id": 2574,
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
              "id": 2587,
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
                        "id": 2582,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 2580,
                          "name": "_quantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2577,
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
                          "id": 2581,
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
                        "id": 2583,
                        "name": "ZERO_QUANTITY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2569,
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
                      "id": 2579,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "1494:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2584,
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
                  "id": 2585,
                  "nodeType": "ExpressionStatement",
                  "src": "1494:71:21"
                },
                {
                  "id": 2586,
                  "nodeType": "PlaceholderStatement",
                  "src": "1575:1:21"
                }
              ]
            },
            "documentation": null,
            "id": 2588,
            "name": "isPositiveQuantity",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 2578,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2577,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2588,
                  "src": "1468:14:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2576,
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
              "id": 2601,
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
                            "id": 2593,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2667,
                            "src": "1709:5:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$2665_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2594,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validFactories",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2652,
                          "src": "1709:20:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 2596,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 2595,
                          "name": "_factoryAddress",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2590,
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
                        "id": 2597,
                        "name": "INVALID_FACTORY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2575,
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
                      "id": 2592,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "1688:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2598,
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
                  "id": 2599,
                  "nodeType": "ExpressionStatement",
                  "src": "1688:97:21"
                },
                {
                  "id": 2600,
                  "nodeType": "PlaceholderStatement",
                  "src": "1795:1:21"
                }
              ]
            },
            "documentation": null,
            "id": 2602,
            "name": "isValidFactory",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 2591,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2590,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2602,
                  "src": "1653:23:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2589,
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
              "id": 2615,
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
                            "id": 2607,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2667,
                            "src": "1934:5:21",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$2665_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2608,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validSets",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2656,
                          "src": "1934:15:21",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 2610,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 2609,
                          "name": "_setAddress",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2604,
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
                        "id": 2611,
                        "name": "INVALID_SET",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2572,
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
                      "id": 2606,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "1913:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2612,
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
                  "id": 2613,
                  "nodeType": "ExpressionStatement",
                  "src": "1913:84:21"
                },
                {
                  "id": 2614,
                  "nodeType": "PlaceholderStatement",
                  "src": "2007:1:21"
                }
              ]
            },
            "documentation": null,
            "id": 2616,
            "name": "isValidSet",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 2605,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2604,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2616,
                  "src": "1882:19:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2603,
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
              "id": 2636,
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
                        "id": 2631,
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
                          "id": 2629,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 2623,
                            "name": "_quantity",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2618,
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
                                    "id": 2625,
                                    "name": "_setToken",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 2620,
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
                                  "id": 2624,
                                  "name": "ISetToken",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2504,
                                  "src": "2183:9:21",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_ISetToken_$2504_$",
                                    "typeString": "type(contract ISetToken)"
                                  }
                                },
                                "id": 2626,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "2183:20:21",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_contract$_ISetToken_$2504",
                                  "typeString": "contract ISetToken"
                                }
                              },
                              "id": 2627,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "naturalUnit",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 2477,
                              "src": "2183:32:21",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_external_nonpayable$__$returns$_t_uint256_$",
                                "typeString": "function () external returns (uint256)"
                              }
                            },
                            "id": 2628,
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
                          "id": 2630,
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
                        "id": 2632,
                        "name": "INVALID_QUANTITY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2566,
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
                      "id": 2622,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "2150:7:21",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2633,
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
                  "id": 2634,
                  "nodeType": "ExpressionStatement",
                  "src": "2150:112:21"
                },
                {
                  "id": 2635,
                  "nodeType": "PlaceholderStatement",
                  "src": "2272:1:21"
                }
              ]
            },
            "documentation": null,
            "id": 2637,
            "name": "isNaturalUnitMultiple",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 2621,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2618,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2637,
                  "src": "2105:14:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2617,
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
                  "id": 2620,
                  "name": "_setToken",
                  "nodeType": "VariableDeclaration",
                  "scope": 2637,
                  "src": "2121:17:21",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2619,
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
        "scope": 2639,
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
  "updatedAt": "2018-07-07T07:45:08.904Z"
}