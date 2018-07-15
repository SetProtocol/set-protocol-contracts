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
  "bytecode": "0x608060405260008054600160a060020a03191633179055610792806100256000396000f3006080604052600436106100cf5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100d45780631e912bd6146101165780633e3d13b214610140578063430bf08a14610176578063559ed339146101b4578063715018a6146102195780638ca4daf91461022e5780638da5cb5b14610243578063a003e06914610258578063c19d93fb14610273578063f2fde38b146102bb578063f7213db6146102e9578063fe5b38e414610301578063fef3ee7314610316575b600080fd5b3480156100e057600080fd5b5061010273ffffffffffffffffffffffffffffffffffffffff60043516610344565b604080519115158252519081900360200190f35b34801561012257600080fd5b5061012e60043561036f565b60408051918252519081900360200190f35b34801561014c57600080fd5b5061017460ff6004351673ffffffffffffffffffffffffffffffffffffffff60243516610381565b005b34801561018257600080fd5b5061018b610435565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b3480156101c057600080fd5b506101c9610451565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156102055781810151838201526020016101ed565b505050509050019250505060405180910390f35b34801561022557600080fd5b506101746104c3565b34801561023a57600080fd5b5061018b610554565b34801561024f57600080fd5b5061018b610570565b34801561026457600080fd5b5061018b60ff6004351661058c565b34801561027f57600080fd5b506102886105b7565b6040805173ffffffffffffffffffffffffffffffffffffffff938416815291909216602082015281519081900390910190f35b3480156102c757600080fd5b5061017473ffffffffffffffffffffffffffffffffffffffff600435166105da565b3480156102f557600080fd5b5061012e60043561060a565b34801561030d57600080fd5b506101c961061c565b34801561032257600080fd5b5061010273ffffffffffffffffffffffffffffffffffffffff6004351661068c565b73ffffffffffffffffffffffffffffffffffffffff1660009081526004602052604090205460ff1690565b60009081526009602052604090205490565b60005473ffffffffffffffffffffffffffffffffffffffff1633146103a557600080fd5b60ff821660008181526001602090815260409182902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff861690811790915582519384529083015280517feee2c0570205f21356a5108d71a4d6e7151682b92a84c761fca82cac87275c289281900390910190a15050565b60035473ffffffffffffffffffffffffffffffffffffffff1690565b606060016006018054806020026020016040519081016040528092919081815260200182805480156104b957602002820191906000526020600020905b815473ffffffffffffffffffffffffffffffffffffffff16815260019091019060200180831161048e575b5050505050905090565b60005473ffffffffffffffffffffffffffffffffffffffff1633146104e757600080fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a2600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055565b60025473ffffffffffffffffffffffffffffffffffffffff1690565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60ff1660009081526001602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60025460035473ffffffffffffffffffffffffffffffffffffffff918216911682565b60005473ffffffffffffffffffffffffffffffffffffffff1633146105fe57600080fd5b610607816106b7565b50565b60009081526008602052604090205490565b606060016004018054806020026020016040519081016040528092919081815260200182805480156104b95760200282019190600052602060002090815473ffffffffffffffffffffffffffffffffffffffff16815260019091019060200180831161048e575050505050905090565b73ffffffffffffffffffffffffffffffffffffffff1660009081526006602052604090205460ff1690565b73ffffffffffffffffffffffffffffffffffffffff811615156106d957600080fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff929092169190911790555600a165627a7a72305820b0584d6079cc73038c9608c7601c272909984e68cd536cf0789617c3ba5e74580029",
  "deployedBytecode": "0x6080604052600436106100cf5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100d45780631e912bd6146101165780633e3d13b214610140578063430bf08a14610176578063559ed339146101b4578063715018a6146102195780638ca4daf91461022e5780638da5cb5b14610243578063a003e06914610258578063c19d93fb14610273578063f2fde38b146102bb578063f7213db6146102e9578063fe5b38e414610301578063fef3ee7314610316575b600080fd5b3480156100e057600080fd5b5061010273ffffffffffffffffffffffffffffffffffffffff60043516610344565b604080519115158252519081900360200190f35b34801561012257600080fd5b5061012e60043561036f565b60408051918252519081900360200190f35b34801561014c57600080fd5b5061017460ff6004351673ffffffffffffffffffffffffffffffffffffffff60243516610381565b005b34801561018257600080fd5b5061018b610435565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b3480156101c057600080fd5b506101c9610451565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156102055781810151838201526020016101ed565b505050509050019250505060405180910390f35b34801561022557600080fd5b506101746104c3565b34801561023a57600080fd5b5061018b610554565b34801561024f57600080fd5b5061018b610570565b34801561026457600080fd5b5061018b60ff6004351661058c565b34801561027f57600080fd5b506102886105b7565b6040805173ffffffffffffffffffffffffffffffffffffffff938416815291909216602082015281519081900390910190f35b3480156102c757600080fd5b5061017473ffffffffffffffffffffffffffffffffffffffff600435166105da565b3480156102f557600080fd5b5061012e60043561060a565b34801561030d57600080fd5b506101c961061c565b34801561032257600080fd5b5061010273ffffffffffffffffffffffffffffffffffffffff6004351661068c565b73ffffffffffffffffffffffffffffffffffffffff1660009081526004602052604090205460ff1690565b60009081526009602052604090205490565b60005473ffffffffffffffffffffffffffffffffffffffff1633146103a557600080fd5b60ff821660008181526001602090815260409182902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff861690811790915582519384529083015280517feee2c0570205f21356a5108d71a4d6e7151682b92a84c761fca82cac87275c289281900390910190a15050565b60035473ffffffffffffffffffffffffffffffffffffffff1690565b606060016006018054806020026020016040519081016040528092919081815260200182805480156104b957602002820191906000526020600020905b815473ffffffffffffffffffffffffffffffffffffffff16815260019091019060200180831161048e575b5050505050905090565b60005473ffffffffffffffffffffffffffffffffffffffff1633146104e757600080fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a2600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055565b60025473ffffffffffffffffffffffffffffffffffffffff1690565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60ff1660009081526001602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60025460035473ffffffffffffffffffffffffffffffffffffffff918216911682565b60005473ffffffffffffffffffffffffffffffffffffffff1633146105fe57600080fd5b610607816106b7565b50565b60009081526008602052604090205490565b606060016004018054806020026020016040519081016040528092919081815260200182805480156104b95760200282019190600052602060002090815473ffffffffffffffffffffffffffffffffffffffff16815260019091019060200180831161048e575050505050905090565b73ffffffffffffffffffffffffffffffffffffffff1660009081526006602052604090205460ff1690565b73ffffffffffffffffffffffffffffffffffffffff811615156106d957600080fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff929092169190911790555600a165627a7a72305820b0584d6079cc73038c9608c7601c272909984e68cd536cf0789617c3ba5e74580029",
  "sourceMap": "970:860:10:-;;;567:5:61;:18;;-1:-1:-1;;;;;;567:18:61;575:10;567:18;;;970:860:10;;;;;;",
  "deployedSourceMap": "970:860:10:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2228:150:23;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2228:150:23;;;;;;;;;;;;;;;;;;;;;;;;;2924;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2924:150:23;;;;;;;;;;;;;;;;;;;;;1456:372:10;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1456:372:10;;;;;;;;;;;;;2099:123:23;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2099:123:23;;;;;;;;;;;;;;;;;;;;;;;2647:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2647:119:23;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;2647:119:23;;;;;;;;;;;;;;;;;827:111:61;;8:9:-1;5:2;;;30:1;27;20:12;5:2;827:111:61;;;;1954:139:23;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1954:139:23;;;;238:20:61;;8:9:-1;5:2;;;30:1;27;20:12;5:2;238:20:61;;;;1801:147:23;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1801:147:23;;;;;;;1724:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1724:18:23;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1100:103:61;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1100:103:61;;;;;;;2772:146:23;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2772:146:23;;;;;2384:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2384:119:23;;;;2509:132;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2509:132:23;;;;;;;2228:150;2341:30;;2314:4;2341:30;;;:20;:30;;;;;;;;;2228:150::o;2924:::-;3010:4;3037:30;;;:18;:30;;;;;;;2924:150::o;1456:372:10:-;719:5:61;;;;705:10;:19;697:28;;;;;;1640::10;;;:15;:28;;;:5;:28;;;;;;;;;:40;;;;;;;;;;;;;1745:76;;;;;;;;;;;;;;;;;;;;;1456:372;;:::o;2099:123:23:-;2197:18;;;;2099:123;:::o;2647:119::-;2712:9;2744:5;:15;;2737:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2647:119;:::o;827:111:61:-;719:5;;;;705:10;:19;697:28;;;;;;903:5;;;884:25;;903:5;;;;;884:25;;;931:1;915:18;;;;;;827:111::o;1954:139:23:-;2060:26;;;;1954:139;:::o;238:20:61:-;;;;;;:::o;1801:147:23:-;1913:28;;1883:7;1913:28;;;:5;:28;;;;;;;;;1801:147::o;1724:18::-;;;;;;;;;;;;:::o;1100:103:61:-;719:5;;;;705:10;:19;697:28;;;;;;1169:29;1188:9;1169:18;:29::i;:::-;1100:103;:::o;2772:146:23:-;2856:4;2883:28;;;:16;:28;;;;;;;2772:146::o;2384:119::-;2449:9;2481:5;:15;;2474:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2384:119;:::o;2509:132::-;2613:21;;2586:4;2613:21;;;:15;:21;;;;;;;;;2509:132::o;1338:171:61:-;1408:23;;;;;1400:32;;;;;;1464:5;;;1443:38;;;;;;;1464:5;;;1443:38;;;1487:5;:17;;;;;;;;;;;;;;;1338:171::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { Ownable } from \"zeppelin-solidity/contracts/ownership/Ownable.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\n\n\n/**\n * @title Core Exchange Dispatcher\n * @author Set Protocol\n *\n * The CoreExchangeDispatcher factilitates updating permissible exchanges\n * that are used in filling issuance orders. See CoreState.State.exchanges\n */\ncontract CoreExchangeDispatcher is\n    Ownable,\n    CoreState\n{\n\n    /* ============ Events ============ */\n\n    // Logs registration of new exchange\n    event ExchangeRegistered(\n        uint8 _exchangeId,\n        address _exchange\n    );\n\n    /* ============ Setter Functions ============ */\n\n    /**\n     * Register exchange address into mapping of exchanges \n     *\n     * @param _exchangeId   Enumeration of exchange\n     * @param _exchange     Exchange address to set\n     */\n    function registerExchange(\n        uint8 _exchangeId,\n        address _exchange\n    )\n        external\n        onlyOwner\n    {\n        // Add asset proxy and log registration.\n        state.exchanges[_exchangeId] = _exchange;\n\n        // Add asset proxy and log registration.\n        emit ExchangeRegistered(\n            _exchangeId,\n            _exchange\n        );\n    }\n}\n",
  "sourcePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/extensions/CoreExchangeDispatcher.sol",
  "ast": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/extensions/CoreExchangeDispatcher.sol",
    "exportedSymbols": {
      "CoreExchangeDispatcher": [
        1648
      ]
    },
    "id": 1649,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1610,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:10"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "id": 1612,
        "nodeType": "ImportDirective",
        "scope": 1649,
        "sourceUnit": 6433,
        "src": "622:76:10",
        "symbolAliases": [
          {
            "foreign": 1611,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1614,
        "nodeType": "ImportDirective",
        "scope": 1649,
        "sourceUnit": 3594,
        "src": "699:49:10",
        "symbolAliases": [
          {
            "foreign": 1613,
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
              "id": 1615,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6432,
              "src": "1009:7:10",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$6432",
                "typeString": "contract Ownable"
              }
            },
            "id": 1616,
            "nodeType": "InheritanceSpecifier",
            "src": "1009:7:10"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1617,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3593,
              "src": "1022:9:10",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3593",
                "typeString": "contract CoreState"
              }
            },
            "id": 1618,
            "nodeType": "InheritanceSpecifier",
            "src": "1022:9:10"
          }
        ],
        "contractDependencies": [
          3593,
          6432
        ],
        "contractKind": "contract",
        "documentation": "@title Core Exchange Dispatcher\n@author Set Protocol\n * The CoreExchangeDispatcher factilitates updating permissible exchanges\nthat are used in filling issuance orders. See CoreState.State.exchanges",
        "fullyImplemented": true,
        "id": 1648,
        "linearizedBaseContracts": [
          1648,
          3593,
          6432
        ],
        "name": "CoreExchangeDispatcher",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "anonymous": false,
            "documentation": null,
            "id": 1624,
            "name": "ExchangeRegistered",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1623,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1620,
                  "indexed": false,
                  "name": "_exchangeId",
                  "nodeType": "VariableDeclaration",
                  "scope": 1624,
                  "src": "1158:17:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 1619,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "1158:5:10",
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
                  "id": 1622,
                  "indexed": false,
                  "name": "_exchange",
                  "nodeType": "VariableDeclaration",
                  "scope": 1624,
                  "src": "1185:17:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1621,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1185:7:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1148:60:10"
            },
            "src": "1124:85:10"
          },
          {
            "body": {
              "id": 1646,
              "nodeType": "Block",
              "src": "1581:247:10",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1639,
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
                          "id": 1633,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "1640:5:10",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1636,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "exchanges",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3460,
                        "src": "1640:15:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                          "typeString": "mapping(uint8 => address)"
                        }
                      },
                      "id": 1637,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1635,
                        "name": "_exchangeId",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1626,
                        "src": "1656:11:10",
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
                      "src": "1640:28:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1638,
                      "name": "_exchange",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1628,
                      "src": "1671:9:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1640:40:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1640,
                  "nodeType": "ExpressionStatement",
                  "src": "1640:40:10"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1642,
                        "name": "_exchangeId",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1626,
                        "src": "1777:11:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1643,
                        "name": "_exchange",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1628,
                        "src": "1802:9:10",
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
                      "id": 1641,
                      "name": "ExchangeRegistered",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1624,
                      "src": "1745:18:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_uint8_$_t_address_$returns$__$",
                        "typeString": "function (uint8,address)"
                      }
                    },
                    "id": 1644,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1745:76:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1645,
                  "nodeType": "EmitStatement",
                  "src": "1740:81:10"
                }
              ]
            },
            "documentation": "Register exchange address into mapping of exchanges \n     * @param _exchangeId   Enumeration of exchange\n@param _exchange     Exchange address to set",
            "id": 1647,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1631,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1630,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6380,
                  "src": "1567:9:10",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1567:9:10"
              }
            ],
            "name": "registerExchange",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1629,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1626,
                  "name": "_exchangeId",
                  "nodeType": "VariableDeclaration",
                  "scope": 1647,
                  "src": "1491:17:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 1625,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "1491:5:10",
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
                  "id": 1628,
                  "name": "_exchange",
                  "nodeType": "VariableDeclaration",
                  "scope": 1647,
                  "src": "1518:17:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1627,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1518:7:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1481:60:10"
            },
            "payable": false,
            "returnParameters": {
              "id": 1632,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1581:0:10"
            },
            "scope": 1648,
            "src": "1456:372:10",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1649,
        "src": "970:860:10"
      }
    ],
    "src": "597:1234:10"
  },
  "legacyAST": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/extensions/CoreExchangeDispatcher.sol",
    "exportedSymbols": {
      "CoreExchangeDispatcher": [
        1648
      ]
    },
    "id": 1649,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1610,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:10"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "id": 1612,
        "nodeType": "ImportDirective",
        "scope": 1649,
        "sourceUnit": 6433,
        "src": "622:76:10",
        "symbolAliases": [
          {
            "foreign": 1611,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1614,
        "nodeType": "ImportDirective",
        "scope": 1649,
        "sourceUnit": 3594,
        "src": "699:49:10",
        "symbolAliases": [
          {
            "foreign": 1613,
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
              "id": 1615,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6432,
              "src": "1009:7:10",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$6432",
                "typeString": "contract Ownable"
              }
            },
            "id": 1616,
            "nodeType": "InheritanceSpecifier",
            "src": "1009:7:10"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1617,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3593,
              "src": "1022:9:10",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3593",
                "typeString": "contract CoreState"
              }
            },
            "id": 1618,
            "nodeType": "InheritanceSpecifier",
            "src": "1022:9:10"
          }
        ],
        "contractDependencies": [
          3593,
          6432
        ],
        "contractKind": "contract",
        "documentation": "@title Core Exchange Dispatcher\n@author Set Protocol\n * The CoreExchangeDispatcher factilitates updating permissible exchanges\nthat are used in filling issuance orders. See CoreState.State.exchanges",
        "fullyImplemented": true,
        "id": 1648,
        "linearizedBaseContracts": [
          1648,
          3593,
          6432
        ],
        "name": "CoreExchangeDispatcher",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "anonymous": false,
            "documentation": null,
            "id": 1624,
            "name": "ExchangeRegistered",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1623,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1620,
                  "indexed": false,
                  "name": "_exchangeId",
                  "nodeType": "VariableDeclaration",
                  "scope": 1624,
                  "src": "1158:17:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 1619,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "1158:5:10",
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
                  "id": 1622,
                  "indexed": false,
                  "name": "_exchange",
                  "nodeType": "VariableDeclaration",
                  "scope": 1624,
                  "src": "1185:17:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1621,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1185:7:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1148:60:10"
            },
            "src": "1124:85:10"
          },
          {
            "body": {
              "id": 1646,
              "nodeType": "Block",
              "src": "1581:247:10",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1639,
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
                          "id": 1633,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "1640:5:10",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1636,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "exchanges",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3460,
                        "src": "1640:15:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                          "typeString": "mapping(uint8 => address)"
                        }
                      },
                      "id": 1637,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1635,
                        "name": "_exchangeId",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1626,
                        "src": "1656:11:10",
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
                      "src": "1640:28:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1638,
                      "name": "_exchange",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1628,
                      "src": "1671:9:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1640:40:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1640,
                  "nodeType": "ExpressionStatement",
                  "src": "1640:40:10"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1642,
                        "name": "_exchangeId",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1626,
                        "src": "1777:11:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1643,
                        "name": "_exchange",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1628,
                        "src": "1802:9:10",
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
                      "id": 1641,
                      "name": "ExchangeRegistered",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1624,
                      "src": "1745:18:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_uint8_$_t_address_$returns$__$",
                        "typeString": "function (uint8,address)"
                      }
                    },
                    "id": 1644,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1745:76:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1645,
                  "nodeType": "EmitStatement",
                  "src": "1740:81:10"
                }
              ]
            },
            "documentation": "Register exchange address into mapping of exchanges \n     * @param _exchangeId   Enumeration of exchange\n@param _exchange     Exchange address to set",
            "id": 1647,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1631,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1630,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6380,
                  "src": "1567:9:10",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1567:9:10"
              }
            ],
            "name": "registerExchange",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1629,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1626,
                  "name": "_exchangeId",
                  "nodeType": "VariableDeclaration",
                  "scope": 1647,
                  "src": "1491:17:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 1625,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "1491:5:10",
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
                  "id": 1628,
                  "name": "_exchange",
                  "nodeType": "VariableDeclaration",
                  "scope": 1647,
                  "src": "1518:17:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1627,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1518:7:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1481:60:10"
            },
            "payable": false,
            "returnParameters": {
              "id": 1632,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1581:0:10"
            },
            "scope": 1648,
            "src": "1456:372:10",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1649,
        "src": "970:860:10"
      }
    ],
    "src": "597:1234:10"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-13T21:55:38.337Z"
}