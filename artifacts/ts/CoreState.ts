export const CoreState = 
{
  "contractName": "CoreState",
  "abi": [
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
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b50610594806100206000396000f30060806040526004361061008e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630e4355d4146100935780631e912bd6146100ee578063430bf08a146101335780638ca4daf91461018a578063a003e069146101e1578063c19d93fb14610251578063f7213db6146102db578063fef3ee7314610320575b600080fd5b34801561009f57600080fd5b506100d4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061037b565b604051808215151515815260200191505060405180910390f35b3480156100fa57600080fd5b5061011d60048036038101908080356000191690602001909291905050506103d3565b6040518082815260200191505060405180910390f35b34801561013f57600080fd5b506101486103fa565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561019657600080fd5b5061019f610426565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156101ed57600080fd5b5061020f600480360381019080803560ff169060200190929190505050610452565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561025d57600080fd5b50610266610497565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390f35b3480156102e757600080fd5b5061030a60048036038101908080356000191690602001909291905050506104e9565b6040518082815260200191505060405180910390f35b34801561032c57600080fd5b50610361600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610510565b604051808215151515815260200191505060405180910390f35b60008060030160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b60008060060160008360001916600019168152602001908152602001600020549050919050565b60008060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060000160008360ff1660ff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60008060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905082565b60008060050160008360001916600019168152602001908152602001600020549050919050565b60008060040160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1690509190505600a165627a7a723058205fff594963aee3f438ac11a5af9b26d7346ef447ef1519fb1e35adcf6c65a6ce0029",
  "deployedBytecode": "0x60806040526004361061008e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630e4355d4146100935780631e912bd6146100ee578063430bf08a146101335780638ca4daf91461018a578063a003e069146101e1578063c19d93fb14610251578063f7213db6146102db578063fef3ee7314610320575b600080fd5b34801561009f57600080fd5b506100d4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061037b565b604051808215151515815260200191505060405180910390f35b3480156100fa57600080fd5b5061011d60048036038101908080356000191690602001909291905050506103d3565b6040518082815260200191505060405180910390f35b34801561013f57600080fd5b506101486103fa565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561019657600080fd5b5061019f610426565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156101ed57600080fd5b5061020f600480360381019080803560ff169060200190929190505050610452565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561025d57600080fd5b50610266610497565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390f35b3480156102e757600080fd5b5061030a60048036038101908080356000191690602001909291905050506104e9565b6040518082815260200191505060405180910390f35b34801561032c57600080fd5b50610361600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610510565b604051808215151515815260200191505060405180910390f35b60008060030160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b60008060060160008360001916600019168152602001908152602001600020549050919050565b60008060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060000160008360ff1660ff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60008060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905082565b60008060050160008360001916600019168152602001908152602001600020549050919050565b60008060040160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1690509190505600a165627a7a723058205fff594963aee3f438ac11a5af9b26d7346ef447ef1519fb1e35adcf6c65a6ce0029",
  "sourceMap": "800:1881:22:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;800:1881:22;;;;;;;",
  "deployedSourceMap": "800:1881:22:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2083:150;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2083:150:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2529;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2529:150:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1954:123;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1954:123:22;;;;;;;;;;;;;;;;;;;;;;;;;;;1809:139;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1809:139:22;;;;;;;;;;;;;;;;;;;;;;;;;;;1656:147;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1656:147:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1579:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1579:18:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2377:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2377:146:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2239:132;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2239:132:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2083:150;2169:4;2196:5;:20;;:30;2217:8;2196:30;;;;;;;;;;;;;;;;;;;;;;;;;2189:37;;2083:150;;;:::o;2529:::-;2615:4;2642:5;:18;;:30;2661:10;2642:30;;;;;;;;;;;;;;;;;;2635:37;;2529:150;;;:::o;1954:123::-;2022:7;2052:5;:18;;;;;;;;;;;;2045:25;;1954:123;:::o;1809:139::-;1885:7;1915:5;:26;;;;;;;;;;;;1908:33;;1809:139;:::o;1656:147::-;1738:7;1768:5;:15;;:28;1784:11;1768:28;;;;;;;;;;;;;;;;;;;;;;;;;1761:35;;1656:147;;;:::o;1579:18::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;2377:146::-;2461:4;2488:5;:16;;:28;2505:10;2488:28;;;;;;;;;;;;;;;;;;2481:35;;2377:146;;;:::o;2239:132::-;2316:4;2343:5;:15;;:21;2359:4;2343:21;;;;;;;;;;;;;;;;;;;;;;;;;2336:28;;2239:132;;;:::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\n/**\n * @title CoreState\n * @author Set Protocol\n *\n * The CoreState library maintains all state for the Core contract thus\n * allowing it to operate across multiple mixins.\n */\ncontract CoreState {\n\n    /* ============ Structs ============ */\n\n    struct State {\n        // Mapping of exchange enumeration to address\n        mapping(uint8 => address) exchanges;\n\n        // Address of the TransferProxy contract\n        address transferProxyAddress;\n\n        // Address of the Vault contract\n        address vaultAddress;\n\n        // Mapping of tracked SetToken factories\n        mapping(address => bool) validFactories;\n\n        // Mapping of tracked SetTokens\n        mapping(address => bool) validSets;\n\n        // Mapping of filled Issuance Orders\n        mapping(bytes32 => uint) orderFills;\n\n        // Mapping of canceled Issuance Orders\n        mapping(bytes32 => uint) orderCancels;\n    }\n\n    /* ============ State Variables ============ */\n\n    State public state;\n\n    /* ============ Public Getters ============ */\n\n    function exchanges(uint8 _exchangeId)\n        public\n        view\n        returns(address)\n    {\n        return state.exchanges[_exchangeId];\n    }\n\n    function transferProxyAddress()\n        public\n        view\n        returns(address)\n    {\n        return state.transferProxyAddress;\n    }\n\n    function vaultAddress()\n        public\n        view\n        returns(address)\n    {\n        return state.vaultAddress;\n    }\n\n    function validFactories(address _factory)\n        public\n        view\n        returns(bool)\n    {\n        return state.validFactories[_factory];\n    }\n\n    function validSets(address _set)\n        public\n        view\n        returns(bool)\n    {\n        return state.validSets[_set];\n    }\n\n    function orderFills(bytes32 _orderHash)\n        public\n        view\n        returns(uint)\n    {\n        return state.orderFills[_orderHash];\n    }\n\n    function orderCancels(bytes32 _orderHash)\n        public\n        view\n        returns(uint)\n    {\n        return state.orderCancels[_orderHash];\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
    "exportedSymbols": {
      "CoreState": [
        2751
      ]
    },
    "id": 2752,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2640,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:22"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title CoreState\n@author Set Protocol\n * The CoreState library maintains all state for the Core contract thus\nallowing it to operate across multiple mixins.",
        "fullyImplemented": true,
        "id": 2751,
        "linearizedBaseContracts": [
          2751
        ],
        "name": "CoreState",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "CoreState.State",
            "id": 2665,
            "members": [
              {
                "constant": false,
                "id": 2644,
                "name": "exchanges",
                "nodeType": "VariableDeclaration",
                "scope": 2665,
                "src": "948:35:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                  "typeString": "mapping(uint8 => address)"
                },
                "typeName": {
                  "id": 2643,
                  "keyType": {
                    "id": 2641,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "956:5:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "948:25:22",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                    "typeString": "mapping(uint8 => address)"
                  },
                  "valueType": {
                    "id": 2642,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "965:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 2646,
                "name": "transferProxyAddress",
                "nodeType": "VariableDeclaration",
                "scope": 2665,
                "src": "1043:28:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2645,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1043:7:22",
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
                "id": 2648,
                "name": "vaultAddress",
                "nodeType": "VariableDeclaration",
                "scope": 2665,
                "src": "1123:20:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2647,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1123:7:22",
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
                "id": 2652,
                "name": "validFactories",
                "nodeType": "VariableDeclaration",
                "scope": 2665,
                "src": "1203:39:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 2651,
                  "keyType": {
                    "id": 2649,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1211:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1203:24:22",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 2650,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1222:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 2656,
                "name": "validSets",
                "nodeType": "VariableDeclaration",
                "scope": 2665,
                "src": "1293:34:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 2655,
                  "keyType": {
                    "id": 2653,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1301:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1293:24:22",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 2654,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1312:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 2660,
                "name": "orderFills",
                "nodeType": "VariableDeclaration",
                "scope": 2665,
                "src": "1383:35:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 2659,
                  "keyType": {
                    "id": 2657,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1391:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1383:24:22",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 2658,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1402:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 2664,
                "name": "orderCancels",
                "nodeType": "VariableDeclaration",
                "scope": 2665,
                "src": "1476:37:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 2663,
                  "keyType": {
                    "id": 2661,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1484:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1476:24:22",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 2662,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1495:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "State",
            "nodeType": "StructDefinition",
            "scope": 2751,
            "src": "871:649:22",
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 2667,
            "name": "state",
            "nodeType": "VariableDeclaration",
            "scope": 2751,
            "src": "1579:18:22",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_struct$_State_$2665_storage",
              "typeString": "struct CoreState.State"
            },
            "typeName": {
              "contractScope": null,
              "id": 2666,
              "name": "State",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2665,
              "src": "1579:5:22",
              "typeDescriptions": {
                "typeIdentifier": "t_struct$_State_$2665_storage_ptr",
                "typeString": "struct CoreState.State"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2679,
              "nodeType": "Block",
              "src": "1751:52:22",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2674,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2667,
                        "src": "1768:5:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2665_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2675,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "exchanges",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2644,
                      "src": "1768:15:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                        "typeString": "mapping(uint8 => address)"
                      }
                    },
                    "id": 2677,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2676,
                      "name": "_exchangeId",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2669,
                      "src": "1784:11:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "IndexAccess",
                    "src": "1768:28:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 2673,
                  "id": 2678,
                  "nodeType": "Return",
                  "src": "1761:35:22"
                }
              ]
            },
            "documentation": null,
            "id": 2680,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "exchanges",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2670,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2669,
                  "name": "_exchangeId",
                  "nodeType": "VariableDeclaration",
                  "scope": 2680,
                  "src": "1675:17:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 2668,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "1675:5:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1674:19:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 2673,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2672,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2680,
                  "src": "1738:7:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2671,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1738:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1737:9:22"
            },
            "scope": 2751,
            "src": "1656:147:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2688,
              "nodeType": "Block",
              "src": "1898:50:22",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 2685,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2667,
                      "src": "1915:5:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$2665_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 2686,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "transferProxyAddress",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 2646,
                    "src": "1915:26:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 2684,
                  "id": 2687,
                  "nodeType": "Return",
                  "src": "1908:33:22"
                }
              ]
            },
            "documentation": null,
            "id": 2689,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "transferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2681,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1838:2:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 2684,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2683,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2689,
                  "src": "1885:7:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2682,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1885:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1884:9:22"
            },
            "scope": 2751,
            "src": "1809:139:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2697,
              "nodeType": "Block",
              "src": "2035:42:22",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 2694,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2667,
                      "src": "2052:5:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$2665_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 2695,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "vaultAddress",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 2648,
                    "src": "2052:18:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 2693,
                  "id": 2696,
                  "nodeType": "Return",
                  "src": "2045:25:22"
                }
              ]
            },
            "documentation": null,
            "id": 2698,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "vaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2690,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1975:2:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 2693,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2692,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2698,
                  "src": "2022:7:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2691,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2022:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2021:9:22"
            },
            "scope": 2751,
            "src": "1954:123:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2710,
              "nodeType": "Block",
              "src": "2179:54:22",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2705,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2667,
                        "src": "2196:5:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2665_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2706,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validFactories",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2652,
                      "src": "2196:20:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 2708,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2707,
                      "name": "_factory",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2700,
                      "src": "2217:8:22",
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
                    "src": "2196:30:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 2704,
                  "id": 2709,
                  "nodeType": "Return",
                  "src": "2189:37:22"
                }
              ]
            },
            "documentation": null,
            "id": 2711,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validFactories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2701,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2700,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 2711,
                  "src": "2107:16:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2699,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2107:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2106:18:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 2704,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2703,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2711,
                  "src": "2169:4:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 2702,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "2169:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2168:6:22"
            },
            "scope": 2751,
            "src": "2083:150:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2723,
              "nodeType": "Block",
              "src": "2326:45:22",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2718,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2667,
                        "src": "2343:5:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2665_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2719,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validSets",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2656,
                      "src": "2343:15:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 2721,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2720,
                      "name": "_set",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2713,
                      "src": "2359:4:22",
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
                    "src": "2343:21:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 2717,
                  "id": 2722,
                  "nodeType": "Return",
                  "src": "2336:28:22"
                }
              ]
            },
            "documentation": null,
            "id": 2724,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validSets",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2714,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2713,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 2724,
                  "src": "2258:12:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2712,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2258:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2257:14:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 2717,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2716,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2724,
                  "src": "2316:4:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 2715,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "2316:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2315:6:22"
            },
            "scope": 2751,
            "src": "2239:132:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2736,
              "nodeType": "Block",
              "src": "2471:52:22",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2731,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2667,
                        "src": "2488:5:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2665_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2732,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderFills",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2660,
                      "src": "2488:16:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 2734,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2733,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2726,
                      "src": "2505:10:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "IndexAccess",
                    "src": "2488:28:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 2730,
                  "id": 2735,
                  "nodeType": "Return",
                  "src": "2481:35:22"
                }
              ]
            },
            "documentation": null,
            "id": 2737,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderFills",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2727,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2726,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 2737,
                  "src": "2397:18:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 2725,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2397:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2396:20:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 2730,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2729,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2737,
                  "src": "2461:4:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2728,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2461:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2460:6:22"
            },
            "scope": 2751,
            "src": "2377:146:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2749,
              "nodeType": "Block",
              "src": "2625:54:22",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2744,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2667,
                        "src": "2642:5:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2665_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2745,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderCancels",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2664,
                      "src": "2642:18:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 2747,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2746,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2739,
                      "src": "2661:10:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "IndexAccess",
                    "src": "2642:30:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 2743,
                  "id": 2748,
                  "nodeType": "Return",
                  "src": "2635:37:22"
                }
              ]
            },
            "documentation": null,
            "id": 2750,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderCancels",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2740,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2739,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 2750,
                  "src": "2551:18:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 2738,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2551:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2550:20:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 2743,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2742,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2750,
                  "src": "2615:4:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2741,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2615:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2614:6:22"
            },
            "scope": 2751,
            "src": "2529:150:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 2752,
        "src": "800:1881:22"
      }
    ],
    "src": "597:2085:22"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
    "exportedSymbols": {
      "CoreState": [
        2751
      ]
    },
    "id": 2752,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2640,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:22"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title CoreState\n@author Set Protocol\n * The CoreState library maintains all state for the Core contract thus\nallowing it to operate across multiple mixins.",
        "fullyImplemented": true,
        "id": 2751,
        "linearizedBaseContracts": [
          2751
        ],
        "name": "CoreState",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "CoreState.State",
            "id": 2665,
            "members": [
              {
                "constant": false,
                "id": 2644,
                "name": "exchanges",
                "nodeType": "VariableDeclaration",
                "scope": 2665,
                "src": "948:35:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                  "typeString": "mapping(uint8 => address)"
                },
                "typeName": {
                  "id": 2643,
                  "keyType": {
                    "id": 2641,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "956:5:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "948:25:22",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                    "typeString": "mapping(uint8 => address)"
                  },
                  "valueType": {
                    "id": 2642,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "965:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 2646,
                "name": "transferProxyAddress",
                "nodeType": "VariableDeclaration",
                "scope": 2665,
                "src": "1043:28:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2645,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1043:7:22",
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
                "id": 2648,
                "name": "vaultAddress",
                "nodeType": "VariableDeclaration",
                "scope": 2665,
                "src": "1123:20:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2647,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1123:7:22",
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
                "id": 2652,
                "name": "validFactories",
                "nodeType": "VariableDeclaration",
                "scope": 2665,
                "src": "1203:39:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 2651,
                  "keyType": {
                    "id": 2649,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1211:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1203:24:22",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 2650,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1222:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 2656,
                "name": "validSets",
                "nodeType": "VariableDeclaration",
                "scope": 2665,
                "src": "1293:34:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 2655,
                  "keyType": {
                    "id": 2653,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1301:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1293:24:22",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 2654,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1312:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 2660,
                "name": "orderFills",
                "nodeType": "VariableDeclaration",
                "scope": 2665,
                "src": "1383:35:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 2659,
                  "keyType": {
                    "id": 2657,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1391:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1383:24:22",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 2658,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1402:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 2664,
                "name": "orderCancels",
                "nodeType": "VariableDeclaration",
                "scope": 2665,
                "src": "1476:37:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 2663,
                  "keyType": {
                    "id": 2661,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1484:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1476:24:22",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 2662,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1495:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "State",
            "nodeType": "StructDefinition",
            "scope": 2751,
            "src": "871:649:22",
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 2667,
            "name": "state",
            "nodeType": "VariableDeclaration",
            "scope": 2751,
            "src": "1579:18:22",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_struct$_State_$2665_storage",
              "typeString": "struct CoreState.State"
            },
            "typeName": {
              "contractScope": null,
              "id": 2666,
              "name": "State",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2665,
              "src": "1579:5:22",
              "typeDescriptions": {
                "typeIdentifier": "t_struct$_State_$2665_storage_ptr",
                "typeString": "struct CoreState.State"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2679,
              "nodeType": "Block",
              "src": "1751:52:22",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2674,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2667,
                        "src": "1768:5:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2665_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2675,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "exchanges",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2644,
                      "src": "1768:15:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                        "typeString": "mapping(uint8 => address)"
                      }
                    },
                    "id": 2677,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2676,
                      "name": "_exchangeId",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2669,
                      "src": "1784:11:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "IndexAccess",
                    "src": "1768:28:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 2673,
                  "id": 2678,
                  "nodeType": "Return",
                  "src": "1761:35:22"
                }
              ]
            },
            "documentation": null,
            "id": 2680,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "exchanges",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2670,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2669,
                  "name": "_exchangeId",
                  "nodeType": "VariableDeclaration",
                  "scope": 2680,
                  "src": "1675:17:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 2668,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "1675:5:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1674:19:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 2673,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2672,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2680,
                  "src": "1738:7:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2671,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1738:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1737:9:22"
            },
            "scope": 2751,
            "src": "1656:147:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2688,
              "nodeType": "Block",
              "src": "1898:50:22",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 2685,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2667,
                      "src": "1915:5:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$2665_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 2686,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "transferProxyAddress",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 2646,
                    "src": "1915:26:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 2684,
                  "id": 2687,
                  "nodeType": "Return",
                  "src": "1908:33:22"
                }
              ]
            },
            "documentation": null,
            "id": 2689,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "transferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2681,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1838:2:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 2684,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2683,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2689,
                  "src": "1885:7:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2682,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1885:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1884:9:22"
            },
            "scope": 2751,
            "src": "1809:139:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2697,
              "nodeType": "Block",
              "src": "2035:42:22",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 2694,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2667,
                      "src": "2052:5:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$2665_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 2695,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "vaultAddress",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 2648,
                    "src": "2052:18:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 2693,
                  "id": 2696,
                  "nodeType": "Return",
                  "src": "2045:25:22"
                }
              ]
            },
            "documentation": null,
            "id": 2698,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "vaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2690,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1975:2:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 2693,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2692,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2698,
                  "src": "2022:7:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2691,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2022:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2021:9:22"
            },
            "scope": 2751,
            "src": "1954:123:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2710,
              "nodeType": "Block",
              "src": "2179:54:22",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2705,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2667,
                        "src": "2196:5:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2665_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2706,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validFactories",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2652,
                      "src": "2196:20:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 2708,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2707,
                      "name": "_factory",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2700,
                      "src": "2217:8:22",
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
                    "src": "2196:30:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 2704,
                  "id": 2709,
                  "nodeType": "Return",
                  "src": "2189:37:22"
                }
              ]
            },
            "documentation": null,
            "id": 2711,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validFactories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2701,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2700,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 2711,
                  "src": "2107:16:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2699,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2107:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2106:18:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 2704,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2703,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2711,
                  "src": "2169:4:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 2702,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "2169:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2168:6:22"
            },
            "scope": 2751,
            "src": "2083:150:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2723,
              "nodeType": "Block",
              "src": "2326:45:22",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2718,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2667,
                        "src": "2343:5:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2665_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2719,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validSets",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2656,
                      "src": "2343:15:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 2721,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2720,
                      "name": "_set",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2713,
                      "src": "2359:4:22",
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
                    "src": "2343:21:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 2717,
                  "id": 2722,
                  "nodeType": "Return",
                  "src": "2336:28:22"
                }
              ]
            },
            "documentation": null,
            "id": 2724,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validSets",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2714,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2713,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 2724,
                  "src": "2258:12:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2712,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2258:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2257:14:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 2717,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2716,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2724,
                  "src": "2316:4:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 2715,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "2316:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2315:6:22"
            },
            "scope": 2751,
            "src": "2239:132:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2736,
              "nodeType": "Block",
              "src": "2471:52:22",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2731,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2667,
                        "src": "2488:5:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2665_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2732,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderFills",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2660,
                      "src": "2488:16:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 2734,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2733,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2726,
                      "src": "2505:10:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "IndexAccess",
                    "src": "2488:28:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 2730,
                  "id": 2735,
                  "nodeType": "Return",
                  "src": "2481:35:22"
                }
              ]
            },
            "documentation": null,
            "id": 2737,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderFills",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2727,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2726,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 2737,
                  "src": "2397:18:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 2725,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2397:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2396:20:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 2730,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2729,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2737,
                  "src": "2461:4:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2728,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2461:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2460:6:22"
            },
            "scope": 2751,
            "src": "2377:146:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2749,
              "nodeType": "Block",
              "src": "2625:54:22",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2744,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2667,
                        "src": "2642:5:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2665_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2745,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderCancels",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2664,
                      "src": "2642:18:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 2747,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2746,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2739,
                      "src": "2661:10:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "IndexAccess",
                    "src": "2642:30:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 2743,
                  "id": 2748,
                  "nodeType": "Return",
                  "src": "2635:37:22"
                }
              ]
            },
            "documentation": null,
            "id": 2750,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderCancels",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2740,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2739,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 2750,
                  "src": "2551:18:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 2738,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2551:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2550:20:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 2743,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2742,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2750,
                  "src": "2615:4:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2741,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2615:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2614:6:22"
            },
            "scope": 2751,
            "src": "2529:150:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 2752,
        "src": "800:1881:22"
      }
    ],
    "src": "597:2085:22"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-07T07:45:08.905Z"
}