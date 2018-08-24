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
  "sourceMap": "800:3754:19:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;800:3754:19;;;;;;;",
  "deployedSourceMap": "800:3754:19:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2803:164;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2803:164:19;-1:-1:-1;;;;;2803:164:19;;;;;;;;;;;;;;;;;;;;;;;4385:167;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4385:167:19;;;;;;;;;;;;;;;;;;;;;3685:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3685:119:19;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;3685:119:19;;;;;;;;;;;;;;;;;2263:125;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2263:125:19;;;;;;;;-1:-1:-1;;;;;2263:125:19;;;;;;;;;;;;;;1985:161;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1985:161:19;;;;;;;1710:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1710:18:19;;;;;;;;-1:-1:-1;;;;;1710:18:19;;;;;;;;;;;;;;;;;;;;;;;;4011:163;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4011:163:19;;;;;2489:109;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2489:109:19;;;;3099:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3099:119:19;;;;3409:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3409:146:19;-1:-1:-1;;;;;3409:146:19;;;;;2803:164;-1:-1:-1;;;;;2930:30:19;2903:4;2930:30;;;:20;:30;;;;;;;;;2803:164::o;4385:167::-;4485:7;4515:30;;;:18;:30;;;;;;;4385:167::o;3685:119::-;3750:9;3782:5;:15;;3775:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3775:22:19;;;;;;;;;;;;;;;;;;;;;;;3685:119;:::o;2263:125::-;2362:19;;-1:-1:-1;;;;;2362:19:19;2263:125;:::o;1985:161::-;2111:28;;2081:7;2111:28;;;;;;;;;;;-1:-1:-1;;;;;2111:28:19;;1985:161::o;1710:18::-;;;;;-1:-1:-1;;;;;1710:18:19;;;;;;:::o;4011:163::-;4109:7;4139:28;;;:16;:28;;;;;;;4011:163::o;2489:109::-;2580:11;;-1:-1:-1;;;;;2580:11:19;2489:109;:::o;3099:119::-;3164:9;3196:5;:15;;3189:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3189:22:19;;;;;;;;;;;;;;;;;;;;;;3099:119;:::o;3409:146::-;-1:-1:-1;;;;;3527:21:19;3500:4;3527:21;;;:15;:21;;;;;;;;;3409:146::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\n/**\n * @title CoreState\n * @author Set Protocol\n *\n * The CoreState library maintains all state for the Core contract thus\n * allowing it to operate across multiple mixins.\n */\ncontract CoreState {\n\n    /* ============ Structs ============ */\n\n    struct State {\n        // Mapping of exchange enumeration to address\n        mapping(uint8 => address) exchanges;\n\n        // Address of the TransferProxy contract\n        address transferProxy;\n\n        // Address of the Vault contract\n        address vault;\n\n        // Mapping of tracked SetToken factories\n        mapping(address => bool) validFactories;\n\n        // Array of tracked SetToken factories\n        address[] factories;\n\n        // Mapping of tracked SetTokens\n        mapping(address => bool) validSets;\n\n        // Array of tracked SetTokens\n        address[] setTokens;\n\n        // Mapping of filled Issuance Orders\n        mapping(bytes32 => uint) orderFills;\n\n        // Mapping of canceled Issuance Orders\n        mapping(bytes32 => uint) orderCancels;\n    }\n\n    /* ============ State Variables ============ */\n\n    State public state;\n\n    /* ============ Public Getters ============ */\n\n    /**\n     * Return address belonging to given exchangeId.\n     *\n     * @param  _exchangeId       ExchangeId number\n     * @return address           Address belonging to given exchangeId\n     */\n    function exchanges(\n        uint8 _exchangeId\n    )\n        public\n        view\n        returns(address)\n    {\n        return state.exchanges[_exchangeId];\n    }\n\n    /**\n     * Return transferProxy address.\n     *\n     * @return address       transferProxy address\n     */\n    function transferProxy()\n        public\n        view\n        returns(address)\n    {\n        return state.transferProxy;\n    }\n\n    /**\n     * Return vault address\n     *\n     * @return address        vault address\n     */\n    function vault()\n        public\n        view\n        returns(address)\n    {\n        return state.vault;\n    }\n\n    /**\n     * Return boolean indicating if address is valid factory.\n     *\n     * @param  _factory       Factory address\n     * @return bool           Boolean indicating if enabled factory\n     */\n    function validFactories(\n        address _factory\n    )\n        public\n        view\n        returns(bool)\n    {\n        return state.validFactories[_factory];\n    }\n\n    /**\n     * Return array of all enabled factories.\n     *\n     * @return address[]      Array of enabled factories\n     */\n    function factories()\n        public\n        view\n        returns(address[])\n    {\n        return state.factories;\n    }\n\n    /**\n     * Return boolean indicating if address is valid Set.\n     *\n     * @param  _set           Set address\n     * @return bool           Boolean indicating if valid Set\n     */\n    function validSets(\n        address _set\n    )\n        public\n        view\n        returns(bool)\n    {\n        return state.validSets[_set];\n    }\n\n    /**\n     * Return array of all valid Set Tokens.\n     *\n     * @return address[]      Array of valid Set Tokens\n     */\n    function setTokens()\n        public\n        view\n        returns(address[])\n    {\n        return state.setTokens;\n    }\n\n    /**\n     * Return amount of Issuance Order already filled\n     *\n     * @param  _orderHash       Issuance Order orderHash\n     * @return uint256             Amount of Issuance Order filled\n     */\n    function orderFills(\n        bytes32 _orderHash\n    )\n        public\n        view\n        returns(uint256)\n    {\n        return state.orderFills[_orderHash];\n    }\n\n    /**\n     * Return amount of Issuance Order already canceled\n     *\n     * @param  _orderHash       Issuance Order orderHash\n     * @return uint256             Amount of Issuance Order canceled\n     */\n    function orderCancels(\n        bytes32 _orderHash\n    )\n        public\n        view\n        returns(uint256)\n    {\n        return state.orderCancels[_orderHash];\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
    "exportedSymbols": {
      "CoreState": [
        3702
      ]
    },
    "id": 3703,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3565,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:19"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title CoreState\n@author Set Protocol\n * The CoreState library maintains all state for the Core contract thus\nallowing it to operate across multiple mixins.",
        "fullyImplemented": true,
        "id": 3702,
        "linearizedBaseContracts": [
          3702
        ],
        "name": "CoreState",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "CoreState.State",
            "id": 3596,
            "members": [
              {
                "constant": false,
                "id": 3569,
                "name": "exchanges",
                "nodeType": "VariableDeclaration",
                "scope": 3596,
                "src": "948:35:19",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                  "typeString": "mapping(uint8 => address)"
                },
                "typeName": {
                  "id": 3568,
                  "keyType": {
                    "id": 3566,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "956:5:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "948:25:19",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                    "typeString": "mapping(uint8 => address)"
                  },
                  "valueType": {
                    "id": 3567,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "965:7:19",
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
                "id": 3571,
                "name": "transferProxy",
                "nodeType": "VariableDeclaration",
                "scope": 3596,
                "src": "1043:21:19",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3570,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1043:7:19",
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
                "id": 3573,
                "name": "vault",
                "nodeType": "VariableDeclaration",
                "scope": 3596,
                "src": "1116:13:19",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3572,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1116:7:19",
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
                "id": 3577,
                "name": "validFactories",
                "nodeType": "VariableDeclaration",
                "scope": 3596,
                "src": "1189:39:19",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 3576,
                  "keyType": {
                    "id": 3574,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1197:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1189:24:19",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 3575,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1208:4:19",
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
                "id": 3580,
                "name": "factories",
                "nodeType": "VariableDeclaration",
                "scope": 3596,
                "src": "1286:19:19",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 3578,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1286:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 3579,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "1286:9:19",
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
                "id": 3584,
                "name": "validSets",
                "nodeType": "VariableDeclaration",
                "scope": 3596,
                "src": "1356:34:19",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 3583,
                  "keyType": {
                    "id": 3581,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1364:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1356:24:19",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 3582,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1375:4:19",
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
                "id": 3587,
                "name": "setTokens",
                "nodeType": "VariableDeclaration",
                "scope": 3596,
                "src": "1439:19:19",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 3585,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1439:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 3586,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "1439:9:19",
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
                "id": 3591,
                "name": "orderFills",
                "nodeType": "VariableDeclaration",
                "scope": 3596,
                "src": "1514:35:19",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 3590,
                  "keyType": {
                    "id": 3588,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1522:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1514:24:19",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 3589,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1533:4:19",
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
                "id": 3595,
                "name": "orderCancels",
                "nodeType": "VariableDeclaration",
                "scope": 3596,
                "src": "1607:37:19",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 3594,
                  "keyType": {
                    "id": 3592,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1615:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1607:24:19",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 3593,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1626:4:19",
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
            "scope": 3702,
            "src": "871:780:19",
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 3598,
            "name": "state",
            "nodeType": "VariableDeclaration",
            "scope": 3702,
            "src": "1710:18:19",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_struct$_State_$3596_storage",
              "typeString": "struct CoreState.State"
            },
            "typeName": {
              "contractScope": null,
              "id": 3597,
              "name": "State",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3596,
              "src": "1710:5:19",
              "typeDescriptions": {
                "typeIdentifier": "t_struct$_State_$3596_storage_ptr",
                "typeString": "struct CoreState.State"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3610,
              "nodeType": "Block",
              "src": "2094:52:19",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3605,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3598,
                        "src": "2111:5:19",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3596_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3606,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "exchanges",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3569,
                      "src": "2111:15:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                        "typeString": "mapping(uint8 => address)"
                      }
                    },
                    "id": 3608,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3607,
                      "name": "_exchangeId",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3600,
                      "src": "2127:11:19",
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
                    "src": "2111:28:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 3604,
                  "id": 3609,
                  "nodeType": "Return",
                  "src": "2104:35:19"
                }
              ]
            },
            "documentation": "Return address belonging to given exchangeId.\n     * @param  _exchangeId       ExchangeId number\n@return address           Address belonging to given exchangeId",
            "id": 3611,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "exchanges",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3601,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3600,
                  "name": "_exchangeId",
                  "nodeType": "VariableDeclaration",
                  "scope": 3611,
                  "src": "2013:17:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 3599,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "2013:5:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2003:33:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3604,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3603,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3611,
                  "src": "2081:7:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3602,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2081:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2080:9:19"
            },
            "scope": 3702,
            "src": "1985:161:19",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3619,
              "nodeType": "Block",
              "src": "2345:43:19",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3616,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3598,
                      "src": "2362:5:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3596_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3617,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "transferProxy",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3571,
                    "src": "2362:19:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 3615,
                  "id": 3618,
                  "nodeType": "Return",
                  "src": "2355:26:19"
                }
              ]
            },
            "documentation": "Return transferProxy address.\n     * @return address       transferProxy address",
            "id": 3620,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "transferProxy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3612,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2285:2:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3615,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3614,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3620,
                  "src": "2332:7:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3613,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2332:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2331:9:19"
            },
            "scope": 3702,
            "src": "2263:125:19",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3628,
              "nodeType": "Block",
              "src": "2563:35:19",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3625,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3598,
                      "src": "2580:5:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3596_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3626,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "vault",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3573,
                    "src": "2580:11:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 3624,
                  "id": 3627,
                  "nodeType": "Return",
                  "src": "2573:18:19"
                }
              ]
            },
            "documentation": "Return vault address\n     * @return address        vault address",
            "id": 3629,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "vault",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3621,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2503:2:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3624,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3623,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3629,
                  "src": "2550:7:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3622,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2550:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2549:9:19"
            },
            "scope": 3702,
            "src": "2489:109:19",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3641,
              "nodeType": "Block",
              "src": "2913:54:19",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3636,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3598,
                        "src": "2930:5:19",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3596_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3637,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validFactories",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3577,
                      "src": "2930:20:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 3639,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3638,
                      "name": "_factory",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3631,
                      "src": "2951:8:19",
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
                    "src": "2930:30:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 3635,
                  "id": 3640,
                  "nodeType": "Return",
                  "src": "2923:37:19"
                }
              ]
            },
            "documentation": "Return boolean indicating if address is valid factory.\n     * @param  _factory       Factory address\n@return bool           Boolean indicating if enabled factory",
            "id": 3642,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validFactories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3632,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3631,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3642,
                  "src": "2836:16:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3630,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2836:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2826:32:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3635,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3634,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3642,
                  "src": "2903:4:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3633,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "2903:4:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2902:6:19"
            },
            "scope": 3702,
            "src": "2803:164:19",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3651,
              "nodeType": "Block",
              "src": "3179:39:19",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3648,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3598,
                      "src": "3196:5:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3596_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3649,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "factories",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3580,
                    "src": "3196:15:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 3647,
                  "id": 3650,
                  "nodeType": "Return",
                  "src": "3189:22:19"
                }
              ]
            },
            "documentation": "Return array of all enabled factories.\n     * @return address[]      Array of enabled factories",
            "id": 3652,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "factories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3643,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3117:2:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3647,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3646,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3652,
                  "src": "3164:9:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3644,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3164:7:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3645,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3164:9:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3163:11:19"
            },
            "scope": 3702,
            "src": "3099:119:19",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3664,
              "nodeType": "Block",
              "src": "3510:45:19",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3659,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3598,
                        "src": "3527:5:19",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3596_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3660,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validSets",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3584,
                      "src": "3527:15:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 3662,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3661,
                      "name": "_set",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3654,
                      "src": "3543:4:19",
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
                    "src": "3527:21:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 3658,
                  "id": 3663,
                  "nodeType": "Return",
                  "src": "3520:28:19"
                }
              ]
            },
            "documentation": "Return boolean indicating if address is valid Set.\n     * @param  _set           Set address\n@return bool           Boolean indicating if valid Set",
            "id": 3665,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validSets",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3655,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3654,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3665,
                  "src": "3437:12:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3653,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3437:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3427:28:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3658,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3657,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3665,
                  "src": "3500:4:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3656,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "3500:4:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3499:6:19"
            },
            "scope": 3702,
            "src": "3409:146:19",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3674,
              "nodeType": "Block",
              "src": "3765:39:19",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3671,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3598,
                      "src": "3782:5:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3596_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3672,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "setTokens",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3587,
                    "src": "3782:15:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 3670,
                  "id": 3673,
                  "nodeType": "Return",
                  "src": "3775:22:19"
                }
              ]
            },
            "documentation": "Return array of all valid Set Tokens.\n     * @return address[]      Array of valid Set Tokens",
            "id": 3675,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "setTokens",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3666,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3703:2:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3670,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3669,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3675,
                  "src": "3750:9:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3667,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3750:7:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3668,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3750:9:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3749:11:19"
            },
            "scope": 3702,
            "src": "3685:119:19",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3687,
              "nodeType": "Block",
              "src": "4122:52:19",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3682,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3598,
                        "src": "4139:5:19",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3596_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3683,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderFills",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3591,
                      "src": "4139:16:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 3685,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3684,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3677,
                      "src": "4156:10:19",
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
                    "src": "4139:28:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3681,
                  "id": 3686,
                  "nodeType": "Return",
                  "src": "4132:35:19"
                }
              ]
            },
            "documentation": "Return amount of Issuance Order already filled\n     * @param  _orderHash       Issuance Order orderHash\n@return uint256             Amount of Issuance Order filled",
            "id": 3688,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderFills",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3678,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3677,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 3688,
                  "src": "4040:18:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3676,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "4040:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4030:34:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3681,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3680,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3688,
                  "src": "4109:7:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3679,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4109:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4108:9:19"
            },
            "scope": 3702,
            "src": "4011:163:19",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3700,
              "nodeType": "Block",
              "src": "4498:54:19",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3695,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3598,
                        "src": "4515:5:19",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3596_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3696,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderCancels",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3595,
                      "src": "4515:18:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 3698,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3697,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3690,
                      "src": "4534:10:19",
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
                    "src": "4515:30:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3694,
                  "id": 3699,
                  "nodeType": "Return",
                  "src": "4508:37:19"
                }
              ]
            },
            "documentation": "Return amount of Issuance Order already canceled\n     * @param  _orderHash       Issuance Order orderHash\n@return uint256             Amount of Issuance Order canceled",
            "id": 3701,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderCancels",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3691,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3690,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 3701,
                  "src": "4416:18:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3689,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "4416:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4406:34:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3694,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3693,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3701,
                  "src": "4485:7:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3692,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4485:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4484:9:19"
            },
            "scope": 3702,
            "src": "4385:167:19",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 3703,
        "src": "800:3754:19"
      }
    ],
    "src": "597:3958:19"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
    "exportedSymbols": {
      "CoreState": [
        3702
      ]
    },
    "id": 3703,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3565,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:19"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title CoreState\n@author Set Protocol\n * The CoreState library maintains all state for the Core contract thus\nallowing it to operate across multiple mixins.",
        "fullyImplemented": true,
        "id": 3702,
        "linearizedBaseContracts": [
          3702
        ],
        "name": "CoreState",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "CoreState.State",
            "id": 3596,
            "members": [
              {
                "constant": false,
                "id": 3569,
                "name": "exchanges",
                "nodeType": "VariableDeclaration",
                "scope": 3596,
                "src": "948:35:19",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                  "typeString": "mapping(uint8 => address)"
                },
                "typeName": {
                  "id": 3568,
                  "keyType": {
                    "id": 3566,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "956:5:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "948:25:19",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                    "typeString": "mapping(uint8 => address)"
                  },
                  "valueType": {
                    "id": 3567,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "965:7:19",
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
                "id": 3571,
                "name": "transferProxy",
                "nodeType": "VariableDeclaration",
                "scope": 3596,
                "src": "1043:21:19",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3570,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1043:7:19",
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
                "id": 3573,
                "name": "vault",
                "nodeType": "VariableDeclaration",
                "scope": 3596,
                "src": "1116:13:19",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 3572,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1116:7:19",
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
                "id": 3577,
                "name": "validFactories",
                "nodeType": "VariableDeclaration",
                "scope": 3596,
                "src": "1189:39:19",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 3576,
                  "keyType": {
                    "id": 3574,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1197:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1189:24:19",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 3575,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1208:4:19",
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
                "id": 3580,
                "name": "factories",
                "nodeType": "VariableDeclaration",
                "scope": 3596,
                "src": "1286:19:19",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 3578,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1286:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 3579,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "1286:9:19",
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
                "id": 3584,
                "name": "validSets",
                "nodeType": "VariableDeclaration",
                "scope": 3596,
                "src": "1356:34:19",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 3583,
                  "keyType": {
                    "id": 3581,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1364:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1356:24:19",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 3582,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1375:4:19",
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
                "id": 3587,
                "name": "setTokens",
                "nodeType": "VariableDeclaration",
                "scope": 3596,
                "src": "1439:19:19",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 3585,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1439:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 3586,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "1439:9:19",
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
                "id": 3591,
                "name": "orderFills",
                "nodeType": "VariableDeclaration",
                "scope": 3596,
                "src": "1514:35:19",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 3590,
                  "keyType": {
                    "id": 3588,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1522:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1514:24:19",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 3589,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1533:4:19",
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
                "id": 3595,
                "name": "orderCancels",
                "nodeType": "VariableDeclaration",
                "scope": 3596,
                "src": "1607:37:19",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 3594,
                  "keyType": {
                    "id": 3592,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1615:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1607:24:19",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 3593,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1626:4:19",
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
            "scope": 3702,
            "src": "871:780:19",
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 3598,
            "name": "state",
            "nodeType": "VariableDeclaration",
            "scope": 3702,
            "src": "1710:18:19",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_struct$_State_$3596_storage",
              "typeString": "struct CoreState.State"
            },
            "typeName": {
              "contractScope": null,
              "id": 3597,
              "name": "State",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3596,
              "src": "1710:5:19",
              "typeDescriptions": {
                "typeIdentifier": "t_struct$_State_$3596_storage_ptr",
                "typeString": "struct CoreState.State"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3610,
              "nodeType": "Block",
              "src": "2094:52:19",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3605,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3598,
                        "src": "2111:5:19",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3596_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3606,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "exchanges",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3569,
                      "src": "2111:15:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                        "typeString": "mapping(uint8 => address)"
                      }
                    },
                    "id": 3608,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3607,
                      "name": "_exchangeId",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3600,
                      "src": "2127:11:19",
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
                    "src": "2111:28:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 3604,
                  "id": 3609,
                  "nodeType": "Return",
                  "src": "2104:35:19"
                }
              ]
            },
            "documentation": "Return address belonging to given exchangeId.\n     * @param  _exchangeId       ExchangeId number\n@return address           Address belonging to given exchangeId",
            "id": 3611,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "exchanges",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3601,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3600,
                  "name": "_exchangeId",
                  "nodeType": "VariableDeclaration",
                  "scope": 3611,
                  "src": "2013:17:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 3599,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "2013:5:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2003:33:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3604,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3603,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3611,
                  "src": "2081:7:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3602,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2081:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2080:9:19"
            },
            "scope": 3702,
            "src": "1985:161:19",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3619,
              "nodeType": "Block",
              "src": "2345:43:19",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3616,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3598,
                      "src": "2362:5:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3596_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3617,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "transferProxy",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3571,
                    "src": "2362:19:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 3615,
                  "id": 3618,
                  "nodeType": "Return",
                  "src": "2355:26:19"
                }
              ]
            },
            "documentation": "Return transferProxy address.\n     * @return address       transferProxy address",
            "id": 3620,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "transferProxy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3612,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2285:2:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3615,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3614,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3620,
                  "src": "2332:7:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3613,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2332:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2331:9:19"
            },
            "scope": 3702,
            "src": "2263:125:19",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3628,
              "nodeType": "Block",
              "src": "2563:35:19",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3625,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3598,
                      "src": "2580:5:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3596_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3626,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "vault",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3573,
                    "src": "2580:11:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 3624,
                  "id": 3627,
                  "nodeType": "Return",
                  "src": "2573:18:19"
                }
              ]
            },
            "documentation": "Return vault address\n     * @return address        vault address",
            "id": 3629,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "vault",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3621,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2503:2:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3624,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3623,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3629,
                  "src": "2550:7:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3622,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2550:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2549:9:19"
            },
            "scope": 3702,
            "src": "2489:109:19",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3641,
              "nodeType": "Block",
              "src": "2913:54:19",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3636,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3598,
                        "src": "2930:5:19",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3596_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3637,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validFactories",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3577,
                      "src": "2930:20:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 3639,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3638,
                      "name": "_factory",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3631,
                      "src": "2951:8:19",
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
                    "src": "2930:30:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 3635,
                  "id": 3640,
                  "nodeType": "Return",
                  "src": "2923:37:19"
                }
              ]
            },
            "documentation": "Return boolean indicating if address is valid factory.\n     * @param  _factory       Factory address\n@return bool           Boolean indicating if enabled factory",
            "id": 3642,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validFactories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3632,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3631,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 3642,
                  "src": "2836:16:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3630,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2836:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2826:32:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3635,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3634,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3642,
                  "src": "2903:4:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3633,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "2903:4:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2902:6:19"
            },
            "scope": 3702,
            "src": "2803:164:19",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3651,
              "nodeType": "Block",
              "src": "3179:39:19",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3648,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3598,
                      "src": "3196:5:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3596_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3649,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "factories",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3580,
                    "src": "3196:15:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 3647,
                  "id": 3650,
                  "nodeType": "Return",
                  "src": "3189:22:19"
                }
              ]
            },
            "documentation": "Return array of all enabled factories.\n     * @return address[]      Array of enabled factories",
            "id": 3652,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "factories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3643,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3117:2:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3647,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3646,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3652,
                  "src": "3164:9:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3644,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3164:7:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3645,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3164:9:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3163:11:19"
            },
            "scope": 3702,
            "src": "3099:119:19",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3664,
              "nodeType": "Block",
              "src": "3510:45:19",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3659,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3598,
                        "src": "3527:5:19",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3596_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3660,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validSets",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3584,
                      "src": "3527:15:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 3662,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3661,
                      "name": "_set",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3654,
                      "src": "3543:4:19",
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
                    "src": "3527:21:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 3658,
                  "id": 3663,
                  "nodeType": "Return",
                  "src": "3520:28:19"
                }
              ]
            },
            "documentation": "Return boolean indicating if address is valid Set.\n     * @param  _set           Set address\n@return bool           Boolean indicating if valid Set",
            "id": 3665,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validSets",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3655,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3654,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 3665,
                  "src": "3437:12:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3653,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3437:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3427:28:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3658,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3657,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3665,
                  "src": "3500:4:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3656,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "3500:4:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3499:6:19"
            },
            "scope": 3702,
            "src": "3409:146:19",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3674,
              "nodeType": "Block",
              "src": "3765:39:19",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 3671,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3598,
                      "src": "3782:5:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$3596_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 3672,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "setTokens",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3587,
                    "src": "3782:15:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 3670,
                  "id": 3673,
                  "nodeType": "Return",
                  "src": "3775:22:19"
                }
              ]
            },
            "documentation": "Return array of all valid Set Tokens.\n     * @return address[]      Array of valid Set Tokens",
            "id": 3675,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "setTokens",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3666,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3703:2:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3670,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3669,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3675,
                  "src": "3750:9:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3667,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3750:7:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3668,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3750:9:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3749:11:19"
            },
            "scope": 3702,
            "src": "3685:119:19",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3687,
              "nodeType": "Block",
              "src": "4122:52:19",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3682,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3598,
                        "src": "4139:5:19",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3596_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3683,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderFills",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3591,
                      "src": "4139:16:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 3685,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3684,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3677,
                      "src": "4156:10:19",
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
                    "src": "4139:28:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3681,
                  "id": 3686,
                  "nodeType": "Return",
                  "src": "4132:35:19"
                }
              ]
            },
            "documentation": "Return amount of Issuance Order already filled\n     * @param  _orderHash       Issuance Order orderHash\n@return uint256             Amount of Issuance Order filled",
            "id": 3688,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderFills",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3678,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3677,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 3688,
                  "src": "4040:18:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3676,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "4040:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4030:34:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3681,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3680,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3688,
                  "src": "4109:7:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3679,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4109:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4108:9:19"
            },
            "scope": 3702,
            "src": "4011:163:19",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 3700,
              "nodeType": "Block",
              "src": "4498:54:19",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 3695,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3598,
                        "src": "4515:5:19",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3596_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 3696,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderCancels",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3595,
                      "src": "4515:18:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 3698,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 3697,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3690,
                      "src": "4534:10:19",
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
                    "src": "4515:30:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3694,
                  "id": 3699,
                  "nodeType": "Return",
                  "src": "4508:37:19"
                }
              ]
            },
            "documentation": "Return amount of Issuance Order already canceled\n     * @param  _orderHash       Issuance Order orderHash\n@return uint256             Amount of Issuance Order canceled",
            "id": 3701,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderCancels",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3691,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3690,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 3701,
                  "src": "4416:18:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3689,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "4416:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4406:34:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 3694,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3693,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3701,
                  "src": "4485:7:19",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3692,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4485:7:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4484:9:19"
            },
            "scope": 3702,
            "src": "4385:167:19",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 3703,
        "src": "800:3754:19"
      }
    ],
    "src": "597:3958:19"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-23T23:58:05.594Z"
}