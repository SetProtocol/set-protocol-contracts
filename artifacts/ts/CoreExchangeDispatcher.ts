export const CoreExchangeDispatcher = 
{
  "contractName": "CoreExchangeDispatcher",
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
      "constant": false,
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
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
      "constant": false,
      "inputs": [
        {
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
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
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "_exchangeId",
          "type": "uint8"
        },
        {
          "indexed": false,
          "name": "_exchange",
          "type": "address"
        }
      ],
      "name": "ExchangeRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipRenounced",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_exchangeId",
          "type": "uint8"
        },
        {
          "name": "_exchange",
          "type": "address"
        }
      ],
      "name": "registerExchange",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405260008054600160a060020a03191633179055610646806100256000396000f3006080604052600436106100cf5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100d45780631e912bd6146101095780633e3d13b214610133578063559ed3391461015c5780636e667db3146101c1578063715018a6146101f25780638da5cb5b14610207578063a003e0691461021c578063c19d93fb14610237578063f2fde38b14610272578063f7213db614610293578063fbfa77cf146102ab578063fe5b38e4146102c0578063fef3ee73146102d5575b600080fd5b3480156100e057600080fd5b506100f5600160a060020a03600435166102f6565b604080519115158252519081900360200190f35b34801561011557600080fd5b50610121600435610314565b60408051918252519081900360200190f35b34801561013f57600080fd5b5061015a60ff60043516600160a060020a0360243516610326565b005b34801561016857600080fd5b506101716103b5565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101ad578181015183820152602001610195565b505050509050019250505060405180910390f35b3480156101cd57600080fd5b506101d661041a565b60408051600160a060020a039092168252519081900360200190f35b3480156101fe57600080fd5b5061015a610429565b34801561021357600080fd5b506101d6610495565b34801561022857600080fd5b506101d660ff600435166104a4565b34801561024357600080fd5b5061024c6104c2565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b34801561027e57600080fd5b5061015a600160a060020a03600435166104d8565b34801561029f57600080fd5b506101216004356104fb565b3480156102b757600080fd5b506101d661050d565b3480156102cc57600080fd5b5061017161051c565b3480156102e157600080fd5b506100f5600160a060020a036004351661057f565b600160a060020a031660009081526004602052604090205460ff1690565b60009081526009602052604090205490565b600054600160a060020a0316331461033d57600080fd5b60ff8216600081815260016020908152604091829020805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03861690811790915582519384529083015280517feee2c0570205f21356a5108d71a4d6e7151682b92a84c761fca82cac87275c289281900390910190a15050565b6060600160060180548060200260200160405190810160405280929190818152602001828054801561041057602002820191906000526020600020905b8154600160a060020a031681526001909101906020018083116103f2575b5050505050905090565b600254600160a060020a031690565b600054600160a060020a0316331461044057600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b600054600160a060020a031681565b60ff16600090815260016020526040902054600160a060020a031690565b600254600354600160a060020a03918216911682565b600054600160a060020a031633146104ef57600080fd5b6104f88161059d565b50565b60009081526008602052604090205490565b600354600160a060020a031690565b6060600160040180548060200260200160405190810160405280929190818152602001828054801561041057602002820191906000526020600020908154600160a060020a031681526001909101906020018083116103f2575050505050905090565b600160a060020a031660009081526006602052604090205460ff1690565b600160a060020a03811615156105b257600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790555600a165627a7a723058208ce65df5590ab3362072413519dfccafabed062e0682ccd725630edbb2d362940029",
  "deployedBytecode": "0x6080604052600436106100cf5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100d45780631e912bd6146101095780633e3d13b214610133578063559ed3391461015c5780636e667db3146101c1578063715018a6146101f25780638da5cb5b14610207578063a003e0691461021c578063c19d93fb14610237578063f2fde38b14610272578063f7213db614610293578063fbfa77cf146102ab578063fe5b38e4146102c0578063fef3ee73146102d5575b600080fd5b3480156100e057600080fd5b506100f5600160a060020a03600435166102f6565b604080519115158252519081900360200190f35b34801561011557600080fd5b50610121600435610314565b60408051918252519081900360200190f35b34801561013f57600080fd5b5061015a60ff60043516600160a060020a0360243516610326565b005b34801561016857600080fd5b506101716103b5565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101ad578181015183820152602001610195565b505050509050019250505060405180910390f35b3480156101cd57600080fd5b506101d661041a565b60408051600160a060020a039092168252519081900360200190f35b3480156101fe57600080fd5b5061015a610429565b34801561021357600080fd5b506101d6610495565b34801561022857600080fd5b506101d660ff600435166104a4565b34801561024357600080fd5b5061024c6104c2565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b34801561027e57600080fd5b5061015a600160a060020a03600435166104d8565b34801561029f57600080fd5b506101216004356104fb565b3480156102b757600080fd5b506101d661050d565b3480156102cc57600080fd5b5061017161051c565b3480156102e157600080fd5b506100f5600160a060020a036004351661057f565b600160a060020a031660009081526004602052604090205460ff1690565b60009081526009602052604090205490565b600054600160a060020a0316331461033d57600080fd5b60ff8216600081815260016020908152604091829020805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03861690811790915582519384529083015280517feee2c0570205f21356a5108d71a4d6e7151682b92a84c761fca82cac87275c289281900390910190a15050565b6060600160060180548060200260200160405190810160405280929190818152602001828054801561041057602002820191906000526020600020905b8154600160a060020a031681526001909101906020018083116103f2575b5050505050905090565b600254600160a060020a031690565b600054600160a060020a0316331461044057600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b600054600160a060020a031681565b60ff16600090815260016020526040902054600160a060020a031690565b600254600354600160a060020a03918216911682565b600054600160a060020a031633146104ef57600080fd5b6104f88161059d565b50565b60009081526008602052604090205490565b600354600160a060020a031690565b6060600160040180548060200260200160405190810160405280929190818152602001828054801561041057602002820191906000526020600020908154600160a060020a031681526001909101906020018083116103f2575050505050905090565b600160a060020a031660009081526006602052604090205460ff1690565b600160a060020a03811615156105b257600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790555600a165627a7a723058208ce65df5590ab3362072413519dfccafabed062e0682ccd725630edbb2d362940029",
  "sourceMap": "970:861:2:-;;;567:5:20;:18;;-1:-1:-1;;;;;;567:18:20;575:10;567:18;;;970:861:2;;;;;;",
  "deployedSourceMap": "970:861:2:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2803:164:14;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2803:164:14;-1:-1:-1;;;;;2803:164:14;;;;;;;;;;;;;;;;;;;;;;;4376;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4376:164:14;;;;;;;;;;;;;;;;;;;;;1457:372:2;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1457:372:2;;;;;-1:-1:-1;;;;;1457:372:2;;;;;;;3685:119:14;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3685:119:14;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;3685:119:14;;;;;;;;;;;;;;;;;2263:125;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2263:125:14;;;;;;;;-1:-1:-1;;;;;2263:125:14;;;;;;;;;;;;;;827:111:20;;8:9:-1;5:2;;;30:1;27;20:12;5:2;827:111:20;;;;238:20;;8:9:-1;5:2;;;30:1;27;20:12;5:2;238:20:20;;;;1985:161:14;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1985:161:14;;;;;;;1710:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1710:18:14;;;;;;;;-1:-1:-1;;;;;1710:18:14;;;;;;;;;;;;;;;;;;;;;;;;1100:103:20;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1100:103:20;-1:-1:-1;;;;;1100:103:20;;;;;4008:160:14;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4008:160:14;;;;;2489:109;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2489:109:14;;;;3099:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3099:119:14;;;;3409:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3409:146:14;-1:-1:-1;;;;;3409:146:14;;;;;2803:164;-1:-1:-1;;;;;2930:30:14;2903:4;2930:30;;;:20;:30;;;;;;;;;2803:164::o;4376:::-;4476:4;4503:30;;;:18;:30;;;;;;;4376:164::o;1457:372:2:-;719:5:20;;-1:-1:-1;;;;;719:5:20;705:10;:19;697:28;;;;;;1641::2;;;:15;:28;;;:5;:28;;;;;;;;;:40;;-1:-1:-1;;1641:40:2;-1:-1:-1;;;;;1641:40:2;;;;;;;;1746:76;;;;;;;;;;;;;;;;;;;;;1457:372;;:::o;3685:119:14:-;3750:9;3782:5;:15;;3775:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3775:22:14;;;;;;;;;;;;;;;;;;;;;;;3685:119;:::o;2263:125::-;2362:19;;-1:-1:-1;;;;;2362:19:14;2263:125;:::o;827:111:20:-;719:5;;-1:-1:-1;;;;;719:5:20;705:10;:19;697:28;;;;;;903:5;;;884:25;;-1:-1:-1;;;;;903:5:20;;;;884:25;;;931:1;915:18;;-1:-1:-1;;915:18:20;;;827:111::o;238:20::-;;;-1:-1:-1;;;;;238:20:20;;:::o;1985:161:14:-;2111:28;;2081:7;2111:28;;;:5;:28;;;;;;-1:-1:-1;;;;;2111:28:14;;1985:161::o;1710:18::-;;;;;-1:-1:-1;;;;;1710:18:14;;;;;;:::o;1100:103:20:-;719:5;;-1:-1:-1;;;;;719:5:20;705:10;:19;697:28;;;;;;1169:29;1188:9;1169:18;:29::i;:::-;1100:103;:::o;4008:160:14:-;4106:4;4133:28;;;:16;:28;;;;;;;4008:160::o;2489:109::-;2580:11;;-1:-1:-1;;;;;2580:11:14;2489:109;:::o;3099:119::-;3164:9;3196:5;:15;;3189:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3189:22:14;;;;;;;;;;;;;;;;;;;;;;3099:119;:::o;3409:146::-;-1:-1:-1;;;;;3527:21:14;3500:4;3527:21;;;:15;:21;;;;;;;;;3409:146::o;1338:171:20:-;-1:-1:-1;;;;;1408:23:20;;;;1400:32;;;;;;1464:5;;;1443:38;;-1:-1:-1;;;;;1443:38:20;;;;1464:5;;;1443:38;;;1487:5;:17;;-1:-1:-1;;1487:17:20;-1:-1:-1;;;;;1487:17:20;;;;;;;;;;1338:171::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { Ownable } from \"zeppelin-solidity/contracts/ownership/Ownable.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\n\n\n/**\n * @title Core Exchange Dispatcher\n * @author Set Protocol\n *\n * The CoreExchangeDispatcher factilitates updating permissible exchanges\n * that are used in filling issuance orders. See CoreState.State.exchanges\n */\ncontract CoreExchangeDispatcher is\n    Ownable,\n    CoreState\n{\n\n    /* ============ Events ============ */\n\n    // Logs registration of new exchange\n    event ExchangeRegistered(\n        uint8 _exchangeId,\n        address _exchange\n    );\n\n    /* ============ External Functions ============ */\n\n    /**\n     * Register exchange address into mapping of exchanges\n     *\n     * @param _exchangeId   Enumeration of exchange\n     * @param _exchange     Exchange address to set\n     */\n    function registerExchange(\n        uint8 _exchangeId,\n        address _exchange\n    )\n        external\n        onlyOwner\n    {\n        // Add asset proxy and log registration.\n        state.exchanges[_exchangeId] = _exchange;\n\n        // Add asset proxy and log registration.\n        emit ExchangeRegistered(\n            _exchangeId,\n            _exchange\n        );\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreExchangeDispatcher.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreExchangeDispatcher.sol",
    "exportedSymbols": {
      "CoreExchangeDispatcher": [
        299
      ]
    },
    "id": 300,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 261,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:2"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "id": 263,
        "nodeType": "ImportDirective",
        "scope": 300,
        "sourceUnit": 2724,
        "src": "622:76:2",
        "symbolAliases": [
          {
            "foreign": 262,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 265,
        "nodeType": "ImportDirective",
        "scope": 300,
        "sourceUnit": 2094,
        "src": "699:49:2",
        "symbolAliases": [
          {
            "foreign": 264,
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
              "id": 266,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2723,
              "src": "1009:7:2",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$2723",
                "typeString": "contract Ownable"
              }
            },
            "id": 267,
            "nodeType": "InheritanceSpecifier",
            "src": "1009:7:2"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 268,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2093,
              "src": "1022:9:2",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$2093",
                "typeString": "contract CoreState"
              }
            },
            "id": 269,
            "nodeType": "InheritanceSpecifier",
            "src": "1022:9:2"
          }
        ],
        "contractDependencies": [
          2093,
          2723
        ],
        "contractKind": "contract",
        "documentation": "@title Core Exchange Dispatcher\n@author Set Protocol\n * The CoreExchangeDispatcher factilitates updating permissible exchanges\nthat are used in filling issuance orders. See CoreState.State.exchanges",
        "fullyImplemented": true,
        "id": 299,
        "linearizedBaseContracts": [
          299,
          2093,
          2723
        ],
        "name": "CoreExchangeDispatcher",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "anonymous": false,
            "documentation": null,
            "id": 275,
            "name": "ExchangeRegistered",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 274,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 271,
                  "indexed": false,
                  "name": "_exchangeId",
                  "nodeType": "VariableDeclaration",
                  "scope": 275,
                  "src": "1158:17:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 270,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "1158:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 273,
                  "indexed": false,
                  "name": "_exchange",
                  "nodeType": "VariableDeclaration",
                  "scope": 275,
                  "src": "1185:17:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 272,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1185:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1148:60:2"
            },
            "src": "1124:85:2"
          },
          {
            "body": {
              "id": 297,
              "nodeType": "Block",
              "src": "1582:247:2",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 290,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 284,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1989,
                          "src": "1641:5:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$1987_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 287,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "exchanges",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1960,
                        "src": "1641:15:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                          "typeString": "mapping(uint8 => address)"
                        }
                      },
                      "id": 288,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 286,
                        "name": "_exchangeId",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 277,
                        "src": "1657:11:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "1641:28:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 289,
                      "name": "_exchange",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 279,
                      "src": "1672:9:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1641:40:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 291,
                  "nodeType": "ExpressionStatement",
                  "src": "1641:40:2"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 293,
                        "name": "_exchangeId",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 277,
                        "src": "1778:11:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 294,
                        "name": "_exchange",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 279,
                        "src": "1803:9:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 292,
                      "name": "ExchangeRegistered",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 275,
                      "src": "1746:18:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_uint8_$_t_address_$returns$__$",
                        "typeString": "function (uint8,address)"
                      }
                    },
                    "id": 295,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1746:76:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 296,
                  "nodeType": "EmitStatement",
                  "src": "1741:81:2"
                }
              ]
            },
            "documentation": "Register exchange address into mapping of exchanges\n     * @param _exchangeId   Enumeration of exchange\n@param _exchange     Exchange address to set",
            "id": 298,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 282,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 281,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2671,
                  "src": "1568:9:2",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1568:9:2"
              }
            ],
            "name": "registerExchange",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 280,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 277,
                  "name": "_exchangeId",
                  "nodeType": "VariableDeclaration",
                  "scope": 298,
                  "src": "1492:17:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 276,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "1492:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 279,
                  "name": "_exchange",
                  "nodeType": "VariableDeclaration",
                  "scope": 298,
                  "src": "1519:17:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 278,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1519:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1482:60:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 283,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1582:0:2"
            },
            "scope": 299,
            "src": "1457:372:2",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 300,
        "src": "970:861:2"
      }
    ],
    "src": "597:1235:2"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreExchangeDispatcher.sol",
    "exportedSymbols": {
      "CoreExchangeDispatcher": [
        299
      ]
    },
    "id": 300,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 261,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:2"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "id": 263,
        "nodeType": "ImportDirective",
        "scope": 300,
        "sourceUnit": 2724,
        "src": "622:76:2",
        "symbolAliases": [
          {
            "foreign": 262,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 265,
        "nodeType": "ImportDirective",
        "scope": 300,
        "sourceUnit": 2094,
        "src": "699:49:2",
        "symbolAliases": [
          {
            "foreign": 264,
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
              "id": 266,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2723,
              "src": "1009:7:2",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$2723",
                "typeString": "contract Ownable"
              }
            },
            "id": 267,
            "nodeType": "InheritanceSpecifier",
            "src": "1009:7:2"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 268,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2093,
              "src": "1022:9:2",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$2093",
                "typeString": "contract CoreState"
              }
            },
            "id": 269,
            "nodeType": "InheritanceSpecifier",
            "src": "1022:9:2"
          }
        ],
        "contractDependencies": [
          2093,
          2723
        ],
        "contractKind": "contract",
        "documentation": "@title Core Exchange Dispatcher\n@author Set Protocol\n * The CoreExchangeDispatcher factilitates updating permissible exchanges\nthat are used in filling issuance orders. See CoreState.State.exchanges",
        "fullyImplemented": true,
        "id": 299,
        "linearizedBaseContracts": [
          299,
          2093,
          2723
        ],
        "name": "CoreExchangeDispatcher",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "anonymous": false,
            "documentation": null,
            "id": 275,
            "name": "ExchangeRegistered",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 274,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 271,
                  "indexed": false,
                  "name": "_exchangeId",
                  "nodeType": "VariableDeclaration",
                  "scope": 275,
                  "src": "1158:17:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 270,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "1158:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 273,
                  "indexed": false,
                  "name": "_exchange",
                  "nodeType": "VariableDeclaration",
                  "scope": 275,
                  "src": "1185:17:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 272,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1185:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1148:60:2"
            },
            "src": "1124:85:2"
          },
          {
            "body": {
              "id": 297,
              "nodeType": "Block",
              "src": "1582:247:2",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 290,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 284,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1989,
                          "src": "1641:5:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$1987_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 287,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "exchanges",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1960,
                        "src": "1641:15:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                          "typeString": "mapping(uint8 => address)"
                        }
                      },
                      "id": 288,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 286,
                        "name": "_exchangeId",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 277,
                        "src": "1657:11:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "1641:28:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 289,
                      "name": "_exchange",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 279,
                      "src": "1672:9:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1641:40:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 291,
                  "nodeType": "ExpressionStatement",
                  "src": "1641:40:2"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 293,
                        "name": "_exchangeId",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 277,
                        "src": "1778:11:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 294,
                        "name": "_exchange",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 279,
                        "src": "1803:9:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 292,
                      "name": "ExchangeRegistered",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 275,
                      "src": "1746:18:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_uint8_$_t_address_$returns$__$",
                        "typeString": "function (uint8,address)"
                      }
                    },
                    "id": 295,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1746:76:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 296,
                  "nodeType": "EmitStatement",
                  "src": "1741:81:2"
                }
              ]
            },
            "documentation": "Register exchange address into mapping of exchanges\n     * @param _exchangeId   Enumeration of exchange\n@param _exchange     Exchange address to set",
            "id": 298,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 282,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 281,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2671,
                  "src": "1568:9:2",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1568:9:2"
              }
            ],
            "name": "registerExchange",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 280,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 277,
                  "name": "_exchangeId",
                  "nodeType": "VariableDeclaration",
                  "scope": 298,
                  "src": "1492:17:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 276,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "1492:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 279,
                  "name": "_exchange",
                  "nodeType": "VariableDeclaration",
                  "scope": 298,
                  "src": "1519:17:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 278,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1519:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1482:60:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 283,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1582:0:2"
            },
            "scope": 299,
            "src": "1457:372:2",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 300,
        "src": "970:861:2"
      }
    ],
    "src": "597:1235:2"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-07T05:35:59.426Z"
}