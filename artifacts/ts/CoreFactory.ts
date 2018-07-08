export const CoreFactory = 
{
  "contractName": "CoreFactory",
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
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_setTokenAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_factoryAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_components",
          "type": "address[]"
        },
        {
          "indexed": false,
          "name": "_units",
          "type": "uint256[]"
        },
        {
          "indexed": false,
          "name": "_naturalUnit",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "_name",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "_symbol",
          "type": "string"
        }
      ],
      "name": "SetTokenCreated",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_factoryAddress",
          "type": "address"
        },
        {
          "name": "_components",
          "type": "address[]"
        },
        {
          "name": "_units",
          "type": "uint256[]"
        },
        {
          "name": "_naturalUnit",
          "type": "uint256"
        },
        {
          "name": "_name",
          "type": "string"
        },
        {
          "name": "_symbol",
          "type": "string"
        }
      ],
      "name": "create",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b5061067f806100206000396000f3006080604052600436106100985763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d4811461009d5780631e912bd6146100d2578063430bf08a146100fc578063529044491461012d5780638ca4daf914610182578063a003e06914610197578063c19d93fb146101b2578063f7213db6146101ed578063fef3ee7314610205575b600080fd5b3480156100a957600080fd5b506100be600160a060020a0360043516610226565b604080519115158252519081900360200190f35b3480156100de57600080fd5b506100ea600435610244565b60408051918252519081900360200190f35b34801561010857600080fd5b50610111610256565b60408051600160a060020a039092168252519081900360200190f35b34801561013957600080fd5b5061011160048035600160a060020a031690602480358082019290810135916044358082019290810135916064359160843580830192908201359160a435918201910135610265565b34801561018e57600080fd5b506101116105e0565b3480156101a357600080fd5b5061011160ff600435166105ef565b3480156101be57600080fd5b506101c761060d565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b3480156101f957600080fd5b506100ea600435610623565b34801561021157600080fd5b506100be600160a060020a0360043516610635565b600160a060020a031660009081526003602052604090205460ff1690565b60009081526006602052604090205490565b600254600160a060020a031690565b600160a060020a038a166000908152600360209081526040808320548151606081018352602681527f466163746f72792069732064697361626c6564206f7220646f6573206e6f7420938101939093527f65786973742e00000000000000000000000000000000000000000000000000009183019190915282918d9160ff161515610388576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561034d578181015183820152602001610335565b50505050905090810190601f16801561037a5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b508c600160a060020a031663110a25c28d8d8d8d8d8d8d8d8d6040518a63ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808060200180602001888152602001806020018060200185810385528e8e8281815260200192506020028082843790910186810385528c8152602090810191508d908d0280828437909101868103845289815260200190508989808284379091018681038352878152602001905087878082843782019150509d5050505050505050505050505050602060405180830381600087803b15801561047157600080fd5b505af1158015610485573d6000803e3d6000fd5b505050506040513d602081101561049b57600080fd5b8101908080519060200190929190505050915060016000600401600084600160a060020a0316600160a060020a0316815260200190815260200160002060006101000a81548160ff02191690831515021790555081600160a060020a03167f388b9bd51ec792eb7ce238581b3f844072709011b2a20260c428451e07d764a88e8e8e8e8e8e8e8e8e8e604051808b600160a060020a0316600160a060020a031681526020018060200180602001888152602001806020018060200185810385528e8e8281815260200192506020028082843790910186810385528c8152602090810191508d908d0280828437909101868103845289815260200190508989808284379091018681038352878152602001905087878082843782019150509e50505050505050505050505050505060405180910390a2509b9a5050505050505050505050565b600154600160a060020a031690565b60ff16600090815260208190526040902054600160a060020a031690565b600154600254600160a060020a03918216911682565b60009081526005602052604090205490565b600160a060020a031660009081526004602052604090205460ff16905600a165627a7a72305820301dc3efeae9b1ce298453c14554942211b3dd7a5326a4d025d2d264119bf4880029",
  "deployedBytecode": "0x6080604052600436106100985763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d4811461009d5780631e912bd6146100d2578063430bf08a146100fc578063529044491461012d5780638ca4daf914610182578063a003e06914610197578063c19d93fb146101b2578063f7213db6146101ed578063fef3ee7314610205575b600080fd5b3480156100a957600080fd5b506100be600160a060020a0360043516610226565b604080519115158252519081900360200190f35b3480156100de57600080fd5b506100ea600435610244565b60408051918252519081900360200190f35b34801561010857600080fd5b50610111610256565b60408051600160a060020a039092168252519081900360200190f35b34801561013957600080fd5b5061011160048035600160a060020a031690602480358082019290810135916044358082019290810135916064359160843580830192908201359160a435918201910135610265565b34801561018e57600080fd5b506101116105e0565b3480156101a357600080fd5b5061011160ff600435166105ef565b3480156101be57600080fd5b506101c761060d565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b3480156101f957600080fd5b506100ea600435610623565b34801561021157600080fd5b506100be600160a060020a0360043516610635565b600160a060020a031660009081526003602052604090205460ff1690565b60009081526006602052604090205490565b600254600160a060020a031690565b600160a060020a038a166000908152600360209081526040808320548151606081018352602681527f466163746f72792069732064697361626c6564206f7220646f6573206e6f7420938101939093527f65786973742e00000000000000000000000000000000000000000000000000009183019190915282918d9160ff161515610388576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561034d578181015183820152602001610335565b50505050905090810190601f16801561037a5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b508c600160a060020a031663110a25c28d8d8d8d8d8d8d8d8d6040518a63ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808060200180602001888152602001806020018060200185810385528e8e8281815260200192506020028082843790910186810385528c8152602090810191508d908d0280828437909101868103845289815260200190508989808284379091018681038352878152602001905087878082843782019150509d5050505050505050505050505050602060405180830381600087803b15801561047157600080fd5b505af1158015610485573d6000803e3d6000fd5b505050506040513d602081101561049b57600080fd5b8101908080519060200190929190505050915060016000600401600084600160a060020a0316600160a060020a0316815260200190815260200160002060006101000a81548160ff02191690831515021790555081600160a060020a03167f388b9bd51ec792eb7ce238581b3f844072709011b2a20260c428451e07d764a88e8e8e8e8e8e8e8e8e8e604051808b600160a060020a0316600160a060020a031681526020018060200180602001888152602001806020018060200185810385528e8e8281815260200192506020028082843790910186810385528c8152602090810191508d908d0280828437909101868103845289815260200190508989808284379091018681038352878152602001905087878082843782019150509e50505050505050505050505050505060405180910390a2509b9a5050505050505050505050565b600154600160a060020a031690565b60ff16600090815260208190526040902054600160a060020a031690565b600154600254600160a060020a03918216911682565b60009081526005602052604090205490565b600160a060020a031660009081526004602052604090205460ff16905600a165627a7a72305820301dc3efeae9b1ce298453c14554942211b3dd7a5326a4d025d2d264119bf4880029",
  "sourceMap": "995:2108:10:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;995:2108:10;;;;;;;",
  "deployedSourceMap": "995:2108:10:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2083:150:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2083:150:22;-1:-1:-1;;;;;2083:150:22;;;;;;;;;;;;;;;;;;;;;;;2529;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2529:150:22;;;;;;;;;;;;;;;;;;;;;1954:123;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1954:123:22;;;;;;;;-1:-1:-1;;;;;1954:123:22;;;;;;;;;;;;;;2255:846:10;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2255:846:10;;;;-1:-1:-1;;;;;2255:846:10;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1809:139:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1809:139:22;;;;1656:147;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1656:147:22;;;;;;;1579:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1579:18:22;;;;;;;;-1:-1:-1;;;;;1579:18:22;;;;;;;;;;;;;;;;;;;;;;;;2377:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2377:146:22;;;;;2239:132;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2239:132:22;-1:-1:-1;;;;;2239:132:22;;;;;2083:150;-1:-1:-1;;;;;2196:30:22;2169:4;2196:30;;;:20;:30;;;;;;;;;2083:150::o;2529:::-;2615:4;2642:30;;;:18;:30;;;;;;;2529:150::o;1954:123::-;2052:18;;-1:-1:-1;;;;;2052:18:22;1954:123;:::o;2255:846:10:-;-1:-1:-1;;;;;1709:37:21;;2511:7:10;1709:37:21;;;:20;:37;;;;;;;;;1760:15;;;;;;;;;;;;;;;;;;;;;;;;;;2511:7:10;;2477:15;;1709:37:21;;1688:97;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;1688:97:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2601:15:10;-1:-1:-1;;;;;2589:35:10;;2638:11;;2663:6;;2683:12;2709:5;;2728:7;;2589:156;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2589:156:10;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2589:156:10;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2589:156:10;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2589:156:10;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2589:156:10;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;2589:156:10;;;;;;;;;;;;;;;;2560:185;;2841:4;2803:5;:15;;:35;2819:18;-1:-1:-1;;;;;2803:35:10;-1:-1:-1;;;;;2803:35:10;;;;;;;;;;;;;:42;;;;;;;;;;;;;;;;;;2890:18;-1:-1:-1;;;;;2861:197:10;;2922:15;2951:11;;2976:6;;2996:12;3022:5;;3041:7;;2861:197;;;;-1:-1:-1;;;;;2861:197:10;-1:-1:-1;;;;;2861:197:10;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2861:197:10;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2861:197:10;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2861:197:10;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;3076:18:10;2255:846;-1:-1:-1;;;;;;;;;;;2255:846:10:o;1809:139:22:-;1915:26;;-1:-1:-1;;;;;1915:26:22;1809:139;:::o;1656:147::-;1768:28;;1738:7;1768:28;;;;;;;;;;;-1:-1:-1;;;;;1768:28:22;;1656:147::o;1579:18::-;;;;;-1:-1:-1;;;;;1579:18:22;;;;;;:::o;2377:146::-;2461:4;2488:28;;;:16;:28;;;;;;;2377:146::o;2239:132::-;-1:-1:-1;;;;;2343:21:22;2316:4;2343:21;;;:15;:21;;;;;;;;;2239:132::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { CoreModifiers } from \"../lib/CoreSharedModifiers.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\nimport { ISetFactory } from \"../interfaces/ISetFactory.sol\";\n\n\n/**\n * @title Core Factory\n * @author Set Protocol\n *\n * The CoreCreate contract contains public set token operations\n */\ncontract CoreFactory is\n    CoreState,\n    CoreModifiers\n{\n    // Use SafeMath library for all uint256 arithmetic\n    using SafeMath for uint256;\n\n    /* ============ Constants ============ */\n\n    string constant INVALID_FACTORY = \"Factory is disabled or does not exist.\";\n\n    /* ============ Events ============ */\n\n    event SetTokenCreated(\n        address indexed _setTokenAddress,\n        address _factoryAddress,\n        address[] _components,\n        uint[] _units,\n        uint _naturalUnit,\n        string _name,\n        string _symbol\n    );\n\n\n    /* ============ Public Functions ============ */\n\n    /**\n     * Deploys a new Set Token and adds it to the valid list of SetTokens\n     *\n     * @param  _factoryAddress  address       The address of the Factory to create from\n     * @param  _components      address[]     The address of component tokens\n     * @param  _units           uint[]        The units of each component token\n     * @param  _naturalUnit     uint          The minimum unit to be issued or redeemed\n     * @param  _name            string        The name of the new Set\n     * @param  _symbol          string        The symbol of the new Set\n     * @return setTokenAddress address        The address of the new Set\n     */\n    function create(\n        address _factoryAddress,\n        address[] _components,\n        uint[] _units,\n        uint _naturalUnit,\n        string _name,\n        string _symbol\n    )\n        external\n        isValidFactory(_factoryAddress)\n        returns (address)\n    {\n        // Create the Set\n        address newSetTokenAddress = ISetFactory(_factoryAddress).create(\n            _components,\n            _units,\n            _naturalUnit,\n            _name,\n            _symbol\n        );\n\n        // Add Set to the list of tracked Sets\n        state.validSets[newSetTokenAddress] = true;\n\n        emit SetTokenCreated(\n            newSetTokenAddress,\n            _factoryAddress,\n            _components,\n            _units,\n            _naturalUnit,\n            _name,\n            _symbol\n        );\n\n        return newSetTokenAddress;\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreFactory.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreFactory.sol",
    "exportedSymbols": {
      "CoreFactory": [
        1627
      ]
    },
    "id": 1628,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1534,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:10"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1536,
        "nodeType": "ImportDirective",
        "scope": 1628,
        "sourceUnit": 5804,
        "src": "622:73:10",
        "symbolAliases": [
          {
            "foreign": 1535,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 1538,
        "nodeType": "ImportDirective",
        "scope": 1628,
        "sourceUnit": 2976,
        "src": "696:63:10",
        "symbolAliases": [
          {
            "foreign": 1537,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1540,
        "nodeType": "ImportDirective",
        "scope": 1628,
        "sourceUnit": 3089,
        "src": "760:49:10",
        "symbolAliases": [
          {
            "foreign": 1539,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetFactory.sol",
        "file": "../interfaces/ISetFactory.sol",
        "id": 1542,
        "nodeType": "ImportDirective",
        "scope": 1628,
        "sourceUnit": 2806,
        "src": "810:60:10",
        "symbolAliases": [
          {
            "foreign": 1541,
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
              "id": 1543,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3088,
              "src": "1023:9:10",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3088",
                "typeString": "contract CoreState"
              }
            },
            "id": 1544,
            "nodeType": "InheritanceSpecifier",
            "src": "1023:9:10"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1545,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2975,
              "src": "1038:13:10",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$2975",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 1546,
            "nodeType": "InheritanceSpecifier",
            "src": "1038:13:10"
          }
        ],
        "contractDependencies": [
          2975,
          3088
        ],
        "contractKind": "contract",
        "documentation": "@title Core Factory\n@author Set Protocol\n * The CoreCreate contract contains public set token operations",
        "fullyImplemented": true,
        "id": 1627,
        "linearizedBaseContracts": [
          1627,
          2975,
          3088
        ],
        "name": "CoreFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1549,
            "libraryName": {
              "contractScope": null,
              "id": 1547,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5803,
              "src": "1119:8:10",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$5803",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1113:27:10",
            "typeName": {
              "id": 1548,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1132:7:10",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 1552,
            "name": "INVALID_FACTORY",
            "nodeType": "VariableDeclaration",
            "scope": 1627,
            "src": "1193:74:10",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1550,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1193:6:10",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "466163746f72792069732064697361626c6564206f7220646f6573206e6f742065786973742e",
              "id": 1551,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1227:40:10",
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
            "anonymous": false,
            "documentation": null,
            "id": 1570,
            "name": "SetTokenCreated",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1569,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1554,
                  "indexed": true,
                  "name": "_setTokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1570,
                  "src": "1349:32:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1553,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1349:7:10",
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
                  "id": 1556,
                  "indexed": false,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1570,
                  "src": "1391:23:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1555,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1391:7:10",
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
                  "id": 1559,
                  "indexed": false,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 1570,
                  "src": "1424:21:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1557,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1424:7:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1558,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1424:9:10",
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
                  "id": 1562,
                  "indexed": false,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 1570,
                  "src": "1455:13:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1560,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1455:4:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1561,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1455:6:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1564,
                  "indexed": false,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 1570,
                  "src": "1478:17:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1563,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1478:4:10",
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
                  "id": 1566,
                  "indexed": false,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 1570,
                  "src": "1505:12:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1565,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "1505:6:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1568,
                  "indexed": false,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 1570,
                  "src": "1527:14:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1567,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "1527:6:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1339:208:10"
            },
            "src": "1318:230:10"
          },
          {
            "body": {
              "id": 1625,
              "nodeType": "Block",
              "src": "2524:577:10",
              "statements": [
                {
                  "assignments": [
                    1593
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1593,
                      "name": "newSetTokenAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 1626,
                      "src": "2560:26:10",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 1592,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "2560:7:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1604,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1598,
                        "name": "_components",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1575,
                        "src": "2638:11:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1599,
                        "name": "_units",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1578,
                        "src": "2663:6:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1600,
                        "name": "_naturalUnit",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1580,
                        "src": "2683:12:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1601,
                        "name": "_name",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1582,
                        "src": "2709:5:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1602,
                        "name": "_symbol",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1584,
                        "src": "2728:7:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        },
                        {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        },
                        {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 1595,
                            "name": "_factoryAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1572,
                            "src": "2601:15:10",
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
                          "id": 1594,
                          "name": "ISetFactory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2805,
                          "src": "2589:11:10",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ISetFactory_$2805_$",
                            "typeString": "type(contract ISetFactory)"
                          }
                        },
                        "id": 1596,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2589:28:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ISetFactory_$2805",
                          "typeString": "contract ISetFactory"
                        }
                      },
                      "id": 1597,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "create",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2804,
                      "src": "2589:35:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$_t_uint256_$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$_t_address_$",
                        "typeString": "function (address[] memory,uint256[] memory,uint256,string memory,string memory) external returns (address)"
                      }
                    },
                    "id": 1603,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2589:156:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2560:185:10"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1611,
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
                          "id": 1605,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3004,
                          "src": "2803:5:10",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3002_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1608,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2993,
                        "src": "2803:15:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1609,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1607,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1593,
                        "src": "2819:18:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "2803:35:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "74727565",
                      "id": 1610,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2841:4:10",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2803:42:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1612,
                  "nodeType": "ExpressionStatement",
                  "src": "2803:42:10"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1614,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1593,
                        "src": "2890:18:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1615,
                        "name": "_factoryAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1572,
                        "src": "2922:15:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1616,
                        "name": "_components",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1575,
                        "src": "2951:11:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1617,
                        "name": "_units",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1578,
                        "src": "2976:6:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1618,
                        "name": "_naturalUnit",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1580,
                        "src": "2996:12:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1619,
                        "name": "_name",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1582,
                        "src": "3022:5:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1620,
                        "name": "_symbol",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1584,
                        "src": "3041:7:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        },
                        {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        },
                        {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      ],
                      "id": 1613,
                      "name": "SetTokenCreated",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1570,
                      "src": "2861:15:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$_t_uint256_$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (address,address,address[] memory,uint256[] memory,uint256,string memory,string memory)"
                      }
                    },
                    "id": 1621,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2861:197:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1622,
                  "nodeType": "EmitStatement",
                  "src": "2856:202:10"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1623,
                    "name": "newSetTokenAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1593,
                    "src": "3076:18:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 1591,
                  "id": 1624,
                  "nodeType": "Return",
                  "src": "3069:25:10"
                }
              ]
            },
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _factoryAddress  address       The address of the Factory to create from\n@param  _components      address[]     The address of component tokens\n@param  _units           uint[]        The units of each component token\n@param  _naturalUnit     uint          The minimum unit to be issued or redeemed\n@param  _name            string        The name of the new Set\n@param  _symbol          string        The symbol of the new Set\n@return setTokenAddress address        The address of the new Set",
            "id": 1626,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1587,
                    "name": "_factoryAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1572,
                    "src": "2477:15:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1588,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1586,
                  "name": "isValidFactory",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2939,
                  "src": "2462:14:10",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2462:31:10"
              }
            ],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1585,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1572,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1626,
                  "src": "2280:23:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1571,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2280:7:10",
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
                  "id": 1575,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 1626,
                  "src": "2313:21:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1573,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2313:7:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1574,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2313:9:10",
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
                  "id": 1578,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 1626,
                  "src": "2344:13:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1576,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2344:4:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1577,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2344:6:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1580,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 1626,
                  "src": "2367:17:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1579,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2367:4:10",
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
                  "id": 1582,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 1626,
                  "src": "2394:12:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1581,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "2394:6:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1584,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 1626,
                  "src": "2416:14:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1583,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "2416:6:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2270:166:10"
            },
            "payable": false,
            "returnParameters": {
              "id": 1591,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1590,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1626,
                  "src": "2511:7:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1589,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2511:7:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2510:9:10"
            },
            "scope": 1627,
            "src": "2255:846:10",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1628,
        "src": "995:2108:10"
      }
    ],
    "src": "597:2507:10"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreFactory.sol",
    "exportedSymbols": {
      "CoreFactory": [
        1627
      ]
    },
    "id": 1628,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1534,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:10"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1536,
        "nodeType": "ImportDirective",
        "scope": 1628,
        "sourceUnit": 5804,
        "src": "622:73:10",
        "symbolAliases": [
          {
            "foreign": 1535,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 1538,
        "nodeType": "ImportDirective",
        "scope": 1628,
        "sourceUnit": 2976,
        "src": "696:63:10",
        "symbolAliases": [
          {
            "foreign": 1537,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1540,
        "nodeType": "ImportDirective",
        "scope": 1628,
        "sourceUnit": 3089,
        "src": "760:49:10",
        "symbolAliases": [
          {
            "foreign": 1539,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetFactory.sol",
        "file": "../interfaces/ISetFactory.sol",
        "id": 1542,
        "nodeType": "ImportDirective",
        "scope": 1628,
        "sourceUnit": 2806,
        "src": "810:60:10",
        "symbolAliases": [
          {
            "foreign": 1541,
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
              "id": 1543,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3088,
              "src": "1023:9:10",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3088",
                "typeString": "contract CoreState"
              }
            },
            "id": 1544,
            "nodeType": "InheritanceSpecifier",
            "src": "1023:9:10"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1545,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2975,
              "src": "1038:13:10",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$2975",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 1546,
            "nodeType": "InheritanceSpecifier",
            "src": "1038:13:10"
          }
        ],
        "contractDependencies": [
          2975,
          3088
        ],
        "contractKind": "contract",
        "documentation": "@title Core Factory\n@author Set Protocol\n * The CoreCreate contract contains public set token operations",
        "fullyImplemented": true,
        "id": 1627,
        "linearizedBaseContracts": [
          1627,
          2975,
          3088
        ],
        "name": "CoreFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1549,
            "libraryName": {
              "contractScope": null,
              "id": 1547,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5803,
              "src": "1119:8:10",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$5803",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1113:27:10",
            "typeName": {
              "id": 1548,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1132:7:10",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 1552,
            "name": "INVALID_FACTORY",
            "nodeType": "VariableDeclaration",
            "scope": 1627,
            "src": "1193:74:10",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1550,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1193:6:10",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "466163746f72792069732064697361626c6564206f7220646f6573206e6f742065786973742e",
              "id": 1551,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1227:40:10",
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
            "anonymous": false,
            "documentation": null,
            "id": 1570,
            "name": "SetTokenCreated",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1569,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1554,
                  "indexed": true,
                  "name": "_setTokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1570,
                  "src": "1349:32:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1553,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1349:7:10",
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
                  "id": 1556,
                  "indexed": false,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1570,
                  "src": "1391:23:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1555,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1391:7:10",
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
                  "id": 1559,
                  "indexed": false,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 1570,
                  "src": "1424:21:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1557,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1424:7:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1558,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1424:9:10",
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
                  "id": 1562,
                  "indexed": false,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 1570,
                  "src": "1455:13:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1560,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1455:4:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1561,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1455:6:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1564,
                  "indexed": false,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 1570,
                  "src": "1478:17:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1563,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1478:4:10",
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
                  "id": 1566,
                  "indexed": false,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 1570,
                  "src": "1505:12:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1565,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "1505:6:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1568,
                  "indexed": false,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 1570,
                  "src": "1527:14:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1567,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "1527:6:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1339:208:10"
            },
            "src": "1318:230:10"
          },
          {
            "body": {
              "id": 1625,
              "nodeType": "Block",
              "src": "2524:577:10",
              "statements": [
                {
                  "assignments": [
                    1593
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1593,
                      "name": "newSetTokenAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 1626,
                      "src": "2560:26:10",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 1592,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "2560:7:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1604,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1598,
                        "name": "_components",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1575,
                        "src": "2638:11:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1599,
                        "name": "_units",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1578,
                        "src": "2663:6:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1600,
                        "name": "_naturalUnit",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1580,
                        "src": "2683:12:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1601,
                        "name": "_name",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1582,
                        "src": "2709:5:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1602,
                        "name": "_symbol",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1584,
                        "src": "2728:7:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        },
                        {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        },
                        {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 1595,
                            "name": "_factoryAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1572,
                            "src": "2601:15:10",
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
                          "id": 1594,
                          "name": "ISetFactory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2805,
                          "src": "2589:11:10",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ISetFactory_$2805_$",
                            "typeString": "type(contract ISetFactory)"
                          }
                        },
                        "id": 1596,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2589:28:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ISetFactory_$2805",
                          "typeString": "contract ISetFactory"
                        }
                      },
                      "id": 1597,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "create",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2804,
                      "src": "2589:35:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$_t_uint256_$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$_t_address_$",
                        "typeString": "function (address[] memory,uint256[] memory,uint256,string memory,string memory) external returns (address)"
                      }
                    },
                    "id": 1603,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2589:156:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2560:185:10"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1611,
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
                          "id": 1605,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3004,
                          "src": "2803:5:10",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3002_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1608,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2993,
                        "src": "2803:15:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1609,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1607,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1593,
                        "src": "2819:18:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "2803:35:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "74727565",
                      "id": 1610,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2841:4:10",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2803:42:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1612,
                  "nodeType": "ExpressionStatement",
                  "src": "2803:42:10"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1614,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1593,
                        "src": "2890:18:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1615,
                        "name": "_factoryAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1572,
                        "src": "2922:15:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1616,
                        "name": "_components",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1575,
                        "src": "2951:11:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1617,
                        "name": "_units",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1578,
                        "src": "2976:6:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1618,
                        "name": "_naturalUnit",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1580,
                        "src": "2996:12:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1619,
                        "name": "_name",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1582,
                        "src": "3022:5:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1620,
                        "name": "_symbol",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1584,
                        "src": "3041:7:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        },
                        {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        },
                        {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      ],
                      "id": 1613,
                      "name": "SetTokenCreated",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1570,
                      "src": "2861:15:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$_t_uint256_$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (address,address,address[] memory,uint256[] memory,uint256,string memory,string memory)"
                      }
                    },
                    "id": 1621,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2861:197:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1622,
                  "nodeType": "EmitStatement",
                  "src": "2856:202:10"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1623,
                    "name": "newSetTokenAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1593,
                    "src": "3076:18:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 1591,
                  "id": 1624,
                  "nodeType": "Return",
                  "src": "3069:25:10"
                }
              ]
            },
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _factoryAddress  address       The address of the Factory to create from\n@param  _components      address[]     The address of component tokens\n@param  _units           uint[]        The units of each component token\n@param  _naturalUnit     uint          The minimum unit to be issued or redeemed\n@param  _name            string        The name of the new Set\n@param  _symbol          string        The symbol of the new Set\n@return setTokenAddress address        The address of the new Set",
            "id": 1626,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1587,
                    "name": "_factoryAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1572,
                    "src": "2477:15:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1588,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1586,
                  "name": "isValidFactory",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2939,
                  "src": "2462:14:10",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2462:31:10"
              }
            ],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1585,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1572,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1626,
                  "src": "2280:23:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1571,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2280:7:10",
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
                  "id": 1575,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 1626,
                  "src": "2313:21:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1573,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2313:7:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1574,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2313:9:10",
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
                  "id": 1578,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 1626,
                  "src": "2344:13:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1576,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2344:4:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1577,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2344:6:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1580,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 1626,
                  "src": "2367:17:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1579,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2367:4:10",
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
                  "id": 1582,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 1626,
                  "src": "2394:12:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1581,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "2394:6:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1584,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 1626,
                  "src": "2416:14:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1583,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "2416:6:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2270:166:10"
            },
            "payable": false,
            "returnParameters": {
              "id": 1591,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1590,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1626,
                  "src": "2511:7:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1589,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2511:7:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2510:9:10"
            },
            "scope": 1627,
            "src": "2255:846:10",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1628,
        "src": "995:2108:10"
      }
    ],
    "src": "597:2507:10"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-08T01:11:15.191Z"
}