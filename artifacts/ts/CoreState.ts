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
  "bytecode": "0x608060405234801561001057600080fd5b506102a4806100206000396000f30060806040526004361061008d5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100925780631e912bd6146100c7578063430bf08a146100f15780638ca4daf914610122578063a003e06914610137578063c19d93fb14610152578063f7213db61461018d578063fef3ee73146101a5575b600080fd5b34801561009e57600080fd5b506100b3600160a060020a03600435166101c6565b604080519115158252519081900360200190f35b3480156100d357600080fd5b506100df6004356101e4565b60408051918252519081900360200190f35b3480156100fd57600080fd5b506101066101f6565b60408051600160a060020a039092168252519081900360200190f35b34801561012e57600080fd5b50610106610205565b34801561014357600080fd5b5061010660ff60043516610214565b34801561015e57600080fd5b50610167610232565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b34801561019957600080fd5b506100df600435610248565b3480156101b157600080fd5b506100b3600160a060020a036004351661025a565b600160a060020a031660009081526003602052604090205460ff1690565b60009081526006602052604090205490565b600254600160a060020a031690565b600154600160a060020a031690565b60ff16600090815260208190526040902054600160a060020a031690565b600154600254600160a060020a03918216911682565b60009081526005602052604090205490565b600160a060020a031660009081526004602052604090205460ff16905600a165627a7a72305820e6a0cb3fe82b1852478ec41c462dd840396e5eba929c48efc9a7b18d347bfd9c0029",
  "deployedBytecode": "0x60806040526004361061008d5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100925780631e912bd6146100c7578063430bf08a146100f15780638ca4daf914610122578063a003e06914610137578063c19d93fb14610152578063f7213db61461018d578063fef3ee73146101a5575b600080fd5b34801561009e57600080fd5b506100b3600160a060020a03600435166101c6565b604080519115158252519081900360200190f35b3480156100d357600080fd5b506100df6004356101e4565b60408051918252519081900360200190f35b3480156100fd57600080fd5b506101066101f6565b60408051600160a060020a039092168252519081900360200190f35b34801561012e57600080fd5b50610106610205565b34801561014357600080fd5b5061010660ff60043516610214565b34801561015e57600080fd5b50610167610232565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b34801561019957600080fd5b506100df600435610248565b3480156101b157600080fd5b506100b3600160a060020a036004351661025a565b600160a060020a031660009081526003602052604090205460ff1690565b60009081526006602052604090205490565b600254600160a060020a031690565b600154600160a060020a031690565b60ff16600090815260208190526040902054600160a060020a031690565b600154600254600160a060020a03918216911682565b60009081526005602052604090205490565b600160a060020a031660009081526004602052604090205460ff16905600a165627a7a72305820e6a0cb3fe82b1852478ec41c462dd840396e5eba929c48efc9a7b18d347bfd9c0029",
  "sourceMap": "800:1881:22:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;800:1881:22;;;;;;;",
  "deployedSourceMap": "800:1881:22:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2083:150;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2083:150:22;-1:-1:-1;;;;;2083:150:22;;;;;;;;;;;;;;;;;;;;;;;2529;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2529:150:22;;;;;;;;;;;;;;;;;;;;;1954:123;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1954:123:22;;;;;;;;-1:-1:-1;;;;;1954:123:22;;;;;;;;;;;;;;1809:139;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1809:139:22;;;;1656:147;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1656:147:22;;;;;;;1579:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1579:18:22;;;;;;;;-1:-1:-1;;;;;1579:18:22;;;;;;;;;;;;;;;;;;;;;;;;2377:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2377:146:22;;;;;2239:132;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2239:132:22;-1:-1:-1;;;;;2239:132:22;;;;;2083:150;-1:-1:-1;;;;;2196:30:22;2169:4;2196:30;;;:20;:30;;;;;;;;;2083:150::o;2529:::-;2615:4;2642:30;;;:18;:30;;;;;;;2529:150::o;1954:123::-;2052:18;;-1:-1:-1;;;;;2052:18:22;1954:123;:::o;1809:139::-;1915:26;;-1:-1:-1;;;;;1915:26:22;1809:139;:::o;1656:147::-;1768:28;;1738:7;1768:28;;;;;;;;;;;-1:-1:-1;;;;;1768:28:22;;1656:147::o;1579:18::-;;;;;-1:-1:-1;;;;;1579:18:22;;;;;;:::o;2377:146::-;2461:4;2488:28;;;:16;:28;;;;;;;2377:146::o;2239:132::-;-1:-1:-1;;;;;2343:21:22;2316:4;2343:21;;;:15;:21;;;;;;;;;2239:132::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\n/**\n * @title CoreState\n * @author Set Protocol\n *\n * The CoreState library maintains all state for the Core contract thus\n * allowing it to operate across multiple mixins.\n */\ncontract CoreState {\n\n    /* ============ Structs ============ */\n\n    struct State {\n        // Mapping of exchange enumeration to address\n        mapping(uint8 => address) exchanges;\n\n        // Address of the TransferProxy contract\n        address transferProxyAddress;\n\n        // Address of the Vault contract\n        address vaultAddress;\n\n        // Mapping of tracked SetToken factories\n        mapping(address => bool) validFactories;\n\n        // Mapping of tracked SetTokens\n        mapping(address => bool) validSets;\n\n        // Mapping of filled Issuance Orders\n        mapping(bytes32 => uint) orderFills;\n\n        // Mapping of canceled Issuance Orders\n        mapping(bytes32 => uint) orderCancels;\n    }\n\n    /* ============ State Variables ============ */\n\n    State public state;\n\n    /* ============ Public Getters ============ */\n\n    function exchanges(uint8 _exchangeId)\n        public\n        view\n        returns(address)\n    {\n        return state.exchanges[_exchangeId];\n    }\n\n    function transferProxyAddress()\n        public\n        view\n        returns(address)\n    {\n        return state.transferProxyAddress;\n    }\n\n    function vaultAddress()\n        public\n        view\n        returns(address)\n    {\n        return state.vaultAddress;\n    }\n\n    function validFactories(address _factory)\n        public\n        view\n        returns(bool)\n    {\n        return state.validFactories[_factory];\n    }\n\n    function validSets(address _set)\n        public\n        view\n        returns(bool)\n    {\n        return state.validSets[_set];\n    }\n\n    function orderFills(bytes32 _orderHash)\n        public\n        view\n        returns(uint)\n    {\n        return state.orderFills[_orderHash];\n    }\n\n    function orderCancels(bytes32 _orderHash)\n        public\n        view\n        returns(uint)\n    {\n        return state.orderCancels[_orderHash];\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
    "exportedSymbols": {
      "CoreState": [
        3088
      ]
    },
    "id": 3089,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2977,
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
        "id": 3088,
        "linearizedBaseContracts": [
          3088
        ],
        "name": "CoreState",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "CoreState.State",
            "id": 3002,
            "members": [
              {
                "constant": false,
                "id": 2981,
                "name": "exchanges",
                "nodeType": "VariableDeclaration",
                "scope": 3002,
                "src": "948:35:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                  "typeString": "mapping(uint8 => address)"
                },
                "typeName": {
                  "id": 2980,
                  "keyType": {
                    "id": 2978,
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
                    "id": 2979,
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
                "id": 2983,
                "name": "transferProxyAddress",
                "nodeType": "VariableDeclaration",
                "scope": 3002,
                "src": "1043:28:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2982,
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
                "id": 2985,
                "name": "vaultAddress",
                "nodeType": "VariableDeclaration",
                "scope": 3002,
                "src": "1123:20:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2984,
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
                "id": 2989,
                "name": "validFactories",
                "nodeType": "VariableDeclaration",
                "scope": 3002,
                "src": "1203:39:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 2988,
                  "keyType": {
                    "id": 2986,
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
                    "id": 2987,
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
                "id": 2993,
                "name": "validSets",
                "nodeType": "VariableDeclaration",
                "scope": 3002,
                "src": "1293:34:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 2992,
                  "keyType": {
                    "id": 2990,
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
                    "id": 2991,
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
                "id": 2997,
                "name": "orderFills",
                "nodeType": "VariableDeclaration",
                "scope": 3002,
                "src": "1383:35:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 2996,
                  "keyType": {
                    "id": 2994,
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
                    "id": 2995,
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
                "id": 3001,
                "name": "orderCancels",
                "nodeType": "VariableDeclaration",
                "scope": 3002,
                "src": "1476:37:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 3000,
                  "keyType": {
                    "id": 2998,
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
                    "id": 2999,
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
            "scope": 3088,
            "src": "871:649:22",
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 3004,
            "name": "state",
            "nodeType": "VariableDeclaration",
            "scope": 3088,
            "src": "1579:18:22",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_struct$_State_$3002_storage",
              "typeString": "struct CoreState.State"
            },
            "typeName": {
              "contractScope": null,
              "id": 3003,
              "name": "State",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3002,
              "src": "1579:5:22",
              "typeDescriptions": {
                "typeIdentifier": "t_struct$_State_$3002_storage_ptr",
                "typeString": "struct CoreState.State"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3016,
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
                        "id": 3011,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3004,
                        "src": "1768:5:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3002_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3012,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "exchanges",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2981,
                      "src": "1768:15:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                        "typeString": "mapping(uint8 => address)"
                      }
                    },
                    "id": 3014,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3013,
                      "name": "_exchangeId",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3006,
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
                  "functionReturnParameters": 3010,
                  "id": 3015,
                  "nodeType": "Return",
                  "src": "1761:35:22"
                }
              ]
            },
            "documentation": null,
            "id": 3017,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "exchanges",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3007,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3006,
                  "name": "_exchangeId",
                  "nodeType": "VariableDeclaration",
                  "scope": 3017,
                  "src": "1675:17:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 3005,
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
              "id": 3010,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3009,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3017,
                  "src": "1738:7:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3008,
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
            "scope": 3088,
            "src": "1656:147:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3025,
              "nodeType": "Block",
              "src": "1898:50:22",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3022,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3004,
                      "src": "1915:5:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3002_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3023,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "transferProxyAddress",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 2983,
                    "src": "1915:26:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 3021,
                  "id": 3024,
                  "nodeType": "Return",
                  "src": "1908:33:22"
                }
              ]
            },
            "documentation": null,
            "id": 3026,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "transferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3018,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1838:2:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3021,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3020,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3026,
                  "src": "1885:7:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3019,
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
            "scope": 3088,
            "src": "1809:139:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3034,
              "nodeType": "Block",
              "src": "2035:42:22",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3031,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3004,
                      "src": "2052:5:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3002_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3032,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "vaultAddress",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 2985,
                    "src": "2052:18:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 3030,
                  "id": 3033,
                  "nodeType": "Return",
                  "src": "2045:25:22"
                }
              ]
            },
            "documentation": null,
            "id": 3035,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "vaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3027,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1975:2:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3030,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3029,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3035,
                  "src": "2022:7:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3028,
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
            "scope": 3088,
            "src": "1954:123:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3047,
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
                        "id": 3042,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3004,
                        "src": "2196:5:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3002_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3043,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validFactories",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2989,
                      "src": "2196:20:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 3045,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3044,
                      "name": "_factory",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3037,
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
                  "functionReturnParameters": 3041,
                  "id": 3046,
                  "nodeType": "Return",
                  "src": "2189:37:22"
                }
              ]
            },
            "documentation": null,
            "id": 3048,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validFactories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3038,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3037,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3048,
                  "src": "2107:16:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3036,
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
              "id": 3041,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3040,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3048,
                  "src": "2169:4:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3039,
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
            "scope": 3088,
            "src": "2083:150:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3060,
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
                        "id": 3055,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3004,
                        "src": "2343:5:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3002_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3056,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validSets",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2993,
                      "src": "2343:15:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 3058,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3057,
                      "name": "_set",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3050,
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
                  "functionReturnParameters": 3054,
                  "id": 3059,
                  "nodeType": "Return",
                  "src": "2336:28:22"
                }
              ]
            },
            "documentation": null,
            "id": 3061,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validSets",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3051,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3050,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3061,
                  "src": "2258:12:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3049,
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
              "id": 3054,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3053,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3061,
                  "src": "2316:4:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3052,
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
            "scope": 3088,
            "src": "2239:132:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3073,
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
                        "id": 3068,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3004,
                        "src": "2488:5:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3002_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3069,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderFills",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2997,
                      "src": "2488:16:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 3071,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3070,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3063,
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
                  "functionReturnParameters": 3067,
                  "id": 3072,
                  "nodeType": "Return",
                  "src": "2481:35:22"
                }
              ]
            },
            "documentation": null,
            "id": 3074,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderFills",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3064,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3063,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 3074,
                  "src": "2397:18:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3062,
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
              "id": 3067,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3066,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3074,
                  "src": "2461:4:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3065,
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
            "scope": 3088,
            "src": "2377:146:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3086,
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
                        "id": 3081,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3004,
                        "src": "2642:5:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3002_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3082,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderCancels",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3001,
                      "src": "2642:18:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 3084,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3083,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3076,
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
                  "functionReturnParameters": 3080,
                  "id": 3085,
                  "nodeType": "Return",
                  "src": "2635:37:22"
                }
              ]
            },
            "documentation": null,
            "id": 3087,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderCancels",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3077,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3076,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 3087,
                  "src": "2551:18:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3075,
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
              "id": 3080,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3079,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3087,
                  "src": "2615:4:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3078,
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
            "scope": 3088,
            "src": "2529:150:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 3089,
        "src": "800:1881:22"
      }
    ],
    "src": "597:2085:22"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
    "exportedSymbols": {
      "CoreState": [
        3088
      ]
    },
    "id": 3089,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2977,
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
        "id": 3088,
        "linearizedBaseContracts": [
          3088
        ],
        "name": "CoreState",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "CoreState.State",
            "id": 3002,
            "members": [
              {
                "constant": false,
                "id": 2981,
                "name": "exchanges",
                "nodeType": "VariableDeclaration",
                "scope": 3002,
                "src": "948:35:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                  "typeString": "mapping(uint8 => address)"
                },
                "typeName": {
                  "id": 2980,
                  "keyType": {
                    "id": 2978,
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
                    "id": 2979,
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
                "id": 2983,
                "name": "transferProxyAddress",
                "nodeType": "VariableDeclaration",
                "scope": 3002,
                "src": "1043:28:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2982,
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
                "id": 2985,
                "name": "vaultAddress",
                "nodeType": "VariableDeclaration",
                "scope": 3002,
                "src": "1123:20:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2984,
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
                "id": 2989,
                "name": "validFactories",
                "nodeType": "VariableDeclaration",
                "scope": 3002,
                "src": "1203:39:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 2988,
                  "keyType": {
                    "id": 2986,
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
                    "id": 2987,
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
                "id": 2993,
                "name": "validSets",
                "nodeType": "VariableDeclaration",
                "scope": 3002,
                "src": "1293:34:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 2992,
                  "keyType": {
                    "id": 2990,
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
                    "id": 2991,
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
                "id": 2997,
                "name": "orderFills",
                "nodeType": "VariableDeclaration",
                "scope": 3002,
                "src": "1383:35:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 2996,
                  "keyType": {
                    "id": 2994,
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
                    "id": 2995,
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
                "id": 3001,
                "name": "orderCancels",
                "nodeType": "VariableDeclaration",
                "scope": 3002,
                "src": "1476:37:22",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 3000,
                  "keyType": {
                    "id": 2998,
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
                    "id": 2999,
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
            "scope": 3088,
            "src": "871:649:22",
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 3004,
            "name": "state",
            "nodeType": "VariableDeclaration",
            "scope": 3088,
            "src": "1579:18:22",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_struct$_State_$3002_storage",
              "typeString": "struct CoreState.State"
            },
            "typeName": {
              "contractScope": null,
              "id": 3003,
              "name": "State",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3002,
              "src": "1579:5:22",
              "typeDescriptions": {
                "typeIdentifier": "t_struct$_State_$3002_storage_ptr",
                "typeString": "struct CoreState.State"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3016,
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
                        "id": 3011,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3004,
                        "src": "1768:5:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3002_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3012,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "exchanges",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2981,
                      "src": "1768:15:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                        "typeString": "mapping(uint8 => address)"
                      }
                    },
                    "id": 3014,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3013,
                      "name": "_exchangeId",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3006,
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
                  "functionReturnParameters": 3010,
                  "id": 3015,
                  "nodeType": "Return",
                  "src": "1761:35:22"
                }
              ]
            },
            "documentation": null,
            "id": 3017,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "exchanges",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3007,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3006,
                  "name": "_exchangeId",
                  "nodeType": "VariableDeclaration",
                  "scope": 3017,
                  "src": "1675:17:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 3005,
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
              "id": 3010,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3009,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3017,
                  "src": "1738:7:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3008,
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
            "scope": 3088,
            "src": "1656:147:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3025,
              "nodeType": "Block",
              "src": "1898:50:22",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3022,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3004,
                      "src": "1915:5:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3002_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3023,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "transferProxyAddress",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 2983,
                    "src": "1915:26:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 3021,
                  "id": 3024,
                  "nodeType": "Return",
                  "src": "1908:33:22"
                }
              ]
            },
            "documentation": null,
            "id": 3026,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "transferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3018,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1838:2:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3021,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3020,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3026,
                  "src": "1885:7:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3019,
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
            "scope": 3088,
            "src": "1809:139:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3034,
              "nodeType": "Block",
              "src": "2035:42:22",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3031,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3004,
                      "src": "2052:5:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3002_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3032,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "vaultAddress",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 2985,
                    "src": "2052:18:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 3030,
                  "id": 3033,
                  "nodeType": "Return",
                  "src": "2045:25:22"
                }
              ]
            },
            "documentation": null,
            "id": 3035,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "vaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3027,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1975:2:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 3030,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3029,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3035,
                  "src": "2022:7:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3028,
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
            "scope": 3088,
            "src": "1954:123:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3047,
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
                        "id": 3042,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3004,
                        "src": "2196:5:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3002_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3043,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validFactories",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2989,
                      "src": "2196:20:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 3045,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3044,
                      "name": "_factory",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3037,
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
                  "functionReturnParameters": 3041,
                  "id": 3046,
                  "nodeType": "Return",
                  "src": "2189:37:22"
                }
              ]
            },
            "documentation": null,
            "id": 3048,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validFactories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3038,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3037,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3048,
                  "src": "2107:16:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3036,
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
              "id": 3041,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3040,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3048,
                  "src": "2169:4:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3039,
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
            "scope": 3088,
            "src": "2083:150:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3060,
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
                        "id": 3055,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3004,
                        "src": "2343:5:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3002_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3056,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validSets",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2993,
                      "src": "2343:15:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 3058,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3057,
                      "name": "_set",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3050,
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
                  "functionReturnParameters": 3054,
                  "id": 3059,
                  "nodeType": "Return",
                  "src": "2336:28:22"
                }
              ]
            },
            "documentation": null,
            "id": 3061,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validSets",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3051,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3050,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3061,
                  "src": "2258:12:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3049,
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
              "id": 3054,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3053,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3061,
                  "src": "2316:4:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3052,
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
            "scope": 3088,
            "src": "2239:132:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3073,
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
                        "id": 3068,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3004,
                        "src": "2488:5:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3002_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3069,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderFills",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2997,
                      "src": "2488:16:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 3071,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3070,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3063,
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
                  "functionReturnParameters": 3067,
                  "id": 3072,
                  "nodeType": "Return",
                  "src": "2481:35:22"
                }
              ]
            },
            "documentation": null,
            "id": 3074,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderFills",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3064,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3063,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 3074,
                  "src": "2397:18:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3062,
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
              "id": 3067,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3066,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3074,
                  "src": "2461:4:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3065,
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
            "scope": 3088,
            "src": "2377:146:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3086,
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
                        "id": 3081,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3004,
                        "src": "2642:5:22",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3002_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3082,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderCancels",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3001,
                      "src": "2642:18:22",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 3084,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3083,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3076,
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
                  "functionReturnParameters": 3080,
                  "id": 3085,
                  "nodeType": "Return",
                  "src": "2635:37:22"
                }
              ]
            },
            "documentation": null,
            "id": 3087,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderCancels",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3077,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3076,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 3087,
                  "src": "2551:18:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3075,
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
              "id": 3080,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3079,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3087,
                  "src": "2615:4:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3078,
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
            "scope": 3088,
            "src": "2529:150:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 3089,
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
  "updatedAt": "2018-07-08T01:11:15.197Z"
}