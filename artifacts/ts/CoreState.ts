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
  "bytecode": "0x608060405234801561001057600080fd5b506103fc806100206000396000f3006080604052600436106100a35763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100a85780631e912bd6146100dd578063559ed339146101075780636e667db31461016c578063a003e0691461019d578063c19d93fb146101b8578063f7213db6146101f3578063fbfa77cf1461020b578063fe5b38e414610220578063fef3ee7314610235575b600080fd5b3480156100b457600080fd5b506100c9600160a060020a0360043516610256565b604080519115158252519081900360200190f35b3480156100e957600080fd5b506100f5600435610274565b60408051918252519081900360200190f35b34801561011357600080fd5b5061011c610286565b60408051602080825283518183015283519192839290830191858101910280838360005b83811015610158578181015183820152602001610140565b505050509050019250505060405180910390f35b34801561017857600080fd5b506101816102eb565b60408051600160a060020a039092168252519081900360200190f35b3480156101a957600080fd5b5061018160ff600435166102fa565b3480156101c457600080fd5b506101cd610318565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b3480156101ff57600080fd5b506100f560043561032e565b34801561021757600080fd5b50610181610340565b34801561022c57600080fd5b5061011c61034f565b34801561024157600080fd5b506100c9600160a060020a03600435166103b2565b600160a060020a031660009081526003602052604090205460ff1690565b60009081526008602052604090205490565b606060006006018054806020026020016040519081016040528092919081815260200182805480156102e157602002820191906000526020600020905b8154600160a060020a031681526001909101906020018083116102c3575b5050505050905090565b600154600160a060020a031690565b60ff16600090815260208190526040902054600160a060020a031690565b600154600254600160a060020a03918216911682565b60009081526007602052604090205490565b600254600160a060020a031690565b606060006004018054806020026020016040519081016040528092919081815260200182805480156102e157602002820191906000526020600020908154600160a060020a031681526001909101906020018083116102c3575050505050905090565b600160a060020a031660009081526005602052604090205460ff16905600a165627a7a72305820ed359e9a9d4f3003d60edca81183499c25c340fc92589c0445b0d09336a613ae0029",
  "deployedBytecode": "0x6080604052600436106100a35763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100a85780631e912bd6146100dd578063559ed339146101075780636e667db31461016c578063a003e0691461019d578063c19d93fb146101b8578063f7213db6146101f3578063fbfa77cf1461020b578063fe5b38e414610220578063fef3ee7314610235575b600080fd5b3480156100b457600080fd5b506100c9600160a060020a0360043516610256565b604080519115158252519081900360200190f35b3480156100e957600080fd5b506100f5600435610274565b60408051918252519081900360200190f35b34801561011357600080fd5b5061011c610286565b60408051602080825283518183015283519192839290830191858101910280838360005b83811015610158578181015183820152602001610140565b505050509050019250505060405180910390f35b34801561017857600080fd5b506101816102eb565b60408051600160a060020a039092168252519081900360200190f35b3480156101a957600080fd5b5061018160ff600435166102fa565b3480156101c457600080fd5b506101cd610318565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b3480156101ff57600080fd5b506100f560043561032e565b34801561021757600080fd5b50610181610340565b34801561022c57600080fd5b5061011c61034f565b34801561024157600080fd5b506100c9600160a060020a03600435166103b2565b600160a060020a031660009081526003602052604090205460ff1690565b60009081526008602052604090205490565b606060006006018054806020026020016040519081016040528092919081815260200182805480156102e157602002820191906000526020600020905b8154600160a060020a031681526001909101906020018083116102c3575b5050505050905090565b600154600160a060020a031690565b60ff16600090815260208190526040902054600160a060020a031690565b600154600254600160a060020a03918216911682565b60009081526007602052604090205490565b600254600160a060020a031690565b606060006004018054806020026020016040519081016040528092919081815260200182805480156102e157602002820191906000526020600020908154600160a060020a031681526001909101906020018083116102c3575050505050905090565b600160a060020a031660009081526005602052604090205460ff16905600a165627a7a72305820ed359e9a9d4f3003d60edca81183499c25c340fc92589c0445b0d09336a613ae0029",
  "sourceMap": "800:3754:23:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;800:3754:23;;;;;;;",
  "deployedSourceMap": "800:3754:23:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2803:164;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2803:164:23;-1:-1:-1;;;;;2803:164:23;;;;;;;;;;;;;;;;;;;;;;;4385:167;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4385:167:23;;;;;;;;;;;;;;;;;;;;;3685:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3685:119:23;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;3685:119:23;;;;;;;;;;;;;;;;;2263:125;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2263:125:23;;;;;;;;-1:-1:-1;;;;;2263:125:23;;;;;;;;;;;;;;1985:161;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1985:161:23;;;;;;;1710:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1710:18:23;;;;;;;;-1:-1:-1;;;;;1710:18:23;;;;;;;;;;;;;;;;;;;;;;;;4011:163;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4011:163:23;;;;;2489:109;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2489:109:23;;;;3099:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3099:119:23;;;;3409:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3409:146:23;-1:-1:-1;;;;;3409:146:23;;;;;2803:164;-1:-1:-1;;;;;2930:30:23;2903:4;2930:30;;;:20;:30;;;;;;;;;2803:164::o;4385:167::-;4485:7;4515:30;;;:18;:30;;;;;;;4385:167::o;3685:119::-;3750:9;3782:5;:15;;3775:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3775:22:23;;;;;;;;;;;;;;;;;;;;;;;3685:119;:::o;2263:125::-;2362:19;;-1:-1:-1;;;;;2362:19:23;2263:125;:::o;1985:161::-;2111:28;;2081:7;2111:28;;;;;;;;;;;-1:-1:-1;;;;;2111:28:23;;1985:161::o;1710:18::-;;;;;-1:-1:-1;;;;;1710:18:23;;;;;;:::o;4011:163::-;4109:7;4139:28;;;:16;:28;;;;;;;4011:163::o;2489:109::-;2580:11;;-1:-1:-1;;;;;2580:11:23;2489:109;:::o;3099:119::-;3164:9;3196:5;:15;;3189:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3189:22:23;;;;;;;;;;;;;;;;;;;;;;3099:119;:::o;3409:146::-;-1:-1:-1;;;;;3527:21:23;3500:4;3527:21;;;:15;:21;;;;;;;;;3409:146::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\n/**\n * @title CoreState\n * @author Set Protocol\n *\n * The CoreState library maintains all state for the Core contract thus\n * allowing it to operate across multiple mixins.\n */\ncontract CoreState {\n\n    /* ============ Structs ============ */\n\n    struct State {\n        // Mapping of exchange enumeration to address\n        mapping(uint8 => address) exchanges;\n\n        // Address of the TransferProxy contract\n        address transferProxy;\n\n        // Address of the Vault contract\n        address vault;\n\n        // Mapping of tracked SetToken factories\n        mapping(address => bool) validFactories;\n\n        // Array of tracked SetToken factories\n        address[] factories;\n\n        // Mapping of tracked SetTokens\n        mapping(address => bool) validSets;\n\n        // Array of tracked SetTokens\n        address[] setTokens;\n\n        // Mapping of filled Issuance Orders\n        mapping(bytes32 => uint) orderFills;\n\n        // Mapping of canceled Issuance Orders\n        mapping(bytes32 => uint) orderCancels;\n    }\n\n    /* ============ State Variables ============ */\n\n    State public state;\n\n    /* ============ Public Getters ============ */\n\n    /**\n     * Return address belonging to given exchangeId.\n     *\n     * @param  _exchangeId       ExchangeId number\n     * @return address           Address belonging to given exchangeId\n     */\n    function exchanges(\n        uint8 _exchangeId\n    )\n        public\n        view\n        returns(address)\n    {\n        return state.exchanges[_exchangeId];\n    }\n\n    /**\n     * Return transferProxy address.\n     *\n     * @return address       transferProxy address\n     */\n    function transferProxy()\n        public\n        view\n        returns(address)\n    {\n        return state.transferProxy;\n    }\n\n    /**\n     * Return vault address\n     *\n     * @return address        vault address\n     */\n    function vault()\n        public\n        view\n        returns(address)\n    {\n        return state.vault;\n    }\n\n    /**\n     * Return boolean indicating if address is valid factory.\n     *\n     * @param  _factory       Factory address\n     * @return bool           Boolean indicating if enabled factory\n     */\n    function validFactories(\n        address _factory\n    )\n        public\n        view\n        returns(bool)\n    {\n        return state.validFactories[_factory];\n    }\n\n    /**\n     * Return array of all enabled factories.\n     *\n     * @return address[]      Array of enabled factories\n     */\n    function factories()\n        public\n        view\n        returns(address[])\n    {\n        return state.factories;\n    }\n\n    /**\n     * Return boolean indicating if address is valid Set.\n     *\n     * @param  _set           Set address\n     * @return bool           Boolean indicating if valid Set\n     */\n    function validSets(\n        address _set\n    )\n        public\n        view\n        returns(bool)\n    {\n        return state.validSets[_set];\n    }\n\n    /**\n     * Return array of all valid Set Tokens.\n     *\n     * @return address[]      Array of valid Set Tokens\n     */\n    function setTokens()\n        public\n        view\n        returns(address[])\n    {\n        return state.setTokens;\n    }\n\n    /**\n     * Return amount of Issuance Order already filled\n     *\n     * @param  _orderHash       Issuance Order orderHash\n     * @return uint256             Amount of Issuance Order filled\n     */\n    function orderFills(\n        bytes32 _orderHash\n    )\n        public\n        view\n        returns(uint256)\n    {\n        return state.orderFills[_orderHash];\n    }\n\n    /**\n     * Return amount of Issuance Order already canceled\n     *\n     * @param  _orderHash       Issuance Order orderHash\n     * @return uint256             Amount of Issuance Order canceled\n     */\n    function orderCancels(\n        bytes32 _orderHash\n    )\n        public\n        view\n        returns(uint256)\n    {\n        return state.orderCancels[_orderHash];\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
    "exportedSymbols": {
      "CoreState": [
        3879
      ]
    },
    "id": 3880,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3742,
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
        "id": 3879,
        "linearizedBaseContracts": [
          3879
        ],
        "name": "CoreState",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "CoreState.State",
            "id": 3773,
            "members": [
              {
                "constant": false,
                "id": 3746,
                "name": "exchanges",
                "nodeType": "VariableDeclaration",
                "scope": 3773,
                "src": "948:35:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                  "typeString": "mapping(uint8 => address)"
                },
                "typeName": {
                  "id": 3745,
                  "keyType": {
                    "id": 3743,
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
                    "id": 3744,
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
                "id": 3748,
                "name": "transferProxy",
                "nodeType": "VariableDeclaration",
                "scope": 3773,
                "src": "1043:21:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3747,
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
                "id": 3750,
                "name": "vault",
                "nodeType": "VariableDeclaration",
                "scope": 3773,
                "src": "1116:13:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3749,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1116:7:23",
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
                "id": 3754,
                "name": "validFactories",
                "nodeType": "VariableDeclaration",
                "scope": 3773,
                "src": "1189:39:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 3753,
                  "keyType": {
                    "id": 3751,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1197:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1189:24:23",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 3752,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1208:4:23",
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
                "id": 3757,
                "name": "factories",
                "nodeType": "VariableDeclaration",
                "scope": 3773,
                "src": "1286:19:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 3755,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1286:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 3756,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "1286:9:23",
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
                "id": 3761,
                "name": "validSets",
                "nodeType": "VariableDeclaration",
                "scope": 3773,
                "src": "1356:34:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 3760,
                  "keyType": {
                    "id": 3758,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1364:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1356:24:23",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 3759,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1375:4:23",
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
                "id": 3764,
                "name": "setTokens",
                "nodeType": "VariableDeclaration",
                "scope": 3773,
                "src": "1439:19:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 3762,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1439:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 3763,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "1439:9:23",
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
                "id": 3768,
                "name": "orderFills",
                "nodeType": "VariableDeclaration",
                "scope": 3773,
                "src": "1514:35:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 3767,
                  "keyType": {
                    "id": 3765,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1522:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1514:24:23",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 3766,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1533:4:23",
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
                "id": 3772,
                "name": "orderCancels",
                "nodeType": "VariableDeclaration",
                "scope": 3773,
                "src": "1607:37:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 3771,
                  "keyType": {
                    "id": 3769,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1615:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1607:24:23",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 3770,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1626:4:23",
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
            "scope": 3879,
            "src": "871:780:23",
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 3775,
            "name": "state",
            "nodeType": "VariableDeclaration",
            "scope": 3879,
            "src": "1710:18:23",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_struct$_State_$3773_storage",
              "typeString": "struct CoreState.State"
            },
            "typeName": {
              "contractScope": null,
              "id": 3774,
              "name": "State",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3773,
              "src": "1710:5:23",
              "typeDescriptions": {
                "typeIdentifier": "t_struct$_State_$3773_storage_ptr",
                "typeString": "struct CoreState.State"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3787,
              "nodeType": "Block",
              "src": "2094:52:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3782,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3775,
                        "src": "2111:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3773_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3783,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "exchanges",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3746,
                      "src": "2111:15:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                        "typeString": "mapping(uint8 => address)"
                      }
                    },
                    "id": 3785,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3784,
                      "name": "_exchangeId",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3777,
                      "src": "2127:11:23",
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
                    "src": "2111:28:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 3781,
                  "id": 3786,
                  "nodeType": "Return",
                  "src": "2104:35:23"
                }
              ]
            },
            "documentation": "Return address belonging to given exchangeId.\n     * @param  _exchangeId       ExchangeId number\n@return address           Address belonging to given exchangeId",
            "id": 3788,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "exchanges",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3778,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3777,
                  "name": "_exchangeId",
                  "nodeType": "VariableDeclaration",
                  "scope": 3788,
                  "src": "2013:17:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 3776,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "2013:5:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2003:33:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3781,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3780,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3788,
                  "src": "2081:7:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3779,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2081:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2080:9:23"
            },
            "scope": 3879,
            "src": "1985:161:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3796,
              "nodeType": "Block",
              "src": "2345:43:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3793,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3775,
                      "src": "2362:5:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3773_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3794,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "transferProxy",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3748,
                    "src": "2362:19:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 3792,
                  "id": 3795,
                  "nodeType": "Return",
                  "src": "2355:26:23"
                }
              ]
            },
            "documentation": "Return transferProxy address.\n     * @return address       transferProxy address",
            "id": 3797,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "transferProxy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3789,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2285:2:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3792,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3791,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3797,
                  "src": "2332:7:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3790,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2332:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2331:9:23"
            },
            "scope": 3879,
            "src": "2263:125:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3805,
              "nodeType": "Block",
              "src": "2563:35:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3802,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3775,
                      "src": "2580:5:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3773_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3803,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "vault",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3750,
                    "src": "2580:11:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 3801,
                  "id": 3804,
                  "nodeType": "Return",
                  "src": "2573:18:23"
                }
              ]
            },
            "documentation": "Return vault address\n     * @return address        vault address",
            "id": 3806,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "vault",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3798,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2503:2:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3801,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3800,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3806,
                  "src": "2550:7:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3799,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2550:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2549:9:23"
            },
            "scope": 3879,
            "src": "2489:109:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3818,
              "nodeType": "Block",
              "src": "2913:54:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3813,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3775,
                        "src": "2930:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3773_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3814,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validFactories",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3754,
                      "src": "2930:20:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 3816,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3815,
                      "name": "_factory",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3808,
                      "src": "2951:8:23",
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
                    "src": "2930:30:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 3812,
                  "id": 3817,
                  "nodeType": "Return",
                  "src": "2923:37:23"
                }
              ]
            },
            "documentation": "Return boolean indicating if address is valid factory.\n     * @param  _factory       Factory address\n@return bool           Boolean indicating if enabled factory",
            "id": 3819,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validFactories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3809,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3808,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3819,
                  "src": "2836:16:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3807,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2836:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2826:32:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3812,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3811,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3819,
                  "src": "2903:4:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3810,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "2903:4:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2902:6:23"
            },
            "scope": 3879,
            "src": "2803:164:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3828,
              "nodeType": "Block",
              "src": "3179:39:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3825,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3775,
                      "src": "3196:5:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3773_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3826,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "factories",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3757,
                    "src": "3196:15:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 3824,
                  "id": 3827,
                  "nodeType": "Return",
                  "src": "3189:22:23"
                }
              ]
            },
            "documentation": "Return array of all enabled factories.\n     * @return address[]      Array of enabled factories",
            "id": 3829,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "factories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3820,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3117:2:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3824,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3823,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3829,
                  "src": "3164:9:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3821,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3164:7:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3822,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3164:9:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3163:11:23"
            },
            "scope": 3879,
            "src": "3099:119:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3841,
              "nodeType": "Block",
              "src": "3510:45:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3836,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3775,
                        "src": "3527:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3773_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3837,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validSets",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3761,
                      "src": "3527:15:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 3839,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3838,
                      "name": "_set",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3831,
                      "src": "3543:4:23",
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
                    "src": "3527:21:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 3835,
                  "id": 3840,
                  "nodeType": "Return",
                  "src": "3520:28:23"
                }
              ]
            },
            "documentation": "Return boolean indicating if address is valid Set.\n     * @param  _set           Set address\n@return bool           Boolean indicating if valid Set",
            "id": 3842,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validSets",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3832,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3831,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3842,
                  "src": "3437:12:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3830,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3437:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3427:28:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3835,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3834,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3842,
                  "src": "3500:4:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3833,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "3500:4:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3499:6:23"
            },
            "scope": 3879,
            "src": "3409:146:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3851,
              "nodeType": "Block",
              "src": "3765:39:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3848,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3775,
                      "src": "3782:5:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3773_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3849,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "setTokens",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3764,
                    "src": "3782:15:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 3847,
                  "id": 3850,
                  "nodeType": "Return",
                  "src": "3775:22:23"
                }
              ]
            },
            "documentation": "Return array of all valid Set Tokens.\n     * @return address[]      Array of valid Set Tokens",
            "id": 3852,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "setTokens",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3843,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3703:2:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3847,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3846,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3852,
                  "src": "3750:9:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3844,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3750:7:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3845,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3750:9:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3749:11:23"
            },
            "scope": 3879,
            "src": "3685:119:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3864,
              "nodeType": "Block",
              "src": "4122:52:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3859,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3775,
                        "src": "4139:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3773_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3860,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderFills",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3768,
                      "src": "4139:16:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 3862,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3861,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3854,
                      "src": "4156:10:23",
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
                    "src": "4139:28:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3858,
                  "id": 3863,
                  "nodeType": "Return",
                  "src": "4132:35:23"
                }
              ]
            },
            "documentation": "Return amount of Issuance Order already filled\n     * @param  _orderHash       Issuance Order orderHash\n@return uint256             Amount of Issuance Order filled",
            "id": 3865,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderFills",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3855,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3854,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 3865,
                  "src": "4040:18:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3853,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "4040:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4030:34:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3858,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3857,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3865,
                  "src": "4109:7:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3856,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4109:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4108:9:23"
            },
            "scope": 3879,
            "src": "4011:163:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3877,
              "nodeType": "Block",
              "src": "4498:54:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3872,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3775,
                        "src": "4515:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3773_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3873,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderCancels",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3772,
                      "src": "4515:18:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 3875,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3874,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3867,
                      "src": "4534:10:23",
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
                    "src": "4515:30:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3871,
                  "id": 3876,
                  "nodeType": "Return",
                  "src": "4508:37:23"
                }
              ]
            },
            "documentation": "Return amount of Issuance Order already canceled\n     * @param  _orderHash       Issuance Order orderHash\n@return uint256             Amount of Issuance Order canceled",
            "id": 3878,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderCancels",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3868,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3867,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 3878,
                  "src": "4416:18:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3866,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "4416:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4406:34:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3871,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3870,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3878,
                  "src": "4485:7:23",
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
                    "src": "4485:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4484:9:23"
            },
            "scope": 3879,
            "src": "4385:167:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 3880,
        "src": "800:3754:23"
      }
    ],
    "src": "597:3958:23"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
    "exportedSymbols": {
      "CoreState": [
        3879
      ]
    },
    "id": 3880,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3742,
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
        "id": 3879,
        "linearizedBaseContracts": [
          3879
        ],
        "name": "CoreState",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "CoreState.State",
            "id": 3773,
            "members": [
              {
                "constant": false,
                "id": 3746,
                "name": "exchanges",
                "nodeType": "VariableDeclaration",
                "scope": 3773,
                "src": "948:35:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                  "typeString": "mapping(uint8 => address)"
                },
                "typeName": {
                  "id": 3745,
                  "keyType": {
                    "id": 3743,
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
                    "id": 3744,
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
                "id": 3748,
                "name": "transferProxy",
                "nodeType": "VariableDeclaration",
                "scope": 3773,
                "src": "1043:21:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3747,
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
                "id": 3750,
                "name": "vault",
                "nodeType": "VariableDeclaration",
                "scope": 3773,
                "src": "1116:13:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3749,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1116:7:23",
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
                "id": 3754,
                "name": "validFactories",
                "nodeType": "VariableDeclaration",
                "scope": 3773,
                "src": "1189:39:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 3753,
                  "keyType": {
                    "id": 3751,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1197:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1189:24:23",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 3752,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1208:4:23",
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
                "id": 3757,
                "name": "factories",
                "nodeType": "VariableDeclaration",
                "scope": 3773,
                "src": "1286:19:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 3755,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1286:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 3756,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "1286:9:23",
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
                "id": 3761,
                "name": "validSets",
                "nodeType": "VariableDeclaration",
                "scope": 3773,
                "src": "1356:34:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 3760,
                  "keyType": {
                    "id": 3758,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1364:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1356:24:23",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 3759,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1375:4:23",
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
                "id": 3764,
                "name": "setTokens",
                "nodeType": "VariableDeclaration",
                "scope": 3773,
                "src": "1439:19:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 3762,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1439:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 3763,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "1439:9:23",
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
                "id": 3768,
                "name": "orderFills",
                "nodeType": "VariableDeclaration",
                "scope": 3773,
                "src": "1514:35:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 3767,
                  "keyType": {
                    "id": 3765,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1522:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1514:24:23",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 3766,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1533:4:23",
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
                "id": 3772,
                "name": "orderCancels",
                "nodeType": "VariableDeclaration",
                "scope": 3773,
                "src": "1607:37:23",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 3771,
                  "keyType": {
                    "id": 3769,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1615:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1607:24:23",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 3770,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1626:4:23",
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
            "scope": 3879,
            "src": "871:780:23",
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 3775,
            "name": "state",
            "nodeType": "VariableDeclaration",
            "scope": 3879,
            "src": "1710:18:23",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_struct$_State_$3773_storage",
              "typeString": "struct CoreState.State"
            },
            "typeName": {
              "contractScope": null,
              "id": 3774,
              "name": "State",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3773,
              "src": "1710:5:23",
              "typeDescriptions": {
                "typeIdentifier": "t_struct$_State_$3773_storage_ptr",
                "typeString": "struct CoreState.State"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3787,
              "nodeType": "Block",
              "src": "2094:52:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3782,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3775,
                        "src": "2111:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3773_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3783,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "exchanges",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3746,
                      "src": "2111:15:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                        "typeString": "mapping(uint8 => address)"
                      }
                    },
                    "id": 3785,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3784,
                      "name": "_exchangeId",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3777,
                      "src": "2127:11:23",
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
                    "src": "2111:28:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 3781,
                  "id": 3786,
                  "nodeType": "Return",
                  "src": "2104:35:23"
                }
              ]
            },
            "documentation": "Return address belonging to given exchangeId.\n     * @param  _exchangeId       ExchangeId number\n@return address           Address belonging to given exchangeId",
            "id": 3788,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "exchanges",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3778,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3777,
                  "name": "_exchangeId",
                  "nodeType": "VariableDeclaration",
                  "scope": 3788,
                  "src": "2013:17:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 3776,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "2013:5:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2003:33:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3781,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3780,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3788,
                  "src": "2081:7:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3779,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2081:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2080:9:23"
            },
            "scope": 3879,
            "src": "1985:161:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3796,
              "nodeType": "Block",
              "src": "2345:43:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3793,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3775,
                      "src": "2362:5:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3773_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3794,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "transferProxy",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3748,
                    "src": "2362:19:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 3792,
                  "id": 3795,
                  "nodeType": "Return",
                  "src": "2355:26:23"
                }
              ]
            },
            "documentation": "Return transferProxy address.\n     * @return address       transferProxy address",
            "id": 3797,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "transferProxy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3789,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2285:2:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3792,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3791,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3797,
                  "src": "2332:7:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3790,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2332:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2331:9:23"
            },
            "scope": 3879,
            "src": "2263:125:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3805,
              "nodeType": "Block",
              "src": "2563:35:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3802,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3775,
                      "src": "2580:5:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3773_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3803,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "vault",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3750,
                    "src": "2580:11:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 3801,
                  "id": 3804,
                  "nodeType": "Return",
                  "src": "2573:18:23"
                }
              ]
            },
            "documentation": "Return vault address\n     * @return address        vault address",
            "id": 3806,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "vault",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3798,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2503:2:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3801,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3800,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3806,
                  "src": "2550:7:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3799,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2550:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2549:9:23"
            },
            "scope": 3879,
            "src": "2489:109:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3818,
              "nodeType": "Block",
              "src": "2913:54:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3813,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3775,
                        "src": "2930:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3773_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3814,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validFactories",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3754,
                      "src": "2930:20:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 3816,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3815,
                      "name": "_factory",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3808,
                      "src": "2951:8:23",
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
                    "src": "2930:30:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 3812,
                  "id": 3817,
                  "nodeType": "Return",
                  "src": "2923:37:23"
                }
              ]
            },
            "documentation": "Return boolean indicating if address is valid factory.\n     * @param  _factory       Factory address\n@return bool           Boolean indicating if enabled factory",
            "id": 3819,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validFactories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3809,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3808,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3819,
                  "src": "2836:16:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3807,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2836:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2826:32:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3812,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3811,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3819,
                  "src": "2903:4:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3810,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "2903:4:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2902:6:23"
            },
            "scope": 3879,
            "src": "2803:164:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3828,
              "nodeType": "Block",
              "src": "3179:39:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3825,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3775,
                      "src": "3196:5:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3773_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3826,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "factories",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3757,
                    "src": "3196:15:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 3824,
                  "id": 3827,
                  "nodeType": "Return",
                  "src": "3189:22:23"
                }
              ]
            },
            "documentation": "Return array of all enabled factories.\n     * @return address[]      Array of enabled factories",
            "id": 3829,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "factories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3820,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3117:2:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3824,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3823,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3829,
                  "src": "3164:9:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3821,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3164:7:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3822,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3164:9:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3163:11:23"
            },
            "scope": 3879,
            "src": "3099:119:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3841,
              "nodeType": "Block",
              "src": "3510:45:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3836,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3775,
                        "src": "3527:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3773_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3837,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validSets",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3761,
                      "src": "3527:15:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 3839,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3838,
                      "name": "_set",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3831,
                      "src": "3543:4:23",
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
                    "src": "3527:21:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 3835,
                  "id": 3840,
                  "nodeType": "Return",
                  "src": "3520:28:23"
                }
              ]
            },
            "documentation": "Return boolean indicating if address is valid Set.\n     * @param  _set           Set address\n@return bool           Boolean indicating if valid Set",
            "id": 3842,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validSets",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3832,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3831,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3842,
                  "src": "3437:12:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3830,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3437:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3427:28:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3835,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3834,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3842,
                  "src": "3500:4:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3833,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "3500:4:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3499:6:23"
            },
            "scope": 3879,
            "src": "3409:146:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3851,
              "nodeType": "Block",
              "src": "3765:39:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3848,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3775,
                      "src": "3782:5:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3773_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3849,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "setTokens",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3764,
                    "src": "3782:15:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 3847,
                  "id": 3850,
                  "nodeType": "Return",
                  "src": "3775:22:23"
                }
              ]
            },
            "documentation": "Return array of all valid Set Tokens.\n     * @return address[]      Array of valid Set Tokens",
            "id": 3852,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "setTokens",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3843,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3703:2:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3847,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3846,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3852,
                  "src": "3750:9:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3844,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3750:7:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3845,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3750:9:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3749:11:23"
            },
            "scope": 3879,
            "src": "3685:119:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3864,
              "nodeType": "Block",
              "src": "4122:52:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3859,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3775,
                        "src": "4139:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3773_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3860,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderFills",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3768,
                      "src": "4139:16:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 3862,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3861,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3854,
                      "src": "4156:10:23",
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
                    "src": "4139:28:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3858,
                  "id": 3863,
                  "nodeType": "Return",
                  "src": "4132:35:23"
                }
              ]
            },
            "documentation": "Return amount of Issuance Order already filled\n     * @param  _orderHash       Issuance Order orderHash\n@return uint256             Amount of Issuance Order filled",
            "id": 3865,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderFills",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3855,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3854,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 3865,
                  "src": "4040:18:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3853,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "4040:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4030:34:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3858,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3857,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3865,
                  "src": "4109:7:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3856,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4109:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4108:9:23"
            },
            "scope": 3879,
            "src": "4011:163:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3877,
              "nodeType": "Block",
              "src": "4498:54:23",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3872,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3775,
                        "src": "4515:5:23",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3773_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3873,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderCancels",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3772,
                      "src": "4515:18:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 3875,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3874,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3867,
                      "src": "4534:10:23",
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
                    "src": "4515:30:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3871,
                  "id": 3876,
                  "nodeType": "Return",
                  "src": "4508:37:23"
                }
              ]
            },
            "documentation": "Return amount of Issuance Order already canceled\n     * @param  _orderHash       Issuance Order orderHash\n@return uint256             Amount of Issuance Order canceled",
            "id": 3878,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderCancels",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3868,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3867,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 3878,
                  "src": "4416:18:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3866,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "4416:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4406:34:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 3871,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3870,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3878,
                  "src": "4485:7:23",
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
                    "src": "4485:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4484:9:23"
            },
            "scope": 3879,
            "src": "4385:167:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 3880,
        "src": "800:3754:23"
      }
    ],
    "src": "597:3958:23"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-10T03:42:05.764Z"
}