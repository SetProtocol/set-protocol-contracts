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
          "name": "transferProxy",
          "type": "address"
        },
        {
          "name": "vault",
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
      "name": "transferProxy",
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
      "name": "vault",
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
  "bytecode": "0x608060405234801561001057600080fd5b506103fc806100206000396000f3006080604052600436106100a35763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100a85780631e912bd6146100dd578063559ed339146101075780636e667db31461016c578063a003e0691461019d578063c19d93fb146101b8578063f7213db6146101f3578063fbfa77cf1461020b578063fe5b38e414610220578063fef3ee7314610235575b600080fd5b3480156100b457600080fd5b506100c9600160a060020a0360043516610256565b604080519115158252519081900360200190f35b3480156100e957600080fd5b506100f5600435610274565b60408051918252519081900360200190f35b34801561011357600080fd5b5061011c610286565b60408051602080825283518183015283519192839290830191858101910280838360005b83811015610158578181015183820152602001610140565b505050509050019250505060405180910390f35b34801561017857600080fd5b506101816102eb565b60408051600160a060020a039092168252519081900360200190f35b3480156101a957600080fd5b5061018160ff600435166102fa565b3480156101c457600080fd5b506101cd610318565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b3480156101ff57600080fd5b506100f560043561032e565b34801561021757600080fd5b50610181610340565b34801561022c57600080fd5b5061011c61034f565b34801561024157600080fd5b506100c9600160a060020a03600435166103b2565b600160a060020a031660009081526003602052604090205460ff1690565b60009081526008602052604090205490565b606060006006018054806020026020016040519081016040528092919081815260200182805480156102e157602002820191906000526020600020905b8154600160a060020a031681526001909101906020018083116102c3575b5050505050905090565b600154600160a060020a031690565b60ff16600090815260208190526040902054600160a060020a031690565b600154600254600160a060020a03918216911682565b60009081526007602052604090205490565b600254600160a060020a031690565b606060006004018054806020026020016040519081016040528092919081815260200182805480156102e157602002820191906000526020600020908154600160a060020a031681526001909101906020018083116102c3575050505050905090565b600160a060020a031660009081526005602052604090205460ff16905600a165627a7a723058204dea4bba7b414ac0ce89959a55156bb5d3acb6fa84379df69d3a1495648f16350029",
  "deployedBytecode": "0x6080604052600436106100a35763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100a85780631e912bd6146100dd578063559ed339146101075780636e667db31461016c578063a003e0691461019d578063c19d93fb146101b8578063f7213db6146101f3578063fbfa77cf1461020b578063fe5b38e414610220578063fef3ee7314610235575b600080fd5b3480156100b457600080fd5b506100c9600160a060020a0360043516610256565b604080519115158252519081900360200190f35b3480156100e957600080fd5b506100f5600435610274565b60408051918252519081900360200190f35b34801561011357600080fd5b5061011c610286565b60408051602080825283518183015283519192839290830191858101910280838360005b83811015610158578181015183820152602001610140565b505050509050019250505060405180910390f35b34801561017857600080fd5b506101816102eb565b60408051600160a060020a039092168252519081900360200190f35b3480156101a957600080fd5b5061018160ff600435166102fa565b3480156101c457600080fd5b506101cd610318565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b3480156101ff57600080fd5b506100f560043561032e565b34801561021757600080fd5b50610181610340565b34801561022c57600080fd5b5061011c61034f565b34801561024157600080fd5b506100c9600160a060020a03600435166103b2565b600160a060020a031660009081526003602052604090205460ff1690565b60009081526008602052604090205490565b606060006006018054806020026020016040519081016040528092919081815260200182805480156102e157602002820191906000526020600020905b8154600160a060020a031681526001909101906020018083116102c3575b5050505050905090565b600154600160a060020a031690565b60ff16600090815260208190526040902054600160a060020a031690565b600154600254600160a060020a03918216911682565b60009081526007602052604090205490565b600254600160a060020a031690565b606060006004018054806020026020016040519081016040528092919081815260200182805480156102e157602002820191906000526020600020908154600160a060020a031681526001909101906020018083116102c3575050505050905090565b600160a060020a031660009081526005602052604090205460ff16905600a165627a7a723058204dea4bba7b414ac0ce89959a55156bb5d3acb6fa84379df69d3a1495648f16350029",
  "sourceMap": "800:3742:16:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;800:3742:16;;;;;;;",
  "deployedSourceMap": "800:3742:16:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2803:164;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2803:164:16;-1:-1:-1;;;;;2803:164:16;;;;;;;;;;;;;;;;;;;;;;;4376;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4376:164:16;;;;;;;;;;;;;;;;;;;;;3685:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3685:119:16;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;3685:119:16;;;;;;;;;;;;;;;;;2263:125;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2263:125:16;;;;;;;;-1:-1:-1;;;;;2263:125:16;;;;;;;;;;;;;;1985:161;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1985:161:16;;;;;;;1710:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1710:18:16;;;;;;;;-1:-1:-1;;;;;1710:18:16;;;;;;;;;;;;;;;;;;;;;;;;4008:160;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4008:160:16;;;;;2489:109;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2489:109:16;;;;3099:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3099:119:16;;;;3409:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3409:146:16;-1:-1:-1;;;;;3409:146:16;;;;;2803:164;-1:-1:-1;;;;;2930:30:16;2903:4;2930:30;;;:20;:30;;;;;;;;;2803:164::o;4376:::-;4476:4;4503:30;;;:18;:30;;;;;;;4376:164::o;3685:119::-;3750:9;3782:5;:15;;3775:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3775:22:16;;;;;;;;;;;;;;;;;;;;;;;3685:119;:::o;2263:125::-;2362:19;;-1:-1:-1;;;;;2362:19:16;2263:125;:::o;1985:161::-;2111:28;;2081:7;2111:28;;;;;;;;;;;-1:-1:-1;;;;;2111:28:16;;1985:161::o;1710:18::-;;;;;-1:-1:-1;;;;;1710:18:16;;;;;;:::o;4008:160::-;4106:4;4133:28;;;:16;:28;;;;;;;4008:160::o;2489:109::-;2580:11;;-1:-1:-1;;;;;2580:11:16;2489:109;:::o;3099:119::-;3164:9;3196:5;:15;;3189:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3189:22:16;;;;;;;;;;;;;;;;;;;;;;3099:119;:::o;3409:146::-;-1:-1:-1;;;;;3527:21:16;3500:4;3527:21;;;:15;:21;;;;;;;;;3409:146::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\n/**\n * @title CoreState\n * @author Set Protocol\n *\n * The CoreState library maintains all state for the Core contract thus\n * allowing it to operate across multiple mixins.\n */\ncontract CoreState {\n\n    /* ============ Structs ============ */\n\n    struct State {\n        // Mapping of exchange enumeration to address\n        mapping(uint8 => address) exchanges;\n\n        // Address of the TransferProxy contract\n        address transferProxy;\n\n        // Address of the Vault contract\n        address vault;\n\n        // Mapping of tracked SetToken factories\n        mapping(address => bool) validFactories;\n\n        // Array of tracked SetToken factories\n        address[] factories;\n\n        // Mapping of tracked SetTokens\n        mapping(address => bool) validSets;\n\n        // Array of tracked SetTokens\n        address[] setTokens;\n\n        // Mapping of filled Issuance Orders\n        mapping(bytes32 => uint) orderFills;\n\n        // Mapping of canceled Issuance Orders\n        mapping(bytes32 => uint) orderCancels;\n    }\n\n    /* ============ State Variables ============ */\n\n    State public state;\n\n    /* ============ Public Getters ============ */\n\n    /**\n     * Return address belonging to given exchangeId.\n     *\n     * @param  _exchangeId       ExchangeId number\n     * @return address           Address belonging to given exchangeId\n     */\n    function exchanges(\n        uint8 _exchangeId\n    )\n        public\n        view\n        returns(address)\n    {\n        return state.exchanges[_exchangeId];\n    }\n\n    /**\n     * Return transferProxy address.\n     *\n     * @return address       transferProxy address\n     */\n    function transferProxy()\n        public\n        view\n        returns(address)\n    {\n        return state.transferProxy;\n    }\n\n    /**\n     * Return vault address\n     *\n     * @return address        vault address\n     */\n    function vault()\n        public\n        view\n        returns(address)\n    {\n        return state.vault;\n    }\n\n    /**\n     * Return boolean indicating if address is valid factory.\n     *\n     * @param  _factory       Factory address\n     * @return bool           Boolean indicating if enabled factory\n     */\n    function validFactories(\n        address _factory\n    )\n        public\n        view\n        returns(bool)\n    {\n        return state.validFactories[_factory];\n    }\n\n    /**\n     * Return array of all enabled factories.\n     *\n     * @return address[]      Array of enabled factories\n     */\n    function factories()\n        public\n        view\n        returns(address[])\n    {\n        return state.factories;\n    }\n\n    /**\n     * Return boolean indicating if address is valid Set.\n     *\n     * @param  _set           Set address\n     * @return bool           Boolean indicating if valid Set\n     */\n    function validSets(\n        address _set\n    )\n        public\n        view\n        returns(bool)\n    {\n        return state.validSets[_set];\n    }\n\n    /**\n     * Return array of all valid Set Tokens.\n     *\n     * @return address[]      Array of valid Set Tokens\n     */\n    function setTokens()\n        public\n        view\n        returns(address[])\n    {\n        return state.setTokens;\n    }\n\n    /**\n     * Return amount of Issuance Order already filled\n     *\n     * @param  _orderHash       Issuance Order orderHash\n     * @return uint             Amount of Issuance Order filled\n     */\n    function orderFills(\n        bytes32 _orderHash\n    )\n        public\n        view\n        returns(uint)\n    {\n        return state.orderFills[_orderHash];\n    }\n\n    /**\n     * Return amount of Issuance Order already canceled\n     *\n     * @param  _orderHash       Issuance Order orderHash\n     * @return uint             Amount of Issuance Order canceled\n     */\n    function orderCancels(\n        bytes32 _orderHash\n    )\n        public\n        view\n        returns(uint)\n    {\n        return state.orderCancels[_orderHash];\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
    "exportedSymbols": {
      "CoreState": [
        2746
      ]
    },
    "id": 2747,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2609,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:16"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title CoreState\n@author Set Protocol\n * The CoreState library maintains all state for the Core contract thus\nallowing it to operate across multiple mixins.",
        "fullyImplemented": true,
        "id": 2746,
        "linearizedBaseContracts": [
          2746
        ],
        "name": "CoreState",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "CoreState.State",
            "id": 2640,
            "members": [
              {
                "constant": false,
                "id": 2613,
                "name": "exchanges",
                "nodeType": "VariableDeclaration",
                "scope": 2640,
                "src": "948:35:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                  "typeString": "mapping(uint8 => address)"
                },
                "typeName": {
                  "id": 2612,
                  "keyType": {
                    "id": 2610,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "956:5:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "948:25:16",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                    "typeString": "mapping(uint8 => address)"
                  },
                  "valueType": {
                    "id": 2611,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "965:7:16",
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
                "id": 2615,
                "name": "transferProxy",
                "nodeType": "VariableDeclaration",
                "scope": 2640,
                "src": "1043:21:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2614,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1043:7:16",
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
                "id": 2617,
                "name": "vault",
                "nodeType": "VariableDeclaration",
                "scope": 2640,
                "src": "1116:13:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2616,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1116:7:16",
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
                "id": 2621,
                "name": "validFactories",
                "nodeType": "VariableDeclaration",
                "scope": 2640,
                "src": "1189:39:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 2620,
                  "keyType": {
                    "id": 2618,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1197:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1189:24:16",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 2619,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1208:4:16",
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
                "id": 2624,
                "name": "factories",
                "nodeType": "VariableDeclaration",
                "scope": 2640,
                "src": "1286:19:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 2622,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1286:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 2623,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "1286:9:16",
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
                "id": 2628,
                "name": "validSets",
                "nodeType": "VariableDeclaration",
                "scope": 2640,
                "src": "1356:34:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 2627,
                  "keyType": {
                    "id": 2625,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1364:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1356:24:16",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 2626,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1375:4:16",
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
                "id": 2631,
                "name": "setTokens",
                "nodeType": "VariableDeclaration",
                "scope": 2640,
                "src": "1439:19:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 2629,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1439:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 2630,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "1439:9:16",
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
                "id": 2635,
                "name": "orderFills",
                "nodeType": "VariableDeclaration",
                "scope": 2640,
                "src": "1514:35:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 2634,
                  "keyType": {
                    "id": 2632,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1522:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1514:24:16",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 2633,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1533:4:16",
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
                "id": 2639,
                "name": "orderCancels",
                "nodeType": "VariableDeclaration",
                "scope": 2640,
                "src": "1607:37:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 2638,
                  "keyType": {
                    "id": 2636,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1615:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1607:24:16",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 2637,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1626:4:16",
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
            "scope": 2746,
            "src": "871:780:16",
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 2642,
            "name": "state",
            "nodeType": "VariableDeclaration",
            "scope": 2746,
            "src": "1710:18:16",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_struct$_State_$2640_storage",
              "typeString": "struct CoreState.State"
            },
            "typeName": {
              "contractScope": null,
              "id": 2641,
              "name": "State",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2640,
              "src": "1710:5:16",
              "typeDescriptions": {
                "typeIdentifier": "t_struct$_State_$2640_storage_ptr",
                "typeString": "struct CoreState.State"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2654,
              "nodeType": "Block",
              "src": "2094:52:16",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2649,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2642,
                        "src": "2111:5:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2640_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2650,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "exchanges",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2613,
                      "src": "2111:15:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                        "typeString": "mapping(uint8 => address)"
                      }
                    },
                    "id": 2652,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2651,
                      "name": "_exchangeId",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2644,
                      "src": "2127:11:16",
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
                    "src": "2111:28:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 2648,
                  "id": 2653,
                  "nodeType": "Return",
                  "src": "2104:35:16"
                }
              ]
            },
            "documentation": "Return address belonging to given exchangeId.\n     * @param  _exchangeId       ExchangeId number\n@return address           Address belonging to given exchangeId",
            "id": 2655,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "exchanges",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2645,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2644,
                  "name": "_exchangeId",
                  "nodeType": "VariableDeclaration",
                  "scope": 2655,
                  "src": "2013:17:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 2643,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "2013:5:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2003:33:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2648,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2647,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2655,
                  "src": "2081:7:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2646,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2081:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2080:9:16"
            },
            "scope": 2746,
            "src": "1985:161:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2663,
              "nodeType": "Block",
              "src": "2345:43:16",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 2660,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2642,
                      "src": "2362:5:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$2640_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 2661,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "transferProxy",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 2615,
                    "src": "2362:19:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 2659,
                  "id": 2662,
                  "nodeType": "Return",
                  "src": "2355:26:16"
                }
              ]
            },
            "documentation": "Return transferProxy address.\n     * @return address       transferProxy address",
            "id": 2664,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "transferProxy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2656,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2285:2:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2659,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2658,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2664,
                  "src": "2332:7:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2657,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2332:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2331:9:16"
            },
            "scope": 2746,
            "src": "2263:125:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2672,
              "nodeType": "Block",
              "src": "2563:35:16",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 2669,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2642,
                      "src": "2580:5:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$2640_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 2670,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "vault",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 2617,
                    "src": "2580:11:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 2668,
                  "id": 2671,
                  "nodeType": "Return",
                  "src": "2573:18:16"
                }
              ]
            },
            "documentation": "Return vault address\n     * @return address        vault address",
            "id": 2673,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "vault",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2665,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2503:2:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2668,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2667,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2673,
                  "src": "2550:7:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2666,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2550:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2549:9:16"
            },
            "scope": 2746,
            "src": "2489:109:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2685,
              "nodeType": "Block",
              "src": "2913:54:16",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2680,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2642,
                        "src": "2930:5:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2640_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2681,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validFactories",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2621,
                      "src": "2930:20:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 2683,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2682,
                      "name": "_factory",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2675,
                      "src": "2951:8:16",
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
                    "src": "2930:30:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 2679,
                  "id": 2684,
                  "nodeType": "Return",
                  "src": "2923:37:16"
                }
              ]
            },
            "documentation": "Return boolean indicating if address is valid factory.\n     * @param  _factory       Factory address\n@return bool           Boolean indicating if enabled factory",
            "id": 2686,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validFactories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2676,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2675,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 2686,
                  "src": "2836:16:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2674,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2836:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2826:32:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2679,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2678,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2686,
                  "src": "2903:4:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 2677,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "2903:4:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2902:6:16"
            },
            "scope": 2746,
            "src": "2803:164:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2695,
              "nodeType": "Block",
              "src": "3179:39:16",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 2692,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2642,
                      "src": "3196:5:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$2640_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 2693,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "factories",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 2624,
                    "src": "3196:15:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 2691,
                  "id": 2694,
                  "nodeType": "Return",
                  "src": "3189:22:16"
                }
              ]
            },
            "documentation": "Return array of all enabled factories.\n     * @return address[]      Array of enabled factories",
            "id": 2696,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "factories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2687,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3117:2:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2691,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2690,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2696,
                  "src": "3164:9:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2688,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3164:7:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2689,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3164:9:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3163:11:16"
            },
            "scope": 2746,
            "src": "3099:119:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2708,
              "nodeType": "Block",
              "src": "3510:45:16",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2703,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2642,
                        "src": "3527:5:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2640_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2704,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validSets",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2628,
                      "src": "3527:15:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 2706,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2705,
                      "name": "_set",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2698,
                      "src": "3543:4:16",
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
                    "src": "3527:21:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 2702,
                  "id": 2707,
                  "nodeType": "Return",
                  "src": "3520:28:16"
                }
              ]
            },
            "documentation": "Return boolean indicating if address is valid Set.\n     * @param  _set           Set address\n@return bool           Boolean indicating if valid Set",
            "id": 2709,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validSets",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2699,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2698,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 2709,
                  "src": "3437:12:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2697,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3437:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3427:28:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2702,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2701,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2709,
                  "src": "3500:4:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 2700,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "3500:4:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3499:6:16"
            },
            "scope": 2746,
            "src": "3409:146:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2718,
              "nodeType": "Block",
              "src": "3765:39:16",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 2715,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2642,
                      "src": "3782:5:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$2640_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 2716,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "setTokens",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 2631,
                    "src": "3782:15:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 2714,
                  "id": 2717,
                  "nodeType": "Return",
                  "src": "3775:22:16"
                }
              ]
            },
            "documentation": "Return array of all valid Set Tokens.\n     * @return address[]      Array of valid Set Tokens",
            "id": 2719,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "setTokens",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2710,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3703:2:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2714,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2713,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2719,
                  "src": "3750:9:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2711,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3750:7:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2712,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3750:9:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3749:11:16"
            },
            "scope": 2746,
            "src": "3685:119:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2731,
              "nodeType": "Block",
              "src": "4116:52:16",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2726,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2642,
                        "src": "4133:5:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2640_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2727,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderFills",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2635,
                      "src": "4133:16:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 2729,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2728,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2721,
                      "src": "4150:10:16",
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
                    "src": "4133:28:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 2725,
                  "id": 2730,
                  "nodeType": "Return",
                  "src": "4126:35:16"
                }
              ]
            },
            "documentation": "Return amount of Issuance Order already filled\n     * @param  _orderHash       Issuance Order orderHash\n@return uint             Amount of Issuance Order filled",
            "id": 2732,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderFills",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2722,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2721,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 2732,
                  "src": "4037:18:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 2720,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "4037:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4027:34:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2725,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2724,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2732,
                  "src": "4106:4:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2723,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4106:4:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4105:6:16"
            },
            "scope": 2746,
            "src": "4008:160:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2744,
              "nodeType": "Block",
              "src": "4486:54:16",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2739,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2642,
                        "src": "4503:5:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2640_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2740,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderCancels",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2639,
                      "src": "4503:18:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 2742,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2741,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2734,
                      "src": "4522:10:16",
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
                    "src": "4503:30:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 2738,
                  "id": 2743,
                  "nodeType": "Return",
                  "src": "4496:37:16"
                }
              ]
            },
            "documentation": "Return amount of Issuance Order already canceled\n     * @param  _orderHash       Issuance Order orderHash\n@return uint             Amount of Issuance Order canceled",
            "id": 2745,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderCancels",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2735,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2734,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 2745,
                  "src": "4407:18:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 2733,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "4407:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4397:34:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2738,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2737,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2745,
                  "src": "4476:4:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2736,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4476:4:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4475:6:16"
            },
            "scope": 2746,
            "src": "4376:164:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 2747,
        "src": "800:3742:16"
      }
    ],
    "src": "597:3946:16"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
    "exportedSymbols": {
      "CoreState": [
        2746
      ]
    },
    "id": 2747,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2609,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:16"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title CoreState\n@author Set Protocol\n * The CoreState library maintains all state for the Core contract thus\nallowing it to operate across multiple mixins.",
        "fullyImplemented": true,
        "id": 2746,
        "linearizedBaseContracts": [
          2746
        ],
        "name": "CoreState",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "CoreState.State",
            "id": 2640,
            "members": [
              {
                "constant": false,
                "id": 2613,
                "name": "exchanges",
                "nodeType": "VariableDeclaration",
                "scope": 2640,
                "src": "948:35:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                  "typeString": "mapping(uint8 => address)"
                },
                "typeName": {
                  "id": 2612,
                  "keyType": {
                    "id": 2610,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "956:5:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "948:25:16",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                    "typeString": "mapping(uint8 => address)"
                  },
                  "valueType": {
                    "id": 2611,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "965:7:16",
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
                "id": 2615,
                "name": "transferProxy",
                "nodeType": "VariableDeclaration",
                "scope": 2640,
                "src": "1043:21:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2614,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1043:7:16",
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
                "id": 2617,
                "name": "vault",
                "nodeType": "VariableDeclaration",
                "scope": 2640,
                "src": "1116:13:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2616,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1116:7:16",
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
                "id": 2621,
                "name": "validFactories",
                "nodeType": "VariableDeclaration",
                "scope": 2640,
                "src": "1189:39:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 2620,
                  "keyType": {
                    "id": 2618,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1197:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1189:24:16",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 2619,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1208:4:16",
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
                "id": 2624,
                "name": "factories",
                "nodeType": "VariableDeclaration",
                "scope": 2640,
                "src": "1286:19:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 2622,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1286:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 2623,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "1286:9:16",
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
                "id": 2628,
                "name": "validSets",
                "nodeType": "VariableDeclaration",
                "scope": 2640,
                "src": "1356:34:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 2627,
                  "keyType": {
                    "id": 2625,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1364:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1356:24:16",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 2626,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1375:4:16",
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
                "id": 2631,
                "name": "setTokens",
                "nodeType": "VariableDeclaration",
                "scope": 2640,
                "src": "1439:19:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 2629,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1439:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 2630,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "1439:9:16",
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
                "id": 2635,
                "name": "orderFills",
                "nodeType": "VariableDeclaration",
                "scope": 2640,
                "src": "1514:35:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 2634,
                  "keyType": {
                    "id": 2632,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1522:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1514:24:16",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 2633,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1533:4:16",
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
                "id": 2639,
                "name": "orderCancels",
                "nodeType": "VariableDeclaration",
                "scope": 2640,
                "src": "1607:37:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 2638,
                  "keyType": {
                    "id": 2636,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1615:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1607:24:16",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 2637,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1626:4:16",
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
            "scope": 2746,
            "src": "871:780:16",
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 2642,
            "name": "state",
            "nodeType": "VariableDeclaration",
            "scope": 2746,
            "src": "1710:18:16",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_struct$_State_$2640_storage",
              "typeString": "struct CoreState.State"
            },
            "typeName": {
              "contractScope": null,
              "id": 2641,
              "name": "State",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2640,
              "src": "1710:5:16",
              "typeDescriptions": {
                "typeIdentifier": "t_struct$_State_$2640_storage_ptr",
                "typeString": "struct CoreState.State"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2654,
              "nodeType": "Block",
              "src": "2094:52:16",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2649,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2642,
                        "src": "2111:5:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2640_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2650,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "exchanges",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2613,
                      "src": "2111:15:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                        "typeString": "mapping(uint8 => address)"
                      }
                    },
                    "id": 2652,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2651,
                      "name": "_exchangeId",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2644,
                      "src": "2127:11:16",
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
                    "src": "2111:28:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 2648,
                  "id": 2653,
                  "nodeType": "Return",
                  "src": "2104:35:16"
                }
              ]
            },
            "documentation": "Return address belonging to given exchangeId.\n     * @param  _exchangeId       ExchangeId number\n@return address           Address belonging to given exchangeId",
            "id": 2655,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "exchanges",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2645,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2644,
                  "name": "_exchangeId",
                  "nodeType": "VariableDeclaration",
                  "scope": 2655,
                  "src": "2013:17:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 2643,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "2013:5:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2003:33:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2648,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2647,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2655,
                  "src": "2081:7:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2646,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2081:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2080:9:16"
            },
            "scope": 2746,
            "src": "1985:161:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2663,
              "nodeType": "Block",
              "src": "2345:43:16",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 2660,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2642,
                      "src": "2362:5:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$2640_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 2661,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "transferProxy",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 2615,
                    "src": "2362:19:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 2659,
                  "id": 2662,
                  "nodeType": "Return",
                  "src": "2355:26:16"
                }
              ]
            },
            "documentation": "Return transferProxy address.\n     * @return address       transferProxy address",
            "id": 2664,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "transferProxy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2656,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2285:2:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2659,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2658,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2664,
                  "src": "2332:7:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2657,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2332:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2331:9:16"
            },
            "scope": 2746,
            "src": "2263:125:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2672,
              "nodeType": "Block",
              "src": "2563:35:16",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 2669,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2642,
                      "src": "2580:5:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$2640_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 2670,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "vault",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 2617,
                    "src": "2580:11:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 2668,
                  "id": 2671,
                  "nodeType": "Return",
                  "src": "2573:18:16"
                }
              ]
            },
            "documentation": "Return vault address\n     * @return address        vault address",
            "id": 2673,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "vault",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2665,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2503:2:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2668,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2667,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2673,
                  "src": "2550:7:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2666,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2550:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2549:9:16"
            },
            "scope": 2746,
            "src": "2489:109:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2685,
              "nodeType": "Block",
              "src": "2913:54:16",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2680,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2642,
                        "src": "2930:5:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2640_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2681,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validFactories",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2621,
                      "src": "2930:20:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 2683,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2682,
                      "name": "_factory",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2675,
                      "src": "2951:8:16",
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
                    "src": "2930:30:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 2679,
                  "id": 2684,
                  "nodeType": "Return",
                  "src": "2923:37:16"
                }
              ]
            },
            "documentation": "Return boolean indicating if address is valid factory.\n     * @param  _factory       Factory address\n@return bool           Boolean indicating if enabled factory",
            "id": 2686,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validFactories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2676,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2675,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 2686,
                  "src": "2836:16:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2674,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2836:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2826:32:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2679,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2678,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2686,
                  "src": "2903:4:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 2677,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "2903:4:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2902:6:16"
            },
            "scope": 2746,
            "src": "2803:164:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2695,
              "nodeType": "Block",
              "src": "3179:39:16",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 2692,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2642,
                      "src": "3196:5:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$2640_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 2693,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "factories",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 2624,
                    "src": "3196:15:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 2691,
                  "id": 2694,
                  "nodeType": "Return",
                  "src": "3189:22:16"
                }
              ]
            },
            "documentation": "Return array of all enabled factories.\n     * @return address[]      Array of enabled factories",
            "id": 2696,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "factories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2687,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3117:2:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2691,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2690,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2696,
                  "src": "3164:9:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2688,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3164:7:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2689,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3164:9:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3163:11:16"
            },
            "scope": 2746,
            "src": "3099:119:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2708,
              "nodeType": "Block",
              "src": "3510:45:16",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2703,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2642,
                        "src": "3527:5:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2640_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2704,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validSets",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2628,
                      "src": "3527:15:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 2706,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2705,
                      "name": "_set",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2698,
                      "src": "3543:4:16",
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
                    "src": "3527:21:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 2702,
                  "id": 2707,
                  "nodeType": "Return",
                  "src": "3520:28:16"
                }
              ]
            },
            "documentation": "Return boolean indicating if address is valid Set.\n     * @param  _set           Set address\n@return bool           Boolean indicating if valid Set",
            "id": 2709,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validSets",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2699,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2698,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 2709,
                  "src": "3437:12:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2697,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3437:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3427:28:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2702,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2701,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2709,
                  "src": "3500:4:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 2700,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "3500:4:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3499:6:16"
            },
            "scope": 2746,
            "src": "3409:146:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2718,
              "nodeType": "Block",
              "src": "3765:39:16",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 2715,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2642,
                      "src": "3782:5:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$2640_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 2716,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "setTokens",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 2631,
                    "src": "3782:15:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 2714,
                  "id": 2717,
                  "nodeType": "Return",
                  "src": "3775:22:16"
                }
              ]
            },
            "documentation": "Return array of all valid Set Tokens.\n     * @return address[]      Array of valid Set Tokens",
            "id": 2719,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "setTokens",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2710,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3703:2:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2714,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2713,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2719,
                  "src": "3750:9:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2711,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3750:7:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2712,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3750:9:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3749:11:16"
            },
            "scope": 2746,
            "src": "3685:119:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2731,
              "nodeType": "Block",
              "src": "4116:52:16",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2726,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2642,
                        "src": "4133:5:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2640_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2727,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderFills",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2635,
                      "src": "4133:16:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 2729,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2728,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2721,
                      "src": "4150:10:16",
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
                    "src": "4133:28:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 2725,
                  "id": 2730,
                  "nodeType": "Return",
                  "src": "4126:35:16"
                }
              ]
            },
            "documentation": "Return amount of Issuance Order already filled\n     * @param  _orderHash       Issuance Order orderHash\n@return uint             Amount of Issuance Order filled",
            "id": 2732,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderFills",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2722,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2721,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 2732,
                  "src": "4037:18:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 2720,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "4037:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4027:34:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2725,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2724,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2732,
                  "src": "4106:4:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2723,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4106:4:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4105:6:16"
            },
            "scope": 2746,
            "src": "4008:160:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2744,
              "nodeType": "Block",
              "src": "4486:54:16",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2739,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2642,
                        "src": "4503:5:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2640_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2740,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderCancels",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2639,
                      "src": "4503:18:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 2742,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2741,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2734,
                      "src": "4522:10:16",
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
                    "src": "4503:30:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 2738,
                  "id": 2743,
                  "nodeType": "Return",
                  "src": "4496:37:16"
                }
              ]
            },
            "documentation": "Return amount of Issuance Order already canceled\n     * @param  _orderHash       Issuance Order orderHash\n@return uint             Amount of Issuance Order canceled",
            "id": 2745,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderCancels",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2735,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2734,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 2745,
                  "src": "4407:18:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 2733,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "4407:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4397:34:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2738,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2737,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2745,
                  "src": "4476:4:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2736,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4476:4:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4475:6:16"
            },
            "scope": 2746,
            "src": "4376:164:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 2747,
        "src": "800:3742:16"
      }
    ],
    "src": "597:3946:16"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-08T05:31:02.863Z"
}