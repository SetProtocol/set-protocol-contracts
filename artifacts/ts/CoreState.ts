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
  "bytecode": "0x608060405234801561001057600080fd5b50610498806100206000396000f3006080604052600436106100a35763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100a85780631e912bd6146100ea578063430bf08a14610114578063559ed339146101525780638ca4daf9146101b7578063a003e069146101cc578063c19d93fb146101e7578063f7213db61461022f578063fe5b38e414610247578063fef3ee731461025c575b600080fd5b3480156100b457600080fd5b506100d673ffffffffffffffffffffffffffffffffffffffff6004351661028a565b604080519115158252519081900360200190f35b3480156100f657600080fd5b506101026004356102b5565b60408051918252519081900360200190f35b34801561012057600080fd5b506101296102c7565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561015e57600080fd5b506101676102e3565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101a357818101518382015260200161018b565b505050509050019250505060405180910390f35b3480156101c357600080fd5b50610129610355565b3480156101d857600080fd5b5061012960ff60043516610371565b3480156101f357600080fd5b506101fc61039c565b6040805173ffffffffffffffffffffffffffffffffffffffff938416815291909216602082015281519081900390910190f35b34801561023b57600080fd5b506101026004356103bf565b34801561025357600080fd5b506101676103d1565b34801561026857600080fd5b506100d673ffffffffffffffffffffffffffffffffffffffff60043516610441565b73ffffffffffffffffffffffffffffffffffffffff1660009081526003602052604090205460ff1690565b60009081526008602052604090205490565b60025473ffffffffffffffffffffffffffffffffffffffff1690565b6060600060060180548060200260200160405190810160405280929190818152602001828054801561034b57602002820191906000526020600020905b815473ffffffffffffffffffffffffffffffffffffffff168152600190910190602001808311610320575b5050505050905090565b60015473ffffffffffffffffffffffffffffffffffffffff1690565b60ff1660009081526020819052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60015460025473ffffffffffffffffffffffffffffffffffffffff918216911682565b60009081526007602052604090205490565b6060600060040180548060200260200160405190810160405280929190818152602001828054801561034b5760200282019190600052602060002090815473ffffffffffffffffffffffffffffffffffffffff168152600190910190602001808311610320575050505050905090565b73ffffffffffffffffffffffffffffffffffffffff1660009081526005602052604090205460ff16905600a165627a7a723058208f7c393d36911536c3b4eb7b26e2f7ad62d4fadd60646cf048d4e9805a3efb450029",
  "deployedBytecode": "0x6080604052600436106100a35763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100a85780631e912bd6146100ea578063430bf08a14610114578063559ed339146101525780638ca4daf9146101b7578063a003e069146101cc578063c19d93fb146101e7578063f7213db61461022f578063fe5b38e414610247578063fef3ee731461025c575b600080fd5b3480156100b457600080fd5b506100d673ffffffffffffffffffffffffffffffffffffffff6004351661028a565b604080519115158252519081900360200190f35b3480156100f657600080fd5b506101026004356102b5565b60408051918252519081900360200190f35b34801561012057600080fd5b506101296102c7565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561015e57600080fd5b506101676102e3565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101a357818101518382015260200161018b565b505050509050019250505060405180910390f35b3480156101c357600080fd5b50610129610355565b3480156101d857600080fd5b5061012960ff60043516610371565b3480156101f357600080fd5b506101fc61039c565b6040805173ffffffffffffffffffffffffffffffffffffffff938416815291909216602082015281519081900390910190f35b34801561023b57600080fd5b506101026004356103bf565b34801561025357600080fd5b506101676103d1565b34801561026857600080fd5b506100d673ffffffffffffffffffffffffffffffffffffffff60043516610441565b73ffffffffffffffffffffffffffffffffffffffff1660009081526003602052604090205460ff1690565b60009081526008602052604090205490565b60025473ffffffffffffffffffffffffffffffffffffffff1690565b6060600060060180548060200260200160405190810160405280929190818152602001828054801561034b57602002820191906000526020600020905b815473ffffffffffffffffffffffffffffffffffffffff168152600190910190602001808311610320575b5050505050905090565b60015473ffffffffffffffffffffffffffffffffffffffff1690565b60ff1660009081526020819052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60015460025473ffffffffffffffffffffffffffffffffffffffff918216911682565b60009081526007602052604090205490565b6060600060040180548060200260200160405190810160405280929190818152602001828054801561034b5760200282019190600052602060002090815473ffffffffffffffffffffffffffffffffffffffff168152600190910190602001808311610320575050505050905090565b73ffffffffffffffffffffffffffffffffffffffff1660009081526005602052604090205460ff16905600a165627a7a723058208f7c393d36911536c3b4eb7b26e2f7ad62d4fadd60646cf048d4e9805a3efb450029",
  "sourceMap": "800:2276:23:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;800:2276:23;;;;;;;",
  "deployedSourceMap": "800:2276:23:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2228:150;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2228:150:23;;;;;;;;;;;;;;;;;;;;;;;;;2924;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2924:150:23;;;;;;;;;;;;;;;;;;;;;2099:123;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2099:123:23;;;;;;;;;;;;;;;;;;;;;;;2647:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2647:119:23;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;2647:119:23;;;;;;;;;;;;;;;;;1954:139;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1954:139:23;;;;1801:147;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1801:147:23;;;;;;;1724:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1724:18:23;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2772:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2772:146:23;;;;;2384:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2384:119:23;;;;2509:132;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2509:132:23;;;;;;;2228:150;2341:30;;2314:4;2341:30;;;:20;:30;;;;;;;;;2228:150::o;2924:::-;3010:4;3037:30;;;:18;:30;;;;;;;2924:150::o;2099:123::-;2197:18;;;;2099:123;:::o;2647:119::-;2712:9;2744:5;:15;;2737:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2647:119;:::o;1954:139::-;2060:26;;;;1954:139;:::o;1801:147::-;1913:28;;1883:7;1913:28;;;;;;;;;;;;;;1801:147::o;1724:18::-;;;;;;;;;;;;:::o;2772:146::-;2856:4;2883:28;;;:16;:28;;;;;;;2772:146::o;2384:119::-;2449:9;2481:5;:15;;2474:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2384:119;:::o;2509:132::-;2613:21;;2586:4;2613:21;;;:15;:21;;;;;;;;;2509:132::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\n/**\n * @title CoreState\n * @author Set Protocol\n *\n * The CoreState library maintains all state for the Core contract thus\n * allowing it to operate across multiple mixins.\n */\ncontract CoreState {\n\n    /* ============ Structs ============ */\n\n    struct State {\n        // Mapping of exchange enumeration to address\n        mapping(uint8 => address) exchanges;\n\n        // Address of the TransferProxy contract\n        address transferProxyAddress;\n\n        // Address of the Vault contract\n        address vaultAddress;\n\n        // Mapping of tracked SetToken factories\n        mapping(address => bool) validFactories;\n\n        // Array of tracked SetToken factories\n        address[] factories;\n\n        // Mapping of tracked SetTokens\n        mapping(address => bool) validSets;\n\n        // Array of tracked SetTokens\n        address[] setTokens;\n\n        // Mapping of filled Issuance Orders\n        mapping(bytes32 => uint) orderFills;\n\n        // Mapping of canceled Issuance Orders\n        mapping(bytes32 => uint) orderCancels;\n    }\n\n    /* ============ State Variables ============ */\n\n    State public state;\n\n    /* ============ Public Getters ============ */\n\n    function exchanges(uint8 _exchangeId)\n        public\n        view\n        returns(address)\n    {\n        return state.exchanges[_exchangeId];\n    }\n\n    function transferProxyAddress()\n        public\n        view\n        returns(address)\n    {\n        return state.transferProxyAddress;\n    }\n\n    function vaultAddress()\n        public\n        view\n        returns(address)\n    {\n        return state.vaultAddress;\n    }\n\n    function validFactories(address _factory)\n        public\n        view\n        returns(bool)\n    {\n        return state.validFactories[_factory];\n    }\n\n    function factories()\n        public\n        view\n        returns(address[])\n    {\n        return state.factories;\n    }\n\n    function validSets(address _set)\n        public\n        view\n        returns(bool)\n    {\n        return state.validSets[_set];\n    }\n\n    function setTokens()\n        public\n        view\n        returns(address[])\n    {\n        return state.setTokens;\n    }\n\n    function orderFills(bytes32 _orderHash)\n        public\n        view\n        returns(uint)\n    {\n        return state.orderFills[_orderHash];\n    }\n\n    function orderCancels(bytes32 _orderHash)\n        public\n        view\n        returns(uint)\n    {\n        return state.orderCancels[_orderHash];\n    }\n}\n",
  "sourcePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreState.sol",
  "ast": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreState.sol",
    "exportedSymbols": {
      "CoreState": [
        3593
      ]
    },
    "id": 3594,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3456,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:23"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title CoreState\n@author Set Protocol\n * The CoreState library maintains all state for the Core contract thus\nallowing it to operate across multiple mixins.",
        "fullyImplemented": true,
        "id": 3593,
        "linearizedBaseContracts": [
          3593
        ],
        "name": "CoreState",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "CoreState.State",
            "id": 3487,
            "members": [
              {
                "constant": false,
                "id": 3460,
                "name": "exchanges",
                "nodeType": "VariableDeclaration",
                "scope": 3487,
                "src": "948:35:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                  "typeString": "mapping(uint8 => address)"
                },
                "typeName": {
                  "id": 3459,
                  "keyType": {
                    "id": 3457,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "956:5:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "948:25:23",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                    "typeString": "mapping(uint8 => address)"
                  },
                  "valueType": {
                    "id": 3458,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "965:7:23",
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
                "id": 3462,
                "name": "transferProxyAddress",
                "nodeType": "VariableDeclaration",
                "scope": 3487,
                "src": "1043:28:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3461,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1043:7:23",
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
                "id": 3464,
                "name": "vaultAddress",
                "nodeType": "VariableDeclaration",
                "scope": 3487,
                "src": "1123:20:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3463,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1123:7:23",
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
                "id": 3468,
                "name": "validFactories",
                "nodeType": "VariableDeclaration",
                "scope": 3487,
                "src": "1203:39:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 3467,
                  "keyType": {
                    "id": 3465,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1211:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1203:24:23",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 3466,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1222:4:23",
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
                "id": 3471,
                "name": "factories",
                "nodeType": "VariableDeclaration",
                "scope": 3487,
                "src": "1300:19:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 3469,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1300:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 3470,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "1300:9:23",
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
                "id": 3475,
                "name": "validSets",
                "nodeType": "VariableDeclaration",
                "scope": 3487,
                "src": "1370:34:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 3474,
                  "keyType": {
                    "id": 3472,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1378:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1370:24:23",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 3473,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1389:4:23",
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
                "id": 3478,
                "name": "setTokens",
                "nodeType": "VariableDeclaration",
                "scope": 3487,
                "src": "1453:19:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 3476,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1453:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 3477,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "1453:9:23",
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
                "id": 3482,
                "name": "orderFills",
                "nodeType": "VariableDeclaration",
                "scope": 3487,
                "src": "1528:35:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 3481,
                  "keyType": {
                    "id": 3479,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1536:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1528:24:23",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 3480,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1547:4:23",
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
                "id": 3486,
                "name": "orderCancels",
                "nodeType": "VariableDeclaration",
                "scope": 3487,
                "src": "1621:37:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 3485,
                  "keyType": {
                    "id": 3483,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1629:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1621:24:23",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 3484,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1640:4:23",
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
            "scope": 3593,
            "src": "871:794:23",
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 3489,
            "name": "state",
            "nodeType": "VariableDeclaration",
            "scope": 3593,
            "src": "1724:18:23",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_struct$_State_$3487_storage",
              "typeString": "struct CoreState.State"
            },
            "typeName": {
              "contractScope": null,
              "id": 3488,
              "name": "State",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3487,
              "src": "1724:5:23",
              "typeDescriptions": {
                "typeIdentifier": "t_struct$_State_$3487_storage_ptr",
                "typeString": "struct CoreState.State"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3501,
              "nodeType": "Block",
              "src": "1896:52:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3496,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3489,
                        "src": "1913:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3487_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3497,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "exchanges",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3460,
                      "src": "1913:15:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                        "typeString": "mapping(uint8 => address)"
                      }
                    },
                    "id": 3499,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3498,
                      "name": "_exchangeId",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3491,
                      "src": "1929:11:23",
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
                    "src": "1913:28:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 3495,
                  "id": 3500,
                  "nodeType": "Return",
                  "src": "1906:35:23"
                }
              ]
            },
            "documentation": null,
            "id": 3502,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "exchanges",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3492,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3491,
                  "name": "_exchangeId",
                  "nodeType": "VariableDeclaration",
                  "scope": 3502,
                  "src": "1820:17:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 3490,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "1820:5:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1819:19:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3495,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3494,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3502,
                  "src": "1883:7:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3493,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1883:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1882:9:23"
            },
            "scope": 3593,
            "src": "1801:147:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3510,
              "nodeType": "Block",
              "src": "2043:50:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3507,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3489,
                      "src": "2060:5:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3487_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3508,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "transferProxyAddress",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3462,
                    "src": "2060:26:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 3506,
                  "id": 3509,
                  "nodeType": "Return",
                  "src": "2053:33:23"
                }
              ]
            },
            "documentation": null,
            "id": 3511,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "transferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3503,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1983:2:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3506,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3505,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3511,
                  "src": "2030:7:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3504,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2030:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2029:9:23"
            },
            "scope": 3593,
            "src": "1954:139:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3519,
              "nodeType": "Block",
              "src": "2180:42:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3516,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3489,
                      "src": "2197:5:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3487_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3517,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "vaultAddress",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3464,
                    "src": "2197:18:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 3515,
                  "id": 3518,
                  "nodeType": "Return",
                  "src": "2190:25:23"
                }
              ]
            },
            "documentation": null,
            "id": 3520,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "vaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3512,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2120:2:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3515,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3514,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3520,
                  "src": "2167:7:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3513,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2167:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2166:9:23"
            },
            "scope": 3593,
            "src": "2099:123:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3532,
              "nodeType": "Block",
              "src": "2324:54:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3527,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3489,
                        "src": "2341:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3487_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3528,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validFactories",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3468,
                      "src": "2341:20:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 3530,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3529,
                      "name": "_factory",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3522,
                      "src": "2362:8:23",
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
                    "src": "2341:30:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 3526,
                  "id": 3531,
                  "nodeType": "Return",
                  "src": "2334:37:23"
                }
              ]
            },
            "documentation": null,
            "id": 3533,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validFactories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3523,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3522,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3533,
                  "src": "2252:16:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3521,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2252:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2251:18:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3526,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3525,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3533,
                  "src": "2314:4:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3524,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "2314:4:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2313:6:23"
            },
            "scope": 3593,
            "src": "2228:150:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3542,
              "nodeType": "Block",
              "src": "2464:39:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3539,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3489,
                      "src": "2481:5:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3487_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3540,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "factories",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3471,
                    "src": "2481:15:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 3538,
                  "id": 3541,
                  "nodeType": "Return",
                  "src": "2474:22:23"
                }
              ]
            },
            "documentation": null,
            "id": 3543,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "factories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3534,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2402:2:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3538,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3537,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3543,
                  "src": "2449:9:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3535,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2449:7:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3536,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2449:9:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2448:11:23"
            },
            "scope": 3593,
            "src": "2384:119:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3555,
              "nodeType": "Block",
              "src": "2596:45:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3550,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3489,
                        "src": "2613:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3487_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3551,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validSets",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3475,
                      "src": "2613:15:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 3553,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3552,
                      "name": "_set",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3545,
                      "src": "2629:4:23",
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
                    "src": "2613:21:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 3549,
                  "id": 3554,
                  "nodeType": "Return",
                  "src": "2606:28:23"
                }
              ]
            },
            "documentation": null,
            "id": 3556,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validSets",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3546,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3545,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3556,
                  "src": "2528:12:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3544,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2528:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2527:14:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3549,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3548,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3556,
                  "src": "2586:4:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3547,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "2586:4:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2585:6:23"
            },
            "scope": 3593,
            "src": "2509:132:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3565,
              "nodeType": "Block",
              "src": "2727:39:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3562,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3489,
                      "src": "2744:5:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3487_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3563,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "setTokens",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3478,
                    "src": "2744:15:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 3561,
                  "id": 3564,
                  "nodeType": "Return",
                  "src": "2737:22:23"
                }
              ]
            },
            "documentation": null,
            "id": 3566,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "setTokens",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3557,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2665:2:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3561,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3560,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3566,
                  "src": "2712:9:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3558,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2712:7:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3559,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2712:9:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2711:11:23"
            },
            "scope": 3593,
            "src": "2647:119:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3578,
              "nodeType": "Block",
              "src": "2866:52:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3573,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3489,
                        "src": "2883:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3487_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3574,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderFills",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3482,
                      "src": "2883:16:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 3576,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3575,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3568,
                      "src": "2900:10:23",
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
                    "src": "2883:28:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3572,
                  "id": 3577,
                  "nodeType": "Return",
                  "src": "2876:35:23"
                }
              ]
            },
            "documentation": null,
            "id": 3579,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderFills",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3569,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3568,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 3579,
                  "src": "2792:18:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3567,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2792:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2791:20:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3572,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3571,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3579,
                  "src": "2856:4:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3570,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2856:4:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2855:6:23"
            },
            "scope": 3593,
            "src": "2772:146:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3591,
              "nodeType": "Block",
              "src": "3020:54:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3586,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3489,
                        "src": "3037:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3487_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3587,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderCancels",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3486,
                      "src": "3037:18:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 3589,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3588,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3581,
                      "src": "3056:10:23",
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
                    "src": "3037:30:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3585,
                  "id": 3590,
                  "nodeType": "Return",
                  "src": "3030:37:23"
                }
              ]
            },
            "documentation": null,
            "id": 3592,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderCancels",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3582,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3581,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 3592,
                  "src": "2946:18:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3580,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2946:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2945:20:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3585,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3584,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3592,
                  "src": "3010:4:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3583,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "3010:4:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3009:6:23"
            },
            "scope": 3593,
            "src": "2924:150:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 3594,
        "src": "800:2276:23"
      }
    ],
    "src": "597:2480:23"
  },
  "legacyAST": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreState.sol",
    "exportedSymbols": {
      "CoreState": [
        3593
      ]
    },
    "id": 3594,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3456,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:23"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title CoreState\n@author Set Protocol\n * The CoreState library maintains all state for the Core contract thus\nallowing it to operate across multiple mixins.",
        "fullyImplemented": true,
        "id": 3593,
        "linearizedBaseContracts": [
          3593
        ],
        "name": "CoreState",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "CoreState.State",
            "id": 3487,
            "members": [
              {
                "constant": false,
                "id": 3460,
                "name": "exchanges",
                "nodeType": "VariableDeclaration",
                "scope": 3487,
                "src": "948:35:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                  "typeString": "mapping(uint8 => address)"
                },
                "typeName": {
                  "id": 3459,
                  "keyType": {
                    "id": 3457,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "956:5:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "948:25:23",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                    "typeString": "mapping(uint8 => address)"
                  },
                  "valueType": {
                    "id": 3458,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "965:7:23",
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
                "id": 3462,
                "name": "transferProxyAddress",
                "nodeType": "VariableDeclaration",
                "scope": 3487,
                "src": "1043:28:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3461,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1043:7:23",
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
                "id": 3464,
                "name": "vaultAddress",
                "nodeType": "VariableDeclaration",
                "scope": 3487,
                "src": "1123:20:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3463,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1123:7:23",
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
                "id": 3468,
                "name": "validFactories",
                "nodeType": "VariableDeclaration",
                "scope": 3487,
                "src": "1203:39:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 3467,
                  "keyType": {
                    "id": 3465,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1211:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1203:24:23",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 3466,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1222:4:23",
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
                "id": 3471,
                "name": "factories",
                "nodeType": "VariableDeclaration",
                "scope": 3487,
                "src": "1300:19:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 3469,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1300:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 3470,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "1300:9:23",
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
                "id": 3475,
                "name": "validSets",
                "nodeType": "VariableDeclaration",
                "scope": 3487,
                "src": "1370:34:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 3474,
                  "keyType": {
                    "id": 3472,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1378:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1370:24:23",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 3473,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1389:4:23",
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
                "id": 3478,
                "name": "setTokens",
                "nodeType": "VariableDeclaration",
                "scope": 3487,
                "src": "1453:19:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 3476,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1453:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 3477,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "1453:9:23",
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
                "id": 3482,
                "name": "orderFills",
                "nodeType": "VariableDeclaration",
                "scope": 3487,
                "src": "1528:35:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 3481,
                  "keyType": {
                    "id": 3479,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1536:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1528:24:23",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 3480,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1547:4:23",
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
                "id": 3486,
                "name": "orderCancels",
                "nodeType": "VariableDeclaration",
                "scope": 3487,
                "src": "1621:37:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 3485,
                  "keyType": {
                    "id": 3483,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1629:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1621:24:23",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 3484,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1640:4:23",
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
            "scope": 3593,
            "src": "871:794:23",
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 3489,
            "name": "state",
            "nodeType": "VariableDeclaration",
            "scope": 3593,
            "src": "1724:18:23",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_struct$_State_$3487_storage",
              "typeString": "struct CoreState.State"
            },
            "typeName": {
              "contractScope": null,
              "id": 3488,
              "name": "State",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3487,
              "src": "1724:5:23",
              "typeDescriptions": {
                "typeIdentifier": "t_struct$_State_$3487_storage_ptr",
                "typeString": "struct CoreState.State"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3501,
              "nodeType": "Block",
              "src": "1896:52:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3496,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3489,
                        "src": "1913:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3487_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3497,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "exchanges",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3460,
                      "src": "1913:15:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                        "typeString": "mapping(uint8 => address)"
                      }
                    },
                    "id": 3499,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3498,
                      "name": "_exchangeId",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3491,
                      "src": "1929:11:23",
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
                    "src": "1913:28:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 3495,
                  "id": 3500,
                  "nodeType": "Return",
                  "src": "1906:35:23"
                }
              ]
            },
            "documentation": null,
            "id": 3502,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "exchanges",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3492,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3491,
                  "name": "_exchangeId",
                  "nodeType": "VariableDeclaration",
                  "scope": 3502,
                  "src": "1820:17:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 3490,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "1820:5:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1819:19:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3495,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3494,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3502,
                  "src": "1883:7:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3493,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1883:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1882:9:23"
            },
            "scope": 3593,
            "src": "1801:147:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3510,
              "nodeType": "Block",
              "src": "2043:50:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3507,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3489,
                      "src": "2060:5:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3487_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3508,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "transferProxyAddress",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3462,
                    "src": "2060:26:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 3506,
                  "id": 3509,
                  "nodeType": "Return",
                  "src": "2053:33:23"
                }
              ]
            },
            "documentation": null,
            "id": 3511,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "transferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3503,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1983:2:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3506,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3505,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3511,
                  "src": "2030:7:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3504,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2030:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2029:9:23"
            },
            "scope": 3593,
            "src": "1954:139:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3519,
              "nodeType": "Block",
              "src": "2180:42:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3516,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3489,
                      "src": "2197:5:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3487_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3517,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "vaultAddress",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3464,
                    "src": "2197:18:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 3515,
                  "id": 3518,
                  "nodeType": "Return",
                  "src": "2190:25:23"
                }
              ]
            },
            "documentation": null,
            "id": 3520,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "vaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3512,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2120:2:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3515,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3514,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3520,
                  "src": "2167:7:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3513,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2167:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2166:9:23"
            },
            "scope": 3593,
            "src": "2099:123:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3532,
              "nodeType": "Block",
              "src": "2324:54:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3527,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3489,
                        "src": "2341:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3487_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3528,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validFactories",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3468,
                      "src": "2341:20:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 3530,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3529,
                      "name": "_factory",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3522,
                      "src": "2362:8:23",
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
                    "src": "2341:30:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 3526,
                  "id": 3531,
                  "nodeType": "Return",
                  "src": "2334:37:23"
                }
              ]
            },
            "documentation": null,
            "id": 3533,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validFactories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3523,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3522,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3533,
                  "src": "2252:16:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3521,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2252:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2251:18:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3526,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3525,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3533,
                  "src": "2314:4:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3524,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "2314:4:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2313:6:23"
            },
            "scope": 3593,
            "src": "2228:150:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3542,
              "nodeType": "Block",
              "src": "2464:39:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3539,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3489,
                      "src": "2481:5:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3487_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3540,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "factories",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3471,
                    "src": "2481:15:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 3538,
                  "id": 3541,
                  "nodeType": "Return",
                  "src": "2474:22:23"
                }
              ]
            },
            "documentation": null,
            "id": 3543,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "factories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3534,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2402:2:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3538,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3537,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3543,
                  "src": "2449:9:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3535,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2449:7:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3536,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2449:9:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2448:11:23"
            },
            "scope": 3593,
            "src": "2384:119:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3555,
              "nodeType": "Block",
              "src": "2596:45:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3550,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3489,
                        "src": "2613:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3487_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3551,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validSets",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3475,
                      "src": "2613:15:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 3553,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3552,
                      "name": "_set",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3545,
                      "src": "2629:4:23",
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
                    "src": "2613:21:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 3549,
                  "id": 3554,
                  "nodeType": "Return",
                  "src": "2606:28:23"
                }
              ]
            },
            "documentation": null,
            "id": 3556,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validSets",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3546,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3545,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3556,
                  "src": "2528:12:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3544,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2528:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2527:14:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3549,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3548,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3556,
                  "src": "2586:4:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3547,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "2586:4:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2585:6:23"
            },
            "scope": 3593,
            "src": "2509:132:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3565,
              "nodeType": "Block",
              "src": "2727:39:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3562,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3489,
                      "src": "2744:5:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3487_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3563,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "setTokens",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3478,
                    "src": "2744:15:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 3561,
                  "id": 3564,
                  "nodeType": "Return",
                  "src": "2737:22:23"
                }
              ]
            },
            "documentation": null,
            "id": 3566,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "setTokens",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3557,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2665:2:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3561,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3560,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3566,
                  "src": "2712:9:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3558,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2712:7:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3559,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2712:9:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2711:11:23"
            },
            "scope": 3593,
            "src": "2647:119:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3578,
              "nodeType": "Block",
              "src": "2866:52:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3573,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3489,
                        "src": "2883:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3487_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3574,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderFills",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3482,
                      "src": "2883:16:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 3576,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3575,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3568,
                      "src": "2900:10:23",
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
                    "src": "2883:28:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3572,
                  "id": 3577,
                  "nodeType": "Return",
                  "src": "2876:35:23"
                }
              ]
            },
            "documentation": null,
            "id": 3579,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderFills",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3569,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3568,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 3579,
                  "src": "2792:18:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3567,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2792:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2791:20:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3572,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3571,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3579,
                  "src": "2856:4:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3570,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2856:4:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2855:6:23"
            },
            "scope": 3593,
            "src": "2772:146:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3591,
              "nodeType": "Block",
              "src": "3020:54:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3586,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3489,
                        "src": "3037:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3487_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3587,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderCancels",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3486,
                      "src": "3037:18:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 3589,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3588,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3581,
                      "src": "3056:10:23",
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
                    "src": "3037:30:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3585,
                  "id": 3590,
                  "nodeType": "Return",
                  "src": "3030:37:23"
                }
              ]
            },
            "documentation": null,
            "id": 3592,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderCancels",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3582,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3581,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 3592,
                  "src": "2946:18:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3580,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2946:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2945:20:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3585,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3584,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3592,
                  "src": "3010:4:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3583,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "3010:4:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3009:6:23"
            },
            "scope": 3593,
            "src": "2924:150:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 3594,
        "src": "800:2276:23"
      }
    ],
    "src": "597:2480:23"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-13T21:55:38.412Z"
}