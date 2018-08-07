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
  "sourceMap": "800:3742:14:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;800:3742:14;;;;;;;",
  "deployedSourceMap": "800:3742:14:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2803:164;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2803:164:14;-1:-1:-1;;;;;2803:164:14;;;;;;;;;;;;;;;;;;;;;;;4376;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4376:164:14;;;;;;;;;;;;;;;;;;;;;3685:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3685:119:14;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;3685:119:14;;;;;;;;;;;;;;;;;2263:125;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2263:125:14;;;;;;;;-1:-1:-1;;;;;2263:125:14;;;;;;;;;;;;;;1985:161;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1985:161:14;;;;;;;1710:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1710:18:14;;;;;;;;-1:-1:-1;;;;;1710:18:14;;;;;;;;;;;;;;;;;;;;;;;;4008:160;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4008:160:14;;;;;2489:109;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2489:109:14;;;;3099:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3099:119:14;;;;3409:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3409:146:14;-1:-1:-1;;;;;3409:146:14;;;;;2803:164;-1:-1:-1;;;;;2930:30:14;2903:4;2930:30;;;:20;:30;;;;;;;;;2803:164::o;4376:::-;4476:4;4503:30;;;:18;:30;;;;;;;4376:164::o;3685:119::-;3750:9;3782:5;:15;;3775:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3775:22:14;;;;;;;;;;;;;;;;;;;;;;;3685:119;:::o;2263:125::-;2362:19;;-1:-1:-1;;;;;2362:19:14;2263:125;:::o;1985:161::-;2111:28;;2081:7;2111:28;;;;;;;;;;;-1:-1:-1;;;;;2111:28:14;;1985:161::o;1710:18::-;;;;;-1:-1:-1;;;;;1710:18:14;;;;;;:::o;4008:160::-;4106:4;4133:28;;;:16;:28;;;;;;;4008:160::o;2489:109::-;2580:11;;-1:-1:-1;;;;;2580:11:14;2489:109;:::o;3099:119::-;3164:9;3196:5;:15;;3189:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3189:22:14;;;;;;;;;;;;;;;;;;;;;;3099:119;:::o;3409:146::-;-1:-1:-1;;;;;3527:21:14;3500:4;3527:21;;;:15;:21;;;;;;;;;3409:146::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\n/**\n * @title CoreState\n * @author Set Protocol\n *\n * The CoreState library maintains all state for the Core contract thus\n * allowing it to operate across multiple mixins.\n */\ncontract CoreState {\n\n    /* ============ Structs ============ */\n\n    struct State {\n        // Mapping of exchange enumeration to address\n        mapping(uint8 => address) exchanges;\n\n        // Address of the TransferProxy contract\n        address transferProxy;\n\n        // Address of the Vault contract\n        address vault;\n\n        // Mapping of tracked SetToken factories\n        mapping(address => bool) validFactories;\n\n        // Array of tracked SetToken factories\n        address[] factories;\n\n        // Mapping of tracked SetTokens\n        mapping(address => bool) validSets;\n\n        // Array of tracked SetTokens\n        address[] setTokens;\n\n        // Mapping of filled Issuance Orders\n        mapping(bytes32 => uint) orderFills;\n\n        // Mapping of canceled Issuance Orders\n        mapping(bytes32 => uint) orderCancels;\n    }\n\n    /* ============ State Variables ============ */\n\n    State public state;\n\n    /* ============ Public Getters ============ */\n\n    /**\n     * Return address belonging to given exchangeId.\n     *\n     * @param  _exchangeId       ExchangeId number\n     * @return address           Address belonging to given exchangeId\n     */\n    function exchanges(\n        uint8 _exchangeId\n    )\n        public\n        view\n        returns(address)\n    {\n        return state.exchanges[_exchangeId];\n    }\n\n    /**\n     * Return transferProxy address.\n     *\n     * @return address       transferProxy address\n     */\n    function transferProxy()\n        public\n        view\n        returns(address)\n    {\n        return state.transferProxy;\n    }\n\n    /**\n     * Return vault address\n     *\n     * @return address        vault address\n     */\n    function vault()\n        public\n        view\n        returns(address)\n    {\n        return state.vault;\n    }\n\n    /**\n     * Return boolean indicating if address is valid factory.\n     *\n     * @param  _factory       Factory address\n     * @return bool           Boolean indicating if enabled factory\n     */\n    function validFactories(\n        address _factory\n    )\n        public\n        view\n        returns(bool)\n    {\n        return state.validFactories[_factory];\n    }\n\n    /**\n     * Return array of all enabled factories.\n     *\n     * @return address[]      Array of enabled factories\n     */\n    function factories()\n        public\n        view\n        returns(address[])\n    {\n        return state.factories;\n    }\n\n    /**\n     * Return boolean indicating if address is valid Set.\n     *\n     * @param  _set           Set address\n     * @return bool           Boolean indicating if valid Set\n     */\n    function validSets(\n        address _set\n    )\n        public\n        view\n        returns(bool)\n    {\n        return state.validSets[_set];\n    }\n\n    /**\n     * Return array of all valid Set Tokens.\n     *\n     * @return address[]      Array of valid Set Tokens\n     */\n    function setTokens()\n        public\n        view\n        returns(address[])\n    {\n        return state.setTokens;\n    }\n\n    /**\n     * Return amount of Issuance Order already filled\n     *\n     * @param  _orderHash       Issuance Order orderHash\n     * @return uint             Amount of Issuance Order filled\n     */\n    function orderFills(\n        bytes32 _orderHash\n    )\n        public\n        view\n        returns(uint)\n    {\n        return state.orderFills[_orderHash];\n    }\n\n    /**\n     * Return amount of Issuance Order already canceled\n     *\n     * @param  _orderHash       Issuance Order orderHash\n     * @return uint             Amount of Issuance Order canceled\n     */\n    function orderCancels(\n        bytes32 _orderHash\n    )\n        public\n        view\n        returns(uint)\n    {\n        return state.orderCancels[_orderHash];\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
    "exportedSymbols": {
      "CoreState": [
        2093
      ]
    },
    "id": 2094,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1956,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:14"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title CoreState\n@author Set Protocol\n * The CoreState library maintains all state for the Core contract thus\nallowing it to operate across multiple mixins.",
        "fullyImplemented": true,
        "id": 2093,
        "linearizedBaseContracts": [
          2093
        ],
        "name": "CoreState",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "CoreState.State",
            "id": 1987,
            "members": [
              {
                "constant": false,
                "id": 1960,
                "name": "exchanges",
                "nodeType": "VariableDeclaration",
                "scope": 1987,
                "src": "948:35:14",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                  "typeString": "mapping(uint8 => address)"
                },
                "typeName": {
                  "id": 1959,
                  "keyType": {
                    "id": 1957,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "956:5:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "948:25:14",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                    "typeString": "mapping(uint8 => address)"
                  },
                  "valueType": {
                    "id": 1958,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "965:7:14",
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
                "id": 1962,
                "name": "transferProxy",
                "nodeType": "VariableDeclaration",
                "scope": 1987,
                "src": "1043:21:14",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 1961,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1043:7:14",
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
                "id": 1964,
                "name": "vault",
                "nodeType": "VariableDeclaration",
                "scope": 1987,
                "src": "1116:13:14",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 1963,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1116:7:14",
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
                "id": 1968,
                "name": "validFactories",
                "nodeType": "VariableDeclaration",
                "scope": 1987,
                "src": "1189:39:14",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 1967,
                  "keyType": {
                    "id": 1965,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1197:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1189:24:14",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 1966,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1208:4:14",
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
                "id": 1971,
                "name": "factories",
                "nodeType": "VariableDeclaration",
                "scope": 1987,
                "src": "1286:19:14",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 1969,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1286:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1970,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "1286:9:14",
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
                "id": 1975,
                "name": "validSets",
                "nodeType": "VariableDeclaration",
                "scope": 1987,
                "src": "1356:34:14",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 1974,
                  "keyType": {
                    "id": 1972,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1364:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1356:24:14",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 1973,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1375:4:14",
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
                "id": 1978,
                "name": "setTokens",
                "nodeType": "VariableDeclaration",
                "scope": 1987,
                "src": "1439:19:14",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 1976,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1439:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1977,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "1439:9:14",
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
                "id": 1982,
                "name": "orderFills",
                "nodeType": "VariableDeclaration",
                "scope": 1987,
                "src": "1514:35:14",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 1981,
                  "keyType": {
                    "id": 1979,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1522:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1514:24:14",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 1980,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1533:4:14",
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
                "id": 1986,
                "name": "orderCancels",
                "nodeType": "VariableDeclaration",
                "scope": 1987,
                "src": "1607:37:14",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 1985,
                  "keyType": {
                    "id": 1983,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1615:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1607:24:14",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 1984,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1626:4:14",
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
            "scope": 2093,
            "src": "871:780:14",
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 1989,
            "name": "state",
            "nodeType": "VariableDeclaration",
            "scope": 2093,
            "src": "1710:18:14",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_struct$_State_$1987_storage",
              "typeString": "struct CoreState.State"
            },
            "typeName": {
              "contractScope": null,
              "id": 1988,
              "name": "State",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 1987,
              "src": "1710:5:14",
              "typeDescriptions": {
                "typeIdentifier": "t_struct$_State_$1987_storage_ptr",
                "typeString": "struct CoreState.State"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2001,
              "nodeType": "Block",
              "src": "2094:52:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1996,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1989,
                        "src": "2111:5:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$1987_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1997,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "exchanges",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1960,
                      "src": "2111:15:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                        "typeString": "mapping(uint8 => address)"
                      }
                    },
                    "id": 1999,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 1998,
                      "name": "_exchangeId",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1991,
                      "src": "2127:11:14",
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
                    "src": "2111:28:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 1995,
                  "id": 2000,
                  "nodeType": "Return",
                  "src": "2104:35:14"
                }
              ]
            },
            "documentation": "Return address belonging to given exchangeId.\n     * @param  _exchangeId       ExchangeId number\n@return address           Address belonging to given exchangeId",
            "id": 2002,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "exchanges",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1992,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1991,
                  "name": "_exchangeId",
                  "nodeType": "VariableDeclaration",
                  "scope": 2002,
                  "src": "2013:17:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 1990,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "2013:5:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2003:33:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 1995,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1994,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2002,
                  "src": "2081:7:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1993,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2081:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2080:9:14"
            },
            "scope": 2093,
            "src": "1985:161:14",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2010,
              "nodeType": "Block",
              "src": "2345:43:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 2007,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1989,
                      "src": "2362:5:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$1987_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 2008,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "transferProxy",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 1962,
                    "src": "2362:19:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 2006,
                  "id": 2009,
                  "nodeType": "Return",
                  "src": "2355:26:14"
                }
              ]
            },
            "documentation": "Return transferProxy address.\n     * @return address       transferProxy address",
            "id": 2011,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "transferProxy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2003,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2285:2:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2006,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2005,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2011,
                  "src": "2332:7:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2004,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2332:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2331:9:14"
            },
            "scope": 2093,
            "src": "2263:125:14",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2019,
              "nodeType": "Block",
              "src": "2563:35:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 2016,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1989,
                      "src": "2580:5:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$1987_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 2017,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "vault",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 1964,
                    "src": "2580:11:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 2015,
                  "id": 2018,
                  "nodeType": "Return",
                  "src": "2573:18:14"
                }
              ]
            },
            "documentation": "Return vault address\n     * @return address        vault address",
            "id": 2020,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "vault",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2012,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2503:2:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2015,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2014,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2020,
                  "src": "2550:7:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2013,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2550:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2549:9:14"
            },
            "scope": 2093,
            "src": "2489:109:14",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2032,
              "nodeType": "Block",
              "src": "2913:54:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2027,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1989,
                        "src": "2930:5:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$1987_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2028,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validFactories",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1968,
                      "src": "2930:20:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 2030,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2029,
                      "name": "_factory",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2022,
                      "src": "2951:8:14",
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
                    "src": "2930:30:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 2026,
                  "id": 2031,
                  "nodeType": "Return",
                  "src": "2923:37:14"
                }
              ]
            },
            "documentation": "Return boolean indicating if address is valid factory.\n     * @param  _factory       Factory address\n@return bool           Boolean indicating if enabled factory",
            "id": 2033,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validFactories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2023,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2022,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 2033,
                  "src": "2836:16:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2021,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2836:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2826:32:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2026,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2025,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2033,
                  "src": "2903:4:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 2024,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "2903:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2902:6:14"
            },
            "scope": 2093,
            "src": "2803:164:14",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2042,
              "nodeType": "Block",
              "src": "3179:39:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 2039,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1989,
                      "src": "3196:5:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$1987_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 2040,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "factories",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 1971,
                    "src": "3196:15:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 2038,
                  "id": 2041,
                  "nodeType": "Return",
                  "src": "3189:22:14"
                }
              ]
            },
            "documentation": "Return array of all enabled factories.\n     * @return address[]      Array of enabled factories",
            "id": 2043,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "factories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2034,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3117:2:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2038,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2037,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2043,
                  "src": "3164:9:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2035,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3164:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2036,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3164:9:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3163:11:14"
            },
            "scope": 2093,
            "src": "3099:119:14",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2055,
              "nodeType": "Block",
              "src": "3510:45:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2050,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1989,
                        "src": "3527:5:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$1987_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2051,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validSets",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1975,
                      "src": "3527:15:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 2053,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2052,
                      "name": "_set",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2045,
                      "src": "3543:4:14",
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
                    "src": "3527:21:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 2049,
                  "id": 2054,
                  "nodeType": "Return",
                  "src": "3520:28:14"
                }
              ]
            },
            "documentation": "Return boolean indicating if address is valid Set.\n     * @param  _set           Set address\n@return bool           Boolean indicating if valid Set",
            "id": 2056,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validSets",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2046,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2045,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 2056,
                  "src": "3437:12:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2044,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3437:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3427:28:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2049,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2048,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2056,
                  "src": "3500:4:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 2047,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "3500:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3499:6:14"
            },
            "scope": 2093,
            "src": "3409:146:14",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2065,
              "nodeType": "Block",
              "src": "3765:39:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 2062,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1989,
                      "src": "3782:5:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$1987_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 2063,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "setTokens",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 1978,
                    "src": "3782:15:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 2061,
                  "id": 2064,
                  "nodeType": "Return",
                  "src": "3775:22:14"
                }
              ]
            },
            "documentation": "Return array of all valid Set Tokens.\n     * @return address[]      Array of valid Set Tokens",
            "id": 2066,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "setTokens",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2057,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3703:2:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2061,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2060,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2066,
                  "src": "3750:9:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2058,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3750:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2059,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3750:9:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3749:11:14"
            },
            "scope": 2093,
            "src": "3685:119:14",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2078,
              "nodeType": "Block",
              "src": "4116:52:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2073,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1989,
                        "src": "4133:5:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$1987_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2074,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderFills",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1982,
                      "src": "4133:16:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 2076,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2075,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2068,
                      "src": "4150:10:14",
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
                    "src": "4133:28:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 2072,
                  "id": 2077,
                  "nodeType": "Return",
                  "src": "4126:35:14"
                }
              ]
            },
            "documentation": "Return amount of Issuance Order already filled\n     * @param  _orderHash       Issuance Order orderHash\n@return uint             Amount of Issuance Order filled",
            "id": 2079,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderFills",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2069,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2068,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 2079,
                  "src": "4037:18:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 2067,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "4037:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4027:34:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2072,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2071,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2079,
                  "src": "4106:4:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2070,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4106:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4105:6:14"
            },
            "scope": 2093,
            "src": "4008:160:14",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2091,
              "nodeType": "Block",
              "src": "4486:54:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2086,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1989,
                        "src": "4503:5:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$1987_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2087,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderCancels",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1986,
                      "src": "4503:18:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 2089,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2088,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2081,
                      "src": "4522:10:14",
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
                    "src": "4503:30:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 2085,
                  "id": 2090,
                  "nodeType": "Return",
                  "src": "4496:37:14"
                }
              ]
            },
            "documentation": "Return amount of Issuance Order already canceled\n     * @param  _orderHash       Issuance Order orderHash\n@return uint             Amount of Issuance Order canceled",
            "id": 2092,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderCancels",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2082,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2081,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 2092,
                  "src": "4407:18:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 2080,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "4407:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4397:34:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2085,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2084,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2092,
                  "src": "4476:4:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2083,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4476:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4475:6:14"
            },
            "scope": 2093,
            "src": "4376:164:14",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 2094,
        "src": "800:3742:14"
      }
    ],
    "src": "597:3946:14"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
    "exportedSymbols": {
      "CoreState": [
        2093
      ]
    },
    "id": 2094,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1956,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:14"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title CoreState\n@author Set Protocol\n * The CoreState library maintains all state for the Core contract thus\nallowing it to operate across multiple mixins.",
        "fullyImplemented": true,
        "id": 2093,
        "linearizedBaseContracts": [
          2093
        ],
        "name": "CoreState",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "CoreState.State",
            "id": 1987,
            "members": [
              {
                "constant": false,
                "id": 1960,
                "name": "exchanges",
                "nodeType": "VariableDeclaration",
                "scope": 1987,
                "src": "948:35:14",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                  "typeString": "mapping(uint8 => address)"
                },
                "typeName": {
                  "id": 1959,
                  "keyType": {
                    "id": 1957,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "956:5:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "948:25:14",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                    "typeString": "mapping(uint8 => address)"
                  },
                  "valueType": {
                    "id": 1958,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "965:7:14",
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
                "id": 1962,
                "name": "transferProxy",
                "nodeType": "VariableDeclaration",
                "scope": 1987,
                "src": "1043:21:14",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 1961,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1043:7:14",
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
                "id": 1964,
                "name": "vault",
                "nodeType": "VariableDeclaration",
                "scope": 1987,
                "src": "1116:13:14",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 1963,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1116:7:14",
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
                "id": 1968,
                "name": "validFactories",
                "nodeType": "VariableDeclaration",
                "scope": 1987,
                "src": "1189:39:14",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 1967,
                  "keyType": {
                    "id": 1965,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1197:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1189:24:14",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 1966,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1208:4:14",
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
                "id": 1971,
                "name": "factories",
                "nodeType": "VariableDeclaration",
                "scope": 1987,
                "src": "1286:19:14",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 1969,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1286:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1970,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "1286:9:14",
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
                "id": 1975,
                "name": "validSets",
                "nodeType": "VariableDeclaration",
                "scope": 1987,
                "src": "1356:34:14",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                  "typeString": "mapping(address => bool)"
                },
                "typeName": {
                  "id": 1974,
                  "keyType": {
                    "id": 1972,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1364:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1356:24:14",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                    "typeString": "mapping(address => bool)"
                  },
                  "valueType": {
                    "id": 1973,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1375:4:14",
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
                "id": 1978,
                "name": "setTokens",
                "nodeType": "VariableDeclaration",
                "scope": 1987,
                "src": "1439:19:14",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 1976,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1439:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1977,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "1439:9:14",
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
                "id": 1982,
                "name": "orderFills",
                "nodeType": "VariableDeclaration",
                "scope": 1987,
                "src": "1514:35:14",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 1981,
                  "keyType": {
                    "id": 1979,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1522:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1514:24:14",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 1980,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1533:4:14",
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
                "id": 1986,
                "name": "orderCancels",
                "nodeType": "VariableDeclaration",
                "scope": 1987,
                "src": "1607:37:14",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                  "typeString": "mapping(bytes32 => uint256)"
                },
                "typeName": {
                  "id": 1985,
                  "keyType": {
                    "id": 1983,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1615:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "nodeType": "Mapping",
                  "src": "1607:24:14",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                    "typeString": "mapping(bytes32 => uint256)"
                  },
                  "valueType": {
                    "id": 1984,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1626:4:14",
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
            "scope": 2093,
            "src": "871:780:14",
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 1989,
            "name": "state",
            "nodeType": "VariableDeclaration",
            "scope": 2093,
            "src": "1710:18:14",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_struct$_State_$1987_storage",
              "typeString": "struct CoreState.State"
            },
            "typeName": {
              "contractScope": null,
              "id": 1988,
              "name": "State",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 1987,
              "src": "1710:5:14",
              "typeDescriptions": {
                "typeIdentifier": "t_struct$_State_$1987_storage_ptr",
                "typeString": "struct CoreState.State"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2001,
              "nodeType": "Block",
              "src": "2094:52:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1996,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1989,
                        "src": "2111:5:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$1987_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1997,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "exchanges",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1960,
                      "src": "2111:15:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                        "typeString": "mapping(uint8 => address)"
                      }
                    },
                    "id": 1999,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 1998,
                      "name": "_exchangeId",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1991,
                      "src": "2127:11:14",
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
                    "src": "2111:28:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 1995,
                  "id": 2000,
                  "nodeType": "Return",
                  "src": "2104:35:14"
                }
              ]
            },
            "documentation": "Return address belonging to given exchangeId.\n     * @param  _exchangeId       ExchangeId number\n@return address           Address belonging to given exchangeId",
            "id": 2002,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "exchanges",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1992,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1991,
                  "name": "_exchangeId",
                  "nodeType": "VariableDeclaration",
                  "scope": 2002,
                  "src": "2013:17:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 1990,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "2013:5:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2003:33:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 1995,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1994,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2002,
                  "src": "2081:7:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1993,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2081:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2080:9:14"
            },
            "scope": 2093,
            "src": "1985:161:14",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2010,
              "nodeType": "Block",
              "src": "2345:43:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 2007,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1989,
                      "src": "2362:5:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$1987_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 2008,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "transferProxy",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 1962,
                    "src": "2362:19:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 2006,
                  "id": 2009,
                  "nodeType": "Return",
                  "src": "2355:26:14"
                }
              ]
            },
            "documentation": "Return transferProxy address.\n     * @return address       transferProxy address",
            "id": 2011,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "transferProxy",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2003,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2285:2:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2006,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2005,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2011,
                  "src": "2332:7:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2004,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2332:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2331:9:14"
            },
            "scope": 2093,
            "src": "2263:125:14",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2019,
              "nodeType": "Block",
              "src": "2563:35:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 2016,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1989,
                      "src": "2580:5:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$1987_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 2017,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "vault",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 1964,
                    "src": "2580:11:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 2015,
                  "id": 2018,
                  "nodeType": "Return",
                  "src": "2573:18:14"
                }
              ]
            },
            "documentation": "Return vault address\n     * @return address        vault address",
            "id": 2020,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "vault",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2012,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2503:2:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2015,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2014,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2020,
                  "src": "2550:7:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2013,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2550:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2549:9:14"
            },
            "scope": 2093,
            "src": "2489:109:14",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2032,
              "nodeType": "Block",
              "src": "2913:54:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2027,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1989,
                        "src": "2930:5:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$1987_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2028,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validFactories",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1968,
                      "src": "2930:20:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 2030,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2029,
                      "name": "_factory",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2022,
                      "src": "2951:8:14",
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
                    "src": "2930:30:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 2026,
                  "id": 2031,
                  "nodeType": "Return",
                  "src": "2923:37:14"
                }
              ]
            },
            "documentation": "Return boolean indicating if address is valid factory.\n     * @param  _factory       Factory address\n@return bool           Boolean indicating if enabled factory",
            "id": 2033,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validFactories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2023,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2022,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 2033,
                  "src": "2836:16:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2021,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2836:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2826:32:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2026,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2025,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2033,
                  "src": "2903:4:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 2024,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "2903:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2902:6:14"
            },
            "scope": 2093,
            "src": "2803:164:14",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2042,
              "nodeType": "Block",
              "src": "3179:39:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 2039,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1989,
                      "src": "3196:5:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$1987_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 2040,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "factories",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 1971,
                    "src": "3196:15:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 2038,
                  "id": 2041,
                  "nodeType": "Return",
                  "src": "3189:22:14"
                }
              ]
            },
            "documentation": "Return array of all enabled factories.\n     * @return address[]      Array of enabled factories",
            "id": 2043,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "factories",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2034,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3117:2:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2038,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2037,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2043,
                  "src": "3164:9:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2035,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3164:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2036,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3164:9:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3163:11:14"
            },
            "scope": 2093,
            "src": "3099:119:14",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2055,
              "nodeType": "Block",
              "src": "3510:45:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2050,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1989,
                        "src": "3527:5:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$1987_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2051,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validSets",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1975,
                      "src": "3527:15:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                        "typeString": "mapping(address => bool)"
                      }
                    },
                    "id": 2053,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2052,
                      "name": "_set",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2045,
                      "src": "3543:4:14",
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
                    "src": "3527:21:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 2049,
                  "id": 2054,
                  "nodeType": "Return",
                  "src": "3520:28:14"
                }
              ]
            },
            "documentation": "Return boolean indicating if address is valid Set.\n     * @param  _set           Set address\n@return bool           Boolean indicating if valid Set",
            "id": 2056,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validSets",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2046,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2045,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 2056,
                  "src": "3437:12:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2044,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3437:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3427:28:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2049,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2048,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2056,
                  "src": "3500:4:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 2047,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "3500:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3499:6:14"
            },
            "scope": 2093,
            "src": "3409:146:14",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2065,
              "nodeType": "Block",
              "src": "3765:39:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 2062,
                      "name": "state",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1989,
                      "src": "3782:5:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_State_$1987_storage",
                        "typeString": "struct CoreState.State storage ref"
                      }
                    },
                    "id": 2063,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "setTokens",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 1978,
                    "src": "3782:15:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 2061,
                  "id": 2064,
                  "nodeType": "Return",
                  "src": "3775:22:14"
                }
              ]
            },
            "documentation": "Return array of all valid Set Tokens.\n     * @return address[]      Array of valid Set Tokens",
            "id": 2066,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "setTokens",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2057,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3703:2:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2061,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2060,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2066,
                  "src": "3750:9:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2058,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3750:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2059,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3750:9:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3749:11:14"
            },
            "scope": 2093,
            "src": "3685:119:14",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2078,
              "nodeType": "Block",
              "src": "4116:52:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2073,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1989,
                        "src": "4133:5:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$1987_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2074,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderFills",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1982,
                      "src": "4133:16:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 2076,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2075,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2068,
                      "src": "4150:10:14",
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
                    "src": "4133:28:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 2072,
                  "id": 2077,
                  "nodeType": "Return",
                  "src": "4126:35:14"
                }
              ]
            },
            "documentation": "Return amount of Issuance Order already filled\n     * @param  _orderHash       Issuance Order orderHash\n@return uint             Amount of Issuance Order filled",
            "id": 2079,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderFills",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2069,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2068,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 2079,
                  "src": "4037:18:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 2067,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "4037:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4027:34:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2072,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2071,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2079,
                  "src": "4106:4:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2070,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4106:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4105:6:14"
            },
            "scope": 2093,
            "src": "4008:160:14",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2091,
              "nodeType": "Block",
              "src": "4486:54:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2086,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1989,
                        "src": "4503:5:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$1987_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2087,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "orderCancels",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1986,
                      "src": "4503:18:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                        "typeString": "mapping(bytes32 => uint256)"
                      }
                    },
                    "id": 2089,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 2088,
                      "name": "_orderHash",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2081,
                      "src": "4522:10:14",
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
                    "src": "4503:30:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 2085,
                  "id": 2090,
                  "nodeType": "Return",
                  "src": "4496:37:14"
                }
              ]
            },
            "documentation": "Return amount of Issuance Order already canceled\n     * @param  _orderHash       Issuance Order orderHash\n@return uint             Amount of Issuance Order canceled",
            "id": 2092,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "orderCancels",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2082,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2081,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 2092,
                  "src": "4407:18:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 2080,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "4407:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4397:34:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2085,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2084,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2092,
                  "src": "4476:4:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2083,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4476:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4475:6:14"
            },
            "scope": 2093,
            "src": "4376:164:14",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 2094,
        "src": "800:3742:14"
      }
    ],
    "src": "597:3946:14"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-07T05:35:59.459Z"
}